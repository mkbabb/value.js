# 1:1 strips of the x-axis line (left of the die) + an ink metric per frame
import glob, json
from PIL import Image, ImageDraw
BOX=(500,440,800,500)  # viewport coords, x-line segment left of the die, clear of panels
def ink(im):
    c=im.crop(BOX); px=c.load(); w,h=c.size; s=0; glow=0
    for x in range(w):
        col=[px[x,y] for y in range(h)]
        g=min(p[1] for p in col); s+=max(0,245-g)
        glow+=sum(1 for p in col if p[0]-p[1]>25)  # red-tinted pixels (stroke + bloom width)
    return round(s/w,1), round(glow/w,2)
def strip(files, out, off=(0,0)):
    rows=[]; met=[]
    for f in files:
        im=Image.open(f).convert("RGB")
        box=(BOX[0]-off[0],BOX[1]-off[1],BOX[2]-off[0],BOX[3]-off[1])
        im2=Image.new("RGB",im.size); 
        c=im.crop(box); rows.append((f,c))
        full=Image.new("RGB",(1440,900),"white"); full.paste(im,off); met.append(ink(full))
    W=300+70; H=60
    for k in range(0,len(rows),24):
        S=Image.new("RGB",(W*2,H*12),"white"); d=ImageDraw.Draw(S)
        for i,(f,c) in enumerate(rows[k:k+24]):
            x,y=(i//12)*W,(i%12)*H
            S.paste(c,(x+70,y)); d.text((x+2,y+20),f.split("/")[-1][:-4][-10:],fill="black"); d.text((x+2,y+34),str(met[k+i]),fill="blue")
        S.save(out.replace(".png",f"-{k//24}.png"))
    return met
res={}
for ph in ("in","out"):
    res[f"seek-x-{ph}"]=strip(sorted(glob.glob(f"frames/x-{ph}-*.png")),f"strip-seek-x-{ph}.png",off=(598,191))
sc=sorted(glob.glob("screencast/sc-*.png"))
res["sc-down1"]=strip(sc[14:38],"strip-sc-xdown1.png")
res["sc-up1"]=strip(sc[50:74],"strip-sc-xup1.png")
json.dump(res,open("ink-metrics.json","w"))
for k,v in res.items(): print(k,[m[0] for m in v]); print("  glow",[m[1] for m in v])
