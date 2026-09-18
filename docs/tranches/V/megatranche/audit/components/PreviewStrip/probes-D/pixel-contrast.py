import json
from PIL import Image

D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-previewstrip"
S = 2


def lum(c):
    def f(v):
        v = v / 255.0
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])


def cr(a, b):
    L1, L2 = lum(a), lum(b)
    hi, lo = max(L1, L2), min(L1, L2)
    return (hi + 0.05) / (lo + 0.05)


def mean(im, x, y, w, h):
    box = (int(round(x * S)), int(round(y * S)), max(int(round((x + w) * S)), int(round(x * S)) + 1),
           max(int(round((y + h) * S)), int(round(y * S)) + 1))
    p = im.crop(box).convert("RGB")
    px = list(p.getdata())
    n = len(px)
    return [sum(c[i] for c in px) / n for i in range(3)]


for tag in ["gen-light", "gen-dark", "atmo-light", "atmo-dark"]:
    im = Image.open(f"{D}/px2-{tag}.png")
    data = json.load(open(f"{D}/px2-{tag}.json"))
    print(f"\n===== RENDERED PIXELS · {tag} =====")
    print("  (ground = the 4px gap immediately right of the plate, same band)")
    for r in data["chips"]:
        if not r["visible"]:
            print(f"  {r['label']:<24} SKIPPED (scrolled out of the listbox)")
            continue
        cx, cy, cw, ch = r["chip"]
        ground = mean(im, cx + cw + 2, cy + ch * 0.25, 4, ch * 0.5)
        segs = [mean(im, sx + sw * 0.25, sy + sh * 0.35, max(sw * 0.5, 0.6), max(sh * 0.3, 1))
                for (sx, sy, sw, sh) in r["segs"]]
        crs = [round(cr(s, ground), 3) for s in segs]
        adj = [round(cr(segs[i - 1], segs[i]), 3) for i in range(1, len(segs))]
        ring = mean(im, cx + cw * 0.25, cy, cw * 0.5, 1.0)
        print(f"  {r['label']:<24} ground={[round(v) for v in ground]} segCR={crs} MIN={min(crs)} "
              f"adjCR={adj} MINadj={min(adj) if adj else None} ringCR={round(cr(ring, ground),3)}")
