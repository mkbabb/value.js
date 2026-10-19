# Contact sheets: 24 frames per sheet (6x4), each labelled with index + time.
import json, glob, os, sys
from PIL import Image, ImageDraw
OUT = os.path.dirname(os.path.abspath(__file__))
W, H, C, R = 360, 225, 6, 4
def label_for(d):
    fj, sj = os.path.join(d, "frames.json"), os.path.join(d, "seek.json")
    if os.path.exists(fj):
        fr = json.load(open(fj))["frames"]
        return [(os.path.join(d, f["file"]), f"{f['i']}  t={f['dtAct']*1000:+.0f}ms") for f in fr]
    if os.path.exists(sj):
        s = json.load(open(sj))
        if s.get("noViewTransition"): return []
        return [(os.path.join(d, f"s{x['i']:03d}.png"), f"{x['i']}  vt={x['t']}ms") for x in s["shots"]]
    return []
for d in sorted(glob.glob(os.path.join(OUT, "*/"))):
    items = label_for(d)
    for n in range(0, len(items), 24):
        chunk = items[n:n+24]
        sheet = Image.new("RGB", (W*C, (H+18)*R), "white")
        dr = ImageDraw.Draw(sheet)
        for k, (p, lab) in enumerate(chunk):
            im = Image.open(p).convert("RGB").resize((W, H))
            x, y = (k % C)*W, (k//C)*(H+18)
            sheet.paste(im, (x, y+18)); dr.text((x+4, y+3), lab, fill="black")
        sp = os.path.join(d, f"sheet-{n//24:02d}.png"); sheet.save(sp); print(sp, len(chunk))
