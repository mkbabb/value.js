# CHALLENGE-L — library structure · `demo/workbenches/mix/MixConfigBar.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, 1M context. That is the tier
this seat was explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/mix/MixConfigBar.vue` (173 lines), area `demo/workbenches`.
- Axis: library structure — module boundaries, ownership, dependency direction, public surface.
- Write scope honoured: only files under `…/components/wb-mix-configbar/`. **No source edited.**

---

## §00 · Provenance — this is ROUND 3; rounds 1 and 2 are preserved intact, nothing lost

| round | date | report | status |
|---|---|---|---|
| 1 | 2026-07-27 19:21 | `challenge-L-library-round-1.md` | **verbatim, untouched** |
| 2 | 2026-07-28 11:34 | `challenge-L-library-round-2.md` | **verbatim, copied before this write** |
| **3** | **2026-07-28 (this)** | `challenge-L-library.md` | supersedes as the head; carries 1 + 2 whole |

Round 1's nine findings (**L-1** … **L-9**) and round 2's seven (**L2-1** … **L2-7**) — 2 BLOCKER,
9 MAJOR, 3 MINOR, 1 INFO — **stand in full**. I re-verified both BLOCKERs at the producer
declaration level this run and found them not merely intact but **sharper than either round stated**
(§2). I contradict nothing. I correct one line of round 2's negative proof (§7) and extend three of
its findings with facts neither round carried.

**This round adds six findings and two sharpenings.** Round-3 items are numbered `L3-n` so all three
records remain collision-free.

| new | severity | one line |
|---|---|---|
| **L3-1** | **MAJOR** | The demo's module-graph lint (**G-DEMO-1 / 3a / 3b**) is **dead config** — every glob names `demo/@/**`, which W43 deleted. `no-restricted-imports` resolves to `null` for this component and the entire post-W43 demo tree. **This is the mechanism under rounds 1+2's whole through-line.** |
| **L3-2** | **MAJOR** | glass-ui 7.0.0 **explicitly retired** the polymorphic `tag` API and names its successor `as` — in a doc comment. r1 L-1 is a consumer stranded on a retired API, not an unknown prop. And the demo has the two props **exactly backwards**: `variant` is real on `WatercolorDot` and absent on `Button`. |
| **L3-3** | **MAJOR** | `.section-label` has **four** element spellings across 7 files (not two, L2-6), and this component's duplicated accessible name has **already drifted**: `:145` "Size mismatch" vs `:147` `aria-label="Size mismatch strategy"`. |
| **L3-4** | MINOR | `.section-subtitle` is dead CSS (0 consumers) and `demo/DESIGN.md:58` still documents it as live in "the gradient / mix / generate control bars" — the three bars `MixConfigBar.vue:95-96` records stripping. |
| **L3-5** | MINOR | `demo/color-session/` is a god directory: 23 files / **3093 lines**, with **two** homes for "per-space metadata". Round 2's lattice adds to it without questioning it. |
| **L3-6** | MINOR | Three hand-rolled `props+emits` v-model pairs where `defineModel` is live in 13 demo files including the immediate sibling. **Partially contests round 2 §10.3.** |
| **L3-7** | INFO | `mixColors` re-converts **both** endpoints on every stop — 442 conversions per full ramp recompute where 26 suffice (measured, 0.222 ms). This is the *shape* argument that makes L2-3's `sampleColorRamp` a library obligation, not a demo convenience. |
| **L3-8** | MINOR | 2 of r1 L-4's 19 alias barrels have **zero** consumers — and the dead one is `demo/ui/label`, precisely the primitive L2-6/L3-3 need. |

**Verdict: DEFECTIVE.** Cumulative across three rounds: **2 BLOCKER · 12 MAJOR · 7 MINOR · 2 INFO.**
Strongest defect this round: **L3-1**.

---

## §0 · The import lattice, third pass

| # | line | specifier | home | round-3 verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | peer, deduped `vite.config.ts:88-95` | SOUND |
| 2 | 3–9 | `../../ui/select` | 1-line alias → `@mkbabb/glass-ui` | r1 **L-4**, + **L3-8** |
| 3 | 10 | `../../ui/button` | 1-line alias → `@mkbabb/glass-ui` | r1 **L-4**, + **L3-8** |
| 4 | 11 | `@lucide/vue` (`Blend`) | devDep `^1.16.0` | SOUND |
| 5 | 12 | `@mkbabb/value.js/color` | **published subpath, real `exports` key** | SOUND (code); r2 **L2-2** at the config |
| 6 | 13 | `../../color-session/picker-color` | demo rename of `SpaceId` | r2 **L2-4**; + **L3-5** on its directory |
| 7 | 14 | `../../palettes/mix` | **sibling FEATURE tree** | r1 **L-2**, sharpened §6 |
| 8 | 15 | `reka-ui` (`AcceptableValue`) | glass-ui's private dep | r1 **L-6** |
| 9 | 18 | `../../color-session/color-space-meta` | canonical vocabulary | SOUND here; r2 **L2-5** on shape |
| 10 | 23 | `../../color-session/color-chips` | single-consumer module | r1 **L-3** context; **L3-7** |

Ten edges. **One** is correct-and-unqualified (the `@mkbabb/value.js/color` import at line 12).
Re-confirmed this run against the real node resolver:

```
$ node --input-type=module -e "…await import.meta.resolve(s)…"
FAIL @mkbabb/value.js         -> ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/color   -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/color.js
FAIL @mkbabb/value.js/parsing -> ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/units   -> ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/css     -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js
```

Independent confirmation of round 2's L2-2 from a separate invocation. `HueInterpolationMethod` is
exported at `src/subpaths/color.ts:8`. A real consumer could write line 12 verbatim.

---

## §1 · L3-1 — MAJOR · the demo's module-graph enforcement is dead config, and it is the mechanism under both prior rounds

Rounds 1 and 2 closed on the same sentence — *"there is more than one home for one concept"* —
listed at seven boundaries. Neither asked **why the graph was free to drift**. It is because the
enforcement was pointed at a directory that no longer exists.

`eslint.config.js` carries three named structural invariants:

- **G-DEMO-1** — the shared color layer must never import app-root boot (`eslint.config.js:283-287`)
- **G-DEMO-3a** — the shared layer must not import feature internals (`:288-292`)
- **G-DEMO-3b** — palette-browser through its barrel seam only (`:293-300`, and `:241-254`)

Every one is scoped to globs W43 (RF-15) deleted:

```js
// eslint.config.js:232-239
files: ["demo/color-picker/**/*.ts", "demo/color-picker/**/*.vue",
        "demo/@/components/**/*.ts", "demo/@/components/**/*.vue",
        "demo/@/lib/**/*.ts",        "demo/@/lib/**/*.vue"],
// eslint.config.js:274-277
files: ["demo/@/composables/**/*.ts", "demo/@/composables/**/*.vue"],
```

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ grep -rn 'from "@components\|from "@composables\|from "@lib' demo/ | wc -l
0
```

The banned **patterns** are equally dead — `@components/custom/*/composables/**` and
`@components/custom/palette-browser/**/*.vue` name an alias `vite.config.ts:71-73` records killing
("W43 (RF-15) killed the demo `@…` path aliases").

### Reproduction — the subject file has zero import governance

```
$ npx eslint --print-config demo/workbenches/mix/MixConfigBar.vue \
    | python3 -c "import json,sys; print('no-restricted-imports =', json.dumps(json.load(sys.stdin)['rules'].get('no-restricted-imports')))"
no-restricted-imports = null
```

And across the tree that matters to this component:

```
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue    null
demo/color-session/color-chips/sample.ts                               null
demo/palettes/mix.ts                                                   null
src/color/operations.ts                                                [2, {"patterns":[{"group":["@mkbabb/glass-ui","@mkbabb/glass-ui/*"], …
```

**Only `src/**` retains a live rule** (inv-K-1, the acyclic-topology ban). The entire post-W43 demo —
`workbenches/`, `color-session/`, `palettes/`, `shell/`, `platform/`, `shared/`, `scenes/` — has **no
enforced dependency direction of any kind**.

### Why this is the round-3 headline

Every ownership finding in rounds 1 and 2 is a *symptom* whose *cause* is this. With the guard rails
deleted:

- r1 **L-2** — `workbenches/mix` → `palettes` (feature → sibling feature). Nothing forbids it.
- r1 **L-3** — a second copy of the Select pair in `workbenches/gradient`. Nothing forbids it.
- r1 **L-5** — a three-hop re-export chain whose stated purpose is *"keep their import path"*.
  Nothing forbids it.
- r1 **L-6** — a demo edge to `reka-ui`, glass-ui's private dependency. Nothing forbids it.
- **L2-3** — three chain samplers, two of them inside `workbenches/mix/`. Nothing forbids it.

And the T.W1 demo-dogfood keystone — the invariant that the demo consumes value.js only through the
published subpaths — is currently held **by discipline alone**:

```
$ grep -rn 'from "@src\|from "../../../src/' demo/ | wc -l
0
```

Zero today. Nothing structural keeps it zero. Round 2's §0 correctly measured that no demo module
reaches into `src/`; what neither round measured is that **nothing prevents the next one from doing
so.** Combined with L2-2 (the `paths` map does not mirror `exports`), the keystone's *only* two
guardrails are one dead lint block and one drifted hand-written config.

**Repro:** the three commands above.

**Cure — re-aim the invariants at the tree that exists, and write the one that was never written.**

```js
// 1 — the dogfood keystone, made structural (this rule has never existed)
{ files: ["demo/**/*.{ts,vue}"], rules: { "no-restricted-imports": ["error", { patterns: [
    { group: ["@src", "@src/*", "**/../src/**"],
      message: "T.W1 keystone: the demo consumes value.js ONLY through @mkbabb/value.js/* — never src/." },
    { group: ["reka-ui"],
      message: "r1 L-6: reka-ui is glass-ui's private dependency; type against glass-ui's own surface." },
]}]}},
// 2 — G-DEMO-1, re-homed: lower layers stay lower
{ files: ["demo/color-session/**", "demo/shared/**", "demo/platform/**"],
  rules: { …ban "../workbenches/**", "../scenes/**", "../shell/**", "../palettes/**"… }},
// 3 — G-DEMO-3a, re-homed: sibling-workbench isolation
{ files: ["demo/workbenches/*/**"], rules: { …ban other workbenches' internals… }},
// 4 — G-DEMO-3b, re-homed: demo/palettes/browser reached through its barrel
{ files: ["demo/**/*.{ts,vue}"], rules: { …ban "**/palettes/browser/**/*.vue"… }},
```

Rule 2 alone would have made r1 L-2 a build error. Rule 3 would have made r1 L-3's divergence
visible. Rule 1 would make L2-2's phantom keys unwritable. **This is one config file, and it turns
seven of the sixteen prior findings from "fixed" into "unrepresentable".**

---

## §2 · L3-2 — MAJOR · glass-ui 7.0.0 *retired* the polymorphic API by name; and the demo has `variant` and `tag` exactly backwards

Both prior BLOCKERs re-verified this run at the producer declaration level. Both hold. Both are
sharper than stated.

### 2a — `Button` has no `variant` (r2 L2-1 — CONFIRMED)

```
$ python3 -c "import json;print(json.load(open('node_modules/@mkbabb/glass-ui/package.json'))['version'])"
7.0.0

$ head -20 node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    /** Semantic intent, orthogonal to emphasis. */
    tone?: Tone;
    size?: ButtonSize; iconOnly?: boolean; loading?: boolean;
    type?: …; disabled?: …; class?: …;
}
```

No `variant`. `MixConfigBar.vue:163` passes `variant="primary-audacious"`. Round 2's live-DOM
evidence (`data-emphasis="secondary"`, the string landing as a raw fallthrough attribute) stands
unchallenged.

### 2b — `WatercolorDot` has no `tag` (r1 L-1 — CONFIRMED)

```
$ sed -n '23,60p' node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
color: string;  variant?: "solid" | "ghost";  animate?: boolean;
cycleDuration?: number;  range?: [number, number];  seed?: string;
```

Six props. No `tag`. `MixSourceSelector.vue:168` and `:215` both pass `tag="button"`.

### 2c — the sharpening neither round carried: `tag` was *retired by name*, and its successor is documented

`node_modules/@mkbabb/glass-ui/dist/components/_shared/primitive.d.ts`:

```ts
:2   export type AsTag = string;
:7   export interface PrimitiveProps {
:9       asChild?: boolean;
:11      /** Element or Vue component to render when `asChild` is false. */
:11      as?: AsTag | Component;
     }
:19  /** Forward ordinary host attributes without reviving a retired polymorphic API. */
     export declare function fixedHostAttrs(attrs: Readonly<Record<string, unknown>>): Record<string, unknown>;
```

glass-ui 7.0.0 does not merely *lack* `tag` — it **names the retirement in its own doc comment** and
ships `as` as the replacement, plus a helper (`fixedHostAttrs`) whose entire stated purpose is to
forward host attributes *without* reviving the API the demo is still writing. The producer
documented the migration; the consumer never read it. 26 `tag="…"` sites survive in `demo/**/*.vue`.

### 2d — the inversion that makes this a *taxonomy* failure, not a typo

| primitive | has `variant`? | has `tag`? | what the demo passes |
|---|---|---|---|
| `Button` | **NO** (`emphasis`/`tone`) | no (`as`) | `variant="primary-audacious"` ✗ |
| `WatercolorDot` | **YES** (`"solid" \| "ghost"`) | **NO** | `tag="button"` ✗ |
| `SelectTrigger` | **YES** (`"default" \| "ghost"`) | — | `variant` — ✓ (r2 §1) |

The demo passes `variant` to the one primitive that dropped it and `tag` to one that never had it,
while the primitive that *does* take `variant` is used correctly. This is not two typos. It is a
consumer whose model of the design system's prop taxonomy is stale in **both** directions
simultaneously — which is exactly why round 2's cure move 1 ("audit the whole consumer surface
against the 7.0.0 `.d.ts` set") is the right shape and must be **mechanised**, not spot-fixed:
a human reading 55 call sites will not reliably notice that `variant` is right on one component and
wrong on another.

**Repro:** the three `.d.ts` reads above; `grep -rn 'tag="' demo/ --include="*.vue" | wc -l` → 26.

**Cure — unchanged from round 2's three moves, with the first now specified.** Generate the
allowlist: for each `@mkbabb/glass-ui` component used in `demo/`, read its `.vue.d.ts` prop
interface and emit an eslint rule. Every `<C p=…>` where `p ∉ Props(C)` is an error. glass-ui
already ships the declarations; this is a build-time script, not a judgement call. Then migrate:
`tag="button"` → `as="button"` (the producer's own successor), `variant="outline"` →
`emphasis="secondary"`, `ghost` → `emphasis="quiet"`, `destructive` → `tone="danger"`.
`primary-audacious` has no 7.0.0 home — **relay to the glass-ui BH inbox** (standing fond).

---

## §3 · L3-3 — MAJOR · `.section-label` has four spellings, and this component's duplicated name has already drifted

Round 2's L2-6 found two spellings (`<label>` here, `<span>` at the twin) and correctly noted
`label.control === null`. The census is wider and one consequence has already fired.

### 3a — four element spellings, seven files

```
$ grep -rn "section-label" demo/ --include="*.vue"
GradientVisualizer.vue:163,180,197,229   <span  class="section-label">
MixConfigBar.vue:98,121,145              <label class="section-label">
MixSourceSelector.vue:183                <span  class="section-label">
GenerateControls.vue:221,255             <span  class="section-label">
SearchFilterBar.vue:20,32,48,63          <div   class="section-label">
TagEditPopover.vue:8                     <div   class="section-label">
AdminTagsPanel.vue:87                    <div   class="section-label">
```

`<label>` (3) · `<span>` (7) · `<div>` (6). One design-system concept, three host elements, chosen
per-site. The root cause is a **public-surface** defect in glass-ui, and round 2 half-recorded it
while marking it sound (§10.4: *"`.section-label` itself is correctly glass-ui-owned … That part is
sound; only the element is wrong."*). The *class* is owned; the **atom is not**:

```
node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css
  @layer components { … .section-label { @apply text-mono-caption; color: var(--muted-foreground); } … }
```

glass-ui ships the paint and no component. With no component there is no home for the element choice
or the label association, so sixteen call sites each invent one. Shipping a styling recipe without
its atom **guarantees** divergence — that is the structural finding, and it is not "sound".

### 3b — the drift has already happened, inside this component

```vue
:145            <label class="section-label">Size mismatch</label>
:147            <SelectTrigger aria-label="Size mismatch strategy" class="h-9">
```

Because the `<label>` associates with nothing, the accessible name must be re-typed on the trigger —
and the two copies **already disagree**. The visible caption says "Size mismatch"; the announced name
says "Size mismatch strategy". The other two pairs still agree (`:98`/`:100` "Color space",
`:121`/`:123` "Hue method") — for now. One of three has drifted in a 173-line file; the failure mode
round 2 predicted is already realised, one control over.

**Repro:** read `MixConfigBar.vue:144-148`; the grep above.

**Cure — glass-ui owns it (edict 4), relay to the BH/BI inbox.** Ship `FieldLabel` (or `Label`
`variant="section"`) owning the element, the `for`/`id` wiring and the class:

```vue
<FieldLabel for="mix-leftover">Size mismatch</FieldLabel>
<Select id="mix-leftover" …>   <!-- accessible name DERIVED, never re-typed -->
```

Sixteen sites converge, the three `aria-label` duplicates in this file disappear, and the drift at
`:145`/`:147` becomes structurally impossible. Note glass-ui's `PrimitiveProps` already gives the
`as` escape hatch for the rare `<div>` caption — so one atom covers all three current spellings
without a shim.

---

## §4 · L3-4 — MINOR · dead `.section-subtitle` CSS, and a design doc that still calls it live

`MixConfigBar.vue:95-96` records the excision in its own template:

```html
<!-- W5-7: the permanent subtitles died — the dropdown's own
     #description rows already tell the story once, on demand. -->
```

The recipe outlived the excision. `demo/styles/utils.css:13-27` still ships ten lines of it
(including a `-webkit-box` / `-webkit-line-clamp` Safari-floor pair), and:

```
$ grep -rn "section-subtitle" demo/ | grep -v "styles/utils.css"
demo/DESIGN.md:58: The `.section-subtitle` recipe (utils.css:18-27) is a single-line caption variant of
                   glass-ui's `.section-label` … — consumed by the gradient / mix / generate control bars.
```

**Zero template consumers.** The design doc asserts three — the exact three control bars W5-7
stripped, one of which is this component. So the demo's own design authority describes a surface
that has not existed since S.W5-7, next to CSS that no selector can reach. Edict 2 (no legacy).

This does not engage edict 6: `.section-subtitle` is a `line-clamp` typography recipe with no
keyframes and no animation. Nothing to move or tokenize; it is simply unreachable.

**Repro:** the grep above.

**Cure.** Delete `.section-subtitle` from `demo/styles/utils.css`; delete `DESIGN.md:58`.

---

## §5 · L3-5 — MINOR · `demo/color-session/` is a god directory with two homes for one concept

Round 2's lattice (§9 L3 stratum) places `InterpolationSelects.vue`, `color-space-meta.ts`,
`color-chips/` and `picker-color.ts` in `demo/color-session/` — correct as *relative* placement, but
it adds to a directory that is already the demo's largest undifferentiated bag:

```
$ wc -l demo/color-session/*.ts demo/color-session/*.vue
   …
   3093 total          # 23 files
```

Its contents span, with no internal boundary: stateless color math (`color-utils` 25,
`picker-color` 217, `generate-color` 243), vocabulary tables (`color-space-meta` 43,
`colorSpaceInfo` 334, `color-names` 44), contrast/ink machinery (`ink` 174,
`useContrastSafeColor` 376, `palettes-ramp` 120, `view-accent` 47), a PRNG (`prng` 11), a chip
component module (`color-chips/`), a 311-line SFC (`ColorSpaceSelector.vue`), and nine composables
including a 335-line `useColorPipeline`. **"Session" names state; more than half the directory is
stateless leaves.** Edict 1 (no god modules) is about files, but the same logic reaches a directory
that has become the place things go when no better home is obvious.

And it holds **two** homes for "per-space metadata":

| module | lines | content | keyed by |
|---|---|---|---|
| `color-space-meta.ts` | 43 | interpolation label + description, 9 rows | `PickerSpace` (untyped subset — L2-4) |
| `colorSpaceInfo.ts` | 334 | documentation prose per space (white point, gamut, conversions…) | a separate hand-maintained key set |

Nothing relates their key sets. Adding a space means editing two tables in one directory with no
compiler linking them — the same defect shape as L2-4/L2-5, one level up.

**Repro:** the `wc -l` above; read `colorSpaceInfo.ts:1-17` beside `color-space-meta.ts:1-43`.

**Cure — split the bag along the axis that already exists (see §8).** `demo/color/spaces.ts` merges
both metadata tables into one `satisfies Partial<Record<SpaceId, SpaceMeta>>` where `SpaceMeta`
carries *both* the interpolation vocabulary and the prose; `demo/color/convert.ts` for the css⇄Color
seam; `demo/color/ink/` for contrast/accent; `demo/color/session/` for the actual stateful
composables — the only part the name "session" ever described.

---

## §6 · Sharpening r1 L-2 — the component contradicts itself inside a two-line window

Round 1 established that `demo/palettes/mix.ts` is the Mix workbench's domain module homed in a
sibling feature. Re-verified:

```
$ grep -rn 'palettes/mix"' demo/ test/ e2e/
demo/workbenches/mix/MixConfigBar.vue:14
demo/workbenches/mix/composables/useMixingState.ts:21
test/mix-v4.test.ts:4
```

Every consumer is the Mix workbench; nothing in `demo/palettes/` imports it.

What neither round recorded is that **the component states the principle and violates it two lines
apart**:

```ts
:14  import type { LeftoverStrategy } from "../../palettes/mix";
:15  import type { AcceptableValue } from "reka-ui";
:16  // S.W5-6 · F16: the interpolation vocabulary lives in its neutral @lib/ home
:17  // (color-space facts, not gradient facts) — no more cross-feature reach.
```

Line 16-17 celebrates the cure of a cross-feature reach. Line 14 commits one. Line 15 commits a
reach past the design system into its private dependency (r1 L-6). The comment is not wrong about
its own subject — the interpolation vocabulary *was* correctly re-homed — it is simply blind to the
two edges printed directly above it. That is the signature of L3-1: with no lint enforcing the
principle, the principle survives only where someone happened to write it in prose.

---

## §7 · L3-6 — MINOR · three hand-rolled v-model pairs; **this partially contests round 2 §10.3**

Round 2's negative proof recorded:

> *"**Idiomatic Vue 3.5.** Reactive props destructure with a default (`:25-45`), typed `defineEmits`
> (`:76-81`), lazy `computed` over props (`:57-74`). No `defineModel` stale-read hazard — the
> component is emit-based, holds no local mirror of a model value. Edict 7 satisfied."*

The stale-read half is correct and I confirm it: there is no local mirror, so the `shallowRef`
caveat does not apply. But "emit-based" is not a neutral choice here — the parent binds all three as
v-models:

```vue
MixPane.vue:98-100
  <MixConfigBar v-model:color-space="colorSpace"
                v-model:hue-method="hueMethod"
                v-model:leftover-strategy="leftoverStrategy" …
```

So the component *is* a three-model component, hand-spelled as 3 props + 3 emits + 3 inline cast
lambdas (~14 lines, `:25-45`, `:76-81`, `:99`/`:122`/`:146`). `defineModel` is the Vue 3.5 idiom for
exactly this, and it is not a novelty in this repo — **13 demo files use it**, including the
immediate sibling and the file round 1 named as this component's diverged twin:

```
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:51
  const selectedStopId = defineModel<string | null>("selectedStopId", { default: null });
demo/shell/dock/DockViewSelect.vue:33 · demo/scenes/about/AboutPane.vue:72 · …
```

Two spellings of "this component has a two-way binding", one of them in the twin — the same
divergence r1 L-3 and L2-6 found in the feature set and the DOM semantics, now in the component API.
I do not claim edict 7 is *violated*; I claim §10.3 cleared it without weighing the divergence, and
that the divergence is the finding.

**Repro:** `grep -rln defineModel demo/ | wc -l` → 13; read `MixConfigBar.vue:25-45,76-81` beside
`GradientVisualizer.vue:51`.

**Cure.** `const colorSpace = defineModel<InterpolationSpace>("colorSpace", { required: true })` ×3
(the narrowed type from L2-4). Composed with r1 L-6's cure (a glass-ui `Select` generic over its
value), the three cast lambdas become plain `v-model` bindings: ~20 lines leave the file and the
three unchecked `as` widenings disappear.

---

## §8 · L3-7 — INFO (measured) · `mixColors` re-converts both endpoints per stop — the shape argument for L2-3

Round 2's L2-3 established that three hand-rolled chain samplers are the specification for a library
`sampleColorRamp`. One fact strengthens it into a library *obligation* rather than a consumer
convenience: the binary primitive is not merely too granular, it is **quadratically wasteful when
chained by construction**.

```ts
src/color/operations.ts:93-96
    const left  = convertColor(from, options.space);
    if (!left.ok) return left;
    const right = convertColor(to,   options.space);
```

Both endpoints are re-converted on **every** call. A k-stop ramp therefore performs `2k` conversions
where `2` suffice — the redundancy is unavoidable at the call site because the conversion is inside
the primitive. There is no ramp/sequence API to escape it:

```
$ grep -rln "ramp\|Ramp\|sequence\|sampleColors" src/color/ src/subpaths/
(no output)
```

Measured on the built `dist/`, the exact MixConfigBar dropdown workload (9 space rows + 4 hue rows,
2 operands, `RAMP_SAMPLE_COUNT = 16` → 17 stops each):

```
$ node <scratchpad>/bench.mjs
13 ramps x 17 stops : 0.222 ms per full recompute
mixColors calls per recompute = 221
convertColor calls forced INSIDE mixColors per recompute = 442  (2 per call)
```

**I am not claiming a performance defect and will not inflate one** — 0.222 ms is negligible, and
r1 L-9 already books the recompute volume correctly as INFO dormant behind r1 L-1. The finding is
about *API shape*: 442 conversions where 26 would do is the arithmetic proof that `mixColors` is
one granularity below what every consumer writes. A library whose primitive forces redundant work on
100% of its real call patterns is under-specified, and the three demo copies are the receipt.

One more receipt for the same point — the sample count is duplicated across the two samplers inside
this one feature, by hand:

```
demo/color-session/color-chips/sample.ts:31                       export const RAMP_SAMPLE_COUNT = 16;
demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:28 const RAMP_STOPS = 16;
```

Same value, same feature, two declarations, neither importing the other (and per L2-7 the first does
not mean what it says).

**Repro:** the bench above (script in the session scratchpad, never the repo); the two greps.

**Cure — round 2's `sampleColorRamp`, with the conversion hoisted:** convert each operand **once**,
then lerp across segments. Exported from `src/subpaths/color.ts`, it collapses site 1 to
serialization, site 2 to easing decoration, site 3 to an sRGB projection, folds `mixColorSequence`
(r1 L-2) alongside, and unifies `RAMP_SAMPLE_COUNT`/`RAMP_STOPS` into one exported constant that
means what it says (L2-7).

---

## §9 · L3-8 — MINOR · two of the nineteen alias barrels are dead, and one of them is the primitive §3 needs

Round 1's L-4 established `demo/ui/` as 19 alias barrels; round 2 added that `demo/ui/input` is the
sole barrel reaching a producer **subpath** while the other 18 flatten the root. The consumer census
adds the last fact:

```
$ for d in demo/ui/*/; do n=$(basename $d); echo "$(grep -rl "ui/$n\"" demo/ | wc -l)  $n"; done | sort -n
0  label
0  switch
1  collapsible
2  alert   2 avatar   2 checkbox   2 radio-group
3  separator
4  dropdown-menu   4 input   4 skeleton   4 tooltip
5  dialog   5 slider
6  select
7  badge   7 popover
12 card
22 button
```

`demo/ui/label` and `demo/ui/switch` have **zero** consumers — dead files inside a layer that is
itself pure indirection. And the dead one is exactly the primitive §3/L2-6 want:
`demo/ui/label/index.ts` re-exports glass-ui's `Label`, and `grep -rn "<Label" demo/` returns **0**.
The demo owns an unused alias to a label component while sixteen sites hand-roll
`<label|span|div class="section-label">`.

**Repro:** the census above; `grep -rn "<Label" demo/` → empty.

**Cure — folded into r1 L-4:** delete `demo/ui/` entirely, import
`from "@mkbabb/glass-ui"` (or the correct subpath) at each site. Every barrel is a flat re-export, so
symbol names already match and the rewrite is mechanical.

---

## §10 · Round-1 and round-2 findings — carried, with round-3 status

| id | sev | finding | round 3 |
|---|---|---|---|
| r1 **L-1** | BLOCKER | `tag="button"` on `WatercolorDot` ⇒ add-affordance pointer-dead ⇒ `operandColors` permanently `[]` ⇒ the T-17 chip apparatus is dead code | **carried + producer-verified.** `WatercolorDot.vue.d.ts:23-30` = 6 props, no `tag`. **Sharpened by L3-2c**: `tag` was retired *by name* and `as` is its documented successor (`primitive.d.ts:11,19`) |
| r1 **L-2** | MAJOR | `palettes/mix` is the mix domain homed in a sibling feature; `mixColorSequence` is library math | **carried + re-verified** (3 consumers, all `workbenches/mix/` + 1 test). **Sharpened §6**: the file contradicts itself at `:14` vs `:16-17` |
| r1 **L-3** | MAJOR | `GradientVisualizer` is a diverged second copy of the Select pair | **carried + re-verified.** `grep PreviewRamp demo/` → only MixConfigBar; the `color-chips/index.ts:14-18` Lane-G queue is still undrained. **Root cause named: L3-1** |
| r1 **L-4** | MAJOR | `demo/ui/` = 19 alias barrels, 90-vs-119 dual path | **carried + extended by L3-8** (2 barrels have zero consumers; the dead `label` is the primitive §3 needs) |
| r1 **L-5** | MAJOR | three-hop re-export chain preserved for import paths | **carried + re-verified.** `useGradientInterpolation.ts:14-17` (*"keep their import path"*) → `useGradientModel.ts:19-21` (*"── Re-exports (preserve public API surface) ──"*) → `GradientVisualizer.vue:19-21`. Self-declared back-compat, edict 2 |
| r1 **L-6** | MAJOR | `reka-ui`'s `AcceptableValue` used where glass-ui emits `SelectionValue`, which glass-ui does not publish | **carried + re-verified.** `grep AcceptableValue node_modules/@mkbabb/glass-ui/dist/*.d.ts` → empty. Blast radius measured: **4 files, 6 lambda sites, 6 unchecked `as` widenings.** BH relay stands |
| r1 **L-7** | MINOR | `STRATEGIES` non-exhaustive vs `strategyLabels` | **carried.** Adds: the same component consumes a *neutral vocabulary module* for spaces/hues (`:18`) and hardcodes the third vocabulary in its script block (`:83-89`) — two ownership rules for one kind of thing, in one file |
| r1 **L-8** | MAJOR | unowned portal teardown across route change bricks the next route | **carried.** Not re-run (round 1's `elementFromPoint` reproduction is decisive) |
| r1 **L-9** | INFO | ~208 `mixColors` per re-eval, dormant behind L-1 | **carried + measured: 221 calls / 442 conversions / 0.222 ms** (L3-7) |
| r2 **L2-1** | BLOCKER | `variant="primary-audacious"` is not a 7.0.0 `Button` prop; 51/55 sites carry a dead prop | **carried + producer-verified** (`Button.vue.d.ts:4-19`, glass-ui 7.0.0 installed). **Sharpened by L3-2d**: the demo has `variant`/`tag` backwards across two primitives — a taxonomy failure, not two typos |
| r2 **L2-2** | MAJOR | `tsconfig.demo.json#paths` ≠ `package.json#exports` — 3 phantom keys, 2 unmapped real keys | **carried + independently re-verified** (§0, separate `import.meta.resolve` run). Adds: all three phantom targets are files that do not exist (`ls dist/index.d.ts dist/subpaths/{parsing,units}.d.ts` → 3× No such file) |
| r2 **L2-3** | MAJOR | three chain samplers, three divergent joint conventions | **carried + extended by L3-7** (the library-side shape argument + the duplicated `16`) |
| r2 **L2-4** | MAJOR | `PickerSpace = SpaceId` (17) but 9 render — 8 unrenderable admitted states | **carried.** Adds: `PickerColor = AnyColor` (`picker-color.ts:34`) is a second bare rename in the same file; `PickerColorIn` is the one alias that earns its name |
| r2 **L2-5** | MAJOR | `HUE_INTERPOLATION_METHODS` non-exhaustive over a **library-owned** union | **carried.** Adds: `picker-color.ts:70` already does it right — `satisfies Record<SpaceId, readonly ChannelMeta[]>` — in the same directory. The idiom exists and was not applied |
| r2 **L2-6** | MINOR | two dangling `<label>`s; the twin uses `<span>` | **carried + escalated to MAJOR as L3-3**: four spellings across 7 files, and the drift has already fired at `:145`/`:147` |
| r2 **L2-7** | MINOR | `RAMP_SAMPLE_COUNT = 16` yields 17–22; the oracle is tautological on count | **carried.** Adds: the constant is also duplicated by hand as `RAMP_STOPS = 16` (L3-7) |

---

## §11 · The greenfield lattice — three rounds folded

Four strata, edges only downward, one home per concept — and, new this round, **each edge enforced
by a rule that matches a directory that exists**.

```
  L4  demo/workbenches/mix/       MixPane · MixSourceSelector · MixConfigBar · MixResultDisplay
                                  mix-domain.ts   ← r1 L-2 (relocated out of demo/palettes/)
                                                    LeftoverStrategy + LEFTOVER_STRATEGIES (r1 L-7)
      demo/workbenches/gradient/  GradientVisualizer — consumes L3's control, keeps no copy
      demo/palettes/              the palettes feature only; exports no mix math
        │  ⟦lint 3⟧ no workbench imports another workbench's internals          ← L3-1
        │  MixConfigBar: 173 → ~60 lines. 3× defineModel (L3-6) + <InterpolationSelect>
        │  + the leftover row + the verb. No reka import, no `as` casts, no vocabulary,
        │  no ramp computation, no cross-feature edge.
        ▼
  L3  demo/color/                 ← replaces demo/color-session/ (L3-5)
        InterpolationSelect.vue   ← r1 L-3 / L2-6 / L3-3 — ONE space+hue control, two consumers
        spaces.ts                 ← color-space-meta + colorSpaceInfo MERGED, one key set,
                                    `satisfies Partial<Record<SpaceId, SpaceMeta>>` (L2-4/L2-5/L3-5)
        convert.ts                ← the ONE css⇄Color seam
        chips/                    ← PreviewRamp/PreviewStrip, presentational only (L2-3)
        ink/  session/            ← contrast+accent · the genuinely stateful composables
        │  ⟦lint 2⟧ L3 never imports an L4 feature tree                         ← L3-1
        ▼
  L2  @mkbabb/glass-ui/{select,button,card,forms,typography,…}
        ONE specifier per primitive at its OWN subpath — demo/ui/ deleted     ← r1 L-4 / L3-8
        Select generic over its value; SelectionValue exported                ← r1 L-6
        FieldLabel ships the atom, not just the .section-label class          ← L3-3
        primitives declare inheritAttrs:false / consumers lint against .d.ts  ← L2-1 / L3-2
        │  ⟦lint 1⟧ zero demo edges to reka-ui                                 ← L3-1 / r1 L-6
        ▼
  L1  @mkbabb/value.js/color      mixColors · sampleColorRamp (endpoints converted ONCE)
                                                                    ← r1 L-2 / L2-3 / L3-7
        resolved ONLY through package.json#exports — paths generated, never hand-mirrored ← L2-2
        │  ⟦lint 1⟧ no demo module names src/ — the T.W1 keystone made structural ← L3-1
  ⟂   demo/shell/                 owns route ↔ overlay lifecycle, one writer   ← r1 L-8
```

**Six rules that make all twenty-three findings unrepresentable rather than merely fixed.**
Rules 1–5 are rounds 1–2's, restated; **rule 0 is new and is the one that holds the other five up.**

0. **Every boundary in the lattice has a lint rule whose glob matches a directory that exists.**
   Rounds 1 and 2 proposed a lattice; this repo already had one, in `eslint.config.js`, aimed at
   `demo/@/**` — and W43 deleted `demo/@/`. A lattice with no live enforcement decays into exactly
   the sixteen findings those rounds recorded. Re-aim G-DEMO-1/3a/3b, and add the dogfood-keystone
   rule that was never written. **(L3-1)**
1. **A design-system prop that does not exist must not be silently accepted** — `inheritAttrs:false`
   on glass-ui primitives, or a demo lint rule generated from the producer `.d.ts`. Kills both
   BLOCKERs' *mechanism*. **(L2-1, r1 L-1, L3-2)**
2. **One resolution authority per boundary** — `package.json#exports` for value.js, generated never
   hand-mirrored; glass-ui's own subpaths for the design system, with no alias layer between and no
   reach past it. **(L2-2, r1 L-4, r1 L-6, L3-8)**
3. **A vocabulary, its renderer, and its atom live together, once** — `spaces.ts` +
   `InterpolationSelect.vue` + `chips/` in one directory consumed by two features that therefore
   cannot diverge; and the design system ships atoms, not loose classes. **(r1 L-3, r1 L-5, L2-6,
   L3-3, L3-5)**
4. **Enumerations and types are linked by construction, in the direction ownership runs** —
   `Record<LibUnion, Meta>` for library-owned unions; `as const` + `[number]["value"]` for
   demo-owned. The idiom already exists at `picker-color.ts:70`. **(L2-4, L2-5, r1 L-7)**
5. **The library's granularity is set by what consumers actually write** — three copies of a chain
   sampler, and 442 conversions where 26 suffice, are together the specification for
   `sampleColorRamp`. **(L2-3, r1 L-2, r1 L-9, L2-7, L3-7)**

---

## §12 · Negative proof — checked this round, genuinely sound

Recorded so the absences are evidence. One item revises round 2 (§7); the rest confirm it.

1. **The value.js import is one a real consumer could write.** `MixConfigBar.vue:12` →
   `@mkbabb/value.js/color`, a real `exports` key resolving under the real node resolver (§0),
   backed by `src/subpaths/color.ts:8`. **No deep `src/` reach anywhere in `demo/`** — re-confirmed
   independently: `grep -rn 'from "@src\|from "../../../src/' demo/ | wc -l` → `0`. The *code-level*
   dogfood boundary is the cleanest thing in this component. Its two guardrails (L2-2, L3-1) are not.
2. **`verbatimModuleSyntax` is honoured.** All four type-only imports (`:12`, `:13`, `:14`, `:15`)
   carry `import type`; the five value imports do not. Edict 8 satisfied.
3. **No god module here.** 173 lines, one job, one `computed` pair. Every defect in this report is a
   *boundary* defect. The god-module finding in its neighbourhood is a **directory**, not this file
   (L3-5).
4. **No styling contraband in the component.** No `<style scoped>`, no `:deep()`, no numeric
   `z-[NN]`, no `100vh`, no per-instance material override. `.section-label` and `.text-micro` are
   glass-ui utilities. Edicts 5 and 6 satisfied *by the component*; L3-4's dead recipe is in
   `demo/styles/utils.css`, not here.
5. **Animations: none declared, none deleted.** Edict 6 is not engaged by this component. L3-4's
   deletion target carries no keyframes.
6. **It contributes none of `/#/mix`'s a11y defect counts.** `REPORT.json` lists 8 small tap targets
   for `safari-desktop-light /#/mix` (dock slug controls 22×22, picker channel rails 12×24) and
   1 nameless button (`class="send-btn btn-interactive"`, outside `<main>`) — **none** this
   component's. Its own controls are `227×36` and `462×40`, both accessibly named. The L3-3 defect is
   a *drifted duplicate* name and an inert element, not a missing name — which is precisely why the
   visual audit cannot see it.
7. **The route is clean on every hard signal in all four Safari matrices.** `REPORT.md:123,138,153,168`
   — `overflowX 0 · main 1 · pageErr 0 · consoleErr 0` for `safari-{desktop,mobile}-{light,dark}`.
   The `safari-desktop-light/mix.png` capture renders the bar correctly: COLOR SPACE + HUE METHOD
   selects side by side, the size-mismatch row correctly hidden in colors mode, the CTA full-width.
8. **`vue-tsc -p tsconfig.demo.json --noEmit` exits 0; `eslint` is clean on the file.** Round 2 named
   this the through-line and it is only stronger now: `eslint` is clean **because the rules that
   would have spoken resolve to `null`** (L3-1). Six green gates over two dead props, a false path
   map, and an enforcement layer aimed at a deleted directory.

---

## §13 · Verdict

**DEFECTIVE** — cumulative across three rounds: **2 BLOCKER · 12 MAJOR · 7 MINOR · 2 INFO.**

**Strongest defect this round: L3-1.** `eslint.config.js` carries three named structural invariants
governing the demo's module graph — G-DEMO-1, G-DEMO-3a, G-DEMO-3b. Every glob names `demo/@/**`.
W43 (RF-15) deleted `demo/@/`. `npx eslint --print-config demo/workbenches/mix/MixConfigBar.vue`
returns `no-restricted-imports: null`, and the same is true for `GradientVisualizer.vue`,
`color-chips/sample.ts` and `palettes/mix.ts` — the whole post-W43 demo. Only `src/**` still has a
live rule.

That reframes both prior rounds. Rounds 1 and 2 closed on *"there is more than one home for one
concept"*, listed at seven boundaries, and proposed a lattice to fix it. **This repository already
had that lattice.** It was written down, in lint, as three named invariants — and then a
restructuring wave moved every directory out from under it and nobody re-aimed the globs. The
feature-to-sibling-feature reach (r1 L-2), the diverged second copy (r1 L-3), the compat re-export
chain (r1 L-5), the reach past the design system into `reka-ui` (r1 L-6), and the three chain
samplers (L2-3) are not five independent lapses of judgement. They are what a module graph does when
the rule that forbade them stopped matching any file.

The second-strongest is **L3-2**, which converts round 2's L2-1 from an incident into a taxonomy
failure: glass-ui 7.0.0 *retired the polymorphic `tag` API by name* and documents `as` as its
successor (`primitive.d.ts:11,19`), while the demo passes `tag` to a primitive that never had it and
`variant` to the one primitive that dropped it — and passes `variant` correctly to the one that kept
it. The consumer's model of the producer's prop surface is stale in both directions at once. No
human reading 55 call sites will catch that reliably; only a rule generated from the shipped
declarations will.

Everything else in all three rounds is one sentence at eight boundaries — **there is more than one
home for one concept** — and one new sentence underneath it: **the rule that said there must be only
one no longer matches any file in the demo.**

---

*Seat: CHALLENGE-L (library structure), round 3. Round 1 preserved verbatim at
`challenge-L-library-round-1.md`; round 2 preserved verbatim at `challenge-L-library-round-2.md`.
No source edits land from this formation. Probe and benchmark scripts written to the session
scratchpad, never to the repository.*
