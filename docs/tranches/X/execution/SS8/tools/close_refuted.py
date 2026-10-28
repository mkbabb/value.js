"""SS-8 CLOSE: for every REFUTED verdict row (residue batches), find its disposition line in the
packet's '## cures' section (match by the 4-digit SS8 ordinal). Read-only; prints JSON."""
import json, re, pathlib, subprocess, sys
here = pathlib.Path(__file__).resolve().parent
tally = json.loads(subprocess.check_output([sys.executable, "-I", str(here / "close_tally.py")]))
P = here.parent / "packets"
out = {}
for stem, d in tally.items():
    txt = (P / f"{stem}.md").read_text().splitlines()
    i = next(k for k, l in enumerate(txt) if re.match(r"^## [Cc]ures", l))
    cures = txt[i:]
    rows = []
    for r in d["rows"]:
        if r["status"] != "REFUTED": continue
        m = re.search(r"(\d{4})", r["id"])
        z = re.search(r"(Z-[A-Za-z]+(?:-[A-Za-z]+)*-\d+w?)", r["id"])
        pat = re.compile(re.escape(m.group(1)) if m else (re.escape(z.group(1)) + r"(?![\dw])" if z else re.escape(r["id"])))
        hits = [l for l in cures if pat.search(l)]
        src = "cures"
        if not hits:
            # fall back to the packet's REFUTED owner/root-cure index (between the verdict table and cures)
            j = next((k for k, l in enumerate(txt[:i]) if re.match(r"^#{2,4} .*REFUTED", l, re.I)), None)
            hits = [l for l in txt[j:i] if pat.search(l)] if j is not None else []
            src = "refuted-index"
        rows.append({"id": r["id"], "src": src if hits else "none", "hit": (hits[0] if hits else "")[:400]})
    out[stem] = rows
json.dump(out, sys.stdout, indent=1)
