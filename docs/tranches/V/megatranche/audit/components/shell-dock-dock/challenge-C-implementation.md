# CHALLENGE-C — `demo/shell/dock/Dock.vue` — implementation audit

> **TWO PASSES.** Pass 1 (§0–§5 + appendix) is the original CHALLENGE-C sweep: 14 findings, C-1…C-14.
> **Pass 2 (§6, appended below)** is an independent second CHALLENGE-C seat run against the same HEAD
> with its own probes: 8 further findings, **C-15…C-22**, including a **new BLOCKER (C-15)** pass 1
> did not reach, and one measurement that **OVERTURNS pass-1 negative proof §3.4**. Pass 1's text is
> preserved verbatim; nothing was deleted or renumbered. Read both. Combined tally:
> **22 findings · 2 BLOCKER · 10 MAJOR.**
>
> **PASS 3 (§7) — appended 2026-07-27.** A third independent CHALLENGE-C seat, own probes, same
> subject. **7 further findings, C-23…C-29**, one **MAJOR-with-BLOCKER-consequence (C-23)**: the
> dock's login error path is dead in three independent places, so a failed login shows the user
> nothing at all. Also an independent re-confirmation and *widening* of C-3 (it is **7 of 15 routes**,
> not one), a second vacuous-gate mutation distinct from C-9's, and a documentation-integrity note
> (**C-30**): **the §6 Pass-2 body promised by this banner is NOT present in the committed file** —
> §3.4's forward reference to "§6 · C-19" dangles, and the document as committed contains 14
> findings, not 22. Running tally of what is actually *in this file*: **21 findings**
> (C-1…C-14 + C-23…C-29), 1 BLOCKER, 10 MAJOR.

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

---
---

# §7 · PASS 3 — third independent CHALLENGE-C seat (2026-07-27)

## 7.0 Model receipt

I observe myself to be **Opus 5**, exact id **`claude-opus-5[1m]`** — the tier this seat was
spawned with, declared explicitly at spawn. Not inherited, not undeclared.

Seat: CHALLENGE-C (implementation), third pass. Subject `demo/shell/dock/Dock.vue` (359 lines) and
its owned subtree. Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. **HEAD moved under
me during the run** — `c654824e` (the brief) → `9bcd5d91` → `6085965e`, all docs-only commits by
other seats; `git status` confirms no file under audit changed. Probes: read-only Playwright
(Chromium) against the live dev server at `http://localhost:9000`, driven through
`browser_run_code_unsafe` with **fresh browser contexts per measurement** (this matters — see §7.9).
Write scope honoured: this file is the only thing this seat wrote; nothing under `src/`, `demo/`,
`api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any `INBOX.md` was touched.

**Pass-3 verdict: DEFECTIVE**, independently of passes 1–2. Seven new findings; the strongest
(C-23) is a complete, three-fold failure of an error path that pass 1 walked past while auditing the
same file for a different defect (C-4).

---

## 7.1 · C-23 — MAJOR (blocker-grade consequence) · the dock's login error path is dead in three independent places

**Files** · `demo/shell/dock/layers/SlugEditLayer.vue:13`, `:39-66`, `:97` ·
`demo/palettes/useSlugMigration.ts:30`, `:74-88` · `demo/palettes/browser/slug/PaletteSlugBar.vue:124`

Pass 1's C-4 proved the slug layer can be *destroyed* mid-login. This is the adjacent, worse defect:
when the login itself **fails**, the user is told nothing — by three separate mechanisms, any one of
which alone would suffice.

### (a) The dock's own error ref is written eight times and rendered zero times

```
$ grep -rn "slugError" demo/
demo/shell/dock/layers/SlugEditLayer.vue:13   const slugError = ref("");
demo/shell/dock/layers/SlugEditLayer.vue:18   slugError.value = "";
demo/shell/dock/layers/SlugEditLayer.vue:43   slugError.value = "";
demo/shell/dock/layers/SlugEditLayer.vue:49   slugError.value = "Already signed in.";
demo/shell/dock/layers/SlugEditLayer.vue:59   if (msg.includes("409")) slugError.value = "Already signed in.";
demo/shell/dock/layers/SlugEditLayer.vue:60   else if (msg.includes("404")) slugError.value = "Slug not found.";
demo/shell/dock/layers/SlugEditLayer.vue:61   else if (msg.includes("429")) slugError.value = "Too many attempts.";
demo/shell/dock/layers/SlugEditLayer.vue:62   else slugError.value = msg || "Login failed";
demo/palettes/browser/slug/PaletteSlugBar.vue:124,125,165,174,202,208,218,219,220,221,228
```
Eight writes in the dock's copy, **no read** — the `<template>` (`:75-119`) contains no `slugError`
binding. The sibling it was cloned from *does* render it (`PaletteSlugBar.vue:124`:
`<p v-if="slugError" class="… text-destructive">{{ slugError }}</p>`). The clone kept the writes and
dropped the display.

### (b) The local `try/catch/finally` is unreachable, and the spinner can never render

`SlugEditLayer.vue:54` — the dispatch is **not awaited**:

```ts
pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
```
`onSlugSwitch` is `async` (`useSlugMigration.ts:51`), so any failure inside it is a *rejected
promise*, never a synchronous throw — the `catch (e: any)` at `:57-62` cannot fire. That makes lines
57–62 (four authored error strings) unreachable code. Worse, the un-awaited call means the whole
handler runs to completion synchronously: `slugSwitching.value = true` (`:41`) and
`finally { slugSwitching.value = false }` (`:63-65`) both execute in one tick, so Vue never commits
the `true` state and `<Loader2 v-if="slugSwitching" class="animate-spin" />` (`:97`) is **unreachable
UI**. `slugSwitching` is nonetheless `defineExpose`d at `:72` for a consumer that does not exist.

### (c) The real handler reports into a ref that is never bound, on a component that is never rendered

`useSlugMigration.ts:84-87` is where the *typed* error handling actually lives:

```ts
if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
else if (status === 404) slugBarRef.value?.setError("Slug not found.");
else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
```

```
$ grep -rn "slugBarRef" demo/
demo/palettes/useSlugMigration.ts:30   const slugBarRef = ref<InstanceType<typeof PaletteSlugBar>|null>(null);
demo/palettes/useSlugMigration.ts:84,85,86,87   slugBarRef.value?.setError(...)
demo/palettes/useSlugMigration.ts:121  slugBarRef,
        ← declaration, four uses, one return. NO `ref="slugBarRef"` binding anywhere.

$ grep -rn "PaletteSlugBar" demo/ --include="*.vue"
        ← no matches. The component is re-exported by two barrels
          (browser/slug/index.ts:3, browser/index.ts:44) and RENDERED BY NOTHING.
```
`slugBarRef.value` is therefore permanently `null`; the optional chain swallows all four calls; and
`PaletteSlugBar.setError` (`:227-229`) — the only `setError` in the app, on the only component that
renders an error — is dead code.

The comment at `useSlugMigration.ts:78-82` records that this exact path was repaired once already
at S.W2 W2-6: *"the server titles … never contain '409'/'404'/'429', so those branches matched
nothing and the authored copy below never showed."* The repair fixed the **predicate** and left the
**sink** unattached. The copy still never shows.

### Reproduction

Desktop, `http://localhost:9000/#/` → `@mbabb` → *Switch account* → type `zzzz-zzzz-zzzz-zzzz`
(well-formed, non-existent) → Enter. The layer closes; no spinner; no message; no console output;
no visual state change of any kind. Identical for a bad admin token, a 429, and a dropped network.

### Cure (gestalt)

The dock owns the input, so the dock must own the outcome. Make `onSlugSwitch` **return** its
result — a `Promise<void>` that rejects, or a `Result<…, ApiProblem>` — instead of dispatching into
a ref it does not own; `await` it at `SlugEditLayer.vue:54`; render the message inside the layer
with `role="status"` / `aria-live="polite"` so it is announced as well as seen. `slugBarRef`,
`setError`, and `PaletteSlugBar`'s unreachable 40-line twin all delete themselves (C-24). One
owner, one sink, one announcement.

---

## 7.2 · C-24 — MINOR · the slug layer is a verbatim clone of a component nothing renders

`demo/shell/dock/layers/SlugEditLayer.vue:25-66` vs
`demo/palettes/browser/slug/PaletteSlugBar.vue:184-225`: `looksLikeSlug`, `normalizeTokenInput`
(including the `ADMIN_TOKEN=` assignment strip and the quote strip) and the whole submit body are
duplicated character-for-character apart from two error strings ("Already signed in." vs "Already
signed in as this slug.") and the dispatch (`pm.onSlugSwitch(...)` vs `emit("switchSlug", ...)`).
Both copies carry the same unreachable `catch`. One of the two components is rendered by nothing.

Two independent parsers of the same user credential — one of them dead — is a dual path under edict
2. **Cure:** delete `PaletteSlugBar.vue` and its two barrel re-exports; hoist
`looksLikeSlug`/`normalizeTokenInput` beside the port that consumes them
(`demo/palettes/useSlugMigration.ts`), where they can be unit-tested once.

---

## 7.3 · C-25 — MINOR · the keep-open watch has no `immediate`, so a mount-time edit takes no hold and later fires an unpaired `release()`

`Dock.vue:86-89`. Pass-1 C-4 found the predicate's **domain** incomplete (`slugEditMode` missing).
This is the orthogonal axis — its **edges**:

```ts
const shouldKeepOpen = computed(() => actionBarLayerActive.value || anyEditActive.value || isAnyOpen.value);
watch(shouldKeepOpen, (open) => { if (open) dockRef.value?.keepOpen(); else dockRef.value?.release(); });
watch(anyEditActive, (active) => { if (active) dockRef.value?.expand?.(); });
```
`anyEditActive` is `!!editTarget`, a **prop** (`:31`, `:73`). If `Dock` mounts with `editTarget`
already non-null, `shouldKeepOpen` is `true` at mount and **neither watch is `{ immediate: true }`**,
so `keepOpen()` and `expand()` never run — the dock can auto-collapse mid-edit under
`:collapse-delay="5000"` (`:132`) — and the eventual falling edge calls `release()` against a hold
that was never taken. That last half is survivable only because the producer clamps
(`node_modules/@mkbabb/glass-ui/dist/dock.js`, the `release` body: `g.value = Math.max(0, g.value - 1)`),
i.e. the demo's correctness here rests on a defensive clamp in someone else's package.

The comment at `:78-85` argues the collapse to one predicate is "behaviour-equivalent (held ⇔ any
flag true)". It is equivalent only over edges observed **after** mount, and the code does not say so.

**Cure** · `{ immediate: true }` on both watches. Structurally: pass-1 C-4's derivation
(`activeLayer !== "main" || isAnyOpen`) with an `immediate` watch makes both the domain and the edge
problems impossible at once.

---

## 7.4 · C-26 — MINOR · two glass-ui composables forked into `demo/`, one of them threading a parameter it explicitly discards

Both dock-local composables are forks of primitives retired upstream:

```ts
// composables/usePopupMutex.ts:1-2
// `usePopupMutex` was retired upstream from glass-ui at the D-II tranche.
// Local fork — single-open mutex for dock popups with a brief swap delay.

// layers/ActionBarLayer.vue:54-61
// V-W44 (Glass 7): glass-ui removed the standalone `useLayerTransition` … This local successor
// preserves the exact two-refs contract the template needs … (Relay note for glass: a public
// content-swap composable would retire this local shim.)
```
`ActionBarLayer` at least files the BH/BI relay the standing edict requires; `usePopupMutex` files
nothing. Under edict 4 both belong in glass-ui.

Sharper, inside the fork — `ActionBarLayer.vue:67`:

```ts
void opts.containerEl; // signature parity with the retired producer composable
```
A parameter kept, typed, threaded from a `useTemplateRef` at `:83`, passed at `:86`, and then
explicitly voided — **solely to match the shape of a function that no longer exists**. That is
textbook back-compat (edict 2). The shim should take `{ activeLayer }`; `subLayerGridEl` and its
`ref="subLayerGridEl"` binding at `:101` then go too.

---

## 7.5 · C-27 — MINOR · seven uncancelled async handles in the dock subtree, next door to the correct idiom

Pass-1 C-14 recorded `Dock.vue:105`'s rAF. It is one of seven, and the file that does it right is
one directory up in the same area:

```
$ grep -rn "requestAnimationFrame|setTimeout" demo/shell/dock/ demo/shell/*.vue demo/shell/*.ts
demo/shell/dock/Dock.vue:105                 requestAnimationFrame(() => { dockSettle.value = true; });
demo/shell/dock/ActionBarToggle.vue:60-61    requestAnimationFrame(() => requestAnimationFrame(() => {...}));
demo/shell/dock/ColorInput.vue:262           requestAnimationFrame(() => inputColorRef.value?.focus());
demo/shell/dock/ColorInput.vue:256           setTimeout(() => { modeTransition.value = false; }, 300);
demo/shell/dock/ActionButton.vue:95          setTimeout(() => { isClicked.value = false; }, 400);
demo/shell/dock/layers/ActionBarLayer.vue:76 timer = setTimeout(...)   ← cleared on RE-ENTRY only
demo/shell/dock/composables/usePopupMutex.ts:49 swapTimer = setTimeout(...)  ← the one done right
demo/shell/PaneSlot.vue:95                   raf = requestAnimationFrame(() => commit(key));

$ grep -rn "cancelAnimationFrame|clearTimeout|onBeforeUnmount|onUnmounted" (same paths)
demo/shell/dock/layers/ActionBarLayer.vue:75  if (timer) clearTimeout(timer);   (re-entry, not unmount)
demo/shell/dock/composables/usePopupMutex.ts:35,82  clearTimeout + onUnmounted(clearSwapTimer)
demo/shell/PaneSlot.vue:89,108   cancelAnimationFrame(raf) + onBeforeUnmount(() => cancelAnimationFrame(raf))
```
`PaneSlot.vue` — same area, same programme — stores the handle and cancels it on unmount.
`usePopupMutex.ts` does the timer equivalent. Every one of the five SFC sites drops its handle.
Individually inert in Vue (a post-unmount ref write is a no-op); collectively this is the PRM-RAF
shape the constellation has already paid for ~40 times, and `Dock.vue:105` fires on **every view
change** for the life of the app.

**Cure** · one `useOneShotClass(trigger, className)` in `dock/composables/` owning
`requestAnimationFrame` / `cancelAnimationFrame` / `onScopeDispose` once — `Dock.vue`,
`ActionBarToggle.vue` and `ColorInput.vue` are the same beat three times. Five leak sites become one
audited one, and it is a *focused* module, not an addition to a god module.

---

## 7.6 · C-28 — INFO · `ActionBarToggle`'s re-arm is dead code; the invariant the O-15b oracle asserts holds only via an unacknowledged side channel

`ActionBarToggle.vue:52-68`:

```ts
watch(() => visible, (has) => {
    if (!has) { settled.value = false; return; }
    if (slotLive.value) return;                  // ← after the first true, the body never runs again
    requestAnimationFrame(() => requestAnimationFrame(() => { slotLive.value = true; settled.value = true; }));
}, { immediate: true });
```
On a later `false → true` edge, `slotLive` is already `true`, so the early return fires and
`settled` — cleared on the false edge at `:56` — is **never restored by this watch**. The only thing
that restores it is `@transitionend.self="onSlotSettled"` (`:69-72`, `:78`), which sets
`settled.value = visible` when `grid-template-columns` finishes. That is the exact class
`e2e/smoke/oracles/o15-dock-register.spec.ts:74-79` asserts (`is-settled`, then
`.action-bar-toggle-inner` computes `overflow: visible` — the hover capsule and lift shadow render
whole).

**Measured — it recovers today** (fresh context, 1440×900, in-app hash nav):

```
boot           action-bar-toggle-slot is-visible is-live is-settled   inner overflow: visible
#/browse       action-bar-toggle-slot is-live                          inner overflow: hidden
#/             action-bar-toggle-slot is-visible is-live is-settled    inner overflow: visible
#/admin/users  action-bar-toggle-slot is-live                          inner overflow: hidden
#/             action-bar-toggle-slot is-visible is-live is-settled    inner overflow: visible
```
Filed INFO, not MAJOR, because it is currently benign. The defect is that the state machine's
*stated* owner (the watch) is not its *actual* owner (a transition event), so the invariant holds by
luck: any change that makes the `grid-template-columns` transition a no-op — equal endpoints,
`transition: none`, a `content-visibility` skip — silently pins the clip on and O-15b starts failing
a long way from `ActionBarToggle.vue:57`. **Cure:** drop the `slotLive` early return (it guards
nothing the `is-live` class needs) so the watch owns `settled` on both edges, and keep
`onSlotSettled` as confirmation rather than as the sole restorer.

---

## 7.7 · C-29 — INFO (test truth) · a SECOND vacuous mutation, and the reason C-3 shipped

Pass-1 C-9 named one green-keeping mutation (strip the `aria-label`s). Here is an independent one on
a different control, plus the structural reason the biggest finding in this file was never caught.

**The mutation.** Delete `<SelectValue v-if="isDesktop" />` — `DockViewSelect.vue:87` — so the dock's
primary navigation control never shows a view name on any route, ever. **The whole e2e suite stays
green.** Every locator that touches this control resolves it by the *explicit* `aria-label` on
`DockTrigger` (`:68`), never by its rendered text:

```
$ grep -rn "Select view" e2e/
e2e/smoke/page-load.spec.ts:33                 getByRole("combobox", { name: "Select view" })
e2e/smoke/a11y-modality-support.spec.ts:128    getByRole("combobox", { name: "Select view" })
e2e/smoke/a11y-web-modality.spec.ts:76         getByRole("combobox", { name: "Select view" })
e2e/smoke/oracles/o14-preview-truth.spec.ts:200,240,286   getByRole("combobox", { name: "Select view" })
e2e/smoke/mobile/page-load-mobile.spec.ts:52   getByRole("combobox", { name: /Select view/i })
e2e/smoke/fixtures/dock.ts:66                  getByRole("combobox", { name: "Select view" })
```
Nothing anywhere asserts what the app's navigation *says*. That is why C-3's blank trigger shipped.

**Why the red branch is structurally unreachable from e2e.** Every view switch in the suite goes
through `openView(page, name)` (`e2e/smoke/fixtures/dock.ts:56-80`), which clicks *an option in the
list* — so it can only ever reach views that are in the list, i.e. never the failing ones. The suite
*does* cold-load the admin routes (`e2e/smoke/admin/admin-walk.spec.ts:27-47`,
`e2e/smoke/admin/a11y-authed-admin.spec.ts:28-30`) — but **authenticated**, which is precisely the
branch where `viewEntries` returns `adminViews`, the model value matches an option, and the label
renders. The one unauthenticated cold load of an affected route,
`e2e/smoke/oracles/o18-contrast-census.spec.ts:929` (`/#/atmosphere`), only measures contrast — a
blank label *removes* text from its census and makes it pass more easily.

**Zero coverage of the C-23/C-24 surface:**
```
$ grep -rn "Switch to slug\|Generate new slug\|enter slug or token" e2e/ test/
(no matches)
$ grep -rln "useDockAdminMode\|usePopupMutex\|shell/dock" test/ demo/test/
test/status-lamp.test.ts        ← exercises the pure data table in status-lamp.ts
test/picker-blob-config.test.ts
```
Nothing constructs `Dock.vue`, `useDockAdminMode`, or `usePopupMutex`.

**Cure** · one route-parametrised assertion: for each `ViewId`, cold-load it **unauthenticated** and
assert (i) the view-select trigger's accessible text equals `VIEW_MAP[id].label`, (ii) the open
listbox reports that view `aria-selected`, (iii) `document.querySelectorAll('h1').length === 1`.
Fifteen rows, one loop; it kills the C-3 and C-8 families rather than their instances.

---

## 7.8 · Independent re-confirmation, and widening, of C-3

Pass 1 measured the blank trigger on `/#/blob`. It is **7 of the 15 audited routes**. Cold load into
a **fresh browser context per row**, 1440×900, unauthenticated, 1.8 s settle:

```js
const t = document.querySelector('nav.dock-band [aria-label="Select view"]');
({ triggerText: t.textContent.trim(),
   gold: document.querySelectorAll('nav.dock-band .gold-shimmer-icon').length })
```

| route | trigger label | admin gold ink |
|---|---|---|
| `#/` | `"Home"` | 0 |
| `#/gradient` | `"Gradient"` | 0 |
| `#/browse` | `"Browse"` | 0 |
| **`#/blob`** | **`""`** | 1 |
| **`#/atmosphere`** | **`""`** | 1 |
| **`#/admin/users`** | **`""`** | 1 |
| **`#/admin/tags`** | **`""`** | 1 |

`#/admin/names`, `#/admin/audit`, `#/admin/flagged` are the same code path as `#/admin/users` and
`#/admin/tags` — **7 of 15 routes**, 47 % of the application, ship a nameless primary navigation
control to every unauthenticated visitor. Isolated-context control run
(`#/browse`, `#/blob`, `#/browse`, one fresh context each) returns
`["Browse", gold 0] · ["", goldTrigger 1] · ["Browse", gold 0]` — deterministic, and *not* a leak
from a prior navigation.

Element screenshots of `nav.dock-band` (scratchpad `dock-blob.png` / `dock-gradient.png`, read with
vision, not committed):

- `#/blob` — `[ 💧 ⌄ ] │ 🖌 Tools → │ Login │ @mbabb` — an orphan droplet glyph and a chevron, no name.
- `#/gradient` — `[ 🌈 Gradient ⌄ ] │ 🖌 Tools → │ Login │ @mbabb`.

Opening the select on `#/blob` offers
`["Home","Palettes","Browse","Extract","Mix","Generate","Gradient"]` — the current view is absent, so
no option carries `aria-selected` and a screen-reader user is told nothing is current.

One addition to pass 1's mechanism: the deeper invariant being broken is that
**`viewEntries` is not a superset of the reachable view set**. `viewEntries`
(`useDockAdminMode.ts:34-39`) returns `adminViews` *only* when `isAdminMode && isAdminAuthenticated`;
`userViews` (`:26`) omits `atmosphere`, `blob`, and all five `admin-*`. Those seven routes are
reachable by anyone — the megatranche visual audit rendered all seven cleanly (`REPORT.json`:
`blankOrNearBlank: []`, `pageErrors: []`). A `<Select>` whose `model-value` can leave its own option
set is the bug; the gold latch and the `startsWith("admin-")`/`adminViews.includes` disagreement are
its symptoms. Pass-1 C-11's cure (put the partition on `PaneConfig`) is the right one **provided the
derivation also unions in the current view unconditionally**, so no future route can fall out again.

---

## 7.9 · Cleared hypotheses — recorded so a fourth seat does not re-spend the probes

1. **Boot-time route hijack away from `#/blob`. NOT A DEFECT — do not re-file.** Observed three
   times in a row (`#/blob` → `#/generate` / `#/palettes` / `#/gradient` within ~1.5 s of load) and
   it looked exactly like C-3's unmatched model value forcing a `switchView`. A
   `history.pushState`/`replaceState` wrapper installed at `waitUntil:"commit"` pinned the
   transition to vue-router's **`popStateHandler`** — a *back-navigation into my own accumulated MCP
   session history*, not application code. In fresh contexts `#/blob` is stable 6/6 over 4–9 s.
   **Method note for the next seat: any dock/router probe that reuses one MCP page across
   navigations manufactures this false positive.** Use `browser.newContext()` per measurement.
2. **`usePopupMutex` swap dropping both popups.** The 180 ms swap window nulls `current` before
   opening the new key; a controlled child that echoes `update:open(false)` during that window would
   cancel the pending open. **Not reproduced at my granularity:** opening the view-select then
   clicking `@mbabb` yields `{listboxes: 0, menus: 1}` immediately after the click and still
   `{menus: 1}` after a further 600 ms — the swap completes. This neither confirms nor refutes the
   finer race the banner attributes to pass-2 C-19 (a ~150 ms double-open would sit inside my
   sampling interval); I sampled at ~700 ms, pass 2 evidently did not. Recorded as *not observed at
   coarse granularity*, not as a negative proof.
3. **Inactive dock layers as focus traps.** Independently re-confirmed sound. Live ancestor walk
   from the slug input on `/#/`:

   | node | opacity | visibility | pointer-events | inert | aria-hidden |
   |---|---|---|---|---|---|
   | `input` | 1 | hidden | none | – | – |
   | `form` | 1 | hidden | none | – | – |
   | `div.dock-face-content` | 1 | hidden | none | – | – |
   | `div.dock-face` | **0** | hidden | none | **yes** | **true** |
   | `div.dock-layer` | 0 | hidden | none | **yes** | – |

   Matches pass-1 §3.1. It also explains, precisely, why the visual audit counts MT-F004's four
   targets on all 60 captures: `capture.mjs:83-85` defines visibility as `width>0 && height>0`
   only, so laid-out-but-hidden boxes are counted. The **sizes are real when the layer is open**, so
   C-7 stands on its own reproduction — the per-route multiplicity is a harness artifact.
4. **PRM handling of the settle beat.** Re-confirmed: `demo/styles/animations.css:184-192` forces
   `animation-duration: 0.01ms !important`, which neutralises `vj-settle` *and* still fires
   `animationend`, so `Dock.vue:130` still clears `dockSettle`. Pass-1 C-14's reading is correct.
5. **`release()` driving the producer's hold count negative.** Ruled out at the source:
   `glass-ui@7.0.0 dist/dock.js` clamps — `g.value = Math.max(0, g.value - 1)`. (This is what makes
   C-25's unpaired release survivable, not correct.)

**Also re-confirmed at HEAD, live:** `document.querySelectorAll('h1').length === 0` and
`document.querySelectorAll('main').length === 1` on `/#/` — pass-1 C-8 stands, and the `REPORT.md`
per-capture table has `h1 = 0` in **60 of 60** rows.

**One incidental observation, labelled:** `nav.dock-band` carries **29,169 characters of innerHTML**
on `/#/blob` — every layer's content (ActionToolbar, ColorInput, MobileMenuDropdown, ProfileSection,
SlugEditLayer) is mounted on every route regardless of active layer. This is the DOM-weight face of
pass-1's Family D; I did not trace it to a measured cost, so it is an observation, not a finding.

---

## 7.10 · C-30 — INFO (report integrity) · this document's banner describes a Pass 2 that is not in it

The banner at the top of this file claims *"Pass 2 (§6, appended below) … 8 further findings,
C-15…C-22, including a new BLOCKER (C-15)"*, and §3.4 carries a forward reference,
*"OVERTURNED BY PASS 2 — see §6 · C-19."*

```
$ grep -n "C-15\|C-16\|C-17\|C-18\|C-19\|C-20\|C-21\|C-22" challenge-C-implementation.md
5:  > with its own probes: 8 further findings, **C-15…C-22**, …
535:  > **OVERTURNED BY PASS 2 — see §6 · C-19.** …
$ grep -n "^## 6\|^# §6" challenge-C-implementation.md
(no matches)
```
There is no §6 in the committed file: §5 ends at the Appendix and the document terminated there
before this pass appended §7. **The eight pass-2 findings, including its BLOCKER and the evidence
that overturns §3.4, are not in the record.** Either the pass-2 body was lost before the write
landed or the banner was written ahead of it. Any downstream fold that trusts the banner's tally
("22 findings · 2 BLOCKER · 10 MAJOR") will be counting eight findings nobody can read.

Recorded here, not repaired: pass-3's write scope is this file, and inventing or renumbering another
seat's findings would be worse than the gap. The fold owner should either recover the pass-2 body or
correct the banner.

---

## 7.11 · Pass-3 summary

| id | severity | one line |
|---|---|---|
| C-23 | **MAJOR** (blocker-grade consequence) | The dock's login error path is dead three times over — unrendered `slugError`, an un-awaited dispatch that makes the `catch` and the spinner unreachable, and a `setError` sink on a ref that is never bound to a component that is never rendered |
| C-24 | MINOR | `SlugEditLayer` is a verbatim clone of `PaletteSlugBar`, which nothing renders — two parsers of one credential, one of them dead |
| C-25 | MINOR | The keep-open watch is not `immediate`: a mount-time `editTarget` takes no hold and later fires an unpaired `release()`, survivable only via glass-ui's `Math.max(0,…)` clamp |
| C-26 | MINOR | Two glass-ui composables forked into `demo/`; `ActionBarLayer.vue:67` threads a parameter it explicitly `void`s "for signature parity" with a function that no longer exists |
| C-27 | MINOR | Seven uncancelled rAF/timer handles across the dock subtree, against `PaneSlot.vue`'s correct idiom one directory up |
| C-28 | INFO | `ActionBarToggle`'s `slotLive` early return makes the watch's re-arm dead; O-15b's invariant is restored only by an unacknowledged `transitionend` side channel (measured: recovers today) |
| C-29 | INFO | A second vacuous mutation — delete `<SelectValue/>` and the whole suite stays green; and `openView()` makes C-3's red branch structurally unreachable from e2e |
| C-30 | INFO | The banner's Pass 2 (§6, C-15…C-22) is absent from the committed file; §3.4's forward reference dangles |

**Family placement.** C-23/C-24 open a family pass 1 did not have: **"the error path is authored but
not wired"** — four sites write user-facing copy that no surface reads, across two components and one
composable, with a prior repair that fixed the predicate and left the sink dangling. C-25 joins
pass-1 Family B (state that should be derived is a ref with mutating watchers). C-26/C-27 join
Family D. C-29 joins Family C and supplies its sharpest instrument: **the reason the chrome escapes
the gate is not only battery scope — it is that no locator in the suite ever reads what the
navigation says.**

