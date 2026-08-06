claude-opus-5[1m]

# CHALLENGE — `SpringHeatmap.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringHeatmap.vue` (338 lines)
**Read whole, plus every import:** `./springKeys` (11L) → `./useSpringDemo` (499L), `@mkbabb/glass-ui/dark`
(`node_modules/@mkbabb/glass-ui/dist/composables/dark/useGlobalDark.d.ts` + the `dark-z_P5QwqI.js` chunk),
`@mkbabb/value.js/math`, `@vueuse/core` `useResizeObserver`. Plus the sole consumer
`./SpringPhysicsFacet.vue` (242L) and its host `./SpringScene.vue`, and the token cascade the component
reads at runtime (`demo/styles/style.css`, `node_modules/@mkbabb/glass-ui/dist/styles/tokens/*.css`).

**Posture** DEFECTIVE until the tree proves otherwise. No browser was used (law). Claims that require a
live paint are marked `UNPROVEN-NEEDS-LIVE` and handed to SS-13; everything else is source- or
computation-derived and carries its falsifier.

**Tally** 20 defects (2 BLOCKER · 7 MAJOR · 7 MINOR · 4 INFO) · 6 superlatives.

---

## 0. What the component actually is

A 338-line SFC that paints a 20×20 canvas field, tints it by the closed-form damped-oscillator peak
overshoot `exp(-ζπ/√(1-ζ²))`, overlays one marker, and writes `demo.response` / `demo.dampingFraction`
on click or arrow key. It instantiates **no** `SpringProgress`, owns **no** rAF, registers **no** raw
observer. Its entire reactive surface is two refs read and two refs written.

It touches exactly two members of its prop (`grep -n "demo\." SpringHeatmap.vue` → `:19 :20 :185 :188
:225 :226 :238 :239 :259 :261 :282`, all `response` / `dampingFraction`).

---

## 1. BLOCKERS

### B-1 — `@mkbabb/glass-ui/dark` is a phantom dependency; this line is where it bites (BLOCKER)

`SpringHeatmap.vue:60`

```ts
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

`@mkbabb/glass-ui` is absent from BOTH `package.json` (only `"@mkbabb/value.js": "4.0.0"` under
`@mkbabb`) and `package-lock.json` (`grep -n "node_modules/@mkbabb" package-lock.json` → one hit,
line 611, value.js). 7.0.0 sits installed in `node_modules` as a real directory from a `Jul 16 05:17`
install that predates the declaration's removal.

This is **F-1** of the megatranche census
(`formation/keyframes/lane-frontend.md:15,54,612` — "`npm ci` is currently broken … Nothing below is
reproducible until this lands"). I fold it, and I sharpen it onto this file: the census counts
SpringHeatmap only as a row in the shadow inventory (`lane-frontend.md:237` — "`338 | spring/SpringHeatmap.vue
| G | parameter heatmap — useGlobalDark`"). It is more than a row. `:60` is a **bare, non-type-only,
runtime** import; there is no alias for it in `vite.config.ts` (the only glass-ui mentions there are the
self-alias commentary at `:29,:33,:65,:79,:262` — a *keyframes.js* dedupe, not a glass-ui resolution),
and `tsconfig.lib.json:8-9` deliberately excludes glass-ui from the library typecheck. So on a clean
`npm ci` checkout this module fails to resolve at build **and** at dev, and it does so with no fallback
path — the component has no non-glass dark-mode source.

**Severity rationale.** BLOCKER not because the code is wrong but because the file is unbuildable from
the committed manifest. Every other finding below is unreachable until this lands.

**Falsifier.** Any of: (a) `@mkbabb/glass-ui` appearing in `package.json` dependencies/devDependencies/
peerDependencies; (b) a `resolve.alias` entry for `@mkbabb/glass-ui` in `vite.config.ts`; (c) a
workspace/file: link or `.npmrc` scope registry that makes `npm ci` reconstruct it. I checked all three
— none exist. `.npmrc` is a single `legacy-peer-deps=true` line (per `lane-frontend.md:54` §F-1), which
absorbs peer drift silently and does not supply the package.

---

### B-2 — the dark→light theme flip paints the canvas with the **dark** surface colour and leaves it there (BLOCKER)

`SpringHeatmap.vue:269-270`

```ts
const { isDark } = useGlobalDark();
watch(isDark, () => paint());
```

This is a **default `flush: "pre"`** watcher. The `.dark` class that carries the dark token arm is
applied by vueuse's `useColorMode` in a **`flush: "post"`** watcher:

```
node_modules/@vueuse/core/dist/index.js @ byte 67064
    function onChanged(mode) { … defaultOnChanged(mode); }
    watch(state, onChanged, { flush: "post", immediate: true });
```

(`defaultOnChanged` → `updateHTMLAttrs` → the `<html>` class toggle. `useDark` is `useColorMode`
specialised; glass-ui's `useGlobalDark` returns that exact ref — `dist/composables/dark/useGlobalDark.d.ts`:
"Reactive dark-mode flag (vueuse `useDark` ref — writable)".)

Vue's scheduler drains the main (pre) queue **before** `pendingPostFlushCbs`, unconditionally. So on a
toggle the order is: `isDark` flips → `paint()` runs and calls `getComputedStyle(field)` → **the class
has not moved yet** → the tokens read are the *outgoing* theme's → `.dark` is then applied.

The consequence is asymmetric, and the dark→light direction is fatal:

| token | light DOM (`:root` only) | dark DOM (`.dark`) | source |
|---|---|---|---|
| `--neutral-0` | `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))` | `hsl(24 9% 4%)` | `tokens/light-dark.css:1` (in `@supports`), overridden by `tokens/dark-arm.css:1` |
| `--background` | `var(--neutral-0)` | ← same declaration | `tokens/color-radius.css:1` |

**dark → light:** paint runs while `.dark` is still on `<html>`, so `resolveSurface()` (`:122-125`)
returns the **literal, non-switching** `hsl(24 9% 4%)`. That value is theme-blind — no `light-dark()`,
no `color-scheme` escape hatch. The canvas is a rasterised bitmap; nothing re-resolves it afterwards.
**The field stays near-black in light mode until the next `ResizeObserver` fire.** There is no other
repaint trigger: `onMounted` (`:272-274`) has run, `useResizeObserver` (`:267`) only fires on geometry
change, and the param watch (`:281-286`) is empty by design.

light → dark escapes only by accident: the outgoing `--background` is `light-dark(…)`, and glass-ui's
own `documentElement.style.colorScheme` writer is itself a *pre*-flush watcher registered when the
`createGlobalState` singleton is first constructed (`dist/dark-z_P5QwqI.js`:
`n(e,(e)=>{document.documentElement.style.colorScheme = e?"dark":"light"},{immediate:!0})`), so it
plausibly runs before this component's watcher and the `light-dark()` resolves to the incoming arm.
That accident does not exist in the other direction, because the `.dark` arm hard-codes the hsl.

**glass-ui ships the exact cure and this component declines it.** `useGlobalDark` returns
`onFlipSettled` (`useGlobalDark.d.ts`), documented verbatim as: *"the post-flip SETTLE hook … The class
toggle is synchronous (chrome flips instantly); the batch drains one frame later via a single
`requestAnimationFrame`"* — built for "N expensive re-theme operations". `installDarkModeSync` is the
same thing packaged (`watch(isDark, () => nextTick(() => requestAnimationFrame(cb)))`). The correct
line is `onFlipSettled(() => paint())`, or at minimum `{ flush: "post" }`. This is an
**engine-consumption idiom misuse against a library that names the hazard in its own type docs.**

**I contradict the R corpus here.** `docs/tranches/R/waves/R.W6.md:106-113` and
`R/audit/gestalt-demo.md:284` prescribed exactly this shape — *"excise the MutationObserver entirely for
`const { isDark } = useGlobalDark(); watch(isDark, paint)`"* — and `demo-brittleness.md:79-81` graded the
prior raw `MutationObserver` on the `<html>` class HIGH. The MutationObserver was crude and over-broad,
but it was **correct for this job**: a class mutation record is delivered *after* the class lands. R.W6
traded a working mechanism for an idiomatic broken one, and the gate that certified it
(`proof:brittleness`, `R.W6.md:536-537`) greps for `new MutationObserver` — it can only see the
mechanism, never the timing.

**Falsifier.** Any of: (a) Vue draining post-flush callbacks before pre-flush jobs in the same tick;
(b) `useDark`/`useColorMode` applying the class synchronously inside the ref setter rather than in the
`flush:"post"` watcher at index 67064; (c) `.dark` not overriding `--neutral-0` (i.e. `--background`
resolving to a self-switching `light-dark()` in **both** DOM states, which would make class timing
irrelevant for the surface). I verified (b) and (c) directly against the installed bytes; (a) is Vue's
documented scheduler contract.
**Live confirmation (SS-13, cheap):** open the spring scene in dark, toggle to light, do not resize —
the heatmap field remains dark against a light panel. Resizing the window cures it. That asymmetry
(cured by resize, not by re-toggling) is the signature.

---

## 2. MAJOR

### M-1 — arrow-key navigation is **not reversible**: Right-then-Left lands somewhere else for 84 of 111 reachable values (MAJOR)

`SpringHeatmap.vue:235-263`. The step is the true cell width, but the write is re-quantised to the
slider's 0.01 grid:

```ts
const stepR = (RESPONSE_MAX - RESPONSE_MIN) / COLS;   // 0.055   (:236)
const stepD = (DAMPING_MAX  - DAMPING_MIN)  / ROWS;   // 0.065   (:237)
…
demo.response.value        = Math.round(clamp(r, RESPONSE_MIN, RESPONSE_MAX) * 100) / 100;   // :259-260
demo.dampingFraction.value = Math.round(clamp(d, DAMPING_MIN,  DAMPING_MAX)  * 100) / 100;   // :261-262
```

Both steps are **half-hundredths**, so `Math.round` (round-half-**up**, even for negatives:
`Math.round(-44.5) === -44`) breaks symmetry:

* `V + 5.5 → V + 6` but `V − 5.5 → V − 5` → **ArrowRight is +0.06, ArrowLeft is −0.05.**
* `V + 6.5 → V + 7` but `V − 6.5 → V − 6` → **ArrowUp is +0.07, ArrowDown is −0.06.**

Measured over the entire reachable grid (executed, not asserted):

```
response  right-then-left ≠ identity for  84 of 111 grid values;  e.g. 0.10 → 0.16 → 0.11
damping   up-then-down    ≠ identity for  95 of 131 grid values;  e.g. 0.20 → 0.27 → 0.21
ArrowRight from 0.50: 0.50 0.55 0.61 0.67 0.73 0.78 0.84   (steps 0.05,0.06,0.06,0.06,0.05,0.06)
ArrowUp    from 0.86: 0.86 0.93 1.00 1.07 1.14 1.20 1.26   (steps 0.07,0.07,0.07,0.07,0.06,0.06)
```

Two independent contract breaks fall out:

1. **The comment at `:234` — "step the live params by one cell per arrow press" — is false.** A press
   moves 0.91 or 1.09 cells (response) / 0.92 or 1.08 cells (damping). The two navigation modes ride
   *incommensurable lattices*: `navigateFromPointer` (`:218-226`) snaps to cell **centres**, arrows walk
   a 0.01 lattice. After one arrow press the marker never sits on a cell centre again until the next
   click, which falsifies `:222-224` ("the marker lands on the cell center").
2. **Every press is a lossy write to shared scene state.** `useSpringDemo.ts:341`
   (`watch([response, dampingFraction], rebuildLiveSpring)`) disposes and reconstructs the live
   `SpringProgress` and re-samples the `springTimingFunction` (`:321-339`). A user nudging right then
   back left has silently moved the spring and paid two full rebuilds to get there.

The fix is one line — quantise to the **cell** lattice, not the slider lattice
(`col = Math.round((r - RESPONSE_MIN) / (RESPONSE_MAX - RESPONSE_MIN) * COLS - 0.5)`, then re-derive the
centre exactly as `:218-221` already does) — which also unifies the two input modes onto one lattice
and makes M-1 and the click path share a single helper.

**Falsifier.** If `Math.round` rounded half-to-even, or if `stepR`/`stepD` were integer multiples of
0.01, or if the write re-snapped to the cell lattice, the round trip would be exact. None holds; the
numbers above are from executing the exact expressions at `:236-237` and `:259-262`.

---

### M-2 — the declared `--ball-tone` seam is **out of scope** at `.spring-heatmap`; the "rides the scene tone" claim is false in both the JS and the CSS (MAJOR)

`SpringHeatmap.vue:114-121` and `:291-293`, `:323`, `:325-326`.

```ts
function resolveTone(el: HTMLElement): string {
    const cs = getComputedStyle(el);
    return (
        cs.getPropertyValue("--ball-tone").trim() ||          // :117
        cs.getPropertyValue("--color-progress").trim() ||     // :118
        "hsl(142 71% 45%)"                                    // :119
    );
}
```

`--ball-tone` has exactly three definition sites in the whole demo
(`grep -rn -- "--ball-tone\s*:" demo/`):

```
demo/scenes/easing/EasingTarget.css:7    .easing-target  { --ball-tone: var(--color-progress); }
demo/scenes/sequence/SequenceTarget.css:8 .sequence-target{ --ball-tone: var(--color-progress); }
demo/scenes/spring/SpringTarget.vue:278   .spring-target  { --ball-tone: var(--color-progress); }   (<style scoped>, :271)
```

`.spring-target` lives in `SpringTarget.vue`, mounted at `SpringScene.vue:10` as a **sibling** of the
control surface. `SpringHeatmap` is mounted at `SpringPhysicsFacet.vue:58`, inside a `Card` produced by
`SpringScene.vue:67` (`const tabsContent = () => h(SpringPhysicsFacet, { demo })`) and rendered into the
shell's controls pane. `.spring-target` is **never** an ancestor of `.spring-heatmap`. Custom properties
inherit down the DOM tree only.

Therefore, in every reachable state:

* `:117` returns `""` — a dead read on every paint, once per row-loop entry (`:152`);
* `:323` `background: var(--ball-tone, var(--color-progress))` always takes the fallback;
* `:325-326` the two `color-mix` glows likewise;
* the CSS comment at `:291-293` — *"The field rides the scene's `--ball-tone` seam (inherited from
  `.spring-target` → `--color-progress`)"* — and the JS comment at `:109-113` are both **false**.

**I contradict U lane-25.** `docs/tranches/U/audit/lane-25-design-demo-coherence.md:36-45` grades this
site favourably: *"SpringHeatmap's last-resort fallback AFTER two token reads (SpringHeatmap.vue:113–120
— the comment explicitly rides `--ball-tone`/`--color-progress`)"*. The lane trusted the comment. There
are not two token reads; there is one live read and one structurally-empty read, and the third arm is a
stale literal (see m-4). The practical damage is drift-silence: if anyone re-tints `.spring-target`'s
`--ball-tone`, every other spring instrument follows and the heatmap does not — with a comment in the
file asserting the opposite.

**Falsifier.** Any `--ball-tone` declaration on an ancestor of `.spring-heatmap` — `:root`, `.dark`,
`.spring-pane`, `design-idioms.css`, the glass-ui `Card`, or a Tailwind arbitrary property in
`SpringPhysicsFacet.vue`'s class strings. I grepped all definition sites across `demo/` and the glass-ui
`dist/styles/` bundle; there are three, all on `*-target` classes.

---

### M-3 — `fillStyle` composes `color-mix()` over an **unresolved `light-dark()`** token, with zero validation of a silently-ignorable assignment (MAJOR; render outcome UNPROVEN-NEEDS-LIVE)

`SpringHeatmap.vue:170`

```ts
ctx.fillStyle = `color-mix(in oklab, ${tone} ${mix}%, ${surface})`;
```

What `tone` actually is, traced through the cascade:

```
demo/styles/style.css:163   --color-progress: var(--accent-kf);
demo/styles/style.css:130   --accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305));
demo/styles/style.css:181-190  .dark { … }   ← does NOT redeclare --accent-kf (comment :183-185 says so explicitly)
```

Neither `--color-progress` nor `--accent-kf` nor `--background` is `@property`-registered
(`tokens/property-regs.css` registers 22 properties; none of these). For an **unregistered** custom
property the computed value is the token stream after `var()` substitution only — `light-dark()` is
*not* resolved. So `getPropertyValue("--color-progress")` returns the literal string
`light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`, **byte-identical in both themes**, and the
assembled `fillStyle` in light mode is:

```
color-mix(in oklab, light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305)) 59%,
                    light-dark(hsl(40 30% 98%), hsl(24 9% 4%)))
```

Two consequences, and **exactly one of them must be true** — the code is written as if neither is:

* **If canvas 2D resolves `light-dark()`** (against the canvas element's `color-scheme`), then the tone
  string never changes with the theme and the theme repaint at `:270` is **dead weight for the tone**;
  only `--background` differs, and only because of the `.dark` class override — which is precisely the
  path B-2 breaks.
* **If it does not**, the whole `color-mix()` is invalid, and per the HTML canvas spec an invalid
  `fillStyle` assignment is a **silent no-op**. After `canvas.width = …` at `:148-149` the context is
  reset to its default `#000` opaque black. Every `fillRect` in the 400-iteration loop would then paint
  black. **The entire field renders as a solid black rectangle, with no throw, no console warning, and
  no visible difference from "the tokens happen to be very dark".**

The certain, browser-independent defect is the **error posture**: there is no read-back check
(`ctx.fillStyle = s; if (ctx.fillStyle !== expected) …` — canvas normalises and round-trips the
serialised colour, so a rejected assignment is trivially detectable), no `CSS.supports("color",
tone)` probe, no last-resort concrete-colour path that does not depend on two Baseline-recent colour
functions composed together. The `"hsl(142 71% 45%)"` arm at `:119` is unreachable (M-2/m-4) and would
not help anyway — the `color-mix()` wrapper is applied unconditionally.

The idiomatic resolution is one hop away and already implied by the file's own design: read a
**resolved** colour rather than a raw token — e.g. `getComputedStyle(el).color` on a probe styled
`color: var(--color-progress)`, which the engine resolves fully (including `light-dark()`) to an
`rgb()`/`oklch()` the canvas will always accept. Register the tokens with `@property { syntax:
"<color>" }` and the same becomes true of `getPropertyValue` directly.

**Falsifier.** (a) `--accent-kf` or `--color-progress` being `@property`-registered as `<color>` (then
`getPropertyValue` returns a resolved colour and the whole finding dies) — grepped
`tokens/property-regs.css` and `demo/styles/*.css`, neither is; (b) a `.dark`-arm redeclaration of
`--accent-kf` to a non-`light-dark()` value — `style.css:181-190` explicitly declines; (c) the render
half only: a live screenshot showing a tinted (not black, not flat) field in **light** mode proves the
`light-dark()` branch resolves. Hand that one observation to SS-13; it decides which branch of the
disjunction is live but does not rescue the missing validation.

---

### M-4 — the "20×20 parameter-space landscape" carries 12 distinct values in 20 horizontal bands, 9 of which are pixel-identical to the background (MAJOR)

`SpringHeatmap.vue:158-179`. The tint depends on `row` alone — the file says so itself at `:95-97`
("the heatmap's overshoot tint varies ONLY with the damping (y) axis"). Evaluating the exact expressions
at `:163-164` and `:169`:

| row | ζ | overshoot | `mix` % |
|---:|---:|---:|---:|
| 0–7 | 1.4675 … 1.0125 | 0 (ζ ≥ 1) | **0** |
| 8 | 0.9475 | 9.06e-5 | **0** (rounds away) |
| 9 | 0.8825 | 2.75e-3 | 2 |
| 10–13 | 0.8175 … 0.6225 | 1.16e-2 … 8.22e-2 | 4, 8, 12, 17 |
| 14–18 | 0.5575 … 0.2975 | 1.21e-1 … 3.76e-1 | 23, 29, 35, 43, 50 |
| 19 | 0.2325 | 4.72e-1 | **59** (the maximum) |

So: **9 of 20 rows (45% of the field) fill with `color-mix(… 0%, surface)` — exactly `--background`,
which `:298` also paints as the field's own background.** They are not a "faint wash"; they are
invisible. The remaining 11 rows carry 11 distinct percentages topping out at 59%, so the accent never
"saturates" as `:117-119` claims. And `useSpringDemo.ts:84` seeds `dampingFraction = 0.86` — the default
marker sits in the **2%** band, i.e. on a cell the user cannot distinguish from the empty half of the
field.

This falsifies the stated rationale at `:167-169`: *"A gentle gamma lifts the low end so the underdamped
band reads as a legible gradient rather than collapsing to near-surface."* `Math.pow(os, 0.7)` does lift
(0.0028 → 0.016), but the subsequent `Math.round(… * 100)` quantises to integer percent and rows 0–8
still collapse **exactly** to the surface.

Two mechanical consequences ride along:

* The inner `for (col …)` loop at `:171-178` issues **400 `fillRect` calls to paint 20 solid bands.**
  `fillStyle` is set once per row, outside the loop (`:170`) — every rect in a row is the same colour, so
  a single `ctx.fillRect(0, y, cssW, cellH)` per row is exactly equivalent. 380 of the 400 calls are
  redundant, along with the `Math.floor`/`Math.ceil` seam arithmetic that exists only to hide the joins
  between identically-coloured rectangles.
* The headline bench claim inherits the same problem: "507× faster than 400 live instances" (`:8`, `:98`)
  benchmarks against a strawman that is itself 20× larger than the honest work.

I am not claiming the *choice* of overshoot is wrong — it is exact and cheap (see S-2). I am claiming the
component ships a 2-D affordance over a 1-D signal, that the affordance's x-axis is documented as
informationless in its own docstring, and that nearly half its y-axis is a null region. If the second
channel that `docs/tranches/P/waves/P.W6.md:92` already reserved ("Settle-time is available as a free
second channel") rode the x-axis, the surface would carry what its shape promises.

**Falsifier.** Any `col`-dependence in the tint (there is none: `zeta` at `:163` uses `row` only, and
`ctx.fillStyle` is assigned once per row at `:170` before the col loop). Or a `mix` value > 59 or a
non-zero mix in rows 0–8 — the table above is the executed output of the exact source expressions.

---

### M-5 — the field's entire coordinate system is four bare literals duplicated across two files, guarded by a comment that names a **deleted** component (MAJOR)

`SpringHeatmap.vue:68-73`

```ts
// ── The parameter ranges — IDENTICAL to the SpringSidebar sliders' min/max so a
// click on the field is the same coordinate space the sliders write (U5). ──────
const RESPONSE_MIN = 0.1;   const RESPONSE_MAX = 1.2;
const DAMPING_MIN  = 0.2;   const DAMPING_MAX  = 1.5;
```

The values they must match live as literals in the template of the parent:

```
SpringPhysicsFacet.vue:32-34   :min="0.1"  :max="1.2"  :step="0.01"
SpringPhysicsFacet.vue:42-44   :min="0.2"  :max="1.5"  :step="0.01"
```

`SpringSidebar.vue` **does not exist** — `SpringPhysicsFacet.vue:2-20` is a header describing its
dissolution ("the bespoke 313L sidebar monolith … DISSOLVED"), and `ls demo/scenes/spring/` confirms it
is gone. So the invariant's only documentation points at a file the tranche deleted.

The coupling is total and silent: change the slider `:max` and the heatmap's click→param mapping, its
marker projection (`:184-189`), its arrow steps (`:236-237`), its `aspect-ratio: 11 / 13` "true scale"
(`:295`) and its cell-width constants (`:82-83`) all mis-map at once, with no type error and no test.
The `0.01` step is duplicated a fifth and sixth time as the magic `* 100 / 100` idiom at `:225`, `:226`,
`:260`, `:262`.

There is an obvious home: `springPresets.ts` already sits beside both files and already owns the scene's
canonical parameter data. One exported `SPRING_PARAM_RANGE` consumed by both the sliders and the field
removes six literals and the drift.

**Falsifier.** A shared constant module exporting these bounds, or a runtime assertion tying the two.
`grep -rn "RESPONSE_MAX\|DAMPING_MAX" demo/` returns hits in `SpringHeatmap.vue` only; the sliders carry
raw literals.

---

### M-6 — the `507×` bench cited three times is still backed by a deleted `/tmp` script (MAJOR)

`SpringHeatmap.vue:8-9`, `:98`, and `SpringPhysicsFacet.vue:53` all assert *"BENCHED at 507× faster than
400 live instances (`spring-heatmap-probe`, 2026-06-22: 0.002 ms vs 1.04 ms/mount)"*.

The keyframes.js Q-tranche already ruled on this
(`docs/tranches/Q/audit/AUDIT-31.md:378`): *"CONTRIVANCE TELL (MODERATE) — the spring-heatmap 507× is an
ASSERTED number citing a DELETED bench … but the bench is `/tmp/spring-heatmap-probe.mts`"*, and filed
`Q.W-HEATMAP-EVID` (`AUDIT-31.md:385,391`) to promote it to `bench/spring-heatmap.bench.ts` +
`spring-heatmap-decision.json`, with a `proof:spring-heatmap` gate reading the measured ratio.

**It never landed.** `ls bench/` shows 19 artefacts (`spring-tick.bench.ts` among them) and **no**
`spring-heatmap.bench.ts`; `grep -rn "spring-heatmap" package.json scripts/` returns nothing. The
provenance chain terminates at `docs/tranches/P/FULL-LOOP-LEDGER.md:133`, which records the numbers but
also records that they came from `/tmp`.

This matters on the library axis specifically because the number is load-bearing for a *design*
decision the file re-asserts as settled ("the 400-live-SpringProgress approach is DROPPED"). A dropped
alternative deserves a reproducible measurement, and M-4 shows the strawman was inflated 20× anyway.

**Falsifier.** A checked-in bench or decision JSON producing the ratio, or a gate script that measures
it. Neither exists in the tree at this commit.

---

### M-7 — the prop is the entire 40-key scene context for a component that reads two refs (MAJOR)

`SpringHeatmap.vue:63-66`

```ts
import type { SpringDemoContext } from "./springKeys";
const props = defineProps<{ demo: SpringDemoContext }>();
const demo = props.demo;
```

`springKeys.ts:4`: `export type SpringDemoContext = ReturnType<typeof useSpringDemo>` — the return of a
499-line composable exposing ~40 members (facility, playback adapter, painter registry, editor
animation, derby state, transport verbs, …). SpringHeatmap consumes `response` and `dampingFraction`.
Nothing else (enumerated in §0).

The cost is a maximally wide recompile/blast surface: any edit to `useSpringDemo`'s return re-types this
component, and the component's public contract is "whatever the composable happens to return" — an
implicit interface, never declared. The honest prop is
`{ response: Ref<number>; dampingFraction: Ref<number> }`, which is also exactly what a future extraction
of the field into a reusable 2-D parameter picker would need.

This folds U lane-24 §7 (`docs/tranches/U/audit/lane-24-design-restructure-system.md:218-231`), which
named both halves: the two-grammar split (provide/inject *and* prop within one scene) and the
derived-not-declared type.

**I explicitly decline the lane's first half for this file.** The provide/inject alternative is
**not** available here and the prop is *not* a gratuitous second grammar: `SpringScene.vue:32` provides
`SPRING_DEMO_KEY`, but `SpringPhysicsFacet` is handed to the shell as a **render factory**,
`SpringScene.vue:67` `const tabsContent = () => h(SpringPhysicsFacet, { demo })`. That vnode is
instantiated inside whichever shell component invokes `tabsContent`, so its injection chain is the
controls-pane subtree, not SpringScene's — `inject(SPRING_DEMO_KEY)` would resolve to `undefined` and the
non-null assertion used by its siblings (`SpringTarget.vue:169`, `StartingStyleTarget.vue:96`) would
crash. The prop mechanism is correct. Only its **width** is the defect.

**Falsifier.** Any `demo.<member>` in this file outside `response`/`dampingFraction` — the enumerated
grep in §0 finds none. For the declined half: if `tabsContent`'s vnode were rendered within SpringScene's
own component subtree, inject would work and the two-grammar critique would apply unqualified.

---

## 3. MINOR

### m-1 — a watcher whose body is a comment (MINOR)

`SpringHeatmap.vue:281-286`

```ts
watch(
    () => [demo.response.value, demo.dampingFraction.value] as const,
    () => { /* marker is reactive (markerStyle); nothing else to repaint */ },
);
```

A registered reactive effect that allocates a fresh tuple on every param change and calls an empty
function. It documents an absence — and `:279-280` already documents the same absence in a comment, for
free. Dead code by the strictest definition: removing it changes nothing observable.

**Falsifier.** Any side effect in the getter or body. There is none; the getter reads two refs and
allocates.

### m-2 — a dead `defineExpose` of two constants that exist only to be exposed (MINOR)

`SpringHeatmap.vue:82-83, 277`

```ts
const HALF_CELL_RESPONSE = (RESPONSE_MAX - RESPONSE_MIN) / COLS / 2;
const HALF_CELL_DAMPING  = (DAMPING_MAX  - DAMPING_MIN)  / ROWS / 2;
…
defineExpose({ HALF_CELL_RESPONSE, HALF_CELL_DAMPING });   // "for any future consumer / gate witness"
```

`grep -rn "HALF_CELL" demo/ test/ e2e/` returns three hits, all in this file: two definitions and the
expose. The sole mount site (`SpringPhysicsFacet.vue:58`) carries no `ref`, so the exposed object is
unreachable. `defineExpose` additionally suppresses the component's default instance surface — a real
side effect purchased for a speculative consumer. This is the `feedback_kiss_no_contrivance` law
("Don't create … wrapper components that don't exist yet") in its constant-shaped form.

**Falsifier.** A `ref` on the mount site, a test, or an e2e witness reading either constant. None exists.

### m-3 — three box models for one coordinate space (MINOR)

* `paint()` sizes the canvas from `field.clientWidth/clientHeight` (`:142-143`) — the **content** box.
* `markerStyle` positions via `cqw`/`cqh` (`:197`) against `container-type: size` (`:303`) — the
  **content** box.
* `navigateFromPointer` maps clicks through `field.getBoundingClientRect()` (`:207`, `:211-212`) — the
  **border** box, and `:297` declares `border: 1px solid …`.

So the click mapping runs against a rect 2px wider and taller than the surface it is mapping onto, offset
1px. The error is small and symmetric about the centre (≈0.25% of the field at the quartiles, ~0.05
cells at a 200px width) — I am **not** claiming a visible mis-click today. I am claiming the code holds
three different definitions of "the field" and only survives because the border is 1px and the snap is
coarse. Add padding to `.spring-heatmap` and the click axis silently decouples from the painted axis.
The fix is to use `canvasEl`'s rect (the surface actually painted) rather than the field's.

**Falsifier.** `border: 0` / `box-sizing` making `getBoundingClientRect()` and `clientWidth` agree.
`:297` declares a 1px border on all four sides, so they differ by exactly 2px.

### m-4 — four dead or lying token fallbacks; the R.W6 comma-default excision was applied to the one line the gate grepped (MINOR)

| site | fallback | truth |
|---|---|---|
| `:119` | `"hsl(142 71% 45%)"` | unreachable (`--color-progress` is defined at `:root`, `style.css:163`); a **green** ghost of a retired token while the motion authority is the violet `--accent-kf`. This is R-tranche **F7** (`docs/tranches/R/audit/demo-styling.md:120-122`), **still live** |
| `:124` | `cs.backgroundColor \|\| "#fff"` | unreachable for the same reason (`--background` is defined in `tokens/color-radius.css:1`) |
| `:328` | `var(--duration-fast, 160ms)` | the real token is **0.2s = 200ms** (`tokens/scheme-motion.css:1`). The fallback is unreachable *and* wrong — a reader who trusts it mis-reads the marker's glide by 25% |
| `:321` | `var(--radius-pill, 9999px)` | unreachable; `--radius-pill: 9999px` exists (`styles/theme/radius.css:1`) |

`R.W6.md:544` required *"`SpringHeatmap.vue:330` has `z-index: var(--z-content, 3)`"* be excised. It was:
`:330` now reads `z-index: var(--z-content);`. The four comma-defaults **eight lines above and below it**
survived. The gate saw one grep pattern; the class of defect it stood for was never addressed.

**Falsifier.** Any DOM state in which `--color-progress`, `--background`, `--duration-fast` or
`--radius-pill` is undefined at `.spring-heatmap` — all four are declared at `:root` by the demo or
glass-ui token sheets, which `demo/styles/style.css:3` imports unconditionally.

### m-5 — zero test and zero e2e coverage (MINOR)

`grep -rln "heatmap\|Heatmap" test/ e2e/` returns nothing. The component owns the only click→param
write path in the scene, an arrow-key state machine (M-1), a canvas paint whose failure mode is silent
(M-3), and a theme-repaint contract (B-2). Every one of these is unit-testable without a browser: the
`overshoot` function is pure; the arrow round-trip is a two-line property test (`right∘left = id`); the
click→cell mapping is arithmetic. The one place the file gestures at a witness is the dead expose (m-2).

**Falsifier.** Any spec exercising `SpringHeatmap`, the overshoot formula, or the arrow lattice.

### m-6 — `aspect-ratio: 11 / 13` "true scale" is defeated by `max-height: 16rem` above ~216px width (MINOR, partly UNPROVEN-NEEDS-LIVE)

`:295-296`

```css
aspect-ratio: 11 / 13;   /* response span (1.1) : damping span (1.3) — true scale */
max-height: 16rem;
```

The ratio is arithmetically right (1.1 : 1.3), and it is the correct instinct — equal parameter units per
pixel on both axes. But with `w-full` (`:30`), height = width × 13/11, and the cap bites for any field
wider than `16rem × 11/13 ≈ 13.5rem ≈ 216px`. Past that, the field is width × 216px and the two axes
carry different units-per-pixel, so the commented invariant is false in exactly the layout a desktop rail
produces. Nothing breaks functionally — every mapping is normalised — but the "true scale" claim is
conditional and undeclared.

**Falsifier.** A measured rendered field width ≤ 216px in the desktop rail and the mobile sheet. That
measurement needs a live page → **UNPROVEN-NEEDS-LIVE**, handed to SS-13. The arithmetic (cap bites above
216px) is certain.

### m-7 — `pointerdown`-only: the crosshair and `select-none` promise a sweep gesture the component does not implement (MINOR)

`:34` binds `@pointerdown` alone. `:30` sets `cursor-crosshair` and `select-none`. There is no
`pointermove`, no `setPointerCapture`, no `pointerup`. `select-none` exists to keep a drag from selecting
text — a defence against a gesture the component cannot receive. On a 2-D parameter field the natural
exploration gesture is a sweep (drag across the landscape and feel the spring change), and the analytic
design makes it free: no per-cell cost, no object lifecycle. This is the one place where the file's
"KISS: one canvas + one click handler + one marker" (`:12`) elides a capability the affordance advertises.

**Falsifier.** A `pointermove` handler, a pointer-capture call, or a documented decision to make the
field click-only. None is present; `select-none` argues the opposite intent.

---

## 4. INFO (recorded, not charged)

* **i-1 (a11y axis, cross-filed).** `role="application"` (`:31`) makes assistive tech forward *all* keys
  to the component, but only four are handled (`:241-256`) and the current `(response, damping)` value is
  announced nowhere — the readout at `:18-21` is a sibling with no `aria-describedby`/`aria-valuetext`
  and the canvas is `aria-hidden` (`:37`). A keyboard/SR user gets silence per press. Belongs to the A
  axis; noted here because it is the same `onKeydown` M-1 indicts.
* **i-2.** `const demo = props.demo` (`:66`) is a one-time non-reactive read, not the Vue 3.5 compiler
  destructure. Harmless (one context per scene lifetime) but latent if the parent ever re-keys. Same
  idiom at `SpringPhysicsFacet.vue:141-142`.
* **i-3.** Key-repeat on an arrow drives ~30 writes/second into `useSpringDemo.ts:341`, each disposing and
  reconstructing a `SpringProgress` plus a `NumericAnimation` and calling `startLoop()`
  (`useSpringDemo.ts:321-339`). No leak — `dispose()` is called — but no coalescing either. The
  heatmap is the originator; the cost lands next door.
* **i-4 (design axis, UNPROVEN-NEEDS-LIVE).** `:298` `background: var(--background)` paints an **opaque**
  page-background plate inside a translucent `Card tier="quiet"` glass panel (`SpringPhysicsFacet.vue:21`).
  The 0%-mix rows (M-4) therefore read as an opaque rectangle punched through the glass rather than the
  "faint wash of the surface" `:116-117` describes. Hand to SS-13.

---

## 5. SUPERLATIVES (L-18, running the other way)

### S-1 — teardown is complete, and it is complete by *deletion*, not by discipline

`useResizeObserver(fieldEl, () => paint())` (`:267`) auto-stops on scope dispose; `watch(isDark, …)`
(`:270`) is component-scoped. There is no rAF, no timer, no manual listener, no `new ResizeObserver`, no
`new MutationObserver`, no `onScopeDispose` — because there is nothing left to tear down. The R.W6
excision genuinely landed (`R/audit/demo-brittleness.md:79-81` graded the prior raw-observer pair HIGH;
`R.W6.md:106-113` prescribed the swap). The leak surface is empty. *(This is orthogonal to B-2, which
faults the **timing** of `:270`, not its lifetime.)*
**Falsifier.** Any unreleased handle. I read the file whole: the two composable calls above are the
complete set of resources acquired.

### S-2 — the closed-form claim is TRUE, verified against the library, and it is genuinely not duplication

`:85-104` asserts *"there is no closed-form `settleTime`/`overshoot` function on the library surface; we
compute it inline."* I checked. `find src/animation/physics/spring -type f` yields 14 modules;
`grep -rni "overshoot|settleTime|dampingRatio" src/` returns **prose only** — every hit is a doc comment
(`progress.ts:52,61,62`, `linear-stops.ts:42`, `timing-function.ts:17,46,55,58`, `duration.ts:29`). The
public spring barrel (`css/index.ts`) exports `springLinearStops` and `springTimingFunction` and nothing
else; `springLinearStops` returns a **string** (`linear-stops.ts:46`), so extracting a numeric peak from
it would require re-parsing the emitted `linear()` list. `duration.ts` translates `bounce ↔
dampingFraction` and stops there. The inline derivation is correct control theory, correctly scoped, and
its independence from `response` (`:94-97`) is stated and true (ω₀ scales the time axis, not the peak).
This is the right call, honestly documented — a rarity in a file whose other comments (M-2, M-5, M-6,
m-4) do not survive contact.
**Falsifier.** Any exported function computing a peak or settle time from `(response, ζ)`. There is none
at this commit.

### S-3 — `inv ζ` is genuinely honoured: no `SpringProgress`, no lifecycle, no frame budget

The file allocates nothing per frame and nothing per cell beyond the fill string. It does not register a
painter with `demo.registerSpringPainter` — and it is **right** not to: the marker position is discrete
(it changes only on a param edit), so a reactive `computed` (`:183-199`) is the correct instrument and
the 60 Hz painter registry would be the wrong one. The file reasons this out explicitly at `:39-41`
("A discrete position … so a reactive `:style` is correct here"). Distinguishing the discrete channel
from the continuous one, in a scene that runs both, is exactly the judgement the hot-path/cold-path
split in `useSpringHotPath` exists to teach — and this is the component that got it right without being
told.
**Falsifier.** Any per-frame work: a rAF, a painter registration, a `watchEffect` on a hot ref. None.

### S-4 — the T.G4 compositor discipline is complete, including the reduced-motion opt-out

`transform: translate(<cqw>, <cqh>)` (`:197`) against a `container-type: size` field (`:303`), never
`left`/`top`; `will-change: transform` (`:329`); negative margins for centring (`:318-319`) so the
transform carries position alone; and `@media (prefers-reduced-motion: reduce) { transition: none }`
(`:333-337`). The PRM census logs this site (`formation/keyframes/lane-frontend.md:472`
→ `scenes/spring/SpringHeatmap.vue:333`). The container-collapse hazard of `container-type: size` is
anticipated and answered in the comment at `:300-302` (the field's size is fixed by `aspect-ratio` +
width, independent of contents) — and that reasoning is correct.
**Falsifier.** A layout-property animation on the marker, or a missing PRM guard.

### S-5 — `fieldEl.value?.focus()` on pointerdown is the Safari cure, and it is paired correctly

`:231`. Safari does not focus a `tabindex="0"` div on click; without this line the field would be
keyboard-navigable only after a Tab. Pairing it with `.focus-ring:focus-visible`
(`demo/styles/design-idioms.css:74-79`) means the ring stays quiet for the mouse and appears for the
keyboard — the demo-wide contract, consumed rather than re-authored.
**Falsifier.** A `:focus` (not `:focus-visible`) rule on `.focus-ring`, which would make mouse clicks
flash the ring. `design-idioms.css:76` uses `:focus-visible`.

### S-6 — high-DPI handling is textbook

`:146-150`: `Math.min(window.devicePixelRatio || 1, 2)` (capped, so a 3× phone does not pay 9× the
fill), backing store sized in device pixels, `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` so all subsequent
drawing is in CSS units. The `|| 1` guard covers the undefined case. Re-derived on every paint, which is
correct because `canvas.width =` resets context state anyway.
**Falsifier.** An uncapped ratio or drawing in device pixels after the transform. Neither.

---

## 6. Ranked repair order (for whoever consumes this)

1. **B-1** — declare `@mkbabb/glass-ui@7.0.0` and regenerate the lock. Nothing below is verifiable until
   `npm ci` reconstructs the tree (census `lane-frontend.md:612`).
2. **B-2** — `onFlipSettled(() => paint())` (or `{ flush: "post" }`). One line. Re-audit every other
   `watch(isDark, …)` in the demo for the same shape; the R.W6 prescription was repo-wide.
3. **M-1** — one shared `snapToCell()` used by both `navigateFromPointer` and `onKeydown`. Kills the
   irreversibility, the lattice split, and the `* 100 / 100` quadruplication in one motion.
4. **M-3** — resolve tokens to concrete colours before they reach `fillStyle`, and read back to verify.
5. **M-2 / M-5** — delete the `--ball-tone` arm (or provide the token on an actual ancestor), and lift the
   four range literals into `springPresets.ts`. Both are comment-vs-tree divergences; fix the tree, then
   the comments.
6. **M-4** — collapse the col loop to one `fillRect` per row, and decide whether the x-axis should carry
   settle time (already reserved: `P.W6.md:92`) or whether the surface should stop calling itself 20×20.
7. **m-1, m-2, m-4** — deletions. ~15 lines out, nothing in.
8. **m-5** — the pure `overshoot` function and the arrow lattice are unit-testable today, no browser.
9. **M-6** — land `Q.W-HEATMAP-EVID` or strike the number from all three sites.

Handed to SS-13 for live observation: **B-2** (toggle dark→light, do not resize), **M-3** (is the light-mode
field tinted or black?), **m-6** (rendered field width vs 216px), **i-4** (opaque plate in the glass card).
