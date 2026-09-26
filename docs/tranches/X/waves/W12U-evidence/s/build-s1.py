# SERVED MODEL: claude-opus-5-5
# X.W12U.s1 — rebuild the .s1 slice of the X-W12S supplement disposition, row by row.
# Input: W12-evidence/u/disposition-full.tsv (bucket ∋ supplement, page ∈ the .s1 page set)
#        + audit/UI-AUDIT-value.md (row titles). Output: s1.tsv (header + one row per input row).
# Disposition vocabulary:
#   CURED <sha>              cured by this seat, falsifier RED at HEAD bytes → GREEN ×2 (light+dark)
#   CURED-AT-HEAD            no edit by this seat; falsifier GREEN ×2 at HEAD (cured by the
#                            10.1.0 repin c8a4959d or an earlier consumer cure)
#   DEDUPE <A2 id> → <unit>  the same defect as an AUDIT-2 / A2-VA-X row: cured ONCE there, cited here
#   HONEST-RED <id>          open; <id> names where it is carried (glass O-row, or the X-W12U unit
#                            whose lens owns its class: .k cogency · .m mobile · .h hierarchy)
import csv, re, sys, pathlib
here = pathlib.Path(__file__).resolve().parent
root = here.parents[5]
full = root / "docs/tranches/X/waves/W12-evidence/u/disposition-full.tsv"
audit = (root / "docs/tranches/X/audit/UI-AUDIT-value.md").read_text()
PAGES = {"home-picker", "dock-color-input", "dock-action-bar-color", "dock-main", "dock-slug-edit-layer",
         "dock-view-select", "dock-profile-menu", "dock-mobile-menu", "dock-mbabb-menu", "palette-scene-actions",
         "color-space-select", "blob-view", "app-ground-atmosphere", "pointer-debug-overlay"}
rows = []
for line in full.read_text().splitlines():
    if line.startswith("#") or not line.strip():
        continue
    f = line.split("\t")
    if len(f) >= 6 and "supplement" in f[4] and f[2] in PAGES:
        rows.append(f)
title = {m.group(1): m.group(2) for m in re.finditer(r"^#### (UIA-V-[0-9H]+) · [A-Z]+ · [a-z-]+ · (.+)$", audit, re.M)}

CURED = {
    "f9e1ab74": [12], "3c415667": [13], "bb6727e8": [19, 83],
    "6bd9ff79": [14, 15, 16, 17, 20, 84, 87, 89, 247, 248, 249, 250, 251, 513],
    "d8b8e063": [21, 215], "bc0bc5b1": [23], "cc26ac43": [28], "b7d6b40e": [47], "ba88c558": [9, 79],
    "7af81708": [6], "3f9cb923": [59], "2547936f": [93], "331f4540": [107], "0bd1ec98": [72, 216, 226, 489],
    "d5d93a5b": [110], "18050f55": [104, 111], "c91f8ac0": [509], "cbe5a88a": [508], "1ff0ee82": [505],
    "f1bb2095": [502], "895f9318": [488, 493], "21aeff08": [254, 268], "c20a7c03": [519],
}
FALS = {12: "probe-color-input", 13: "probe-color-input", 19: "probe-slug D", 83: "probe-slug D",
        14: "probe-slug A", 15: "probe-slug A", 20: "probe-slug A", 16: "probe-slug B", 21: "probe-slug C", 215: "probe-slug C",
        17: "probe-slug E + x/probe-dock-input 360·844", 87: "probe-slug E", 89: "probe-slug E + results/x14-slug-edit.txt",
        84: "probe-slug E (Generate absent from the layer)", 247: "probe-slug E + x14", 248: "probe-slug A/B (role=alert)",
        249: "source: PaletteSlugBar deleted", 250: "probe-slug E (no Generate seat)", 251: "probe-slug E", 513: "probe-slug E (no Generate seat)",
        23: "probe-share", 28: "probe-tag-anchor", 47: "probe-blob-geometry", 9: "probe-dock-bar", 79: "probe-dock-bar V-79 arm",
        6: "probe-seal", 59: "probe-admin-mode", 93: "probe-admin-refused", 107: "probe-verdicts", 72: "probe-view-select",
        216: "probe-view-select", 226: "probe-view-select", 489: "probe-view-select", 110: "probe-owned-save",
        104: "probe-delete-confirm", 111: "probe-delete-confirm", 509: "probe-dock-low", 508: "probe-dock-low",
        505: "probe-dock-low", 502: "probe-dock-low", 488: "probe-dock-low", 493: "probe-dock-low",
        254: "probe-theme-row", 268: "probe-theme-row", 519: "probe-login-stays"}
DEDUPE_CITE = {28: "A2-VA-X-4", 9: "A2-VA-X-13", 79: "A2-VA-X-13", 17: "A2-VA-X-14", 247: "A2-VA-X-14", 89: "A2-VA-X-14",
               6: "A2-VA-L1-20 (seal ink; cited)", 246: None}
AT_HEAD = {401: "source read ConfigSliderPane.vue:171-179 — both action Buttons carry no retired `variant` (a code-shape row; no served witness applies)",
           2: "probe-space-select (360/390/430/1440 inside the 16 px gutter)", 8: "probe-dock-bar V-8/V-10 arm (GREEN at HEAD bytes)",
           10: "probe-dock-bar V-8/V-10 arm (GREEN at HEAD bytes); = A2-VA-L2-7 (folded)", 11: "probe-dock-bar V-11 arm, 1440 (dock holds open; GREEN at HEAD bytes)"}
DEDUPE = {
    3: ("A2-VA-L1-2", ".k", "1440 half GREEN ×2 at HEAD (probe-condense: page no longer scrolls at 1440); the 390 half (never condenses) is the useHeaderCondense retirement onto glass CardHeader shrink"),
    75: ("A2-VA-L2-6 + A2-VA-X-9", ".m", "hand-rolled 32 px seats"), 76: ("A2-VA-L2-6 + A2-VA-X-9", ".m", "coarse floor"),
    106: ("A2-VA-L2-6 + A2-VA-X-9", ".m", "palette seats 32 px"), 236: ("A2-VA-L2-6", ".m", "Tools trigger height"),
    218: ("A2-VA-L1-9", ".k", "hand-rolled status dot"), 246: ("A2-VA-L1-14", ".k", "bare slug <input> → glass Input"),
    258: ("A2-VA-L1-7", ".k", "@mbabb header"), 269: ("A2-VA-L1-7", ".k", "@mbabb header"), 270: ("A2-VA-L1-7", ".k", "@mbabb twins"),
    459: ("A2-VA-L1-24", ".k", "PointerDebugOverlay chrome"), 675: ("A2-VA-L1-24", ".k", "debug chip"),
    161: ("A2-VA-L3-3", "glass O-74 (open-at-HEAD) · .h adopts", "unbounded Blob inspector"),
    220: ("A2-VA-L2-3", "glass O-74", "list height clip"), 499: ("A2-VA-L2-3", "glass O-74", "admin plate max-height"),
    283: ("A2-VA-L2-10", ".m (owner ruling T-31 first)", "dock scrolls away on phones"),
    262: ("A2-VA-L3-6", "HELD for glass §11 (.h)", "row text outranks identity header at 390"),
    619: ("A2-VA-L3-6", "HELD for glass §11 (.h)", "section title = row label size"),
}
# Row-class routing for rows this seat left open (the lens that owns the class in X-W12U).
K = {60, 70, 78, 91, 92, 94, 162, 188, 227, 229, 231, 234, 237, 239, 240, 244, 249, 256, 257, 264, 266, 267, 284, 399, 401, 481,
     484, 486, 490, 492, 494, 495, 498, 501, 503, 510, 514, 515, 521, 532, 533, 534, 536, 88}
M = {77, 105, 160, 164, 235, 238, 255, 263, 400, 402, 466, 470, 471, 482, 483, 504, 506, 507, 517, 520, 531, 535, 81, 82, 232, 230,
     "H1", 252, 86, 243, 245, 241, 242, 461, 463, 190, 196, 195, 467, 468, 233}
H = {73, 74, 80, 487, 496, 497, 163, 193, 194, 197, 198, 200, 201, 217, 219, 223, 225, 260, 281, 282, 285, 286, 396, 397, 398, 469, 491, 518, 620, 621, 108, 109}
NOTE = {94: "the desktop @mbabb trigger is a DockTrigger at HEAD (X.W12.e); the hover:underline / text-foreground/70 overrides the fix shape deletes remain",
        398: "Copy JSON now confirms ('Copied'); Reset still says nothing and cannot be undone",
        496: "the popover's glass samples the WebGL hero (the veil is glass's O-62 recut in 10.x); consumer half is the stacking",
        73: "gold ink ceiling 2.10:1 on white (o18 census bound); the treatment is X-W10's ruling", 74: "the gold identity now rides the admin DockTrigger (d8b8e063); its light-theme ink is unchanged",
        77: "V-13 (3c415667) now withdraws the badge on edit; the badge still overlays the field while shown",
        227: "pill half CURED d8b8e063 (admin identity is a menu); the sentinel listbox-option half stays",
        491: "root CURED with V-6 (7af81708: the ink exists); the collapse-morph frames were not re-read",
        81: "instrument row: :9000 served ~60 probe runs in this seat without a stall; the lab.md/WebGPU halves not re-read",
        88: "glass half is the cascade-layer ask (O-59); the dead consumer utilities stay until glass layers the menu CSS",
        108: "the rail is the inspector's; V-107 (331f4540) holds errors now, the dock-side failed state is not built",
        252: "branch now returns `migrating` (6bd9ff79); the dialog capture is still unmade"}
out = []
cured_idx = {n: sha for sha, ns in CURED.items() for n in ns}
for f in rows:
    rid, sev, page, owner = f[0], f[1], f[2], f[3]
    key = rid.replace("UIA-V-", "")
    n = int(key) if key.isdigit() else key
    t = title.get(rid, "?")
    glass = " · glass half O-59 (relayed)" if owner == "GLASS+CONSUMER" else ""
    if n in cured_idx:
        cite = DEDUPE_CITE.get(n)
        d = f"CURED {cured_idx[n]}"
        ev = f"W12U-evidence/s/{FALS[n]} HEAD RED → GREEN light+dark" + (f" · also {cite}" if cite else "") + glass
    elif n in AT_HEAD:
        d = "CURED-AT-HEAD"
        ev = (AT_HEAD[n] if AT_HEAD[n].startswith("source") else f"W12U-evidence/s/{AT_HEAD[n]} ×2") + glass
    elif n in DEDUPE:
        a2, unit, why = DEDUPE[n]
        d = f"DEDUPE {a2} → {unit}"
        ev = why + glass
    else:
        unit = ".k" if n in K else ".m" if n in M else ".h" if n in H else None
        if unit is None:
            sys.exit(f"unrouted row {rid}")
        d = f"HONEST-RED W12U-S1-CARRY → {unit}"
        ev = NOTE.get(n, "open at HEAD; not cured in .s1 (routed by class)") + glass
    out.append([rid, sev, page, owner, d, ev, t])
with open(here / "s1.tsv", "w", newline="") as fh:
    fh.write("# SERVED MODEL: claude-opus-5-5 — X.W12U.s1 disposition slice (182 supplement rows, .s1 pages). Built by build-s1.py.\n")
    w = csv.writer(fh, delimiter="\t", lineterminator="\n")
    w.writerow(["id", "sev", "page", "owner", "s1_disposition", "evidence_or_route", "title"])
    w.writerows(out)
print(len(rows), len(out))
