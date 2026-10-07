# SERVED MODEL: claude-opus-5-5
# X.W12U.k · A2-VA-L1-8 — re-point every `demo/ui/<name>` shim import onto the
# glass-ui subpath it re-exported. Run once from the repo root; idempotent.
import os, re, sys
ROOT = "demo"
UI = os.path.realpath("demo/ui")
NO_SUBPATH = {"alert", "avatar", "skeleton"}  # 10.1.0 ships no subpath: root barrel
RENAME = {"dropdown-menu": "menu"}
pat = re.compile(r'from "((?:\.\.?/)[^"]*)"')
n = 0
for d, _, fs in os.walk(ROOT):
    if os.path.realpath(d).startswith(UI):
        continue
    for f in fs:
        if not f.endswith((".vue", ".ts")):
            continue
        p = os.path.join(d, f)
        s = open(p).read()
        def sub(m):
            global n
            tgt = os.path.realpath(os.path.join(d, m.group(1)))
            if os.path.dirname(tgt) != UI:
                return m.group(0)
            name = os.path.basename(tgt)
            n += 1
            if name in NO_SUBPATH:
                return 'from "@mkbabb/glass-ui"'
            return 'from "@mkbabb/glass-ui/%s"' % RENAME.get(name, name)
        t = pat.sub(sub, s)
        if t != s:
            open(p, "w").write(t)
print("re-pointed", n)
