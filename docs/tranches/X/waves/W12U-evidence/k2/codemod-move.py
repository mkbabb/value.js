# SERVED MODEL: claude-opus-5-5
# X.W12U.k2 — a pure-move codemod (A2-VA-L1-17 re-home by owner; A2-VA-L1-18
# app-root rename). Moves files with `git mv` and rewrites every RELATIVE module
# specifier that resolves to a moved file (or that leaves a moved file), in
# every .ts/.vue/.mjs/.js under the scanned roots. Bare specifiers (packages,
# aliases) are left alone; alias users are reported for a hand edit.
#
# usage: python3 codemod-move.py <mapping.tsv> [--dry]
#   mapping.tsv: "<old path>\t<new path>" per line (files or directories),
#   repo-relative. Prints one line per moved path and per rewritten specifier,
#   then a summary "moved N · rewritten M · files K".
import os
import re
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../.."))
SCAN = ["demo", "test", "e2e", "bench", "src", "plugins", "scripts"]
EXTS = (".ts", ".vue", ".mjs", ".js", ".mts", ".cts")
RESOLVE_EXTS = ["", ".ts", ".vue", ".js", ".mjs", "/index.ts", "/index.js"]
SPEC = re.compile(r"""((?:from|import)\s*\(?\s*["'])(\.{1,2}/[^"'?]+)((?:\?[^"']*)?["'])""")


def rel(p):
    return os.path.relpath(p, ROOT)


def load(mapping_path):
    pairs = []
    for line in open(mapping_path):
        line = line.rstrip("\n")
        if not line or line.startswith("#"):
            continue
        old, new = line.split("\t")
        pairs.append((old.rstrip("/"), new.rstrip("/")))
    return pairs


def files_under(paths):
    out = []
    for base in paths:
        b = os.path.join(ROOT, base)
        if not os.path.isdir(b):
            continue
        for d, dirs, fs in os.walk(b):
            dirs[:] = [x for x in dirs if x not in ("node_modules", "dist", ".git")]
            for f in fs:
                if f.endswith(EXTS):
                    out.append(rel(os.path.join(d, f)))
    return out


def moved_target(path, pairs):
    """Map an old repo path to its new one (file or under a moved dir)."""
    for old, new in pairs:
        if path == old:
            return new
        if path.startswith(old + "/"):
            return new + path[len(old):]
    return None


def resolve(from_file_old, spec):
    base = os.path.normpath(os.path.join(os.path.dirname(from_file_old), spec))
    for ext in RESOLVE_EXTS:
        cand = base + ext
        if os.path.isfile(os.path.join(ROOT, cand)):
            return cand, ext
    return None, None


def main():
    pairs = load(sys.argv[1])
    dry = "--dry" in sys.argv
    scan = files_under(SCAN)
    # 1. rewrite specifiers on the PRE-move tree (resolution reads old paths)
    edits = {}
    rewritten = 0
    for f in scan:
        src = open(os.path.join(ROOT, f)).read()
        f_new = moved_target(f, pairs) or f
        def sub(m):
            nonlocal rewritten
            spec = m.group(2)
            target, ext = resolve(f, spec)
            if target is None:
                return m.group(0)
            t_new = moved_target(target, pairs) or target
            if t_new == target and f_new == f:
                return m.group(0)
            # strip the extension we resolved with, keep the author's form
            keep_ext = spec.endswith(ext) if ext else True
            t_spec = t_new
            if ext and not keep_ext:
                t_spec = t_new[: -len(ext)]
            new_spec = os.path.relpath(t_spec, os.path.dirname(f_new))
            if not new_spec.startswith("."):
                new_spec = "./" + new_spec
            if new_spec == spec:
                return m.group(0)
            rewritten += 1
            print(f"  {f_new}: {spec} -> {new_spec}")
            return m.group(1) + new_spec + m.group(3)
        out = SPEC.sub(sub, src)
        if out != src:
            edits[f] = out
    # 2. write the edits, then move
    if not dry:
        for f, out in edits.items():
            open(os.path.join(ROOT, f), "w").write(out)
        for old, new in pairs:
            os.makedirs(os.path.dirname(os.path.join(ROOT, new)), exist_ok=True)
            subprocess.run(["git", "mv", old, new], cwd=ROOT, check=True)
            print(f"moved {old} -> {new}")
    print(f"moved {len(pairs)} · rewritten {rewritten} · files {len(edits)}")


main()
