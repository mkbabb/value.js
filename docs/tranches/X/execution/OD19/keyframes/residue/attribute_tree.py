"""Charge each commit-task sample to the chain of consumer .vue regions on its
stack (root side first, depth K) — names which subtree's mount the cost is.
Usage: python3 attribute_tree.py <assets> <K> <profile>..."""
import json, os, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(__file__))
from attribute import region_of  # noqa: E402  (reuses the //#region map)
import attribute
attribute.assets = sys.argv[1]
K = int(sys.argv[2])
for path in sys.argv[3:]:
    p = json.load(open(path))
    nodes = {n["id"]: n for n in p["nodes"]}
    parent = {c: n["id"] for n in p["nodes"] for c in n.get("children", [])}
    ts, t = [], p["startTime"]
    for d in p["timeDeltas"]:
        t += d; ts.append(t)
    idle = lambda i: nodes[p["samples"][i]]["callFrame"]["functionName"] == "(idle)"
    best, cur, last = (0, 0), None, -1
    for i in range(len(ts)):
        if idle(i): continue
        if cur and ts[i] - ts[last] < 3000: cur[1] = i
        else: cur = [i, i]
        last = i
        if ts[cur[1]] - ts[cur[0]] > ts[best[1]] - ts[best[0]]: best = tuple(cur)
    tot = defaultdict(float)
    for i in range(best[0], best[1] + 1):
        dt = (p["timeDeltas"][i + 1] if i + 1 < len(p["timeDeltas"]) else 0) / 1000
        n = nodes[p["samples"][i]]
        if n["callFrame"]["functionName"] == "(idle)": continue
        chain, a = [], n["id"]
        while a is not None:
            f = nodes[a]["callFrame"]
            if f["url"]:
                r = attribute.region_of(f["url"], f["lineNumber"] + 1)
                if (r.endswith(".vue") or (os.environ.get("GLASS") and "glass-ui" in r)) and (not chain or chain[-1] != r): chain.append(r)
            a = parent.get(a)
        chain = [c.split("/")[-1] for c in reversed(chain)]
        tot[" > ".join(chain[:K]) or n["callFrame"]["functionName"]] += dt
    print(f"== {os.path.basename(path)} busy {(ts[best[1]]-ts[best[0]])/1000:.1f}")
    for k, v in sorted(tot.items(), key=lambda kv: -kv[1])[:12]: print(f"   {v:6.1f}  {k}")
