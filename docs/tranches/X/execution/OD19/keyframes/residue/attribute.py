"""OD19 residue (§0gp) — attribute a warm-swap commit task's CPU samples to
the package/module that owns them, using the unminified build's //#region
markers. Usage: python3 attribute.py <assets dir> <profile.cpuprofile>...
The commit task is the longest busy run (idle gaps < 3 ms). Each sample is
charged to the nearest frame (leaf upward) whose source region is not the
Vue/reka runtime; natives (style/layout reads, removeChild, getContext) are
charged to their caller's region with a ':native' tag."""
import json, os, re, sys
from collections import defaultdict

assets = sys.argv[1] if __name__ == "__main__" else os.environ.get("KF_ASSETS", "")
regions = {}


def region_of(url, line):
    f = url.split("/")[-1]
    if f not in regions:
        p = os.path.join(assets, f)
        marks = []
        if os.path.exists(p):
            for i, l in enumerate(open(p, encoding="utf-8", errors="replace"), 1):
                if l.startswith("//#region "):
                    marks.append((i, l[10:].strip()))
        regions[f] = marks
    r = f
    for i, name in regions[f]:
        if i <= line:
            r = name
        else:
            break
    r = re.sub(r"^node_modules/", "", r)
    r = re.sub(r"/dist/.*?([^/]+?)(-[\w-]{8})?\.js$", r"/\1", r)
    return r


RUNTIME = re.compile(r"^(@vue|vue|reka-ui|@vueuse|vendor-)")
for path in (sys.argv[2:] if __name__ == "__main__" else []):
    p = json.load(open(path))
    nodes = {n["id"]: n for n in p["nodes"]}
    parent = {c: n["id"] for n in p["nodes"] for c in n.get("children", [])}
    ts, t = [], p["startTime"]
    for d in p["timeDeltas"]:
        t += d
        ts.append(t)
    idle = lambda i: nodes[p["samples"][i]]["callFrame"]["functionName"] == "(idle)"
    best, cur, last = (0, 0), None, -1
    for i in range(len(ts)):
        if idle(i):
            continue
        if cur and ts[i] - ts[last] < 3000:
            cur[1] = i
        else:
            cur = [i, i]
        last = i
        if ts[cur[1]] - ts[cur[0]] > ts[best[1]] - ts[best[0]]:
            best = tuple(cur)
    tot = defaultdict(float)
    for i in range(best[0], best[1] + 1):
        dt = (p["timeDeltas"][i + 1] if i + 1 < len(p["timeDeltas"]) else 0) / 1000
        n = nodes[p["samples"][i]]
        cf = n["callFrame"]
        if cf["functionName"] in ("(idle)",):
            continue
        native = not cf["url"]
        tag = None
        a = n["id"]
        while a is not None:
            f = nodes[a]["callFrame"]
            if f["url"]:
                r = region_of(f["url"], f["lineNumber"] + 1)
                if not RUNTIME.match(r) and "vendor-reka" not in f["url"]:
                    tag = r
                    break
            a = parent.get(a)
        if tag is None:
            tag = "(vue runtime)" if not native else f"({cf['functionName'] or 'native'})"
        if native and cf["functionName"] not in ("(program)", "(garbage collector)"):
            tag += " :native"
        if cf["functionName"] in ("(program)", "(garbage collector)"):
            tag = cf["functionName"]
        tot[tag] += dt
    span = (ts[best[1]] - ts[best[0]]) / 1000
    print(f"== {os.path.basename(path)} busy {span:.1f} ms")
    for k, v in sorted(tot.items(), key=lambda kv: -kv[1])[:14]:
        print(f"   {v:6.1f}  {k}")
