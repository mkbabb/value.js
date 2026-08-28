# KF-W9 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 1)

**Spec under trial** `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W9.md` (230 lines, 70 875 B)
**Corpus authority** the 58 `kf-*.md` records in `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/`
**Method** ID-keyed census (the X·P terminal method). Every `KF.W9` / `W9` occurrence across all 58 records was machine-extracted with row attribution (296 raw hits), then each hit was hand-classified as *routing-law preamble* / *section header* / *closing verdict* / **terminal disposition**. Terminal dispositions were then reconciled against the spec's §Carry (68 bullets), §Sequencing, §Excluded, and §Gates.
**Verdict** **DEFECTIVE** — 10 escapes by bytes, 5 HIGH-severity internal defects, one non-existent gate witness.

---

## 0 · Booking law used

A routed row is **BOOKED** if the spec carries it (a) as a §Carry row by id, (b) as a named fold-identity inside a §Carry row, (c) as an §Excluded row with a named receiving owner, or (d) as an SS-13 residue line-item inside §H's `SS-13 residue — the whole backlog` aggregate, whose denominator **563 enumerated + 25 prose-carried = ≈588** this seat independently re-derived and CONFIRMED (see §2).

Route (d) is granted only where the record's OWN `UNPROVEN-NEEDS-LIVE` residue list contains a line-item for the row. A roster row routed `→ KF.W9` with **no residue line-item and no §Carry/fold/exclusion** is an **ESCAPE**.

---

## 1 · Counts

| quantity | value |
|---|---|
| roster-level adjudicated row ids whose terminal disposition routes to KF.W9 | **167** |
| BOOKED (row / fold-identity / exclusion / SS-13-aggregate) | **157** |
| ESCAPED by bytes | **10** |
| §Carry rows the spec *claims* | 69 |
| §Carry rows the spec *contains* | **68** (A 18 · B 5 · C 1 · D 8 · E 7 · F 4 · G 18 · H 7) |
| gates | 14, all stated born-RED |
| gates whose named witness does not exist as named | **1** (G-KFW9-14 / OP-5) |
| VERIFIED stamps | 3, all negative (`VERIFIED \| NO`, `UNVERIFIED` ×2) — E-3 HOLD |

---

## 2 · The ≈588 denominator — INDEPENDENTLY CONFIRMED (the spec's strongest cell)

Recount, awk-scoped per record over each record's own `## …UNPROVEN…` / `## …SS-13…` residue section, counting only `- ` / `N. ` line-items:

```
TOTAL enumerated residue line-items: 563
```

Prose-carried, verified at the bytes:

| record | prose items | receipt |
|---|---|---|
| kf-CubeAxisLines | 9 | residue section is one paragraph: *"r1's nine-item queue carries with three sharpenings"*; enumerated count = 0 |
| kf-TransportDock | 8 | `1–8 **carried from r1**: …` (single line; items 9–13 enumerated separately) |
| kf-CubeTarget | 8 | `:83` *"Carried: r1 items 1–4 and 6–8 unchanged"* + amended 5 |
| **total** | **25** | |

**563 + 25 = 588.** The spec's §Surface-list protocol 2 and G-KFW9-4 are **CORRECT to the unit**. This is the single best-evidenced claim in the file, and it is the one the wave's whole denominator rests on.

Corroborating gate witnesses re-executed by this seat:

| gate | claim | measured |
|---|---|---|
| G-KFW9-1 | `safari-real/` 4 tracked vs 31 on disk | `git ls-files … \| wc -l` → **4** · `ls \| wc -l` → **31** ✓ (names match verbatim) |
| G-KFW9-1 | `shots/` 11 on disk / 0 tracked | **11 / 0** ✓ |
| G-KFW9-3 | `152 × 11 × 4 × 11 = 73 568`; split `46 816 + 26 752` | both exact ✓ |
| G-KFW9-5 | `lane-frontend.md:462` verbatim *"13 enforcement sites across 12 files"* | `:462` exact; `:598` `13 (10 CSS + 3 JS)` ✓ |
| G-KFW9-8 | `grep -rn forced-colors demo/` → 0 vs 13+ PRM | **0** forced-colors · **18** PRM hits ✓ |
| G-KFW9-9 | `design-idioms.css:76-79` + `playback-idiom.css:72-75` unlayered `outline: none` | both present at the cited offsets ✓ (but see D-19) |
| G-KFW9-14 | substrate `8281638c` local vs `origin/master 81a56990` | `git rev-parse` both exact ✓ |
| OP-3 | `safaridriver` reachable | `/System/Cryptexes/App/usr/bin/safaridriver` exists ✓ |
| §Bounds | `workflows/safari-real-matrix.js`, `capture.mjs`, `states.mjs`, `REPORT.*`, `STATES.json` | all five exist on disk ✓ |

---

## 3 · ESCAPES — id-for-id, named by bytes

All ten are roster rows whose **own record's KF.W9 routing summary or disposition cell names them**, and which appear in the spec **nowhere** — not as a §Carry row, not as a named fold, not in §Excluded, not as a residue line-item in their own record.

| # | id | record | the bank's own words | why it is an escape |
|---|---|---|---|---|
| E-1 | **D-5** | kf-SpringTarget | routing summary: *"**KF.W9**: … the a11y data (**D-5's aria-hidden half**, D-6, D-14, N-4)"* | not in that record's 10-item residue (all visual/clip/contrast); absent from spec |
| E-2 | **D-6** | kf-SpringTarget | *"no heading, no landmark, no accessible name anywhere in the scene … **NO-WAVE-OWNER + KF.W9**"* | idem |
| E-3 | **D-14** | kf-SpringTarget | *"the one discrete, high-salience state change (settled↔tracking) has no `role="status"`/`aria-live` … **NO-WAVE-OWNER + KF.W9 (one binding, with N-4)**"* | idem — and the "one binding, with N-4" **cure lock** dies with it (M-25) |
| E-4 | **N-4** | kf-SpringTarget | *"the slider's accessible name is an instruction naming a modality … no `aria-valuetext`"*; routed KF.W9 | idem |
| E-5 | **D-12** | kf-SequenceAxis | routing summary: *"**KF.W9**: … **the D-12 datum + kf-SequenceTarget relay**"* — `text-mono-caption` renders `@800ms` as `@800MS` while the accessible name stays lowercase; sliders lack `aria-valuetext` | not in that record's 7-item residue; the **relay** to kf-SequenceTarget is a cross-record obligation the spec never receives |
| E-6 | **D-m8** | kf-SpringHeatmap | routing summary: *"**KF.W9**: D-B3 · D-M6's forced-colors/contrast limbs · **D-m8**/m9 · witness list"* — the 33-word `aria-label` announced whole on every focus, no `aria-describedby` split | spec §C carries **D-m9's RTL limb only**; D-m8 has no residue line-item (the 8 items are all visual) |
| E-7 | **D-12** | kf-PlaybackRibbon | routing summary: *"**KF.W9**: D-3+M-1 … · **D-12's demo-side stopgap** · D-24 …"* | not among that record's 10 residue items; absent from spec |
| E-8 | **the D17/D18-unit fold** | kf-SequenceScene | routing summary: *"**KF.W9**: D20's announcement gap · **the D17/D18-unit fold (SEQUENCED after banked N-1)** · the SS-13 list"* | a **SEQUENCING LOCK routed to KF.W9**; §Sequencing S-1..S-13 contains no such lock. M-25: sequencing riders must be CARRIED |
| E-9 | **KF-CE-47** | kf-CSSCodeEditor | *"latent token-contrast debt in both themes (comments 3.03/2.73:1, numerics 3.30:1) … → **EDITOR-UNIT** theme repair, **witnesses to SS-13/KF.W9**"* | not among that record's 9 residue items (which do carry KF-CE-33); absent from spec |
| E-10 | **KF-AV-28** (rider, not a row) | kf-AnimationVisualizer / kf-SequenceScrubber | *"A standing sequencing rider on every NO-WAVE-OWNER row below: **KF.W7's S-9 evaluation (KF-AV-28) may supersede any behavioral cure here**"* | `grep -c "KF-AV-28" KF-W9.md` → **0**. The spec carries KF-AV-19/D-8, KF-SCR-1, K-13, D·D-8 — all under this rider at their banks. S-10 paraphrases it (*"evaluate, not mechanical swap"*) without the id. M-25 violation: riders are CARRIED, not cited |

**Cluster reading.** E-1..E-7 are all **AT / announcement** rows. The spec's own S-12 asserts *"≥8 records route AT utterances INTO KF.W9"* — its §F carries **4 rows from 4 records** (kf-SpringHeatmap D-B3, kf-PlaybackRibbon D-1/L-i1, kf-App KF-APP-33, kf-CopyButton KF-CB-9), plus ST-1's AT limb = 5 records. The spec states the scope and then does not carry it. The escaped six are exactly the difference.

---

## 4 · BOOKED — the 157, by mechanism (audit trail)

Spot-checks confirming route (d) discharge, so the aggregate is not being used as a blanket:

* **kf-App** — KF-APP-2/-3/-7/-8/-11/-20/-22/-30 each route `→ KF.W9 SS-13` and each has a numbered residue item (`:2,:3,:6,:7,:8,:10,:12,:13`). **BOOKED via §H.** KF-APP-14/-15 additionally carried in §Excluded → BUILD-LEVEL ANALYSIS ✓.
* **kf-ChromeDock** — D-2-RESCOPED (residue #7), D-6/m-6 + D-12 + C-10 (residue #8), D-4 (#4), M-2/C-4 (#6), D-23/C-5 (#3), stagger-loss (#5) all present. **BOOKED.**
* **kf-AmigaScene** — D-4/D-5 (residue #4), MISSED-B (#5), MISSED-C (#6). **BOOKED** despite not appearing in S-11's amiga witness list.
* **kf-HeroAurora** — KF-HA-3 (SS-13 P-3), KF-HA-8 (P-1), KF-HA-10 (frame cost) all have residue homes. **BOOKED.**
* **kf-SpringTrace** — D-5 rides residue #8 (*"The SR pass (D-5)"*). **BOOKED.**
* **kf-SequenceScrubber** — the AT-churn row rides residue #5. **BOOKED.**
* **kf-CSSCodeEditor** — KF-CE-33 rides residue #3. **BOOKED.** (KF-CE-47 does not — E-9.)
* **kf-KeyframeCard** — KF-KC-16/KF-KC-25 ride residue #9 *"iOS device confirmation … (KF-KC-16/25 — mechanisms closed statically)"* AND are carried as a §D row. **DOUBLE-BOOKED, correctly.**

**No invention found at the row level.** Every one of the spec's 68 §Carry bullets resolves to a banked id at a named record. Spot-verified against the bytes: D-7/C-15/L-m8, D-8+M-7, OD-11, D-3/L-12/C-6, D-13, D-4(SeqTarget), D-3(SpringTarget), KF-SS-20, KF-KE-8, KAD-11, KF-EST-11, KF-TD-1, KF-SST-13, D-8/C-§5, KF-SKEL-11, KF-HA-9, D-24, KF-CE-13, D-16, RB-1, D-3+DU-M-1, ST-1, D-15, R-9, SP-4, R-20/KAD-F4, KF-KC-16/25, MISSED-F, D-25, KF-SCR-1, K-13, KF-AV-19/D-8, KF-ET-8/-14/-4/-16, SPF-5/-28, #58, D-B2/D-M4/D-M6-7/D-M3, D-B3, D-1/L-i1, KF-APP-33, KF-CB-9, M-5/C-6, M-2/C-4, D-4, D-22+RR-1#1, D-23/C-5, KF-APP-1/-5/-6/-16, KF-HA-2/-7/-12, EH-5/EH-8, D-8/C-17, RR-1 missed#4, D-11/L-9, D-28, KF-EST-2/-4/-8, MM-4/-15/-34/-30, TD-1/TD-2/TD-36/-38/-40/-41, LP-1/KF-CO-1/KF-CO-8, B18-26, I-20, KF-AX-26, KC-25, KF-ES-3, KAD-7, KF-SST-15/-16/-17, KF-TFP-7/-19, KF-CO-5, KF-AV-41, N-5, L-M-10, KF-APP-24, KF-AV-37, KF-KE-21, KF-SST-30, KF-SKEL-4, LP-19, ME-25, KF-AV-8, KF-AX-16, KF-ET-24, KF-ET-26, KF-SST-9, D-M2, KF-AT-28, KF-AT-4, KF-SKEL-22, KF-APP-41/-17, KF-HA-1, KF-CE-3, C-19a, KF-ES-45, D-M8, N-14, N-13, K-29, K-31, SP-7, R-8, R-7, KF-CB-33, KF-SST-39/-29/-7/-11, KF-KC-2/-3/-26, MM-2, KC-34 — **all present in the registry.** Two cross-reference targets are dangling (see D-8).

---

## 5 · DEFECT REGISTER

### HIGH

**D-1 · A named gate witness does not exist (L-19).**
The spec names `npm run build:gh-pages` in **three** binding places — OP-5 (*"re-run before **any** byte-offset receipt is trusted"*), §H witness-substrate law (*"**WITNESS REFRESH** (four independent records, = OP-5): re-run `npm run build:gh-pages`"*), and **G-KFW9-14**'s CLOSES.
Receipt — `keyframes.js/package.json` script keys: `audit:lighthouse, bench, bench:color-fidelity, build, build:lib, build:watch, check, check:lib, demo:correctness, dev, gen:agent-surface, **gh-pages**, lint, prepare, proof:owner-golden, proof:publish, release:changelog, test, test:lib`. There is **no `build:gh-pages` key**; `:43` is `"gh-pages": "vite build --mode gh-pages"`.
Consequence: G-KFW9-14 and OP-5 cannot be executed as written; four records (kf-CSSPasteDialog #8, kf-KeyframeTimeline #13, kf-TimelineCaret #12, kf-TimelineTrack #11) hang their byte-offset trust on a command that fails. (§Excluded's `KF_ANALYZE=1 vite build --mode gh-pages` is the *correct* form — the spec proves it knows the invocation and then mis-names it at the gate.)

**D-2 · The census headline is off by one.** §Provenance and §Carry both assert **"69/69 rows carried, 0 dropped"**. The file contains **68** `- **` bullets in §Carry: A 18 · B 5 · C 1 · D 8 · E 7 · F 4 · G 18 · H 7 = 68. A spec whose central claim is exhaustive carry cannot miscount its own carry.

**D-3 · The gates preamble contradicts two of its own gates.**
Preamble: *"**This wave measures; it authors no product cure and claims no CI colour.**"*
G-KFW9-9 CLOSES: *"**two deletions** (K-5 the falsifier: one deletion fixes nothing); live witness — focus a ribbon button under forced-colors, assert NO indicator; **delete**, assert the Highlight outline returns."*
G-KFW9-10 CLOSES: *"**one word + delete css:163-167**, sequencing IS the gate."*
§Scope 3: *"headed by the **two-deletion cure**"*. §Goal: *"the authored `outline: none` **REMOVAL** deleted in both copies"*.
Two of fourteen gates close **only** on product cures the preamble forswears. Either the preamble is false or the two gates are unclosable.

**D-4 · G-KFW9-10 edits a component the spec's own S-11 declines and S-13 fences.**
ST-1's cure touches `demo/scenes/sequence/SequenceTarget.vue:97` + `SequenceTarget.css:160-167`. S-11 declares the **sequence** packet NO-WAVE-OWNER, homes it to *"proposed KF.W11 · Demo Scene Repair … sequenced after the KF.W4 gate"*, and states *"this wave DECLINES their behaviour, HOLDS their witnesses"*. S-13 lists *"any behaviour edit in a packet/UNIT-owned component"* as a **mandatory triumvirate trigger**. Meanwhile OP-6 declares KF.W4 explicitly **not** a precondition — while `KF-W4.md:193` reads *"**This wave is the declared sequencing head of X·KF.** No repair packet and no UNIT may open before **G-KFW4-1** lands."* A gate that lands a packet-owned affordance edit before the declared sequencing head, inside a wave that declines packet behaviour, is a three-way self-contradiction, and by the spec's own S-13 it fires the triumvirate on its first execution step.

**D-5 · OP-2 forbids the writes §Bounds grants.**
OP-2: *"Write authority for keyframes.js is named (census §(c) gap 5) … **UNRESOLVED for any cure**; not blocking for read-only capture."* §Bounds nonetheless grants **EXECUTION-TIME ONLY** write on five kf paths (`design-idioms.css:76-79`, `playback-idiom.css:72-75`, `SequenceTarget.vue:97`, `SequenceTarget.css:160-167`, `app/index.html:6`), and G-KFW9-9/-10 close on exactly those writes. The spec grants itself an authority it records as un-granted.

### MEDIUM

**D-6 · The AT scope is stated and not carried.** S-12/OP-7: *"≥8 records route AT utterances INTO KF.W9"*; §F carries 4 rows. Escapes E-1..E-7 are the difference, by bytes.

**D-7 · KF-AV-28 never named (E-10).** `grep -c "KF-AV-28" KF-W9.md` → 0. It is the standing supersession rider on every NO-WAVE-OWNER row at kf-AnimationVisualizer (spec carries KF-AV-19/D-8) and kf-SequenceScrubber (spec carries KF-SCR-1, K-13, D·D-8). Paraphrase is not carry (M-25).

**D-8 · Dangling fold-identity: `kf-ControlsPaneWrapper D-3+M-1`.** The spec asserts it twice — §B `D-3 + DU-M-1 ⟨… ≡ kf-ControlsPaneWrapper D-3+M-1⟩` and RB-1's *"KF-SS-40 folds to 'kf-ControlsPaneWrapper D-3+M-1'"* — under the banner **"ONE IDENTITY, TWO BANKED NAMES"**. `kf-ControlsPaneWrapper.md` has **no D-3 and no M-1**; its ids are D-B1 · D-M3 · D-M5 · D-M7 · D-M10 · D-M11 · D-m4 · **D-m9** · D-m12 · D-i2 · MISSED (×4, unnumbered) · S-1 · N-2 · C-2. Its actual forced-colors row is **D-m9** (*"zero forced-colors / prefers-contrast / prefers-reduced-transparency handling demo-wide"*) and its actual PRM-inert row is the unnumbered **"MISSED (RR-1, adopted) — INFO"**. The spec inherited kf-SpringScene's KF-SS-40 citation without re-resolving it — the exact citation-inheritance failure the corpus convicts elsewhere. (`RR-1` at that record is a **re-reader's name**, not a row id; the spec's §A cite *"kf-ControlsPaneWrapper RR-1"* is therefore loose but resolvable.)

**D-9 · G-KFW9-8's title states an outcome no carry row owns and the standing edict forbids.** *"Forced-colors: zero becomes nonzero"* + §Goal *"the demo's **zero** forced-colors sites become nonzero"*. The two deletions restore a **producer** rule (`a11y-overrides.css`); they raise the **demo-side** `forced-colors` count by exactly zero. Raising it requires authoring demo-side `forced-colors` rules — which the spec's own standing edict (*"glass-producer rows ride the SS-6 BH relay and **NEVER** become demo-side hacks"*) and KF-ET-4's cure lock (*"the fix is one `@import`; **NEVER** a demo-side hack"*) forbid, and which no §Carry row owns.

**D-10 · Negative-register arithmetic.** §H heads *"The negative register ⟨**eight records**, verbatim⟩"* then enumerates **six** records (kf-KeyboardShortcutsModal, kf-KeyframesStringControls, kf-KeyframeCard, kf-MbabbMenu, kf-TimelineTrack, kf-SequenceAxis). G-KFW9-12's witness says *"four named traps + **six** retired/mooted/struck probes"* while the register enumerates ~**11** probes (1 + 4 + 2 + 2 + 1 + 1). Three numbers, none agreeing, on a register whose whole point is that *"a retired probe re-entering the list is a gate failure"*.

**D-11 · kf-PlaybackRibbon D-12's demo-side stopgap** — named in that record's KF.W9 routing summary; nowhere in the spec (E-7).

**D-12 · kf-SequenceScene's D17/D18-unit sequencing lock** — routed to KF.W9 with an explicit ordering constraint (*"SEQUENCED after banked N-1"*); §Sequencing carries no such lock (E-8).

### LOW

**D-13 · G-KFW9-14 is not born-RED at authoring by its own words.** Preamble: *"Fourteen gates, **all born-RED at authoring**"*; G-KFW9-14: *"**RED until stamped at open.**"* Form mismatch (the witness itself is real).

**D-14 · S-9's two-way hazard is declared against a wave that does not carry the row.** The spec routes KF-EST-4's cure to KF.W6; `grep -c KF-EST-4 KF-W6-CARRY.md` → **0** (KF-EST-2 → 1, KF-EST-8 → 1). The before/after re-shoot obligation has no counterparty at W6 for that row.

**D-15 · KF-KC-16 mis-described.** Spec §D: *"**offset-field** focus zoom"*. Bank: *"KF-KC-16 · L-5 — iOS Safari auto-zooms on focusing the **`<pre>`**"* — the CSS text region, not the offset field (that surface is kf-KeyframeCardList's). Descriptor drift on a carried id.

**D-16 · "Third independent witness" is the fourth.** §A KF-SST-13: *"**Third** independent witness of the producer PRM-inert mechanism"*. The spec itself names four: the SquareScene rider, kf-CubeScene D-16, kf-ControlsPaneWrapper RR-1, KF-SST-13.

**D-17 · `≡ kf-CubeScene D-16` cites a KILL as a witness.** §A's PRM-inert rider cites D-16 for *"the producer's unlayered `*:not([data-allow-motion]) … !important` reset defeats every local `transition: none`"*. At that bank, **D-16's PRM half is a KILLED claim** (register #8: *"the shipped stylesheet carries glass-ui's universal `!important` PRM reset … the spinner is CSS-animated and **fully neutralised**"*) — same mechanism, opposite valence (there it *creates* compliance). Citing it as a witness of PRM-inertness is a sign error the reader must repair.

**D-18 · KF-ET-12 is not W9-routed but sits adjacent to rows that are.** Its disposition is `MAJOR → NO-WAVE-OWNER (clamp)`; the spec correctly omits it. Recorded so pass 2 does not book it as an escape.

**D-19 · The "authored TWICE" selector elision.** G-KFW9-9 and §B `D-3 + DU-M-1` present the two copies as the same rule. Verified at the bytes: `design-idioms.css:78` is `.focus-ring:focus-visible { … outline: none }`; `playback-idiom.css:72-75` is **`.btn-playback:focus-visible`** — a different selector at the same (0,2,0) specificity. Both are unlayered and both carry `outline: none`, so K-5 ("deleting only the playback copy fixes nothing") survives; but the cure lock's stated ground — *"both demo copies are **wholly redundant against producer base.css's identical rule**"* — is asserted for a selector the producer does not ship. The lock is carried faithfully from the bank; the bank's ground is untested here and should be re-derived before the deletion lands.

---

## 6 · POSTURE AXES

| axis | verdict | receipt |
|---|---|---|
| **KF.W4 is the DECLARED SEQUENCING HEAD** | **DEFECT (D-4)** | `KF-W4.md:193` *"This wave is the declared sequencing head of X·KF. No repair packet and no UNIT may open before G-KFW4-1 lands."* KF-W9 OP-6 declines it as a precondition (defensible for a pure measurement wave) — but G-KFW9-10 lands a packet-owned affordance edit, and S-11 itself sequences the sequence packet *"after the KF.W4 gate"*. S-10 does correctly bind G-KFW4-9's six gate rules + the Codex-distilled LAW (B10-27/B18-19/B21-17) to this harness. |
| **KF.W3 GATED via PLAW-BIND, never scheduled** | **HOLD** | `grep -o "KF\.W3\|PLAW-BIND" KF-W9.md` → **0 hits**. The wave never schedules, cites, or depends on W3. The one parser-adjacent row it receives (kf-CubeScene #10, `parseCssValue`/`parseCssScalar`) is §Excluded → **V·π parser program** with the bank's own words *"Cross-repo, NOT SS-13"* — which is precisely `KF-W3.md:219`'s E-2 routing law (*"X·V owns its bytes … PLAW-BIND"*). Clean. |
| **KF.W7 carries the KF-AV-28 supersession rider** | **DEFECT (D-7 / E-10)** | `grep -c KF-AV-28 KF-W7.md` → **7**; `KF-W9.md` → **0**. S-10's KF.W7 edge paraphrases the rider (*"evaluate, not mechanical swap"*, *"must not pre-empt a cure decision with a witness verdict"*) and states *"48 residue rows, two armed triggers"* — but never names the rider that governs the two AnimationVisualizer/Scrubber rows it carries. M-25: CARRIED, not cited. |
| **KF.W6 squares with its 424-row CARRY file** | **PARTIAL (D-14)** | `KF-W6-CARRY.md` = 199 055 B, 215 row-shaped lines. 19 of 21 spot-checked W6-routed rows present (KF-HA-9 · R-9 · SP-4 · KAD-11 · D-22 · D-23 · KF-APP-5/-6/-16 · EH-5/EH-8 · KF-EST-2/-8 · #58 · KF-SKEL-11 · R-20 · KAD-F4 · KF-HA-2/-12). **KF-EST-4 → 0**; KF-ET-4 → 0 (correct — GLASS-OWNED/SS-6, not a W6 row). S-9's before/after hazard is sound in shape; one row has no counterparty. |
| **E-3 + STATUS** | **HOLD** | 3 `VERIFIED` tokens, all negative (`VERIFIED \| NO`; `UNVERIFIED` ×2). `Status: planned` ×5. No past-tense execution verbs (`we ran` / `was captured` / `screenshots were` / `executed the capture` / `opened a session` → 0 hits). §Bounds marks all 58 records `read-only, IMMUTABLE (E-1/E-3)` with write-backs as ADDENDA under original ids (G-KFW9-13). |
| **L-19 (no descriptive gates / proof-scripts presumed contrivance)** | **1 DEFECT (D-1), otherwise HOLD** | 13 of 14 gates carry a witness this seat re-executed or located on disk. The spec authors **no** proof-script; it correctly convicts the two it inherits — `proof:sequence-rows-draggable` (ST-1: *"a gate that exists in a CSS comment and old prose ONLY"*) and the demo's named visual-gate exclusions (KF-AX-26). G-KFW9-14's witness command does not exist as named. |
| **NO INVENTION** | **HOLD at the row level; 1 dangling cross-reference (D-8)** | All 68 §Carry bullets resolve to banked ids. `kf-ControlsPaneWrapper D-3+M-1` resolves to nothing. |

---

## 7 · What the spec gets right (recorded so pass 2 does not re-litigate)

1. **The ≈588 denominator is exact** — 563 + 25, re-derived independently, unit for unit. The rejection of the 73 568 Kronecker denominator with the inherit-numerator/reject-denominator ruling carried verbatim is the correct adjudication and is arithmetically checked (`152×11×4×11` and the `46 816 + 26 752` split both exact).
2. **Every measurable gate witness this seat could execute, executed true**: 4/31 tracked-vs-disk, 11/0 shots, forced-colors 0, PRM 18, `lane-frontend.md:462` verbatim, both substrate shas, `safaridriver` present, all five harness files present.
3. **Identity discipline is real** — KF-CE-13's fifteen folds, D-15's eight RTL folds, D-16's four sequence-family folds, D-21's three timeline folds all discharge **by reference with zero re-bookings**, and the anti-rename guards (KF-APP-6's *"three reader generations re-filed this bank as fresh; it appears ONCE, here"*; MatrixEditor K10/K26) are carried with their provenance.
4. **Cure-shape locks are carried, not paraphrased**, wherever they exist: K-5 (one deletion fixes nothing), K-6 (the universal rule constrains duration/iteration-count NOT `animation-name`), K-3 (plus-lighter DEAD), the M-6 cure-map reversal, KF-KE-8's final-frame rest-state constraint, the KAD-11 pair lock, MM-4's *"M-4's cure as worded would ship an UNOPENABLE MENU"*, D-23's *"a selector-string diff would ship green and change nothing"*, KF-APP-1's two-writer disposal law, LP-1's write→render lock.
5. **Nine dissents preserved verbatim** with their promotion conditions (KF-SS-20 · KF-EST-11 · KF-SST-13 · D-16 seq-family · D-15 RTL · D-3+DU-M-1 · R-20/KAD-F4 armed · KF-ET-4 · S-12/OP-7).
6. **The escalation register's own arithmetic checks**: 14 armed triggers enumerated, 14 claimed; 3 can reach BLOCKER (KF-ES-3, D-M3 branch (a), KAD-7/D-2), 3 claimed.

---

## 8 · Pass-1 verdict

**DEFECTIVE.**

The wave's *substance* is sound and unusually well-receipted — the denominator is exact, the witnesses that exist are real, the identity discipline holds, and the dissent registry is complete. The defects are **boundary defects**, and they cluster in two places:

1. **The wave does not know whether it measures or cures.** D-3/D-4/D-5/D-9 are one fault seen four ways: the preamble, OP-2 and S-11 say *measure*; §Scope 3, §Goal, §Bounds, G-KFW9-8/-9/-10 say *cure*. Pass 2 must pick one. If *measure*: G-KFW9-9 closes on the born-RED witness pair (focus a ribbon button under forced-colors, assert no indicator) and the deletions route to their packet; G-KFW9-10 becomes a sequencing DECLARATION handed to KF.W11, not a gate. If *cure*: OP-2 must be resolved by the owner first, S-13's triumvirate fires by construction, and KF.W4's sequencing head binds.
2. **The AT arm is announced and not carried.** S-12 claims ≥8 records; §F carries 4. Six of the ten escapes are AT-utterance rows, and one of them (kf-SpringTarget D-14/N-4) carries a cure lock — *"one binding, with N-4"* — that dies with it.

Plus one hard blocker: **G-KFW9-14's refresh command does not exist** (`build:gh-pages` → `gh-pages`), and four records' byte-offset trust hangs on it.

⟨PASS 1 · authored 2026-08-28 by the fresh adversarial L-18/L-20 seat. Corpus: 58 `kf-*.md` at `registry/adjudicated/`, 296 raw `W9` hits classified. Every numeric claim above was executed against the tree this session; no figure is inherited. Status of this file: a check record, not a spec amendment — E-3 addenda-not-patch.⟩
