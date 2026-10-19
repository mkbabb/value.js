# Contact sheets, 24 frames per sheet, 4x NEAREST upscale of the button clip.
import json, os
from PIL import Image, ImageDraw
M = json.load(open("meta.json")); os.makedirs("sheets", exist_ok=True)
C = M["clip"]
def sheet(frames, crop, scale, cols, label, prefix, path_of):
    x0,y0,x1,y1 = crop; tw,th = int((x1-x0)*scale), int((y1-y0)*scale)
    for s in range(0, len(frames), 24):
        chunk = frames[s:s+24]; rows = (len(chunk)+cols-1)//cols
        sh = Image.new("RGB", (tw*cols, (th+14)*rows), "white")
        for k,f in enumerate(chunk):
            im = Image.open(path_of(f)).convert("RGB").crop(crop).resize((tw,th), Image.NEAREST)
            cell = Image.new("RGB", (tw, th+14), "white"); cell.paste(im, (0,14))
            d = ImageDraw.Draw(cell); d.text((2,1), label(f), fill=(200,0,0)); d.rectangle([0,0,tw-1,th+13], outline=(170,170,170))
            sh.paste(cell, ((k%cols)*tw, (k//cols)*(th+14)))
        sh.save(f"sheets/{prefix}-{s:03d}-{s+len(chunk)-1:03d}.png")
S = M["parts"]["step"]["frames"]
sheet(S, (0,0,C["width"],C["height"]), 3, 8, lambda f: f"#{f['i']} {f['t']:.0f}ms o{float(f['check'][1]):.2f}", "step", lambda f: f["name"])
L = M["parts"]["live"]["frames"]; t0 = L[0]["ts"]
k = Image.open(L[0]["name"]).size[0]/1440  # screencast frames arrive at the window backing scale
sheet(L, (int(C["x"]*k),int(C["y"]*k),int((C["x"]+C["width"])*k),int((C["y"]+C["height"])*k)), 1.5, 8, lambda f: f"#{f['i']} {int((f['ts']-t0)*1000)}ms", "live", lambda f: f["name"])
print(sorted(os.listdir("sheets")))
