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
