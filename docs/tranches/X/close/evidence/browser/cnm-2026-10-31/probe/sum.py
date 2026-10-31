# SERVED MODEL: claude-opus-5-5 — X.W11.cnm: print each cnm leg's status and reading from Playwright JSON reports.
import json, sys

def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                ann = [a["description"] for a in r.get("annotations", []) + t.get("annotations", []) if a.get("type") == "cnm-reading"]
                rd = json.loads(ann[0]) if ann else None
                out.append((sp["title"], t.get("projectName", ""), r["status"], rd))
    for c in s.get("suites", []):
        walk(c, out)

for path in sys.argv[1:]:
    rows = []
    for s in json.load(open(path))["suites"]:
        walk(s, rows)
    st = json.load(open(path)).get("stats", {})
    print(f"{path}: expected {st.get('expected')} unexpected {st.get('unexpected')} skipped {st.get('skipped')}")
    for title, proj, status, rd in rows:
        if rd:
            fr = " ".join(f"{f['worst']:.4f}/{f['painted']:.4f}(n{f['n']})" for f in rd["frames"])
            print(f"  [{proj}] {title}: {status} ink {rd['color']} -> {rd['ink']} worst {rd['worst']:.4f} frames worst/painted {fr}")
        else:
            print(f"  [{proj}] {title}: {status}")
