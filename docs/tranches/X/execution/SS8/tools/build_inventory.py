#!/usr/bin/env python3
"""Build SS8/INVENTORY.json from parse_unproven.py output. Read-only over the records."""
import json, re, subprocess, sys, collections, pathlib

REPO = pathlib.Path("/Users/mkbabb/Programming/value.js")
REG = "docs/tranches/V/megatranche/registry/adjudicated"
raw = json.loads(subprocess.check_output([sys.executable, "-I", str(REPO / "docs/tranches/X/execution/SS8/tools/parse_unproven.py")]))
files = subprocess.check_output(["git", "-C", str(REPO), "ls-files", "demo"], text=True).split()
head = subprocess.check_output(["git", "-C", str(REPO), "rev-parse", "--short=9", "HEAD"], text=True).strip()

def out_of_scope(r):
    return r.startswith(("fr-", "kf-", "pt-"))

# (batch id, routes, records)
BATCHES = [
 ("B01-picker-canvas", "#/", ["picker-spectrumcanvas", "picker-colorcomponentdisplay"]),
 ("B02-picker-sliders-debug", "#/", ["picker-componentsliders", "picker-componentsliders-consolerail", "picker-debugeventlog", "picker-pointerdebugoverlay"]),
 ("B03-hero-atmosphere", "#/ (hero) · #/blob · #/atmosphere", ["picker-heroblob", "BlobPane", "AuroraPane"]),
 ("B04-dock-profile-menus", "all routes (dock chrome)", ["shell-dock-profilesection", "shell-dock-mobilemenudropdown", "shell-dock-slugeditlayer"]),
 ("B05-dock-actionbar", "all routes (dock chrome)", ["shell-dock-actionbarlayer", "shell-dock-actionbartoggle", "shell-dock-actionbutton"]),
 ("B06-dock-toolbar-status", "all routes (dock chrome)", ["shell-dock-actiontoolbar", "shell-dock-genericactionbar", "shell-dock-dockstatuslamp", "shell-dock-dockviewselect", "shell-dock-parseechoreadout"]),
 ("B07-pane-shell", "all pane routes", ["shell-panesegmentedcontrol", "shell-paneslot", "PaneHeader"]),
 ("B08-shared-feedback", "all routes (shared ui, boot/error/offline)", ["ApiOfflineChip", "ErrorBoundary", "ActionFeedback", "EmptyState"]),
 ("B09-about", "#/about", ["AboutPane", "ColorNutritionLabel", "Katex"]),
 ("B10-browse", "#/browse", ["BrowsePane", "SearchFilterBar", "PaginationBar"]),
 ("B11-browse-search-dialogs", "#/browse", ["MiniColorPicker", "UserSortMenu", "TagEditPopover", "FlagReportDialog"]),
 ("B12-card-shell", "#/browse · #/palettes", ["PaletteCard", "PaletteCardMenu", "PaletteCardMeta"]),
 ("B13-card-swatches", "#/browse · #/palettes", ["PaletteCardSwatches", "SwatchHoverMenu", "PaletteColorStrip"]),
 ("B14-card-grid-skeleton", "#/browse · #/palettes", ["PaletteCardGrid", "PaletteCardSkeleton", "ShadowPalette"]),
 ("B15-palettes", "#/palettes", ["PalettesPane", "CurrentPaletteEditor", "PaletteSlugBar"]),
 ("B16-palette-dialogs", "#/palettes", ["MigratePalettesDialog", "VersionHistoryDrawer", "PaletteRenameInput"]),
 ("B17-admin-shell-names", "#/admin/*", ["AdminPane", "AdminListItem", "AdminListSkeleton", "AdminNamesPanel"]),
 ("B18-admin-panels", "#/admin/audit · #/admin/flagged · #/admin/tags", ["AdminAuditPanel", "AdminFlaggedPanel", "AdminTagsPanel"]),
 ("B19-color-chips", "consumers of shared/ui/color-chips (#/palettes · #/generate · #/browse)", ["PreviewStrip", "PreviewRamp"]),
 ("B20-gradient-visualizer-code", "#/gradient", ["wb-gradient-visualizer", "wb-gradient-codeeditor"]),
 ("B21-gradient-easing", "#/gradient", ["wb-gradient-easingauthoringstage", "wb-gradient-easingeditor", "wb-gradient-pane"]),
 ("B22-gradient-specimen", "#/gradient", ["wb-gradient-easingspecimenstrip"]),
 ("B23-mix-canvas-result", "#/mix", ["wb-mix-animationcanvas", "wb-mix-resultdisplay"]),
 ("B24-mix-config", "#/mix", ["wb-mix-configbar", "wb-mix-sourceselector", "wb-mix-pane"]),
 ("B25-extract-inputs", "#/extract", ["wb-extract-controls", "wb-extract-imagedropzone", "wb-extract-imageeyedropper"]),
 ("B26-extract-generate-panes", "#/extract · #/generate", ["wb-extract-pane", "wb-extract-workbench", "wb-generate-pane"]),
]
ZERO = [
 ("Z1-app-chassis", "all routes", ["App", "Dock", "chassis-fitness", "layout-gestalt"]),
 ("Z2-picker-cohort", "#/ · #/atmosphere config", ["ColorPicker", "ColorInput", "ColorSpaceSelector", "ConfigSliderPane"]),
 ("Z3-workbench-about-cohort", "#/generate · #/gradient · #/about", ["GenerateControls", "GradientStopEditor", "Markdown"]),
 ("Z4-admin-library-parser", "#/admin/users · library (src/) · parser (src/parsing)", ["AdminUsersPanel", "library-band", "parser-band"]),
]
rec2batch = {r: (b, rt) for b, rt, rs in BATCHES for r in rs}

def component_file(rec):
    base = re.sub(r"^(picker|shell-dock|shell|wb-[a-z]+)-", "", rec).replace("-", "").lower()
    pre = (re.match(r"^wb-([a-z]+)-", rec) or [None, ""])[1]
    hits = [f for f in files if f.endswith(".vue") and pathlib.Path(f).stem.lower() in (base, pre + base)]
    if rec == "picker-componentsliders-consolerail":
        hits = [f for f in files if "ConsoleRail" in f and f.endswith(".vue")] or hits
    txt = (REPO / REG / f"{rec}.md").read_text()
    cited = re.search(r"demo/[A-Za-z0-9/._-]*\.vue", txt)
    return {"atHead": hits, "citedByRecord": cited.group(0) if cited else None,
            "note": None if hits else "no file of this name at HEAD (renamed/moved/deleted since the record); locate via citedByRecord + git log"}

PROSE = ["contrast ratios over the live aurora", "route proportions", "RTL mirroring",
 "12-stop degradation numbers", "WHCM composite", "phone-clip percentages", "shipped-bytes closure",
 "the 72-module delta count",
 "the R2-1 blast frames + the two HYPOTHESIS exposure vectors (drag-to-overshoot; the uncontrolled `initialPreset` boot — **now sharpened by this seat's measurement that the default preset's fn(0.5) throws**, so the masked-today verdict rests entirely on EasingAuthoringStage's controlled binding)",
 "the ID-collision hypothesis", "the GV-36 fallback UX", "the per-tick cost figures"]

items = []
vis_line = None
for x in raw:
    if out_of_scope(x["record"]):
        continue
    items.append(x)
    if x["record"] == "wb-gradient-visualizer":
        vis_line = x["section_line"]
# prose-carried R-1..R-12 (fold §4 correction); the R-n ordinal follows the prose order
vis = [x for x in items if x["record"] == "wb-gradient-visualizer"][0]
pl = vis["section_line"] + 2
for i, t in enumerate(PROSE, 1):
    items.append({**{k: vis[k] for k in ("record", "path", "section", "section_line")},
                  "line": pl, "kind": "prose-carried", "n": i, "id": f"R-{i}",
                  "id_note": "ordinal assigned by prose order of the r1 carry sentence; the record names the set R-1..R-12 but not each ordinal",
                  "claim": "r1's R-" + str(i) + " (carried unchanged): " + t})

order = {r: k for k, (_, _, rs) in enumerate(BATCHES) for r in rs}
items.sort(key=lambda x: (order.get(x["record"], 999), x["record"], x["line"], x.get("n") or 0))
out_items = []
for k, x in enumerate(items, 1):
    b, rt = rec2batch[x["record"]]
    out_items.append({"sid": f"SS8-{k:04d}", "batch": b, "record": x["record"], "recordPath": x["path"],
        "line": x["line"], "itemId": x["id"], **({"idNote": x["id_note"]} if "id_note" in x else {}),
        "kind": x["kind"], "ordinal": x["n"], "status": "UNPROVEN-NEEDS-LIVE",
        "sectionHeading": x["section"], "sectionLine": x["section_line"],
        "component": component_file(x["record"]), "route": rt, "claim": x["claim"]})

cnt = collections.Counter(i["record"] for i in out_items)
assert set(cnt) == set(rec2batch), set(cnt) ^ set(rec2batch)
oos = collections.Counter(x["record"] for x in raw if out_of_scope(x["record"]))
allrecs = sorted(p.stem for p in (REPO / REG).glob("*.md"))
zero_recs = {r for _, _, rs in ZERO for r in rs}
nosec = [r for r in allrecs if r not in {x["record"] for x in raw}]
batches = [{"id": b, "routes": rt, "records": rs, "items": sum(cnt[r] for r in rs), "zero": False} for b, rt, rs in BATCHES]
batches += [{"id": b, "routes": rt, "records": rs, "items": 0, "zero": True,
             "recordPaths": [f"{REG}/{r}.md" for r in rs]} for b, rt, rs in ZERO]
inv = {
 "schema": "SS8-INVENTORY/1", "builtAt": "2026-10-19", "headAtBuild": head,
 "authority": "docs/tranches/X/EXECUTION-RUNBOOK.md §4.1 · REFINEMENT-FOLD-2026-08-28.md §4 · COHESION §0gd.4",
 "law": "Statuses verbatim. Every item here is UNPROVEN-NEEDS-LIVE as its record wrote it; nothing in this file upgrades any item. Records are IMMUTABLE (E-3); verdicts go in SS8 packet files.",
 "counts": {"valueItemsParsed": sum(1 for x in raw if not out_of_scope(x["record"])),
            "proseCarried": 12, "total": len(out_items), "valueRecordsWithResidue": len(cnt),
            "runbookClaim": "~751 = 739 + 12", "reconciled": len(out_items) == 751,
            "corpusItemsAllRepos": len(raw), "fourierItems_SS13": sum(v for k, v in oos.items() if k.startswith("fr-")),
            "keyframesItems_SS13": sum(v for k, v in oos.items() if k.startswith("kf-"))},
 "reconciliation": [
   "grep -rln UNPROVEN over adjudicated/ = 202 files; 201 carry parsed items (kf-CubeAxisLines carries its residue as a prose 'nine-item queue', SS-13 scope).",
   "Parsed top-level items under every UNPROVEN-headed section (incl. r2/r3 'additions' subsections): 1965 total = 739 value.js + 663 fourier (fr-*) + 563 keyframes (kf-*).",
   "The fold's 739 is the value.js count exactly (78 records); fr-*/kf-* residue routes to SS-13 (runbook §4.2), not SS-8, so it is counted here and not batched.",
   "+12 = wb-gradient-visualizer's prose-carried R-1..R-12 (one sentence, record line ~129), materialised as 12 items of kind 'prose-carried' -> 751.",
   "pt-* (15 parse-that records) carry no UNPROVEN section and are not part of the 14-record zero cohort; out of SS-8 scope.",
   "Heaviest feeds re-measured: picker-spectrumcanvas 17 · PreviewStrip 16 · shell-dock-profilesection 16 · wb-gradient-visualizer 15 (3+12) · BrowsePane 14 · wb-gradient-codeeditor 14 — identical to §4.1."],
 "zeroCohort": [{"record": r, "recordPath": f"{REG}/{r}.md", "batch": b, "status": "ZERO-RESIDUE (no §UNPROVEN section) — must be swept for live-witness obligations before SS-8 may be called complete"} for b, _, rs in ZERO for r in rs],
 "recordsWithNoParsedItems": nosec,
 "recordsWithNoParsedItemsNote": "kf-CubeAxisLines HAS an UNPROVEN section (prose nine-item queue, SS-13); the other 29 have no UNPROVEN section (14 zero cohort + 15 pt-* parse-that).",
 "outOfScopeSS13PerRecord": dict(sorted(oos.items())),
 "batches": batches,
 "items": out_items,
}
assert zero_recs <= set(nosec)
json.dump(inv, open(REPO / "docs/tranches/X/execution/SS8/INVENTORY.json", "w"), indent=1, ensure_ascii=False)
for b in batches:
    print(b["id"], b["items"], b["zero"])
print(inv["counts"])
