import json,sys,os
from PIL import Image, ImageDraw
run=sys.argv[1]; J=json.load(open(f"{run}/frames.json")); F=J["frames"]
os.makedirs(f"{run}/sheets",exist_ok=True)
X0,Y0,W,H=740,230,440,440; S=220; COLS=6
t0=F[0]["ts"]
for k in range(0,len(F),24):
    chunk=F[k:k+24]; rows=(len(chunk)+COLS-1)//COLS
    sheet=Image.new("RGB",(COLS*S,rows*(S+16)),"white"); d=ImageDraw.Draw(sheet)
    for j,f in enumerate(chunk):
        im=Image.open(f"{run}/frames/f{f['i']:04d}.png").convert("RGB").crop((X0,Y0,X0+W,Y0+H)).resize((S,S))
        x=(j%COLS)*S; y=(j//COLS)*(S+16); sheet.paste(im,(x,y+16))
        d.text((x+3,y+2),f"#{f['i']} {f['ph']} {int((f['ts']-t0)*1000)}ms",fill="black")
    sheet.save(f"{run}/sheets/sheet-{k:04d}-{k+len(chunk)-1:04d}.png")
print(len(F), "sheets", (len(F)+23)//24)
from collections import OrderedDict
o=OrderedDict()
for f in F: o.setdefault(f["ph"],[]).append(f["i"])
for p,ix in o.items(): print(p, ix[0], ix[-1], len(ix))
