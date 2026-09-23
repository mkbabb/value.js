# Per-frame measurement of the contact-shadow blob vs the ball, from the screencast frames.
import json, numpy as np
from PIL import Image
D="./"
M=json.load(open(D+"meta.json")); L=np.array(json.load(open(D+"raflog.json")))
fr=M["frames"]
X0,Y0,X1,Y1=518,127,1397,773
imgs=[np.asarray(Image.open(D+"frames/"+f["name"]).convert("RGB"))[Y0:Y1,X0:X1].astype(np.float32) for f in fr]
A=np.stack(imgs)                        # n,h,w,3
lum=A.mean(axis=3)
sat=A.max(axis=3)-A.min(axis=3)
bg=np.percentile(lum,90,axis=0)          # shadow only darkens → high percentile = floor without shadow
rows=slice(690-Y0,772-Y0)                # floor band in FRONT of the contact point (never occluded by the ball)
out=[]
xs=np.arange(X1-X0)+X0; ys=np.arange(Y1-Y0)+Y0
for i,f in enumerate(fr):
    d=(bg-lum[i]); d[sat[i]>25]=0; d=np.clip(d,0,None)
    band=d[rows]
    tot=band.sum(); col=band.sum(axis=0)
    cx=(col*xs).sum()/tot if tot>0 else np.nan
    sd=np.sqrt((col*(xs-cx)**2).sum()/tot) if tot>0 else np.nan
    peak=band.max()
    red=(A[i,:,:,0]-A[i,:,:,1]>50)
    by,bx=np.nonzero(red)
    bcx=bx.mean()+X0 if len(bx) else np.nan; bcy=by.mean()+Y0 if len(by) else np.nan
    bbot=by.max()+Y0 if len(by) else np.nan
    t=f["ts"]*1000
    j=np.searchsorted(L[:,0],t); j=min(max(j,1),len(L)-1)
    px,py=L[j-1,2],L[j-1,3]
    h=min(max((py+4)/6,0),1)
    out.append(dict(i=i,ts=round(f["ts"],4),px=round(px,3),py=round(py,3),exp_scale=round(1+0.9*h,3),exp_op=round(0.5-0.38*h,3),
        sh_cx=round(float(cx),1),sh_sd=round(float(sd),1),sh_mass=round(float(tot)),sh_peak=round(float(peak),1),
        ball_cx=round(float(bcx),1),ball_cy=round(float(bcy),1),ball_bot=round(float(bbot),1)))
json.dump(out,open(D+"measure.json","w"),indent=0)
ts=np.array([o["ts"] for o in out]); dts=np.diff(ts)*1000
print("frames",len(out),"median dt",np.median(dts),"max",dts.max(),"n>20ms",(dts>20).sum(),"n>40",(dts>40).sum())
for o in out[::6]: print(o["i"],o["px"],o["py"],o["exp_scale"],o["exp_op"],"| sh",o["sh_cx"],o["sh_sd"],o["sh_mass"],o["sh_peak"],"| ball",o["ball_cx"],o["ball_cy"],o["ball_bot"])
