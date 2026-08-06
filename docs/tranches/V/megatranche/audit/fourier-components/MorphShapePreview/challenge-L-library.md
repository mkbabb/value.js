claude-opus-5[1m]

# CHALLENGE — `MorphShapePreview` · axis L (LIBRARY)

**Target** `fourier-analysis/web/src/components/morph/MorphShapePreview.vue` (175 lines, read whole:
`:1-45` template · `:47-62` script · `:64-175` style = 45 / 16 / 112 — **64 % of the file is CSS**).

**Imports — the whole set is one line.** `MorphShapePreview.vue:48` →
`@/components/decorative/FourierMorphSvg.vue` (41). Read whole, plus everything that produces or
consumes its six props: `morph/FourierMorphDemo.vue` (330, the **sole** consumer) ·
`composables/useFourierMorph.ts` (230) · `composables/useMorphConfig.ts` (97) · `lib/svg-fourier.ts`
(154) · `lib/easings.ts` (127) · siblings `morph/HarmonicLevelGrid.vue` (286) +
`morph/MorphPhaseConfig.vue` (212) · `src/style.css:90-143` (the `cartoon-card` shim) ·
`src/router/index.ts:102-104` · producers `@mkbabb/glass-ui@4.0.0`
(`dist/styles/cards.css`, `dist/components/custom/metric-badge/MetricBadge.vue.d.ts`,
`dist/components/ui/badge/Badge.vue.d.ts`, `package.json#exports`,
`dist/styles/tokens/offsets-sizing.css`, `tokens/shadow.css`) + `@mkbabb/value.js` easing table
(`dist/easing.d.ts:94-96`) · the two shipped assets `assets/fourier-paths/{sun,moon}.json` · the gate
surface `web/package.json` + `e2e/{visual-baseline,visualization-ux}.spec.ts`.

**Posture** — assumed DEFECTIVE at open. Static + source-derived only; **no browser tooling**. Every
row carries severity, `file:line`, and its own falsifier; §D records the five claims whose falsifiers
**fired** and were withdrawn (L-18 runs both ways, and so does the falsifier). Two rows explicitly
**contradict** prior corpus where the live tree disagrees (§D-2, L-13).

**Verdict.** This is not a thin presentational leaf that happens to have blemishes. It is the **only
interactive control on the `/morph` route**, and its public contract makes that control unnameable,
unstyleable and unextendable from outside, while four of its six props are rendered as assertions of
fact that the render path contradicts on every single activation.
**2 BLOCKERS · 18 defects · 4 superlatives · 5 withdrawn.**

---

## §A — The component's own contract

### L-01 · **BLOCKER** · attribute fallthrough lands on the layout `<div>`, so the route's primary control ships nameless *and the obvious remedy is void*

The template root is `<div class="demo-stage">` (`:2`). `inheritAttrs` is not set (`:47-62` — the whole
`<script setup>` is 16 lines and contains no `defineOptions`), so it defaults to `true` and every
non-prop attribute a consumer passes lands on **that div**. The `<button>` is two levels down (`:4`).

The button carries **no `aria-label`, no `aria-labelledby`, no `title`, no text node** — its only
child is `<FourierMorphSvg>` (`:5-9`), whose own root `<svg>` carries no `<title>`, no `role` and no
`aria-label` (`FourierMorphSvg.vue:2-16`). Accessible-name computation therefore terminates with the
empty string: **the button that toggles sun↔moon, the one thing `/morph` exists to do, has no name.**

The defect is a *library* defect, not merely an authoring omission, because the contract offers no
route to a cure:

| remedy a consumer would reach for | what actually happens |
|---|---|
| `<MorphShapePreview aria-label="…" />` | lands on `.demo-stage`, a plain `<div>` with no `role` — ARIA prohibits naming a `generic` element, so the label is **discarded, not misplaced**. The button is still nameless and the author believes it is fixed. |
| a `label` / `ariaLabel` prop | none declared (`:50-57` — six props, all data) |
| a slot | none declared anywhere in the file |
| `v-bind="$attrs"` on the button | the component does not forward `$attrs`; nothing is exposed |

The rest of the `morph/` subtree proves this is an omission and not a register decision: every other
control in the same three files is labelled — `HarmonicLevelGrid.vue:23` and `:46`
(`aria-label="Low/High harmonic level"`), `MorphPhaseConfig.vue:27` (`aria-label="Duration (ms)"`).
`MorphShapePreview` is the **only unlabelled control in the subtree**, and it is the biggest one on
the screen (120 px → 180 px, `:92-93`, `:101-105`).

**Falsifier** — three ways this could have collapsed, all checked. (i) *A name from content:* the
subtree is `<button><svg><path/></svg></button>`; no text, no `<title>`. (ii) *An ancestor label:*
`FourierMorphDemo.vue:12-20` passes only the six props and `@toggle`; no `aria-*` anywhere in that
file. (iii) *A prior audit clearing it:* `docs/tranches/A/audit/W3-button-ledger.md:65` explicitly
**retired this site with rationale** from the A.W3 native-button migration — but the rationale is
purely visual ("the Button variants' default chrome would compete with the cartoon-card border"), and
retiring it from the migration is exactly what left it without `<Button>`'s labelling affordances.
The exemption is recorded; the name was never supplied. Claim stands.
*(The AX-tree exposure is engine-specific → **UNPROVEN-NEEDS-LIVE (SS-13)**. The source-level claims —
no name anywhere in the subtree, no prop/slot/forward to supply one, fallthrough targeting a
non-nameable element — need no browser and are what this row asserts.)*

**Why BLOCKER** — it is the sole control of a shipped route; it is unreachable by accessible name for
both assistive tech and any `getByRole("button", { name })` test; and the component's public surface
contains no mechanism by which a consumer could repair it without editing the component. A contract
whose most natural repair silently does nothing is a false guarantee at the library layer.

### L-02 · **BLOCKER** · `:disabled` during the animation destroys focus on every keyboard activation, with no restore

`:disabled="disabled"` (`:4`) is bound to `isAnimating` = `morph.phase.value !== "idle"`
(`FourierMorphDemo.vue:113, 18`). A keyboard user activates the button with Space/Enter → `handleToggle`
runs → `phase` becomes `"settle-out"` (`useFourierMorph.ts:169`) → `isAnimating` flips true → **the
element the user is standing on becomes `disabled` while focused**. HTML's focus fixup rule blurs it
and moves focus to the body. Nothing restores it: `grep -rn "focus\|tabindex" src/components/morph/`
returns four hits, all of them `:focus` *style* rules or slider `aria-label`s
(`HarmonicLevelGrid.vue:202`, `MorphPhaseConfig.vue:188`, `:23`, `:46`) — **zero** `focus()` calls,
zero `tabindex`, zero focus-restoration in the entire subtree.

Duration is user-controlled and large: each of the three phases is a slider with `min=50 max=800`
(`MorphPhaseConfig.vue:14-15` on the number input, `:23-24` on the `Slider`), so the disabled window
runs **350 ms by default and up to 2 400 ms**. The keyboard user's next `Tab` restarts from the top of the document, every time.

The correct expression of "busy, don't re-enter" on a control the user is standing on is
`aria-disabled` + `aria-busy` (which do not remove focus) with the re-entrancy guard in the handler —
and **the guard already exists**: `FourierMorphDemo.vue:128` opens `handleToggle` with
`if (isAnimating.value) return;`. The `disabled` attribute is therefore a *redundant* second guard
that buys nothing and costs focus. `cursor: wait` (`:119`) shows the author meant "busy", not "inert",
and reached for the wrong primitive.

**Falsifier** — (i) if the handler had no guard, `disabled` would be load-bearing; it has one
(`:128`). (ii) If anything restored focus, the cost would be bounded; nothing does (grep above).
(iii) If the window were sub-frame, it would be academic; it is 350–2 400 ms by the sliders' own
bounds. (iv) If pointer users were the only reachable path — no: the button is a native `<button>`, so
it is in the tab order by construction. Claim stands. *(The exact post-blur focus target is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the blur itself is spec behaviour, and the "no restore" half is a
grep result.)*

**Why BLOCKER** — it fires on **100 % of keyboard activations** of the route's only control, it is
caused by the component's own prop wiring rather than by a consumer's misuse, and the cheaper correct
primitive is already available with the guard already in place.

### L-03 · MAJOR · `phase: string` — the discriminated union exists, is exported, and is thrown away at the boundary

`useFourierMorph.ts:31` exports `export type MorphPhase = "idle" | "settle-out" | "morph" |
"settle-in"`, and `phase` is typed `Ref<MorphPhase>` at `:79`. `MorphShapePreview` declares
`phase: string` (`:52`). The union is discarded at exactly the point where it is load-bearing, because
the same value is used **twice, for two different purposes**:

1. as user-facing text — `{{ phase }}` (`:15`, `:32`);
2. as a **CSS class selector** — `:class="phase"` (`:14`, `:31`), matched by
   `.info-chip.settle-out, .info-chip.settle-in` (`:165-166`) and `.info-chip.morph` (`:171`).

So a rename in the composable (`"settle-out"` → `"settleOut"`, say) type-checks clean at both ends and
silently drops the tint on two of the four states, with `vue-tsc` — the repo's *primary* gate, vitest
being absent (§B, L-16) — seeing nothing. The `string` type also admits `phase="idle "` or
`phase="foo bar"`, both of which inject arbitrary class names onto the chip.

**Falsifier** — this collapses if the union were unimportable (it is exported at `:29-31` and already
imported by nothing) or if the class binding were derived rather than raw. Neither: `:class="phase"`
is the raw prop. It also collapses if some CSS rule covered every member — `.info-chip.idle` has **no
rule**, so the default state is the unstyled branch and a typo would look exactly like `idle`. Claim
stands.

### L-04 · MAJOR · the unrolled loop — 8 chips for 4 facts

`:13-26` and `:30-43` render the same four chips **twice, byte-identical modulo the wrapper class**,
toggled by `display:none` media queries (`.desktop-info` `:124-126`, `.mobile-info` `:128-133`,
flipped at `:135-145`). Diffed line-for-line:

| chip | desktop | mobile | identical? |
|---|---|---|---|
| phase | `:14-16` | `:31-33` | yes (same `:class="phase"`, same interpolation) |
| `n=` | `:17-19` | `:34-36` | yes |
| shape | `:20-22` | `:37-39` | yes |
| `ms` | `:23-25` | `:40-42` | yes |

Three consequences, each independently checkable:

- **Per-tick VDOM work is doubled on the hot path.** During a morph, `currentPath`, `phase` and
  `harmonicLevel` all change every tick (`useFourierMorph.ts:174-176, 189-190, 203-205`), so the parent
  re-renders and this child's render function re-runs; eight text vnodes are created and diffed where
  four would do, plus a duplicated `:class` binding. *(DOM **writes** are still coalesced by Vue's text
  diff — I am claiming vnode/diff work, not `setText` calls; see §D-1 for the version of this claim
  that did not survive.)*
- **It breaks the canonical test idiom.** `page.getByText("n=50")` resolves **two** nodes → Playwright
  strict-mode violation. `getByText` does not filter on visibility. Any future gate on this row has to
  know about the duplication and write `.first()`.
- **It is avoidable with zero content change.** The two placements differ only in DOM ancestry
  (desktop-info sits inside `.stage-row` `:3`, mobile-info is its sibling `:30`) and in
  `flex-direction` + `gap`. `.demo-stage` is *already* a column (`:69-72`); switching `.stage-row` to
  `flex-direction: column` below 640 px with a single `.demo-info` inside reproduces the mobile layout
  exactly (wrapped, centred, below the button) — one block, one media query on the container.

**Falsifier** — the duplication would be *required* if (i) content differed, (ii) order differed, or
(iii) the layouts were not reachable from one DOM. (i) and (ii) are refuted by the diff above; (iii)
by the reconstruction above. One more falsifier **partially fired** and is recorded at §D-1. Claim
stands, at reduced blast radius.

### L-05 · MINOR · the native `<button>` declares no `type`, so it defaults to `submit`

`:4` — `<button class="morph-button cartoon-card" @click="…" :disabled="disabled">`. No `type`.
HTML's default is `type="submit"`. Inside any `<form>` ancestor, clicking the shape toggle would
attempt a form submission. The repo knows the rule and applies it exactly once:
`ImageUpload.vue:94` is the **only** `type="button"` in `src/` (`grep -rn 'type="button"' src/` → 1
hit), against 8 native `<button>` sites.
**Falsifier** — latent, not live: `/morph` mounts `FourierMorphDemo.vue` (`router/index.ts:102-104`)
whose template (`:1-82`) contains no `<form>`, and no ancestor in `App.vue`/`AppHeader.vue` does
either. **MINOR, not MAJOR**, precisely because the falsifier constrained it — but a component whose
button is designed to be dropped into arbitrary consumers must not depend on its consumers having no
forms.

### L-06 · MINOR · six scalar props where two would do, and one of them is derivable from another

`:50-57` declares `currentPath, phase, harmonicLevel, shapeName, totalMs, disabled` — all required,
none defaulted. Two structural problems:

- **`disabled` is a function of `phase`.** The sole consumer computes it as
  `phase !== "idle"` (`FourierMorphDemo.vue:113` → `:18`). Two props encode one fact, and nothing
  prevents a consumer passing `phase="morph"` with `disabled=false` — an unrepresentable state made
  representable by the contract. (L-02 is what that redundancy costs.)
- **Four of the six exist only to be printed into identical chips.** `harmonicLevel`, `shapeName`,
  `totalMs` and `phase` differ from one another in nothing but their label and tint. A single
  `chips: { text: string; tone?: MorphPhase }[]` prop, or a slot, collapses the surface from six props
  to two and makes the component extensible; today, adding a fifth metric costs one prop plus **two**
  template edits (L-04).

`disabled: boolean` is also required with no default, so every consumer must state it even to say
"never busy".
**Falsifier** — the six-prop shape would be right if the chips were heterogeneous (different markup
per prop) or if `disabled` and `phase` could legitimately diverge. Diffing `:14-25`: one `<div
class="info-chip">` per prop, identical but for the `:class` on the first. And `disabled` has exactly
one producer, which derives it from `phase`. Claim stands.

### L-07 · MINOR · presentation logic is split across the boundary, in both directions

The parent rounds — `:harmonic-level="Math.round(morph.harmonicLevel.value)"`
(`FourierMorphDemo.vue:15`) — while the child appends the unit — `{{ totalMs }}ms` (`:24`, `:41`) — and
the child's own type says `harmonicLevel: number` (`:53`), which happily accepts the *unrounded* float
the composable actually holds (`useFourierMorph.ts:174` writes a continuous `level`). A second consumer
that forgets the `Math.round` gets `n=23.457812999` in a chip sized `white-space: nowrap`
(`:155`). Formatting a value for display is the leaf's job or the parent's, not half each.
**Falsifier** — if the prop were typed `harmonicLevel: string` (pre-formatted) or the child rounded, the
split would close. Neither. Claim stands, and note that this is the *narrow* form of L-09/L-10/L-11,
which are the same boundary failing on semantics rather than formatting.

### L-08 · INFO · the state-machine token is the user-facing label

`{{ phase }}` (`:15`, `:32`) prints `settle-out` / `settle-in` / `morph` / `idle` verbatim. There is no
label map anywhere in the chain (`grep -rn "settle-out" src/` → `useFourierMorph.ts:169` and
`MorphShapePreview.vue:165` only — one producer, one CSS selector, zero display strings). The chip is
the most prominent status text on the route and it reads in the vocabulary of the implementation.
**Falsifier** — a `LABELS` record or an i18n call anywhere in the chain would refute it. There is
none; the app has no i18n layer at all. Claim stands (INFO — presentational, no functional loss).

---

## §B — The render path, and the four facts the chips get wrong

**Provenance for the architecture frame.** `CENSUS-2026-08-03.md §3a` (lines 84-87): *"Canvas2D
throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw
off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG
surfaces [FE §6]"*, elaborating `lane-frontend.md:512-565` (§6 *Visualization architecture — the render
path*, Paths A/B/C at `:516`, `:558`, `:561`; the SVG list at `:564`).

**Where this component sits: outside all three canvas paths, and outside the census's SVG list too.**
`MorphShapePreview` touches the viz render path only as the *host* of a delegated SVG — it contains no
`<svg>` element of its own, only `<FourierMorphSvg>` (`:5-9`). Its clock is a fourth, undocumented one:
the keyframes `Animation` inside `useFourierMorph.ts:127-143`, which is neither `stores/animation.ts`'s
gated rAF (Path A) nor `ConvergencePlot`'s ungated rAF (Path B) nor a watcher (Path C). The sibling
challenge `../FourierMorphSvg/challenge-L-library.md` L-05 establishes that this fourth clock is
**not** off-screen-gated despite `lib/scheduler.ts:13-15` asserting that it is; I fold that finding
rather than re-derive it, and add only what is new here (L-18).

### L-09 · MAJOR · the `shapeName` chip is ahead of the picture by up to 800 ms, on every toggle

`handleToggle` (`FourierMorphDemo.vue:127-135`):

```ts
const from = isMoon.value ? moonShape : sunShape;
const to   = isMoon.value ? sunShape  : moonShape;
isMoon.value = !isMoon.value;          // ← flips SYNCHRONOUSLY, line 132
await morph.morphTo(from, to);         // ← the picture starts changing here, line 134
```

`currentShapeName` is `computed(() => isMoon.value ? "Moon" : "Sun")` (`:103`) and is passed straight
into `:shape-name` (`:16`). So the chip flips to the **destination** name on the click tick, while
Phase 1 (`settle-out`) is still rendering the **source** shape at declining fidelity for the whole
`settleOutMs` window (`useFourierMorph.ts:169-179`, interpolating `from`). The label says "Moon" while
the SVG unambiguously draws the sun.

Window: `settleOutMs` default 150 ms, **max 800 ms** (`MorphPhaseConfig.vue:14-15`), plus the
`morphMs` cross-fade during which the claim is merely ambiguous rather than false. Same instant, the
same flip pushes `currentShape` (`:104`) into `HarmonicLevelGrid` (`:59`), so all twelve grid previews
swap to the destination shape too while the hero still shows the source — the desync is route-wide, not
chip-local.

**Falsifier** — this collapses if the flip were deferred past the await, or if `settle-out` already
rendered the destination. Neither: `:132` precedes `:134`, and `useFourierMorph.ts:175` interpolates
`from` for the whole of Phase 1, with `activeShape = to` not assigned until `:197`. It would also
collapse if the chip were captioned as a target rather than a state — it is not; it sits in the same
undifferentiated chip row as the live `phase` and live `n` (L-17). Claim stands.

### L-10 · MAJOR · the `n=` chip can display a harmonic level the SVG is provably not at — including a **negative** one

Two facts compose.

**(i) Display is unclamped; render is clamped.** `useFourierMorph.ts:171-177`:

```ts
const level = highLevel + (lowLevel - highLevel) * t;
harmonicLevel.value = level;                                              // ← displayed, RAW
currentPoints.value = interpolateAtHarmonicLevel(from, Math.max(lowLevel, level));  // ← rendered, CLAMPED
```

and symmetrically at `:202-204` with `Math.min(highLevel, level)`. The clamp is applied to the picture
and **not** to the number `MorphShapePreview` prints.

**(ii) `t` is not confined to [0, 1].** `t = easeOut(tRaw)` (`:172`) where `easeOut = getEasingFn(
settleOutEasing)` (`:162`) resolves from `EASING_PRESETS` (`lib/easings.ts:55-60`), which is built from
`value.js`'s `timingFunctions` over a 22-name catalogue including `ease-in-back`, `ease-out-back` and
`ease-in-out-back` (`easings.ts:34-36`) — all three user-selectable from the phase `Select`
(`MorphPhaseConfig.vue:36-59`). Those are overshoot beziers; `value.js/dist/easing.d.ts:94-96` gives
the control points, and sampling the cubic at 2×10⁵ points gives the extrema:

| preset | control points (`easing.d.ts:94-96`) | extremum |
|---|---|---|
| `ease-out-back` | `[0.175, 0.885, 0.32, 1.275]` | **max y = 1.0869** |
| `ease-in-back` | `[0.6, -0.28, 0.735, 0.045]` | **min y = −0.0969** |
| `ease-in-out-back` | `[0.68, -0.55, 0.265, 1.55]` | max 1.0927 / min −0.0927 |

Composing, with the **shipped defaults** `lowLevel: 5, highLevel: 50`
(`useFourierMorph.ts:63-64`) and settle-out on `ease-out-back`:

> `level = 50 + (5 − 50)(1.0869) = 1.09` → `Math.round` → chip reads **`n=1`**, while the render is
> `interpolateAtHarmonicLevel(from, Math.max(5, 1.09))` = **n=5**.

With `ease-in-back` the sign flips: `level = 50 + (5 − 50)(−0.0969) = 54.36` → chip reads **`n=54`**,
above the configured maximum *and* above the data (§L-11). And at the bounds the sliders themselves
permit — `lowLevel` min 1 (`HarmonicLevelGrid.vue:12, 20`), `highLevel` max 100 (`:35, 44`):

> `level = 100 + (1 − 100)(1.0869) = −7.60` → `Math.round(−7.60)` → the chip renders **`n=-8`**.

A negative harmonic count, printed as fact, next to a picture at n=1.

**Falsifier** — four ways out, all checked. (i) *The back presets might not be selectable:*
`EASING_PRESET_NAMES` is `Object.keys(EASING_LABELS)` (`easings.ts:62`) and `MorphPhaseConfig.vue:42`
does `v-for="name in easingNames"` — all 22 render as options. (ii) *`getEasingFn` might drop them:*
`easings.ts:66` returns `EASING_PRESETS[name]?.fn ?? linear`, and the three back names are keys of
`EASING_LABELS`, so they resolve. (iii) *`value.js` might clamp its bezier output:* the d.ts documents
Newton-Raphson solving of `X(t)=x` (`easing.d.ts:35`) with the raw control points quoted above — a
clamp would make the `back` family indistinguishable from `ease-out`, i.e. would make three catalogue
entries dead; **this half is UNPROVEN-NEEDS-LIVE (SS-13)** since I did not execute the function, and
it is the single load-bearing assumption of this row. (iv) *The default easing is `linear`
(`useFourierMorph.ts:65-67`), so nothing overshoots out of the box:* true — the row requires one
Select change, which is the entire purpose of the screen ("Tune the morph transition",
`FourierMorphDemo.vue:7`). Claim stands as MAJOR, with (iii) flagged.

### L-11 · MAJOR · the chip reads `n=75` / `n=100` while the shipped data tops out at **50** — reachable in one click from the default state

Measured directly from the assets:

```
sun.json  levels = [1,2,3,5,8,12,18,25,35,50]  partial_sums keys = same 10  n_harmonics = 50  512 pts/level
moon.json levels = [1,2,3,5,8,12,18,25,35,50]  partial_sums keys = same 10  n_harmonics = 50  512 pts/level
```

`interpolateAtHarmonicLevel` clamps to that range: `Math.max(levels[0], Math.min(maxLevel, harmonicLevel))`
(`svg-fourier.ts:131`), `maxLevel = 50`. But three independent surfaces offer levels above it:

- `computePreviewLevels` hard-codes the candidate set `[1,2,3,5,8,12,18,25,35,50,75,100]`
  (`useMorphConfig.ts:30`) — **unconditionally**, with no reference to `shape.data.levels`. Two of the
  twelve grid cells are therefore beyond the data.
- the `highLevel` number input and slider run to `max="100"` (`HarmonicLevelGrid.vue:35, 44`), and
  `emitHigh` clamps to 100, not to `levels[levels.length-1]` (`:115`).
- `handlePreviewClick(75)` (`FourierMorphDemo.vue:137`) sets `highLevel = 75` (`:146`) and calls
  `morph.setLevel(currentShape.value, 75)` (`:172`) → `harmonicLevel.value = 75`
  (`useFourierMorph.ts:100`) → **`MorphShapePreview` prints `n=75`** while
  `interpolateAtHarmonicLevel(shape, 75)` returns exactly the n=50 point array.

The cells at n=50, n=75 and n=100 in `HarmonicLevelGrid` therefore render **three identical
previews** (`getPath(level)` `:129-132` funnels through the same clamp), and every subsequent morph
reports its "full fidelity" terminus as 75 or 100.

**Falsifier** — this dies if any layer bounded the level to the data. Checked all four: the composable
does not (`useFourierMorph.ts:98-104` assigns `level` verbatim); the config does not
(`useMorphConfig.ts:27-39` never sees a shape); the grid does not (`:115` clamps to the literal 100);
the demo does not (`FourierMorphDemo.vue:146` assigns the clicked level). The only clamp is inside
`interpolateAtHarmonicLevel`, i.e. on the *picture only* — which is precisely the defect. It would also
die if the JSON carried levels above 50; measured above, it does not. Claim stands.

### L-12 · MAJOR · the local `transition` shorthand clobbers the producer's, so the cartoon hover-lift snaps instead of springing

`.morph-button` composes the local scoped class with the `cartoon-card` utility (`:4`), which the app
re-mints as `@utility cartoon-card { @apply cartoon-surface; … }` (`style.css:107-111`) over glass-ui's
`cartoon-surface` (`glass-ui/dist/styles/cards.css:33-48`):

```css
@utility cartoon-surface {
    border-width: 2px;
    box-shadow: var(--shadow-cartoon-md);
    translate: 0;
    transition: translate var(--duration-normal) var(--spring-smooth),
                box-shadow var(--duration-normal) var(--ease-standard);
    &:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm); box-shadow: var(--shadow-cartoon-lg); }
}
```

`MorphShapePreview.vue:97` then declares, in the SFC's scoped block:

```css
transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
```

`transition` is a shorthand, so this **resets `transition-property` wholesale** to those three;
`translate` is no longer among them. And the scoped rule wins the cascade unconditionally: Tailwind v4
compiles `@utility` into `@layer utilities`, while Vue's scoped `<style>` is emitted **unlayered**, and
unlayered normal declarations beat every layered one regardless of specificity.

Net: on hover the button performs the producer's `translate: -1px -1px`
(`glass-ui/dist/styles/tokens/offsets-sizing.css:10`) **instantly**, while the local
`transform: scale(1.02)` (`:111`) eases over 150 ms and the shadow swap runs on `0.2s ease` instead of
the producer's `--duration-normal`/`--ease-standard`. One hover, three motions, three different
clocks, one of them a hard snap. This is the mechanism behind the M-critique row
`docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json:2473` ("hover border-color + box-shadow
hand-rolled outside glass ladder") — which named the *duplication* but not the *clobbering*.

**Falsifier** — three exits, all closed. (i) *Longhands would compose:* the file uses the shorthand
(`:97`). (ii) *The layer order might favour the utility:* it cannot — unlayered outranks layered by
spec, and even ignoring layers, `.morph-button[data-v-…]` (0,2,0) outranks `.cartoon-card` (0,1,0).
(iii) *`translate` might be transitioned by some other rule:* `grep -n "translate" MorphShapePreview.vue`
→ no hits. Claim stands. *(The perceived snap is **UNPROVEN-NEEDS-LIVE (SS-13)**; the property-reset and
the cascade order are static.)*

### L-13 · MINOR · **no `border-radius` reaches this button from any of its three style sources** — contradicting a prior audit row

Enumerated exhaustively:

| source | declares `border-radius`? |
|---|---|
| the scoped block, `:91-120` | **no** (`grep -n "border-radius" MorphShapePreview.vue` → exactly **1** hit in the whole file, `:152`, and it is `.info-chip`'s) |
| `@utility cartoon-card`, `style.css:107-111` | **no** — it sets `border-color` and `background` only |
| `cartoon-surface`, `glass-ui/dist/styles/cards.css:33-48` | **no** — border-width, box-shadow, translate, transition, hover |
| any global `button` rule | **none exists** — `grep -n "button" src/style.css` → 0 hits; no `button {}` rule in glass-ui's shipped CSS |

So the 120/180 px morph button is the one **square-cornered** surface on a route where every neighbour
is rounded: `.grid-cell` `0.5rem` (`HarmonicLevelGrid.vue:235`), `.level-input` / `.num-input`
`0.375rem` (`HarmonicLevelGrid.vue:184`, `MorphPhaseConfig.vue:171`), `.btn-export` / `.btn-reset`
`0.5rem` (`FourierMorphDemo.vue:291`, `:315`), and this file's own `.info-chip` `0.375rem` (`:152`).

**Contradiction with the corpus, explicit.** `docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json:2343`
states *"MorphShapePreview.vue: `.morph-button` has border-radius **inherited only from cartoon-card**"*.
The live tree refutes it: the `cartoon-card` shim landed at D.W4.a carries no radius, and neither does
the `cartoon-surface` it `@apply`s. The correct statement is *no radius at all*, which makes the row's
sibling conclusion (near-square inputs) an understatement for this one site.
**Falsifier** — one `border-radius` in any of the four rows above. Grepped all four; none. Claim
stands. *(Primarily a D-axis consequence; recorded here because the finding is a static
cascade-enumeration and because it corrects a corpus row.)*

### L-14 · MINOR · a hand-rolled chip where the producer ships four — and the app already imports one of them in seven files

`glass-ui@4.0.0`'s `package.json#exports` includes `./badge`, `./metric-badge`, `./metric-cell`,
`./metric-stack`, `./icon-chip`, `./toggle-chip`. `MetricBadge`'s prop table
(`dist/components/custom/metric-badge/MetricBadge.vue.d.ts`) is a near-exact fit for three of the four
chips:

| chip | hand-rolled | producer equivalent |
|---|---|---|
| `n={{ harmonicLevel }}` (`:18`) | `<div class="info-chip">` + `font-family: var(--font-mono)` (`:148`) | `<MetricBadge :value="harmonicLevel" label="n" label-position="inline" />` — ships tabular-nums + the size ladder |
| `{{ totalMs }}ms` (`:24`) | manual unit concatenation | `<MetricBadge :value="totalMs" unit="ms" />` |
| `{{ phase }}` tinted (`:14`, `:165-174`) | two hand-rolled `color-mix` rules | `MetricBadge`'s `color` prop, or `<Badge variant>` |

The app is already a fluent consumer: `grep -rln "glass-ui/metric-badge" src/` → **exactly seven files**
(`equation/EquationView`, `equation/InfoCard`, `visualization/AnimationControls:10`,
`visualization/EditorControlsDock:5`, `visualization/EquationPanel:12`,
`gallery/GalleryAdminBanner:5`, `gallery/GalleryDraftsSection:8`), plus `Badge` at
`gallery/GalleryCard:4` — reproducing the census's `§2 C-4` correction exactly ("Budget 7 files for the
`./metric` cure"), which I re-measured rather than inherited. `GalleryAdminBanner.vue:96` even carries
the comment *"`<MetricBadge>` ships its own
tabular-nums + stacked geometry"*. `MorphShapePreview` is the sole site in the app that re-hand-rolls
the recipe, and it does so with a *third* spelling of the mono font: `.fira-code` is a glass-ui utility
used by both siblings (`HarmonicLevelGrid.vue:15, 38`, `MorphPhaseConfig.vue:17, 19`), while this file
writes `font-family: var(--font-mono)` (`:148`).

**The sharpest part**: `MetricBadgeProps.abbreviation` documents *"When both `label` and `abbreviation`
are set the library renders BOTH siblings; consumer container-query CSS toggles which is visible …
**The library itself never branches on viewport**"* — i.e. the producer ships a considered answer to
precisely the responsive-label problem that L-04's DOM duplication hand-rolls with two media queries.
**Falsifier** — the hand-roll would be justified if the producer's chip could not express the need.
Read the prop table: `value`, `unit`, `label`, `abbreviation`, `labelPosition`, `color`, `placeholder`,
`size`, `class` — the fourth chip (`shapeName`, a bare word) is the only one that is a `Badge` rather
than a `MetricBadge`, and `./badge` ships too. It would also be justified under the pending 4→7 uplift
if the subpaths were being retired — the census lists the retirements (`§3a` "removed subpaths in live
use: `metric-badge` ×7 files") so `metric-badge` **is** on the removal list; that makes this a
*converge-during-the-uplift* row rather than an *adopt-now* row, and I reduce it to MINOR on that
ground. Claim stands at MINOR.

### L-15 · MINOR · Goldilocks — 175 lines, 64 % CSS, two concerns

The file is a **stage layout** (`.demo-stage`, `.stage-row`, `.morph-button` — `:69-120`, 52 lines) and
a **chip primitive** (`.desktop-info`/`.mobile-info`/`.info-chip` — `:122-174`, 53 lines) welded
together, for 45 lines of template of which **31 lines are the duplicated chip blocks** (L-04). Unique
content is roughly 24 lines. The chip half is exactly what L-14 says already exists upstream; the stage
half is genuinely local. Splitting is not obviously right (the two halves have one consumer and no
independent reuse), but the *ratio* is the tell: a component that is 63 % CSS, half of it re-deriving a
producer primitive, is carrying weight that isn't its own.
**Falsifier** — if the CSS were irreducibly local it would just be a big leaf. It is not: L-04 removes
~31 template lines and ~20 CSS lines, L-14 removes the chip block, L-13/L-12 replace hand-rolled hover
chrome with the producer's. The residue is ~60 lines. Claim stands (MINOR — a size symptom of L-04 and
L-14, not an independent defect; recorded so the tally is not double-counted as severity).

### L-16 · MINOR · nothing gates any of §A or §B

- **vitest is ABSENT.** `web/package.json` scripts are exactly `dev`, `build` (`vue-tsc -b && vite
  build`), `preview`, `test:e2e`, `test:e2e:ui`; devDependencies contain no unit runner. Corroborates
  `CENSUS §3a` / `lane-frontend`'s "the only frontend gates are `vue-tsc` + Playwright on a single
  chromium project".
- **`/morph`'s sole e2e is a capture harness.** `e2e/visual-baseline.spec.ts:35` lists
  `{ slug: "morph", path: "/morph" }`; the test screenshots to disk and its **only** `expect` is a
  horizontal-overflow gate (`:65-68`, `overflow ≤ 2`). L-09's wrong label, L-10's negative `n`, L-11's
  `n=100`, L-02's focus loss and L-01's missing name all pass it. It also sets
  `emulateMedia({ reducedMotion: "reduce" })` and `animations: "disabled"`, so the animated states are
  the ones it can never capture.
- **axe never visits this route.** `@axe-core/playwright` is wired in exactly two specs
  (`visualization-ux.spec.ts`, `visualization-crud.spec.ts`), and the former's only navigation is
  `page.goto("/visualize")` (`:47`). The `button-name` violation L-01 describes is in an
  axe-instrumented repo that does not point axe at the route.

**Falsifier** — any unit test, any `toHaveScreenshot` baseline, or any axe run touching `/morph` would
refute it. `grep -rn "morph" e2e/` returns **one** line: the capture-list entry above. Claim stands.

### L-17 · INFO · config-echo and live state share one undifferentiated chip row

`totalMs` is `morphConfig.totalMs.value` (`FourierMorphDemo.vue:17`) — a *config* sum
(`useMorphConfig.ts:47-49`), not a measurement — while `phase` and `harmonicLevel` beside it are live
per-tick state. `morphTo` destructures the durations **once**, at `useFourierMorph.ts:151-160`, after
awaiting the engine; the phase sliders are not disabled during an animation
(`FourierMorphDemo.vue:26-54` — no `:disabled` on any `MorphPhaseConfig`), so dragging one mid-morph
updates the `ms` chip while the running animation keeps the captured durations. Four chips, identical
chrome, three different epistemic statuses (live, config, and — per L-09 — *intended*).
**Falsifier** — if the chips were visually distinguished, or if the config were locked during the
animation, the conflation would be authored rather than accidental. `.info-chip` is one rule (`:147-156`)
with one tint variant; no `MorphPhaseConfig` is disabled. Claim stands (INFO — no wrong value on its
own; it is the frame that makes L-09/L-10/L-11 read as fact).

---

## §C — The R5-7 template-loop invisibility class, applied

Cited rows: `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125` (**R5-7**, ADOPT-AS-FACT +
CARRY→F.W4) — *"template-loop evidence keyed to **component** callsites is blind to native HTML
element loops"* — and its cure, `:139-140` (**R6-5**, the `NATIVE_TEMPLATE_LOOP` family, GREEN 11/11,
`baselinePaperRowCount: 3` at `PaperSidebar.vue:65/87/105`). Posture per `:152` (**X-1**): the Codex
authority is dead, the *measurements* are live — so the derivation-model defect is the reusable part,
and that is what I apply.

**Does R5-7's original form bite here?** No. `MorphShapePreview.vue` contains **zero `v-for`**
(`grep -n "v-for" MorphShapePreview.vue` → no hits). Stated so the negative is on the record.

But the file is the class's **second and third faces**, and the F.W4 carry ("a per-component D/L/C
audit must count native element loops or it will inherit exactly this blind spot") needs both:

**Face 2 — the *unrolled* loop (L-04).** R6-5's cure counts native `v-for`. A **manually unrolled**
loop presents as N independent static leaves with *no loop evidence of any kind* — no component
callsite (R5's key), no `v-for` expression (R6's key). `MorphShapePreview.vue:13-43` is exactly that:
one 4-element loop, written out twice, as **eight** hand-authored `<div>`s. Both derivations report
`loops: 0` and both are right by their own definition and wrong about the tree. The generalisation for
F.W4: *loop evidence keyed to loop **syntax** is blind to repetition expressed as duplication* — and
duplication is what authors reach for when the two arms differ in placement rather than content.

**Face 3 — the same blindness in the census's own SVG enumeration.** `lane-frontend.md:564` enumerates
"**SVG surfaces (12 files)**": `SvgFilters` · `FourierMorphSvg` · `ui/PathPreview` ·
`ContourEditorCanvas` · `ContourPreview` · `EasingCurvePreview` · `morph/{FourierShapeExtractor,
HarmonicLevelGrid, MorphPhaseConfig}` · `equation/{EquationView, convergence/ConvergenceTimeline}` ·
`visualization/AnimationControls`. **`MorphShapePreview` is absent from that list** — because the
evidence is keyed to the literal `<svg>` token, and this component *delegates* its SVG to a child
(`:5-9`). The consequence is exactly R5-7's shape one tier over: the file that **hosts the largest SVG
on the route** (120 → 180 px, against `HarmonicLevelGrid`'s 48 → 64 px cells,
`HarmonicLevelGrid.vue:262-272`) is invisible to a file-keyed SVG census. The count of 12 is correct as
a *file* count and I do not contradict it; what I add is that component-delegated SVG hosts form a
fourth uncounted category alongside R5-7's native loops and Face 2's unrolled loops.

### L-18 · INFO · the instance arithmetic, stated exactly

For F.W4's denominators, `/morph`'s chip-and-shape surface at defaults:

| artifact | mechanism | derivation key that sees it | count |
|---|---|---|---|
| `MorphShapePreview` | component callsite (`FourierMorphDemo.vue:12`) | component | 1 |
| `FourierMorphSvg` inside it | component callsite (`:5`) | component | 1 |
| info chips | **unrolled**, `:13-26` + `:30-43` | **none** (Face 2) | **8** |
| grid preview SVGs | native `<svg>` inside `v-for` on a `<Button>` (`HarmonicLevelGrid.vue:55, 66`) | `NATIVE_TEMPLATE_LOOP` (R6-5) | **12** |

The 12 is exact, not estimated: `levels` is `morphConfig.previewLevels` (`FourierMorphDemo.vue:60`) =
`computePreviewLevels` (`useMorphConfig.ts:27-39`), whose candidate literal set has 12 members and
whose two additions (`lowLevel: 5`, `highLevel: 50`, `useFourierMorph.ts:63-64`) are already members,
so the `Set` stays at 12 — and two of those twelve are the beyond-the-data cells of L-11.
**Falsifier** — the 8 would be 4 if the blocks differed (refuted, L-04); the 12 would move if the
candidate list were data-derived (refuted, `useMorphConfig.ts:30` is a literal). Claim stands.
*(Whether all are simultaneously in the viewport is UNPROVEN-NEEDS-LIVE; they are all mounted and
patched regardless, which is what the count is about.)*

---

## §D — Claims withdrawn (falsifiers that fired)

Recorded because a challenge that only reports survivors is not a challenge.

- **D-1 · "The duplicated chips double the per-frame DOM writes and are announced twice by screen
  readers."** My opening headline for L-04. Both halves failed. *(a)* `display: none` prunes the
  subtree from the accessibility tree entirely, so there is no double announcement — the hidden arm is
  invisible to AT by construction. *(b)* Vue's `setElementText` fast path compares the incoming string
  and skips unchanged text, so unchanged chips cost a comparison, not a write; and `phase` changes 3×
  per morph, not per tick. **Withdrawn on both counts.** The residue that survives is narrower and is
  what L-04 now claims: doubled *vnode creation and diff* work on the hot path, plus the Playwright
  strict-mode consequence, plus the pure duplication.
- **D-2 · "`.cartoon-card` is a dead class, so the button renders flat and borderless."** This was the
  **headline finding for this exact file** in the 2026-05-27 D-audit
  (`docs/audits/runs/2026-05-27-D-audit/design/DA-design-A4-equation-morph-chrome.md:48-49`, rows #1
  and #2 — *"`.morph-button` has no resting border; its `:hover` then sets `border-color` … the ring
  snaps in abruptly"*), live-confirmed there with `getComputedStyle` → `border-width: 0px`.
  **The live tree refutes it now:** `web/src/style.css:98-111` ships the D.W4.a
  `@utility cartoon-card` shim, and glass-ui 4.0.0 still defines `cartoon-surface`
  (`dist/styles/cards.css:33`). The resting 2 px border and the offset-stamp shadow are back.
  **Withdrawn — and the prior corpus row is SUPERSEDED, not merely aged.** Two residues survive and are
  filed separately: the radius that no source supplies (L-13) and the transition clobbering that the
  restoration *introduced* (L-12 — the shim gave the button a `translate` lift that the local
  shorthand then de-animates; the cure created the new defect).
- **D-3 · "The empty-path chain makes this button invisible, as it does `DarkModeToggle`."** The
  sibling challenge's L-06 traces five silent degradations ending in `<path d="">` and concludes
  "an entirely **invisible interactive control**". That conclusion is `DarkModeToggle`-specific
  (`border: 0; background: transparent`). Here the button is a 120/180 px box with a 2 px border and a
  `var(--card)` fill from the shim (`style.css:109-110`), so an empty `d` yields an **empty frame**,
  not an invisible control. **Withdrawn for this consumer** — recorded as an explicit narrowing of the
  sibling row rather than a contradiction of it.
- **D-4 · "The child `<svg>` is unsized and will collapse."** `FourierMorphSvg` sets no
  `width`/`height` attribute and its scoped block sets none (`FourierMorphSvg.vue:36-40`). But the
  button is a fixed square with `box-sizing: border-box` (Tailwind preflight), so the content box is
  deterministic: `120 − 2×2px border − 2×0.625rem padding` = **96 px** below the breakpoint and
  `180 − 4 − 2×1rem` = **144 px** above it (`:92-96`, `:101-105`), and SVG2 auto-sizing fills it at 1:1.
  **Withdrawn.** The residue — that the leaf declares no size and the parent's only size lever is a
  hard-coded px pair which a consumer cannot reach (fallthrough goes to the stage div, L-01) — folds
  into L-01/L-06.
- **D-5 · "The scoped `.morph` / `.settle-in` classes will collide with global rules."**
  `:class="phase"` writes bare, generic class names onto the chips (`:14`, `:31`). But Vue's scoped
  compilation emits `.info-chip.morph[data-v-…]`, and the class is only ever *matched* inside this
  file. **Withdrawn.** The residue — that a `string` prop is simultaneously display text and a CSS
  selector with no type protecting the coupling — survives as L-03.

---

## §E — Superlatives (L-18, the other direction)

Each carries a falsifier on the same terms as the defects.

### S-1 · Leak-free by construction, and the clock is correctly *not* here
Across all 175 lines: zero lifecycle hooks, zero `ref`/`computed`/`watch`, zero listeners, zero
observers, zero timers, zero DOM access, zero `provide`/`inject`, zero `defineExpose`. The entire
`<script setup>` is a `defineProps` and a `defineEmits` (`:47-62`). There is literally nothing to tear
down — which matters here more than usual, because the composable one layer up **does** have a teardown
defect (`useFourierMorph.ts:115-120, 215`; the sibling challenge's L-01 BLOCKER, folded not re-derived).
The ownership placement is right, which is why that fix is one file and this leaf needs no change at
all.
**Falsifier** — any hook, ref, listener, observer, timer, or lifecycle import in the SFC. Read whole:
the only import is the child component (`:48`).

### S-2 · Strictly one-way data flow, minimal and typed
One event, no payload, no `v-model`, no `.sync`, no prop mutation, no store access, no injected
context: `defineEmits<{ toggle: [] }>()` (`:59-61`) and `$emit('toggle')` (`:4`). The component cannot
desynchronise its parent because it holds nothing to desynchronise. This is what makes L-09/L-10/L-11
*purely* the producers' defects — the leaf transmits what it is given, faithfully, and the audit trail
from chip to composable is three files with no hidden edges.
**Falsifier** — a prop write, an `inject`, a store import, a `defineExpose`, or a second emit. None
exists; `grep -nE "inject|useStore|defineExpose|defineModel"` over the SFC → no hits.

### S-3 · One breakpoint, mobile-first, matching its parent exactly
Four media queries (`:77`, `:100`, `:135`, `:158`), all `min-width: 640px`, no `max-width` query, no
second breakpoint — and the sole consumer uses the identical single breakpoint six times
(`FourierMorphDemo.vue:195, 208, 222, 235, 250, 264`). Every base rule is the small-screen rule and
every override widens it. In a 20.6k-LOC frontend this discipline is not the norm, and it is the reason
L-04's cure is a two-line container change rather than a re-layout.
**Falsifier** — any other breakpoint value, any `max-width` query, or any desktop-first base rule in
the file. `grep -n "@media" MorphShapePreview.vue` → exactly the four, all identical. *(Honest blemish
inside the superlative: 640 px is spelled as a literal in all four rather than as Tailwind's `sm:`
variant or a `--breakpoint-sm` token — the value is right, the spelling is a magic number.)*

### S-4 · Zero `any`, zero casts, zero escape hatches — in a chain that is full of them
`defineProps<{…}>()` with six explicitly typed fields, no `withDefaults`, no runtime validators, no
`as`, no `@ts-expect-error`, no non-null assertions (`:50-57`). Counted across the morph chain there
are **six** `any` sites and this file holds none: `FourierMorphDemo.vue:99, 100`
(`prepareFourierShape(sunData as any)` — the casts that sever the `FourierPathData` contract at both
entry points), `useMorphConfig.ts:66` (`(config as any)[field]`), `useFourierMorph.ts:135`
(`(_vars: any, …)`), plus `HarmonicLevelGrid.vue:11, 34` (`$event.target as HTMLInputElement`).
Given vitest's absence (L-16), `vue-tsc` is the *only* automated gate this component has, and it is the
one file in the feature where that gate retains full information.
**Falsifier** — one `any`, one `as`, one `!`, one untyped prop. `grep -nE "\bany\b|as |@ts-" ` over the
SFC → no hits. *(This superlative is exactly why L-03 stings: the file is scrupulously typed and still
widens the one union that carries meaning.)*

---

## §F — Tally

| severity | ids |
|---|---|
| **BLOCKER** (2) | L-01, L-02 |
| MAJOR (6) | L-03, L-04, L-09, L-10, L-11, L-12 |
| MINOR (7) | L-05, L-06, L-07, L-13, L-14, L-15, L-16 |
| INFO (3) | L-08, L-17, L-18 |

**defects = 18** (L-01…L-18) · **blockers = 2** · **superlatives = 4** · **withdrawn = 5** (§D)

**Corpus interactions.** FOLDED, not re-derived: the sibling `FourierMorphSvg` L-challenge's L-01
(`stopAnim` is a fast-forward), L-05 (the morph clock is ungated, contra `scheduler.ts:13-15`), and its
L-15 (which flagged this file's unrolled chips and deferred them here — discharged as L-04).
CORROBORATED with new mechanism: M-critique `raw-findings.json:2473` (hand-rolled hover → L-12's
shorthand clobbering). **CONTRADICTED**: `raw-findings.json:2343` ("radius inherited only from
cartoon-card" → no radius reaches it at all, L-13) and the 2026-05-27 D-audit rows #1/#2
(`DA-design-A4-equation-morph-chrome.md:48-49`, cartoon-card dead → cured by the D.W4.a shim, §D-2).
REFINED: `lane-frontend.md:564`'s file-keyed SVG-surface count omits this component (§C, Face 3);
`CENSUS §2 C-4`'s seven `MetricBadge` files gain an eighth candidate (L-14).

**The one-line judgement**: *`MorphShapePreview` is a scrupulously typed, leak-free, one-way leaf whose
public surface makes the route's only control unnameable and whose four status chips assert, as fact,
a shape that is not on screen yet, a harmonic level the renderer clamped away, and a fidelity the
shipped data cannot reach.*
