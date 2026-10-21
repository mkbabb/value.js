# OD19 repair 1 — one line per hop from r1-hop-trace.mjs JSONL: frames > 34 ms and worst frame, go and back, plus the mount task.
import json, sys
for p in sys.argv[1:]:
    for l in open(p):
        try: r = json.loads(l)
        except Exception: continue
        mt = max([f['d'] for f in r['go']['loaf'] if any('setTimeout' in (s[3] or '') for s in f['s'])] or [0])
        print(p.split('/')[-1], r['W'], r['SCHEME'], (r.get('renderer') or '')[:28], 'go over34', r['go']['over34'], 'worst', r['go']['worst'], 'mountFrame', mt, '| back over34', r['back']['over34'], 'worst', r['back']['worst'])
