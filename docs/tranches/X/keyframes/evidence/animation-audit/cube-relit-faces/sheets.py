import glob,sys
from PIL import Image, ImageDraw
def sheets(d, cols=6, scale=0.4):
    fs=sorted(glob.glob(d+"/f*.png")); out=[]
    for s in range(0,len(fs),24):
        ims=[Image.open(f).convert("RGB") for f in fs[s:s+24]]
        w,h=int(ims[0].width*scale),int(ims[0].height*scale); rows=(len(ims)+cols-1)//cols
        S=Image.new("RGB",(cols*(w+2),rows*(h+2)),"white"); dr=ImageDraw.Draw(S)
        for k,im in enumerate(ims):
            x,y=(k%cols)*(w+2),(k//cols)*(h+2); S.paste(im.resize((w,h)),(x,y)); dr.text((x+4,y+3),str(s+k),fill="black")
        p=f"sheet-{d}-{s//24}.png"; S.save(p); out.append(p)
    return out
for d in sys.argv[1:]: print(sheets(d))
