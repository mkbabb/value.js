# T.W2 boot-lane recovery brief — 2026-07-10 (the §Recovery four-step, step 2)

**Lane**: T.W2 single-writer (boot chain `demo/color-picker/composables/boot/*` +
`App.vue` + `index.html`), worktree `wf_5011a3ae-57c-1`, branch
`worktree-wf_5011a3ae-57c-1`.
**Wall point**: after the O-3 headed annex completed (log written 14:43), before
the close bookkeeping. No half-authored beat (C4 order held: the tree carries
W2-1 → W2-2 → M-15 → W2-3 → W2-4 → W2-5, each a complete commit).

## §1 Audit of the partial (step 1)

**Committed (7, in C4 order — each with green per-item gates in its body):**

| Commit | Item |
|---|---|
| `5cdccb5` | O-24 mint — the BEFORE record, pre-beat (both schemes, built bundle) |
| `ed24358` | W2-1 hydration-before-derivation (O-2 + O-1 flip records in-body) |
| `f354f42` | W2-2 the gradient ground (luma-leap gate minted; F-6 dark-honest) |
| `b496952` | M-15 routed hunk (derivedLightness exposed; BG_LIGHTNESS retired) |
| `e02fa61` | W2-3 the overture (O-4 1×+6× green; O-24 re-run; O-5 honest-red spike leg) |
| `400fe15` | W2-4 the emerge beat (no-pop by construction; PRM-gated keyframes) |
| `244459e` | W2-5 T-26 calibration Q2-NOW (O-6 green; drag path untouched) |

**Uncommitted at the wall (untracked)**: `audit/pi/w2/w2-annex.mjs` (the O-3
harness) · `headed-annex-log.txt` · `owner-frames/` (6 frames) ·
`screencast/` (223 frames).

**Partial signatures checked (§Recovery)**: no out-of-order beat; the annex log
is NOT a swallowed-wait artifact (the harness ran to completion and wrote its
report), but per the rider the capture is UNTRUSTED and will be RE-DRIVEN
post-fix.

## §2 What the annex found (the honest red)

**Gate 5b (PRM instant-states law) FAILED both schemes** at annex run 14:43:

- light: canvas opacity states {0, 1} OK, but max boot-animation count 1 (must be 0);
- dark: canvas opacity states {0, **0.574696**, 1} — a mid-fade painted under
  `reducedMotion: reduce`, + boot-animation count 1.

The W2-3 CSS carries PRM overrides (`transition: none` on the canvas,
`animation: none` on the dock land, `no-preference` wrapping on blob-emerge +
plate-land) — yet an opacity-class animation ran and a mid-fade was computed on
the canvas in dark. Root cause NOT yet identified at the wall.

## §3 Remaining work-order (step 3 — the resume list)

1. Reproduce the 5b PRM breach with an instrumented probe (dump the matched
   animations: target, name/property); root-cause and fix INSIDE the
   single-writer surface. Law: first content frame ≡ the settled composition —
   under PRM the field is a static state change, no intermediate beat state.
2. **T-32 rider (MANDATE §0.5, owner 2026-07-10)**: "The aurora should have a
   few more zones" — raise the AuroraZones count as a W2-5 calibration knob
   (producer atom `zones {count, arrangement}`, demo-configurable), judged
   inside the T-26 bracket across seeds; record landed count+arrangement in the
   rider commit body (the W2-5 base commit predates the rider).
3. RE-DRIVE the full headed annex (O-3 both schemes · 5b PRM-ON legs · O-26
   headed · owner frames green/warm/neutral × both schemes · screencast) — the
   §Recovery re-drive law; commit the π artefacts.
4. Q14 gate row: the PI-1 LHCI measurement at close (3 runs, lighthouserc
   budgets) recorded in `pi1-delta-ledger.md` with the contribution attributed
   (reveal-only law · font strike · hydration-first) vs baseline `28836873580`.
5. PP-8 repo-wide sweep (demo ≤400 LoC cap · legacy grep · cast ledger) +
   tool-artefact grep over touched docs.
6. Close cadence: lint 0 · typecheck 0 · vitest green · full playwright (incl.
   oracle mints) · drag-path byte-identity diff evidence · w2 close-artefacts
   record + PROGRESS.md cites · status commit · clean `git status` · seam audit
   (`git worktree list` = the two live lanes only).

## §4 Port discipline (standing)

Sibling W3 lane (`wf_5011a3ae-57c-2`) holds :9461/:9462 (verified by pid cwd).
This lane's playwright config serves :8090/:8091 from THIS tree (verified free
pre-run); the owner's :9000 untouched.
