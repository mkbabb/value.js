#!/usr/bin/env python3
"""CHALLENGE-D (second seat) — rendered-pixel contrast census.

For every visible PreviewStrip on both hosts and both schemes:
  ground  = mean of a 4 CSS px column immediately to the RIGHT of the plate,
            same vertical band (the composited row the chip sits on)
  segment = mean of the inner 50% x 40% of each painted segment (avoids the
            corner radii and any edge antialiasing)
Reports WCAG contrast of every segment vs that ground, and of adjacent
segment pairs against each other.
"""
import json
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")


def lin(c):
    c /= 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def L(rgb):
    r, g, b = (lin(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def cr(a, b):
    la, lb = L(a), L(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def mean(im, x0, y0, x1, y1):
    x0, y0, x1, y1 = int(x0), int(y0), max(int(x1), int(x0) + 1), max(int(y1), int(y0) + 1)
    box = im.crop((x0, y0, x1, y1))
    px = list(box.getdata())
    n = len(px)
    return tuple(round(sum(p[i] for p in px) / n) for i in range(3))


def main():
    idx = json.load(open(os.path.join(OUT, "contrast-index.json")))
    worst = []
    for entry in idx:
        im = Image.open(os.path.join(OUT, entry["png"])).convert("RGB")
        d = entry["dsf"]
        print(f"===== {entry['tag']} · {entry['scheme']} =====")
        for row in entry["rows"]:
            c = row["chip"]
            gx0 = (c["x"] + c["w"] + 2) * d
            ground = mean(im, gx0, (c["y"] + 2) * d, gx0 + 4 * d, (c["y"] + c["h"] - 2) * d)
            segs = []
            for s in row["segs"]:
                sx0 = (s["x"] + s["w"] * 0.25) * d
                sx1 = (s["x"] + s["w"] * 0.75) * d
                sy0 = (s["y"] + s["h"] * 0.30) * d
                sy1 = (s["y"] + s["h"] * 0.70) * d
                segs.append(mean(im, sx0, sy0, sx1, sy1))
            vs_ground = [round(cr(s, ground), 3) for s in segs]
            adj = [round(cr(segs[i], segs[i + 1]), 3) for i in range(len(segs) - 1)]
            mn = min(vs_ground) if vs_ground else None
            mna = min(adj) if adj else None
            worst.append((entry["tag"], entry["scheme"], row["name"], mn, mna))
            print(
                f"  {row['name']:<22} ground={ground}  segVsGround={vs_ground}"
                f"  MIN={mn}  adjacent={adj}  MINadj={mna}"
            )
        print()
    below3 = [w for w in worst if w[3] is not None and w[3] < 3.0]
    below115 = [w for w in worst if w[3] is not None and w[3] < 1.15]
    adjbelow = [w for w in worst if w[4] is not None and w[4] < 1.5]
    print(f"chips measured                          : {len(worst)}")
    print(f"chips with a stop < 3.0:1 vs its ground : {len(below3)}")
    print(f"chips with a stop < 1.15:1 vs its ground: {len(below115)}  {[w[:3] for w in below115]}")
    print(f"chips with an adjacent pair < 1.5:1     : {len(adjbelow)}")


if __name__ == "__main__":
    main()
