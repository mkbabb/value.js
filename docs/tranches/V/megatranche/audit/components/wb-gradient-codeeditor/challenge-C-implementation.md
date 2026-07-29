# CHALLENGE-C — `GradientCodeEditor.vue` · implementation

**Subject** `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines)
**Route** `http://localhost:9000/#/gradient` · **Repo** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` @ `c654824e`
**Date** 2026-07-28 · **Seat** Challenge-C (implementation), mega-tranche per-component band

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
variant, declared explicitly at spawn by the orchestrating workflow. The declaration is present, not
inherited: my system context names `Opus 5 (1M context)` / `claude-opus-5[1m]`. No undeclared or
inherited seat. Sole seat-holder for this file's C challenge; no jury.

---

## Verdict — **DEFECTIVE**

The premise holds. This is a 117-line file and it carries **one BLOCKER, five MAJORs, three MINORs
and one vacuous-gate finding**. The BLOCKER is not theoretical: typing a nine-character string that
every user of a colour tool types mid-thought **destroys the entire application workspace** and
every piece of gradient work in it, with no recovery short of a full reset.

| id | sev | defect | repro |
|---|---|---|---|
| **C1** | **BLOCKER** | Feeding `oklch()` into the editor kills the **whole two-pane workspace** (App-level ErrorBoundary) and unrecoverably discards all authored gradient state; the component's own verdict surface never fires | YES `[R1, R1b, R1c, state-loss]` |
| **C2** | MAJOR | The 500 ms debounce is **never cancelled on unmount** — the crash detonates on a *different route* the user has already navigated to | YES `[R6]` |
| **C3** | MAJOR | Blur inside the debounce window **destroys the user's in-progress text** and leaves the verdict naming a token that is no longer on screen — a direct breach of the file's own stated law (lines 34–40) | YES `[R2 + R2-control]` |
| **C4** | MAJOR | `textContent` **collapses line breaks**: multi-line authoring silently fuses tokens (`red` ⏎ `50%` → `red50%`) and rejects valid CSS | YES `[R3]` |
| **C5** | MAJOR | a11y: `aria-invalid` with **no** `aria-errormessage`/`aria-describedby`; verdict has no `id`; the live region is `v-if`-mounted *with* its content (announcement race); `role="textbox"` with no `aria-multiline` | YES `[R4]` |
| **C6** | MAJOR | Hand-rolled field chrome duplicating glass-ui's `field-control` primitive, **measurably divergent** (8px vs `--radius-field` 1rem; transparent vs `--input-on-glass`; 1px vs 1.5px; Tailwind ring vs `--focus-ring-shadow`/`--invalid-ring`) + a per-instance inline `transition` — MT-F037 family | YES `[tokens]` |
| **C7** | MAJOR | **Vacuous gate**: zero tests touch this component; the exact mutation that deletes the editor-truce mechanism keeps all 19 unit + 9 e2e tests green | YES `[named below]` |
| **C8** | MINOR | Rich-HTML paste injects foreign markup + inline styles straight into the editor DOM | YES `[paste-probe]` |
| **C9** | MINOR | `highlight()`'s `catch { return code }` is a masking fallback that would feed **unescaped** text into `innerHTML` | NONE (latent — shape confirmed, reachability is a hypothesis) |
| **C10** | MINOR | Every model tick tears down and rebuilds the editor's whole subtree via `innerHTML` (40 records / 40-step drag), destroying the native undo stack and any selection | YES `[R5]` — cost measured and **downgraded**: 0.014–0.020 ms/highlight |
| **C11** | INFO | The readout the editor displays carries 12-decimal channel values — **cited, not re-found** (OM-14 family; source is the serializer, not this file) | — |

**Strongest defect: C1.**

---

## C1 — BLOCKER · `oklch()` in the editor destroys the entire workspace

### What the user does

Types a gradient with an OKLCH stop. The instant the parser sees the empty-argument form — which
exists for ~200 ms of every hand-typed `oklch(…)`, and permanently if the user pauses — the app dies.

### Reproduction (live, `http://localhost:9000/#/gradient`)

`docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/live-probe.mjs`
→ `node docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/live-probe.mjs`

```json
{ "tag": "R1-before",
  "editorPresent": 1,
  "editorText": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
  "stopHandles": 2, "easingHeading": 1, "errorBoundaryVisible": 0 }

{ "tag": "R1-after: typed linear-gradient(90deg, oklch(), blue), 1.8s past last keystroke",
  "editorPresent": 0,
  "editorText": null,
  "verdict": null,
  "errorBoundaryVisible": 1,
  "errorBoundaryText": "This panel hit an unexpected error.Cannot read properties of undefined (reading 'replace') Try again",
  "stopHandles": 0,
  "easingHeading": 0,
  "pageErrors": [], "consoleErrors": [] }
```

**The exact mid-typing sequence a real user produces** — `rgb(` then `)` then closing the gradient's
own paren — is R1c, and it shows the cliff edge precisely:

```json
{ "tag": "R1c-partial: 'rgb()' with the gradient paren still unclosed",
  "editorPresent": 1, "editorClass": "border-destructive",
  "verdict": "unparseable color \"rgb(\"", "stopHandles": 2 }        ← graceful

{ "tag": "R1c-closed: user closes the gradient paren",
  "editorPresent": 0, "verdict": null, "errorBoundaryVisible": 1,
  "errorBoundaryText": "…Cannot read properties of undefined (reading 'replace')…" }   ← dead
```

### What the user sees

`evidence/R1-oklch-empty-crash.png`. The `<main>` landmark's entire two-pane grid is gone. DOM
forensics (`evidence/crash-forensics.mjs`) on the crashed page:

```json
"after": { "mainChildren": 1, "gradientDom": 0, "navPresent": true, "dockButtons": 16,
           "boundaryRole": "alert", "boundaryAriaLive": "assertive",
           "focused": "DIV/vj-error-boundary flex flex-col items-ce",
           "boundaryChildren": [
             { "tag": "P", "text": "This panel hit an unexpected error.", "color": "rgb(28, 25, 23)", "opacity": "1", "visibility": "visible" },
             { "tag": "P", "text": "Cannot read properties of undefined (reading 'replace')", "visibility": "visible" },
             { "tag": "BUTTON", "text": "Try again" } ] }
```

So the boundary itself is well-built (role=alert, assertive, focus moved into it) — but it is
`App.vue:50`, wrapping the **whole** `<main>` grid (`App.vue:47`–`140`). The blast radius is *both*
panes: the gradient workbench **and** the palettes pane beside it.

*(Honesty note: the headless PNG shows only the "Try again" pill, with the two message paragraphs
missing. The computed styles above prove the text is visible with `opacity: 1`, dark ink on the light
plate. The missing glyphs are a headless-capture artifact — **not** a finding. I am not filing it.)*

### The work it destroys

`evidence/state-loss.mjs` — author a 4-stop gradient first, then crash, then press the only exit:

```json
{ "authored":   { "stops": 4, "css": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(71.5…% …) 34.5%, oklch(67.9…% …) 71.1%, oklch(0.65 0.18 265) 100%)" },
  "crashed":    { "boundary": true, "stops": 0 },
  "afterRetry": { "stops": 2, "css": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)" } }
```

Four authored stops → two. **All gradient work is gone**: stops, positions, per-interval easing
curves, direction, interpolation space. And leaving the route does not help — R1b:

```json
{ "tag": "R1b: left to #/mix and came back to #/gradient after the crash",
  "editorPresent": 0, "errorBoundaryVisible": 1, "stopHandles": 0 }
```

The boundary is sticky across hash navigation. The only exits are "Try again" (which resets) or a
page reload (which also resets).

### Mechanism — file:line

1. `GradientCodeEditor.vue:59-62` — `onInput` reads the text and hands it to `debouncedParse`.
2. `GradientCodeEditor.vue:55-57` — `debounce(…, 500)` emits `parse` from inside a `setTimeout`.
3. `GradientVisualizer.vue:102-108` — `onParseCSS` calls `applyCSS(css)` and **only then** assigns
   `parseVerdict.value`.
4. `useGradientModel.ts:158-168` → `gradientParse.ts:230` `isColorToken()` → `gradientParse.ts:92-94`
   `parseCssColor(token).ok`.
5. `src/css/grammar.ts:181` — `splitTopLevel(slash[0]!.replace(…))`. The `!` is false: for an empty
   body `splitTopLevel` returns `[]`, so `slash[0]` is `undefined`. **TypeError.**

Confirmed at the module level, all ten empty-argument forms
(`evidence/parse-probe.ts`, `npx tsx docs/…/evidence/parse-probe.ts`):

```
COLOR THROW "oklch()"  -> TypeError: Cannot read properties of undefined (reading 'replace')
COLOR THROW "rgb()"    -> TypeError: …    COLOR THROW "hsl()"   -> TypeError: …
COLOR THROW "lab()"    -> TypeError: …    COLOR THROW "lch()"   -> TypeError: …
COLOR THROW "color()"  -> TypeError: …    COLOR THROW "oklab()" -> TypeError: …
COLOR THROW "hsl(  )"  -> TypeError: …    COLOR THROW "hwb()"   -> TypeError: …
COLOR THROW "rgba()"   -> TypeError: …
GRAD THROW "linear-gradient(90deg, oklch(), blue)"              -> TypeError: …
GRAD THROW "linear-gradient(90deg, oklch(0.7 0.1 200), rgb())"  -> TypeError: …
GRAD THROW "linear-gradient(90deg, red, hsl(  ))"               -> TypeError: …
GRAD THROW "linear-gradient(oklch())"                           -> TypeError: …
```

Note `hwb()` and `rgba()` — **two forms beyond MT-F001's registered eight**. The registry names 8;
the mechanism is the single `slash[0]!` and it fires for *every* functional colour name the demo
can type. Worth an MT-F001 amendment.

### Why this is a *component* defect, not only a library one

`GradientCodeEditor` is the app's only user-typed-CSS ingress. Its docblock (lines 20–24, 34–40,
102–103) promises a total contract — *"`null` = the last parse applied; a string = the explicit
rejection reason"*, *"parse failure is LOUD"*, *"never a silent partial apply"*. But the `parse`
emit is unguarded: the **third** outcome — the oracle throwing — has no representation in the
component's model, so the destructive border never appears, the verdict stays `null`, and the throw
walks up into Vue's error propagation instead. The component ships a two-valued failure model over a
three-valued reality.

`pageErrors: []` and `consoleErrors: []` in every capture above. The boundary swallows it. **A
"zero console errors" e2e gate cannot see this crash** — which is exactly why the visual audit
records `pageErr 0 · consoleErr 0` for `/#/gradient`
(`audit/visual/REPORT.md:125`): the crash needs a keystroke, and the static capture never types.

### Proposed cure (gestalt, not patch)

1. **Root**: land the ruled total parser — `registry/adjudicated/parser-band.md` (cand-O). `parseCssColor`
   must be a *total* function `string → Result`. That kills the family, not the instance.
2. **Component**: the `parse` channel becomes total by construction. The debounced callback is the
   editor's own boundary — the emit either carries a text that the parent answers with a verdict, or
   the editor renders its own verdict for an oracle that misbehaved. Concretely, the verdict type
   grows its third case and the parent's `onParseCSS` returns one for a throw as well as a reject, so
   the destructive border and the Fira line are the *only* possible failure surface. A user typo must
   never be able to reach an error boundary.
3. **Never** a bare `try/catch` around the emit that swallows to `null` — that is the masking
   fallback edict 2 forbids, and it is exactly the disease `shell-dock-colorinput`'s D-23 already
   documents (a shipping `TypeError` and a user typo rendering as the same sentence).

---

## C2 — MAJOR · The pending debounce is never cancelled on unmount

`debounce` in `demo/shared/utils.ts:24-44` *exposes* `.cancel()`. `GradientCodeEditor.vue` has **no**
`onBeforeUnmount`/`onUnmounted` hook at all — grep the file: the only lifecycle hook is
`onMounted` at line 81.

### Reproduction (R6 in `live-probe.mjs`) — type the crash text, then leave the view immediately

```json
{ "tag": "R6: navigated away inside the 500ms debounce window",
  "url": "http://localhost:9000/#/mix",
  "errorBoundaryVisible": 1,
  "errorBoundaryText": "This panel hit an unexpected error.Cannot read properties of undefined (reading 'replace') Try again" }
```

`evidence/R6-unmount-pending-debounce.png`. **The user is on `#/mix` and the Mix workbench is the
thing that dies.** The timer outlived the component, fired into a retained handler, and detonated on
a route the user never typed into. A user who never sees the gradient tool again gets the crash.

Even without C1 the leak stands on its own: a post-unmount `emit("parse")` runs a full parse and
writes into a dead model, every time a user leaves the gradient view within 500 ms of a keystroke.

**Cure**: the debounced call is a resource; it is created in `setup` and must be released there —
`onBeforeUnmount(() => debouncedParse.cancel())`. (Better still: `useDebounceFn`/`watchDebounced`
from `@vueuse/core` — already a dependency — whose scope-bound cleanup makes the leak
unrepresentable rather than remembered.)

---

## C3 — MAJOR · Blur inside the debounce window eats the user's work

The file's central law, lines 34–40:

> *"The editor NEVER rewrites the user's text while it has focus … A failed parse keeps the user's
> text verbatim alongside the verdict — **WIP is never destroyed**."*

It is broken by its own `onBlur` (lines 68–73):

```ts
function onBlur() {
    focused.value = false;
    if (!hasError.value) render(modelValue);      // ← reads a prop that has not landed yet
}
```

`hasError` (line 32) derives from `parseVerdict`, a prop the parent sets **500 ms later**, after the
debounce fires. At blur time it still holds the *previous* parse's answer. This is the repo's own
named hazard — the async parent round-trip returning a stale read — applied to a prop instead of a
`defineModel`, and cured nowhere.

### Reproduction + control (R2 / R2-control in `live-probe.mjs`)

Type `linear-gradient(90deg, notacolor, blue)`, then click away *immediately*:

```json
{ "tag": "R2: garbage typed then blurred INSIDE the 500ms debounce window",
  "editorText": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
  "editorClass": "border-destructive",
  "verdict": "unparseable color \"notacolor\"" }

{ "tag": "R2-control: same garbage, NO blur",
  "editorText": "linear-gradient(90deg, notacolor, blue)",
  "editorClass": "border-destructive",
  "verdict": "unparseable color \"notacolor\"" }
```

The control isolates the mechanism: the *only* difference is the blur. In the defect case the
editor shows the **old canonical model text**, wears the destructive border, and prints a verdict
naming `notacolor` — a token that is nowhere on screen. The user's typing is gone and the error
message is about something invisible.

**Cure**: blur is an authoring boundary, so it must *resolve* the pending parse, not race it. On
blur, **flush** the debounce (parse now, synchronously), then settle the text on the verdict that
answers *this* text. The canonical Vue-3.5 shape the repo already mandates: a local `shallowRef`
mirror of the verdict written by the same tick that decides it, so `onBlur` never reads a prop the
parent has not yet written.

---

## C4 — MAJOR · `textContent` collapses line breaks; multi-line authoring corrupts the parse

`onInput` (line 60) reads `editorRef.value?.textContent`. In a `contenteditable`, Enter inserts a
block element; `textContent` concatenates block boundaries **without** a newline.

### Reproduction (R3 in `live-probe.mjs`) — type `linear-gradient(90deg, red`, Enter, `50%, blue)`

```json
{ "tag": "R3: Enter pressed mid-declaration",
  "editorText": "linear-gradient(90deg, red50%, blue)",
  "editorClass": "border-destructive",
  "verdict": "unparseable color \"red50%\"",
  "dom": {
    "innerHTMLTail": "linear-gradient(90deg, red<div>50%, blue)</div>",
    "textContent":   "linear-gradient(90deg, red50%, blue)",
    "innerText":     "linear-gradient(90deg, red\n50%, blue)"
  } }
```

The user sees `red` and `50%` on two lines; the parser is handed `red50%`. Valid CSS is rejected
with a message quoting a token the user never wrote. The element is styled `whitespace-pre-wrap`
(line 93) and sized `min-h-[5rem] max-h-[12rem] overflow-y-auto` — it *invites* multi-line
authoring, which is how anyone writes a four-stop gradient.

Note `innerText` in the same probe: `"linear-gradient(90deg, red\n50%, blue)"` — the correct read is
one property away and already computed by the browser.

**Cure**: read `innerText` (the rendered-text semantics that match what the user sees), or — better,
and it also cures C8 — stop hand-rolling a text editor over `contenteditable="true"`: use
`contenteditable="plaintext-only"`, where line breaks are real `\n` and `textContent` is honest.

---

## C5 — MAJOR · The failure surface is announced to nobody

Measured on the live error state (R4 in `live-probe.mjs`):

```json
{ "tag": "DIV", "role": "textbox",
  "ariaMultiline": null,
  "ariaInvalid": "true",
  "ariaDescribedby": null,
  "ariaErrormessage": null,
  "contenteditable": "true",
  "verdictInDom": true, "verdictId": "", "verdictRole": "status", "verdictAriaLive": null,
  "borderRadius": "8px", "fontSize": "16.4px" }
```

Four distinct defects in that one object:

1. **`aria-invalid="true"` with no `aria-errormessage` / `aria-describedby`, and the verdict has no
   `id`** (`verdictId: ""`). A screen-reader user focused on the field is told *"invalid"* and is
   never told **why**. The reason is a `<p>` sitting outside the accessibility relation.
   `grep -rn "aria-describedby\|aria-errormessage" demo` returns **zero hits app-wide** — this is
   the local instance of an app-wide gap.
2. **The live region is created at the same moment as its content.** `v-if="parseVerdict"`
   (line 108) mounts the `role="status"` node *and* its text in one patch. A live region that does
   not exist before the change is unreliably announced by AT. The repo already has the right idiom
   in `demo/palettes/browser/admin/PaginationBar.vue:17` — a permanently-mounted
   `aria-live="polite" aria-atomic="true"` span whose *content* changes. This file deviates from an
   established in-repo pattern.
3. **`role="status"` (implicit polite) for a destructive event.** The house register for a failure
   of this class is `role="alert" aria-live="assertive"` — `demo/color-picker/ErrorBoundary.vue:19-20`,
   with a written rationale. Two failure surfaces in the same repo, two politenesses.
4. **`role="textbox"` with no `aria-multiline="true"`** while the control is de facto multi-line
   (R3 proves Enter inserts a line; the box scrolls to 12rem). Per ARIA, `textbox` defaults
   `aria-multiline="false"`, so AT announces a single-line edit field and offers the wrong reading
   and editing affordances.

Not a finding, recorded for the visual seat: this component contributes **zero** rows to the
`/#/gradient` tap-target list. The six small targets in `audit/visual/REPORT.json` are the two
`Gradient stop at …%` handles (20×20) and four slug-bar controls — none is the code editor. Also
note the audit probe counts `input` elements; a `role="textbox"` div is invisible to it, so this
editor's a11y state is *structurally unreachable* by the current sweep — a probe blind spot worth
handing to the visual band.

**Cure**: consume the glass `LabeledField` (see C6). It hands the slot `controlId`, `labelledBy`,
`describedBy`, `errorId`, `invalid` and owns an `error` slot with an `errorLive` politeness prop —
i.e. it makes every one of the four defects above unrepresentable, rather than fixing them by hand
in one file while the other 87 keep the gap.

---

## C6 — MAJOR · Hand-rolled field chrome where the glass primitive exists (MT-F037 family)

Line 93 is a per-instance reimplementation of the design system's field:

```
class="hljs text-mono-small leading-relaxed p-3 rounded-lg glass-wash border min-h-[5rem]
       max-h-[12rem] overflow-y-auto scrollbar-thin whitespace-pre-wrap break-all outline-none
       focus-visible:ring-2 focus-visible:ring-ring/40"
:class="[hasError ? 'border-destructive' : 'border-border/40']"
:style="{ transition: `border-color var(--duration-normal) …, box-shadow …` }"    ← lines 95-97
```

### Glass census (as the owner mark instructs), `@mkbabb/glass-ui@7.0.0` installed dist

| export | component | evidence |
|---|---|---|
| `@mkbabb/glass-ui/forms` | `Input`, `Textarea`, `Combobox`, `useUserInvalidAria` | `dist/forms.d.ts` |
| `@mkbabb/glass-ui/labeled-field` | `LabeledField`, `LabeledInput`, `LabeledSelect`, `LabeledSlider`, `LabeledSwitch` | `dist/components/labeled-field/index.d.ts` |

`Input` renders (`dist/Input-9BlLluik.js`):

```js
class: c(e)("field-control glass-defined", h.class)
"data-slot": "input", "data-kind": "input", "data-size": i.size,
"data-state": c(y), "aria-invalid": c(_)
```

and `.field-control` in `dist/glass-ui.css` owns the entire contract this file re-implements:

```css
.field-control{--field-control-height:var(--control-h-md);--control-surface-bg:var(--input-on-glass);
  border:1.5px solid var(--control-surface-border);background:var(--control-surface-bg);
  backdrop-filter:var(--glass-cell-backdrop-filter,var(--control-surface-blur));
  box-shadow:var(--glass-rim-top),var(--glass-rim-bottom);…}
.field-control[data-kind=textarea]{min-block-size:max(5lh,calc(5rem*var(--ui-scale)));
  border-radius:var(--radius-field);padding-block:calc(.75rem*var(--ui-scale));overflow:auto}
.field-control:focus-visible{border-color:…;box-shadow:var(--focus-ring-shadow);outline:none}
.field-control:is(:user-invalid,[data-state=invalid]){
  --control-surface-bg:color-mix(in srgb,var(--destructive) 8%,var(--input-on-glass));
  border-color:var(--destructive)}
.field-control:is(:user-invalid,[data-state=invalid]):focus-visible{box-shadow:var(--invalid-ring)}
```

### Measured divergence (`evidence/tokens.mjs`, live)

```json
{ "radiusField": "1rem",  "editorRadius": "8px",
  "inputOnGlass": "hsl(36 40% 92%)", "editorBg": "rgba(0, 0, 0, 0)",
  "editorBorder": "oklab(0.779404 0.0118501 0.0342689 / 0.4) / 1px",
  "focusRingShadow": "0 0 0 2px color-mix(in srgb, oklch(47.1…% 0.188… 9.83…",
  "invalidRing": "0 0 0 2px color-mix(in srgb, light-dark(hsl(0 72% 50%), hsl(0 80% 60%)) 35%, tra…" }
```

- radius **8px** against the house field radius **1rem/16px** — exactly half (the OM-4 radius-incoherence family, measured here);
- background **fully transparent** where every other field in the app sits on `--input-on-glass` (`hsl(36 40% 92%)`);
- border **1px @ 40% alpha** against the house **1.5px** `--control-surface-border`;
- focus ring is Tailwind `ring-2 ring-ring/40`, **not** `--focus-ring-shadow`;
- invalid state is `border-destructive` alone — **no** `--invalid-ring`, **no** destructive surface tint.

So the app's single most code-like field looks and behaves unlike every other field in it. That is
the same mechanism the owner marked at `audit/visual/owner-marked/OM-13-easing-readout-not-glass-input.png`
— which lives in this component's sibling, `GradientEasingEditor.vue:176`
(`class="readout-rail flex items-center gap-1.5 rounded-md bg-well px-2 py-1"`). **Same family, two
files, one workbench.**

The inline `:style` transition (lines 95–97) compounds it: a per-instance style override for a
property the root primitive should own — edict 5, violated in the literal.

### Disposition — a marked glass-forward ask, never a local restyle

Neither `Input` (a bare `<input>`, `data-kind=input`, pill radius) nor `Textarea` (a bare
`<textarea>`) can host syntax-highlighted rich content or a trailing icon row. `.field-control` is
class-and-`data-kind` driven and therefore *technically* wearable by any element — but reaching into
a dist class from `demo/` is not consuming the design system, it is copying it with extra steps.

**The ask** (to glass-ui, per the standing BH/BI relay): a `field-control` **shell** variant —
`data-kind="code"` or a `Field`/`Textarea` `asChild`/slot form — that owns surface, radius, rims,
focus ring, `data-state=invalid` and its ring, and accepts an arbitrary editable child (a
`contenteditable`, an icon-trailing row). That one primitive cures this file, the OM-13 readout rail,
and every future code-shaped field at once. Until it lands, **no local restyle**: touching
`rounded-lg`/`border-destructive` here just moves the divergence.

---

## C7 — MAJOR · Vacuous gate: the component's central invariant is untested

**Component tests: none.** `grep -rln "GradientCodeEditor\|gradient-parse-verdict" test/ e2e/ demo/`
returns only the two `.vue` files themselves, `demo/styles/hljs.css`, and
`e2e/smoke/views/gradient.spec.ts`. `test/gradient-parse.test.ts` has 19 tests — all of them against
`parseGradientCSS`, a *sibling module*. Not one line of `GradientCodeEditor.vue` is unit-tested.

### The exact mutation that keeps every gate green

**Delete the editor truce.** Remove `focused`, `onFocus`, `onBlur`, the `@focus`/`@blur` bindings,
and the `if (focused.value) return;` guard — i.e. delete lines 41, 64–73, 77 and template lines
99–100, leaving the watcher unconditional:

```ts
watch(() => modelValue, (newVal) => render(newVal));
```

That deletes the mechanism the file's 7-line docblock (lines 34–40) exists to protect — the editor
now rewrites the user's text under their caret mid-authoring. **All 19 unit tests pass** (they never
import the component). **All 9 e2e tests pass**, and here is why, test by test:

- *"round-trip: authored CSS applies atomically with literals preserved"* — `typeIntoEditor` types at
  `delay: 3`, so the whole string lands in ≈120 ms, well inside the 500 ms debounce; **no model change
  occurs while the user is typing**, so the guard is never exercised. When the parse finally applies,
  the assertions are `editor` contains `"rebeccapurple"` (the canonical `simpleCSS` also contains it)
  and, after the explicit blur, contains `"red 0%, rebeccapurple 80%"` (the unconditional watch has
  already rendered exactly that). Green.
- *"garbage input fails LOUD"* — a rejected parse leaves the model **unchanged**, so the unconditional
  watch never fires and the text stays `"notacolor"`. Green.
- the remaining seven never focus the editor at all.

A second, narrower mutation with the same result: change `onBlur`'s `if (!hasError.value) render(modelValue)`
to an unconditional `render(modelValue)`. No test ever blurs after a *failed* parse — the garbage test
asserts while still focused — so C3's WIP destruction becomes total and every gate stays green.

And the gate that should have caught C1: every e2e test ends with `expect(consoleErrors).toEqual([])`
over `setupEnvNoise` (`e2e/smoke/fixtures/env-noise.ts:62-70`), which listens on `console` **and**
`pageerror`. Both are **empty** during the C1 crash (see R1-after above) because the ErrorBoundary
absorbs the throw and returns `false`. The suite's strongest assertion is structurally blind to the
worst thing this component does.

**Cure**: the truce is a *behaviour*, so it needs a behavioural test at the component level —
mount, focus, mutate `modelValue`, assert the DOM text did **not** change; blur, assert it did.
And the e2e failure test must be extended past `notacolor` to the throwing corpus (`oklch()`, `rgb()`,
`hsl(  )`, `hwb()`, `rgba()`), asserting a **verdict** — because a `pageErrors`-empty assertion
cannot distinguish "handled" from "swallowed by a boundary that ate the app".

---

## C8 — MINOR · Rich-HTML paste injects foreign markup into the editor

`contenteditable="true"` (line 88) with **no** `@paste` handler. Reproduced with a real system
clipboard (`evidence/paste-probe.mjs`, `clipboard-read`/`clipboard-write` granted,
`navigator.clipboard.write` of a `text/html` + `text/plain` pair, then ⌘V):

```json
{ "innerHTML": "<b style=\"color:red;font-size:32px\">linear-gradient</b>(90deg, <i>red</i>, blue)",
  "textContent": "linear-gradient(90deg, red, blue)",
  "foreignTags": ["B[style]", "I"],
  "verdict": null }
```

Arbitrary source markup with inline styles lands in the editor and **persists**: 32px red bold text
inside a glass panel, the syntax highlighting destroyed, the design system's typography overridden by
whatever page the user copied from. It survives until the next `render()` — which, if the parse is in
an error state, never comes (line 72 gates on `!hasError`).

Not XSS: Chromium's paste sanitizer strips scripts and event handlers, so `<img onerror>` does not
execute. This is an integrity and design-system defect, not a security one — stated precisely rather
than inflated.

**Cure**: `contenteditable="plaintext-only"` — one attribute, and it cures C4's line-break collapse
in the same stroke (Chrome/Safari/Firefox 136+; the demo's own baseline is Safari + Chromium).

---

## C9 — MINOR · A masking fallback that would un-escape user text into `innerHTML`

```ts
function highlight(code: string): string {
    try { return hljs.highlight(code, { language: "css" }).value; }
    catch { return code; }                       // ← lines 43-49
}
function render(code: string) {
    if (editorRef.value) editorRef.value.innerHTML = highlight(code);   // ← line 52
}
```

The happy path is safe — measured (`evidence/hljs-bench.mjs`):

```
hljs output for an HTML payload: linear-gradient(<span class="hljs-number">90deg</span>, &lt;<span class="hljs-selector-tag">img</span> …
```

highlight.js escapes `<` to `&lt;`. But the `catch` returns the **raw** string into an `innerHTML`
sink. `modelValue` is not only user-typed: `seedFromPalette` (`GradientVisualizer.vue:110-116`)
pulls colour strings out of API-fetched saved palettes into `stops[].cssColor`, which serialize into
`simpleCSS`, which is what `render()` writes.

**Reachability: NONE demonstrated — this is a hypothesis.** `css` is registered at module scope
(line 8) so `Unknown language` cannot fire, and hljs v11 handles illegal-lexeme errors internally in
safe mode. I could not construct an input that takes the branch.

The *shape* is still a defect and a named edict violation: edict 2 forbids masking fallbacks. A
`catch` whose recovery is "silently switch to the unescaped path" converts an unknown failure into an
injection sink. **Cure**: delete the `catch`. If `hljs.highlight` can throw, that is a bug worth
seeing; if it cannot, the `catch` is dead code pretending to be safety. Either way the sink should be
`textContent` for the fallback, never `innerHTML`.

---

## C10 — MINOR · Whole-subtree `innerHTML` rebuild on every model tick

`render()` (line 52) replaces the editor's entire subtree. The watcher (lines 76–79) fires on every
`modelValue` change, and `modelValue` is `simpleCSS` — recomputed on every `pointermove` of a stop drag.

Measured (R5 in `live-probe.mjs`) — a 40-step drag of the first stop handle:

```json
{ "tag": "R5 editor DOM mutation records during a 40-step stop drag",
  "dragMs": 1024, "mutationRecords": 40 }
```

One full teardown-and-rebuild per pointer frame. Tokenizer cost, measured over 2000 iterations
(`evidence/hljs-bench.mjs`):

```
2-stop (74 chars):  0.014 ms/highlight  → 0.8 ms per 60 fps second
4-stop (206 chars): 0.020 ms/highlight  → 1.2 ms per 60 fps second
```

**I am downgrading this on the measurement.** ~1 ms per second of dragging is not a performance
finding, and I will not dress it as one. What remains real is the *semantic* cost: an `innerHTML`
rewrite destroys the browser's native undo stack and any text selection inside the editor, on every
frame of an unrelated drag, whether or not the pane is even on screen.

**Cure**: the editor is a *rendered projection* of the model — it should re-render when the model
changes *meaningfully*, not per frame. Rendering through Vue (a `v-html`-free token list, or a
`shallowRef` of highlighted tokens) makes it a patch, not a demolition, and restores undo.

---

## C11 — INFO · 12-decimal channel values in the readout (cited, not re-found)

The editor displays what the serializer produces. `evidence/state-loss.mjs` captured, after two rail
clicks:

```
linear-gradient(90deg, oklch(0.75 0.15 145) 0%,
  oklch(71.549999815004% 0.160350000555 186.400002219955deg) 34.5%,
  oklch(67.889999783824% 0.171330000649 230.320002594111deg) 71.1%,
  oklch(0.65 0.18 265) 100%)
```

Twelve decimals, and a `deg` unit on an OKLCH hue that no one hand-writes. **Cited to the OM-14
value-formatting census (`audit/om-14-formatting/`), not re-found** — the mechanism is in
`useGradientCSS`'s serializer, not in this file. Recorded because this component is where a user
*sees* it, and because a "copy this CSS" surface that emits `186.400002219955deg` is the whole point
of the OM-14 mark.

---

## Negative results — hazards checked and cleared

Filed so the next seat does not re-run them.

| hazard | result | evidence |
|---|---|---|
| `defineModel` stale-read | **Not present** — the component uses props + emit, not `defineModel`. The *shape* of the hazard is nonetheless live as C3 (a prop written by an async parent, read synchronously in `onBlur`) | `GradientCodeEditor.vue:16-29` |
| `focused` stuck `true` across a KeepAlive deactivate (would freeze the editor against the model forever) | **CLEARED.** Blur fires on deactivate; `activeElement` returns to `BODY`, and a later model change renders normally | `evidence/keepalive-paste.mjs`: `focusedBefore.active: "Gradient CSS"` → `backOn.active: "BODY"` → `afterModelChange.text` shows the new 3-stop CSS |
| ungated `requestAnimationFrame` (PRM-RAF epidemic) | **CLEARED** — no rAF, no `setInterval`, no observer in the file. The one timer is the debounce (C2) | full file read |
| WebGL / eager GL on the critical path | **N/A** — none in this component | full file read |
| `ValueUnit` nesting accumulation | **N/A** — the component never constructs a `ValueUnit`; it passes strings | full file read |
| reka-ui slider pointer-capture leak | **N/A** — no slider, no pointer capture | full file read |
| oklch→HSV hue drift / `stableHue` | **N/A** — no colour-model conversion here | full file read |
| `verbatimModuleSyntax` (edict 8) | **COMPLIANT** — all four imports (`vue`, `../../../shared/utils`, `highlight.js/lib/core`, `highlight.js/lib/languages/css`) are value imports; no type-only import is mis-declared | lines 2–6 |
| Vue 3.5 idioms (edict 7) | **COMPLIANT** — `useTemplateRef` (line 31), reactive props destructure with default (line 16) | lines 16, 31 |
| god module (edict 1) | **COMPLIANT** — 117 lines, one job | file size |
| animations deleted (edict 6) | **COMPLIANT** — the transition is preserved (as an inline style; that is C6's problem, not a deletion) | lines 95–97 |
| empty / boundary inputs (`""`, `0`, `NaN`, `Infinity`, `1e400`, negative and >100 percentages) | **No crash, all reject or clamp correctly** | `evidence/parse-probe.ts` output: `"" → REJECT: not a <type>-gradient(…) function`; `red NaN%` / `Infinity%` / `1e400%` → `REJECT: stop positions must be percentages`; `red -50%, blue 200%` → `OK [["red",0],["blue",100]]` (clamped, `gradientParse.ts:281-283`) |
| tap targets < 24px contributed by this component | **ZERO** — the six on `/#/gradient` are the two 20×20 stop handles and four 22×22 slug-bar buttons | `audit/visual/REPORT.json`, `/#/gradient` `smallTapTargets` |
| horizontal overflow / dark-class / blank render on `/#/gradient` | **CLEAN** in all four Safari matrices | `audit/visual/REPORT.md:125,140,155,170` — `overflowX 0`, `main 1`, `pageErr 0` |

---

## Evidence index

All under `docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/`:

| file | what it proves |
|---|---|
| `parse-probe.ts` | module-level: 10 empty-argument colour functions throw; `parseGradientCSS` propagates; boundary/NaN/Infinity inputs reject cleanly (`npx tsx docs/…/parse-probe.ts`) |
| `live-probe.mjs` | R1/R1b/R1c (C1), R2 + control (C3), R3 (C4), R4 (C5), R5 (C10), R6 (C2) |
| `crash-forensics.mjs` | the post-crash DOM: `main` reduced to the boundary, boundary computed styles, focus placement, "Try again" recovery |
| `state-loss.mjs` | 4 authored stops → crash → 2 stops: the work is destroyed (C1) |
| `keepalive-paste.mjs` | KeepAlive focus hazard **cleared**; synthetic paste inconclusive |
| `paste-probe.mjs` | real-clipboard rich-HTML paste injects `<b style>`/`<i>` (C8) |
| `hljs-bench.mjs` | 0.014–0.020 ms/highlight; hljs escapes HTML correctly (C9, C10) |
| `tokens.mjs` | house field tokens vs the editor's computed chrome (C6) |
| `probe0.mjs`, `probe0b.mjs` | route/locator sanity for the probe harness |
| `R1-oklch-empty-crash.png`, `R2-blur-eats-wip.png`, `R6-unmount-pending-debounce.png`, `R7-after-try-again.png` | screenshots |

No source file was modified. Nothing outside this directory was written.
