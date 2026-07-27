# CHALLENGE-C — `demo/shell/dock/Dock.vue` — implementation audit

> **TWO PASSES.** Pass 1 (§0–§5 + appendix) is the original CHALLENGE-C sweep: 14 findings, C-1…C-14.
> **Pass 2 (§6, appended below)** is an independent second CHALLENGE-C seat run against the same HEAD
> with its own probes: 8 further findings, **C-15…C-22**, including a **new BLOCKER (C-15)** pass 1
> did not reach, and one measurement that **OVERTURNS pass-1 negative proof §3.4**. Pass 1's text is
> preserved verbatim; nothing was deleted or renumbered. Read both. Combined tally:
> **22 findings · 2 BLOCKER · 10 MAJOR.**

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)** — the model this seat was spawned with,
declared explicitly, not inherited. Seat: CHALLENGE-C (implementation). Subject:
`demo/shell/dock/Dock.vue` (359 lines) and its owned subtree
(`composables/{usePopupMutex,useDockAdminMode}.ts`, `layers/*`, `menus/*`, `ActionBarToggle.vue`,
`ColorInput.vue`, `SlugEditLayer.vue`, `DockViewSelect.vue`, `DockStatusLamp.vue`,
`status-lamp.ts`). Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Write scope honoured: this file is the only thing this seat wrote.

*(Pass 2 receipt: the second seat likewise observes itself to be **Opus 5**, exact id
`claude-opus-5[1m]`, declared at spawn — see §6.0.)*

**VERDICT: DEFECTIVE.** 14 findings, 1 BLOCKER, 7 MAJOR. Every finding below carries either a
pasted command output, a measured number, a `file:line`, or a quoted spec. The one thing I saw and
could not reproduce is recorded as an unreproduced observation in §5, not as a finding.

---

## 0. Method / probe ledger

Read-only Playwright (Chromium, the repo's own `playwright` dep) against the live dev server at
`http://localhost:9000`, plus a CDP `Accessibility.getFullAXTree` pass. Scripts are in the session
scratchpad (`chC-dock-p{3..9}.mjs`, `probe-dock.mjs`, `probe-tab.mjs`, `probe-inert.mjs`,
`chC-dock-shots.mjs`). Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/` was modified.

| Probe | What it decided |
|---|---|
| `probe-dock.mjs` | full control census + hidden-layer geometry, desktop 1440 + mobile 390 |
| `probe-tab.mjs` | real Tab walk; hit-test at every dock control's centre |
| `probe-inert.mjs` | `inert`/`aria-hidden` on the crossfade faces + CDP full AX tree |
| `chC-dock-p4/p6/p9` | slug-edit vs action-bar hold A/B; mobile generic-action-bar liveness; 1024×1366 |
| `chC-dock-p5` | mutation/rAF telemetry on the collapsed seal during a live colour drag |
| `chC-dock-p7/p8` | `[data-held]` timeline (the hold counterfactual) |
| `chC-dock-shots` | dock-band screenshots, desktop light / mobile dark / slug-edit |

---

## 1. Findings

| ID | Severity | Defect |
|---|---|---|
| C-1 | **BLOCKER** | On mobile the dock renders the generic action bar with three live, enabled buttons whose handlers are all silent no-ops |
| C-2 | **MAJOR** | The picker's entire action bar is absent on mobile, and the mobile-edit layer's Save/Cancel emits land on a `null` ref by construction |
| C-3 | **MAJOR** | Sticky, false admin identity: any anonymous visit to `/#/blob` or `/#/atmosphere` turns the dock gold permanently; the view-select trigger renders with no label on those routes |
| C-4 | **MAJOR** | The slug-edit layer is not a keep-open driver — an outside click collapses the dock mid-login and discards the typed token |
| C-5 | **MAJOR** | A second, disagreeing `isDesktop` truth (width-only) drives four dock decisions; at 1024×1366 the app is in mobile layout while the dock is in desktop mode |
| C-6 | **MAJOR** | MT-F005 located: `ColorInput.vue`'s send button has no accessible name — live, focusable, 24×24 |
| C-7 | **MAJOR** | MT-F004: the dock ships 4 sub-24px controls in **60/60** captures — 60.3% of every small-target instance in the visual audit |
| C-8 | **MAJOR** | MT-F003: `h1` count is 0 because there is no `<h1>` anywhere in `demo/`; W47's `main/H1/active-subtree =1` gate is RED and untested |
| C-9 | **MAJOR** | Test truth: the a11y battery excludes the dock **by scope**; zero unit tests exist for `Dock.vue`/`useDockAdminMode`/`usePopupMutex`; a named mutation keeps the whole suite green |
| C-10 | MINOR | The collapsed seal's `WatercolorDot` re-renders per reactive tick while invisible — 48 DOM mutations vs 16 rAF ticks in a 1s drag |
| C-11 | MINOR | `useDockAdminMode` re-partitions the view taxonomy in two hand-maintained arrays — a second source of truth over `VIEW_MAP` |
| C-12 | MINOR | `DockStatusLamp`'s label is `display:none` below 1024px while its comment claims "visually-hidden… stays in the accessibility tree" — `role="alert"` with an empty name |
| C-13 | MINOR | Idiom/edict drift: legacy `ref()` template ref beside `useTemplateRef`; `expand?.()` masking call; two pass-through computeds; the desktop/mobile menus are display-toggled duplicates of one menu |
| C-14 | INFO | The view-switch `requestAnimationFrame` is never cancelled on unmount |

---

### C-1 — BLOCKER · the mobile generic action bar is a wall of dead buttons

**Evidence (measured, mobile 390×844, `/#/generate`):**

```
=== C. mobile /#/generate ===
LIVE DOCK CONTROLS: [{"name":"Select view",...},{"name":"Toggle action bar","size":[33,33]},...]
LIVE (after Tools): [{"name":"Back","size":[51,51]},{"name":"Regenerate","size":[32,32]},
                     {"name":"Save palette","size":[32,32]},{"name":"Copy colors","size":[32,32]}]
regenerate buttons: 2
pane text CHANGED after Regenerate: false
before: "Generate\n\nCreate pleasing random palettes…\n5\nRegenerate\n\nseed: f7bdb576\n\nPRESET\nVibran"
after : "Generate\n\nCreate pleasing random palettes…\n5\nRegenerate\n\nseed: f7bdb576\n\nPRESET\nVibran"
pageerrors: []
```

Desktop control, identical click on the identical control:

```
=== C2. desktop /#/generate control ===
regenerate buttons: 2
pane text CHANGED after Regenerate: true
```

The palette seed `f7bdb576` is byte-identical after the tap on mobile and changes on desktop. No
page error, no console error — a **silent** failure.

**Mechanism.** `Dock.vue:157` renders `<GenericActionBar :actions="genericBar.actions.value" …>`.
Those actions are built in `demo/shell/usePaneRouter.ts:193-224`, each handler shaped
`() => paneRefs.generate.value?.regenerate?.()`. `paneRefs` is populated **only** by
`onDesktopLeftMount` / `onDesktopRightMount` (`demo/color-picker/App.vue:323-332`), which are
wired **only** to the desktop `PaneSlot`s (`App.vue:104,130`). The mobile slot
(`App.vue:83-91`) passes no `:on-mount`, so `generatePaneRef`/`gradientPaneRef`/`mixPaneRef` are
`null` at every mobile viewport. The double optional-chain `?.value?.regenerate?.()` then converts
a wiring bug into silence — this is exactly the "masking fallback" the standing edicts forbid.

**Reproduction.** `node chC-dock-p4.mjs` (section C) — or by hand: 390px viewport →
`http://localhost:9000/#/generate` → tap Tools → tap Regenerate → the seed never changes. Same for
`/#/gradient` (Reset / Copy CSS / Seed) and `/#/mix` (Clear / Mix / Copy result).

**Cure (gestalt, not patch).** Pane-instance registration must be breakpoint-agnostic: `PaneSlot`
already owns an `:on-mount` seam — give the mobile slot the same registration callback so ONE
registry serves both breakpoints, and delete the `?.()` on the method call so a missing instance
throws in dev instead of vanishing. The dock should never be able to render an action whose
handler cannot fire; `DockAction` should carry a resolved handler, not a lazily-dereferenced ref
chain.

---

### C-2 — MAJOR · the picker's action bar does not exist on mobile, and the mobile-edit layer's commit path is null by construction

**Evidence (measured, mobile 390, `/#/`):** the Tools trigger is present but `visible=false` —

```
{"tag":"button","name":"Toggle action bar","rect":[32,32],"tabindex":"-1",
 "hiddenBy":"opacity:0@…action-bar-toggle-slot","pointerEvents":"auto"}
```

versus desktop 1440 where the same control is `tabindex 0` and in the tab order
(`probe-tab.mjs`: `Select view → Toggle action bar → Login → @mbabb`). The mobile-dark dock-band
screenshot (`chC-dock-mobile-dark.png`) shows only: view-select, Picker/About segmented control,
`⋮` — no Tools.

**Mechanism.** `hasAnyActionBar` (`Dock.vue:41`) is `actionBar || genericBar`. For every view whose
left pane is `color-picker` (`picker`, `palettes`, `mix`, `blob` — `viewSchema.ts` VIEW_MAP)
`genericBar` is `null` (`usePaneRouter.ts:224`) and `actionBar` comes from
`colorPickerRef?.actionBarContext` (`App.vue:38`). `colorPickerRef` has the same desktop-only
writer as C-1 (`App.vue:223,323-328`). Therefore on mobile, `hasAnyActionBar === false` ⇒ the
whole action-bar surface (Reset / Copy / Random / Palettes / Extract / the CSS colour input) is
unreachable on a phone.

The same `null` ref is the target of the dock's own edit emits: `App.vue:41-42` wires
`@commit-edit="colorPickerRef?.commitEdit(); …"` — while the **only** UI that can emit them is the
dock's mobile-edit layer, which by `Dock.vue:72` (`mobileEditActive = !isDesktop && !!editTarget`)
renders **only** when `!isDesktop`. The affordance and its handler are gated on mutually exclusive
conditions. `Dock.vue:143-144` (`Save edit` / `Cancel edit`) therefore cannot commit.

**Reproduction status.** The `colorPickerRef === null` half is *proved* on mobile (the Tools
invisibility above is a direct observable of it). Driving an actual palette-colour edit on a phone
viewport requires a saved palette and was **not driven end-to-end** — the dead-commit consequence
is derived from the ref-null proof plus `App.vue:41`, and is labelled as such.

**Cure.** Same root as C-1: one instance registry for both breakpoints. The dock should receive a
commit/cancel *port* (two functions) rather than emitting into a host that dereferences a
breakpoint-scoped ref.

---

### C-3 — MAJOR · sticky, false admin identity; and a nav trigger with no label

**Evidence (measured, unauthenticated, desktop 1440):**

```
=== E. /#/blob unauthenticated ===
on /#/blob: { "hash": "#/blob?…",
  "triggerText": "",
  "trigStyle": "--dock-ring: var(--color-gold);",
  "iconClass": "lucide lucide-droplets-icon … w-6 h-6 shrink-0 gold-shimmer-icon",
  "goldShimmerIcons": 1 }
options offered: ["Home","Palettes","Browse","Extract","Mix","Generate","Gradient"]
after switching to Home: { "hash": "#/?…",
  "trigStyle": "--dock-ring: var(--color-gold); …",
  "iconClass": "lucide lucide-house-icon … gold-shimmer-icon",
  "goldShimmerIcons": 1 }
```

Three defects in one trace:

1. **False identity.** An anonymous visitor on `/#/blob` gets the gold admin ring
   (`DockViewSelect.vue:70`) and the gold-shimmer icon (`:80`, and the seal glyph at
   `Dock.vue:277`). `isAdminMode` is passed to both without the `isAdminAuthenticated`
   conjunction that `viewEntries` applies internally (`useDockAdminMode.ts:35`).
2. **Sticky.** After navigating back to Home the gold **persists**. The watch at
   `useDockAdminMode.ts:55-59` only ever sets `isAdminMode = true`; nothing sets it false except
   `toggleAdminMode()` and logout (`:62-64`). One-way latch.
3. **Blank nav trigger.** `triggerText` is `""` on `/#/blob`: the `<Select>` `model-value` is
   `"blob"` (`DockViewSelect.vue:52`) but the offered items are the 7 user views (blob/atmosphere
   are in `adminViews`), so reka's `<SelectValue>` resolves nothing. The primary navigation
   control on that route renders as an icon with no text.

There is a fourth, latent asymmetry: the initialiser `ref(currentView.startsWith("admin-"))`
(`:32`) and the watch's membership test `adminViews.includes(view)` (`:56`) disagree for exactly
`atmosphere` and `blob` — two different definitions of "is this an admin view" in one 77-line file.

**Reproduction.** `node chC-dock-p4.mjs` (section E), or: open `/#/blob` in a clean profile → the
dock ring/icon are gold → pick "Home" → still gold.

**Cure.** `isAdminMode` should not be a `ref` with two mutating watchers. It is a derivation:
`computed(() => isAdminAuthenticated.value && ADMIN_VIEWS.has(currentView.value))`, with an
explicit user intent flag only for the toggle row. And the admin/user partition belongs on the
view schema (see C-11), so "is admin" has exactly one definition.

---

### C-4 — MAJOR · the slug-edit layer is not a keep-open driver; an outside click destroys an in-progress login

**Evidence — the A/B, same viewport, same outside-click coordinate (20,700):**

```
# slug-edit layer (chC-dock-p9.mjs)
main layer    : {"collapsed":false,"held":"(none)","slugFormActive":false}
slug-edit open: {"collapsed":false,"held":"(none)","slugFormActive":true}
pointer off   : {"collapsed":false,"held":"(none)","slugFormActive":true}
outside click : {"collapsed":true, "held":"(none)","slugFormActive":false}   ← gone

# action-bar layer (chC-dock-p8.mjs) — the counterfactual
tools open      : {"collapsed":false,"held":"true","toolsActive":true}
outside click   : {"collapsed":false,"held":"true","toolsActive":true}
+9s after click : {"collapsed":false,"held":"true","toolsActive":true}       ← held
```

And the timer path, with focus still inside the input (`chC-dock-p6.mjs`):

```
A1 t=0:  {"collapsed":false,"slugValue":"half-typed-token-x","activeLayerText":""}
A1 t=+7s (focus still in input, no outside click):
         {"collapsed":true,"slugValue":"half-typed-token-x",
          "activeLayerText":"HomeToolsPickerAbout Login  @mbabb"}   ← layer reverted to main
A3 after re-expand:        {"collapsed":false,"slugValue":"half-typed-token-x"}
A3 after re-opening Login: {"collapsed":false,"slugValue":""}       ← the typed token is gone
```

**Mechanism.** `Dock.vue:86`:

```js
const shouldKeepOpen = computed(() => actionBarLayerActive.value || anyEditActive.value || isAnyOpen.value);
```

`slugEditMode` is missing from the disjunction, so `keepOpen()` is never called for the login
layer and `[data-held]` is never stamped (measured: `"(none)"`). glass-ui's outside-pointerdown
collapse and its `collapseDelay` timer both early-return on `keepOpenCount > 0`
(`node_modules/@mkbabb/glass-ui/dist/dock.js:288,341`), which is exactly why the action-bar layer
is immune and the slug layer is not. The `watch(() => dockRef.value?.expanded, …)` at
`Dock.vue:76` then *silently discards* the layer state (`slugEditMode = false`), and re-opening
Login clears the field (`SlugEditLayer.vue:17`). The comment at `Dock.vue:78-85` asserts "the dock
is held open while ANY driver is live" — the slug-edit layer is a live driver that is not in the
predicate, so the stated invariant is false as written.

**Cure.** Add `slugEditMode.value` to the predicate — the predicate is the right shape, its
domain is incomplete. Structurally better: derive the hold from `activeLayer !== "main"` plus
`isAnyOpen`, so a *new* layer can never be added without a hold. And `Dock.vue:76` should not be a
state-dropping watcher: a collapse while a modal-ish layer is live is the bug, not the cue to
throw the user's input away.

---

### C-5 — MAJOR · two disagreeing `isDesktop` truths

**Evidence (measured, 1024×1366 portrait — an iPad Pro in portrait):**

```
=== D. 1024x1366 portrait ===
{ "layout": "mobile",
  "dockClass": "glass-dock horizontal shape-pill layout-linear dock-scroll-x expanded fit-content dock-inline",
  "toolsLabel": ["Tools"],          ← desktop furniture
  "viewSelectText": "Home",         ← desktop furniture (SelectValue is :is-desktop-gated)
  "dockMobilePanes": true,
  "profileSectionDisplay": "flex",  ← the desktop profile section
  "mq1024": true, "mqCompound": false,
  "panesMounted": 1 }               ← the app mounted the MOBILE single-slot layout
```

`Dock.vue:71` uses `useMediaQuery("(min-width: 1024px)")`. The app's single truth is
`useBreakpoint("(min-width: 1024px) and (min-aspect-ratio: 1.1)")` (`App.vue:310-312`), stamped on
`.app-layout[data-layout]`. They disagree over the whole portrait-tablet band. The dock's copy
drives four decisions: `:always-expanded="!isDesktop"` (`:132`), `DockViewSelect :is-desktop`
(`:171`), `ActionBarToggle :is-desktop` (`:185`) and `mobileEditActive` (`:72`).

Consequences: (a) at a viewport the app renders as *mobile*, the dock is **not**
`always-expanded` and will auto-collapse — the mobile grammar's one guarantee is lost; (b)
`mobileEditActive` is false there, so the mobile-edit commit layer — the only commit affordance
paired with the single-slot layout — never appears.

This exact class of bug is already documented in the repo as fixed elsewhere:
`demo/styles/shell.css:119-125` — *"the width-only `lg:hidden` it replaced marooned the second
pane there"* — and `App.vue:62-70` records MOB-1 superseding "the width-only `lg:*` display
witnesses with the `.app-layout [data-layout]` stamp (the single isDesktop truth)". The dock was
not migrated.

**Cure.** Delete `useMediaQuery` from `Dock.vue`; consume the single layout truth (inject the
breakpoint the app already owns, or read the `[data-layout]` stamp the CSS already reads).

---

### C-6 — MAJOR (a11y 4.1.2) · MT-F005 located: the nameless button is `ColorInput.vue`'s send button

**Evidence (measured live, desktop, Tools → "Open color input"):**

```
LIVE (color-input sub-layer): [
 {"name":"Back","size":[40,40],"nameless":false},
 {"name":"","size":[24,24],"nameless":true},          ← this one
 {"name":"Propose color name","size":[40,40],"nameless":false} ]
TAB ORDER (color-input live): ["Back","Enter a CSS color","BUTTON","Propose color name",…]
```

A screen reader announces "button". `demo/shell/dock/ColorInput.vue:67-82` — **both** branches of
the send control (`v-if="proposeMode"` and `v-else`) are icon-only with no `aria-label`, in a file
whose sibling controls all carry one.

**This exactly reproduces the REPORT's row set.** The dock's ActionBarLayer renders only when
`colorPickerRef.actionBarContext` exists — i.e. only on views whose left pane is `color-picker`:
`picker`, `palettes`, `mix`, `blob` (+ `/#/does-not-exist`, which falls back to picker). REPORT.md
lists desktop nameless = 1 on exactly `{/#/, /#/palettes, /#/mix, /#/blob, /#/does-not-exist}` and
0 on `browse/generate/atmosphere/admin/*`; mobile = 0 everywhere (C-2: the layer never mounts on
mobile). 5 routes × 2 schemes = **10 of the 26 nameless-button instances in the audit are this one
element**; the remaining 16 are extract (12) and gradient (4), which are route-owned.

The audit caught it while the sub-layer was `inert` — but it is nameless in the live state too, as
measured above. Not a measurement artifact.

**Cure.** `aria-label="Apply color"` / `"Submit name"` on the two branches — and, since this is the
third icon-only control in this SFC family to need one, a lint rule (or a `DockControl`-style
primitive that *requires* a name) is the durable form.

---

### C-7 — MAJOR (WCAG 2.2 SC 2.5.8) · the dock ships four sub-24px controls on every route

**Evidence (measured live with the slug-edit layer ACTIVE and visible, desktop 1440):**

```
LIVE DOCK CONTROLS (slug-edit): [
 {"name":"enter slug or token...","size":[160,23],"sub24":true},
 {"name":"Switch to slug",   "size":[22,22],"sub24":true},
 {"name":"Generate new slug","size":[22,22],"sub24":true},
 {"name":"Cancel",           "size":[22,22],"sub24":true} ]
```

Cross-checked against the whole visual audit:

```
$ python3 …  # count captures containing all four dock slug-edit targets
60/60 captures carry all 4 dock slug-edit sub-24 targets
total sub-24 instances across 60 captures: 398 | dock share: 240 = 60.3 %
```

The dock is **60.3%** of MT-F004 by instance count and appears in 100% of captures. Sources:
`SlugEditLayer.vue:81-87` (the `w-40` input, 23px tall — its own placeholder is clipped mid-word,
see `chC-dock-slugedit.png`: *"enter slug or to"*) and `:91,104,112` (three `compact` DockControls
at 22×22).

**Cure.** These are the login controls — the highest-stakes controls in the chrome. `compact`
should not be the register for a form's submit/regenerate/cancel; either the producer's compact
size grows to a 24px minimum hit box (a glass-ui change, per edict 4) or these three stop using
`compact`. The input needs a real min-height and an ellipsis/short placeholder.

---

### C-8 — MAJOR · MT-F003: there is no `<h1>` in the application at all

```
$ grep -rn "<h1" demo/
$ echo "exit $?"
exit 0        # zero matches
```

Probe confirms `h1: 0` at desktop 1440 and mobile 390; REPORT.json shows `h1: 0` in **60/60**
captures. The document heading outline starts at `h2`/`h3` inside the panes
(`["H3:92.0%,88.8,20.0","H3:About the color spaces, Lab","H2:Basic Information",…]`).

The shell provides two landmarks (`<nav aria-label="Application navigation">`,
`<main aria-label="Color tool panes">` — `App.vue:24,47`) and no heading. The dock is the only
persistent surface that names the current view (the `<SelectValue>` label and the seal glyph), so
it is the natural host for the document's H1 (visually-hidden, keyed to
`viewManager.currentConfig.value.label`). CARRY-LEDGER §B W47 claims the gate
"*main/H1/active-subtree =1*" — the `main` half is green (`mainCountNotOne — 0`), the **H1 half is
RED on 15/15 routes and on live production**, and no test asserts it (see C-9).

---

### C-9 — MAJOR · test truth: the dock is exempt from the a11y gate, and has no unit tests

1. **The battery excludes the dock by scope.** `e2e/smoke/admin/fixtures/a11y-battery.ts:52-59`:

   > *"Run the battery inside a scope selector (default `main`, the pane region — the dock nav is
   > producer chrome, its target-size is an E-2 RELAY not a demo cure, so the gate scopes to the
   > demo-owned content region)."*

   Every call site uses that default or a menu scope:
   ```
   e2e/smoke/admin/a11y-authed-user.spec.ts:33:  runBattery(page, "populated-browse");
   e2e/smoke/admin/a11y-authed-user.spec.ts:63:  runBattery(page, "authed-profile-menu", '[role="menu"]');
   e2e/smoke/admin/a11y-authed-admin.spec.ts:42: runBattery(page, `admin-${view.heading}`);
   ```
   The exclusion's premise is false for the elements that actually fail: `ColorInput.vue` and
   `SlugEditLayer.vue` are **demo-owned SFCs** under `demo/shell/dock/`, not producer chrome. The
   persistent chrome on every route is the one surface the accessible-name and target-size legs
   never see.

2. **No unit tests.** `grep -rln "Dock" test/` → no matches. `Dock.vue`, `useDockAdminMode.ts`
   (C-3), `usePopupMutex.ts` — zero coverage. C-3 is a ten-line unit test.

3. **The exact green-keeping mutation.** Delete the `aria-label` from all three
   `SlugEditLayer.vue` controls and from `Dock.vue:143-144` (`Save edit` / `Cancel edit`):
   ```
   $ grep -rn "Switch to slug\|Generate new slug\|Save edit\|Cancel edit" e2e/ test/
   (no matches)
   ```
   Nothing names them; the battery cannot see them; `o15-dock-register.spec.ts` asserts only the
   seal's `border-style`, the Tools clip, the true-button box model and `[title]`-count 0. The
   suite stays green with five newly-silent controls in the chrome. Likewise, **no spec anywhere
   references `h1`** (`grep -rn 'locator("h1")\|getByRole("heading"' e2e/` → only `role=heading`
   name lookups, which match any level), so C-8 can never fail a gate.

**Cure.** Run the battery over the dock nav scope as a first-class surface (the demo owns these
SFCs); add the H1 assertion to the route walk; unit-test `useDockAdminMode` and `usePopupMutex`
(both are pure enough to test in `test/`).

---

### C-10 — MINOR (perf) · the invisible collapsed seal re-renders per reactive tick

**Evidence (1s drag of the L channel, dock EXPANDED so the seal is `inert` + `opacity:0` +
`visibility:hidden`):**

```
seal mounted while expanded: {"sealInDom":true,"dockExpanded":true,"waxHtmlLen":1012,
  "waxStyleAttr":"background-color: lab(92 88.8 20); border-radius: 79.5047% 35.0645% 22.1258% …"}
drag telemetry: {"seal":48,"other":0,"rafTicks":16}
dock filter census: {"watercolorNodes":4,"svgFilters":2,"feTurbulence":2,"navElements":149}
```

48 style mutations on a subtree the user cannot see, against 16 animation frames — **3× more DOM
writes than frames**, each rewriting an 8-stop `border-radius` blob geometry (style recalc on a
hidden node). `Dock.vue:34` injects `CSS_COLOR_KEY`, which `App.vue:271` provides as the raw
`cssColorOpaque`. The app already computes the rAF-coalesced `cssColorOpaqueFrame` for exactly
this reason (`App.vue:250-252`: *"one derive per frame for the atmosphere fan-out"*) and the dock
does not use it.

**Cure.** Feed the seal (and the mobile-edit dots) from the coalesced frame colour. The identity
read is a *paint*, not a data readout — a frame's latency is invisible and the per-tick recompute
is not.

---

### C-11 — MINOR · the view taxonomy is duplicated inside the dock

`demo/shell/dock/composables/useDockAdminMode.ts:26-27` hand-lists all 14 `ViewId`s in two arrays.
`demo/shell/viewSchema.ts:1-15` states its own reason for existing: *"extracted … to retire the
4-copy `ViewId` enumeration that grew across the demo"* — and `VIEW_MAP` carries no admin flag, so
the dock re-partitions it. A new view added to `VIEW_MAP` and to neither array silently disappears
from the dock's menu; the split is also the direct cause of C-3's two disagreeing definitions of
"admin view". **Cure:** put the partition on `PaneConfig` (`group: "user" | "admin"`), derive both
lists.

---

### C-12 — MINOR · a comment that contradicts its own rule

`DockStatusLamp.vue:64-74`:

> *"Below the desktop band the label folds away… The role + label stay in the accessibility tree
> (visually-hidden, not v-if'd)."*
> ```css
> .lamp-label { display: none; }
> @media (min-width: 1024px) { .lamp-label { display: inline; } }
> ```

`display: none` removes the subtree from the accessibility tree — the opposite of what the comment
asserts. Below 1024px the lamp is a `role="alert"` (`status-lamp.ts:52-55`) with no accessible
content: an alert that announces nothing. Dev-gated (`status-lamp.ts:48`), so the blast radius is
developers on narrow viewports. **Cure:** the repo's visually-hidden idiom (clip-rect), not
`display:none`.

---

### C-13 — MINOR · idiom and edict drift inside `Dock.vue`

| Line | Drift | Edict |
|---|---|---|
| `Dock.vue:60` | `const slugEditRef = ref<InstanceType<typeof SlugEditLayer>\|null>(null)` — the legacy string-ref binding, three lines below `useTemplateRef` at `:74` | 7 (idiomatic Vue 3.5) |
| `Dock.vue:89` | `dockRef.value?.expand?.()` — the second `?.` masks a producer API that provably exists (`GlassDock.vue.d.ts` exposes `expand`) | 2 (no masking fallbacks) |
| `Dock.vue:39-40` | `const actionBar = computed(() => actionBarProp ?? null)` and its twin: pass-through computeds over props that are already `T \| null \| undefined` | 3 (KISS) |
| `Dock.vue:31` | the whole `defineProps` generic on one 200-column line | 3 |
| `menus/ProfileSection.vue` vs `menus/MobileMenuDropdown.vue` | ~80% duplicated menu (slug pill, copy slug, switch account, logout, regenerate, @mbabb block, share, GitHub, dark-mode row), both permanently mounted and CSS display-toggled (`hidden lg:flex` / `lg:hidden`) — while `App.vue:62-70` (X6) established single-mount-by-`v-if` as the house rule for exactly this reason | 1, 3 |

Positive: all three type-only imports (`Dock.vue:22-24`) correctly use `import type`
(`verbatimModuleSyntax`, edict 8) — no violation found there.

---

### C-14 — INFO · the view-switch rAF is never cancelled

`Dock.vue:101-107` schedules `requestAnimationFrame(() => { dockSettle.value = true })` on every
view change with no handle kept, so it cannot be cancelled on unmount. It is a one-shot, not a
loop, so this is not a PRM-RAF epidemic site: the global guard at
`demo/styles/animations.css:184-193` reduces `vj-settle` to `0.01ms` (it does not remove it), so
`@animationend.self` (`Dock.vue:130`) still fires and the class still clears under reduced motion.
Recorded for completeness only.

---

## 2. Screenshots read

- `chC-dock-desktop-light.png` — desktop band: `Home ⌄ | Tools → | Login | @mbabb`. Renders as
  designed.
- `chC-dock-mobile-dark.png` — mobile band: view-select, `Picker|About`, `⋮`. **No Tools** — the
  visual confirmation of C-2.
- `chC-dock-slugedit.png` — the login layer: the placeholder is clipped to *"enter slug or to"*
  (the `w-40` fixed input of C-7), and the three 22×22 controls read as hairline furniture beside
  it.

---

## 3. What is SOUND (the negative proofs)

These were suspected under the challenge premise and are **not** defects — each was probed:

1. **The hidden dock layers are properly hidden.** Inactive crossfade faces carry
   `inert: true`, `aria-hidden: "true"`, `pointer-events: none`
   (`probe-inert.mjs` FACES dump). CDP `Accessibility.getFullAXTree` on `/#/` desktop exposes
   exactly four dock controls —
   `["combobox:Select view","button:Toggle action bar","button:Login","button:@mbabb"]` — and a
   26-step Tab walk never enters a hidden layer. The REPORT's dock rows for MT-F004/MT-F005 were
   *captured* in the hidden state, but (C-6, C-7) the same elements fail in the live state, so the
   findings stand on their own reproduction, not on the capture.
2. **`GlassDock` really does expose `expanded`.** `glass-ui@7.0.0`
   `dist/components/dock/GlassDock.vue.d.ts` exposes `{expanded, isPinned, isHeld, isTransitioning,
   expand, collapse, keepOpen, release}` — the watch at `Dock.vue:76` is live, not dead code.
3. **The hold mechanism itself works.** With the action-bar layer active, `[data-held]="true"` is
   stamped and the dock survives 10s pointer-off **and** an outside click (`chC-dock-p7/p8`). C-4
   is a missing driver in the predicate, not a broken hold.
4. **`usePopupMutex` is clean.** The swap path clears the pending timer before re-arming
   (`:36,43`), a close during the swap window clears `pending` (`:63-68`), and `onUnmounted`
   clears the timer (`:82`). No leak found.
   > **OVERTURNED BY PASS 2 — see §6 · C-19.** The *leak* analysis holds (no leak), but the
   > composable's stated single-open invariant does **not**: a live swap was measured with **both**
   > popups open for ~150ms, plus a ~130ms spurious close of the popup the user just opened. The
   > static read missed it because the defect is a race against reka-ui's own dismissal, not a
   > mistake in the state machine's own bookkeeping.
5. **No dock-originated errors.** 0 page errors in 60/60 captures; the single console error
   (`WebGL: context lost`, safari-desktop-light `/#/`) is the picker's blob, not the dock.
   `horizontalOverflow: 0` on 60/60 — the dock never bleeds, including at 390px.
6. **PRM is honoured** for the settle beat via the global guard (see C-14).
7. **`.dock-mobile-panes` uses the correct truth** — `[data-layout="desktop"] .dock-mobile-panes
   {display:none}` (`shell.css:123`) reads the app's compound stamp; measured `display:none` at
   1440, `block` at 390. This is the one dock decision that was migrated, which is what makes C-5
   an *incomplete* migration rather than an oversight.

---

## 4. Family grouping (what to fix once, not fourteen times)

- **Family A — "the breakpoint has two truths and one of them is a lie" (C-1, C-2, C-5).** One
  root: instance/registration and layout mode are computed per-consumer instead of provided once.
  Cure once at the shell: one `isDesktop` port + one pane-instance registry serving both slots.
- **Family B — "state that should be derived is a ref with mutating watchers" (C-3, C-4).**
  `isAdminMode` and the keep-open hold are both hand-latched. Both are pure functions of
  (currentView, auth) and (activeLayer, popups). Derive them.
- **Family C — "the chrome is outside every gate" (C-6, C-7, C-8, C-9).** The a11y battery's scope
  exclusion is the mechanism that let a nameless button, four sub-24px login controls and a
  missing H1 survive a full tranche. Widen the scope; the findings then fix themselves under
  pressure.
- **Family D — "hidden work is still work" (C-10, C-13's dual-mounted menus).** The dock keeps
  invisible subtrees live and reactive.

---

## 5. Unreproduced observation (labelled, not a finding)

In one run (`chC-dock-p6.mjs` section A2) the dock collapsed ~8s after an outside click **while
the action-bar layer was active**, which would imply the shared `keepOpen`/`release` ref count had
been zeroed by a foreign `release()` (glass-ui `dock.js:1027` releases on outside pointerdown).
Two dedicated attempts to reproduce it (`chC-dock-p7`, `chC-dock-p8`) both showed
`[data-held]="true"` holding for 10s across an outside click, so **I could not reproduce it** and
it is recorded as a hypothesis only. If it is real, the mechanism would be that `Dock.vue:87` holds
ONE token for a three-driver disjunction on a counter shared with the producer's own hold users —
worth a targeted instrumented run in a follow-up seat.

---

## Appendix — probe scripts

`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
· `probe-dock.mjs` · `probe-tab.mjs` · `probe-inert.mjs` · `chC-dock-p3.mjs` · `chC-dock-p4.mjs`
· `chC-dock-p5.mjs` · `chC-dock-p6.mjs` · `chC-dock-p7.mjs` · `chC-dock-p8.mjs` · `chC-dock-p9.mjs`
· `chC-dock-shots.mjs` (outputs `chC-dock-desktop-light.png`, `chC-dock-mobile-dark.png`,
`chC-dock-slugedit.png`).
