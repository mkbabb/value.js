# Contact sheets: 24 frames per sheet (6x4), crop of the stage around ball+floor shadow, labelled i / t(ms) / py.
import json
from PIL import Image, ImageDraw
M=json.load(open("meta.json")); ms=json.load(open("measure.json"))
fr=M["frames"]; t0=fr[0]["ts"]
X0,Y0,X1,Y1=600,320,1320,776; S=0.5
tw,th=int((X1-X0)*S),int((Y1-Y0)*S)
import os; os.makedirs("sheets",exist_ok=True)
for s in range(0,len(fr),24):
    sheet=Image.new("RGB",(tw*6,th*4),"white")
    for k,f in enumerate(fr[s:s+24]):
        im=Image.open("frames/"+f["name"]).convert("RGB").crop((X0,Y0,X1,Y1)).resize((tw,th),Image.LANCZOS)
        d=ImageDraw.Draw(im); m=ms[f["i"]]
        d.text((4,3),f"#{f['i']} t={int((f['ts']-t0)*1000)}ms py={m['py']}",fill=(200,0,0))
        d.rectangle([0,0,tw-1,th-1],outline=(180,180,180))
        sheet.paste(im,((k%6)*tw,(k//6)*th))
    sheet.save(f"sheets/sheet-{s:04d}-{min(s+23,len(fr)-1):04d}.png")
print(len(os.listdir("sheets")))
