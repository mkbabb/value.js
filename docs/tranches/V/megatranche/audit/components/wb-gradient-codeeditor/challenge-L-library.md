# CHALLENGE-L — library structure under `GradientCodeEditor.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, as declared at
spawn. Seat declared, not inherited.

- **Axis:** library structure — module boundaries, ownership, dependency direction, public surface.
- **Subject:** `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines).
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict:** **DEFECTIVE** — 1 BLOCKER, 9 MAJOR, 4 MINOR, 2 INFO *(third pass: +3 MAJOR new,
  1 MINOR→MAJOR upgraded, +1 INFO, 1 negative proof retracted)*.

> **THIRD-PASS HEAD (2026-07-29).** This file is the current head. The second pass is archived
> verbatim at `challenge-L-library-r2-2026-07-28.md`; nothing below it was deleted. The third pass
> is appended as **§ Third pass** at the end of this file and contains: **L-13…L-16 (new)**,
> the **upgrade of L-9 from HYPOTHESIS to CONFIRMED MAJOR** with a reproduction whose blast radius
> is larger than hypothesized, **L-17 (INFO)**, and a **retraction of negative proof #4**. Read
> § Third pass together with L-1…L-12; it does not restate them.

> **Second-pass note (E-1, twice-audit).** A prior Opus-5 pass wrote this file. I re-derived every
> claim independently rather than inheriting it. Most held. **Two did not**, and both are corrected
> below with the mechanism the first pass missed:
> - **L-3 was misdiagnosed.** `.glass-wash` is *not* a dead class. It is a live glass-ui ladder rung,
>   and the real defect is a **cascade-layer defeat** by `.hljs` on the same element. The first
>   pass's measurement was right; its explanation was wrong. See L-3.
> - **L-5's headline number was wrong by 2.2×.** 27.9 KB gz was obtained by gzipping two source
>   files separately. Bundled and minified as shipped, the true cost is **12,670 B gz**. See L-5.
>
> One finding is **new** in this pass: the docblock premise on which the entire demo-side gradient
> tokenizer rests is **falsifiable by measurement, and false** (L-2).

---

## Thesis

The subject file is a thin, well-behaved presentation leaf. It imports nothing from
`@mkbabb/value.js`, has no deep reaches, and its own layering is correct. **Every defect found is a
structural defect in what surrounds it**: the library's public parse contract is unsound and the
demo built a 301-line parser on top of that unsoundness, justified by a claim about the public API
that measurement refutes; the gradient grammar that belongs in `@mkbabb/value.js/css` lives in
`demo/`; the design system has no code-field primitive, so two adjacent code fields in this one pane
are hand-rolled two different ways and one of them re-types glass-ui's own geometry constants as
Tailwind arbitrary values; the glass plate the component asks for is silently erased by an unlayered
ink theme; and it is the sole reason a runtime `highlight.js` chunk exists beside a *dead*
build-time highlighting facility.

The single loudest consequence: **typing `oklch()` into this editor destroys the entire
application** — both panes, all unsaved pane state — discards the user's authored text, and leaves
**zero console output**.

---

## Import census — every edge traced to its home

`GradientCodeEditor.vue:1–8`:

| # | specifier | resolves to | boundary verdict |
|---|---|---|---|
| 1 | `vue` | host `vue`, deduped (`vite.config.ts:77–83`) | OK |
| 2 | `../../../shared/utils` | `demo/shared/utils.ts` | sanctioned (W43/RF-15 retired the `@` demo aliases; relative-to-physical-home is the law) — but see **L-8** |
| 3 | `highlight.js/lib/core` | `node_modules/highlight.js` — a **devDependency** | see **L-5**, **L-11** |
| 4 | `highlight.js/lib/languages/css` | ditto | see **L-5** |

**Zero design-system imports.** This is the only leaf in the Gradient pane importing nothing from
`@mkbabb/glass-ui` and nothing from `demo/ui/`. Its sibling `GradientVisualizer.vue` imports
`Select`, `Slider`, `writeClipboard`, `DockControl`; `GradientEasingEditor.vue` imports four glass
primitives. This one hand-rolls its entire surface. That is the shape of **L-4**.

**Zero library imports.** The parse it triggers happens one and two levels up
(`GradientVisualizer.vue:106` → `useGradientModel.applyCSS` → `gradientParse.parseGradientCSS`).
L-1's blast radius lands here anyway, because this is the only surface feeding arbitrary user
keystrokes into that parser.

---

## L-1 — BLOCKER · the published `ParseResult` contract is a type-lie, and the lie destroys the whole app

### The unsound public surface

`src/css/types.ts:25–27` — the library's total-parse contract, with **no throw channel in the type**:

```ts
export type ParseResult<T> =
    | { readonly ok: true; readonly value: T; readonly diagnostics: readonly [] }
    | { readonly ok: false; readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]] };
```

`parseCssColor(source: string): ParseResult<CssColor>` (`src/css/grammar.ts:257`) declares itself
total over `string`. It is not.

```
src/css/grammar.ts  splitTopLevel()  drops empty parts (`if (part) parts.push(part)`;
                                     `const tail = …trim(); if (tail) parts.push(tail)`)
                                     ⇒ splitTopLevel("", "/") === []
src/css/grammar.ts:177   const slash = splitTopLevel(body, "/");
src/css/grammar.ts:181   const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
                                                          ^^^^^^^^^
```

The `!` at line 181 is **false** whenever `body` is empty or whitespace. It is also the *only*
non-null assertion on a split result in the file:

```
$ grep -n "slash\[0\]\!" src/css/grammar.ts
181:    const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

### Reproduction 1 — against `dist/`, the artifact the demo actually loads

```
$ node --input-type=module -e "import { parseCssColor } from './dist/subpaths/css.js'; …"
"oklch()"            => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"rgb()"              => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"hsl()"              => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"lab()"              => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"lch()"              => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"color()"            => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"oklab()"            => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"hsl(  )"            => THREW TypeError: Cannot read properties of undefined (reading 'replace')
"oklch("             => ok: false      ← UNBALANCED is fine; the CLOSED EMPTY call is what kills
"oklch(0.7 0.1 145)" => ok: true
"red"                => ok: true
```

`parseCssValue` sits on the same path and throws identically (measured in L-2), so the defect spans
the `css` subpath, not one entry point.

### The demo architected directly on the false contract — correctly

`gradientParse.ts:16–18` states the premise:

> Each token is then validated by the **LIBRARY's** own parsers (`parseCssColor` / `parseCssScalar`
> — the **validity oracles**; the demo never hand-validates a color).

`gradientParse.ts:44–47` states the guarantee derived from it:

> `/** Model-or-reject: the whole model, or a one-line reason. Never a partial. */`

The ownership rule is right. `isColorToken` (`gradientParse.ts:91–94`) is a bare
`return parseCssColor(token).ok` — consuming the declared type exactly as declared. The oracle
throws straight through it.

### Reproduction 2 — live, `localhost:9000` (HTTP 200), Playwright/Chromium

Navigate `/#/gradient`; focus `[role="textbox"][aria-label="Gradient CSS"]`; set the text to
`linear-gradient(90deg, oklch(), oklch(0.65 0.18 265) 100%)` — the exact intermediate state of a user
who has typed a function name and its parens and not yet the channels — dispatch `input`; wait past
the 500 ms debounce (`GradientCodeEditor.vue:55–57`).

```
{ "bodyText": "→\nGradient\nPalettes\n\nThis panel hit an unexpected error.\n\n
               Cannot read properties of undefined (reading 'replace')\n\nTry again",
  "hasEditor": false,
  "hasStops": 0 }
```

Witness: `live-01-mtf001-oklch-empty.png` — a blank aurora field with one "Try again" pill.

Four compounding structural facts:

1. **The boundary is at the app root, not the pane.** `demo/color-picker/App.vue:50` wraps the whole
   `<main class="pane-main">` — both panes — in one `<ErrorBoundary>`. One leaf's parse throw
   therefore evicts `My Palettes` alongside the gradient.
2. **The async debounce isolates nothing.** The throw originates in a raw `setTimeout`, yet Vue
   catches it, because `emit("parse", text)` routes through `callWithAsyncErrorHandling`, which
   walks the parent chain to the nearest `errorCaptured`.
3. **Zero diagnostics.** `ErrorBoundary.vue:68` `return false` halts propagation, so nothing reaches
   `console`. Captured `console` + `pageerror` + `window.onerror` + `unhandledrejection` were all
   empty. A shipping crash that leaves no telemetry trace.
4. **Recovery destroys the user's work.** Clicking "Try again":

   ```
   { "recovered": true,
     "editorTextAfterRecovery": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)" }
   ```

   The *default* gradient. The authored text, every stop, the direction, the space, the per-interval
   easing — all re-mounted from seed. That directly falsifies the subject's own docblock,
   `GradientCodeEditor.vue:38–40`:

   > "A failed parse keeps the user's text verbatim alongside the verdict — **WIP is never
   > destroyed**."

Contrast case proving the *non-throwing* rejection path is sound (same probe):

```
INVALID notacolor: { "verdict":"unparseable color \"notacolor\"", "invalid":"true",
                     "destructive":true, "text":"linear-gradient(45deg, gold, notacolor)" }
```

Witness: `live-04-verdict-working.png`. The component's error design is right. The library contract
beneath it is wrong.

### Why this is a library-structure finding, not a demo bug

A component cannot defend an invariant against a partial function masquerading as a total one. Every
line of the editor's truce logic is correct and is defeated anyway.

The tempting demo-side cure — `try/catch` around `isColorToken` — must be **refused**: it is a
masking fallback over a broken contract (owner edict 2), and it would convert a loud crash into a
silent mis-parse, reporting `oklch()` as "unparseable color" rather than as the library defect it is.

**Cure (transposition, not patch):**

1. `grammar.ts:181` — take the head, guard it, `return failure(source, "css_syntax", ["color
   components"])` when `splitTopLevel(body, "/")` is empty. One line in, one line out; the declared
   type becomes true.
2. **Structural, so it cannot recur.** The `!`-on-index is the mechanism. Give `splitTopLevel` a
   total return type — `readonly [string, ...string[]] | readonly []` — or a
   `splitTopLevelNonEmpty` that returns the head separately. `tsc` then rejects the unguarded index
   instead of trusting an author's `!`. This is what makes it a transposition: the type system, not
   vigilance, owns the invariant. Then sweep the remaining `!`-on-index in `src/css/grammar.ts` —
   MT-F001 is one instance of a family.
3. **Boundary granularity.** The app-root `ErrorBoundary` (`App.vue:50`) belongs per-pane, inside
   `usePaneRouter`'s mount (`demo/shell/usePaneRouter.ts:74–87`), so a workbench fault can never
   evict an unrelated pane's state.
4. **Regression gate.** A table test over
   `{rgb,rgba,hsl,hsla,hwb,lab,lch,oklab,oklch,color}` × `{"()", "(  )", "( / )"}` asserting
   `.ok === false`. `grep -rn "oklch()\|rgb()" test/*.test.ts` returns nothing today — the
   empty-call class was never tested, which is exactly how a lone `!` survived.

---

## L-2 — MAJOR · `parseGradientCSS` is library code living in the demo, and its stated justification is false

### Ownership

`src/subpaths/css.ts` publishes the library's claim to CSS value grammar: `parseStylesheet`,
`parseCssValue`, `parseCssValues`, `parseCssColor`, `parseCssScalar`, `parseTimingFunction`,
`parseAnimationRange`, `parseAnimationTimeline`, `parseKeyframeSelector`, `serializeCssColor`,
`serializeTimelineOptions`. Then:

```
$ grep -rln "gradient" src/         → (no output)
$ grep -rn "linear-gradient" src/   → (no output)
```

**Zero.** `<gradient>` — a CSS value type made of colors, angles and percentages, in the dead centre
of a library whose two published domains are colors and CSS values — is owned entirely by
`demo/workbenches/gradient/composables/`: `gradientParse.ts` (301 lines, pure, DOM-free,
Vue-free, CSS-Images-L3 §3.1–3.3 grammar) plus the serializer half in `useGradientCSS.ts`
(`serializeGradient`, `serializeIntervalRamp`, `serializeRailRamp`, `sampleCoalescedStops`) rather
than beside `serializeCssColor` (`src/css/grammar.ts:289`).

### The false premise — NEW in this pass

`gradientParse.ts:12–15` justifies the demo's own tokenizer:

> *"Segmentation is textual (top-level commas, then top-level whitespace) because the library's flat
> `FunctionValue` token stream loses the comma grouping — `red 30%, blue` and `red, 30%, blue` (an
> interpolation hint) parse to identical flat streams."*

Measured against `dist/`:

```
$ node --input-type=module -e "import { parseCssValue } from './dist/subpaths/css.js'; …"
linear-gradient(red 30%, blue)  => list<space>[color:rgb, number:30%] || color:rgb     (2 args)
linear-gradient(red, 30%, blue) => color:rgb || number:30% || color:rgb                (3 args)
```

Two args vs three; the first form's segment is a `{kind:"list", separator:"space", items:[…]}`. The
two forms are **structurally distinct**. `parseCssValue` returns
`{kind:"call", name:"linear-gradient", args:[…]}` with comma grouping **fully preserved** — precisely
the structure `splitTopLevelCommas` + `tokenizeTopLevel` (`gradientParse.ts:52–89`, 38 lines) were
written to reconstruct by hand, and which duplicates `splitTopLevel` in `src/css/grammar.ts` — the
library's own depth- and quote-aware splitter, kept private.

**The premise is false.** The demo re-implements a private library function to recover a structure
the public library function already returns, citing a defect that does not exist.

### The gap that *is* real, and is different

Adversarially probing my own correction:

```
"linear-gradient(red,,blue)"  => ok: true  args=2
"linear-gradient(red, blue,)" => ok: true  args=2
"linear-gradient(red, blue)"  => ok: true  args=2
```

`parseCssValue` **does** discard doubled/trailing-comma arity, which `gradientParse.ts:210` needs in
order to reject `"empty argument (doubled or trailing comma)"`. So there is a genuine missing
capability on the library primitive — *empty-segment fidelity*, not *comma grouping*. That is a
reason to fix `splitTopLevel` (a `keepEmpty` mode), not a reason for a second implementation.

Likewise `angleToDegrees` (`gradientParse.ts:97–108`) and `percentValue`
(`gradientParse.ts:111–118`) are CSS unit arithmetic — `deg/grad/rad/turn` conversion is
`@mkbabb/value.js` domain, not gradient-workbench domain.

**Cure.** `@mkbabb/value.js/css` gains `parseCssGradient` / `serializeCssGradient`, implemented over
`parseCssValue`'s existing `call`/`list` tree — not over a new string splitter — and `splitTopLevel`
gains a `keepEmpty` mode and is exported. `gradientParse.ts` collapses to a thin **projection**
(`CssGradient` → the demo's editable `{stops, intervals}` model), keeping only the demo-specific
choices: the model-or-reject narrowing, the authored-literal preservation (line 18), the easing
seeding (lines 295–298). This is also the honest fix for L-1's blast radius: a library-owned gradient
parser gets the library's test suite, and the demo stops being where the parser's totality is
discovered by a user.

---

## L-3 — MAJOR · the glass plate is silently erased by an unlayered ink theme — **CORRECTED DIAGNOSIS**

> **The first pass called `.glass-wash` a dead class with "no definition in the default cascade,
> not in `demo/styles/`, not in `glass-ui.css`". That is false.** It grepped
> `node_modules/@mkbabb/glass-ui/dist/glass-ui.css` (the *component* bundle) and missed the
> *stylesheet ladder*. Its measurement was nevertheless correct, and the true mechanism is more
> interesting — and a cleaner structural finding.

### `.glass-wash` is live, and reachable

```
$ grep -rl "glass-wash" node_modules/@mkbabb/glass-ui/dist/styles/
node_modules/@mkbabb/glass-ui/dist/styles/glass/ladder.css        ← the definition
…
$ head -c 120 node_modules/@mkbabb/glass-ui/dist/styles/glass.css
@import "./glass/material.css"; @import "./glass/ladder.css"; …
$ grep -n "@import" demo/styles/foundation.css | head
1:@import "tailwindcss";
56:@import "@mkbabb/glass-ui/styles";      ← → index.css → glass.css → glass/ladder.css
81:@import "./hljs.css";
```

`ladder.css:1` — `@layer components { … .glass-wash { position: relative; --glass-bg-rung:
var(--glass-bg-wash); background: var(--glass-plate-tinted); backdrop-filter: …; border: 1px solid
var(--glass-border-accent); box-shadow: var(--glass-material-rim), var(--glass-shadow-wash); } … }`

It is one rung of a five-rung *container* ladder (`.glass-wash / .glass-quiet / .glass-resting /
.glass-floating / .glass-overlay`). Live token probe on the subject element confirms the rule
matches and its custom properties apply:

```
tok_glass_level:          "1"
tok_glass_opacity_wash:   "0.30"
--glass-bg-rung   (on el): "color-mix(in srgb, light-dark(hsl(30 85% 96%), hsl(26 22% 17%)) calc(…), transparent)"
--glass-plate-tinted (el): "color-mix( in oklab, color-mix(in srgb, …), light-dark(…) clamp(4%, …, 20%) )"
editorBoxShadow:          "oklab(… / 0.3) 0px 1px 0px 0px inset, oklab(0.9…"   ← the glass rim, applied
supportsColorMixOklab:    true
```

The rung applies. The tokens resolve. Nothing is dead.

### …and yet the plate does not paint

```
editorBackground:     "rgba(0, 0, 0, 0)"
editorBackdropFilter: "none"
```

**Mechanism.** `demo/styles/hljs.css:56–60`:

```css
.hljs {
    color: var(--code-ink);
    background: transparent;        ← this
    font-family: var(--font-stack-mono);
}
```

`hljs.css` contains **no `@layer`** — verified; it is unlayered, `@import`ed at
`foundation.css:81`. `.glass-wash`'s `background` is **layered** (`@layer components`). Per CSS
Cascade 5, **unlayered normal declarations beat all layered normal declarations**, irrespective of
specificity or order. The element carries both classes (`GradientCodeEditor.vue:93`:
`class="hljs … glass-wash …"`), so `.hljs`'s `background: transparent` **defeats** the glass plate on
the very node that asked for it.

The irony is written into `hljs.css`'s own docblock:

> *"Register: INK ONLY. The theme paints no background — the surface belongs to the plate
> (Markdown.vue's `pre`, **the editor's glass wash**), never to the grammar."*

`background: transparent` is not "paints no background". It is "paints transparent", which actively
erases the plate the comment names.

### The inversion this produces

`foundation.css:764` opens `@media (prefers-reduced-transparency: reduce)` at **brace depth 0**
(verified by parse — also unlayered), and lines 784–789 force
`background-color: var(--surface-reduced-opaque, var(--card)) !important` on `.glass-wash`.
Unlayered **important** beats unlayered normal, so there — and only there — the plate paints. The
first pass measured exactly this:

```
DEFAULT             : {"editorBg":"rgba(0, 0, 0, 0)", …}
REDUCED-TRANSPARENCY: {"editorBg":"rgb(253, 245, 236)", …}     (live-03-reduced-transparency.png)
```

So the component is **transparent in every normal matrix and opaque only in the accessibility
matrix** — the precise inversion of intent, decided by an accident of cascade-layer membership
rather than by design, and invisible to any default screenshot sweep.

**Cure.** Delete `background: transparent` from `hljs.css:58` (an ink theme should declare ink and
nothing else) — or, if a reset is genuinely wanted, move `hljs.css` into `@layer components` so the
two owners arbitrate by order rather than by layer accident. Structurally, the deeper fix is L-4:
one element should not compose two independently-owned surface claims; the plate belongs to the
glass primitive and the ink to the theme, on different nodes.

---

## L-4 — MAJOR · MT-F037 family: two hand-rolled code fields, and glass-ui's own geometry re-typed by hand

Owner mark OM-13 (`audit/visual/owner-marked/OM-13-easing-readout-not-glass-input.png` — read; a flat
rounded rect carrying `cubic-bezier(0, 0, 1, 1)` and two trailing icons) names the easing readout.
The subject is the **second instance of the same defect, 137 px below it in the same pane**. Both are
code-literal fields; neither is a glass-ui component; their chrome diverges on every axis. Measured
live, same page, same paint:

| | easing readout (`GradientEasingEditor.vue:176`) | CSS editor (`GradientCodeEditor.vue:93`) |
|---|---|---|
| element | `div.readout-rail` (hand-rolled) | `div[contenteditable]` (hand-rolled) |
| radius | `6px` (`rounded-md`) | `8px` (`rounded-lg`) |
| background | `oklab(0.913295 0.00550478 0.0130424)` (opaque `bg-well`) | `rgba(0, 0, 0, 0)` (erased — L-3) |
| border | `0px` | `1px solid oklab(… / 0.4)` |
| padding | `4px / 8px` | `12px / 12px` |
| trailing actions | inside the row (2 bare `<button class="rail-btn">`) | outside, in the section `<h3>` (`GradientVisualizer.vue:254`) |

Witness: `live-05-two-code-rows-chrome-divergence.png`. Neither radius is glass-ui's `--radius-field`
— which is also the mechanism behind OM-4's "easing radius incoherence".

### The duplication is literal, not merely stylistic

glass-ui runs a **second, separate plate system for controls**, distinct from the container ladder of
L-3: `node_modules/@mkbabb/glass-ui/dist/components/_shared/field-control.css`, shared by `Input` and
`Textarea`:

```css
.field-control { --control-surface-bg: var(--input-on-glass);
                 border: 1.5px solid var(--control-surface-border);
                 backdrop-filter: …; box-shadow: var(--glass-rim-top), var(--glass-rim-bottom); }
.field-control[data-kind="input"]    { block-size: var(--field-control-height); border-radius: var(--radius-pill); }
.field-control[data-kind="textarea"] { min-block-size: max(5lh, calc(5rem * var(--ui-scale)));
                                       max-block-size: var(--textarea-content-max, 12lh);
                                       border-radius: var(--radius-field); overflow: auto; }
.field-control:focus-visible { border-color: var(--color-accent-opaque, var(--focus-ring-color));
                               box-shadow: var(--focus-ring-shadow); }
.field-control:is(:user-invalid, [data-state="invalid"]) {
    --control-surface-bg: color-mix(in srgb, var(--destructive) 8%, var(--input-on-glass));
    border-color: var(--destructive); }
.field-control:is(…):focus-visible { box-shadow: var(--invalid-ring); }
.field-control[data-state="readonly"] { … }  .field-control[data-state="disabled"] { … }
```

Against `GradientCodeEditor.vue:93–97`:

| hand-rolled here | already owned at the glass root | edict |
|---|---|---|
| `min-h-[5rem] max-h-[12rem] overflow-y-auto` | `.field-control[data-kind="textarea"]` → `min-block-size: max(5lh, 5rem)` / `max-block-size: 12lh` / `overflow:auto` — **the identical constants, re-typed as Tailwind arbitrary values** | 4 |
| `:class="[hasError ? 'border-destructive' : 'border-border/40']"` | `.field-control:is(:user-invalid,[data-state="invalid"])` — border **and** an 8 % destructive surface tint **and** `--invalid-ring` on focus | 4, 5 |
| `focus-visible:ring-2 focus-visible:ring-ring/40` | `.field-control:focus-visible` → accent border + `--focus-ring-shadow` | 4, 5 |
| inline `:style="{ transition: … }"` (a static value) | belongs in CSS at the root, not per instance | 5 |
| `rounded-lg` | `--radius-field` | 4, 5 |

Beyond duplication there is a **register error**: this is a text-entry *control* wearing the
*container* ladder plate (L-3). glass-ui distinguishes the two systems deliberately; the component
picks the wrong one, then re-implements the right one by hand.

### Census of installed glass-ui — `version: "7.0.0"`, 74 export subpaths

- `./forms` → `dist/forms.d.ts`: `export * from "./components/input"; export * from
  "./components/textarea"; export * from "./components/combobox"; export { useUserInvalidAria, … };
  export type { ControlSize };`
- `components/input/Input.vue.d.ts` — `InputProps`; `type?: "email"|"password"|"search"|"tel"|"text"|"url"`,
  no code variant; the `DefineComponent` slots parameter is `{}` — **zero slots**; renders a native
  `<input>`, which cannot host highlighted markup.
- `components/textarea/Textarea.vue.d.ts` — same shape, native `<textarea>`, no slots, no
  highlighting.
- Field-shaped subpaths in the export map: `./forms ./labeled-field ./number-field
  ./fourier-field`. `labeled-field` composes `InputProps | SliderProps | SwitchProps` — no
  code/mono member. `search`'s variants are `inline | bare | floating`.
- The only icon precedent is `Combobox`'s internal `SearchIcon` — not a public slot.

**No installed glass-ui primitive fits either a syntax-highlighted multi-line code field or an
icon-trailing single-line code readout.** Per standing law this is a **marked glass-forward ask,
never a local restyle**:

> **Ask to glass-ui (BH/BI relay):** a `CodeField` in `./forms` — or, cheaper and more idiomatic,
> `.field-control[data-kind="code"]`: the same plate, `--radius-field`, mono register,
> `white-space: pre-wrap`, the same `data-state` invalid/readonly/disabled contract, a
> `contenteditable` host, and an optional trailing-adornment slot for the copy / tune icons that
> both this editor and the OM-13 readout need. Consumers then get invalid-state, focus ring,
> readonly and disabled for free, at the root, in one place — and OM-13 and this finding are cured
> by the same primitive. The demo must not restyle locally in the interim.

---

## L-5 — MAJOR · runtime `highlight.js` that is switched off exactly when the user is typing — **NUMBER CORRECTED**

### The highlighting is off during authoring

Token counts in the editor's `innerHTML` across the authoring lifecycle (first pass, re-derived
against the source and confirmed):

```
MOUNT             : {"tokens":9, "text":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0…"}
MID-TYPING (focus): {"tokens":0, "text":"linear-gradient(45deg, gold 0%, teal 100%)"}
AFTER DEBOUNCE    : {"tokens":0, "text":"linear-gradient(45deg, gold 0%, teal 100%)"}
AFTER BLUR        : {"tokens":3, "text":"linear-gradient(45deg, gold 0%, teal 100%)"}
```

Structural, not incidental: `onInput` (`:59–62`) debounces only the parse emit; `render()` (`:51–53`)
is called from `onMounted` (`:81`), from the model watcher (`:76–79`, gated `if (focused.value)
return`), and from `onBlur` (`:68–73`). **Nothing re-highlights while the editor has focus** — the
editor truce of `:34–40`. A syntax-highlighting code editor does not highlight during the one
activity it exists for.

### Cost — the first pass's figure was wrong

The first pass reported **27.9 KB gz**, obtained by gzipping the two source files *separately*
(22,405 + 5,448). That is not how a bundle ships. Measured as bundled and minified:

```
$ npx esbuild hl.mjs --bundle --minify --format=esm --outfile=hl.bundle.js
$ wc -c hl.bundle.js ; gzip -9 -c hl.bundle.js | wc -c
34368
12670
```

**12,670 B gzipped** — 2.2× smaller than reported, and the corrected number should be the one that
enters the ledger. It is still disproportionate: it buys colorization of one string whose observed
length is 74 characters.

`vite.config.ts:269–272` carries a dedicated `vendor-highlight` rolldown chunk group existing solely
for this import. Honest mitigation: the gradient pane is lazy
(`demo/shell/usePaneRouter.ts:74`, `defineAsyncComponent(() => import("…/GradientPane.vue"))`), so
the chunk is deferred, not eager.

### Redundant tokenization

The same keystroke, on the same string, in the same 500 ms window, runs **three** tokenizers:
hljs's CSS grammar (paint), `gradientParse`'s `splitTopLevelCommas`/`tokenizeTopLevel` (structure),
and the library's `splitTopLevel` inside `parseCssColor`/`parseCssScalar` per token (validation).
What the highlighter needs is a strict subset of what the parse already computes — and the library
already speaks source spans: `ParseIssue` carries `start: number; end: number`
(`src/css/types.ts:19–20`).

And the repo **already owns** a zero-runtime-byte highlighting facility, which is dead:

```
plugins/vite-source-export.ts:14–16
  "The exports are HTML strings wrapped in `<pre><code class="hljs typescript">`.
   No runtime formatting or highlighting libraries are needed."
```

(L-7 proves it has zero consumers.) So the demo ships a runtime highlighter for the one place
highlighting is switched off, beside a build-time highlighter nothing calls.

**Cure.** Extend the L-2 `parseCssGradient` result with a `tokens: readonly {start, end, kind}[]`
channel — the parser already walks the string; emitting spans is bookkeeping, not new work — and
paint from it. One tokenizer, one home, −12.7 KB gz from the route, and the highlighter and the
validator can no longer disagree about the same text. Once glass-ui owns `CodeField` (L-4), the
`vendor-highlight` chunk group and the truce logic delete with it; a truce that survives belongs in
the primitive as a documented `rehighlight: "blur" | "input"` policy.

---

## L-6 — MAJOR · `demo/ui/` is a 19-directory alias layer over glass-ui

```
alert  avatar  badge  button  card  checkbox  collapsible  dialog  dropdown-menu
input  label   popover  radio-group  select  separator  skeleton  slider  switch  tooltip
```

**All 19 contain exactly one file — `index.ts` — and all 19 forward to `@mkbabb/glass-ui`.** No
primitives, no variants, no local implementation:

```
demo/ui/input/index.ts:1   export { Input } from "@mkbabb/glass-ui/forms";
demo/ui/button/index.ts:1  export { Button } from "@mkbabb/glass-ui";
demo/ui/select/index.ts:1  export { Select, SelectTrigger, SelectItem, SelectValue,
                                    SelectContent, SelectGroup, SelectLabel, SelectSeparator }
                             from "@mkbabb/glass-ui";
```

`demo/ui/alert/index.ts`'s own note records that these were once local shadcn-vue
re-implementations converted to re-exports — so the layer is a fossil of a completed migration, not
a live abstraction. The subject's own parent imports through it rather than from the design system:

```
GradientVisualizer.vue:9   } from "../../../ui/select";
GradientVisualizer.vue:10  import { Slider } from "../../../ui/slider";
```

while glass-ui publishes `./select` and `./slider` directly. Edict 2 forbids aliases and dual paths;
this is 19 directories whose only function is to give every design-system component a second import
specifier — and it makes the demo a **false proof of glass-ui's real ergonomics**: no external
consumer would ever write `../../../ui/select`.

**Cure.** Delete `demo/ui/` wholesale; rewrite the ~60 import sites to glass-ui subpaths. Mechanical,
and it removes a whole layer. It is also the path the L-4 primitive should arrive on.

---

## L-7 — MAJOR · the `@src` door into library internals, and its stated justification, are both dead

`vite.config.ts` keeps an alias that bypasses the export map entirely:

```
vite.config.ts:70–74
  // … `@src` SURVIVES for the EXEMPT `assets/docs/*.md` reference pages, which embed live
  // source snippets via `@src/…?source` (the `sourceExportPlugin`), and
  // for the vitest suite's own `@src` alias in `vitest.config.ts`.
  { find: "@src", replacement: path.resolve(import.meta.dirname, "src") },
vite.config.ts:160
  sourceExportPlugin(),
```

Measured at HEAD (re-run this pass, across all file types under `demo/`, `.md` included):

```
$ grep -rn "@src" demo/       → (no output)
$ grep -rn "?source" demo/    → (no output)
$ grep -rn "?source" plugins/ → only plugins/vite-source-export.ts's own code + docblock
```

**Zero `@src/` and zero `?source` imports exist in `demo/`.** The plugin, its build-time prettier +
highlight.js dependency, and the alias are all dead, and the comment at :70–73 that justifies them is
false. What remains is an unguarded door: any future demo file can write `@src/units/color/…` and
reach a library internal the export map deliberately does not publish, and nothing — no lint rule, no
tsconfig path restriction — stops it.

**Cure.** Delete the `@src` alias (`vite.config.ts:74`) and `sourceExportPlugin()` (`:160`). Vitest
keeps its own alias in `vitest.config.ts`, which is correct — tests *should* see internals. The
boundary then becomes structural rather than conventional.

---

## L-8 — MINOR · `demo/shared/utils.ts` is a junk drawer whose rationale cites a surface that does not exist

The subject's only non-vendor import is `GradientCodeEditor.vue:3`,
`import { debounce } from "../../../shared/utils";`. That module carries a 14-line docblock whose
central claim is false at HEAD:

```
demo/shared/utils.ts:11–17
 * `debounce` was the last symbol holding 7 demo files on the BARE
 * `@mkbabb/value.js` specifier … the demo owns its copy;
 * the library's root-barrel export stands for external consumers.
```

Measured:

```
$ grep -rn "debounce" src/                                         → (no output)
$ node -e "const p=require('./package.json'); …"
    main: undefined   module: undefined   types: undefined   has "." export: false
```

There is **no `debounce` in the library** and **no root barrel at all** — `@mkbabb/value.js` declares
only the seven subpaths, no `.` key, no legacy `main`. A bare `import … from "@mkbabb/value.js"` is
unresolvable for a real external consumer. The docblock's entire justification refers to a public
surface that does not exist.

The module's second occupant is dead:

```
demo/shared/utils.ts:1–6   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
$ grep -rn "\bcn(" demo/ --include="*.vue" --include="*.ts"
demo/shared/utils.ts:4:export function cn(...inputs: ClassValue[]) {     ← the definition, and nothing else
$ grep -rn "import { cn }" demo/   → (no output)
```

Zero call sites, zero imports. So `shared/utils.ts` = one live symbol (`debounce`, 7 importers) + one
dead symbol (`cn`) + a false narrative, in a two-unrelated-concepts junk drawer (a class-name merger
and a timer) — the seed shape of a god module (edict 1).

**Cure.** Delete `cn` and its `clsx` + `tailwind-merge` devDependencies if nothing else uses them;
rename the module `demo/shared/debounce.ts` (one concept, one home); delete the stale docblock
paragraph outright rather than amending it.

---

## L-9 — MINOR · the debounce timer is never cancelled on unmount — **HYPOTHESIS**

```
GradientCodeEditor.vue:55–57
const debouncedParse = debounce((text: string) => { emit("parse", text); }, 500);
```

`debounce` returns a function carrying `.cancel()` (`demo/shared/utils.ts:36–41`). The subject never
calls it, and the file (all 117 lines read) contains no `onUnmounted`. The pane is lazily mounted and
unmounted on pane switch (`demo/shell/usePaneRouter.ts:74,87`), so a pane switch within 500 ms of a
keystroke leaves a pending timer emitting into a torn-down tree.

**Reproduction: NONE.** I did not exercise a mid-keystroke pane switch. Labelled a hypothesis.

**Cure.** `onUnmounted(debouncedParse.cancel)` — or, correctly, delete the concern: the debounce
belongs inside the L-4 `CodeField`, whose lifecycle owns its own timers.

---

## L-10 — MINOR · masking fallback into an unescaped `innerHTML` sink — **HYPOTHESIS**

```
GradientCodeEditor.vue:43–49
function highlight(code: string): string {
    try { return hljs.highlight(code, { language: "css" }).value; }
    catch { return code; }                    ← silent swallow, raw string
}
GradientCodeEditor.vue:51–53
function render(code: string) {
    if (editorRef.value) editorRef.value.innerHTML = highlight(code);
}
```

The success path is safe — hljs escapes its output. The `catch` arm returns the raw user string,
which line 52 writes to `innerHTML` **unescaped**. It is a masking fallback (edict 2) sitting on an
HTML-injection sink.

**Reproduction: NONE.** `hljs.highlight` with a registered language did not throw in any probe; I
could not reach the catch arm. The *injection consequence* is a hypothesis; the *silent swallow* is a
fact at `:46`.

**Cure.** Let it throw, or `textContent` the fallback. Better: the sink disappears with L-4 — a
primitive renders highlighted tokens as a vnode tree, never via `innerHTML`.

---

## L-11 — MINOR · global registry mutation at module scope, in a package declared side-effect-free

```
GradientCodeEditor.vue:5–8
import hljs from "highlight.js/lib/core";
import css  from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);          ← runs on module evaluation
```

A leaf feature component mutates a process-global singleton registry at import time. No module owns
that registry; ordering is implicit. The **same singleton** is mutated for `typescript` by
`plugins/vite-source-export.ts:57–61`, at build time, through a lazy dynamic import — one concept
("which grammars does this app highlight?"), two homes, two idioms, two lifetimes. Meanwhile:

```
$ node -e "…package.json.sideEffects…"   → false
```

The package declares `"sideEffects": false`, telling bundlers no module in the tree has import-time
effects. Line 8 and that declaration contradict each other. (I did not produce a build in which the
registration is dropped — the *drop consequence* is a hypothesis; the contradiction is a fact.)

**Cure.** The registration belongs wherever the highlighter is owned — glass-ui's `CodeField` (L-4),
which can register lazily on first use.

---

## L-12 — INFO · `role="textbox"` multi-line editor without `aria-multiline`

`GradientCodeEditor.vue:88–93` — `contenteditable="true"`, `role="textbox"`, `whitespace-pre-wrap`,
`min-h-[5rem]`: a multi-line editor. `aria-multiline` defaults to `false`, so assistive technology
announces a single-line text field for a control that accepts and displays line breaks.
`aria-multiline="true"` is the fix — and it comes for free if the L-4 primitive owns the role wiring,
which is the argument for solving it there rather than here.

---

## The greenfield lattice

Four layers, one home per concept:

```
@mkbabb/value.js/css          parseCssColor    (TOTAL — L-1)
                              parseCssScalar
                              splitTopLevel    (exported, total signature, + keepEmpty mode — L-1, L-2)
                              parseCssGradient / serializeCssGradient   ← from gradientParse.ts
                                                                          + useGradientCSS.ts core
                              ParseResult.tokens?: {start,end,kind}[]   ← spans already exist as
                                                                          ParseIssue.start/end (L-5)
        ↑ pure, DOM-free, framework-free, tested, published

@mkbabb/glass-ui/forms        <CodeField>      mono register · `invalid` on the shared control axis ·
                                               trailing-action slot · optional highlighted view ·
                                               owns its highlighter + rehighlight policy · owns the
                                               plate, so no element composes two surface claims (L-3)
        ↑ the design system — the ONLY source of field chrome

demo/workbenches/gradient/
        model.ts        useGradientModel — refs, the stops↔intervals watcher, applyCSS delegating to
                        the library parser, and the verdict (it is the model's own return value)
        project.ts      CssGradient ⇄ {stops, intervals}  (pure; the demo's narrowing lives here)
        serialize.ts    the demo-specific ramp/coalesce serializers (NOT `use`-prefixed)

demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue     (~25 lines)
        <CodeField v-model :invalid="!!verdict" :error="verdict" language="css" @change="…">
          <template #trailing><CopyAction/></template>
        </CodeField>
```

A closing lattice note the first pass missed: `demo/workbenches/gradient/composables/` holds two
**non-composables** — `gradientParse.ts` (pure) and `useGradientCSS.ts`, which carries the `use`
prefix while exporting only pure serializers plus a constant (`COALESCE_RESOLUTION`,
`linearInterval`, `easingFnOf`, `serializeGradient`, `sampleCoalescedStops`,
`serializeIntervalRamp`, `serializeRailRamp`; **zero composables**). The prefix and the directory
both misreport, which is why the lattice above renames them.

Deletions this lattice forces, all mechanical:

| delete | size | replaced by |
|---|---|---|
| `demo/workbenches/gradient/composables/gradientParse.ts` | 301 lines | `@mkbabb/value.js/css` |
| serializer core of `useGradientCSS.ts` | ~11.9 KB | `@mkbabb/value.js/css` |
| `demo/ui/**` (L-6) | 19 dirs | direct glass-ui subpath imports |
| `glass-wash` on `:93` + `background: transparent` in `hljs.css:58` (L-3) | 2 declarations | the `CodeField` primitive |
| the 5 per-instance chrome overrides (L-4) | `:93–97` | `.field-control` at the glass root |
| runtime `highlight.js` import + `vendor-highlight` chunk group (L-5) | **12.7 KB gz** | the primitive / parser spans |
| `@src` alias + `sourceExportPlugin()` (L-7) | 2 config lines + 1 plugin | nothing — both dead |
| `cn` + the `utils.ts` docblock (L-8) | 6 lines + false narrative | nothing — dead |

Net: the subject shrinks 117 → ~25 lines, the demo sheds ~450 lines of misplaced library code and 19
alias directories, the CSS editor and the OM-13 readout become the same component **by
construction**, and MT-F001 becomes a library test instead of a user-facing app wipe.

---

## Negative proof — what is genuinely sound here

Stated positively, with evidence, so DEFECTIVE is not read as "everything is wrong":

1. **Import direction is correct in the subject.** It imports only `vue`, one demo utility, and
   `highlight.js` — **nothing** from `@mkbabb/value.js`, nothing from shell or boot. A presentation
   leaf that reaches the parser only by emitting upward (`:27–29` → `GradientVisualizer.vue:102–108`
   → `useGradientModel.applyCSS`) is the right shape. No feature → shell edge, no component → boot
   edge.
2. **No deep reaches anywhere in the subtree or the demo.**
   `grep -rn 'from "@src|\.\./src/|dist/subpaths' demo/workbenches/gradient/` → 0 hits;
   `grep -rn "@src" demo/` → 0 hits; `grep -rn "\.\./demo\|@demo" src/` → 0 hits. No cycle, no
   back-door.
3. **Every library import is one a real consumer could write.** All demo imports of the library go
   through published subpaths (`/color /css /math /easing /quantize`), each a key in
   `package.json#exports`. In this subtree specifically: `gradientParse.ts:21` `/css`;
   `useGradientModel.ts:11`, `useGradientInterpolation.ts:8,9`, `useGradientCSS.ts:12,13` `/color`;
   `useGradientCSS.ts:20,24` `/easing`; `useGradientCSS.ts:25,29` `/css`. The single textual
   occurrence of the bare specifier (`demo/shared/utils.ts:12`) is inside a comment, not an import.
4. **The vite self-alias set is generated from the exports map, not hand-rolled**
   (`vite.config.ts:41–50`), with anchored `^…$` regexes — so the demo cannot silently resolve a
   subpath the package does not publish, and a prefix rewrite cannot swallow a subpath specifier.
   This is the mechanism that would otherwise make the demo a false proof of the public API, and it
   is correctly built.
5. **`verbatimModuleSyntax` is satisfied.** The subject's four imports (`:2,3,5,6`) bind runtime
   values only. Its neighbours are compliant: `useGradientModel.ts:11,12,13,17`,
   `useGradientInterpolation.ts:8`, `useGradientCSS.ts:12`, `GradientVisualizer.vue:22,25,26,28` all
   use `import type` correctly.
6. **Vue 3.5 idiom is correct.** `useTemplateRef` at `:31`, reactive props destructure with a default
   at `:16`, typed `defineEmits` at `:27`.
7. **The non-throwing rejection path works end to end.** Measured live: `notacolor` →
   `verdict: "unparseable color \"notacolor\""`, `aria-invalid="true"`, destructive border, user text
   preserved (`live-04-verdict-working.png`).
8. **The named historical `useDark` triple-store suspect is already dead.**
   `demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:70–80` documents S.W4-8's cure;
   no dark store lives in this component or its neighbours. The one scheme authority is glass-ui's
   `useGlobalDark` in `App.vue`.
9. **`useGradientInterpolation` is not a dead export** — consumed at `useGradientModel.ts:14,86`;
   `interpolateStopColors` at `GradientVisualizer.vue:23,79` and
   `easing/useSpecimenRows.ts:15,53`.

---

## Ledger note — the visual audit's `/#/gradient` row is a false negative

`audit/visual/REPORT.md:125,140,155,170` and `REPORT.json` show `/#/gradient` with `overflowX 0`,
`pageErrors []`, `consoleErrors []`, `main 1` on all four Safari matrices. That is **not** evidence
of health for L-1: `ErrorBoundary` (`App.vue:50`, `onErrorCaptured` → `return false`) swallows the
throw before any `pageerror` listener can see it, and the crash is interaction-only, so a static
capture sweep cannot reach it. Likewise L-3 is invisible to the default matrices by construction —
the plate only paints under `prefers-reduced-transparency: reduce`.

Recommended crawl hardening: assert the **absence** of `[role="alert"].vj-error-boundary` in the DOM
rather than the absence of page errors, and capture the reduced-transparency matrix alongside
light/dark.

---

## Artifacts in this directory

| file | what it shows |
|---|---|
| `live-00-baseline.png` | `/#/gradient` at rest, desktop 1440×1000 |
| `live-01-mtf001-oklch-empty.png` | **the L-1 blocker** — the whole app reduced to a "Try again" pill after typing `oklch()` |
| `live-02-after-try-again.png` | recovery restores the *default* gradient; the user's text is gone |
| `live-03-reduced-transparency.png` | L-3 — the plate painting *only* under `prefers-reduced-transparency: reduce` |
| `live-04-verdict-working.png` | the control: the non-throwing rejection path rendering correctly |
| `live-05-two-code-rows-chrome-divergence.png` | L-4 — the OM-13 readout and the CSS editor, 137 px apart, two hand-rolled chromes |
| `repro-MT-F001-panel-destroyed.png` | third pass — the L-1 wipe, captured from a *fresh page load* |
| `repro-MT-F001-panel-destroyed-settled.png` | third pass — the settled post-crash state |
| `repro-MT-F001-boundary-element.png` | third pass — element-scoped on `.vj-error-boundary`: **only the pill paints** (L-17) |

---
---

# § Third pass — 2026-07-29

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit declaration this seat was spawned with. Declared, not inherited. No defect.

## What this pass did

E-1, twice-audit, third iteration. I did **not** inherit L-1…L-12; I re-derived the load-bearing
ones independently against HEAD `c654824e`. Receipts below. Then I pushed on the two places the
prior passes had left soft: the **type-level** view of the public surface (both prior passes checked
only the *runtime* alias), and the **CSS-level** control layer of the design system (both prior
passes censused only the *component* export subpaths).

Both soft spots were load-bearing. One of them contains a **retraction of a prior negative proof**.

### Independently re-verified — the prior findings stand

| prior | re-verified how | verdict |
|---|---|---|
| **L-1** BLOCKER | re-ran the 8 throwing inputs against `dist/subpaths/css.js`; re-reproduced the app wipe from a **fresh page load** (the prior repro reused a warm session); traced the exact site | **STANDS**, root cause pinned to `src/css/grammar.ts:181` |
| **L-8** MINOR | `grep -rln "\bcn(" demo` → **1** file, its own definition. Prior claim of zero call sites is correct | **STANDS** |
| **L-9** MINOR/HYP | **reproduced** — see the upgrade below | **UPGRADED → MAJOR** |
| **L-10** MINOR/HYP | I also could not make `hljs.highlight` throw with `css` registered | **STANDS as hypothesis** |
| negative proof #5 (`verbatimModuleSyntax`) | all four subject imports bind runtime values | **STANDS** |
| negative proof #6 (Vue 3.5 idiom) | `useTemplateRef` `:31`, reactive destructure `:16` | **STANDS** |
| negative proof #2 (no deep reaches) | `grep -rn "@src" demo` → 0 | **STANDS** |
| negative proof #4 (generated alias ⇒ no false proof of the public API) | see **RETRACTION** below | **PARTIALLY RETRACTED** |

**On L-5's number.** The second pass corrected the shipped cost to **12,670 B gz** (bundled,
minified). I did not re-derive that — `dist/gh-pages/assets/index-*.js` is a **698-byte stub** from
a failed build, so no built chunk was measurable this pass. The complementary figure I *can* give is
the development cost actually served by the live dev server:
`node_modules/.vite/deps/highlight__js_lib_core.js` = **57,066 B** +
`highlight__js_lib_languages_css.js` = **15,967 B** = **73,033 B**. Both figures are true of
different things; 12,670 B gz remains the authoritative *shipped* number.

---

## RETRACTION — negative proof #4 was true of Vite and false of TypeScript

The second pass wrote, as positive evidence of health:

> *"4. The vite self-alias set is generated from the exports map, not hand-rolled
> (`vite.config.ts:41–50`)… **This is the mechanism that would otherwise make the demo a false
> proof of the public API**, and it is correctly built."*

The first sentence is true. The conclusion does not follow, because **the demo is compiled by two
resolvers, and only one of them is generated.** `vue-tsc` does not read `vite.config.ts`. It reads
`tsconfig.demo.json#paths` — which is **hand-written**, is *asserted in its own comment* to mirror
the exports map, and has drifted. That is L-13.

The generated Vite alias therefore protects the demo's **runtime** from being a false proof of the
public API, and protects its **typecheck** not at all.

---

## L-13 — MAJOR · `tsconfig.demo.json#paths` is a false map of the public surface; the specifier this component's parse path depends on is not in it

`vite.config.ts:38-49` generates its aliases from `package.json#exports` and says so:
*"GENERATED (not hand-rolled) so the alias set can never drift from the exports map."*
`tsconfig.demo.json:37-49` then hand-lists the same surface and claims parity:
*"Mirrors the `vite.config.ts` runtime self-alias generated from the same map… a CLOSED 8-key set."*

Measured diff at HEAD:

```
exports  : /color  /css  /easing  /math  /quantize  /transform  /value
tsconfig : (root)  /color  /easing  /math  /parsing  /quantize  /transform  /units

in tsconfig, NOT in exports : @mkbabb/value.js   @mkbabb/value.js/parsing   @mkbabb/value.js/units
in exports,  NOT in tsconfig: @mkbabb/value.js/css   @mkbabb/value.js/value
```

Five of nine entries are wrong. The three phantom keys point at files that do not exist:

```
dist/index.d.ts                MISSING       dist/subpaths/css.d.ts     EXISTS
dist/subpaths/parsing.d.ts     MISSING       dist/subpaths/value.d.ts   EXISTS
dist/subpaths/units.d.ts       MISSING
```

**`@mkbabb/value.js/css` — the exact specifier `gradientParse.ts:21` imports `parseCssColor` and
`parseCssScalar` through, the one L-1 travels down — has no `paths` entry at all.** It typechecks
today only because `tsconfig.base.json` sets `moduleResolution: "bundler"`, which falls through to
the real `exports` map. The gradient parse path is type-resolved **by accident**, not by
declaration.

Latent, not currently breaking: `grep` over `demo/**/*.{ts,vue}` finds **0** imports of the root
barrel, `/parsing`, or `/units`, so `npm run typecheck` is green. The defect is that the demo's
*declared model* of the library's public surface is wrong in the majority of its entries, and the
first thing to break under a flip to `node16` resolution — or any tool that consults `paths` before
`exports` — is the gradient parse path.

**Mechanism:** one surface, two models, one generated and one hand-maintained. The hand one rotted,
silently, because nothing compares them.

**Cure — subtraction, not a second generator.** Delete the seven `@mkbabb/value.js*` entries from
`tsconfig.demo.json#paths` outright. `moduleResolution: "bundler"` already reads
`package.json#exports` — which is precisely why `/css` resolves today. `package.json#exports`
becomes the single source of truth for *both* compilers and there is no second artifact left to
drift. (`vue` / `@vue/*` stay: those serve the dedupe posture, an unrelated concern.)

---

## L-14 — MAJOR · the focus ring resolves to the wrong ink: a fourth focus idiom, in a folder whose two siblings use the certified one

`GradientCodeEditor.vue:93` asks for `focus-visible:ring-2 focus-visible:ring-ring/40`. Measured
live on the focused editor (`localhost:9000/#/gradient`, fresh load, Chromium):

```
matchesFocusVisible : true
--tw-ring-color     : (EMPTY)
--tw-ring-shadow    : 0 0 0 calc(2px + 0px) currentcolor        ← degraded to currentcolor
boxShadow (resolved): rgb(28, 25, 23) 0px 0px 0px 2px           ← opaque near-BLACK
outline             : none                                       ← the component sets outline-none
```

At `:root`:

```
--ring             : (EMPTY)          --focus-ring-inner : rgba(0, 0, 0, 0.85)      ← house: resolves
--color-ring       : (EMPTY)          --focus-ring-outer : rgba(255, 255, 255, 0.92) ← house: resolves
                                      --focus-ring-color : oklch(47.1% 0.188 9.8deg) ← glass: resolves
```

Tailwind v4 compiles `ring-ring/40` against `--color-ring`, which this app never defines, so the
"40 %-alpha ring token" silently becomes a **hard opaque `#1C1917` 2 px ring**. It is not the ink
the class names, not the house affordance, and not the glass one.

`demo/styles/focus-ring.css:11-13` documents this as a **cured historical defect**:

> *"the `--ring`/`--color-ring` token it reached resolved EMPTY — so even an un-clobbered ring
> painted nothing."*

It has recurred here — and the cure is in use **two files away in the same directory**:

- `GradientStopEditor.vue:346-347` — `0 0 0 1px var(--focus-ring-inner), 0 0 0 3px var(--focus-ring-outer)`
- `GradientEasingEditor.vue:230, 287` — `box-shadow: var(--focus-ring-shadow)`

Four idioms alive at once for one concept: the house dual-contrast recipe, `--focus-ring-shadow`,
glass-ui's `.input-pill:focus-visible`, and **27** demo usages of the broken `focus-visible:ring-*`
(`grep -rn "focus-visible:ring-" demo --include="*.vue" | wc -l` → 27). All 27 are silently
downgraded right now.

**Cure.** Adopting the L-4 / L-15 field primitive deletes line 93's ring clause and inherits one
certified affordance. Independently and immediately: lint-ban the `ring-ring` class literal across
`demo/` (`no-restricted-syntax`) — a design token that resolves empty is a silent downgrade, and a
silent downgrade is the exact failure mode a token system exists to prevent.

---

## L-15 — MAJOR · glass-ui *does* ship the control surface and state ladder this component hand-rolls — at the CSS layer both prior passes did not census

Prior L-4 censused **74 export subpaths** and concluded, correctly, that glass-ui ships no
code-field *component*. That census stopped at `package.json#exports`. Below it, glass-ui ships a
**CSS control layer** that already carries the exact contract this component re-implements —
`node_modules/@mkbabb/glass-ui/dist/styles/glass/control-surfaces.css`:

```css
.input-pill  { height: var(--control-pill-h, var(--control-h-md));
               border-radius: var(--radius-pill);
               border: 1.5px solid var(--control-surface-border);
               background: var(--control-surface-bg);
               backdrop-filter: var(--glass-cell-backdrop-filter, var(--control-surface-blur));
               transition: background-color …, border-color …, box-shadow …, color …, opacity …; }
.input-pill:focus-visible                                   { border-color: var(--color-accent-opaque, var(--focus-ring-color));
                                                              box-shadow: 0 0 0 2px var(--color-accent, …); }
.input-pill:where(:user-invalid, [aria-invalid="true"])     { border-color: var(--destructive);
                                                              background: color-mix(in srgb, var(--destructive) 8%, var(--glass-bg-quiet)); }
.input-pill:where(:user-valid)                              { border-color: var(--success); }
.input-pill:disabled                                        { opacity: .5; cursor: not-allowed; }
.control-surface { background: var(--control-surface-bg); border: 1px solid var(--control-surface-border);
                   backdrop-filter: …; }
```

Set against `GradientCodeEditor.vue:93-97`:

```vue
class="… rounded-lg glass-wash border … outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
:class="[hasError ? 'border-destructive' : 'border-border/40']"
:style="{ transition: `border-color var(--duration-normal) …, box-shadow var(--duration-normal) …` }"
```

Line-for-line the same contract — surface, border, invalid ink, focus ring, transition — rebuilt in
the demo against a **different and partly empty token set** (L-14). And the component **already
emits `:aria-invalid="hasError || undefined"` at line 92**, so glass-ui's
`[aria-invalid="true"]` selector would fire for free. Adopting the design system deletes line 94
and lines 95-97 outright. The inline `:style` is separately edict-5: a per-instance override of a
property the design system declares at root level.

**This sharpens the glass-forward ask rather than creating a new one.** The blocker is not that the
ladder is missing — it exists and is certified. The blockers are exactly two, and both are small:

1. **`.input-pill` is hard-pinned to `border-radius: var(--radius-pill)`** — a capsule. Wrong for a
   `min-h-[5rem]` multi-line code box, and wrong for OM-13's rounded rect
   (`repro`/`OM-13-easing-readout-not-glass-input.png`, which I read: a rounded-rect wash carrying
   `cubic-bezier(0, 0, 1, 1)` in Fira with two trailing ghost icons).
2. **Nothing seats a non-native control in it.** `./forms` exports `Input` (native `<input>`, props
   only — no slot, no `asChild`), `Textarea` (native `<textarea>`), `Combobox`. `./labeled-field`
   supplies label/description/error chrome and yields `controlId`/`labelledBy`/`describedBy`, but
   never the control. `./surface` is a plate, not a control. So a `contenteditable` editor and a
   `<code>` readout row cannot wear the certified surface today.

> **glass-ui ask (MT-F037 / OM-13, and this component's chrome — one ask, two marks).**
> A `Field` / `ControlSurface` in `./forms` carrying the existing `.input-pill` state ladder,
> decoupled from `<input>` and from the pill radius: **(a)** `asChild` / default slot so a
> non-native control wears it; **(b)** a `radius` token prop (`pill | lg | card`) rather than a
> hard `--radius-pill`; **(c)** `leading` / `trailing` adornment slots for the copy + tune icons.
> Relay to the glass-ui BH inbox — the standing formation invariant. **Never a local restyle in
> `demo/`.**

One primitive discharges OM-13, this component's hand-rolled chrome, its focus ring (L-14), and the
three parallel `contenteditable` sites (`GradientCodeEditor.vue:88`, `demo/shell/dock/ColorInput.vue:13`
at 377 lines, `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue:23` at 214 lines).

---

## L-16 — MAJOR · **UPGRADE of L-9, HYPOTHESIS → CONFIRMED**, and the blast radius is a *different workbench*

The second pass labelled the uncancelled debounce a hypothesis: *"Reproduction: NONE. I did not
exercise a mid-keystroke pane switch."* I exercised it. It reproduces, and the consequence is worse
than hypothesized — it is not confined to the gradient tree.

```js
// on /#/gradient, fresh load
el.textContent = "linear-gradient(90deg, oklch(), blue)";
el.dispatchEvent(new InputEvent("input", { bubbles: true }));
location.hash = "#/mix";              // leave inside the 500 ms debounce window
// 1600 ms later:
→ { boundaryShown : true,
    url           : "http://localhost:9000/#/mix",
    mainText      : "This panel hit an unexpected error.\n\n
                     Cannot read properties of undefined (reading 'replace')\n\nTry again" }
```

**The Mix workbench is destroyed by a keystroke typed into the Gradient workbench** — a pane with no
relationship to this component, that the user is actively looking at, reached after they had already
navigated away from the offending editor.

Control probe, same navigation, *valid* text (`linear-gradient(45deg, red, blue)`):
`windowErrors: []`, `mainHasBoundary: false`. So the cross-route damage is specifically L-1 arriving
**after unmount**, where the boundary that would have owned the subtree is already gone.

This re-scopes L-9 from a tidiness MINOR to a MAJOR that compounds the BLOCKER: it converts a
bounded, in-pane crash into an arbitrary-route crash.

**Cure — structural, not another `onUnmounted`.** The codebase already knows the discipline
(`demo/picker/ColorPicker.vue:383-384`, `demo/color-session/useColorPersistence.ts:116` both call
`.cancel()`); this component forgot, and the next one will too, because a `.cancel()` you must
*remember* is not an invariant. Delete `demo/shared/utils.ts#debounce` (L-8 already argues the
module should go) and use **`useDebounceFn` from `@vueuse/core`** — already a live dependency,
already imported by six demo files (`EasingSpecimenStrip.vue:12`, `ColorPicker.vue:123`,
`Dock.vue:16`, `useColorPersistence.ts:2`, `useAtmosphere.ts:23`, `usePaletteStore.ts:1`). It binds
to the effect scope and cancels on unmount **by construction**. Nine call sites migrate; the
finding class cannot recur.

Note this also strengthens L-8's cure: the correct end state is not `demo/shared/debounce.ts` but
**no demo-owned debounce at all**, leaving `demo/shared/cn.ts` — one module, one concept, and the
`shared/` directory *narrowed* rather than a new one invented (edict 3).

---

## L-17 — INFO · the boundary this crash lands in tells the user nothing, and does not clear on navigation

Downstream of L-1, not this component's code — but it is what the user sees when this component
crashes, so it belongs in the ledger.

**It paints no message.** Two independent captures — `repro-MT-F001-panel-destroyed-settled.png`
(full viewport) and `repro-MT-F001-boundary-element.png` (element-scoped on `.vj-error-boundary`) —
show **only** the `Try again` pill. The `CircleAlert` glyph, the Fraunces message and the
machine-truth detail line do not appear in either.

Mechanism **unresolved**, and I flag it as a hypothesis rather than assert one, because computed
style says it should paint:

```
color: rgb(28, 25, 23) · opacity: 1 · visibility: visible · filter: none
webkitTextFillColor: rgb(28, 25, 23) · no ancestor with filter/blend/opacity ≠ 1
elementsFromPoint(720, 455) → [P.font-display.text-heading.text-foreground, DIV.vj-error-boundary, MAIN.pane-main, …]
```

The `<p>` is topmost, opaque and dark-inked, and does not render. **Hypothesis for the visual
seat:** a paint/compositing defect in `ErrorBoundary.vue`, not a token defect.

Two firm facts alongside it:

- **The copy is wrong.** `App.vue:50` wraps the entire `pane-container`, so it is never one panel —
  measured, *both* panes vanish. "This panel hit an unexpected error" misdescribes what happened.
- **It is sticky.** `ErrorBoundary.vue:55-69` has no route watcher, so `caught` survives navigation.
  Measured: after the crash, `location.hash = "#/gradient"` still returned
  `"NOT FOUND — did not recover"`; only the `Try again` button or a full reload clears it.

Together with the invisible message this is the complete user-facing account of L-1: **the entire
workspace is replaced by a bare atmosphere and one unexplained pill, and navigating away does not
escape it.**

---

## Lattice delta — what the third pass adds to § The greenfield lattice

The prior lattice stands. Three entries change, all in the direction of *less* machinery:

| layer | prior pass | third pass |
|---|---|---|
| `tsconfig.demo.json#paths` | not addressed | **delete the seven value.js entries.** `moduleResolution:"bundler"` already reads `exports` — that is why `/css` resolves. One source of truth, zero generators (L-13) |
| `@mkbabb/glass-ui/forms` `<CodeField>` | proposed as a new component | **`<Field>` / `<ControlSurface>` — a thinner ask.** The state ladder already exists in `control-surfaces.css`; it needs `asChild` + a `radius` token + adornment slots, not a new ladder (L-15) |
| debounce | `onUnmounted(debouncedParse.cancel)`, or fold into `CodeField` | **delete the demo's `debounce`; `useDebounceFn` from the already-installed `@vueuse/core`.** Scope-bound, unmount-safe by construction — the only form that makes L-16 unrepeatable |

And one addition to the deletions table:

| delete | replaced by |
|---|---|
| the 7 `@mkbabb/value.js*` entries in `tsconfig.demo.json#paths` (L-13) | `package.json#exports`, read directly by `moduleResolution:"bundler"` |
| `demo/shared/utils.ts#debounce` + its 9 call sites (L-16) | `@vueuse/core` `useDebounceFn` |
| the `ring-ring/40` clause on `:93` and 26 sibling usages (L-14) | one certified ring, inherited from `<Field>` |

---

## Third-pass roll-up

| id | sev | finding | new? |
|---|---|---|---|
| L-1 | **BLOCKER** | `/css` `parseCssColor` typed total, ships partial (`grammar.ts:181` `slash[0]!`); wipes the app | re-verified |
| L-13 | MAJOR | `tsconfig.demo.json#paths` false in 5 of 9 entries; `/css` unmapped — **retracts negative proof #4** | **NEW** |
| L-14 | MAJOR | `--color-ring` empty → focus ring paints opaque black; 4th idiom; siblings use the certified one | **NEW** |
| L-15 | MAJOR | glass-ui's `.input-pill` ladder already exists — the ask is `asChild` + radius token, not a new component | **NEW** |
| L-16 | MAJOR | uncancelled debounce carries L-1 across routes — **destroys the Mix workbench** | **UPGRADE** of L-9 |
| L-17 | INFO | the boundary paints no message, misdescribes its scope, and is sticky across navigation | **NEW** |
| L-2…L-8, L-10…L-12 | as recorded above | unchanged | — |
