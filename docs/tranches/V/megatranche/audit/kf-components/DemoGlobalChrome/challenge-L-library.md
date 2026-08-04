claude-opus-5[1m]

# CHALLENGE — `DemoGlobalChrome.vue` · axis **L (LIBRARY)**

**Target** `keyframes.js/demo/components/instrument/transport/components/DemoGlobalChrome.vue` (49 lines)
**Repo (read-only evidence)** `/Users/mkbabb/Programming/keyframes.js`
**Date** 2026-08-04 · **Method** static, source-derived; no browser tooling (per law). Live-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Read whole:** the target + every import + every consumer of what it publishes:
`vue` (`Teleport`), `vue-sonner` (`Toaster`; `node_modules/vue-sonner/lib/index.js`, `lib/index.css`, `package.json`, `README.md`), the sole host `transport/AnimationControlsGroup.vue`, its host `instrument/shell/EditorShell.vue`, `app/App.vue`, the sole `#rainbow-gradient` consumer `transport/controls-pane/RibbonBar.vue`, the token owner `demo/styles/design-idioms.css`, the cascade root `demo/styles/style.css`, `demo/components/instrument/utils/toastGuard.ts`, `demo/components/instrument/shell/useShareState.ts`, all 24 `toast.*` call sites, `vite.config.ts`, `package.json`/`package-lock.json`, the built `dist/gh-pages/assets/*`, and `node_modules/@mkbabb/glass-ui/dist/**` (toast family, typography/semantic.css, theme/bridges.css, tokens/scale-paper.css, tokens/scheme-motion.css, utilities/btn.css), `node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js`.

**Hitherto corpus folded (not re-invented):** `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dependency) — CONFIRMED against the tree and extended to this file (L-8); shadow census **S-1..S-8** — none covers the toast surface, which is a census **gap** I file as **S-9** (L-3). Prior tranche findings on this exact file (`keyframes.js/docs/tranches/T/audit/lanes/14-at-structure.md` **F3**, `13-demo-structure.md` **F8**, `docs/tranches/T/waves/T.F.md` **T.F3**, `docs/tranches/U/audit/lane-17-demo-instrument-transport.md` **#8**, `docs/tranches/U/waves/U.B.md` **U.B3**, `docs/tranches/U/loop/pass1-research-demo-module-census.md`) are folded and **contradicted on severity** — see §Reconciliation.

**Verdict:** the component is **DEFECTIVE**, and not cosmetically. One BLOCKER (every toast in the demo is invisible today), three MAJORs, seven MINORs, three INFOs, three genuine superlatives.

| id | sev | one-line |
|---|---|---|
| L-1 | **BLOCKER** | `vue-sonner/style.css` is imported nowhere → the toaster is never `position:fixed` → it lands below an `overflow:hidden` fold; all 24 toast call sites emit nothing the user can see |
| L-2 | MAJOR | the document singletons sit inside a `:key="superKey"` remount boundary → live toasts are destroyed on every scene switch (share-restore kills its own confirmation) |
| L-3 | MAJOR | glass-ui 7.0.0 ships a complete first-class toast family; the demo rents `vue-sonner` + a private-DOM guard + 12 lines of class-mapping to approximate it (**shadow-census S-9**, missed by lane-frontend) |
| L-4 | MAJOR | `unstyled:true` disables every `[data-styled='true']` rule, but the `classes` map omits `icon`/`content`/`loader` → every typed toast renders a bare icon stacked above the title |
| L-5 | MINOR | dead config: `actionButton/cancelButton/closeButton: ''` are inert placeholders |
| L-6 | MINOR | stale rationale — the header cites `proof:demo-no-oversize`, a gate that no longer exists |
| L-7 | MINOR | `to="html"` (not `body`) is load-bearing and undocumented; a tidy-up to `body` silently click-kills toasts under modals |
| L-8 | MINOR | F-1 exposure: all four toast utility classes resolve solely through the **undeclared** `@mkbabb/glass-ui` |
| L-9 | MINOR | the toast layer is the one rung outside the demo's declared z-order contract; `--z-toast: 160` exists and is unused |
| L-10 | MINOR | `theme="system"` follows the OS, not the app's `DarkModeToggle` (glass-ui `useGlobalDark`, `localStorage`-backed) |
| L-11 | MINOR | the 6-stop `#rainbow-gradient` duplicates glass-ui's `rainbow-vivid` recipe; the *same* button's two states paint from two divergent enumerations |
| L-12 | INFO | `import { Teleport } from "vue"` is dead — the compiler resolves the built-in before setup bindings |
| L-13 | INFO | decorative `<svg>` lacks `aria-hidden="true"` (cross-axis: A owns) |
| L-14 | INFO | zero test/script coverage of the sole toast mount; a 3-line assertion would have caught L-1 at the bump |

Superlatives: **S-L1** the `:style="{ stopColor: 'var(--…)' }"` stop form · **S-L2** true singleton discipline (one `<Toaster>`, one `#rainbow-gradient`, grep-verified) · **S-L3** the load-bearing `class="absolute"` on the 0×0 SVG.

---

## L-1 · **BLOCKER** · engine/dependency-consumption idiom — the toaster has no stylesheet, so no toast is visible

**Claim.** `vue-sonner@2` ships its stylesheet as a **separate, explicitly-imported entry** (`package.json` exports `"./style.css": "./lib/index.css"`; the README's Vue-3 quickstart imports it *at the `Toaster` mount site*, `node_modules/vue-sonner/README.md:113-124`). Nothing in this repo imports it. Without it the container rule `[data-sonner-toaster] { position: fixed; … }` (`node_modules/vue-sonner/lib/index.css:22-24`) never applies, and the toast list renders as **normal flow content appended after `</body>`, inside an `overflow:hidden` `<html>`** — i.e. below the fold and unscrollable.

**Provenance (all statically checkable).**
1. `DemoGlobalChrome.vue:45-49` — the entire `<script setup>`: `import { Teleport } from "vue"` + `import { Toaster } from "vue-sonner"`. **No CSS import.** This is the sole `<Toaster>` in the tree (`DemoGlobalChrome.vue:28`; `grep -rn "Toaster" demo/` → this file only).
2. Repo-wide: `grep -rn "vue-sonner/style\|vue-sonner/lib/index.css" .` (excl. `node_modules`, `docs/`) → **0 hits**. `git log -S "vue-sonner/style"` → **0 commits**; the import never existed.
3. The library does **not** self-inject: `node_modules/vue-sonner/lib/index.js` has no `import "./index.css"`, no `styleInject`, no `createElement("style")` (grep). Its only style output is the CSS-var inline object on the `<ol>` (`lib/index.js:1170-1178`: `--front-toast-height`, `--width`, `--gap`, offsets) — **no `position`**.
4. The **shipped build proves it**: in `dist/gh-pages` (built 2026-07-16), `data-sonner-toaster` appears only in `assets/index-B2hcFaCm.js` and `assets/toastGuard-tbpccupa.js`; `grep -rn "sonner" dist/gh-pages/assets/*.css` → **empty**. No sonner CSS is shipped.
5. The fold geometry: `demo/styles/style.css:210-231` (`@layer base`, `html, body` at `:214-224`, `@media (min-width:1024px)` at `:225-230`) — `html, body { overflow: hidden; overscroll-behavior: none; min-height: 100dvh; }` and `@media (min-width: 1024px) { html, body { height: 100dvh } }`. The toaster is teleported to **`html`** (`DemoGlobalChrome.vue:27`), so its box is laid out *after* the `<body>` box, which is already ≥ 100dvh tall — and `html { overflow: hidden }` forbids scrolling to it.
6. Blast radius: **24 call sites**, every one user-facing — `demo/utils/clipboard.ts:6` ("Link copied"), `shell/useShareState.ts:37,65,71,83`, `keyframes/KeyframesEditor.vue:189,198`, `keyframes/CSSCodeEditor.vue:186`, `keyframes/KeyframesStringControls.vue:101,105,146,155,162`, `keyframes/composables/useKeyframeOps.ts:33,195`, `timeline/composables/useTimelineBuild.ts:121,133,137,148,155,157`, `timeline/composables/useTimelineOps.ts:24,34`.

**Provenance of the regression.** `git log -S '"vue-sonner": "^2.0.9"' -- package.json` → `6487c7f8 2026-06-04 deps(tranche-B W1): demo/tooling to latest behind the regression gate` — a bulk bump from `^1.1.3` to `^2.0.9`. The "regression gate" is typecheck + vitest; neither can see a missing stylesheet. (Whether v1 auto-injected its CSS is an inference I do not need: the tree-provable fact is that **today** no sonner CSS reaches the page, in source *and* in the shipped bundle.)

**Failure scenario.** Paste a CSS keyframes block → `useTimelineBuild.ts:148` fires `toast.error("No keyframes found in CSS")` → the `<li>` is created with the demo's classes and `opacity` is **1** (even sonner's `[data-sonner-toast]{opacity:0}` at `index.css:67-79` is absent), but its ancestor `<ol>` is a static-flow box beginning at `y ≥ 100dvh` inside `html{overflow:hidden}` → **the user sees nothing**. Every error path in the parse/compile/export surface — the demo's entire failure-reporting channel — is silently mute.

**Falsifier.** Any of: (a) a CSS rule in the shipped bundle that positions `[data-sonner-toaster]` (searched: none); (b) a live page where `getComputedStyle(document.querySelector('[data-sonner-toaster]')).position === 'fixed'`, or a screenshot showing a rendered toast **dated after 2026-06-04**; (c) `vue-sonner@2.0.9`'s JS injecting the sheet at runtime (grepped: it does not). Any one kills this finding. The *visible-to-a-human* half is **UNPROVEN-NEEDS-LIVE**; the static half (no stylesheet in source or build) is **PROVEN**.

**Minimal honest fix.** One line at `DemoGlobalChrome.vue:48`: `import "vue-sonner/style.css";` — then re-audit L-4/L-9 (which the fix exposes rather than cures). The KISS-er fix is L-3.

---

## L-2 · MAJOR · leaks/teardown — the "document-level singleton" is mounted inside a remount boundary

**Claim.** The file's own header asserts these nodes "resolve against the **DOCUMENT** … not the controls grid" (`DemoGlobalChrome.vue:2-7`) — yet it is instantiated as the last child of `AnimationControlsGroup`'s template (`AnimationControlsGroup.vue:118`), and that component is mounted **keyed by scene**: `EditorShell.vue:75-76` — `<AnimationControlsGroup :key="superKey" …>`. Every scene switch therefore **destroys and recreates** the Toaster. vue-sonner's `Toaster` populates its list **only** by push-subscription (`lib/index.js:1012-1035`: `ToastState.subscribe(...)`, `onInvalidate(unsubscribe)`); it never rehydrates from the module-level `Observer.toasts` (`lib/index.js:3-25`). A fresh mount therefore starts **empty**, and any toast published while no Toaster is mounted is dropped on the floor (`publish` → `subscribers.forEach` over an empty array, `lib/index.js:20-22`).

**Provenance.** `EditorShell.vue:75` (`:key="superKey"`) · `AnimationControlsGroup.vue:118` · `app/App.vue:191` (`currentSuperKey = currentScene.superKey`) · `app/scene/scenes.ts:131-184` (a distinct `superKey` per scene) · `app/scene/useSceneMachineShellBinding.ts:137-139`, which states the remount outright: *"crosses the `AnimationControlsGroup :key="superKey"` boundary (`__home__`→`Cube`, EditorShell.vue), so CubeScene REMOUNTS"*.

**Failure scenario (concrete, in-tree).** `useShareState.loadFromInput()` — `shell/useShareState.ts:79-86`:
```ts
if (result.activeScene && onSceneRestore) onSceneRestore(result.activeScene);  // → App.runSceneSwitch → router → superKey changes
toast.success("State restored!", { duration: 3000, description: "Animation state loaded from shared URL." });
```
The toast is published to the *outgoing* Toaster; the router navigation then flips `superKey`, `AnimationControlsGroup` remounts, `DemoGlobalChrome` remounts, the new `Toaster` starts with `toasts.value = []` → the 3-second confirmation of the **primary share-restore flow** vanishes within a tick or two. Same hazard for `clipboard.ts:6` and any toast fired across a scene transition.

**Falsifier.** (a) `superKey` is stable across the restore (true only when the shared scene equals the current one — then the toast survives; the cross-scene case is the defect); (b) vue-sonner rehydrating from `Observer.toasts` on mount (it does not — `lib/index.js:1012`); (c) Vue keeping the teleported DOM alive across a keyed remount (it does not — teleported children are removed on unmount). Note I checked and **do not** claim a duplicate-`id`/double-Toaster window: Vue's `patch` unmounts the old vnode before mounting the new one for a differing key, so the two never co-exist — S-L2 stands.

---

## L-3 · MAJOR · duplication / shadow-census gap (**new: S-9**) — glass-ui already ships the toast family being hand-rolled here

**Claim.** `@mkbabb/glass-ui@7.0.0` exports a complete, first-class toast surface at `@mkbabb/glass-ui/toast`: `Toaster`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, plus a `toast()` / `useToast()` API with `tone` and `surface` axes and a `duration` forwarded to reka-ui's `ToastRoot` (`node_modules/@mkbabb/glass-ui/dist/components/toast/index.d.ts:1-9`; `use-toast.d.ts:4-38`; `Toaster.vue.d.ts:1-4` — `position?: ToasterPosition`). The demo instead carries: a third-party dependency (`package.json:111` `vue-sonner ^2.0.9`), 12 lines of hand-mapped class strings that *re-create glass-ui's own look out of glass-ui's own utilities* (`DemoGlobalChrome.vue:29-39`), and a 28-line module documenting a **private DOM contract** with that third party (`instrument/utils/toastGuard.ts:1-28`, `[data-sonner-toaster]`, consumed by `KeyframesAddDialog.vue:19,72` and `CSSPasteDialog.vue:6,41`). reka-ui — glass-ui's toast substrate — is already a declared dependency (`package.json:98`).

This is exactly a lane-frontend shadow-census row and **lane-frontend has no row for it**: S-1..S-8 cover tabs, timeline, scrubber, AnimatedText, skeleton, CopyButton, TypingDots. I file it as **S-9 · vue-sonner + toastGuard + DemoGlobalChrome's toast half → `@mkbabb/glass-ui/toast`**, and I rank it *above* S-5/S-6/S-7 in value: it retires a whole runtime dependency and a private-API coupling, not just a component, and it dissolves L-1, L-4, L-5, L-8 and L-9 at the root (glass-ui's styles already arrive via `@import "@mkbabb/glass-ui/styles"`, `demo/styles/style.css:3` — there is no second stylesheet to forget).

**Honest cost, not hand-waved.** 24 call sites use the sonner shape `toast.success(msg, { description, duration })`; glass-ui's is `toast({ title, description, tone, duration })` — mechanical but real. `toast.dismiss(id)` (`KeyframesEditor.vue:205`) maps to the returned `dismiss()`. The `isInsideToaster` guard needs a glass-ui-side equivalent (a public predicate, or the same `closest()` on glass-ui's root attribute) — **this is a genuine open question for the swap spec, not a solved problem.**

**Falsifier.** glass-ui's `Toaster` failing to provide a documented dismissal/interaction seam for the dialog guard, or lacking a stacked multi-toast queue equivalent to sonner's; or an owner ruling that vue-sonner is a deliberate identity choice. If glass-ui's toast family were *not* in the installed 7.0.0 dist, this finding dies — it is (paths above).

---

## L-4 · MAJOR · composable/library contract — `unstyled: true` with an incomplete `classes` map

**Claim.** `unstyled: true` (`DemoGlobalChrome.vue:30`) sets `data-styled="false"` on every toast (`lib/index.js:654`), and **every** icon/content/button rule in vue-sonner's sheet is gated on `[data-styled='true']` (`lib/index.css:80, 108, 119, 124, 141, 144, 148, 153, 172, 175, 179, 214, 235, 238, 241, 293`). The full styling burden therefore moves onto `toastOptions.classes` — which here covers `toast`, `title`, `description` and **omits `icon`, `content`, `loader`** (`DemoGlobalChrome.vue:31-38`; the `classes` map is forwarded per-toast at `lib/index.js:1206`, applied at `lib/index.js:695-712`). Meanwhile the toast `<li>` is `grid grid-cols-1 gap-1` (`DemoGlobalChrome.vue:32`) and the render puts `<div data-icon>` and `<div data-content>` as **siblings** inside it (`lib/index.js:697-708`).

**Failure scenario.** All 24 call sites are *typed* (`success`/`error`/`warning`/`info`) — none is a bare `toast()` — so every toast renders the 20×20 `currentColor` icon (`lib/index.js:813-829`) in **its own grid row, left-aligned above the title**, instead of beside it (the side-by-side comes from `[data-sonner-toast][data-styled='true'] { display:flex; align-items:center; gap:6px }`, `index.css:80-91`, which `unstyled` switched off). This survives the L-1 fix — importing the stylesheet does not restore these rules.

**Falsifier.** A live render showing icon-beside-title under `unstyled:true` (would mean I mis-read the gating); or the demo intending the stacked form (no such note anywhere in the file or `docs/`). Exact visual is **UNPROVEN-NEEDS-LIVE**; the CSS gating and DOM order are proven.

---

## L-5 · MINOR · dead code — three inert class placeholders

`actionButton: ''`, `cancelButton: ''`, `closeButton: ''` (`DemoGlobalChrome.vue:35-37`) are folded away by `cn()` (`lib/index.js:685,712`) and no call site uses `action`, `cancel`, or `closeButton` (all 24 options objects carry only `description`/`duration`/`id`). They read as "these are handled" while in fact those slots are **unstyled** under L-4 — a trap for the next author who adds an action button.
**Falsifier.** A call site passing `action`/`cancel`, or a `closeButton` prop on the `<Toaster>` (neither exists).

## L-6 · MINOR · stale rationale — the header cites a gate that no longer exists

`DemoGlobalChrome.vue:3-5` justifies the extraction as *"the J.W7a fix-round **proof:demo-no-oversize** seam"*. `package.json` has exactly two proof gates — `proof:publish` (`:50`) and `proof:owner-golden` (`:51`) — and `grep -rn "oversize" scripts/ package.json` → **0**. The file's stated reason for existing is a retired gate (consistent with the owner's retirement of the grep-based `proof:*` idiom). This matters on the L axis because it is the *only* argument the file offers for its current home — and it is void, which strengthens L-2.
**Falsifier.** An oversize gate surviving under another name in `scripts/gates/` (checked: `surface/`, `visual/` only).

## L-7 · MINOR · undocumented load-bearing contract — `to="html"`, not `to="body"`

`Teleport to="html"` (`DemoGlobalChrome.vue:27`) is almost certainly **deliberate and correct**: reka-ui's `DismissableLayer` sets `ownerDocument.body.style.pointerEvents = "none"` while a modal layer is open (`node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js:82-89`), so a `body`-teleported toaster would be click-dead under every dialog — and the demo explicitly requires toasts to stay clickable over dialogs (`toastGuard.ts:21-28` + `KeyframesAddDialog.vue:19`, `CSSPasteDialog.vue:6`). **The file never says so**: the 6-line comment justifies the *SVG* at length and gives the teleport target one parenthetical. A future "tidy-up to `body`" (the conventional idiom) passes every gate and silently breaks toast interaction under modals. Secondary cost: a non-`head`/`body` child of `<html>` is not valid per the HTML content model and is the direct cause of the L-1 fold geometry.
**Falsifier.** reka-ui not applying body `pointer-events` for the demo's dialogs (it does, for `disableOutsidePointerEvents` layers), or an existing comment/doc stating the rationale (searched `docs/`: none).

## L-8 · MINOR · **F-1 phantom-dep exposure, exactly here**

Confirming lane-frontend **F-1** against the tree: `grep -n "glass-ui" package.json package-lock.json` → **0 hits**, while `node_modules/@mkbabb/glass-ui/package.json` reports `"version": "7.0.0"`; there is no `demo/package.json`. Where it bites *this file*: all four toast utilities at `DemoGlobalChrome.vue:32-34` are glass-ui-owned — `text-body` and `text-small` are glass-ui `@utility` definitions (`dist/styles/typography/semantic.css`), and `bg-foreground`/`text-background` exist only because `dist/styles/theme/bridges.css` declares `--color-foreground: var(--foreground)` / `--color-background: var(--background)` in `@theme inline` (the demo declares neither: `grep "--color-foreground\|--color-background" demo/styles/*.css` → 0). Under a clean `npm ci` the toast has no typography and no colours — the class strings still *compile*, they just generate nothing.
**Falsifier.** glass-ui appearing in the lockfile (it does not), or the demo defining these tokens/utilities locally (it does not).

## L-9 · MINOR · the toast layer is outside the demo's declared z-order contract

`demo/styles/style.css:19-40` declares an authoritative ordered-layer contract (`--z-behind … --z-modal`, *"Use the SEMANTIC z-* utility for the rung; do NOT introduce a raw z-[N]"*) and enumerates **eight rungs — none for toasts**. glass-ui ships the missing rung (`dist/styles/tokens/scheme-motion.css`: `--z-toast: 160`, bridged as `--z-index-toast`). This component consumes neither: today the toaster has **no** z-index (L-1), and the moment the stylesheet lands it acquires vue-sonner's `z-index: 999999999` (`lib/index.css:43`) — 6 orders of magnitude past the contract's own ceiling `--z-max: 9999`. The correct landing is the tokened rung.
**Falsifier.** A demo-side rule assigning the toaster a `--z-*` rung (none exists).

## L-10 · MINOR · `theme="system"` desyncs from the app's own theme authority

`theme="system"` (`DemoGlobalChrome.vue:40`) makes the toaster track `matchMedia("(prefers-color-scheme: dark)")` (`lib/index.js:976, 1053-1078`) while the demo's theme is a **manual, `localStorage`-backed** toggle: `EditorShell.vue:44` renders glass-ui's `<DarkModeToggle>`, and glass-ui's `useGlobalDark` toggles `.dark` on `document.documentElement` and persists the choice (`dist/dark-z_P5QwqI.js:10-11,34,67`). A user in OS-light who toggles the app to dark gets `data-sonner-theme="light"` on the toaster. Today this is *inert* (the theme-keyed rules live in the missing sheet, e.g. `index.css:183`), which is precisely why it will surface as a surprise the day L-1 is fixed. Correct value: `theme="light"|"dark"` bound to `useGlobalDark().isDark`.
**Falsifier.** The demo's theme being purely OS-driven with no override — refuted by `DarkModeToggle` + the `localStorage` read in glass-ui's boot snippet. (I checked and do **not** claim a dark-variant break from the `html` teleport: `.dark` sits on `documentElement`, so the teleported node is a descendant and `@custom-variant dark (&:where(.dark, .dark *))` — `style.css:17` — still matches.)

## L-11 · MINOR · duplication — one control, two divergent rainbow enumerations

This file's `#rainbow-gradient` is 6 stops at 0/20/40/60/80/100% on a diagonal axis (`DemoGlobalChrome.vue:16-23`: red·orange·yellow·green·blue·violet). Its **only** consumer is the Apply-CSS paintbrush's *inactive* state (`RibbonBar.vue:56-61`, `stroke: 'url(#rainbow-gradient)'`). That same button's *active* state uses glass-ui's `rainbow-vivid` (`RibbonBar.vue:50`), which is 7 stops `to right` including `--rainbow-indigo` (`node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css`). So one control's two states paint from two different enumerations of one token family, one demo-owned and one vendor-owned — and the vendor recipe reaches for `--rainbow-indigo`, the one hue the demo's *authoritative* family (`design-idioms.css:15-21`) does not override, so that stop alone lands in glass-ui's oklch scale (`tokens/scale-paper.css`) among six demo hsl values.
**Falsifier.** Any consumer of `#rainbow-gradient` other than that one button (grep: none), or an owner ruling that the two states are deliberately different sweeps. Not a runtime break — a drift surface. (I explicitly do **not** claim `.rainbow-vivid` is broken: `--rainbow-indigo` *is* defined by glass-ui, so the gradient resolves.)

## L-12 · INFO · dead import

`import { Teleport } from "vue"` (`DemoGlobalChrome.vue:46`) is never referenced by the compiled render function: `@vue/compiler-core`'s `resolveComponentType` returns the core built-in for `Teleport` **before** consulting `<script setup>` bindings. Harmless (the binding is the same object, and rollup drops it), but it is dead code that reads as necessary.
**Falsifier.** A compiler configuration in which setup bindings take precedence over core built-ins (none in `vite.config.ts`).

## L-13 · INFO · decorative SVG is not hidden from the a11y tree

`<svg width="0" height="0" class="absolute">` (`DemoGlobalChrome.vue:14`) carries no `aria-hidden="true"` (and no `focusable="false"`). A zero-size `<svg>` still maps to a graphics role in some AT. Cross-axis — the **A** challenge owns the ruling; noted here only because the fix is one attribute in this file.

## L-14 · INFO · zero coverage on the sole toast mount

`grep -rln "Toaster\|sonner" test/ scripts/` → **0**. The single reference to toasts in the suite is a comment (`test/demo/instrument/timeline-undo.test.ts:33`). L-1 would have been caught at `6487c7f8` by one jsdom-free assertion in the demo roster or a Playwright smoke: fire a toast, assert `getComputedStyle(document.querySelector('[data-sonner-toaster]')).position === "fixed"`. The demo's *entire user-feedback channel* has no gate.

---

## Superlatives (L-18 runs both ways)

**S-L1 · the `stopColor` binding form is right, and for the right reason.**
`:style="{ stopColor: 'var(--rainbow-red)' }"` (`DemoGlobalChrome.vue:17-22`) rather than `stop-color="…"`. `var()` substitution is only dependable inside a CSS *declaration*; support for `var()` in SVG **presentation attributes** is not uniform across the demo's target engines, so the inline-style form is the portable one — and it keeps the stops single-sourced on the demo's authoritative token family (`design-idioms.css:13-21`) instead of freezing six hex literals. The comment at `:12-13` names that intent explicitly.
**Falsifier.** If every target engine resolved `var()` in presentation attributes, the six style objects would be gratuitous ceremony and the attribute form would be simpler.

**S-L2 · genuine singleton discipline.**
Exactly one `<Toaster>` and exactly one `#rainbow-gradient` exist in the tree (`grep -rn "Toaster\|rainbow-gradient" demo/` → this file, plus `RibbonBar.vue:59` as consumer). This survives a real hazard: `transport/index.ts:8-12` re-exports `AnimationControlsGroup` as a `defineAsyncComponent`, so a second host could have mounted a second copy — duplicate `id="rainbow-gradient"` (first-wins `url()` resolution) and doubled toasts. It does not: the sole host imports the SFC directly (`EditorShell.vue:120`), and the barrel's async export has no consumer. Under L-2's keyed remount Vue also unmounts-before-mounts, so even the transient double never occurs.
**Falsifier.** A second `AnimationControlsGroup` mount (playground/route/storybook) co-existing with the editor's — none in the tree today; **this superlative is one new host away from becoming a defect**, which is itself an argument for the L-2 re-home.

**S-L3 · the `class="absolute"` on the 0×0 SVG is load-bearing, not noise.**
`DemoGlobalChrome`'s roots land as direct children of `<main class="grid place-items-center place-self-stretch">` (`EditorShell.vue:74`), because reka's `TooltipProvider` renders no wrapper and `Teleport` leaves only an anchor. Without `absolute`, the `<svg>` would be a **second grid item** in an auto-row grid and would shift the centered work area. It is out of flow, zero-size, and correct. (Undocumented, like L-7 — the comment explains the paint-server registry but not the two layout facts that keep this component invisible.)
**Falsifier.** An explicit `grid-template-rows` on `<main>` or `display:none` on the SVG — neither exists.

---

## Reconciliation with the hitherto corpus

- **F-1 (lane-frontend, RED)** — CONFIRMED verbatim against the tree and localized to this file as **L-8**. No contradiction.
- **S-1..S-8 (lane-frontend shadow census)** — no row covers toasts. I add **S-9** (L-3) and rank it above S-5/S-6/S-7: it retires a runtime dependency *and* a private-API coupling module, and it root-causes four other findings here. This is an extension, not a contradiction.
- **lane-library.md (parse seams)** — no overlap; this component consumes no parser and, correctly, no engine API. (Worth stating for the "dogfooding" lens: `DemoGlobalChrome` is legitimately engine-free — it is chrome, not instrument. No misuse to flag.)
- **T·F3 / T·13-F8 / U·lane-17 #8 / U.B3 / U pass1 census** — all five prescribe re-homing `DemoGlobalChrome` to a document-singleton tier, and all five grade it **colocation/tidiness** (lane-17 explicitly `[MINOR · colocation]`). **I contradict the severity.** The mis-home is not aesthetic: the host is `:key="superKey"`-remounted per scene (`EditorShell.vue:75`, corroborated by `useSceneMachineShellBinding.ts:137-139`), and vue-sonner's Toaster is subscribe-only, so the wrong home **destroys live toasts on every scene switch** (L-2). The re-home is a *correctness* fix, and its own stated justification has expired (L-6). Prior lanes also did not reach the dependency layer: none observed that the toaster has no stylesheet (L-1), that `unstyled` voids the icon rules (L-4), or that glass-ui ships the whole family (L-3).

## What the live (SS-13) pass must settle

1. Is any toast visible at all today? (L-1 — the one observation that could kill the blocker.)
2. Post-`style.css` import: icon-above-title vs icon-beside-title (L-4), and the bottom-right toaster's occlusion of the dock band (design axis).
3. Toast survival across a cross-scene share-restore (L-2) — reproduce with a `?state=` URL whose `activeScene` differs from the current one.
4. Toast clickability while a modal dialog is open (L-7) — the observation that would confirm `to="html"` as deliberate.
