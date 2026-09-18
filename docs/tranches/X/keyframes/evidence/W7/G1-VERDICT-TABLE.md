SERVED MODEL: claude-opus-5[1m]

# KF.W7 · G1 — THE §VERDICT TABLE

**Unit**: X.KF.W7.a (phase 1, the S-9 evaluate seat — serial, alone; its verdict sizes the wave).
**Date**: 2026-09-18. **Ref of record**: keyframes.js `origin/master` **`ae83da07`**
(`evidence/W7/G12-REF-PIN.md`). **Producer substrate**: `@mkbabb/glass-ui` **7.0.0** (measured;
KF.W0 §B-12 pins it exact as a devDependency and installed).

**Gate**: G1 — *"The evaluate verdict exists, per-surface, against the real export surface."*
**Precedence lock (§Sequencing item 4)**: this table **precedes every verdict-gated row** in KF.W7,
and precedes KF.W11 arm (d)'s shape rows and KF.W13's two packets (*"resolve KF.W7 first"*).

**E-3**: the spec, the adjudicated registry and the conformance artifacts are IMMUTABLE. This is a
dated ruling beside them.

---

## §0 · The three locks this table was written under, discharged before the first row

### §0.1 · C-15 is the INPUT and is NEVER re-derived (killed-claim #15)

**C-15's SPLIT VERDICT is consumed exactly as banked and is not re-opened**: *playhead 0..1 =
mechanical-swap candidate; N-marker zoom/pan rail = NO counterpart.* Three axes independently
re-derived that settled adjudication as a novelty; this seat does not make a fourth. **Everything
measured in §1 below is the IMPORTABLE-SURFACE reading G1's own assertion demands (*"against the
IMPORTABLE surface only"*), and it CORROBORATES C-15 without re-deriving it** — where a measurement
and C-15 meet, C-15 governs and the measurement is cited as agreeing.

### §0.2 · PR-CAUTION — the counter-evidence lock, WEIGHED BEFORE ANY VERDICT

Quoted verbatim from the spec header, which itself quotes the registry bytes ⟨`kf-PlaybackRibbon.md`
§*Adjudicated defect roster* → its **Routing law** paragraph, the clause riding the KF-AV-28 standing
rider⟩:

> note the C axis's own §7 caution rides with it — this ribbon is the NON-bespoke case (it consumes
> the real `Slider`) and carries BLOCKERs anyway, so "swap onto the primitive" is never sufficient as
> a cure.

⟨Subject resolution, stated OUTSIDE the quotation so no substitution enters it: *"this ribbon"* =
`PlaybackRibbon.vue`.⟩

**How it was weighed, and in which direction.** PR-CAUTION is *counter*-evidence: it argues against
treating a swap as a cure. **This table issues NO SWAP verdict**, so the lock is weighed and
**concordant with every row** — it did not have to overturn one. It is recorded here in full anyway,
because the discipline the lock exists to enforce is that it is weighed *before* the verdict, not
invoked after one: had any row below tended toward ADOPT, PR-CAUTION's live counterexample (the one
surface in this corpus that already consumes the real primitive, and carries BLOCKERs regardless)
would have had to be answered at that row, by name.

### §0.3 · The verdict is taken against the IMPORTABLE surface ONLY

Not against what glass *ships*, not against what its `.d.ts` files *describe*, and not against what
a future version might export. Against what a keyframes.js demo file could write an `import` for,
today, at 7.0.0. §1 establishes that surface by command before any row is ruled.

---

## §1 · THE IMPORTABLE SURFACE, ESTABLISHED BY COMMAND

All commands run at this seat's clock against the installed
`node_modules/@mkbabb/glass-ui` (7.0.0) and **DOUBLE-RUN** (⟨cmd⟩ `diff run1 run2` → no output).

| # | measurement | value |
|---|---|---|
| T1 | `wc -l dist/components/timeline/index.d.ts` | **2** |
| T2 | `ls dist/components/timeline/` | **9** files |
| T3 | `grep -c '^export' dist/timeline.js` — the **RUNTIME** export count of the subpath | **1** |
| T4 | that one export, verbatim | `export { me as GlassTimeline };` |
| T5 | `Object.keys(pkg.exports).length` | **73** subpaths |
| T6 | subpaths matching `/timeline/i` | **`./timeline`** — exactly one |
| T7 | wildcard subpaths | **`./fonts/*`** — the ONLY wildcard in the package |
| T8 | `SliderVariant` | `export type SliderVariant = "standard" \| "spectrum";` — **no "timeline" member** |
| T9 | demo imports of `glass-ui/timeline` at `ae83da07` | **0** |
| T10 | `GlassTimeline` references anywhere in the kf tree at `ae83da07` | **0** |
| T11 | `geometry.d.ts` hits for `percent\|zoom\|pan(` | **1** — and it is **prose**, the `fillFor` docblock's *"Fill percentage per state"*; **zero** exported percent↔position map, **zero** zoom, **zero** pan |
| T12 | installed glass-ui version | **7.0.0** |

**THE FINDING, stated once and consumed by all six rows.** The `/timeline` family ships **nine**
files and **exports one component**. `ScrubberTimeline` · `SegmentedTimeline` · `ContinuousTimeline`
· `ContinuousRail` · `ContinuousMarkers` · `geometry` are **not re-exported (T1/T3/T4) and not
deep-importable (T5/T6/T7: one timeline subpath, one wildcard and it is `./fonts/*`)**. They are
reachable **only indirectly**, as internal delegates of the dispatcher.

**The importable surface, enumerated in full** ⟨`GlassTimeline.vue.d.ts`, read whole⟩:

- **props** — `variant?: "scrubber" | "segmented" | "continuous"` (default `scrubber`) ·
  `modelValue?: number` (0..1) · `label?: string` (tooltip caret **text**) ·
  `segments?: TimelineSegment[]` · `ariaLabel?: string` · `currentSegmentKey?: string` ·
  `disablePopover?: boolean`
- **emits** — `update:modelValue(v: number)` · `click({key, segment})` · `hover({key, segment})` ·
  `hoverEnd({key, segment})` · `scrubStart()` · `scrubEnd()`
- **slots** — `popoverContent({segment})` · `detail({segment, source, currentKey, hoveredKey})`
- **types** — `TimelineSegment` · `TimelineSegmentGradient` · `TimelineSegmentState`

**What that surface can express**: ONE normalized 0..1 position, or N *weighted, non-interactive*
segments. **What it cannot express, at any variant**: a second draggable object on the rail; N
independently selectable, independently draggable markers; a viewport (zoom/pan) of any kind; a
percent↔position map a caller can share with its own geometry; per-marker keyboard routing; a
per-marker thumbnail. **None of these is a taste judgement — each is the absence of a prop, an emit,
a slot or an exported function in the enumeration above.**

---

## §2 · THE §VERDICT TABLE — six surfaces, each ADOPT · PARTIAL · KEEP-BESPOKE

| # | surface | L at `ae83da07` | **VERDICT** | named reason, against the importable surface only |
|---|---|---|---|---|
| 1 | **KeyframeTimeline / TimelineTrack rail** | 312 / 246 | **KEEP-BESPOKE** | §2.1 |
| 2 | **TimelineCaret** | 70 | **KEEP-BESPOKE** | §2.2 |
| 3 | **TimelineHoverPreview** | **44** ⟨spec says 38; the OPEN seat's D-19 re-measure reads 44, **+6** — the drift is named, the verdict is unmoved⟩ | **KEEP-BESPOKE** | §2.3 |
| 4 | **SequenceScrubber** (S-3/S-4) | 162 | **KEEP-BESPOKE** | §2.4 |
| 5 | **AnimationVisualizer** | 256 | **KEEP-BESPOKE** | §2.5 |
| 6 | **SpringTarget / SpringTrace idiom arms** | — | **KEEP-BESPOKE** (and the house idiom ADOPTED — §2.6) | §2.6 |

**Six of six KEEP-BESPOKE. ZERO SWAP verdicts. The answer to the goal criterion's first half is
therefore: YES — the timeline instrument is ours to keep.** This is not a refusal to evaluate; it is
what §1's enumeration forces, and the one adoption candidate C-15 identifies is weighed and declined
at §2.1 with its mechanism named rather than passed over.

### §2.1 · KeyframeTimeline / TimelineTrack rail — **KEEP-BESPOKE**

**Evaluation input (not re-derived)**: C-15's split verdict. **Reason:**

1. **The N-marker zoom/pan rail has no counterpart, and the absence is structural, not cosmetic.**
   The importable surface carries one `modelValue` and a `segments` array whose members are
   *weighted, non-draggable* descriptors. `useZoomPan.ts` (110 L) has no analogue at any variant:
   T11 finds **zero** zoom and **zero** pan in the only shared-geometry module, and that module is
   not importable in any case (T3/T5-T7). This is C-15's own arm, corroborated.
2. **The playhead-only swap — C-15's declared mechanical-swap candidate — is DECLINED, and here is
   the mechanism.** Adopting `<GlassTimeline>` for the 0..1 playhead inside a rail that keeps its own
   markers installs a **SECOND geometry authority in one box**: the playhead would project through
   glass's internal geometry while the markers project through `TimelineTrack`'s, and the two must
   agree under zoom/pan — which glass does not have and cannot be told about, because the surface
   exposes **no percent↔position map** (T11) for a caller to share. Two authorities over one
   coordinate space is **N-10's convicted class**, imported deliberately. **A PARTIAL verdict here
   would not be a smaller adoption; it would be an incoherent one.**
3. **PR-CAUTION, applied to this row specifically**: even a successful playhead swap would leave the
   marker drag, the grab offset, the rebuild economics and the wheel policy exactly where they are —
   the gates this wave actually has to turn (G2 · G3 · G4 · G13). *"Swap onto the primitive is never
   sufficient as a cure"* is not an abstraction here; it names what this adoption would have bought.

**Consequence**: every KeyframeTimeline/TimelineTrack behavioural row banked under this surface
**PERSISTS**. `.b`'s seam design and `.d`'s implementation are **LIVE and UNGATED by any swap**.

### §2.2 · TimelineCaret — **KEEP-BESPOKE**

**Scope discipline first**: the **NumberField question is KF.W6's** (C-4/D·M-9) and **is not ruled
here**. This wave rules only the contract exception (**C-10**) and the posture (**L-15**).

**Reason**: the importable surface has **no caret of any kind**. `GlassTimeline`'s `label` prop is
*"Tooltip caret text"* — a **string to display**, not an editable numeric field. There is nothing to
adopt, partially or otherwise, at this surface.

**The two rows this wave rules on it:**

- **C-10 — RULED, and it PERSISTS as a cure.** Verified at the bytes: `TimelineCaret.vue:43`
  `(e: "update:percent", value: number): void;` and `:62` `emit("update:percent", clamp(Math.round(val), 0, 100));`.
  **Ruling: the emit is renamed OFF the `update:*` protocol.** The name is `v-model`-shaped, is never
  consumed as one, and a consumer who took it at its word and wrote `v-model:percent` would **bypass
  the ops layer** — skipping the selector re-derivation and `rebuild()`. `defineModel` here would be
  actively wrong. The cure is the rename, at the caret and at its single consumption site; **owner:
  `.d`** (TimelineCaret.vue is `.d`'s file). It does not discharge and it does not wait.
- **L-15 — PERSISTS, ROUTED, not ruled here.** The silent swallow on unparseable input diverges from
  the cluster's toasting posture, and the bank itself flags it ruling-dependent (*"a garbage keystroke
  is arguably a cancel"*). **It is G14's subject — `.c`'s ONE posture ruling for cluster + dialogs,
  resolved against KF.W2's `POSTURES.md`** — and this table neither pre-empts nor discharges it.
  ⟨Not to be confused with `L-15-PROTECTED`, a SPEC-LOCAL LABEL for the `K-8 · L-15` do-not-delete
  lock at `kf-KeyframeTimeline.md`; two different things one character apart, both live, named apart
  here on purpose.⟩

### §2.3 · TimelineHoverPreview — **KEEP-BESPOKE**

**Reason**: the nearest importable affordance is the `popoverContent` slot, whose scope is
`{ segment: TimelineSegment }` — a *weighted phase descriptor*. THP's subject is a **per-keyframe
rendered thumbnail with a ghost fallback and a cache**; a `TimelineSegment` cannot carry it and the
slot is reachable only by first adopting the dispatcher, which §2.1 declines on independent grounds.
**The §Verdict input says it outright and this measurement agrees: the ghost redesign is bespoke
regardless of verdict.**

**Consequence**: the whole THP row set **PERSISTS** — `.c`'s ghost/cache and a11y-description designs
and `.e`'s implementation (G9 · G10) are **LIVE**. The **tooltip PRODUCER seams** (reka
`TooltipContentImpl`'s `ariaLabel` fallback; `--reka-tooltip-content-available-height`
non-consumption) go to **`.f`'s BH relay (SS-6)** — **never a demo-side patch of a producer seam, and
never a copied producer selector**.

### §2.4 · SequenceScrubber (S-3/S-4) — **KEEP-BESPOKE**

**Evaluation input**: KF-AV-28 — *both axes and both readers converge on EVALUATE, NOT SWAP.*
**Reason, four limbs, each measured:**

1. **The gesture is coupled to a scene-wide engine write with an explicit single-writer invariant.**
   The component's own docblock, at the bytes: *"`Sequence.scrub` drives each child's `--ball-p` 0→1,
   and the per-lane glow in SequenceTarget scales its box-shadow bloom with `--ball-p` (no new rAF,
   no second writer — inv ζ)."* `<GlassTimeline variant="scrubber">` emits only
   `update:modelValue` / `scrubStart` / `scrubEnd`, and its head rides **its own** `useSpring` +
   `useLiquidFlex` + `useLiquidPress` composition. Adopting it puts a producer-owned spring clock
   **between the pointer and `Sequence.scrub`** — a second writer, which inv ζ forbids and which is
   N-10's class again.
2. **This surface is the house idiom's CORRECT consumer, not a deviant.** Measured: `:31`
   `class="progress-rail"` and `:32-35` `class="progress-ball scrub-ball"` with
   `translateX(calc(<p>*100cqw))` — the promoted `.progress-rail`/`.progress-ball` idiom, used as
   promoted. KF-AV-10's whole complaint is that *AnimationVisualizer* hand-rolls this idiom for the
   seventh time; swapping the compliant consumer to a producer component would retire the idiom at
   the one place it is honoured.
3. **The adoption buys nothing on the a11y axis, because the contract is already met.** Measured
   `:22-29`: `role="slider"` · `aria-label="Scrub the sequence master playhead"` ·
   `:aria-valuenow` · `aria-valuemin="0"` · `aria-valuemax="100"` · `tabindex="0"` ·
   `@keydown="onScrubKeydown"`. That is precisely what the primitive's `role=slider` + arrow-key
   a11y would supply.
4. **There is no Slider-primitive fallback either**: `SliderVariant = "standard" | "spectrum"` (T8),
   **no "timeline" member** at 7.0.0 — and **PR-CAUTION** closes the door on that route in any case.

**Consequence, stated by id because the bank made it conditional on exactly this verdict.** The
routing summary says: *"C-4's contract question and the D-5/D-6/D-11 'the primitive already solves
it' arguments discharge or persist with its verdict."* **The verdict is KEEP-BESPOKE, so they
PERSIST:**

| row | state after this verdict |
|---|---|
| **C·C-4 (SequenceScrubber)** — the two-contract divergence + `inject(SEQUENCE_DEMO_KEY)!` erasing the missing-provider signal | **PERSISTS.** What survives is what the bank says survives: **a one-line provider guard + declaring the asymmetry**. The `{progress}`-prop-plus-emits cure stays **DEAD** (K-8; SUP-5 SUSTAINED head-on) and may not re-enter on the back of this verdict. |
| **D-5** *"the primitive already solves it"* | **PERSISTS** — the primitive does not solve it; §1 says why. |
| **D-6** *"the primitive already solves it"* | **PERSISTS**, same ground. |
| **D-11** *"the primitive already solves it"* | **PERSISTS**, same ground. |
| **SequenceScrubber's component-SHAPE rows (S-3/S-4)** | **PERSIST** — `.e`'s verdict-gated SequenceScrubber work is **LIVE**, and fixture 4 (`sequence-scrubber-mount.test.ts`, the direction latch + projection, L·D-12's born-RED mount test) is owed. |

### §2.5 · AnimationVisualizer — **KEEP-BESPOKE**

**Evaluation input**: KF-AV-28's intake row (D-18 ≡ C-13) — the census extension S-9 that found the
**larger** of the two rail/ball shadows. **Reason, three limbs, each measured at `ae83da07`:**

1. **Adoption would collide head-on with a DELIBERATE, documented a11y disposition.** The file's
   first bytes (`:1-7`): the root carries `aria-hidden="true"` under the comment *"this big ball is a
   decorative VISUAL twin of the real reka `<Slider>` in PlaybackRibbon (same scrub value, same
   range). **One AT slider per scrub value** — the `<Slider>` is it; this is sighted-only flair."*
   `<GlassTimeline variant="scrubber">` ships `role="slider"` with keyboard a11y **built in and not
   switchable off through the importable surface** (no such prop in §1's enumeration). Inside the
   `aria-hidden` subtree the imported a11y is dead weight; outside it, it is the **second AT slider
   for one scrub value** that this disposition exists to prevent. **This is the row the §Verdict
   input means by *"`role="slider"` would conflict with the deliberate disposition."***
2. **The component is a LIBRARY DEMONSTRATION, and the swap would make it demonstrate the wrong
   library.** Measured imports: `SmoothProgress`, `SpringProgress`, `RAFPlayback` from
   `@mkbabb/keyframes.js`, driven through `useRafLoop` + `useDragCapture`. The ball is **the animated
   subject**, not a scrub handle. Glass's scrubber head is explicitly *"a warm-glass liquid lozenge"*
   riding glass's `useSpring`/`useLiquidFlex`/`useLiquidPress`. Swapping it replaces a keyframes.js
   demo with a glass-ui demo, inside keyframes.js's own demo.
3. **Three of its four painted elements have no counterpart at all**: the `bg-accent-kf/30` leading
   ghost (`:30-32`), the dashed end marker at
   `translateX(calc(100cqw − 100%))` (`:34-36` — KF-AV-17's **resize-immune form**, a cure-shape LOCK
   this wave carries and does not decide), and the `touch-gate-target` / `touch-gate-active` pair
   already riding glass's own `useTouchGate`. The importable surface paints a rail and one head.

**Consequence**: **AnimationVisualizer's whole NO-WAVE-OWNER roster PERSISTS** (KF-AV-28 *"binds
AnimationVisualizer's whole NO-WAVE-OWNER roster"*). Nothing there is discharged by this verdict, and
the rows whose cures are NO-WAVE-OWNER keep their owners.

**The three evaluate-input riders whose DECISIONS this table owns:**

- **KF-AV-13** ⟨*"→ **NO-WAVE-OWNER** (SS-1/SS-2; decide press-to-seek with the KF.W7 evaluation)."*⟩
  — **DECISION: press-to-seek is NOT adopted on this surface.** It follows from limb 1: a
  press-to-seek affordance on an `aria-hidden` decorative twin is either unreachable by AT (useless)
  or reachable and then a second, unlabelled seek control for a scrub value that already has its AT
  owner in `PlaybackRibbon`'s real `<Slider>`. **The cure is NO-WAVE-OWNER; the code lands with the
  owning packet; the decision is taken here and is not re-opened downstream.**
- **KF-AV-14** ⟨*"→ **NO-WAVE-OWNER** (SS-1/SS-2; cross-ref KF.W7)."*⟩ — **DECISION: it inherits
  KEEP-BESPOKE.** Cure NO-WAVE-OWNER, unchanged.
- **KF-AV-24** ⟨*"→ **KF.W8** (seam consolidation decision), cross-ref KF.W7."*⟩ — **this table
  supplies KF.W8 the input it asked for and takes no decision that is KF.W8's**: the seam is
  consolidated **within the bespoke tree**, because there is no producer component for it to
  consolidate onto. Owner remains **KF.W8**.
- **KF-AV-17 — NO DECISION IS TAKEN OR RECORDED HERE.** It *"folds into KF-AV-1's cure"*, and KF-AV-1
  is **NOT routed to this wave** (*"→ NO-WAVE-OWNER (SS-1/SS-2)"*). What this wave carries is the
  **LOCK's content**, binding on any transform-based playhead this evaluate admits: the resize-immune
  form is `translateX(calc(var(--p) * (100cqw − 100%)))`, the dashed marker's own proven expression;
  `translateX(calc(p*100cqw))` maps progress over the FULL container width and **overshoots the rail
  at p=1** (K-12). It binds C-15's `left`-vs-`transform` arm and it binds `.b`/`.d`. ⟨**K-12's own
  citation re-verified at `ae83da07` by this seat, and it reproduces to the line**: the overshooting
  form is live at `SequenceScrubber.vue:34` — `` :style="{ transform: `translateX(calc(${clamp(demo.progress.value, 0, 1) * 100}cqw))` }" `` — exactly the coordinate K-12 names. The kill entry is
  cited, not re-derived; the anchor is confirmed so `.b`/`.d` spend no time re-finding it.⟩

### §2.6 · SpringTarget / SpringTrace idiom arms — **KEEP-BESPOKE**, and the HOUSE IDIOM IS ADOPTED

Two rows, sequenced with the verdict (§Carry P0). **Against the importable glass surface: there is no
counterpart for a progress rail + ball anywhere in the package** — `/timeline` paints weighted
segments (§1), `SliderVariant` has no "timeline" member (T8). **KEEP-BESPOKE.**

- **C-4 (SpringTarget) — RULED: DELETE THE SENTENCE.** The header's load-bearing rationale claims
  adoption of `MetricBadge`. Measured at 7.0.0, this seat: ⟨cmd⟩ `grep -rl 'MetricBadge' dist/` →
  **0 files**; the `./metric` subpath **does** exist and its barrel exports **exactly four
  components** — `Metric` · `MetricCell` · `MetricRow` · `MetricStack` — plus nine types. **The
  registry's claim verifies exactly at the frontier.** The S-9 `/metric` evaluate is therefore
  **DECLINED**: `Metric` has **no badge affordance**, and the `.status-badge` AA mix is load-bearing.
  **The cure is the prose sweep — delete the false adoption claim, do not adopt `/metric`.** Its
  repo-wide prose arm lands **NO-WAVE-OWNER**; only the `SpringTarget.vue` sentence is in this wave's
  bounds. ⟨Route dissent preserved: the mechanism is a glass-ADOPTION evaluate, KF.W6-adjacent,
  carried here because the record sequences it with KF-AV-10; the record's KF.W7 routing is preserved
  verbatim, nothing silently re-homed. B-1's death — 7.0.0 pinned exact — makes the claim STRONGER,
  not weaker.⟩
- **C-3 (SpringTrace) — the DECISION is taken here in G1's precedent frame; the implementation edge
  is declared.** Measured: `resolveLinearStops` is a module-private `const` at
  `src/animation/compile/easing/registry.ts:74`; `sampleNormalizedSpring` lives under
  `src/animation/physics/spring/solver/sample` and is consumed by two CSS modules
  (`css/linear-stops.ts:1`, `css/timing-function.ts:2`); ⟨cmd⟩
  `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` → **0** — **neither is
  in the published export surface**, which is the banked claim, verified. **DECISION: the export is
  WARRANTED**, on C-15's own precedent — *where a consumer re-derives a producer's internal math by
  hand, the cure belongs at the producer's export surface, not in a seventh re-derivation
  downstream.* Exporting either makes D-1 structurally unwritable downstream and cures reader-B's
  monotonic-clamp divergence with the same act. **Implementation edge: KF.W5 / KF.W8** (§Excluded —
  *"the row is carried; its code is not this wave's"*). **No byte of `src/**` is written by KF.W7.**

**AND THE CONSEQUENCE THAT SIZES `.d`'s ROSTER — KF-AV-10's idiom family is LIVE, NOT SPENT-UNUSED.**

This is stated at length because two texts can be read against each other, and a later seat must not
have to choose.

- **The registry's routing, verbatim** ⟨KF-AV-10, carried at §Carry P0⟩: *"bespoke-survives ⇒ adopt
  the idiom; swap ⇒ moot."*
- **§2.5 rules AnimationVisualizer KEEP-BESPOKE — the bespoke SURVIVES.** The antecedent of the
  registry's first clause is therefore TRUE, and its consequent fires: **adopt the idiom.** The
  flagship rail/ball stops being the idiom's seventh divergent authoring and becomes its consumer.
- **The alternative reading, named so it is declined rather than ignored.** §Bounds' carve rows
  (added at PASS-6 D8) read *"VERDICT-GATED — no byte is spent before G1's KEEP-BESPOKE-or-ADOPT
  ruling, and if G1 rules KEEP-BESPOKE these carves are SPENT-UNUSED and close with the wave."* Read
  with **§Verdict row 6** as its subject — *this* row, whose ADOPT/KEEP-BESPOKE axis is **the house
  idiom**, not glass — the sentence is exactly consistent with the registry: adopt-the-idiom spends
  the carves, keep-each-site's-own-hand-rolling does not. Read instead with **row 5**
  (AnimationVisualizer) as its subject, it inverts the registry's routing. **The consistent reading
  governs** (M-25: adjudicated rows are consumed by mechanism, and the spec itself carries the
  registry's routing verbatim at §Carry P0). **RULED: the carves are LIVE.**
- **Therefore, binding on `.d`, with no discretion left**: `demo/styles/design-idioms.css`
  (`:161-187` only) · `demo/scenes/spring/SpringTarget.vue` (`:113` + the `.spring-ball`/`.preset-ball`
  anchor sites) · `demo/scenes/spring/SpringPhysicsFacet.vue` (the `.sampler-ball`/`.derby-lane-ball`
  sites) · `demo/scenes/sequence/SequenceTarget.vue` (`:80` only) · and the KF-AV-10 retint in
  `AnimationVisualizer.vue` are **SPENDABLE**. **OP-3 binds first** — D-19 geometry re-derivation
  (padding-box) precedes every geometry cure; a cure computed off the border box is a cure to the
  wrong number.
- **The cure caution binds the spend, quoted at its true source** ⟨`sed -n '109p' kf-EasingTarget.md`,
  P-2⟩: *"**P-2 · the `.progress-ball` idiom leaves `transform` unclaimed BY DESIGN** —
  `margin-top` centring on the ball, `translateY(-50%)` on the rail that nothing paints; the asymmetry
  is the proof of intent, and one tidy-up would drop 28 balls out of their rails."* **A consolidation
  that claims `transform` in the idiom is forbidden by this ruling**, and AnimationVisualizer's ball
  already writes `transform` itself (`will-change-transform`, the drag projection) — which is exactly
  the collision P-2 predicts. The adoption takes the rail geometry and the tint tokens; it does **not**
  take `transform`.
- **MISSED-3's same-commit box law** binds any type-rung move inside that family, unchanged.

---

## §3 · SWAP DISCHARGES — the receipt set, and it is EMPTY

**RULING: NO surface is ruled SWAP. NO row is discharged by this wave's verdict.**

The discharge-receipt form the spec adopts (RULINGS-3 **R3-10.3**) is
`` DISCHARGED by KF.W7 SWAP verdict <surface>, <date> `` in KF.W10's G-2 terminal alphabet,
**verbatim or not at all**. **This unit emits ZERO such receipts**, because it issues zero SWAP
verdicts, and **the rule's own far-end consequence is therefore stated plainly rather than left to be
inferred:**

> **KF.W10 CARRIES EVERY ROW.** Not one bespoke behavioural row banked under any of the six surfaces
> is discharged with its component. R3-10.3 is satisfied by construction — the set of rows lacking
> the exact string is the set of rows KF.W10 must carry, and here that is all of them.

**This is written as the wave's positive finding, not as an omission.** The failure R3-10.3 exists to
prevent is a **silent** discharge — a row this wave believes it retired and W10 never hears about.
The inverse error is just as expensive: a downstream wave assuming a swap happened. **It did not.**
KF.W11 arm (d) and KF.W13's two packets (*"resolve KF.W7 first"*) may read this section as their
answer: the shape rows stand, the bespoke components stand, and the drag-seam packets are unmooted.

---

## §4 · THE TWO ARMED TRIGGERS, STATED

Both are §Verdict Protocol's own, restated here as the table's live output. **Neither predicate is
decided by this unit** — the scrub-seam LIVE-or-DISPLAY-ONLY ruling is `.b`'s (G2), on this verdict.

- **D-1/C-1 DISSENT TRIGGER — ARMED.** *"If the verdict rules scene-scrubbing the instrument's core
  promise, the whole scrub seam inherits BLOCKER weight as one cluster."* **This table's bearing on
  the predicate**: the instrument is KEPT whole, so if `.b` rules the seam **LIVE**, the trigger
  FIRES and {C-1, C-6, L-3, L-5, M-3/C-4} inherit BLOCKER weight **as one cluster** — which is N-10's
  law restated: **one design problem, one commit family**. A row cured in isolation is defective on
  that ground.
- **M-3/C-4 INVERSE TRIGGER — ARMED.** *"If the verdict permanently rules the scrub seam display-only,
  M-3/C-4 drops to MINOR."* Note the word **permanently**: a deferral is not a display-only ruling,
  and a seat that defers does not get the demotion.
- **Standing condition from OP-0, carried into both**: G2's AnimationControlsGroup arm is
  **UNBLOCKED** by this sitting's portal settlement, under that settlement's three properties (no
  unmount, no keyed stateful subtree, per-channel arbitration). See
  `evidence/W7/OP-0-OP-1-SETTLEMENTS.md` §1.6.

---

## §5 · EXPORT GAPS → THE BH RELAY (SS-6), NEVER A DEMO-SIDE HACK

Produced by this evaluate, routed to **`.f`**, for an outbound letter from this tree plus its
`INBOX.md` row. **glass-ui is READ-ONLY always**; not one of these is cured in the demo.

1. **C-15's `/timeline` export gap, now measured to its floor**: the subpath exports **one runtime
   binding** (T3/T4) against **seven** shipped-but-unreachable modules, and the package has **no
   wildcard subpath but `./fonts/*`** (T5-T7) — so there is **no deep-import escape hatch**. The ask
   is the producer's to weigh: re-export the variant SFCs and `geometry`, or state that the
   dispatcher is the whole intended surface.
2. **`geometry.d.ts` has no percent↔position map and no zoom/pan** (T11) — the single absence that
   most decides §2.1. Filed as a capability gap, not a defect.
3. **`SliderVariant` has no "timeline" member** (T8) — recorded as the fact that closes the
   Slider-primitive route, with PR-CAUTION noted beside it.
4. **TooltipContent's `ariaLabel` fallback + its non-consumption of
   `--reka-tooltip-content-available-height`** — producer seams surfaced at §2.3.
5. **KF-SCR-2 · KF-AV-32** — already named in `.f`'s brief; carried, not re-filed here. **The `cn`
   padding-group seam is already relayed and is NOT re-filed** (the spec says so; this seat obeys).

---

## §6 · Verdict

**G1: GREEN.** The §Verdict table exists, per-surface, against the real export surface: six surfaces
— KeyframeTimeline (312 L) / TimelineTrack (246 L) / TimelineCaret (70 L) / TimelineHoverPreview
(44 L, drift named) / SequenceScrubber (162 L) / AnimationVisualizer (256 L) — each ruled with a named
reason against the IMPORTABLE surface only; every SWAP-discharged row named (**there are none, and
§3 says so in the form W10 consumes**); PR-CAUTION weighed before the first row; C-15 cited and never
re-derived; both triggers armed; export gaps routed to the relay.

**Carried by this gate** (the spec's own list): C-15 (input, never re-derived) · KF-AV-28 ·
KF-AV-10's routing · C-4 (SpringTarget) · C·C-4 (SequenceScrubber) · KF-AV-13's decision · the
PlaybackRibbon counter-evidence lock (PR-CAUTION).

**What the wave now knows, in the goal criterion's own words.** *Is the timeline instrument ours to
keep?* **Yes — all six surfaces.** *And if we keep it, what is the one seam that makes scrubbing
real?* **That question is now `.b`'s, and it is the only one left at this altitude**: nothing in the
producer's surface will answer it, so the seam must be designed once and landed once. **A wave that
wires `scrub` into the drag and calls it done has failed this goal** — N-10's convicted regression,
not a cure.
