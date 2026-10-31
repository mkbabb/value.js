import json,sys,re
d=json.load(open(sys.argv[1]))
print(d['stats'])
def walk(s):
    for sp in s.get('specs',[]):
        for t in sp['tests']:
            for r in t['results']:
                msg=re.sub(r'\x1b\[[0-9;]*m','',(r.get('error') or {}).get('message',''))[:220].replace('\n',' ')
                out=' '.join(x.get('text','') for x in r.get('stdout',[]) if '[h1]' in x.get('text','') or '[e2b' in x.get('text',''))[:600]
                print(sp['file'].split('/')[-1],sp['line'],sp['title'][-40:],r['status'],msg,out.replace('\n',' '))
    for c in s.get('suites',[]): walk(c)
for s in d['suites']: walk(s)
