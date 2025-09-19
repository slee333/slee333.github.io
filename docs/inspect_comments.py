import pathlib, re
path = pathlib.Path(r'C:\Users\seung\Documents\Code\blog\slee333.github.io\docs\assets\js\comments.js')
text = path.read_text(encoding='utf-8')
for match in re.finditer(r'(toggleProfileMenu|closeProfileMenu|openProfileMenu)', text):
    start = max(0, match.start()-160)
    end = min(len(text), match.end()+160)
    snippet = text[start:end]
    print('\n---\n' + snippet)
