"""SS-8 · B19 pixel analysis over the banked frames + JSON (read-only over evidence/)."""
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image

import os
E = Path(__file__).resolve().parents[2] / "evidence" / "B19-color-chips" / os.environ.get("B19_RUN", "")
out = {}


def lum(rgb):
    c = np.asarray(rgb[:3], float) / 255
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def cr(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def img(name):
    return np.asarray(Image.open(E / name).convert("RGB")).astype(int)


def load(name):
    p = E / name
    return json.loads(p.read_text()) if p.exists() else None


A = load("probe-a-ramp-1440_dsf4-light_dsf4-dark.json") or {}
for scheme in ("light", "dark"):
    c = A.get(f"dsf4-{scheme}")
    if not c or "error" in c:
        out[scheme] = c and c.get("error")
        continue
    res = {}
    S = 4
    # D-1: vertical profile at a segment centre (strip) / chip centre (ramp)
    for key in ("strip5", "ramp"):
        f = c[key]
        im = img(f["png"])
        r = next(x for x in f["rows"] if x["chip"])
        ch = r["chip"]
        if key == "strip5":
            sg = r["segments"][1]
            xc = int((sg["x"] + sg["w"] / 2) * S)
        else:
            xc = int((ch["x"] + ch["w"] / 2) * S)
        y0 = int(round(ch["y"] * S))
        col = im[y0 - 2 : y0 + 10, xc]
        interior = im[int((ch["y"] + ch["h"] / 2) * S), xc]
        top4 = im[y0 : y0 + 4, xc]
        res[f"D1-{key}"] = {
            "top4DevPx": top4.tolist(),
            "interior": interior.tolist(),
            "maxDeltaTop4VsInterior": int(np.abs(top4 - interior).max()),
            "profile": col.tolist(),
        }
    # seam (strip12, row 0 — 7 painted segments of 12 stamped)
    f = c["strip12"]
    im = img(f["png"])
    r = f["rows"][0]
    ch = r["chip"]
    yc = int((ch["y"] + ch["h"] / 2) * S)
    seams = []
    segs = r["segments"]
    for a, b in zip(segs, segs[1:]):
        edge = b["x"] * S
        L = im[yc, int(edge) - 3]
        R = im[yc, int(edge) + 3]
        mid = im[yc, int(np.floor(edge))]
        blend = int(min(np.abs(mid - L).max(), np.abs(mid - R).max()))
        seams.append({"edgeDevPx": round(edge, 3), "frac": round(edge % 1, 3), "L": L.tolist(), "seamPx": mid.tolist(), "R": R.tolist(), "blendDelta": blend})
    res["seams"] = seams
    # last (masked) segment: left vs right alpha read
    last = segs[-1]
    res["maskTail"] = [im[yc, int((last["x"] + t * last["w"]) * S)].tolist() for t in (0.1, 0.5, 0.9)]
    # D-11: Vibrant row selected (selA row0) vs unselected (selB row0)
    fa, fb = c["selA"], c["selB"]
    ia, ib = img(fa["png"]), img(fb["png"])
    ca, cb = fa["rows"][0]["chip"], fb["rows"][0]["chip"]
    w, h = int(ca["w"] * S) - 2, int(ca["h"] * S) - 2
    pa = ia[int(ca["y"] * S) + 1 : int(ca["y"] * S) + 1 + h, int(ca["x"] * S) + 1 : int(ca["x"] * S) + 1 + w]
    pb = ib[int(cb["y"] * S) + 1 : int(cb["y"] * S) + 1 + h, int(cb["x"] * S) + 1 : int(cb["x"] * S) + 1 + w]
    res["D11"] = {"selA": fa["rows"][0]["selected"], "selB": fb["rows"][0]["selected"], "chipA": ca, "chipB": cb, "maxDelta": int(np.abs(pa - pb).max()), "meanDelta": round(float(np.abs(pa - pb).mean()), 3)}
    # D-2 census on strip5: each segment interior vs the menu ground left of the chip
    census = []
    for r in f_rows if (f_rows := c["strip5"]["rows"]) else []:
        im5 = img(c["strip5"]["png"])
        if not r["chip"] or (r["chip"]["y"] + r["chip"]["h"]) * S >= im5.shape[0]:
            continue  # row scrolled out of the frame
        y = int((r["chip"]["y"] + r["chip"]["h"] / 2) * S)
        ground = im5[y, int((r["chip"]["x"] - 8) * S)]
        for sg in r["segments"]:
            px = im5[y, int((sg["x"] + sg["w"] / 2) * S)]
            census.append({"row": r["label"][:14], "seg": px.tolist(), "ground": ground.tolist(), "cr": round(cr(px, ground), 3)})
    worst = min(census, key=lambda x: x["cr"]) if census else None
    res["D2census"] = {"n": len(census), "worst": worst, "below1_5": sum(1 for x in census if x["cr"] < 1.5)}
    out[scheme] = res

# R-13: ring arithmetic with the live --foreground pair and a live menu-ground pixel (1440 light frame)
def oklab_to_srgb(L, a, b):
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    rgb = [4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_, -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_, -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_]
    enc = lambda c: 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
    return [round(max(0, min(1, enc(c))) * 255) for c in rgb]


def srgb_to_oklab(rgb):
    c = np.asarray(rgb, float) / 255
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    l = 0.4122214708 * c[0] + 0.5363325363 * c[1] + 0.0514459929 * c[2]
    m = 0.2119034982 * c[0] + 0.6806995451 * c[1] + 0.1073969566 * c[2]
    s = 0.0883024619 * c[0] + 0.2817188376 * c[1] + 0.6299787005 * c[2]
    l, m, s = np.cbrt([l, m, s])
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s]


import colorsys
def hsl(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360, l, s)
    return [round(r * 255), round(g * 255), round(b * 255)]


def ring_over(fg, base):
    F, B = srgb_to_oklab(fg), srgb_to_oklab(base)
    return oklab_to_srgb(*[0.12 * f + 0.88 * b for f, b in zip(F, B)])


fgL, fgD = hsl(24, 0.10, 0.10), hsl(30, 0.14, 0.90)
r13 = {}
for name, fg in (("light", fgL), ("dark", fgD)):
    rw, rb = ring_over(fg, [255, 255, 255]), ring_over(fg, [0, 0, 0])
    r13[name] = {"fg": fg, "ringOverWhite": rw, "cr_ringOverWhite": round(cr(rw, [255] * 3), 3), "ringOverBlack": rb, "cr_ringOverBlack": round(cr(rb, [0] * 3), 3)}
A0 = load("probe-a-ramp-1440_ramp-390_ramp-320_ramp-zoom200_mix_forced.json")
ramp = ((A.get("ramp-1440") if "error" not in (A.get("ramp-1440") or {"error": 1}) else None) or A0["ramp-1440"]).get("Color space")
if ramp:
    im = img(ramp["frame"]["png"])
    r = ramp["frame"]["rows"][0]
    ground = im[int(r["chip"]["y"] + r["chip"]["h"] / 2), int(r["chip"]["x"] - 8)].tolist()
    r13["menuGroundLight1440"] = ground
    r13["cr_whiteChipVsMenu"] = round(cr([255] * 3, ground), 3)
    r13["cr_ringOverWhiteVsMenu"] = round(cr(r13["light"]["ringOverWhite"], ground), 3)
out["R13"] = r13

# PS-3 / R-6: distinct colours inside forced-colors chips (DSF 1)
fz = load("probe-a-ramp-1440_ramp-390_ramp-320_ramp-zoom200_mix_forced.json")["forced"]
for key in ("ramp", "strip"):
    im = img(fz[key]["frame"]["png"])
    ch = fz[key]["frame"]["rows"][0]["chip"]
    crop = im[int(ch["y"]) + 2 : int(ch["y"] + ch["h"]) - 2, int(ch["x"]) + 2 : int(ch["x"] + ch["w"]) - 2]
    u = np.unique(crop.reshape(-1, 3), axis=0)
    out[f"forced-{key}"] = {"distinct": int(len(u)), "colors": u[:4].tolist()}

# E-2 bleed: menu region over the live page vs over a #00ff00 page
B = load("probe-b-bleed.json")
if B and "bleed" in B and "error" not in B["bleed"]:
    lb = B["bleed"]["listbox"]
    a, g = img("bleed-live.png"), img("bleed-green.png")
    sl = (slice(int(lb["y"]) + 4, int(lb["y"] + lb["h"]) - 4), slice(int(lb["x"]) + 4, int(lb["x"] + lb["w"]) - 4))
    d = np.abs(a[sl] - g[sl])
    out["bleed"] = {"meanDelta": round(float(d.mean()), 2), "pctPxDelta>16": round(float((d.max(axis=2) > 16).mean() * 100), 1), "liveMean": a[sl].reshape(-1, 3).mean(0).round(1).tolist(), "greenMean": g[sl].reshape(-1, 3).mean(0).round(1).tolist()}

(E / "analyze.json").write_text(json.dumps(out, indent=1))
print(json.dumps(out, indent=None)[:6000])
