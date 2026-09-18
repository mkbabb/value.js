claude-opus-5[1m]

# CHALLENGE · SpringTarget · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringTarget.vue` (470 L)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every claim carries file:line provenance and its own falsifier.
**Import closure read whole** (all read-only):

| file | L | why in closure |
|---|---|---|
| `demo/scenes/spring/SpringTarget.vue` | 470 | the target |
| `demo/scenes/spring/springKeys.ts` | 10 | `SPRING_DEMO_KEY` |
| `demo/scenes/spring/SpringTrace.vue` | 129 | child component |
| `demo/scenes/spring/useSpringLinearStops.ts` | 34 | SpringTrace's engine seam |
| `demo/scenes/spring/useSpringDemo.ts` | 499 | the injected context's whole surface |
| `demo/scenes/spring/useSpringHotPath.ts` | 146 | `springLive` / `registerSpringPainter` |
| `demo/scenes/spring/useSpringDerby.ts` | 115 | `derby` / `derbyActive` / `derbyLanes` |
| `demo/scenes/spring/springPresets.ts` | 42 | the ζ values the overlay renders |
| `demo/composables/useDragScrub.ts` | 150 | the scrub seam |
| `demo/composables/useDoubleTap.ts` | 84 | the egg seam |
| `demo/composables/scene-runtime/usePainterRegistry.ts` | 20 | the painter contract |
| `demo/styles/design-idioms.css` (`:155–249`) | — | `.progress-rail/.progress-ball/.status-badge/.stage-field-x` + `--spring-lane-*` |
| `node_modules/@mkbabb/glass-ui/dist/card-Da665R8v.js`, `Surface-DOHf5u2R.js` | — | what `<Card>` actually does with `class` / `tier` |
| `src/animation/physics/spring/css/{linear-stops,timing-function}.ts`, `solver/sample.ts` | — | the engine APIs the component consumes (and the one it doesn't) |
| context (not closure): `SpringScene.vue`, `SpringPhysicsFacet.vue`, `SpringHeatmap.vue` | — | the provider + the two writers of `response`/`dampingFraction` |

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` (F-1 phantom dep; §3.2 root-barrel census; §6.4 the two `@keyframes` at `SpringTarget.vue:387,457`; §6.5 the PRM site at `:462`; §4 roster row "470 · spring/SpringTarget.vue · G · Card"). I extend F-1 to its bite-site here (B-1) and **contradict nothing** in the lanes; §4's line/role attribution matches the tree exactly.

**Tally** — 18 defects (1 BLOCKER · 4 MAJOR · 7 MINOR · 6 INFO) + 6 superlatives + 6 candidate findings killed by their own falsifier (§5, recorded so the next pass does not re-invent them).

---

## 1. BLOCKER

### B-1 · the phantom dep is load-bearing on this file twice over — import **and** cascade

`SpringTarget.vue:162`

```ts
import { Card } from "@mkbabb/glass-ui";
```

Per lane-frontend **F-1**, `@mkbabb/glass-ui` appears in neither `package.json` nor `package-lock.json`; only the `Jul 16 05:17` `node_modules` directory (7.0.0) makes this line resolve. `npm ci` reconstructs strictly from the lock → this import has nothing to resolve against, and the component is a hard build failure.

The exposure is **wider than the one import**, and that is the part the lane did not enumerate for this file. Every one of the following, used by SpringTarget, is defined only inside the glass-ui cascade — the demo's own `styles/*.css` defines none of them:

| symbol | site in SpringTarget | sole definer |
|---|---|---|
| `.text-small` | `:126`, `:136` | `glass-ui/dist/styles/typography/semantic.css` |
| `.text-mono-small` | `:39` | `glass-ui/dist/styles/typography/utilities.css` |
| `.text-mono-caption` | `:48`, `:120`, `:139` | idem |
| `--font-weight-semibold` | `:291` | `glass-ui/dist/styles/components.css` (`:root`) |
| `--radius-pill` | `:326`, `:433` | `glass-ui/dist/styles/theme/radius.css` |
| `--duration-fast` | `:331`, `:373`, `:385` | `glass-ui/dist/styles/transitions.css` |
| `--ease-standard` | `:376`, `:415` | `glass-ui/dist/styles/animations.css` |
| `--z-content` | `:414` | `glass-ui/dist/styles/theme/bridges.css` |

So the failure mode of a *partial* glass-ui drift (not a missing install, but a silent major bump under `legacy-peer-deps=true`, F-1's second half) is: the component still mounts, and its readout silently loses its type rung, its pill radius, its stacking layer and its two motion durations. There is no local fallback for `--radius-pill`, `--z-content`, `--font-weight-semibold`; the three that *do* carry `var(…, fallback)` (`--duration-fast, 160ms`, `--ease-standard, ease`, `--font-weight-semibold, 600`) are exactly the three that would have degraded gracefully anyway.

**Severity** BLOCKER — it is F-1's severity, and this file is one of its 42 hosts; recorded here so the megatranche's per-component ledger shows where F-1 lands rather than only that it exists.
**Falsifier** — a `@mkbabb/glass-ui` entry in `keyframes.js/package.json` **and** a `node_modules/@mkbabb/glass-ui` block in `package-lock.json`. Either alone is insufficient (`npm ci` reads the lock). If both exist, B-1 dies whole.

---

## 2. MAJOR

### M-2 · the protagonist ball is unbounded on the value axis and is clipped away at peak overshoot

The live-ball painter (`SpringTarget.vue:206–208`):

```ts
if (liveBallEl.value) {
    liveBallEl.value.style.transform = `translateX(${live.value * 100}cqw)`;
}
```

No clamp. Contrast the two siblings **two lines apart**: the sampler is clamped `clamp(live.sampled, 0, 1)` (`:210`) and the derby lanes are clamped `clamp(trackValues[i] ?? 0, 0, 1.18)` with the explicit rationale *"cap so the ball can't leave the lane entirely"* (`:220–222`). The protagonist gets neither.

`live.value` is `SpringProgress.value`, which the engine documents as overshooting: `src/animation/physics/spring/css/timing-function.ts:54–56` — *"Interior values may exceed 1 for ζ < 1 … the bouncy `response 0.5 / ζ 0.45` preset peaks at ≈ 1.205."* Analytically the peak for a 0→1 re-seat is `1 + exp(-πζ/√(1-ζ²))`.

ζ is user-writable down to **0.2** from two shipped controls:
- `SpringPhysicsFacet.vue:42` — `<LabeledSlider label="damping (ζ)" :min="0.2" :max="1.5">`
- `SpringHeatmap.vue:72` — `const DAMPING_MIN = 0.2;` (click-to-navigate + arrow keys)
- and one click on the `bouncy` preset chip sets ζ = 0.45 (`springPresets.ts:33`).

The target is 1 by default (`useSpringDemo.ts:92`), `Re-seat` flips 0↔1 (`useSpringDemo.ts:303–305`), and the derby's `launchLive()` sets 1 — so the full-span 0→1 re-seat is the *primary* gesture, not a corner.

Geometry. The ball's container is `.spring-rail` (`container-type: inline-size`, `:298–306`), width `W`. The clip box is the Card, `overflow-hidden` (`:12`). The content column is `max-w-3xl` (768 px) inside `px-6 lg:px-8`. Right slack from rail edge to clip edge = `(CC − W)/2 + P`.

| viewport | W | slack | ζ = 0.45 overshoot | ζ = 0.2 overshoot | clipped? |
|---|---|---|---|---|---|
| 375 px | ~279 px | 24 px | 57 px | 147 px | **yes, both** |
| ~1100 px stage | 768 px | ~166 px | 158 px | 404 px | 0.45 marginal, 0.2 **yes** |

Solving for the threshold: on a 375 px viewport every **ζ < ≈0.62** clips (that is 46 % of the slider's 0.2–1.5 range, and includes `bouncy`); on a 1100 px stage every **ζ < ≈0.44** clips. Below the clip threshold the scene's headline object leaves the plate for the ~100–200 ms of the first overshoot — i.e. it disappears at precisely the instant the physics being demonstrated is most legible. Symmetrically, a 1→0 re-seat drives `live.value` negative and clips left.

The file's own prose already declares the opposite intent, at `:179–180`:

> `// The sweep can overshoot past 1 (underdamped) — clamp the *marker* position`
> `// so the ball stays inside the track even though the read-out shows >1.`

**Severity** MAJOR — reachable from three shipped controls including a one-click preset; the defect is in the scene's protagonist; the component documents the invariant it violates.
**Falsifier** — any of: (a) `SpringProgress.value` is internally clamped to [0,1] (it is not — `linear-stops.ts:41–43` and `timing-function.ts:54–56` both state the opposite, and the derby's own 1.18 clamp exists *because* it overshoots); (b) the Card does not clip (killed in §5.5 — `class` reaches the Surface root through a **declared** `class` prop, and `container-type` does **not** imply paint containment, so the Card's `overflow-hidden` is the effective clip); (c) a live paint at ζ = 0.2 shows the ball inside the plate at peak. (c) is the honest live check — the *arithmetic* half is proven statically, the *rendered* half is UNPROVEN-NEEDS-LIVE and belongs in the SS-13 visual pass.

### M-3 · `SpringTrace` violates its own documented endpoint anchors; both guards are dead code

`SpringTrace.vue:48–49` states the contract:

> *"Stops without an explicit % are distributed evenly (the CSS `linear()` rule); the **FIRST/LAST implicit stops anchor 0% / 100%**."*

The engine emits (`src/animation/physics/spring/css/linear-stops.ts:62–70`) exactly 26 stops: a bare `0`, then 24 stops carrying explicit percents at `i/25·100` (4 %, 8 %, … 96 %), then a bare `1`. So `pts[0]` and `pts[25]` are the two implicit stops.

The fill loop (`SpringTrace.vue:61–75`) treats a leading/trailing run as an *interior* run:

```
i=0:  pct == null → j scans to 1 (first explicit)
      nextPct = 4 ; span = j - i + 1 = 2
      pts[0].pct = 0 + (4 − 0)·1/2 = 2          ← should be 0
i=25: pct == null → j scans to 26 (past end)
      nextPct = 100 ; span = 26 − 25 + 1 = 2 ; lastPct = 96
      pts[25].pct = 96 + (100 − 96)·1/2 = 98    ← should be 100
```

Then the anchors at `:76–79`:

```ts
pts[0]!.pct = pts[0]!.pct ?? 0;
pts[n - 1]!.pct = pts[n - 1]!.pct ?? 100;
```

`??` short-circuits on `2` and `98`. **Both guards are unreachable.** The plotted trace therefore spans `x ∈ [2, 98]` of a 100-unit `viewBox` that is stretched to the full column with `preserveAspectRatio="none"` (`:16–20`): on a 700 px-wide column the curve fails to reach the left edge by ~14 px and, more visibly, fails to land on the right edge — where the whole point of the plot is that the curve arrives at the target line.

**Severity** MAJOR — a plain arithmetic error, provable without running anything, in shipped render output, against the component's own written oracle, with two dead guards as corroborating evidence that the author intended the other behaviour.
**Falsifier** — if `springLinearStops` ever emitted an explicit `0%` on the first stop and `100%` on the last, both branches would take the `else` path and the claim dies. It does not: `linear-stops.ts:62` pushes the literal string `"0"` and `:69` pushes `"1"`, neither carrying a percent.

### M-4 · the trace round-trips the engine through CSS text when the engine hands it the numbers

`SpringTrace.vue:42–58` calls `useSpringLinearStops` → `springLinearStops()` → a formatted CSS string → and then **regex-parses that string back into numbers** to draw an SVG path.

The engine's public surface already supplies the numeric form, in the same object as the string:

```
src/animation/physics/spring/css/timing-function.ts:41–46, 65–67, 91–100
  springTimingFunction(opts): Easing            //  { fn: (t:number)=>number, css: string }
  "…`.fn` is the callable curve — (t: number) => number over t∈[0,1] …
   and `.css` is the CSS linear() string that reproduces it (same solver, same preset)"
  ":48–50  This is the JS-easing sibling of springLinearStops: same solver, same
   (response, dampingFraction) surface, same default maxDuration = response * 4."
```

`springTimingFunction` is exported from the package barrel (`src/animation/physics/spring/index.ts:27`) and is **already imported by the sibling module in this very directory** — `useSpringDemo.ts:5`. Sampling `.fn` at 26 evenly-spaced `t` yields the identical curve with zero parsing, and `.css` still supplies the string for the stop-count label. (The truly-internal `sampleNormalizedSpring` is *not* public — `physics/spring/index.ts` does not re-export it — so this is the correct public route, not a reach into internals.)

This is the engine-consumption misuse the axis asks for: the demo is the library's proving ground, and here it dogfoods the *serializer* and then re-implements a parser for its own serializer's output. **M-3 lives entirely inside that avoidable round-trip** — and note the engine guarantees exactly what the parser gets wrong: `timing-function.ts:54` *"The curve satisfies `fn(0) = 0` and `fn(1) = 1` exactly."*

**Severity** MAJOR — it is the root cause of M-3, it is ~40 lines of parser that need not exist, and it models the wrong idiom for the repo whose whole demo is an idiom exhibit.
**Falsifier** — if `springTimingFunction(...).fn` produced a materially different curve from `springLinearStops(...)` (different solver, different `maxDuration` default, or a settle-pin the other lacks), the swap would not be sound and this becomes INFO. The two share `sampleNormalizedSpring` (`linear-stops.ts:54`, `timing-function.ts:76`) and the same `response * 4` default (`:49` / `:70`); only the per-step `dt` framing differs (`sampleCount+1` vs `sampleCount` sub-intervals, `solver/sample.ts:29–33`), which changes sample *spacing*, not the curve.

### M-5 · derby re-entrancy drops a live timer: a second double-tap hides the lanes mid-race

`useSpringDerby.ts:73–108`, consumed at `SpringTarget.vue:105` (`v-if="demo.derbyActive.value"`) and `:249` (`onDoubleTap: () => demo.derby()`).

Two flags run on different clocks:

- `derbyRunning` is cleared **inside** the settle timer, at `launchSpan + 900` ≈ 1340 ms (`:99`);
- `derbyActive` (the one the overlay renders on) is cleared **700 ms later** by a timer pushed from inside that callback (`:102–106`), ≈ 2040 ms.

They disagree for 700 ms, and `derby()`'s only guard is `derbyRunning` (`:74`). Inside that window a second double-tap re-enters, and line `:77` does:

```ts
derbyTimers.length = 0;      // drops the references — does NOT clearTimeout them
```

Trace:

| t (ms) | event |
|---|---|
| 0 | derby #1: 4 stagger timers, launchLive @440, settle @1340 |
| 1340 | settle → `derbyRunning = false`; pushes **T_hide @2040** |
| ~1500 | user double-taps again → `derbyRunning` false → derby #2 starts, `derbyActive = true`, `derbyTimers.length = 0` **orphans T_hide** |
| 2040 | orphaned T_hide fires → `derbyActive = false` → **lanes unmount ~540 ms into race #2** |
| 2840 | race #2 settles, pushes its own hide @3540 — a no-op, already hidden |

Result: race #2 runs to completion with no overlay. The engine keeps solving (the shared loop is the sole driver, inv ζ), the painter writes into `derbyBallEls` entries that Vue has nulled — no crash, no leak, but the egg silently fails to render.

The same line also defeats the teardown at `:112` (`onScopeDispose(() => derbyTimers.forEach(clearTimeout))`): a scene swap in that window leaves T_hide pending against a disposed scope.

**Severity** MAJOR — reachable by the ordinary "do it again" reflex on an easter egg whose entire purpose is to be re-triggered; a one-line fix (`derbyTimers.forEach(clearTimeout)` before `length = 0`, and gate on `derbyActive` rather than `derbyRunning`).
**Falsifier** — if `derbyActive` were cleared in the *same* callback that clears `derbyRunning`, the two flags would never disagree and re-entry would be impossible. They are not: `:99` and `:104` are 700 ms apart by construction (`:100–101` documents the hold as deliberate).

---

## 3. MINOR

### m-6 · `spring-lane-${lane.name}` is a phantom class — no rule matches it anywhere

`SpringTarget.vue:112` — `:class="['derby-lane', \`spring-lane-${lane.name}\`]"`.

Exhaustive grep over `demo/` **and** `node_modules/@mkbabb/glass-ui/dist/styles/` returns only the four **custom properties** `--spring-lane-{smooth,snappy,bouncy,gentle}` (`demo/styles/design-idioms.css:28–31`) and their consumers in `useSpringDerby.ts:12–15`. There is **no `.spring-lane-*` selector** in either tree, and the name is not a Tailwind utility shape. The lane tone is in fact delivered entirely by the inline `--ball-tone` binding on the next line (`:113`).

**Severity** MINOR — dead markup that reads as if it were the tone mechanism, actively misdirecting the next reader (and the scoped-style hash makes it un-styleable from outside anyway).
**Falsifier** — any `.spring-lane-` selector, in any stylesheet, in either tree.

### m-7 · `display: flex; align-items: center` on `.spring-rail` / `.sampler-track` is inert

`SpringTarget.vue:298–306`. Enumerate the children:

| child | position | source |
|---|---|---|
| `.progress-rail` | absolute | `design-idioms.css:167` |
| `.spring-target-line` | absolute | `:363` |
| `.spring-target-marker` | absolute | `:320` |
| `.progress-ball.spring-ball` | absolute | `design-idioms.css:178` |
| `.derby-lanes` (v-if) | absolute | `:405` |
| `.progress-ball.sampler-ball` | absolute | `design-idioms.css:178` |

Every child of both containers is out of flow, and each resolves **both** axes explicitly (`top` + `left`/`right`), so even the static-position fallback that flex alignment would supply is never consulted. The two declarations are dead; only `container-type: inline-size` is load-bearing.

**Severity** MINOR — dead CSS that implies a layout model the box does not use.
**Falsifier** — one in-flow child, or one absolutely-positioned child that omits an inset on either axis.

### m-8 · the T.G4 painter-anchor triplet is re-authored four times, in the file that promoted this exact idiom once

`design-idioms.css:161–165` opens with the boast:

> *".progress-rail / .progress-ball — the rail-line + scrubber-ball pair, promoted ONCE (**was authored four ways**) and parameterized by drift-axis custom properties."*

The T.G4 anchor variant (`left: 0` + half-size negative inline margin + `will-change: transform`) is now itself authored four ways:

| site | lines |
|---|---|
| `SpringTarget.vue` `.spring-ball` | `:340–346` |
| `SpringTarget.vue` `.sampler-ball` | `:348–355` |
| `SpringTarget.vue` `.derby-lane-ball` | `:436–447` |
| `SpringPhysicsFacet.vue` `.preset-ball` | `:192–198` |

All four are the same three declarations plus a per-site `--ball-size` / `--ball-glow`. The idiom file already owns the parameterisation seam (`--ball-size`, `--ball-glow`, `--ball-tone`, `--rail-tint`); a `.progress-ball--painted` modifier there would carry all four.

**Severity** MINOR — no behavioural consequence; it is a regression against the file's own stated DRY law, which is precisely the kind of drift the megatranche exists to catch.
**Falsifier** — a shared class already carrying the triplet (there is none: `design-idioms.css:177–187` sets `position/top/width/height/margin-top/radius/background/box-shadow/pointer-events` and neither `left`, nor an inline margin, nor `will-change`).

### m-9 · the `// clamp the *marker*` comment is orphaned 27 lines from any clamp

`SpringTarget.vue:179–180` sits between the template-ref block and the derby-ref block, describing a clamp that lives at `:210` and applies to the **sampler**, not the marker. The `.spring-target-marker` it names is bound to `demo.target.value` (`:89`), which `reseat` has already clamped to [0,1] (`useSpringDemo.ts:295`) — so the comment describes a clamp that neither exists where it sits nor applies to the element it names.

**Severity** MINOR on its own; it is corroborating evidence for **M-2** (the clamp it describes is the one the live ball lost).
**Falsifier** — a clamp on the marker, or the comment sitting adjacent to `:210`.

### m-10 · `el as HTMLElement` defeats the checker on the only cast in the file

`SpringTarget.vue:187–189`:

```ts
const setDerbyBallEl = (i: number, el: Element | ComponentPublicInstance | null) => {
    derbyBallEls[i] = (el as HTMLElement) ?? null;
};
```

The parameter type is Vue's full `VNodeRef` union, but the ref sits on a plain `<span>` (`:117–119`), so `Element` is the only inhabited case. The cast converts a *known-narrow* site into an unchecked one: if the ref were ever moved onto a component, `el` becomes a `ComponentPublicInstance`, `.style` is `undefined`, and the painter's `el.style.transform = …` throws inside the 60 Hz loop — from a change that the type system would otherwise have caught. `el: Element | null` + `el as HTMLElement | null` narrows honestly; better still, `el instanceof HTMLElement ? el : null`.

**Severity** MINOR — the failure requires a future edit, but it is exactly the edit the union invites.
**Falsifier** — if Vue's function-ref signature could not be narrowed to `Element | null` at this call site. It can: the declared parameter type is the author's, not Vue's — Vue passes the raw value and TS infers the annotation given.

### m-11 · the rail stays fully live during the derby, and any input overwrites all four staggered targets

`SpringTarget.vue:61–73` — the rail keeps `@pointerdown`, `@keydown`, `tabindex="0"` and `cursor-pointer` while `spring-rail--derby` is applied. That modifier does nothing but drop opacity to 0.35 on three children (`:381–386`); it sets no `pointer-events`, and `derbyActive` gates only the overlay's `v-if` (`:105`).

`reseat` re-seats **every** canonical tracker, not just the live one (`useSpringDemo.ts:294–300`):

```ts
for (const t of tracks) t.spring.target = v;
```

So one drag, tap, or arrow-key press during the race writes the same target into all four lanes and destroys the staggered wave the egg exists to show — while the pending stagger timers keep firing `t.spring.target = 1` behind it. State recovers at the settle timer, so nothing is corrupted permanently.

**Severity** MINOR — self-inflicted, non-destructive, on an easter egg.
**Falsifier** — a `pointer-events: none` / `inert` / guard on the rail while `derbyActive`, or a `reseat` that spares the tracks. Neither exists.

### m-12 · the derby overlay is the one sub-concern not extracted, against the file's own precedent

The component already models the right seam: `SpringTrace` was pulled out as *"a colocated sub-unit … the natural concern seam: the plot parse + draw"* (`SpringTarget.vue:148–151`), and the derby's **logic** was pulled out to `useSpringDerby.ts`. But the derby's **markup** (`:96–124`, 29 L) and **style** (`:398–460` + the PRM clause at `:466–468`, ~65 L) stayed. Of the file's 470 lines, `<style>` is 200 (`:271–470`) against 110 of `<script>` — and roughly a third of the style block is one optional, transient overlay.

Ledger of what the file actually carries: header readout · rail + drag/keyboard slider · target line + settle pulse · ghost marker · live ball painter · sampler track + ball · derby overlay (4 lanes, tags, fade-in) · trace host. Seven distinct surfaces; a `SpringDerbyLanes.vue` would take the seventh whole and would have been the natural home for m-6, m-7 and half of m-8 as well.

**Severity** MINOR — Goldilocks/colocation, not correctness.
**Falsifier** — if the derby overlay needed the rail's scoped-style hash to be styled from within the same SFC. It does not: it is a self-contained absolutely-positioned block reading only `--ball-tone` and the shared `.progress-ball` idiom.

---

## 4. INFO

- **i-13 · `touch-action` is declared on every drag surface in the demo except this one.** `SquareScene.css:64`, `CubeScene.vue:12`, `CubeTarget.vue:4`, `OrbitalDrag.vue:350`, `AmigaScene.vue:254`, `SequenceTarget.css:134`, `TimelineTrack.vue:24` all set `touch-action: none` / `touch-none`; `.spring-rail` (`SpringTarget.vue:298–306`) sets none, so its computed value is the `auto` initial. *Exposure is genuinely limited* — `styles/style.css:210–219` puts `touch-action: manipulation` on `html, body` (which participates in the ancestor intersection, so double-tap-zoom is already suppressed for `useDoubleTap`) and `overflow: hidden` on both, and `layout.css` declares no `overflow` at all, so there is no obvious scroll container between the rail and the root for a pan to steal. Recorded as an idiom inconsistency, not a proven bug. The behavioural half is **UNPROVEN-NEEDS-LIVE** (iOS pointercancel during a rail drag).
- **i-14 · the documented `tier="resting"` is true only by an undeclared default two components deep.** `SpringTarget.vue:4–5` asserts the plate is `tier="resting" surface="glass"`; the markup (`:10–13`) passes neither. It resolves correctly — `Card` defaults `material: "elevated"` and `Surface` maps `elevated → "resting"` via an internal table (`Surface-DOHf5u2R.js`, `tier ?? g[material]`, `g = { content:"quiet", elevated:"resting", functional:"floating", overlay:"overlay" }`). Combined with **B-1** (unpinned, unlocked, `legacy-peer-deps=true`), a documented visual register of this component is load-bearing on an unversioned internal default map. Passing `tier="resting"` explicitly costs nothing and makes the comment true of the markup.
- **i-15 · `derbyBallEls` never shrinks.** `SpringTarget.vue:186` is a bare array that grows to 4 on the first derby and stays there; Vue nulls the entries on unmount (§5.2), so the painter loops four `null` checks every frame forever afterwards. Immeasurable; noted only because the array's lifetime is invisible from the painter's `for (let i = 0; i < derbyBallEls.length; i++)`.
- **i-16 · two elements hold `will-change: transform` permanently** (`:346`, `:355`) while `SpringScene.vue:187–193` advertises *"zero rAF ticks, zero style recalc/layout at rest"* and `autoPlays: false`. Two persistent compositor layers is well inside any reasonable budget (the derby's four are `v-if`-scoped), but it is a small standing cost against a scene whose stated posture is that it costs nothing at rest.
- **i-17 · root-barrel import though `./card` exists.** `:162` draws `Card` from `@mkbabb/glass-ui`; the installed package exports `"./card": { types: "./dist/card.d.ts", import: "./dist/card.js" }`. This matches the demo's house idiom (lane-frontend §3.1: 31 root-barrel sites vs 21 subpaths), so it is consistency, not deviation — flagged only because the file already reaches for subpaths elsewhere in the directory (`SpringPhysicsFacet.vue:130–131` uses `/labeled-field` and `/chip`).
- **i-18 · the egg is not gesture-disjoint from the primary action.** `useDoubleTap` is drag-disjoint by design (`useDoubleTap.ts:20–24`), but a *tap* is not: `useDragScrub.onPointerDown` fires `onScrub(project(e))` on pointer-down (`useDragScrub.ts:125`), so each of the two taps that launch the derby first re-seats the target to the tapped x. The derby then overrides it ~440 ms later (`launchLive()`) and settles to 0 at ~1340 ms. Consequence is cosmetic — the live ball chases the tap point for the first stagger beat — but it means the derby can never be launched without perturbing the thing it is about to demonstrate.

---

## 5. Candidate findings killed by their own falsifier

Recorded so the next pass does not spend the same cycles. L-18 cuts both ways; so does the falsifier rule.

1. **"`inject(SPRING_DEMO_KEY)!` is a missing error posture."** *Dead.* It is the demo-wide idiom at every scene-subject site — `EasingTarget.vue:152`, `SequenceTarget.vue:150`, `SequenceScrubber.vue:47`, `StartingStyleTarget.vue:96`, `SpringTarget.vue:169` — five of five, with the optional-injection form (`inject(K, default)`) used correctly and deliberately at the three genuinely-optional sites (`ChromeDock.vue:159`, `usePaneHover.ts:35`, `ChannelControls.vue:277`). A one-file complaint about a five-file idiom would be noise.
2. **"`derbyBallEls` retains detached DOM nodes when the lanes unmount."** *Dead.* Vue's `setRef` is invoked with `isUnmount = true` on unmount, which passes `null` to function refs, so `setDerbyBallEl(i, null)` runs and the slots are cleared. (The inline arrow at `:117` is a fresh identity every render, which Vue handles by calling the *new* function with the current element — net-correct, churn only.)
3. **"`SpringTrace`'s regex silently substitutes `v = 0` on a non-match" (`:56`).** *Dead as a live defect.* `springLinearStops` formats with `toFixed(5)` / `toFixed(3)` (`linear-stops.ts:66`), which never emits exponential notation, and the values are non-negative for a 0→1 normalized spring. The fallback is unreachable against the only producer. (It remains a latent silent-failure posture if the emitter ever changes — INFO-adjacent at most, not claimed.)
4. **"`container-type: inline-size` on `.spring-rail` clips the overshoot."** *Dead.* `container-type: inline-size` applies layout + style + inline-size containment; it does **not** imply paint containment, so the rail does not clip. This matters because it is what makes M-2's clip attribution land on the Card and only the Card.
5. **"`Card` sets `inheritAttrs: false`, so `overflow-hidden` never reaches the DOM."** *Dead.* `Card` declares an explicit `class` prop (`card-Da665R8v.js`, `class: { type: [Boolean, null, String, Object, Array] }`) and folds it through `cn(…, a.class)` onto the `Surface` root, which does the same again. Vue consumes a declared `class` as a prop rather than an attr, so the classes land on the root element. M-2's clip stands.
6. **"The `settle-pulse--fire` class stays applied while settled, so the 'one pulse' claim is false."** *Dead.* `animation-fill-mode` is unset (`:376`), so the element reverts to its base `border-right-color` when the 220 ms run ends and does not re-run while the class persists — exactly one pulse per `false → true` transition of `liveSettled`, as `:76–79` claims.

---

## 6. Superlatives (L-18, the other direction)

### S-1 · `translateX(<cqw>)` — the container-query unit as the value axis

`SpringTarget.vue:199–224` + `:298–306`. Positioning by `left: X%` re-lays-out every frame; positioning by `translateX(Xpx)` composites but needs a per-frame width read (`getBoundingClientRect`) to convert the [0,1] value into pixels — trading layout for a forced reflow. Making the rail an inline-size container and writing `translateX(v * 100cqw)` gets **both**: compositor-only, and rail-relative with **no width read at all**. The rationale is spelled out at `:200–205` and the pattern is applied uniformly to all six balls across two files. This is the single best idea in the component and I have not seen it elsewhere in either repo's demo trees.
**Falsifier** — if `cqw` resolved against something other than the nearest inline-size container (it does not) or if `container-type` forced a layout recalculation per frame (it does not; the container's size is unchanged, only a descendant's transform).

### S-2 · the painter seam is textbook, including the part everyone forgets

`useSpringHotPath.ts:23–43` states the diagnosis (17 reactive refs per frame → every consumer re-rendering at 60 Hz) and the cure (a non-reactive snapshot + registered painters + few-Hz readout mirrors), and `SpringTarget.vue:196–228` consumes it exactly. The detail worth naming: `usePainterRegistry.ts:10` calls `paint(...currentArgs())` **at registration time**, so the ball is seated at its true value on mount rather than flashing at 0 until the first rAF tick — and the component gets that for free by registering inside `onMounted` where the refs are already populated. One loop, one writer, no second rAF (inv ζ), and the readout numerals correctly stay reactive because a human cannot read a number changing 60×/s.

### S-3 · the double-tap egg and the drag scrub share one element without fighting

`useDoubleTap.ts:20–24` + `SpringTarget.vue:247–252`. Two things are right here that are usually wrong. (a) The recognizer is **pointer**-based, not `dblclick` — the doc at `useDoubleTap.ts:8–18` correctly identifies that mobile browsers do not synthesize `dblclick` reliably, so the egg was previously unreachable on the platform where "double-tap" is most natural. (b) It is **drag-disjoint**: a pointer sequence exceeding a 12 px slop is a drag, never half a double-tap, *and it resets the pending single* — so a scrub between two taps cannot be laundered into a gesture. Both seams live on the same `railEl` and neither needs to know about the other.

### S-4 · `SpringTrace` is the correct extraction, correctly justified

`SpringTarget.vue:148–155`. The plot's parse-and-draw is a genuinely separate concern with a clean two-prop interface (`response`, `dampingFraction`) and no shared state; pulling it out kept the parent from growing a 60-line arithmetic block. That the extracted unit then turns out to carry M-3/M-4 does not diminish the *seam* — it is exactly the seam that makes those two findings small and locally fixable. m-12 is a complaint that this precedent was not followed once more.

### S-5 · reduced-motion covers both scoped animations, and degrades to the right thing

`:462–469` disables both `spring-settle-pulse` and `derby-fade-in` — the file's complete `@keyframes` inventory (`:387`, `:457`), matching lane-frontend §6.4 exactly. The degradation is the good kind: the settle *line* remains (only its flash is dropped, `:357–361`) and the derby lanes still appear (only their fade is dropped), so PRM users lose motion, not information. Compare the many PRM blocks that `display: none` the animated element.

### S-6 · `onScopeDispose` for the painter, not `onUnmounted`

`:196–228`. The registration is a resource whose lifetime is the setup scope, and `onScopeDispose` binds it to exactly that — surviving correctly under the `v-if` remount cycle that `SpringScene.vue:10–11` puts this component through on every Sweep↔Entry channel switch. Mirrored identically in `SpringPhysicsFacet.vue:150–163` and torn down symmetrically (`usePainterRegistry.ts:11` returns a `Set.delete` closure, so double-dispose is harmless). No leak on any path I could construct.

---

## 7. Fix order (if a wave lands)

1. **B-1** — nothing below is reproducible until `@mkbabb/glass-ui@7.0.0` is declared and locked. Repo-wide, not file-local.
2. **M-2** — one clamp, mirroring the derby's own `1.18` bound, on `SpringTarget.vue:207`. Delete or relocate m-9 in the same motion.
3. **M-4 → M-3** — swap `SpringTrace` onto `springTimingFunction(...).fn`; M-3 and its two dead guards vanish with the parser rather than being patched inside it.
4. **M-5** — `derbyTimers.forEach(clearTimeout)` before `length = 0` (`useSpringDerby.ts:77`), and gate `derby()` on `derbyActive` rather than `derbyRunning`.
5. **m-6, m-7, m-9** — deletions, no behaviour change.
6. **m-8** — promote `.progress-ball--painted` into `design-idioms.css`; retires 12 lines across two files.
7. **m-12 / m-11 / i-13 / i-14** — the derby extraction, the race-time rail guard, the `touch-action` declaration, the explicit `tier`. Each independently landable.

---

*Provenance: every keyframes.js and glass-ui path above was read read-only; nothing in either repo, or in fourier-analysis, was written, mutated, installed, or executed. No browser tooling was used; the two claims with a rendered component are marked UNPROVEN-NEEDS-LIVE for the SS-13 visual pass. The sole write of this lane is this file.*
