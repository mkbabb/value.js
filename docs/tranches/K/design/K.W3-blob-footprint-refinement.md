> **Mode: planning-only. NO code.** Authored 2026-06-04 from the visual-grounded audit (2 serial 6-agent workflows over the 84-capture screenshot session). Visual evidence: `../audit/visual-evidence-2026-06-04/DELTA.md`. Synthesis: `../audit/path-forward-2026-06-03-postW2.md §9`.

# K.W3 — glass-ui-first consummation (blob-lift refinement: the footprint/anchor contract)

# K.W3 blob-lift — REFINED with the C3 pixel evidence (the footprint/anchor contract)

> **Mode: TRANCHE DEVELOPMENT (planning only). NO code.** This refines
> `docs/tranches/K/design/K.W3-respec-glassui-first-consummation.md §3.1` (the
> goo-blob lift) with the 84-capture visual evidence at
> `docs/tranches/K/audit/visual-evidence-2026-06-04/`. The lift inventory,
> two-phase W3a/W3b shape, dist-consumption mandate, and all other §s of the
> K.W3 re-spec STAND unchanged; this document sharpens **only** the
> footprint/sizing/anchoring contract of the Metaballs primitive (the §3.1
> "footprint==resolution" row + the W3-1/W3-2 gate) and the OKLCh shader D1,
> because the captures made the real C3 defect legible in pixels.

---

## §0 — What the pixels actually show (the C3 verdict, grounded per-file)

The doc-era C3 fear was a "0×0 satellite". **The captures REFUTE that** (the satellite is plainly visible — `picker-375-dark.png` shows a white-haloed companion sphere lower-left of the body) and **REVEAL the true defect: the blob FOOTPRINT is uncontained and viewport-divergent.** Two opposite failure modes, one root cause:

| Viewport | File | What renders | Measured footprint |
|---|---|---|---|
| Desktop 1280 | `picker-1280-light.png`, `blob-1280-light.png` (pixel-identical) | a **tiny ~24px pink speck** floating at **top-center over EMPTY space**, detached from the panel; a second smaller satellite dot upper-right | ~24px orphan — NOT in the picker CardHeader top-right cell |
| Desktop 1440 | `picker-1440-light.png`, `blob-1440-light.png` | same ~24px speck top-center, plus (1440) a *second* larger blob overrunning the `Lab` header — **two uncontained blobs** | speck + header-overrun |
| Mobile 375 | `picker-375-light.png`, `blob-375-light.png`, `picker-375-dark.png` | a **large ~120px pink teardrop** in the panel's upper region, **clipping the `Lab` header**, satellite visible lower-left | ~120px — overruns the `w-[7rem]` (112px) host |

The blob is supposed to occupy the picker `CardHeader` top-right cell:
`ColorPicker.vue:22` — `<HeroBlob class="col-start-2 col-span-2 row-span-2 justify-self-end" />`, and `HeroBlob.vue:8` mounts `<GooBlob class="w-[7rem]">` (112px). **In NO capture does the blob sit in a stable 112px square in that cell.** Desktop it is a vestigial speck floating ABOVE/outside the card; mobile it is 1.6× oversize clipping the header. This is the user's chronic "sit properly in the top-[right] corner" mandate, unfulfilled.

---

## §1 — Root cause (traced through the actual source, two files)

The footprint is governed by a **size split across two files plus an ambiguous grid intrinsic-width** — three interacting bugs that produce the desktop-speck / mobile-overrun divergence:

### (a) The two-file size split (the W3-1/W3-2 defect, now pixel-proven)

- `GooBlob.vue:95-106` — the canvas is `width:160%; height:160%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)`. The canvas is deliberately blown out to 160% of the wrapper so satellites at wide orbits render beyond the layout box (the wrapper is `overflow:visible`, `:71`).
- `useMetaballRenderer.ts:19` — `const POS_SCALE = 1 / 1.6` counter-scales **every length-like uniform** (`uBodyRadius`, `uPointerStrength`, satellite `x/y/radius`, `uPulseAmp`, `uNoiseAmp`, `uSmoothK` — `:202-238`) by `0.625` so the *visible* blob nominally fills the inner 62.5% (the declared footprint) while the outer 37.5% is orbit overflow.

**One blob size is expressed in two places that must stay reciprocal** (`160%` in CSS ↔ `1/1.6` in JS). This is the §3.1 "footprint==resolution" row's "160% CSS blow-up + counter-scale" — the pixels confirm it is fragile: any host whose resolved width drifts from the assumed 112px breaks the reciprocal and the blob desyncs from its footprint.

### (b) The ambiguous grid intrinsic width (the desktop-speck driver)

`resize()` (`useMetaballRenderer.ts:147-160`) sizes the drawing buffer from `canvas.clientWidth || config.canvasSize`. The canvas `clientWidth` is `1.6 × wrapper.clientWidth`, and the wrapper is `aspect-ratio:1` + `position:relative` with **NO explicit width of its own** — it inherits from the Tailwind `w-[7rem]` class on the `<GooBlob>` host. BUT the host sits in `CardHeader`'s `grid grid-cols-3 grid-rows-[auto_auto]` (`ColorPicker.vue:4`) at `col-start-2 col-span-2 justify-self-end` (`:22`).

- On **mobile** the `grid-cols-3` tracks are wide and `col-span-2` + `w-[7rem]` resolves the wrapper to ~112px (or larger if the track min-content pushes it) → canvas 1.6× → ~120px+ visible → **overrun**.
- On **desktop** the panel is `max-w-desktop-pane` and the 3-col header packs tightly; `justify-self-end` + `aspect-ratio:1` against a `col-span-2` track whose intrinsic min-content is dominated by the `ColorComponentDisplay` numbers can collapse the blob host toward its min-content, and **if the wrapper resolves near-zero `clientWidth` at first `resize()`, the canvas drawing buffer is near-1×1** → the WebGL output is a **tiny speck** that then floats via the `absolute` + `translate(-50%,-50%)` over wherever the (collapsed) wrapper anchored. The ResizeObserver (`:265-268`) re-fires on later layout but the speck shows the canvas never recovered a real footprint — the **`clientWidth` was read against an unstable/collapsed grid cell.**

This is why mobile and desktop diverge from ONE bug: the footprint is **driven by ambiguous grid intrinsic sizing, never by a declared, self-contained size.** `aspect-ratio:1` with no fixed inline-size in a `col-span-2 justify-self-end` cell is the precise trap.

### (c) The absolute-overflow canvas detaches from the cell

Because the canvas is `position:absolute` 160% centered on the wrapper with `overflow:visible`, the *visible blob* (the speck or the teardrop) renders OUTSIDE the layout box and is NOT clipped to the cell. So even when the wrapper is correctly placed by the grid, the rendered metaball floats free of it (the "top-center over empty space" the captures show on desktop — the speck is the canvas centered on a collapsed wrapper that the grid parked high). The footprint the user *sees* is unrelated to the footprint the *layout* reserves.

**Verdict: the desktop ~24px speck and the mobile ~120px overrun are the SAME bug** — the blob has no self-contained, declared footprint; it borrows an ambiguous grid-resolved width, doubles it via a CSS-vs-JS split, and renders it through an unclipped absolute overflow. The lift must FIX this, not carry it.

---

## §2 — The footprint==render-resolution contract (what the glass-ui Metaballs primitive MUST own)

The lift to `@mkbabb/glass-ui/goo-blob` (Metaballs) is the chance to make size **single-source** and **self-contained**. The primitive owns the contract; the consumer declares ONE size.

### §2.1 — One source of size (delete the 160%/`1/1.6` split)

- **DELETE** the `160%` canvas CSS (`GooBlob.vue:101-103`) and the `POS_SCALE = 1/1.6` counter-scale (`useMetaballRenderer.ts:19` and all its `* POS_SCALE` multiplies at `:202,205,208,210,213,218,236,237`).
- The Metaballs **layout box stays the declared size** (the host's width; canvas is `width:100%; height:100%` of the host, `position` static/relative within it, NOT a 160% absolute blow-up).
- The orbit-overflow halo (satellites at wide orbits) becomes an **internal uniform-space token**, NOT a CSS blow-up: the shader already works in `vUv - 0.5` normalized space (`metaball.frag.glsl:109`). Introduce a single `overflowMargin` uniform (default e.g. `0.25` = 25% margin in normalized space) so the SDF body+satellites occupy the inner `(1 - 2·margin)` of the unit square and orbits use the margin band — all in ONE coordinate system, no JS counter-scale, no CSS percentage. The drawing buffer = the host box × DPR; the "visible blob region == declared footprint minus the symmetric overflow margin," expressed once, in the shader.
- **Net**: `resize()` reads `host.clientWidth/clientHeight` (the real declared box) → buffer = box×DPR. No `1.6×`. The footprint the layout reserves == the footprint the GL renders. The W3-1/W3-2 "footprint==resolution" gate is satisfied **by construction**.

### §2.2 — A self-contained, declared size (kill the grid intrinsic-width ambiguity)

The primitive must NOT depend on an ambiguous grid-resolved width. Two parts:

1. **Primitive-side**: Metaballs takes a **`size` prop** (a CSS length, e.g. `size="7rem"` or numeric px) that sets BOTH the host box (`width`/`height` via the bound `--metaballs-size`) AND is the authority for `resize()`. The host gets `width: var(--metaballs-size); aspect-ratio: 1; flex: none;` — an **explicit inline-size**, so it never collapses to grid min-content. `clientWidth` is then deterministic and viewport-stable. A `ResizeObserver` still handles container-query/responsive `size` changes, but the *base* footprint is declared, not inferred.
2. **Consumer-side (`HeroBlob.vue`/`ColorPicker.vue`, W3b)**: replace the ambiguous `class="w-[7rem]"` on a `col-span-2 justify-self-end aspect-ratio` cell with an **explicit `:size` prop** (`<Metaballs size="7rem" />` desktop, a responsive token mobile). The CardHeader cell gets a **definite** width to place — `place-self-end` no longer fights an `aspect-ratio:1` with indefinite inline-size. Spec the cell as a fixed-width nest: the blob is a `7rem` (desktop) / responsive (mobile) square placed `justify-self-end` in `col-start-2 col-span-2`, with the cell's min-content no longer able to collapse it.

> **Grounding note**: the current `resize()` "size from actual rendered element, not config" comment (`:150`) was the *intended* fix but it reads an element whose own width is indefinite. The corrected contract is "size from the DECLARED `size` prop, mirrored to the element box" — the element is rendered AT the declared size, so reading it is safe.

### §2.3 — Corner-anchor (the user's "sit properly in the corner")

- The Metaballs primitive exposes an **`anchor` token** (`'center' | 'top-right' | 'top-left' | …`, default `center`). When the consumer wants the blob nestled in a corner of a larger host, `anchor="top-right"` aligns the blob's footprint to that corner WITHIN its declared box (no `absolute top:50% left:50% translate(-50%,-50%)` free-float).
- The overflow halo (the `overflowMargin` band) is **asymmetric-aware**: with a corner anchor, the margin band biases away from the anchored corner so satellites overflow INTO the host's interior, not off its edge — the blob "sits" in the corner with orbits trailing inward. This is the concrete mechanism for the user's "sit properly in the top-[right] corner" and directly cures the captured "floating top-center over empty space."
- **HeroBlob/ColorPicker (W3b)**: the CardHeader cell uses `anchor="top-right"` (or the design's chosen corner) so the blob nestles in the header's top-right corner of the picker card — exactly the `justify-self-end` intent, now realized by the primitive instead of an unclipped absolute overflow.

### §2.4 — Clip to footprint (stop the free-float)

- The canvas is `position: relative` (or static) within the host box, sized `100%`, NOT `absolute` 160% centered. The host is `overflow: visible` ONLY to the extent of the declared `overflowMargin` band — but the visible blob body is now bounded by the buffer, which is the declared footprint. The metaball can no longer render as a speck floating over empty space because there is no `translate(-50%,-50%)` on an absolute oversized canvas; the GL output fills the declared box.
- **The §1(b) speck cannot recur**: with an explicit `size`, `clientWidth` at first `resize()` is the declared size, never a collapsed grid min-content; the buffer is never near-1×1.

---

## §3 — Does the lift FIX the footprint or CARRY it? (the binding answer)

**The lift MUST fix it.** A naive verbatim move of `GooBlob.vue` + `useMetaballRenderer.ts` into glass-ui would CARRY all three §1 bugs (the 160%/`1/1.6` split, the indefinite grid width, the absolute free-float) — the speck and the overrun would reappear in glass-ui's primitive. The K.W3 re-spec §3.1 "footprint==resolution" row already mandated "layout box stays the declared size; one source of size; a `corner-anchor` token." This refinement makes that row **binding and concrete**, grounded in the captures:

- §2.1 deletes the two-file split → **one source of size** (the row's "One source of size").
- §2.2 declares the size → **kills the grid-intrinsic ambiguity** (the captured desktop-speck root cause — this is NEW, the captures revealed it; the doc-era spec did not name the grid-collapse mechanism).
- §2.3 ships the **`anchor` token** → the row's "corner-anchor … nestles the blob in-footprint" (the user's mandate).
- §2.4 clips to footprint → kills the free-float (the captured "floating over empty space").

The lift is the RIGHT moment because the primitive becomes the single owner of the footprint contract — the demo stops hand-wiring `160%`/`1/1.6`/`w-[7rem]`/`absolute`, and just declares `<Metaballs :size anchor resolve-color>`. This is the inv-K-3 injected-resolver seam (carried verbatim) PLUS the footprint contract (sharpened here).

---

## §4 — The OKLCh shader (D1) — highest-risk, refined with the color the captures show

D1 STANDS as specced in K.W3 re-spec §3.4 (replace the `rgb2hsv`/`hsv2rgb` perturbation, `metaball.frag.glsl:93-106,146-157`, with an inlined GLSL OKLab→OKLCh perturbation; inv-K-2-clean GPU transform, NOT a second JS impl). This refinement adds the **grounding the captures provide + the risk decomposition**:

### §4.1 — What the captures confirm about the current HSV path

The picked color in every picker capture is **`Lab 92%, 88.8, 20`** — a high-L, high-chroma pink/magenta (the body renders saturated pink in `picker-375-light.png`). At THIS color HSV does not visibly fail (chroma is high → `rgb2hsv` hue is stable). **The HSV degeneracy is latent, not captured** — it bites at LOW chroma (near-gray), where `metaball.frag.glsl:146` `rgb2hsv(uBaseColor)` returns an unstable hue (`atan2(0,0)=0`, the MEMORY.md "HSV hue drift") and `:149` `hsv.x += (colorNoise-0.5)·uHueRange/360` swings a near-gray through arbitrary hues. The K.W6 π gate (not these captures) must EXERCISE a near-gray pick to expose/verify the fix. **Flag**: the current 84-capture set does NOT include a low-chroma pick, so D1's failure mode is un-photographed; the K.W6 π lane MUST add a `oklch(0.6 0.01 H)`-class near-gray frame.

### §4.2 — The OKLCh perturbation (the structural fix)

Inline the Björn Ottosson sRGB↔OKLab matrices **in GLSL** (`metaball.frag.glsl` only — inv-K-2 forbids a second JS/TS impl, NOT a GPU shader transform; record this so close-review does not false-positive on "duplicate OKLab"):
1. `uBaseColor` (linear-or-sRGB — confirm the resolver hands sRGB [0,1]; the demo resolver returns `getImageData` bytes/255 = sRGB) → linearize → OKLab (`L,a,b`).
2. OKLab → cylindrical OKLCh (`L, C=hypot(a,b), H=atan2(b,a)`).
3. Perturb: `H += (colorNoise-0.5)·uHueRange` (radians or a documented unit — the **uniform meaning shifts HSV→OKLCh** but the names `uHueRange/uSatShift/uBrightnessShift` stay, `useMetaballRenderer.ts:21-42` unchanged); `C += (colorNoise-0.5)·uSatShift` (clamp ≥0); `L += uBrightnessShift`.
4. OKLCh → OKLab → linear-sRGB → delinearize → `rgb`.
5. The edge-glow (`:154-155`) re-expresses on `L` (lightness) instead of `hsv.z`.

**Why it is structural**: near-gray has `C≈0`, so a hue shift moves nothing (the degeneracy vanishes by construction — at `C=0`, `H` is undefined but irrelevant because the perturbation scales with the existing chroma, not a synthesized one). The pink body the captures show is unaffected (high C → same look); the near-gray case (un-captured) becomes stable.

### §4.3 — D1 risk register (why it is the highest-risk item)

| Risk | Mitigation |
|---|---|
| **Visual regression on the captured pink** — the OKLCh path must reproduce the current pink body look the captures show (`picker-*-light.png`) so the lift is not a visible change | K.W6 π gate re-captures the SAME `Lab 92,88.8,20` pick desktop+mobile; diff against `picker-1280/375-light.png`; the body hue must match within ΔE tolerance (high-chroma → OKLCh and HSV agree closely, so low regression risk HERE) |
| **GLSL matrix transcription error** — the Ottosson matrices hand-typed in GLSL can transpose/typo | canary: a unit-color test frame (`oklch(0.7 0.15 30)` → known sRGB) rendered and sampled; the body center pixel must match the expected sRGB within 1/255 |
| **Uniform-meaning drift unobserved** — `uHueRange=5` meant "5/360 turn" in HSV; in OKLCh radians/degrees the magnitude differs | re-tune `BLOB_CONFIG_DEFAULTS.hueRange/satShift/brightnessShift` (`types.ts:116-118`) to the OKLCh scale so the *visible* perturbation amplitude matches the current subtle look; this is a config retune, glass-ui-side default + demo `BlobConfig` |
| **Performance** — OKLab adds matrix mults per-fragment | negligible (2 mat3 + a cbrt per fragment at ~112px²×DPR²); but fold into the W3-1/W3-2 footprint fix which SHRINKS the buffer (no 1.6× blow-up = ~39% fewer fragments), net-neutral-or-faster |

D1 ships the GLSL OKLab **default now** (the structural fix); the LUT-bake injection seam stays BOOKED to K.W4 (do not build speculatively — K.W1-primitive-lift §3 decision STANDS).

---

## §5 — How this composes with inv-K-3 (the injected resolver) and the rest of the lift

The footprint contract and the resolver seam are **orthogonal and both required** in the same lifted primitive:
- **inv-K-3 (resolver)**: `useMetaballRenderer.ts:44-70` (`resolverCtx`/`cssColorToRgb`/`cssColorCache`) DELETED; `UseMetaballRendererOptions` gains required `resolveColor: (css)=>[r,g,b]`; `:184` `cssColorToRgb(color.value)` → `opts.resolveColor(color.value)`. No value.js default in glass-ui (no `createElement("canvas")`, no `parseCSSColor`). This is UNCHANGED from K.W3 re-spec §3.1 D2 — re-cited so the lift PR carries both fixes.
- **Footprint (this refinement)**: §2 — single-source size, declared `size`, `anchor`, clip-to-footprint, `overflowMargin` uniform.
- **D4 (demand-driven RAF)**: UNCHANGED from §3.1 — port aurora's `needsAnimation()`/`wake()` gate; park on PRM/tabHidden/off-screen; gate `start()` on **non-zero `clientWidth`** (`:265-268`) — this gate ALSO guards the §1(b) speck: if `start()` only fires once the declared `size` has resolved a non-zero box, the near-1×1 buffer cannot happen. **The footprint fix and the D4 satellite-non-collapse gate reinforce each other.**
- **W3-4 spring mood / W3-5 hover-shadow-off-GL-path**: UNCHANGED from §3.1.

`HeroBlob.vue` (stays demo-side, W3b): keeps the affective FSM verbatim; the `<GooBlob>`→`<Metaballs>` swap gains `:size="'7rem'"` (responsive token), `anchor="top-right"`, `:resolve-color`, `:mood-targets`. The `w-[7rem]` class RETIRES onto the `:size` prop (the class is the ambiguous-width source §1(b) — deleting it is part of the fix, not cosmetic).

---

## §6 — The footprint close-gates (added to K.W3 §8)

These are NEW gates this refinement adds to the K.W3 §8 close table (the existing D1/D2/D4 gates STAND):

| Gate | Check | Expect |
|---|---|---|
| no two-file size split | `grep -rn "POS_SCALE\|160%" ../glass-ui/src/components/custom/goo-blob/ demo/` | zero (one source of size) |
| declared size, not grid-inferred | Metaballs host has explicit `width: var(--metaballs-size)`; `resize()` authority is the `size` prop, not a bare `clientWidth || config` fallback | present |
| footprint==resolution (π) | K.W6 π gate: blob visible footprint == declared `size` ±tolerance at **375 AND 1280 AND 1440**; NO desktop speck, NO mobile overrun (re-capture vs `picker-1280-light.png`/`picker-375-light.png` and diff) | within-cell at all 3 vp |
| corner-anchor honored | with `anchor="top-right"` the blob centroid sits in the host's top-right quadrant, orbits trail inward (visual π frame) | nestled, not free-floating |
| no free-float canvas | canvas is `100%` within host, not `absolute` 160% `translate(-50%,-50%)` | no absolute-overflow blow-up |
| D1 near-gray stability (π) | K.W6 π gate renders a `oklch(~0.6 ~0.01 H)` near-gray pick; hue does NOT swing through the spectrum across frames (the un-captured HSV failure mode) | stable hue |
| D1 pink parity (π) | re-capture the `Lab 92,88.8,20` pick; body hue matches `picker-*-light.png` within ΔE tolerance | no visible regression |

The K.W6 π visual-runtime lane MUST add: (1) a **near-gray pick frame** (D1 exposure — the 84-capture set lacks it), (2) a **per-viewport footprint diff** at 375/1280/1440 (the C3 fix proof). These are the two un-photographed conditions this refinement surfaces.

---

## §7 — What does NOT change (scope discipline)

- The two-phase W3a/W3b shape, the dist-consumption mandate (§0 of the re-spec), the publish spine, the 9-file goo-blob deletion (§4.1), the watercolor-dot lift (§3.2/§4.3), prng lift (§3.3), the shared WebGL bootstrap (§3.5), the 4 net-new asks (§3.6), the `parseCSSColor` root-fix (§5), J.W3 PaletteDiff (§6), sortable migration (§4.5), ui/ shim collapse (§4.6) — **ALL STAND**.
- This refinement is a **sharpening of the §3.1 "footprint==resolution" row + the D1 §3.4 row**, grounded in pixels. It adds no new files, no new wave, no scope. It makes "the lift FIXES the footprint" binding and mechanistic instead of aspirational.

## LEDGER
- [glass-ui] src/components/custom/goo-blob/Metaballs.vue (lifted GooBlob.vue) — DELETE the 160% canvas CSS + absolute top:50%/left:50%/translate(-50%,-50%) free-float (carried from GooBlob.vue:95-106); canvas becomes width:100%/height:100% within a host box sized by an explicit `size` prop (width: var(--metaballs-size); aspect-ratio:1; flex:none)
- [glass-ui] src/components/custom/goo-blob/Metaballs.vue — add `size` prop (CSS length, mirrors to --metaballs-size + is the resize() authority) + `anchor` token ('center'|'top-right'|'top-left'|...; default center) that nestles the footprint to a corner and biases the overflow band inward
- [glass-ui] src/components/custom/goo-blob/composables/useMetaballRenderer.ts — DELETE POS_SCALE=1/1.6 (:19) and every `* POS_SCALE` multiply (:202,205,208,210,213,218,236,237); single coordinate system in the shader
- [glass-ui] src/components/custom/goo-blob/composables/useMetaballRenderer.ts:147-160 resize() — size the drawing buffer from the declared `size` prop (mirrored to the host box) × DPR, NOT a bare `clientWidth || config.canvasSize` fallback that reads an indefinite grid-collapsed width
- [glass-ui] src/components/custom/goo-blob/shaders/metaball.frag.glsl — introduce a single `uOverflowMargin` uniform (default ~0.25) so body+satellites occupy the inner (1-2·margin) of the unit square and orbits use the margin band — the orbit-overflow halo is an internal uniform-space token, NOT a CSS blow-up + JS counter-scale
- [glass-ui] src/components/custom/goo-blob/shaders/metaball.frag.glsl:93-106,146-157 — replace rgb2hsv/hsv2rgb perturbation with inlined GLSL OKLab→OKLCh (Ottosson matrices, GPU-only; inv-K-2-clean): linearize→OKLab→OKLCh, perturb H by uHueRange / C by uSatShift / L by uBrightnessShift, →OKLab→linear-sRGB→delinearize; re-express edge-glow on L; near-gray (C≈0) hue-shift is a no-op by construction (D1)
- [glass-ui] src/components/custom/goo-blob/composables/useMetaballRenderer.ts D4 gate — gate start() on a non-zero declared box (:265-268 ResizeObserver) so the near-1x1 buffer speck cannot occur; reinforces the footprint fix
- [glass-ui] src/components/custom/goo-blob/types.ts BLOB_CONFIG_DEFAULTS:116-118 — retune hueRange/satShift/brightnessShift to the OKLCh perturbation scale so the visible amplitude matches the current subtle HSV look (config retune accompanying D1)
- [value.js] demo HeroBlob.vue:8 / ColorPicker.vue:22 — replace `class="w-[7rem]"` (the ambiguous grid-intrinsic-width source) with explicit `:size="'7rem'"` (responsive token) + `anchor="top-right"` on <Metaballs>; the CardHeader col-start-2/col-span-2/justify-self-end cell now places a definite-width square (cannot collapse to min-content)
- [value.js] demo ColorPicker.vue:4 CardHeader — spec the blob cell as a fixed-width nest (definite inline-size), removing the aspect-ratio:1 + indefinite-width grid-collapse trap that produced the desktop ~24px speck
- [docs] docs/tranches/K/design/K.W3-respec-glassui-first-consummation.md §3.1 footprint row + §3.4 D1 row — fold this refinement (the footprint==resolution contract made binding + mechanistic; the grid-intrinsic-width root cause named; the anchor + overflowMargin + size contract; the D1 risk register + near-gray π exposure)
- [docs] docs/tranches/K/design/K.W3-respec §8 close gates — add the 7 footprint/anchor/D1-π gates from §6 (no two-file split, declared-size, footprint==resolution at 375/1280/1440, corner-anchor honored, no free-float canvas, D1 near-gray stability, D1 pink parity)

## GATES
- grep -rn 'POS_SCALE|160%' ../glass-ui/src/components/custom/goo-blob/ demo/ → zero (one source of size; the two-file split deleted)
- Metaballs host carries explicit width: var(--metaballs-size) + aspect-ratio:1 + flex:none; resize() authority is the `size` prop not a bare clientWidth||config fallback
- K.W6 π: blob visible footprint == declared size (±tolerance) at 375 AND 1280 AND 1440 — NO desktop ~24px speck, NO mobile ~120px overrun (re-capture + diff vs picker-1280-light.png / picker-375-light.png)
- K.W6 π: with anchor='top-right' the blob centroid sits in the host top-right quadrant with orbits trailing inward (not free-floating over empty space)
- canvas is 100% within the host box (relative/static), NOT absolute 160% translate(-50%,-50%)
- grep -rn 'rgb2hsv|hsv2rgb' ../glass-ui/src/components/custom/goo-blob/ → zero (D1 OKLCh)
- K.W6 π: a near-gray pick (oklch ~0.6 ~0.01 H) renders a STABLE hue across frames (the un-captured HSV-degeneracy failure mode exposed + fixed)
- K.W6 π: re-capture the Lab 92,88.8,20 pick — body hue matches picker-*-light.png within ΔE tolerance (no visible regression from HSV→OKLCh)
- inv-K-3 carried: grep -rn 'parseCSSColor|getImageData|createElement("canvas")' ../glass-ui/src/components/custom/goo-blob/ → zero (required injected resolveColor, no value.js default)
- K.W6 π visual-runtime lane MUST add a near-gray frame (D1 exposure) + a per-viewport footprint diff at 375/1280/1440 (C3 fix proof) — both conditions are absent from the current 84-capture set