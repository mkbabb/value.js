# CHALLENGE-D — `FlagReportDialog.vue` is design-defective

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)**, the model declared for this seat. The
declaration was explicit in the spawn; no inheritance, no substitution. Seat law satisfied.

---

## 0. Method, and why a probe was necessary

**The component has ZERO frames in the mega-tranche visual matrix.** The 60-capture Safari record
(`docs/tranches/V/megatranche/audit/visual/REPORT.md`) covers 15 routes × 4 matrices; this dialog
appears in none of them, because it is only reachable from
`PaletteCardMenu.vue:143-150` (`v-if="paletteKind === 'remote' && !isOwned"`) and the commons is
down in every captured frame:

```
docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png
docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-dark/browse.png
  → both render "The commons is unreachable. / Failed to load palettes / Retry"
```

I confirmed the API is still unreachable from the live dev server:

```
$ curl -s -m 8 "http://localhost:9000/api/palettes?limit=3" | head -c 60
<!doctype html>          # SPA fallback — no proxy, no API
```

So I mounted the real SFC through the live Vite graph, inside the real app's cascade (real tokens,
real glass surfaces, real fonts, real ambient ground), and drove it. Full harness in
`evidence/probe-console.js`; every number below is pasted output from that harness or from a
`getComputedStyle` read on the live node.

```js
const base = "/@fs/Users/mkbabb/Programming/value.js";
const vue  = await import(base + "/node_modules/.vite/deps/vue.js");
const mod  = await import(base + "/demo/palettes/browser/dialog/FlagReportDialog.vue");
// mount mod.default with { open:true, paletteName, paletteSlug } into the running page
```

Frames captured (all under `evidence/`):

| file | matrix |
|---|---|
| `desktop-light-empty.png` | 1440×900, light, in-situ over the app |
| `desktop-light-checked-report-enabled.png` | 1440×900, light, reason selected, Report **enabled** |
| `dark-focus-first-radio.png` | dark, real keyboard focus on radio 1 |
| `mobile-390-light-longname-overflow.png` | 390×844, light, long name + overflowing detail |

---

## 1. Verdict

**DEFECTIVE.** The premise holds. This is not a dialog that needs polish; it is a dialog whose
central design proposition — *"this is the destructive commit, that is the escape"* — **does not
render at all**. Its confirm button and its cancel button are computationally identical. Its
loading state is unreachable code. Its form retains one stranger's report text and hands it to the
next stranger. Every field it hand-rolls has a first-class glass-ui 7.0.0 primitive it declined to
use.

The single strongest defect: **`variant` is not a prop on glass-ui 7's `Button`.** Both footer
buttons pass one, both land in the DOM as inert HTML attributes, and the rendered result is

```
differingComputedProps: ["w"]      // 86px vs 84px — a label-length artifact
```

Two buttons. One says *Report*, one says *Cancel*. Identical background, identical text colour,
identical radius, identical seven-layer box-shadow, identical weight, identical opacity. The only
difference in the entire computed style is that the word "Cancel" is two pixels wider.

---

## 2. Visual truth

### 2.1 Desktop, light (`evidence/desktop-light-checked-report-enabled.png`)

The optional free-text field is the loudest object in the dialog. It is a bright opaque cream slab
(`background-color: rgb(251, 250, 248)`) with a hairline border and a **4px** corner radius, seated
inside a translucent glass overlay with a **16px** radius, above two **9999px** capsules. Three
unrelated radii in a 448×405 box. Nothing else in the dialog has a straight corner. Measured:

```
dialogRadius:   "16px"     dialog surface = data-surface="glass", material="overlay"
textareaRadius: "4px"      (rounded-input — a shadcn-era token)
buttonRadius:   "9999px"
textareaPctOfDialog: 17.5   ← the single largest element is the field marked "(optional)"
```

Two radios read as marked at once: `Copyright violation` is filled green (checked) and
`Inappropriate content` carries a pink ring (focus). At 18px face diameter the two registers are
distinguished by *hue of a dot*, nothing else.

The footer band is ~24px of empty width across the left two-thirds with the two identical capsules
hugging the right edge — no primary, no destructive, no hierarchy.

### 2.2 Dark (`evidence/dark-focus-first-radio.png`)

Worse, and in the opposite direction. Measured:

```
dialogBg:  oklab(0.419037 0.0102007 0.0159858 / 0.797248)
textarea:  { bg: "rgb(11, 10, 9)", color: "rgb(233,230,226)", borderColor: "rgb(101,87,73)" }
```

`rgb(11,10,9)` is functionally black. The optional field becomes a **hole punched through the
glass** — ΔL ≈ 0.36 in OKLab against its own container, the highest-contrast edge anywhere in the
composition, and it belongs to the least important control. VISUAL-CONSTITUTION §2 sets five
material tiers and rules "one surface has one tier"; this is a form control impersonating a
specimen well, and it is the only element in the dialog that does not participate in the glass.

Cancel renders in full-strength white; Report (disabled) renders muted. **In dark mode the dialog's
visually affirmative button is "Cancel".**

### 2.3 Mobile 390 (`evidence/mobile-390-light-longname-overflow.png`)

Three distinct mobile defects in one frame:

1. **Two competing alignment axes.** The producer `DialogHeader` is `text-center sm:text-left`; the
   body is left-aligned. Below 640px the title and the two-line question are centred over a hard
   left column of radios. The wrapped second line ("Gradient — Study No. 47 (revised)"?) forms a
   ragged symmetric wedge over a left rule. Nothing in the component corrects it.
2. **The footer order inverts.** Measured `flex-col-reverse` at this width: **Report sits ABOVE
   Cancel**, directly under the textarea, in the thumb zone. Desktop reads `[Cancel][Report]`
   left→right; mobile reads `[Report]/[Cancel]` top→bottom. The destructive commit changes ordinal
   position across breakpoints, is full-width (340px), and is visually indistinguishable from the
   escape hatch (§2.1).
3. **A radiused card flush to the viewport edge.** `dialogRect: { x: 0, width: 390 }` with a 16px
   radius. Full-bleed with rounded corners is neither a sheet nor an inset card; the corners cut the
   page through.

And the fourth line of the detail text is **sliced through its x-height** — see D-8.

---

## 3. Defect register

Severity: BLOCKER = ships a wrong or dangerous outcome · MAJOR = a designed state is missing or
renders wrong · MINOR = craft.

---

### D-1 · BLOCKER · The destructive commit and the escape are the same button

**Evidence** — `demo/palettes/browser/dialog/FlagReportDialog.vue:38` and `:41-42`:

```vue
<Button variant="outline"     @click="$emit('update:open', false)">Cancel</Button>
<Button variant="destructive" :disabled="!reason || submitting" @click="onSubmit">Report</Button>
```

glass-ui 7.0.0 `Button` has no `variant`. Its public shape is
(`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19`):

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;                 // "neutral" | "success" | "warning" | "info" | "destructive"
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;           //  ← see D-2
    ...
}
```

and the producer states the law in the axis file itself —
`node_modules/@mkbabb/glass-ui/dist/components/_shared/axes.d.ts:17`:

> `/** The tone axis — the semantic status register (`--<tone>` token cohort); NEVER a `variant` member. */`

Rendered DOM of both footer buttons (live, pasted):

```
Cancel: data-slot=button data-emphasis=secondary data-tone=neutral data-size=md ... variant=outline
Report: data-slot=button data-emphasis=secondary data-tone=neutral data-size=md ... variant=destructive
```

`variant` is an inert HTML attribute. `data-tone` is **neutral on both**. Computed-style diff with
Report *enabled*:

```
enabledReport: true
differingComputedProps: ["w"]        // 86 vs 84
cancel.bg == report.bg == oklab(0.721321 0.00495294 0.0108792 / 0.6)
cancel.boxShadow == report.boxShadow  (all seven layers)
cancel.color == report.color == rgb(0,0,0)
```

**Reproduction** — open the dialog, select any reason, run:

```js
const d=document.querySelector('[role=dialog]'),b=[...d.querySelectorAll('button')];
const c=b.find(x=>x.textContent.trim()=='Cancel'),r=b.find(x=>x.textContent.trim()=='Report');
Object.keys(getComputedStyle(c)).filter(k=>getComputedStyle(c)[k]!==getComputedStyle(r)[k]);
// → width-related keys only
```

**Mechanism** — a retired API surface (shadcn `variant` tone-as-variant) survives in the consumer
after the producer collapsed it onto the orthogonal `emphasis × tone` axes. Vue silently forwards
unknown props to the host element, so the compiler, the typechecker's fallthrough-attr allowance
and every existing test agree it is fine. Nothing fails except the pixels.
This is **edict 2 (no legacy code)** and **edict 4 (glass-ui is the design system)** in one line.

**Cure** — `emphasis="quiet"` on Cancel, `emphasis="primary" tone="destructive"` on Report. Not a
patch: the whole `variant`-vocabulary must be struck from the demo. The same dead prop is in the
sibling five feet away (`MigratePalettesDialog.vue:19,26,32` — `variant="default"|"outline"|"ghost"`)
and in a prior audit's census (`AdminUsersPanel/challenge-L-library.2026-07-24-prior.md:202`, which
already named this file: *"a TONE passed as a dead variant"*). It was seen, written down, and left.

---

### D-2 · BLOCKER · The loading state is unreachable code; the real in-flight state is a blank form

**Evidence** — `FlagReportDialog.vue:46` declares a spinner and `:90-100` guarantees it can never
paint:

```ts
async function onSubmit() {
    if (!reason.value) return;
    submitting.value = true;
    try { emit("submit", reason.value, detail.value.trim() || undefined); }
    finally { submitting.value = false; reason.value = ""; detail.value = ""; }
}
```

`emit` is synchronous. `finally` therefore runs in the same microtask, before Vue's scheduler
flushes, so `submitting` is `true` for zero rendered frames. Measured with a `MutationObserver` on
`document.body` (`childList+subtree+attributes`) spanning the whole click turn:

```
spinnerSyncAfterClick: false
spinnerEverSeen:       false      // 500 ms observation window
emitsAfterSubmit:      [["submit","spam","THIS TEXT SHOULD NOT SURVIVE A CANCEL"]]
stateAfterSubmit:      { detail: "", open: true }
```

**Reproduction** — select a reason, type a detail, click Report; observe `.animate-spin` never
enters the DOM, and the dialog stays open with an emptied form.

**Mechanism** — the pending state was designed for a promise the component never awaits. The
parent owns the promise (`BrowsePane.vue:297-299`: `await pm.flagged.report(...)` then
`flagDialogOpen.value = false`), so for the entire network round-trip the user looks at an **open
dialog whose radio group has been reset to nothing and whose textarea has been emptied**, with the
Report button re-disabled and no spinner, no status, no error surface. That is not "no loading
state" — it is a loading state that *reads as a silent failure*. It violates
VISUAL-CONSTITUTION §5 ("Persistent operation state stays with the entity/workspace") and
PROPORTION-AUDIT PR-08 verbatim ("Pending/failure/export/recovery truth only transient →
ADD-AFFORDANCE").

**Cure** — invert ownership. The dialog takes the promise (`submit` returns a `Promise<void>` or
the parent passes a `pending`/`error` model), holds its own input until commit, and expresses
pending through the producer's own `loading` prop on `Button` — deleting the hand-rolled
`Loader2 + submitting` pair entirely.

---

### D-3 · BLOCKER · One reporter's private text is handed to the next palette

**Evidence** — reset happens only on the submit path (`:97-98`). Cancel (`:38`) emits
`update:open=false` and nothing else. `BrowsePane.vue:168` mounts the dialog under
`v-if="flagPalette"` and `flagPalette` is **never set back to null** (`BrowsePane.vue:288-299`), so
the component instance and its refs outlive every close.

Measured, live:

```
afterCancel:  { open:false, dialogInDom:true }
afterReopen:  { title: 'Why are you reporting "Someone Else\'s Palette B"?',
                leakedDetail: 'private note about palette A',
                leakedReason: ['reason-copyright'],
                reportEnabled: true }
```

**Reproduction** — open Report on palette A, choose *Copyright violation*, type a note, press
Cancel. Open Report on palette B. The dialog names palette B, the note about palette A is still in
the box, *Copyright violation* is still selected, and Report is armed. One Enter files it.

**Mechanism** — the dialog has no per-invocation identity. Its inputs are instance state while its
subject is a prop, so subject and state decouple the moment the instance is reused. The design
never asked "what is this dialog *about*, and when does that change?"

**Cure** — the invocation is the identity. Either `:key="paletteSlug"` at the call site so a new
subject mints a new instance, or the dialog owns a `watch(() => open, …)` that clears on *every*
transition. The idiomatic form is the former; it also deletes the dead `paletteSlug` prop (D-12) by
giving it a job.

---

### D-4 · MAJOR · A hand-rolled `<textarea>` where glass-ui ships `Textarea`

**Evidence** — `FlagReportDialog.vue:29-34`:

```vue
<textarea v-model="detail" placeholder="Additional details (optional)..."
  class="h-20 rounded-input border border-input bg-background px-3 py-2 text-small resize-none
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" maxlength="500" />
```

Ten utility classes reimplementing a component that exists in the dependency
(`node_modules/@mkbabb/glass-ui/dist/forms.d.ts:2` → `./components/textarea`), with a props
surface that covers every one of them and more
(`components/textarea/types.d.ts`): `size`, `rows`, `resize`, `invalid`, `maxlength`, `minlength`,
`required`, `readonly`, `disabled`, `name`.

Rendered consequence (§2.1/§2.2): a 4px-radius opaque plate in a 16px-radius glass overlay —
`rgb(251,250,248)` in light, `rgb(11,10,9)` in dark — carrying its own bespoke focus ring
(`ring-2 ring-ring/40`) that matches nothing else in the dialog, since the producer buttons use
`.focus-ring` and the radios use a face box-shadow.

This is the exact row the T-tranche census already booked:
`docs/tranches/T/audit/lanes/t-card-color-census.md:93` — *"`FlagReportDialog` textarea |
`bg-background` (opaque) | opaque | opaque | **2W**"*. It was measured two tranches ago and never
executed.

**Mechanism** — edict 4/5. A raw host element with utility classes is the maximal per-instance
override: it cannot receive a root-level correction, ever.

**Cure** — `<Textarea v-model="detail" :rows="4" :maxlength="500" resize="none" />` from
`@mkbabb/glass-ui/forms`, and if the field genuinely needs a label + description + error + counter,
the producer already ships `LabeledField` (`dist/labeled-field.d.ts`) with `label`, `description`,
`requirement`, `errorLive`, `invalid`. Compose, do not re-cut.

---

### D-5 · MAJOR · The radio hit targets overlap each other by 13.05 px, three times

**Evidence** — measured live:

```
radioSeatH: 44          faceDiameter: 18        radioPitch: 30.95
radioRects: [ {top:338.7,bottom:382.7}, {top:369.7,bottom:413.7},
              {top:400.7,bottom:444.7}, {top:431.6,bottom:475.6} ]

overlaps:
 { pair:["reason-inappropriate","reason-spam"],  overlapPx:13.05, probePoint:[530,376], hitId:"reason-spam"      }
 { pair:["reason-spam","reason-copyright"],      overlapPx:13.05, probePoint:[530,407], hitId:"reason-copyright" }
 { pair:["reason-copyright","reason-other"],     overlapPx:13.05, probePoint:[530,438], hitId:"reason-other"     }
```

`document.elementFromPoint` at each overlap midpoint returns the **lower** radio. The producer
grows each item to a 44px coarse-pointer floor; the consumer sets the row rhythm with
`class="flex flex-col gap-2"` (`:16`) — an 8px gap on an 18px glyph — so the pitch is 31px against
a 44px seat. **The bottom 13px of every option's target belongs to the option below it.**

**Reproduction** — the pasted `elementFromPoint` probe above; or tap 4px below the centre of
"Spam" on a touch device and select "Copyright violation".

**Mechanism** — PROPORTION-AUDIT §5 law 7 exactly: *"Visual glyph size, operable target size and
layout reservation are separate quantities."* The component sized the *gap* from the glyph and let
the invisible seat spill. PR-12 ("Touch padding bloats/misaligns visual glyphs → TIGHTEN").

**Cure** — the row, not the gap, is the unit. Each option becomes one seat whose block size is the
target floor and whose glyph is centred inside it; `gap` becomes `0` and the rhythm comes from the
seat. This is what `LabeledField`/`RadioGroup` composition gives for free.

---

### D-6 · MAJOR · The radio group has no accessible name

**Evidence** — live DOM:

```
radiogroupName: { ariaLabel: null, ariaLabelledby: null, tabindex: "0" }
```

`role="radiogroup"` with no name. The question — *"Why are you reporting …?"* — exists only as the
dialog's `DialogDescription` (`:10-12`), which is wired to the dialog via `aria-describedby`, not to
the group. A screen-reader user tabbing to the options hears an unnamed group of four radios.

**Mechanism** — the visual design and the semantic design were never the same design. Visually the
description reads as the group's legend because of proximity; structurally it is the dialog's
subtitle. VISUAL-CONSTITUTION §4.1: *"Selected, failed, pending, withdrawn and disabled states are
never color-only. Role, accessible name, state/value … are explicit."*

**Cure** — the question is the group's label. `LabeledField label="Why are you reporting this
palette?" :controlLabelable="false"` wrapping the `RadioGroup` produces the `aria-labelledby` seam
the producer designed for exactly this case (see the `controlLabelable` doc comment in
`labeled-field/types.d.ts`).

---

### D-7 · MAJOR · Proximity is inverted — the question is farther from its options than an unrelated field

**Evidence** — measured inter-block gaps, light desktop:

```
title.bottom      -> desc.top          :  6.00 px
desc.bottom       -> radiogroup.top    : 24.00 px     ← the question and its answers
radiogroup.bottom -> textarea.top      : 12.00 px     ← the answers and an unrelated optional field
textarea.bottom   -> footer.top        : 24.00 px
```

The required control is **twice as close** to the optional control as it is to the question it
answers. Gestalt proximity therefore groups `[radios + textarea]` and orphans the question up with
the title. The source is `class="flex flex-col gap-3 py-2"` on the body wrapper (`:15`) with
`gap-2` inside the group (`:16`) — two ad-hoc gap utilities where the composition needed one
question-block and one detail-block.

**Mechanism** — PROPORTION-AUDIT §5 law 3: *"Header→headline uses title gap; headline→next semantic
section uses section gap."* There is no section here; there are two spacing utilities chosen
independently.

**Cure** — one field group (`legend + options`) and one field (`detail`), separated by the section
interval; inside a group, the row rhythm belongs to the row (D-5).

---

### D-8 · MAJOR · The detail field truncates silently, has no counter, and permanently slices a line in half

**Evidence** — `h-20` is 80px; the computed line box is 22.96px desktop / 19.6px mobile.

```
textarea: { clientH: 78, visibleLines: 3.98, resize: "none", scrollH: 290, hiddenPx: 212 }
counterPresent: false
```

`3.98` lines. The fourth line is rendered **cut through its x-height** — visible in
`evidence/mobile-390-light-longname-overflow.png`, where "hundred characters and the control is
exactly" is sheared horizontally at the field's bottom edge. This is not an overflow condition; it
is the field's *resting geometry*: 80px is not a multiple of the line box, so a sliced line is
guaranteed the moment the fourth line exists.

Alongside: `maxlength="500"` with no counter and `resize-none`. At the mobile field width a legal
500-character detail needs ~13 lines and shows ~4. Nine lines of the user's own text are scrolled
out of view with no counter, no growth, no resize handle and no scroll affordance.

**Mechanism** — a fixed pixel height applied to a text control whose content is line-quantised.
Third breach of the "hand-rolled control" family (D-4).

**Cure** — `rows` (line-quantised by construction), `resize="content"` from the producer's own
`TextareaResize` union, and a counter that is part of the field, not decoration —
`LabeledField`'s `description` slot is the seam.

---

### D-9 · MAJOR · Mobile is a different, worse design that nobody drew

**Evidence** — measured at 390×844 (§2.3): `dialogRect {x:0, width:390}` with `borderRadius: 16px`;
header `text-center` while the body is left-aligned; footer `flex-col-reverse` putting **Report
above Cancel**, each 340px wide; description wraps to 2 lines
(`descLines: { h:40, lineHeight:"20px", lines:2 }`) and is centred.

**Mechanism** — every one of these is an inherited producer default the consumer never made a
decision about. `sm:max-w-md` (`:3`) is the *only* responsive statement in 101 lines, and it governs
width alone. VISUAL-CONSTITUTION §3 law 6 requires a deliberate mobile sequence; §3 law 7 forbids a
"desktop-tight/mobile-airy fork". The alignment axis flips, the action ordinal flips, and the
housing goes full-bleed — three forks, zero decisions.

**Cure** — one composition. Decide the mobile housing (inset card *or* bottom sheet — the producer
supports both via `DialogContent placement`), keep one text alignment, and fix the action order so
the commit does not change ordinal position across breakpoints.

---

### D-10 · MAJOR · Per-instance overrides on a root the author knew should own them — and two sibling dialogs with two different type laws

**Evidence** — `FlagReportDialog.vue:5-9`, the comment is a confession:

```vue
<!-- T.W4-6 (T-15/F7): the producer DialogTitle default is the body-voice
     `text-subheading` — the demo's dialog headers join the display voice
     (≤500 non-bold). Producer-root candidate recorded with the W4-6 sweep. -->
<DialogTitle class="font-display font-medium">Report Palette</DialogTitle>
```

Rendered: `<h2 class="text-subheading leading-none tracking-tight font-display font-medium">`,
computing to `20.352px / Fraunces / 500`. The producer-root candidate was *recorded* three tranches
ago and the per-instance patch shipped. Edict 5.

Meanwhile the description is left at the producer default and computes to **14px**, while the
option labels compute to **16.4px** (`text-small`):

```
titleFont: { fs:"20.352px", ff:"Fraunces", fw:"500" }
descFontSize:  "14px"       ← the actual question
labelFontSize: "16.4px"     ← the options
```

The question is *smaller* than its own answers. And `text-sm` is not a member of the closed type
matrix in VISUAL-CONSTITUTION §4 (`text-display` / `--type-title` / `--type-subheading` /
`text-heading` / `text-prose` / `text-small` / `text-mono-small`), which states the matrix "is
closed across all eighteen compositions."

The sibling in the same directory disagrees — `MigratePalettesDialog.vue:8-10`:

```vue
<DialogTitle class="font-display font-medium text-subheading">{{ title }}</DialogTitle>
<DialogDescription class="text-small font-display">{{ description }}</DialogDescription>
```

Two dialogs, one folder, two type jurisdictions for the same two roles.

**Cure** — the correction belongs at the producer root (the recorded candidate), and until it lands
the two dialogs must at minimum agree. Style at the root; never per instance.

---

### D-11 · MAJOR · There is no failure state, and no state that survives failure

**Evidence** — the component's entire state vocabulary is `reason`, `detail`, `submitting`
(`:86-88`). There is no `error`, no `invalid`, no retry, no `aria-invalid`, no error region. The
`RadioGroup` and the producer `Textarea` both expose `invalid` (`RadioGroup.vue.d.ts:13`,
`textarea/types.d.ts:10`); neither is used. `BrowsePane.vue:297-299` awaits the report and closes
the dialog unconditionally — an API rejection closes the dialog exactly like a success, having
already destroyed the user's input (D-2).

**Mechanism** — the same root as D-2: the component models a *fire*, not a *transaction*.
PROPORTION-AUDIT PR-08 (`ADD-AFFORDANCE`, primary W23) names this family.

**Cure** — one committed/failed/pending model owned by the dialog, expressed with the producer's
`invalid` + `errorLive` seams, with the input preserved across a failure.

---

### D-12 · MINOR · `paletteSlug` is a dead prop

**Evidence** — declared at `:68,71`, referenced nowhere:

```
$ grep -n "paletteSlug\|paletteName" demo/palettes/browser/dialog/FlagReportDialog.vue
11:                    Why are you reporting "{{ paletteName }}"?
68:const { open, paletteName, paletteSlug } = defineProps<{
70:    paletteName: string;
71:    paletteSlug: string;
```

The parent passes it (`BrowsePane.vue:171`) and then re-derives it itself
(`BrowsePane.vue:298`: `pm.flagged.report(flagPalette.value.slug, …)`). It is a required prop that
does nothing. Edict 3 (KISS, no contrivance).

**Cure** — delete it, or give it the job it should have had: identity (D-3).

---

### D-13 · MINOR · Non-idiomatic open plumbing, contradicted by its own sibling

**Evidence** — `:2` and `:68,74-77`:

```vue
<Dialog :open="open" @update:open="$emit('update:open', $event)">
```
```ts
const { open, paletteName, paletteSlug } = defineProps<{ open: boolean; … }>();
const emit = defineEmits<{ "update:open": [value: boolean]; … }>();
```

Five lines of manual two-way plumbing. `MigratePalettesDialog.vue:53` in the same folder:

```ts
const open = defineModel<boolean>("open", { default: false });
```

Edict 7 (idiomatic Vue 3.5). Also note the manual path is what makes D-3 invisible: with
`defineModel` the close transition is a single observable the component could have watched.

---

### D-14 · MINOR · ASCII straight quotes in a Fraunces/Plus-Jakarta typographic system

**Evidence** — `:11` `Why are you reporting "{{ paletteName }}"?`; measured
`quotesInDescription: ["\"", "\""]`. Straight double-primes in display prose, in a product whose
entire identity is typographic care. They also collide with any palette name containing a quote.

**Cure** — the subject is not a quotation; it is an identity. Render it as an emphasised span (or a
`<cite>`), not inside typewriter quotes.

---

### D-15 · MINOR · A 16 × 16 px close control

**Evidence** — measured: `{ text:"Close", w:16, h:16, x:903, y:279 }`. Producer-owned
(`DialogContent showClose`), but it renders here, it is 16px against the 44px floor the same
producer applies to the radios in the same dialog, and it is the *last* tab stop while being the
first thing the eye reaches (top-right). Relay to glass-ui BH per the standing BH/BI edict; record
as a consumer-visible defect.

---

### D-16 · MINOR · "Other" imposes no obligation

**Evidence** — `:83` `{ value: "other", label: "Other" }`; `:43` `:disabled="!reason || submitting"`.
Selecting *Other* and submitting sends `("other", undefined)` — a report with no information at all.
The detail field remains labelled "(optional)". A four-option taxonomy whose escape hatch carries
no payload is a moderation queue full of empty rows.

**Cure** — `Other` makes detail required; the producer's `requirement` prop on
`LabeledField`/`Label` is the declared seam.

---

### D-17 · MINOR · Ad-hoc, physical-direction, non-tokenised motion

**Evidence** — `:46` `<Loader2 v-if="submitting" class="mr-2 h-4 w-4 animate-spin" />`.
`animate-spin` is a raw Tailwind keyframe, not one of the demo's tokens
(`--animation-slide-sm/md/lg`, `demo/styles/animations.css`); `mr-2` is a **physical** margin in a
document that ships `dir="ltr"` plumbing and books RTL follow-ups
(`demo/color-picker/index.html` header comment, U-F58). Under reduced motion the global guard
freezes it to a static glyph rather than substituting a determinate state
(`demo/styles/animations.css:184-192`: `animation-duration: 0.01ms !important`).

All three are moot today only because D-2 makes the node unreachable — which is precisely why they
survived review. Producer `Button loading` replaces the whole line.

---

### D-18 · INFO · The component has never been judged against a rendered frame

Zero of the 60 captures in `docs/tranches/V/megatranche/audit/visual/REPORT.md` contain this
dialog; its only entry point is gated behind a reachable commons, and the commons is unreachable in
every captured matrix and on the live dev server. Every prior audit row about this file
(`t-card-color-census.md:93`, `Ad-interactive-states.md:201,242,247`,
`AdminUsersPanel/challenge-L-library…:202`) is a **code** read. `Ad-interactive-states.md:242` even
holds this file up as *"the correct pattern with a spinner"* — the spinner that D-2 proves never
paints. A design nobody has looked at is a design nobody has decided.

**Cure** — the state matrix (`visual/states.mjs`) must drive overlays directly, not only routes.
This dialog needs the eight rows in §4 captured across the four matrices before any wave claims it.

---

## 4. State coverage

Every state this component can occupy, and what it does:

| State | Designed? | Evidence |
|---|---|---|
| **empty** (open, nothing chosen) | partial | renders; but the question is unnamed to AT (D-6) and the gap rhythm mis-groups it (D-7) |
| **empty after a prior use** | **NO** | leaks the previous palette's reason + detail (D-3) |
| **populated** | yes | works |
| **focused (keyboard)** | partial | real `:focus-visible` gives a `0 0 0 2px rgba(255,236,238,.30)` glow + 8px blur on an 18px face — a 30 %-alpha ring, distinguished from *checked* only by hue |
| **focused (programmatic)** | **NO** | measured `FOCUS_DELTA_IS_ZERO` against an unfocused sibling: identical face bg, border, box-shadow, outline `none` |
| **hovered** | inherited | producer capsule hover on Cancel only; disabled Report has none |
| **pressed / active** | inherited | `tap-squish` from producer |
| **selected** | yes | accent-filled face |
| **disabled (Report)** | partial | `opacity: 0.5; cursor: not-allowed` and **no explanation** — a user who sees the greyed Report is told nothing about why |
| **loading / in-flight** | **NO** | unreachable; the real in-flight appearance is a blank reset form (D-2) |
| **error / rejected** | **NO** | does not exist (D-11) |
| **success** | **NO** | dialog is closed by the parent; no confirmation, no receipt, no "you reported X" |
| **overflowing / truncated (detail)** | **NO** | 212px hidden, no counter, `resize:none`, a permanently sliced 4th line (D-8) |
| **overflowing (palette name)** | **NO** | `paletteNameSchema = z.string().trim().min(1).max(100)` (`api/src/modules/palette/schema.ts:25`) — a legal 100-char name wraps the centred mobile description to 4+ lines and pushes the whole body down; no clamp, no `title`, no truncation |
| **dragging** | n/a | |
| **RTL** | **NO** | `mr-2` (`:46`) is physical; no logical-property use anywhere |
| **reduced-motion** | inherited | global guard freezes animation to 0.01ms; no determinate substitute |
| **forced-colors** | **UNVERIFIED — hypothesis** | not measured; `bg-background` / `border-input` / the glass surface and the 30 %-alpha focus glow are all at risk, but I did not run a forced-colors probe |
| **zoom 200 %** | **UNVERIFIED — hypothesis** | not measured; the `h-20` fixed height (D-8) makes a text-scale failure likely, but this is a hypothesis |

**Nine states are unhandled.** Four of them (`empty-after-prior-use`, `loading`, `error`, `success`)
are the four states a submission dialog exists to express.

---

## 5. Motion

- The only component-authored motion is `animate-spin` on a node that never mounts (D-2, D-17).
- It is not tokenised; the demo's tokens are `--animation-slide-sm/md/lg` and the global keyframes
  live in `demo/styles/animations.css`. `animate-spin` is a Tailwind default.
- `prefers-reduced-motion` is handled only by the blunt global guard
  (`demo/styles/animations.css:184-192`), which reduces a spinner to a frozen glyph rather than to a
  determinate state — VISUAL-CONSTITUTION §6: *"Reduced motion resolves directly to the final
  geometry and stable chromatic state."* A frozen spinner is neither.
- It animates `transform` (compositor-safe); no layout-forcing property is animated. Nothing to
  report there.
- The dialog's own enter/exit is producer-owned (`glass-reveal glass-floating`, spring preset) and
  correctly carved out of the guard (`animations.css:200-211`). That part is fine.

---

## 6. Design-system boundary

Four hand-rolls, four existing producer primitives, in `@mkbabb/glass-ui@7.0.0`:

| Hand-rolled here | Producer primitive that already exists | Evidence |
|---|---|---|
| `<textarea class="h-20 rounded-input border …">` (`:29-34`) | `Textarea` — `size,rows,resize,invalid,maxlength,required,disabled` | `dist/forms.d.ts:2`; `components/textarea/types.d.ts` |
| `<label class="text-small">` + no group name (`:23`, `:16`) | `LabeledField` — `label,description,requirement,errorLive,invalid` + `controlLabelable` for composite roots | `dist/labeled-field.d.ts`; `components/labeled-field/types.d.ts` |
| `Loader2 + submitting` (`:46,88`) | `Button loading` | `components/button/Button.vue.d.ts:15` |
| `variant="outline" / "destructive"` (`:38,41`) | `emphasis` × `tone` | `Button.vue.d.ts:6-19`; `_shared/axes.d.ts:17` |

Plus two per-instance overrides of roots that should own the decision: `DialogTitle` (`:9`, with the
source comment admitting the producer-root candidate was already recorded) and `DialogContent`
`sm:max-w-md` (`:3` — the producer exposes `surface/placement/motion/stage/backdrop/scroll` but **no
size axis**; that gap is a legitimate BH relay, the override is not a legitimate cure).

Per the standing BH/BI relay edict, two items belong in the glass-ui inbox and not in a value.js
wave: the 16×16 `DialogContent` close control (D-15), and a `DialogContent` size axis so
`sm:max-w-md` stops being hand-applied at seven call sites.

---

## 7. Judgement against the canon

| Canon | Clause | Verdict |
|---|---|---|
| VISUAL-CONSTITUTION §2 | "One surface has one tier … Glass earns its blur by revealing live content; otherwise it is a neutral well." | **FAIL** — the textarea is an opaque plate (light) / near-black hole (dark) inside a glass overlay; it reveals nothing and is the highest-contrast object present (D-4) |
| §4 (type matrix, "closed across all eighteen compositions") | prose/help → `text-prose`; control/label → `text-small` | **FAIL** — description computes to `14px` (`text-sm`, not a member); labels compute to `16.4px`; help is smaller than the controls it introduces (D-10) |
| §4.1 | "Selected, failed, pending, withdrawn and disabled states are never color-only. Role, accessible name, state/value and associated error/status are explicit." | **FAIL** — no group name (D-6); disabled Report carries no explanation; failed and pending do not exist (D-2, D-11) |
| §4.1 | "Focus remains visibly distinct from selection in both schemes, forced colors and reduced transparency." | **FAIL in one arm** — a 30 %-alpha 2px glow on an 18px face is distinguished from *checked* by hue alone; programmatic focus has a measured **zero** delta |
| §5 | "Commit uses one glass-ui action set." · "Persistent operation state stays with the entity/workspace. A transient flourish may celebrate success but never carries the only truth." | **FAIL** — commit and dismiss are the same rendered object (D-1); there is no operation state at all (D-2, D-11) |
| §3 law 6 / law 7 | one mobile sequence; no desktop/mobile fork | **FAIL** — alignment axis, action ordinal and housing all fork at 640px with no decision (D-9) |
| §6 | "Reduced motion resolves directly to the final geometry and stable chromatic state." | **FAIL (latent)** — a frozen spinner (D-17); latent only because the node is unreachable |
| PROPORTION-AUDIT §5 law 3 | title gap vs section gap | **FAIL** — 24px question→options vs 12px options→detail; grouping inverted (D-7) |
| PROPORTION-AUDIT §5 law 7 | "Visual glyph size, operable target size and layout reservation are separate quantities." | **FAIL** — 18px glyph, 44px seat, 31px pitch → 13.05px overlap ×3 (D-5) |
| PROPORTION-AUDIT PR-08 | "Pending/failure/export/recovery truth only transient → ADD-AFFORDANCE" | **FAIL** — named this family in formation; nothing landed (D-2, D-11) |
| PROPORTION-AUDIT PR-12 | "Touch padding bloats/misaligns visual glyphs → TIGHTEN" | **FAIL** — this is a measured instance (D-5) |
| PALETTE-CONTRACT | no palette-N rendering surface; already certified clean | **PASS** — `om-16-palette-scalability/SCALABILITY-AUDIT.md:54` lists `FlagReportDialog.vue` among surfaces confirmed clean, and I found nothing to disturb that |
| Edict 1 (no god modules) | | **PASS** — 101 lines, one job |
| Edict 2 (no legacy) | | **FAIL** — `variant` is a retired API kept alive as a dead attribute (D-1) |
| Edict 3 (KISS) | | **FAIL** — a required prop that does nothing (D-12) |
| Edict 4 (glass-ui is the design system) | | **FAIL** — four hand-rolls over four existing primitives (§6) |
| Edict 5 (root-level styling) | | **FAIL** — `DialogTitle` and `DialogContent` per-instance overrides, one of them self-documented as a producer-root candidate (D-10) |
| Edict 6 (animations never deleted) | | **PASS** — nothing deleted |
| Edict 7 (idiomatic Vue 3.5) | | **FAIL** — manual `:open`/`$emit` where the sibling uses `defineModel` (D-13) |
| Edict 8 (`verbatimModuleSyntax`) | | **PASS** — all six imports are value imports; no type-only import is mis-declared |

---

## 8. Mechanism families — and the one gestalt cure

The eighteen defects reduce to **four mechanisms**:

- **M-1 · A retired vocabulary kept alive by silent prop fallthrough.** D-1, and the same disease in
  `MigratePalettesDialog`. Vue forwards unknown props to the host; a dead design axis therefore
  compiles, typechecks and tests green while rendering nothing. *Nothing in the toolchain can catch
  this — only a rendered-frame gate can.*
- **M-2 · The component models a fire, not a transaction.** D-2, D-3, D-11, D-16, and half of D-12.
  Because it has no notion of an operation with an owner, a lifetime and an outcome, it cannot have
  a pending state, an error state, a success state, or a reason to clear itself.
- **M-3 · Host elements and utility classes where the design system has primitives.** D-4, D-5,
  D-6, D-8, D-17, and D-10's overrides. Each hand-roll is a per-instance override that no root
  correction can ever reach.
- **M-4 · Inherited defaults mistaken for decisions.** D-7, D-9, D-10, D-15, D-18. Producer defaults
  for alignment, action order, gaps, type and housing were never chosen — and, per D-18, never
  looked at.

**The cure is not eighteen patches.** It is one architectural transposition:

> **`FlagReportDialog` becomes a composed glass-ui form, and the report becomes an operation the
> dialog owns.**
>
> - The body is `LabeledField`(legend) → `RadioGroup`/`RadioGroupItem` → `LabeledField`(detail) →
>   `Textarea`. Every gap, target, name, label, requirement, counter, `invalid` and error region
>   then comes from the producer, and M-3 disappears with the last utility class. (D-4, D-5, D-6,
>   D-7, D-8, D-16.)
> - The footer is `Button emphasis="quiet"` + `Button emphasis="primary" tone="destructive"
>   :loading="pending"`. M-1 disappears with the last `variant`. (D-1, D-17.)
> - The dialog owns a `pending | committed | failed` model over the parent's promise, holds its
>   input until commit, clears on invocation identity (`:key="paletteSlug"`), and surfaces failure
>   through `invalid`/`errorLive`. M-2 disappears. (D-2, D-3, D-11, D-12.)
> - `defineModel("open")` replaces the manual plumbing. (D-13.)
> - One composition is drawn for both breakpoints — one alignment, one action order, one housing —
>   and captured in the states matrix across all four matrices before it is called done. M-4
>   disappears. (D-9, D-10, D-18.)
>
> At the end the file is *shorter* than 101 lines and every remaining line is a domain decision:
> the four reasons, the question, the two verbs.

Two items leave the repo as producer asks (BH relay): a `DialogContent` size axis, and the 16×16
close control.

---

## 9. Hypotheses (labelled — no reproduction)

- **H-1 · The dialog may open with a reason pre-selected.** In one settled 900 ms observation the
  dialog reported `ariaChecked: ["true","false","false","false"]`, `dataState[0]: "checked"` and
  `reportDisabled: false` immediately on open, with `reason = ref("")` in source — i.e. the model
  had been written to "inappropriate" without a user act, arming a one-keystroke false report.
  I could **not** reproduce it deterministically: a real keyboard `Tab` into the group lands on
  `reason-inappropriate` with `aria-checked="false"` and Report disabled, and an explicit
  `radiogroup.focus()` does not check either. Mechanism unknown (a focus-arrival path in the
  producer's roving group is the suspicion). **Hypothesis.** It is worth a deterministic probe
  because the consequence — an unchosen moderation report — is severe.
- **H-2 · forced-colors.** Not measured. `bg-background`, `border-input`, the glass surface and a
  30 %-alpha focus glow are all plausible failures under Windows HCM. **Hypothesis.**
- **H-3 · 200 % zoom / text scaling.** Not measured. `h-20` as a fixed pixel height on a text
  control (D-8) makes clipping likely as the line box grows. **Hypothesis.**

---

## 10. Evidence index

| Path | What it shows |
|---|---|
| `evidence/desktop-light-empty.png` | in-situ, 1440×900 light, resting state over the live app |
| `evidence/desktop-light-checked-report-enabled.png` | Cancel ≡ Report with Report enabled; two "marked" radios (focus vs checked) |
| `evidence/dark-focus-first-radio.png` | the near-black textarea plate; Cancel reading as primary; the focus ring |
| `evidence/mobile-390-light-longname-overflow.png` | centred header over left body; Report above Cancel; full-bleed radiused box; the sliced 4th line |
| `evidence/probe-console.js` | the mount + measurement harness; paste into the dev-server console to reproduce every number above |

Source coordinates cited: `demo/palettes/browser/dialog/FlagReportDialog.vue:2-3,5-12,15-16,22-23,29-34,37-49,68-77,79-100`
· `demo/palettes/BrowsePane.vue:167-174,288-300` ·
`demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:142-150` ·
`demo/palettes/browser/dialog/MigratePalettesDialog.vue:8-10,19,26,32,53` ·
`demo/styles/animations.css:184-211` · `api/src/modules/palette/schema.ts:25` ·
`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19` ·
`node_modules/@mkbabb/glass-ui/dist/components/_shared/axes.d.ts:17` ·
`node_modules/@mkbabb/glass-ui/dist/components/textarea/types.d.ts` ·
`node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts` ·
`node_modules/@mkbabb/glass-ui/dist/components/radio-group/RadioGroup.vue.d.ts` ·
`node_modules/@mkbabb/glass-ui/dist/forms.d.ts:2`.

No source file was edited by this seat. Writes are confined to
`docs/tranches/V/megatranche/audit/components/FlagReportDialog/`.
