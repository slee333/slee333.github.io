---
layout: post
permalink: /learning/:title/
title: "노션 to 지킬 - 이미지 업로드 자동화하기"
subtitle: "노션에서 지킬로 글을 옮길 때 가장 번거로웠던 과정인 이미지 업로드. 이 과정을 자동화해보자."
date: 2025-09-03 10:00:00 +0900
lang: kr
categories: learning
categorydisplay: 공부일기
tags: [python, automation, cloudinary, jekyll]
image: https://pix4free.org/assets/library/2021-08-01/originals/automation.jpg # TODO: 이 포스트에 맞는 대표 이미지를 설정해주세요.
translation_id: notion-automation-workflow
---


## 서론

마크다운을 사용하는 깃허브 블로그. 분명 편하고 훌륭하다.

하지만 [앞선 글](https://slee333.github.io/learning/Jeykll-notion-to-jekyll/)에서도 언급했듯 나는 글쓰기 대부분을 노션에서 진행한다.

왜냐면 노션 인터페이스가 콘텐츠 작성하기 더 편하니까.

하지만 이걸 Jekyll 기반의 개인 블로그로 옮기는 과정은 꽤 번거로운 수작업이었다.

텍스트 복사-붙여넣기? 간단하다. 하지만 문제는 이미지였다.

바로 노션에서 지킬로 긁으면 이미지가 깨지기 때문에 포스트에 포함된 이미지를 일일이 imgur과 같은 외부 사이트에다 업로드하고 그 사이트에서 이미지를 가져오는 번거로운 과정을 거쳤는데.

딱 봐도 알겠지만 몹시 번거로운 과정이었다.

하지만 어찌 알았으랴.

바야흐로 MCP의 세계가 와서 클로드 코드나 Gemini CLI를 통해 이런 문제들을 해결하는 과정이 한결 더 쉬워졌을 줄이야.

어제 하룻동안 씨름해서 이 지루한 과정을 자동화하는데 성공했다. 파이썬 스크립트를 통해서 말이다.

따라서 오늘은 **노션 이미지를 캡션과 함께 자동으로 블로그에 게시하는** 워크플로우를 공유하고자 한다.

내가 짠 부분 없이 순수하게 Gemini가 써준 코드기도 하다. 물론 내가 짠 [이전 코드](https://slee333.github.io/learning/Jeykll-notion-to-jekyll/)를 제미나이가 참고하기는 했지만...

아무튼 들어가보자.

-----

## 불안정한 노션의 이미지

노션에 업로드한 이미지는 노션의 서버(주로 AWS S3)에 저장된다.

문제는 이 URL은 임시적인 경우가 많고 수시로 변한다는 점. 때문에 노션에서 그대로 이미지 링크를 옮겨와봐야 다음날이면 링크가 변해있어 이미지가 죄다 엑박이 되어있다.

정말 참을 수 없는 노릇.

블로그의 모든 요소들을 확실히 통제하기 위해선 이미지를 외부 서비스에 호스팅하는 과정이 따라서 필수였다.

즉 외부 호스팅 사이트에 이미지를 올린 다음 그 링크를 가져오는 방식이다. 이러면 링크가 (내가 호스팅한 사이트가 망하지 않는 이상) 바뀔 일이 없으니까.

난 원래 `imgur`이란 사이트를 사용했는데, 얘네는 보니까 API 지원을 더 이상 안하더라.

따라서 다른 플랫폼으로 옮겼다. 바로 **클라우디너리(Cloudinary)**.

클라우디너리는 생각보다 기능이 많았다.

이미지 업로드에 더해, URL 파라미터를 통해 실시간으로 이미지를 변환하고 최적화하는 기능도 있었으니까.

각설하고 클라우디너리 API를 어떻게 사용했는지 들어가보도록 하자.


-----


## 파이썬 스크립트 작성하기 (작성하라 시키기)

자동화 스크립트의 많은 부분은 이전 글에서도 다루었기에 자세한 부분은 넘어가겠다.

Gemini CLI 와 같은 MCP를 통해 더 최적화된 부분도 있지만 기본적인 원리는 같다.

일단 기본적으로 노션 페이지의 모든 콘텐츠는 블록(block) 단위로 이루어져 있다.

이 상황에서, 블록의 타입이 **이미지**일 때 이미지의 데이터를 추출해서 클라우디너리에 업로드하는 것이 스크립트의 목적이다.

한 단계씩 진행해보자.

-----

### 0. 사전 준비: API Key 설정하기

스크립트가 Cloudinary와 통신하려면 몇 가지 사전작업이 필요하다.

이 과정에는 **Cloud Name, API Key, API Secret** 세 가지 정보가 필요하다.

이 정보들은 Cloudinary 대시보드에 로그인한 후 설정 - API Keys 로 가면 찾을 수 있다.

다들 알겠지만 가장 중요한 점은 이 값들을 스크립트 코드에 직접 하드코딩하면 안 된다는 것.

API Secret 같은 민감 정보를 그대로 노출시키면 Git 같은 곳에 실수로 올라갔을 때 보안상 아주 위험하다.

착한 어린이들은 **환경 변수(Environment Variables)**를 설정하는 파일 (`.env`)를 별도로 설정해서 사용하도록 하자.

각설하고 나는 아래와 같이 파이썬 스크립트에서 `os` 모듈을 사용해 환경 변수를 불러와 Cloudinary 설정을 구성했다.

```python
import cloudinary
import os

# 환경 변수에서 Cloudinary 인증 정보 불러오기
cloudinary.config(
  cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME'),
  api_key = os.environ.get('CLOUDINARY_API_KEY'),
  api_secret = os.environ.get('CLOUDINARY_API_SECRET'),
  secure = True # HTTPS를 사용하도록 설정
)

```

이렇게 하면 내 secret key를 노출하지 않고도 안전하게 스크립트를 실행할 수 있다.

이렇게 환경변수를 통한 api 키 작업이 완료되었으면 다음으로 넘어간다.

### 1. 이미지 URL 및 캡션 추출

스크립트는 먼저 노션의 이미지 블록에서 원본 이미지 URL과 사용자가 작성한 캡션 텍스트를 추출한다.

### 2. Cloudinary에 이미지 업로드

다음으로, 스크립트는 추출한 노션 이미지 URL을 Cloudinary API에 직접 전달하여 이미지를 업로드한다.

내가 수동으로 할 필요 없이 스크립트가 알아서 처리해주니 매우 효과적이다.


```python

import cloudinary.uploader

def upload_image_to_cloudinary(image_url):
    """이미지 URL을 받아 Cloudinary에 직접 업로드합니다."""
    try:
        # cloudinary.uploader.upload 함수는 URL을 직접 인자로 받을 수 있습니다.
        upload_result = cloudinary.uploader.upload(image_url)
        print(f"이미지 업로드 성공! Public ID: {upload_result['public_id']}")
        return upload_result
    except Exception as e:
        print(f"Cloudinary 업로드 에러: {e}")
        return None
```

### 3. 반응형 <img> 태그 생성

이미지가 성공적으로 업로드되면, Cloudinary는 고유한 `public_id`를 반환한다.

이 부분이 핵심인데. 이 ID를 그냥 마크다운 이미지 태그 `![]()`를 만드는 데 쓰지 않고, **반응형 웹을 위한 `<img>` 태그**를 생성하는게 포인트다.

이 **img 태그** 에는 `srcset` 값이 포함된다. 기능은 사용자의 화면 크기(데스크톱, 태블릿, 모바일 등)에 따라 가장 적절한 크기의 이미지를 브라우저가 선택하게 하는 것.

불필요한 데이터 낭비를 막고 로딩 속도를 획기적으로 개선해 준다.

```python

def generate_responsive_image_tag(public_id):
    """Cloudinary public_id로 반응형 HTML 이미지 태그를 생성합니다."""
    widths = [400, 800, 1200] # 원하는 이미지 너비들
    srcset_parts = []

    for width in widths:
        # Cloudinary URL 변환 기능으로 너비를 조절하고, 포맷과 품질을 자동 최적화합니다.
        transformed_url = cloudinary.CloudinaryImage(public_id).build_url(
            transformation=[
                {'width': width, 'crop': 'limit'},
                {'quality': 'auto', 'fetch_format': 'auto'}
            ]
        )
        srcset_parts.append(f"{transformed_url} {width}w")
    
    srcset = "\n".join(srcset_parts)
    fallback_src = cloudinary.CloudinaryImage(public_id).build_url(transformation={'width': 800}) # 기본 이미지

    return f'''<img 
  srcset="{srcset}"
  sizes="(max-width: 1200px) 100vw, 1200px"
  src="{fallback_src}"
  alt="이미지 설명">'''
```

### 4. 캡션 처리 및 최종 HTML 조합

마지막으로, 1단계에서 추출했던 캡션 텍스트를 간단한 스타일이 적용된 `<p>` 태그로 감싸고, 3단계에서 생성된 `<img>` 태그 바로 아래에 추가한다. 가운데 정렬도 시켜준다.

-----

## 결과물

이 모든 과정을 거치면, 노션의 간단한 이미지 블록 하나가 제 블로그에서는 다음과 같은 완전한 반응형 HTML 코드로 변환된다.

```markdown
<img 
  srcset="https://res.cloudinary.com/.../w_400,.../image.webp 400w,
https://res.cloudinary.com/.../w_800,.../image.webp 800w,
https://res.cloudinary.com/.../w_1200,.../image.webp 1200w"
  sizes="(max-width: 1200px) 100vw, 1200px"
  src="https://res.cloudinary.com/.../w_800,.../image.webp"
  alt="이미지 설명">

<p style="text-align:center; font-style:italic;">이것은 노션에서 작성했던 이미지 캡션입니다.</p>
```

-----

## 결론

MCP는 위대하다.

열심히 Gemini CLI를 굴린 결과 기존에 블로그 글을 작성하는데 있어 가장 난관이었던 반복적인 이미지 처리 작업을 자동화할 수 있었다.

이런 식으로 워크플로우의 병목 지점을 찾아내고 자동화하는 과정은 개발을 좋아하는 사람에게 또 다른 즐거움이 아닐까?

이렇듯 쓸데없이 시간을 잡아먹는 과정을 최적화하고  참 편해졌고, 그래서 더 좋아진 것 같다.