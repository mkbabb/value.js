# SERVED MODEL: claude-opus-5-5
# X.W12U.s3 — the rebuilt X-W12S supplement disposition table: s1.tsv + s2.tsv + s3.tsv, one row per
# supplement row of W12-evidence/u/disposition-full.tsv (bucket ∋ supplement; 495 rows). Refuses to write
# on any drop, duplicate, stray or empty disposition. Output: disposition.tsv.
import csv, pathlib, sys
here = pathlib.Path(__file__).resolve().parent
root = here.parents[5]
full = root / "docs/tranches/X/waves/W12-evidence/u/disposition-full.tsv"
want = []
for line in full.read_text().splitlines():
    if line.startswith("#") or not line.strip():
        continue
    f = line.split("\t")
    if len(f) >= 6 and "supplement" in f[4]:
        want.append(f[0])
got = []
for sl in ("s1", "s2", "s3"):
    for line in (here / f"{sl}.tsv").read_text().splitlines():
        if line.startswith("#") or line.startswith("id\t"):
            continue
        f = line.split("\t")
        if len(f) != 7 or not f[4].strip():
            sys.exit(f"{sl}: malformed or empty row {f[:1]}")
        got.append([sl] + f)
ids = [r[1] for r in got]
dups = sorted({i for i in ids if ids.count(i) > 1})
drops = sorted(set(want) - set(ids))
strays = sorted(set(ids) - set(want))
if dups or drops or strays or len(want) != len(set(want)):
    sys.exit(f"dups={dups} drops={drops} strays={strays}")
order = {rid: i for i, rid in enumerate(want)}
got.sort(key=lambda r: order[r[1]])
with open(here / "disposition.tsv", "w", newline="") as fh:
    fh.write(f"# SERVED MODEL: claude-opus-5-5 — X.W12U.s the rebuilt X-W12S supplement disposition ({len(want)} rows in → {len(got)} out; s1 + s2 + s3). Built by build-disposition.py.\n")
    w = csv.writer(fh, delimiter="\t", lineterminator="\n")
    w.writerow(["slice", "id", "sev", "page", "owner", "disposition", "evidence_or_route", "title"])
    w.writerows(got)
print(len(want), len(got), len(dups), len(drops), len(strays))
