claude-opus-5[1m]

# CHALLENGE · `SequencePlayhead.vue` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequencePlayhead.vue` — 87 lines (11 template · 5 script · 68 style).
**Tree:** keyframes.js HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`. File last touched by `d770b99b` (U.E10/D6 clamp routing) over `d93215a8` (T.G4 `left`→`transform`).
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Livable-only magnitudes are marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture:** assumed defective until the tree proved otherwise. Four candidate defects were **killed by the tree** and are recorded in §4 (K-1..K-4) so they are not re-litigated.

**Tally: 14 defects (3 MAJOR · 8 MINOR · 3 INFO) · 0 BLOCKERS · 5 superlatives.**

### Files read whole (read-only)

| File | Why |
|---|---|
| `demo/scenes/sequence/SequencePlayhead.vue` | target |
| `demo/scenes/sequence/SequenceTarget.vue` (252 L) | sole consumer; mounts the target at `:70` |
| `demo/scenes/sequence/SequenceTarget.css` (259 L) | defines **every** custom property the target reads |
| `demo/scenes/sequence/SequenceAxis.vue` (49 L) | the sibling that names the axis the playhead rides |
| `demo/scenes/sequence/SequenceScrubber.vue` (162 L) | the sibling that solves the same problem differently |
| `demo/scenes/sequence/useSequenceDemo.ts` (482 L) | source of the `progress` prop |
| `demo/styles/design-idioms.css` §`.progress-*`/`.stage-field-x` | the promoted idioms + the quarter-rule painter |
| `demo/styles/style.css` | `--color-progress` (`:163`); the glass-ui `@import` (`:3`) |
| `@mkbabb/value.js` `src/foundation/math.ts` | `clamp` implementation |
| `keyframes.js/src/animation/orchestration/sequence/sequence.ts` | `Sequence.progress` accessors |
| `node_modules/@mkbabb/{value.js,glass-ui}/package.json` + `glass-ui/dist/styles/theme/radius.css` | dependency + token provenance |

### Corpus fold (hitherto, per lane law)

- **F-1** (`formation/keyframes/lane-frontend.md` §2) — `@mkbabb/glass-ui` phantom dependency. **Confirmed and inherited**, not re-derived. Where it bites this file: **L-13**. I do *not* re-file it as a blocker here; it is a repo-level RED already owned by F-1.
- **S-4** (`lane-frontend.md:350`) — `SequenceScrubber` → `ScrubberTimeline`. Adjacent, not this file. But the scrubber is the **contrast case** for **L-10**.
- **Shadow census S-1..S-8** — did **not** list `SequencePlayhead` as a glass-ui shadow. **I confirm that omission is correct**, and say so with evidence in §4/K-2 rather than manufacturing a shadow claim: the reachable `/timeline` barrel exports exactly one component.
- `lane-library.md` parse seams — no overlap. This file touches no parser surface.

---

## 1 · MAJOR

### L-1 — MAJOR · The playhead and the ruler that names it ride **two different origins**; `p = 0` does not sit on the `0 ms` tick

**Provenance:** `SequencePlayhead.vue:28` · `SequenceAxis.vue:22` · `SequenceTarget.css:39,43,44,45`

The file's own doc comment (`:21-22`) and header (`:7`) assert one shared axis:

```
/* Spans the shared row-track column (inset past the label column) so `left: %`
   resolves against the track width — the SAME axis the handles ride. */
```

`SequenceAxis.vue:4` asserts the same thing about itself ("Spans the SHARED track column (2)"). They cannot both be right, because they compute the origin two different ways.

The arithmetic, entirely from source:

- `.seq-stage` (`SequenceTarget.css:41-45`) is `position: relative; display: grid; grid-template-columns: var(--label-col) 1fr; gap: 0.5rem 0; padding: 0.75rem 1rem 1rem`.
- **`gap: 0.5rem 0` — the parent grid's column-gap is literally `0`.** Row-gap 0.5rem, column-gap 0.
- `--label-col: 3.25rem` (`:37`), `--col-gap: 0.75rem` (`:38`), `--track-inset: calc(3.25rem + 0.75rem) = 4rem` (`:39`).
- `.seq-axis` is a **direct grid item** of `.seq-stage` at `grid-column: 2` (`SequenceAxis.vue:22`). With column-gap 0, its box begins at `padding-left + --label-col = 1rem + 3.25rem = 4.25rem` from the stage's padding-box left edge. Its ticks sit at `left: calc(var(--tick-p) * 100%)` of **that** box (`SequenceAxis.vue:31`), and `.stage-field-x` paints the 0/25/50/75 % rules on the same box (`design-idioms.css:205-211`).
- `.seq-playhead-track` is `position: absolute` with `grid-column: unset` → `auto`. Per CSS Grid §9.1 an abspos grid child with auto placement in both axes takes the **grid container's padding box** as its containing block. Its left edge is therefore `1rem + var(--track-inset) = 1rem + 4rem = **5rem**`.

**`5rem − 4.25rem = 0.75rem = 12 px` at a 16 px root.** At `progress = 0` the playhead line stands 12 px to the right of the `0 ms` tick and 12 px right of the 0 % gridline it is supposed to touch. The error decays linearly to zero at `p = 1` (both boxes end at the same right edge, `padding-right: 1rem` vs `right: 1rem`). So the sweep is not merely offset — it is **non-affine against its own ruler**: the reported ms under the head is wrong by a shrinking amount all the way across.

Secondary, and honestly weaker: whether the playhead matches the **handles** depends on how the subgrid gutter resolves. `.seq-row` is `grid-template-columns: subgrid` with its own `column-gap: var(--col-gap)` (`SequenceTarget.css:70,73`) while the parent's column-gap is 0. The playhead's `--track-inset` bakes in the assumption that the whole 0.75 rem gutter is absorbed on the **left** of track 2. If the UA instead centres the subgrid gutter over the parent's line, `.seq-track` starts at `4.625rem` and the playhead misses the handles by 6 px too. I do **not** assert which; that branch is **UNPROVEN-NEEDS-LIVE**.

**Falsifier.** Dead if `getBoundingClientRect().left` of `.seq-axis` equals that of `.seq-playhead-track` in a live stage — i.e. if some rule I did not find gives `.seq-stage` a non-zero column-gap, or gives `.seq-axis` a 0.75 rem left offset. I grepped every `--track-inset` consumer in the tree (`demo/`: exactly three lines, all cited above) and every `grid-column` in the two stylesheets; nothing else moves either box. Also dead if the design intent is that the ruler names the *axis-box* domain and the playhead names the *handle* domain — but then `:22` and `SequenceAxis.vue:4` are both lying about "the SAME axis," and the defect merely relocates to the comments.

---

### L-2 — MAJOR · `.seq-stage`'s padding is re-derived by four raw literals living in a different file

**Provenance:** `SequencePlayhead.vue:26,27,28,29` ← `SequenceTarget.css:45`

```css
top: calc(0.75rem + 1.25rem);          /* 0.75rem = stage padding-top */
bottom: 1rem;                           /* = stage padding-bottom     */
left: calc(1rem + var(--track-inset));  /* 1rem = stage padding-left  */
right: 1rem;                            /* = stage padding-right      */
```

`.seq-stage`'s `padding: 0.75rem 1rem 1rem` is declared once, in `SequenceTarget.css:45`, and is **not** tokenized. This file hand-copies all three values into four declarations across a component boundary. The tokenization job is **half done**: the author correctly tokenized the *columns* (`--label-col`, `--col-gap`, `--track-inset`) so the horizontal geometry could be shared — and then read the *padding* raw. Change `.seq-stage`'s padding and the playhead silently detaches from the frame with no type error, no lint, no test.

This is the mechanical root of L-1: the component reconstructs a box the layout engine already computes, instead of being placed in it. The engine's own answer is available two ways — make `.seq-playhead-track` a grid item (`grid-column: 2; grid-row: 1 / -1`, the placement its sibling `SequenceAxis` already uses) and delete all four inset literals, or hoist the padding to a token. Either kills L-1 and L-2 and L-4 together.

**Falsifier.** Dead if `.seq-stage`'s padding is pinned by a contract I did not find (a proof gate, a golden, a precept). `grep -rn "seq-stage" demo/ scripts/` yields only the two sequence files and the `is-scrubbing`/`is-powering-on` state rules — no gate pins it.

---

### L-3 — MAJOR · The `--z-seq-playhead: 1` / `--z-seq-handle: 2` micro-stack is **inert**; the handles can never out-paint the playhead

**Provenance:** `SequencePlayhead.vue:31` · `SequenceTarget.css:21-23,114,135,200`

`SequenceTarget.css:21-23` documents the contract:

```css
/* The storyboard hugs its content; local micro-stack tokens order the absolute siblings. */
.seq-storyboard { --z-seq-playhead: 1; --z-seq-handle: 2; ... }
```

and `:200` restates the intent — `z-index: var(--z-seq-handle); /* the traveller rests ON its gate, above it */`. The two tokens are authored as if they compete in one stacking context. They do not.

`.seq-track` carries `container-type: inline-size` (`SequenceTarget.css:114`). `container-type: inline-size` applies **layout** containment, and `contain: layout` makes the element a stacking context. `.seq-handle` (`z-index: 2`, `:135`) and `.seq-ball` (`z-index: 2`, `:200`) are absolutely positioned **inside** `.seq-track`, so their `2` is scoped to `.seq-track`'s own private stacking context. `.seq-track` itself is `position: relative` with `z-index: auto` — painting step 8.

`.seq-playhead-track` is positioned with `z-index: 1` — painting step 9. Neither `.seq-stage` (`position: relative`, `z-index: auto`, no transform/filter/containment) nor `.seq-rows`/`.seq-row` (unpositioned grid items) interposes a stacking context. **Step 9 paints after step 8**, so the entire playhead subtree — the 2 px line, the 8 px diamond head, and the 32 px comet trail — paints **over** every handle grip and every traveller it crosses, and `--z-seq-handle: 2` is powerless to stop it.

The visual consequence is modest (the comet is a `linear-gradient` at `opacity: calc(0.5 + …)`, so it tints rather than occludes). The **defect** is not the pixels: it is a documented ordering invariant that does not hold, and a token pair one of whose members is dead with respect to the other. Anyone later raising `--z-seq-handle` to fix a perceived overlap will find it does nothing, and will reach for the wrong lever.

**Falsifier.** Dead if `container-type: inline-size` does not establish a stacking context (then both tokens land in the same context and `2 > 1` holds), or if some ancestor between `.seq-track` and `.seq-playhead-track` creates a stacking context that reorders them — I walked `.seq-row` → `.seq-rows` → `.seq-stage` → `.seq-storyboard` and found none. Live check (**UNPROVEN-NEEDS-LIVE**): scrub until the playhead crosses a row handle and observe whether the comet trail tints the grip or is occluded by it.

---

## 2 · MINOR

### L-4 — MINOR · The `1.25rem` in `top:` hand-copies the axis's box height and **diverges from it at ≤1023 px**

**Provenance:** `SequencePlayhead.vue:26` ← `SequenceAxis.vue:24-25,43-47`

`top: calc(0.75rem + 1.25rem)` is annotated `/* frame pad-top + axis ruler height */`. The `1.25rem` is `SequenceAxis`'s `height: 1.1rem` + `margin-bottom: 0.15rem`. `SequenceAxis.vue:43-47` re-mediates **both** on mobile:

```css
@media (max-width: 1023px) { .seq-axis { height: 0.95rem; margin-bottom: 0; } }
```

→ 0.95 rem. The literal here does not follow. Below 1024 px the playhead's top edge sits `0.30rem` (≈ 4.8 px) below the ruler's margin-box bottom instead of flush against it, opening a gap the desktop layout does not have. `SequenceTarget.css:249-258` and `SequenceAxis.vue:43` are the *same* breakpoint — the mobile pass touched the axis and the rows and skipped the third consumer of the axis's height.

**Falsifier.** Dead if the flush-under-the-ruler relationship is not intended (i.e. a 4.8 px gap is fine), or if a rule I did not find re-mediates this `top` under the same query. `grep -n "max-width: 1023" demo/scenes/sequence/*` returns exactly two sites, neither in this file.

### L-5 — MINOR · The `var()` fallback discipline is **exactly inverted**: every self-owned property is defended, every externally-owned one is bare

**Provenance:** all twelve `var()` reads in `SequencePlayhead.vue` — bare at `:28,31,48`; fallbacked at `:46,47,49,50,62,63,64,78,81,84`

Split the reads by who owns the property:

| Property | Owner | Read |
|---|---|---|
| `--playhead-p` | **this file** (set inline, `:10`) | `var(--playhead-p, 0)` — fallbacked |
| `--ball-tone` | `.seq-target` / per-row (`SequenceTarget.css:8`, `.vue:80`) | `var(--ball-tone, var(--color-progress))` ×6 — fallbacked |
| `--seq-glow` | `.seq-target` / `.is-scrubbing` (`SequenceTarget.css:10,29`) | `var(--seq-glow, 0)` ×4 — fallbacked |
| `--scrub-dir` | `.seq-storyboard` / inline (`SequenceTarget.css:24`, `.vue:63`) | `var(--scrub-dir, 1)` — fallbacked |
| **`--track-inset`** | `.seq-stage`, sibling stylesheet (`SequenceTarget.css:39`) | **`var(--track-inset)` — bare** (`:28`) |
| **`--z-seq-playhead`** | `.seq-storyboard`, sibling stylesheet (`SequenceTarget.css:22`) | **`var(--z-seq-playhead)` — bare** (`:31`) |
| **`--radius-pill`** | **glass-ui**, the phantom dep (F-1) | **`var(--radius-pill)` — bare** (`:48`) |

The pattern is backwards. The four properties whose absence the component could shrug off — a tone, a glow scalar, a direction sign, its own progress — all carry fallbacks. The three whose absence is structurally load-bearing, and which the component cannot guarantee because they are declared in another component's scoped stylesheet or in an undeclared package, are read bare.

The consequences are graded. `:31` is the sharpest: mounted outside `.seq-storyboard`, `z-index` goes IACVT → `auto`, silently dropping the playhead below any positioned sibling. `:28` is worse in kind but louder: without `--track-inset` the whole `left` declaration is IACVT → `left: auto`, and with `right: 1rem` + `width: auto` the track collapses against the frame's right edge — a visible break, at least. `:48` is cosmetically nil (see L-13). For a unit whose header advertises itself as a reusable "colocated sub-unit," three unstated hard ancestor/package requirements is the wrong posture, and the file's own convention seventeen lines later shows it knows the defensive form.

**Falsifier.** Dead if any of the three is globally declared. `--track-inset`: one declaration, `SequenceTarget.css:39`. `--z-seq-playhead`: one, `:22`. `--radius-pill`: zero in `demo/`, defined only in `glass-ui/dist/styles/theme/radius.css:1`. Also weakened — not dead — by the observation that `SequenceTarget.css:135,200` read `--z-seq-handle` bare too, so the z-token laxity is at least consistent *within the scene*; but `SpringHeatmap.vue:321` (`var(--radius-pill, 9999px)`) proves the defensive form is live idiom in this tree.

### L-6 — MINOR · `--playhead-p` is unregistered, so the `, 0` fallback is **unreachable** and the real failure mode is transform poisoning

**Provenance:** `SequencePlayhead.vue:10,46` ← `SequenceTarget.css:14-18`

`:10` sets `--playhead-p` inline unconditionally, on every render, from first paint, against a required `number` prop. The property is therefore **never unset** on `.seq-playhead`, which makes the `, 0` in `var(--playhead-p, 0)` (`:46`) dead — it can only fire when the property is *absent*, never when it is present-but-bad.

The value the fallback was plainly written to catch is a bad number, and against that it is useless. `--playhead-p` is not registered, so a non-`<number>` token is a *valid* custom-property value; substituting it makes the whole `transform` declaration IACVT, and the line snaps to the track's left edge — the exact jump the fallback pretends to prevent.

The fix is eight lines away and already in the tree: `SequenceTarget.css:14-18` registers the twin token

```css
@property --ball-p { syntax: "<number>"; inherits: true; initial-value: 0; }
```

An identical block for `--playhead-p` makes an invalid write fall back to `0` **without** poisoning the declaration, and makes the `var()` fallback honest. The asymmetry — the engine-written token registered, the Vue-written token not — is unexplained by either file.

**Falsifier.** Dead if `progress` provably cannot be non-finite. I checked and the source is *nearly* closed: `Sequence.progress`'s getter is zero-guarded (`sequence.ts:217-219`, `this.duration === 0 ? 0 : …`) and `useSequenceDemo.ts:180` clamps. But `clamp` is `Math.min(Math.max(v,min),max)` (`value.js/src/foundation/math.ts:2-4`), which passes NaN through unchanged, and the setter path `sequence.progress = clamp(p,0,1)` (`useSequenceDemo.ts:200,281,403,429`) will seat `_time = NaN` if any `project()` divides by a zero-width rect. So the path is narrow but not sealed. Even sealed, the dead-fallback half of this finding stands on its own.

### L-7 — MINOR · The rule's doc comment describes a mechanism the file no longer uses, and is contradicted ten lines below

**Provenance:** `SequencePlayhead.vue:21-22` vs `:32-34,41-43,46`

```
/* … so `left: %` resolves against the track width — the SAME axis the handles ride. */
```

There is no `left: %` in this file. `.seq-playhead-track` has `left: calc(1rem + var(--track-inset))` and `.seq-playhead` has `left: 0`; the position is carried by `translateX(… 100cqw …)`. The comment survives from before `d93215a8` (`T.G4 tail: sequence + spring-heatmap left/top → transform (the layout-thrash kill)`), and the T.G4 comment at `:32-34` — added by that very commit — describes the replacement mechanism directly beneath it. Two adjacent comments in one 87-line file give two different accounts of how the thing moves.

**Falsifier.** Dead if `left: %` appears anywhere in the file. It does not.

### L-8 — MINOR · "Pure CSS over the engine's `progress` — no per-frame JS" overstates the delivery path

**Provenance:** `SequencePlayhead.vue:8,10` · `useSequenceDemo.ts:178-190` · `SequenceTarget.vue:70,187`

The header claims *no per-frame JS*. The **rendering** of the position is indeed pure CSS and that half is true and good (see SUP-2). The **delivery** is not: `progress` is a Vue ref rewritten every rAF by the mirror loop (`useSequenceDemo.ts:180`, inside `useSweepScene`'s `frame`), read in `SequenceTarget.vue:70`, and patched onto this component's inline style through a child re-render every frame. That is JS, per frame, by construction.

The contrast is sharp and is *inside the same scene*: the five travellers are the engine's own targets (`SequenceTarget.vue:187`, `demo.childAnims[i].setTargets(el)`), so the engine writes `--ball-p` straight to the DOM with Vue never involved. The playhead is the one moving element in the storyboard that does **not** dogfood that path — and the file that says "no per-frame JS" is the one that routes through Vue.

Stated honestly, the *cost* is small: `SequenceTarget` already re-renders every frame for the `Metric` readout (`SequenceTarget.vue:18-24`), so the incremental expense is one child vnode patch and one `setProperty`. I am filing this as a **comment-accuracy and idiom-consistency** defect, not a performance defect, and I decline to inflate it into one.

**Falsifier.** Dead if `progress` is not written per frame — it is (`useSweepScene`'s `frame` callback returns `machine.status.value === "playing"`, i.e. it runs until the machine leaves `playing`). Dead as an *idiom* claim if the engine cannot target this element; it can — `--ball-p` proves the mechanism on a sibling element in the same subtree.

### L-9 — MINOR · The `clamp()` is redundant against every writer and cannot defend against the one value it would need to

**Provenance:** `SequencePlayhead.vue:10,15` · `useSequenceDemo.ts:180,200,281,403,429` · `sequence.ts:217-219` · `value.js/src/foundation/math.ts:2-4`

`demo.progress` is clamped at its single read site (`useSequenceDemo.ts:180`) and at every write into the engine (`:200,281,403,429`); `Sequence.progress`'s getter is additionally zero-guarded. The prop arriving here is `[0,1]` by five independent constructions. Re-clamping at the boundary is a defensible posture in isolation — except that the boundary's actual threat is a non-finite number, and `clamp` is `Math.min(Math.max(v,min),max)`, which returns NaN for NaN. So the call costs an import and buys a guarantee the caller already provides, while failing to provide the one the caller doesn't.

`Math.max(0, Math.min(1, x)) || 0` would close it; so would L-6's `@property` registration, which closes it *in the layer where it matters* and lets the JS clamp go away entirely.

**Falsifier.** Dead if the component is ever mounted from a second call site with an unclamped source. `grep -rn "SequencePlayhead" demo/` returns exactly two lines, both `SequenceTarget.vue` (`:70` mount, `:147` import). One consumer, fully clamped.

### L-10 — MINOR · Two idioms for one job, in sibling files, in the same directory

**Provenance:** `SequencePlayhead.vue:10,46` vs `SequenceScrubber.vue:33`

Both units place a marker at a `[0,1]` progress along a `container-type: inline-size` rail. They do it differently:

```vue
<!-- SequencePlayhead.vue:10 — ship the scalar, build the transform in CSS -->
:style="{ '--playhead-p': clamp(progress, 0, 1) }"
/* :46 */ transform: translateX(calc(var(--playhead-p, 0) * 100cqw - 50%));

<!-- SequenceScrubber.vue:33 — ship the finished transform string -->
:style="{ transform: `translateX(calc(${clamp(demo.progress.value, 0, 1) * 100}cqw))` }"
```

Same scene, same clamp, same `cqw` rail, two shapes. They even centre differently — this file uses `- 50%` inside the translate (SUP-5), the scrubber uses `margin-left: calc(var(--ball-size, 36px) / -2)` (`SequenceScrubber.vue:159`). Neither is wrong; having both, undiscussed, in a two-file pair is the duplication. A reader cannot tell which is the house idiom, and the T.G4 comment block is copy-pasted into both (`SequencePlayhead.vue:32-34,41-43` / `SequenceScrubber.vue:118-121,156-158`) asserting the same rationale for divergent code.

**Falsifier.** Dead if one form is mandated by a constraint the other cannot meet. I can find none: the scrubber's marker could equally take a `--scrub-p` property, and this file's could equally ship a built string.

### L-11 — MINOR · `will-change: transform` is unconditional for the scene's lifetime

**Provenance:** `SequencePlayhead.vue:51`

`will-change` is a standing hint, not a per-gesture one, and it holds a compositor layer whether or not the sequence is running. This scene spends most of its time settled (`isMidPlay()` false, `machine.status !== "playing"`), and the same file already demonstrates the gated pattern for a *different* cost — `--seq-glow` is lifted only under `.seq-stage.is-scrubbing` (`SequenceTarget.css:28-29`). The playhead's layer is not gated on anything. The same unconditional hint appears on `.seq-ball` (×5, `SequenceTarget.css:201`), `.cascade-chase` (`:217`) and `.scrub-ball` (`SequenceScrubber.vue:158`), so the scene holds ≥8 permanent layers.

I am deliberately not calling this a measured regression: the layers are small and the demo is a single-scene stage. It is a posture note against MDN's explicit "do not apply `will-change` to a large number of elements / for long periods" guidance.

**Falsifier.** Dead if removing the hint measurably degrades the sweep (**UNPROVEN-NEEDS-LIVE** — a DevTools layer count + a scrub trace with and without would settle it), or if the scene is never idle in practice.

---

## 3 · INFO

### L-12 — INFO · `grid-column: unset` is a no-op

**Provenance:** `SequencePlayhead.vue:25`

`grid-column` is not inherited, so `unset` computes to `initial` = `auto` — which is already its value; nothing in either scoped stylesheet or the global cascade sets `grid-column` on `.seq-playhead-track` (it carries exactly one class, and `SequenceTarget.css`'s `grid-column` rules target `.seq-axis`/`.seq-rows`/`.seq-row`/`.seq-track`). The declaration reads as a guard for the abspos-in-grid containing-block rule, but that rule already resolves to the padding box with no help. Harmless; it costs a reader a lookup and implies a constraint that does not exist.

**Falsifier.** Dead if any rule in scope sets `grid-column` on this element. `grep -n "grid-column" demo/scenes/sequence/*` lists six sites; none matches `.seq-playhead-track`.

### L-13 — INFO · glass-ui phantom-dep (census **F-1**) exposure, with its honest magnitude

**Provenance:** `SequencePlayhead.vue:48` · `glass-ui/dist/styles/theme/radius.css:1` · `demo/styles/style.css:3` · `keyframes.js/package.json:68-70`

`border-radius: var(--radius-pill)` reads a token defined **only** by glass-ui (`@theme { … --radius-pill: 9999px; … }`), reaching this file through `demo/styles/style.css:3`'s `@import "@mkbabb/glass-ui/styles"` — a package absent from both `package.json` and `package-lock.json` (F-1). Read bare, with no fallback (cf. L-5; and cf. `SpringHeatmap.vue:321`'s `var(--radius-pill, 9999px)`, which shows the defensive form is available idiom).

**I am marking the CSS-layer consequence as essentially nil and refuse to inflate it**: the element is a 2 px-wide, full-track-height line, on which a `9999px` radius versus `0` is imperceptible. The real exposure is structural — this component's only mount site is inside a glass `<Card>` (`SequenceTarget.vue:8,136`), so if F-1 bites on a clean `npm ci` the playhead does not render at all, degraded or otherwise. That is F-1's blocker, not a second one.

Distinct from glass-ui: `@mkbabb/value.js` (the `clamp` at `:15`) is **correctly declared** — `dependencies: { "@mkbabb/value.js": "4.0.0" }`, the `./math` subpath is a real export (`value.js/package.json` exports map), and value.js is a genuine runtime dependency of `src/` (`src/animation/validate.ts:47`, `src/animation/load-engine.ts:65`), so the `dependencies` (not `devDependencies`) classification is right. No phantom, no misclassification. Recorded so the two `@mkbabb/*` edges are not conflated.

### L-14 — INFO · The SFC boundary is ceiling-driven, not contract-driven

**Provenance:** `SequencePlayhead.vue:2,17` · `SequenceTarget.vue:68-70,145-148`

The header names the reason for the split outright: "colocated sub-unit, ≤500L split." The unit is 3 lines of logic and 68 lines of CSS whose behaviour depends on five properties (`--track-inset`, `--ball-tone`, `--seq-glow`, `--scrub-dir`, `--z-seq-playhead`) inherited from a *sibling's scoped stylesheet*, none of them declared, defaulted, or documented as an interface — the props contract is one number and the real contract is a five-token cascade the type system cannot see. On the L axis this is the honest reading of the module-size question: **Goldilocks by line count, under-specified by contract.** It is not a defect to split at 500 lines; it is worth naming that the split produced a component boundary that carries almost none of the coupling it appears to encapsulate, which is precisely how L-1 and L-4 became possible.

The cheap remedy is not deletion — it is making the five inherited properties explicit (an `@property` block per L-6, plus fallbacks per L-5) so the boundary states what it needs.

**Falsifier.** Dead if a second consumer appears, or if the tokens are formalised as a documented cascade contract. Today: one consumer, zero declarations.

---

## 4 · Candidate defects the tree **killed** (recorded so they are not re-run)

**K-1 — `100cqw` container topology.** I expected the classic self-container error (`container-type` and the `cqw` consumer on one element, where the unit silently resolves against a *different* ancestor). It is **not** present: `container-type` is on `.seq-playhead-track` (`:35`), `100cqw` is on its child `.seq-playhead` (`:46`). Correct, and consistent with `.seq-track`/`.seq-ball` (`SequenceTarget.css:114` / `:187-199`) and `.seq-scrub`/`.scrub-ball` (`SequenceScrubber.vue:121` / `:33`). Promoted to SUP-2.

**K-2 — a missed glass-ui shadow (F-4/S-3 family).** I checked whether glass-ui ships a playhead primitive this file re-implements. It does not, reachably: `dist/timeline.d.ts` re-exports `./components/timeline`, whose `index.d.ts` exports **exactly one** component — `GlassTimeline` — plus three types. `ScrubberTimeline`, `ContinuousRail`, `ContinuousMarkers` exist as files but are not in the barrel. There is no bare-playhead export to migrate onto. **The shadow census (S-1..S-8) was right to omit `SequencePlayhead`, and I confirm rather than contradict it.**

**K-3 — right-edge overflow.** At `p = 1` the 8 px diamond head (`:54-66`) extends ~4 px past the track's right edge, and the 2 px line ~1 px. I checked for clipping: the nearest `overflow: hidden` is the `<Card>` (`SequenceTarget.vue:8`), 1 rem (16 px) further out. Nothing clips. Not a defect.

**K-4 — `--seq-glow` cascade collision.** `.seq-stage.cascade-chase` carries both `.cascade-chase { --seq-glow: 0 }` (`SequenceTarget.css:215-216`) and `.seq-stage.is-scrubbing { --seq-glow: 1 }` (`:28-29`) on the same element, with the `0` rule appearing *later* in the file. I expected a source-order upset; specificity settles it correctly — `(0,2,0)` beats `(0,1,0)`. Not a defect.

---

## 5 · Superlatives (L-18, both directions)

### SUP-1 — Zero teardown surface, by construction

`SequencePlayhead.vue:14-18` is the entire script: one import, one `defineProps`. No `ref`, no `computed`, no `watch`, no lifecycle hook, no `addEventListener`, no `requestAnimationFrame`, no `ResizeObserver`, no template ref, no `inject`. It is a pure function of one required prop. In a 1418-line scene directory carrying pointer capture (`useDragScrub` ×2), a rAF mirror loop, five engine handles bound via `setTargets`, a machine subscription and a global keydown trigger (`useTypedTrigger`), **this is the one unit with literally nothing to leak and nothing to tear down.** On the leaks/teardown bullet it is not merely clean — it is unfalsifiably clean, and that is the right shape for a purely visual sub-unit.

*Falsifier:* dead if any subscription hides in the template — the template is `:9-11`, two divs, one binding.

### SUP-2 — The T.G4 compositor claim actually holds; only `transform` moves per frame

`:46` is the only per-frame-varying declaration. `background` (`:47`) and `border-radius` (`:48`) are static; `box-shadow` (`:49-50`) varies only with `--seq-glow`, which changes once per *gesture* (`.is-scrubbing`, `SequenceTarget.css:28-29`), never per frame; `::after`'s `scaleX` varies with `--scrub-dir`, once per drag-direction change. Nothing reads `left`, `width`, or any layout-inducing property per frame. The `left: %` → `translateX(100cqw)` conversion (`d93215a8`) therefore delivers exactly what its comment claims: a layout-free, paint-free sweep. Many "compositor-only" refactors leave one paint-triggering property behind on the same element; this one did not.

*Falsifier:* dead if `--seq-glow` is written per frame — it is not; `useSequenceInstrument`'s `setScrubbing` is called from the scrubber's `onStart`/`onEnd` only (`SequenceScrubber.vue:87,91`).

### SUP-3 — The comet-trail direction flip is one declaration for a bidirectional streak

`:70-84`: `right: 50%` anchors the trail's right edge on the 2 px line's exact centre (50 % of the 2 px containing block = 1 px), `transform-origin: right center` pins the pivot there, and `transform: scaleX(var(--scrub-dir, 1))` flips the whole 32 px gradient to the other side on a drag-back. No mirrored `::after-reverse` rule, no second gradient, no JS branch, no width recomputation — and the anchor stays exact if the line width changes. This is the kind of thing that is usually written as two rules and a class toggle.

*Falsifier:* dead if `--scrub-dir` never reaches this element — it does, set inline on `.seq-stage` (`SequenceTarget.vue:63`) with a `.seq-storyboard` default (`SequenceTarget.css:24`), and custom properties inherit through `scoped` boundaries.

### SUP-4 — `aria-hidden="true"` is decorative *by construction*, not by omission

`:9` hides the playhead from AT, which is correct — and, unusually, it is **backed**: the same progress value is exposed twice elsewhere, as a `<Metric label="progress">` readout (`SequenceTarget.vue:18-24`) and as the scrubber's `role="slider"` with live `aria-valuenow`/`min`/`max` (`SequenceScrubber.vue:23-27`). The decorative marking is a decision about a *duplicate* presentation, not a quiet drop of information. The common failure — `aria-hidden` on the only element carrying the state — is avoided.

*Falsifier:* dead if neither alternate exposure existed, or if the playhead were interactive (it is `pointer-events: none`, `:30`).

### SUP-5 — Self-maintaining centring: `- 50%` beats the sibling's hand-synced margin

In `:46`'s `translateX(calc(… - 50%))`, the percentage resolves against the element's **own border-box width** — 2 px, so `-1px` — and stays correct for free if `width: 2px` (`:45`) ever changes. Contrast `.scrub-ball` (`SequenceScrubber.vue:159`): `margin-left: calc(var(--ball-size, 36px) / -2)`, which must be kept in sync with the size token by hand and silently mis-centres if the two drift. The playhead picked the form that cannot drift. (The comment at `:42` even names why.)

*Falsifier:* dead if `translateX` percentages resolved against the containing block rather than the element's own box — they resolve against the element's border box, which is why this works.

---

## 6 · Verdict

Not defective in the ways a 3-line component usually is: no leaks, no teardown gaps, no wrong types, no dead exports, no engine misuse in the *rendering* layer, and five things it does better than its own siblings. The defects are concentrated in one place and share one cause — **the component reconstructs, in literals, a geometry the layout engine already computes** (L-1, L-2, L-4), and then documents the reconstruction with comments that no longer match the code (L-7) or overstate it (L-8). L-3 is independent and is the sharpest single item: a documented z-ordering contract that cannot hold.

Nothing here blocks. **L-1 + L-2 + L-3 are one commit**: place `.seq-playhead-track` on the grid (`grid-column: 2; grid-row: 1 / -1`) exactly as `SequenceAxis` already does, delete the four inset literals, and resolve the z-token pair by removing whichever member is inert. That commit also retires L-4 and L-7. L-5, L-6 and L-9 are a second, smaller commit (register `--playhead-p`, fallback the `z-index`, drop the redundant JS clamp).
