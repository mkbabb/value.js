# Contact sheets: 24 frames per sheet (6x4), cropped (CSS px; frames are 2x device px), labelled #i · ms.
import json, os, sys
from PIL import Image, ImageDraw
OUT = os.path.dirname(os.path.abspath(__file__)) + "/"
jobs = {"A_edit_single": (60,150,500,640), "B_edit_burst": (60,150,500,640), "C_remove_middle": (60,150,500,640),
        "D_remove_last": (60,150,500,640), "E_dialog_open": (340,160,1100,740), "F_dialog_close": (340,160,1100,740), "G_dialog_submit": (340,160,1100,740)}
for d, (x0, y0, x1, y1) in jobs.items():
    fr = json.load(open(OUT + d + "/frames.json"))["frames"]
    tw = 300; th = int(tw * (y1 - y0) / (x1 - x0))
    for s in range(0, len(fr), 24):
        chunk = fr[s:s + 24]
        W = Image.new("RGB", (6 * (tw + 4) + 4, ((len(chunk) + 5) // 6) * (th + 18) + 4), (34, 34, 34))
        dr = ImageDraw.Draw(W)
        for k, f in enumerate(chunk):
            im = Image.open(OUT + d + "/f%03d.png" % f["i"]); sc = im.size[0] / 1440
            im = im.crop((int(x0 * sc), int(y0 * sc), int(x1 * sc), int(y1 * sc))).resize((tw, th), Image.LANCZOS)
            cx = 4 + (k % 6) * (tw + 4); cy = 4 + (k // 6) * (th + 18)
            W.paste(im, (cx, cy + 14)); dr.text((cx + 2, cy), "#%d  %dms" % (f["i"], f["ms"]), fill=(255, 255, 255))
        name = "sheet-%s-%d.png" % (d, s // 24); W.save(OUT + name); print(name, len(chunk))
