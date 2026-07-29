# CHALLENGE-L — library structure under `GradientCodeEditor.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, as
declared at spawn. Seat declared, not inherited.

- **Axis:** library structure — module boundaries, ownership, dependency direction, public surface.
- **Subject:** `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines).
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict:** **DEFECTIVE** — 1 BLOCKER, 6 MAJOR, 4 MINOR.

---

## Summary of the thesis

The subject file is a thin, well-behaved presentation leaf. It imports nothing from
`@mkbabb/value.js` at all, has no deep reaches, and its own layering is correct. **Every defect
found is a structural defect in what surrounds it**: the library's public parse contract is
unsound and the demo built a 302-line parser on top of that unsoundness; the gradient grammar
that belongs in `@mkbabb/value.js/css` lives in `demo/`; the design system has no code-field
primitive so two adjacent code fields in this one pane are hand-rolled two different ways; the
component wears a dead CSS class that fires only in the reduced-transparency matrix; and it is
the sole surviving reason a 27.9 KB gz highlight.js runtime chunk exists next to a *dead*
build-time highlighting facility.

The single loudest consequence: **typing `oklch()` into this editor destroys the entire
application** — both panes, all unsaved pane state — and silently discards the user's authored
text, with zero console output.

---

## L-1 — BLOCKER · the library's `ParseResult` contract is a lie, and the lie destroys the whole app

### The unsound public surface

`@mkbabb/value.js/css` is a real published subpath (`package.json#exports["./css"]` →
`./dist/subpaths/css.js`), and `src/subpaths/css.ts` exports `parseCssColor` / `parseCssScalar`.
Their declared type is total:

```
src/css/grammar.ts:257
export function parseCssColor(source: string): ParseResult<CssColor> {
```

`ParseResult` promises "a value or a typed failure". The function does not honour it.

```
src/css/grammar.ts:63-85   splitTopLevel() drops empty parts (line 79: `if (part) parts.push(part)`;
                           line 85: `if (tail) parts.push(tail)`) ⇒ splitTopLevel("", "/") === []
src/css/grammar.ts:177     const slash = splitTopLevel(body, "/");
src/css/grammar.ts:181     const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
                                                            ^^^^^^^^^
```

The `!` non-null assertion at line 181 is **false** whenever `body` is empty or whitespace. It is
the assertion that silenced the exact check that would have caught this.

Reproduction (`npx tsx` against `src/css/index`, run from the repo root, output pasted verbatim):

```
"oklch()"            -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"rgb()"              -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"hsl()"              -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"lab()"              -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"lch()"              -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"color()"            -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"oklab()"            -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"hsl(  )"            -> THROW: TypeError : Cannot read properties of undefined (reading 'replace')
"oklch(0.7"          -> reject
"oklch(0.7 0.1 145)" -> OK
```

### The demo architected directly on the false contract

`demo/workbenches/gradient/composables/gradientParse.ts:16-18` states the premise in prose:

> Each token is then validated by the **LIBRARY's** own parsers (`parseCssColor` /
> `parseCssScalar` — the **validity oracles**; the demo never hand-validates a color).

and `gradientParse.ts:44-47` states the guarantee it derives from it:

> `/** Model-or-reject: the whole model, or a one-line reason. Never a partial. */`

Both are false. Same tsx run, through the real demo path:

```
"linear-gradient(90deg, oklch(0.75 0.15 145), oklch())" -> THROW: TypeError
"linear-gradient(90deg, red, rgb())"                    -> THROW: TypeError
"linear-gradient(90deg, red, hsl(  ))"                  -> THROW: TypeError
"linear-gradient(90deg, red, blue)"                     -> OK
```

`isColorToken()` (`gradientParse.ts:92-94`) is a bare `return parseCssColor(token).ok` — the
oracle throws straight through it.

### What the user actually sees — live, headless Chromium against `localhost:9000`

Route `/#/gradient`, type `linear-gradient(90deg, red, oklch())` into the editor, wait past the
500 ms debounce:

```
--- baseline ---
{ "editorPresent": true,
  "editorText": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
  "tilePresent": true, "h3s": "Gradient|Interpolation|Easing|CSS|My Palettes",
  "bodyTextLen": 649, "uncaught": [] }

--- after typing oklch() ---
{ "editorPresent": false, "editorText": null, "tilePresent": false,
  "verdict": null, "h3s": "", "bodyTextLen": 142, "uncaught": [] }
LOG: []
```

The **whole application** is gone — not just the gradient pane. `h3s` drops to `""`, which
includes `My Palettes`: the *other, unrelated pane* is destroyed too. State after the crash:

```
STATE AFTER CRASH:
{ "alertPresent": true,
  "bodyText": "dev misconfigured — run `npm run dev` | This panel hit an unexpected error. |
               Cannot read properties of undefined (reading 'replace') | Try again",
  "editorGone": true, "palettesGone": true,
  "focused": "DIV.vj-error-boundary flex flex-col items-ce" }
LOG: []
```

Witness: `live-01-mtf001-oklch-empty.png` (this directory) — a blank aurora field with one
"Try again" pill.

Three compounding structural facts:

1. **The boundary is at the app root, not the pane.** `demo/color-picker/App.vue:50` wraps
   *everything* in one `<ErrorBoundary>`; `App.vue:140` closes it. One leaf's parse throw
   therefore takes the entire application, which is why `My Palettes` dies with the gradient.
2. **Zero diagnostics.** `ErrorBoundary.vue:68` `return false` halts propagation, so the throw
   never reaches `console`. Captured console + `pageerror` + `window.onerror` +
   `unhandledrejection` logs were **all empty** (`LOG: []`, `"uncaught": []`). A shipping crash
   that leaves no trace in telemetry.
3. **Recovery destroys the user's work.** Clicking "Try again":

   ```
   AFTER 'Try again': { "editorBack": true,
     "editorText": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
     "bodyLen": 619 }
   ```

   The editor comes back with the *default* gradient. The user's authored text is gone. That
   directly falsifies the subject's own docblock, `GradientCodeEditor.vue:38-40`:

   > "A failed parse keeps the user's text verbatim alongside the verdict — **WIP is never
   > destroyed**."

Contrast case proving the *non-throwing* rejection path is sound (same probe):

```
INVALID notacolor: { "tokens":0, "text":"linear-gradient(45deg, gold, notacolor)",
                     "verdict":"unparseable color \"notacolor\"",
                     "invalid":"true", "destructive":true }
```

Witness: `live-04-verdict-working.png`. So the component's error design is right; the library
contract underneath it is wrong.

**Cure (transposition, not patch).** `parseCssColor` must be *total* — that is the library's job
and its type already claims it. Delete the `!` at `grammar.ts:181` and return
`failure(source, "css_syntax", ["color components"])` when `splitTopLevel(body, "/")` is empty.
Then sweep every remaining `!`-on-index in `src/css/grammar.ts` — `!` is exactly the construct
that manufactured this class of defect, and MT-F001 is one instance of a family, not a one-off.
Secondarily, the app-root `ErrorBoundary` should be per-pane (`App.vue:50`) so a workbench fault
cannot evict an unrelated pane's state.

---

## L-2 — MAJOR · `parseGradientCSS` is library code living in the demo

`demo/workbenches/gradient/composables/gradientParse.ts` is 302 lines of pure, DOM-free,
framework-free CSS-Images-L3 §3.1–3.3 grammar. It has no Vue import. It is the exact companion of
`parseCssColor` and `parseCssScalar`, which *are* in `src/css/` and *are* published on
`@mkbabb/value.js/css`. Its serializer half is likewise in the demo
(`demo/workbenches/gradient/composables/useGradientCSS.ts`, 11,981 bytes) rather than beside
`serializeCssColor` (`src/css/grammar.ts:289`).

**Duplicate ownership, proven.** The library already owns a depth-aware, quote-aware top-level
splitter with both a char mode and a `"space"` mode:

```
src/css/grammar.ts:63   function splitTopLevel(source: string, separator: string | "space"): string[]
```

The demo hand-rolls it twice, quote-unaware:

```
gradientParse.ts:52-67   splitTopLevelCommas(s)   ≈ splitTopLevel(s, ",")
gradientParse.ts:70-89   tokenizeTopLevel(s)      ≈ splitTopLevel(s, "space")
```

The demo copies are *not* strictly redundant — `gradientParse.ts:210` needs empty segments
retained to detect doubled/trailing commas, which the library version drops at line 79. That is a
genuine missing mode on the library primitive, not a reason for a second implementation. Two
private implementations of "split CSS at paren depth 0" is the unique-semantic-ownership
invariant broken.

Likewise `angleToDegrees` (`gradientParse.ts:97-108`) and `percentValue`
(`gradientParse.ts:111-118`) are CSS unit arithmetic — `deg/grad/rad/turn` conversion is
`@mkbabb/value.js` domain, not gradient-workbench domain.

**Cure.** `@mkbabb/value.js/css` gains `parseCssGradient` / `serializeCssGradient`, and
`splitTopLevel` gains a `keepEmpty` mode and is exported. `gradientParse.ts` and the serializer
core of `useGradientCSS.ts` delete; the demo keeps only reactive glue. This is also the honest
fix for L-1's blast radius: a library-owned gradient parser gets the library's test suite, and the
demo stops being the place where the parser's totality is discovered by a user.

---

## L-3 — MAJOR · the component wears a dead CSS class that is live *only* in the reduced-transparency matrix

`GradientCodeEditor.vue:93` applies `glass-wash`. Full-repo census of that class:

```
demo/styles/foundation.css:775        .glass-wash,     ← inside @media (prefers-reduced-transparency: reduce)
demo/styles/foundation.css:786        .glass-wash,     ← same media block
GradientStopEditor.vue:282            "...glass-wash `contain: paint` clip — the R8-17 class — died with"
GradientCodeEditor.vue:93             class="hljs ... glass-wash border ..."
```

There is **no definition of `.glass-wash` in the default cascade** — not in `demo/styles/`, not in
`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`. A sibling file in the same directory
(`GradientStopEditor.vue:282`) records that the class *died*. The subject is its only surviving
consumer in the entire demo.

It is not merely inert. `demo/styles/foundation.css:764` opens
`@media (prefers-reduced-transparency: reduce)`, and lines 786-789 force
`background-color: var(--surface-reduced-opaque, var(--card)) !important` on `.glass-wash`.
Measured live via CDP `Emulation.setEmulatedMedia`:

```
DEFAULT             : {"editorBg":"rgba(0, 0, 0, 0)","editorBackdrop":"none","editorRadius":"8px"}
REDUCED-TRANSPARENCY: {"editorBg":"rgb(253, 245, 236)","editorBackdrop":"none","editorRadius":"8px"}
```

Witness: `live-03-reduced-transparency.png`. A retired class that changes the component's
appearance *only* in the accessibility matrix nobody screenshots by default — the worst variety of
dead code. Violates edict 2 (no legacy) and edict 5 (styling belongs at the root component level,
not as an orphan utility on one instance).

**Cure.** Delete `glass-wash` from line 93 and from `foundation.css:775,786`. The editor's surface
must come from the glass primitive of L-4, which owns its own reduced-transparency behaviour.

---

## L-4 — MAJOR · MT-F037 family: two hand-rolled code fields, and the glass census confirms no primitive fits

Owner mark OM-13 (`audit/visual/owner-marked/OM-13-easing-readout-not-glass-input.png`) names the
cubic-bezier readout row. The subject is the **second instance of the same defect, 137 px below
it in the same pane**. Both are code-literal fields; neither is a glass-ui component; their chrome
diverges on every axis. Measured live, same page, same paint:

| | easing readout (`GradientEasingEditor.vue:176`) | CSS editor (`GradientCodeEditor.vue:93`) |
|---|---|---|
| element | `div.readout-rail` (hand-rolled) | `div[contenteditable]` (hand-rolled) |
| radius | `6px` (`rounded-md`) | `8px` (`rounded-lg`) |
| background | `oklab(0.913295 0.00550478 0.0130424)` (opaque `bg-well`) | `rgba(0, 0, 0, 0)` (nothing — see L-3) |
| border | `0px` | `1px solid oklab(… / 0.4)` |
| padding | `4px / 8px` | `12px / 12px` |
| trailing actions | inside the row (2 bare `<button class="rail-btn">`) | outside, in the section `<h3>` (`GradientVisualizer.vue:254`) |

Witness: `live-05-two-code-rows-chrome-divergence.png`.

**Census of installed glass-ui 7.0.0 (`node_modules/@mkbabb/glass-ui`, `version: "7.0.0"`):**

- `./forms` → `components/input`, `components/textarea`, `components/combobox`.
- `components/input/types.d.ts` — `InputProps` has **no** leading/trailing slot props;
  `type?: "email"|"password"|"search"|"tel"|"text"|"url"` has no code variant.
- `components/input/Input.vue.d.ts` — the `DefineComponent` slots type parameter is `{}`:
  **zero slots**. It renders a native `<input>`, which cannot host highlighted markup.
- `components/textarea/types.d.ts` — same shape, native `<textarea>`, no slots, no highlighting.
- `components/search/searchVariants.d.ts` — variants are `inline | bare | floating`; a search
  control, not a code field.
- `components/labeled-field/types.d.ts` — composes `InputProps | SliderProps | SwitchProps`; no
  code/mono member.
- `dist/glass-ui.css` — grep for `.glass-input` / `.glass-field`: **zero hits**. There is no
  standalone field-chrome utility to reuse.

**No installed glass-ui primitive fits either a syntax-highlighted multi-line code field or an
icon-trailing single-line code readout.** Per standing law this is a **marked glass-forward ask,
never a local restyle**: glass-ui needs a `CodeField` in `./forms` — mono register, `invalid`
state on the shared control axis, a trailing-action slot, and an optional pre-highlighted view
mode. Both this component and the OM-13 readout then become consumers of one primitive, and the
divergence closes by construction rather than by two files agreeing to match.

---

## L-5 — MAJOR · 27.9 KB gz of runtime highlight.js that is off exactly when the user is typing

Measured token counts in the editor's `innerHTML` across the authoring lifecycle:

```
MOUNT             : {"tokens":9,  "text":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0…"}
MID-TYPING (focus): {"tokens":0,  "text":"linear-gradient(45deg, gold 0%, teal 100%)"}
AFTER DEBOUNCE    : {"tokens":0,  "text":"linear-gradient(45deg, gold 0%, teal 100%)"}
AFTER BLUR        : {"tokens":3,  "text":"linear-gradient(45deg, gold 0%, teal 100%)"}
```

The mechanism is structural, not incidental: `onInput` (`:59-62`) only debounces the parse emit;
`render()` (`:51-53`) is called from `onMounted` (`:81`), from the model watcher (`:76-79`, gated
`if (focused.value) return`), and from `onBlur` (`:68-73`). **Nothing re-highlights while the
editor has focus** — the "editor truce" of `:34-40`. So a *syntax-highlighting* code editor does
not highlight during the one activity it exists for.

Cost of the highlighting that is off:

```
node_modules/highlight.js/lib/core.js          raw=75941  gz=22405
node_modules/highlight.js/lib/languages/css.js raw=18879  gz= 5448
                                                          ------
                                                    total gz=27853  (27.2 KiB)
```

`vite.config.ts:269-272` carries a dedicated `vendor-highlight` rolldown chunk group that exists
*solely* for this import. Mitigation, honestly stated: the gradient pane is lazy
(`demo/shell/usePaneRouter.ts:74` `defineAsyncComponent(() => import("../workbenches/gradient/GradientPane.vue"))`),
so the chunk is deferred, not eager.

The structural sting is that the repo **already owns** a highlighting facility that costs zero
runtime bytes, and it is dead:

```
plugins/vite-source-export.ts:14-16
  "The exports are HTML strings wrapped in `<pre><code class="hljs typescript">`.
   No runtime formatting or highlighting libraries are needed."
```

See L-7 for the proof that it has zero consumers. So the demo ships a runtime highlighter for the
one place highlighting is switched off, beside a build-time highlighter nothing calls.

**Cure.** Once glass-ui owns `CodeField` (L-4), highlighting is the primitive's concern, and the
demo's direct `highlight.js` import, the `vendor-highlight` chunk group, and the truce logic all
delete together. If a truce is still wanted, it belongs in the primitive as a documented
`rehighlight: "blur" | "input"` policy — one home, one behaviour.

---

## L-6 — MAJOR · `demo/ui/` is a 19-directory alias layer over glass-ui

Censused every directory under `demo/ui/`:

```
alert  avatar  badge  button  card  checkbox  collapsible  dialog  dropdown-menu
input  label   popover  radio-group  select  separator  skeleton  slider  switch  tooltip
```

**All 19 contain exactly one file — `index.ts` — and all 19 reference `@mkbabb/glass-ui`.** They
hold no primitives, no variants, no local implementation. They are pure re-export aliases:

```
demo/ui/input/index.ts:1   export { Input } from "@mkbabb/glass-ui/forms";
demo/ui/select/index.ts:1  export { Select, SelectTrigger, SelectItem, SelectValue,
                                    SelectContent, SelectGroup, SelectLabel, SelectSeparator }
                             from "@mkbabb/glass-ui";
```

The subject's own parent imports through the alias layer rather than from the design system:

```
GradientVisualizer.vue:9   } from "../../../ui/select";
GradientVisualizer.vue:10  import { Slider } from "../../../ui/slider";
```

while glass-ui publishes `./select` and `./slider` directly. Edict 2 forbids aliases and dual
paths; this is 19 directories whose only function is to give every design-system component a
second import specifier, and it makes the demo a *false proof* of glass-ui's real ergonomics —
no external consumer would write `../../../ui/select`.

**Cure.** Delete `demo/ui/` wholesale; rewrite the ~60 import sites to the glass-ui subpaths. This
is mechanical and eliminates a whole layer.

---

## L-7 — MAJOR · the `@src` door into library internals, and its stated justification, are both dead

`vite.config.ts` keeps an alias that bypasses the export map entirely:

```
vite.config.ts:70-74
  // ... `@src` SURVIVES ... source snippets via `@src/…?source` (the `sourceExportPlugin`), and
  // for the vitest suite's own `@src` alias in `vitest.config.ts`.
  { find: "@src", replacement: path.resolve(import.meta.dirname, "src") },
vite.config.ts:160
  sourceExportPlugin(),
```

Measured at HEAD:

```
$ grep -rn "?source"  demo/ docs/ src/ test/   (excluding docs/tranches)  → 0 hits
$ grep -rn "@src/"    demo/                                                → 0 hits
```

**Zero `?source` imports and zero `@src/` imports exist in `demo/`.** The plugin, its build-time
prettier + highlight.js dependency, and the alias are all dead, and the comment at :70-73 that
justifies them is false. What remains is an unguarded door: any future demo file can write
`@src/units/color/…` and reach a library internal that the export map deliberately does not
publish, and nothing — no lint rule, no tsconfig path restriction — will stop it.

**Positive control (this is also the negative proof, §Negative proof below):** the convention
currently holds. Full census of the demo's library imports:

```
25  @mkbabb/value.js/color
10  @mkbabb/value.js/css
 6  @mkbabb/value.js/math
 5  @mkbabb/value.js/easing
 4  @mkbabb/value.js/quantize
```

All five are declared in `package.json#exports`. Zero deep reaches, zero `src/ → demo/` edges. The
boundary is honest today by discipline alone.

**Cure.** Delete the `@src` alias from `vite.config.ts:74` and `sourceExportPlugin()` from :160
(vitest keeps its own alias in `vitest.config.ts:11`, which is correct — tests *should* see
internals). The boundary then becomes structural rather than conventional.

---

## L-8 — MINOR · `demo/shared/utils.ts` is a junk drawer whose rationale cites a surface that does not exist

The subject's only non-vendor import is `GradientCodeEditor.vue:3`
`import { debounce } from "../../../shared/utils";`. That module carries a 14-line docblock whose
central claim is false at HEAD:

```
demo/shared/utils.ts:11-17
 * `debounce` was the last symbol holding 7 demo files on the BARE
 * `@mkbabb/value.js` specifier — the full-barrel import that drags the
 * scroll-timeline grammar chunk (~36 KiB gz) into the eager graph …
 * the demo owns its copy; the library's root-barrel export stands for
 * external consumers.
```

Measured:

```
$ grep -rn "debounce" src/                                    → 0 hits
$ python3 -c "… '.' in package.json['exports']"               → False
$ package.json main / module / types                          → None / None / None
```

There is **no `debounce` in the library** and **no root barrel at all** — `@mkbabb/value.js`
declares only the seven subpaths, no `.` key and no legacy `main`. A bare
`import … from "@mkbabb/value.js"` is unresolvable for a real external consumer. The docblock's
entire justification refers to a public surface that does not exist.

Second occupant of the same module is dead:

```
demo/shared/utils.ts:1-6   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
$ grep -rn "\bcn(" demo/   → 1 hit — the definition itself. Zero call sites.
```

So `shared/utils.ts` = one live symbol (`debounce`, 7 importers) + one dead symbol (`cn`) + a
false narrative, and it is a two-unrelated-concepts junk drawer (a class-name merger and a timer),
which is the seed shape of a god module (edict 1).

**Cure.** Delete `cn` and its `clsx` + `tailwind-merge` devDependencies if nothing else uses them;
rename the module `demo/shared/debounce.ts` (one concept, one home); delete the stale docblock
paragraph outright rather than amending it.

---

## L-9 — MINOR · the debounce timer is never cancelled on unmount — **HYPOTHESIS**

```
GradientCodeEditor.vue:55-57
const debouncedParse = debounce((text: string) => { emit("parse", text); }, 500);
```

`debounce` returns a function carrying `.cancel()` (`demo/shared/utils.ts:36-41`). The subject
never calls it, and the file (all 117 lines read) contains no `onUnmounted`. The pane is lazily
mounted and unmounted on pane switch (`demo/shell/usePaneRouter.ts:74,87`), so a pane switch
within 500 ms of a keystroke leaves a pending timer that emits into a torn-down tree.

**Reproduction: NONE.** I did not exercise a mid-keystroke pane switch. Labelled a hypothesis.

**Cure.** `onUnmounted(debouncedParse.cancel)` — or, correctly, delete the concern: the debounce
belongs inside the `CodeField` primitive of L-4, whose lifecycle owns its own timers.

---

## L-10 — MINOR · masking fallback into an unescaped `innerHTML` sink — **HYPOTHESIS**

```
GradientCodeEditor.vue:43-49
function highlight(code: string): string {
    try { return hljs.highlight(code, { language: "css" }).value; }
    catch { return code; }                    ← silent swallow, raw string
}
GradientCodeEditor.vue:51-53
function render(code: string) {
    if (editorRef.value) editorRef.value.innerHTML = highlight(code);
}
```

The success path is safe — hljs escapes its output. The `catch` arm returns the raw user string,
which line 52 writes to `innerHTML` **unescaped**. It is a masking fallback (edict 2: no masking
fallbacks) sitting on an HTML-injection sink.

**Reproduction: NONE.** `hljs.highlight` with a registered language did not throw in any probe;
I could not reach the catch arm. Labelled a hypothesis on the injection consequence; the *silent
swallow* itself is a fact at :46.

**Cure.** Let it throw, or `textContent` the fallback. Better: the sink disappears with L-4 —
a primitive renders highlighted tokens as a vnode tree, never via `innerHTML`.

---

## L-11 — MINOR · global registry mutation at module scope, inside a package declared side-effect-free

```
GradientCodeEditor.vue:5-8
import hljs from "highlight.js/lib/core";
import css  from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);          ← runs on module evaluation
```

A leaf feature component mutates a process-global singleton registry at import time. No module
owns that registry; ordering is implicit. Meanwhile:

```
$ python3 -c "… package.json['sideEffects']"   → false
```

The package the file lives in declares `"sideEffects": false`, which tells bundlers no module in
the tree has import-time effects. The two declarations contradict each other. (I did not produce a
build in which the registration is dropped — the *drop consequence* is a hypothesis; the
contradiction between line 8 and `"sideEffects": false` is a fact.)

**Cure.** The registration belongs wherever the highlighter is owned — glass-ui's `CodeField`
(L-4), which can register lazily on first use.

---

## The greenfield lattice

Structuring this today with no legacy, the module lattice is four layers with one home per
concept:

```
@mkbabb/value.js/css          parseCssColor    (TOTAL — L-1)
                              parseCssScalar
                              splitTopLevel    (exported, + keepEmpty mode — L-2)
                              parseCssGradient / serializeCssGradient   ← from gradientParse.ts
                                                                          + useGradientCSS.ts core
        ↑ pure, DOM-free, framework-free, tested, published

@mkbabb/glass-ui/forms        <CodeField>      mono register · `invalid` on the shared control
                                               axis · trailing-action slot · optional highlighted
                                               view · owns its highlighter + rehighlight policy
        ↑ the design system — the ONLY source of field chrome

demo/workbenches/gradient/composables/useGradientModel.ts
        reactive glue ONLY (~60 lines): refs, the stops↔intervals watcher, applyCSS delegating
        to the library parser

demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue     (~25 lines)
        <CodeField v-model :invalid="!!verdict" :error="verdict" language="css"
                   @change="…" ><template #trailing><CopyAction/></template></CodeField>
```

Deletions this lattice forces, all mechanical:

| delete | size | replaced by |
|---|---|---|
| `demo/workbenches/gradient/composables/gradientParse.ts` | 302 lines | `@mkbabb/value.js/css` |
| serializer core of `useGradientCSS.ts` | ~11.9 KB | `@mkbabb/value.js/css` |
| `demo/ui/**` (L-6) | 19 dirs | direct glass-ui subpath imports |
| `.glass-wash` (L-3) | 1 class, 3 sites | the `CodeField` primitive |
| runtime `highlight.js` import + `vendor-highlight` chunk group (L-5) | 27.9 KB gz | the primitive |
| `@src` alias + `sourceExportPlugin()` (L-7) | 2 config lines + 1 plugin | nothing — both dead |
| `cn` + the `utils.ts` docblock (L-8) | 6 lines + false narrative | nothing — dead |

Net: the subject shrinks 117 → ~25 lines, the demo sheds ~450 lines of misplaced library code and
19 alias directories, the CSS editor and the OM-13 readout become the same component by
construction, and MT-F001 becomes a library test instead of a user-facing app wipe.

---

## Negative proof — what is genuinely sound here

Stated positively, with evidence, so the DEFECTIVE verdict is not read as "everything is wrong":

1. **Import direction is correct in the subject.** `GradientCodeEditor.vue` imports only `vue`,
   one demo utility, and `highlight.js`. It imports **nothing** from `@mkbabb/value.js` and
   nothing from the shell or boot layers. A presentation leaf that reaches the parser only by
   emitting upward (`:27-29` → `GradientVisualizer.vue:102-108` → `useGradientModel.applyCSS`) is
   the right shape. There is no feature → shell edge and no component → boot edge.
2. **No deep reaches anywhere in the demo.** `grep -rn "@src/\|from \"../../../src\|from \"../../src" demo/`
   → **0 hits**. `grep -rn "\.\./demo\|@demo" src/` → **0 hits**. No cycle, no back-door.
3. **Every library import a real consumer could write.** All 50 demo imports of the library go
   through the five published subpaths `/color /css /math /easing /quantize`, each present in
   `package.json#exports`. The single textual occurrence of the bare specifier
   (`demo/shared/utils.ts:12`) is inside a comment, not an import.
4. **The vite self-alias set is generated from the exports map, not hand-rolled**
   (`vite.config.ts:23-32`), so the demo cannot silently resolve a subpath the package does not
   publish — the mechanism that would otherwise make the demo a false proof of the public API.
5. **`verbatimModuleSyntax` is satisfied in the subject.** Its four import statements
   (`:2,3,5,6`) bind runtime values only; there is no type-only binding needing `import type`.
   Its neighbours are compliant too — `useGradientModel.ts:11,12,13,17` and
   `GradientVisualizer.vue:22,25,26,28` all use `import type` correctly.
6. **Vue 3.5 idiom is correct.** `useTemplateRef` at `:31`, reactive props destructure with a
   default at `:16`, `defineEmits` typed at `:27`.
7. **The non-throwing rejection path works end to end.** Measured live: `notacolor` →
   `verdict: "unparseable color \"notacolor\""`, `aria-invalid="true"`, destructive border, user
   text preserved. The failure design is right; only the library contract beneath it is wrong.
8. **No route-level regression from this component.** `audit/visual/REPORT.md:125,140,155,170` —
   `/#/gradient` shows `overflowX 0`, `pageErr 0`, `consoleErr 0`, `main 1` on all four Safari
   matrices. The crash of L-1 is interaction-only and therefore invisible to the static capture
   sweep — which is itself worth recording as a gap in the visual audit's reach.

---

## Artifacts produced in this directory

| file | what it shows |
|---|---|
| `live-00-baseline.png` | `/#/gradient` at rest, desktop 1440×1000 |
| `live-01-mtf001-oklch-empty.png` | **the L-1 blocker** — the whole app reduced to a "Try again" pill after typing `oklch()` |
| `live-03-reduced-transparency.png` | L-3 — the dead `.glass-wash` firing under `prefers-reduced-transparency: reduce` |
| `live-04-verdict-working.png` | the control: the non-throwing rejection path rendering correctly |
| `live-05-two-code-rows-chrome-divergence.png` | L-4 — the OM-13 readout and the CSS editor, 137 px apart, two different hand-rolled chromes |
