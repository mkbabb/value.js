# SERVED MODEL: claude-opus-5-5
# X.W10.e · G-6 corner pixel-diff. Usage: python3 -I g6-corner-diff.py <label> [dir]
# Metric (same for the owner-marked witnesses and the live successor):
#   the card's box is known (live: from g6-<label>.json at DPR 2; witness: the
#   bounding box of its low-saturation card-fill pixels). For each of the four
#   corners, the CAST RING is the band 2..14 device px outside the box edge,
#   spanning the corner's last 40 device px of each side. A ring pixel is CAST
#   when its luminance is >= 0.08 below the background reference (median
#   luminance of the clip's outermost 3 px frame on that side). A faceted
#   stepped cast (OM-2/11/12) paints a dark band in the down-left ring; a card
#   that casts nothing reads 0 cast pixels in every ring.
import json, sys, os
from PIL import Image

label = sys.argv[1] if len(sys.argv) > 1 else "run1"
d = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(__file__))
OM = os.path.join(d, "../../../V/megatranche/audit/visual/owner-marked")


def lum(p):
    r, g, b = [c / 255 for c in p[:3]]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ref(img, side):
    w, h = img.size
    px = img.load()
    if side == "bottom":
        vals = [lum(px[x, y]) for y in range(h - 3, h) for x in range(w)]
    elif side == "top":
        vals = [lum(px[x, y]) for y in range(0, 3) for x in range(w)]
    elif side == "left":
        vals = [lum(px[x, y]) for x in range(0, 3) for y in range(h)]
    else:
        vals = [lum(px[x, y]) for x in range(w - 3, w) for y in range(h)]
    vals.sort()
    return vals[len(vals) // 2]


def ring(img, box):
    x0, y0, x1, y1 = box
    w, h = img.size
    px = img.load()
    res = {}
    for name, cx, cy in (("TL", x0, y0), ("TR", x1, y0), ("BL", x0, y1), ("BR", x1, y1)):
        vside = "top" if cy == y0 else "bottom"
        hside = "left" if cx == x0 else "right"
        rv, rh = ref(img, vside), ref(img, hside)
        cast = total = 0
        pts = set()
        # vertical band (outside top/bottom edge), last 40 px toward the corner
        xs = range(cx, min(w, cx + 40)) if cx == x0 else range(max(0, cx - 40), cx)
        ys = range(max(0, cy - 14), max(0, cy - 2)) if cy == y0 else range(min(h, cy + 2), min(h, cy + 14))
        for x in xs:
            for y in ys:
                pts.add((x, y, rv))
        xs2 = range(max(0, cx - 14), max(0, cx - 2)) if cx == x0 else range(min(w, cx + 2), min(w, cx + 14))
        ys2 = range(cy, min(h, cy + 40)) if cy == y0 else range(max(0, cy - 40), cy)
        for x in xs2:
            for y in ys2:
                pts.add((x, y, rh))
        for x, y, r in pts:
            total += 1
            if r - lum(px[x, y]) >= 0.08:
                cast += 1
        res[name] = [cast, total]
    return res


def witness_box(img):
    w, h = img.size
    px = img.load()
    xs, ys = [], []
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y][:3]
            if max(r, g, b) - min(r, g, b) <= 16 and min(r, g, b) >= 200:
                xs.append(x)
                ys.append(y)
    xs.sort(); ys.sort()
    q = lambda a, f: a[int(len(a) * f)]
    return (q(xs, 0.002), q(ys, 0.002), q(xs, 0.998), q(ys, 0.998))


lines = []
for name in ("OM-2-card-shadow-sharp-corners.png", "OM-11-palette-card-shadow-artifacts.png", "OM-12-palette-card-shadow-artifact-closeup.png"):
    img = Image.open(os.path.join(OM, name)).convert("RGB")
    box = witness_box(img)
    r = ring(img, box)
    # the witness fill-detector finds the cream body below the swatch strip, so
    # its top edge is not the card's; only the bottom corners (where the
    # down-left stepped cast lands) are read on a witness.
    lines.append(f"witness {name} box={box} ring BL={r['BL']} BR={r['BR']}")
for m in json.load(open(os.path.join(d, f"g6-{label}.json"))):
    img = Image.open(os.path.join(d, f"g6-{label}", m["file"])).convert("RGB")
    c, b = m["clip"], m["box"]
    box = tuple(round(2 * v) for v in (b["x"] - c["x"], b["y"] - c["y"], b["x"] - c["x"] + b["w"], b["y"] - c["y"] + b["h"]))
    lines.append(f"live {m['viewport']} {m['state']} box={box} ring={ring(img, box)} cardShadow={m['cardShadow']} casters={len(m['casters'])} cartoonCast={m['cartoonCast']}")
print("\n".join(lines))
