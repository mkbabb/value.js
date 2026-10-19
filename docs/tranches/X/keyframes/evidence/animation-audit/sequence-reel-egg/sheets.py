import json,subprocess,os,sys
S="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad"
F=json.load(open("frames.json"))
for ph in ["A-button","B-typed","C-held-play","D-while-playing","E-master-live"]:
    fr=[f for f in F if f["phase"]==ph]; t0=fr[0]["ts"]
    for k in range(0,len(fr),24):
        chunk=fr[k:k+24]; tiles=[]
        for f in chunk:
            src=f"{ph}/f{f['i']:04d}.png"; dst=f"{S}/_t_{f['i']}.png"
            subprocess.run(["magick",src,"-crop","1410x690+740+450","+repage","-resize","25%","-gravity","NorthWest","-font","/System/Library/Fonts/Supplemental/Arial.ttf","-fill","black","-undercolor","#ffffffcc","-pointsize","14","-annotate","+4+2",f"{ph[:1]}#{f['i']} +{(f['ts']-t0)*1000:.0f}ms",dst],check=True)
            tiles.append(dst)
        out=f"sheets/{ph}-{k//24:02d}.png"
        subprocess.run(["magick","montage","-font","/System/Library/Fonts/Supplemental/Arial.ttf",*tiles,"-tile","4x6","-geometry","+2+2",out],check=True)
        for t in tiles: os.remove(t)
        print(out,len(chunk))
