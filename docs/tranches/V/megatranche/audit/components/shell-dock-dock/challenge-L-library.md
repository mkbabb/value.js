# CHALLENGE-L — library structure · `demo/shell/dock/Dock.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` — the tier explicitly
declared at spawn. The seat is declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/shell/dock/Dock.vue` (359 lines) and the module lattice under it.

**Verdict: DEFECTIVE.** One BLOCKER, eight MAJOR, six MINOR/INFO. The blocker is not a
rendering bug — it is the library structure itself producing a dock whose buttons do nothing
on mobile, and it is invisible to every existing gate because the dispatch path is masked by
optional-call syntax.

---

## Method + probe budget

- Static: full import trace of `demo/shell/dock/**` (17 files); a generated area-level import
  graph over the whole `demo/` tree (script in scratchpad, output pasted below).
- Live: **5 Playwright evaluates + 3 navigations + 3 resizes** against the running dev server
  at `http://localhost:9000`. Every browser probe below decides a finding; none is decorative.
- Images: `safari-desktop-light/picker.png`, `safari-mobile-light/picker.png` read directly.
- Producer surface read from the installed package: `node_modules/@mkbabb/glass-ui@7.0.0`.

---

## The import ledger for this component

`Dock.vue` lines 2–24, every edge traced to its home:

| # | Line | Specifier | Home | Verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | framework | ok |
| 2 | 3 | `@lucide/vue` | icon dep | ok |
| 3 | 4 | `./` → `demo/shell/dock/index.ts` | **local barrel that re-exports `Dock.vue`** | **CYCLE — L-11** |
| 4 | 5 | `@mkbabb/glass-ui/dock` | producer subpath | ok — but see L-11 (same package, 2 specifiers, adjacent lines) |
| 5 | 6 | `@mkbabb/glass-ui/watercolor-dot` | producer subpath | ok |
| 6–14 | 7–15 | relative SFCs | own subtree / `../PaneSegmentedControl.vue` | ok |
| 15 | 16 | `@vueuse/core` `useMediaQuery` | **the only such import left in `demo/`** | **L-2** |
| 16 | 17 | `../useViewManager` | `demo/shell` | ok |
| 17 | 18 | `../../palettes/usePalettePorts` | **`demo/palettes` — a feature** | **L-6 · shell → feature** |
| 18 | 19,22 | `../../color-session/keys` | `demo/color-session` | ok for `CSS_COLOR_KEY`; **L-3** for `ActionBarContext` |
| 19 | 23 | `../../color-session/color-model` | `demo/color-session` | ok (`import type`) |
| 20 | 24 | `../usePaneRouter` | `demo/shell` | **L-3** — the dock's own contract lives in the router |

**Negative proof on the published surface.** `Dock.vue` imports `@mkbabb/value.js` not at all
(correct — it is chrome, not a color surface), and no file in `demo/` reaches into `src/`:

```
$ grep -rn '@src/\|from "\.\./\.\./\.\./src\|value\.js/dist' demo | head
(no output)

$ grep -rho '@mkbabb/value\.js[a-z/]*' demo | sort | uniq -c
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
```

Every one of the 50 library imports in the demo is a **published subpath** from
`package.json#exports`. A real consumer could write every one of them. The T.W1 dogfood
keystone holds. This axis is SOUND and I record it as such.

---

## Area-level dependency graph (generated, whole `demo/`)

```
  14 shell -> color-session
   5 shell -> palettes            <-- all five are dock files
   1 shell -> picker
   3 shell -> platform
  10 shell -> ui                  <-- all ten resolve to a 1-line re-export shim

--- mutual pairs (cycles) ---
CYCLE color-picker <-> picker    color-picker->picker:2   picker->color-picker:1
CYCLE color-picker <-> scenes    color-picker->scenes:1   scenes->color-picker:1
CYCLE palettes <-> shell         palettes->shell:1 (type-only)   shell->palettes:5
CYCLE picker <-> shell           picker->shell:1   shell->picker:1
```

The `palettes <-> shell` cycle is **entirely the dock's doing**: the 5 outbound runtime edges
are `Dock.vue:18`, `DockViewSelect.vue:8`, `SlugEditLayer.vue:5`, `ProfileSection.vue:14`,
`MobileMenuDropdown.vue:13` — all importing `SESSION_PORT_KEY`.

---

## Findings

### L-1 · BLOCKER — the dock's commands dispatch through desktop-only instance refs; **every dock action is a silent no-op in the mobile grammar**

**Mechanism.** The dock does not own a command surface. It emits, App.vue catches, and App.vue
calls a method on a *component instance ref* captured from a pane slot. Those refs are captured
by exactly two callbacks — `onDesktopLeftMount` / `onDesktopRightMount` (`App.vue:322–331`).
The mobile `<PaneSlot>` (`App.vue:87–96`) passes **no `:on-mount`**. Every handler then swallows
the null with optional-call syntax, so nothing throws and nothing logs.

```
demo/shell/usePaneRouter.ts:196   handler: () => paneRefs.gradient.value?.reset?.()
demo/shell/usePaneRouter.ts:197   handler: () => paneRefs.gradient.value?.copyCSS?.()
demo/shell/usePaneRouter.ts:198   handler: () => paneRefs.gradient.value?.seedFromPalette?.()
demo/color-picker/App.vue:41      @commit-edit="colorPickerRef?.commitEdit(); ..."
demo/shell/usePaneRouter.ts:156   "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(),
```

**Reproduction (measured, both halves).** Dev server, `/#/gradient`, reading the live App
instance's `setupState`:

| viewport | `.app-layout[data-layout]` | `gradientPaneRef` | dock renders Reset / Copy CSS / Seed? |
|---|---|---|---|
| 390 × 844 | `mobile` | **`null`** | **yes — all three visible** |
| 1440 × 900 | `desktop` | `ComponentInstance(GradientPane)` | yes |

Mobile probe output (abridged, `aria-label` of every visible dock button):

```
Save edit · Cancel edit · Switch to slug · Generate new slug · Cancel · Back ·
Reset · Copy CSS · Seed from palette · Select view · Toggle action bar · Menu
{ layout: "mobile", colorPickerRef: "null", generatePaneRef: "null",
  gradientPaneRef: "null", mixPaneRef: "null" }
```

So on mobile: `/#/gradient`, `/#/generate`, `/#/mix` each render a three-button Tools bar in
which **every button is `null?.method?.()`**. And the `mobile-edit` dock layer — which by
construction exists *only* on mobile (`Dock.vue:72` `mobileEditActive = !isDesktop && !!editTarget`;
`Dock.vue:143–144` Save/Cancel) — routes to `colorPickerRef?.commitEdit()`, and `colorPickerRef`
is null in exactly that grammar. The dock's mobile-only Save button cannot commit; it only runs
the second statement, `viewManager.mobilePaneIndex.value = 1`.

The mobile screenshot corroborates the other half of the same mechanism: `/#/` on mobile shows
**no Tools control at all** (`shots/safari-mobile-light/picker.png` — home ▾, Picker/About,
⋮ only), because `:action-bar="colorPickerRef?.actionBarContext ?? null"` (`App.vue:37`) is
null there. The picker's reset/copy/random/color-input/propose-name bar is unreachable on
phones. `REPORT.json` records this passively as `namelessButtons: 0` on every mobile route
except extract/gradient — the absence was measured and read as a *pass*.

**Cure (transposition, not patch).** The dock must not know about component instances. Invert:

- `demo/shell/dock/commands.ts` — `export interface DockCommand { id; icon; label; description; run(): void; disabled?: ComputedRef<boolean> }` and `DOCK_COMMANDS_KEY: InjectionKey<Ref<DockCommand[]>>`.
- Each pane **registers** its commands in its own `setup` via `useDockCommands([...])` (a
  `provide`d registry that add/removes on mount/unmount). A pane registers itself; nobody
  reaches into it. Mount grammar becomes irrelevant by construction.
- `usePaneRouter` loses `PaneActionRefs`, the three `ref<any>`, both mount callbacks and the
  three hardcoded action tables (`usePaneRouter.ts:104–108, 186–222` — 40 lines die).
- `Dock.vue` injects one `Ref<DockCommand[]>`. `App.vue` loses `colorPickerRef`,
  `generatePaneRef`, `gradientPaneRef`, `mixPaneRef`, `onDesktopLeftMount`, `onDesktopRightMount`.
- Every `?.()` in the chain dies with it: a missing command is an *empty registry*, which
  renders nothing, instead of a rendered button that lies.

---

### L-2 · MAJOR — three definitions of "desktop" in the shell; the dock owns a private one that contradicts the documented aspect law

`Dock.vue:16,71` is **the last `@vueuse/core` `useMediaQuery` in the demo**:

```
$ grep -rn "useMediaQuery" demo | grep -v "^demo/ui/"
demo/workbenches/.../EasingSpecimenStrip.vue:47   (prefers-reduced-motion — unrelated)
demo/shell/dock/Dock.vue:16 / :71                 useMediaQuery("(min-width: 1024px)")
```

Six other files use the design system's primitive `useBreakpoint` from `@mkbabb/glass-ui/dom`
(`App.vue:310`, `ConsoleRail.vue:118`, `HeroBlob.vue:71`, `ExtractWorkbench.vue:226`,
`useMixingAnimation.ts:70`, `useInertiaGesture.ts:37`, `useHoverPopover.ts:11`). The dock is the
sole holdout — edict 4 (glass-ui is the design system) and edict 2 (no dual paths).

Worse, the queries are **not equal**. `App.vue:310` uses the compound aspect law
`(min-width: 1024px) and (min-aspect-ratio: 1.1)`; `demo/DESIGN.md:361` states the invariant
explicitly: *"App.vue's `isDesktop` breakpoint shares the same compound query so JS mount and
CSS grid can never disagree."* The dock's query has no aspect clause, and `ProfileSection`/
`MobileMenuDropdown` use a **third** mechanism, Tailwind `lg:` (width-only CSS).

**Reproduction.** Viewport 1024 × 1366 (portrait tablet, aspect 0.750), `/#/`:

```
{ viewport: [1024, 1366, "0.750"],
  appDataLayout: "mobile",
  mq_width_only: true,          mq_compound: false,
  dockClasses: "glass-dock horizontal shape-pill layout-linear dock-scroll-x collapsed fit-content dock-inline",
  profileVisible: true,  profileText: "Login",
  mobileMenuVisible: false,
  toolsLabelPresent: true,
  paneSlotsMobile: 1 }
```

The shell is in the **mobile** grammar; the dock is in the **desktop** grammar — collapsing
(not `always-expanded`), desktop ProfileSection shown, mobile ⋮ menu hidden, "Tools" wordmark
present. And `mobileEditActive` is false here, so the mobile-edit layer — the only commit
affordance in a single-pane layout — never activates. DESIGN.md's stated law is violated by
the dock's private query.

**Cure.** One `demo/shell/useViewport.ts` exporting `{ isDesktop }` from glass-ui
`useBreakpoint(DESKTOP_QUERY)`, `provide`d at the composition root, injected by the dock; the
`lg:` utilities in `ProfileSection`/`MobileMenuDropdown` become `v-if="isDesktop"` off the same
cell (which also fixes L-9's always-mounted duplication). One query string, one truth, no props.

---

### L-3 · MAJOR — the dock's action bar has two contracts, two foreign owners, and two renderers

One concept — "what the dock's action bar shows" — has two incompatible shapes, neither of
which lives in the dock:

| contract | home | consumed at | shape |
|---|---|---|---|
| `ActionBarContext` | `demo/color-session/keys.ts:18–28` | `Dock.vue:22`, `ActionBarLayer.vue:5` | 6 refs + 3 imperative methods, picker-specific |
| `DockActionBar` / `DockAction` | `demo/shell/usePaneRouter.ts:37–58` | `Dock.vue:24`, `GenericActionBar.vue:4` | `{label, icon, accentColor, actions: Ref<DockAction[]>}` |

`Dock.vue:31` takes **both** as props and `Dock.vue:156–157` disambiguates at runtime with
`v-if="actionBar"` / `v-else-if="genericBar"`. Two renderers sit under that fork over the same
primitive: `ActionToolbar.vue` (5 hand-written `<ActionButton>` with literal titles/descriptions)
and `GenericActionBar.vue` (a `v-for` over `DockAction[]`). Their roots are byte-identical —
both `<div class="flex items-center justify-around flex-1">`, both holding a local
`activeHover = ref<string|null>(null)`. Every field `ActionToolbar` hardcodes
(`icon`, `title`, `description`, `rotateOnClick`, `iconClass`, `disabled`) is already a field
of `DockAction`.

Residue proving the fork is unmaintained: `ActionToolbar.vue:72` declares a `canProposeName`
prop, `ActionBarLayer.vue:106` passes it, and it is **never read** in `ActionToolbar.vue`.
`defineExpose({ clearHover })` (`ActionToolbar.vue:91`) is reachable only through
`actionToolbarRef` — which is itself dead (L-12).

**Cure.** `DockAction[]` is the one contract; it moves to `demo/shell/dock/commands.ts` (L-1's
registry). `ActionToolbar.vue` dissolves — the picker registers its five commands like every
other pane. `GenericActionBar.vue` is renamed `DockActionBar.vue` and becomes the *only*
renderer. `ActionBarContext` shrinks to what actually crosses the boundary (`colorModel` for
`ColorInput`) or dies entirely.

---

### L-4 · MAJOR — `demo/ui/` is a 19-directory alias layer over glass-ui, and it flattens the producer's subpath map

Every one of the 19 directories is a single-line re-export. Measured:

```
$ for d in demo/ui/*/; do wc -l < $d/index.ts; done   →  1 line each (alert: 11, all comment)

demo/ui/select/index.ts:
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup,
         SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
demo/ui/button/index.ts:      export { Button } from "@mkbabb/glass-ui";
demo/ui/popover/index.ts:     export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
demo/ui/dropdown-menu/index.ts: export { DropdownMenu, ... } from "@mkbabb/glass-ui";   (14 symbols)
```

This is the textbook shape edict 2 forbids: an alias layer whose only function is to keep
pre-migration import paths resolving. `demo/ui/alert/index.ts` documents its own history —
it *used* to hold a real shadcn implementation; the migration replaced the body with a
re-export and left the directory standing. 89 demo imports route through it
(48 palettes + 14 workbenches + 11 scenes + **10 shell/dock** + 5 picker + 1 + 1).

The second-order defect: glass-ui 7.0.0 publishes **73 granular subpaths** — `./button`,
`./select`, `./popover`, `./tooltip`, `./dropdown-menu`, `./separator`, `./card`… Every shim
except `input` imports the **root barrel** instead:

```
$ ls -la node_modules/@mkbabb/glass-ui/dist/{glass-ui,button}.js
25239  dist/glass-ui.js      <- the root barrel every demo/ui shim points at
   71  dist/button.js        <- the subpath a real consumer would write
$ head -c 71 node_modules/@mkbabb/glass-ui/dist/button.js
import { t as e } from "./button-Bu9F4uU6.js";
export { e as Button };
```

`demo/ui/input/index.ts` alone uses `@mkbabb/glass-ui/forms`. The dock therefore "consumes the
design system" through a path no external consumer would ever write — a false proof of the
producer's public surface, on the exact axis this repo cares about (it is what T.W1 fixed for
value.js and never fixed for glass-ui).

**Cure.** Delete `demo/ui/` outright. Rewrite the 89 imports to the matching glass-ui subpath
(`../../ui/select` → `@mkbabb/glass-ui/select`). Mechanical, one commit, and it deletes a
directory rather than adding one (edict 3 satisfied). `demo/shell/dock` loses all 10 of its
`ui` edges; `shell -> ui` goes 10 → 0.

---

### L-5 · MAJOR — `ActionBarLayer`'s local `useLayerTransition` reimplements a component glass 7 already publishes, and its hand-bound classes include one that matches nothing

`ActionBarLayer.vue:62–86` declares a local `useLayerTransition` inside `<script setup>`, with a
comment (`:54–61`) asserting: *"glass-ui removed the standalone `useLayerTransition` composable
— … offers no public composable successor."*

That claim is false at the level that matters. Glass 7.0.0's dock index exports the successor:

```
node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts:5
export { default as DockCrossfade } from "./DockCrossfade.vue";
```

and its own doc block names this exact case: *"The controlled-no-rail … case (a consumer)
consumes this DIRECTLY: a no-selection face-swap does NOT route through a selection engine."*
`DockCrossfade` ships the peak-size reserve (`reserve: "block" | "inline"`), the spring-driven
overlap, and **focus transfer from a dissolving face** — none of which the local shim has.

`CARRY-LEDGER.md:127` books the retirement as conditional on glass shipping *"a public
content-swap **composable**"* (ask M2). The successor shipped as a **component**, so the carry's
own wording is why a live cure has sat unclaimed since W44.

Three concrete consequences, all measured live:

1. **`.dock-layer-grid` matches zero CSS rules.** Scanning all 48 loaded stylesheets in the
   running app: `{ dockLayerGridRuleHits: 0, sheets: 48, unreadableSheets: 0 }`, and
   `getComputedStyle(el).display === "block"`, `position === "static"`. The class named "grid"
   creates no grid. `grep -rc dock-layer-grid node_modules/@mkbabb/glass-ui/dist` → zero hits;
   `grep -rn dock-layer-grid demo` → one hit, `ActionBarLayer.vue:101`, the usage itself.
2. **The layout works only by borrowing the producer's private classes.**
   `ActionBarLayer.vue:91` hand-writes `class: ["dock-layer", {"is-active":…, "is-leaving":…}]`,
   which lands on glass-ui's internal descendant rules
   (`components/dock/styles/layers.css`: `:where(.glass-dock,.dock-layer-group) .dock-layer:not(.is-active){position:absolute;inset:0}`).
   The demo is styling itself out of another package's stylesheet by class-name convention —
   a contract nothing enforces.
3. **The stack is geometrically wrong** because the parent is `static`, so the absolute child
   resolves against a further ancestor. Measured children of `.dock-layer-grid`:
   active `x=757 w=184`, inactive `x=692 w=447.47` — the hidden face's box is 2.4× the visible
   one and overhangs it by 198px. `DockCrossfade`'s peak reserve is precisely the cure.

And the shim carries a parameter that exists only to impersonate a deleted signature:

```
demo/shell/dock/layers/ActionBarLayer.vue:67
    void opts.containerEl; // signature parity with the retired producer composable
```

`subLayerGridEl` (`:83`) and its `ref="subLayerGridEl"` binding (`:101`) exist solely to feed a
discarded argument of a local function mimicking an upstream composable that no longer exists
anywhere. This is the purest instance of the "no legacy" edict violated in the subtree.

**Cure.** Replace lines 62–101 with `<DockCrossfade active="…" reserve="inline">` +
two `<DockLayer id="actions"/ id="input">`. The local `useLayerTransition`, the 260ms literal,
the timer, `subLayerProps`, `subLayerGridEl`, and the hand-bound producer classes all die
(~40 lines), and focus transfer + peak reserve arrive for free.

---

### L-6 · MAJOR — identity lives in the palettes feature; the shell's persistent chrome imports it on every route

`SESSION_PORT_KEY` is defined at `demo/palettes/usePalettePorts.ts:271` as
`InjectionKey<SessionPort> = Symbol("palette.session")`. Its payload (`:126–135`) is pure
identity — `isAdminAuthenticated, userSlug, userLogout, ensureUser, ensureSession,
onRegenerateSlug, onSlugSwitch` — assembled from `platform/auth/useAdminAuth`,
`platform/auth/useUserAuth`, `platform/auth/useSession` and `palettes/useSlugMigration`.

Consumers:

```
$ grep -rln "SESSION_PORT_KEY" demo
demo/shell/dock/Dock.vue
demo/shell/dock/DockViewSelect.vue
demo/shell/dock/layers/SlugEditLayer.vue
demo/shell/dock/menus/ProfileSection.vue
demo/shell/dock/menus/MobileMenuDropdown.vue
demo/palettes/usePalettePorts.ts            <- the definition
```

**Five of the six consumers are dock files.** The majority owner of the session port is the
shell; it is defined in a feature and keyed with that feature's namespace. This single fact
produces the `palettes <-> shell` cycle in the graph above, and it means the picker route, the
admin routes and the 404 route all instantiate palette machinery to render a Login button.

A second path to the same capability lives inside the same folder: `ColorInput.vue:133,228`
imports `useSession` from `platform/auth/useSession` directly and calls `session.ensureSession()`,
while `sessionPort.ensureSession` is the injected route the other five use. Benign at runtime
(`useSession` is a module singleton — `useSession.ts:44–46`), still two import paths to one
capability.

**Cure.** Move the port to its real home: `demo/platform/auth/session.ts` exporting
`SESSION_KEY: InjectionKey<Session>` (`Symbol("session")`), provided at the composition root.
`usePalettePorts` *consumes* it like everyone else and stops re-exporting it. `shell -> palettes`
goes 5 → 0 and the cycle dissolves. `useSlugMigration`'s two members (`onRegenerateSlug`,
`onSlugSwitch`) are login mechanics and move with it.

---

### L-7 · MAJOR — MT-F005 is a dock defect, but not the one the root attributed; and the dock's own stated a11y law is violated inside the dock

The root's note says the nameless button "sits behind a responsive branch". Located exactly:

```
$ (live, 1440×900, /#/)  nameless visible buttons → 1
path: nav.dock-band > … > div.dock-layer-grid.flex-1 > div.grid.grid-cols-1.gap-y-2
      > div.relative.w-full.flex > button.send-btn.btn-interactive
html: <button data-v-55dadc03 class="send-btn btn-interactive"><svg …
```

That is `demo/shell/dock/ColorInput.vue:67–82` — **both** `<button class="send-btn btn-interactive">`
branches (propose-mode and normal) carry no `aria-label`, no text, only an SVG. It contradicts
the law written two files away, in this component:

> `Dock.vue:140–142` — *"W6-8 register pass: native `title` retired dock-wide — icon-only
> controls carry aria-label (the UA tooltip slab is a foreign register on the liquid-glass dock)."*

The responsive-branch reading is wrong; the real gate is that `ActionBarLayer` renders only when
`colorPickerRef.actionBarContext` exists, i.e. desktop only — which is L-1, not a media query.

**Correction the root audit needs.** The harness counts elements that are correctly hidden from
AT. Measured on the same element and on the slug input:

```
sendBtn: { inert: true, ariaHidden: true, vis: "hidden", name: null, text: "" }
slugInput: { inert: true, ariaHidden: true, computedVis: "hidden", rect: 160×22.95 }
```

Glass 7 does the inert/aria-hidden packaging correctly for inactive faces. So the *counts* in
`REPORT.md` — `namelessButtons` and the 4-per-capture `smallTapTargets` rows — include inert
subtrees and are harness artifacts. The **defects are real but latent**: the moment the user
opens the color input, the nameless button is live; the moment they open slug edit, four
sub-24px targets are live. `capture.mjs:97–101` filters on `getBoundingClientRect()` only and
must also exclude `closest('[inert],[aria-hidden="true"]')`.

The latent tap-target set, present in **60 of 60 captures**, is entirely dock-owned
(`SlugEditLayer.vue:79–113`):

```
30× desktop  button 22×22  "Switch to slug" / "Generate new slug" / "Cancel"
30× mobile   button 23×23  (same three)
60× (both)   input  160×23 / 160×20   accessible name: "" (placeholder only)
```

All four fail WCAG 2.2 SC 2.5.8 (24×24 minimum); the input additionally fails SC 4.1.2 — it has
`placeholder="enter slug or token..."` and no label. The three buttons are `<DockControl compact>`;
`compact` is a producer variant, so the cure is a producer-side minimum, not a demo override
(edict 5).

---

### L-8 · MAJOR — the document heading has no owner module (MT-F003)

```
$ grep -rn "<h1" demo --include='*.vue' --include='*.ts' --include='*.md'
(no <h1> anywhere; Markdown.vue only *styles* h1 for rendered content)

live /#/ →  { h1: 0, mainCount: 1, navCount: 1, docTitle: "lab(92% 88.8 20 / 82.7%) — Color Picker" }
```

`REPORT.md` records `h1 = 0` on **60 of 60** captures, and the root notes it is 0 on live
production too. The structural reading: *document identity is half-owned.* The title half has a
declared canonical home — `demo/color-picker/router/useDocumentTitle.ts:12` calls itself
*"the canonical Vue home for `document.title`"* — and the heading half has **no home at all**,
which is why no wave noticed. `CARRY-LEDGER.md:22` states the W47 gate as
*"Eleven routes direct; main/H1/active-subtree =1"*; the `main` clause passes (measured 1 on
60/60), the H1 clause has never passed.

The desktop screenshot shows the failure is purely semantic: the page renders two display-scale
titles ("Lab", "About the color spaces, Lab") and neither is a heading element.

**Cure.** Extend the existing owner. `useDocumentTitle` becomes `useDocumentIdentity(route)`
returning `{ title, heading }` from one `viewSchema` field, and the shell renders
`<h1 class="sr-only">{{ heading }}</h1>` as the first child of `App.vue`'s `<main>`. One module
owns document identity; the schema stays the single source of view metadata; no scene has to
remember.

---

### L-9 · MAJOR — the two dock menus are a verbatim fork, and both mount at every viewport

`MobileMenuDropdown.vue` (115 L) and `ProfileSection.vue` (181 L) are one menu written twice.
Diffing the "@mbabb" blocks:

```
$ diff <(sed -n '78,111p' demo/shell/dock/menus/MobileMenuDropdown.vue) \
       <(sed -n '144,177p' demo/shell/dock/menus/ProfileSection.vue)
1d0
<                 <!-- @mbabb section -->
10a10
>                 <DropdownMenuSeparator />
```

**33 of 34 lines identical**, including a ~700-character inline GitHub `<svg><path d="M12 .5C5.65…">`
duplicated byte-for-byte, and the Dark-mode row duplicated down to its 6-line comment. The
account block (slug pill / Copy slug / Switch account / Logout / Regenerate slug) is likewise
forked. The fork exists only to swap the *trigger* (`DockTrigger ⋮` vs `Button "Profile"`), and
it is expressed as `lg:hidden` vs `hidden lg:flex` — so **both subtrees are always mounted**.
Measured at 390×844: the desktop `Login` and `@mbabb` buttons are in the DOM with `width 0`.

Also note glass-ui publishes `./dark-mode-toggle`; the demo hand-rolls the toggle row twice.
The comments at `ProfileSection.vue:170–172` / `MobileMenuDropdown.vue:104–106` correctly
explain why the producer component cannot nest inside a clickable row — which is an argument for
a `passive` variant *in glass-ui* (edict 4), not for two hand-rolled copies.

**Cure.** One `DockAccountMenu.vue` owning the content, with a `#trigger` slot; the responsive
choice is `v-if="isDesktop"` on the *trigger* off L-2's single cell. ~150 lines net deleted, one
subtree mounted.

---

### L-10 · MAJOR — the dock re-enumerates the view schema and invents an unowned partition

`useDockAdminMode.ts:26–27` hardcodes both halves of the route table:

```ts
const userViews:  ViewId[] = ["picker","palettes","browse","extract","mix","generate","gradient"];
const adminViews: ViewId[] = ["admin-users","admin-names","admin-audit","admin-flagged","admin-tags","atmosphere","blob"];
```

`demo/shell/viewSchema.ts:1–15` opens with the reason this must not exist: *"The single source of
truth for `ViewId`, the pane layout map (`VIEW_MAP`) … extracted from `useViewManager.ts` at
D.W3 Lane D **to retire the 4-copy `ViewId` enumeration that grew across the demo**."* This is
copies five and six. They currently sum to 14 = `|VIEW_MAP|` **by hand**: add a view to the
schema and it silently never appears in the dock's selector.

The partition itself is data the schema does not model. `PaneConfig` owns `left/right/label/
leftLabel/rightLabel/icon/accentHueShift/defaultPaneIndex` — no `group`. So the dock invents one,
and gets a semantic wrong in the process: `atmosphere` and `blob` are *tuning* panes, not admin
routes, yet they are gated behind admin mode; the visual audit captured `/#/atmosphere` and
`/#/blob` as ordinary public routes.

Type erasure follows: `ViewEntry` (`:7–12`) is `{id; label; icon: unknown; [k: string]: unknown}` —
`PaneConfig`'s typed `icon: Component` is thrown away and `DockViewSelect.vue:19` re-declares
`currentIcon: unknown`. And `onViewChange` accepts
`string | number | boolean | Record<string,string> | null` (reka's SelectValue type leaking into
a dock API) carrying a `"__admin_toggle__"` magic string through the *value* channel of a select
whose other values are `ViewId`s (`DockViewSelect.vue:123`, `useDockAdminMode.ts:65`).

**Cure.** Add `group: "user" | "admin"` to `PaneConfig`; `viewEntries` becomes
`Object.entries(VIEW_MAP).filter(([,c]) => c.group === active)`; `ViewEntry` dies in favour of
`PaneConfig & {id: ViewId}`. The admin toggle becomes its own `<SelectItem>`-adjacent control or
an explicit emit, never a sentinel value.

---

### L-11 · MINOR — circular barrel serving one consumer, plus two specifiers for one package in adjacent lines

```ts
// demo/shell/dock/index.ts
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";  // :2
export { default as Dock } from "./Dock.vue";                                  // :5

// demo/shell/dock/Dock.vue
import { GlassDock, DockLayerGroup, DockLayer } from "./";                     // :4  <- cycle
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";            // :5
```

`Dock.vue → index.ts → Dock.vue` is a module cycle, and lines 4–5 import the *same producer
subpath* through two different specifiers. The barrel's entire consumer set is one line:

```
$ grep -rn 'shell/dock"' demo
demo/color-picker/App.vue:167:import { Dock } from "../shell/dock";
```

**Cure.** Delete `index.ts`; `App.vue` imports `../shell/dock/Dock.vue`; `Dock.vue:4–5` merge
into one `@mkbabb/glass-ui/dock` import. A barrel that re-exports a third party's symbols under
your own path is an alias (edict 2) and this one costs a cycle to serve one import.

---

### L-12 · MINOR — dead refs and a dead prop threaded across a component boundary

```
ActionBarLayer.vue:28  const colorInputRef    = ref<InstanceType<typeof ColorInput>|null>(null);   // never read
ActionBarLayer.vue:29  const actionToolbarRef = ref<InstanceType<typeof ActionToolbar>|null>(null); // never read
ActionBarLayer.vue:106 :can-propose-name="actionBar.canProposeName.value"  →  ActionToolbar.vue:72 declared, never read
ActionToolbar.vue:91   defineExpose({ clearHover })  — reachable only via the dead actionToolbarRef
```

Both refs are bound in the template (`:103`, `:116`) so they cost a component-instance retain
each and read as live wiring. They are the residue of the pre-`useTemplateRef` idiom.

---

### L-13 · MINOR — mixed template-ref idioms and a masking optional call on a typed producer API

`Dock.vue` uses both idioms in one file: `useTemplateRef` at `:74` (Vue 3.5, correct per edict 7)
and the legacy `ref<InstanceType<typeof SlugEditLayer>>(null)` at `:60`. Two lines apart:

```ts
Dock.vue:87  watch(shouldKeepOpen, (open) => { if (open) dockRef.value?.keepOpen(); else dockRef.value?.release(); });
Dock.vue:89  watch(anyEditActive,  (active) => { if (active) dockRef.value?.expand?.(); });
```

`expand` is declared on GlassDock's exposed type
(`GlassDock.vue.d.ts:19  expand: () => void;`), exactly like `keepOpen`/`release`. The extra
`?.()` on line 89 is a masking fallback (edict 2): if the producer ever removes `expand`, the
dock silently stops expanding on edit instead of failing at typecheck.

---

### L-14 · MINOR — `DockStatusLamp` is band chrome living inside the dock component

`Dock.vue` is a fragment: `<div>…GlassDock…</div>` **and** `<DockStatusLamp />` (`:293`). The lamp
is `position:absolute; inset-inline-end:0` (`DockStatusLamp.vue:46–50`) and resolves against
`.dock-band { position: relative }` — a rule in `demo/styles/shell.css:39–45`, owned by the shell
layout, whose comment says so: *"position: relative seats the band-chrome instruments (the W6-6
status lamp)."*

So a component named `Dock` emits a second root that escapes the dock's box and positions against
an ancestor class owned by another module, with no contract expressing the requirement. Its true
parent is `App.vue`'s `<nav class="dock-band">`.

**Cure.** Move `<DockStatusLamp />` up one level, into `App.vue`'s `<nav class="dock-band">`
beside `<Dock>`. `Dock.vue` becomes single-root and the coupling becomes visible at the site
that owns the positioning context.

---

### L-15 · MINOR — credential parsing lives in a dock presentation SFC

`SlugEditLayer.vue:25–36`:

```ts
function looksLikeSlug(v: string) { return /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(v); }
function normalizeTokenInput(raw: string): string {
    let token = raw.trim();
    const assignmentMatch = token.match(/^ADMIN_TOKEN\s*=\s*(.+)$/i);   // env-assignment parsing
    if (assignmentMatch) token = assignmentMatch[1]!.trim();
    if ((token.startsWith('"') && token.endsWith('"')) || …) token = token.slice(1,-1).trim();
    return token;
}
```

Slug-shape validation and admin-token normalisation (including stripping an `ADMIN_TOKEN=…`
shell-export paste and its quotes) are identity-domain rules with a natural home — the same
`platform/auth` module L-6 proposes — sitting untested inside a dock layer's `<script setup>`,
alongside HTTP-status string-sniffing (`msg.includes("409")`, `:59–62`).

---

### L-16 · INFO — per-instance override with an acknowledged root cure (edict 5)

`DockViewSelect.vue:57–59` + `:69`:

```
<!-- Ad-18 marker: [&>span]:line-clamp-none cancels glass-ui's internal line-clamp-1 on the
     trigger label span. Root fix is a `clampLabel` prop on glass-ui DockSelectTrigger
     (filed coordination/Q.md §3). -->
class="view-select-trigger … [&>span]:line-clamp-none"
```

An arbitrary-variant override reaching into the producer's internal element, with the correct
root-level cure named and unfiled-through. This is the edict-5 shape, self-documented.

---

### L-17 · INFO — `usePopupMutex` is a declared local fork of a retired producer composable

`composables/usePopupMutex.ts:1–2`: *"`usePopupMutex` was retired upstream from glass-ui at the
D-II tranche. **Local fork** …"*. 82 lines with zero dock-specific logic — a generic
single-open-with-swap-delay mutex. Its singleton-ness is enforced by prose
(`Dock.vue:64` *"called EXACTLY ONCE (gate (a))"*, restated at `DockViewSelect.vue:26–28`)
rather than structurally. Glass 7 already carries the natural seat: `DockContext` (`dockContext.d.ts`)
provides `keepOpen`/`release`/`held` to descendants. An exclusive-open registry belongs there.

---

## Negative proofs (what I checked and found SOUND)

1. **No deep-internal imports.** Zero `@src/*`, zero `src/` relatives, zero `dist/` paths in
   `demo/`. All 50 `@mkbabb/value.js` imports use published subpaths (histogram above). The
   demo is an honest consumer of *this* library's public surface. The dock imports none — right,
   it is chrome.
2. **The three-parallel-`useDark` suspect is CURED.** All 8 live consumers use glass-ui
   `useGlobalDark` (`ProfileSection:8`, `MobileMenuDropdown:6`, `useMarkdownColors:1`,
   `ConsoleRail:92`, `HeroBlob:39`, `useContrastSafeColor:9`, `App.vue:190`, `useAtmosphere:34`).
   The only surviving mention of a vueuse `useDark` is a historical comment at
   `useMarkdownHighlighting.ts:76–79`. Not a finding.
3. **`verbatimModuleSyntax` holds in the dock.** Every type-only import in the subtree carries
   `import type` or an inline `type` modifier (`Dock.vue:22–24`, `ActionBarLayer.vue:2,5,9`,
   `ActionButton.vue:49`, `GenericActionBar.vue:4`, `status-lamp.ts:31`, `useDockAdminMode.ts:4–5`,
   `usePopupMutex.ts:4`).
4. **The producer's inert packaging is correct.** Inactive dock faces are `inert` +
   `aria-hidden` + `visibility:hidden` (measured). The a11y counts in the visual REPORT that
   land on this component are partly harness artifacts — corrected in L-7.
5. **`main` and `nav` landmarks are correct** — `main = 1`, `nav = 1` on 60/60 captures and live.
   Only the H1 half of the W47 gate is red.

---

## The greenfield lattice

Stated concretely, no hedging. Layers may depend only downward.

```
demo/platform/          transport · auth · storage
  auth/session.ts       SESSION_KEY + Session          ← L-6 lands here
demo/color-session/     the colour pipeline + keys (unchanged)

demo/shell/             the app frame — knows routes and chrome, NEVER a feature
  viewSchema.ts         VIEW_MAP  + group:"user"|"admin"        ← L-10 lands here
  useViewManager.ts     route ⇄ view state
  useViewport.ts        the ONE isDesktop cell (glass-ui useBreakpoint)  ← L-2
  useDocumentIdentity.ts  title + heading, one owner            ← L-8
  paneRegistry.ts       name → async component  (no static ColorPicker import)
  dock/
    commands.ts         DockCommand + DOCK_COMMANDS_KEY + useDockCommands()  ← L-1, L-3
    Dock.vue            ~150 L: layers, seal, mutex wiring. Single root.
    DockActionBar.vue   the ONE data-driven renderer over ActionButton
    DockCommandButton.vue   (was ActionButton)
    DockViewSelect.vue  reads VIEW_MAP directly, typed PaneConfig
    DockAccountMenu.vue the ONE account/@mbabb menu + #trigger slot  ← L-9
    SlugEditLayer.vue   form only; validation moved to platform/auth
demo/picker · palettes · workbenches · scenes
                        features. Depend on shell + color-session + platform.
                        Register their dock commands; expose no instance methods upward.
```

Edges deleted by the transposition: `shell → palettes` (5 → 0), `shell → picker` (1 → 0, the
registry is async), `shell → ui` (10 → 0, `demo/ui/` deleted). Both remaining shell cycles
dissolve. Files deleted: `demo/ui/**` (19 dirs), `demo/shell/dock/index.ts`,
`demo/shell/dock/ActionToolbar.vue`, `demo/shell/dock/menus/MobileMenuDropdown.vue`, and the
local `useLayerTransition` + `subLayerProps` block. Net: roughly −450 lines and −20 directories,
with `DockCrossfade`'s focus transfer and peak reserve gained rather than reimplemented.

**Ordering.** L-1 first — it is the only finding that is a live functional failure, and the
command registry it introduces is the substrate L-3 and half of L-5 land on. L-2 second (one
viewport cell) because L-9's de-duplication depends on it. L-4 is mechanical and independent;
it can land any time and is the cheapest large structural win in the repo.

---
---

# Addendum A — second independent pass (same seat, same model)

## Model receipt (addendum)

Opus 5, exact model id `claude-opus-5[1m]`, the tier explicitly declared at spawn. Same
repository state: branch `tranche-u`, HEAD `c654824e`.

This addendum was produced by an independent re-run of the CHALLENGE-L seat over the same
subject. It **does not revise** L-1…L-17 above; where the two passes overlap I re-derived the
evidence and it agreed (L-4 barrel census, L-5 `DockCrossfade` export + phantom
`.dock-layer-grid`, L-6 five-file `SESSION_PORT_KEY` fan-in, L-8 `h1 = 0`, L-11 cycle,
L-12 dead refs, L-13 mixed ref idioms). What follows is what the first pass did **not** have:
five findings, four of them measured live, and one correction to a stated negative proof.

Probe budget for this pass: 5 headless Chromium runs against the live dev server on
`localhost:9000` (scripts kept in the session scratchpad as `L-probe*.mjs`, `L-graph2.mjs`),
plus a runtime-only import-graph walk. Every probe below decides a finding.

---

### L-18 · MAJOR — the dock's ink referent probes a node that paints nothing; the "certified chrome" mechanism has been dead since the Glass 7 adoption

`demo/color-session/useContrastSafeColor.ts:150-153` resolves the **chrome** tier — the tier
that exists to certify ink sitting on the dock band — by reading the background off the
producer's root element, selected by its class name:

```ts
if (surface === "chrome") {
    const dock = document.querySelector<HTMLElement>(".glass-dock");
    if (dock) bg = getComputedStyle(dock).backgroundColor;
}
```

Glass 7 does not paint the glass on `.glass-dock`. It paints it on the `.dock-plate` child
(`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/morph.css`):

```css
.glass-dock:not(.vertical) .dock-plate { background: color-mix(in srgb, color-mix(in oklab,
    var(--glass-bg-dock, var(--glass-bg-resting)), var(--glass-tint-source)
    var(--glass-tint-strength)) calc(var(--dock-expand-t) * 100%), …); }
```

**Measured live** (`L-probe5.mjs`, `/#/`, 1280×900, both schemes, dock expanded):

```
light {"dockCls":"glass-dock horizontal shape-pill layout-linear dock-scroll-x expanded fit-content dock-inline",
       "dockBg":"rgba(0, 0, 0, 0)",
       "plateExists":true,"plateBg":"color(srgb 0.931227 0.845921 0.816039 / 0.5392)"}
dark  {"dockBg":"rgba(0, 0, 0, 0)",
       "plateBg":"color(srgb 0.390298 0.334077 0.29024 / 0.5776)"}
```

`rgba(0,0,0,0)` → `resolveCssColorAlpha` returns `alpha = 0` (`:111`) → `resolveLiveTint`
returns `undefined` (`:217  if (!resolved || resolved.alpha === 0) return undefined;`) → the
static producer model in `./ink` serves, unconditionally, forever. The branch has no other
exit.

The static model it falls back to is materially different from the measured truth
(`demo/color-session/ink.ts:29-35`, `:118-122` — chrome shares the `floating` rung):

| | alpha (light / dark) | tint L (light / dark) |
|---|---|---|
| static model in force | **0.80 / 0.88** | 1.0 / 0.345 |
| measured `.dock-plate` | **0.5392 / 0.5776** | ≈0.90 warm off-white / ≈0.39 |

The model claims the band hides ~80 % of the ambient; it actually hides ~54 %. Worked example
(labelled as such — the ambient is the live atmosphere L, which moves per pick): at an ambient
L of 0.75, `surfaceLightness = α·L + (1−α)·ambientL` gives **0.95 modelled vs 0.83 measured** —
the ink is certified against a surface an eighth of the OKLab range lighter than the one it
actually composites over.

This is exactly the failure the module's own docblock says the live probe exists to prevent
(`useContrastSafeColor.ts:60-66`): *"the light-scheme profile trigger certified against the
model's 0.90 while the REAL band composited 0.75 — 3.59:1 measured"*. The cure was written,
shipped, and then silently un-wired by a producer paint change (Glass 7 was adopted whole at
V·W44), with no gate to notice: the `chrome` tier's contrast is only sampled by
`e2e/smoke/oracles/o18-contrast-census.spec.ts:594-635`, which measures the **outcome** at one
boot colour and never asserts that the live probe returned anything.

**The structural reading — this is the library-boundary defect, not a typo.** `chrome` has
exactly **one** consumer in the whole demo:

```
$ grep -rn 'useSafeAccentFn("chrome")' demo
demo/shell/dock/menus/ProfileSection.vue:28:const { safeCss: chromeSafeCss } = useSafeAccentFn("chrome");
```

So a tier that exists solely to serve the dock is implemented inside `demo/color-session/`,
and it reaches its referent by `document.querySelector` on a **producer-private class name** —
no type, no export, no contract, no test. It is the weakest coupling available in the language,
across two package boundaries, for a value the producer already computes.

Second-order fragility, measured: the selector takes the **first** `.glass-dock` in document
order, and there are two on the tuning routes (`demo/scenes/ConfigSliderPane.vue:164` mounts
its own):

```
#/atmosphere {"count":2,"list":[{"inNav":true,...},{"inMain":true,...}],"firstIsShell":true}
#/blob       {"count":2,"list":[{"inNav":true,...},{"inMain":true,...}],"firstIsShell":true}
```

It resolves correctly today only because the shell's `<nav class="dock-band">` precedes
`<main>` in the layout. Any re-order, teleport or portal silently re-points the certification
at a pane-local dock. (Ordering-dependence: measured; breakage: hypothesis.)

**Cure (transposition).** The referent is the producer's own value, so the producer must
publish it: glass-ui exposes the composited chrome tint — a `--glass-tint-chrome` resolved
token, or `useDockSurfaceTint()` on the existing `DockContext` — and the demo reads a token,
never a node. `resolveLiveTint`'s `chrome` branch (and the `veil` branch's identical
`querySelector('[data-surface="veil"]')` idiom at `:170-176`) then collapse to a token read
with no DOM archaeology. The band-aid, if the relay is slow, is `.glass-dock .dock-plate` —
but that is another line of the same wrong kind, and it will break again on the next producer
paint change.

---

### L-19 · MAJOR — `isAdminMode` is a one-way latch: the dock keeps admin identity on non-admin routes (reproduced)

L-10 above catches the *enumeration* duplication in `useDockAdminMode.ts:26-27`. The deeper
defect is that the flag is **state at all**. "Is this an admin view" is a pure function of the
route, and the composable implements it twice, with two different predicates, neither of which
can ever return the flag to `false`:

```ts
useDockAdminMode.ts:32  const isAdminMode = ref(viewManager.currentView.value.startsWith("admin-"));   // predicate A: prefix
useDockAdminMode.ts:55  watch(() => viewManager.currentView.value, (view) => {
useDockAdminMode.ts:56      if (adminViews.includes(view)) { isAdminMode.value = true; }              // predicate B: membership
useDockAdminMode.ts:59  });                                                                            // …and no else
```

Predicate A and predicate B disagree on `atmosphere` and `blob` (in the array, not prefixed),
and the watcher has no falsifying arm. The only writer that clears the flag is
`toggleAdminMode()` — reachable solely through the select's `"__admin_toggle__"` sentinel row.

**Reproduction** (`L-probe6.mjs`, headless Chromium 1280×900, live dev server; reading the
view-select trigger's icon class and `--dock-ring`):

```
1 fresh picker        {"route":"#/",           "goldIcon":false,"ring":"oklch(0.471189 0.188448 9.8340"}
2 -> atmosphere       {"route":"#/atmosphere", "goldIcon":true, "ring":"light-dark(oklch(0.751 0.147 8"}
3 back() -> picker    {"route":"#/",           "goldIcon":true, "ring":"light-dark(oklch(0.751 0.147 8"}
4 -> palettes         {"route":"#/palettes",   "goldIcon":true, "ring":"light-dark(oklch(0.751 0.147 8"}
```

Rows 3 and 4 are the defect: after one visit to a tuning route, the dock wears **admin
identity** — the gold shimmer glyph and the gold `--dock-ring` — on the picker and on every
subsequent route, for the rest of the session. Browser Back, an in-content `router.push`, a
hash edit and a deep link all reach it; nothing clears it.

With admin credentials the consequence is worse than cosmetic: `viewEntries` (`:34-39`) then
returns **only the seven admin views** while the user is on `/#/palettes`, so the dock's own
navigation cannot reach the user views except through the sentinel row.

**Cure.** Delete the ref and both watchers. With L-10's `group: "user" | "admin"` on
`PaneConfig`, admin mode is one line and cannot latch:

```ts
const isAdminMode = computed(() => VIEW_MAP[viewManager.currentView.value].group === "admin");
```

`toggleAdminMode` keeps its job (it *navigates*: `switchView("admin-users")` /
`switchView("picker")`) and the flag follows the route by construction — the same
derive-don't-latch transposition `useViewManager` already applied to `mobilePaneIndex`
(`useViewManager.ts:51-58`, the MOB-2/F-2 note). One predicate, one owner, zero watchers.

---

### L-20 · MAJOR (sharpens L-5) — the hand-rolled sub-layer crossfade animates nothing; it is a 260 ms timer over an instant cut

L-5 establishes that the local `useLayerTransition` shim reimplements `DockCrossfade` and that
its geometry is wrong. Measured here: **the motion it exists to produce does not happen**.

`ActionBarLayer.vue:91` hand-binds `.dock-layer` + `is-active` / `is-leaving`. Those producer
rules (`components/dock/styles/layers.css`) declare exactly one transition —
`transition: visibility 0s linear var(--duration-normal)` — and **no opacity transition**. The
producer's opacity overlap lives on a different selector entirely,
`.dock-crossfade[data-crossfading] > .dock-face` driven by `--dock-t`
(`components/dock/styles/crossfade.css`), reachable only from inside `<DockCrossfade>`.

Live sample of both sub-layer faces at four phases (`L-probe2.mjs`: rest → open Tools →
60 ms after the actions→input swap → 460 ms after):

```
rest        actions: opacity 1 visibility visible position relative  transitionProperty visibility  duration 0s
            input:   opacity 0 visibility hidden  position absolute  transitionProperty visibility  duration 0s
+60ms       actions: opacity 0 visibility visible position absolute  transitionProperty visibility  duration 0s   (is-leaving)
            input:   opacity 1 visibility visible position relative  transitionProperty visibility  duration 0s   (is-active)
+460ms      actions: opacity 0 visibility visible position absolute  transitionProperty visibility  duration 0s
            input:   opacity 1 visibility visible position relative  transitionProperty visibility  duration 0s
```

`transition-property: visibility`, `transition-duration: 0s`, at every phase, on both faces.
Opacity steps 1 → 0 and 0 → 1 in a single frame. The `SUB_LAYER_CROSSFADE_MS = 260` literal,
the `setTimeout`, the `leavingLayer` ref and the extra render it forces buy **zero frames of
crossfade**; their only observable effect is holding a 442×45 transparent, `inert` box
overlapping the live control run for 260 ms plus the producer's `--duration-normal`
visibility delay.

This strengthens L-5's cure rather than changing it: `<DockCrossfade :active reserve="inline">`
is not a tidiness swap, it is the only way to get the animation the code claims to perform.
Edict 6 (animations are never deleted) is not at risk — there is nothing there to delete.

---

### L-21 · MINOR (sharpens L-8) — the heading outline is not merely missing an `h1`; it is inverted

L-8 measures `h1 = 0` on 60/60 captures. The live outline is worse than absent — the
document's most prominent title is an `H3` whose own subsections are `H2`s
(`L-probe.mjs`, `/#/`, 1280×900, first ten headings in document order):

```
desktop: ['H3:92.0%,88.8,20.0', 'H3:About the color spaces, La', 'H2:Basic Information',
          'H2:Components', 'H2:Key Properties', 'H2:Conversion Graph', 'H2:Usage',
          'H2:Detailed Guide', 'H3:Attributes', 'H3:Historical Context']
mobile:  ['H3:92.0%,88.8,20.0']
```

A screen-reader outline for this page reads: *(no title) → level 3 "About the color spaces" →
level 2 "Basic Information"* — the child outranks its parent. So the cure in L-8 must own the
**whole outline**, not just insert an `h1`: heading level is a document-structure decision and
no module makes it today — each pane picks a level to match a font size. The evidence that the
data is already in the right place: `demo/shell/viewSchema.ts:104-233` carries `label` per
view and `demo/color-picker/router/useDocumentTitle.ts:47-56` (`composeTitle`) is its **only**
consumer. `useDocumentIdentity` per L-8, plus a rule that panes start at `h2`, closes both
halves from one owner.

---

### L-22 · INFO — correction to Negative proof #1: the *imports* are honest, but the demo's *declaration* of the published surface has drifted

Negative proof #1 above is right about every import site and I re-derived its histogram
(25 `/color`, 10 `/css`, 6 `/math`, 5 `/easing`, 4 `/quantize`, plus one bare
`@mkbabb/value.js` that is inside a comment at `demo/shared/utils.ts:12`). But the challenge
also asks whether the demo's view of the public surface is *true*, and the declaration files
disagree with `package.json#exports` in three ways:

```
$ python3 -c "import json;print(list(json.load(open('package.json'))['exports']))"
['./color', './value', './css', './easing', './math', './transform', './quantize']     # 7 keys, NO "." root

tsconfig.demo.json paths:
  "@mkbabb/value.js":          ["./dist/index.d.ts"]     # $ ls dist/index*  →  no matches found
  "@mkbabb/value.js/parsing":  [...]                     # NOT in exports; no src/subpaths/parsing.ts
  "@mkbabb/value.js/units":    [...]                     # NOT in exports; no src/subpaths/units.ts
  (missing: "@mkbabb/value.js/value", "@mkbabb/value.js/css")   # both exported; /css used 10× in demo
```

The file's own header calls this *"the 8 public keys"* and *"a CLOSED 8-key set"* and says it
*"mirrors the `vite.config.ts` runtime self-alias generated from the same map"*. The generator
(`vite.config.ts:41-50`) derives one alias per `exports` entry, so it emits **7** aliases and
**no** bare-root alias — there is nothing to mirror the `@mkbabb/value.js` path against, and
`dist/index.d.ts` does not exist. Types for `/css` and `/value` resolve today only because
`skipLibCheck` + node resolution fall through to `node_modules/@mkbabb/value.js@4.0.0` — the
published copy npm installed to satisfy glass-ui's peer dep — i.e. **a second instance of this
library** sitting behind an undeclared specifier.

Latent, not live: no demo file imports the bare root, and glass-ui's own three specifiers
(`/color`, `/css`, `/easing` — measured in its `dist/`) are all covered by the generated alias
set, so one instance serves the running app. But the declaration is a false statement about
the public surface, on the exact axis T.W1 was fought over. **Cure:** generate the tsconfig
paths from `package.json#exports` the way the Vite aliases already are (or add a `"."` export
and a real `dist/index.d.ts`), so the two views of the surface cannot drift apart again.

---

## Addendum ordering note

L-18 is the strongest defect in this pass and, in my reading, the strongest structural defect
in the file: a correctness mechanism the codebase documents as load-bearing, wired to a
producer's private DOM by class name, silently inert since the Glass 7 adoption, with the
static fallback it distrusts now serving every certification on the dock band. It is
independent of L-1 and can land first. L-19 is a two-line derive-don't-latch fix that rides
L-10's `group` field. L-20 changes no plan — it removes the last reason to keep the shim.

---
---

# Addendum B — third independent pass (same seat, same model)

## Model receipt (addendum B)

Opus 5, exact model id `claude-opus-5[1m]` — the tier explicitly declared at spawn. Declared,
not inherited. Same repository state: branch `tranche-u`, HEAD `c654824e`.

This pass **revises nothing** in L-1…L-22. Where it overlaps I re-derived the evidence
independently and it agreed (the `demo/ui/` 19-barrel census, the five-file `SESSION_PORT_KEY`
fan-in, `h1 = 0`, the `index.ts` cycle, the three dead refs in `ActionBarLayer`, the mixed
ref idioms, the verbatim menu fork, the `isAdminMode` latch). What follows is what neither
prior pass had: **one BLOCKER that is the enabling mechanism for four of the existing MAJORs**,
five measurements that convert existing findings from argued to counted, and one shim the
census missed.

Probe budget: **zero new browser probes.** Everything below is static analysis, producer-source
reads, or a headless composable harness under `vite-node`. Three scripts in scratchpad —
`cycles.mjs` (full 250-file import graph with per-edge value/type kind + cycle enumeration),
`reach.mjs` (transitive value-import closure per entry, bucketed by area), `adminlatch.ts`
(`useDockAdminMode` driven headlessly).

---

### L-23 · BLOCKER — the demo's import-boundary guards match **zero files**. There has been no structural enforcement of the demo module lattice since W43, and that silence is what produced L-4, L-6, L-10 and L-11.

Both prior passes found the boundary violations. Neither asked why nothing caught them. The
answer is that the guards written specifically to catch them are dead code.

`eslint.config.js` carries three `no-restricted-imports` objects encoding exactly this seat's
invariants:

- `eslint.config.js:230-256` — **G-DEMO-3b**, files `["demo/color-picker/**", "demo/@/components/**", "demo/@/lib/**"]`,
  bans `@components/custom/palette-browser/**/*.vue`.
- `eslint.config.js:257-300` — **G-DEMO-1 + G-DEMO-3a**, files `["demo/@/composables/**"]`, bans
  `**/color-picker/**` ("the shared color layer must never import app-root boot") and
  `@components/custom/*/composables/**` ("features depend on shared, never the reverse").

`eslint.config.js:264-270` states the intent verbatim:

> "Wired **STANDING** so a future feature edit cannot silently re-invert the demo module graph."

The tree they are keyed to was deleted at W43 (RF-15):

```
$ ls -d demo/@
ls: demo/@: No such file or directory
$ ls demo/@/components demo/@/composables demo/@/lib
ls: demo/@/components: No such file or directory
ls: demo/@/composables: No such file or directory
ls: demo/@/lib: No such file or directory
```

And the specifier group they ban is unwritable, because the alias died with the tree —
`tsconfig.demo.json:33-34`:

> `// import is relative to its physical home. No @styles/@components/`
> `// @utils/@lib/@composables/@assets project alias survives.`

`vite.config.ts:66-70` says the same ("W43 (RF-15) killed the demo `@…` path aliases"). The only
two surviving `@components/` strings in the tree are prose:

```
$ rg -c "@components/" demo/
demo/palettes/browser/status/index.ts:1     # inside a comment
demo/DESIGN.md:1
```

So: two of the three guard objects match **zero files**; the third matches files but its sole
pattern is a specifier that cannot resolve. The dock subtree lints clean because nothing is
being checked:

```
$ npx eslint demo/shell/dock --max-warnings=0
$      # no output, exit 0
```

**Mechanism.** The invariants were encoded against a *path alias* instead of the *physical
tree*. When the alias dissolved, the invariants dissolved with it — silently, because
`no-restricted-imports` over a glob matching nothing is a no-op, not an error. Nothing in CI
distinguishes "enforced and passing" from "enforcing nothing". This is the same class of defect
as L-18 (a load-bearing mechanism wired to a name that moved), one layer up: there, a DOM class
name; here, a path alias.

**Why it is the blocker for this axis.** Every structural finding in this report lives inside
the window the guards stopped covering. In that window the shell inverted into the features five
times (L-6), a 19-directory alias layer survived a design-system consolidation (L-4), the view
registry acquired a second owner (L-10), and the dock grew a runtime import cycle (L-11). The
one boundary rule in this repo that *does* still match files and still fires — `inv-K-1` at
`eslint.config.js:204-218`, banning `src/ → glass-ui` — is precisely the boundary that has
never been violated. That correlation is the finding.

**Cure.** Re-express the lattice as a declared layer order over *physical areas*, keyed on
relative-path groups that alias churn cannot silence:

```
platform ← color-session ← shell ← { picker, workbenches, palettes, scenes } ← color-picker
```

One `no-restricted-imports` object per layer banning every area above it (`../palettes/*`,
`../../palettes/*`, …), plus `import/no-cycle` — which alone would have caught L-11 the day it
landed. And the piece that makes a guard's own death loud: **a meta-test asserting each guard
object matches a non-zero file count.** Without it, the next tree rename re-opens the window in
exactly the same silence.

---

### L-24 · MAJOR (quantifies L-6) — the shell→feature inversion costs the always-mounted dock **23 palettes modules to read one boolean**; the signal's true origin has a closure of 2.

L-6 establishes the five-file fan-in. The size of the edge was never measured. `reach.mjs`,
**value**-imports only (type-only edges excluded because they erase at compile time):

```
demo/palettes/usePalettePorts.ts   => value-reachable modules: 31 {"palettes":23,"platform":8}
demo/shell/dock/Dock.vue           => value-reachable modules: 65 {"shell":20,"palettes":23,"color-session":6,"platform":9,"ui":7}
demo/platform/auth/useAdminAuth.ts => value-reachable modules: 2  {"platform":2}
```

**23 of `Dock.vue`'s 65 reachable modules are the entire palettes feature.** `Dock.vue:44` uses
exactly one member of the port it imports — `pm.isAdminAuthenticated` — and that signal
originates in `demo/platform/auth/useAdminAuth.ts`, whose own closure is **2**. The cost is
paid because `SESSION_PORT_KEY` is a `Symbol` declared at `usePalettePorts.ts:265`, at the
bottom of a module whose top statically imports 16 siblings (`usePalettePorts.ts:4-20`).

Two consequences the qualitative finding does not carry:

1. **Code-splitting is foreclosed, not merely untidy.** The dock renders on 15/15 routes inside
   the always-present `<nav class="dock-band">` (`App.vue:24-44`). Any future attempt to
   lazy-load the palettes feature is defeated by the persistent chrome statically importing it.
   The greenfield lattice's "no static `ColorPicker` import" note (line 685) needs the same
   clause for palettes.
2. **`demo/ui`'s 7 modules in that closure are pure indirection** — the L-4 barrels, priced.

This also sharpens the ledger gap. `CARRY-LEDGER.md:22` (W47, F1 shell & scene) books
**D53.iv:** "the four pre-existing feature→shell/boot couplings (VIEW_MANAGER_KEY ×2 · `ViewId`
type · `resolveCalibratedAtmosphere`)". It books one direction of a two-way street: the five
shell→feature edges are not booked anywhere.

---

### L-25 · MAJOR (quantifies L-11, and finds four more) — the dock barrel is the **only value↔value cycle** in the demo's 250-file graph; the same detector surfaces four unreported cycles in `demo/palettes/`.

L-11 identifies the `index.ts ↔ Dock.vue` cycle. `cycles.mjs` places it in context — full
`demo/**` graph, per-edge kind recorded so an erasable `import type` edge is distinguishable
from a real runtime one:

```
CYCLE: demo/shell/dock/index.ts -> demo/shell/dock/Dock.vue -> demo/shell/dock/index.ts
   kinds: value,value                                          ← the ONLY one of its kind

CYCLE: demo/palettes/usePalettePorts.ts -> demo/palettes/useAdminUsers.ts
    -> demo/palettes/browser/admin/index.ts -> demo/palettes/browser/admin/AdminUsersPanel.vue
    -> demo/palettes/usePalettePorts.ts
   kinds: value,type,value,value            ← ×4 (AdminUsers / AdminAudit / AdminFlagged / AdminTags)

CYCLE: demo/scenes/about/markdown/index.ts -> …/Markdown.vue -> …/index.ts   kinds: value,type
CYCLE: demo/workbenches/gradient/composables/useGradientModel.ts -> …/useGradientCSS.ts -> …   kinds: value,type
CYCLE: demo/workbenches/gradient/composables/useGradientModel.ts -> …/gradientParse.ts -> …    kinds: type,type

total files scanned: 250 | distinct cycles: 8
```

Of eight cycles, the dock's is the **only two-node cycle whose every edge is a value edge** —
i.e. the only one that is unambiguously a runtime module cycle rather than a type-graph
artifact. That is the sharpest available statement of L-11's severity, and it also means
`import/no-cycle` (L-23's cure) would flag it as the tree's single worst instance on day one.

The four `palettes/usePalettePorts ↔ browser/admin/*` cycles are **new** — reported here for the
palettes seat, not claimed as this component's. They matter to this component only as
corroboration of L-24: the module the dock statically imports is itself the hub of four cycles.

---

### L-26 · MAJOR (quantifies L-9) — the menu fork is **87 of 108 non-blank lines identical (81%)**, with a 28-line and a 15-line contiguous block copied character-for-character.

L-9 calls the two menus a verbatim fork. Measured (multiset of stripped non-blank lines, plus
`difflib` longest-common-block):

```
MobileMenuDropdown non-blank lines: 108
ProfileSection non-blank lines:     170
identical (multiset) shared lines:  87
share of MMD duplicated in PS:      81%

--- common block size 28: MMD[80] PS[142]
    Share color row · GitHub row incl. the full inline 24×24 SVG path data ·
    Dark mode row incl. its entire 6-line W6-8/V-W44 comment — verbatim
--- common block size 15: MMD[40] PS[63]
    slug-pill DropdownMenuLabel · Copy slug · Switch account · Logout
--- common block size  9: MMD[71] PS[132]   @mbabb avatar + bio block
--- common block size  7: MMD[11] PS[12]    imports + defineProps
--- common block size  5: MMD[22] PS[29]    defineEmits
```

The 28-line block carries ~700 characters of GitHub `path` data and a six-line comment
*explaining a design decision* into both files. Any edit to the account menu must be made
twice, and the comment's own reasoning must be re-read twice to know it was already applied.

---

### L-27 · MAJOR (re-seats L-16 and MT-F004) — the sub-24px dock targets are **glass-ui's `compact` default having no floor at all**, and the arithmetic matches the audit's measurement exactly.

L-16 files the per-instance override as INFO with "an acknowledged root cure". The producer
source shows the root cure is not cosmetic — the compact register ships with **no minimum**:

`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/icon-button.css`

```css
.dock-icon-button--compact {
  width:     var(--dock-compact-control-size, auto);
  height:    var(--dock-compact-control-size, auto);
  min-width: var(--dock-compact-control-min-width, 0);
  padding:   var(--dock-compact-control-padding, 0.25rem);
}
```

`min-width` defaults to `0`; there is no `min-height`; the box is `auto`-sized around its glyph
with 4px of padding. `SlugEditLayer.vue:93-115` renders three `compact` DockControls with
`w-3.5 h-3.5` glyphs. **14px + 2×4px = 22px** — and `REPORT.json` measures precisely that, in
all 60 captures:

```json
{"w":22,"h":22,"tag":"button","label":"Switch to slug"}
{"w":22,"h":22,"tag":"button","label":"Generate new slug"}
{"w":22,"h":22,"tag":"button","label":"Cancel"}
```

Three of the eight `smallTapTargets` on `/#/`, recurring on every route because the slug layer
is always mounted. `ActionBarToggle.vue:154-158` lifts **its own** control off the default via
the producer hook (`--dock-compact-control-padding: 0.5rem 0.75rem`), with a comment at `:149`
correctly noting it "rides the producer's OWN token hook … never a specificity fight" — right
instinct, wrong altitude: one of four compact controls in the same subtree, patched per instance
(edict 5) around a design-system default (edict 4).

**Cure.** `min-block-size: 1.5rem; min-inline-size: 1.5rem` as the *default* on
`.dock-icon-button--compact` in glass-ui. This raises MT-F004's dock rows from MINOR-cosmetic to
a producer-owned floor, and it is the **third** glass-ui ask this component has generated
(with L-5's content-swap composable and L-17's mutex) — none of which has been relayed, against
the standing BH-inbox edict.

---

### L-28 · MINOR — a back-compat re-export the census missed, still load-bearing for three consumers, aliasing a path that no longer exists.

`demo/shell/useViewManager.ts:15-18`:

```ts
// Re-export the schema types so existing consumers that import from
// `@composables/useViewManager` continue to resolve cleanly (the schema is
// the single source of truth; this re-export preserves source-compat with
// the pre-D.W3-Lane-D import paths).
export type { ViewId, LeftPane, RightPane, PaneConfig };
```

Edict 2, three ways: it is a source-compat shim; the path it preserves compat *with*
(`@composables/…`) has not existed since W43 (L-23); and the "single source of truth" it names
in its own comment is the file consumers should be importing from instead. It is still
load-bearing:

```
$ rg -n 'from ".*useViewManager"' demo/ | rg "type"
demo/shell/dock/composables/useDockAdminMode.ts:5:import type { ViewId, ViewManager } from "../../useViewManager";
demo/palettes/usePalettePorts.ts:19:import type { ViewId } from "../shell/useViewManager";
demo/color-picker/composables/boot/useAtmosphereBoot.ts:55:import type { PaneConfig } from "../../../shell/useViewManager";
```

All three want `viewSchema.ts`. The D.W3-Lane-D migration that created the schema (and that
`viewSchema.ts:7-9` records as the cure for "the 4-copy `ViewId` enumeration") was never
finished; this shim is the record of that, and L-10's fifth copy is what grew in the gap.
**Cure:** point the three at `viewSchema.ts`, delete lines 15-18. Three specifiers, no
behaviour change.

---

### L-29 · MINOR (quantifies L-15 / L-14) — **47% of `demo/shell/dock/**` is not dock chrome**, which is why the accessible-name pass missed `ColorInput`.

`wc -l` over the subtree, grouped by the domain each file actually speaks (2295 lines total):

| group | files | lines | share | proper home |
|---|---|---:|---:|---|
| dock chrome | `Dock.vue` 359 · `ActionBarToggle` 159 · `DockViewSelect` 162 · `DockStatusLamp` 123 · `status-lamp.ts` 65 · `ActionBarLayer` 158 · `GenericActionBar` 32 · 2 composables 162 · `index.ts` 5 | 1225 | 53% | ✅ here |
| **color domain** | `ColorInput.vue` 377 · `ActionButton.vue` 137 · `ActionToolbar.vue` 92 · `ParseEchoReadout.vue` 49 | **655** | **29%** | `demo/color-session/` |
| **identity domain** | `ProfileSection.vue` 181 · `MobileMenuDropdown.vue` 115 · `SlugEditLayer.vue` 119 | **415** | **18%** | `demo/platform/auth/` |

`ColorInput.vue` is the clean case: it parses CSS colors (`:208,215`), serializes picker colors
(`:135,235`), calls the color-names API (`:132,236`), and opens an auth session (`:133,234`).
It imports `color-session`/`platform` five times and `@mkbabb/glass-ui/dock` **zero** times. It
is a color-session component that is merely *rendered* in the dock.

This is the mechanism behind L-7's finding, not a separate observation: the dock-wide
accessible-name register pass (recorded at `ActionBarToggle.vue:35`, `Dock.vue:140-142`,
`SlugEditLayer.vue:87-89`) labelled every icon-only control in the subtree — `Dock.vue:143,144,154`,
`SlugEditLayer.vue:93,105,113`, `ActionBarToggle.vue:90`, `ActionBarLayer.vue:131`,
`DockViewSelect.vue:68` — and missed exactly the two buttons in the one file that is not dock
chrome (`ColorInput.vue:67-75, 76-82`). **A sweep scoped by directory cannot see a file whose
domain does not match its directory.** Moving by domain rather than by render location — the
dock *composes* `<ColorInput>`, it does not own it — is what makes the next such sweep complete.

---

### L-19 corroborated independently, without a browser

L-19 reproduces the `isAdminMode` latch live. I re-derived it at the composable level, which
removes the shared-browser variable entirely (`adminlatch.ts` under `npx vite-node`, real
`useDockAdminMode` + real `VIEW_MAP`, `isAdminAuthenticated = ref(false)` never changed):

```
t0  view=picker      isAdminMode = false | entries = picker,palettes,browse,extract,mix,generate,gradient
t1  view=blob        isAdminMode = true  | entries = picker,palettes,browse,extract,mix,generate,gradient | current view listed?  false
t2  view=picker      isAdminMode = true  | entries = picker,palettes,browse,extract,mix,generate,gradient
t3  view=gradient    isAdminMode = true
```

Two details this framing adds. **(i)** At `t1` the current view is *not in the rendered list* —
`viewEntries` needs `isAdminMode && isAdminAuthenticated` to switch to `adminViews`, so an
unauthenticated admin-mode user gets `userViews`, which excludes `blob`; `DockViewSelect.vue:87`'s
`<SelectValue />` therefore has no matching `SelectItem` and renders empty. **(ii)** The latch is
structural, not a missed branch: the only reset is
`useDockAdminMode.ts:60-62` — `watch(isAdminAuthenticated, auth => { if (!auth) isAdminMode = false })`
— a watcher on a ref that, for a visitor who was never authenticated, never changes and
therefore never fires. And the schema/dock disagreement that opens the door is measurable:

```
viewSchema ViewIds  : 14        dock enumeration : 14
schema 'primary' (accentHueShift != 0 or picker):
  picker,palettes,browse,extract,mix,generate,gradient,atmosphere,blob      ← 9
useDockAdminMode userViews:
  picker,palettes,browse,extract,mix,generate,gradient                      ← 7
```

`viewSchema.ts:80-86` says "**The nine primary views** are proportioned around the wheel in 40°
steps in dock order; **admin views stay at 0°**". The dock says seven, and files `atmosphere` +
`blob` — the two views the schema hue-turned as primaries — under admin. L-10's `group`/`tier`
field on `PaneConfig` closes both halves; making `isAdminMode` a `computed` off it makes the
latch **unrepresentable** rather than fixed.

---

## Addendum B ordering note

**L-23 lands first, before L-18.** L-18 is the worse *symptom* — a certification mechanism inert
since Glass 7 — and I do not revise that judgement. But L-23 is the *reason the symptoms
accumulate*: three boundary guards written to prevent precisely L-4, L-6, L-10 and L-11 have
matched zero files since W43, and every one of those four landed inside that window. Turning
them back on against the physical tree converts the rest of this report from a set of judgement
calls into a set of build failures — which is the only form in which a structural invariant
survives the next tranche. It is also cheap: one config rewrite plus a meta-test, no source
edits, and it can land in parallel with everything else.

Then, in leverage order: **L-24/L-6** (move the session port to `platform/auth/` — five
specifiers, mechanical, −23 modules from the chrome's closure and code-splitting unblocked),
**L-4 + L-11/L-25** (delete two barrel layers — ~49 specifiers, mechanical, the tree's only
runtime cycle dies), **L-28** (three specifiers, one shim deleted), then the transpositions
already sequenced above. **L-27** is a one-line relay to glass-ui and should ride the same
message as L-5's and L-17's unsent asks.

---
---

# Addendum C — fourth independent pass (same seat, same model)

## Model receipt (addendum C)

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant —
the tier explicitly declared at spawn. Declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e` at spawn
(the working tree has since advanced to `9bcd5d91` via other seats' doc commits; every file cited
below is unmodified since `c654824e`).

This pass **revises nothing** in L-1…L-29. I re-derived the overlapping ground independently
before reading the prior passes, and it agreed on every point I checked: the `index.ts ↔ Dock.vue`
cycle as the tree's only value↔value cycle (my own detector: `total runtime cycles: 1`), the
five-file `SESSION_PORT_KEY` fan-in, the 19 `demo/ui` barrels, the dead `demo/@/**` eslint globs,
`h1 = 0` with an inverted outline, the `send-btn` identification of MT-F005, the four
`SlugEditLayer` tap-target rows, the two dead refs in `ActionBarLayer`, and the two contracts
behind the action bar. Two independent measurements agreed to the digit
(`Dock.vue` value-closure **65 modules**, of which **23** are `palettes/`; menu fork **81%**
line-identical).

What follows is what none of the three prior passes had: **one BLOCKER**, one MAJOR, and three
smaller items. Probe budget for this pass: 6 headless WebKit runs (`LDOCK-probe*.mjs`,
`LDOCK-graph*.mjs` in the session scratchpad) plus one `tsc --traceResolution`. Every probe below
decides a finding.

---

### L-30 · BLOCKER — a failed login is **completely silent**: the layer closes as if it succeeded, and there are three independent, redundant reasons no error can ever reach the user

L-15 files the credential parsing in `SlugEditLayer.vue` as MINOR and notes the
`msg.includes("409")` string-sniffing in passing. The sniffing is not the defect — it is the
third of three layers of swallowing, none of which can fire, over a login that fails silently
today.

**Reproduction** (`LDOCK-probe6.mjs`, WebKit 1440×900, live dev server — whose API is
deliberately misconfigured, so every login attempt is guaranteed to fail; the dock's own status
lamp reads *"dev misconfigured — run `npm run dev`"* in the captured body text):

```
[slug-edit opened]              inputValue:""   layerInert:false  layerAriaHidden:null   errorish:[]
  → fill "aaaa-bbbb-cccc-dddd" → click button[aria-label="Switch to slug"] → wait 2.5s
[after submit of a bogus slug]  inputValue:""   layerInert:true   layerAriaHidden:"true" errorish:[]

console tail: [ vite connecting, vite connected,
                "[value.js] value.js dev is MISCONFIGURED: …",   ← from boot, not the login
                "[useCustomColorNames] color-name load failed …" ]   ← from boot, not the login
```

`errorish` scans every leaf element in the document for `/not found|already|too many|failed|error|invalid/i`
and returns **empty**. The slug-edit layer is inert + `aria-hidden` (closed), the input is
cleared, the dock still shows **Login** (not signed in), and the login attempt produced **no DOM
text, no console line, and no page error**. The user's mental model after this interaction is
"I signed in."

**Mechanism — three swallows, each sufficient on its own:**

**(1) The dock's `catch` is unreachable.** `SlugEditLayer.vue:54` calls the handler with no
`await`, inside a `try`:

```js
// SlugEditLayer.vue:44-66
try {
    …
    pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);   // :54  ← no await
    slugInput.value = "";                                                        // :55
    slugEditMode.value = false;                                                  // :56  ← closes NOW
} catch (e: any) { … }                                                           // :57
```

`demo/palettes/useSlugMigration.ts:51` declares `async function onSlugSwitch(value, isAdmin)`. A
rejection from an un-awaited async call cannot enter the enclosing `catch`; and lines 55-56 run
synchronously, closing the layer before the network call has resolved — which is exactly what the
reproduction shows.

**(2) It would not matter, because the callee never rejects.** `useSlugMigration.ts:74-88`
catches everything itself and dispatches the message onto a component instance ref:

```js
} catch (e) {
    const status = e instanceof ApiProblem ? e.status : undefined;
    if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
    …
}
```

`slugBarRef` is permanently `null` — see L-31. So the error is swallowed at the source, into a
`?.` on a ref that nothing ever assigns.

**(3) And `slugError` has no template binding at all.** It is written at six sites and rendered
at zero:

```
$ grep -n "slugError" demo/shell/dock/layers/SlugEditLayer.vue
13: const slugError = ref("");
18,43: slugError.value = "";
49: slugError.value = "Already signed in.";
59,60,61,62: slugError.value = "…"
$ sed -n '74,119p' demo/shell/dock/layers/SlugEditLayer.vue | grep slugError
(no output — the entire <template> contains no reference)
```

Even the one branch that *can* execute synchronously (`:48-52`, "Already signed in.") displays
nothing.

**And the sniffing is a verbatim resurrection of a bug this repo already killed.** The correct
implementation, one call away, carries the ruling in its own comment
(`demo/palettes/useSlugMigration.ts:77-82`):

> *"S.W2 W2-6: branch on the typed `ApiProblem.status`, not `.message` substrings — the server
> titles ("Already logged in as this user", "User not found", "Rate limit exceeded") never contain
> "409"/"404"/"429", so those branches matched nothing and the authored copy below never showed."*

`SlugEditLayer.vue:59-62` re-authors precisely that condemned form. `ApiProblem`
(`demo/platform/transport/api-problem.ts:22-33`) does `super(title)`, so `e.message` **is** the
server title — the substrings can never match, by the exact mechanism W2-6 documented. Edict 2
("no legacy code") is violated in its sharpest form: not a shim left standing, but a defect
re-typed after its cure was recorded.

**Cure.** `onSlugSwitch` must **return** its outcome rather than dispatch it — `Promise<Result<void, ApiProblem>>`
— and the layer must `await` it and render the failure. That is one contract change that removes
all three swallows at once: awaiting makes the failure observable, returning removes the
instance-ref channel (L-31), and rendering removes the dead ref. Combined with L-6/L-24's move of
the session port to `demo/platform/auth/`, the login surface stops being a feature-owned
side-effect and becomes a function with a typed result.

---

### L-31 · MAJOR — the slug bar exists twice; the **dead** copy owns the error channel, and it is mounted by nothing

`demo/palettes/browser/slug/PaletteSlugBar.vue` — 243 lines, exposing exactly the API
`useSlugMigration` calls (`:227 function setError(msg: string)`, `:236 defineExpose({ slugEditMode, setError, resetEditMode })`)
— is **referenced by nothing but two barrels**:

```
$ grep -rn "PaletteSlugBar" demo/ | grep -v "useSlugMigration\|^demo/palettes/browser/slug/PaletteSlugBar.vue:"
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

Two re-exports, **zero template usages** anywhere in `demo/`. Therefore
`useSlugMigration.ts:30` — `const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null)` —
is permanently `null`, and the four `slugBarRef.value?.setError(...)` calls at `:84-87` are
guaranteed no-ops. `useSlugMigration.ts:121` returns the ref to `usePalettePorts`, which forwards
it to nobody.

The shape is the ownership defect the challenge asks for, in its purest form:

| | live | dead |
|---|---|---|
| implementation | `demo/shell/dock/layers/SlugEditLayer.vue` (119 L) | `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 L) |
| area | **shell** — chrome | palettes — the feature that owns the migration logic |
| error channel | writes `slugError`, never rendered | `setError()`, wired and never called |
| exposes | `{ onStartSlugEdit, onCopySlug, slugSwitching }` (`:72`) — **no `setError`** | `{ slugEditMode, setError, resetEditMode }` |

The dock re-implemented the slug bar, the original was left standing in `palettes/`, and the
composable kept talking to the corpse. Note the `defineExpose` row: even if someone bound
`slugBarRef` to `<SlugEditLayer>` today, `setError` would still be `undefined` — the two
implementations do not share an interface, so there is not even an accidental repair path.

This is also the **fourth** dual-home in this component's neighbourhood, joining the menu (L-9),
the action bar (L-3), and the view registry (L-10). Same mechanism every time: a surface was
re-authored at the dock, and the predecessor was left exported rather than deleted.

**Cure.** Delete `PaletteSlugBar.vue` and both barrel lines (−243 lines, −2 exports). `SlugEditLayer`
becomes the single sign-in surface and moves, per the greenfield lattice, to
`shell/dock/layers/` with its validation (`looksLikeSlug`, `normalizeTokenInput` — L-15) relocated
to `demo/platform/auth/`. With L-30's typed return, `slugBarRef` and `setError` cease to exist as
concepts.

---

### L-32 · MINOR — the demo's tests have two homes, and the library's test root reaches into `demo/`

`demo/shell/dock/status-lamp.ts` is a demo shell module; its test lives in the **library's**
vitest root:

```
$ ls test/*.ts | wc -l                    → 19
$ grep -rln "\.\./demo/" test/ | wc -l    → 10
test/status-lamp.test.ts  test/ink.test.ts  test/view-accents.test.ts  test/preview-chips.test.ts
test/slider-announcement.test.ts  test/mix-v4.test.ts  test/gradient-parse.test.ts
test/gradient-v4-consume.test.ts  test/image-sampler-v4.test.ts  test/value-domain-clamp.test.ts

$ ls demo/test/*/                          → demo/test/export/byte-exact.test.ts
                                             demo/test/glass/{aurora-bracket,aurora-motion}.test.ts
```

**10 of 19 files in the library test root are demo tests**, while `demo/test/` also exists with 3
files. The library program (`tsconfig.lib.json`) is deliberately structurally glass-ui-free
(inv-K-1, eslint-enforced at `eslint.config.js:204-218`) — yet its test root imports the demo,
which imports glass-ui. The boundary the lint rule protects in `src/` is not protected in `test/`,
and `status-lamp.ts:28` documents the arrangement as intentional (*"the O-22 variant matrix is
asserted over this function in `test/status-lamp.test.ts`"*).

**Cure.** `test/` holds library tests only; the 10 demo tests move to `demo/test/` beside the two
already there, with a second vitest project entry. This is the same edict-2 shape as L-28 — a
location preserved for source-compat with a layout that changed.

---

### L-33 · MINOR — the same dual-home pattern, checked at the two other suspects the brief named

The challenge names three historical suspects. Verified, so the ledger is complete:

| suspect | status |
|---|---|
| `ActionBarLayer`'s local `useLayerTransition` | **LIVE** — already filed as L-5 / L-20 |
| three parallel `useDark` stores | **CURED** — confirmed independently: all 9 live call sites use glass-ui `useGlobalDark`; the only vueuse mention is the historical comment at `useMarkdownHighlighting.ts:76-79`. Agrees with Negative proof #2. |
| `demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers` | **LIVE — not previously filed in this report** |

The third:

```
demo/palettes/export.ts            132 L   exportAsJSON / ExportResult / slugify()
demo/palettes/usePaletteExport.ts   27 L
demo/palettes/export/               12 modules — serializers.ts (47 L), json.ts, css.ts, png.ts,
                                    svg.ts, tailwind.ts, canonical.ts, rfc8785.ts, digest.ts,
                                    bytes.ts, reload.ts, types.ts
```

A 132-line module and a 12-module directory of the same name, both alive, both owning "palette
export". Out of this component's subject — filed here only as corroboration that the dual-home
mechanism is systemic in `demo/` rather than particular to the dock, which is the load-bearing
claim behind L-23's cure. The palettes seat owns the cure.

---

### L-34 · INFO (sharpens L-10 / L-19) — the admin partition has a **third** home, and it sides with the schema against the dock

L-10 finds the dock's `adminViews` contradicting `viewSchema`'s hue law. There is a third
enumeration, and it agrees with the schema:

```
demo/color-picker/router/index.ts:30-34
  { path:"/admin/users",  name:"admin-users",  component:Stub, meta:{ admin:true } }
  { path:"/admin/names",  … }  { path:"/admin/audit", … }
  { path:"/admin/flagged",… }  { path:"/admin/tags",  … }        ← exactly 5, and no others
```

`/atmosphere` (`:28`) and `/blob` (`:29`) carry **no** `meta.admin`. So the tally across the three
owners of "is this an admin view" is **5 · 5 · 7** — the router and the schema agree; the dock
alone dissents, and the dock is the one that gates the navigation UI. That makes L-10's `group`
field on `PaneConfig` a three-way consolidation (schema owns it, router derives `meta.admin` from
it, dock derives `viewEntries` from it), not a two-way one — and it means the dock's dissent has
never been visible to the route layer, which is why the latch in L-19 was reachable through Back,
deep link and `router.push` alike.

The route table is also a **sixth** copy of the `ViewId` enumeration in the sense
`viewSchema.ts:7-9` set out to retire (14 route records, hand-listed, `component: Stub` each) —
generatable from `VIEW_MAP` in four lines.

---

### One measurement that sharpens MT-F004's attribution

`/#/browse` and the five `/#/admin/*` routes isolate the shell's constant a11y floor exactly,
because they carry no pane-level tap-target defects of their own. From `REPORT.json`:

```
safari-desktop-light /#/browse : smallTapTargets 4  namelessButtons 0
safari-mobile-light  /#/browse : smallTapTargets 4  namelessButtons 0
   → input 160×23 (desktop) / 160×20 (mobile), label ""
   → 3 × button 22×22 (desktop) / 23×23 (mobile): "Switch to slug", "Generate new slug", "Cancel"
```

All four are `SlugEditLayer.vue` (`:81-87`, `:91-118`), and `namelessButtons: 0` on the same
captures confirms the nameless button is **not** part of the shell's constant floor — it tracks
the presence of an `ActionBarContext`, which is L-1. So the correct decomposition of the visual
audit's shell rows is: **4 constant tap-target defects on 60/60 captures, dock-owned, latent
behind `inert` until the layer opens** (L-7's correction stands), plus **1 conditional nameless
button on the 6 desktop routes that have an action bar**. The root's "behind a responsive branch"
reading is wrong in both halves — L-7 established that for the nameless button; this establishes
that the tap-target rows are not responsive at all, they are unconditional.

---

## Addendum C ordering note

**L-30 lands with L-1, not after it.** L-23 remains the right first move (turn the guards back on;
they are what let all of this accumulate), and L-18 remains the worst latent symptom. But L-30 is
the only finding in this report where a user performs an action, is told nothing, and is wrong
about the outcome — and it is cheap: `await` the call, return a typed result, render the error,
delete the orphan (L-31). It touches four files and no producer.

Sequenced against the existing plan: **L-23** (guards + `import/no-cycle` + the meta-test that
makes a guard's death loud) → **L-30 + L-31** (typed login result; delete `PaletteSlugBar`) →
**L-1** (the command registry, which is the substrate for L-3 and half of L-5) → **L-24/L-6**
(session port to `platform/auth`) → **L-4 + L-11/L-25** (delete the barrel layers) → the
remaining transpositions as already sequenced. **L-32**, **L-33** and **L-34** are each a
single mechanical commit and can land in any order.

### Reproduction index (this pass)

| script | establishes |
|---|---|
| `LDOCK-probe1.mjs` | desktop `/#/`: `send-btn` identity + rect, slug input `inert`/`aria-hidden` ancestors, layer mount states, `h1: 0`, inverted heading order |
| `LDOCK-probe2.mjs` | mobile `/#/`: `sendBtnCount 0`, `colorInputPresent false`, `namelessCount 0` |
| `LDOCK-probe3.mjs` | `/#/extract`'s 3 nameless buttons are pane-owned (`button.dock-icon-button`, `title=` only), **not** dock |
| `LDOCK-probe4/5.mjs` | L-1 re-reproduced on a second action: desktop `bodyTextLen 649→711` vs mobile `449→449` for `button[aria-label="Seed from palette"]` |
| **`LDOCK-probe6.mjs`** | **L-30**: bogus-slug submit → layer closes inert+aria-hidden, input cleared, `errorish: []`, clean console |
| `LDOCK-graph.mjs` | independent cycle detector: `total runtime cycles: 1`, it is the dock barrel; 31 cross-area edges out of `shell/dock` (color-session 13 · ui 10 · palettes 5 · platform 3) |
| `LDOCK-graph2.mjs` | independent closure measurement: 65 → 39 modules, 251 → 157 KB when the `SESSION_PORT_KEY` edge is cut (26 modules / 94 KB) |
| `npx tsc -p tsconfig.demo.json --noEmit --traceResolution` | `@mkbabb/value.js/css` resolves by package **self-reference** through `exports`, not through `paths` — corroborates L-22 and identifies why the missing key is latent rather than live |

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh`, or any `INBOX.md` was modified by this seat. The only write is this
addendum, appended without altering a byte of L-1…L-29.
