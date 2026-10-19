# crop screencast frames to the dock region, label, and compose contact sheets (24 frames per sheet)
import json, os
from PIL import Image, ImageDraw
D=os.path.dirname(os.path.abspath(__file__))
fr=json.load(open(f"{D}/rt-frames.json")); L=json.load(open(f"{D}/rt-log.json"))
marks={e["mark"]:e["t"] for e in L["log"] if "mark" in e}; wall={m["m"]:m["wall"] for m in L["markers"]}
off=wall["hover-in-1"]-marks["hover-in-1"]/1000
log=[e for e in L["log"] if "mark" not in e]
def state_at(ts):
    p=(ts-off)*1000; best=min(log,key=lambda e:abs(e["t"]-p)); return best
os.makedirs(f"{D}/sheets",exist_ok=True)
BOX=(420,30,1020,240)  # CSS px; frames are 2x device px (screencast), scaled below
rows=[]
for f in fr:
    s=state_at(f["ts"]); rows.append({"i":f["i"],"ts":f["ts"],"cls":s["cls"][:4],"morph":s["morph"],"mt":s["mt"],"w":s["w"],"h":s["h"]})
json.dump(rows,open(f"{D}/frame-index.json","w"))
def sheet(idxs,name,scale=1.0,cols=4):
    tiles=[]
    for i in idxs:
        im0=Image.open(f"{D}/rt/f{i:04d}.png").convert("RGB"); k=im0.width/1440; im=im0.crop(tuple(int(v*k) for v in BOX)).resize((BOX[2]-BOX[0],BOX[3]-BOX[1]),Image.LANCZOS)
        if scale!=1: im=im.resize((int(im.width*scale),int(im.height*scale)),Image.LANCZOS)
        d=ImageDraw.Draw(im); r=rows[i]; d.rectangle((0,0,im.width,14),fill=(0,0,0)); d.text((3,1),f"#{i} {r['cls']} {'M' if r['morph'] else '-'} t={r['mt'][:5]} w={r['w']} h={r['h']}",fill=(255,255,0))
        tiles.append(im)
    w,h=tiles[0].size; n=len(tiles); rws=(n+cols-1)//cols
    S=Image.new("RGB",(w*cols,h*rws),(40,40,40))
    for k,t in enumerate(tiles): S.paste(t,((k%cols)*w,(k//cols)*h))
    S.save(f"{D}/sheets/{name}.png")
import sys
if sys.argv[1]=="all":
    for s in range(0,len(fr),24): sheet(list(range(s,min(s+24,len(fr)))),f"all-{s:04d}",scale=0.5,cols=6)
else:
    a,b=int(sys.argv[2]),int(sys.argv[3]); sheet(list(range(a,b)),sys.argv[1],cols=int(sys.argv[4]) if len(sys.argv)>4 else 4)
