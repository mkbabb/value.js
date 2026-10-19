# SS-8 B08 EB U-1: served contrast read from the eb-contrast cell's own full-page frames (1440x900, DPR 1).
# Ground = mean of a 6x6 patch 12 px left of each ink box (rects from eb.out.txt); ink = the specified colour.
import sys, json
from PIL import Image
EV = sys.argv[1]
cells = {
 "light": {"stmt": ([814.7,375.9,340.6,28.0],(28,25,23)), "glyph": ([973,341.9,24,24],(96,0,4)), "detail": ([768.5,413.9,433.0,23.0],(46,43,43))},
 "dark":  {"stmt": ([814.7,375.9,340.6,28.0],(233,230,226)), "glyph": ([973,341.9,24,24],(255,121,108)), "detail": ([768.5,413.9,433.0,23.0],(164,162,160))},
}
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else ((v/255+0.055)/1.055)**2.4
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
def cr(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True); return round((x+0.05)/(y+0.05),2)
out={}
for scheme,items in cells.items():
    im=Image.open(f"{EV}/eb-u1-plate-{scheme}.png").convert("RGB")
    out[scheme]={}
    for k,(r,ink) in items.items():
        x0=int(r[0]-12); y0=int(r[1]+r[3]/2-3)
        px=[im.getpixel((x,y)) for x in range(x0,x0+6) for y in range(y0,y0+6)]
        g=tuple(round(sum(p[i] for p in px)/len(px)) for i in range(3))
        out[scheme][k]={"ground":g,"ink":ink,"cr":cr(ink,g)}
print(json.dumps(out))
