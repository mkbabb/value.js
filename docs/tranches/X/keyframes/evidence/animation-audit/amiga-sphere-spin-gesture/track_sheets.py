# Ball-tracking crops for a phase: frame ts (epoch s) → probe pose via the marks' wall↔perf offset,
# ball centre ≈ (957 + 50·px, 450 − 50·py) CSS px (calibrated: centroid 1164,519 at px 4.17, py −1.44); crop at 2×.
import json, sys, os, bisect
from PIL import Image, ImageDraw
d = sys.argv[1]; P = json.load(open(f"{d}/probe.json")); F = json.load(open(f"{d}/frames.json"))
off = sum(m["wall"]*1000 - m["t"] for m in P["marks"]) / len(P["marks"])
L = P["log"]; T = [e["t"] for e in L]
os.makedirs(f"{d}/track", exist_ok=True); tiles = []
for fr in F:
    t = fr["ts"]*1000 - off; k = max(0, min(len(L)-1, bisect.bisect_left(T, t)-1)); e = L[k]
    cx, cy = 957 + 50*e["px"], 450 - 50*e["py"]
    im = Image.open(f"{d}/f{fr['i']:04d}.jpg")
    c = im.crop((int(2*cx-150), int(2*cy-150), int(2*cx+150), int(2*cy+150))).resize((150,150))
    dr = ImageDraw.Draw(c); dr.text((4,2), f"{fr['i']} ox{e['ox']:.2f} oy{e['oy']:.2f}", fill=(0,0,0))
    tiles.append(c)
for s in range(0, len(tiles), 24):
    sh = Image.new("RGB", (8*152, 3*152), "white")
    for j, c in enumerate(tiles[s:s+24]): sh.paste(c, ((j%8)*152, (j//8)*152))
    sh.save(f"{d}/track-sheet-{s//24:02d}.png")
print(len(tiles), "tiles", (len(tiles)+23)//24, "sheets")
