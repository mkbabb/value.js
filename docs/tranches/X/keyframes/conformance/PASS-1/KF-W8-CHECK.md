# KF-W8 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, pass 1)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W8.md` (291 L, 47 102 B)
**Corpus authority**: the **58** `kf-*.md` records in `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` (2 942 331 B total). `KF-W6-CARRY.md` consulted for the W6 reciprocity axis only.
**Product tree** (read-only; zero writes): `/Users/mkbabb/Programming/keyframes.js` at `origin/master 81a56990`.
**Seat instruments**: `grep -n 'W8' kf-*.md` (67 hit lines, all classified below) · per-id `grep -ln` fold sweeps for the 15 W8-terminal identities · `git ls-tree` / `git grep` / `git show` re-runs of 7 of the 15 gates · cross-wave `grep -n 'KF\.W8'` over all ten sibling wave specs · `grep -n 'KF-CB-37' KF-W6.md KF-W6-CARRY.md`.
**Verdict**: **DEFECTIVE** — the ID-keyed census itself is **CLEAN (32/32 booked, 0 escaped)**; the spec fails on **family enumeration**, **cross-edge reception**, and **declared reciprocity**.

---

## 1 · ID-KEYED CENSUS (the X·P terminal method)

### 1.1 Method

Every `W8` byte in all 58 records was enumerated (`grep -n 'W8' kf-*.md` → **67 lines**) and each line classified as **routing-law boilerplate** (the KF.W0–W10 taxonomy paragraph), **closing-verdict summary**, or a **row-terminal routing**. Dotted/alternate forms were swept separately: `grep -oE 'KF[.\-]?W8|W8|\bW\.8\b'` produced only the `KF.W8` and bare-`W8` forms; `grep -inE 'W[.-]8\b|wave 8|Wave-8'` produced only Tailwind `w-8` class hits and the value.js `L.W8 ED-3` ledger cite at `kf-OrbitalDrag.md:82` (OD-34, **NO-WAVE-OWNER** — correctly not a KF.W8 routing).

Fold-transitivity was then closed: every id whose terminal disposition is W8 (`KF-CE-12`, `KAD-24`, `N-11`, `KF-AV-8`, `KF-AV-9`, `KF-AT-26`, `KF-CB-37`, `KC-30`, `KF-KC-45`, `C-12`, `KF-KE-15`, `KF-AV-26`, `KF-AV-24`, `M-4`, `R-10`) was `grep -ln`'d across all 58 records to catch rows folded to a W8-terminal identity **without** typing `W8`. Three candidate leaks were opened and resolved:

| candidate | record | resolution |
|---|---|---|
| `KF-CE-12` mention | `kf-TimelineHoverPreview.md:112` | a **superlative** (S+3/S-d) citing the C-12/KF-CE-12 breach family as the negative comparator — no defect, no routing. Not an escape. |
| `N-11` mention | `kf-ChannelOptions.md:88` (KF-CO-33) · `kf-SequencePlayhead.md:83` | different records' local `N-11` ids: OPTIONS-UNIT hygiene and a KF.W0 manifest fold. Not the kf-KeyframeTimeline N-11. Not escapes. |
| `R-10` mention | `kf-CSSPasteDialog.md:52` · `kf-KeyframesAddDialog.md:83` | kf-CSSPasteDialog's own `R-10` (`--ui-scale`-blind spacing) → **KF.W6**; KAD-F5 folds to it → KF.W6. Not the kf-KeyboardShortcutsModal R-10. Not escapes. |

### 1.2 Routed roster — 32 registry-adjudicated ids, id-for-id

| # | id | source record : line | terminal routing (verbatim locus) | spec carries? | how |
|---|---|---|---|---|---|
| 1 | **KF-CE-12** | kf-CSSCodeEditor.md:46 | "→ **KF.W8** (Structure & Colocation Settle)" | **BOOKED** | Rows row 1 (unit c · G1+G2); K-10 read-down + R1 ingress fold-by-reference carried |
| 2 | **KF-CE-42** | kf-CSSCodeEditor.md:80 | "Body folded into KF-CE-12's routing. → **KF.W8**." | **BOOKED** | Rows row 2 — *"identity retained for life, carries no independent cure"* (anti-rename honored) |
| 3 | **KF-AV-8** | kf-AnimationVisualizer.md:49 | "→ fold by reference to KF-CE-12 … → **KF.W8**" | **BOOKED** | Rows row 3 (unit c, three-site extirpation = one commit) |
| 4 | **KF-AV-9** | kf-AnimationVisualizer.md:50 | "→ **KF.W8** with KF-AV-8" | **BOOKED** | Rows row 5; library half → KF.W5 split declared; **bounding note carried verbatim** ✓ |
| 5 | **KF-AV-18** (W8 arm) | kf-AnimationVisualizer.md:62 | "prose sweep rides KF-AV-8's **KF.W8** decision" | **BOOKED** | Rows row 6; source-regex pin explicitly **not** authored here (KF.W4) ✓; reader-1 MAJOR dissent recorded ✓ |
| 6 | **KF-AV-24** | kf-AnimationVisualizer.md:68 | "→ **KF.W8** (seam consolidation decision)" | **BOOKED** | Rows row 27 · G14; a11y-posture RIDER carried ✓ |
| 7 | **KF-AV-26** | kf-AnimationVisualizer.md:70 | "→ **KF.W8** (Structure & Colocation Settle)" | **BOOKED** | Rows row 26 · unit h; KF-AV-28 swap rider carried ✓ |
| 8 | **KF-AV-35** | kf-AnimationVisualizer.md:82 | "Folds into KF-AV-8/KF-CE-12 → KF.W8" | **BOOKED** | Rows row 4 (rides KF-AV-8; K-10 read-down carried) |
| 9 | **C-10** (kf-CSSPasteDialog) | kf-CSSPasteDialog.md:75 | "**→ KF.W8** (test-tree isomorphism)" | **BOOKED** | Rows row 25 · unit g · G12 |
| 10 | **KF-HA-14** | kf-HeroAurora.md:56 | "**Fold-by-reference → KF-AT-26(c) → KF.W8**" | **BOOKED** | Rows row 14; the `editor-shell/` phantom attached to the same move edit ✓ |
| 11 | **KF-AT-26(c)** | kf-AnimatedText.md:71 · kf-HeroAurora.md:27/:120 | "(c) **KF.W8** (colocation settle)" | **BOOKED** | Rows row 13 with an **IDENTITY GUARD** naming legs (a)(b)(d)→W6, (e)→W10 ✓ |
| 12 | **L-19/C-14** | kf-KeyframeTimeline.md:77 | "**→ KF.W8**" | **BOOKED** | Rows row 18 (third site of the barrel family) |
| 13 | **C-12** (kf-KeyframeTimeline) | kf-KeyframeTimeline.md:78 | "**→ KF.W8** (publish-or-relocate) + **KF.W4**" | **BOOKED** | Rows row 9; *"the demo round-trip is not a consumer proof"* clause carried ✓ |
| 14 | **N-11** (kf-KeyframeTimeline) | kf-KeyframeTimeline.md:101 | "**→ KF.W8**" | **BOOKED** | Rows row 19 · unit f · G5 · pure-move |
| 15 | **MISS-β2** | kf-TimelineCaret.md:46 | "**→ KF.W8** (publish-or-relocate, joint with banked C-12)" | **BOOKED** | Rows row 10 · unit d · G3; KC-1 citation correction recorded here, dated record unrewritten (E-3) ✓ |
| 16 | **m-7** (kf-TimelineCaret) | kf-TimelineCaret.md:59 | "**→ KF.W8** (rename with the colocation move, banked N-11)" | **BOOKED** | Rows row 21; C-15 closure honored ✓ |
| 17 | **L-8** (kf-TimelineCaret) | kf-TimelineCaret.md:81 | "= banked N-11 (INFO, → KF.W8)" | **BOOKED** | Rows row 20 (fold only, rides N-11); axis-L MINOR→bank INFO correction recorded ✓ |
| 18 | **m-15** (kf-TimelineTrack) | kf-TimelineTrack.md:104 | "= banked N-11 (**→ KF.W8**)" | **BOOKED** | Rows row 20 (same line as L-8) |
| 19 | **R-10** (kf-KeyboardShortcutsModal) | kf-KeyboardShortcutsModal.md:46/:127 | "**→ KF.W8** (test-tree isomorphism / colocation settle)" | **BOOKED** | Rows row 24 · unit g · G10/G11; **R-9 explicitly NOT absorbed** ✓ |
| 20 | **KAD-24** | kf-KeyframesAddDialog.md:77 | "**→ KF.W8** (structure/colocation)" | **BOOKED** | Rows row 15 · unit e · G4 — *the surviving family identity* |
| 21 | **KAD zero-coverage** (fold → C-10) | kf-KeyframesAddDialog.md:89 | "Fold identity → the twin's C-10. **→ KF.W8**" | **BOOKED** | carried inside Rows row 24: *"one `vitest.config.ts` edit closes R-10 + C-10 + the KAD zero-coverage fold"*; KAD-13/KAD-14 pins carried ✓ |
| 22 | **L-17 colocation** (kf-KeyframesAddDialog) | kf-KeyframesAddDialog.md:92 | "**→ KF.W8**" | **BOOKED** | Rows row 23 · **unit b** — the ratification anchor (KF.W8-I) |
| 23 | **KF-KC-42** | kf-KeyframeCard.md:87 | "rides the **R-7 consolidation (KF.W8)**" | **BOOKED** | Rows row 30; **R-3 rules the registry conflict** (kf-CSSPasteDialog banks R-7 → KF.W7) — declared, not silently picked ✓; R-25 third-copy warning carried ✓ |
| 24 | **KF-KC-45** | kf-KeyframeCard.md:90 | "**→ KF.W8** (adopt-or-delete)" | **BOOKED** | Rows row 17 — FOLDED into KAD-24 by R-2, identity retained for life, with the banking-order inversion check ✓ |
| 25 | **KC-30** | kf-KeyframeCardList.md:66 | "→ **KF.W8** (colocation settle)" | **BOOKED** | Rows row 22 · unit f · G5 · pure-move (cannot invert KC-34) ✓ |
| 26 | **KF-KE-15** | kf-KeyframesEditor.md:57 | "→ **FOLD to KF-CE-12 → KF.W8**" | **BOOKED** | Rows row 7; census re-derived (D-19-3); KFED-UNIT race declared ✓ |
| 27 | **C-8** (kf-KeyframesStringControls) | kf-KeyframesStringControls.md:80-81 | "Disposition: **KF.W5** (surface decision) + **KF.W8** (colocation)" | **BOOKED** | Rows row 8 with an explicit **split lock** (W5 rules publication, W8 repoints) ✓ |
| 28 | **C-13** (kf-PlaybackRibbon) | kf-PlaybackRibbon.md:55/:154 | "**KF.W8**: C-13 ≡ KF-AV-8/-9 (banked)" | **BOOKED** | Rows row 11 — **fold only**, "so the ribbon's confirmation is not mistaken for a fourth site" ✓ |
| 29 | **M-4** (kf-RibbonBar) | kf-RibbonBar.md:66/:132 | "Disposition: **KF.W8** … as the RibbonBar-side spec input" | **BOOKED** | Rows row 28 · unit h · G15 — spec-input only, hard-bundled with kf-ChannelControls L-2/C-2; **NAME-COLLISION GUARD vs kf-ChromeDock's M-4** ✓ |
| 30 | **m-4** (kf-RibbonBar) | kf-RibbonBar.md:132 | "+ the m-4 fold's directory settle" | **BOOKED** | Rows row 29; booked **MEASURED-DIVERGENT** (D-19-7: does not reproduce as worded) — re-derive first ✓ |
| 31 | **KF-CB-37** | kf-CopyButton.md:85 | "→ **KF.W8** (Structure & Colocation Settle), same wave as the KF-CB-7 reshell decision" | **BOOKED (defectively — see D-2)** | Rows row 12 · **G6 verify-only**, act routed to KF.W6 by R-1 |
| 32 | **SPF-22** | kf-SpringPhysicsFacet.md:62 | "**FOLD ≡ KAD-24** … → **KF.W8** (structure/colocation)" | **BOOKED** | Rows row 16 (rides KAD-24; contributes the `SpringPhysicsFacet.vue:135` decider) ✓ |

**Non-registry rows the spec additionally carries** (census-derived, not `kf-*.md` ids; declared as such in the Rows table): `census §(a)9 + §2-flags · src/animation single-child` (unit e · G13) · `census §1 tests-row (LIB §5) · two orphaned *.measure.test.ts` (unit g · G9) · `census §3 FE §7 · colocation ratification` (unit b). These three + the 32 above = the spec's claimed **34 CARRY rows** (rows 17/18 of its table pack two ids each).

### 1.3 Escapes

**ZERO.** Every registry row whose terminal disposition routes to KF.W8 is carried as a row, a named fold-identity, or an exclusion-with-reason. Named by bytes: no id in the 58-record corpus routes to KF.W8 and is absent from `KF-W8.md`.

### 1.4 Excluded-with-reason (spec §Excluded), audited

All 15 exclusion rows were checked against the bank. Every one names a real owner and a real reason; three were spot-verified: **R-9** stays NO-WAVE-OWNER (kf-KeyboardShortcutsModal:127 ✓ — the adjacency to R-10's config edit is exactly the annexation the spec refuses); **KF-AT-26 legs (a)(b)(d)→W6, (e)→W10** matches kf-AnimatedText.md:71 ✓ and KF-W10.md:323 ✓; **the shims/`presets/` ladder** is flagged OWNER-CONFIRM and correctly identified as census-flagged, **not banked** ✓.

---

## 2 · NO INVENTION (M-25: locks + riders + dissents CARRIED, not cited)

**HOLDS for 32/32 rows.** Every carried row traces to a banked id; every cited fold identity resolves in-corpus (verified by count): `R-25` (kf-CSSPasteDialog ×3) · `KAD-13`/`KAD-14` (×3 each) · `KC-1` (kf-KeyframeCardList ×8) · `KC-34` (×6) · `C-15` (kf-KeyframeTimeline ×3) · `KF-CE-40` (kf-CSSCodeEditor ×2) · `N-8` (kf-KeyframesStringControls ×7) · kf-ChannelControls `L-2`/`C-2` (×6) · kf-ChromeDock `M-4` (×5).

The M-25 carry obligation is met in substance: KF-AV-9's bounding note verbatim; KAD-24's cure-shape lock; KF-KC-42's R-7 fold constraints + R-25; KF-CB-37's S-2 roving-tabindex MUST-CARRY (matching `KF-W6-CARRY.md:173`); KF-AV-28's supersession rider; the ChromeDock name-collision guard; three grade-corrections (KF-AV-18 reader-1's MAJOR, N-11's axis-L MINOR→INFO, m-15/L-8).

**Two carry gaps** (D-8, D-10 below): MISS-β2's *binding* DISSENT is not carried, and the "kf-SquareScene law" label is cited without its minting anchor.

---

## 3 · GATES (L-19: born-RED, real witness, proof-scripts presumed contrivance)

**Seven of the fifteen gate measurements were independently re-executed by this seat at `origin/master 81a56990`. All seven reproduce EXACTLY:**

| gate | spec claims RED at | this seat's re-run | verdict |
|---|---|---|---|
| **G1** | 7 statements / 6 files / 4 library modules | `git grep -c 'from "@src/' origin/master -- demo` → 6 files; `timelineEngine.ts` = **2** ⇒ **7 statements** | ✅ EXACT |
| **G3** | 3 serializer bodies at `format/format.ts:20`, `css-text.ts:58`, `keyframeSelector.ts:7` | 3 hits, **byte-exact at those three anchors** | ✅ EXACT |
| **G5** | exactly 3 up-imports (`:31`, `:116`, `:229`) | 3 hits, exactly those lines/files — **D-19-9's third site (ChannelControls:229 → ../KfPillTabs.vue) is REAL** | ✅ EXACT (received arm's "2" was wrong; the fold seat's repair holds) |
| **G6** | 1 loose `.vue` = `CopyButton.vue` | `git ls-tree … demo/components/` → exactly `CopyButton.vue` | ✅ EXACT |
| **G13** | `src/` → one entry, `src/animation` | `git ls-tree --name-only origin/master -- src/` → `src/animation` | ✅ EXACT |
| **G14** | 11 lines / 10 files, `useDragScrub` zero | 11 lines / 10 files, host list **identical** incl. `AnimationVisualizer.vue` ×2 | ✅ EXACT |
| **G15** | RibbonBar = 151 L | `git show … \| wc -l` → **151** | ✅ EXACT |

**No proof-script contrivance.** Every gate names a literal `git grep`/`git ls-tree`/`npx vitest` command over the real tree plus a falsifier; the spec explicitly refuses to author W4's gates and explicitly refuses to cite the uncommanded `16` and `1 051` (L-9 honored). This is the strongest axis of the file.

**One deficiency (D-7)**: three of fifteen gates rest on a to-be-created fixture with **no path** — G10's "one-file probe", G11's test half, G12's characterization tests — and the create-Bounds row is written with a literally elided path `docs/tranches/.../waves/KF-W8-census.md`.

---

## 4 · E-3 + STATUS

**HOLDS.** `Status: planned` (:11). Verb table: `IMPLEMENTED NO`, **`VERIFIED NO`** (:17-18) — zero VERIFIED stamps anywhere. Provenance opens with *"This is a specification: status fields stay `planned`; nothing opens product source; execution awaits the owner's begin-word."* (:3). E-3 is honored **twice by name**: KC-1's dated record unrewritten (:134, :278) and the `sideEffects:false` framing killed by K-10's read-down but carried so no spec re-argues it (:125, :279). Every lowercase "verified" is a read-only fold-seat measurement receipt, not a status stamp.

**One residue (D-9)**: :117 reads *"KF-CB-37 → `CopyButton.vue` leaves the root (**executed in W6**, R-1)"* — a completed-act voice for a wave that is itself `planned`.

---

## 5 · POSTURE AXES

| axis | binding here? | finding |
|---|---|---|
| **KF.W4 = DECLARED SEQUENCING HEAD** | YES | **HOLDS, exemplary.** `Opens after: KF.W4` (:8, quoting *"the sequencing head of the whole record"*); *"**KF.W8 authors no type gate**"* (:250); the shared-file race (`vitest.config.ts` + `package.json`) is ordered W4-first, and G10 restates it as a boundary (:212). Matches `KF-W4.md:193` and `KF-W4.md:211`'s split row exactly. |
| **KF.W3 GATED via PLAW-BIND (never scheduled)** | weakly | **LOW GAP (D-11).** :254/:277 route KF-CE-12's R1 ingress arm to "KF.W2/W3" without noting `KF-W3.md:1` declares W3 *"GATED, never scheduled"*. W2 is scheduled so the arm lands there; the spec never says so. |
| **KF.W7 carries the KF-AV-28 supersession rider** | YES | **HOLDS.** Carried twice, verbatim as a **STANDING RIDER** on KF-AV-26 (:150) and KF-AV-24 (:151): *"a KF.W7 'swap' verdict (S-9 / KF-AV-28) discharges this row with the component. Sequence after that verdict or accept the throwaway."* Matches `kf-AnimationVisualizer.md:35` and `kf-PlaybackRibbon.md:36`. R-3 additionally rules the W7/W8 fold boundary rather than picking silently. |
| **KF.W6 must square with its 424-row CARRY** | YES | **FAILS — see D-2.** |

---

## 6 · DEFECT REGISTER

### D-1 · **HIGH** — G4's barrel family is under-counted by one live barrel; the spec's own gate text contradicts its enumeration

`git ls-tree -r --name-only origin/master -- demo/components | grep 'index\.ts$'` returns **five** barrels:
```
demo/components/instrument/index.ts
demo/components/instrument/keyframes/index.ts
demo/components/instrument/shell/index.ts
demo/components/instrument/timeline/index.ts
demo/components/instrument/transport/index.ts      ← NEITHER CARRIED NOR EXCLUDED
```
`KF-W8.md:72` Bounds `delete-or-gate` names only `instrument/index.ts · keyframes/index.ts · timeline/index.ts`; G4 (:180-184) rules *"one ruling covers all four"* where the fourth site is `KF-CE-40` — a **member export inside `keyframes/index.ts`**, not a barrel.

Yet **G4's own body cites `:24-:27`** — *"the sub-barrels' only inbound refs are the umbrella's own `export *` lines (`:24-:27`)"* — and `git show origin/master:demo/components/instrument/index.ts` shows those four lines are:
```
export * from "./transport";   ← :24
export * from "./keyframes";
export * from "./timeline";
export * from "./shell";
```
So the gate counts four `export *` lines while the spec enumerates three sub-barrels. `transport/index.ts` is the identical disease — its header comment is the same **T.F5** chunk rationale (*"so importing this barrel never eager-loads the control facility's downstream Monaco/highlight.js chunk"*), it carries **three** `defineAsyncComponent` exports (`AnimationControlsGroup`, `TransportDock`, `KfPillTabs`) plus a type export, and `git grep -c 'instrument/transport"' origin/master -- demo test` → **0 importers**.

It is **banked twice**, both NON-W8:
- `kf-DemoGlobalChrome.md:70` **M-L3** — *"the `transport/` and `instrument/` barrels — including three `defineAsyncComponent` wrappers with a load-bearing-sounding hazard rationale (T.F5) — have zero consumers repo-wide"* → **NO-WAVE-OWNER**
- `kf-EditorShell.md:79` **L-16-RESCOPED + RR-2 M4** — *"the lazy transport/instrument barrel layer is dead whole: three `defineAsyncComponent` exports with zero consumers, an umbrella with zero importers, two docblocks advertising a guarantee no path consumes … Cure: delete the barrel layer + false prose"* → NO-WAVE-OWNER (§MINOR header, `:58`)

`grep -c 'transport/index\|M-L3\|L-16' KF-W8.md` → **0 / 0 / 0**.

**Consequence.** G4's `git grep -l 'from "@components/instrument"'` cannot see `@components/instrument/transport` importers, so **G4 can go green with the fifth barrel and its false chunk-rationale prose alive** — which is also a live G8 violation (*"three barrel chunk-rationale comments describe protection the tree does not get"* — there are four). And G4's *"one ruling covers all four"* either silently annexes two NO-WAVE-OWNER rows or leaves the family unruled at two sites. The spec's own L-18 rider names this failure shape: *"a barrel deleted while its chunk-rationale prose survives elsewhere (G4/G8)."*

### D-2 · **HIGH** — R-1 asserts a reciprocal W6 declaration that does not exist; the only banked W8 *move* ends up owned by neither wave

`KF-W8.md:241` (R-1): *"**RULED: the file moves inside KF.W6's reshell commit; KF.W8 verifies (G6).** … **KF.W6 carries the reciprocal declaration.**"*

Receipts:
- `grep -n 'KF-CB-37' /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W6.md` → **0 hits**
- `grep -n 'KF-CB-37' /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` → **0 hits** (the 424-row authority)
- `KF-W6.md:378`, W6's own `→ KF.W8` edge, names *"KF-AT-26(c)/U.B5 move-to-`app/` + the `App.vue:139-141` `editor-shell/` misdirection; the import-granularity structural half (KF-KC-37 + SP-18 + KF-KE-53); barrel deletes coordinate with colocation"* — **KF-CB-37 is absent**
- `KF-W6-CARRY.md:317` bounds the file as `| demo/components/CopyButton.vue | 113 | modify | S-7 reshell |` — a **modify**, not a move; and W6's KF-CB-7 row (`:173`) is the reshell/`Button`-swap decision, which carries no path change

`kf-CopyButton.md:85` banks **KF-CB-37 → KF.W8 (Structure & Colocation Settle)**. W8 hands the act away on a reciprocity that is not there and keeps only **G6 (verify-only)**. The gate is born RED at 1 (`CopyButton.vue`, re-verified by this seat) with **no wave holding the act**. The fallback clause (*"If W6 declines the reshell, the bare move falls back to KF.W8 unit f"*) does not cure it: W6 has not declined — it never received the row.

### D-3 · **HIGH** — KF.W5's two-instance structural handoff is half-received, and its "do not split mid-cure" lock is broken three ways

`KF-W5.md:215` (**D-6**, the 16 stutters) states the boundary explicitly:
> *"**BOUNDARY WITH KF.W8, DECLARED**: the two **structural** instances — `src/` having exactly one child, producing `src/animation/engine/animation.ts` — are **KF.W8's** … **One rename programme, two waves: do not split mid-cure.**"*

and `KF-W5.md:269` repeats it: *"the **2 structural instances** (`src/` single-child → `engine/animation.ts`) are KF.W8's."*

- `grep -c 'engine/animation' KF-W8.md` → **0.** The **second** structural instance is not carried, not excluded, not named.
- `KF-W8.md:244` (R-4) **DECLINES** the flatten *"for the duration of X·KF"* and sets *"Receiving surface: **KF.W10**"* — so the one rename programme W5 locked to **two** waves is now split across **three** (W5 renames land at W5 §S-7; W8's half is pushed to W10).
- `KF-W8.md:103` / `:225` / `:286` kill the census `16` as *"UNREPRODUCED (no command was recorded — L-9)"* and G13 substitutes **8** under a narrower predicate (`basename == dirname`). But `KF-W5.md:215` **enumerates the 16 by name** under a broader predicate (basename/parent-**token** stutter: `compile/easing/easing-option`, `engine/css/css-animation`, `resolve/element-resolve`, `svg/draw-svg`, `waapi/waapi-options`, …) and `KF-W5.md:240`'s **G-STRUCT leg 2** requires *"16 stutters × rename-or-keep"*. W8 re-measures a denominator W5 owns and gates on, using a predicate that structurally cannot see W5's rows — while W8's own "Do NOT touch" list (:89) does not name the stutter census.

### D-4 · **MEDIUM** — four declared cross-edges INTO KF.W8 are unreceived and undeclined

`grep -c` in `KF-W8.md` returns **0** for every identifier below:

| edge | origin | ids / material | in W8? |
|---|---|---|---|
| import-granularity structural half | `KF-W6.md:378` (+ `:399` table row) | **KF-KC-37** (kf-KeyframeCard:82) · **SP-18** (kf-SharePopover:54) · **KF-KE-53** (kf-KeyframesEditor:98) — all banked → KF.W6, structural half re-routed to W8 | **0 hits** |
| SpringTrace **C-3** implementation | `KF-W7.md:99`, `:313`, `:335` | *"a value.js LIBRARY export-surface decision, **natural home KF.W8** / the export settle … implementation edge declared to KF.W5/KF.W8"* (`resolveLinearStops`/`sampleNormalizedSpring`; route dissent recorded) | **0 hits** ("SpringTrace" absent) |
| `ingest/cssom.ts` colocation | `KF-W5.md:269(c)` | *"`ingest/cssom.ts`'s split disposition defers to KF.W2's façade decision; **KF.W8 owns its colocation**"* | **0 hits** ("cssom" absent) |
| **B-16** shadow-name (conditional) | `KF-W5.md:269(d)` | *"If OP-4 resolves demo-side, B-16 becomes a **shadow-name** row for KF.W8"* | **0 hits** |

W8's Sequencing declares outbound edges to W0/W2-3/W4/W5/W6/W7/W9/W10 and four NO-WAVE-OWNER units, and its §Excluded declines fifteen items — none of these four. A cross-edge that one wave declares and the receiving wave neither books nor declines is exactly the "nothing lost: head, tail, or interval" failure the program exists to prevent.

### D-5 · **MEDIUM** — G7 discharges three banked rows another owner holds, uncited

G7 (:195-197) requires *"`shell/index.ts` exports exactly its directory, and **every export has ≥1 importer**"* and convicts by name: *"`EditorHeader` is exported with **zero component importers**."*

That exact cell is banked three times, none of them W8:
- `kf-App.md:91` — **KF-APP-41** *"EditorHeader: 0 consumers, still barrel-exported on App's import path"* → **NO-WAVE-OWNER (delete)**
- `kf-EditorShell.md:95` — **C-22 + D-27 + RR-2 M7** (INFO, NO-WAVE-OWNER) with a binding rider W8 would need: *"it does NOT ship (rolldown shakes the unused barrel member) … **while the orphan `--header-items-max-w: 500px` DOES survive into the shipped cascade**"*
- `kf-EditorStartScreen.md:52` — folds the same finding to KF-APP-41

`grep -c 'KF-APP-41' KF-W8.md` → **0.** Executing G7 either discharges three NO-WAVE-OWNER rows without declaring it, or trips over the surviving orphan token no one told it about. This is the identity guard used in the **inverting** direction — the failure mode kf-TimelineCaret's own DISSENT 3 names: *"folding a new defect into the wrong banked row silently discharges it."*

### D-6 · **MEDIUM** — KF.W2's OP-6 is left unordered, leaving both waves' gates mutually conditioned

`KF-W2.md:38` books **OP-6** = *"**KF.W8 ordering for the serializer publication** (MISS-β2, joint with banked C-12). **UNORDERED.** G-W2-8 is therefore **conditional** — a gate whose act belongs to another wave is contrivance if declared unconditionally (L-19)"*, and `KF-W2.md:221` states *"If KF.W8 does not precede, this wave gates only the façade-side contract … and the count-gate **arms at W8**."*

`KF-W8.md:254` answers only: *"MISS-β2 cross-refs W2's emit façade as a **possible** publication vehicle — **if** W2 mints it, the publication half discharges there."* The ordering W2 explicitly hands W8 to fix is restated as a conditional in the opposite direction. Neither wave orders the edge; G3 and G-W2-8 are each conditioned on the other.

### D-7 · **LOW-MEDIUM** — three of fifteen gates name a to-be-created witness with no path (L-19)

- **G10** (:210): *"A one-file probe importing any `demo/**/*.vue` runs green under `npx vitest run --project demo`"* — the probe has no path.
- **G11** (:215): requires *"both a module and a test"*; only the module (`groupShortcuts.ts`) is pathed, in Bounds (:79).
- **G12** (:219): characterization coverage for the dialog pair — no test path (the SFCs are pathed read-only).
- **Bounds** (:87): the create row is written `docs/tranches/.../waves/KF-W8-census.md · KF-W8-CLOSE.md` — an **elided** path in the one table that is supposed to fix bytes.

The remaining twelve gates all name literal commands over existing files and are clean.

### D-8 · **LOW** — MISS-β2's binding dissent is cited nowhere; W7 carries it and W8 does not

`kf-TimelineCaret.md:136` (DISSENT 1) conditions the severity of the very row W8 owns: *"the caret remains the chief INTERACTIVE integer feeder, and if a wave ever establishes an integers-only invariant at the UI, **the serializer row (MISS-β2) inherits the full user-visible harm C-1 described**."* `KF-W7.md:157` carries it verbatim. `KF-W8.md:134`'s MISS-β2 row carries the KC-1 correction, the C-15 lock and the W2 cross-ref — but not the dissent that governs its own grade. M-25 requires dissents CARRIED, not left at a sibling wave.

### D-9 · **LOW** — one completed-act voice in a `planned` spec

`:117` — *"KF-CB-37 → `CopyButton.vue` leaves the root (**executed in W6**, R-1)"* — inside the nine-row idiom re-derivation. W6 is itself `planned`, and per **D-2** carries no such row. Elsewhere the same fact is phrased correctly (*"the move executes in KF.W6"*, :136).

### D-10 · **LOW** — the "kf-SquareScene law" cure-shape lock is cited without its minting anchor

`:139` attributes KAD-24's lock to the *"kf-SquareScene law"*. `grep -in 'same commit|its comment|dead code|cure-shape|chunk invariant|test obligation' kf-SquareScene.md` → **0 hits**; `grep -c 'W8' kf-SquareScene.md` → **0**. The label is real but is **minted at `KF-W6.md:128`** — *"Family law (KF-CE-41, verbatim): the comment is part of the defect surface … Generalisation: comment-stated invariants are test obligations (kf-SquareScene law)"* — over kf-SquareScene's specimen (MISS-3, the docblock asserting the opposite of its code). W8 cites the derived label, never KF-CE-41 or the minting line. The lock's content is sound; its provenance chain is not carried.

### D-11 · **LOW** — KF.W3's GATED posture unflagged on a routed fold

`:254` / `:277` route KF-CE-12's R1 ingress arm to *"KF.W2/W3"* (faithful to `kf-CSSCodeEditor.md:46`), but never note that `KF-W3.md:1` declares W3 **"Parser Consumption (GATED, never scheduled)"** under PLAW-BIND. The arm lands at W2 in practice; the spec does not say so, so a reader cannot tell the fold has a scheduled receiver.

---

## 7 · WHAT THE SPEC GETS RIGHT (recorded, L-18 runs both ways)

1. **The census is airtight.** 32/32 registry-routed ids booked, zero escapes, zero inventions among carried rows, every fold identity resolving in-corpus.
2. **Every re-run gate measurement reproduces exactly** (7/7 re-executed by this seat), including the fold seat's own repairs — **D-19-9's third up-import site is real** and the received arm's "2" was wrong.
3. **D-19 is a genuine re-baselining**, not a transcription: eleven CARRY corrections, three of them the fold seat's own, each with the corrected anchor and the consequence stated (including *"grade unchanged"* where the mechanism survived indirected — D-19-1 — and *"MEASURED-DIVERGENT"* where it did not reproduce — D-19-7).
4. **L-9 is honored twice**: the census `16` and the `1 051` case counts are refused by every gate because no command was recorded for them.
5. **The rulings are made, not dodged.** R-1..R-5 each pick a side, state the loser's fallback, and R-2 even ships a mechanical inversion check against the registry's banking order.
6. **The identity guards are real** — KF-CE-42, KF-KC-45, C-13, KF-AT-26's legs, and the kf-RibbonBar-vs-kf-ChromeDock M-4 collision guard all prevent a re-booking that a careless agglomeration would make.

---

## 8 · TALLY

| metric | value |
|---|---|
| corpus records swept | **58** (+ `KF-W6-CARRY.md` for the reciprocity axis) |
| `W8` hit lines classified | **67** |
| registry rows with terminal disposition → KF.W8 | **32** |
| booked by the spec | **32** |
| escaped | **0** |
| non-registry (census) rows also carried | 3 |
| gates re-executed by this seat | **7 of 15 — all EXACT** |
| defects | **11** (3 HIGH · 3 MEDIUM · 5 LOW) |
| **verdict** | **DEFECTIVE** |

The ID-keyed census clears. The file fails on what sits *around* the census: one live barrel outside a family it claims to enumerate exhaustively, a reciprocity with KF.W6 that does not exist, a KF.W5 handoff received at half and re-split against an explicit lock, and four sibling-declared inbound edges neither booked nor declined.

— end of pass-1 check. Written read-only against the registry and `origin/master 81a56990`; no product source opened for write.
