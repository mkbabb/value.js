import re
src='/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/probe/owner-10dfa2b9.txt'
txt=open(src).read()
blocks=re.split(r'(?=^===== OWNER MSG )', txt, flags=re.M)
keep=[]
skipped=0
for b in blocks:
    if not b.strip(): continue
    body='\n'.join(b.split('\n')[1:])
    if 'This session is being continued from a previous conversation' in body[:200]:
        skipped+=1; continue
    keep.append(b)
out='/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/probe/owner-10dfa2b9-true.txt'
open(out,'w').write(''.join(keep))
print('kept', len(keep), 'skipped-compaction', skipped)
import os; print(os.path.getsize(out))
