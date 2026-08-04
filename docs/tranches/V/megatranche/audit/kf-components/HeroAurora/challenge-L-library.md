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

| metric | value |
|---|---|
| lines / code lines / prose lines | 129 / 52 / 62 |
| defects | 16 |
| BLOCKER / MAJOR / MINOR / INFO | 1 / 6 / 5 / 4 |
| superlatives | 7 |
| false-claim lines in the file's own prose | 8 of 13 audited claims |
| machine-confirmed defects (executed) | 2 (D-1 twice over, D-8) |
| claims marked UNPROVEN-NEEDS-LIVE (magnitude only) | 4 (D-2, D-3, D-6, S-3) |
| falsifier tested and finding withdrawn | 1 (paint-order → S-4) |
| test/gate coverage of this component | 0 |
