import re,sys
path=sys.argv[1]
txt=open(path).read()
entries=re.split(r'\n===== ([^=]+) =====\n',txt)
out=[]
for i in range(1,len(entries),2):
    ts,body=entries[i],entries[i+1]
    b=body.strip()
    b=re.sub(r'<system-reminder>.*?</system-reminder>','',b,flags=re.S).strip()
    b=re.sub(r'^\[Request interrupted[^\]]*\]','',b).strip()
    if not b: continue
    if b.startswith('<task-notification>'): continue
    if b.startswith('<task_') or b.startswith('[Tool'): continue
    out.append((ts,b))
print(len(out), sum(len(b) for _,b in out))
with open(path.replace('-owner-clean.txt','-owner-final.txt'),'w') as f:
    for ts,b in out:
        f.write(f"\n===== {ts} =====\n{b}\n")
