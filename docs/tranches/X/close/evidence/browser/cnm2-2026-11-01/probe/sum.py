# SERVED MODEL: claude-opus-5-5 — X.W11.cnm2: each o18 leg's status, the real-ground component-name reading, and the cell's renderer, from Playwright JSON reports.
import json, sys

def walk(s, out, path=()):
    here = path + ((s.get("title", ""),) if s.get("title") else ())
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                anns = r.get("annotations", []) + t.get("annotations", [])
                rd = [json.loads(a["description"]) for a in anns if a.get("type") == "o18-component-name-real-ground"]
                other = [a for a in anns if a.get("type") not in ("o18-component-name-real-ground",)]
                err = (r.get("error") or {}).get("message", "").splitlines()[:1]
                out.append((" > ".join(here[1:] + (sp["title"],)), t.get("projectName", ""), r["status"], rd[0] if rd else None, r.get("stdout", []), err))
    for c in s.get("suites", []):
        walk(c, out, here)

for path in sys.argv[1:]:
    doc = json.load(open(path))
    rows = []
    for s in doc["suites"]:
        walk(s, rows)
    st = doc.get("stats", {})
    version = doc.get("config", {}).get("version", "?")
    print(f"{path.split('/')[-1]}: expected {st.get('expected')} unexpected {st.get('unexpected')} skipped {st.get('skipped')} flaky {st.get('flaky')}")
    for title, proj, status, rd, stdout, err in rows:
        if rd:
            print(f"  [{proj}] {rd['scheme']} {rd['motion']}: {status} ink {rd['color']} -> {rd['ink']} worst {rd['worst']:.4f}")
        elif "renderer" in title:
            print(f"  [{proj}] {title}: {status} {' '.join(x.get('text', '').strip() for x in stdout)} browser {version}")
        elif status not in ("passed", "expected"):
            print(f"  [{proj}] {title[:140]}: {status} {err}")
