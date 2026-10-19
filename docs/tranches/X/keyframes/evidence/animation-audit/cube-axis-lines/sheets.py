# contact sheets: 24 frames per sheet, labelled with frame index
import glob, os
from PIL import Image, ImageDraw
def sheet(files, out, cols=6, scale=0.4, labels=None):
    ims=[Image.open(f).convert("RGB") for f in files]
    w,h=ims[0].size; tw,th=int(w*scale),int(h*scale)
    rows=(len(ims)+cols-1)//cols
    S=Image.new("RGB",(cols*tw,rows*th),"white"); d=ImageDraw.Draw(S)
    for i,im in enumerate(ims):
        x,y=(i%cols)*tw,(i//cols)*th
        S.paste(im.resize((tw,th)),(x,y))
        d.rectangle([x,y,x+60,y+14],fill="black"); d.text((x+2,y+1),labels[i] if labels else os.path.basename(files[i])[:-4],fill="yellow")
    S.save(out)
for axis in "xyz":
    for ph in ("in","out"):
        fs=sorted(glob.glob(f"frames/{axis}-{ph}-*.png"))
        for k in range(0,len(fs),24):
            sheet(fs[k:k+24],f"sheet-{axis}-{ph}-{k//24}.png")
sc=sorted(glob.glob("screencast/sc-*.png"))
for k in range(0,len(sc),24):
    fs=sc[k:k+24]
    ims=[Image.open(f).convert("RGB").crop((598,191,1318,711)) for f in fs]
    tmp=[]
    for f,im in zip(fs,ims):
        p=f.replace("screencast/","/tmp/crop-") ; im.save(p); tmp.append(p)
    sheet(tmp,f"sheet-screencast-{k//24:02d}.png",labels=[os.path.basename(f)[3:6] for f in fs])
    for p in tmp: os.remove(p)
print("ok")
