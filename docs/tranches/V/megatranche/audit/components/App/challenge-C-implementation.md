# CHALLENGE-C — `demo/color-picker/App.vue` is improperly implemented

**Seat:** CHALLENGE-C (implementation) · **Subject:** `demo/color-picker/App.vue` (417 lines, area `core`)
**Repo:** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD `c654824e`
**Date:** 2026-07-24 · **Live substrate:** `http://localhost:9000` (vite dev)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. Not an inherited or undeclared seat.

---

## VERDICT — **DEFECTIVE**

One **BLOCKER**: on **10 of the 14 routes**, a cold load / refresh / shared link permanently stalls
the overture beat DAG at B2 — `overture:b3` and `overture:b4` never fire for the life of the
session, and the picker's hero-blob ornament (gated on B4) **never mounts again, on any route, for
that session**. Measured, reproduced three ways, and invisible to every existing gate because the
O-4 order-invariance oracle only ever visits `/`.

One **MAJOR**: the mobile pane slot is the only slot with no `:on-mount`, so every pane-instance ref
App.vue owns is permanently `null` at mobile viewports. Measured consequence: **9 dock action-bar
actions silently no-op on mobile** while their buttons render and accept clicks (dock "Regenerate"
on `/#/generate` at 390px leaves the palette seed byte-identical; the same click at 1440px changes
it).

The strongest defect and the mobile one share a single mechanism family: **App.vue derives boot- and
identity-critical state from a source of truth that is not yet (or not ever) the truth** — the route
before the router resolves, and `currentConfig.left` instead of the slot that actually mounted.

---

## Findings

| id | severity | defect | status |
|---|---|---|---|
| C-1 | **BLOCKER** | Deep-linked non-picker routes stall the overture at B2 forever; hero blob never mounts | CONFIRMED (measured ×3) |
| C-2 | **MAJOR** | Mobile slot has no `:on-mount` → all four pane refs permanently null → 9 dock actions dead, picker action bar + commit/cancel edit dead | CONFIRMED (measured) |
| C-3 | **MAJOR** | Ref-capture fills the WRONG ref during a swap frame, and re-fires on every parent tick | CONFIRMED (jsdom repro) |
| C-4 | **MAJOR** | Shell landmarks carry no `h1`, no `h2`, no skip link — first heading on the page is `h3` | CONFIRMED (60/60 captures + live) |
| C-5 | MINOR | `import { ColorPicker }` is type-only but not `import type` — edict 8 (`verbatimModuleSyntax`) violation | CONFIRMED |
| C-6 | MINOR | The eager-barrel doc-comment books a residual on a build fact the manifest contradicts | CONFIRMED |
| C-7 | MINOR | Every boot rewrites the address bar; the "born hydrated, ONE commit" law is violated at setup | CONFIRMED (measured) |
| C-8 | MINOR | App.vue's root contract (`data-paper-field`, `position:relative`, the B0 mark) is externalized into `index.html`; the component is unmountable in isolation | CONFIRMED |
| C-9 | INFO | Zero tests mount App.vue; the one oracle that asserts its boot DAG only visits `/` — vacuous gate | CONFIRMED |

---

### C-1 · BLOCKER — a deep link to any non-picker route kills the overture DAG for the whole session

**Defect.** `overture:b3` and `overture:b4` never fire when the app cold-loads on a route whose left
pane is not `color-picker`. Because `useOverture`'s beats are one-shot `ref`s owned by App.vue's
setup (`App.vue:296`), the stall is **permanent for the session**: navigating afterwards to the
picker mounts the picker but the hero blob — `v-if="blobReady && ornamentOpen"`, where
`ornamentOpen = overture?.b4.value` (`demo/picker/ColorPicker.vue:95` + `:164`) — **never renders**.

**Reproduction** (`node probe-b3.mjs`, isolated Chromium 1440×900 against localhost:9000; the script
loads a route, waits 5s, reads `performance.getEntriesByType("mark")`, then hash-navigates to `/#/`
and waits 7s):

```
[
  { "label": "CONTROL cold-load /#/ (picker)",
    "afterEntry": { "marks": ["overture:b0","overture:b1","overture:b3","overture:b2","overture:b4"],
                    "blob": true },
    "afterNav": null },
  { "label": "DEEPLINK /#/generate -> nav to /#/",
    "afterEntry": { "marks": ["overture:b0","overture:b1","overture:b2"], "blob": false },
    "afterNav":  { "url": "#/", "marks": ["overture:b0","overture:b1","overture:b2"],
                   "blob": false, "picker": true } },
  { "label": "DEEPLINK /#/browse -> nav to /#/",
    "afterEntry": { "marks": ["overture:b0","overture:b1","overture:b2"], "blob": false },
    "afterNav":  { "url": "#/", "marks": ["overture:b0","overture:b1","overture:b2"],
                   "blob": false, "picker": true } }
]
```

Read it: the control has five marks and a blob; both deep links have **three** marks and **no blob
even after routing to the picker**. `.hero-blob-anchor` is absent while `.picker-shell` is present —
the picker mounted, the ornament did not.

**Mechanism** (three coupled facts, all in this component):

1. **App.vue renders panes before the router has resolved.** The inline entry
   (`demo/color-picker/index.html:205-213`) calls `app.use(router); app.mount("#app")` with no
   `router.isReady()` await. Vue Router's initial navigation is asynchronous, so at App setup
   `route.name` is `undefined`; `useViewManager.currentView` falls back to `"picker"`
   (`demo/shell/useViewManager.ts:43-46`), `currentConfig` is therefore the picker's config, and
   `PaneSlot` seeds `liveComponent` from props **at setup** (`demo/shell/PaneSlot.vue:74`). Measured
   directly — a pre-navigation `MutationObserver` recording the first child of `.pane-wrapper` on a
   cold `/#/generate` load returns:

   ```
   "firstPaneClasses": [
     "pane-shell … picker-shell -l",          ← the ColorPicker mounts FIRST
     …
     "glass-resting card … pane-scroll-fade"  ← the GeneratePane arrives after
   ]
   ```

   So the picker — the heaviest pane, the one that idle-fetches the WebGL HeroBlob chunk — mounts
   and is thrown away on **every** deep link.

2. **B3's arming predicate is a Vue `Transition` *appear* hook, and nothing else.**
   `noteLeftPlateSettled` has exactly two call sites, both `:on-appeared`
   (`App.vue:90`, `App.vue:109`) → `PaneSlot`'s `@after-appear` (`PaneSlot.vue:118`). `appear` hooks
   fire only for a Transition's **initial** child; when the child is replaced one tick later (the
   router resolving, then `PaneSlot`'s deliberate one-rAF commit at `PaneSlot.vue:95`), the appear
   transition is cancelled and `after-appear` never fires. `b3` stays false → `b3Complete` stays
   false → the `b3Complete && b2` watch (`useOverture.ts:153`) never opens → `b4` never flips.

3. **B3 is the only beat with no state-checked fallback.** Every sibling beat in this boot chain has
   one: `useDockArrival` falls through via a `getAnimations()` emptiness check
   (`useDockArrival.ts:63-72`), and B4's own wait falls through when no animation is running
   (`useOverture.ts:173`). B3 has a single event-shaped input and no floor, so one missed DOM event
   is terminal.

**Blast radius.** `VIEW_MAP` left panes (`demo/shell/viewSchema.ts:106-225`): `picker`, `palettes`,
`mix`, `blob` are `color-picker`; `browse`, `extract`, `generate`, `gradient`, `atmosphere`,
`admin-users`, `admin-names`, `admin-audit`, `admin-flagged`, `admin-tags` are not. **10 of 14
routes** stall. This is a hash-routed, link-sharing colour tool published at `color.babb.dev`: a
shared `/#/gradient` or `/#/browse` link, or an F5 on those routes, is the ordinary case, not the
corner. PRM users are exempt (the PRM arm sets `dockLanded`/`b3`/`b3Complete` at mount,
`useOverture.ts:191-198`) — which is precisely why the defect never shows up in a reduced-motion
run.

**Proposed cure** (architectural transposition, and it is the same seam MT-F012 already forces
open): the P0 cure moves `index.html:205-213` into a real `main.ts`. Make that entry the idiomatic
vue-router SPA boot —

```ts
const app = createApp(App); app.use(router);
await router.isReady();          // ← the route is TRUTH before the first render
app.mount("#app");
```

— and the whole class dies: `currentView` is correct at first render, the first-mounted left pane is
the final one, its appear transition completes, B3 fires, B4 fires. This directly answers the
question put to this seat: **App.vue's boot contract silently assumes "the route may not be resolved
yet, and my beat DAG will survive that", and a correct entry makes that assumption unnecessary.**
Second, independent arm (defence in depth, matching the sibling beats' idiom): arm B3 on the left
pane's *mount* plus a `getAnimations()` settle check, not on a Transition `appear` event — one
missed DOM event must never be able to wedge a beat.

---

### C-2 · MAJOR — the mobile slot captures no pane instance, so nine dock actions are dead buttons

**Defect.** `colorPickerRef`, `generatePaneRef`, `gradientPaneRef` and `mixPaneRef` are assigned
**only** inside `onDesktopLeftMount` / `onDesktopRightMount` (`App.vue:323-332`), which are wired
**only** to the two desktop `PaneSlot`s (`App.vue:105`, `App.vue:131`). The mobile slot
(`App.vue:83-91`) passes `:component`, `:component-key`, `:component-props`, `:transition-name`,
`:max`, `appear`, `:on-appeared` — and no `:on-mount`. At any mobile viewport all four refs are
`null` forever.

**Reproduction** (`node probe-actionbar2.mjs` — same script, same selectors, two viewports; opens
the dock's action-bar layer, clicks the dock's `button[aria-label='Regenerate']` scoped to
`nav.dock-band`, then the pane's own Regenerate as a control):

```
desktop-1440 /#/generate   dockRegenCount 1  seed 05a86311 → e84f5064   dockActionWorked TRUE
                                             then pane click → bfbb7c41  paneActionWorked TRUE
mobile-390  /#/generate    dockRegenCount 1  seed f16915bd → f16915bd   dockActionWorked FALSE
                                             then pane click → e04dde63  paneActionWorked TRUE
```

The dock button exists, is hit-testable, is clicked, and does nothing; the pane's own button works,
so the pane is alive and only the dispatch is broken. The affordance is visible in the shipped
mobile capture — the brush glyph in the pill at
`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/generate.png`.

**Mechanism.** `usePaneRouter`'s handlers optional-chain into the null refs and therefore fail
silently: `() => paneRefs.generate.value?.regenerate?.()`
(`demo/shell/usePaneRouter.ts:196-198`, `:208-210`, `:220-222`). Nine actions total — generate
(regenerate / save / copy), gradient (reset / copy CSS / seed-from-palette), mix (clear / mix /
copy result).

**Same-mechanism collateral, all measured or file-evidenced:**

- `:action-bar="colorPickerRef?.actionBarContext ?? null"` (`App.vue:38`) is always `null` on
  mobile, so the picker's own action bar never reaches the dock. Measured on `/#/` at 390 px:
  `.action-bar-toggle-inner` renders with zero width (`toggleVisible: false`) where the same probe
  at 1440 px reports `true`.
- `@commit-edit="colorPickerRef?.commitEdit(); …"` / `@cancel-edit=…` (`App.vue:41-42`) are no-ops
  on mobile — yet the dock *does* show the edit affordances there, because `activeEditTarget` is fed
  by props (`usePaneRouter.ts:135`) and is not ref-dependent. Mobile users get Save/Cancel edit
  buttons that cannot save or cancel.
- The palettes right pane's `onCommit-edit` / `onCancel-edit` route through
  `deps.colorPickerRef()` (`usePaneRouter.ts:156-157`) — same nulls.
- `usePaletteWiring.emitStartEdit` polls for the picker 40 × 50 ms and then logs
  `[usePaletteWiring] gave up waiting for the color picker to mount (startEdit)`
  (`usePaletteWiring.ts:37-58`, `:117`). On mobile that 2-second give-up is the *guaranteed* path,
  not the race guard it was written as.
- `emitApply` / `emitSetCurrentColor` fall through to `applyColorString` whenever the ref is null
  (`usePaletteWiring.ts:65-73`, `:121-127`) — a **masking fallback** (edict 2) that hides a
  structural gap behind a degraded behaviour and is why C-2 never surfaced as a crash.

**Proposed cure.** Delete the two `onDesktop*Mount` name-dispatchers and let the slot report what it
actually mounted: `PaneSlot` already owns `liveKey`, so have it emit `onMount(instance, liveKey)` and
key a single `paneRefs` record off that name — one path for all three slots, mobile included, and the
"which ref?" question is answered by the slot, not by a second source of truth. That also cures C-3.

---

### C-3 · MAJOR — the ref-capture callback fills the wrong ref during a swap, and re-fires every tick

**Defect.** `onDesktopLeftMount(el)` decides which ref to fill by reading `currentConfig.value.left`
(`App.vue:324`) — the *incoming* view. But `PaneSlot` deliberately delays the rendered triplet by
one animation frame on a key change (`PaneSlot.vue:86-97`), so for one frame the config says "generate"
while the mounted instance is still the ColorPicker. The callback fires in that window and
mis-assigns.

**Reproduction** (`node ref-churn.mjs` — jsdom + this repo's `vue`, a 60-line model of the
PaneSlot ↔ App ref contract: same inline arrow `ref`, same one-rAF commit, same
`left === "…" ? el : null` dispatcher). Trace:

```
left=color-picker el=Picker -> picker=Picker generate=null
--- initial mount done ---
left=color-picker el=Picker -> picker=Picker generate=null     ← A: one unrelated parent re-render
--- after 1 unrelated parent re-render ---
left=generate     el=Picker -> picker=null   generate=Picker    ← B: WRONG REF FILLED
--- after config flip (slot NOT yet committed) ---
left=generate     el=null   -> picker=null   generate=null
left=generate     el=Generate -> picker=null generate=Generate  ← self-heals one rAF later
--- after rAF commit ---
```

Line B is the defect: `generatePaneRef` holds a **ColorPicker instance**, and `colorPickerRef` is
`null` while the picker is still mounted and visible. The three `ref<any>` declarations
(`App.vue:317-319`) plus `onDesktopLeftMount(el: any)` (`App.vue:323`) are what let a
type-incompatible instance land in a typed slot without a compiler word; the `?.regenerate?.()`
optional call is what keeps it silent rather than a TypeError.

Line A is the second half: an ordinary parent re-render (one colour tick — and this App re-renders
on every colour change, because `componentProps` is a fresh object per tick from
`usePaneRouter.leftProps`) re-invokes the capture callback, so `colorPickerRef` is re-assigned on
every reactive tick of the shell. Cause: `PaneSlot`'s `:ref` is a **new inline arrow on every
render** (`PaneSlot.vue:124`), so Vue's `setRef` treats it as a changed ref and re-runs it.

**Proposed cure.** Same as C-2: the slot reports `(instance, key)`; the App stores by key. A stable
(non-inline) ref function in `PaneSlot` removes the per-tick re-fire.

---

### C-4 · MAJOR (accessibility as implementation) — the shell publishes landmarks with no headings and no skip link

**Defect.** App.vue owns the document's landmark structure — `<nav aria-label="Application
navigation">` (`App.vue:24`) and `<main aria-label="Color tool panes">` (`App.vue:47`) — and supplies
**no `h1`** and **no skip link**. It is the only component positioned to own either.

**Evidence.** The 60-capture Safari matrix reports `h1 = 0` for **every one of the 60 captures**
(`docs/tranches/V/megatranche/audit/visual/REPORT.md`, per-capture table, `h1` column — 15 routes ×
4 matrices, all zero). Live corroboration from the isolated probe at both viewports and on three
routes: `{ h1: 0, h2: 0, landmarks: { main: 1, nav: 1, header: 0 }, skipLink: [] }`. `grep -rn "<h1"
demo/` returns **nothing** in the entire demo tree; `PaneHeader` renders `<h3>`
(`demo/shared/ui/PaneHeader.vue:21`). So on `/#/generate` the outline is: *no h1, no h2, first
heading `h3`* — WCAG 1.3.1 (skipped level, no top-level heading) and 2.4.6 in the negative, plus no
heading-navigation entry point for a screen-reader user.

The keyboard consequence compounds it: the dock band is DOM-first, and the measured first three
focusables at 1440 px are `BUTTON:Save edit`, `BUTTON:Cancel edit`, `INPUT` — a keyboard user tabs
through the entire dock (16 buttons enumerated inside `nav.dock-band` on `/#/generate`) before
reaching pane content, with no bypass block (WCAG 2.4.1).

App.vue's *direct* contribution to the REPORT's `namelessButtons` (18) and `smallTapTargets` (60)
counts is **zero** — it renders no buttons; those belong to the dock and the panes. Stated plainly
so the number is not double-charged.

**Proposed cure.** One visually-hidden `<h1>` in the shell naming the app, one `<a class="skip-link"
href="#pane-main">` as the first focusable with `id="pane-main"` + `tabindex="-1"` on `<main>`, and
promote `PaneHeader` to `h2` so the outline is h1 → h2 → h3. The skip-link affordance belongs in
glass-ui if it is to be styled as a design-system primitive (edict 4).

---

### C-5 · MINOR — a type-only import emitted as a runtime import (edict 8, `verbatimModuleSyntax`)

`App.vue:164` is `import { ColorPicker } from "../picker";` and `ColorPicker`'s **only** use in the
file is the type position at `App.vue:223`:

```ts
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);
```

`grep -n "ColorPicker" demo/color-picker/App.vue` → lines 164, 223, and a prose comment at 294.
Under `verbatimModuleSyntax` a value import is emitted verbatim, so this line puts the picker's
module graph into App's eager chunk for a type. The correct form is one file over — `import type
{ ColorPicker } from "../../picker";` (`demo/color-picker/composables/usePaletteWiring.ts:21`), the
same symbol used the same way. (`usePaneRouter.ts:21` legitimately needs the runtime value, so the
eager graph is not *only* App's — but App's own line is a pure edict-8 violation and must be
`import type`.)

### C-6 — the eager-barrel note books a residual against a manifest fact that is false

`App.vue:168-175` states: *"the root `package.json` marks `./demo/**` side-effecting, so this
eager-chunk barrel reach does NOT tree-shake the lazy sibling dialogs by static analysis"* and books
a bundle-config reconciliation. The manifest says `"sideEffects": false` (`package.json:20`) — no
`demo/**` mark exists. The booked residual is void as written; the comment is a stale build claim
carried forward across tranches. Either the residual is real for a different reason (then the reason
must be re-derived and re-stated) or the note dies with the booking.

### C-7 — every boot rewrites the address bar; the "born hydrated, ONE commit" law breaks at setup

Measured: a **clean browser context** (empty localStorage) loading `http://localhost:9000/#/generate`
settles at
`http://localhost:9000/#/generate?space=lab&color=lab(92%25+88.8+20+/+82.7%25)`. Nobody picked a
colour. Mechanism: `useColorPipeline` unconditionally re-assigns the model at setup for the domain
clamp (`demo/color-session/useColorPipeline.ts:50-52` — `if (model.value.color)` is always true, and
`clampColorToSpaceDomain` returns a fresh object), so the `[selectedColorSpace, color]` watcher in
`useColorUrl` (`demo/color-session/useColorUrl.ts:79-82`) sees an identity change and
`router.replace`s the colour into the query. App.vue owns this composition order (`App.vue:245` then
`:377`) and the comment at `App.vue:369-376` asserts the opposite ("The FIRST value is hydration's …
an idempotent re-commit"). Consequence: the shipped URL is never the URL the user was given, and
`shareLink` (`App.vue:365`) always copies a colour-stamped link. Cure: make the clamp a no-op write
(compare and skip when the clamp changes nothing).

### C-8 — App.vue's root contract lives in `index.html`, so the component cannot be mounted anywhere else

App.vue is a **two-root fragment** (`.app-layout` + `MigratePalettesDialog`) mounted straight onto
`<body id="app" class="relative" data-paper-field>`. Measured body attributes after boot:
`["class","id","data-paper-field","data-v-app"]`. Three facts App.vue *depends on* but does not own:

- `data-paper-field` — glass-ui's field contract that switches off the orphan-card warm field-floor
  for every glass card including portaled dialogs (`index.html:216-224`). App.vue supplies the
  field *canvas* (`data-glass-field-canvas`, `App.vue:16`) but not the field *declaration*.
- `class="relative"` — the positioning context for every teleported overlay appended to `<body>`.
- the fouc-guard's pre-paint work: the `@property --saved-bg-*` registrations, the `.dark` class, and
  `performance.mark('overture:b0')` (`index.html:101-203`). `useOverture` documents B0 as
  index.html's beat and has no fallback; a mount without that script yields a DAG whose first mark is
  missing.

Because these are attributes on a container the component does not render, the answer to the seat's
framing question is two-sided: **a correct entry (`main.ts` + `src=`) fixes C-1 outright but does
NOT fix C-8** — the split contract travels with the HTML. If App.vue owned a single root element
carrying its own field stamp (and the entry mounted into a plain `<div id="app">`), the shell would
become mountable in a test/story harness with its material intact, and MT-F012's move would carry no
hidden coupling.

### C-9 · INFO — the gates are vacuous for this component

- **No test mounts App.vue.** `grep -rn "mount(" test/ demo/test/` returns **nothing** — the whole
  vitest suite (`include: ["test/**/*.ts","demo/test/**/*.ts"]`, `vitest.config.ts`) contains zero
  component mounts. Mutation that keeps `npm test` fully green: delete the entire `<nav
  class="dock-band">…</nav>` block from `App.vue`, or delete `:on-mount="onDesktopLeftMount"` from
  the desktop left slot. Both are green. So is C-2's actual defect, today.
- **The one oracle that asserts App's boot DAG only visits `/`.**
  `e2e/smoke/oracles/o4-order-invariance.spec.ts:47` is `await page.goto("/")`, then asserts all
  five marks exist and B0<B1<{B2,B3}<B4 — at 1× and 6× throttle. Route `/` is one of the four routes
  where C-1 does not reproduce. Same for every blob spec: `o12-blob-seat.spec.ts:66`,
  `webgl-blob.spec.ts:46`, `webgl-blob-idle.spec.ts:54`, `mobile/blob-presence-mobile.spec.ts:66` —
  all `goto("/")`. Cure: parametrise O-4 over one non-picker-left route (`/#/gradient` suffices) and
  add a mobile dock-action assertion (dock Regenerate must change the generate seed at 390 px).

---

## Negative proof — what I attacked and could NOT break

Recorded so the DEFECTIVE verdict is not read as "everything here is broken":

- **Boot is throw-safe against malformed URL colour input**, including the repo's live
  `parseCssColor` crash class. Five deep links —
  `oklch()`, `oklch(0.7)`, `lab(NaN NaN NaN)`, `rgb(1e400 -0 255)`, `space=nonsense&color=#ffffff` —
  each booted with `booted: true`, `panes: 2`, `boundary: false`, **0 page errors and 0 console
  errors**, falling through to the default seed (`hydrate.ts:98-130` arms + `useColorUrl.ts:44-47`).
  No white screen, no `ErrorBoundary`, no unhandled rejection.
- **The 60-capture Safari matrix reports 0 `pageErrors`, 0 `blankOrNearBlank`, 0
  `horizontalOverflow`, 0 `darkClassMissing`, and `mainCountNotOne = 0`** — App.vue's landmark and
  layout contract holds on every route × matrix. The single console error in the matrix
  (`safari-desktop-light /#/: WebGL: context lost`) belongs to the blob/atmosphere seat, not to this
  file.
- **No leaked observers, listeners or rAF loops in App.vue's own composables.**
  `useDevicePixelSnap` disconnects its `ResizeObserver` + `MutationObserver`, removes the window
  `resize` and the two capture-phase document listeners, and cancels its pending rAF in
  `onBeforeUnmount` (`useDevicePixelSnap.ts:90-97`); `PaneSlot` cancels its commit rAF in
  `onBeforeUnmount` (`PaneSlot.vue:108`); `useOverture` and `useDockArrival` run finite,
  self-terminating rAF/`getAnimations().finished` chains with idempotent guards — **no ungated rAF
  loop** (the PRM-RAF epidemic class) is introduced by this component. `useAtmosphere` contains no
  `requestAnimationFrame` at all.
- **No `defineModel` stale-read hazard.** App.vue owns the model as a `shallowRef` and provides the
  pipeline via `COLOR_MODEL_KEY` (`App.vue:232`, `:257`); the picker injects it. The known
  `WritableComputedRef` round-trip is structurally absent here, and the `stableHue` invariant is
  honoured through the documented external-write seam (`patchModelExternal`, `App.vue:263-265` ↔
  `useColorPipeline.ts:78-97`).
- **No `ValueUnit` re-wrapping** anywhere in App.vue; it never constructs colour units.
- **`X6` single-mount holds.** At 390 px the layout stamps `data-layout="mobile"` with
  `paneWrappers: 1` and `desktopLeft: false`; at 1440 px `data-layout="desktop"` with
  `paneWrappers: 2` and `mobileSlot: false`. Exactly one live picker (and one WebGL context) per
  viewport, as designed.

---

## Reproduction artifacts

All probe scripts are read-only drivers against the live dev server; none touched the repo:

- `…/scratchpad/probe-b3.mjs` — C-1 (overture marks + `.hero-blob-anchor`, control vs 2 deep links)
- `…/scratchpad/probe-actionbar2.mjs` — C-2 (dock vs pane Regenerate, 1440 vs 390)
- `…/scratchpad/ref-churn.mjs` — C-3 (jsdom mechanism repro of the PaneSlot ↔ App ref contract)
- `…/scratchpad/probe-app.mjs` — C-1 first-pane oracle, C-4 heading/landmark census, boot marks
- `…/scratchpad/probe-malformed.mjs` — negative proof (5 malformed deep links)

(`…` = `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e`)

## Cure ordering (cheapest → deepest)

1. **`main.ts` + `await router.isReady()` before `mount`** — kills C-1 (BLOCKER) and the wasted
   picker mount on 10 routes, and is required anyway by MT-F012. One file, eight lines moved.
2. **`PaneSlot` reports `(instance, key)`; App stores by key; all three slots pass `:on-mount`** —
   kills C-2 and C-3 together and retires three `ref<any>` and two `any` parameters.
3. **B3 gets a state-checked fallback** (left-pane mount + `getAnimations()` settle) so no beat can
   ever be wedged by one missed DOM event.
4. **Shell `h1` + skip link + `PaneHeader` → `h2`** — C-4.
5. `import type` (C-5), delete/re-derive the stale barrel note (C-6), make the boot clamp a no-op
   write (C-7), let App.vue own its root stamp (C-8), parametrise O-4 + add the mobile dock-action
   assertion (C-9).
