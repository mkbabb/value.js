# Skeleton ink read over the live b-skeleton captures (probe-b): mean OKLab L over each block's
# interior (2px inset) vs the mean over the ground band directly right of the primary bar,
# same rows, inside the skeleton row (up to 8px short of the action lozenge). Run: python3 -I ink.py
import json, sys
from pathlib import Path
from PIL import Image

E = Path(__file__).resolve().parents[2] / "evidence" / "B17-admin-shell-names"
d = json.loads((E / "probe-b.json").read_text())

def lin(v):
    v /= 255
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4

def okl(rgb):
    R, G, B = map(lin, rgb)
    l = (0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B) ** (1 / 3)
    m = (0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B) ** (1 / 3)
    s = (0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B) ** (1 / 3)
    return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s

def lum(rgb):
    R, G, B = map(lin, rgb)
    return 0.2126 * R + 0.7152 * G + 0.0722 * B

def mean(img, x0, y0, x1, y1):
    px = [img.getpixel((x, y))[:3] for x in range(int(x0), int(x1)) for y in range(int(y0), int(y1))]
    return [sum(p[i] for p in px) / len(px) for i in range(3)]

out = {}
for key in ["1440-light", "1440-dark", "390-light", "390-dark"]:
    cellv = d[f"swap-names-{key}"]
    img = Image.open(E / f"b-skeleton-{key}.png").convert("RGB")
    res = []
    for i, sk in enumerate(cellv["skeleton"]):
        # blocks only recorded for skeleton 0; derive the others by the row offset
        dy = sk["rect"][1] - cellv["skeleton"][0]["rect"][1]
        bar = cellv["skelBlocks"][1]["rect"]
        loz = cellv["skelBlocks"][3]["rect"]
        bx0, by0, bw, bh = bar[0] + 2, bar[1] + dy + 2, bar[2] - 4, bar[3] - 4
        block = mean(img, bx0, by0, bx0 + bw, by0 + bh)
        gx0 = bar[0] + bar[2] + 8
        gx1 = loz[0] - 8
        ground = mean(img, gx0, by0, gx1, by0 + bh)
        L1, L2 = lum(block), lum(ground)
        res.append({"row": i, "block": [round(v) for v in block], "ground": [round(v) for v in ground],
                    "dL": round(okl(block) - okl(ground), 4),
                    "cr": round((max(L1, L2) + 0.05) / (min(L1, L2) + 0.05), 3)})
    out[key] = res
(E / "ink.json").write_text(json.dumps(out, indent=1))
for k, v in out.items():
    print(k, [(r["dL"], r["cr"]) for r in v])
