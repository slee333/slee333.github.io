# Obsidian으로 블로그 쓰기

Obsidian에서 이 폴더(`slee333.github.io`)를 보관함으로 여세요. 기존 Notion 도구도 그대로 사용할 수 있습니다. 같은 글의 기준 원고는 Markdown과 Notion 중 하나로 정하세요.

## 평소에 하는 일

1. Obsidian에서 새 노트(`Ctrl+N`)를 만듭니다. `docs/_drafts`에 저장됩니다.
2. 제목을 정하고 명령 팔레트(`Ctrl+P`)에서 **Templates: Insert template** → **블로그 글**을 선택합니다. `title`과 `categories`를 확인하세요. 카테고리는 `life`, `learning`, `research`, `cifellowship`입니다.
3. 본문을 쓰고 이미지를 붙여넣거나 드래그하세요. 일반 Markdown 이미지 링크가 자동으로 생기며 원본은 `docs/_media/originals`에 저장됩니다.
4. 이 폴더의 **미리보기.cmd**를 실행하고 `http://127.0.0.1:4002/?nolang=1`을 여세요. 새 이미지 최적화와 Jekyll 빌드를 자동으로 수행합니다. 노트를 저장하면 다시 빌드하며, 브라우저에서 새로고침하면 됩니다. 종료는 `Ctrl+C` 또는 창 닫기입니다.

미리보기에는 초안과 미래 날짜 글도 보입니다. 공개 사이트에는 아직 반영되지 않습니다.

빈 노트나 템플릿을 넣지 않은 초안은 미리보기 전에 제목·카테고리를 채워 주세요. 제목에 따옴표를 썼다면 Obsidian 속성 화면에서 title을 편집하면 YAML을 안전하게 저장할 수 있습니다.

## 발행 준비

글을 다 썼으면 이 프로젝트에서 다음처럼 요청할 수 있습니다.

> 이 초안을 발행 준비하고 미리보기를 보여줘: docs/_drafts/노트 이름.md

직접 실행하려면 프로젝트 폴더에서:

```powershell
python -B docs/blog.py ready "_drafts/노트 이름.md"
python -B docs/blog.py build
```

`ready`는 초안을 `_posts/언어/카테고리/날짜-이름.md`로 옮기고 이미지 상대경로를 맞춥니다. 이동 전 원고는 `.blog-workflow/obsidian-backups`에 보관됩니다. 이미 있는 발행 파일은 덮어쓰지 않습니다. **Git 커밋·푸시·배포는 하지 않습니다.** 공개할 때는 의도한 글과 `assets/images/posts/`의 필요한 이미지만 선택해 커밋·푸시하고 GitHub Pages 결과를 확인하세요. 현재 쌓인 다른 변경을 한꺼번에 포함하지 마세요.

## 이미지 처리

- JPEG 사진: 방향을 바로잡고 긴 변을 최대 1600px로 줄여 AVIF로 저장합니다. 인코딩 품질은 60입니다.
- PNG 스크린샷·투명 이미지: 해상도를 유지하고 무손실 WebP로 저장합니다. 더 커지면 PNG를 유지합니다. PNG 사진도 문자·투명도 보존을 우선하므로 무손실 처리합니다. 사진 최적화를 원하면 원본 JPEG를 드래그하세요.
- 이미 AVIF/WebP인 파일, GIF와 애니메이션: 다시 압축하지 않고 보존합니다. SVG는 벡터로 유지합니다.
- 최적화한 이미지는 `docs/assets/images/posts/`에 저장하고 본문 링크를 바꿉니다. 같은 원본과 처리 설정은 재사용하며, 최적화된 파일을 반복 압축하지 않습니다.
- 원본 파일과 원고 변경 전 백업은 지우지 않습니다. 원본·캐시는 Git과 사이트 빌드에서 제외됩니다. **원본은 이 PC에만 남으므로 별도로 백업해야 다른 PC에서도 다시 변환할 수 있습니다.** 최적화된 발행 이미지와 Markdown은 Git으로 보관합니다.

이미지를 로컬에서 볼 수 있도록 글에서는 일반 상대경로를 유지합니다. 미리보기 사본에서는 사이트 이미지 주소로 변환합니다. `ready`는 실제 게시글 주소에서도 링크가 맞는지 확인합니다. 현재 사이트의 `baseurl`은 비어 있습니다. 주소 구조를 바꾸면 `ready`의 경로 검증이 먼저 중단합니다.

기존 Cloudinary·Imgur 등 외부 이미지와 Notion에서 가져온 기존 글은 일괄 변경하지 않습니다. 커뮤니티 플러그인, 계정, 동기화 서비스는 필요하지 않습니다. 기존 Obsidian의 동기화·보안 설정은 변경하지 않았습니다.

## 추가 명령

```powershell
# 제목과 영문 파일 이름을 지정해 새 초안 생성
python -B docs/blog.py new first-month --title "첫 달의 기록" --category life

# 서버를 띄우지 않고 초안 포함 빌드만 확인
python -B docs/blog.py preview --no-serve
```

`new_blog_workflow.py`는 기존 Notion 가져오기용이며, 사용법은 `docs/WRITING.md`에 있습니다. Obsidian 워크플로는 `blog.py`를 사용합니다.
