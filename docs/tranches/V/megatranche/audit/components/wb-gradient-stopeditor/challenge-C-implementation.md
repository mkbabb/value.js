# CHALLENGE-C — `GradientStopEditor.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5 — model id `claude-opus-5[1m]` (1M context)**, the tier this seat
was spawned with under an explicit orchestrator declaration. Not inherited, not undeclared.

**Provenance of this document.** This is **pass 2** of challenge-C on this component. A pass-1
report existed at this path (written 2026-07-27 13:28). Pass 2 re-drove the live route
independently and: (a) **re-confirmed** C1 and C3 with its own pasted measurements, (b) **added
four findings pass 1 did not have** — C11–C14, two of them reproduced live — and (c) **corrected
one pass-1 mechanism claim** (C8's `defineModel` parenthetical) against the Vue 3.5.35 source.
Every pass-1 finding retained below carries a provenance tag: `[p1]` retained as written,
`[p1·reverified-p2]` re-measured by this seat, `[p2·NEW]` found in this pass,
`[p2·CORRECTION]` amended.

---

## Verdict

**DEFECTIVE.** Fourteen findings. Three BLOCKER-class **silent data corruption / dead-contract**
defects, all three reproduced live against `http://localhost:9000/#/gradient` with pasted output.

The component's own drag gesture destroys the model invariant its sibling parser enforces (C1);
its own `add` gesture silently re-attaches every authored easing curve to a different segment
(C2); a grab anywhere but the exact pixel centre of a handle teleports the stop on the first
1-pixel move (C11); and its entire documented keyboard contract is unreachable after a mouse
selection because the component suppresses its own focus (C12). Its only behavioural gate is RED
at HEAD, and no CI job runs it.

| # | Severity | Defect | Reproduced? |
|---|---|---|---|
| C1 | **BLOCKER** | Drag (and shift+arrow) inverts stop order; the app emits CSS its own parser rejects | YES `[p1·reverified-p2]` |
| C2 | **BLOCKER** | Easing intervals are index-keyed → inserting a stop silently moves the user's authored curve | YES `[p1]` |
| C11 | **BLOCKER** | **Grab-offset teleport: press 8 px off a handle's centre, move the pointer 1 px, the stop jumps 10.12 px (0 % → 2.3 %)** | YES `[p2·NEW]` |
| C12 | **MAJOR** | **Pointer selection never focuses the handle → arrows / Delete / Escape are all dead after a mouse select** | YES `[p2·NEW]` |
| C3 | MAJOR | Every drag `pointermove` emits `update:position` twice; the "fallback path" is a duplicate | YES `[p1·reverified-p2]` — 21/21 |
| C4 | MAJOR | Test truth: the add/drag/remove spec is RED at HEAD; Playwright is not wired to CI at all | YES `[p1]`, CI + dead-selector legs re-verified `[p2]` |
| C5 | MAJOR | The route's parse path **throws** instead of rejecting on the 8 empty-argument colour functions (MT-F001 live) | YES `[p1]` |
| C6 | MAJOR | a11y: no keyboard path to ADD; slider semantics on a bare `<button>`; focus destroyed on remove; 20×20 targets | YES `[p1]`, REPORT rows re-pulled `[p2]` |
| C7 | MINOR | Handle track (inset 11 px) and ramp paint (full border-box) do not share an axis | YES `[p1]` |
| C13 | MINOR | **One axis, two denominators: `getPosition` measures a 304 px border-box track, `handleLeft` places on a 302 px padding-box track** | YES `[p2·NEW]` — measured |
| C8 | MINOR | Dual write path for selection + an unbound public model (edicts 2/3) | YES `[p1]`, mechanism `[p2·CORRECTION]` |
| C9 | MINOR | Hover modelled in JS because the scale rides an inline `transform` (edicts 5/7) | YES `[p1]` |
| C14 | MINOR | **No `e.button` guard: the bar's add gesture is armed by any pointer button** | Source YES; live repro INCONSISTENT `[p2·NEW]` |
| C10 | INFO | Masking fallbacks, a dead `inject`, a no-op default, a 0-returning null guard | YES `[p1]` |

**Strongest defect: C1** — it is the one that silently corrupts persisted user data and breaks
the app's own round-trip contract. C11 is the most *frequent* (it fires on essentially every
drag a real user performs); C1 is the most *damaging*.

---

## Method + evidence base

* Full read of `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (393 lines),
  its parent `GradientVisualizer.vue`, `GradientPane.vue`, and all four composables
  (`useGradientModel.ts`, `useGradientCSS.ts`, `gradientParse.ts`, `useGradientInterpolation.ts`).
* Live drive of `http://localhost:9000` with Playwright's **real** input pipeline
  (`page.mouse` / `page.keyboard`, i.e. CDP `Input.dispatchMouseEvent` — not synthetic
  `dispatchEvent`, which cannot exercise `setPointerCapture`). Five batched sessions in pass 2.
* `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` `useModel` source (vue 3.5.35) for
  the `defineModel` mechanism.
* `docs/tranches/V/megatranche/audit/visual/REPORT.json` rows for `/#/gradient` (all 4 matrices)
  and the `safari-mobile-light/gradient.png` shot (read visually).
* Pass-1 probes retained at `evidence/parse-probe.ts`, `evidence/serialize-cost.ts`.

### A live-driving note the next seat needs (cost me two probe rounds)

A **cold load of `http://localhost:9000/#/gradient` does not reach this route.** Measured:

```
goto('http://localhost:9000/#/gradient') → after 4000 ms: hash "#/",  bars 0, body innerText length 77
                                          after 10000 ms: hash "#/?color=%23abcdef", bars 0
```

The deep link is rewritten to `#/` and nothing renders. The working recipe is: load
`http://localhost:9000/`, wait for boot, then set `location.hash = '#/gradient'` **in-page**.
Corollary trap: because the fragment then matches, a later `page.goto(…#/gradient)` is a
*same-document* navigation — **it does not reload**, so gradient model state survives across what
looks like a fresh navigation. Pass-2 probe round 3 was polluted this way before I caught it;
every measurement below comes from the in-page recipe with a verified 2-stop seed.

---

## C1 — BLOCKER · Drag inverts stop order; the app emits CSS its own parser rejects

`[p1·reverified-p2]`

**The claim.** `GradientStopEditor` emits raw positions and nothing anywhere keeps `stops`
sorted on a drag. Dragging a handle past a neighbour leaves the model non-monotonic. Three things
break at once: the rail paints a lie, the easing intervals straddle inverted pairs, and the
serialized CSS is refused by `parseGradientCSS` — the app cannot re-read its own output.

**Pass-2 reproduction (my own run, pasted).** Fresh route, click the rail at 50 % to mint a stop,
then drag the leftmost handle rightwards to ~75 % in 10 steps:

```
afterAdd  labels: ["Gradient stop at 0%","Gradient stop at 50%","Gradient stop at 63%","Gradient stop at 100%"]

afterDrag labels: ["Gradient stop at 77%","Gradient stop at 50%","Gradient stop at 63%","Gradient stop at 100%"]
afterDrag lefts : ["calc(76.6% - 5.32px)","calc(50% + 0px)","calc(63.2% - 2.64px)","calc(100% - 10px)"]

rail computed background-image (head):
  linear-gradient(90deg, oklch(0.65 0.18 265) 76.6%,
                         oklch(0.657192 0.177842 256.369) 74.18%,
                         oklch(0.664384 0.175685 247.739) 71.76%,
                         oklch(0.671576 0.173527 239.108) 69.35%, …
```

DOM order **is** model order (`v-for="stop in stops"`), so the model is `77 → 50 → 63 → 100`.
The emitted ramp's stop positions **descend** — 76.6 → 74.18 → 71.76 → 69.35. CSS clamps every
colour stop to be ≥ its predecessor (css-images-3 §3.4.1), so the whole leading run collapses
into a flat band of one colour. The render tile carries the identical corruption (same
`coalescedCSS` sampling law).

**The round-trip contract dies.** Pass 1 fed a self-produced non-monotonic string back through
the app's own parser:

```
$ npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-stopeditor/evidence/parse-probe.ts
parseGradientCSS -> reject: stop positions must be non-decreasing (hard-stop reordering isn't modeled)
  << linear-gradient(90deg, oklch(0.75 0.15 145) 74.9%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)
```

`gradientParse.ts:284-290` enforces monotonicity on the way IN. Nothing enforces it on the way
OUT. The W5-11/P0-1 "model-or-reject, the model is always complete" boundary is **one-way**.

**Mechanism.** `useGradientModel.ts:127-131`

```ts
function updateStop(id: string, patch: Partial<Pick<GradientStop, "cssColor" | "position">>) {
    stops.value = stops.value.map((s) => (s.id === id ? { ...s, ...patch } : s));
}
```

Compare `addStop` nine lines above (`useGradientModel.ts:118`), which **does** sort. Sortedness
is an invariant on insert and a coincidence on drag. The same hole is reachable from the
keyboard: `GradientStopEditor.vue:173-179` (shift+arrow = ±10) emits the same unguarded position.

**Cure (architectural, not a patch).** Ordering is not a property of an array — make it a
property of the operation. One model action owns it:

```ts
function setStopPosition(id: string, position: number) {
    stops.value = stops.value
        .map(s => (s.id === id ? { ...s, position } : s))
        .sort((a, b) => a.position - b.position);   // sortedness is total, by construction
}
```

…paired with C2's identity-keyed intervals so the re-sort cannot scramble easing. The
alternative — clamping the drag to `(prev, next)` — is cheaper but strictly worse: it makes a
stop un-reorderable, which is a real authoring need. **Sort, don't clamp.**

---

## C2 — BLOCKER · Adding a stop silently re-attaches every authored easing curve

`[p1]`

**The claim.** Intervals live in a parallel array keyed by **index**, and the sync watcher
appends/truncates at the **tail**, while `addStop` inserts in **sorted position**. Every insert
before the last segment shifts every downstream curve onto a different pair of stops.

**Reproduction (pass 1, pasted).** stops `[0, 50, 100]`; set interval row 2 to the `steps`
specimen (so `steps(4, jump-end)` governs 50 % → 100 %); then click the rail at 25 %:

```
before insert:  readouts ["cubic-bezier(0, 0, 1, 1)", "steps(4, jump-end)"]
                heads    ["1 → 2linear", "2 → 3steps"]

after  insert:  labels   ["Gradient stop at 0%","Gradient stop at 25%","Gradient stop at 50%","Gradient stop at 100%"]
                readouts ["cubic-bezier(0, 0, 1, 1)", "steps(4, jump-end)", "cubic-bezier(0, 0, 1, 1)"]
                heads    ["1 → 2linear", "2 → 3steps", "3 → 4linear"]
```

`steps` is now on **25 % → 50 %**. The segment the user authored (50 % → 100 %) is linear again.
No warning, no undo, no verdict.

**Mechanism.** `useGradientModel.ts:89-100`:

```ts
watch(() => stops.value.length, (len) => {
    const needed = Math.max(0, len - 1);
    while (intervals.value.length < needed) intervals.value.push(linearInterval()); // ← tail
    if (intervals.value.length > needed) intervals.value.length = needed;           // ← tail
});
```

The watcher observes `length` only — it cannot know **where** the stop landed, so it guesses "at
the end". `removeStop` has the mirror defect: deleting stop 1 of 4 truncates the LAST interval
and shifts every remaining curve one segment left.

**Note the compounding with C1.** Once C1's cure re-sorts on drag, this defect gets *worse* —
a drag past a neighbour would then permute the interval array too. C1 and C2 must be cured
together or not at all.

**Cure.** Stop modelling an adjacency relation as a positional array. Either
(a) hang the interval on the stop that OPENS it — `GradientStop { id, cssColor, position, easing }`,
last stop's easing ignored, so the curve travels with its own stop through any insert/remove/sort;
or (b) key a `Map<"${aId}|${bId}", GradientInterval>` off the ordered pair. (a) is KISS and kills
the watcher outright — the whole `intervals` array, its sync watcher, and the
`Gradient interval N is missing` throws at `useGradientCSS.ts:189/240` and
`GradientVisualizer.vue:77` all disappear with it.

---

## C11 — BLOCKER · Grab-offset teleport: a 1-pixel pointer move relocates the stop by 10 px

`[p2·NEW]`

**The claim.** `onHandlePointerDown` records *no grab offset*. The first `pointermove` therefore
snaps the stop's centre to the raw pointer position, discarding however far off-centre the user
actually grabbed. Because the component deliberately inflates the handle's hit region to 24 px
(fine pointers) / 44 px (coarse) via `.rail-handle::before` (lines 374-391), the user is *invited*
to grab up to 12 px / 22 px off-centre — and every one of those pixels becomes an instantaneous,
unintended edit of the gradient.

**Reproduction (live, pasted).** Fresh route, 2-stop seed, 462 px rail. Press **8 px to the right
of the 0 % handle's centre** — still inside its own hit target — then move the pointer **one
pixel**:

```
S0 handles: [{label:"Gradient stop at 0%",   cx:235, left:"calc(0% + 10px)"},
             {label:"Gradient stop at 100%", cx:675, left:"calc(100% - 10px)"}]

S1 after pointerdown at cx+8 (no move yet): unchanged — cx 235, "Gradient stop at 0%"

S2 after ONE pixel of pointer travel:
             [{label:"Gradient stop at 2%",  cx:245.12, left:"calc(2.3% + 9.54px)"}, …]

RESULT_grab_offset = { grabbed_px_right_of_centre: 8,
                       pointer_travelled_px: 1,
                       handle_travelled_px: 10.12,
                       label_before: "Gradient stop at 0%",
                       label_after:  "Gradient stop at 2%" }
```

**1 px of intent → 10.12 px of edit → 2.3 % of the gradient, in the first frame of the drag.**
At the fine-pointer maximum off-centre grab (12 px) that is ≈ 2.9 % of this rail; at the coarse
maximum (22 px, the `--touch-target: 2.75rem` pseudo) ≈ 5.2 % on a 462 px rail and **7.3 % on the
324 px rail I measured at the narrower viewport** (22 / 302 × 100). On touch — where the user
cannot see their own contact centroid at all — every drag begins by throwing the stop several
percent away from where it was.

**Mechanism.** `GradientStopEditor.vue:136-146`:

```ts
function onHandlePointerMove(e: PointerEvent) {
    if (!draggingId.value) return;
    if (handleGesture && (Math.abs(e.clientX - handleGesture.x) > 4 || …)) handleGesture.moved = true;
    emit("update:position", draggingId.value, getPosition(e));   // ← absolute, offset discarded
}
```

The bitter detail: **this function already computes the 4 px dead-zone it needs** — and wires it
to the wrong consumer. `handleGesture.moved` exists solely to decide whether a press was a
re-tap-to-deselect (line 151). The position emit on the line below is ungated, so a 1 px tremor
edits the model. The component measured the right thing and then did not use it.

This also falsifies the file's own headline truce (lines 35-41): *"the bar NEVER moves an existing
stop"*. The bar does not — but the **handle** warps the stop it grabs, which is the same user-
visible violation the truce was written to end.

**Cure.** Capture the offset at grab time and gate the first emit with the dead-zone the file
already computes:

```ts
// pointerdown, on the handle
const rect = barRef.value!.getBoundingClientRect();          // cached: the rail cannot resize mid-drag
handleGesture = { …, grabDx: e.clientX - handleCentreX(stop.position, rect) };

// pointermove
if (!handleGesture.moved) return;                            // ← the dead-zone finally does its job
emit("update:position", id, positionAt(e.clientX - handleGesture.grabDx, rect));
```

Two consequences fall out for free: the cached `rect` removes the per-move forced layout (C3),
and the dead-zone removes the "click a handle, nudge it by accident" class entirely.

---

## C12 — MAJOR · Pointer selection never focuses the handle, so the whole keyboard contract is dead

`[p2·NEW]`

**The claim.** `onHandlePointerDown` calls `e.preventDefault()` (line 120). On a `pointerdown`
that suppresses the compatibility mouse events, and focus is the default action of `mousedown` —
so clicking a stop handle **selects it without focusing it**. Every keyboard affordance the
component implements (`onHandleKeydown`, lines 173-187: ±1 / ±10 nudge, Delete, Escape) is
attached to an element that pointer users can never make `document.activeElement`.

**Mechanism proof (live, pasted).** Counting listeners installed on the handle in the capture
phase, then one real mouse press-release on its centre:

```
PROBE_A_focus_mechanism = {
  pointerdown: 1,
  mousedown:   0,      ← suppressed by the component's own preventDefault
  mouseup:     0,
  click:       1,
  focus:       0,
  defaultPrevented: true,
  activeElement: "BODY/"
}
```

**User-facing consequence (live, pasted).** Same gesture, then two `ArrowRight` presses. Selection
is *proved* by the inline transform ladder (`scale(1.25)` is only reachable when
`selectedId === id`, line 60-63):

```
D = { pressed_at: 270.55,
      selection_proved_by_scale: ["1.25", "1"],        ← handle 0 IS selected
      activeElement_after_click: "BODY/",
      labels_after_click:            ["Gradient stop at 0%","Gradient stop at 100%"],
      labels_after_2x_ArrowRight:    ["Gradient stop at 0%","Gradient stop at 100%"],
      keyboard_had_effect: false }
```

Selected, and inert. `Delete` in the same state was likewise a no-op. The docstring at lines
169-172 — *"Escape clears selection while the handle keeps focus"* — describes a state the pointer
path can never produce: there is no focus to keep. The only way to reach the keyboard contract is
to Tab to a handle without ever having clicked one.

This is also why C6's "focus is destroyed on remove" is worse than it reads: focus is not
destroyed on remove, it is **never established at all** on the pointer path.

**Why the `preventDefault` is there** — to stop text/drag selection during the drag. That job is
already done twice over: the rail carries `select-none touch-none` (line 203) and the handle takes
pointer capture (line 133).

**Cure.** Drop `e.preventDefault()` from `pointerdown` and let the button take focus natively; if
a native drag-image still appears, kill it at the source with `@dragstart.prevent` on the handle,
which is the targeted default action rather than the whole compat-event chain. Then the
`:focus-visible` ring system the file already builds (lines 328-359) starts serving the pointer
path too, and the selected stop and the focused stop become the same object — which is what every
line of the keyboard handler assumes.

---

## C3 — MAJOR · Every drag `pointermove` emits `update:position` twice

`[p1·reverified-p2]`

`onBarPointerMove` calls itself a *"fallback path while a handle drag is live (capture sits on the
handle)"* (lines 92-95). It is not a fallback. Pointer capture retargets the event to the handle,
and the event still **bubbles to the bar** — both handlers run on every move, and each emits.

**Pass-2 measurement (my own run, pasted).** Listeners on both the bar and the handle, then a
20-step drag:

```
E = { barMoves: 21, barMovesTargetIsHandle: 21, handleMoves: 21, capture: "got",
      moved_from: 270.55, moved_to: 430.7, labels: ["Gradient stop at 36%","Gradient stop at 100%"] }
```

`capture: "got"` confirms the handle held pointer capture; `handleMoves` and `barMoves` are
**equal at 21**, and all 21 bar-level moves had a handle as target. So the bar's `draggingId`
branch fired on 21 of 21 moves, immediately after the handle's own handler had already emitted.
(Pass 1 measured 21/22 in a different session; two independent sessions agree.)

**Cost per duplicate.** `getPosition` (lines 75-81) calls `getBoundingClientRect()` — a forced
layout — so a drag pays **two** synchronous layout flushes and two whole-array rebuilds per move.
One invalidation downstream costs (pass-1 `evidence/serialize-cost.ts`):

```
--- 3 stops ---
serializeCoalescedGradient: 0.110 ms/call
serializeRailRamp         : 0.111 ms/call
serializeGradient         : 0.001 ms/call
  per invalidation (all three computeds): 0.223 ms
```

The three computeds are lazy, so they recompute once per flush, not twice — which is why this is
MAJOR and not BLOCKER. The duplicated work is the two rects and the two array rebuilds; the real
defect is that a live-drag code path nobody can see runs on a false premise, and the comment
records that premise as fact.

**Cure.** Delete the branch — with capture on the handle the bar has no job during a drag — and
cache the rect at pointerdown (C11's cure supplies it):

```ts
function onBarPointerMove(e: PointerEvent) {
    if (draggingId.value) return;                     // the handle owns the gesture, period
    const t = e.target as HTMLElement;
    hoverPos.value = t.closest("[data-stop-id]") ? null : getPosition(e);
}
```

---

## C4 — MAJOR · The component's only behavioural gate is RED, and CI never runs it

`[p1]` for the suite run; CI + dead-selector legs re-verified in `[p2]`.

**Pass-1 run, as the project runs it:**

```
$ npx playwright test e2e/smoke/views/gradient.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts \
    --project=smoke --reporter=line
  5 failed
    [smoke] › o21-gradient-rail.spec.ts:129 › ruler grammar: two terminal caps …
    [smoke] › views/gradient.spec.ts:40    › gradient view renders direction slider with zero console errors
    [smoke] › views/gradient.spec.ts:106   › selecting a stop pins the envelope plate … (P7-R1)
    [smoke] › views/gradient.spec.ts:144   › stop add (bar click mints the ramp color), drag, and touch-true remove
    [smoke] › views/gradient.spec.ts:270   › easing row carries its live ramp; steps mode lands in the literal
  8 passed (4.2m)
```

The **only** test that exercises add / drag / remove is among the five.

**Pass-2 re-verification of the cheap legs (my own commands, pasted):**

```
$ grep -rln "playwright" .github/workflows/     → (no matches)
$ ls .github/workflows/                          → ci.yml  deploy-pages.yml  release.yml

$ grep -rn "gradient-ruler-cap\|gradient-rung" e2e/
  e2e/smoke/oracles/o21-gradient-rail.spec.ts:135:    const caps  = main.getByTestId("gradient-ruler-cap");
  e2e/smoke/oracles/o21-gradient-rail.spec.ts:163:    const rungs = main.getByTestId("gradient-rung");
$ grep -rn "gradient-ruler-cap\|gradient-rung" demo/ src/
  (no matches)
```

So: the e2e suite is **not wired to CI at all**, and o21's congruence oracle asserts against two
test-ids that exist nowhere in the product tree. Ten days of red cost nothing.

**Vacuous-gate finding.** Even green, the drag leg proves almost nothing
(`e2e/smoke/views/gradient.spec.ts:157-175`):

```ts
const mid = handles(main).nth(1);
await mid.hover();                       // ← grabs the exact centre, so C11 can never fire
…
const pct = Number(label?.match(/(\d+)%/)?.[1] ?? "0");
expect(pct).toBeGreaterThan(60);         // ← one handle, one lower bound, no ordering assertion
```

**The exact mutation that keeps every assertion in the repo green while gutting the component:**
delete the `.sort()` from `addStop` (`useGradientModel.ts:118`). A bar click then appends instead
of inserting, so the model becomes `[0, 100, 50]`; the spec's `nth(1)` handle drags to 75 %,
`pct > 60` passes, the count is 3, the chip appears, and `consoleErrors` stays empty — while the
rail and the render tile paint a clamped, corrupted ramp and the app can no longer re-parse its
own CSS. Equally green-preserving: `const HANDLE_HALF = 0` (deleting the entire inset-track
geometry this file is architected around), removing the duplicate emit (C3), removing the grab
offset that was never there (C11), and deleting `onHandleKeydown` outright — nothing tests arrows,
Delete or Home/End, and `mid.hover()` guarantees the drag test never grabs off-centre.

There are **zero unit tests** for this component:
`grep -rln "GradientStopEditor" test/ e2e/` → only `e2e/smoke/views/gradient.spec.ts`,
`e2e/smoke/oracles/o21-gradient-rail.spec.ts`, `e2e/smoke/oracles/o27-focus-affordance.spec.ts`
(all e2e, none run by CI); no vitest file references it.

---

## C5 — MAJOR · The route's parse path throws instead of rejecting (MT-F001, live)

`[p1]`

```
$ npx vite-node docs/.../evidence/parse-probe.ts
parseCssColor("oklch()") -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor("rgb()")   -> THROW TypeError: …
parseCssColor("hsl()")   -> THROW …   parseCssColor("lab()")  -> THROW …
parseCssColor("lch()")   -> THROW …   parseCssColor("oklab()")-> THROW …
parseCssColor("hwb()")   -> THROW …   parseCssColor("color()")-> THROW …
parseGradientCSS -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
  << linear-gradient(90deg, oklch(), blue)
```

**Mechanism.** `src/css/grammar.ts:181` —
`const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");`
`splitTopLevel` pushes its tail only when non-empty, so an empty body yields `[]` and the
non-null assertion on `slash[0]` is false. The `!` is the whole bug.

**Why this component's neighbourhood owns the blast radius.** `gradientParse.ts:92`
(`isColorToken`) treats `parseCssColor` as a *total* validity oracle — the module header says so
("the demo never hand-validates a color"). The throw escapes `parseGradientCSS` → `applyCSS` →
`GradientVisualizer.onParseCSS` (lines 102-108, no `try`) → the code editor's debounce **timer
callback**, where nothing can catch it. The W5-11 "failure is LOUD, never silent" contract inverts
into the quietest possible failure: an uncaught `TypeError` and no verdict rendered.

**Cure — in `grammar.ts`, not in the pane:**
`const head = slash[0]; if (head === undefined) return failure(source, "css_syntax", ["CSS color"]);`
A `try/catch` in `onParseCSS` would be a masking fallback (edict 2) and would leave every other
`parseCssColor` caller exposed.

---

## C6 — MAJOR · Accessibility is implemented as decoration, not as operation

`[p1]`, REPORT rows re-pulled in `[p2]`.

**No keyboard path to ADD a stop.** The rail is a `<div>` with `role: null`, `tabindex: null`
(measured) whose only affordance — click-to-add — is pointer-exclusive. A keyboard user can move
and delete stops but can never create one. WCAG 2.1.1 (Keyboard), Level A.

**Slider semantics on a bare button.** Each handle is
`<button aria-label="Gradient stop at N%">` with `role: null` and no `aria-valuenow` /
`valuemin` / `valuemax` / `valuetext`, yet `onHandleKeydown` implements the arrow-key slider
pattern. AT is told "button", so nudges and drags produce no value announcement — the position
lives only in a mutating `aria-label`, whose change is announced inconsistently across screen
readers and not at all in some. No `aria-live` region for add/remove results.
`Home`/`End`/`PageUp`/`PageDown` unimplemented. And per **C12** the keyboard pattern is
unreachable from the pointer path in the first place.

**Focus.** `removeStop` (lines 158-162) clears `selectedId` and emits `remove`; the focused handle
or the chip unmounts and nothing restores focus — it falls to `<body>` (WCAG 2.4.3).

**Measured tap targets** — `REPORT.json`, `/#/gradient`, my own pull, identical in all four
matrices (`safari-desktop-light|dark`, `safari-mobile-light|dark`):

```
smallTapTargets (6 per matrix):
  {"w":160,"h":23,"tag":"input","label":""}
  {"w":22,"h":22,"tag":"button","label":"Switch to slug"}
  {"w":22,"h":22,"tag":"button","label":"Generate new slug"}
  {"w":22,"h":22,"tag":"button","label":"Cancel"}
  {"w":20,"h":20,"tag":"button","label":"Gradient stop at 0%"}     ← this component
  {"w":20,"h":20,"tag":"button","label":"Gradient stop at 100%"}   ← this component
namelessButtons: 1   imgNoAlt: 0   overflowX: 0   consoleErrors: []   pageErrors: []
```

This component contributes **2 of the 6** small tap targets on the route, ×4 matrices = 8 rows.
`.rail-handle::before` inflates the *hit* region to exactly 24 px on fine pointers — the WCAG
2.5.8 floor with zero margin — while the *visible* target stays 20 px. The route's single
nameless button is **not** this component's (both handles are labelled).

**Consequence of the inflated pseudo (mechanism confirmed at the fine size, extrapolation
labelled HYPOTHESIS).** A click within ±12 px (fine) / ±22 px (coarse) of a handle centre routes
to the handle, so the bar's add gesture is dead over 24 px / 44 px of rail per stop. Pass 1
confirmed the mechanism: clicking 2 px inside the rail's left edge added nothing (labels and CSS
byte-identical). With six stops on a phone, over half the rail cannot mint a stop. **And every one
of those absorbed pixels is a C11 teleport waiting to happen** — the same pseudo that eats the add
gesture is what lets a user grab 22 px off-centre.

---

## C7 — MINOR · The handle track and the ramp do not share an axis

`[p1]`

The file's headline claim (lines 8-13, repeated at 211-213 and 262-265): *"the rail ALWAYS paints
this … so handles, add-ghost and ramp share one axis by construction."*

**Measured, live:**

```
barRect: { x: 224, y: 200.68, w: 462, h: 40 },  borderTopWidth: "1px"
bgSize:  "100% 100%, 16px 16px",  bgOrigin: "border-box, border-box"
handles: [ {label:"Gradient stop at 0%",   centerX: 235, left:"calc(0% + 10px)"},
           {label:"Gradient stop at 100%", centerX: 675, left:"calc(100% - 10px)"} ]
```

The ramp's 0 % is at x = 224 and its 100 % at x = 686 (border-box, `background-size: 100% 100%`).
The handle centres are at 235 and 675 — **11 px inside each end**. The two axes differ by
11 px = **2.38 %** of the ramp on this 462 px rail. This is visible in
`shots/safari-mobile-light/gradient.png`: the ramp's terminal green is painted to the left of the
0 % handle's centre.

Consequences: the hover ghost is painted at the pointer but filled with `colorAt(p_inset)` while
the ramp beneath shows `p_full` — near the terminals those differ by 2.38 % of the ramp, i.e.
Δhue ≈ 2.9° on the shipped seed (the ramp's own sample step is 3.13 %). A minted stop inherits the
same error, so "an added stop is invisible until moved" is true only at the rail's midpoint.

o21's "terminal truth" leg cannot catch this: it samples device columns 3–8 px and asks only which
terminal family they resemble.

**Cure.** Give the ramp the same inset track the handles ride, as a property of the paint contract:

```css
.gradient-rail {
    background-position: var(--rail-inset) 0, 0 0;
    background-size: calc(100% - 2 * var(--rail-inset)) 100%, 16px 16px;
}
```

with `--rail-inset` as the ONE number the CSS, `handleLeft` and `getPosition` all read. Today
`HANDLE_HALF = 10` is a bare JS literal the stylesheet knows nothing about — see C13 for what that
costs even *within* the JS.

---

## C13 — MINOR · One axis, two denominators: the pointer track and the handle track differ by 2 px

`[p2·NEW]`

`getPosition` measures against `barRef.getBoundingClientRect()` — the **border box**. `handleLeft`
emits `calc(10px + (100% - 20px) * p/100)` into an absolutely-positioned child, whose `100%`
resolves against the rail's **padding box**. The rail has a 1 px border (`.gradient-rail`, line
319), so the two are different lengths with different origins.

**Measured, live:**

```
F_axis = { borderLeftWidth: "1px",
           borderBoxWidth: 324,   paddingBoxWidth: 322,
           pointerTrackLen_getPosition:     304,     ← 324 − 2·HANDLE_HALF
           handleCentreTrackLen_handleLeft: 302 }    ← 322 − 2·HANDLE_HALF
```

Confirmed at the other viewport too: at `w = 462`, `handleLeft(0)` puts the centre at
`x + 1 + 10 = 235`, while `getPosition` maps pointer `x + 10 = 234` to 0 %. Origins differ by
1 px; track lengths differ by 2 px (442 vs 440).

Consequences, all small but systematic and all in the class C7 names: the handle never sits
exactly under the pointer that placed it (≈ 1 px error, sign-flipping across the rail); reaching
100 % requires the pointer to travel 2 px past where the handle can go; and the add ghost —
positioned with `handleLeft`, previewed with `getPosition` — is drawn ~1 px off the pointer that
summoned it. The `10.12 px` (not 9 px) in C11's measurement is this error made visible.

**Cure.** One denominator, declared once. Either give the rail `box-sizing: content-box`
accounting in `getPosition` (subtract the computed border), or — better, and it composes with
C7's cure — express both the paint inset and the handle track in terms of a single
`--rail-inset` custom property, and have `getPosition` read the same value rather than a JS
literal that duplicates it.

---

## C8 — MINOR · Dual write path for the selection, and an unbound public model

`[p1]`, with a `[p2·CORRECTION]` to the mechanism note.

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

Deleting the `select` emit + handler changes nothing observable. Worse, `grep -rn selectedStopId`
finds exactly three lines — the `defineModel` and those two bindings. `GradientPane.vue` never
binds `v-model:selectedStopId`, so `GradientVisualizer`'s `defineModel` is a public prop/emit pair
with **no consumer**. Two dead surfaces (edict 2 — no dual paths; edict 3 — KISS). Selection is
component-local state; a `ref` in the stop editor would say so honestly.

### `[p2·CORRECTION]` — the `defineModel` stale-read hazard is ARMED, not absent

Pass 1 recorded a checked negative with the justification *"Vue 3.5.35's `useModel` keeps a
synchronous local value"*. **That justification is wrong.** From
`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4321-4332` (vue 3.5.35, verified with
`require('vue/package.json').version`):

```js
set(value) {
  …
  const rawProps = i.vnode.props;
  if (!(rawProps &&                                  // check if parent has passed v-model
        (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) &&
        (`onUpdate:${name}` in rawProps || …))) {
    localValue = value;                              // ← ONLY when the parent did NOT bind v-model
    trigger();
  }
  i.emit(`update:${name}`, emittedValue);
}
```

The local value is updated **only when the parent has not passed `v-model`**. Here the parent
*does* pass it (`v-model:selected-id`, `GradientVisualizer.vue:140`), so a write to
`selectedId.value` is **not** visible to a subsequent read until the parent's ref updates, the
parent re-renders, and the new prop reaches the child's `watchSyncEffect`. This is exactly the
repo-recorded hazard that standing law #7 prescribes a local `shallowRef` cache for.

The **verdict** stays the same as pass 1 — no current call site in this file reads `selectedId`
after writing it in the same tick (`wasSelected` at line 123 is captured *before* the write at
line 129; `removeStop` reads then writes) — but the reason is luck of ordering, not a synchronous
model. The hazard is armed: `selectedId` is written from **four** sites (lines 129, 152, 160, 178)
and any future read-after-write silently gets stale data. Curing C8 (make it a local `ref`, delete
the emit and the unbound parent model) removes the hazard entirely rather than leaving it primed.

---

## C9 — MINOR · Hover is modelled in JS because the scale rides an inline `transform`

`[p1]`

The file documents its own defect (lines 30-33, 255-261): the `hover:scale-110` utility was dead —
shadowed by the inline `transform` — so hover became reactive state: `hoveredId` +
`@pointerenter` + `@pointerleave` on **every** handle, a reactive tick and a component re-render
per hover, to reproduce CSS `:hover`. The transform and transition strings are re-authored per
instance on every render (edict 5 — style at the root, not per instance).

**Cure** — pass the per-stop *data* as custom properties and own the geometry in the scoped sheet;
this restores `:hover` and deletes `hoveredId`, `handleScale`, and two listeners per handle:

```html
:style="{ '--stop-pos': stop.position, '--stop-color': stop.cssColor }"
```
```css
.rail-handle { --handle-scale: 1;
  left: calc(var(--rail-inset) + (100% - 2 * var(--rail-inset)) * var(--stop-pos) / 100);
  transform: translate(-50%, -50%) scale(var(--handle-scale)); }
.rail-handle:hover          { --handle-scale: 1.1; }
.rail-handle[data-selected] { --handle-scale: 1.25; }
```

(The same move retires C13's second denominator: `--rail-inset` becomes the one number.)

---

## C14 — MINOR · No `e.button` guard: the bar's add gesture is armed by any pointer button

`[p2·NEW]` — source defect CONFIRMED; live consequence INCONSISTENT, labelled below.

`onBarPointerDown` (lines 85-89) and `onHandlePointerDown` (line 119) inspect `e.target` and
`e.clientX/Y` but never `e.button` / `e.buttons`. The add gesture is therefore armed by the
secondary and auxiliary buttons as well as the primary one:

```ts
function onBarPointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("[data-stop-id]")) return;
    pendingAdd = { x: e.clientX, y: e.clientY };   // ← any button, including 1 (middle) and 2 (right)
}
```

`pendingAdd` is disarmed only by `pointerup` or `pointerleave`, so it also **survives a context
menu**: a right-press that opens the native menu can leave the add armed until a later, unrelated
`pointerup` consumes it at whatever coordinates the pointer has drifted to.

**Live status — read this carefully.** In a *clean* Chromium state, neither a right-click nor a
middle-click on the bare rail minted a stop:

```
B1_RIGHT_click_bare_rail  = { before:["…0%","…100%"], after:["…0%","…100%"] }   ← no add
B2_MIDDLE_click_bare_rail = { before:["…0%","…100%"], after:["…0%","…100%"] }   ← no add
```

But in an earlier session where a right-press had preceded it, a middle-click **did** mint a stop
(2 handles → 3, the new one at 63 %). That is consistent with the stale-`pendingAdd` mechanism
above, and inconsistent with a simple "auxiliary buttons don't add" reading. I could not make it
reproduce on demand, so:

* **the missing `e.button` guard is a CONFIRMED source defect** (read it at line 85-89);
* **the "auxiliary click mints a stop" behaviour is a HYPOTHESIS**, observed once, not reproduced.

**Cure.** `if (e.button !== 0) return;` at the top of both pointerdown handlers, and disarm
`pendingAdd` on `pointercancel` and on `contextmenu` — the state machine should have exactly one
owner and no path that leaves it armed across gestures.

---

## C10 — INFO · Masking fallbacks, a dead inject, a no-op default, a lying guard

`[p1]`

* `var(--radius-pill, 9999px)` (line 318) and `var(--touch-target, 2.75rem)` (line 388) — both
  tokens resolve live (measured on `:root`), so the fallbacks are unreachable masking defaults
  (edict 2).
* `GradientPane.vue:8` — `const cssColorOpaque = inject(CSS_COLOR_KEY)!;` is never referenced in
  that file. Dead injection.
* `GradientStopEditor.vue:6` — `colorAt = undefined` is a no-op default on an already-optional prop.
* `getPosition` line 76 — `if (!barRef.value) return 0;` answers "position 0" to an unanswerable
  question. Every caller runs from a DOM event on the mounted rail; a guard that cannot fire but
  *would* silently warp a stop to 0 % if it did is worse than no guard.

**Edicts that PASS:** #8 `verbatimModuleSyntax` — the only type-only import (`GradientStop`,
line 4) is `import type`. #6 animations — none deleted; the `--spring-snappy` transition is
preserved and tokenized. #1 no god module — 393 lines, one job.

---

## Defect families (for the mega-tranche's wave grouping)

1. **No invariant owner for the ordered-stop model** — C1, C2. The model exposes primitive
   mutators (`updateStop`, a length-watcher) and hopes callers preserve sortedness and
   interval↔segment adjacency. Cure: one `setStopPosition` that sorts, and intervals hung off
   stop identity. These two must land together.
2. **Pointer geometry with no single source of truth** — C11, C13, C7. Three different mappings
   of "position along the rail" (border-box in `getPosition`, padding-box in `handleLeft`, full
   border-box in the paint), and no grab offset. Cure: one `--rail-inset` and one
   pointer→position function that both the JS and the stylesheet consume.
3. **Contracts documented but not wired** — C12, C3, C14, C11's unused dead-zone. In each case the
   file *says* what it does (the "fallback path", "the handle keeps focus", "the bar never moves a
   stop") and the code does something else. Cure: delete the prose, wire the behaviour, and let a
   test assert it.
4. **Gate vacuity** — C4. Nothing in the repo can observe families 1–3 failing.

---

## Checked and NOT found (negative results, so the next seat doesn't re-spend the probes)

* **Stuck drag after a context-menu remove** — hypothesised `draggingId` leak. Driven live: after
  removal the bar's cursor was `copy` (not `grabbing`) and the hover ghost was alive. The
  `pointerup` retargets to the bar once the handle is gone and `onBarPointerUp` clears it.
  Self-healing by accident, but real. `[p1]`
* **Duplicate terminal stops from an edge click** — driven live at `x+2` and `x+width−2`: no stop
  added, CSS byte-identical. The 24 px hit pseudo intercepts first (C6's dead-band, measured from
  the other side). `[p1]`
* **Rail box oscillation** (suspected from the e2e "element is not stable" failure) — sampled the
  rail + a handle over 90 consecutive rAF frames headed: `distinctBoxes: 1`,
  `consecutiveEqualPairs: 89`. Not a product oscillation. `[p1]`
* **`colorAtPosition` "No gradient interval contains N%" throw** — analytically unreachable even
  with a non-monotonic model: the `p <= stops[0].position` and `p >= last.position` shortcuts plus
  the ascending-pair scan cover the whole domain for every 3- and 4-stop permutation I enumerated.
  The C1 corruption produces *wrong colours* from that function, not a crash. `[p2]`
* **`ValueUnit` nesting, oklch→HSV `stableHue` drift, ungated rAF, WebGL boot** — none of these
  hazard classes touch this component: no `ValueUnit`, no HSV round-trip, no `requestAnimationFrame`,
  no canvas. All listeners are template-bound (removed with the element); nothing is registered on
  `window`/`document`, so there is no leak surface. `[p1·spot-checked-p2]`
* **`touch-action`** — handles compute `touch-action: auto`, but the spec intersects the hit
  element with its ancestors and the rail carries `touch-none`. Not a defect. `[p1]`
* **Console / page errors on the route** — `REPORT.json` shows `consoleErrors: []`,
  `pageErrors: []`, `failedRequests: []`, `overflowX: 0` in all four Safari matrices, and my own
  five live sessions raised zero `pageerror`s. The route is clean at rest; every defect above
  requires interaction. `[p2]`

## Out of scope for this seat, but observed and worth routing

`http://localhost:9000/#/gradient` **is not deep-linkable**: a cold load rewrites the hash to
`#/` (then `#/?color=%23abcdef`) and renders a 77-character body. That is an App/router defect,
not this component's, but it invalidates any audit recipe that cold-loads a route URL — including,
potentially, parts of the visual matrix. Route it to the App seat.

---

## Evidence files under this audit directory

* `evidence/parse-probe.ts`, `evidence/serialize-cost.ts` — pass-1 read-only node probes
  (`npx vite-node <path>`).
* `evidence/*.png`, `probe-crossed-stops.png`, `probe-oklch-empty-crash.png`,
  `rail-before-cross-drag.png`, `rail-after-cross-drag.png` — pass-1 captures.
* Pass-2 measurements are pasted inline above; they were produced by live Playwright driving and
  by `grep` / `node -e`, and wrote nothing to the tree.

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh`, or any `INBOX.md` was modified by this seat.
