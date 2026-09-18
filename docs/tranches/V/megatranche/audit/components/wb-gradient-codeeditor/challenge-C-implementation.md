# CHALLENGE-C (r3) — `GradientCodeEditor.vue`: the implementation is defective

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm. That is the
tier this seat was **explicitly declared** with at spawn; the declaration is present and matched, so the
seat is neither inherited nor undeclared. Every number, JSON line, screenshot and command output below
was produced by **this** seat in **this** session against the live tree. Where I re-state a predecessor's
claim I mark it **CONFIRMED-INDEPENDENTLY** and give my own measurement; where I could not reproduce, I
say so.

**Subject** `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines)
**Route** `http://localhost:9000/#/gradient` · **Base** branch `tranche-u`, HEAD `c654824e`
**Engine** WebKit (Playwright `webkit`) at 1440×1000 — the owner's browser family
**Predecessors** `challenge-C-implementation-r1-2026-07-28.md`, `challenge-C-implementation-r2-2026-07-28.md`
(this r3 preserved r2 under its dated name before taking the canonical path, per the house precedent).

**Verdict — `DEFECTIVE`. 1 BLOCKER · 6 MAJOR · 3 MINOR · 1 vacuous-gate finding.**
Findings **R15–R24 are NEW in r3.** Three of them (**R15**, **R16**, **R18**) change what the standing
record says: R15 shows the blast radius is the *whole workspace*, not "the pane"; R16 shows the failure
surface the user actually sees is **blank**; R18 shows the disposition r2 filed for R2
(`onBeforeUnmount(cancel)`) **cannot fire in this app** and would ship a non-fix.

---

## Findings

| id | sev | defect | reproduction |
|---|---|---|---|
| **R15** | **BLOCKER** | **One keypress on the shipped default text destroys the entire workspace — both panes, every route — and it stays destroyed across navigation.** Drag-select `0.75 0.15 145`, press Backspace once → `oklch()` → `parseCssColor` throws → the app's ONLY `ErrorBoundary` wraps the whole `<main>` (`App.vue:50–140`), so both panes vanish; navigating to another route still shows the fallback. Zero console output. | YES `r3-probe4.mjs` tag `H2`, `r3-probe5-keepalive.mjs` tags `K2/K3` |
| **R16** | MAJOR | **The crash surface paints as a lone “Try again” pill on the aurora.** The alert's icon, its message and the machine-truth line are in the DOM with `opacity:1 / visibility:visible / color:rgb(28,25,23)` — and are **not painted**: `.atmosphere-canvas` (`App.vue:11`, `position:absolute; z-index:auto`) paints above every *static* box inside `<main>`. The user is shown a button and no reason. | YES `r3-probe6-blank-boundary.mjs` + `r3-probe6b.mjs`; witnesses `r3-boundary-element.png`, `r3-boundary-clip.png` |
| **R17** | MAJOR | **A keystroke that changes nothing destroys authored easing.** Press Enter at the end of the editor: `textContent` is byte-identical (`textContentUnchanged:true`) — yet `onInput` still fires, the parse re-applies, and every interval is re-seeded to `linear`. Measured `ease-out` / `cubic-bezier(0, 0, 0.58, 1)` → `linear` / `cubic-bezier(0, 0, 1, 1)`. | YES `r3-probe2.mjs` tag `B2` |
| **R18** | MAJOR | **The standing cure for the un-cancelled debounce (r2 · R2) cannot fire.** Panes live inside `<KeepAlive :max="9">` (`PaneSlot.vue:120`, `App.vue:88`): navigation **deactivates**, it does not unmount. Proven — pane state survives a round trip (`statePreserved:true`). `onBeforeUnmount(debouncedParse.cancel)` would ship green and fix nothing; the hook is `onDeactivated` **plus** `onBeforeUnmount`. | YES `r3-probe5-keepalive.mjs` tag `K1` |
| **R19** | MAJOR | **The “CSS” section shows one string and copies another**, and its own copy is not re-ingestible. Editor shows 74 chars (`simpleCSS`); the Copy control copies 2115 chars / 33 stops (`coalescedCSS`). Pasting that copy back into the same editor explodes the model **2 stops → 33**. | YES `r3-probe.mjs` tag `A`, `r3-probe2.mjs` tag `C` |
| **R20** | MAJOR | **CSS Color L4 `in <space>` — the exact syntax this pane's own Space selector means — is rejected, and the verdict names the wrong token.** `linear-gradient(in oklch, red, blue)` → `unparseable color "in"`; `linear-gradient(90deg in oklch, red, blue)` → `unparseable color "90deg"` (a perfectly valid angle). | YES `r3-probe2.mjs` tag `D` (3 inputs) |
| **R21** | MAJOR | **Unbounded ingress into a bounded control, ending in an invalid ARIA state.** `linear-gradient(1e10turn, red, blue)` is accepted with no verdict and writes `direction = 3.6e12` into the Direction slider: measured `aria-valuenow="3600000000000"` against `aria-valuemax="360"`. `1e308deg` → readout `1e+308°`; `-720deg` → `aria-valuenow="-720"` under `aria-valuemin` 0. | YES `r3-probe4.mjs` tag `I` (3 inputs) |
| **R22** | MINOR | **A radial edit silently resets the direction the user set.** Type `radial-gradient(red 0%, blue 100%)` → the Direction readout goes `90°` → `0°`, no verdict, no notice; switching back to Linear does not restore it. | YES `r3-probe2.mjs` tag `F` |
| **R23** | MINOR | **The syntax highlighting is dead exactly while the user writes code.** `hljs` spans measured: 9 at rest → **0** for the whole authoring session (including after the parse applied) → 3 on blur. 94 820 raw bytes of highlight.js buy a surface that is plain text whenever it is being edited. | YES `r3-probe7-highlight.mjs` tags `P1–P4` |
| **R24** | MAJOR (gate) | **Vacuous gate, named minimally.** Deleting the single condition `if (!hasError.value)` (line 72) — the *only* line protecting work-in-progress on a failed parse — keeps all 9 e2e + 19 unit tests green. The unit round-trip test asserts `stops[].cssColor` **only**, which is precisely why R17 and R22 are invisible to it. | mutation *reasoned* from quoted assertions (source edits forbidden) + `npx vitest run test/gradient-parse.test.ts` |

**Strongest defect: R15.**

---

## Evidence index

Every probe is re-runnable verbatim from the repo root, read-only against the live dev server.

| file | what it establishes |
|---|---|
| `evidence/r3-probe.mjs` | `A` — the shown-vs-copied divergence |
| `evidence/r3-probe2.mjs` | `B0/B1/B2` easing destroyed by a no-op keystroke · `C` copy-not-idempotent · `D` L4 `in <space>` · `E` the angle-domain probe · `F` radial drops direction · `G` the mid-typing negative |
| `evidence/r3-probe3.mjs` | `H1` thirteen-Backspaces crash, unfiltered console + focus state |
| `evidence/r3-probe4.mjs` | `H2` **the one-keypress crash** · `I` unbounded direction ingress |
| `evidence/r3-probe5-keepalive.mjs` | `K1` KeepAlive proof · `K2` cross-route crash · `K3` the fallback persists across navigation |
| `evidence/r3-probe6-blank-boundary.mjs`, `r3-probe6b.mjs`, `r3-probe6c.mjs`, `r3-probe6d.mjs` | the blank crash surface: geometry, computed styles, stacking |
| `evidence/r3-probe7-highlight.mjs` | highlighting dead during authoring |
| `evidence/r3-B-easing-wiped.png`, `r3-C-copy-not-idempotent.png`, `r3-H1-crash.png`, `r3-H2-one-keypress-crash.png`, `r3-K2-cross-route.png`, `r3-K3-return.png`, `r3-boundary-element.png`, `r3-boundary-clip.png` | witnesses |

Nothing outside `docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/` was written.

---

## R15 — BLOCKER · one keypress, and the whole workspace is gone

### The gesture, and it is the shortest one

The pane boots with `linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)`.
A user who wants a different first colour selects the three channels and types over them. The selection
`0.75 0.15 145` is one drag; deleting it is one Backspace. At that instant the text reads `oklch()`.

```
node docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r3-probe4.mjs webkit
```

```json
{"engine":"webkit","tag":"H2-0-selection-geometry","found":true,
 "textNodes":["linear-gradient(","90deg",", oklch(","0.75"," ","0.15"," ","145",") ","0%",", oklch(","0.65"]}
{"engine":"webkit","tag":"H2-drag-select-one-backspace",
 "selectedText":"0.75 0.15 145",
 "textAtRest":"linear-gradient(90deg, oklch() 0%, oklch(0.65 0.18 265) 100%)",
 "editorGone":true,
 "boundaryText":"This panel hit an unexpected error. | undefined is not an object (evaluating 'g[0].replace') | Try again",
 "pageErrors":[]}
```

Real `mouse.down/move/up` over the rendered token rects, then one real `Backspace`. r2's thirteen
Backspaces reproduce too (`r3-probe3.mjs` tag `H1`, same boundary text, `consoleAll` carrying only Vite's
two `[vite] connected.` debug lines) — but the shipped defect is **one keypress deep**, not thirteen.

### The library root, re-measured against the surface the demo actually imports

`vite.config.ts:37–50` derives the demo's `@mkbabb/value.js/*` aliases from `package.json#exports`, so
`@mkbabb/value.js/css` → `dist/subpaths/css.js`. Straight at that file:

```
$ node --input-type=module -e "import { parseCssColor } from './dist/subpaths/css.js'; …"
"oklch()"        THROWS TypeError: Cannot read properties of undefined (reading 'replace')
"rgb()"          THROWS TypeError: Cannot read properties of undefined (reading 'replace')
"hsl()"          THROWS TypeError: …
"lab()"          THROWS TypeError: …
"lch()"          THROWS TypeError: …
"color()"        THROWS TypeError: …
"oklab()"        THROWS TypeError: …
"hwb()"          THROWS TypeError: …
"hsl(  )"        THROWS TypeError: …
"rgb( )"         THROWS TypeError: …
"oklch( / )"     THROWS TypeError: …
"color(srgb)"    ok=false
"rgb(1e400 0 0)" ok=false
"oklch(NaN 0 0)" ok=false
"oklch(0.7 0.1 145)" ok=true
```

**Eleven throwing inputs**, three of them beyond the registry's MT-F001 row of eight: `hwb()`, `rgb( )`
and **`oklch( / )`** (a slash with empty channels — what you get mid-way through authoring an alpha).
Same mechanism, three more rows.

The chain, line by line:

1. `GradientCodeEditor.vue:59-62` — `onInput` reads `textContent`, hands it to a 500 ms debounce.
2. `GradientCodeEditor.vue:55-57` — the debounce fires `emit("parse", text)` from a bare `setTimeout`.
3. `GradientVisualizer.vue:102-108` — `onParseCSS` → `applyCSS(css)`, expecting a verdict object.
4. `gradientParse.ts:92-94` — `isColorToken` calls `parseCssColor(token).ok`, assuming totality.
5. `src/css/grammar.ts:181` — the empty body yields `[]` and the `!` dereferences `undefined`.

### What is new: the blast radius is the application, not the pane

The record so far says "the pane dies". The tree says otherwise. `App.vue:50` opens **one**
`<ErrorBoundary>` and `App.vue:140` closes it **around the entire two-pane grid**, inside
`<main class="pane-main" aria-label="Color tool panes">`. There is no per-pane boundary. Measured:

```
node docs/…/evidence/r3-probe5-keepalive.mjs
```

```json
{"tag":"K2-crash-on-the-pane-the-user-is-now-looking-at","hash":"#/mix",
 "boundaryOnMix":"This panel hit an unexpected error. | undefined is not an object (evaluating 'g[0].replace') | Try again",
 "pageErrors":[]}
{"tag":"K3-return-to-gradient","editorPresent":false,"editorText":null,"boundaryStillShowing":true}
```

So: type an incomplete colour, leave for `#/mix` inside the debounce window, and the **Mix** pane you are
now looking at is replaced. Navigate back to `#/gradient` and the fallback is *still* there
(`r3-K3-return.png`): `caught` is boundary-local state that no route change resets. Every pane in the app
is unreachable until the user finds and clicks "Try again" — which remounts a fresh `useGradientModel()`
and discards the authored gradient entirely.

**Zero console errors** the whole time (`ErrorBoundary.vue:59-70` returns `false` from
`onErrorCaptured`), so every e2e `expect(consoleErrors).toEqual([])` is blind to it (R24).

### Cure (gestalt)

1. **Library** — `parseCssColor` must be total; `src/css/grammar.ts:181` is the single `!` that makes it
   partial. The mega-tranche parser band already ruled a running total parser; this is its acceptance
   criterion, not a local guard.
2. **Module contract** — `gradientParse.ts`'s header promises "model-or-reject". It honours that for
   *values* and not for *throws*. The oracle calls (`isColorToken`, `angleToDegrees`, `percentValue`) are
   the boundary: a throw there is a rejection, and must be returned as one.
3. **App shape** — one boundary around the whole workspace turns any pane's bug into an app outage. The
   boundary belongs at the pane slot, and it must reset on route change.

---

## R16 — MAJOR · the crash surface is blank: a button, and no reason

`ErrorBoundary.vue` is written to be exemplary (`role="alert"`, `aria-live="assertive"`, `tabindex=-1`
with `focus()` on catch, a real recovery button) and its **accessibility tree is correct** — measured,
`activeElement` after the crash is `DIV[role=alert]`, `aria-live` `assertive` (`r3-probe3.mjs` tag `H1`).

What it is not is *visible*. Element-clipped capture of the alert itself (`r3-boundary-element.png`) and a
600×240 viewport clip across all four children (`r3-boundary-clip.png`) show **only the "Try again"
pill**. The icon and both paragraphs are absent from the raster while the DOM says they are painted:

```json
{"tag":"SVG","rect":{"x":706,"y":447,"w":28,"h":28},"opacity":"1","visibility":"visible"}
{"tag":"P","text":"This panel hit an unexpected error.","rect":{"x":498,"y":487,"w":445,"h":36},
 "color":"rgb(28, 25, 23)","opacity":"1","visibility":"visible"}
{"tag":"P","text":"undefined is not an object (evaluating 'g[0].replace')","rect":{"x":488,"y":535,"w":464,"h":46},
 "color":"oklch(0.446872 0.003862 34.629978)","opacity":"1","visibility":"visible"}
{"tag":"BUTTON","text":" Try again","rect":{"x":658,"y":597,"w":124,"h":36},"opacity":"1","visibility":"visible"}
```

`-webkit-text-fill-color` is `rgb(28,25,23)` on the paragraph and on the button alike; no ancestor carries
`mask`, `filter`, `mix-blend-mode`, `opacity<1` or `background-clip:text` (`r3-probe6c.mjs`, full chain to
`<html>`).

**Mechanism (measured, and it follows from the painting rules).** `App.vue:11` mounts
`<canvas class="atmosphere-canvas absolute inset-0 w-full h-full pointer-events-none">` as a child of
`.app-layout`, before `<main class="pane-main">` (`App.vue:47`). The canvas is **positioned**
(`position:absolute`, `z-index:auto`); `<main>` and everything static inside it are not. Positioned
descendants with `z-index:auto` paint after in-flow content in the same stacking context (CSS 2.1
Appendix E, steps 4–7 before step 8), so the canvas covers every *static* box in `<main>`. The pane cards
escape because glass surfaces create their own stacking contexts; so does the glass `Button`. The
boundary's bare `<svg>` and `<p>`s do not — they have no surface at all. `elementsFromPoint` still returns
the paragraph first (the canvas is `pointer-events-none`), which is why hit-testing and a11y probes call
this clean while the raster is empty.

**Consequence for this component:** the only reachable way into that state from this workbench is this
editor's unguarded parse, and what the user gets for their one keypress is an aurora with a nameless-ish
pill floating in it. The "loud, explicit failure" doctrine the file's own header claims (lines 34–40,
102–106) is defeated twice over — once by the throw escaping the verdict path, once by the fallback not
rendering.

**Cure** — the fallback needs a real surface (the same card/plate every other pane content sits on), which
both fixes the paint and stops it looking like a system dialogue. Landing site: `ErrorBoundary.vue`
template + a stacking-context guarantee on `.pane-main`.

---

## R17 — MAJOR · a keystroke that changes nothing wipes the user's easing

```
node docs/…/evidence/r3-probe2.mjs webkit
```

```json
{"tag":"B0-easing-authored","headName":"1 → 2ease-out","railLiteral":"cubic-bezier(0, 0, 0.58, 1)"}
{"tag":"B2-enter-at-end-textContent-identical",
 "textContentUnchanged":true,
 "before":{"headName":"1 → 2ease-out","railLiteral":"cubic-bezier(0, 0, 0.58, 1)"},
 "after": {"headName":"1 → 2linear",  "railLiteral":"cubic-bezier(0, 0, 1, 1)"},
 "easingSurvived":false}
```

The gesture: pick `ease-out` on the interval, click into the editor, press **End**, press **Enter**. The
browser inserts a block boundary; `element.textContent` (line 60) does not see it, so the string handed to
the parser is byte-identical to the one already applied. The component fires it anyway, `applyCSS` swaps
the model, and `gradientParse.ts:295-298` re-seeds **every** interval to `linearInterval()`.

Two independent defects meet here and both are this component's:

- **No change-detection.** `onInput` (lines 59-62) submits on every `input` event, including events that
  do not change the text (Enter, a formatting shortcut, a paste of identical content). A parse that
  cannot change the model still costs the user their easing, their stop identities and their selection.
- **The submitted text cannot carry easing at all.** `serializeGradient` (`useGradientCSS.ts:147-162`)
  emits only type/direction/stops; there is no CSS spelling of the per-interval curves. So the editor is
  advertised as the round-trip surface for a model it can only round-trip *part* of, and re-ingesting its
  own output is lossy by construction — silently.

**Cure** — the editor must submit only when its text differs from the text that produced the current
model (one `lastSubmitted` string; KISS, no new module), and `applyCSS` must preserve intervals whose
endpoints are unchanged rather than re-seeding wholesale. The alternative — refusing to let the code
surface be authoritative for a model it cannot express — is the design seat's call, not mine.

---

## R18 — MAJOR · the standing cure for the un-cancelled debounce cannot fire

r2 filed R2 correctly (the pending parse is never cancelled) and dispositioned it as
`onBeforeUnmount(debouncedParse.cancel)`. **That hook never runs on the path that produces the bug.**

```json
{"tag":"K1-keepalive",
 "authored":"linear-gradient(45deg, red 0%, lime 40%, blue 100%)",
 "editorRemovedFromDomWhileAway":true,
 "afterReturn":"linear-gradient(45deg, red 0%, lime 40%, blue 100%)",
 "statePreserved":true}
```

State survives a `#/gradient → #/mix → #/gradient` round trip, so the instance was **deactivated**, not
unmounted — `PaneSlot.vue:120` wraps the pane in `<KeepAlive :max="max">` and `App.vue:88` passes
`:max="9"`. `onBeforeUnmount` fires only on LRU eviction (a 10th distinct pane) or teardown.

Shipping the filed cure would produce a green diff, a plausible-looking `onBeforeUnmount`, and an
unchanged bug: the cross-route crash (K2) would still land. The correct shape is
`onDeactivated(debouncedParse.cancel)` **and** `onBeforeUnmount(debouncedParse.cancel)` — and, better,
re-arming on `onActivated` is unnecessary because the debounce is created per instance.

`demo/shared/utils.ts:36-41` already exposes `.cancel()`; this component is its only consumer and calls
neither hook (`GradientCodeEditor.vue:2` imports `ref, computed, watch, onMounted, useTemplateRef` — no
lifecycle teardown at all).

---

## R19 — MAJOR · the CSS section shows one string, copies another, and cannot re-eat its own output

```json
{"tag":"A-shown-vs-copied",
 "shown":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
 "shownLen":74,"copiedLen":2115,"copiedStopCount":33,
 "copiedHead":"linear-gradient(90deg, oklch(75% 0.15 145deg) 0.00%, oklch(74.687500147402% 0.150937499558 148.749998231174deg) 3.13%, o",
 "identical":false}
```

Under one `<h3>CSS</h3>` heading (`GradientVisualizer.vue:253`) sit a Copy control bound to
`coalescedCSS` (`:127-129`) and this editor bound to `simpleCSS` (`:259`). They are different strings by
construction — 74 characters versus 2115, three stops versus thirty-three, and the copied form rewrites
the user's authored literals (`oklch(0.75 0.15 145)` → `oklch(75% 0.15 145deg)`), which is exactly the
literal-preservation law the parser module advertises (`gradientParse.ts:18`).

And the copy is not re-ingestible without damage:

```json
{"tag":"C-paste-back-own-copy","handlesBefore":2,"handlesAfter":33,"verdict":null,"editorLen":2115}
```

Paste what the app just gave you back into the field the app shows you, and your two-stop gradient becomes
a thirty-three-stop gradient with no warning. Every subsequent edit, easing row and stop handle is now
operating on a baked ramp.

**Cure** — one string per surface. Either the editor edits what Copy copies, or the Copy control states
which form it copies (and offers the other). The current arrangement is a WYSIWYG lie in the one place a
code readout exists to tell the truth.

---

## R20 — MAJOR · the pane rejects the CSS its own controls mean, and mis-names the token

```json
{"tag":"D-l4-interpolation-syntax","src":"linear-gradient(in oklch, red, blue)","verdict":"unparseable color \"in\""}
{"tag":"D-l4-interpolation-syntax","src":"linear-gradient(90deg in oklch, red, blue)","verdict":"unparseable color \"90deg\""}
{"tag":"D-l4-interpolation-syntax","src":"linear-gradient(in oklch longer hue, red, blue)","verdict":"unparseable color \"in\""}
```

The pane ships a **Space** selector (`OKLCh`, `GradientVisualizer.vue:181-193`) and a **Hue** selector
(`shorter`/`longer`, `:198-210`). In CSS those two controls *are* `in oklch longer hue` — the syntax the
editor refuses. Worse, the middle case blames `90deg`: `parsePreamble` (`gradientParse.ts:150-154`) only
recognises a bare angle when the first segment has exactly one token, so a valid angle followed by an
interpolation clause falls through to the stop branch and is reported as an unparseable *colour*. A user
told that `90deg` is not a colour has been handed a false lead.

This also means `simpleCSS` is not the CSS that renders: the interpolation space is baked into
`coalescedCSS` by sampling instead of expressed, so the editor's string pasted into a real stylesheet
produces a *different gradient* (sRGB interpolation) from the one on screen.

---

## R21 — MAJOR · an unbounded write into a bounded control, ending in an invalid ARIA state

```json
{"tag":"I-unbounded-direction","src":"linear-gradient(1e10turn, red, blue)","verdict":null,
 "readout":"3600000000000°","ariaValueNow":"3600000000000","ariaValueMax":"360","docScrollW":1440}
{"tag":"I-unbounded-direction","src":"linear-gradient(-720deg, red, blue)","verdict":null,
 "readout":"-720°","ariaValueNow":"-720","ariaValueMax":"360"}
{"tag":"I-unbounded-direction","src":"linear-gradient(1e308deg, red, blue)","verdict":null,
 "readout":"1e+308°","ariaValueNow":"1e+308","ariaValueMax":"360"}
```

`GradientVisualizer.vue:232` declares the Direction slider `:min="0" :max="360"`. The editor writes
`direction` straight past it (`gradientParse.ts:97-108` converts any accepted angle unit and
`useGradientModel.ts:165` assigns it). The result is a `role="slider"` reporting
`aria-valuenow="3600000000000"` inside `aria-valuemin/max` of 0/360 — a state the ARIA slider contract
forbids and that WCAG 4.1.2 (Name, Role, Value) makes a failure: an assistive technology is told a value
that is not in the control's own range, and a keyboard user cannot navigate back to it with the arrow
keys.

The model-or-reject doctrine claims a "COMPLETE model" (`gradientParse.ts:36-47`). Completeness here is
structural only; nothing checks that the values are inside the app's own domain. The clamp exists for stop
positions (`gradientParse.ts:281-283`) and is simply missing for direction.

*(Honest negative, my own hypothesis refuted: I expected `1e400deg` to poison the model with `Infinity`
and make the app's own serialisation unparseable forever. It does not — `parseCssScalar("1e400deg")`
returns `ok=false`, so the non-finite path is closed. `1e308deg` and `1e10turn` are the real, finite,
absurd values that get through.)*

---

## R22 — MINOR · a radial edit silently resets the direction the user set

```json
{"tag":"F-radial-drops-direction","directionBefore":"90°","directionAfter":"0°","verdict":null}
```

`serializeGradient` writes no angle for `radial` (`useGradientCSS.ts:151-155`), and `parseGradientCSS`
initialises `direction = type === "linear" ? 180 : 0` (`gradientParse.ts:214`). So the moment a radial
gradient is parsed, the user's 90° is replaced by 0 — silently, with no verdict, and switching Type back
to Linear does not restore it. A field the model still carries is destroyed by a round trip through a form
that cannot express it (the same mechanism as R17, one field over).

---

## R23 — MINOR · the highlighting is dead exactly while code is being written

```
node docs/…/evidence/r3-probe7-highlight.mjs
```

```json
{"tag":"P1-at-rest","hljsSpans":9,"html":"linear-gradient(<span class=\"hljs-number\">90deg</span>, oklch(<span class=\"hljs-number\">0.75</span> …"}
{"tag":"P2-while-authoring","hljsSpans":0,"html":"linear-gradient(45deg, red 0%, blue 100%)"}
{"tag":"P3-after-parse-applied-still-focused","hljsSpans":0,"html":"linear-gradient(45deg, red 0%, blue 100%)"}
{"tag":"P4-after-blur","hljsSpans":3,"html":"linear-gradient(<span class=\"hljs-number\">45deg</span>, red <span class=\"hljs-number\">0%</span>, blue <span class=\"hljs-number\">100%</span>)"}
```

`render()` is the only thing that produces markup (line 51-53) and it is gated to the unfocused state
(lines 72, 76-79). Consequence: the whole authoring session — the entire time a syntax-highlighted editor
earns its keep — is unhighlighted plain text. The colours return when you look away.

Cost of the affordance that does not work when it is needed:

```
$ wc -c node_modules/highlight.js/lib/core.js node_modules/highlight.js/lib/languages/css.js
   75941 node_modules/highlight.js/lib/core.js
   18879 node_modules/highlight.js/lib/languages/css.js
   94820 total
```

*(Honest negative: this is **not** on the boot critical path. `demo/shell/usePaneRouter.ts:74` loads
`GradientPane` through `defineAsyncComponent(() => import(...))`, so highlight.js rides the gradient
chunk. Raw source bytes, not gzipped-bundle bytes — an order of magnitude, not a bundle measurement.)*

---

## R24 — MAJOR (gate) · the tests exist, run green, and cannot see any of this

### What exists

```
$ npx vitest run test/gradient-parse.test.ts
 ✓ test/gradient-parse.test.ts (19 tests) 6ms
 Test Files  1 passed (1)
      Tests  19 passed (19)
```

plus `e2e/smoke/views/gradient.spec.ts` — 9 tests, four of which drive this component by role and name
(`typeIntoEditor`, lines 32-38).

### The minimal mutation that keeps every test green

> Delete the condition on `GradientCodeEditor.vue:72`, leaving `onBlur` as
> `focused.value = false; render(modelValue);`

That single edit removes the *only* protection the file has for work-in-progress after a failed parse: any
blur now overwrites the user's rejected text with the last canonical serialisation. The suite does not
notice, because **no test blurs after a failure**:

- `garbage input fails LOUD …` (line 222) types, then asserts the verdict, the destructive border and
  `toContainText("notacolor")` — all while the editor still has focus. Green.
- `round-trip …` (line 191) blurs only after a **successful** parse, where the mutation and the original
  behave identically (`toContainText("red 0%, rebeccapurple 80%")` is what both produce). Green.
- `radial geometry …` (line 250) never blurs. Green.

For contrast, deleting the whole `onBlur` handler **would** be caught (the round-trip test's post-blur
assertion fails) — which is what makes line 72 the precise vacuous point.

### Why the unit suite cannot see R17 / R22

`test/gradient-parse.test.ts:79-92` is the only round-trip test, and it asserts

```ts
expect(again.stops.map((s) => s.cssColor)).toEqual(["red", "rebeccapurple"]);
```

— `stops[].cssColor` and nothing else. `direction` and `intervals` are never compared across the round
trip, which is exactly where the losses are (R17 easing, R22 direction).

### And the console gate cannot see the BLOCKER

Every gradient e2e test ends `expect(consoleErrors).toEqual([])`. Measured during the live crash:
`consoleAll: ["debug:[vite] connecting...","debug:[vite] connected.", …]`, `pageErrors: []`. A test that
typed `oklch()` would pass its console assertion while the app lay in ruins behind it.

### The missing oracles, exactly

| property | covered? |
|---|---|
| an empty-argument colour function anywhere in the text | **no** |
| the pane still exists after any editor input | **no** |
| easing/direction survive a text round trip | **no** |
| blur inside the 500 ms window | **no** |
| a deferred parse after leaving the route | **no** |
| the editor's text and the Copy output agree | **no** |
| direction stays inside the slider's declared domain | **no** |

**Cure** — one property, not seven assertions: *for every text the user can leave in this editor, the app
survives, and either the model equals `parse(text)` or a verdict names why.* That single property is a
regression net for R15, R17, R19, R20, R21 and R22 at once.

---

## Confirmations of the standing record (independent measurement)

| prior | status |
|---|---|
| **r2 · R1** MT-F001 reaches the user through this component | **CONFIRMED-INDEPENDENTLY** — dist-level oracle above (11 inputs, 3 new) + live `H1`/`H2`. Upgraded by R15 (blast radius, one keypress). |
| **r2 · R2** the pending parse is never cancelled; the crash lands on another route | **CONFIRMED-INDEPENDENTLY** (`K2`). **Its cure is wrong** — see R18. |
| **r2 · R6** hand-rolled field chrome where glass-ui has the part | **CONFIRMED-INDEPENDENTLY** — `@mkbabb/glass-ui@7.0.0` dist census: `data-kind` values present in the whole dist are exactly `input` and `textarea`; `.field-control` carries `border:1.5px`, `background:var(--input-on-glass)`, `backdrop-filter:var(--glass-cell-backdrop-filter,…)`, `border-radius:var(--radius-field)`; `LabeledFieldSlotProps` exposes `controlId · labelledBy · describedBy · errorId · invalid` and `LabeledFieldProps` has `controlLabelable` documented for non-labelable composite roots. Nothing in the design system covers a code surface. |
| **r2 · R7** (seen half) the verdict paints below the pane fold | **CONFIRMED-INDEPENDENTLY** by my own witness `r3-B-easing-wiped.png`: the destructive verdict is cut in half at the pane's bottom edge, unreadable, while the editor above it is fully visible. |
| **r2 · R14** the mobile matrix never reaches this component | **CONFIRMED-INDEPENDENTLY** — I read `shots/safari-mobile-light/gradient.png`: the capture ends in the easing specimen strip; the CSS section is not in frame. The REPORT's gradient rows (`namelessButtons 1`, 6 small tap targets, all four matrices) contain no contribution from this component, which renders no button at all. |
| **r2 · R11 / R13** masking `catch`, rich-paste hygiene | not re-measured; I have nothing to add and do not re-litigate them. |

**Negative results I own:** the error boundary's *accessibility* behaviour is correct — focus lands on
`DIV[role=alert]`, `aria-live="assertive"` (measured, `H1`); and the mid-typing gesture
`linear-gradient(90deg, oklch(` does **not** crash (`r3-probe2.mjs` tag `G`: `editorGone:false`), because
`parseGradientCSS` rejects on the unbalanced tail before reaching a colour token. The crash needs a
*balanced, empty* colour function — which is what deleting a selection produces, not what typing forward
produces. That distinction matters for whoever writes the regression test.

---

## MT-F037 — the OM-13 readout row (owner mark, 2026-07-27)

The marked row is `GradientEasingEditor.vue:176-198` — a hand-rolled
`div.readout-rail.bg-well.rounded-md.px-2.py-1` holding a `<code>` literal and two 3.5-unit icon buttons.
Witness `audit/visual/owner-marked/OM-13-easing-readout-not-glass-input.png`; the owner is right that it
reads as a rectangle where a field belongs.

**Census of the installed design system** (`@mkbabb/glass-ui@7.0.0`, from `dist/`, not from docs):

- the field primitive is `.field-control`, and the only kinds that exist in the entire dist are
  `data-kind="input"` and `data-kind="textarea"`;
- `Input` renders no slots — there is no trailing-affordance seat for the copy/tune pair;
- `LabeledField` supplies `errorId` / `describedBy` / `errorLive` / `controlLabelable`, i.e. the error
  wiring, but not a code surface;
- `.field-control` elements on the whole gradient route: **0**.

**Therefore this is a marked glass-forward ask, never a local restyle**, and it is one ask covering two
surfaces on the same route — the easing readout rail *and* my subject, which is the second hand-rolled
code surface on that pane. They do not even agree with each other: `r3-B-easing-wiped.png` shows a filled
`bg-well` plate with two trailing icons directly above an outlined transparent box, ten pixels apart.

> **Ask for the glass-ui relay:** a **code field** in the `field-control` family (`data-kind="code"`) that
> (a) takes a plain-text value, single- or multi-line, (b) permits a token-highlight overlay without
> owning the grammar, (c) supports `invalid` and the `LabeledField` error wiring, and (d) admits trailing
> control affordances (the OM-13 copy/tune pair). Until it exists, both value.js code surfaces stay
> hand-rolled and divergent.

---

## Edict compliance

| # | edict | verdict |
|---|---|---|
| 1 | no god modules | **pass** — 117 lines, one job |
| 2 | no legacy / masking fallbacks | **FAIL** — `catch { return code }` (line 46) is a masking fallback into `innerHTML`; `modelValue` without `update:modelValue` is an affordance that does not exist |
| 3 | KISS, no contrivance | **FAIL** — a contenteditable + innerHTML + hand-rolled focus truce, delivering highlighting that is off while typing (R23) and a text pipeline that fuses lines, is more machinery than a field and less function |
| 4 | glass-ui is the design system | **FAIL** — 0 `.field-control` on the route; see MT-F037 |
| 5 | root-level styling | **FAIL** — per-instance inline `:style` transition, lines 95-97 |
| 6 | animations never deleted | **pass** — the transition is preserved (misplaced, not lost) |
| 7 | idiomatic Vue 3.5 | **partial** — `useTemplateRef` ✓, reactive props destructure ✓; but no lifecycle teardown at all (R18), and `onBlur` decides on `hasError`, a stale read of the *previous* parse |
| 8 | `verbatimModuleSyntax` | **pass** — every import in the file is a value import |

---

## Disposition (no edits landed; this formation writes reports only)

| id | where the cure lands | shape |
|---|---|---|
| R15 | `src/css/grammar.ts:181` → totality · `gradientParse.ts` oracle calls → catch-as-reject · `App.vue:50` → per-slot boundary that resets on route change | three layers; fixing one does not fix the family |
| R16 | `ErrorBoundary.vue` template (give the fallback a real surface) + a stacking guarantee on `.pane-main` | the announced failure must also be *seen* |
| R17 | this file (submit only on a real text change) + `useGradientModel.applyCSS` (preserve unchanged intervals) | a no-op edit must be a no-op |
| R18 | this file | `onDeactivated(debouncedParse.cancel)` **and** `onBeforeUnmount(debouncedParse.cancel)` — the r2 disposition alone is a non-fix |
| R19 | `GradientVisualizer.vue:127-129 / :259` | one string per surface |
| R20 | `gradientParse.ts` preamble + `useGradientCSS.serializeGradient` | speak `in <space> <hue> hue`; and never blame a valid token |
| R21 | `gradientParse.ts` (clamp/normalise direction to the model's declared domain) | the "complete model" must be a *valid* model |
| R22 | `gradientParse.ts:214` | do not overwrite a field the text does not mention |
| R23 | falls out of the MT-F037 glass ask | a value-bound code field highlights while you type or does not pretend to |
| R24 | `e2e/smoke/views/gradient.spec.ts` + one component property test | survival + verdict as a single property |
