import json,sys
for r in json.load(open(sys.argv[1])):
    for st in ('visible','dismissed'):
        v=r.get(st) or {}
        print(r['vp'],r['theme'][0],st[:3],'ov',v.get('overlaps'),'clip',v.get('clipped'),'tl',v.get('titleLines'),'ml',v.get('metaLines'),'stH',v.get('stageH'),'crd',(v.get('boxes',{}).get('card') or {}).get('h'),'uDock',v.get('plateUnderDock'),'uSheet',v.get('footerUnderSheet'),'tglW',(v.get('boxes',{}).get('toggle') or {}).get('w'),'art',(v.get('boxes',{}).get('artifact') or {}).get('h'),'slot',v.get('slotMarks'),'rad',v.get('radii'),'skin',v.get('toggleSkin'),'meta',len(v.get('metaStrings') or []),'tv',v.get('transportVerbs'),r.get('err',''))
    if r.get('exit'): print('  exit',r['exit']); print('  entry',r['entry'])
