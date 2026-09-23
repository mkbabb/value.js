# Contact sheets: 24 frames per sheet (6x4), labelled with index + time.
import json, glob, os
from PIL import Image, ImageDraw
D = os.path.dirname(os.path.abspath(__file__))
cap = json.load(open(f"{D}/capture.json")); b = cap["canvasBox"]
os.makedirs(f"{D}/sheets", exist_ok=True)
def sheet(items, out, crop=None, tw=360):
    th = None; tiles = []
    for path, label in items:
        im = Image.open(path).convert("RGB")
        if crop:
            sx = im.width / 1440; im = im.crop(tuple(int(v * sx) for v in crop))
        th = int(im.height * tw / im.width); im = im.resize((tw, th))
        ImageDraw.Draw(im).rectangle([0, 0, tw, 16], fill=(0, 0, 0)); ImageDraw.Draw(im).text((4, 2), label, fill=(255, 255, 0))
        tiles.append(im)
    S = Image.new("RGB", (tw * 6, th * 4), (40, 40, 40))
    for i, im in enumerate(tiles): S.paste(im, ((i % 6) * tw, (i // 6) * th))
    S.save(out)
step = json.load(open(f"{D}/capture.json"))["step"]
for s in range(0, len(step), 24):
    sheet([(f"{D}/step/s{r['k']:02d}.png", f"s{r['k']} T={r['T']:.0f} x={r['px']:.2f} y={r['py']:.2f} sp={r['spin']:.2f}") for r in step[s:s+24]], f"{D}/sheets/step-{s//24:02d}.png")
fr = json.load(open(f"{D}/live/frames.json")); t0 = cap["phases"]["live"]["tPlayWall"]
crop = (b["x"], b["y"], b["x"] + b["width"], b["y"] + b["height"])
for s in range(0, len(fr), 24):
    sheet([(f"{D}/{f['name']}", f"f{f['i']} +{(f['ts']-t0)*1000:.0f}ms") for f in fr[s:s+24]], f"{D}/sheets/live-{s//24:02d}.png", crop=crop, tw=300)
print("ok", len(glob.glob(f"{D}/sheets/*.png")))
