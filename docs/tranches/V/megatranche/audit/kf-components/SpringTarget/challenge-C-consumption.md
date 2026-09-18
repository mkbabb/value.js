claude-opus-5[1m]

# Challenge · `SpringTarget` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringTarget.vue` (470 lines)
**Axis:** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract, sibling seams.
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only magnitude is tagged `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Posture:** the component was assumed DEFECTIVE until the tree said otherwise. Two candidate defects (a `--ball-tone` invalid-substitution collapse; a stale `tier`/`surface` comment) were **investigated and killed** — see §4 *Killed candidates*. They are not reported.

**Read whole (read-only):** `SpringTarget.vue`, `SpringTrace.vue`, `springKeys.ts`, `useSpringDemo.ts`, `useSpringHotPath.ts`, `useSpringDerby.ts`, `useSpringLinearStops.ts`, `SpringScene.vue`, `composables/useDragScrub.ts`, `composables/useDoubleTap.ts`, `composables/scene-runtime/usePainterRegistry.ts`, `composables/scene-runtime/useSweepScene.ts`, `state/sceneMachine.ts`, `app/scene/useSceneMachineShellBinding.ts`, `styles/design-idioms.css`, glass-ui 7.0.0 `Card.vue`/`Surface.vue` + installed `dist/` (metric, card, styles/typography), value.js 4.0.0 `dist/subpaths/math.js` + exports map.

---

## 0. Tally

| | count |
|---|---|
| **BLOCKER** | 1 |
| MAJOR | 3 |
| MINOR | 4 |
| INFO | 2 |
| **defects total** | **10** |
| **superlatives** | **5** |

Hitherto corpus folded, not re-invented: `lane-frontend.md` **F-1** (glass-ui phantom dependency — inherited by this file at `SpringTarget.vue:162`, **not re-counted here**), the **S-1..S-8** shadow census (this challenge nominates **S-9**, C-4 below), the §3.1 subpath-utilisation table (21/73), and `lane-library.md` **§4.3 Tier C** (ad-hoc regexes over CSS-ish text) + **§4.6** (demo parse consumers / the R1 crash surface). One explicit contradiction of a lane row is recorded in §3.

---

## 1. DEFECTS

### C-1 — **BLOCKER** · every gesture this component owns is inert in the scene's documented entry state

**Claim.** SpringTarget's entire interaction surface — the pointer scrub, the keyboard slider, and the double-tap derby egg — drives the injected facility through `reseat()` / `derby()`, both of which only *arm* an rAF loop whose very first frame self-terminates whenever the scene machine is not `playing`. The spring scene's documented entry state **is** not-playing. The spring therefore never ticks, and the protagonist ball never moves, until the user separately finds the transport Play button.

**Provenance (the full chain, each link source-verified):**

| # | file:line | fact |
|---|---|---|
| 1 | `SpringTarget.vue:241` | `onScrub: (ratio) => demo.reseat(ratio)` — the drag seam's only effect |
| 1b | `SpringTarget.vue:250` | `onDoubleTap: () => { demo.derby(); }` |
| 1c | `SpringTarget.vue:254-268` | `onKeydown` → `demo.reseat(...)` ×4 (Arrow/Home/End) |
| 2 | `useSpringDemo.ts:294-300` | `reseat` = clamp → write `target`/`liveSpring.target`/`tracks[].target` → `startLoop()`. **No play dispatch.** |
| 3 | `useSweepScene.ts:82-86` | `startLoop = () => { if (!playback.running) { onArm(); playback.loop(frame) } }` — arms rAF, nothing else |
| 4 | `useSpringDemo.ts:197-206` | `frame()` **first statement**: `if (machine.status.value !== "playing") { flushReadouts(); paintScrubberPhase(); …; return false; }` |
| 5 | `useSpringDemo.ts:214` | `liveSpring.tickDt(dt)` — the **only** call site that advances the solver, reached only past link 4 |
| 6 | `SpringScene.vue:194` | the scene exposes `autoPlays: false` |
| 7 | `useSceneMachineShellBinding.ts:206-209` | `PLAY` is dispatched on entry **only** for `autoPlays === true` **or** `autoPlayNext` |
| 8 | `useSceneMachineShellBinding.ts:251-254` | `autoPlayNext` is set **only** by the home start-screen Play gesture (which navigates to `cube`, not `spring`) |
| 9 | `sceneMachine.ts:96-99, 122-126` | `freshSnapshot().playing === false`; `SCENE_READY` → `status = snap.playing ? "playing" : "paused"` |

Cold entry to `/spring` from the scene-switcher dock therefore lands on `status === "paused"`. Tap the rail: `target` moves (the dashed ghost marker at `SpringTarget.vue:87-90` re-renders, `aria-valuenow` at `:67` updates), the loop arms, frame 1 returns `false`, and `tickDt` is never called. The readout stays `0.000`, the badge stays `tracking`, the ball stays parked at `translateX(0cqw)` (the one paint `usePainterRegistry.registerPainter` performs at registration time). Double-tap: the four derby lanes fade in, race nothing, and fade out ~2.3 s later on `useSpringDerby.ts`'s timers.

**The component holds the cure and does not use it.** `demo.play` / `demo.togglePlay` are in the injected context (`useSpringDemo.ts:483-485`); `SpringTarget.vue` references neither. This is a *consumption* defect precisely: the component consumes `reseat`/`derby` as if they were self-arming verbs, and the facility does not honour that contract.

**Self-contradiction in the tree.** `SpringScene.vue:192-193` asserts the opposite in prose — *"The sampler sweeps + the ball springs the instant the user presses Play (or taps the rail — `reseat` re-arms the loop directly)."* `reseat` re-arms the **loop**; the loop is gated on the **machine**; the parenthetical is false.

**Falsifiers (any one kills this).**
1. Cold-load the spring scene and tap the rail — if the ball springs to the tapped position, the claim is dead. `UNPROVEN-NEEDS-LIVE` as an *observation*; the code path above is statically complete.
2. Any path I did not find that dispatches `PLAY` on spring entry (I searched every `autoPlays` and `autoPlayNext` writer, and every `machine.dispatch({type:"PLAY"})` site).
3. A returning visitor whose `perScene.spring` snapshot already carries `playing: true` — this is a **real narrowing**, and I concede it: the defect is scoped to first entry and to any entry after a pause. That is the default path, not an edge.

**Severity rationale.** The component's single primary affordance, carrying `role="slider"` and `aria-label="Drag to re-seat the spring target"`, does nothing for its advertised value on first contact. Nothing lower than BLOCKER fits.

---

### C-2 — **MAJOR** · `SpringTrace` mis-implements the CSS `linear()` implicit-position rule it cites; both plot endpoints are wrong

**Claim.** `SpringTrace.vue:50-86` re-parses the string `springLinearStops()` emits and fills implicit stop positions in the **wrong order** relative to the CSS rule its own comment quotes. The even-distribution pass runs *before* the first/last anchoring, so the anchors at `:76-79` are dead code. Result: the trace starts at `x = 2` and ends at `x = 98` in a `viewBox="0 0 100 60"` — the curve never touches the plot's left or right edge, and the "value 0 at t=0 / value 1 at t=100%" reading the whole sub-unit exists to show is off by 2% at both ends.

**Provenance.**
- `SpringTrace.vue:47-49` — comment: *"Stops without an explicit % are distributed evenly (the CSS linear() rule); the FIRST/LAST implicit stops anchor 0% / 100%."*
- `SpringTrace.vue:59-75` — the distribution loop (`span = j - i + 1`, `pts[k].pct = lastPct + ((nextPct - lastPct) * (k - i + 1)) / span`), which assigns a **non-null** value to the leading and trailing runs.
- `SpringTrace.vue:76-79` — `pts[0].pct = pts[0].pct ?? 0; pts[n-1].pct = pts[n-1].pct ?? 100;` — both `??` right-hand sides are unreachable.
- `src/animation/physics/spring/css/linear-stops.ts:46-70` — the emitter: `stops = ["0", …24 explicit-% stops…, "1"]`, so exactly the first and last stops lack a percentage; interior positions are `(i/25)*100` → `4.000% … 96.000%`.

**Repro (executed against the emitter's exact shape, `sampleCount` default 24 → n = 26):**

```
n = 26
first stop x = 2.0     ← should be 0
second stop x = 4.0
penultimate x = 96.0
last stop x = 98.0     ← should be 100
```

Per CSS `linear()`, a missing first input-progress is set to `0%` and a missing last to `100%` **before** interior runs are distributed. The code inverts that order.

**Corpus tie-in.** This is `lane-library.md` **§4.3 Tier C** ("ad-hoc regex parsing of CSS-ish text") crossing the library boundary into the demo, and it is the same shape as the Tier-C row `emit/view-transition.ts:146` — *"re-parses kf's own emitted declaration body with a regex to recover `{prop, value}` pairs — a serialize→regex-reparse round trip."* Here the round trip is **cross-package**: `sampleNormalizedSpring` (numeric) → `springLinearStops` (string) → demo regex (numeric again).

**Aggravating, and not the component's fault.** keyframes.js publishes **no numeric spring sampler**. `sampleNormalizedSpring` (`src/animation/physics/spring/solver/sample.ts:47`) is internal; `src/animation/physics/spring/index.ts:27` and `src/animation/index.ts:52-54` export only `springLinearStops` + `springTimingFunction`, and the package exports map is `{".", "./engine"}`. The demo *cannot* consume the stops as data. The parser is forced; the bug in it is not.

**Falsifier.** Any execution trace in which `pts[0].pct` is still `null` when line 77 runs (i.e. the distribution loop skips the leading run). I could not construct one for any `springLinearStops` output. A change to the emitter that gives stop 0 an explicit `0%` would also kill this.

---

### C-3 — **MAJOR** · the rail is the only pointer-drag surface in the demo without `touch-action: none`

**Claim.** `.spring-rail` (`SpringTarget.vue:61-73`, scoped rule `:298-306`) carries `cursor-pointer select-none` and a full `useDragScrub` gesture, but never declares `touch-action`. It inherits `body { touch-action: manipulation }` (`styles/style.css:219`), which suppresses double-tap-zoom but **still permits pan** — so on touch the UA may claim the gesture and deliver `pointercancel` mid-drag. Every sibling drag surface in the demo declares `touch-action: none`; this one does not.

**Provenance — the 1-of-7 census (`grep -rn "touch-action\|touch-none" demo/scenes demo/components`):**

| surface | declaration |
|---|---|
| `scenes/cube/CubeScene.vue:12` | `style="touch-action: none; overscroll-behavior: contain"` |
| `scenes/cube/CubeTarget.vue:4` | same |
| `scenes/cube/orbital-drag/OrbitalDrag.vue:350` | `touch-action: none;` |
| `scenes/square/SquareScene.css:62-64` | `touch-action: none;` + comment *"the cursor + touch-action carry the drag posture"* |
| `scenes/amiga/AmigaScene.vue:249-254` | `touch-action: none;` + comment naming the sphere-spin pointer |
| `scenes/sequence/SequenceTarget.css:134` | `touch-action: none;` |
| `components/instrument/timeline/components/TimelineTrack.vue:24` | glass-ui's published `touch-none` utility |
| **`scenes/spring/SpringTarget.vue:298-306`** | **absent** |

**Design-system angle (why this is a consumption finding, not a CSS nit).** glass-ui 7.0.0 publishes both halves of the cure and SpringTarget consumes neither: the `touch-none` utility (`dist/styles/components.css`) and `useTouchGate` (root barrel; consumed at `components/playback/PlaybackRibbon.vue:134` and `components/playback/AnimationVisualizer.vue:81`). The demo already knows how to reach both.

**The tension with S-4 (stated, not hidden).** `useDoubleTap` was written *specifically* for touch parity — `useDoubleTap.ts:8-18` argues at length that native `dblclick` is unreachable on mobile. Attaching that recognizer to the one surface that omits the touch-drag posture is a seam half-consumed.

**Falsifier.** On a real touch device, drag the rail through a full sweep: if the ball tracks the finger with no `pointercancel`, the symptom is dead. This is genuinely plausible — `html, body { overflow: hidden; overscroll-behavior: none }` (`style.css:217-218`) may leave nothing to pan, in which case the UA never steals the gesture. **`UNPROVEN-NEEDS-LIVE` for the symptom.** The 1-of-7 inconsistency is statically certain regardless, and the fix is one declaration.

---

### C-4 — **MAJOR** · the rationale comment claims adoption of a glass-ui component that does not exist (S-9 nomination)

**Claim.** `SpringTarget.vue:17-22` states the readout *"promotes from one 12px muted caption to the published **MetricBadge** register: the headline x at the `size="xl"` audacious-poster rung."* There is no `MetricBadge` in glass-ui — not in the installed 7.0.0 artifact, not in the producer source — and the code consumes no metric component at all. The header is hand-rolled markup (`:33-52`).

**Provenance.**
- `node_modules/@mkbabb/glass-ui/dist/components/metric/index.d.ts` exports exactly `Metric`, `MetricCell`, `MetricRow`, `MetricStack` (+ types). `grep -rl MetricBadge node_modules/@mkbabb/glass-ui/dist` → **0 files**.
- `grep -rn MetricBadge /Users/mkbabb/Programming/glass-ui/src` → **0 hits**. The producer never shipped it.
- `dist/components/metric/types.d.ts`: `MetricSize = "sm" | "md" | "lg" | "xl"` — the `size="xl"` half of the sentence is real, which is what makes the component name look credible.
- What the code actually renders: `SpringTarget.vue:39-40` (`<span class="text-mono-small">x</span>` + `<span class="spring-readout-primary">`), `:44-50` (a `.status-badge` span + a `.text-mono-caption` span). Zero `Metric*`.
- The sibling **does** consume it: `scenes/sequence/SequenceTarget.vue:138` — `import { Metric } from "@mkbabb/glass-ui/metric";` (`lane-frontend.md:127, 242`).

**Why MAJOR on this axis, with the runtime caveat stated plainly.** Runtime impact is **nil** — the hand-rolled markup renders correctly and its tokens all resolve (see S-3). The severity is entirely about the consumption seam: (a) the file's load-bearing design rationale asserts an adoption that never happened, which will mislead the next reader and any oracle that reads the clause; (b) `/metric` is one of the 52 unreached subpaths in `lane-frontend.md` §3.1 while a sibling scene reaches it, i.e. an *intra-repo* inconsistency, not merely an unreached export. This is the S-1..S-8 shadow pattern exactly, so: **S-9 · `SpringTarget` header readout → `@mkbabb/glass-ui/metric` (`Metric size="xl"` + label/value/context slots)**, ~20 lines of markup, AMBER — evaluate, do not mechanically swap (the `.status-badge` AA-contrast mix at `design-idioms.css:213-235` is load-bearing and `Metric` has no badge affordance).

**Falsifier.** Find `MetricBadge` in any glass-ui version this demo could resolve — the phantom install (F-1) means no lockfile pins the version, so an older tree is not impossible. I checked the only two artifacts that exist on disk (installed 7.0.0, producer `src/` at 7.0.0) and neither has it.

---

### C-5 — **MINOR** · the ghost marker animates `left` on the pointermove path, against the law this file declares three lines later

**Claim.** `SpringTarget.vue:87-90` binds `:style="{ left: \`calc(${demo.target.value * 100}% )\` }"` on `.spring-target-marker`. The same file's painter comment (`:199-205`) states the T.G4 law: *"position by `transform: translateX(<cqw>)`, **NEVER** `left`. Animating `left` re-LAYS-OUT every frame (the born-RED spring layout thrash)."* During a rail drag, `useDragScrub` fires `onScrub` on **every** `pointermove` (`useDragScrub.ts:131-134`) → `reseat` → `target.value` → one `left` write per pointer sample, i.e. one layout of the rail's containing block per sample.

**The defence, and why it only half-works.** The inline comment at `:85-86` calls the marker *"a DISCRETE position (re-seat events), so it stays reactive."* That is true for a tap and for the arrow keys. It is false for a drag: pointer samples arrive at ≈frame rate and, with coalesced events, can exceed it.

**Falsifier.** A performance trace during a rail drag showing no `Layout` attributable to `.spring-target-marker` (`UNPROVEN-NEEDS-LIVE` for magnitude — one absolutely-positioned element in a small subtree is cheap). What is *not* falsifiable by opinion: `left` is a layout-inducing property by spec, and this write is on the drag path the file's own law names.

---

### C-6 — **MINOR** · root-barrel glass-ui import where the granular subpath exists and has zero consumers

**Claim.** `SpringTarget.vue:162` — `import { Card } from "@mkbabb/glass-ui";` — resolves the root barrel while `@mkbabb/glass-ui/card` exists and is reached by **nobody** in the demo.

**Provenance.**
- `dist/glass-ui.js` = 23,938 B, **44** static chunk imports (`grep -c "^import" dist/glass-ui.js` → 44).
- `dist/card.js` = 217 B, **1** chunk import, exporting the full `Card*` family.
- `grep -rn "glass-ui/card" demo` → **0 hits**. The subpath is published and unused.
- Idiom split inside single files: `scenes/easing/EasingTarget.vue:136-139` takes `Card` from the root and `FadingScroll`/`ToggleGroup` from subpaths; `scenes/sequence/SequenceTarget.vue:136-138` takes `Button, Card` from the root and `Metric` from `/metric`. `lane-frontend.md` §3.1 counts 31 root-barrel imports against 21 reached subpaths.

**Inherited context, deliberately not re-counted.** This import is also the per-file instance of **F-1** (`lane-frontend.md:15, 54-69`): `@mkbabb/glass-ui` is absent from `package.json` **and** `package-lock.json` while 7.0.0 sits in `node_modules`. `npm ci` cannot resolve line 162. That is a lane-level RED, already booked, and I do not double-count it against this component.

**Falsifier — I expect part of this claim to die.** glass-ui declares `sideEffects: ["*.css"]` and the barrel is pure re-export, so a production Rollup pass should tree-shake it to parity. A `vite build --mode gh-pages` byte-diff between the root-barrel and `/card` import showing **no delta** kills the weight half outright, leaving only dev-server cold-start (which is INFO, not MINOR) and the idiom inconsistency (which survives either way). I grade MINOR on that surviving half and flag the rest as probably-dead.

---

### C-7 — **MINOR** · the display-tier numeral is hand-rolled off the published type ladder it names

**Claim.** `.spring-readout-primary` (`SpringTarget.vue:287-296`) reimplements a display rung with raw literals while its own rationale (`:281-286`) names glass-ui's *"audacious-poster register"*.

| property | this file | glass-ui `@utility text-display-audacious` |
|---|---|---|
| `font-size` | `clamp(2.25rem, 6cqi, 3.25rem)` | `var(--type-display-audacious)` |
| `letter-spacing` | `-0.01em` | `var(--type-tracking-display)` |
| `line-height` | `1` | `var(--type-leading-display)` |
| `font-weight` | `var(--font-weight-semibold, 600)` | `var(--type-weight-display)` |
| `font-family` | *(unset → body register)* | `var(--font-display)` |

Provenance: `node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css` (`@utility text-display-audacious { font-family: var(--font-display); font-size: var(--type-display-audacious); … }`). The same file consumes the ladder correctly one line up — `SpringTarget.vue:35` uses `text-display` for the scene name.

**Two of the five deltas are justified and I concede them.** (a) Omitting `--font-display` is *correct*: the display face is Instrument Serif and this is a `tabular-nums` numeral. (b) `6cqi` is container-relative and the ladder's tokens are not — the ladder genuinely cannot express a container-query-responsive numeral. What remains unjustified is `letter-spacing: -0.01em` where glass-ui publishes `--type-tracking-tight` (`dist/styles/components.css`, surfaced as `.tracking-tight`), and the two raw `rem` bounds where `--type-display-*` tokens exist as consumable custom properties.

**Falsifier.** Show that `--type-display-*` / `--type-tracking-tight` are not consumable outside their `@utility` wrappers (they are plain custom properties in `dist/styles/tokens/`, so I believe they are), or that the numeral's optical tracking genuinely differs from the tight rung.

---

### C-8 — **MINOR** · the derby's overshoot — "the point" of the egg — is clipped by the Card at narrow widths

**Claim.** The bouncy lane is deliberately allowed to ring past the target line: `SpringTarget.vue:220-223` clamps the lane ball to `1.18` *"so the ring is seen."* The lane overlay spans the rail (`.derby-lanes { left: 0; right: 0 }`, `:404-407`), the rail is `w-full` inside the `max-w-3xl` column, and the whole thing sits inside a `Card` carrying `overflow-hidden` (`:12`). At narrow viewports the available bleed is the Card's `px-6` padding — far less than the 18% the ball is permitted to travel.

**Arithmetic (source-derivable).** At 375 px viewport: card content width ≈ 375, `px-6` = 24 px per side → rail width ≈ 327 px. Overshoot budget before the Card clips = 24 px = **7.3%** of the rail. Ball travel = **18%** ≈ 59 px, plus `margin-left: calc(var(--ball-size) / -2)` = −6.4 px (`:436-443`). For the `bouncy` preset (ζ = 0.45) the first peak is `exp(−πζ/√(1−ζ²))` = `exp(−1.583)` ≈ 1.205 → clamped to 1.18, i.e. the clamp is reached. `max-w-3xl` = 48 rem does not bind below 768 px, so nothing recovers the space.

**Falsifier.** Measure at 375 w: if the distance from the rail's right edge to the Card's clipping edge exceeds 18% of the rail width, the claim dies. From the class list it is exactly `px-6` = 24 px, which does not. `UNPROVEN-NEEDS-LIVE` for the rendered threshold; the class arithmetic is static. Also dies if `.spring-rail`'s own box, not the Card, is the effective clip (it declares no `overflow`, so it is not).

---

### C-9 — **INFO** · the injected context is asserted, never guarded — but this is the house idiom, not a SpringTarget deviation

`SpringTarget.vue:169` — `const demo = inject(SPRING_DEMO_KEY)!;` — no default, no named throw. Mounted outside `SpringScene`'s `provide` it yields `TypeError: Cannot read properties of undefined (reading 'liveValue')` at first render, with no seam name in the message.

**Why INFO and not MINOR.** Two facts defend it. (1) It is currently unreachable: the only mount site is `SpringScene.vue:10`, inside the `provide` at `:32` (`grep -rn SpringTarget demo` → one import, one mount, rest are prose). (2) It is the *uniform* idiom — `EasingTarget.vue:152`, `SequenceScrubber.vue:47`, `SequenceTarget.vue:150`, `StartingStyleTarget.vue:96` are byte-identical in shape, and the demo has no `injectStrict` helper. Charging SpringTarget for a repo-wide convention would be a false defect. **This belongs to the lane, not to this component**, and I record it only so the lane can own it.

---

### C-10 — **INFO** · two data-flow contracts inside one two-file unit

`SpringTarget` has **zero** props and **zero** emits — its entire input surface is the injected context. It then prop-drills two scalars into its own colocated child: `SpringTarget.vue:152-155` → `SpringTrace.vue:37` (`defineProps<{ response: number; dampingFraction: number }>()`), where the child could equally `inject(SPRING_DEMO_KEY)`.

**Not graded as a defect** because the child's choice is the *better* one — `SpringTrace` is a pure `(response, ζ) → path` function and its prop contract makes it independently testable, whereas the parent's zero-prop shape makes it untestable in isolation and non-reusable outside `SpringScene`. The finding is the *asymmetry* being undeclared: nothing in either file says which idiom is intended for new siblings. Falsifier: a scene-authoring convention doc that states the rule (I found none under `demo/`).

---

## 2. SUPERLATIVES (L-18, running the other way)

### S★1 — the value.js edge is a true leaf; the R1 parser crash class is **unreachable** from this component

`SpringTarget.vue:163` — `import { clamp } from "@mkbabb/value.js/math";` — is the single value.js consumption, and it is exactly right.

- `node_modules/@mkbabb/value.js/dist/subpaths/math.js` contains **nine pure functions and zero import statements**. No `/css`, no `/color`, no parser, no `ValueUnit`. Package declares `sideEffects: false`.
- The exports map publishes `/math` as a first-class subpath (7 subpaths total) — this is the granular consumption the producer designed for, taken.
- keyframes.js declares `"@mkbabb/value.js": "4.0.0"` as a real `dependencies` entry (not dev, not peer) and does **not** re-export `clamp`, so reaching past the engine to value.js is correct rather than a bypass.
- **Cross-check against the corpus:** `lane-library.md` §4.6 enumerates the demo's parse consumers and names the R1 surface explicitly — `demo/scenes/square/useSquareTumble.ts:22  parseCssColor(css) ← the known R1 crash surface`. **No spring file appears in that list.** The R1 class *is* live in the spring scene's wider neighbourhood (`useSpringKeyframesEditor.ts` and `useCompiledEntry.ts` build `CSSKeyframesAnimation`, and the engine imports `@mkbabb/value.js/css` 29× / `/color` 7×) — but no code path SpringTarget drives reaches it. `springLinearStops` and `springTimingFunction` are numeric end to end.

**Falsifier.** Any transitive import from `dist/subpaths/math.js` into `/css` or `/color`; or a `parseCssColor`/`parseCssScalar` call reachable from `SpringTarget` or `SpringTrace`. Neither exists.

### S★2 — the painter seam is a genuinely correct 60 Hz contract, and it is the best thing in the file

`SpringTarget.vue:196-228`. Register on `onMounted`, keep the returned unsubscribe, release on `onScopeDispose`. The painter writes `el.style.transform = translateX(<n>cqw)` directly (`:206-224`) against elements whose ancestors declare `container-type: inline-size` (`:302-306` for the rail/track, `:422-424` for each lane) — so the value axis stays rail-relative with **no per-frame `getBoundingClientRect`** and no layout. The four derby balls ride the *same* painter off `springLive.trackValues` — no second rAF, no second writer. `usePainterRegistry.registerPainter` paints once at registration, so the ball is seated before frame 1. The only reactive positional binding in the file is the discrete ghost marker (C-5), and the reactive readouts (`:40`, `:47`, `:49`, `:139`) are the deliberate few-Hz mirrors from `useSpringHotPath`, not hot-path reads.

**Falsifier.** A reactive binding on a per-frame-changing value, or a `will-change`-less transform target, or a painter that outlives its component. None present.

### S★3 — every token and utility it reaches actually resolves; zero dangling `var()`

Verified individually against the installed artifacts, not assumed:

- glass-ui `@utility`: `text-display` (`dist/styles/typography/semantic.css`), `text-mono-small` / `text-mono-caption` (`typography/utilities.css`), `text-admin-label` (`typography/semantic.css`), `text-small` (`components.css`).
- glass-ui tokens: `--z-content` (`tokens/scheme-motion.css`), `--ease-standard` (`tokens/scheme-spring.css`), `--duration-fast` (`tokens/scheme-motion.css`), `--radius-pill` (`theme/radius.css`), `--font-weight-semibold` (`components.css`), `--rainbow-*` (`tokens/scale-paper.css`).
- demo idioms: `.progress-rail` / `.progress-ball` (`design-idioms.css:166-186`), `.status-badge` / `.settled-badge` / `.tracking-badge` (`:218-236`), `.stage-field-x` (`:205`), `.readout-accent` (`:190`), `.code-token` (`:245`), `.focus-ring` (`:76`), `--color-progress` (`style.css`), `--spring-lane-{smooth,snappy,bouncy,gentle}` (`design-idioms.css:28-31`).

The last row is load-bearing and was the sharpest defect candidate I chased: `:113` sets `--ball-tone` **to a `var()` reference** (`lane.tone === "var(--spring-lane-bouncy)"`, `useSpringDerby.ts:11-16`). Had any `--spring-lane-*` been undefined, that declaration would be invalid-at-computed-value-time, the custom property would become guaranteed-invalid, `var(--ball-tone, var(--color-progress))` would take the fallback on **every** lane, and all four rainbow lanes would render identically red — a silent, total loss of the egg's payload. All four tokens exist. See §4.

**Falsifier.** One undefined custom property or one unmatched utility class.

### S★4 — the double-tap egg is on the right primitive and is provably drag-disjoint

`SpringTarget.vue:247-252` consumes `useDoubleTap` — a pointerup-counting recognizer (300 ms window, 12 px `moveTolerance`) — rather than native `@dblclick`, on the *same element* that carries `useDragScrub`. The two seams cannot fight: `useDoubleTap.ts:70-73` zeroes the pending tap the moment `moved` is set, so a scrub can never launder into a derby launch, and `useDragScrub.ts:144-147` routes `pointercancel` through the same end path so a stolen gesture cannot strand `body.is-dragging`. Sharing one element between a continuous and a discrete recognizer is where most demos get a double-fire; this one does not.

**Falsifier.** A pointer sequence that both scrubs and fires `onDoubleTap`. The `moved` reset forecloses it. Noted honestly: C-3 undercuts the *touch* half of the rationale this composable was written for.

### S★5 — `:shadow="false"` is a real typed prop, and the comment's tier claim is true by default

`SpringTarget.vue:11` writes one prop. It resolves: `CardProps extends SurfaceProps` (`glass-ui/src/components/card/Card.vue:15`), `shadow?: boolean` (`Surface.vue:24-30`), forwarded as `:shadow="shadow && !cartoon"` (`Card.vue:74`). And the header comment's parenthetical *"`tier="resting" surface="glass"`, rounded-card by construction"* (`:4-6`) is **accurate without either prop being written**: `Card` defaults `material: "elevated"` (`Card.vue:29`), `Surface` maps `MATERIAL_TIERS.elevated → "resting"` (`Surface.vue:47-52`), and `surface` defaults to `"glass"` (`Card.vue:30`). A design-rationale comment that correctly describes a *derived* value is rarer than one that describes a written one.

**Falsifier.** A glass-ui default change (the phantom-dependency F-1 means nothing pins this — the comment is true against the installed 7.0.0 and unpinned against anything else).

---

## 3. Contradiction of the hitherto corpus

`lane-frontend.md:235` classes `spring/SpringTarget.vue` as **G** ("glass-consuming") with the annotation `spring subject — Card`. **The tree agrees on the letter and understates the fact.** `Card` is indeed the only glass-ui *component* imported, but the file additionally consumes five glass-ui `@utility` typography classes (`text-display`, `text-mono-small`, `text-mono-caption`, `text-admin-label`, `text-small`) and six glass-ui design tokens — none of which the §3 census counts, because the census greps `@mkbabb/glass-ui` import lines and CSS-utility consumption leaves no import. This is not an error in the lane; it is a **measurement blind spot** worth booking: the demo's real glass-ui coupling is larger than the 82-line / 42-file import census shows, and any S-wave that reasons about "21 of 73 subpaths" from import lines alone will under-estimate the blast radius of a `styles/typography` change. I raise it because it cuts against my own C-4 and C-7 (the file consumes *more* design system than the census credits it with), not for it.

---

## 4. Killed candidates (assumed-defective, then falsified by the tree)

Recorded so the next auditor does not re-chase them.

1. **`--ball-tone` set to a `var()` reference → invalid-at-computed-value → all four derby lanes collapse to one red.** The mechanism is real (`SpringTarget.vue:113`, `useSpringDerby.ts:11-16`, `design-idioms.css:177-186`). Killed: all four `--spring-lane-*` tokens are defined at `design-idioms.css:28-31`. Promoted to S★3 instead.
2. **`Card` header comment cites `tier`/`surface` props the code never passes → stale comment.** Killed: both are accurate glass-ui defaults; see S★5.
3. **Function-`ref` in `v-for` (`SpringTarget.vue:117`) leaks or strands stale nodes across the `v-if` toggle.** Killed: Vue invokes the ref with `null` on unmount, `setDerbyBallEl` nulls the slot (`:187-189`), and the painter's `if (el)` guard (`:219`) covers the gap. The 4-slot array never grows.
4. **The painter registered in `onMounted` outlives a Suspense-discarded setup.** Killed: `unregisterPainter` stays `null` if `onMounted` never runs, and `onScopeDispose` no-ops on it (`:196`, `:228`).
5. **`role="slider"` missing required ARIA.** Killed: `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `tabindex="0"` all present (`:65-70`), children are presentational and the derby overlay is `aria-hidden` (`:107`). (`PageUp`/`PageDown` are absent from `onKeydown`, but APG lists them optional — not a defect, and out of axis.)
6. **Reactivity mis-read: `demo.liveValue.value` in template implies a broken unwrap.** Killed: `inject()` returns a plain object, whose ref properties are *not* template-unwrapped, so the explicit `.value` is correct at every site.

---

## 5. What a repair wave should touch, in order

1. **C-1** — the gesture seam must dispatch play intent, or `reseat`/`derby` must. One line either in `SpringTarget.vue:233-252` (`demo.play()` alongside `demo.reseat`) or in `useSpringDemo.ts:294-300`. Nothing else in this list matters while the rail is inert. Decide ownership explicitly: the facility exposing a self-arming `reseat` is the cleaner contract.
2. **C-3** — one declaration on `.spring-rail`, matching the six siblings.
3. **C-2** — hoist the first/last anchoring above the distribution loop in `SpringTrace.vue:59-79`. Separately, and larger: keyframes.js should publish `sampleNormalizedSpring` so the demo consumes stops as **data**, deleting the regex entirely (a `lane-library.md` §4.3 Tier-C retirement that reaches across the package boundary).
4. **C-4** — either adopt `@mkbabb/glass-ui/metric` (S-9) or delete the sentence. Do not leave a rationale that names a component nobody ships.
5. **C-5 / C-7 / C-8** — cheap, independent, each one edit.
6. **C-6** — hold until **F-1** lands. Nothing about glass-ui resolution is reproducible until `@mkbabb/glass-ui` is declared and locked (`lane-frontend.md:612`).
