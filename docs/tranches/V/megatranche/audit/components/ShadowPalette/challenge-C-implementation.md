# CHALLENGE-C — `ShadowPalette.vue`: the implementation is defective

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5 seat,
spawned with an explicit Opus 5 declaration. Not an inherited or undeclared seat.

- Subject: `demo/palettes/browser/card/ShadowPalette.vue` (115 lines)
- Sole consumer: `demo/workbenches/extract/ExtractWorkbench.vue:159`
- Sole gate: `e2e/smoke/oracles/o9-shadow-palette.spec.ts`
- Repo HEAD at audit: `ed047306`→`06377848` (branch `tranche-u`, moving — concurrent doc commits from
  other seats). The task named `c654824e`; verified that nothing since it touches this component:
  `git log --oneline c654824e..HEAD -- demo/palettes/browser/card/ShadowPalette.vue
  e2e/smoke/oracles/o9-shadow-palette.spec.ts demo/workbenches/extract/` → **empty**.
- Live probes: `http://localhost:9000/#/extract`, Playwright, read-only

---

## VERDICT: **DEFECTIVE**

The component is 115 lines with no imports, no async, no listeners, no rAF, no WebGL, no network, and
nothing to leak. Its entire behaviour is one thing: **a staggered pulse cascade whose stagger is a
function of the `count` prop.** That one thing is measurably broken in three independent ways, and
its gate cannot see any of them.

The mechanism is single and structural: the choreography is expressed as a **per-element declared
`animation-delay`, computed in the template from `count`.** A declared delay is meaningful only
relative to (a) the element's own animation start time and (b) the animation period. The component
controls neither. So the wave is destroyed by node insertion (C-1), teleported by delay mutation on
running animations (C-2), and folded back on itself past `count ≥ 9` (C-3).

---

## C-1 — **the cascade shatters on every k change** (MAJOR)

**Defect.** `count` is threaded LIVE from the k slider (`ExtractWorkbench.vue:159` ←
`useExtractSession.ts:44,171`, slider domain `min=1 max=16 step=1`, `ExtractControls.vue:27-30`).
When k rises, `v-for="i in count" :key="i"` appends new nodes. Each new node's CSS animation starts at
its **own insertion time**, not at the plate's mount time — but its declared delay
(`(i-1)*0.12s`) is written as if all nodes shared one origin. The "LIVING cascading shimmer that
travels the plate … one wave" (template comment, lines 11-13) is destroyed by the exact interaction
the component exists to serve.

**Reproduction** (live, `http://localhost:9000/#/extract`):

```js
// 1. raise k from 5 to 12 (seven ArrowRight presses on the "Number of colors" thumb)
// 2. read the real animation state, not the declared style:
const g = document.querySelector('[data-slot="shadow-palette"]');
const read = (sel) => Array.from(g.querySelectorAll(sel)).map((el, i) => {
  const a = el.getAnimations()[0];
  const ct = a.currentTime, d = a.effect.getComputedTiming().delay, dur = a.effect.getComputedTiming().duration;
  return { i, declDelay: getComputedStyle(el).animationDelay, startTime: Math.round(a.startTime),
           phaseMs: Math.round((((ct - d) % dur) + dur) % dur) };
});
```

**Measured output (k = 12).** A single wave requires ONE time origin and a monotone phase chain.
Neither holds:

```
distinctStartTimes: [646935, 699543, 699585, 699626, 699668, 699710, 699751, 699793]   // EIGHT origins
chainPhases (segs → meta → swatches, ms within the 2000 ms period):
  [716, 596, 476, 356, 236,  1508, 1346, 1185, 1023, 861, 700, 538,
   1176, 1056,  936, 836, 736, 636, 536,  1828, 1686, 1545, 1403, 1261, 1120, 978]
consecutive deltas:
  [-120,-120,-120,-120,  +1272,  -162,-161,-162,-162,-161,-162,  +638,
   -120,-120,  -100,-100,-100,-100,  +1292,  -142,-141,-142,-142,-141,-142]
```

Three `+1272 / +638 / +1292 ms` discontinuities where a wave admits only negative steps. The
originally-mounted cells step a clean −120 ms; the seven cells inserted by the seven key presses step
−161 ms (their 42 ms-apart insertion times add to the declared 120 ms ladder). At the instant of
measurement, seg #5 sat at opacity 0.940 and its immediate neighbour seg #6 at 0.757 — a visible seam
in the middle of the strip.

Worse, a newly inserted cell honours its full positive delay **from insertion**: at k=12 the last
swatch waits 2.88 s at opacity 1 — bright and static — while every neighbour breathes.

**Mechanism.** Time-origin-dependent choreography expressed as origin-independent geometry.

**Cure.** See the gestalt cure below — a single time origin for the plate (`:key` on the instrument
face) plus a period-normalized negative-delay ladder.

---

## C-2 — **every k tick teleports the phase of the already-running blocks** (MAJOR)

**Defect.** The meta and swatch delays are functions of `count`
(`ShadowPalette.vue:63,67,77` — `count * 0.12 + 0.1`, `+ 0.22`, `+ 0.34 + (i-1)*0.1`). Those elements
are **not** re-created when k changes — only their `animation-delay` is rewritten, mid-flight, on a
running animation. Per CSS Animations, phase = `(currentTime − delay) mod duration`, so mutating the
delay re-seats the phase instantaneously. Result: an opacity pop on `2 + count` elements per k tick,
and 15 pops across a full slider drag.

**Reproduction** (one ArrowRight, k 5→6, two rAFs apart):

```
before: { startTime: 21249, currentTime: 1134, delayMs: 700, phase: 434, opacity: 0.805 }
after : { startTime: 21249, currentTime: 1150, delayMs: 820, phase: 330, opacity: 0.883 }
wallElapsedMs: 14      animationRestarted: false      opacityJump: +0.078
phaseAdvanceMs: 1896   discontinuityMs: 1882          (i.e. the phase ran BACKWARD 120 ms in 14 ms)
```

`animationRestarted: false` (identical `startTime`) is the proof: the same running animation had its
delay changed from 700 ms to 820 ms and its phase teleported by exactly the delta. This is not a
re-mount, it is a discontinuity injected into a live animation.

**Mechanism.** Mutating a timing input of a running animation as if it were a static layout value.

---

## C-3 — **the delay ladder outruns the period; the wave folds back on itself** (MAJOR)

**Defect.** `animate-pulse` is Tailwind v4's `pulse 2s cubic-bezier(.4,0,.6,1) infinite`
(`node_modules/tailwindcss/theme.css:440`, keyframe at `:457`). The plate's longest declared delay is

```
maxDelay(count) = count*0.12 + 0.34 + (count-1)*0.1  =  0.22*count + 0.24   seconds
```

which exceeds the 2 s period at **count ≥ 9** — eight of the slider's sixteen positions. Past that the
delays wrap modulo the period and the "strip → meta → swatches, one wave" ordering (template comment,
line 12) inverts.

**Reproduction / measurement (k = 12, restricted to the ONE original time origin `startTime: 646935`,
so C-1 cannot be the cause):**

| element | declared delay | measured phase |
|---|---:|---:|
| `.shadow-seg` #1 (the wave's leading edge) | `0s` | **716 ms** |
| `.shadow-swatch` #3 (the "last exposure pass") | `1.98s` | **736 ms** |
| `.shadow-swatch` #5 | `2.18s` | 536 ms |
| `.shadow-seg` #4 | `0.36s` | 356 ms |

Swatch #3 and strip cell #1 are **20 ms apart in phase** — they pulse together. Swatch #5 fires
*before* seg #4. The plate's stated choreography is not merely degraded at k ≥ 9; it is inverted.

**Mechanism.** An unbounded delay ladder driven into a bounded (2 s) periodic animation.

---

## C-4 — **the ink ladder below the strip was never certified; the swatch rung is invisible** (MAJOR)

**Defect.** `ShadowPalette.vue:92-102` claims the E1-R2 remediation "CERTIFIES the block as a bounded
tone-step of this plate's `bg-well` ground … the dark seg-vs-well collapse (1.02:1) is dead". That
certification covers `--skeleton-ink` at full strength — i.e. **`.shadow-seg` only**. The three rungs
below it (`60% / 40% / 30%`, lines 106-114) were never measured against the ground.

**Measured, live, against the plate's own `bg-well`** (canvas-composited, WCAG relative luminance):

| rung | alpha | at rest | at the pulse trough (element opacity 0.5) |
|---|---:|---:|---:|
| `.shadow-seg` | 1.00 | 1.427 : 1 | 1.193 : 1 |
| `.shadow-block-name` | 0.60 | 1.237 : 1 | 1.111 : 1 |
| `.shadow-block-count` | 0.40 | 1.144 : 1 | 1.069 : 1 |
| **`.shadow-swatch`** | **0.30** | **1.116 : 1** | **1.056 : 1** |

Identical in both schemes (the ink is a fixed fraction of `--foreground` mixed into `--well-bg`, so the
ratio is scheme-symmetric by construction — that part of E1-R2 does hold). The swatch group is
`count` elements, the largest visual mass on the plate, and it sits at **1.116:1** — a hair above the
very 1.02:1 collapse the remediation note declares dead, and **1.056:1** at the pulse trough, which is
not visible at all. WCAG 1.4.11's non-text floor is 3:1; the plate is `aria-hidden` so 1.4.11 is not
binding, but the component's OWN contract ("the genesis muted blocks read as BLOCKS", line 53 of
`utils.css`; "reads as BLOCKS whether the plate is light or dark", line 101) is.

**Internal contradiction, same file.** Lines 100-102: *"The ladder steps fade INTO the plate by a
color-mix step (never element opacity — D6); the pulse's opacity swing is MOTION on top of the ink,
not the ink itself."* But `animate-pulse` IS element opacity, and element opacity **multiplies** the
rung's alpha — the 30 % swatch becomes 15 % at the trough. The D6 rule the ladder was built to obey is
re-violated by the animation stacked on top of it.

**Mechanism.** A certified base ink, uncertified derived rungs, with a blanket element-opacity
animation multiplying them.

---

## C-5 — **the gate is vacuous over two of the plate's three stages** (MAJOR — vacuous gate)

`e2e/smoke/oracles/o9-shadow-palette.spec.ts` is the component's only test (there is no vitest
component test; `test/demo/` holds exactly one file, `palettes/api/admin-palettes.test.ts`).
`assertPulsesLive` (spec lines 81-102) queries **`.shadow-seg` only**. Proof that nothing else is
asserted anywhere:

```
$ grep -rn "shadow-swatch\|shadow-block" --include='*.ts' --include='*.vue' demo e2e test
demo/palettes/browser/card/ShadowPalette.vue:62 / :66 / :75 / :106 / :109 / :112
# six hits, all inside the component itself. Zero test references.
```

**Exact mutations that keep the gate GREEN:**

1. **Delete lines 59-80 entirely** — the whole meta row and every swatch. The plate becomes a bare
   strip. O-9 passes: the ghost exists, is `aria-hidden`, carries no `role="status"`, the caption is
   visible, `.shadow-seg` count is 5 and re-segments 5→6→5, the delays are `i*0.12`, PRM collapses it.
2. Set every non-seg `animationDelay` to `"0s"` — the entire "wave arrives after the strip"
   choreography deleted. Green.
3. Set `.shadow-block-name/-count/.shadow-swatch` background to `transparent`. Green.
4. Replace the swatch delay expression with `Math.random()` seconds. Green.

**And the live-k leg (spec lines 148-159) asserts element COUNT only** — `toHaveCount(6)` after
ArrowRight — never phase, never `startTime`, never ordering. That is precisely why C-1, C-2 and C-3
have shipped unnoticed since T.W6.5 (`0ad772f`) with a green oracle. The oracle reads
`getComputedStyle().animationDelay` — the *declared* value, which remains perfectly correct while the
rendered animation is shattered.

---

## C-6 — **the instrument face shows a shape the instrument never produces** (MINOR)

The plate's stated job (lines 19-22) is "the ghost is the instrument showing its **output shape**
before any image exists". Its swatch placeholders are perfect circles (`rounded-badge`,
`ShadowPalette.vue:75`). The real output swatch is a `WatercolorDot` — an organic, irregular
watercolor silhouette (`SwatchHoverMenu.vue:15-19, 29-34`). `rounded-badge` occurs in exactly two
places in the tree, both ghosts (`ShadowPalette.vue:75`, `PaletteCardSkeleton.vue:76`); the product
never renders it. Visible in
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png` — five hard circles
in the ghost, against the organic dashed silhouettes the EmptyState trio renders in the sibling pane
of the same screenshot.

The correct primitive is already in-tree and already used for exactly this purpose at true-empty
(`WatercolorDot variant="ghost"`, asserted at spec lines 69-77) — no new component, no new directory.

---

## C-7 — **one wave, two implementations** (MINOR)

The identical choreography is written twice, in two components that morph into one another in the same
seat (`ExtractWorkbench.vue:101-160`, `<Transition name="vj-morph" mode="out-in">`):

| stage | `ShadowPalette.vue` | `PaletteCardSkeleton.vue` |
|---|---|---|
| strip | `:56` `${((i-1)*0.12)}s` | `:50` `${(i-1)*0.12}s` |
| meta name | `:63` `${count*0.12 + 0.1}s` | `:60` `${count*0.12 + 0.1}s` |
| meta count | `:67` `${count*0.12 + 0.22}s` | `:66` `${count*0.12 + 0.22}s` |
| swatches | `:77` `${count*0.12 + 0.34 + (i-1)*0.1}s` | `:77` `${count*0.12 + 0.34 + (i-1)*0.1}s` |

The sibling already expresses the ladder as CSS custom properties (`'--i': i - 1`,
`'--skeleton-shimmer-delay'`, lines 49-51); `ShadowPalette` re-implements it as template string
arithmetic. The house already performed exactly this lift for the *ink* — `utils.css:42` names both
components as the two consumers of the one `.skeleton-ink-register` recipe — and did not perform it
for the *wave*. Any fix to C-1/C-2/C-3 applied to one file silently diverges the other.

---

## C-8 — **the "ONE plate developing in place" changes strip geometry under the morph** (MINOR)

The three plates that occupy the same seat disagree on strip geometry:

- ghost: `flex h-10 w-full gap-px` + `flex-1` cells (`ShadowPalette.vue:51,55`)
- imminent skeleton: `flex h-10 w-full`, **no gap**, `width: ${100/count}%` (`PaletteCardSkeleton.vue:39,48`)
- developed card: `flex h-10 w-full`, **no gap**, population-weighted `width` (`PaletteColorStrip.vue:11,20`)

The comment claims "ghost → skeleton → card stays ONE plate developing in place" (lines 30-31); the
hairlines appear and vanish across the morph.

---

## C-9 — **`count` is unvalidated** (INFO — hypothesis, currently unreachable)

`count?: number` (`ShadowPalette.vue:85-89`) is neither clamped nor integer-checked, and the component
is exported from the public barrel (`demo/palettes/browser/card/index.ts:7`,
`demo/palettes/browser/index.ts:22`). In this Vue version a bad value does **not** crash — it renders
nothing:

```
node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:3171-3182
  } else if (typeof source === "number") {
    if (!Number.isInteger(source) || source < 0) { warn$1(...); ret = []; }
```

so a non-integer/negative/NaN `count` yields a **silently empty, still, `aria-hidden` plate** with only
a dev-mode console warning. Not reachable today (the only consumer is slider-bounded to integers 1-16),
so this is a labelled **hypothesis**, not a confirmed defect. It becomes real the day a second consumer
appears.

---

## What I checked and found SOUND (the negative proof)

These are the hazards named in the brief. Each was tested, not assumed:

- **PRM guard — genuinely covers it.** `demo/styles/animations.css:184-192` applies
  `animation-duration: .01ms !important; animation-iteration-count: 1 !important` to `*`. The inline
  `animationDelay` styles do not conflict (they set delay only). The component's claim (lines 23-25)
  and the O-9 PRM leg (spec 104-123) are both real, not decorative.
- **Accessibility contribution — ZERO defects, correctly.** The plate has no interactive element, no
  focusable descendant, and `aria-hidden="true"` on the root; the AT text is a real seated caption
  (`ExtractWorkbench.vue:161-165`). The `/#/extract` rows in
  `docs/tranches/V/megatranche/audit/visual/REPORT.json` — `namelessButtons: 3`, `smallTapTargets: 6`
  — belong entirely to neighbours: two 12×24 reka slider thumbs ("Number of colors", "Chroma weight"),
  three 22×22 `PaletteSlugBar` buttons, one 160×23 input. **None is ShadowPalette's.**
- **No leak class present.** No `defineModel` (so no stale `WritableComputedRef` round-trip), no
  `shallowRef` needed, no rAF (no PRM-RAF exposure), no listeners, no observers, no timers, no WebGL,
  no async, no network, no parsing (no `parseCssColor` crash surface), no `ValueUnit` handling, no
  reka pointer capture. Nothing to clean up, and nothing left uncleaned.
- **Idioms.** Reactive props destructure with default (`:85`) is correct Vue 3.5. Zero imports, so
  `verbatimModuleSyntax` is vacuously satisfied. 115 lines — far under the standing 400-LoC cap. Not a
  god module.
- **Route health.** `/#/extract` shows `overflowX: 0`, `pageErr: 0`, `consoleErr: 0` in all four Safari
  matrices (`REPORT.md:122, 137, 152, 167`). The plate renders and is legible in dark
  (`shots/safari-mobile-dark/extract.png`) and light (`shots/safari-desktop-light/extract.png`).
- **Probe artifact disclosed.** My synthetic `KeyboardEvent` dispatches (used because
  `thumb.focus()` did not seat `document.activeElement` in the automation context) bubbled past the
  slider to an app-level arrow handler and drifted the route once. That navigation is an artifact of
  my probe, **not** a component defect, and I do not report it as one. The C-2 measurement was re-run
  with propagation stopped at the slider root; the route stayed on `#/extract`.

---

## Strongest defect

**C-1/C-2/C-3 are one mechanism, and it is the component's entire reason to exist.** The plate is
"the standing INSTRUMENT face … the live-k leg: turn k and the plate re-segments" (lines 19-23). Turn
k and it does re-segment — and the shimmer it was redesigned to carry (T.W6.5 · R12, the owner
overrule) shatters into eight time origins, teleports the phase of every already-mounted block, and
inverts its own ordering past k=9. The one interaction the component is built for is the one that
breaks it, and the gate that was written to protect the redesign (`O-9`) reads the *declared* delay,
which stays correct while the rendered animation is wrong — so the defect is invisible to CI by
construction.

---

## Proposed cure — architectural transposition, not a patch

The delays are not geometry; they are **phase**. Stop declaring them as waits.

1. **One time origin per plate.** Put `:key="count"` on the `data-slot="shadow-palette"` root so a k
   change re-mounts the instrument face as a single animation cohort. Kills C-1 and C-2 together, in
   one attribute: no orphan origins, no mid-flight delay mutation. Cost is ≤19 trivial DOM nodes per k
   tick — strictly cheaper than the `2 + count` forced opacity discontinuities it removes.
2. **Normalize the ladder into the period, as a negative delay.** A negative `animation-delay` starts
   the animation already advanced, so the cascade becomes a phase offset that can never overrun and
   never leaves a cell parked bright and static. Emit
   `animation-delay: calc(-1 * mod(var(--i) * var(--skeleton-wave-step), var(--skeleton-wave-period)))`
   (or fold the modulo into the `--i` ladder where `mod()` is not available). Kills C-3 for every k in
   1..16 and removes the last positive-delay artifact.
3. **Lift the wave to the ONE recipe root,** `demo/styles/utils.css`, beside `.skeleton-ink-register`
   — the same lift that file already documents for the ink at line 42 ("Consumers: ShadowPalette +
   PaletteCardSkeleton"). Both plates then drive the identical ladder off `--i`, which
   `PaletteCardSkeleton` already sets (`:49`). Template arithmetic disappears from both files; C-7
   collapses; the geometry disagreement in C-8 gets one place to be fixed.
4. **Certify the rungs, not just the base ink.** Extend the E1-R2 tone-step guarantee down the ladder
   so each rung clears a stated floor against `--well-bg`, and replace Tailwind's blanket
   `animate-pulse` (element opacity, which multiplies the rung and re-violates D6) with a bounded
   opacity floor token so the pulse is motion on top of the ink, as the comment already promises.
5. **Show the shape the instrument actually produces** — `WatercolorDot variant="ghost"` at swatch
   scale, the primitive the EmptyState trio already renders (spec 69-77). No new component.
6. **Re-aim O-9 onto what it claims to protect.** The living leg must (a) cover `.shadow-block-*` and
   `.shadow-swatch`, not only `.shadow-seg`; (b) assert ONE shared `startTime` across the plate; (c)
   assert a monotone phase chain strip → meta → swatches; (d) re-run all three **after** a k change,
   at a k in the folding range (≥9). Every mutation listed in C-5 then fails, as it should.
