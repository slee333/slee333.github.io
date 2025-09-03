---
layout: post
permalink: /learning/:title/
title: "Jekyll 포스트 Notion으로 작성하기"
date: 2024-07-10 00:00:00 -0400
tags: [blog, chatgpt, openai]
categories: learning
categorydisplay: 공부일기
lang: kr
image: https://cdn.pixabay.com/photo/2013/05/12/09/36/globe-110775_960_720.jpg
subtitle: 나는 노션 페이지를 마크다운으로 export하는 기능을 사용하기조차 번거로웠다. 그냥 URL만 입력하면 포스트가 자동으로 올라가길 원한다!
translation_id: "jekyllnotion"
---
이전 글에서는 플러그인 없이 Jekyll에서 다중 언어를 지원하는 방법에 대해 이야기 해 보았다. 이번 글에서는 노션에 작성한 글을 어떻게 Jekyll에 업로드하는지를 중점적으로 이야기해보고자 한다.   
  
내가 만든 파이프라인은 다음과 같은 과정을 거친다.  
  
1. 노션에서 글을 작성한다.  
1. 노션 API를 이용해 노션 페이지를 마크다운 형식으로 변환한다.  
1. Chat GPT API를 이용하여 마크다운을 내가 원하는 언어로 번역한다.  
1. 각 언어에 해당하는 마크다운 파일을 해당하는 Frontmatter와 함께 해당하는 디렉토리에 작성한다.  
  
이 글은 3번을 제외한 나머지 1, 2, 4번 과정을 다룬다.  
## 1. 노션으로 글쓰기  
테스트를 위해 나는 글을 하나 만들었다. [다음 글](https://slee333.github.io/%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-%EC%84%A4%EC%A0%95-%EC%8B%A4%ED%97%98/)이 바로 그것이다. 보면 알겠지만 한 페이지 내에 헤더, 볼드, 이탤릭, 이미지 등 다양한 내용을 포함 한 상태로 글을 작성하였다.  
  
![](https://i.imgur.com/VZSpMW0.png)  
  
  
다만 이 과정에서 몇 가지 주의 할 점이 있다.   
  
### 1.1. 스크린샷을 올릴 때  
블로그 개발 관련 글을 올릴 때, 혹은 저널 리뷰 등을 할 때 외부 이미지를 스크린샷 해서 올리게 되는 경우가 많다. 이 스크린샷들을 노션에서 바로 볼 때는 문제가 없지만, 노션에서 이 이미지들의 링크를 가져와서 내 블로그에서 보여 줄 때는 문제가 생긴다. 바로 노션에 바로 업로드한 이미지들의 URL이 수시로 바뀌는 문제이다. (AWS로 갔다가, notion 자체 데이터베이스에 저장되는 듯 하다가… 계속해서 바뀐다.)  
  
이 문제를 나는 imgur을 사용해서 해결했다. 다음 스크린샷과 같이 imgur에 접속 한 다음, Create Post 버튼을 누른다. 그럼 다음과 같은 화면이 뜬다.  
  
![](https://i.imgur.com/HtGM05g.png)  
  
이 상태에서 내가 스크린샷 했던 컨탠츠를 복사+붙여넣기 해 준다. 그럼 다음과 같이 스크린샷이 imgur에 복사된다.  
  
![](https://i.imgur.com/pIDJkJn.png)  
  
이 상태에서 내가 업로드 한 스크린샷을 우클릭 - 이미지 링크를 복사한다. 이후 노션의 *image → embed Link *기능을 이용하여 해당 링크를 첨부하면 URL이 변경 될 걱정 없이 이미지를 노션에 업로드 할 수 있다.  
  
사실 꼭 Imgur을 사용해야 하는 건 아니고, 이미지 호스팅 사이트라면 그 어떤 사이트를 사용해도 상관없다. 난 블로그 내부 asset에 이미지를 업로드는 하지 않으려 하는 편이라 이런 방법을 사용했는데, 직접 블로그 내부 폴더에 이미지를 업로드하는 사람이면 다른 접근 방식이 필요할 수 있겠다.  
  
### 1.2. 내가 사용 할 기능 한정하기  
파트 2에서 설명하겠지만, 우린 노션 페이지를 결국 마크다운으로 변경 해 줄 거다. 사실 이 기능을 구현하려는 시도는 이전에도 많았었고 여러 예제들이 있지만, 파이썬 사용자로서 나는 노션에서 글을 불러오고, 마크다운으로 변환하고, 변환한 마크다운을 ChatGPT에 번역을 돌리는 모든 과정을 원클릭으로 해결하고 싶었다.   
  
노션은 기본적으로 마크다운으로 페이지를 추출하는 과정을 지원하지만, 난 이마저도 귀찮았다는 말이다. 때문에 노션 페이지의 URL만 있으면 되는 파이프라인을 만들었고, 때문에 노션에서 마크다운을 만드는 과정 역시 스스로 만들어야 했다.  
  
노션의 모든 기능을 마크다운으로 구현하기엔 어려움이 따르기에 나는 내가 사용할 기능을 한정하기로 했다. 내가 사용하기로 결정한 기능은 다음과 같다.  
  
- **본문 기능:** 가장 기본적인 기능. 텍스트를 그냥 적어주는 되는 부분이다.  
- **헤더**: `#` , `##` , `###` 로 대표되는 마크다운의 헤더 기능들 역시 당연히 포함시켰다.  
- **볼드, 이탤릭, 밑줄, 취소선**: 자주 사용하는 기능이므로 역시 포함시켰다. 기본 마크다운이 밑줄은 지원하지 않는데, 텍스트 앞 뒤로 `<ins>` 태그를 집어넣으면 해결된다.  
- **코드 기능**: 지금 이 목록에도 코드 기능이 몇 개나 들어간건가? 당연히 포함시켰다.  
- **색상 기능**: 노션은 <span style='color:pink'>텍스트에</span> <span style='color:brown'>다양한 색</span>을<span style='color:red'> 지원한다</span>. 배경색도 지원하고 <span style='color:green'>본문 색도 지원하는데, </span>나는 배경색 기능은 잘 사용하지 않아서 구현하지 않았다.   
- **목록**: 순서가 있거나 없는 항목들 역시 자주 사용하므로 포함시켰다.  
- **체크마크**: 자주 사용하는 기능은 아니지만 ,어려운 기능은 아니므로 포함시켰다.  
- **디바이더**: `---` 로 대변되는 기능. 페이지를 구분하는 손쉬운 방법이다. 포함시켰다.  
- **이미지**: 상기했듯 블로그에 이미지를 포함시키는 일은 매우 중요하다. 당연히 구현했다.  
- **인용문**: 인용문 역시 구현했는데, 뭔가 문제가 있는지 만족스럽게 구현이 되지 않았다. 내가 고쳐야 하는 부분이다.  
  
어떻게 구현했는지는 파트 2에서 더 설명하겠다.   
  
### 1.3. Front Matter 미리 설정해주기  
내 포스트의 Front Matter는 다음으로 구성되어 있다.  
- layout  
- permalink  
- title  
- date  
- tags  
- categories  
- categorydisplay: 카테고리를 각 언어에 맞춰 보여주기 위해 임의로 넣은 front matter이다.  
- lang: 포스트의 언어  
- thumbnail: 블로그 포스트의 썸네일  
- subtitle: 블로그의 소제목이다.  
  
이런 부분들을 노션의 property 기능을 이용해 내 페이지 양식에 맞춰 구현해두었다. 이래야 불러오는게 편하지 않겠는가? 지금 작성하고 있는 이 페이지의 경우 노션 페이지의 property가 다음과 같다.  
  
![](https://i.imgur.com/nuBKB0U.png)  
  
노션 페이지의 property들을 front matter와 연동되도록 설정했다면 이제 노션 페이지를 마크다운으로 추출하는 과정으로 넘어가자.  
  
## 2. Notion API  
앞서 말했듯 notion에서는 자체적으로 페이지를 마크다운으로 변환하는 기능을 지원한다. 하지만 나는 URL만으로 노션 페이지 변환부터 번역까지 해결하고픈 게으른 사람이기에 그냥 Notion API를 이용해서 이 과정을 자동화하기로 하였다.  
  
### 2.1. 노션 API 이용하기  
노션 API를 이용하기 위해서는 Integration 기능을 이용해야 한다. [Integration 페이지](https://www.notion.so/profile/integrations)로 가서 Integration을 만들어준다. 새로운 integration 만들기 버튼을 클릭하면, 다음과 같은 창이 뜬다.  
  
![](https://i.imgur.com/cvzYZUy.png)  
  
Integration 이름을 설정해주고, 내가 노션에서 글을 작성할 Workspace를 골라 연동시켜주자. Type은 개인 사용 용도이니 지금처럼 internal이면 족하다.  
  
그러면 다음과 같이 내 integration이 생성된 모습을 볼 수 있다.  
  
![](https://i.imgur.com/Jb9HGQG.png)  
  
위에서 보이는 **internal integration secret** 부분은 다음 섹션에서 사용할 예정이다. Integration이 생성되었으면 이제 노션으로 돌아와 글을 작성할 페이지로 돌아오자.  
  
![](https://i.imgur.com/E1QLdii.png)  
페이지 우측 상단의 더 보기 (…) 버튼을 클릭하면 `Connect to` 라는 부분이 있다. 이 부분에 마우스를 올리면 아까 생성한 integration이 보일 텐데, 이걸 클릭해서 integration과 내 페이지를 연결시켜주자. 위 스크린샷은 예시이다.  
  
### 2.2 Python에서 Notion API를 이용해서 마크다운에 접근하기  
이제 Notion API를 사용할 파이썬 파일을 만들어주자. 나는 내 블로그 로트 디렉토리에 **blog_pipeline.ipynb **라는 파일을 만들었다. 그리고 필요한 라이브러리를 불러온다.  
  
```python
from notion_client import Client
from dotenv import load_dotenv
import re  
```
해당 패키지가 없다면 pip를 이용해 설치해주자. (ex. `%pip install notion_client`). 이제 파이썬 환경에서 노션 API를 사용할 준비가 완료되었다.  
  
  
## 3. 노션 페이지 마크다운으로 전환하기  
이제부터 본격적으로 API를 이용해서 페이지를 마크다운으로 전환해주자. 다음과 같은 과정이 필요하다.  
  
### 3.1. 페이지 아이디 변환하기  
노션 페이지에는 **페이지 아이디**라는 것이 존재한다. 페이지 URL을 보면  
[https://www.notion.so/seungwooklee/Jekyll-86e9ef81af6e4cefae24c0c733ce6853](https://www.notion.so/seungwooklee/Jekyll-86e9ef81af6e4cefae24c0c733ce6853)  
이런 식으로 되어 있는데, 이 중 끝에 있는 32개 길이의 string을 8개-4개-4개-4개-12개 길이로 나눈 것이 노션의 page id가 된다. 즉 위 예시에서 페이지 아이디는 `86e9ef81-af6e-4cef-ae24-c0c733ce6853` 가 되는 셈. 노션 API는 페이지에 페이지 아이디를 사용해 접근하므로 url을 페이지 아이디로 변환하는 파이썬 함수를 만들어준다.   
```python
def extract_notion_page_id(notion_url):
    """
    Extract the Notion page ID from a Notion URL.
    
    Parameters:
    notion_url (str): The URL of the Notion page.
    
    Returns:
    str: The extracted Notion page ID.
    """
    # Define the regular expression pattern to match the Notion page ID - geting 32-character string
    pattern = re.compile(r'([a-f0-9]{32})')
    
    # Search for the pattern in the Notion URL
    match = pattern.search(notion_url)
    
    if match:
        # Extract the page ID
        page_id = match.group(1)
        
        # Insert hyphens in the pattern 8-4-4-4-12
        formatted_page_id = f"{page_id[:8]}-{page_id[8:12]}-{page_id[12:16]}-{page_id[16:20]}-{page_id[20:]}"
        
        return formatted_page_id
    else:
        raise ValueError("Invalid Notion URL or page ID not found.")  
```
  
### 3.2. Secret Token 저장하기  
이제 본격적으로 노션 API를 사용해보자. 그러기 위해서는 아까 integration을 만들 때 보았던 internal secret이 필요하다.   
파이썬에서 notion API를 사용하려면 이 secret을 입력하는 과정이 필요한데, 코드 내에 secret을 포함시키는 건 해당 시크릿을 외부인이 볼 위험이 있기에 권장되지 않는다. 시크릿이 있다면 외부인이 api를 이용해 내 포스트를 수정 할 수 있게 되므로… (물론 파이썬 파일을 Github에 올리지 않는다면 외부에 Secret이 노출되지 않는 샘이므로 문제는 되지 않긴 한다.)  
  
내 경우엔 파이썬 코드 역시 Github에 올릴 생각이므로 `.env` 파일을 만들어 시크릿을 관리하기로 했다. 과정은 다음과 같다.  
1. 파이썬 코드가 포함된 디렉토리에 `.env` 파일을 작성한다.  
1. `.env` 파일의 내부는 다음과 같이 작성한다.
`NOTION_TOKEN = 내_시크릿_키` (String처럼 “”를 붙일 필요 없이 그냥 그대로 붙여넣어주면 된다)  
1. `.env` 파일이 Github에 올라가버리면 이 모든 작업이 의미가 없어진다. `.gitignore` 파일에 .env를 추가하자. 내 `.gitignore` 파일은 예시로 다음과 같다.  
![](https://i.imgur.com/8FdfiS5.png)  
  
  
  
위 과정을 완료했으면, 파이선 코드 내에서 시크릿을 불러오고 노션 API 클라이언트를 실행해보자. 코드는 다음과 같다.  
  
```python
from dotenv import load_dotenv

# From .env get notion_token
load_dotenv()

# Create Notion API Client
notion_token = os.getenv('NOTION_TOKEN')
notion = Client(auth=notion_token)  
```
  
### 3.3. Notion API를 이용해 프론트매터 만들기  
이제 API 클라이언트와 페이지 아이디를 이용해 파이썬으로 노션 페이지에 접근 할 수 있다. 앞서 노션 페이지의 property에 front matter에 사용할 값들을 저장했는데, 우선 이걸 불러오는 함수를 만들어보자.  
  
```python
def extract_frontmatter(page_id):
    """
    Get the properties of a Notion page.
    
    Parameters:
    page_id (str): The ID of the Notion page.
    
    Returns:
    dict: The properties of the Notion page.

    * of note, for my Jekyll page, I used the following properties
        - title: title of post
        - date: date post is created. Instead of using date in Notion, I used the date that I manually input in Notion
        - tags: tags of the post
        - categories: categories of the post
        - categorydisplay: wierd name, I know. But this is for display purposes in Jekyll
        - lang: language of the post; either kr, en, or es; default is kr
        - thumbnail: thumbnail image of the post
        - subtitle: subtitle of the post
    """
    # Get the page data
    page_data = notion.pages.retrieve(page_id)
    

    # Get the filename of the page
    filename = page_data['properties']['filename']['rich_text'][0]['plain_text']
    # Get the title of the page
    title = page_data['properties']['title']['rich_text'][0]['plain_text']
    # Get the date of the page
    date = page_data['properties']['date']['date']['start']
    # Get the tags of the page
    tags = [ i['name'] for i in page_data['properties']['tags']['multi_select']]
    # get the categories of the page
    categories = page_data['properties']['categories']['select']['name']
    # Get the categorydisplay of the page
    categorydisplay = page_data['properties']['categorydisplay']['select']['name']
    # Get the lang of the page
    lang = page_data['properties']['lang']['select']['name']
    # Get the thumbnail of the page
    thumbnail = page_data['properties']['thumbnail']['files'][0]['name']
    # Get the subtitle of the page
    subtitle = page_data['properties']['subtitle']['rich_text'][0]['plain_text']
    
    # Create a dictionary of the properties
    properties = {
        'filename': filename,
        'title': title,
        'date': date,
        'tags': ' '.join(tags),
        'categories': categories,
        'categorydisplay': categorydisplay,
        'lang': lang,
        'thumbnail': thumbnail,
        'subtitle': subtitle
    }
    
    return properties  
```
  
위와 같이, `notion.pages.retrieve(page_id)` 기능을 통해 페이지 데이터를 불러오고, page_data의 properties에 있는 값들을 불러오는 코드를 하드코딩하였다. *rich_text*, *date*, *select *등 여러가지 키들이 보이는데, 이는 노션에서 설정한 property의 유형에 따라 (텍스트이냐, 이미지이냐, *select*이냐, multi-select이냐) 달라지는 부분이라 사람마다 원하는게 다를 것이다.   
  
무튼 나의 경우엔 파일명, 제목, 소제목은 텍스트 유형이라 *rich *text라는 키를 이용하였고, 날짜는 *date*, 태그는 *multi*-*select*, 카테고리나 언어 등은 *select*, 그리고 썸네일은 *file *유형을 사용하였다. 이 부분은 사람마다 원하는게 다를거라 혹여 이 접근법을 사용하는 다른 분이 계시다면 본인이 원하는 front matter와 본인이 설정한 노션 페이지의 property에 맞추어 수정이 필요할 것이다.  
  
### 3.4. 페이지 내용 마크다운으로 변환하기
  
이제 페이지 내용을 마크다운으로 변환하는 과정을 가져보려 한다. 위 과정을 따라왔다면, `notion.blocks.children.list(page_id)` 기능을 통해 노션 페이지의 모든 블럭들을 `list` 형태로 얻을 수 있을 것이다. 각 블럭들은 `dict` 자료형으로 구성되어 있다. 모든 블럭들을 위에서부터 차례대로 마크다운으로 변환하는 방식으로 나는 접근하였다. 위에서 말한 블럭들의 list를 입력값으로 받는 함수이다.  
  
```python
def extract_markdown(blocks):
    """
    Extract Markdown content from Notion blocks.

    Parameters:
    blocks (list): List of Notion blocks.

    Returns:
    str: Markdown content.
    """
    markdown_lines = []

    for block in blocks['results']:
        block_type = block['type']

        block_content = block[block_type]
        text =''

        if block_type != 'image' and block_type != 'divider':

            for rt in block_content['rich_text']:
    
                #Check if this text is linked
                if rt['text']['link'] != None:
                    tmp = f"[{rt['text']['content']}]({rt['text']['link']['url']})"
                else:
                    tmp = f"{rt['text']['content']}"

                #Check if annotations says if text is bold/italic/strikethrough/underline/code/colored
                if rt['annotations']['underline'] == True:
                    tmp = f"<ins>{tmp}</ins>"
                if rt['annotations']['bold'] == True:
                    tmp = f"**{tmp}**"
                if rt['annotations']['italic'] == True:
                    tmp = f"*{tmp}*"
                if rt['annotations']['strikethrough'] == True:
                    tmp = f"~~{tmp}~~"
                if rt['annotations']['code'] == True:
                    tmp = f"`{tmp}`"
                if rt['annotations']['color'] != 'default':
                    tmp = f"<span style='color:{rt['annotations']['color']}'>{tmp}</span>"

                text += tmp

            # Add two spaces at the end of each line to create line breaks
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
            text = text.replace('\n', '\n> ')  # Add > at the beginning of each line
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
            # Suppose we only use external url for images... for convenience

            if 'external' in block_content:
                url = block_content['external']['url']
            elif 'file' in block_content:
                url = block_content['file']['url']
            else:
                url = ""
            #url = block_content['external']['url']
            #caption = block_content['caption'][0]['plain_text']
            caption = ""
            markdown_lines.append(f"![{caption}]({url})  ")

    return markdown_lines  
```
  
보면 노션이 블럭을 추출하는 형태에 맞추어 거의 하드코딩 해 놓은 모습을 볼 수 있다. 블럭의 ‘type’에 따라 마크다운으로 바꾸는 방법 역시 달라지기 때문이다. 코드의 모든 내용을 설명하진 않겠지만, 개요는 다음과 같다.  
- 우선 type이 이미지나 디바이더가 아닌지를 체크한다. 아니라면, 해당 블럭은 텍스트 기반 블럭이다.  
- 이후, 해당 텍스트가 헤더냐, 목록이냐 등에 따라 해당하는 마크다운 문법을 결과물에 적용한다.  
- 결과물이 디바이더라면 `---`을, 이미지라면 이미지에 해당하는 마크다운 서식이 결과물이 된다. 이미지 캡션은 구현이 귀찮아서 구현하지 않았다.  
- 결과물을 markdown_list라는 list를 만들어 결과물을 하나하나 추가해준다.  
  
이렇게 노션 페이지의 각 블럭을 마크다운으로 변환한 리스트를 갖게 되었으면, 이제 이 리스트와 앞서 추출한 프론트매터를 이용해 Jekyll 페이지를 만들어줄 차례다.  
  
### 3.5. Jekyll 페이지 만들기  
앞서 추출한 프론트 매터와 마크다운 리스트를 Jekyll 페이지로 만들어주는 코드를 작성해보자.   
  
  
*front_matter*라는 *string*을 앞서 추출한 프론트매터 *dict *변수를 사용하여 작성해준다. 추출한 프론트매터가 *page_fm*이란 변수에 저장되어 있을 때 코드는 이렇다.  
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
  
페이지의 처음에 자리해야 하는 프론트매터가 완성되었으면, 원하는 경로에 마크다운 파일을 작성하여 포스트를 작성하자. 프론트매터를 우선적으로 작성하고, 앞서 추출한 마크다운을 (*list *자료형)한 줄씩 파일 내에 적어주면 된다. 마크다운을 담은 리스트의 변수명이 `page_md`라 하였을 때, 코드는 다음과 같다.  
```python
# Write the Markdown content to the file
# Write in directory ./_posts/{lang}/{categories}/{filename}
with open(os.path.join('_posts', language , page_fm['categories'],filename), 'w') as file:
    file.write(front_matter)
    for line in page_md:
        file.write(f"{line}\n")

# Will return page_fm and filename for reference
print(f"Jekyll post Markdown file written: {os.path.join('_posts', language , page_fm['categories'],filename)}")  
```
  
우선 프론트 매터를 적어주고, 한 줄씩 `page_md`에 있는 마크다운을 적어주는 방식이다. 완성된 함수는 다음과 같다.  
  
```python
def write_jekyll_post_from_fm_md(page_fm,page_md, language = "kr"):
    """
    Write a Jekyll post Markdown file.
    
    Parameters:
    page_fm (dict): The front matter of the page.
    page_md (list): The markdown content of the page.
    
    Outputs:
    front_matter (str): The front matter of the Markdown file.
    filename (str): The filename of the Markdown file.

    """

    # Define the filename of the Markdown file
    #title_as_filename = "".join([x if x.isalnum() else "_" for x in page_fm['title']])
    filename = f"{page_fm['date']}-{page_fm['filename']}.md"

    # Define the front matter of the Markdown file
    # If language is Korean, then use default front matter
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
    

    # Write the Markdown content to the file
    # Write in directory ./_posts/{lang}/{categories}/{filename}
    with open(os.path.join('_posts', language , page_fm['categories'],filename), 'w') as file:
        file.write(front_matter)
        for line in page_md:
            file.write(f"{line}\n")
    
    # Will return page_fm and filename for reference
    print(f"Jekyll post Markdown file written: {os.path.join('_posts', language , page_fm['categories'],filename)}")
    
    return front_matter, filename  
```
  
## 4. Pagination 다루기  
노션 API는 포스트가 너무 길 경우 *pagination*이란 것을 한다. 포스트를 쪼갈라서 보내주는 것이다. API에서 보내주는 대답 내에 `has_more` 이라는 변수가 있을 경우, `next_cursor`라는 변수를 이용해서 추가적인 요청을 보내야 한다. 더 많은 정보는 [노션의 공식 API 페이지](https://developers.notion.com/reference/intro#pagination)를 참고하자. 다음과 같은 함수를 만들어주었다.  
  
```python
def get_jekyll_post_from_notion_page(page_id):
    """
    Write a Jekyll post Markdown file.
    
    Parameters:
    page_id (str): The ID of the Notion page.

    Outputs:
    page_fm (dict): The front matter of the page.
    page_md (list): The markdown content of the page.

    """
    # Get the title of the page
    page_fm = extract_frontmatter(page_id)


    # Get the markdown content of the page
    page_md = []

    response = notion.blocks.children.list(page_id)
    page_md.extend(extract_markdown(response))

    has_more = response['has_more']
    next_cursor = response['next_cursor']
    while has_more:
        if next_cursor:
            
            response = notion.blocks.children.list(page_id, start_cursor = next_cursor)
            page_md.extend(extract_markdown(response))
            has_more = response['has_more']
            next_cursor = response['next_cursor']
        else:
            break

    #page_md = extract_markdown(notion.blocks.children.list(page_id))

    return page_fm, page_md  
```
has_more와 next_cursor가 존재할 경우, 노션 페이지 내용을 더 받아오기 위해 추가적인 요청을 보내는 것이다.  
## 5. 최종  
지금까지 만든 함수를 이용해서 페이지를 만들면 다음과 같다.  
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
  
  
---
  
  
이상으로 파이썬과 Notion API를 이용해 노션 페이지를 Jekyll 포스트로 변환하는 법을 다루어보았다. 많은 하드코딩이 들어가 얼마나 많은 분들께 도움이 될지는 모르겠다만…  
  
이제 다음 글로는 이 과정에서 어떻게 ChatGPT를 이용하여 다양한 언어를 자동으로 지원하는지에 대해 다루어보겠다. 사실 이번 글에서 다루려 했는데, 이번 글의 분량이 너무 길어졌다… 쉴거야  
  

