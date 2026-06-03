# Execution order + per-session prompts (2026-06-03)

For the 6 open Claude Code sessions: **value.js · fourier-analysis · keyframes.js · glass-ui · slides · muster**. Order honors the audit's serial spine; prompts are copy-paste, each grounded in its committed spec + gating on its own green CI (inv-27). (sudoku/bbnf/words/speedtest/deploy have no session — see the tail.)

## The two HARD gates (DEC-1/Q1: publish-gated, NO `file:`)
1. **keyframes `3.0.0`** must PUBLISH before its dep-cohort consumers bump (sudoku, bbnf, slides, value.js, fourier inherit the PRM gate + the barrel split).
2. **glass-ui `3.2.0`** must PUBLISH before consumers adopt P9 / asideSide / deriveAurora / useTextHighlight / Fraunces / VT-hardening.

## Order
- **T0 — start in parallel (no cross-repo wait):** keyframes (→publish 3.0.0) ‖ glass-ui (→publish 3.2.0) ‖ value.js K.W2 ‖ slides B.W0–W2 ‖ fourier dev.sh-P0 + J.W2 ‖ muster K.W3-local.
- **T1 — consumers, AFTER both roots publish:** value.js K.W4/W5 ‖ fourier J.W5–W7 ‖ muster token-adopt ‖ slides /deck-adopt B.W3–W5.
- **T2 — AFTER value.js K.W6 / glass-ui v1.0.0:** glass-ui Metaballs+BlobDot ‖ value.js blob-LIFT + tranche L.

---

## ① keyframes.js  — SERIAL ROOT (T0, publish first)
> Execute tranche A per `docs/tranches/A/audit/constellation-grand-audit-2026-06-02.md` + `A.md`. **(1)** Add the reduced-motion gate to the shared `RAFPlayback` (default-honor PRM; heavy engines snap to final frame) and **EXPORT it** so glass-ui `/motion` + every consumer inherits — this roots the constellation-wide PRM-on-JS-RAF epidemic. **(2)** `scheduler.yield()` in `AnimationGroup.tick()`; WAAPI `linear()` spring-curve widening; dev-only LoAF; collapse the 3 `.ready()` copies to `EasingResolvable`. **(3)** Cut **`3.0.0`**: the 2.2.0 barrel split (`Animation`→engine chunk) was a breaking change shipped as a minor (it blanks sudoku, latently breaks bbnf) — re-release semver-correct as 3.0.0 + type-only dts. You are a serial root: **publish 3.0.0** before the dep-cohort bumps. Gate on green CI.

## ② glass-ui  — SERIAL ROOT (T0, publish first)
> Execute AS.W5 per `docs/tranches/AS/design/AS.W5-constellation-primitives.md` (incl. **§6 P9**). **P9 FIRST** (it unblocks fourier + ~5 other silently-unstyled consumer surfaces): ship glass-ui's component-utilities (`rounded-panel` + siblings) as **build-independent static CSS** in `@mkbabb/glass-ui/styles` (consumers must not have to scan glass-ui's components for utilities) + **round `ConfiguratorLayer` content** (keep flush row dividers). Then the primitives: `Configurator asideSide` + `--configurator-aside-min` token (**default RIGHT**, DEC-1), `deriveAuroraFromColor`, `useTextHighlight`, self-hosted **Fraunces `@font-face`** (opsz+SOFT+WONK), `vt.ready.catch` hardening, `--dock-fg-on-aurora` + DockIconButton `as`/`asChild`, a motion-safe Spinner/Pulse-breath. Inherit keyframes 3.0.0's PRM gate in `/motion`. Keep your `proof:*` fleet (DEC-6, divergence is correct). **Publish 3.2.0** before consumers adopt. Gate on the AS gate fleet green.

## ③ value.js  (T0 start → T1 finish)
> Execute K per `docs/tranches/K/design/K.W1-grand-audit-refinement.md` + `K.md`. **NOW (K.W2, no wait):** substrate green (`tsconfig.lib` split, dev.sh), CRUD functional test CR-1..4, strip the dock host `transition:all`, and the **blob C3 LOCAL fix** (one size-source — kill the 160%/POS_SCALE split; corner-anchor; satellite ResizeObserver gate; spring-mood). **AFTER glass-ui 3.2.0 + keyframes 3.0.0 publish (K.W4/W5):** aurora-derive (`deriveAuroraFromColor` — the 2nd-consumer gate) + dynamic-bg contrast guard; Fraunces face + φ-ladder + `:user-invalid`; `@property --active-color` + `@container` + `content-visibility` + `scheduler.yield` + `light-dark()` + View Transitions + vue-router 5; PRM via the inherited gate. v1.0.0 at K.W6; blob LIFT + tranche L after. Gate on vue-tsc 0 (glass-ui dist deleted) + 5-project Playwright green vs no backend.

## ④ fourier-analysis  (T0 P0+CORE → T1 frontend)
> Execute J per `docs/tranches/J/design/J.WC-frontend-grand-audit.md` + the J.md fold. **NOW (P0 + CORE, no wait):** fix `scripts/dev.sh` (the `PIDS` bash-3.2 negative-array-subscript that self-shuts the local stack); J.W2 remix/publish WRITE side; J.W5 independent parts — compose the empty-state **VOID** (configurator stays **RIGHT** per DEC-1), epicycle PRM gate, cross-page VT widen, trail alpha-taper. **AFTER glass-ui 3.2.0:** bump it → the configurator rounds for free (P9, zero fourier CSS change); adopt `useTextHighlight` for the equation-variable hover. **J.W6:** CRUD e2e + be the **instrumented-gate pilot** (real axe + Lighthouse — the audit had ZERO instrumented runs). **J.W7:** CSP `assetsInlineLimit:0` + font-preload `crossorigin`. Gate on green CI incl. the e2e arm.

## ⑤ slides  (T0 reframe → T1 adopt)
> Execute B per `docs/tranches/B/CONSTELLATION-FOLD.md`. **NOW (B.W0–W2, no wait — this is the serial prerequisite for glass-ui's `/deck` extraction):** kill the 1280×720→0.29 mobile letterbox (responsive reflow), fix the **inert `.dark` dock-contrast** (`color-scheme:dark`, not a class shadow), `<360px` dock collapse (GlassDock `density`), unscoped `<style>`→declarative `v-for`+`[data-state]`. **AFTER glass-ui ships `/deck` + 3.2.0:** adopt `@mkbabb/glass-ui/deck` (B.W3), home↔deck VT (B.W4). **(B.W5 Fraunces self-host CANCELLED — DEC-8: slides font stays as-is; keep the current CDN Fraunces, do NOT consume the glass-ui face.)** PRM-gate the constellation-bg RAF via the inherited gate. Zero-deferrals posture. Gate on typecheck+build, deploy-on-green.

## ⑥ muster  (T0 local → T1 token-adopt)
> Execute K.W3 per `docs/tranches/K/audit/grand-audit-fold-2026-06-02.md`. **NOW (no wait):** bind the computed-then-**discarded** verdict cascade (`revealedRows`/`eliminatedRevealed` → RankedVerdict/EliminatedFold); fix CLS 0.0729 via a single `--configurator-aside-min` source (local fallback now); spring micro-tweens; PRM-gate the 4 JS RAF loops. **AFTER glass-ui 3.2.0:** re-point the local `--configurator-aside-min` to the upstream token. Controls stay **RIGHT** (DEC-1 N/A for muster). Stays a coda — no new wave. Gate on CLS≤0.05 + 107-spec + axe-24/0.

---

## No-session repos (booked / ride the cohort)
- **sudoku** (P0 blank): rides the keyframes **3.0.0** dep-cohort — bump keyframes + update the 4 `Animation`/`CSSKeyframesAnimation` imports to the 3.0.0 path (`usePathAnimation.ts:2`, `glyphAnimations.ts:7`). No session → book to a sudoku session or the dep-cohort wave.
- **bbnf-buddy** (latent P0 + ZERO PRM): bump glass-ui 2.0→3.1.1 + keyframes 3.0.0; PRM-gate the mascot loops. No session → book.
- **words** (SW prod-fail P0): Workbox migration + the SW fix; CSP headers; warm palette. No session → book.
- **speedtest** (AT): dial-CLS revert-layer + VT re-founding (after glass-ui `.ready`) + the instrumented gate. friday.institute deploy. No session.
- **deploy**: ζ.5–ζ.10 (rsync→git-pull, DNS verify, two-host topology, CI-parity + the instrumented Lighthouse/axe gate, dev.sh-template vend). No session.
