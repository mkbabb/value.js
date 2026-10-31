# Self time (ms) of every frame under a named function, per raw .cpuprofile.
# Usage: python3 inside.py <dir> fn
import json, sys, glob, os, collections
d, name = sys.argv[1], sys.argv[2]
for f in sorted(glob.glob(os.path.join(d, "*.cpuprofile"))):
    p = json.load(open(f)); by = {n["id"]: n for n in p["nodes"]}; par = {}
    for n in p["nodes"]:
        for c in n.get("children", []): par[c] = n["id"]
    agg = collections.Counter(); tot = 0
    for i, s in enumerate(p["samples"]):
        dt = (p["timeDeltas"][i + 1] if i + 1 < len(p["timeDeltas"]) else 0) / 1000
        a = s; under = False
        while a is not None:
            if by[a]["callFrame"]["functionName"] == name: under = True; break
            a = par.get(a)
        if under:
            cf = by[s]["callFrame"]; agg[f'{cf["functionName"] or "(anon)"}:{cf["lineNumber"]+1}'] += dt; tot += dt
    if tot: print("==", os.path.basename(f), round(tot, 1), [(k, round(v, 1)) for k, v in agg.most_common(6)])
