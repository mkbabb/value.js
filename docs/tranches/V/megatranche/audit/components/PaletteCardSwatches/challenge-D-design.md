# CHALLENGE-D — `PaletteCardSwatches.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context) — the tier this seat was
explicitly spawned with. Declared, not inherited.

**Seat:** CHALLENGE-D (design), mega-tranche per-component audit.
**Subject:** `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue` (96 lines).
**Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
**Date:** 2026-07-29.
**Write scope honoured:** every artifact written by this seat lives under
`docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/`. Zero source edits.
**Probe method:** live dev server (`:9000`), WebKit via Playwright, palette API intercepted
client-side. No repo, server, or database mutation. Five probe scripts + eight screenshots are
committed beside this report; every number below is reproducible by running them.

---

## §0 — Verdict

**DEFECTIVE — BLOCKER.**

The design flaw is not a proportion miss. **The component's entire interaction surface is dead in
the shipped product**, and has been since 2026-03-25.

`PaletteCardSwatches` exists to do exactly one thing the card cannot already do: give each colour
an *add / edit / copy* menu. Measured on the live tree:

- On a **coarse pointer** (every phone, every tablet) tapping a swatch opens **nothing** — 0
  dialogs, 0 popovers, 0 action buttons (probe D5 `mobile_afterTap`).
- On a **fine pointer** the menu *does* open, and renders at **x = −720 px, y = 900 px, width
  1440 px, `position: static`** — a full-viewport-width strip parked off the left edge and below
  the fold, with **no background, no border, no shadow, no z-index** (probe D5
  `desktop_afterClick.rect`). It is invisible in the screenshot taken with the pointer resting on
  the swatch (`shot-hover-panel-desktop.png`).
- **Zero** of the panel's controls are reachable by keyboard or exposed to assistive technology;
  the hover panel is `aria-hidden="true"` and contains **three `tabIndex=0` buttons** that
  `.focus()` succeeds on (probe D3 `1_focusIntoHiddenPanel.activeIsPanelBtn: true`).

Strip the dead affordances and what remains is a **second, worse rendering of data the card
already shows one row higher**: `PaletteColorStrip` is bound to `palette.colors`
(`PaletteCard.vue:34`) and `PaletteCardSwatches` is bound to `palette.colors`
(`PaletteCard.vue:141`) — the same array, twice, in the same card, 112 px apart. Expanding a
5-colour palette costs **111 px of card height** and delivers **one** datum the collapsed card did
not have: the author's handle.

The tranche canon already ruled on this. `VISUAL-CONSTITUTION.md:102`:

> The card body owns no expand, inline rename, action menu, transient result or **hover-only
> swatch-action path**. […] the card's compact swatch strip remains **noninteractive data** with
> zero activation/focus/drag semantics.

`research/proportion-register.md:69` (PR-26), terminal verb **REMOVE / ADD-AFFORDANCE**:

> detail/verbs/durable status move to selected inspector; **compact swatches remain data** […]
> five body verb paths to 0.

The design is flawed in the strong sense: it is a disclosure with no payload, whose only
justification (the hover verbs) does not function, on a surface the constitution has already
ordered deleted.

---

## §1 — Evidence base

| # | Artifact | What it establishes |
|---|---|---|
| P1 | `probe-D1.mjs` → 5 matrices | dot semantics, panel geometry, focusable count, no overflow |
| P2 | `probe-D2.mjs` → Browse w/ slug row | slug-row geometry, copy-button size, tab inventory |
| P3 | `probe-D3.mjs` → 6 contexts | hover-panel rect, aria-hidden focus, hierarchy, PRM |
| P4 | `probe-D4.mjs` → N=0 / N=24 / contrast | empty void, overflow cost, canvas-resolved contrast |
| P5 | `probe-D5.mjs` → branch truth | which branch renders per pointer; touch path dead |
| P6 | `probe-D6.mjs` → focus ring | `--ring` empty; painted ring ≠ declared ring |
| S1..S8 | `shot-*.png` | rendered truth, desktop + mobile, light + dark, N=0/5/24 |

**A note on the shipped visual audit.** `audit/visual/REPORT.md` records *zero* useful rows for
this component: every capture of `/#/browse` and `/#/palettes` shows the empty/error state
(`shot` = "The commons is unreachable"), because a loopback dev origin with no `VITE_API_URL`
latches `misconfigured` and short-circuits every fetch
(`demo/platform/transport/availability.ts:20-37`). **This component has never been photographed
populated by the audit programme.** That is itself a finding about the audit (recorded as D-19),
and it is why this seat drove the LAN origin `http://192.168.1.166:9000` with an intercepted API
instead of trusting the shot corpus.

---

## §2 — BLOCKER findings

### D-1 — `.floating-panel` has no CSS. Anywhere. Since 2026-03-25.

`SwatchHoverMenu.vue:42` applies `class="floating-panel"` to the teleported hover menu. That class
is **undefined in the entire dependency graph**:

```
$ grep -rn "floating-panel" demo/ --include="*.css" --include="*.vue" --include="*.ts"
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)
demo/palettes/browser/card/composables/useHoverPopover.ts:7: * Shared hover-timer + floating-panel positioning pattern.
demo/palettes/browser/card/SwatchHoverMenu.vue:42:                    class="floating-panel"

$ grep -rq "floating-panel" node_modules/@mkbabb/glass-ui/
grep exit=1  (1 = NOT FOUND)
```

Two comments and one usage. Zero rules. glass-ui@7.0.0 ships **21 CSS files** and none of them
mentions it.

**Provenance.** `git log -S".floating-panel" -- "*.css"` lands on `c84504d3` (2026-03-25),
*"refactor(demo): migrate dock, styles, and composables to glass-ui"*, whose message reads:

> Delete dock.css, **floating-panel.css**, glass.css, transitions.css; **now provided by
> `@import "@mkbabb/glass-ui/styles"`**

The claim was false and nothing checked it. The deleted file
(`git show c84504d3^:demo/@/styles/floating-panel.css`) contained exactly what the panel needs:

```css
.floating-panel {
    position: fixed;
    z-index: var(--z-overlay);
    border-radius: var(--radius-xl);
    border: 1px solid hsl(var(--border) / 0.6);
    background: hsl(var(--card) / 0.75);
    backdrop-filter: blur(12px) saturate(1.3);
    box-shadow: var(--glass-shadow-elevated);
    pointer-events: auto;
    animation: floating-panel-in var(--duration-fast) var(--ease-decelerate);
}
```

**Measured consequence** (probe D5, viewport 1440×900):

```json
"desktop_afterClick": { "panels": 1,
  "rect": { "x": -720, "y": 900, "w": 1440, "h": 40 } }
```
```json
"1_hoverPanel": { "present": true, "position": "static", "zIndex": "auto",
  "transform": "matrix(1, 0, 0, 1, -720, 0)", "animationName": "none" }
```

`position: static` makes the `top`/`left` written by `useHoverPopover.positionPanel`
(`useHoverPopover.ts:21-24`) **inert** — `top`/`left` do nothing on a static box. The `<Teleport
to="body">` therefore drops the panel into normal document flow at the end of `<body>`, where it
stretches to the body's 1440 px width, then the consumer-injected
`transform: translateX(-50%)` (`PaletteCardSwatches.vue:31`) shifts it 720 px left. The action
buttons land at negative x.

**Severity BLOCKER.** The component's reason to exist renders off-screen and unstyled. The
`--animation-slide-sm/md/lg` register, the `vj-morph` family, and `floating-panel-in` are all
absent from it (`animationName: "none"`) — owner edict 6 ("animations are never deleted, only
moved or tokenized") was violated by deletion.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D5.mjs`
→ `desktop_afterClick.rect`.

---

### D-2 — The touch branch is inoperable: glass-ui 7 dropped `tag`, and the adoption did not notice.

`SwatchHoverMenu.vue:14-20` wraps `<WatercolorDot tag="button" :aria-label="…">` in a reka
`<PopoverTrigger as-child>` — the *documented touch route* to the colour verbs
(`SwatchHoverMenu.vue:7` "Touch: native Popover click toggle";
`SwatchHoverMenu.vue:38-39` "The reka-ui Popover (touch path) is the accessible route").

**glass-ui@7.0.0's `WatercolorDot` has no `tag` prop and does not accept fallthrough attributes.**
From the shipped bundle:

```
$ grep -n "inheritAttrs" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
80:	inheritAttrs: !1,
```

Its render returns a hard-coded span with `aria-hidden` and `pointer-events` baked in
(`dist/watercolor-dot.js`):

```js
return (t, n) => (d(), o("span", {
    "aria-hidden": "true",
    class: l([c.value, "watercolor-swatch", …]),
    "data-testid": "watercolor-swatch",
    style: u([f.value, { …, pointerEvents: "none", … }])
}, …
```

Declared props are `color · variant · animate · cycleDuration · range · seed`. `grep -c tag
dist/watercolor-dot.js` = **0**.

`inheritAttrs: false` + no `v-bind="$attrs"` means **`tag`, `aria-label`, `@click`, and reka's
`PopoverTrigger` bindings are all silently discarded**. Measured DOM (probe D5, both matrices):

```json
"dotAttrs": ["data-v-292b9032","aria-hidden","class","data-testid","data-variant","style"],
"dotPointerEvents": "none",
"elementAtDotCentre": "DIV.relative",
"anyDataState": ["BUTTON:closed"]      // ← the *palette menu*, not a swatch
```

No `aria-haspopup`, no `data-state`, no `id`, no `type`, no `aria-label`, no `tag`. On the **mobile
matrix**, where `matchMedia("(hover: hover)").matches === false` so the Popover branch genuinely
renders:

```json
"mobile_afterTap": { "dialogs": 0, "popperWrappers": 0, "floating": 0, "actionButtons": 0 }
```

**Tapping a swatch on a phone opens nothing.** `elementFromPoint` at the swatch centre returns the
wrapper `DIV.relative`, because `pointer-events: none` passes the tap straight through the dot.

This is precisely the migration `VISUAL-CONSTITUTION.md:91` predicted and mandated:

> V **abrogates a selection outline and interactive host on `WatercolorDot`**. **P051 removes the
> public `tag="button"`/interactive-host branch in the clean major** […] Selection, activation,
> drag and keyboard focus belong to a named **enclosing geometric button/seat**.

glass-ui 7.0.0 *is* that clean major, adopted whole at W44. The producer removed the branch; the
consumer was never migrated to the enclosing seat. `grep -rn 'tag="button"' demo/ --include="*.vue"`
shows **5 surviving sites** (`SwatchHoverMenu.vue:17,32`, `MixSourceSelector.vue:168,215`,
`GenerateControls.vue:203`, `CurrentPaletteEditor.vue:98`) plus ~14 `tag="div"` sites — all dead
props. This is a fleet-wide adoption regression; `PaletteCardSwatches` is the site where it costs a
user-facing verb.

**Severity BLOCKER. Owner edict 4 (glass-ui is the design system — including its contracts).**

**Reproduction:** `probe-D5.mjs` → `mobile.triggerMarkers`, `mobile_afterTap`.

---

### D-3 — The action panel is `aria-hidden` and contains three focusable buttons; nothing in the component is keyboard-reachable.

`SwatchHoverMenu.vue:38-47` ships this reasoning verbatim:

```
<!-- W5-a11y: hover-only panel is keyboard-inaccessible — hidden from
     AT. The reka-ui Popover (touch path) is the accessible route. -->
<div v-if="open" class="floating-panel" … aria-hidden="true" …>
```

The stated escape hatch is the touch path — which D-2 proves is dead. So the mitigation rests on a
route that does not function. Meanwhile the "hidden" panel is not hidden from the focus order
(probe D3):

```json
"1_hoverPanel": { "ariaHidden": "true", "btnTabIndex": [0,0,0],
  "btnLabels": ["Add #12314f to current palette","Edit color #12314f","Copy color #12314f"],
  "focusablesInsideAriaHidden": 3 }
"1_focusIntoHiddenPanel": { "activeIsPanelBtn": true,
  "label": "Add #12314f to current palette" }
```

That is axe `aria-hidden-focus` / **WCAG 2.2 SC 4.1.2** — focusable content inside `aria-hidden`
is a hard failure, not a mitigation. And the component *styles a focus ring on elements it declares
invisible to AT* (`PaletteCardSwatches.vue:44,51,58` `focus-visible:ring-2`): the design
contradicts itself inside one class attribute.

Inventory of the whole expanded card (probe D2 `A_expanded.focusables`, probe D1
`focusableLabels`):

```json
"focusables": ["3 votes, click to vote", "Palette menu", "Copy slug mbabb"]
```

**Three.** Not one of the 5 swatches; not one of the 15 add/edit/copy verbs. The colours — the
component's entire payload — are `aria-hidden` spans (D-2), so a screen-reader user perceives the
expanded panel as **an empty region**.

A supporting observation with **different ownership**: 14 consecutive `Tab` presses from the Browse
route never enter the card at all (probe D6 `kbd`, every row `inCard: false`, cycling three dock
elements with period 3). That focus cycle is owned by the shell/dock, not this file — but it means
the component's three surviving controls are unreachable **in practice** as well as in principle.

**Severity BLOCKER.**

---

## §3 — MAJOR findings

### D-4 — The disclosure has no payload: the panel is a second rendering of the strip.

| binding | file:line |
|---|---|
| `<PaletteColorStrip :colors="palette.colors" …>` | `PaletteCard.vue:33-37` |
| `<PaletteCardSwatches :colors="palette.colors" …>` | `PaletteCard.vue:139-141` |

Same array. Same card. Measured cost of the expansion (probe D3/D4, 1440 px, card 462 px wide):

| N | collapsed card | expanded card | Δ | new information |
|---|---|---|---|---|
| 0 | 100.00 px | **163.94 px** | +63.94 | slug chip only — the swatch panel is **empty** |
| 5 | 100.00 px | 211.11 px | +111.11 | slug chip |
| 24 | ~140 px | **321.45 px** | +181.52 | slug chip |

`shot-N24-expanded.png` shows it plainly: 24 hues as a flush, edge-to-edge, ordered band at the top
of the card, and the **same 24 hues** as 40 px organic dots in a ragged 9+9+6 wrap below. Two
mutually inconsistent colour semantics — *continuous ruler* vs *discrete specimen* — for one datum,
stacked. The band is full-bleed at x=0; the dots begin at x=12 px (`px-3`), so **the same first
colour appears at two different x-positions in the same card** and no vertical correspondence can
be read between the two renderings. The last wrap row leaves ~40 % of its width empty against a top
edge that is perfectly flush: the panel reads as leftovers.

`VISUAL-CONSTITUTION.md:102` and `proportion-register.md:69` (PR-26) both terminate this row at
**REMOVE**. `PROPORTION-AUDIT.md §5.6`: *"Subtraction precedes explanation."*

**Severity MAJOR.** This is the gestalt failure the other findings hang from.

---

### D-5 — The empty state (N = 0) was never designed: the card expands into a void.

`PaletteCard.vue:220-223` explicitly names the state real:

> `// S.W2 W2-9: a palette with zero colors is a real, reachable state (a freshly-created palette
> before any swatch). This neutral mid-gray is the designed empty-state swatch…`

The strip got a designed empty swatch. The expanded panel got nothing. Probe D4:

```json
"empty": { "cardH": 163.94,
  "panel": { "cls": "px-3 pb-3 flex flex-wrap gap-2 items-start pt-3 min-w-0",
             "w": 458, "h": 24, "children": 0, "text": "\"\"" },
  "dots": 0, "emptyMessage": false }
```

A **24 px blank band** (`pt-3` 12 + `pb-3` 12, zero children). The card grows 63.94 px to display
nothing, and on `/#/palettes` — where `showSlug` is false (`BrowsePane.vue:101` is the only
non-admin site that sets it) — the slug row is absent too, so the ternary at
`PaletteCardSwatches.vue:23` moves the `border-t` onto that empty band: **a ruled 24 px void**.

The app ships a designed empty affordance one directory up (`EmptyState.vue:45-47`, the
three-`WatercolorDot` `EmptyPaletteMark` blessed by `VISUAL-CONSTITUTION.md:186`) and this panel
does not use it. **A state that was never designed is a design defect.**

**Severity MAJOR.** `shot-N0-expanded.png`.

---

### D-6 — Affordance inversion, plus a 16 × 16 px touch target the sibling already cured.

Measured (probe D2 `A_expanded`, probe D4 `mobile`):

| element | role | rendered |
|---|---|---|
| slug pill (`:9-11`) | **inert text** | 68.47 × 28.94 px, `rounded-full`, **1 px solid border**, Fira Code **16.4 px / weight 700**, tinted with the palette's first colour |
| copy button (`:13-19`) | **the only control in the row** | **16 × 16 px**, `padding: 2px`, bare 12 × 12 px glyph, no border, no fill, no hover surface at rest |

The inert thing wears the universal signature of a control (bordered pill). The control wears the
signature of an icon decoration. `PROPORTION-AUDIT.md §5.5`: *"A small icon/mark is either data,
status, labeled action, drag affordance, focus/selection register or removed."* §5.7: *"Visual glyph
size, operable target size and layout reservation are separate quantities."* Here they were
collapsed into one 16 px box.

**16 × 16 px fails WCAG 2.2 SC 2.5.8 (Target Size Minimum, 24 × 24 CSS px)** and the spacing
exception does not apply — the pill sits 6 px away (`gap-1.5`). On the mobile matrix it is still
16 × 16 (probe D4 `mobile.copyBtn`). It is the largest contributor to this component's share of the
audit's **60 `smallTapTargets` rows** (`visual/REPORT.md`, `/#/browse` = 4 per matrix).

The cure already shipped **in the same card**, with a comment saying so —
`PaletteCard.vue:93-95`:

> `S.W5-4: 3rd copy of the hand-rolled icon-trigger recipe dies onto the glass-ui atom; the sm
> square also cures the ~24px touch target.`

`PaletteCardSwatches` is the surviving 4th, 5th, 6th and 7th copies.

**Severity MAJOR. Owner edicts 4 + 5.**

---

### D-7 — Reduced motion is unhandled, and the animated property forces layout.

Measured with `reducedMotion: "reduce"` active (probe D3):

```json
"6_prm": { "prmMatches": true,
  "panelStyleAttr": "height: 111px; opacity: 1;
     transition: height 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms;" }
```

The global guard in `demo/styles/animations.css:184-192` clamps CSS transitions to `0.01ms
!important` — and it is bypassed, because `useHeightTransition.onEnter` writes
`htmlEl.style.transition` **inline** (`useHeightTransition.ts:31`), where `!important` in a
stylesheet cannot reach a JS-authored inline shorthand's *duration* the way the guard intends for
declared rules. The PRM user gets the full 350 ms.

Three compounding defects in the motion this component is the subject of:

1. **The animated property is `height`** (`useHeightTransition.ts:31,35,62,66`) — layout-forcing on
   every frame — and `scrollHeight` is read immediately before (`:29`), forcing a synchronous
   layout. The tokenized alternatives (`--animation-slide-sm/md/lg`, the `vj-morph` family with its
   `--vj-morph-collapse/--vj-morph-expanded` geometry vars already used at `PaletteCard.vue:358-363`)
   are not used.
2. **`scrollIntoView({ behavior: "smooth", … })`** at `useHeightTransition.ts:48` is un-gated. A
   JS-specified `behavior` overrides the CSS `scroll-behavior: auto !important` the guard sets, so
   reduced-motion users are smooth-scrolled as well.
3. **The durations match no token, by the author's own admission** —
   `useHeightTransition.ts:1-7`: *"bespoke height-transition durations (no exact glass-ui canon
   match — 350ms sits between `--duration-normal` 300ms and `--duration-slow` 450ms)"*. Owner
   edict 6 requires tokenized, not bespoke.

Separately, the four action buttons carry `active:scale-95` under `transition-colors`
(`PaletteCardSwatches.vue:14,44,51,58`). `transition-colors` does **not** include `transform`, so
the press "choreography" is an un-eased jump-cut in both directions — while the parent card runs a
real interruptible spring (`useLiquidPress`, `PaletteCard.vue:263-267`) and the producer
`cartoon-surface` register. Two press registers on one card; one of them is a snap.

**Severity MAJOR.** Ownership note: `useHeightTransition.ts` is the mechanism owner;
`PaletteCardSwatches` is the animated subject and the only consumer that pays the cost.

---

### D-8 — Four hand-rolled icon buttons, a hand-rolled chip, and a hand-rolled floating panel, all with shipped producer atoms.

The identical 116-character class string appears **four times** in a 96-line file
(`PaletteCardSwatches.vue:14, 44, 51, 58`):

```
p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors
cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
```

Producer atoms that already exist and are already re-exported by the demo:

| hand-rolled here | producer atom | proof it is available |
|---|---|---|
| icon button ×4 | `Button icon-only variant="ghost" size="sm"` | `demo/ui/button/index.ts` = `export { Button } from "@mkbabb/glass-ui"`; used at `PaletteCard.vue:96-104` |
| slug pill (`:9`) | `@mkbabb/glass-ui/chip` | package `exports` map, `./chip` |
| floating action panel | `@mkbabb/glass-ui/popover` | package `exports` map, `./popover`; already used on the touch branch |
| expand/collapse | `@mkbabb/glass-ui/expandable-container` (`open`, `update:open`, slots) | `dist/components/expandable-container/*.d.ts` |

Owner edict 4 ("glass-ui is the design system — variants/primitives belong in glass-ui, not in
demo/") and edict 5 ("style at the root component level, never per-instance overrides"). Four
per-instance overrides of a root that was already styled.

**Severity MAJOR.**

---

### D-9 — The focus ring is a per-instance literal reaching an **empty** token; the declared alpha is silently discarded.

`focus-ring.css:1-31` is unambiguous:

> ONE token recipe reused by **every** keyboard-operable control […] — **never a per-control
> literal**. […] The U-F25 defect had TWO deaths: […] (2) the `--ring`/`--color-ring` token it
> reached **resolved EMPTY** — so even an un-clobbered ring painted nothing.

`PaletteCardSwatches.vue:14,44,51,58` reaches `focus-visible:ring-ring/40` — the exact token the
postmortem names as dead. Measured on the live tree (probe D6):

```json
"tokens": { "ring": "", "colorRing": "",
            "focusInner": "rgba(0, 0, 0, 0.85)", "focusOuter": "rgba(255, 255, 255, 0.92)" }
"focusRing": { "matchesFocusVisible": true, "rect": "16x16",
  "boxShadow": "… rgb(28, 25, 23) 0px 0px 0px 2px …" }
```

`--ring` and `--color-ring` both resolve to the **empty string**. The `/40` alpha therefore never
materialises: Tailwind falls back and paints an **opaque near-black 2 px ring** around a 16 px box.
The declared design (40 % ring) and the rendered design (100 % black square) differ, and neither is
the mandated dual-contrast recipe (`0 0 0 1px var(--focus-ring-inner), 0 0 0 3px
var(--focus-ring-outer)`), which is the only recipe guaranteed to read over an arbitrary swatch hue.

**Severity MAJOR.**

---

### D-10 — The padding ladder is off-canon and internally inconsistent.

`PROPORTION-AUDIT.md §5.12` is binding and exact:

> Every Browse/Library palette entity Card […] Its **`C = --spacing(4)` padding ladder is invariant
> across viewports**; only the workspace gutter responds.

Measured `--spacing` = `0.25rem` (probe D6 `tokens.spacing4`) ⟹ canon `C` = **16 px**. Measured on
this component (probes D1/D2, identical at 390 px, 1440 px and 200 % zoom):

| region | declared | computed | canon |
|---|---|---|---|
| slug row (`:6`) | `px-3 pt-2.5` | 12 / 12 / **10** / 0 px | 16 |
| swatch panel (`:22`) | `px-3 pb-3 pt-3` | 12 / 12 / **12** / **12** px | 16 |
| dot gap (`:22`) | `gap-2` | 8 px | — |

**12 px, not 16 px**, at every viewport. And three different vertical values (10 / 12 / 12) inside
96 lines: the rule sits 10 px above the pill and 12 px below it, so the ruled band is optically
top-tight and reads as a mis-set line rather than a deliberate boundary.

**Severity MAJOR** (it is a named invariant, not a taste call).

---

### D-11 — Type hierarchy is inverted: the lowest-rank datum carries the card's heaviest weight.

Measured on one card, one row apart (probe D3 `1_hierarchy`):

| element | role per `PROPORTION-AUDIT.md §5.13` | family | size | **weight** |
|---|---|---|---|---|
| palette name (`PaletteCard.vue:55`) | **palette identity** → `--type-subheading` | Fraunces | 20.35 px | **500** |
| count badge (`PaletteCard.vue:72`) | value → `text-mono-small` | Fira Code | 16.4 px | 600 |
| **slug pill** (`PaletteCardSwatches.vue:9`) | **provenance** → `text-mono-small` | Fira Code | 16.4 px | **700** |

The provenance chip — the least important datum in the register — is the **boldest ink on the
card**, 200 weight units above the identity it sits beneath. §5.13 grants provenance the
`text-mono-small` *rung*; nothing in the matrix grants it weight 700, and `font-bold` at
`PaletteCardSwatches.vue:9` is the only place it is applied. Size-wise the "small" mono rung
computes to **16.4 px**, i.e. *larger than the 16 px body default* — the rung is misnamed, and the
identity/provenance size ratio is 1.24 where the canon's adjacent-rung relation is `1/√φ` ≈ 1.27
inverted in favour of the wrong term.

Compounding it, the pill's ink and border are painted with **the palette's first colour**
(`:10`, `safeFirstColor`). `VISUAL-CONSTITUTION.md:21`:

> Seed tint is **forbidden** outside the ambient field, active accent, WatercolorDot/specimen, and
> pastel Palettes lanes.

A user handle is not a specimen. Measured light-mode ink `rgb(18,49,79)` = `#12314f` = `colors[0]`
verbatim.

**Severity MAJOR.**

---

## §4 — MINOR findings

### D-12 — A boundary that is neither absent nor visible.

`border-t border-border/15` at `:6` and `:23`. Canvas-resolved contrast against the card fill
(probe D4): **1.53 : 1 light, 1.66 : 1 dark**. It is in the DOM and not on the screen.
`PROPORTION-AUDIT.md §5.4` retains a divider "only when grouping would be ambiguous without it";
PR-05's terminal verb is **REMOVE**. Worse, it is a *post-hoc alpha* — the exact mechanism the same
card's own comment retired eleven lines above the swatch call site
(`PaletteCard.vue:45-46`: *"the `/40` post-hoc alpha dies — the muted token is the de-emphasis
rung"*). Four post-hoc alphas survive here: `border-border/15` ×2, `bg-accent/70` ×4,
`ring-ring/40` ×4.

### D-13 — The expanded panel is a 111 px click dead-zone.

`@click.stop` on the root (`:2`) swallows every click in the panel. It does not collapse the card
(measured: card height unchanged at 211.1 px after clicking a swatch — probe D5
`desktop_cardAfterClick`), does not select the palette, and — per D-1/D-2 — does not open anything.
Combined with D-4 this is the whole defect in one line: **111 px of card that repeats the strip and
responds to nothing.**

### D-14 — Inert utilities.

`min-w-0` (`:22`) applies to flex/grid *items*; this div's parent is a plain block in the default
layout (`PaletteCard.vue:40` — `flex-1 min-w-0` is applied only when `layout === 'aside'`), so it is
a no-op on the primary path. `items-start` is a no-op at N ≤ 9 (single row; measured `rowCount: 1`
at N=5). Dead declarations read as intent and mislead the next author.

### D-15 — The positioning contract is split across three files, and widened at the seam.

`useHoverPopover.ts:22-24` owns `top`/`left`; `PaletteCardSwatches.vue:31` injects
`transform: 'translateX(-50%)'` into the object in transit; `SwatchHoverMenu.vue:44` applies it.
The prop is typed `Record<string, string | number>` at `PaletteCardSwatches.vue:82` but
`CSSProperties` at `SwatchHoverMenu.vue:73` — the consumer widens the producer's type, so a typo in
the injected key is not a compile error. One box's position should have one owner.

### D-16 — Copy has no success state, and the promise floats.

`writeClipboard(displaySlug)` at `:16` — no `void`, no `await`, no `.catch`. The sibling call sites
in the same card use `void writeClipboard(...)` (`PaletteCard.vue:294,333`). More importantly:
**neither surfaces any feedback**, while `ActionFeedback` + `showFeedback()` sit twenty lines away
in the parent (`PaletteCard.vue:123-128, 238-244`) and are wired to nothing on this path.
`PROPORTION-AUDIT.md` PR-08 terminal verb: **ADD-AFFORDANCE** — *"Pending/failure/export/recovery
truth only transient."* Here it is not even transient; it is absent.

### D-17 — Raw CSS strings in accessible names.

`Add ${color.css} to current palette` / `Edit color ${color.css}` / `Copy color ${color.css}`
(`:43,50,57`) — already booked as **RAW-ARIA** rows B5–B7 in
`audit/om-14-formatting/FORMAT-AUDIT.md:116-118`. A screen reader announces "Edit color
oklch zero point six two…". Confirmed live: `btnLabels: ["Add #12314f to current palette", …]`
(probe D3).

### D-18 — No cap, no scroll, no ceiling at large N.

Probe D4, N = 24: **panel 181.52 px, 168 DOM nodes, 24 SVG filter graphs**, `max-height: none`,
`overflow: visible`, three wrap rows. The local store applies no colour cap
(`usePaletteStore.ts:66-95`), so N is unbounded on the local path. The codebase already ships the
correct idiom twice (`VersionHistoryDrawer.vue:59-63` cap-8 + "+N"; `PreviewStrip.vue:73-75`
mask-fade). Cross-referenced: `audit/om-16-palette-scalability/SCALABILITY-AUDIT.md:246, 271`
(row 7, P2).

### D-19 — The audit corpus has never photographed this component populated.

All 60 rows of `audit/visual/REPORT.md` capture `/#/browse` and `/#/palettes` in the *error* and
*empty* states (`shots/safari-*/browse.png` = "The commons is unreachable"), because the loopback
dev origin latches `misconfigured` (`availability.ts:20-37`) and short-circuits every fetch. Every
`smallTapTargets` and `namelessButtons` count for those routes therefore **excludes this component
entirely** — the real numbers are higher. Recorded as a defect of the evidence base, owned by the
capture harness (`visual/capture.mjs`), not by this file. The cure is one env var: capture with
`VITE_API_URL` set, or from a non-loopback origin, as this seat did.

---

## §5 — What is genuinely sound (the negative proof)

Stated explicitly so the report cannot be read as indiscriminate.

| claim | evidence |
|---|---|
| The slug pill's ink **is** contrast-certified in both schemes | canvas-resolved sRGB (probe D4): **10.29 : 1** light, **5.78 : 1** dark against the resolved card fill. `useSafeAccentFn("well")` (`PaletteCard.vue:229-230`) does its job. An earlier naive parse of the `oklch()` string produced a false 2.38 : 1 — corrected here. |
| The copy glyph's ink is certified | 5.08 : 1 light, 5.97 : 1 dark |
| No horizontal overflow | `docOverflowX: 0` at 390 px, 1440 px, and 200 % zoom (probe D1, all 5 matrices) |
| No console or page errors on these routes | probe D1 `consoleErrs: []` in all 5 matrices; `REPORT.md` `pageErrors: 0` |
| Duplicate colours are safe | `:key="\`${color.css}-${i}\`"` (`:28`) is index-disambiguated — unlike `PaletteColorStrip`'s bare index |
| `verbatimModuleSyntax` is clean | `import type { PaletteColor }` (`:72`); the three value imports are genuine values |
| No god module | 96 lines, 8 props / 8 emits, zero state — the *encapsulation* edict is met (its **seam placement** is challenged separately at D-20) |
| The dot wrap does not clip | `pb-3`/`px-3` = 12 px > the filter's 15 % (6 px at 40 px) bleed |

---

## §6 — D-20: the seam itself

Not a defect of what the file does, but of where the line was drawn. `PaletteCardSwatches` has
**8 props and 8 emits and zero state** — 16 of 16 interface members are pure pass-through
(corroborated independently at `components/PaletteCard/challenge-D-design.pass-1-2026-07-27.md:389,
397` and `pass-2-2026-07-28.md:448-453`). The seam runs *across* one interaction, not *around* one
concern: `openPopoverIndex` lives in `PaletteCard`, the geometry in `useHoverPopover`, the
`translateX(-50%)` in `PaletteCardSwatches`, the DOM in `SwatchHoverMenu`, and the (missing) CSS
was in `demo/styles/`. **Five files own one popover.** That distribution is exactly why D-1 could
survive four months: no single file's review surface contains both the class name and its absence.

---

## §7 — Proposed cure (gestalt, not patch)

The canon has already written it. `VISUAL-CONSTITUTION.md:102` + `proportion-register.md:69`
(PR-26, **REMOVE / ADD-AFFORDANCE**) + `PROPORTION-AUDIT.md` PR-07 (*"palette hover paths retire
into selected inspector"*).

**Delete `PaletteCardSwatches.vue`, `SwatchHoverMenu.vue`, `useHoverPopover.ts` and
`useHeightTransition.ts` from the card path.** The card becomes a noninteractive entity article
whose one native `<button type="button" aria-pressed>` seat spans specimen + identity and whose
compact strip is data. Add / edit / copy / provenance move to the **selected inspector** — the
33.3–36 % complementary region the binding Browse and Library compositions already reserve
(`VISUAL-CONSTITUTION.md §3.1`), where a colour has room for a value, a name, a real 24 px target
set, a keyboard path, a live region for copy confirmation, and a single owner for its geometry.

That single transposition discharges D-1 (no floating panel to style), D-2 (no `tag="button"`),
D-3 (real focus order in a real region), D-4 (the strip stops competing with itself), D-5 (the
inspector owns the empty state), D-6, D-8, D-9, D-13, D-15, D-16, D-18 and D-20 at once.

**If the seat is directed to keep the expansion instead**, the minimum honest set is: restore
`.floating-panel` into `demo/styles/` *or* replace it with `@mkbabb/glass-ui/popover` on **both**
branches (D-1); wrap every `WatercolorDot` in a named `<button>` seat per P051 (D-2, D-3); replace
the four hand-rolled triggers with `Button icon-only variant="ghost" size="sm"` (D-6, D-8, D-9);
adopt `--spacing(4)` (D-10); drop `font-bold` and the seed tint from the slug chip (D-11); gate the
height transition on PRM and move it onto `vj-morph`/`expandable-container` (D-7); design the N=0
and N>16 states (D-5, D-18). That is ten repairs to preserve a disclosure the constitution has
already ordered deleted — which is itself the argument for the transposition.

---

## §8 — Finding register

| ID | Sev | Finding | Family |
|---|---|---|---|
| D-1 | **BLOCKER** | `.floating-panel` undefined ⇒ hover menu `position:static`, renders at x=−720/y=900, unstyled | unverified producer migration |
| D-2 | **BLOCKER** | glass-ui 7 `WatercolorDot` `inheritAttrs:false` + `pointer-events:none` ⇒ touch path opens nothing | unverified producer migration |
| D-3 | **BLOCKER** | `aria-hidden` panel with 3 tabbable buttons; 0 of the panel's controls AT/keyboard reachable | state never designed |
| D-4 | MAJOR | Panel duplicates `PaletteColorStrip`; +111 px (N=5) / +181 px (N=24) for one datum | disclosure with no payload |
| D-5 | MAJOR | N=0 expands into a 24 px blank (ruled) band | state never designed |
| D-6 | MAJOR | Affordance inversion; 16×16 px target fails WCAG 2.5.8 | producer atom bypassed |
| D-7 | MAJOR | 350 ms `height` transition + smooth `scrollIntoView` run under PRM; untokenized | state never designed |
| D-8 | MAJOR | 4× hand-rolled icon button, hand-rolled chip + panel + expander | producer atom bypassed |
| D-9 | MAJOR | `ring-ring/40` reaches an empty token; paints opaque 2 px black | producer atom bypassed |
| D-10 | MAJOR | 12 px padding vs canon 16 px `--spacing(4)`; 10/12/12 internal drift | ladder non-conformance |
| D-11 | MAJOR | Provenance chip weight 700 > identity weight 500; seed tint on non-specimen | ladder non-conformance |
| D-12 | MINOR | `border-border/15` rule at 1.53:1 — present but invisible; 4 post-hoc alphas | disclosure with no payload |
| D-13 | MINOR | 111 px click dead-zone (`@click.stop`) | disclosure with no payload |
| D-14 | MINOR | `min-w-0` / `items-start` inert on the primary path | ladder non-conformance |
| D-15 | MINOR | Positioning split across 5 files; prop type widened at the seam | seam mis-placement |
| D-16 | MINOR | Floating clipboard promise; no success/failure state despite `ActionFeedback` in-card | state never designed |
| D-17 | MINOR | Raw CSS strings in accessible names (om-14 B5–B7) | ladder non-conformance |
| D-18 | MINOR | No cap/scroll at large N: 181 px, 168 nodes, 24 filter graphs at N=24 | disclosure with no payload |
| D-19 | INFO | The visual-audit corpus never captured this component populated | evidence-base defect |
| D-20 | INFO | 16/16 pass-through members; the seam crosses one interaction across 5 files | seam mis-placement |

---

## §9 — Reproduction

```bash
cd /Users/mkbabb/Programming/value.js
# dev server must be live on :9000 and reachable on the LAN interface
node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D1.mjs  # matrices
node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D2.mjs  # slug row
node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D3.mjs  # panel + PRM
node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D4.mjs  # N=0/24 + contrast
node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D5.mjs  # branch truth
node docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/probe-D6.mjs  # focus ring
```

The probes replace `localhost` with the LAN origin deliberately: `initApiEnvironment`
(`demo/platform/transport/availability.ts:20-37, 70-80`) latches `misconfigured` on a loopback page
origin and short-circuits every fetch, so no palette can be rendered — and no interception is
possible — from `localhost`.

Screenshots written beside this report: `shot-hover-panel-desktop.png` (the panel is open and
nowhere on screen), `shot-N0-expanded.png`, `shot-N24-expanded.png`, `shot-mobile-expanded.png`,
`shot-dark-expanded.png`, `shot-forced-colors-expanded.png`, `shot-focus-copyslug.png`,
`shot-desktop-light.png`.
