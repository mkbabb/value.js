claude-opus-5[1m]

# CHALLENGE — `BasisSelector.vue` · axis **C = CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/BasisSelector.vue` (324 lines)
**Substrate** fourier HEAD `cd26c65` (matches CENSUS-2026-08-03 §"Adopted facts" 1 — *"the substrate has not moved"*), installed `@mkbabb/glass-ui@4.0.0`, `@mkbabb/value.js@0.13.0`, `@mkbabb/keyframes.js@4.3.0`
**Method** static + source-derived only. No browser. Every claim carries file:line and a falsifier. Runtime-only legs are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Six claims survived their falsifiers as *superlatives* (L-18 runs both ways) and are recorded in §3 with the same rigor.

**Tally — 23 defects · 2 BLOCKERS · 7 superlatives.**
*(§6 is an independent second-pass addendum: C-18…C-23, S-8, and two executable receipts. §§0–5 are the first pass, unaltered. Where the second pass corroborated a first-pass row by measurement rather than argument, it says so in §6.0 instead of editing the row.)*

---

## §0 — What "consumption" means for this component, and the one-line verdict

BasisSelector consumes **four** upstream surfaces:

| surface | how | verdict |
|---|---|---|
| `@mkbabb/glass-ui@4.0.0` | `Slider` (×2), `Button` (×4 instances), `ConfiguratorLayer`, `ConfiguratorRow` (×2) — `:3-5` | **RED** — the entire per-instance retint contract is DEFINITION-ABSENT (C-1); two shipped affordances re-rolled (C-5, C-11) |
| `@mkbabb/value.js@0.13.0` | **zero imports** | **RED by omission** — the component's whole colour path runs through a 117-line hand-rolled parser (`lib/colors.ts`) that is value.js's own domain and is already booked for deletion (C-7) |
| `@mkbabb/keyframes.js@4.3.0` | **zero imports**; all motion is raw CSS `transition` | **AMBER** — no keyframes coupling, but the glass-ui motion tokens are bypassed (C-13) |
| fourier API (45-operation surface, CENSUS §"Adopted facts" 4 = 30 public-non-admin + 13 admin + 1 app + 1 gallery) | indirect: `update:nHarmonics` / `update:nPoints` → parent ref → sibling `ContourSettings.vue` → `/compute/*` | **RED** — the client's numeric window is invented at the leaf and is unrelated to any operation model (C-6) |

**Verdict.** Every colour this component computes is wrong at runtime, by two independent mechanisms that stack. The sliders' basis tint is *unreadable by the library* (C-1) and the value it would have read is *`#888888`* (C-2). The pills only look right because a third bug — a module-eval snapshot that froze the palette at its hard-coded literals (C-4) — accidentally shields them from C-2. This is the rarest failure shape in an audit: three defects whose interaction is *less* visible than any one of them alone.

---

## §1 — BLOCKERS

### C-1 · BLOCKER — the `--slider-scrub-*` retint contract is DEFINITION-ABSENT in glass-ui 4.0.0; both sliders paint `--primary`

**Provenance.**
- `BasisSelector.vue:318-323` declares the retint hook:
  ```css
  .basis-slider-track {
      --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 30%, transparent);
      --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 45%, transparent);
      --slider-scrub-thumb-bg:        var(--track-color);
      --slider-scrub-thumb-bg-hover:  var(--track-color);
  }
  ```
- `BasisSelector.vue:176` and `:203` feed it: `:style="{ '--track-color': VIZ_COLORS.fourier }"` / `VIZ_COLORS.chebyshev`.
- glass-ui 4.0.0's Slider reads **`--slider-range-bg`**, **`--slider-thumb-bg`**, **`--slider-thumb-border-color`**, **`--slider-thumb-shadow`**, **`--slider-thumb-size`**, **`--slider-track-bg`**, **`--slider-track-height`**, **`--slider-range-blur`**, **`--slider-range-shadow`**, **`--slider-thumb-spring`** — the complete list, from `node_modules/@mkbabb/glass-ui/dist/glass-ui.css`.
  `.slider-range[data-v-534634a7]{…background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent);…}`
- **`grep -rl -- "slider-scrub" node_modules/` returns EMPTY.** Zero occurrences of the `--slider-scrub-*` family anywhere in the installed dependency tree.

**Dated root cause.** The token family was real, and the fourier repo's own audit archive records its birth: `fourier-analysis/docs/audits/runs/2026-05-18-fourier-tranche/d-style-glassui.md:121` — *"glass-ui W3 Lane A added `<Slider variant="glass-scrubber">` … **8 opt-in `--slider-scrub-*` fallback tokens**, no `tokens.css` additions."* At glass-ui 4.0.0 the variant was renamed `glass-scrubber` → `standard` **and the token family was renamed `--slider-scrub-*` → `--slider-*`**. lane-frontend.md's prior-art table records the fourier-side sweep: `9 × variant="glass-scrubber"` → `9 × variant="standard"`, *"a pure rename sweep, no logic"*. **The sweep flipped the 9 `variant=` strings and left all 20 token declarations behind.** BasisSelector holds 4 of the 20.

**The sweep is still uncommitted, and this file's slice of it is the smoking gun.** `git diff -- web/src/components/visualization/BasisSelector.vue` at the audited tree is **exactly 3 lines**, and they are precisely the three the sweeper's search term could see:
```diff
-/* A.W2.c — `<Slider variant="glass-scrubber">` accepts an array model; the   ← :25 comment
+/* A.W2.c — `<Slider variant="standard">` accepts an array model; the
-                    variant="glass-scrubber"                                  ← :170
+                    variant="standard"
-                    variant="glass-scrubber"                                  ← :196
+                    variant="standard"
```
Not touched by the same sweep, in the same file: the `:315` comment *"glass-scrubber per-instance retint hook"* and the four `--slider-scrub-*` declarations at `:319-322`. **The sweeper updated 3 of 4 occurrences of the literal string `glass-scrubber` and 0 of 4 declarations of the token family that was renamed alongside it.** The migration was executed as a string substitution over the variant *name*; the *token contract* the variant governs was never in the search. This is a mechanism finding, not just a residue finding — the same sweep shape will reproduce the same class of dead declaration at F.W1 unless the acceptance gate is written over token families rather than variant strings.

**Audited state.** This challenge reads the **working tree** (the state `CENSUS-2026-08-03` §"Adopted facts" 1 certifies as *"byte-identical to live"*), i.e. **with** the 3-line rename applied. At `HEAD` (`cd26c65`) the two `variant="glass-scrubber"` strings are still present, which would make the sliders fall through to reka's unstyled default instead of `standard` — a *different* break. Either way the retint is dead; the WT state is the one that ships.

**Blast radius (fleet, not local).** 5 files declare the dead retint (`BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `SliderControl.vue:145-148`, `HarmonicLevelGrid.vue:210-213`, `MorphPhaseConfig.vue:207-210`) and 3 more declare the dead `--slider-scrub-track-height` (`GlassTimeline.vue:125`, `SliderControl.vue:144`, `ConvergenceTimeline.vue:136`). **20 dead declarations across 7 files.** BasisSelector is a site, not the origin — but it is a *full* site: all four of its retint declarations are inert.

**Failure scenario.** User opens the Decomposition layer. The Harmonics slider is specified to fill in fourier-red and the Sample Points slider in chebyshev-blue; both instead fill in `var(--primary)` (glass-ui's default fallback in the `color-mix` above), i.e. **the two sliders are visually identical and carry no basis identity**. The `import { VIZ_COLORS }` at `:7` is, for the slider half of this component, dead weight; so are both `:style` bindings at `:176`/`:203` and the entire `.basis-slider-track` rule.

**Falsifier (and why it fails).** *Claim dies if any stylesheet in the resolved cascade reads `--slider-scrub-*`.* The resolved cascade is exactly `tailwindcss` + `tw-animate-css` + `@mkbabb/glass-ui/styles` (`web/src/style.css:1-3`) plus fourier's own 143-line `style.css`. `grep -rl -- "slider-scrub" node_modules/` → empty; `grep -rln -- "slider-scrub"` over the fourier repo minus `node_modules` returns only the 7 *declaring* SFCs and three archival audit documents — **no reader anywhere**. Falsifier exhausted.

**Second falsifier.** *Claim dies if `.basis-slider-track` never lands on an element in the Slider's inheritance chain.* It does: `BasisSelector.vue:175` puts the class on `<Slider>`, glass-ui merges consumer `class` onto `SliderRoot` (`slider-DQ95MET2.js`, `class: cn(sliderVariants({…}), C.class)`), and `.slider-range`/`.slider-thumb` are its descendants. The plumbing is correct; the pipe is connected to a fitting that no longer exists.

**Cross-reference.** Folds lane-frontend.md:382, which catalogued `BasisSelector.vue:315` as a **prose-only** `glass-scrubber` occurrence and closed there. **This challenge contradicts that closure's implied scope:** the prose at `:315` is the *comment on* a live 4-declaration block at `:318-323` whose token names died with the same rename. Prose-only was true of the string `glass-scrubber`; it was not true of the block the string describes.

---

### C-2 · BLOCKER — `cssVarToHex` has no `oklch()` arm; glass-ui 4.0.0 ships **every** `--viz-*` as `oklch()`/`light-dark(oklch, oklch)` ⇒ `VIZ_COLORS.fourier` and `.chebyshev` resolve to `#888888`

**Provenance.**
- `lib/colors.ts:22-53` — `cssVarToHex` has exactly four arms: hex `:29`, `hsl()` `:32-37`, bare-HSL triplet `:40-43`, `rgb()` `:46-51`, then `return "#888888"` at `:53`.
- `lib/colors.ts:91-95` — `resolveVizColors()` overwrites `VIZ_COLORS.fourier/.chebyshev/.legendre/.amber/.green` with the output of that function.
- `App.vue:10-18` — `resolveVizColors()` on mount **and** on every `documentElement.class` mutation (the dark-mode toggle).
- The shipped token values, both cascade arms:
  - `node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-265`
    `--viz-fourier: oklch(0.579 0.201 30.4); --viz-chebyshev: oklch(0.484 0.163 265.5); --viz-legendre: oklch(0.532 0.180 317.5);`
  - `…/tokens/dark-arm.css:113-115` — same three, oklch.
  - `…/tokens/light-dark.css:145-147` — `--viz-fourier: light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1));` etc.
- **Neither `oklch(` nor `light-dark(` matches any of the four arms.** Fall-through → `#888888`.

**The asymmetry that proves it.** `--viz-amber` is the *only* viz token the app overrides locally, and it overrides it **in `hsl()`**: `web/src/style.css:120` `--viz-amber: hsl(35 76% 35%);` / `:125` `--viz-amber: hsl(37 73% 67%);` (a D.W4.d WCAG carry). So `VIZ_COLORS.amber` parses correctly and `VIZ_COLORS.fourier/chebyshev/legendre` do not. **The one colour that survives is the one an unrelated accessibility fix happened to re-author in a format the parser understands.** `--viz-green` is `var(--section-color-4)` → substitutes to `oklch(0.551 0.088 171.1)` (`color-radius.css:245`) → also `#888888`.

**Failure scenario.** `BasisSelector.vue:176` binds `--track-color: VIZ_COLORS.fourier` and `:203` binds `VIZ_COLORS.chebyshev`. After `onMounted` both are the string `#888888`. Even in a world where C-1 were fixed, both sliders would fill in the **same neutral grey**, and the basis-identity signal the whole `--track-color` mechanism exists to carry would be destroyed. Sibling consumers of the same two entries — `BasisCanvas.vue`, `canvas-drawing/epicycles.ts`, `canvas-drawing/labels.ts`, `GalleryCard.vue`, `HarmonicLevelGrid.vue` — inherit the same grey.

**Falsifier 1.** *Claim dies if some stylesheet in the cascade redefines `--viz-fourier` in hex/hsl/rgb.* Exhaustive: `grep -rn "viz-fourier|viz-chebyshev|viz-legendre|viz-amber|viz-green"` over the whole fourier repo minus `node_modules` returns **only consumers** plus the two `--viz-amber` overrides at `style.css:120/125`. No local redefinition of the three basis tokens exists.

**Falsifier 2 (the one that matters).** *Claim dies if `getComputedStyle(el).getPropertyValue("--viz-fourier")` returns a resolved `rgb()` rather than the token stream.* Per CSS Custom Properties L1 §2.1, a registered-less custom property's computed value **is** its (var-substituted) token stream — no colour resolution occurs, because the UA does not know the property is a `<color>`. `light-dark()` likewise resolves only at used-value time for real colour properties. So the return is `"oklch(0.579 0.201 30.4)"` or `"light-dark(oklch(…), oklch(…))"`. This leg is **spec-derived, not measured** → **`UNPROVEN-NEEDS-LIVE` (SS-13)**: one `evaluate_script` returning `getComputedStyle(document.documentElement).getPropertyValue('--viz-fourier')` settles it. The other two legs (the regex arms; the token values) are conclusive from source.

**Cross-reference — fold + escalate.** lane-docs.md:400 already recorded *"`cssVarToHex` at `:22-53` with exactly four regex arms … **No `oklch()` arm.**"* **This challenge escalates that observation from a latent gap to a live BLOCKER** by establishing the fact lane-docs left open: at glass-ui 4.0.0, `oklch()`/`light-dark()` is not an *edge* input to that function — it is the **only** input it ever receives for three of its five calls. The missing arm is not a hole in coverage; it is the whole path.
lane-docs.md:474 (`W.L5` item 2) already books the fix — *"delete `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba` (`colors.ts:22-117`)"* — status **NOT EXECUTED**. C-2 is that booking's live consequence at this component.

---

## §2 — MAJOR / MINOR / INFO

### C-7 · MAJOR — value.js is a declared dependency this component does not consume, while hand-rolling exactly value.js's domain

`web/package.json:18` pins `"@mkbabb/value.js": "^0.13.0"` (installed 0.13.0). CENSUS-2026-08-03:38 fixes the live surface: **5 import statements / 4 files / 6 symbols, easing-only** (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`). BasisSelector is **not among them** — it imports zero value.js.

What it imports instead: `VIZ_COLORS` from `lib/colors.ts` (`BasisSelector.vue:7`) — a 117-line module whose entire top half (`:22-117`) is a CSS-colour parser (`cssVarToHex`), two colour-space converters (`hslToHex` `:56-68`, `rgbToHex` `:70-74`) and two serialisers (`hexToRgba` `:101-106`, `hexToRgb` `:111-117`). That is the value.js `parseCssColor`/`Color`/conversion surface, re-implemented, with an incomplete grammar (C-2) and 8-bit sRGB quantisation on every round-trip.

**Sharpest form of the finding: the round-trip is superfluous *even before* it is wrong.** BasisSelector's only consumers of `VIZ_COLORS` are two CSS custom-property bindings (`:176`, `:203`). The value being computed — JS reads `--viz-fourier` from the DOM, regex-parses it, quantises to hex, hands the hex back to CSS — is **a value CSS already had**. The sibling `EditorControlsDock.vue:205,208` does the correct thing with the same token: `--btn-hover-color: var(--viz-fourier);` / `background: color-mix(in srgb, var(--viz-fourier) 15%, transparent);` — no JS, no parser, no quantisation, and immune to both C-1's rename and C-2's missing arm. **`:style="{ '--track-color': 'var(--viz-fourier)' }"` — or simply `--track-color: var(--viz-fourier)` in the scoped rule — deletes the import, the parser dependency, and C-2's reach into this file, in one line.**

**Falsifier.** *Claim dies if any BasisSelector consumer of `VIZ_COLORS` needs a hex string rather than a CSS colour value.* Both callsites feed `color-mix(in srgb, var(--track-color) …)` (`:319-322`) — a CSS context that accepts any `<color>`, including `oklch()`. Neither needs hex. (Contrast `canvas-drawing/epicycles.ts`, which feeds a 2-D context and *does* need a resolved string — that is where a real parser is owed, and where value.js's is owed.) Falsifier fails for this component.

**Migration note (F.W1).** CENSUS-2026-08-03:109/184 establishes `glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` as **one atomic transaction**. All five live value.js sites use the **bare root specifier**, which 4.0.0 no longer exports. BasisSelector adds **zero** to that migration budget — it is the one visualization component the specifier break cannot touch. Recorded as a mitigating fact, not a virtue: it is zero because the component reached for a hand-rolled substitute instead.

---

### C-3 · MAJOR — `DEFAULTS.nHarmonics = 50` contradicts the canonical default of **200**; the reset button silently quarters the harmonic budget

`BasisSelector.vue:73-77`:
```ts
const DEFAULTS = { activeBases: ["fourier-epicycles"], nHarmonics: 50, nPoints: 1024 } as const;
```
Four independent sources of truth say **200**:
| source | line | value |
|---|---|---|
| `web/src/lib/defaults.ts:7` | `CONTOUR_DEFAULTS.n_harmonics` | **200** |
| `api/models/shared.py:12` | `ContourSettings.n_harmonics` | **200** |
| `api/models/computation.py:44` | `ComputeEpicyclesRequest.n_harmonics` | **200** |
| `api/services/computation.py:102` | default arg | **200** |

And the ref BasisSelector is bound to is seeded from that canonical source: `useWorkspaceLoader.ts:18` `ref(store.contourSettings?.n_harmonics ?? CONTOUR_DEFAULTS.n_harmonics)`, re-seeded at `:67`, and reset on image-identity change at `:84` — **all three to 200**.

**Failure scenarios, both reachable.**
1. **The reset affordance lies at first paint.** `isDefault` (`:79-84`) evaluates `(props.nHarmonics ?? 50) === 50`. On a virgin workspace `props.nHarmonics` is 200 ⇒ `isDefault` is `false` ⇒ `.reset-icon-btn.is-default` never applies ⇒ the button renders at full opacity and live, telling the user their untouched configuration is dirty.
2. **Reset destroys work.** `resetDefaults()` (`:86-91`) emits `update:nHarmonics = 50`. The user's harmonic count drops 200 → 50, `ContourSettings.vue:141` fires its 1 s debounced watcher, `runCompute()` re-hits `/compute/epicycles` and the reconstruction loses three-quarters of its terms — from a control captioned *"Reset to defaults"*.
3. The same `50` is hard-coded a second and third time as the prop fallback at `:29` and `:80`, and `1024` at `:33`/`:81` (that one happens to agree with `CONTOUR_DEFAULTS.n_points`).

**Falsifier.** *Claim dies if `CONTOUR_DEFAULTS` is not the source of the ref BasisSelector reads.* `VisualizationView.vue:50` `const { nHarmonics, nPoints } = useWorkspaceLoader(activeBases)` → `:265-266` `v-model:n-harmonics="nHarmonics"`. Same ref, one hop, no transform. Falsifier fails.

**Corroborating contrast.** The sibling `ContourSettings.vue` — same layer chassis, same panel, same wave — imports `CONTOUR_DEFAULTS` (`:6`) and derives **both** its `isDefault` (`:62-67`) and its `resetDefaults` (`:71-76`) from it, field by field. BasisSelector is the sole outlier; the correct idiom is 20 lines away in the same directory.

---

### C-4 · MAJOR — `basisDisplay` snapshots the *reactive* `VIZ_COLORS` at module-eval; `--pill-color` is frozen at the hard-coded literals and never tracks theme

`components/visualization/lib/basis-display.ts:1-7`:
```ts
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon; label; color}> = {
    fourier:   { …, color: VIZ_COLORS.fourier   },
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre  },
};
```
`VIZ_COLORS` is `reactive({ fourier: "#bf4040", chebyshev: "#3d72b8", legendre: "#9545b8", … })` (`colors.ts:77-87`). Reading `.fourier` **at module scope, outside any reactive effect**, yields the plain string `"#bf4040"` and stores it in a **plain** object. `basisDisplay` is never wrapped in `reactive`/`computed`, so `BasisSelector.vue:139` `v-for="(info, key) in basisDisplay"` and `:145` `{ '--pill-color': info.color }` establish **no dependency at all**.

**Failure scenario.** `resolveVizColors()` (`App.vue:11`) runs on mount and on every dark-mode toggle (`App.vue:13-17`). It mutates `VIZ_COLORS`. The Harmonics/Sample-Points slider bindings (`:176`, `:203`) read the proxy in render and *do* track it. `basisDisplay` does not. **After the first `resolveVizColors()` the two halves of this one component are reading two different palettes** — and after every dark-mode flip the pills stay at their light-mode literals while everything else in the app re-tints.

**The three-defect interaction.** C-2 makes `VIZ_COLORS.fourier` become `#888888`. C-4 means the pills never see that. So the *observable* symptom is inverted from the code's intent: the pills keep their (accidentally correct-looking) brand colours from the hard-coded initialiser, and the sliders — the half that correctly subscribes to the reactive palette — are the half that goes grey. A live-only inspection would read this as "slider tint broken, pills fine" and would find neither root cause.

**Falsifier.** *Claim dies if `basisDisplay` is re-evaluated or is itself reactive.* It is a module-level `const` object literal; ES module bindings evaluate once; nothing in the repo re-assigns it (`grep -rn "basisDisplay" web/src` → the declaration plus the single `v-for` consumer). Falsifier fails.

---

### C-5 · MAJOR — the local `@/components/ui/tooltip` shim re-rolls a primitive glass-ui already ships (`IconTooltip`), at 2 of this component's callsites

`BasisSelector.vue:6` imports `Tooltip` from `@/components/ui/tooltip`. That file (`ui/tooltip/Tooltip.vue:1-38`) is a 38-line adapter whose own docblock states its purpose: *"wraps the glass-ui decomposed tooltip primitives … behind the same single-component API"*, props `{ text?: string; side?: … }` + default slot + `#content` slot.

glass-ui 4.0.0 **already exports that component**: `package.json` exports `"./icon-tooltip"`, and `dist/components/custom/icon-tooltip/IconTooltip.vue.d.ts` declares `__VLS_Props = { text: string }` with a `default` slot — the identical shape.

**Failure scenario.** Not a runtime break — a migration-cost and design-authority break. The glass-ui-first precept holds that variants/primitives belong upstream; here a shipped primitive was shadowed by a local copy, and the copy now sits between 35 callsites and a library that has since moved. Both of BasisSelector's callsites (`:124` `<Tooltip text="Reset to defaults">`, `:139` `<Tooltip … :text="getBasisTooltip(…)">`) pass **only `text`** — neither uses `side` nor `#content` — so for this component `IconTooltip` is a **strict drop-in**, and the adapter buys nothing.

**Falsifier.** *Claim dies if `IconTooltip` lacks a capability BasisSelector uses.* `IconTooltip` has no `side` prop and no `#content` slot; BasisSelector uses neither. Read the two callsites: `:124` and `:139-151` — `text` only. Falsifier fails **for this component** (it may hold for other members of the 35).

**Cross-reference.** Folds **R3-7a** (lane-fourier-r3-r6.md:79, verdict TRUE): *"35 Tooltip callsites over nine consumers … BasisSelector 2 … CARRY-TO-WAVE → F.W3, barrel `web/src/components/ui/tooltip/index.ts` → `@mkbabb/glass-ui/tooltip`."* Live re-count at HEAD: BasisSelector = **2**, exactly as R3-7a states. **One amendment to R3-7a's disposition:** its migration target is `@mkbabb/glass-ui/tooltip` (the *decomposed* primitives, which would force all 35 callsites to expand into `Tooltip`/`TooltipTrigger`/`TooltipContent` triples). For the subset that passes `text` only — both of BasisSelector's — the cheaper and more faithful target is `@mkbabb/glass-ui/icon-tooltip`, a one-word import swap with zero template churn. F.W3 should split the 35 on that predicate before budgeting.

---

### C-6 · MAJOR — the numeric window is invented at the leaf, restated six times per control, and bears no relation to any operation model

`nHarmonics`'s bounds are written **six** times: `Math.max(1, Math.min(500, …))` in the computed setter `:30`; `min="1" max="500"` on the number input `:160-161`; `Math.max(1, Math.min(500, …))` again in the `@input` handler `:165`; `:min="1" :max="500"` on the Slider `:171-172`. `nPoints`'s `[128, 4096]` window likewise at `:34`, `:186-187`, `:192`, `:198-199`.

The **operation** side (the 45-op surface, CENSUS §"Adopted facts" 4) says something else entirely:

| operation model | line | bound on `n_harmonics` |
|---|---|---|
| `ComputeEpicyclesRequest` | `api/models/computation.py:44` | `= 200` — **no `ge`/`le` at all** |
| `Visualization` (persist) | `api/models/visualization.py:187` | `Field(ge=1, le=4096)` |
| `VisualizationRemix` | `api/models/visualization.py:281` | `Field(default=None, ge=1, le=4096)` |
| **`AnimationData`** | `api/models/visualization.py:76` | **`Field(default=1, ge=1, le=256)`** |
| `EquationRequest` | `api/models/equations.py:20` | `Field(default=20, ge=1, le=200)` |

**Five different windows across the operation surface, and the client's `[1, 500]` matches none of them.** `500` is not `256`, not `4096`, not `200`, and not unbounded.

**Failure scenario.** `AnimationData.n_harmonics` is capped at **256** (`visualization.py:76`, `extra="forbid"`). Any path that persists an animation payload built at a client-permitted `n_harmonics ∈ (256, 500]` — a window the slider hands the user directly, 244 of its 500 positions — meets a Pydantic 422 at the operation boundary, with the rejection surfacing far from the slider that caused it. The client's cap does not narrow the operation's; it *straddles* it.

**Falsifier.** *Claim dies if no BasisSelector-driven path reaches an `AnimationData`-bearing model.* `nHarmonics` → `ContourSettings.vue:119` `store.contourSettings.n_harmonics` → `workspace.ts:294,354` `n_harmonics: contourSettings.value.n_harmonics` on the compute/snapshot calls, and `gallery.ts:253` on the publish path. The value reaches the operation surface with no re-clamp anywhere. Whether *that specific* body binds `AnimationData` rather than `Visualization` is not settleable from the client alone → the 422 leg is **`UNPROVEN-NEEDS-LIVE`**; the six-fold restatement and the five-way divergence are conclusive from source.

**Cross-reference — R6-8.** lane-fourier-r3-r6.md:142 (TRUE, ADOPT-AS-FACT + CARRY-TO-WAVE → F.W5) establishes the contract lesson: *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam … operation identity must stay independent of client identity."* **C-6 is the dual of R6-8 and sharpens it.** R6-8 found the *operation* leaf contaminated by client provenance. Here the *client* leaf carries a numeric contract with no derivation from the operation at all — six hand-copied literals where a generated bound belongs. R6-8 says the join must not live inside the operation record; C-6 says it must nonetheless **exist**, or the client invents its own. Both defects are the same seam failing in opposite directions, and the F.W8/FN-6 conformance-fixture work is the single place that closes them together: **generate the client's `min`/`max` from the operation model.**

---

### C-8 · MINOR — dead `fourierModes` const; no configured gate can catch it

`BasisSelector.vue:11` `const fourierModes = ["fourier-epicycles", "fourier-series"] as const;` — the only occurrence in the file (`grep -n "fourierModes"` → line 11 alone). The similarly-named `fourierMode` (singular, `:41`) is live; the plural is not.

**Why it survived.** `web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals` / `noUnusedParameters`, and the repo has no ESLint config. `vue-tsc -b` (the `build` script) therefore passes. **Falsifier:** *claim dies if `noUnusedLocals` is set somewhere.* `tsconfig.json` is the only tsconfig in `web/` (`tsconfig.app.json` does not exist); its 14 `compilerOptions` are listed in full above and the flag is absent. Falsifier fails. The finding is as much about the gate as the const: this is the class of residue the toolchain is structurally blind to.

---

### C-9 · MINOR — `lucide-vue-next` is imported at runtime but declared a **devDependency**; also 1 of the 35 `@lucide/vue` migration sites

`BasisSelector.vue:9` `import { RotateCcw } from "lucide-vue-next";` — a shipped runtime import, rendered at `:133`. `web/package.json` places `"lucide-vue-next": "^1.0.0"` in **`devDependencies`** (alongside `reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` — all likewise runtime-imported from `src/`). Tolerable for a bundled `private: true` app; still a mis-declaration, and it makes the dependency graph lie about what ships.

lane-frontend.md:480 books the forward cost: glass-ui 7.0 peers `@lucide/vue@^1.16.0`; **35 import sites** must move. BasisSelector is one.

**Falsifier.** *Claim dies if `lucide-vue-next` is also listed under `dependencies`.* `web/package.json` `dependencies` block: `@mkbabb/glass-ui`, `@mkbabb/keyframes.js`, `@mkbabb/latex-paper`, `@mkbabb/pencil-boil`, `@mkbabb/value.js`, `@vueuse/core`, `katex`, `pinia`, `tw-animate-css`, `vue`, `vue-router` — 11 entries, no lucide. Falsifier fails.

---

### C-10 · MINOR — `pointer-events: none` used as the disabled mechanism; the reset button stays keyboard-activatable

`BasisSelector.vue:307-310` `.reset-icon-btn.is-default { opacity: 0.25; pointer-events: none; }`. The glass-ui `Button` ships a real `disabled` prop (`Button.vue.d.ts` → `disabled?: ButtonHTMLAttributes['disabled']`, and `buttonVariants` ships the disabled geometry — a fact this component's own comment at `:252-256` acknowledges). It is not used.

**Failure scenario.** `pointer-events: none` suppresses mouse and touch only. The `<button>` remains in the tab order and `Enter`/`Space` still fire `@click.stop="resetDefaults"` (`:131`). A keyboard user tabs to a control rendered at 25 % opacity — the universal disabled signal — and it fires, emitting all three defaults including the wrong `50` of C-3. Screen-reader users get no signal at all: no `disabled`, no `aria-disabled`, only an opacity the AT cannot see.

**Falsifier.** *Claim dies if `pointer-events: none` blocks keyboard activation, or if the element is not focusable.* CSS `pointer-events` is defined only over pointer hit-testing (CSS UI L4); it does not affect focus or key events. `<Button>` renders reka's `Primitive as="button"` (`Button.vue.d.ts extends PrimitiveProps`, default `as` = `button`), natively focusable, with no `tabindex="-1"`. Falsifier fails on both legs. Keyboard reachability is source-certain; the *observed* firing is **`UNPROVEN-NEEDS-LIVE`**.

---

### C-11 · MINOR — `ConfiguratorRow`'s shipped `canReset`/`@reset` is unused; `.reset-icon-btn` nullifies the `<Button>` recipe and is duplicated verbatim across ≥2 consumers

Three strands, one root:
1. **`ConfiguratorRow` ships `canReset?: boolean` + `reset` emit** (`ConfiguratorRow.vue.d.ts`, docblock: *"The reset button is opt-in via `canReset`; emits a `reset` event the consumer wires to its own field-clear path"*). BasisSelector's two rows (`:154`, `:181`) use neither, though a per-row reset is exactly what a 200↔user-value harmonics field wants.
2. **The layer-level workaround is justified but the implementation is not.** `:121-122`'s comment — *"ConfiguratorLayer has no header-actions slot"* — is **TRUE** (verified: `ConfiguratorLayer.vue.d.ts` `__VLS_Slots` = `{ default? }` only). But the workaround then takes a `<Button variant="ghost" size="icon">` (`:125-134`) and cancels its entire recipe in scoped CSS: `border: none; background: none; padding: 0.25rem; border-radius: 0.25rem` (`:295-306`). Every axis the variant exists to supply is overwritten; the component is used as a focusable `<button>` with a lucide child.
3. **The duplication meets glass-ui's own upstreaming threshold.** `grep -rln "reset-icon-btn" web/src` → **exactly 2 files**: `BasisSelector.vue` and `ContourSettings.vue:198`, byte-comparable blocks. `ConfiguratorRow.vue.d.ts`'s divergence note records the library's stated criterion — *"no ≥2-consumer shared-chassis need surfaced"* — as the reason a merge was declined elsewhere. **Here the criterion is met**: two consumers, identical idiom, and a named upstream gap (`ConfiguratorLayer` header-actions slot) that would delete both copies.

**Falsifier.** *Claim dies if `ConfiguratorLayer` does have a header slot, or if the two `.reset-icon-btn` blocks differ materially.* The d.ts slot type is `{ default?: … }` — no named slot. Both blocks wrap the same `<Tooltip text="Reset to defaults">` + `<Button variant="ghost" size="icon" class="reset-icon-btn" :class="{ 'is-default': isDefault }">`. Falsifier fails on both legs.

---

### C-12 · MINOR — two different prop-adaptation idioms in one 324-line file; the `activeBases` mirror aliases the parent's array and mutates it in place

`nHarmonics`/`nPoints` are adapted with paired writable computeds (`:28-35`) — correct, and documented. `activeBases` uses the opposite idiom: a local mirror plus a sync watcher (`:37-39`):
```ts
const selected = ref<string[]>(props.activeBases ?? ["fourier-epicycles"]);
watch(() => props.activeBases, (v) => { if (v) selected.value = [...v]; });
```
Two consequences.
1. **`isDefault` reads mixed sources** — `props.nHarmonics`/`props.nPoints` for the scalars but `selected.value` for the bases (`:79-84`). Correct only while the mirror is in sync.
2. **Aliasing.** `ref(props.activeBases)` stores the parent's *own array instance* (`VisualizationView.vue:45` `activeBases`, passed by reference at `:265`). `toggleBasis`'s non-fourier branch then mutates it in place — `selected.value.splice(idx, 1)` `:110` / `.push(key)` `:112` — **before** emitting a copy at `:115`. The same instance is simultaneously a prop of `BasisCanvas` (`:199`), `AnimationControls` (`:236`) and `FullscreenViewer` (`:284`). `BasisCanvas.vue:403` watches it as `() => props.activeBases` (identity comparison, not `deep`), so the in-place mutation is invisible to it.

**Honest reachability.** The immediately following `emit("update:activeBases", [...selected.value])` `:115` → `activeBases = $event` `:267` installs a fresh array in the same tick, so `BasisCanvas`'s watcher fires once on the new identity and the mutation window closes before flush. **No break is reachable at HEAD.** This is a latent hazard, not a live defect — filed at MINOR for that reason. **Falsifier that would promote it:** any consumer of `activeBases` that reads it synchronously between the splice and the emit, or any future path that mutates without emitting. **Falsifier that would kill it:** a `[...props.activeBases]` copy at `:37`. One character-class of change.

---

### C-13 · MINOR — motion values hardcoded; the glass-ui `--ease-*`/`--duration-*` tokens are bypassed, against the house style of four siblings

`:223` `transition: border-color 0.15s;` · `:305` `transition: color 0.15s, opacity 0.2s;` — durations as literals, **no easing function at all** (so both fall to `ease`).

glass-ui ships the tokens: `dist/styles/tokens/scheme-motion.css` → `--duration-fast: 0.2s`, `--ease-standard: var(--motion-ease-standard)`. Four siblings in the same directory already consume them: `AnimationControls.vue:176,196`, `EasingPicker.vue:79`, `ContourSettings.vue:365,368,457,460`, `FullscreenViewer.vue:192-194`. **BasisSelector is the outlier**, and `0.15s` is not even one of the shipped rungs.

**Falsifier.** *Claim dies if `--ease-standard`/`--duration-fast` are not reachable from a fourier scoped style.* They are `:root`-level custom properties from `@import "@mkbabb/glass-ui/styles"` (`style.css:3`); custom properties inherit through Vue's scope attribute, and the four cited siblings prove reachability empirically. Falsifier fails.

---

### C-14 · MINOR — the props are optional though the parent always binds them, and that optionality is what manufactures the wrong defaults

`:13-17` declares `activeBases?: string[]; nHarmonics?: number; nPoints?: number` — all optional. The sole consumer binds all three unconditionally (`VisualizationView.vue:265-267`), from refs typed `number` (`useWorkspaceLoader.ts:18-19`, `ref(number)`). The sibling with the same two props declares them **required**: `ContourSettings.vue:27-28` `nHarmonics: number; nPoints: number;`.

**Causal chain.** Optionality forces a fallback at every read → `?? 50` at `:29`, `?? 1024` at `:33`, `?? 50` at `:80`, `?? 1024` at `:81`, `?? ["fourier-epicycles"]` at `:37`. **Four of those five literals are C-3's wrong default, and they exist only because the props were allowed to be absent.** Making the three props required deletes all five fallbacks and, with them, the drift surface. **Falsifier:** *claim dies if some other mount omits a prop.* `grep -rn "BasisSelector"` → one import + one usage, both in `VisualizationView.vue`. Falsifier fails.

---

### C-15 · MINOR — the number inputs cannot be cleared to retype, and neither snaps to the slider's step grid

`:165` `@input="emit('update:nHarmonics', Math.max(1, Math.min(500, parseInt(…) || 1)))"` with `:value="nHarmonics"` (`:159`).

**Failure scenario A (clear-to-retype).** Selecting the field and pressing Backspace makes `value` `""`; `parseInt("")` is `NaN`; `NaN || 1` is `1`; the component emits `1`; the parent's ref becomes `1`; the one-way `:value` binding writes `"1"` back into the field **while the user is mid-edit**. The user cannot empty the field to type a fresh number — they must select-all-and-overtype. Same shape at `:192` with a floor of `128`. Deterministic from source; the *felt* behaviour is **`UNPROVEN-NEEDS-LIVE`**.

**Failure scenario B (grid mismatch).** The Sample-Points input advertises `step="128"` (`:190`) but the handler clamps only to `[128, 4096]` — it never snaps to the grid. Typing `200` emits `200`; the Slider is configured `:step="128"` (`:200`), so its thumb sits off-grid until the next drag re-quantises it to `128` or `256`, silently changing the value the user typed.

**Falsifier.** *Claim dies if the input is uncontrolled or the emit is debounced.* `:value` is a live Vue binding re-patched on every parent update, and the emit is synchronous on `input`. No debounce exists in this component (the only debounce is `ContourSettings.vue:148`'s 1 s recompute, downstream of the value). Falsifier fails.

---

### C-16 · MINOR — the Slider's declared `update:modelValue` payload is `number[] | undefined`; the computed setter dereferences `arr[0]` unguarded

`Slider.vue.d.ts` declares `"update:modelValue": (payload: number[] | undefined) => any` (inherited from reka's optional `modelValue`). `BasisSelector.vue:28-35` types both setters `(arr: number[])` and reads `arr[0] ?? 50` / `arr[0] ?? 1024` — the `??` guards a missing *element*, never a missing *array*. An `undefined` payload throws `TypeError: Cannot read properties of undefined (reading '0')` inside a Vue writable-computed setter, i.e. inside the event handler, aborting the update.

**Honest reachability.** reka's `SliderRoot` always emits an array in the paths inspected, so the `undefined` arm is a type-surface obligation rather than an observed one. Filed MINOR for that reason. **Falsifier:** *claim dies if the declared payload type is non-nullable.* It is not — the `| undefined` is explicit in the shipped `.d.ts`, twice (emit map and `onUpdate:modelValue`). The gap is that `v-model` on a `WritableComputedRef<number[]>` does not surface the mismatch to `vue-tsc`.

---

### C-17 · INFO — dead residue: a comment naming a variant that no longer exists, and five redundant casts

- `:315` — *"glass-scrubber per-instance retint hook"*: the variant was renamed to `standard` at glass-ui 4.0.0; the uncommitted fourier sweep updated `variant=` at `:170`/`:196` **and** the sibling comment at `:25`, **but not this one**. It is the 4th of 4 `glass-scrubber` occurrences in the file and the only prose one left standing — see C-1's diff for the sweep's exact reach, and for why this line is the visible tip of a live defect rather than a stray word.
- `:139,144,145,146,149` — five `key as string` casts. `basisDisplay` is `Record<string, …>` (`basis-display.ts:3`), so `v-for`'s `key` is already `string`. The casts are inert and mask any future re-typing of the map's key domain (e.g. to a `BasisKey` union, which is what `:53`, `:58`, `:69` all actually want).

---

## §3 — SUPERLATIVES (L-18 runs both ways; each carries its own falsifier)

**S-1 · The `aria-label` on `<Slider>` is *correct*, against a contract that is nowhere documented.** `:174`/`:201` put `aria-label` on the component root. The naïve expectation is that it lands on the root `<span>` and leaves the actual `role="slider"` thumb nameless. It does not: glass-ui's Slider explicitly forwards it — `dist/slider-DQ95MET2.js`, in the thumb `renderList`: `"aria-label": n.$attrs["aria-label"] ?? void 0`. **Falsifier:** *dies if the thumb receives no name.* The forward is literal in the shipped chunk, on the `SliderThumb` vnode. Falsifier fails — the consumption is right, and it is right about something the `.d.ts` does not mention.

**S-2 · The scalar↔array model bridge is the correct shape and is wave-cited.** `:25-35` — reka's Slider takes `number[]`; the parent owns scalars; the component bridges with paired writable computeds that clamp inside the setter, so the invariant is enforced at the single write point rather than sprinkled through handlers. The comment names the wave (`A.W2.c`) and the reason. **Falsifier:** *dies if a simpler adapter exists.* `defineModel` cannot change arity, and a `ref` + two watchers would reintroduce the mirror-desync class this file already suffers at `:37-39` (C-12). Falsifier fails. **This idiom is the file's own counter-example to C-12** — the right answer is present, 3 lines above the wrong one.

**S-3 · The scoped-CSS commentary is exemplary provenance discipline.** `:249-257` enumerates precisely what `<Button variant="outline" size="sm">` already ships (focus ring, press scale, pill shape, disabled geometry) and what the local layer adds and why (basis tint, 5.5 rem uniform width, 2 px border over the variant's 1 px, mobile compaction). `:315-317` does the same for the slider hook. Auditing this file was *faster* because of those comments — they are what made C-1 findable at all. **Falsifier:** *dies if the comments are wrong.* Spot-checked against `buttonVariants` and `ConfiguratorLayer.vue.d.ts`: the header-actions claim at `:121` is true, the variant-ships-focus-ring claim is true (`focus-ring` is in the `sliderVariants`/button base strings). Only the *token names* at `:315-323` went stale, and the prose is honest about what it was describing when written.

**S-4 · Complete cross-engine number-input de-chroming.** `:222` `-moz-appearance: textfield` plus `:229-233` `::-webkit-inner-spin-button` / `::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0 }` — both engine families, and the `margin: 0` that most implementations forget (WebKit reserves spin-button margin even at `appearance: none`). **Falsifier:** *dies if a third engine leaks a spinner.* Blink and WebKit share the `-webkit-` pseudo-elements; Gecko takes the `-moz-` arm. No fourth engine is in scope. Falsifier fails.

**S-5 · The mobile breakpoint retunes glyph *metrics*, not just spacing.** `:280-293` — under 639 px the pills drop to `px-2 gap-0.5` and `1.5px` borders, and the `ℱ` (U+2131) glyph gets its own `font-size: 1.75em` with re-derived negative margins, separate from the `Tₙ`/`Pₙ` glyphs at `1.25em`. Script-capital-F has a far larger optical body than a subscripted Latin capital; treating them identically is the default mistake, and this file does not make it. **Falsifier:** *dies if the two glyph classes have equal optical size.* `.basis-icon` `1.5em` vs `.basis-icon--fourier` `2.2em` at desktop (`:239` vs `:245`) — a deliberate 1.47× ratio maintained across the breakpoint. Falsifier fails.

**S-6 · A deliberate information hierarchy across sibling layers.** `:120` `<ConfiguratorLayer label="Decomposition" … :default-open="true">` against `ContourSettings.vue:190` `:default-open="false"`. The panel opens on the control the user came for and keeps the extraction knobs folded. **Falsifier:** *dies if the values are accidental (e.g. both defaulted).* `ConfiguratorLayer`'s own default is `defaultOpen: true` (d.ts `{ defaultOpen: boolean }` default), so `ContourSettings` had to write `false` **explicitly** — the divergence is authored, not inherited. Falsifier fails.

**S-7 (bounded) · The two `Tooltip` callsites carry real prose, not label echoes.** `:64` — *"Fourier series — click to cycle: epicycles → series → off"* — documents a three-state affordance that `aria-pressed` (binary) genuinely cannot express, and does so at the point of use. Bounded because the tooltip text is static across the three states while the cycle's *next* action changes; a state-aware string would be strictly better. Counted as commentary, not as one of the six.

---

## §4 — Corpus reconciliation

| corpus row | status here |
|---|---|
| **R3-7a** (lane-fourier-r3-r6.md:79, TRUE) — 35 Tooltip callsites / 9 consumers, BasisSelector **2**, → F.W3 | **CONFIRMED at HEAD** (`:124`, `:139`). **AMENDED** in C-5: the F.W3 target should be split — `text`-only callsites (both of BasisSelector's) go to `@mkbabb/glass-ui/icon-tooltip`, a one-word swap, not the decomposed triple. |
| **R6-8** (lane-fourier-r3-r6.md:142, TRUE + CARRY → F.W5) — operation↔client leaf non-isolability | **EXTENDED** in C-6: the dual failure. R6-8 = operation contaminated by client identity; C-6 = client contract with **no** derivation from the operation (six hand-copied literals, five divergent server windows). Same seam, opposite direction; one fix (generate client bounds from the operation model) closes both. |
| **lane-docs.md:400** — *"`cssVarToHex` … four regex arms … No `oklch()` arm"* | **FOLDED + ESCALATED to BLOCKER** (C-2): oklch is not an edge input, it is the **only** input for `--viz-fourier/chebyshev/legendre` at glass-ui 4.0.0 (`color-radius.css:263-265`, `dark-arm.css:113-115`, `light-dark.css:145-147`). |
| **lane-docs.md:474** — W.L5 item 2, delete `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba`, **NOT EXECUTED** | **Live consequence located** (C-2, C-7). BasisSelector needs no replacement parser — `var(--viz-fourier)` deletes the dependency outright (the `EditorControlsDock.vue:205,208` precedent). |
| **lane-frontend.md:382** — `BasisSelector.vue:315` glass-scrubber occurrence is **prose only** | **CONTRADICTED IN SCOPE** (C-1). The *string* is prose; the 4-declaration block it annotates (`:318-323`) is live CSS whose token family died in the same rename. The prose-only finding closed one line early. |
| **lane-frontend.md:480** — value.js peer floor, 5 sites, bare root specifier | **CONFIRMED**; BasisSelector contributes **0** (C-7) — and that zero is itself the finding. |
| **lane-frontend.md:480** — 35 `lucide-vue-next` sites → `@lucide/vue` at glass-ui 7 | **CONFIRMED**; BasisSelector`:9` is one, and is additionally mis-declared as a devDependency (C-9). |
| **CENSUS-2026-08-03:37-38** — pins value 0.13.0 / glass 4.0.0 / keyframes 4.3.0; value surface easing-only | **CONFIRMED** against `web/package.json` and `node_modules/@mkbabb/glass-ui/package.json` (`"version": "4.0.0"`). |
| **CENSUS-2026-08-03:109,184** — the atomic tri-package uplift F.W1 | **NEW INPUT**: C-1 is a *residue of the previous* uplift (3.1→4.0), not of the next. F.W1 must include a **token-family sweep**, not only a `variant=`/import sweep, or it will manufacture the same class of dead declaration again. The measurable acceptance is one line: `grep -rn -- "--slider-scrub-" web/src \| wc -l` → 0. |

---

## §5 — What F.W1 / F.W3 / F.W5 should take from this component

1. **Delete the 20 dead `--slider-scrub-*` declarations across 7 files** (C-1) and rename to the live `--slider-range-bg` / `--slider-thumb-bg` family. Add the grep above as an F.W1 gate. *This is the highest-value, lowest-risk item in the set.*
2. **Retire `cssVarToHex` at this component by not calling it** (C-2, C-7): `--track-color: var(--viz-fourier)` in the scoped rule. Deletes the `VIZ_COLORS` import from BasisSelector, is theme-reactive for free (killing C-4's reach here), and is immune to whatever colour space glass-ui ships next.
3. **Point `DEFAULTS` at `CONTOUR_DEFAULTS`** (C-3) and make the three props required (C-14) — together these delete five magic literals and the whole drift surface, following `ContourSettings.vue:62-76` exactly.
4. **Make `basisDisplay` a `computed`** or move `color` to `var(--viz-*)` (C-4).
5. **Split the 35-callsite Tooltip budget on the `text`-only predicate** before F.W3 budgets it (C-5).
6. **Generate the client's `min`/`max` from the operation models** in the F.W8/FN-6 conformance fixtures (C-6) — the constructive half of R6-8's lesson.

---

# §6 — SECOND-PASS ADDENDUM (independent re-audit, same axis, same served model)

An independent second pass was run over the same read-set. It **reproduced §§1–2 without contradiction** and adds six defect rows the first pass did not carry (C-18…C-23), one superlative (S-8), and two **executable receipts** that convert first-pass argument into measurement. Nothing above is retracted.

## §6.0 — Receipts (first-pass rows corroborated by measurement, not re-litigated)

**Receipt R-A — C-2/C-7: the pinned value.js parses exactly the inputs `cssVarToHex` cannot.**
`@mkbabb/value.js@0.13.0` from the installed tree (`web/node_modules/@mkbabb/value.js/dist/value.js`), `parseCSSValue`, executed:
```
"oklch(0.579 0.201 30.4)"
   → { colorSpace:"oklch", alpha:1, whitePoint:"D65", l:0.579, c:0.201, h:30.4 }
"light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))"
   → { name:"light-dark", values:[ {colorSpace:"oklch",…l:0.579…}, {colorSpace:"oklch",…l:0.693…} ] }
"hsl(35 76% 35%)"  → { colorSpace:"hsl", h:35, s:76, l:35 }
"#bf4040"          → { colorSpace:"rgb", r:191, g:64, b:64 }
```
All four parse, **including both forms `lib/colors.ts:22-53` falls through on**, and including the `light-dark()` wrapper as a structured `FunctionValue` with both arms typed. This upgrades C-7 from "value.js's domain, re-implemented" to "value.js's domain, re-implemented *worse*, measurably, against the exact token strings glass-ui 4.0.0 ships."
**Bound on the claim.** Only the **parse** leg is measured. `color2` conversion requires a `normalizeColor` step this pass did not establish, and the V·π parser-proof gate (`apotheosis/parser-proof/GATE-VERDICT.md`) records open questions on 0.13's oklch path — so **the conversion leg is UNPROVEN** and must be measured before F.W1 scopes a `colors.ts` replacement. This does not weaken §5 item 2, which is the *correct* fix precisely because it needs no parser at all.

**Receipt R-B — C-4: the module-eval snapshot, executed.**
Harness mirroring `colors.ts:77` + `basis-display.ts:3-7` + `App.vue:11` against the installed `vue`:
```
pill  (basisDisplay.fourier.color)   = #bf4040     ← module-eval copy, frozen
track (VIZ_COLORS.fourier in effect) = #888888     ← live proxy read in a render effect
DIVERGED: true
```
C-4's "two halves of one component read two different palettes" is now measured, not inferred.

## §6.1 — New defect rows

### C-18 · MAJOR — the basis pill row hand-rolls a toggle that glass-ui 4.0.0 **ships**: `ToggleChip` (and `ToggleGroup`), both exported at the pin, both imported zero times

`:140-150` composes `<Button variant="outline" size="sm">` + a manual `:aria-pressed` binding + **26 lines** of `[aria-pressed="true"]` retint (`:258-277`) + **14 lines** of mobile-compact overrides (`:280-293`).

The producer ships the primitive at the pinned version. Export map (`node_modules/@mkbabb/glass-ui/package.json`): `./toggle-chip`, `./toggle-group`; on disk `dist/toggle-chip.js`, `dist/toggle-group.js`, `dist/components/custom/toggle-chip/ToggleChip.vue.d.ts`, `dist/components/ui/toggle-group/{ToggleGroup,ToggleGroupItem}.vue.d.ts`. `ToggleChip`'s own docblock reads as a specification of what this file hand-rolls:

> *"ToggleChip — accessible toggleable 'chip' or 'cell' selector, built on reka-ui's Toggle root **so it carries proper `aria-pressed` and keyboard semantics**. Pair with `variant="chip"` for inline horizontal selectors … the `data-state="on"` attribute is set by the reka-ui Toggle root when pressed, **so selected styling hangs off the data attribute and doesn't need a class-binding at the call site**."*

That final sentence is `:144` (`:aria-pressed="isBasisActive(…)"`) and `:269` (`.basis-toggle[aria-pressed="true"]`), written by hand.

**Falsifier.** *Dies if neither subpath exists at 4.0.0, or if BasisSelector uses a capability the chip lacks.* Both `.js` and `.d.ts` artefacts are present in the installed tree; `grep -rn "toggle-chip\|toggle-group" web/src/` → **0 imports** repo-wide. The one capability the chip does not model is the tri-state Fourier cycle — which `aria-pressed` does not model either (C-23), so the chip is not *less* expressive than what ships. Falsifier fails.

**Corpus — extension, not contradiction.** lane-frontend.md §4 🟡 CANDIDATE SHADOWS carries `equation/NotationPills.vue` (47 LOC, *"currently 6× `Button`"*) → `./toggle-chip`. **BasisSelector is the second and larger instance of the identical shadow and the table does not carry it.** Add the row; the two together make the chip a ≥2-consumer migration rather than a one-off.

**Migration rider.** lane-frontend.md §5's measured export-map diff puts `./toggle-chip` in the **REMOVED-at-7.0.0** list (folded to `./chip`). If F.W1's tri-package uplift is in the same tranche, target `./chip` and pay the migration once — the same sequencing discipline C-1's §4 row demands.

---

### C-19 · MAJOR — the labeled-slider chassis is a fork of the project's **own** `SliderControl.vue`, already drifted in three axes

`:155-178` and `:182-205` reproduce, per slider, the label-row + inline numeric input + `<Slider variant="standard">` + `--track-color` host that `components/ui/SliderControl.vue` encapsulates and that the sibling `ContourSettings.vue` consumes **six times** (`:230,243,269,282,295`). The `.inline-number` block at `:212-233` is **byte-identical** to `SliderControl.vue:120-141`; `grep -rln "\.inline-number" web/src/` returns **exactly those two files**.

The fork has already drifted:

| axis | BasisSelector | SliderControl |
|---|---|---|
| range alpha | 30 % / 45 % (`:319-320`) | 25 % / 35 % (`:145-146`) |
| track height | *absent* | `--slider-scrub-track-height: 16px` (`:144`) |
| clamp helper | inline `Math.max/min`, ×4 sites | extracted `clamp()` with `Number.isFinite` guard (`:41-43`) |

So even after C-1's rename lands, **these two sliders would be a different height and a different tint strength from every other slider in the application** — C-1's repair does not converge them, because the divergence is in the consumer, not the token name.

**Corpus — agreement plus extension.** lane-frontend.md §4 rules the three `components/ui/` wrappers, `SliderControl` among them, *"thin API-shape adapters, not shadows … the correct posture — keep."* This pass agrees with that verdict and extends it: **the adapter is correct, and BasisSelector's refusal to consume it is the defect.** This is the same shape as C-11 strand 3 (the `.reset-icon-btn` duplication meeting glass-ui's own ≥2-consumer threshold), one layer up.

**Falsifier.** *Dies if `SliderControl` cannot render inside a `ConfiguratorRow`.* The plausible justification is that the row already supplies the label (`:154`, `:181`) so `SliderControl`'s own label would double. Real, but it does not force a fork: `label` is required (`SliderControl.vue:28`) and rendered in a single `<label>` element — a `labelHidden` prop or a slot is a two-line producer-side change against ~50 lines of consumer-side duplication. And `ConfiguratorRow`'s docblock names the intended payload: *"Slot consumes the actual control (Slider, Select, Switch, NumberField, etc.)"* — a control, not a re-rolled chassis. Falsifier fails.

---

### C-20 · MAJOR — the `[]` "Fourier off" state this component **deliberately mints** has no representation in the write contract, and the store silently rewrites it

`:103-104` — *"Go to 'off' — allow empty selection (canvas handles it gracefully)"* — then `:115` emits `[]`.

The operation surface forbids it on **both** write models:
- `api/models/visualization.py:184` — `VisualizationCreate.active_bases: list[str] = Field(min_length=1, max_length=16)`
- `api/models/visualization.py:279` — `VisualizationRemix.active_bases: list[str] | None = Field(default=None, min_length=1, max_length=16)`

The client does not surface the conflict — it **substitutes**:
```
stores/workspace.ts:351-353
    active_bases: animationSettings.value.active_bases?.length
        ? animationSettings.value.active_bases
        : ["fourier-epicycles"],
```
`stores/gallery.ts:250-251` carries the identical substitution on the draft/publish path, and the read side mirrors the erasure — `useWorkspaceLoader.ts:53` `if (as?.active_bases?.length)` skips restoration for `[]`.

**Failure scenario.** The user cycles Fourier to *off* (the third state the tooltip at `:64` advertises), saves, and the artefact persists as **epicycles**. Reload restores epicycles. The chosen state is destroyed with no toast, no disabled save, no 422 — the one failure mode with no diagnostic anywhere.

**Falsifier.** *Dies if the server accepts `[]`, which would make the substitution gratuitous rather than load-bearing.* `min_length=1` is present on both write models. Falsifier fails: the state genuinely has no representation, and the component invented it anyway.

**Relation to C-6.** C-6 found the client's *numeric* window unrelated to any operation model. C-20 is the same seam on the *enum/cardinality* axis, and it is worse in kind: C-6's divergence is a bound mismatch that would surface as a 422 at the boundary; C-20's is a state the client mints, the contract forbids, and a third component silently launders — so it surfaces as **nothing**. Both belong to the R6-8 carry (F.W5).

**Disposition — needs an owner ruling before code.** Either the contract admits the empty selection (`min_length=0` plus a documented "no basis rendered" semantic, which the canvas already handles per `:103`), or the component stops minting it. Silent rewriting on the write path is the one option that should not survive.

---

### C-21 · MAJOR — BasisSelector mints a basis vocabulary its own display module does not key; the normalisation is re-derived in five downstream consumers

BasisSelector **emits** `"fourier-epicycles"` / `"fourier-series"` / `"chebyshev"` / `"legendre"` (`:74`, `:101`, `:106`, `:112`, `:115`). `basis-display.ts:4-6` **keys** `fourier` / `chebyshev` / `legendre`. The bridge lives only inside BasisSelector (`:41-51`, `:53-56`, `:58-61`, `:98`) and is therefore re-written verbatim downstream:

| site | re-derived rule |
|---|---|
| `BasisCanvas.vue:250-252` | `basisKey.startsWith("fourier") ? "fourier" : basisKey` + `if (!cfg) continue` |
| `lib/canvas-drawing/labels.ts:29-35` | same normaliser **+** the Epicycles/Series label map |
| `gallery/GalleryCard.vue:39-46` | same normaliser **+** the same label map |
| `gallery/GalleryCardModal.vue:45` | same normaliser |
| `gallery/GalleryDraftsSection.vue:44` | `basisDisplay[key]?.label ?? b` |

`basis-display.ts` is **7 lines** and exports one object. It is the natural home for `normalizeBasisKey()` and `basisModeLabel()` and holds neither, so the producer of the vocabulary ships the mapping for itself alone.

The loose `Record<string, …>` typing (`basis-display.ts:3`) is what keeps the mismatch silent: `basisDisplay["fourier-epicycles"]` type-checks and returns `undefined`. **The `if (!cfg) continue` guards at `BasisCanvas.vue:252` and `labels.ts:31` are not defensive hygiene — they are load-bearing workarounds for the vocabulary gap**, and they are why C-17's five inert casts cannot simply be deleted: the key domain they mask is genuinely two domains.

**Falsifier.** *Dies if `basisDisplay` keys the emitted vocabulary.* It keys three names against an emitted set of four; five consumers independently bridge the gap. Falsifier fails.

**Sequencing note.** C-21 and C-17 are one change (`BasisKey` union + `satisfies` + two exported helpers in `basis-display.ts`), and that change also has to land *with* C-4's reactivity fix, since both rewrite the same 7-line module. Budget them as one unit.

---

### C-22 · MINOR — the two raw `<input type="number">` shadow glass-ui 4.0.0's `NumberField`, which is exported at the pin and imported zero times

`:157-166`, `:184-193`, plus the hand-rolled spinner de-chroming at `:222` and `:229-233` (which S-4 correctly credits as complete — the point here is that it should not have to exist). `./number-field` is exported at the pin: `dist/components/ui/number-field/index.d.ts` exports `NumberField`, `NumberFieldInput`, `NumberFieldIncrement`, `NumberFieldDecrement`, `NumberFieldContent`. `grep -rn "number-field" web/src/` → **0 imports**.

This is the **primitive-side root** of C-15's two behavioural bugs: reka's NumberField root owns commit-vs-input semantics (killing C-15 scenario A, clear-to-retype) and step snapping (killing C-15 scenario B, the off-grid value). C-15 describes the symptoms; C-22 names the shipped component whose absence causes them, and notes that S-4's careful cross-engine de-chroming is 6 lines of CSS the library would have supplied.

**Falsifier.** *Dies if `NumberField` cannot express the `[1,500]` / `[128,4096]` windows with an inline, chrome-free presentation.* `NumberFieldContent` + `NumberFieldInput` compose without the increment/decrement children, and reka's root takes `min`/`max`/`step`. Falsifier fails. **UNPROVEN-NEEDS-LIVE:** the exact rendered chrome at 4.0.0 was not visually verified.

---

### C-23 · MINOR — `aria-pressed` is the wrong ARIA state for the Fourier pill, which is a three-state cycle

`:144` binds `aria-pressed` from `isBasisActive` (`:53-55`), which returns `true` for **both** `fourier-epicycles` and `fourier-series` (`:42-44`). The control is a cycle (`:94-106`), not a toggle; `aria-pressed` has no third value beyond `mixed`, and `mixed` does not mean "a different mode."

This is the defect S-7 gestures at from the other side. S-7 credits the tooltip prose at `:64` for documenting a three-state affordance *"that `aria-pressed` (binary) genuinely cannot express"* — correct, and the second pass files the converse as a row: the prose is a workaround for a state model the markup gets wrong, and `TooltipContent` maps to `aria-describedby`, not to state, so assistive tech never receives the cycle semantics.

**Falsifier.** *Dies if the two pressed states are indistinguishable to AT.* They are distinguishable — the accessible **name** changes ("ℱ Epicycles" vs "ℱ Series", `:59` + `:47-51`) — which is exactly why this is MINOR and not MAJOR. Falsifier partially succeeds; the row survives at reduced severity because the distinction rides the name rather than the state, and the *next* action in the cycle is never announced.

**Fix rides C-18.** `ToggleGroup type="single"` with one value per mode expresses this natively (`data-state` per item, roving tabindex across the row) and deletes both the manual `aria-pressed` and the `[aria-pressed="true"]` selector block.

---

## §6.2 — New superlative

**S-8 · Every scalar that leaves this component is clamped at the boundary, on all four exits, in front of an endpoint that validates nothing.**
`:30` `Math.max(1, Math.min(500, arr[0] ?? 50))` · `:34` `Math.max(128, Math.min(4096, arr[0] ?? 1024))` · `:165` and `:192` the same windows on the keyboard path, each with a NaN fallback. The slider path and the typed path clamp **independently** — neither trusts the other.

This matters more than it reads, and C-6 is the reason. C-6 correctly indicts the *window* as invented and six-fold restated; the complementary fact is what sits downstream of it: `api/models/computation.py:43-45` declares `ComputeEpicyclesRequest { n_harmonics: int = 200; n_points: int = 1024 }` with **no `Field`, no bounds, no validator**, and `:48-52` the same for `ComputeBasesRequest`. **This component is the only thing standing between a hand-typed `-9e9` and an FFT call.** The window is the wrong window (C-6) and it is enforced with real discipline (S-8); F.W8's generated bounds should preserve the enforcement shape while fixing the numbers.

**Falsifier.** *Dies if any exit is unclamped.* Four emit sites, four clamps, four NaN fallbacks. Falsifier fails.

## §6.3 — Second-pass corpus reconciliation (additions to §4)

| corpus row | status |
|---|---|
| **lane-frontend.md §4 🟡** — `NotationPills.vue` (6× `Button`) → `./toggle-chip` | **EXTENDED** (C-18): BasisSelector is the second and larger instance of the same shadow; the table does not carry it. Makes the chip a ≥2-consumer migration. |
| **lane-frontend.md §4** — the three `components/ui/` wrappers are *"thin API-shape adapters … keep"* | **AGREED + EXTENDED** (C-19): the verdict on `SliderControl` is right; BasisSelector's refusal to *consume* it is the defect, and the fork has already drifted in three axes. |
| **lane-frontend.md §5** — `./toggle-chip` REMOVED at 7.0.0 → `./chip` | **NEW INPUT**: C-18's migration must target `./chip` if F.W1's tri-package uplift lands in the same tranche. |
| **R6-8** (lane-fourier-r3-r6.md:142) | **EXTENDED a second way** (C-20): C-6 is the seam failing on the numeric axis with a *loud* symptom (422 at the boundary); C-20 is the same seam failing on the cardinality axis with **no** symptom (silent laundering at `workspace.ts:351-353`). The silent one is the more dangerous carry for F.W5. |
| **CENSUS-2026-08-03:38** — value.js surface easing-only, 5 sites | **MEASURED** (Receipt R-A): the pinned 0.13.0 parses `oklch()` and `light-dark(oklch, oklch)` — the exact strings `cssVarToHex` fails on. The easing-only surface is not a scoping choice; it is a capability left on the floor. |

## §6.4 — Additions to §5 (what the waves should take)

7. **Fold the pill row onto `ToggleChip`/`ToggleGroup`** (C-18, targeting `./chip` if the 7.0.0 uplift is co-resident) — deletes ~46 lines of scoped CSS, the manual `aria-pressed`, and C-23 together.
8. **Consume `SliderControl` instead of re-forking it** (C-19); add `grep -rln "\.inline-number" web/src/ | wc -l` → 1 as the acceptance, mirroring C-1's grep gate.
9. **Rule on the empty basis selection** (C-20) before touching code — contract admits `[]`, or the component stops minting it. The silent substitution at `workspace.ts:351-353` / `gallery.ts:250-251` must not survive either ruling.
10. **Export `normalizeBasisKey()` + `basisModeLabel()` from `basis-display.ts`** (C-21) in the same edit as C-4's reactivity fix and C-17's key-domain typing — one 7-line module, three findings, one change.
