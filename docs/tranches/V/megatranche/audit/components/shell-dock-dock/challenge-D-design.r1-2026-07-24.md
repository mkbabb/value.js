# CHALLENGE-D — `demo/shell/dock/Dock.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. The declaration is served, not inherited. Seat: CHALLENGE-D
(design), component `demo/shell/dock/Dock.vue` (359 lines, area `demo/shell`), repository
`/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

---

## Verdict

**DEFECTIVE.** Three BLOCKERs, nine MAJORs, nine MINORs.

The dock is the app's persistent chrome and — because `h1` count is **0 on all fifteen routes in
all four capture matrices** — it is also the app's *only* route-identity carrier. It fails at that
single job three different ways at once: on Safari its route selector cannot be reached by
keyboard at all; on `/#/atmosphere` and `/#/blob` it renders **no route name whatsoever** while
simultaneously painting the gold "elevated authority" identity for an unauthenticated session; and
at 200% browser zoom the route label disappears again because the desktop/mobile branch is keyed
on raw CSS viewport width.

The strongest defect is the **Safari keyboard dead-zone**. It is not a stray missing attribute —
it is the direct consequence of a design that was never drawn: `VISUAL-CONSTITUTION.md §5.2` row 6
specifies a *horizontal Dock/rail roving focus* mechanism, and `Dock.vue` implements zero keyboard
handling of any kind. Built as a loose row of independent `<button>`s instead of a rail, the dock
inherits Safari's default exclusion of bare buttons from sequential focus. Reproduced below across
two engines against the same DOM.

---

## Evidence base

- **Source read at HEAD `c654824e`:** `demo/shell/dock/Dock.vue`, `ActionBarToggle.vue`,
  `DockViewSelect.vue`, `DockStatusLamp.vue`, `status-lamp.ts`, `ColorInput.vue`,
  `layers/{ActionBarLayer,SlugEditLayer}.vue`, `menus/{ProfileSection,MobileMenuDropdown}.vue`,
  `composables/useDockAdminMode.ts`, `index.ts`, `demo/shell/PaneSegmentedControl.vue`,
  `demo/color-picker/App.vue`, `demo/styles/{shell,animations}.css`, `demo/ui/{button,select}/index.ts`.
- **Canon read:** `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`,
  `PALETTE-CONTRACT.md`, `reformation/waves/W46-W48.md` (the W47 spec).
- **Committed frames read (vision):** `visual/shots/safari-desktop-light/picker.png`,
  `safari-desktop-dark/blob.png`, `safari-mobile-dark/picker.png`.
- **Live telemetry:** six Playwright probes against the running dev server `http://localhost:9000`,
  WebKit **and** Chromium, at 1440×900 / iPhone 14 / 720×450 / 360×225 / 320×800, light + dark +
  `reducedMotion:reduce` + `forcedColors:active`. Probe sources are in the session scratchpad
  (`dockprobe{1..6}.mjs`); payloads are pasted inline below.
- **Harness rows:** `visual/REPORT.md` (60 captures) — MT-F003 (`h1` column all zero),
  MT-F004 (`smallTapTargets`), MT-F005 (`namelessButtons`).

### Two harness rows are measurement artifacts — recorded so the root does not chase them

**MT-F004's per-route dock contribution is not real.** The four sub-24px dock targets the harness
reports on *every* route/matrix cell are the `SlugEditLayer` controls (`160×23` unlabelled input,
three `22×22` buttons). They are inside an inactive dock face that is `visibility: hidden` **and**
`inert`, so they retain a layout rect but are absent from hit-testing and the a11y tree. The
harness's `vis()` predicate tests `getBoundingClientRect()` only, so hidden-but-sized elements
count. Measured:

```
$ node dockprobe2.mjs   # excerpt, desktop-light /#/
layer cls="grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer min-w-0"
      inert=true ah=null disp=grid vis=hidden op=0 pe=none rect={"w":447.5,"h":46} focusables=1
```

**MT-F005's one nameless desktop button is the same artifact** — `demo/shell/dock/ColorInput.vue:76-82`,
a bare `<button class="send-btn">` whose only child is an `ArrowRight` icon and which carries no
`aria-label`. It sits in the same hidden+inert sub-layer, which is why the count is desktop-only
(on mobile the sub-layer's grid column resolves to zero width). The *button is genuinely nameless*
— that is a real MINOR (D-19) — but it is not currently exposed, so it is not the shell-level
defect the root inferred.

The real shell-level defects are below, and they are worse.

---

## BLOCKERS

### D-1 · The dock is keyboard-unreachable on Safari. Only 1 of 4 controls is in the tab order.

Same DOM, same URL, two engines, opposite outcomes. Full-document sequential Tab walk from a blurred
start, 1440×900, `/#/`:

```
$ node dockprobe6.mjs
"chromium_walk": [
  "[BAND] button[ti=-] \"Select view\"",
  "[BAND] button[ti=0] \"Toggle action bar\"",
  "[BAND] button[ti=-] \"Login\"",
  "[BAND] button[ti=-] \"@mbabb\"",
  "[page] button[ti=-] \"Select color space\"",  ...
]
"webkit_walk": [
  "[BAND] button[ti=0] \"Toggle action bar\"",
  "[page] span[ti=-] \"l component value\"",
  ... (never returns to the band)
  "BODY",
  "[BAND] button[ti=0] \"Toggle action bar\""     <- the whole cycle, one dock stop
]
```

The discriminator is exact and is printed in the payload: **every control WebKit reaches carries an
explicit `tabindex` attribute; every control WebKit skips has none.**

```
"webkit_attrs": {
  "selectView": { "ti": null,  "role": "combobox" },   <- SKIPPED
  "toggleAB":   { "ti": "0" },                          <- reached
  "login":      { "ti": null },                         <- SKIPPED
  "mbabb":      { "ti": null }                          <- SKIPPED
}
```

This is Safari's default *"Press Tab to highlight each item on a webpage" = off* behaviour: a bare
`<button>` is not in Safari's default sequential focus order. The one dock control that survives
does so **by accident** — `ActionBarToggle.vue:90` sets `:tabindex="visible ? 0 : -1"` for an
entirely unrelated reason (suppressing the collapsed presence slot).

Mobile is worse (`dockprobe5.mjs`, iPhone 14):

```
"mobile_tabwalk": [ "[BAND] button \"Picker\"", "[page] span \"l component value\"", ... ]
```

The **only** keyboard-reachable dock control on Safari mobile is the `PaneSegmentedControl` tab that
`W46-W48.md` (W47 §Work 4) orders deleted. `Select view` and `Menu` are unreachable.

**Why this is a design defect and not a stray attribute.** `VISUAL-CONSTITUTION.md §5.2` names the
mechanism the dock was supposed to be:

> | horizontal Dock/rail roving focus | Right moves to the visual-right item; Left to visual-left | Home=first semantic item, End=last; activation is separate from movement |

`Dock.vue` contains no `keydown` handler, no `tabindex` management, no roving state, no `Home`/`End`
handling — the string `tabindex` does not appear in the file. A roving rail assigns an explicit
`tabindex="0"` to the active item and `-1` to the rest *by construction*, which is precisely the
attribute Safari requires. The absent design **is** the defect; the Safari symptom is its shadow.

**Severity BLOCKER.** Safari is the audit's declared engine and the only engine on iOS. The app's
primary navigation, account control and share affordance are keyboard-inoperable there.

**Cure (architectural, not a patch):** promote the dock's main layer from a `flex` row of unrelated
controls to a single named rail owning §5.2's roving focus — one `tabindex="0"` item, arrow/Home/End
movement, activation separate from movement. This is a glass-ui `DockLayer` capability (the producer
already owns `rail-start` in its class list), so it belongs upstream as a `roving` mode, not as
per-instance `tabindex` sprinkling in `Dock.vue`.

---

### D-2 · On two member routes the dock names no route at all — and paints them gold for a user with no admin rights.

```
$ node dockprobe3.mjs   # .view-select-trigger, desktop 1440, light
"/#/":          { "text": "Home",     "rect": {"w":106.9}, "dockRing": "oklch(0.470927 0.188343 9.83)",  "goldDescendants": 0 }
"/#/palettes":  { "text": "Palettes", "rect": {"w":121.0}, ... "goldDescendants": 0 }
"/#/gradient":  { "text": "Gradient", "rect": {"w":128.1}, ... "goldDescendants": 0 }
"/#/atmosphere":{ "text": "",         "rect": {"w":60.0},  "dockRing": "light-dark(oklch(0.751 0.147 84.2), oklch(0.784 0.143 86.0))",
                  "iconClass": "...sparkles w-6 h-6 shrink-0 gold-shimmer-icon", "goldDescendants": 1 }
"/#/blob":      { "text": "",         "rect": {"w":60.0},  "dockRing": "light-dark(oklch(0.751 0.147 84.2), ...)",
                  "iconClass": "...droplets w-6 h-6 shrink-0 gold-shimmer-icon", "goldDescendants": 1 }
```

Visible in the committed frame `visual/shots/safari-desktop-dark/blob.png`: where every other route
shows *icon + word*, `/#/blob` shows a bare **gold** droplet glyph and nothing else. The trigger
collapses 106.9px → 60px.

Two independent causes, both in the dock's own composable:

1. `composables/useDockAdminMode.ts:24` files `atmosphere` and `blob` inside `adminViews`.
   `VISUAL-CONSTITUTION.md §3.1` lists both as ordinary **member routes**, peers of Picker and
   Gradient, each with its own binding composition.
2. `useDockAdminMode.ts:52-56` flips `isAdminMode` on arrival at any `adminViews` member with **no
   authentication check**:

   ```ts
   watch(() => viewManager.currentView.value, (view) => {
       if (adminViews.includes(view)) { isAdminMode.value = true; }
   });
   ```

   `viewEntries` *is* auth-gated (line 32), so the option list stays the seven user views — and
   `blob` is not in it, so `<SelectValue>` (`DockViewSelect.vue:87`) finds no matching option and
   renders empty. `isAdminMode` is **not** auth-gated, so `Dock.vue:277` and `DockViewSelect.vue:70,80`
   paint `gold-shimmer-icon` + `--dock-ring: var(--color-gold)` regardless.

The result is a state lie in both directions at once: the identity control is blank on the route it
exists to name, and the app's "elevated authority" signal fires for a session that has none.
`VISUAL-CONSTITUTION.md §7` (Admin): *"Elevated authority is communicated by labeling and scope, not
by a fourth visual system."* `§4.1`: *"Selected, failed, pending, withdrawn and disabled states are
never color-only."*

`W46-W48.md` W47 §Current RED already booked this — *"Direct hash transitions can leave a one-icon
dock"* — and it is still RED, now with gold on it.

**Severity BLOCKER.** With `h1 = 0` app-wide (D-3), this trigger is the *only* place the product
states what route you are on. On two of eleven member routes it states nothing.

**Cure:** delete the admin/user view partition entirely. Eleven member routes are eleven first-class
dock destinations (W47 §Work 1). Admin is a *scope*, expressed as a labelled section of one menu,
never as a mode that swaps the navigation model out from under the user.

---

### D-3 · `h1 = 0` on every route, in every matrix. The dock took the route-naming job and never handed the document a heading.

```
$ node dockprobe2.mjs   # h1 count + heading inventory
desktop-light  h1=0  headings: ["H2:Basic Information","H2:Components","H2:Key Properties", ...]
desktop-dark   h1=0  (same)
mobile-light   h1=0  headings: []
desktop-320    h1=0  headings: []
```

`visual/REPORT.md` confirms it independently: the `h1` column is `0` for all sixty captures. On
mobile the document contains **zero headings of any level**; on desktop the first heading is an `H2`
inside a pane body.

The dock is the causal party, not merely a bystander. `App.vue:26-44` gives the shell a
`<nav class="dock-band" aria-label="Application navigation">` and `App.vue:47` a
`<main aria-label="Color tool panes">` — and stops. The route's name lives only inside
`DockViewSelect`'s `<SelectValue>`, i.e. inside a `<button>`, desktop-only, and (per D-2) sometimes
empty. Three canon clauses fall with it:

- `§4.1`: *"Each route has one H1 and exactly one stable main landmark, owned by the shell."*
- `§5.1`: the entire focus/announcement table routes to *"destination H1 with temporary
  `tabindex="-1"`"* for `Dock/global in-app route choice`, and to *"destination H1"* for
  Back/Forward, redirect and post-command navigation. **Four of seven rows target a node that does
  not exist**, so the dock's own navigation contract is unimplementable as written.
- `W46-W48.md` W47 completion evidence: *"First/middle/terminal/reversal frames each expose
  main/H1/active-route-subtree counts all = 1"*. `main = 1` passes; `H1 = 1` is RED and the wave
  never measured it.

**Severity BLOCKER.** **Cure:** the shell owns one stable `<h1>` bound to the same `viewManager`
record the dock trigger reads, and the dock's route choice moves focus to it. One route record, two
consumers — not a name that exists only as button text.

---

## MAJORS

### D-4 · The retired global `PaneSegmentedControl` is still mounted in the dock, with its forbidden descendant correction.

`Dock.vue:197-204` renders `<PaneSegmentedControl>` inside `div.dock-mobile-panes`, bound to
`viewManager.mobilePaneIndex`. Visible in `safari-mobile-dark/picker.png` as the `Picker | About`
pill in the middle of the dock. Three clauses forbid it:

- `§4.2`: *"V retires the global Dock `PaneSegmentedControl` and left/right view state. P092
  survives only at owner-state, Admin Names state and Mix Colors/Palettes source-mode tabs."*
- `§3` law 6: *"…no global pane selector, left/right split state, or simultaneous two-stage
  miniature survives."*
- W47 §Work 4 / completion: *"Global `PaneSegmentedControl`/view-state/descendant-correction counts
  `1→0`."*

The named "descendant correction" is live too — `PaneSegmentedControl.vue:46-51` reaches into the
producer with `:deep(.segmented-tab) { padding: …; font-size: … }`. Count is `1`, not `0`.

Compounding: per D-1 this is the **only** keyboard-reachable dock control on Safari mobile.

### D-5 · The route menu has no selected marker at all — the current route has a zero-pixel state delta.

Menu opened on `/#/`, all seven options read:

```
$ node dockprobe3.mjs  # "menuOpen"
{ "text":"Home",     "ariaSelected":"true",  "dataState":"checked",   "dataHighlighted":false,
  "fontWeight":"400", "bg":"rgba(0, 0, 0, 0)", "color":"rgb(28, 25, 23)", "markers":0 }
{ "text":"Palettes", "ariaSelected":"false", "dataState":"unchecked", "dataHighlighted":false,
  "fontWeight":"400", "bg":"rgba(0, 0, 0, 0)", "color":"rgb(28, 25, 23)", "markers":0 }
... (Browse / Extract / Mix / Generate / Gradient identical)
```

Identical weight, identical background, identical ink, zero marker elements. Confirmed by vision in
`chD-menu-open.png`: "Home" is indistinguishable from "Browse". The selected state exists **only in
the accessibility tree**.

Cause: `DockViewSelect.vue:97` and `:127` pass `hide-indicator` to every `SelectItem`, and the
`P4-R4 (T-40a)` comment at lines 99-109 deliberately retired the `font-semibold` marker on the
reasoning that *"selection speaks reka's `aria-selected` + the producer's glass-quiet
highlighted-on-open row"*. The measurement refutes the second half: `dataHighlighted` is **false**
on the selected row when the menu opens. Nothing replaced what was deleted.

`§4.1` — *"Selected … states are never color-only"* (here they are not even color). `§4.2` and
`PROPORTION-AUDIT.md` law 14 both require `hide-indicator` deleted and the producer's own
indicator gutter consumed, with *"exactly one visible marker [agreeing] with the option and
`aria-selected`"*. The law was written for `ColorSpaceSelector`; the dock's route menu is the same
species and is further from compliance.

### D-6 · Two names for one route, both on screen at once.

`safari-mobile-dark/picker.png` shows a **house glyph** (dock trigger, view id `picker`, label
`Home`) and, 40px to its right, a segmented tab reading **`Picker`**. `VISUAL-CONSTITUTION.md §3.1`
names the member `Picker`. `dockprobe3.mjs` confirms the trigger text is literally `"Home"`.

`PROPORTION-AUDIT.md` PR-16 rules on exactly this: *"Retain one route-identifying control; remove
redundant home when Picker text routes."* Today the product ships three names for one destination
and renders two of them simultaneously on a 390px band.

### D-7 · At 200% browser zoom the desktop dock silently becomes the mobile dock and the route label vanishes.

```
$ node dockprobe3.mjs
"zoom200": { "vw":720, "vh":450, "band":{"h":72}, "trigger": { "text": "", "w": 56.0 },
             "bandShareOfViewportHeight": 0.16 }
"zoom400": { "vw":360, "vh":225, "band":{"h":72}, "trigger": { "text": "", "w": 56.0 },
             "bandShareOfViewportHeight": 0.32, "mainH": 113.0 }
```

`Dock.vue:71` — `const isDesktop = useMediaQuery("(min-width: 1024px)")` — is keyed on raw CSS
viewport width, which browser zoom *divides*. At 200% zoom on a 1440px display the CSS viewport is
720px, so `isDesktop` goes false: `DockViewSelect.vue:87`'s `<SelectValue v-if="isDesktop"/>` drops
the route name, `ActionBarToggle.vue:96`'s label drops, `ProfileSection`'s account section
(`hidden lg:flex`) disappears, and the mobile `PaneSegmentedControl` + `⋮` appear. A zoomed desktop
user is served an interface for a device they are not using, and loses the one string that names
where they are.

`PROPORTION-AUDIT.md §2 clause 2` and `§3.2` both mandate an *"actual 400% browser-zoom"* arm and
explicitly warn: *"The 400% arm is the live routed page at actual in-app Browser zoom, not a
substituted CSS-width or responsive-emulation frame."* The dock's single width query cannot tell the
two apart, so it cannot satisfy that arm by construction.

Second-order: at the 400% arm the fixed `--dock-band-min-h` band consumes **32% of the viewport
height** (72px of 225) while `main` gets 113px. The band is the one region in the shell that never
responds to available height.

### D-8 · The desktop edit state is half-designed: it seizes the dock and shows nothing.

`Dock.vue:72-73`:

```ts
const mobileEditActive = computed(() => !isDesktop.value && !!editTarget);
const anyEditActive    = computed(() => !!editTarget);
```

`anyEditActive` (breakpoint-agnostic) drives two visual commitments — it is a term of
`shouldKeepOpen` (line 86, forcing `dockRef.keepOpen()`) and it fires `dockRef.expand()` (line 89).
But the layer that actually renders Save/Cancel is `id="mobile-edit"`, and the dispatcher at
lines 111-114 selects it only from `mobileEditActive`. On desktop, therefore, an active edit target
**pins the dock open and expanded indefinitely while displaying the ordinary navigation layer** —
no commit, no cancel, no indication that an edit is pending. The dock is held hostage by a state it
declines to render. A state with a visual consequence and no visual representation is a design
defect, not an implementation gap.

### D-9 · One menu, two divergent implementations — and admin can log out on neither breakpoint.

`menus/ProfileSection.vue` (181 lines) and `menus/MobileMenuDropdown.vue` (115 lines) are two
hand-maintained copies of the same information architecture: slug label, Copy slug, Switch account,
Logout, Regenerate slug, the `@mbabb` avatar block, Share color, GitHub, Dark mode. They have
already drifted, and the drift is in the authority state:

| state | desktop (`ProfileSection.vue`) | mobile (`MobileMenuDropdown.vue`) |
|---|---|---|
| signed in | full menu, 4 items + separator | same 4 items, **no separator grouping** |
| admin | `:95-99` a **non-interactive `<span class="slug-pill … gold-shimmer">admin</span>` — no menu at all** | `:65-69` a `DropdownMenuLabel` in `--muted-foreground`, **no logout item** |
| signed out | `Login` Button | `Login` menu item |

An authenticated admin has **no logout affordance on either breakpoint**. The same state also wears
two different visual treatments (gold shimmer vs muted grey) depending on viewport width — the same
authority, two identities. `§4.1` requires state truth; PR-16 requires the `…` to keep *"a named
menu purpose plus expanded state"*, and the desktop admin branch has no menu to name.

### D-10 · Gold is a fourth visual system, and it is the only carrier of admin state.

Sites: `Dock.vue:277` (`isAdminMode && 'gold-shimmer-icon'` on the seal ink),
`DockViewSelect.vue:70` (`--dock-ring: var(--color-gold)`), `:80` (trigger icon),
`:134-135` (menu row), `ProfileSection.vue:96` (`--color-gold` inline). Measured live on `/#/blob`:
`dockRing: light-dark(oklch(0.751 0.147 84.2), oklch(0.784 0.143 86.0))`, `goldDescendants: 1`.

`§7` (Admin): *"Elevated authority is communicated by labeling and scope, not by a fourth visual
system."* `§2`: *"Seed tint is forbidden outside the ambient field, active accent,
WatercolorDot/specimen, and pastel Palettes lanes"* — gold is none of those and appears in the
structural-glass tier. `§4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only"* — on `/#/blob` gold is the **only** signal, because the label is empty (D-2).

`DockViewSelect.vue:44-45` argues gold is a "sanctioned exception … mode identity, not a hue turn."
The exception does not survive `§4.1`: mode identity still needs a name and a state, not a hue.

### D-11 · The dock's only authentication surface computes four error messages and renders none.

```
$ grep -rn "slugError" demo/shell/dock/layers/SlugEditLayer.vue
13: const slugError = ref("");
18:     slugError.value = "";
43:     slugError.value = "";
49:             slugError.value = "Already signed in.";
59:         if (msg.includes("409")) slugError.value = "Already signed in.";
60:         else if (msg.includes("404")) slugError.value = "Slug not found.";
61:         else if (msg.includes("429")) slugError.value = "Too many attempts.";
62:         else slugError.value = msg || "Login failed";
```

Six writes, **zero reads** — the identifier does not appear in the `<template>`. A failed login in
the dock produces no visible or announced feedback of any kind: the input keeps its text, the
spinner stops, nothing else changes.

The same layer has no label either: `SlugEditLayer.vue:81-87` is a bare `<input>` whose only
descriptor is `placeholder="enter slug or token..."` (measured `160×23`, accessible name empty).
`§4.1`: *"Selected, failed, pending, withdrawn and disabled states are never color-only. Role,
accessible name, state/value and associated error/status are explicit."* Loading is handled
(`Loader2`, line 97); error and label are not.

### D-12 · The before/after edit pair has no accessible name and one of its three parts is unconditional.

`Dock.vue:135-138`:

```html
<DockLayer id="mobile-edit" class="justify-center">
    <WatercolorDot v-if="editTarget" :color="editTarget.originalCss" tag="div" … seed="edit-original" />
    <span class="text-muted-foreground text-caption">&rarr;</span>
    <WatercolorDot :color="cssColorOpaque" tag="div" … seed="edit-new" />
```

Two data-bearing faces and a bare `&rarr;` entity. `§4.2`: *"Ornamental faces are aria-hidden;
data-bearing static faces remain present as noninteractive **named** list/text content."* These
depict the original and the replacement color — data — and are neither `aria-hidden` nor named. To
assistive tech the layer is "rightwards arrow" between two anonymous `<div>`s.

Structurally, the left face is `v-if`-gated while the arrow and the right face are not, so at the
moment `editTarget` clears (commit/cancel) the leaving crossfade frame renders an arrow pointing
from nothing. *(The crossfade frame itself is a hypothesis — I did not capture it; the conditional
asymmetry at lines 136-138 is measured source.)*

---

## MINORS

### D-13 · Per-instance inline color overrides where the design system owns the channel.

`Dock.vue:143` `<Check … :style="{ color: safeAccent }" />`; `ActionBarToggle.vue:95,96`
(`:style="{ color: accent }"` on both the icon and the label span); `DockViewSelect.vue:81-84`;
`ProfileSection.vue:63,74,116`; `MobileMenuDropdown.vue:49`. Owner edict 5 — *style at the
shadcn/glass root component level, never per-instance overrides*. Inline `style` is additionally the
one channel that cannot be re-mapped by scheme, by `@media (forced-colors: active)`, or by any
producer token — it is the hardest possible per-instance override.

### D-14 · A hand-rolled separator, with the producer's primitive already in the import line.

`DockViewSelect.vue:123` `<div class="border-t border-border my-1"></div>` — inside a `SelectGroup`,
between listbox options. `demo/ui/select/index.ts` exports `SelectSeparator` from the very module
this file already imports on line 4-6. Owner edicts 3 and 4.

### D-15 · Three spellings of one producer inside one 44-line script block.

`ProfileSection.vue:6` `@mkbabb/glass-ui/dock`, `:7` `../../../ui/button`, `:8`
`@mkbabb/glass-ui/dark`. `demo/ui/button/index.ts` is one line —
`export { Button } from "@mkbabb/glass-ui";` — a pure alias barrel. Owner edict 2 forbids alias
paths; edict 3 forbids the contrivance. Same pattern in `DockViewSelect.vue:3` vs `:4-6`.

### D-16 · A command masquerading as a listbox option.

`DockViewSelect.vue:124` emits `<SelectItem value="__admin_toggle__">` into the route listbox;
`useDockAdminMode.ts:66-69` intercepts the sentinel string. `§5` sets the grammar as
*select → tune → commit*, with *"Selection changes the active specimen without committing it."*
Here one row of a selection control performs an immediate mode mutation and a route change, and the
magic-string channel is a contrivance (edict 3). A mode switch is a named button, not a fake option.

### D-17 · `DockStatusLamp`'s comment asserts the opposite of its rule.

`DockStatusLamp.vue:66-69`:

```css
/* … The role + label stay in the accessibility tree (visually-hidden, not v-if'd). */
.lamp-label { display: none; }
```

`display: none` removes the element from the accessibility tree; `visually-hidden` (clip-rect) does
not. Below 1024px the lamp's `role="alert"` (`status-lamp.ts:47`, the loud dev-misconfig register)
and `role="status"` announce an empty string. The lamp itself is also `pointer-events: none`
(line 51) — an `alert` that can be neither read nor dismissed on a phone. *(Not observed rendering:
`resolveLampState` returned `null` in all six of my matrices — `lamp: null` — because availability
resolved healthy. Code-level finding.)*

### D-18 · The dock's navigation model and the constitution's route model disagree by four members.

`useDockAdminMode.ts:23-24`: `userViews` = 7 (`picker, palettes, browse, extract, mix, generate,
gradient`); `adminViews` holds `atmosphere` and `blob`. `§3.1`: *"The member-route inventory is
exactly `/`, `/palettes`, `/browse`, `/extract`, `/mix`, `/generate`, `/gradient`, `/easing`,
`/atmosphere`, `/blob`, and `/about`."* `/easing` and `/about` have **no dock affordance at all**
(`/about` exists only as a mobile pane tab, i.e. a pane, not a destination). W47 §Work 1 requires
*"eleven exact route records with a first-class Dock affordance each"*; today it is 7.

### D-19 · A genuinely nameless button in the dock's action bar.

`ColorInput.vue:67-82` — both branches are a bare `<button class="send-btn btn-interactive">` whose
only child is `<Loader2>` / `<ArrowRight>`, with no `aria-label`. The neighbouring
`ActionBarLayer.vue:129-131` control does carry one; this one was missed. Currently unexposed
(D-note above), but it becomes reachable the instant the user opens the action bar and cycles the
toolbar to input mode.

### D-20 · Type-jurisdiction breaks on the dock's control labels.

`§4` type matrix: *control or label → `text-small`, Plus Jakarta Sans, **non-bold***; Fira Code is
reserved for *value, code, or provenance*. `ProfileSection.vue:62` and `:114` give the `Profile` and
`Login` **controls** `class="… text-mono-small font-bold …"` — mono and bold, both forbidden for the
role. Visible in `safari-desktop-light/picker.png`: `Login` renders as bold monospace beside
`Tools` in the display serif. Three type families on one 40px band.

### D-21 · The dock is seed-tinted in the structural-glass tier, and its menu is transparent enough to be unreadable.

`§2`: *Structural glass — dock, header, primary plate — **neutral Clear-Ice/Smoke family***; *"Seed
tint is forbidden outside the ambient field, active accent, WatercolorDot/specimen, and pastel
Palettes lanes."* `§7`: *"every other Dock label is neutral in both schemes."*

Measured non-neutral dock labels: `Tools` (`ActionBarToggle.vue:96`, `:style="{ color: accent }"`,
accent = the live seed) and `Login`/`Profile` (`ProfileSection.vue:63,116`,
`:style="{ color: triggerInk, borderColor: triggerInk }"`, triggerInk = `chromeSafeCss(cssColorOpaque)`).
The constitution permits exactly one chromatic dock coordinate, the `Palettes` destination — which
is correctly implemented (`DockViewSelect.vue:116`, `palettes-ramp-text`; count = 1, confirmed in
`chD-menu-open.png`). The other two are not exceptions, they are leaks.

Optically, the frames bear it out. `safari-desktop-light/picker.png`: a pink pill on a magenta-pink
field, the whole band reading as a lighter smear rather than a distinct material tier.
`safari-desktop-dark/blob.png`: a warm taupe pill — not the *"restrained neutral pole"* dark chrome
is assigned. And in `chD-menu-open.png` the open route menu is transparent enough that the picker's
`20.0` headline and its spectrum handle read straight through the `Gradient` and `Generate` rows.
`§2`: *"Glass earns its blur by revealing live content; otherwise it is a neutral well."* A
navigation menu that reveals live content into illegibility has inverted the rule.

### D-22 · The most heavily specified composition in the file has never been observed rendering.

The wax seal — `Dock.vue:229-283` (55 lines of design prose) plus `:309-358` (three CSS rules with a
further 22 lines of law) — is roughly **22% of the file**. In all 60 committed capture frames and in
every one of my six live matrices (desktop light/dark, mobile, PRM, 320px, forced-colors, at t=3s
and again at t=10s with the pointer parked at 1400,860), `dock-layer--summary` measured
`inert=true`, `visibility=hidden`, `is-active=false`:

```
$ node dockprobe4.mjs
"t0":  { "summaryActive": false, "summaryInert": true, "summaryVis": "hidden" }
"t7s": { "summaryActive": false, "summaryInert": true, "summaryVis": "hidden" }
```

The seal's sole entry condition is a desktop collapse (`:collapse-delay="5000"`,
`:always-expanded="!isDesktop"` — line 132) that the audit could not produce. *(I did not prove the
collapse is unreachable — it is presumably hover-driven; the finding is the ratio of specified
design mass to observed surface, and that the tranche's visual record contains no frame of it.)*

Note the responsive law is also inverted: the **larger** the viewport, the more aggressively the
navigation hides. Mobile (358px band, no hover) is pinned always-expanded; desktop (1408px band, of
which the pill occupies 447.5px — 32%) is the one that collapses to a 40px dot.

---

## Motion — the one axis that largely holds

Recorded for completeness, since the brief asks.

- `.dock-settle` (`Dock.vue:301-303`) is tokenized: `animation: vj-settle var(--spring-snappy-duration)
  var(--spring-snappy)`, keyframe global in `demo/styles/animations.css:170-174`, transform-only
  (`scale(1) → 1.03 → 1`) — compositor-safe, forces no layout. Owner edict 6 satisfied.
- PRM is handled by the global guard (`animations.css:184-192`,
  `animation-duration: 0.01ms !important`). Because it shortens rather than removes, `animationend`
  still fires and `@animationend.self` (line 130) still clears `dockSettle` — no stuck class.
  Verified structurally; the `desktop-prm` matrix showed identical band geometry and layer states to
  `desktop-light`.
- `vj-morph` on the trigger icon and seal ink is transform/opacity only.
- The one soft spot: `Dock.vue:105` re-arms the settle inside a bare `requestAnimationFrame` with no
  PRM check. It is a single frame, not a loop, so it is not an instance of the PRM-RAF pattern —
  noted, not filed.

---

## What must change, in one sentence each

1. Make the dock a **rail** that owns `§5.2`'s roving focus — one explicit `tabindex="0"`, arrow /
   Home / End movement, activation separate from movement — upstream in glass-ui `DockLayer`, not as
   per-instance attributes here. (D-1)
2. Delete the `userViews`/`adminViews` partition; eleven member routes, eleven first-class dock
   destinations, admin as a labelled scope inside one menu. (D-2, D-18)
3. Give the shell one stable `<h1>` fed by the same `viewManager` record the dock trigger reads, and
   move focus to it on dock route choice. (D-3)
4. Delete `PaneSegmentedControl` and `mobilePaneIndex` from the dock and from `useViewManager`, with
   its `:deep()` correction. (D-4)
5. Delete `hide-indicator`; consume the producer's `SelectItem` indicator gutter so exactly one
   visible marker agrees with `aria-selected`. (D-5)
6. Branch on a capability, not on `min-width: 1024px` — or, better, design one dock that does not
   need the branch. (D-7)
7. Collapse `ProfileSection` + `MobileMenuDropdown` into **one** account menu with one admin state
   that includes logout. (D-9)
8. Render `slugError`, and label the slug input. (D-11)
9. Move every `:style="{ color: … }"` in the dock onto a producer token, and take `Tools` and
   `Login` back to neutral ink. (D-13, D-21)
