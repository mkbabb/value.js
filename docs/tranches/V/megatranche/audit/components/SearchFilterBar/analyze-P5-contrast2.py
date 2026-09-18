#!/usr/bin/env python3
"""Pass 5 — glyph-level rendered contrast.  Floor lowered to 0.2% so 3-4 px
glyph strokes in a 32x40 crop are not discarded, and both extremes reported.
Also measures the trigger fill vs the host search-field fill (figure/ground).
"""
import json, os
from collections import Counter
from PIL import Image

OUT = os.path.dirname(os.path.abspath(__file__)) + "/evidence-p5"


def lin(c):
    c /= 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def L(rgb):
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2])


def ratio(a, b):
    hi, lo = max(L(a), L(b)), min(L(a), L(b))
    return round((hi + 0.05) / (lo + 0.05), 2)


def stats(path, floor=0.002):
    im = Image.open(path).convert("RGB")
    px = list(im.get_flattened_data()) if hasattr(im, "get_flattened_data") else list(im.getdata())
    n = len(px)
    c = Counter(px)
    ground = c.most_common(1)[0][0]
    cands = [(col, k) for col, k in c.items() if k >= max(2, n * floor)]
    darkest = min(cands, key=lambda t: L(t[0]))[0]
    lightest = max(cands, key=lambda t: L(t[0]))[0]
    return {
        "n": n,
        "ground": ground,
        "darkest": darkest,
        "lightest": lightest,
        "groundVsDarkest": ratio(ground, darkest),
        "groundVsLightest": ratio(ground, lightest),
        "span": ratio(darkest, lightest),
    }


rows = []
for scheme in ("light", "dark", "mobile", "forced"):
    for part in ("trigger", "input", "label", "swatch", "btn", "option"):
        p = f"{OUT}/p5-3-{scheme}-crop-{part}.png"
        if os.path.exists(p):
            s = stats(p)
            s.update(scheme=scheme, part=part)
            rows.append(s)

print(f"{'scheme':7} {'part':8} {'ground':17} {'darkest':17} {'lightest':17} "
      f"{'g/dark':>7} {'g/light':>8} {'span':>6}")
for r in rows:
    print(f"{r['scheme']:7} {r['part']:8} {str(r['ground']):17} {str(r['darkest']):17} "
          f"{str(r['lightest']):17} {r['groundVsDarkest']:7.2f} {r['groundVsLightest']:8.2f} {r['span']:6.2f}")

# figure/ground: trigger glass fill vs the host field fill, sampled from the
# full-page frames at the measured coordinates (p5-3.json rects).
rects = json.load(open(f"{OUT}/p5-3.json"))
fg = {}
for scheme, shot in (("light", "p5-3-light-wall-closed.png"), ("dark", "p5-3-dark-wall-closed.png")):
    im = Image.open(f"{OUT}/{shot}").convert("RGB")
    r = rects[scheme]["rects"]
    t, f = r["trigger"], r["field"]
    # trigger fill: 4 px inside its left edge, vertical centre
    tp = (int(t["x"] + 5), int(t["y"] + t["h"] / 2))
    # field fill: 60 px right of the field's left edge (past the search icon)
    fp = (int(f["x"] + 120), int(f["y"] + f["h"] / 2))
    tc, fc = im.getpixel(tp), im.getpixel(fp)
    fg[scheme] = {"triggerFill": tc, "fieldFill": fc, "contrast": ratio(tc, fc),
                  "triggerPt": tp, "fieldPt": fp}
print("\nTrigger-vs-field figure/ground (sampled from the closed frame):")
for k, v in fg.items():
    print(f"  {k:6} trigger {v['triggerFill']}  field {v['fieldFill']}  ratio {v['contrast']}")

json.dump({"crops": rows, "figureGround": fg}, open(f"{OUT}/p5-contrast2.json", "w"), indent=2)
print("\nWROTE", f"{OUT}/p5-contrast2.json")
