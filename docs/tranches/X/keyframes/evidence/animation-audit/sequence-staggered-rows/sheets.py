# contact sheets: 24 frames per sheet, 6x4, card-clipped, labelled
import json, glob, os
from PIL import Image, ImageDraw
L = json.load(open('capture-log.json')); c = L['clip']
def sheet(files, name, crop, labels):
    for s in range(0, len(files), 24):
        chunk = files[s:s+24]; W, H = 352, 233
        out = Image.new('RGB', (W*6, (H+16)*4), 'white'); d = ImageDraw.Draw(out)
        for k, f in enumerate(chunk):
            im = Image.open(f).convert('RGB')
            if crop: im = im.crop((c['x'], c['y'], c['x']+c['width'], c['y']+c['height']))
            im = im.resize((W, H))
            x, y = (k % 6)*W, (k//6)*(H+16)
            out.paste(im, (x, y+16)); d.text((x+4, y+2), labels[s+k], fill='black')
        out.save(f'sheet-{name}-{s//24:02d}.png')
seek = sorted(glob.glob('seek/f*.png'))
sheet(seek, 'seek', False, [f"seek#{i} t={L['seek'][i]['time']:.0f}ms" for i in range(len(seek))])
live = sorted(glob.glob('live/s*.png')); ts = L['frameTs']
sheet(live, 'live', True, [f"live#{i} +{(ts[i]-ts[0])*1000:.0f}ms" for i in range(len(live))])
scr = sorted(glob.glob('scrub/s*.png'))
sheet(scr, 'scrub', True, [f"scrub#{i}" for i in range(len(scr))])
print(len(seek), len(live), len(scr), Image.open(live[0]).size)
