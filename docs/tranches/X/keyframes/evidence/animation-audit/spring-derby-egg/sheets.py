import json,sys,os
from PIL import Image,ImageDraw
run=sys.argv[1]; box=(560,250,1350,440)
d=json.load(open(f'run{run}/samples.json')); idx=d['index']
os.makedirs(f'run{run}/sheets',exist_ok=True)
W,H=box[2]-box[0],box[3]-box[1]; cols=4
for s in range(0,len(idx),24):
    chunk=idx[s:s+24]; rows=(len(chunk)+cols-1)//cols
    sheet=Image.new('RGB',(cols*W,rows*(H+18)),'white'); dr=ImageDraw.Draw(sheet)
    for k,e in enumerate(chunk):
        im=Image.open(f"run{run}/{e['name']}").convert('RGB').crop(box)
        x,y=(k%cols)*W,(k//cols)*(H+18)
        sheet.paste(im,(x,y+18)); dr.text((x+4,y+3),f"#{e['i']} t={e['tMs']}ms",fill='black')
    sheet.save(f"run{run}/sheets/sheet{s//24:02d}_f{s:03d}-{s+len(chunk)-1:03d}.png")
print(os.listdir(f'run{run}/sheets'))
