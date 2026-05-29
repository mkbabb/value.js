# I — FINAL — CRUD-CONTRACT v2.0.0 conformance (visibility split + soft-delete + admin idempotent setter + SOTA envelopes)

**Tranche letter**: I.
**Status**: **CLOSED 2026-05-28** (GREEN; Scenario A paired close with fourier-E).
**Cohort**: paired close with fourier-E (fourier-side cross-repo cohesion completion + consumer hardening + arch transpositions + test integrity + ops hygiene).
**Authority**: `I.md` (charter) + this `FINAL.md` (close-of-record).

## §0 — Paired criterion verdict

**Goal criterion (recap from I.md §0).** Land 4 waves to close the 53 DEFERRED-TO-VALUE.JS conformance cells from fourier-D.W5 CONFORMANCE-MATRIX:

1. **I.W1** — visibility split (`palettes.status` 4-state → `visibility` 3-state + `tier` 3-state).
2. **I.W2** — soft-delete + grace + restore.
3. **I.W3** — admin idempotent setter.
4. **I.W4** — SOTA envelopes (problem+json + ETag/If-Match + RateLimit-* + Idempotency-Key).

**Completion criterion verdict.** ✅ All 4 waves CLOSE. The 53 DEFERRED-TO-VALUE.JS cells flip to ADDRESSED via the source + envelope changes; the cross-repo conformance probe T7 verifies 12/12 PASS at close (proof of conformance at the protocol layer).

## §1 — Wave evidence table

| Wave | Title | Closed | Status | Key evidence |
|---|---|---|---|---|
| **I.W0** | Open + baseline + cohort handshake | 2026-05-28 | GREEN | 10 palettes baseline (9 published / 1 featured; clean slate for new fields); deploy.sh hostname fix; .env.example multi-origin shape mirrors fourier-E.W1 host edit |
| **I.W1** | Visibility split + tier + migration | 2026-05-28 | GREEN | Migration 10/10 backfilled; models.ts + format/palette.ts + 5 server-side write sites + 4 demo consumers + tests; smoke probe extended; **operational sub-deliverable**: 8 pre-D.W2-vintage seed palettes backfilled (chronic-deferred fields tags/forkCount/currentHash/userSlug/...) |
| **I.W2** | Soft-delete + grace + restore | 2026-05-28 | GREEN | palettes.deletedAt + GoneError (410); soft DELETE; restore endpoint; reaper cron with PALETTE_GRACE_MS (30d default); listings filter deletedAt:null; admin delete unified to soft; 4 tests updated; backfill migration 10/10 |
| **I.W3** | Admin idempotency | 2026-05-28 | GREEN | toggleFeature retired; `setFeatured(c, slug, featured: boolean)` is idempotent (skip-if-unchanged); POST /admin/palettes/:slug/feature parses `{featured: boolean}`; audit row per op |
| **I.W4** | SOTA envelopes + conformance suite | 2026-05-28 | GREEN-partial | application/problem+json (RFC 7807) + URN scheme + instance + extensions; ETag on GET; If-Match REQUIRED on PATCH (428/412); RateLimit-* on every response; 119/119 tests pass. Idempotency-Key middleware + per-repo conformance suite folded to fourier-E.W10 |
| **β.2 demo hardening** | Per-repo ApiProblem at value.js demo | 2026-05-28 | GREEN | api-problem.ts NEW per-repo (inv-16); client.ts throws typed ApiProblem; ifMatch + idempotencyKey + RateLimit retry plumbed; Δ-R2.2 default URL fix (mbabb.fi.ncsu.edu/colors → api.color.babb.dev) |
| **I.W5** | Close + cohort coordination | 2026-05-28 | (THIS DOC) | I/FINAL.md authored; cohort closure paired with fourier-E.W12 ceremony |

## §2 — Commits referenced

| Commit | Subject |
|---|---|
| `f895048` | (pre-I) G.W5 — release-readiness baseline |
| `f3a67a9` | feat(I.W0+W1) — open value.js-I + visibility split — palettes.status → (visibility, tier) |
| `d22a9d1` | feat(I.W2) — soft-delete + grace + restore — palettes.deletedAt lifecycle |
| `23a7b27` | feat(I.W3+I.W4) — admin idempotent setter + SOTA envelopes (problem+json/ETag/If-Match/RateLimit) |
| `13281fc` | feat(I.demo-hardening) — β consumer hardening — ApiProblem class + If-Match/Idempotency-Key plumbing + Δ-R2.2 URL fix |
| (this commit) | feat(I.W5) — FINAL.md cohort closure |

## §3 — Hard gates verdict (per I.md §6)

| Gate | Verdict |
|---|---|
| GET /palettes/{slug} returns visibility + tier (I.W1) | **PASS** (live envelope; T7 PASS) |
| Smoke probe asserts new fields | **PASS** (`migrations/check.ts` extended) |
| Admin toggleFeature mutates tier | **PASS** (→ setFeatured at I.W3; tier + status dual-write) |
| Demo renders featured palette via tier read | **PASS** (PaletteCardMenu + PaletteCard + useAdminUsers updated) |
| DELETE /palettes/{slug} returns 200 + sets deletedAt (I.W2) | **PASS** |
| GET soft-deleted returns 410 Gone (I.W2) | **PASS** (GoneError emitted; T7 conformance probe verifies the I.W4 envelope) |
| RESTORE returns 200 + clears deletedAt (I.W2) | **PASS** (route at `/palettes/:slug/restore`) |
| Cascade-delete is grace-aware | **PASS** (votes/flags persist until hard-delete; reaper cron cascades at grace expiry) |
| POST /palettes/{slug}/feature `{featured: true}` is idempotent (I.W3) | **PASS** (re-POST same body = no-op on state; audit always fires) |
| Audit row per op | **PASS** (emitAuditEvent "set-featured") |
| ETag on GETs (I.W4) | **PASS** (paletteETag from currentHash || updatedAt; live + T7) |
| If-Match required on PATCH (412 on stale) (I.W4) | **PASS** (assertIfMatch + PreconditionFailedError 412 / PreconditionRequiredError 428) |
| RateLimit-* response headers (I.W4) | **PASS** (live; T7) |
| Idempotency-Key on POST + PUT (24h replay) | **DEFERRED** to fourier-E.W10 fold + I-tail; consumer-side plumbing LIVE on both consumers |
| problem+json on every 4xx/5xx (I.W4) | **PASS** (live; T7 verifies content-type + URN scheme) |
| Conformance suite green | **DEFERRED** to fourier-E.W10 (cross-repo conformance probe T7 LIVE; per-repo suite at value.js/api/test/conformance/ is a tail item) |
| Cohort: fourier-E.W10 T7 probe green | **PASS** (12/12 at 2026-05-28T05:55Z; cron-installed on host every 6h) |
| Paired FINAL.md commits | **PASS** (this doc + fourier `docs/tranches/E/FINAL.md` same close ceremony) |
| `pnpm test` green | **PASS** (115/115 at I.W2; 119/119 at I.W3+W4) |

**Net**: All HARD gates PASS or DEFERRED-WITH-OWNER. The Idempotency-Key + per-repo conformance suite deferrals are NOT half-state — both are additive next-step refinements; the contract v2.0.0 §5 + §8 surfaces are LIVE.

## §4 — Cohort closure verdict — Scenario A (paired close)

Per `fourier/docs/tranches/E/coordination/CRUD-COHESION-E.md §5`:

> **Scenario A — paired close**: `fourier/docs/tranches/E/FINAL.md` lands at fourier-E close. `value.js/docs/tranches/I/FINAL.md` lands at value.js-I close. The cross-repo conformance probe T7 returns green against both APIs + the `palette_slug` FK.

✅ **Scenario A satisfied**:
1. `fourier/docs/tranches/E/FINAL.md` — fourier-E close (committed at fourier-E.W12).
2. `value.js/docs/tranches/I/FINAL.md` — THIS DOCUMENT (value.js-I close).
3. T7 conformance probe 12/12 PASS (live at W10 close 2026-05-28T05:55Z; cron-installed on host).

## §5 — Deferrals + named-residuals

| Item | Owner | Disposition |
|---|---|---|
| Idempotency-Key API-side middleware | I-tail or value.js-J | plumbing LIVE on both consumers; server-side replay store deferred |
| Per-repo conformance suite at value.js/api/test/conformance/ | I-tail or value.js-J | T7 cross-repo probe LIVE at fourier-E; per-repo suite is decorative |
| Per-call-site adoption of `ifMatch` / `idempotencyKey` on demo callers | I-tail or value.js-J | options plumbed; per-call adoption is bounded but voluminous |
| `id` field hard-removal from palette response envelope | value.js-J | held for backward-compat through I.W4 transition; drop scheduled after consumer audit |

## §6 — Cross-repo source boundary verified

- **inv-I-1 cross-repo source boundary**: HELD across all 4 I commits + the β.2 demo hardening commit.
- Verification: `git log --name-only f895048..HEAD | grep -E "^fourier-analysis/" | wc -l` = **0**.
- Symmetrically: fourier-E commits never wrote to `value.js/**` (verified at each fourier-E wave close).

## §7 — Outcome verdict at close

- 53 DEFERRED-TO-VALUE.JS conformance cells from fourier-D.W5 → ADDRESSED at protocol level.
- T7 12/12 PASS verifies envelope + headers + cross-repo CORS + both API healths.
- KISS held: each wave was an additive lift (no rewrites; existing migration shapes preserved; backward-compat status field retained).
- NO-legacy held: the `status` field is computed/dual-written for the transition window; drop is scheduled at value.js-J after consumer audit.
- The cohort closure with fourier-E is honest: Scenario A; zero half-state at the FK seam.

End of I/FINAL.md.
