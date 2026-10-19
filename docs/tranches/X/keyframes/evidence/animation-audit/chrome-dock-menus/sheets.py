# contact sheets: one PNG per 24 frames, 6x4 grid, frame index + t label
import json, sys, os, glob
from PIL import Image, ImageDraw
base = os.path.dirname(os.path.abspath(__file__))
os.makedirs(f"{base}/sheets", exist_ok=True)
for cap in glob.glob(f"{base}/capture*.json"):
    data = json.load(open(cap))
    for name, r in data.items():
        for ph, o in r.items():
            if not isinstance(o, dict) or "frames" not in o: continue
            frames = o["frames"]
            for s in range(0, len(frames), 24):
                chunk = frames[s:s+24]
                ims = [Image.open(f"{base}/{name}/{ph.replace('toDark','to-dark').replace('toLight','to-light')}/f{f['i']:02d}.png").convert("RGB") for f in chunk]
                w, h = ims[0].size
                sc = min(1.0, 360 / w, 300 / h)
                tw, th = int(w*sc), int(h*sc)
                cols = 6; rows = (len(ims)+cols-1)//cols
                sheet = Image.new("RGB", (cols*tw, rows*(th+16)), (40,40,40))
                d = ImageDraw.Draw(sheet)
                for k,(im,f) in enumerate(zip(ims,chunk)):
                    x, y = (k%cols)*tw, (k//cols)*(th+16)
                    sheet.paste(im.resize((tw,th), Image.LANCZOS), (x, y+16))
                    d.text((x+3, y+2), f"f{f['i']:02d} t={f['t']}ms dock={f['dock'][0]}", fill=(255,255,0))
                out = f"{base}/sheets/{name}__{ph}__{s:02d}-{s+len(chunk)-1:02d}.png"
                sheet.save(out); print(out.split('/')[-1], sheet.size)
