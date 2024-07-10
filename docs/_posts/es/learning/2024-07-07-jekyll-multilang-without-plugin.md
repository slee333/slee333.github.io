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



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/bdd37143-42c9-4174-b10f-ac091a41725d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=643c116c7b2fae40de362774cdef289296d89dbe015f66e348fa9c0d9dad4e2c&X-Amz-SignedHeaders=host&x-id=GetObject)  

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/4ecb8229-ed37-482c-803b-094f8cf618cd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=60c67a07a06b2b744ad527c3c04d4c6a82fce7fd2d2c31a34d926953c62dc580&X-Amz-SignedHeaders=host&x-id=GetObject)  

URL de la página de introducción en coreano (arriba) y en inglés (abajo)



La estructura es simple. Los que usan Jekyll lo saben, pero las páginas de Jekyll se pueden acceder mediante una **URL básica** y una **URL específica**. En mi caso, la URL básica es `slee333.github.io` y la URL específica es `about`.



El método es redirigir según el idioma que está entre la URL básica y la URL específica. Sin embargo, para el coreano, que es el idioma predeterminado, se puede acceder directamente a esas páginas o publicaciones a través de `{URL básica}/{URL específica}`.



Si has leído hasta aquí, te habrás dado cuenta:

<span style='color:blue'>*¿Qué? ¿Solo haces dos páginas o publicaciones y especificas manualmente las URLs?*</span>

Sí, exacto. Así que configuremos el front matter de la siguiente manera.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/f776eb0e-3278-4375-964e-5bdc6a0d4b51/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=84a46933c1d20b5fa967ce87bf2597ee79f4f0898a90dd2ef603ef7f9873d917&X-Amz-SignedHeaders=host&x-id=GetObject)

Front matter de la página en coreano (izquierda) y de la página en inglés (derecha)



Una vez configurado así, cuando el usuario cambia el idioma en la página de introducción, se agrega `en` delante de /about/ al cambiar de `kr` a `en` y se elimina `en` de la URL al cambiar de `en` a `kr`, facilitando el intercambio de idiomas entre las páginas.



También verás que está especificado `lang` en el front matter para indicar el idioma de cada página, una herramienta útil para reconocer el idioma de la página actual.



### 1.1. Caso de las publicaciones



Dado que estamos utilizando `permalink` para intercambiar entre diferentes idiomas, es necesario aplicar este enfoque a las publicaciones que subimos. He elegido establecer el permalink de cada publicación de la siguiente manera.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/2d899b4d-42ce-4844-b1fa-19215ff20007/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=bec4107461ee50efe2e03ebd212c3c5ab8fb8d5ba3adec7fa07a378f5d0a6da2&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/935f8e65-b579-4fad-a44a-90198b705a94/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=20bb09a84265d33822de260f019c70a4ff0c805c0de88b6947e67d6d3f4700af&X-Amz-SignedHeaders=host&x-id=GetObject)

Arriba: front matter de la publicación en coreano; Abajo: front matter de la publicación en inglés



El punto es configurar `permalink` como <span style='color:green'>/:title/</span>. En el caso de la publicación en inglés, el `permalink` se convertirá naturalmente en <span style='color:green'>/en/:title/</span>. Aquí, `title` se refiere al nombre del archivo markdown de la publicación (por ejemplo, para <span style='color:green'>2024-07-01-mi-diario</span>, el `title` sería <span style='color:green'>mi-diario</span>, y el permalink sería `/mi-diario`).



En resumen, si proporcionas la misma publicación en diferentes idiomas con nombres de archivo idénticos, puedes soportar el multilingüismo usando la función <span style='color:green'>:title</span> y agregando un prefijo de idioma a la URL.



Surge la pregunta:



> Si los archivos tienen nombres idénticos, ¿cómo los gestionas en la misma carpeta?



Una observación válida. Por lo tanto, crea carpetas de idiomas dentro de `_posts` y almacena los archivos respectivamente. Yo los clasifico por idioma y categoría.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/0e182393-7e63-48ae-8abb-c5745169d85d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=38ae87166a735b4f753d0db8024c010abf0cd9050063dbf6601c0960c42adb4f&X-Amz-SignedHeaders=host&x-id=GetObject)

Así se ven los archivos markdown de las publicaciones organizados por `{idioma}/{categoría}/{post}` en `_posts`.



## 2. Creación de botones de intercambio de idiomas



Ahora que tenemos dos páginas para dos idiomas, debemos crear una manera de cambiar entre ellas. Creé un archivo `header.html` en `root/_includes` para usarlo como header en todas las páginas y publicaciones, y agregué el siguiente elemento a ese header.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/fcb52e39-320b-4e11-b3b7-8a4883e76acb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=2cf3f7ae805246a2e51d14d7d286689e0de0af8c8db2ebff5d0cfcadce495143&X-Amz-SignedHeaders=host&x-id=GetObject)



Como se muestra en el ejemplo, los idiomas option en el dropdown son `kr` y `en`. Añadí español también, ya que tengo la ambición de soportarlo.



Este elemento div tiene el id `language-select` y funciona como dropdown. Cuando la página está en coreano (`page.lang == ‘kr’`), la opción cuyo value es "kr" está seleccionada. Lo contrario ocurre si está en inglés ("en"). En mi página se ve así:



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/4db530b8-8ec7-42d7-b420-5dd960e6fae7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=5c99036ea2bbd271e429d12a7cffc11143891b0e695a0204ba762023be4a0459&X-Amz-SignedHeaders=host&x-id=GetObject)



## 3. Añadir función de redirección al botón de intercambio de idiomas



Ahora añadamos una función que redirija a la URL correspondiente cuando se hace clic en otro idioma en el dropdown. Añadí el siguiente JavaScript en el tag `<script>` dentro de `header.html`.




```javascript

// Seleccionar el elemento language-select.

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', function () {

  // Cuando la opción cambia, llamar la función redirectPage con el valor actual.

  redirectPage(this.value);

});



// Función redirectPage.

function redirectPage(selectedLang) {

  let currentUrl = window.location.pathname;



  // Si la URL actual empieza con /en/ o /es/, eliminar esa parte.

  if (currentUrl.startsWith('/en/') || currentUrl.startsWith('/es/')) {

    currentUrl = currentUrl.replace(/^\/(en|es)\//, '/');

  }



  // Si el idioma no es "kr", insertar el idioma seleccionado en la URL.

  if (selectedLang !== 'kr') {

    currentUrl = `/${selectedLang}${currentUrl}`;

  }

  

  // Eliminar posibles duplicidades en /

  currentUrl = currentUrl.replace(/\/+/g, '/');



  // Redirigir a la nueva URL.

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

  <div class="menu-toggle" id="menu-toggle">&#9776;</div> <!-- Icono de menú -->

  <div class="trigger navbar">

    {% if page.lang == 'kr' %}

      <a class="page-link" href="{{ site.baseurl }}/about">소개</a>

      <a class="page-link" href="{{ site.baseurl }}/life">일상</a>

      <!-- Otros menús ... -->

    {% endif %}

    {% if page.lang == 'en' %}

      <a class="page-link" href="{{ site.baseurl }}/en/about">About</a>

      <a class="page-link" href="{{ site.baseurl }}/en/life">Life</a>

      <!-- Otros menús ... -->

    {% endif %}



    <!-- language-switcher añadido anteriormente -->

    <div class="language-switcher">

      <select id="language-select">

        <option value="kr" {% if page.lang == 'kr' %}selected{% endif %}>한국어</option>

        <option value="en" {% if page.lang == 'en' %}selected{% endif %}>English</option>

        <option value="es" {% if page.lang == 'es' %}selected{% endif %}>Español</option>

      </select>

    </div>

  </div>

</nav>

```



Usando la función if de Liquid, se muestran los menús en coreano si la página es `kr`, y en inglés si la página es `en`. Aunque funciona, he ajustado el código para evitar la codificación manual, lo explicaré en una futura publicación.



## 5. Aspecto Final


Ahora puedes ver cómo se puede cambiar la página entre inglés y coreano a través de un menú desplegable insertado en la sección `header`, específicamente en la **barra de navegación**.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/0ffb491e-2aff-400d-a562-4145ff373dc6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=de4ffa7fc73d795504eac7dda841f618cf2260b0c5f77d0271db49b76b9cf172&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/0401ca2c-0b04-4c4d-9f2f-d423516f4fae/852c921a-5351-4e21-81ed-3bc0e80c19b7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240710T021000Z&X-Amz-Expires=3600&X-Amz-Signature=45f43133114e7a9435bc8fd25508d01ada18f832505d89e2b1265c519f46db4a&X-Amz-SignedHeaders=host&x-id=GetObject)

Ahora esta función de soporte multilingüe está implementada.

Sin embargo, otro desafío es cómo traducir y apoyar mis publicaciones en diferentes idiomas. Por supuesto, es cuestión de traducir manualmente o usar un traductor, crear un nuevo archivo markdown y subirlo. Pero como soy un poco perezoso, me centré en desarrollar una línea de trabajo para traducir publicaciones escritas en coreano al inglés y al español utilizando ChatGPT, Python, Notion API, etc. Cubriré esta parte en la próxima publicación.