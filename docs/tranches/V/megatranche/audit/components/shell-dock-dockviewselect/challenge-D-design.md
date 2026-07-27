# CHALLENGE-D — design · `demo/shell/dock/DockViewSelect.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
seat, spawned with an explicit Opus 5 declaration in the seat brief. Not inherited, not
undeclared.

## Subject & substrate

| item | value |
|---|---|
| component | `demo/shell/dock/DockViewSelect.vue` — 162 lines |
| area | `demo/shell` |
| declared HEAD in the brief | `c654824e` |
| **actual HEAD at audit time** | `7cae8bd0` (`docs(V·megatranche): bank the wall-interrupted challenge harvest`) |
| producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/dist`) |
| dev server | `http://localhost:9000` → `200` |
| probes | `webkit` (Safari engine) + `chromium` (forced-colors, `:focus-visible`) via repo Playwright |
| probe artifacts | `scratchpad/D-probe{,2,3,4,5}.json`, `D-dock-*.png`, `D2-*.png`, `D3-*.png` |

**Verdict: DEFECTIVE.** The premise holds and holds hard. This is the primary navigation of the
whole product, and it is measurably unable to answer *"where am I?"* in four independent ways —
it is nameless on 7 of 14 routes, nameless at 200% browser zoom, nameless on mobile, and its open
menu marks the current destination with **zero** pixels. Separately, one inline style on line 70
**destroys the keyboard focus ring** on that same control — a re-run of the tranche's own U-F25
lesson, one abstraction level up.

---

## D-1 · BLOCKER — line 70 overwrites glass-ui's focus-ring token with a *color*, and the keyboard focus indicator on the product's primary navigation renders nothing

### The mechanism

glass-ui's dock stylesheet declares the ring as a **box-shadow value token**:

`node_modules/@mkbabb/glass-ui/dist/styles/tokens/sizing.css`
```css
--dock-ring: var(--focus-ring-shadow);
```
`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/index.css`
```css
.dock-icon-button:focus-visible, .dock-tab-button:focus-visible,
.dock-select-trigger:focus-visible, .dock-dropdown-trigger:focus-visible {
    box-shadow: var(--dock-ring);
    outline: none;
}
```

`DockViewSelect.vue:70` assigns that token a **color**:

```vue
:style="{ '--dock-ring': isAdminMode ? 'var(--color-gold)' : 'var(--accent-view)' }"
```

`box-shadow: oklch(…)` is invalid at computed-value time → `box-shadow` falls back to its initial
`none`. The producer rule has already applied `outline: none` in the same declaration block, so
there is **no fallback edge**.

### Measured (chromium, 1440×900, `/#/browse`, `scratchpad/D-probe2.json`)

Tab press **#1** lands on the control; `el.matches(":focus-visible") === true`:

```json
{ "active": true, "matchesFocusVisible": true,
  "boxShadow": "none", "outlineStyle": "none", "outlineWidth": "3px",
  "dockRing": "oklch(0.471189 0.0962884 89.834)" }
```

Control — the sibling `.dock-icon-button` in the same dock, same page, same frame:

```json
{ "cls": "dock-icon-button …",
  "dockRing": "0 0 0 2px color-mix(in srgb, oklch(47.1189…% 0.1884… 9.834deg) 30%, transparent),
               0 0 8px color-mix(in srgb, oklch(47.1189…% 0.1884… 9.834deg) 15%, transparent)" }
```

Direct substitution proof, run in-page on a throwaway node:

```json
"dockRingSubstitution": {
  "withConsumerValue":   "none",
  "withProducerDefault": "color(srgb 0.665504 0.000101413 0.261748 / 0.3) 0px 0px 0px 2px,
                          color(srgb 0.665504 0.000101413 0.261748 / 0.15) 0px 0px 8px 0px"
}
```

Visual: `scratchpad/D2-focus-chromium.png` — the trigger is focused and there is no ring, no
outline, no fill change. It is pixel-identical to its rest state.

### Reproduction

```
open http://localhost:9000/#/browse in Chrome → press Tab once →
DevTools ▸ Computed on button.view-select-trigger → box-shadow: none, outline-style: none
```

### Why this is a *design* defect, not a stray bug

`demo/styles/focus-ring.css:9–15` records the tranche's own prior finding verbatim:

> The U-F25 defect had TWO deaths: (1) an inline `boxShadow` on the control **CLOBBERED**
> Tailwind's `focus-visible:ring-2` box-shadow layer …

The identical failure has recurred one level up: not an inline `box-shadow` clobbering a ring, but
an inline **custom property** clobbering the ring's *token*. The design accepted "write a colour
into a producer variable and hope" as a legitimate theming route. It is not one; a value token has
a type, and this one is a shadow list. `VISUAL-CONSTITUTION.md:84` — *"Focus remains visibly
distinct from selection in both schemes, forced colors and reduced transparency"* — is violated at
the most-used control in the product.

**Cure (transposition, not patch).** The consumer must not retype a producer token. glass-ui
already separates *ring geometry* from *ring hue*: the correct seam is a hue input
(`--dock-ring-color` / `--focus-ring-hue`) that the producer composes into its own shadow list.
File it as a glass-ui BJ ask, and until it lands set nothing — the producer default ring is
correct and complete. Delete line 70's `--dock-ring` arm entirely; the admin/view hue already
speaks through the icon.

---

## D-2 · BLOCKER — the trigger is nameless on 7 of 14 routes, and wears the *admin* gold identity on two routes that are not admin

### Measured (webkit, 1440×900 so `isDesktop === true`, `scratchpad/D-probe3.json`)

Every named route walked in one session, reading `button.view-select-trigger` `innerText`:

| route | visible nav label | gold-shimmer icon | `document.title` |
|---|---|---|---|
| `/` | `"Home"` | false | `Color Picker` |
| `/palettes` | `"Palettes"` | false | `Palettes — Color Picker` |
| `/browse` | `"Browse"` | false | `Browse — Color Picker` |
| `/extract` | `"Extract"` | false | `Extract — Color Picker` |
| `/mix` | `"Mix"` | false | `Mix — Color Picker` |
| `/generate` | `"Generate"` | false | `Generate — Color Picker` |
| `/gradient` | `"Gradient"` | false | `Gradient — Color Picker` |
| `/atmosphere` | **`""`** | **true** | `Atmosphere — Color Picker` |
| `/blob` | **`""`** | **true** | `Blob — Color Picker` |
| `/admin/users` | **`""`** | **true** | `Users — Color Picker` |
| `/admin/names` | **`""`** | **true** | `Names — Color Picker` |
| `/admin/audit` | **`""`** | **true** | `Audit Log — Color Picker` |
| `/admin/flagged` | **`""`** | **true** | `Flagged — Color Picker` |
| `/admin/tags` | **`""`** | **true** | `Tags — Color Picker` |

Opening the menu on `/#/atmosphere` yields seven options with **`aria-selected="false"` on every
one** — the combobox reports *no selection at all* to assistive tech while the app is
unambiguously on a route whose `<title>` says "Atmosphere".

Independent corroboration in the tracked capture matrix (real Safari, not my probe):
`audit/visual/shots/safari-desktop-light/atmosphere.png` — the dock reads *gold sparkle glyph +
chevron*, no text, while the page H1 below reads "Atmosphere".

### Mechanism

Two different predicates decide two halves of one control.

`demo/shell/dock/composables/useDockAdminMode.ts:34–40` — the **option set**:
```ts
if (isAdminMode.value && isAdminAuthenticated.value) return adminViews.map(…);
return userViews.map(…);
```
`useDockAdminMode.ts:56–60` — **`isAdminMode`** flips on route alone, no auth:
```ts
watch(() => viewManager.currentView.value, (view) => {
    if (adminViews.includes(view)) isAdminMode.value = true;
});
```
`DockViewSelect.vue:70,80` consume `isAdminMode` alone for the gold ring and `gold-shimmer-icon`.

So an unauthenticated visitor on `/#/atmosphere` gets: `isAdminMode = true` (gold chrome) but
`viewEntries = userViews` (no matching option) → `SelectValue` has nothing to render → empty label.

### Compounding: there is no route guard at all

```
$ grep -rn "beforeEach" demo/          # (no matches)
```
`demo/color-picker/router/index.ts:30–34` declares `meta: { admin: true }` on all five admin
routes and **nothing ever reads it**. Dead metadata — an edict-2 legacy artefact.

### Answer to the brief's question — where are the other seven reachable from?

14 named routes + a catch-all redirect. The selector offers 7. The remaining **7** —
`/atmosphere`, `/blob`, `/admin/{users,names,audit,flagged,tags}` — are reachable from exactly one
place: the `__admin_toggle__` row at `DockViewSelect.vue:124`, which renders only inside
`v-if="pm.isAdminAuthenticated.value"` (line 122). For any non-authenticated visitor they are
**reachable only by typing a URL**, and typing one blanks the navigation and paints it gold.

`/atmosphere` and `/blob` are not admin surfaces by any product reading. `VISUAL-CONSTITUTION.md:58`
names the member-route inventory as *"exactly `/`, `/palettes`, `/browse`, `/extract`, `/mix`,
`/generate`, `/gradient`, `/easing`, `/atmosphere`, `/blob`, and `/about`"* and §7 gives Atmosphere
and Blob their own binding compositions (*"These are two compositions, not one settings page"*).
The canon says they are first-class destinations; the navigation says they are admin screens; the
router says anyone can walk in. Three answers, none agreeing.

**Cure.** One enumeration, one predicate. `viewSchema.ts` already types every view; add a single
`audience: "public" | "admin"` field there and derive both the option set *and* the mode flag from
it, so no state exists where the value has no option. `/atmosphere` and `/blob` become public
member routes (as the constitution already says they are) and the admin flag stops being a
route-shaped guess.

---

## D-3 · MAJOR — the open menu marks the current destination with zero pixels; selection and focus are the same nothing

### Measured (webkit, `/#/browse`, menu open, `scratchpad/D-probe.json`)

Seven rows, full computed-style read. `Browse` is the current route:

| row | `aria-selected` | `data-state` | background-color | color | font-weight | padding-left | box-shadow | outline |
|---|---|---|---|---|---|---|---|---|
| Home | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |
| Palettes | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |
| **Browse** | **true** | **checked** | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |
| Extract | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |
| Mix | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |
| Generate | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |
| Gradient | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none |

Every visual property of the selected row is **byte-identical** to the six unselected rows. Same
result in dark (`color: rgb(233,230,226)` on all seven). Visual confirmation:
`scratchpad/D-dock-open-light.png` — you cannot tell which of the seven you are on.

### Mechanism

glass-ui's menu row class carries no checked branch at all:

`node_modules/@mkbabb/glass-ui/dist/menuRowClass-Nh7CtMON.js`
```js
"interactive-item glass-menu-row",
"relative flex w-full cursor-default select-none items-center py-1.5",
"text-dropdown outline-none",
"data-[disabled]:cursor-not-allowed …"
```
`…/components/_shared/menu.css` styles only `:hover`, `:focus`, `[data-highlighted]`,
`[data-state="open"]` — i.e. **only the transient pointer/keyboard highlight.**

The producer's *entire* selected-state affordance is the `SelectItem` indicator gutter
(`select-BcBAyLXA.js`: `hideIndicator ? "none" : "start"` → a 8px dot in a `pl-7` gutter).
`DockViewSelect.vue:97` and `:127` pass **`hide-indicator` on every row**, deleting it. The
comment at lines 99–109 states the intent plainly — *"selection speaks reka's `aria-selected` +
the producer's glass-quiet highlighted-on-open row, never weight"* — but `[data-highlighted]` is
the **focus/hover** channel, not the selection channel. The design deliberately collapsed two
orthogonal states onto one, then deleted the only remaining marker.

`VISUAL-CONSTITUTION.md:83–84` is binding and explicit:

> Selected, failed, pending, withdrawn and disabled states are **never color-only**. …
> **Focus remains visibly distinct from selection** in both schemes, forced colors and reduced
> transparency.

Measured: selection is not colour-only — it is *nothing at all*, in both schemes, and in forced
colors the computed delta is likewise `0` (`scratchpad/D-probe2.json → forcedColorsOptions`: all
seven rows `bg: rgba(255,255,255,0)`, `color: rgb(0,0,0)`, `box-shadow: none`, `fw: 400`).

`PROPORTION-AUDIT.md:79` already ruled the same species for the sibling control:

> ColorSpaceSelector deletes `hide-indicator` and consumes the sole producer `SelectItem`
> indicator/gutter. Exactly one marker agrees with the option and `aria-selected` …

DockViewSelect is the *more* important instance of the identical species and is not covered by the
ruling. `grep -rn "hide-indicator" demo/` returns three sites: two of them are this file.

**Cure.** Delete both `hide-indicator` props. Consume the producer gutter. One marker, agreeing
with `aria-selected`, distinct from `[data-highlighted]`. The register row that closed
ColorSpaceSelector should be widened to *every* dock Select, not re-litigated per component.

---

## D-4 · MAJOR — at 200% browser zoom the navigation loses its text label entirely

### Measured (webkit, `/#/gradient`, 720×450 CSS px = 200% zoom on a 1440×900 display, `scratchpad/D-probe5.json`)

```json
"zoom200": { "label": "", "w": 56, "h": 32, "overflowX": 0 }
```

At 100% on the same machine the same control reads `"Gradient"` at 128.1px wide. At 200% it reads
**nothing** — a 56px icon-and-chevron stub.

### Mechanism

`DockViewSelect.vue:87` — `<SelectValue v-if="isDesktop" />`, where
`Dock.vue:71` — `const isDesktop = useMediaQuery("(min-width: 1024px)")`.

Browser zoom shrinks the CSS viewport, so a *device-class* media query fires as if the user
switched to a tablet. The label's presence is keyed to a global breakpoint rather than to the
control's own available space.

This is a direct hit on an already-open register row. `PROPORTION-AUDIT.md:60`, PR-16:

> Retain one route-identifying control; … **labels remain perceptible in both schemes**; no
> tooltip proliferation

and on the constitution's own evidence arms, which require *"actual 400% in-app Browser zoom"*
observations (`VISUAL-CONSTITUTION.md:62,64,78`). At 400% the label has been gone for an octave.

**Cure.** The label is not a desktop luxury; it is the control's identity. Keep it always and let
it earn its space: a container query on the dock band, or simply let the flex row shrink the label
with `text-overflow` — the longest label is 94.3px of ink (measured, D-9). Delete `isDesktop` from
this component's prop surface; a navigation control should not know what a desktop is.

---

## D-5 · MAJOR — the closed type matrix is violated: Fraunces on a control label and on every dropdown option

### Measured (webkit, `scratchpad/D-probe.json`)

```
trigger      font-family: Fraunces, "Fraunces Fallback", serif   16.4px / 400
label span   font-family: Fraunces, "Fraunces Fallback", serif   16.4px / 400
all 7 rows   font-family: Fraunces                               16.4px / 400
```

Visible in `scratchpad/D-dock-open-light.png` and in the tracked
`audit/visual/shots/safari-desktop-light/picker.png`: the whole menu is set in a display serif.

### The spec, quoted

`VISUAL-CONSTITUTION.md:75` (§4 Type jurisdictions, a table the same section calls *"closed across
all eighteen compositions"*):

> | control or label, **including dropdown options** | `text-small` | **Plus Jakarta Sans, non-bold** |

`VISUAL-CONSTITUTION.md:78`: *"Fraunces owns display/identity, Plus Jakarta Sans owns
headings/prose/controls … P019's family-neutral Picker identity/headline pair is the **sole**
paired-scale exception."*

`PROPORTION-AUDIT.md:15`: *"Dropdown options remain Plus Jakarta Sans `text-small` control copy and
non-bold."*

### Source

`DockViewSelect.vue:69` — `class="view-select-trigger text-small font-display font-normal …"`
`DockViewSelect.vue:91` — `<SelectGroup class="text-small font-display">`

`font-display` is Fraunces. Two lines put a display face on nine control labels. Note the internal
contradiction: the file's own comment at lines 99–109 fights hard to keep option weight at 400 for
exactly this law's sake, then sets the family to the one face the law forbids.

**Cure.** Delete `font-display` from lines 69 and 91. The role matrix already resolves the family;
no class is needed at all.

---

## D-6 · MAJOR — the mobile trigger is a 33.3px tap target on a 44px floor, and the producer already ships the token

### Measured (webkit, 390×844, `isMobile`, `hasTouch`, `scratchpad/D-probe.json`)

```json
"mobile-light-rest": { "rect": { "w": 58.72, "h": 33.34 }, "text": "" }
```

**33.34 CSS px** tall. The producer's own menu rows meet the floor in the same frame —
`menu.css`: `.glass-menu-row { min-block-size: max(2rem, var(--touch-target, 2.75rem)) }` → my
measurement of every open option row: `h = 44`. So glass-ui ships `--touch-target: 2.75rem`, uses
it on rows, and the trigger does not consume it.

The tracked audit corroborates: `audit/visual/REPORT.md` counts `smallTapTargets: 4` on
`safari-mobile-light /#/browse` — a route whose only chrome is the dock.

`PROPORTION-AUDIT.md:56` (PR-12) and `:72` (§5.7):

> Visual glyph size, operable target size and layout reservation are separate quantities.
> Accessibility floors do not require bloated visible chrome.

The cure is explicitly *not* "make the pill bigger" — it is an invisible seat. Note that `text: ""`
in the same measurement means the mobile control is *also* label-free (D-4's mechanism at its
design breakpoint), so the product's primary navigation on a phone is an unlabelled 33px house
glyph that doubles as the universal "go home" icon — the exact ambiguity PR-16 names
(*"remove redundant home when Picker text routes"*).

---

## D-7 · MAJOR — the per-view accent, the design's declared "one counterweight", carries near-zero information, and in dark mode it collapses to seven near-whites

### The design's own argument, turned on itself

`DockViewSelect.vue:37–47` records why the per-row hue legend was killed:

> the per-row view-hue legend … is EXCISED — **seven simultaneous 40°-fan hues at matched L/C
> carried near-zero discriminative information.** … The trigger/seal still name the CURRENT view
> in hue (`--accent-view`) — the ink menu's one counterweight (R1 SURVIVES).

The survivor is the *same* 40° fan at the *same* matched L, shown **sequentially** rather than
simultaneously. Absolute hue identification from memory is strictly harder than side-by-side
discrimination. The rationale that killed the legend kills the survivor a fortiori.

### Measured (webkit, both schemes, all seven user routes, `scratchpad/D-probe4.json`)

| route | light `--accent-view` | dark `--accent-view` |
|---|---|---|
| `/` | `oklch(0.470927 0.188343 9.834)` | `oklch(0.958322 0.021053 9.834)` |
| `/palettes` | `oklch(0.470927 0.124795 49.834)` | `oklch(0.958322 0.023120 49.834)` |
| `/browse` | `oklch(0.470927 0.096235 89.834)` | `oklch(0.958322 0.052509 89.834)` |
| `/extract` | `oklch(0.470927 0.126432 129.834)` | `oklch(0.958322 0.080000 129.834)` |
| `/mix` | `oklch(0.470927 0.093396 169.834)` | `oklch(0.958322 0.059837 169.834)` |
| `/generate` | `oklch(0.470927 0.081401 209.834)` | `oklch(0.958322 0.036916 209.834)` |
| `/gradient` | `oklch(0.470927 0.132719 249.834)` | `oklch(0.958322 0.020590 249.834)` |

Adjacent-pair separation in OKLab `(a,b)` (L is constant within each scheme, so this is the whole
distance):

| scheme | L | C range | adjacent min | adjacent max | global max pair |
|---|---|---|---|---|---|
| light | 0.470927 | 0.0814 – 0.1883 | **0.0608** | 0.1226 | 0.2794 |
| dark | 0.958322 | 0.0206 – 0.0800 | **0.0152** | 0.0522 | **0.0923** |

Dark mode's *entire* seven-view gamut spans **0.092** in OKLab — smaller than light mode's
*smallest adjacent step*. Home→Palettes in dark is **0.0152**, at or under a single JND, on a 24px
2px-stroke glyph. Every dark-mode view glyph renders as a near-white at L 0.958.

Light mode fails differently: the chroma is *not* matched, it ranges 2.31× (0.0814 at Generate to
0.1883 at Home), so the same semantic role reads vivid crimson on `/` and muddy grey-blue on
`/generate`. And `/browse` resolves to `oklch(0.47 0.096 89.8)` — a dark olive — sitting on a hot
pink ambient field. See `scratchpad/D2-focus-chromium.png`: the magnifier glyph reads as a
dirty/warning colour, not as an identity.

`VISUAL-CONSTITUTION.md:14` puts the dock in the **structural glass** tier: *"neutral
Clear-Ice/Smoke family"*, and `:178`: *"every other Dock label is neutral in both schemes."*

**Cure.** Retire the per-view hue from the dock entirely — it is the same subtraction W6-4 already
performed on the menu, left half-done. Route identity is the *word*, which the design keeps
deleting (D-2, D-4, D-6). Restore the word everywhere and the hue has no job left. If a chromatic
counterweight is wanted, it belongs where the constitution already sanctions colour — the ambient
field and the `Palettes` coordinate — not on a 24px chrome glyph at matched lightness.

---

## D-8 · MAJOR — the navigation is a direction island: `direction: ltr` inside an `rtl` document

### Measured (webkit, `document.documentElement.dir = "rtl"`, `/#/gradient`)

```json
{ "trigDir": "ltr", "parentDir": "rtl", "parentCls": "dock-face-content",
  "kids": [ {"tag":"svg","x":834.2}, {"tag":"SPAN","x":862.2,"t":"Gradient"}, {"tag":"svg","x":934.3} ] }
```

Full ancestor walk: `.dock-face-content`, `.dock-layer-group`, `.dock-layer`, `.dock-layers`,
`.dock-controls`, `.glass-dock`, `nav.dock-band`, `.app-layout`, `body`, `html` — **every one
computes `rtl`**. Only `button.view-select-trigger` computes `ltr`. Its children stay in physical
left-to-right order: icon → label → chevron, unmirrored.

Corroborated in the tracked matrix: `audit/visual/shots/rtl-desktop/picker.png` — the dock's outer
order mirrors correctly (`@mbabb · Login · Tools · Home` right-to-left) and the sibling
ActionBarToggle mirrors its own contents (brush and arrow swap sides), while the view-select alone
keeps `⌂ Home ⌄` in LTR order.

Open-menu measurement: the panel *placement* is RTL-aware (`alignedTo: "trigger-right"`) while
every row computes `direction: ltr` with symmetric `padding-left/right: 10px`. Placement and
contents disagree.

### Mechanism

Nothing in `demo/` sets this (`grep -rn 'dir="ltr"' demo/` → only `index.html:11`, the document
default, which my probe overrode). reka-ui's `Select` root supplies `dir` to trigger and content
and defaults to `"ltr"`; `DockViewSelect.vue:51–56` never passes `:dir`, and no app-level
`ConfigProvider` supplies one.

`VISUAL-CONSTITUTION.md:150` (§6.1 Direction jurisdictions) is unambiguous:

> | chrome, **navigation** and layout | logical inline/block direction follows the document |

**Cure.** Not a `:dir` prop on this instance — that is the per-instance-override anti-pattern
(edict 5) and would need repeating on every reka overlay in the app. One app-level reka
`ConfigProvider :dir` bound to the document direction, set once at the shell root.

---

## D-9 · MAJOR — the menu is a translucent window onto busy chromatic content; the page beneath cuts a visible seam across the option list

### Measured (webkit, `/#/browse`, menu open)

```json
"panelSurfaceAttr": "glass", "panelMaterialAttr": "overlay",
"panelBg": "oklab(0.955861 0.009528 0.029646 / 0.7488)",
"panelBackdrop": "blur(11px) saturate(1.6)"
```

25% of whatever is behind the menu comes through, blurred. See `scratchpad/D-dock-open-light.png`:
the Browse card's top edge (page y ≈ 325) runs straight across the panel, so **Home / Palettes /
Browse / Extract sit on a visibly different value than Mix / Generate / Gradient** — one option
list, two backgrounds, a hard horizontal seam through the middle of it.

`VISUAL-CONSTITUTION.md:19`: *"Glass earns its blur by revealing live content; otherwise it is a
neutral well."* A view menu reveals nothing meaningful — it reveals the page it is about to
replace. `:82`: *"Text, focus, boundaries and state meet their rendered contrast on the actual
material tier; a token name is not evidence."* Here the actual tier is *unknowable*, because it is
whatever route content happens to be underneath.

### Mechanism

glass-ui's `SelectContent` accepts a `surface` prop (`select-BcBAyLXA.js` props:
`surface`, `fieldHue`, `side`, `sideOffset`, `align`, `alignOffset`).
`DockViewSelect.vue:90` passes **only** `class="min-w-[12rem]"` — so the panel takes the default
`data-surface="glass"`.

**Cure.** `surface="opaque"`. A menu is a specimen well (constitution §2, "Specimen well —
opaque/quiet neutral stage"), not a pane of glass. The producer already offers the right rung; the
consumer simply never chose it.

---

## D-10 · MAJOR — the admin toggle is a command wearing `role="option"`, keyed by a magic sentinel

`DockViewSelect.vue:124–141`:

```vue
<SelectItem value="__admin_toggle__" class="py-1.5 px-2.5" hide-indicator>
    <span v-if="!isAdminMode">… Admin</span>
    <span v-else>… Back to app</span>
</SelectItem>
```
`useDockAdminMode.ts:70–77`:
```ts
if (id === "__admin_toggle__") { toggleAdminMode(); return; }
```

Three separate design faults in one row:

1. **A command in a selection model.** Every other row answers *"which destination am I on"*;
   this row is a verb. Selecting it never becomes the combobox's value, so its `aria-selected` is
   permanently a lie, and the constitution's global interaction grammar (`VISUAL-CONSTITUTION.md:96`
   — *select → tune → commit*, where *"Selection changes the active specimen without committing
   it"*) does not describe it.
2. **A sentinel string in the ViewId namespace.** `"__admin_toggle__"` is a contrivance (edict 3)
   that shares a type with real route names and is guarded only by string equality.
3. **A row whose label flips verb.** `Admin` (a destination noun) becomes `Back to app` (an action
   phrase) in the same slot, with a different icon and a different colour tier, so the row's
   identity is unstable across the two modes of the same menu.

**Cure.** The mode switch is not a destination. Once D-2's `audience` field exists, admin routes
are ordinary rows gated by authority and the toggle disappears entirely — a subtraction, which
`PROPORTION-AUDIT.md:71` requires before explanation (*"Subtraction precedes explanation"*).

---

## D-11 · MINOR — the divider is hand-rolled while `SelectSeparator` is already imported into scope

`DockViewSelect.vue:123`:
```vue
<div class="border-t border-border my-1"></div>
```

`demo/ui/select/index.ts:1` re-exports `SelectSeparator` from glass-ui. The producer recipe
(`select-BcBAyLXA.js`) is:
```
-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]
```
Three differences: `border-t` vs `h-px`, `--border` vs a 12% foreground mix, and no `-mx-1`, so the
hand-rolled line stops short of the panel's `--overlay-pad-inline` instead of spanning it. It is
also a bare `<div>` with no role inside a `role="listbox"`/`role="group"` subtree.

Edict 4 (glass-ui is the design system; reuse existing component-type names) — violated with the
correct component sitting unused in the same import barrel.

Separately, `PROPORTION-AUDIT.md:69` (§5.4) and PR-05 (`:49`) rule dividers **REMOVE** unless
grouping is otherwise ambiguous. The admin row already carries gold ink and a Shield glyph; the
line repeats a boundary that material already states.

---

## D-12 · MINOR — three per-instance overrides reach into producer internals

| line | override | what it fights |
|---|---|---|
| 69 | `[&>span]:line-clamp-none` | glass-ui's *internal* `line-clamp-1` on the trigger label span — an arbitrary-variant selector into another package's DOM. Self-documented at lines 57–59: *"Root fix is a `clampLabel` prop on glass-ui DockSelectTrigger (filed …)"* |
| 96, 126 | `class="py-1.5 px-2.5"` | `py-1.5` **duplicates** the producer value verbatim (`menuRowClass`: `… items-center py-1.5`); `px-2.5` overrides the producer's `px-2`. Measured `padding-left: 10px` where the producer says 8px |
| 90 | `min-w-[12rem]` | the producer's `--overlay-min-width` / `min-w-(--reka-select-trigger-width)` |

Edict 5 — *style at the root component level, never per-instance overrides*. All three are
per-instance. The first is acknowledged in-file as a stopgap and has been shipped as one; a filed
ask is not a cure, and the marker comment is now load-bearing documentation for a hack.

---

## D-13 · MINOR — the panel is 2.04× wider than its widest row's ink, and the comment claiming otherwise is measurably false

`DockViewSelect.vue:89–90`:
```vue
<!-- B.W1: kept wider than --menu-min-w — long view-option labels need the space -->
<SelectContent class="min-w-[12rem]">
```

Measured (webkit, `/#/browse`, menu open):

| | px |
|---|---|
| panel width | 192.0 |
| row width | 174.0 |
| **widest row content** (`Generate`, icon + gap + label) | **94.3** |
| Home / Palettes / Browse / Extract / Mix / Gradient | 70.9 / 85.0 / 81.2 / 79.7 / 52.3 / 92.1 |

Every row carries **79.7px of empty inline space** — 46% of the row. No label needs the 12rem
floor; the longest is 94.3px. `PROPORTION-AUDIT.md:5` — *"they do not excuse a mechanically large
gap"* — and `:73`, *"Real rendered relation wins over token intent."*

---

## D-14 · MINOR — the menu panel overlaps the dock band by 10.9px

Measured (webkit, `/#/browse`, menu open):

```
dock   .glass-dock  y 9.4 → bottom 71.4
panel  select-content  y 60.5 → bottom 388.7
overlap = 71.4 − 60.5 = 10.9 px
```

`VISUAL-CONSTITUTION.md:178`: *"The dock is its own top band, fully visible, focusable, and
**clipped by neither mask nor card**."* `:30` (§3 law 4): *"The top dock owns a reserved band."*
The menu is a card and it covers the band's lower 10.9px. Mechanism: glass-ui's `SelectContent`
defaults `sideOffset: 0` and the consumer never sets it; the trigger's bottom (56.4) is inside the
dock's own padding, so a zero offset lands the panel inside the band.

---

## D-15 · MINOR — icon and label are not choreographed; the icon plays `out-in` while the label swaps instantly

`DockViewSelect.vue:75–87`:
```vue
<Transition name="vj-morph" mode="out-in"> <component :is="currentIcon" :key="currentView" … /> </Transition>
<SelectValue v-if="isDesktop" />
```

`mode="out-in"` means the outgoing glyph must fully leave (`.vj-morph-leave-active`,
`--duration-fast`, `demo/styles/animations.css:111`) before the incoming one enters
(`--spring-snappy-duration`). `SelectValue` has no transition at all. So on every route change the
label snaps to the new destination while the glyph slot is still empty or mid-scale — two halves
of one 128px control on two different clocks, with a visible hole between them.

Positives, recorded honestly: the motion **is** tokenized (the shared `vj-morph` family in
`demo/styles/animations.css`, not an ad-hoc local keyframe), it animates `opacity`/`transform`
only (no layout-forcing property), and reduced-motion is correctly neutralised — measured under
`reducedMotion: "reduce"`: `transition-property: opacity`, `duration 0.15s` on the trigger, the
`--accent-view` sweep gone, via the global guard at `animations.css:184`. Edict 6 (animations are
moved or tokenized, never deleted) is satisfied.

---

## D-16 · MINOR — the icon is typed `unknown`, widening a schema field that is already `Component`

`demo/shell/viewSchema.ts:73` types it correctly: `icon: Component;`
`demo/shell/dock/composables/useDockAdminMode.ts:8–12` widens it away:
```ts
export interface ViewEntry {
    id: ViewId; label: string; icon: unknown;
    [k: string]: unknown;                      // ← plus an open bag
}
```
`DockViewSelect.vue:19` — `currentIcon: unknown;`

`<component :is="unknown">` type-checks against nothing. A component prop that accepts `unknown`
cannot be wrong at compile time and will only fail at render. The index signature `[k: string]:
unknown` additionally makes `ViewEntry` a bag rather than a shape — edict 1's god-module smell in
miniature.

`verbatimModuleSyntax` itself is clean: line 9 correctly uses `import type { ViewEntry }` and every
other import at lines 2–8 is a value import. No violation there.

---

## D-17 · INFO — two v-model idioms in one 162-line file, one emit declared twice

`DockViewSelect.vue:25–33`:
```ts
const emit = defineEmits<{
    "update:modelValue": [id: string];
    "update:open": [open: boolean];        // ← also declared by defineModel below
}>();
const open = defineModel<boolean>("open", { default: false });
```
`defineModel("open")` already registers the `open` prop and the `update:open` emit; the explicit
entry is redundant. Meanwhile `modelValue` takes the opposite route — a manual `emit` at line 55
with a hand-written `as string` cast. One component, two conventions for the same job.

---

## D-18 · INFO — states that were never designed

Enumerated against the seat brief's state list, by reading the template and the producer:

| state | handled? | evidence |
|---|---|---|
| populated | yes | 7 rows render |
| **empty** | **no** | `v-for="entry in viewEntries"` with no `v-else`; an empty `viewEntries` renders an empty panel with padding and no copy |
| **loading** | **no** | no state; `viewEntries` is synchronous, but `pm.isAdminAuthenticated` resolves async, so the admin row **pops in** after auth settles with no transition |
| **error** | **no** | `inject(SESSION_PORT_KEY)!` (line 35) — non-null assertion, no fallback; a missing provider is a render crash |
| **disabled** | **no** | never passed; the producer supports `disabled` on both `Select` and `SelectItem` and styles it (`data-[disabled]:opacity-disabled`), unused |
| **focused** | **broken** | D-1 — measured `box-shadow: none`, `outline: none` at `:focus-visible` |
| hovered / highlighted | producer | `menu.css` `.glass-menu-row:hover` |
| **selected** | **broken** | D-3 — measured zero delta |
| pressed / active | producer | — |
| dragging | n/a | — |
| **overflowing / truncated** | **partially undone** | `[&>span]:line-clamp-none` (line 69) *removes* the producer's clamp without supplying a replacement; nothing constrains a long label |
| **RTL** | **broken** | D-8 — measured `direction: ltr` inside `dir="rtl"` |
| reduced-motion | yes | measured; global guard applies |
| **forced-colors** | **partially broken** | selection delta measured `0`; the trigger glyph keeps its custom olive in forced-colors (`scratchpad/D2-forced-colors.png`) instead of adopting the system palette |
| **zoomed 200%** | **broken** | D-4 — measured `label: ""` |

Eight of fifteen states are unhandled or visually broken. Per the seat brief's own rule — *a state
that was never designed is a design defect* — that is the headline number for this component.

---

## D-19 · INFO — the `Palettes` identity coordinate renders as a dark two-tone wash, not a pastel rainbow

`DockViewSelect.vue:116` applies `.palettes-ramp-text` to exactly one row, per Q5. The recipe
resolves live to:

```
linear-gradient(90deg, oklch(0.470927 0.188343 329.834),
                       oklch(0.470927 0.188343 9.834),
                       oklch(0.470927 0.188343 49.834))
background-clip: text; color: transparent
```

Three stops spanning **80° of hue** (magenta → red → orange) at **L 0.4709** across an 85px word.
`VISUAL-CONSTITUTION.md:17` files this species under *"Watercolor/data … **pastel** `Palettes`
identity"* and `:23` calls it *"the pastel-rainbow identity"* with W19 owning the Dock witness.
Measured: L 0.47 is a dark tone, not a pastel; an 80° arc is not a rainbow; and at 85px the three
stops read as a single magenta-to-purple gradient (`scratchpad/D-dock-open-light.png`).

The mechanism is upstream (`demo/color-session/palettes-ramp.ts` + `useViewAccents`, which resolve
the stops from the live accent under a WCAG 4.5:1 text floor — the floor is what pushes L to 0.47).
DockViewSelect is the *witness*, not the cause; recorded here because W19 owns this witness and the
rendered result does not match the word the constitution uses for it.

---

## What I checked and found sound

Negative results, so this seat's silence is not mistaken for absence of inspection:

- **Edict 8, `verbatimModuleSyntax`** — clean. `import type { ViewEntry }` (line 9); all other
  imports are value imports. `npx vue-tsc` is not this seat's gate, but the file's import shape is
  correct by inspection.
- **Edict 6, animations never deleted** — the `vj-morph` family is consumed from the shared global
  `demo/styles/animations.css`, not re-declared locally; the scoped block (lines 148–161) carries
  one transition and a comment explaining that the byte-identical `.gold-shimmer-icon` twin this
  file once held was *retired into* the global recipe, which is the correct direction of travel.
- **Reduced motion** — measured working. `transition-property: opacity`, `0.15s`, `--accent-view`
  sweep neutralised.
- **Layout-forcing motion** — none. The transitions touch `opacity`, `transform` and a registered
  custom property; `max-height` resolves `none → none` here.
- **Menu row touch floor** — measured `h: 44` on every option in every matrix, desktop and mobile.
  The producer's `--touch-target` does its job on rows (the trigger is the exception, D-6).
- **Horizontal overflow** — `overflowX: 0` at 1440, 720 and 390 CSS px; the panel does not escape
  the viewport on mobile (`overflowsRight: false`, `overflowsBottom: false`).
- **Vue 3.5 idiom** — reactive props destructure at lines 11–23 is correct and current; no stale
  `toRefs` ceremony.
- **The pastel coordinate count** — exactly one row wears the ramp (line 116), matching
  `VISUAL-CONSTITUTION.md:23`'s "exactly two textual coordinates" law for the Dock half.

---

## Family grouping — the four mechanisms behind nineteen findings

1. **The consumer retypes producer contracts.** D-1 (a colour into a shadow token), D-11 (a
   hand-rolled divider beside the real one), D-12 (`[&>span]`, `px-2.5`, `min-w-[12rem]`), D-9
   (never choosing `surface`), D-3 (`hide-indicator` deleting the only marker). Every one of these
   is a case of reaching *past* glass-ui for something glass-ui already answers, and in D-1 the
   reach silently breaks a producer guarantee.
2. **Identity is derived twice from two different predicates.** D-2 (gold from `isAdminMode`,
   options from `isAdminMode && isAdminAuthenticated`), D-10 (a command inside the selection
   model), D-18's loading pop-in. One state, two owners, no reconciliation.
3. **The word is treated as optional and colour as sufficient.** D-4 (zoom), D-6 (mobile), D-2
   (7 routes), D-7 (hue carrying the load it cannot carry), D-3 (selection with no marker). The
   design keeps deleting the label and keeps promoting an indiscriminable hue to replace it.
4. **Global breakpoints and physical directions stand in for local, logical ones.** D-4/D-6
   (`min-width: 1024px` deciding what a control shows), D-8 (`ltr` inside `rtl`), D-14 (a zero side
   offset inside a reserved band).

## The single strongest defect

**D-1.** Every other finding degrades comprehension; D-1 removes an accessibility guarantee
outright, on the control a keyboard user reaches with the first Tab press, by a one-line inline
style — and it is a verbatim recurrence of a defect this tranche already diagnosed and wrote down
at `demo/styles/focus-ring.css:9–15`. A cure that only fixes the line, and not the practice of
writing consumer values into producer tokens, will produce a third instance.
