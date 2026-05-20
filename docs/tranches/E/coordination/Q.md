# Coordination — value.js E ↔ glass-ui ↔ keyframes.js ↔ speedtest ↔ fourier-analysis

**Artefact class**: `coordination/Q.md` — value.js E's cross-repo manifest. Successor to `tranches/D/coordination/Q.md`.
**Date**: 2026-05-20 (E opened).
**This repo**: value.js, tranche E, branch `tranche-e` (E opens off master post-D-merge `eae8afc`; tagged `v0.6.0` at `7ac4ecc`).
**Peer repo (glass-ui)**: tranche Q **CLOSED** at `4b16de7` (v1.9.2); post-Q ships `ce5aad8` (v1.9.3, contract-v2). **HEAD at E open: `66e9b8f`** (5 commits post-Q-close: `ce5aad8` contract-v2, `ecd0679` aurora lazy-arm, `e2e5303` Safari aurora fallback, **`9275584` `./styles.css → dist/glass-ui.css`** — KEY E-relevant ship, `0124a8b` motion-token canon, `66e9b8f` chart-token swap).
**Peer repo (keyframes.js)**: v2.1.1 / HEAD `0909177` — code-side contract-v2 OK at D open; no new commits since. Precept submodule pin `458c2d1` (off-target on a divergent precepts tree per `E-AUDIT-4 §5`).
**Peer repo (speedtest)**: HEAD `9d22bcdf` (tranche AI W6 Vite-upgrade ruthless wave; **tranche CW seed at `61079cb1`** — monorepo workspace transposition; planning-only).
**Peer repo (fourier-analysis)**: HEAD `926ca6a` — dev-resolution contract adopted; consumes `@mkbabb/value.js` easings (5 files, no v0.6.0 breakage).
**Shared submodule**: `docs/precepts` at `68d9b20` (contract-v2 codification SHA). Value.js + glass-ui pinned; speedtest 1 commit behind (benign); keyframes.js on divergent tree; fourier-analysis no submodule.

## §1 — Inheritance from D ↔ peer-state

D's `coordination/Q.md` recorded the post-D-close cross-repo state. E inherits + refreshes against the post-D peer activity:

- **Glass-ui** shipped 5 commits in its post-Q-close window. None are the 7 D-filed primitive/blob asks. ONE (`9275584`) closes the D-FINAL-named contract-v2 §2.1 keystone gap. TWO (`0124a8b` motion canon, `9275584` styles.css) open new value.js-side adoption opportunities.
- **Keyframes.js** is unchanged; the v0.6.0 consumption-update ask remains filed.
- **Speedtest** opened tranche CW (monorepo workspace transposition). Value.js participates as CONSUMER.
- **Fourier-analysis** is in a transitional state (109-file dirty working tree per `E-AUDIT-4 §6`); the W-HANDOFF bundle is UNAPPLIED. Value.js cannot help.
- **Precepts** upstream has no commits after `68d9b20`. No advance needed at E open.

## §2 — Glass-ui ship-state at E open (HEAD `66e9b8f`)

The 5 post-Q-close commits re-verified per `E-AUDIT-4 §2`:

| Commit | Date | Ship | E-relevance |
|---|---|---|---|
| `ce5aad8` | 2026-05-19 | Contract-v2 publisher abrogation (v1.9.3) | LANDED at value.js D.W1 |
| `ecd0679` | 2026-05-19 | `useAurora` lazy-arm — defer shader compile-link past first paint | DEMO PERF — no value.js consumer change required |
| `e2e5303` | 2026-05-19 | Aurora Safari post-paint double-rAF | DEMO ROBUSTNESS — verify the demo's aurora path |
| **`9275584`** | 2026-05-19 | **`./styles.css → dist/glass-ui.css` subpath** (SFC-scoped compiled surface) | **PRIMARY E.W0 WIN — adopt the compiled subpath; may retire/narrow `siblingFsAllowTransient`** |
| `0124a8b` | 2026-05-19 | `--motion-duration-*` / `--motion-delay-*` token canon | E.W4 — adopt token canon |
| `66e9b8f` | 2026-05-20 | Chart-jitter / chart-upload color-token swap (AH.W2-C — speedtest XR work in glass-ui's tree) | NOT E-relevant (no chart consumers in value.js demo) |

## §3 — Glass-ui gap list (E's filing)

Inherits D's `§3` rows. Post-D-close updates:

| Gap | Evidence | Status | Wave (consumes) |
|---|---|---|---|
| **`./styles.css` → `dist/glass-ui.css` subpath** | `glass-ui:package.json` post-`9275584` declares `"./styles.css": "./dist/glass-ui.css"` | **PARTIALLY MITIGATES D's contract-v2 §2.1 keystone gap** — the SFC-scoped surface is now `dist/`-routed. The Tailwind-source `./styles` subpath still resolves to `src/` (a structural distribution-model question); E.W0 verifies whether `siblingFsAllowTransient` can fully retire or just narrow. | **E.W0 Lane A** |
| **metaballs API additions (7)** — `positionSource`, pointer input, per-blob opacity, HSV perturbation, context-loss recovery, `MetaballCanvas mode="layout"`, `pauseOnHidden` | unchanged from D | STANDS | a value.js demo-abstraction tranche post-glass-ui-ship |
| **Aurora `deriveAuroraPalette(baseColor, opts)` + `deriveAuroraConfig(baseColor, opts)`** | unchanged from D | STANDS | glass-ui successor; value.js demo-abstraction tranche post-ship |
| `BlobDot` organic-dot primitive | unchanged from D (16 `WatercolorDot` instance sites across 9 files) | STANDS | glass-ui successor; value.js extirpation tranche post-ship |
| `SelectTrigger size` prop | unchanged | STANDS | demo markers stay |
| `DockSelectTrigger clampLabel` | unchanged | STANDS | as above |
| `TooltipContent variant="mono"` | unchanged | STANDS | as above |
| `Button size="icon-sm"` rung | unchanged | STANDS | as above |
| **`<Tabs variant="underline">` on the provider family** | demo's `.underline-tabs` override still live | OPEN | demo override stays until glass-ui ships |
| **Contract-v2 §2.1 keystone gap on `./styles`** (filed at D.W1 Step 1) | glass-ui's `./styles` subpath still resolves to `./src/styles/index.css` (Tailwind-source — structurally `src/`) | **PARTIALLY MITIGATED** — `9275584` ships a parallel compiled-surface `./styles.css`. Full mitigation requires either (a) glass-ui ships Tailwind-source in a `dist/`-distributable form, or (b) consumers carry the narrow widening as a Tailwind-source-distribution exception. E.W0 verifies. | route forward |
| **`--motion-duration-*` / `--motion-delay-*` token canon** (new in `0124a8b`) | demo currently doesn't consume these tokens | **NEW — adopt at E.W4** | E.W4 motion-canon adoption |
| `Card` props fail-explicit | A.W1 consumed Q.W2 | RETIRED | — |
| `floating-panel-item` | B.W1 stripped — phantom class | RETIRED | — |

## §4 — Speedtest CW (monorepo workspace transposition)

**The largest in-flight constellation change.** Per `E-AUDIT-4 §4`:

- **Form**: pnpm-workspace overlay across the constellation (7 repos, 7 cadences, one `constellation/` root).
- **Authorship**: speedtest's CW lead. Value.js is a CONSUMER, not author.
- **Predecessor**: G-AH-D1 (decision from speedtest tranche AH).
- **Gating posture (per the CW seed `61079cb1`)**: Phase-0 quiescence (fourier-analysis is the lone Phase-0 blocker — 109 dirty files); user-explicit signal; AH-CLOSE (✓).
- **Value.js role**: when CW Phase-2 reaches value.js, it's a 1-line `package.json` flip (`file:../glass-ui` → `workspace:^`). No structural change.
- **E preparation (E.W4 sub-lane)**: verify value.js's CW-readiness:
  - Zero hard `dist/` aliases for `@mkbabb/*` siblings (already verified at D.W1).
  - `peerDependencies` declarations are correct (only `parse-that` currently; check if any `@mkbabb/*` should be peer-dep).
  - `siblingFsAllowTransient` removed (E.W0).
  - The contract-v2 publisher half stays green (post-E.W1 changes don't violate).

## §5 — keyframes.js

**HEAD `0909177` — no commits since D open.**

| Item | Status |
|---|---|
| Contract-v2 code-side compliance | OK at `0909177` |
| `package.json @mkbabb/value.js` pin | unchanged at file:../value.js per the D-open record |
| `AnimationOptions → CSSAnimationOptions` import rename | NOT done (filed for keyframes.js's schedule) |
| `Color.components.get(...)` → `color.L` migration (v0.6.0 breaking) | NOT done (filed for keyframes.js's schedule) |
| Precept-pin convergence | Pin at `458c2d1` on a DIVERGENT precepts tree (NOT mkbabb/precepts upstream) per `E-AUDIT-4 §5`. Value.js cannot fix from this side. File as tracked anomaly. |

E does not block on keyframes.js. Value.js's v0.6.0 is published; keyframes.js consumes at its own schedule.

## §6 — fourier-analysis

**HEAD `926ca6a` — dev-resolution contract adopted; 109-file dirty working tree (Phase-0 blocker for CW seed).**

- Consumes `@mkbabb/value.js@^0.4.6` (registry-pinned, lone non-`file:`-linked consumer).
- Imports easings (5 files: `easeInOutSine`, `timingFunctions`). NO Color/AnimationOptions/ValueUnit consumption → ZERO v0.6.0 breaking-change impact.
- W-HANDOFF bundle (3 patches) UNAPPLIED.
- Has NO `docs/precepts` submodule.

E does not block on fourier-analysis. No action needed.

## §7 — Precepts state

`docs/precepts` upstream: no commits after `68d9b20`. Value.js + glass-ui pinned; speedtest 1 commit behind (benign). No advance at E open.

## §8 — Constellation health summary

| Dependency | Status | Evidence |
|---|---|---|
| Precepts SHA (value.js ↔ upstream) | GREEN | both at `68d9b20` |
| Contract-v2 publisher compliance | GREEN | `proof:resolution` PASS at master HEAD |
| Subpath surface (`./styles.css`) | PARTIALLY GREEN | `9275584` ships compiled surface; Tailwind-source remains `src/` |
| Value.js D-close gates | GREEN | 10/10 pre-merge gates at v0.6.0 |
| Precepts SHA (constellation) | YELLOW | keyframes.js + speedtest off-target; tracking |
| Keyframes.js + speedtest adoption | YELLOW | filed asks, no movement during D's window |
| CW seed | YELLOW | planning-only, high-future-impact, value.js is CONSUMER |
| 7 D-filed glass-ui primitive asks | RED | metaballs + BlobDot + deriveAuroraPalette + Tabs underline — none shipped |
| fourier-analysis (Phase-0 CW blocker) | RED | 109 dirty files |

## §9 — Conflict-resolution protocol

Inherited from D: E writes value.js only. E reads peer repos at their HEAD-at-open SHAs (above). Each E wave that depends on peer-repo surface re-reads at wave open; E.W0 records the open-state across all 4 peers.

## §10 — Cross-tranche sequencing

E writes value.js only. No E wave blocks on a cross-repo ship.

| Order | Action | Cross-repo gate |
|---|---|---|
| 1 | E opens at D close | none |
| 2 | E.W0 — `./styles.css` adoption + state-at-open + chronically-deferred fold-confirm | glass-ui at `9275584` |
| 3 | E.W1 — library transposition (v0.7.0 candidate — breaking) | none |
| 4 | E.W2-W4 — api/ pipeline parity + e2e expansion + vendor/CI | none on critical path |
| 5 | E.W5 — close + merge + v0.7.0 tag | `§3` reflects close state |

CW preparation (E.W4 sub-lane) is read-only against speedtest's CW seed.

## §11 — Smoke-safari WebKit follow-up (filed at D.W6, folded at E.W3)

D's `D.W6` filed `smoke-safari` as a named-destination follow-up: a `smoke-safari` Playwright project + 30s sustained spec to catch iOS-Safari engine-specific bugs that Pixel-7 Chromium emulation misses. **E.W3 folds this.** Closing the D-FINAL-named successor destination.

## §12 — Summary table

| Item | Where | Status at E open |
|---|---|---|
| 7 standing glass-ui §3 primitive/blob gaps | §3 | unchanged at E open; carried forward |
| Glass-ui `./styles.css` subpath ship | §2, §3 | NEW E.W0 win |
| Glass-ui motion-token canon (`--motion-duration-*`) | §2, §3 | NEW E.W4 adoption |
| keyframes.js consumption update (post-v0.6.0) | §5 | filed; keyframes.js's schedule |
| Speedtest CW seed | §4 | filed; E.W4 prep |
| Smoke-safari follow-up (D.W6) | §11 | folds at E.W3 |
| Precepts SHA convergence | §7 | no movement needed at E open |
