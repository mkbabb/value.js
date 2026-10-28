"""SS-8 CLOSE: re-count every packet's verdict rows (PROVEN/REFUTED/UNPROVEN) from the packet
tables, stopping at the packet's cures section. Read-only over packets; prints JSON."""
import json, re, sys, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "packets"
V = re.compile(r"\*\*(PROVEN|REFUTED|UNPROVEN)\b")
out = {}
for f in sorted(P.glob("*.md")):
    rows, stop = [], False
    for ln in f.read_text().splitlines():
        if re.match(r"^#{1,4} .*\b(cure|Cure|CURE)", ln):
            stop = True
        if stop or not ln.startswith("| ") or ln.startswith("|---"):
            continue
        cells = [c.strip() for c in ln.strip().strip("|").split("|")]
        st = None
        for i, c in enumerate(cells[1:], 1):
            m = V.match(c)
            if m:
                st = m.group(1); break
        if st:
            rows.append({"id": cells[0], "status": st, "verdict": cells[i], "reason": " | ".join(cells[i+1:])})
    c = {s: sum(r["status"] == s for r in rows) for s in ("PROVEN", "REFUTED", "UNPROVEN")}
    out[f.stem] = {"counts": c, "rows": rows}
if "--counts" in sys.argv:
    for k, v in out.items(): print(k, v["counts"], sum(v["counts"].values()))
else:
    json.dump(out, sys.stdout, indent=1)
