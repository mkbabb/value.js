# SS-8 B08 cure witness (SS8-0241): the served detail contrast read from the eb-contrast cell's own
# frames AFTER the cure. Same read as eb-frame-cr.py (ground = mean of a 6x6 patch 12 px left of each
# ink box), but rects AND inks come from the cell's own JSON lines in <out> (the cured detail ink is
# no longer the pre-cure constant). Usage: python3 -I eb-frame-cr-cure.py <evidence-dir> <eb-out-file>
import sys, json
from PIL import Image
EV, OUTF = sys.argv[1], sys.argv[2]
cells = {}
for line in open(OUTF):
    for scheme in ("light", "dark"):
        tag = f"eb-contrast {scheme} "
        if line.startswith(tag):
            cells[scheme] = json.loads(line[len(tag):])  # last occurrence wins
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else ((v/255+0.055)/1.055)**2.4
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
def cr(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True); return round((x+0.05)/(y+0.05),2)
out={}
for scheme, cell in cells.items():
    im=Image.open(f"{EV}/eb-u1-plate-{scheme}.png").convert("RGB")
    out[scheme]={}
    for k in ("stmt","glyph","detail"):
        r=cell[k]["rect"]; ink=tuple(cell[k]["raw"][:3])
        x0=int(r[0]-12); y0=int(r[1]+r[3]/2-3)
        px=[im.getpixel((x,y)) for x in range(x0,x0+6) for y in range(y0,y0+6)]
        g=tuple(round(sum(p[i] for p in px)/len(px)) for i in range(3))
        out[scheme][k]={"ground":g,"ink":ink,"cr":cr(ink,g)}
print(json.dumps(out))
