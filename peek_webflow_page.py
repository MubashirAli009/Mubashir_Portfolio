import re
from pathlib import Path
s=Path('webflow_page.html').read_text(encoding='utf-8', errors='ignore')
print(s[:2000])
print('\n--- first section tags ---')
for m in re.finditer(r'<section[^>]*>', s, flags=re.I):
    print(m.group(0)[:200])
    if m.start()>0:
        break
