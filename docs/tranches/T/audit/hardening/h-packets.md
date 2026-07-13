# T hardening · h-packets — the P1-P10+KF packet series vs every lane's producer rows + the freeze/producer state re-verified at CURRENT glass-ui HEAD

**Lane**: `h-packets` (T HARDENING fleet). **Charge**: (1) sweep all ~37 lane artefacts for
`producer`/`packet`/`ask` rows — verify each is either IN a packet (P1-P10+KF) or explicitly
demo-routed; (2) re-verify the freeze windows + producer state against the CURRENT `../glass-ui`
HEAD (it moves daily). **Product under audit**: `letters/GLASSUI-T-ASKS.md` (P1-P10+KF), the
`audit/lanes/t-request-packets.md` SHAPE census (Series A-J), `audit/SYNTHESIS.md §4`, and every
lane's producer/packet/ask rows. **ZERO corpus edits** — this file is the only write; the amend pass
folds. **Discipline**: adversarial — a clean bill on packet CONTENTS requires evidence, not silence.

**Stamps re-verified this lane**:
- value.js `tranche-t` @ `fb330bb` (HEAD of the hardening fleet).
- Producer `../glass-ui` **CURRENT HEAD = `bdc4211c`** (`tranche/BG`, "BG.W-HANDMARK-PERFECT",
  2026-07-09 18:52). The corpus's authoring stamps: census `file:line` at **`19ddbd71`**
  (2026-07-06 22:24); corpus-completion observation at **`6605e1dd`** (2026-07-09). glass-ui moved
  exactly **ONE** commit past `6605e1dd` → `bdc4211c` (handmark/pencil-boil) — **no T packet is
  answered by that single commit.** The material staleness is NOT in the last commit; it is that
  several producer events already landed BEFORE the census/obs stamps and the corpus did not fold
  them (see H-PKT-1, H-PKT-2).

**Bottom line**: the packet CONTENTS are largely sound — every producer-root cite I re-checked at
HEAD is still LIVE (§Positive-confirmation ledger). The defects are (a) one load-bearing
**freeze-window premise that is factually FALSE at HEAD** (H-PKT-1, MUSTFIX), (b) a **producer
paint-state + hard consumer-blocker asserted PENDING that closed DONE two days before the letter's
own obs stamp** (H-PKT-2), and (c) three **routing/traceability seams** where a producer rider is
dropped or the completeness claim is falsified (H-PKT-3/4/5).

Severity tally: **MUSTFIX 1 · SHOULDFIX 3 · NOTE 3.**

---

## H-PKT-1 · MUSTFIX — "WS12 has NOT landed" is FALSE at HEAD; the freeze-window premise is stale in 3 corpus docs

**Corpus location**: the claim "WS12 has NOT landed → W-1/W-2 STILL OPEN" appears verbatim in
- `t-request-packets.md` §0 RP-CENSUS-5 (line 68: "WS12 has not landed — the windows are still OPEN")
  and §2 (line 402: "WS12 has NOT landed → W-1 and W-2 are STILL OPEN");
- `letters/GLASSUI-T-ASKS.md` **Status** block (lines 15-16: "WS12 has NOT landed, so the W-1/W-2
  freeze windows are OPEN") + the timing-windows table W-1 row (line 41);
- `SYNTHESIS.md §4` timing-windows paragraph ("WS12 has NOT landed — W-1/W-2 are OPEN but LAST").

**Evidence (glass-ui HEAD `bdc4211c`)**:
- The WS12 capstone workstream is **PARTIALLY LANDED**: `ee382861 BG WS12 (BG.W-CSS-MINIFY): minify
  dist/styles` and `a900a71f BG WS12 (BG.W-GATE-FAMILY-CONSOLIDATE)` are **ancestors of HEAD on
  `tranche/BG`**, both dated **2026-07-05** — i.e. they landed ONE day BEFORE the census stamp
  `19ddbd71` (07-06) and FOUR days before the corpus-obs stamp `6605e1dd` (07-09).
  `git merge-base --is-ancestor ee382861 HEAD` → true; `git branch --contains ee382861` → `* tranche/BG`.
- The blanket "WS12 has NOT landed" is therefore **false** at every stamp the corpus cites.

**Why the CONCLUSION nonetheless survives (so this is a premise-fix, not a re-routing)**: the W-1
freeze is specifically the **`BH.B2.1-swap` export-regen** (the Blob rename), and THAT is genuinely
still open — verified independently: `package.json` at HEAD still exports `./goo-blob` (lines 545-547),
there is **no `./blob`** and **no `/blob/config`** subpath. So W-1/W-2 are indeed still open for the
J1/J2 payload — but via the export-map evidence, NOT via "WS12 hasn't landed."

**Second-order blast radius**: because `BG.W-CSS-MINIFY` already ran, **P2/PKT-1** and **P8/A6** are
now claims about a POST-minify dist, not a pending one. I re-verified: PKT-1 survives the minify
(`dist/styles/components.css:1` `:root` STILL emits `--default-transition-duration:150ms` +
`--default-transition-timing-function` — packet valid). A6's Slider `-webkit-backdrop-filter:none`
was NOT locatable in the minified `components.css` (0 hits) — its scoped-component CSS lands
elsewhere in the dist and must be re-verified on a fresh rebuild at dispatch, per the G-CUR-1
dist-rebuild discipline the corpus already carries.

**Proposed amendment**: in all three docs, replace "WS12 has NOT landed" with the precise state:
*"the WS12 `BH.B2.1-swap` export-regen has not run — `goo-blob` is still in the export map at HEAD
`bdc4211c`, so W-1/W-2 remain OPEN for the J1/J2 rename+config payload; NOTE that the WS12
`CSS-MINIFY` + `GATE-FAMILY-CONSOLIDATE` waves DID land (`ee382861`/`a900a71f`, 2026-07-05, ancestors
of HEAD), so P2/PKT-1 and P8/A6 are claims about a post-minify dist and must be re-verified on a fresh
`../glass-ui` build at dispatch."* This is exactly the re-stamp the dispatch protocol (GLASSUI-T-ASKS
step 2) demands but which the corpus's own text pre-empts with a false premise.

---

## H-PKT-2 · SHOULDFIX — P3/H1 assert A1/A2 dark-readability paint "PENDING" + a hard consumer blocker, but it closed DONE two days before the letter's own obs stamp

**Corpus location**:
- `t-request-packets.md` §H1 `T-PKT-H1` (lines 327-338): "`BG.W-DARK-READABILITY-REPAIR` dual-engine
  paint is **FAIL→PENDING** … **This binds T-3/T-11/T-13/T-18/T-24** — value.js cannot treat the dark
  card floor as paint-correct until BG closes the PENDING."
- `letters/GLASSUI-T-ASKS.md` P3 (line 54): "A1/A2 F2.R1 **paint-close** … source-landed, dual-engine
  **PENDING**." Same in `SYNTHESIS.md §4` P3 and `t-glassui-forward.md §F-6`.

**Evidence (glass-ui HEAD)**:
- `300a30fb BG paint (BG.W-DARK-READABILITY-REPAIR): dual-engine PASS Chrome+Safari both modes ->
  **DONE**`, dated **2026-07-07 07:58** — an ancestor of BOTH the letter's obs stamp `6605e1dd`
  (07-09) and HEAD. So at the corpus's OWN stated observation point the wave was already DONE two
  days prior.
- The A1/A2 register arm is IN that DONE wave: `3ea6b051 BG F2 (BG.W-DARK-READABILITY-REPAIR): …
  **card field-floor dark arm (TOKENIZED + damped warm-DARK sink) + on-glass muted floor**` (07-06
  11:07) — `git merge-base --is-ancestor 3ea6b051 300a30fb` → true. This is precisely A1 (the
  orphan field-floor dark arm) + A2 (the muted-ink alpha rung floor).

**Impact**: the corpus asserts a live consumer HALT ("value.js cannot treat the dark card floor as
paint-correct until BG closes the PENDING") that binds FIVE T findings (T-3/T-11/T-13/T-18/T-24). At
HEAD that halt is **lifted** — the floor is dual-engine paint-closed. The demo tier-ladder work those
five findings gate is unblocked earlier than the corpus believes.

**Proposed amendment**: reclass the P3 A1/A2 row from "**paint-close (NEW), dual-engine PENDING"** to
**"VERIFY-AT-CUT — paint-closed at `300a30fb` 2026-07-07 (BG.W-DARK-READABILITY-REPAIR DONE); the
A1/A2 register arm `3ea6b051` is within the passing wave; re-confirm scope covers the field-floor
dark arm + muted-ink alpha rung at the 5.0.0 rebuild."** Strike the T-3/T-11/T-13/T-18/T-24 HALT
language in H1 (the blocker is discharged). The dispatch protocol's step-2 "re-verify P3's F2.R1
paint state against the CURRENT tree" is the safety net, but the corpus's stated-current PENDING is
already false and should not ship in the letter.

---

## H-PKT-3 · SHOULDFIX — t-request-packets §3 says "T-16/T-21/T-4: no producer primitive implicated," contradicting t-misc-elements' TWO E-2 producer riders (dropped from every packet)

**Corpus location**: `t-request-packets.md §3` demo-only register, line 431:
> `| T-16 / T-21 / T-4 | corner element / bugged surface / dynamic bottom text | demo-surface
> identifications — **no producer primitive implicated (per their lanes)** | demo |`

**Evidence (the lane it cites contradicts it)**: `t-misc-elements.md` — the lane that OWNS T-16 and
T-4 — raises TWO explicit E-2 producer riders:
- Finding 2 (T-16), line 58: *"**E-2 packet rider (producer question, not a demo fork)**: whether the
  house wants a **hue-carrying primary tier** — the 'prominence = tint, not size' rule glass-ui's own
  comment cites — is glass-ui's call; the demo must not costume the button locally (E-3)."*
- Finding 3 (T-9) Cross-lane, line 88: *"E-2 (the lamp is **candidate dock vocabulary** — if glass-ui
  grows a **dock status primitive**, consume it at the root)."*

Neither rider is carried in ANY packet (`grep -niE 'hue-carrying|primary tier|dock status
primitive'` over the letter + SYNTHESIS + census = empty; the one "dock status lamp" hit is
`SYNTHESIS §4` W6-6, which is the DEMO implementation, not a producer ask) and neither is in the
**Q16-candidates** note (line 92 = only `EmptyState` + picker action controls). So the census's
blanket "no producer primitive implicated (per their lanes)" is **factually wrong about its own cited
lane**, and two E-2 producer questions are silently dropped.

**Proposed amendment**: correct the §3 row — T-16 and T-9 DO carry E-2 producer riders per
`t-misc-elements` F2/F3. Route both to the **Q16-candidates note** (they are exactly its shape:
"flagged, producer's call — not resolved here"): add "the hue-carrying primary tier (T-16) + the dock
status-lamp primitive (T-9)" beside `EmptyState`. Keep the demo halves (placement/containment, the
banner re-home) demo-routed as they are.

---

## H-PKT-4 · SHOULDFIX — deferred-census A10 claims "the fold set is complete," but L15 + the EasingPicker SelectTrigger a11y (relay item-8) have no packet home, demo-route, or verify-at-cut row

**Corpus location**: `t-deferred-census.md` line 96, row A10:
> "**GLASSUI-S-ASKS L2·L3·L5·L6·L7·L8·L9·L10·L11·L12·L13·L14·**L15**·L16** + the R-relay
> **EasingPicker SelectTrigger a11y (relay item 8)** … **FOLD → T-PACKETS** … this census confirms
> **the fold set is complete**."

**Evidence — trace each member to a packet**:
- L2→P1 ✓ · L3→verify-at-cut ✓ · L5→P6 ✓ · L6/L7/L8/L10/L11/L13/L14/L16→P7 ✓ · L9→P2 (PKT-4) ✓ ·
  L12→P9 (J3) ✓.
- **L15** → NO packet. `t-glassui-current §2` line 103: "L15 | OPEN/DORMANT | Gold/admin shimmer
  primitive still booked on the ≥2-consumer bar — no producer primitive minted (correct restraint)."
  `grep 'L15'` over the letter + SYNTHESIS + t-request-packets = **0 hits**. It is neither in P7's
  batch, nor demo-routed, nor a verify-at-cut row — yet A10 folds it and calls the set complete.
- **EasingPicker SelectTrigger a11y (item-8)** → NOT named in P7's "EasingPicker v2" row (which lists
  stage-law, material tokens/`chrome`, `preset?`, autoplay door, curve-glyph menu, travel-dot/PRM —
  not the internal SelectTrigger a11y). `967cd25e` folded item-8 to `W-DESHADCN` (same fold as
  L6-L16), so by Series-G logic ("W-DESHADCN did not deliver") it should be a P7 re-ask by name — but
  it is not explicitly carried.

**Impact**: two members of an "explicitly complete" fold set have no landing — the exact
partial-completion seam the owner flagged. L15 is low-product-impact (dormant-by-restraint), but the
completeness CLAIM is falsified; the a11y item is a real accessibility ask.

**Proposed amendment**: either (a) add both to P7 — L15 as a **HELD-below-bar / verify-at-cut** row
("gold/admin shimmer; no primitive until ≥2 consumers; re-check at cut"), and the EasingPicker
SelectTrigger a11y as an explicit named re-ask under EasingPicker v2 — or (b) narrow A10's claim to
"complete EXCEPT L15 (held below the 2-consumer bar) and item-8 a11y (subsumed by P7 EasingPicker
v2)." Do not leave the bare "fold set is complete" while two members are unhomed.

---

## H-PKT-5 · NOTE — CC-1 is carried in the letter (P8) + SYNTHESIS §4 but has NO row in the t-request-packets SHAPE census, which the letter names as its routing authority

**Corpus location**: `GLASSUI-T-ASKS.md` P8 (line 59) carries "**CC-1** the registered-@property-
inside-`color-mix()` collapse on bare `.glass-wash`"; also in `SYNTHESIS.md §4` P8. The letter's
provenance (line 7-8) names "`audit/lanes/t-request-packets.md` (SHAPE + producer-root/joint/
demo-only)" as the routing census. But `grep -c 'CC-1' t-request-packets.md` = **0** — the SHAPE
census's Series H (build/dist) carries only H1 (A1/A2) and H2 (A6), no CC-1.

**Evidence it belongs**: `t-card-color-census.md` F6/F7 + the CC-1 block (line 143, "A live rendering
defect: bare `.glass-wash` paints ZERO fill (both schemes)") explicitly says (line 170) "Hand to
E-2's request-packet lane." The prior hardening lane `h-synthesis-corpus-diff` verified CC-1 is
present in SYNTHESIS/letter (its line 173), but did NOT check the SHAPE census — so this is a distinct
axis, not a duplicate.

**Impact**: LOW — CC-1 is NOT dropped (it lands in P8). The gap is that the routing census (the
document that is supposed to enumerate every producer-root item + its routing) is incomplete relative
to the dispatched letter, so the census can't be relied on as the complete traceability index.

**Proposed amendment**: add a CC-1 row to `t-request-packets §1 Series H` (producer-root, build/dist,
W-3, evidence `t-card-color-census CC-1`) so the SHAPE census and the letter agree.

---

## H-PKT-6 · NOTE — P5's cite `38d83e4` is a value.js commit, not a glass-ui producer file:line; the HEAD-stamp re-verify will fail to resolve it in the producer tree

**Corpus location**: `GLASSUI-T-ASKS.md` P5 (line 56) + `SYNTHESIS.md §4` P5: "an ACTIVE SEAT that
yields to consumer indicator content — the exact seam SegmentedTabs lacked, **cite `38d83e4`**."

**Evidence**: `38d83e4` is a **value.js** commit ("docs(S.W4 · W4-5 verify record): SegmentedTabs'
native indicator cannot yield to the WatercolorDot ring … S-3 letter-rail book FIRES", 2026-07-05).
`git -C ../glass-ui show 38d83e4` → not found. The cite is a legitimate value.js-side PROVENANCE
reference (the demo evidence that fired the ask), NOT a producer-tree file:line — so it is correct in
substance. The hazard is only that the dispatch protocol's HEAD-stamp corollary ("re-verify every
load-bearing `file:line` against the CURRENT [producer] tree") reads P5's cites as producer cites; a
dispatcher will fail to resolve `38d83e4` in glass-ui and may mis-flag it stale.

**Proposed amendment**: annotate the P5 cite as "(value.js `38d83e4`, provenance — not a producer
file:line)" so the re-stamp pass does not chase it in the glass-ui tree.

---

## Positive-confirmation ledger — the packet CONTENTS re-verified LIVE at glass-ui HEAD `bdc4211c` (all still valid; NO packet already answered)

Every producer-root cite I re-checked against the CURRENT tree is still LIVE — the packets are
accurate; the defects above are framing/routing staleness, not phantom asks.

- **P1 GAP-ARM** (`useAurora.ts:228/262`): the config deep-watch `watch(getCfg, (next) =>
  inst?.update(next), { deep: true })` is at line 228; NO immediate replay (the `immediate: true` at
  line 343 is the scroll-progress watch, not the config replay). Arm-gap defect UNFIXED. The A7 relay
  (`9b891736`) recorded the defect in glass-ui coordination docs but no code fix landed. **Valid.**
- **P2/PKT-1 [P0]**: `dist/styles/components.css:1` `:root` STILL emits `--default-transition-duration:
  150ms` + `--default-transition-timing-function` at HEAD (survives the CSS-MINIFY wave). **Valid.**
- **P3 WELL rung** (`--glass-bg-well`/`.glass-well`): still absent in `src/`. **Valid.** (A1/A2 sub-row
  is the H-PKT-2 exception.)
- **P6 metaball drain**: `src/components/custom/goo-blob/shaders/metaball.wgsl.ts` STILL present (the
  WGPU twin, as a `.wgsl.ts` — my first `*.wgsl` glob missed it; it is there). Single-engine collapse
  ask **valid.**
- **P7 L8 clampLabel**: `DockSelectTrigger.vue` forwards `SelectTriggerProps & { class }` only — no
  `clampLabel`, no truncation. **Valid (5th booking stands).** P7 L11 dropdown-menu glass tokens +
  P2 L9 skeleton-shimmer tokens: still absent/unread. **Valid.**
- **P8 A6**: `Slider.vue:421-422` still declares both `backdrop-filter:none` + `-webkit-…:none` legs
  in source. **Valid** (the dist-collapse claim needs the fresh-rebuild re-verify per H-PKT-1).
- **P9 J1/J2**: `package.json` still exports `./goo-blob` (no `./blob`); no `/blob/config` subpath.
  `./styles/fonts` (J3/L12) + `./easing` (GAP-3 watch) subpaths PRESENT. **J1/J2 valid; J3 verify
  satisfied.**
- **glass-ui version label** still `"4.2.0"` at HEAD — confirms the census's DIST-rebuild discipline
  note (the label is frozen by the file:-pin, does not track `tranche/BG` content).

*Method note*: I swept all ~37 lane artefacts for producer/packet/ask rows; the cited-sibling lanes
(t-glassui-current/-forward, aurora/blob/transitions/card-material/search-tabs/sliders/header/
mobile/easing/title-typography/nav-dropdowns/shadow-palette/legacy-sweep/a11y-contrast) all fold
cleanly into P1-P10+KF or explicit demo-routes. The only orphans/contradictions are H-PKT-3
(t-misc-elements riders), H-PKT-4 (L15 + item-8), and H-PKT-5 (CC-1 census gap). Producer state was
re-verified at HEAD `bdc4211c`; the only producer EVENTS the corpus missed are the WS12 CSS-MINIFY/
GATE-FAMILY-CONSOLIDATE landings (H-PKT-1) and the DARK-READABILITY-REPAIR DONE flip (H-PKT-2).

## VERDICT DISPOSITION (recorded at the amend pass — VERDICT §5-D6)

H-PKT-2's strike-the-HALT is accepted **with the lane's own caution intact**: the P3 A1/A2 row is
reclassed VERIFY-AT-CUT (paint-closed at `300a30fb`) and the DONE flip is re-verified on a fresh
dist at dispatch — never trusted. H-PKT-1 folded as MUSTFIX (M-33); H-PKT-3/H-PKT-4 folded.
