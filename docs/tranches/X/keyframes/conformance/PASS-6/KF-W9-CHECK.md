# KF-W9-CHECK — PASS-6 (fresh adversarial spec check, L-18/L-20)

**Subject** `docs/tranches/X/keyframes/waves/KF-W9.md` (697 L, 268,359 B, mtime **2026-08-29T15:17:38**, sha256 `bea2d9a6…c744`) — X.KF.W9, Safari Visual Audit, frontend half — **five times repaired** (rounds 1/2/3/4/5).
**Seat** FRESH. Nothing inherited. **PASS-5's 181 is NOT inherited**, exactly as that artifact instructs (*"No pass-6 seat should inherit 181 either"*). The census below is re-enumerated **by record** from the 58 `kf-*.md` with this seat's own stated rule and its own script (`p6w9census.py`). PASS-1's 167 · PASS-2's 147 · PASS-3's 139 · PASS-4's 168 · PASS-5's 181 were read only to know what has been ruled, never to inherit a figure.
**Substrate** keyframes.js `origin/master` **`81a56990736ced5b5edde0b84c527680ac7689b1`** (`git rev-parse origin/master`, exact, this seat). Local HEAD `8281638c` is **DISQUALIFIED**; the worktree is dirty (252 paths) and every keyframes measurement below is `git grep`/`git show` against `origin/master`. value.js at current tree bytes; where a sibling's history is load-bearing this seat additionally reads `git show HEAD:` (commit `fffb9685`, the round-5 staged bank) — the only reconstructible intermediate state of the round.
**Corpus** the 58 `registry/adjudicated/kf-*.md` (`ls kf-*.md | wc -l` → **58**). Sole carry `carry/KF-W6-CARRY.md`.

**LAW E(2) FIRST ACT — THE HASH RE-RUN.** `shasum -a 256 waves/KF-W*.md`, run before anything else this seat: **all eleven match `PASS-5/CLOSE-CERT-2.md` §9's closing table byte-for-byte** (`KF-W9` `bea2d9a6…c744` · `KF-W10` `1c107329…1c50` · the other nine likewise). **No file moved after the certificate. LAW E(1)/(2) HOLD; the round-5 write-set is provable and no mismatch convicts the round.** This is the first round in the program whose close is hash-proven and survives an independent re-hash.

**Verdict** **DEFECTIVE** — 9 defects (2 HIGH · 6 MEDIUM · 1 LOW). **Axis 1 (census) is CLEAN at 177/177/0** under a sixth independent enumeration. **Axis 3 (M-25 depth + frontier reproduction) is CLEAN — 19 of 19 pasted frontier commands re-run to their printed outputs.** **Axis 5 (posture) is CLEAN on every clause.** The convictions are on **axis 2** — the round-5 cure for D5-2 carries four coordinates that match **no state of `KF-W10.md` at any clock in this round**, and the certificate re-tabled them without re-deriving them — and on **axis 4's law-compliance arm**, where LAW E(4) and LAW F(1), both minted this round, are broken inside the round that minted them.

---

## §1 · Axis 1 — ID-KEYED CENSUS BY RECORD (own rule, own script, escapes by bytes)

### The rule, stated so pass 7 can disagree with it precisely

A **routed (record, id) pair** is an id that a record's **own bytes** route to KF.W9, by either shape:

1. **Disposition/roster row** — a line that opens a roster row (`- **…**` bullet · `| **…** |` table cell · `N. **…**` numbered row) **and contains the token `KF.W9`**, in a section not named scoreboard / killed-claims / superlatives / identity-guards / routing-summary / verdict / corrections / provenance / dissent. Ids are those in the row's **leading bold run**, split on `/ + · , & ≡` and truncated at the first em-dash, hyphen-space or open paren.
2. **Routing-summary segment** — the ids named inside that record's bolded `**KF.W9…**` head **inside the `## Routing summary` section**, differenced against (1).

**Divergence from PASS-5, stated:** this seat **includes** the *ruled-disagreements* tables (PASS-5 excluded them) — those rows carry real dispositions naming KF.W9 (kf-ChromeDock's `M-5 / C-6` and `D-19` are both booked there and nowhere else in bullet shape) — and **widens** the routing-segment head to all four spellings in the corpus (`- **KF.W9**:` ×12 · `- **KF.W9**` ×2 · `- **KF.W9 · Safari Visual Audit**:` ×1 · `- **KF.W9 SS-13**:` ×1). It **excludes** killed-claims routings, which PASS-5 also excluded.

### Measurement (script `p6w9census.py`, this seat)

| cell | measured |
|---|--:|
| records in corpus | **58** |
| records mentioning `KF.W9` at all | **52** (6 zero-mention: kf-KfPillTabs · kf-KeyboardShortcutsModal · kf-DemoGlobalChrome · kf-ControlsPaneWrapper · kf-ChannelControls · kf-AnimationControlsGroup) |
| raw rule-1 row→id hits | **154** |
| records with a bolded `**KF.W9**` routing-summary head | **16** |
| **routedTotal — distinct (record, id) pairs (rules 1 ∪ 2)** | **177 over 38 records** |
| **bookedCount** | **177** |
| **escapedCount** | **0** |

*On the denominator's shape.* Six seats, six numbers — **167 · 147 · 139 · 168 · 181 · 177** — one corpus. They are **granularity variants** (limb splitting, alias treatment, table-row inclusion, routing-segment spelling, killed-claims scope), not rival truths. **177 is this pass's enumeration and the discharge below is keyed to it. No pass-7 seat should inherit 177 either.**

### Discharge

A machine sweep over all 177 pairs, testing (i) presence of the id token in `KF-W9.md` and (ii) presence in that record's own `UNPROVEN-NEEDS-LIVE` / `SS-13` residue, returned **one candidate with neither**, adjudicated at the bytes:

| candidate | resolution (read this seat) |
|---|---|
| kf-ChromeDock `D-2-RESCOPED` | **discharged, route (d)** — the roster spells the id `D-2-RESCOPED` (`:70`, *"NO-WAVE-OWNER (icon ink policy with D-3); over-aurora visibility → KF.W9"*) while that record's residue item **#7** (`:135`) spells it **`D-2-residue`** and carries exactly the routed subject (*"base-arm divergence (label on `--glass-tint-ink`, glyph on `--foreground`) visibility over the aurora, in a non-`contrast-color()` browser"*). One id, two spellings, one record — booked, and filed as **D6-9**. |

**AXIS 1 VERDICT: CLEAN — 177 routed, 177 discharged, 0 escapes**, at a granularity that includes a row class PASS-5's extractor did not read. Six independent enumerations, six denominators, **zero hard escapes for the fourth consecutive pass**. The class booked at PASS-2 (R2-10's three) remains the last one found.

### Where the census is WEAKEST — recorded so pass 7 aims there

A second sweep re-ran the discharge with **record attribution enforced on every route**, not only on route (d): **155 of 177 pairs are record-attributed in the spec or named in their own residue; 21 discharge through the KF-CE-13 / RTL fold lists, which name fold members without a ⟨source⟩** (lawful under the spec's own route (b)); and **kf-SpringTarget `D-4` / `D-8` discharge through neither.** That record's routing summary (`:147`) reads *"**KF.W9**: the contrast reads (**D-4/D-8** SS-13 rows) · the PRM datum (D-3) · the a11y data (D-5's aria-hidden half, D-6, D-14, N-4)"*; `grep -n 'SpringTarget' KF-W9.md` returns the D-3, D-5, D-6, D-14+N-4 rows and **no D-4 and no D-8**, and that record's residue item **#4** carries the subject (*"Contrast reads over the live glass plate — the four derby tags (composited chain says 1.92-3.9 light); `.spring-target-marker` (50%) and `.sampler-ball` (65%)"*) **without naming either id**. Booked here under the spec's own route-(d) wording (*"the record's OWN list carries **the item**"*) — but **PASS-5's operationalization of route (d) was id-token presence in the residue, and under that test these two are hard escapes.** Filed as **D6-6**; the two passes' "0 escapes" verdicts are not the same claim.

### Counting family, re-derived at the post-round-5 bytes (never inherited)

| cell | spec claims | this seat measures | |
|---|---|---|---|
| §Carry bullets | 79 (A 18 · B 5 · C 1 · D 8 · E 7 · F 13 · G 19 · H 8) | **79**, same per-section split (section-scoped script) | ✅ |
| §Bounds data rows | 16 | **18 pipe rows − header − separator = 16** | ✅ |
| gate rows / live | 14 rows, 13 live (`-1..-9`, `-11..-14`) | **14 / 13**, `-10` struck in place, id retained | ✅ |
| dissents | 11 row-level + 1 wave-level = 12; 15 file-wide | **15** file-wide `Dissent preserved`; **11** inside `- **` §Carry bullets (`:114 :117 :119 :128 :130 :135 :141 :153 :171 :172 :176`) | ✅ |
| KF-CE-13 fold families | sixteen by ` · ` separation, stated only at §B | **16**, script-split at the bytes | ✅ |
| cross-edges | thirteen, stated only at S-10.1 | **13** numbered edges present | ✅ |
| escalation triggers | 13 armed over 12 records | **13** ` · `-separated armed items | ✅ |
| negative register | 6 records · 11 probes · 4 traps | **6 · 11 · 4** | ✅ |
| KF.W10 anchor set | six, enumerated once at S-10 | **6** (A1..A6), §Bounds points there and re-issues no numeral | ✅ **D5-3 CURED** |
| `KF.W3` occurrences | **6 file-wide · 1 spec body · 5 ledger/provenance**, at `:13 :285 :560 :575 :620 :637` | `grep -c` → **6**; `grep -on` → **exactly those six lines** | ✅ **D5-4 CURED, cell-for-cell** |
| `PASS-[0-9]/KF-W9-CHECK` | 35 occurrences; STANDING 12 at 11 cells; DATED 23; PASS-1 ×3 · PASS-2 ×2 · PASS-3 ×7 · PASS-4 ×5 · PASS-5 ×18 (12 standing + 6 dated) | **35**; by artifact **3 · 2 · 7 · 5 · 18**; the STANDING/DATED partition is **complete and exact at every multi-hit line** (`:75` 1+1 · `:100` 1+2 · `:102` 1+2 · `:164` 2+1 · `:13` 0+2 · `:672` 0+2); **every STANDING cell names PASS-5** | ✅ **D5-6 CURED at the instance AND at the class** |
| LAW-A scope receipt | 16 §Bounds data rows, 0 carrying `delete`/`repoint`/`shim`/`move` | **16 / 0** — `create` ×3 · `create/write` ×1 · `modify` ×2 · `modify-carve` ×1 · `EXECUTE NO WRITE` ×1 · read-only family ×7 · the append-only split ×1 = **16** | ✅ |

**Every counting-family cell in this file reproduces.** This is the first pass at which the whole family — including the two registers whose arithmetic was convicted at rounds 1, 2, 4 and 5 — re-derives without a single correction.

---

## §2 · Axis 2 — RECEIPT REALITY (cross-wave receipts vs FINAL bytes; ≥10 ⟨cmd⟩ samples re-run)

### The hash bracket — the round's own instrument, verified

`shasum -a 256` over all eleven specs reproduces CLOSE-CERT-2 §9's closing column exactly (§0 above). `grep -c 'PASS-5/CLOSE-CERT-2.md' KF-W9.md` → **8**, matching the certificate's §3 tally for this wave; `grep -c 'PASS-5/CLOSE-CERT\.md' KF-W9.md` → **0**, the dead path fully retired (R5-R6). **The D5-1 re-point is complete and the cert-path class is closed at this end.**

### The stage-1 receipts — HOLD

- **`KF-W5.md`** §Bounds `play-lifecycle` row and §Carry **B-6 · KF-TD-1**: both cells present and carrying `strategies.ts:66-75` + `snapToReducedMotion` at `:76`, re-read this seat at that file's round-5 final bytes. The round-4 mtime stamps (`16:55:55` / `16:59:25`) survive as **dated round-4 records**, which LAW E(4) permits (it retires stamping *from round 5 forward*, it does not order retroactive deletion). ✅
- **`KF-W6.md`** — the `G-KFW9-6` reciprocal and the **KF-HA-10** row quoted whole; sibling half at `KF-W6-CARRY.md:220` (frozen substrate, `10:49:45`, unmoved across six rounds — independently confirmed by CLOSE-CERT-2 §6.2). ✅
- **Line-numbered sibling cites, whole file**: `grep -on 'KF-W[0-9]\+\.md:[0-9]\+'` → **4** (`:53` `:286` `:356` `:357`), all `KF-W4.md:193` / `KF-W0.md:276`, **all four riding an explicit strike marker**. **Live line-numbered cross-cites in the KF-Wn.md spelling: ZERO.** ✅

### The forward (W10) receipts — the anchors HOLD; **the coordinates printed beside them match no state of the sibling**

All six anchors re-resolve at `KF-W10.md`'s final bytes, this seat:

```
(A1) grep -n 'X.KF.W9' KF-W10.md                        → :22    (1 line)
(A2) grep -n 'OP-4' KF-W10.md                           → :68 :226 :524          (3 lines)
(A3) grep -n 'PACKET-FIRST' KF-W10.md                   → :68 :84 :513           (3 lines)
(A4) grep -n 'D. → KF.W9 (Safari Visual Audit)' KF-W10.md → :547  (1 line)
(A5) grep -n 'surface verify' KF-W10.md                 → :206   (1 line)
(A6) grep -n 'CH2-02' KF-W10.md                         → :197 :208 :226 :531    (4 lines)
```

**6 of 6 anchors resolve; all six quoted passages are byte-exact at their true lines** (A1 `:22` · A2 `:68` · A3 `:513` · A4 `:547` · A5 `:206` · A6 `:208`). **The substance of this wave's forward seam is sound and no ruling re-opens.** What fails is the numeral arm — **D6-1** and **D6-2**.

---

## §3 · Axis 3 — M-25 DEPTH + MECHANISM S + FRONTIER REPRODUCTION

### Nineteen pasted frontier commands, re-run at `81a56990` this seat — **19 of 19 reproduce**

```
 1 git rev-parse origin/master                                   → 81a56990736ced5b5edde0b84c527680ac7689b1
 2 …:demo/components/instrument/shell/EditorShell.vue |sed 32,47p → :36 aspect-square w-8 scale-on-hover (shortcuts Button, cluster :32-40)
                                                                   :44-47 DarkModeToggle; :45 title="Toggle dark mode"; :46 class=…w-8…
 3 …:demo/app/dock/MbabbMenu.vue | sed -n '19,22p'                → third instance :19-22; :20 title; :21 class="aspect-square w-5"
 4 …:src/animation/index.ts | sed -n '50p'                        → export { reducedMotionScale } from "./internal/reduced-motion";
 5 …engine/play-lifecycle/frame.ts | sed 121p;131p;137p           → playFrame decl · const flipped = withReducedMotion( · snapToReducedMotion(anim);
 6 …engine/play-lifecycle/strategies.ts | sed 66p;75p;76p;109p    → /** · */ · export function snapToReducedMotion< · return beginPlay(… withReducedMotion(
 7 …src/animation/group/group.ts | sed -n '57p'                   → respectReducedMotion = false;
 8 …src/animation/constants/defaults.ts | sed -n '87p'            → respectReducedMotion: false,
 9 …src/animation/waapi/delegation.ts | sed -n '53p;64p'          → const shadowTick = (now: number)… · animation.playback.loop(shadowTick);
10 git grep -c withReducedMotion … waapi/delegation.ts            → exit 1 (no hits)
11 …src/animation/physics/numeric.ts | sed -n '82p;89p'           → constructor(keyframes…) · this._respectReducedMotion = options?…?? false;
12 git grep -n '\breducedMotionScale\b' -- src/ demo/ test/ scripts/ | wc -l → 6 ;  -- demo/ → exit 1
13 …package.json | sed -n '43p'                                   → "gh-pages": "vite build --mode gh-pages",
14 …demo/scenes/sequence/SequenceTarget.vue | sed -n '97p'        → class="seq-handle"
15 git grep -n focus-visible -- design-idioms.css playback-idiom.css → design-idioms.css:76 .focus-ring:focus-visible (doc :73-74)
                                                                     playback-idiom.css:72 .btn-playback:focus-visible
16 git grep -c forced-colors -- demo/                             → exit 1 (ZERO)
17 git ls-files …/audit/visual/safari-real/ | wc -l               → 4 tracked vs 31 on disk;  shots/ → 0 tracked vs 11 on disk
18 …engine/playback-state.ts | sed 1,6p                           → :2-3 "carved off engine/play-lifecycle.ts at S.B2"; :4 "./play-lifecycle"
19 …group/lifecycle.ts | sed 1,8p ; …orchestration/sequence/lifecycle.ts | sed 1,8p → :4-5 / :5-6 "mirroring … engine/play-lifecycle.ts"
```

**All nineteen return exactly what the spec prints beside them.** **D5-5's cure is CORRECT at the bytes**: three sibling docblocks name the flat path as the **origin of the carve** (*"carved off"*, *"mirroring"*) and one (`playback-state.ts:4`) names the **live `./play-lifecycle` specifier`* — no stale prose exists outside the module, exactly as the round-5 restatement says. **D4-4's `:53`, D4-7's `:82-89`, D3-8's `orbital-drag/` path and R5-1(5)'s EH anchors all reproduce.**

### M-25 depth

**D-14 + N-4 one-binding lock** carried verbatim with the *never split* gloss ✅ · the **a11y one-edit family** ✅ · **D-B3 lattice lock** carried twice ✅ · **S-14's N-1 time-domain lock** entered in §Sequencing with its NOT-governed scope stated ✅ · the **amiga shared-idiom cure lock** carried, not cited ✅ · **KF-AV-28** carried whole at §H with seven governed rows + one identity-governed twin + D-24 named as a not-yet-governed datum ✅ · **all twelve dissents present** (11 in §Carry bullets + the wave-level S-12/OP-7) ✅ · **K-5, K-6, K-8, K-31, the RR-1 cure law, the M-4 MUST-CARRY riders, KC-34's edict, the LP-1 lock, the TD-1/TD-2 bundle** all carried rather than cited ✅.

### Mechanism S — moved/dropped rows and their shadows

**This wave moved nothing**: §SHADOW's *"Rows moved this round: ZERO. Routings minted: ZERO. Ids re-keyed: ZERO"* is **re-derived true** — §Carry is unmoved at 79 with an identical per-section split, gate ids are un-renumbered, §Bounds is unmoved at 16, and the two alias spellings edited existing bullets (no bullet added). **The one restoration that touches this wave is a sibling's**: R5-1 restores **EH-4 / EH-5 / EH-8** LIVE at KF.W6, and this wave's §G guard row carries the dated vindication line with the frontier bytes re-derived read-only (verified at sample 2/3 above). **The shadow lands at both ends.** ✅

**But the LAW F(1) *at-the-act* discipline is not met — D6-4.**

**AXIS 3 VERDICT: CLEAN.** Sixth consecutive pass with no conviction on depth, and the first at which every frontier command in the file reproduces on a nineteen-sample sweep.

---

## §4 · Axis 4 — GATES: REACHABLE GREEN · LAW-A CENSUSES · CORPUS-DERIVED OPERANDS · LAWFUL LANDING SURFACES

**Born-RED witnesses re-executed** (§3 samples 15/16/17 + the iOS family): G-KFW9-1 (4 tracked / 31 on disk; shots 0/11) ✅ · G-KFW9-8 (`forced-colors` in `demo/` → exit 1, zero) ✅ · G-KFW9-9 (two unlayered selectors at `design-idioms.css:76` and `playback-idiom.css:72`) ✅ · G-KFW9-10's surviving measurement (`SequenceTarget.vue:97`) ✅ · G-KFW9-14 (both shas exact; `package.json:43` live) ✅.

**REACHABLE GREEN — HOLDS.** All thirteen live gates close on acts inside this wave's grant. **G-KFW9-6's R4-3 re-cut stands** (three own-wave measurements; the unification constraint handed to KF.W5/KF.W6 with both reciprocals verified); **G-KFW9-13 is reachable** through the §Bounds append-only split. Round 5 changed no gate id, CLOSES, falsifier or witness — verified by diff of the counting family.

**CORPUS-DERIVED OPERANDS — HOLD.** G-KFW9-4's `565 + 25`; G-KFW9-8's **sixteen** fold families (script-counted at §B's enumeration, 16); G-KFW9-13's **thirteen** armed triggers (13 ` · `-separated items); G-KFW9-12's **6 records · 11 probes · 4 traps**; S-10.1's **thirteen** cross-edges; S-11's **17 = 9+6+2**. Every gate's operand is stated at its own enumeration and every dependent cell points there rather than re-issuing a numeral. **The register-numeral class that produced D-10, D-5, D3-5, D4-3 and D5-3 is, for the first time, closed at every register in the file.**

**LAWFUL LANDING SURFACES — one act's ground is falsified. D6-5.** Every write this wave performs has a §Bounds row: the capture cells, the receipt, `evidence/W9/**`, the harness (EXECUTE-NO-WRITE), and the registry addenda (append-only, `.e` alone). The one exception is **G-KFW9-5**, whose CLOSES amends the census row against a §Bounds cell that marks the amendment target `read-only`; the file declares the contradiction absent on a ground its own sibling cell refutes.

**LAW E(4) is broken by this wave's own round-5 edit — D6-3.** The law is unambiguous: *"Every same-round cross-wave receipt written by a per-wave seat is **anchor-only** — §-heading + row/gate id, **no quoted sibling prose, no line numbers**, no per-seat mtime stamps. **The RECONCILE seat alone** … appends the dated quote-by-command receipts."* The S-10 block prints **six quoted `KF-W10.md` passages and twelve `KF-W10.md` line numbers**.

---

## §5 · Axis 5 — POSTURE

| clause | finding |
|---|---|
| **W4 head honored** | ✅ **by construction and by measurement**: §Bounds carries **zero** kf write grants (all five EXECUTION-TIME-ONLY grants struck, each re-marked READ-ONLY), the access column is grepped in the file's own receipt (16 rows / 0 LAW-A verbs), and S-13's triumvirate fence is never armed by this wave's own gates. OP-6 is true by construction after R-9a. |
| **W3 gated-unscheduled** | ✅ **and now with a numeric arm that reproduces.** `sed -n '1p' KF-W3.md` → *"# KF.W3 — Parser Consumption (GATED, never scheduled)"*, exact. W9 schedules nothing against it. `grep -c 'KF\.W3\b' KF-W9.md` → **6**, and §SCOPE (1) prints **6 file-wide · 1 spec body · 5 ledger/provenance** at exactly the six lines the command returns. **D5-4 is CLOSED — the five-round recursion ends here.** |
| **O-21 (not O-20)** | ⚠️ **posture correct, count moved.** `grep -c 'O-20\|O-21' KF-W9.md` → **1 line / 2 occurrences**, where PASS-5 recorded **0**; both tokens sit in the round-5 ledger's carried decline (`:692`). No mint is imported and no W1 coordinate rides here, so the posture is untouched — but the register has no scope rule attached to it, unlike `KF.W3`'s. **D6-8.** |
| **§6.D successor register cited** | ✅ **resolves at both ends.** S-11 states the canonical **17-packet roster** and its homing **KF.W11 ×9 · KF.W12 ×6 · KF.W13 ×2** (9+6+2 = 17, re-summed); the two LAW-A blast-radius hand-offs are addressed to **`KF-W10 §6.D`'s KF.W11 and KF.W13 rows** with the express reason (*"KF.W11/KF.W12/KF.W13 are MINTED-UNAUTHORED per R4-8, so a census handed to a filename would have no reader"*), at `:465` and `:494`. Verified at the far end: `grep -n '§6.D' KF-W10.md` resolves, the register exists, and R5-12's clause-4 discharge (`COHESION.md:185` = §0d, boundary line at `:188`) is independently confirmed by CLOSE-CERT-2 §4 · R5-R3. |
| **COHESION §0d cited from this end** | ⚠️ **not cited — `grep -on 'COHESION' KF-W9.md` → ZERO.** No directive addressed §0d to this wave (RULINGS-5 §END routes R5-12 to KF.W10 alone), and W9's minted-unauthored statement rides the §6.D register instead, which resolves. **Recorded, not booked** — the boundary line governs a disposition this wave states through a reader that exists. |
| **The EH-4/5/8 restoration with true anchors** | ✅ **the strongest cell in the file.** The §G guard row's dated line names the restoration, cites `KF-W6.md §Carry` and `KF-W0.md §Excluded` **anchor-only (LAW E(4)-compliant)**, and re-derives the frontier bytes read-only: `EditorShell.vue:45` `title="Toggle dark mode"` · `:46` `class="aspect-square w-8 scale-on-hover"` · `:36` the cluster mate · `MbabbMenu.vue:20-21` the `w-5` third instance — **all four re-executed by this seat and byte-exact**. The row correctly declines EH-4 as a KF.W9 measurement while naming it, and adds the measurement note that the ladder is shot at the live shell and the MbabbMenu instance is a separately-labelled cell. **This is the round's central act and it is right at both ends.** |
| **KF-AV-28 present where governed** | ✅ carried whole at §H, governed set enumerated by id from all three banked coordinates, ribbon's §7 caution on the same line. |

---

## §6 · DEFECT REGISTER — 9 booked

### D6-1 · HIGH — the D5-2 cure's own numeric arm: **four of the six "verified by command" coordinates match NO state of `KF-W10.md` at any clock in this round**

R5-8(a) replaced the round-4 delegation with *"this pass's verification by command"*, and S-10 discharges it with a two-column table (`:257-282`) whose col B is labelled *"the SAME anchors **re-run by THIS SEAT at write time**"*. Three-way measurement, this seat:

| anchor | col A ⟨LAW E(3) baseline, 209,923 B⟩ | **col B ⟨W9's claim⟩** | round-5 staged bytes ⟨`git show HEAD:` = `fffb9685`, 248,443 B⟩ | final bytes ⟨current⟩ |
|---|--:|--:|--:|--:|
| A1 §State | :20 | **:22** | :22 | :22 ✅ |
| A2 OP-4 | :66 | **:68** | :68 | :68 ✅ |
| A3 PACKET-FIRST | :485 | **:503** | **:513** | :513 ❌ |
| A4 §D cross-edge | :519 | **:537** | **:547** | :547 ❌ |
| A5 §B-1 | :182 | **:198** | **:206** | :206 ❌ |
| A6 §B-3 | :184 | **:200** | **:197** | :197 ❌ |

`KF-W10.md` has exactly **two** reconstructible states in round 5 — the LAW E(3)-pinned opening baseline (col A's offsets) and its round-5 written state (`:22 :68 :513 :547 :206 :197`, **identical at the staged commit and at final bytes**, the certificate's own edits having moved none of the six). **col B is neither.** A1/A2 match the written state; A3–A6 match nothing — off by −10, −10, −8 and +3. A receipt presented as a command's output must be the command's output; four of these six are not, and the file's own §RECEIPT row calls this block *"the drift class demonstrated rather than asserted"*.

**Compounding, same block: three of the six pasted commands are multi-line and are printed as single numerals.** At the state col B claims, `grep -n 'OP-4' KF-W10.md` returns **5** lines, `grep -n 'PACKET-FIRST'` returns **4**, `grep -n 'CH2-02'` returns **4** — printed as `→ :68`, `→ :503`, `→ :200`. This is the identical fault PASS-5 §2 corrected in the KF-TD-1 receipt (`grep -n '66-75' KF-W5.md` → six lines printed as two) and that LAW D(3) exists to forbid, reproduced in the round that restated LAW D(3) as R5-11.

**The substance is unharmed**: all six anchors resolve and all six quoted passages are byte-exact at their true lines (§2). **The wave's forward seam is real.** What is false is the arithmetic the cure was written to supply.

**Cure**: strike col B entirely (LAW E(4) forbids a per-wave seat printing sibling line numbers at all — **D6-3**), keep col A as the check's dated baseline with its artifact named, and let the six anchors stand alone with `CLOSE-CERT`'s final-bytes column as the verifier of record. If a numeral must ride, print the command's **whole** output.

### D6-2 · HIGH — `CLOSE-CERT-2` §7.2 re-tabled col B without re-deriving it, and built LAW E(4)'s headline demonstration on it; §6.1's certified write order makes col B impossible

The certificate's §7.2 prints the same three columns and concludes *"**5 of 6 OFFSETS MOVED AGAIN between col B and col C** … **That is the drift class demonstrated a third time in one round, and it is the entire argument for LAW E(4)**"*. Col C is correct — `:22 :68 :513 :547 :206 :197` reproduces exactly at final bytes, this seat. **Col B was copied from W9 and never re-derived**, so the certificate's central LAW-E argument rests on four numerals that describe no state of the file it certifies. That is **citation-inheritance at the certifying instrument** — D5-2's shape, one layer out, for the second consecutive round.

**And the two instruments cannot both be true.** CLOSE-CERT-2 §6.1 certifies the per-wave order *"… W8 19:11:06 → **W9 19:17:10** → W1/W7 19:28 (predecessor reconcile) → **W10 19:30:41**"* and concludes *"LAW C's stage order held … **W10 last of the per-wave seats**"* — the order W9 itself restates twice (`:77`, `:284`: *"KF.W10 writes LAST of the per-wave seats this round"*). Under that order `KF-W10.md` stood at its 209,923-byte baseline when W9 wrote, so col B could only have reproduced **col A** — which it does not at any of six cells, while matching the *later* state at two. Either W10 wrote before W9 (and the certified stage order is false) or col B was not measured (D6-1). **Both horns convict a round-5 receipt**, and §3 of the same certificate additionally attributes the 19:30:41 W10 write to the *predecessor reconcile pass*, leaving W10's own per-wave write time recorded nowhere.

**Cure (W9's half)**: delete the provenance sentence *"after KF.W10's round-5 seat had already written once"* — a per-wave seat's claim about a sibling's write history is exactly the class LAW E(4) retires — and condition the cell on the certificate's final-bytes column alone. **The certificate's half belongs to the round-6 reconcile seat**, which must re-derive col B or strike it; this check has re-derived it and records the result so no seat need trust the table again.

### D6-3 · MEDIUM — LAW E(4) is broken inside the round that minted it: a per-wave seat printed six quoted sibling passages and twelve sibling line numbers

LAW E(4), verbatim: *"Every same-round cross-wave receipt written by a per-wave seat is **anchor-only** — §-heading + row/gate id, **no quoted sibling prose, no line numbers**, no per-seat mtime stamps … **The RECONCILE seat alone** verifies every receipt at final bytes and appends the dated quote-by-command receipts."*

Measured at S-10 `:257-282`: **six quoted `KF-W10.md` passages** (A1's *Opens after* fragment, A2's OP-4 cell, A3's PACKET-FIRST law, A4's §D row, A5's *surface verify*, A6's dock-contract sentence) and **twelve `KF-W10.md` line numbers** (`:20 :22 :66 :68 :485 :503 :519 :537 :182 :198 :184 :200`) — **ten of which do not resolve at that file's final bytes**. All three prohibitions, in one block, written by a per-wave seat.

The file anticipates the charge and hedges it twice — §Bounds `:77` *"No W10 prose is quoted **here**"* (true of that cell only) and S-10's SHADOW line *"No W10 prose is quoted **as a receipt of record**"* — but LAW E(4) contains no *as-a-receipt-of-record* qualifier, and a hedge that narrows a flat prohibition is not compliance. R5-8(a)'s *"each with its `grep -n`"* is the strongest defence available and covers **col A's** six coordinates from the named artifact; it does not order a second self-measured column, and it orders no quotations at all.

**Cure**: reduce the block to the six anchors + col A cited to `PASS-5/KF-W9-CHECK.md §2` as a dated artifact reading, and let CLOSE-CERT supply the quote-by-command receipts, which is what LAW E(4) reserves to it.

### D6-4 · MEDIUM — LAW F(1)'s at-the-act SHADOW line is present for 2 of the round's 8 enumerated acts, under a preamble that asserts all 8 carry one

LAW F(1): *"Every repair act whose verb strikes, moves, drops, re-keys, narrows, re-points or mints … carries, **in the same edit**, a mandatory **SHADOW line** … An act without its SHADOW line is an incomplete act — **the pass-6 checks test for the line's presence at every such verb**."* This check runs that test.

`grep -on 'SHADOW' KF-W9.md` → `:13 :13 :164 :164 :195 :284 :284 :599 :601 :603 :616`. Discounting the round-5 preamble (`:13`), the §G reference to **W6's** shadow (`:195`) and the ledger's own section (`:599-616`), the at-the-act SHADOW lines are **two**: §F `:164` and §Sequencing S-10 `:284`.

The §SHADOW table enumerates **eight** acts, and its preamble states as fact: *"Per LAW F(1) **each act carries its own SHADOW line AT the act**; this table is the round's enumeration."* Measured against the bytes, acts **4** (closure re-point at three cells), **5** (the two alias spellings), **6** (the §RECEIPT warrant narrowing), **7** (the census-1 characterisation strike) and **8** (the three struck figures + the S-10.1 parenthetical) carry **no SHADOW line at the act**, and four of act **3**'s five re-pointed cells (header `:3`, §Carry head `:98/:100/:102`, §Bounds PRM row `:75`) carry none either. Every one of those acts uses a verb on LAW F(1)'s own trigger list (`STRUCK`, `re-pointed`, `NARROWED`).

The consequence is bounded — §SHADOW's enumeration is complete and correct, and LAW F(2)'s terminus sweep was discharged by the certificate at §7.6 — but the **preamble is a universal its own file falsifies by grep**, in the round that minted the law, and LAW F(1)'s stated purpose is that the shadow travel *with the edit* rather than in a table a later reader must find.

**Cure**: either land the six missing SHADOW lines, or restate the preamble at its true scope — *"two acts carry an at-the-act SHADOW line; the remaining six are citation-level and are shadowed by enumeration in this table alone"* — with the LAW F(1) exemption argued rather than assumed.

### D6-5 · MEDIUM — G-KFW9-5's reachability ground is stated in terms its own sibling cell refutes; the amendment target is still marked `read-only`

§Bounds `:70`: `` …/megatranche/formation/keyframes/CENSUS-2026-08-03.md · `lane-frontend.md §6.5` | **read-only** | the census row amends (G-KFW9-5); the lane file is dated evidence, never rewritten ``. **One access word over two paths**, and the note distinguishes them the other way round: *"the census row **amends**"* for the census file, *"never rewritten"* for the lane file.

§Bounds `:69`, inside the D4-5 split note, declares the contradiction absent: *"**G-KFW9-5's shape is unchanged and remains consistent** (there §Bounds says `read-only` of **`lane-frontend.md §6.5` specifically** and routes the amendment elsewhere, so no split is owed)."* The first ground is **false at the cell it describes** — the `read-only` attaches to both paths, the census file included, and the word that singles out the lane file is *"never rewritten"*, not *"read-only"*. The second ground is **true** (the `evidence/W9/**` create row names *"the census-amendment draft"*), and it is what carries the conclusion.

This is exactly the shape of the defect the same round cured at D5-5 — a conclusion that survives on a ground its own transcript refutes — and it is the D4-5 contradiction's last unswept sibling: round 4 split the cell whose gate could not close without a write, and stated the other cell consistent from memory rather than from the bytes.

**Cure**: restate `:69`'s parenthetical as *"there the amendment lands as a **draft** under the `evidence/W9/**` create row, so the census file's `read-only` is never breached and no split is owed"*, and make `:70`'s note say which of its two paths each clause governs.

### D6-6 · MEDIUM — kf-SpringTarget `D-4` / `D-8` reach this wave only as an unnumbered aggregate item, and §E — the wave's named contrast seat — carries neither

`kf-SpringTarget.md:147` routes, in that record's own words: *"**KF.W9**: **the contrast reads (D-4/D-8 SS-13 rows)** · the PRM datum (D-3) · the a11y data (D-5's aria-hidden half, D-6, D-14, N-4) · touch-action witnesses · the SS-13 list."* Four of the six named limbs are carried as §Carry bullets (D-3 at §A; D-5, D-6, D-14+N-4 at §F). **The two the record names FIRST are not.** `grep -n 'SpringTarget' KF-W9.md` returns no line carrying `D-4` or `D-8` for that record; §E's contrast roster is `KF-AV-19/D-8 ⟨kf-AnimationVisualizer⟩ · KF-ET-8 · KF-ET-14/D-M-6 · KF-ET-4 · SPF-5 · #58 · D-B2/L-M-4/C-M-4 + D-M4`, and S-8's shared-capture family (ii) names the `Card cartoon tier="quiet"` plate for four other records.

Discharge is by route (d) **at the item, not at the id**: that record's residue **#4** carries *"Contrast reads over the live glass plate — the four derby tags (composited chain says 1.92-3.9 light); `.spring-target-marker` (50%) and `.sampler-ball` (65%), the two rows near the 3:1 floor"* — the subject, with neither id written. Booked here under the spec's own wording (*"the record's OWN list carries **the item**"*). **But PASS-5's operationalization of route (d) was id-token presence in the residue, under which these are hard escapes** — so the two passes' "0 escapes" are not the same claim, and the corpus's self-described worst contrast figure (**1.92:1 light**, kf-SpringTarget's own superlative) reaches this wave only as an unnumbered line inside ≈590.

**Cure**: either write the two ids into §E beside the other contrast rows (no re-booking, no re-grade — the bank's disposition is *"NO-WAVE-OWNER + KF.W9"* for both), or state at §Carry head that route (d) discharges **by item** and that residue items need not name their ids — one sentence, which also makes the next census reproduce.

### D6-7 · MEDIUM — the round-5 STANDING ID RULE is a universal that six banked co-ids in this same file falsify, four of them colliding live

Entered at the §Carry format line `:95`: *"**STANDING ID RULE** … **banked aliases are written in full, never discharged by identity** (`KF-ET-14 / D-M-6` · `D-6 / m-6`)."* Both named exemplars are spelled (4 occurrences each, verified). The class is not swept. Measured this seat:

| banked pair (record) | spec spells | bare token in this spec resolves to |
|---|---|---|
| `KF-CE-47 · D-17` ⟨kf-CSSCodeEditor `:85`⟩ | `KF-CE-47` only | **`D-17` ×2 — both `KF-W9-CHECK D-17`, a PASS-1 *check-defect* id** |
| `KF-ET-12 · C-15` ⟨kf-EasingTarget `:51`⟩ | `KF-ET-26/12` (suffix form; `KF-ET-12` is not a resolvable token) | **`C-15` ×3 — all kf-AmigaScene's `D-7 / C-15 / L-m8`** |
| `KF-KE-8 · D-5` ⟨kf-KeyframesEditor `:50`⟩ | `KF-KE-8` only | **`D-5` ×15 — headed by kf-SpringTarget's `D-5 (aria-hidden half)` at §F** |
| `KF-SST-13 · D-4` ⟨kf-StartingStyleTarget `:54`⟩ | `KF-SST-13` only | **`D-4` ×9 — kf-SequenceTarget's at §A, kf-ChromeDock's at §G** |
| `KF-SST-14 · D-7(b)` ⟨`:55`⟩ | `KF-SST-14` only | **`D-7` ×12 — kf-AmigaScene's at §A** |
| `KF-SST-17 · D-10` ⟨`:58`⟩ | `KF-SST-14/-17` (suffix form; **`KF-SST-17` is not a resolvable token in this file**) | `D-10` ×8, none of them this row |

`D5-8`'s cure spelled the two aliases the check named and then wrote a **universal** covering a class the round did not enumerate — R4-10's *scope-not-instance* lesson, one round after the same lesson closed D5-6. Nothing escapes (each pair discharges by its primary id or by fold), the substance travels, and no row moves. What is false is a rule stated in the file's own voice about the file's own bytes.

**Cure**: restate as scope-with-enumeration — *"the two aliases PASS-5 named are spelled; the remaining banked co-ids are carried by primary id and are listed here"* — and add the class to §SCOPE's greppable partition, `grep -on 'KF-SST-1[47]\|KF-ET-12\|KF-CE-47\|KF-KE-8\|KF-SST-13'`, so the sweep is a command rather than a memory.

### D6-8 · LOW — the O-20/O-21 register moved 0 → 2 occurrences in the act of carrying its own decline, with no scope rule attached

PASS-5 §5 recorded *"`grep -c 'O-20\|O-21' KF-W9.md` → **0**"* as the posture receipt. At the round-5 bytes it returns **1 line / 2 occurrences**, both at `:692`, where the round-5 ledger carries PASS-5 §7 item 13 forward — *"**O-20/O-21 is correctly not this wave's surface**"*. **The posture is untouched and correct**: no mint is imported, no W1 coordinate rides here, and outside ledger prose the count remains 0.

This is the D4-6 recursion at its fourth register (after the `KF.W3` token, the dissent roster and the §F citation class), and the file already owns the remedy — §SCOPE (1)'s counting rule, which excludes ledger and provenance prose by name. It was applied to `KF.W3` and not to this one, so a pass-7 seat running the same command PASS-5 ran gets a different answer with no in-file rule to reconcile it.

**Cure**: one line at §SCOPE, *"`O-20`/`O-21`: **2 occurrences, both in the round-5 ledger's carried decline; 0 in the spec body** — the same scope rule as `KF.W3`"*.

### D6-9 · LOW — kf-ChromeDock's `D-2` is a third D5-8-class alias pair, spelled two different ways by its own record and neither way by this spec

The roster row is `**D-2-RESCOPED — MINOR (ruled)**` (`kf-ChromeDock.md:70`, *"NO-WAVE-OWNER (icon ink policy with D-3); **over-aurora visibility → KF.W9**"*); the residue item that discharges it is `**D-2-residue**` (`:135`). **This spec writes neither**, and the §G ChromeDock cluster carries M-5/C-6 · M-2/C-4 · D-4 · D-22+RR-1 · D-23/C-5 · D-6/m-6 and no D-2. The id's discharge is route (d) — lawful, and identical in shape to the `m-6` adjudication D5-8 cured at the same record — but it is the single candidate this seat's extractor could not resolve without reading the bank, which is what "carried by identity" costs a machine reader.

**Cure**: one clause in §G's ChromeDock cluster, `⟨kf-ChromeDock⟩ D-2-RESCOPED / D-2-residue — route (d), residue item #8`, on the D5-8 pattern. No bullet, no booking, no severity.

---

## §7 · WHAT THIS PASS DECLINES TO BOOK

Recorded so pass 7 does not manufacture them:

1. **No census escape.** 177/177/0 at a granularity that includes the ruled-disagreements row class. A pass booking a hard escape must first defeat the `D-2-RESCOPED` adjudication in §1 and read the route-(d) caveat at **D6-6** before claiming one there.
2. **LAW E(1)/(2) HOLD.** All eleven sha256 match CLOSE-CERT-2 §9. **The round closed lawfully and its repairs bank.** Do not re-open the round-4 seal question — R5-2's attribution is the record and E-3 keeps `PASS-4/CLOSE-CERT.md` immutable.
3. **D5-1 and the cert-path class are CLOSED at this end** — 8 cites to `PASS-5/CLOSE-CERT-2.md`, 0 to the dead path.
4. **D5-3 is CURED.** Six anchors, one enumeration at S-10 with its counting rule; §Bounds points there. The *anchors* are not the defect — the *offsets* are (D6-1).
5. **D5-4 is CURED, cell-for-cell.** `6 · 1 · 5` at exactly the six lines the command returns. The five-round self-falsifying-count recursion ends. Do not re-open it.
6. **D5-5 is CURED and reproduces at the frontier** — three carve-origin docblocks, one live specifier, no stale prose.
7. **D5-6 is CURED at the instance AND at the class.** The STANDING/DATED partition is complete and exact at every multi-hit line; every standing cell names PASS-5.
8. **D5-7 is CURED.** `awk '/^## §4/,/^## §5/' … | grep -o 'G-KFW9-[0-9]\+' | sort | uniq -c` → **PASS-4 §4 names 7** (`-1 -6 -8 -9 -10 -13 -14`), **PASS-5 §4 names 8** (adds `-11`); the re-executed counts 5 and 6 are right and the six documentary gates (`-2 -3 -4 -5 -7 -12`) are correctly declared.
9. **G-KFW9-6 and G-KFW9-13 remain CURED** — do not re-open D4-2, D4-5 or the round-1 D-3 class.
10. **The 565 / ≈590 denominator and its amended command are BOTH correct.** Not re-opened; PASS-5 reproduced it a third time and this seat declines a fourth.
11. **The two `D-15`s are distinct banked ids** (kf-RibbonBar forced-colors fold vs kf-SequencePlayhead RTL posture). Never merge them. Likewise the two `D-6`s.
12. **kf-TimelineTrack D-8 is not a W9 escape** — it routes → KF.W7. Verified for the fourth consecutive pass.
13. **S-10.1's coincidence disclosure must not be trimmed**; thirteen is stated at its enumeration.
14. **The round-1 decline (D-14, KF-EST-4's missing KF.W6 counterparty) stands** on R-19e for the sixth pass.
15. **The EH-4/5/8 restoration is right at both ends** and this wave's guard row is the model for how a sibling's shadow should land. Do not disturb it.
16. **COHESION §0d's absence from this file is not a defect** — no directive routed it here and the §6.D register carries the disposition to a reader that exists.

---

## §8 · VERDICT

**DEFECTIVE** — but for the first time the frontier is *entirely* procedural, and the wave's substance is untouched at every point.

**Three of the five axes are CLEAN, and two of those are clean for the first time in this file's history.** The census closes at **177 routed / 177 discharged / 0 escapes** under a sixth independent enumeration that reads a row class the previous extractor did not. Axis 3 is clean for the sixth consecutive pass and now reproduces on a **nineteen-sample** frontier sweep with zero corrections. Axis 5 is clean on every clause, including the two that have never both held — the `KF.W3` numeric arm (`6 · 1 · 5`, exact) and the successor-formation disposition, which resolves at both ends. **Every register in the file now states its numeral at its own enumeration, and every dependent cell points there**: the class that produced D-10, D-5, D3-5, D4-3, D4-6, D5-3 and D5-4 across five rounds is closed at all eight of its registers.

What survives is a **single shape, in two layers**: *the receipts are sound and their coordinates are not.* The round-5 cure for D5-2 — the wave's only forward receipt, and the seam PASS-3 convicted, PASS-4 mis-delegated and PASS-5 executed by hand — was discharged with a self-measured coordinate column that **matches no state of `KF-W10.md` at any clock in this round** (**D6-1**, three-way verified against the LAW E(3) baseline, the committed round-5 staged bytes, and the final bytes), and the certificate **re-tabled that column without re-deriving it and made it the headline demonstration of LAW E(4)** (**D6-2**) — while its own certified write order makes the column impossible. The anchors themselves resolve 6 of 6 and every quoted passage is byte-exact, so *nothing in the wave's substance moves*; what fails is, once again, the machinery that proves it.

Beneath that sit two **laws broken inside the round that minted them** — LAW E(4)'s anchor-only rule, violated at all three of its prohibitions in one block (**D6-3**), and LAW F(1)'s at-the-act SHADOW line, present at 2 of 8 acts under a preamble asserting 8 (**D6-4**) — and four residual cells: a gate-reachability ground its own sibling cell refutes (**D6-5**), two banked contrast ids reaching the wave only as an unnumbered aggregate item (**D6-6**), a newly-minted alias universal that six co-ids falsify with four live token collisions (**D6-7**), plus two LOW register/alias items (**D6-8**, **D6-9**).

**None of the nine touches a row, a gate, a lock, a rider, a dissent or the posture.** The wave still measures: **zero write grants in the kf tree**, zero cures spent, status `planned`, gate ids un-renumbered, §Carry unmoved at 79 with an identical per-section split, §Bounds unmoved at 16, thirteen live gates all with reachable green, every cure-shape lock and all twelve dissents carried, zero rows moved and zero routings minted. **Seven of the nine are repairable inside this spec.** **D6-2's second half belongs to the round-6 reconcile seat** — this check re-derived the column it certified and records the result so no seat need trust that table again.

*Fresh L-18/L-20 seat, PASS-6, 2026-08-29. Sole write: this file. Nothing here stamps a wave, opens product source, edits a prior PASS artifact, or touches a registry record; keyframes.js was read read-only at `origin/master 81a56990` throughout, and `git show HEAD:` was used only to reconstruct a value.js sibling's own committed history.*
