---
layout: post
permalink: /learning/:title/
title: "블로그 포스트 번역 자동화하기 (feat. ChatGPT)"
date: 2024-09-21 00:00:00 -0400
tags: [3.1, blog, chatgpt, life, llama, llm]
categories: learning
categorydisplay: 공부일기
lang: kr
thumbnail: https://i.imgur.com/nyv5CB7.png
subtitle: 대형 언어 모델의 가능성은 무궁무진하다. 블로그 포스트 번역에서도 예외가 아니다
translation_id: "jekyllblogllm"
---
이전 포스트 들에서는 **[다중 언어 지원 Jekyll post 만들기](https://slee333.github.io/learning/jekyll-multilang-without-plugin/)**, 그리고 **[Notion을 이용해서 Jekyll 블로그 포스팅을 쉽게 하는 법](https://slee333.github.io/learning/Jeykll-notion-to-jekyll/)**을 다루어 보았다.  
  
이전 포스트에서 노션 페이지를 마크다운으로 자동으로 번역하는 함수의 최종본은 이랬다.  
  
```python
page_url = "내 페이지 URL"

# Example usage
page_id = extract_notion_page_id(page_url)
print("Notion Page ID:", page_id)

# Get the front matter and markdown content of the Notion page
pfm, pmd = get_jekyll_post_from_notion_page(page_id)

# Write the Jekyll post Markdown file in Korean
_,_ = write_jekyll_post_from_fm_md(pfm,pmd)    
```
  
간단히 설명하면 노션 페이지 url에서 `get_jekyll_post_from_notion_page` 함수를 이용해 프론트 매터(`pfm`)와 페이지 내용 (`pmd`)을 추출하고, `write_jekyll_post_from_fm_md` 함수를 이용해서 실제 마크다운 파일을 만들어주는 형식이다.  
  
이번 포스트에서는 위를 바탕으로 완성된 마크다운 페이지를 어떻게 **ChatGPT**, 혹은 **Llama 3.1** 과 같은 대형 언어 모델을 이용해서 자동화하는지를 다루어보겠다. 앞의 두 포스트 보다는 짧을 것이야!  
  
---
## ChatGPT 이용하기  
  
  
**1. API 설정하기**  
대형 언어 모델 중 아무래도 가장 유명한 모델은 ChatGPT 일 것이다. ChatGPT 유료 버전을 사용하는 분들이라면 아래와 같이 ChatGPT API를 이용 할 수 있다.  
  
우선 [ChatGPT API 웹사이트](https://platform.openai.com/)에 들어가서 프로젝트를 만들어준다. 내 경우에는 이미 만들어준 프로젝트들이 몇 개 보이지만, 새로 프로젝트를 만드는 사람이라면 <span style='color:red'>+ Create Project</span> 버튼을 눌러 새 프로젝트를 만들어주자.  
  
![](https://i.imgur.com/za6DJNp.png)  
*새 프로젝트를 만들어주자.*  
  
API 페이지에서 대쉬보드(Dashboard)로 들어가면, API 키 (API Keys)를 만드는 탭이 왼쪽에 있다. API Keys 에 들어간 다음, 오른쪽의 <span style='color:green'>Create New Secret Key</span>를 사용해서 API를 호출 할 때 사용되는 시크릿 키를 만들어주자.  
  
![](https://i.imgur.com/Di6i5Od.png)  
  
**2. 파이썬에서 API 호출하기**  
이제 이렇게 API 키가 만들어졌으면, 파이썬 코드 내에서 API를 호출해야 한다.  
  
이 과정에서 API 키를 파이썬 코드 내에 바로 집어넣을 수가 있는데, 만약 내가 내 파이썬 코드를 GitHub에 올릴 생각이라면 주의가 필요하다. GitHub에 내 시크릿 키가 노출되어 악용당할 수 있기 때문이다. 나는 내 파이썬 코드를 github page 리포지토리에 포함시켜 놓은 상황이기에 시크릿 키를 바로 파이썬 코드 내에 포함시키기보단 환경변수로서 시크릿 키를 불러오는 방식을 사용했다.   
  
이전 포스트에서 `.env` 파일을 어떻게 만들고 관리하는지는 간단히 소개하였지만 그 과정을 다시 한 번 소개해보겠다.  
  
1. 파이썬 코드가 포함된 디렉토리에 `.env` 파일을 작성한다.  
1. `.env` 파일의 내부는 다음과 같이 작성한다. `OPENAI_API_KEY = 내_시크릿_키` (String처럼 “”를 붙일 필요 없이 그냥 그대로 붙여넣어주면 된다)  
1. `.env` 파일이 Github에 올라가버리면 이 모든 작업이 의미가 없어진다. `.gitignore` 파일에 .env를 추가하자. 내 `.gitignore` 파일은 예시로 다음과 같다.  
  
위 과정을 완료했으면, 파이선 코드 내에서 시크릿을 불러오고 OpenAI 클라이언트를 실행해보자. 앞선 포스트에서 소개했던 Notion API를 불러오는 과정과 합치면 코드는 다음과 같다.  
  
```python
from openai import OpenAI
from dotenv import load_dotenv
from notion_client import Client

# Load .env file
load_dotenv()

# From .env get notion_token
notion_token = os.getenv('NOTION_TOKEN')
notion = Client(auth=notion_token)

# Load OpenAI API
client = OpenAI(
  api_key=os.getenv('OPENAI_API_KEY'),
)
  
```
  
이 과정에서 `openai`라이브러리가 설치되어 있지 않다면 pip를 이용해 설치해주자. 커맨드 라인에서는  
  
```python
pip install openai  
```
  
커맨드를 통해서, Jupyter Notebook에서는  
  
```python
%pip install openai  
```
  
커맨드를 통해 설치 할 수 있다.  
  
  
**3. ChatGPT를 이용하여 번역하기**  
이제 남은 과정은 정의된 OpenAI client 변수인 `client` 를 통해 마크다운 파일을 번역시키는 과정이다. 앞선 함수에서 마크다운 요소들을 `pmd`라는 list로 받아왔었는데, ChatGPT의 입력값은 텍스트여야 하니 list를 `\n`으로 구분된 큰 텍스트 파일로 만들어주어야 한다.  
  
내가 정의한 함수는 다음과 같다.  
  
```python
def translate_markdown(markdown_string, frontmatter_dict, target_language):
    """
    Translate markdown content to the target language using OpenAI.

    Parameters:
    markdown_string (list): List of markdown elements joined with ' '.
    target_language (str): Target language for translation.

    Returns:
    str: Translated markdown content.
    """
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a translator of a Jekyll blog. Your job is to translate contents in markdown into given language; keep all markdown syntax."},
            {"role": "user", "content": f"Translate the following Korean markdown page to {target_language}: {markdown_string}"}
        ]
    )

    title_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Translate following Korean phrase to given language."},
            {"role": "user", "content": f"Translate this to {target_language}: {frontmatter_dict['title']}"}
        ]
    )

    subtitle_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Translate following Korean phrase to given language."},
            {"role": "user", "content": f"Translate this to {target_language}: {frontmatter_dict['subtitle']}"}
        ]
    )

    return completion.choices[0].message, title_completion.choices[0].message, subtitle_completion.choices[0].message  
```
  
간략히 설명하자면,  
  
위 함수 `translate_markdown`의 경우, OpenAI의 API를 사용하여 마크다운 콘텐츠를 원하는 언어로 번역하는 함수이고, 주요 요소는 다음과 같다:  
- `markdown_string`: 마크다운 요소들의 리스트를 `' '`로 연결한 문자열이다.  
- `frontmatter_dict`: 제목(`title`)과 부제목(`subtitle`)를 포함한 `front matter`의 여러 요소들을 담고 있는 딕셔너리 자료형 요소이다.  
- `target_language`: 번역할 대상 언어를 나타낸다.  
  
함수는 `client.chat.competions.create` 를 사용하여 chatgpt의 여러 모델들을 사용해서 번역한다.  
  
구성은 다음과 같다:  
1. `gpt-4o` 모델을 사용해서 마크다운 콘텐츠를 목표 언어로 번역한다. 이 때 마크다운 문법은 그대로 유지된다. 이 때 입력 언어는 한국어로 고정이기에 프롬트 내에서도 그 부분을 강조했다.  
1. `gpt-3.5-turbo` 모델을 사용해서 `title`과 `subtitle`을 각각 번역한다.  
1. 번역된 마크다운 콘텐츠, 제목, 부제목을 반환한다.  
  
그리고 위 함수를 이용해서 다음과 같은 과정을 거친다  
  
```python
# Translate the markdown content to English
translated_content_en, en_title, en_subtitle = translate_markdown(' '.join(pmd), pfm, 'English')
en_md_list = translated_content_en.content.split('\n')

_,_ = write_jekyll_post_from_fm_md(pfm,en_md_list, language='en', multilang_title=en_title.content, multilang_subtitle=en_subtitle.content)  
```
  
`split` 기능을 이용하여 LLM을 사용하느라 잠시 합쳤던 마크다운 파일을 다시 리스트 형태로 바꾸어준다.   
  
그리고 [이전 포스트](https://slee333.github.io/learning/Jeykll-notion-to-jekyll/)에서 이용하였던 `write_jekyll_post_from_fm_md` 함수를 이용해서 영문 제목과 부제목을 포함한 마크다운 파일을 해당되는 디렉토리에 생성해주면 과정은 끝이 난다.  
  
  
---
## Llama 3.1 이용하기  
  
위 방법은 OpenAI의 API를 이용하기에 부득이하게 유료 서비스를 구독해야 한다. API에 입력하는 값의 길이 만큼 (토큰 길이) 값을 지불해야 하는 방식이고 고성능 모델일수록 더 높은 가격을 지불해야 하는 방식이다.  
  
하지만 최근엔 **Meta**에서 Llama 3.1이라는 무료 로컬 대형 언어 모델을 공개하면서 유료 서비스 구독 없이도 컴퓨터 성능만 충분하다면 비용 걱정 없이 로컬에서 대형 언어 모델을 돌려 볼 수 있게 되었다.  
  
LLama 3.1 의 경우 세 가지 모델이 있다. 8B, 70B, 405B 모델인데 앞의 숫자가 클 수록 성능이 좋아진다. 그리고 이 중 Llama 3.1 405B의 경우 GPT 4보다 성능이 뛰어나다 알려져 있다. 아래 표를 참조하자.  
  
![](https://i.imgur.com/FTJNtnp.png)  
  
흔히 8B의 경우 간단한 텍스트 요약 및 분류 등에, 70B의 경우 콘텐트를 작성하거나 하는 작업에, 405B의 경우 산업용도, 합성 데이터 생성, 연구 등에 적절하다 알려져 있지만 집 컴퓨터 성능이 그리 뛰어나지 않은 나는 망설임 없이 Llama 3.1 8B를 선택하였다.  
  
그래서 설치는 어떻게 하느냐? 공식 홈페이지를 통하는 방법과 Ollama를 통하는 방법이 있는데, 후자가 더 쉬워서 나는 후자를 선택했다. 아래서는 Ollama로 Llama 3.1을 어떻게 설치하고 활용하는지를 설명하겠다. 전자는 잘 모르니까 설명하지 않을 예정이다.  
  
**1. Ollama 이용해서 Llama 3.1 설치하기**  
  
  
![](https://i.imgur.com/6Nia1Lg.png)  

***ollama 공식 홈페이지의 다운로드 페이지***
  
우선 Ollama [공식 홈페이지](https://ollama.com/download/windows)를 방문하여 소프트웨어를 설치해주어야 한다. 각자의 OS 환경에 맞추어 적절히 설치해주자.  
  
설치가 완료되었다면, Ollama 홈페이지에 아이디를 만들고 로그인 한 후, 오른쪽 위 `Models` 섹션을 찾아 들어가주자. 그러면 다음과 같은 화면이 나온다.  
  
![](https://i.imgur.com/27vjcnG.png)  
  
여기서 llama 3.1를 선택 한 후 들어가보면 설치 명령어를 복사 할 수 있다.   
  
![](https://i.imgur.com/7PqqsAD.png)  
  
복사 한 후 터미널에 붙여넣어주자. llama3.1 8B를 사용하는 경우 명령어는 다음과 같다.  
  
```python
ollama run llama3.  
```
  
**2. 파이썬으로 llama 3.1 불러오기**  
설치한 llama 3.1 8B 모델을 터미널에서 실행 할 수도 있지만, 우리가 원하는 건 파이썬에서 이걸 돌리는 일이다. 과정은 다음과 같다.  
  
우선 pip에서 ollama를 설치해주어야한다. 다음 커맨드를 실행하자.  
```python
pip install -U langchain-ollama  
```
  
아나콘다 터미널 등에서 설치한다면 위 커맨드를 그대로 입력하면 될 거고, 주피터 노트북 환경이라면 맨 앞에 `%`를 붙여주면 될 것이다.  
  
설치가 완료되었으면 라이브러리를 불러와서 llama 3.1를 실행시키면 된다. 주의 할 점은, 이 과정에서 ollama가 컴퓨터 내에 실행 된 상황이어야 한다는 점이다. 그냥 ollama 앱을 백그라운드에 실행 시켜 놓은 상태면 충분하다. 이 상황에서 다음 코드를 실행해 llama 3.1을 `llm`이라는 변수에 지정한다.  
  
```python
from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="llama3.1")  
```
  
그리고 `llm`에 프롬트를 넣어 실행해주자. 난 시범용으로 다음과 같은 프롬프트를 사용해보았다.  
  
```python
response = llm.invoke("Yo what up you runnign alright?")
print(response)


#### I got the response below: ####
# Ha ha, I'm doing great, thanks for asking! I'm a large language model, 
# so I don't have a physical body, but I'm always ready to chat and help 
# with any questions or topics you'd like to discuss. 
# How about you? What's going on in your world today?  
```
  
위와 같이 프롬트를 주었을 때 난 코멘트된 부분과 같은 답변을 받았다.  
  
이제 llama 3.1이 정상작동 하는 모습을 확인했으니, llama 3.1을 사용하는 번역 함수를 만들면 완성이다. 위에 이미 만들어 놓은 함수를 다음과 같이 조금 바꾸었다.  
  
```python

def translate_markdown_llama(markdown_string, frontmatter_dict, target_language):
    """
    Translate markdown content to the target language using OpenAI.

    Parameters:
    pmd (list): List of markdown strings.
    target_language (str): Target language for translation.

    Returns:
    str: Translated markdown content.
    """

    md_prompt = f""" 
    You are a translator for a Jekyll blog. Your task is to translate the following Korean markdown content into {target_language}, preserving all markdown syntax.
    
    Instructions:
    - Translate the text content from Korean to {target_language}.
    - Preserve all markdown formatting and syntax exactly as in the original.
    - Do not translate or change any code inside code blocks denoted by (triple backticks).
    - Exception: Translate comments within code blocks (e.g., lines starting with #, //, or enclosed in /* */) into {target_language}.
    - Do not add, remove, or alter any markdown elements.
    - Do not include any explanations, comments, or additional text.
    - Output only the translated markdown content.
        
    Content to translate:
    {markdown_string}
    """

    md_response = llm.invoke(md_prompt, temperature=0.0)

    title_prompt = f""" 
    You are a translator for a Jekyll blog. Your task is to translate the following Korean phrase to {target_language}.
    
    Translate the following blog title to {target_language}: {frontmatter_dict['title']}
    Do not include any explanations, comments, or additional text. Just return the translated title.
    """

    title_response = llm.invoke(title_prompt, temperature=0.0)

    subtitle_prompt = f""" 
    You are a translator for a Jekyll blog. Your task is to translate the following Korean phrase to {target_language}.
    
    Translate the following post subtitle to {target_language}: {frontmatter_dict['subtitle']}
    Do not include any explanations, comments, or additional text. Just return the translated subtitle.
    """

    title_response = llm.invoke(subtitle_prompt, temperature=0.0)

    return md_response, title_response, title_response  
```
  
마크다운, 제목, 그리고 소제목을 llama 3.1을 사용해서 번역하는 방식이다.  

**3. Llama 3.1의 번역 성능**

사실 좀 아쉽다. 이 포스트의 영문 및 스페인어 버전을 위 llama 3.1 8B 모델을 사용해서 번역하려 해 보았는데, GPT-4를 사용해서 하듯 전체 포스트를 통째로 번역하기란 불가능했고, 위의 함수를 수정해서 마크다운 요소 하나하나를 번역하는 방식으로 실행해야 했는데 이 과정이 시간이 많이 들었다.

또한, 마크다운 요소의 번역본만을 제공하고 별도의 코멘트를 남기지 않도록 하는 과정 역시 프롬트 엔지니어링을 통해서 해결해야 했는데 이 과정 역시 쉽지 않았다. 번역만 하면 자꾸 *“Here is translated version…”* 어쩌구 하면서 사족이 달리더라. 결국 이 포스트는 ChatGPT를 사용해서 역시 번역하였다.

내가 ChatGPT를 좋아하기는 하지만 계속해서 지불해야 하는 토큰 값은 데이터 규모가 커질수록 부담인 만큼 내 컴퓨터를 혹사시키는 범위 안에서 얼마든 LLM을 돌릴 수 있는 llama 3.1의 등장은 굉장히 고무적인데, 번역 성능은 내가 8B를 사용해서 그런지 많이 아쉽다. 아직은 GPT를 계속 번역 과정에 이용 할 듯 하다.

물론 이와 별개로 단순한 작업의 경우 llama 3.1 8B 역시 굉장히 뛰어난 성능을 보여주는데, 이 부분은 나중에 다른 포스트로 다루어 보도록 하겠다.

---

아무튼 이렇게 해서 내 블로그 작업 세팅이 끝났다. 이렇게 세팅을 해 놓고 나니, 노션에서 페이지를 자유롭게 작성하고, 주피터 노트북에서 URL을 끌어와 실행만 하면 다중 언어 지원 포스트가 작성이 되어서 매우 편하다. 물론 중간에 몇 가지 손 봐야 할 부분이나 디테일이 잘못 번역되는 등의 흠결은 있지만, 아무튼 글을 쓰는 과정이 압도적으로 편해진 것이 사실이다. 앞으로 더 많은 기능을 블로그에 추가하려 하는데, 본격적으로 하게 되면 그 과정들 역시 이렇게 포스트로 남겨놓도록 하겠다!