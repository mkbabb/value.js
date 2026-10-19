# X-DS value pass 12 (V12-01): sample the dark plate stamp vs its field, picker 1440 dark.
# Stamp = the 8px band past the left plate's bottom edge and the About plate's right edge.
import sys, json
from PIL import Image
def lum(c):
    def f(v):
        v/=255; return v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4
    r,g,b=c[:3]; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def avg(im, box):
    px=[im.getpixel((x,y)) for x in range(box[0],box[2]) for y in range(box[1],box[3])]
    return tuple(round(sum(p[i] for p in px)/len(px)) for i in range(3))
out={}
for name,path in [(a.split("=")[0],a.split("=")[1]) for a in sys.argv[1:]]:
    im=Image.open(path).convert("RGB"); sx=im.width/1440
    S=lambda b: tuple(int(v*sx) for v in b)
    cells={}
    for k,(st,fd) in {"left-plate-bottom":((380,736,420,740),(380,752,420,760)),
                     "about-plate-right":((1243,380,1247,420),(1258,380,1268,420))}.items():
        s,f=avg(im,S(st)),avg(im,S(fd))
        L1,L2=sorted([lum(s),lum(f)],reverse=True)
        cells[k]={"stamp":s,"field":f,"ratio":round((L1+0.05)/(L2+0.05),2)}
    out[name]=cells
print(json.dumps(out,indent=1))
