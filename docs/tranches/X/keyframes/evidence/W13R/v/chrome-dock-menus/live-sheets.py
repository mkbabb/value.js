import glob,re,os,sys
from PIL import Image, ImageDraw
base=os.path.dirname(os.path.abspath(__file__))
def sheet(name,lo,hi,box=(520,20,920,290),step=1):
    fs=sorted(glob.glob(f"{base}/live-dock/{name}/s*.jpg"))
    sel=[f for f in fs if lo<=int(re.search(r"_(\d+)ms",f).group(1))<=hi][::step][:24]
    tw,th=box[2]-box[0],box[3]-box[1]
    ims=[Image.open(f).crop(tuple(v*(Image.open(f).size[0]//1440) for v in box)).resize((tw,th),Image.LANCZOS) for f in sel]
    cols=6; rows=(len(ims)+5)//6
    sh=Image.new("RGB",(cols*tw,rows*(th+16)),(40,40,40)); d=ImageDraw.Draw(sh)
    for k,(im,f) in enumerate(zip(ims,sel)):
        x,y=(k%6)*tw,(k//6)*(th+16); sh.paste(im,(x,y+16)); d.text((x+3,y+2),os.path.basename(f),fill=(255,255,0))
    out=f"{base}/sheets/live-dock__{name}__{lo}-{hi}ms.png"; sh.save(out); print(os.path.basename(out),len(sel))
if __name__=="__main__":
    for a in sys.argv[1:]:
        n,lo,hi,st=a.split(":"); sheet(n,int(lo),int(hi),step=int(st))
