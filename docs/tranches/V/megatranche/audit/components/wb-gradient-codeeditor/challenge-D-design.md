# CHALLENGE-D (round 3) — `GradientCodeEditor.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model ID `claude-opus-5[1m]`, the 1M-context arm. This is the tier
this seat was explicitly spawned with. Declared and observed, not inherited.

---

## 0. Seat, subject, and relationship to rounds 1 and 2

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines) |
| **Mount site** | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:258–262` (the `CSS` region) — the only consumer |
| **Route** | `/#/gradient` |
| **HEAD** | `c654824e`, branch `tranche-u` |
| **Canon read** | `docs/tranches/V/PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` |
| **Frames read (vision)** | `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/gradient.png`; `owner-marked/OM-13-easing-readout-not-glass-input.png` |
| **Live probes** | `playwright.webkit` (real WebKit) read-only against `http://localhost:9000/#/gradient`; DPR 2; 1440×900, 390×844, 320×700, 720×450@DSF4; settle ≥3.2 s. Every number below is pasted tool output. |
| **Writes** | only under `docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/`. No `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`, `dev.sh`, `INBOX.md` touched. |
| **Probe scripts** | `…/scratchpad/WBGCE-probe{1..8}.mjs` (paths in §7) |

**Two D seats already ran this component.** Round 1 is preserved at `challenge-D-design-r1-2026-07-28.md`
(D-1 … D-14); round 2 at `challenge-D-design-r2-2026-07-28.md` (D2-1 … D2-6 plus a re-measurement of r1).
This round-3 report is **additive**. §2 carries five defects neither round found, §3 **resolves the one open
dispute between r1 and r2** with exact geometry, §4 records what I independently re-measured and confirmed,
and §5 corrects one method claim in r2. I do not restate r1's or r2's evidence as my own.

---

## 1. Verdict

**DEFECTIVE.** Both prior BLOCKERs stand at HEAD; I reproduced the MT-F001 destruction from a **different and
far more ordinary trigger** than round 1 or 2 used, and measured that the recovery loses the user's work.

Round 3's headline addition is a defect no round found and that no static frame can show:
**touching the code editor at all — even with an edit that changes nothing — silently deletes every
per-interval easing curve the user authored.** The route's own subtitle is *"Build gradients with
per-interval easing and CSS output."* The CSS half of that sentence silently destroys the easing half.

Strongest single defect this round: **D3-1**.

---

## 2. New findings — not in round 1 or round 2

### D3-1 · **MAJOR** · A byte-identical no-op edit silently destroys every authored easing curve

Neither prior round tested what happens to *other model state* when the editor re-parses.
`grep -n -i "re-seed\|reseed\|easing.*reset\|reset.*easing\|destroys.*easing"` over both prior reports
returns **zero hits**.

**Reproduction** (`WBGCE-probe8.mjs`, WebKit 1440×900). Three measured states, in order:

```json
{ "easingBefore":      "cubic-bezier(0, 0, 1, 1)",         // seeded: linear
  "easingAfterPreset": "cubic-bezier(0.25, 0.1, 0.25, 1)",  // user clicks the `ease` dial — authored
  "easingAfterParse":  "cubic-bezier(0, 0, 1, 1)" }         // user types " " in the editor and Backspaces it
```

Step 3 is a **no-op**: after the space and the backspace the buffer is byte-identical to step 2's. Five
hundred milliseconds later the authored easing is gone. No verdict, no confirmation, no undo, no visual cue
that anything was replaced.

The mechanism is documented in the codebase as intent — `GradientVisualizer.vue:102–105`:

```ts
function onParseCSS(css: string) {
    // A successful parse re-seeds every interval to the `linear` preset
    // (easing-disposition §1.6/D3); the picker's two-way model follows the
    // complete replacement value directly.
    const result = applyCSS(css);
```

and executed at `useGradientModel.ts:158–168`, where `applyCSS` assigns `intervals.value = model.intervals`
wholesale. The design fault is not the re-seed rule; it is that **the trigger for a total model replacement
is the absence of typing for 500 ms.** `VISUAL-CONSTITUTION.md §5`: *"The global grammar is **select → tune →
commit**… Selection changes the active specimen without committing it."* There is no commit here, so there is
no user act that means "replace my model" — and therefore no act that means "don't".

This is the same root as the MT-F001 blocker (§4, D-1): a debounce standing in for a commit. It is reported
separately because its damage is *silent and total* even on the success path, where no parser bug is
involved at all.

**Cure.** Apply-gated commit (see §6). Additionally the Apply affordance must state the consequence — *replaces
stops, resets per-interval easing* — before it is taken, since the operation is destructive by design.

---

### D3-2 · **MAJOR (mechanism)** · The app's own WHCM focus restoration exists — and this element falls through every arm of it

Round 2's D2-2 establishes that the focus indicator is box-shadow-only and that
`focus-ring.css:31` *requires* a forced-colors `outline` fallback. It does not identify **why** the
app-level fallback misses this element. It does exist, and the miss is exact.

`demo/styles/foundation.css:698–719`, the U-F25 focus bind, states the problem and then enumerates its scope:

```css
/* the U-F25 focus bind — a real outline where the shadow ring cannot paint.
   box-shadow rings vanish in WHCM, so restore a real `outline` … */
@media (forced-colors: active) {
  :where(a[href], button, [role="button"], [role="combobox"], [role="tab"], [role="slider"],
         [role="menuitem"], [role="option"], input, select, summary,
         .rail-handle, .rail-remove-chip, [tabindex]:not([tabindex="-1"])):focus-visible {
      outline: 2px solid Highlight; outline-offset: 2px;
  }
}
```

`[role="textbox"]` is **not in the list**. And the measured attribute set of the element is exactly:

```json
{ "contenteditable": "true", "spellcheck": "false", "role": "textbox",
  "aria-label": "Gradient CSS", "style": "transition: border-color var(--duration-normal) …" }
```

— **no `tabindex`**, because a `contenteditable` is focusable natively. So it matches neither the role arms
nor the `[tabindex]` arm nor `input`/`select`. The only editable text surface on the Gradient route is the
one operable control in the app that the app's own WHCM rule cannot see, *and it is invisible to that rule
precisely because it was hand-rolled instead of composed from `input`/`textarea`.*

Same root, one line up: `.readout-rail` — the sibling code row — **is** in the tier-1
`forced-color-adjust: none` roster at `foundation.css:687`. The CSS editor is in no roster at all.

**Cure.** Nothing local. A native `<textarea>` (via the glass-ui primitive) matches the existing `input`-family
arms of that selector and inherits the producer's `:focus-visible` recipe with no new CSS.

---

### D3-3 · **MINOR** · A press-lit *button* material is painted over editable code

No hits for `specular`, `plus-lighter` or `grain` in either prior report.

`GradientCodeEditor.vue:93` asks for `glass-wash`. Beyond the dead plate both prior rounds documented, the
class brings two overlay pseudo-elements the component neither asked for nor wants. Measured on the live
element (`WBGCE-probe4.mjs`, all four matrices identical):

```
::before  content:""  z-index: 1  mix-blend-mode: plus-lighter  opacity: 0.07
::after   content:""              mix-blend-mode: overlay       opacity: 0.025
```

`glass-ui/dist/styles/glass/material.css` declares both at `position:absolute; inset:0; border-radius:inherit;
z-index:1`. The code text is unpositioned (`z-index: auto`), so **both overlays composite above the code.**

Worse, the same producer file drives the specular off *press* semantics:

```css
.glass-wash:hover::before  { --specular-intensity: var(--glass-specular-intensity-hover, 0.1); }
.glass-wash:active::before { --specular-intensity: var(--glass-specular-intensity-active, 0.16); }
```

So hovering the code sweeps a conic specular highlight across it, and **the click that focuses the field to
type in it** flashes that highlight to 0.16 over the very glyphs the user is aiming at. That is a button's
affordance grammar bolted onto a text-entry surface: the material says *press me*, the role says *type here*.
`VISUAL-CONSTITUTION.md §2`: *"Glass earns its blur by revealing live content; otherwise it is a neutral
well."* Here the blur is `none` (r1 D-2 / r2 §3.2) and the sheen reveals nothing — only the interaction
lighting survives, on the one surface where it is semantically wrong.

---

### D3-4 · **MINOR** · The blocker's real trigger is the most ordinary edit on the route, and recovery loses the user's work

Rounds 1 and 2 both reproduced MT-F001 by **typing the string `oklch()`**. That is a fair synthetic. The
product-level fact is worse and I report it because it changes the severity argument, not the finding:

The seeded value is `linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)`. Place the
caret after the first `oklch(` and press **Delete 13 times** — i.e. clear the three numbers you came to a
colour tool to change. `WBGCE-probe3.mjs`:

```json
{ "seeded": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
  "state": { "editorPresent": false,
             "bodyText": "→ Gradient Tools Login @mbabb This panel hit an unexpected error.
                          undefined is not an object (evaluating 'g[0].replace') Try again",
             "bodyTextLen": 133, "h1Count": 0, "mainCount": 1, "roleAlert": 1 } }
```

Witness: `WBGCE-realistic-edit-crash.png`. So the blocker is not reachable only by an adversarial string; it
is reached by **the single most likely keystroke sequence on the route**, and it is reached *while making a
valid edit* — every intermediate state of `0.75 0.15 145 → (empty) → 0.8 0.2 200` passes through `oklch()`.

**And the recovery loses the work.** I drove the `Try again` control:

```json
{ "afterRetry": { "editorPresent": true,
                  "editorText": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
                  "bodyLen": 581 } }
```

The restored buffer is the **seed**, not the user's edit. `GradientCodeEditor.vue:39–40` asserts *"A failed
parse keeps the user's text verbatim alongside the verdict — WIP is never destroyed."* Measured: the pane that
would have held it verbatim no longer exists, and what returns is the value from before the session.

---

### D3-5 · **MINOR** · Inside the component, the caption is larger than the specimen it annotates

Round 1 (§D-12 area) judged the verdict's 16.4 px correct because it matches the sibling rail's `<code>`.
That comparison is outward. The inward one fails: measured on the same page, same moment
(`WBGCE-probe4.mjs`, `WBGCE-probe6.mjs`, desktop 1440):

| element | class | computed `font-size` |
|---|---|---:|
| the code specimen (the editor) | `hljs text-mono-small …` | **14 px** |
| the verdict `<p>` that quotes it | `fira-code text-mono-small text-destructive` | **16.4 px** |

Two elements carrying the *same* declared role token render 17 % apart, and the annotation is the larger of
the two. `VISUAL-CONSTITUTION.md §4` assigns one role — *"value, code, or provenance | `text-mono-small`"* —
and §5.8 of `PROPORTION-AUDIT.md` is binding on which one wins: *"Real rendered relation wins over token
intent… token presence alone cannot close a row."* On mobile the two agree at 14 px, so the inversion is
desktop-only, which is also how it escaped a mobile-first read.

---

### D3-6 · **MINOR** · A mobile code field with no input-correction guards

`GradientCodeEditor.vue:88–93` sets `spellcheck="false"` and nothing else. Measured attribute set (D3-2 above)
carries **no `autocapitalize`, no `autocorrect`, no `inputmode`**, and:

```
$ grep -rn "autocapitalize\|autocorrect" demo/
(no output)
```

Zero occurrences repo-wide. On iOS Safari a `contenteditable` autocapitalises the first letter of the buffer
and applies smart-quote / en-dash substitution — each of which corrupts CSS, and one of which
(`linear-gradient` → `Linear-gradient`) lands the user directly in the D3-4 blocker. The route ships a mobile
matrix (`REPORT.md` rows 155, 170), so this is on the live surface, not theoretical.

***Reproduction: NONE — hypothesis.*** The missing-attribute fact is measured; the corruption is inferred
from documented iOS Safari behaviour, which I cannot drive from this seat.

---

## 3. The open dispute, resolved — the verdict renders **outside** the pane's clip

This is the one point where rounds 1 and 2 disagree. Round 1's D-3 claims the verdict has `visiblePx: 0`.
Round 2 explicitly withdraws from adjudicating it:

> *"Round-1 findings I could not test and therefore neither confirm nor dispute: D-3's `visiblePx: 0` verdict
> clipping (my probes ran at a viewport where the CSS section was scrolled into view)."*

I measured it directly, at the moment of failure, at two viewports, and named the clipping ancestor
(`WBGCE-probe6.mjs`, typing `linear-gradient(90deg, nope)` — a clean rejection, no throw):

| viewport | editor rect | **verdict rect** | nearest clipping ancestor | verdict vs clip |
|---|---|---|---|---|
| 1440×900 | top 795.1 → bottom 875.1 | **top 881.1 → bottom 904.0** | `DIV.glass-resting card`, `overflow: hidden auto`, bottom **877.0** | **fully clipped** (starts 4.1 px below the clip edge); also below the 900 px viewport |
| 390×844 | top 740.5 → bottom 820.5 | **top 826.5 → bottom 846.1** | same pane, bottom **835.98** | **~52 % clipped**; also crosses the 844 px viewport |

**Round 1's finding is upheld, and it is not a viewport accident.** The verdict is the *last* element in a
column whose second-to-last element is an 80 px-minimum box, inside a pane that clips. Scrolling the section
into view (round 2's condition) moves the editor into the pane, not the verdict — the verdict is below the
pane's own bottom edge, so no amount of section scrolling reveals it; only scrolling the pane's inner
scroller does, and nothing prompts that.

Visual confirmation, `WBGCE-error.png`: the frame shows the red hairline and **no sentence**, terminating at
the pane's dark bottom edge, while the DOM holds `unparseable color "nope"` at `rgb(219, 36, 36)`.

Net user experience at the moment of a rejection: **a 1 px red hairline and nothing else.** The source comment
at `GradientCodeEditor.vue:102–103` calls this *"explicit destructive failure … LOUD."* It is neither.

**Cure.** The message must belong to the field, not follow it. glass-ui's `LabeledField` slot contract
(`errorId` / `describedBy` / `errorLive`, per `dist/components/labeled-field/types.d.ts`) renders and
associates the message *as part of the control*, inside the control's own reserved block — which removes the
tail-of-scroller placement by construction and closes r1's D-3 and the ARIA half in one move.

---

## 4. Prior findings independently re-measured at HEAD

Confirmations only; the originating round keeps authorship. My measurements are separate runs on real WebKit.

| finding | origin | my independent measurement | status |
|---|---|---|---|
| MT-F001 destroys the workbench | r1 D-1 / r2 §3.1 | reproduced from a new trigger (§D3-4) plus at the library boundary: `parseCssColor` throws `TypeError` on `oklch() rgb() hsl() lab() lch() color() oklab() "hsl(  )"`, while `"oklch(0.7"` correctly returns `ok:false` | **CONFIRMED** |
| the specimen well paints nothing | r1 D-2 / r2 §3.2 | `background-color: rgba(0, 0, 0, 0)` and `backdrop-filter: none` at light/dark × 1440/390/320 — four matrices, four transparent plates | **CONFIRMED** |
| ink misses AA on the dead plate | r1 D-2 | re-derived independently by sampling `WBGCE-plate-{light,dark}.png` and resolving tokens through the page's own canvas: light `number/string/keyword` = **4.05 / 4.09 / 4.05**; dark = **3.57 / 3.39 / 2.84**; the same tokens on `--well-bg` (dark) = 6.13 / 5.82 / 4.88. `hljs.css:29–32` guarantees ≥4.5 **"on the well"** | **CONFIRMED**, 6/6 below floor |
| empty renders as invalid, unrecoverably | r1 D-6 / r2 §3.3 | `{text:"", innerHTML:"<br>", h:80, ariaInvalid:"true", verdict:"not a <type>-gradient(…) function"}`; after blur, unchanged — `onBlur` (`:68–73`) re-syncs only `if (!hasError.value)`, so the error arm never refills | **CONFIRMED** |
| `aria-invalid` with no associated message | r1 D-3 / r2 | `{ariaInvalid:"true", describedBy:null, errorMessage:null, verdictId:null, verdictRole:"status"}` | **CONFIRMED** |
| `break-all` severs code tokens | r2 D2-3 | a second, worse instance at 320 px (editor 254 px): `oklch` splits as `okl`/`ch(` and `oklc`/`h(` — twice, in `WBGCE-rest-light-320.png` | **CONFIRMED + extended** |
| no LTR isolation | r2 D2-5 | `{dir:"rtl", unicodeBidi:"normal", textAlign:"start", dirAttr:null}`; `WBGCE-rtl.png` shows one declaration's wrapped continuation flung to the opposite edge | **CONFIRMED** |
| per-instance override / ad-hoc motion | r2 D2-4, D2-6 | inline `:style` measured `transition-property: border-color, box-shadow`, `transition-duration: 0.3s, 0.3s` | **CONFIRMED** |
| unescaped `innerHTML` fallback | r1 D-13 | the `catch { return code }` arm at `:44–48` is unreachable (language registered at `:8`), which makes it a masking fallback under owner edict 2 as well as a sink | **CONFIRMED** |
| off-grammar geometry | r1 D-8 / r2 | one instrument, measured: pane `16px`, render tile `16px`, rail `9999px`, **editor `8px`**, **cubic-bezier readout `6px`** — no ladder, and the two code-bearing readouts disagree on radius, opacity and border | **CONFIRMED** |
| protagonist subordinated (PR-09) | r1 | gradient rail **40 px** tall vs editor **80 px** at rest / **192 px** at `max-h-[12rem]`: support renders 2×–4.8× the protagonist. PR-09's target is a 19–22 rem (304–352 px) protagonist | **CONFIRMED** |

---

## 5. One method correction to round 2, and one negative I could not fault

**Correction — forced-colors truth for this route IS obtainable.** Round 2 D2-2 concludes:

> *"The tracked `shots/forced-colors-desktop/gradient.png` cannot adjudicate this: I read it and it is not
> monochrome — WebKit did not honour the emulation — so the matrix contains no forced-colors truth for this
> route at all."*

The tracked shot is indeed not usable, but the emulation does work when set at **context** level rather than
page level — `browser.newContext({ forcedColors: "active" })`. Measured that way (`WBGCE-probe5.mjs`):

```json
"forcedResting": { "border": "rgb(0, 0, 0)",  "bg": "rgba(0, 0, 0, 0)" }
"forcedError":   { "border": "rgb(255, 255, 0)", "ariaInvalid": "true",
                   "verdict": "unparseable color \"nope\"", "verdictColor": "rgb(219, 36, 36)" }
```

Two consequences, both narrowing prior claims rather than widening them:

1. **The destructive border DOES survive WHCM** as a distinct system colour (black → yellow). The failure
   boundary is not lost under forced colors; only the *focus* indicator is (D3-2).
2. WebKit's emulation did **not** strip `box-shadow` in my run, so the box-shadow erasure remains the CSS
   Color Adjust spec's stated behaviour (`forced-color-adjust: auto` forces `box-shadow: none`) rather than a
   frame I hold. **D3-2 does not depend on it** — the selector-list miss is measured directly from source and
   from the element's own attribute set.

**Negative I could not fault (added to r2's §6).** I expected the inline `:style` transition to be unreachable
by `@media (prefers-reduced-motion: reduce)` — inline declarations outrank stylesheet rules. It is reachable:
`demo/styles/animations.css:184–191` uses `*, *::before, *::after { transition-duration: 0.01ms !important }`,
and `!important` in a stylesheet beats an inline declaration. The inline style survives as an edict-5
root-vs-instance defect only (r2 D2-4/D2-6), **not** as a reduced-motion defect. I also confirmed r2's read
that `scrollbar-thin` is producer-owned and not a dead class:
`glass-ui/dist/styles/components.css` → `.scrollbar-thin{scrollbar-width:thin}`.

---

## 6. Cure — unchanged in shape from rounds 1 and 2, strengthened by round 3

Rounds 1 and 2 both land on: retire the `contenteditable`; compose glass-ui `LabeledField` + `Textarea`;
relay the code-variant ask to glass-ui because no installed variant hosts highlighted, icon-trailing content
(the OM-13 / MT-F037 shape). I re-verified the census at `@mkbabb/glass-ui@7.0.0` and reach the same place;
I do not restate it.

Round 3 adds one requirement to that transposition that neither prior round's cure carries, and it is
load-bearing:

> **The commit must be explicit, and it must be the only thing that mutates the model.**

Because of D3-1, a `Textarea` that merely debounces `update:modelValue` into `applyCSS` would still silently
wipe the user's easing on every pause in typing — it would fix the crash and keep the data loss. The parse
must be bound to an explicit **Apply**, sharing the existing Copy `DockControl` action set
(`GradientVisualizer.vue:254–256`), and that Apply must name its destructive effect before taking it.

Ranked, with what each closes:

1. **Total parser** — `parseCssColor` returns `{ok:false}` for every string (V·π mandate). Closes the throw
   at its source; a `try/catch` at the call site is the masking fallback owner edict 2 forbids and is
   explicitly *not* the cure. → r1 D-1, D3-4.
2. **Apply-gated commit** inside `LabeledField` + `Textarea`, on the certified `--well-bg` ground with
   `placeholder`, `invalid`, `resize="content"`. → **D3-1**, r1 D-2/D-3/D-6/D-7, r2 D2-2/D2-4/D2-6,
   D3-2, D3-3, D3-5, D3-6, §3.
3. **Glass-forward relay to BH** for a code variant of the `Input`/`Textarea` family: opaque well surface,
   trailing action-adornment slot, optional highlighted-content slot. Marked ask — never a local restyle. →
   OM-13 / MT-F037.
4. **Code is not prose** at the primitive: token-atomic wrapping and `dir="ltr"` + `unicode-bidi: isolate`
   declared once for every code-bearing surface. → r2 D2-3/D2-5, D3-4's 320 px instance.
5. **PR-09 proportion** — the rail is the protagonist at 19–22 rem; the code inspector is subordinate. Owned
   by W27, not by this component, but this component is currently on the wrong side of it.

---

## 7. Register (round 3 only)

| id | severity | defect | reproduction |
|---|---|---|---|
| **D3-1** | **MAJOR** | a byte-identical no-op edit silently destroys every authored per-interval easing curve | `WBGCE-probe8.mjs` — three measured states |
| **D3-2** | **MAJOR** | the app's WHCM outline restoration (`foundation.css:698–719`) misses this element: `[role="textbox"]` is not in the selector list and the element carries no `tabindex` | source + measured attribute set |
| **§3** | **MAJOR** | *(adjudicates r1 D-3 vs r2)* the verdict renders outside the pane's clip — desktop 881.1→904 vs clip bottom 877 (100 % clipped); mobile 826.5→846.1 vs 835.98 (~52 %) | `WBGCE-probe6.mjs`, `WBGCE-error.png` |
| **D3-3** | MINOR | `glass-wash` specular `::before` (z 1, `plus-lighter`, hover 0.1 / **active 0.16**) and grain `::after` composite over the code; press lighting on a text-entry surface | `WBGCE-probe4.mjs` + `glass/material.css` |
| **D3-4** | MINOR | the blocker's real trigger is clearing the seeded `oklch(…)` numbers; `Try again` restores the **seed**, losing the user's edit | `WBGCE-probe3.mjs`, `WBGCE-realistic-edit-crash.png` |
| **D3-5** | MINOR | the verdict caption renders 16.4 px against a 14 px code specimen — same declared role token, 17 % apart, annotation larger | `WBGCE-probe4/6.mjs` |
| **D3-6** | MINOR | no `autocapitalize` / `autocorrect` / `inputmode` on a mobile `contenteditable` code field; zero occurrences repo-wide | attribute set + `grep` — **hypothesis** for the corruption |
| — | *(method)* | forced-colors truth IS obtainable via context-level `forcedColors:"active"`; the destructive border **survives** WHCM (black → yellow) | `WBGCE-probe5.mjs` — narrows r2 |
| — | *(negative)* | reduced motion **is** handled: the `!important` global guard at `animations.css:184–191` beats the inline style | source |

**Evidence root:** `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/` —
`WBGCE-probe{1..8}.mjs`, `WBGCE-probe{4,7}.json`, and the frames
`WBGCE-realistic-edit-crash.png`, `WBGCE-mtf001-page.png`, `WBGCE-recovery-page.png`,
`WBGCE-rest-{light,dark}-1440.png`, `WBGCE-rest-light-{390,320}.png`,
`WBGCE-plate-{light,dark}.png`, `WBGCE-{error,empty,empty-after-blur,focus-normal,rtl,forced-focus,forced-error,zoom200}.png`,
`WBGCE-verdict-{desktop,mobile}.png`.
