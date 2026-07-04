# R.W3 π close — per-page DELTA verdicts

Captured post-Lanes A–E + K-INV5 (commits `0cbef49..c4eb9d2` + the close
commit) against the BUILT demo (`npm run gh-pages` → `vite preview :4179`),
same harness/pages/viewports/modes as `../baseline/` (18 shots: picker /
gradient / browse × 390×844 / 1280×800 / 1440×900 × light / dark).
Baseline was captured pre-wave at `abb16f1` (before Lane A) — the delta
below is the CUMULATIVE wave delta.

## picker (×6) — VERDICT: the treatment's instrument, landed

- **Type/keystone (A)**: Fraunces resolves as a real face on every rung
  (probe K1 GREEN); the space wordmark paints the audacious glass-ui font
  rung inside the U13 veil capsule with the Fira Code small-caps catalog
  eyebrow (`COLOR SPACE — 06 / 16`).
- **The signature (B)**: the wide-gamut truth line + dual-ink hatch render
  at first paint on the kept HSL square in BOTH schemes, captioned
  `GAMUT LENS — DISPLAY-P3 / SRGB` + cusp readout. B4 detent sampled live
  on the built demo: dot holds ~4.5–6px of outbound pointer travel at the
  contour, `p3 ⊣` label surfaces 5 frames, then release + catch-up.
- **Controls (C)**: slider thumbs are the glass-ui spectrum consume —
  live-color fill + value-aware ink border + center notch (the gray-200
  literal is dead); thumb bg tracks the model under keyboard drive
  (probe I1: `lab(92 88.8 20)` → `lab(94 88.8 20)` over 20 ArrowRight).
  Focus rings paint accent-aware on all 10 in-picker tab stops (I3).
- **Readout (D)**: hero numbers on the display-2 rung with int/frac/unit
  rhythm, tnum declared, demoted commas; card-lock HOLDS — End/Home/End
  keyboard sweeps leave the card rect byte-identical (probe I5,
  `[16,121,695,721]` ×4). The blob is the material hero top-right (mobile:
  tucked inside the clipped card; lg: negative-inset corner anchor).
- **Motion (E)**: the orchestrated open is live in `getAnimations()` —
  plate-land 0/560ms · field-paint-in 180/420ms · stagger 360+40n/300ms —
  and fully absent under PRM reduce (I2/I2r). Space-switch cross-fades the
  overlay plate (566×224 snapshots on p3/lab/oklch switches, 300ms fade,
  clean teardown).
- **Residual note (taste, not gate)**: the GooBlob's visible body wanders
  inside its square canvas, so the lg corner-BREAK reads intermittently
  (canvas overhangs the corner always; the ball crosses it during its
  drift). A producer-side anchor bias would make the break constant —
  recorded for the R.W4/relay ledger, not regressed here.

## gradient (×6) — VERDICT: inherited keystone deltas only, no regression

Same composition as baseline; deltas are the wave-global ones: Fraunces on
the display rungs, the accent axis on interactive chrome, the warm dark
ladder, wider pane clamp. Controls intact (type/space/hue selects, angle
slider, easing rail). No layout breaks at any viewport.

## browse (×6) — VERDICT: no regression + the K-INV5 degraded state

Same failure-state parity as baseline (the backend is CORS-dead from
localhost in both runs): "Failed to load palettes / Tap to retry". Under
the hood the K-INV5 latch now bounds the damage — exactly ONE doomed
network attempt per cold session, ZERO further API requests across
browse/palettes navigation while latched; the save surface names the state
("backend offline — saved locally", small-caps hairline chip) and Publish
disables with an in-register annotation. My-Palettes composition unchanged.

## Gate ledger (close)

| Clause | Oracle | Result |
|---|---|---|
| (a) Fraunces real face | probe-keystone K1 | GREEN |
| (b) thumb tracks model under keyboard | probe-instrument I1 | GREEN |
| (c) orchestrated open in getAnimations / absent under PRM | I2 + I2r | GREEN |
| (d) ComponentSliders ≤ 400 LoC | I4 (368) | GREEN |
| (e) focus ring on every keyboard control | I3 (10/10) | GREEN |
| (f) fresh probe RED→GREEN | keystone: `probe-runs/pre-wave-RED.txt` → `laneA-post-GREEN.txt`; instrument: `probe-runs/pre-wave-RED-instrument.txt` → `lanesCDE-post-GREEN.txt` | GREEN |
| overlay riders | first-paint contour + caption, clear-plate, outbound-only detent, shared ink regime | GREEN (Lane B `lane-b/EVIDENCE.md` + the B4 sample above) |

**Falsification provenance (gate-(f), corrected).** The two probes have DIFFERENT
provenance and the earlier ledger conflated them. `probe-keystone.mjs` (Lane A —
K1/K2/K3) is a genuine **born-RED live** oracle: its 3/3 RED in
`probe-runs/pre-wave-RED.txt` was captured live against the pre-wave tree before
Lane A landed. `probe-instrument.mjs` (clauses b/c/d/e + I5 + I2r) was authored at
the CLOSE commit (`31723ea`) and had **no live pre-wave capture**; its
falsification is **retroactive** — captured 2026-07-04 by running the close-commit
probe against a worktree at `b2544c3` (dev-served, node_modules+dist symlinked),
recorded verbatim in `probe-runs/pre-wave-RED-instrument.txt`. That run is **4/6
RED**: the four hard-gate clauses **b/c/d/e (I1/I2/I3/I4)** are genuine
retroactively-falsified oracles (RED at b2544c3 by construction — the Lane C/D/E
features are absent). The remaining two clauses run **GREEN at b2544c3** and are
therefore **standing regression guards, never falsified oracles**: **I5** (card-lock
— the pre-wave readout already held the card rect stable, so its D1/U31 reflow was
not present to falsify) and **I2r** (PRM-absent — a negative assertion, vacuously
green while the open-beat animations do not exist). Post-wave both probes are 3/3 +
6/6 GREEN (`laneA-post-GREEN.txt`, `lanesCDE-post-GREEN.txt`).
