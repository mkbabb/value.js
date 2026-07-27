# CHALLENGE-C — `GradientStopEditor.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
spawned with, declared explicitly by the orchestrator. Not inherited, not undeclared.

---

## Verdict

**DEFECTIVE.** Ten findings, two of them BLOCKER-class **silent data corruption**, both
reproduced live against `http://localhost:9000/#/gradient` with pasted output. The component's
own gesture — drag — destroys the model invariant its sibling parser enforces, and its own
`add` gesture silently re-attaches every authored easing curve to a different segment of the
gradient. Its only behavioural gate is RED at HEAD and no CI job runs it.

| # | Severity | Defect | Reproduced? |
|---|---|---|---|
| C1 | **BLOCKER** | Drag (and shift+arrow) inverts stop order; the model has no ordering invariant, and the CSS the app emits is rejected by the app's own parser | YES |
| C2 | **BLOCKER** | Easing intervals are keyed by array index → inserting a stop silently moves the user's authored curve onto a different pair of stops | YES |
| C3 | MAJOR | Every drag `pointermove` emits `update:position` **twice** (the "fallback path" is a duplicate, not a fallback) | YES — measured 21/20 |
| C4 | MAJOR | Test truth: 5 of 13 gradient e2e tests FAIL at HEAD; the add/drag/remove spec is one of them; no CI job runs Playwright at all | YES — pasted run |
| C5 | MAJOR | The route's parse path **throws** instead of rejecting on the 8 empty-argument colour functions (MT-F001 live) | YES |
| C6 | MAJOR | a11y: no keyboard path to ADD a stop; slider semantics implemented on a bare `<button>`; focus destroyed on remove; 20×20 measured targets | YES |
| C7 | MINOR | Handle track (inset 11px) and ramp paint (full border-box) do **not** share an axis — the file's own headline invariant is false | YES — measured |
| C8 | MINOR | Dual write path for selection + an unbound public model (edict 2/3) | YES — grep |
| C9 | MINOR | Hover is modelled in JS because the scale rides an inline `transform` (edict 5/7) | YES — source |
| C10 | INFO | Dead masking fallbacks, a dead `inject`, a no-op prop default, a 0-returning null guard | YES |

Strongest defect: **C1**.

---

## Method + evidence base

* Full read of `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (393 lines),
  its parent `GradientVisualizer.vue`, `GradientPane.vue`, `GradientCodeEditor.vue`, and all four
  composables (`useGradientModel.ts`, `useGradientCSS.ts`, `gradientParse.ts`,
  `useGradientInterpolation.ts`).
* Live drive of `http://localhost:9000` (Playwright, Chromium) — six probe sessions, each one
  batched into a single call (the app drifts route between MCP calls, so nothing is split).
* Two node probes written under this audit dir (the only place this seat may write):
  * `evidence/parse-probe.ts` — the parser oracle
  * `evidence/serialize-cost.ts` — the per-invalidation cost
* One real Playwright run of the component's own specs.
* `docs/tranches/V/megatranche/audit/visual/REPORT.json` rows for `/#/gradient` (4 matrices) and
  the `safari-desktop-light/gradient.png` shot.

---

## C1 — BLOCKER · Drag inverts stop order; the app emits CSS its own parser rejects

**The claim.** `GradientStopEditor` emits raw positions and nothing anywhere keeps `stops`
sorted on a drag. Dragging a terminal handle past an interior stop leaves the model
non-monotonic. Three things break at once: the rail paints a lie, the easing intervals now
straddle inverted pairs, and the serialized CSS is refused by `parseGradientCSS` — the app
cannot re-read its own output.

**Reproduction (live, pasted).** Open `/#/gradient`, click the rail at 50 % to mint a third
stop, then drag the **0 %** handle to ~75 %:

```
afterAdd: ["Gradient stop at 0%","Gradient stop at 50%","Gradient stop at 100%"]

labels after the drag (DOM order == model order):
  [{"label":"Gradient stop at 75%","left":"calc(74.9% - 4.98px)"},
   {"label":"Gradient stop at 50%","left":"calc(50% + 0px)"},
   {"label":"Gradient stop at 100%","left":"calc(100% - 10px)"}]

editorText:
  linear-gradient(90deg, oklch(0.75 0.15 145) 74.9%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)

rail background-image (head):
  linear-gradient(90deg, oklch(0.75 0.15 145) 74.9%, oklch(0.746875 0.150937 148.75) 73.34%,
                  oklch(0.74375 0.151875 152.5) 71.79%, …)
```

The ramp's stop positions **descend** (74.9 → 73.34 → 71.79 …). CSS clamps every colour-stop to
be ≥ its predecessor (css-images-3 §3.4.1), so the first 74.9 % of the rail collapses into a
flat band of the first colour — the handle sitting at 50 % is inside a region that no longer
varies, and the render tile carries the same corruption (`tileRender` head is byte-identical).

**The round-trip contract dies.** Feed that exact self-produced string back through the app's
own parser:

```
$ npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-stopeditor/evidence/parse-probe.ts
parseGradientCSS -> reject: stop positions must be non-decreasing (hard-stop reordering isn't modeled)
  << linear-gradient(90deg, oklch(0.75 0.15 145) 74.9%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)
```

`gradientParse.ts:284-290` enforces monotonicity on the way IN. Nothing enforces it on the way
OUT. The W5-11/P0-1 "model-or-reject, the model is always complete" boundary is one-way.

**Mechanism.** `useGradientModel.ts:127-131`

```ts
function updateStop(id: string, patch: Partial<Pick<GradientStop, "cssColor" | "position">>) {
    stops.value = stops.value.map((s) => (s.id === id ? { ...s, ...patch } : s));
}
```

compare `addStop` two functions above (`useGradientModel.ts:118`), which **does** sort. So
sortedness is an invariant on insert and a coincidence on drag. The same hole is reachable from
the keyboard: `GradientStopEditor.vue:173-179` (`shift`+arrow = ±10) emits the same unguarded
position.

**Cure (architectural, not a patch).** Ordering is not a property of an array — make it a
property of the operation. One model action owns it:

```ts
function setStopPosition(id: string, position: number) {
    const next = stops.value.map(s => s.id === id ? { ...s, position } : s)
                            .sort((a, b) => a.position - b.position);
    stops.value = next;                      // sortedness is total, by construction
}
```

…paired with C2's identity-keyed intervals so the re-sort cannot scramble easing. The
alternative — clamping the drag to `(prev, next)` — is cheaper but strictly worse: it makes a
stop un-reorderable, which is a real authoring need. Sort, don't clamp.

---

## C2 — BLOCKER · Adding a stop silently re-attaches every authored easing curve

**The claim.** Intervals are stored in a parallel array keyed by **index**, and the sync watcher
appends/truncates at the **tail**, while `addStop` inserts in **sorted position**. Every insert
before the last segment therefore shifts every downstream curve onto a different pair of stops.
The user's authored easing silently moves and the segment they authored it for silently reverts
to linear.

**Reproduction (live, pasted).** stops `[0, 50, 100]`; open interval row 2 and pick the `steps`
specimen (so `steps(4, jump-end)` governs **50 % → 100 %**); then click the rail at 25 %:

```
s2 (before the insert):
  readouts: ["cubic-bezier(0, 0, 1, 1)", "steps(4, jump-end)"]
  heads:    ["1 → 2linear", "2 → 3steps"]

s3 (after clicking the rail at 25%):
  labels:   ["Gradient stop at 0%","Gradient stop at 25%","Gradient stop at 50%","Gradient stop at 100%"]
  readouts: ["cubic-bezier(0, 0, 1, 1)", "steps(4, jump-end)", "cubic-bezier(0, 0, 1, 1)"]
  heads:    ["1 → 2linear", "2 → 3steps", "3 → 4linear"]
```

`steps` is now on **25 % → 50 %**. The segment the user actually authored (50 % → 100 %) is
linear again. No warning, no undo, no verdict — the authored artefact is gone.

**Mechanism.** `useGradientModel.ts:89-100`:

```ts
watch(() => stops.value.length, (len) => {
    const needed = Math.max(0, len - 1);
    while (intervals.value.length < needed) intervals.value.push(linearInterval()); // ← tail
    if (intervals.value.length > needed) intervals.value.length = needed;           // ← tail
});
```

The watcher observes `length` only — it cannot know **where** the stop landed, so it can only
guess "at the end". `removeStop` has the mirror defect: deleting stop 1 of 4 truncates the LAST
interval and shifts every remaining curve one segment left.

**Cure.** Stop modelling an adjacency relation as a positional array. Either
(a) hang the interval on the stop that OPENS it — `GradientStop { id, cssColor, position,
easing }`, with the last stop's easing ignored, so the curve travels with its own stop through
any insert/remove/sort, or (b) key a `Map<`​`${aId}|${bId}`​`, GradientInterval>` off the ordered
pair and derive the row list from `stops`. (a) is KISS and kills the watcher outright — the
whole `intervals` array, its sync watcher, and the `Gradient interval N is missing` throws in
`useGradientCSS.ts:189/240` and `GradientVisualizer.vue:77` disappear with it.

---

## C3 — MAJOR · Every drag `pointermove` emits `update:position` twice

**The claim.** `onBarPointerMove` calls itself a "fallback path while a handle drag is live
(capture sits on the handle)" (`GradientStopEditor.vue:92-95`). It is not a fallback. Pointer
capture retargets the event to the handle, and the event still **bubbles to the bar** — so both
handlers run on every move and each emits the same position.

**Measurement (live).** A 20-step drag with a counting listener on the bar:

```
counters: { "barMovesOnHandle": 21, "barMovesTotal": 22, "errors": [] }
```

21 of 22 bar-level `pointermove`s had a handle as their target, i.e. the bar's `draggingId`
branch fired on essentially every move of the drag, immediately after the handle's own handler
already emitted.

**Cost per duplicate.** `getPosition` (line 75-81) calls `getBoundingClientRect()` — a forced
layout — so a drag pays **two** synchronous layout flushes and two whole-array rebuilds per
move. Downstream, one invalidation costs (measured, `evidence/serialize-cost.ts`):

```
--- 3 stops ---
serializeCoalescedGradient: 0.110 ms/call
serializeRailRamp        : 0.111 ms/call
serializeGradient        : 0.001 ms/call
  per invalidation (all three computeds): 0.223 ms
```

The three computeds are lazy, so they recompute once per flush, not twice — which is why this
is MAJOR and not BLOCKER. The duplicated work is the two rects and the two array rebuilds; the
real defect is that a live-drag code path nobody can see is running on a false premise, and the
comment documents the premise as fact.

**Cure.** Delete the branch. With capture on the handle the bar has no job during a drag:

```ts
function onBarPointerMove(e: PointerEvent) {
    if (draggingId.value) return;                    // the handle owns the gesture, period
    const t = e.target as HTMLElement;
    hoverPos.value = t.closest("[data-stop-id]") ? null : getPosition(e);
}
```

…and cache `rect` in `onHandlePointerDown` instead of measuring per move (the rail cannot
resize mid-drag; `touch-action: none` is already set).

---

## C4 — MAJOR · The component's only behavioural gate is RED, and CI never runs it

**Measurement.** The component's two spec files, run as the project runs them:

```
$ npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts \
    --project=smoke --reporter=line
  5 failed
    [smoke] › o21-gradient-rail.spec.ts:129:1 › ruler grammar: two terminal caps at the track extremes, every rung strictly interior
    [smoke] › views/gradient.spec.ts:40:1  › gradient view renders direction slider with zero console errors
    [smoke] › views/gradient.spec.ts:106:1 › selecting a stop pins the envelope plate to its single-hue slice; Escape and re-tap un-pin it (P7-R1)
    [smoke] › views/gradient.spec.ts:144:1 › stop add (bar click mints the ramp color), drag, and touch-true remove
    [smoke] › views/gradient.spec.ts:270:1 › easing row carries its live ramp; steps mode lands in the literal
  8 passed (4.2m)
```

The **only** test that exercises add / drag / remove is among the five. Its failure:

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
  - attempting scroll into view action
    - waiting for element to be stable
    - element is not stable
```

(I probed the rail's box for 90 consecutive rAF frames in a headed Chromium and found it
perfectly stable — 1 distinct box, 89/89 equal consecutive pairs — so the instability is
specific to the smoke project's environment, not a product oscillation. The gate is red either
way, and it has been red at HEAD for anyone who ran it.)

Two of the five assert DOM that **no longer exists anywhere in the tree**:

```
$ grep -rn "gradient-ruler-cap\|gradient-rung" --include="*.vue" --include="*.ts" demo/ src/     → (no matches)
$ grep -rn "Perceived-space" demo/                                                               → (no matches)
```

Both were retired in `a68ecdc1` (2026-07-17, "v4 consumer migration + ruled retirements"); the
specs were never updated. And a third is a pure literal drift (`steps(4, end)` asserted,
`steps(4, jump-end)` rendered).

**Why nobody noticed.** `.github/workflows/` contains `ci.yml`, `deploy-pages.yml`,
`release.yml` — and `grep -rn playwright .github/workflows/*.yml` returns nothing. The e2e
suite is not wired to CI at all, so ten days of red cost nothing.

**Vacuous-gate finding.** Even when it ran green, the drag leg proved almost nothing:

```ts
const label = await mid.getAttribute("aria-label");
const pct = Number(label?.match(/(\d+)%/)?.[1] ?? "0");
expect(pct).toBeGreaterThan(60);                       // e2e/smoke/views/gradient.spec.ts:173-175
```

One handle, one lower bound. **The exact mutation that keeps it green:** set
`const HANDLE_HALF = 0` (`GradientStopEditor.vue:53`) — deleting the entire inset-track
geometry this file is architected around (the "W5-11 end-handle truce", 30 lines of comment) —
and every assertion in the repo still passes, because o21's only congruence check compares
handles against `gradient-ruler-cap` elements that no longer exist. Equally green-preserving:
removing the ordering guard (there is none, C1), the duplicate emit (C3), and the keyboard
handler entirely (nothing tests arrows/Delete/Escape except the Escape leg of an already-red
test).

There are **zero unit tests** for this component: `grep -rln GradientStopEditor test/ demo/test/`
→ no matches.

---

## C5 — MAJOR · The route's parse path throws instead of rejecting (MT-F001, live)

```
$ npx vite-node docs/.../evidence/parse-probe.ts
parseCssColor("oklch()") -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor("rgb()")   -> THROW TypeError: …
parseCssColor("hsl()")   -> THROW TypeError: …
parseCssColor("lab()")   -> THROW TypeError: …
parseCssColor("lch()")   -> THROW TypeError: …
parseCssColor("oklab()") -> THROW TypeError: …
parseCssColor("hwb()")   -> THROW TypeError: …
parseCssColor("color()") -> THROW TypeError: …
parseGradientCSS -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
  << linear-gradient(90deg, oklch(), blue)
```

**Mechanism.** `src/css/grammar.ts:181` — `splitTopLevel(slash[0]!.replace(/,/g, " "), "space")`.
`splitTopLevel` (`grammar.ts:63-87`) pushes the tail only when non-empty, so an empty body
returns `[]`, and the non-null assertion on `slash[0]` is false. The `!` is the whole bug.

**Why this component's neighbourhood owns the blast radius.** `gradientParse.ts:92`
(`isColorToken`) treats `parseCssColor` as a total validity oracle — the module header says so
explicitly ("the demo never hand-validates a color"). The throw escapes `parseGradientCSS` →
`applyCSS` → `GradientVisualizer.onParseCSS` (line 102-108, no `try`) → the code editor's 500 ms
`debounce` **timer callback**, where nothing can catch it. The result on the live route is an
uncaught `TypeError` with **no verdict rendered**: the W5-11 "failure is LOUD, never silent"
contract inverts into the quietest possible failure. `garbage input fails LOUD` (spec line 222)
only passes because `notacolor` is a bare ident, which fails the regex before reaching line 181.

**Cure.** In `grammar.ts`, not in the pane: `const head = slash[0]; if (head === undefined)
return failure(source, "css_syntax", ["CSS color"]);`. A `try/catch` in `onParseCSS` would be a
masking fallback (edict 2) and would leave every other `parseCssColor` caller exposed.

---

## C6 — MAJOR · Accessibility is implemented as decoration, not as operation

**No keyboard path to ADD a stop.** The live focusable census inside `main` on `/#/gradient`:

```
["Gradient stop at 0%","Gradient stop at 100%","Gradient type","Interpolation space",
 "Hue interpolation","Gradient direction","1 → 2linear","linear","ease", … ]
```

The rail itself is a `<div>` with `role: null`, `tabindex: null` (measured) whose *only*
affordance — click-to-add — is pointer-exclusive. A keyboard user can move and delete stops but
can never create one. WCAG 2.1.1 (Keyboard), Level A.

**Slider semantics on a bare button.** Each handle is `<button aria-label="Gradient stop at N%">`
with `role: null` (measured) and no `aria-valuenow` / `valuemin` / `valuemax` / `valuetext`,
yet `onHandleKeydown` (line 173-187) implements the arrow-key slider pattern. Assistive tech is
told "button", so the ±1 / ±10 nudges and the drag produce no value announcement — the position
lives only in a mutating `aria-label`, whose change is announced inconsistently across SRs and
never at all in some. There is no `aria-live` region for add/remove results either.
`Home`/`End`/`PageUp`/`PageDown` are unimplemented.

**Focus is destroyed on remove.** `removeStop` (line 158-162) clears `selectedId` and emits
`remove`; the focused handle un-mounts (keyboard `Delete` path) or the chip un-mounts (click
path, since `v-if="selectedStop && removable"` goes false), and nothing restores focus — it
falls to `<body>`. WCAG 2.4.3 (Focus Order). The idiomatic cure is to focus the neighbouring
handle after the model settles, which needs the ids the component already has.

**Measured tap targets.** `REPORT.json`, `/#/gradient`, all four matrices:

```json
{"w":20,"h":20,"tag":"button","label":"Gradient stop at 0%"},
{"w":20,"h":20,"tag":"button","label":"Gradient stop at 100%"}
```

This component contributes **2 of the 6** small tap targets on the route (×4 matrices = 8 of the
60 rows in the audit's `smallTapTargets` total). The `.rail-handle::before` inflates the *hit*
region to `max(1.5rem, 100%)` = exactly 24 px on fine pointers — the WCAG 2.5.8 floor, with zero
margin — while the *visible* target stays 20 px and no automated audit can see the pseudo. On
coarse pointers the pseudo is `var(--touch-target)` = 44 px (measured token value).

**Consequence of the 44 px pseudo (derived, not driven — HYPOTHESIS).** With the pseudo
present on all pointers, a click within ±12 px (fine) / ±22 px (coarse) of a handle centre is
routed to the handle, so the bar's `add` gesture is dead over 24 px (fine) / 44 px (coarse) of
rail per handle — 9.5 % of the measured 462 px rail per stop on touch. I confirmed the mechanism
at the fine size: clicking 2 px inside the rail's left edge added **nothing** (labels and CSS
byte-identical before and after), because the 0 % handle's 24 px pseudo already owns that column.
With six stops on a phone, over half the rail cannot mint a stop.

---

## C7 — MINOR · The handle track and the ramp do not share an axis

The file's headline claim (lines 8-13, repeated at 211-213 and 262-265):

> the rail ALWAYS paints this … so handles, add-ghost and ramp share one axis by construction

**Measured, live:**

```
barRect: { x: 224, y: 200.68, w: 462, h: 40 },  borderTopWidth: "1px"
bgSize:  "100% 100%, 16px 16px",  bgOrigin: "border-box, border-box"
handles: [ { label: "Gradient stop at 0%",   centerX: 235, left: "calc(0% + 10px)"  },
           { label: "Gradient stop at 100%", centerX: 675, left: "calc(100% - 10px)" } ]
```

The ramp's 0 % is at x = 224 and its 100 % at x = 686 (border-box, `background-size: 100% 100%`).
The 0 % handle's centre is at 235 and the 100 % handle's at 675 — **11 px inside each end**
(`HANDLE_HALF` = 10 px plus the 1 px border, because `left` resolves against the padding box).
The two axes differ by 11 px = **2.38 %** of the ramp on this 462 px rail.

Consequences: the hover ghost is painted at the pointer but filled with `colorAt(p_inset)`,
while the ramp under it shows `p_full` — near the terminals those differ by 2.38 % of the ramp,
i.e. Δhue ≈ 2.9° on the shipped seed (the ramp's own sample step is 3.13 %: `oklch(0.75 0.15
145) 0%` → `oklch(0.746875 0.150937 148.75) 3.13%`). The stop a click mints inherits the same
2.38 % error, so "an added stop is invisible until moved" (the W5-11 claim) is only true at the
rail's midpoint.

o21's "terminal truth" leg cannot catch this: it samples device columns 3–8 px and asks only
which terminal family they resemble.

**Cure.** Give the ramp the same inset track the handles ride, as a property of the paint
contract rather than a per-callsite nudge:

```css
.gradient-rail {
    background-position: var(--rail-inset) 0, 0 0;
    background-size: calc(100% - 2 * var(--rail-inset)) 100%, 16px 16px;
}
```

with `--rail-inset: 11px` as the one number both the CSS and `handleLeft`/`getPosition` read
(exported to JS via `getComputedStyle` or, better, declared in JS and set as the custom property
— one source, either direction). Today `HANDLE_HALF = 10` is a bare JS literal the stylesheet
knows nothing about.

---

## C8 — MINOR · Dual write path for the selection, and an unbound public model

`onHandlePointerDown` writes the model **and** emits the same fact (lines 129-130):

```ts
selectedId.value = id;
emit("select", id);
```

and the parent wires both (`GradientVisualizer.vue:140,144`):

```
v-model:selected-id="selectedStopId"
@select="(id) => selectedStopId = id"
```

Deleting the `select` emit + handler changes nothing observable. Worse, the grep for
`selectedStopId` finds exactly three lines — the `defineModel` and those two bindings. Nothing
reads it: `GradientPane.vue` never binds `v-model:selectedStopId`, so `GradientVisualizer`'s
`defineModel` is a public prop/emit pair with no consumer. Two dead surfaces (edict 2 — no dual
paths; edict 3 — KISS). The selection is component-local state; a `ref` in the stop editor
would say so honestly, and the emit can go.

(The repo's `defineModel` stale-read hazard is *not* live here: Vue 3.5.35's `useModel` keeps a
synchronous local value, and every read in this file — `wasSelected` at line 123 — is captured
before the write at line 129. Recorded as a checked negative.)

---

## C9 — MINOR · Hover is modelled in JS because the scale rides an inline `transform`

The file documents its own defect (lines 30-33 and 255-261): the `hover:scale-110` utility was
dead because the inline `transform` outranks it, so hover became reactive state —
`hoveredId` + `@pointerenter` + `@pointerleave` on **every** handle, a reactive tick and a
component re-render per hover, to reproduce CSS `:hover`. The transition and transform strings
are also re-authored per instance on every render (edict 5 — style at the root, not per
instance).

**Cure** — pass the per-stop *data* as custom properties and own the geometry in the scoped
sheet, which restores `:hover` and deletes `hoveredId`, `handleScale`, and two listeners per
handle:

```html
:style="{ '--stop-pos': stop.position, '--stop-color': stop.cssColor }"
```
```css
.rail-handle { --handle-scale: 1;
  left: calc(var(--rail-inset) + (100% - 2 * var(--rail-inset)) * var(--stop-pos) / 100);
  transform: translate(-50%, -50%) scale(var(--handle-scale)); }
.rail-handle:hover              { --handle-scale: 1.1; }
.rail-handle[data-selected]     { --handle-scale: 1.25; }
```

---

## C10 — INFO · Masking fallbacks, a dead inject, a no-op default, a lying guard

* `var(--radius-pill, 9999px)` (line 318) and `var(--touch-target, 2.75rem)` (line 388) — both
  tokens resolve live (measured on `:root`: `--radius-pill: 9999px`, `--touch-target: 2.75rem`),
  so the fallbacks are unreachable masking defaults. Edict 2.
* `GradientPane.vue:8` — `const cssColorOpaque = inject(CSS_COLOR_KEY)!;` is never referenced in
  that file. Dead injection.
* `GradientStopEditor.vue:6` — `colorAt = undefined` is a no-op default on an already-optional
  prop.
* `getPosition` (line 76) — `if (!barRef.value) return 0;` answers "position 0" to an
  unanswerable question. Every caller runs from a DOM event on the mounted rail; a guard that
  cannot fire but *would* silently warp a stop to 0 % if it did is worse than no guard.

**Edicts that PASS:** #8 `verbatimModuleSyntax` — the only type-only import (`GradientStop`,
line 4) is `import type`. #6 animations — none deleted; the scoped `--spring-snappy` transition
is preserved and tokenized. #1 no god module — 393 lines with one job.

---

## Checked and NOT found (negative results, so the next seat doesn't re-spend the probes)

* **Stuck drag after a context-menu remove** — hypothesised: right-click sets `draggingId`, the
  handle is removed by `onHandleContextMenu`, its `pointerup` never fires, `draggingId` leaks.
  Driven live: after the removal the bar's cursor was still `copy` (not `grabbing`) and the
  hover ghost was alive (`ghostPresent: 1`). The `pointerup` retargets to the bar once the
  handle is gone, and `onBarPointerUp` clears `draggingId`. Self-healing by accident, but real.
* **Duplicate terminal stops from an edge click** — hypothesised: clicking inside the 11 px
  band left of the inset track mints a zero-span stop at 0 %. Driven live at x+2 and
  x+width−2: no stop added, CSS byte-identical. The 24 px hit pseudo intercepts first (which is
  C6's dead-band mechanism, measured from the other side).
* **Rail box oscillation** — the e2e "element is not stable" failure suggested a perpetual
  layout loop. Sampled the rail + a handle over 90 consecutive rAF frames in a headed Chromium:
  `distinctBoxes: 1`, `consecutiveEqualPairs: 89`. Not a product oscillation.
* **`defineModel` stale read** — checked every read/write ordering in the file; none is a
  read-after-write (see C8).
* **`ValueUnit` nesting, oklch→HSV `stableHue` drift, ungated rAF, WebGL boot** — none of these
  hazard classes touch this component: it holds no `ValueUnit`, no HSV round-trip, no
  `requestAnimationFrame`, no canvas. Its only listeners are template-bound (auto-removed with
  the element) and it registers nothing on `window`/`document`, so there is no leak surface.
* **`touch-action`** — the handles compute `touch-action: auto`, but the CSS Touch Action spec
  intersects the hit element with its ancestors, and the rail carries `touch-none`. Not a defect.

---

## Evidence files written by this seat

* `docs/tranches/V/megatranche/audit/components/wb-gradient-stopeditor/evidence/parse-probe.ts`
* `docs/tranches/V/megatranche/audit/components/wb-gradient-stopeditor/evidence/serialize-cost.ts`

Both are read-only probes (`npx vite-node <path>`); no source under `src/`, `demo/`, `api/`,
`test/`, `e2e/` was modified by this seat.
