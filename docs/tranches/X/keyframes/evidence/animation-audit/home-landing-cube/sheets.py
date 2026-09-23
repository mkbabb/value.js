import json,os,sys
from PIL import Image,ImageDraw
F=json.load(open("frames.json"))
def sheet(frs,name,box,scale=0.5,cols=6):
    w=int((box[2]-box[0])*scale); h=int((box[3]-box[1])*scale)
    rows=(len(frs)+cols-1)//cols
    S=Image.new("RGB",(cols*(w+2),rows*(h+14)),"#222"); d=ImageDraw.Draw(S)
    for k,f in enumerate(frs):
        im=Image.open("frames/"+f["name"]).convert("RGB").crop(box).resize((w,h))
        x=(k%cols)*(w+2); y=(k//cols)*(h+14)
        S.paste(im,(x,y+14)); d.text((x+2,y+1),f'#{f["i"]} {f["tag"]} {f["tRel"]:.0f}ms',fill="white")
    S.save("sheets/"+name)
m=[f for f in F if f["tag"]=="mount"]
sheet(m,"mount-00.png",(420,230,1020,670))
p=[f for f in F if f["tag"]=="play"]
for k in range(0,len(p),24):
    sheet(p[k:k+24],f"play-{k//24:02d}.png",(700,210,1220,690))
print(sorted(os.listdir("sheets")))
