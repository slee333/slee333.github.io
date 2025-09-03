---
layout: post
permalink: /es/learning/:title/
title: "De Notion a Jekyll: Automatizando la Subida de Imágenes"
subtitle: "Subir imágenes era la parte más engorrosa de mover artículos de Notion a Jekyll. Automaticemos este proceso."
date: 2025-09-03 10:00:00 +0900
lang: es
categories: learning
categorydisplay: Aprendizaje
tags: [python, automation, cloudinary, jekyll]
image: https://pix4free.org/assets/library/2021-08-01/originals/automation.jpg # TODO: Por favor, establece una imagen representativa para este post.
translation_id: notion-automation-workflow
---


## Introducción

Un blog de GitHub que usa Markdown. Definitivamente es conveniente y excelente.

Pero como mencioné en una [publicación anterior](https://slee333.github.io/es/learning/Jeykll-notion-to-jekyll/), la mayor parte de mi escritura la hago en Notion.

Porque la interfaz de Notion es simplemente más cómoda para crear contenido.

Sin embargo, moverlo a mi blog personal basado en Jekyll era una tarea manual bastante engorrosa.

¿Copiar y pegar texto? Sencillo. Pero el problema eran las imágenes.

Cuando copias de Notion a Jekyll, las imágenes se rompen. Así que tenía que pasar por el tedioso proceso de subir cada imagen a un sitio externo como Imgur y luego obtener la imagen de ese sitio.

Como probablemente puedas adivinar, era un proceso extremadamente tedioso.

¿Pero cómo podría haberlo sabido?

Que llegaría la era de los MCP, haciendo mucho más fácil resolver estos problemas con herramientas como Claude Code o el CLI de Gemini.

Ayer luché con esto durante todo un día y logré automatizar este aburrido proceso. A través de un script de Python.

Por lo tanto, hoy quiero compartir el flujo de trabajo para **publicar automáticamente imágenes de Notion con sus leyendas en el blog**.

Este también es código escrito puramente por Gemini. Aunque Gemini sí hizo referencia a mi [código anterior](https://slee333.github.io/es/learning/Jeykll-notion-to-jekyll/)... 

En fin, vamos a ello.

-----

## La inestabilidad de las imágenes de Notion

Las imágenes subidas a Notion se almacenan en los servidores de Notion (principalmente AWS S3).

El problema es que estas URL suelen ser temporales y cambian con frecuencia. Así que, si simplemente copias el enlace de la imagen desde Notion, al día siguiente el enlace habrá cambiado y todas las imágenes estarán rotas.

Verdaderamente insoportable.

Para tener un control firme sobre todos los elementos del blog, alojar las imágenes en un servicio externo era, por lo tanto, esencial.

Es decir, subir la imagen a un sitio de alojamiento externo y luego obtener el enlace. De esta manera, el enlace no cambiará (a menos que el sitio de alojamiento que uso caiga).

Originalmente usaba un sitio llamado `imgur`, pero parece que ya no ofrecen soporte para su API.

Así que me mudé a otra plataforma. **Cloudinary**.

Cloudinary tenía más funciones de las que esperaba.

Además de la subida de imágenes, también tenía la capacidad de transformar y optimizar imágenes en tiempo real a través de parámetros en la URL.

Basta de charla, veamos cómo usé la API de Cloudinary.


-----


## Escribiendo el script de Python (o más bien, ordenando que se escriba)

Gran parte del script de automatización se cubrió en la publicación anterior, así que omitiré las partes detalladas.

Algunas partes se han optimizado aún más a través de MCP como el CLI de Gemini, pero el principio básico es el mismo.

Básicamente, todo el contenido de una página de Notion se compone de 'bloques'.

En esta situación, el propósito del script es extraer los datos de la imagen y subirlos a Cloudinary cuando el tipo de bloque es **imagen**.

Paso a paso.

-----

### 0. Preparación: Configurando las claves de API

Para que el script se comunique con Cloudinary, se necesita un trabajo preliminar.

Este proceso requiere tres datos: **Cloud Name, API Key y API Secret**.

Puedes encontrar esta información iniciando sesión en tu panel de control de Cloudinary y yendo a Configuración -> Claves de API.

Como todos saben, lo más importante es no 'hardcodear' estos valores directamente en el script.

Exponer información sensible como el API Secret es muy peligroso para la seguridad si se sube accidentalmente a lugares como Git.

Los niños buenos deben usar un archivo separado (`.env`) para establecer **Variables de Entorno**.

En fin, usé el módulo `os` en mi script de Python como se muestra a continuación para cargar las variables de entorno y configurar Cloudinary.

```python
import cloudinary
import os

# Cargar credenciales de Cloudinary desde variables de entorno
cloudinary.config(
  cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME'),
  api_key = os.environ.get('CLOUDINARY_API_KEY'),
  api_secret = os.environ.get('CLOUDINARY_API_SECRET'),
  secure = True # Configurar para usar HTTPS
)

```

Esto me permite ejecutar el script de forma segura sin exponer mis claves secretas.

Una vez que la configuración de la clave de API a través de variables de entorno está completa, pasamos al siguiente paso.


### 1. Extrayendo la URL de la imagen y la leyenda

El script primero extrae la URL de la imagen original y el texto de la leyenda escrito por el usuario del bloque de imagen de Notion.

### 2. Subiendo la imagen a Cloudinary

A continuación, el script pasa directamente la URL de la imagen de Notion extraída a la API de Cloudinary para subir la imagen.

Es muy eficaz porque el script lo maneja automáticamente sin que yo tenga que hacerlo manualmente.


```python

import cloudinary.uploader

def upload_image_to_cloudinary(image_url):
    """Toma una URL de imagen y la sube directamente a Cloudinary."""
    try:
        # La función cloudinary.uploader.upload puede tomar una URL como argumento directo.
        upload_result = cloudinary.uploader.upload(image_url)
        print(f"¡Subida de imagen exitosa! Public ID: {upload_result['public_id']}")
        return upload_result
    except Exception as e:
        print(f"Error al subir a Cloudinary: {e}")
        return None
```

### 3. Generando una etiqueta `<img>` responsiva

Cuando la imagen se sube con éxito, Cloudinary devuelve un `public_id` único.

Esta es la parte clave. En lugar de simplemente usar este ID para crear una etiqueta de imagen de Markdown `![]()`, el punto es generar una **etiqueta `<img>` para la web responsiva**.

Esta **etiqueta img** incluye el atributo `srcset`. Su función es permitir que el navegador elija el tamaño de imagen más apropiado según el tamaño de la pantalla del usuario (escritorio, tableta, móvil, etc.).

Esto evita el desperdicio innecesario de datos y mejora drásticamente la velocidad de carga.

```python

def generate_responsive_image_tag(public_id):
    """Genera una etiqueta de imagen HTML responsiva a partir de un public_id de Cloudinary."""
    widths = [400, 800, 1200] # Anchos de imagen deseados
    srcset_parts = []

    for width in widths:
        # Ajusta el ancho y optimiza automáticamente el formato y la calidad con las transformaciones de URL de Cloudinary.
        transformed_url = cloudinary.CloudinaryImage(public_id).build_url(
            transformation=[
                {'width': width, 'crop': 'limit'},
                {'quality': 'auto', 'fetch_format': 'auto'}
            ]
        )
        srcset_parts.append(f"{transformed_url} {width}w")
    
    srcset = "\n".join(srcset_parts)
    fallback_src = cloudinary.CloudinaryImage(public_id).build_url(transformation={'width': 800}) # Imagen de respaldo

    return f'''<img 
  srcset="{srcset}"
  sizes="(max-width: 1200px) 100vw, 1200px"
  src="{fallback_src}"
  alt="Descripción de la imagen">'''
```

### 4. Manejando la leyenda y combinación final de HTML

Finalmente, el texto de la leyenda extraído en el paso 1 se envuelve en una etiqueta `<p>` con un estilo simple y se agrega justo debajo de la etiqueta `<img>` generada en el paso 3. También se centra.

-----

## El resultado

Después de todo esto, un simple bloque de imagen de Notion se transforma en el siguiente código HTML responsivo completo en mi blog.

```markdown
<img 
  srcset="https://res.cloudinary.com/.../w_400,.../image.webp 400w,
https://res.cloudinary.com/.../w_800,.../image.webp 800w,
https://res.cloudinary.com/.../w_1200,.../image.webp 1200w"
  sizes="(max-width: 1200px) 100vw, 1200px"
  src="https://res.cloudinary.com/.../w_800,.../image.webp"
  alt="Descripción de la imagen">

<p style="text-align:center; font-style:italic;">Esta es la leyenda de la imagen escrita en Notion.</p>
```

-----


## Conclusión

Los MCP son geniales.

Al usar diligentemente el CLI de Gemini, pude automatizar la tarea repetitiva de procesamiento de imágenes que era el mayor obstáculo para escribir publicaciones de blog.

¿No es el proceso de encontrar cuellos de botella en un flujo de trabajo y automatizarlos otra alegría para las personas que aman el desarrollo?

Al optimizar este proceso que consume mucho tiempo, las cosas se han vuelto mucho más convenientes, y creo que ha mejorado por eso.