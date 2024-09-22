---
layout: post
permalink: /es/learning/:title/
title: "Automatizar la traducción de publicaciones de blog (con ChatGPT)"
date: 2024-09-21 00:00:00 -0400
tags: blog life ChatGPT LLM llama 3.1
categories: learning
categorydisplay: Aprendizaje
lang: es
thumbnail: https://i.imgur.com/nyv5CB7.png
subtitle: Las posibilidades de los modelos de lenguaje a gran escala son infinitas. No son una excepción en la traducción de publicaciones de blog.
---
En publicaciones anteriores, hemos tratado sobre **[Crear publicaciones de Jekyll con soporte multilingüe](https://slee333.github.io/es/learning/jekyll-multilang-without-plugin/)** y **[Cómo facilitar la publicación en un blog de Jekyll utilizando Notion](https://slee333.github.io/es/learning/Jeykll-notion-to-jekyll/)**. En esa publicación, la versión final de la función para traducir automáticamente la página de Notion a Markdown era la siguiente:

```python
page_url = "URL de mi página"

# Ejemplo de uso
page_id = extract_notion_page_id(page_url)
print("Notion Page ID:", page_id)

# Obtener el front matter y el contenido markdown de la página de Notion
pfm, pmd = get_jekyll_post_from_notion_page(page_id)

# Escribir el archivo Markdown de la publicación de Jekyll en coreano
_,_ = write_jekyll_post_from_fm_md(pfm,pmd)
```

En resumen, se utiliza la función `get_jekyll_post_from_notion_page` para extraer el front matter (`pfm`) y el contenido de la página (`pmd`) desde la URL de la página de Notion, y mediante la función `write_jekyll_post_from_fm_md` se crea el archivo Markdown.

En esta publicación, trataremos cómo automatizar la página Markdown completa utilizando modelos de lenguaje grande como **ChatGPT** y **Llama 3.1**. ¡Será más corto que las dos publicaciones anteriores!

---

## Usando ChatGPT

**1. Configurar la API**

Entre los modelos de lenguaje grande, el más famoso probablemente sea ChatGPT. Para aquellos que usan la versión de pago de ChatGPT, pueden utilizar la API de ChatGPT como se explica a continuación.

Primero, entraremos en el [sitio web de la API de ChatGPT](https://platform.openai.com/) y crearemos un proyecto. Aunque ya tengo algunos proyectos creados, para aquellos que crean un proyecto nuevo, presionen el botón <span style='color:red'>+ Create Project</span>.

![](https://i.imgur.com/za6DJNp.png)

*Creemos un nuevo proyecto.*

En la página de la API, ingresa al Dashboard, en la pestaña de API Keys encontrarás la opción para crear una nueva llave secreta (Secret Key). Usa el botón <span style='color:green'>Create New Secret Key</span>.

![](https://i.imgur.com/Di6i5Od.png)

**2. Llamadas a la API desde Python**

Una vez creada la llave API, necesitamos llamar a la API desde el código en Python.

Puedes incluir la llave API directamente en el código Python, pero si planeas subir tu código a GitHub, debes tener cuidado. Exponer tu llave secreta en GitHub puede ser peligroso. En mi caso, prefiero cargar la llave secreta como variable de entorno para evitar exponerla directamente en el código.

En publicaciones anteriores, presenté brevemente cómo gestionar un archivo `.env`, pero repasaremos el proceso nuevamente.

1. Crea un archivo `.env` en el directorio donde está tu código Python.
2. Dentro del archivo `.env`, escribe lo siguiente: `OPENAI_API_KEY=tu_llave_secreta`.
3. Asegúrate de que el archivo `.env` no se suba a GitHub agregándolo al archivo `.gitignore`. Por ejemplo, mi archivo `.gitignore` incluye `.env`.

Después de completar estos pasos, podemos cargar la clave secreta y ejecutar el cliente de OpenAI en el código Python. Combinando esto con el proceso para llamar al API de Notion presentado en publicaciones anteriores, el código se verá así:

```python
from openai import OpenAI
from dotenv import load_dotenv
from notion_client import Client

# Cargar el archivo .env
load_dotenv()

# Extraer el token de Notion del archivo .env
notion_token = os.getenv('NOTION_TOKEN')
notion = Client(auth=notion_token)

# Cargar la API de OpenAI
client = OpenAI(
  api_key=os.getenv('OPENAI_API_KEY'),
)
```

Si la librería `openai` no está instalada, puedes instalarla usando pip. En la línea de comandos:

```python
pip install openai
```

O en un Jupyter Notebook:

```python
%pip install openai
```

**3. Traducir con ChatGPT**

El siguiente paso es utilizar el cliente de OpenAI definido para traducir el archivo Markdown. En la función anterior, recibimos los elementos Markdown como una lista `pmd`, y ChatGPT requiere texto como entrada, por lo que convertiremos la lista en un gran archivo de texto unido por `\n`.

La función que definí es la siguiente:

```python
def translate_markdown(markdown_string, frontmatter_dict, target_language):
    """
    Traducir contenido markdown al idioma objetivo usando OpenAI.

    Parámetros:
    markdown_string (list): Lista de elementos markdown unidos con ' '.
    target_language (str): Idioma objetivo para la traducción.

    Retorna:
    str: Contenido markdown traducido.
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

En resumen, la función `translate_markdown` traduce el contenido markdown al idioma objetivo usando la API de OpenAI. Aquí los elementos clave:

- `markdown_string`: Es la cadena de texto que resulta de unir los elementos markdown con ' '.
- `frontmatter_dict`: Es un diccionario que contiene varios elementos del `front matter` como el título (`title`) y el subtítulo (`subtitle`).
- `target_language`: Es el idioma objetivo para la traducción.

La función utiliza `client.chat.competions.create` para traducir el contenido markdown utilizando varios modelos de chat de OpenAI:

1. Traduce el contenido markdown al idioma objetivo utilizando el modelo `gpt-4o`, asegurando que la sintaxis markdown se mantenga.
2. Traduce el título y subtítulo del front matter utilizando el modelo `gpt-3.5-turbo`.
3. Devuelve el contenido markdown traducido, el título y el subtítulo.

Con esta función, seguimos el siguiente proceso:

```python
# Traducir el contenido markdown al inglés
translated_content_en, en_title, en_subtitle = translate_markdown(' '.join(pmd), pfm, 'English')
en_md_list = translated_content_en.content.split('\n')

_,_ = write_jekyll_post_from_fm_md(pfm,en_md_list, language='en', multilang_title=en_title.content, multilang_subtitle=en_subtitle.content)
```

Usamos `split` para convertir el archivo markdown que unimos temporalmente en un formato de lista nuevamente. Luego, utilizando la función `write_jekyll_post_from_fm_md` presentada en [la publicación anterior](https://slee333.github.io/es/learning/Jeykll-notion-to-jekyll/), generamos el archivo markdown con el título y subtítulo traducidos en el directorio correspondiente.

---

## Usando Llama 3.1

El método anterior utiliza la API de OpenAI, por lo que necesitas suscribirte a un servicio de pago. Pagas según la longitud del valor ingresado en la API (longitud del token) y los modelos de alto rendimiento tienen precios más altos.

Sin embargo, recientemente **Meta** lanzó Llama 3.1, un modelo de lenguaje grande gratuito que se puede ejecutar localmente, lo que permite usarlo sin preocupaciones de costos si tu computadora tiene suficiente rendimiento.

Llama 3.1 tiene tres modelos: 8B, 70B y 405B, donde un número mayor indica mejor rendimiento. Se dice que Llama 3.1 405B supera el rendimiento de GPT-4. Consulta la siguiente tabla para más detalles.

![](https://i.imgur.com/FTJNtnp.png)

Generalmente, el modelo 8B se usa para tareas simples de resumen de texto y clasificación, 70B para la creación de contenido, y 405B es adecuado para usos industriales, generación de datos sintéticos e investigación. Dado que mi computadora no es muy poderosa, elegí Llama 3.1 8B sin dudarlo.

Entonces, ¿cómo lo instalamos? Hay dos métodos: uno a través del sitio oficial y otro a través de Ollama. Elegí el segundo porque es más fácil. A continuación, explicaré cómo instalar y utilizar Llama 3.1 con Ollama. No explicaré el primer método porque no estoy familiarizado con él.

**1. Instalación de Llama 3.1 con Ollama**

![](https://i.imgur.com/6Nia1Lg.png)

***Página de descarga del sitio oficial de ollama***

Primero, visita el [sitio oficial de Ollama](https://ollama.com/download/windows) y descarga el software. Instálalo según el sistema operativo de tu computadora.

Una vez completa la instalación, crea una cuenta en el sitio de Ollama e inicia sesión. Luego, ve a la sección `Models` en la esquina superior derecha.

![](https://i.imgur.com/27vjcnG.png)

Selecciona llama 3.1 y copia el comando de instalación.

![](https://i.imgur.com/7PqqsAD.png)

Pega el comando en tu terminal. Si estás usando Llama 3.1 8B, el comando se verá así:

```python
ollama run llama3
```

**2. Ejecutar Llama 3.1 con Python**

Aunque Llama 3.1 8B se puede ejecutar desde el terminal, queremos hacerlo desde Python. Primero, instala el paquete Ollama desde pip:

```python
pip install -U langchain-ollama
```

En un terminal de Anaconda puedes ejecutar el comando tal cual; en un entorno Jupyter Notebook, agrega `%` al inicio.

Una vez instalado, carga la librería y ejecuta Llama 3.1 asignándolo a una variable llamada `llm`. Asegúrate de que Ollama esté ejecutándose en el fondo antes de continuar. Luego, corre el siguiente código:

```python
from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="llama3.1")
```

Prueba ejecutando una solicitud a `llm`:

```python
response = llm.invoke("Yo what up you runnign alright?")
print(response)


#### La respuesta fue ####
# Ha ha, I'm doing great, thanks for asking! I'm a large language model, 
# so I don't have a physical body, but I'm always ready to chat and help 
# with any questions or topics you'd like to discuss. 
# How about you? What's going on in your world today?
```

Confirmamos que Llama 3.1 funciona correctamente, ahora podemos usarlo para traducir markdown con una función similar a la mencionada antes:

```python
def translate_markdown_llama(markdown_string, frontmatter_dict, target_language):
    """
    Traducir contenido markdown al idioma objetivo usando OpenAI.

    Parámetros:
    pmd (list): Lista de cadenas markdown.
    target_language (str): Idioma objetivo para la traducción.

    Retorna:
    str: Contenido markdown traducido.
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

La función traduce el contenido markdown, el título y el subtítulo usando Llama 3.1.

**3. Rendimiento de traducción de Llama 3.1**

En realidad, es un poco decepcionante. Intenté traducir la versión en inglés y español de esta publicación utilizando el modelo Llama 3.1 de 8B, pero, a diferencia de GPT-4, fue imposible traducir toda la publicación de una sola vez. Tuve que modificar la función anterior para traducir elemento por elemento del markdown, lo que llevó mucho tiempo.

Además, fue necesario hacer uso de ingeniería de prompts para que solo proporcionara la traducción de los elementos del markdown sin añadir comentarios adicionales. Este proceso también fue complicado. Siempre añadía algo como *“Here is the translated version…”* y otras observaciones adicionales. Finalmente, terminé usando ChatGPT para traducir esta publicación.

Aunque me gusta mucho ChatGPT, los costos de los tokens se vuelven una carga a medida que aumenta el tamaño de los datos, por lo que la aparición de Llama 3.1, que puedo ejecutar en mi computadora sin gastar tanto, es realmente alentadora. Sin embargo, el rendimiento de traducción con el modelo de 8B que utilicé es decepcionante. Por ahora, parece que seguiré usando GPT para el proceso de traducción.

Por supuesto, aparte de eso, Llama 3.1 de 8B también muestra un rendimiento impresionante para tareas sencillas, pero cubriré ese tema en otra publicación más adelante.

---

En fin, con esto he terminado la configuración de mi blog. Ahora, escribir una página en Notion y extraer el enlace para ejecutarla en Jupyter Notebook me permite escribir publicaciones con soporte multilingüe con facilidad. Por supuesto, hay algunas cosas que debo revisar, como algunos detalles que se traducen incorrectamente, pero la verdad es que el proceso de escritura se ha vuelto increíblemente más conveniente. Planeo agregar más funciones al blog, y cuando lo haga, también documentaré esos procesos en publicaciones como esta.