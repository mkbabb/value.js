# SERVED MODEL: claude-opus-5-5 — X.W11.o33: per-test ink-ratio readings + status from Playwright JSON reports.
# usage: python3 -I sum.py <report.json>...
import json, re, sys


def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp.get("tests", []):
            for r in t.get("results", []):
                ann = [a.get("description") for a in r.get("annotations", []) + t.get("annotations", []) if a.get("type") == "ink-ratio"]
                msg = ""
                for e in r.get("errors", []) or []:
                    m = re.search(r"Received:\s*\S*?([0-9.]+)", re.sub(r"\x1b\[[0-9;]*m", "", e.get("message", "")))
                    if m:
                        msg = m.group(1)
                out.append((t.get("projectName"), sp["title"], r.get("status"), ann[-1] if ann else msg))
    for c in s.get("suites", []):
        walk(c, out)


for f in sys.argv[1:]:
    d = json.load(open(f))
    rows = []
    for s in d.get("suites", []):
        walk(s, rows)
    st = d.get("stats", {})
    print(f"== {f.split('/')[-1]} expected {st.get('expected')} unexpected {st.get('unexpected')} skipped {st.get('skipped')}")
    for p, t, s, v in rows:
        print(f"  {p} | {t} | {s} | {v}")
