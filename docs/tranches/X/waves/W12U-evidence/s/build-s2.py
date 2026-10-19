# SERVED MODEL: claude-opus-5-5
# X.W12U.s2 — rebuild the .s2 slice of the X-W12S supplement disposition, row by row.
# Input: W12-evidence/u/disposition-full.tsv (bucket ∋ supplement, page ∈ the .s2 page set)
#        + audit/UI-AUDIT-value.md (row titles). Output: s2.tsv (header + one row per input row).
# Vocabulary (as build-s1.py):
#   CURED <sha>              falsifier RED on the HEAD bytes → GREEN ×2 (light+dark), s2/results/*.txt
#   CURED-AT-HEAD            no edit; falsifier GREEN ×2 at HEAD (the 10.1.0 repin c8a4959d or an earlier cure)
#   DEDUPE <A2 id> → <unit>  the same defect as an AUDIT-2 / A2-VA-X row: cured once there, cited here
#   HONEST-RED W12U-S2-CARRY → <unit>  open; carried to the X-W12U lens that owns its class
import csv, re, sys, pathlib
here = pathlib.Path(__file__).resolve().parent
root = here.parents[5]
full = root / "docs/tranches/X/waves/W12-evidence/u/disposition-full.tsv"
audit = (root / "docs/tranches/X/audit/UI-AUDIT-value.md").read_text()
PAGES = {"palettes-view", "browse-view", "browse-search-filter", "version-history-drawer", "palette-card-menu",
         "tag-edit-popover", "migrate-palettes-dialog", "flag-report-dialog", "palettes-delete-all-dialog"}
rows = []
for line in full.read_text().splitlines():
    if line.startswith("#") or not line.strip():
        continue
    f = line.split("\t")
    if len(f) >= 6 and "supplement" in f[4] and f[2] in PAGES:
        rows.append(f)
title = {m.group(1): m.group(2) for m in re.finditer(r"^#### (UIA-V-[0-9H]+) · [A-Z]+ · [a-z-]+ · (.+)$", audit, re.M)}

CURED = {
    "60e4e237": [38], "711e37fd": [33], "e88fbc69": [32, 306, 309, 559, 560], "85b7638b": [31],
    "30035f7b": [30, 292], "376b02ce": [122, 551], "f4bd4fd9": [124],
    "b9cc5273": [125, 315, 316, 317, 318, 565, 566], "4aea64c1": [118, 310],
    "b5d67459": [112, 113, 288, 289, 542], "b37f115f": [131, 327, 328, 330, 580],
    "b906c56e": [133, 331, 334, 335, 336, 338, 586],
    "e42b3585": [126, 127, 128, 129, 320, 321, 323, 324, 573, 575, 576],
    "e88848d9": [99, 276], "c7e0b1b4": [547], "994f558e": [305], "cc26ac43": [34],
}
FALS = {38: "demo/test/palettes/revert-contract.test.ts (2 failed → 2 passed)", 33: "s2/probe-color-query", 32: "s2/probe-filter-fit",
        306: "s2/probe-filter-fit + filter-1440-light frame", 309: "s2/probe-filter-fit (one chip set; no radio/checkbox rows)",
        559: "s2/probe-filter-fit (no nested scroller)", 560: "s2/probe-filter-fit (glass pad; no p-0)", 31: "s2/probe-card-keyboard",
        30: "s2/probe-card-head (+ c9be1792 silhouette)", 292: "s2/probe-card-head (name leads; meta on its own row)",
        122: "s2/probe-no-match", 551: "s2/probe-no-match (hint half; unnarrowed wall names a next step)", 124: "s2/probe-tag-catalog",
        125: "s2/probe-tag-chooser", 315: "s2/probe-tag-chooser (no checkbox)", 316: "s2/probe-tag-chooser (≤ 3 category labels)",
        317: "s2/probe-tag-chooser (coarse chip 44/47 px; no inner scroller)", 318: "s2/probe-tag-chooser (inert while saving)",
        565: "s2/probe-tag-chooser (glass pad; no p-0/w-52)", 566: "s2/probe-tag-chooser (named 'Tags of <palette>')",
        118: "s2/probe-filter-trigger", 310: "s2/probe-filter-trigger", 112: "s2/probe-card-menu", 113: "s2/probe-card-menu (inline export at coarse/narrow)",
        288: "s2/probe-card-menu (count = shortcut; no text-caption)", 289: "s2/probe-card-menu (no header; shortcut annotations; default Admin label)",
        542: "s2/probe-card-menu (icons all 16 px; no wrap)", 131: "s2/probe-flag-dialog", 327: "s2/probe-flag-dialog", 328: "s2/probe-flag-dialog",
        330: "s2/probe-flag-dialog (in-flight lock)", 580: "source: paletteSlug prop + host binding deleted (b37f115f)",
        133: "s2/probe-migrate", 331: "s2/probe-migrate", 334: "s2/probe-migrate", 335: "s2/probe-migrate", 336: "s2/probe-migrate (focus on Cancel)",
        338: "s2/probe-flag-dialog + s2/probe-migrate (both dialogs on the confirm idiom)", 586: "source: onMigrateDismiss drops the closure (b906c56e)",
        126: "s2/probe-versions revert", 127: "s2/probe-versions empty", 128: "s2/probe-versions focus", 129: "s2/probe-versions (action on the header line)",
        320: "s2/probe-versions (strip)", 321: "s2/probe-versions (rounded-card)", 323: "s2/probe-versions load", 324: "s2/probe-versions foreign + confirm",
        573: "s2/probe-versions (name only where it differs; hash line gone)", 575: "s2/probe-versions ordinal", 576: "s2/probe-versions (header-line action)",
        99: "s2/probe-editor-names", 276: "s2/probe-editor-names", 547: "s2/probe-delete-all", 305: "s2/probe-browse-error",
        34: "s/probe-tag-anchor 390 ×2 (s2/results/v34-tag-anchor.txt) — cured once at .s1 as UIA-V-28 = A2-VA-X-4"}
CITE = {30: "A2-VA-L3-8", 292: "A2-VA-L3-8", 32: "A2-VA-L2-1 (consumer half; 844×390 stays RED on the glass block cap)",
        131: "A2-VA-X-10 (landscape fit via DialogContent scroll)", 34: "A2-VA-X-4", 125: "A2-VA-L1 (no row; one chooser, two hosts)"}
AT_HEAD = {29: "s2/probe-menu-tone 1440 ×2 — Delete/Delete (admin) paint --destructive, Report muted (10.1.0 layered menu sheet)",
           97: "s2/probe-menu-tone 1440 ×2 (= V-29's Delete row)",
           101: "s2/probe-menu-seat 390/360 ×2 — 0/20 menu buttons cross their card (GREEN on the base bytes 23cd3a34)",
           120: "s2/probe-filter-trigger HEAD arm — the count badge paints whole (clipped:false) on HEAD and after",
           333: "s2/probe-migrate HEAD arm — the dialog keeps a 20 px gutter at 390 on 10.1.0 (the pinned gutter clamp)",
           298: "source: package.json pins @mkbabb/glass-ui 10.1.0 (X-W7L c8a4959d); the three upstream-fixed defects this row names ride that pin"}
DEDUPE = {
    278: ("A2-VA-L3-5 + A2-VA-L3-2", ".h", "orphan delete-all row → header actions seat; the hidden-by-search half CURED c7e0b1b4 (the dialog names the hidden count)"),
    294: ("A2-VA-L3-2", ".h", "delete-all trigger → pane header trailing actions (10.1.0 #actions)"),
    543: ("A2-VA-L3-5", ".h", "the floating orphan trash = the delete-all toolbar row"),
    295: ("A2-VA-L3-6", "HELD for glass §11 (.h)", "dialog title voice; T.W4-6 display-voice ruling + O-10d census stand"),
}
K = {98, 100, 273, 274, 275, 280, 290, 540, 117, 119, 300, 301, 304, 557, 123, 308, 311, 313, 561, 527, 562, 319, 570, 572, 577, 546, 96, 584}
M = {102, 116, 277, 529, 287, 293, 314, 563, 325, 578}
H = {279, 524, 525, 526, 528, 530, 291, 538, 541, 299, 302, 303, 307, 552, 553, 554, 555, 556, 121, 567, 569, 571, 574, 329, 579, 582, 332, 585}
NOTE = {538: "the truncated name header is gone (b5d67459); the verb set (two 'Publish') is the palette-verb design (.h)",
        332: "rounded-full/justify-start dropped (b906c56e); the stadium row itself is the glass choice-list ask (O-59)",
        582: "the description override is dropped (b906c56e); the title keeps the ruled display voice (T.W4-6 · O-10d), HELD with A2-VA-L3-6",
        585: "publish/transfer tallies reach the identity line; a plain switch/regenerate success is not yet said",
        574: "the drawer title is now 'Version history' (e42b3585); the menu's 'Versions' and the host copy are the remaining two",
        301: "the filter popover's hand-rolled atoms are gone (e88fbc69, b9cc5273); the card row's +N/vote atoms remain",
        299: "the Filters trigger no longer overhangs (4aea64c1); the 54 px search bar / 21 px text at 390 remain",
        527: "the UA search cancel glyph (native type=search) — glass half O-59; consumer clear-button swap owed with V-562",
        96: "keyboard/aria selection CURED with V-31 (85b7638b); the dock-collapse half is the dock's",
        98: "keyboard select CURED with V-31 (85b7638b); reorder/swatch reach + glass SortableList adoption remain",
        584: "Cancel now drops the pending closure (b906c56e, V-586); the typed slug is not restored to the layer",
        552: "the pane-header veil is glass's (O-62 recut); consumer seam only",
        325: "= A2-VA-X-3: the sheet lies off-screen at every width (glass SHEET-POSITION, O-74c G-1); the consumer w-[380px] half is .m's"}
cured_idx = {n: sha for sha, ns in CURED.items() for n in ns}
out = []
for f in rows:
    rid, sev, page, owner = f[0], f[1], f[2], f[3]
    key = rid.replace("UIA-V-", "")
    n = int(key) if key.isdigit() else key
    t = title.get(rid, "?")
    glass = " · glass half O-59 (relayed)" if owner == "GLASS+CONSUMER" else ""
    if n in cured_idx:
        d = f"CURED {cured_idx[n]}"
        ev = f"W12U-evidence/{FALS[n]} HEAD RED → GREEN light+dark" + (f" · also {CITE[n]}" if n in CITE else "") + glass
    elif n in AT_HEAD:
        d = "CURED-AT-HEAD"
        ev = AT_HEAD[n] + glass
    elif n in DEDUPE:
        a2, unit, why = DEDUPE[n]
        d = f"DEDUPE {a2} → {unit}"
        ev = why + glass
    else:
        unit = ".k" if n in K else ".m" if n in M else ".h" if n in H else None
        if unit is None:
            sys.exit(f"unrouted row {rid}")
        d = f"HONEST-RED W12U-S2-CARRY → {unit}"
        ev = NOTE.get(n, "open at HEAD; not cured in .s2 (routed by class)") + glass
    out.append([rid, sev, page, owner, d, ev, t])
seen = [r[0] for r in out]
for n in list(cured_idx) + list(AT_HEAD) + list(DEDUPE):
    if f"UIA-V-{n}" not in seen:
        sys.exit(f"mapped row UIA-V-{n} is not in the .s2 input")
with open(here / "s2.tsv", "w", newline="") as fh:
    fh.write("# SERVED MODEL: claude-opus-5-5 — X.W12U.s2 disposition slice (131 supplement rows, .s2 pages). Built by build-s2.py.\n")
    w = csv.writer(fh, delimiter="\t", lineterminator="\n")
    w.writerow(["id", "sev", "page", "owner", "s2_disposition", "evidence_or_route", "title"])
    w.writerows(out)
print(len(rows), len(out))
