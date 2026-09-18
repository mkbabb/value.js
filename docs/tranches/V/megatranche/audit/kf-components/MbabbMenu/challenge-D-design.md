claude-opus-5[1m]

# CHALLENGE · MbabbMenu · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/MbabbMenu.vue` (121 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Prior:** the component is DEFECTIVE until the tree proves otherwise. Every claim below carries its own falsifier; a claim that fails its falsifier is withdrawn, not softened.

**Read whole (read-only):**

| file | why |
|---|---|
| `demo/app/dock/MbabbMenu.vue` | target |
| `demo/app/dock/index.ts`, `demo/app/App.vue:8–26,144,343–344` | mount site + `v-model:open` contract |
| `demo/components/instrument/shell/SharePopover.vue` (+`shell/index.ts`) | row-1 child |
| `demo/styles/style.css` (294), `demo/styles/design-idioms.css:105–130,210–240`, `demo/styles/layout.css:14`, `demo/styles/brand.css` | demo cascade + tokens |
| `glass-ui/src/components/dropdown-menu/{DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator}.vue` | primitives (producer 7.0.0 == installed 7.0.0) |
| `glass-ui/src/components/dock/DockTrigger.vue`, `dark-mode-toggle/DarkModeToggle.vue`, `avatar/{Avatar,AvatarImage}.vue` + `avatar/styles.css` | primitives |
| installed `node_modules/@mkbabb/glass-ui/dist/` → `glass-ui.css`, `components/dropdown-menu/styles.css`, `components/_shared/menu.css`, `styles/index.css`, `styles/typography/{semantic,utilities,scale}.css`, `styles/utilities/{base,a11y-overrides,btn}.css`, `styles/theme/bridges.css`, `styles/tokens*`, `components/dock/styles/controls/triggers.css` | the effective cascade |
| `node_modules/reka-ui/dist/Menu/{MenuItem,MenuItemImpl,MenuContentImpl}.js` | activation + roles |
| `node_modules/tailwindcss/index.css` (v4.3.0) | layer order of record |

**Hitherto corpus folded** (not re-invented): `formation/keyframes/lane-frontend.md` — **F-1** (glass-ui phantom dep), **§3.2** (root-barrel import surface), **§5 S-1..S-8** (bespoke→glass shadow census), **§6.3** (98 unprefixed demo tokens / **zero `--kf-*`**), **§6.5** (13 PRM sites). Contradictions and extensions are flagged inline.

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **D-1** | **BLOCKER** | glass-ui's dropdown CSS is **unlayered**; Tailwind utilities are in `@layer utilities`. Unlayered normal declarations outrank *every* layer. Nine of this component's utility classes are therefore **inert** — including `cursor-pointer` and `text-destructive` on the destructive row. |
| **D-2** | **BLOCKER** | `togglePpMode` is a boolean toggle rendered as a plain `DropdownMenuItem`: no `role=menuitemcheckbox`, no `aria-checked`, no visible checked mark. glass-ui ships `DropdownMenuCheckboxItem`, unimported. |
| D-3 | MAJOR | Rows 1 / 2 / 5 are **keyboard-dead menuitems** — `@select.prevent` with no `@click`; actuation lives in interactive children of `role="menuitem"`. |
| D-4 | MAJOR | Row 3's title+subtitle **collapses to one line** (`<span>` + `<a>`, both inline; Vue `condense` deletes the newline text node) while rows 1/4/5 stack. |
| D-5 | MAJOR | Leading-glyph column is **ragged 24 / 20 / 28 / 20 / 28 px** — the label column's left edge moves 8px between rows. |
| D-6 | MAJOR | `window.confirm()` guards the one destructive action, inside a design system that ships and already uses `Dialog*`. |
| D-7 | MAJOR | `text-admin-label` (10px, **uppercase**, mono, 0.1em tracking) is applied to four sentence-case prose strings. |
| D-8 | MAJOR | `--filter-brand-color` is a **static single-arm** filter; `--ppmycota-primary` is `light-dark()`. Mark and label diverge in dark mode. |
| D-9..D-16 | MINOR | ×8 — see §4 |
| D-17, D-18 | INFO | ×2 — see §5 |
| **S-A..S-D** | **SUPERLATIVE** | ×4 — PRM delegation, computed AA contrast in both themes, RTL-clean by construction, whole-cloth `DockTrigger` consumption. See §6. |

**18 defects · 2 blockers · 4 superlatives.**

---

## 1. The cascade fact everything in §2 rests on

Establish it once; D-1, D-9, D-17 all reduce to it.

**(a) Tailwind v4.3.0 puts every utility in a layer.** `node_modules/tailwindcss/index.css`:

```
@layer theme, base, components, utilities;
...
@layer utilities {
  @tailwind utilities;
}
```

That covers core utilities *and* `@utility`-registered ones (`text-mono-caption`, `text-admin-label`, `scale-on-hover`, `icon-lg`, …).

**(b) glass-ui's dropdown CSS is not in a layer.** `demo/styles/style.css:3` → `dist/styles/index.css` → `@import "../glass-ui.css"` — no `layer()` function. `glass-ui.css` contains exactly **one** `@layer components{…}` block, bytes 2548–18826 (verified by brace-matching). `.dropdown-menu__item` sits at byte **29522** — *outside* it:

```
$ python3 -c "s=open('glass-ui.css').read(); ..."
layer at 2531 dropdown at 29522 total 70109
layer block 2548 -> 18826 contains dropdown: False
```

Source-side confirmation: `dist/components/dropdown-menu/styles.css` opens with a bare comment then `.dropdown-menu__content, …{` — no `@layer` wrapper (contrast `avatar/styles.css`, `_shared/menu.css`'s `.glass-menu-row` half, and all 14 `dock/styles/*.css`, which **do** open `@layer components {`). It reaches the bundle via `DropdownMenu.vue:101` `<style src="./styles.css">`. The same file's `_shared/menu.css` splits: `.glass-menu-row` is inside `@layer components{…}`, but `.dropdown-menu-content{padding:var(--panel-padding);…}` is *after* the closing brace — unlayered.

**(c) CSS cascade §6.4.4: unlayered normal declarations sort last (highest).** Layer precedence is evaluated **before** specificity, so an unlayered `.dropdown-menu__item` (0,1,0) beats a layered `.py-1` (0,1,0) — and would beat a layered `.a .b .c` too.

The effective unlayered rule (`glass-ui.css`, byte 29522):

```css
.dropdown-menu__item,.dropdown-menu__sub-trigger{
  cursor:default; width:100%; color:inherit;
  font-size:var(--dropdown-text); user-select:none; outline:none;
  align-items:center; padding-block:.375rem; padding-inline:.5rem;
  display:flex; position:relative
}
.dropdown-menu__content{ z-index:var(--z-popover); min-width:var(--overlay-min-width); … }
```

**Falsifier for the whole section:** compute `getComputedStyle` on any `[data-slot="dropdown-menu-item"]` in a built demo. If `cursor` resolves `pointer` on the Clear row, or `color` resolves `--destructive`, (b) or (c) is wrong and D-1 / D-9 / D-17 die together. A second falsifier: a glass-ui release that wraps `dropdown-menu/styles.css` in `@layer components` inverts every row of the table below (and *arms* D-9).

---

## 2. BLOCKERS

### D-1 · BLOCKER — nine utilities on this component are inert; two of them are the destructive row's only affordances

`MbabbMenu.vue:6,8,18,29,46,57`

| authored | file:line | competing unlayered decl | winner | delta |
|---|---|---|---|---|
| `cursor-pointer` | `:29`, `:46` | `cursor:default` | **glass** | **actionable rows show the default arrow** |
| `text-destructive` | `:46` | `color:inherit` | **glass** | **the destructive row is not red** |
| `min-w-[var(--dock-panel-width)]` (17rem, `layout.css:14`) | `:6` | `min-width:var(--overlay-min-width)` = **8rem** | **glass** | panel floor is 8rem, not 17rem |
| `z-modal` (140) | `:6` | `z-index:var(--z-popover)` = **130** | **glass** | see D-9 |
| `px-1.5` (.375rem) | `:8,18,29,46,57` | `padding-inline:.5rem` | **glass** | 8px inset, not 6px |
| `py-1` (.25rem) | same | `padding-block:.375rem` | **glass** | moot for height (`.glass-menu-row` sets `min-block-size:max(2rem,2.75rem)`) |
| `flex`, `items-center` | same | `display:flex`, `align-items:center` | tie | dead weight (D-16) |
| `p-1.5` | `:6` | `padding:var(--panel-padding)` = .375rem | **glass** | numerically equal → no visual delta (D-17) |

Two of these are not cosmetic:

1. **`text-destructive` never paints.** Line 46 is the only destructive-tinted surface in the menu. `style.css:114–119` designates `--accent-red`/`--destructive` "DESTRUCTIVE-ONLY … marks destructive / error surfaces (Clear-all, delete, error toasts) and NOTHING else" — i.e. the demo's own design law names this exact row, and the row does not obey it. The `<p>` at `:50` carries `text-muted-foreground`, which *does* land (no unlayered `color` rule reaches a `<p>` descendant), so the subtitle is muted while the title is plain body ink: the row reads as ordinary chrome. The single most dangerous command in the menu — `resetAllStores()` + `location.reload()` — is visually indistinguishable from "Share".
2. **`cursor-pointer` never lands** on either of the two rows that *are* click targets (`:29`, `:46`), while the three rows that are *not* click targets look identical. The cursor is the primary hover-time affordance in a menu whose rows are otherwise uniform; here it is uniformly wrong.

Corroboration that the unlayered rule is the winner: glass-ui's **own** `@layer components` hover rule `.glass-menu-row:hover{color:var(--accent-foreground)}` (`_shared/menu.css`) is defeated by the same `color:inherit`. The vendor loses to itself; the consumer cannot win from `demo/` without an unlayered override, and `grep -rn "dropdown-menu__\|glass-menu-row\|interactive-item" demo/ --include=*.css --include=*.vue` returns **nothing** — no such override exists.

**Relation to corpus:** lane-frontend §6.3 named "98 unprefixed demo custom properties sharing a global namespace with glass-ui's — a collision surface worth a lane of its own" and recorded **zero `--kf-*` tokens**. This is the *class*-name half of that same flat-namespace hazard, and it is worse than the token half: token collisions resolve by cascade order, class collisions here resolve by **layer**, which the demo cannot reach. The prompt's "flat `--kf-*` namespace hazard" is real but the sharper instance is `.dropdown-menu__*` vs `@layer utilities`.

**Severity rationale (BLOCKER):** a destructive, irreversible, non-undoable action rendered with neither its designated color nor a pointer cursor, in a menu where the author explicitly wrote both.

**Falsifier:** §1's falsifier. Additionally — if `--destructive` happened to equal `--popover-foreground` the visual half would be moot; it does not (`--destructive: light-dark(hsl(0 72% 50%), hsl(0 80% 60%))` vs `--popover-foreground: var(--foreground)` = `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))`).

---

### D-2 · BLOCKER — a boolean toggle with no checked semantics and no checked state

`MbabbMenu.vue:29–40` + `:98–101`

```
29:  <DropdownMenuItem @select.prevent class="… cursor-pointer" @click="togglePpMode">
98:  function togglePpMode() {
99:      const stored = getStoredAnimationGroupControlOptions(props.superKey);
100:     stored.value.ppMode = !(stored.value.ppMode ?? false);
101: }
```

The row flips a persisted boolean and renders **nothing** that depends on it. Consequences, all source-decidable:

- **No accessible state.** `reka-ui/dist/Menu/MenuItemImpl.js:63–64` emits `role:"menuitem", tabindex:"-1"`. `menuitem` has no checked state in the ARIA model; a screen-reader user hears "ppmycota, menu item" before and after activation, identically.
- **No visible state.** No indicator, no `data-[state=checked]` style, no tint. `.dropdown-menu__indicator` and the `[data-indicator="start"|"wide"]` padding hooks exist in the shipped stylesheet (`dropdown-menu/styles.css`) precisely to seat a checkmark — unused here.
- **The correct primitive is on disk.** `dist/components/dropdown-menu/DropdownMenuCheckboxItem.vue.d.ts` and `DropdownMenuRadioItem.vue.d.ts` ship in the installed 7.0.0. lane-frontend §3.2 enumerates the demo's root-barrel draw: `DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator` — **`DropdownMenuCheckboxItem` is absent from the entire demo** (`grep -rn "DropdownMenuCheckboxItem" demo/` → no output).
- **Fires-and-vanishes is not a mitigation.** `@select.prevent` at `:29` keeps the menu open after activation (`MenuItem.js` `handleSelect`: `if (itemSelectEvent.defaultPrevented) … else rootContext.onClose()`), so the user is left staring at the row that just changed something, with the row unchanged. If the menu closed, at least the scene would be the feedback; it does not.

The same critique applies one row up (`:18–24`, "Dark mode") — that one at least delegates state to `DarkModeToggle`, whose `aria-pressed` is real (`DarkModeToggle.vue:31`) and whose sun/circle SVG is a visible state indicator. ppmycota has neither.

**Corpus extension:** this is a new row for the lane-frontend §5 shadow census — call it **S-9 · `DropdownMenuItem`-as-toggle → `DropdownMenuCheckboxItem`, RED**. Unlike S-1 it is not a fork of 217 lines; it is a *primitive under-reach* (§3.1's "21 of 73 subpaths" pathology at component granularity). Cost: ~3 lines.

**Severity rationale (BLOCKER):** a stateful control that renders no state is not a control; the user's only recovery is to fire it again and watch the scene, which is exactly the trial-and-error the pattern exists to prevent.

**Falsifier:** if `ppMode` produced an immediate, unmistakable, full-viewport change (so the scene *is* the indicator), this drops to MAJOR. `getStoredAnimationGroupControlOptions` is in `@state` (`state/controlOptionsStore.ts`, 116 lines) and its consumers are outside this component's import closure — **UNPROVEN-NEEDS-LIVE** for the *magnitude* of the scene change; the a11y half (no `aria-checked` on any surface) stands regardless.

---

## 3. MAJORS

### D-3 · MAJOR — three of five rows are keyboard-dead menuitems, and every row nests interactive children inside `role="menuitem"`

`MbabbMenu.vue:8` (Share), `:18` (Dark mode), `:57` (@mbabb)

reka activates a menu item by synthesising a click **on the item element itself** (`reka-ui/dist/Menu/MenuItem.js`, keydown handler):

```js
if (unref(SELECTION_KEYS).includes(event.key)) {
    event.currentTarget?.click();
    event.preventDefault();
}
```

Rows 3 and 4 carry `@click` on the item (`:29`, `:46`) → Enter/Space works. Rows 1, 2, 5 carry **only** `@select.prevent`, and their actuation lives in children:

| row | line | actuator | reachable by Enter on the focused menuitem? |
|---|---|---|---|
| Share | `:9` | `SharePopover`'s `<button>` (`SharePopover.vue:4–12`) | **no** — the synthetic click lands on the item `<div>`, not the button |
| Dark mode | `:19–22` | `DarkModeToggle`'s `<button>` (`DarkModeToggle.vue:39`) | **no** |
| @mbabb | `:64`, `:66` | two `<a href>` | **no** |

So arrow-navigating to "Share" and pressing Enter does *nothing at all* — and `@select.prevent` guarantees the menu does not even close, so there is no feedback that nothing happened. Same for "Dark mode" and both @mbabb links.

Focus *can* still reach the nested controls: `MenuContentImpl.js:266–268` wraps content in `FocusScope trapped`, items are `tabindex="-1"`, and Tab is not swallowed by the typeahead (`"Tab".length !== 1`), so Tab cycles the nested `<button>`/`<a>`. That makes the menu operable-by-accident via a *second*, undocumented interaction model layered under the first — arrows move the highlight, Tab moves the real focus, and the two do not agree.

Underneath: **WAI-ARIA 1.2 §5.2.8 lists `menuitem` among the roles with presentational children**, and the APG menu pattern forbids interactive descendants of `menuitem`. Five of five rows violate the authoring rule; three of five also fail functionally.

**Falsifier — split deliberately, because the two halves have different strengths:**
- *Functional half (strong):* dispatch `keydown{key:"Enter"}` on the focused Share menuitem in a built demo. If the popover opens, this half dies. Given `MenuItem.js` above and the absence of any `@click`/`@select` handler at `:8`, I assert it will not.
- *Exposure half (weaker, honest):* dump the a11y tree. ARIA 1.2 also says an explicit `presentation` role is ignored on focusable elements, and UA implementations of presentational-children differ. If Chrome/WebKit expose the nested button with `aria-pressed` intact, the *exposure* claim dies; the *authoring-violation* claim and the functional half survive.

---

### D-4 · MAJOR — row 3's two-line grammar collapses to one line

`MbabbMenu.vue:31–39`

Four rows use the same wrapper, `<div class="flex-1 min-w-0">`, with a title element then a subtitle element. Three of them put a **block** element second:

```
:11–12  <span class="text-small">Share</span>            <p …>Copy link or load shared state</p>     ← <p> = block  → 2 lines
:49–50  <span class="text-small">Clear all &amp; reload</span>  <p …>Reset every saved animation…</p> ← <p> = block  → 2 lines
:64–66  <a …>@mbabb</a> <p …>CSS keyframe animation engine</p> <a …>View the project…</a>            ← <p> = block  → 3 lines
:37–38  <span class="text-small">ppmycota</span>         <a …>ppmycota.com</a>                        ← <a>  = INLINE → 1 line
```

The wrapper is `display:block` (a flex *item*, not a flex container — `flex-1 min-w-0` sets `flex:1 1 0%` and `min-width:0`, no `flex-col`). `<span>` and `<a>` are both `display:inline`. Nothing in the class list changes that: `text-small`/`text-admin-label` are font utilities (`typography/{semantic,utilities}.css` — neither sets `display`), `hover:underline transition-colors` do not.

Worse, the separator between them vanishes. `vite.config.ts` sets no `template.compilerOptions.whitespace` (grep: only a `compilerOptions` at `:226` inside the dts/entryRoot block), so Vue's default `condense` applies — **whitespace-only text nodes containing a newline between elements are removed**. Line 37 ends and line 38 begins, so the space is deleted and the two runs abut: `ppmycota` immediately followed by `PPMYCOTA.COM` in a different size and family, on one baseline.

Aristotelian reading: the menu's proportion is set by a repeated *title-over-subtitle* module. Row 3 is the brand row — the one the ppmycota mark exists to dignify — and it is the one row that breaks the module.

**Falsifier:** render the built demo and measure row 3's content-box height against row 1's. Equal (≈1 line) confirms; row 3 taller (2 lines) kills the claim — which would require `display:block` on the `<a>` from a source I did not find (`grep -rn "text-admin-label" demo/styles/` finds only the `.status-badge` prose note at `design-idioms.css:225`, no `a` rule). Fix is one class: `block` on `:38`, matching the `<p>` siblings.

---

### D-5 · MAJOR — the leading-glyph column is ragged; the label column's left edge moves 8px between rows

Each row is `flex items-center gap-2.5` (10px gutter) with a leading glyph then the text block. Glyph widths, resolved:

| row | line | glyph | class | resolved | text column starts at |
|---|---|---|---|---|---|
| 1 Share | `SharePopover.vue:11` | `<Share2>` | `icon-lg` → `@utility icon-lg { @apply size-6 }` (`design-idioms.css:114–119`) | **24px** | 34px |
| 2 Dark mode | `:21` | `<DarkModeToggle>` | `aspect-square w-5` | **20px** | 30px |
| 3 ppmycota | `:30` | logo div | `w-7 h-7` | **28px** | 38px |
| 4 Clear all | `:47` | `<Trash>` | `w-5 h-5` | **20px** | 30px |
| 5 @mbabb | `:58` | `<Avatar>` | `w-7 h-7` | **28px** | 38px |

Three distinct widths across five rows; the text column's left edge oscillates 30 → 34 → 30 → 38 with no pattern. There is no compensating fixed-width slot (`shrink-0` at `:30,:47` fixes *the glyph*, not the column). The Avatar carries no `shrink-0` at all (`:58`) — it relies on `.glass-avatar{flex:none}` in `avatar/styles.css`, which is `@layer components` and therefore fine, but the inconsistency is itself a tell.

Note this is *not* a cascade casualty: `w-5`/`w-7`/`size-6` all beat `.glass-avatar{inline-size:var(--avatar-size)}` (layered) and face no unlayered competitor, so every one of these numbers really lands. The rag is authored, not inherited.

**Falsifier:** measure `getBoundingClientRect().left` of the five text wrappers. All equal kills the claim. I nearly filed this wrong: my first grep for `.icon-lg` in glass-ui found only the `--icon-lg: 1.25rem` token and I was one step from claiming `icon-lg` was a dead class and Share2 fell back to lucide's 24px default. It is a *live* demo-owned utility (`design-idioms.css:114`) that resolves to 24px — the same number, for a different reason. Recorded because the falsifier is what caught it.

---

### D-6 · MAJOR — `window.confirm()` guards the destructive action

`MbabbMenu.vue:108–119`

```js
function clearAllAndReload() {
    if (typeof window !== "undefined" &&
        !window.confirm("Clear all saved animation state and reload? This cannot be undone.")) {
        return;
    }
    resetAllStores();
    window.location.reload();
}
```

A native UA modal in an application whose entire identity is a glass cascade: unstyleable, untokenizable, unthemed (no `--font-display`, no `--popover`, no glass plate), positioned by the browser chrome, and in Safari rendered as a sheet attached to the tab. It also cannot honour `prefers-reduced-motion`, cannot be focus-managed alongside the reka `FocusScope` it is fired from, and cannot carry the destructive tint that D-1 already showed is missing from the row.

The alternative is already imported *four times* in this demo (lane-frontend §4): `KeyframesAddDialog.vue` (`Dialog*` + `Button` + `CardTitle`), `CSSPasteDialog.vue`, `KeyboardShortcutsModal.vue`, and `ControlsPaneWrapper.vue` (`Drawer*`). glass-ui's root barrel exports `Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger` — the exact confirm shape.

Composition hazard on top: `confirm()` is synchronous and blocks the main thread inside a reka `FocusScope trapped` layer with `modal:true` (`DropdownMenu.vue:54`) — `document.body` is pointer-events-disabled by the DismissableLayer while a native dialog is up. **UNPROVEN-NEEDS-LIVE** whether focus returns correctly to the menu on cancel.

**Falsifier:** if the demo's design law explicitly sanctions native dialogs for destructive confirms, this is a documented exception, not a defect. `demo/DESIGN.md` (265 lines) contains no `confirm`, no `dialog`, and no `menu`/`dropdown` clause (`grep -n -i "menu|dropdown|mbabb|row"` → 3 unrelated hits at `:15,:47,:121`). No sanction found.

---

### D-7 · MAJOR — a label rung carrying prose: 10px ALL-CAPS mono, four times

`MbabbMenu.vue:12, 38, 50, 65, 66`

```css
@utility text-admin-label {
  font-family: var(--font-mono);
  font-size: var(--type-admin-label);      /* 0.625rem = 10px, FIXED, no clamp */
  line-height: 1;
  text-transform: uppercase;               /* ← */
  letter-spacing: var(--type-tracking-caps);/* 0.1em */
  font-weight: 500;
}
```
(`dist/styles/typography/semantic.css`; `--type-admin-label: 0.625rem` and `--type-tracking-caps: 0.1em` from `typography/scale.css`.)

Applied to:

| line | authored | rendered |
|---|---|---|
| `:12` | Copy link or load shared state | `COPY LINK OR LOAD SHARED STATE` |
| `:50` | Reset every saved animation to defaults | `RESET EVERY SAVED ANIMATION TO DEFAULTS` |
| `:65` | CSS keyframe animation engine | `CSS KEYFRAME ANIMATION ENGINE` |
| `:66` | View the project on Github 🎉 | `VIEW THE PROJECT ON GITHUB 🎉` |
| `:38` | ppmycota.com | `PPMYCOTA.COM` (a URL — the only defensible one) |

Every one of the four prose strings is a **sentence**, not a label. `text-admin-label` is the demo's smallest rung; the ladder above it is unused here — `text-micro` (0.6875rem, `line-height:1.25`, **no** uppercase, **no** mono, **no** caps tracking) is the obvious seat, and `text-caption` (`clamp(0.75rem…1rem)`) the generous one.

The demo's *own* documented use of this utility is the opposite: `design-idioms.css:224–226` says call-sites "compose `text-admin-label` for the SIZE rung **only**", and `.status-badge` then overrides `font-family:var(--font-text)` with an unlayered rule to undo the mono bind. The three status-badge call-sites (`SquareInstrument.vue:30`, `SequenceTarget.vue:39`, `SpringTarget.vue:45`) all pair it with `.status-badge`; MbabbMenu is the only site that takes the raw utility for running prose — and takes the uppercase and the mono with it.

Compounding: `leading-tight` is stacked on top at `:12,:50,:65`. Both `.leading-tight` (1.25) and `text-admin-label`'s `line-height:1` are in `@layer utilities`, so the winner is intra-layer source order — undecidable from source and irrelevant to the point, since a 10px uppercase mono line at *either* leading is the defect.

**Falsifier:** if the intended reading of these strings is "chrome metadata, not prose" — i.e. they are meant to be scanned as tags — the uppercase is defensible and this drops to MINOR. Against that: they are full sentences with verbs and articles, and `:66` is a call-to-action *link*, which is prose by definition.

---

### D-8 · MAJOR — the brand mark's colour does not follow the brand token across themes

`MbabbMenu.vue:30` (mark) vs `:37` (label)

```
:30  <div class="ppmycota-logo-sm w-7 h-7 shrink-0 scale-on-hover"></div>
:37  <span class="text-small" :style="{ color: 'var(--ppmycota-primary)' }">ppmycota</span>
```

Two ways of painting one brand, from two different sources:

```css
/* demo/styles/brand.css:25–31 */
.ppmycota-logo-sm { background-image:url("@assets/ppmycota-logo-3.svg"); filter: var(--filter-brand-color); }

/* demo/styles/style.css:177–178 — :root, declared ONCE */
--ppmycota-primary: var(--accent-kf);                                  /* light-dark(…) */
--filter-brand-color: invert(55%) sepia(80%) saturate(1496%) hue-rotate(220deg) brightness(95%) contrast(103%);
```

`--accent-kf` is `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` (`style.css:130`) — it swaps arms with `color-scheme`, which `.dark` flips (`style.css:182`). `--filter-brand-color` is a **fixed filter chain** declared once at `:root` and never re-declared in `.dark` (`style.css:181–190` re-declares only `--accent-red`, `--accent-red-foreground`, `--primary`). A filter chain cannot be `light-dark()`-valued; it has one output.

So in light mode the mark approximates the label (style.css:176 asserts as much: "`--filter-brand-color` approximates it via a CSS filter for the SVG logo marks"). In dark mode the label moves to a markedly lighter, less chromatic orchid (L 0.56 → 0.74, C 0.17 → 0.13) and the mark **does not move at all** — 28px of light-arm violet sitting 10px from its own name in dark-arm orchid.

The comment at `:32–36` is aware that this row spans two colour mechanisms and defends only one of them.

**Falsifier:** screenshot the row in both themes and sample the SVG's rendered pixels vs the label's computed colour. If the filter output happens to land within ~ΔE 5 of *both* arms, the claim dies. The *structural* claim — one value against a two-armed token — is decidable from source now; the **perceptual magnitude is UNPROVEN-NEEDS-LIVE** (filter chains over an unknown source SVG are not statically resolvable).

---

## 4. MINORS

**D-9 · MINOR — `z-modal` is a disarmed time bomb, and disarming it is the only reason the Share popover works.**
`:6` asks for `z-modal` (140); D-1 shows the unlayered `.dropdown-menu__content{z-index:var(--z-popover)}` (130) wins. `SharePopover.vue:14` puts its `PopoverContent` at `z-popover` (130) too. Both are portalled siblings under `<body>`; equal z-index → DOM order decides → the later-mounted popover paints above the menu. Correct — *by accident*. If glass-ui ever wraps `dropdown-menu/styles.css` in `@layer components` (the fix D-1 wants), `z-modal` activates, the menu jumps to 140, and the 288px-wide (`w-72`) Share popover it spawned is occluded by the menu rows beneath it. The demo's z-contract (`style.css:18–40`) reserves 140 for "modal dialogs — above everything"; a dock dropdown is not one. **Falsifier:** if `PopoverContent` also receives an unlayered z-index ≥140 from glass-ui, ordering is stable either way — grep of `dist/styles/utilities/base.css` shows `.popover-content` sets only `border-radius`/`color`/`outline`, no z-index.

**D-10 · MINOR — the Avatar has no fallback, no referrer policy, and is the menu's only third-party request.**
`:58–62` renders `<AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4">` with no `<AvatarFallback>` — a primitive that ships (`dist/components/avatar/AvatarFallback.vue.d.ts`) and is exported from the root barrel. `AvatarImage.vue:38` forces `alt:''` + `aria-hidden:true`, so there is no a11y loss; the loss is visual: on 404, offline, or a tracker-blocked `githubusercontent.com`, the row shows an empty 28px plate (`.glass-avatar__identity` paints border + `--glass-plate-wash` + rim shadow, so it renders as a deliberate-looking empty puck, not a broken-image glyph). `AvatarImage` accepts `referrerPolicy` and `crossOrigin` props (`:9–10`); neither is passed, so the gh-pages demo leaks a full referrer to GitHub on every menu open. **Falsifier:** block `avatars.githubusercontent.com` and open the menu; if a fallback initial or a skeleton appears, the claim dies.

**D-11 · MINOR — "Github", an unlabeled 🎉, and a CTA that says nothing.**
`:66` "View the project on Github &#x1F389;" — the product is **GitHub** (capital H); the party-popper is decorative filler with no `aria-hidden` and no `role="img"`+label, so AT announces "party popper" mid-link-name; and "View the project on GitHub" is the least informative form of a repo link (the row already says `@mbabb` and "CSS keyframe animation engine"). The emoji also renders inside a 10px uppercase mono run (D-7), where a colour-emoji glyph will not match the mono metrics. **Falsifier:** if `--font-mono` (Fira Code) substitutes a monochrome glyph the metric half softens; the spelling and the unlabeled-emoji halves stand regardless.

**D-12 · MINOR — the hover affordance sits on a 28px child of a 44px row.**
`:30` puts `scale-on-hover` (`@utility scale-on-hover{scale:1;transition:scale …;&:hover{scale:var(--scale-hover)}}`, `--scale-hover:1.08`) on the *logo div*, while `@click` is on the whole row (`:29`). `.glass-menu-row` guarantees `min-block-size:max(2rem, var(--touch-target,2.75rem))` = 44px full-width. So the row's hit target is ~272×44 and its hover feedback is a 1.08× lift on a 28×28 sub-element in the corner — the affordance points at the wrong object, and (per D-1) there is no pointer cursor to correct the impression. No other row carries `scale-on-hover`; the one that does is not the one that most needs it (`:46`, Clear all, has none). **Falsifier:** if the logo is intended as an independent target and the row `@click` is the accident, the mis-signal inverts but does not vanish.

**D-13 · MINOR — a native tooltip and a redundant name on the dark-mode button.**
`:20` passes `title="Toggle dark mode"`. `DarkModeToggle.vue:26–33` strips `class` and `type` from `$attrs` but spreads `...rest`, so `title` lands on the `<button>` alongside its own `aria-label` ("Switch to light mode" / "Switch to dark mode"). Result: a UA tooltip after ~1s hover *inside an open dropdown*, over the rows below it, unstyled and unthemed; plus three competing names for one control (the `title`, the `aria-label`, and the visible "Dark mode" at `:23`). WCAG 2.5.3 survives — accname "Switch to dark mode" contains the visible "Dark mode" case-insensitively — so this is polish, not a failure. **Falsifier:** if glass-ui's `dark-mode-toggle.css` sets `pointer-events:none` on the button or the demo suppresses `title` globally, the tooltip half dies; neither appears in `dist/components/dark-mode-toggle/dark-mode-toggle.css`.

**D-14 · MINOR — the SSR guard is asymmetric and therefore decorative.**
`:110` guards `window.confirm` with `typeof window !== "undefined"`; `:118` calls `window.location.reload()` unguarded, and `:117` `resetAllStores()` touches persisted stores. In a no-`window` environment the guard short-circuits the `&&`, skips the `return`, and falls straight into `window.location.reload()` — a `ReferenceError`. Either the environment has `window` (guard is dead code) or it does not (guard makes it worse). No SSR exists in this demo (`vite.config.ts` modes: `production`/`gh-pages`/`dev`), so nothing breaks today; the guard is cargo. **Falsifier:** a `@vitejs/plugin-vue` SSR build or a vitest jsdom-less unit test of this SFC would decide it; neither exists.

**D-15 · MINOR — the five-line comment at `:32–36` defends a construct its own premise does not require.**
It argues the inline style is "the portal-safe home for the token ref" because "the dropdown content is portalled". But `--ppmycota-primary` is declared on `:root` (`style.css:177`), and custom properties inherit down the *DOM* tree — a portalled node under `<body>` inherits from `:root` exactly as an in-place node does. The premise is false, so `class="text-[var(--ppmycota-primary)]"` would resolve identically. Cost of the inline style: it is the highest-priority author origin, so no rule, layer, theme, or `:hover` can ever restyle that word — including the `hover:text-foreground` idiom its own sibling anchor uses at `:38`. **Falsifier:** if `--ppmycota-primary` were declared on a *component-scoped* selector rather than `:root`, the portal argument would be sound. `grep -rn "ppmycota-primary" demo/styles/` places it at `style.css:177`, inside `:root`.

**D-16 · MINOR — redundant classes that read as intent but assert nothing.**
`flex items-center` at `:8,18,29,46,57` duplicate the unlayered `.dropdown-menu__item{display:flex;align-items:center}`; `rounded-lg` at `:8,18,29,46` duplicates `.interactive-item{border-radius:var(--radius-lg)}` (`dist/styles/utilities/base.css`, `@layer components`, applied by `DropdownMenuItem.vue:43`). Five rows carry the pair; row 5 (`:57`) omits `rounded-lg` while carrying `flex items-center` — an inconsistency with no rendered consequence, which is exactly what makes it corrosive: a future reader cannot tell which of these classes are load-bearing. **Falsifier:** delete them and diff a screenshot; identical output confirms.

---

## 5. INFO

**D-17 · INFO — `p-1.5` is inert but numerically identical to what wins.**
`:6`'s `p-1.5` = 0.375rem; the unlayered `.dropdown-menu-content{padding:var(--panel-padding)}` (`_shared/menu.css`, after the `@layer components` close) = `--panel-padding: 0.375rem`. Zero visual delta **today**, entirely by coincidence of two independently chosen numbers. Recorded because it is the one D-1 casualty with no symptom — and therefore the one most likely to be "verified working" by inspection.

**D-18 · INFO — the mental model that produced D-1 is written down.**
`style.css:233–236`: *"They fold into `@layer utilities` so they sit **below** component CSS in the cascade."* Tailwind v4 declares `@layer theme, base, components, utilities` — utilities sit **above** components, and *both* sit below anything unlayered. The comment inverts the order it is reasoning about. This is not a defect in MbabbMenu; it is the evidence that the D-1 hazard is unrecognised repo-wide, and it is why the fix belongs in `demo/styles/` (an unlayered demo override, or a glass-ui `@layer` ask) rather than in this component's class list.

---

## 6. SUPERLATIVES (L-18 runs both ways)

**S-A · SUPERLATIVE — motion is delegated, not re-implemented, and the delegation actually holds.**
The component declares **zero** `@keyframes`, zero `transition` in a `<style>` block (it has no `<style>` block), and zero `matchMedia` call. Every motion it carries is a vendor primitive with its own PRM guard, and each one checks out:
- row lift: `.glass-menu-row{transition:translate …}` + `@media (prefers-reduced-motion: reduce){.glass-menu-row{--menu-row-lift:0px;transition:none}}` (`_shared/menu.css`) — the lift goes to **zero**, not merely faster.
- row hover/press: `.interactive-item{transition:background-color,color,border-color,box-shadow,scale …}` clamped by `dist/styles/utilities/a11y-overrides.css`'s global `@media (prefers-reduced-motion: reduce){*:not([data-allow-motion]){transition-duration:0.1s!important;transition-property:opacity,color,background-color,border-color,box-shadow!important}}` — note the property allow-list *excludes* `scale`, so the press-scale transition is removed outright.
- reveal: `glass-reveal` / `data-reveal="menu"` (`DropdownMenuContent.vue:74,77`) — glass-owned, in `transitions.css` (`@layer components`) with its own PRM block.
- `DarkModeToggle`'s sun/circle carry `data-allow-motion` (`DarkModeToggle.vue:50,55`) — the vendor's deliberate opt-out for a state-indicating glyph, which is the correct call: the icon *is* the state.

This is materially better than the demo's own baseline: lane-frontend §6.5 records 13 PRM sites across **three different mechanisms** (10 CSS blocks, 2 raw `window.matchMedia?.()`, 1 VueUse `useMediaQuery`) and flags the inconsistency. MbabbMenu adds a fourth option — none — and it is the right one.
**Falsifier (this cuts both ways):** set `prefers-reduced-motion: reduce` and open the menu. Any residual translate/scale animation on a row kills the superlative. One known residual, disclosed: `scale-on-hover` at `:30` loses its *transition* under PRM but the 1.08 `scale` still applies **instantly** on hover — a discrete size change, not an animation, so WCAG 2.3.3 is not engaged; but if the SS-13 audit judges an instant 8% jump to be motion, S-A downgrades and D-12 absorbs it.

**S-B · SUPERLATIVE — contrast is AA-clean in both themes, and the brand token is what buys the dark arm.**
Computed from tokens (sRGB relative luminance, WCAG 2.x formula; popover treated as opaque — see falsifier):

| pair | light | dark |
|---|---|---|
| `--muted-foreground` (`--neutral-5`) on `--popover` — the four `text-admin-label` runs and every subtitle | hsl(30 22% 40%) on hsl(30 85% 96%) → Y 0.14394 vs 0.92219 → **5.01 : 1** | hsl(34 14% 62%) on hsl(26 22% 17%) → Y 0.35876 vs 0.02527 → **5.43 : 1** |
| `--ppmycota-primary` (`--accent-kf`) on `--popover` — the brand word at `:37` | oklch(0.56 0.17 295) → Y 0.16023 → **4.62 : 1** | oklch(0.74 0.13 305) → Y 0.38452 → **5.77 : 1** |

All four clear the 4.5:1 normal-text floor — including the 10px runs, which is the harder case since 10px never qualifies for the 3:1 large-text exemption. The dark-arm brand pass is *not* luck: `style.css:170–177` deliberately folds `--ppmycota-primary` into the one two-armed violet authority rather than pinning a fixed brand hex, and a fixed hex at the light arm's lightness (L 0.56) on the dark popover would have measured ~2.6:1. The design decision is load-bearing and correct.
**Falsifier:** the popover is glass — `--glass-bg-floating: color-mix(in srgb, var(--card) calc((1 − (1 − var(--glass-opacity-floating)) * var(--glass-level)) * 100%), transparent)` with `--glass-opacity-floating` 0.80/0.88 — so the true backdrop is `--card` composited over whatever scene is behind the dock. Sample real pixels: if the light-arm muted pair drops under 4.5 (it has only 11% headroom, the thinnest of the four), S-B downgrades to "three of four pairs pass". **UNPROVEN-NEEDS-LIVE** for the composited case; the token-pair computation above is exact.

**S-C · SUPERLATIVE — RTL-clean by construction, with no RTL rule anywhere.**
Not one physical-direction property in 121 lines. `px-*`/`py-*` compile to `padding-inline`/`padding-block` in Tailwind v4; `gap-2.5` is direction-agnostic; row order is flex source order, which mirrors; `align="end"` on `DropdownMenuContent` (`:6`) is resolved direction-aware by floating-ui via `DropdownMenuContent.vue:48–61`; `DropdownMenu` forwards `dir` to `RekaDropdownMenuRoot` (`DropdownMenu.vue:80,93`) so roving-focus arrow keys mirror too. The vendor's own rules agree (`.dropdown-menu__item{padding-inline:…}`, `.dropdown-menu__indicator{inset-inline-start:…}`, `.dropdown-menu__shortcut{margin-inline-start:auto}`). A component this dense with iconography and secondary text usually needs an RTL pass; this one does not.
**Falsifier:** render under `dir="rtl"`. Any glyph stranded on the wrong side, or a popover that opens off-viewport, kills it. Residual risk flagged honestly: `ppmycota.com` and `@mbabb` are LTR strings in an RTL run and will need bidi isolation (`unicode-bidi: isolate`) — not present, but that is a content concern, not a layout one.

**S-D · SUPERLATIVE — the trigger is consumed whole, and its name is 2.5.3-correct.**
`:5` `<DockTrigger for="dropdown" aria-label="@mbabb menu" …>` takes glass-ui's unified dock trigger with **zero** bespoke fork — no re-implemented pointerdown actuation, no hand-rolled `aria-expanded`, no local `.dock-trigger` copy. `DockTrigger.vue:67–75` hands the `for="dropdown"` case to reka's `DropdownMenuTrigger` with `action="pointerdown"` and the shared `v-specular` directive; `triggers.css` is `@layer components`, so the demo's `text-mono-caption normal-case lg:text-mono-small` *do* land (verified: no unlayered `.dock-trigger` font rule exists) — the one place in this component where the authored utilities win outright. And the accessible name "@mbabb menu" **contains** the visible label "@mbabb", satisfying WCAG 2.5.3 Label in Name — the failure mode (`aria-label="Account"` over a visible "@mbabb") is the common one and was avoided.
Set against lane-frontend **S-1** — where `KfPillTabs` forks 217 lines of `SegmentedTabs` over a rationale three majors stale — this is the same author making the opposite, correct call on a structurally identical decision. **Falsifier:** if `DockTrigger` needed a wrapper elsewhere in the demo to be usable, the "whole-cloth" claim weakens; `ChromeDock.vue:6–11` and `TransportDock.vue` both consume it bare.

---

## 7. Repair order (cheapest-first, no wave authority claimed)

1. **D-2** — swap `DropdownMenuItem` → `DropdownMenuCheckboxItem` at `:29`, bind `:model-value="stored.ppMode"`. ~3 lines. Also closes the a11y half of D-3 for that row.
2. **D-4** — add `block` to `:38`. 1 word.
3. **D-11** — "Github" → "GitHub"; `aria-hidden="true"` on a wrapping `<span>` for 🎉. 2 edits.
4. **D-5** — pick one leading-slot width (28px reads best against the 44px row) and give all five rows a fixed `w-7 shrink-0` slot. 5 edits.
5. **D-7** — `text-admin-label` → `text-micro` on `:12,:50,:65,:66`; keep it on `:38` (a URL is a label). 4 edits.
6. **D-1** — *not* fixable inside this file. Either (a) an unlayered demo override in `demo/styles/` targeting `.dropdown-menu__item` (matching the `:where(.glass-quiet…)` precedent at `style.css:203–208`), or (b) the durable fix: a glass-ui ask to wrap `dropdown-menu/styles.css` in `@layer components`, which is what `styles/index.css` already does for `components.css` via `@import … layer(components)`. **(b) arms D-9** — land the `z-modal`→`z-popover` correction at `:6` in the same change.
7. **D-6** — `Dialog*` confirm, following `KeyframesAddDialog.vue`.
8. **D-3** — the structural rework: rows 1/2/5 want either `@click` on the item with the child made presentational, or the row demoted out of `menuitem` semantics. Wants a spec, not a patch.
9. **D-8** — needs a `.dark`-arm `--filter-brand-color`, or (better) an inline/masked SVG that takes `currentColor` from `--ppmycota-primary`, killing the filter approximation entirely. Cross-file.

Standing constraint from the corpus: **F-1 first.** `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules` (lane-frontend §2). Every claim in §1 is derived from that unreproducible install; `npm ci` on a clean checkout resolves nothing. No repair above is reproducible until F-1 lands.

---

## 8. Provenance

Every glass-ui claim is sourced from the **installed** copy at `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (the census target — no upgrade implied by any finding), cross-read against the producer tree at `/Users/mkbabb/Programming/glass-ui/src/` (`package.json` → `7.0.0`, byte-identical version to the install). reka-ui and tailwindcss claims come from `keyframes.js/node_modules/`. No file in keyframes.js, glass-ui, or fourier-analysis was written, mutated, or executed; no installs, no dev servers, no browser tooling. The only write performed by this lane is this file.
