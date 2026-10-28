"""SS-8 CLOSE: render the REFUTED (with disposition) and UNPROVEN (with measured reason) tables
from the packets. Read-only over packets; prints Markdown. Statuses are copied, never upgraded."""
import json, re, subprocess, sys, pathlib
here = pathlib.Path(__file__).resolve().parent
tally = json.loads(subprocess.check_output([sys.executable, "-I", str(here / "close_tally.py")]))
ref = json.loads(subprocess.check_output([sys.executable, "-I", str(here / "close_refuted.py")]))
COMMITS = {
 "B01": "d386d18bc a40ab6613", "B02": "d9f16d5f7", "B03": "eefb2d0b2", "B04": "52e916e70 (falsifiers)",
 "B05": "6b3bb6dde", "B06": "9e0e827f8", "B07": "8f4822853", "B08": "365875b3e b89a93a50",
 "B09": "6cae41f07 f18313ef0 8cd46d136", "B10": "6aa74e30f", "B11": "92942388e",
 "B12": "b35bfbbc8 96bf338d5 784c7a500", "B13": "bcf8c17b2", "B14": "88b762da0 63436369f",
 "B15": "aa47c2553", "B16": "6a3d72fc6", "B17": "4c4506b9a b43de3e18", "B18": "bd868414a",
 "B19": "4f6116d49", "B20": "83a69d695", "B21": "08a96102d", "B22": "962789bad", "B23": "4b8e889f7",
 "B24": "8ab3b8290 af35c4ddf", "B25": "605daabe7", "B26": "48392f8c5", "Z1": "fe398ede2",
 "Z2": "28397f458 ba202df7f", "Z3": "61c3324cd", "Z4": "3dc9294f4 91f96b06a"}
# Rows the packet disposes of only in its verdict cell or in a grouped/ranged cures line (read by hand).
MANUAL = {
 "0227": "no code owed: the verdict cell retires the claim (neither mark vanishes at HEAD); no cures line",
 "0298": "no owner, nothing to cure (both readings wrong; packet roll-up)",
 "0300": "OWNER-RULING: the SFB-23 re-grade (glyph passes 1.4.11 at 4.19 / 5.65:1; packet roll-up)",
 "0301": "ROUTED X-W7 (menu height contract + scroll path) + glass O-row candidate (PopoverContent height contract, with 0299 / O-59)",
 "0600": "no code owed: the stage renders role=group 'Curve mode' at HEAD (verdict cell); no cures line",
 "0633": "no cure: glass-owned C-02(b), resolved at the producer (glass 10.1.0: one --radius, --radius-input retired)",
 "0669": "OWNER-RULING: R-9 (the machine firewall, not the code, keeps host:true off the LAN)",
 "0674": "glass O-row candidate: R-MP3, glass 10.1.0 Button disabled recipe is ink-alpha only (no forced-colours disabled delta)",
 "0675": "no defect (R-MP4: no forced-colours selection/focus collapse)",
}
ZGROUP = [  # (regex over the row id, disposition) for the Z packets' ranged cures lines
 (r"Z-ColorSpaceSelector-[1-7]\b", "cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7)"),
 (r"Z-ConfigSliderPane-(3|4|10|12|14)\b", "cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: CSP-3,4,10,12,14)"),
 (r"Z-GenerateControls-(3|14)\b", "REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -1,-3,-14 per-swatch arm)"),
 (r"Z-GenerateControls-6\b", "REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -5,-6)"),
 (r"Z-GenerateControls-18\b", "REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -12,-18)"),
 (r"Z-GenerateControls-(8|10)\b", "REFUTED (cure LANDED) · live-witnessed only, jsdom does no layout (Z3 cures: -7,-9,-10,-11,-15 group; -8 per its verdict cell)"),
 (r"Z-GradientStopEditor-(2|3|4|5|8|8w|9|10|11|18)\b", "REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18)"),
 (r"Z-GradientStopEditor-15\b", "REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -14,-15)"),
 (r"Z-GradientStopEditor-17\b", "REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -16 absence arm,-17)"),
 (r"Z-AdminUsersPanel-\d+\b", "NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26)"),
 (r"Z-library-band-\d+\b", "NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18)"),
]
def clean(s, n=230):
    s = re.sub(r"\s+", " ", s).strip()
    return (s[:n] + "…") if len(s) > n else s
def disp(stem, r):
    m = re.search(r"(\d{4})", r["id"])
    if m and m.group(1) in MANUAL: return MANUAL[m.group(1)]
    if r["src"] != "none":
        cells = [c.strip() for c in r["hit"].strip().strip("|").split("|")] if r["hit"].lstrip().startswith("|") else [r["hit"].lstrip("- ")]
        body = " · ".join(c for c in cells[1:4] if c and c not in ("—", "-")) if len(cells) > 1 else cells[0]
        return clean(body) + ("" if r["src"] == "cures" else " [from the packet's REFUTED owner index]")
    for pat, d in ZGROUP:
        if re.search(pat, r["id"]): return d
    return "UNMAPPED"
def esc(s): return s.replace("|", "\\|")
mode = sys.argv[1]
for stem, d in tally.items():
    b = stem.split("-")[0]
    if mode == "refuted":
        rows = ref[stem]
        if not rows: continue
        print(f"\n#### {stem} — REFUTED {len(rows)} · cure commits: {COMMITS[b]}\n")
        print("| row | disposition (packet `## cures`) |\n|---|---|")
        for r in rows: print(f"| {esc(clean(r['id'], 60))} | {esc(disp(stem, r))} |")
    else:
        rows = [r for r in d["rows"] if r["status"] == "UNPROVEN"]
        if not rows: continue
        print(f"\n#### {stem} — UNPROVEN {len(rows)}\n")
        print("| row | measured reason (verbatim from the packet) |\n|---|---|")
        for r in rows:
            print(f"| {esc(clean(r['id'], 60))} | {esc(clean(r['verdict'] + ' ' + r['reason'], 260))} |")
