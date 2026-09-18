# Arm B — keyframes.js DEMO truth sweep

Repo: `/Users/mkbabb/Programming/keyframes-v-exec` (branch `master`), tree `demo/`.
Method: static read only (isolation law — no dev server / build). Counts: **58 `.vue`, 127 `.ts`, 12 `.css`**. Runtime "brokenness" is not reproduced here (no browser); every claim below is code-anchored (`file:line`). Where the owner's C4 "mostly broken on mobile" cannot be confirmed statically, I say so.

---

## 1. Page / component census

The demo is a **single-page instrument**, not multi-page. One shell (`EditorShell.vue`) hosts a swappable "scene" in a keyed `<Suspense>`; there is no per-page document.

**Scenes** (`demo/app/scene/scenes.ts:128-199`) — 7 registry entries, home reuses the cube:
- `home` (`scenes.ts:128`) — start screen; renders `CubeScene` as backdrop (`App.vue:290-293`, home↔cube share component/key `"cube"`).
- `cube` (`:138`), `amiga` (`:145`, three.js sphere via `useAmigaThree.ts`), `square` (`:153`), `easing` (`:161`, stageMode `editor`), `spring` (`:169`, stageMode `storyboard`, absorbed the folded `starting-style`/Discrete sub-view `:192-198`), `sequence` (`:181`, stagger storyboard).
- Each descriptor carries `stageMode: subject|editor|storyboard` (`:62-93`) driving mobile full-bleed vs content-card.

**Shell/chrome:** `App.vue` (root, wraps everything in ONE `TooltipProvider` `:8`), `EditorShell.vue` (h-dvh overflow-hidden single-screen root `:3`), `ChromeDock.vue` (top scene/controls dock), `MbabbMenu.vue`, `TransportDock.vue` + `AnimationControlsGroup.vue` (bottom transport), `ControlsPaneWrapper.vue` (rail on desktop / glass Drawer on mobile), `HeaderRibbon` (glass-ui), `SharePopover.vue`, `KeyboardShortcutsModal.vue`, `HeroAurora.vue` (home-only aurora backdrop `App.vue:50-52`).
**Instrument sub-trees:** `keyframes/` (Monaco CSS editor + keyframe cards), `timeline/` (KeyframeTimeline, zoom/pan, paste dialog), `transport/` (RAF loop, playback, channel-controls). Deeply nested composables (goldilocks/god-module tension — e.g. `transport/` has ~30 files).

## 2. Mobile brokenness — CODE level

The demo is *heavily* mobile-engineered (10 `useMediaQuery` sites, `dvh`/`dvw` throughout, φ-based dock anchoring, glass Drawer sheet). So "mostly broken" is not a raw-neglect story; the concrete code-level defects/risks I can prove:

- **[HIGH] Missing `viewport-fit=cover` while 9 `env(safe-area-inset-*)` consumers exist.** `app/index.html` viewport meta is `width=device-width, initial-scale=1.0` with **no `viewport-fit=cover`** (grep: 0 occurrences repo-wide). Yet `layout.css` consumes `env(safe-area-inset-bottom/top)` in the dock-band reserve (`:82,:94`), top/bottom anchors (`:115,:132,:203`), and the mobile stage split. On notched iOS Safari, `env(safe-area-inset-*)` resolves to **0** without `viewport-fit=cover`, so every notch/home-indicator inset silently collapses — the bottom transport pill and mobile sheet lose their home-indicator clearance. Load-bearing, one-line fix.
- **[MED] `100vh`/`100vw` fallbacks in the `@supports not (height:100dvh)` path** (`EditorShell.vue:211-217`, `HeroAurora.vue:124-125`) are the classic iOS "URL bar" over-tall viewport — but they are correctly gated behind `@supports not`, so modern Safari takes the `dvh` happy path. Acceptable; noted only because it's the residual legacy-iOS trap.
- **[MED] Multi-touch is CUBE-ONLY.** Only `scenes/cube` wires pinch/gesture (`useOrbitalPinch.ts`, `OrbitalDrag.vue:283-290`). `square`, `sequence` (×2), `spring` scrub via `useDragScrub.ts` which is **single-pointer** (`setPointerCapture` + one `pointermove`, `:112-134`). C4's "as should every other animation" (multi-touch) is unmet outside the cube — a real gap, not a bug.
- **[LOW] Fixed px caps:** `--header-items-max-w: 500px` (`layout.css:15`) and `--dock-panel-width:17rem` — maxes/collapsibles, low overflow risk but worth a mobile pass. `--work-area-max-height: min(64rem, …)` mobile branch (`layout.css:183`) is dvh-anchored, sound.
- Body scroll is locked correctly (`EditorShell.vue:3` `h-dvh max-h-dvh overflow-hidden`), and stages set `touch-action:none; overscroll-behavior:contain` (`CubeScene.vue:12`, `CubeTarget.vue:5`) — good gesture hygiene. No horizontal-scroll landmine found (5 `min-w-[`/overflow sites, all bounded).

## 3. The cube — drag/rotation implementation vs the quaternion orbital-drag facility

**There is ONE live rotation implementation and it IS the custom quaternion facility — no legacy/dead divergence.** Wiring: `CubeScene.vue` → `CubeTarget.vue:11-16` mounts `<OrbitalDrag v-model="transform">` → `orbital-drag/OrbitalDrag.vue`. The quaternion core (`OrbitalDrag.vue:78-121`) is the source of truth: `currentQuaternion` is only ever multiplied by delta-quats (`applyRotation :112`), never rebuilt from Euler on the drag path; the container renders ONE `rotate3d()` off the quat's native axis-angle (`:63-76`, no gimbal). The Euler v-model is a derived echo with a re-seed guard for external writes (Reset/slider/share) (`:299-312`). `quaternionEuler.ts` holds the conversions.

**The second "facility" is the MatrixEditor** (`cube/matrix-editor/`, `useTransformState.ts`) — a numeric matrix3d/transform input that writes the SAME `TransformState` v-model; it is complementary, not a competitor.

**Multi-touch: YES, it fully rides.** `useOrbitalPointer.ts` tracks `activeTouchPointers` and **skips single-finger rotation when ≥2 pointers are down** (`:98-99`), handing off to `useOrbitalPinch.ts` which does two-finger **scale + pan + Z-twist rotation** (`handleTouchPinch :94-132`) plus Safari `gesturestart/change/end` (`:142-184`). Pinch→single-finger transition is de-jumped (`justExitedPinch`, `:83-88,:106-110`); iOS `pointercancel` resets state (`:203-216`). Inertia (`useOrbitalInertia`) + EMA angular velocity (`OrbitalDrag.vue:135-138`) carry release momentum. Keyboard axis-lock (X/Y/Z) constrains to one axis and lights `CubeAxisLines` (`:193-212`, `CubeTarget.vue:159-163`). Double-tap "Roll" egg (`CubeTarget.vue:189-232`) dogfoods the kf engine and is drag-disjoint. **Verdict: the cube's touch story is the most complete in the demo; C4's cube multi-touch mandate is essentially already met — the gap is the OTHER scenes.**

## 4. Single-screen-app gap vs value demo

kf is **already a single-screen SPA** (`EditorShell` h-dvh overflow-hidden; scenes swap in-place via keyed `<Suspense>` + View Transitions `App.vue:95-105,343-347`; no document nav). Both demos use **`createWebHashHistory`** (kf `router.ts:35`, value `demo/color-picker/router/index.ts:41`) for GH-Pages.
Divergences vs value demo:
- **Routes are GENERATED from the scene registry** with a `Stub` render-null component (`router.ts:15-32`); rendering stays in `App.vue`. value demo has explicit named routes + a real `router/index.ts`.
- **No per-scene `document.title`.** Title is static `keyframes.js` (`index.html:title`). value demo ships `router/useDocumentTitle.ts`. Gap for share/SEO/history legibility.
- kf leans on a bespoke **scene state machine** (`useSceneMachine`, `useSceneMachineRouterBinding` — one reader/one writer/echo guard, `App.vue:183-189`) as the single authority; value demo uses `usePaneRouter`. kf's is more elaborate.

## 5. shadcn census + glass-ui equivalents

**kf demo has ZERO shadcn/reka-ui runtime imports** — the migration is COMPLETE (C5 already satisfied for kf, unlike value). `grep 'from "reka-ui"'` → 0; all `reka`/`shadcn` string hits are historical *comments* (`CubeScene.vue:40`, `KeyframesEditor.vue:54,61,267`). Component surface is entirely glass-ui: **31 barrel imports + ~18 subpath imports** — `Popover/PopoverContent/PopoverTrigger`, `Button`, `Select/SelectContent/SelectItem/SelectValue/SelectGroup`, `Tooltip/TooltipProvider/TooltipTrigger/TooltipContent`, `SegmentedTabs`, `GlassDock/DockTrigger/DockControl/DockSeparator`, `StatusDot`, `DarkModeToggle`, `HeaderRibbon`, `Drawer` (mobile sheet), `Aurora`, `chip`, `toggle-group`, `forms`, `labeled-field`, `metric`, `fading-scroll`, `motion-core`, `keyboard` (`registerShortcut`). No shadcn component lacks a glass-ui home here — **no new glass-ui prototype is needed for kf** (the reka `<Tabs>` → `<SegmentedTabs variant="underline">` migration already happened at glass-ui 4.0.0, `CubeScene.vue:39-48`).

## 6. Routing / URL state as-is

- **Router:** vue-router 5, hash history, routes from `allScenes`, catch-all `/:pathMatch(.*)*` → `/` (`router.ts:23-37`).
- **Deep-link full state:** `?state=` = `btoa(encodeURIComponent(JSON.stringify(state)))` (`hashSharing.ts:6-9`) carrying `{options, controls, activeScene}` with `_storeTimestamp` stripped for hash stability (`:20-27`). Restored in `router.beforeEach` on initial nav only, then the param is stripped and the URL redirects to the state's `activeScene` (`router.ts:46-60`) — vue-router-5 guard-return idiom (no deprecated `next()`).
- **`?anim=`** channel projection owned by `useSceneMachineRouterBinding` (`App.vue:189` docblock).
- **Share UI:** `SharePopover.vue` + `useShareState.ts` + `encodeStateToHash`.
- Risk: `btoa(encodeURIComponent(...))` round-trip is unicode-safe; `decodeStateFromHash` try/catches malformed hashes (`:11-18`), `isValidState` shape-guards (`:29-45`). Sound. Gap: state is one opaque blob (no human-readable per-facet params); no `document.title` update on restore.

---

### Bottom line
kf demo is a mature, glass-ui-native single-screen SPA whose **cube is the reference multi-touch/quaternion implementation** and whose **shadcn abrogation is already done**. The real mobile debt is narrower than "mostly broken": (a) the **missing `viewport-fit=cover`** that silently zeroes 9 safe-area insets on iOS, (b) **multi-touch confined to the cube** while other scenes are single-pointer scrub, and (c) **no per-scene document.title / human-readable URL state**. Cross-scene mobile refinement (padding/curve polish, the C4 "deep refinement") is a design pass I could not adjudicate statically.
