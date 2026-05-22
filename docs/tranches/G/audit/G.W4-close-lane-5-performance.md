# G.W4 close-audit Lane 5 — performance

**HEAD**: `9902036` (post-G3-remediation).
**Run by**: the orchestrator directly (not an agent dispatch) — lane 5 rebuilds `dist/`, so running it sequentially after the 6 read-only audit lanes avoids a `dist/` read/write race with lane 4 (which reads `dist/` for the proof scripts).

## Bundle size

| Metric | F close | G.W1 (post-decomp) | G close (`9902036`) | Verdict |
|---|---|---|---|---|
| `dist/value.js` raw bytes | 124,936 | 125,242 | **125,496** | PASS — ≤ 148,480 ceiling; 22,984 B headroom |
| gzip | 38.33 kB | — | 38.47 kB | NEUTRAL |

The +560 B vs F close is structural: G.W1 Lane B's 1→9-module decomposition adds per-module Rolldown `//#region` source markers (~+314 B), and G.W2's typed wrappers add a small amount of erased-at-emit type machinery plus the `channelOf`/`setChannel`/`unwrapDeep` helper bodies. Shipped logic is unchanged in behaviour; the absolute gate holds with ~23 KB of headroom.

## Benchmark medians (`npm run bench` at `9902036`)

| Bench | Gate | G-AUDIT-3 (G open) | G close | Verdict |
|---|---|---|---|---|
| L8 — color channel-access | ≥ 5× | 10.38× | **11.00×** | PASS |
| DIRECT_PATHS — HSL→RGB hot path | ≥ 2× | 4.56× | **4.49×** | PASS |
| nameParser — broad-regex + Set-lookup | ≥ 5× | 41.68× | **39.34×** | PASS |

All three medians are within run-to-run noise of the G-open baseline. The G.W2 typed strengthening (mapped-types, typed channel accessors) is erased at emit — zero JIT pessimization. The G.W4 G3 remediation (relocating the `DIRECT_PATHS` table to `conversions/direct.ts`) did not move the HSL→RGB median (4.49× vs the pre-remediation 4.69× — within noise).

## Verdict

**PASS** — bundle within ceiling (23 KB headroom), all bench medians above floors with substantial headroom, zero regressions across the G window.
