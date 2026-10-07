# SERVED MODEL: claude-opus-5-5
# X.W12U.m — docSH vs innerHeight per route from probe-shell results; classifies each excess.
import json, sys
for f in sys.argv[1:]:
    d = json.load(open(f)); eq = []; over = []
    for r, v in d["routes"].items():
        if v["docSH"] <= v["ih"]: eq.append(r); continue
        content = max((x[1] + x[3]) for x in (v["stage"], v["inspector"]) if x) + 34  # lowest region bottom + bottom padding (inset-aware upper bound)
        over.append(f'{r} {v["docSH"]}/{v["ih"]} regions-end {content - 34}')
    print(f'{d["tag"]} {d["theme"]} equal {len(eq)}/{len(d["routes"])} | docSW {list(d["routes"].values())[0]["docSW"]} vw {d["W"]} | over: ' + "; ".join(over))
