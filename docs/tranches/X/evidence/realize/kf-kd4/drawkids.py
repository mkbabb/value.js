import json,sys,collections
tr=json.load(open(sys.argv[1]))['traceEvents']
names={(e['pid'],e['tid']):e['args']['name'] for e in tr if e.get('ph')=='M' and e.get('name')=='thread_name'}
V=[e for e in tr if e.get('ph')=='X' and 'dur' in e and names.get((e['pid'],e['tid']))=='VizCompositorThread']
draws=sorted([e for e in V if e['name']=='Display::DrawAndSwap'],key=lambda e:e['ts'])
def kids(d):
    c=collections.Counter();n=collections.Counter()
    for e in V:
        if e is not d and d['ts']<=e['ts'] and e['ts']+e['dur']<=d['ts']+d['dur']: c[e['name']]+=e['dur']/1000; n[e['name']]+=1
    return c,n
long=sorted(draws,key=lambda e:-e['dur'])[:3]; short=sorted(draws,key=lambda e:e['dur'])[len(draws)//2:len(draws)//2+2]
for lab,grp in (('LONG',long),('MEDIAN',short)):
    for d in grp:
        c,n=kids(d); print(lab,round(d['dur']/1000,1),[(k,round(v,1),n[k]) for k,v in c.most_common(14)])
# all names seen
print(sorted(set(e['name'] for e in V))[:80])
