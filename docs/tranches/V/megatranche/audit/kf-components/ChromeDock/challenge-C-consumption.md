claude-opus-5[1m]

# CHALLENGE · ChromeDock · axis C (CONSUMPTION)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/ChromeDock.vue` (385 lines)
**Tree HEAD:** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every runtime-only inference is marked **UNPROVEN-NEEDS-LIVE**.
**Producer evidence:** the *installed* `node_modules/@mkbabb/glass-ui@7.0.0` `dist/` + `node_modules/reka-ui` `src/` — i.e. exactly the code this component links against today.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries its own falsifier; a claim that cannot be killed by an observation is not a claim.

**Tally after Round 3: 25 defects (3 BLOCKER · 12 MAJOR · 8 MINOR · 2 INFO) · 6 superlatives.**

> **Round 2.** §§0–7 are the first pass, preserved verbatim so cross-lane citations of `C-1…C-17` / `S-1…S-5` keep resolving. Round 2 re-verified the first pass's two BLOCKERs at source before building on them (`dist/dock.js` layer render for C-1; `node_modules` + `package.json:37-38` for C-2) — both stand.
>
> **Round-2 integrity note, filed by Round 3.** This header previously promised a `§6b` (`C-18…C-25`, `S-6`, `S-7`) and a `§6c` withdrawing `S-2`. **Neither section exists in the file.** Read whole at Round 3 (388 lines, 50 290 bytes): the body runs §0 → §7 → Provenance and stops; `grep -n "C-18\|C-25\|§6b\|§6c\|S-6\|S-7"` returns only the header line itself. So the round-2 tally (25 defects / 6 superlatives) counted eight defects and two superlatives that were never written down, and `S-2` stands un-withdrawn. Round 3 does not attempt to reconstruct them — it files its own eight (`R3-1…R3-8`) and one superlative (`S-R3-1`) from an independent read, which restores the promised arithmetic by coincidence, not by recovery. **If the round-2 `C-18…C-25` text surfaces, it must be merged, not assumed subsumed.**
>
> **Round 3 (this pass).** §8 adds eight findings from an independent read of the component and every module it imports (`R3-1…R3-8`, one BLOCKER), one superlative (`S-R3-1`), and two probed negative findings (§8.9) that extend `C-5` and §3. It **contradicts `S-1` in part** (§8.5, §8.6) and **contradicts nothing else**; where it overlaps rounds 1–2 it says so and does not re-file.

---

## 0. Read set

Component read whole. Every import followed to source:

| import | resolved | read |
|---|---|---|
| `@components/instrument/transport/injectionKeys` | `demo/components/instrument/transport/injectionKeys.ts` | ✔ |
| `@lucide/vue` (9 glyphs) | pkg | ✔ (surface only) |
| `@vueuse/core` `useMediaQuery` | pkg | ✔ (surface only) |
| `@mkbabb/glass-ui/dock` | `dist/components/dock/index.d.ts` + `dist/dock.js` | ✔ |
| `@state/controlSurfaces` | `demo/state/controlSurfaces.ts` (309 L) | ✔ |
| `@components/instrument/surfaceTabs` | `demo/components/instrument/surfaceTabs.ts` (41 L) | ✔ |
| `@mkbabb/glass-ui` (root, `Select*`) | `dist/select-DD6Ly6xg.js` + `dist/components/select/*.d.ts` | ✔ |
| `@mkbabb/glass-ui/status-dot` | `dist/status-dot.js` + `dist/components/_shared/feedback.d.ts` | ✔ |

Seam context also read: `demo/app/App.vue` (the SOLE consumer), `demo/app/dock/index.ts`, `demo/app/dock/MbabbMenu.vue` (the `#items` occupant), `demo/app/scene/scenes.ts`, `demo/composables/scene-facility/index.ts`, `demo/state/useSceneMachine.ts`, `demo/components/instrument/transport/TransportDock.vue` (the sibling dock — the house pattern comparand), `reka-ui/src/Select/{SelectValue,SelectItemText,SelectContent,SelectTrigger}.vue`, `scripts/observe/demo/live-session.mjs`, `tsconfig.json`, `demo/env.d.ts`, `.github/workflows/ci.yml`, `assets/icons/*.svg`.

**Hitherto corpus folded, not re-invented:** lane-frontend `F-1` (phantom glass-ui dep), `F-2`/`S-1` (the *stale-rationale-against-installed-7.0.0* class), `F-6` (clean glass boundary), §3.1 (21/73 subpath utilisation); lane-library §4.6 (the R1 blast radius). Cited inline. Where the tree contradicts a lane, it is said so explicitly (see §C-4 and §3).

---

## 1. BLOCKERS

### C-1 · BLOCKER · The collapsed dock has no keyboard-reachable expand affordance — the app's only scene navigation is keyboard-dead

**Provenance**
- `ChromeDock.vue:224` — `<GlassDock ref="dockRef" :collapse-delay="2500" :start-collapsed="true" :fit-content="true">`. `startCollapsed` ⇒ `initialExpanded: !a.value` = `false` (`dist/dock.js:718`), so the dock is collapsed at first paint and re-collapses 2.5 s after every idle.
- `ChromeDock.vue:363-366` — the `#collapsed` slot contains **only** `<component :is="currentIcon">` or `<Home>`. No `<button>`, no `role`, no `tabindex`, no `aria-label`.
- `dist/dock.js` (GlassDock render) — the two layers:
  - full: `class="dock-layer dock-layer--full"`, `inert: V !== "full" && Z !== "full" || void 0` ⇒ **`inert` whenever the dock is collapsed**, which removes its whole subtree (the scene `Select`, the panel toggle, the `#items` `@mbabb` trigger) from the tab order.
  - summary: `class="dock-layer dock-layer--summary"` with a bare `onClick` handler (`onClickCollapsed`) — a plain `<div>`; `grep -n "tabindex" dist/dock.js` returns hits only in `DockControl`/roving-focus code, none on the summary layer.
- `useDockState` (`dist/dock.js:330-380`) exposes `onMouseEnter / onMouseLeave / onFocusIn / onFocusOut / onClickCollapsed` — **no `keydown` handler anywhere** (`grep -n "keydown" dist/dock.js` → 0 hits in the dock-state region). The only non-pointer expansion path is `onFocusIn` on the dock root, which cannot fire because the sole focusable subtree (`.dock-layer--full`) is `inert`.
- No global shortcut compensates: every `registerShortcut` call in the demo lives in `components/instrument/transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts:50-71` (Playback / Navigation-within-scene / Actions). **None switches scenes or expands a dock.**
- The repo's own harness corroborates the mouse-only reality: `scripts/observe/demo/live-session.mjs:274-290` must synthesise `mouse.move` into the dock's bounding box before it can click `[aria-label="Scene"]`, with the comment "a probe that does not hover-expand the dock NEVER exercises the switch" (`:275-276`).

**The sibling proves the house pattern.** `TransportDock.vue:183-213` puts a real glass-ui `<Button>` — with a deliberately disambiguated `:aria-label` — inside *its* `#collapsed` slot, under a comment block that reasons explicitly about being "Collapsed-but-PLAY-REACHABLE" (`:30`). The summary layer is **not** inert, so that button is focusable, `onFocusIn` fires, and the transport dock expands from the keyboard. ChromeDock is the deviation, not the norm.

**How it got here (and why it is a consumption defect, not a producer defect).** `ChromeDock.vue:347-362` documents the reduction: on glass-ui 4.0.0 the collapsed dock necked to a perfect circle, the three-part chip clipped ("Cube" → "Cub"), so the slot was reduced to the glyph alone. The reduction is design-correct and explicitly framed as "a kf-CONSUME fit (no GlassDock patch)". What it silently deleted was the *only* interactive/named content in the collapsed state. glass-ui offers both levers to avoid this — `alwaysExpanded` (opt out of collapse for a primary-nav dock) and an arbitrary-content `#collapsed` slot that accepts a `DockControl` (a real `<button>` with `aria-label`). Neither is taken.

**Severity rationale.** The ChromeDock scene `Select` is the app's *sole* scene-navigation affordance (the only alternative is hand-editing the URL hash). A keyboard-only or switch-access user cannot reach it after 2.5 s. That is a total loss of navigation, not a degradation.

**ROUND-2 AMENDMENT — a third, cheaper lever the first pass did not name.** GlassDock exposes five slots (`GlassDock.vue.d.ts`: `persistent`, `default`, `collapsed`, `search`, `persistent-end`); ChromeDock consumes **two**. The render (`dist/dock.js`, GlassDock template) places `#persistent` / `#persistent-end` **outside** `.dock-layers` —

```js
t.$slots.persistent ? (U(), j("div", qe /* class:"dock-persistent" */, [K(t.$slots, "persistent")])) : A("", !0),
M("div", { ref_key: "layersEl", … class: "dock-layers" }, [ /* full (inert when not active) */, /* summary (inert when not active) */ ])
```

— and neither persistent region carries an `inert` binding, unlike both layers. A single `<DockControl aria-label="Scenes">` in `#persistent` is therefore focusable in **both** dock states, which `#collapsed` cannot be (the summary layer is itself `inert: V !== "summary" || void 0`, so a control placed there is unreachable whenever the dock is expanded). This makes the remedy strictly smaller than `alwaysExpanded` and does not touch the C-4/S-5 collapsed-circle fit. **Falsifier:** show `inert` is emitted on `.dock-persistent` (it is not — the `Ge` attr list for the dock root and the `Je`/`Ye` lists for the two layers are the only `inert` carriers).

**Falsifier (any one kills it):** (a) find a focusable element that stays in the tab order while the dock is collapsed and inside the dock root — i.e. outside `.dock-layer--full`'s `inert` subtree; (b) find a registered global shortcut that calls `expand()` or switches scenes; (c) show `inert` is not emitted (e.g. `V` resolves to `"full"` at rest while collapsed); (d) show a second scene-nav affordance elsewhere in the shell.
**UNPROVEN-NEEDS-LIVE:** the final *observation* (tab through the page and confirm the dock is skipped) is a runtime property of `inert` + focus order and belongs to the SS-13 pass. Every input to the deduction above is static and cited.

---

### C-2 · BLOCKER · ChromeDock's entire props/emits contract is enforced by nothing — no `vue-tsc`, and a wildcard `*.vue` shim erases the contract at the call site

**Provenance**
- `package.json` scripts: `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`, `"check:lib": "tsc --noEmit -p tsconfig.lib.json"`. **There is no `vue-tsc` script.**
- `vue-tsc` / `@vue/language-tools` are **not installed**: `ls node_modules | grep -i vue-tsc` → nothing; `ls node_modules/@vue/` → only the runtime/compiler packages.
- `.github/workflows/ci.yml:41-42` runs **`npm run check:lib`** — `tsconfig.lib.json`, which includes `src/` only. `npm run check` (the one whose `include` is `["src/", "demo/"]`) is **not run in CI at all**; nor is it in `release.yml` (`:42-43` is also `check:lib`).
- Plain `tsc` does not parse `.vue`. `demo/env.d.ts:3-7` supplies the shim:
  ```
  declare module "*.vue" {
      import type { DefineComponent } from "vue";
      const component: DefineComponent<{}, {}, any>;
      export default component;
  }
  ```
  So `app/dock/index.ts:1`'s `export { default as ChromeDock } from "./ChromeDock.vue"` yields a component whose props are `{}` and whose everything-else is `any`.
- Measured: `npx tsc --noEmit` at HEAD exits **0**. It exits 0 *because* the shim makes every SFC contract vacuous, not because the contracts hold.

**Consequence, stated precisely.** `ChromeDock.vue:60-79` declares a 9-field `defineProps<{...}>` and `:150-155` a 4-signature `defineEmits<{...}>`. `App.vue:4-26` — the only mount site in the tree (`grep -rn "ChromeDock"` → `app/dock/index.ts`, `App.vue:4/26/144`, prose elsewhere) — binds all nine props and all four handlers. **Not one of those 13 bindings is type-checked by any gate, local or CI.** A renamed prop, a dropped required prop, a `string` where a `ControlSurface[]` belongs, or an emit payload of the wrong shape all pass `npm run check` and all pass CI. `tsconfig.json` even sets `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` — a strictness posture that this file never receives.

This is the *root enabler* for C-3, C-4, C-7 and C-8 below: each is exactly the class of drift a template typecheck exists to catch.

**Falsifier:** find a `vue-tsc`/`vue-language-server` invocation in any script, workflow, git hook, or gate script (`scripts/gates/**`) that covers `demo/**/*.vue`; or show that `declare module "*.vue"` is overridden by a per-file `.vue.d.ts` for ChromeDock. Either kills it.

---

## 2. MAJOR

### C-3 · MAJOR · ChromeDock consumes a **shadow** `SURFACE_META` / `dockCardinality` registry while its only parent feeds the same rendered list from the canonical one

Two complete, independent copies of the surface-metadata + cardinality model exist:

| symbol | canonical | shadow |
|---|---|---|
| `ControlSurfaceTab` | `state/controlSurfaces.ts:134-138` | `components/instrument/surfaceTabs.ts:6-10` |
| `SURFACE_META` | `state/controlSurfaces.ts:145-160` | `components/instrument/surfaceTabs.ts:12-19` |
| `extraTabsFrom` | `state/controlSurfaces.ts:189-195` | `components/instrument/surfaceTabs.ts:21-23` |
| `dockCardinality` | `state/controlSurfaces.ts:278-309` | `components/instrument/surfaceTabs.ts:25-41` |

The canonical copy is re-exported from the `@state` barrel (`state/index.ts:53-63`). Consumers split cleanly down the middle:

```
state/useSceneMachine.ts:34-38   → extraTabsFrom      (canonical, via ./controlSurfaces)
ChannelControls.vue:248          → SURFACE_META       (canonical, via @state)
ChromeDock.vue:18-21             → SURFACE_META, dockCardinality   (SHADOW)
TransportDock.vue:237            → dockCardinality                  (SHADOW)
```

**The two halves of one rendered list come from different registries.** `ChromeDock.vue:49-50` builds `BUILT_IN_CONTROL_TABS` by mapping `BUILT_IN_SURFACES` (canonical, `@state/controlSurfaces:51-55`) through the **shadow** `SURFACE_META`. `App.vue:264` builds `extraControlTabs` from `machine.extraControlTabs()` → `useSceneMachine.ts:318` → `extraTabsFrom` → the **canonical** `SURFACE_META`. `ChromeDock.vue:95-101` then concatenates them into one `allControlTabs` array and renders it as a single `<Select>`.

**What this contradicts.** `ChromeDock.vue:12-17` opens with "ONE source of the count arithmetic, per lane 18's dual-formula rule"; `:44-45` says the tab metadata "DERIVES from the ONE `SURFACE_META` registry (the former hand-synced literal here was one of the three triplicated sites)"; `state/controlSurfaces.ts:123-129` narrates killing that exact triplication ("three hand-synced copies of one fact. This is the SINGLE source"); `:140-144` calls itself "THE ONE SURFACE-METADATA REGISTRY … proof:dfa-derived's 'resolves from exactly ONE module' clause". The tree has a *second* module, and ChromeDock reads it.

**Honest scope:** the two copies are byte-equivalent **today** (diffed field-by-field: all six surfaces, labels and icon keys identical). This is a *drift surface with zero gate*, not a live divergence — and I will not overstate it. But the gate is C-2: nothing type-checks `ChromeDock.vue`, and nothing structurally couples the two files, so the first edit to either produces a dock rendering a list assembled from two disagreeing sources. It also composes with C-7 (an unguarded icon lookup keyed by a string that now has two authorities).

**Falsifier:** show a build-time or test-time assertion that the two `SURFACE_META` objects are equal, or a re-export chain that makes `components/instrument/surfaceTabs.ts` a view of `state/controlSurfaces.ts` rather than a copy (it is not: `surfaceTabs.ts` imports only `BUILT_IN_SURFACES` and `type ControlSurface`, then re-declares everything else). Either kills it.

---

### C-4 · MAJOR · The `inline` control-zone arm is unreachable dead code, and the prose that justifies it is falsified by the tree — and by the repo's own harness

**The claim in the file.** `ChromeDock.vue:116-125` and `:141-146` assert that the control zone is elided to `absent` when the sole tab's label is redundant with the scene identity, "easing→\"Easing\", spring→\"Spring\" — **always true on the surviving scene set**", and that the `inline` arm is "**never on the surviving scene set**, carried for T.B5 contract parity". `:44-48` states "The easing scene's set is `['easing']` … so NONE of this triad renders for it". `App.vue:204-206` repeats it: "the easing scene → [], so NO keyframes/timeline tab node exists for it".

**What the tree does.** `controlZoneKind` (`:126-134`) resolves through `dockCardinality`, whose `inline` arm requires `tabs.length === 1` (`surfaceTabs.ts:30-34`) and whose `controlLabelRedundant` requires `inline` **and** a case-insensitive label≡sceneLabel match (`:38-39`). Enumerate all seven scenes through `surfacesFor` (`state/controlSurfaces.ts:95-120`):

| scene | selected channel paints? | derived set | `allControlTabs` | zone |
|---|---|---|---|---|
| `home` | — (`App.vue:248-255` short-circuits `isHome` → `[]`) | `[]` | 0 | **absent** |
| `cube` | yes (`facilityFromGroup` sets `animation` on **every** channel, `scene-facility/index.ts:92-99`) | triad (+`matrix-controls` on Matrix) | 3–4 | **select** |
| `amiga` | yes (`AmigaScene.vue:232` `facilityFromGroup`) | triad | 3 | **select** |
| `square` | yes (`SquareScene.vue:311` `facilityFromGroup`) | triad | 3 | **select** |
| `easing` | yes — `useEasingDemo.ts:354` `animation: previewAnim` | triad + `easing` | **4** | **select** |
| `spring` | yes — `useSpringDemo.ts:408` `animation: springEditAnim` | triad + `spring` | **4** | **select** |
| `sequence` | **no** `animation`, no `surfaces`, `facets: []` (`useSequenceDemo.ts:422-436`) | `[]` | 0 | **absent** |

`tabs.length === 1` **never occurs**. Therefore `controlZoneKind` ∈ {`select`, `absent`}, `controlLabelRedundant` is permanently `false`, `inlineControlTab` (`:144-146`) is permanently `undefined`, the entire `v-else-if="inlineControlTab"` branch (`:307-318`) is unreachable, and the `.dock-inline-tab` scoped rule (`:372-385`) styles nothing. `showControlSection` collapses to `allControlTabs.length > 0` — the exact same predicate as `hasControlPanel` (`:114`) — and `multipleControlTabs` is `true` whenever the section shows.

**Second-order:** the labels the redundancy test compares are *not* the scene names. `SURFACE_META.easing.label = "Curve"` and `.spring.label = "Physics"` (both registries, `surfaceTabs.ts:16-17` / `controlSurfaces.ts:153-154`) — deliberately renamed at T.E8 precisely so they name the facet, not the scene (`controlSurfaces.ts:149-152`). So even in the counterfactual where the count were 1, `controlLabelRedundant` would still be `false`.

**The repo already knows.** `scripts/observe/demo/live-session.mjs:206-221` carries the correction verbatim: the pre-B2 `null` expectations for easing/spring are annotated "**T.B2 RE-ARM: easing/spring now DERIVE the full triad from their painting channels (the #25 asymmetry cure) — the Controls tab PROJECTS on entry (the pre-B2 null expectation asserted the exclusion-table state)**", and `SWEEP_META` now expects `easing: { trigger: "Curve" }`, `spring: { trigger: "Physics" }`. The harness was migrated for T.B2; `ChromeDock.vue`'s and `App.vue`'s comments were not.

**Why this is MAJOR, not cosmetic.** ~40 lines of the component (three computeds, an 11-line template branch, a 13-line scoped-style block) exist to serve a state the DFA cannot produce, and the four comment blocks that explain the component's central design decision assert the opposite of what it does. Any future reader reasoning about the elision reasons from a false model. It is also live risk: the dead branch carries an ARIA violation (C-11) and a phantom token (C-9) that no one will ever see fail.

**Contradiction with the hitherto corpus, stated explicitly:** none. lane-frontend does not reach the DFA layer. This finding *extends* the lane's `F-2` class (rationale stale against the current tree) from the glass-ui axis to the demo's own state layer.

**Falsifier:** exhibit a routed scene, or a selected-channel state, in which `surfacesFor` returns exactly one surface. Concretely: a `ChannelHandle` with no `animation` that declares exactly one `surfaces` entry while its facility has no facets, or a facility with exactly one facet whose selected channel is light. `grep -rn "surfaces:" demo/scenes demo/app demo/components` returns **zero** channel-level `surfaces` declarations at HEAD — but one added later kills this claim, and correctly so.

---

### C-5 · MAJOR · `autoLuminance` is left default-ON with no `backgroundCanvas`, over an animated Aurora canvas — the dock pays for a value.js oklch histogram and reads the wrong substrate

**Provenance**
- `ChromeDock.vue:224` passes only `collapse-delay`, `start-collapsed`, `fit-content`. `backdropMode` and `autoLuminance` are both unset.
- `dist/dock.js:718` (GlassDock setup): `n.backdropMode === "live" && n.autoLuminance !== !1 && Pe(h, { backgroundCanvas: () => { let e = n.backgroundCanvas; return typeof e == "function" ? e() : e instanceof HTMLCanvasElement ? e : null; } })`. Defaults are `backdropMode: "live"` and `autoLuminance: true` (`useDockShellProps.d.ts`), so **the observer runs** and `backgroundCanvas` resolves to `null`.
- The observer's hue pass reaches value.js: `dist/dock.js:26` `import { convertColor as me, rgb as he } from "@mkbabb/value.js/color"`, called once per sampled pixel in `accumulateHuePixel` — `me(he(t,n,r), "oklch").channels`.
- `DockProps.backgroundCanvas` doc (`useDockShellProps.d.ts`): "The KNOWN background-layer canvas the dock floats over (an aurora/blob `<canvas>`) … When present, the observer downsamples it under the dock's box each settle (the **ANIMATED-backdrop** case); absent, it stack-walks the painted page background (the **static** case)."
- The dock *does* float over an aurora canvas on home. `App.vue:45-47` mounts `<HeroAurora />` in `EditorShell`'s `#backdrop` slot; `HeroAurora.vue:20-31` renders `<div class="hero-aurora pointer-events-none fixed inset-0">` (`:114-120` — `100dvh`/`100dvw`) wrapping `<Aurora :runtime-options="{ initStrategy: 'eager' }" render-mode="auto">`, and glass-ui's `dist/aurora.js:2642,2705` creates and renders a `<canvas>`. `ChromeDock.vue:214-217` is `fixed` at `--dock-top-anchor` — i.e. directly over it.

**The defect is two-sided.** (i) *Cost*: a rAF-throttled ≤4 Hz sampler with a per-pixel sRGB→oklch conversion through value.js runs on a permanently-mounted, always-visible surface, for a refinement whose input is wrong. (ii) *Correctness*: on the home scene the observer takes the **static stack-walk** path over an **animated** backdrop, so the adaptive darken is computed against the page background rather than the aurora actually painting under the dock — the exact case the `backgroundCanvas` prop exists to serve.

**The queued-capability half.** `App.vue:361-378` records the perf keystone: the glass chrome's live `backdrop-filter` re-sampling the moving stage is "VERDICT #19 root cause #1", with "NO pure-CSS kf-side cure", and names the awaited fix as "the glass-ui `blur-source=\"static\"` frozen-backdrop capability, **queued to Glass BI for its 6.0.0 cut**". glass-ui **7.0.0 is installed**. Its `backdropMode: "static"` is *not* that capability (it is "a solid plate with no luminance observer or backdrop-filter work" — blur off, not blur frozen), so the queued ask is genuinely still unmet and I do not claim otherwise. But `autoLuminance` is separable and *is* shipped: `:auto-luminance="false"` removes the sampler — and with it the value.js work — while leaving the live blur, and `:background-canvas` fixes the reading if the sampler is kept. Neither lever is touched. This is lane-frontend `F-2`'s class (a shipped 7.0.0 capability unconsumed because the consumer's notes predate it), on the perf axis rather than the ARIA axis.

**Falsifier:** show `Pe(...)` (the observer) is a no-op when `backgroundCanvas` resolves `null`; or show the aurora canvas is not in the dock's box (e.g. clipped, or `render-mode="auto"` settling on the CSS-gradient arm and never creating a canvas — `initStrategy: 'eager'` argues against, but this is the weakest link in the chain and the one to test first); or show the stack-walk already samples canvases. Any kills the correctness half; only the first kills the cost half.
**UNPROVEN-NEEDS-LIVE:** the measured cost of the observer and the visible correctness of the darken belong to SS-13.

---

### C-6 · MAJOR · The re-expand watcher defends against a glass-ui behaviour that the installed 7.0.0 does not have

`ChromeDock.vue:188-202` carries a 9-line rationale and a second watcher:

> "keepOpen() blocks the idle-TIMER collapse, **but the dock's document-pointerdown path can still force a collapse** (its own dismiss-synthetic pointerdown lands outside the dock and self-collapses it, **bypassing the hold counter**). So we ALSO re-assert expand() …"

The installed document-pointerdown handler (`dist/dock.js`, `useDockState`) is:

```js
function I(e) {
    if (c() || p.value > 0 || a?.value) return;      // p = the HOLD COUNTER
    let t = n.value;                                  // n = rootEl
    !t || t.contains(e.target) || Fe(e.target, o) || E();   // Fe = isTeleportedTarget, o = dockId; E = collapse
}
```

with `keepOpen = P` → `p.value++` and `release = F` → `p.value = Math.max(0, p.value - 1)` (same region). So:

1. **The hold counter is honoured, not bypassed** — `p.value > 0` is the *second* clause of the early return, evaluated before any collapse.
2. There is a **second** guard the comment does not know about: `Fe(e.target, o)` = `isTeleportedTarget`, documented at `dist/components/dock/composables/isTeleportedTarget.d.ts` — "Dock-owned popovers/selects/menus mark their teleported content with `data-glass-dock-portal` and `data-glass-dock-owner`. That keeps click-away logic scoped to the owning dock". glass-ui's `SelectContent` stamps exactly those attributes (`dist/select-DD6Ly6xg.js`, SelectContent render: `"data-glass-dock-portal": _(d)?.id ? "" : void 0, "data-glass-dock-owner": _(d)?.id`). A pointerdown inside this dock's own Select menu is therefore already exempt from the collapse path.

ChromeDock calls `keepOpen()` on `isAnyOpen` (`:204-209`) *before* any dismiss pointerdown can occur (the popup must be open first). With `p.value > 0`, `I()` returns at the guard and `E()` (collapse) is never reached — so the collapse the watcher repairs cannot happen through the described mechanism. The watcher is defensive code against a behaviour the dependency does not exhibit, plus a nine-line comment asserting a false property of that dependency, which is how the next reader will reason about the seam.

**Honest bound:** there is a sub-tick window — `openPopup.value = key` is set by the Select's `@update:open`, and `watch(isAnyOpen, …)` flushes `pre` (next microtask), so a pointerdown landing between the two would see `p.value === 0`. That window is not humanly reachable and, in any case, is not the mechanism the comment names.

**Falsifier:** demonstrate a collapse-while-popup-open at HEAD (live), or find a *different* collapse path in 7.0.0 that ignores `p.value` (candidates: `Ue(...)`, the touch-gate `deactivate`; `He(...)`; the crossfade focus handoff `w(e,t)`). Producing one kills this and vindicates the watcher.
**UNPROVEN-NEEDS-LIVE:** the removal is only safe after a live re-check; the *claim about the guard* is static and cited.

---

### C-7 · MAJOR · The trigger's `TAB_ICONS` lookup is unguarded while its identical twin twelve lines below is guarded

```
:292  <component :is="TAB_ICONS[allControlTabs.find(t => t.value === selectedControl)?.icon ?? 'SlidersHorizontal']" class="icon-md …" />
:299  <component v-if="tab.icon && TAB_ICONS[tab.icon]" :is="TAB_ICONS[tab.icon]" class="icon-md …" />
```

`TAB_ICONS` (`:52-58`) is a 5-key `Record<string, Component>` keyed by *string*; `allControlTabs` entries carry `icon?: string` sourced from `SURFACE_META` — **which now has two authorities** (C-3). Line 299 correctly treats the lookup as partial; line 292 treats it as total. A key present in either `SURFACE_META` but absent from `TAB_ICONS` yields `:is="undefined"` at the trigger — Vue renders nothing and emits an "Invalid vnode type" warning, and the dock trigger silently loses its glyph.

`tsconfig.json` sets `"noUncheckedIndexedAccess": true`, so `TAB_ICONS[k]` is `Component | undefined` and a template typecheck would flag `:292` immediately. There is no template typecheck (C-2).

**Honest scope: latent, not live.** All five icon keys currently in use (`SlidersHorizontal`, `Braces`, `Clock`, `Activity`, `Grid3X3`) are present in `TAB_ICONS`. The named trigger is the C-3 drift surface plus any new `ControlSurface` whose `SURFACE_META` icon is added to only one registry — a two-line change in a file no gate reads.

**Falsifier:** show `SURFACE_META.icon` is constrained (by type or by test) to `keyof typeof TAB_ICONS`. It is `icon?: string` in both copies (`surfaceTabs.ts:9`, `controlSurfaces.ts:137`), and `SceneFacet.icon` is also `string` (`scene-facility/index.ts:53`), so it is not.

---

### C-8 · MAJOR · The DFA alphabet is widened to `string` at the prop boundary — from the very module ChromeDock already imports

```
:62   scenes: { id: string; label: string; icon?: Component }[];
:71   controlSurfaces?: string[];
:72   extraControlTabs?: { value: string; label: string; icon?: string }[];
:66   selectedControl?: string;
:154  (e: "updateSelectedControl", value: string): void;
:49   const BUILT_IN_CONTROL_TABS: { value: string; label: string; icon?: string }[] = …
```

`ControlSurface` (a 6-member union) and `ControlSurfaceTab` are both **exported by the modules already imported at `:15-21`** — `BUILT_IN_SURFACES` comes from `@state/controlSurfaces` (which exports `ControlSurface` at `:40-46`), and `SURFACE_META`/`dockCardinality` come from `@components/instrument/surfaceTabs` (which exports `ControlSurfaceTab` at `:6-10`). Using them costs one identifier each.

The cost of not using them is exactly the safety the component's own jsdoc promises: `:67-71` calls `controlSurfaces` "The active scene's valid BUILT-IN editor surfaces (the DFA projection)" — but as `string[]` a typo'd or invented surface id is well-typed, silently fails `valid.includes(t.value)` at `:98`, and manifests as a missing tab with no error. Likewise `updateSelectedControl(value: string)` sheds the alphabet on the way back up to `App.vue:307-310`, which then has to re-project it through `machine.selectedControlSurface(v) ?? v` — the `?? v` fallback re-admits the un-narrowed string into the store.

**Contrast — the same file does it right once.** `scenes: { id, label, icon? }[]` (`:62`) is a *deliberate* structural narrowing: `SceneDescriptor` (`app/scene/scenes.ts:64-92`) also carries `superKey`, `stageMode`, `component`, `showStartScreen`, `gridBackground` — route/store concerns the dock must not depend on. Declaring the minimum shape keeps the dock decoupled and stays assignable. That is a *gain*. `controlSurfaces?: string[]` is a *loss*, because the enum is already in scope. The two are not the same move and I score them differently (see superlative S-3).

**Falsifier:** show `ControlSurface`/`ControlSurfaceTab` are not exported, or that importing them from either module creates an import cycle into `ChromeDock.vue`. Both are exported; `state/controlSurfaces.ts:57-62` documents that it is structurally typed *precisely* to stay cycle-free, and `surfaceTabs.ts` imports only from `@state`.

---

## 3. value.js transitive exposure — the R1 class is **NOT** reachable from ChromeDock (negative finding, stated for the record)

The brief asks where the R1 parser-crash class (`parseCssColor("oklch()")`) is reachable. From this component: **it is not.** Chain, exhaustively:

- ChromeDock imports no value.js symbol directly.
- Of its glass-ui imports, only `dist/dock.js` touches value.js at all: `:26` `import { convertColor as me, rgb as he } from "@mkbabb/value.js/color"`. Both call sites are inside `accumulateHuePixel` and take the **numeric constructor** path — `me(he(t, n, r), "oklch")` — never a string.
- glass-ui deliberately does **not** route CSS-string colour through value.js's parser here: `dist/dock.js` hand-rolls `function ve(e) { let t = e.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i); … }` for the stack-walk read.
- `dist/status-dot.js` imports nothing from value.js (`_plugin-vue_export-helper`, `FeedbackMark`, `vue` only). `dist/select-DD6Ly6xg.js` imports nothing from value.js.
- lane-library §4.6 places the R1 crash surface at `demo/scenes/square/useSquareTumble.ts:22` — a different subtree entirely; ChromeDock does not reach it.

**Live exposure that *does* exist** is C-5's: a per-pixel `rgb()`→`convertColor(…, "oklch")` on the dock's ≤4 Hz sampler. That is a *throughput* seam into value.js, not a parse seam.

**Falsifier:** find a `parseCssColor` / `parseCssScalar` / `ValueUnit` call reachable from `GlassDock`, `DockTrigger`, `DockControl`, `DockSeparator`, `StatusDot`, or the `Select*` family in the installed 7.0.0. `grep -rn "parseCssColor\|parseCssScalar" node_modules/@mkbabb/glass-ui/dist/{dock,status-dot,select-*}.js` returns nothing.

---

## 4. MINOR

### C-9 · MINOR · `--dock-label-padding-inline` is a phantom token; the real glass-ui knob is `--dock-trigger-padding-inline`

`ChromeDock.vue:381` — `padding-inline: var(--dock-label-padding-inline, 0.5rem);`. Exhaustive search: `grep -rn "dock-label-padding-inline" demo/ node_modules/@mkbabb/glass-ui/dist/` → **exactly one hit, this line**. The variable is defined nowhere, so the fallback always wins.

The stated intent (`:373-377`) is that the inline box "reads at the same inline height + padding a `DockSelectTrigger` occupies so the dock row keeps its rhythm". The token that actually governs that is `--dock-trigger-padding-inline`, set per density rung in `dist/components/dock/styles/density.css`: `sm` 0.4375rem, `md` 0.5rem, `lg` 0.625rem, `xl` 1rem — each multiplied by `--dock-scale` (which itself picks up `--dock-coarse-scale: 0.78` under `@media (pointer: coarse)`, `dist/components/dock/styles/overflow.css`). The hardcoded 0.5rem coincides with the `md` rung at scale 1 and tracks nothing else.

Rated MINOR rather than MAJOR only because the rule styles the unreachable C-4 branch. It is still a fabricated token in a `--dock-*` namespace the producer owns, which reads to a maintainer as a supported knob.

**Falsifier:** find any definition of `--dock-label-padding-inline` in either repo, or in a `@property` registration.

### C-10 · MINOR · `dock-label` is applied to **portalled** menu content, where the tokens it derives from do not resolve

`ChromeDock.vue:247` and `:296` put `class="dock-label"` on `<SelectGroup>`. glass-ui's `SelectContent` renders inside reka's `SelectPortal` (`dist/select-DD6Ly6xg.js`, SelectContent render wraps in `_(E)` = `SelectPortal`), i.e. at `document.body`. The `dock-label` utility (`dist/styles/typography/semantic.css`) is `font-size: var(--dock-label-size, calc(var(--dock-control-size, 2.5rem) * var(--dock-label-ratio)))`. `--dock-label-ratio` is `:root`-scoped (`dist/styles/tokens/sizing.css`), but `--dock-control-size` and every density/scale override are scoped to `.glass-dock[data-size=…]` (`dist/components/dock/styles/density.css`) and `.glass-dock[data-size]` (the `@media (pointer: coarse)` block in `overflow.css`). Outside the dock those do not resolve, so the menu falls to the `2.5rem` literal while the trigger uses the live rung.

Concretely at `(pointer: coarse)`: trigger `--dock-control-size = max(2.5rem × 0.78, --dock-control-floor 2.75rem) = 2.75rem` → ~22.4px; portalled menu → `2.5rem × 0.5088` ≈ 20.4px. Narrow blast radius: the demo flattens `.dock-label` to `--type-body` below 1024px (`demo/styles/style.css:288-292`), so the divergence is confined to coarse pointers at ≥1024px (touch laptops, large tablets).

Note the marker glass-ui *does* stamp on the portal — `data-glass-dock-portal` / `data-glass-dock-owner` — is JS-only (click-away scoping, `isTeleportedTarget`); `grep -rho "\[data-glass-dock-portal\][^{]*{" --include="*.css" dist/` returns nothing, so there is no CSS bridge to lean on.

**Falsifier:** find a CSS rule that re-establishes `--dock-control-size`/`--dock-scale` on `[data-glass-dock-portal]`, or show `--dock-control-size` is also set at `:root`.

### C-11 · MINOR · `aria-label` usage on the two Select triggers and (invalidly) on the dead inline `<div>`

- `:241` `aria-label="Scene"` and `:291` `aria-label="Controls tab"` sit on `DockTrigger for="select"`, which renders reka's `SelectTrigger` — `role="combobox"` on a `<button>` (`reka-ui/src/Select/SelectTrigger.vue:56-63`). `aria-label` wins over element contents in accessible-name computation, so the name is the static string and never contains the current scene. Whether the *value* is still announced depends on the UA's combobox value computation from descendant text, which is not statically determinable — the safe idiom is a visually-hidden label + `aria-labelledby` spanning label and `<SelectValue>`.
- `:307-311` puts `aria-label="Controls tab"` on a bare `<div>` with no `role`. `aria-label` on a generic (`role=generic`) element is prohibited by ARIA — it is silently dropped by conforming AT. Unreachable today (C-4), which is the only reason this is not MAJOR.

**Falsifier:** demonstrate (live, SS-13) that the scene value is announced alongside "Scene" in NVDA/VoiceOver/Orca. That would reduce the first bullet to INFO; the second stands on the ARIA spec regardless.
**UNPROVEN-NEEDS-LIVE:** the announcement half of bullet one.

### C-12 · MINOR · `warmScene` is pointer-only; keyboard traversal of the same list never prefetches

`:261` `@pointerenter="emit('warmScene', scene.id)"` is the sole `warmScene` emitter. reka's Select supports arrow-key and typeahead highlighting (`SelectTrigger.vue:110+`, `useTypeahead`), neither of which produces a `pointerenter`. A keyboard user therefore takes the full chunk-fetch stall on every switch — the exact stall `scenes.ts:107-118` (`warmScene`) exists to remove. The natural hook is reka's item-highlight state, not a pointer event.

**Falsifier:** show reka dispatches a synthetic `pointerenter` (or that glass-ui's `SelectItem` bridges highlight→pointerenter) on keyboard highlight. Neither `reka-ui/src/Select/SelectItem.vue` nor glass-ui's `SelectItem` wrapper does.

### C-13 · MINOR · `dockCardinality` is called with a hardcoded `channels: []` and half its result is discarded

`:127-131` — `dockCardinality({ tabs: allControlTabs.value, channels: [], sceneLabel: props.currentLabel })`, then only `controlZone` and `controlLabelRedundant` are destructured. `channelZone` is computed and dropped. `channels: []` is not "the dock has no channels" — it is "this dock does not own that axis" (`TransportDock.vue:357` supplies the real `animationNames`). Passing a literal falsehood to a shared model to get at one of its two outputs is the tell that the model wants splitting, or that the caller wants the narrower `controlZoneFor(tabs, sceneLabel)`.

**Falsifier:** show `channelZone` is read somewhere in ChromeDock's subtree. It is not (`grep -n "channelZone" demo/app/dock/ChromeDock.vue` → 0).

### C-14 · MINOR · Two independent watchers on the same source

`:161-163` and `:197-202` both `watch(() => dockRef.value?.expanded, …)`. Two subscriptions, two callback frames, two places to reason about ordering when the dock's `expanded` flips — for two effects (mirror into `controlsPaneHover`, re-assert `expand()`) that could share one callback. Given C-6 argues the second should go entirely, this is the smaller half of that finding; recorded separately because it stands even if C-6 is falsified.

**Falsifier:** show the two require different flush timing or different scopes. Both are default-flush, both in setup scope.

### C-15 · MINOR · The two Selects order their item chrome differently

Scene items (`:249-253`): `StatusDot` → scene icon → label. Controls items (`:298-302`): tab icon → `StatusDot` → label. Two dropdowns opened from adjacent triggers in the same dock, with the selection marker on opposite sides of the glyph. One of the two is wrong; the file does not say which.

**Falsifier:** find a design note in the tree specifying divergent orders for the two zones. None found in `ChromeDock.vue`, `layout.css`, `design-idioms.css`, or the T.C1/T.B5 comment blocks.

---

## 5. INFO

### C-16 · INFO · `text-muted-foreground` is applied to the "colourful identity glyph" — inert today by accident of how all six SVGs are authored

`:242`, `:265`, `:364` render `<component :is="…icon" class="icon-sm|icon-md shrink-0 text-muted-foreground" />`. But `scenes.ts:3-13` and `:71-83` insist the glyphs are "EXPRESSIVE, COLORFUL", and `ChromeDock.vue:356-359` calls the collapsed glyph "the scene's colourful glyph … already the brand-voice pop". Setting `color` to the muted rung is the opposite instruction.

It is inert **only** because every current asset opts out of `currentColor`: `cube/amiga/square.svg` are `<svg><image href="data:image/png;base64,…">` rasters (0 `currentColor` occurrences), `easing.svg` hardcodes `hsl(248, 88%, 71%)` (0 occurrences), and `spring.svg`/`sequence.svg` use `var(--color-progress, currentColor)` / `var(--rainbow-*, currentColor)` where every token is `:root`-defined (`design-idioms.css:18-21`, `style.css:163`) so the fallback never fires. The first glyph authored against `currentColor` — or the first token rename — silently renders muted grey.

**Falsifier:** show `text-muted-foreground` is required by some other rule in the dock cascade (e.g. as an inherited base for a sibling), or find a scene glyph that intentionally consumes it.

### C-17 · INFO · The `itemsPopupOpen` rationale names a `DockTrigger` mechanism that 7.0.0 does not have

`:73-77` justifies the prop thus: the slot content's "`useOptionalDockContext()` resolves ABOVE this provider and cannot hold the dock open itself". The *conclusion* is right and the *resolution-scope reasoning* is right (see S-2). The *mechanism* is not: in the installed 7.0.0, `DockTrigger` never consults the dock context at all — its `setup` computes class names only (`dist/dock.js:1207-1243`), and its `for="dropdown"` branch delegates to the `DropdownMenuTrigger` wrapper, in which `grep -c "keepOpen\|useOptionalDockContext\|dock" DropdownMenuTrigger-CvP0Y8Eb.js` → **0**. So there is no hold to lose, whether the context resolves or not. The prop is still necessary; the sentence explaining why is describing a version that isn't installed. Same family as lane-frontend `F-2`.

**Falsifier:** find a `keepOpen`/`release` call reachable from `DockTrigger` in the installed dist.

---

## 6. Superlatives (L-18, both directions)

### S-1 · The glass boundary is clean *at the component*, not just in aggregate

Every primitive ChromeDock mounts arrives through a glass-ui subpath or the root barrel: `/dock` (4 components, `:6-11`), `/status-dot` (`:29`), root (`Select*`, `:22-28`). Zero `reka-ui` imports, zero local `ui/` copies, zero `cn()`/`cva`. This is lane-frontend `F-6` holding at the leaf, on the demo's most chrome-dense component — and it is *not* free: `SelectValue`, `SelectGroup` and `hide-indicator` all required knowing reka's model through the glass wrapper without importing it.

**Falsifier (superlatives run both ways):** find a `reka-ui` import, a vendored primitive, or a hand-rolled dock part in this file. `grep -n "reka-ui" demo/app/dock/ChromeDock.vue` → 0; the separators are `<DockSeparator>` (`:283`, `:326`), not hand-rolled `<div>`s, which `:226-232` explicitly names as the goal ("zero hand-rolled dock-separator divs") and achieves.

### S-2 · The `#items` seam correctly diagnoses Vue's provide/inject-through-slots resolution rule

`:73-77` + `App.vue:19-25`/`:342-347` + `MbabbMenu.vue:2-3`/`:95-96`. Slot content's `inject` resolves against the component instance where the slot content was *authored* (App.vue), not where it is *rendered* (inside `<GlassDock>`), so `<GlassDock>`'s `provide` is invisible to `MbabbMenu`. This is a real and frequently-missed Vue semantic, correctly identified, and the chosen fix is a boring one-way prop (`itemsPopupOpen` → `isAnyOpen` → `keepOpen()`) rather than a teleport hack, a `provide` re-broadcast, or a `getCurrentInstance().parent` walk. C-17 dings the *sentence*, not the *seam*; the seam is right.

**Falsifier:** show `MbabbMenu` *can* reach the dock context (e.g. via `app.provide`, or because glass-ui re-provides at the portal). It cannot: the context is provided in `GlassDock`'s `setup` (`dist/dock.js`, `m({ id, orientation, layout, keepOpen, release, held })`), a descendant of ChromeDock, which is a descendant of App.

### S-3 · `scenes` is narrowed to the minimum structural shape — the one type decision in the file that is right

`:62` `scenes: { id: string; label: string; icon?: Component }[]` instead of importing `SceneDescriptor`. The descriptor also carries `superKey`, `stageMode`, `component`, `showStartScreen`, `gridBackground` — routing and store concerns. Declaring the three fields the dock actually reads keeps it structurally assignable from `SceneDescriptor[]` while depending on none of that. Paired with `:33-38` + `:242`/`:265`/`:364`'s `<component :is="scene.icon">`, which kills the parallel string-keyed icon map named as the D8 drift root cause (`scenes.ts:79-83` corroborates: "the dock iterates `scene.icon`, never a parallel string-keyed map that drifts on a rename"). This is exactly the discipline C-8 finds missing on the surface axis, so the file demonstrably knows how — which is what makes C-8 a defect rather than a house style.

**Falsifier:** show the dock reads a `SceneDescriptor` field outside `{id, label, icon}`. It does not (`props.scenes` is touched at `:84` and `:256-266` only).

### S-4 · `hide-indicator` + `StatusDot` — the producer's opt-out consumed, not CSS-defeated

`:248`, `:255`, `:297` pass `hide-indicator` (a real 7.0.0 prop: `dist/select-DD6Ly6xg.js` SelectItem `props.hideIndicator: { type: Boolean }` → `d = hideIndicator ? "none" : "start"`) rather than hiding glass-ui's dot with a CSS override, and the replacement marker is another glass-ui primitive (`StatusDot`) rather than a bespoke span. No semantics are lost: reka's `SelectItem` still carries `aria-selected`, and `StatusDot` without a `label` correctly stamps `aria-hidden="true"` + `data-identity="decorative"` (`dist/status-dot.js`), so the swap is purely visual. Verified non-destructive to the trigger label too: reka's `SelectValue` reads `textContent` of the item-text element (`reka-ui/src/Select/SelectValue.vue:31-46` + `SelectItemText.vue:29-35`), and neither the `StatusDot` span nor the inline SVG contributes text — so the trigger shows the bare scene name, not "●Cube".

**Falsifier:** show `hide-indicator` is not a 7.0.0 prop (it is), or that the dot/icon leak into `SelectValue`'s text (they do not — both are element-only).

### S-5 · The collapsed-state reduction is exemplary *consumption* discipline, documented against a measured symptom

`:347-362` — glass-ui 4.0.0 necked the collapsed dock to a circle (`--dock-collapsed-summary-min-size` + `aspect-ratio: 1`), the three-part chip clipped ("Cube" → "Cub"), and the response was to shrink the *slot content to what the circle holds*, explicitly labelled "a kf-CONSUME fit (no GlassDock patch)". That is the correct instinct at a consumer/producer boundary — adapt to the primitive's contract, don't fork or patch it — and it is written down with the observed failure, the mechanism, and the design justification (the identity moment is the glyph). C-1 is the a11y cost of that reduction and outranks it; the discipline still deserves naming, because the *same* instinct one slot over (`TransportDock.vue:183-213`) produced a fit that kept a focusable, named control.

**Falsifier:** find a GlassDock patch, a fork, or a `!important` override compensating for the circle. `grep -rn "dock-collapsed-summary\|aspect-ratio" demo/` → no ChromeDock-side override.

---

## 7. Verdict

ChromeDock consumes glass-ui with a genuinely clean import boundary (S-1) and shows real craft at three seams (S-2, S-4, S-5) — and it is nonetheless **defective on the consumption axis in two disqualifying ways**.

**C-1** is the ship-blocker: the app's only scene navigation becomes keyboard-unreachable 2.5 s after load, because a design-correct collapsed-state reduction removed the last focusable, named element from the summary layer — a regression the sibling `TransportDock` avoids in the same slot of the same primitive.

**C-2** is the *systemic* blocker: no template typecheck exists anywhere in the repo, and a wildcard `declare module "*.vue"` shim types every SFC as `DefineComponent<{}, {}, any>`, so the component's carefully-written 9-prop / 4-emit contract is enforced by nothing at either end. Every other MAJOR here is a direct consequence: a duplicated `SURFACE_META` registry that no gate compares (**C-3**), ~40 lines of unreachable elision machinery whose four comment blocks assert the opposite of what the DFA produces (**C-4**), an unguarded icon lookup whose guarded twin sits twelve lines below (**C-7**), and a DFA alphabet flattened to `string` at the boundary of a module that exports the union (**C-8**).

Two findings are the lane-frontend `F-2` class recurring — a consumer reasoning from notes that predate the installed producer: the unconsumed `autoLuminance`/`backgroundCanvas` levers over an animated aurora canvas (**C-5**) and a re-expand watcher defending against a collapse path that 7.0.0 guards twice (**C-6**).

The R1 parser-crash class is **not** reachable from this component (§3) — the only value.js edge is a numeric `rgb()`→oklch conversion on the dock's luminance sampler, which is a throughput seam, not a parse seam. That is a clean negative and should be recorded as such rather than left open.

**Recommended order:** C-2 first (nothing below is verifiable until the contract is gated), then C-1 (ship-blocking a11y), then C-3/C-4 together (they are one cleanup — retire the shadow registry and the dead arm in the same edit, and correct the four comment blocks plus `App.vue:204-206`), then C-5/C-6 (both are one-line consumption changes against capabilities already on disk), then C-7/C-8 (which C-2 will surface automatically once a template typecheck exists).

---

## 8. ROUND 3 — independent read

Model: `claude-opus-5[1m]`. Component read whole; every import followed to source (`injectionKeys.ts`, `state/controlSurfaces.ts`, `components/instrument/surfaceTabs.ts`, `app/dock/index.ts`, `MbabbMenu.vue`, `App.vue`, `scenes.ts`, glass-ui `dist/components/dock/*.d.ts` + `dist/{dock,select,status-dot,glass-ui,value-DMhh2R94,useAccentTone-DyInfHXE,accent-tone-solve-*}.js`, `dist/components/select/SelectItem.vue.d.ts`), plus the seam modules rounds 1–2 did not reach: **`demo/components/instrument/transport/ControlsPaneWrapper/usePaneHover.ts`**, `ControlsPaneWrapper/useControlsLayout.ts`, `controls-pane/ControlsPaneWrapper.{vue,css}`, `test/demo/state/control-surface-dfa.test.ts`, `demo/state/index.ts`. Read-only; no browser.

**Overlap declared, not re-filed:** R3 independently reproduced C-2 (no `vue-tsc`, wildcard shim), C-3 (the shadow registry), C-5 (`autoLuminance`/`backgroundCanvas`), C-7 (the unguarded `TAB_ICONS` twin), C-8 (`string`-widened alphabet), C-9 (the phantom token) and §3 (R1 unreachable) from source, and adds nothing to them beyond §8.7–§8.9. C-1, C-4, C-6, C-10…C-17 were not re-derived and are neither endorsed nor challenged here.

---

### R3-1 · BLOCKER · `InstanceType<typeof GlassDock>` resolves to the **slot bag**, not the expose — five sites are TS2339s, and this is the measured cost of C-2

C-2 establishes that no template typecheck exists. It stops short of showing what that absence is currently *hiding*. It is hiding a real error, in the most load-bearing glass-ui seam in the file.

```
ChromeDock.vue:158
    const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
```

glass-ui's generated declaration (`dist/components/dock/GlassDock.vue.d.ts`, tail — the expose is the *first* construct signature, the slot bag the *last*):

```ts
declare const __VLS_base: DefineComponent<DockProps, {
    expanded: Ref<boolean>; isPinned: Ref<boolean>; isHeld: ComputedRef<boolean>;
    isTransitioning: Ref<boolean>;
    expand: () => void; collapse: () => void; keepOpen: () => void; release: () => void;
}, …>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
export default __VLS_export;
type __VLS_WithSlots<T, S> = T & { new (): { $slots: S } };
```

`InstanceType<T> = T extends abstract new (…args:any) => infer R ? R : any` infers from the **last** construct signature of an intersection, and `__VLS_WithSlots` appends the slot-only one. **Measured** with the repo's own compiler (`node_modules/.bin/tsc`, TypeScript 6.0.3) against a faithful mirror of that declaration shape, in the session scratchpad:

```
$ tsc --ignoreConfig --noEmit --strict --target ES2022 --moduleResolution bundler t.ts
t.ts(10,20): error TS2339: Property 'expanded' does not exist on type '{ $slots: Slots; }'.
```

So `dockRef.value` is typed `{ $slots: … } | null` and **five** consumption sites are latent TS2339s — the four verbs that *are* the popup mutex:

```
:161  watch(() => dockRef.value?.expanded, …)
:200  dockRef.value?.expand()
:206  dockRef.value?.keepOpen()
:207  dockRef.value?.expand()
:208  dockRef.value?.release()
```

They work at runtime (Vue's instance proxy exposes the real `defineExpose` surface regardless of the annotation), which is exactly why nothing noticed. They become a hard build break the moment C-2 is remediated the obvious way — so **C-2's fix is gated on this one**, and any wave that adds `vue-tsc` without R3-1 lands red.

**The producer already ships the type, on the subpath already imported.** `dist/components/dock/index.d.ts` exports `UseDockStateReturn`, whose docblock states its purpose verbatim:

> *"freezes today's surface so consumers wrapping `<GlassDock>` (or authoring a custom dock chassis) can type the composable handle from `/api` or the `/dock` subpath without reaching for `ReturnType<typeof useDockState>`."*

`Pick<UseDockStateReturn, "expanded" | "expand" | "keepOpen" | "release">` types all five sites and costs one identifier in the **existing** `:6-11` import. This is lane-frontend `F-2`'s class once more — a shipped 7.0.0 capability unconsumed — but sharper than the C-5/C-6 instances, because here the producer wrote the type *for this exact consumer problem* and documented it as such.

**Breadth (context, not a ChromeDock claim):** `grep -rn "InstanceType<typeof" demo/` → 10 sites, incl. `TransportDock.vue:257`, `HeroAurora.vue:48`, `EditorShell.vue:187`, `ChannelControls.vue:372-373`. Whether each producer `.d.ts` uses `__VLS_WithSlots` is per-component and unaudited.

**Falsifier (any one kills it):** (a) a `GlassDock.vue.d.ts` whose construct-signature order differs from the installed one; (b) a TypeScript version whose `InstanceType` picks the *first* signature of an intersection — re-run the probe above; (c) a `.d.ts` augmentation or `declare module` in the demo that overrides the generated type for `GlassDock`. Probes are re-runnable verbatim; the declaration file is 30 lines and was read whole.

---

### R3-2 · MAJOR · The dock mirrors `expanded` (= hover ∪ **pinned**) into a boolean the consumer reads as *hover* — a pinned dock permanently defeats the F9 idle rest-dim

Rounds 1–2 note the two watchers (C-14) but only as duplication. The defect is not that there are two — it is that the **wrong signal** is mirrored, and the reader four modules away is a different subsystem.

```
ChromeDock.vue:159-163
    const controlsPaneHover = inject(CONTROLS_PANE_HOVER_KEY, null);
    watch(() => dockRef.value?.expanded, (isExpanded) => {
        if (controlsPaneHover) controlsPaneHover.value = !!isExpanded;
    });
```

The key is `InjectionKey<Ref<boolean>>` = `Symbol("controlsPaneHover")` (`injectionKeys.ts:3`), and its **sole** reader binds it as hover:

```
usePaneHover.ts:35-38   const isDockHovered = inject(CONTROLS_PANE_HOVER_KEY, ref(false));
                        const isPaneHovered = computed(() => isPaneDirectHover.value || isDockHovered.value);
usePaneHover.ts:52-53   const { idle } = useIdle(IDLE_MS /* 10_000 */);
                        const isPaneIdle = computed(() => idle.value && !isPaneHovered.value);
```

But glass-ui's `expanded` is **not** hover (`useDockState.d.ts:26-32`):

```
state:    Ref<"collapsed" | "hover" | "pinned">
expanded: "true whenever state !== 'collapsed'"     ← hover ∪ PINNED
isPinned: "true whenever state === 'pinned'"        ← exposed precisely to separate them
```

`pinned` is not a corner: it is **the default outcome of a click**. `dist/dock.js`, deminified:

```js
function N() { if (c()) { l.value = "pinned", x(); return; } S(), y(), l.value = "pinned", x(); }   // onClickCollapsed → PINNED
```

and ChromeDock mounts `:start-collapsed="true"` (`:224`), so the collapsed pill is the first thing a pointer meets; `PINNED ──(clickOutside)──→ COLLAPSED` is the only exit (`useDockState.d.ts:60-64`).

**Failure scenario, concrete.** Click the collapsed ChromeDock (→ `pinned`), move the cursor to the far corner of the viewport, wait out `IDLE_MS` (10 s). `isDockHovered` is still `true` → `isPaneHovered` is `true` → `isPaneIdle` is `false`. The rule that dims:

```
ControlsPaneWrapper.css:114   .controls-pane-wrapper.controls-pane--idle:not(.controls-pane--hovered) { … }
ControlsPaneWrapper.vue:152-153   isPaneHovered ? 'controls-pane--hovered' : '',
                                  isPaneIdle    ? 'controls-pane--idle'    : '',
```

**Both halves are defeated at once** — `--idle` is never added, and `--hovered` would block the `:not()` even if it were. The F9 global idle rest-dim (`usePaneHover.ts:17-26`, an explicitly restored behaviour) is inert for the remainder of the session.

The fix is in the object ChromeDock already holds: mirror `!!expanded && !isPinned`, or `isHeld` (the ref-counted hold, which is what "a dock is busy" actually means). Both are on the same expose.

**Falsifier (any one kills it):** (a) show `expanded` is `state === "hover"` — `useDockState.d.ts:28` says otherwise; (b) show `onClickCollapsed` is unreachable on this dock — no `alwaysExpanded`, `startCollapsed: true`, so the summary layer's `onClick` is live; (c) show `.controls-pane--idle` is cosmetically inert — the rule and both class bindings are cited above; (d) show a second writer resets the ref on unpin — `grep -rn "CONTROLS_PANE_HOVER_KEY" demo/` returns exactly one writer (§R3-8).
**UNPROVEN-NEEDS-LIVE:** the *magnitude* of the visual delta (SS-13). The state defeat is static and complete.

---

### R3-3 · MAJOR · Two watchers on one source with an undocumented ordering dependency — the pane mirror takes a spurious `false` on every re-expand

Sharpens C-14 from "two subscriptions" to a state defect. `:161` (W1, mirror) and `:197-202` (W2, re-expand) both watch **`() => dockRef.value?.expanded`**, W1 registered 36 lines earlier. W2's own comment (`:188-196`) asserts the dock *will* spuriously collapse under an open popup. On each such event, in registration order:

1. W1 → `controlsPaneHover.value = false`
2. W2 → `expand()` → `expanded = true`
3. W1 re-fires → `controlsPaneHover.value = true`

W1 carries no `isAnyOpen` guard and no comment acknowledging W2 exists, so nothing records that W1's correctness depends on being registered *before* W2 — any reorder, or a `flush: "post"` on either, changes behaviour silently. One watcher is strictly better and is what the file's own comments already describe:

```ts
watch(() => dockRef.value?.expanded, (isExpanded) => {
    if (isExpanded === false && isAnyOpen.value) { dockRef.value?.expand(); return; }
    if (controlsPaneHover) controlsPaneHover.value = !!isExpanded;
});
```

**Dependency on C-6, declared:** C-6 argues the spurious collapse cannot occur at all in 7.0.0 (the hold counter is honoured; `isTeleportedTarget` exempts the dock's own portal). **If C-6 is right, R3-3's trigger never fires and this reduces to C-14's duplication MINOR.** I did not re-derive C-6 and do not adjudicate it; R3-3 is filed conditionally on C-6 being falsified, and the single-watcher rewrite discharges both regardless.

**Falsifier:** show the two watchers require different flush timing or scope (both are default-flush, both in `setup`), or show W2 is unreachable (that is C-6's claim).
**UNPROVEN-NEEDS-LIVE:** whether the transient `false` reaches paint depends on the relative scheduler ids of ChromeDock's watchers and `ControlsPaneWrapper`'s render effect — different component trees, not statically resolvable. The state flicker and the ordering coupling stand on the source alone.

---

### R3-4 · MINOR · Home's label is a hard-coded literal beside six single-sourced siblings

```
:248-254   <SelectItem :value="homeSceneId" …>  <Home … />  <span …>Home</span>  </SelectItem>
:255-268   <SelectItem v-for="scene in scenes" …>  <component :is="scene.icon"/>  {{ scene.label }}  </SelectItem>
```

`App.vue:7` passes only `:home-scene-id="HOME_SCENE_ID"` — a bare string — while `scenes.ts:128-134` declares `homeScene: SceneDescriptor = { id, label: "Home", … }`. Rename `homeScene.label` and the dock shows the old word while `App.vue:191` (`currentLabel = currentScene.value.label ?? "Home"`, which *does* read the descriptor) shows the new one, so the trigger and its own menu item disagree.

This is the exact class the file's `:33-38` header claims eradicated ("the dock no longer holds a parallel string-keyed `sceneIcons` Record — the D8 drift root cause") — the **icons** were single-sourced (correctly; that is S-3), the **home label** was not. Passing `homeScene`, or unshifting it into `scenes`, closes it and deletes the `<Home>` special case at `:243`/`:365` too.

**Falsifier:** show `homeScene` is not the label authority. `scenes.ts:125` (`/** The home/hero landing scene */`) and `App.vue:191` say it is; the dock is the one reader that diverges.

---

### R3-5 · MINOR · The `:326` separator is unconditional — **S-1's "achieves" clause is half-right and is amended here**

`:226-232` states the contract in two parts: *"separators derive from INHABITED zones **by construction** — zero hand-rolled dock-separator divs."* S-1 verifies the second half and reports the goal "achieved". The first half is not met.

```html
:282-283   <template v-if="showControlSection">  <DockSeparator />   ← derived ✔
:326       <DockSeparator />                                          ← unconditional ✘
:327-341   <DockControl shape="icon" v-if="hasControlPanel" …>
:344       <slot name="items" />
```

When `hasControlPanel === false` **and** `#items` is unfilled, the dock paints a trailing hairline with nothing after it. That host is provided for by this component's own contract — `:70` and `:94` twice contemplate *"non-App hosts that don't drive the DFA"*, and `app/dock/index.ts` exports ChromeDock as a public unit. Fix: `v-if="hasControlPanel || $slots.items"`.

**Falsifier — and the reason this is MINOR, not MAJOR:** it is **unreachable in-tree today**. `grep -rn "ChromeDock" demo/ test/` → `App.vue` + the barrel + prose only; `App.vue:19-25` fills `#items` unconditionally. This is a contract defect, not a live break. **S-1 is amended, not withdrawn:** the no-hand-rolled-div claim stands and is verified; the by-construction claim does not.

---

### R3-6 · MINOR · The root-barrel `Select*` import is what puts the R1-bearing chunk on the graph — measured; **S-1's blessing of the root barrel is amended**

S-1 counts "a glass-ui subpath **or the root barrel**" as equally clean. The exports map disagrees, and so does the chunk graph.

```
$ node -e 'console.log(Object.keys(require("@mkbabb/glass-ui/package.json").exports).length)'   → 73
$ ... | grep -x "./select"                                                                      → ./select   (EXISTS)
$ cat dist/select.js
  import {…} from "./select-DD6Ly6xg.js";
  export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
```

All five names ChromeDock imports at `:22-28` are on `/select`. Static chunk closure over `dist/`, resolving `from "./…"` transitively from each entry set:

```
ChromeDock as authored  (dock + status-dot + glass-ui[root])  →  74 chunks
ChromeDock via /select  (dock + status-dot + select)          →  37 chunks
delta 38, incl. toast, slider, progress, number-field, popover, toggle-group,
               chip, fading-scroll, configurator, reactive, useAccentTone
```

The consumption-relevant item in that delta is **`useAccentTone-DyInfHXE.js`** (pulled by `chip`), which is the only path from this component's graph toward the R1 surface:

```js
useAccentTone-DyInfHXE.js:10   import("./accent-tone-solve-Cw7WkRD9.js").then(({ solveAccentInk }) => …)
accent-tone-solve-Cw7WkRD9.js:1  import { i as e, t } from "./value-DMhh2R94.js";   ← `i` = parseCssColor + throw
```

So §3's negative finding is *load-bearing on subpath discipline*: `/dock`, `/status-dot` and `/select` all avoid `i` entirely (`dist/dock.js:19` imports `{ n, t }` from the bridge — never `i`), and it is the root barrel that reintroduces the R1-bearing chunk, two hops from a component ChromeDock never renders. It remains unreachable (the import is dynamic and `Chip` is never mounted) — but the guard is an accident of what the file happens not to render, not of what it imports.

**Falsifier:** glass-ui is `sideEffects: ["*.css"]` and pure ESM, so rolldown will shake unreached names out of the **production** bundle — if `dist/gh-pages/_chunks.json` (emitted per `vite.config.ts:238`) shows no glass-ui chunk attributable to the root import, the graph-width half dies. The *availability* half — `/select` exists, is reached by no file in the demo (lane-frontend §3.1 lists it among the unreached 52), and three granularities appear in one 24-line import block — stands on the exports map alone.

---

### R3-7 · MINOR · The registry duplication (C-3) also splits the **test net**: the rendered copy is the untested one

C-3 establishes the two copies and their consumer split. It does not check which copy the suite proves. It is the other one.

```
test/demo/state/control-surface-dfa.test.ts:16-25
    import { BUILT_IN_SURFACES, SURFACE_META, surfacesFor, extraTabsFrom,
             selectedSurfaceFrom, dockCardinality, … } from "../../../demo/state/controlSurfaces";
```

**Every** assertion (`:148-231`, incl. `expect(tabs).toEqual([SURFACE_META.easing])` at `:150` and the six `dockCardinality` cases at `:193-226`) exercises the **canonical** module. **Both docks read the shadow** (`ChromeDock.vue:18-21`, `TransportDock.vue:237`). `grep -rn "instrument/surfaceTabs" test/` → **0**. So the rendered path has zero regression coverage and the covered path renders nothing — C-3's "drift surface with zero gate" is stronger than stated: the gate exists, it is green, and it is pointed at the wrong file.

**Concrete failure scenario.** Restore `SURFACE_META.easing.label` to `"Easing"` in the canonical copy (it *was* that before T.E8 — `controlSurfaces.ts:149-152`). `:150` stays GREEN. ChromeDock still renders the shadow's `"Curve"`. Worse, `controlLabelRedundant` (`surfaceTabs.ts:38-39`) compares the label case-insensitively against the easing scene's label `"Easing"` (`scenes.ts:163-171`): true in canonical, false in shadow — so the duplicate-label register VERDICT #17 exists to kill would reappear in one registry and not the other, with a green suite either way. (C-4 argues the `inline` arm is unreachable, which would neutralise this specific consequence; the label divergence on the trigger itself survives C-4 regardless.)

The mechanical cause is one missing line: `state/index.ts:53-63` barrels `SURFACE_META`/`extraTabsFrom`/`selectedSurfaceFrom` but **not** `dockCardinality`. Barrel it, delete `components/instrument/surfaceTabs.ts`, repoint two imports.

**Falsifier:** a test importing `dockCardinality` or `SURFACE_META` from `@components/instrument/surfaceTabs`. `grep -rn "surfaceTabs" test/` → 0.

---

### R3-8 · INFO · Stale host prose — `App.vue` claims a second writer of the hover ref that does not exist

```
App.vue:171-172   // Dock hover → controls pane opacity. Provided here so both ChromeDock (sibling)
                  // and TransportDock (descendant of EditorShell) share the same ref.
```

```
$ grep -rn "CONTROLS_PANE_HOVER_KEY" demo/
  App.vue:134,174           import + provide
  ChromeDock.vue:3,159      the SOLE writer
  injectionKeys.ts:3        declaration
  usePaneHover.ts:4,35      the SOLE reader
```

`TransportDock.vue` never references it. Filed because this prose generated — and then falsified — a multi-writer-race hypothesis (§8.9d), and because it is the sentence a reader will trust when triaging R3-2.

---

### S-R3-1 · SUPERLATIVE · The `popupModel` mutex factory gets the stale-close case right

```ts
:173-184
    function popupModel(key: PopupKey) {
        return computed({
            get: () => openPopup.value === key,
            set: (open) => {
                if (open) openPopup.value = key;
                else if (openPopup.value === key) openPopup.value = null;   ← the subtlety
            },
        });
    }
```

The `else if` guard is the whole point and is easy to miss. Two `Select`s share one `openPopup` slot; reka fires `update:open(false)` on the *losing* menu when focus moves to the winner, and that close arrives **after** the winner has already claimed the slot. An unguarded `else openPopup.value = null` would let the loser's stale close clear the winner's ownership — collapsing `isAnyOpen` to `false`, firing `release()` (`:208`), and dropping the hold under a menu that is open on screen (the BLK-8/D9 failure the whole mutex exists to prevent). The ownership check makes the setter idempotent under out-of-order closes, and the factory means both models get it identically rather than by two hand-written copies.

**Falsifier (superlatives run both ways):** exhibit an ordering the guard mishandles. The one candidate is open→open across keys with no intervening close (scene menu open, user clicks the controls trigger): `openPopup` goes `"scene"` → `"controls"`, `isAnyOpen` stays `true`, no `release()` fires, and the scene model's `get` flips to `false` so reka closes it — correct. Two writes, one slot, no lost hold.

---

### 8.9 · Probed negative findings (recorded, not suppressed)

**(a) The `accumulateHuePixel` unwrap-or-throw is unreachable — extends C-5.** C-5 correctly identifies the per-pixel value.js call. It does not ask whether it can throw. `dist/dock.js` runs both value.js Results through glass-ui's *throwing* unwrapper inside the ≤4 Hz observer:

```js
function we(e,t,n,r,i) {   // accumulateHuePixel
  let [,a,o] = T("accumulateHuePixel:oklch", convertColor(T("accumulateHuePixel:rgb", rgb(t,n,r)), "oklch")).channels, …
```

`T` (`value-DMhh2R94.js`) throws `GlassColorError` on `!ok` — from inside an observer callback, where nothing catches. Probed against the installed value.js 4.0.0:

```
$ node --input-type=module -e 'import { rgb, convertColor } from "@mkbabb/value.js/color"; …'
in-gamut failures: 0        (black, white, mid, pure-red → rgb ok, convertColor→oklch ok)
rgb(256,0,0) ok=true    rgb(-1,0,0) ok=true    rgb(NaN,0,0) ok=false {"code":"color_non_finite"}
```

`rgb()` returns `!ok` **only** for non-finite input; `getImageData` yields a `Uint8ClampedArray`, always finite. **The throw is unreachable on the canvas path.** C-5's cost and correctness halves are unaffected; its blast radius does not include an uncaught exception. *(Falsifier for this withdrawal: an element-sampling path feeding `rgb()` a parsed or NaN-producing computed value rather than clamped pixels.)*

**(b) The `keepOpen`/`release` ref-count cannot go negative — corroborates C-6.** `:204-209` calls `release()` from a non-`immediate` watcher, so a host mounting with `:items-popup-open="true"` would release without a matching hold. `dist/dock.js`: `function P(){ p.value++, S(); }` / `function F(){ p.value = Math.max(0, p.value - 1), p.value === 0 && l.value === "hover" && (S(), f = setT…) }`. **Clamped at 0.** Residue too small to file: an unmatched `release()` on a `"hover"`-state dock restarts the idle-collapse timer; `App.vue` seeds `mbabbPopupOpen = ref(false)`, so it is unreachable in-tree.

**(c) The Home item's missing `@pointerenter="warmScene"` is CORRECT — bounds C-12.** `:261` emits `warmScene` on every scene item; `:248-254` (Home) does not. `scenes.ts:118-123`: `warmScene(id)` looks up `sceneLoaders.get(id)` and no-ops when absent; `homeScene` (`:128-134`) declares no `component`, so no loader is registered. The asymmetry is right. (This bounds C-12's scope to the keyboard-highlight gap, which stands.)

**(d) No multi-writer race on `CONTROLS_PANE_HOVER_KEY`.** Hypothesised from `App.vue:171-172`; killed by the grep in R3-8. Filed as INFO, not as a race.

**(e) `hide-indicator`, `#collapsed`, `icon-sm/md/lg`, `dock-label`, `z-dock` all resolve.** Re-probed independently of S-4: `SelectItem.vue.d.ts:5` `hideIndicator?: boolean`; `GlassDock.vue.d.ts` `__VLS_Slots` carries `collapsed`; `icon-*` in `dist/styles/tokens/sizing.css` + `theme/bridges.css`; `dock-label` in `dist/styles/typography/semantic.css` + `dock/styles/density.css`; `z-dock` in `dist/styles/tokens/scheme-motion.css`. **Zero invented glass-ui API** — the single phantom is the demo-owned CSS var of C-9. Under C-2 none of this is compiler-verified, which is precisely what makes it creditable.

---

## Provenance note

Every glass-ui and reka-ui claim is sourced from the copies **installed in the census target** (`/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/{glass-ui,reka-ui}`), so no upgrade is presupposed by any remedy. `/Users/mkbabb/Programming/keyframes.js` was read only. No file in keyframes.js, glass-ui, or value.js was written, mutated, or executed; no installs, no dev servers, no browser tooling. The single write of this lane is this file. `npx tsc --noEmit` was executed once (read-only, `--noEmit`) solely to establish C-2's measured exit code.

**Round-3 addendum.** Round 3 read the component and every module it imports from source, plus five seam modules rounds 1–2 did not reach (`usePaneHover.ts`, `useControlsLayout.ts`, `ControlsPaneWrapper.{vue,css}`, `test/demo/state/control-surface-dfa.test.ts`, `state/index.ts`). Two commands were executed, both read-only and both outside the product tree: (1) `node_modules/.bin/tsc --ignoreConfig --noEmit --strict` over a 12-line mirror file written to the **session scratchpad** (`…/scratchpad/probe/t.ts`), which produced R3-1's `TS2339`; (2) `node --input-type=module -e` importing `@mkbabb/value.js/color` to probe `rgb()`/`convertColor()` totality for §8.9(a). Chunk-closure figures in R3-6 come from an in-memory scan of `node_modules/@mkbabb/glass-ui/dist/*.js` resolving relative `from` specifiers; nothing was bundled or built. No file in keyframes.js, glass-ui, or value.js was written, mutated, or served. Round 3's only write is this file, appended — §§0–7 are preserved byte-for-byte apart from the header tally and the round-2 integrity note.
