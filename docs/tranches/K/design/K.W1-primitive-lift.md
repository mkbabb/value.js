# K.W1 — primitive lift: goo-blob + WatercolorDot → glass-ui (color-agnostic), the shared WebGL bootstrap, the 8 carried asks

**Wave**: K.W1 (DEV/design). **Authors no code.** This is the K.W3 work-order — the cohort-paired sequence that lifts goo-blob and WatercolorDot into glass-ui as **color-agnostic** primitives (inv-K-3), folds the triple-duplicated WebGL bootstrap into one glass-ui helper, lands the 8 carried glass-ui asks, and proves the lift by deletion (the demo composables/shaders are removed, not shimmed). The peer is glass-ui at HEAD `84a6cc1` (`coordination/glass-ui.md`); the lockstep is glass-ui-commit-then-value.js-consume within K.W3.
**Predecessor**: `K.W1-cross-repo-topology.md` (the peerDep + `tsconfig.lib`/`demo` split + the aurora `color.ts` dedup land in K.W2 *before* this wave — the OKLCh-LUT port here consumes the post-dedup value.js color API, and the equivalence-test canary must be green at K.W2 close).
**Binding invariants**: inv-K-1 (the value.js library never imports glass-ui — irrelevant here; both lifts are demo↔glass-ui), inv-K-3 (the blob primitive takes a **required injected color resolver, NO value.js default**), inv-K-4 (TS resolves glass-ui from source — the demo typechecks the lifted imports against glass-ui `src/`).

---

## §0 — The 6-defect → gate binding table (the audit's blob defects D1–D9)

K.W0 audited goo-blob and found it is not merely stranded — it carries six defects. This wave gates **D1/D2/D4/D6** (the lift defects); **D8/D9** (aurora wiring) gate at K.W4. Each row names the exact site and the structural close-evidence (the lift idiom = the deletion is the proof; no `proof:*` script).

| # | Defect | Site (file:line) | K disposition | Close-evidence (structural) |
|---|---|---|---|---|
| **D1** | HSV color perturbation loses hue at low chroma (the chronic `atan2(0,0)=0` drift, MEMORY.md "HSV hue drift") | `goo-blob/shaders/metaball.frag.glsl:93-106,146-157` (`rgb2hsv`/`hsv2rgb`; `hsv.x += … uHueRange/360.0`) | OKLCh-LUT shader; RGB↔HSV deleted | grep glass-ui blob shader → `rgb2hsv`/`hsv2rgb` zero; a runtime hue-drift assertion (low-chroma gray no longer hue-shifts) |
| **D2** | 1×1-canvas `getImageData` CSS-color resolver baked into the renderer | `goo-blob/composables/useMetaballRenderer.ts:44-70` (`resolverCtx` + `cssColorToRgb`) | **required injected resolver**; NO value.js default in the primitive; the demo injects `parseCSSColor` | grep glass-ui blob source → no `createElement("canvas")` color path, no `parseCSSColor` import (inv-K-3) |
| **D4** | Always-on 60fps RAF; the always-mounted hero never parks at steady-state | `useMetaballRenderer.ts:251-253` (`rafId = requestAnimationFrame(render)` unconditional) | port aurora's demand-driven gate (`needsAnimation`/`wake`, `runtime.ts:507-548`) | runtime-observe: the steady-state hero parks (`raf` → 0); π-lane frame evidence |
| **D6** | `BlobPane.vue` double-casts `cfg`/defaults through `as unknown as Record<string,unknown>` | `panes/BlobPane.vue:85-87` | the lifted `BlobConfig` + a typed `SliderSection<BlobConfig>` descriptor retires the casts | grep `BlobPane.vue` → zero `as unknown as`; tsc green |
| **D8** | `AuroraPane.vue` "under rework" stub — no live slider table | `K.W4` (`K.W1-aurora-derive.md`) | — | — (K.W4 gate) |
| **D9** | picker color statically cloned into `auroraConfig`, never re-tints | `K.W4` (`App.vue` wiring) | — | — (K.W4 gate) |

---

## §1 — Thesis: lift the kinematics, inject the color, retire the bootstrap triplicate

goo-blob is a **self-contained WebGL2 metaball engine with zero value.js coupling** — exactly the inv-K-3 profile: a generic visual primitive that belongs in glass-ui beside its sibling aurora. WatercolorDot is the same shape one tier down: a deterministic-PRNG organic-shape generator with **no color math at all** (it morphs `border-radius`; color is a passed-through CSS string — `WatercolorDot.vue:6-8`). Both belong in glass-ui; the demo keeps only *product behavior* (the affective FSM/triggers in `HeroBlob.vue`, the 9 consumer call-sites for WatercolorDot).

The unifying KISS move: the renderer/shader/satellite-kinematics/config **move** to glass-ui (not get rewritten), parameterized by a single injected seam (the color resolver). The two latent traps the audit flagged — the 1×1-canvas resolver (D2) and the HSV shader path (D1) — are corrected *as part of the move*, not deferred. The triple-duplicated WebGL bootstrap (demo `webgl-utils.ts`, aurora's inlined `compile`/`link` at `runtime.ts:121-144`, and goo-blob's consumption of the demo helper) collapses to one glass-ui composable.

**The seam that makes this color-agnostic.** The blob primitive only ever needs `[r,g,b]` in `[0,1]`. Baking `parseCSSColor` as a default would make value.js a hard runtime dep of the glass-ui blob for *every external consumer* — a needless coupling (inv-K-1 would *permit* it, but inv-K-3 *forbids* it). So the lifted blob declares a **required** `resolveColor: (css: string) => [number, number, number]` prop/option with **no default**; the value.js demo injects `parseCSSColor`-backed resolver; an external glass-ui consumer injects their own (or a 1×1-canvas one). Contrast: aurora's `deriveAuroraPalette` (K.W4) genuinely needs OKLab and so consumes value.js by design under inv-K-2 — the blob does not.

---

## §2 — Lift 1: goo-blob → `glass-ui/src/components/custom/goo-blob/`

### §2.1 — What moves verbatim (kinematics — zero color coupling)

These four files are **pure kinematics + config**: no color, no value.js, no demo-only import except `@composables/prng` (which must move with them).

| Demo source (delete after lift) | glass-ui destination | Notes |
|---|---|---|
| `goo-blob/composables/useBlobSatellites.ts` (294 LoC) | `custom/goo-blob/composables/useBlobSatellites.ts` | Imports `mulberry32`/`hashString` from `@composables/prng` (`:1`) — **prng must be a glass-ui composable**; see §2.5 |
| `goo-blob/composables/useBlobPointer.ts` (69 LoC) | `custom/goo-blob/composables/useBlobPointer.ts` | Pure DOM pointer tracking; verbatim |
| `goo-blob/composables/useBlobMood.ts` (136 LoC) | `custom/goo-blob/composables/useBlobMood.ts` | The 5-mood FSM + `MoodParams`. **Decision point**: `MOOD_TARGETS` is *product-affective* tuning, not generic geometry. Lift the mechanism (lerp/transition engine + `setMood`/`tick`) to glass-ui; the **mood-target table stays demo-side** and is injected (see §2.4). The generic `useBlobMood` becomes a transition driver over an injected `Record<Mood, MoodParams>`. |
| `goo-blob/types.ts` (135 LoC: `BlobConfig`, `BLOB_CONFIG_DEFAULTS`, `BLOB_CONFIG_KEY`, `MoodParams`, `MetaballSource`, `SatelliteInternal`, `SatellitePhase`, `BlobMood`) | `custom/goo-blob/types.ts` | `BlobConfig` + defaults + injection key move (D6 — the typed config is glass-ui-owned); `BlobMood`/`MoodParams` move as the generic mood contract |

### §2.2 — What moves WITH correction (the renderer — D1, D2, D4)

`useMetaballRenderer.ts` (343 LoC) moves but is the locus of three of the four lift defects.

- **D2 — strip the resolver.** Delete `resolverCtx` + `cssColorToRgb` + `cssColorCache` (`:44-70`). Replace the renderer's `const rgb = cssColorToRgb(color.value)` (`:184`) with `const rgb = opts.resolveColor(color.value)`. The `UseMetaballRendererOptions` interface (`:72-79`) gains a **required** `resolveColor: (css: string) => [number, number, number]`. The renderer keeps the per-frame call but the *memoisation* (256-entry cache) moves to the demo's injected resolver — the primitive should not assume the resolver is cheap (an external consumer may pass a memoised one or not).
- **D1 — OKLCh-LUT shader (retire HSV).** See §3. The renderer uploads a **CPU-baked OKLCh LUT** (a small `Float32Array` of perturbed linear-sRGB triples) as a uniform array, computed once per unique base color via the post-dedup value.js OKLCh path *on the demo side* — but here is the inv-K-3 nuance: the LUT bake needs OKLab, which is value.js. **Resolution**: the LUT bake is part of the **injected resolver contract**, not the primitive. The injected seam widens from `resolveColor: (css) => [r,g,b]` to an optional `bakeColorRamp?: (css, n) => Float32Array` the demo backs with value.js OKLCh; if absent the primitive falls back to a shader-side perturbation that is **OKLab-space but uses only the base RGB** (a fixed sRGB→OKLab→perturb→sRGB GLSL path — no LUT, still hue-stable, no value.js). This keeps the primitive value.js-free while letting the demo opt into the higher-fidelity LUT. **K.W1 decision recorded**: prefer the GLSL OKLab path as the primitive default (simplest, zero-dep, fixes D1); the LUT-bake seam is BOOKED to K.W4 if the aurora-derive work surfaces a shared bake helper — do not build the LUT-injection seam speculatively (KISS).
- **D4 — demand-driven RAF gate.** The current loop reschedules unconditionally (`:251-253`). Port aurora's `needsAnimation()`/`wake()` model (`runtime.ts:507-548`) **and its `SuspendReason` set** (`runtime.ts:61,210-241`) — the existing `paused`/`tabHidden`/`destroyed` booleans (`:98-100`) collapse into the `Set<SuspendReason>` discipline. The blob's `needsAnimation()` predicate: animation is live IFF any satellite is non-`absorbed`, OR mood is mid-transition (`mood.transitioning`), OR the pointer is active/decaying, OR pulse/noise amplitude is non-zero. When the hero settles (idle mood, satellites all orbiting at steady amplitude) the loop parks; a color change / pointer / `setMood` calls `wake()`. **Note**: unlike aurora, the blob always has *some* motion (orbiting satellites + pulse) under default config, so the realistic park condition is `prefers-reduced-motion` OR `tabHidden` OR off-screen (via `useIntersectionPause`, the seam aurora's `useAurora` already owns). The wholesale always-on RAF (`:251`) becomes gated; the existing `prefers-reduced-motion` single-frame path (`:278-282,329-335`) folds into the gate as `needsAnimation() === false`.

### §2.3 — The component shell

`GooBlob.vue` (the shell, `:1-121`) moves to `custom/goo-blob/GooBlob.vue` **minus the affective wiring it does not own**. Today `GooBlob.vue` itself instantiates `useBlobMood`/`useBlobPointer`/`useBlobSatellites`/`useMetaballRenderer` (`:34-47`) and exposes `nudge`/`setMood` (`:61`). Post-lift the glass-ui `GooBlob.vue`:
- accepts a **required `resolveColor` prop** (inv-K-3) plus the existing `color`/`seed`;
- accepts an optional `moodTargets?: Record<string, MoodParams>` (defaulting to a neutral generic set — the demo passes its affective `MOOD_TARGETS`);
- keeps `BLOB_CONFIG_KEY` inject + the `--blob-color` style binding + the drop-shadow CSS (`:64-120` — generic, moves verbatim);
- re-exposes `nudge`/`setMood`/`currentMood` (`:61`) so `HeroBlob.vue` drives it unchanged.

`HeroBlob.vue` (`color-picker/visual/HeroBlob.vue`, **stays in the demo**) keeps the entire FSM/trigger surface verbatim (`:36-94` — idle-timer → sleepy, click → happy, rapid-change → excited, the `Tooltip` wrapper). Its only change: `<GooBlob>` import points at `@mkbabb/glass-ui` and gains `:resolve-color="resolveColor"` where the demo's `resolveColor` is a `parseCSSColor`-backed `(css) => [r,g,b]` (the demo's existing `useColorParsing.ts:4` already imports `parseCSSColor` from `@src/parsing/color` — the resolver is a thin wrapper).

### §2.4 — The mood-target injection seam (KISS boundary check)

The mood-target *values* (`useBlobMood.ts:4-78`: happy/curious/sleepy/excited geometry deltas) are product-affective, not generic. But over-engineering a full injection seam for a 5-entry table risks contrivance (`feedback_kiss_no_contrivance.md`). **K.W1 decision**: the lifted `useBlobMood` takes `(targets: Record<M, MoodParams>, transitions: Record<M, number>)` as arguments (it already reads module-level `MOOD_TARGETS`/`TRANSITION_MS`); glass-ui ships a sensible generic default export `DEFAULT_BLOB_MOODS`; the demo passes its own table via `GooBlob`'s `moodTargets` prop → `useBlobMood`. No injection key, no provider — a plain prop. This is the smallest change that keeps the affective tuning demo-side.

### §2.5 — The `prng` dependency (a real lift prerequisite)

`useBlobSatellites.ts:1` and `useWatercolorBlob.ts:2` both import `mulberry32`/`hashString` (and WatercolorDot also `randomRadii`/`radiiToCSS`) from `@composables/prng` — a **demo composable** (`demo/@/composables/prng.ts`, "Mulberry32 PRNG"). The lifted primitives cannot import a demo path. **Resolution**: lift `prng.ts` to `glass-ui/src/composables/` (it is a generic deterministic-PRNG utility — exactly inv-K-3). The demo re-points its own `prng` consumers (color-picker, satellites, watercolor) to `@mkbabb/glass-ui`. Check at K.W1: enumerate demo `prng` consumers so the lift does not orphan a demo-only caller — `grep -rln "@composables/prng" demo/` is the K.W3 pre-step. The K plan's §5 table does not name prng; **flag** this as a lift prerequisite the topology spec must absorb (it is a 6th glass-ui-side file beyond the K.md §9 list).

### §2.6 — `goo-blob/index.ts` + the demo deletion

glass-ui `custom/goo-blob/index.ts` re-exports `GooBlob`, `BlobConfig`/`MoodParams`/`MetaballSource`/`BlobMood`, `BLOB_CONFIG_DEFAULTS`/`BLOB_CONFIG_KEY`, `DEFAULT_BLOB_MOODS` (mirrors the demo `index.ts:1-3` plus the mood default). Add to glass-ui's top barrel. **Deletion proof**: `git` shows `demo/@/components/custom/goo-blob/` removed (all 9 files); `HeroBlob.vue` + `BlobPane.vue` + `App.vue` import from `@mkbabb/glass-ui`; close-time `grep -rn "useMetaballRenderer\|metaball.frag" demo/` → zero.

---

## §3 — D1: the OKLCh shader (retire HSV)

The current shader (`metaball.frag.glsl:146-157`) does `rgb2hsv(uBaseColor)` → perturb `hsv.x/y/z` → `hsv2rgb`. The defect: at low chroma `rgb2hsv` returns an unstable hue (the `atan2(0,0)`-class degeneracy MEMORY.md documents), so `uHueRange` perturbation swings a near-gray through arbitrary hues — visible color noise on grayscale picks.

**The fix (primitive default, value.js-free).** Replace the HSV block with a GLSL **OKLab** perturbation, mirroring aurora's linear-OKLab pipeline (`aurora/composables/color.ts:18-53` is the JS reference for the matrices; the shader does the same in GLSL):
1. `uBaseColor` (sRGB `[0,1]`) → linearize → OKLab `(L,a,b)` via the Björn Ottosson matrices (the same `0.4122214708…` / `+4.0767416621…` coefficients value.js owns canonically — but **inlined in GLSL only**, not a JS duplicate; inv-K-2 forbids a *JS* duplicate, not a GPU shader transform);
2. perturb in cylindrical OKLCh: `C` and `H` from `(a,b)`, shift `H` by `uHueRange` (degrees → the perturbation is now hue-stable because near-gray has `C≈0` so a hue shift moves nothing — the D1 fix is structural, not a clamp), scale `C` by `uSatShift`, add `uBrightnessShift` to `L`;
3. OKLCh → OKLab → linear-sRGB → delinearize → `fragColor`.

The uniform names (`uHueRange`/`uSatShift`/`uBrightnessShift`, `useMetaballRenderer.ts:21-42`) are unchanged — only their color-space meaning shifts from HSV to OKLCh, which is *more* perceptually uniform (the same upgrade VAL-1 makes for aurora). `uColorNoiseFreq`/`uColorNoiseSpeed` drive the same FBM noise field. **Close-evidence**: grep glass-ui blob shader → `rgb2hsv`/`hsv2rgb` absent; a vitest/Playwright assertion that a low-chroma input (e.g. `oklch(0.6 0.01 270)`) renders with bounded hue variance (the drift gate D1).

**inv-K-2 boundary note.** The shader inlining the OKLab matrices in GLSL is *not* a violated invariant: inv-K-2 forbids a second **JS/TS implementation** of the color math (the aurora `color.ts` dup K.W2 deletes). A GPU shader transform is the rendering target, not a parallel JS core — the same way aurora's `aurora.frag.ts` does its own GLSL color work atop the canonical JS core. Recorded so the close review does not false-positive the GLSL matrices as a dup.

---

## §4 — Lift 2: WatercolorDot → `glass-ui/src/components/custom/watercolor-dot/`

WatercolorDot is the simpler lift — no WebGL, no color math, pure deterministic border-radius morphing.

| Demo source (delete) | glass-ui destination |
|---|---|
| `watercolor-dot/WatercolorDot.vue` (108 LoC) | `custom/watercolor-dot/WatercolorDot.vue` |
| `watercolor-dot/composables/useWatercolorBlob.ts` (138 LoC) | `custom/watercolor-dot/composables/useWatercolorBlob.ts` |
| `watercolor-dot/index.ts` | `custom/watercolor-dot/index.ts` (+ glass-ui top barrel) |

**The one real seam — the SVG filter dependency.** `WatercolorDot.vue:65` applies `filter: url(#watercolor-filter)` — an SVG `<filter>` defined in the **demo's** `svg-filters/SvgFilters.vue` (and `SpectrumCanvas.vue`). The lifted glass-ui component cannot assume `#watercolor-filter` exists in the consumer's DOM. **K.W1 decision**: the lifted component takes an optional `filterId?: string` prop (default `undefined` → no `url()` filter, falls back to the `border-radius` morph + box-shadow alone, which already reads as organic); the demo passes `filter-id="watercolor-filter"` and keeps `SvgFilters.vue` as the demo-side filter-def owner. This keeps the primitive DOM-self-contained (inv-K-3) while preserving the demo's exact look. **Flag**: the K.md §5 / §9 tables and `coordination/glass-ui.md:35` describe WatercolorDot as a bare lift with "8 consumers re-point" and do **not** mention the SVG-filter seam — this is a real lift prerequisite the work-order must carry.

**Consumer count drift — FLAG.** The K plan (K.md §5, §6 K.W3 gate, `coordination/glass-ui.md:35`) says **8 consumers**. The actual import sites are **9 demo files**: `mix/MixResultDisplay.vue`, `mix/MixSourceSelector.vue`, `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue`, `color-picker/controls/SpectrumCanvas.vue`, `color-picker/editing/EditDrawer.vue`, `palette-browser/SwatchHoverMenu.vue`, `palette-browser/CurrentPaletteEditor.vue`, `palette-browser/PaletteDialog/components/PaletteDialogHeader.vue`, `dock/Dock.vue`. The work-order re-points **9**, not 8. (The overfitting-audit ≥2-consumer gate is met many-fold either way.)

**Deletion proof**: `git` shows `demo/@/components/custom/watercolor-dot/` removed (3 files); the 9 consumers import `WatercolorDot` from `@mkbabb/glass-ui`; close-time `grep -rn "watercolor-dot/" demo/` → zero (the `prng` lift §2.5 handles the shared dep).

---

## §5 — The shared WebGL bootstrap: one glass-ui helper (the triple-dup retired)

Today the same compile/link/quad bootstrap exists three times:
1. `demo/@/lib/animation/webgl-utils.ts` — `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms` (the demo helper goo-blob consumes, `useMetaballRenderer.ts:2`);
2. aurora's inlined `compile`/`link` (`runtime.ts:121-144`) + its own VAO/uniform-cache setup (`runtime.ts:319-335`);
3. goo-blob's consumption of (1).

**Resolution**: author `glass-ui/src/composables/glass/webgl.ts` (NEW — the `glass/webgl/` dir exists but holds only `frostShader.ts`; there is no shared bootstrap there yet, confirmed) exporting `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms` — the demo `webgl-utils.ts` body moves verbatim (it is already generic, `webgl-utils.ts:1-71`). Add to `glass/index.ts` (which currently exports only `useGlassRenderer`). Then:
- the lifted goo-blob renderer imports it from the glass-ui-internal path;
- aurora's `runtime.ts` **replaces** its inlined `compile`/`link` (`:121-144`) with the shared `compileShader`/`linkProgram` (a cohort-side aurora refactor — small, reversible, the equivalence-test-class canary is the existing aurora visual smoke);
- the demo deletes `@lib/animation/webgl-utils.ts`.

**KISS boundary**: do NOT fold aurora's bespoke uniform-cache / pre-allocated upload buffers (`runtime.ts:361-371`) into the shared helper — those are aurora-specific. Only the four leaf functions (`compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms`) are genuinely shared; over-abstracting the renderer lifecycle is contrivance. Close-evidence: close-time `grep -rn "function compileShader\|function linkProgram" ../glass-ui/src demo/` → defined exactly once (in `glass/webgl.ts`).

---

## §6 — The 8 carried glass-ui asks — each a primitive + the demo override it retires

Carried A→I (6–7 tranches) because no value.js tranche could author glass-ui. K co-authors them. Each row: the glass-ui-side primitive change + the exact demo override site it retires. **Three are partly already-landed in glass-ui** (drift flags below).

| # | Ask | glass-ui-side change | Demo override retired | Status |
|---|---|---|---|---|
| **1** | Select `size` | `ui/select/SelectTrigger.vue` hardcodes `h-10` (`:36`); add a `size?: 'sm'\|'default'` prop mapping `sm`→`h-9` (mirroring `buttonVariants` size tokens) | `gradient/EasingSelector.vue:41` `class="h-9 …"` + the `<!-- A.W4: h-9 pending … -->` marker | NEW prop |
| **2** | `DockSelectTrigger clampLabel` | `custom/dock/DockSelectTrigger.vue` (exists, `:1-37`) has no label-truncation; add `clampLabel?: boolean` (or `maxLabelCh?: number`) applying a `text-overflow:ellipsis`/`max-inline-size` clamp on the slotted label | the demo dock select-trigger sites that hand-clamp (audit at K.W3 — `DockViewSelect.vue` per K.md §5 W5 row) | NEW prop on existing component |
| **3** | `TooltipContent variant="mono"` | `ui/tooltip/TooltipContent.vue` (`:1` — no variant) add `variant?: 'default'\|'mono'`; `mono` applies the monospace font token (the demo's `fira-code`/`.fira-code` class) | `color-picker/controls/ComponentSliders.vue:87` `class="fira-code"` + marker; `color-picker/visual/HeroBlob.vue:12` `class="fira-code"` | NEW prop. **Flag**: glass-ui Select font-token work (`feedback_select_font.md`) is adjacent — reuse the existing glass-ui font token, do not hardcode `fira-code` (per the feedback memory) |
| **4** | `Button size="icon-sm"` | `ui/button/index.ts buttonVariants` has `icon: 'h-10 w-10'` but no `icon-sm`; add `'icon-sm': 'h-9 w-9 p-0'` (or `h-8 w-8`, sized at K.W3 against the demo callsite) | the demo icon-button sites that hand-size a `<Button size="icon" class="h-9 w-9">` (audit at K.W3) | NEW size token on existing CVA |
| **5** | `Tabs variant="underline"` | glass-ui **already ships** `custom/tabs/UnderlineTabs.vue` (CSS-anchor-positioned, `:1-118`) — the ask is **substantially landed**. K.W3 scope shrinks to: confirm `UnderlineTabs` covers the demo use, OR (if the demo needs the variant on the *reka-ui Tabs root* not a standalone component) add an `underline` variant there | `demo/@/styles/style.css:191-194` `.underline-tabs button[role="tab"][data-state="active"]` + the marker (`:188-192`: "retired once glass-ui ships a Tabs underline variant") | **PARTLY LANDED** — flag: the existing `UnderlineTabs` is a *standalone component*, not a `variant` prop; K.W3 reconciles which shape the demo consumes |
| **6** | `BlobDot` | A small organic dot primitive. **Subsumed by the WatercolorDot lift (§4)** — `WatercolorDot` IS the BlobDot. No separate component; the ask closes by the §4 lift. glass-ui has `status-dot/StatusDot.vue` (a plain dot) — `BlobDot` = the watercolor variant | (none — the 9 WatercolorDot consumers ARE the BlobDot consumers) | **SUBSUMED by §4 lift** |
| **7** | Metaballs API | **Subsumed by the goo-blob lift (§2)** — `GooBlob` + its `BlobConfig` IS the Metaballs API. No separate primitive | (HeroBlob + BlobPane ARE the Metaballs consumers) | **SUBSUMED by §2 lift** |
| **8** | Aurora-derive | `deriveAuroraPalette(baseColor, config)` — **deferred to K.W4** (`K.W1-aurora-derive.md`), not this wave | `AuroraPane.vue` / `App.vue` wiring | **K.W4** (named-forward) |

**Net new glass-ui-side work in K.W3 for the asks**: 4 small additive props/tokens (asks 1–4); ask 5 is reconcile-existing; asks 6/7 are subsumed by the two lifts; ask 8 is K.W4. The "8 carried asks" reduce to **4 genuinely-new primitive surfaces + 1 reconciliation + 2 lift-subsumed + 1 K.W4-deferred** — a materially smaller K.W3 than the K.md prose implies. **Flag**: the K plan counts 8 distinct asks; this audit finds 5 of them either already-shipped (UnderlineTabs), or identical to the two lifts (BlobDot=WatercolorDot, Metaballs=GooBlob), or out-of-wave (Aurora-derive).

---

## §7 — The K.W3 work-order (the executable sequence)

Lockstep = glass-ui-commit-then-value.js-consume within each step (`coordination/glass-ui.md:45`). inv-K-4 (TS source-resolution) MUST have landed in K.W2 first, or every glass-ui mid-edit re-reds the demo typecheck.

1. **prng prerequisite** (§2.5) — lift `prng.ts` → `glass-ui/src/composables/prng.ts` + barrel; demo re-points its `@composables/prng` consumers to `@mkbabb/glass-ui`. (Glass-ui commit, then demo consume.) *Gate*: demo typechecks; the 6th glass-ui file the topology spec absorbs.
2. **Shared WebGL bootstrap** (§5) — author `glass/webgl.ts`; refactor aurora `runtime.ts:121-144` to consume it; export from `glass/index.ts`. *Canary*: aurora visual smoke green.
3. **goo-blob lift** (§2) — move the 4 kinematics files + the corrected renderer (D2 resolver-strip, D4 RAF-gate) + `GooBlob.vue` shell with required `resolveColor` prop + `moodTargets` prop; OKLCh shader (D1, §3). *Gate*: glass-ui blob mounts in isolation with an injected resolver. Then demo: `HeroBlob.vue`/`BlobPane.vue`/`App.vue` import from glass-ui, inject `parseCSSColor` resolver; **D6** `BlobPane.vue:85-87` casts removed via typed `SliderSection<BlobConfig>`; delete `demo/@/components/custom/goo-blob/`. *Close-evidence*: D1/D2/D4/D6 grep + runtime gates (§0).
4. **WatercolorDot lift** (§4) — move the 3 files + `filterId` prop; demo's 9 consumers re-point + pass `filter-id="watercolor-filter"`; delete `demo/@/components/custom/watercolor-dot/`. *Subsumes asks 6 (BlobDot) + indirectly nothing else.*
5. **The 4 net-new asks** (§6 rows 1–4) — Select `size`, DockSelectTrigger `clampLabel`, TooltipContent `variant="mono"`, Button `icon-sm`; retire the named demo overrides (`EasingSelector.vue:41`, `ComponentSliders.vue:87`/`HeroBlob.vue:12`, `style.css:191-194`, the icon-button + dock-select sites). Ask 5 reconcile `UnderlineTabs`.
6. **Bootstrap cleanup** — delete `demo/@/lib/animation/webgl-utils.ts`; close-time greps (§5, §2.6, §4).

Each lift (steps 3, 4) is a single reversible paired-commit pair (revert both to back out — `coordination/glass-ui.md:47`). The brittleness window (K.md §8) opens at step 1 and closes when step 6's deletion proofs pass.

---

## §8 — Deletion-proof ledger (the lift idiom — no shims, structural)

The lift is proven by **absence in the demo + presence in glass-ui + both suites green** — not a `proof:*` script (idiom retired, K.md §2). Close-time review (a human runs these greps against the K.W3 diff):

| Proof | Command (close-time) | Expect |
|---|---|---|
| goo-blob deleted | `git status --porcelain demo/@/components/custom/goo-blob/` (all 9 removed) | removed |
| WatercolorDot deleted | `ls demo/@/components/custom/watercolor-dot/` | not found |
| demo webgl-utils deleted | `ls demo/@/lib/animation/webgl-utils.ts` | not found |
| no metaball residue in demo | `grep -rn "useMetaballRenderer\|metaball.frag\|cssColorToRgb" demo/` | zero |
| D1 HSV gone | `grep -rn "rgb2hsv\|hsv2rgb" ../glass-ui/src/components/custom/goo-blob/` | zero |
| D2 no value.js default in primitive | `grep -rn "parseCSSColor\|getImageData" ../glass-ui/src/components/custom/goo-blob/` | zero (inv-K-3) |
| D6 casts gone | `grep -n "as unknown as" demo/@/components/custom/panes/BlobPane.vue` | zero |
| bootstrap once | `grep -rn "function compileShader" ../glass-ui/src demo/` | one (glass/webgl.ts) |
| imports glass-ui | `grep -rn "from \"@mkbabb/glass-ui" HeroBlob.vue BlobPane.vue + the 9 WatercolorDot consumers` | present |

The π visual-runtime lane (K.W6) covers the goo-blob hero, the WatercolorDot dots, and the OKLCh-shader hue-stability — ≥3 viewports × ≥5 animation frames × WCAG-AA contrast.

---

## §9 — Drift flags (doc-vs-reality contradictions found vs. the K plan)

Returned per the binding context. Each is grounded in a read file:line.

1. **WatercolorDot consumer count: K plan says 8, reality is 9** (K.md §5/§6/`coordination/glass-ui.md:35` "8 consumers re-point"). The 9th: `dock/Dock.vue` carries **3** WatercolorDot usages (`Dock.vue:97,99,198`) in addition to the 8 component files — re-point 9 files.
2. **WatercolorDot has an SVG-filter DOM seam the plan omits** — `WatercolorDot.vue:65` `filter: url(#watercolor-filter)`, defined in demo `svg-filters/SvgFilters.vue`. The K plan describes a bare lift; the work-order must add a `filterId` prop (§4) so the primitive stays DOM-self-contained.
3. **`prng` is a lift prerequisite not in the K.md §9 cross-repo file list** — `useBlobSatellites.ts:1` + `useWatercolorBlob.ts:2` import `@composables/prng` (a demo composable). prng must lift to glass-ui (a 6th glass-ui-side file beyond K.md §9's five). §2.5.
4. **3 of the 8 asks are not net-new** (§6): ask 5 (Tabs underline) **already ships** as `glass-ui/.../tabs/UnderlineTabs.vue` (a standalone component, not a `variant` prop — needs reconciliation, not authoring); ask 6 (BlobDot) **is** the WatercolorDot lift; ask 7 (Metaballs API) **is** the GooBlob lift. K.W3's net-new ask surface is 4 props/tokens, not 8 components.
5. **The HSV shader path (D1) and 1×1-canvas resolver (D2) are at the exact lines the audit cites** — `metaball.frag.glsl:93-106,146-157` (HSV) and `useMetaballRenderer.ts:44-70` (resolver) — confirmed, no drift; the OKLCh-LUT (D1) is best served by a **GLSL OKLab path** (primitive default, value.js-free) rather than the LUT-injection seam the K.md prose ("OKLCh-LUT shader") implies — building the LUT-bake injection now is speculative; §3 records the simpler value.js-free GLSL OKLab default as the K.W1 decision (LUT-bake BOOKED to K.W4 if aurora-derive surfaces a shared bake helper).
6. **The demand-driven RAF gate (D4) already exists in aurora** (`runtime.ts:507-548` `needsAnimation`/`wake` + the `SuspendReason` set `:61,210-241`) — the port is a transcription, not a design; but the blob's default config always has orbiting-satellite motion, so the realistic park condition is reduced-motion/tab-hidden/off-screen, not "steady-state pixel-identical" as for aurora. §2.2.
