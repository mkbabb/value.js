"""SS-8 · B19 — pixel reads for probe D (R-12 P-5/P-6, R-13 ring) + D-11 delta locus."""
import json, os
from pathlib import Path
import numpy as np
from PIL import Image

E = Path(__file__).resolve().parents[2] / "evidence" / "B19-color-chips" / os.environ.get("B19_RUN", "")
out = {}


def lum(rgb):
    c = np.asarray(rgb[:3], float) / 255
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def cr(a, b):
    la, lb = lum(a), lum(b)
    return round((max(la, lb) + 0.05) / (min(la, lb) + 0.05), 3)


D = json.loads((E / "probe-d.json").read_text())
for scheme, c in D.items():
    if "error" in c:
        out[scheme] = c["error"][:200]
        continue
    im = np.asarray(Image.open(E / c["png"]).convert("RGB")).astype(int)
    res = {"colorScheme": c["colorScheme"], "p5": {}, "p6": {}, "ring": {}}
    for k, r in c["p5"].items():
        res["p5"][k] = im[int(r["y"] + r["h"] / 2), int(r["x"] + r["w"] / 2)].tolist()
    for k, v in c["p6"].items():
        a, t = v["chip"], v["truth"]
        ya, yt = int(a["y"] + a["h"] / 2), int(t["y"] + t["h"] / 2)
        ra = im[ya, int(a["x"]) : int(a["x"] + a["w"])]
        rt = im[yt, int(t["x"]) : int(t["x"] + t["w"])]
        d = np.abs(ra - rt).max(axis=1)
        res["p6"][k] = {"chipN": v["chipN"], "truthN": v["truthN"], "max": int(d.max()), "mean": round(float(d.mean()), 2), "cols>4": int((d > 4).sum()), "cols": int(len(d))}
    sw = {k: im[int(v["rect"]["y"] + 10), int(v["rect"]["x"] + 10)].tolist() for k, v in c["swatches"].items()}
    res["ring"] = {"css": {k: v["css"] for k, v in c["swatches"].items()}, "px": sw, "cr_ringOverWhite": cr(sw["ringOverWhite"], [255] * 3), "cr_ringOverBlack": cr(sw["ringOverBlack"], [0] * 3)}
    out[scheme] = res

# D-11 locus: where do selA / selB differ inside the Vibrant chip (light, DSF4)?
A = json.loads((E / "probe-a-ramp-1440_dsf4-light_dsf4-dark.json").read_text())
for scheme in ("light", "dark"):
    cc = A.get(f"dsf4-{scheme}")
    if not cc or "error" in cc:
        continue
    S = 4
    fa, fb = cc["selA"], cc["selB"]
    ia = np.asarray(Image.open(E / fa["png"]).convert("RGB")).astype(int)
    ib = np.asarray(Image.open(E / fb["png"]).convert("RGB")).astype(int)
    ch = fa["rows"][0]["chip"]
    x0, y0, x1, y1 = int(ch["x"] * S), int(ch["y"] * S), int((ch["x"] + ch["w"]) * S), int((ch["y"] + ch["h"]) * S)
    d = np.abs(ia[y0:y1, x0:x1] - ib[y0:y1, x0:x1]).max(axis=2)
    ys, xs = np.nonzero(d > 4)
    inner = d[4:-4, 4:-4]
    out[f"D11-{scheme}"] = {"chipDevPx": [x1 - x0, y1 - y0], "max": int(d.max()), "px>4": int((d > 4).sum()), "of": int(d.size), "innerMax(excl. 1 CSS px rim)": int(inner.max()), "rowsWithDelta": sorted(set((ys).tolist()))[:12], "colsRange": [int(xs.min()), int(xs.max())] if len(xs) else None}
(E / "analyze-d.json").write_text(json.dumps(out, indent=1))
print(json.dumps(out)[:4000])
