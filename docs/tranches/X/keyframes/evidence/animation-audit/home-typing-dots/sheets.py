# contact sheets: seek frames (24/sheet) + screencast crops (24/sheet); plus per-dot ink from pixels
import json, glob
from PIL import Image, ImageDraw
D = __import__("os").path.dirname(__file__) or "."
meta = json.load(open(f"{D}/frames.json")); clip = meta["clip"]; rows = meta["rows"]
def sheet(imgs, labels, out, cols=6):
    w, h = imgs[0].size; r = (len(imgs) + cols - 1) // cols
    S = Image.new("RGB", (cols * w, r * (h + 16)), "white"); d = ImageDraw.Draw(S)
    for i, (im, lb) in enumerate(zip(imgs, labels)):
        x, y = (i % cols) * w, (i // cols) * (h + 16); S.paste(im.convert("RGB"), (x, y + 16)); d.text((x + 3, y + 2), lb, fill="black")
    S.save(out)
fr = sorted(glob.glob(f"{D}/frames/f-*.png"))
for s in range(0, len(fr), 24):
    sheet([Image.open(p) for p in fr[s:s+24]], [f"k{r['k']} t{r['t']-2400:.0f} o={'/'.join(str(v) for v in r['measured'])}" for r in rows[s:s+24]], f"{D}/sheet-seek-{s//24}.png")
# pixel ink per dot (darkest pixel luminance in each dot's column band, bottom 40% where the glyph sits)
ink = []
dotx = [1260.172, 1297.969, 1335.766]
for p in fr:
    im = Image.open(p).convert("L")
    v = []
    for x0 in dotx:
        bx = int(x0 - clip["x"]); crop = im.crop((bx, 0, bx + 37, im.size[1])); v.append(min(crop.get_flattened_data()))
    ink.append(v)
json.dump(ink, open(f"{D}/seek-ink.json", "w"))
sc = sorted(glob.glob(f"{D}/screencast/sc-*.jpg"))
def _c(p):
    im = Image.open(p); f = im.size[0] / 1440
    return im.crop((int(clip["x"]*f), int(clip["y"]*f), int((clip["x"]+clip["width"])*f), int((clip["y"]+clip["height"])*f))).resize((clip["width"], clip["height"]))
cr = [_c(p) for p in sc]  # screencast is physical-pixel (2x on the Retina panel); crop scaled then resized to CSS px
ts = json.load(open(f"{D}/screencast/timestamps.json")); t0 = ts[0]["ts"]
for s in range(0, len(cr), 24):
    sheet(cr[s:s+24], [f"sc{i} +{(ts[i]['ts']-t0)*1000:.0f}ms" for i in range(s, min(s+24, len(cr)))], f"{D}/sheet-screencast-{s//24}.png")
scink = []
for im in cr:
    g = im.convert("L"); scink.append([min(g.crop((int(x0 - clip["x"]), 0, int(x0 - clip["x"]) + 37, g.size[1])).get_flattened_data()) for x0 in dotx])
json.dump({"t_ms": [round((t["ts"] - t0) * 1000) for t in ts], "ink": scink}, open(f"{D}/screencast-ink.json", "w"))
print("seek ink", ink[:48])
dts = [round((ts[i]["ts"] - ts[i-1]["ts"]) * 1000) for i in range(1, len(ts))]
print("sc frames", len(ts), "span ms", round((ts[-1]["ts"] - t0) * 1000), "gaps>20ms", [x for x in dts if x > 20])
