import sys, glob
from PIL import Image, ImageDraw
def sheet(files, out, cols=6, w=360, labels=None):
    ims=[Image.open(f).convert('RGB') for f in files]
    h=int(ims[0].height*w/ims[0].width)
    rows=(len(ims)+cols-1)//cols
    S=Image.new('RGB',(cols*w,rows*(h+16)),'white'); d=ImageDraw.Draw(S)
    for k,im in enumerate(ims):
        x,y=(k%cols)*w,(k//cols)*(h+16)
        S.paste(im.resize((w,h)),(x,y+16)); d.text((x+4,y+2),labels[k] if labels else files[k].split('/')[-1],fill='black')
    S.save(out)
if __name__=='__main__':
    f=sorted(glob.glob('frames/f*.png'))
    for s in range(0,len(f),24): sheet(f[s:s+24], f'sheet-seek-{s:02d}-{s+23:02d}.png')
