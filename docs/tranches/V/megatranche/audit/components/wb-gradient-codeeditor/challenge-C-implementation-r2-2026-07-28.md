# CHALLENGE-C (r2) — `GradientCodeEditor.vue`: the implementation is defective

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm — the tier
this seat was **explicitly declared** with at spawn. The declaration is present and matched; the seat
is neither inherited nor undeclared. Every measurement, probe script and screenshot cited below was
produced by this seat in this session; nothing is inherited from the r1 file.

**Subject** `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (116 lines)
**Route** `http://localhost:9000/#/gradient` · **Base** branch `tranche-u`, HEAD `c654824e`, live dev server :9000
**Engine** WebKit (Playwright `webkit` 1.60.0) — the owner's browser family and the one the visual matrix uses
**Predecessor** `challenge-C-implementation-r1-2026-07-28.md` (this r2 preserved it under the r1 name, per the
`wb-gradient-stopeditor/challenge-D-design-r1-*` precedent). Overlaps are marked **CONFIRMED-INDEPENDENTLY**;
findings **R4 · R7 · R9 · R10 · R14** and the whole of the R8 mutation argument are new to r2.

**Verdict — `DEFECTIVE`. 1 BLOCKER · 7 MAJOR · 4 MINOR · 2 INFO.**

---

## Findings

| id | sev | defect | reproduction |
|---|---|---|---|
| **R1** | **BLOCKER** | **Thirteen Backspaces on the app's own default text destroys the entire pane** and every piece of gradient work in it. MT-F001 reaches the user through this component's unguarded `emit("parse")`. The component's own verdict surface never fires; "Try again" restores the *default* gradient, not the user's. **Zero console errors** — invisible to every console gate. | YES `r2-probe3.mjs` tag `P` |
| **R2** | MAJOR | The pending 500 ms parse is **never cancelled on unmount** — the crash detonates on a *different* pane the user has already navigated to (measured on `#/mix`). `debounce()` ships `.cancel()`; this component never calls it, while the sibling workbench does exactly that cleanup. | YES `r2-probe.mjs` tag `G` |
| **R3** | MAJOR | **Blur inside the debounce window destroys the user's text.** Typed text vanishes, replaced by the *old* canonical string, and the verdict then names a token no longer on screen. Direct breach of the file's own documented law (lines 34–40). Mechanism: `onBlur` branches on `hasError`, which is the verdict of the *previous* parse — a stale read. | YES `r2-probe2.mjs` tag `L` |
| **R4** | MAJOR | **The verdict never clears when the model moves from anywhere else.** After a rejected parse, nudging the Direction slider replaces the editor text with valid canonical CSS while `aria-invalid="true"`, the destructive border and the stale error all persist. NEW in r2. | YES `r2-probe.mjs` tags `D2/D3/D4` |
| **R5** | MAJOR | `textContent` **fuses line breaks**: `red` ⏎ `0%` is fed to the parser as `red0%` → verdict `unparseable color "red0%"`, a token that appears nowhere on screen. Enter is the one key a code surface must survive. | YES `r2-probe2.mjs` tag `K` |
| **R6** | MAJOR | **Glass-forward (MT-F037 family), measured.** `.field-control` count on the whole route = **0**. Radius 8 px vs `--radius-field` 1rem; border 1 px vs 1.5 px; background `rgba(0,0,0,0)` vs `--input-on-glass hsl(36 40% 92%)`; `backdrop-filter: none`; Tailwind `ring-2 ring-ring/40` instead of `--focus-ring-shadow` / `--invalid-ring`; plus a per-instance inline `transition` style. glass-ui 7.0.0 already ships the invalid-field + error-message wiring this file hand-rolls worse. | YES `r2-probe.mjs` tags `A1/B` + dist census |
| **R7** | MAJOR | **The loud failure surface is neither seen nor heard.** The verdict paints **14 px below the pane scrollport** with no scroll-into-view (verdict bottom 970 vs scrollport bottom 956, `scrollTop 0/31`); the `role="status"` region is *created together with its text* (announcement race); no `aria-errormessage` / `aria-describedby`; the verdict has no `id`; the multi-line surface has no `aria-multiline`. | YES `r2-probe5-verdict-fold.mjs`, `r2-probe3.mjs` tag `Q`, `r2-shot-B-rejected.png` |
| **R8** | MAJOR | **Vacuous gate.** 9 e2e + 19 unit tests exist and *do* touch this component — and all stay green under the mutation that deletes the **entire editor truce**. Every gradient e2e test's `expect(consoleErrors).toEqual([])` is blind to the R1 crash (0 console errors measured). No test feeds an empty-argument colour function, blurs inside the debounce window, presses Enter, or unmounts with a parse pending. | Named below; mutation *reasoned*, not run (source edits forbidden) |
| **R9** | MINOR | `modelValue` prop with **no `update:modelValue` emit** — `v-model` on this component compiles and silently does nothing. A contract lie in the public surface. | file:line |
| **R10** | MINOR | A successful parse **mints new ids for every stop** (`stop-1..3` → `stop-4..6` measured), so the pane's stop selection is silently dropped on every settled parse (Remove chip visible → gone). Two independent id generators share one namespace. | YES `r2-probe4.mjs` tags `S1/S2` |
| **R11** | MINOR | `highlight()`'s `catch { return code }` is a **masking fallback** (owner edict 2) that would feed *unescaped* user text into `innerHTML`. Latent — **hypothesis**, no reachable throw found. | NONE (hypothesis) |
| **R12** | MINOR | The editor subtree is torn down and rebuilt **per model tick**: 42 mutation records for a 40-step direction sweep, while the user is not even in the editor. Costs the native undo stack and any selection. | YES `r2-probe4.mjs` tag `S3` |
| **R13** | INFO | contenteditable accepts rich paste (no `plaintext-only`, no `@paste`); no `autocapitalize`/`autocorrect`/`inputmode` on a code surface. iOS-Safari capitalisation is a **hypothesis** — not measured on a device. | partial |
| **R14** | INFO | Honest negative + coverage gap: this component contributes **zero** nameless buttons and **zero** small tap targets to the visual REPORT's gradient rows; and the mobile Safari capture **never reaches it** — the matrix holds no mobile witness of this component. | REPORT.json + shot crop |

**Strongest defect: R1.**

---

## Evidence index

All probes are re-runnable verbatim from the repo root and are **read-only** against the live dev server.

| file | what it establishes |
|---|---|
| `evidence/r2-probe.mjs` | A chrome/token measurement · B a11y attrs · C MT-F001 · **D stale verdict** · E multiline DOM · F blur-in-debounce · G cross-route crash · I paste |
| `evidence/r2-probe2.mjs` | J keyboard reachability + editable attrs · **K newline fusion** · **L WIP destruction** · M boundary text + Try-again state loss |
| `evidence/r2-probe3.mjs` | **P thirteen-Backspaces-from-default crash, unfiltered console** · Q verdict a11y wiring |
| `evidence/r2-probe4.mjs` | **S1/S2 stop-identity churn + selection loss** · S3 per-tick DOM churn |
| `evidence/r2-probe5-verdict-fold.mjs` | the verdict's below-the-fold geometry |
| `evidence/r2-parse-oracle.test.ts` + `evidence/r2-vitest.config.ts` | the crash oracle through the demo's own import path (`npx vitest run --config …/r2-vitest.config.ts`) |
| `evidence/r2-shots.mjs` → `r2-shot-A-idle.png`, `r2-shot-B-rejected.png`, `r2-shot-C-crashed.png` | element-clipped witnesses |
| `evidence/r2-C-mtf001.png`, `r2-D-stale-verdict.png`, `r2-K-newline-fusion.png`, `r2-L-wip-destroyed.png`, `r2-M-boundary.png`, `r2-M2-after-retry.png`, `r2-P-thirteen-backspaces.png`, `r2-G-cross-route.png` | full-page witnesses per finding |

No file outside `docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/` was written.

---

## R1 — BLOCKER · thirteen Backspaces on the default text destroy the workspace

### The gesture

The pane boots with `linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)` in the
editor. A user who wants a different first colour clicks after `145` and holds Backspace to clear the
channels. `0.75 0.15 145` is **thirteen characters**. At rest the text reads `oklch()`.

### Reproduction

```
node docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r2-probe3.mjs webkit
```

```json
{"engine":"webkit","tag":"P-thirteen-backspaces-from-default",
 "clickedToken":"145",
 "before":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
 "textAtRest":"linear-gradient(90deg, oklch() 0%, oklch(0.65 0.18 265) 100%)",
 "editorGone":true,
 "paneNow":"… | This panel hit an unexpected error. | undefined is not an object (evaluating 'g[0].replace') | Try again",
 "consoleErrorsUnfiltered":[], "consoleAll":[], "pageErrors":[]}
```

The click is a real `page.mouse.click` at the `145` token's rect; the thirteen Backspaces are real key
events. No synthetic selection, no injected string. **Witness** `evidence/r2-P-thirteen-backspaces.png`,
`evidence/r2-shot-C-crashed.png`.

### The chain, line by line

1. `GradientCodeEditor.vue:59-62` — `onInput` reads `textContent` and hands it to a 500 ms debounce.
2. `GradientCodeEditor.vue:55-57` — the debounce fires `emit("parse", text)` **from a bare `setTimeout`**.
3. `GradientVisualizer.vue:102-108` — `onParseCSS` calls `applyCSS(css)` and expects a
   `{ok:false, reason}` verdict for anything unparseable.
4. `gradientParse.ts:92-94` — `isColorToken` calls `parseCssColor(token).ok`. It assumes totality.
5. `src/css/grammar.ts:181` — `splitTopLevel(body, "/")` returns `[]` for an empty body, and
   `slash[0]!.replace(...)` dereferences `undefined`. The `!` is false.

The oracle, run through the **same import specifier the demo uses** (`@mkbabb/value.js/css`):

```
npx vitest run --config docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r2-vitest.config.ts
```

```
parseCssColor("oklch()")  → THROWS TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor("rgb()")    → THROWS TypeError …
parseCssColor("hsl()")    → THROWS TypeError …
parseCssColor("lab()")    → THROWS TypeError …
parseCssColor("lch()")    → THROWS TypeError …
parseCssColor("color()")  → THROWS TypeError …
parseCssColor("oklab()")  → THROWS TypeError …
parseCssColor("hwb()")    → THROWS TypeError …
parseCssColor("hsl(  )")  → THROWS TypeError …
parseCssColor("rgb( )")   → THROWS TypeError …
parseCssColor("oklch(0.7 0.1 145)") → returns ok=true

parseGradientCSS("linear-gradient(90deg, oklch(), blue)") → THROWS TypeError …
parseGradientCSS("linear-gradient(90deg, rgb(), blue)")   → THROWS TypeError …
parseGradientCSS("linear-gradient(90deg, red, hsl(  ))")  → THROWS TypeError …
parseGradientCSS("linear-gradient(90deg, color(), blue)") → THROWS TypeError …
parseGradientCSS("radial-gradient(oklch(), blue)")        → THROWS TypeError …
parseGradientCSS("linear-gradient(90deg, red, blue)")     → ok
```

**`hwb()` is a ninth input in the same family** — the registry's MT-F001 row names eight
(`oklch rgb hsl lab lch color oklab` + `hsl(  )`); `hwb()` and `rgb( )` throw identically. Two rows to
add, not a new mechanism.

### Why the *pane* dies rather than the parse failing

`emit()` invokes the parent handler through Vue's `callWithAsyncErrorHandling`, so a throw raised inside
a `setTimeout` still travels the component error chain and is caught by
`demo/color-picker/ErrorBoundary.vue:57-70`, whose `onErrorCaptured` returns `false`. The boundary
**replaces the whole pane subtree** with its fallback and — because it halts propagation — **emits no
console error at all**. Measured: `consoleErrorsUnfiltered: []`, `pageErrors: []`.

That is the worst of both worlds for this component: too coupled to fail locally (a parser failure takes
the pane), too well-swallowed to be observed (no console trace for any gate to catch).

### What the user loses

```json
{"tag":"M1-boundary",
 "authoredBefore":"linear-gradient(45deg, red 0%, lime 40%, blue 100%)",
 "boundaryText":"… | This panel hit an unexpected error. | undefined is not an object (evaluating 'g[0].replace') | Try again",
 "editorGone":true}
{"tag":"M2-after-try-again",
 "editorBack":true,
 "editorText":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"}
```

"Try again" remounts the pane with a **fresh `useGradientModel()`** — the authored 45°/red/lime/blue
gradient is gone. Stops, positions, per-interval easing, interpolation space: all discarded. There is no
other recovery affordance.

### Cure (gestalt, not patch)

Three layers are wrong and only the third is this component's own; all three are worth stating because
the seat that fixes one must not think it has fixed the family.

1. **Library** — `parseCssColor` must be **total**. `src/css/grammar.ts:181` is the single `!` that
   makes it partial. The mega-tranche parser band already ruled a running total parser (cand-O); this is
   its acceptance criterion, not a local guard.
2. **Boundary** — a parser is a *function that returns verdicts*. This component must not be able to
   convert a text-validation failure into an unmounted pane. The parse call belongs behind
   `applyCSS`'s own result type, i.e. `gradientParse` should catch at its oracle calls (`isColorToken`,
   `angleToDegrees`, `percentValue`) and return `reject(...)` — the module already owns the
   "model-or-reject" contract in its header (`gradientParse.ts:1-19`); it simply doesn't honour it for
   *throws*.
3. **This file** — the debounced callback is unprotected async work. The idiomatic shape is a single
   guarded parse task the component owns and cancels (see R2), not a naked `setTimeout` → `emit`.

---

## R2 — MAJOR · the pending parse is never cancelled, so the crash lands on another pane

```json
{"tag":"G-navigated-away-then-debounce-fires","hash":"#/mix",
 "bodyHead":"… | This panel hit an unexpected error. | undefined is not an object (evaluating 'g[0]…"}
```

Sequence: type `linear-gradient(90deg, rgb(), blue)` → navigate to `#/mix` immediately → 500 ms later the
timer fires, `emit("parse")` runs on the unmounted instance, the throw propagates, and **the Mix pane the
user is now looking at** shows the error boundary. Witness `evidence/r2-G-cross-route.png`.

`GradientCodeEditor.vue:2` imports only `ref, computed, watch, onMounted, useTemplateRef` — there is no
unmount hook in the file. `demo/shared/utils.ts:36-41` gives `debounce` a `.cancel()`; this component is
its **only consumer in the whole demo** and never calls it:

```
$ grep -rn "debounce" demo | grep -v "shared/utils.ts"
demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue:3,55,61   (no .cancel())
demo/workbenches/extract/composables/useExtractSession.ts:49,159-161,195      (hand-rolled)
```

And the sibling workbench does the cleanup this one omits — `useExtractSession.ts:194-196`:

```ts
onBeforeUnmount(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
});
```

**Cure** — `onBeforeUnmount(debouncedParse.cancel)`. One line, using an API that already exists. (KISS:
no new util, no wrapper; the affordance is already there and unused.)

---

## R3 — MAJOR · blur inside the debounce window destroys the user's text

The file's own law, lines 34–40:

> The editor NEVER rewrites the user's text while it has focus … **A failed parse keeps the user's text
> verbatim alongside the verdict — WIP is never destroyed.**

Measured breach — `r2-probe2.mjs` tag `L` (type a rejecting string, click away before 500 ms, wait):

```json
{"tag":"L-blur-then-reject",
 "typed":"linear-gradient(90deg, red, notacolor)",
 "nowOnScreen":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
 "verdict":"unparseable color \"notacolor\"",
 "userTextSurvives":false}
```

The user's text is gone; the destructive verdict names `notacolor`, which is nowhere on screen.
Witness `evidence/r2-L-wip-destroyed.png`.

The benign variant is also measured (`r2-probe.mjs` tag `F`): with text that *will* parse, the editor
flashes back to the old canonical string on blur and only re-settles ~1.2 s later —

```json
{"tag":"F-blur-inside-debounce",
 "typed":"linear-gradient(45deg, red 0%, lime 50%, blue 100%)",
 "rightAfterBlur":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
 "settled":"linear-gradient(45deg, red 0%, lime 50%, blue 100%)",
 "wipDestroyed":true}
```

**Mechanism** — `onBlur` (lines 68-73) reads `hasError`, which is derived from the `parseVerdict` prop,
i.e. the verdict of the *previous* parse. At blur time the pending parse has not run: `hasError` is a
**stale read of a value that is about to change**. This is the same family as the repo's recorded
`defineModel` stale-read hazard: state consulted at the wrong instant on an async round-trip.

**Cure** — the truce needs one state, not two half-states. Flush the pending parse on blur
(`debouncedParse.flush()`-style: cancel the timer, parse synchronously, *then* decide whether to settle
to canonical). "Blur" and "the last parse's verdict" are then the same instant, and the WIP-preserving
law becomes true by construction rather than by timing luck.

---

## R4 — MAJOR · the verdict never clears when the model moves elsewhere (NEW)

`r2-probe.mjs` tags `D1 → D4`: reject a string, blur, then nudge the **Direction slider** with the
keyboard (a control that has nothing to do with the editor).

```json
{"tag":"D1-rejected","editorText":"linear-gradient(90deg, red, notacolor)","verdict":"unparseable color \"notacolor\""}
{"tag":"D2-after-blur","editorText":"linear-gradient(90deg, red, notacolor)","verdict":"unparseable color \"notacolor\""}
{"tag":"D3-model-moved-verdict-should-be-gone",
 "editorText":"linear-gradient(182deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
 "verdict":"unparseable color \"notacolor\""}
{"tag":"D4-border-state","classList":["border","border-destructive"],"ariaInvalid":"true",
 "borderColor":"rgb(219, 36, 36)","text":"linear-gradient(182deg, oklch(0.75 0.15 145) 0%, …)"}
```

The editor now displays **valid, canonical, freshly-serialised CSS** wearing a destructive border,
`aria-invalid="true"`, and an error about a token that no longer exists anywhere in the document. It
stays that way indefinitely: `parseVerdict` is only ever reassigned in `onParseCSS`
(`GradientVisualizer.vue:107`) and `resetGradient` (`:124`). Witness `evidence/r2-D-stale-verdict.png`.

**Mechanism** — the verdict is derived state stored as raw state, owned by the parent, invalidated by
exactly one of the many events that can invalidate it. The editor cannot fix this from inside because it
does not own the value.

**Cure** — the verdict must be a function of the *last text this editor submitted*, not a free-floating
ref. Either (a) the parent stores `{ text, reason }` and the editor shows the verdict only while its
current text still equals `text`; or (b) the model exposes `lastParse` alongside `simpleCSS` so that any
model write invalidates it. (a) is smaller and keeps the parent dumb.

---

## R5 — MAJOR · `textContent` fuses lines

`r2-probe2.mjs` tag `K` — type `linear-gradient(90deg, red`, press **Enter**, type `0%, blue 100%)`:

```json
{"tag":"K-newline-inside-stop",
 "seenByUser":"linear-gradient(90deg, red\n0%, blue 100%)",
 "textContentFedToParser":"linear-gradient(90deg, red0%, blue 100%)",
 "verdict":"unparseable color \"red0%\""}
```

The DOM the browser builds for Enter (`r2-probe.mjs` tag `E1`) is
`linear-gradient(90deg,<div>red 0%,</div><div>blue 100%)</div>` — and `element.textContent`
(line 60) concatenates without the block boundaries. `innerText` would have preserved them
(`"linear-gradient(90deg,\nred 0%,\nblue 100%)"`, same probe).

So the user sees well-formed multi-line CSS and is told a token they never typed is unparseable.
Witness `evidence/r2-K-newline-fusion.png`. A comma-terminated line survives by luck (probe `E2`
parsed clean) — which makes the failure *intermittent*, the worst kind.

**Cure** — a code surface must round-trip newlines. Read `innerText`, or (better, and the direction R6
points) stop hand-rolling a contenteditable and use a real multi-line control whose `value` is a string
with `\n` in it by definition.

---

## R6 — MAJOR · hand-rolled field chrome where the design system already has the part (MT-F037 family)

### Measured divergence (WebKit, live route)

`r2-probe.mjs` tag `A1`:

| property | this component | glass-ui `field-control` | token present in page? |
|---|---|---|---|
| border-radius | `8px` (`rounded-lg` → `--radius-lg 0.5rem`) | `var(--radius-field)` | **yes — `--radius-field: 1rem`** |
| border-width | `1px` | `1.5px` | — |
| background | `rgba(0, 0, 0, 0)` | `var(--input-on-glass)` | **yes — `hsl(36 40% 92%)`** |
| backdrop-filter | `none` | `var(--glass-cell-backdrop-filter, var(--control-surface-blur))` | — |
| focus ring | `focus-visible:ring-2 ring-ring/40` | `box-shadow: var(--focus-ring-shadow)` | **yes** |
| invalid ring | none (border colour only) | `--invalid-ring` + `color-mix` surface tint | **yes** |
| min-height | `min-h-[5rem]` = 80 px | `max(5lh, calc(5rem * var(--ui-scale)))` | — |
| transition | **inline `:style`, per instance** (lines 95-97) | class-level | — |

`.field-control` elements on the entire gradient route: **0**.

Every token the primitive needs is already resolving in this page — the component re-derives the field
by hand and lands on different numbers for every one of them.

### The census the owner asked for

`@mkbabb/glass-ui@7.0.0` installed dist:

- `./forms` → `components/input`, `components/textarea`, `components/combobox`, `useUserInvalidAria`.
- `InputProps` (`dist/components/input/types.d.ts`): `invalid`, `size: ControlSize`, `readonly`,
  `pattern`, `inputmode`, `enterkeyhint`, … and **no slots at all** (`Input-9BlLluik.js`: 0 occurrences
  of `$slots|renderSlot|useSlots`; renders `data-kind="input"`).
- `TextareaProps`: `invalid`, `resize: "vertical"|"horizontal"|"both"|"none"|"content"`, `rows`, `wrap`.
  `.field-control[data-kind=textarea]` is styled with exactly this component's silhouette —
  `min-block-size: max(5lh, calc(5rem * var(--ui-scale)))`, `border-radius: var(--radius-field)`,
  `overflow: auto`.
- `./labeled-field` → `LabeledField` with slots `default(LabeledFieldSlotProps)` + `error`, props
  `invalid`, `errorLive: "off"|"polite"|"assertive"`, `controlLabelable` (documented for
  *non-labelable composite roots* — precisely a contenteditable div), and slot props
  `controlId · labelledBy · describedBy · errorId · invalid`.

**So: `LabeledField` already ships the exact wiring R7 says is missing** — a stable `errorId`, a
`describedBy` to hang on the control, and a live-region policy — and `field-control[data-kind=textarea]`
already ships the surface. Neither, however, covers a *syntax-highlighted* code surface, and `Input`
has no slot for the trailing icons the OM-13 readout row needs.

**Therefore, per the brief's own instruction: this is a marked glass-forward ask, never a local
restyle.** The ask, stated for the relay:

> glass-ui: a **code field** in the `field-control` family — `data-kind="code"` — that (a) accepts a
> multi-line plain-text value, (b) permits a token-highlight overlay without owning the grammar,
> (c) supports `invalid` + the `LabeledField` error wiring, and (d) admits **trailing control
> affordances** (the OM-13 copy/tune pair). Both value.js code surfaces on `/#/gradient` — this editor
> and the easing readout rail — are hand-rolled today, and they do not even match each other
> (`shots/safari-desktop-dark/gradient.png`: a filled dark plate with two trailing icons directly above
> an outlined transparent box).

Owner edicts breached meanwhile: **#4** (glass-ui is the design system), **#5** (root-level styling —
the inline `:style` transition at lines 95-97 is per-instance).

---

## R7 — MAJOR · the loud failure surface is neither reliably seen nor heard

### Seen: it paints below the fold

`r2-probe5-verdict-fold.mjs` — scroll the editor into view, type a rejecting string, measure:

```json
{"verdictRect":{"top":947,"bottom":970,"h":23},
 "paneScrollportRect":{"top":124,"bottom":956},
 "fullyVisible":false,"pixelsBelowFold":14,
 "scrollTop":0,"scrollMax":31}
```

The verdict is **14 px past the pane's scrollport** at the moment it appears, and nothing scrolls it in
(`scrollTop` stays 0 of a possible 31). `evidence/r2-shot-B-rejected.png` shows it cut in half behind
the pane fade. At 1440×1000; on any shorter viewport it is worse.

### Heard: the live region is created with its content

`GradientCodeEditor.vue:107-114` mounts `<p role="status">` **and its text** in one tick (`v-if="parseVerdict"`).
A live region that does not exist before the change is unreliable across AT/browser pairs — the standard
guidance is to render the region always and mutate only its text. Measured attributes
(`r2-probe3.mjs` tag `Q`):

```json
{"verdictAttrs":{"data-testid":"gradient-parse-verdict","class":"fira-code text-mono-small text-destructive","role":"status"},
 "verdictHasId":false,"editorDescribedby":null,"editorErrormessage":null,"editorAriaInvalid":"true"}
```

So a screen-reader user is told the field is **invalid** and is given no programmatic path to the reason:
no `aria-errormessage`, no `aria-describedby`, and the verdict has no `id` to point at. `role="textbox"`
also carries no `aria-multiline` (line 90) although the surface is 80 px tall and accepts Enter.

Non-findings, checked and clean: the editor **is** keyboard reachable (WebKit tab order lands on it —
`r2-probe2.mjs` tag `J2`: `["DIV[Gradient CSS](CE)", …]`) and it **is** named (`aria-label="Gradient CSS"`).

**Cure** — this is R6's ask paying off: `LabeledField` supplies `errorId` + `describedBy` + `errorLive`
and renders the error slot in a stable region. Adopting it deletes four hand-rolled a11y decisions.
Independently, the verdict needs a `scrollIntoView({block:"nearest"})` on transition to non-null.

---

## R8 — MAJOR · the gate is vacuous in nameable ways

### What exists (the r1 claim of "zero tests" is wrong — I checked)

- `test/gradient-parse.test.ts` — 19 tests, all green (`npx vitest run test/gradient-parse.test.ts` →
  `Tests 19 passed`). Unit-level, parser only.
- `e2e/smoke/views/gradient.spec.ts` — 9 tests, four of which drive **this component** by role and name
  (`typeIntoEditor`, lines 32-38) and assert the verdict, the destructive border and the truce
  (lines 191-248).

So there is real coverage. It is nonetheless vacuous against this component's actual failure modes.

### The mutation that keeps every test green

> **Delete the editor truce entirely**: remove `const focused = ref(false)` (line 41), the `onFocus`/
> `onBlur` handlers (lines 64-73) and their bindings, and the `if (focused.value) return;` guard
> (line 77) — leaving `watch(() => modelValue, render)` unconditional.

That deletes the component's central documented mechanism (lines 34-40) and restores the caret-stealing
behaviour W5-11/P1-4 was written to kill. The suite does not notice:

- `round-trip …` (line 191): after typing, it polls for the 80 % stop, then asserts
  `expect(editor).toContainText("rebeccapurple")`. With the guard gone the editor is rewritten to
  `linear-gradient(45deg, red 0%, rebeccapurple 80%)` — which **contains** `rebeccapurple`. Green.
- The same test's post-blur assertion `toContainText("red 0%, rebeccapurple 80%")` is *more* satisfied by
  the mutation, not less. Green.
- `garbage input fails LOUD …` (line 222) asserts `toContainText("notacolor")` — on a **rejected** parse
  the model never changes, so no watch fires with or without the guard. Green.
- No assertion anywhere measures caret position, selection, or write timing.

The debounce never fires mid-typing (`keyboard.type` has no 500 ms gap), so the mutation cannot garble
the typed text either. **Status: reasoned from the quoted assertion texts, not executed** — this
formation forbids source edits, so I did not run the mutant. Labelled a hypothesis on that ground; the
argument is textual and checkable by anyone who may edit.

### The gate cannot see the BLOCKER at all

Every gradient e2e test ends with `expect(consoleErrors).toEqual([])`. The R1 crash produces **zero**
console output (measured, unfiltered: `consoleErrorsUnfiltered: []`, `pageErrors: []`) because
`ErrorBoundary`'s `onErrorCaptured` returns `false`. Even a test that typed `oklch()` would pass its
console gate; only an explicit assertion on pane survival would catch it.

### The uncovered paths, exactly

| path | covered? |
|---|---|
| an empty-argument colour function (`oklch()` …) anywhere in the text | **no** |
| blur inside the 500 ms window | **no** — line 216 blurs only after a settled, successful parse |
| Enter / multi-line text | **no** |
| unmount with a parse pending | **no** |
| verdict cleared by a model change from another control | **no** |
| verdict visibility / scroll position | **no** |
| stop-identity or selection survival across a parse | **no** |

**Cure** — the missing oracle is not "more assertions"; it is one property test the component's law
deserves: *for any text the user leaves in the editor, the pane survives and either the model equals
`parse(text)` or the verdict names why*. That single property kills R1, R3, R4 and R5 as regressions.

---

## R9 — MINOR · `modelValue` without `update:modelValue` is a contract lie

`GradientCodeEditor.vue:16-29` declares

```ts
const { modelValue, parseVerdict = null } = defineProps<{ modelValue: string; parseVerdict?: string | null }>();
const emit = defineEmits<{ "parse": [css: string] }>();
```

`modelValue` is *the* reserved name of Vue's `v-model` contract, and the component never emits
`update:modelValue`. `<GradientCodeEditor v-model="css" />` type-checks, compiles, renders — and silently
never writes back. The parent avoids the trap only by convention (`:model-value` + `@parse`,
`GradientVisualizer.vue:258-262`).

**Cure** — name the prop what it is (`css`, or `value`), or complete the contract. Given the parse is
debounced and rejectable, `css` + `@parse` is the honest shape; the current naming is a legacy-shaped
affordance that does not exist (edict 2/3).

---

## R10 — MINOR · every settled parse re-mints stop identities and drops the selection

`r2-probe4.mjs`:

```json
{"tag":"S1-selected-middle","ids":["stop-1-ms5hulak","stop-2-ms5hulak","stop-3-ms5hulak"],"removeChipVisible":true}
{"tag":"S2-after-reparse","ids":["stop-4-ms5humuj","stop-5-ms5humuj","stop-6-ms5humuj"],
 "identitiesPreserved":false,"removeChipVisible":false}
```

Changing one number in the text (`lime 50%` → `lime 60%`) replaces **all three** stop identities.
`GradientStopEditor.vue:230-232` keys handles on `stop.id`, so every handle element is destroyed and
rebuilt, and `selectedStopId` (`GradientVisualizer.vue:51`) now points at a stop that does not exist:
the "Remove selected stop" chip disappears and the user's selection is silently lost.

Two independent generators mint into one namespace with the same shape —
`useGradientModel.ts:66-69` and `gradientParse.ts:31-34`, both `stop-${n}-${Date.now().toString(36)}`
with separate counters. A same-millisecond counter collision is possible in principle; I did not observe
one (**hypothesis**), but two id authorities for one identity space is a defect regardless.

**Cure** — reconcile on apply: match parsed stops to existing ones positionally and keep the surviving
ids (or make identity a function of index and stop the pretence of stable ids). One uid authority.

---

## R11 — MINOR · a masking fallback that would feed unescaped text to `innerHTML`

```ts
function highlight(code: string): string {
    try { return hljs.highlight(code, { language: "css" }).value; }
    catch { return code; }          // ← unescaped
}
function render(code: string) { if (editorRef.value) editorRef.value.innerHTML = highlight(code); }
```

`hljs.highlight().value` is HTML-escaped; the `catch` branch is not, and it flows straight into
`innerHTML` (line 52). The language is registered at module scope (line 8) and I found **no reachable
input that makes `hljs.highlight` throw** — so this is a **hypothesis**, not a live XSS. It is
nonetheless a breach of edict 2 (no masking fallbacks): the `catch` converts an unknown failure into
silently different, less safe behaviour.

**Cure** — delete the fallback. If highlighting can fail, that is a bug to surface, and the safe
degraded path is `textContent = code`, never `innerHTML = code`.

---

## R12 — MINOR · the editor's subtree is rebuilt on every model tick

`r2-probe4.mjs` tag `S3`, a 40-step Direction sweep with the editor **unfocused and untouched**:

```json
{"tag":"S3-editor-dom-churn-per-40-step-sweep","mutationRecords":42,
 "editorText":"linear-gradient(220deg, red 0%, lime 60%, blue 100%)"}
```

≈1 full `innerHTML` teardown/rebuild per model tick. The CPU cost is small (r1 measured
0.014–0.020 ms per `hljs.highlight`; I did not re-measure — **cited, not re-found**), but the *semantic*
cost is not: `innerHTML` destroys the native undo stack and any selection inside the editor, which is why
R3's flash-back is unrecoverable by Ctrl-Z.

**Cure** — falls out of R6: a real value-bound control diffs text instead of replacing a subtree.

---

## R13 — INFO · editable-surface hygiene on a code field

`r2-probe2.mjs` tag `J1`:

```json
{"tabIndexProp":-1,"hasTabindexAttr":false,"autocapitalize":null,"autocorrectAttr":null,
 "inputMode":null,"contentEditableValue":"true","enterKeyHint":null}
```

- `contenteditable="true"` (not `plaintext-only`) and no `@paste` handler: pasted rich markup is accepted
  by the platform. My synthetic `ClipboardEvent` could not exercise the real paste path (untrusted event
  — `r2-probe.mjs` tag `I` shows the document unchanged), so the *consequence* is a **hypothesis**; the
  *configuration* is measured.
- No `autocapitalize` / `autocorrect` / `inputmode` on a surface whose entire content is code. On iOS
  Safari the UA default for editable content is sentence capitalisation; I have no device measurement,
  so this too is a **hypothesis** — but the fix costs three attributes and the risk is a mobile-only
  parse rejection the desktop matrix can never see.

---

## R14 — INFO · the honest negative, and a matrix blind spot

From `audit/visual/REPORT.json`, all four gradient rows (desktop/mobile × light/dark) carry the identical
`smallTapTargets` list:

```
{"w":160,"h":23,"tag":"input","label":""}                    ← shell slug bar
{"w":22,"h":22,"tag":"button","label":"Switch to slug"}      ← shell
{"w":22,"h":22,"tag":"button","label":"Generate new slug"}   ← shell
{"w":22,"h":22,"tag":"button","label":"Cancel"}              ← shell
{"w":20,"h":20,"tag":"button","label":"Gradient stop at 0%"}   ← GradientStopEditor
{"w":20,"h":20,"tag":"button","label":"Gradient stop at 100%"} ← GradientStopEditor
```

and `namelessButtons: 1`. The REPORT gives that defect as a **count, not an identity**, so I cannot
attribute it from the JSON — but I can exclude this component by construction: its entire template is
one `div[role=textbox]` and one `p[role=status]` (lines 84-115). It renders **no button at all**.

**This component contributes zero of both.** Its editor measures 462×80 and carries
`aria-label="Gradient CSS"`. That is a real negative result and I state it rather than manufacture a
contribution.

Blind spot worth recording: in `shots/safari-mobile-{light,dark}/gradient.png` the captured viewport ends
at the Easing specimen strip — **the CSS editor never appears in the mobile matrix**. Every mobile claim
about this component (including R7's below-the-fold geometry, which will be worse there) is currently
unwitnessed by the visual audit.

---

## Edict compliance (owner list)

| # | edict | verdict |
|---|---|---|
| 1 | no god modules | **pass** — 116 lines, one job; `demo/shared/utils.ts` is 44 lines |
| 2 | no legacy / masking fallbacks | **FAIL** — R11 (`catch { return code }`); R9 (a `v-model` affordance that isn't) |
| 3 | KISS, no contrivance | **pass with a note** — no invented dirs/wrappers; but the hand-rolled contenteditable *is* the contrivance R6 names |
| 4 | glass-ui is the design system | **FAIL** — R6, `.field-control` count 0 on the route |
| 5 | root-level styling | **FAIL** — inline per-instance `:style` transition, lines 95-97 |
| 6 | animations never deleted | **pass** — the transition is preserved (misplaced, not lost) |
| 7 | idiomatic Vue 3.5 | **partial** — `useTemplateRef` ✓, reactive props destructure ✓; but the stale-read hazard the idiom exists to prevent is live in `onBlur` (R3) |
| 8 | `verbatimModuleSyntax` | **pass** — every import in the file is a value import; no type-only import is mis-declared |

---

## Disposition (for the formation, no edits landed)

| id | where the cure lands | shape |
|---|---|---|
| R1 | library (`src/css/grammar.ts:181`) + `gradientParse.ts` oracle calls | totality, then model-or-reject honours throws |
| R2 | this file | `onBeforeUnmount(debouncedParse.cancel)` |
| R3 | this file | flush-on-blur; one instant, one truth |
| R4 | `GradientVisualizer.vue` | verdict carries the text it judged |
| R5 | this file | `innerText`, or a real value-bound control |
| R6 | **glass-ui ask** (`data-kind="code"` field + trailing affordances) | marked, never a local restyle |
| R7 | glass-ui `LabeledField` adoption + `scrollIntoView` | deletes 4 hand-rolled a11y decisions |
| R8 | `e2e/smoke/views/gradient.spec.ts` + a component property test | one survival/verdict property |
| R9 | this file | rename the prop |
| R10 | `useGradientModel.applyCSS` | reconcile identities; one uid authority |
| R11 | this file | delete the fallback |
| R12 | falls out of R6 | — |
