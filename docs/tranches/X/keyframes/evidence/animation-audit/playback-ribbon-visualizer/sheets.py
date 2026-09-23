import json, glob, os
from PIL import Image, ImageDraw
def sheet(paths, labels, out, cols=4, crop=None, scale=1.0):
    ims=[]
    for p in paths:
        im=Image.open(p).convert("RGB")
        if crop: im=im.crop(crop)
        if scale!=1.0: im=im.resize((int(im.width*scale),int(im.height*scale)))
        ims.append(im)
    w,h=ims[0].size; rows=(len(ims)+cols-1)//cols
    S=Image.new("RGB",(cols*w,rows*(h+16)),"white"); d=ImageDraw.Draw(S)
    for i,(im,l) in enumerate(zip(ims,labels)):
        x=(i%cols)*w; y=(i//cols)*(h+16); S.paste(im,(x,y+16)); d.text((x+4,y+2),l,fill=(200,0,0))
    S.save(out)
os.makedirs("sheets",exist_ok=True)
def chunks(seq,n=24): return [seq[i:i+n] for i in range(0,len(seq),n)]
# kbd
k=json.load(open("kbd/samples.json"))
fs=sorted(glob.glob("kbd/f*.png"))
for j,c in enumerate(chunks(list(range(len(fs))))):
    sheet([fs[i] for i in c],[f"k{i} v={k[i]['valNow']:.0f} b={k[i]['ballP']:.3f}" for i in c],f"sheets/kbd-{j}.png",cols=4,scale=0.75)
# live
fr={f["n"]:f["ts"] for f in json.load(open("live/frames.json"))}; t0=min(fr.values())
lf=sorted(glob.glob("live/s*.jpg"))
for j,c in enumerate(chunks(list(range(len(lf))))):
    sheet([lf[i] for i in c],[(f"s{i} +{(fr[i]-t0)*1000:.0f}ms" if i in fr else f"s{i} late") for i in c],f"sheets/live-{j:02d}.png",cols=6,crop=(120,940,970,1360),scale=0.35)
# drag
d=json.load(open("drag/samples.json")); df=sorted(glob.glob("drag/f*.png"))
for j,c in enumerate(chunks(list(range(len(df))))):
    sheet([df[i] for i in c],[os.path.basename(df[i]) for i in c],f"sheets/drag-{j}.png",cols=4,scale=0.75)
bf=sorted(glob.glob("balldrag/f*.png")); sheet(bf,[os.path.basename(x) for x in bf],"sheets/balldrag-0.png",cols=4,scale=0.75)
rf=sorted(glob.glob("reverse/r*.png")); sheet(rf,[os.path.basename(x) for x in rf],"sheets/reverse-0.png",cols=4,scale=0.75)
print(len(lf), "live frames")
