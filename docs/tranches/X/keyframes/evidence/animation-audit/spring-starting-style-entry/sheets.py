import json,os,sys
from PIL import Image,ImageDraw
D=os.path.dirname(os.path.abspath(__file__))
o=json.load(open(f"{D}/capture.json"))
for run in ["A-mount-entry","B-dismiss-exit","C-reveal-entry","D-dismiss-exit2","E-reveal-entry2"]:
    rows=o["runs"][run]
    for s in range(0,len(rows),24):
        W,H=400,120; cols=4
        sheet=Image.new("RGB",(cols*W,6*(H+16)),"white"); d=ImageDraw.Draw(sheet)
        for k,i in enumerate(range(s,min(s+24,len(rows)))):
            im=Image.open(f"{D}/{run}/f{i:02d}.png").crop((180,0,580,120))
            x=(k%cols)*W; y=(k//cols)*(H+16)
            sheet.paste(im,(x,y+16)); r=rows[i]
            d.text((x+4,y+2),f"{run} f{i:02d} t={r['t']:.0f}ms op={float(r['op']):.3f} {r['disp']}",fill="black")
        sheet.save(f"{D}/sheet-{run}-{s//24}.png")
print("ok")
