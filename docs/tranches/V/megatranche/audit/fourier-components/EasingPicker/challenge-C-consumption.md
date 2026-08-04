claude-opus-5[1m]

# CHALLENGE C — CONSUMPTION · `EasingPicker.vue` (fourier-analysis)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingPicker.vue` (39 template/script lines + 59 style lines = 98)
**Axis** CONSUMPTION — how this leaf eats value.js 0.13, keyframes 4.3, glass-ui ^4.0.0, the fourier API; props/emits contract; integration seams.
**Posture** DEFECTIVE-until-proven. Every row carries severity + `file:line` + its falsifier.
**Method** static + source-derived only (L: no browser). Read whole: the component, `EasingCurvePreview.vue`, `stores/animation.ts`, `lib/easings.ts`, plus the resolved consumption targets in `web/node_modules/@mkbabb/{glass-ui,value.js,keyframes.js}` and the value.js 4.0.0 source-of-record at `/Users/mkbabb/Programming/value.js`.

**Import graph (whole, 3 edges from the component):**

```
EasingPicker.vue:2  →  @mkbabb/glass-ui/button        → dist/button.js → dist/button-BNDWhAZb.js (cn + reka-ui Primitive + cva)
EasingPicker.vue:3  →  @/stores/animation             → pinia defineStore + re-export barrel
                                     └→ @/lib/easings → @mkbabb/value.js  (ROOT specifier, ×2: :9 and :16)
EasingPicker.vue:4  →  ./EasingCurvePreview.vue:2     → @/stores/animation (again — the pure SVG util laundered through the store)
```

Zero edges to `@mkbabb/keyframes.js`. Zero edges to `lib/api.ts`. Zero edges to `lib/colors.ts`.

**Corpus fold (cited, not re-invented):** `formation/fourier/lane-frontend.md:96,310,409-413,480,629,640-641`; `formation/fourier/lane-docs.md:261,391-392`; `formation/fourier/CENSUS-2026-08-03.md:38,94,191`; intake `lane-fourier-r3-r6.md` R6-8 (§ i-1 below, where the axis is *unreachable* from this leaf — stated explicitly rather than stretched).

**Tally: 18 defects (2 BLOCKER · 6 MAJOR · 9 MINOR · 1 INFO) · 4 superlatives.**

---

## BLOCKERS

### B-1 — the whole import chain is unresolvable under value.js 4.0.0: root specifier *and* `timingFunctions` are both gone

**Severity** BLOCKER (latent — gated on F.W2; the live tree runs 0.13.0 and boots).
**Provenance**

- `web/src/lib/easings.ts:9` — `import { timingFunctions } from "@mkbabb/value.js";`
- `web/src/lib/easings.ts:11-16` — `import { easeInOutSine, easeInOutCubic, easeInOutQuad, easeInOutExpo, easeInOutCirc } from "@mkbabb/value.js";`
- `/Users/mkbabb/Programming/value.js/package.json` (4.0.0) — `exports` has **seven subpath keys only** (`./color ./value ./css ./easing ./math ./transform ./quantize`); `"." ∉ exports`; `main`/`module`/`types` are all **absent**. A bare `@mkbabb/value.js` import therefore has no resolution target at all (`ERR_PACKAGE_PATH_NOT_EXPORTED` / Vite resolve failure), not merely a deprecated one.
- `timingFunctions` **does not exist anywhere in value.js 4.0.0**: `grep -rn "timingFunctions" src/ dist/` → 0 hits in both. It is not "moved to a subpath" — `src/subpaths/easing.ts:8-25` exports `CubicBezier, bezierPresets, easeInBounce, easeInOutCirc, easeInOutCubic, easeInOutExpo, easeInOutQuad, easeInOutSine, easeOutCubic, easeOutExpo, easing, jumpTerms, linear, linearEasing, smoothStep3, steppedEase` — no `timingFunctions`. Its successor is a *different shape*: `src/easing.ts:166` `easing(name: string): Result<EasingFunction, EasingIssue>`.

**Consequence for THIS leaf.** `easings.ts:9` is a **named** ESM import; under Rollup/Vite a missing named export is a hard build error, not a runtime `undefined`. `EasingPicker.vue:3 → stores/animation:1-6 → lib/easings` means the picker cannot compile, let alone mount, the moment value.js crosses to 4.x. The picker's *own* six functions (`easings.ts:79-83`) all survive at `@mkbabb/value.js/easing` — so this leaf's blocker is **entirely inherited from the co-located morph catalog** (`easings.ts:29-59`, 22 kebab labels × `timingFunctions[...]`) that EasingPicker never touches.

**Falsifier.** Add a `"."` key (or `main`) to value.js 4.0.0's exports map **and** restore a `timingFunctions` export → this row dies. Alternatively: if the F.W2 plan splits `lib/easings.ts` so the morph catalog leaves the picker's module graph, the blocker demotes to MAJOR-on-the-other-file and EasingPicker migrates with a one-token specifier edit (`@mkbabb/value.js` → `@mkbabb/value.js/easing`, lines 9 and 16).

**Corpus.** CENSUS-2026-08-03:38 already books "5 import statements / 4 files / 6 symbols … all bare-root specifiers that 4.0.0 no longer exports — latent, not live" — I **confirm** and **sharpen**: the census frames it as an *export-map* problem; the tree shows a *second, independent* break (symbol deletion, with a `Result`-returning replacement of different shape). `lane-docs.md:261` I-2 ("`timingFunctions` **not restored**; retires onto I-3 + I-4") is the matching row — my contribution is the confirmation from the value.js source-of-record that the retirement is total, and that the picker's own 5 symbols are *not* affected.

---

### B-2 — the F.W2 bump cannot land at this leaf alone: glass-ui 4.0.0's declared value.js peer range is **already violated**, and keyframes 4.3 **hard-pins** the old major

**Severity** BLOCKER (cross-repo; blocks B-1's remedy).
**Provenance** (`web/node_modules/@mkbabb/*/package.json`, read directly)

| package | installed | its value.js requirement | verdict |
|---|---|---|---|
| `@mkbabb/glass-ui` | 4.0.0 | `peerDependencies["@mkbabb/value.js"] = "^0.10.0 \|\| ^0.11.0"` | **violated today** — `web/package.json:18` installs `^0.13.0` |
| `@mkbabb/keyframes.js` | 4.3.0 | `dependencies["@mkbabb/value.js"] = "^0.13.0"` — a **hard** dep, not a peer | a bump to 4.x installs a **second, nested copy** of value.js 0.13 |
| `@mkbabb/value.js` | 0.13.0 | — | the pin the axis names |

Additionally glass-ui 4.0.0 *itself* consumes the dead root specifier: `dist/composables/motion/curves.d.ts:1` `import { type easeInQuad } from "@mkbabb/value.js";` and `dist/motion-curves.js:3` imports 18 runtime symbols from the same bare root. So value.js 4.x breaks the installed glass-ui's own motion surface — the consumer cannot fix its side unilaterally.

**Consequence.** B-1's one-line remedy is not landable in isolation: the tree must move glass-ui (to a major that peers value.js ^4) and keyframes together, or accept a duplicated value.js in the bundle (two `easeInOutSine` identities, two `--vendor-math`/`vendor-keyframes` copies per `web/vite.config.ts:50-58` `manualChunks`).

**Falsifier.** `npm ls @mkbabb/value.js` showing a single deduped 0.13.0 today would *not* rescue the row (the peer range `^0.10 || ^0.11` excludes 0.13 regardless of dedupe); the row dies only if glass-ui 4.0.0's published peer range is wider than the installed `package.json` states, or if the bump plan already schedules glass-ui + keyframes in the same wave.

**Corpus.** `lane-frontend.md:480` books the *glass-ui **7.0*** peer (`^4.0.0`) against installed 0.13.0. **New here:** the *installed 4.0.0*'s peer range is `^0.10 || ^0.11` — i.e. the tree is **already out of contract before any bump**, and keyframes' hard `^0.13.0` dep is a third constraint neither `lane-frontend` nor the CENSUS records.

---

## MAJOR

### M-1 — `size="sm"` height-clamps a two-row chip: ~7.6 px of guaranteed overflow into the next grid row

**Severity** MAJOR.
**Provenance**

- `EasingPicker.vue:23` — `size="sm"`.
- glass-ui `dist/button-BNDWhAZb.js` cva `size.sm` = `"h-(--control-h-sm) rounded-pill px-3"` → `height: var(--control-h-sm)`, a **fixed** height.
- `dist/styles/tokens/offsets-sizing.css:150` — `--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor))`; `:136` `--ui-scale: 1`; `:148` `--control-floor: 0px` → **36 px** at the fine-pointer identity. fourier never overrides `--ui-scale` (`grep -rn -- "--ui-scale" web/src/` → 0 hits).
- The rule **ships build-independently**: `dist/styles/components.css` contains verbatim `.h-\(--control-h-sm\){height:var(--control-h-sm)}` — so it paints even without a content-scan, and `web/src/style.css:3` imports `@mkbabb/glass-ui/styles`.
- Content the chip must hold (`EasingPicker.vue:68-76, 88-92`): `padding 0.375rem/0.25rem` (6 + 4) + `border 1.5px` ×2 (3) + svg + `gap 0.125rem` (2) + label `font-size 0.5625rem; line-height 1` (9). Tailwind preflight makes this `border-box`, so the available inner box is 36 − 6 − 4 − 3 = **23 px** against a 30.6 px stack (svg at its authored 19.6 px) or 27 px (svg at the `--ui-glyph` clamp of M-2). Overflow **4–7.6 px**, against a `grid gap: 0.25rem` (4 px) — i.e. row 1's labels land **on top of** row 2's curves (`EASING_OPTIONS` is 6 rows in a `repeat(3, 1fr)` grid → exactly 2 rows).
- Nothing restores `height: auto`: the scoped block (`:68-83`) never sets `height`, and the parent has no override (`grep -n "easing\|deep(" web/src/components/visualization/AnimationControls.vue` → 0 hits).

**Why this is *newly* live.** The last committed build predates the dep: `web/dist/assets/index-57FkGzlZ.css` (mtime **Jun 12**, glass-ui installed **Jun 17**) contains `control-h-sm` ×0 and `ui-glyph` ×0 while `btn-pill` ×3 — i.e. at that build the Button's cva size/base utilities were **not reaching the app's CSS at all** (the failure mode glass-ui's own `dist/styles/index.css:203-210` names: "Tailwind scanned an empty dir and glass-ui's own arbitrary utilities silently died"). glass-ui 4.0.0 fixes that on the producer side (P9 `components.css` + `@source "../*.js"` at `index.css:222`) — which means the clamp **switches on** with the bump and has never been through a build or a visual check in-tree.

**Falsifier.** Rebuild `web/` and grep the emitted CSS for `.h-\(--control-h-sm\)`; if absent, the clamp does not paint and this row dies. Or: measure the chip on a coarse pointer, where `dist/styles/tokens/light-dark.css:19-20` lifts `--ui-scale` to 1.5 and `--control-floor` to `--touch-target` → height 54 px and the overflow vanishes — **so this defect is fine-pointer-only** (desktop). UNPROVEN-NEEDS-LIVE for the pixel measurement; the cascade derivation above is static-complete.

### M-2 — the `:size="28"` prop is dead inside a glass-ui Button: the base cva force-sizes every un-classed descendant `<svg>` to `--ui-glyph`

**Severity** MAJOR.
**Provenance**

- `EasingPicker.vue:32` passes `:size="28"`; `EasingCurvePreview.vue:22-23` spends it on the **presentation attributes** `:width="size" :height="size * 0.7"`.
- glass-ui Button base class (`dist/button-BNDWhAZb.js`, cva first argument) contains `[&_svg:not([class*=size-])]:size-(--ui-glyph)` → `.<variant> svg:not([class*=size-]) { width: var(--ui-glyph); height: var(--ui-glyph) }`, with `--ui-glyph: calc(1rem * var(--ui-scale))` = **16 px square** (`tokens/offsets-sizing.css:177`).
- The escape hatch is a class containing the substring `size-`. The preview's only class is `easing-preview` (`EasingCurvePreview.vue:23`) → **no escape**. Its scoped rule (`:37-40`) sets `display`/`flex-shrink` only, so nothing in the author origin re-asserts width/height.
- Presentation attributes lose to *any* author CSS rule (they are cascaded below the author origin), so the 28 × 19.6 authored geometry never wins — **regardless** of layer ordering. The claim is robust to whether the utility lands in `@layer utilities` or unlayered.
- Collateral: `viewBox="-0.05 -0.3 1.1 1.6"` (aspect 0.6875, taller than wide) forced into a **square** viewport under `preserveAspectRatio="xMidYMid meet"` (`:19-20`) letterboxes the curve horizontally — the picker's whole affordance (curve shape recognition) degrades to a ~11 px-wide squiggle.

**Falsifier.** Add `class="size-[28px]"` (or any `size-`-containing class) to the preview `<svg>` and the authored geometry returns — i.e. the row is *about the seam*, and the fix is one token. The row dies if the emitted CSS lacks that arbitrary variant: it is **not** in `components.css` (`grep -o "ui-glyph" dist/styles/components.css` → 0), so it depends on the `@source "../*.js"` backstop (`dist/styles/index.css:222`) reaching `dist/button-BNDWhAZb.js` — verify by grepping a fresh build for `svg:not(\[class\*=size-\])`.

### M-3 — wrong glass-ui primitive: `ToggleChip variant="cell"` ships at the **installed** 4.0.0 and is this component's recipe, verbatim

**Severity** MAJOR (glass-ui-first; standing owner edict).
**Provenance** `dist/components/custom/toggle-chip/index.d.ts:4-8` — *"`cell` — square card that stacks an icon/preview over a label (e.g. pose pickers, palette swatches, emotion pickers)"*. Its cva (`dist/toggle-chip.js:59-68`):

| concern | glass-ui `ToggleChip` `cell` | hand-rolled `.easing-chip` |
|---|---|---|
| geometry | `flex flex-col items-center justify-center gap-1.5` — **no height clamp** | `EasingPicker.vue:69-72` + the M-1 clamp |
| radius | `rounded-[0.625rem] border border-transparent` | `:73-74` `0.5rem` + `1.5px solid transparent` |
| hover | `hover:bg-[color-mix(in srgb,var(--accent) 40%,transparent)]` | `:81-83` `background: var(--muted)` |
| selected | `data-[state=on]:bg-[color-mix(in srgb,var(--primary) 15%,transparent)] data-[state=on]:border-primary` — driven by the reka-ui Toggle root, **no class binding at the call site** | `:26` `:class="{ 'is-active': … }"` + `:84-87` local `--easing-accent` mixes |
| type | `text-micro` | `:89` hand-rolled `0.5625rem` (see m-4) |
| motion | a full `[transition:scale …,background-color …,border-color …,box-shadow …,color …]` spring/token set | `:79` two properties; `:93` an untokened one (see m-9) |

So the design system already owns the chip-grid recipe at the version installed, and the app re-derives ~40 lines of it on top of the one primitive (`Button`) that is height-locked and glyph-locked.

**Honest limit (contradicting a naive read of the corpus).** `lane-frontend.md:409-413` books the eventual home as `glass-ui/src/components/easing/EasingPicker.vue` and calls this file "the fourth fork" — that home is **absent at 4.0.0** (I re-verified: `grep -rln "Easing" dist/*.d.ts` → empty) and arrives at 7.0.0, which peers value.js ^4 (B-2's deadlock). `ToggleChip` is the *available-today* remedy the corpus does not record. Note also that `ToggleChip` is `aria-pressed`-shaped (reka-ui `Toggle`), which `EasingPicker.vue:10-15` explicitly and correctly rejects for a radio-in-menu — so the adoption is **geometry + tokens**, with `role`/`aria-checked` still supplied by the call site (they pass through: see S-2).

**Falsifier.** If a `ToggleChip` with `role="menuitemradio"` cannot suppress reka-ui Toggle's `aria-pressed` (double state exposure), the adoption is blocked and this demotes to MINOR-with-carry. Check `dist/toggle-chip.js:30-33` — `useForwardPropsEmits` forwards everything but `class`/`variant`, so a `role` override lands, but `aria-pressed` is emitted by the Toggle root itself. UNPROVEN-NEEDS-LIVE (axe run).

### M-4 — zero props, zero emits: the leaf is hard-wired to the global store, while its **sibling in the same menu** takes a `v-model` contract

**Severity** MAJOR (props/emits contract quality — the axis's explicit sub-question).
**Provenance**

- `EasingPicker.vue:6` `const anim = useAnimationStore();` — no `defineProps`, no `defineEmits`, and `:26/:27/:28` read *and write* `anim.easing` straight from the template.
- The in-tree comparator is 3 lines away in the same `DropdownMenuContent`: `SpeedSelect.vue:11-21` declares `defineProps<{ modelValue: number; compact?: boolean }>()` + `defineEmits<{ (e:"update:modelValue", v:number): void }>()`, and `AnimationControls.vue:96` / `:117` bind it as `:model-value` + `@update:model-value`.
- Consequences that are not stylistic: (a) the picker cannot be unit-mounted without a pinia instance; (b) it cannot appear twice with different targets (e.g. a morph-easing picker — and the tree *has* a second easing surface, `MorphPhaseConfig.vue:40-57`, which therefore hand-rolls its own); (c) it has **no `compact` arm**, so the mobile branch that `AnimationControls.vue:117` gives Speed (`compact`) has no counterpart here — the same 3-column grid paints in both arms.

**Falsifier.** If the workspace intentionally forbids a second easing target, (b) dies — but (a) and (c) survive, and the `SpeedSelect` comparator in the same parent shows the house contract is v-model, not store-reach.

### M-5 — a raw `hsl()` literal, duplicated across two files, with no light/dark arm — while glass-ui 4.0.0 now ships the `--viz-*` family the comment says does not exist

**Severity** MAJOR.
**Provenance**

- `EasingPicker.vue:49` — `--easing-accent: hsl(248 88% 71%);` and `EasingCurvePreview.vue:12` — `color: "hsl(248 88% 71%)"` as a **prop default**: the same literal authored twice, in two files, with no shared source.
- `EasingPicker.vue:44-47` justifies the carry: *"Filed upstream as a glass-ui `--viz-easing` token… the carry lives here because EasingPicker is the sole in-tree consumer."* The filing is real and **chronic**: `docs/audits/runs/2026-05-18-fourier-tranche/c-style-consumer.md:41` ("**glass-ui gap** … Currently no canon home"), `2026-05-26-B-audit-wave-1/L6-deferred-chronic.md:22` ("STILL FILED — local carry").
- **The premise is now false.** glass-ui 4.0.0 ships a viz colour family with both arms: `dist/styles/tokens/color-radius.css:263-265` (`--viz-fourier/-chebyshev/-legendre`, light), `tokens/dark-arm.css:113-115` (dark), `tokens/light-dark.css:145-146` (`light-dark()` form), plus theme bridges at `theme/bridges.css:189` (`--color-viz-fourier`). A fixed `hsl(248 88% 71%)` is the one colour in this component that cannot follow the scheme.
- The app also already owns the resolver for exactly this: `web/src/lib/colors.ts:1-6, 21-52` — *"Primary viz colors are derived from CSS custom properties (`--viz-*`) so they automatically adapt to light/dark mode"* — a hand-rolled `getComputedStyle` + regex `hsl()/rgb()` parser + `hslToHex`. EasingPicker routes around its own house resolver **and** around the DS family.

**Falsifier.** If `hsl(248 88% 71%)` is deliberately scheme-invariant (a fixed brand accent) the "no dark arm" half dies — but the **duplication** (two files, one literal) and the falsified "no canon home" premise survive independently. Dies entirely if a `--viz-easing` token lands upstream and both sites re-point.

### M-6 — the chips are not menu items: reka-ui's roving focus cannot reach them, and the only test that would catch it is `test.fixme`

**Severity** MAJOR · **UNPROVEN-NEEDS-LIVE** (SS-13).
**Provenance**

- Mount point: `AnimationControls.vue:109-125` — `<DropdownMenuContent class="menu-popup">` with `<EasingPicker />` as a bare child alongside a real `<DropdownMenuItem>` (`:120`).
- reka-ui's `MenuContentImpl.js` drives arrow-key navigation through its **Collection** (`getItems()`, `candidateNodes`, `[data-reka-collection-item]` ×2, `RovingFocusGroup` ×3 — counted in `node_modules/reka-ui/dist/Menu/MenuContentImpl.js`). The easing chips render as glass-ui `Button`s, i.e. plain `<button>`s with **no** `data-reka-collection-item`, so they are not candidates: ArrowDown/ArrowUp step from the Speed group straight to Export, skipping all six chips.
- `role="menuitemradio"` (`EasingPicker.vue:24`) *announces* them as menu items to AT while the widget's own keyboard model excludes them — the two halves disagree.
- The only e2e that opens this surface is disabled: `web/e2e/visualization-ux.spec.ts:193` `test.fixme("keystone: AnimationControls dropdown-open is a11y-clean", …)`, whose comment (`:185`) is precisely the row that installed these roles.

**Falsifier.** Keyboard the open menu: if ArrowDown lands on a chip, reka-ui 2.9.10 registers non-`MenuItem` focusables and the row dies. Equally: if Tab (non-modal menu, `AnimationControls.vue:103` `:modal="false"` ⇒ no focus trap) reaches every chip in DOM order, the severity drops to MINOR (reachable, just not via the announced menu model).

---

## MINOR

### m-1 — the catalog's third field is dead payload, and the house idiom for it exists 2 directories away
**Severity** MINOR. `lib/easings.ts:78-83` authors a `description` for all six easings ("Gentle ebb and flow", …). `EasingPicker.vue:35` renders `opt.label` only; `grep -rn "ANIMATION_EASINGS\|EASING_OPTIONS" web/src` shows the picker is the **sole** consumer of the catalog, so the six strings have zero readers. The app's own pattern for exactly this shape is `FunctionInput.vue:157` — `<Tooltip v-for="preset in PRESETS" :key="preset.name" :text="preset.description">`. **Falsifier:** if the descriptions are reserved for a documented future surface, this is INFO not MINOR — but nothing in the tree references them today.

### m-2 — a pure function is laundered through the pinia store module
**Severity** MINOR. `EasingCurvePreview.vue:2` imports `getEasingSVGPath` **and** `type EasingName` from `@/stores/animation`, which re-exports them (`stores/animation.ts:10-11`, comment: *"Re-export for consumers that import from this module"*). The real home is `@/lib/easings:102`. Effect: a leaf that renders one `<path>` drags the store module (and its `defineStore` graph) into its import chain, and the direction of dependency is inverted (presentation → store → lib instead of presentation → lib). **Falsifier:** if tree-shaking collapses this to nothing in the built chunk the cost claim dies — the *layering* claim does not.

### m-3 — two unchecked casts paper over a `v-for`-over-`Record` key-widening
**Severity** MINOR. `EasingPicker.vue:28` `key as EasingName` and `:31` `(key as EasingName)`: iterating an object with `v-for` (`:20`) widens the key to `string`, so the `Record<AnimationEasingName, …>` key type is lost and re-asserted by assertion twice. A `const EASING_ENTRIES = Object.entries(ANIMATION_EASINGS) as [EasingName, …][]` in `lib/easings.ts`, or a `readonly EasingName[]` order array, removes both. **Falsifier:** if `vue-tsc` 3.3.5 already narrows object-`v-for` keys to `keyof T`, the casts are merely redundant (still MINOR, lower weight) — check by deleting one and running `npm run build`.

### m-4 — the type scale is hand-rolled below the DS's smallest rung and opts out of the comfort axis
**Severity** MINOR. `EasingPicker.vue:89` `font-size: 0.5625rem` = **9 px**, fixed. glass-ui ships the two rungs this component wants, as `@utility` recipes emitted build-independently: `dist/styles/typography/semantic.css:208` `text-micro` (`--type-micro: 0.6875rem` = 11 px, `typography/scale.css:87`) and `:197` `text-caption`. `ToggleChip`'s `cell` uses `text-micro` verbatim. The heading meanwhile takes raw Tailwind (`EasingPicker.vue:57` `@apply text-sm`) rather than the DS rung. Because `--type-*` participate in glass-ui's `--ui-scale` comfort axis while a literal `0.5625rem` does not, on a coarse pointer every control around this chip grows 1.5× and the chip labels stay 9 px. **Falsifier:** if 9 px is a deliberate density decision for a 3-column menu grid, the "too small" half is opinion — the "does not scale with `--ui-scale`" half is structural and survives.

### m-5 — the carry comment's pointer is dangling and its ask is 2.5 months chronic
**Severity** MINOR. `EasingPicker.vue:46` cites `coordination/CONSTELLATION.md`; the files that exist are `docs/constellation/CONSTELLATION.md` and `docs/tranches/A/coordination/CONSTELLATION.md` (`find . -name CONSTELLATION.md`). The ask itself is tracked as chronic since 2026-05-18 (`c-style-consumer.md:41`; `L6-deferred-chronic.md:22,114,131`; `L4-glass-ui-usage.md:99,116,169,188`). **Falsifier:** if the relative path resolves from a docs root I did not test, the pointer half dies; the chronicity half is dated evidence.

### m-6 — the surface's recorded build and its test commentary both predate the installed dependency
**Severity** MINOR. `web/dist/assets/*.css` mtime **2026-06-12**; `node_modules/@mkbabb/glass-ui` mtime **2026-06-17** at 4.0.0. `e2e/visualization-ux.spec.ts:190-191` still speaks of "the glass-ui `inert` release + the guarded `^2→^3` bump" while `web/package.json:14` pins `^4.0.0` — i.e. the a11y baseline that justified this component's roles was booked against a glass-ui two majors back and never revisited. **Falsifier:** a rebuild + a re-run of the (un-fixme'd) keystone closes both halves.

### m-7 — two motion vocabularies coexist in one file, and the DS's own table is a trap at this version
**Severity** MINOR. `EasingPicker.vue:79` animates with `var(--ease-standard)` — a real glass-ui token (defined `dist/styles/tokens/scheme-motion.css:216`, bridged `theme/bridges.css:325`). But the six curves the picker *offers* (`lib/easings.ts:78-83`) are a private taxonomy with no relation to the `--ease-*` token family. glass-ui 4.0.0 ships the reconciliation: `dist/composables/motion/curves.d.ts:30-45` `MOTION_CURVES` — "the CSS↔JS curve table … Covers EVERY `--ease-*` / `--spring-*` token", whose bezier rows carry value.js `TimingFunction` twins and which **re-exports the exact five functions** `lib/easings.ts:11-15` imports (`motion-curves.d.ts:47`). **The trap:** adopting `MOTION_CURVES` today would add a *new* dependency on the dead root specifier (`motion-curves.js:3`, see B-2), making B-1 strictly worse. Correct F.W2 move: import from `@mkbabb/value.js/easing` directly; revisit `MOTION_CURVES` only at the glass-ui major that peers value.js ^4. **Falsifier:** if glass-ui publishes a patch that re-points `motion-curves` at `@mkbabb/value.js/easing`, the trap clears and this becomes an adopt-now.

### m-8 — a third in-tree curve renderer, and a duplicated class name across two unrelated components
**Severity** MINOR. `MorphPhaseConfig.vue:47-54` renders its own easing preview — same concept, different everything: `viewBox="0 0 40 20"` vs `-0.05 -0.3 1.1 1.6`; 24 samples (`lib/easings.ts:117 easingCurvePath`) vs 32 (`:89 generateCurveSVGPath`); un-memoized vs `_svgCache` (`:99`); `stroke="currentColor"` vs a colour prop. Both scope a class literally named `.easing-preview` (`EasingCurvePreview.vue:37`, `MorphPhaseConfig.vue:198`) — collision-free only by Vue's `data-v-` scoping. This is the same "fourth fork" pressure `lane-frontend.md:411-413` books, *inside* the consumer. **Falsifier:** if the two previews serve genuinely different registers (menu chip vs select row) the duplication is justified — the sampling-resolution and cache asymmetries are not.

### m-9 — the curve colour is prop-driven instead of inherited, so it snaps while the label fades; and the label's own transition drops the token the file's comment promises
**Severity** MINOR (two claims, two falsifiers).
(a) `EasingPicker.vue:33` computes `:color="anim.easing === key ? 'var(--easing-accent)' : 'var(--muted-foreground)'"` — re-implementing in JS the exact selection logic the cascade already runs at `:95-97` (`.easing-chip.is-active .easing-chip-label { color: var(--easing-accent) }`). `stroke="currentColor"` (the idiom `MorphPhaseConfig.vue:51` already uses) would drive both from one rule **and** let the stroke participate in the colour transition; as authored, the label fades over 0.15 s while the curve stroke changes instantly. *Falsifier:* if the preview is ever rendered outside a coloured context, the explicit prop is required and (a) dies.
(b) `:78` comments *"A.W3.d — named properties + canonical token, no `transition: all`"*, and `:79` honours it — but `:93` `transition: color 0.15s;` omits the token entirely (falls back to the CSS `ease` default), so two transitions in the same component run on different curves. *Falsifier:* trivially dies if `--ease-standard` and the UA `ease` are the same cubic-bezier — they are not (`motion-curves.js:5` `--motion-ease-standard = cubic-bezier(.4,0,.2,1)` vs `ease = cubic-bezier(.25,.1,.25,1)`).

---

## INFO

### i-1 — this leaf consumes **zero** of the 45-operation API surface, and the state it owns is unpersistable by construction
**Severity** INFO. `EasingPicker.vue` imports three modules (`:2-4`); none reaches `lib/api.ts`. The easing selection lives only in `stores/animation.ts:24` (`easing = ref<AnimationEasingName>("sine")`), which the store's own B.W4 note (`:14-19`) confirms is "ephemeral playback state … never read or wrote a snapshot identity". On the server side the neighbouring persisted shape is `api/models/visualization.py:65-79` `AnimationData = {active_bases, n_harmonics, partial_sums}` with `model_config = ConfigDict(extra="forbid")` — no `easing`, no `speed`, no `duration`, and `extra="forbid"` means a client cannot smuggle them. Consequence: a shared/remixed visualization does **not** carry its author's curve; every viewer gets `"sine"`. Intake row **R6-8** (the API-operation leaf embedding derived client back-references) is therefore **unreachable from this component** — I record that rather than stretch it. **Falsifier:** if playback presentation is deliberately viewer-owned (a defensible product call), this stays INFO forever; it becomes a defect only if the gallery is expected to reproduce an authored animation.

---

## SUPERLATIVES (L-18 both ways — each with its own falsifier)

### S-1 — the leaf-subpath import is the single best consumption decision in the file, and it is what keeps B-1 survivable here
`EasingPicker.vue:2` — `import { Button } from "@mkbabb/glass-ui/button"`, **not** the barrel. Verified: `dist/button.js` → `dist/button-BNDWhAZb.js` pulls only `cn`, reka-ui's `Primitive`, and `cva` — no reka-ui Toggle/Select/Popper tree, no `motion-curves`. That last point is load-bearing: the barrel path would drag `dist/motion-curves.js:3`'s 18 root-specifier value.js imports into this leaf's graph and make B-1 fire from `EasingPicker.vue` itself. **Falsifier:** if Vite's `manualChunks` (`vite.config.ts:52-56`, which names the bare `"@mkbabb/glass-ui"` id) hoists the whole barrel into `vendor-ui` anyway, the bundle-weight half dies — the *module-graph* half (what this file can break on) does not.

### S-2 — the ARIA rationale is written in place **and** the roles actually survive the primitive
`EasingPicker.vue:10-15` is a five-line justification for `role="menuitemradio"` + `aria-checked` over `aria-pressed`. `lane-frontend.md:629` already banks the comment; **my addition is the verification that it works through the wrapper**: `dist/button-BNDWhAZb.js` renders a single reka-ui `Primitive` root with `mergeProps`, no `inheritAttrs: false`, no multi-root — so `role` (`:24`) and `:aria-checked` (`:27`) land on the real `<button>` rather than being swallowed. A component that documents an a11y decision *and* whose decision provably reaches the DOM is rare. **Falsifier:** a live `getAttribute("role")` returning `"button"` would kill it; static reading of the render function says otherwise.

### S-3 — token-true transition discipline, verified end to end
`EasingPicker.vue:79` names two properties (never `transition: all`) and uses `var(--ease-standard)` — and unlike most token citations, this one **resolves**: defined at `dist/styles/tokens/scheme-motion.css:216` / `theme/bridges.css:325`, reachable because `web/src/style.css:3` imports `@mkbabb/glass-ui/styles`. Had it not resolved, `var()` invalid-at-computed-value would have zeroed the whole shorthand and killed *both* transitions silently. **Falsifier:** drop the `@import` and the token dies with no console error — which is exactly why verifying it counts. (Docked, not withdrawn, by m-9(b): the sibling rule at `:93` breaks the discipline.)

### S-4 — the catalog is consumed total-function-safely and the curve sampling is memoized
`stores/animation.ts:28` guards the lookup (`ANIMATION_EASINGS[easing.value]?.fn ?? ((x) => x)`) so a stale persisted name cannot crash the rAF clock, and `lib/easings.ts:99-108` memoizes per name — the six chips sample 33 points **once** for the life of the page instead of on every re-render of a reactive `:d` binding. For a component that re-renders on every selection change (M-4/m-9(a)), that cache is what keeps the cost at zero. **Falsifier:** if any caller mutates `ANIMATION_EASINGS` at runtime the cache goes stale — nothing in the tree does (`grep -rn "ANIMATION_EASINGS"` → 4 sites, all reads).

---

## Verdict

The component is **competently authored and structurally mis-fitted**. Its own craft is real (S-1..S-4: leaf subpath, working ARIA, resolving tokens, memoized sampling). Its consumption is where it fails: it stands on the one glass-ui primitive that clamps height and force-sizes descendant glyphs (M-1, M-2) instead of the `ToggleChip` `cell` the DS ships at the installed version (M-3); it has no contract at all where its own sibling has one (M-4); it hardcodes an accent twice while the DS grew the token family the comment says is missing (M-5); and its keyboard model contradicts the roles it announces, with the covering test disabled (M-6). Above all of it sits the F.W2 wall: this leaf cannot cross to value.js 4.0.0 — not because of anything it imports (all five of its curves live at `@mkbabb/value.js/easing`), but because a co-located morph catalog reaches for a symbol value.js deleted, through a root specifier value.js no longer publishes (B-1), inside a three-package version deadlock that is **already** out of peer contract today (B-2).

Cheapest ordering: split `lib/easings.ts` (picker catalog ↔ morph catalog) → re-point the picker's two import lines to `@mkbabb/value.js/easing` → swap `Button size="sm"` for `ToggleChip variant="cell"` (kills M-1, M-2, M-3, m-4, half of m-9 in one edit) → give it `modelValue`/`update:modelValue` + `compact` (M-4) → then the glass-ui 7 `./easing` re-home the corpus already books.
