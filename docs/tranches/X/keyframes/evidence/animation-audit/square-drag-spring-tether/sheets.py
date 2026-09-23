import json, os
from PIL import Image, ImageDraw
D=os.path.dirname(os.path.abspath(__file__)); F=D+"/frames"
idx=json.load(open(F+"/index.json"))
crop=(698,227,1218,673)  # stage core around box travel envelope
W,H=crop[2]-crop[0],crop[3]-crop[1]; s=0.5; tw,th=int(W*s),int(H*s)
for k in range(0,len(idx),24):
    grp=idx[k:k+24]; sheet=Image.new("RGB",(tw*6,(th+14)*4),"white"); d=ImageDraw.Draw(sheet)
    for j,e in enumerate(grp):
        im=Image.open(f"{F}/f{e['i']:03d}.png").convert("RGB").crop(crop).resize((tw,th),Image.LANCZOS)
        x,y=(j%6)*tw,(j//6)*(th+14); sheet.paste(im,(x,y+14)); d.text((x+3,y+1),f"f{e['i']} {e['ms']:.0f}ms",fill="black")
    sheet.save(f"{D}/sheet-{k//24:02d}.png")
print(len(idx), [ (e['i'],e['ms']) for e in idx[::10]])
