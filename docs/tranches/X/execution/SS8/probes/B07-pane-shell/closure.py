#!/usr/bin/env python3
"""SS-8 B07 — L-5 closure re-count (shell-paneslot residue 7).

Static import closure of demo/shell/dock/index.ts over demo/ source files
(relative specifiers only; the demo carries no path aliases at HEAD; bare
package specifiers are leaves). Dynamic `import()` is excluded (it is an entry
point, not a static edge), counted separately. Two modes: all static edges, and
runtime edges only (drops `import type` / `export type`).
Usage: python3 -I closure.py  (run from the repo root)
"""
import json, os, re, sys

ROOT = os.getcwd()
ENTRY = "demo/shell/dock/index.ts"
EXTS = ["", ".ts", ".vue", ".js", ".mjs", "/index.ts", "/index.js"]
STATIC = re.compile(r"""^\s*(import|export)\s+(type\s+)?[^'"`;]*?from\s*['"]([^'"]+)['"]|^\s*import\s+['"]([^'"]+)['"]""", re.M)
DYN = re.compile(r"""import\(\s*['"]([^'"]+)['"]\s*\)""")


def source(path):
    s = open(path, encoding="utf-8").read()
    if path.endswith(".vue"):
        s = "\n".join(re.findall(r"<script[^>]*>(.*?)</script>", s, re.S))
    return s


def resolve(frm, spec):
    if not spec.startswith("."):
        return None
    base = os.path.normpath(os.path.join(os.path.dirname(frm), spec))
    for e in EXTS:
        if os.path.isfile(base + e):
            return os.path.relpath(base + e, ROOT)
    return None


def closure(runtime_only):
    seen, dyn, stack = set(), set(), [ENTRY]
    while stack:
        f = stack.pop()
        if f in seen:
            continue
        seen.add(f)
        if not f.endswith((".ts", ".vue", ".js", ".mjs")):
            continue
        s = source(f)
        for m in STATIC.finditer(s):
            is_type, spec = m.group(2), m.group(3) or m.group(4)
            if runtime_only and is_type:
                continue
            r = resolve(f, spec)
            if r and r not in seen:
                stack.append(r)
        for m in DYN.finditer(s):
            r = resolve(f, m.group(1))
            if r:
                dyn.add(r)
    pal = sorted(x for x in seen if x.startswith("demo/palettes/"))
    return {"files": len(seen), "palettes": len(pal), "pct": round(100 * len(pal) / len(seen), 1), "dynamicEntries": len(dyn)}


out = {"entry": ENTRY, "allStatic": closure(False), "runtimeOnly": closure(True)}
print(json.dumps(out))
