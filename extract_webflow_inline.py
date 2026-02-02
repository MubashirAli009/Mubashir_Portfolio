import re
from pathlib import Path

s = Path('webflow_page.html').read_text(encoding='utf-8', errors='ignore')

# inline scripts
inline = re.findall(r'<script[^>]*>([\s\S]*?)</script>', s, flags=re.I)
print('INLINE_SCRIPTS', len(inline))
for i, body in enumerate(inline[:10], 1):
    b = body.strip()
    print('\n--- script', i, 'len', len(b), '---')
    print(b[:600].replace('\n','\\n'))

# extract possible cursor-related class names
for kw in ['cursor', 'cursor-wrapper', 'cursor-dot', 'cursor-circle', 'cursor__']:
    print('KW', kw, 'present', kw in s.lower())

# extract a few class attributes containing cursor
classes = re.findall(r'class="([^"]*cursor[^"]*)"', s, flags=re.I)
print('CURSOR_CLASS_ATTRS', len(classes))
for c in sorted(set(classes))[:30]:
    print(' -', c)
