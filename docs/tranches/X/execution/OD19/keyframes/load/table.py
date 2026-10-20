# Usage: python3 table.py before.json after1.json after2.json -> markdown rows
import json, sys
b, a1, a2 = (json.load(open(p)) for p in sys.argv[1:4])
def c(d, r, k):
    v = d["cold"].get(r, {}).get(k); return "err" if v is None else str(v)
print("| cold route | content ms (before → run1 / run2) | JS KB before content | long tasks before content (count / total ms) | Aurora fetched |")
print("|---|---|---|---|---|")
for r in b["cold"]:
    print(f"| {r} | {c(b,r,'ready')} → **{c(a1,r,'ready')} / {c(a2,r,'ready')}** | {c(b,r,'jsKBtoReady')} → **{c(a1,r,'jsKBtoReady')} / {c(a2,r,'jsKBtoReady')}** | {c(b,r,'longTasks')}/{c(b,r,'longMs')} → **{c(a1,r,'longTasks')}/{c(a1,r,'longMs')} / {c(a2,r,'longTasks')}/{c(a2,r,'longMs')}** | {c(b,r,'aurora')} → {c(a1,r,'aurora')} / {c(a2,r,'aurora')} |")
print()
print("| warm swap | total ms (before → run1 / run2) | commit ms | worst frame ms | frames > 50 ms | new KB fetched |")
print("|---|---|---|---|---|---|")
def w(d, k, f):
    v = d["warm"].get(k, {}); v = v.get(f) if isinstance(v, dict) else None; return "–" if v is None else str(v)
for k in b["warm"]:
    if k == "error": continue
    row = [f"{w(b,k,f)} → **{w(a1,k,f)} / {w(a2,k,f)}**" for f in ("total", "commit", "maxFrame", "over50", "newKB")]
    print(f"| {k} | " + " | ".join(row) + " |")
print()
print("| editor surface (dock menu pick) | click → content ms | worst frame ms | long tasks |")
print("|---|---|---|---|")
for k in b["surf"]:
    g = lambda d, f: str(d["surf"].get(k, {}).get(f, "err"))
    print(f"| {k} | {g(b,'toContent')} → **{g(a1,'toContent')} / {g(a2,'toContent')}** | {g(b,'maxFrame')} → **{g(a1,'maxFrame')} / {g(a2,'maxFrame')}** | {g(b,'longTasks')} → **{g(a1,'longTasks')} / {g(a2,'longTasks')}** |")
