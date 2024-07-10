---
layout: post
permalink: /es/learning/:title/
title: "Soportar múltiples idiomas en Jekyll sin utilizar plugins"
date: 2024-07-07 00:00:00 -0400
tags: life blog python openai ChatGPT
categories: learning
categorydisplay: Aprendizaje
lang: es
thumbnail: https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg
subtitle: No me gustaba mucho el plugin común, así que decidí implementar la función directamente. ¡Como puedes ver, no es una función tan difícil!
---
### Un nuevo comienzo de blog

Al comenzar este nuevo blog, surgió un deseo pequeño: ¡quería intentar soportar el blog en coreano, inglés y español (!). 

Como plataforma para este nuevo comienzo, elegí Jekyll. Sin embargo, tuve varios problemas al intentar usar los plugins **multiple-languages-plugin** y **polyglot** comúnmente utilizados en Jekyll. Estos plugins requerían almacenar las publicaciones y páginas en subcarpetas, pero esto no era reconocido por Jekyll. Además, un gran problema era que el sitemap no se generaba automáticamente.



Finalmente, implementé un blog multilingüe con algunos códigos fijos. El proceso es simple, y quise resumirlo a continuación.



---



## 1. Estructura del blog multilingüe



![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/bdd37143-42c9-4174-b10f-ac091a41725d/Untitled.png?id=aca8d121-de24-4932-9150-85ae9075da23&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=hqHzq6QkDjN9337zwPRSI880UffG7T6tzdgCKYRTueg&downloadName=Untitled.png)  

![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/4ecb8229-ed37-482c-803b-094f8cf618cd/Untitled.png?id=b183173f-a4d3-47c2-bcb7-3a001ca868ae&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=YiO-jARWuFodqNk7Lzbu3tWYAoLowUEIUwrukPlNCN8&downloadName=Untitled.png)  

URL de la página de introducción en coreano (arriba) y en inglés (abajo)



La estructura es simple. Los que usan Jekyll lo saben, pero las páginas de Jekyll se pueden acceder mediante una **URL básica** y una **URL específica**. En mi caso, la URL básica es `slee333.github.io` y la URL específica es `about`.



El método es redirigir según el idioma que está entre la URL básica y la URL específica. Sin embargo, para el coreano, que es el idioma predeterminado, se puede acceder directamente a esas páginas o publicaciones a través de `{URL básica}/{URL específica}`.



Si has leído hasta aquí, te habrás dado cuenta:

<span style='color:blue'>*¿Qué? ¿Solo haces dos páginas o publicaciones y especificas manualmente las URLs?*</span>

Sí, exacto. Así que configuremos el front matter de la siguiente manera.



![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/f776eb0e-3278-4375-964e-5bdc6a0d4b51/Untitled.png?id=0b411be4-aebc-411c-87be-89f3aeabcd47&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=yd7Fk0-K09smPZksiwAFxfBsjA2yaLf8IcKNrxGGi8o&downloadName=Untitled.png) 

Front matter de la página en coreano (izquierda) y de la página en inglés (derecha)



Una vez configurado así, cuando el usuario cambia el idioma en la página de introducción, se agrega `en` delante de /about/ al cambiar de `kr` a `en` y se elimina `en` de la URL al cambiar de `en` a `kr`, facilitando el intercambio de idiomas entre las páginas.



También verás que está especificado `lang` en el front matter para indicar el idioma de cada página, una herramienta útil para reconocer el idioma de la página actual.



### 1.1. Caso de las publicaciones



Dado que estamos utilizando `permalink` para intercambiar entre diferentes idiomas, es necesario aplicar este enfoque a las publicaciones que subimos. He elegido establecer el permalink de cada publicación de la siguiente manera.



![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/2d899b4d-42ce-4844-b1fa-19215ff20007/Untitled.png?id=8b974278-2bd6-43d0-9cf8-e01a702dc7ba&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=oc_xvmz315yXx4e0WEYSxohTq6g7RBHuQauyFumcrT4&downloadName=Untitled.png)  

![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/935f8e65-b579-4fad-a44a-90198b705a94/Untitled.png?id=a5d73de3-f6f3-4d5b-a839-a941e8ca838f&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=LrAOEJet3HmsDSRY199IPcCiM_nUzH1BJoSXBYD-TlM&downloadName=Untitled.png)  

Arriba: front matter de la publicación en coreano; Abajo: front matter de la publicación en inglés



El punto es configurar `permalink` como <span style='color:green'>/:title/</span>. En el caso de la publicación en inglés, el `permalink` se convertirá naturalmente en <span style='color:green'>/en/:title/</span>. Aquí, `title` se refiere al nombre del archivo markdown de la publicación (por ejemplo, para <span style='color:green'>2024-07-01-mi-diario</span>, el `title` sería <span style='color:green'>mi-diario</span>, y el permalink sería `/mi-diario`).



En resumen, si proporcionas la misma publicación en diferentes idiomas con nombres de archivo idénticos, puedes soportar el multilingüismo usando la función <span style='color:green'>:title</span> y agregando un prefijo de idioma a la URL.



Surge la pregunta:



> Si los archivos tienen nombres idénticos, ¿cómo los gestionas en la misma carpeta?



Una observación válida. Por lo tanto, crea carpetas de idiomas dentro de `_posts` y almacena los archivos respectivamente. Yo los clasifico por idioma y categoría.




![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/0e182393-7e63-48ae-8abb-c5745169d85d/Untitled.png?id=a6733bf3-37ea-48f7-b039-28394791fd86&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=1QA5pYbDBN0C8xOYFqR5g9J7d2ryW81sFmWUKVGh-To&downloadName=Untitled.png)  


Así se ven los archivos markdown de las publicaciones organizados por `{idioma}/{categoría}/{post}` en `_posts`.



## 2. Creación de botones de intercambio de idiomas



Ahora que tenemos dos páginas para dos idiomas, debemos crear una manera de cambiar entre ellas. Creé un archivo `header.html` en `root/_includes` para usarlo como header en todas las páginas y publicaciones, y agregué el siguiente elemento a ese header.



![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/fcb52e39-320b-4e11-b3b7-8a4883e76acb/Untitled.png?id=a7e9386d-bede-404c-a7de-c0696947d688&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=-xeGifjx8uYSaKWgtI78A8K5Dw2Zvmf44SS0lSh1jcw&downloadName=Untitled.png)  



Como se muestra en el ejemplo, los idiomas option en el dropdown son `kr` y `en`. Añadí español también, ya que tengo la ambición de soportarlo.



Este elemento div tiene el id `language-select` y funciona como dropdown. Cuando la página está en coreano (`page.lang == ‘kr’`), la opción cuyo value es "kr" está seleccionada. Lo contrario ocurre si está en inglés ("en"). En mi página se ve así:



![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/4db530b8-8ec7-42d7-b420-5dd960e6fae7/Untitled.png?id=fbceae4c-a0d1-4951-b772-0f6d3f88fbc9&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=SsboxNqsiuJnnAiAWqDBIiQ8mkm1mHtCANoI3aXfb6w&downloadName=Untitled.png)  



## 3. Añadir función de redirección al botón de intercambio de idiomas



Ahora añadamos una función que redirija a la URL correspondiente cuando se hace clic en otro idioma en el dropdown. Añadí el siguiente JavaScript en el tag `<script>` dentro de `header.html`.



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


### 3.1. (Opcional) CSS



Para que el botón se vea mejor, añadí algo de CSS. En realidad, pedí a ChatGPT que me diera un mejor diseño. Puedes modificarlo según tus preferencias.



```scss

// Language switcher in navbar
.language-switcher {
  display: inline-block;
  margin-left: 20px;
  position: relative;
}

.language-switcher select {
  width: 100px;
  /* Ensanchar el menú dropdown */
  padding: 10px 15px;
  font-size: 1em;
  border: 1px solid rgb(157, 157, 157);
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  /* Eliminar la flecha predeterminada */
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
  /* Añadir símbolo de flecha */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.8em;
  color: #777;
}

```



## 4. Actualizando la barra de navegación



Ah, olvidé cómo cambiar los menús (introducción, vida cotidiana, etc.) en la barra de navegación superior al cambiar de idioma. El método más simple es codificar los menús manualmente (inicialmente lo hice así).



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



Usando la función if de Liquid, se muestran los menús en coreano si la página es `kr`, y en inglés si la página es `en`. Aunque funciona, he ajustado el código para evitar la codificación manual, lo explicaré en una futura publicación.



## 5. Aspecto Final


Ahora puedes ver cómo se puede cambiar la página entre inglés y coreano a través de un menú desplegable insertado en la sección `header`, específicamente en la **barra de navegación**.


![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/0ffb491e-2aff-400d-a562-4145ff373dc6/Untitled.png?id=069f8208-a67b-4ecb-b696-272773e06f64&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=4ztUHXQTYx3aDSHyiNP60CQMOXsQn9Cc34aLcND7p6k&downloadName=Untitled.png)  

![](https://file.notion.so/f/f/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/852c921a-5351-4e21-81ed-3bc0e80c19b7/Untitled.png?id=9ac9f43d-ddfe-435b-87d9-51fc52b56222&table=block&spaceId=0401ca2c-0b04-4c4d-9f2f-d423516f4fae&expirationTimestamp=1720706400000&signature=_W-ULXSBkhRvj-t1bvfrG995hNHbrc8GVxVgZ_8x-Ik&downloadName=Untitled.png)  


Ahora esta función de soporte multilingüe está implementada.

Sin embargo, otro desafío es cómo traducir y apoyar mis publicaciones en diferentes idiomas. Por supuesto, es cuestión de traducir manualmente o usar un traductor, crear un nuevo archivo markdown y subirlo. Pero como soy un poco perezoso, me centré en desarrollar una línea de trabajo para traducir publicaciones escritas en coreano al inglés y al español utilizando ChatGPT, Python, Notion API, etc. Cubriré esta parte en la próxima publicación.