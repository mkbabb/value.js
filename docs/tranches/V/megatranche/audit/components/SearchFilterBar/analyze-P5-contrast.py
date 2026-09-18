#!/usr/bin/env python3
"""CHALLENGE-D pass 5 — rendered contrast from the actual composited pixels.

Method (stated so it is falsifiable): for each element crop, quantise to exact
sRGB triples, take the modal colour as GROUND and the extreme-luminance colour
that occupies >=1% of pixels as INK, then compute WCAG 2.x contrast.  Anti-
aliased edge pixels are excluded by the 1% floor, so this UNDER-states neither
side: the reported ratio is the ratio between the two colours a reader actually
sees as field and mark.
"""
import json, sys, os
from collections import Counter
from PIL import Image

OUT = os.path.dirname(os.path.abspath(__file__)) + "/evidence-p5"


def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def L(rgb):
    r, g, b = rgb[:3]
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def ratio(a, b):
    la, lb = L(a), L(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def analyse(path):
    im = Image.open(path).convert("RGB")
    px = list(im.getdata())
    n = len(px)
    c = Counter(px)
    ground, gcount = c.most_common(1)[0]
    # candidate ink: the colour with >=1% share whose luminance is farthest from ground
    cands = [(col, k) for col, k in c.items() if k >= max(3, n * 0.01)]
    if not cands:
        return None
    ink = max(cands, key=lambda t: abs(L(t[0]) - L(ground)))
    return {
        "file": os.path.basename(path),
        "px": n,
        "ground": ground,
        "groundShare": round(gcount / n, 3),
        "ink": ink[0],
        "inkShare": round(ink[1] / n, 3),
        "contrast": round(ratio(ground, ink[0]), 2),
        "distinctColours": len(c),
    }


targets = []
for scheme in ("light", "dark", "mobile", "forced"):
    for part in ("label", "option", "input", "btn", "swatch", "trigger"):
        p = f"{OUT}/p5-3-{scheme}-crop-{part}.png"
        if os.path.exists(p):
            r = analyse(p)
            if r:
                r["scheme"] = scheme
                r["part"] = part
                targets.append(r)

print(f"{'scheme':8} {'part':9} {'ground':18} {'ink':18} {'contrast':>8}  share")
for t in targets:
    print(
        f"{t['scheme']:8} {t['part']:9} {str(t['ground']):18} {str(t['ink']):18} "
        f"{t['contrast']:8.2f}  g={t['groundShare']:.2f} i={t['inkShare']:.2f}"
    )

json.dump(targets, open(f"{OUT}/p5-contrast.json", "w"), indent=2)
print("\nWROTE", f"{OUT}/p5-contrast.json")
