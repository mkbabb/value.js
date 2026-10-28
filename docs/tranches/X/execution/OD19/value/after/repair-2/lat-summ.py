import json,sys,glob
for f in sorted(glob.glob(sys.argv[1]+'/*/lat/latency-load.json')):
    d=json.load(open(f))
    for c,v in d.items():
        x=v.get('v3_pickerSlider') or {}; g=v.get('v3_gradientSlider') or {}
        print(f.split('/')[-3], c, 'picker', x.get('inputToPaint'), 'loaf', x.get('loaf'), '| gradient', (g.get('inputToPaint') or {}).get('p50'), (g.get('inputToPaint') or {}).get('p95'), v.get('v3_error',''))
        for s in (x.get('topScripts') or [])[:4]: print('    ', s)
