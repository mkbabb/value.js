> **Mode: planning-only. NO code.** Post-K.W2 re-spec (2026-06-03 audit, Wave 2).
> The BINDING cross-lane corrections (Wave 3) live in
> `../audit/path-forward-2026-06-03-postW2.md §2–§3` — notably: the parseCSSColor
> typing root-fix is **value.js-owned, lands at K.W3** (value.js 0.11.0, before
> glass-ui 3.2.0); the demo `Palette` id-honesty **simplifies** to `id?:` + guards;
> all consumption is **from glass-ui 3.2.0 published dist** (mechanism-C). Cohort
> peer specs: `../coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md`.


# K.W3 (re-spec, post-K.W2.5)

# K.W3 — glass-ui-first consummation, re-specced for PUBLISHED-DIST consumption

**Wave**: K.W3 (IMPL, cross-repo, paired-authorship). **This document authors no code — it is the work-order.**
**Predecessor**: K.W2.5 (the corrective lane — `mechanism-C by deletion`: restore contract-v2 dist-resolution, delete the `development` export condition both repos, retire the 4 band-aids, refresh stale reka-ui). K.W2.5 lands FIRST; K.W3 re-specs on the clean substrate.
**Peer**: glass-ui 3.2.0 lane (the AS / constellation-primitives tranche). The lockstep is **glass-ui-author → glass-ui-publish-3.2.0 → value.js-consume-from-DIST** — NOT mid-edit source consumption.
**Binding invariants**: inv-K-1 (value.js library never imports glass-ui — irrelevant here; both lifts are demo↔glass-ui), inv-K-3 (the blob primitive takes a **required injected color resolver, NO value.js default**), invariant-30 contract-v2 (`development` condition struck; consumers resolve `dist/`; `build:watch` keeps it fresh).

This re-spec supersedes the **consumption model** of the two K.W1 design docs (`K.W1-primitive-lift.md`, `K.W1-grand-audit-refinement.md`). Their *defect analysis* (D1–D9), *lift inventory* (the 4 kinematics files, the renderer, the shader, the 9 consumers), and *the injected-resolver seam* all STAND — they are sound and re-cited verbatim below. What changes is **inv-K-4 mechanism-A is gone**: those docs assumed TS source-resolution against glass-ui `src/` (the `development` condition, the `@mkbabb/value.js → src` self-alias, `check-types.mjs`, fs.allow widening). K.W2.5 deletes all four. So K.W3's W3b consumes glass-ui's **published 3.2.0 dist**, not its live `src/`.

---

## §0 — Why dist-consumption (not mid-edit source) is now MANDATORY

This is the load-bearing change and the reason K.W3 splits into W3a (glass-ui-side, pre-publish) and W3b (value.js-side, post-publish).

The WAVE-1 audit verdict (unanimous, grounded) found that **inv-K-4 mechanism-A — the `development` export condition on all 68 glass-ui exports (glass-ui commit `6d3e151`) + value.js's own exports (`c4c5842`) — is a PRECEPT VIOLATION** of `docs/precepts/cross-repo-dev-resolution.md`:
- §2.1 strikes the `development` key (`The development key is struck. There is no src/ resolution target in the exports map.`);
- §4 invariant-30 (contract-v2) asserts the `development` key is ABSENT and the glass-ui `proof:resolution` gate **forbids** it (fail-closed anti-regression);
- it CAUSED the dual-instance fragility. When the demo source-resolves glass-ui, glass-ui's `src/` is compiled fresh inside the demo's own Vite module graph (§1.1 of the precept: "multiplying the sibling's TypeScript across every consumer's module graph"). glass-ui ships its own nested `vue` + `reka-ui` in `node_modules`; source-resolution surfaced a Teleport-patch crash (`insertBefore` NotFoundError) when a source-resolved glass-ui dropdown mounts its portal against a split `@vue/runtime-*` internal (`vite.config.ts:41-48`). The band-aids — `resolve.dedupe` of `@vue/*`+`reka-ui` (`vite.config.ts:49-56`), the `@mkbabb/value.js → src` self-alias (`vite.config.ts:37`, itself a §2.4 PROHIBITION on self-aliasing a package's own published name), `check-types.mjs`, the `fs.allow` widening (`vite.config.ts:97`) — are symptomatic patches over a resolution defect, not a fix.

**K.W2.5 corrects this by DELETION**: restore contract-v2 dist-resolution (delete the `development` condition both repos → glass-ui's `proof:resolution` gate goes green), resolve glass-ui's **DIST** in the demo (one externalized vue/reka instance → the dual-instance class is GONE), retire the 4 band-aids, plain `vue-tsc -p` typecheck (delete `check-types.mjs`), KEEP the `tsconfig.lib`/`tsconfig.demo` split (inv-K-1, sound), populate `dev.sh` `SIBLING_WATCH_BUILDS=(../glass-ui)`, refresh the single stale reka-ui 2.8.2 install → ^2.9 + lockfile guard.

**The consequence for K.W3**: after K.W2.5 the demo consumes glass-ui from its **published `dist/`**. If K.W3 lifted goo-blob/watercolor-dot into glass-ui `src/` and the demo consumed them mid-edit (source), the dual-instance hazard K.W2.5 just deleted would **reappear** — the lifted WebGL components mount portals/contexts and would re-trip the exact `@vue/runtime-*` split crash. Therefore the lift MUST be: glass-ui authors the primitives in its 3.2.0 lane (W3a), **publishes 3.2.0** (the cross-repo gate), and only THEN does value.js consume `@mkbabb/glass-ui/goo-blob` + `/watercolor-dot` from the dist surface (W3b). The freshness during W3a development is the `build:watch` (`SIBLING_WATCH_BUILDS=(../glass-ui)` in `dev.sh`, contract-v2 §2.3) — glass-ui's `build:watch` keeps its `dist/` fresh so the demo always resolves the real published shape. There is **one resolution, dist, dev and prod alike** (precept §1.2).

---

## §1 — Tranche identity: K.W3 is a CONTINUATION OF K

K.W2.5 lands first (the corrective lane, already designed). Then W3–W6 are re-spec'd on the clean substrate. The K.W2 work that STANDS untouched: the dedup-as-externalization posture (inv-K-2 color dedup), the `tsconfig.lib`/`tsconfig.demo` split (inv-K-1), the api-lane, dispatch.ts hygiene, the CI/CD topology. K.W3 inherits a green demo build resolving glass-ui dist.

**Corrections to fold (from the WAVE-1 verdict), discharged in this spec**:
1. **VAL-9 was already KILLED at J** (J/FINAL.md §2: the spring emitter exists in keyframes.js, glass-ui consumes its `--spring-*`). Do NOT invent a "VAL-9 spring emitter" for keyframes 3.0.0. The W3-4 spring-mood refinement (`K.W1-grand-audit-refinement.md §2`) uses glass-ui's **existing** `useSpring` (which already regenerates from keyframes' emitter) — no new emitter, no library code. Strike the VAL-9 re-bookings in K.md §7 and L.md §10 (work-order entry below).
2. **J.W3 PaletteDiff.vue is a fired-trigger orphan** to re-home in K.W3 (J/FINAL.md §3: the `/diff` route shipped + green; the demo CSS-Custom-Highlight diff render was booked to dispatch at K.W2-close, which has now FIRED). The component does not yet exist in the demo tree (confirmed: `grep -rln PaletteDiff demo/` → zero). K.W3 §6 authors it.
3. **`parseCSSColor` public return type is too loose** (bare `ValueUnit` at `src/parsing/color.ts:613-614`), causing a **9-site cast epidemic** in the value.js demo (`as ValueUnit<Color<ValueUnit<number>>, "color">` at `useContrastSafeColor.ts:80`, `useAppColorModel.ts:53`, `useMarkdownColors.ts:24`, `color-picker/index.ts:41`, `useColorParsing.ts:31,34,88`, `useColorUrl.ts:36`, `useColorModel.ts:29`) plus the glass-ui aurora `cssToOklch` cast. **Fix at root in value.js** (this is a library-`src/` change — inv-K-1-clean, glass-ui-free). §7 specs it.
4. **The reka-ui issue is a SINGLE STALE install** (confirmed: `node_modules/reka-ui` is `2.8.2`; `package.json` declares `^2.0.0`), not two instances. K.W2.5 refreshes it to `^2.9` + a lockfile guard. K.W3 inherits the fresh install.

---

## §2 — The two-phase shape: W3a (glass-ui pre-publish) · W3b (value.js post-publish)

| Phase | Repo | Gate to advance |
|---|---|---|
| **W3a** | glass-ui (the 3.2.0 lane) | glass-ui authors goo-blob + watercolor-dot + prng + shared WebGL bootstrap + the 4 net-new asks; its own CI green (`proof:resolution` green — `development` gone; build + dts + visual smoke); **`@mkbabb/glass-ui@3.2.0` PUBLISHED** with the new subpath exports |
| **W3b** | value.js (demo) | value.js bumps the `@mkbabb/glass-ui` dep to `^3.2.0`; consumes `/goo-blob` + `/watercolor-dot` from DIST; deletes the demo composables/shaders/webgl-utils; re-points the 9 consumers; D6 cast retirement; J.W3 PaletteDiff; sortable migration; ui/ shim collapse; demo + e2e green |

The cross-repo publish dependency is the hard seam (§9). W3b's first page-load resolves `@mkbabb/glass-ui/goo-blob` through glass-ui's 3.2.0 `exports` map to its built `dist/` — exactly what prod ships. **No `development` condition, no `@mkbabb/glass-ui → src` alias, no fs.allow widening** (all deleted at K.W2.5).

---

## §3 — W3a: glass-ui-side authoring (the lift inventory)

These are **asks to the glass-ui 3.2.0 lane** (paired-authorship, `coordination/glass-ui.md`). value.js's W3b depends on them shipping. The inventory and defect-corrections are carried verbatim from `K.W1-primitive-lift.md §2–§5`; this re-spec changes only the *consumption boundary*, not the lift content.

### §3.1 — goo-blob → `glass-ui/src/components/custom/goo-blob/` (subpath `@mkbabb/glass-ui/goo-blob`)

**Verbatim kinematics moves** (zero color coupling — confirmed by read):
- `useBlobSatellites.ts` (294 LoC; imports `mulberry32`/`hashString` from `@composables/prng` at `:1` → prng must lift, §3.3)
- `useBlobPointer.ts` (69 LoC; pure DOM pointer tracking)
- `useBlobMood.ts` (136 LoC; the 5-mood FSM. Per `K.W1-primitive-lift.md §2.4`: lift the transition mechanism, the **`MOOD_TARGETS` table (`:4-78`) stays demo-side**, injected via a plain `moodTargets` prop. glass-ui ships a generic `DEFAULT_BLOB_MOODS` default)
- `types.ts` (135 LoC: `BlobConfig`, `BLOB_CONFIG_DEFAULTS`, `BLOB_CONFIG_KEY`, `MoodParams`, `MetaballSource`, `SatelliteInternal`, `SatellitePhase`, `BlobMood` — all move; the typed `BlobConfig` is glass-ui-owned, the D6 prerequisite)
- `shaders/metaball.vert.glsl` (verbatim) + `shaders/metaball.frag.glsl` (moves WITH the D1 correction, §3.4)

**The renderer (`useMetaballRenderer.ts`, 343 LoC) moves WITH 3 corrections** (D2/D4 + the resolver seam):

| Defect | Site (confirmed) | Correction in W3a |
|---|---|---|
| **D2** — 1×1-canvas resolver baked into the renderer | `useMetaballRenderer.ts:44-70` (`resolverCtx` + `cssColorToRgb` + the 256-entry `cssColorCache`); consumed at `:184` (`const rgb = cssColorToRgb(color.value)`) | DELETE `resolverCtx`/`cssColorToRgb`/`cssColorCache`. The `UseMetaballRendererOptions` interface (`:72-79`) gains a **required** `resolveColor: (css: string) => [number, number, number]`. `:184` becomes `const rgb = opts.resolveColor(color.value)`. The memoisation moves demo-side into the injected resolver (the primitive must not assume the resolver is cheap). **inv-K-3**: no value.js default; grep glass-ui blob → no `createElement("canvas")` color path, no `parseCSSColor` import. |
| **D4** — always-on 60fps RAF; the always-mounted hero never parks | `:251-253` (`rafId = requestAnimationFrame(render)` unconditional); the `paused`/`tabHidden`/`destroyed` booleans (`:98-100`); the reduced-motion single-frame path (`:278-282,329-335`) | Port aurora's demand-driven gate (`needsAnimation()`/`wake()`, glass-ui `runtime.ts:507-548`) + its `SuspendReason` set. The blob's realistic park condition is `prefers-reduced-motion` OR `tabHidden` OR off-screen (`useIntersectionPause`), since default config always has orbiting-satellite motion. Folds the W3-3 satellite-non-collapse gate (`K.W1-grand-audit-refinement.md §2`: gate `start()` on non-zero `clientWidth` via the existing ResizeObserver at `:265-268`). |
| **footprint==resolution** (W3-1/W3-2, `K.W1-grand-audit-refinement.md §2`) | `GooBlob.vue:96-106` (160% canvas + `translate(-50%,-50%)`); `useMetaballRenderer.ts:19` (`POS_SCALE = 1/1.6`, the counter-scale split across two files) | The glass-ui Metaballs primitive OWNS the footprint==render-resolution contract: layout box stays the declared size; the orbit-overflow halo is an **internal uniform-space token**, NOT a 160% CSS blow-up + counter-scale. One source of size. A `corner-anchor` token nestles the blob in-footprint (the user's "sit properly in the top-left corner"). |

**The component shell** `GooBlob.vue` (`:1-121`) moves to `glass-ui/.../goo-blob/GooBlob.vue` minus affective wiring it does not own. It accepts a **required `resolveColor` prop** (inv-K-3) + existing `color`/`seed` + an optional `moodTargets?: Record<BlobMood, MoodParams>` (defaulting to `DEFAULT_BLOB_MOODS`); keeps `BLOB_CONFIG_KEY` inject + `--blob-color` binding + drop-shadow CSS (`:64-120`, generic — but per W3-5 render the hover shadow on a separate transform-layer, off the live GL RAF path, `K.W1-grand-audit-refinement.md §2`); re-exposes `nudge`/`setMood`/`currentMood` (`:61`). The affective FSM (`HeroBlob.vue`) STAYS demo-side (W3b).

**W3-4 spring mood** (the user's "squishy/reactive enough"): replace `useBlobMood`'s hand-rolled fixed-`TRANSITION_MS` `easeInOut(t)` lerp (`useBlobMood.ts:80-128`) with glass-ui's **existing `useSpring`** (per-param vector toward the injected `moodTargets`, stiffness/damping per mood). **NO new spring emitter** (VAL-9 correction §1) — `useSpring` already regenerates from keyframes.js's `--spring-*`.

### §3.2 — WatercolorDot → `glass-ui/src/components/custom/watercolor-dot/` (subpath `@mkbabb/glass-ui/watercolor-dot`)

The simpler lift — no WebGL, no color math, pure deterministic border-radius morphing (confirmed by read of `WatercolorDot.vue` + `useWatercolorBlob.ts`).
- `WatercolorDot.vue` (108 LoC) + `composables/useWatercolorBlob.ts` (138 LoC; imports `mulberry32`/`hashString`/`randomRadii`/`radiiToCSS` from `@composables/prng` at `:2` → prng must lift, §3.3) move.
- **The SVG-filter DOM seam** (the K.W1 finding the K.md prose omitted): `WatercolorDot.vue:65` applies `filter: url(#watercolor-filter)`, the `<filter>` defined in the demo's `svg-filters/SvgFilters.vue:5` (`id="watercolor-filter"`). The lifted component cannot assume `#watercolor-filter` exists in the consumer DOM. It takes an optional `filterId?: string` prop (default `undefined` → no `url()` filter, falls back to the border-radius morph + box-shadow alone, which already reads organic). The demo passes `filter-id="watercolor-filter"` and keeps `SvgFilters.vue` as the demo-side filter-def owner — DOM-self-contained primitive (inv-K-3-style), exact demo look preserved.

### §3.3 — prng → `glass-ui/src/composables/` (the lift prerequisite, the 6th glass-ui file)

`useBlobSatellites.ts:1` and `useWatercolorBlob.ts:2` both import from `@composables/prng` — a **demo composable** (`demo/@/composables/prng.ts`, Mulberry32). The lifted primitives cannot import a demo path. Lift `prng.ts` (`mulberry32`/`hashString`/`randomRadii`/`radiiToCSS`) to glass-ui (generic deterministic-PRNG, the inv-K-3 profile). The demo re-points its remaining `@composables/prng` consumers to `@mkbabb/glass-ui`. **Pre-step**: enumerate demo prng consumers (`grep -rln "@composables/prng" demo/`) so the lift orphans no demo-only caller.

### §3.4 — D1: the OKLCh shader (retire HSV) — glass-ui-side, value.js-free

The current shader (`metaball.frag.glsl:146-157`) does `rgb2hsv(uBaseColor)` → perturb `hsv.x/y/z` (`hsv.x += … uHueRange/360.0`, `:93-106,146-157`) → `hsv2rgb`. The defect: at low chroma `rgb2hsv` returns an unstable hue (the `atan2(0,0)=0` degeneracy MEMORY.md "HSV hue drift" documents), so `uHueRange` perturbation swings a near-gray through arbitrary hues.

**Fix (primitive default, value.js-free)**: replace the HSV block with a **GLSL OKLab** perturbation (the Björn Ottosson matrices inlined IN GLSL only — inv-K-2 forbids a second *JS/TS* implementation, NOT a GPU shader transform; recorded so close-review does not false-positive). Linearize sRGB → OKLab → cylindrical OKLCh → shift H by `uHueRange`, scale C by `uSatShift`, add `uBrightnessShift` to L → OKLab → linear-sRGB → delinearize. The fix is **structural**: near-gray has `C≈0` so a hue shift moves nothing. Uniform names (`uHueRange`/`uSatShift`/`uBrightnessShift`, `useMetaballRenderer.ts:21-42`) unchanged — only their color-space meaning shifts HSV→OKLCh. The LUT-bake injection seam stays BOOKED to K.W4 (do not build it speculatively — `K.W1-primitive-lift.md §3` decision).

### §3.5 — the shared WebGL bootstrap → one glass-ui helper

The compile/link/quad bootstrap exists three times: (1) demo `@/lib/animation/webgl-utils.ts` (`compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms`, consumed by the renderer at `useMetaballRenderer.ts:2`), (2) aurora's inlined `compile`/`link` (glass-ui `runtime.ts:121-144`), (3) goo-blob's consumption of (1). W3a authors `glass-ui/src/composables/glass/webgl.ts` — the demo `webgl-utils.ts` body moves verbatim (it is already generic, confirmed by read: 4 pure leaf functions, zero demo coupling). aurora's `runtime.ts:121-144` replaces its inlined `compile`/`link` with the shared functions. **KISS boundary**: do NOT fold aurora's bespoke uniform-cache / pre-allocated upload buffers into the shared helper — only the 4 leaf functions are genuinely shared. Close-evidence: `grep -rn "function compileShader" ../glass-ui/src demo/` → one (`glass/webgl.ts`).

### §3.6 — the 4 net-new asks (W3a)

Per `K.W1-primitive-lift.md §6`, the "8 carried asks" collapse: asks 6 (BlobDot) and 7 (Metaballs API) are **subsumed by the two lifts**; ask 5 (Tabs underline) **already ships** as glass-ui `UnderlineTabs.vue` (reconcile, not author); ask 8 (Aurora-derive) is **K.W4**. The 4 genuinely net-new W3a asks:

| # | Ask | glass-ui change | Demo override retired (W3b) |
|---|---|---|---|
| 1 | Select `size` | `ui/select/SelectTrigger.vue` `h-10` hardcode → `size?: 'sm'\|'default'` (`sm`→`h-9`) | `gradient/EasingSelector.vue:41` `h-9` + marker |
| 2 | `DockSelectTrigger clampLabel` | add `clampLabel?: boolean` / `maxLabelCh?: number` ellipsis clamp | demo hand-clamp sites (audit at W3b) |
| 3 | `TooltipContent variant="mono"` (the J/FINAL CH-6 6-tranche chronic, UNBLOCKED → ship-or-kill) | `ui/tooltip/TooltipContent.vue` `variant?: 'default'\|'mono'`; reuse the glass-ui font token (per `feedback_select_font.md`, NOT hardcoded `fira-code`) | `ComponentSliders.vue:87`, `HeroBlob.vue:12` `class="fira-code"` |
| 4 | `Button size="icon-sm"` | `buttonVariants` add `'icon-sm': 'h-9 w-9 p-0'` (size against callsite) | demo hand-sized `<Button size="icon" class="h-9 w-9">` (audit at W3b) |

---

## §4 — W3b: value.js-side consumption (post-glass-ui-3.2.0-publish)

After `@mkbabb/glass-ui@3.2.0` publishes, value.js bumps the dep to `^3.2.0` and executes the consumption + deletion. **Consumption is from DIST** — bare `@mkbabb/glass-ui/goo-blob` / `/watercolor-dot` specifiers resolve through glass-ui's 3.2.0 `exports` map to its built `dist/` (the contract-v2 path). The freshness during co-development is `build:watch` (`dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)`).

### §4.1 — goo-blob consumption + deletion

- `HeroBlob.vue` (`color-picker/visual/HeroBlob.vue`, **stays demo-side**) keeps its entire affective FSM/trigger surface verbatim (idle-timer→sleepy, click→happy, rapid-change→excited, the Tooltip wrapper). Changes: `<GooBlob>` imports from `@mkbabb/glass-ui/goo-blob`; gains `:resolve-color="resolveColor"` (a `parseCSSColor`-backed `(css) => [r,g,b]` wrapper — the demo already imports `parseCSSColor` from `@src/parsing/color` via `useColorParsing.ts`, so the resolver is thin); passes its `MOOD_TARGETS` via `:mood-targets`; the `fira-code` class (`:12`) retires onto the W3a TooltipContent `variant="mono"`.
- `App.vue` wiring: `BLOB_CONFIG_KEY` provider unchanged; the `GooBlob`/`BlobConfig` imports re-point to `@mkbabb/glass-ui/goo-blob`.
- **Delete** `demo/@/components/custom/goo-blob/` (all 9 files: `GooBlob.vue`, `index.ts`, `types.ts`, `composables/{useBlobMood,useBlobPointer,useBlobSatellites,useMetaballRenderer}.ts`, `shaders/{metaball.frag,metaball.vert}.glsl`). Close-evidence: `grep -rn "useMetaballRenderer\|metaball.frag\|cssColorToRgb" demo/` → zero.

### §4.2 — D6: retire the BlobPane casts via typed `SliderSection<BlobConfig>`

`BlobPane.vue:85-87` double-casts through `as unknown as Record<string, unknown>`:
- `:config="(cfg as unknown) as Record<string, unknown>"` (`:85`)
- `:defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"` (`:87`)

The cause: `ConfigSliderPane`'s `config`/`defaults` props are typed `Record<string, unknown>`, losing the `BlobConfig` shape. W3b makes `ConfigSliderPane` generic over the config type (`SliderSection<T>` / `config: T` / `defaults: T`), so `BlobPane.vue` passes the injected `cfg` (now glass-ui's `BlobConfig` from the 3.2.0 dist) and `BLOB_CONFIG_DEFAULTS` directly. The local `s()` helper + `NumericKey` mapped type (`:14-21`) stay. Close-evidence: `grep -n "as unknown as" demo/@/components/custom/panes/BlobPane.vue` → zero; `vue-tsc` green.

### §4.3 — WatercolorDot consumption + deletion (the 9 consumers + the filterId seam)

**Consumer count: 9, not the K.md-prose 8** (drift confirmed by read). The 9 demo files importing `WatercolorDot`:
1. `mix/MixResultDisplay.vue`
2. `mix/MixSourceSelector.vue`
3. `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue`
4. `color-picker/controls/SpectrumCanvas.vue`
5. `color-picker/editing/EditDrawer.vue`
6. `palette-browser/SwatchHoverMenu.vue`
7. `palette-browser/CurrentPaletteEditor.vue`
8. `palette-browser/PaletteDialog/components/PaletteDialogHeader.vue`
9. `dock/Dock.vue` (the 9th — carries **3** usages: `Dock.vue:97,99,198`, import at `:6`)

Each re-points its `WatercolorDot` import to `@mkbabb/glass-ui/watercolor-dot` and adds `filter-id="watercolor-filter"`. `SvgFilters.vue` (the demo filter-def owner, `id="watercolor-filter"` at `:5`) stays. **Delete** `demo/@/components/custom/watercolor-dot/` (3 files). Close-evidence: `grep -rn "watercolor-dot/" demo/` → zero; the 9 consumers import from `@mkbabb/glass-ui/watercolor-dot`.

### §4.4 — bootstrap cleanup

Delete `demo/@/lib/animation/webgl-utils.ts` (consumed only by the now-deleted renderer; confirmed the body lives in glass-ui `glass/webgl.ts` from W3a). Close-evidence: `ls demo/@/lib/animation/webgl-utils.ts` → not found.

### §4.5 — sortablejs → glass-ui `useSortable` (drift-corrected)

**Correction to the brief's `sortablejs->@vueuse/integrations useSortable`**: the demo ALREADY consumes `@vueuse/integrations/useSortable` (`PalettesPane.vue:94,124`) — the brief's stated target is already in place. The K.md §7 ask is `sortablejs → glass-ui useSortable`, and glass-ui **ships its own native `useSortable`** (pointer-capture drag-reorder, NOT sortablejs-backed: `../glass-ui/src/composables/sortable/useSortable.ts:206`, exported, present in the 3.1.1 dist). The genuine W3b move: migrate `PalettesPane.vue` from `@vueuse/integrations/useSortable` to `@mkbabb/glass-ui`'s `useSortable`, then **drop `sortablejs@^1.15.7` + `@types/sortablejs@^1.15.9`** from `package.json` (currently direct deps at `:97`/`:76`; `sortablejs` is otherwise only a `@vueuse/integrations` peer). Net: 2 deps deleted, the drag-reorder runs on glass-ui's first-class primitive. **Decision flag for W3b**: confirm glass-ui's `useSortable` covers the `PalettesPane.vue:124` call shape (list-ref + reactive array + options) before deleting `@vueuse/integrations` reliance; if a gap surfaces, the bare `@vueuse` path stays and only the unused direct `sortablejs`/`@types/sortablejs` deps are pruned.

### §4.6 — collapse `ui/` shims

The `demo/@/components/ui/` tree is 22 files (post-F.W1-Lane-C sweep, confirmed). K.md §7 W3 directs: collapse `ui/*` to bare shims where a glass-ui primitive now covers the surface (the asks 1–4 retire the Select/Tooltip/Button overrides; `VENDOR-POLICY.md` already retired). W3b audits which `ui/` re-exports are now pure pass-throughs to glass-ui and collapses them (no hand-edits to generated shadcn-vue per `demo/CLAUDE.md` — the collapse is at the re-export/barrel level, not inside generated SFCs). Bounded; the god-module cap excludes `ui/`.

---

## §5 — Root fix: tighten `parseCSSColor`'s public return type (library `src/`)

The WAVE-1 verdict: `parseCSSColor`'s public return type is too loose (bare `ValueUnit` at `src/parsing/color.ts:613-614`), forcing a **9-site cast epidemic** in the demo (`as ValueUnit<Color<ValueUnit<number>>, "color">`) + the glass-ui aurora `cssToOklch` cast. **Fix at root in value.js** — this is a library-`src/` change, glass-ui-free (inv-K-1-clean), so it can land independent of the cross-repo publish (it may land at K.W2.5 or early W3b).

The fix: narrow the public signature of `parseCSSColor` to its true shape — it always returns a color-tagged `ValueUnit` wrapping a `Color`. The memoised lambda (`:613`) currently types the return as bare `ValueUnit`; the actual `Value` parser yields `ValueUnit<Color<ValueUnit<number>>, "color">` on success and re-throws (via `utils.tryParse`) on failure (never returns `null` — note the demo casts that append `| null` are over-defensive; the function throws, it does not return null). W3b changes:
1. **value.js (src)**: give `parseCSSColor` the precise return type so callers need no cast. Preserve the memoise wrapper + `keyFn` (the E.W1 Lane D identity override) + the "callers MUST NOT mutate the shared instance" contract (`:605-607`).
2. **Demo (9 sites)**: delete the casts at `useContrastSafeColor.ts:80`, `useAppColorModel.ts:53`, `useMarkdownColors.ts:24`, `color-picker/index.ts:41`, `useColorParsing.ts:31,34,88`, `useColorUrl.ts:36`, `useColorModel.ts:29`. The `| null` union sites become a try/catch or a `tryParseCSSColor` variant if a non-throwing null-returning form is genuinely needed (decide at W3b against each call shape — several sites pass already-validated input and need no null branch).
3. **glass-ui (W3a, cohort)**: the aurora `cssToOklch` cast retires against the same tightened type once glass-ui consumes value.js (the inv-K-2 dedup already routes aurora's color math through `@mkbabb/value.js`).

Close-evidence: `grep -rn "parseCSSColor.*as " demo/` → zero; `vue-tsc` green; the precise type flows.

---

## §6 — Fold J.W3: PaletteDiff.vue (the fired-trigger orphan)

J/FINAL.md §3 booked the **demo CSS-Custom-Highlight diff render** (`PaletteDiff.vue`) to dispatch at K.W2-close (demo green) — that trigger has FIRED (K.W2.5 restores the green demo substrate resolving glass-ui dist). The backend `/diff` route it consumes is **shipped + green** (J api 140/25; `api/src/routes/palettes/diff.ts`, `api/src/services/palette/diff.ts`). The component does NOT yet exist (`grep -rln PaletteDiff demo/` → zero — confirmed).

W3b authors `PaletteDiff.vue` in the palette-browser tree (sibling to `VersionHistoryDrawer.vue`, which consumes `pm.versions`): it calls the `/diff` endpoint via the palette API client (`@/lib/palette/api/versions.ts` — the versions/forks/provenance module) and renders the atom-diff using the **CSS Custom Highlight API** (`Highlight`/`::highlight()` — the modern-web primitive J.W3 specified, no JS-painted overlay). It surfaces the `{fromHash, toHash, ops, identical}` envelope (J/FINAL.md §1 the canonical 4-field shape). Wire it into the version-history flow. **Re-home, not re-design** — the contract is the shipped `/diff` shape. Close-evidence: a Playwright smoke step renders a 2-version diff with the highlight API live (folds into the K.W6 π-lane).

---

## §7 — Discharge: blob-extirpation (the 7+ tranche chronic) + the 4 asks

**Blob-extirpation** (chronic A→K, `demo/CLAUDE.md` "extirpation routes to a successor tranche post-glass-ui-ship"): discharged by the §4.1 + §4.3 + §4.4 deletions. The lift is **proven by deletion** (the lift idiom, no `proof:*` script — retired per `feedback-proof-idiom-retired`): goo-blob (9 files) + watercolor-dot (3 files) + webgl-utils.ts gone from the demo; present in glass-ui 3.2.0 dist; both suites green. After W3b the demo holds only product behavior (`HeroBlob.vue` FSM, the 9 WatercolorDot call-sites, `SvgFilters.vue` filter-def, `BlobPane.vue` tuning).

**The 4 asks** (§3.6 / §4): discharged — Select size, DockSelectTrigger clampLabel, TooltipContent mono (the J CH-6 6-tranche chronic, killed-or-shipped), Button icon-sm; each authored glass-ui-side (W3a) and its demo override retired (W3b). asks 5/6/7 subsumed/reconciled, ask 8 → K.W4.

---

## §8 — Close gates (K.W3)

The wave closes when all hold (close-time human review + the K.W6 π visual-runtime lane; no committed gate script):

| Gate | Check | Expect |
|---|---|---|
| W3a published | `@mkbabb/glass-ui@3.2.0` on the registry with `/goo-blob` + `/watercolor-dot` subpath exports; glass-ui `proof:resolution` GREEN (`development` absent) | shipped |
| dist-consumption (NOT source) | demo `package.json` `@mkbabb/glass-ui: "^3.2.0"`; vite.config has NO `development` condition, NO `@mkbabb/glass-ui→src` alias, NO sibling-`src/` fs.allow widening | clean |
| goo-blob deleted | `git status --porcelain demo/@/components/custom/goo-blob/` (9 removed) | removed |
| watercolor-dot deleted | `ls demo/@/components/custom/watercolor-dot/` | not found |
| webgl-utils deleted | `ls demo/@/lib/animation/webgl-utils.ts` | not found |
| no blob residue | `grep -rn "useMetaballRenderer\|metaball.frag\|cssColorToRgb" demo/` | zero |
| D1 HSV gone | `grep -rn "rgb2hsv\|hsv2rgb" ../glass-ui/src/components/custom/goo-blob/` | zero |
| D2 no value.js default in primitive | `grep -rn "parseCSSColor\|getImageData\|createElement(\"canvas\")" ../glass-ui/src/components/custom/goo-blob/` | zero (inv-K-3) |
| D6 casts gone | `grep -n "as unknown as" demo/@/components/custom/panes/BlobPane.vue` | zero |
| bootstrap once | `grep -rn "function compileShader" ../glass-ui/src demo/` | one (`glass/webgl.ts`) |
| 9 WatercolorDot consumers re-pointed | `grep -rln "@mkbabb/glass-ui/watercolor-dot" demo/` | 9 files |
| parseCSSColor cast epidemic gone | `grep -rn "parseCSSColor.*as " demo/` | zero |
| sortablejs deps dropped | `grep -n "sortablejs\|@types/sortablejs" package.json` | zero (if glass-ui useSortable covers PalettesPane) |
| PaletteDiff homed | `ls demo/@/components/custom/palette-browser/PaletteDiff.vue` + a diff-render smoke step | present + green |
| demo typecheck | `vue-tsc -p tsconfig.demo.json --noEmit` (plain — `check-types.mjs` deleted at K.W2.5) | 0 errors |
| library typecheck | `vue-tsc -p tsconfig.lib.json --noEmit` (glass-ui-free, inv-K-1) | 0 errors |
| suites | `npm test` (vitest) + `npx playwright test` (5 projects) | green, zero console errors |
| lint | `npm run lint` (`--max-warnings=0`) | exit 0 |

The π visual-runtime lane (K.W6) covers the goo-blob hero (footprint==resolution, corner-anchor, spring-mood, OKLCh hue-stability at low chroma), the WatercolorDot dots, and the PaletteDiff highlight render — ≥3 viewports × ≥5 animation frames × WCAG-AA contrast.

---

## §9 — The cross-repo publish dependency (the hard seam)

W3b is BLOCKED until `@mkbabb/glass-ui@3.2.0` ships. The sequence:
1. **glass-ui 3.2.0 lane (W3a)** authors goo-blob + watercolor-dot + prng + `glass/webgl.ts` + the 4 asks; its CI green (`proof:resolution` green with `development` gone, build + dts + visual smoke); **publishes 3.2.0** with the two new subpath exports (`{types, import}` shape, no `development` — contract-v2 §2.1).
2. **value.js W3b** bumps `@mkbabb/glass-ui` to `^3.2.0`, re-installs (the `file:` symlink resolves the 3.2.0 dist), consumes from dist, executes §4 + §5 + §6.

During co-development before the 3.2.0 publish, freshness is `build:watch`: `dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)` (populated at K.W2.5) spawns glass-ui's `build:watch` before the demo dev server, so the demo always resolves a fresh glass-ui `dist/` — the real published shape, exercising exactly what 3.2.0 will ship. This is why dist-consumption is safe DURING development: the watch-build IS the contract-v2 freshness guarantee (precept §2.3), and it never re-introduces the source-resolution dual-instance hazard (glass-ui stays a single externalized peer, vue/reka resolved once from the host).

**Reversibility**: each lift (goo-blob, watercolor-dot) is a single paired-commit pair — revert the glass-ui commit + the value.js consume-commit to back out. The brittleness window opens at the prng prerequisite and closes when the §8 deletion proofs pass on a green 3.2.0-consuming demo.


## EDIT LEDGER

- [glass-ui] src/composables/prng.ts — NEW: lift mulberry32/hashString/randomRadii/radiiToCSS from demo @composables/prng (the §3.3 prerequisite, 6th glass-ui file); add to barrel
- [glass-ui] src/composables/glass/webgl.ts — NEW: lift demo webgl-utils.ts body verbatim (compileShader/linkProgram/createQuadVAO/getUniforms); export from glass/index.ts
- [glass-ui] src/components/custom/goo-blob/ — NEW: lift GooBlob.vue + useBlobSatellites/useBlobPointer/useBlobMood + types.ts + shaders; renderer gains required resolveColor prop (D2), demand-driven RAF gate (D4), footprint==resolution contract (W3-1/2), spring mood via existing useSpring (W3-4, NO new emitter), hover-shadow off GL path (W3-5); subpath export @mkbabb/glass-ui/goo-blob
- [glass-ui] src/components/custom/goo-blob/shaders/metaball.frag.glsl — replace rgb2hsv/hsv2rgb perturbation (:93-106,146-157) with inlined GLSL OKLab/OKLCh perturbation (D1, value.js-free; inv-K-2-clean GPU transform)
- [glass-ui] src/components/custom/aurora/.../runtime.ts:121-144 — replace inlined compile/link with shared glass/webgl.ts functions (canary: aurora visual smoke)
- [glass-ui] src/components/custom/watercolor-dot/ — NEW: lift WatercolorDot.vue + useWatercolorBlob.ts; add optional filterId prop (the SVG-filter DOM seam); subpath export @mkbabb/glass-ui/watercolor-dot
- [glass-ui] ui/select/SelectTrigger.vue — add size?: 'sm'|'default' prop (ask 1)
- [glass-ui] custom/dock/DockSelectTrigger.vue — add clampLabel?/maxLabelCh? ellipsis clamp (ask 2)
- [glass-ui] ui/tooltip/TooltipContent.vue — add variant?: 'default'|'mono' using the glass-ui font token, not hardcoded fira-code (ask 3, the J CH-6 6-tranche chronic)
- [glass-ui] ui/button/index.ts buttonVariants — add size 'icon-sm' (ask 4)
- [glass-ui] aurora cssToOklch — retire the cast once consuming value.js's tightened parseCSSColor type (cohort with §5)
- [glass-ui] package.json — bump to 3.2.0; PUBLISH (the W3b-unblocking cross-repo gate)
- [value.js] src/parsing/color.ts:613-631 — tighten parseCSSColor public return type to ValueUnit<Color<ValueUnit<number>>,'color'>; preserve memoise+keyFn+no-mutate contract (root fix for the 9-site cast epidemic)
- [value.js] demo/@/composables/color/useContrastSafeColor.ts:80 · useAppColorModel.ts:53 · markdown/composables/useMarkdownColors.ts:24 · color-picker/index.ts:41 · color-picker/composables/useColorParsing.ts:31,34,88 · useColorUrl.ts:36 · useColorModel.ts:29 — delete the parseCSSColor casts (9 sites); resolve the over-defensive | null branches per call shape
- [value.js] demo HeroBlob.vue — import GooBlob from @mkbabb/glass-ui/goo-blob; add :resolve-color (parseCSSColor-backed [r,g,b]); pass :mood-targets=MOOD_TARGETS; retire :12 fira-code onto TooltipContent variant=mono; keep the affective FSM/triggers verbatim
- [value.js] demo App.vue — re-point GooBlob/BlobConfig imports to @mkbabb/glass-ui/goo-blob; BLOB_CONFIG_KEY provider unchanged
- [value.js] demo panes/ConfigSliderPane.vue — make generic over config type (SliderSection<T>, config:T, defaults:T) so BlobPane needs no cast
- [value.js] demo panes/BlobPane.vue:85-87 — pass injected cfg + BLOB_CONFIG_DEFAULTS directly via typed SliderSection<BlobConfig>; delete both as-unknown-as casts (D6)
- [value.js] demo — re-point 9 WatercolorDot consumers to @mkbabb/glass-ui/watercolor-dot + add filter-id='watercolor-filter': mix/MixResultDisplay.vue, mix/MixSourceSelector.vue, image-palette-extractor/ImageEyedropper/ImageEyedropper.vue, color-picker/controls/SpectrumCanvas.vue, color-picker/editing/EditDrawer.vue, palette-browser/SwatchHoverMenu.vue, palette-browser/CurrentPaletteEditor.vue, palette-browser/PaletteDialog/components/PaletteDialogHeader.vue, dock/Dock.vue (:6,97,99,198)
- [value.js] demo — re-point remaining @composables/prng consumers to @mkbabb/glass-ui (enumerate via grep first)
- [value.js] demo ComponentSliders.vue:87 — retire fira-code class onto TooltipContent variant=mono
- [value.js] demo gradient/EasingSelector.vue:41 — retire h-9 override onto Select size='sm'
- [value.js] demo — audit + retire the hand-sized icon-button (Button size='icon-sm') and dock-select hand-clamp sites
- [value.js] DELETE demo/@/components/custom/goo-blob/ (9 files) — blob-extirpation proof
- [value.js] DELETE demo/@/components/custom/watercolor-dot/ (3 files) — blob-extirpation proof
- [value.js] DELETE demo/@/lib/animation/webgl-utils.ts — bootstrap-triplicate retired
- [value.js] demo panes/PalettesPane.vue:94,124 — migrate from @vueuse/integrations/useSortable to glass-ui native useSortable (confirm call-shape coverage first)
- [value.js] package.json:76,97 — drop sortablejs@^1.15.7 + @types/sortablejs@^1.15.9 if glass-ui useSortable covers PalettesPane
- [value.js] demo @/components/ui/ — collapse now-pass-through shims to glass-ui (barrel/re-export level; no generated-SFC hand-edits)
- [value.js] demo palette-browser/PaletteDiff.vue — NEW: consume /diff via api/versions.ts; render {fromHash,toHash,ops,identical} via CSS Custom Highlight API; wire into version-history (J.W3 fired-trigger re-home)
- [value.js] docs K.md §7 + L.md §10 — strike the VAL-9 spring-emitter re-bookings (VAL-9 KILLED at J; useSpring already consumes keyframes' emitter)


## GATES

- glass-ui @3.2.0 published with /goo-blob + /watercolor-dot subpath exports; glass-ui proof:resolution GREEN (development absent)
- demo consumes glass-ui from DIST: package.json @mkbabb/glass-ui ^3.2.0; vite.config has no development condition, no @mkbabb/glass-ui→src alias, no sibling-src fs.allow widening
- git: demo/@/components/custom/goo-blob/ (9 files) + watercolor-dot/ (3 files) + lib/animation/webgl-utils.ts deleted
- grep -rn 'useMetaballRenderer|metaball.frag|cssColorToRgb' demo/ → zero
- grep -rn 'rgb2hsv|hsv2rgb' ../glass-ui/src/components/custom/goo-blob/ → zero (D1)
- grep -rn 'parseCSSColor|getImageData|createElement("canvas")' ../glass-ui/src/components/custom/goo-blob/ → zero (D2 / inv-K-3)
- grep -n 'as unknown as' demo/@/components/custom/panes/BlobPane.vue → zero (D6)
- grep -rn 'function compileShader' ../glass-ui/src demo/ → one (glass/webgl.ts)
- grep -rln '@mkbabb/glass-ui/watercolor-dot' demo/ → 9 files
- grep -rn 'parseCSSColor.*as ' demo/ → zero (cast epidemic gone)
- PaletteDiff.vue present + a Playwright diff-render smoke step green (CSS Custom Highlight live)
- vue-tsc -p tsconfig.demo.json --noEmit → 0 errors (plain; check-types.mjs deleted at K.W2.5)
- vue-tsc -p tsconfig.lib.json --noEmit → 0 errors (glass-ui-free, inv-K-1)
- npm test (vitest) + npx playwright test (5 projects) green, zero console errors
- npm run lint (--max-warnings=0) exit 0


## DEPENDENCIES

- K.W2.5 (corrective lane) MUST land first: development condition deleted both repos, 4 band-aids retired (dedupe / @mkbabb/value.js→src self-alias / check-types.mjs / fs.allow widening), tsconfig.lib/demo split KEPT, dev.sh SIBLING_WATCH_BUILDS=(../glass-ui) populated, reka-ui refreshed ^2.9 + lockfile guard, glass-ui proof:resolution green
- K.W2 green substrate (the dedup inv-K-2, tsconfig split inv-K-1, api-lane, dispatch hygiene, CI/CD) — sound and standing
- glass-ui 3.2.0 lane (W3a) authors + PUBLISHES the primitives — the hard cross-repo gate; W3b is blocked until 3.2.0 ships
- glass-ui build:watch + value.js dev.sh SIBLING_WATCH_BUILDS=(../glass-ui) provide dist-freshness during co-development (contract-v2 §2.3)
- J.W3 PaletteDiff trigger FIRED at K.W2-close (demo green substrate); backend /diff shipped + green at J
- parseCSSColor root fix (§5) is library-src, glass-ui-free — may land at K.W2.5 or early W3b, independent of the publish
- K.W4 (aurora-derive) consumes the same clean substrate AFTER K.W3; the LUT-bake injection seam stays booked there; the W3a OKLCh-LUT (D1) ships the GLSL OKLab default now