claude-opus-5[1m]

# CHALLENGE · `SequenceAxis` · axis L (LIBRARY)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceAxis.vue` (49 lines)
**Tree HEAD:** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode:** static, read-only. No installs, no dev server, no browser tooling. keyframes.js was read as evidence only; nothing in any repo was mutated.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries its own falsifier; where a claim needs a live DOM to settle a *magnitude* (never a *sign*), it is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.

**Corpus folded (not re-invented):** `formation/keyframes/lane-frontend.md` — F-1 (phantom glass-ui), §4 roster row for this file (line 255), §6.3 (token namespace), §9 (counts). One row of that census is **refined** here (L-5).

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **L-1** | **BLOCKER** | The ruler resolves its coordinate frame against a grid column **no other timeline element uses**. The `0` tick sits `--col-gap` (0.75rem / 12px) left of the playhead's t=0. The component's own doc comment asserts the opposite. |
| L-2 | MAJOR | `quarters` is **false generality** — the tick count is a prop, but the rules the ticks "NAME" are hardcoded `calc(100% / 4)` in a *globally shared* idiom. Any `length !== 5` silently produces labels naming nothing. |
| L-3 | MAJOR | Zero encapsulation boundary: the parent reaches into `.seq-axis` (this SFC's private class) to run the boot wipe + the PRM guard, and the reach survives only because `.seq-axis` is the **root node**. |
| L-4 | MAJOR | The axis's box height is duplicated as the magic literal `1.25rem` in `SequencePlayhead.vue:26` — and has **already drifted** at the mobile breakpoint. |
| L-5 | MAJOR | Phantom-dep exposure: this file imports **zero** glass-ui, yet **100%** of its visual identity (rules + labels) resolves only through the undeclared/unlocked glass-ui. Refines lane-frontend §4's `b` legend. |
| L-6 | MINOR | Mobile line-height desync — the tick line box overflows the compressed ruler strip by 2.4px. |
| L-7 | MINOR | Five labels, four rules: the `q = 1` label names a hairline that is never painted. |
| L-8 | MINOR | `readonly number[]` is wider than the CSS's assumptions (sorted / endpoint-anchored / unique). |
| L-9 | MINOR | The ruler carries no unit. |
| L-10 | MINOR | `:first-child` / `:last-child` are positional — any added sibling silently kills the edge-hug. |
| L-11 | INFO | `--tick-p` is unprefixed (lane-frontend §6.3). No live collision. |
| L-12 | INFO | Zero test coverage; the sequence suite is composable-only. |

**Superlatives (L-18 runs both ways): S-A … S-E, §2.** This is a genuinely well-made unit with one structural error, not a bad unit.

Tally: **12 defects · 1 blocker · 5 superlatives.**

---

## 1. Defects

### L-1 — BLOCKER · the ruler names a coordinate frame nothing else rides

**Provenance.**

`SequenceAxis.vue:22` places the ruler in the parent grid's second column:

```
21  .seq-axis {
22      grid-column: 2;
```

`.seq-stage` is that grid, and its **column gap is zero** (`SequenceTarget.css:43–44`):

```
37      --label-col: 3.25rem;
38      --col-gap: 0.75rem;
39      --track-inset: calc(var(--label-col) + var(--col-gap));
43      grid-template-columns: var(--label-col) 1fr;
44      gap: 0.5rem 0;                       /* row-gap 0.5rem · COLUMN-GAP 0 */
```

So the axis box is `[content-left + 3.25rem, content-right]`.

Every *other* element on the timeline resolves against `--track-inset` (= `3.25rem + 0.75rem` = `4rem`), not against column 2. `SequencePlayhead.vue:23–29`:

```
23  .seq-playhead-track {
24      position: absolute;
26      top: calc(0.75rem + 1.25rem);
28      left: calc(1rem + var(--track-inset));
29      right: 1rem;
```

`.seq-playhead-track` is an abspos child with `grid-column: unset` (`:25`), so its containing block is `.seq-stage`'s **padding box**; `left` therefore lands at `content-left − 1rem + 1rem + 4rem` = `content-left + 4rem`, and `right: 1rem` puts its right edge at `content-right`. The playhead box is `[content-left + 4rem, content-right]`.

**The arithmetic.** Both boxes share a right edge; the axis's left edge is `--col-gap` further left. For a tick at `q` and a playhead at `p = q`:

```
tick(q)     = content-left + 3.25rem + q·(W − 3.25rem)
playhead(p) = content-left + 4.00rem + p·(W − 4.00rem)
playhead − tick  =  0.75rem · (1 − q)
```

→ **12px at q = 0, 6px at q = 0.5, 0 at q = 1** (default 16px root). The error is *largest exactly at the `0` label*, which is the scene's resting state (`SequenceTarget.vue:184–196` seeks `progress` on mount; the default entry is t = 0). This needs no subgrid reasoning — it is two declared rules subtracted.

The same sign holds against the **row handles**, which are the ruler's other referent. `.seq-track` is column 2 of `.seq-row`, a *subgrid* that overrides the gutter (`SequenceTarget.css:71–73`: `grid-template-columns: subgrid; column-gap: var(--col-gap)`). Whatever a given engine's subgrid-gutter resolution does with a 0.75rem gutter over a 0 parent gutter, it can only start the track column **at or right of** `label-col` — never left of it. So `axisLeft ≤ trackLeft` always, with the gap up to 0.75rem. The magnitude here is **UNPROVEN-NEEDS-LIVE**; the sign is proven.

Note what this offsets: not only the labels, but the painted hairlines too, since `.stage-field-x`'s gradient paints on the axis's own box (`design-idioms.css:205–211`). The entire time grid is shifted, coherently with itself and incoherently with the timeline.

**Why the file's own prose is the second half of the evidence.** `SequenceAxis.vue:3–4` claims:

> *"Spans the SHARED track column (2) so the tick labels resolve against the track width"*

Column 2 of `.seq-stage` is provably **not** the track column — the track column is column 2 of `.seq-row`, a different grid with a different gutter. `SequencePlayhead.vue:21–22` states the correct contract for comparison: *"Spans the shared row-track column (**inset past the label column**) so `left: %` resolves against the track width — the SAME axis the handles ride."* The playhead says *inset*; the axis does not inset.

**Git provenance — this is drift, not design.**

```
$ git log --oneline --follow -- demo/scenes/sequence/SequenceAxis.vue
f3b5b7dc 2026-06-24  impl(R.W5 Band C/4 sequence): fuse demo/sequence + SequenceScene → …

$ git show 74ee9d27 -- demo/scenes/sequence/SequenceTarget.css   (2026-07-04)
+    --label-col: 3.25rem;
+    --col-gap: 0.75rem;
+    --track-inset: calc(var(--label-col) + var(--col-gap));
+    grid-template-columns: var(--label-col) 1fr;
+    gap: 0.5rem 0;
+    column-gap: var(--col-gap);
```

`--col-gap` / `--track-inset` were **born on 2026-07-04**. `SequenceAxis.vue` was last touched **2026-06-24** — ten days earlier — and is the **only file in `demo/scenes/sequence/` not modified after the geometry rewrite** (mtimes: SequenceAxis Jun 24 · SequenceTarget.css Jul 9 · Playhead/Scrubber/Scene Jul 15 · SequenceTarget.vue Jul 16 · useSequenceDemo Jul 16). The axis's `grid-column: 2` is a pre-token relic that the token migration passed over.

**Why BLOCKER.** The component's sole reason to exist is naming the master-clock frame for a scene whose product *is* the legibility of timing. A ruler that is systematically wrong — worst at the default resting state, and wrong in its painted rules as well as its labels — is a correctness failure, not polish. It is also a one-line fix (`margin-left: var(--col-gap)`, or `grid-column: 1 / -1; margin-left: var(--track-inset)`), so the severity carries no cost.

**Falsifier.** In a live stage, compare bounding rects:
`const a = $('.seq-axis').getBoundingClientRect(), p = $('.seq-playhead-track').getBoundingClientRect(), t = $('.seq-track').getBoundingClientRect();`
If `a.left === p.left` and `a.width === p.width` to within 0.5px, **L-1 is dead**. Equally fatal: any rule elsewhere in the cascade that adds a left inset to `.seq-axis` (I grepped every `.css` and `<style>` in the tree for `seq-axis` — the only hits are `SequenceAxis.vue:6,21,27,36,39,44` and `SequenceTarget.css:221,239`, and neither of the latter touches inline position). Also fatal: if `.seq-stage`'s `gap` were ever `0.5rem 0.75rem` rather than `0.5rem 0`.

---

### L-2 — MAJOR · `quarters` is false generality; the rules it names are hardcoded elsewhere

`SequenceAxis.vue:8` iterates an arbitrary-length prop:

```
 8              v-for="q in quarters"
17  defineProps<{ quarters: readonly number[]; staggerMax: number }>();
```

But the hairlines the ticks exist to name are fixed at four, in a **global, multi-consumer** idiom (`demo/styles/design-idioms.css:205–211`):

```
205  .stage-field-x {
206      background-image: repeating-linear-gradient(
207          to right,
208          var(--border) 0 1px,
209          transparent 1px calc(100% / 4)
210      );
211  }
```

`calc(100% / 4)` is a literal, and `.stage-field-x` is shared with `SpringTarget.vue:63,141` — so it cannot be re-parameterised for one consumer without a token. The component therefore advertises a degree of freedom it does not have: pass `[0, 0.2, 0.4, 0.6, 0.8, 1]` (type-valid, semantically reasonable for a ruler prop named for *ticks*) and you get six labels floating over four unrelated hairlines, with no error at any layer. The file's own comment (`:4–5`) states the coupling — *".stage-field-x paints the quarter rules, the ticks NAME them"* — and then declines to enforce it.

The single caller pins it correctly (`SequenceTarget.vue:155`, `const AXIS_QUARTERS = [0, 0.25, 0.5, 0.75, 1] as const`), which is exactly why the parameter buys nothing: one consumer, one legal value, one un-enforced invariant. The honest shapes are (a) drop the prop and own the constant beside the class that pins it, or (b) have the axis publish `--tick-count: {{ quarters.length }}` and rewrite the gradient as `calc(100% / var(--tick-count, 4))` so drift is impossible.

**Falsifier.** If `.stage-field-x`'s repeat interval is (now or in the SS-13 tree) derived from a custom property that `SequenceAxis` sets, this dies. It is not: `grep -rn "tick-p\|100% / 4" demo/` returns only `SequenceAxis.vue:11,30` and `design-idioms.css:209/198`. Equally fatal: a type-level pin (`readonly [0, 0.25, 0.5, 0.75, 1]`) — the declared type is the un-narrowed `readonly number[]`.

---

### L-3 — MAJOR · no encapsulation boundary; the parent animates this SFC's private class

`.seq-axis` is declared only inside this file's `<style scoped>` (`:21`). Yet `SequenceTarget.css` reaches in twice — for the power-on wipe and for the mandatory PRM degrade:

```
221  .seq-stage.is-powering-on .seq-axis {
222      animation: seq-ruler-wipe 420ms ease-out both;
223  }
238  @media (prefers-reduced-motion: reduce) {
239      .seq-stage.is-powering-on .seq-axis,
240      .seq-stage.is-powering-on .seq-row {
241          animation: none;
```

`SequenceTarget.css` is loaded scoped (`SequenceTarget.vue:252`, `<style scoped src="./SequenceTarget.css">`), so the selector compiles to `… .seq-axis[data-v-parent]`. That matches **only** because Vue stamps the parent's scope id onto a child component's **root node** — a property of this SFC's *current shape*, not of its contract. Wrap the ruler in any container (a legend, a scroll host, a `<Transition>` with a wrapper) and the root moves, the parent scope id follows the new root, `.seq-axis` no longer carries `data-v-parent`, and **both the boot animation and its PRM guard silently stop applying**. No error, no warning, no failed build — the wipe just disappears, and the reduced-motion escape hatch disappears with it.

Combined with L-4, one 1.1rem strip has its geometry and identity spread across three files with no shared token: this SFC owns the box, `SequenceTarget.css` owns the motion via a reached-in selector, `SequencePlayhead.vue` owns a copy of the height.

**Falsifier.** If Vue did not propagate the parent scope id to child roots, the animation would already be dead in the shipped tree and this would be a *different* (worse) bug. If `SequenceTarget.css` were unscoped, the reach would be legitimate global styling and the fragility claim would weaken to INFO — it is scoped (`SequenceTarget.vue:252`). If `SequenceAxis` exposed the wipe itself (a prop/class it owns), the claim dies; it exposes nothing.

---

### L-4 — MAJOR · the axis's height is a magic literal in a sibling, and it has already drifted

`SequencePlayhead.vue:26` hardcodes this component's box:

```
26      top: calc(0.75rem + 1.25rem); /* frame pad-top + axis ruler height */
```

`1.25rem` is `1.1rem + 0.15rem` — precisely `SequenceAxis.vue:24–25` (`height` + `margin-bottom`). The comment names the source and copies the value rather than reading a token.

The copy is **already stale**. `SequenceAxis.vue:43–47` compresses the ruler below 1024px:

```
43  @media (max-width: 1023px) {
44      .seq-axis {
45          height: 0.95rem;
46          margin-bottom: 0;
```

Mobile outer height is `0.95rem + 0` = `0.95rem`, but `SequencePlayhead.vue:26` still says `1.25rem` and carries no media query of its own (the file has none — its `<style scoped>` runs `:20–87` with zero `@media`). So under 1024px the playhead's top edge is **0.3rem (4.8px) below** the position its own comment claims. The consequence is cosmetic; the defect is that a private layout constant of component A is a literal in component B, and the very media query that *is* in this file proves the coupling cannot be maintained by hand.

(Separately: the formula omits `.seq-stage`'s `row-gap: 0.5rem` entirely — `SequenceTarget.css:44` — so the playhead line starts 0.5rem above the first lane on both breakpoints. Noted, not separately scored; it is the same missing-token root cause.)

**Falsifier.** If `SequencePlayhead` derived its `top` from a shared token (e.g. `--axis-height`, declared on `.seq-stage`), this dies. `grep -rn -- "--axis-height\|--ruler" demo/scenes/sequence/` → no output; the four `--axis-*` tokens counted in lane-frontend §6.3 belong to other scenes. Also fatal: if `1.25rem` were coincidental rather than `1.1 + 0.15` — the inline comment ("axis ruler height") rules that out.

---

### L-5 — MAJOR · phantom-dep exposure, and a refinement of lane-frontend §4

lane-frontend §4 rosters this file (line 255) as `| 49 | sequence/SequenceAxis.vue | b | sequence ruler axis |`, where **b = no glass-ui import**. That is true at the import graph and **misleading at the cascade**. This component has two visual halves and glass-ui owns both:

| surface | class / token | defined in |
|---|---|---|
| the hairlines | `--border` (via `.stage-field-x`, `design-idioms.css:208`) | `node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css` |
| the labels | `text-mono-caption` (`SequenceAxis.vue:10`) | `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css` |
| the labels | `--muted-foreground` (via `text-muted-foreground`, `:10`) | `…/tokens/color-radius.css` (+ `…/glass/ladder.css`) |

Probes:

```
$ grep -rn -- "--border:" demo/                                  → (no output)
$ grep -rn "text-mono-caption" demo/styles/*.css                 → (no output)
$ grep -rln "text-mono-caption" node_modules/@mkbabb/glass-ui/dist/styles/
  node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css
```

`text-mono-caption` is a Tailwind v4 `@utility` declared *inside node_modules* and registered only through `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"`. Under lane-frontend **F-1** (glass-ui absent from both `package.json` and `package-lock.json`, present in `node_modules` only by the Jul 16 install), a clean `npm ci` leaves nothing behind that import. The build then fails at the import — F-1's already-filed consequence, not re-filed here.

The component-level finding is narrower and new: **`SequenceAxis` has zero glass-ui imports and zero glass-ui-independent appearance.** Neither the rules nor the labels survive the phantom dep's absence. lane-frontend §9's "21 `.vue` NOT importing glass-ui" therefore overstates how much of the tree is decoupled from F-1 — the import-graph metric and the coupling metric diverge, and this file is a clean specimen of the divergence. Recommend §9 gain a second column (or a footnote) distinguishing *import-coupled* from *cascade-coupled* before F-1's remediation wave scopes its blast radius.

**Falsifier.** If `--border` or `text-mono-caption` were defined anywhere under `demo/`, or supplied by Tailwind/`tw-animate-css` rather than glass-ui, the coupling claim dies for that surface. Both greps above are empty for `demo/`. (`tabular-nums` at `:10` is **excluded** from the claim — Tailwind ships it natively; glass-ui merely re-declares it with `lining-nums` in `@layer components`. That one degrades gracefully.)

---

### L-6 — MINOR · mobile line-height desync

The mobile block (`:43–47`) compresses `.seq-axis` to `0.95rem` and zeroes its `margin-bottom`, but does **not** touch `.seq-axis-tick`'s `line-height: 1.1rem` (`:32`). The ticks are `position: absolute; top: 0` (`:28–29`), so they contribute nothing to the grid row; the row is sized by the explicit `height: 0.95rem` (15.2px) while each label's line box remains 17.6px. Below 1024px every tick overflows its strip by **0.15rem (2.4px)** downward, into the 0.5rem stage row-gap. No collision (the gap absorbs it) — but the ruler height token and the label metric are decoupled, and the desktop pair is exact (`1.1rem` height vs `1.1rem` line-height, `:24` / `:32`), which shows the coupling was intended.

**Falsifier.** If `line-height: 1.1rem` were overridden for the mobile band anywhere in the cascade, this dies — the file has exactly one `@media` (`:43`) and it sets only `height` and `margin-bottom`. Also fatal: if the label glyphs render shorter than their line box such that nothing crosses the strip edge (a paint claim, not a layout one) — **UNPROVEN-NEEDS-LIVE** for the visible-ink question; the box-overflow itself is proven.

---

### L-7 — MINOR · five labels, four rules

`.stage-field-x`'s repeating gradient (`design-idioms.css:206–210`) has a 25% repeat unit with a 1px band at its start → hairlines at **0%, 25%, 50%, 75%**. The next band would start at 100%, outside the paint box. The component renders **five** ticks (`AXIS_QUARTERS`, `SequenceTarget.vue:155`), so the `q = 1` label (`1600`) names a rule that is never drawn, against the file's own claim at `:4–5` that "the ticks NAME them". The nearest ink at that x is `.seq-stage`'s border — 1rem further right, outside the axis box (`SequenceTarget.css:45,47`).

**Falsifier.** If `repeating-linear-gradient` painted a band at exactly 100% of the box, or if a separate rule drew a terminal hairline on `.seq-axis`, this dies. The only other `.seq-axis` rules in the tree are `SequenceTarget.css:221,239` (animation only). Note this is *survivable* as a ruler convention (a terminal label without a terminal rule is common) — hence MINOR, not MAJOR.

---

### L-8 — MINOR · the prop type is wider than the CSS's assumptions

`defineProps<{ quarters: readonly number[]; staggerMax: number }>()` (`:17`) admits values the stylesheet cannot render correctly:

- **sorted ascending, endpoints 0 and 1** — encoded structurally by `:first-child` / `:last-child` (`:36–41`), not by the type. `[0, 1, 0.5]` is type-valid and anchors the `0.5` label with `translateX(-100%)`.
- **unique** — `:key="q"` (`:9`) keys on the *value*. Duplicates produce Vue's duplicate-key dev warning and undefined patch behaviour.
- **within [0, 1]** — `left: calc(var(--tick-p) * 100%)` (`:30`) places anything outside the range off the strip.
- **`staggerMax` scale** — `Math.round(q · staggerMax)` (`:12`) can collapse adjacent labels for small values (`staggerMax = 3` → `q = 0.5` and `q = 0.75` both render `2`).

None is live: the single caller passes a frozen 5-tuple (`SequenceTarget.vue:155`) and `STAGGER_MAX = 1600` is a module constant (`useSequenceDemo.ts:74`). This is contract laxity, not a live bug — and it compounds L-2, where the same over-wide type is the vehicle for the false generality.

**Falsifier.** A branded/tuple-narrowed type, or a runtime guard, would kill this. Neither exists. A second caller passing something other than `AXIS_QUARTERS` would *promote* it — there is exactly one caller (`grep -rn "SequenceAxis" demo/` → `SequenceTarget.vue:66,148` only).

---

### L-9 — MINOR · the ruler carries no unit

`{{ Math.round(q * staggerMax) }}` (`:12`) renders bare integers — `0 400 800 1200 1600`. "ms" appears nowhere in the axis; the file states the unit only in a source comment (`:5`, "Labels = `q × staggerMax` ms"). The nearest on-screen unit is each row's own `@{{…}}ms` (`SequenceTarget.vue:87`), one column to the left; the card header reads `stagger × 5` (`:16`) and the `Metric` is `%` (`:18–24`). The standard ruler convention (unit on the terminal tick, or once in the axis label) is unmet.

**Falsifier.** If the intent is that the row labels' `@…ms` supply the unit for the whole stage, this drops to INFO. I record it as MINOR because the axis is `aria-hidden` (`:6`) and thus *purely* visual — a visual-only element that omits its unit has no fallback channel.

---

### L-10 — MINOR · positional edge-hug selectors

`.seq-axis-tick:first-child` / `:last-child` (`:36`, `:39`) require the ticks to be the first and last *children of `.seq-axis`*, not merely the first and last ticks. Adding any element inside the strip — a baseline rule, a unit label (see L-9), an `<hr>` — silently voids the edge-hug and the terminal labels resume centering at `translateX(-50%)`, clipping past the frame. `:first-of-type` would not help (all children are `<span>`); the robust forms are `:nth-child(1 of .seq-axis-tick)` or an explicit first/last binding.

**Falsifier.** If `.seq-axis` were structurally locked to tick-only children (a `v-for` over a validated tuple with no slot), the fragility would be theoretical. There is no slot and no lock, but also no current sibling — hence MINOR.

---

### L-11 — INFO · unprefixed custom property

`--tick-p` (`:11`, `:30`) is unprefixed and inherits by default, in a tree lane-frontend §6.3 measured at **98 unprefixed demo custom properties and zero `--kf-*` namespace**, sharing a flat global namespace with glass-ui's. No live collision — `grep -rn "tick-p" ` over the tree returns only `SequenceAxis.vue:11,30`, and the ticks have no descendants to inherit it. Recorded as namespace exposure for the §6.3 collision lane, not as a defect of this file.

*(Adjacent non-finding, checked and cleared: `:style="{ '--tick-p': q }"` with `q === 0` is safe. Vue's `setStyle` guards with `val == null`, not falsiness, then calls `style.setProperty('--tick-p', 0)`; WebIDL stringifies to `"0"`. Had the guard been `!val`, the first tick would silently lose its position. Worth knowing; not a defect.)*

---

### L-12 — INFO · zero test coverage

`test/demo/scenes/sequence-scene.test.ts` is the only sequence suite and is composable-only: it locks `useSequenceInstrument`'s refs and smoke-constructs `useSequenceDemo` (`:20–66`), asserting `ROW_COUNT === 5` and `STAGGER_MAX === 1600` (`:57–58`). No component is mounted; `grep -rn "SequenceAxis\|seq-axis\|quarters" test/` → no output. L-1's misalignment is exactly the class of defect a mounted-geometry assertion (`axis.left === track.left`) would have caught at the 2026-07-04 geometry rewrite. Rendering this SFC in a test is unusually cheap — it has no imports, no injections, and no engine handle (see S-A).

**Falsifier.** Any mounting test elsewhere in the suite covering this file. There is none.

---

## 2. Superlatives (L-18, both ways)

### S-A — the purest unit in the folder, and the correct counter-idiom to its sibling

Zero imports. Zero injections. Zero lifecycle hooks. Zero refs, timers, listeners, observers, or engine handles — therefore **zero teardown surface and no possible leak**. The entire script block is one line (`:17`). Its sibling `SequenceScrubber` takes the opposite path, and `SequenceTarget.vue:126` records it plainly: *"it injects the demo, no props."* Both idioms live in one folder; **this one is the better of the two.** A props-down leaf is mountable in isolation with two literals, which is why L-12's fix is nearly free — the scrubber cannot be tested without standing up `SEQUENCE_DEMO_KEY` and a warmed engine.

*Falsifier:* if the axis needed reactive state from the demo (a live tick set, a zoom window), the injection idiom would be the right one and this would invert. It does not — both props are compile-time constants (`SequenceTarget.vue:155` / `useSequenceDemo.ts:74`).

### S-B — correctly outside the 60fps path (exemplary engine-consumption)

The ruler consumes only `staggerMax` (a module constant) and a frozen tuple. It **never reads `progress`** — contrast `SequencePlayhead.vue:17`, `defineProps<{ progress: number }>()`, which re-renders every frame of the master clock. `SequenceAxis` therefore renders once at mount and never again for the life of the scene, and its only motion (the 420ms power-on wipe, `SequenceTarget.css:221–223`) is a one-shot CSS animation with no JS involvement.

This is the correct reading of the repo's own inv-ζ doctrine. `SequenceTarget.css:204` defines it operationally — *"One box-shadow calc() — no rAF (inv ζ)"* — i.e. inv-ζ forbids per-frame JS, it does not mandate routing static chrome through the engine. A ruler that subscribed to `progress` to redraw unchanging labels would be the misuse. This is the right restraint, and it is the *rarer* mistake to avoid in a repo that dogfoods its own engine in 68 files (lane-frontend §1).

*Falsifier:* if the ticks were meant to reflow with a live time window (a zoomable axis), the static binding would be under-powered. `AXIS_QUARTERS` is `as const` and `STAGGER_MAX` is a non-reactive export — the domain is fixed by construction.

### S-C — three exactly-right ruler-typography choices

`tabular-nums` (`:10`) — tick labels change width as digits change (`0` → `400` → `1600`); tabular figures keep each label's box stable under the `-50%` anchor. `white-space: nowrap` (`:33`) — prevents a label wrapping when the absolute box has no width constraint. `line-height: 1.1rem` (`:32`) equal to the container's `height: 1.1rem` (`:24`) — vertical centering with no flex context and no extra box. Each is a small thing; together they are the difference between a ruler that sits still and one that jitters. (L-6 is the one place the third choice was not carried through to the mobile band — the *desktop* pairing is deliberate and exact.)

### S-D — `aria-hidden` is the correct posture, and it is legally applied

`aria-hidden="true"` (`:6`) on a decorative ruler is right on both counts. **Redundancy:** the numbers it shows are already exposed semantically by the row sliders — `aria-valuemin="0"`, `:aria-valuenow="Math.round(row.at)"`, `:aria-valuemax="demo.STAGGER_MAX"` (`SequenceTarget.vue:100–103`) — so hiding the visual duplicate removes noise without removing information. **Legality:** the subtree contains no focusable content (five `<span>`s, no `tabindex`, no controls), so this does not commit the common `aria-hidden`-over-a-focusable-element violation. Many hand-rolled axis rulers get exactly one of these two right.

*Falsifier:* if the ruler were the *only* statement of the time domain, hiding it would strand AT users. It is not — `aria-valuemax` carries `STAGGER_MAX` on all five sliders.

### S-E — the edge-hug is a real correctness detail, correctly reasoned

`:first-child { transform: translateX(0) }` / `:last-child { transform: translateX(-100%) }` (`:36–41`) anchor the terminal labels *inside* the frame instead of centering them on their marks, so a ruler spanning the full track width never clips its `0` or its `1600`. The middle ticks keep the correct `-50%` centering. There is no single-expression substitute (an interpolated `translateX(calc(var(--tick-p) * -100%))` would give `-25%` at `q = 0.25`, which is wrong), so the two-rule form is the right answer rather than a lazy one — and the comment at `:35` states the reason. Most hand-rolled rulers either clip the ends or mis-center the middle; this one does neither. L-10's fragility is a note on the *selector*, not on the *idea*.

---

## 3. Contradictions with the hitherto corpus

One, recorded above and repeated here for the fold:

- **lane-frontend §4 (line 255) / §9** mark `SequenceAxis.vue` as `b` — "no glass-ui import" — and count it among the "21 `.vue` NOT importing glass-ui". Both statements are literally true and jointly misleading: the file is 100% cascade-coupled to the phantom dep (L-5). The census's import-graph metric should not be read as a decoupling metric when F-1's remediation wave scopes its blast radius.

No other corpus row is contradicted. **F-1** is confirmed and localised (L-5). **§6.3** is confirmed and extended by one token (L-11). **S-4** (the census's `SequenceScrubber` → `ScrubberTimeline` shadow) is untouched by this challenge, but S-A supplies an independent, non-glass reason to prefer this component's shape over the scrubber's.

## 4. Method + limits

Read whole, read-only: the target and every file that binds to it — `SequenceTarget.vue` (sole caller, `:66`, `:148`), `SequenceTarget.css` (the grid + the reached-in animation), `SequencePlayhead.vue` (the frame it should agree with), `SequenceScene.vue`, `sequenceKeys.ts`, `useSequenceDemo.ts` (`STAGGER_MAX`), `demo/styles/design-idioms.css` (`.stage-field-x`), the installed glass-ui token/typography CSS, and `test/demo/scenes/sequence-scene.test.ts`. The component itself imports nothing, so its contract lives entirely at those call and cascade sites — which is why the audit is mostly about relationships and only incidentally about the 49 lines.

Not done, per lane law: no dev server, no browser, no installs, no execution. Two magnitudes are consequently unsettled and marked in place — the axis-vs-`.seq-track` offset under subgrid gutter resolution (L-1, *sign* proven, *magnitude* open) and whether L-6's 2.4px box overflow produces visible ink. Neither affects the severity of L-1, which is settled by arithmetic on two declared rules.
