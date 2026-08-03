# CHALLENGE-D — `GradientCodeEditor.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## 0. Seat, subject, and method

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines) |
| **Mount site** | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:258-262` (the `CSS` region of the Gradient workbench) |
| **Route** | `/#/gradient` — the only route it appears on |
| **HEAD** | `c654824e`, branch `tranche-u` |
| **Canon read** | `docs/tranches/V/PROPORTION-AUDIT.md` (83 ln), `VISUAL-CONSTITUTION.md` (228 ln), `PALETTE-CONTRACT.md` (329 ln), `demo/DESIGN.md` |
| **Captured frames read (vision)** | `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/gradient.png` (all four) |
| **Live probes** | 6 WebKit probe runs against `http://localhost:9000`, desktop 1440×900 @dsf2 + iPhone 14, light + dark. Scripts + logs + 30 captures under `evidence/` |
| **Pixel analysis** | Pillow 12.1.1 sampling of the rendered composites (ground extraction from the ink-free EMPTY state; WCAG 2.x relative-luminance contrast) |

**Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/` was modified.** Every write landed under
`docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/`.

**Evidence index** — all paths relative to
`/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/`:

| file | what it proves |
|---|---|
| `probe2-log.txt` | MT-F001 blast radius, 4 typed cases + control |
| `probe4-log.txt`, `probe4-rects.json` | per-state computed CSS + element rects for all 4 matrices |
| `SHEET-desktop-light.png`, `SHEET-desktop-dark.png`, `SHEET-mobile-forced.png` | the four designed-and-undesigned states, side by side |
| `clipped-verdict-{light,dark}.png` | the error message is born 100 % off-screen |
| `mtf001-panel-destroyed.png`, `mtf001-boundary-2500ms.png`, `crop-boundary-2500ms.png` | what the user actually sees after typing `oklch()` |
| `crop-m-*-{A-idle,C-error,D-empty,E-overflow}.png` | 28 tight per-state crops |

---

## 1. The verdict

**DEFECTIVE.** Two BLOCKERs, four MAJORs, six MINORs, two INFOs.

The component is not a code editor. It is a **static syntax-highlighted readout that is
overwritten by a plain-text box the instant a user touches it**, mounted on a surface that paints
no material, wired to a validity oracle it does not model the failure of, and reporting its errors
into a paragraph that renders **zero visible pixels** at the moment it is needed.

Three of the defects are not new. They were diagnosed in this repository, at this exact file, and
the cure was applied *somewhere else*:

- `docs/tranches/T/audit/SYNTHESIS.md:121` — CC-1, "`bare .glass-wash` paints ZERO fill both
  schemes", claiming *"post-fix: the two sites (`GradientStopEditor.vue:171`,
  **`GradientCodeEditor.vue:93`**) paint their rung"*. **Measured today at that exact line:
  `background-color: rgba(0, 0, 0, 0)`, `background-image: none`.** The claimed post-fix is not
  in the tree.
- `GradientEasingEditor.vue:170-176` — the sibling readout, ~250 px above in the same pane, carries
  an inline comment naming *"on the raw translucent pane over the saturated atmosphere it
  composited ~2.7:1 (fails AA); a `bg-well` well floors it to the certified ink-on-well ratio"*.
  **My measured worst case on this component, dark scheme, is 2.47:1.** The identical mechanism
  was cured on one instance and left on the other — a per-instance patch where a root cure was
  required (owner edict 5).
- `docs/tranches/N/waves/N.W14.md:74` — *"`GradientCodeEditor.vue:138` `rounded-lg
  border-border/40` … a raw `rounded-lg` off-grammar radius"*. Still `rounded-lg`, now at line 93.

---

## 2. Visual truth — what the four captured matrices actually show

### 2.1 The code inspector is below the fold in every single captured matrix

`VISUAL-CONSTITUTION.md:49` names Gradient's three regions: *"preview, stops, **code/action**"*.
The code region is one third of the route's declared argument.

| capture | what is visible of the code editor |
|---|---|
| `safari-desktop-light/gradient.png` | one clipped line, sliced by the pane's bottom edge |
| `safari-desktop-dark/gradient.png` | one clipped line, sliced by the pane's bottom edge |
| `safari-mobile-light/gradient.png` | **nothing** — the capture ends inside the Easing tile row |
| `safari-mobile-dark/gradient.png` | **nothing** |

Measured live: at 1440×900 the editor's box top sits at `y = 795.1` in a `900 px` viewport
(`evidence/probe6` output). The declared third region of the route's argument is never seen
without a deliberate scroll. This is PROPORTION-AUDIT **PR-09** ("Gradient/Easing protagonist
subordinated") realised in the opposite direction: the *support* (Interpolation form, Easing
accordion, 8 curve tiles) consumes the whole first screen and the code artifact is exiled.

### 2.2 Two code readouts in one pane, materially unrelated

`evidence/clipped-verdict-light.png` puts them ~250 px apart in one frame:

| | easing readout (`GradientEasingEditor.vue:176`) | CSS editor (subject, `:93`) |
|---|---|---|
| ground | `oklab(0.913299 0.005463 0.013024)` — **opaque** (`bg-well`) | `rgba(0, 0, 0, 0)` — **nothing** |
| radius | `6px` (`rounded-md`) | `8px` (`rounded-lg`) |
| copy affordance | **inside** the field, trailing icon rail | **outside** the field, a `DockControl` in the section header (`GradientVisualizer.vue:253-255`) |
| padding | `4px 8px` | `12px` |

The subordinate readout is a legible recessed field; the protagonist artifact is a hairline ghost
over the atmosphere. `VISUAL-CONSTITUTION.md:14-19` is explicit — the *Specimen well* tier
("image, curve, palette or **code artifact**") is an "**opaque**/quiet neutral stage", and "Glass
earns its blur by revealing live content; **otherwise it is a neutral well**." This surface has
`backdrop-filter: none`. It earns nothing and is not a well.

### 2.3 The dark-mode treatment is the worse of the two

Measured plate (rendered composite, ink-free EMPTY state, 82 560 px sampled):

- light: ground ranges `rgb(240,189,202)`…`rgb(240,209,206)` — L 0.592…0.686 — a **chromatic pink**
- dark: ground ranges `rgb(119,78,85)`…`rgb(119,92,88)` — L 0.100…0.123 — a **chromatic maroon**

Light-mode plate ΔL against the surrounding pane is `−0.050`. **Dark-mode ΔL is `−0.012`** — at
1.2 % luminance separation the well is optically absent; only the `border-border/40` hairline says
a field exists at all. `PALETTE-CONTRACT` / `VISUAL-CONSTITUTION.md:19` — "Seed tint is forbidden
outside the ambient field, active accent, WatercolorDot/specimen, and pastel Palettes lanes."
A code plate is none of those, and it is fully seed-tinted in both schemes.

---

## 3. The findings

### D-1 · **BLOCKER** · Typing `oklch()` destroys the entire Gradient workbench, and the component's own contract says it cannot

**The component's stated design contract**, `GradientCodeEditor.vue:38-40`:

> *"A failed parse keeps the user's text verbatim alongside the verdict — **WIP is never destroyed**."*

**Reproduction** (`evidence/probe2-log.txt`, WebKit 1440×900, dev server live):

```
1. http://localhost:9000/#/gradient   2. scroll to the CSS field   3. select-all, type:
   linear-gradient(90deg, oklch(), blue)
```

Measured after the 500 ms debounce fires, identically for `oklch()`, `rgb()` and `hsl(  )`:

```
after: {"editorPresent":false, "editorText":null, "verdict":null,
        "mainTextLen":102,          <-- was 581
        "mainHtmlLen":2832,         <-- was 91196
        "buttons":17,               <-- was 53
        "renderTilePresent":false,
        "bodyText":"… This panel hit an unexpected error.
                      undefined is not an object (evaluating 'g[0].replace')  Try again"}
```

Control, `notacolor` (a *designed* rejection): `editorPresent:true`, `aria-invalid="true"`,
`border rgb(219,36,36)`, `verdict:"unparseable color \"notacolor\""` — the designed arm works.

Visual witness: `evidence/mtf001-panel-destroyed.png` — **both panes are gone**; a lone `Try again`
pill floats on the atmosphere. Clicking it restores the pane but **discards the user's text** and
resets to the default seed (`evidence/probe10`: `"linear-gradient(90deg, oklch(0.75 0.15 145) 0%,
oklch(0.65 0.18 265) 100%)"`).

**Mechanism — and it is a *design* mechanism, not just a library bug.** The component delegates
validity to the library oracle (`gradientParse.ts:92` → `parseCssColor(token).ok`) and models
exactly **two** outcomes: applied (`parseVerdict = null`) or rejected-with-reason (a string). It
models **no third arm for "the oracle threw"**. `src/css/grammar.ts:181`'s false non-null assertion
(MT-F001) supplies that third arm on the eight empty-argument colour functions — which is precisely
what a human produces mid-keystroke, typing `oklch(` then `)` before the arguments. The escape
route is a bare `emit("parse", text)` inside a 500 ms `setTimeout` (`GradientCodeEditor.vue:63-65`),
so the throw surfaces *asynchronously*, unattached to any interaction, and the parent's
`onParseCSS` (`GradientVisualizer.vue:107-111`) has no `try`. It propagates to the route
ErrorBoundary, which unmounts the whole workbench.

**Cure (gestalt, not patch).** The `parse` emit must cross a **total** boundary: the parser band's
adjudicated total parser (`registry/adjudicated/parser-band.md`, cand-O) makes `parseCssColor`
return a failure value instead of throwing, and this component's contract then becomes true by
construction. Wrapping this one call site in `try/catch` would be exactly the masking fallback the
owner's edict 2 forbids — it would convert a shipping library crash into a silent local lie. The
component-side half of the cure is that its error model must be **one closed sum** —
`applied | rejected(reason)` with no escape hatch — enforced by the *type* of what crosses the emit,
not by convention.

---

### D-2 · **BLOCKER** · The specimen well is not painted, so every syntax-highlight crayon fails AA in all four matrices

`GradientCodeEditor.vue:93` puts `hljs` and `glass-wash` on the same element. Measured computed
style, live, both schemes:

```
backgroundColor : rgba(0, 0, 0, 0)
backgroundImage : none
backdropFilter  : none
boxShadow       : … 0px 2px 8px …   <-- glass-wash still paints its bevel + drop shadow
```

`demo/styles/hljs.css:56-58` — the theme deliberately supplies **no** ground:
`.hljs { color: var(--code-ink); background: transparent; … }`. And its own header,
`demo/styles/hljs.css:22-33`, states what ground the palette was guarded against:

> *"The markdown code chip ground moved from `--muted` to **the rung-2 well** (`--well-bg` = card
> 92 % + fg 8 %) … Post-fix **on the well**: comment 5.33/5.04, string 4.99, number 4.91, keyword
> 4.91, entity/title 5.41 (light) — all ≥ 4.5."*
> `--code-comment: hsl(30 22% 34%); /* warm muted gray (**well-guarded**) */`
> `.dark { /* The same set, lifted for **the dark chocolate WELL field**. */ }`

This component supplies the atmosphere instead of the well. **Delivered contrast, computed from
the rendered composite** (`evidence/probe4` PNGs; ground extracted from the ink-free EMPTY frame;
`text-mono-small` = 16.4 px, i.e. normal text, floor 4.5:1):

| token | guarded (on well) | **delivered light** | **delivered dark** | **delivered mobile-dark** |
|---|---:|---:|---:|---:|
| `--code-comment` | 5.31 / 4.32 | **4.20** | **2.65** | **2.55** |
| `--code-keyword` | 4.93 / 4.19 | **3.90** | **2.57** | **2.47** |
| `--code-entity` | 5.41 / 4.58 | **4.27** | **2.82** | **2.71** |
| `--code-string` | 4.97 / 4.99 | **3.93** | **3.06** | **2.95** |
| `--code-number` | 4.93 / 5.26 | **3.89** | **3.23** | **3.11** |
| plain ink | 13.52 / 7.95 | 10.69 ok | 4.88 ok | 4.70 ok |

**Every crayon fails 4.5:1 in every matrix.** Dark is worst — `keyword` at **2.47:1**, matching the
sibling's own recorded observation of "~2.7:1" to within measurement noise. Ground ΔL vs the
guarded well is `−0.170…−0.076` (light) and `+0.044…+0.073` (dark), i.e. the plate is *darker* than
guarded in light and *lighter* than guarded in dark — the error has opposite sign per scheme, so no
single crayon re-tune can rescue it. And because the ground is the live seed-driven atmosphere,
**the delivered ratio moves with the user's chosen colour**: it is not a fixed number that can be
certified once.

`VISUAL-CONSTITUTION.md:82` is exact: *"Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; **a token name is not evidence**."* Consuming `.hljs` is a
token name. The rendered tier is the atmosphere.

Secondary: `glass-wash` still emits its bevel and a `0 2px 8px` **outer drop shadow** onto a
surface with no fill — so the code artifact reads as a *raised* slab with no body. That is the same
optical complaint the owner recorded in OM-13 against the easing rail, and PROPORTION-AUDIT
**PR-05** disposes of it: *"caster shadows … repeat a boundary → REMOVE"*.

**Cure.** The specimen-well tier must be a *material*, not a class two components remember to
apply. One well recipe owns every code/value artifact on the route (the `bg-well` rung the sibling
already proves), applied at the tier — never re-decided per instance. `.hljs` then always lands on
the ground it was guarded for, and the guarantee becomes structural rather than a per-site audit.

---

### D-3 · **MAJOR** · The error message is born 100 % off-screen; the only surviving failure signal is colour-only

Measured, `evidence/probe7`, identical light and dark at 1440×900:

```
light {"verdictBottom":904, "cardBottom":877, "viewportH":900,
       "belowCardBy":27, "visiblePx":0, "verdictH":22.9}
dark  {…identical…}
```

`visiblePx: 0`. The `<p data-testid="gradient-parse-verdict">` is clipped by its own card's scroll
box (`.glass-resting.card.rounded-card…`) at the instant it appears, in all three probed matrices
(`evidence/probe6`: `verdictClippedByHost: true`, `inViewport: false`, desktop-light /
desktop-dark / mobile-light). Visual witness: `evidence/clipped-verdict-light.png` — a red-bordered
box with **no message**.

The cause is compositional: the editor is the **last** child of the pane, the verdict is its
*next sibling*, and the verdict is created 500 ms after the keystroke with no reveal. Every failure
is therefore announced into the clip.

What remains is a red 1 px border. `VISUAL-CONSTITUTION.md:83`: *"Selected, **failed**, pending,
withdrawn and disabled states are **never colour-only**. Role, accessible name, state/value and
**associated error/status are explicit**."*

Three sub-defects compound it, all measured (`evidence/probe4-log.txt` attrs block):

- `aria-describedby: null` — the verdict is never *associated* with the textbox. The `<p>` has no
  `id`. AT users get `aria-invalid="true"` with no reason attached.
- `aria-multiline: null` on a `role="textbox"` that is explicitly multi-line (`whitespace-pre-wrap`,
  `max-h-[12rem]`, `overflow-y-auto`).
- `role="status"` sits on a `v-if`-mounted node (`:107-113`). A live region that is *created* at
  announce time is the classic non-announcement: several AT stacks only observe regions present
  before the mutation.

**Cure.** The failure state belongs *inside* the field's own anatomy, not after it — which is
exactly what glass-ui's `LabeledField` already models (§ D-7). The error slot lives within the
control's boundary, carries `errorId`/`describedBy`, and its live-region policy is a prop
(`errorLive`) instead of a hand-placed paragraph that the layout can exile.

---

### D-4 · **MAJOR** · The syntax highlighting is dead exactly while the editor is being used

Measured (`evidence/probe9`):

```
spans while focused: 0
after blur:          3
```

Visual witness, `evidence/SHEET-desktop-light.png` rows 1 vs 2: the idle frame renders `90deg`,
`0.75`, `0.15`, `145` in crayon ochre; the moment a user types, **the entire string is flat ink**.

Mechanism, by design: `onInput` (`:57-60`) reads `textContent` and debounces the parse but **never
calls `render`**; the model→editor `watch` (`:76-79`) early-returns while `focused`. So the
component's headline capability — hljs highlighting, the reason `highlight.js/lib/core` +
`css` are imported at all — decorates only the state in which nobody is looking at it.

This is a real design tension, and the source is honest about the trade (`:32-40`, "the editor
truce" — never re-seat the caret mid-thought). But the trade was resolved by **deleting the
feature in the used state** rather than by solving it. The two standard resolutions both exist and
neither was taken: (a) re-render with caret restoration via `Selection`/`Range` offsets, or (b)
the overlay idiom — a transparent-ink editable layer over an aria-hidden highlighted mirror, which
never touches the caret at all because the caret's host is never rewritten.

**Cure.** Idiom (b). It also dissolves D-9: the mirror can own `pre`-style non-breaking layout
while the editable layer stays a plain text host.

---

### D-5 · **MAJOR** · There is no pending state, and the error state lies for at least 480 ms

Measured (`evidence/probe9`) — starting from a settled rejection, the user *fixes* the text:

```
1 invalid settled: border rgb(219,36,36)  aria-invalid true  verdict 'unparseable color "notacolor"'
   type: linear-gradient(90deg, red, blue)          <-- fully valid; "notacolor" no longer exists
   +0ms   border rgb(219,36,36)  aria-invalid true  verdict 'unparseable color "notacolor"'
   +120ms border rgb(219,36,36)  aria-invalid true  verdict 'unparseable color "notacolor"'
   +300ms border rgb(219,36,36)  aria-invalid true  verdict 'unparseable color "notacolor"'
   +480ms border rgb(219,36,36)  aria-invalid true  verdict 'unparseable color "notacolor"'
   +650ms border → normal        aria-invalid null  verdict null
```

For ≥ 480 ms the product shows a destructive border, `aria-invalid="true"`, and an error naming a
token **that is not in the field**. The same window runs in the other direction: after a valid edit
becomes invalid the surface reads "fine" for 500 ms.

`VISUAL-CONSTITUTION.md:83` lists **pending** among the states that must be explicit. There is no
settling state at all — the two-arm model (`null | string`) has no third value for "not yet
decided", so the stale arm is *forced* to impersonate the current truth.

**Cure.** Three arms, not two: `settling | applied | rejected(reason)`. Entering `settling` on
input immediately drops the destructive treatment (nothing is claimed while nothing is known), and
the arm is a *value*, not a timer side effect.

---

### D-6 · **MAJOR** · The empty state was never designed

Measured (`evidence/probe4`, `crop-m-desk-light-D-empty.png`, `crop-m-desk-dark-D-empty.png`):

```
EMPTY {"text":"\"\"", "html":"\"<br>\"", "h":80,
       "verdict":"not a <type>-gradient(…) function",
       "ariaInvalid":"true", "placeholder":null}
```

A user who clears the field to start over gets: an empty 80 px box, a **destructive red border**,
`aria-invalid="true"`, and a verdict written in grammar meta-notation (`<type>-gradient(…)`)
addressed to a spec reader, not to a person. There is **no placeholder, no example, no reset
affordance** — `placeholder: null`, and the section's only action (`Copy CSS`) copies, it does not
restore.

Emptiness is not failure. Treating "I cleared the field" as a destructive error is the component
punishing the most ordinary authoring gesture there is. Visible in the crop: `h: 80` with a single
line's worth of nothing — 29 px of unowned reserve inside a red alarm rectangle
(PROPORTION-AUDIT § 5.5, "no two-line minimum … reserve never appears").

**Cure.** Empty is its own arm, styled as *invitation* (placeholder showing the canonical form,
neutral boundary), not as rejection. The three-arm model of D-5 extends to four:
`empty | settling | applied | rejected`.

---

### D-7 · **MAJOR** · A hand-rolled field where glass-ui ships the anatomy — MT-F037's family, applied to the larger surface

**Producer census, `@mkbabb/glass-ui@7.0.0` as installed** (`node_modules/@mkbabb/glass-ui/dist/`):

```
$ cat dist/forms.d.ts
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/combobox";
export { useUserInvalidAria, … };
export type { ControlSize } from "./components/_shared";
```

| producer component | props | slots |
|---|---|---|
| `Input` | `disabled invalid readonly size type` | **none** (`dist/Input-9BlLluik.js` renders `field-control glass-defined`) |
| **`Textarea`** | `invalid readonly disabled resize rows cols size placeholder required` | none |
| **`LabeledField`** | `label description requirement layout **errorLive** **invalid** disabled controlLabelable` | `default({controlId, labelledBy, **describedBy**, **errorId**, invalid, disabled, required})` + **`error`** |
| `LabeledInput` / `LabeledSelect` / `LabeledSlider` / `LabeledSwitch` | the four wired pairs | — |

`LabeledField` **is** the anatomy this component hand-rolls, field for field: a bounded control, an
`invalid` state, an error region, a live-region policy, and — the part the hand roll simply omits —
the `describedBy`/`errorId` association that D-3 is missing. The demo consumes **none** of it:

```
$ grep -rn "LabeledField\|LabeledInput\|glass-ui/forms" demo/
demo/ui/input/index.ts:1:export { Input } from "@mkbabb/glass-ui/forms";
$ grep -rn "field-control" demo/     →  0 files
```

Zero demo files consume `field-control`, the producer's own field surface class — the exact census
result the owner's OM-13 mark (`ROOT-FINDINGS.md:1562-1581`, MT-F037) recorded for the easing rail.
This component is the *larger* instance of that mark: not a 32 px readout row but a 80–192 px
authoring surface, with a boundary, an invalid state and an error line, all hand-cut.

Canon agrees independently. PROPORTION-AUDIT § 5.10: *"Readout and editing are separate jobs …
the semantic W21 numeric fields are the only direct channel editors, with commit/cancel/error
semantics and **no duplicate `contenteditable` path**."* This is the third `contenteditable` in
the demo (`GradientCodeEditor.vue:88`, `ColorComponentDisplay.vue:23`, `ColorInput.vue:13`) — three
bespoke editing hosts, three different recipes, zero producer field surfaces.

**No installed variant fits an editable, syntax-highlighted, icon-adjacent code row**: `Textarea`
cannot host highlight markup (it is a native `<textarea>`), and `Input`/`Textarea` expose **zero
slots**, so no trailing action rail can live inside the field. Per this seat's brief, that makes
the cure a **marked glass-forward ask**, never a local restyle:

> **GLASS-FORWARD ASK (BH/BI relay).** glass-ui to own a `field-control`-shelled *code/editor*
> surface — the `Input`/`Textarea` boundary, size, `invalid` and focus grammar over an
> author-supplied editable child — plus a `LabeledField` composition slot able to carry a trailing
> action rail. Consumers then get boundary + invalid + error association + copy affordance from the
> producer, and supply only the highlighting. This single ask closes MT-F037 (easing rail),
> this finding, `MixResultDisplay.vue:31` and `App.vue:362` at once — the four sites the
> DEFECT-LEDGER already groups (`DEFECT-LEDGER.md:42893`).

---

### D-8 · **MINOR** · Off-grammar geometry: `rounded-lg` and two magic reaches where the house names tokens

`GradientCodeEditor.vue:93` — `rounded-lg … min-h-[5rem] max-h-[12rem]`. Measured computed:
`border-radius: 8px`, `min-height: 80px`, `max-height: 192px`.

`demo/DESIGN.md:195`: *"`rounded-input` (= `--radius-input` = 8 px) — text inputs."*
`demo/DESIGN.md:385`: *"**No magic `[var(--…)]` reaches when a Tailwind utility exists** … Truly-
bespoke residuals (≤ 5) carry an inline rationale."*

The rendered 8 px happens to equal `--radius-input` — a **coincidence**, not a binding. Move the
token and this surface silently detaches. Census:

```
$ grep -rn "rounded-lg" demo/ | wc -l   → 3        (one of the last three sites in the demo)
$ grep -rn "rounded-input" demo/        → DESIGN.md:195, DESIGN.md:385,
                                          ColorInput.vue:16, FlagReportDialog.vue:32
```

`FlagReportDialog.vue:32` is the house's existing multi-line text-entry recipe —
`rounded-input border border-input bg-background px-3 py-2 text-small … focus-visible:ring-2
focus-visible:ring-ring/40` — an **opaque** `bg-background` ground with the token radius and the
token border. The subject diverges on all three (`rounded-lg` / `border-border/40` / no ground)
while copying only the focus ring. `N.W14.md:74` anchored this exact site and it never executed.
No inline rationale accompanies either arbitrary reach.

---

### D-9 · **MINOR** · `word-break: break-all` fractures identifiers and numeric literals in a *code* surface, and the overflow state slices its first line

Measured: `word-break: break-all`, `overflow-wrap: break-word`, `white-space: pre-wrap`.
Overflow (12 stops, desktop): `scrollH 237 / clientH 190` → scrolls; mobile `252 / 190`.

Visual witness `evidence/SHEET-desktop-light.png` row 4 and `SHEET-mobile-forced.png` row 2 —
actual line breaks in the rendered composite:

```
…, oklch(0.7 0.15 6      ← the number 60 split across lines
0) 18%, …
…, 45%, okl              ← the identifier oklch split mid-word
ch(0.7 0.15 180) 55%, …
…, oklch(0.               ← the literal 0.7 split after the decimal point
7 0.15 330) 100%)
```

`break-all` breaks between *any* two characters. In a surface whose entire job is to make CSS
legible, a split numeric literal is a legibility failure, not a wrapping preference. And the
overflowed **top line is sliced mid-glyph** by the rounded top edge with no fade mask, no scroll
shadow and no visible affordance that more content exists above (`scrollbar-width: thin`, which is
invisible until interaction — `docs/tranches/U/audit/w-visual-close-artefacts.md:92` already notes
this surface "gates on interaction").

**Cure.** Belongs to D-4's overlay idiom: the aria-hidden highlighted mirror owns `pre`-like
wrapping at token boundaries (`overflow-wrap: anywhere` at worst), plus a top/bottom scroll-edge
mask so a clipped line reads as clipped.

---

### D-10 · **MINOR** · The copy affordance is outside the field it belongs to

`GradientVisualizer.vue:250-262` puts `Copy CSS` in the **section header**, 40 px above and
horizontally opposite the field it acts on. `GradientEasingEditor.vue:178-188` puts the identical
job **inside** the rail with its target. One pane, one job, two anatomies — and the
header-mounted one has no visual binding to the artifact it copies.

PROPORTION-AUDIT § 5.2 — *"a card has one protagonist, one identity line, and **at most one**
persistent action/status region"* — and PR-13 disposes of exactly this shape (Copy hosted in two
places → `REMOVE`, "total 2 → 1"). Folds into the D-7 glass-forward ask: the producer field's
trailing-action rail is where this control belongs.

---

### D-11 · **MINOR** · Focus is box-shadow-only, with no forced-colors fallback

Measured (`evidence/probe4-log.txt`, all four matrices):

```
outlineStyle : none
boxShadow    : … rgb(28,25,23) 0px 0px 0px 2px …   (light)
               … rgb(233,230,226) 0px 0px 0px 2px  (dark)
```

The class is `outline-none focus-visible:ring-2 focus-visible:ring-ring/40`. Tailwind's `ring`
compiles to `box-shadow`. `VISUAL-CONSTITUTION.md:84`: *"Focus remains visibly distinct from
selection in both schemes, **forced colors** and reduced transparency."* `box-shadow` is not
painted in forced-colors mode; `outline` is the only indicator that survives, and it is explicitly
suppressed.

**Reproduction: partial / mechanism CONFIRMED, paint HYPOTHESIS.** WebKit's
`emulateMedia({forcedColors:"active"})` still reports and paints the shadow
(`evidence/crop-m-desk-light-F-forcedcolors-focus.png` shows a frame), so this harness cannot
witness the real Windows High Contrast drop. The CSS mechanism (`outline-style: none` + ring-as-
shadow) is measured and is the documented cause. Note also the ring resolves **fully opaque**
(`rgb(28,25,23)`), not the `/40` the class asks for — the alpha in `ring-ring/40` is not reaching
the painted value.

---

### D-12 · **MINOR** · Per-instance inline `style` on the root, and a redundant font override on the verdict

`GradientCodeEditor.vue:97-99` sets `transition` through a **`:style` binding on the component
root**, duplicating a token pair (`--duration-normal` / `--ease-standard`) that the house already
resolves for every element (`demo/styles/foundation.css:129` sets
`--default-transition-timing-function: var(--ease-standard)`). Measured effective:
`transition-property: border-color, box-shadow; duration 0.3s, 0.3s`. It works — and it is a
per-instance override of exactly the kind owner edict 5 forbids: a hand-written inline style where
a class or the root default owns the grammar. It is also the highest-specificity form available,
so any future system-level motion policy cannot reach it.

Motion is otherwise clean: `prefers-reduced-motion` is honoured by
`demo/styles/animations.css:184-192`'s global `transition-duration: 0.01ms !important` guard; the
animated properties (`border-color`, `box-shadow`) do not force layout; no keyframes were deleted.

Verdict typography, measured (`evidence/probe8`):

```
firaCodeRedundant : true
monoSmallFamily   : "Fira Code","Fira Code Fallback","Fira Mono",monospace
firaFamily        : "Fira Code","Fira Code Fallback","Fira Mono",monospace
```

`:110` carries `class="fira-code text-mono-small …"`. `text-mono-small` already resolves the Fira
stack; `fira-code` is a per-instance no-op override. (Corrected from my own earlier reading: the
verdict's *size* is correct — 16.4 px, identical to the sibling rail's `<code>`. The type role
matrix, `VISUAL-CONSTITUTION.md:76`, "value, code, or provenance → `text-mono-small`, Fira Code",
is satisfied.)

---

### D-13 · **INFO** · The highlight fallback is an unescaped `innerHTML` sink

`GradientCodeEditor.vue:47-56`:

```ts
function highlight(code: string): string {
  try { return hljs.highlight(code, { language: "css" }).value; }
  catch { return code; }              // <-- raw text …
}
function render(code: string) {
  if (editorRef.value) editorRef.value.innerHTML = highlight(code);   // <-- … into innerHTML
}
```

The success path is escaped by hljs. The `catch` arm returns the input verbatim into `innerHTML`.
`hljs.highlight` with a registered language does not realistically throw, and `render` is only
called with the model's own serialization — but a `catch` whose recovery is "write the untrusted
string as markup" is a designed-in sink. **Reproduction: NONE — hypothesis.**

---

### D-14 · **INFO / cross-reference** · The error screen this component triggers renders zero visible ink

Not this component's file, but it is what the D-1 user sees, and it is measurable, so it is
recorded here for `ErrorBoundary`'s seat.

After the MT-F001 crash, both boundary paragraphs are laid out and computed fully visible:

```
P.font-display.text-heading.text-foreground  "This panel hit an unexpected error."
   color rgb(28,25,23)  opacity 1  visibility visible  fontSize 25.888px
   rect {x:497.6, y:437.3, w:444.9, h:35.6}
P.text-mono-small.plate-ink  "undefined is not an object (evaluating 'g[0].replace')"
   color oklch(0.446872 0.003862 34.629978)  opacity 1  rect {x:488, y:485, w:464, h:46}
```

Ancestor chain to `<body>` (`evidence/probe12`): every level `opacity 1`, `visibility visible`,
`animation-name none`, `clip-path none`, `filter none`, `content-visibility visible`.

Rendered composite over that exact region (device px 960–1920 × 860–1080 = viewport 480–960 ×
430–540, `evidence/crop-boundary-2500ms.png`, sampled at 2500 ms):

```
crop size (960, 220)   pixels 211200   distinct colours 232
darkest pixel (239, 91, 161)  L = 0.2841
pixels with L < 0.15 (near-black ink would be L ≈ 0.010):  0
```

**Zero.** The recovery screen shows the user a lone `Try again` pill on an empty pink field, with
no diagnosis and no title. Separately: `"undefined is not an object (evaluating 'g[0].replace')"`
is a minified library internal (`g` is the mangled `slash` binding of `src/css/grammar.ts:181`)
presented as product copy.

---

## 4. What the design gets right

Stated so the negative findings are not read as indiscriminate:

- **Type role is correct.** `text-mono-small` / Fira Code for a code artifact matches
  `VISUAL-CONSTITUTION.md:76` exactly, and the source comment at `:104-106` shows the
  `text-mono-caption` label-costume trap (P1-7) was consciously avoided.
- **Reduced motion is honoured**, via the global guard rather than a local re-implementation, and
  the two animated properties are compositor-safe. No animation was deleted.
- **Vue 3.5 idiom is clean**: `useTemplateRef`, reactive props destructure with a default. No
  type-only import exists, so `verbatimModuleSyntax` has nothing to violate. No god module, no
  back-compat shim, no new `shared/` directory.
- **Keyboard reachability works**: Tab from `Copy CSS` lands on the textbox
  (`isContentEditable: true`), and Tab out proceeds correctly.
- **200 % zoom is sound.** Measured both schemes and both viewports: `docOverflowX: false`,
  `scrollH == clientH`, no clipping introduced. Desktop `scrollW 1440 / clientW 1440`; mobile
  `390 / 390`. This is a genuine negative result, not an unchecked box.
- **Unmount during a pending parse is safe.** Typing then routing away inside the 500 ms window
  produces zero page errors (`evidence/probe10` case A) — Vue drops the emit. The missing
  `debounced.cancel()` in `onUnmounted` is untidy but not a defect.
- **`horizontalOverflow: 0` on `/#/gradient` in all four captured matrices**
  (`audit/visual/REPORT.json`), and the component contributes none of the route's 6 small tap
  targets or its 1 nameless button.

---

## 5. The gestalt cure

Four of the fourteen findings (D-2, D-3, D-6, D-7, and half of D-10) are the same defect wearing
different clothes: **this component re-invents a form field instead of consuming one.** The
boundary, the ground, the invalid state, the error region, its association and its placement, the
trailing action — every one of those is field anatomy, and every one was hand-cut here, differently
from `ColorInput.vue`, differently from `FlagReportDialog.vue`, differently from the readout rail
250 px above it in the same pane.

The transposition, in order:

1. **Producer first** — the glass-forward ask of D-7. A `field-control` code/editor surface plus a
   `LabeledField` action-rail slot. Until it lands, nothing local should be restyled, because a
   local restyle is the fifth divergent recipe.
2. **The well is a tier, not a class.** One material owns every code/value artifact on the route
   (D-2). `.hljs` then always meets its guarded ground by construction, and the crayon certificate
   in `hljs.css`'s header becomes true again instead of aspirational.
3. **Close the state sum.** `empty | settling | applied | rejected(reason)` — four arms, no
   escape (D-1, D-5, D-6). The parse boundary becomes total via the adjudicated parser band, so
   "the oracle threw" ceases to be a reachable state rather than being caught and masked.
4. **The overlay idiom for editing** (D-4, D-9): an aria-hidden highlighted mirror under a
   transparent-ink editable layer. Highlighting becomes live because the caret's host is never
   rewritten, and the mirror owns code-correct wrapping.

Executed in that order, D-8, D-11 and D-12 fall out for free — the producer field carries the
radius token, the outline-bearing focus grammar and the motion policy, and there is nothing left
for an inline `:style` or a raw `rounded-lg` to say.

---

## 6. Register

| ID | Sev | Finding | Reproduction |
|---|---|---|---|
| D-1 | **BLOCKER** | typing `oklch()`/`rgb()`/`hsl(  )` destroys the whole workbench; the component's own "WIP is never destroyed" contract is falsified | YES — `evidence/probe2-log.txt` |
| D-2 | **BLOCKER** | the well paints nothing; all 5 hljs crayons fail 4.5:1 in all 4 matrices (worst 2.47:1) | YES — measured composite |
| D-3 | MAJOR | the verdict is born 100 % off-screen (`visiblePx: 0`); failure becomes colour-only; no `aria-describedby` | YES — `evidence/probe7` |
| D-4 | MAJOR | highlighting is dead while focused (`spans: 0 → 3`) | YES — `evidence/probe9` |
| D-5 | MAJOR | no pending arm; the error state lies for ≥ 480 ms | YES — `evidence/probe9` |
| D-6 | MAJOR | empty state undesigned: red alarm + spec-grammar copy + no placeholder | YES — `evidence/probe4` |
| D-7 | MAJOR | hand-rolled field where glass-ui ships `Textarea` + `LabeledField`; 0 demo `field-control` consumers → **glass-forward ask** | census |
| D-8 | MINOR | `rounded-lg` / `min-h-[5rem]` / `max-h-[12rem]` vs `rounded-input`; N.W14 anchored, unexecuted | grep + computed |
| D-9 | MINOR | `break-all` splits identifiers and numeric literals; overflow slices the top line | YES — visual |
| D-10 | MINOR | copy affordance outside the field; two anatomies for one job in one pane | file:line |
| D-11 | MINOR | focus is box-shadow-only, `outline: none`; no forced-colors fallback; ring alpha lost | mechanism YES, paint HYPOTHESIS |
| D-12 | MINOR | per-instance inline `:style` transition on the root; redundant `fira-code` | measured |
| D-13 | INFO | `catch { return code }` → unescaped `innerHTML` sink | NONE — hypothesis |
| D-14 | INFO | the boundary screen this triggers paints **0 px** of its copy; minified library internal shown as product copy | YES — `evidence/probe12` (→ `ErrorBoundary` seat) |
