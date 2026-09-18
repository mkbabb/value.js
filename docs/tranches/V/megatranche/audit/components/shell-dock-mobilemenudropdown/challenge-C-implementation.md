# CHALLENGE-C — implementation · `demo/shell/dock/menus/MobileMenuDropdown.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context). The seat was spawned with an
explicit Opus 5 declaration and the served tier matches it. No inheritance, no undeclared seat.

---

## Subject and method

- Subject: `demo/shell/dock/menus/MobileMenuDropdown.vue` (115 lines), the `lg:hidden` overflow
  menu of the dock's main layer. Mounted unconditionally by `demo/shell/dock/Dock.vue:207-214`.
- Desktop twin for comparison: `demo/shell/dock/menus/ProfileSection.vue` (181 lines).
- Producer under it: `@mkbabb/glass-ui@7.0.0` — `DockTrigger` (`dist/dock.js:1211-1245`),
  `DropdownMenu*` (`dist/dropdown-menu-BlbnvMaZ.js`), `DropdownMenuTrigger`
  (`dist/DropdownMenuTrigger-ClIq8RJE.js`), over `reka-ui@2.9.9`.
- Live probes (read-only, `http://localhost:9000`), all committed beside this file in `probe/`:
  `mmd-probe1.mjs` (a11y + geometry, coarse pointer, 390×844), `mmd-probe2.mjs` (keyboard
  operability), `mmd-probe3.mjs` (`as-child` shape, keyboard activation, breakpoint orphan),
  `mmd-probe4.mjs` (orphan screenshots + focus restoration + slug-edit hand-off),
  `mmd-probe5.mjs` (logged-in branch, unguarded async, mutex swap).
- Screenshots produced by the probes: `probe/shot-mobile-menu-open.png`,
  `probe/orphan-1-mobile-open.png`, `probe/orphan-2-after-resize-1440.png`.

**Verdict: DEFECTIVE.** One BLOCKER (silent identity destruction), four MAJOR, two MINOR, one INFO.

---

## C-1 · BLOCKER · "Regenerate slug" is a fire-and-forget promise that destroys the user's identity with no error surface

**Defect.** `MobileMenuDropdown.vue:61` calls `@click="pm.onRegenerateSlug()"`. That is an `async`
function (`demo/palettes/useSlugMigration.ts:91`) whose zero-saved-palettes branch is a bare
`await deps.userRegenerate()` (`:102`) with no `try`. `userRegenerate` is
`demo/platform/auth/useUserAuth.ts:112-127`, which **clears `localStorage` and the persisted token
FIRST** (`:119-120`) and only then calls `createSession()` (`:123`) — which can reject on network
failure, and additionally throws by hand at `:124`. Nothing in the chain catches. The template
discards the returned promise. There is no `unhandledrejection` handler anywhere in `demo/`
(`grep -rn "unhandledrejection\|window.onerror" demo/` → 0 hits).

Net effect on any API failure: the user's slug is **already gone from storage**, the promise
rejects into the void, the menu closes, and **nothing is shown to the user**.

**Evidence** (`node probe/mmd-probe5.mjs`, mobile 390×844, `localStorage["palette-user-slug"]`
seeded, backend unreachable — the dev server's stock CORS-blocked config):

```
UNHANDLED REJECTIONS after 'Regenerate slug' = ["value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is targeting the cross-origin production API (https://api.color.babb.dev), whose CO"]
pageErrors = ["DevMisconfigError: value.js dev is MISCONFIGURED: …"]
visible feedback (any toast/alert/dialog)? = [ 'dev misconfigured — run `npm run dev`', '92.0%', '88.8', '20.0', '82.7%' ]
slug after = null
menu still open? = false
```

The only `[aria-live]`/`role=alert` string on the page is the dev-config banner (a dev-only
artifact of this harness, not a product error path); the four numbers are the picker readouts.
Production ships no such banner, so the production failure is **completely silent**.
`slug after = null` is the data loss: the local palette library keyed to that slug is orphaned.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/shell-dock-mobilemenudropdown/probe/mmd-probe5.mjs`
— seeds a slug, taps `[aria-label="Menu"]`, clicks the `Regenerate slug` row, reads
`window.__unhandled` and `localStorage`.

**Mechanism.** Fire-and-forget async in a template handler over a **non-total** port method whose
own implementation is destructive-before-confirming. Line `:58` (`pm.userLogout()`) has the same
shape and is saved only by `logout()` swallowing its own error internally — i.e. by luck, not by
design. The desktop twin has the identical call sites (`ProfileSection.vue:83`, `:87`).

**Proposed cure (gestalt, not patch).** The identity mutation does not belong in a menu row's
`@click`. Make the port method **total**: `useUserAuth.regenerate()` must not clear persisted
state until `createSession()` has resolved (register-then-swap, which is also what its own comment
claims it does: "transitions directly from old → new with no null gap"), and `onRegenerateSlug`
must return a discriminated result the session port surfaces. The menu row then binds a handler
that cannot reject. Fixing it at the row (`.catch(console.warn)`) would be exactly the masking
fallback edict 2 forbids.

---

## C-2 · MAJOR · `as-child` on the GitHub row is dead against glass-ui 7.0.0 — the link is keyboard-inoperable and visibly mis-laid-out

**Defect.** `MobileMenuDropdown.vue:92` writes `<DropdownMenuItem … as-child>` wrapping an
`<a href>`. glass-ui 7.0.0's `DropdownMenuItem` **declares no `asChild` prop and hardcodes
`as: "div"`**:

```js
// node_modules/@mkbabb/glass-ui/dist/dropdown-menu-BlbnvMaZ.js:189-231
name: "DropdownMenuItem", inheritAttrs: !1,
props: { disabled: {...}, textValue: {}, inset: {...}, class: {...} },   // ← no asChild
… u(b(x(d)), g(c.value, { as: "div", disabled: …, "data-slot": "dropdown-menu-item", … })
```

(Contrast `DropdownMenuTrigger-ClIq8RJE.js`, which *does* declare and forward `asChild`.) So the
attribute is filtered out entirely and the anchor stays **nested inside** the `role="menuitem"`
div.

**Evidence — DOM shape** (`mmd-probe3.mjs`):

```
(a) GITHUB ROW = { "tag": "DIV",
  "outerHTMLHead": "<div data-reka-collection-item=\"\" role=\"menuitem\" tabindex=\"-1\" data-slot=\"dropdown-menu-item\" class=\"dropdown-menu__item interactive-item glass-menu-row text-small gap-2 cursor-pointer\"><a href=\"https://github.com/mkbabb/value.js\" target=\"_blank\" rel=\"noopene",
  "attrs": ["data-reka-collection-item=","role=menuitem","tabindex=-1","data-slot=dropdown-menu-item","class=…"],
  "childAnchor": true, "anchorTabIndex": 0 }
```

No `as-child` attribute survives; the item is a DIV; the anchor is a child with `tabIndex 0`.

**Evidence — keyboard is dead, pointer works** (`mmd-probe3.mjs`, same run):

```
(b)  focusedRow = "GitHub" | popupsOpened = 0 | urlChanged = false | menuStillOpen = false
(b') tapActivation popups = 1
```

Arrow to the GitHub row, press **Enter**: the menu closes and **nothing opens** — reka's
`MenuItem` synthesises `currentTarget.click()` on the *div*, and clicking a parent div never
activates a child anchor. Tap the same row with a pointer: one popup opens (the click lands on
the anchor itself). **WCAG 2.1.1 Keyboard (Level A) failure.**

**Evidence — the visible consequence** (`mmd-probe2.mjs` row census, and
`probe/orphan-1-mobile-open.png`): every other row is 44 px tall with glyph and label on one
line; the GitHub row measures **55 px** because the anchor is `display:inline` while Tailwind
preflight makes the nested `<svg>` `display:block`, so the octocat is forced onto its own line
above a flush-left "GitHub" with no icon gutter. It is plainly visible in the screenshot.

```
{ role: "menuitem", text: "Share color", rect: [201,44] }
{ role: "menuitem", text: "GitHub",      rect: [201,55] }   ← +11px, broken row rhythm
{ role: "menuitem", text: "Dark mode",   rect: [201,44] }
```

**Reproduction.** `node probe/mmd-probe2.mjs` and `node probe/mmd-probe3.mjs`.

**Proposed cure.** This is a producer gap, so it is fixed producer-side (edict 4) and relayed to
the glass-ui BH inbox (standing relay edict): `DropdownMenuItem` gains the same `as`/`asChild`
forwarding its sibling `DropdownMenuTrigger` already implements. Consumer-side interim patching
(`window.open` on `@select`) would trade a Level-A keyboard failure for the loss of link
semantics — not a cure. The identical dead `as-child` sits at `ProfileSection.vue:158`; both
delete in one producer change.

---

## C-3 · MAJOR · The menu is CSS-hidden, not conditionally rendered — crossing the `lg` breakpoint while it is open orphans a floating menu and loses focus

**Defect.** `MobileMenuDropdown.vue:38` gates the whole component on the class `lg:hidden`, and
`ProfileSection.vue:48` on `hidden lg:flex`. Both components are therefore **always mounted**;
only paint is switched. The `DropdownMenuContent` is portalled to `<body>` and is not subject to
the trigger's `display:none`. `Dock.vue` already owns the real predicate — `isDesktop =
useMediaQuery("(min-width: 1024px)")` (`Dock.vue:72`), which it *does* pass to `DockViewSelect`
and `ActionBarToggle` — but not to these two.

**Evidence** (`mmd-probe3.mjs` / `mmd-probe4.mjs`): open the menu at 390 wide, resize to 1440.

```
ORPHAN STATE = {"menuRect":[215,285,0,4],"menuDataState":"open",
                "desktopProfileTriggerVisible":false,"hiddenTriggerWrapper":"none"}
(c) … triggerDisplay: "inline-flex", triggerRect: [0,0], triggerWrapperDisplay: "none",
    menuVisible: "visible", menuOpacity: "1"
```

A 215×285 glass menu, `data-state="open"`, `opacity: 1`, pinned at **(0, 4)** — the top-left
corner of a 1440 px desktop viewport, nowhere near the dock — because floating-ui is anchoring to
a **0×0 `display:none`** reference element. See `probe/orphan-2-after-resize-1440.png`: the menu
floats over the header while the dock itself sits collapsed at top-centre.

**Evidence — focus restoration is lost.** Pressing Escape on the orphan:

```
  t+50ms:   {"menuPresent":true,  "active":"DIV.dropdown-menu-content …","isBody":false}
  t+200ms:  {"menuPresent":true,  "active":"DIV.dropdown-menu-content …","isBody":false}
  t+600ms:  {"menuPresent":false, "active":"BODY.relative","isBody":true}
  t+1200ms: {"menuPresent":false, "active":"BODY.relative","isBody":true}
```

reka's `onCloseAutoFocus` calls `.focus()` on a trigger inside a `display:none` wrapper — a no-op
— so focus falls to `document.body`. A keyboard user is dumped to the top of the document.
**WCAG 2.4.3 / 2.4.11.**

**Reproduction.** `node probe/mmd-probe4.mjs` (writes both screenshots).

**Mechanism.** Responsive *branching* expressed as responsive *painting*. Two full menu subtrees,
two `useSafeAccentFn` consumers and two mutex participants exist at every breakpoint; only one is
ever legitimate.

**Proposed cure.** Hoist the branch to the one place that already knows it:

```
<MobileMenuDropdown v-if="!isDesktop" … />
<ProfileSection      v-if="isDesktop"  … />
```

and delete the `lg:hidden` / `hidden lg:flex` class pair from both roots. The mutex entry must be
released when its owner unmounts (an `onUnmounted` release in `usePopupMutex`'s `popupModel`, or
`current` cleared when the owning key's component goes) so the dock's `shouldKeepOpen` hold
(`Dock.vue:85`) cannot latch on a dead popup. This also halves the always-mounted menu surface.

---

## C-4 · MAJOR · "Dark mode" is a boolean toggle rendered as a stateless command

**Defect.** `MobileMenuDropdown.vue:101-111` renders the dark-mode toggle as a plain
`DropdownMenuItem` with `@select.prevent @click="toggleDark()"`, and carries state **only** in a
Moon/Sun glyph that is explicitly `aria-hidden="true"` (`:108-109`). Because `@select.prevent`
keeps the menu open, there is no close event either — an AT user activating the row receives
**no signal whatsoever** that anything changed.

**Evidence** (`mmd-probe1.mjs`, open-menu item dump):

```
{ "role": "menuitem", "text": "Dark mode", "ariaChecked": null, "ariaPressed": null,
  "ariaLabel": null, "tabindex": "-1", "rect": [201,44], "tag": "DIV" }
```

`aria-checked: null`, `aria-pressed: null`. **WCAG 4.1.2 Name, Role, Value.** The SFC's own
comment block (`:102-107`) reasons carefully about why glass-ui's `DarkModeToggle` cannot nest
here, and then never supplies the state channel the nesting would have provided.

**Reproduction.** `node probe/mmd-probe1.mjs`.

**Proposed cure.** The primitive already exists and already carries the name: glass-ui exports
`DropdownMenuCheckboxItem` (`dist/dropdown-menu-BlbnvMaZ.js:235`, re-exported through
`demo/ui/dropdown-menu`). Use it — `:model-value="isDark"`, `@select.prevent`,
`@update:model-value="toggleDark()"` — which stamps `role="menuitemcheckbox"` + `aria-checked`
and renders the producer's own indicator. Edict 4 satisfied (existing component-type name, no new
primitive), edict 3 satisfied (no wrapper invented). Same fix at `ProfileSection.vue:167-177`.

---

## C-5 · MAJOR · The `@mbabb` identity block is an ARIA-invalid child of `role="menu"` and its link is pointer-only

**Defect.** `MobileMenuDropdown.vue:79-87` places a bare `<div>` — containing an `<a
href="https://github.com/mkbabb">` — as a **direct child of `role="menu"`**. The `menu` role owns
only `menuitem` / `menuitemcheckbox` / `menuitemradio` / `group` / `separator`. reka's menu
`FocusScope` `preventDefault()`s Tab inside the content and its roving tabindex only visits
`[role=menuitem]`, so a natively-focusable anchor placed outside that set becomes unreachable.

**Evidence** (`mmd-probe2.mjs`, menu opened **with the keyboard** — focus trigger, press Enter):

```
after Enter  -> {"tag":"DIV","role":"menuitem","text":"Login", …}
ArrowDown x8 -> ["Share color","GitHub","Dark mode","Dark mode","Dark mode","Dark mode","Dark mode","Dark mode"]
Tab x4       -> ["Dark mode","Dark mode","Dark mode","Dark mode"]
```

Arrow keys visit exactly the four `menuitem`s; Tab never moves at all. The row census confirms the
offending node:

```
{ "tag":"DIV", "role": null, "text":"@mbabbColor space picker", "rect":[201,50], "display":"flex" }
```

`role: null`, 50 px tall, sitting between a `separator` and a `menuitem`. Its link and its
`Color space picker & converter` byline are invisible to the menu's AT contract and unreachable
by keyboard.

**Reproduction.** `node probe/mmd-probe2.mjs`.

**Proposed cure.** Either demote it to a `DropdownMenuLabel` (a permitted owned element — the slug
pill at `:46` already uses it) with the anchor reduced to text, or promote it to a real
`DropdownMenuItem` wrapping the anchor once C-2's producer fix lands. Not both, and not a new
wrapper component (edict 3).

---

## C-6 · MINOR · Desktop/mobile divergence: two separators and the admin gold-shimmer identity are missing from the mobile branch

The brief asked what desktop renders that mobile does not. Measured, on the logged-in branch
(`mmd-probe5.mjs`):

```
LOGGED-IN MENU rows: [ label(slug pill) · Copy slug 44 · Switch account 44 · Logout 44 ·
                       Regenerate slug 44 · separator · @mbabb 50 · Share color 44 ·
                       GitHub 55 · separator · Dark mode 44 ],  separators: 2
```

1. **No separator between `Logout` and `Regenerate slug`.** The desktop twin has one
   (`ProfileSection.vue:86`) — the destructive action is deliberately fenced off there and is
   flush against Logout here. Given C-1, that fence is not cosmetic.
2. **No separator between the `@mbabb` identity block and `Share color`.** Desktop has one
   (`ProfileSection.vue:153`). Visible in `probe/orphan-1-mobile-open.png`: a hairline above
   `@mbabb`, none below it, so the identity block reads as part of the action group.
3. **The admin pill loses its gold shimmer.** `MobileMenuDropdown.vue:67` renders
   `class="slug-pill cursor-default text-muted-foreground …"` with
   `style="border-color: var(--muted-foreground); color: var(--muted-foreground)"` — grey and
   static. `ProfileSection.vue:96` renders `class="slug-pill … gold-shimmer"` with
   `var(--color-gold)`. `.gold-shimmer` is a real animated glass-ui utility
   (`dist/styles/utilities/base-misc.css`: gold gradient + `background-clip: text` +
   `animation: metal-shimmer-sweep var(--duration-shimmer) linear infinite` under
   `prefers-reduced-motion: no-preference`). The owner's standing note is the *golden shimmer
   pill*; on mobile the admin identity signal is deleted, which is also edict 6 (animations are
   never deleted, only moved or tokenized).

Measured for the non-admin pill: `{"cls":"slug-pill whitespace-nowrap", "animation":"none"}` —
consistent with the class simply not being applied on this branch.

**HYPOTHESIS (not reproduced — the admin branch needs admin auth I do not have):** the desktop
twin's shimmer is *also* dead, by cascade. `.gold-shimmer` paints via
`background-clip: text; color: transparent`, but `ProfileSection.vue:96` sets
`style="… color: var(--color-gold)"` inline, and an inline declaration beats a class. The
animation would run while painting nothing but flat gold. Worth one probe from a seat with admin
credentials.

**Proposed cure.** The two menus are one menu with a breakpoint. A prior seat measured the fork at
**73 of 90 distinct non-blank lines shared, with the 619-character GitHub SVG `d` byte-identical**
(`DEFECT-LEDGER.md:13417`, `ProfileSection.vue:161` == `MobileMenuDropdown.vue:95`). Every finding
in this report except C-3 exists in both files precisely because they are a copy. Once C-3 lands
the `v-if` branch, the correct move is one `DockIdentityMenu` whose *content* is shared and whose
only difference is the trigger (`DockTrigger` vs `Button`) — not a new wrapper for its own sake
(edict 3), but the deletion of a duplicate.

---

## C-7 · MINOR · The file imports the same design system by two different paths

`MobileMenuDropdown.vue:6` and `:11` import `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/dock`
directly. `:10` and `:12` import `DropdownMenu*` and `Avatar*` through `../../../ui/dropdown-menu`
and `../../../ui/avatar` — which are **one-line pure re-exports of the same package**:

```
$ cat demo/ui/dropdown-menu/index.ts
export { DropdownMenu, DropdownMenuTrigger, … } from "@mkbabb/glass-ui";

$ for f in demo/ui/*/index.ts; do …; done
demo/ui/avatar/index.ts   lines=1 glassRefs=1
demo/ui/dropdown-menu/index.ts lines=1 glassRefs=1
…18 of 19 barrels are single-line glass-ui re-exports
```

An alias path kept alive alongside the real one, inside a single file. Edict 2 (no aliases, no
dual paths). Cure: import from `@mkbabb/glass-ui` throughout and delete `demo/ui/` — which prior
seats have already sequenced.

---

## C-8 · INFO · The `defineModel("open")` ↔ `usePopupMutex` round-trip is lossy but self-correcting; measured 276 ms swap latency

`open` (`MobileMenuDropdown.vue:32`) is a `defineModel` bound straight to reka's **fully
controlled** `DropdownMenu :open`, and the parent's setter is
`usePopupMutex.popupModel("mobile-menu")` (`Dock.vue:67`), whose `update()`
(`usePopupMutex.ts:40-69`) **refuses the write for 180 ms** when another popup is open. That is
exactly the shape of the repo's recorded `defineModel` stale-read hazard: the child writes `true`
and reads back `false` in the same tick.

I looked for the failure and it is not there. Measured (`mmd-probe5.mjs`): with the view-select
open, tapping ⋮ opens the menu after **276 ms** (180 ms `swapDelay` + mount/animation), not never:

```
view-select open? = true
mobile menu opened after swap in ms = 276
```

Mechanism of the rescue: glass-ui's trigger toggles on `pointerdown` and only calls
`preventDefault()` `if (open)` (`DropdownMenuTrigger-ClIq8RJE.js`); the refused write leaves
`open` false, so the native click is *not* suppressed, reka's own `onClick` fires a second
`onOpenToggle`, and the mutex's `clearSwapTimer()` on that second call promotes `pending` to
`current` immediately. Recorded because it is load-bearing and undocumented: whoever changes
either handler can silently break the ⋮ under a swap. No `shallowRef` cure is needed here.

---

## C-9 · MAJOR · Vacuous gate — this component has no tests at all

**Evidence.**

```
$ grep -rn "MobileMenuDropdown" test e2e                     → (no output)
$ grep -rn "Dark mode\|Share color\|Regenerate slug" test e2e → (no output)
$ grep -rn "dock-dropdown-trigger\|MoreVertical" e2e          → (no output)
$ ls test/*.test.ts | wc -l                                   → 19
$ grep -n "shell/dock" test/status-lamp.test.ts test/picker-blob-config.test.ts
  test/status-lamp.test.ts:41:} from "../demo/shell/dock/status-lamp";
  test/picker-blob-config.test.ts:16:  path.resolve(process.cwd(), "demo/shell/dock/ActionToolbar.vue"),
```

The only two vitest files that name `shell/dock` import a `.ts` helper and read a *different*
`.vue` file as text. No Playwright spec targets `[aria-label="Menu"]`; `e2e/smoke/mobile/walk.spec.ts`
drives the pane tabs and the color-space combobox and never opens the ⋮.

**The exact mutation that keeps every gate green:** replace the entire `<template>` of
`MobileMenuDropdown.vue` with `<template><div class="lg:hidden" /></template>`. `npm test`
(19 files) and the full e2e smoke suite stay green while the mobile overflow menu — login,
logout, slug management, share, dark mode — vanishes from every phone.

**Proposed cure.** One mobile-viewport spec that opens the ⋮ and asserts the operable contract:
each row reachable by ArrowDown, the dark-mode row exposing `aria-checked` that flips, the GitHub
row activating by **Enter** (which fails today — a born-RED gate for C-2), and focus returning to
the trigger on Escape.

---

## Negative proofs — hazards checked and NOT found

The brief named a specific hazard list. Recording what held, with the measurement:

| Hazard | Result |
|---|---|
| `defineModel` stale read | **Not present.** Lossy setter measured, self-corrects in 276 ms — see C-8. |
| Small tap targets | **Clean.** Trigger measures `rect [43,33]` CSS px, but `::after` under `pointer: coarse` measures `44px × 44px` (`"coarse": true`) — glass-ui's `touch-floor.css` hit extension. WCAG 2.5.8 met. |
| Nameless buttons (MT-F005) | **Zero from this component.** `REPORT.json` `safari-mobile-light /#/` → `a11y.namelessButtons: 0`; its `smallTapTargets` list contains no "Menu" entry. MT-F005's desktop-only button is `ColorInput.vue`'s `send-btn`, already root-caused at `DEFECT-LEDGER.md:11682`. The mobile branch renders no unnamed control. |
| `aria-labelledby` on the menu | **Correct.** `{"ariaLabelledby":"reka-dropdown-menu-trigger-v-3","labelledByResolves":true}`. |
| Focus hand-off to the slug editor | **Clean.** Clicking `Login` lands focus on the slug input and it *stays* there — measured at t+100 / t+400 / t+900 ms: `active: "INPUT.text-mono-small bg-transparent"`. No reka close-autofocus steal. |
| rAF loops / listeners / observers / timers | **None in this SFC.** Nothing to leak. `useGlobalDark()` is a `createGlobalState` singleton (`dist/dark-z_P5QwqI.js`), so the second call site (ProfileSection) adds no watcher. |
| WebGL / context loss | Not applicable — no canvas in this subtree. |
| `ValueUnit` nesting, oklch→HSV hue drift, reka slider pointer-capture | Not applicable — no color math, no slider, no pointer capture in this file. |
| `parseCssColor` crash class | Not reached directly; `cssColorOpaque` arrives pre-certified as `safeAccent` from `Dock.vue:209`, and `menuInk` is a lazy `computed` only evaluated while the slug label renders. |
| `verbatimModuleSyntax` | **Compliant.** The file has no type-only imports; nothing to violate. |
| Console/page errors at rest | **Zero.** `pageErrs = []`; the single console error is the harness's own dev-misconfig warning. |
| Horizontal overflow | **None.** Menu measured `overflowRight: -82` px at 390 wide. |

---

## Sequenced cure

1. **C-1** — make `regenerate()` register-then-swap and `onRegenerateSlug` total. Data loss first.
2. **C-3** — hoist the breakpoint to `v-if` in `Dock.vue`; release the mutex key on unmount.
3. **C-4** — swap the dark-mode row to `DropdownMenuCheckboxItem` (both branches).
4. **C-2** — producer change: `asChild` forwarding on glass-ui `DropdownMenuItem`; relay to the
   glass-ui BH inbox. Then **C-5** collapses into it.
5. **C-9** — land the born-RED mobile-menu spec; C-2's Enter assertion is its red gate.
6. **C-6 / C-7** — fold the 81 %-identical fork into one component and retire the `demo/ui` alias
   path, which deletes the separator drift and the lost gold shimmer by construction.

Nothing in this report was applied. No file outside
`docs/tranches/V/megatranche/audit/components/shell-dock-mobilemenudropdown/` was written.
