# SERVED MODEL: claude-opus-5-5
# X.W12U.s3 — rebuild the .s3 slice of the X-W12S supplement disposition, row by row.
# Input: W12-evidence/u/disposition-full.tsv (bucket ∋ supplement, page ∈ the .s3 page set)
#        + audit/UI-AUDIT-value.md (row titles). Output: s3.tsv (header + one row per input row).
# Vocabulary (as build-s1.py / build-s2.py):
#   CURED <sha>              falsifier RED on the HEAD bytes → GREEN ×2 (light+dark), s3/results/*
#   CURED-AT-HEAD            no edit; falsifier GREEN ×2 at HEAD, or a source read for a code-shape row
#   DEDUPE <A2 id> → <unit>  the same defect as an AUDIT-2 / A2-VA-X row: cured once there, cited here
#   HONEST-RED W12U-S3-CARRY → <unit>  open; carried to the X-W12U lens that owns its class
#   HONEST-RED W12U-S3-API   open; the cure is in api/**, outside X-W12U's §1 bounds
import csv, re, sys, pathlib
here = pathlib.Path(__file__).resolve().parent
root = here.parents[5]
full = root / "docs/tranches/X/waves/W12-evidence/u/disposition-full.tsv"
audit = (root / "docs/tranches/X/audit/UI-AUDIT-value.md").read_text()
PAGES = {"extract-view", "gradient-easing-authoring", "gradient-view", "mix-view", "atmosphere-view", "generate-view",
         "about-pane", "admin-users", "admin-flagged", "admin-audit", "admin-names", "admin-tags", "pane-plates", "not-found"}
rows = []
for line in full.read_text().splitlines():
    if line.startswith("#") or not line.strip():
        continue
    f = line.split("\t")
    if len(f) >= 6 and "supplement" in f[4] and f[2] in PAGES:
        rows.append(f)
title = {m.group(1): m.group(2) for m in re.finditer(r"^#### (UIA-V-[0-9H]+) · [A-Z]+ · [a-z-]+ · (.+)$", audit, re.M)}

CURED = {
    "1aa1b29a": [628],
    "5af08fb6": [413, 418, 419, 420, 424, 425, 428, 622, 625, 634, 635, 638, 641, 644, 645, 646, 649],
    "22c55b56": [606, 616], "ad67ff30": [605], "bd8b7e1a": [588], "0d8653fc": [657], "f3ffcf26": [355, 597],
}
FALS = {
    628: "s3/probe-admin-users 628", 413: "s3/probe-admin-users 413", 622: "s3/probe-admin-users 622-bulk/-prune/-palette",
    625: "s3/probe-admin-users 625 (one gap rung; the users/flagged/tags/names notice regions are all `contents`)",
    424: "s3/probe-admin-ledgers 424", 425: "s3/probe-admin-ledgers 425", 428: "s3/probe-admin-ledgers 428-busy/-error",
    638: "s3/probe-admin-ledgers 638", 641: "s3/probe-admin-ledgers 641 (skeleton rows aria-hidden; one status per loading host, all 7 hosts)",
    644: "s3/probe-admin-ledgers 644", 645: "s3/probe-admin-ledgers 645-busy/-error", 646: "s3/probe-admin-ledgers 646",
    649: "s3/probe-admin-ledgers 649-dismiss (the pager half read GREEN at HEAD: 649-pager)",
    418: "s3/probe-admin-names 418", 419: "s3/probe-admin-names 419", 420: "s3/probe-admin-names 420",
    634: "s3/probe-admin-names 634", 635: "s3/probe-admin-names 635 (EmptyState `filtered` register; also audit + users search)",
    606: "s3/probe-pane-timeout 606", 616: "s3/probe-pane-timeout 616", 605: "s3/probe-gradient 605", 588: "s3/probe-extract 588",
    657: "s3/probe-batch3 657", 355: "s3/probe-batch3 355", 597: "s3/probe-batch3 597",
}
CITE = {428: "size/seat of the toolbar Refresh = A2-VA-L3-2 (.h)", 645: "size/seat of the toolbar Refresh = A2-VA-L3-2 (.h)",
        638: "the plate headline's weight = A2-VA-L3-1 (.h)", 616: "the plate's vertical seat rides the plate-shape row V-185 (.k)"}
AT_HEAD = {
    169: "s3/probe-admin-access ×2 cells ×2 themes — a refused token ends the admin session (UIA-V-93) and leaves for '/', dock out of gold mode: no stranded plate, no dead controls",
    590: "source + demo/test/extract/extract-controls.test.ts — the k readout says found/requested with a worded title (d106f3be, X.W7.g3 EC-9)",
    153: "s3/probe-at-head 153 — 17 `.glass-chip` rules reach the page on 10.1.0 (glass.css imports glass-chip.css)",
    65: "s3/probe-at-head 65 — 'Plus Jakarta Sans' is loaded and bold renders bold (700 run 8% wider than 400)",
    451: "source: no Button/Select `variant=\"ghost\"` remains (the 4 left are WatercolorDot's own prop); NotFoundPane's Button is `emphasis=\"quiet\"` (b6f90b5c)",
    661: "source: package.json pins @mkbabb/glass-ui 10.1.0 (X-W7L c8a4959d); the version skew the row names is closed",
}
DEDUPE = {
    629: ("A2-VA-L1-6", ".k", "Cancel = glass `text` emphasis (accent ink, measured C 0.122) in the six-copy confirm recipe; probe-admin-users 629 HELD reading"),
    648: ("A2-VA-L1-6", ".k", "confirm type voice + accent Cancel = the one confirm recipe"),
    636: ("A2-VA-L1-6", ".k", "the destructive confirm's full-width stadium at 390 = the confirm recipe (glass half O-59)"),
    623: ("A2-VA-L1-6", ".k", "translucent confirm surface = the confirm recipe"),
    632: ("A2-VA-L3-1", ".h", "error/refused headline outranks the pane title"),
    474: ("A2-VA-L3-1", ".h", "empty headline (33 px display) over one sentence"),
    647: ("A2-VA-L3-1", ".h", "empty/error headline out-weighs the pane title; the 390 dead band with it"),
    406: ("A2-VA-X-7", ".h", "Users toolbar + orphaned Refresh → header actions"),
    438: ("A2-VA-L3-2", ".h", "count + Refresh row → pane header trailing actions (10.1.0 #actions)"),
    655: ("A2-VA-L3-2", ".h", "the 390 Refresh dead band = the toolbar row"),
    435: ("A2-VA-L3-2", ".h", "count in a toolbar line, not the header"),
    159: ("A2-VA-L3-2", ".h", "action footer capsules → header actions seat"),
    170: ("A2-VA-X-6", ".m", "390 destructive label crushes the slug pill"),
    411: ("A2-VA-L1-12", ".k", "the `div role=button aria-expanded` user row = the disclosure idiom"),
    382: ("A2-VA-L1-12", ".k", "hand-rolled interval accordion = the disclosure idiom"),
    369: ("A2-VA-L1-11", ".k", "hand-rolled stop inspector inside the GradientStopEditor god component"),
    373: ("A2-VA-L3-7", ".h", "the stop inspector's help line (selection half cured 5ccc0e3e at X-W12)"),
    607: ("A2-VA-L3-7", ".h", "the inert empty stop inspector"),
    348: ("A2-VA-L1-13", ".k", "ShadowPalette vs skeleton: two ghost registers"),
    592: ("A2-VA-L1-2", ".k", "sibling pane headers disagree = the two header implementations"),
    450: ("A2-VA-L1-2", ".k", "PaneHeader veil band (glass veil O-62)"),
    593: ("A2-VA-L3-4", ".h", "My Palettes' bands before the first palette"),
    366: ("A2-VA-L3-5", ".h", "the orphan trash = the delete-all toolbar row (as s2 V-543)"),
    141: ("A2-VA-L1-4", ".k", "the palette specimen hand-typed in the Generate plate"),
    361: ("A2-VA-L2-8", ".m", "the plate verb cluster overrun at 360/390"),
    600: ("A2-VA-L1-14", ".k", "inline name editing built three ways (the bare Generate input)"),
    609: ("A2-VA-X-8", "HELD for glass §11 (.h)", "9 px literals = the micro-type census row"),
    640: ("A2-VA-X-1", ".x (by design)", "the signed-out deep link resolves to Not Found by the fail-closed admin guard (X-1: decided, no cure owed); cited, not re-cured"),
    "H3": ("A2-VA-L2-2", ".m", "the route H1 painted under the atmosphere canvas"),
}
API = {178: "the admin palette delete does not cascade its flags (api/** soft-delete + the flagged $lookup) — outside X-W12U §1; needs an api/ grant"}
K = {62, 205, 207, 210, 472, 473, 475, 476, 478, 135, 341, 343, 344, 346, 587, 591, 353, 142, 364, 599, 143, 144, 368,
     374, 375, 376, 148, 149, 151, 152, 378, 379, 384, 385, 610, 611, 156, 387, 393, 395, 166, 404, 405, 408, 626, 627,
     415, 416, 417, 422, 427, 637, 639, 177, 436, 650, 442, 654, 439, 658, 185, 454, 667}
M = {63, 134, 340, 345, 138, 596, 363, 383, 612, 155, 617, 421, 429, "H2"}
H = {203, 204, 477, 342, 349, 589, 594, 137, 352, 356, 357, 358, 359, 595, 598, 362, 367, 602, 146, 370, 372, 604, 608,
     150, 380, 158, 391, 394, 615, 403, 407, 624, 174, 423, 433, 437, 448, 660, 452, 456, 663, 664, 665, 670}
NOTE = {
    439: "Enter submits and the verb is a labelled 'Add tag' (CURED 5af08fb6, s3/probe-batch3 439); the constrained category (a combobox of the existing groups) remains",
    "H2": "the prompt names the pointer's gesture (CURED bd8b7e1a, s3/probe-extract H2); the sampled value truncating at 390 remains",
    624: "Prune inert while loading (b0c81878, X-W12); the toolbar context dropping while loading remains",
    667: "the redundant aria-live beside role=alert and the glass Alert adoption remain one cure (the plate primitive)",
    611: "the tiles' literal is the picker's byte-identity key (easingCatalogue.ts mint law); emitting keywords is the cross-app easing convergence (.k item 5)",
    639: "no glass Pagination at 10.1.0 — ADOPT with A2-FO-L1-27 when glass ships it (.k item 3)",
    456: "measured: no 10.1.0 dist file reads --skeleton-glass-bg; the seam stays inert (glass half O-59)",
    166: "the 10.1.0 Skeleton is installed; the admin skeleton's row shapes (V-405/416/436/637) are one cure",
    393: "atmosphere is outside the public view entries; the trigger shows no label there",
    178: "",
}
cured_idx = {n: sha for sha, ns in CURED.items() for n in ns}
def key(rid):
    k = rid.replace("UIA-V-", "")
    return int(k) if k.isdigit() else k
out = []
for f in rows:
    rid, sev, page, owner = f[0], f[1], f[2], f[3]
    n = key(rid)
    t = title.get(rid, "?")
    glass = " · glass half O-59 (relayed)" if owner == "GLASS+CONSUMER" else ""
    if n in cured_idx:
        d = f"CURED {cured_idx[n]}"
        ev = f"W12U-evidence/{FALS[n]} HEAD RED → GREEN light+dark ×2" + (f" · {CITE[n]}" if n in CITE else "") + glass
    elif n in AT_HEAD:
        d, ev = "CURED-AT-HEAD", AT_HEAD[n] + glass
    elif n in DEDUPE:
        a2, unit, why = DEDUPE[n]
        d, ev = f"DEDUPE {a2} → {unit}", why + glass
    elif n in API:
        d, ev = "HONEST-RED W12U-S3-API", API[n] + glass
    else:
        unit = ".k" if n in K else ".m" if n in M else ".h" if n in H else None
        if unit is None:
            sys.exit(f"unrouted row {rid}")
        d = f"HONEST-RED W12U-S3-CARRY → {unit}"
        ev = (NOTE.get(n) or "open at HEAD; not cured in .s3 (routed by class)") + glass
    out.append([rid, sev, page, owner, d, ev, t])
seen = {r[0] for r in out}
for n in list(cured_idx) + list(AT_HEAD) + list(DEDUPE) + list(API) + list(K) + list(M) + list(H):
    if f"UIA-V-{n}" not in seen:
        sys.exit(f"mapped row UIA-V-{n} is not in the .s3 input")
buckets = [set(cured_idx), set(AT_HEAD), set(DEDUPE), set(API), K, M, H]
for i, a in enumerate(buckets):
    for b in buckets[i + 1:]:
        if a & b:
            sys.exit(f"row in two buckets: {a & b}")
with open(here / "s3.tsv", "w", newline="") as fh:
    fh.write("# SERVED MODEL: claude-opus-5-5 — X.W12U.s3 disposition slice (182 supplement rows, .s3 pages). Built by build-s3.py.\n")
    w = csv.writer(fh, delimiter="\t", lineterminator="\n")
    w.writerow(["id", "sev", "page", "owner", "s3_disposition", "evidence_or_route", "title"])
    w.writerows(out)
print(len(rows), len(out))
