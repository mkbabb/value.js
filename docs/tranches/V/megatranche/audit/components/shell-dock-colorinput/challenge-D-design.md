# CHALLENGE-D — `demo/shell/dock/ColorInput.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Not "needs polish". The component is a 377-line `contenteditable` span carrying
five unrelated jobs, and the audit found:

- it **does not exist** below `(min-width: 1024px) and (min-aspect-ratio: 1.1)` — so it is absent
  on every phone, every portrait tablet, and on a 1440×900 desktop **at 200 % browser zoom**;
- its commit button resolves **zero CSS rules** for the class its own comments credit with
  hover / press / focus / disabled — measured identical computed style across rest, hover, active
  and focus;
- its error affordance **paints over both the user's text and the commit button** (63.8 % of the
  button's area), carries **no `aria-invalid`, no `aria-describedby`, no `role`, no `aria-live`**,
  evaporates after 2 s, and **never fires a second time** for the same input;
- **every keystroke resizes the dock** — measured 137.3 px of dock-width travel while typing one
  13-character colour name — which simultaneously makes its most bespoke CSS (mask + ellipsis +
  `text-center`) unreachable dead code;
- one of its two declared animations **cannot run at all**: the inline `animation: crown-appear`
  names a keyframe Vue's scoped-style compiler renamed away.

This is a round-2 seat. `challenge-D-design.round1.md` (preserved beside this file) reached
several of the same conclusions from a different probe path; where that happened I say so, because
independent re-derivation is evidence, not padding. Findings **D-05, D-08, D-09, D-12, D-13,
D-14, D-16, D-17, D-19** are new to this round, and **D-03b** corrects a round-1 claim.

**Strongest single defect: D-01** — the design ships the app's only "type any CSS colour"
affordance on ≥1024 px landscape viewports only. The help popover it hides behind hover literally
reads *"Any valid CSS color string is accepted"*; on a phone, and at 200 % zoom, there is nowhere
to type one.

---

## 1. Method and evidence base

- **Source read**: `demo/shell/dock/ColorInput.vue` (377 lines) at HEAD `9bcd5d91` (branch
  `tranche-u`; the task named `c654824e`, HEAD had advanced by five mail commits — no `demo/`
  change between them).
- **Canon read**: `docs/tranches/V/VISUAL-CONSTITUTION.md` (228 lines),
  `docs/tranches/V/PROPORTION-AUDIT.md` (83 lines), `docs/tranches/V/PALETTE-CONTRACT.md`
  (329 lines).
- **Mega-tranche visual audit**: `../../visual/REPORT.md` + the 60 Safari captures.
- **Live probes**: five Playwright/Chromium runs against the live dev server on
  `http://localhost:9000`, matrix = {desktop light, desktop dark, mobile 390×844 touch,
  720×450 (= 1440×900 at 200 % zoom), RTL, `forcedColors: active`}. Raw results banked at
  `frames/probe-1.json`, `frames/probe-2.json`, `frames/probe-3.json`; rendered frames at
  `frames/*.png`.
- **Served-CSS read**: the component's compiled scoped stylesheet fetched directly from Vite.

**No source file was edited.** Everything written by this seat lives under
`docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/`.

### 1.1 Reaching the component at all

`ColorInput` is **two clicks and a media query deep**: it renders only inside `Dock.vue`'s
`action-bar` `DockLayer` (`Dock.vue:153`), reached by pressing *Tools*, and only in the `input`
sub-layer of `ActionBarLayer.vue` (`ActionBarLayer.vue:115`), reached by pressing a second toggle.
That is why **none of the 60 mega-tranche captures contain it** — the visual audit photographed
the dock at rest, where this component is `inert`. Every frame in `frames/` was therefore driven
by hand.

---

## 2. Visual truth first

### 2.1 The rest frame — `frames/A-rest-light.png`

![rest](frames/A-rest-light.png)

An **opaque white plate with a 1 px `--input` border**, floating inside the dock's translucent
liquid-glass pill, flanked by two `DockSeparator` hairlines. Every sibling control in that pill is
a glass capsule (`dock-icon-button glass-specular-track glass-capsule-hover`). This one is a
shadcn form field transplanted whole into a glass instrument.

`VISUAL-CONSTITUTION.md:11–19` — the material table gives the dock exactly one tier
("Structural glass | dock, header, primary plate | neutral Clear-Ice/Smoke family") and then:
*"One surface has one tier. An inner card is not automatically another pane of glass."* The plate
is a **second, foreign material tier inside the dock band** (→ **D-19**).

Two further things are visible in that frame before any measurement:

1. The field's **right edge dissolves**. The `mask-image` (`ColorInput.vue:300`) fades the last
   40 px of the element to transparent — and a mask clips *the whole element*, so the border and
   the rounded corner go with the ink. A bounded input whose boundary is deliberately deleted on
   one side.
2. The value is **not optically centred** despite `text-center`. Measured below (**D-14**).

### 2.2 The error frame — `frames/B-f001-error.png`

![error](frames/B-f001-error.png)

This is the frame that decides the verdict. The user typed `oklch()` and pressed Enter. A solid
`--destructive` slab reading *"not a valid color"* now sits **on top of the text they typed** and
**on top of the arrow they would press to retry**. Only the fragment `o…()` survives around it.

### 2.3 Dark, empty — `frames/C-empty-dark.png`

![empty](frames/C-empty-dark.png)

Select-all, Backspace. The field collapses to a ~60 px black square containing one arrow. No
placeholder, no label, no hint, no error. It reads as an unlabelled black button.

### 2.4 Dark, long value — `frames/C-overflow-dark.png`

![overflow](frames/C-overflow-dark.png)

A 46-character `color(display-p3 …)` value. The field has grown to 586 px and the dock now spans
most of a 1440 px viewport. Nothing truncated, nothing ellipsised — the chassis simply inflated.

### 2.5 Mobile — `frames/G-mobile-dock.png`

![mobile](frames/G-mobile-dock.png)

390×844, touch. Home · Picker/About · ⋮. **There is no Tools control and no colour input.**

### 2.6 The hover popover — `frames/H-hover-popover.png`

![popover](frames/H-hover-popover.png)

Hovering the field for 300 ms drops a panel that (a) restates the value already in the field,
(b) restates it again decomposed, (c) carries two `Separator` rules in a four-line panel, (d) sets
its help prose in **Fraunces**, and (e) **occludes the route's own H1 and the Picker's numeric
headline** — the help text covers the protagonist.

---

## 3. Defect register

Severity: **BLOCKER** = ships a broken or absent affordance · **MAJOR** = a designed state is
wrong or missing · **MINOR/INFO** = register drift, dead surface.

---

### D-01 · BLOCKER — the component does not exist below 1024 px, including at 200 % zoom

**Mechanism.** Desktop-only ref capture.

**Evidence chain (source):**

| Coordinate | Content |
|---|---|
| `demo/color-picker/App.vue:310–312` | `const { matches: isDesktop } = useBreakpoint("(min-width: 1024px) and (min-aspect-ratio: 1.1)")` |
| `demo/color-picker/App.vue:77` | mobile pane slot — **no `:on-mount`** |
| `demo/color-picker/App.vue:101–105` | desktop-left pane slot — `:on-mount="onDesktopLeftMount"` |
| `demo/color-picker/App.vue:323–328` | `onDesktopLeftMount` is the **sole writer** of `colorPickerRef` |
| `demo/color-picker/App.vue:38` | `:action-bar="colorPickerRef?.actionBarContext ?? null"` |
| `demo/shell/dock/Dock.vue:41,153` | `hasAnyActionBar` gates the `action-bar` `DockLayer` |
| `demo/shell/dock/layers/ActionBarLayer.vue:115` | `<ColorInput>` lives inside it |

**Evidence (measured, `frames/probe-2.json`):**

```
G-mobile   390×844  touch   →  { "missing": true }   aria-label inventory contains
                                no "Open color input"; dock renders Home / Picker-About / ⋮
J-zoom200  720×450          →  { "opened": {"present": false}, "missing": true }
A-rest    1440×900          →  present, 324.72 × 45.91 px
```

720×450 CSS px is exactly what a 1440×900 display reports at 200 % browser zoom.

**Why it is a design defect, not a layout accident.** `VISUAL-CONSTITUTION.md:32` (§3 law 6):
*"Mobile uses one document-scrolling stage→inspector→action sequence beneath **the same top
dock**."* The same dock — not a dock with the text-entry affordance amputated.
`VISUAL-CONSTITUTION.md:99` (§5): *"every spatial action has a keyboard/numeric equivalent."*
Typing a CSS string **is** the keyboard equivalent of the spectrum canvas and the channel rails;
on mobile the spectrum canvas is the only way in. And the component's own help copy promises the
opposite: *"Any valid CSS color string is accepted."*

WCAG 1.4.4 / 1.4.10: content and functionality must survive to 200 % / 320 px-equivalent reflow.
Here a whole input is lost.

**Reproduction.** `http://localhost:9000/#/` at 390×844 or 720×450 → press every dock control →
no colour input exists. At 1440×900 → Tools → the second toggle → it appears.

**Cure.** The action-bar context must not be a side effect of which pane slot happened to mount.
Lift it to the route table (`usePaneRouter`) so it is breakpoint-independent, and let the dock's
mobile layer host the same field. If the dock genuinely cannot hold it below 1024 px, the field
belongs in the Picker instrument's inspector at all widths — but it may not simply vanish.

---

### D-02 · BLOCKER — `btn-interactive` matches zero CSS rules; the send button has no interaction design at all

**Mechanism.** A retired local recipe was credited to a producer atom that does not exist.

`ColorInput.vue:61–66` and `:327–334` are two long comment blocks asserting that the button's
hover/press legs, focus register and disabled opacity all come from the producer
`btn-interactive` atom:

> "the spatial hover/press legs come from the producer `btn-interactive` atom (scale @
> `--spring-smooth-duration` on `--transition-liquid-spatial`, house press/hover magnitudes +
> focus register) … press/hover magnitudes + focus ring + **disabled opacity** are the house
> registers."

**Evidence (measured, live document, all stylesheets walked):**

```js
// selectors containing "btn-interactive", live at http://localhost:9000/#/
{ "count": 0, "hits": [] }
```

Corroborated statically: `grep -rn "btn-interactive"` returns **no CSS anywhere** — not in
`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, not in `demo/styles/*.css`. glass-ui is 7.0.0.

**Evidence (measured state deltas, `frames/probe-3.json`):**

| state | opacity | scale | transform | background | outline-style | box-shadow | filter |
|---|---|---|---|---|---|---|---|
| rest | 1 | none | `matrix(1,0,0,1,0,-12)` | `rgba(0,0,0,0)` | none | none | none |
| hover | 1 | none | `matrix(1,0,0,1,0,-12)` | `rgba(0,0,0,0)` | none | none | none |
| active (pressed) | 1 | none | `matrix(1,0,0,1,0,-12)` | `rgba(0,0,0,0)` | none | none | none |
| focus | 1 | none | `matrix(1,0,0,1,0,-12)` | `rgba(0,0,0,0)` | none | none | none |

`hoverDelta: false`, `focusRing: false`. Its `transition` computes to `all` — the Tailwind
preflight default, not `--transition-liquid-spatial`.

**Three simultaneous consequences:**

1. **No hover, no press.** The only commit control in the field is inert to the pointer.
2. **No focus indicator.** `outline-style: none` even at `:focus`; no `focus-ring` class (its
   dock siblings all carry `tap-squish focus-ring`). WCAG 2.4.7 fails outright.
3. **No disabled treatment** — see D-03.

**Owner-edict violation.** Edict 6: *"Animations are never deleted, only moved or tokenized."*
`ColorInput.vue:327–334` says the bespoke hover/press recipe was "RETIRED onto the producer
`btn-interactive` atom". It was retired onto nothing. The motion was **deleted**, and a comment
was left describing motion that does not exist. That comment is now the most misleading artefact
in the file: a reader auditing the design would conclude the states are handled.

**Reproduction.** Open the field, hover the arrow, press it, Tab to it — nothing changes at any
step. Confirm with `getComputedStyle` or with the CSSOM walk above.

**Cure.** Either the atom lands in glass-ui and is consumed, or — the KISS answer — the button
stops being a hand-rolled `<button>` and becomes the glass-ui `Button` / `DockControl` its
siblings already are (see D-07).

---

### D-03 · BLOCKER — the error badge occludes the value it describes and the button that would fix it

**Mechanism.** Two absolutely-positioned siblings competing for the same right-hand gutter.

`ColorInput.vue:335–343` `.send-btn { position:absolute; right:0.25rem; top:50% }`
`ColorInput.vue:348–366` `.error-badge { position:absolute; right:0.5rem; top:50% }`

Both render simultaneously in colour mode: the send button is the `v-else` at `:76–82`
(present whenever `!proposeMode`), the badge is `v-if="parseError && !proposeMode"` at `:87`. The
badge is later in DOM order, so it paints on top; `pointer-events:none` keeps the button
*clickable* but not *visible*.

**Evidence (measured, `frames/probe-1.json`, `B-f001-light.afterEnter`):**

```
badgeRect  { x: 682.1, y: 31.4, w: 101,  h: 18.4 }
sendRect   { x: 763.1, y: 28.5, w:  24,  h:  24  }
overlapPx2 367.5        sendAreaPx2 576        →  63.8 % of the button is covered
```

The 101 px badge also covers the whole ~128 px-wide field content — see `frames/B-f001-error.png`,
where the typed `oklch()` survives only as a sliver.

**Canon.** `PROPORTION-AUDIT.md:70` (§5 law 5): *"A small icon/mark is either data, status,
labeled action, drag affordance, focus/selection register or removed."* Two of them cannot occupy
the same 24 px seat. `VISUAL-CONSTITUTION.md:101` (§5): a transient flourish *"never carries the
only truth"* — here the flourish additionally **destroys** the truth beneath it.

**Reproduction.** Desktop ≥1024 px → Tools → colour input → select all → type `oklch()` → Enter.

---

### D-03b · correction to round 1 — the send button has **no** `type` attribute

Round 1's D-3 states the button is `type="submit"`. Measured: `getAttribute("type") === null`;
the IDL `.type` is `"submit"` **by default**, and `closest("form") === null`, so nothing is
submitted. The defect is real but it is *an omission*, not a wrong explicit value — and the
correct framing matters for the cure, because the canon's idiom
(`VISUAL-CONSTITUTION.md:102`, `PROPORTION-AUDIT.md:77`) is the explicit
`<button type="button">` that every other seat in this repo writes
(`demo/palettes/browser/card/CurrentPaletteEditor.vue:75`).

---

### D-04 · BLOCKER — the failed state has no programmatic semantics, and dies after 2 s

**Mechanism.** Error as a decorative pop-in rather than a control state.

**Evidence (measured, `frames/probe-1.json`):**

```
inputAria    { "invalid": null, "describedby": null }
badgeStyles  { "role": null, "ariaLive": null, "id": "", "pointerEvents": "none" }
after2s      { "badge": false, "text": "oklch()", "border": "lab(92 88.8 20 / 0.827)" }
```

So: the field is never `aria-invalid`, is never `aria-describedby` the message, the message has
no `role="alert"` / `aria-live`, and it is not even associated by `id`. A screen-reader user
receives **nothing at all**. Two seconds later
(`demo/color-session/useColorParsing.ts:57` — `setTimeout(… , 2000)`) the badge and the red border
both revert while the invalid text stays in the field.

**Canon.** `VISUAL-CONSTITUTION.md:83` (§4.1): *"Selected, failed, pending, withdrawn and disabled
states are never color-only. Role, accessible name, state/value and associated error/status are
explicit."* This state is colour-only, and not even durable colour.
`PROPORTION-AUDIT.md:52` (PR-08): *"Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE** … Persistent entity status/recovery."*

**Aggravation — glass-ui already ships the fix.**
`node_modules/@mkbabb/glass-ui/dist/forms.d.ts` exports `useUserInvalidAria`, whose own doc
comment reads: *"The `:user-invalid` → `aria-invalid` bridge. Wired on `blur` (capture — show
error on field-exit), `input` (clear error on correction), and `submit`…"*. It binds **form
controls**. A `contenteditable` span is not one, so the choice of `contenteditable` (D-07)
structurally excludes the design system's own validity mechanism.

---

### D-05 · MAJOR — every keystroke resizes the dock (137.3 px of travel), and that makes the mask/ellipsis apparatus dead code · **NEW**

**Mechanism.** An unreserved, content-sized field inside a reserved band.

**Evidence (measured, `frames/probe-3.json` — typing `rebeccapurple` one character at a time):**

```
input width : 61.5 → 72.9 → 84.3 → 95.8 → 107.2 → 118.7 → 130.1 → 141.6 →
              153.0 → 164.5 → 175.9 → 187.4 → 198.8      (span 137.3 px)
dock  width : 179.5 → 190.9 → … → 316.8                  (span 137.3 px, 1:1)
```

The dock pill's width tracks the field's exactly. Select-all-and-retype first **collapses** the
pill to 61.5 px, then inflates it 137 px over thirteen keystrokes. With `text-align: center`
(`ColorInput.vue:16`) the string also re-centres on every frame, so the value slides while it
grows.

**Canon.** `VISUAL-CONSTITUTION.md:30` (§3 law 4): *"The top dock owns a reserved band.
Expanded/collapsed/mounted states do not move the scene below it."*
`VISUAL-CONSTITUTION.md:78` (§4): *"Live numbers use tabular figures and **reserve their widest
legal representation so value changes never reflow the settled chassis**."*

**The second half of this finding is the sharper one.** Because the field grows instead of
clipping, it **never overflows**:

```
C-focus-dark.longValue → { scrollW: 586, clientW: 586, overflowing: false }   // 46 chars
```

Therefore `overflow-hidden`, `text-ellipsis`, `whitespace-nowrap` (`ColorInput.vue:16`), the
`--input-action-width: 2.5rem` mask (`:300–301`) and its `:focus` cancel (`:303–306`) — the most
bespoke, most commented CSS in the file — are **unreachable at every viewport where the component
exists**. They solve a problem that cannot occur, while the problem that does occur (137 px of
dock jitter) is unaddressed. `PROPORTION-AUDIT.md:73` (§5 law 8): *"Real rendered relation wins
over token intent."*

---

### D-06 · MAJOR — the error never fires twice for the same input; the second Enter is answered with silence · **NEW measurement**

**Mechanism.** A memo short-circuit ahead of the try/catch.

`demo/color-session/useColorParsing.ts:62`:

```ts
if (!input || input === previousInvalid) return;
```

`previousInvalid` is set on the failing path (`:85`), so a repeated submission of the same string
returns **before** `flashParseError()` can run.

**Evidence (measured, `scratchpad/DD-probe4.mjs`):**

```
mode              { label: "Enter a CSS color", text: "lab(92% 88.8 20 / 82.7%)" }
submit1_badge     true
badgeGoneAfter2s  true
textAfter2s       "oklch()"
submit2_badge     false      ← second Enter on the identical text
submit2_badge_late false
pageErrors        []
```

**The user journey this produces.** Type an invalid colour → wait 2 s (the debounce,
`useColorParsing.ts:92` — `debounce(parseAndSetColor, 2000)`) → a red slab covers your text for
2 s → it vanishes → you press Enter again to try → **nothing happens, ever.** No error, no
success, no change. The field sits there holding an invalid value.

`VISUAL-CONSTITUTION.md:99` (§5): *"Tuning is continuous and interruptible."* A 2 s dead zone
before any feedback, followed by permanent silence on retry, is neither.

---

### D-07 · MAJOR — a `contenteditable` span where the design system ships `Input`, and the canon forbids a duplicate `contenteditable` path

**Mechanism.** Hand-rolled primitive.

`ColorInput.vue:11–27` is a `<span contenteditable role="textbox">`. Measured attribute
inventory (`frames/probe-1.json`):

```
contenteditable "" (= "true", NOT "plaintext-only")
role "textbox"   aria-multiline null   aria-invalid null   aria-describedby null
spellcheck null  inputmode null  enterkeyhint null  autocapitalize null  autocorrect null
```

**glass-ui 7.0.0 already exports the primitive.**
`node_modules/@mkbabb/glass-ui/dist/components/input/types.d.ts`:

```ts
export interface InputProps {
  autocomplete?; class?; defaultValue?; disabled?; enterkeyhint?; form?;
  inputmode?; invalid?; maxlength?; minlength?; modelValue?; name?;
  pattern?; placeholder?; readonly?; required?; size?; type?;
}
```

Every prop this component is missing — `placeholder`, `invalid`, `disabled`, `enterkeyhint`,
`inputmode`, `pattern` — is in that interface. `./forms` additionally exports `useUserInvalidAria`
(D-04); `./search`, `./labeled-field`, `./button` and `./toast` are all published subpaths.

**Canon, verbatim.** `PROPORTION-AUDIT.md:75` (§5 law 10):

> "Readout and editing are separate jobs. The large Picker headline is read-only output; the
> semantic W21 numeric fields are the only direct channel editors, with commit/cancel/error
> semantics and **no duplicate `contenteditable` path**."

Owner edict 4 (*glass-ui is the design system*) and edict 3 (*KISS, no contrivance*) both land
here: 377 lines of hand-rolled field, with none of the commit/cancel/error semantics the law
requires, standing beside a published `Input`.

---

### D-08 · MAJOR — a bare `contenteditable` admits arbitrary markup; a formatted paste inflates the dock by 44 % · **NEW**

**Mechanism.** `contenteditable="true"` instead of `plaintext-only`, and no `paste` handler.

**Evidence (measured, `frames/probe-1.json` → `D-paste`; frame `frames/D-paste.png`):**

```
innerHTML  '<b style="color:lime;font-size:32px">red</b>'
innerText  'red'
height     66 px     (rest: 45.91 px  →  +20.09 px, +43.8 %)
```

![paste](frames/D-paste.png)

The dock band now carries 32 px lime-green bold text. Real-world reproduction: copy a colour token
out of a styled page, a Figma layer name, or a syntax-highlighted code block — the near-universal
way a user gets a CSS colour string onto their clipboard — and paste.

The component has no `paste` listener, no `plaintext-only`, and its two `innerText` writers
(`:191`, `:265`, `:278`) only repair the damage on blur or on a model change — not on the frame
the paste lands.

---

### D-09 · MAJOR — the Crown reveal animation cannot run: the inline `animation` names a keyframe Vue renamed away · **NEW**

**Mechanism.** Scoped-CSS keyframe renaming vs. an inline `style` attribute.

`ColorInput.vue:33–40` sets the animation **in the template, inline**:

```html
<Crown :key="crownKey" … style="animation: crown-appear var(--duration-panel) var(--ease-decelerate) forwards;" />
```

`ColorInput.vue:369–376` defines `@keyframes crown-appear` **inside `<style scoped>`**.

`@vue/compiler-sfc` renames keyframes in scoped blocks and rewrites `animation`/`animation-name`
declarations **that appear in the same PostCSS root**
(`node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js:8053–8080`:
`keyframes[node.params] = node.params = node.params + "-" + shortId`). An inline `style`
attribute in the template is never seen by PostCSS.

**Evidence (served CSS, fetched from Vite):**

```
GET /@fs/…/demo/shell/dock/ColorInput.vue?vue&type=style&index=0&scoped=55dadc03&lang.css
  → "@keyframes crown-appear-55dadc03 { … }"
```

**Evidence (live CSSOM, `frames/probe-1.json`):**

```
crownKeyframeNames: ["crown-appear-55dadc03"]
```

There is no `crown-appear` in the document. `animation-name: crown-appear` matches nothing, so no
animation runs, `forwards` fills nothing, and the four-stop gold-shimmer choreography (scale 0 →
1.4 → 0.95 → 1, rotate −15° → +5° → −2° → 0, two `drop-shadow` beats) is **entirely dead**. The
`:key="crownKey"` remount machinery in `demo/color-session/useColorNameResolution.ts:64` exists
solely to restart an animation that cannot start.

Contrast `input-mode-flash` (`:313`, `:316`), which *is* declared inside the scoped block and
compiles correctly to `input-mode-flash-55dadc03`. The same file gets it right once and wrong
once.

Owner edict 6 again: the animation was neither moved nor tokenized — it is simply inert.

---

### D-10 · MAJOR — in forced-colors the field has a **zero** focus delta

**Mechanism.** Focus expressed only as an author-coloured border, with `outline` suppressed.

`ColorInput.vue:16` `focus-visible:outline-none`; `:162–166` the only focus register is
`{ borderColor: cssColor.value }`.

**Evidence (measured, `forcedColors: "active"`, `frames/probe-2.json`):**

```
rest     { borderColor: "rgb(0, 0, 0)", outlineStyle: "none", bg: "rgb(255,255,255)" }
focused  { borderColor: "rgb(0, 0, 0)", outlineStyle: "none", boxShadow: "none" }
deltaBorder: false
```

Forced colors overrides the author border to the system colour in **both** states, and the outline
was already removed. There is no focus indicator at all. `frames/I-forced-colors.png` confirms
visually.

The same measurement shows the mask survives forced-colors
(`linear-gradient(to right, rgb(0,0,0) calc(100% - 40px), rgba(0,0,0,0) 100%)`), so in
high-contrast mode the field's ink **and** its system-coloured border still fade out over the last
40 px.

**Canon.** `VISUAL-CONSTITUTION.md:84` (§4.1): *"Focus remains visibly distinct from selection in
both schemes, **forced colors** and reduced transparency."* Measured delta: zero.

*(Round 1's D-1 identified the live-colour focus border as data-dependent and therefore
potentially invisible; this is the same mechanism, measured to a hard zero in the forced-colors
arm, plus the surviving mask.)*

---

### D-11 · MAJOR — the disabled send button is pixel-identical to the enabled one

**Mechanism.** D-02's missing atom, surfacing as a missing state.

`ColorInput.vue:70` `:disabled="!proposedName.trim() || proposing"`; `:344–346` the only disabled
rule in the file is `cursor: not-allowed`.

**Evidence (measured, propose mode, empty field, `frames/probe-2.json` → `K-propose`):**

```
disabled true      btnOpacity "1"      btnRect { w: 24, h: 24 }
btnCursor "not-allowed"
svgStroke 'stroke: oklch(0.471189 0.188448 9.83402);'   ← the same inline accent as enabled
```

Frame `frames/K-propose.png` beside `frames/A-rest-light.png`: identical arrow, identical colour,
identical size. The **only** signal that the primary action is unavailable is a cursor shape —
i.e. hover-only, mouse-only, invisible on touch and to assistive technology (`aria-disabled` is
absent; the native `disabled` attribute at least removes it from the tab order, but nothing is
*shown*).

`VISUAL-CONSTITUTION.md:83`: *"… disabled states are never color-only."* This is not even
colour — it is cursor-only. `PROPORTION-AUDIT.md:51` (PR-07): *"Hover-only/unlabeled controls …
→ ADD-AFFORDANCE / REMOVE."*

Note also the inline `:style="{ stroke: safeAccent }"` (`:74`, `:81`) is a **per-instance override
at the highest non-`!important` specificity**, so it would defeat any producer disabled treatment
even if one existed — owner edict 5 (*style at the root, never per-instance*).

---

### D-12 · MAJOR — the send button is nameless; it is the *entire* `namelessButtons` defect the mega-tranche audit recorded for `/#/`

**Mechanism.** Icon-only control with no accessible name.

**Evidence (measured, live, route `/#/`):**

```js
document.querySelectorAll('button') → 26 total
nameless (no aria-label, no text, no title) → 1:
  <button data-v-55dadc03 class="send-btn btn-interactive"> …ArrowRight svg… </button>
  rect { x: 897.2, y: 28.8, w: 24, h: 24 }
```

`ariaLabel: null`, `title: null`, `textContent: ""`, and the lucide `<svg>` carries no
`aria-hidden` and no `<title>`.

Cross-referenced with `../../visual/REPORT.md:96,103` — `namelessButtons` on
`safari-desktop-light /#/` = **1** and `safari-desktop-dark /#/` = **1**. This button is that
count, in full. (Mobile `/#/` shows 0 — because of D-01.)

**Aggravation.** Both of this component's host files carry comments enforcing the opposite law:
`Dock.vue:140–142` — *"native `title` retired dock-wide — icon-only controls carry aria-label"*;
`ActionBarLayer.vue:126–128` — *"E.W3 Lane A added aria-label so the role/label selectors … can
drive the cycle."* The dock's own law was applied to every control except this one.

At 24×24 it also sits exactly on the WCAG 2.2 target-size floor with no spacing exception — and
**shrinks below it** when it enters the `proposing` state, because the spinner is `w-3.5 h-3.5`
(14 px) against the arrow's `w-4 h-4` (16 px) (`ColorInput.vue:73–74`): a 2 px geometry regression
triggered by a loading state.

---

### D-13 · MAJOR — the type register is off the closed matrix, measured · **NEW measurement**

**Mechanism.** No role token; ambient inheritance.

`VISUAL-CONSTITUTION.md:68–78` (§4) is a **closed** matrix. `PROPORTION-AUDIT.md:78` (§5 law 13)
repeats it: value/code/provenance → `text-mono-small`; control/label → `text-small`, Plus Jakarta
Sans, non-bold; section heading → `text-heading`; prose/help → `text-prose`.

**Evidence (measured, `frames/probe-2.json` → `typeRegister`):**

| element | measured size | measured family | required role |
|---|---|---|---|
| `.color-input` value | **18.608 px** | Fira Code | `text-mono-small` |
| dock Login button (`text-mono-small`) | **16.4 px** | Fira Code | — (reference) |
| dock Tools label (`text-small`) | 16.4 px | Fraunces | — (reference) |

The value renders **+2.208 px (+13.5 %)** larger than every other mono register in the same dock
pill, because `ColorInput.vue:16` applies only the family class `fira-code` and **no size role at
all**. 1.135 is not an adjacent rung on any golden ladder.

Three further breaches, all visible in `frames/H-hover-popover.png`:

- `ColorInput.vue:97` — the popover title uses `text-subheading`, which §4 reserves for **palette
  identity**; a popover section heading is `text-heading`. (The comment at `:95–96` claims a
  "display voice", which is a third role again.)
- `ColorInput.vue:94` — `PopoverContent class="… font-display …"` forces **Fraunces** onto the
  help prose at `:98–100`, which §4 assigns to Plus Jakarta Sans `text-prose`. The screenshot
  shows the serif unambiguously.
- `ColorInput.vue:353` — the error badge uses `@apply text-xs`, a raw Tailwind rung. Confirmed in
  the served CSS: `font-size: var(--text-xs, 0.75rem)`. `text-xs` is not in the matrix.
- `frames/K-propose.png` — the propose placeholder *"propose a name …"*, a prompt for a **human
  name**, renders in Fira Code because it inherits the field's mono family.

---

### D-14 · MAJOR — `text-center` on an asymmetrically padded box: a permanent 12 px optical bias · **NEW measurement**

**Mechanism.** A centring declaration over a 12 px / 36 px padding pair.

`ColorInput.vue:16–18`: `px-3` (12 px) plus `'pr-9': true` (36 px) plus `text-center`.

**Evidence (measured, `frames/probe-1.json`):**

```
paddingLeft  "12px"     paddingRight "36px"
contentBoxCentreX 714.00      borderBoxCentreX 726.00      →  Δ = 12.00 px
```

Because the field is content-sized (D-05), the string always fills its content box exactly, so
`text-align: center` never does anything — the real layout is `12 px | value | 36 px`, a 1:3
asymmetry, and the value sits permanently 12 px left of the pill's own optical centre. The `pr-9`
gutter is bound to nothing: the mask reserves `--input-action-width: 2.5rem` (40 px) and the
button sits at `right: 0.25rem` with a 24 px box (28 px), so **three different numbers — 36, 40,
28 — describe the same action gutter** and none of them derives from the others.

`PROPORTION-AUDIT.md:73` (§5 law 8): *"Real rendered relation wins over token intent … measured
rects and ink gaps appear in DELTA; token presence alone cannot close a row."*

---

### D-15 · MAJOR — the empty state is undesigned, and the placeholder mechanism is defeated by the browser's own `<br>` · **NEW**

**Mechanism.** `:empty` against a contenteditable.

`ColorInput.vue:321–325`:

```css
.color-input:empty[data-placeholder]::before { content: attr(data-placeholder); … }
```

`data-placeholder` is set **only in propose mode** (`:261`) and removed on exit (`:264`), so in
colour mode there is no placeholder at all.

**Evidence (measured, `frames/probe-1.json` → `C-focus-dark.empty`):**

```
text  "\n"      html  "<br>"      dataPlaceholder null      rectH 45.91
badge false
```

Chromium (and every other engine) inserts a `<br>` filler when a contenteditable is emptied by the
user. `:empty` therefore **stops matching after the first type-then-clear cycle**, so even in
propose mode the placeholder never returns. On mount it works (`frames/probe-2.json` →
`K-propose.placeholderShows: '"propose a name..."'`) because `innerText = ""` leaves the node
genuinely empty — so the mechanism works exactly once, in the one situation the user has not yet
interacted.

Meanwhile colour mode's empty state (`frames/C-empty-dark.png`) is a ~60 px black square with one
arrow: no placeholder, no label, no error (`parseAndSetColor` returns early on `!input`,
`useColorParsing.ts:62`), no indication that blur will silently discard whatever you did.

**A state that was never designed is a design defect** — this is three of them (empty, cleared,
blurred-discard) in one control.

---

### D-16 · MAJOR — real information and the only help are gated behind hover

**Mechanism.** `trigger="hover"` on the field wrapper.

`ColorInput.vue:3–8`: `<Popover trigger="hover" :close-delay="0" :open-delay="300">` wrapping the
entire field. Its content (`:94–110`) is the *only* place the app explains what the field accepts,
the *only* place the serialized colour appears in canonical form, and the *only* mount of
`<ParseEchoReadout />` — the E4/Q10 Parse-Lab AST + gamut verdict.

**Evidence (measured, `frames/probe-2.json` → `hoverPopover`):**

```
count 2
texts[1] "Enter a colorAny valid CSS color string is accepted. lab(92% 88.8 20 / 82.7%)
          lab l 92% a 88.8 b 20 α 0.827 outside srgb gamut"
```

There is **no click, focus or keyboard path** to it. Combined with D-01 (no component below
1024 px), the Parse-Lab echo is reachable only by a mouse on a ≥1024 px landscape viewport.

`PROPORTION-AUDIT.md:51` (PR-07): *"Hover-only/unlabeled controls and invisible drag state →
ADD-AFFORDANCE / REMOVE."*

**And it is redundant while it is doing this.** `frames/H-hover-popover.png` shows the value four
times on one screen: in the field, in the popover's mono line, decomposed in the echo, and in the
Picker's own headline behind it. It carries **two `Separator` rules in a four-line panel**
(`:101`, `:108`) — `PROPORTION-AUDIT.md:49` (PR-05, **REMOVE**): *"Dividers … repeat a boundary"*;
§5 law 4: *"A divider is retained only when grouping would be ambiguous without it."* And the
panel **occludes the route H1 and the Picker headline** — the help covering the protagonist,
against `PROPORTION-AUDIT.md:71` (§5 law 6): *"Subtraction precedes explanation."*

The component also stacks a second disclosure species on the same 45 px control: the Crown
`Tooltip` (`:30–59`). Two hover-disclosure mechanisms on one field is the "tooltip proliferation"
the same law names.

---

### D-17 · MAJOR — propose-mode failure and success are both silent, and the "signal parent" comment is false · **NEW**

**Mechanism.** Network operation with no operation state.

`ColorInput.vue:230–247`:

```ts
await session.ensureSession();                       // silently mints an account
await proposeColorName(…);
proposedName.value = "";
// Signal parent to exit propose mode
if (inputColorRef.value) inputColorRef.value.innerText = formattedCurrentColor.value;
} catch (e: any) {
    console.warn("[ColorInput] Failed to propose name:", e?.message);
}
```

- **Failure** produces a `console.warn` and nothing else. No badge, no toast, no state. glass-ui
  exports `./toast`.
- **Success** produces… the same visible outcome: the field's text changes and nothing else. There
  is **no toast, no crown, no confirmation**.
- The comment *"Signal parent to exit propose mode"* describes an emit that does not exist: this
  SFC has **no `defineEmits` at all**. After a successful proposal the user remains in propose
  mode, `aria-label` still reads *"Propose a color name"*, while the field now displays a colour
  string. Mode and content disagree.
- The `catch (e: any)` also re-introduces `any` into a `strict` tree.

`VISUAL-CONSTITUTION.md:101` (§5): *"Persistent operation state stays with the entity/workspace."*
`PALETTE-CONTRACT.md:172` states the same principle for the sibling export path in absolute terms:
*"a visible terminal/retryable operation state — never a partial download or `console.warn`-only
result."* This is literally the `console.warn`-only result.

Mode entry is equally thin: the only signal that the field has switched from *"enter a colour"* to
*"propose a public, moderated colour name"* is a 300 ms `scaleX(0.97)` flash and a placeholder that
disappears on the first keystroke (and never returns — D-15). Same plate, same arrow, same font.

---

### D-18 · MINOR — direction is physical throughout; no LTR isolation for LTR-only syntax

**Mechanism.** `right` / `to right` / `pr-*` instead of logical properties.

**Evidence (measured, `dir="rtl"`, `frames/probe-1.json` → `E-rtl`; frame `frames/E-rtl.png`):**

```
computed direction "rtl"
paddingLeft  "12px"     paddingRight "36px"          ← unchanged
maskImage    "linear-gradient(to right, …)"          ← unchanged
sendRect.x   848.4  (input 551.6 … 876.3)            ← still physical right
sendOnInlineStartSide false
```

The dock chrome mirrors correctly (Back moves to the right in `frames/E-rtl.png`) while the
field's action gutter, fade mask and button stay pinned to the physical right — so the reserved
gutter no longer sits at the inline end of its own container's flow.

Separately: the field inherits `direction: rtl` while holding an LTR-only CSS grammar, with no
`dir="ltr"` and no `unicode-bidi: isolate`. `VISUAL-CONSTITUTION.md:154` (§6.1) is explicit:
*"CSS strings, hex, slugs, IDs and provenance | render in **LTR-isolated spans** inside RTL
prose."* Neutrals (`(` `)` `%` `/`) in a typed value are bidi-reorderable under an RTL paragraph
direction.

---

### D-19 · MINOR — an opaque plate is a second material tier inside the dock's glass · **NEW**

`ColorInput.vue:16` — `border … bg-background rounded-input`. Measured
`backgroundColor: rgb(251, 250, 248)` (fully opaque), `borderColor: rgb(198, 180, 159)`
(`--input`), inside the dock's translucent glass pill, beside siblings that are all
`glass-specular-track glass-capsule-hover`.

`VISUAL-CONSTITUTION.md:19`: *"One surface has one tier. An inner card is not automatically another
pane of glass. Glass earns its blur by revealing live content; otherwise it is a neutral well."*
The dock is Structural glass; this is an unlabelled fourth tier improvised inside it.
`VISUAL-CONSTITUTION.md:178` (§7 Shell/dock): *"The dock is its own top band, fully visible,
focusable, and **clipped by neither mask nor card**."* The `mask-image` at `:300` is exactly the
prohibited mask, applied inside the dock band.

---

### D-20 · MINOR — the mode-flash JS timer is desynchronised from the token it mirrors · **NEW**

`ColorInput.vue:313` — `animation: input-mode-flash var(--duration-slow) …`
`ColorInput.vue:256` — `setTimeout(() => { modeTransition.value = false; }, 300);`

Measured live: `--duration-slow: 0.45s` (450 ms). The class is stripped at **300 ms of a 450 ms
animation — 66.7 % through** — so the element snaps from an eased mid-state (≈ `scaleX(0.998)`,
`opacity ≈ 0.972` under `cubic-bezier(0,0,0.2,1)`) to its rest state. A hard-coded magic number
standing in for the token it is supposed to mirror; owner edict 6 (*tokenized*).

The same ad-hoc pattern is one file away — `ActionBarLayer.vue:62` `SUB_LAYER_CROSSFADE_MS = 260`
— which is what the field's own enter/exit rides.

---

### D-21 · MINOR — dead surface: a dead prop, two dead injections, a five-member `defineExpose` with zero consumers, and a third Copy path

| Coordinate | Dead thing | Proof |
|---|---|---|
| `ColorInput.vue:139` | prop `editTarget` declared, never referenced | only occurrence in the file is the declaration |
| `ColorInput.vue:134` | `import type { EditTarget }` exists only to type that dead prop | — |
| `ColorInput.vue:146` | injection `cssColorOpaque`, never used | — |
| `ColorInput.vue:150` | injection `canProposeName`, never used | — |
| `ColorInput.vue:282–288` | `defineExpose({ focus, inputIsFocused, copyAndSetInputColor, onSubmitColor, submitProposedName })` | `ActionBarLayer.vue:28` declares `colorInputRef` and **never dereferences it**; repo-wide grep across `demo/ e2e/ test/` finds no consumer of any member |
| `ColorInput.vue:219–223` | `copyAndSetInputColor` — a **third** Copy implementation | `PROPORTION-AUDIT.md:57` (**PR-13, REMOVE**): *"Picker specimen and action region both host Copy … total 2→1"*; `ActionToolbar` already owns `@copy` (`ActionBarLayer.vue:110`) |
| `ColorInput.vue:117` | `import { writeClipboard } from "@mkbabb/glass-ui"` | used only by that dead Copy path |

---

### D-22 · INFO — a `demo/ui/` alias layer creates a dual import path inside one import block

`ColorInput.vue:117` imports directly from `@mkbabb/glass-ui`; `:118–129` import `Popover`,
`Tooltip*` and `Separator` from `../../ui/popover|tooltip|separator`. Those three files are
one-line re-export barrels:

```ts
// demo/ui/popover/index.ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
```

Owner edict 2: *"No legacy code — no aliases, migration shims, dual paths."* Both paths appear in
the same import block; the sibling `ActionBarLayer.vue:8` imports `@mkbabb/glass-ui/dock` directly.

---

### D-23 · INFO — the bare `catch` that swallows MT-F001 is a masking fallback

The task asks what this component does with MT-F001. **It swallows it.**

`src/css/grammar.ts:181` — `splitTopLevel(slash[0]!.replace(/,/g, " "), "space")` — the non-null
assertion is false for an empty function body, so `parseCssColor("oklch()")` throws `TypeError`.
`demo/color-session/useColorParsing.ts:84` catches it with a bare `catch {}` and calls
`flashParseError()`.

**Measured, live (`scratchpad/DD-probe4.mjs`):** `pageErrors: []`, no console error, badge reads
*"not a valid color"*. **No crash.** The user sees D-03's slab.

The design defect is the **undiscriminating catch**: one bare handler renders "the grammar
rejected your string", "the parser threw a TypeError", and any future `RangeError` as the same
sentence. The application can therefore never surface, count or report MT-F001 — a shipping parser
crash is permanently indistinguishable from a typo. Owner edict 2 forbids *masking fallbacks*;
this is one, and it is why a live `TypeError` in the shipping parser has been invisible.

(That the eight MT-F001 inputs are *also* invalid CSS is a coincidence that makes the wrong
message accidentally true today. It does not make the design sound.)

---

## 4. State coverage table

Enumerating every state the challenge names.

| State | Handled? | Evidence |
|---|---|---|
| **empty** (colour mode) | **NO** — no placeholder, no label; renders as a black square | D-15, `frames/C-empty-dark.png` |
| **empty after clear** (propose) | **NO** — `:empty` defeated by `<br>` | D-15, `html: "<br>"` |
| **loading** (`proposing`) | **PARTIAL** — spinner swaps in but shrinks the 24 px target to 22 px | D-12, `:73–74` |
| **populated** | yes, but reflows the dock per keystroke | D-05 |
| **error** | **NO** — occludes value + button, no ARIA, dies in 2 s, never repeats | D-03, D-04, D-06 |
| **disabled** | **NO** — pixel-identical to enabled; cursor-only | D-11 |
| **focused** (field) | **PARTIAL** — data-dependent colour border, no outline | D-10 |
| **focused** (send button) | **NO** — `outline-style: none` at `:focus` | D-02 |
| **hovered** (send button) | **NO** — zero computed delta | D-02 |
| **active / pressed** | **NO** — zero computed delta | D-02 |
| **selected** | n/a | — |
| **dragging** | n/a | — |
| **overflowing** | **UNREACHABLE** — the field grows instead; mask + ellipsis are dead code | D-05 |
| **truncated** | **UNREACHABLE** — same | D-05 |
| **rich-text pasted** | **NO** — markup persists, dock +43.8 % tall | D-08 |
| **RTL** | **NO** — physical gutter/mask/button; no LTR isolation | D-18 |
| **reduced-motion** | **YES** (by the global guard, `demo/styles/animations.css:184–193`) — not by this component | §5 |
| **forced-colors** | **NO** — zero focus delta; mask survives | D-10 |
| **200 % zoom** | **NO** — the component ceases to exist | D-01 |
| **mobile / portrait** | **NO** — the component ceases to exist | D-01 |
| **propose success** | **NO** — no confirmation, no mode exit | D-17 |
| **propose failure** | **NO** — `console.warn` only | D-17 |

**Nine states are unhandled; three are unreachable; two do not exist because the component does
not.**

---

## 5. Motion audit

| Animation | Tokenized? | PRM? | Layout-safe? | Runs? |
|---|---|---|---|---|
| `input-mode-flash` (`:312–319`) | duration `--duration-slow` ✓ / **removal timer hard-coded 300 ms ✗** (D-20) | yes — global guard | `transform` + `opacity` ✓ | yes |
| `crown-appear` (`:369–376`) | `--duration-panel`, `--ease-decelerate` ✓ | moot | `transform` + `filter` ✓ | **NO — dead name** (D-09) |
| `vj-celebrate` on the badge (`:86`) | house family, geometry vars at `:364–365` ✓ | yes — global guard | ✓ | yes |
| Crown `transition-[opacity,transform]` (`:35`) | **no duration/easing class** → Tailwind default `--default-transition-duration` | yes | ✓ | yes |
| `.color-input` border/box-shadow transition (`:296–298`) | `--duration-fast`, `--ease-standard` ✓ | yes | ✓ | yes |
| send button | **`transition: all`** — the preflight default, no house register (D-02) | — | — | nothing to run |
| the field's own enter/exit | `ActionBarLayer.vue:62` `SUB_LAYER_CROSSFADE_MS = 260`, a JS magic number | timer runs regardless | ✓ | yes |

`prefers-reduced-motion` is satisfied **only** by the blanket guard at
`demo/styles/animations.css:184–193` (`animation-duration: 0.01ms !important`). The component
declares no PRM handling of its own, and its two JS timers (300 ms, 260 ms) ignore the query — a
reduced-motion user still waits out both.

No animated property forces layout. **But** the un-animated layout does: D-05's per-keystroke width
change is a synchronous reflow of the dock on every input event.

---

## 6. Design-system boundary

| What it hand-rolls | What glass-ui 7.0.0 ships | Proof |
|---|---|---|
| `<span contenteditable role="textbox">` | `Input` with `placeholder`, `invalid`, `disabled`, `enterkeyhint`, `inputmode`, `pattern`, `readonly`, `size` | `dist/components/input/types.d.ts` |
| nothing — no `aria-invalid` at all | `useUserInvalidAria` — the `:user-invalid` → `aria-invalid` bridge | `dist/forms.d.ts`, `dist/composables/dom/useUserInvalidAria.d.ts` |
| `<button class="send-btn btn-interactive">` with no name, type, states | `./button`, and `DockControl` — used by every sibling in this dock | `ActionBarLayer.vue:129`, `Dock.vue:143` |
| `console.warn` on failure | `./toast` | package exports |
| `.error-badge` | — (the invalid state belongs on the control) | — |
| `btn-interactive` | **nothing — the class does not exist** | D-02 |

Also present: three inline `style` bindings (`:37–39`, `:74`, `:81`) — per-instance overrides at
maximal specificity, against owner edict 5; and the `demo/ui/*` alias dual path (D-22).

---

## 7. Proportion and seat law

| Law | Coordinate | Verdict |
|---|---|---|
| **PR-07** hover-only / unlabeled controls | `PROPORTION-AUDIT.md:51` | **FAIL** ×3 — nameless send (D-12), hover-only popover (D-16), cursor-only disabled (D-11) |
| **PR-08** transient-only failure truth | `:52` | **FAIL** — 2 s badge (D-04), `console.warn` propose (D-17) |
| **PR-13** Copy total 2→1 | `:57` | **FAIL** — a third Copy path survives (D-21) |
| **PR-05** repeated dividers → REMOVE | `:49` | **FAIL** — 2 `Separator`s in a 4-line popover (D-16) |
| **§5 law 5** every small mark is data/status/labeled-action or removed | `:70` | **FAIL** — badge and button share one seat (D-03) |
| **§5 law 6** subtraction precedes explanation | `:71` | **FAIL** — value stated 4× (D-16) |
| **§5 law 7** glyph size ≠ target size ≠ reservation | `:72` | **FAIL** — 24 px target *is* the glyph box, and shrinks to 22 px when loading (D-12) |
| **§5 law 8** real rendered relation wins | `:73` | **FAIL** — 12 px optical bias, three conflicting gutter numbers (D-14) |
| **§5 law 10** no duplicate `contenteditable` path | `:75` | **FAIL** — this component *is* it (D-07) |
| **§5 law 13** closed type matrix | `:78` | **FAIL** ×4 (D-13) |
| **§3 law 4** the dock band does not move | `VISUAL-CONSTITUTION.md:30` | **FAIL** — 137.3 px per word typed (D-05) |
| **§3 law 6** the same dock on mobile | `:32` | **FAIL** — the affordance is absent (D-01) |
| **§4** widest-representation reservation | `:78` | **FAIL** (D-05) |
| **§4.1** failed/disabled never colour-only | `:83` | **FAIL** (D-04, D-11) |
| **§4.1** focus distinct in forced colors | `:84` | **FAIL** — measured zero delta (D-10) |
| **§6.1** LTR-isolated CSS strings | `:154` | **FAIL** (D-18) |
| **§7** the dock is *"clipped by neither mask nor card"* | `:178` | **FAIL** — `mask-image` inside the band (D-19) |
| **§2** one surface, one tier | `:19` | **FAIL** — opaque plate in structural glass (D-19) |

---

## 8. What is genuinely sound

Stated so the register is honest:

- **`useTemplateRef`** (`:159`) and **reactive props destructure** (`:138`) — correct Vue 3.5
  idiom (owner edict 7).
- **`verbatimModuleSyntax`** — the two type-only imports (`:134` `EditTarget`, and the `type`
  imports in the host) are correctly `import type` (owner edict 8). No violation found.
- **No crash from MT-F001** — measured `pageErrors: []`. The swallow is a defect (D-23) but the
  app does not white-screen.
- **`reduced-motion` is honoured** — by the global guard, not by this file, but honoured.
- **Error-badge contrast passes** — `rgb(251,250,248)` on `rgb(219,36,36)` computes to **4.70:1**
  at 12 px; WCAG AA (4.5:1) passes. Measured, not assumed.
- **`input-mode-flash`** is correctly scoped and correctly renamed by the SFC compiler — the file
  gets the keyframe idiom right once (which is precisely why D-09 is a defect and not a framework
  limitation).
- The **U9 blur snap-back** (`:183–193`) does what its comment says: measured
  `afterBlur.text === "lab(92% 88.8 20 / 82.7%)"` after clearing the field. It is a *symptom* of
  the two-source-of-truth design, but it is not itself broken.

---

## 9. The gestalt cure

Patching twenty-three findings would produce a 500-line file with the same shape. The
architectural transposition is one move in three parts:

**1. Delete the `contenteditable` and consume the design system's field.**

```
<GlassInput
  v-model="draft"
  type="text"
  :invalid="parseError"
  :placeholder="proposeMode ? 'propose a name…' : 'e.g. oklch(70% 0.15 200)'"
  :aria-describedby="parseError ? errorId : undefined"
  enterkeyhint="go"
  inputmode="text"
  spellcheck="false"
  size="sm"
/>
```

That single substitution kills **D-04, D-07, D-08, D-11 (half), D-13 (the value arm), D-15,
D-19** and makes `useUserInvalidAria` usable. `<input>` cannot hold markup, has a real
placeholder, has a real disabled/invalid register, and is what `useUserInvalidAria` binds to.

**2. Move the commit action out of the text box.** The arrow is a `DockControl` sibling of the
field — named, focus-ringed, 40 px, in the dock's own control grammar — not an absolutely
positioned overlay competing with an error slab for the same 24 px of gutter. That kills **D-02,
D-03, D-03b, D-12, D-14** and retires `pr-9`, `--input-action-width`, the mask, `text-center`,
`text-ellipsis` and `whitespace-nowrap` in one cut (**D-05**'s dead half).

**3. Give the field a reserved inline size and a durable state.** `inline-size:
var(--dock-color-field-size)` sized to the widest legal serialization (`color(display-p3 …)`),
`font-variant-numeric: tabular-nums` — the band stops moving (**D-05**). The parse verdict becomes
a **persistent** control state (`aria-invalid` + one inline message below the dock, cleared on
correction, not on a timer), and the propose operation gets a real outcome through
`@mkbabb/glass-ui/toast` (**D-06, D-17**).

**Then split the component.** The 377 lines are five jobs — CSS-colour editing, colour-name
proposal (with session bootstrap and a network write), the Crown attribution tooltip, the help +
Parse-Lab popover, and a dead Copy path — forked by **twelve `proposeMode` branch sites**
(`:15, 19, 30, 68, 87, 94, 163, 190, 196, 205, 252, 271`). Owner edict 1 (*no god modules*): a
`DockColorField` and a `DockProposeNameField` are two small components that share nothing but a
seat; the Crown belongs with `useColorNameResolution`; the Parse-Lab echo belongs in the Picker
inspector where it is reachable without a mouse (**D-16**).

**Finally, unmount the breakpoint gate.** The action-bar context must come from the route table,
not from whichever pane slot the media query happened to mount (**D-01**). Until that changes,
every other fix here ships to desktop-landscape users only.

---

## 10. Frames

| File | What it shows |
|---|---|
| `frames/A-rest-light.png` | rest, desktop light — the opaque plate, the fading right edge, the nameless arrow |
| `frames/B-f001-error.png` | MT-F001 — the badge over the value and over the arrow |
| `frames/B-f001-after2s.png` | 2 s later — the badge gone, the invalid text still there |
| `frames/C-focus-dark.png` | focus, dark — the live-colour border, outline suppressed |
| `frames/C-overflow-dark.png` | a 46-char value — the dock inflated to 586 px, nothing truncated |
| `frames/C-empty-dark.png` | the empty state — a black square with one arrow |
| `frames/D-paste.png` | a formatted paste — lime 32 px text, dock +43.8 % tall |
| `frames/E-rtl.png` | RTL — chrome mirrors, the field's gutter and mask do not |
| `frames/G-mobile-dock.png` | 390×844 — the component does not exist |
| `frames/H-hover-popover.png` | the hover popover — 4× redundancy, 2 dividers, Fraunces prose, H1 occluded |
| `frames/I-forced-colors.png` | forced colors — zero focus delta |
| `frames/K-propose.png` | propose mode — the disabled arrow, indistinguishable from enabled |
| `frames/probe-1.json` · `probe-2.json` · `probe-3.json` | raw measurements |

Round-1 report preserved at `challenge-D-design.round1.md`.
