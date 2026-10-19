SERVED MODEL: claude-opus-5-5

# W6 ADDENDUM 2026-10-19 — oracle ordinal aliases (R47 / NG-14)

Authority: COHESION §0gc.4 (ESC-W11-ORACLE-ORDINAL-R47 RULED: renumber the W6 mints). Unit X.W11.ci2.

The three X:CSS-1 gate oracles minted at `e0e204a9b` (2026-09-19, X.W6.f) took ordinals that T-era oracles already held. That made two different oracles share one ordinal, which is the collision X-W1-FOLD §R47 predicted and `scripts/ci/oracle-slate.mjs` §D (R47 / NG-14) reports. The W6 mints now take the next free ordinals after the highest shipped one (`o29`). No shipped T-era ordinal is reused, and the T-era holders keep theirs.

| Old (dated records cite this) | New (live) | X:CSS-1 gate | T-era holder that keeps the ordinal |
|---|---|---|---|
| `e2e/smoke/oracles/o21-space-catalog-truth.spec.ts` | `e2e/smoke/oracles/o30-space-catalog-truth.spec.ts` (declares `O-30`) | f3 | `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (`ee7b1dc50`, 2026-07-11) |
| `e2e/smoke/oracles/o22-specimen-legibility.spec.ts` | `e2e/smoke/oracles/o31-specimen-legibility.spec.ts` (declares `O-31`) | f4 | `e2e/smoke/oracles/o22-status-lamp.spec.ts` (`e4ddd3278`, 2026-07-11) |
| `e2e/smoke/oracles/o24-specimen-dot-identity.spec.ts` | `e2e/smoke/oracles/o32-specimen-dot-identity.spec.ts` (declares `O-32`) | f8 | `e2e/smoke/perf/o24-lcp-identity.spec.ts` (`5cdccb529`, 2026-07-10) |

**Reading rule.** Dated records are not rewritten (E-3). They are 118, 91 and 76 tracked files for the three old names, measured at this addendum with `git grep -l <old-stem> | wc -l`. Anywhere a record dated before 2026-10-19 names `o21-space-catalog-truth`, `o22-specimen-legibility` or `o24-specimen-dot-identity`, or uses a bare `o21`/`o22`/`o24` for an X:CSS-1 gate (f3 / f4 / f8), read it as the new ordinal in this table. A bare `O-21`/`O-22`/`O-24` with no X:CSS-1 context still means the T-era holder.

The `O-30`..`O-32` tokens here are oracle ordinals. They are a different namespace from the coordination-mail rows that COHESION also numbers `O-30`, `O-32` and so on.
