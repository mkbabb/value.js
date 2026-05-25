# Coordination — value.js H ↔ glass-ui ↔ keyframes.js ↔ speedtest ↔ fourier-analysis

Cross-repo manifest at H open. Inherits G's `coordination/Q.md` §7.1 (G close summary) as the baseline; refreshed at peer HEADs per `audit/H-AUDIT-4`.

## §1 — Peer HEADs at H open (2026-05-22)

**This repo (value.js)**: `tranche-h` @ `e166d37` (G merge commit; v0.9.0 tag).

**Peer repo (glass-ui)**: HEAD `3822f48` — **ZERO drift vs G close**. 38 commits unpushed to origin (33 + 5 G-window AK-publisher waves). Contraction posture INTACT. AK-tranche shipped 17-entry sub-barrel + InstrumentRail subpath; serves speedtest AK, not value.js's ask backlog. No new tranche-open since AK.

**Peer repo (keyframes.js)**: HEAD `470814e` — **ZERO drift vs G close**. 14 commits unpushed to origin (the entire Q.W1..F.W2 chain). R11 = LEAVE LOCAL per user ratification at G open. Precept submodule still divergent `458c2d1` (vs upstream `68d9b20`).

**Peer repo (speedtest)**: HEAD `e9f85c16` — **ZERO committed drift**. *Staged* (uncommitted) `docs/tranches/AL/AL.md` — **AL opened in planning-only posture, same weekend as H, same canonical 6-agent-audit invocation**. CW Phase-2 STILL PLANNING-ONLY.

**Peer repo (fourier-analysis)**: HEAD `926ca6a` — ZERO drift. 109-file dirty tree exact. Chronic.

**Shared submodule**: `docs/precepts` at `68d9b20` — ZERO drift through D → E → F → G → H open.

**Constellation-wide G→H boundary: ZERO mutation across every sibling.** No (c) trigger fired clean.

## §2 — Glass-ui (chronic — 8 standing asks at 6-tranche carry)

The 8 standing primitive/blob asks remain OPEN; the Metaballs ask is partially renegotiated (per G's Q.md §2.1). **H-AUDIT-2 §3 + the user's doubled "delineate deferred items" clause demand sharper disposition than continued carry** — H ratification block A asks the user to choose among 4 options.

### §2.1 — Metaballs ask renegotiation (re-pinned at H open)

Unchanged from G close (`docs/tranches/G/coordination/Q.md §2.1`). The OPEN sub-asks are: pointer input, per-blob opacity, HSV color perturbation, WebGL context-loss recovery, MetaballCanvas mode="layout" (possibly subsumed by AJ-W1-β `positioning="local"`), pauseOnHidden.

### §2.1.1 — Proposed API surfaces for OPEN Metaballs sub-asks

Authored at G open (`docs/tranches/G/coordination/Q.md §2.1.1`); value.js owns prior-art in `demo/@/components/custom/goo-blob/useMetaballRenderer.ts`. These shapes are PROPOSALS only; glass-ui maintainer holds authorship + final shape. H ratification Option (C) authorizes surfacing them to glass-ui maintainer at the next non-AK tranche-open + briefing AL with the sole-consumer stake.

### §2.2 — Glass-ui health

Glass-ui chronic-unpushed grew 33 → 38 commits during the G window (AK-publisher waves). The 8-ask backlog is unchanged. **value.js is the confirmed sole-identified-consumer of `glass-ui/MetaballCanvas`** (per G-PEER-SPEEDTEST §2 + H-AUDIT-4: AK-W5 retired speedtest's `MetaballCanvas` consumers; AL is the deciding peer on publisher-retirement).

## §3 — Keyframes.js (R11 LEAVE LOCAL — unchanged)

Per H-AUDIT-4: HEAD `470814e` (unchanged from G close); 14 commits unpushed; R11 = LEAVE LOCAL. Precept-pin drift `458c2d1` (peer-authorship; chronic at 6-tranche carry).

## §4 — Speedtest (NEW: AL OPENED planning-only)

Per H-AUDIT-4: speedtest staged `docs/tranches/AL/AL.md` — **AL opened with the same canonical 6-agent-audit invocation as H**, same weekend, planning-only. AK retired speedtest's MetaballCanvas consumers (per AK-W5). AL is the deciding peer on `glass-ui/MetaballCanvas` publisher-retirement; **value.js becomes the sole-identified-consumer + the deciding consumer voice**.

H is encouraged to brief AL (via prose, NOT a cross-repo write) with value.js's sole-consumer stake before AL ratifies publisher-retirement.

Speedtest does NOT consume value.js (G-AUDIT-4 §4.3 correction stands); CW Phase-2 remains INFORMATIONAL only.

## §5 — Fourier-analysis (chronic freezer — unchanged)

HEAD `926ca6a`; 109-file dirty tree exact. Pre-existing chronic; not actionable by H.

## §6 — Aggregate Q.md ledger at H open (inherits G + adds 16 H-target items)

### §6.A — H-target FOLD-INTO-H items (16 lanes across H.W1-W4 — see findings.md §2)

Routing summary; full detail in `findings.md`:
- 3 api/ lanes: H.W1.
- 3 src/ lanes: H.W2.
- 5 demo/ + invariant-extension lanes: H.W3.
- 5 micro-polish + close-docs lanes: H.W4.

### §6.B — Inherited PEER-AUTHORSHIP carry-forwards (chronic-deferred)

Unchanged from G's Q.md §6 except sharpened triggers per H ratification block A (the 4-option ask).

## §7 — Constellation health summary at H open (2026-05-22)

| Health-indicator | G close | H open | Verdict |
|---|---|---|---|
| Precept upstream HEAD | `68d9b20` | `68d9b20` (no advance) | NEUTRAL |
| Contract-v2 dev-resolution | GREEN | GREEN | GREEN |
| value.js `@deprecated` / `@ts-ignore` / `as any` counts | 0 / 0 / 0 | 0 / 0 / 0 | GREEN (all codified) |
| value.js `as unknown as` count | 4 | 4 | YELLOW → H.W2 target ≤ 3 + codified |
| value.js `vue-tsc --noEmit` errors | 0 | 0 | GREEN |
| value.js `dist/value.js` bundle | 125,496 B | 125,496 B | GREEN (≤ 148,480 ceiling) |
| value.js proof-script suite | 8 scripts | 8 scripts (H.W2 target 9 + 2 scope extensions) | GREEN |
| Cross-repo writes (G→H boundary) | — | **ZERO** | GREEN (F3 honored) |
| Glass-ui | `3822f48` | `3822f48` (no drift) | NEUTRAL |
| Glass-ui primitive expansion (8 asks at 6-tranche carry) | OPEN | OPEN — sharper-disposition ratification asked (Block A) | YELLOW (peer-auth) |
| Keyframes.js HEAD | `470814e` (LOCAL) | `470814e` (LOCAL — unchanged) | YELLOW (R11 LEAVE LOCAL) |
| Speedtest | AK active | AK closed/AL OPENED (planning-only) | ACTIVE — AL coordination signal |
| Fourier-analysis | UNRESOLVED (chronic) | UNRESOLVED (chronic) | YELLOW (chronic) |

## §8 — Authority

Pinned: every `audit/H-AUDIT-1..6` deliverable + G's `coordination/Q.md` §7.1 (G close) + `docs/tranches/G/H-SEED.md` (predecessor-authored forward-carry seed) + (for H.W1 Lane A) the actual `api/src/services/palette/crud.ts` lines 101-119 + 139-184 (the createPalette + patchPalette cross-collection write sites).
