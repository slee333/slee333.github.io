import pathlib
text = pathlib.Path(r'C:\Users\seung\Documents\Code\blog\slee333.github.io\docs\assets\js\comments.js').read_text(encoding='utf-8')
keywords = ['function openProfileMenu', 'function closeProfileMenu', 'function toggleProfileMenu', 'const openProfileMenu', 'const closeProfileMenu', 'const toggleProfileMenu', 'let profileMenuOpen']
for keyword in keywords:
    idx = text.find(keyword)
    print(keyword, idx)
