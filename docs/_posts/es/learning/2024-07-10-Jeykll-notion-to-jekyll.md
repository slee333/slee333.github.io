---
layout: post
permalink: /es/learning/:title/
title: Escribir Publicaciones de Jekyll con Notion
date: 2024-07-10 00:00:00 -0400
tags: [blog, chatgpt, openai]
categories: learning
categorydisplay: Aprendizaje
lang: es
image: https://cdn.pixabay.com/photo/2013/05/12/09/36/globe-110775_960_720.jpg
subtitle: ¡Incluso usar la función para exportar la página de Notion como markdown fue tedioso para mí. ¡Solo quiero que al ingresar la URL, la publicación se suba automáticamente!
translation_id: "jekyllnotion"
---

En la publicación anterior, discutimos cómo admitir múltiples idiomas en Jekyll sin usar complementos. En esta publicación, nos centraremos en cómo subir una publicación escrita en Notion a Jekyll.

Mi pipeline sigue estos pasos:

1. Escribir una publicación en Notion.
2. Usar la API de Notion para convertir la página de Notion al formato Markdown.
3. Usar la API de Chat GPT para traducir el Markdown al idioma deseado.
4. Escribir el archivo Markdown para cada idioma en el directorio correspondiente con el front matter adecuado.

Esta publicación cubrirá los pasos 1, 2 y 4, excluyendo el paso 3.

## 1. Escribir una Publicación en Notion

Para la prueba, creé una publicación. [Aquí está la publicación](https://slee333.github.io/%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-%EC%84%A4%EC%A0%95-%EC%8B%A4%ED%97%98/). Como puede ver, incluí varios elementos como encabezados, negritas, cursivas e imágenes en una sola página.

![Captura de pantalla de Notion](https://i.imgur.com/VZSpMW0.png)

Hay algunas cosas a tener en cuenta durante este proceso.

### 1.1. Subiendo Capturas de Pantalla

Al publicar sobre el desarrollo de blogs o revisiones de revistas, a menudo incluyes capturas de pantalla de imágenes externas. Aunque estas capturas de pantalla se ven bien en Notion, pueden causar problemas cuando los enlaces de las imágenes se utilizan en tu blog porque las URL de las imágenes subidas directamente a Notion cambian con frecuencia (posiblemente debido a que se almacenan en diferentes ubicaciones como AWS o la propia base de datos de Notion).

Resolví este problema usando Imgur. Visita Imgur y haz clic en el botón "New Post". Verás la siguiente pantalla.

![Captura de pantalla de Imgur](https://i.imgur.com/HtGM05g.png)

Copia y pega tu contenido de captura de pantalla aquí. La captura de pantalla se subirá a Imgur.

![Captura de pantalla de Imgur](https://i.imgur.com/pIDJkJn.png)

Haz clic derecho en la captura de pantalla subida y copia el enlace de la imagen. Luego, usa la función *image → embed Link* de Notion para adjuntar el enlace, asegurando que la URL no cambiará.

No es necesario que uses Imgur; cualquier sitio de alojamiento de imágenes funcionará. Prefiero no subir imágenes a los activos internos de mi blog, pero si lo haces, es posible que necesites un enfoque diferente.

### 1.2. Limitando las Funciones que Utilizo

Como se explicó en la parte 2, eventualmente convertiremos la página de Notion a Markdown. Aunque Notion admite la exportación de páginas como Markdown, quería una solución de un solo clic para importar, convertir y traducir páginas de Notion usando Python. Por lo tanto, tuve que crear mi propio pipeline para extraer Markdown de la URL de la página de Notion.

Dado que es difícil implementar todas las funciones de Notion en Markdown, decidí limitar las funciones que utilizo. Las funciones que elegí son:

- **Texto del Cuerpo**: La función básica de escribir texto.
- **Encabezados**: Encabezados de Markdown como `#`, `##`, `###`.
- **Negrita, Cursiva, Subrayado, Tachado**: Estilos de uso frecuente. Markdown no admite subrayado de forma nativa, pero se puede hacer usando etiquetas `<ins>`.
- **Código**: Esencial para muchas listas.
- **Colores**: Notion admite varios colores de texto y colores de fondo, pero solo implementé colores de texto.
- **Listas**: Listas ordenadas y desordenadas.
- **Casillas de Verificación**: No se usan a menudo, pero son fáciles de implementar.
- **Divisores**: Representados por `---`.
- **Imágenes**: Como se mencionó anteriormente, las imágenes son cruciales y están implementadas.
- **Citas en Bloque**: Implementadas, aunque no perfectamente.

Explicaré cómo se implementaron estas funciones en la parte 2.

### 1.3. Preconfigurando el Front Matter

El front matter de mi publicación incluye lo siguiente:

- layout
- permalink
- title
- date
- tags
- categories
- categorydisplay: Un front matter personalizado para mostrar categorías en diferentes idiomas.
- lang: El idioma de la publicación.
- thumbnail: La miniatura de la publicación del blog.
- subtitle: El subtítulo del blog.

Configuré esto usando la función de propiedad de Notion para que coincida con el formato de mi página, facilitando su recuperación. Las propiedades de la página actual son las siguientes:

![Captura de pantalla de las Propiedades de Notion](https://i.imgur.com/nuBKB0U.png)

Ahora que hemos vinculado las propiedades de la página de Notion con el front matter, pasemos a extraer la página de Notion como Markdown.

## 2. API de Notion

Como se mencionó anteriormente, Notion admite la exportación de páginas como Markdown. Sin embargo, queriendo una solución de un solo clic para la conversión y traducción basada en URL, decidí automatizar el proceso utilizando la API de Notion.

### 2.1. Usando la API de Notion

Para usar la API de Notion, necesitas crear una Integración. Ve a la [página de Integración](https://www.notion.so/profile/integrations) y crea una nueva integración. Haz clic en "New integration" para ver la siguiente pantalla.

![Captura de pantalla de la Integración de Notion](https://i.imgur.com/cvzYZUy.png)

Configura el nombre de la integración y vincúlala al espacio de trabajo donde escribirás publicaciones en Notion. El tipo debe ser interno para uso personal.

Verás la siguiente pantalla una vez que se haya creado la integración.

![Captura de pantalla de la Integración de Notion](https://i.imgur.com/Jb9HGQG.png)

Usaremos el **internal integration secret** en la siguiente sección. Una vez creada la integración, regresa a la página de Notion donde escribirás publicaciones.

![Captura de pantalla de la Página de Notion](https://i.imgur.com/E1QLdii.png)

Haz clic en el botón "..." en la esquina superior derecha de la página y selecciona "Connect to". Verás la integración que creaste anteriormente. Haz clic en ella para vincular la integración a tu página. La captura de pantalla anterior es un ejemplo.

### 2.2 Accediendo a Markdown con la API de Notion en Python

Ahora, vamos a crear un archivo de Python para usar la API de Notion. Creé un archivo llamado **blog_pipeline.ipynb** en el directorio raíz de mi blog e importé las bibliotecas necesarias.
```python
from notion_client import Client
from dotenv import load_dotenv
import re  
```
Si el paquete no está instalado, usa pip para instalarlo (por ejemplo, %pip install notion_client). Ahora, estamos listos para usar la API de Notion en el entorno de Python.

## 3. Convertir Páginas de Notion a Markdown
Ahora usemos la API para convertir una página a Markdown. El proceso implica los siguientes pasos:

### 3.1. Convertir URL de la Página a ID de la Página
Las páginas de Notion tienen un ID de página. Si miras la URL de la página, aparece así:
https://www.notion.so/seungwooklee/Jekyll-86e9ef81af6e4cefae24c0c733ce6853

La última parte de la URL, una cadena de 32 caracteres dividida en el formato 8-4-4-4-12, es el ID de la página. En el ejemplo anterior, el ID de la página es 86e9ef81-af6e-4cef-ae24-c0c733ce6853. La API de Notion accede a las páginas usando el ID de la página, por lo que necesitamos crear una función de Python para convertir la URL a un ID de página.
```python
def extract_notion_page_id(notion_url):
    """
    Extraer el ID de la página de Notion desde una URL de Notion.
    
    Parámetros:
    notion_url (str): La URL de la página de Notion.
    
    Devuelve:
    str: El ID de la página de Notion extraído.
    """
    # Define el patrón de expresión regular para coincidir con el ID de la página de Notion - obtener cadena de 32 caracteres
    pattern = re.compile(r'([a-f0-9]{32})')
    
    # Buscar el patrón en la URL de Notion
    match = pattern.search(notion_url)
    
    si hay coincidencia:
        # Extraer el ID de la página
        page_id = match.group(1)
        
        # Insertar guiones en el patrón 8-4-4-4-12
        formatted_page_id = f"{page_id[:8]}-{page_id[8:12]}-{page_id[12:16]}-{page_id[16:20]}-{page_id[20:]}"
        
        return formatted_page_id
    else:
        raise ValueError("URL de Not

ion no válida o ID de la página no encontrado.")  
```

### 3.2. Almacenando el Token Secreto

Ahora, comencemos a usar la API de Notion. Para hacer esto, necesitamos el internal secret que vimos al crear la integración. Al usar la API de Notion en Python, necesitas ingresar este secreto. Sin embargo, no se recomienda incluir el secreto en el código ya que podría ser expuesto a otros, permitiéndoles modificar tus publicaciones a través de la API (aunque esto no es un problema si no subes el archivo de Python a GitHub).

Dado que planeo subir mi código de Python a GitHub, decidí gestionar el secreto con un archivo `.env`. Aquí está cómo hacerlo:

1. Crear un archivo `.env` en el directorio que contiene tu código de Python.
2. Escribe lo siguiente en el archivo `.env`:
   `NOTION_TOKEN=tu_clave_secreta` (no es necesario incluirlo entre comillas)
3. Si el archivo `.env` se sube a GitHub, todo este trabajo se vuelve inútil. Agrega `.env` a tu archivo `.gitignore`. Aquí hay un ejemplo de mi archivo `.gitignore`:

   ![Captura de pantalla de Gitignore](https://i.imgur.com/8FdfiS5.png)

Una vez hecho esto, carga el secreto en tu código de Python y crea el cliente de la API de Notion:

```python
import os
from dotenv import load_dotenv
from notion_client import Client

# Cargar el archivo .env
load_dotenv()

# Obtener el token de Notion desde el archivo .env
notion_token = os.getenv('NOTION_TOKEN')

# Crear el cliente de la API de Notion
notion = Client(auth=notion_token)
```

### 3.3. Creando el Front Matter con la API de Notion

Ahora, podemos acceder a la página de Notion en Python usando el cliente de la API y el ID de la página. Almacenamos los valores para el front matter en las propiedades de la página de Notion, así que vamos a crear una función para recuperarlos:

```python
def extract_frontmatter(page_id):
    """
    Obtener las propiedades de una página de Notion.
    
    Parámetros:
    page_id (str): El ID de la página de Notion.
    
    Devuelve:
    dict: Las propiedades de la página de Notion.

    * Nota: Para mi página de Jekyll, usé las siguientes propiedades:
        - title: título de la publicación
        - date: fecha de creación de la publicación. En lugar de usar la fecha en Notion, usé la fecha que ingresé manualmente en Notion
        - tags: etiquetas de la publicación
        - categories: categorías de la publicación
        - categorydisplay: nombre raro, lo sé. Pero esto es para fines de visualización en Jekyll
        - lang: idioma de la publicación; kr, en o es; por defecto es kr
        - thumbnail: imagen miniatura de la publicación
        - subtitle: subtítulo de la publicación
    """
    # Obtener los datos de la página
    page_data = notion.pages.retrieve(page_id)
    
    # Obtener las propiedades de la página
    properties = page_data['properties']

    # Extraer las propiedades
    frontmatter = {
        'filename': properties['filename']['rich_text'][0]['plain_text'],
        'title': properties['title']['title'][0]['plain_text'],
        'date': properties['date']['date']['start'],
        'tags': ' '.join([tag['name'] for tag in properties['tags']['multi_select']]),
        'categories': properties['categories']['select']['name'],
        'categorydisplay': properties['categorydisplay']['select']['name'],
        'lang': properties['lang']['select']['name'],
        'thumbnail': properties['thumbnail']['files'][0]['name'],
        'subtitle': properties['subtitle']['rich_text'][0]['plain_text']
    }

    return frontmatter
```

En esta función, recuperamos los datos de la página usando `notion.pages.retrieve(page_id)` y luego extraemos los valores de las propiedades. Las claves como *rich_text*, *date*, *select*, etc., dependen del tipo de propiedad (texto, imagen, select, multi-select) configurado en Notion. Esto puede variar según tu front matter específico y las propiedades de la página de Notion. Ajusta la función según sea necesario para que coincida con tu configuración.

### 3.4. Convirtiendo el Contenido de la Página a Markdown

Ahora, convirtamos el contenido de la página a Markdown. Si seguiste los pasos anteriores, deberías poder obtener todos los bloques de una página de Notion como una `lista` usando la función `notion.blocks.children.list(page_id)`. Cada bloque se representa como un `dict`. Abordé la conversión convirtiendo cada bloque a Markdown secuencialmente de arriba a abajo. Aquí hay una función que toma la lista de bloques como entrada:

```python
def extract_markdown(blocks):
    """
    Extraer contenido Markdown de los bloques de Notion.

    Parámetros:
    blocks (list): Lista de bloques de Notion.

    Devuelve:
    str: Contenido en Markdown.
    """
    markdown_lines = []

    for block in blocks['results']:
        block_type = block['type']
        block_content = block[block_type]
        text = ''

        if block_type != 'image' and block_type != 'divider':
            for rt in block_content['rich_text']:
                # Comprobar si este texto está vinculado
                if rt['text']['link'] is not None:
                    tmp = f"[{rt['text']['content']}]({rt['text']['link']['url']})"
                else:
                    tmp = f"{rt['text']['content']}"

                # Comprobar si las anotaciones indican texto en negrita/cursiva/tachado/subrayado/código/coloreado
                if rt['annotations']['underline']:
                    tmp = f"<ins>{tmp}</ins>"
                if rt['annotations']['bold']:
                    tmp = f"**{tmp}**"
                if rt['annotations']['italic']:
                    tmp = f"*{tmp}*"
                if rt['annotations']['strikethrough']:
                    tmp = f"~~{tmp}~~"
                if rt['annotations']['code']:
                    tmp = f"`{tmp}`"
                if rt['annotations']['color'] != 'default':
                    tmp = f"<span style='color:{rt['annotations']['color']}'>{tmp}</span>"

                text += tmp

            # Agregar dos espacios al final de cada línea para crear saltos de línea
            text += '  '

        if block_type == 'paragraph':
            markdown_lines.append(text)
        elif block_type == 'heading_1':
            markdown_lines.append(f"# {text}")
        elif block_type == 'heading_2':
            markdown_lines.append(f"## {text}")
        elif block_type == 'heading_3':
            markdown_lines.append(f"### {text}")
        elif block_type == 'bulleted_list_item':
            markdown_lines.append(f"- {text}")
        elif block_type == 'numbered_list_item':
            markdown_lines.append(f"1. {text}")
        elif block_type == 'to_do':
            checked = block_content['checked']
            markdown_lines.append(f"- [{'x' if checked else ' '}] {text}")
        elif block_type == 'quote':
            text = text.replace('\n', '\n> ')  # Agregar > al comienzo de cada línea
            markdown_lines.append(f"> {text}")
        elif block_type == 'code':
            language = block_content['language']
            markdown_lines.append(f"```{language}\n{text}\n```")
        elif block_type == 'callout':
            icon = block_content['icon']['emoji']
            markdown_lines.append(f"> {icon} {text}")
        elif block_type == 'divider':
            markdown_lines.append("---")
        elif block_type == 'image':
            # Supongamos que solo usamos URL externas para imágenes... por conveniencia
            if 'external' in block_content:
                url = block_content['external']['url']
            elif 'file' in block_content:
                url = block_content['file']['url']
            else:
                url = ""
            # La leyenda se omite por simplicidad
            caption = ""
            markdown_lines.append(f"![{caption}]({url})  ")

    return markdown_lines
```

Puedes ver que el código está casi codificado para coincidir con la forma en que Notion extrae bloques. El método de conversión de cada bloque a Markdown varía según el tipo de bloque. Aunque no explicaré cada detalle, aquí hay un resumen:

- Primero, comprueba si el tipo de bloque no es una imagen o un divisor. Si no, es un bloque basado en texto.
- Luego, dependiendo de si el texto es un encabezado, lista, etc., aplica la sintaxis Markdown correspondiente al resultado.
- Si el bloque es un divisor, el resultado es `---`. Si es una imagen, el resultado es el formato Markdown para una imagen. No implementé leyendas para imágenes debido a la complejidad.
- Los resultados se recopilan en una lista `markdown_lines`, con cada bloque convertido agregado secuencialmente.

Una vez que tengas una lista de bloques convertidos a Markdown, es hora de usar esta lista junto con el front matter extraído para crear una página de Jekyll.


### 3.5. Creando una Página de Jekyll

Escribamos el código para crear una página de Jekyll utilizando el front matter y la lista

 de Markdown extraídos.

La cadena `front_matter` se construye utilizando la variable `dict` del front matter extraído. Cuando el front matter extraído se almacena en una variable llamada `page_fm`, el código se ve así:

```python
front_matter = f"""---
layout: post
permalink: /{page_fm['categories']}/:title/
title: "{page_fm['title']}"
date: {page_fm['date']} 00:00:00 -0400
tags: {page_fm['tags']}
categories: {page_fm['categories']}
categorydisplay: {page_fm['categorydisplay']}
lang: {page_fm['lang']}
image: {page_fm['thumbnail']}
subtitle: {page_fm['subtitle']}
---\n"""
```

Una vez que el front matter, que debería estar al principio de la página, esté listo, crea el archivo Markdown en la ruta deseada y escribe la publicación. Primero, escribe el front matter, y luego escribe cada línea de la lista de Markdown extraída (tipo `list`) en el archivo. Cuando el nombre de la variable de la lista de Markdown es `page_md`, el código es el siguiente:

```python
# Escribir el contenido de Markdown en el archivo
# Escribir en el directorio ./_posts/{lang}/{categories}/{filename}
with open(os.path.join('_posts', language, page_fm['categories'], filename), 'w') as file:
    file.write(front_matter)
    for line in page_md:
        file.write(f"{line}\n")

# Devolverá page_fm y filename para referencia
print(f"Archivo Markdown de la publicación de Jekyll escrito: {os.path.join('_posts', language, page_fm['categories'], filename)}")
```

Primero, escribe el front matter, y luego escribe cada línea de la lista de Markdown `page_md`. La función completa es la siguiente:

```python
def write_jekyll_post_from_fm_md(page_fm, page_md, language="kr"):
    """
    Escribir un archivo Markdown de publicación de Jekyll.
    
    Parámetros:
    page_fm (dict): El front matter de la página.
    page_md (list): El contenido de Markdown de la página.
    
    Resultados:
    front_matter (str): El front matter del archivo Markdown.
    filename (str): El nombre del archivo Markdown.
    """

    # Definir el nombre del archivo Markdown
    filename = f"{page_fm['date']}-{page_fm['filename']}.md"

    # Definir el front matter del archivo Markdown
    front_matter = f"""---
layout: post
permalink: /{page_fm['categories']}/:title/
title: "{page_fm['title']}"
date: {page_fm['date']} 00:00:00 -0400
tags: {page_fm['tags']}
categories: {page_fm['categories']}
categorydisplay: {page_fm['categorydisplay']}
lang: {page_fm['lang']}
image: {page_fm['thumbnail']}
subtitle: {page_fm['subtitle']}
---\n"""

    # Escribir el contenido de Markdown en el archivo
    # Escribir en el directorio ./_posts/{lang}/{categories}/{filename}
    with open(os.path.join('_posts', language, page_fm['categories'], filename), 'w') as file:
        file.write(front_matter)
        for line in page_md:
            file.write(f"{line}\n")

    # Devolverá page_fm y filename para referencia
    print(f"Archivo Markdown de la publicación de Jekyll escrito: {os.path.join('_posts', language, page_fm['categories'], filename)}")

    return front_matter, filename
```

## 4. Manejo de Paginación

Si la publicación es demasiado larga, la API de Notion usa *paginación*, dividiendo la publicación en múltiples partes. Si la respuesta de la API contiene una variable `has_more`, necesitas enviar solicitudes adicionales usando la variable `next_cursor`. Para obtener más información, consulta la [página oficial de la API de Notion](https://developers.notion.com/reference/intro#pagination). Creé la siguiente función:

```python
def get_jekyll_post_from_notion_page(page_id):
    """
    Escribir un archivo Markdown de publicación de Jekyll.
    
    Parámetros:
    page_id (str): El ID de la página de Notion.

    Resultados:
    page_fm (dict): El front matter de la página.
    page_md (list): El contenido de Markdown de la página.
    """
    # Obtener el front matter de la página
    page_fm = extract_frontmatter(page_id)

    # Obtener el contenido de Markdown de la página
    page_md = []

    response = notion.blocks.children.list(page_id)
    page_md.extend(extract_markdown(response))

    has_more = response['has_more']
    next_cursor = response['next_cursor']
    while has_more:
        if next_cursor:
            response = notion.blocks.children.list(page_id, start_cursor=next_cursor)
            page_md.extend(extract_markdown(response))
            has_more = response['has_more']
            next_cursor = response['next_cursor']
        else:
            break

    return page_fm, page_md
```

Si `has_more` y `next_cursor` existen, se envían solicitudes adicionales para recuperar más contenido de la página de Notion.

## 5. Pasos Finales

Usando las funciones creadas hasta ahora, crear una página se ve así:

```python
page_url = "tu_url_de_página"

# Ejemplo de uso
page_id = extract_page_id(page_url)
print("ID de la página de Notion:", page_id)

# Obtener el front matter y el contenido de Markdown de la página de Notion
pfm, pmd = get_jekyll_post_from_notion_page(page_id)

# Escribir el archivo Markdown de la publicación de Jekyll en coreano
_, _ = write_jekyll_post_from_fm_md(pfm, pmd)
```

---

En esta publicación, cubrimos cómo convertir una página de Notion a una publicación de Jekyll usando Python y la API de Notion. No estoy seguro de cuán útil será esto debido a la extensa codificación rígida, pero...

En la próxima publicación, discutiré cómo usar ChatGPT para admitir automáticamente múltiples idiomas en este proceso. Planeé incluirlo en esta publicación, pero se volvió demasiado largo... Necesito un descanso.
