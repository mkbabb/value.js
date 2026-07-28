# CHALLENGE-D — PaletteCardMenu: the design is flawed

Seat: CHALLENGE-D (design axis) · 2026-07-28
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`).

---

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm, the tier
explicitly declared at spawn. The seat is declared, not inherited. **No defect on this axis.**

---

## Verdict

**DEFECTIVE — 5 BLOCKER, 10 MAJOR, 10 MINOR/INFO.**

The premise holds, and the failure is not decorative. Three separate things are true at once:

1. **The component should not exist.** `VISUAL-CONSTITUTION.md:102` says, in terms, that the palette
   card body "owns no expand, inline rename, **action menu**, transient result or hover-only
   swatch-action path," and that "rename/lifecycle/export actions and durable operation state live
   in the selected inspector." This file *is* that forbidden action menu, and it hosts rename,
   lifecycle and export.
2. **Its two most consequential rows do not render as designed.** `Delete` is styled destructive and
   renders in *exactly the same ink* as `Rename` — measured, in light, dark, mobile and
   forced-colors. And the whole `Export` submenu **cannot be opened by touch at all** — measured on
   an iPhone 14 context with a same-context control.
3. **Most of its declared styling is inert.** Of the styling tokens the file writes, **15 render
   nothing**, one renders the *opposite* of its name (italics), and one inline style is a
   documented "register" that the compiled CSS makes a no-op. The file's own comments describe a
   visual language — "the K-INV5 small-caps register" — that does not exist on screen.

The single strongest defect is **D-3**: `@click.prevent` on the Export sub-trigger
(`PaletteCardMenu.vue:108`) defeats the only path reka-ui offers a touch pointer to open a submenu,
so JSON / CSS / Tailwind / SVG / PNG export is **unreachable on every touch device**. Desktop hides
it because hover opens the submenu first.

---

## Method and probe log

**Static.** Full read of the SFC and its parent `PaletteCard.vue`; `PaletteRenameInput.vue`;
`demo/platform/transport/useApiClient.ts` and `availability.ts`; `demo/ui/dropdown-menu/index.ts`;
`demo/styles/foundation.css`; the three canon documents (`VISUAL-CONSTITUTION.md`,
`PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md`); the mega-tranche visual `REPORT.md` / `STATES.json`;
the **compiled** glass-ui 7.0.0 distribution (`node_modules/@mkbabb/glass-ui/dist/**` — components,
`glass-ui.css`, `styles/typography/semantic.css`, `styles/typography/utilities.css`); and
`node_modules/reka-ui/dist/Menu/MenuItem.js` + `MenuSubTrigger.js`.

**Live.** Playwright/Chromium against the running dev server `http://localhost:9000`, route
`/#/palettes`, `localStorage["color-palettes"]` seeded with a saved palette
(`versionCount:4`, `tier:"featured"`, 40-character name) plus a temporary palette. Matrices:
1440×1000 light, 1440×1000 dark, 390×844 light, RTL (`dir="rtl"`), `forcedColors:"active"` +
`reducedMotion:"reduce"`, 720×500 (zoom-equivalent), and an **iPhone 14 touch context**
(`hasTouch:true, isMobile:true`) driven with real `tap()`.

All numbers below are pasted tool output. Raw probe results and witnesses are tracked beside this
report:

| artefact | contents |
|---|---|
| `probe-D-results.json` | 6-matrix geometry + computed-style dump of the open menu |
| `probe-D2-results.json` | type/dead-class forensics, RTL physical-margin A/B, keyboard walk |
| `probe-D3-results.json` | destructive-ink cascade A/B, material register, rename focus |
| `probe-D4-results.json` | touch-tap submenu A/B (cancelable vs non-cancelable click) |
| `probe-D5-results.json` | instrumented event tail, desktop mouse vs touch |
| `evidence/desktop-light-menu-open.png` | the open menu, 1440×1000 light |
| `evidence/desktop-dark-menu-open.png` | the open menu, 1440×1000 dark |
| `evidence/mobile-light-submenu-open.png` | **the 390px submenu/parent collision** |
| `evidence/forced-colors-menu-open.png` | forced-colors, destructive ink collapsed |
| `evidence/touch-tap-export-subtrigger.png` | the submenu that will not open |

---

## Evidence gap this seat had to close first

The mega-tranche visual matrix **never opened this component**:

```
$ grep -c -i "dropdown\|palette menu" docs/tranches/V/megatranche/audit/visual/STATES.json
0
```

`REPORT.md` reports 60 captures across 15 routes; every one of them photographed a *closed* trigger.
Its `horizontalOverflow — 0` and `smallTapTargets` rows say nothing about this component. **Every
finding below is first-observation.** (INFO · D-24.)

---

## The findings

### D-1 · BLOCKER · The card action menu is constitutionally abrogated

`VISUAL-CONSTITUTION.md:102` (§5 Interaction grammar):

> "A palette card is a bounded entity article… **The card body owns no expand, inline rename, action
> menu, transient result or hover-only swatch-action path.** Full detail, rename/lifecycle/export
> actions and durable operation state live in the selected inspector."

`PROPORTION-AUDIT.md:77` (§5 law 12) is the same ruling from the proportion side:

> "The Card/article root is a noninteractive container… **Its one native named
> `<button type="button" aria-pressed>` child spans specimen/identity and alone owns activation.**"

`PaletteCardMenu.vue` is a 16-item action menu mounted inside the card body
(`PaletteCard.vue:83-106`), carrying rename (`:73`), lifecycle (`:15,:27,:48,:63,:133`), export
(`:107-130`) and admin (`:153-170`). It is precisely the object both documents delete. The card also
still carries `role="article"` + `@click` + `cursor-pointer` (`PaletteCard.vue:19-26`) instead of the
mandated single `<button aria-pressed>`, so the menu is nested inside a clickable non-button and
needs `@click.stop` at `PaletteCard.vue:82` to survive.

**Mechanism.** The component predates the constitution and was never reconciled with it. This is not
a defect *in* the design of the menu; it is a defect *of* having designed a menu.

**Cure (gestalt, not patch).** The 16 rows are not homeless. The constitution names their
destination: the **selected inspector**. Delete this file; move Save/Publish/visibility/Remix/Rename/
Tags/Versions/Export/Delete/Report/Admin into the inspector's action region, where a durable
operation state (D-5, PR-08) can actually be shown. The card keeps one `aria-pressed` seat.

---

### D-2 · BLOCKER · `Delete` renders in exactly the same ink as `Rename` — the destructive class is inert

`PaletteCardMenu.vue:135` and `:164` write `class="… text-destructive focus:text-destructive"`.
Measured across every matrix (`probe-D-results.json`):

```
--- desktop-light
   Publish    color=rgb(28, 25, 23)
   Rename     color=rgb(28, 25, 23)
   Export     color=rgb(28, 25, 23)
   Delete     color=rgb(28, 25, 23)      <-- identical
--- desktop-dark
   Delete     color=rgb(233, 230, 226)   <-- identical to Publish/Rename/Export
--- forced-colors
   Delete     color=rgb(0, 0, 0)         <-- identical
--- mobile-light
   Delete     color=rgb(28, 25, 23)      <-- identical
```

**Mechanism, isolated by A/B in-page** (`probe-D3-results.json`):

```json
"deleteClassList": "interactive-item glass-menu-row gap-2 cursor-pointer text-destructive focus:text-destructive dropdown-menu__item",
"colorWithProducerClass":    "rgb(28, 25, 23)",
"colorWithoutProducerClass": "rgb(219, 36, 36)",
"--destructive": "light-dark(hsl(0 72% 50%), hsl(0 80% 60%))"
```

glass-ui ships `.dropdown-menu__item{ … color:inherit; … }` (`glass-ui.css`). `.text-destructive`
has identical specificity (0,1,0) and loses on source order. Removing `dropdown-menu__item` from the
live node restores `rgb(219,36,36)` — the intended destructive red — proving the cascade collision.
`focus:text-destructive` dies the same way (measured focused state, `probe-D2-results.json`
`states.focused.color` = `rgb(28,25,23)`, unchanged).

The same mechanism kills `text-muted-foreground` on the `Report` row (`:145`). So the menu's entire
**severity ladder — destructive / neutral / de-emphasised — collapses to one ink.** The only thing
distinguishing `Delete` from `Rename` is a 16 px trash glyph and the word.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only."* Here they are not even color: they are nothing.

**Cure.** glass-ui `DropdownMenuItem` exposes `disabled`, `textValue`, `inset` — and no severity
axis. The producer-side cure is a `variant?: "default" | "destructive"` on `DropdownMenuItem`
(relay to the glass-ui BH inbox per the standing fond). The consumer-side cure is to stop writing
colour utilities that the producer's `color:inherit` is guaranteed to eat.

---

### D-3 · BLOCKER · The Export submenu cannot be opened by touch — all five formats unreachable on mobile

`PaletteCardMenu.vue:108`:

```html
<DropdownMenuSubTrigger class="gap-2 cursor-pointer" @click.prevent>
```

`node_modules/reka-ui/dist/Menu/MenuSubTrigger.js:131-140`:

```js
onClick: async (event) => {
    if (props.disabled || event.defaultPrevented) return;   // <-- early return
    event.currentTarget?.focus();
    if (!menuContext.open.value) menuContext.onOpenChange(true);
}
```

Reka opens a submenu from three paths: `onPointermove` (hover), `onKeydown` (ArrowRight/Enter), and
`onClick`. A touch pointer produces **no `pointermove`**, so `onClick` is its only path — and
Vue's `.prevent` modifier sets `defaultPrevented` before reka's handler runs.

**Measured, iPhone 14 context, real `tap()`** (`probe-D4-results.json`):

```json
"touchTap": {
  "before":    { "subContentPresent": false, "ariaExpanded": "false" },
  "afterTap1": { "subContentPresent": false, "ariaExpanded": "false", "dataState": "closed" },
  "afterTap2": { "subContentPresent": false, "ariaExpanded": "false" },
  "device": "iPhone 14", "hasTouch": true
}
```

**Same-context control** — a *non-cancelable* click, on which `preventDefault()` is a no-op so
`defaultPrevented` stays `false`:

```json
"cancelableControl": { "nonCancelableClick": { "subContentPresent": true, "ariaExpanded": "true" } }
```

**Instrumented event tail** (`probe-D5-results.json`) shows the identical `click` tail in both
pointer modes and the divergent outcome:

| pointer | last `click` `defaultPrevented` | preceded by `pointermove` | submenu |
|---|---|---|---|
| desktop mouse | `true` | yes (hover already opened it) | **open** |
| touch (iPhone 14) | `true` | **no** | **closed** |

So the desktop matrix *cannot see this defect* — hover masks it. Every touch user loses JSON, CSS
Custom Properties, Tailwind Config, SVG Swatch and PNG Swatch: the whole W51 export surface.

**Mechanism.** `@click.prevent` carries no handler and no comment. It is cargo — most likely copied
to stop the card's `@click` from firing, a job `PaletteCard.vue:82`'s `@click.stop` wrapper already
does.

**Cure.** Delete the modifier. It buys nothing and costs the export surface.

---

### D-4 · BLOCKER · The `misconfigured` availability state is unhandled — the app tells the user the backend is broken while the menu offers the doomed action

`PaletteCardMenu.vue:216-217`:

```ts
const { availability } = useApiClient();
const apiOffline = computed(() => availability.value === "unavailable");
```

`demo/platform/transport/availability.ts:40-45` declares **four** states:

```ts
export type ApiAvailability = "unknown" | "available" | "unavailable" | "misconfigured";
```

and `availability.ts:29-35` states the design intent of the fourth in as many words:

> "…enter a DISTINCT, designed `misconfigured` state that **fails LOUD (never the generic degraded
> affordance)**."

`apiOffline` tests one of the four. In `misconfigured` the backend is *definitively* unreachable and
`apiOffline` is `false`, so `Publish` renders enabled, undecorated, and doomed.

**This is the state the app was actually in during every capture in this report.** The status lamp
in the top-right of `evidence/desktop-light-menu-open.png` reads
`● DEV MISCONFIGURED — RUN 'NPM RUN DEV'` — the sibling consumer `DockStatusLamp` renders the loud
state correctly, styled `--destructive` (`.dock-status-lamp[data-variant="misconfigured"]`). Ten
pixels away, the menu renders as if everything were fine:

```
   Publish   disabled=false   (probe-D-results.json, desktop-light)
```

Two consumers of one latch; one honest, one not.

**Cure.** The latch is a four-state enum; the affordance must be a four-arm match, not a boolean.
`misconfigured` should read as its own annotation ("misconfigured"), not silence and not "offline".

---

### D-5 · BLOCKER · The Export seat is a one-click fire-and-forget; `PALETTE-CONTRACT` mandates a two-step seat with durable operation state

`PALETTE-CONTRACT.md:325` (Appendix W51, the byte-exact export authority):

> "Only after the verified bytes are resident in memory does the same action seat expose **Download
> FILENAME**; it is a fresh user activation, not an asynchronous continuation of Prepare."

and `:319`:

> "`state` is exactly `captured | ready | retryable-failure | terminal-failure | handoff-initiated`."

and `:174`: *"A serializer either yields the bytes below or a visible terminal/retryable operation
state — never a partial download or `console.warn`-only result."*

What the component implements (`:113-128`) is five identical rows:

```html
<DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', 'exportJSON')">JSON</DropdownMenuItem>
```

No **Prepare**, no **Download FILENAME**, no `captured`/`ready`, no `retryable-failure`, no
`terminal-failure`, no storage-recovery arm — and the menu closes the instant the row is chosen
(`PaletteCard.vue:317`), so there is nowhere for an operation state to live. `PROPORTION-AUDIT.md`
**PR-08** ("Pending/failure/export/recovery truth only transient" → **ADD-AFFORDANCE**, *"Persistent
entity status/recovery"*) names this exact row and assigns it W23.

**Cure.** Export is not a menu row. It is a seat with two activations and five persistent states —
i.e. it belongs to the inspector D-1 already sends everything else to.

---

### D-6 · MAJOR · One trailing slot carries two orthogonal facts, and availability destroys the visibility readout

`PaletteCardMenu.vue:56-59`:

```html
<span class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"
      style="font-variant: small-caps"
>{{ apiOffline ? "offline" : isPublic ? "public" : "private" }}</span>
```

The same pixel region means **current visibility** (`public`/`private`) on one adjacent row and
**availability failure** (`offline`) on the row above it (`:35-39`). Worse: within this row the two
facts are mutually exclusive, and availability wins. **The moment the backend goes down, the user
loses the ability to read whether the palette is public** — exactly when they most need to know what
state the thing is frozen in.

The two facts are independent. A row that is `private` and `offline` is a real state; the design has
no way to say it.

**Cure.** Availability is a property of the *action* (disabled + reason); visibility is a property of
the *entity* (persistent state). They cannot share a slot.

---

### D-7 · MAJOR · `DropdownMenuShortcut` is re-implemented three times, three different ways, and used zero times

glass-ui 7.0.0 ships the primitive for exactly this slot
(`dist/components/dropdown-menu/index.d.ts`), compiled to:

```css
.dropdown-menu__shortcut{font-size:var(--dropdown-text-secondary);letter-spacing:.1em;opacity:.6;margin-inline-start:auto}
```

The component hand-rolls it three times, and no two agree:

| site | recipe |
|---|---|
| `:37` | `ml-auto fira-code text-mono-caption opacity-55 tracking-wide` + inline `font-variant: small-caps` |
| `:57` | identical to `:37` |
| `:101` | `ml-auto text-caption text-muted-foreground` |

Repo-wide, `DropdownMenuShortcut` is exported by the barrel and consumed **zero** times:

```
$ grep -rn "DropdownMenuShortcut" demo/
demo/ui/dropdown-menu/index.ts:1: export { … DropdownMenuShortcut … } from "@mkbabb/glass-ui";
```

Measured divergence from the primitive (`probeD6`, same page, same font):

| property | consumer bundle | producer `.dropdown-menu__shortcut` |
|---|---|---|
| letter-spacing | **0.3596px** | 1.4384px |
| opacity | **0.55** | 0.6 |
| text-transform | uppercase | none |
| rendered width of "offline" | 64.47px | 50.09px |

Note the direction: `tracking-wide` (0.025em) is applied *on top of* `text-mono-caption`'s
`--type-tracking-caps` (0.1em) and **reduces** tracking to a quarter of the caption register's own
value. A class whose name says "wider" makes it 4× tighter.

Owner edict 4 (*glass-ui is the design system; reuse existing component-type names*) and edict 5
(*root-level styling, never per-instance overrides*) are both breached, in triplicate.

---

### D-8 · MAJOR · `ml-auto` is a physical margin; the annotation lands wrong in RTL

Three sites (`:37`, `:57`, `:101`) use `ml-auto` → `margin-left:auto`. glass-ui uses
`margin-inline-start:auto`. Measured in a live `dir="rtl"` document with the exact markup, against
the producer primitive as control (`probe-D2-results.json` `rtl`):

```json
{ "marginLeft": "17.4688px", "marginInlineStart": "0px",
  "annX": 17.5, "annRight": 81.9, "lblX": 89.9, "rowW": 178,
  "producerShortcut": { "marginInlineStart": "31.8438px", "annX": 0 } }
```

In RTL the consumer's annotation sits at x = 17.5 with 17.5 px of dead space beyond it and only the
8 px flex gap separating it from the label — it reads as a suffix of the label, not as a trailing
status. The producer's shortcut lands flush at x = 0, correctly at the row's inline end.

`VISUAL-CONSTITUTION.md §5.2` is titled *Direction, axes, and reordering*; the RTL matrix exists in
the mega-tranche shot set (`shots/rtl-desktop`, `shots/rtl-mobile`) but, per the gap above, never had
this menu open in it.

---

### D-9 · MAJOR · The one designed hand-off in the component — Rename — loses focus to the closing menu

`PaletteCard.vue:290-292` states the intent:

> "`rename` opens an inline input — keep the menu open visually until the input takes focus; all
> other actions close the menu immediately."

`PaletteRenameInput.vue:53-56` does its half correctly:

```ts
onMounted(() => { inputRef.value?.focus(); inputRef.value?.select(); });
```

Measured on both activation paths (`probe-D2-results.json` `enterOnItem`, `probe-D3-results.json`
`renameClick`):

```json
{ "menuStillOpen": false, "inputPresent": true, "inputFocused": false,
  "activeElement": "BUTTON/Palette menu" }
```

Both halves of the stated intent fail. The menu **does** close (reka's `handleSelect` calls
`rootContext.onClose()` regardless of the consumer's bookkeeping — `MenuItem.js:44-46` — and
`PaletteCard.vue:281` also sets `menuOpen=false` inside `startRenaming()`). And reka's
`closeAutoFocus` then returns focus to the trigger **after** the input has mounted and focused
itself, so the field the command just revealed is left unfocused with the caret nowhere.

**Mechanism.** glass-ui's `DropdownMenuContent` exposes a cancellable `closeAutoFocus` emit
(`DropdownMenuContent.vue.d.ts`) precisely for this hand-off. The component never listens to it. The
stale comment at `PaletteCard.vue:290-292` describes a behaviour that the chosen event
(`@click` rather than `@select` with `preventDefault`) cannot express.

**Cure.** `@close-auto-focus.prevent` on the content when the pending command owns a focus target;
or, per D-1, put rename in the inspector where a menu is not closing over it.

---

### D-10 · MAJOR · Identity/action hierarchy is inverted; the palette name renders at 0.71× the mandated rung, truncated to 56 %

`VISUAL-CONSTITUTION.md §4` type jurisdiction table:

| Semantic role | Exact glass-ui role | Family |
|---|---|---|
| palette identity | `--type-subheading` | Fraunces |

Measured (`probe-D2-results.json`, 1440 px):

| element | rendered |
|---|---|
| `--type-subheading` (mandated) | **20.352 px** |
| menu header (the palette name) | **14.384 px**, Fraunces, weight 600, `rgb(112,89,66)` = `--muted-foreground` |
| menu items | **16.4 px**, Fira Code, full-strength `--foreground` |

The identity is **smaller than every action beneath it and rendered in the muted role** — the
quietest element in a panel whose sole reason to have a header is to say which palette you are about
to delete. Ratio to the constitutional rung: 14.384 / 20.352 = **0.707**.

It is also destroyed:

```json
"label": { "text": "Muted Terracotta and Deep Sea Foam Study",
           "scrollW": 319, "clientW": 178, "max-width": "180px" }
```

178 / 319 = **56 % of the name is shown**. In `evidence/desktop-light-menu-open.png` the header reads
"Muted Terracotta an…" while the card behind it independently truncates to "Muted Terracot…" — the
same datum, two different clips, neither complete.

And `max-w-[180px]` (`:9`) never binds: the content box is 178 px (`w-48` = 192 px minus the
producer's 2 × 6 px content padding and 2 × 8 px item padding). It is a dead magic number.

---

### D-11 · MAJOR · Four type-jurisdiction violations, one of which renders the export formats in italic

`VISUAL-CONSTITUTION.md:75`: *"control or label, **including dropdown options** → `text-small`, Plus
Jakarta Sans, non-bold."* The matrix is declared **closed** across all eighteen compositions.

| site | declared | rendered | verdict |
|---|---|---|---|
| `:7` `class="w-48 text-small"` | PJS `text-small` | **Fira Code** 16.4 px | mono for control copy — outside the matrix |
| `:112` `class="text-caption"` on SubContent | smaller caption | 16.4 px **italic** Fira Code | see below |
| `:9` `font-display font-bold` | Fraunces 700 | Fraunces **600** | `font-bold` inert |
| `:155` `text-mono-caption uppercase tracking-wider` for "Admin" | — | mono uppercase caption | section heading in the mono/provenance role |

The mono is a project-wide decision — `demo/styles/foundation.css:374`
`--dropdown-menu-font: var(--font-mono)` — which is a root-level override in the right place. It is
nonetheless the mechanism by which every dropdown in the app renders control copy in the family the
constitution reserves for "value, code, or provenance". The menu reads as a terminal, not a menu
(`evidence/desktop-light-menu-open.png`).

The `text-caption` case is the sharp one. Source (`glass-ui/dist/styles/typography/semantic.css`):

```css
@utility text-caption { font-family: var(--font-text); font-size: var(--type-caption);
                        line-height: var(--type-leading-caption); font-style: italic; font-weight: 400; }
```

`text-caption` is the producer's **italic** caption voice. Applied to `DropdownMenuSubContent`:

- its `font-size` intent is **overridden** by `.dropdown-menu__item{font-size:var(--dropdown-text)}` —
  measured sub-items are 16.4 px, identical to the parent menu;
- its `font-style: italic` **inherits through** — measured `subContent.fontStyle: "italic"`,
  `subItem.fontStyle: "italic"`.

So the only rendered effect of a class chosen for size is obliqueness. See
`evidence/mobile-light-submenu-open.png`: *JSON*, *CSS Custom Properties*, *Tailwind Config*,
*SVG Swatch*, *PNG Swatch* all set in italic mono, while the parent menu is upright. Two type voices
in one menu tree, neither intended.

glass-ui already ships the correct utilities for this exact context and they are unused:
`.text-dropdown{font-size:var(--dropdown-text)}` and `.text-dropdown-secondary{…}`.

---

### D-12 · MAJOR · Hover and keyboard focus are the same background tint; there is no second channel and no way to tell them apart

Measured (`probe-D2-results.json` `states`):

```json
"rest":    { "bg": "rgba(0, 0, 0, 0)",                        "outline": "none 3px …", "boxShadow": "none", "textDecoration": "none" },
"focused": { "bg": "oklab(0.915626 0.00551148 0.0130686/0.52)","outline": "none 3px …", "boxShadow": "none", "textDecoration": "none" },
"activeIsItem": true
```

The keyboard walk shows the same value for every row (`probe-D2-results.json` `keyboard`): one
`data-highlighted` tint, no outline, no shadow, no decoration.

`VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency."* Here **hover and focus are not merely indistinct — they are
literally the same declaration**, and it is a background colour with no non-colour channel. In a menu
whose last row deletes the palette irreversibly and whose destructive ink is already dead (D-2), the
user has no visual answer to "where will Enter land".

---

### D-13 · MAJOR · The availability latch guards 2 of ~9 doomed remote actions

Every one of these emits an action that must reach the backend, and none reads `apiOffline`:

| row | line | remote write? | gated? |
|---|---|---|---|
| Save (`remote` arm) | `:15-22` | yes | **no** |
| Publish (`saved`) | `:27-40` | yes | yes |
| Make public / private | `:48-60` | yes | yes |
| Remix (fork) | `:63-70` | yes | **no** |
| Edit Tags | `:83-90` | yes | **no** |
| Versions | `:93-102` | yes | **no** |
| Delete (remote+owned) | `:133-140` | yes | **no** |
| Report (flag) | `:143-150` | yes | **no** |
| Feature / Unfeature | `:158-162` | yes | **no** |
| Delete (admin) | `:163-169` | yes | **no** |

A degraded-state affordance applied to 2 of 10 doomed actions is worse than none: it teaches the user
that an un-annotated row is safe, then fails eight of them silently.

---

### D-14 · MAJOR · The destructive row is grouped with a disclosure, with no separator between them

Measured group structure (`probe-D-results.json`, separator y-coordinates vs item rects):

```
label  (Muted Terracotta an…)     y 610
── separator ──                    y 653.1
Publish                            y 658.1
Rename                             y 702.1
── separator ──                    y 750.1
Export  ▸                          y 755.1
Delete                             y 799.1     <-- same group as Export, 44px below it
```

`PROPORTION-AUDIT.md §5` law 4: *"A divider is retained only when grouping would be ambiguous without
it."* Here the ambiguity is maximal and the divider is absent: an irreversible destructive action is
one 44 px row below a disclosure sub-trigger, in the same visual group, in identical ink (D-2), with
no confirmation step anywhere in the menu (`PaletteCardMenu.vue:136` → `PaletteCard.vue:295` →
`emit("delete")` — the menu itself offers no guard). On the fullest menu the `Delete (admin)` row
sits below it too.

---

### D-15 · MAJOR · At 390 px the Export submenu overlaps and obscures its own parent menu

Measured (`probe-D-results.json`, `mobile-light` + `mobile-light-submenu`):

```
parent menu   x = 151.0 … 343.0   (w 192)
sub-content   x =   0.0 … 210.9   (w 210.9)
overlap                            59.9 px
sub-content left edge                0 px from viewport edge
```

`evidence/mobile-light-submenu-open.png` is the witness: "CSS Custom Properties" and "Tailwind
Config" render *on top of* the parent's palette name and "Publish" row, both legible through the
translucent glass surface, producing overlapping double text. The submenu is clamped hard against
x = 0 with zero inset.

Two contributing design decisions: the parent is pinned to a fixed `w-48` (`:7`) while the submenu
sizes to content (192 px vs 210.9 px — the two panels of one menu are different widths), and no
`collisionPadding` / mobile disclosure alternative is chosen. `REPORT.md` reports
`horizontalOverflow — 0` for `/#/palettes`; the menu was closed in every capture, so the matrix never
saw this.

---

### D-16 · MINOR · 15 declared styling tokens render nothing; a 16th renders the opposite of its name

Every entry measured live on this page:

| token | sites | measured | status |
|---|---|---|---|
| `cursor-pointer` | **17** | `cursor: default` on every item (producer sets `cursor:default`) | **inert ×17** |
| `text-small` (`:7`) | 1 | items are `var(--dropdown-text)` = the identical clamp | **inert** |
| `font-bold` (`:9`) | 1 | `font-weight: 600` (producer `.dropdown-menu__label`) | **inert** |
| `max-w-[180px]` (`:9`) | 1 | `clientW` 178 < 180 → never binds | **inert** |
| `text-destructive`, `focus:text-destructive` | 4 | same ink as neutral rows (D-2) | **inert** |
| `text-muted-foreground` (`:145`) | 1 | same ink as neutral rows | **inert** |
| `text-caption` (`:112`) | 1 | size overridden; only italics survive | **inverted** |
| `style="font-variant: small-caps"` | 2 | see D-17 | **inert** |

`--dropdown-text` and `--type-small` are literally the same clamp:

```
"--dropdown-text": "calc(clamp( 0.875rem, 0.8rem + 0.25vw, 1.25rem ) * 1)"
"--type-small":         "clamp( 0.875rem, 0.8rem + 0.25vw, 1.25rem )"
```

A 228-line file whose declared visual intent is more than half inert is not a styled component; it is
a component that has never been looked at while running.

---

### D-17 · MINOR · The "K-INV5 small-caps register" the comments cite three times does not render

`PaletteCardMenu.vue:24-26`, `:42-47` and `:39`/`:59` all invoke a "small-caps annotation" register.
Measured A/B on the exact class bundle (`probeD6`, same page, same font):

```json
"withSmallCaps":    { "textTransform": "uppercase", "fontVariantCaps": "small-caps", "renderedWidth": 64.47 }
"withoutSmallCaps": { "textTransform": "uppercase", "fontVariantCaps": "normal",     "renderedWidth": 64.47 }
"identicalWidth": true
```

glass-ui's `@utility text-mono-caption` includes `text-transform: uppercase`
(`styles/typography/utilities.css`). `font-variant: small-caps` only substitutes small capitals for
**lowercase** glyphs; there are none left. The annotation renders as plain uppercase — **identical
rendered width with and without the inline style**. The register described in three separate comment
blocks, and used as the justification for hand-rolling `DropdownMenuShortcut` (D-7), is fiction.

Two further breaches ride along: it is an **inline style** (edict 5, root-level styling), duplicated
verbatim at `:39` and `:59`; and `fira-code` at `:37`/`:57` is redundant because `text-mono-caption`
already sets `font-family: var(--font-mono)`.

---

### D-18 · MINOR · Three shadow languages and two radii in one interaction

Measured (`probe-D3-results.json` `material`):

| surface | radius | shadow |
|---|---|---|
| palette card | **16 px** (`--radius-card` 1rem) | 3-layer **hard offset** `-3px 3px 0`, `-5px 5px 0`, `-7px 7px 0` |
| the menu it opens | **12 px** (`--radius-panel`) | soft glass stack `0 8px 32px -4px`, `0 8px 24px 0`, + 4 insets |
| declared token | — | `--shadow-card: 8px 8px 0px 0px …` |
| menu item | 8 px | concentric ideal = 12 − 6 = **6 px** |

`demo/styles/foundation.css:359-368` states the project law in its own comment:

> "…so `shadow-card` consumers and explicit `shadow-cartoon` consumers render **one cartoon
> language — no fourth ad-hoc shadow recipe**."

The menu is that fourth recipe. Optically the card is a pop-art paper cut-out with a hard black
caster; the menu that springs from it is frosted iOS glass. They are witnessed together in
`evidence/desktop-light-menu-open.png` and they do not belong to the same object.

(The item-radius error and the panel radius are producer-owned — relay to glass-ui rather than
patch locally.)

---

### D-19 · MINOR · A stringly-typed command bus between two files in the same folder, with one dead command

`PaletteCardMenu.vue:225`: `action: [action: string]`. `PaletteCard.vue:293-313` receives it into a
`Record<string, () => void>` and silently drops unknown keys (`if (!fn) return;`). Consequences:

- a typo in any of the 17 emitted literals compiles, ships, and no-ops;
- `copyAll` exists in the parent map (`PaletteCard.vue:294`) with **zero producers**:

```
$ grep -rn "copyAll" demo/
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294: copyAll: () => …
```

Dead code inside a lookup that also swallows typos. Edicts 2 (no legacy code) and 3 (KISS) both apply.
The type exists to be written: a union of the 17 literals costs one line.

---

### D-20 · MINOR · Two activation idioms in one menu — 11 `@click`, 5 `@select`

The eleven main rows use `@click`; the five export rows use `@select`. glass-ui declares `select` as
the contract, with a documented cancellation semantic:

```ts
export interface DropdownMenuItemEmits { /** Cancel this event to keep the menu open. */ select: [event: Event]; }
```

`@click` runs in parallel with reka's `handleSelect` and cannot cancel it — which is precisely why
D-9's "keep the menu open" intent is unachievable on the rename row. One menu, two idioms, one of
them outside the producer's contract.

---

### D-21 · MINOR · Two verbs mean the same thing, one word means two things

- **"Publish"** at `:33` (create a remote resource from a saved local palette) and **"Publish"** at
  `:55` (flip an existing remote palette's visibility to public) are different operations behind one
  word, both wearing the same `Globe` glyph.
- On a `remote` palette the menu offers **Save** (`:15-22`, copy to local) *and* **Remix** (`:63-70`,
  fork) — two adjacent copy verbs with no stated distinction.

`PROPORTION-AUDIT.md` **PR-06** ("Three adjacent action species or duplicated selected fills" →
**REMOVE**, *"One action/selection owner"*) is the governing row.

---

### D-22 · MINOR · The Versions row gates on a different predicate than every sibling

`:94`: `v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"`. Every other conditional in the
file gates on `paletteKind`. `getPaletteKind` (`demo/palettes/utils.ts:22-31`) derives `remote`
from exactly `!palette.isLocal`, so the two are equivalent today — which makes this a second,
redundant encoding of the same fact that will drift the moment `getPaletteKind` gains a case.

---

### D-23 · MINOR · `demo/ui/dropdown-menu/` is a pure re-export alias

```ts
export { DropdownMenu, …, DropdownMenuSubContent } from "@mkbabb/glass-ui";
```

One line, fourteen names, zero behaviour. `PaletteCardMenu.vue:180-190` imports through it rather
than from `@mkbabb/glass-ui` directly. Edict 2 forbids aliases; edict 4 says primitives belong in
glass-ui, not in `demo/ui/`. It is also the *only* thing standing between this consumer and the
`DropdownMenuShortcut` it re-exports but never uses (D-7).

---

### D-24 · INFO · The mega-tranche visual matrix has zero coverage of this component

See the gap section above: 60 captures, 0 with the menu open; `STATES.json` contains no
`dropdown`/menu row. The `smallTapTargets`, `namelessButtons` and `horizontalOverflow` columns for
`/#/palettes` and `/#/browse` describe the closed trigger only.

---

### D-25 · INFO · Density: the fullest menu is a 192 px column that scrolls

Measured: item height **44 px**, content `padding: 6px`, `max-height: var(--overlay-max-block)` =
600 px at 1000 px viewport height and **300 px at 500 px**. The fullest arm (`remote` + `isOwned` +
`isAdmin` + versions) renders 10 items + 2 labels + 3 separators ≈ **543 px**. Below roughly a 640 px
viewport height — a landscape phone, or a laptop at 150 % browser zoom — the menu scrolls internally
in a 192 px-wide column, with `Delete` and `Delete (admin)` below the fold. The 720×500 probe
confirms the clamp:

```json
"zoom200": { "contentStyles": { "max-height": "300px" }, "overflowsViewport": false }
```

(the 4-item `saved` arm fits; the 10-item arm cannot).

---

## State coverage — the enumeration the seat asked for

| state | handled? | evidence |
|---|---|---|
| empty (no applicable rows) | n/a — every arm renders ≥ 3 rows | source enumeration |
| loading / in-flight | **NO** — menu closes on activation, no pending state | `PaletteCard.vue:317`; D-5 |
| populated | yes | `probe-D-results.json` |
| error / retryable / terminal | **NO** — contract mandates 5 states, 0 implemented | `PALETTE-CONTRACT.md:319`; D-5 |
| disabled | partial — 2 of 10 doomed actions | D-13 |
| focused | **color-only, identical to hover** | D-12 |
| hovered | color-only, identical to focus | D-12 |
| active / pressed | **none** — no `:active` treatment anywhere | measured: `boxShadow:none`, no transform |
| selected | n/a (menu, not a listbox) | — |
| dragging | n/a | — |
| overflowing (10-item arm) | scrolls, destructive rows below fold | D-25 |
| truncated (long name) | **YES, badly** — 56 % of the name shown | D-10 |
| RTL | **broken** — physical `ml-auto` ×3 | D-8 |
| reduced-motion | **OK** (producer): `transition-property` collapses `scale,translate,opacity,filter,display,overlay` → `opacity`, 0.35 s → 0.15 s | `probe-D-results.json` `forced-colors.contentStyles` |
| forced-colors | **degraded** — severity ladder collapses to one ink | D-2; `evidence/forced-colors-menu-open.png` |
| zoomed 200 % | menu fits at the 4-item arm; 10-item arm scrolls | D-25 |
| touch | **BROKEN** — Export submenu unopenable | D-3 |
| API `misconfigured` | **unhandled** | D-4 |
| API `unknown` | renders optimistic (defensible) | source |

Eight of nineteen states are unhandled, broken, or degraded. **Two of them (touch, `misconfigured`)
are states in which the component's headline features simply do not work.**

---

## Motion

The component declares **no motion of its own** — correct under edict 6 (nothing was deleted here).
All motion is producer-owned and, measured, well-behaved:

| context | `transition-property` | duration |
|---|---|---|
| default | `scale, translate, opacity, filter, display, overlay` | 0.35 s |
| `prefers-reduced-motion: reduce` | `opacity` | 0.15 s |

No layout-forcing property is animated (`scale`/`translate` are composited; `width`/`height`/`top`
are absent). `animation-name: none`, `animation-duration: 0s` in the default arm; `1e-05s` under
reduce. **Motion is the one axis on which this component has no defect.**

---

## Design-system boundary — summary

| breach | edict | finding |
|---|---|---|
| `DropdownMenuShortcut` re-implemented ×3, used ×0 | 4 | D-7 |
| inline `style="font-variant: small-caps"` ×2 | 5 | D-17 |
| `cursor-pointer` ×17 / `text-small` / `text-caption` / `font-bold` / `max-w-[180px]` — per-instance overrides of producer roots, all inert | 5 | D-16 |
| `demo/ui/dropdown-menu/` alias barrel | 2, 4 | D-23 |
| `text-destructive` has no producer seam → severity cannot be expressed | 4 (relay) | D-2 |
| `copyAll` dead branch; stringly-typed bus | 2, 3 | D-19 |
| `@click.prevent` cargo | 3 | D-3 |

`verbatimModuleSyntax` (edict 8) is **clean**: `import type { Palette }` (`:177`) and
`import type { PaletteKind }` (`:178`) are both correct.
Vue 3.5 idiom (edict 7) is **clean**: reactive props destructure at `:206`, `computed` where needed,
no stale-`defineModel` hazard (no `defineModel` here). No god module (edict 1) — 228 lines, one job.

---

## Proportion and seat law — the judgment

| canon row | verdict |
|---|---|
| `VISUAL-CONSTITUTION.md:102` — card body owns no action menu | **VIOLATED in whole** (D-1) |
| `VISUAL-CONSTITUTION.md:75` — dropdown options are `text-small` PJS non-bold | VIOLATED (D-11) |
| `VISUAL-CONSTITUTION.md §4` — palette identity is `--type-subheading` | VIOLATED, 0.707× (D-10) |
| `VISUAL-CONSTITUTION.md §4.1` — states never color-only | VIOLATED; here not even colour (D-2, D-12) |
| `VISUAL-CONSTITUTION.md §4.1` — focus distinct from selection | VIOLATED (D-12) |
| `VISUAL-CONSTITUTION.md §5.2` — direction/axes | VIOLATED in RTL (D-8) |
| `PROPORTION-AUDIT.md §5` law 4 — dividers only where grouping is ambiguous | VIOLATED, inverted (D-14) |
| `PROPORTION-AUDIT.md §5` law 8 — real rendered relation beats token intent | VIOLATED (D-16: 15 inert tokens) |
| `PROPORTION-AUDIT.md §5` law 12 — card root noninteractive, one named button | VIOLATED (D-1) |
| `PROPORTION-AUDIT.md` **PR-06** — one action owner | VIOLATED (D-21) |
| `PROPORTION-AUDIT.md` **PR-08** — persistent operation state | VIOLATED (D-5) |
| `PALETTE-CONTRACT.md:319, :325` — Prepare→Download, 5 durable states | VIOLATED (D-5) |

---

## What is actually sound (the negative proof)

This is not a component with nothing right in it, and the seat should say so precisely:

1. **Motion is correct and PRM-honest** — measured collapse to `opacity`/0.15 s under
   `prefers-reduced-motion: reduce`; no layout-forcing property animated; no local keyframes added or
   deleted.
2. **`verbatimModuleSyntax` is clean** — both type imports are `import type` (`:177-178`).
3. **Vue 3.5 idiom is clean** — reactive props destructure (`:206`), `computed` for both derived
   flags, no `defineModel` stale-read hazard.
4. **The DI seam is right** — `useApiClient()` (`:216`) reads the availability latch through the
   provided client rather than a module singleton, exactly as `useApiClient.ts:9` intends. The bug is
   the predicate (D-4), not the seam.
5. **The degraded-state instinct is right** — annotating a disabled action with a named reason
   in-register, rather than a toast, is the correct pattern (`VISUAL-CONSTITUTION.md §4.1`). It is
   applied to too few actions (D-13), rendered in the wrong register (D-17) and destroys a competing
   fact (D-6) — but the instinct is canon-aligned.
6. **`aria-*` and roles are producer-correct** — measured `role="menuitem"`, `tabindex="-1"`,
   `aria-haspopup="menu"`, `aria-expanded` on the sub-trigger; keyboard `ArrowDown` walks every row
   with `data-highlighted` set (`probe-D2-results.json` `keyboard`). The trigger carries
   `aria-label="Palette menu"` (`PaletteCard.vue:100`) and does **not** appear in `REPORT.md`'s
   `namelessButtons` rows for `/#/palettes`.
7. **The component is not a god module** — 228 lines, one responsibility, sub-components colocated.

---

## The cure, as one move rather than twenty patches

Twenty of these findings are downstream of one architectural fact: **an entity's lifecycle,
export and destruction were put inside a 192 px transient overlay hanging off a card.** A transient
overlay cannot hold a durable operation state (D-5), cannot hold two orthogonal status facts (D-6),
cannot hand focus to an inline editor it is closing over (D-9), cannot give an identity its
constitutional rung in 178 px (D-10), and cannot afford a confirmation step before an irreversible
delete (D-14).

The canon already wrote the transposition, and it is not "fix the menu":

> "Full detail, rename/lifecycle/export actions and durable operation state live in the selected
> inspector." — `VISUAL-CONSTITUTION.md:102`

**Move the seventeen actions into the selected inspector; delete `PaletteCardMenu.vue`; reduce the
card to the single `<button aria-pressed>` seat of `PROPORTION-AUDIT.md §5` law 12.** D-1, D-5, D-6,
D-9, D-10, D-14, D-15, D-21 and D-25 dissolve rather than get patched. D-3, D-4, D-13, D-19 and D-20
are logic that moves with the actions and is fixed in transit. D-2, D-7, D-8, D-11, D-16, D-17,
D-18 and D-23 are design-system-boundary rows that outlive the move and want a glass-ui relay
(a `variant="destructive"` seam on `DropdownMenuItem`, and consumers that stop writing utilities the
producer's `color:inherit` will eat).

Two of them, however, are shipping breakage that should not wait for the transposition:
**D-3** (five export formats unreachable on touch — one deleted modifier) and **D-2** (the delete row
is chromatically indistinguishable from rename).

---

*No source files were edited by this seat. Every artefact written lives under*
`docs/tranches/V/megatranche/audit/components/PaletteCardMenu/`.
