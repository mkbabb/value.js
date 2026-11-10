import json,sys,collections
tr=json.load(open(sys.argv[1]))['traceEvents']
names={(e['pid'],e['tid']):e['args']['name'] for e in tr if e.get('ph')=='M' and e.get('name')=='thread_name'}
X=[e for e in tr if e.get('ph')=='X' and 'dur' in e]
th=lambda e: names.get((e['pid'],e['tid']),'?')
fire=sorted([e for e in X if th(e)=='CrRendererMain' and e['name']=='FireAnimationFrame'],key=lambda e:e['ts'])
draws=sorted([e for e in X if th(e)=='VizCompositorThread' and e['name']=='Display::DrawAndSwap'],key=lambda e:e['ts'])
bmf=sorted([e for e in X if th(e)=='CrRendererMain' and e['name']=='ProxyMain::BeginMainFrame'],key=lambda e:e['ts'])
t0=fire[0]['ts']
import statistics
dd=[d['dur']/1000 for d in draws]
print('draws',len(dd),'p50 %.1f p95 %.1f max %.1f'%(statistics.median(dd),sorted(dd)[int(.95*len(dd))],max(dd)))
bb=[d['dur']/1000 for d in bmf]
print('BMF',len(bb),'p50 %.1f p95 %.1f max %.1f'%(statistics.median(bb),sorted(bb)[int(.95*len(bb))],max(bb)))
for i in range(1,len(fire)):
    g=(fire[i]['ts']-fire[i-1]['ts'])/1000
    if g>20:
        a,b=fire[i-1]['ts'],fire[i]['ts']
        ds=[(round((d['ts']-t0)/1000),round(d['dur']/1000,1)) for d in draws if a-20000<=d['ts']<=b]
        ms=[(round((d['ts']-t0)/1000),round(d['dur']/1000,1)) for d in bmf if a-20000<=d['ts']<=b]
        other=collections.Counter()
        for e in X:
            if th(e)=='CrRendererMain' and e['name']=='RunTask' and a<=e['ts']<=b: other['tasks']+=1; other['ms']+=e['dur']/1000
        print('gap %.1f @%.0f draws'%(g,(a-t0)/1000),ds,'bmf',ms,dict(other))
