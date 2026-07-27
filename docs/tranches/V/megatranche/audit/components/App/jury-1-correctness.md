# JURY-1 — CORRECTNESS AND EVIDENCE

**Seat:** JUROR-1 (correctness / empiricism) · **Subject:** `demo/color-picker/App.vue` (417 lines, area `core`)
**Repo:** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD `c654824e`
**Date:** 2026-07-24 · **Live substrate:** `http://localhost:9000` (vite dev, HTTP 200 verified)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. Declared tier and observed tier agree. Not
an inherited or undeclared seat.

---

## Verdict — **REPAIR_REQUIRED**

Not `APOTHEOSIS_REQUIRED`. Three challengers arrived from a premise of guilt and between them filed
41 numbered findings. I re-ran every claimed reproduction and read every claimed byte. The result:

- **24 defects upheld** — 11 of them by my own independent reproduction, 13 by bytes.
- **6 claims dismissed or corrected**, each with the refuting bytes named.
- **2 hypotheses** left standing as hypotheses, gate-free.

The file is not rotten. Its landmark contract, error boundary, reduced-motion discipline, and
hydration ordering are sound and I could not break them. What is wrong is concentrated: **the shell
derives boot- and identity-critical state from sources that are not yet true, and it registers
liveness per call site instead of per slot.** Those two mechanisms produce both BLOCKERs. The
architectural transposition CHALLENGE-D asks for is real and canon-mandated, but it is a
multi-wave program the canon itself assigns to W18 — not this wave's whole content, which is why
this is REPAIR and not APOTHEOSIS.

**15 gates authored. 15 RED against `c654824e`. Exit code 15.** The suite is on disk and runnable:
`docs/tranches/V/megatranche/audit/components/App/gates/gates.mjs`.

---

## 0. What I actually ran

| Probe | Decides | Runs |
|---|---|---|
| `scratchpad/j1-verify.mjs` | overture marks · grid ratio · h1/skip · doc scroll · mount host · rAF · URL rewrite, at 5 matrices | 2 (independent, agreeing) |
| `scratchpad/j1-mobile-action.mjs` | dock action-bar liveness, desktop vs mobile, differential | 1 |
| `scratchpad/j1-url-eager.mjs` | the real writer of the boot URL rewrite (instrumented `history.replaceState` stacks) + the eager module graph | 1 |
| inline chromium `forcedColors:"active"` | D-15, which no challenger could decide | 1 |
| `gates/gates.mjs` | the authored gate suite, twice | 2 |

Plus: `docs/tranches/V/VISUAL-CONSTITUTION.md` clause-by-clause with `grep -n`;
`audit/visual/REPORT.md` rows 11–140; and four screenshots read with vision
(`safari-desktop-light/picker.png`, `zoom-200-desktop/picker.png`, `rtl-desktop/picker.png`, my own
forced-colors Chromium capture).

No source file was modified. All writes confined to
`docs/tranches/V/megatranche/audit/components/App/`.

---

## 1. The two BLOCKERs, reproduced

### J-1 — a cold load on any non-picker-left route wedges the boot DAG for the session

**UPHELD_REPRODUCED.** This is CHALLENGE-C's C-1. I reproduced it independently, twice, on three
routes, and again inside the gate suite:

```
/#/          => [b0,b1,b3,b2,b4]      heroBlob: true    canvases: 2
/#/gradient  => [b0,b1,b2]            heroBlob: false   canvases: 1
/#/generate  => [b0,b1,b2]            heroBlob: false   canvases: 1
/#/browse    => [b0,b1,b2]            heroBlob: false   canvases: 1
```

And the stall is **session-scoped, not route-scoped** — the part that makes it a BLOCKER rather
than a cosmetic miss. After a cold `/#/gradient`, `location.hash = "#/"`, 8s settle:

```
after /#/gradient -> /#/ : pickerShell=true  heroBlob=false  overtureMarks=3
```

The picker mounted. The ornament did not, and will not, for the life of that tab.

**Mechanism** (verified line by line, all three legs):

1. `demo/color-picker/index.html:210-212` — `createApp(App); app.use(router); app.mount("#app")`
   with no `await router.isReady()`. Vue Router's initial navigation is a Promise
   (`node_modules/vue-router/dist/vue-router.js:1462` — `push(routerHistory.location)` inside
   `install`), so `route.name` is `undefined` when App's setup runs synchronously inside `mount()`.
2. `demo/shell/useViewManager.ts:43-46` — `return isViewId(name) ? name : "picker"`. The first
   render therefore uses the **picker's** config on all 10 non-picker-left routes.
   `PaneSlot.vue:74` seeds `liveComponent` from props at setup, so the picker is what mounts first.
3. The router resolves, `componentKey` changes, and `PaneSlot.vue:86-97` commits the new triplet
   **one animation frame later**. Vue's `appear` transition — whose `@after-appear`
   (`PaneSlot.vue:118`) is the **sole** call site of `overture.noteLeftPlateSettled`
   (`App.vue:90`, `App.vue:109`) — is cancelled by the swap. `b3` never flips.

**Why B3 and only B3.** Every sibling beat in this chain has a state-checked floor:
`useDockArrival.ts:63-72` falls through on an empty `getAnimations()`; B4's own wait falls through
at `useOverture.ts:173` when nothing is running. B3's arming
(`useOverture.ts:206-228`) has a single event-shaped input and no floor at all. One missed DOM event
is terminal, and `b3Complete && b2` (`:153`) never opens, so `b4` never flips.

**Blast radius, counted against the live table** (`demo/shell/viewSchema.ts`): `left !== "color-picker"`
on `browse`(:125), `extract`(:134), `generate`(:153), `gradient`(:162), `atmosphere`(:171),
`admin-users`(:189), `admin-names`(:198), `admin-audit`(:207), `admin-flagged`(:216),
`admin-tags`(:225) — **10 of 14**. This is a hash-routed link-sharing colour tool published at
`color.babb.dev`. A shared `/#/gradient` link and an F5 on `/#/browse` are the ordinary case.

**Cure.** `main.ts` with `app.use(router); await router.isReady(); app.mount("#app")` — the same
eight lines MT-F012's P0 already forces into a module. Plus a second, independent arm: arm B3 on the
left pane's **mount** plus a `getAnimations()` settle check, matching the idiom its two siblings
already use, so no beat can ever be wedged by one missed DOM event.

**This is the direct answer to the question put to this jury.** App.vue's boot contract silently
assumes *"the route may not be true yet, and my beat DAG will survive that."* A correct entry makes
that assumption unnecessary — and the assumption is false today.

### J-2 — nine named, enabled dock controls are inert at mobile

**UPHELD_REPRODUCED.** CHALLENGE-D's D-1 and CHALLENGE-C's C-2 are one defect. Differential, same
route, same button, synthetic click (the button lives in a collapsed DockLayer, so a real `.click()`
times out — that is why both challengers dispatched, and I did too):

```
desktop-1440  dock[aria-label=Regenerate] rendered=true disabled=false  -> palette CHANGED
mobile-390    dock[aria-label=Regenerate] rendered=true disabled=false  -> palette UNCHANGED
mobile-390    pane's own Regenerate                                     -> palette CHANGED  (control)
```

The pane is alive; only the dispatch is dead. And the dock renders the **identical 16 buttons** at
both viewports — I enumerated them:

```
Save edit · Cancel edit · Switch to slug · Generate new slug · Cancel · Back ·
Regenerate · Save palette · Copy colors · Select view · Toggle action bar ·
Generate · Palettes · Menu · Login · @mbabb
```

**Mechanism.** `PaneSlot.vue:124` is `:ref="onMount ? (el) => onMount!(el) : undefined"` — when
`onMount` is absent the slot registers **nothing**. `App.vue:83-91` (the mobile slot) passes no
`:on-mount`; `App.vue:105` and `:131` (the two desktop slots) do. `onDesktopLeftMount`
(`App.vue:323-328`) is the sole writer of `colorPickerRef`/`generatePaneRef`/`gradientPaneRef` and
`onDesktopRightMount` (`:330-332`) the sole writer of `mixPaneRef`, so all four are permanently
`null` at mobile. Every handler then optional-chains into the null and evaluates to `undefined` with
no call, no throw, no feedback — `usePaneRouter.ts:196,197,198,208,209,210,220,221,222`, nine
actions. The Dock still draws the layer because `Dock.vue:41` gates on **metadata**, not liveness:
`hasAnyActionBar = !!actionBar.value || !!genericBar.value`.

**Collateral off the same nulls:** `App.vue:38` `:action-bar="colorPickerRef?.actionBarContext ?? null"`;
`App.vue:41-42` commit/cancel-edit; `App.vue:352` `usePaletteWiring(colorPickerRef, …)`.

Canon: `VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states are
never color-only. Role, accessible name, state/value and associated error/status are explicit."* A
control that is named, enabled and does nothing is the worst available state expression.

---

## 2. Adjudication ledger

Legend: **UR** = upheld, I reproduced it · **UB** = upheld on bytes I read · **H** = hypothesis ·
**D** = dismissed.

| id | merged from | defect | mechanism | sev | status | disp |
|---|---|---|---|---|---|---|
| J-1 | C-1 | Cold load on 10/14 routes wedges the overture DAG at B2 for the session | route-untrue first render + an event-only beat with no state floor | BLOCKER | **UR** | BUILD |
| J-2 | D-1, C-2, C-3 | 9 named enabled dock controls inert at mobile; refs also mis-filled for one frame on a swap | instance registration is a per-call-site prop dispatched by a name the slot does not own | BLOCKER | **UR** | BUILD |
| J-3 | L-8, D-13 | Shell duck-types 9 leaf methods through `any`; a rename is a silent dead button | dependency direction inverted at an untyped DI seam | MAJOR | **UB** | BUILD |
| J-4 | D-4, C-4 | Zero `<h1>` in the whole demo; no skip link; first focusable is a dock button | landmark ownership split — shell claims `<main>`, delegates identity | MAJOR | **UR** | BUILD |
| J-5 | D-2 | The `left`+`right` workspace the file *is* is retired by canon in five clauses | a local chassis recipe standing in for per-route `InstrumentChassis` composition | BLOCKER | **UB** | BUILD + FOLD(W18) |
| J-6 | D-3 | Desktop scene renders 50.0000% / 50.0000% | the shell owns `grid-template-columns`, so one ratio is imposed on eleven compositions | MAJOR | **UR** | BUILD + FOLD(W18) |
| J-7 | D-8 | The document never scrolls at any viewport; overflow displaced into nested wells | viewport-locked shell (`100dvh` + `overflow:hidden`) inverts scroll ownership | MAJOR | **UR** | BUILD |
| J-8 | D-7 | 200% zoom is aliased onto "mobile" by a hard mount fork; scene + caches destroyed | a mount fork keyed on a media query standing in for reflow | MAJOR | **UR** | FOLD(J-5) |
| J-9 | L-1, L-2, D-9, C-8 | No entry module; `<body>` is mount container **and** portal host; §6.2 boot latch unimplemented | missing composition root — HTML cannot express one, so boot migrates into the root component | BLOCKER | **UR** | BUILD |
| J-10 | L-4, L-5 | Three untyped tables for one view lattice; two masking fallbacks; dead `meta.admin` | one concept, three partial homes, drift absorbed by a fallback | MAJOR | **UB** | BUILD |
| J-11 | L-6, L-7 | Anonymous first paint downloads 9 admin modules + 2 unused dialog SFCs | provide-scope conflated with use-scope; root DI pins every port to the eager chunk | MAJOR | **UR** | BUILD |
| J-12 | L-3 | `ground.ts` carries browser + node lifetimes; `vite.config.ts` imports an app composable | two execution lifetimes in one module → inverted build→app edge | MAJOR | **UR** | BUILD (retire, not rehome) |
| J-13 | C-7 | A boot with no user action rewrites the address bar with a colour | an identity-changing write observed by an identity-based watcher | MINOR | **UR** (mechanism corrected) | BUILD |
| J-14 | D-11 | "Not found" is a silent rewrite to `/` with byte-identical content | a state elided rather than designed | MINOR | **UB** | BUILD (folds into J-4) |
| J-15 | D-5 | Ambient motion never terminates; no still/pause control exists | unbounded ambient renderer with no user-facing lifecycle seam | MAJOR | **UR** | BUILD |
| J-16 | D-6 | Blob has no context-loss contract; B4 has only a success edge | a success-only gating DAG cannot express "the ornament will not arrive" | MAJOR | **UB** | BUILD + FOLD(W18) |
| J-17 | D-10 | Physical slot names + physical entrance timing under a logical grid | half-logical layout: box model went logical, identifiers and schedule did not | MINOR | **UB** | FOLD(J-5) |
| J-18 | L-13, C-6 | 0 `watch(` in App.vue yet 2 files cite "App.vue's watch"; 3 rationales cite dead artefacts | ownership recorded in prose, not in types | MINOR | **UB** | BUILD |
| J-19 | L-9 | 3 global `@keyframes` + 6 global classes live under `composables/` | global CSS colocated as if it were scoped CSS | MINOR | **UB** | BUILD (`git mv`) |
| J-20 | L-10 | `picker-shell` has exactly one occurrence tree-wide and it is the consumer | a styling seam outlived its stylesheet | MINOR | **UB** | BUILD |
| J-21 | L-11 | Root-barrel reach for `useClipboard` one line above the correct subpath | reaching past the published subpath surface | MINOR | **UB** | BUILD |
| J-22 | L-12 | Two owners of "read the colour out of the URL"; the router-side one is inert at boot | dual ownership; one instance vestigial after a transposition | MINOR | **UB** | BUILD |
| J-23 | L-14 | Retired glass-ui primitive re-homed locally with a parameter kept only for signature parity | design-system primitive retired without a successor | MINOR | **UB** | BUILD + relay |
| J-24 | C-5 | `import { ColorPicker }` is a value import for a symbol used only in a type position | `verbatimModuleSyntax` (edict 8) | MINOR | **UB** | BUILD |
| J-25 | D-14 | Migration-choice **overlay** mounted unconditionally at the shell root | domain accretion at the shell root | MINOR | **UB** | BUILD |
| J-26 | C-9 | Zero tests mount the shell; the one boot-DAG oracle only visits `/` | coverage anchored on the default route → route- and viewport-dependent behaviour has no oracle | MAJOR | **UB** | BUILD |
| J-27 | D-12 (partial) | Two sequenced statements + a magic literal `1` in an inline template handler | logic leaking into the template | MINOR | **UB** | FOLD(J-5) |

### Evidence notes on the merges

**J-2 absorbs C-3.** CHALLENGE-C's C-3 (wrong ref filled for one frame; callback re-fires on every
parent tick) is not a second defect — it is the *same* registration seam failing differently.
`App.vue:324` reads `currentConfig.value.left` (the **incoming** view) while `PaneSlot.vue:86-97`
delays the rendered triplet by one rAF, and `PaneSlot.vue:124` builds a **fresh inline arrow** as
`:ref` on every render, so Vue's `setRef` re-runs it every tick. I did not re-run the jsdom model;
the sequence is deterministic from those three line ranges, so C-3 is **UB**, folded into J-2, and
J-2's cure (the slot reports `(instance, liveKey)`; the App keys a record off that name; a stable
non-inline `:ref`) closes both arms.

**J-11 measured harder than claimed.** On `/#/` and `/#/generate`, anonymous, not logged in, the
browser's eager resource graph is **250 resources / 137 `demo/` modules** and contains:

```
demo/platform/auth/useAdminAuth.ts        demo/palettes/useAdminUsers.ts
demo/palettes/useAdminAudit.ts            demo/palettes/useAdminFlagged.ts
demo/palettes/useAdminTags.ts             demo/palettes/api/admin-users.ts
demo/palettes/api/admin-colors.ts         demo/palettes/api/admin-audit.ts
demo/palettes/api/admin-palettes.ts
demo/palettes/browser/dialog/FlagReportDialog.vue
demo/palettes/browser/dialog/VersionHistoryDrawer.vue
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts
```

`AdminPane.vue` is `defineAsyncComponent` (`usePaneRouter.ts:76`) and mounts on none of these
routes. The split is real for the views and void for the logic — confirmed. The three dialog
modules ride in for one used dialog through the `dialog/` barrel at `App.vue:176`.

**J-12's cure must be retirement, not relocation.** CHALLENGE-L proposes moving `injectGroundTokens`
to `plugins/vite-ground-tokens.ts`. Canon forbids that: `VISUAL-CONSTITUTION.md:172` —
*"`groundRecordInject`, `__GROUND_*__`, the stop cache, and the initial `deriveAurora` twin **all
die in the same cut**."* The finding stands (I confirmed `vite.config.ts:15` imports
`./demo/color-picker/composables/boot/ground`, and the browser eagerly loads
`http://localhost:9000/composables/boot/ground.ts`, which exports `injectGroundTokens` at `:131`
beside runtime constants at `:51-103`). The cure is the §6.2 frozen-boot-object cut, folded into
J-9 — not a new plugin file.

---

## 3. Dismissed — with the refuting bytes

I may dismiss only by citing bytes. Six.

**DIS-1 · D-15 (forced colors) — DISMISSED, and I decided it rather than leaving it open.**
CHALLENGE-D correctly labelled its WebKit frame inadmissible, then asserted a "solid source-side
fact": that none of the shell's selectors appear in `foundation.css`'s forced-colors block and that
*"the atmosphere canvas has no forced-colors arm at all."* Both are false.
`demo/styles/foundation.css:678-695` is an explicit two-tier U-F57/BR-5 policy whose tier-1 roster
is `canvas, .spectrum-picker, .gamut-overlay, **.atmosphere-canvas**, **[data-glass-field-canvas]**,
.gradient-rail, .rail-handle, .readout-rail, .swatch-row > *, .generate-swatch, .shadow-swatch,
**.goo-blob-canvas**, .watercolor-swatch, … { forced-color-adjust: none }`. `.atmosphere-canvas` is
at `:683` and `[data-glass-field-canvas]` — App.vue:16's own stamp — at `:684`. I then ran the
matrix the challenger said would decide it, under Chromium with `forcedColors: "active"`:

```
forcedActive: true
body        bg rgb(255,255,255)  backgroundImage: none   color rgb(0,0,0)
.app-layout bg rgba(255,255,255,0)                       color rgb(0,0,0)
.dock-band  bg rgba(255,255,255,0)                       color rgb(0,0,0)
.atmosphere-canvas  forced-color-adjust: none  (deliberate, tier 1)
```

The capture shows white cards, black borders, black ink, monochrome channel sliders — the shell
chrome **does** transform. The colour-display surfaces keep colour by written design, which is the
correct behaviour for a colour tool. No gate. No finding.

**DIS-2 · D-9's fourth point, "two precedence engines over the same three inputs" — the URL arm is
DISMISSED.** The prepaint script resolves *scheme* then *ground*: `localStorage.getItem('vueuse-color-scheme')`,
`matchMedia('(prefers-color-scheme: dark)')`, `localStorage.getItem('color-picker-ground')`
(`index.html:169-198`). `grep -nE "location|URLSearchParams|hash|search"` over
`index.html:159-203` returns **nothing** — there is no URL read anywhere in the prepaint script, so
it cannot be duplicating `hydrate.ts:51-61`'s URL arm. The parent finding J-9 stands on other,
measured grounds (`#app === document.body`; `data-ground-state` null; `window.__VALUE_GROUND_BOOT__`
absent from `demo/` and `src/`).

**DIS-3 · D-12's "mutates a foreign composable's ref directly rather than through its API" —
DISMISSED.** `mobilePaneIndex` is not a raw ref. `demo/shell/useViewManager.ts:60-70` declares it a
`computed<0|1>({ get, set })` whose setter **is** the composable's intent encoding:
`set: (v) => { paneOverride.value = { view: currentView.value, index: v } }`. Writing `.value = 1`
goes through that API, correctly. What survives (J-27) is the two sequenced statements in an inline
template handler and the unnamed literal `1`.

**DIS-4 · D-13's parenthetical "the file otherwise honours `verbatimModuleSyntax` correctly — all
type-only imports are `import type`" — DISMISSED.** `demo/color-picker/App.vue:164` is
`import { ColorPicker } from "../picker";` and `grep -n ColorPicker App.vue` returns only `:164`,
`:223` (`ref<InstanceType<typeof ColorPicker> | null>`) and a prose comment at `:294`. Pure type
position, value import. The sibling file gets it right — `usePaletteWiring.ts:21`
`import type { ColorPicker } from "../../picker";`. CHALLENGE-C's C-5 is correct and CHALLENGE-D's
parenthetical is wrong; both cannot stand, and the bytes settle it. Kept as J-24.

**DIS-5 · C-4's "no `h1`, **no `h2`**, first heading on every route is an `h3`" — the `h2` arm is
DISMISSED as over-broad.** Measured live at 1440×900 on `/#/` after settle: `h1=0, **h2=10**,
h3=11`. The challenger's probe visited `/#/generate` and `/#/blob`, where `h2` genuinely is 0 (I
measured `h1=0 h2=0 h3=2` on `/#/generate`). The heading-outline claim is route-dependent; the `h1`
and skip-link claims are universal (`h1=0` on all 5 of my matrices and 60/60 in
`audit/visual/REPORT.md:119-178`). J-4 asserts only the universal half, which is what the canon
(`:85`, `:118`) actually binds.

**DIS-6 · C-7's named mechanism — DISMISSED; the observation survives.** C-7 attributes the boot URL
rewrite to `useColorPipeline.ts:50-52`'s setup-time clamp tripping the identity watcher at
`useColorUrl.ts:79-82`. That cannot be the path: the clamp runs inside `useColorPipeline`, invoked at
`App.vue:245`; the watcher is installed inside `useColorUrl`, invoked at `App.vue:377`; and a
non-`immediate` `watch` does not fire for a change that happened before it was registered. I
instrumented `history.replaceState`/`pushState` and captured the writer's stack instead:

```
t=122ms  changeLocation <- createWebHashHistory                 "#/generate"     (router init)
t=254ms  changeLocation <- Object.replace <- finalizeNavigation  "#/generate"     (initial nav settles)
t=477ms  changeLocation <- Object.replace <- finalizeNavigation
         "#/generate?space=lab&color=lab(92%25+88.8+20+/+82.7%25)"                 ← the rewrite
```

The writer is confirmed — a `router.replace` carrying exactly `useColorUrl.ts:64`'s
`{ ...route.query, space, color }` payload, arriving ~300ms after its `debounce`. **Which post-setup
model write flips `model.value.color`'s identity is NOT established**, and the proposed cure ("make
the clamp a no-op write") therefore has no proven basis. J-13 keeps the defect (measured on every
run, fresh context, empty storage) and **gates on the observable, not on the guess** — the wave must
find the writer before it cures it.

---

## 4. Hypotheses — kept as hypotheses, no gates built on them

**HYP-1 · `class="relative"` on `<body>` is dead weight (D-9 point 1).** The reasoning is sound as
far as it goes — the atmosphere canvas is `absolute inset-0` (`App.vue:11`) and a descendant of
`.app-layout` (`App.vue:2`), which is already `position: relative` (`shell.css:25`), so the canvas
never resolves against `<body>`. But CHALLENGE-C reads the same attribute as *"the positioning
context for every teleported overlay appended to `<body>`"*, and I measured 4–8 teleport hosts
sitting as `<body>` children. Whether any of them positions against it is untested. Two challengers,
opposite readings, no measurement: **hypothesis.** J-9's cure must not delete the attribute
blind — it must first measure the overlay hosts' `position` under a `<div id="app">` host.

**HYP-2 · The blob's desktop presence is "a coin flip" (D-6).** Both of my Chromium `/#/` desktop
runs produced the blob (`canvases: 2`, `heroBlob: true`). The tracked
`safari-desktop-light /#/` row (`REPORT.md:119`: `canvas=1`, `consoleErr=1` = "WebGL: context
lost.", settle 18905ms) against `safari-desktop-dark` (`:134`: `canvas=2`, 3515ms) is **one**
observation of a real context loss, not a demonstrated 50% rate. Most desktop blob absences the
challenger collected are explained by J-1, not by nondeterminism. What is **not** a hypothesis, and
is what J-16 asserts: `grep -rn "webglcontextlost|contextlost|isContextLost|contextrestored"
demo/ src/` returns exactly three lines, all in `useAtmosphere.ts:288,298,301` — **the blob has no
context-loss contract at all**, and B4 (`useOverture.ts:143-183`) has only a success edge, so
nothing downstream can collapse the interval it reserved. `shots/safari-desktop-light/picker.png`
shows the consequence: ~200 CSS px of empty card between the `Lab` identity and the
`92.0%, 88.8, 20.0` headline, which is verbatim `PROPORTION-AUDIT.md:59` (PR-15) and
`VISUAL-CONSTITUTION.md:182`.

---

## 5. What I attacked and could not break

Recorded so the upheld findings stay credible.

- **The `<main>`/`<nav>` landmark contract holds.** `main=1, nav=1` on every one of my 5 matrices,
  and `mainCountNotOne = 0` across all 60 tracked captures (`REPORT.md:27`). `App.vue:24-27` and
  `:47` are correct.
- **Zero page errors, zero console errors** in every probe I ran across 5 matrices and 4 routes.
  `pageErrors = 0` and `horizontalOverflow = 0` across all 60 tracked captures
  (`REPORT.md:11,19`). The single tracked console error is the WebGL context loss, not the shell.
- **Reduced motion is genuinely correct**, and it is the reason J-1 never surfaced: the PRM arm
  opens `dockLanded`/`b3`/`b3Complete` synchronously at mount (`useOverture.ts:191-198`), so a
  reduced-motion run cannot reproduce the stall.
- **The X6 single-mount invariant holds.** At 390px: one `.pane-wrapper`, `mobileSlot` present,
  `gridCols: "358px"`. At 1440px: two wrappers, no mobile slot. Exactly one live picker and one
  WebGL context per viewport, as `App.vue:62-70` claims.
- **`useViewManager.mobilePaneIndex` is a properly encapsulated writable computed** (DIS-3).
- **`foundation.css` has a real, deliberate forced-colors policy** (DIS-1).
- **No layout-forcing transitions**, no ungated rAF loop introduced by this component, no
  `defineModel` stale-read hazard, no `ValueUnit` re-wrapping — I re-checked each and agree with
  CHALLENGE-C's negative proofs.

---

## 6. Wave spec — **V·APP-1 · The shell tells the truth about what it mounted**

**Born RED: yes. 15 gates, 15 RED at `c654824e`, verified twice.**

### Scope

`demo/color-picker/` (entry, App.vue, boot composables), `demo/shell/` (PaneSlot, useViewManager,
usePaneRouter, viewSchema, dock), `demo/styles/shell.css` + `overture.css` relocation,
`vite.config.ts` entry + ground seam, `e2e/smoke/oracles/o4-order-invariance.spec.ts`,
`docs/tranches/V/megatranche/audit/visual/states.mjs`.

**Out of scope, folded by name:** the eleven per-member `InstrumentChassis` compositions and their
ratios are **W18**'s by `VISUAL-CONSTITUTION.md:56`, which requires W18 to ratify one low-fidelity
and one real-rendered composition per member *before feature styling proceeds*. This wave lands the
**seam** (the shell stops owning ratio, stage/inspector split and mobile order); W18 lands the
**values**. That is a fold into a named wave, not a re-booking.

### The five cuts, in dependency order

**Cut 1 — the entry becomes a module and the route becomes true before the first render.**
Create `demo/color-picker/main.ts`, referenced as `<script type="module" src="./main.ts">`. It holds
`createApp` · `app.use(router)` · `await router.isReady()` · `app.provide(API_CLIENT_KEY, …)` ·
`initGlobalDark()` · `import "../styles/foundation.css"` · `app.mount("#app")`, with
`<body data-paper-field><div id="app"></div></body>`. `App.vue` drops both app-level installs
(`:214`, `:219`) and all four CSS imports (`:199-210`). `.app-layout` becomes the app's own root and
already declares `position: relative`. Kills J-1, J-9, and MT-F012's P0 in one file.
*Do not delete `class="relative"` blind — HYP-1 must be measured first.*

**Cut 2 — the slot reports what it mounted; the pane publishes its own action bar.**
`PaneSlot` calls `onMount(instance, liveKey)` from a **stable, non-inline** `:ref`, and every call
site — mobile included — passes it. `App.vue` keys one `paneRefs` record off the reported name and
the two `currentConfig`-name dispatchers (`:323-332`) delete. Then invert the direction: introduce
`demo/shell/actionBar.ts` exporting `ACTION_BAR_KEY: InjectionKey<Ref<DockActionBar|null>>`; each
workbench names its own handlers in its own file; `usePaneRouter`'s 40-line `actionBar` computed
(`:188-228`) deletes entirely. Three `ref<any>` and two `any` parameters retire. Kills J-2 and J-3.

**Cut 3 — the shell owns its own identity.** One `<h1>` inside `<main>`, fed by the same route
identity `installDocumentTitle` already composes (`router/useDocumentTitle.ts`) — one source, two
sinks — with the `tabindex="-1"` focus seat `VISUAL-CONSTITUTION.md:108-116` requires; a skip link
as the shell's first tabbable node; and one `role="status" aria-live="polite"` region beside the H1,
written by the same route-settlement commit, so the 404 becomes an announced redirect rather than a
silent rewrite. Kills J-4 and J-14.

**Cut 4 — the shell stops being a viewport frame and stops being a chassis.**
`.app-layout` block axis becomes `min-height: 100dvh`; the dock band keeps its reserved band via
`position: sticky` on grid row 1 (`--dock-band-min-h`, `shell.css:44`, already carries the
reservation) and the document scrolls. The shell stops declaring `grid-template-columns`
(`shell.css:133-138` deletes); the route composition declares its ratio, with Picker's the one
value canon already fixes — `exact golden inspector 38.1966011%` (`:42`). The desktop/mobile `v-if`
fork, `pane-wrapper--left/--right`, `pane-wrapper--ghost` and `mobilePaneIndex` die together;
container queries carry the reflow (`.pane-wrapper` is already `container-type: inline-size`,
`shell.css:82-84`). Kills J-6, J-7, J-8, J-17, J-27; opens J-5's seam.
Rider: `states.mjs:69` gains a vertical term so this defect class is measurable at all.

**Cut 5 — one lattice table, scoped DI, and the residue.**
Routes derive from `VIEW_MAP`; `componentFor` becomes a `Record` keyed by the closed `LeftPane`/
`RightPane` unions so `tsc` proves exhaustiveness; `?? "picker"` and `return ColorPicker` — both
masking fallbacks (edict 2) — die by construction; `meta.admin` deletes (J-10).
`providePalettePorts` splits by lifetime: always-on from `main.ts`, browse from `BrowsePane.vue`,
the five admin ports + `palettes/api/admin-*` from `AdminPane.vue` — both already async boundaries
(J-11). `MigratePalettesDialog` imports from its file and its recovery article re-homes inside
`<main>` per `:224` (J-25). B4 gains a terminal `unavailable` arm and the blob gains the
`webglcontextlost`/`webglcontextrestored` contract `useAtmosphere.ts:288-301` already models (J-16).
One shell-level `aria-pressed` still control, persisted with the colour-mode store, tearing the rAF
loops down rather than zeroing opacity (J-15). `git mv overture.css → demo/styles/` (J-19, a move,
never a deletion — edict 6). `injectGroundTokens` **retires** per `:172` (J-12). Delete
`picker-shell` (J-20); fold `useClipboard` into the `/dom` import (J-21); delete `useColorUrl`'s
boot-time `applyUrlToModel()` and the `appliedFromUrl` term (J-22); drop `containerEl` from the
local `useLayerTransition` and relay to glass-ui (J-23); `import type { ColorPicker }` (J-24);
delete the three dead rationales rather than correcting them, by making
`useAtmosphereBoot`'s provides part of its declared surface (J-18). Find and cure the real writer of
the boot URL rewrite (J-13).

### Gates — all 15 RED today

Runner: `node docs/tranches/V/megatranche/audit/components/App/gates/gates.mjs` (needs the dev
server; exits with the RED count). Landed form for G1/G1b/G2 is the parametrised
`o4-order-invariance` oracle plus one new mobile dock-action spec (J-26).

| gate | asserts | RED today — measured | the exact input that turns it RED |
|---|---|---|---|
| **G1** | cold load on every member route completes `b0..b4` | `/#/` 5 marks · `/#/gradient` 3 · `/#/generate` 3 · `/#/browse` 3 | any route where `VIEW_MAP[r].left !== "color-picker"` — `/#/gradient` |
| **G1b** | routing to the Picker after a deep link mounts its ornament | `heroBlob=false overtureMarks=3` | cold `/#/gradient`, then `location.hash="#/"` |
| **G2** | a rendered, enabled dock action does the same thing at every viewport | desktop effective=true · mobile effective=**false**, both rendered+enabled | `nav.dock-band button[aria-label=Regenerate]` on `/#/generate` at 390×844 |
| **G2b** | no `any` in the shell's pane-instance plumbing | `grep -c 'ref<any>\|: any' App.vue` → **5** | `App.vue:317,318,319,323,330` |
| **G3** | one H1 + a bypass link as the first focusable | `h1=0 inPageAnchors=0`; first focusables `BUTTON:Save edit, BUTTON:Cancel edit, INPUT` | any route — the demo tree contains zero `<h1>` |
| **G3a** | (source) one `<h1>` and a skip link exist | `grep -rln '<h1' demo/` → ∅ ; skip-link grep → ∅ | the whole tree |
| **G4a** | a two-part desktop scene renders `golden` or `preview-dominant` | `512px 512px` → **50.0000% / 50.0000%**, Δ 11.80pp | `shell.css:133-138`'s "Equal columns always" at ≥1024px landscape |
| **G4b** | overflow rides the document scroller | `documentElement scrollHeight-clientHeight = 0px` on all 5 matrices | `shell.css:19-28` `height:100dvh; overflow:hidden` |
| **G5** | a boot with no user action leaves the address bar untouched | `/#/` → `/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` | a fresh context with empty `localStorage` on any route |
| **G6** | an anonymous visitor downloads zero admin modules | **9** admin modules eager on `/#/` | `App.vue:188 → usePaletteWiring:24 → usePalettePorts:4-19` |
| **G7** | the entry is a module file, not inline HTML | `find demo -name main.ts` → ∅ ; `grep -c app.mount index.html` → **1** | `index.html:205-213` |
| **G7b** | type-only imports use `import type` | `164:import { ColorPicker } from "../picker";` | `App.vue:164` |
| **G8** | ambient motion terminates within 5s, or a pause control exists | rAF **307 @5.2s → 670 @10.2s** (+363 past the cap) | any route, any viewport, PRM off |
| **G8b** | a persistent still/pause control exists in the tree | pause-control grep → ∅ | the whole tree |
| **G9** | at least one test mounts the shell | `grep -rn 'mount(' test/ demo/test/` → ∅ | the whole vitest suite |

**Gate soundness, owned.** Every row above names the input that reddens it, so no row is vacuous. I
found and removed one unsound gate during authorship: G1b originally selected on `.picker-shell`,
which J-20 **deletes** — the gate would have gone red because its own selector retired, not because
the contract broke. It now asserts `5 marks + ornament`, re-verified RED. Two rows I considered and
**refused to write**: a forced-colors gate (DIS-1 — it would be green, therefore vacuous) and a
blob-determinism gate (HYP-2 — I cannot name an input that reliably reddens it, so it would be
flaky, not sound).

### π obligations (pinned witness captures)

Every visual claim in this spec carries one. Matrix · route · selector, pinned:

1. `safari-desktop-light` · `/#/` · `.pane-container` computed `grid-template-columns` + both
   `.pane-wrapper` rects — the 50/50 witness (J-6).
2. `zoom-200-desktop` (720×450 @2 DPR) · `/#/` · full viewport + `.channel-rail` rect vs
   `innerHeight` — the reflow witness (J-7, J-8).
3. `safari-desktop-light` · `/#/` · `.picker-shell` card, `Lab` identity baseline → headline
   baseline interval in CSS px — the PR-15 dead-acreage witness (J-16).
4. `rtl-desktop` · `/#/` · both `.pane-wrapper` rects with `dir="rtl"` — the protagonist-side
   witness (J-17).
5. `safari-mobile-light` · `/#/generate` · `nav.dock-band` action-bar layer expanded — the
   named-and-enabled-but-inert witness (J-2).
6. `keyboard-focus-desktop` · `/#/` · `document.activeElement` after 1 Tab — the bypass witness
   (J-4).

### Δ obligations (before/after pairs proving change)

1. **Overture DAG:** `/#/gradient` marks `[b0,b1,b2]` → `[b0,b1,b2,b3,b4]`; `.hero-blob-anchor`
   absent → present after hash-nav to `/#/`.
2. **Dock parity:** `/#/generate` @390 palette signature unchanged → changed on the same dispatch;
   desktop unchanged as a control.
3. **Proportion:** `512px 512px` (50.0000%) → the ratified `golden` split, both `.pane-wrapper`
   rects captured at 1440×900.
4. **Scroll ownership:** `documentElement scrollHeight-clientHeight = 0` → `> 0` at mobile with the
   dock band's reserved height unchanged (the §3 law 4 non-regression).
5. **Reflow:** `zoom-200-desktop/picker.png` — channel rail below a non-scrolling fold → rail in
   frame or reachable by document scroll; the `Picker | About` pane selector gone.
6. **Identity:** `h1=0, skipLinks=0, firstFocusable=BUTTON:Save edit` → `h1=1, skipLink present,
   firstFocusable = the skip link`.
7. **Eager graph:** 9 admin modules on an anonymous `/#/` → 0, with `AdminPane`'s own chunk still
   resolving on `/#/admin/users`.
8. **Ambient motion:** rAF +363 between t=5.2s and t=10.2s → 0 with the still control engaged, and
   the control's state announced and restored across reload.
9. **Boot quiescence:** `/#/` → `/#/?space=lab&color=…` becomes `/#/` → `/#/`, with a genuine
   share-link deep load still round-tripping its colour.

---

## 7. Addendum clause

> **V·§App-shell — route truth, slot truth, and shell identity.**
> The application entry is a module file. It installs the router, awaits `router.isReady()`, and
> only then mounts; no component may render a route-derived pane before the route is true, and no
> boot beat may be armed by a single DOM event without a state-checked floor. Pane-instance
> registration is reported by the slot that mounted the instance, never dispatched by a name a call
> site guesses; a slot that renders a pane registers it at every viewport, and a control the dock
> renders as named and enabled is live at every viewport or it is not rendered. The shell owns its
> route's sole `<main>`, exactly one `<h1>`, one bypass link as its first tabbable node, and one
> polite status region; it does not own a ratio, a stage/inspector split, a breakpoint mount fork,
> or any domain dialog. The document is the scroller. No masking fallback may stand between a
> lattice table and its consumer: unknown names are navigation events, not silent substitutions.
> Every one of these obligations is discharged by an executable gate that is RED against the tree
> it was written for; a gate with no input that reddens it is deleted, not weakened.

---

## 8. Dissent

**Against CHALLENGE-D, on severity and on scope.** D-2 is upheld — the canon retires the two-pane
workspace in five clauses and I read all five. But D-2's framing, that *"every finding except D-5,
D-6, D-9 and D-14 is a consequence of that one premise, which is why the cure is a transposition,"*
does not survive the measurements. **The two defects that actually break the product for a real
user are not consequences of the two-pane premise at all.** J-1 breaks on `/#/gradient` at any
viewport, dual-pane or single, and would survive the single-scene transposition untouched, because
its cause is `router.isReady()` and an unfloored beat. J-2 would be *masked* by removing the
breakpoint fork, not cured — the per-call-site `:on-mount` prop and the `any`-typed
`currentConfig.left` dispatcher would still be there, waiting for the next branch. Adjudicating this
component as "the architecture is retired, therefore transpose" would ship a beautiful single-scene
shell with a wedged boot DAG and a dead dock on mobile. Cut 1 and Cut 2 come first for that reason,
and they are the two cuts that need no W18 ratification to land.

**Against CHALLENGE-D, on evidence discipline.** D-15's source-side claim was asserted as *"solid"*
and is false (DIS-1); D-13's `verbatimModuleSyntax` parenthetical is false (DIS-4); D-12's
API-violation claim is false (DIS-3); D-9's URL-duplication arm is false (DIS-2). Four refuted
sub-claims in one report is the cost of arriving from a premise of guilt, and it is exactly what
this seat exists to correct.

**Against CHALLENGE-C, on C-7.** The measurement is right and the mechanism is wrong (DIS-6). A cure
written against the wrong mechanism would have landed, been green on inspection, and left the
address bar still rewriting. I have gated the observable instead.

**Against CHALLENGE-L, on L-3's cure.** Relocating `injectGroundTokens` to `plugins/` is the right
shape of fix for the wrong tranche: `VISUAL-CONSTITUTION.md:172` retires `groundRecordInject` and
`__GROUND_*__` *by name*, in the same cut as the frozen boot object. Building the plugin would be
building something the canon has already scheduled for demolition.

**Where I expect the other jurors to disagree with me, and my position.** I have graded J-5 (the
retired architecture) BLOCKER but split its disposition BUILD + FOLD(W18), and I have graded J-6
(50/50) MAJOR rather than BLOCKER. A design-axis juror will likely grade both BLOCKER and demand
they land here. I hold that `VISUAL-CONSTITUTION.md:56` settles it against them: W18 must ratify a
composition **per member** — *"Picker cannot stand in for About"* — before feature styling proceeds,
so this wave can honestly land the seam and exactly one ratified value (Picker's `golden`, `:42`)
and no more. A wave that promised eleven compositions would be promising W18's work with W18's
authority, and its gate would be unwritable.

---

*Report: `docs/tranches/V/megatranche/audit/components/App/jury-1-correctness.md`*
*Gates: `docs/tranches/V/megatranche/audit/components/App/gates/gates.mjs` — 15 RED / 15 at `c654824e`*
*No source edits landed from this seat.*
