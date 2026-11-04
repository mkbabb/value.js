import json, sys, os
out = {}
for label in sys.argv[2:]:
    d = json.load(open(os.path.join(sys.argv[1], f'{label}.json')))
    L = out[label] = {'url': d['url'], 'when': d['when'], 'ua': d['ua'], 'cells': {}}
    for c in d['cells']:
        C = L['cells'][c['cell']] = {'viewport': c['viewport'], 'dpr': c['dpr'], 'idle': c.get('hz'), 'notes': c.get('notes'), 'error': c.get('error'), 'transitions': []}
        for t in c['transitions']:
            tr = t.get('trace', {})
            cnt = tr.get('counts', {})
            anims = sorted({f"{a['el']}{a['pseudo']} {a['kind']}:{a['name']} [{'+'.join(a['props'])}] {a['dur']}ms{'' if a['timeline']=='doc' else ' tl='+a['timeline']}" for a in t['animations']})
            ro = {k: v for k, v in t['resizeObserved'].items() if v['n'] > 0}
            mo = {k: v['n'] for k, v in t['attrMutations'].items()}
            C['transitions'].append({
                'name': t['transition'], 'how': t['action'].get('how'), 'windowMs': t['windowMs'], 'rafFrames': t['rafFrames'], 'expected60': t['expectedFramesAt60'],
                'rafDeltaMs': t['rafDeltaMs'], 'dropped60': t['droppedFramesAt60'],
                'loaf': [(l['startRel'], l['dur'], l['styleLayoutMs'], [s['src'] + ' ' + str(s['dur']) + 'ms' for s in l['scripts']]) for l in t['longAnimationFrames']],
                'longTasks': t['longTasks'],
                'trace': {k: cnt.get(k, 0) for k in ['FireAnimationFrame', 'UpdateLayoutTree', 'Layout', 'PrePaint', 'Paint', 'Layerize', 'Commit']},
                'traceMs': {k: tr.get('durMs', {}).get(k, 0) for k in ['FunctionCall', 'UpdateLayoutTree', 'Layout', 'PrePaint', 'Paint', 'Commit']},
                'perRafFrame': tr.get('perRafFrame'), 'styleElementsRecalculated': tr.get('styleElementsRecalculated'), 'layoutRoots': tr.get('layoutRoots'),
                'frameStates': tr.get('frameStates'), 'raster': {k: v for k, v in cnt.items() if 'Raster' in k or 'Compositor' in k},
                'animations': anims, 'resized': ro, 'attrMutations': mo, 'traceFile': tr.get('file'), 'traceBytes': tr.get('fileBytes'),
            })
print(json.dumps(out, indent=1))
