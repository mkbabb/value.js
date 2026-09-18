import re,sys
path=sys.argv[1]
txt=open(path).read()
entries=re.split(r'\n===== ([^=]+) =====\n',txt)
# entries[0] empty, then pairs (ts, body)
out=[]
for i in range(1,len(entries),2):
    ts,body=entries[i],entries[i+1]
    b=body.strip()
    # drop pure system-reminder blocks
    stripped=re.sub(r'<system-reminder>.*?</system-reminder>','',b,flags=re.S).strip()
    if not stripped: continue
    if stripped.startswith('[Request interrupted'):
        stripped2=re.sub(r'^\[Request interrupted[^\]]*\]','',stripped).strip()
        if not stripped2: continue
        stripped=stripped2
    out.append((ts,stripped))
print(len(out))
with open(path.replace('-owner.txt','-owner-clean.txt'),'w') as f:
    for ts,b in out:
        f.write(f"\n===== {ts} =====\n{b}\n")
