# contact sheets: 24 frames per sheet (2 cols x 12 rows), each labelled with index and time.
import json, glob, sys
from PIL import Image, ImageDraw
def sheet(paths, labels, out, scale=0.5, cols=2, crop=None):
    ims=[Image.open(p).convert("RGB") for p in paths]
    if crop: ims=[im.crop(crop) for im in ims]
    w,h=ims[0].size; tw,th=int(w*scale),int(h*scale)
    rows=(len(ims)+cols-1)//cols
    S=Image.new("RGB",(cols*tw,rows*th),"white"); d=ImageDraw.Draw(S)
    for k,(im,l) in enumerate(zip(ims,labels)):
        x,y=(k%cols)*tw,(k//cols)*th; S.paste(im.resize((tw,th)),(x,y))
        d.rectangle([x,y,x+tw-1,y+th-1],outline=(200,0,0)); d.text((x+4,y+2),l,fill=(255,0,0))
    S.save(out)
seek=json.load(open("seek.json"))
fr=sorted(glob.glob("frames/f*.png"))
for s in range(0,len(fr),24):
    sheet(fr[s:s+24],[f"f{i} t={seek['seek'][i]['t']}ms" for i in range(s,min(s+24,len(fr)))],f"sheet-seek-{s//24:02d}.png")
sc=json.load(open("screencast.json")); b=sc["box"]
crop=(int(b["x"])-10,int(b["y"])-30,int(b["x"]+b["width"])+10,int(b["y"]+b["height"])+20)
sf=sorted(glob.glob("screencast/s*.png"))
for s in range(0,len(sf),24):
    sheet(sf[s:s+24],[f"s{i} {sc['idx'][i]['t']:.0f}ms" for i in range(s,min(s+24,len(sf)))],f"screencast/sheet-live-{s//24:02d}.png",crop=crop)
print(len(fr),len(sf))
