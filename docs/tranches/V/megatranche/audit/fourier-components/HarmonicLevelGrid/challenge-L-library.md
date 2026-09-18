claude-opus-5[1m]

# CHALLENGE · `HarmonicLevelGrid.vue` · axis **L — LIBRARY**

**Subject** `fourier-analysis/web/src/components/morph/HarmonicLevelGrid.vue` (286 lines; census
`formation/fourier/lane-frontend.md:172` — "Per-level harmonic sliders").
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below
carries severity + `file:line` provenance + its own falsifier. Superlatives are held to the same
standard (L-18 runs both ways).
**Method** static + source-derived only. No browser. Numeric claims are computed from the shipped
assets by re-executing the component's own code path in a scratch harness (arithmetic identical to
`svg-fourier.ts`); nothing requiring a live DOM is asserted without an `UNPROVEN-NEEDS-LIVE` mark.

**Read surface (whole, read-only):** the SFC; its five imports —
`vue`, `@mkbabb/glass-ui/button`, `@mkbabb/glass-ui/slider`, `@/lib/colors` (117),
`@/lib/svg-fourier` (154); svg-fourier's own imports `@mkbabb/pencil-boil` (`src/path.ts`) and
`./types`; the installed producer `@mkbabb/glass-ui@4.0.0` (`dist/slider.d.ts`,
`dist/components/ui/slider/index.d.ts`, `dist/components/ui/button/index.d.ts`, `dist/glass-ui.css`,
`dist/slider-DQ95MET2.js`); the sole consumer `morph/FourierMorphDemo.vue`; the state owners
`composables/useMorphConfig.ts`, `composables/useFourierMorph.ts`; the assets
`assets/fourier-paths/{sun,moon}.json`; `src/style.css`.

**Verdict** — **DEFECTIVE.** 17 findings: **2 BLOCKER**, 4 MAJOR, 8 MINOR, 3 INFO. Two of the
BLOCKERs are visible at first paint of `/morph` with zero user interaction. Three superlatives
survive their falsifiers.

---

## §0 · Ground truth the whole challenge rests on

Both shapes this component is ever given are capped at **50 harmonics**:

```
sun.json   levels [1,2,3,5,8,12,18,25,35,50]  n_harmonics 50  n_eval 512
moon.json  levels [1,2,3,5,8,12,18,25,35,50]  n_harmonics 50  n_eval 512
```
(`assets/fourier-paths/sun.json`, `moon.json`; the only two shapes reachable —
`FourierMorphDemo.vue:95-100,104`.)

The `levels` prop is **not** the shape's levels. It is
`useMorphConfig.ts:51-53` → `computePreviewLevels(config.lowLevel, config.highLevel)` →
`useMorphConfig.ts:30` `const candidates = [1,2,3,5,8,12,18,25,35,50,75,100]`.
With `DEFAULT_MORPH_CONFIG` (`useFourierMorph.ts:58-66`, `lowLevel: 5`, `highLevel: 50`) the grid
renders exactly **12 cells: 1, 2, 3, 5, 8, 12, 18, 25, 35, 50, 75, 100** — three of which the data
cannot distinguish.

Every partial sum, at every level, is **512 points** — so every cell's path is 512 cubic segments
regardless of `n`.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The `n=75` and `n=100` cells are byte-identical clones of `n=50`, and clicking one drives the config past the data ceiling into an inert half-control

**Provenance** `HarmonicLevelGrid.vue:55-56` (`v-for="level in levels"`), `:66-75` (the per-cell
path), `:129-132` (`getPath`), `:35` (`max="100"`), `:44` (`:max="100"`), `:115`
(`Math.min(100, …)`); `svg-fourier.ts:125-153` (`interpolateAtHarmonicLevel`);
`useMorphConfig.ts:30`; `FourierMorphDemo.vue:143-146` (`level > highLevel → config.highLevel = level`).

**The mechanism.** `interpolateAtHarmonicLevel` clamps first (`svg-fourier.ts:131`
`Math.max(levels[0], Math.min(maxLevel, harmonicLevel))`, `maxLevel = 50`), so `75 → 50` and
`100 → 50`. The bracket search then lands `lo=35, hi=50`, `t = (50−35)/(50−35) = 1`, and
`lerpPoints(lo, hi, 1)` (`svg-fourier.ts:94-106`, `out[i] = a[i]*0 + b[i]*1`) returns the level-50
points **exactly** — `x*0` is exact for finite doubles, so this is not "close", it is identical.

**Measured** (re-running `interpolateAtHarmonicLevel` + `pointsToSvgPath` over `sun.json`):

```
n= 50  bytes=57029  segs=512
n= 75  bytes=57029  segs=512        d(50) === d(75)   → True
n=100  bytes=57029  segs=512        d(50) === d(100)  → True
n= 35  bytes=57036  segs=512        d(35) === d(50)   → False   (control: adjacent levels DO differ)
```

**Failure scenario.** Load `/morph`. Three of the twelve preview cells paint the same curve while
labelling themselves `n=50`, `n=75`, `n=100` (`:80` `n={{ level }}`). The grid's entire contract —
"this is what the shape looks like at harmonic level *n*" — is false for 25% of its cells before any
input. Then: one click on the `n=100` cell routes to `FourierMorphDemo.vue:143-145`
(`level > highLevel → config.highLevel = 100`). Now `highLevel = 100`, which
`useFourierMorph.ts:112,204` feeds straight back into `interpolateAtHarmonicLevel`, where it clamps
to 50 again. The High slider (`:40-49`, `:max="100"`) therefore has **~50 % inert travel** — dragging
51→100 changes nothing anywhere in the app — and the `is-bound` blue ring (`:62`,
`.grid-cell.is-bound` `:256-259`) lands on the `n=100` clone, *affirming* a bound the math discards.
`activeLevel` can never equal 75 or 100 either, because `FourierMorphDemo.vue:115-120` derives it via
`nearestLevel(currentShape.data.levels, …)` — so the `.active` state is structurally unreachable on
those cells.

**Falsifier** — *"some shape ships levels beyond 50, so 100 is the right ceiling."*
Refuted: both reachable assets report `n_harmonics: 50` and `levels[-1] = 50`
(`sun.json`, `moon.json`), and the only two shapes this component can receive are those two
(`FourierMorphDemo.vue:99-100,104`). A second falsifier — *"the clone is a rendering artifact, not a
data identity"* — is refuted by the string comparison above: the emitted `d` attributes are equal
byte for byte.

**Where it lands.** `useMorphConfig.ts:30` manufactures 75/100, but **this component is the last line
of defence and it holds the antidote in its own hands**: `props.shape` (`:96`) carries
`data.levels` and `data.n_harmonics`. See D-6.

---

### D-2 · BLOCKER · `getPath()` is a bare template call, so every cell's 57 KB / 512-segment path is rebuilt on every re-render — and re-render fires on every slider pointer tick

**Provenance** `HarmonicLevelGrid.vue:68` (`:d="getPath(level)"`), `:129-132` (the function),
`:55` (the loop), `:11,:20,:21` and `:34,:43,:44` and `:60-63` (the props that make the block
dynamic); `svg-fourier.ts:47-73` (`pointsToSvgPath`), `:94-106` (`lerpPoints`).

**Measured** — the twelve default cells, computed from `sun.json` through the component's exact code
path:

```
n=  1 56668 B · n=  2 56765 · n=  3 56948 · n=  5 57043 · n=  8 57001 · n= 12 57062
n= 18 57003 · n= 25 56961 · n= 35 57036 · n= 50 57029 · n= 75 57029 · n=100 57029
TOTAL = 683 574 B  (667.6 KiB)  ·  6 144 cubic segments
```

**The mechanism.** `getPath` is a plain function invoked inside a `v-for` with a dynamic argument —
the compiler cannot hoist or memoize it, and Vue has no value cache for template calls. So *any*
re-render re-executes it 12–14 times. Its output is a **pure function of `(props.shape, level)`**:
`interpolateAtHarmonicLevel` reads only `shape`, `pointsToSvgPath` only its argument. Neither input
changes when `activeLevel`, `lowLevel` or `highLevel` change — yet all three are template-bound
(`:61-62`, `:10`, `:21`, `:33`, `:43`), so all three force the whole 667 KiB rebuild that provably
produces identical strings.

**Failure scenario.** Drag the Low slider one notch. `Slider` emits `update:modelValue` per
pointermove → `lowModel.set` (`:120-123`) → `emitLow` → `FourierMorphDemo.vue:64` mutates
`config.lowLevel` → `previewLevels` recomputes to a **new array identity** (`useMorphConfig.ts:38`
`Array.from(...).sort(...)`) → grid re-renders. Per tick: 12–14 bracket searches, 12–14 × 512-point
`lerpPoints` allocations (≈ 7 000 fresh 2-tuples), ≈ 667 KiB of `+=` string building, and 12–14
`setAttribute("d", …)` patches the SVG engine must re-parse into 6 144 beziers. Worse, the cell
*count* changes mid-drag — `useMorphConfig.ts:35` `if (lowLevel > 1) levels.add(lowLevel)` — so
dragging Low across 1→49 mounts and unmounts a `<Button>` + `<svg>` + 57 KB `<path>` **per tick**.
The same amplifier fires during a morph: `nearestActiveLevel`
(`FourierMorphDemo.vue:115-120`) steps through the 10 precomputed levels while
`morph.harmonicLevel` animates, and every step repaints all twelve.

**Falsifier** — *"Vue's patcher short-circuits an unchanged `d`, so the cost is bounded."*
Half-true and insufficient: `patchProp` is skipped only *after* the new value has been produced. The
57 KB string is allocated and compared regardless; only the DOM write is saved. The allocation +
lerp + comparison is the dominant term and it is 100 % unavoidable in the current shape.
A second falsifier — *"the paths are cheap because low `n` means few points"* — is refuted by the
table: `n=1` is 56 668 B, statistically the same as `n=50`, because every partial sum carries all
512 `n_eval` samples (`sun.json:n_eval 512`).

**UNPROVEN-NEEDS-LIVE (SS-13):** the wall-clock INP delta and the paint cost of 6 144 beziers in
twelve 48 px boxes. The byte counts, segment counts and redundancy proof are static.
**Fix shape (one line of intent):** the paths depend on `(shape, levels)` only — a
`computed(() => new Map(props.levels.map(l => [l, getPath(l)])))` collapses the entire class.

---

## §2 · MAJOR

### D-3 · MAJOR · The whole per-instance retint hook is dead against glass-ui 4.0.0 — the tracks paint `--primary`, and `VIZ_COLORS`, both `:style` bindings and four CSS declarations are dead weight

**Provenance** `HarmonicLevelGrid.vue:207-214` (the block), `:25` and `:48`
(`:style="{ '--track-color': VIZ_COLORS.chebyshev }"`), `:91` (`import { VIZ_COLORS }`).

The block sets four custom properties:
`--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`,
`--slider-scrub-thumb-bg-hover`.

**Evidence.** `grep -r "slider-scrub" node_modules/@mkbabb/glass-ui/{dist,src}` → **zero hits.**
The complete `--slider-*` surface glass-ui 4.0.0 actually reads is:

```
--slider-range-bg  --slider-range-blur  --slider-range-shadow
--slider-thumb-bg  --slider-thumb-border-color  --slider-thumb-shadow
--slider-thumb-size  --slider-thumb-spring
--slider-track-bg  --slider-track-height
```
and the consuming rule is
`glass-ui.css` → `.slider-range[data-v-534634a7]{ background: color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88%, transparent); … }`.

So the fallback `var(--primary)` paints. **Not one of the four declarations is read by anything.**

**Failure scenario.** The design intent recorded in the comment at `:207` ("per-instance retint
hook") never fires: both Harmonic sliders render in the global `--primary`, identical to every
untinted slider in the app. The `:style` bindings at `:25`/`:48` set `--track-color` on the Slider
root, that variable is consumed *only* by the four dead declarations, and therefore the entire
`VIZ_COLORS` import chain (`:91` → `lib/colors.ts:77-87` reactive object, `:90-96`
`resolveVizColors`) is imported and reactively subscribed for nothing.

**Falsifier** — *"`inheritAttrs: false` on Slider drops the style, or the scoped selector never
matches the child root, so the whole thing is inert for a different reason."* Checked both:
`grep -c inheritAttrs dist/slider-DQ95MET2.js` → `0` (attrs fall through), and Vue stamps the
parent's scope id onto a child component's root element, so `.level-slider-track[data-v-…]` *does*
match — proof: the sibling declaration `flex: 1` (`:209`) is load-bearing for the row layout and
visibly works. The plumbing is live; only the token names are wrong.
A second falsifier — *"the tokens are a forward-compat carry for a glass-ui version that will ship
them"* — is refuted by `docs/tranches/M/M-bump-migration.md:37`, which recorded exactly this
suspicion as **UNVERIFIED** back in June. **This challenge closes it: VERIFIED DEAD against 4.0.0.**

**Corpus fold.** `lane-frontend.md:382` correctly records that all `glass-scrubber` *variant strings*
are now prose-only — the A.W2.c variant migration landed (`:18` is `variant="standard"`, a real 4.0
variant per `dist/components/ui/slider/index.d.ts`). **But the migration stopped at the variant and
left the token names behind.** That half of the migration is unrecorded anywhere in the corpus; this
row is new.

---

### D-4 · MAJOR · Number-input / model desync: when the clamp is a fixed point, the DOM keeps invalid text forever

**Provenance** `HarmonicLevelGrid.vue:8-16` (Low input, `:value="lowLevel"` + `@change="emitLow(…)"`),
`:31-39` (High input), `:109-112` (`emitLow`), `:114-117` (`emitHigh`).

The inputs are *nominally* controlled (`:value` + `@change`) but the emit is clamped. Vue patches a
DOM prop only when the **new vnode's value differs from the previous vnode's value** — it never
compares against the live DOM. Whenever the clamp maps the user's text back onto the value already
held, no prop change occurs, no patch is scheduled, and the element retains whatever the user typed.

**Failure scenario (minimal, from a reachable state).** `lowLevel = 1` (the floor; reachable by one
drag or by clicking the `n=1` cell). Type `abc` into the Low field and blur.
`Number("abc") → NaN`, `NaN || 1 → 1`, `Math.max(1, Math.min(highLevel−1, 1)) → 1`. Emit `1`; the
parent writes `1` over `1`; the vnode prop is unchanged; the field permanently displays **`abc`**
while the model says `1`. Identical for High: `lowLevel = 5, highLevel = 6`, type `abc` → clamp
yields `6` → no patch → the field shows `abc`. Also reachable with in-range garbage: `lowLevel = 49,
highLevel = 50`, type `999` → `Math.min(49, 999) = 49` → no patch → the field shows `999`.

**Falsifier** — *"a later unrelated re-render will resync the value."* It will not: on re-render the
vnode still carries `value: 1`, identical to the previous vnode, so `patchProp` is skipped for that
prop regardless of how many renders occur. The only repairs are a `ref` + explicit write-back, a
`@blur` normalizer, or `:value` keyed off a version counter — none present.

---

### D-5 · MAJOR · `Number(raw) || 1` in `emitHigh` is data-destructive — clearing the High field collapses it to `lowLevel + 1`

**Provenance** `HarmonicLevelGrid.vue:114-117`.

```ts
function emitHigh(raw: string) {
    const v = Math.max(props.lowLevel + 1, Math.min(100, Number(raw) || 1));
    emit("update:highLevel", v);
}
```

`1` is the wrong identity for the *upper* bound. `Number("") === 0` → falsy → `1` → clamped up to
`lowLevel + 1`.

**Failure scenario.** Default config (`low 5`, `high 50`). The user selects the High field, presses
⌫ to retype, then tabs away without typing. `change` fires with `""` → high becomes **6**. A
carefully tuned 50-harmonic ceiling is destroyed by an accidental clear-and-blur, and the morph's
"full fidelity" phase (`useFourierMorph.ts:112`) silently becomes a 6-harmonic blob. The symmetric
`emitLow` (`:110`) happens to be correct only by coincidence — `1` *is* the Low identity.

**Falsifier** — *"`<input type=number>` never emits an empty `change`."* It does: clearing a
`type=number` field yields `value === ""` (the sanitization algorithm makes `value` the empty string
for a bad/empty input) and `change` fires on blur. The correct fallback is `props.highLevel` (keep
the current value on garbage), not a bare literal.

---

### D-6 · MAJOR · The component owns the shape that carries the true ceiling and never consults it; `100` is a magic literal in three places

**Provenance** `HarmonicLevelGrid.vue:96-101` (`shape: FourierShape` is prop #1),
`:35` `max="100"`, `:44` `:max="100"`, `:115` `Math.min(100, …)`;
the available truth is `props.shape.data.levels` and `props.shape.data.n_harmonics`
(`svg-fourier.ts:15-28,31-35`).

`shape` is used at exactly one site — `:130`, inside `getPath`. Every bound the component enforces
is a literal. The one prop that could make D-1 impossible is inert for bounds purposes.

**Failure scenario.** Swap in a shape decomposed to 24 harmonics and the grid silently offers cells
and slider travel up to 100, four-fifths of it duplicate; swap in one decomposed to 200 and the grid
silently amputates the top three-quarters of the shape's fidelity. In both cases nothing errors, no
warning is emitted, and the control lies. The correct bound is one expression:
`props.shape.data.levels.at(-1) ?? props.shape.data.n_harmonics`.

**Falsifier** — *"the ceiling belongs to `useMorphConfig`, not here."* Partly: `useMorphConfig.ts:30`
is a co-owner of the 75/100 candidates. But `useMorphConfig` has no access to a shape — it is
constructed with no shape argument (`FourierMorphDemo.vue:107`) — whereas this component receives
one. Only this component can compute the correct bound, so only this component can be the site of the
fix. A second falsifier — *"`interpolateAtHarmonicLevel` clamps, so it is safe"* — confuses *safe*
with *honest*: the clamp is exactly the mechanism that manufactures the three identical cells (D-1).

---

## §3 · MINOR

### D-7 · MINOR · `computed<number[]>` narrows away the emitter's declared `| undefined`; `arr[0] ?? 1` guards the element, not the array

**Provenance** `HarmonicLevelGrid.vue:120-127`; the producer contract
`glass-ui/dist/components/ui/slider/Slider.vue.d.ts` → `"update:modelValue": (payload: number[] | undefined) => any`.

The setters are typed `(arr: number[])`. If the producer ever honours its own declared signature and
emits `undefined`, `arr[0]` throws `TypeError: Cannot read properties of undefined`. The `?? 1`
protects against a missing *element*, which cannot happen for a single-thumb slider, and not against
a missing *array*, which the type says can.

**Falsifier** — *"reka-ui/glass-ui never actually emit `undefined` for a bound single-thumb slider."*
Probably true at runtime, which is why this is MINOR and not MAJOR — the throw is
**UNPROVEN-NEEDS-LIVE (SS-13)**. The *type lie* is proven statically and stands on its own: the
consumer's declared narrowing contradicts the producer's declared emit, and `vue-tsc` is not
currently forcing the reconciliation. Correct guard: `(arr) => emitLow(arr?.[0] ?? props.lowLevel)`.

### D-8 · MINOR · Stringly-typed seam: `emitLow(String(arr[0] ?? 1))` → `Number(raw)`

**Provenance** `:122`, `:126` (number → string) → `:110`, `:115` (string → number).

The Slider hands over a `number`; the adapter stringifies it purely so it can be re-parsed by a
function whose only reason to take a `string` is the `<input>` at `:11`/`:34`. Two callers with two
input types share one signature by round-tripping through text. This is also what forces `|| 1` to
be shared between the two paths, which is how D-5's wrong identity got in. **Fix:** `clampLow(n: number)`
/ `clampHigh(n: number)` as the core, with a thin `(e: Event) => clampLow(Number(...))` at the DOM
edge. **Falsifier** — *"the round-trip is lossless for the integer range 1..100."* Granted, it is
lossless; the defect is contract shape and the coupling it caused, not precision.

### D-9 · MINOR · The four dead declarations are copy-pasted verbatim across six files

**Provenance** `HarmonicLevelGrid.vue:207-214`; identical blocks (same comment, same four dead
properties, only the class name differs) at `MorphPhaseConfig.vue:204-211`,
`BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `SliderControl.vue:145-148`; plus
dead `--slider-scrub-track-height` at `GlassTimeline.vue:125` and
`ConvergenceTimeline.vue:136`.

Six sites, one dead recipe, zero shared utility. D-3 is therefore not a local slip but a fleet-wide
duplication of a broken idiom — and the duplication is precisely why the A.W2.c variant migration
could fix the variant string at seven sites and still miss the tokens at all of them.
**Falsifier** — *"per-instance tint must be per-instance, so duplication is inherent."* No: the
*value* is per-instance (`--track-color`), the *mapping* is universal and belongs in one
`@utility`/`:root` rule, or upstream in glass-ui as a documented retint contract.

### D-10 · MINOR · Hardcoded `#60a5fa` / `rgba(96,165,250,…)` — filed in June at these exact lines, still unfixed

**Provenance** `:203` `border-color: #60a5fa` and `:204` `rgba(96,165,250,0.15)` (`.level-input:focus`);
`:257` `border-color: #60a5fa` and `:258` `rgba(96,165,250,0.2)` (`.grid-cell.is-bound`).

**Corpus fold.** `docs/tranches/M/design/M-design-language.md:158` names *"the hardcoded `#60a5fa`
(`HarmonicLevelGrid.vue:203,257`)"* under `C2-11`. The line numbers still match exactly — the file
has not moved a line since that audit. **Adopt as unfixed carry.** Two more literals sit beside them
(`:243` `--accent-red 50%` is tokenized; `:69` `stroke="var(--accent-red)"` is tokenized) so the
file is otherwise token-clean — which makes the four blue literals the only outliers.
**Falsifier** — *"a focus blue has no token."* The tree has `--ring`/`--primary` and the file already
reaches for `--accent-red`, `--foreground`, `--card`, `--muted-foreground`, `--background`; the
token vocabulary is present and used everywhere except here.

### D-11 · MINOR · `class="grid"` shadows the Tailwind `.grid` utility — and the element is `display: flex`

**Provenance** `:53` `<div class="grid">`; `:218-226` `.grid { display: flex; overflow-x: auto; … }`;
`style.css:1` `@import "tailwindcss"`.

Tailwind v4 scans SFC source, sees the literal token `grid`, and emits `.grid{display:grid}`. The
scoped rule currently wins (unlayered scoped styles beat `@layer utilities`, and the specificity is
higher anyway), so the strip renders as a flex row today — but the component has *manufactured a
utility it does not want and then shadowed it*. Any future change that layers SFC styles, or any
child that inherits the class without the scope attribute, flips the layout to a CSS grid.
The name also lies about the layout and about the design record: `M-design-language.md:191` asks for
*"the HarmonicLevelGrid (true CSS grid, harmonic hues, `C4-G9`, `B5-04`)"*; the tree ships a
horizontal flex scroller. **Falsifier** — *"scoped specificity guarantees the win."* It guarantees it
under today's cascade only; the point is that a locally-defined class must never collide with a
generated utility name. `.levels-strip` costs nothing.

### D-12 · MINOR · No `disabled` posture — clicks during a morph are silently swallowed by the parent

**Provenance** `:54-65` (the `Button` has no `:disabled`), `:64` `@click="$emit('select', level)"`;
the guard lives in the consumer at `FourierMorphDemo.vue:137-138`
(`if (isAnimating.value) return;`); contrast the sibling at `FourierMorphDemo.vue:18`
`:disabled="isAnimating"` on `MorphShapePreview`.

**Failure scenario.** During a 350 ms morph (`DEFAULT_MORPH_CONFIG` 150+50+150) every cell still
shows `cursor: pointer` (`:237`), the hover lift (`:242-245` `transform: scale(1.04)`) and the press
squash (`:247-249` `scale(0.96)`), so the control affirms the click — and the handler drops it on
the floor with no feedback. Two sibling components in the same folder, driven by the same
`isAnimating` computed, take opposite postures on the same question.
**Falsifier** — *"the guard is correct, so the behaviour is safe."* Safe, yes; the defect is that the
availability contract is enforced in the consumer while the affordance is asserted in the producer.
`disabled` is a prop this component declines to accept (`:95-101`).

### D-13 · MINOR · Both `<label>`s are orphaned and the number inputs are nameless — and the corpus says otherwise

**Provenance** `:7` `<label class="level-label">Low</label>` / `:8-16` the input;
`:30` `<label class="level-label">High</label>` / `:31-39` the input. No `for`, no `id`, no
`aria-label` on either input. `aria-label` exists only on the two **Sliders** (`:23`, `:46`).

**Corpus contradiction — stated explicitly.** `docs/audits/runs/2026-06-01-modern-web-audit/fourier.md:32`
asserts: *"the `number`/`text` inputs in HarmonicLevelGrid do carry `aria-label`"* (and `:85` lists
`HarmonicLevelGrid.vue:23` under "aria-label on icon-only / orphaned-label inputs"). **The tree
disagrees.** Line 23 is `aria-label="Low harmonic level"` on the `<Slider>`, not on the input. The
inputs at `:8-16` and `:31-39` carry no accessible name by any mechanism. The audit's P0 headline
(orphaned labels) is correct and still unfixed; its mitigating parenthetical is wrong.
**Falsifier** — *"the visible text is adjacent, so AT will infer the name."* It will not: adjacency
is not an accessible-name mechanism; an unassociated `<label>` contributes nothing to the accname
computation. Flagged here as cross-axis (primary home: D/A), included because it is a
producer-contract omission the component is the only place to fix.

### D-17 · MINOR · 512 cubic segments to paint a 48 px thumbnail — no decimation for preview scale

**Provenance** `:66` `viewBox="0 0 200 200"`, `:261-265` `.grid-svg { width: 48px; height: 48px }`
(`:267-272` 64 px ≥640 px); `sun.json:n_eval 512`.

Each segment spans `200/512 = 0.391` viewBox units → **0.094 CSS px** at 48 px, **0.125 px** at
64 px. The component ships roughly ten segments per rendered pixel and 6 144 beziers of resting DOM
for a control strip. `svg-fourier.ts` has no decimation helper, and `pointsToSvgPath` (`:47-73`)
takes no stride/precision argument, so the resolution is not even expressible today. Coordinates are
emitted at full float64 (`M130.36287442745794,24.890741653122753` …) — 17 significant digits to place
a point inside a 48 px box. Rounding to 2 decimals alone would cut the 667 KiB by well over half.
**Falsifier** — *"the same helper serves the full-size morph preview, which needs the detail."*
True — `useFourierMorph.ts:81` uses it for the hero path — which is the argument for a
`precision`/`stride` parameter, not for the grid inheriting the hero's resolution.

---

## §4 · INFO — imported-library postures (in scope: every file the component imports)

### D-14 · INFO · `svg-fourier.ts` error postures are uniformly silent

- `lerpPoints` (`:94-106`) silently truncates to `Math.min(a.length, b.length)` — a mismatched pair
  yields a short path instead of an error.
- `interpolateAtHarmonicLevel` (`:144-148`) returns `loPoints ?? hiPoints ?? []` when the `Map` lacks
  a key; `[]` flows to `pointsToSvgPath`, which returns `""` (`:51`), which becomes `:d=""` — an
  invisible cell with **no console trace whatsoever**. If `prepareFourierShape` (`:76-88`) ever skips
  a level (its `if (ps)` guard at `:82` silently drops any level absent from `partial_sums`), the
  grid renders blank cells and reports nothing.
- Exact-level hits still pay a full lerp: for `level = 50`, `lo=35, hi=50, t=1`, so `lo !== hi`
  (`:150`) and `lerpPoints` allocates 512 fresh tuples to reproduce an array that already exists.
  Every default cell whose `n` is a precomputed level takes this path.
- `nearestLevel` (`:112-119`) `break`s on the first `l > target`, silently assuming ascending sorted
  input; the precondition is undocumented and unenforced.

**Falsifier** — *"silent degradation is the right posture for a preview surface."* Defensible for
one cell; not defensible when the same helper backs the hero morph path
(`useFourierMorph.ts:81,93,102,112,175,183-184,204`) where a silent `""` is a vanished animation.

### D-15 · INFO · `pointsToSvgPath`'s closed branch is a verbatim reimplementation of the library function it imports

**Provenance** `svg-fourier.ts:11` `import { catmullRomToBezier } from "@mkbabb/pencil-boil"`;
`:54-72` vs `pencil-boil/src/path.ts:33-48`.

The two loops are line-for-line identical — same `/6` Catmull-Rom tangents, same `C` emission, same
`d +=` accumulation — differing only in index handling (`(i-1+n)%n` modular wrap vs pencil-boil's
`Math.max(0, i-1)` clamp) and the trailing ` Z`. The imported symbol is reachable **only** through
`closed === false` (`:52`), and **no caller in the tree ever passes `false`** — both call sites
(`HarmonicLevelGrid.vue:131` and `useFourierMorph.ts:81`) rely on the `closed = true` default, so
the `!closed` branch is unreachable tree-wide. From this component's perspective the
pencil-boil dependency edge is dead. The right shape is one upstream function with a `closed`
option. **Falsifier** — *"the wrap is a genuine behavioural difference, so the duplication is
justified."* The wrap is genuine and necessary; duplicating 15 lines to obtain it is not — a
`{ closed }` option on the upstream helper serves both. Filed as INFO because the fix lands in
pencil-boil, not here.

### D-16 · INFO · `:key="level"` silently assumes a de-duplicated `levels` prop

**Provenance** `:56` `:key="level"`; `:97` `levels: number[]`.
Today `computePreviewLevels` builds through a `Set` (`useMorphConfig.ts:28-38`), so duplicates cannot
occur — but nothing in the prop type or a runtime guard says so. A second consumer passing a plain
array yields duplicate keys, a dev warning, and mis-patched cells.
**Falsifier** — *"single consumer, so it cannot happen."* Correct today; the point is that the
component's contract does not carry the invariant its keying depends on.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

### S-1 · The `computed` array-adapter is the correct bridge for a scalar↔array model, with no shadow state

**Provenance** `:119-127`. A `WritableComputedRef` whose `get` derives straight from the prop and
whose `set` funnels into the same emit path the `<input>` uses. There is **no local mirror ref, no
`watch`, and no `onUpdate` sync** — so there is no window in which local state and prop disagree, and
no possibility of a feedback loop when the parent clamps the emitted value to something other than
what was sent (which it can: `emitLow`/`emitHigh` clamp, `:110`/`:115`). Because the getter is
prop-derived, a rejected write self-corrects on the next read with zero extra machinery.

**Why this is a real superlative and not just "it works":** this repo's constellation has the
opposite pattern documented as a hazard — value.js `useColorModel` needs a local `shallowRef` cache
precisely because `defineModel()`'s async parent round-trip makes reads-after-writes return stale
data. `HarmonicLevelGrid` avoids the entire class by never holding a copy. The `A.W2.c` comment at
`:119` names the intent exactly ("adapt the scalar level bounds to glass-scrubber's array model") and
the code delivers it in 8 lines.
**Falsifier applied** — *"the getter allocates a new array every read, so `v-model` will thrash."*
Checked: `computed` caches until `props.lowLevel` invalidates it, and reka compares slider values by
element, not identity. No thrash. The superlative survives. (D-7/D-8 are refinements *within* this
good pattern, not refutations of it.)

### S-2 · Zero lifecycle surface — the component is leak-free by construction, in a tree that is not

**Provenance** the whole `<script setup>` (`:87-133`): `import { computed } from "vue"` and nothing
else. No `onMounted`, no `onUnmounted`, no `setTimeout`/`setInterval`, no `requestAnimationFrame`, no
`addEventListener`, no `ResizeObserver`/`IntersectionObserver`/`MutationObserver`, no canvas or
WebGL context, no fetch, no store subscription. Two props-in / three events-out and one pure
function. There is literally nothing to tear down, so no teardown can be missed.

**Why this earns the superlative against the census.** `CENSUS-2026-08-03.md:85-87` records the viz
architecture as *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases … +
12 SVG surfaces"*, and `lane-frontend.md` §6 names the sharp edge: **Path B — `ConvergencePlot.vue:67-69`
runs its own `requestAnimationFrame(tick)` that is *not* gated by `stores/animation.ts` — "a second,
ungated clock."** `HarmonicLevelGrid` is one of the 12 SVG surfaces (`lane-frontend.md:565`) and it
takes the declarative side of that fork completely: its "render loop" is Vue's patcher, its
"context" is the DOM, and its lifetime is the component's. For a control strip this is the right
architecture and it is the reason the component has **no leak/teardown findings at all** in a
challenge that found 17 other things.
**Falsifier applied** — *"the glass-ui `Slider` acquires a `dockKeepOpen` token during drag
(`Slider.vue.d.ts`), so a leak is possible through the child."* Checked: the token is acquired and
released inside the producer's own lifecycle; the consumer neither creates nor holds it, and passes
no `keepDockOpen` override (`:17-26`, `:40-49`). The ownership boundary is clean. Superlative
survives. (D-2's cost is *render-path*, not *retention* — it allocates and releases; nothing is
held.)

### S-3 · R5-7-immune: the sole `v-for` is over a **component**, so this loop was never invisible to the deriver

**Provenance** `:55` `v-for="level in levels"` on `<Button>` (a registered component callsite,
imported `:89`). The nested `<svg>`/`<path>`/`<span>` (`:66-81`) are native but are **not** iterated.

**Corpus fold — the class, precisely bounded.** Intake row **R5-7** (`lane-fourier-r3-r6.md:125`,
verdict **TRUE / ADOPT-AS-FACT + CARRY→F.W4**) established that *"template-loop evidence keyed to
component callsites is blind to native HTML element loops"* — `PaperSidebar.vue`'s three native
`<li v-for>`s derived to `leafValues["instance.loop.paper-sidebar"] = []`, literally empty, while
the sibling `instance.loop.presets` was populated **because it was keyed by a component callsite**
(`callsite:…FunctionInput.vue:157:Tooltip:…`). R6-5/R6-6 (`:139-140`) cured it with the
`NATIVE_TEMPLATE_LOOP` family. **`HarmonicLevelGrid` sits on the populated side of that split**: its
loop iterates `Button`, so it registers under the *pre-R6* model as well as the post-R6 one, and any
instance denominator built on component callsites includes it. It is a clean control for the class,
not a victim of it.

**The residual, stated honestly so the superlative is not overclaimed** (INFO, not a defect):
callsite-keyed evidence registers one **site**, while the live DOM holds 12–14 **instances**, and the
cardinality is data-dependent (`useMorphConfig.ts:35-36` adds `lowLevel`/`highLevel` to the candidate
set, so the count moves during a drag). Any F.W4 derivation that reads a loop leaf as an instance
count — rather than as a site with unbounded multiplicity — will under-count this component by
11–13×. That is a *different* blind spot from R5-7 and it is not cured by `NATIVE_TEMPLATE_LOOP`.
**Falsifier applied** — *"the per-cell `<svg>`/`<path>` are native, so R5-7 bites here too."* It does
not: R5-7 is specific to native elements *carrying a `v-for`*. Nothing native here iterates. Verified
by reading the template whole: exactly one `v-for`, at `:55`, on a component. Superlative survives,
with the cardinality caveat attached.

---

## §6 · Corpus reconciliation

| Corpus row | Status against the live tree |
|---|---|
| `lane-frontend.md:172` — 286 lines, "Per-level harmonic sliders" | **AGREE**, exact. Script is 46 of the 286 lines (`:87-133`); 152 are scoped CSS (`:135-286`). Comfortably Goldilocks — no god-module risk, one responsibility. |
| `lane-frontend.md:278-279` — the two glass-ui imports | **AGREE**, exact (`:89`, `:90`). Both resolve to real 4.0.0 subpath exports; `variant="outline"` + `size="default"` (`:57-58`) and `variant="standard"` (`:18`, `:41`) are all valid members of the shipped CVA unions. |
| `lane-frontend.md:382` — all `glass-scrubber` occurrences are prose-only (`HarmonicLevelGrid.vue:119,207`) | **AGREE** on the variant strings — and **EXTEND**: the migration fixed the variant and left the *token names* dead. See **D-3** (new). |
| `lane-frontend.md:565` — HarmonicLevelGrid listed among the 12 SVG surfaces | **AGREE**. Foundation for **S-2**. |
| `CENSUS-2026-08-03.md:85-87` — Canvas2D only, WebGL absent, 3 canvases + 12 SVG surfaces | **AGREE**. This component touches the viz render path only through the declarative SVG arm; it shares `svg-fourier.ts` with the hero morph path (`useFourierMorph.ts:81`) but touches no canvas, no rAF, no GL context. |
| `lane-fourier-r3-r6.md:125` **R5-7** (TRUE, ADOPT + CARRY→F.W4) | **FOLDED, not re-derived.** Applied as a *negative* result here: this component is on the component-callsite side of the split. See **S-3**, including the distinct cardinality residual. |
| `2026-06-01-modern-web-audit/fourier.md:32,85` — "the number/text inputs in HarmonicLevelGrid do carry `aria-label`" | **CONTRADICTED.** The tree disagrees: `aria-label` is on the two `<Slider>`s (`:23`, `:46`); the number inputs (`:8-16`, `:31-39`) have none. The P0 orphaned-label headline (`:7`, `:30`) stands and is unfixed. See **D-13**. |
| `M/design/M-design-language.md:158` — hardcoded `#60a5fa` at `:203,257` | **AGREE, STILL UNFIXED** at the identical line numbers. See **D-10**. |
| `M/M-bump-migration.md:37` — the `--slider-scrub-*` set marked **UNVERIFIED** ("may have been no-ops") | **RESOLVED → VERIFIED DEAD.** Zero hits for `slider-scrub` in glass-ui 4.0.0 `dist/` + `src/`; the live rule reads `var(--slider-range-bg, var(--primary))`. See **D-3**. |
| `2026-05-27-D-audit` A4 #1 — `.cartoon-card` is a dead class (`:2`) | **DISCHARGED — do not re-file.** `style.css:107` ships the D.W4.a `@utility cartoon-card` shim (`@apply cartoon-surface` + `--border`/`--card`). The class at `:2` is live again. |
| `2026-06-16-M-deep-audit` A8-04 — `variant="glass-scrubber"` at `HarmonicLevelGrid.vue:19,42` | **DISCHARGED.** The tree now reads `variant="standard"` at `:18` and `:41`. Only the token half survives (D-3). |
| `J/design/WC-design-hierarchy.md:89` / `D2-8` — a third independent 0.5/0.75 rem rhythm at `:159-226` | **AGREE, unfixed** (`:159-164`, `:218-226`). Design-axis; noted, not re-filed here. |

---

## §7 · Tally

| Severity | Rows |
|---|---|
| **BLOCKER** | D-1, D-2 |
| **MAJOR** | D-3, D-4, D-5, D-6 |
| **MINOR** | D-7, D-8, D-9, D-10, D-11, D-12, D-13, D-17 |
| **INFO** | D-14, D-15, D-16 |
| **SUPERLATIVE** | S-1, S-2, S-3 |

**defects 17 · blockers 2 · superlatives 3**

**Nothing here required a browser.** The only claims deferred to SS-13 are (a) the wall-clock INP
delta of D-2 and (b) whether glass-ui's Slider ever actually emits `undefined` (D-7); both are
marked `UNPROVEN-NEEDS-LIVE` in place. The byte counts, the segment counts, the clone identity, the
dead-token absence and the desync mechanism are all static and reproducible from the tree.
