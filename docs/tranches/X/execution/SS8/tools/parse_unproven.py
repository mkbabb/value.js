#!/usr/bin/env python3
"""SS-8 inventory parser: extract every item under every UNPROVEN heading of the
adjudicated registry records. Read-only over the records (E-3)."""
import json, re, sys, pathlib

ROOT = pathlib.Path("/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated")
HEAD = re.compile(r"^(#{1,6})\s+(.*)$")
ITEM = re.compile(r"^(?:(\d+)[.)]|[-*+])\s+(.*)$")
ROW = re.compile(r"^\|(.*)\|\s*$")
SEP = re.compile(r"^\|[\s:|-]+\|\s*$")
ID = re.compile(r"\*\*\s*([A-Z][A-Za-z0-9]*(?:[-·.][A-Za-z0-9]+)*)\b")


def sections(lines):
    out, i = [], 0
    while i < len(lines):
        m = HEAD.match(lines[i])
        if m and "UNPROVEN" in m.group(2):
            lvl = len(m.group(1)); start = i; j = i + 1
            while j < len(lines):
                h = HEAD.match(lines[j])
                if h and len(h.group(1)) <= lvl:
                    break
                if lines[j].strip() == "---":
                    break
                j += 1
            out.append((start, m.group(2).strip(), lines[start + 1:j], start + 2))
            i = j
        else:
            i += 1
    return out


def items(body, base):
    res, cur = [], None
    header_seen = False
    for k, ln in enumerate(body):
        lineno = base + k
        if SEP.match(ln):
            continue
        r = ROW.match(ln)
        if r:
            cells = [c.strip() for c in r.group(1).split("|")]
            if not header_seen:
                header_seen = True
                # header row: next line is a separator
                if k + 1 < len(body) and SEP.match(body[k + 1]):
                    continue
            cur = {"line": lineno, "kind": "row", "text": " | ".join(cells)}
            res.append(cur); continue
        m = ITEM.match(ln)  # top-level only (column 0)
        if m:
            cur = {"line": lineno, "kind": "num" if m.group(1) else "bullet",
                   "n": int(m.group(1)) if m.group(1) else None, "text": m.group(2).strip()}
            res.append(cur); continue
        if cur and ln.strip() and (ln.startswith(" ") or ln.startswith("\t")):
            cur["text"] += " " + ln.strip()
        elif not ln.strip():
            pass
        else:
            cur = None  # prose paragraph breaks continuation
    return res


def main():
    inv = []
    for p in sorted(ROOT.glob("*.md")):
        lines = p.read_text().split("\n")
        for (start, title, body, base) in sections(lines):
            for it in items(body, base):
                t = it["text"]
                mid = ID.search(t)
                inv.append({"record": p.stem, "path": str(p.relative_to(ROOT.parents[4].parent)),
                            "section": title, "section_line": start + 1, "line": it["line"],
                            "kind": it["kind"], "n": it.get("n"),
                            "id": mid.group(1) if mid else None, "claim": t})
    json.dump(inv, sys.stdout, indent=1, ensure_ascii=False)

if __name__ == "__main__":
    main()
