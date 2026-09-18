# CHALLENGE-C · ROUND 2 — `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat, matching
the explicit declaration this seat was spawned with. **Declared, not inherited.**

---

## Filing note — why `-r2` and not the named path

The brief names `challenge-C-implementation.md`. That file already exists
(`Jul 27 19:06`, 37 010 bytes, 17 findings) from the round-1 Challenge-C seat, and the sibling seats
running concurrently today are using `-r2` / `-pass-1` suffixes
(`challenge-L-library-r2.md` `11:08`, `challenge-D-design-pass-1.md` `11:06`). Overwriting round 1
would destroy its record, so this round lands at **`challenge-C-implementation-r2.md`** and is
written to be read *alongside* round 1, not instead of it.

I audited independently before reading round 1, then diffed. This report is therefore **additive and
corrective**: it carries **two corrections that retire charges round 1 filed**, **six NEW findings**,
**one new measurement that bounds a round-1 charge**, and **independent re-derivation of the four
findings that matter most** with different evidence. I do not restate round 1's findings that I
merely agree with; I name them and move on.

**Verdict: DEFECTIVE** — unchanged. The BLOCKER stands, on independent evidence.

---

## Method

* Whole-file read of the subject (280 lines), `GradientPane.vue`, all three sibling editors, all four
  composables, `useSpecimenRows.ts`, `PaneSlot.vue`, `usePaneRouter.ts`, both unit suites, three e2e
  specs, `.github/workflows/ci.yml`, and the shipped `visual/REPORT.json` rows for `/#/gradient`
  (all four Safari matrices) plus `shots/safari-desktop-light/gradient.png`.
* **4 offline reproductions** via `vite-node` against the real composables and **8 live Playwright
  probes** against `http://localhost:9000`, all kept and re-runnable under `probes/`
  (`challenge-C-r2-*`). Four new screenshots under `evidence/challenge-C-r2-*`.
* Repo at branch `tranche-u`, **HEAD `80fc5c40`** — the branch advanced past the `c654824e` named in
  the brief; nothing in `demo/workbenches/gradient/` moved between them.
* Every number below is pasted from my own run.

---

# PART 1 — CORRECTIONS (charges round 1 filed that the evidence does not support)

## R2-C1 · RETIRE `C-8 (MAJOR)` — the Copy CSS control **has** an accessible name; there are **zero** nameless buttons in the pane

Round 1 filed `C-8 — MAJOR · The Copy CSS control has no accessible name — it is the route's one
nameless button (4.1.2)`. That is false. I asked **Chrome's own accessibility tree** through CDP
(`Accessibility.getPartialAXTree`, which implements accname including step F, the `title` fallback):

```
A) buttons in <main> with accessible name exactly 'Copy CSS': 1
B) CDP AX button: {"name":"Copy cubic-bezier(0, 0, 1, 1)","nameFrom":"attribute=aria-label","ignored":false}
B) CDP AX button: {"name":"Copy CSS","nameFrom":"attribute=title","ignored":false}
C) buttons inside <main> with EMPTY CDP accessible name: 0
   (no rows)
```

`<DockControl compact title="Copy CSS" @click="copyCSS">` (`GradientVisualizer.vue:254`) renders
`title="Copy CSS"` on the button, and accname resolves it. Playwright's role engine agrees
(`getByRole("button", { name: "Copy CSS", exact: true })` → 1, and my clipboard probe *clicks it by
that name* successfully).

**Where the REPORT's `namelessButtons: 1` actually comes from.** My own DOM sweep found exactly two
nameless-by-text buttons on the route and **both are outside `<main>`**:

```
E) a11y: {"nameless":[
   {"cls":"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover gap-1.5 text-mon…","w":86,"h":28,"inPane":false},
   {"cls":"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover dropdown-menu__t…","w":77,"h":28,"inPane":false}]}
```

Those are shell/dock capsules. The visual REPORT's probe counts a name from `aria-label`/text only —
it does not implement the `title` fallback — so its count is a **measurement artifact** with respect
to this component, and its attribution to the gradient pane is wrong.

**What survives, downgraded.** `title` is accname's source of *last resort*: it produces a name that
is invisible to a sighted keyboard user (no visible label, tooltip only, no `aria-label`), and some
AT configurations suppress `title`. So:

> **R2-C1 · MINOR (replaces C-8 MAJOR).** The Copy CSS control is named only by `title`.
> **Cure:** `aria-label="Copy CSS"` on the `DockControl` (keep `title` for the tooltip) — the exact
> pattern the sibling easing rows already use (`GradientEasingEditor.vue:181`,
> `:aria-label="… \`Copy ${row.css}\`"`, which the CDP tree resolves as
> `nameFrom: attribute=aria-label`).

## R2-C2 · RETIRE the WCAG-2.5.8 half of `C-7` and the REPORT's two 20×20 handle rows — the hit inflation **works**

The shipped REPORT flags the handles as small tap targets on **all four** Safari matrices:

```
"smallTapTargets": [ …, {"w":20,"h":20,"tag":"button","label":"Gradient stop at 0%"},
                        {"w":20,"h":20,"tag":"button","label":"Gradient stop at 100%"} ]
```

and round 1's C-7 charges `2.5.8` alongside the keyboard failure. I hit-tested the real target:

```
== P1 handle hit-test == {"box":{"w":20,"h":20},"center":"HANDLE","plus11":"HANDLE",
 "plus13":"gradient-rail relative h-10 select-none touch-none cursor-copy","plus11y":"HANDLE",
 "cs_before_w":"24px","cs_before_h":"24px","cs_before_pe":"auto","cs_before_content":"\"\""}
```

`elementFromPoint` at the handle centre **+11 px** returns the handle; at **+13 px** it returns the
rail. The `::before` expander (`GradientStopEditor.vue:374-391`) is computed `24px × 24px`,
`pointer-events: auto`, `content: ""` — a **real** 24×24 target on fine pointers, `44px` on coarse.
The REPORT measures `getBoundingClientRect()` on the button, which the absolutely-positioned pseudo
deliberately does not grow (that is the stated U-F76 "mount box is HELD" design).

> **R2-C2 · INFO.** WCAG 2.5.8 is **met** for the stop handles and the remove chip. The two REPORT
> rows are artifacts. Record this so the mega-tranche does not spend a wave chasing them. C-7's
> **keyboard** half stands (see R2-N7).

---

# PART 2 — NEW findings

## R2-N1 · MAJOR — a **cancelled** pointer gesture COMMITS the add

Not in round 1's 17. `onBarPointerUp` is bound to `@pointerup` **and** `@pointercancel`
(`GradientStopEditor.vue:207-208`) and it is the handler that emits `add` (`:101-110`):

```ts
function onBarPointerUp(e: PointerEvent) {
    if (pendingAdd) {
        const moved = Math.abs(e.clientX - pendingAdd.x) > 4 || Math.abs(e.clientY - pendingAdd.y) > 4;
        if (!moved) emit("add", getPosition(e));   // ← runs on pointercancel too
        pendingAdd = null;
    }
    draggingId.value = null;
}
```

`pointercancel` is the platform saying *the gesture was abandoned* — a second touch landing, a system
gesture, an OS interrupt. Committing on it is the inverse of the contract.

**Reproduction (live, confirmed; `probes/challenge-C-r2-pointercancel.mjs`).** Touch-enabled context,
`pointerdown` at 40 % of the rail then `pointercancel` at the same point, **no** `pointerup`:

```
A) handles at rest: 2
B) handles after pointerdown → POINTERCANCEL on the bar: 3
B) labels: ["Gradient stop at 0%","Gradient stop at 40%","Gradient stop at 100%"]
```

A stop is minted from a gesture the platform cancelled. On touch this is a two-finger-rest bug; the
rail is `touch-none`, so the user has no way to see it coming.

The same conflation exists on the handle (`:267-268`, `@pointercancel="onHandlePointerUp"`), where a
cancelled press runs the re-tap-to-deselect branch (`:151-153`) and silently drops the selection.

**Mechanism.** One handler serving two events with **opposite** semantics; the reuse reads tidy
("both end the gesture") and erases the only distinction that matters.

**Cure.** Split them. `onBarPointerCancel` clears `pendingAdd`/`draggingId` and commits nothing;
`onBarPointerUp` keeps the commit. Same split on the handle. This is the repo's own
`pointercancel`-recovery idiom (`ComponentSliders.vue`) used correctly — as *recovery*, not as
*commit*.

## R2-N2 · MINOR — every successful parse re-mints every stop id: full handle teardown + silent selection loss

Round 1's C-17.1 notes the two id counters as a *collision* risk. The larger, **certain** cost is
identity churn. Measured (`probes/challenge-C-r2-identity-churn.mjs`) — DOM nodes tagged, then one
arrow-key nudge (the `updateStop` path) and one successful parse (the `applyCSS` path):

```
B) handle node identity after an arrow-key nudge:   ["T0","T1","T2"]     ← stable
C) handle node identity after ONE successful parse: ["NEW","NEW","NEW"]  ← all rebuilt
C) stop ids before: ["stop-1-ms4sdf9g","stop-3-ms4sdiq0","stop-2-ms4sdf9g"]
C) stop ids after : ["stop-1-ms4sdlez","stop-2-ms4sdlez","stop-3-ms4sdlez"]
C) remove-chip after parse (selection survived?): 0     ← selection silently gone (was 1)
```

`applyCSS` installs stops with freshly-minted ids (`gradientParse.ts:252-257`), so `:key="stop.id"`
(`GradientStopEditor.vue:231`) destroys and rebuilds every handle on **each** debounced parse — every
500 ms while the user types — and `selectedStopId` becomes an id that no longer exists, so
`selectedStop` (`:67-69`) goes null and the remove chip vanishes with no signal. It also restarts the
handles' `--spring-snappy` transitions (`:263`) mid-flight.

Note the "before" row also documents the correct behaviour of the *other* path: ids
`stop-1 / stop-3 / stop-2` show `addStop`'s sort preserving identity.

**Cure.** `applyCSS` reconciles instead of replacing: a parsed stop whose `(cssColor, position)`
matches an existing stop keeps that stop's id. Then the rail keeps its DOM, the selection survives,
and the collision hazard shrinks to nothing because one minter serves one namespace.

## R2-N3 · MINOR — unconditional coalescing: **2115 bytes where 74 suffice** (28.6×) on the shipped default

Round 1's C-12 charges the *breadth* of the repaint (0.27–0.45 ms, 4.26 KB per tick). The
complementary charge is that most of that work is **unnecessary by construction**.
`sampleCoalescedStops` (`useGradientCSS.ts:175-216`) always emits ~32 sub-stops at IEEE-noise
precision, **including when every interval's easing is the identity** `cubic-bezier(0, 0, 1, 1)` —
which is the seeded default (`:53-62`) and the state the parser re-seeds after every successful parse
(`gradientParse.ts:295-298`). For identity easing the browser's own interpolation is *identical*, so
all 32 sub-stops are redundant. Measured at rest, on load, with no user edits
(`probes/challenge-C-r2-clipboard-divergence.mjs`):

```
EDITOR SHOWS  (len 74):   linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)
CLIPBOARD GOT (len 2115): linear-gradient(90deg, oklch(75% 0.15 145deg) 0.00%,
                          oklch(74.687500147402% 0.150937499558 148.749998231174deg) 3.13%, …
```

**28.6×**, recomputed for the rail *and* the tile *and* every clipboard copy, with 12 significant
decimals per channel — `74.687500147402%` is floating-point noise presented as authored CSS.

**Cure.** Two independent moves, both small: (a) when every interval is the identity easing, serialize
the raw stops — no coalescing; (b) round channels once, in `colorToCss`'s gradient consumer, to a
display-honest 4–6 significant figures. (a) also cures the round-trip fidelity of the default state.

## R2-N4 · MINOR — the "owned paint stack" material contract is copy-pasted into two components

`.gradient-rail` (`GradientStopEditor.vue:317-326`) and `.gradient-render-tile`
(`GradientVisualizer.vue:271-278`) carry the **identical** six-declaration recipe —
`background: <layer>, var(--alpha-checker)` / `background-origin: border-box` /
`background-clip: border-box` / `background-repeat: no-repeat, repeat` /
`background-size: 100% 100%, 16px 16px` / `box-shadow: var(--shadow-sm)`. The visualizer's own
comment concedes it: *"the rail's material contract, same shape"* (`:267-270`). A contract asserted
twice in two files is not a contract; the next edit to one is a silent divergence.

Per owner edicts 4 and 5 this is a glass-ui **primitive** (an alpha-honest surface that paints an
arbitrary layer over the checker ground), not two scoped blocks in demo components. **Cure:** relay
to the glass-ui BH inbox (standing formation invariant), consume one primitive from both call sites.

## R2-N5 · INFO — the C-1 crash is **not confined to the colour slot**: `calc()` kills it through the *position/angle* path too

Round 1 correctly names `parseCssColor` as C-1's throw. The blast radius is wider, which changes the
cure's shape. Full totality sweep (`probes/challenge-C-r2-parser-totality.ts`):

```
── parseCssColor(token) ──   *** THROWS TypeError: Cannot read properties of undefined (reading 'replace')
   oklch()  oklab()  lch()  lab()  rgb()  rgba()  hsl()  hsla()  hwb()
   color()  color-mix()  light-dark()  device-cmyk()  "oklch( )"
   ("oklch(" / "oklch(0.5" / "rgb(,)" → not-ok, correctly)
── parseCssScalar(token) ──  *** THROWS on  "calc()"
── parseGradientCSS end-to-end ──  THROWS for every one of the 7 gradient strings I tried
   linear-gradient(90deg, oklch(), blue) · linear-gradient(90deg, red, rgb()) ·
   radial-gradient(hsl(), blue) · conic-gradient(from 45deg, lab(), blue) · …
```

`parseCssScalar` is the oracle for **stop positions** (`gradientParse.ts:111-118`) and for the
**direction preamble** (`:96-108`). So `linear-gradient(90deg, red calc(), blue)` and
`linear-gradient(calc(), red, blue)` destroy the pane by the same mechanism, from tokens that are not
colours at all. A `try/catch` around `isColorToken` would leave two live doors open.

**Cure (reinforces C-1's).** The boundary must be `applyCSS` — the one place whose *type*
(`GradientParseResult`) already promises totality — not the three oracle call sites.
Independent confirmation of the live blast radius, from a clean load
(`evidence/challenge-C-r2-pane-destroyed-oklch.png`):

```
BEFORE: {"textboxes":1,"handles":2,"easingHeads":1,"tile":true}
AFTER oklch(): {"textboxes":0,"handles":0,"easingHeads":0,"tile":false,"verdict":null,
 "bodyText":"… This panel hit an unexpected error.\n\nCannot read properties of undefined (reading 'replace')\n\nTry again"}
```

`"verdict": null` is the sharpest detail: the rejection surface the whole model-or-reject design
exists to feed **never fires**.

## R2-N6 · INFO — two silent-drop / misleading-reason cases in the parser's own doctrine

`gradientParse.ts:175-176` states *"Silent-drop is forbidden (P2-17) → explicit reject."* Two inputs
violate it:

```
linear-gradient(90deg, red -50%, blue 300%)  → OK dir=90 stops=red@0,blue@100      ← silently clamped
linear-gradient(in oklch, red, blue)         → reject: unparseable color "in"       ← misleading
```

The clamp is `:281-283`. The second is spec-valid CSS Color 4 (`<color-interpolation-method>`) and
the model *has* an interpolation space — it simply is not wired to the gradient's own `in <space>`
syntax, so the user gets a reason that blames a keyword for being a bad colour.

## R2-N7 · brief re-derivations (independent evidence for round 1's core, no new charge)

| Round 1 | My independent evidence |
|---|---|
| **C-6** drag drops the ordering invariant | Labels `["…0%","…87%","…67%","…100%"]`; handle left offsets `[225, 607, 520, 665]` (**607 > 520**, visually crossed); `--rail-ramp` **34 sub-stop positions, 11 descending, max backward jump 1.86 %** (`…87.4, 85.55, …, 68.85, 67, 70…`); the render tile has the same 11; feeding the live editor string back → `REJECT: stop positions must be non-decreasing`, the exact rejection `test/gradient-parse.test.ts:141-147` asserts as *correct*. Screenshot `evidence/challenge-C-r2-rail-crossed-drag.png` shows the hard-stop band and the crossed handles against `…-rail-at-rest.png`. |
| **C-5 / C-16** interval re-hosting + transiently illegal model | `R4`: authored `cubic-bezier(0.9, 0, 0.1, 1)` on interval **2**, remove stop **0** → `intervals after: ['cubic-bezier(0, 0, 1, 1)','cubic-bezier(0, 0, 1, 1)']` — the authored curve is **gone** (tail truncation for a head removal). `R1`: `setStopsFromColors(5)` → `stops: 5 intervals: 1`, and a synchronous `coalescedCSS` read `THROW: Gradient interval 1 is missing`. In-app crash path = *hypothesis* (`seedFromPalette` and `copyCSS` are separate dock handlers, `usePaneRouter.ts:209-210`); the tear is *confirmed*. |
| **C-7** keyboard | `{"barTag":"DIV","barRole":null,"barTabindex":null,"barAriaLabel":null,"focusableInBar":["Gradient stop at 0%","…87%","…67%","…100%"]}` — no role, no name, no tabindex, and `onHandleKeydown` (`:173-187`) offers nudge/delete/deselect but **no insert**. WCAG 2.1.1 on the primary authoring action. (The 2.5.8 half is retired — R2-C2.) |
| **C-9** direction dead for radial | `RADIAL direction: 90 → 135 \| tile changed? false` — slider operable, readout follows, tile string byte-identical. Screenshot `evidence/challenge-C-r2-radial-dead-direction.png`. The repo's own doctrine already condemns the shape: `useGradientCSS.ts:38-41` killed the `resolution` ref as *"a dead affordance state."* |
| **C-11** vacuous gate | `grep -rn "gradient-ruler-cap\|gradient-rung\|Perceived-space plate" demo/ src/` → **no output**; deleted at `a68ecdc1` (2026-07-17) with `PerceivedSpacePlate.vue` / `envelopePlatePaint.ts` / `usePerceivedRamp.ts`, while `e2e/smoke/views/gradient.spec.ts:56-61,110-113`, `o21-gradient-rail.spec.ts:129-175`, `o19-netting-luma.spec.ts:51` and `o7-card-census.spec.ts:182` still assert them. `grep -n "e2e\|playwright\|smoke" .github/workflows/ci.yml` → **no output**. Meanwhile `npx vitest run test/gradient-parse.test.ts test/gradient-v4-consume.test.ts` → **22 passed**. |
| **C-2** copy divergence | 74 shown vs **2115** copied (round 1 measured 1363 in a different model state), `IDENTICAL? false`, `visible 'copied' confirmation: null`. |
| **C-15** live region | `{"ariaInvalid":"true","ariaDescribedby":null,"ariaErrormessage":null,"ariaMultiline":null,"verdictId":null,"verdictRole":"status"}` — and the missing `aria-describedby`/`aria-errormessage` is the sharper charge: the user hears *invalid* and never hears *why* (WCAG 3.3.1). |
| **C-17.2 / C-17.3** casts, uncancelled debounce | Confirmed, plus the aggravator round 1 did not have: panes are **`KeepAlive`d** (`demo/shell/PaneSlot.vue:120-127`), so a pending 500 ms parse fires into a *cached, deactivated* tree and mutates the model the user walked away from. `demo/shared/utils.ts:36-42` provides `.cancel()`; `GradientCodeEditor.vue:55-57` never wires it. |

---

# PART 3 — NEGATIVE PROOFS this round adds

* **The `No gradient interval contains ${position}%` throw (`GradientVisualizer.vue:87`) is
  unreachable.** Brute-forced the full 4-stop position grid — 11⁴ states × 201 hover positions:
  `no throw found over 4-stop grid`. The two terminal guards at `:67-69` happen to close the gap. It
  is dead code today, but it is a loaded gun aimed at `ghostColor`
  (`GradientStopEditor.vue:71-73`) — a *computed*, i.e. a render-time throw, i.e. C-1's blast radius.
  Round 1's C-6 asserts the add-ghost "lies"; I confirm the wrong-colour half and record that it does
  **not** throw.
* **No perf defect on drag; the double dispatch is batched.** A handle `pointermove` bubbles to the
  rail, whose fallback branch re-emits `update:position` for the same drag
  (`GradientStopEditor.vue:91-99` vs `:136-146`) — real redundancy, but Vue coalesces:
  **12 pointermoves → 12 rail style mutations**, and a 60-step drag measured
  **p50 8.3 ms · p95 9.4 ms · max 32.8 ms** (n = 99 rAF deltas). File it as redundancy (delete the
  rail's fallback branch; the handle owns pointer capture), **not** as performance. This bounds
  C-12: the per-tick cost is real but sub-frame.
* **Zero console errors, zero page errors** on the shipped `/#/gradient` capture in all four Safari
  matrices (`"consoleErrors":[],"pageErrors":[],"failedRequests":[]`), `overflowX: 0`, `main: 1`,
  `imgNoAlt: 0`; and zero in my own live sessions apart from the known `VITE_API_URL`
  dev-misconfiguration warning.
* **The direction slider's 0-px thumb is not a defect.** Measured
  `{"cls":"slider-thumb glass-specular-track","w":"0px","h":"20px","opacity":"0"}` — glass-ui 7's
  `standard` variant deliberately makes the fill edge the affordance. It is keyboard-operable
  (`aria-valuenow` 90 → 135 under 45 ArrowRights) and the root handles pointer drags. I looked for a
  defect here and there isn't one.
* **`verbatimModuleSyntax` clean** in the subject (`:22, 25, 26, 28` all `import type`) and in all
  four composables.

---

## Ranked summary (this round only)

| # | Severity | Finding | Status vs round 1 |
|---|---|---|---|
| R2-N1 | **MAJOR** | `pointercancel` on the rail COMMITS the add | **NEW** |
| R2-N5 | INFO→feeds BLOCKER | C-1's blast radius includes the position/angle path (`calc()`), 14 crashing tokens enumerated | **NEW** (widens C-1's cure) |
| R2-N2 | MINOR | every parse re-mints all ids → full handle teardown + silent selection loss | **NEW** |
| R2-N3 | MINOR | unconditional coalescing — 2115 vs 74 bytes (28.6×) + 12-decimal channel noise | **NEW** |
| R2-N4 | MINOR | the paint-stack material contract is copy-pasted across two components | **NEW** |
| R2-N6 | INFO | `-50%/300%` silently clamped (violates the module's own P2-17); `in oklch` misleading reason | **NEW** |
| R2-C1 | MINOR | Copy CSS is named by `title` only — **not** nameless | **RETIRES C-8 (MAJOR)** |
| R2-C2 | INFO | handle hit inflation works; 2.5.8 met; REPORT's 20×20 rows are artifacts | **RETIRES C-7's 2.5.8 half** |
| — | INFO | `colorAtPosition`'s third throw is unreachable (11⁴ proof) | **bounds C-6** |
| — | INFO | drag is sub-frame: p50 8.3 / p95 9.4 / max 32.8 ms; double dispatch is batched | **bounds C-12** |

## Strongest defect (unchanged, independently re-derived)

**C-1 / R2-N5** — an empty-argument CSS function typed into the Gradient CSS editor destroys the
entire gradient pane and every unsaved stop, position, easing curve and setting, because the
component consumes a **partial** parser at a **total** contract and its declared model-or-reject
boundary is not total. The shipped default editor content is two `oklch(...)` calls; deleting the
numbers inside either one is the gesture. Round 2 adds that the same crash comes through the
**position and angle** oracles as well (`calc()`), so the cure belongs at `applyCSS` — the one
signature that already promises totality — and, upstream, in making
`parseCssColor` / `parseCssScalar` total, which is the V·π mini-tranche's whole purpose.
