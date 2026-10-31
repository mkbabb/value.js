# Print the caller chains (ms) of named functions across raw .cpuprofile files.
# Usage: python3 stacks.py <dir> fn1,fn2 [depth]
import json, sys, glob, os, collections
d, names, depth = sys.argv[1], sys.argv[2].split(","), int(sys.argv[3]) if len(sys.argv) > 3 else 8
for f in sorted(glob.glob(os.path.join(d, "*.cpuprofile"))):
    p = json.load(open(f)); by = {n["id"]: n for n in p["nodes"]}; par = {}
    for n in p["nodes"]:
        for c in n.get("children", []): par[c] = n["id"]
    agg = collections.Counter()
    for i, s in enumerate(p["samples"]):
        dt = (p["timeDeltas"][i + 1] if i + 1 < len(p["timeDeltas"]) else 0) / 1000
        chain, hit, a = [], None, s
        while a is not None:
            cf = by[a]["callFrame"]
            if hit is None and cf["functionName"] in names: hit = cf["functionName"]
            if hit is not None: chain.append(f'{cf["functionName"] or "(anon)"}:{cf["lineNumber"]+1}@{cf["url"].split("/")[-1][:18]}')
            if len(chain) >= depth: break
            a = par.get(a)
        if hit: agg[" <- ".join(chain)] += dt
    if agg:
        print("==", os.path.basename(f))
        for k, v in agg.most_common(4): print(f"  {v:5.1f}  {k}")
