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
| **actual HEAD at audit time** | `065a8d40` (`docs(V·megatranche): register owner marks OM-5..OM-10`) |
| producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/dist`) |
| dev server | `http://localhost:9000` → `200` |
| probes | `webkit` (Safari engine) + `chromium` (real `Tab` / `:focus-visible`) via repo Playwright |
| tracked π banked here | `pi-D1-focus-ring-absent.png`, `pi-D1-focus-ring-control-sibling.png`, `pi-D3-selection-zero-delta.png` |

**Provenance note.** An earlier run of this same seat was wall-interrupted after banking its
report. This pass **re-measured every load-bearing claim from zero at the current HEAD**, kept the
finding IDs stable, **corrected one misattributed corroboration (D-6)**, strengthened D-1 with a
producer-wide enumeration that changes its cure, and added D-20. Every number below is my own
measurement in this session unless the row says otherwise.

**Verdict: DEFECTIVE.** The premise holds and holds hard. This is the primary navigation of the
whole product, and it is measurably unable to answer *"where am I?"* in five independent ways — it
is nameless on 7 of 14 routes, nameless at 200% zoom, nameless on mobile, its open menu marks the
current destination with **zero** pixels, and the one row it *does* paint is a row that is never
selected. Separately, one inline style on line 70 **destroys the keyboard focus ring** on that same
control, and does so in exchange for an effect that does not exist in the producer at all.

---

## D-1 · BLOCKER — line 70 writes a *colour* into a producer *shadow-list* token, deleting the focus ring on the first control a keyboard reaches — in exchange for nothing

### The producer contract

`node_modules/@mkbabb/glass-ui/dist/styles/tokens/sizing.css`
```css
--dock-ring: var(--focus-ring-shadow);
```
`node_modules/@mkbabb/glass-ui/dist/styles/tokens/…`
```css
--focus-ring-shadow: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--focus-ring-color) 30%, transparent),
                     0 0 8px color-mix(in srgb, var(--focus-ring-color) 15%, transparent);
```
`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/index.css`
```css
.dock-icon-button:focus-visible, .dock-tab-button:focus-visible,
.dock-select-trigger:focus-visible, .dock-dropdown-trigger:focus-visible {
    box-shadow: var(--dock-ring);
    outline: none;
}
```

`DockViewSelect.vue:70` assigns that token a bare colour:

```vue
:style="{ '--dock-ring': isAdminMode ? 'var(--color-gold)' : 'var(--accent-view)' }"
```

`box-shadow: oklch(…)` is invalid (box-shadow requires ≥2 lengths) → the declaration is dropped →
`box-shadow` computes to its initial `none`. The producer rule has already set `outline: none` in
the same block, so **there is no fallback edge**.

### Measured — chromium, 1440×900, `/#/browse`, one real `Tab` press each, same frame

| Tab | element | `:focus-visible` | computed `box-shadow` | computed `--dock-ring` |
|---:|---|---|---|---|
| **#1** | **`button.view-select-trigger`** | **`true`** | **`none`** | **`oklch(0.471189 0.0962884 89.834)`** ← a colour |
| #2 | sibling dock button | `true` | `…0.3) 0px 0px 0px 2px, …0.15) 0px 0px 8px 0px` | `0 0 0 2px color-mix(…), 0 0 8px color-mix(…)` ← a shadow list |
| #3 | sibling dock button | `true` | *(identical to #2)* | *(identical to #2)* |

`outline-style: none`, `outline-width: 3px` on #1 — the width is inert because the style is `none`.

In-page substitution control (webkit, throwaway node, same frame):

```json
{ "dockRingRaw": "oklch(0.470927 0.096235 89.834023)", "substitutedBoxShadow": "none" }
```

Visual π: `pi-D1-focus-ring-absent.png` (trigger focused — pixel-identical to its rest state in the
tracked `visual/shots/safari-desktop-light/browse.png`) vs `pi-D1-focus-ring-control-sibling.png`.

### The new fact that changes the cure — the effect line 70 is *for* does not exist

The in-file comment at lines 61–65 justifies the assignment as a *ring seam*:

> The ring seam (`--dock-ring`) is re-wired off the live accent onto the view accent: it is the
> W7-1 morph clause's continuity carrier (the seal rim grows into this ring — one hue held the
> whole way).

I enumerated every consumer of that token in the whole producer:

```
$ grep -ro "var(--dock-ring[^)]*)" --include="*.css" node_modules/@mkbabb/glass-ui/dist | sort | uniq -c
   1 components/dark-mode-toggle/dark-mode-toggle.css:var(--dock-ring)
   1 components/dock/styles/index.css:var(--dock-ring)
```

Both are `:focus-visible` box-shadows. **glass-ui 7.0.0 has no resting ring.** There is no seam for
a hue to be carried in. Line 70's entire positive effect is zero; its entire actual effect is the
deletion of the focus indicator on the control a keyboard user reaches first.

### Why this is a *design* defect, not a stray bug

`demo/styles/focus-ring.css:9–15` records this tranche's own prior finding verbatim:

> The U-F25 defect had TWO deaths: (1) an inline `boxShadow` on the control **CLOBBERED**
> Tailwind's `focus-visible:ring-2` box-shadow layer …

The identical failure recurred one abstraction level up: not an inline `box-shadow` clobbering a
ring, but an inline **custom property** clobbering the ring's *token*. The design accepted "write a
colour into a producer variable and hope" as a legitimate theming route. A value token has a type,
and this one is a shadow list. `VISUAL-CONSTITUTION.md:84` — *"Focus remains visibly distinct from
selection in both schemes, forced colors and reduced transparency"* — is violated at the most-used
control in the product. (D-3 shows selection is *also* nothing, so the two states are equal and
both empty.)

**Cure — transposition, and it needs no producer ask.** The producer already separates ring
*geometry* from ring *hue*: `--focus-ring-shadow` composes `--focus-ring-color`. Delete line 70's
`--dock-ring` arm outright. If the dock genuinely wants a per-view focus hue, the one-token seam is
`--focus-ring-color`, which the producer composes into its own shadow list — a consumer supplying a
colour where a colour is expected. The general rule the register should carry: **a consumer may set
a producer token only at the type the producer declared for it.**

---

## D-2 · BLOCKER — the trigger is nameless on 7 of 14 routes and wears the *admin* gold identity on two routes that are not admin

### Measured — webkit, 1440×900 (`isDesktop === true`), one session walking every named route

| route | visible nav label | gold-shimmer icon | trigger width | `document.title` |
|---|---|---|---:|---|
| `/` | `"Home"` | false | 106.9 | `Color Picker` |
| `/palettes` | `"Palettes"` | false | 121.0 | `Palettes — Color Picker` |
| `/browse` | `"Browse"` | false | 117.2 | `Browse — Color Picker` |
| `/extract` | `"Extract"` | false | 115.7 | `Extract — Color Picker` |
| `/mix` | `"Mix"` | false | 88.3 | `Mix — Color Picker` |
| `/generate` | `"Generate"` | false | 130.3 | `Generate — Color Picker` |
| `/gradient` | `"Gradient"` | false | 128.1 | `Gradient — Color Picker` |
| `/atmosphere` | **`""`** | **true** | 60.0 | `Atmosphere — Color Picker` |
| `/blob` | **`""`** | **true** | 60.0 | `Blob — Color Picker` |
| `/admin/users` | **`""`** | **true** | 60.0 | `Users — Color Picker` |
| `/admin/tags` | **`""`** | **true** | 60.0 | `Tags — Color Picker` |

(`/admin/names`, `/admin/audit`, `/admin/flagged` are the same code path and the same schema shape;
the tracked Safari matrix shows all five admin captures identically stubbed.)

`aria-label` is the static string `"Select view"` on every route — it never names the destination.

**The AT transcript on an orphan route** (webkit, `/#/blob`, menu opened):

```json
{ "role": "combobox", "ariaLabel": "Select view", "textContent": "", "title": "Blob — Color Picker" }
{ "count": 7, "selected": [],
  "all": ["Home:false","Palettes:false","Browse:false","Extract:false","Mix:false","Generate:false","Gradient:false"] }
```

A combobox with **no accessible value and no selected option**, on a page whose `<title>` says
"Blob". The primary navigation reports *nowhere*.

Independent corroboration in the tracked capture matrix (real Safari, not my probe):
`visual/shots/safari-desktop-light/atmosphere.png` and `…/blob.png` and
`…/safari-desktop-dark/admin-users.png` — a gold glyph and a chevron, no text, while the H1 below
reads Atmosphere / Blob / Users.

### Mechanism — two predicates decide two halves of one control

`demo/shell/dock/composables/useDockAdminMode.ts:34–40` — the **option set** needs both flags:
```ts
if (isAdminMode.value && isAdminAuthenticated.value) return adminViews.map(…);
return userViews.map(…);
```
`useDockAdminMode.ts:52–58` — **`isAdminMode` flips on route alone, no auth:**
```ts
watch(() => viewManager.currentView.value, (view) => {
    if (adminViews.includes(view)) isAdminMode.value = true;
});
```
`DockViewSelect.vue:70,80` consume `isAdminMode` **alone** for the gold ring and `gold-shimmer-icon`.

So an unauthenticated visitor on `/#/atmosphere` gets `isAdminMode = true` (gold chrome) with
`viewEntries = userViews` (no matching option) → glass-ui's `SelectValue` falls through to its
`placeholder` branch, which this call site never supplies:

`select-BcBAyLXA.js` — `n.length ? n.join(", ") : t.placeholder` → `toDisplayString(undefined)` → `""`.

Two independent design faults compound: an unowned empty state (no placeholder was ever chosen) and
an authority signal (gold = admin mode identity, per this file's own lines 44–45) painted for a
visitor who has no authority at all.

### Compounding: `meta.admin` is dead metadata

```
$ grep -rn "beforeEach" demo/          # (no matches)
```
`demo/color-picker/router/index.ts:30–34` declares `meta: { admin: true }` on all five admin routes
and **nothing ever reads it** — an edict-2 legacy artefact carrying a guarantee it does not provide.

### Answer to the brief's question — where are the other seven reachable from?

14 named routes + a catch-all redirect; the selector offers 7. The other **7** —
`/atmosphere`, `/blob`, `/admin/{users,names,audit,flagged,tags}` — are reachable from exactly one
place: the `__admin_toggle__` row at `DockViewSelect.vue:124`, which renders only inside
`v-if="pm.isAdminAuthenticated.value"` (line 122).

I checked the one plausible second navigation surface and ruled it out:
`demo/shell/dock/menus/MobileMenuDropdown.vue` carries slug/login/dark-mode/share only — **no view
navigation**. `DockViewSelect` is the sole nav in the product. For any non-authenticated visitor the
seven routes are **reachable only by typing a URL**, and typing one blanks the navigation and paints
it gold.

`/atmosphere` and `/blob` are not admin surfaces by any product reading. `VISUAL-CONSTITUTION.md:58`
names the member-route inventory as *"exactly `/`, `/palettes`, `/browse`, `/extract`, `/mix`,
`/generate`, `/gradient`, `/easing`, `/atmosphere`, `/blob`, and `/about`"*, and §7 gives Atmosphere
and Blob their own binding compositions (*"These are two compositions, not one settings page"*).
The canon says first-class destinations; the navigation says admin screens; the router says anyone
may walk in. Three answers, none agreeing. (The same paragraph also shows `/easing` and `/about` are
member routes with **no route at all** — outside this component's scope, recorded for the register.)

**Cure.** One enumeration, one predicate. `viewSchema.ts` already types every view; add a single
`audience: "public" | "admin"` field there and derive both the option set *and* the mode flag from
it, so **no state can exist in which the value has no option**. `/atmosphere` and `/blob` become
public member rows, as the constitution already says they are, and the admin flag stops being a
route-shaped guess.

---

## D-3 · MAJOR — the open menu marks the current destination with zero pixels; selection and focus are the same nothing

### Measured — webkit, `/#/browse`, menu open, full computed-style read of all seven rows

| row | `aria-selected` | `data-state` | background | color | weight | padding-left | box-shadow | outline | height |
|---|---|---|---|---|---:|---:|---|---|---:|
| Home | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |
| Palettes | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |
| **Browse** | **true** | **checked** | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |
| Extract | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |
| Mix | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |
| Generate | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |
| Gradient | false | unchecked | `rgba(0,0,0,0)` | `rgb(28,25,23)` | 400 | 10px | none | none | 44 |

Every visual property of the selected row is **byte-identical** to the six unselected rows.
Visual π: `pi-D3-selection-zero-delta.png` — you cannot tell which of the seven you are on.

### Mechanism — the producer's only selection affordance is the one thing this file deletes

`node_modules/@mkbabb/glass-ui/dist/menuRowClass-Nh7CtMON.js` — the entire row recipe:
```js
"interactive-item glass-menu-row",
"relative flex w-full cursor-default select-none items-center py-1.5",
"text-dropdown outline-none",
"data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled"
```
No checked branch. The producer's *entire* selected-state affordance is the `SelectItem` indicator
gutter — `select-BcBAyLXA.js`: `hideIndicator ? "none" : "start"`, where `"start"` buys `pl-7` plus
an 8px `SelectItemIndicator` dot.

`DockViewSelect.vue:97` and `:127` pass **`hide-indicator` on every row**, deleting it. The comment
at lines 99–109 states the intent — *"selection speaks reka's `aria-selected` + the producer's
glass-quiet highlighted-on-open row, never weight"* — but `[data-highlighted]` is the **focus/hover**
channel, not the selection channel. The design collapsed two orthogonal states onto one channel and
then deleted the only remaining marker for the other.

`VISUAL-CONSTITUTION.md:83–84` is binding and explicit:

> Selected, failed, pending, withdrawn and disabled states are **never color-only**. …
> **Focus remains visibly distinct from selection** in both schemes, forced colors and reduced
> transparency.

Measured, selection is not colour-only — it is *nothing at all*, in both schemes.

`PROPORTION-AUDIT.md:79` already ruled the identical species for the sibling control:

> ColorSpaceSelector deletes `hide-indicator` and consumes the sole producer `SelectItem`
> indicator/gutter. Exactly one marker agrees with the option and `aria-selected` …

`grep -rn "hide-indicator" demo/` returns exactly three sites — `ColorSpaceSelector.vue:64` (the one
the register already rules) and **both** of this file's. DockViewSelect is the *more* important
instance of the ruled species and the ruling does not reach it.

**Cure.** Delete both `hide-indicator` props; consume the producer gutter. One marker, agreeing with
`aria-selected`, distinct from `[data-highlighted]`. The register row that closed ColorSpaceSelector
should be **widened to every dock Select** rather than re-litigated per component.

---

## D-20 · MAJOR *(new this pass)* — the one chromatic row reads as the selected row, and it is the one row that is never selected

Look at `pi-D3-selection-zero-delta.png` with no code in hand. Seven rows: six in flat ink, one —
**Palettes** — in saturated magenta. In a list where nothing else carries colour, the coloured row
is the row a viewer reads as *chosen*. The route is `/browse`.

This is not a stray consequence of D-3; it is a *second* signal fighting the first. The ramp is
sanctioned identity (`VISUAL-CONSTITUTION.md:23`, the Dock `Palettes` coordinate — and this file
honours the "exactly two coordinates" law correctly, one site, line 116). But identity and selection
are being spoken in the same channel, on the same axis, in the same list, with selection silent.
Whenever the user is on any route other than `/palettes` — 13 of 14 — the menu's only chromatic
mark points at the wrong row. On `/palettes` itself it is accidentally right, which is worse: the
signal is not merely absent, it is *unreliable*.

`VISUAL-CONSTITUTION.md:84` requires focus distinct from selection; the deeper law under it is that
one channel carries one meaning. Here colour carries brand identity in a list whose primary job is
to report state, and state has been left with no channel at all.

**Cure.** Restore the producer selection gutter (D-3) so selection has its own channel; then the
ramp reads as identity because something else is visibly reading as selection. If the two cannot be
made unambiguous in one 44px row, the ramp coordinate — not the selection marker — is the one that
yields, since `PROPORTION-AUDIT.md:71` puts subtraction before explanation and the Library heading
already carries the identity a second time.

---

## D-4 · MAJOR — at 200% browser zoom the navigation loses its text label entirely

### Measured — webkit, `/#/gradient`, 720×450 CSS px (= 200% zoom on a 1440×900 display)

```json
{ "label": "", "w": 56, "h": 32 }
```

At 100% on the same machine the same control reads `"Gradient"` at 128.1px wide. At 200% it reads
**nothing** — a 56px icon-and-chevron stub.

### Mechanism

`DockViewSelect.vue:87` — `<SelectValue v-if="isDesktop" />`, where
`Dock.vue:71` — `const isDesktop = useMediaQuery("(min-width: 1024px)")`.

Browser zoom shrinks the CSS viewport, so a *device-class* media query fires as if the user switched
to a tablet. The label's presence is keyed to a global breakpoint rather than to the control's own
available space. `PROPORTION-AUDIT.md:60` (PR-16) is already open on this control:

> Retain one route-identifying control; … **labels remain perceptible in both schemes**; no
> tooltip proliferation

and the constitution's evidence arms require *"actual 400% in-app Browser zoom"* observations
(`VISUAL-CONSTITUTION.md:62,64,78`). At 400% the label has been gone for an octave.

**Cure.** The label is not a desktop luxury; it is the control's identity. Keep it always and let it
earn its space — a container query on the dock band, or simply let the flex row shrink it. The
longest label is 94.3px of ink (measured, D-13). Delete `isDesktop` from this component's prop
surface: a navigation control should not know what a desktop is.

---

## D-5 · MAJOR — the closed type matrix is violated: Fraunces on the control label and on every dropdown option — and the violation is systemic, not local

### Measured — webkit, `/#/browse`, menu open

```
trigger      font-family: Fraunces, "Fraunces Fallback", serif   16.4px / 400
all 7 rows   font-family: Fraunces                               16.4px / 400
```

Visible in `pi-D3-selection-zero-delta.png` and in the tracked
`visual/shots/safari-desktop-light/picker.png`: the whole menu is set in a display serif.

### The spec, quoted

`VISUAL-CONSTITUTION.md:75` (§4 Type jurisdictions — a table the same section calls *"closed across
all eighteen compositions"*):

> | control or label, **including dropdown options** | `text-small` | **Plus Jakarta Sans, non-bold** |

`VISUAL-CONSTITUTION.md:78`: *"Fraunces owns display/identity, Plus Jakarta Sans owns
headings/prose/controls … P019's family-neutral Picker identity/headline pair is the **sole**
paired-scale exception."*
`PROPORTION-AUDIT.md:15`: *"Dropdown options remain Plus Jakarta Sans `text-small` control copy and
non-bold."*

### Source, and its scope

`DockViewSelect.vue:69` — `class="view-select-trigger text-small font-display font-normal …"`
`DockViewSelect.vue:91` — `<SelectGroup class="text-small font-display">`

Note the internal contradiction: lines 99–109 argue hard to keep option **weight** at 400 for exactly
this law's sake, then set the **family** to the one face the law forbids.

The scope is the finding. `grep -rn "font-display" demo/shell/ demo/color-session/` returns **13
sites**, including `PaneSegmentedControl.vue:10`, `ActionButton.vue:35`, `ColorInput.vue:94`,
`ActionBarToggle.vue:96`, `ProfileSection.vue:70,143`, `MobileMenuDropdown.vue:43`. The dock has
unilaterally adopted Fraunces as its whole voice. So this is not a two-line patch: either the canon
line moves by owner ruling, or the dock's type voice is re-set at the root. **Deleting
`font-display` from lines 69 and 91 alone would make this component the only inconsistent surface in
its own dock** — the worst of the three outcomes. Route it as a register family row, not a site fix.

---

## D-6 · MAJOR — the mobile trigger is a 33.3px tap target against the producer's own 44px token — and the tracked audit structurally cannot see it

### Measured — webkit, 390×844, `isMobile`, `hasTouch`

```json
{ "label": "", "w": 58.7, "h": 33.3, "touchTarget": "2.75rem" }
```

**33.3 CSS px** tall, while `--touch-target` resolves to `2.75rem` = 44px in the same frame and the
producer's own menu rows consume it — every open option row measured `h: 44` (D-3 table). glass-ui
ships the token, uses it on rows, and the trigger does not consume it.

### Correction to the prior pass

The earlier run cited `visual/REPORT.md`'s `smallTapTargets: 4` on `safari-mobile-light /#/browse` as
corroboration. **That is a misattribution and I withdraw it.** `REPORT.json` names those four rows:
an `input` 160×20 and three 23×23 buttons labelled *Switch to slug* / *Generate new slug* / *Cancel*
— all `SlugEditLayer`, none of them this component.

The reason is worth more than the correction: `visual/capture.mjs:87,98` filters
`(m) => m.w < 24 || m.h < 24` — a WCAG 2.2 AA 24px floor. **A 33.3px target passes that harness and
fails the producer's own 44px token.** This finding is invisible to the tracked matrix by
construction; it exists only because this seat measured the control directly.

`PROPORTION-AUDIT.md:56` (PR-12) and `:72` (§5.7):

> Visual glyph size, operable target size and layout reservation are separate quantities.
> Accessibility floors do not require bloated visible chrome.

So the cure is explicitly **not** "make the pill bigger" — it is an invisible seat, `min-block-size:
var(--touch-target)` on the trigger with the visible capsule unchanged, which is precisely what
glass-ui already does one component away.

Note that `label: ""` in the same measurement means the mobile control is *also* nameless (D-4's
mechanism at its design breakpoint): the product's primary navigation on a phone is an unlabelled
33px **house glyph**, which doubles as the universal "go home" affordance — the exact ambiguity
PR-16 names (*"remove redundant home when Picker text routes"*).

---

## D-7 · MAJOR — the per-view accent, the design's declared "one counterweight", carries near-zero information; in dark mode it collapses to seven near-whites

### The design's own argument, turned on itself

`DockViewSelect.vue:37–47` records why the per-row hue legend was killed:

> the per-row view-hue legend … is EXCISED — **seven simultaneous 40°-fan hues at matched L/C
> carried near-zero discriminative information.** … The trigger/seal still name the CURRENT view in
> hue (`--accent-view`) — the ink menu's one counterweight (R1 SURVIVES).

The survivor is the *same* 40° fan at the *same* matched L, shown **sequentially** rather than
simultaneously. Absolute hue identification from memory is strictly harder than side-by-side
discrimination. The rationale that killed the legend kills the survivor a fortiori.

### Measured — webkit, both schemes, all seven user routes, `--accent-view` at `:root` and the rendered `svg` colour (identical at every row)

| route | light `--accent-view` | dark `--accent-view` |
|---|---|---|
| `/` | `oklch(0.470927 0.188343 9.834)` | `oklch(0.958322 0.021053 9.834)` |
| `/palettes` | `oklch(0.470927 0.124795 49.834)` | `oklch(0.958322 0.023120 49.834)` |
| `/browse` | `oklch(0.470927 0.096235 89.834)` | `oklch(0.958322 0.052509 89.834)` |
| `/extract` | `oklch(0.470927 0.126432 129.834)` | `oklch(0.958322 0.080000 129.834)` |
| `/mix` | `oklch(0.470927 0.093396 169.834)` | `oklch(0.958322 0.059837 169.834)` |
| `/generate` | `oklch(0.470927 0.081401 209.834)` | `oklch(0.958322 0.036916 209.834)` |
| `/gradient` | `oklch(0.470927 0.132719 249.834)` | `oklch(0.958322 0.020590 249.834)` |

Adjacent-pair separation in OKLab `(a,b)` — L is constant within each scheme, so this is the whole
distance:

| scheme | L | C range | C ratio | adjacent min | adjacent max | global max pair |
|---|---:|---|---:|---:|---:|---:|
| light | 0.470927 | 0.0814 – 0.1883 | 2.31× | **0.0608** | 0.1226 | 0.2794 |
| dark | 0.958322 | 0.0206 – 0.0800 | 3.89× | **0.0152** | 0.0522 | **0.0923** |

Dark mode's *entire* seven-view gamut spans **0.092** in OKLab — smaller than light mode's *smallest
adjacent step*. Home→Palettes in dark is **0.0152**, at or under one JND, carried on a 24px
2px-stroke glyph. Every dark-mode view glyph renders as a near-white at L 0.958.

Light mode fails differently: chroma is *not* matched, it ranges 2.31×, so the same semantic role
reads vivid crimson on `/` and muddy grey-blue on `/generate`; `/browse` resolves to a dark olive
(`oklch(0.47 0.096 89.8)`) sitting on a hot-pink ambient field, reading as a *warning* tint rather
than an identity (`visual/shots/safari-desktop-light/browse.png`).

`VISUAL-CONSTITUTION.md:14` puts the dock in the **structural glass** tier — *"neutral
Clear-Ice/Smoke family"* — and `:178`: *"every other Dock label is neutral in both schemes."*

**Cure.** Retire the per-view hue from the dock entirely: it is the same subtraction W6-4 already
performed on the menu, left half-done. Route identity is the *word*, which the design keeps deleting
(D-2, D-4, D-6). Restore the word everywhere and the hue has no job left. A chromatic counterweight,
if wanted, belongs where the constitution already sanctions colour — the ambient field and the
`Palettes` coordinate — not on a 24px chrome glyph at matched lightness. This also retires the
scoped `--accent-view` transition at lines 159–161 and the whole `accentHueShift` column in
`viewSchema.ts`.

---

## D-8 · MAJOR — the navigation is a direction island: `direction: ltr` inside an `rtl` document

### Measured — webkit, `document.documentElement.dir = "rtl"`, `/#/gradient` *(prior pass; mechanism re-confirmed by source this pass)*

```json
{ "trigDir": "ltr", "parentDir": "rtl", "parentCls": "dock-face-content",
  "kids": [ {"tag":"svg","x":834.2}, {"tag":"SPAN","x":862.2,"t":"Gradient"}, {"tag":"svg","x":934.3} ] }
```

Full ancestor walk — `.dock-face-content`, `.dock-layer-group`, `.dock-layer`, `.dock-layers`,
`.dock-controls`, `.glass-dock`, `nav.dock-band`, `.app-layout`, `body`, `html` — **every one
computes `rtl`**. Only `button.view-select-trigger` computes `ltr`; its children keep physical
left-to-right order icon → label → chevron, unmirrored.

Corroborated in the tracked matrix: `visual/shots/rtl-desktop/picker.png` — the dock's outer order
mirrors correctly (`@mbabb · Login · Tools · Home` right-to-left) and the sibling ActionBarToggle
mirrors its own contents, while the view-select alone keeps `⌂ Home ⌄` in LTR order. Open-menu
measurement showed panel *placement* RTL-aware while every row computes `direction: ltr` with
symmetric 10px padding — placement and contents disagreeing.

### Mechanism

Nothing in `demo/` sets it (`grep -rn 'dir="ltr"' demo/` → only `index.html:11`, the document
default). reka-ui's `Select` root supplies `dir` to trigger and content and defaults to `"ltr"`;
`DockViewSelect.vue:51–56` never passes `:dir`, and no app-level `ConfigProvider` supplies one.

`VISUAL-CONSTITUTION.md:150` (§6.1): *"| chrome, **navigation** and layout | logical inline/block
direction follows the document |"*.

**Cure.** Not a `:dir` prop on this instance — that is the per-instance-override anti-pattern
(edict 5) and would need repeating on every reka overlay in the app. One app-level reka
`ConfigProvider :dir` bound to the document direction, set once at the shell root.

---

## D-9 · MAJOR — the menu is a translucent window onto the page it is about to replace

### Measured — webkit, `/#/browse`, menu open

```json
{ "panelSurface": "glass", "panelBg": "oklab(0.955861 0.009528 0.029646 / 0.7488)",
  "panelBackdrop": "blur(11px) saturate(1.6)" }
```

25% of whatever is behind the menu comes through, blurred. In `pi-D3-selection-zero-delta.png` the
Browse card's top edge runs straight across the panel, so **Home/Palettes/Browse/Extract sit on a
visibly different value than Mix/Generate/Gradient** — one option list, two backgrounds, a hard
horizontal seam through its middle.

`VISUAL-CONSTITUTION.md:19`: *"Glass earns its blur by revealing live content; otherwise it is a
neutral well."* A view menu reveals nothing meaningful — it reveals the page it is about to replace.
`:82`: *"Text, focus, boundaries and state meet their rendered contrast on the actual material tier;
a token name is not evidence."* Here the actual tier is *unknowable*, because it is whatever route
content happens to sit underneath. That also makes D-3's zero-delta measurement worse: a selection
marker of any subtlety could not survive a substrate that changes per route.

### Mechanism

glass-ui's `SelectContent` accepts a `surface` prop (`select-BcBAyLXA.js` props: `surface`,
`fieldHue`, `side`, `sideOffset`, `align`, `alignOffset`). `DockViewSelect.vue:90` passes **only**
`class="min-w-[12rem]"`, so the panel takes the default `data-surface="glass"`.

**Cure.** `surface="opaque"`. A menu is a specimen well (constitution §2 — *"Specimen well —
opaque/quiet neutral stage"*), not a pane of glass. The producer already offers the right rung; the
consumer never chose one.

---

## D-10 · MAJOR — the admin toggle is a command wearing `role="option"`, keyed by a magic sentinel

`DockViewSelect.vue:124–141`:
```vue
<SelectItem value="__admin_toggle__" class="py-1.5 px-2.5" hide-indicator>
    <span v-if="!isAdminMode">… Admin</span>
    <span v-else>… Back to app</span>
</SelectItem>
```
`useDockAdminMode.ts:66–72`:
```ts
if (id === "__admin_toggle__") { toggleAdminMode(); return; }
```

Four design faults in one row:

1. **A command inside a selection model.** Every other row answers *"which destination am I on"*;
   this row is a verb. Choosing it never becomes the combobox's value, so its `aria-selected` is
   permanently a lie, and `VISUAL-CONSTITUTION.md:96`'s global grammar (*select → tune → commit*,
   where *"Selection changes the active specimen without committing it"*) does not describe it.
2. **A sentinel string sharing the `ViewId` namespace**, guarded only by string equality — a
   contrivance (edict 3) that a typed union would have made impossible.
3. **A row whose label flips part of speech.** `Admin` (a destination noun) becomes `Back to app`
   (an action phrase) in the same slot, with a different icon and a different colour tier, so the
   row's identity is unstable across the two modes of the same menu.
4. **The mode switch is destructive to location.** `useDockAdminMode.ts:41–48` — entering always
   lands on `admin-users`, leaving always lands on `picker`. A user on `/gradient` who inspects
   admin and returns has lost their place, and the entire user list is unreachable while in admin
   mode without a round trip. This is modal navigation in a product whose nav is a single flat
   listbox.

**Cure.** The mode switch is not a destination. Once D-2's `audience` field exists, admin routes are
ordinary rows gated by authority and the toggle disappears entirely — a subtraction, which
`PROPORTION-AUDIT.md:71` requires before explanation (*"Subtraction precedes explanation"*).

---

## D-11 · MINOR — the divider is hand-rolled while `SelectSeparator` sits imported in the same barrel and used by the sibling two files away

`DockViewSelect.vue:123`:
```vue
<div class="border-t border-border my-1"></div>
```

`demo/ui/select/index.ts:1` re-exports `SelectSeparator` from glass-ui. The producer recipe
(`select-BcBAyLXA.js`) is `-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]`.
Three differences: `border-t` vs `h-px`; `--border` vs a 12% foreground mix; and no `-mx-1`, so the
hand-rolled line stops short of the panel's `--overlay-pad-inline` instead of spanning it. It is
also a bare `<div>` with no role inside a `role="group"` subtree.

The proof that this is a lapse and not a house idiom is two files away:
`demo/shell/dock/menus/MobileMenuDropdown.vue:75` uses `<DropdownMenuSeparator />`, the producer
component, in the same dock, for the same job. Edict 4 violated with the correct component sitting
unused in the same import barrel.

Separately, `PROPORTION-AUDIT.md:69` (§5.4) and PR-05 (`:49`) rule dividers **REMOVE** unless
grouping is otherwise ambiguous. The admin row already carries gold ink and a Shield glyph; the line
repeats a boundary material already states.

---

## D-12 · MINOR — three per-instance overrides reach into producer internals; one is a self-documented stopgap whose root fix does not exist

| line | override | what it fights |
|---|---|---|
| 69 | `[&>span]:line-clamp-none` | glass-ui's *internal* `[&>span]:line-clamp-1` on `SelectTrigger` — an arbitrary-variant selector into another package's DOM. Self-documented at lines 57–59: *"Root fix is a `clampLabel` prop on glass-ui DockSelectTrigger (filed coordination/Q.md §3)"* |
| 96, 126 | `class="py-1.5 px-2.5"` | `py-1.5` **duplicates** the producer value verbatim (`menuRowClass`: *"… items-center py-1.5"*); `px-2.5` overrides the producer's `px-2`. Measured `padding-left: 10px` where the producer says 8px |
| 90 | `min-w-[12rem]` | the producer's `--overlay-min-width` / `min-w-(--reka-select-trigger-width)` |

```
$ grep -rl "clampLabel" node_modules/@mkbabb/glass-ui/dist      # (no matches)
```

The filed ask has not landed in glass-ui 7.0.0, so the stopgap has now shipped through a whole major
and the marker comment has become load-bearing documentation for a hack. Edict 5 — *style at the
root component level, never per-instance overrides* — all three are per-instance; a filed ask is not
a cure.

---

## D-13 · MINOR — the panel is 2.04× wider than its widest row's ink, and the comment claiming otherwise is measurably false

`DockViewSelect.vue:89–90`:
```vue
<!-- B.W1: kept wider than --menu-min-w — long view-option labels need the space -->
<SelectContent class="min-w-[12rem]">
```

Measured (webkit, `/#/browse`, menu open):

| | px |
|---|---:|
| panel width | 192.0 |
| row width | 174.0 |
| **widest row ink** (`Generate`, icon + gap + label) | **94.3** |
| Home / Palettes / Browse / Extract / Mix / Gradient | 70.9 / 85.0 / 81.2 / 79.7 / 52.3 / 92.1 |

Every row carries **79.7px of empty inline space — 46% of the row**. No label needs the 12rem floor;
the longest is 94.3px. `PROPORTION-AUDIT.md:5` — *"they do not excuse a mechanically large gap"* —
and `:73`, *"Real rendered relation wins over token intent."* The comment asserts a need the
rendering refutes.

---

## D-14 · MINOR — the menu panel overlaps the reserved dock band by 11.4px

Measured (webkit, `/#/browse`, menu open):

```
dock   .glass-dock           bottom 71.4
panel  [data-slot=select-content]  top 60.0
overlap = 11.4 px
```

`VISUAL-CONSTITUTION.md:178`: *"The dock is its own top band, fully visible, focusable, and
**clipped by neither mask nor card**."* `:30` (§3 law 4): *"The top dock owns a reserved band."*
The menu is a card and it covers the band's lower 11.4px — visible in `pi-D3-selection-zero-delta.png`
where the panel's corner cuts into the dock pill. Mechanism: glass-ui's `SelectContent` defaults
`sideOffset: 0` and the consumer never sets it, while the trigger's bottom edge sits inside the
dock's own padding, so a zero offset lands the panel inside the band.

---

## D-15 · MINOR — icon and label are not choreographed: the icon plays `out-in` while the label swaps instantly

`DockViewSelect.vue:75–87`:
```vue
<Transition name="vj-morph" mode="out-in"> <component :is="currentIcon" :key="currentView" … /> </Transition>
<SelectValue v-if="isDesktop" />
```

`mode="out-in"` means the outgoing glyph must fully leave (`.vj-morph-leave-active`,
`--duration-fast`, `demo/styles/animations.css:111`) before the incoming one enters
(`--spring-snappy-duration`). `SelectValue` has no transition at all. On every route change the
label snaps to the new destination while the glyph slot is still empty or mid-scale — two halves of
one ~128px control on two different clocks, with a visible hole between them.

Recorded honestly, the motion is otherwise correct: it **is** tokenized (the shared `vj-morph`
family in `demo/styles/animations.css`, not an ad-hoc local keyframe), it animates `opacity` and
`transform` only (no layout-forcing property), and reduced motion is properly neutralised — measured
under `reducedMotion: "reduce"`: `transition-property: opacity`, `0.15s`, `--accent-view` sweep gone,
via the global guard at `animations.css:184`. Edict 6 is satisfied.

---

## D-16 · MINOR — the icon prop is typed `unknown`, widening a schema field that is already `Component`

`demo/shell/viewSchema.ts:73` types it correctly: `icon: Component;`
`demo/shell/dock/composables/useDockAdminMode.ts:8–12` widens it away:
```ts
export interface ViewEntry {
    id: ViewId; label: string; icon: unknown;
    [k: string]: unknown;                      // ← plus an open bag
}
```
`DockViewSelect.vue:19` — `currentIcon: unknown;`

`<component :is="unknown">` type-checks against nothing: a component prop that accepts `unknown`
cannot be wrong at compile time and will only fail at render. The index signature additionally makes
`ViewEntry` a bag rather than a shape — edict 1's god-module smell in miniature, and the exact seam
that would have caught D-2 statically had `ViewEntry` been `PaneConfig & { id: ViewId }`.

`verbatimModuleSyntax` is clean: line 9 correctly uses `import type { ViewEntry }`; every other
import at lines 2–8 is a value import. Edict 8 satisfied.

---

## D-17 · INFO — two v-model idioms in one 162-line file, one emit declared twice

`DockViewSelect.vue:25–33`:
```ts
const emit = defineEmits<{
    "update:modelValue": [id: string];
    "update:open": [open: boolean];        // ← also registered by defineModel below
}>();
const open = defineModel<boolean>("open", { default: false });
```

`defineModel("open")` already registers the `open` prop and the `update:open` emit; the explicit
entry is redundant. Meanwhile `modelValue` takes the opposite route — a manual `emit` at line 55
with a hand-written `as string` cast. One component, two conventions for the same job. (The `as
string` cast is a direct consequence of D-16's untyped seam.)

---

## D-18 · INFO — states that were never designed

Enumerated against the seat brief's list, by reading the template, the producer and the live DOM:

| state | handled? | evidence |
|---|---|---|
| populated | yes | 7 rows render |
| **empty** | **no** | `v-for="entry in viewEntries"` with no `v-else`; an empty `viewEntries` renders an empty padded panel with no copy. **And a no-matching-value trigger renders `""` — measured, D-2** |
| **loading** | **no** | `pm.isAdminAuthenticated` resolves async, so the admin row **pops in** after auth settles, unannounced and untransitioned |
| **error** | **no** | `inject(SESSION_PORT_KEY)!` (line 35) — non-null assertion, no fallback; a missing provider is a render crash of the product's only nav |
| **disabled** | **no** | never passed; the producer supports `disabled` on both `Select` and `SelectItem` and styles it (`data-[disabled]:opacity-disabled`), unused |
| **focused** | **broken** | D-1 — measured `box-shadow: none`, `outline: none` at real `:focus-visible` |
| hovered / highlighted | producer | `[data-highlighted]` path |
| **selected** | **broken** | D-3 — measured zero delta; D-20 — the wrong row is painted |
| pressed / active | producer | `tap-squish` |
| dragging | n/a | — |
| **overflowing / truncated** | **partially undone** | `[&>span]:line-clamp-none` (line 69) *removes* the producer's clamp without supplying a replacement; nothing constrains a long label |
| **RTL** | **broken** | D-8 — measured `direction: ltr` inside `dir="rtl"` |
| reduced-motion | yes | measured; global guard applies |
| **forced-colors** | **partially broken** | zero selection delta persists; the trigger glyph keeps its custom accent instead of adopting the system palette |
| **zoomed 200%** | **broken** | D-4 — measured `label: ""` |

**Eight of fifteen states are unhandled or visually broken.** Per the seat brief's own rule — *a
state that was never designed is a design defect* — that is the headline number for this component.

---

## D-19 · INFO — the `Palettes` identity coordinate renders as a dark two-tone wash, not a pastel rainbow

`DockViewSelect.vue:116` applies `.palettes-ramp-text` to exactly one row, per Q5. The recipe
resolves live to three stops spanning **80° of hue** (magenta → red → orange) at **L 0.4709**, across
an 85px word. `VISUAL-CONSTITUTION.md:17` files this species under *"Watercolor/data … **pastel**
`Palettes` identity"* and `:23` calls it *"the pastel-rainbow identity"*, with W19 owning the Dock
witness. Measured: L 0.47 is a dark tone, not a pastel; an 80° arc is not a rainbow; and at 85px the
three stops read as a single magenta-to-purple gradient (`pi-D3-selection-zero-delta.png`).

The mechanism is upstream (`demo/color-session/palettes-ramp.ts` + `useViewAccents`, which resolve
the stops under a WCAG 4.5:1 text floor — the floor is what pushes L to 0.47). DockViewSelect is the
*witness*, not the cause; recorded because W19 owns this witness and the rendered result does not
match the word the constitution uses for it. See D-20 for the consequence in this component.

---

## What I checked and found sound

Negative results, so this seat's silence is not mistaken for absence of inspection:

- **Edict 8, `verbatimModuleSyntax`** — clean. `import type { ViewEntry }` (line 9); all other
  imports are value imports.
- **Edict 6, animations never deleted** — the `vj-morph` family is consumed from the shared global
  `demo/styles/animations.css`, not re-declared locally; the scoped block (lines 148–161) carries one
  transition plus a comment recording that the byte-identical `.gold-shimmer-icon` twin this file
  once held was *retired into* the global recipe. That is the correct direction of travel.
- **Reduced motion** — measured working: `transition-property: opacity`, `0.15s`, `--accent-view`
  sweep neutralised by the global guard.
- **Layout-forcing motion** — none. The transitions touch `opacity`, `transform` and a registered
  custom property only.
- **Menu row touch floor** — measured `h: 44` on every option row in every matrix, desktop and
  mobile. The producer's `--touch-target` does its job on rows; the trigger is the sole exception
  (D-6).
- **Horizontal overflow** — `overflowX: 0` at 1440, 720 and 390 CSS px; the panel does not escape the
  viewport on mobile. The tracked matrix agrees: `horizontalOverflow — 0` across all 60 captures.
- **Page errors** — `pageErrors: 0` on all 60 tracked captures; no console error on any route this
  component owns (the one tracked `consoleError` is a WebGL context loss on `/#/`).
- **Vue 3.5 idiom** — reactive props destructure at lines 11–23 is correct and current; no stale
  `toRefs` ceremony. `defineModel` is used for the mutex-driven `open` (correct: the parent owns the
  single mutex instance, and this component correctly does *not* call `usePopupMutex` itself).
- **The pastel coordinate count** — exactly one row wears the ramp (line 116), matching
  `VISUAL-CONSTITUTION.md:23`'s "exactly two textual coordinates" law for the Dock half.
- **Sole-nav claim** — verified by reading the only other dock menu, `MobileMenuDropdown.vue`: it
  carries no view navigation, so D-2's "reachable only by typing a URL" is exhaustive, not assumed.

---

## Family grouping — four mechanisms behind twenty findings

1. **The consumer retypes producer contracts.** D-1 (a colour into a shadow token — and for an
   effect the producer does not have), D-3 (`hide-indicator` deleting the only marker), D-9 (never
   choosing `surface`), D-11 (a hand-rolled divider beside the real one), D-12 (`[&>span]`, `px-2.5`,
   `min-w-[12rem]`), D-14 (never choosing `sideOffset`). Every one reaches *past* glass-ui for
   something glass-ui already answers, and in D-1 the reach silently breaks a producer guarantee.
   **The general cure is one register law: a consumer sets a producer token only at the type the
   producer declared, and chooses a producer prop before writing a class.**
2. **Identity is derived twice from two different predicates.** D-2 (gold from `isAdminMode`, options
   from `isAdminMode && isAdminAuthenticated`), D-10 (a command inside the selection model), D-16
   (the untyped seam that let the two drift), D-18's loading pop-in. One state, two owners, no
   reconciliation. **Cure: one `audience` field on `viewSchema`, both halves derived from it.**
3. **The word is treated as optional and colour as sufficient.** D-4 (zoom), D-6 (mobile), D-2 (7
   routes), D-7 (a hue carrying load it cannot carry), D-3 + D-20 (selection with no marker, and the
   wrong row painted). The design keeps deleting the label and keeps promoting an indiscriminable
   hue to replace it. **Cure: the label is the identity; restore it unconditionally and the hue has
   no job left.**
4. **Global breakpoints and physical directions stand in for local, logical ones.** D-4/D-6
   (`min-width: 1024px` deciding what a control shows), D-8 (`ltr` inside `rtl`), D-14 (a zero side
   offset inside a reserved band).

## The single strongest defect

**D-1.** Every other finding degrades comprehension; D-1 removes an accessibility guarantee outright,
on the control the first `Tab` press lands on (measured), by a one-line inline style — and this pass
establishes that the line buys **nothing** in return, because `--dock-ring` has exactly two consumers
in all of glass-ui 7.0.0 and both are `:focus-visible`. It is also a verbatim recurrence of a defect
this tranche already diagnosed and wrote down at `demo/styles/focus-ring.css:9–15`. A cure that fixes
only the line, and not the practice of writing consumer values into producer tokens, will produce a
third instance.
