# S.W3 — π motion captures (the paired before/after archive)

The S.W3 hard gate (§Hard-gate 6) + §Verification-artefacts require **π before/after
motion captures** of the three transition families the wave retunes: **drag**
(slider scrub / color fan-out), **view-switch** (the pane-swap spring), **mix** (the
pour choreography). This is the standing R-era π convention (`docs/tranches/R/audit/
R.W4-visual-runtime/pi-capture.mjs`) extended from static shots to **motion**: per
family a **video** (`.webm`) + a **fixed-cadence frame series** (`.png`) so the AFTER
compares frame-by-frame at the same absolute-time samples.

## Layout

```
pi/
├── pi-motion.mjs          # the durable, re-runnable capture harness   [committed]
├── README.md              # this file                                  [committed]
├── w3-before/             # BEFORE — captured at tranche-q @ 3549147 (pre W3-4/-5/-6)
│   ├── manifest.json      #                                            [committed]
│   ├── drag/         drag.webm [committed] + frame-NN-{rest,grab,scrub-01..10,release}.png [self-ignored]
│   ├── view-switch/  view-switch.webm [committed] + frame-NN-{picker-rest,listbox-open,swap-tNNN,gradient-rest}.png [self-ignored]
│   └── mix/          mix.webm [committed] + frame-NN-{mix-rest,seed-1,seed-2,pre-run,pour-tNNNN,settled}.png [self-ignored]
└── w3-after/              # AFTER — lands at W3 close (post the retunes), same harness
```

**Binary hygiene (the R convention).** The `.webm` **videos** (2.4 MB) are the durable,
committed motion record. The full-resolution **PNG frame series** (22 MB) **self-ignores**
under `.gitignore:19 *.png` — the same repo policy that kept R's π screenshots out of git
(R committed the harness + manifest + written deltas, never the raw PNGs). The frames are
regenerated on demand by re-running `pi-motion.mjs` at the same commit; the `manifest.json`
records exactly which frames each family produced. The video + manifest + this README + the
harness = a fully reproducible archive without a 22 MB binary churn.

## Method

- **Built bundle, free port.** Captured on the `npm run gh-pages` bundle served by a
  disposable static server on **:4185** (`python3 -m http.server 4185` from
  `dist/gh-pages/`) — the owner's dev server on **:9000** is never touched, per the
  wave's boot discipline.
- **Fixture-faithful interactions.** The drivers mirror the e2e smoke idioms: the
  `L channel` slider (`reactivity-instant.spec.ts`), the dock view-select open idiom
  (`fixtures/dock.ts` `openView`), and the mix seed→run flow (`useMixingState.ts`
  `canMix` ≥2 colors → the "Add current color to the mix" swatch ×2 → the "Mix" run).
- **Viewport / scheme.** 1280×800, dpr=1, `dark` (the demo's signature surface where
  the aurora/blob motion reads). Single viewport — this is a *motion* archive, not the
  R viewport×scheme matrix.
- **Frame cadence.** Sampled at **absolute times from the interaction commit** (not
  wall-clock-of-screenshot), so the BEFORE and AFTER series line up: view-switch at
  t = 0/60/120/200/300/450/650/900 ms from the option-click; mix at
  t = 80/160/260/400/600/850/1150/1500/1900/2400/2900 ms from the run-click (the
  ≤2.9 s baseline window, §6.2).

## Reproduce (and produce the AFTER)

```
npm run gh-pages
( cd dist/gh-pages && python3 -m http.server 4185 --bind 127.0.0.1 ) &
node docs/tranches/S/audit/pi/pi-motion.mjs http://127.0.0.1:4185 docs/tranches/S/audit/pi/w3-after
```

(Run from the repo root so the bare `playwright` import resolves — the R convention.)

## BEFORE observations (3549147 — what the archive shows the retunes must move)

- **drag** — the L-channel scrub drives the full color fan-out (spectrum + all four
  channel tracks + the big numeric readout re-render every step). This is the §6.2
  slider-drag p50 **49.8 ms** family that W3-1's rAF-coalesce + W3-3's blob idle-gate
  must bring to ≤20 ms; the frame series is the visual half of that number.
- **view-switch** — `frame-01-listbox-open` catches the dock listbox mid-open; the
  `swap-tNNN` series is the current pane-swap spring (0.45 s baseline → ~0.3 s, W3-4/-5)
  against the §6.2 **254.7 ms** first-frame that must reach ≤100 ms.
- **mix** — the seed→run→result path completes (RESULT plate renders
  `oklab(0.9532 0.2685 0.0465 / 1)`), but the pour itself is **subtle**: the mid-`pour`
  frames show the mix UI merely *dimmed* under the animation canvas rather than a
  legible convergence landing at the plate. This is precisely the BEFORE that Q10's
  **first-principles re-work** (W3-6, RATIFICATION §1) replaces — "the animation IS the
  progress," ≤1.2 s, one clock, reveal AT the result plate.

---

# S.W6 — π BASELINE (the four-quadrant cold/live × light/dark archive)

The S.W6 hard gate (§Hard gate row 6, `waves/S.W6.md`) requires **π archives light/dark
× cold/live** plus a static hero-blob record (the W6-4 before). `pi-baseline.mjs` is a
NEW sibling harness under this same standing root (extends the family/cadence idioms of
`pi-motion.mjs` + the static-shot idiom of `pi-capture.mjs`; never forked) shaped for
W6's specific quadrant: **cold** (a fresh Playwright context navigated straight to a
`?space=oklch&color=…` URL-hash color, frame series + video from the moment navigation
commits — the vehicle for the W6-1/owner-ruling "no explicit snap at load" clause) ×
**live** (the same context, steady state after a real L-channel slider scrub) × **light/
dark** scheme × **{wide-1440x900, mobile-390x844}** = 4 quadrants. Each quadrant also
carries a free W6-4 hero-blob before-record (footprint crop, placement context, a short
satellite-cadence series) since the picker page is already live in that exact viewport/
scheme at that point in the run.

## Layout

```
pi/
├── pi-baseline.mjs        # the durable, re-runnable W6 harness            [committed]
├── README.md              # this file                                     [committed]
└── w6-before/             # BEFORE — captured at tranche-q @ 9d1297b (pre W6-1..W6-8)
    ├── manifest.json                                                      [committed]
    ├── cold/<viewport>--<scheme>/
    │   frame-tNNNN.png [self-ignored] × 13 (t=0..1800ms cadence)
    │   + <viewport>--<scheme>.webm [committed]
    ├── live/<viewport>--<scheme>.png                        [self-ignored]
    └── blob/<viewport>--<scheme>/
        footprint.png · placement.png [self-ignored]
        + satellite-tNNNN.png [self-ignored] × 5 (t=0..2000ms cadence)
```

**Binary hygiene (the R/S convention).** The 4 `.webm` videos (≈2.4 MB total) are the
durable, committed cold-entrance record; every PNG (frame series, live shots, blob crops
— ~30 MB) self-ignores under `.gitignore:19 *.png`. Regenerate on demand by re-running
`pi-baseline.mjs` at the same commit; `manifest.json` records exactly what each quadrant
produced.

## Method

- **Own dev server, free port.** Captured on a disposable `vite --port 4877 --strictPort`
  dev server (`VITE_API_URL=http://localhost:59999`, a deliberately unreachable backend —
  the demo's origin-honest `unavailable` state, never `misconfigured` since the env var
  IS set) — the owner's dev server on **:9000** is never touched.
- **Cold = a genuinely fresh Playwright context** (no seeded storage) navigated with
  `waitUntil: "commit"` directly to `/#/picker?space=oklch&color=oklch(0.72 0.19 145)` (a
  vivid green — nowhere near the `defaultColorModel` hot-pink SYNTHESIS names, so any
  stale/default flash ahead of the derived field would read clearly against it).
- **Live = the same context**, after settling, driven through an L-channel slider scrub
  (the standing drag idiom from `pi-motion.mjs`) to a single steady-state frame.
- **Cadence.** Sampled at absolute times from the navigation commit: cold at
  t = 0/16/33/50/80/120/180/260/380/550/800/1200/1800 ms (fine near the start, where an
  entrance snap would land, backing off to the standing ~1.8s fonts+aurora+entrance
  settle window); blob satellites at t = 0/500/1000/1500/2000 ms (coarse — a before/after
  placement record, not a motion study).
- **Viewport × scheme.** `{wide-1440x900, mobile-390x844}` × `{light, dark}` — the task's
  four-quadrant matrix (not R's 3-viewport shot matrix or W3's single-dark-viewport
  motion matrix).

## Reproduce (and produce the AFTER)

```
VITE_API_URL=http://localhost:59999 npx vite --port 4877 --strictPort &
node docs/tranches/S/audit/pi/pi-baseline.mjs http://localhost:4877 docs/tranches/S/audit/pi/w6-after
```

(Run from the repo root so the bare `playwright` import resolves — the R/S convention.)

## BEFORE observations (9d1297b — what the archive shows W6 must move)

- **cold entrance** — in this literal fresh-context precondition (no prior localStorage),
  **no hot-pink flash and no light/dark scheme mismatch reproduces**: `frame-t0000` is an
  unstyled blank paint (expected pre-hydration), and by `frame-t0016`/`frame-t0033` the
  field is already the correct scheme-consistent derived green — the nav chrome and blob
  fill in progressively through ~t0800 (the blob's W3-2 idle-callback defer). This is
  useful negative evidence, not a refutation of SYNTHESIS's "stale hot-pink every cold
  load" finding: that finding's mechanism (`syncColorToStorage` persisting a
  re-parsed-wrong string) requires a **returning-user precondition** — a PRIOR session
  that actually changed the color (the persistence watch never fires, and
  `color-picker` never lands in `localStorage`, on an untouched boot) — which this
  literal "fresh context" capture does not exercise. W6-1's close-out verification should
  re-run this harness against a primed (returning-user) storage state, not only this
  cold-boot one, before declaring the hot-pink defect cured.
- **field richness (W6-3 before)** — the derived field at rest reads as ONE dominant hue
  band (green, tracking the pick) with a soft gold/brown corner top-left and a mint
  corner bottom-right; modest H/C variance, no dead-gray zones at this saturated seed.
  This is the baseline the amplification rider (§Post-ratification rider 2 — "visibly
  GREATER derived C and H variance") must expand against.
- **hero blob (W6-4 before)** — `blob/*/placement.png` shows today's corner-break: the
  bead sits top-right on the card, a visible fraction overflowing both edges, tucked to a
  `w-24` puck on mobile vs `lg:w-[11rem]` on desktop (the footprint clamp W6-4 replaces
  with `clamp(11rem,26cqi,13rem)`). The bead IS present and rendered at BOTH viewports in
  this baseline (mobile is not currently absent/toggled-off) — Q7's "full presence at
  every viewport" is a placement/footprint/perf redesign against an already-mounted mobile
  blob, not a from-scratch mount. `blob/*/satellite-t*.png` records the current orbit for
  the before/after satellite-count diff (§Hard-gate 4, ≥2 distinct beads).

---

# S.W7 — π BASELINE (the light/dark × collapsed/expanded dock quadrant)

The S.W7 hard gate (§Hard gate row 5, `waves/S.W7.md`) requires a **π archive light/dark
× collapsed/expanded** — the record the wave close compares against to confirm the
W7-1 seal↔trigger chromatic handoff "reads intentional, not jarring." `pi-w7.mjs` is a
NEW sibling harness under this same standing root (a **static-shot** lane — the
`pi-capture.mjs` SHOTS-driven idiom, S.W4's convention — not a motion capture; this is a
state archive, not a per-frame family) shaped for W7's specific quadrant:

- **collapsed** — the dock at rest, auto-collapsed (a real mouseleave + the
  `collapse-delay=5000` timer, since `Dock.vue` boots EXPANDED on desktop — N.W5
  Defect-B — there is no prop that boots it pre-collapsed).
- **expanded + view-select open** — the dock at its main layer with the view-select
  listbox open (the `getByRole("combobox", {name:"Select view"})` open idiom, the same
  contract `fixtures/dock.ts` `openView` drives).
- **furniture** — the current `@mbabb` / Login / Tools chrome, rest + the `@mbabb`
  dropdown open (the W7-6 before-record).
- **prm** — a `reducedMotion:"reduce"` emulated sequence (mount → forced-collapse →
  real-user tap-to-expand) recording the W6→W7-routed observation verbatim.

× light/dark scheme. **collapsed** + **furniture** + **prm** are `wide-1440x900` ONLY
(collapse is unreachable <1024 — `Dock.vue` pins `:always-expanded="!isDesktop"`,
`isDesktop` = `min-width:1024px`; the `@mbabb`/Login chrome is `hidden lg:flex` — desktop-
only); **expanded + view-select** is `{wide-1440x900, mobile-390x844}` (the task's "1440
and 390 (mobile posture)" clause).

## Layout

```
pi/
├── pi-w7.mjs              # the durable, re-runnable W7 harness              [committed]
├── README.md              # this file                                       [committed]
└── w7-before/             # BEFORE — captured at tranche-q @ 1041137 (pre W7-1..W7-7)
    ├── manifest.json                                                        [committed]
    ├── collapsed--wide-1440x900--{light,dark}.png                [self-ignored]
    ├── expanded-view-select--{wide-1440x900,mobile-390x844}--{light,dark}.png
    │                                                             [self-ignored]
    ├── furniture-{rest,mbabb-open}--wide-1440x900--{light,dark}.png
    │                                                             [self-ignored]
    └── prm-{mount,collapsed,stuck-after-tap}--wide-1440x900--{light,dark}.png
                                                                   [self-ignored]
```

**Binary hygiene (the R/S convention).** Every PNG (16 shots) self-ignores under the
repo's blanket `.gitignore:19 *.png` — only this harness + manifest.json commit; the
shots regenerate on demand by re-running `pi-w7.mjs` at the same commit.
`manifest.json` also carries the `boundingBox`/`dockClass` measurements for the 6 `prm-*`
shots, so the PRM defect is on record as NUMBERS, not only pixels (screenshots alone
would let a future reader dismiss a subtle width difference as a rendering artefact).

## Method

- **Own dev server, free port.** Captured on a disposable `vite --port 4933 --strictPort`
  dev server (`VITE_API_URL=http://localhost:59999`, a deliberately unreachable backend —
  the demo's origin-honest `unavailable` state) — the owner's dev server on **:9000** is
  never touched.
- **Real-user idioms, no `force`.** The view-select open uses the same
  `getByRole("combobox", {name:"Select view"})` + real click contract as
  `e2e/smoke/fixtures/dock.ts` `openView`; the collapsed-pill tap-to-expand under PRM uses
  the same real click as that fixture's `expandDock`.
- **Viewport × scheme.** `{wide-1440x900, mobile-390x844}` × `{light, dark}` (collapsed /
  furniture / prm restricted to `wide-1440x900` per the reachability notes above).

## Reproduce (and produce the AFTER)

```
VITE_API_URL=http://localhost:59999 npx vite --port 4933 --strictPort &
node docs/tranches/S/audit/pi/pi-w7.mjs http://localhost:4933 docs/tranches/S/audit/pi/w7-after
```

(Run from the repo root so the bare `playwright` import resolves — the R/S convention.)

## BEFORE observations (1041137 — what the archive shows W7 must move)

- **collapsed (W7-1 before)** — `collapsed--wide-1440x900--*.png` shows the CURRENT
  collapsed pill: a small watercolor-dot circle plus a TRUNCATED TEXT label ("Ho…", the
  view's `label`, `hidden sm:inline` — i.e. shown at desktop widths) and a chevron. This
  is the exact shape W7-1 replaces: the icon is currently `sm:hidden` (shown only BELOW
  the `sm` breakpoint — the inverse of the wanted desktop affordance), so today's desktop
  collapse reads dot+text+chevron, not the wanted dot+inked-icon with no text/chevron.
- **expanded + view-select (W7-4 before)** — `expanded-view-select--*.png` (both
  viewports) shows the CURRENT "rainbow menu": each row's icon carries its own hard-coded
  hue (Home pink, Palettes teal, Browse gray, Extract blue, Mix violet, Generate teal,
  Gradient gray) with no achromatic-pick floor — the literal one-off W7-4 / Q4 retires in
  favour of the gamut-guarded per-view accent tokens (the menu becomes the navigation's
  color-wheel legend, ONE derivation, not N hand-picked hues).
- **furniture (W7-6 before)** — `furniture-rest--*.png` shows today's row: `Home` (view-
  select trigger with label), `Tools ⌄` (a `DockIconButton` with a bare `ChevronDown` —
  the "chevron-that-isn't-a-dropdown" W7-6 resolves; it never opens a menu, only toggles
  the action-bar slot), `Login` (a bordered pill button), `@MBABB` (all-caps via a text-
  transform the register fix targets). `furniture-mbabb-open--*.png` shows the `@mbabb`
  dropdown's current content (avatar + tagline, Share color, GitHub, Dark mode) — the
  target for W7-6's register-casing pass, unchanged in content shape.
- **PRM defect (routed W6→W7, `PROGRESS.md` 2026-07-05: "the PRM dock never expands past
  the collapsed circle")** — live-reproduced verbatim while authoring this harness, same
  commit, both schemes: `prm-mount--*.png` (`boundingBox.width` **44px** — already NOT the
  ~447px full-width the identical mount reaches under normal motion), `prm-collapsed--
  *.png` (width **58px**, the ordinary collapsed-dot size — indistinguishable from the
  non-PRM collapsed shot), then a REAL tap on the collapsed pill (`expandDock`'s own
  idiom) → `prm-stuck-after-tap--*.png`: `dockClass` reads `"...expanded fit-content
  dock-inline"` (the JS state machine correctly flips to `expanded`) but
  `boundingBox.width` stays **44px** — visually indistinguishable from the collapsed
  circle, the dock never grows into the Home/Tools/Login/@mbabb pill. The defect is a
  PAINT/measurement gap (`useDockExpandedSize`'s `--dock-expanded-px` measurement, or the
  morph orchestrator's PRM one-frame jump landing on a stale/zero target), not a JS-state
  gap — `manifest.json`'s `dockClass`+`boundingBox` pair pins that distinction precisely
  so W7 (or the routed re-verify at W8, per the wave's hard-gate-map hedge) diagnoses the
  right layer.
