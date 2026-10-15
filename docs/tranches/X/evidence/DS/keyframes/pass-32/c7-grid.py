import sys
from PIL import Image
# grid contrast: mean |px(x) - px(x+4)| at 80px gridline columns over a row band
for f in sys.argv[2:]:
    im = Image.open(f).convert("L"); x0,y0,x1,y1 = map(int, sys.argv[1].split(","))
    tot=n=0
    for x in range(((x0//80)+1)*80, x1, 80):
        for y in range(y0, y1, 3):
            tot += abs(im.getpixel((x,y)) - (im.getpixel((x-4,y))+im.getpixel((x+4,y)))/2); n+=1
    print(f, round(tot/max(n,1),2))
