import json,sys
def at(s,t):
    pts=[(x['t'],x['p'][1]) for x in s if x['p']]
    for (t0,y0),(t1,y1) in zip(pts,pts[1:]):
        if t0<=t<=t1: return y0+(y1-y0)*(t-t0)/max(1e-9,t1-t0)
    return pts[-1][1]
for arm in sys.argv[1:]:
    d=json.load(open(arm+'/probe.json'))
    for c in d['cells']:
        if c['pass']!='metrics' or c['w']!=390: continue
        for k,h in c['hops'].items():
            s=h['sample']
            pts=[(x['t'],x['p'][1]) for x in s if x['p']]
            t_start=next((t for (t,y),(t2,y2) in zip(pts,pts[1:]) if y2!=y),None)
            # the check's own read: picker shift between the 40 ms and 100 ms marks after motion starts
            m = round(abs(at(s,t_start+100)-at(s,t_start+40))) if t_start is not None else 0
            m0 = round(abs(at(s,t_start+40)-at(s,t_start))) if t_start is not None else 0
            print(arm,k,'travel',h['travel'],'first40ms',m0,'40to100ms',m,'firstMoveStep',h['firstMoveStep'],'maxStep',h['maxStep'])
