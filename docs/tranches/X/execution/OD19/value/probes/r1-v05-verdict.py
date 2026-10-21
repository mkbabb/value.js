# OD19 repair 1 (C1-V-05) falsifier over the GPU witness (ANGLE-Metal headless shell, r1-hop-trace.mjs):
# the incoming pane's mount frame (the long frame whose script is the out-in leave timer) is <= 70 ms on every
# Home -> Gradient hop, in every cell. usage: python3 r1-v05-verdict.py <arm dir>
import glob, json, sys
BAR = 70
rows = []
for p in sorted(glob.glob(sys.argv[1] + "/hop-gpu-*.jsonl")):
    for l in open(p):
        try: r = json.loads(l)
        except Exception: continue
        mt = max([f['d'] for f in r['go']['loaf'] if any('setTimeout' in (s[3] or '') for s in f['s'])] or [0])
        rows.append((p.split('/')[-1], mt, r['go']['worst']))
for x in rows: print(*x)
ok = rows and all(mt <= BAR for _, mt, _ in rows)
print("VERDICT", "GREEN" if ok else "RED", f"mountFrame max {max(r[1] for r in rows) if rows else None} (bar {BAR})")
