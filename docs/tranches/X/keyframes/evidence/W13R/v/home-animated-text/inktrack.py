# Per-glyph ink-top tracking across live screencast frames (lift in px, from pixels, not from styles).
import json, glob
from PIL import Image
import numpy as np
st=json.load(open("stack.json")); sc=json.load(open("screencast.json"))
chars=[(o["ch"],o["x"]) for o in st["out"]]
y0,y1=380,580
fr=sorted(glob.glob("screencast/s*.png"))
rows=[]
for k,p in enumerate(fr):
    a=np.asarray(Image.open(p).convert("L"),dtype=np.int16)[y0:y1]
    tops=[]
    for ch,x in chars:
        band=a[:,x-3:x+4]; dark=np.where((band<70).any(axis=1))[0]
        tops.append(int(dark[0])+y0 if len(dark) else -1)
    rows.append(tops)
R=np.array(rows); base=np.median(R,axis=0)
lift=(R-base)
json.dump({"chars":[c for c,_ in chars],"t":[x["t"] for x in sc["idx"]],"lift":lift.tolist()},open("inktrack.json","w"))
# summary: per frame the leading lifted glyph
for k in range(len(fr)):
    l=lift[k]; m=int(np.argmin(l))
    if k%6==0 or 128<=k<=140: print(k, f'{sc["idx"][k]["t"]:.0f}', " ".join(f"{int(v):3d}" for v in l))
