# U.W-VISUAL — Wave-Open Census — LANE E (Motion real-GPU annex + Easing)

Re-judges owner-uncertified still-reds inherited from T.W8's terminal state
against the LIVE served build. Verdict vocabulary: CENSUS-GREEN (cure holds,
retire) / CENSUS-RED (still-red reproduces) / ANNEX-OWNER-ATTEST (U-F54:
requires a real-GPU / owner-attested frame a headless read cannot honestly
finalize — NEVER a headless green/red on a swap-window).

## Serve provenance (HEAD-faithfulness)

- Worktree HEAD `e97a9d1` (`docs(T · FINAL)` — T.W8-terminal), served on port
  **8595** via `e2e/smoke/perf/serve-built.mjs` → `dist/gh-pages`.
- Same wave-open census scaffold as the sibling lanes (UNCOMMITTED): the
  un-adopted glass-ui 5.0.0 producer rename is shimmed — `vite.config.ts` alias
  `@mkbabb/glass-ui/goo-blob → demo/shims/glass-ui-goo-blob.ts` (re-exports
  `Blob as GooBlob`) + `ActionBarLayer.vue` an inline stub of
  `useLayerTransition` (dropped/internalised in 5.0.0). **These shims are
  U.W-ADOPT scope. Critically for [u-f7]: the `useLayerTransition` stub means the
  dock sub-layer crossfade — the home of the O-16-R1 producer clobber — is NOT
  exercised in this build (confound isolated by construction; see below).**
- Both rows driven headless (`--use-angle=swiftshader`) at dpr 2. The only
  console error on every cell is the expected dev-`misconfigured` palette-API
  chip (loopback origin, no `VITE_API_URL`) — inert to both surfaces.
- Probe: `pi/lane-e-probe.mjs`; log `pi/lane-e-probe-log.txt`; frames under
  `frames/uf7-*` and `frames/zd3-easing-*`.

---

## [u-f7] SCENE-TRANSITION-MOTION (T-14 · T-48 · T-58) — **ANNEX-OWNER-ATTEST**

**Gate OA-1** (owner-attested against a REAL-GPU frame — NEVER headless):
swap-window max frame ≤ 32ms + 0 frames > 32ms over the settle window,
CONFOUND-ISOLATED (O-16-R1's 150ms clobber + PKT-1's corrupted
`--default-transition-duration` EXCLUDED), AND zero wake-gray substrate flash
across the swap window (MUST-NOT-REGRESS from the boot-B cure `5cecdf2`).

**This row is ANNEX by law (U-F54).** Headless SwiftShader confounds motion
frame-timing; a headless swap-window number is NOT a verdict. Below is the
measured headless LEG + the confound-presence audit — the felt-duration and
wake-gray VERDICT is the owner's, against a real-GPU frame.

### Confound-presence audit (static + LIVE) — BOTH named confounds ABSENT/ISOLATED

- **PKT-1 (corrupted dist-clock): ABSENT.** The served dist defines
  `--default-transition-duration` at two sane values —
  `:root,:host{…:var(--duration-fast)}` (`--duration-fast: .2s`) and a later
  `:root{…:.15s}` (the Tailwind-preflight default, cascade-winner). **LIVE
  computed on `documentElement`: `.15s` — a healthy small value, not a corrupted
  clock.** Moreover the pane-swap does NOT read this token at all: the LIVE swap
  family is `vj-enter` (App.vue binds `:transition-name="…'vj-enter'"`), whose
  active rule is `transition: opacity var(--duration-normal) var(--ease-decelerate),
  transform var(--spring-smooth-duration) var(--spring-smooth)` →
  `--duration-normal: .3s`, `--spring-smooth-duration: calc(.35s * 1) = .35s`.
  All swap-window clocks are sane.
- **O-16-R1 (150ms producer clobber): ABSENT / ISOLATED.** Zero `150ms` literals
  in the dist CSS. The clobber lived in the glass-ui dock `useLayerTransition`
  sub-layer crossfade — which is STUBBED in this census scaffold (ActionBarLayer
  inline stub), so the producer scheduling clobber is not on the swap path. The
  LIVE audit found 4 elements with a `.15s` transition, but every sample is a
  `.flex` utility inheriting the benign Tailwind default-transition-duration —
  NOT a dock-layer scheduling clobber. Confound isolated by construction.

**Net: with BOTH named confounds excluded, the only residual confound is the
SwiftShader headless-GPU one itself — which is exactly the U-F54 never-fake
class.** A real-GPU frame-by-frame (T-58 owner mandate) is still owed.

### Measured HEADLESS leg (confound-flagged — NOT a verdict)

| scheme | frames in ~1.3s window | rAF max-frame ms | frames > 32ms | max longtask (P1 mount) |
|---|---|---|---|---|
| light | 7 (deltas 6) | **4791.7** (artifact) | 6/6 | **71 ms** |
| dark  | 14 (deltas 13) | **325.7** (artifact) | 12/13 | **91 ms** |

- **The rAF frame-delta numbers are UNINTERPRETABLE and confirm U-F54:** headless
  SwiftShader produced only 7–14 rAF ticks across a ~1.3s window that should hold
  ~78 frames at 60Hz, with absurd 300–4800ms "frames" (context-switch / GC / GL
  stall artifacts, NOT real presented frames). No honest max-frame or
  frames-over-budget count is recoverable headless. The T.W8 baseline (max 88ms,
  11/74) was itself a headless read and carries the same confound.
- **The meaningful measured signal is the longtask** (main-thread, less
  GPU-paced): the swap fires a **71 ms (light) / 91 ms (dark)** long task — the
  P1 synchronous pane-mount cost (perf-transitions P1-1). This reproduces the
  same order as T.W8's headless "max 88ms" and is consistent with the PaneSlot
  one-frame-defer cure being present (`liveComponent` trails the key by one rAF)
  but NOT eliminating the mount long-task. Still headless-inflated (SwiftShader
  slows the mount) — informative, not dispositive.

### Wake-gray bead (compound half, same window) — MUST-NOT-REGRESS, cure STRUCTURALLY INTACT

- The boot-B cure is present in source and compiled: `HeroBlob.vue:289-293`
  `onActivated(() => { reseedHeroStops(cssColorOpaqueFrame.value); noteBlobActivity();
  gooBlobRef.value?.resume(); })` — re-seeds the ramp from the LIVE colour and
  wakes the loop BEFORE the KeepAlive re-activation repaint. The comment names
  the residual root as PRODUCER (P6 reveal/wake rider, PR-2 fence) if a gray
  frame survives — no demo shader fork.
- **π-frame `frames/uf7-wake-reveal-start-dark.png`** (reveal-start, Home
  re-activation): the HeroBlob is already inked to the LIVE palette (a red
  droplet on the warm-red derived atmosphere), NOT the wake-gray ground — the
  cure holds in the captured frame. **But per U-F54 a single headless frame at
  +40ms cannot honestly certify the ABSENCE of a transient gray flash across the
  felt swap window — that percept is OWNER-ATTEST.**

### π-frames

- `frames/uf7-wake-reveal-start-{light,dark}.png` — reveal-start of the Home
  re-activation swap (blob live-inked, not gray).
- `frames/uf7-wake-settled-{light,dark}.png` — the settled Home pane after swap.

### RELAY → U.W-ADOPT (producer confounds, booked)

- **O-16-R1** (dock `useLayerTransition` 150ms scheduling clobber) and **PKT-1**
  (dist-clock corruption) are producer/build material — relayed to U.W-ADOPT.
  This lane confirms neither is present in the census-scaffold served build; the
  real-GPU confound-isolated frame is owed against the ADOPTED producer build.

**Verdict: ANNEX-OWNER-ATTEST.** Both named confounds (O-16-R1, PKT-1) are
statically + live ABSENT/ISOLATED in the served build; the measured headless leg
is presented with its confound flag (rAF deltas uninterpretable — U-F54
demonstrated a THIRD time; longtask 71/91ms the honest P1-mount signal); the
wake-gray cure is structurally intact and the reveal-start frame shows a
live-inked blob. **Gate OA-1 (swap-window max frame ≤ 32ms + 0 over-budget,
confound-isolated on a real GPU, AND zero felt wake-gray flash) is the owner's
against a real-GPU frame — NEVER declared here from headless numbers.** The T-58
real-GPU frame-by-frame mandate stands.

---

## [zd3-easing] EASING NEVER-FILED W8 PASS (T-22 · T-47) — **CENSUS-GREEN (retire-with-O-17-cite)**

The easing authoring surface (`EasingAuthoringStage.vue` seating the ONE vendor
`<EasingPicker :playback="false" :readout="false">` at gradient-interval scale)
LANDED at W6/W6.5 with O-17 oracle backing 3/3; the owner-uncertified residual
was that `passes/easing.p1.md` was never FILED (T-MARK §3.1, 11 target / 8
filed) — NOT a surface defect. Re-judged LIVE at wave-open: the surface opens
**GREEN**; the three seat laws + the O-17 signature legs hold; aliveness holds.

### Measured (live served build — the O-17 seat laws, 3 cells)

| cell | letterbox dL/dT/dR/dB | vb-ratio | inline-size | picker grid | box-shadow | one-literal | stamps |
|---|---|---|---|---|---|---|---|
| 1440-light | **0 / 0 / 0 / 0** | 1.2 | 304px | 436px (1 col) | **none** | 1 | 0 |
| 1440-dark  | **0 / 0 / 0 / 0** | 1.2 | 304px | 436px (1 col) | **none** | 1 | 0 |
| 390-light  | **0 / 0 / 0 / 0** | 1.2 | 272px | 298px (1 col) | **none** | 1 | 0 |

- **Law 3 — zero letterbox (O-17): GREEN.** `getScreenCTM`-measured deltas are
  0/0/0/0 on every cell — the drawn plot IS the element box; the canvas sizes by
  `inline-size: min(100%, 19rem)` (304px @ ≥19rem, 272px @ 390 capped by 100%)
  with `aspect-ratio ≡ 1/--vb-ratio` (1.2, linear's padded box), `transition-property:
  aspect-ratio` (the T-48 liquid-morph on a regime flip). No fixed block-size.
- **Law 1 — one column: GREEN.** `grid-template-columns` is a single track (the
  `lg:` 18rem chrome rail is starved dead at this seat).
- **Law 2 — wells not cards: GREEN by eye.** `box-shadow: none` on the picker
  card; the well renders FLAT + OPAQUE (`--well-bg` `oklab(0.913…)` light /
  `oklab(0.345…)` dark — screenshot-confirmed, no floating-glass translucency).
  *Faithful residual note:* the sampled `.glass-card` still reports a
  `backdrop-filter: blur(8px)…` token, but it is VISUALLY INERT under the opaque
  well background (nothing behind shows through) — the seat's INTENT (flat paper
  tone-step of the plate) is met. Not a RED.
- **One-literal law: GREEN** (1 literal leaf — the readout rail owns the sole
  cubic-bezier/steps literal; `:readout="false"` keeps it off the canvas).
- **Travel dot OFF: GREEN** (`:playback="false"` — 0 `circle[r='0.03']`).

### Aliveness (1440-light — write-through + persistence)

`{ before: "cubic-bezier(0, 0, 1, 1)", afterDrag: "cubic-bezier(0.181, 0.23, 1, 1)",
changed: true, persisted: true }` — dragging a bezier handle writes the literal
through, and it SURVIVES a disclosure close+reopen (the authored curve is never
unmounted away — the aliveness law holds live). Matches the T.W8 confirm-log
persistence leg exactly.

### π-frames (by-eye coherence — the doctrine read)

- `frames/zd3-easing-{1440-light,1440-dark,390-light}-well.png` — the disclosed
  authoring stage: a clean flat paper well, a 4×4 grid, the linear curve drawn
  corner-to-corner with two draggable endpoint handles, perceptible stroke (teal
  on beige / cyan on brown), a faint "1" axis mark. **Reads coherent + usable —
  the T-22 "easing area still a mess" percept does NOT reproduce; the T-47
  "easing → keyframes picker" seat is landed and legible.**
- `frames/zd3-easing-{cell}-bench.png` — full-pane context.

### DELTA (RED → GREEN)

- **T-22 "easing area still a mess"**: RED (cluttered/illegible authoring area) →
  **GREEN** — a single flat zero-letterbox canvas well, one column, one literal,
  no stamps, coherent by eye across light/dark/mobile.
- **T-47 "easing → keyframes picker"**: RED (no authoring picker) → **GREEN** —
  the vendor `<EasingPicker>` is seated + alive (drag writes through + persists).

**Verdict: CENSUS-GREEN — retire with the O-17 cite.** The landed W6/W6.5 cure
carried oracle backing (O-17 3/3); this wave-open re-judge confirms the seat
laws + aliveness + by-eye coherence all HOLD live. The residual was a never-filed
pass DOC, not a red surface — retired into this census record. (Aesthetic "reads
beautiful" is the owner's, but the measurable seat laws + usability are certified
GREEN here.)
