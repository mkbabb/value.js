# CHALLENGE-D — `demo/shell/dock/ColorInput.vue` is designed wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier explicitly
declared at spawn. The seat is declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Fifteen defects, one BLOCKER.

The component's premise is wrong before any pixel is: it hand-rolls a text field out of a
`contenteditable` `<span>` when `@mkbabb/glass-ui@7.0.0` ships an `Input` primitive that
`demo/ui/input/index.ts` **already re-exports into this very tree**. Every one of the
findings below is downstream of that one decision — the missing focus register, the missing
invalid semantics, the broken placeholder, the markup-accepting value, the absent
`inputmode`/`enterkeyhint`/`maxlength`, the bolted-on absolutely-positioned error badge that
occludes the field it describes. The component then compounds it by using the app's
**certified contrast-safe** colour for an ornament and the **raw alpha-bearing** colour for
the focus indicator.

**Strongest defect: D-1.** The only focus indicator on the app's primary text-entry control
is `border-color: <the user's currently-selected colour, alpha included>`, with the UA
outline explicitly suppressed. Measured contrast against the field's own background for
reachable user colours: **1.00:1**. WCAG 2.2 SC 1.4.11 floor is 3:1. In forced-colors the
element matches none of the app's own focus-restoration roster, so there is no fallback
either. A user who picks white, or drags alpha to 0, has no focus indicator at all.

---

## 1. Method and evidence base

| Source | What it gave |
|---|---|
| `demo/shell/dock/ColorInput.vue` (377 lines) | source of record |
| `demo/color-session/useColorParsing.ts` | the parse/error state machine behind it |
| `docs/tranches/V/megatranche/audit/visual/REPORT.md` | 60-capture Safari matrix |
| `.../visual/shots/safari-{desktop,mobile}-{light,dark}/picker.png` | read as images |
| live app at `http://localhost:9000` (Chromium, 1440×900 and 390×844) | all measured numbers below |
| `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md` | the binding law |
| `docs/tranches/V/PALETTE-CONTRACT.md` | read; see §7 — it does **not** govern this component |
| frames captured this session | `frames/A-focused.png`, `frames/B-error-badge-over-send.png` |

Browser probes were run read-only. The browser is shared with another session; two
navigations mid-probe were not mine, and no measurement below depends on a frame I could
not re-derive.

---

## 2. Visual truth first

### 2.1 The component does not appear in a single one of the 60 audit captures

`safari-desktop-light/picker.png` and `safari-desktop-dark/picker.png` show the settled
dock as `Home ⌄ │ Tools → │ Login │ @mbabb`. `safari-mobile-dark/picker.png` shows
`⌂ ⌄ │ Picker · About │ ⋮`. **No colour input in any of them.** At rest the component sits
in the DOM behind `visibility: hidden` inside an `[inert]`, `aria-hidden="true"`
`.dock-face` (ancestor chain measured live).

That is a design statement: the affordance whose own help popover advertises
*"**Any** valid CSS color string is accepted"* (ColorInput.vue:97–100) is reachable only
after **two** disclosure steps — expand the dock face, then cycle `actions → input`
(`ActionBarLayer.vue:33-45`).

VISUAL-CONSTITUTION §7 *Shell, dock, and header*: "The dock is its own top band, **fully
visible**, focusable, and clipped by neither mask nor card." This control is neither visible
nor unclipped (it is clipped by its own `mask-image`, D-8).

### 2.2 It does not exist at all on mobile

```
1440×900 → document.querySelector('.color-input')  →  present
 390×844 → document.querySelector('.color-input')  →  null
```

Independently corroborated by the audit's own report: `REPORT.md` §namelessButtons lists
`safari-desktop-light /#/: 1` and `safari-desktop-dark /#/: 1`, but **no `/#/` row for
either mobile matrix**. That single nameless button is this component's send button (§3,
D-3); its absence from the mobile rows is a second, independent proof that the whole
component is desktop-only.

So the product's only free-text CSS-colour entry — the thing that makes this a *colour
laboratory* rather than a swatch picker — is unavailable on phones. There is no mobile
equivalent. This is not a responsive adaptation; it is an amputation.

### 2.3 Optical judgement of the frame that does exist

`frames/A-focused.png` (dock, focused, live capture):

- The field is a **4 px-radius rectangle** (`--radius-input: var(--radius)` → measured
  `border-radius: 4px`) seated inside a `shape-pill` glass dock whose every sibling is a
  capsule. Two incompatible corner languages, 6 px apart.
- The field paints `background-color: rgb(251,250,248)` — an **opaque cream slab** — across
  447 px of a ~448 px dock face. VISUAL-CONSTITUTION §2 assigns the dock to *Structural
  glass* ("neutral Clear-Ice/Smoke family; real glass-ui resting/floating tiers") and
  reserves the *Specimen well* opaque tier for "image, curve, palette or code artifact".
  A full-width opaque plate inside the glass band annihilates the glass on the one route
  where the dock is the product's signature chrome.
- Measured height **45.91 px** against sibling controls at 40 / 32 / 28 px. The field is the
  tallest object in the band and therefore sets the band height. It is not the protagonist
  of the dock; it is the largest thing in it.
- The border in the focused frame is a pale pink on a pale pink ambient ground — see D-1 for
  the measured consequence.

---

## 3. Defect register

### D-1 · BLOCKER — the focus indicator is the user's own colour, and can be invisible

**Evidence.** `ColorInput.vue:16` applies `focus-visible:outline-none`. `:162-166`:

```ts
const inputStyle = computed(() => {
    if (!proposeMode && parseError.value) return { borderColor: "var(--destructive)" };
    if (inputIsFocused.value) return { borderColor: cssColor.value };
    return undefined;
});
```

Live, after a real mouse click on the field:

```
focused: true
outline: "none 1px rgb(0, 95, 204)"          ← UA ring suppressed
inlineStyle: "border-color: lab(92 88.8 20 / 0.827);"
```

Measured contrast of that border against the field's own measured background
`rgb(251,250,248)`:

| user colour (all reachable in-product) | resolved border | contrast |
|---|---|---|
| `#fbfaf8` | `rgb(251,250,248)` | **1.00** |
| `rgb(255 255 255)` | `rgb(255,255,255)` | **1.04** |
| `oklch(0.7 0.1 200 / 0)` | alpha 0 | **invisible** |

Three compounding failures in one mechanism:

1. **No floor.** WCAG 2.2 SC 1.4.11 requires ≥ 3:1 for a focus indicator. This one is
   user-data-driven with no floor.
2. **Alpha passes through.** The component injects **both** `cssColor` and `cssColorOpaque`
   (`:145-147`) and binds the *alpha-bearing* one to the focus border. The alpha slider is a
   first-class control one pane away (`aria-label="alpha channel"`, live).
3. **No forced-colors fallback.** `foundation.css:702-720` restores a real
   `outline: 2px solid Highlight` in WHCM for a roster of selectors. Measured membership:

   ```
   colorInput.matches(roster) → false        colorInput attrs: [data-v-…, contenteditable, role, aria-label, class]
   sendBtn.matches(roster)    → true
   ```

   `role="textbox"` and `[contenteditable]` are not in the roster, and the element carries
   no `tabindex` attribute, so `[tabindex]:not([tabindex="-1"])` misses too.
4. **Error erases focus.** When focused *and* in error, the measured inline style is
   `border-color: var(--destructive)` — the error branch returns first, so the focus
   register is destroyed by the error register. VISUAL-CONSTITUTION §4.1: "Focus remains
   visibly distinct from selection in both schemes, forced colors and reduced transparency."

The bitter part: `SAFE_ACCENT_KEY` — the app's *certified* contrast-safe accent, computed
against the resting-plate rung from `cssColorOpaque` precisely so alpha cannot destroy it
(`useContrastSafeColor.ts:273-292`) — is injected at `:157` and spent on the **arrow
glyph's stroke** (`:74`, `:81`). The contrast-guaranteed primitive decorates an ornament
while the accessibility-critical state takes the raw value.

**Reproduction.** `http://localhost:9000/#/` at ≥1440 px → hover dock → *Tools* →
*Open color input* → drag the α slider to 0 → click the field. Focus is undetectable.

**Cure.** Delete `focus-visible:outline-none` and the focus branch of `inputStyle`. Focus
comes from the house register (`demo/styles/focus-ring.css`, the `.focus-ring` class four
sibling dock controls already carry — measured `siblingButtonsUsingFocusRing: 4`,
`colorInput.usesFocusRing: false`). The live colour, if it must appear on this control at
all, appears as a *swatch*, never as the focus boundary.

---

### D-2 · MAJOR — `.btn-interactive` does not exist; the send button has no interaction design at all

**Evidence.**

```
$ grep -ro 'btn-interactive' node_modules/@mkbabb/glass-ui/dist/ | wc -l
0
$ node -e "…" → installed glass-ui: 7.0.0
```

Not in glass-ui's dist. Not in `demo/**/*.css`. It appears only inside template class
strings and prose. Live computed style on the rendered button:

```
transitionProperty: "all"   transitionDuration: "0s"   scale: "none"
```

`ColorInput.vue:61-66` and `:327-334` carry ~15 lines of comment asserting that the hover /
press / focus / disabled legs "come from the producer `btn-interactive` atom … the scale
longhand rides `--transition-liquid-spatial` @ `--spring-smooth-duration`, press/hover
magnitudes + focus ring + disabled opacity are the house registers."
`demo/DESIGN.md:247` records that row as **`landed`**.

Nothing landed. The T.W5-R5 change deleted a working bespoke recipe and replaced it with a
class name that resolves to no rule. Net result on the component's **only action control**:

- **hover** — unstyled
- **pressed/active** — unstyled
- **focus** — unstyled (and it is a `<button>`, so it *is* keyboard-reachable — it simply
  shows nothing when it gets there)
- **disabled** — unstyled. `.send-btn:disabled { cursor: not-allowed; }` (`:344-346`) is the
  entire treatment. The propose-mode send button at `:70` is `:disabled` whenever the name
  is empty or a submit is in flight, and it renders **pixel-identical to its enabled self**.
  VISUAL-CONSTITUTION §4.1: "Selected, failed, pending, withdrawn and **disabled** states are
  never color-only." Here it is not even colour — it is nothing.

**Reproduction.** Open propose mode with an empty field; the arrow button is visually
enabled and does nothing on click.

**Cure.** Consume a real glass-ui atom (`tap-squish` + `focus-ring`, which the Login/@mbabb
dock buttons measurably use), or better — delete the hand-rolled button and take the trailing
action slot of the glass-ui field. Then correct `DESIGN.md:247`, which is currently a false
record.

---

### D-3 · MAJOR — the send button is nameless, 24 px, and `type="submit"`

**Evidence.** Live enumeration of all 26 buttons on `/#/`: every dock control carries an
`aria-label` (`Reset color`, `Copy color`, `Random color`, `Palettes`, `Extract palette`,
`Toggle action bar`, …) **except one**:

```
{ txt: "", aria: null, cls: "send-btn btn-interactive", r: { w: 24, h: 24 } }
type: "submit"   accessibleTextLen: 0
```

This is exactly the `namelessButtons: 1` that `REPORT.md:96` and `:103` record for
`safari-desktop-{light,dark} /#/`. Both `<button>` branches (`:67-75`, `:76-82`) contain
only an icon. The `Loader2`/`ArrowRight` swap at `:73-74` also means the **in-flight**
state has no accessible name and no announcement.

24 × 24 CSS px is below every tap-target floor and contributes to `REPORT.md`'s
`smallTapTargets: 8` on this route. PROPORTION-AUDIT §5 law 7 separates glyph size from
operable target size — here they are the same 24 px.

`type` defaults to `"submit"`. There is no ancestor form today, so nothing breaks *yet*;
it is a latent defect and it violates the constitution's repeated "one native named
`<button type="button">`" idiom (§3.1, §5).

**Cure.** `aria-label` per branch (`"Apply color"` / `"Submit name"`), `type="button"`,
`aria-busy` on the in-flight branch, and an invisible ≥44 px hit area over the 24 px glyph
(PROPORTION-AUDIT PR-12's exact prescription: "Invisible/seat geometry preserves target
floor while optics follow rung").

---

### D-4 · MAJOR — the error affordance has zero semantics and occludes the field it describes

**Evidence, measured with the badge live on screen** (`frames/B-error-badge-over-send.png`):

```
badge:  left 682.1  right 783.1  width 101.0
send:   left 763.1  right 787.1  width  24.0
overlap: 20.0 px   →  83 % of the send button is covered
input width 153.0  →  badge covers 66 % of the entire field
```

Read the frame: the field shows a red border and a red pill reading *"not a valid color"*
sitting on top of both the send arrow **and the user's own typed text**. The one control
that would let the user retry, and the text they need to correct, are both hidden by the
message telling them to correct it.

Both are absolutely positioned against the same edge — `.send-btn { right: 0.25rem }`
(`:337`), `.error-badge { right: 0.5rem }` (`:350`) — with no z-order, no layout
relationship, and no mutual exclusion. The badge is later in DOM order, so it always wins.

Programmatic semantics, measured on the input while the error was displayed:

```
aria-invalid: null    aria-describedby: null    aria-errormessage: null    aria-multiline: null
badge role: null      badge aria-live: null     badge pointer-events: none
```

A screen-reader user receives **nothing**. VISUAL-CONSTITUTION §4.1: "Selected, failed,
pending, withdrawn and disabled states are never color-only. Role, accessible name,
state/value and associated **error/status are explicit**."

**Cure.** The error is a *field state*, not a floating ornament: `invalid` on the glass-ui
`Input` (the prop exists — `InputProps.invalid`), plus a real message node below the field
wired by `aria-errormessage` + `aria-invalid="true"`. It never overlaps the value or the
action.

---

### D-5 · MAJOR — 2 s to any feedback, and repeating the same mistake is answered with silence

**Evidence.** `useColorParsing.ts:92` — `debounce(parseAndSetColor, 2000)`. Four measured
trials against the live field (fresh string, same string, different string, first string
again):

| trial | input | time to error badge |
|---|---|---|
| T1 fresh invalid | `lab()` | **2037 ms** |
| T2 **same** invalid retried | `lab()` | **never** |
| T3 different invalid | `zzz(` | **2048 ms** |
| T4 first invalid again | `lab()` | **2041 ms** |

Two distinct defects:

1. **Latency.** ~2.04 s to first feedback, and the debounce is *trailing*: any user typing
   at better than one character per two seconds gets **no parse and no preview for the
   entire entry**. Independently demonstrated — driving the field at a 900 ms cadence for
   4 s produced no badge at all, because every keystroke reset the 2000 ms timer. Typing
   `oklch(0.7 0.1 200)` at a slow 1 char/s yields zero live colour feedback across all 18
   characters. This is a live-preview instrument with the live preview switched off.
2. **Repeat suppression.** `useColorParsing.ts:62` — `if (!input || input === previousInvalid) return;`.
   Retyping the identical wrong string produces no error, no border, no badge. The natural
   human recovery loop — *try it again, maybe I mistyped* — is answered with total silence.
   T2 above is that loop, measured.

And the badge auto-clears on a 2000 ms timer (`:57`), so the truth is transient. PROPORTION-
AUDIT **PR-08**: "Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**…
Persistent entity status/recovery." VISUAL-CONSTITUTION §5: "A transient flourish may
celebrate success but never carries the only truth."

**Cure.** Leading-edge debounce at ~120–200 ms for the live preview; error state is derived
from the current value and **persists while the value is invalid** rather than flashing on a
timer; drop `previousInvalid` entirely (it is a cache guarding a pure function).

---

### D-6 · MAJOR — MT-F001 is swallowed and laundered into "not a valid color"

**Evidence.** Reproduced live in the running app by importing the dev-server module graph:

```js
await import('/@fs/Users/mkbabb/Programming/value.js/src/css/index.ts')
```

| input | result |
|---|---|
| `oklch()` `rgb()` `hsl(  )` `lab()` `lch()` `color()` `oklab()` | **THROW TypeError: Cannot read properties of undefined (reading 'replace')** |
| `oklch(` `)` `not-a-color` | clean failure |
| `oklch(0.7 0.1 200)` | ok |

Seven of the eight named MT-F001 inputs throw from
`src/css/grammar.ts:181` — `splitTopLevel(slash[0]!.replace(/,/g, " "), "space")`, where the
`!` is false because `splitTopLevel("", "/")` yields an empty array.

**The component neither guards nor crashes — it swallows.** `useColorParsing.ts:63-89` wraps
the entire `parseColor` call in `try { … } catch { previousInvalid = input; if (!initialParse) flashParseError(); }`.
Measured in the live UI while typing `oklch()`: `window.onerror` fired **zero** times, the
console stayed clean, and the user got the same generic pill — *"not a valid color"* — that
a genuine syntax error produces.

Three consequences, all design-level:

- The user is told their input is invalid CSS. For `oklch()` that happens to be true; for a
  crash the message is a guess dressed as a diagnosis. The component cannot distinguish
  "you wrote bad CSS" from "our parser died", and so it asserts the former.
- The shipping crash is **invisible to telemetry**. `REPORT.md` records `pageErrors: 0` and
  one unrelated console error across 60 captures precisely because this catch eats it.
- `initialParse` (`:50, :86`) means the *first* parse of a session flashes nothing at all —
  a boot-time invalid persisted colour fails completely silently.

**Cure.** Not this component's to fix at the root (that is MT-F001 / V·π), but the seat law
here is: a thrown `TypeError` is an internal fault, not a user error. Catch it separately,
report it once, and show the user a distinct "couldn't parse that — this is our bug"
message. Never render an internal fault as user-blaming copy.

---

### D-7 · MAJOR — a `contenteditable` `<span>` where glass-ui's `Input` already lives in this tree

**Evidence.** `ColorInput.vue:11-27` builds a text field from
`<span contenteditable role="textbox">`. Meanwhile:

```
node_modules/@mkbabb/glass-ui/dist/components/input/          ← exists
demo/ui/input/index.ts → export { Input } from "@mkbabb/glass-ui/forms";   ← already wired
InputProps: autocomplete, defaultValue, disabled, enterkeyhint, form, inputmode,
            invalid, maxlength, minlength, modelValue, name, pattern, placeholder,
            readonly, required, size, type
```

Owner edict 4 — "Glass-ui is the design system … Reuse existing component-type names." The
component reaches straight past a primitive its own sibling barrel re-exports, and pays for
it in measured defects:

| what a real input gives free | what this hand-roll does | measured |
|---|---|---|
| `placeholder` | `data-placeholder` + `:empty::before` (`:321-325`) | **broken** — see below |
| value is text | value is a DOM subtree | **accepts markup** |
| `invalid` state | floating badge | D-4 |
| `inputmode` / `enterkeyhint` | none | mobile keyboard is prose-mode |
| `maxlength` / `pattern` | none | — |
| native undo/redo | broken by programmatic `innerText` writes at `:191, :240, :265, :278` | — |
| a focus register | `outline: none` | D-1 |

**Broken placeholder, measured.** Browsers leave a `<br>` in a contenteditable after
select-all + delete:

```
el.innerHTML = '<br>'  →  el.matches(':empty')  →  false
el.innerHTML = ''      →  el.matches(':empty')  →  true
```

So `.color-input:empty[data-placeholder]::before` never fires after the user has typed once
and cleared. Propose mode's *"propose a name…"* placeholder appears exactly once — on entry
(`:260-261`, where `innerText = ""` genuinely empties it) — and **never again**. The empty
state is unstyled for every subsequent visit.

**Markup ingestion, measured.**

```
el.innerHTML = '<b style="color:red">rebeccapurple</b><span>!</span>'
→ innerHTML survives verbatim, querySelectorAll('*').length === 2
```

Pasting styled text from any source injects that markup into the field. `innerText` still
reads back the string so parsing "works", but `text-align: center`, `text-overflow: ellipsis`
and the `:empty` placeholder now operate on a DOM the component never designed for.

`role="textbox"` additionally lacks `aria-multiline` (measured `null`), which the ARIA
authoring practices require on a composite textbox.

**Cure.** Replace the span with glass-ui `Input` (`type="text"`, `inputmode="text"`,
`enterkeyhint="done"`, `:invalid="parseError"`, `placeholder`, `spellcheck="false"`). This
one substitution retires D-1's outline suppression, D-4's badge, D-7 entirely, and most of
D-8 and D-14.

---

### D-8 · MAJOR — the mask fades the field's own border, and fights the centred text

**Evidence.** `:294-306`:

```css
--input-action-width: 2.5rem;
mask-image: linear-gradient(to right, black calc(100% - var(--input-action-width)), transparent 100%);
```

Measured computed values:

```
maskImage:  linear-gradient(to right, rgb(0,0,0) calc(100% - 40px), rgba(0,0,0,0) 100%)
paddingRight: 36px      textAlign: center      borderRadius: 4px
mask on focus: "none"
```

Four separate problems:

1. **`mask-image` masks the element, not its text.** The field's `border` and
   `bg-background` fill are painted by the same box, so the right 40 px of the **border and
   background dissolve to transparent**. The 4 px right corners simply are not drawn. That
   is why the input reads as a plate with a torn edge rather than a bounded field.
2. **A right-edge fade under `text-align: center`.** Centred text grows *symmetrically*.
   Any value long enough to enter the last 40 px is faded on the right while its left end is
   fully opaque — an asymmetric decay applied to a symmetric layout. The field also already
   declares `text-overflow: ellipsis` (`:16`), so two mutually redundant truncation idioms
   are stacked on one element.
3. **40 px mask vs 36 px padding.** `--input-action-width: 2.5rem` (40 px) but the class list
   sets `pr-9` (36 px). The mask begins eating ink **4 px before** the reserved gutter
   starts. Neither number is derived from the 24 px button they claim to clear.
4. **`mask-image: none` on `:focus`** (`:303-306`) — the border and background snap back
   into existence the instant the field is focused. Measured `maskImage: "none"` while
   focused. A visible discontinuity, on an untransitionable property, on the focus event.

VISUAL-CONSTITUTION §7: the dock is "clipped by neither mask nor card". This is literally a
mask.

**Cure.** Delete the mask. A real input scrolls its own overflow and needs no gradient;
`text-overflow: ellipsis` at rest is sufficient and already present. Align the value to the
inline start (see D-14) and let one number — the button's own measured inline size — drive
the gutter.

---

### D-9 · MAJOR — dead surface: an unused prop, a dead 5-member API, two unused injections, a third Copy path

**Evidence.**

```
$ grep -n "editTarget" demo/shell/dock/ColorInput.vue
139:    editTarget: EditTarget | null;          ← declared; referenced nowhere else
```

The parent passes it (`ActionBarLayer.vue:118`). It is never read.

```
$ grep -rn "copyAndSetInputColor|onSubmitColor|submitProposedName" demo/ --exclude ColorInput.vue
(no matches)
$ grep -n "colorInputRef" demo/shell/dock/layers/ActionBarLayer.vue
28:const colorInputRef = ref<InstanceType<typeof ColorInput> | null>(null);
116:                ref="colorInputRef"
```

`defineExpose({ focus, inputIsFocused, copyAndSetInputColor, onSubmitColor, submitProposedName })`
(`:282-288`) — the ref is declared and bound and **never read**. All five exposed members
are dead.

`cssColorOpaque` (`:146`) and `canProposeName` (`:150`) are destructured from the injected
model and used nowhere.

`copyAndSetInputColor` (`:219-223`) additionally imports `writeClipboard` from glass-ui and
implements **a third Copy path** — unreachable — while the dock's action toolbar already
owns a live `aria-label="Copy color"` button (confirmed in the live button enumeration).
PROPORTION-AUDIT **PR-13**: "Picker specimen and action region both host Copy … total 2→1."
This is the un-counted third.

Owner edict 2 — no legacy code, no dual paths. Owner edict 1 — no god modules. At 377 lines
this component does colour parsing, colour entry, name proposal, crown metadata display, a
help popover and a parse-lab echo, with `proposeMode` forking nearly every handler
(`:196-201`, `:203-211`, `:252-267`).

**Cure.** Delete all of it. Then split: `ColorInput` (colour only) and `ProposeNameInput`
(name only) are two different controls with two different value types, two different
submit semantics and two different error vocabularies — the boolean fork is the god-module
smell, and each half is small enough to be honest.

---

### D-10 · MAJOR — the Crown: hover-only meaning, keyboard-unreachable tooltip, and an untransitioned scale

**Evidence.** `:30-59`. Three defects in one 30-line block.

**(a) The scale is untransitioned.** `:35` declares `transition-[opacity,transform]`.
Measured: `transitionProperty: "opacity, transform"`, `duration 0.2s`,
`cubic-bezier(0.4, 0, 0.2, 1)`. The compiled CSS for the hover utility, pulled from the
served stylesheet:

```css
.hover\:scale-110 { &:hover { @media (hover: hover) {
  --tw-scale-x: 110%; --tw-scale-y: 110%; --tw-scale-z: 110%;
  scale: var(--tw-scale-x) var(--tw-scale-y);
} } }
```

Tailwind v4 writes the **`scale` longhand**, which is not `transform`. So opacity fades over
200 ms while the magnification **snaps instantly** — a desynchronised hover. This is exactly
the F3 "spatial-on-bezier stray" that `:327-334` says was retired from `.send-btn`; it
survives untouched two elements away in the same file. The 200 ms / `cubic-bezier(.4,0,.2,1)`
pair is also raw Tailwind default, not a glass-ui token — VISUAL-CONSTITUTION §6: "Spatial
continuity uses one producer-owned glass-ui spring register."

**(b) `@media (hover: hover)`** — the affordance does not exist on touch at all.

**(c) The tooltip is unreachable.** `TooltipTrigger as-child` (`:32`) passes to `<Crown>`,
which renders an `<svg>`. An `<svg>` is not focusable and carries no `tabindex`. The crown's
`cursor: help` promises information — the colour's approved name, contributor and CSS
(`:42-57`) — that a keyboard user and a touch user can never obtain.

PROPORTION-AUDIT §5 law 5: "A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or **removed**." **PR-07**: "Hover-only/unlabeled
controls … every surviving action/drag seat has a name/state."

Minor, same block: `:37-39` sets `style="animation: crown-appear …"` as an **inline
per-instance override** — owner edict 5 forbids exactly this. (The keyframe itself is fine:
`demo/styles/animations.css:184-193` supplies a global `prefers-reduced-motion` guard that
neutralises `crown-appear` and `input-mode-flash` app-wide. Motion accessibility is one of
the few things this component gets right, by inheritance.)

**Cure.** Move the crown's meaning into text the field already owns (or a persistent
adjacent label), and if the mark stays, make it a real focusable named control.

---

### D-11 · MINOR — the type roles are off the closed matrix

**Evidence, measured against the app's own role classes:**

| role | family | size / line-height |
|---|---|---|
| `.color-input` (this component) | **Fira Code** | **18.608 / 27.912 px** |
| `text-mono-small` (the constitution's value/code role) | Fira Code | 16.4 / 22.96 px |
| `mono-caption` | Plus Jakarta Sans | 18.608 / 27.912 px |
| `text-small` (control/label role) | Plus Jakarta Sans | 16.4 / 22.96 px |
| `.error-badge` → `@apply text-xs` (`:353`) | Plus Jakarta Sans | **12 / 16 px** |

VISUAL-CONSTITUTION §4: "value, code, or provenance → `text-mono-small`, or the already-
established `mono-caption` where the content is a caption … This matrix is **closed** across
all eighteen compositions." P019's Picker pair is the sole exception, and this is not it.

The field's value is Fira Code at `mono-caption`'s *size* — a fourth combination belonging to
no role. The error badge is `text-xs` at 12 px, which appears nowhere in the matrix
(control copy is `text-small`, 16.4 px). It is also the smallest text in the dock, carrying
the most urgent message.

The 18.608 px value is what drives the field's 45.91 px height and therefore the whole dock
band (§2.3).

---

### D-12 · MINOR — propose-name failure is reported only to the console

**Evidence.** `:242-244`:

```ts
} catch (e: any) {
    console.warn("[ColorInput] Failed to propose name:", e?.message);
}
```

A network failure, a 409 on a duplicate name, an auth failure — the user sees the spinner
stop and nothing else. There is no success feedback either: `:239-241` silently repaints the
field. `proposing` (`:227`) is the only state, and it has no visual treatment (D-2).

VISUAL-CONSTITUTION §5: "Persistent operation state stays with the entity/workspace."
PROPORTION-AUDIT **PR-08**. Also `catch (e: any)` in a `strict: true` codebase.

---

### D-13 · MINOR — direction and isolation are physical throughout

**Evidence.** Every offset in the component is physical:
`pr-9` (`:18`), `right-2` (`:35`), `.send-btn { right: 0.25rem }` (`:337`),
`.error-badge { right: 0.5rem }` (`:350`), `mask-image: linear-gradient(to right, …)` (`:300`).

VISUAL-CONSTITUTION §6.1: "chrome, navigation and layout — logical inline/block direction
follows the document."

Worse, the *content* is a CSS colour string — `lab(92% 88.8 20 / 82.7%)`, `#fbfaf8` — and
§6.1 is explicit: "CSS strings, hex, slugs, IDs and provenance — render in **LTR-isolated
spans** inside RTL prose." The field applies no `dir` and no `unicode-bidi: isolate`. Under
RTL, a value beginning with `#` or `/` will reorder on screen while the model keeps the
original bytes: what the user reads is not what the parser receives.

`text-align: center` compounds it — an LTR-only technical value, centred, in a container
that may be RTL.

---

### D-14 · MINOR — real information is gated behind hover

**Evidence.** `:3-8` wraps the entire field in `<Popover trigger="hover" :open-delay="300">`.
Its content (`:94-110`) is not decoration: the serialized current colour and
`<ParseEchoReadout />` — the Parse-Lab AST echo and gamut verdict (E4/Q10).

A 300 ms hover-only disclosure has no touch equivalent and no keyboard equivalent. It also
wraps the *text field itself* as its trigger, so hovering to click into the field summons an
overlay near the pointer.

PROPORTION-AUDIT §5 law 6: "Add affordance when the surviving action/state is otherwise
undiscoverable; do not compensate for an unnecessary action with tooltip proliferation.
Subtraction precedes explanation." **PR-14** condemns the same species elsewhere
("cursor/hover/Tooltip chrome around empty conversion-path content").

---

### D-15 · INFO — small contrivances

- `:17-21` — `:class="{ 'pr-9': true, … }"` : a permanently-true key inside a dynamic class
  binding. It is a static class written as a conditional. Owner edict 3 (KISS).
- `:256` — `setTimeout(() => { modeTransition.value = false; }, 300)`: a hard-coded 300 that
  must stay in sync with `--duration-slow` (`:313`) by hand, and is never cleared on unmount.
- `:262` — `requestAnimationFrame(() => inputColorRef.value?.focus())`: a raw rAF focus hop
  with no `nextTick`, competing with the mode-flash animation started two lines earlier.
- `:341` — `border-radius: var(--radius-sm)` on the send button vs the field's 4 px vs the
  dock's pill. Three radii in 24 px of travel.

---

## 4. State coverage table

| State | Handled? | Evidence |
|---|---|---|
| empty (first entry) | yes | `data-placeholder` set at `:261` |
| **empty (after clear)** | **NO** | `<br>` defeats `:empty` — measured `matches(':empty') === false` (D-7) |
| populated | yes | — |
| **loading / in-flight** | partial | `Loader2` spins; no accessible name, no `aria-busy`, no disabled visual (D-2, D-3) |
| **parse error** | **broken** | occludes field + button; zero ARIA; 2 s late; silent on repeat (D-4, D-5) |
| **submit error (propose)** | **NO** | `console.warn` only (D-12) |
| submit success | **NO** | silent repaint at `:239-241` |
| **disabled** | **NO** | `cursor: not-allowed` only — pixel-identical to enabled (D-2) |
| **focused** | **BROKEN** | user-colour border, contrast 1.00 measured (D-1) |
| hovered (field) | n/a | opens a popover instead (D-14) |
| **hovered (send)** | **NO** | `.btn-interactive` does not exist (D-2) |
| **pressed** | **NO** | same |
| selected (text) | yes | `selectAll()` on focus, `:168-177` |
| dragging | n/a | — |
| **overflowing / truncated** | **broken** | mask + ellipsis stacked; mask fades border (D-8) |
| **RTL** | **NO** | physical offsets; no LTR isolation on a CSS string (D-13) |
| reduced-motion | **yes** | global guard, `animations.css:184-193` — inherited, correct |
| **forced-colors** | **NO** | element misses the focus roster — measured `matches() === false` (D-1.3) |
| zoom 200 % | untested | not probed; flagged as a gap, not a finding |
| **mobile (390 px)** | **ABSENT** | component not in the DOM — measured (§2.2) |

Eleven of nineteen states are unhandled or visually broken. A state that was never designed
is a design defect; eleven of them is not an oversight, it is an absent design.

---

## 5. Motion audit

| Animation | Tokenized? | PRM? | Forces layout? |
|---|---|---|---|
| `border-color`, `box-shadow` transition (`:296-298`) | yes — `--duration-fast` / `--ease-standard` | yes (global) | no |
| `input-mode-flash` (`:312-319`) | yes — `--duration-slow` / `--ease-decelerate` | yes (global) | no (`transform`+`opacity`) |
| `crown-appear` (`:369-376`) | duration/easing tokenized; **applied inline** (edict 5) | yes (global) | no; animates `filter: drop-shadow` per frame |
| **Crown hover scale** (`:35`) | **no** — Tailwind default 200 ms / `cubic-bezier(.4,0,.2,1)`, and **names the wrong property** | n/a | no — but **does not animate at all** (D-10a) |
| **`.send-btn` hover/press** (`:69`, `:78`) | **no** — class resolves to nothing; measured `transition-duration: 0s` | n/a | — (D-2) |
| `vj-celebrate` on the badge (`:86-90`) | yes — house family, geometry vars at `:362-366` | yes (global) | no |
| `animate-spin` on `Loader2` (`:73`) | Tailwind default | yes (global `animation-duration: .01ms`) | no |

The two ad-hoc entries are the two that matter — the only two interaction (as opposed to
arrival) motions in the component. Both are broken. The tokenized ones are all one-shot
decorations.

---

## 6. Design-system boundary

- `Popover`, `Tooltip`, `Separator` come from `demo/ui/*`, which are **pure re-export
  barrels** over `@mkbabb/glass-ui` (verified: `export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";`).
  No violation.
- **`Input` is the violation.** glass-ui ships `components/input`; `demo/ui/input/index.ts`
  already re-exports it. The component hand-rolls a text field anyway (D-7). Owner edict 4.
- **`.btn-interactive` is a phantom producer atom** — 0 occurrences in glass-ui 7.0.0 (D-2).
  The component's own comments and `DESIGN.md:247` assert a producer contract that does not
  exist.
- **Per-instance overrides** where root-level styling is the law (owner edict 5):
  `:style="inputStyle"` (`:22`), `:style="{ stroke: safeAccent }"` (`:74`, `:81`), and the
  inline `style="animation: crown-appear …"` (`:37-39`).
- `focus-visible:outline-none` (`:16`) overrides the house focus register per-instance;
  measured `colorInput.usesFocusRing: false` while four sibling dock controls carry
  `.focus-ring`.

**Compliant:** `verbatimModuleSyntax` (edict 8) — `import type { EditTarget }` at `:134` is
correct and the only type-only import. Vue 3.5 idioms (edict 7) — `useTemplateRef` at `:159`,
reactive props destructure at `:138`. Animations preserved, not deleted (edict 6) — the
scoped keyframes are intact and the global PRM guard covers them.

---

## 7. Proportion and seat law

Read: `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`.

**`PALETTE-CONTRACT.md` does not govern this component.** It is the palette *entity* wire
and export contract (routes, `Workspace`/`Release` topology, the W51 byte appendix). Its
opening sections declare its scope as "the current-conformant Hono + MongoDB substrate".
There is no colour-token, accent or contrast law in it — `grep -i "accent|contrast|focus"`
returns nothing. Reporting a citation from it would be fabrication. The governing visual
authorities for this seat are `VISUAL-CONSTITUTION.md` and `PROPORTION-AUDIT.md`, both cited
throughout above.

Register rows this component sits under:

| Row | Owner | Judgement |
|---|---|---|
| **PR-07** hover-only/unlabeled controls → ADD-AFFORDANCE/REMOVE | W23 | **open at 3 sites** — nameless send button (D-3), hover-only crown tooltip (D-10c), hover-only Parse-Lab popover (D-14) |
| **PR-08** pending/failure truth only transient → ADD-AFFORDANCE | W23 | **open** — 2 s flash then silence (D-5); propose failure console-only (D-12) |
| **PR-12** touch padding bloats/misaligns visual glyphs → TIGHTEN | W18 | **inverted** — the glyph and the target are the same 24 px; the law wants them separated (D-3) |
| **PR-13** Copy hosted twice → REMOVE, "total 2→1" | W20 | **a third, uncounted Copy path exists here** (D-9) |
| **PR-16** dock controls need explicit purpose/state law | W19 | **open** — `Tools →` reveals a face whose input mode is a second, unlabeled cycle (§2.1) |
| §5 law 5 "a small icon/mark is either data, status, labeled action … or removed" | — | **violated** by the crown (D-10) |
| §5 law 10 "no duplicate `contenteditable` path" for editing | W21 | the letter of the law is about the Picker headline; **the spirit is this component** — the app's one hand-rolled `contenteditable` editor (D-7) |
| §4 closed type matrix | — | **violated**, two roles (D-11) |
| §4.1 states never colour-only; focus distinct in forced colors | — | **violated**, D-1 and D-2 |
| §7 dock "fully visible … clipped by neither mask nor card" | W19 | **violated twice** — invisible at rest (§2.1) and self-masked (D-8) |

---

## 8. The gestalt cure

Not fifteen patches. One transposition, in this order:

1. **Delete the `contenteditable`.** Take glass-ui `Input` with
   `type="text" inputmode="text" enterkeyhint="done" spellcheck="false"
   :invalid="parseError" :placeholder="…"` and `v-model` over a local `shallowRef`
   (the `defineModel` round-trip caveat this codebase already documents). This alone kills
   D-1 (real focus register returns), D-4 (`invalid` is a producer field state), D-7 wholly,
   D-8 (no mask needed — inputs scroll), D-11 (roles come from the producer), and most of
   D-13 (logical inline direction and `dir="ltr"` on the value).
2. **Split the component.** `ColorInput` and `ProposeNameInput`. Two value types, two
   submit verbs, two error vocabularies, one boolean fork removed. Delete `editTarget`,
   the five-member `defineExpose`, `cssColorOpaque`, `canProposeName`, and
   `copyAndSetInputColor` on the way (D-9). Each half lands well under 150 lines.
3. **Make the error a persistent field state, not a floating pill.** `aria-invalid` +
   `aria-errormessage` pointing at a real message node in normal flow. Nothing overlaps the
   value or the action. Leading-edge debounce at ~150 ms; delete `previousInvalid` (D-4, D-5).
4. **Give the action a name, a type, a target floor and a real atom.** `aria-label`,
   `type="button"`, ≥44 px invisible seat over the 24 px glyph, and `tap-squish focus-ring`
   — atoms that measurably exist — instead of the phantom `btn-interactive`. Correct
   `DESIGN.md:247` (D-2, D-3).
5. **Decide what the crown is.** If it is status, it is text or a named focusable control
   with a persistent label. If it is decoration, it is `aria-hidden` and loses its
   `cursor: help` and its tooltip. It cannot be a hover-only secret (D-10).
6. **Then decide whether the dock is the right home at all.** A control that is invisible
   at rest on every route, requires two disclosures on desktop, and does not exist on
   mobile is not a dock control — it is a hidden feature wearing dock chrome. That is a
   W19/W18 composition question, and it is the real one.

---

## 9. Frames

- `frames/A-focused.png` — focused field, `oklch()` selected, border = the user's colour.
- `frames/B-error-badge-over-send.png` — the error badge covering 83 % of the send button
  and 66 % of the field.
