# X·F CONFORMANCE PASS 5 — F-W6 ADVERSARIAL SPEC CHECK (L-18 / L-20, round 5)

**Seat**: fresh PASS-5 check seat, 2026-08-29. **Subject**: `docs/tranches/X/fourier/waves/F-W6.md` (631 lines, read whole this session).
**Operands, and only these**: `../CENSUS-CANONICAL.md` (the sole census operand; `shasum -a 256 | cut -c1-12` → `a450b8e9f80e`, **matching the spec's own §0.3 pin**) · `PASS-4/RULINGS-4.md` (the directive set) · the 66 frozen `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` · the live `waves/` siblings, re-hashed at this sitting · the read-only `fourier-analysis` product tree for the born-RED witnesses.
**Not operands** (R3-4 / R4-3): `PASS-4/CLOSE-CERT-2.md`, any `PASS-n/F-W6-CHECK.md`, `formation/fourier/CENSUS-2026-08-03.md` as a denominator. `CLOSE-CERT-2.md` was read once, for provenance, and is cited nowhere as a figure.
**Toolchain**: `bash` + `/usr/bin/grep` / `sed` / `awk` / `cut` / `comm` / `shasum`, BSD, on the recorded host — R4-2's pin, honoured by this seat as well as checked.

**VERDICT: DEFECTIVE.** Four HIGH defects and eight MEDIUM survive round 4. The census axis is CLEAN by construction and the quotation-truth axis is the healthiest it has been in five passes — **not one fabricated quotation was found; every quoted word reproduced at its source**. What did not survive is the *instrument* discipline (eleven receipts publish a paste their own command does not print) and, sharper, **three record ids are BOOKED at F.W6 that the canonical homes at F.W3, F.W4 and F.W5** — R4-10's fabrication clause, met at three sites, one of them with no band leg at all.

---

## §0 THE CENSUS AXIS — mechanical, and it closes

R4-10's roster table gives this wave one line: **`F-W6 | 0 record-side (§4.1) | census re-scoped to folds/operands (R4-5); the 15 F-W5-held ids cited, never counted`.** Re-run and confirmed:

⟨cmd⟩ `/usr/bin/grep -o 'F\.W6., .F\.W8. and .F\.W10. are likewise named by \*\*no record\*\*' "$C"` → *"F.W6\`, \`F.W8\` and \`F.W10\` are likewise named by **no record**"* (exit 0) — the canonical's §4.1, reproducing verbatim, and the spec's §0.1 clause 2 quotes it correctly including the disclosed leading-backtick truncation.

| quantity | value | how derived |
|---|---|---|
| **roster size (F.W6, canonical §2)** | **0** | no `### F.W6` roster exists; §4.1 enumerates the negative |
| **booked from that roster** | **0** | vacuous |
| **cited to canonical holder** | **0** | vacuous |
| **escaped** | **0** | **no record-side escape is possible by construction** |

**The forward direction is therefore CLEAN and cannot be otherwise.** The live test is the reverse one, which R4-10 states in the same clause: *"an id booked that the canonical does not home there is that wave's fabrication."* That test is run at §1 below and it FAILS at three sites.

**The assigned citation duty — the fifteen — is DISCHARGED, exactly.** §2.11d prints H-1..H-15 (⟨cmd⟩ `/usr/bin/grep -cE '^\| H-[0-9]+ ' F-W6.md` → **15**; ids `FR-AUL-3 · 11 · 12 · 14 · 20 · 21 · 25 · 31 · 46 · 59` ⊕ `AA-23 · AA-31 · AA-32` ⊕ `GAB-15 · GAB-16`). Cross-read against the canonical's F.W5 roster:

⟨cmd⟩ `/usr/bin/grep -o '\*\*fr-AdminUserList\*\* (11): .FR-AUL-3.*FR-AUL-59.' "$C"` → *"**fr-AdminUserList** (11): \`FR-AUL-3\` · \`FR-AUL-11\` · \`FR-AUL-12\` · \`FR-AUL-13\` · \`FR-AUL-14\` · \`FR-AUL-20\` · \`FR-AUL-21\` · \`FR-AUL-25\` · \`FR-AUL-31\` · \`FR-AUL-46\` · \`FR-AUL-59\`"*
⟨cmd⟩ `/usr/bin/grep -o '\*\*fr-AdminAuditLog\*\* (4): .AA-6. · .AA-23. · .AA-31. · .AA-32.' "$C"` → *"**fr-AdminAuditLog** (4): \`AA-6\` · \`AA-23\` · \`AA-31\` · \`AA-32\`"*
⟨cmd⟩ `/usr/bin/grep -o '\*\*fr-GalleryAdminBanner\*\* (2): .GAB-15. · .GAB-16.' "$C"` → *"**fr-GalleryAdminBanner** (2): \`GAB-15\` · \`GAB-16\`"*

The two residuals — `FR-AUL-13` and `AA-6` — are the two the §2.11d table omits, and the spec **discloses them in the paragraph immediately below the table** ("Two adjacent ids, disclosed rather than absorbed"), each named as F.W5-held. **17 of the F.W5 roster's 28 rows are named at F-W6, none booked, none counted.** That half of R4-10's directive is met without residue, and it is the single cleanest thing in this file.

### §0.1 CANONICAL SPOT-AUDIT — five records against the adjudicated bytes

Per the check law a canonical error is filed against the canonical. Five records, chosen for load-bearing on this wave, re-derived at their record bytes:

| # | record · id | canonical §1 row | record bytes (⟨cmd⟩ over the frozen corpus) | verdict |
|---|---|---|---|---|
| 1 | `fr-AdminAuditLog` **AA-10** | `\| \`AA-10\` \| \`D-M2\` · \`L-13\` \| \`F.W4\` · \`F.W5–W8\` \| **F.W4** <sub>legs: F.W5-W8</sub> \|` | `:47` → *"Display cure (sentinel-aware branch + legend) **→ F.W4**; the actor-field contract question **→ F.W5–W8**."* | **canonical CORRECT** (primary token F.W4, band a leg) |
| 2 | `fr-GalleryDraftsSection` **B-2** | `\| \`B-2\` \| \`C-C-1\` · \`L-3\` \| \`F.W3/W4\` · \`F.W5-W8\` \| **F.W3** <sub>file-criterion → §5.d</sub> <sub>legs: F.W5-W8</sub> \|` | `:40` → routes `F.W3/W4**` ⊕ `F.W5-W8**`; target `GalleryDraftsSection.vue` ∈ §5.d ⇒ rule 3 → F.W3 | **canonical CORRECT** |
| 3 | `fr-EquationModeToggle` **FR-EMT-20** | `\| \`FR-EMT-20\` \| \`R2\` · \`missed-5\` \| \`F.W5\` \| **F.W5** \|` | `:50` → routes `F.W5**` **and nothing else — no band token at all** | **canonical CORRECT** |
| 4 | `fr-PathPreview` **PP-DEADSEAM** | `\| \`PP-DEADSEAM\` \| — \| \`F.W5-W8\` \| **F.W5-W8** \|` | `:56` → routes `F.W5-W8**.` | **canonical CORRECT** |
| 5 | `fr-GalleryFeaturedCarousel` **FR-GFC-3** | `\| \`FR-GFC-3\` \| \`C-1\` \| \`F.W5-W8\` \| **F.W5-W8** \|` | `:34` → routes `F.W5-W8**` | **canonical CORRECT** |

**Five for five on homes and alias columns — with ONE hole found while auditing record 5's neighbourhood, filed as P5-12 below**: `FR-AFP-40` and `FR-AFP-69` return **zero** hits in the entire census (⟨cmd⟩ `/usr/bin/grep -c 'FR-AFP-40' "$C"` → `0`; same for `-69`), although the record banks both inside its head line — ⟨cmd⟩ `/usr/bin/grep -nE 'FR-AFP-(40|69)' fr-AdminFlaggedPanel.md` → `86:| FR-AFP-32 · D-16 / L-13 / C:D-15 (+FR-AFP-40 fold; +FR-AFP-69 = β-miss-5 extension) | …`. The canonical's alias column for `FR-AFP-32` carries `D-16 · L-13 · C:D-15` and drops the two parenthesised fold tokens. **That is a canonical defect, not F-W6's** — and it bites precisely because F-W6 disposes both ids at §2.11c BLOCK C, so two of this wave's transcript rows name identities the sole census operand does not know.

---

## §1 FABRICATION — the reverse direction, and it fails three times

R4-10, verbatim in its own clause: *"an id booked that the canonical does not home there is that wave's fabrication."* §2.11c BLOCK B prints **25** booked (⟨cmd⟩-checked arithmetic: 3+2+2+6+1+3+2+1+1+4 = 25, matching §2's heading and the four-verb cell). Four are non-record commissioned acts (`F-α` · `F-β` · `F-γ` ⊕ the value-side `V-α/V-β/V-γ/TA-4` routed OUT at branch 1) and are outside the roster law. **Twenty-one are banked record ids.** Eighteen are canonically band-homed at `F.W5-W8`. Three are not:

| booked at | id | canonical §1 home | canonical band leg? | verdict |
|---|---|---|---|---|
| **§2.7** (BLOCK B "3-YES", *new this round* per R3-7.1) | `fr-EquationModeToggle` **FR-EMT-20** | **F.W5** | **NONE** — the record routes `F.W5` alone | **fabrication, worst of the three** |
| **§2.5** (the wave's sole audit row) | `fr-AdminAuditLog` **AA-10** | **F.W4** | legs: F.W5-W8 | **fabrication** (R4-6.1: a leg books at the wave that HOLDS the host) |
| **§2.3** (BLOCKER weight) | `fr-GalleryDraftsSection` **B-2** | **F.W3** (file-criterion §5.d) | legs: F.W5-W8 | **fabrication**, compounded — `fr-GalleryView` **FR-GV-1** (canonical **F.W3** likewise) is folded INTO it at BLOCK C |

**FR-EMT-20 is the one that convicts the file against itself.** §2.11d states the law in its own hand — *"Every one of the fifteen is **held at F.W5 by the canonical**, so under R4-10's roster law F.W6's duty is to **CITE THE HOLDER BY NAME** — never to book, never to count, and never to route"* — and §0.1 clause 3 pastes the F.W5 roster header (⟨cmd⟩ `/usr/bin/grep -o '^### F\.W5 — \*\*28 rows\*\*' "$C"` → *"### F.W5 — **28 rows**"*) whose body contains `FR-EMT-20` two lines further down. A sixteenth F.W5-held id is booked four sections above the cell that forbids it, and the round-4 repair record celebrates the booking (*"R3-7.1 … the only escape whose terminal disposition is an act this seat performs"*) without ever asking the canonical where the id lives. The escape-detector reasoning that produced it (BLOCK A, branch 3-YES) is exactly the derived-roster machinery R4-10 retired.

**AA-10 and B-2 are the leg-law failure.** Both records route their band leg explicitly, and both name a different primary — AA-10's *"Display cure … **→ F.W4**"*, B-2's `F.W3/W4` under a §5.d target. R4-6.1: *"Each leg books as ONE explicit row at the wave that HOLDS the host id — a leg is never a new identity."* F-W6 books the whole identity, at BLOCKER weight in B-2's case, and prints neither canonical home in its cell.

**The eighteen band-homed bookings are noted, not convicted.** R4-10's table assigns the band's 90 rows to **F-W5's** duty and gives F-W6 no booking operand at all; RULINGS-4 blesses the re-scope to *"folds/operands"* without naming the eighteen. That is a warrant gap the next round should rule rather than inherit — filed at P5-20, observation-grade.

---

## §2 RECEIPT REALITY — 27 ⟨cmd⟩ re-run on the pinned toolchain

The file carries **149** `⟨cmd⟩` markers. This seat re-executed **27**, weighted toward the round-4 cures and the frozen-corpus quotations, under `/usr/bin/grep`.

**PORTABILITY: CLEAN.** ⟨cmd⟩ `/usr/bin/grep -oE '\.\{0,[0-9]+\}' F-W6.md | sort -u` → widest bound **`.{0,190}`**, well under the BSD 255 ceiling. Zero `-P`, zero `\K`, zero lookaround in any live command (the six regex hits are the two prose sentences that *forbid* PCRE, plus `grep -o 'fr-ConvergencePlot…'` matching my own detector on the letter `P`). The §0.2 base block defines every variable every command consumes. **R4-2 is met, and this seat convicts nothing on sight.**

**QUOTATION TRUTH: CLEAN — the headline result.** Every one of the 27 pastes was found byte-true at its source. Thirteen live-sibling receipts reproduced *despite* five of eight §0.3 hash pins having moved:

| # | ⟨cmd⟩ | result |
|---|---|---|
| S18 | `grep -o "F\.W5 claims credit for none of them.\{0,46\}" F-W5.md` | *"…— FR-GIG-5's lesson adopted as a standing bar"* ✅ |
| S19 | `grep -o 'v2 states \*\*deepen-or-retire\*\* for the depth/parent/root quadruple' F-W5.md` | ✅ bold intact |
| S21 | `grep -o "editor-saved contour is a first-class.\{0,69\}" F-W5.md` | ✅ ends at the clause boundary |
| S22 | `grep -o "ship the 46th operation.\{0,57\}" F-W5.md` | ✅ *"…**NO THIRD OPTION SHIPS**"* — R4-7.1's bound cure HOLDS |
| S23 | `grep -o "FR-GFC-1's share at F.W5 is the RIDER ONLY.\{0,49\}" F-W5.md` | ✅ ends at *"params"* — cure HOLDS |
| S24 | `grep -o "The abort-key fix and FR-AUL-59's pipeline fix.\{0,46\}" F-W5.md` | ✅ ends at *"window**."* — cure HOLDS |
| S25 | `grep -o "F\.W5's own binding.\{0,50\}" F-W5.md` | ✅ *"…SEQUENCES AFTER the join split."* — cure HOLDS, opens mid-emphasis exactly as promised |
| S26 | `grep -o '(No clause is numbered D9 — see the compatibility note.)' F-W5.md` | ✅ R4-9.3's cure HOLDS |
| S27 | `grep -o 'R6-8 sub-arm carried beside the banked head, never instead of it' F-W5.md` | ✅ the purge seat's re-cut HOLDS |
| S28/S29 | `fr-FunctionInput L-B1 FOLDS…` · `**FR-EMT-20** (cited F1)` | ✅ ✅ |
| S30 | `grep -n '^### G-11 —\|^### G-12 —' F-W0.md` | ✅ `:364` / `:369` — the gate-id anchor survived F-W0's rewrite, which is the whole point of R2-2 |
| S45 | `grep -o "The roster is TWELVE limbs and stays twelve[^*]*" F-W1.md` | ✅ byte-true — **F.W1's transaction cited whole, no limb named** |

Frozen-corpus and canonical receipts likewise: the boilerplate **23** (⟨cmd⟩ `grep -rnE "F\.W5[-–]W8" fr-*.md \| grep -c "tri-package uplift"` → `23`), the four-spelling census (`1 F.W5(-W8 · 120 F.W5-W8 · 72 F.W5–W8`), the `sed -n '4990,5038p' … | grep -c` → **0**, the two-stage windowed extraction at §2.6 (`L=157`, `cut -c281-409` → *"its geometry pipeline routes to F.W5-W8 (provenance union, with the DO-NOT-REGENERATE rider and the M-10 innerPoly trap attached)"*, **byte-true, cut disclosed — R4-4.2's cure HOLDS**), and `grep -o "R-16 = C-3 —.\{0,150\}" fr-SliderControl.md`, all reproduce.

**INSTRUMENT DISCIPLINE: DEFECTIVE — eleven sites publish a paste their command does not print.** None is a fabricated word; every one is a truncation or a prefix drop that the cell does not disclose. The two that matter:

1. **§2.6, the M-10 anchor (P5-5).** ⟨cmd⟩ `grep -nF '**M-10 bound in, seat-verified by read of the RNG interleave' fr-FourierShapeExtractor.md` is published as *"→ **one hit, `:96`**"* followed by the M-10 sentence. Re-run, the command prints line 96 **entire**: `96:- **D-16 / C-9 / L-m2-arm (+ M-10 rider, reader-2's find — REPAIR-CRITICAL)** — dead seams and stale prose (the three unread hooks; the false comment; \`innerPoly\` computed and discarded). **M-10 bound in, …`. About 200 characters — **including a different banked head, `D-16 / C-9 / L-m2-arm`, which the canonical homes at F.W4** — are dropped before the paste begins, with no cut mark. Round 4's own P4-D7 cure created this: it replaced a 3-hit `grep -n "innerPoly"` with a `-F` anchor that returns one line, and then quoted a substring of that line. *A single-hit anchor is not a single-quote anchor.*
2. **§2.11 row 19 (P5-6).** ⟨cmd⟩ `grep -n "Server half" fr-EasingPicker.md` returns line 65 whole — a ~700-character table row opening `65:| **L/M-3 (decides C/i-1)** | No unknown-value posture over a persisted domain…`. The paste is a mid-line substring; roughly 600 characters are dropped undisclosed. The words are the record's; the receipt is not the command's output.

Four `-o` bounds still over-run their pastes into the following table cell — the *exact* class R4-7.1 reported cured at six sites, unfixed at four others: row 46's `.{0,80}` prints `…see FR-GFC-4). |`, row 52's `.{0,90}` prints `…is canonical) |`, row 50 / §4 lock 9's `.{0,190}` prints `…fourier-series}\`. | Both re`, §2.3's `.{0,120}` prints `…(CRUD/provenance union). Riders: m-13 (`. Each paste stops one cell-boundary short, unmarked.

§2.11a's *"all seven reproduce, in order, with the cells below"* is false as written (P5-8). The loop prints a ~90-character window; the cells do not match it at three records — `fr-App`'s cell exceeds the window at **both** ends, `fr-MorphShapePreview`'s cell **prepends** the `preser` that the `.{0,10}` prefix cut and drops the closing `.`, `fr-MobileFloatingToc`'s cell continues past the window after its ellipsis. Crucially, **all five contested cells ARE verbatim in their records** (⟨cmd⟩ `grep -cF '<cell>' <record>` → `1` at each), so this is receipt-vs-paste, never fabrication. Round 3's Q-7 cure completed one cell of seven and declared the label exact.

---

## §3 M-25 DEPTH — locks by banked id, aliases beside heads

**The eight-token collision list is UNDER-ENUMERATED, and FW6-G17's reverse direction is unrunnable because of it (P5-4, HIGH).**

§4 lock 10 fixes R-5's qualification set at eight: `M-13 · L-B1 · L-M3 · C-17 · C-18 · B-1 · B-2 · C-2`. §2.11c then builds the gate's reverse falsifier on that set being complete — *"`grep` **its banked id token** in this file … **the token, not the record-qualified spelling**, because R-5 qualifies exactly **eight** colliding tokens … and leaves every other id bare by design."* Two tokens defeat it:

| token | hits in F-W6 | distinct banked identities carried | canonical homes |
|---|---|---|---|
| **`M-10`** | **18** | `fr-ContourSettings M-10` (row 11) · `fr-BasisSelector M-10` (row 50 / BLOCK C) · the `fr-FourierShapeExtractor` innerPoly **rider** (§2.6, §4 lock 6, the round-4 repair record) | **F.W3** · **F.W3** · rider inside `D-16` → **F.W4** |
| **`M-9`** | **10** | `fr-BasisSelector M-9` ⊙ (row 7) · `fr-FourierShapeExtractor M-9` (row 36) · `fr-GalleryView` FR-GV-7's `M-9` alias (row 51) | **F.W5-W8** · **F.W5-W8** · alias |

The file **documents both collisions and declines to act on them**: row 36 carries *"▲ **Collision guard: distinct from `fr-BasisSelector M-9` (row 7) and from `fr-GalleryView` FR-GV-7's `M-9` alias (row 51)**"*, and row 50's fold target is `fr-BasisSelector M-10` while row 11 is `fr-ContourSettings M-10`. A reverse probe on either token returns a set spanning three identities across two or three different canonical waves. The eight is really at least ten.

**The M-10 lock is carried under a rider token whose banked head is never named (P5-5, same defect, other face).** ⟨cmd⟩ `/usr/bin/sed -n '2387,2458p' "$C" | grep -nE '^\| \`D-16\`'` → `| \`D-16\` | \`C-9\` · \`L-m2-arm\` | \`F.W4\` | **F.W4** |`. The innerPoly anti-cure rider — which §4 lock 6 and the round-4 preservation list both call load-bearing — lives inside banked head `fr-FourierShapeExtractor D-16 (≡ C-9 · L-m2-arm)`, canonically **F.W4**. F-W6 names `M-10` alone at every one of its five carrying sites. M-25's rule is locks by **banked id**, aliases **beside** the head; here the alias travels and the head does not exist in the file.

**Where the depth discipline is met, it is met well.** `FR-GFC-20`'s both-arms carry, `FR-GV-1`'s explicit BLOCKER-severity fold, `SS-C-1`'s read/write split with the "re-merging re-books GCM-1" guard, `AA-23`'s kill-only carry with its holder named (R4-6.4, applied correctly), `m-7`'s straddle-killed-but-row-live restoration, `fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12` in the FULL banked spelling, and the four homonym pairs BLOCK C names for the `(record, id)` pair probe — all correct, all checked. The failure is narrow and it is at `M-9`/`M-10`.

**Fold-cell homings that contradict the canonical (P5-11, MEDIUM).** Four transcript cells assign a landing the canonical does not support: `FR-AFP-32` (canonical **F.W3**, legs F.W5-W8/SS-13 — BLOCK C sends it to §2.4's D17 without naming F.W3) · `GCM-10` (canonical **F.W3** file-criterion §5.e — row 45 lands it *"→ F.W5 A3 + D17"*) · `fr-ContourSettings m-18` (canonical **F.W3**, legs F.W5-W8 — BLOCK C: *"rider at §2.6 B-4"*) · `FR-GFC-20` (canonical **F.W4** — BLOCK C burns its server arm *"WITH FW6-G10"*). And row 54 lands `fr-VisualizationView BLK-1` *"→ F.W5 E4 / F.W4"* where the canonical says **F.W4** with a band leg and no F.W5 (P5-19).

---

## §4 GATES — canonical operands, reachable GREEN, portable commands

**Count and shape.** ⟨cmd⟩ `grep -cE '^\| \*\*FW6-G[0-9]+\*\*' F-W6.md` → **19**, matching the §3 heading *"Gates — 19, all born RED"*, ids unique G1..G19. Every gate names a real witness (L-19); none is a proof-farm script.

**Born-RED witnesses RE-RUN against the read-only fourier tree — all reproduce.** This is a genuine strength and it is worth stating flatly:

| gate | ⟨cmd⟩ | result |
|---|---|---|
| FW6-G12 | `grep -nE 'response_model' $F/api/routers/admin.py` | `110: "/stats", response_model=AdminStatsResponse, …` — **exactly one** ✅ |
| FW6-G12 | `grep -cE '^@[a-z_]*router\.(get\|post\|put\|patch\|delete)' …/admin.py` | **13** ✅ — the "1 of 13" holds |
| FW6-G15 | `grep -rn "def order_contours" $F \| wc -l` | **0** ✅ |
| FW6-G6 | `grep -rn "viewed_ips" $F/api \| wc -l` | **0** ✅ |
| FW6-G1 | `grep -rn "_write_root_version" $F/api` | def `:110` + create `:220` + remix `:592` ✅ |
| FW6-G19 | `git -C $F rev-parse --short=8 HEAD` · `status --porcelain \| wc -l` | `cd26c653` · **28** ✅ |
| FW6-G19 | `wc -l …/docs/tranches/J/design/J-diff-shape.md` | **271** ✅ |
| FW6-G16 | `git diff --stat -- api/src src` | **empty** ✅ zero value-tree bytes |
| §2.10 TA-4 | `ls api/src/lib` · `grep -rln "atomdiff\|atomDiff" api/src src` | *No such file or directory* · one test-comment hit ✅ |

**GREEN reachability: acceptable at all 19.** FW6-G15 wears *"stays RED by design"* but states a real closing condition (name the true source **or** re-author with G5c's diagnostics), so it is reachable, not decorative. The ⊙ gates (G8/G10/G12 riders, G18) correctly condition rather than presume.

**Census operand: cured in the frame, not fully in the falsifier (P5-10, MEDIUM).** §0.1's ▲ clause is right and binding, and no gate cites `CENSUS-2026-08-03.md` as a denominator (it survives only as the routing-law authority at §2.10 / FW6-G16, exactly as r8 permits). But **FW6-G17 keeps two upper operands side by side**: the R4-10 addition (*"the forward walk is no longer a detector run over the corpus but a read of the **canonical §2 rosters**"*) sits in the same cell as the retained falsifier (a) (*"**forward** — walk every span line in the 66 frozen records under the four-spelling detector back to its enclosing row id (S-8)…"*), and the cell declares **UPPER = "the ENUMERATION this file publishes"**. R4-10 forbids exactly that: *"No wave derives, samples, or re-cuts a roster from any other source — not a check file, not a prior pass, not its own §-arithmetic."* The detector that produced the FR-EMT-20 booking is still installed as a co-equal falsifier in the gate that was supposed to retire it.

---

## §5 POSTURE

| item | state | evidence |
|---|---|---|
| **F.W1 transaction whole** | ✅ | §4 lock 5 cites TWELVE by ⟨cmd⟩ (S45 reproduces byte-true at the live `F-W1.md`), names no limb, re-derives no count |
| **W7 ∅ closed** | ⚠ | canonical §4.1 makes F.W7's ∅ TRUE; §4's F.W7 edge states only non-pre-emption of ⊙ G7/E16. The round-4 preservation list claims *"**F.W7's ∅ posture**"* preserved, but ⟨cmd⟩ `grep -noE '.{0,45}∅.{0,45}' F-W6.md` → **3 hits, none a live statement of it** (two are the preservation lists, one is a `grep` exit code). Preserving what was never stated — P5-17, LOW |
| **SS-4 flags** | ✅ | §4's SS-4 row flags all NINE by ruling id (R1..R9) ⊕ OG-F1 / OG-F2; R5 and R9 restored; FR-USB-23's ⊙ travels across the F.W8 routing (§4 F.W8 edge and §5) |
| **tree READ-ONLY** | ✅ | three explicit READ-ONLY declarations; zero fourier bytes; `scripts/dev/dev.sh` named unowned and never staged; `git diff --stat -- api/src src` empty |
| **status planned** | ✅ | masthead `status: planned` ⊕ §67 *"status stays `planned`"*; no product-source open |
| **zero VERIFIED** | ✅ | `IMPLEMENTED **NO**` · `VERIFIED **NO**` — one each, stamped only at the release close |
| **RULINGS-4 applied** | ⚠ mostly | R4-1.7→R4-4.2 ✅ (two-stage, byte-true, cut disclosed) · R4-2 ✅ (base block + toolchain, verified clean) · R4-3 ✅ frame · R4-5 ✅ (the 132 struck at all six sites) · R4-6.4 ✅ (AA-23 kill-only, holder named) · R4-7.1 ⚠ (6 of 10 sites) · R4-7.3 ✅ (both count-word sites) · R4-9.3 ✅ · R4-9.5 ✅ (the fifteen, exactly) · R4-10 ✗ **at the fabrication clause** |
| **hash pins (R4-8.3)** | ⚠ | five of eight moved since the stamp — `F-W5.md` `132c03192176`≠`d4f47eb3ec4f` · `F-W0.md` `282f0c120cd4`≠`cd64d6580098` · `F-W1.md` `a1302689aaa3`≠`839d9964010b` · `F-W9.md` `e9a9c3016f4c`≠`eda1fab4e865` · `COHESION.md` `956e71a83e32`≠`91c6d974db9b`. `F-W3.md`, `F-W4-CARRY.md`, **`CENSUS-CANONICAL.md`** and all three immutables match. **No purge-seat sha256 cert exists**, so LAW E's authoritative stamp is still owed. Every quoted word reproduced anyway — the pin did its job: movement detected, not silent |

---

## §6 DEFECT REGISTER — worst 20, ranked

| # | sev | claim | receipt |
|---|---|---|---|
| **P5-1** | **HIGH** | `fr-EquationModeToggle FR-EMT-20` is BOOKED at §2.7 while the canonical homes it at **F.W5** with **no band leg** — the file's own §2.11d law forbids exactly this | canonical `\| \`FR-EMT-20\` \| \`R2\` · \`missed-5\` \| \`F.W5\` \| **F.W5** \|`; record `fr-EquationModeToggle.md:50` routes `F.W5**` and nothing else |
| **P5-2** | **HIGH** | `fr-AdminAuditLog AA-10` BOOKED at §2.5 as the wave's sole audit row; canonical home **F.W4**, band only a leg (R4-6.1 books a leg at the host's holder) | canonical `\| \`AA-10\` \| \`D-M2\` · \`L-13\` \| \`F.W4\` · \`F.W5–W8\` \| **F.W4** <sub>legs: F.W5-W8</sub> \|`; record `:47` *"Display cure … **→ F.W4**; the actor-field contract question **→ F.W5–W8**."* |
| **P5-3** | **HIGH** | `fr-GalleryDraftsSection B-2` BOOKED at §2.3 at BLOCKER; canonical home **F.W3** (file-criterion §5.d). Compounded: `fr-GalleryView FR-GV-1` (also canonical **F.W3**) is folded into it | canonical `\| \`B-2\` \| \`C-C-1\` · \`L-3\` \| \`F.W3/W4\` · \`F.W5-W8\` \| **F.W3** … <sub>legs: F.W5-W8</sub> \|`; `\| \`FR-GV-1\` … \| **F.W3** … \|` |
| **P5-4** | **HIGH** | R-5's eight-token list is under-enumerated; `M-9` and `M-10` each collide three ways inside this file, so FW6-G17's reverse falsifier (*"the token, not the record-qualified spelling"*) is unrunnable at both | `grep -c 'M-10' F-W6.md` → **18** across `fr-ContourSettings M-10` (F.W3) · `fr-BasisSelector M-10` (F.W3) · the `D-16` rider (F.W4); `grep -c 'M-9'` → **10** across `fr-BasisSelector M-9` · `fr-FourierShapeExtractor M-9` · FR-GV-7's alias — and row 36 names the M-9 collision itself |
| **P5-5** | **HIGH** | §2.6's round-4 P4-D7 cure turned a multi-hit defect into an undisclosed mid-line truncation: the anchor returns line 96 whole, ~200 chars — including the different banked head `D-16 / C-9 / L-m2-arm` (canonically **F.W4**) — dropped before the paste, and the M-10 lock is then carried under a bare rider token whose head the file never names | `grep -nF '**M-10 bound in, seat-verified by read of the RNG interleave' fr-FourierShapeExtractor.md` → `96:- **D-16 / C-9 / L-m2-arm (+ M-10 rider, reader-2's find — REPAIR-CRITICAL)** — dead seams and stale prose (…) **M-10 bound in, …` |
| **P5-6** | MEDIUM | §2.11 row 19's receipt prints a ~700-char table row; the paste is a mid-line substring with ~600 chars dropped, unmarked | `grep -n "Server half" fr-EasingPicker.md` → `65:\| **L/M-3 (decides C/i-1)** \| No unknown-value posture over a persisted domain…` |
| **P5-7** | MEDIUM | Four `-o` bounds still over-run their pastes into the next table cell — the class R4-7.1 declared cured at six sites | row 46 `.{0,80}` → `…see FR-GFC-4). \|` · row 52 `.{0,90}` → `…is canonical) \|` · row 50/§4 lock 9 `.{0,190}` → `…fourier-series}\`. \| Both re` · §2.3 `.{0,120}` → `…union). Riders: m-13 (` |
| **P5-8** | MEDIUM | §2.11a's *"all seven reproduce, in order, with the cells below"* is false at three of seven; every cell IS verbatim in its record, so the fault is receipt-vs-paste | loop prints `ved so no F.W5-W8 row manufactures overlap.` while the cell reads *"preserved so no F.W5-W8 row manufactures overlap"* — prepends `preser`, drops the `.`; `fr-App` and `fr-MobileFloatingToc` exceed the window; `grep -cF '<cell>' <record>` → `1` at all five checked |
| **P5-9** | MEDIUM | §2.1's census-dissent receipt drops ~25 chars before the paste and a whole trailing sentence after it, both unmarked — in the cell whose own round-2b erratum convicts the narrower `71p` bound | `sed -n '71,72p' CENSUS-2026-08-03.md` → `  into a stalled M — i.e. the half-built chain is *known* unfinished work on their side, not an` / `  overlooked bug. Strengthens the finding and re-homes it as formation work, not blame.` |
| **P5-10** | MEDIUM | FW6-G17 retains the four-spelling corpus detector as a co-equal forward falsifier and declares UPPER = *"the ENUMERATION this file publishes"*, against R4-10's *"No wave derives, samples, or re-cuts a roster from any other source — not … its own §-arithmetic"* | both operands stand in the same gate cell; the detector is the machinery that produced P5-1 |
| **P5-11** | MEDIUM | Four transcript cells assign landings the canonical contradicts | `FR-AFP-32` canonical **F.W3** (legs F.W5-W8, SS-13) vs BLOCK C's D17 landing · `GCM-10` canonical **F.W3** vs row 45's *"→ F.W5 A3 + D17"* · `m-18` canonical **F.W3** vs BLOCK C's §2.6 rider · `FR-GFC-20` canonical **F.W4** vs BLOCK C's *"burned WITH FW6-G10"* |
| **P5-12** | MEDIUM | **AGAINST THE CANONICAL, not the spec**: `FR-AFP-40` and `FR-AFP-69` have **no home anywhere in the census**, though the record banks both inside `FR-AFP-32`'s head line; F-W6 disposes both at BLOCK C | `grep -c 'FR-AFP-40' "$C"` → **0**; `grep -c 'FR-AFP-69' "$C"` → **0**; `fr-AdminFlaggedPanel.md:86 \| FR-AFP-32 · D-16 / L-13 / C:D-15 (+FR-AFP-40 fold; +FR-AFP-69 = β-miss-5 extension) \|`; canonical alias column carries only `D-16 · L-13 · C:D-15` |
| **P5-13** | MEDIUM | BLOCK C equates `FR-AFP-49 = AA-44 = FR-AUL-16` as one identity; the canonical homes them at three different places | `\| \`FR-AFP-49\` … \| **F.W9** <sub>legs: SS-3, SS-4, F.W9/W10</sub> \|` · `AA-44` → F.W9 · `\| \`FR-AUL-16\` \| — \| \`NO-WAVE-OWNER\` · \`SS-3\` · \`SS-4\` \| **NWO→SS-3** \|` |
| **P5-14** | LOW | §2.0's `comm -13` paste drops the `.md` suffix the command prints on each of five filenames | output `fr-ConvergenceLegend.md / fr-ConvergencePlot.md / fr-EquationModeToggle.md / fr-EquationResult.md / fr-NotationPills.md` vs the cell's suffix-free list |
| **P5-15** | LOW | §2.5's Q-1 receipt omits the path prefix its own `-rn` form prints | `grep -rn -F 'strengthens the census routing' <rooted path>` → `<path>:197:booking); strengthens the census routing, no new work.`; paste begins at `197:` |
| **P5-16** | LOW | Three `grep -n` receipts drop the `NN:- ` list-marker prefix the command prints | row 8 `73:- **m-7 = C-6-as-rescoped…` · §2.4 `64:- **L·M-4 / D-13 / C-8(a)…` · §2.4 `54:- **FR-GFC-20 = C-9 — MINOR.**…` |
| **P5-17** | LOW | The round-4 preservation list claims *"**F.W7's ∅ posture**"* preserved; no live cell of F-W6 states it — §4's F.W7 edge states only non-pre-emption of ⊙ G7/E16 | `grep -noE '.{0,45}∅.{0,45}' F-W6.md` → 3 hits: `:379` (a grep exit code), `:611` and `:624` (the two preservation lists) |
| **P5-18** | LOW | Five of eight §0.3 hash pins are stale and no purge-seat sha256 cert exists (R4-8.2), so no stamp is authoritative — though the canonical's pin matches and every quoted word reproduced | `F-W5` `132c03192176`≠`d4f47eb3ec4f` · `F-W0` `282f0c120cd4`≠`cd64d6580098` · `F-W1` `a1302689aaa3`≠`839d9964010b` · `F-W9` `e9a9c3016f4c`≠`eda1fab4e865` · `COHESION` `956e71a83e32`≠`91c6d974db9b`; `CENSUS-CANONICAL` `a450b8e9f80e` ✅ |
| **P5-19** | LOW | Row 54 lands `fr-VisualizationView BLK-1` *"→ F.W5 E4 / F.W4"*; the canonical knows no F.W5 home for it | `\| \`BLK-1\` \| — \| \`F.W4\` · \`F.W5–W8\` \| **F.W4** <sub>legs: F.W5-W8</sub> \|` |
| **P5-20** | LOW (observation) | The other eighteen booked record ids are all canonically homed at the band `F.W5-W8`, whose 90 rows R4-10's table assigns to **F-W5's** duty; R4-10 gives F-W6 no booking operand at all, and blesses only a re-scope to *"folds/operands"*. The booking clause has no canonical warrant — rule it, do not inherit it | RULINGS-4 §R4-10 table: `F-W5 \| F.W5 → **28** (+ band F.W5-W8 → **90**)` vs `F-W6 \| **0** record-side (§4.1)` |

---

## §7 WHAT MUST BE PRESERVED IF A ROUND 6 OPENS

Nothing below was disturbed by any finding above, and a repair seat must not touch it: the **25 booked identities' witnesses, cures, locks and sequencing** (only three HOMES are convicted, not one witness) · the **born-RED witness set**, all nine re-run green-as-RED against the live fourier tree at `cd26c653` · the **DO-NOT-REGENERATE TRIPWIRE** and the innerPoly prohibition (P5-5 convicts the *receipt* and the *naming*, never the lock) · the **§2.11a negative roster**, all seven declarations verbatim in their records · the **§2.11d fifteen**, which discharge R4-9.5 exactly · the **§2.11b amended discriminator** and its eight-landing table · the **R1–R9 owner roster** with R5/R9 restored and FR-USB-23's ⊙ travelling · the **killed-cure register** · the **one-cut laws** · the **`fr-GallerySearchBar` C-2 WAVE-LOCK** · the **F.W1 TWELVE-limb citation** · the **base block and toolchain pin**, which this seat re-ran and found clean · and the **read-only / E-3 / `planned`** discipline.

**The single sentence for the ruling seat**: round 4 successfully retired this file's *derived census* and replaced it with the canonical — but it left the derived-census machinery installed in FW6-G17 and never re-checked the twenty-one record ids the file already had booked against the operand it had just adopted. Three of them are homed elsewhere, and the file's own §2.11d states the law that forbids it.

*— end of PASS-5 F-W6-CHECK. 27 ⟨cmd⟩ re-run on `/usr/bin/grep`; zero fabricated quotations found; eleven receipts publish a paste their command does not print; three bookings the canonical homes at another wave. This file measures nothing it did not run.*
