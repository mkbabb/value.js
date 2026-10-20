#!/usr/bin/env python3
"""SS-8 B10 cure — mutant battery for the already-landed rows (and the strip).

Run from inside a throwaway worktree at HEAD (never the shared tree). Each
mutant re-creates the record's pre-cure shape in ONE file, runs the B10
falsifier through the guard, and restores the file. Expect RED per mutant.
Usage: python3 mutants.py <worktree> <round>
"""
import pathlib, subprocess, sys

WT = pathlib.Path(sys.argv[1])
ROUND = sys.argv[2]
TEST = "demo/test/palettes/ss8-b10-browse.test.ts"
GUARD = str(pathlib.Path.home() / ".claude/guard/guarded")

MUTANTS = [
    ("0285-strip", "demo/shared/ui/PaletteColorStrip.vue", "        data-color-surface\n", "", "colour surface"),
    ("0277-trigger", "demo/palettes/browser/search/SearchFilterBar.vue",
     '                    class="relative"\n                >\n                    <ListFilter',
     '                    class="relative h-10 w-8 rounded-full"\n                >\n                    <ListFilter', "0277"),
    ("0306-name", "demo/palettes/browser/search/SearchFilterBar.vue",
     ":aria-label=\"activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : 'Filters'\"",
     'aria-label="Filters"', "0306"),
    ("0302-sort-column", "demo/palettes/browser/search/SearchFilterBar.vue",
     "                        <ToggleGroup\n                            type=\"single\"",
     "                        <ToggleGroup\n                            orientation=\"vertical\"\n                            type=\"single\"", "0302"),
    ("0303-scroller", "demo/palettes/browser/search/SearchFilterBar.vue",
     '                            class="mt-2"\n', '                            class="mt-2 max-h-28 overflow-y-auto"\n', "0303"),
    ("0282-fragment", "demo/shared/ui/EmptyState.vue", "<template>\n    <div\n        v-if=\"variant === 'error'\"",
     "<template>\n    <!-- leading comment -->\n    <div\n        v-if=\"variant === 'error'\"", "0282"),
    ("0289-barrel", "demo/palettes/browser/search/index.ts", 'export { default as TagEditPopover } from "./TagEditPopover.vue";\n',
     'export { default as TagEditPopover } from "./TagEditPopover.vue";\nexport { default as UserSortMenu } from "../../admin/UserSortMenu.vue";\n', "0289"),
    ("0294-variant", "demo/palettes/admin/panels/PaginationBar.vue", '            aria-label="Next page"\n',
     '            aria-label="Next page"\n            variant="outline"\n', "0294"),
    ("0291-pager", "demo/palettes/usePager.ts", "!pager.hasNext || turning", "!pager.hasNext", "0291"),
    ("0288-vote", "demo/palettes/inspector/PaletteCardMeta.vue", "py-0.5 text-mono-small rounded-sm", "py-0.5 rounded-sm", "0288"),
]

for name, rel, old, new, grep in MUTANTS:
    p = WT / rel
    src = p.read_text()
    assert src.count(old) == 1, f"{name}: anchor not unique/present"
    p.write_text(src.replace(old, new))
    try:
        r = subprocess.run([GUARD, "--light", "--timeout", "8", "--", "npx", "vitest", "run", "--maxWorkers=2", TEST],
                           cwd=WT, capture_output=True, text=True)
        out = r.stdout + r.stderr
        tests = [l.strip() for l in out.splitlines() if "Tests " in l]
        failed = [l.strip() for l in out.splitlines() if l.strip().startswith("×")]
        verdict = "RED" if r.returncode != 0 and any(grep in f for f in failed) else "NOT-RED"
        print(f"round {ROUND} · {name}: {verdict} · {tests[-1] if tests else 'no summary'} · exit {r.returncode}")
        for f in failed:
            print("    ", f[:160])
    finally:
        p.write_text(src)
