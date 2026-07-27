# CHALLENGE-D — `demo/shell/dock/Dock.vue` — the design is flawed (r2)

**Round 2, 2026-07-27, at HEAD `6085965e`.** Round 1 (2026-07-24, HEAD `c654824e`) is preserved
verbatim at `challenge-D-design.r1-2026-07-24.md` in this directory. This round **supersedes** it:
it adds five defect families r1 never reached — including the component's worst — and it **corrects
two r1 rulings**, one of them r1's strongest BLOCKER. Findings r1 already established are listed by
their r1 id in §7 and are not re-argued here.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Served, not inherited. Seat: CHALLENGE-D (design), component
`demo/shell/dock/Dock.vue` (359 lines, area `demo/shell`), repository
`/Users/mkbabb/Programming/value.js`, branch `tranche-u`.

---

## 1. Verdict

**DEFECTIVE.** Three BLOCKERs, eight new MAJORs, five new MINORs, plus twenty-one carried r1
findings.

The dock presents itself as the app's persistent, invariant chrome. It is not. Its action set, its
label set, its layer set, its type families and its accent voice all change across **four different,
mutually disagreeing responsive predicates** — and one of those changes is silent capability loss.
The strongest defect is measured, not argued:

> **On a 390 px phone the dock's action buttons render, name themselves, take focus, take a click,
> and do nothing.**

Proof, `D-dock-probe6.mjs`, clipboard pre-seeded with a sentinel, then "Copy CSS" clicked in the dock
action bar on `/#/gradient`:

```
MOBILE 390x844:   clipboard="SENTINEL-NOT-TOUCHED"                                          pageErrors=[]
DESKTOP 1440x900: clipboard="linear-gradient(90deg, oklch(75% 0.15 145deg) 0.00%, oklch(7…" pageErrors=[]
```

r1 did not find this. It is the mechanism behind MT-F005's "behind a responsive branch" wording, and
it makes the mobile Picker action region — `Copy color` included — **not exist at all**.

---

## 2. Method

| Source | What it gave |
|---|---|
| `…/megatranche/audit/visual/REPORT.{md,json}` | 60 Safari captures; the `smallTapTargets` / `namelessButtons` / `h1` rows |
| `…/visual/STATES.json` + `states.mjs` | zoom-200, reduced-motion, forced-colors, RTL, keyboard matrices |
| `…/visual/shots/**` read as images | desktop+mobile × light+dark; forced-colors; **RTL**; zoom-200 |
| **7 fresh Playwright probes** against the live dev server `http://localhost:9000` | every number marked *(measured)* below |

Probe sources, session scratchpad: `D-dock-probe{1..7}.mjs`. Crops captured by them and read back as
images: `D-dock-light.png`, `D-dock-dark.png`, `D-tablet-portrait.png`, `D-desk-slugedit.png`,
`D-viewmenu-light.png`, `D-mobile-actionbar.png`.

Canon: `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md`.

---

## 3. BLOCKERS (new in r2)

### D2-01 · The mobile dock action bar is a row of dead buttons

**Defect.** On `/#/gradient`, `/#/generate` and `/#/mix` the Tools trigger is visible and tabbable and
opens an action layer whose buttons are named, sized, focusable and clickable. Every handler is
optional-chained against a ref that is `null` on mobile. Every click is a silent no-op — no error, no
status, no state change, no console output.

**Evidence (measured).** The bar renders in full at 390×844 (`D-dock-probe5.mjs`): slot
`opacity: 1`, trigger `tabIndex: 0`, `32×32`; actions `Back 44×44`, `Reset 32×32`,
`Copy CSS 32×32`, `Seed from palette 32×32`. Then the sentinel test above: desktop writes the
gradient CSS to the clipboard, mobile leaves `SENTINEL-NOT-TOUCHED`, and `pageErrors=[]` on both.

**Mechanism.**

- `demo/shell/usePaneRouter.ts:206-208` — `paneRefs.gradient.value?.reset?.()`,
  `?.copyCSS?.()`, `?.seedFromPalette?.()` (same shape for generate at `:193-196` and mix at
  `:217-220`).
- `demo/color-picker/App.vue:320-327` — `gradientPaneRef` / `generatePaneRef` / `mixPaneRef` are
  written **only** inside `onDesktopLeftMount` / `onDesktopRightMount`. The file's own comment at
  `:314-316` says it: *"Populated by the onMount callbacks on the desktop PaneSlots"*.
- `demo/color-picker/App.vue:81-89` — the mobile `PaneSlot` passes no `:on-mount`.

Optional chaining converts a missing capability into silence. This is owner edict 2 (no masking
fallbacks) failing at the exact site where it costs the most.

**Cure — architectural.** The dock must not hold references to pane *instances*. Invert the
direction: the pane `provide()`s a command object keyed by view; the dock injects it. A view that
provides no commands renders no Tools trigger; a provided command is live in whichever slot mounted
it, by construction. Delete `paneRefs`, `onDesktopLeftMount`, `onDesktopRightMount` and every `?.`
on a handler. An action that can be absent must be **absent**, never present-and-inert.

---

### D2-02 · The Picker's entire action region does not exist on a phone

**Defect.** `Copy color`, `Reset color`, `Random color`, `Palettes`, `Extract palette` and
`Open color input` are in the dock on desktop and **absent from the whole document** on mobile.
`VISUAL-CONSTITUTION.md §7 · Picker` requires *"Copy lives once in the action region"*; §3 law 6
requires mobile to be a *"stage→inspector→**action** sequence beneath the same top dock"*. There is
no action.

**Evidence (measured, `D-dock-probe4.mjs`).** Complete button inventory of `/#/` at 390×844:

```
hasCopyColor:false  hasRandom:false  hasReset:false  hasOpenColorInput:false  actionBarLayerPresent:false
docBtnNames = ["Save edit","Cancel edit","Switch to slug","Generate new slug","Cancel","Select view",
               "Toggle action bar","Picker","About","Menu","Login","@mbabb","Select color space",
               "l channel","a channel","b channel","alpha channel"]
```

Same probe at 1440×900: `hasCopyColor:true  hasRandom:true  hasReset:true  hasOpenColorInput:true`.

At 390 the Tools slot collapses rather than showing an empty bar (`D-dock-probe3.mjs · C`):
`gridTemplateColumns: "0px"`, `opacity: "0"`, `tabIndex: -1`, while the button box is still `32×32`
inside an `overflow: hidden` zero-width parent.

**Mechanism.** `demo/color-picker/App.vue:38` — `:action-bar="colorPickerRef?.actionBarContext ?? null"`.
`colorPickerRef` is written only at `App.vue:322`, inside `onDesktopLeftMount`. The `?? null` is the
mask: it turns *"the mobile slot never registered"* into a legitimate-looking *"this view has no
actions"*. Same family and same cure as D2-01.

**This also root-causes MT-F005's mobile half** — see D2-05.

---

### D2-03 · Two contradictory `isDesktop` predicates; the portrait tablet renders both chromes at once

**Defect.**

| owner | predicate | mechanism |
|---|---|---|
| `App.vue:310-312` | `(min-width: 1024px) and (min-aspect-ratio: 1.1)` | stamps `data-layout` |
| `Dock.vue:71` | `(min-width: 1024px)` — **width only** | drives `always-expanded`, `SelectValue`, the Tools label |
| `ProfileSection.vue:48`, `MobileMenuDropdown.vue:38` | Tailwind `lg:` — width only | shows/hides the auth block and the ⋮ menu |
| `PaneSegmentedControl.vue:46` | `@media (max-width: 639px)` | a fourth threshold |

`demo/styles/shell.css:98-112` documents at length that the `data-layout` stamp exists precisely *"so
the mobile slot shows and the desktop wrappers hide BY CONSTRUCTION"* and that a media wrapper
*"would re-introduce the width-only disagreement the stamp exists to retire."* `Dock.vue:71`
re-introduces exactly that predicate.

**Evidence (measured, `D-dock-probe3.mjs · A`, viewport 1024×1366).**

```
dataLayout: "mobile"       ← App.vue, aspect-aware
panesDisplay: "block"      ← the MOBILE pane switcher renders
profileDisplay: "flex"     ← the DESKTOP Login/@mbabb block renders
mobileMenuDisplay: "none"  ← the mobile ⋮ overflow menu is hidden
toolsLabelPresent: true / selectValuePresent: true   ← Dock.vue's width-only isDesktop === true
```

**Rendered proof:** `scratchpad/D-tablet-portrait.png` — one pill holding
`[🏠 Home ⌄] [ Picker │ About ] │ [→] Login │ [@mbabb]`: the mobile pane switcher and the desktop
profile block side by side, with **no ⋮** (so no account menu on a layout that has decided it is
mobile) and **no Tools** (D2-02's mechanism, since `data-layout="mobile"` also means no
`colorPickerRef`). This is the "four vertical bars in a 312 px aperture" crowding S.W7-2 claimed to
have cured, reconstituted one breakpoint up.

r1's D-7 (zoom-200 label loss) is a *symptom* of this same fork; the fork itself, the
`shell.css` contradiction and the portrait-tablet frame are new.

**Cure.** One predicate, one owner. `App.vue` already owns the truth; the dock consumes it through a
single `useLayoutMode()` (or reads `data-layout`), and every `lg:` / `sm:` utility in the dock
subtree is replaced by that one attribute selector at the root. Delete `Dock.vue:71`.

---

## 4. MAJOR (new in r2)

### D2-04 · **Correction to r1.** The 22×22 slug controls are real WCAG 2.2 failures, not artifacts

r1 §"Two harness rows are measurement artifacts" ruled MT-F004's dock rows *"not real"* because the
slug layer is `inert` at rest. That is correct **at rest and only at rest**. In the state the layer
was designed for, the controls are live and undersized.

**Evidence (measured, `D-dock-probe3.mjs · B2`; slug layer *activated* by clicking `Login`):**

| control | rect | `inert` | tabbable |
|---|---|---|---|
| slug input | 160 × **23** | **false** | **true** |
| `Switch to slug` | **22 × 22** | **false** | **true** |
| `Generate new slug` | **22 × 22** | **false** | **true** |
| `Cancel` | **22 × 22** | **false** | **true** |

```
accessibleName: "(NONE — placeholder only)"    placeholder: "enter slug or token..."
```

Three operable targets below the 24×24 CSS-px floor of **SC 2.5.8**, and a text input with no
programmatic label at all (**SC 3.3.2**). r1's D-19 correctly kept the nameless `send-btn` as a real
finding; the same reasoning applies here and r1 did not apply it.

**Rendered proof:** `scratchpad/D-desk-slugedit.png` — the placeholder is clipped mid-word to
**"enter slug or to"** by the `w-40` input; the three glyph controls carry no capsule seat and read
as decoration next to their 40 px siblings; the submit `→` sits inside the text field with no
boundary.

**Cure.** `SlugEditLayer.vue:91-118` — drop `compact` (a 22 px sticker register applied to primary
form controls), give the input a real label, size it from its content measure not a magic `w-40`.
Then move the whole slug/auth flow **out of the band**: `VISUAL-CONSTITUTION.md §7 · Account` already
rules that *"Account is one modal side Dialog opened from the Dock, not a route chassis or second
main."* A login form living *inside* the navigation pill is why it needs 22 px controls at all.

---

### D2-05 · MT-F005's route pattern fits `ColorInput.vue` exactly — and its mobile half is D2-02

r1 correctly identified the nameless button (`ColorInput.vue:76-82`, r1 D-19). r2 adds the
*enumeration* that closes MT-F005 as a root row.

The harness reports nameless = 1 on `/`, `/palettes`, `/mix`, `/blob`, `/does-not-exist` and 0 on
`/browse`, `/extract`, `/generate`, `/atmosphere`, `/admin/*`. Those five are **exactly** the views
whose `left` pane is `"color-picker"` (`demo/shell/viewSchema.ts` VIEW_MAP: picker, palettes, mix,
blob; `/does-not-exist` redirects to picker) — i.e. exactly the routes where the dock mounts
`ColorInput.vue`. `/gradient`'s nameless button is route-local (it is also present on mobile).

Both template branches are unnamed, not just one: `ColorInput.vue:67-75` (propose) and `:76-82`
(submit).

The "zero on mobile" half is **not** a hidden-layer artifact: on mobile the color-input face is never
provided at all (D2-02), so the button is never rendered. One cure — D2-01/D2-02's inversion plus an
`aria-label` — closes MT-F005 and the mobile half of MT-F004 together.

---

### D2-06 · Dark mode annihilates the accent: chroma 0.188 → 0.021 (−89 %)

**Defect.** The dark-scheme resolution of `--accent-view` / `--accent-live` is a near-white with
essentially no chroma. Two consequences: (a) the nine-view 40° hue fan carries no perceptible
information in dark mode, and (b) `Login`'s accent border — the only thing separating the primary
auth action from the `@mbabb` vanity wordmark in light mode — becomes a plain near-white hairline.

**Evidence (measured, `D-dock-probe4.mjs`, `/#/`):** computed root values, verbatim.

```
light: --accent-view = oklch(0.471189 0.188448  9.83402)   → C 0.188
dark:  --accent-view = oklch(0.958322 0.0210531 9.83402)   → C 0.021   (L 0.958)
```

**Rendered proof:** `scratchpad/D-dock-light.png` — Login is crimson bold text inside a crimson-bordered
pill, unmistakably the primary action. `scratchpad/D-dock-dark.png` — Login and @mbabb are two
identical dark slabs with white text. The hierarchy that exists in light mode does not exist in dark
mode. This is a *scheme-dependent hierarchy*, which §4.1 forbids: *"Focus remains visibly distinct
from selection in both schemes"* is the narrow case of a general rule the dock breaks at the level of
primary vs. decorative action.

**The team's own argument, unapplied.** `DockViewSelect.vue:40-42` excised the per-row hue legend
because *"seven simultaneous 40°-fan hues at matched L/C carried near-zero discriminative
information"* — then kept the identical mechanism on the trigger, ring and seal (*"R1 SURVIVES"*,
line 47). At C = 0.021 the surviving instance carries strictly **less** information than the deleted
one.

**A second, structural collapse in the same table.** On the home route `accentHueShift = 0`
(`viewSchema.ts`, picker entry), so `--accent-view` **is** `--accent-live`, bit for bit:

```
--accent-view = oklch(0.471189 0.188448 9.83402)
--accent-live = oklch(47.118925176164% 0.188447570516 9.83402284231deg)
```

The whole W7-4 "ONE dock voice" separation between *view hue* (chrome) and *live accent* (specimen)
is degenerate on the app's default route — the distinction the code is built around is invisible
exactly where a first-time user meets it. (r1's D-21 established that the dock is seed-tinted at all;
the identity and the dark collapse are new.)

**Cure.** Either the dark ramp keeps real chroma (a per-view L/C pair, not one gamut guard that
collapses to paper white), or view identity stops being hue and becomes the glyph — which
`Dock.vue:255-262` already argues is the stronger continuity carrier. Finish that argument and delete
`accentHueShift` and the `--accent-view-<id>` token family.

---

### D2-07 · RTL: the `@mbabb` wordmark renders `mbabb@`, and the directional affordances do not mirror

**Defect.** `VISUAL-CONSTITUTION.md §6.1`: *"CSS strings, hex, slugs, IDs and provenance → render in
LTR-isolated spans inside RTL prose"*; *"chrome, navigation and layout → logical inline/block
direction follows the document."*

**Rendered evidence:** `docs/tranches/V/megatranche/audit/visual/shots/rtl-desktop/picker.png` — the
dock reads `mbabb@ │ ← Login │ → Tools 🖌 │ 🏠 Home ⌄`. The handle is bidi-reordered to **`mbabb@`**.
Item order mirrors correctly; the **glyphs** do not. `ArrowRight` on Tools
(`ActionBarToggle.vue:103`) still points right while "forward" in an RTL layer group is leftward, and
the same inversion hits the action-bar `ArrowLeft` "Back" (`Dock.vue:154`). The enter/exit motif the
two arrows are explicitly designed to form (`ActionBarToggle.vue:99-102`) is inverted wholesale.
`rtl-mobile/picker.png` shows the same wordmark break.

No prior seat recorded this; the RTL matrix existed and was not read against this component.

**Cure.** `dir="ltr"` / `unicode-bidi: isolate` on `@mbabb` and on the slug pill (same family —
`ProfileSection.vue:75`, `MobileMenuDropdown.vue:50`). Replace the two physical arrows with one
logical chevron primitive that flips with `direction`; there are exactly two instances and they must
always agree.

---

### D2-08 · Three dividers for four seats, in a row where every seat already draws its own capsule

**Defect.** `PROPORTION-AUDIT.md` PR-05 (**REMOVE / KEEP**) and §5 law 4: *"A divider is retained only
when grouping would be ambiguous without it. Spacing plus material already expressing the same
boundary makes the line duplicative."*

**Evidence (measured, `D-dock-probe5.mjs · A`, 1440×900):** `separators: 7` in the nav subtree,
`visibleSeparators: 3` — one between **every** adjacent pair of the four visible controls, the
maximum possible duplication. Rendered: `scratchpad/D-dock-light.png` shows
`[Home ⌄] │ [🖌 Tools →] │ [Login] │ [@mbabb]`, and all four items already carry their own capsule
seat: the line and the capsule state the same boundary twice.

Sources: `ProfileSection.vue:49` **and** `:123` (a separator on both sides of the auth block),
`ActionBarToggle.vue:82`. (r1's D-14 flagged one hand-rolled separator; the count and the
duplication law are new.)

**Cure.** Zero dividers in the main layer; the seats group and the dock's gap token supplies rhythm.

---

### D2-09 · Four operable height rungs in one pill — and the source comment asserts a number 8 px wrong

**Defect.** `PROPORTION-AUDIT.md` §5 law 7 (glyph size / target size / reservation are separate
quantities) and PR-12 (**TIGHTEN**).

**Evidence (measured).** Within the **main** layer at 1440 (`D-dock-probe5.mjs · A`):

```
Select view 32 │ Toggle action bar 32 │ Login 28 │ @mbabb 28
```

Across the dock's other layers (`D-dock-probe3.mjs`): `Save edit` / `Cancel edit` / `Back` /
`Open color input` = **40**; action buttons = **32**; slug controls = **22**; mobile `Back` = **44**.
Five rungs (22 / 28 / 32 / 40 / 44) inside one component.

`ActionBarToggle.vue:147-153` asserts the cure landed — *"the box lands at the sibling controls'
2.5rem height"*. 2.5 rem = 40 px. **Measured: 32 px.** The comment has been 8 px wrong since it was
written, and the two seats it names (`Back`, `Open color input`) are the 40 px ones.

**Cure.** One dock control rung, declared once as a producer token and consumed by every seat; the
compact register is for genuinely secondary glyphs and must still clear 24 px. Delete
`--dock-compact-control-padding: 0.5rem 0.75rem` (`ActionBarToggle.vue:155`) — a consumer
re-deriving a producer's box model is exactly how five rungs appear.

---

### D2-10 · A layer swap jolts the dock 81 px sideways and shrinks it 162 px, unanimated

**Defect.** `VISUAL-CONSTITUTION.md §3` law 4 — the dock owns a reserved band and its state changes do
not move the scene. The **band** holds (72 px, fixed — verified). The **pill** does not.

**Evidence (measured, `D-dock-probe3.mjs`, 1440×900):**

```
main layer:      dock { x: 484.3, w: 471.5, h: 62 }
slug-edit layer: dock { x: 565.5, w: 309.0, h: 62 }
```

Δx = **+81.2 px**, Δw = **−162.5 px**, on one click of `Login`. `.dock-crossfade` cross-fades opacity
only (`glass-ui/dist/components/dock/styles/crossfade.css`); the box change is instantaneous. This is
the geometric half of r1's D-8 ("the desktop edit state seizes the dock"), now measured.

**Cure.** The dock's inline size is a property of the *dock*, not of whichever layer is active. The
layers are already `grid-area: 1 / 1` siblings — take the max, or drive width on the producer's morph
spring so the change is a motion rather than a jump. `fit-content` on a multi-layer dock is the bug.

---

### D2-11 · The one motion in the dock that forces layout is the one that fires on boot

**Defect.** `ActionBarToggle.vue:120-128` transitions `grid-template-columns` (0fr ↔ 1fr) — a
layout-animated property. The component's own header (`:12-16`) records that it fires on the app's
boot composition because the pane's action context arrives ~170 ms after the dock; the `.is-live`
double-rAF gate suppresses the visible growth on boot but the property is still a layout animation on
every genuine toggle. Everything else in the dock is transform/opacity-only (`vj-settle` =
`scale(1)→1.03→1`, `demo/styles/animations.css:170`), so this is the sole exception — and
`VISUAL-CONSTITUTION.md §6` asks for *"one producer-owned glass-ui spring register"*, while this slot
uses `--duration-normal` / `--ease-standard` and the seal beside it uses `--spring-snappy`.

**Cure.** `transform: scaleX()` + `opacity` on a fixed-basis box, or no animation. A dock control
appearing is not a spatial-continuity event.

---

## 5. MINOR / INFO (new in r2)

### D2-12 · **Correction to r1.** The Safari keyboard BLOCKER is a known false-signal class

r1's D-1 ("the dock is keyboard-unreachable on Safari; 1 of 4 controls in the tab order") rests on a
WebKit-only Tab walk. The repository's own harness header rules this class of row out:

> `docs/tranches/V/megatranche/audit/visual/states.mjs:7-9` — *"(3) keyboard rows are meaningless in
> WebKit alone — macOS ships Full Keyboard Access OFF, so run `ENGINE=chromium` before believing any
> focus gap, and key focus identity by DOM path, never by label."*

That is Safari's *user setting* ("Press Tab to highlight each item on a webpage"), which excludes
bare `<button>`s from sequential focus on **every** site, not a property of this dock. r1's own
Chromium walk shows all four dock controls in correct order, and I reproduced it independently
(`D-dock-probe1.mjs`, Chromium 1440×900):

```
Select view → Toggle action bar → Login → @mbabb → [page] Select color space → …
```

The *underlying* observation r1 makes — that `VISUAL-CONSTITUTION.md §5.2` row 6 specifies a
horizontal Dock roving-focus rail and `Dock.vue` implements no keyboard handling at all — stands and
is worth keeping as a MAJOR. The BLOCKER framing does not. Recording this so the root does not ship a
"Safari can't reach the dock" row that any reviewer with FKA enabled will fail to reproduce.

### D2-13 · Dead text from three inactive layers is in the nav's rendered string

`nav.innerText` at rest, 1440 (`D-dock-probe1.mjs`):

```
"→ | Home | Tools | Login | @mbabb | dev misconfigured — run `npm run dev`"
```

The leading `→` is `Dock.vue:137` — a bare `&rarr;` span in the **mobile-edit** layer, which is not
active. glass-ui's crossfade applies `opacity: 0; pointer-events: none` to inactive `.dock-face`
elements but **not** `visibility: hidden`, so inactive-layer text is rendered text.
`nav.textContent` additionally leaks the full `lab(92% 88.8 20 / 82.7%)` specimen string from the
inactive action-bar face. Harmless to AT (the faces are `inert`), but any text probe, crawler or
snapshot test of the shell reads content from three layers the user cannot see — which is precisely
how the root audit's `bodyTextLength` column can move without anything visible changing.

**Cure.** `aria-hidden="true"` on the `→` at minimum; better, it is a pseudo-element, not text.

### D2-14 · A `role="alert"` node is mounted permanently in the nav band

`status-lamp.ts:47-52` returns `role: "alert"` for the `misconfigured` face and `DockStatusLamp.vue`
mounts it with the band at first paint. `role="alert"` is for dynamic, time-sensitive changes; a node
present from first paint fires an interruption on every load. Rendered proof:
`scratchpad/D-desk-slugedit.png` (right edge), `scratchpad/D-tablet-portrait.png`. Dev-gated
(`isDev` argument), hence INFO — but `role="status"` is the correct register and costs nothing.
Related: `lamp-dot-pulse … infinite` (`DockStatusLamp.vue:120`) is perpetual motion in persistent
chrome with no pause control; it is correctly wrapped in
`@media (prefers-reduced-motion: no-preference)`.

### D2-15 · Two template-ref idioms, fourteen lines apart

`Dock.vue:74` uses `useTemplateRef<…>('dockRef')` (Vue 3.5, per owner edict 7) alongside
`Dock.vue:60` `const slugEditRef = ref<InstanceType<typeof SlugEditLayer> | null>(null)` — the
pre-3.5 idiom, for the same job, in the same file.

### D2-16 · Two computed properties that only re-spell `?? null`

`Dock.vue:39-40` — `const actionBar = computed(() => actionBarProp ?? null)` and
`const genericBar = computed(() => genericActionBar ?? null)`, where both props are already typed
`… | null | undefined`. Pure indirection (owner edict 3, KISS).

---

## 6. Negative proof — what I attacked and could not break

- **No phantom tab stops.** Inactive `.dock-face` subtrees are `inert`; the measured Chromium tab
  order at 1440 is `Select view → Toggle action bar → Login → @mbabb → (page)`
  (`D-dock-probe1.mjs`), and every inactive-layer control reports `inert: true, tabbable: false`
  (`D-dock-probe3.mjs`). The harness's at-rest tap-target rows are geometry-only false positives —
  the real failure is D2-04, in the active state.
- **No horizontal overflow, anywhere.** `REPORT.md` `horizontalOverflow: 0` across all 60 captures;
  `STATES.json` `overflowX: 0` across all 30 state captures including zoom-200 and both RTL matrices.
  Measured live: dock scroller `clientW 242 / scrollW 242` at 390 (`D-dock-probe2.mjs`) — the
  `dock-scroll-x` class is present but never actually scrolls.
- **No page errors.** `REPORT.md` `pageErrors: 0` (60/60); `pageErrors=[]` in every one of my probes.
- **Reduced motion is genuinely honoured** — not merely CSS-silenced. `animations.css:184-192`
  neutralises animation and transition durations app-wide, and `STATES.json` reports
  `rafPer1500ms = 0` on **all five** `reduced-motion-desktop` rows: the render loops actually stop.
- **Owner edict 6 (animations moved, never deleted) holds.** `vj-settle` lives globally at
  `demo/styles/animations.css:170`; `Dock.vue:301-303` holds only the class.
- **Owner edict 8 (`verbatimModuleSyntax`) holds in this component.** `Dock.vue:22-24` are the only
  type-only imports and all three use `import type`; likewise `ActionBarToggle.vue:3`.
- **Landmarks are correct.** `main: 1`, `nav: 1` on all 60 captures and live; the band carries
  `aria-label="Application navigation"` (`App.vue:24`).
- **Forced colors: untested, by anyone.** The WebKit `forcedColors: "active"` capture
  (`shots/forced-colors-desktop/picker.png`) is visually indistinguishable from the ordinary light
  capture, and the harness's own header warns its state rows need `ENGINE=chromium`. I am recording
  this as a **gap**, not a pass: no seat has verified this component under forced colors.

---

## 7. Carried from r1 (confirmed, not re-argued)

Read `challenge-D-design.r1-2026-07-24.md` for the full arguments. Confirmed at this HEAD:

| r1 id | finding | r2 note |
|---|---|---|
| D-2 | `/atmosphere` + `/blob` render no route name and paint gold for a non-admin session | mechanism confirmed: `useDockAdminMode.ts:26` files two constitutional member routes in `adminViews` |
| D-3 | `h1 = 0` on every route/matrix; the dock never hands the document a heading | re-measured live: `{ h1: 0, main: 1, nav: 1, headings: 21 }`; first heading is the Picker's `<h3 class="card-title readout">`, which §5 law 11 forbids. `onViewChange()` → `switchView()` and returns — no focus move, no announcement, nothing to move focus *to*. W47's `main/H1/active-subtree = 1` claim is one-third RED |
| D-4 | the retired global `PaneSegmentedControl` is still mounted, with a `:deep()` producer override | `Dock.vue:197-204`; `PaneSegmentedControl.vue:46-51` — and that `@media (max-width: 639px)` is D2-03's fourth threshold |
| D-5 | the route menu has no selected marker; zero-pixel state delta | re-measured across **both** schemes (`D-dock-probe7.mjs`): all 7 options `fontWeight: 400`, `backgroundColor: rgba(0,0,0,0)`, one `<svg>` each (the view icon, not an indicator); only `Home` carries `aria-selected="true"`. **r2 adds:** in `D-viewmenu-light.png` the *only* visually marked row is `Palettes` (the sanctioned pastel ramp), so in a menu with no selection marker the one lawful chromatic exception **reads as the selection** |
| D-6 | two names for one route, both on screen | `viewSchema.ts` picker: `label: "Home"`, `leftLabel: "Picker"`; visible together in `D-tablet-portrait.png` and every mobile capture. PR-16's terminal **REMOVE** |
| D-7 | at 200 % zoom the desktop dock silently becomes the mobile dock | now understood as a symptom of D2-03 |
| D-8 | the desktop edit state seizes the dock and shows nothing | geometry now measured — D2-10 |
| D-9 · D-11 · D-12 | two divergent menu implementations; four computed auth errors rendered as none; the unnamed before/after edit pair | unchanged |
| D-10 | gold is a fourth visual system and the sole carrier of admin state | unchanged |
| D-13 · D-14 · D-15 · D-16 · D-17 | per-instance inline colour overrides; hand-rolled separator; three spellings of one producer; a command masquerading as a listbox option; the lamp comment contradicting its rule | unchanged |
| D-18 | the dock's navigation model and the constitution's route model disagree by four members | re-measured: the user menu offers **7** destinations against §3.1's **11** |
| D-19 | the nameless `send-btn` | enumerated and root-caused — D2-05 |
| D-20 | type-jurisdiction breaks on the control labels | re-measured in full (`D-dock-probe5.mjs`): `Home` **Fraunces** 400 · `Tools` **Fraunces** 400 · `Login` **Fira Code 700** · `@mbabb` **Fira Code** 500, all at 16.4 px, plus all seven menu rows in Fraunces (`DockViewSelect.vue:91`). §4 requires Plus Jakarta Sans, non-bold for every one. **4/4 wrong; the sanctioned control family appears zero times in the dock.** The size rung is right — this is a family error, so the dock reads as three unrelated products |
| D-21 | the dock is seed-tinted in the structural-glass tier | re-measured (`D-dock-probe4.mjs`, light): view-select **icon**, Tools **icon**, Tools **label**, `Login` **text**, `Login` **border** all resolve to `oklch(0.471189 0.188448 9.83402)` — five chromatic marks, two of them labels, none of them the `Palettes` coordinate. Only the view-select label (`color(srgb 0 0 0 / .8)`) and `@mbabb` (`oklab(0 0 0 / .7)`) are neutral. §7 requires *"every other Dock label is neutral in both schemes"* |
| D-22 | the wax seal has never been observed rendering | re-confirmed: absent from all 60 audit captures and all 30 state captures, and it did not render after 7 s idle at 1440×900 with `collapse-delay="5000"` (`D-dock-probe3.mjs · B1`: `dockCls` still contains `expanded`). ~95 lines of comment and CSS, zero π frames |

---

## 8. State-coverage matrix

| State | Handled? | Note |
|---|---|---|
| empty (no action bar) | ✔ | slot collapses to `0px` |
| populated | ✔ | |
| **loading** | ✖ | only the slug submit spins (`SlugEditLayer.vue:97`); dock actions have no pending state |
| **error** | ✖ | D2-01 — failure is indistinguishable from success; nothing is reported either way |
| disabled | partial | slug submit only |
| focused | ✔ | ring present (`outline none/3px` + box-shadow, `D-dock-probe1.mjs`) |
| hovered / pressed | ✔ | producer capsule register |
| **selected** | ✖ | r1 D-5 / §7 — no visual selected state in the view menu, in either scheme |
| dragging | n/a | |
| **overflowing / truncated** | ✖ | D2-04 — placeholder clipped to "enter slug or to" |
| **RTL** | ✖ | D2-07 — `mbabb@`, unmirrored arrows |
| reduced-motion | ✔ | verified by rAF measurement, not by CSS reading |
| **forced-colors** | **untested** | §6 — no seat has verified it; the WebKit capture is not a forced-colors frame |
| zoomed 200 % | partial | no overflow, but D2-03's fork governs which chrome appears |
| **portrait tablet** | ✖ | D2-03 — both chromes at once |
| **collapsed (wax seal)** | **unwitnessed** | r1 D-22 |

---

## 9. Six mechanisms, not twenty-two defects

1. **Desktop-only capability wiring** → D2-01, D2-02, D2-05. *Cure: provide/inject commands; delete
   `paneRefs` and every `?.` on a handler.*
2. **Four disagreeing responsive predicates** → D2-03, r1 D-7, the 639 px fork in D-4. *Cure: one
   `useLayoutMode()`; delete `Dock.vue:71` and every `lg:` / `sm:` in the subtree.*
3. **Consumer re-derivation of producer decisions** → r1 D-20 (typography), D-4 (`:deep`), D-5
   (`hide-indicator`), D2-09 (`--dock-compact-control-padding`), r1 D-13/D-14. *Cure: consume
   glass-ui's typography, density and indicator tokens; anything missing is filed as a producer ask,
   never written locally.*
4. **Seed tint used as chrome** → r1 D-21, D2-06, and the Palettes-row impersonation in §7. *Cure:
   neutral chrome; chroma only on the specimen.*
5. **Retired-by-law surfaces still shipping** → r1 D-4, D-6, D-18. *Cure: execute PR-16 and §4.2.*
6. **Chrome that stopped being chrome** → D2-04 (a login form inside the nav pill), D2-10 (the pill
   re-centres 81 px), r1 D-8, r1 D-22 (the nav becomes a 40 px unlabelled circle). *Cure: §7's
   existing ruling — Account is a Dialog opened **from** the dock, not a layer **inside** it. That one
   move removes the slug layer, the three 22 px controls, the unlabelled 160 px input and the 162 px
   width jump together.*

---

*No source edits land from this formation. Written under
`docs/tranches/V/megatranche/audit/components/shell-dock-dock/` only; r1 preserved alongside.*
