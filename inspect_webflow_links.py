import re
from pathlib import Path
s=Path('webflow_page.html').read_text(encoding='utf-8', errors='ignore')

anchors=re.findall(r'<a\s+[^>]*>', s, flags=re.I)
print('A_TAGS', len(anchors))

# detect href with single or double
interesting=[]
for a in anchors:
    m=re.search(r'href\s*=\s*("([^"]*)"|\'([^\']*)\')', a, flags=re.I)
    href=(m.group(2) or m.group(3)) if m else ''
    if href:
        interesting.append(href)

print('HREFS', len(interesting))
for h in interesting:
    print(' -', h)

for key in ['onclick','onClick','data-section','data-target','data-scroll','scrollIntoView']:
    print('COUNT', key, len(re.findall(key, s, flags=re.I)))

# search for "nav" occurrences
print('NAV_OCCURRENCES', len(re.findall(r'<nav', s, flags=re.I)))
# find first occurrence around "nav" keyword
idx=s.lower().find('nav')
print('FIRST_NAV_IDX', idx)
print(s[idx-200:idx+400] if idx!=-1 else '')
