# SERVED MODEL: claude-opus-5-5
# KF.W13R.v — reads the re-captured rt-log.json / seek-meta.json for KFA-8/50/51/52/53/109/110/111 at glass 10.0.1.
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))
L = json.load(open(f"{D}/rt-log.json")); log = [e for e in L["log"] if "mark" not in e]; marks = {e["mark"]: e["t"] for e in L["log"] if "mark" in e}
def win(a, b): return [e for e in log if marks[a] <= e["t"] < marks[b]]
def blur(f):
    m = re.search(r"blur\(([\d.]+)px\)", f or ""); return float(m.group(1)) if m else 0.0
out = {}
for c in (1, 2):
    ex = win(f"hover-in-{c}", f"hover-out-{c}"); co = [e for e in log if e["t"] >= marks[f"hover-out-{c}"] and (c == 2 or e["t"] < marks["hover-in-2"])]
    exm = [e for e in ex if e["morph"]]; com = [e for e in co if e["morph"]]
    rest_ex = ex[-1]; rest_co = co[-1]
    # KFA-8 / 51: plate width during expand vs settled width; max height during expand vs rest height
    out[f"expand{c}"] = {"morphFrames": len(exm), "epx_first": exm[0]["epx"] if exm else None, "w_first_morph": exm[0]["w"] if exm else None,
        "w_settle": rest_ex["w"], "h_settle": rest_ex["h"], "maxH_morph": max((e["h"] for e in exm), default=None),
        "frames_h_gt_settle+2": sum(1 for e in ex if e["h"] > rest_ex["h"] + 2),
        # KFA-53: blur during/after settle
        "maxBlur_morph": max((blur(e["filter"]) for e in exm), default=0), "blur_frames_after_morph": sum(1 for e in ex if not e["morph"] and blur(e["filter"]) > 0),
        # KFA-52: min child opacity during morph (stagger visible if < 0.5)
        "minKidOpacity_morph": min((k[0] for e in exm for k in e["kids"] if k[4] != "none"), default=None),
        "maxCSSTransitions_frame": max((sum(1 for a in e["anims"] if a.startswith("CSSTransition")) for e in exm), default=0),
        # KFA-111: radius
        "radii_morph": sorted({e["radius"] for e in exm})[:6], "mt_max": max((float(e["mt"]) for e in exm if e["mt"]), default=None)}
    out[f"collapse{c}"] = {"morphFrames": len(com), "maxBlur_morph": max((blur(e["filter"]) for e in com), default=0),
        "blur_frames_after_morph": sum(1 for e in co if not e["morph"] and blur(e["filter"]) > 0),
        "maxBlur_tail30": max((blur(e["filter"]) for e in com[-18:]), default=0), "w_rest": rest_co["w"], "h_rest": rest_co["h"], "radius_rest": rest_co["radius"],
        "radii_morph_tail": [e["radius"] for e in com[-4:]]}
S = json.load(open(f"{D}/seek-meta.json")); out["seek_keys"] = list(S["seekMeta"]["expand"][0].keys()) if S["seekMeta"]["expand"] else None
out["seek_expand_sample"] = [S["seekMeta"]["expand"][i] for i in (1, 12, 47)] if S["seekMeta"]["expand"] else None
print(json.dumps(out, indent=1)[:5000])
