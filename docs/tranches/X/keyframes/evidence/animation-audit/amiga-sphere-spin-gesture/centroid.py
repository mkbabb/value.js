import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB"); W, H = im.size; px = im.load()
xs = []; ys = []
for y in range(0, H, 2):
    for x in range(0, W, 2):
        r, g, b = px[x, y]
        if r - g > 40 and r - b > 40: xs.append(x); ys.append(y)
if not xs: print("none"); sys.exit()
print(f"{(min(xs)+max(xs))/2} {(min(ys)+max(ys))/2} {max(xs)-min(xs)} {len(xs)}")
