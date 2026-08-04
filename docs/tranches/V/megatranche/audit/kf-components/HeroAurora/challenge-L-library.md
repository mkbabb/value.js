claude-opus-5[1m]

# CHALLENGE · HeroAurora · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/HeroAurora.vue` (129 lines; 62 lines of prose, 52 lines of code, 15 lines of scoped CSS)
**Mount site** `demo/app/App.vue:43-46` — `<template v-if="isHome" #backdrop><HeroAurora /></template>`, i.e. the landing route's backdrop layer, mounted/unmounted with the home scene.
**Imports read whole** (5): `vue` (`useTemplateRef`) · `@vueuse/core` (`useEventListener`) · `@mkbabb/glass-ui/aurora` → `Aurora`, `PAPER_WASH_GROUND`, `resolveAtoms`. The glass-ui side was read at BOTH ends: producer source `/Users/mkbabb/Programming/glass-ui/src/components/aurora/**` and the **installed** `keyframes.js/node_modules/@mkbabb/glass-ui@7.0.0/dist/**` (the artifact the demo actually runs).
**Tree** keyframes.js HEAD `8281638c` (same HEAD the census lanes read); `HeroAurora.vue` is **clean at HEAD** (`git status --porcelain` on the path → empty), so every line citation below is both working-tree and committed truth. glass-ui producer read at `7.0.0`.
**Mode** static + source-derived, read-only. No browser tooling, no dev server, no installs. Two probes executed (both in scratchpad, both read-only against the installed dist — see §6). Nothing in any product repo was written.
**Verdict** the component is **defective**: 1 BLOCKER, 6 MAJOR, 5 MINOR, 4 INFO — and simultaneously **exemplary** on 7 named counts (L-18 runs both ways). Its central design claim ("the cursor light, DONE RIGHT" — the cursor-as-light axis) is **provably not wired**, machine-confirmed twice.

---

## 0. Headline

| id | severity | finding |
|---|---|---|
| **D-1** | **BLOCKER** | `interactivity: { light: true }` (`:70`) is a **TS2345 type error** against the installed glass-ui 7.0.0 **and** is silently dropped at runtime — the named feature is dead. Both proven by execution (§6). |
| D-2 | MAJOR | `initStrategy: 'eager'` (`:28`) puts GPU acquisition + shader compile-link on the **first-paint critical path**, for an `aria-hidden` decorative layer — bypassing the library's idle+intersection gate. The file's own comment (`:8`) claims the opposite ("the lazy WebGL arm past first paint"). |
| D-3 | MAJOR | Under `prefers-reduced-motion`, every forwarded `pointermove` triggers a **synchronous full-viewport WebGL draw inside the input task** of a frame that cannot change. The rAF-coalescing claim at `:81-82` does not hold on that path. |
| D-4 | MAJOR | **No `.vue` file in keyframes.js is ever typechecked** — no `vue-tsc` dependency, `check` = plain `tsc`, and the CI gate (`tsconfig.lib.json`) excludes `demo/` by design. D-1 is structurally invisible to the repo. |
| D-5 | MAJOR | Both cited oracles (`proof:cursor-light-subtle`, `proof:no-hand-rolled-cursor-tracker`) were **dissolved at `70b32501`**. The owner-ruled `0.1` bound and the no-hand-rolled-tracker guard are now prose only; zero test coverage anywhere for this component. |
| D-6 | MAJOR | Dark-leg: the config is built once at setup with no `lightnessScheme` and no theme reactivity, while `:55-56` claims the wash "previews the blessed hue, **both themes**". The library names this exact defect and ships the lever. |
| D-7 | MAJOR | Phantom-dep bite (folds **lane-frontend F-1**): this file's `@mkbabb/glass-ui/aurora` import is unresolvable from a clean `npm ci` — 4 of its 5 imports are locked, the load-bearing one is not. |
| D-8 | MINOR | Spread-order shadowing: `PAPER_WASH_GROUND.saturation` (0.92) overrides the `colorEnergy`-derived 0.913. `:59-60` "atoms are the P-HERO blessed values verbatim" is not literally true. |
| D-9 | MINOR | `e.pointerType !== "mouse"` (`:87`) excludes **pen hover**, which has the mouse's interaction shape, not touch's. |
| D-10 | MINOR | The magic `1` in `setCursor(x, y, 1)` (`:94`) raises the library's cursor-strength ceiling from 0.8 to max — undocumented, and in tension with the "more subtle" amendment. |
| D-11 | MINOR | No `clearCursor` on tab-blur / `visibilitychange` — the field stays engaged at the stale attractor across a tab switch. |
| D-12 | MINOR | `motion: "drifting"` holds `needsAnimation()` true forever, so the 10%-presence layer keeps a full-viewport rAF loop open for the whole home session. The amendment cut presence, not cost. |
| D-13 | INFO | `rendererStatus` emit + `onInitError` prop both ignored, and `main.ts` installs no `app.config.errorHandler` → an init failure is unobserved (degradation is graceful). |
| D-14 | INFO | `height: 100dvh; width: 100dvw` (`:118-119`) is redundant against `fixed inset-0` and opts the layer into the dynamic viewport. |
| D-15 | INFO | Three explicitly-passed library defaults (`harmony`, `zones.arrangement`, `render-mode="auto"`) — defensible pinning, recorded so a future reader does not read them as overrides. |
| D-16 | INFO | `{ passive: true }` on `pointerleave` (`:109`) is inert — the event is not cancelable. |

Superlatives: **S-1..S-7** in §3.

---

## 1. The file's claims vs. the tree

The component is unusually talkative (48% prose). That is only a virtue when the prose is true. Audited claim-by-claim:

| # | claim (line) | verdict |
|---|---|---|
| 1 | "Aurora owns the rAF-coalescing" (`:6`) | **partly false** — holds on the animated path, breaks under PRM (D-3) |
| 2 | "the PRM-safe CSS-gradient substrate (renderMode auto)" (`:6-7`) | **TRUE** — `resolveRenderMode` + the live-matchMedia freeze; S-5 |
| 3 | "the decorative DPR budget" (`:7`) | **TRUE** — `runtime.ts:315` `dprPolicy: resolveAuroraWashDpr`, the decorative-wash ceiling (`budget.ts:14,67`) |
| 4 | "the lazy WebGL arm past first paint" (`:8`) | **FALSE** — `:28` forces `initStrategy: 'eager'` (D-2) |
| 5 | "sits UNDER the grid lines … by document order alone" (`:8-12`, `:115-117`) | **TRUE** — falsifier tested and held; S-4 |
| 6 | "`proof:cursor-light-subtle` … REDs the oracle" (`:17-19`, `:44-45`) | **FALSE** — oracle dissolved (D-5) |
| 7 | "`proof:no-hand-rolled-cursor-tracker` stands guard" (`:5`) | **FALSE** — same dissolution (D-5) |
| 8 | "the wash previews the blessed hue, both themes" (`:55-56`) | **UNSUPPORTED** — one fixed light-band ramp, no theme input (D-6) |
| 9 | "The cursor-as-light interactivity axis is ON" (`:57-59`) | **FALSE** — dropped by the door; dead three ways over (D-1) |
| 10 | "Field atoms are the P-HERO blessed values verbatim; ONLY the opacity ceiling moved" (`:59-61`) | **FALSE in detail** — `saturation` is re-pinned by the ground spread (D-8) |
| 11 | "This handler does no DOM geometry read at all" (`:78-79`) | **TRUE** — S-2 |
| 12 | "setCursor only stashes uniforms" (`:81`) | **FALSE in detail** — it also re-pins the strength ceiling and wakes the loop (D-3, D-10) |
| 13 | "tears both listeners down with the component scope" (`:101-103`) | **TRUE** — S-3 |

---

## 2. Defects

### D-1 · BLOCKER · the cursor-as-light axis is type-invalid AND dead
`HeroAurora.vue:62-73` — `resolveAtoms({ … interactivity: { light: true } })` with **no `medium` atom**.

*Type side.* `AuroraAtoms` is a discriminated union (installed `dist/components/aurora/composables/atoms.d.ts:164-175`): the arm that omits `medium` types `interactivity` as `AuroraSmoothInteractivityAtom`, whose `light?: never` (`:83`); the arm that accepts `light?: boolean` **requires** `medium`. So the call satisfies neither arm. Executed against the installed 7.0.0 d.ts under the repo's own compiler flags (§6, probe 1):

```
probe.ts(5,21): error TS2345: Argument of type '{ seed: string; … interactivity: { light: true; }; }'
  is not assignable to parameter of type 'AuroraAtoms | undefined'.
    Property 'medium' is missing … but required in type '{ medium: { kind: … }; interactivity?: AuroraPainterlyInteractivityAtom; }'.
```

The control (same atoms **plus** `medium: { kind: "crayon" }`) compiles clean.

*Runtime side.* The shipped door gates `light` on the atom-level medium — installed `dist/aurora.js`: `medium?.kind !== void 0 && e.medium.kind !== "smooth" ? e.interactivity.light : void 0`, and it **replaces** `cfg.interactivity` wholesale (`glass-ui/src/…/atoms.ts:365-378`). Executing the exact composition (§6, probe 2):

```
config.interactivity = {"swirl":true,"amplitude":0.5}        ← light is GONE
cured.interactivity  = {"light":true,"swirl":true,"amplitude":0.5}
config.medium = "crayon"   saturation = 0.92   impasto = 0   alpha = 1
```

*Root cause, precisely.* `PAPER_WASH_GROUND` **carries the medium** (`presets.ts:461-482`, `medium: "crayon"`) and is spread **after** the door has already decided the light gate against the base default (`DEFAULT_AURORA_CONFIG.medium === "smooth"`, verified). The medium is chosen after the knob that depends on it has been resolved.

*Depth of the death.* Even if `light` survived, it would be inert on this config: `uLightDir` is read only by `relightImpasto` (`brush.glsl.ts:269-292`), whose every term is multiplied by `uImpasto` — and the ground pins `impasto: 0`; and the crayon body (`mediums.glsl.ts:152-200`, dispatched at `aurora.frag.ts:425`) never calls it. The cursor still *reads* — via `swirl`, which defaults true (`atoms.ts:374`) and drives `uCursorStrength` (swirl `aurora.frag.ts:296-312`, luminance lean `:436-439`). So the visible behaviour is close to intended; the **mechanism named in the file is not the mechanism running**, and one of the two knobs the owner's design rests on is silently discarded.

*Cure (one line, proven to typecheck):* add `medium: { kind: "crayon" }` to the atoms — it also makes the `crayon`/`PAPER_WASH_GROUND` pairing explicit at the door instead of arriving by spread.

*Falsifier:* show `resolveAtoms` reads the medium from anywhere other than `atoms.medium` when gating `light`, or show `light` re-entering the config after the spread. Neither survives — the composed object is printed above. (A *visual* claim is not made: the pigment difference is UNPROVEN-NEEDS-LIVE and is expected to be nil, per the impasto/crayon reading.)

### D-2 · MAJOR · eager GPU arm on the first-paint critical path
`HeroAurora.vue:28` — `:runtime-options="{ initStrategy: 'eager' }"` on an `aria-hidden` decorative wash.

The library documents `"deferred"` as the default *because* it protects first paint, and `"eager"` as the **capture / thumbnail-baking** door (`dist/components/aurora/composables/runtime.d.ts` `AuroraInitStrategy`; `Aurora.vue.d.ts` docblock: "Capture / thumbnail-baking consumers pass `runtimeOptions.initStrategy: "eager"`"). The demo is neither: `grep -rln "aurora" scripts/` → **no output**; no capture or visual gate touches this layer, so no harness needs the synchronous arm.

Consequence chain: `useAurora.ts:183-184` sets `eager` → `:255-258` calls `armRuntime()` straight out of `onMounted`, **skipping both** `scheduleAfterFirstPaint` (requestIdleCallback / double-rAF) and the `useIntersectionPause` gate the deferred path installs (`:270-299`). `armAsync` (`useGpuSubstrate.ts:280-327`) presizes, then — on the WebGL2 leg — "**The WebGL2 net is synchronous — arm it immediately**" (`:314-316`): context creation plus the full aurora program compile-link, inside the mount commit, before the browser can paint. `main.ts:32-54` gates `app.mount()` behind the engine warm + font decode precisely to protect that paint, and `vite.config.ts:345-346` ships `criticalCSSPlugin`/`deferLazyCSSPlugin` for the same budget — this prop spends what the rest of the boot buys. Amplifier: home is mounted/unmounted per navigation (`App.vue:44`), so the eager arm re-runs on **every return to home**, not just cold boot.

*Falsifier:* a live boot trace showing no main-thread block attributable to aurora context/compile before FCP (plausible on the WebGPU leg, which awaits the adapter and yields — `useGpuSubstrate.ts:285-291`), or a named consumer/gate that requires the synchronous arm. Escalates to BLOCKER if the SS-13 live pass attributes >50 ms; the cohort at risk is any engine without WebGPU. UNPROVEN-NEEDS-LIVE for magnitude only — the code path is certain.

### D-3 · MAJOR · under PRM, one synchronous full-viewport draw per pointermove
`HeroAurora.vue:86-95` forwards every `pointermove` to `setCursor`; `:81-82` justifies the lack of throttling ("Aurora's frame loop uploads once per rAF, so a 120-1000 Hz pointer collapses to one write per frame").

That guarantee is rAF-shaped, and under PRM there is no rAF. `runtime.ts:384-396` — `setCursor` ends in `canvasHandle.wake()`. `createCanvasLifecycle.ts:250-254`:

```ts
function wake(): void {
    if (!armed || !isRunning() || raf || !hooks) return;
    if (reducedMotion) tick();            // ← synchronous frame, in the caller's task
    else raf = requestAnimationFrame(tick);
}
```

Under PRM `tick()` never reschedules (`:247` `raf = !reducedMotion && … ? rAF(tick) : 0`), so the `raf` short-circuit is always 0 and the `reducedMotion` branch is always taken. PRM does **not** enter the suspend set (`:237-239` "gates the RESCHEDULE not the suspend set"), so `isRunning()` stays true, and `initStrategy:'eager'` (D-2) guarantees `armed`. Each forwarded event therefore executes `hooks.frame(t)` → `drawFrame` (`frameLoop.ts:146-174`) — a full-screen fragment-shader draw — **inside the input handler's task**. And the frame is identical every time: `setPointer` early-outs under PRM (`usePointerVelocityField.ts:287-292`) and `masterTempo()` is 0 (`frameLoop.ts:142-144`), so nothing the draw reads has moved. Pure wasted work, charged to the cohort that asked for less motion, and charged to input latency rather than to a frame callback.

*Falsifier:* show `wake()` cannot draw on the PRM path (`armed`/`isRunning()` false), **or** show all four target engines coalesce `pointermove` to ≤1/frame *and* that one decorative-DPR draw costs <1 ms — in which case the cost equals the non-PRM steady state and only the input-task attribution remains. Rate-dependence is UNPROVEN-NEEDS-LIVE; the absence of coalescing on this path is proven from source.
*Cure:* early-out the handler under PRM (the wash is frozen anyway), or forward at most once per rAF.

### D-4 · MAJOR · the repo cannot typecheck this file at all
`package.json` has **no `vue-tsc`** (`devDependencies['vue-tsc'] → ABSENT`); `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`. Plain `tsc` does not read SFCs, so every one of the demo's 58 `.vue` files (11 984 lines — lane-frontend §9) is outside type coverage. The CI-gating config makes it explicit rather than accidental: `tsconfig.lib.json` `"include": ["src/"]` with the comment "*the CI gate runs this so a clean runner type-checks ONLY the publishable surface (`src/`) — never the demo, whose later consumer commit imports registry Glass*". So D-1 — a hard TS2345 in a shipping component — cannot be seen by any gate in the tree. Extends **lane-library** (line 63, the scripts inventory) with the consequence that inventory implies.

*Falsifier:* a `vue-tsc`/`vti`/IDE-parity step anywhere in `.github/workflows/{ci,deploy-pages,release}.yml` that reads `.vue`. Grep for `vue-tsc` across `package.json` + all three workflows returns nothing.

### D-5 · MAJOR · the file cites two dissolved oracles; nothing guards the owner's bound
`:5` ("`proof:no-hand-rolled-cursor-tracker` stands guard") and `:17-19` / `:44-45` ("asserted by `proof:cursor-light-subtle` (OWNER) — raising it past the amendment REDs the oracle"). Neither key exists: the only surviving `proof:*` scripts are `proof:publish` and `proof:owner-golden`; `find scripts -iname "*cursor*"` → empty; the names now live only in `docs/tranches/T/verdicts/APPEARANCE-WAVES.json:54-55` and the U-tranche audit's CLASS-3/CLASS-4 retirement lists. `70b32501 refactor(tranche-u): dissolve the proof apparatus around direct product checks` is the dissolution. Nothing replaced them: `grep -rn "HERO_AURORA\|HeroAurora\|opacityCeiling"` over `test/`, `scripts/`, `src/` → **zero hits**, while 27 demo test files exist (including `test/demo/scenes/scene-raf-leak.test.ts` and `test/demo/instrument/KfPillTabs.test.ts`). An owner-ruled numeric bound and a global `pointermove` listener sit in the one demo component with no oracle of any kind.

*Falsifier:* any executable check — script, vitest, lint rule, CI step — that fails when `HERO_AURORA_OPACITY_CEILING` is raised to 0.15, or when a hand-rolled `--mouse-x` tracker reappears. None found.
*Cure:* one vitest assertion in the `scene-raf-leak` mould (mount, assert the resolved ceiling ≤ 0.1 and the two listeners' teardown) — cheaper than the prose already spent claiming it.

### D-6 · MAJOR · the dark leg is unaddressed while the comment claims both themes
`:62-73` builds `config` **once**, non-reactive, from a fixed seed with no `lightnessScheme` and no theme input; `:55-56` asserts the wash "previews the blessed hue, both themes". The library documents the exact failure mode and the exact lever (`atoms.ts:140-148`): `lightnessScheme: "dark"` "*shifts the WHOLE ramp into the luminous-dark band … never a washed-pale salmon field with dark cards floating on it (the dark-leg defect)*"; absent it, a seeded derive takes the light-pastel band. The demo has a live global dark mode (`useGlobalDark` at `CSSCodeEditor.vue:38`, `SpringHeatmap.vue`), and `.grid-background` deliberately retints from `--foreground` so the ink follows the theme (`EditorShell.vue:238-250`) — the wash under it does not.

Mitigation, stated fairly: at `opacityCeiling` 0.1 the wash is a whisper, so the dark-leg error is scaled by 0.1 — this is a register error, not a broken page.
*Falsifier:* a live dark-theme capture of the home route showing the wash reading as a violet tint rather than a pale film, or evidence that `deriveAurora`'s default band is already theme-neutral. Visual magnitude UNPROVEN-NEEDS-LIVE; the missing lever is structural.

### D-7 · MAJOR · phantom-dep bite (folds lane-frontend F-1)
`:37-41` imports `@mkbabb/glass-ui/aurora`. Re-verified at this tree: `@mkbabb/glass-ui` is absent from `package.json` (`dependencies` = `{@mkbabb/value.js}` only) and absent from `package-lock.json`, while 7.0.0 sits installed. HeroAurora's other four import edges (`vue ^3.5.35`, `@vueuse/core ^14.3.0`) are declared **and** locked — so this component is precisely as reproducible as its one undeclared edge. It is also the **sole** consumer of the `/aurora` subpath (lane-frontend §3.1, count 1), so no sibling shares the blast radius: a clean `npm ci` + `vite build --mode gh-pages` dies at `:41` (deduction; installs are forbidden here as they were there).

*Falsifier:* find a glass-ui entry in the lockfile, a workspace/submodule link, or an `.npmrc` registry alias that makes the specifier resolvable without the pre-existing `node_modules`. `.gitmodules` declares only `docs/precepts`; the install is a real directory, not a symlink (lane-frontend §2).

### D-8 · MINOR · the ground spread shadows a knob the comment calls verbatim
`:62-73` spreads `PAPER_WASH_GROUND` **last**, so its 12 keys win. One of them collides with an atom-derived field: `saturation`. Measured (§6, probe 2): atoms alone → `0.913` (`lerp(0.85, 1.2, 0.18)`, `atoms-fields.ts:37`); composed → `0.92`. Today the shadow is numerically inert (0.7%). The trap is durable: any future retune of `colorEnergy` will move `valueVariance`, `breathDepth`, `temperatureShift` and `hueSpread` but **not** saturation, with nothing at the call site to say so.
*Falsifier:* show the spread order reversed, or `saturation` absent from `PAPER_WASH_GROUND` — `presets.ts:479` and the printed object say otherwise.

### D-9 · MINOR · pen hover is excluded with touch
`:87` `if (e.pointerType !== "mouse") return;` — the comment (`:84-85`) justifies excluding **touch** only ("on touch, pointermove fires only mid-drag and would fight the scene gestures"). A hovering pen fires `pointermove` without contact, exactly like a mouse; the allowlist form silently drops it. `e.pointerType === "touch"` expresses the stated rule.
*Falsifier:* evidence that the target pen platforms emit `pointermove` only during contact, or a scene gesture that a pen hover would fight.

### D-10 · MINOR · the magic `1` re-pins a library ceiling
`:94` `aurora.setCursor(x, y, 1)`. The third argument is not a normalized input but the **strength ceiling** itself: `runtime.ts:384-386` `function setCursor(x, y, strength = 0.8) { … cursorStrengthCeil = strength; }`. The demo therefore runs the cursor influence at maximum (0.8 → 1.0) inside a component whose entire amendment is "more subtle", with no comment on the literal.
*Falsifier:* an owner note blessing full cursor strength, or evidence the engagement envelope re-normalizes the ceiling (it multiplies it: `getCursorScalars`, `runtime.ts:253-263`).

### D-11 · MINOR · no cursor release on tab-blur
`:97-99` clears only on `pointerleave` of `documentElement`. Alt-tabbing without moving the pointer out of the document leaves the field engaged; the tab-hidden suspension parks the loop, and on return the wash resumes with the attractor at a stale position. One `visibilitychange`/`blur` listener (same `useEventListener` idiom already in the file) closes it.
*Falsifier:* show the substrate clears the pointer field on `visibilitychange` — `runtime.ts` clears only via `clearCursor`, which nothing else calls.

### D-12 · MINOR · the amendment cut presence, not cost
`motion: "drifting"` (`:69`) resolves to `nucleiDrift .015 / paletteDrift .015 / warpDrift .008 / breathDepth .05` (measured; `MOTION_FIELDS`, `atoms-fields.ts:60`), so `needsAnimation()` (`frameLoop.ts:176-186`) is permanently true and the demand-gated loop never parks while home is on screen. The layer is clamped to 10% compositing presence and sits **under** the graph-paper ink: full-viewport GPU work for the least-visible pixel in the page, for as long as the landing route is open.
*Falsifier:* a live frame-cost measurement showing the decorative-DPR draw is free, or an owner ruling that the drift register (not just the ceiling) is blessed as-is — the P-HERO provenance at `:59-60` argues the latter, which is why this is MINOR and a ruling question, not a fix order.

### D-13 · INFO · silent init-failure posture
Neither the `onInitError` prop nor the `rendererStatus` emit is bound (`:24-30`), and `demo/app/main.ts` installs no `app.config.errorHandler`, so `Aurora.vue:131-141`'s adapter yields `undefined` and a device/shader failure is recorded only in the component-internal `rendererStatus`. For a decorative layer with a palette-derived ground fallback this is a defensible posture — recorded because D-2 raises the failure probability (eager arming on unknown hardware) and because the demo's LoAF/observability discipline elsewhere would normally notice.
*Falsifier:* an `errorHandler` installed anywhere in the demo entry, or a console/telemetry sink for `rendererStatus`.

### D-14 · INFO · `100dvh/100dvw` is redundant, and opts into the dynamic viewport
`fixed inset-0` (`:21`) already sizes the box to the viewport; `:118-119` re-states it in `dv*` units (over-constraining `right`/`bottom`, which are then ignored), and the `@supports not (height: 100dvh)` block (`:122-127`) restates it again for pre-`dvh` engines. Two honest defences: the sibling `.grid-background` uses the identical `h-dvh w-dvw` idiom (`EditorShell.vue:13`), so the two layers stay mutually aligned; and `100dvw` is scrollbar-inclusive, which matches the `window.innerWidth` normalization basis at `:90` (S-2). The residue is that `dvh` tracks mobile URL-bar collapse where `inset-0` would not — a ResizeObserver churn path that only bites if the shell ever scrolls (it is `h-dvh overflow-hidden`, so today it does not).
*Falsifier:* a scrollable mobile layout where the layer resizes mid-scroll, or a browser where `inset-0` and `100dvw` disagree visibly.

### D-15 · INFO · three explicit library defaults
`harmony: "analogous"` (`atoms.ts:279` `?? "analogous"`), `zones.arrangement: "composed"` (`:323` `?? "composed"`), `render-mode="auto"` (prop default). Not defects — pinning a default against library drift is sound — but a reader cannot tell an override from a restatement here.

### D-16 · INFO · inert `passive` on `pointerleave`
`:109`. `pointerleave` is not cancelable; the flag has no effect. Harmless, and consistent with `:104` where it is meaningful.

---

## 3. Superlatives (L-18, the other direction)

**S-1 · the primitive was consumed, not re-invented.** The whole point of the file: the hero wash rides glass-ui's **public** `Aurora` (`:24-30`) instead of a second hand-rolled `--mouse-x` tracker (`:3-5`). Delegated wholesale and verified library-side: rAF coalescing + demand gate (`createCanvasLifecycle.ts:241-254`), the software-raster guard and render-mode resolution (`Aurora.vue:112-115`), the decorative DPR ceiling (`runtime.ts:315` → `budget.ts:14,67`), the palette-derived frame-0 ground, and the compositing envelope prop rather than a demo-side `opacity` (`Aurora.vue:198`). Against lane-frontend's shadow census this is the **inverse** of S-1..S-7: the one component that reached for the primitive it needed. *Falsifier:* find demo-side re-implementation of any of those five concerns in this file — there is none; the file is 52 lines of code.

**S-2 · zero layout reads in the hot path, and the normalization basis is coherent.** `:86-95` uses `clientX / window.innerWidth` — no `getBoundingClientRect`, no `setProperty`, no style flush — a deliberate cure of the T-CL-3 read-after-write recurrence named at `:76-78`. Subtle bonus: `innerWidth` is scrollbar-inclusive, which is exactly what the element's `100dvw` sizing gives (D-14), so there is no drift between the normalized cursor and the painted field; had the layer relied on `inset-0` alone, the basis would be off by the scrollbar width. *Falsifier:* any geometry read on the handler path, or a scrollbar configuration where the two bases disagree.

**S-3 · teardown is by scope, with no leak surface.** Two `useEventListener` registrations (`:104-110`), no `addEventListener`/`removeEventListener` pair, no `onUnmounted`, no module-level mutable state (the `let last` velocity cache was correctly deleted with the retired API at `13530f70`). Home-only mounting means both listeners die with the layer; the GL context teardown is the library's. *Falsifier:* a heap snapshot showing retained listeners or GL contexts across home→scene→home cycles (UNPROVEN-NEEDS-LIVE, and D-2 makes the re-arm cost worth watching there).

**S-4 · the layering claim is TRUE — falsifier tested.** `:115-117` claims paint order by document order with "no z-index games". A `position: fixed` box paints in the positioned-descendant layer, so the claim would be **false** if `.grid-background` were unpositioned. Checked: `EditorShell.vue:13` gives it `fixed inset-0` too. Two positioned siblings at `z-index: auto` in one stacking context ⇒ tree order decides, and the `#backdrop` slot is emitted before the grid (`EditorShell.vue:5-14`). Claim survives. *Falsifier remaining:* a live capture showing the wash over the ink.

**S-5 · PRM by delegation, with zero demo-side branch.** Against the demo's 13 ad-hoc PRM sites in 12 files (lane-frontend §6.5, two mechanisms), this file has none — and the delegation is real: the substrate's live `matchMedia` gates the reschedule (`createCanvasLifecycle.ts:237-267`), `masterTempo()` zeroes every interactive axis (`frameLoop.ts:142-144`), `setPointer` early-outs (`usePointerVelocityField.ts:291`). Qualified superlative: correct in intent and in three of four paths — D-3 is the one leak, and it is the library's `wake()` that leaks it.

**S-6 · the `dvh` fallback is carried locally *because* it must be.** `EditorShell`'s own `@supports not (height: 100dvh)` block (`:200-220`) is `scoped` and could never reach a slot-supplied child (slot content belongs to `App.vue`'s scope), so replicating the W3.S3 fallback at `:122-127` is the correct discharge of a house idiom rather than duplication. *Falsifier:* show the shell's rule reaches `.hero-aurora` (a `:deep()`/global escape) — it does not.

**S-7 · Goldilocks module size and a clean composable contract.** 52 lines of code for a full-viewport interactive backdrop; one exposed-API surface (`setCursor`/`clearCursor` via `useTemplateRef<InstanceType<typeof Aurora>>`, which does resolve the exposed methods through the `defineExpose` generic in `Aurora.vue.d.ts`), both call sites null-guarded (`:88-89`, `:98`). Notably it declines glass-ui's own `useCursorInteraction` — correctly: that composable is stage-element-scoped and bundles nuclei CRUD (alt-click spawn, shift-click remove, drag, Delete), i.e. editor semantics on a decorative layer, and `Aurora.vue`'s docblock explicitly sanctions the `setCursor` path "so the consumer controls pointer policy". This is a **justified bespoke** in the lane-frontend **S-8** sense, not a shadow. *Falsifier:* show `useCursorInteraction` supports document-scoped wiring with CRUD off — its signature (`stageRef: Ref<HTMLElement|null>`, `configSource`) says otherwise.

---

## 4. Minimal cure set (ordered, cheapest first)

1. **D-1** — add `medium: { kind: "crayon" }` to the atoms (compiles clean; restores `light`, makes the ground pairing explicit). Then decide whether `light` is *wanted*: on crayon with `impasto: 0` it is inert, so the honest alternative is to drop the atom **and** the `:57-59` prose.
2. **D-2** — delete `:runtime-options`. Nothing in the tree needs eager; the deferred path is documented to handle a `fixed inset-0` Aurora on its first watch tick (`useAurora.ts:284-292`).
3. **D-3** — early-out `onPointerMove` under PRM (or throttle to one forward per rAF), and correct `:81-82`.
4. **D-5** — one vitest in the `test/demo/scenes/scene-raf-leak.test.ts` mould asserting the ceiling ≤ 0.1 and listener teardown; delete the two dead oracle citations.
5. **D-4** — add `vue-tsc` and a demo-scoped typecheck step (blocked behind **D-7**: declaring `@mkbabb/glass-ui@7.0.0` and regenerating the lock, which lane-frontend §10 already sequences first).
6. **D-6** — thread the theme into `lightnessScheme` (or state in prose that the light band is deliberate at 10%).
7. **D-8/D-9/D-10/D-11** — one-liners each.
8. Prose reconciliation for claims 1, 4, 6, 7, 8, 9, 10, 12 in §1.

---

## 5. Corpus fold

- **lane-frontend F-1** (phantom dep, RED) — folded and re-verified at this tree; localized to this file as **D-7** (sole `/aurora` consumer, so it owns its own blast radius). No contradiction.
- **lane-frontend §3.1** — the `/aurora` subpath count of 1 confirmed: `grep -rn "glass-ui/aurora" demo/` hits only this file.
- **lane-frontend §6.5** (13 PRM sites, inconsistent mechanism) — HeroAurora is a **fourteenth posture**: pure delegation. Read as the good end of that spectrum (**S-5**), with D-3 as the delegation's one hole.
- **lane-frontend S-8** (justified bespoke) — the pattern extended to a *composable* declined for cause (**S-7**), not a component.
- **lane-frontend §5** (shadow census) — no shadow finding here; this file is the counter-example (**S-1**).
- **lane-library** (line 63, script inventory: `check` = `tsc --noEmit`, `check:lib` = `tsconfig.lib.json`) — extended, not contradicted: the inventory is exact, and its consequence is **D-4** (no SFC ever typechecked; the CI gate excludes `demo/` by design).
- **No overlap** with lane-library's parse seams — this component touches no keyframes.js parse surface. It touches **no** keyframes.js engine surface at all (0 of the 68 engine-consuming files, lane-frontend §1): the hero's motion is glass-ui's GL loop, so the home route runs the aurora loop *alongside* the engine-driven `TypingDots`/`AnimatedText` — context for D-12, not a dogfooding defect (a background wash is not an engine demo).

---

## 6. Probe log (read-only; nothing in any product repo written)

Both probes ran in `…/scratchpad/auroraprobe/` with a symlink to the installed `keyframes.js/node_modules`; the only writes were in scratchpad.

1. **Type probe** — the exact `:63-71` atoms object, compiled with the repo's own flags (`--strict --exactOptionalPropertyTypes --noUncheckedIndexedAccess --module esnext --moduleResolution bundler --target es2022 --skipLibCheck`) against installed 7.0.0 d.ts. Result: `TS2345` on the live shape; **clean** on the `medium: { kind: "crayon" }` control. → D-1, D-4.
2. **Runtime probe** — `node -e` importing `dist/aurora.js` and composing `{...resolveAtoms(<exact atoms>), ...PAPER_WASH_GROUND}` (pure functions; no DOM, no GL). Printed `interactivity`, `medium`, `saturation`, `impasto`, `alpha`, the drift triple, plus the cured control and the atoms-only saturation. → D-1, D-8, D-12.

Everything else is static reading: HeroAurora whole; `App.vue`, `EditorShell.vue`, `main.ts`, `vite.config.ts`, `package.json`, `tsconfig*.json`, `test/**`, `scripts/**`, `git log/show`; glass-ui producer source for `aurora/**`, `webgl/createCanvasLifecycle.ts`, `webgpu/useGpuSubstrate.ts`, `motion/pointer/usePointerVelocityField.ts`, and the four shader modules; installed `dist/**` d.ts + bundle for parity at both ends.

---

## 7. Counts

*(Superseded by §8.5 after the second-pass fold. Pass-1 figures kept for provenance.)*

| metric | pass 1 | **merged (authoritative)** |
|---|---|---|
| lines / code lines / prose lines | 129 / 52 / 62 | **128** / 52 / 62 |
| defects | 16 | **19** |
| BLOCKER / MAJOR / MINOR / INFO | 1 / 6 / 5 / 4 | **1 / 7 / 6 / 5** |
| superlatives | 7 | **7** |
| false-claim lines in the file's own prose | 8 of 13 audited claims | **9 of 14** |
| machine-confirmed defects (executed) | 2 (D-1 twice over, D-8) | **2, re-executed independently (§8.1)** |
| claims marked UNPROVEN-NEEDS-LIVE (magnitude only) | 4 (D-2, D-3, D-6, S-3) | **5** (+D-19 vs. glass-ui 6.0.0) |
| falsifier tested and finding withdrawn | 1 (paint-order → S-4) | **6** — 4 in §8.4, **plus C-2 withdrawn in full**, plus one corpus deduction contradicted (lane-frontend F-1) |
| test/gate coverage of this component | 0 | 0 |

---

# 8. ADDENDUM — independent second pass (fold, not overwrite)

**Model** `claude-opus-5[1m]`. **Mode** static + source-derived, read-only; no browser. **Read set** the component whole + every import, but from the **installed `dist/` end only** — I did **not** read the glass-ui producer source, so §2's producer-line citations (`brush.glsl.ts`, `createCanvasLifecycle.ts`, `usePointerVelocityField.ts`, …) are **not** re-verified here and are carried on pass 1's authority. Everything below is derived from `keyframes.js` HEAD + `node_modules/@mkbabb/glass-ui@7.0.0/dist/**`.

This pass was run without sight of pass 1 and reached the same file. Pass 1 was found already written at this path; it is **preserved intact**. Where we agree, §8.1 records the independent receipt (two agreeing derivations from different evidence ends is worth more than one). Where the tree disagrees with pass 1, §8.3 says so explicitly. §8.2 adds what pass 1 missed. §8.4 records what I withdrew.

## 8.1 · Independent confirmation of D-1 (BLOCKER) — reached from the `dist/` end alone

D-1 is the finding that matters, so it deserves two independent derivations. Mine used only the installed artifact and reproduced both halves.

**Type half** — the verbatim `:62-73` literal, compiled under the repo's own strict flags against installed 7.0.0 `.d.ts`:

```
atoms-probe.ts(5,21): error TS2345: Argument of type '{ seed: string; harmony: "analogous"; colorEnergy: number;
  zones: {…}; noise: number; motion: "drifting"; interactivity: { light: true; }; }'
  is not assignable to parameter of type 'AuroraAtoms | undefined'.
    Property 'medium' is missing … but required in type
    '{ medium: { kind: "pastel" | "watercolor" | "oil" | "crayon" | … }; interactivity?: AuroraPainterlyInteractivityAtom }'.
```

Same `TS2345`, same coordinate `(5,21)`, same arm. **Additional receipt pass 1 did not state:** the control (identical literal **+** `medium: { kind: "crayon" }`) compiled **clean**, which proves every *other* property — `seed`, `harmony`, `colorEnergy`, `zones`, `noise`, `motion` — is well-typed. The defect is *exactly one missing key*, nothing more. That bounds the cure precisely.

**Runtime half** — `node`, importing the installed `dist/aurora.js`:

```
DEFAULT.interactivity   = undefined
DEFAULT.medium          = smooth
resolved.interactivity  = {"swirl":true,"amplitude":0.5}    <-- 'light' in it? false
resolved.medium         = smooth
resolved.saturation     = 0.913
FINAL.medium            = crayon
FINAL.saturation        = 0.92
WITH medium:{kind:'crayon'} -> {"light":true,"swirl":true,"amplitude":0.5}   medium= crayon
```

Confirms D-1 and D-8 (0.913 → 0.920, Δ 0.007 — pass 1's "numerically inert" reading is right, and I likewise decline to claim a visual defect from it).

**One mechanism detail worth pinning**, visible in the compiled door and not stated in §2: `resolveAtoms` **replaces** `n.interactivity` wholesale rather than merging, so there is no path by which a base-config `light` could survive. Since `DEFAULT_AURORA_CONFIG.interactivity` is `undefined` (printed above), the resolved object's interactivity is *constructed entirely* from the atom — which is why omitting `medium` is total, not partial.

**Also independently confirmed** (from `dist/` + repo files only): **D-4** (`vue-tsc` absent from `package.json` *and* from `node_modules/.bin`; `check` = plain `tsc`), **D-5** (`find scripts -name "proof*"` → empty; only `proof:publish` + `proof:owner-golden` survive), **D-7**, **D-8**, **D-10** (`function b(e, t, n = .8)` in the compiled bundle — the `1` does raise a 0.8 default), **D-13** (`main.ts` has `createApp(App)` and no `errorHandler`), **D-15**, **D-16**.

## 8.2 · NEW defects — gaps in pass 1

### D-17 · MINOR · colocation: a single-consumer leaf parked in the shared shell, already ruled MOVE and still unmoved
Not covered by pass 1; the L-axis brief names colocation explicitly.

The file lives in `demo/components/instrument/shell/` — the *shared editor-chrome* tier — but has exactly one importer, `demo/app/App.vue:142`, and is deliberately **excluded** from `shell/index.ts` (which exports only `EditorShell`, `EditorHeader`, `EditorStartScreen`, `SharePopover`). `App.vue:139-141` documents the barrel bypass as intentional ("a single-consumer leaf, the P-HERO import shape") — which is an accurate description of the *symptom* and an argument for moving the file, not for the bypass: a member that must skip its own tier's barrel is not a member of that tier.

The U tranche already ruled it: `docs/tranches/U/audit/lane-18-…:65,75,79` ("**App home-hero pieces** consumed by `app/App.vue`, NOT by EditorShell … Move the home-hero trio OUT of the shared shell") and `docs/tranches/U/waves/U.B.md:135` (**U.B5**: "move the home-hero trio (`HeroAurora`/`AnimatedText`/`TypingDots`) to `app/`"). Recorded as still-open, not re-litigated. Note the compounding: `EditorHeader.vue` is exported from the barrel with zero importers while `HeroAurora` has an importer and no export — the tier's membership is inverted at both ends.

*Falsifier:* a second importer outside `app/`, or an owner ruling superseding U.B5. `grep -rn "HeroAurora"` across the repo returns exactly one code importer; the rest are docs.
*Fold:* pairs with **D-14** — both discharge in whichever wave executes U.B5.

### D-18 · INFO · a stale major-version citation, and the edit scar that explains D-1
Not covered by pass 1.

`:84` reads "Cursor velocity bursts are no longer a public Aurora **5.x** surface". The installed glass-ui is **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`), and pass 1's §2 dates the *current* union-gated `light` shape to that producer. The same line also breaks the file's otherwise strict ~78-col comment wrap mid-sentence — "…the published interaction contract. Mouse-only: on touch, pointermove" — the signature of a mechanical substitution rather than a re-read.

This is worth more than a typo: the 5.x→7.0.0 migration is precisely the window in which `AuroraAtoms` acquired the medium-discriminated arms that D-1 falls foul of. The scar and the blocker are the same event. A comment that says "5.x" is also actively misleading about which contract a reader should go check.

*Falsifier:* a glass-ui 5.x anywhere in the resolution graph. The installed manifest says 7.0.0; there is no second copy.

### D-19 · MAJOR · the dep is declared **optional** and **version-skewed** — and this, not deletion, is the real F-1 root cause
Not covered by pass 1, and it materially revises D-7 (see C-2). Found only by separating committed state from working-tree state, which neither pass did initially.

There are **three** disagreeing states of `@mkbabb/glass-ui`:

| where | state |
|---|---|
| **HEAD (committed)** | `optionalDependencies: { "@mkbabb/glass-ui": "6.0.0" }` — `git show HEAD:package.json:71` — **and locked**: `git show HEAD:package-lock.json` → `node_modules/@mkbabb/glass-ui` resolved to `…/glass-ui-6.0.0.tgz` (`:614-616`) |
| **working tree (uncommitted)** | **absent from both** — the whole `optionalDependencies` block is deleted in `git diff package.json`, and `package-lock.json` loses 76 lines (`git diff --stat`) |
| **installed on disk** | **7.0.0** |

Two defects fall out, independent of each other:

**(a) `optionalDependencies` is the wrong field for a load-bearing import.** npm treats an optional dep's install failure as non-fatal and **continues silently**. But this component's `:41` value-import, 42 demo files, and `demo/styles/style.css:3` (`@import "@mkbabb/glass-ui/styles"`, load-bearing for the entire cascade) all hard-require it. A dependency whose absence breaks the build must not be declared optional: the declaration promises a degradation path that does not exist. This is also *why* the phantom state was one careless edit away — an optional dep reads as droppable.

**(b) Declared 6.0.0, installed 7.0.0 — a major-version skew, and it bounds D-1's evidence.** Every receipt for D-1 (pass 1's producer read, my `dist/` probes in §8.1) is against **7.0.0**. A clean `npm ci` at HEAD installs **6.0.0**, a different major, whose `AuroraAtoms` shape I cannot inspect without an install (forbidden here). So D-1 is proven for *the artifact the developer's tree and the last local build actually ran*, and is **UNVERIFIED against 6.0.0** — the medium-discriminated union may postdate 6.0.0, in which case the CI-resolved build has a different (possibly absent) defect. This does not soften D-1 for the shipped/deployed artifact; it does mean the tree cannot currently tell you which glass-ui it is auditing. That ambiguity is itself the defect. It also explains D-18's "5.x" comment: the prose, the manifest, and the disk are pinned to three different eras.

*Falsifier:* an install of 6.0.0 showing the same `AuroraAtoms` union (which would extend D-1 to the CI leg and make this purely a hygiene finding), or evidence npm treats optional-dep failure as fatal. Neither is available without an install; both are cheap for whoever holds the network.
*Cure:* move glass-ui to `dependencies` (or `devDependencies` — the demo is not published; `files` excludes it), pin **7.0.0** to match the audited artifact, and regenerate the lock in the same commit as the in-flight version bump.

## 8.3 · CONTRADICTIONS — where the tree disagrees with pass 1

### C-1 · §1 claim 11 and S-2 are an overclaim: `window.innerWidth`/`innerHeight` **are** layout-flushing reads
Pass 1 grades the file's "This handler does no DOM geometry read at all" (`:78-79`) as **TRUE**, and S-2 titles itself "zero layout reads in the hot path."

The handler reads `window.innerWidth` and `window.innerHeight` on **every** `pointermove` (`:90-91`) — a handler the file's own comment describes as firing at 120–1000 Hz (`:82`). Both properties sit on the standard forced-synchronous-layout read list; they are not free the way pass 1's grading implies, and the file's absolute wording — "**no style/layout flush**" (`:80-81`) — is stronger than any engine guarantees.

**What survives, and it is the important part:** the *substance* of the discipline holds. There is no DOM **write** interleaved with the read — I verified from the compiled bundle that `setCursor` touches no DOM (`function b(e, t, n = .8) { Y(o) && (l = n, c.setActive(!0), c.setPointer(e, t), y.wake()) }` mutates JS state and requests a frame, nothing else). Layout **thrashing** is therefore impossible and the T-CL-3 `rect + setProperty` recurrence really is cured. So S-2's *thesis* stands; its *absolutism* does not.

**Amendment, not demotion.** S-2 should keep its place with the wording narrowed to "no element-geometry read and no read-after-write interleave," and §1 claim 11 should read **partly false** (making it 9 false-or-partly-false of 14 audited claims — I add this as claim 14). The cure is one line and uses a dependency already imported at `:36`: `useWindowSize()` from `@vueuse/core` caches both metrics behind a resize listener and removes the per-event read entirely.

*Note:* this does **not** disturb pass 1's genuinely sharp scrollbar-basis observation in S-2 — `useWindowSize()` tracks `innerWidth`, so the `100dvw` ↔ `innerWidth` coherence with D-14 is preserved by the cure.
*Falsifier:* a trace showing no layout in the handler would kill the perf half (**UNPROVEN-NEEDS-LIVE**); the wording half dies only if `innerWidth`/`innerHeight` are shown never to flush, which no vendor guarantees.

### C-2 · **WITHDRAWN — my own falsifier fired.** D-7 stays MAJOR; and lane-frontend F-1's *consequence* is wrong at HEAD

I drafted C-2 as an escalation of D-7 to BLOCKER, on the argument that `.github/workflows/ci.yml:66-73` runs `npm ci` then `npm run gh-pages`, so a lockfile with zero glass-ui entries makes the demo job red-by-construction. I published the falsifier with it — *"a glass-ui entry in `package-lock.json` … would kill this outright."*

**It fired.** CI builds committed refs, and at HEAD the dep **is** declared and **is** locked:

```
$ git show HEAD:package.json      | grep -n glass-ui
71:        "@mkbabb/glass-ui": "6.0.0"
$ git show HEAD:package-lock.json | grep -n glass-ui
61:                "@mkbabb/glass-ui": "6.0.0"
614:        "node_modules/@mkbabb/glass-ui": {
616:            "resolved": "https://registry.npmjs.org/@mkbabb/glass-ui/-/glass-ui-6.0.0.tgz",
```

`npm ci` at HEAD resolves glass-ui 6.0.0 and the demo job builds. **The escalation is withdrawn in full; D-7 remains MAJOR as pass 1 filed it.** Recorded rather than deleted because a false BLOCKER is worse than a missed one, and the trap here is instructive: both passes read `package.json`/`package-lock.json` from the **working tree** and neither checked `git show HEAD:` — the dirty state was silently doing the arguing.

**Corpus contradiction (lane-frontend F-1).** The census entry says glass-ui is "absent from `package.json` AND `package-lock.json`" and deduces that "*a clean checkout has no glass-ui to resolve, and both `vite build --mode gh-pages` and `npm run dev` fail at the first import.*" The **observation** is accurate for the working tree. The **deduction is false at HEAD**: a clean checkout of HEAD carries a locked 6.0.0. F-1's own hedge — "the working tree survives only because the `Jul 16 05:17` install predates whatever removed the declaration" — can now be resolved: what removed it is an **uncommitted release-prep edit** (`5.3.5` → `6.0.0`, `@mkbabb/value.js` `^3.1.0` → `4.0.0`) that deleted the entire `optionalDependencies` block. The phantom dep is therefore **an uncommitted regression in flight**, not a committed state — which changes the fix from "restore a lost declaration" to "**do not land this diff as written**," and moves the deadline to whenever that release commit lands.

D-7's true weight is preserved and re-aimed at **D-19**, which is the committed, non-hypothetical half: the dep is declared *optional* and pinned to a *different major* than the one on disk.

*Falsifier for the replacement claim:* show the `optionalDependencies` deletion is committed somewhere in history rather than pending in the worktree — `git diff -- package.json` shows it unstaged.

### C-3 · D-2's "skips the intersection gate" is true of the library but **immaterial here** — tighten, don't inflate
D-2 lists the bypassed `useIntersectionPause` gate among eager's costs. Confirmed in the compiled bundle: the eager branch takes an early return (`if (v) { b(); return; }`) *before* the observer and its `off-screen-io` pause/resume are installed.

But `.hero-aurora` is `fixed inset-0` (`:21`), so it is **always** intersecting and that suspension could never have fired. The intersection loss costs this component nothing. Tab-hidden suspension is owned by the substrate, not this branch, and survives eager.

D-2's real cost is the other half — the skipped `requestIdleCallback(…, {timeout: 2000})` deferral and the compile-link landing inside the mount commit — and that half is untouched. Recording this so the finding is carried at its true weight; a reviewer who tests the intersection claim and finds it inert should not conclude D-2 is soft. **D-2 stands as written, minus this one sub-clause.**

*Falsifier:* a layout in which `.hero-aurora` can leave the viewport. `fixed inset-0` with `height:100dvh` forbids it.

## 8.4 · Findings I raised and then withdrew to their own falsifiers

Recorded so the ledger shows the posture was tested in both directions.

| candidate | why it died |
|---|---|
| `useTemplateRef<InstanceType<typeof Aurora>>` (`:48`) mistypes the exposed API — `setCursor`/`clearCursor` unreachable | **False.** A `tsc` probe compiled `a?.setCursor(0.5,0.5,1)` and `a?.clearCursor()` clean against the real `.d.ts`, with a `@ts-expect-error` negative control confirming the instance type was genuinely resolving (not silently `any`). `Aurora.vue.d.ts:92-93` exposes both. Independently confirms pass 1's S-7 parenthetical. |
| `pointerType !== "mouse"` (`:87`) is exemplary — a correctly-justified touch policy | **Withdrawn in favour of pass 1's D-9.** I had this queued as a superlative; pass 1's reading is better. The comment justifies excluding *touch*, but the allowlist form also drops *pen hover*, which has the mouse's interaction shape. An allowlist is not the stated rule. D-9 stands; my superlative does not. |
| `PAPER_WASH_GROUND` clobbering `saturation` visibly over-saturates the "more subtle" wash | **Arithmetic killed it** — 0.913 → 0.920. Same conclusion as D-8, reached independently. Explicitly *not* claimed as a visual defect. |
| The `<style scoped>` block is pure dead code, redundant against `inset-0` | **Half-withdrawn.** The redundancy is real (D-14), but pass 1's S-6 defeats the "delete it" reflex: `EditorShell`'s own `@supports` fallback is `scoped` and cannot reach slot content, which belongs to `App.vue`'s scope. The local fallback is a correct discharge, not duplication. I had it queued as a MINOR; it belongs at D-14/S-6 as pass 1 filed it. |

## 8.5 · Merged ledger

| | pass 1 | added here | **merged** |
|---|---|---|---|
| BLOCKER | D-1 | — (C-2 escalation **withdrawn**) | **1** |
| MAJOR | D-2, D-3, D-4, D-5, D-6, D-7 | **+D-19** | **7** |
| MINOR | D-8..D-12 | **+D-17** | **6** |
| INFO | D-13..D-16 | **+D-18** | **5** |
| **defects** | 16 | **+3** | **19** |
| superlatives | S-1..S-7 | +0 (S-2 amended per C-1; one candidate withdrawn) | **7** |

**Cure-set amendments to §4:** **D-19 takes rank 1** — declare glass-ui non-optional at **7.0.0** and regenerate the lock *inside* the in-flight version-bump commit, which simultaneously discharges D-7, prevents the pending phantom-dep regression, and pins the artifact D-1 was actually audited against (without that pin, fixing D-1 is aiming at a version the build may not resolve). Then D-1 → D-2 → D-3 → D-5 → D-4 as pass 1 ordered them. Insert **C-1** at rank 3½ (one line, `useWindowSize()`, plus correcting `:78-81`). **D-17** and **D-18** are relocation/prose work folding into the U.B5 wave and the §4.8 reconciliation respectively.

**Method note for the arbiter.** The single highest-value move in this pass was mechanical: `git show HEAD:<file>` on every manifest cited as evidence. Both passes had read dependency state from a **dirty working tree** and reasoned about CI, which builds committed refs — that gap manufactured one false BLOCKER (C-2, withdrawn) and hid one real MAJOR (D-19). Recommend it as standing practice for any finding whose blast radius runs through CI or a clean checkout.

**Standing agreement:** both passes independently reach the same headline — the component is a **well-built shell around a mis-called library door**. Its lifecycle, teardown, a11y and layering discipline are exemplary; the one thing it was commissioned to do is off at runtime, because the atoms literal omits the single key the door's discriminated union requires. Two derivations from opposite ends of the glass-ui artifact (producer source; installed `dist/`) agree on the mechanism, the receipt, and the one-key cure.
