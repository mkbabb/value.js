# Contact sheets, 24 frames per sheet. Labels: frame index + key metric.
import json, os
from PIL import Image, ImageDraw
M = json.load(open("meta.json")); os.makedirs("sheets", exist_ok=True)
def sheet(frames, crop, scale, cols, label, prefix, path_of):
    x0,y0,x1,y1 = crop; tw,th = int((x1-x0)*scale), int((y1-y0)*scale)
    for s in range(0, len(frames), 24):
        chunk = frames[s:s+24]; rows = (len(chunk)+cols-1)//cols
        sh = Image.new("RGB", (tw*cols, (th+14)*rows), "white")
        for k,f in enumerate(chunk):
            im = Image.open(path_of(f)).convert("RGB").crop(crop).resize((tw,th), Image.LANCZOS)
            cell = Image.new("RGB", (tw, th+14), "white"); cell.paste(im, (0,14))
            d = ImageDraw.Draw(cell); d.text((2,1), label(f), fill=(200,0,0)); d.rectangle([0,0,tw-1,th+13], outline=(170,170,170))
            sh.paste(cell, ((k%cols)*tw, (k//cols)*(th+14)))
        sh.save(f"sheets/{prefix}-{s:03d}-{s+len(chunk)-1:03d}.png")
A = M["parts"]["A"]["frames"]
# drag: picker SVG column (clip-relative), 2x
sheet(A, (28, 24, 100, 252), 2, 12, lambda f: f"#{f['i']} e{f['err']}", "drag", lambda f: f["name"])
# live screencast: full-frame crop of the same column (page coords)
B = M["parts"]["B"]["frames"]; t0 = B[0]["ts"]
sheet(B, (89, 76, 161, 304), 2, 12, lambda f: f"#{f['i']} {int((f['ts']-t0)*1000)}ms", "live", lambda f: f"live/s{f['i']:03d}.png")
for part in ("open","close"):
    D = M["parts"]["D"].get(part)
    if D and D.get("frames"):
        c = D["clip"]; sheet(D["frames"], (0,0,c["width"],c["height"]), 0.5, 8, lambda f: f"#{f['i']} t{f['t']}", f"panel-{part}", lambda f: f["name"])
T = M["parts"]["D"].get("tfpDrag")
if T:
    c = M["parts"]["D"]["open"]["clip"]; sheet(T, (0,0,c["width"],c["height"]), 0.5, 8, lambda f: f"#{f['i']} e{f['err']}", "tfp", lambda f: f["name"])
print(sorted(os.listdir("sheets")))
