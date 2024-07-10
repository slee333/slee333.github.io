---
layout: post
permalink: /en/learning/:title/
title: "Supporting multiple languages in Jekyll without plugins"
date: 2024-07-07 00:00:00 -0400
tags: life blog python openai ChatGPT
categories: learning
categorydisplay: Learning
lang: en
thumbnail: https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg
subtitle: I tried implementing the function myself because I didn't like the commonly used plugin. You can see that it's not such a difficult function!
---
Starting a new blog sparked a small ambition. I wanted to support the blog in our language, English, and even Spanish (!).



I chose Jekyll as the platform for starting the new blog. However, the commonly used **multiple-languages-plugin** or **polyglot** in Jekyll presented several issues when I tried to use them. It required saving posts and pages in subfolders, which Jekyll didn't recognize. A major problem was that the sitemap wouldn't generate automatically.



As a result, I implemented a multi-language support blog with some hardcoding. The process is simple, and I will summarize it below.



## 1. Structure of Multi-Language Support Blog



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/bdd37143-42c9-4174-b10f-ac091a41725d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=643c116c7b2fae40de362774cdef289296d89dbe015f66e348fa9c0d9dad4e2c&X-Amz-SignedHeaders=host&x-id=GetObject)  

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/4ecb8229-ed37-482c-803b-094f8cf618cd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=60c67a07a06b2b744ad527c3c04d4c6a82fce7fd2d2c31a34d926953c62dc580&X-Amz-SignedHeaders=host&x-id=GetObject)  



* Korean introduction page (top) and English introduction page (bottom) URL *



The structure is simple. For those using Jekyll, it is clear that Jekyll's pages can be accessed via a **base URL** and a **detailed URL**. In my case, the base URL corresponding to the main page of the blog is `slee333.github.io`, and the detailed URL is `about`.



The method is to redirect to the corresponding language page if a language is included between the base URL and the detailed URL of the homepage. However, for the default language (Korean), you can access the post or page directly through `{base URL}/{detailed URL}`.



By now, you might have realized:

<span style='color:blue'>*What's this? Just create two pages or posts, one with a normal URL and the other with a URL including the /{language}/. Isn't that all?*</span> That's right. Let's specify the front matter as follows.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/f776eb0e-3278-4375-964e-5bdc6a0d4b51/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=84a46933c1d20b5fa967ce87bf2597ee79f4f0898a90dd2ef603ef7f9873d917&X-Amz-SignedHeaders=host&x-id=GetObject)  



* Front matter of the Korean page (left) and the English page (right) *



After specifying it this way, if the user switches the language on the introduction page from `kr` → `en`, you add `en` in front of /about/, and if it's from `en` → `kr`, you remove `en` from the URL. This makes it easy to switch between pages in different languages. You will also notice that the front matter specifies `lang` for each page to indicate the language of the current page, which I found to be a useful way to recognize the current page's language.



### 1.1. For Posts



Since we replace between different languages via `permalink`, this approach should be applied to the posts we upload. I chose to set `permalink` for every post as follows.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/2d899b4d-42ce-4844-b1fa-19215ff20007/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=bec4107461ee50efe2e03ebd212c3c5ab8fb8d5ba3adec7fa07a378f5d0a6da2&X-Amz-SignedHeaders=host&x-id=GetObject)  

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/935f8e65-b579-4fad-a44a-90198b705a94/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=20bb09a84265d33822de260f019c70a4ff0c805c0de88b6947e67d6d3f4700af&X-Amz-SignedHeaders=host&x-id=GetObject)  




* Above: Front matter of a Korean post; Below: Front matter of an English post *



The point is to set `permalink` to <span style='color:green'>/:title/</span>. For English posts, the `permalink` will naturally be <span style='color:green'>/en/:title/</span>. Here, `title` refers to the filename of the markdown file where the post is written (e.g., **2024-07-01-my-diary** would have `my-diary` as <span style='color:green'>:title</span>, and the `permalink` of the post would also be `/my-diary`).



In summary, if you provide the same post content in different languages, you can achieve multi-language support by having the same filename for both files, coupled with the above <span style='color:green'>:title </span> feature and the addition of the language URL segment.



Of course, you may wonder:



> How do you store two files with the same name in the same folder?



This is a valid point. Therefore, I create separate language folders within `_posts` to store the two files differently. I manage the posts by creating folders within `_posts` for each language and category.


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/0e182393-7e63-48ae-8abb-c5745169d85d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=38ae87166a735b4f753d0db8024c010abf0cd9050063dbf6601c0960c42adb4f&X-Amz-SignedHeaders=host&x-id=GetObject)  


* The markdown files for posts are organized in the structure `_posts/{language}/{category}/{post}`. *



## 2. Creating a Language Switch Button



Now that we have two corresponding pages for each language, it's time to create a means to switch to the other language page within the page. I created `header.html` in `root/_includes` and used this file as a header for all pages/posts, adding the following element to that header.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/fcb52e39-320b-4e11-b3b7-8a4883e76acb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=2cf3f7ae805246a2e51d14d7d286689e0de0af8c8db2ebff5d0cfcadce495143&X-Amz-SignedHeaders=host&x-id=GetObject)  


The example above shows that the options are `kr` and `en`, but ambitiously, I also included Spanish.



The `div` element has an ID of `language-select` and functions as a dropdown. When the current page is in Korean (`page.lang == 'kr'`), the option with the value "kr" is selected, and conversely, when it's in English, the option with the value "en" is selected. My page looks like this:



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/4db530b8-8ec7-42d7-b420-5dd960e6fae7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=5c99036ea2bbd271e429d12a7cffc11143891b0e695a0204ba762023be4a0459&X-Amz-SignedHeaders=host&x-id=GetObject)  


## 3. Linking the Redirection Function to the Language Switch Button



Now it's time to add the function that redirects to the appropriate URL when a different language is selected in the dropdown. I added the following JavaScript inside the `<script>` tag in `header.html`.



```html

<script>

javascript

// Select the language-select element mentioned above.

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', function () {

  // When the option of language-select changes, the current value is fed into the redirectPage function.

  // So, options like "kr", "en", "es" will be fed.

  redirectPage(this.value);

});



// redirectPage function.

function redirectPage(selectedLang) {

  let currentUrl = window.location.pathname;



  // Remove the segment from the URL if it starts with /en/ or /es/.

  if (currentUrl.startsWith('/en/') || currentUrl.startsWith('/es/')) {

    currentUrl = currentUrl.replace(/^\/(en|es)\//, '/');

  }



  // If the input value is not "kr", insert the selected language (in this example, es or en) at the front of the URL.

  if (selectedLang !== 'kr') {

    currentUrl = `/${selectedLang}${currentUrl}`;

  }



  // Clean up any possible duplicate slashes.

  currentUrl = currentUrl.replace(/\/+/g, '/');



  // Redirect to the new URL!

  window.location.href = `${window.location.origin}${currentUrl}`;

}

```

</script>



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




![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/0ffb491e-2aff-400d-a562-4145ff373dc6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=de4ffa7fc73d795504eac7dda841f618cf2260b0c5f77d0271db49b76b9cf172&X-Amz-SignedHeaders=host&x-id=GetObject)  

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/852c921a-5351-4e21-81ed-3bc0e80c19b7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=45f43133114e7a9435bc8fd25508d01ada18f832505d89e2b1265c519f46db4a&X-Amz-SignedHeaders=host&x-id=GetObject)  



Now, the multi-language support feature is implemented.



However, another challenge is how to translate and support different languages for my posts. While manually translating or using a translator to create a new markdown file for each translation is an option, I’m rather lazy and focused on developing a pipeline to convert Korean posts into English and Spanish, using ChatGPT, Python, Notion API, and other tools. I'll cover this in the next post.



---

