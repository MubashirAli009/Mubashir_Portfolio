import re
from pathlib import Path

p = Path('webflow_page.html')
s = p.read_text(encoding='utf-8', errors='ignore')
print('SIZE', len(s))

scripts = re.findall(r'<script[^>]*src="([^"]+)"', s, flags=re.I)
links = re.findall(r'<link[^>]*href="([^"]+)"', s, flags=re.I)

print('SCRIPTS', len(scripts))
for u in scripts[:50]:
    print(' -', u)

print('LINKS', len(links))
for u in links[:50]:
    print(' -', u)

ids = set(re.findall(r'\sid="([^"]+)"', s))
core = sorted([x for x in ids if x.lower() in ['home','about','skills','projects','experience','contact','freelance']])
print('CORE_IDS', core)

low = s.lower()
for kw in ['cursor','mouse','pointer','hover','data-w-id','w-nav','w-dropdown','w-slider','w-background-video']:
    print('KW', kw, low.count(kw))
