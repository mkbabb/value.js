import re,glob,sys
def strs(globs):
    s=set()
    for g in globs:
        for f in glob.glob(g,recursive=True):
            if f.endswith('.js'):
                s|=set(re.findall(r'"([A-Za-z][A-Za-z0-9 _:-]{14,60})"',open(f,errors='ignore').read()))
    return s
old=strs(['node_modules/@mkbabb/value.js/dist/**/*.js'])
new=strs(['dist/subpaths/**/*.js','dist/*.js'])
gh=open('/dev/null').read()
ghs=''.join(open(f,errors='ignore').read() for f in glob.glob('dist/gh-pages/assets/*.js'))
oo=sorted(old-new); nn=sorted(new-old)
print('old-only',len(oo),'new-only',len(nn))
print('old-only in gh-pages:',[x for x in oo if '"'+x+'"' in ghs][:10], 'of', len(oo))
print('new-only in gh-pages:',[x for x in nn if '"'+x+'"' in ghs][:10], 'count', sum(1 for x in nn if '"'+x+'"' in ghs),'of',len(nn))
print('sample old-only',oo[:8])
