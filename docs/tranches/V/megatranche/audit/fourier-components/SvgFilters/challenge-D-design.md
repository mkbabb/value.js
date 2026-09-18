claude-opus-5[1m]

# CHALLENGE — `SvgFilters.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/decorative/SvgFilters.vue` (178 lines, read whole).
**Posture.** Assumed DEFECTIVE until the tree proves otherwise. It does not prove otherwise.
**Method.** Static + source-derived only. No browser tooling. Every live-render magnitude is marked `UNPROVEN-NEEDS-LIVE (SS-13)`; every *structural* claim is derived from bytes I read.
**Read-only closure.** Component; its two imports (`vue`, `@mkbabb/pencil-boil` → `node_modules/@mkbabb/pencil-boil/src/{vue,index,celestial,path,random}.ts`); its sole mount site `web/src/App.vue`; the two components its comments name as consumers (`layout/DarkModeToggle.vue`, `decorative/FourierMorphSvg.vue`, `layout/AppHeader.vue`, `paper/PaperView.vue`); `web/src/style.css`; `web/DESIGN.md`; installed producer `@mkbabb/glass-ui@4.0.0` (`dist/styles/{paper,cards,glass/grain-overlay}.css`, `dist/styles/tokens/{scale-paper,glass,dark-arm,offsets-sizing}.css`, `dist/components/custom/handmark/*`, `package.json` exports map); producer-latest `@mkbabb/glass-ui@7.0.0` source at `/Users/mkbabb/Programming/glass-ui` (`src/styles/paper.css`, `src/styles/glass/grain-overlay.css`, `src/styles/tokens/scale-paper.css`, `src/components/handmark/types.ts`, `package.json`).

**Tally — defects 21 (BLOCKER 3 · MAJOR 7 · MINOR 6 · INFO 5) · superlatives 7.**

---

## §0 · The headline

`SvgFilters.vue` is a 178-line **design declaration with zero design surface**. It authors four SVG filters, mounts them globally for the life of the session (`App.vue:22`), and drives two of them with a permanent `requestAnimationFrame` loop — and **not one of the four filter ids is referenced anywhere in the product**.

```
$ grep -rn "url(#" web/src/                                  → (empty)
$ grep -rn "title-boil|wobble-celestial|paper-grain|canvas-grain" web/src/ web/e2e/
  → 6 hits, ALL of them inside SvgFilters.vue itself (:26, :38, :69, :96, :122, :150)
```

Everything below is downstream of that. The component is not *under-designed*; it is **un-landed** — the aesthetic it declares (hand-drawn boil, paper tooth) never reaches a pixel. And the two idioms it hand-rolls are **both already shipping in the pinned producer** (`glass-ui@4.0.0`): the boil register as `@mkbabb/glass-ui/handmark` (`animation: "boil"`), the grain register as `@utility paper-grain-overlay` + `--paper-clean-texture` — the latter already consumed by this very app at `App.vue:24` (`class="… paper-texture …"`).

The uplift makes it worse, not better: **glass-ui 7.0.0 retired the procedural-`feTurbulence` paper path outright** after the owner rejected it twice, on the record, as *"disgusting metallic"* (`glass-ui@7 src/styles/paper.css:10-18`). `SvgFilters`' two grain filters are a verbatim instance of the retired recipe, including the named root cause (grey `saturate=0` tooth borrowing warmth from the substrate).

---

## §1 · Corpus fold (hitherto, per L-14)

**Adopted without re-derivation:**

| Corpus row | Fact folded |
|---|---|
| `formation/fourier/lane-frontend.md:178` | SvgFilters is 178 lines, global `<defs>`, `pencil-boil` `useLineBoil`. Confirmed byte-exact. |
| `lane-frontend.md:60` · `:481` | pencil-boil installed `0.4.1`, glass-ui 7 optional-peers `^0.11.2`, 7 minors behind; `SvgFilters.vue:3` is 1 of the 4 pencil-boil consumer sites. |
| `lane-frontend.md:41` | `App.vue` shell shape — `<SvgFilters/>` outside `TooltipProvider`. |
| `CENSUS-2026-08-03.md:100-105` · `:185` | The F.W1 break surface: `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` definition-absent (hard typecheck break), `lucide-vue-next → @lucide/vue` ×35, `pencil-boil 0.4.1 → ^0.11.2`. |
| `CENSUS-2026-08-03.md:218-221` | The tri-package atomic deadlock (glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0). |

**Intake lane** (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`, 38/52 TRUE): **no row touches `SvgFilters`, `components/decorative/`, motion a11y, or glass-ui design conformance.** I therefore have no row to cite as overlap. I *do* inherit two of its methods and say so:

- **R3-7a** (`"35 Tooltip callsites over nine consumers" — TRUE`, verified by live per-file sum) is the precedent for §0's callsite enumeration. Same method, opposite result: the live sum here is **0**.
- **R3-3**'s adopted evidence standard — *"a registry audit that re-hashes bytes but never re-derives products proves the bytes unchanged, not the summary true"* — is exactly D-10 below: `SvgFilters`' comments are a summary that no derivation supports.

**Contradiction of the corpus (explicit, per the law):**

> `lane-frontend.md:369` files `SvgFilters.vue (178)` under **"Bespoke with no glass-ui analogue"**.
>
> **CONTRADICTED.** Both of its registers have a first-class analogue in the *already-installed* `glass-ui@4.0.0`:
> - boil → `"./handmark"` in `node_modules/@mkbabb/glass-ui/package.json:415-418`; `HandAnimation = "none" | "draw-on" | "boil" | "draw-then-boil"` at `dist/components/custom/handmark/types.d.ts:17`; and `dist/handmark.js` imports **the same `useLineBoil` from `pencil-boil`** (`grep -o "useLineBoil|pencil-boil" dist/handmark.js` → both present).
> - grain → `@utility paper-grain-overlay` at `dist/styles/paper.css:29-46` and `@utility paper-underpaint` at `:12-22`, plus the `--paper-clean-texture` token at `dist/styles/tokens/scale-paper.css:80`.
>
> **Falsifier for my contradiction:** show that `./handmark` or `paper.css` is absent from the installed 4.0.0 tree, or that `HandMark`'s boil cannot express a displacement-style wobble. Neither holds — the exports map and the CSS are on disk at the paths above.

> `lane-frontend.md:616` credits `SvgFilters.vue:7-9,24,36` in the **`prefers-reduced-motion` coverage table** as a working JS gate.
>
> **PARTIALLY CONTRADICTED (misleading credit).** The gate exists and reads correctly *once*, but (a) it guards an animation with **no visual output at all** (§0), so the coverage is vacuous, and (b) it is **captured at setup and never re-read** (D-6). The coverage table should carry an asterisk on this row.

---

## §2 · DEFECTS

### D-1 · [BLOCKER] · The entire design intent is unrealized — four filters, zero consumers
`SvgFilters.vue:66-176` (all four `<filter>` blocks) · `App.vue:22`

Every `<filter>` in the file is dead. `grep -rn "url(#" web/src/` returns **nothing**; the only `filter:` declarations in the tree are four unrelated CSS `drop-shadow()`s (`ContourEditorCanvas.vue:319,328,329`; `AnimationControls.vue:186`; `AppHeader.vue:198,346`); the only `filter=` attributes are the `:tier-filter` / `:basis-filter` props at `GalleryView.vue:232-237`. The app's paper texture comes from a **different** mechanism entirely — the glass-ui `.paper-texture` class at `App.vue:24`.

On the design axis this is the whole finding: the file is the *stated* aesthetic (hand-drawn academic paper — boiled title, boiled celestial toggle, paper tooth, canvas tooth) and none of it is on screen. A design language that exists only in `<defs>` is not a design language.

**Falsifier.** Produce one element in `web/src/`, `web/index.html`, or any imported stylesheet that resolves `url(#title-boil)`, `url(#wobble-celestial)`, `url(#paper-grain)`, or `url(#canvas-grain)`. One such site kills this finding.

---

### D-2 · [BLOCKER] · glass-ui conformance — `paper-grain` re-implements an installed producer utility the app ALREADY consumes
`SvgFilters.vue:120-146` vs `glass-ui@4.0.0 dist/styles/paper.css:29-46` + `dist/styles/tokens/scale-paper.css:80` + `dist/styles/cards.css:10-19` · consumed at `App.vue:24`

The recipes are the same recipe. Producer, `paper.css:38` (URL-decoded):

```
feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'
  → feColorMatrix type='saturate' values='0'
  → feBlend mode='multiply' in2='SourceGraphic'
```

Local, `SvgFilters.vue:129-145`: `fractalNoise` / `0.65` / `4` / `stitch` → `saturate 0` → `feBlend multiply`. **Identical primitive chain, identical constants.** And the app is *already* wearing the producer's version: `App.vue:24` applies `paper-texture`, defined at `cards.css:10-19` over `--paper-clean-texture` (`scale-paper.css:80`) — the same turbulence baked into a 200 px data-URI tile.

This is a duplication **under the old pin**. It needs no uplift to cure; it needed only the A.W2 abrogation wave (`DESIGN.md:17-27`) to have swept `components/` as well as `styles/`.

Three things the producer's version has that the local one does not, each a design decision the local filter silently discards:
1. **attenuation** — `opacity: var(--glass-grain-opacity)` (`paper.css:42`), and `opacity='0.04'` baked into the token raster (`scale-paper.css:80`). See D-4.
2. **a dark arm** — `mix-blend-mode: soft-light` under `.dark` (`paper.css:47-51`); `background-blend-mode: screen` in the `.paper-texture` variant (`cards.css:17-19`). See D-5.
3. **a transparency a11y gate** — `@media (prefers-reduced-transparency: reduce) { opacity: 0 }` (`paper.css:55-58`).

**Falsifier.** Show a visual requirement the producer utility cannot express — e.g. a per-element filter chain that must run *inside* SVG user space rather than as a CSS background layer. `paper-grain`'s only named target is "static fractal noise overlay" (`:120`), which is precisely `paper-grain-overlay`'s job description.

---

### D-3 · [BLOCKER] · glass-ui conformance — the boil register is producer-owned; this is a consumer-level fork of it
`SvgFilters.vue:11-21, 66-118` vs `glass-ui@4.0.0 package.json:415-418` + `dist/components/custom/handmark/types.d.ts:17, 30-40` + `dist/handmark.js`

`glass-ui@4.0.0` ships `@mkbabb/glass-ui/handmark`: a hand-mark system with `animation: "boil" | "draw-then-boil"`, `boilFps` (default 8), `boilFrames` (default 3), a brush registry, seeded procedural geometry, and — decisively — **the same `useLineBoil` from `pencil-boil` under the hood**. `SvgFilters` imports that composable directly (`:3`) and re-derives the frame-cycling policy, the tempo, the amplitude table, and the DOM write path by hand (`:11-21, :23-55`).

Two consequences on this axis: (a) the app carries two boil vocabularies that can never agree (D-9); (b) the fourier "hand-drawn" register is invisible to the design system — `HandMark`'s brushes, seeds and `natural` morphology (`types.d.ts:44-56` in the 4.0.0 dist; `constants.d.ts` documents `UNDERLINE_GAP`, `HIGHLIGHT_RISE`, `PERIODS_MIN/MAX`) are the producer's *calibrated* answers to the same problem, and none of them apply here.

This survives the uplift: `./handmark` is still exported at `glass-ui@7.0.0 package.json:357`, and the boil defaults are unchanged (`src/components/handmark/types.ts:27-31, 55-58` — `boilFps` default 8, `boilFrames` default 3).

**Falsifier.** Show that `HandMark` cannot produce a full-glyph displacement wobble on arbitrary HTML text (it marks *around/over* text, it does not displacement-map it). If that holds, D-3 downgrades from BLOCKER to MAJOR — but the *grain* half (D-2) is untouched and the tempo divergence (D-9) still stands, because `boilFps: 8` is the house tempo regardless of the mark's shape.

---

### D-4 · [MAJOR] · Both grain filters apply the noise at **full amplitude** — no attenuation term anywhere
`SvgFilters.vue:129-145` and `:157-174`

The chain is `fractalNoise → saturate 0 → feBlend multiply(SourceGraphic, noise)` with **no `opacity`, no `feComponentTransfer`, no `feFlood`/`feComposite` alpha knob**. `feBlend mode="multiply"` composites at `cr = (1−qa)·cb + (1−qb)·ca + ca·cb`; `fractalNoise` emits all four channels — including alpha — as noise about 0.5. The producer never does this: it attenuates to `opacity='0.04'` in the token raster (`scale-paper.css:80`), to `var(--glass-grain-opacity)` in the utilities (`paper.css:20, 42`), and that token is **0.025 light** (`tokens/glass.css:190`) / **0.045 dark** (`tokens/dark-arm.css:202`). glass-ui 7 goes further and bakes the attenuation into the filter itself: `feFuncA type='linear' slope='0.42' intercept='0.12'` (`glass-ui@7 src/styles/paper.css:97`).

So the local filter over-applies the design system's calibrated grain by roughly **20–25×**. Applied to a text surface it would not read as tooth; it would read as a mid-grey wash over the type, and it would take the WCAG contrast of every glyph under it with it. Note the app already carries a hard-won contrast carry in this exact register — the `--viz-amber` light-mode darken at `style.css:113-127`, annotated *"fails WCAG AA for normal text"*. Wiring `paper-grain` would undo that class of work wholesale.

**Statically proven:** the absence of any attenuation term, and the producer's three independent attenuation precedents. **UNPROVEN-NEEDS-LIVE (SS-13):** the exact ΔL* / contrast-ratio drop on a rendered text block. Falsifier for the proven half: point to an attenuation primitive in `:129-174`. There is none. Falsifier for the live half: render `<p style="filter:url(#paper-grain)">` over `--background` and measure a contrast delta within 5 % of unfiltered.

Severity is MAJOR and not BLOCKER **only because D-1 makes it latent.** It becomes a BLOCKER on the first line that wires it.

---

### D-5 · [MAJOR] · No dark-mode arm — `multiply` is hardcoded on both grain filters
`SvgFilters.vue:144` and `:172`

`mode="multiply"` is a literal attribute; a filter cannot respond to `.dark`. The app is a first-class dual-theme surface (`index.html:22-32` pre-paint bootstrap; `useGlobalDark` at `DarkModeToggle.vue:18`; the `MutationObserver` re-resolve at `App.vue:11-17`). The producer inverts the blend in dark **in three separate places**, and its 7.0.0 source states the physics:

- `glass-ui@4 cards.css:17-19` — `.dark .paper-texture { background-blend-mode: screen; }`
- `glass-ui@4 paper.css:47-51` — `.dark .paper-grain-overlay::after { mix-blend-mode: soft-light; }`
- `glass-ui@7 src/styles/paper.css:120-123` — corrects that to `screen`, with the reason written down: *"NOT soft-light, which collapses to identity on the near-black pole — the self-cancelling defect."*

Multiply-on-dark darkens an already-dark plane: the grain becomes invisible *and* the surface loses luminance it cannot spare. The producer needed two iterations to get this right; `SvgFilters` has not had the first.

**Falsifier.** Show a `.dark`-scoped override, a `color-scheme` media query, or a runtime attribute write that changes `mode` on `:144`/`:172`. `grep -rn "mode=\|blend" web/src/components/decorative/SvgFilters.vue` returns only the two literals.

---

### D-6 · [MAJOR] · `prefers-reduced-motion` is read once at setup and never again — the a11y gate is non-reactive on both arms
`SvgFilters.vue:7-9`, used at `:24` and `:36` · `pencil-boil/src/vue.ts:91-94, 121-134, 141-144`

```ts
const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;   // :7-9 — a boolean, not a ref
```

No `addEventListener("change")`, no `useMediaQuery`. The second gate is no better: `useLineBoil`'s `start()` calls `prefersReducedMotion()` (`vue.ts:127`) inside a `watchEffect` whose only reactive dependency is `frameCount` (`vue.ts:141-144`) — and `frameCount` here is the **constant** `boilOffsets.length === 8` (`:20-21`). The effect therefore evaluates exactly once, at setup. Both gates latch.

Behaviourally: a user who enables *Reduce Motion* mid-session keeps the loop running; a user who turns it **off** never gets the motion until a full reload. `@vueuse/core ^14.3.0` is already a dependency (`package.json`) and ships `useMediaQuery`/`usePreferredReducedMotion` — the reactive form was one import away. Compare `style.css:92-96` and `DarkModeToggle.vue:104-108`, which use CSS `@media` and are reactive by construction.

**Falsifier.** Show a `change` listener on the media query list, or a reactive wrapper, in `SvgFilters.vue` or in `pencil-boil/src/vue.ts`. Neither file contains the string `addEventListener('change'` for the motion query (`vue.ts:73` listens for `visibilitychange` only).

---

### D-7 · [MAJOR] · A whole-session `requestAnimationFrame` loop that produces nothing
`SvgFilters.vue:20-21, 47-48` · `pencil-boil/src/vue.ts:29-70, 121-144`

Both subscribers `start()` once and **never `stop()`** (the `watchEffect` at `vue.ts:141-144` can only withdraw when `frameCount` drops to ≤ 1; it is the constant 8). `maybeStopScheduler()` (`vue.ts:59-69`) is therefore never reached with an empty active set, so the singleton scheduler (`vue.ts:34-56`) runs at display refresh — 60–120 Hz — for the entire life of the SPA, on every route, driving ≈ 13 `setAttribute` writes/second (`:32`, `:44`) into filters that no element references.

To the component's credit the producer composable pauses on tab-hide (`vue.ts:73-88`) — so this is a *visible-tab* cost, not a background one. It is still a permanent clock with zero design return, and it sits badly beside the hygiene the lane already banked for this app: *"Off-screen rAF gating with reference counting (`stores/animation.ts:41-53, 95-103`)"* (`lane-frontend.md`, §8 "Motion / a11y hygiene already banked"). The one rAF that is never gated by route, viewport, or reference count is the one that draws nothing.

**Falsifier.** Show that the scheduler disarms while `<SvgFilters/>` is mounted and the tab is visible — i.e. a code path where `sub.active` goes false. `vue.ts:129-134` sets it true; only `stop()` (`vue.ts:136-140`) clears it; its callers are the `else` branch of the constant-valued `watchEffect` and `onUnmounted`. `SvgFilters` unmounts only when the app does.

---

### D-8 · [MAJOR] · Aristotelian proportion — relative region, absolute amplitude; the boil filters cannot be right for two targets at once
`SvgFilters.vue:70-74` (`filterUnits="objectBoundingBox"`, x/y/w/h in %) with the default `primitiveUnits="userSpaceOnUse"` · `:79, :87` · `:106, :114`

The filter **region** is expressed as a fraction of the element box (−5 % … +105 %, symmetric — see S-6). The filter **primitives** are not: `baseFrequency` and `feDisplacementMap/@scale` are in user-space units because `primitiveUnits` is left at its default. A single `scale="3"` is thus a fixed ±1.5 px (displacement range is ±scale/2) regardless of whether the target is 20 px tall or 120 px tall. That is the classical proportion error: one term scales with the subject, the other does not.

Worked against the two candidate targets the comments name:

| Target | Box (derived) | 5 % bleed | ±scale/2 | Verdict |
|---|---|---|---|---|
| Paper `h1` (`PaperView.vue:353-357`, `text-4xl` → `md:text-[3.25rem]`, `leading-[1.15]`, two lines via `<br/>`) | ≈ 52 px × 1.15 × 2 ≈ 120 px tall | ≈ 6.0 px | 1.5 px | region fine — but see the frequency row below |
| Masthead `.logo-mark` (`AppHeader.vue:225-227` mobile `text-2xl`, `:246-248` ≥ 640 px `text-xl`; root sizing `style.css:40-50`, 1.125 rem → 1 rem @ 768 px) | ≥ 768 px: 1.25 rem/1.4 → **28 px** line box | **1.4 px** | 1.5 px | **displacement exceeds the bleed — extremities clip at the region edge** |

And the frequency is wrong for *both*. `baseFrequency="0.015"` (`:79`) is 0.015 cycles per user unit → a turbulence feature size of **1/0.015 ≈ 67 px**, which is *larger than the 52 px cap-box of the heading it names*. Under one wavelength of noise a displacement map does not wobble a stroke; it **translates the whole word coherently**. The stated intent at `:67` is "animated wobble"; the constant delivers a slow drift. The producer's own grain sits at `0.65` → ≈ 1.5 px features (`paper.css:8`), three orders of magnitude closer to stroke scale.

`wobble-celestial` inherits the same ambiguity with an extra twist: at `baseFrequency="0.02"` → 50 user units, the result depends entirely on **where** it attaches, and the component says nothing. On the HTML `<button class="sun-moon-toggle">` (`DarkModeToggle.vue:2-13`, sized 2.5 rem/2.75 rem by `AppHeader.vue:241-243, 255-257`) the 50 px feature exceeds the 40–44 px button → coherent drift again. On the inner `<svg viewBox="0 0 200 200">` (`FourierMorphSvg.vue:2-16`) user units are viewBox units → 50/200 = four lobes across the mark and a ±2-unit displacement against a 14-unit stroke ≈ 14 % — which is a *good* wobble. **The same constants are right under one attachment and wrong under the other, and the component ships no attachment contract.** That ambiguity is the defect.

**Falsifier.** Set `primitiveUnits="objectBoundingBox"` and the proportion complaint evaporates (amplitudes become bbox-relative). Or: name a single, sized, documented target for each boil filter — then the constants can be judged. Neither exists today. **UNPROVEN-NEEDS-LIVE (SS-13):** the rendered legibility of Computer Modern Serif hairlines (`style.css:13-15`, `--font-sans: "Computer Modern Serif"`) under a ±1.5 px displacement — CM's hairline at 52 px is on the order of 1.4 px, so the displacement is ≈ 1× the hairline width and stroke fragmentation is expected, but the exact break-up needs a render.

---

### D-9 · [MAJOR] · Motion-system divergence — two bespoke tempos, 10 ms apart, neither the house tempo
`SvgFilters.vue:11, 15, 20-21`

```ts
const { currentFrame: boilFrame }   = useLineBoil(boilOffsets.length, 150);   // 8 frames @ 6.67 fps
const { currentFrame: wobbleFrame } = useLineBoil(wobbleOffsets.length, 160); // 8 frames @ 6.25 fps
```

The house tempo is **8 fps / 125 ms / 3 frames**, stated twice: `useLineBoil`'s own signature default `(frameCount = 4, intervalMs = 125)` (`pencil-boil/src/vue.ts:105-108`) and `HandMarkProps.boilFps` *"default 8 (≈125ms)"* / `boilFrames` *"default 3"* (`glass-ui@4 dist/components/custom/handmark/types.d.ts:37-40`; unchanged at `glass-ui@7 src/components/handmark/types.ts:55-58`). `SvgFilters` picks neither, twice, and picks values 10 ms apart — a 0.42 fps difference with no perceptual payload, but enough that the two marks beat against each other on a 19.2 s composite period (1200 ms and 1280 ms cycles, LCM 19 200 ms). Two marks in the same hand-drawn register should share one tempo or differ *legibly*; this does neither.

The 8-frame tables (`:12, :16`) likewise nearly triple the producer's 3-frame default, which is the calibrated answer to "how many distinct frames before a boil reads as noise rather than as a hand".

**Falsifier.** Produce a design note — in `DESIGN.md`, a comment, or a coordination letter — that justifies 150/160 ms over 125 ms and 8 frames over 3. `DESIGN.md` is 33 lines and never mentions boil (D-21); the only in-file rationale is the two comments at `:11` and `:15`, which restate the numbers rather than justify them.

---

### D-10 · [MAJOR] · Prose — three of four filter comments assert consumers that do not exist
`SvgFilters.vue:67`, `:93-94`, `:148`

| Comment | Claim | Tree |
|---|---|---|
| `:67` | *"animated wobble displacement for **main heading**"* | `PaperView.vue:353-357` (the `<h1>`) carries `class="cm-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.25rem] leading-[1.15]"` — **no `filter`, no `style`**. `AppHeader.vue:67`'s `.logo-mark` likewise. |
| `:93-94` | *"boil effect for **dark mode toggle (sun/moon)**"* | `DarkModeToggle.vue:1-14` renders `<button class="sun-moon-toggle"><FourierMorphSvg …/></button>`; `FourierMorphSvg.vue:1-17` renders one `<path>`. **Neither applies a filter** (`grep -n "filter" DarkModeToggle.vue FourierMorphSvg.vue` → no match). |
| `:148` | *"Gentle static grain for **canvas/visualization area**"* | No canvas or visualization component references `canvas-grain`. |

The fourth (`:120`, "static fractal noise overlay") is honest only because it names no consumer.

These comments are the component's **entire specification** — `DESIGN.md` is silent (D-21) and no test asserts anything (D-15). Per the R3-3 standard folded in §1, a summary with no derivation is not a truth. Here it is worse: it is an *authoritative-sounding* description of behaviour the reader will believe, and a future maintainer who deletes the filters will be told by the comments that they are load-bearing.

**Falsifier.** Any of the three named consumers acquiring a `filter="url(#…)"` / `style="filter:url(#…)"` attribute. Grep is empty across `web/src/`.

---

### D-11 · [MINOR] · The wobble amplitude series breaks its own pattern at index 7
`SvgFilters.vue:12` vs `:16`

```
boilOffsets   = [0,  0.002, -0.001,  0.003, -0.002,  0.001, -0.003,  0.001]
wobbleOffsets = [0,  0.003, -0.002,  0.004, -0.003,  0.002, -0.004,  0.001]
                     +.001   −.001   +.001   −.001   +.001   −.001    0  ←
```

`wobbleOffsets` is `boilOffsets` with the magnitude increased by exactly 0.001 on **every** element — except the last, left at `0.001` where the series requires `0.002`. Consequence: both series otherwise hold a clean ±20 % modulation of their base (`0.003/0.015` and `0.004/0.02`), but frame 7 modulates `+6.7 %` for the title and only `+5.0 %` for the celestial — an off-pattern frame in an 8-frame loop that repeats every 1.28 s. A hand-drawn boil lives or dies on the *evenness* of its irregularity; one short frame per cycle reads as a stutter, not as a hand.

**Falsifier.** Show that index 7 is deliberately damped — e.g. a documented "settle" frame. No comment says so; `:15` describes the array only as "Wobble-celestial config".

---

### D-12 · [MINOR] · Three dead `result` attributes and an asymmetry between two parallel filters
`SvgFilters.vue:134`, `:162`, `:173`; compare `:141-145` with `:169-174`

- `result="grain"` (`:134`, `:162`) is consumed by nothing: the following `feColorMatrix` has no `in`, so per SVG it implicitly takes the previous primitive's result. Two dead labels.
- `result="grained"` (`:173`) sits on the **last** primitive of `canvas-grain` — a `result` on a terminal primitive is inert by definition.
- Its structural twin, `paper-grain`'s terminal `feBlend` (`:141-145`), correctly omits `result`. Two filters authored as a matched pair now differ in a way that carries no meaning, which is exactly how a reader is taught that the difference *does* carry meaning.

**Falsifier.** Show a primitive with `in="grain"` or `in="grained"` anywhere in `:120-175`. There is none.

---

### D-13 · [MINOR] · Two grain filters, two texture scales, one design system that has one
`SvgFilters.vue:131-132` (`baseFrequency 0.65`, `numOctaves 4`) vs `:159-160` (`baseFrequency 0.8`, `numOctaves 3`)

The design system defines exactly **one** grain frequency, 0.65 / 4 octaves, and says so in prose: *"Texture: feTurbulence baseFrequency 0.65, 4 octaves"* (`glass-ui@4 paper.css:8`), realised identically in the `--paper-clean-texture` token (`scale-paper.css:80`) and both utilities. `canvas-grain` introduces a second scale — ≈ 1.25 px features against the register's 1.54 px — and drops an octave, with no token to name it and no note to justify it. A second texture scale is a second material; materials are the part of a design language you are least allowed to add casually.

**Falsifier.** A token, `DESIGN.md` row, or comment naming a distinct "canvas" texture register. `:148` says only "Gentle static grain" — and *gentler* would mean lower amplitude, not higher frequency; 0.8 makes the tooth **finer**, not gentler, and (per D-4) the amplitude is identical because neither filter attenuates.

---

### D-14 · [MINOR] · Un-namespaced global filter ids in a document that already carries producer filter ids
`SvgFilters.vue:69, 96, 122, 150`

`title-boil`, `wobble-celestial`, `paper-grain`, `canvas-grain` are generic, document-global identifiers. The same document already resolves producer-authored filter ids inside data-URI SVGs (`id='n'` in `glass-ui@4 paper.css:18, 38` and `scale-paper.css:80`; `id='glass-refract'` in `glass-refract.css:46`) — those are sandboxed inside their own data-URI documents today, but the collision surface is a naming convention away. More concretely: a second `<SvgFilters/>` mount (a stray instance, or a Vite HMR duplicate during development) silently duplicates all four ids; `url(#…)` and `querySelector` both resolve to the first match, so the *live* filters and the *animated* filters could diverge with no error.

**Falsifier.** Show a scoping mechanism — a generated id prefix, a `useId()`, a shadow root. There is none; the ids are literals.

---

### D-15 · [MINOR] · Silent-failure state coverage — no empty/error surface, no dev warning, no test
`SvgFilters.vue:28, 40` · `web/e2e/` (8 specs)

Both animators early-return on a null `querySelector` (`:28`, `:40`) with no `console.warn`, no `import.meta.env.DEV` assertion, no thrown error. Rename a filter id and the boil becomes a no-op that nothing reports. The state-coverage question the axis asks (empty / error / loading) has one honest answer here: **the component's only reachable state is the failure state, and it is indistinguishable from success.**

Nor does any gate catch it: `grep -rn "boil|grain|SvgFilters" web/e2e/` → empty across all eight specs including `visual-baseline.spec.ts`. `lane-frontend.md` §9 row 11 already records that vitest is absent, so the 8 Playwright specs are the whole net — and they do not cover this file.

**Falsifier.** A dev-mode assertion, or an e2e/visual assertion naming any of the four ids.

---

### D-16 · [INFO] · `applyBoilFrame` and `applyWobbleFrame` are the same twenty lines twice
`SvgFilters.vue:23-33` and `:35-45`

Byte-identical modulo three identifiers (`#title-boil`/`#wobble-celestial`, `boilOffsets`/`wobbleOffsets`, `baseFreq`/`wobbleBaseFreq`). One `applyFrame(selector, offsets, base)` covers both — or, per D-3, neither survives.

**Falsifier.** A behavioural difference between the two bodies. Diff them; there is none.

---

### D-17 · [INFO] · The mount-time initial apply writes values already present in the markup
`SvgFilters.vue:50-55`

`boilFrame.value` is 0 at mount, so `boilOffsets[0] = 0` and the write is `baseFrequency = 0.015` — byte-identical to the static attribute at `:79`. Likewise `0.02` vs `:106`. The `onMounted` + `requestAnimationFrame` round-trip performs two no-op DOM writes one frame after mount.

**Falsifier.** Show `currentFrame` non-zero at mount. `pencil-boil/src/vue.ts:110` initialises `ref(0)`, and the scheduler cannot advance it before the first rAF.

---

### D-18 · [INFO] · Redundant modulo
`SvgFilters.vue:30, 42`

`frame % boilOffsets.length` re-applies a modulo the producer already performed against the identical `frameCount`: `sub.currentFrame.value = (sub.currentFrame.value + steps) % frameTotal` (`pencil-boil/src/vue.ts:49`), where `frameTotal = getFrameCount() = boilOffsets.length`. Defensive, harmless, and a small false signal that `currentFrame` may exceed range.

**Falsifier.** A path where `currentFrame ≥ frameCount` reaches the watcher. `vue.ts:42` clamps it on every tick.

---

### D-19 · [INFO] · Authoring inconsistency across the four filters
`SvgFilters.vue:70, 97` vs `:121-128, :149-156`; `:82, :109`; `:59-65` vs `FourierMorphSvg.vue:2-4`

`filterUnits="objectBoundingBox"` is stated explicitly on the two boil filters where it is already the SVG default, and **omitted** on the two grain filters — inviting the reader to infer a difference that does not exist. `stitchTiles="noStitch"` (`:82`, `:109`) likewise restates a default. And the sibling decorative component declares `xmlns="http://www.w3.org/2000/svg"` (`FourierMorphSvg.vue:4`) where this one does not (`:59-65`) — harmless under Vue's namespace handling, but two conventions in a two-file directory.

**Falsifier.** A spec citation where `filterUnits` or `stitchTiles` defaults differ from the values written. SVG 1.1 §15 gives `objectBoundingBox` and `noStitch`.

---

### D-20 · [INFO] · Altitude — a component that renders nothing, wearing a component's clothes
`SvgFilters.vue:58-178` · `App.vue:7, 22`

The file's whole payload is (a) a static `<defs>` block and (b) two timers. As an SFC it costs a component instance, a render function, a template ref and two watchers to emit zero visible DOM, and it obliges `App.vue` to remember to mount it in the right place. The same payload is a composable plus a `<defs>` island in `index.html`, or — per D-2/D-3 — nothing at all.

**Falsifier.** A requirement that the defs be reactive to component state. They are not: the four filters are literal and only two attributes are ever written.

---

### D-21 · [MINOR] · The design language of record does not know this file exists
`web/DESIGN.md` (33 lines, read whole)

`DESIGN.md` — *"Fourier Analysis Design Language"*, explicitly *"Extends glass-ui DESIGN.md"* (`:1-3`) — documents token overrides (`:5-13`), local utilities (`:15-27`) and migration tasks (`:29-33`). It never mentions boil, grain, texture, filters, or `SvgFilters`. The register with the strongest identity claim in the app ("hand-drawn academic paper") is the one register the design document omits.

Worse, `:17-27` records the **A.W2 abrogation wave**, whose entire thesis is *"The former local utilities have been migrated to their idiomatic glass-ui primitives"* — `.btn-icon-admin` → `<Button variant="glass">`, `.basis-pill` → `<Button>`/`<Badge>`, `.styled-slider` → `<Slider variant="glass-scrubber">`. `SvgFilters` is the same species of artifact (a local re-implementation of a producer primitive) and the wave missed it because the wave swept `web/src/styles/` and this one lives in `web/src/components/`.

**Falsifier.** A design-document row, coordination letter, or ADR that sanctions a fourier-local filter register. `grep -rn -i "boil|grain|SvgFilters|texture" web/DESIGN.md` → empty.

---

## §3 · The uplift ledger (glass ^4.0.0 pinned · producer latest 7.0.0)

**Break surface, per the census** (`CENSUS-2026-08-03.md:100-105`): `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` (hard typecheck break), `lucide-vue-next → @lucide/vue` ×35, `pencil-boil 0.4.1 → ^0.11.2`.

**`SvgFilters` sits OFF that surface.** It imports zero glass-ui subpaths (`:2-3` — `vue` and `@mkbabb/pencil-boil` only). Its exposure is exactly one row of the census list, and two rows the census does not carry:

| # | Surface | Effect of F.W1 | Provenance |
|---|---|---|---|
| **U-1** | `pencil-boil 0.4.1 → ^0.11.2` (glass-ui 7 optional-peer) | **RISK.** `SvgFilters.vue:3` is one of the four consumer sites (`lane-frontend.md:481`); seven minors of drift in `useLineBoil`'s scheduler contract are unaudited here. Cheap to de-risk: if D-3 is executed, this site disappears. | census `:105`; `lane-frontend.md:60, 481` |
| **U-2** | **`.paper-texture` is REMOVED at 7.0.0** — *not in the census break surface* | **BREAK, new row.** `App.vue:24` applies `class="… paper-texture …"`. In 4.0.0 the class is defined at `dist/styles/cards.css:10-19`. In producer 7.0.0 **`src/styles/cards.css` does not exist** and no `.paper-texture` / `@utility paper-texture` declaration survives anywhere in `src/styles/` — only the tokens `--paper-clean-texture` (`tokens/scale-paper.css:118`) and `--paper-texture-size` (`tokens/offsets.css:91`), plus a comment at `scale-paper.css:114` that refers to `.paper-texture` as a *"downstream consumer"*. The 7.0.0 seat is `@utility paper-grain-overlay` / `paper-underpaint` (`src/styles/paper.css:100, 125`) or the `glass-*::after` grain (`src/styles/glass/grain-overlay.css:35-57`). **Silent break — CSS, so no typecheck catches it; the app's paper texture simply stops painting.** | `glass-ui@7 src/styles/`; census break list omits it |
| **U-3** | The `feTurbulence` paper idiom is **RETIRED as primary at 7.0.0** | **IMPROVEMENT that condemns D-2/D-4/D-5.** `glass-ui@7 src/styles/paper.css:1-38` records: the SVG-noise path was built three times and *"the user rejected the SVG-noise path TWICE ('disgusting metallic')"*; root cause D-2 is *"the grey `saturate=0` tooth borrowed ALL its warmth from the substrate"*. The fix is a warm raster tooth (`--paper-grain-tooth`); `feTurbulence` is demoted to `--paper-grain-relief`, **default `none`**, warm-duotoned through `feComponentTransfer` and alpha-attenuated (`slope='0.42' intercept='0.12'`, `:97`). `SvgFilters:129-145` and `:157-174` are grey `saturate=0` turbulence with no warmth and no attenuation — the exact recipe, with the exact named defect, that the producer retired after two owner rejections. | `glass-ui@7 src/styles/paper.css:1-38, 95-97` |
| **U-4** | `./handmark` | **UNCHANGED — the standing cure for D-3.** Exported at `glass-ui@4 package.json:415` and `glass-ui@7 package.json:357`; `boilFps` default 8 / `boilFrames` default 3 identical across both (`4 dist/…/types.d.ts:37-40`; `7 src/components/handmark/types.ts:55-58`). The uplift neither breaks nor blocks the migration. | both package.jsons + both `types` |
| **U-5** | `--glass-grain-opacity` | **CARRIES.** 0.025 light (`4 tokens/glass.css:190`) / 0.045 dark (`4 tokens/dark-arm.css:202`); 7.0.0 reads it through `var(--paper-grain-opacity, var(--glass-grain-opacity))` (`7 paper.css:114, 143`). The attenuation D-4 lacks is available on both sides of the uplift. | as cited |

**Recommendation implied by the ledger (not a directive — an audit conclusion):** `SvgFilters.vue` should be **deleted**, not uplifted. Every one of its four filters is either dead (D-1), duplicated by an installed producer utility (D-2), owned by a producer component (D-3), or an instance of an idiom the producer has since retired on the owner's own ruling (U-3). Deleting it also discharges U-1 (one of four pencil-boil sites), D-6, D-7, D-9, D-14, D-15, D-16, D-20 outright. **U-2 is independent of that decision and must be cured on its own** — it is a live, silent, uncatalogued F.W1 break at `App.vue:24`.

---

## §4 · SUPERLATIVES (L-18 runs both ways — each with its falsifier)

**S-1 · `color-interpolation-filters="sRGB"` on all four filters** — `:75, :102, :127, :155`.
The CSS/SVG default is `linearRGB`, which would wash the grain and lighten the displaced source unpredictably. All four filters override it, consistently. The producer makes the same call and only states it explicitly in its 7.0.0 relief (`glass-ui@7 paper.css:97`, `color-interpolation-filters='sRGB'`) — 4.0.0's `paper.css` data-URIs **omit it**. On this one point the local file is *more* disciplined than the pinned producer.
*Falsifier:* find one of the four missing the attribute, or an argument that linearRGB is the intended space. Neither holds.

**S-2 · The defs host is correctly inert** — `:59-65`: `width="0" height="0"`, `position: absolute`, `pointer-events: none`, `aria-hidden="true"`.
That is the full four-part hardening for a non-visual defs carrier: zero layout contribution, out of flow, out of hit-testing, out of the accessibility tree. Many implementations get two of the four.
*Falsifier:* show a layout, hit-test, or screen-reader consequence of the mounted `<svg>`. With zero intrinsic size, out-of-flow positioning, and `aria-hidden`, there is none.

**S-3 · Frequency quantisation before the attribute write** — `:31, :43`: `Math.round((base + offset) * 10000) / 10000`.
`0.015 + 0.002` in IEEE-754 is `0.017000000000000001`; unquantised, the DOM would carry a 19-significant-digit attribute that churns on every write. The round pins it to 4 dp — the resolution the offset table actually uses.
*Falsifier:* show that every one of the 16 base+offset sums is already exact in binary floating point. It is not — the example above is the first one.

**S-4 · The lookup is scoped to the component's own root, not to `document`** — `:25-27, :37-39`: `svgRef.value.querySelector("#title-boil feTurbulence")`.
Under the duplicate-id hazard of D-14 (HMR, stray second mount) this is the resilient form: each instance animates *its own* defs rather than racing for the first document-wide match.
*Falsifier:* a case where `document.querySelector` would be correct and the scoped form wrong. None — the defs are always inside `svgRef`.

**S-5 · SSR-safe preference read** — `:8`: `typeof window !== "undefined" && …`.
Correct-by-construction for a value computed in `<script setup>` body rather than in `onMounted`, and it mirrors the guard the producer composable uses (`pencil-boil/src/vue.ts:92, 74`). Belt-and-braces for a Vite SPA, but free.
*Falsifier:* show the guard is load-bearing nowhere and the expression could not run outside a browser. The guard is cheap insurance; the claim here is hygiene, not necessity.

**S-6 · The filter regions are symmetric** — `:71-74` (`x=-5%`, `width=110%` → −5 % … +105 %) and `:98-101` (`−10 %` … `+110 %`).
The common authoring error is `x="-5%" width="105%"`, which bleeds on one side and clips on the other; both filters here get the arithmetic right, on both axes.
*Falsifier:* recompute — `-5 + 110 = 105` and `-10 + 120 = 110`. Symmetric.

**S-7 · The frame clock is the shared producer scheduler, not a local `setInterval`** — `:19-21` and the comment that records the migration.
`useLineBoil` coalesces both loops onto **one** rAF (`pencil-boil/src/vue.ts:29-70`) and pauses on `visibilitychange` (`:73-88`) — strictly better than two drifting `setInterval`s that keep ticking in a hidden tab. The *mechanism* choice is right even though (D-7) the mechanism serves nothing.
*Falsifier:* show two independent rAF loops or a surviving `setInterval` in the boil path. `grep -n "setInterval" SvgFilters.vue pencil-boil/src/vue.ts` → no match; `requestAnimationFrame` appears once in the scheduler (`vue.ts:55`) plus the one-shot at `SvgFilters.vue:51`.

---

## §5 · Falsifier summary (the single kill-shots)

| ID | Sev | Kill it by showing… |
|---|---|---|
| D-1 | BLOCKER | any `url(#title-boil\|#wobble-celestial\|#paper-grain\|#canvas-grain)` in the tree |
| D-2 | BLOCKER | a requirement `@utility paper-grain-overlay` / `--paper-clean-texture` cannot express |
| D-3 | BLOCKER | `HandMark` cannot express a full-glyph displacement wobble (→ downgrades to MAJOR; grain half unaffected) |
| D-4 | MAJOR | an attenuation primitive in `:129-174` |
| D-5 | MAJOR | any `.dark`-scoped override of `mode` on `:144`/`:172` |
| D-6 | MAJOR | a `change` listener on the reduced-motion query in either file |
| D-7 | MAJOR | a path where `sub.active` goes false while mounted + visible |
| D-8 | MAJOR | `primitiveUnits="objectBoundingBox"`, or one documented sized target per boil filter |
| D-9 | MAJOR | a written rationale for 150/160 ms × 8 frames over the house 125 ms × 3 |
| D-10 | MAJOR | any of the three named consumers acquiring the filter |
| D-11 | MINOR | a documented damped frame at index 7 |
| D-12 | MINOR | a primitive with `in="grain"` or `in="grained"` |
| D-13 | MINOR | a token or note naming a distinct canvas texture register |
| D-14 | MINOR | an id-scoping mechanism |
| D-15 | MINOR | a dev assertion or an e2e/visual assertion on any filter id |
| D-16..D-20 | INFO | as stated inline |
| D-21 | MINOR | a design-doc row sanctioning a fourier-local filter register |
| U-2 | (uplift) | a `.paper-texture` declaration surviving in `glass-ui@7.0.0 src/styles/` |
