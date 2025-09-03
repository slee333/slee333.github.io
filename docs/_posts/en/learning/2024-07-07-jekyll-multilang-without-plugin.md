---
layout: post
permalink: /en/learning/:title/
title: "Supporting multiple languages in Jekyll without plugins"
date: 2024-07-07 00:00:00 -0400
tags: [blog, chatgpt, life, openai, python]
categories: learning
categorydisplay: Learning
lang: en
image: https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg
subtitle: I tried implementing the function myself because I didn't like the commonly used plugin. You can see that it's not such a difficult function!
translation_id: "jekyllmultilangwoplugin"
---
Starting a new blog sparked a small ambition. I wanted to support the blog in our language, English, and even Spanish (!).



I chose Jekyll as the platform for starting the new blog. However, the commonly used **multiple-languages-plugin** or **polyglot** in Jekyll presented several issues when I tried to use them. It required saving posts and pages in subfolders, which Jekyll didn't recognize. A major problem was that the sitemap wouldn't generate automatically.



As a result, I implemented a multi-language support blog with some hardcoding. The process is simple, and I will summarize it below.



## 1. Structure of Multi-Language Support Blog



![](https://i.imgur.com/WTkZdgV.png)  

![](https://i.imgur.com/JAEJZSd.png)  



* Korean introduction page (top) and English introduction page (bottom) URL *



The structure is simple. For those using Jekyll, it is clear that Jekyll's pages can be accessed via a **base URL** and a **detailed URL**. In my case, the base URL corresponding to the main page of the blog is `slee333.github.io`, and the detailed URL is `about`.



The method is to redirect to the corresponding language page if a language is included between the base URL and the detailed URL of the homepage. However, for the default language (Korean), you can access the post or page directly through `{base URL}/{detailed URL}`.



By now, you might have realized:

<span style='color:blue'>*What's this? Just create two pages or posts, one with a normal URL and the other with a URL including the /{language}/. Isn't that all?*</span> That's right. Let's specify the front matter as follows.




![](https://i.imgur.com/S82sYnM.png)   



* Front matter of the Korean page (left) and the English page (right) *



After specifying it this way, if the user switches the language on the introduction page from `kr` → `en`, you add `en` in front of /about/, and if it's from `en` → `kr`, you remove `en` from the URL. This makes it easy to switch between pages in different languages. You will also notice that the front matter specifies `lang` for each page to indicate the language of the current page, which I found to be a useful way to recognize the current page's language.



### 1.1. For Posts



Since we replace between different languages via `permalink`, this approach should be applied to the posts we upload. I chose to set `permalink` for every post as follows.


![](https://i.imgur.com/uFsQyJt.png)  

![](https://i.imgur.com/NHW5Gkt.png)  



* Above: Front matter of a Korean post; Below: Front matter of an English post *



The point is to set `permalink` to <span style='color:green'>/:title/</span>. For English posts, the `permalink` will naturally be <span style='color:green'>/en/:title/</span>. Here, `title` refers to the filename of the markdown file where the post is written (e.g., **2024-07-01-my-diary** would have `my-diary` as <span style='color:green'>:title</span>, and the `permalink` of the post would also be `/my-diary`).



In summary, if you provide the same post content in different languages, you can achieve multi-language support by having the same filename for both files, coupled with the above <span style='color:green'>:title </span> feature and the addition of the language URL segment.



Of course, you may wonder:



> How do you store two files with the same name in the same folder?



This is a valid point. Therefore, I create separate language folders within `_posts` to store the two files differently. I manage the posts by creating folders within `_posts` for each language and category.



![](https://i.imgur.com/qJvMBRb.png)  


* The markdown files for posts are organized in the structure `_posts/{language}/{category}/{post}`. *



## 2. Creating a Language Switch Button



Now that we have two corresponding pages for each language, it's time to create a means to switch to the other language page within the page. I created `header.html` in `root/_includes` and used this file as a header for all pages/posts, adding the following element to that header.


![](https://i.imgur.com/oPBcBU0.png)  


The example above shows that the options are `kr` and `en`, but ambitiously, I also included Spanish.



The `div` element has an ID of `language-select` and functions as a dropdown. When the current page is in Korean (`page.lang == 'kr'`), the option with the value "kr" is selected, and conversely, when it's in English, the option with the value "en" is selected. My page looks like this:


![](https://i.imgur.com/RmEermk.png)  


## 3. Linking the Redirection Function to the Language Switch Button



Now it's time to add the function that redirects to the appropriate URL when a different language is selected in the dropdown. I added the following JavaScript inside the `<script>` tag in `header.html`.


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



### 3.1. (Optional) CSS



To make the button look better, I added some CSS. Actually, I didn't design it all by myself; you can ask ChatGPT to create a good-looking button sample. The CSS I used is as follows. Modify it to suit your preference.



```scss

// Language switcher in navbar
.language-switcher {
  display: inline-block;
  margin-left: 20px;
  position: relative;
}

.language-switcher select {
  width: 100px;
  /* Increase the width of the dropdown menu */
  padding: 10px 15px;
  font-size: 1em;
  border: 1px solid rgb(157, 157, 157);
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  appearance: none;

  /* Remove default arrow */
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
  /* Add arrow symbol */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.8em;
  color: #777;
}

```



## 4. Updating the Navigation Bar



I realized I hadn't explained how the top navigation bar menus (Introduction, Daily Records, etc.) change when switching languages. The simplest method is hardcoding the navbar (I initially approached it this way).



```html

<nav class="site-nav">
  <div class="menu-toggle" id="menu-toggle">&#9776;</div> <!-- Hamburger icon -->
  <div class="trigger navbar">
    {% if page.lang == 'kr' %}
    <a class="page-link" href="{{ site.baseurl }}/about">소개</a>
    <a class="page-link" href="{{ site.baseurl }}/life">일상</a>
    <!-- Etc. .. -->
    {% endif %}
    {% if page.lang == 'en' %}
    <a class="page-link" href="{{ site.baseurl }}/en/about">About</a>
    <a class="page-link" href="{{ site.baseurl }}/en/life">Life</a>
    <!-- Etc. .. -->
    {% endif %}    

    <!-- The language switcher used earlier -->
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



Using Liquid's if function, the menu for the Korean language is displayed if the page language is kr, and the menu for the English language is displayed if the page language is en. This method works without any issues.



Now, I have modified the code in a way that eliminates hardcoding, and I will write about this method later.



## 5. The Final Look



Below is the appearance of the dropdown menu inserted in the `header` (specifically the **navbar**), which allows switching between English and Korean pages.


![](https://i.imgur.com/nTDXYal.png)  

![](https://i.imgur.com/nzsXVJL.png)  




Now, the multi-language support feature is implemented.



However, another challenge is how to translate and support different languages for my posts. While manually translating or using a translator to create a new markdown file for each translation is an option, I’m rather lazy and focused on developing a pipeline to convert Korean posts into English and Spanish, using ChatGPT, Python, Notion API, and other tools. I'll cover this in the next post.



---


