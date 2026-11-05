# Re-analyse kf unfurl samples: post-close monotonicity, stagger, release jump.
import json, sys, glob
for f in sorted(glob.glob(sys.argv[1] + '/samples-*.json')):
    s = json.load(open(f)); n = len(s[0]['f'])
    starts, opens, snaps, reclose = [], [], 0.0, False
    for i in range(n):
        closed = False; mx = 0; st = op_t = None
        for fr in s:
            sc, op, inl = fr['f'][i]
            if op < 0.05 and inl: closed = True
            if not closed: continue
            if st is None and op > 0.05: st = fr['t']
            if op_t is None and op > 0.98: op_t = fr['t']
            snaps = max(snaps, mx - op)
            if op_t is not None and (op < 0.5 or sc < 0.5): reclose = True
            mx = max(mx, op)
        starts.append(st); opens.append(op_t)
    # release: last inline frame -> first non-inline frame, per fill (scale, opacity) jump
    rel = None
    for k in range(1, len(s)):
        if any(x[2] for x in s[k-1]['f']) and not any(x[2] for x in s[k]['f']):
            rel = max(max(abs(a[0]-b[0]), abs(a[1]-b[1])) for a, b in zip(s[k-1]['f'], s[k]['f'])); rel_t = s[k]['t']
    ok = [x for x in starts if x is not None]
    print(f.split('/')[-1], 'frames', len(s), 'starts', ok, 'gaps', [round(b-a,1) for a,b in zip(ok, ok[1:])],
          'stagger', round(max(ok)-min(ok),1) if ok else 0, 'maxDrop', round(snaps,3), 'reclose', reclose, 'releaseJump', rel)
