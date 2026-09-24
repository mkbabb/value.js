# SERVED MODEL: claude-opus-5-5 — X.W12.u3: the full UIA-V disposition table (676 numbered + 3 held rows) from settled bytes.
# Sources: audit/UI-AUDIT-value.md (every `#### UIA-V-` header + its `**owner**` line), the .u1/.u2 TSVs,
# the .a/.c/.t/.d/.e receipt dispositions (X-W12.md, transcribed below with their record lines), the .u3 cures (u3map.tsv),
# and relay/X-ALL-BK-UI-AUDIT.md (O-59) for every GLASS / GLASS+CONSUMER id.
import re, sys, os, collections
ROOT = "/Users/mkbabb/Programming/value.js/docs/tranches/X"
HERE = os.path.dirname(os.path.abspath(__file__))
reg = open(f"{ROOT}/audit/UI-AUDIT-value.md").read().split("\n")
rows = []  # (id, sev, page, owner)
cur = None
for line in reg:
    m = re.match(r"^#### (UIA-V-[0-9H]+) · ([A-Z]+) · ([a-z0-9-]+) · ", line)
    if m:
        cur = [m.group(1), m.group(2), m.group(3), None]; rows.append(cur); continue
    if cur and cur[3] is None:
        o = re.match(r"^- \*\*owner\*\* \*\*([A-Z+]+)\*\*", line)
        if o: cur[3] = o.group(1)
relay = open(f"{ROOT}/relay/X-ALL-BK-UI-AUDIT.md").read()
in_relay = lambda i: re.search(re.escape(i) + r"(?![0-9])", relay) is not None
def tsv(path):
    d = {}
    for l in open(path):
        if l.startswith("#") or not l.strip(): continue
        f = l.rstrip("\n").split("\t")
        d[f[0]] = f[-1]
    return d
u1 = tsv(f"{HERE}/disposition-u1.tsv"); u2 = tsv(f"{HERE}/disposition-u2.tsv")
u3 = tsv(sys.argv[1] if len(sys.argv) > 1 else f"{HERE}/disposition-u3-cures.tsv")
# --- earlier units' receipt dispositions (X-W12.md line cited) ---
R = {}
def put(ids, disp):
    for i in ids: R[f"UIA-V-{i}"] = disp
# .a (X-W12.md:183-214)
put([1], "9711abdb [.a]"); put([57], "bbebe3f8 [.a]"); put([56], "bbebe3f8+028c2462 [.a]"); put([191], "028c2462 [.a]")
put([55], "O-59 · O-56 G-4 addendum [.a]")
put([192], "consumer half gone with UIA-V-1 (9711abdb) · O-56 G-4 addendum (glass) [.a]")
put([186], "HONEST-RED A-DARK-BAND (design ruling owed on X-W6 i2's shipped band) · O-59 (glass half) [.a]")
put([188], "SUPPLEMENT X-W12S (glass <Aurora> remount; .a sizing cured) [.a→u3]")
# .c (X-W12.md:412-438)
put([4], "a89fa035 [.c]"); put([64], "38b35385+4b7639c0 [.c]"); put([206], "b1bc7b52 [.c]")
put([202], "O-59 (adopt via repin; R-5 HOLD) [.c]"); put([208], "O-59 [.c]"); put([209], "O-59 (cured at glass HEAD; adopt via repin) [.c]")
# .t (X-W12.md:461-465)
put([479, 480], "67bc5144 [.t]"); put([5], "d40b574c [.t]"); put([66, 212], "b98faac1 [.t]"); put([211], "83d1c61f [.t]")
put([214], "HONEST-RED TEXT-TRIGGER-ROOT (O-66, f4ba97e9) [.t]")
# .d (X-W12.md:520-526)
put([61], "82ba99e1 [.d]"); put([48], "dda1f85c (consumer) · O-68 BLOB-WAKE-SEAM (glass half) [.d]")
put([199], "82ba99e1 (consumer) · O-56 G-3 (glass matte) [.d]")
# .e (X-W12.md:614-618)
put([69, 90, 94, 95, 228], "038c795c [.e]"); put([500], "04b1e822 [.e]")
put([244], "04b1e822+13b81c30 (shim + keyframes) · SUPPLEMENT X-W12S (vocabulary half, with V-501) [.e]")
put([67, 68], "HONEST-RED DOCK-MORPH-ROOT (O-55/O-64) [.e]"); put([272], "R-5 HOLD → X-W7L [.e]")
# .u1 G-2 family on admin pages (d3ed6370, the 13 variant= sites incl. AdminNames/AdminFlagged/NotFound-class rows)
put([165, 171, 175], "d3ed6370 [.u1 G-2]")
# .u1's UNRESOLVED verdicts on pages outside its TSV (X-W12.md u1 table)
put([643, 668], "VERDICT NOT-A-DEFECT (designed 5 s idle collapse) · HONEST-RED DOCK-COLLAPSED-FORM (O-65) [.u1]")
# .b's census defects D1-D6 (X-W12.md:245-262), mapped to the rows they cure by .u3 (the row's observed = the defect)
put([58], "e1aaee3e+7465354d (D1 one enter per region; D5 band anchor: the 47-48 px jump) [.b, mapped by .u3]")
put([187, 462], "1a696ca6 (D2-D4: the opening breath on one clock, once; no KeepAlive-return replay of plate-land/blob-emerge) [.b, mapped by .u3]")
put([662], "7465354d (D5: the scene row is top-anchored under the route title, never viewport-centred) [.b, mapped by .u3]")
put([412, 430, 443], "7465354d (D5: the scene row is top-anchored, so a state change no longer re-centres the card) [.b, mapped by .u3]")
put([464], "VERDICT NOT-A-DEFECT (transient overlay-scrollbar thumb; x=382 samples measured) [.u1]")
SUPP = "SUPPLEMENT X-W12S"
out = []
for rid, sev, page, owner in rows:
    src = None
    if rid in u3: d, src = u3[rid] + " [.u3]", ".u3"
    elif rid in R: d, src = R[rid], "receipt"
    elif rid in u1: d, src = u1[rid].replace("RESIDUE-U1", f"RESIDUE-U1 → {SUPP}") + " [.u1]", ".u1"
    elif rid in u2: d, src = u2[rid].replace("RESIDUE-U2", f"RESIDUE-U2 → {SUPP}") + " [.u2]", ".u2"
    elif owner == "GLASS": d, src = ("O-59" if in_relay(rid) else "UNRELAYED-GLASS"), "default"
    elif owner == "GLASS+CONSUMER": d, src = (f"O-59 (glass half) · RESIDUE-U3 → {SUPP} (consumer half)" if in_relay(rid) else f"UNRELAYED-GLASS · RESIDUE-U3 → {SUPP}"), "default"
    elif owner == "CONSUMER": d, src = f"RESIDUE-U3 → {SUPP}", "default"
    else: d, src = "UNDISPOSITIONED", "default"
    flags = set()
    if re.search(r"\b[0-9a-f]{8}\b", d): flags.add("sha")
    if "O-" in d and re.search(r"O-\d", d): flags.add("O-row")
    if "HONEST-RED" in d or "R-5 HOLD" in d or "VERDICT" in d: flags.add("honest-RED/verdict")
    if SUPP in d: flags.add("supplement")
    bucket = "+".join(sorted(flags)) or "NONE"
    out.append((rid, sev, page, owner, bucket, d))
with open(f"{HERE}/disposition-full.tsv", "w") as f:
    f.write("# SERVED MODEL: claude-opus-5-5 — X.W12.u3 the full UIA-V disposition table (every `#### UIA-V-` row of audit/UI-AUDIT-value.md: 676 numbered + 3 held). Columns: id sev page owner bucket disposition. sha = cured by that commit; O-59 = glass relay X-ALL-BK-UI-AUDIT.md (other O-rows named); HONEST-RED <ID> / R-5 HOLD / VERDICT = standing honest-RED or measured verdict; SUPPLEMENT X-W12S = consumer residue routed row by row to the X-W12 supplement (§0bl). Built by build-disposition-u3.py.\n")
    for r in out: f.write("\t".join(r) + "\n")
num = [r for r in out if re.match(r"UIA-V-\d+$", r[0])]
print("rows", len(out), "numbered", len(num), "held", len(out) - len(num))
print("NONE/UNDISPOSITIONED/UNRELAYED", sum(1 for r in out if r[4] == "NONE" or "UNDISPOSITIONED" in r[5] or "UNRELAYED" in r[5]))
for k, v in sorted(collections.Counter(r[4] for r in out).items(), key=lambda x: -x[1]): print(f"{v:4d}  {k}")
print("by source", dict(collections.Counter(("u3" if "[.u3]" in r[5] else "u1" if "[.u1" in r[5] else "u2" if "[.u2]" in r[5] else "receipt" if "[." in r[5] else "default") for r in out)))
