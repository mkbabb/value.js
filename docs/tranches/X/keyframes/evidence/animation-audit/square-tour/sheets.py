import json, os, glob
from PIL import Image, ImageDraw
R = json.load(open("capture.json"))
os.makedirs("sheets", exist_ok=True)
def sheet(files, labels, out, crop=None, scale=0.4):
    ims = []
    for f in files:
        im = Image.open(f).convert("RGB")
        if crop:
            k = im.width/1440
            im = im.crop(tuple(int(c*k) for c in crop)); im = im.resize((int(im.width/k), int(im.height/k)))
        im = im.resize((int(im.width*scale), int(im.height*scale)))
        ims.append(im)
    w, h = ims[0].size; cols = 6; rows = (len(ims)+cols-1)//cols
    S = Image.new("RGB", (cols*w, rows*(h+14)), "white"); d = ImageDraw.Draw(S)
    for k, (im, lab) in enumerate(zip(ims, labels)):
        x, y = (k%cols)*w, (k//cols)*(h+14)
        S.paste(im, (x, y+14)); d.text((x+3, y+1), lab, fill="black")
    S.save(out)
st = R["config"]["stage"]; crop = (int(st["x"]), int(st["y"]), int(st["x"]+st["w"]), int(st["y"]+st["h"]))
live = sorted(glob.glob("live/f*.png")); ts = R["liveFrameTs"]
for s in range(0, len(live), 24):
    idx = range(s, min(s+24, len(live)))
    sheet([live[i] for i in idx], [f"L{i} {ts[i]:.0f}ms" for i in idx], f"sheets/live-{s:03d}.png", crop)
step = sorted(glob.glob("step/f*.png"))
for s in range(0, len(step), 24):
    idx = range(s, min(s+24, len(step)))
    sheet([step[i] for i in idx], [f"S{i} p={R['steps'][i]['p']:.3f} t={R['steps'][i]['at']:.0f}" for i in idx], f"sheets/step-{s:02d}.png", None, 0.4)
print(len(live), len(step))
