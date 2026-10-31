# SERVED MODEL: claude-opus-5-5 — X.W11.n2 run summarizer (playwright json → one line per test)
import json,sys
for f in sys.argv[1:]:
    d=json.load(open(f))
    def walk(s):
        for sp in s.get('specs',[]):
            for t in sp['tests']:
                for r in t['results']:
                    txt=' '.join(o.get('text','') for o in r.get('stdout',[]))
                    if 'SS8-0363' in sp['title']:
                        print(f, sp['title'][-8:], r['status'], txt.strip()[:400])
                    elif 'N2-TOKENS' not in sp['title']:
                        print(f, sp['title'][:70], r['status'])
        for c in s.get('suites',[]): walk(c)
    for s in d['suites']: walk(s)
