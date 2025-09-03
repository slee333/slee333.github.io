---
layout: post
permalink: /learning/:title/
title: "플러그인 없이 Jekyll 다중 언어 지원하기"
date: 2024-07-07 00:00:00 -0400
tags: [blog, chatgpt, life, openai, python]
categories: learning
categorydisplay: 공부일기
lang: kr
thumbnail: https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg
subtitle: 통용되는 플러그인이 그렇게 마음에 들지 않아 직접 기능을 구현 해 보았다. 보면 알겠지만 그렇게 어려운 기능이 아니다!
translation_id: "jekyllmultilangwoplugin"
---
이번에 새롭게 블로그를 시작하며 자그마한 욕심이 생겼다. 블로그를 우리말, 영어, 그리고 스페인어 (!) 로 지원 해 보고 싶다는 생각이었다.  

  

새롭게 블로그를 시작하는 플랫폼으로는 Jekyll을 선택하였는데, Jekyll에서 흔히 사용하는 **multiple-languages-plugin**이나 **polyglot**은 내가 사용하려 하니 여러가지 애로사항이 있었다. 포스트 및 페이지를 하위 폴더로 분류해서 저장해야 하는데 이 부분이 Jekyll에 인식되지 않는 문제였다. 사이트맵이 저절로 생성되지 않는다는 큰 문제는 덤이었다.  

  

때문에 결국 소정의 하드코딩을 섞어 다중 언어 지원 블로그를 구현하였다. 과정은 간단한데, 그 과정을 아래에 간략히 요약하고자 한다.  

  

## 1. 다중 언어 지원 블로그의 구조  

  

![](https://i.imgur.com/WTkZdgV.png)  

![](https://i.imgur.com/JAEJZSd.png)  


한국어 소개 페이지 (상단)과 영문 소개 페이지 (하단) URL  

  

구조는 간단하다. Jekyll을 사용하시는 분들이라면 다들 아시겠지만, 지킬의 페이지는 **기본 URL**과 **세부 URL**을 통해 접근할 수 있다. 내 경우 기본 URL은 블로그의 기본 페이지에 해당하는 `slee333.github.io`가 되겠고 세부 URL은 `about`이다.   

  

홈페이지의 기본 URL과 세부 URL 사이에 언어가 들어가 있으면 해당 언어 페이지로 리다이렉트 해주는 방식이다. 다만 기본 언어인 한국어의 경우 이러한 과정 없이 바로 `{기본 URL}/{세부 URL}`을 통해 해당 포스트 혹은 페이지를 접속 가능하도록 하였다.  

  

여기까지 보셨으면 다들 깨달으셨을 것이다. <span style='color:blue'>*뭐야, 그냥 페이지나 포스트 두 개 만들어서 하나는 그냥 url로, 다른 하나는 /{언어}/를 끼워 넣은 url로 주소 지정해주면 되는 거 아니야?*</span> 맞다 그렇다. Front matter를 다음과 같이 지정해주자.   

  

![](https://i.imgur.com/S82sYnM.png)  

한국어 페이지의 front matter (좌)와 영문 페이지의 front matter (우)  

  

이런 식으로 지정 후, 소개 페이지 내에서 사용자가 언어를 바꿀 때, `kr` → `en` 일 시 /about/ 앞에 `en` 을 붙여주고, `en` → `kr` 일 시 url 내의 `en`을 없애주면 페이지 사이의 언어 교환을 용이하게 할 수 있다.  

또 위에 front matter에 각 페이지의 언어를 명시하기 위한 `lang` 이 지정되어 있는 부분 역시 보일텐데, 현재 페이지의 언어를 인식 할 수 있는 유익한 수단으로 나는 쏠쏠하게 잘 써먹고 있다.  

  

### 1.1. 포스트의 경우   

`permalink`를 통해 서로 다른 언어 사이를 치환하는 만큼, 우리가 업로드하는 포스트에도 이러한 접근법 사용이 필요하다. 나는 다음과 같이 permalink를 모든 포스트마다 설정하는 방식을 선택하였다.   

![](https://i.imgur.com/uFsQyJt.png)  

![](https://i.imgur.com/NHW5Gkt.png)  

위: 우리말 포스트의 front matter ; 아래: 영문 포스트의 front matter  

  

포인트는 `permalink`를 <span style='color:green'>/:title/</span> 로 설정 해 주는 것이다. 영문 포스트의 경우 자연스럽게 `permalink`가 <span style='color:green'>/en/:title/</span>이 될 것이다. 여기서 title의 경우 포스트가 쓰여진 마크다운 파일의 파일이름을 뜻한다. (ex: **2024-07-01-나의 일기** 의 경우 **나의 일기**가 <span style='color:green'>:title</span>이 되며, 포스트의 `permalink` 또한 `/나의-일기` 가 될 것이다.)  

한 마디로, 같은 내용의 포스트를 서로 다른 언어로 제공하는 경우, 두 파일의 이름만 같다면, 상기한 <span style='color:green'>:title </span>기능과 언어 url 구문 추가를 통해 다중 언어 지원이 가능하다는 것이다.   

  

물론 이런 질문이 있을 것이다.   

  

> 두 파일의 이름이 같다면 그걸 같은 폴더에 어떻게 수납하나요?  

  

타당한 지적이다. 따라서 _post 내에 별도 언어 폴더를 만들어 두 파일을 각기 다르게 보관해준다. 필자는 _post 안에 언어 및 카테고리 별 폴더를 만들어 포스트들을 관리하고 있다.  

  

![](https://i.imgur.com/qJvMBRb.png)  

`_post/{언어}/{카테고리}/{포스트}`순으로 포스트 마크다운 파일들이 정리되어 있는 모습이다.  

## 2. 언어 치환 버튼 만들기  

이제 두 가지 언어에 대응하는 페이지 두 개를 만들었으니, 페이지 내에서 다른 언어 페이지로 갈 수 있는 수단을 만들어줄 차례다. 나는 `root/_includes`에 `header.html`을 만들어서 해당 파일을 모든 페이지/포스트에 대한 header로 사용하고 있었는데, 해당 header에 난 다음과 같은 엘리먼트를 추가하였다.  

  

![](https://i.imgur.com/oPBcBU0.png)  

  

위에서 보여준 예시대로라면 option으론 kr과 en이 전부이겠지만, 난 야심차기에 스페인어 역시 넣어주었다.  

  

이 div 엘리먼트는 `language-select`라는 id를 가지며, 드랍다운으로 기능한다. 현재 페이지가 한국어일 때(`page.lang == ‘kr’` )는 option 중 value가 ”kr”인 option이 selected, 반대로 영어일 때는 value가 ‘en’인 option이 selected라는 프로퍼티를 얻게 될 예정이다. 내 페이지에서는 다음과 같이 보인다.  


![](https://i.imgur.com/RmEermk.png)  

  

## 3. 언어 치환 버튼에 리다이렉션 함수 연동하기  

이제 이 드랍다운에 위에서 이야기했듯 다른 언어를 클릭했을 시 해당 url 로 리다이렉트 시켜주는 기능을 추가 할 차례이다. 나는 다음 자바스크립트를 `header.html` 내에 `<script>` 태그 안에 추가하였다.  

  

`<script>`  

```javascript
// 위에서 표기한 language-select 엘리먼트를 선택한다.
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', function () {
  // language-select의 option이 변화할 때, redirectPage 함수에 현재 value를 입력값으로 넣는다.
  // 즉 option들의 value인 "kr", "en", "es" 등이 입력된다.
  redirectPage(this.value);
});
  
// redirect Page 함수.
function redirectPage(selectedLang) {
  let currentUrl = window.location.pathname;

  // 현 URL에서, url이 /en/ 혹은 /es/로 시작할 시 해당 부분을 지운다.
  if (currentUrl.startsWith('/en/') || currentUrl.startsWith('/es/')) {
    currentUrl = currentUrl.replace(/^\/(en|es)\//, '/');
  }

  // 입력값이 "kr"이 아닐 때, 선택 된 언어 (현 예시에선 es 혹은 en)가 url 앞쪽에 삽입된다.
  if (selectedLang !== 'kr') {
    currentUrl = `/${selectedLang}${currentUrl}`;
  }
  
  // 혹여 / 기호가 중복될 수 있으니 정리해준다.
  currentUrl = currentUrl.replace(/\/+/g, '/');

  // 새로운 URL로 리다이렉트!
  window.location.href = `${window.location.origin}${currentUrl}`;
}  
```

`</script>`  

  

  

### 3.1. (선택) CSS  

버튼을 저대로 두면 조금 없어보이니까 css를 추가해주었다. 사실 내가 하나하나 딴 건 아니고, chatGPT에게 버튼 좀 있어보이게 만들어달라 하면 알아서 샘플을 가져다 준다. 내가 사용한 css는 이렇다. 취향에 맞게 변형하여 사용하시라.  

  

```scss
// Language switcher in navbar
.language-switcher {
  display: inline-block;
  margin-left: 20px;
  position: relative;
}

.language-switcher select {
  width: 100px;
  /* 드롭다운 메뉴의 너비를 넓힘 */
  padding: 10px 15px;
  font-size: 1em;
  border: 1px solid rgb(157, 157, 157);
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  /* 기본 화살표 제거 */
  -webkit-appearance: none;
  -moz-appearance: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.language-switcher select:focus {
  border-color: var(--theme-color);
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.language-switcher::after {
  content: "\25BC";
  /* 화살표 기호 추가 */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.8em;
  color: #777;
}  
```

  

## 4. 네비게이션 바 업데이트하기  

아 그러고 보니 언어를 바꾸었을 때 상단 네비게이션 바 내 메뉴들(소개, 일상기록, 등등)을 어떻게 바뀌는지에 대한 설명을 하지 않았다. 가장 간단한 방법은 navbar 내에 하드코딩을 하는 방법이다 (처음엔 나도 이렇게 접근하였다)  

  

```html
<nav class="site-nav">
  <div class="menu-toggle" id="menu-toggle">&#9776;</div> <!-- Hamburger icon -->
  <div class="trigger navbar">
	  {% if page.lang == 'kr' %}
	  <a class="page-link" href="{{ site.baseurl }}/about">소개</a>
		<a class="page-link" href="{{ site.baseurl }}/life">일상</a>
	  <!-- 기타 등등 .. -->
	  {% endif %}
	  {% if page.lang == 'en' %}
	  <a class="page-link" href="{{ site.baseurl }}/en/about">About</a>
		<a class="page-link" href="{{ site.baseurl }}/en/life">Life</a>
		<!-- 기타 등등 .. -->
	  {% endif %}    

	  <!-- 아까 사용했던 language-switcher -->
    <div class="language-switcher">
      <select id="language-select">
        <option value="kr" {% if page.lang=='kr' %}selected{% endif %}>한국어</option>
        <option value="en" {% if page.lang=='en' %}selected{% endif %}>English</option>
        <option value="es" {% if page.lang=='es' %}selected{% endif %}>Español</option>
      </select>
    </div>
  </div>

</nav>  
```

  

Liquid의 if 기능을 이용해 페이지 언어가 kr이면 한국어 메뉴가, en이면 영문 메뉴가 보이도록 한 방식이다. 사실 이렇게 해도 작동하는데 전혀 문제가 없다.  

  

지금은 하드코딩에서 벗어난 방법으로 코드를 수정하였는데, 이 방법에 대해선 추후 더 서술하도록 하겠다.   

  

## 5. 완성 된 모습  

  

이제 아래와 같이 `header` 부분에 (정확히는 **navbar **부분에) 삽입된 드랍다운 메뉴를 통해 페이지 내 영문 및 한국어를 변환 할 수 있는 모습을 확인 할 수 있다.  

  

![](https://i.imgur.com/nTDXYal.png)  

![](https://i.imgur.com/nzsXVJL.png)  

  

이제 이렇게 다중 언어 지원 기능이 구현되었다.  

  

  

하지만 이제 또 다른 난관은 어떻게 내 포스트를 서로 다른 언어로 번역하고 지원하는가이다. 물론 수동으로 번역하건, 번역기를 이용하건 번역을 한 다음 마크다운 파일을 새로 만들어 올려주면 되는 일이기는 하다. 하지만 나는 다소 게으른 사람이라 한국어로 쓰여진 포스트를 영문 및 스페인어로 바꾸어 올리는 파이프라인을 개발하는데 집중했고 ChatGPT, 파이썬, Notion API 등을 이용해서 해당 기능을 구현 할 수 있었다. 다음 포스트에서 이 부분에 대해 다루도록 하겠다.  

  

---

  

