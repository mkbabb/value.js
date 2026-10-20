# OD19-V3 P2 r2: summarise the A/B arms (picker input->paint, LoAF, profile).
import json, glob, os, sys
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ab")
out = {}
for arm in sorted(os.listdir(D)):
    p = os.path.join(D, arm)
    row = {}
    try:
        L = json.load(open(os.path.join(p, "latency-load.json")))
        for cell, v in L.items():
            s = v.get("v3_pickerSlider", {})
            row[cell] = {"picker": s.get("inputToPaint"), "loaf": s.get("loaf")}
    except Exception as e:
        row["latency_error"] = str(e)
    try:
        P = json.load(open(os.path.join(p, "v3-profile.json")))
        pick = lambda xs, k: [x for x in xs if k in x][:1]
        row["gpv_self"] = pick(P["self"], "getPropertyValue") or ["absent from top (<16ms)"]
        row["certify_incl"] = pick(P["inclDemo"], "certifyAccentInk @")
        row["ramp_incl"] = pick(P["inclDemo"], "resolvePalettesRamp")
        row["safeCss_incl"] = [x for x in P["inclDemo"] if "safeCss" in x]
    except Exception as e:
        row["profile_error"] = str(e)
    out[arm] = row
json.dump(out, open(os.path.join(os.path.dirname(D), "SUMMARY.json"), "w"), indent=1)
for arm, row in out.items():
    print("==", arm)
    for k, v in row.items(): print("  ", k, v)
