# (screencast frames arrive at 2x device pixels; crops are in CSS px and scaled per image)
# Contact sheets, 24 frames per sheet (6x4). rt: real-time screencast frames (full viewport @0.25, labelled seg/#i/t since the segment's first frame + nearest marker).
# seek: method-(1) seek frames (crop x0..1100,y40..700 @0.33, labelled dir/#i/t ms).
import json, os
from PIL import Image, ImageDraw
os.makedirs("sheets", exist_ok=True)
fr = json.load(open("rt-frames.json")); L = json.load(open("rt-log.json"))
def sheet(items, crop, S, name, label):
    X0, Y0, X1, Y1 = crop; tw, th = int((X1-X0)*S), int((Y1-Y0)*S)
    sh = Image.new("RGB", (tw*6, th*4), "white")
    for k, it in enumerate(items):
        im0 = Image.open(it["path"]).convert("RGB"); k0 = im0.size[0]/1440; im = im0.crop(tuple(int(v*k0) for v in crop)).resize((tw, th), Image.LANCZOS)
        d = ImageDraw.Draw(im); d.rectangle([0, 0, 150, 13], fill=(255, 255, 255)); d.text((3, 1), label(it), fill=(200, 0, 0)); d.rectangle([0, 0, tw-1, th-1], outline=(160, 160, 160))
        sh.paste(im, ((k % 6)*tw, (k//6)*th))
    sh.save("sheets/" + name)
seg0 = {}
for f in fr: seg0.setdefault(f["seg"], f["ts"])
for f in fr: f["path"] = "rt/" + f["name"]; f["rel"] = int((f["ts"]-seg0[f["seg"]])*1000)
for s in range(0, len(fr), 24):
    ch = fr[s:s+24]; sheet(ch, (0, 0, 1440, 900), 0.25, f"rt-{s:04d}-{s+len(ch)-1:04d}.png", lambda it: f"{it['seg']} #{it['i']} +{it['rel']}ms")
M = json.load(open("seek-meta.json"))
for dir in ["close", "open"]:
    st = M["seek"][dir]["steps"]
    items = [{"path": f"seek/{dir}-{x['i']:02d}.png", **x} for x in st]
    for s in range(0, len(items), 24):
        ch = items[s:s+24]; sheet(ch, (0, 40, 1100, 700), 0.33, f"seek-{dir}-{s:02d}-{s+len(ch)-1:02d}.png", lambda it: f"{dir} #{it['i']} t={it['t']:.0f}ms w={it['w'][2] if it['w'] else '-'}")
print(len(os.listdir("sheets")))
