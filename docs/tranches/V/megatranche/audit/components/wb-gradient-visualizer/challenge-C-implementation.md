# CHALLENGE-C · ROUND 3 — `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat, which
matches the explicit declaration this seat was spawned with. **Declared, not inherited.**

---

## Filing note — nothing was destroyed to write this

The brief names `challenge-C-implementation.md`. Two Challenge-C reports already existed at this
component:

| file | written | content |
|---|---|---|
| `challenge-C-implementation.pass-1-2026-07-27.md` | Jul 27 19:06 | **round 1 verbatim**, 17 findings (`C-1`…`C-17`) — preserved byte-for-byte by this seat before the named path was rewritten |
| `challenge-C-implementation-r2.md` | Jul 28 11:13 | round 2 — 2 corrections, 6 new findings, 4 re-derivations |

This file is **round 3** and holds the current consolidated verdict at the named path (the
convention this tranche already uses for `PaletteCard`: preserve the earlier pass at a dated path,
carry its docket forward). Round 1 and round 2 are carried by reference in §5 with a per-row status;
I do not restate a finding I merely agree with.

I audited independently before reading either prior round, then diffed. **Six findings below are
new**, five of them with a pasted live reproduction; one is a new negative-proof set. **Verdict:
DEFECTIVE** — unchanged, on new evidence.

---

## 1 — Method

* Whole-file read of the subject (279 lines), `GradientPane.vue`, all three sibling editors, all
  four composables, `demo/shared/utils.ts` (the debounce), `demo/styles/foundation.css` §forced-colors,
  `e2e/smoke/views/gradient.spec.ts` (329 lines) and `.github/workflows/ci.yml`.
* **5 new Playwright probes**, all kept and re-runnable under `probes/challenge-C-r3-*`, plus
  5 new screenshots under `evidence/challenge-C-r3-*`. Every block quoted below is pasted from my
  own run against the live dev server at `http://localhost:9000`.
* The **state matrices no prior Challenge-C round opened**: `STATES.json` +
  `shots/{forced-colors,rtl,zoom-200,reduced-motion,keyboard-focus}-desktop/gradient.png`. Round 1
  and round 2 both read only the four Safari matrices of `REPORT.json`.
* Repo `tranche-u`, HEAD **`f36f780c`** (the branch advanced past the brief's `c654824e`; nothing
  under `demo/workbenches/gradient/` moved between them).

```
$ node .../probes/challenge-C-r3-editor-race.mjs
$ node .../probes/challenge-C-r3-verdict-stick-paste.mjs
$ node .../probes/challenge-C-r3-stuck-drag.mjs
$ node .../probes/challenge-C-r3-sticky-verdict-and-cost.mjs
$ node .../probes/challenge-C-r3-focus-order.mjs
$ node .../probes/challenge-C-r3-forced-colors.mjs
```

---

## 2 — NEW findings

### R3-1 · MAJOR — blurring the CSS box before the 500 ms debounce fires destroys the user's text **and** paints a permanent, false "invalid" state

`[NEW]`

**The claim.** `GradientCodeEditor.vue:34-40` states the contract in its own words:

> "The editor NEVER rewrites the user's text while it has focus … A failed parse keeps the user's
> text verbatim alongside the verdict — **WIP is never destroyed**."

Two clocks decide that, and nothing relates them:

```ts
GradientCodeEditor.vue:55-57  const debouncedParse = debounce((text) => emit("parse", text), 500);
GradientCodeEditor.vue:68-73  function onBlur() { focused.value = false;
                                  if (!hasError.value) render(modelValue); }   // ← reads the PREVIOUS parse
```

`hasError` derives from `parseVerdict`, which is the verdict of the **previous** parse. Blur inside
the 500 ms window therefore consults a verdict about text that is no longer in the box, overwrites
the box with the model's canonical serialization, and *then* lets the stale parse land on the
component.

**Reproduction — live, pasted (`probes/challenge-C-r3-editor-race.mjs`).** Type a rejecting string,
blur 120 ms later:

```
P1) right after typing:
  {"editorText":"linear-gradient(90deg, notacolor 0%, blue 100%)","borderDestructive":false,"verdict":null}
P1) immediately after blur (debounce still pending):
  {"editorText":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)", …}   ← WIP GONE
P1) 1.2 s later (debounce has fired):
  {"editorText":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
   "borderDestructive":true,"ariaInvalid":"true","verdict":"unparseable color \"notacolor\""}
```

The end state is the component **declaring its own canonical, valid output invalid**, citing a token
(`notacolor`) that is nowhere on screen. `aria-invalid="true"` on text that parses.

**And it is sticky** (`probes/challenge-C-r3-sticky-verdict-and-cost.mjs`) — `parseVerdict` is only
ever cleared by another successful parse (`GradientVisualizer.vue:107`) or by `resetGradient`
(`:124`), so an ordinary keyboard authoring act does not clear it:

```
A0) after the blur race:
  {"handles":["Gradient stop at 0%","Gradient stop at 100%"],"invalid":"true","verdict":"unparseable color \"notacolor\""}
A1) after 8 ArrowRight on the first stop (model REALLY changed):
  {"handles":["Gradient stop at 8%","Gradient stop at 100%"],
   "editor":"linear-gradient(90deg, oklch(0.75 0.15 145) 8%, oklch(0.65 0.18 265) 100%)",
   "invalid":"true","verdict":"unparseable color \"notacolor\""}
```

The model changed, the editor re-rendered to new text — the error state survives both. WCAG **3.3.1**
(the error identifies a token that does not exist) and **4.1.2** (`aria-invalid` stuck true on valid
content). For a screen-reader user the pane is now permanently "invalid" with no way back except a
successful parse they were never told they needed.

**Mechanism.** A verdict and the text it judged are two refs on two independent clocks
(focus-driven render vs. a trailing timer), so they can be about different strings. The stated
contract is a comment, not an invariant.

**Cure (gestalt, not a patch).** Make the authoring transaction one value. `onBlur` **flushes** the
pending parse before deciding what to render (the `debounce` the repo already ships exposes
`.cancel()`, `demo/shared/utils.ts:36-42`; a `.flush()` twin is the same three lines), and the
verdict is stored **with the source text it judged** — `{ source, reason } | null` — so a verdict
whose `source` is no longer what the editor holds is not renderable by construction. The `v-if` then
cannot show a stale reason, and `aria-invalid` cannot outlive the text that earned it.

---

### R3-2 · MAJOR — pressing Enter in the CSS box silently welds the tokens on either side of the break

`[NEW]`

The editor is an explicit multi-line surface (`GradientCodeEditor.vue:93` —
`min-h-[5rem] max-h-[12rem] overflow-y-auto whitespace-pre-wrap`), and the text handed to the parser
is read with **`textContent`** (`:60`), which does not represent block breaks.

**Reproduction — live, pasted.** Type `linear-gradient(90deg, red`, press **Enter**, type
`0%, blue 100%)`:

```
P2) after Enter between `red` and `0%`:
 {"editorText":"linear-gradient(90deg, red0%, blue 100%)",
  "editorHTML":"linear-gradient(90deg, red<div>0%, blue 100%)</div>",
  "borderDestructive":true,"ariaInvalid":"true","verdict":"unparseable color \"red0%\""}
P2) what the parser was handed (textContent): "linear-gradient(90deg, red0%, blue 100%)"
```

The user sees `red` and `0%` on two lines, visibly separated, and is told that `red0%` — a token they
never typed — is unparseable. `tokenizeTopLevel` (`gradientParse.ts:70-89`) splits on `\s`, and the
whitespace it needed was thrown away one layer up.

**The cure is one identifier, and I measured it** (same probe, P4):

```
P4) textContent: "linear-gradient(90deg, red0%, blue 100%)"
P4) innerText  : "linear-gradient(90deg, red\n0%, blue 100%)"
```

`innerText` is the rendered-text accessor and preserves the break exactly. The structural cure is
`contenteditable="plaintext-only"` on the editor, so the browser cannot insert block elements into a
code surface at all — one attribute, no shim, no new module.

**Why no gate sees it (and why it looks fine in review):** a real *paste* of multi-line CSS is
**correct**, because under `white-space: pre-wrap` the browser inserts literal `\n` text nodes rather
than blocks (measured, `challenge-C-r3-sticky-verdict-and-cost.mjs`):

```
B) real paste of multi-line CSS:
 {"textContent":"linear-gradient(\n  90deg,\n  red 0%,\n  blue 100%\n)",
  "innerText":"linear-gradient(\n  90deg,\n  red 0%,\n  blue 100%\n)","verdict":null}
```

So the defect fires only on the *typed* break — the one input the e2e spec's `typeIntoEditor` helper
never produces.

---

### R3-3 · MAJOR — `setPointerCapture` is called unguarded on the pane's only drag path, and the platform specifies that it throws

`[NEW — and it is why round 2's own probe C reported no result]`

```ts
GradientStopEditor.vue:132-133
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
```

`Element.setPointerCapture()` throws `NotFoundError` when `pointerId` does not match an active
pointer, and `InvalidStateError` when the element is not connected. Neither is guarded, and the throw
lands inside a Vue event handler, i.e. in `callWithErrorHandling` — the exact channel round 1's
**C-1** measured. **Blast radius, pasted from my isolation run
(`probes/challenge-C-r3-stuck-drag.mjs`):**

```
S0 baseline {"handles":["Gradient stop at 0%","Gradient stop at 100%"],"rail":true,"tile":true,
             "mainText":"Gradient | … | Interpolation | TYPE | Linear | SPACE | OKLCh | HUE | Shorter | …"}
S1 after pointerdown + lostpointercapture (no pointerup)
   {"handles":[],"rail":false,"tile":false,
    "mainText":"This panel hit an unexpected error. |  |
                Failed to execute 'setPointerCapture' on 'Element': No active pointer with the given id is found. |  | Try again"}
```

Two stops, a rail and a tile at `S0`; **zero of everything** at `S1`, the pane replaced by the
ErrorBoundary card and every stop, position, easing curve and setting gone — a second door onto the
identical total-loss outcome as C-1, reached **without typing anything**.

**Honesty about the trigger.** My `pointerdown` is dispatched programmatically, and a synthetic
pointer is never "active", so this reproduction is a *synthetic-input* reproduction: assistive tech,
automation harnesses, extensions and any injected-event path hit it exactly as shown. A human mouse
has an active pointer, so **the everyday-user trigger is a HYPOTHESIS** — while the unguarded
throwing call, the crash, and the blast radius are **CONFIRMED and pasted**. Round 2 wrote the same
probe shape (`challenge-C-r2-pointercancel.mjs`, step C) and its report carries no step-C result:
the pane it was probing had already been destroyed by this call.

**The companion gap.** `lostpointercapture` has **no handler anywhere** in this subtree
(`grep -n "lostpointercapture" demo/workbenches/gradient/` → no output), although this repo's own
hazard record names it as the required recovery twin of `pointercancel` for exactly this class of
capture leak. `pointercancel` is bound (`:268`) — but to the *commit* handler, which is round 2's
R2-N1.

**Cure.** Capture is an optimisation here, not a requirement: the rail already carries a
pointermove fallback (`:91-99`). So (a) bind `lostpointercapture` to a *release* handler that clears
`draggingId`/`handleGesture` and commits nothing — the same split R2-N1 needs for `pointercancel`;
and (b) the architectural cure both C-1 and this finding share — **the model must outlive its view**
(`useGradientModel()` is instantiated at `GradientVisualizer.vue:32`, so the model's lifetime *is*
the component's lifetime and any throw is a data-loss event). Hoist it above the `ErrorBoundary`, and
no DOM call anywhere can cost the user their work. Wrapping the call in `try/catch` is a masking
fallback and is forbidden by edict 2.

---

### R3-4 · MAJOR — the render tile is the **one** colour-display surface in this pane that Windows High Contrast erases, and it still announces itself as an image

`[NEW — no prior Challenge-C round opened the non-Safari state matrices]`

`demo/styles/foundation.css:684-702` maintains an explicit **tier-1 colour-surface roster** whose
stated purpose is that "the surfaces whose whole PURPOSE is to show a color … must survive WHCM's
system-color substitution". `.gradient-rail` and `.rail-handle` are on it. **`.gradient-render-tile`
— this file's own scoped surface (`GradientVisualizer.vue:271-278`) — is not.**

**Measured in real Chromium forced-colors (`probes/challenge-C-r3-forced-colors.mjs`):**

```
== forcedColors: none ==
 "rail":    {"backgroundImage":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.7468…","forcedColorAdjust":"auto"}
 "tile":    {"backgroundImage":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.7468…","forcedColorAdjust":"auto"}
== forcedColors: active ==
 "forcedActive": true,
 "rail":    {"backgroundImage":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.7468…","forcedColorAdjust":"none"}
 "tile":    {"backgroundImage":"none, none","backgroundColor":"rgba(255, 255, 255, 0)","forcedColorAdjust":"auto"}
 "handle0": {"backgroundImage":"linear-gradient(oklch(0.75 0.15 145), …","forcedColorAdjust":"none"}
 "tileRole": "img",
 "tileLabel": "Gradient render with type and direction applied"
```

`background-image: none, none` — **both layers stripped**. The screenshots are the finding in one
glance: `evidence/challenge-C-r3-rail-forced-active.png` is the full ramp; `…-tile-forced-active.png`
is an empty white box with a hairline border. The element keeps `role="img"` and the name "Gradient
render with type and direction applied", so assistive tech announces an image that paints nothing,
and the file's own comment for that element — "the honest surface for what Type + Direction DO"
(`:214-216`) — is false for every WHCM user.

This is exactly the divergence round 2 predicted from the copy-pasted paint stack (R2-N4: "a contract
asserted twice in two files is not a contract"), now **realised**: the two "identical" surfaces
already behave oppositely in a whole rendering mode.

**Sub-finding — the shipped forced-colors matrix is a false green.** `STATES.json` records
`{"matrix":"forced-colors-desktop","route":"#/gradient","engine":"webkit", … "rafPer1500ms":270}`;
Playwright's `forcedColors` emulation is **Chromium-only**, the WebKit shot
(`shots/forced-colors-desktop/gradient.png`) renders in full colour, and its rAF rate is identical to
the unforced matrices. The whole `forced-colors-desktop` row is un-emulated and cannot be cited as
evidence by any seat. My Chromium run is the measurement.

**Cure (KISS, uses the hook that already exists).** The roster's last selector is
`[data-color-surface]` — its declared open extension point. Add `data-color-surface` to the tile
(`GradientVisualizer.vue:220`). One attribute, no god-list edit, and it survives the eventual move of
the paint stack into a glass-ui primitive (R2-N4's cure) unchanged.

---

### R3-5 · MAJOR — the ordering invariant breaks on the **keyboard** path too, and that scrambles focus order

`[NEW consequence; both prior rounds charged the ordering break as a *drag* defect only]`

`onHandleKeydown` (`GradientStopEditor.vue:173-179`) emits `update:position` exactly as the drag does,
so `onStopPositionUpdate` → `updateStop` (`useGradientModel.ts:127-131`) applies a raw position with
no re-sort. A keyboard-only user therefore reaches the same illegal model — and, because the handles
are rendered `v-for` in array order, **DOM order stops matching visual order**.

**Reproduction, pasted (`probes/challenge-C-r3-focus-order.mjs`):** click the bar at 50 % to add a
third stop, focus the first handle, press `Shift+ArrowRight` seven times:

```
S0 three stops: rows=[{0,"…0%",x:225},{1,"…50%",x:444},{2,"…100%",x:665}]  domOrder=[0,1,2] visualOrder=[0,1,2]
S1 after Shift+ArrowRight x7 on stop 0:
   rows=[{0,"Gradient stop at 70%",x:531},{1,"Gradient stop at 50%",x:444},{2,"Gradient stop at 100%",x:665}]
   domOrder=[0,1,2]  visualOrder=[1,0,2]
S2 sequential focus order: ["Gradient stop at 70%","Gradient stop at 50%","Gradient stop at 100%"]
```

Tab visits **70 % → 50 % → 100 %**: right, then back left, then right. WCAG **2.4.3 Focus Order** and
**1.3.2 Meaningful Sequence**, produced by the component's own keyboard affordance with no pointer
involved. Screenshot: `evidence/challenge-C-r3-crossed-focus-order.png`.

**Cure.** The same one C-6 names, and this finding raises its priority: a single writer that returns
the re-sorted model, with `stops` readonly to the view. Ordering is a property of the type, not a
habit of one of three call sites.

---

### R3-6 · INFO — the e2e assertion that would catch R3-1 exists, is worded as the exact contract, and is ordering-vacuous — and never runs

`[NEW: a named vacuous gate, per the brief's test-truth clause]`

`e2e/smoke/views/gradient.spec.ts:222-249` — "garbage input fails LOUD and leaves the model
untouched" — asserts, in its own comment, **"The WIP text is never destroyed"**:

```ts
await typeIntoEditor(main, page, "linear-gradient(90deg, notacolor, ???)");
const verdict = main.getByTestId("gradient-parse-verdict").last();
await expect(verdict).toBeVisible({ timeout: 3000 });      // ← waits OUT the debounce first
await expect(editor).toContainText("notacolor");           // ← only true in that ordering
```

It types, waits for the verdict, and only then asserts. It never blurs inside the debounce window,
which is the only ordering in which the claim is false (R3-1). The sibling round-trip test
(`:214`) blurs only *after* awaiting the applied handle. The suite asserts the contract exclusively
where it holds.

It is moot regardless:

```
$ grep -n "e2e\|playwright\|test:e2e" .github/workflows/ci.yml
(no output)
$ grep -rn "clipboard\|writeClipboard" test/ e2e/
test/picker-blob-config.test.ts:48 …        ← the picker, not this component
```

CI runs `lint`, both `vue-tsc` projects, `build`, `vitest` — none of which import this SFC — and no
test anywhere asserts what this component's Copy control puts on the clipboard.

**My own exact vacuous mutations for THIS file** (round 1 gave a whole-file stub; these are
surgical, and each leaves every gate CI actually runs green):

1. **Delete the entire `<style scoped>` block** (`:266-279`). The render tile paints *nothing* —
   no ramp, no checker. `lint` / `vue-tsc ×2` / `build` / `vitest` all pass; CI is green. The only
   gate that could see it (`gradient.spec.ts:66-79`, which reads the tile's computed
   `backgroundImage`) is not in CI.
2. **Swap `coalescedCSS` → `simpleCSS` at `:128`** (`copyCSS`). Reverses round 1's C-2 defect into
   its mirror; nothing anywhere observes it.

---

## 3 — Negative proofs this round adds

* **RTL is sound for this component.** `shots/rtl-desktop/gradient.png` + `STATES.json`
  (`"dir":"rtl","overflowX":0`): the rail's ramp is `linear-gradient(90deg, …)` (a *physical* angle)
  and the handles are placed with a *physical* `left` (`GradientStopEditor.vue:55-57`), and
  `getPosition` measures from `rect.left` (`:75-81`). All three are physical, so they cannot disagree
  — the instrument is internally consistent under `dir=rtl`. I looked for a logical/physical mismatch
  here and there is none. (The mirrored *pane* layout and the easing row's bidi `2 → 1` are not this
  file's.)
* **`colorAtPosition`'s final `throw` is unreachable — by argument, not by brute force.** Round 2
  proved it over an 11⁴ grid; the general statement is one line. On entry `list[0].position < p <
  last.position` (`:67-69`). Let `j` be the least index with `s_j.position ≥ p` — it exists (the last
  stop qualifies) and `j ≥ 1`. Then `s_{j-1}.position < p ≤ s_j.position`, so pair `j-1` satisfies
  the loop's containment test for **any** ordering of the array. The guard at `:87` can never fire.
* **Hover-ghost cost is bounded.** 60 synthetic hover moves across the rail →
  `{"synthMoves":60,"styleWrites":120}` (2 style-attribute writes per move, no stall). The ghost's
  own inline style does carry the 12-decimal channel noise round 2 charged in R2-N3:
  `background: linear-gradient(oklch(65.389999603767% 0.178830001189 260.320004754797deg), …`.
* **`copyCSS` cannot produce an unhandled rejection.** `writeClipboard` returns a discriminated
  result rather than rejecting, so the missing `await`-result handling is a *silent-failure* defect
  (round 1's C-2) and not a rejection defect. Worth separating: the cure is reading the result, not
  adding a `catch`.
* **The `LIBRARY_PORT_KEY` injection is provided.** `inject(LIBRARY_PORT_KEY)` at `:30` has no
  default, so a missing provider would log a Vue warning; `REPORT.json` records
  `"consoleWarnings":[]` for `/#/gradient` in all four Safari matrices, and my own six live sessions
  produced none.
* **The three Selects render their label only.** `SelectValue` shows `Linear` / `OKLCh` / `Shorter`
  — the `#description` slot does not leak into the trigger (`shots/zoom-200-desktop/gradient.png`,
  `shots/rtl-desktop/gradient.png`). I checked this because the slot shape invites it; it is clean.
* **`verbatimModuleSyntax` clean** — `:22, :25, :26, :28` are all `import type`.
* **No rAF, no WebGL, no `ValueUnit`, no `stableHue`/HSV round-trip** in this subtree (round 1's
  negative proofs; re-checked by grep, unchanged at `f36f780c`).

---

## 4 — Ranked summary (round 3 only)

| # | Severity | Finding | Reproduction |
|---|---|---|---|
| **R3-3** | **MAJOR** | unguarded `setPointerCapture` on the only drag path → whole-pane destruction, all state lost | CONFIRMED (synthetic pointer); everyday trigger = HYPOTHESIS |
| **R3-1** | **MAJOR** | blur inside the debounce destroys WIP text, then paints a permanent false `aria-invalid` + a verdict about a token that is not there | CONFIRMED, twice, pasted |
| **R3-4** | **MAJOR** | the render tile is missing from the WHCM colour-surface roster — `background-image: none, none`, blank box, still `role="img"` | CONFIRMED (real Chromium forced-colors + screenshots) |
| **R3-2** | **MAJOR** | typed Enter in the CSS box welds tokens (`red` ⏎ `0%` → `red0%`); `innerText` is the measured cure | CONFIRMED, pasted |
| **R3-5** | **MAJOR** | the ordering break is keyboard-reachable and scrambles focus order (2.4.3 / 1.3.2) | CONFIRMED, pasted |
| **R3-6** | INFO | the "WIP is never destroyed" e2e assertion is ordering-vacuous **and** e2e is not in CI; two surgical vacuous mutations named | CONFIRMED by grep |
| — | INFO | `forced-colors-desktop` matrix is un-emulated WebKit — a false-green row no seat may cite | CONFIRMED (`STATES.json` + shot) |

## 5 — Carried dockets (prior rounds, status after this pass)

| Round 1 | status | Round 2 | status |
|---|---|---|---|
| **C-1** BLOCKER — `oklch()` destroys the pane | **STANDS**; R3-3 adds a second door with no typing | **R2-N1** MAJOR — `pointercancel` commits the add | STANDS; R3-3 shows the same handler conflation on the capture path |
| **C-5** BLOCKER — add/remove re-hosts easing curves | STANDS | **R2-N2** MINOR — every parse re-mints all ids | STANDS |
| **C-6** BLOCKER — drag drops the ordering invariant | STANDS; **extended by R3-5 to the keyboard path + focus order** | **R2-N3** MINOR — 2115 vs 74 bytes; 12-decimal noise | STANDS; noise re-observed in the hover ghost |
| **C-2/C-3/C-4** MAJOR — the three exposed actions | STANDS | **R2-N4** MINOR — paint stack copy-pasted in two files | **UPGRADED by R3-4** — the divergence is real, not latent |
| **C-7** keyboard / **C-9** dead direction / **C-10** inert hue | STAND | **R2-N5** — `calc()` widens C-1 | STANDS |
| **C-8** nameless Copy button | **RETIRED → MINOR** by R2-C1 (accname resolves `title`) | **R2-N6** INFO — silent clamp / misleading `in oklch` | STANDS |
| **C-11** vacuous gate | STANDS; **sharpened by R3-6** with a named, worded-contract assertion | **R2-C2** INFO — 2.5.8 met, REPORT rows are artifacts | STANDS |
| **C-12..C-17** | STAND as filed | — | — |

## 6 — Strongest defect

For the **component overall**, `C-1`/`R2-N5` remains the strongest: an ordinary edit in the CSS box
costs the user everything. **R3-3 is the same catastrophe reached through a second, un-typed door** —
an unguarded `setPointerCapture` on the only drag path — which is what makes the shared cure
non-negotiable: *the model must outlive its view*. Every one of the three total-loss findings
(`C-1`, `C-4`'s throwing computed, `R3-3`) dissolves the moment `useGradientModel()` lives above the
`ErrorBoundary` instead of inside the component it protects.

For findings **first filed by this round**, the strongest is **R3-1**: an ordinary, non-adversarial
gesture — type, then click away — destroys the user's text and leaves the pane permanently and
falsely marked invalid, citing a token that does not exist, in direct contradiction of the
contract the file states in its own comments.
