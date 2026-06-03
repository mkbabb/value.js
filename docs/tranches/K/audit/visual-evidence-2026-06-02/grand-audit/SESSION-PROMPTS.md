# Execution order + per-session prompts (2026-06-03)

Lean dispatch for the 6 open Claude Code sessions. Each session executes its tranche **in totality** per its own committed docs (which carry all grounded detail — DEC-1..8, P9, file:line, dispositions); the prompts add ONLY the cross-repo serial position no single repo's doc can know.

## Two hard gates (DEC-1/Q1 — publish-gated, no `file:`)
**keyframes `3.0.0`** and **glass-ui `3.2.0`** must PUBLISH before consumers adopt.

## Order
- **T0 (parallel, no wait):** keyframes (→pub 3.0.0) ‖ glass-ui (→pub 3.2.0) ‖ value.js (K.W2) ‖ slides (B.W0–W2) ‖ fourier (dev.sh-P0 + J.W2) ‖ muster (K.W3 local).
- **T1 (after both roots publish):** value.js K.W4/W5 ‖ fourier J.W5–W7 ‖ muster token-adopt ‖ slides B.W3–W5.
- **T2 (after value.js v1.0.0):** glass-ui Metaballs+BlobDot ‖ value.js blob-lift + L.

## Prompts

**① keyframes.js** — *serial root, publish first*
> Execute tranche A in full per `docs/tranches/A/` (incl. the `3.0.0` semver-correct re-release + the `RAFPlayback` PRM gate). Publish 3.0.0 before the dep-cohort bumps. Gate on green CI.

**② glass-ui** — *serial root, publish first*
> Execute AS in full per `docs/tranches/AS/` (incl. `design/AS.W5-constellation-primitives.md` §6 **P9 first**). Publish 3.2.0 before consumers adopt. Gate on the AS gate fleet.

**③ value.js**
> Execute tranche K in full per `docs/tranches/K/`. K.W2 starts now; K.W4/W5 adopt after glass-ui 3.2.0 + keyframes 3.0.0 publish. Gate on vue-tsc 0 + 5-project Playwright green vs no backend.

**④ fourier-analysis**
> Execute tranche J in full per `docs/tranches/J/`. The `dev.sh` P0 + J.W2 start now; J.W5–W7 adopt after glass-ui 3.2.0. Gate on green CI incl. the e2e arm.

**⑤ slides**
> Execute tranche B in full per `docs/tranches/B/`. B.W0–W2 start now (the `/deck` extraction prerequisite); B.W3–W5 adopt after glass-ui ships `/deck` + 3.2.0. Gate on typecheck+build, deploy-on-green.

**⑥ muster**
> Execute K.W3 in full per `docs/tranches/K/`. Starts now; the upstream token re-point adopts after glass-ui 3.2.0. Gate on CLS≤0.05 + 107-spec + axe-24/0.

## No-session repos (book to a session or the dep-cohort)
- **sudoku** (P0 blank) — rides the keyframes 3.0.0 cohort. **bbnf** (latent P0) — glass-ui+keyframes bump. **words** (SW P0), **speedtest** (AT), **deploy** (ζ.5–ζ.10 + the instrumented gate) — each per its committed audit doc.
