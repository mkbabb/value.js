import json,sys
d=json.load(open(sys.argv[1]))
for r in d:
  print(r['target'],'click',r['click'],'hash',r['hashMs'],'worst',r['worst'],'over50',r['over50'],'marks',r['marks'])
  for l in r['loaf']: print('   loaf@',l['start'],'dur',l['dur'],'block',l['block'],'render',l['render'],'style',l['style'],[ (s['inv'][:38],s['src'][-45:],s['dur'],s['fsl']) for s in l['scripts']])
