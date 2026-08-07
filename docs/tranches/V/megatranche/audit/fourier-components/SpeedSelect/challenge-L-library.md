claude-opus-5[1m]

# CHALLENGE — `SpeedSelect.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/SpeedSelect.vue` (70 LOC, committed clean — `git status --porcelain` shows it NOT in the 28-row dirty WT; last touched `262c3d0 feat(adopt): I AQ-gated arms + 3.1.0 adoption`)
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every row below carries severity + `file:line` + its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).
**Method** static + source-derived only. No browser tooling. One measurement was run and it is write-free: `npx vue-tsc --noEmit -p tsconfig.json` in `web/` (tsconfig has `noEmit: true`, no `incremental`, no `composite` → tsc emits nothing). `git status --porcelain` diffed identical before/after; `web/tsconfig.tsbuildinfo` mtime unchanged (Jul 13 15:10). **Zero writes to any product tree.** Rows whose *rendered* consequence needs a live viewport are marked `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Score** 10 defects · 0 BLOCKER · 5 MAJOR · 4 MINOR · 1 INFO · 3 superlatives · 2 non-defect records.

---

## §0 — The whole read surface

`SpeedSelect.vue` imports exactly two things. Both were read to their definitions:

| import | resolved | read |
|---|---|---|
| `vue` → `computed` | — | — |
| `@mkbabb/glass-ui/select` → `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` | `node_modules/@mkbabb/glass-ui@4.0.0` `exports["./select"] = {types: "./dist/select.d.ts", import: "./dist/select.js"}` | `dist/select.js`, `dist/select.d.ts`, `dist/components/ui/select/*.d.ts` (all 11), the impl chunk `dist/SelectScrollDownButton-C1jb3b3K.js`, the shipped CSS (`dist/styles/**`), and the **producer at 7.0.0** `/Users/mkbabb/Programming/glass-ui/src/components/select/{SelectTrigger,SelectValue}.vue` |
| (transitive) `reka-ui@2.9.10` | `SelectRoot`, `SelectValue`, `SelectTrigger`, `SelectIcon` | `dist/Select/SelectValue.js` whole; `dist/index3.d.ts:231` (`AcceptableValue`) |

Consumer seam read whole: `AnimationControls.vue` (224, the ONLY consumer — `grep -rn "SpeedSelect" web/src` → 3 hits: `:13` import, `:96`, `:117`).
Store seam read whole: `stores/animation.ts` (145).
Persistence seam read: `composables/useWorkspaceLoader.ts:47-58`, `VisualizationView.vue:52-66`, `lib/defaults.ts`, `lib/types.ts:44-51`, `api/models/shared.py:65-71`.
Render seam read: `BasisCanvas.vue` (547) — the `anim.t` consumption sites.

---

## §1 — Defects

### SS-L-01 · MAJOR · the trigger renders **completely empty** for any speed outside the five hardcoded literals

`SpeedSelect.vue:24` `get: () => String(props.modelValue)` stringifies an **unconstrained** `modelValue: number` (`:13`) and hands it to a `Select` whose entire option registry is five literals (`:38-42`): `"0.25" "0.5" "1" "2" "4"`. `:35` is `<SelectValue />` — **no `placeholder`**.

Mechanism, quoted from `node_modules/reka-ui/dist/Select/SelectValue.js:33-43`:

```js
const selectedLabel = computed(() => {
  const options = Array.from(rootContext.optionsSet.value);
  const getOption = (value) => options.find((o) => valueComparator(value, o.value, rootContext.by));
  ... list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
  return list.filter(Boolean);            // ← no match ⇒ []
});
const slotText = computed(() =>
  selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder);
```
with `placeholder` declared `default: ""` at `:11-14`. **No match ⇒ `selectedLabel` = `[]` ⇒ `slotText` = `""` ⇒ the trigger paints a bare chevron and nothing else.** There is no raw-value fallback anywhere in the chain. glass-ui 7.0.0 does not cure it either — `src/components/select/SelectValue.vue` template: `{{ selectedLabel.length ? selectedLabel.join(", ") : props.placeholder }}`, same blank.

**Reachability is not hypothetical.** `useWorkspaceLoader.ts:57` is a writer:
```ts
if (as?.speed) anim.speed = as.speed;     // as = store.animationSettings, loaded from the API
```
and the API type is `api/models/shared.py:70` — `speed: float = 1.0`. No `Literal`, no `ge`/`le`, no validator, no enum. Any of the 45 documented operations may set `animation_settings.speed = 3` and that workspace's speed control is permanently blank on load.

**Corroborating receipt — the tree already ships client/server divergence on this exact object.** Every other numeric field of `AnimationSettings` disagrees between the two definitions:

| field | `web/src/lib/defaults.ts` | `api/models/shared.py:65-71` |
|---|---|---|
| `fps` | 60 | 30 |
| `duration` | 5000 | 30.0 |
| `max_circles` | 100 | 80 |
| **`speed`** | **1** | **1.0** ← agrees by luck, not by constraint |

(and the store carries a *third* duration, `animation.ts:23` `duration = ref(20000)`.) The one field SpeedSelect depends on is the one field nothing keeps in the domain.

**Internal contradiction proving the enumeration is the narrower contract:** `AnimationControls.vue:75` renders the *same store cell* through a different component — `<MetricBadge :value="anim.speed" unit="×" size="sm" />` — which displays **any** float correctly. So at `speed = 3`, the collapsed dock summary reads `3×` while the expanded dock's speed control reads blank. Two renderers, one value, divergent domains, in one file.

**Falsifiers.** (a) *If reka-ui fell back to `String(modelValue)` on no-match*, the trigger would read `3` and the row dies — it does not; `SelectValue.js:33-43` is quoted verbatim above. (b) *If the API pinned the domain* (`speed: Literal[0.25,0.5,1,2,4]` or a `Field(ge=…, le=…)` + client clamp), the write path is closed and the row downgrades to INFO — `shared.py:70` is a bare `float = 1.0`. (c) *If `useWorkspaceLoader:57` clamped or snapped to the nearest option*, likewise — it assigns raw. All three are open.

---

### SS-L-02 · MAJOR · a hardcoded `height` literal defeats the producer's documented WCAG-2.5.5 control floor

`SpeedSelect.vue:50` `height: 1.75rem` (28px) and `:62` `height: 2rem` (32px).

The producer's trigger emits `h-(--control-h-md)` (glass-ui `dist/SelectScrollDownButton-C1jb3b3K.js`, `sizeClass` default arm; same at 7.0.0 `src/components/select/SelectTrigger.vue:48-56`). That resolves to `dist/styles/tokens/offsets-sizing.css:151`:

```css
--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor));
```

and `dist/styles/tokens/light-dark.css:17-22`:
```css
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
```
The producer's own comment two lines above (`light-dark.css:10-16`) states the invariant in full:

> *"The WCAG-2.5.5 44px touch floor is enforced HERE too: `--control-floor` lifts to `--touch-target`, so every scaled control-height `max(scaled, floor)` clamps at ≥ 44px regardless of the scalar — **a consumer dialing `--ui-scale` below 1 still cannot drop a control under the target**."*

The consumer cannot drop it *through the token*. It drops it with a literal. On a coarse pointer the cohort resolves to `max(3.75rem, 2.75rem)` = **60px**; SpeedSelect pins **28px** — 47% of the cohort height, 64% of the 44px floor.

**Cascade proof (this is a win, not a tie).** Vite emits SFC `<style scoped>` output **unlayered**. glass-ui's shipped utility bundle `dist/styles/components.css` contains **zero** `@layer` at-rules (`grep -o "@layer [a-z, ]*" components.css | sort -u` → empty), so `.h-\(--control-h-md\){height:var(--control-h-md)}` is also unlayered, specificity **(0,1,0)**. `.speed-trigger[data-v-…]` is **(0,2,0)**. The literal wins outright, and it would still win if the utilities *were* layered (unlayered beats layered). No fragile assumption here.

**Falsifiers.** (a) *If the scoped rule landed inside a lower `@layer`* the token would win — Vite does not layer scoped CSS and the utility bundle declares no layer; both were grepped. (b) *If `--control-h-md` were undefined at 4.0.0* the height would already be `auto` and the literal harmless — it is defined at `tokens/offsets-sizing.css:151` (my first grep over `dist/styles/*.css` missed it; it lives in `tokens/`, and the corrected recursive grep found it). (c) The **rendered** px under `pointer: coarse` — `UNPROVEN-NEEDS-LIVE (SS-13)`: emulate a coarse pointer and read `getComputedStyle($('[aria-label="Playback speed"]')).height`. The *cascade* is proven; only the device-conditional value is not.

---

### SS-L-03 · MAJOR · orphaned `backdrop-filter` — a compositing layer kept alive over a transparent element, adjacent to the 60fps canvas clock

`SpeedSelect.vue:55-56` neutralises two of `.control-surface`'s four declarations and leaves the two expensive ones:

```css
border: none;      /* kills .control-surface border */
background: none;  /* kills .control-surface background */
/* backdrop-filter: NOT reset */
```

`.control-surface` (`dist/styles/glass/surfaces.css:241-246`):
```css
.control-surface { background: var(--control-surface-bg);
                   border: 1px solid var(--control-surface-border);
                   backdrop-filter: var(--control-surface-blur);
                   -webkit-backdrop-filter: var(--control-surface-blur); }
```
with `--control-surface-blur: var(--glass-blur-quiet)` (`dist/styles/tokens/glass.css:182`) — a live blur, not `none`. So the default variant ships a **backdrop-filter on a fully transparent, border-less element**: it promotes a compositing layer and forces a backdrop-root re-sample of everything painted behind it, for zero visual payoff (the payoff was the frosted fill, which line 56 deleted).

**Why this is on the viz render path.** Census §3a is explicit: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces [FE §6]"* (`CENSUS-2026-08-03.md:85-87`). SpeedSelect is mounted inside `<GlassDock class="animation-dock">` (`AnimationControls.vue:58`), which floats over that epicycle canvas. The canvas redraws off `anim.t` (`BasisCanvas.vue:140,322` `fourierPositionsAt(components, anim.t, …)`, watch at `:419`), advanced by the store rAF tick (`stores/animation.ts:58-70`). Every one of those repaints is a candidate backdrop-root invalidation for the blur region sitting on top of it. Census §3a also names the same subtree as the *highest-value, highest-risk* convergence target (`BasisCanvas` + `canvas-drawing/` 1 311 LOC Canvas2D vs glass-ui's GPU-backed `FourierField`, `:96-98`) — free per-frame cost in the dock over that canvas is exactly the wrong direction.

**Falsifiers.** (a) *If `--glass-blur-quiet` resolved to `none`/`0px`* the filter is free — `tokens/glass.css:182` chains it to a live blur token, and `.speed-trigger-compact` deliberately *keeps* the background, proving the author treated the surface as visually load-bearing for one variant. (b) *If browsers skipped backdrop-filter on a fully transparent box* — they do not; the filter samples the backdrop regardless of the element's own paint. (c) The **measured** frame cost: `UNPROVEN-NEEDS-LIVE (SS-13)` — trace with the dock expanded and playback running, compare against a build with `backdrop-filter: none` added. The *presence* of the un-reset declaration is proven by cascade, not measurement.

---

### SS-L-04 · MAJOR · the trigger is narrower than its own longest label, in **both** variants

Widths are pinned: `:51` `width: 3.5rem` (56px) and `:63` `width: 4rem` (64px). The producer's trigger contributes fixed, non-shrinkable furniture on the same line box:

- `px-3` → 12px + 12px = **24px** of padding (Tailwind v4 `--spacing` 0.25rem; `box-sizing: border-box` from Preflight, active via `@import "tailwindcss"` at `style.css:1`);
- a `shrink-0` chevron, `h-4 w-4` = **16px** (glass-ui trigger render body, `SelectIcon` arm — `class="… h-4 w-4 shrink-0 opacity-50"`; unchanged at 7.0.0 `SelectTrigger.vue:82-84`);
- `[&>span]:line-clamp-1` on the trigger → `overflow: hidden` on the value span. reka-ui's `SelectValue` renders `as: "span"` by default (`SelectValue.js:20-23`), so it *is* that direct `>span`.

Budget for the value text:

| variant | width | − px-3 | − chevron | **text budget** | `"0.25×"` @ 14px Fira Code (0.6em advance ×5) |
|---|---|---|---|---|---|
| `.speed-trigger` | 56px | 32px | **16px** | **16px** | ~42px → clipped to ≈2 glyphs |
| `.speed-trigger-compact` | 64px | 40px | **24px** | **24px** | ~42px → clipped to ≈3 glyphs |

Even the shortest label `"1×"` (~17px) exceeds the default variant's 16px budget. `@apply text-sm` at `:54`/`:66` pins 14px, and `font-family: "Fira Code", monospace` at `:53`/`:65` is asserted without the file (or `style.css`) guaranteeing that face is loaded — the fallback is whatever generic monospace the platform picks, which changes the arithmetic but not its sign.

**Falsifiers.** (a) *If the producer trigger had no padding or hid the chevron*, the budget changes — both are shipped and quoted, at 4.0.0 and 7.0.0. (b) *If the value span had `flex-shrink: 0`* it would overflow visibly instead of clipping — it does not; `line-clamp-1`'s `overflow:hidden` gives it `min-width: 0` behaviour, so it clips silently, which is worse (a clipped label reads as a *correct* short label). (c) The exact glyph advance for the actually-resolved face: `UNPROVEN-NEEDS-LIVE (SS-13)` — the one-line check is `const s=$('.speed-trigger>span'); s.scrollWidth > s.clientWidth`.

---

### SS-L-05 · MAJOR (consequence) / MINOR (reachability today) · the setter narrows a union it does not own, and the tree's only static gate is **measured blind** to it

`SpeedSelect.vue:23-26`:
```ts
const speedStr = computed({
    get: () => String(props.modelValue),
    set: (v: string) => emit("update:modelValue", parseFloat(v)),
});
```
The value `v` originates in a component whose declared payload is wider by four cases. `dist/components/ui/select/Select.vue.d.ts`:
```ts
"update:modelValue": (value: import("reka-ui").AcceptableValue) => any;
```
and `node_modules/reka-ui/dist/index3.d.ts:231`:
```ts
type AcceptableValue = string | number | bigint | Record<string, any> | null;
```
`parseFloat(null)` → `NaN`. `parseFloat({})` → `NaN`. `parseFloat(4n)` throws `TypeError: Cannot convert a BigInt`. And `parseFloat` silently truncates trailing garbage (`"4x"` → `4`) where `Number()` would reject. The annotation `(v: string)` is an unenforced assertion about someone else's emit contract.

**MEASURED — the gate does not catch it.** `npx vue-tsc --noEmit -p tsconfig.json` over the whole `web/` tree returns **exactly one** diagnostic, and it is elsewhere:
```
src/components/paper/PaperView.vue(12,8): error TS2882: Cannot find module or type declarations
  for side-effect import of '@mkbabb/latex-paper/theme'.
```
`tsconfig.json` has `"strict": true`. CI job 2 is *"web-build — vue-tsc + vite build"* (`.github/workflows/ci.yml`, header block). So `strict` + CI both pass this line. Vue Language Tools' `v-model` codegen does not propagate the emit payload type into the writable-computed setter here — the narrowing is invisible to the only automated check the repo owns.

**Consequence if it ever fires** (the reason this is MAJOR-by-consequence). There is no guard anywhere downstream:
`anim.speed = NaN` → `animation.ts:56` `const dur = duration.value / speed.value` = `NaN` → `:61` `startTime = now - t.value * dur` = `NaN` → `:63-66` `elapsed`/`cycle`/`frac` all `NaN` → `:66` `t.value = NaN` → `BasisCanvas.vue:140,322` `fourierPositionsAt(components, NaN, …)` → Canvas2D **silently no-ops** NaN path coordinates. The instrument freezes blank with zero console output. `watch(speed, …)` (`animation.ts:138-143`) restarts the loop unconditionally; `startLoop` (`:54`) validates nothing.

**Falsifier — and it holds, which is why reachability is MINOR.** I enumerated reka-ui's emit sites: `SelectItem`'s `select()` calls `rootContext.onValueChange(props.value)`, and every `value` in this file is a string literal (`:38-42`); `SelectRoot` has no clear/deselect affordance and `name`/`required` are not passed, so `BubbleSelect` form-reset cannot fire either. **No UI path emits a non-string today.** This is a latent contract hole, not a shipping crash, and it is scored as such. It would become live the moment anyone adds a `by`, a `multiple`, a clear button, or a numeric `SelectItem :value`.

---

### SS-L-06 · MINOR · truthiness guard on a numeric field at SpeedSelect's sole non-user writer

`composables/useWorkspaceLoader.ts:57` — `if (as?.speed) anim.speed = as.speed;`

A truthiness test on a `float` (`shared.py:70`). `speed: 0` is legal in the API type and is silently dropped. The correct predicate is `as?.speed != null`. The sibling line `:56` `if (as?.easing)` has the same shape over a `str` where `""` is equally falsy.

Not SpeedSelect's own line — but it is the **only** writer of SpeedSelect's `modelValue` other than the user, so it is inside the component's contract boundary. It also happens to shield SS-L-01 from the `0` case by accident (0 would give `dur = duration/0 = Infinity` → `frac = elapsed/Infinity = 0` → clock frozen at `t = 0`), which is a coincidence, not a design.

**Falsifier.** *If `AnimationSettings.speed` were typed `PositiveFloat` or `Field(gt=0)`*, `0` is unrepresentable and the guard is exactly right — `shared.py:70` is `float = 1.0` with no constraint.

---

### SS-L-07 · MINOR · the enumerated domain has no single source of truth; it exists only as ten template literals

`:38-42` spells each speed **twice** — once as `value="0.25"`, once as the label `0.25&times;` — across five hand-unrolled `<SelectItem>` lines. `&times;` is re-spelled 5× here and a sixth time as `unit="×"` at `AnimationControls.vue:75`. Nothing exports or constrains the set: `lib/defaults.ts:23` gives only `speed: 1`; `lib/types.ts:49` gives only `speed: number`; `stores/animation.ts:22` gives only `ref(1)`.

The absent one-liner is load-bearing:
```ts
const SPEEDS = [0.25, 0.5, 1, 2, 4] as const;
type Speed = (typeof SPEEDS)[number];
```
which would (a) narrow `modelValue: number` → `Speed`, **killing SS-L-01 at the type level** and giving `vue-tsc` something to catch, (b) give `shared.py` a domain to mirror, (c) collapse five template lines to one `v-for` with one `×` glyph, (d) give the untested round-trip (SS-L-09) a fixture to iterate.

**Falsifier.** *If the five values were derived from a shared constant elsewhere* the duplication is notional — `grep -rn "0\.25" web/src` finds no speed table; the literals appear only in this template.

---

### SS-L-08 · MINOR · duplicated style blocks with three unexplained divergences, re-implementing a producer variant by hand

`:49-69`. Five of seven declarations are byte-identical across the two rules (`flex-shrink: 0`, `font-family`, `@apply text-sm`, `border-radius: 9999px`, plus the height/width pair differing only in value). The divergences do not read as decisions:

| declaration | `.speed-trigger` | `.speed-trigger-compact` | consequence |
|---|---|---|---|
| `color` | `var(--muted-foreground)` | *absent* | the two renderings of the same control have different text colour |
| `background` | `none` | *absent* | compact keeps `.control-surface`'s fill; default does not |
| `border` | `none` | `1.5px solid color-mix(in srgb, var(--foreground) 15%, transparent)` | one borderless, one hand-rolled border that re-spells a token instead of using `--control-surface-border` |

And `.speed-trigger` is a hand re-implementation of a variant the producer already ships. glass-ui `SelectTrigger` declares `variant?: "default" | "ghost"` (dist props; 7.0.0 `src/components/select/SelectTrigger.vue:4-12`), and the ghost arm is literally:
```ts
props.variant === "ghost" ? "bg-transparent border-none shadow-none" : "control-surface …"
```
i.e. `<SelectTrigger variant="ghost">` is exactly `border: none; background: none`, obtained from the design system instead of overridden into it — and it would also cure SS-L-03, because ghost never applies `.control-surface` and so never mounts the orphan `backdrop-filter`.

The hardcoded `font-family: "Fira Code", monospace` (twice) is the precise shape of the standing recorded feedback *"Glass-ui Select font should be configurable via token, not hardcoded mono"* (`feedback_select_font.md`) — filed against the producer, re-committed here in the consumer.

**Falsifier.** *If `variant="ghost"` differed materially from what `.speed-trigger` paints* the hand-roll is justified — the ghost class list is quoted above and is a superset match (it additionally kills `shadow`, which `.control-surface` does not set anyway). *If the three divergences were intentional*, they are undocumented in a file that documents nothing.

---

### SS-L-09 · MINOR · zero executing test coverage — the only test that touches this component is permanently skipped

- `web/` has **no unit-test runner at all**: `package.json` `scripts` = `dev / build / preview / test:e2e / test:e2e:ui`; devDependencies contain no `vitest`. The entire test surface is 8 Playwright specs.
- The **only** mention of SpeedSelect in that surface is a prose comment inside a skipped block: `e2e/visualization-ux.spec.ts:182` (*"a `button-name` critical on the SpeedSelect trigger → added `aria-label="Playback speed"`"*), sitting in the header of `test.fixme("keystone: AnimationControls dropdown-open is a11y-clean", …)` at `:192`. `test.fixme` never executes. The `aria-label` that fixed a **critical** axe violation is therefore guarded by nothing.
- `e2e/settings-persistence.spec.ts` covers exactly two settings — harmonics (`:65`) and sample points (`:103`). The `animation_settings.speed` persist→reload→reseed round-trip, i.e. the exact path that produces SS-L-01, is uncovered.

**Falsifier.** *If a spec asserted the trigger's displayed text after a reload* SS-L-01 would already be red in CI — `grep -rn "speed\|Playback" web/e2e/` returns one hit, the comment at `:182`.

---

### SS-L-11 · INFO · two live instances against one store cell, gated by CSS rather than `v-if`

`AnimationControls.vue:96` (inside `<div class="hidden sm:block">`) and `:117` (inside `<div class="flex sm:hidden">` in the dropdown) both mount SpeedSelect bound to the same `anim.speed`. Each mounts a full reka-ui `SelectRoot` (options set, `BubbleSelect`, portal machinery).

**Not a leak** — and this is worth stating positively: SpeedSelect registers zero listeners, timers, observers or template refs (`grep -cE "onMounted|onUnmounted|addEventListener|setInterval|setTimeout|requestAnimationFrame|watch\(|ref\("` → **0**), so it has no teardown obligation at all, and reka-ui owns its own. Contrast `BasisCanvas.vue:438-458`, which must hand-balance an IntersectionObserver against `anim.setCanvasVisible`.

The residual is a correctness-by-accident: with the menu open at ≥`sm`, two comboboxes carrying identical `aria-label="Playback speed"` coexist in the DOM, and only `display: none` (from `sm:hidden`) keeps the second out of the accessibility tree. A breakpoint edit flips that to a duplicate-accessible-name defect with no test to catch it (SS-L-09). Separately, `AnimationControls.vue:94` wraps the trigger in `<Tooltip text="Playback speed">` — the local shim (`ui/tooltip/Tooltip.vue`) mounts a reka `TooltipTrigger as-child` over a control whose `aria-label` already says exactly that, and whose entire visible content already *is* its own value. (Full a11y grading belongs to the A axis; recorded here as the contract seam.)

**Falsifier.** *If `DropdownMenuContent` used `forceMount`* both would be live simultaneously at all widths — it does not (`:109` passes only `class`, `side-offset`, `align`), so reka-ui's presence machinery keeps the compact instance unmounted while the menu is closed.

---

## §2 — The R5-7 template-loop class: **does not apply here, and this file is its exact dual**

The brief asks where the R5-7 invisibility class lands. Reported honestly: **it does not land on SpeedSelect**, and saying so is the finding.

Intake row **R5-7** (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125`, verdict TRUE, ADOPT-AS-FACT + CARRY→F.W4) establishes: *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* — `DERIVED-REGISTRIES.json.leafValues["instance.loop.paper-sidebar"]` was literally `[]` because `PaperSidebar.vue`'s three loops ride native `<li v-for>` (live lines 65, 87, 105). **R6-5** cured it with a `NATIVE_TEMPLATE_LOOP` family (`:140`).

SpeedSelect contains **no `v-for` whatsoever** (`grep -c "v-for" SpeedSelect.vue` → 0). Its five options are five *registered component* callsites (`<SelectItem>`), which the component-callsite deriver sees perfectly. R5-7's blind spot is inapplicable; R6-5's cure is a no-op over this file.

**The live hazard here is the opposite polarity, and it is already booked — as R3-12, not R5-7.** R3-12 (`:86`, TRUE): *"35 open-family records collapse to 28 unique records… any instance denominator built on these rows **over-counts by 7 (20%)**."* SpeedSelect is a clean instance of that failure mode: one semantically singular enumerated control presents as **five** near-identical `SelectItem` callsites (six across the tree, since `AnimationControls` mounts SpeedSelect twice → **ten** SelectItem callsites for one user-facing speed setting). So a component-callsite denominator **over-counts SpeedSelect 10×** in the same sweep where it **under-counts PaperSidebar to zero**.

**Carry for F.W4 (bounding, not contradicting, R5-7):** the per-component D/L/C audit needs *two* corrections, opposite in sign. R6-5's `NATIVE_TEMPLATE_LOOP` supplies only the under-count cure. The over-count cure — collapsing an unrolled enumeration to its logical arity — has no mechanism in R4–R6. SS-L-07's `const SPEEDS` refactor would convert this file from an over-count case into a `NATIVE_TEMPLATE_LOOP`-adjacent one, i.e. **fixing the code moves the file from the un-modelled failure class into the modelled one** — which is the cheapest available argument for doing it.

---

## §3 — Superlatives (L-18, both directions)

### SUP-1 · Goldilocks, and demonstrably so — zero teardown surface
70 LOC, one concern, one derived value. `grep -cE "onMounted|onUnmounted|addEventListener|setInterval|setTimeout|requestAnimationFrame|watch\(|ref\("` → **0**. No lifecycle hooks, no listeners, no timers, no observers, no DOM refs, therefore no teardown obligation and no leak surface — in a tree whose sibling `BasisCanvas.vue` runs 547 lines and must hand-balance an IntersectionObserver against a ref-counted store clock (`:438-458`), and whose parent `AnimationControls.vue` runs 224. The corpus row `lane-frontend.md:97` records it at exactly 70.
**Falsifier (stated, and it partly bites).** I checked whether it is the *smallest* file in `components/visualization/` — **it is not**: `CanvasOverlayButton.vue` 25, `CoefficientsPanel.vue` 26, `EasingCurvePreview.vue` 41, `ContourPreview.vue` 62 are all smaller. The claim is "correctly sized and teardown-free", not "smallest", and it is scoped accordingly. Note also that 20 of the 70 lines are the CSS carrying SS-L-02/03/04/08 — the *script* is 27 lines and the *defects are in the style block*, which is the honest reading of "well-sized".

### SUP-2 · Import surface survives the glass-ui 4→7 atomic transaction untouched — style surface does not
`lane-frontend.md:455-480` enumerates the 4.0.0→7.0.0 export delta (14 ADDED, 21 REMOVED) and the "Rows that hit fourier-analysis TODAY" break table. **`./select` appears in neither list**, and producer `glass-ui@7.0.0` still exports `"./select": {"types":"./dist/select.d.ts","import":"./dist/select.js"}`. All five imported members exist at 7.0.0 (`/Users/mkbabb/Programming/glass-ui/src/components/select/`), and SpeedSelect passes neither `size` nor `variant`, so the 4→7 narrowing of `SelectTrigger.size` from `"sm"|"default"|"display"|"audacious"` to `"sm"|"default"` (`SelectTrigger.vue:4-12`) cannot bite it. Contrast its own parent, which carries **two** rows of that break table in three lines: `AnimationControls.vue:8` (`DockDropdownTrigger` removed → `<DockTrigger>`) and `:10` (`./metric-badge` removed → `./metric`).
**Falsifier — and it holds against the superlative.** The *CSS* does not survive equally. At 7.0.0 the default trigger variant becomes `control-surface glass-control-edge glass-capsule-hover` (`SelectTrigger.vue:41-45`) — two additional registers that `background: none` will not neutralise, one of which (`glass-capsule-hover`) is an interaction-state register. SS-L-03 gets strictly worse across the uplift. **Import-surface immune, style-surface exposed.** The superlative is real and bounded.

### SUP-3 · Correct primitive choice — it inherits behaviour instead of re-implementing it
Zero direct `reka-ui` imports, upholding the census's headline posture for this consumer (`CENSUS-2026-08-03.md:83-85`: *"deepest, cleanest consumer in the constellation — 95 named-import statements / 21 subpaths / 49 symbols; **0 direct reka-ui; 0 shadcn copies**"*). By reaching for the producer `Select` rather than hand-rolling a listbox it inherits Escape dismissal, click-outside, typeahead, roving focus, portal collision-avoidance and `aria-activedescendant` for free — the same trade `AnimationControls.vue:100-103` documents making for the dropdown ("*replaces the hand-rolled popup + onClickOutside*"). And when axe found a **critical** `button-name` violation here, the fix landed **in this component** as `aria-label="Playback speed"` (`:32`; history at `e2e/visualization-ux.spec.ts:182`) rather than as a callsite workaround.
**Falsifier.** The fix is an `aria-label`, not a visible/programmatic label association — so the control still has no visible name, and the redundant `<Tooltip text="Playback speed">` at `AnimationControls.vue:94` restates it in a third place (SS-L-11). And it is guarded by a `test.fixme` (SS-L-09), so the superlative describes a past repair with no regression guard.

---

## §4 — Ledger

| id | sev | claim | anchor | falsifier status |
|---|---|---|---|---|
| SS-L-01 | MAJOR | blank trigger for any speed ∉ 5 literals; reachable via API `float` + reseed | `:24,35,38-42` · `useWorkspaceLoader.ts:57` · `shared.py:70` | mechanism PROVEN from reka source; 3 falsifiers open |
| SS-L-02 | MAJOR | literal `height` defeats producer WCAG-2.5.5 floor | `:50,62` · `tokens/light-dark.css:10-22` · `offsets-sizing.css:151` | cascade PROVEN; rendered px `UNPROVEN-NEEDS-LIVE` |
| SS-L-03 | MAJOR | orphan `backdrop-filter` over the rAF canvas | `:55-56` · `glass/surfaces.css:241-246` · `tokens/glass.css:182` · CENSUS `:85-87` | presence PROVEN; frame cost `UNPROVEN-NEEDS-LIVE` |
| SS-L-04 | MAJOR | trigger narrower than its longest label, both variants | `:51,54,63,66` · producer trigger class list | budget arithmetic PROVEN; glyph advance `UNPROVEN-NEEDS-LIVE` |
| SS-L-05 | MAJOR/MINOR | `(v: string)` narrows `AcceptableValue`; `vue-tsc` **measured** blind | `:25` · `Select.vue.d.ts` · `reka index3.d.ts:231` · vue-tsc run | narrowing + gate-blindness MEASURED; UI reachability **falsified today** → scored MINOR |
| SS-L-06 | MINOR | truthiness guard drops `speed: 0` | `useWorkspaceLoader.ts:57` | open |
| SS-L-07 | MINOR | domain exists only as 10 template literals | `:38-42` · `defaults.ts:23` · `types.ts:49` | open |
| SS-L-08 | MINOR | duplicated rules, 3 unexplained divergences, hand-rolled `variant="ghost"` | `:49-69` · producer `SelectTrigger.vue:4-12,41-45` | open |
| SS-L-09 | MINOR | zero executing coverage; sole test is `test.fixme` | `e2e/visualization-ux.spec.ts:182,192` · `package.json` | open |
| SS-L-11 | INFO | two instances / one cell, CSS-gated; redundant tooltip | `AnimationControls.vue:94,96,117` | correct-by-accident, no leak |
| SS-L-10 | — | R5-7 does not apply; this is its over-count dual (R3-12) | intake `:125,86,140` | bounds R5-7, does not contradict it |
| SS-L-12 | — | `defineModel` considered and **declined** (memory's stale-round-trip caveat; parent uses explicit prop+event, not `v-model`) | `:11-26` | not scored as a defect |

**Blockers: 0.** Nothing here crashes, loses data, or blocks a release. SS-L-01 blanks a display while the control stays operable; SS-L-02 clears WCAG 2.5.8 AA (56×28 > 24×24) and misses only the AAA/producer-cohort floor; SS-L-05's crash path is falsified for today's tree. Recorded honestly rather than inflated.

**Highest-leverage single change.** SS-L-07's `const SPEEDS` + `type Speed` kills SS-L-01 at the type level, gives `vue-tsc` the check it currently cannot make (SS-L-05), gives `shared.py` a domain to mirror, gives SS-L-09 a fixture, and moves the file out of the un-modelled R3-12 over-count class. Second: `<SelectTrigger variant="ghost">` retires SS-L-03 and half of SS-L-08 by deleting code rather than adding it.

---

*Provenance: subject + all imports read to definition; `fourier-analysis` treated as read-only evidence throughout — the single measurement (`vue-tsc --noEmit`) was verified write-free by before/after `git status --porcelain` diff and an unchanged `tsconfig.tsbuildinfo` mtime. Corpus folded: `formation/fourier/{lane-frontend.md, CENSUS-2026-08-03.md}`, `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (rows R5-7, R6-5, R3-12, R3-7a cited by id).*
