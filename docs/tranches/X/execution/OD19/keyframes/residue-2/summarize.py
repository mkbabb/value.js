# Per-swap commit and worst-frame readings across runs: python3 summarize.py tagA tagB
import json, sys, statistics as st
for tag in sys.argv[1:]:
    rows = {}
    for i in (1, 2):
        for r in json.load(open(f"{tag}-gpu-{i}.json"))["rows"]:
            rows.setdefault(r["swap"], []).append((r["commit"], r["maxFrame"], r["over50"]))
    print(f"== {tag}")
    for k, v in rows.items():
        c = [x[0] for x in v]; m = [x[1] for x in v]
        print(f"  {k:17} commit {min(c)}-{max(c)} (med {st.median(c)})  worst {'/'.join(map(str, m))} (med {st.median(m)})  over50 {sum(x[2] for x in v)}")
