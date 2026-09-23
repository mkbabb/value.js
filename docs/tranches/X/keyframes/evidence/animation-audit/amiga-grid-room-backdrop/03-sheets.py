import glob, json, os
from PIL import Image, ImageDraw
D = os.path.dirname(os.path.abspath(__file__)) + "/"
rect = json.load(open(D + "capture-out.json"))["rect"]
box = (rect["x"], rect["y"], rect["x"] + rect["width"], rect["y"] + rect["height"])
def sheet(files, out, crop, labels, scale=0.4):
    tw, th = int(rect["width"] * scale), int(rect["height"] * scale)
    S = Image.new("RGB", (tw * 6, th * 4), "white"); d = ImageDraw.Draw(S)
    for k, (f, lab) in enumerate(zip(files, labels)):
        im = Image.open(f).convert("RGB")
        if crop:
            k2 = im.width / 1440; im = im.crop(tuple(int(v * k2) for v in box))
        im = im.resize((tw, th), Image.LANCZOS)
        x, y = (k % 6) * tw, (k // 6) * th
        S.paste(im, (x, y)); d.rectangle([x, y, x + tw - 1, y + th - 1], outline="#888"); d.text((x + 4, y + 3), lab, fill="black")
    S.save(out)
step = sorted(glob.glob(D + "step/s*.png"))
for i in range(0, len(step), 24):
    sheet(step[i:i+24], D + f"sheet-step-{i:02d}-{i+23:02d}.png", False, [f"s{j} t={int(j*8000/48)}" for j in range(i, i+24)])
live = sorted(glob.glob(D + "live/f*.jpg")); fr = json.load(open(D + "live/frames.json")); t0 = fr[0]["ts"]
os.makedirs(D + "sheets-live", exist_ok=True)
for i in range(0, len(live), 24):
    sheet(live[i:i+24], D + f"sheets-live/live-{i:04d}.png", True, [f"f{j} +{(fr[j]['ts']-t0)*1000:.0f}ms" for j in range(i, min(i+24, len(live)))], 0.25)
print(len(step), len(live))
