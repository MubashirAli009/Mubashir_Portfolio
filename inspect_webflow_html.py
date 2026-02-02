import re
from pathlib import Path
s=Path('webflow_page.html').read_text(encoding='utf-8', errors='ignore')

ids=sorted(set(re.findall(r'\sid="([^"]+)"', s)))
print('ID_COUNT', len(ids))
print('SOME_IDS', ids[:80])

# sections (id)
sec_ids=sorted(set(re.findall(r'<section[^>]*\sid="([^"]+)"', s, flags=re.I)))
print('SECTION_IDS', sec_ids)

# anchors
anchors=re.findall(r'<a\s+[^>]*>', s, flags=re.I)
print('A_TAGS', len(anchors))
interesting=[]
for a in anchors:
    m=re.search(r'href="([^"]+)"', a, flags=re.I)
    href=m.group(1) if m else ''
    if any(k in href for k in ['#','about','projects','skills','contact','experience','freelance']):
        interesting.append((href, a[:180]))
print('INTERESTING_A', len(interesting))
for href, snip in interesting[:60]:
    print(' -', href, '|', snip)

# look for click handlers / data attributes
for key in ['onclick','data-section','data-target','data-scroll','scrollIntoView']:
    print('HAS', key, key.lower() in s.lower())

# find any custom cursor element by searching for class contains "cursor" but NOT cursor-pointer
cursor_classes=set(re.findall(r'class="([^"]*cursor[^"]*)"', s, flags=re.I))
filtered=[c for c in cursor_classes if 'cursor-pointer' not in c]
print('CURSOR_CLASS_ATTRS_NON_POINTER', len(filtered))
for c in sorted(filtered)[:40]:
    print(' -', c)
