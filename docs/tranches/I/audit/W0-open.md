# I.W0 — Open · baseline · cohort handshake

**Wave**: I.W0 — Open + baseline + cohort handshake.
**Closed**: 2026-05-28 (same-day open in cohort with fourier-E).
**Status**: GREEN.
**Authority**: `I.md §3` row W0.

## §1 — Tranche open ceremony

`docs/tranches/I/I.md` + `PROGRESS.md` authored from the fourier-side cohort spec at `docs/tranches/E/coordination/COHORT-VALUE-JS-I.md`. The 4-wave shape (I.W1 visibility split → I.W2 soft-delete → I.W3 admin idempotency → I.W4 SOTA envelopes) lands the 53 DEFERRED-TO-VALUE.JS conformance cells from fourier-D.W5 CONFORMANCE-MATRIX.

## §2 — Baseline data captured

Production palette-db, 2026-05-28 audit-time:
- Total palettes: 10
- By status: 9 `published`, 1 `featured` (0 `hidden`, 0 `draft`)
- `visibility` field present: 0 (clean slate)
- `tier` field present: 0 (clean slate)
- 8 pre-D.W2-vintage docs had missing invariant fields (tags/forkCount/currentHash/userSlug/...) — surfaced + backfilled at I.W1 cutover (per §4 below).

## §3 — Operational baseline fixes (I.W0)

| Surface | Before | After | Rationale |
|---|---|---|---|
| `api/deploy.sh:7` (SERVER) | `mbabb@mbabb.fridayinstitute.net` (NXDOMAIN) | `mbabb@34.197.214.67` (the AWS EC2 host; matches all `*.babb.dev` CF CNAME records) | the legacy hostname doesn't resolve since D.W10 babb.dev migration |
| `api/deploy.sh:32` (smoke probe URL) | `https://mbabb.fi.ncsu.edu/colors/` (pre-D.W10 VPN host) | `https://api.color.babb.dev/palettes` (live constellation post-rename) | reflects D.W10 + D.W11 hostname migration |
| `api/.env.example:11` (ALLOWED_ORIGINS) | `https://mkbabb.github.io` (legacy GH Pages) | `https://color.babb.dev,https://fourier.babb.dev` (multi-origin shape per CRUD-COHESION-E §4) | upstream-commit-of-host-edit; mirrors the fourier-E.W1 host `.env` T4 fix in the source-tracked spec |

## §4 — Cohort handshake with fourier-E

| Cohort artifact | Status |
|---|---|
| fourier-E.W1 T4 host palette-api `.env` ALLOWED_ORIGINS adds `https://fourier.babb.dev` | **LIVE** at 2026-05-28T04:53Z (fourier commit `d245bfd`) |
| value.js-I.W0 mirrors the multi-origin shape in `api/.env.example` | **LIVE** (this wave) |
| Live cross-repo CORS preflight from fourier origin → api.color | **OK** (verified at fourier-E.W1 close; 204 + ACAO echoes `fourier.babb.dev`) |
| Live FK round-trip GET `/palettes/{slug}` from fourier origin | **OK** (200 + envelope rendered) |
| `palette_slug` FK contract clause (`research/README.md §R1` in fourier) | **BINDING from both sides** at browser layer |

## §5 — Sibling repo state at audit-time

- value.js HEAD at I.W0 open: `f895048` (post-H v0.10.0 + release-readiness baseline).
- fourier HEAD at I.W0 open: `d245bfd` (post-W1 T4 fix).
- Cohort framing: fourier-E + value.js-I; close together OR named-successor.

## §6 — W0 close gate

W0 closes when (a) I tranche docs authored; (b) deploy.sh hostname + smoke probe unbreakage applied; (c) `.env.example` documents multi-origin shape; (d) cohort handshake verified. All four conditions met. **W0 is GREEN.** W1 (the visibility split) opens.
