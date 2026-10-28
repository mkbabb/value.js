"""SS-8 B21 offline pixel contrast for probe crops.

Method: ground = the most common colour in the crop (quantised to 4 levels per
channel, then averaged over its members); ink = the 0.5th-percentile pixel by
contrast distance from the ground (the darkest/lightest stroke core, robust to
one stray pixel). Reports WCAG 2.x ratio ink:ground.
usage: python3 -I contrast.py <png>...
"""
import sys
from collections import Counter
from PIL import Image


def lum(c):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c[:3]
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ratio(a, b):
    x, y = sorted([lum(a), lum(b)], reverse=True)
    return (x + 0.05) / (y + 0.05)


for p in sys.argv[1:]:
    im = Image.open(p).convert("RGB")
    px = list(im.getdata())
    q = Counter((r >> 2, g >> 2, b >> 2) for r, g, b in px)
    mode = q.most_common(1)[0][0]
    members = [c for c in px if (c[0] >> 2, c[1] >> 2, c[2] >> 2) == mode]
    ground = tuple(round(sum(c[i] for c in members) / len(members)) for i in range(3))
    scored = sorted(px, key=lambda c: ratio(c, ground), reverse=True)
    ink = scored[max(0, int(len(scored) * 0.005))]
    print(f"{p.split('/')[-1]}\tground={ground}\tink={ink}\tratio={ratio(ink, ground):.2f}\tsize={im.size}")
