# SERVED MODEL: claude-opus-5-5
# KF.W13V.c — tabulate the gate logs (read from the settled logs).
import json, glob, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs"))
for f in sorted(glob.glob("probe-*.json")):
    d = json.load(open(f))
    rows = d["rows"]
    one = sum(1 for r in rows if r["oneLine"] and r["dMid"] <= 2)
    print(f, "rows one-line(±2px) %d/%d" % (one, len(rows)), "maxdMid", max([r["dMid"] for r in rows] or [None]), "sepBeforeEasing", d["sepBeforeEasing"], "card.h", (d["card"] or {}).get("h"), "rail.h", (d["wrapper"] or {}).get("h"))
for f in sorted(glob.glob("rail-*.json")):
    d = json.load(open(f))
    print(f, "rail", d["wrapper"], "band", d["band"], "ball", d["ball"][0] if d["ball"] else None, "rail<band", d["wrapper"][1] <= d["band"][0])
