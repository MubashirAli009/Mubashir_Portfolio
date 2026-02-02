import re
from pathlib import Path

s = Path('webflow_page.html').read_text(encoding='utf-8', errors='ignore')

# extract asset urls
urls = set()
for pat in [r'src="([^"]+)"', r'href="([^"]+)"', r'url\(([^)]+)\)']:
    for u in re.findall(pat, s, flags=re.I):
        u = u.strip().strip('"\'')
        if u and not u.startswith('#') and not u.startswith('javascript:'):
            urls.add(u)

# keep interesting remote urls
remote = sorted([u for u in urls if u.startswith('http')])
print('REMOTE_URLS', len(remote))
for u in remote[:80]:
    print(' -', u)

# css link(s)
css = [u for u in remote if u.endswith('.css')]
print('\nREMOTE_CSS', len(css))
for u in css:
    print(' -', u)

# check if custom cursor (cursor:none)
print('\nHAS_CURSOR_NONE', 'cursor:none' in s.lower() or 'cursor: none' in s.lower())

# extract nav markup quickly
m = re.search(r'(<nav[\s\S]{0,200000}?</nav>)', s, flags=re.I)
print('\nNAV_FOUND', bool(m))
if m:
    nav = m.group(1)
    print('NAV_LEN', len(nav))
    print(nav[:1200].replace('\n',' '))

# find any element with id="cursor" etc
for kw in ['cursor', 'pointer', 'gradient']:
    mm = re.search(r'(<[^>]*%s[^>]*>)'%kw, s, flags=re.I)
    if mm:
        print('TAG_WITH', kw, mm.group(1)[:200])
