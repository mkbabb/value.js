# KF-W6 — PASS-6 FRESH ADVERSARIAL SPEC CHECK (L-18/L-20)

**Seat**: fresh pass-6 conformance seat, sub-tranche X·KF, wave KF.W6. **Subject**: `docs/tranches/X/keyframes/waves/KF-W6.md` (645 L / 288,998 B; five repair rounds; round-5 record at `:633-645`). **Sole carry**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (366 L / 201 rows). **Census substrate**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/`, enumerated **BY RECORD at this seat's clock**. Prior register `PASS-5/KF-W6-CHECK.md`; rulings `PASS-5/RULINGS-5.md`; close-cert `PASS-5/CLOSE-CERT-2.md` (= CLOSE-CERT-5).

**LAW E(2) DISCHARGED AS THIS SEAT'S FIRST ACT.** `shasum -a 256` over all eleven specs, run before any other read:

```
fd226ecb…d09a KF-W0   f6986de7…12f0 KF-W1   5f3656e3…11a4 KF-W2   4b68baf3…86f7 KF-W3
4028327c…fe68 KF-W4   8baba077…404d KF-W5   b41e5576…daaa KF-W6   ed5f0851…6f21 KF-W7
c7c11445…a1c9 KF-W8   bea2d9a6…c744 KF-W9   1c107329…1c50 KF-W10
```

**ELEVEN OF ELEVEN MATCH `CLOSE-CERT-2 §9`'s closing column EXACTLY. No file moved after the cert. The round's write-set is provable, the write-last construction held, and round 5 is not convicted by its own hash bracket.** This is the first round in the program whose close is provable rather than asserted, and it is worth saying plainly before the defects: LAW E worked.

**TREE LAW honoured.** `git rev-parse origin/master` at `/Users/mkbabb/Programming/keyframes.js` → `81a56990736ced5b5edde0b84c527680ac7689b1`. Every product probe read-only (`git grep` / `git show` / `git ls-tree` / `git rev-parse`). Local `8281638c` (dirty, 41 behind) cited nowhere. **Sole write = this file.** No gate ran; no product source was opened; the subject's status is untouched (`planned`).

**No denominator below is inherited from PASS-1…PASS-5.** The diff against PASS-5's figures is at §1.3.

---

## §1 · ID-KEYED CENSUS, RE-ENUMERATED BY RECORD

### 1.1 Method, and its counting rule, stated AT the enumeration (R5-11)

A **(record, row-key)** pair is ROUTED to this wave when the record's own **terminal disposition** routes it, by any of:

- **(i)** a pure `KF.W6` token in a routing/disposition position;
- **(ii)** a per-row `→ KF.W6` / `Disposition: KF.W6` terminal disposition;
- **(iii)** the non-`KF.W6` spellings of the same routing — `KF.W6-adjacent` ×2, `KF.W6-reshell-may-absorb` ×1, and the possessive routings no id-shaped pattern matches;
- **(iv)** the collapsed-lane spellings the binding taxonomy folds into this wave: `KF.W2-TABS` · `KF.W3-SHIM` · `KF.W4-PROSE` · `KF.W5-PARTIALS` · `KF.W7-TOKENS`.

**COUNTING RULE**: one unit = one **row key in record context**; co-id clusters collapse to one banked row; `KF.W6-TIMELINE` is excluded (KF.W7's). **This seat's extractor differs from PASS-5's in ONE stated respect and the diff at §1.3 is attributable to it**: on bullet rows the route token must fall **after** a disposition marker (`→` · `Disposition:` · `Routings:` · a terminal `**KF.W…`), so a row disposed elsewhere that merely *mentions* KF.W6 mid-sentence is NOT counted. `kf-RibbonBar.md:64` is the worked example — `D-7 (+MISS-5 + MISS-6)` is disposed **NO-WAVE-OWNER** and names `KF-KE-36 → KF.W6` inside its rationale; PASS-5's unit rule admitted it, this seat's does not.

### 1.2 Measured figures — every command re-run at this clock

```
$ grep -ohE 'KF[.-]W[0-9]+[A-Za-z-]*' kf-*.md | sort | uniq -c | grep W6
 424 KF.W6      8 KF.W6-TIMELINE      2 KF.W6-adjacent      1 KF.W6-reshell-may-absorb
$ ls kf-*.md | wc -l                                → 58
$ grep -l 'KF\.W6' kf-*.md | wc -l                  → 54
$ grep -loE 'KF\.W6([^-A-Za-z]|$)' kf-*.md | wc -l  → 50
$ grep -c '^- \*\*' KF-W6-CARRY.md                  → 201
```

| figure | measured |
|---|---|
| records with **zero pure** `KF.W6` tokens | **8**, by name — `kf-AnimationControlsGroup` · `kf-ChannelControls` · `kf-ControlsPaneWrapper` · `kf-DemoGlobalChrome` · `kf-KfPillTabs` · `kf-OrbitalDrag` · `kf-SpringTrace` · `kf-TimingFunctionPanel` |
| collapsed-lane row counts | ChannelControls **20** · KfPillTabs **23** · SpringTrace **5** · AnimationControlsGroup **5** · ControlsPaneWrapper **2** · DemoGlobalChrome **2** · OrbitalDrag **0** · TimingFunctionPanel **0** |
| explicit ZERO routings | **2** — `kf-SpringTarget.md:145` · `kf-SequenceAxis.md:130` (both re-read) |
| **CONTRIBUTING RECORDS** | **54** = (50 − 2) + 6 |
| headed routed units (terminal-disposition arm, co-id collapsed) | **412** |
| manifest-/possessive-only units (the PASS-5 fifteen, spot-verified live this seat) | **15** |
| **ROUTED UNITS** | **427** |
| **BOOKED** | **417** |
| **ESCAPED** | **10** (§2.1) |

**The spec's own re-cut census (`KF-W6.md:18-33`) reproduces EXACTLY** — 424 / 8 / 2 / 1 · 58 / 54 / 50 · the eight pure-token-less records by name · all six collapsed-lane counts · both explicit zeros · 201 CARRY rows. **The (50 − 2) + 6 = 54 route and the collapsed-lane route are genuinely independent and neither borrows the other's error, exactly as the round-4 re-cut claims.** D-P4-3 stays cured at the sentence.

### 1.3 Diff against PASS-5

PASS-5 measured **433 / 422 / 11 · 54 records**; this seat measures **427 / 417 / 10 · 54 records**. **The −6 on the denominator is METHOD and is fully attributed** (§1.1's disposition-marker rule; `kf-RibbonBar.md:64` and five siblings of its shape). **The escape number is coincidentally near and the escape SET is entirely disjoint**: **all eleven PASS-5 escapes are CURED and re-verified cured this seat** — `EH-4` **18** · `EH-5` **20** · `EH-8` **17** hits in the spec, restored LIVE at their banked anchors; `D-M5` **6** · `D-28` **6** · `L-B-2` **6** · `C:C-8` **6** · `C-M6` **5** · `D-26` **5** · `D-30` **5** · `C-m1` **5**, all entered on the trail. **The ten escaping at this clock are ten DIFFERENT units, none previously booked at any pass.**

---

## §2 · AXIS FINDINGS

### 2.1 Axis 1 — census: **TEN ESCAPES**, all of one mechanism, at its fourth consecutive round

The mechanism is the spec's own, stated at `:202`: *"a name that resolves at neither is a trail gap, a name that resolves at the CARRY alone is a spec gap."* **Every one of the ten below sits on a `KF.W6`-routed row whose HOST id IS booked** (verified: `KF-ET-10` 7 · `KF-ET-17` 1 · `KF-KE-45` 2 · `SP-4` 4 · `SP-9` 2 · `SP-21` 2 · `RB-2` 3 · `RB-5` 7 · `KF-SST-28` 3 · `KF-SST-30` 5), so nothing is *unrouted* — what escapes is the **banked NAME a grepping seat holds**.

| # | escaped name | record routing (verbatim) | spec | CARRY |
|---|---|---|--:|--:|
| **E-1** | **`D-33`** | `kf-KeyframesEditor.md:90` — *"**KF-KE-45 · D-33 as-rescoped** — the `.tap-floor` dead-utility half FOLDS to banked KF-CB-25 … → **KF.W6**."* | **0** | 1 |
| **E-2** | **`D-M-3`** | `kf-EasingTarget.md:49` — *"**KF-ET-10 · C-4 = D-M-3(b), RESTORED BY THIS SEAT** … **MAJOR.** → **KF.W6**"* | **0** | 1 |
| **E-3** | **`D-M-9`** | `kf-EasingTarget.md:59` — *"**KF-ET-17 · D-M-9** — the copy affordance is a 16×16 CSS-px target … → **FOLD by reference → KF.W6**"* | **0** | 1 |
| **E-4** | **`MISS-1`** | `kf-SharePopover.md:37` — `SP-4` *"**NET-NEW (reader 1 MISS-1)** … **→ KF.W6** (cure: `text-mono-small` — one edit with SP-7) **+ KF.W9 witness**"* | **0** | 1 |
| **E-5** | **`MISS-4`** | `kf-SharePopover.md:45` — `SP-9` *"**NET-NEW (reader 1 MISS-4)**: D printed the number in its own table and drew no consequence … **→ KF.W6.**"* | **0** | 1 |
| **E-6** | **`MISS-2`** | `kf-SharePopover.md:57` — `SP-21` *"**NET-NEW (reader 1 MISS-2)** — the only axis contact was a superlative clause praising the value (killed, K-15). **→ KF.W6 + SS-13**"* | **0** | 2 |
| **E-7** | **`MISS-2`** | `kf-RibbonBar.md:73` — *"**RB-2 (net-new; reader-DU MISS-2)** — MINOR · `.text-gold` … Disposition: **KF.W6** (token-namespace lane)"* | **0** | 2 |
| **E-8** | **`MISS-7`** | `kf-RibbonBar.md:82` — *"**RB-5 (net-new; reader-DU MISS-7)** — INFO · `--scale-hover: 1.08` … → **KF.W6** (token lane, with RB-2)"* | **0** | **0** |
| **E-9** | **`MISS-4`** | `kf-StartingStyleTarget.md:69` — *"**KF-SST-28 · C-8 + reader-A MISS-4 (one identity: the declined Card family)** … → **KF.W6** (family adoption decision)"* | **0** | 1 |
| **E-10** | **`MISS-2`** | `kf-StartingStyleTarget.md:71` — *"**KF-SST-30 · reader-A MISS-2 (ruling 2)** … → glass-ui BH relay + **KF.W6**"* | **0** | 2 |

**Three aggravations, each measured:**

1. **`MISS-7` resolves at NEITHER surface** (0 spec / 0 CARRY) — the hardest class, the `SPF-10` / `MISS-7` shape, and its host `RB-5` is *load-bearing*: W6-L's `EH-10` **DISCHARGED-BY-TWIN** verification rests on `RB-5` being present, so a seat auditing that discharge from the record side holds a name that lands nowhere.
2. **`D-M-3` and `D-M-9` are the D-P4-2 / D-P5-5 ambiguity hazard, uncured for `kf-EasingTarget`.** In this spec `D-M3` occurs **8×** (all `kf-SpringHeatmap`) and `D·M-3` **2×** / `D·M-9` **2×** (all `kf-TimelineCaret`). A seat grepping the EasingTarget names lands on two wrong records' rows — the same failure the spec's own binding-citation block closes for `D:D-9`/`L:D-11` and leaves open one record over.
3. **The `MISS-n` family is PARTIALLY trailed, which makes this a scope failure and not an unknown class.** On `KF.W6`-routed lines the corpus carries `MISS-1` · `MISS-2` · `MISS-3` · `MISS-4` · `MISS-7` · `MISS-α3` · `MISS-α6` · `MISSED-2` · `MISSED-3` · `MISSED-B` · `MISSED-D` · `MISSED-H`. **The spec books `MISS-3` (4) · `MISS-α3` (2) · `MISS-α6` (2) · `MISSED-2` (3) · `MISSED-3` (5) · `MISSED-B` (1) · `MISSED-D` (1) · `MISSED-H` (7) — and zero of `MISS-1` / `MISS-2` / `MISS-4` / `MISS-7`.** Eight of twelve members of one naming family are trailed and four are not.

**Correctly NOT counted, recorded so a later seat does not re-open them**: `MISS-5`/`MISS-6` ⟨`kf-RibbonBar.md:64`⟩ — that row is disposed **NO-WAVE-OWNER**; `K-28` ⟨`kf-SequencePlayhead.md:106`⟩ — a booking-KILL ledger id, not a routed row, and the three items its record's own manifest (`:151`) routes to KF.W6 (`C-3` + the D-7 residue · the R.F8 annotation rider · the flat-namespace datum) are **all three booked** at §Bounds' sequence carve and §Sequencing's packet homing; `MISSED-1`/`MISSED-4` ⟨`kf-TimelineHoverPreview.md:142`⟩ — that record's routing sentence sends them with the ghost redesign and the a11y seam, i.e. **not** into this wave's typography/token family.

**M-25 depth on the §Bounds carve cells is otherwise CLEAN.** Every id in every carve cell resolved to a §Carry row this seat — TimelineCaret, KeyframeTimeline, CSSCodeEditor, KeyframesEditor, ChannelOptions, KeyframeCardList, cube, easing, sequence (incl. the new `SequenceTarget.vue :31` grant), square, spring, THP, TimelineTrack, KeyframesStringControls, CPW, RibbonBar, DGC, ACG, animationDescriptions. **D-P4-2's cure holds at scope; what fails is the alias TRAIL, not the carve.**

### 2.2 Axis 2 — RECEIPT REALITY + ANCHOR STABILITY: **HOLD on the frontier, DEFECTIVE on two receipts' own arithmetic**

**The frontier surface is the strongest this program has measured.** Re-executed at `81a56990` by this seat, hostile and one-for-one:

- **All 39 §Bounds line counts reproduce EXACTLY**, checked by `git show 81a56990:<path> | wc -l` against every numeral in the access table — `124 · 93 · 4 · 14 · 27 · 1 · 111 · 19 · 129 · 80 · 456 · 79 · 300 · 210 · 294 · 126 · 125 · 191 · 128 · 259 · 108 · 4 · 101 · 121 · 113 · 80 · 161 · 312 · 246 · 70 · 38 · 256 · 609 · 92 · 336 · 129 · 156 · 252 · 410`. **0 missing paths, 0 mismatches.** The two added this round (`EditorShell.vue` **259**, `MbabbMenu.vue` **121**) and the new grant (`SequenceTarget.vue` **252**) are all exact.
- **The R5-1 BLOCKER cure's anchors are true at the byte.** `EditorShell.vue` `:20` = `<SharePopover />` · `:32-40` = the shortcuts `<Button>` with its sizing utility `class="aspect-square w-8 scale-on-hover"` at **`:36`** · `:44` `<DarkModeToggle` · **`:45` `title="Toggle dark mode"`** · **`:46` `class="aspect-square w-8 scale-on-hover"`** · `:47` `/>`. `MbabbMenu.vue` `:20` the same `title`, `:21` the `w-5` variant. `EditorHeader.vue` `:25`/`:26` the fork's duplicate. **Every coordinate of the restoration, and the fork/shell discrimination the whole ruling turns on, is exact.**
- **All eleven LAW-A censuses re-execute true on their SETS.** A-1 (one live import, `test/demo/state/no-shadow-playback-authority.test.ts:21`) · A-2 (`ChannelControls.vue:230`, exact bytes) · A-3 · A-4 · A-5 (one consumer `instrument/index.ts:24`; the `src/animation/**` hits are same-basename siblings) · A-6 (**0** on both spellings) · A-7 · A-8 · A-9 · A-10 (`design-idioms.css:7`, exactly one edge) · A-11 (`shell/index.ts:2` sole importer; `<EditorHeader` → **0**; `header-items-max-w` → 3 hits with `EditorHeader.vue:92` the sole consumer). **No consumer set mis-resolved.**
- **The two RECEIPT-ARITHMETIC-FIRST commands (R5-11(2), run BEFORE scope) reproduce and are genuinely independent**: `grep -oE '\*\*G-W6-[0-9]+\*\*' | sort -u | wc -l` → **15**; the enumeration line (`^  \*\*THE FIFTEEN`, line **184**) → **15**; and `diff` of the two id sets → **IDENTICAL**. The §Gates table carries **15** rows. **The self-matching hazard the receipt names is real and the line-start anchoring genuinely defeats it.** The LAW-A scope `awk` returns **exactly 11** rows matching the eleven named. **D-P5-2 is cured at scope, with a counting rule a seat can falsify — this is the best receipt in the file.**
- **Gate witnesses re-measured**: `--dock-margin` **0** defs / **10** uses · `--shadow-glass` one consumer `App.skeleton.vue:64` · `--dock-label-padding-inline` `ChromeDock.vue:381` · `max-h-24` one site `TimelineHoverPreview.vue:20` on the swap-target element · `tracking-normal` **0** · `normal-case` **5** at the five named coordinates · `KfPillTabs` **11** files · `SpringSidebar` **12 sites / 8 files** with **0** files at any path · `.tap-floor` 2 hits both its own · `Card` **24 / 13** · `Textarea`/`NumberField`/`field-control`/`touch-hit-area`/`resolveCanvasColor`/`onFlipSettled`/`--aurora-opacity-ceiling`/`.aurora-root` all **0** · `focus-ring` **11 lines / 7 files** · `aria-selected` **5 / 2** · `fillStyle` **7 / 3** · `initStrategy: 'eager'` `HeroAurora.vue:28` · `light: true` `HeroAurora.vue:70` (the round-5 spelling correction is right) · `FadingScroll` `EasingTarget.vue:42` `axis="x"` / `:76` `axis="y"` / import `:137` · `relay/` absent in value.js.
- **The `.btn-interactive` census is exact and D-P5-3's cure lands**: **8 sites / 6 files** — `RibbonBar.vue:135` · `PlaybackRibbon.vue:55` · `CubeScene.vue:188`/`:193` · **`SequenceTarget.vue:31`** · `SpringPhysicsFacet.vue:74`/`:105` · `SpringScene.vue:167`. All eight now sit inside §Bounds. **`G-W6-4`'s green is reachable in-grant for the first time.**
- **The W6↔W10 seam reproduces at both ends**, and the cert's §7.5 figures are this seat's: `grep -coE 'CH2-02|BG-5|GU-1|GU-2|subject-legible'` → **W6 16 · W9 28**; `grep -cE 'dock contract|Glass §4'` → **W6 2 · W9 4**. **D-P5-4 is dead: the seam is two-ended and agreeing.**
- **Every outbound anchor resolves at the siblings' FINAL bytes**: `KF-W9` §G's `EH-5 + EH-8` guard row (`:195`) **with the round-5 restoration line recorded at that end** (`:690`) · `KF-W0` §Excluded's EH-family partition (`:711`/`:712`/`:731`/`:733`, counting rule stated at `:733`) · `KF-W10` §5 `G-2`'s acceptance verb `ADOPTED-BY-KF.W6` (`:407`) with the inbound declaration received (`:409`) · `KF-W10` §6.D's `KF.W12` row (`:589`) carrying **`ANTI-RE-BOOK, received from KF.W6`** · `COHESION.md:185` = §0d. **The R5-1 chain is whole at every terminus; nothing of the restoration is stranded.** `PASS-5/CLOSE-CERT-2.md` cited **5×**; the dead `PASS-5/CLOSE-CERT.md` path **0×** (R5-R6 landed here).

**What fails is two receipts' own arithmetic — R5-11(1)'s exact charge, at the one instrument class the law did not sweep.**

**(a) LAW-A census A-5 does not sum.** `KF-W6.md:132` pastes `git grep -nF '/transport"' origin/master -- .` → *"9 hits"*, then composes them as *"exactly ONE resolves to this module: `demo/components/instrument/index.ts:24` … **The other six** (`src/animation/engine/play-lifecycle/{frame,index,strategies}.ts`, `src/animation/orchestration/sequence/{lifecycle,sequence}.ts`) plus `test/orchestration/sequence-transport.test.ts:6`."* Re-run this seat: **total 9 = 1 demo + 7 src LINES + 1 test**, across **5** src files (`sequence.ts` carries three of the lines, `:69`/`:74`/`:77`). **"Six" matches neither rule: 1 + 6 + 1 = 8 ≠ 9 by line, and the file rule gives 5.** The SET is right — the R3-4 same-basename trap is correctly identified and excluded — but **the census's own printed total is unreachable from its own composition**, which is D-P4-3's shape ("the total was right and the sentence under it was not") surviving inside a LAW-A census three rounds after D-P4-3 was cured elsewhere in the same file. No counting rule is stated at the receipt.

**(b) Census A-1 states a figure with no rule.** `:128` — *"three further hits are docs prose"* — and then enumerates **four** coordinates (`lane-20…:116` · `R1-05…:87` · `R2-06…:34`/`:126`). Measured: **4 docs lines / 3 docs files**. True under a file rule, false under the line rule the same paragraph uses for its consumer set, and **the rule is not stated** (R5-11(1) requires it at the receipt).

### 2.3 Axis 3 — M-25 DEPTH + MECHANISM S (LAW F): **DEFECTIVE — the SHADOW law is applied at ONE of six acts under an "every" claim**

LAW F(1) is unambiguous: *"Every repair act whose verb strikes, moves, drops, re-keys, narrows, re-points or mints a row/routing … carries, **in the same edit**, a mandatory **SHADOW line** … An act without its SHADOW line is an incomplete act — **the pass-6 checks test for the line's presence at every such verb**."* Tested.

```
$ grep -noE 'SHADOW( \(LAW F[^:]*\))?: struck set =|SHADOW \(LAW F[^:]*\):' KF-W6.md
456:SHADOW (LAW F(1)/(4), the law's first entry): struck set = …
```

**ONE act-level SHADOW line exists.** The other four occurrences of the word are `:10` (the declaration), `:560` (a parenthetical *"SHADOW terminus notification"*), `:643` (the LAW **F(2)** round ledger — a different clause) and `:645` (discipline prose).

**The file's own §643 ledger enumerates SIX acts bearing LAW F(1) verbs, and five of them carry no SHADOW line:**

| act (from the file's own ledger) | verb class | SHADOW line |
|---|---|:--:|
| MOOT-ON-DELETE premise STRUCK · `EH-4`/`EH-5`/`EH-8` RESTORED | strikes/restores | **✓ `:456`** |
| the round-4 certificate's *"across all fifteen gates"* STRUCK | strikes | **✗** |
| the LAW-C *"every"* STRUCK at both its sites | strikes | **✗** |
| the TransportDock cell's *"four subsumed names"* count STRUCK | strikes | **✗** |
| the census citation RE-POINTED at both citing paragraphs | re-points | **✗** |
| `SequenceTarget.vue` GRANT WIDENED for `:31` | widens a grant | **✗** |

**And `:10` asserts the opposite in the file's own voice**: *"**LAW F honoured**: every act below that strikes, restores, re-scopes or re-points carries its **SHADOW line in the same edit**."* **That is a spec-voiced completeness claim (LAW B) falsified by count in its own bytes — the D-P5-6 defect verbatim, one round later, at the law minted this round to prevent exactly this class.**

**The standard is not in doubt, because a sibling met it.** `KF-W5.md` carries **fourteen** act-level SHADOW lines and writes one even where nothing moves — *"struck set = ∅ rows — a clock is struck"*, *"∅ rows — a numeral is struck"*, *"∅ rows — a citation is re-pointed"*. `KF-W8.md` carries three, including two `widened set =` lines for exactly the grant-widening act this wave performed without one. **W6's five uncovered acts are each a one-line, zero-risk write that two siblings executed in the same round.**

**And the certification did not catch it because it counted the wrong thing.** `PASS-5/CLOSE-CERT-2.md §7.6` certifies *"**five SHADOW lines present**"*. `grep -c 'SHADOW' KF-W6.md` → **5**. **The cert counted lines containing the word, not lines in the LAW F(1) form** — the receipt-arithmetic failure R5-11 was minted to end, inside the instrument that verifies LAW F.

### 2.4 Axis 4 — GATES: **HOLD, with one measured witness discrepancy and one bad coordinate**

- All **15** gates are born-RED with named witnesses; the roster/denominator note (D-P5-7) is present and its command re-runs true; no gate mints a `proof:*` mark; `G-W6-15`'s mint stays declared.
- **`G-W6-4`'s green is REACHABLE IN-GRANT** — D-P5-3 cured at the eighth site, the carve extent stated so it cannot widen, and the gate gains the bound that fails a green claimed over seven of eight. **Verified at the frontier: all eight sites, all six files, all in §Bounds.**
- **`G-W6-15`'s falsifier is hardened as ruled** — *"fails if the delete is read as mooting ANY row whose banked anchor lies OUTSIDE `EditorHeader.vue`"* — the bound that would have caught round 4's own cure. Its GREEN is reachable by construction from A-11.
- **`G-W6-3`, `G-W6-14` greens reachable**; `G-W6-14`'s RED reads off a live dual-tree probe (`relay/` absent in value.js, confirmed).
- **DEFECT — `G-W6-10`'s quoted witness symbol does not match its own figure.** The cell writes ***"THE ONE WRITER" = 5 sites / 3 files*** and names `useSceneMachineRouterBinding.ts:10`/`:86` · `ChannelControls.vue:339` · `useSelectedControlSurface.ts:42`/`:88`. Measured at `81a56990` over `demo/`: `THE ONE WRITER` → **4 sites / 3 files**; `ONE WRITER` → **5 sites / 3 files**. The fifth coordinate, `useSceneMachineRouterBinding.ts:10`, reads `//   • ONE WRITER  — watch(machine.activeScene) → router.push` — **it does not contain the string the cell quotes.** Under the per-line rule the same receipt uses for `focus-ring` **11 / 7** (verified: 11 lines / 12 occurrences / 7 files), the figure is 4/3. **This is precisely the class the round congratulates itself on catching one gate row over** — `G-W6-12`'s `light:true` → `light: true`, corrected by measurement at `:645` — **live at `G-W6-10`, inside the SUBJECT-IDENTITY receipt R5-11 made the round's flagship instrument.** The gate's substance survives (there ARE N writers, as CC-L-18 says); its quoted symbol is unmatchable, which is the exact failure a symbol enumeration exists to surface.
- **MINOR — `G-W6-9`'s ToggleGroup coordinate.** The cell states *"`ToggleGroupItem` at `:56`/`:63`/`:64`"*. Measured: `EasingTarget.vue:56` `<ToggleGroupItem`, `:63` `</ToggleGroupItem>`, **`:64` is `</ToggleGroup>` — the PARENT's closing tag**, and the import at `:139` is exact. One of three coordinates is misattributed on a live-witness cell (L-19).
- **Ordering anomaly is now DISCLOSED, not a defect**: the table runs `G-W6-1`…`-13`, `-15`, `-14`, with the anti-rename rationale and a re-runnable denominator command beside it. D-P5-7 discharged.

### 2.5 Axis 5 — POSTURE: **HOLD on every tested item**

| item | verdict |
|---|---|
| **W4 head** | ✓ `→ KF.W4 (the SEQUENCING HEAD)` with its six sub-items; **DH-4's single posture sentence appears exactly twice, byte-identical** (§Bounds `:120` · §Sequencing `:554`(6)); path present at the frontier, **410 L** |
| **W3 gated** | ✓ `grep -c 'KF\.W3' KF-W6.md` → **0**. No dependency claimed, no scheduling verb aimed at W3, no W3 surface touched |
| **O-21** | ✓ `grep -oE 'O-2[01]'` → **1** hit, a false positive inside `KF-CO-20` (`:366`). **Zero real `O-2x` rows**; no O-row minted or collided with. O-21 stays KF.W1's outbound / KF.W10's business, as `RULINGS-4 D-8` places it |
| **§6.D successor register cited** | ✓ declared anchor-only at `:560`(b) and **RECEIVED**: `KF-W10:589` (§6.D, the `KF.W12` row) carries **`ANTI-RE-BOOK, received from KF.W6`** with the `KF-APP-41` + C-22 token limb named. The R5-1 clarifier — *"`G-2` still loses exactly TWO rows by adoption; the three restored rows were never in the NWO set"* — is correct at both ends |
| **COHESION §0d cited** | ✓ `COHESION.md:185` is §0d, the KF.W11/W12/W13 boundary line at `:188`; the successor-wave posture rests on a landed section |
| **EH-4/5/8 restoration with TRUE anchors** | ✓✓ **the headline repair is sound at the byte** (§2.2). One row per banked anchor; `MbabbMenu.vue:20` booked as a second SPEND SITE on the `EH-4` row rather than as a second id (anti-rename); MbabbMenu's `w-5` explicitly NOT a second `EH-5` spend; `EH-9`/`EH-10` DISCHARGED-BY-TWIN with both carriers verified by command; the fork's `:24-27` duplicates the only MOOT residue; the W9 guard vindicated and recorded at both ends; the KF.W0 reciprocal landed with its own counting rule |
| **LAW E(4) anchor-only** | ✓ no per-seat substrate stamp of any sibling appears in this file; the two declared LAW-C exceptions are enumerated and sourced (`PASS-4/RULINGS-4.md §R4-3` frozen; the TransportDock name-set) — **but see D-P6-3: exception (2)'s reclassification landed at one of its two sites** |

---

## §3 · DEFECTS (worst first)

### D-P6-1 · **BLOCKER** — the ID-ALIASES trail, declared "REBUILT BY COMMAND OVER THE 58 RECORDS", is short by TEN; the mechanism is now at its fourth consecutive round

`:202` heads the round-5 cure **"TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS — EIGHT FURTHER MEMBERS"** and correctly convicts round 4: *"The round-4 claim that the trail was 'enumerated from the RECORD' was a **method claim, not a measurement**."* Round 5 then states a re-runnable method — *"read each `KF.W6`-routed row's co-id cluster AT the record, then resolve every name in the cluster against this spec and the CARRY"* — and runs it to eight members.

**Re-run whole by this seat over all 58 records: ten further names resolve nowhere in this spec** (§2.1, E-1…E-10), each on a row whose host id is booked. **Four of the ten come from records the round-5 cure was already inside** (`kf-KeyframesEditor` supplied four of its eight members and `D-33` sits at `:90`, three lines below `KF-KE-42 · D-30` at `:87` which the round DID enter). **`MISS-7` resolves at neither surface.** **`D-M-3`/`D-M-9` additionally land a grepping seat on two wrong records.** **Eight of the twelve `MISS*` family members on KF.W6-routed rows are trailed and four are not**, so this is a scope failure inside a known class, not an unknown one.

The heading's assertion is therefore, once again, a method claim rather than a measurement — the **fourth** consecutive round of one mechanism: `L-EST-12` (r3, short by one) → `ND-7 / D-C2` (r4, short by one) → eight (r5) → **ten (r6)**. The rounds are finding more each time because each cure enumerates from the rows the prior ruling named.

**Cure**: enter E-1…E-10 at their host rows with the record's routing quoted, exactly as the round-5 eight were entered (`D-33` → `KF-KE-45` · `D-M-3` → `KF-ET-10` · `D-M-9` → `KF-ET-17` · `MISS-1` → `SP-4` · `MISS-4` → `SP-9` · `MISS-2` → `SP-21` · `MISS-2` → `RB-2` · `MISS-7` → `RB-5` · `MISS-4` → `KF-SST-28` · `MISS-2` → `KF-SST-30`); **record-qualify `MISS-2` and `MISS-4` across their three records each and `D-M-3`/`D-M-9` against `D-M3`/`D·M-3`/`D·M-9`**, in the binding-citation form the file already uses for `D:D-9`/`L:D-11`; **E-3 addendum owed for `MISS-7` alone** (the only one absent at the CARRY too); and — the transferable part — **stop asserting the rebuild in the heading and paste the loop's post-repair output over the whole 58-record name set, which is the only form of this claim that has ever survived a pass.**

### D-P6-2 · **BLOCKER** — LAW F(1) is applied at ONE of six acts, under the file's own "every"

The round's new law requires a SHADOW line **at every act with a listed verb**; the file carries **one** (`:456`) and its own §643 ledger enumerates **six** such acts (§2.3's table). `:10` declares *"**LAW F honoured**: **every** act below that strikes, restores, re-scopes or re-points carries its SHADOW line in the same edit"* — false by count in its own bytes. `KF-W5.md` wrote **fourteen** such lines in the same round, including for acts whose struck row set is empty; `KF-W8.md` wrote `widened set =` lines for the very act class W6 performed bare. **`PASS-5/CLOSE-CERT-2.md §7.6` certified *"five SHADOW lines present"* — which is `grep -c 'SHADOW'`, the word, not the form.**

**This is the third consecutive site of one defect**: round 4's LAW-C *"every"* (D-P5-6) → round 4's *"across all fifteen gates"* (D-P5-2) → **round 5's LAW-F *"every act"***. Each round strikes the previous round's false universal and mints a new one over its own newest law.

**Cure**: write the five missing SHADOW lines (each one line, `struck set = ∅ rows — <what moved>` where no row moves, per W5's own idiom); **or** re-word `:10` to the true form with the covered act named, as D-P5-6's cure re-worded the LAW-C sentence. **And the standing instrument fix**: the RECONCILE seat's SHADOW check must count the LAW F(1) **form**, not the token — a receipt whose pattern cannot distinguish an act from a mention cannot verify the law it is auditing.

### D-P6-3 · **MAJOR** — D-P5-6's Exception-(2) reclassification landed at ONE of its two live sites; the file now contradicts itself about the same name-set

`:640` records the round-5 act in terms: the TransportDock five-token name-set is *"**reclassified from 'a quotation from that row' to this wave's OWN measurement subject**"*, and `:96` executes it — *"**IT IS THIS WAVE'S OWN MEASUREMENT SUBJECT, NOT A QUOTATION OF A SIBLING'S PROSE**"*, with the five-token counting rule stated (four subsumed row-names + one predicate word) and the 0-of-58 measurement pasted.

**`:560` was not touched.** The → KF.W10 cross-edge still reads: *"whose **four subsumed names** this end carries **as a quotation and not as banked ids**."* So at final bytes the file says of one set, in two live cells, that it *is* and *is not* a quotation of a sibling's prose — and the header at `:12` conditions the whole LAW-C exception structure on the "own measurement subject" reading. **The SHADOW ledger at `:643` lists *"the TransportDock cell's 'four subsumed names' count"* among the round's STRUCK items, and the phrase is still live at `:560`** — a ledger entry that does not match the bytes, which is exactly what LAW F(2)'s terminus re-sweep exists to catch and what the cert's §7.6 did not test.

**Cure**: re-cut `:560` to the `:96` classification and counting rule (anchor-only, no new figure), or strike the characterization clause there and point at `:96`. **Transferable**: the SHADOW ledger's STRUCK list must be greppable against the file's own bytes before close — an act declared struck that still occurs is an unlanded act, whatever the ledger says.

### D-P6-4 · **MAJOR** — LAW-A census A-5's own arithmetic does not reproduce: `9 = 1 + 6 + 1 = 8`

`:132` prints *"→ 9 hits"* and composes them as one demo consumer + *"the other **six**"* `src/animation/**` siblings + one test. Measured at `81a56990`: **1 + 7 lines + 1 = 9** across **5** src files. Neither "six" reading closes the total the receipt itself printed, and no counting rule is stated. The SET is correct — the R3-4 same-basename trap is properly identified — but under R5-11(1) *"a receipt whose own arithmetic does not reproduce is a defect REGARDLESS of the scope's truth"*, and this is a **LAW-A census**, the instrument class R5-11's known-members list did not sweep. `PASS-5/KF-W6-CHECK.md §2.2` reproduced the figure without summing it. **Cure**: state the composition as measured (`1 demo + 7 src lines across 5 files + 1 test = 9`) with the rule at the receipt. **Companion, MINOR**: A-1's *"three further hits are docs prose"* enumerates four coordinates — true by file, false by line, rule unstated.

### D-P6-5 · **MAJOR** — `G-W6-10` quotes a witness symbol that does not produce its figure

The cell states ***"THE ONE WRITER" = 5 sites / 3 files*** over five coordinates. Measured over `demo/` at `81a56990`: `THE ONE WRITER` → **4 / 3**; `ONE WRITER` → **5 / 3**; the fifth coordinate `useSceneMachineRouterBinding.ts:10` reads `ONE WRITER`, without the article the cell quotes. Under the per-line rule the same receipt uses for `focus-ring` **11 / 7** (verified exact), the quoted symbol's figure is 4/3. **This is the `G-W6-12` `light:true` class — a quoted symbol whose spelling is unmatchable — living one gate row from the correction the round makes of it, and inside the SUBJECT-IDENTITY receipt that R5-11 elevated.** The gate's substance is unaffected. **Cure**: quote `ONE WRITER` (which yields 5/3 and covers all five coordinates), or keep `"THE ONE WRITER"` and restate the figure as 4/3 with `:10` named as the article-less sibling.

### D-P6-6 · **MINOR** — `G-W6-9`'s `ToggleGroupItem` coordinate `:64` is the parent's closing tag

`EasingTarget.vue`: `:56` `<ToggleGroupItem`, `:63` `</ToggleGroupItem>`, **`:64` `</ToggleGroup>`**. The import at `:139` and the `ToggleGroup` mount at `:50` are exact. One misattributed coordinate on an L-19 live-witness cell.

### D-P6-7 · **MINOR** — the routed-census diff, recorded

**427 routed / 417 booked / 10 escaped / 54 contributing records**, against PASS-5's 433 / 426→422 / 11 / 54. **The −6 denominator is METHOD and fully attributed** (§1.1's disposition-marker rule for bullet rows; `kf-RibbonBar.md:64`'s NO-WAVE-OWNER row is the worked example). **The escape count's near-match is coincidence: all eleven PASS-5 escapes are cured and re-verified cured, and the ten at this clock are a disjoint set.** Contributing records reproduce at 54 by the spec's own two independent routes. No act ordered by this row.

---

## §4 · VERDICT

**LOCAL VERDICT: `DEFECTIVE`** — **2 BLOCKER · 3 MAJOR · 2 MINOR**.

**What holds, and it is now most of the file's substance.** **LAW E worked**: all eleven hashes match the cert's closing table, so for the first time in this program a round's write-order is proven rather than asserted, and the pass-6 seat's first act convicts nobody. **The R5-1 BLOCKER cure is sound at the byte** — `EditorShell.vue:45`/`:46`, the shell ribbon cluster at `:20`/`:32-40`/`:36`/`:44-47`, `MbabbMenu.vue:20`/`:21`, and the fork's `:24-27` duplicates all re-read exactly; one row per banked anchor; the second spend site booked on the row rather than as a new id; `EH-9`/`EH-10` discharged only after their carriers were verified by command; the W9 guard vindicated and recorded at both ends; the KF.W0 reciprocal landed with its own counting rule. **D-P5-2 is cured at scope with the best receipt in the file** — two independent commands, a stated counting rule, a deliberate defence against self-matching, 15 = 15. **D-P5-3 is cured**: `G-W6-4`'s green is reachable in-grant for the first time, its eighth site granted for one line with the extent stated. **D-P5-4 is dead**: the seam reproduces two-ended and agreeing. **All 39 §Bounds line counts, all eleven LAW-A consumer SETS, every gate witness but one, and every outbound anchor at four siblings and COHESION re-execute exactly under a hostile fresh run.** Posture is clean on all five tested items.

**What fails is the same failure, at the next layer down, for the fourth round running.** Round 5's own transferable finding was *"a disposition is only as sound as the anchor of the row it disposes."* At this clock the finding applies to round 5's own instruments: **the ID-ALIASES trail was declared rebuilt BY COMMAND over the 58 records and is short by ten (D-P6-1)**; **LAW F — the law minted this round precisely because escapes now live downstream of the repair machinery — was applied at one of six acts under the word "every" (D-P6-2)**; **D-P5-6's reclassification landed at one of its two live sites and the file now contradicts itself about the same name-set (D-P6-3)**; and **two receipts fail R5-11's arithmetic arm inside the instrument classes R5-11's own known-members list did not sweep (D-P6-4, D-P6-5)**.

**The transferable finding for round 6**: *a law is only as strong as the pattern that verifies it.* Three of this pass's five leading defects are invisible to the exact command that was run to certify them — the cert counted the word `SHADOW` where the law defines a form; the trail's rebuild was asserted in a heading where the loop's output would have been the proof; the SHADOW ledger's STRUCK list was never grepped against the bytes it claims to have changed. Each cure is one line. **A round-6 seat should verify every law by a pattern that can distinguish a mention from an act, and should require every completeness word — "every", "all", "whole", "rebuilt over the 58 records" — to be pasted as a command's output beside it or struck.** On the current evidence the fourth consecutive false universal is the single most reliable predictor of the fifth.

*Status of the subject spec is unchanged by this file: `planned`. No gate ran. No product source was opened for writing. Sole write = this file.*
