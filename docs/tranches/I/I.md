# I — CRUD-CONTRACT v2.0.0 conformance — visibility split, soft-delete, idempotent admin, SOTA envelopes

**Tranche letter**: I — value.js's cohesion-completion tranche; cohort peer to fourier-analysis-E (which authored the cross-repo audit substrate at `docs/audits/runs/2026-05-28-E-audit/`).
**Predecessor close**: H — `docs/tranches/H/FINAL.md` (v0.10.0 at `074df9c`); post-H release-readiness at `f895048`.
**Cohort**: **cross-repo, cohort-anchored.** value.js-I + fourier-E close together OR named-successor; cross-repo source boundary preserved (this tranche never touches fourier source).
**Opened**: 2026-05-28 (per user's "fix our cross repos" directive — the re-mandate D.W5 + `VALUE-JS-ASK.md` held conditional).
**Authored seed**: `docs/tranches/E/coordination/COHORT-VALUE-JS-I.md §4` (fourier-side sketch); ratified here.

## §0 — Goal criterion and completion criterion (paired)

**Goal criterion (the aim).** Land 4 waves to close the 53 DEFERRED-TO-VALUE.JS conformance cells from fourier-D.W5's CONFORMANCE-MATRIX:

- **I.W1 — Visibility split**: `palettes.status` (4-state) → `palettes.visibility` (3-state: `public`/`unlisted`/`private`) + `palettes.tier` (3-state: `standard`/`featured`/`archived`). The state-machine has 9 valid (visibility, tier) tuples; transitions guarded; denied-vs-missing indistinguishable.
- **I.W2 — Soft-delete + grace + restore**: `palettes.deletedAt: timestamp | null`; `DELETE /palettes/{slug}` sets deletedAt soft; `POST /palettes/{slug}/restore` clears it; grace window (configurable; default 30 days) before hard delete; cascade-delete-with-grace for `palette_versions`/`palette_forks`/`palette_votes`/`palette_proposed_names`; 410 Gone on GET for grace-window palettes.
- **I.W3 — Admin idempotency**: `feature`/`unfeature` toggle endpoints → single idempotent `POST /palettes/{slug}/feature` with `{ "featured": true | false }` body; admin audit row per op (`palette_admin_audit` collection extending existing audit).
- **I.W4 — SOTA envelopes**: problem+json (RFC 7807) error envelope across all routes; ETag on GETs; If-Match required on PUT/PATCH (returns 412 on mismatch); RateLimit-Limit / RateLimit-Remaining / RateLimit-Reset response headers; Idempotency-Key on POST + PUT (24-hour replay window); per-repo conformance suite at `api/test/conformance/`.

**Completion criterion (the evidence).** The close holds when:

- **I.W1**: live `GET /palettes/{slug}` returns visibility + tier; the legacy `status` field is computed from (visibility, tier); migration ran on host; smoke probe `migrations/check.ts` asserts every palette doc carries visibility + tier; admin toggleFeature mutates tier (and writes both legacy status for transition).
- **I.W2**: `DELETE /palettes/{slug}` returns 200 + sets `deletedAt`; `GET` after delete returns 410 Gone with `Retry-After` header (the grace expiry); `POST /palettes/{slug}/restore` returns 200 + clears `deletedAt`; cascade-delete is grace-aware (versions/forks/votes/proposed_names retain `deletedAt` propagated from parent).
- **I.W3**: `POST /palettes/{slug}/feature` body `{ "featured": true }` is idempotent (re-POST same body returns 200 with no state change); audit row per op.
- **I.W4**: `curl -i /palettes/{slug}` carries `ETag` header; `PATCH /palettes/{slug}` without `If-Match` returns 428 Precondition Required; with stale `If-Match` returns 412; rate-limit responses carry `RateLimit-*`; problem+json on every 4xx/5xx (`content-type: application/problem+json`); the per-repo conformance suite at `api/test/conformance/` runs green.
- **Cohort**: fourier-E.W10 cross-repo conformance probe T7 runs green against value.js-I.W4 endpoints; fourier-E + value.js-I FINAL.md commits paired OR named-successor recorded.

The §6 hard-gate list is the binding ledger.

## §1 — Thesis

The CRUD-CONTRACT v2.0.0 was ratified at fourier-D.W5 (2026-03-26). The CONFORMANCE-MATRIX flipped 87 cells across both repos: fourier addressed 27; value.js had 53 DEFERRED-pending-re-mandate; 7 were retired as over-spec. The 2026-05-28 user directive ("fix our cross repos") is the value.js re-mandate. I exists to close those 53 cells.

I is composed of **4 intentionally separable waves** sequenced so the data shape lands first (W1), the lifecycle semantics follow (W2), the admin surface gets idempotent (W3), and the envelopes close the cohesion arc (W4). KISS (value.js-G invariant ALPHA), NO-legacy (value.js-G invariant CHI — landed at v0.9.0), and cross-repo source boundary (inv-I-1 below) are load-bearing.

## §2 — Invariants (new in I)

I inherits all prior value.js invariants (A through H). I adds **two new invariants by name**:

- **inv-I-1 — Cross-repo source boundary**: value.js-I commits never touch fourier; fourier-E commits never touch `value.js/**`. The contract v2.0.0 (documentation seam) + the `palette_slug` FK clause are the only cross-repo coupling. Testable gate: `git log --name-only` on I commits returns zero `fourier-analysis/` paths.
- **inv-I-2 — Visibility transition guard discipline**: the (visibility, tier) state-machine has 9 valid tuples; invalid transitions return 422 with problem+json detail; denied-vs-missing indistinguishable (per fourier-E Wχ-P5 + CRUD-CONTRACT §3 C4.5/C4.6).

## §3 — Wave schedule

| Wave | Title | Closes on |
|---|---|---|
| **I.W0** | Open + baseline + cohort handshake | I tranche opened; baseline data captured (10 palettes; 9 published / 1 featured); 0 visibility / 0 tier fields exist (clean slate); deploy.sh hostname fix lands here as W0 operational baseline |
| **I.W1** | Visibility split + tier + migration | `migrations/migrate-visibility-tier.ts` authored + run on host; models.ts carries PaletteVisibility + PaletteTier; format/palette.ts response carries visibility + tier; admin toggleFeature dual-writes; demo consumers read tier; smoke probe asserts new fields |
| **I.W2** | Soft-delete + grace + restore | `palettes.deletedAt` field + cascade-delete-with-grace; DELETE soft; RESTORE endpoint; grace window expiry → hard delete (reaper cron); 410 Gone on GET grace-window palette |
| **I.W3** | Admin idempotency | single idempotent featured setter; admin audit row per op; legacy `feature`/`unfeature` retire |
| **I.W4** | SOTA envelopes + conformance suite | problem+json (RFC 7807); ETag + If-Match (412 on mismatch); RateLimit-* headers; Idempotency-Key on POST + PUT; per-repo conformance suite at `api/test/conformance/` |
| **I.W5** | Close + cohort coordination | `FINAL.md`; cohort closure with fourier-E.W12 |

The W1-W4 waves are **directly-executed** (research-first happened at fourier-side EA3 + EA5 + the cross-repo cohort coordination doc — not re-derived here). Each wave gates the next.

## §4 — Phases

**Phase 0 — open (I.W0).** Baseline, cohort handshake, deploy.sh hostname fix.
**Phase I — data shape (I.W1).** The visibility split is foundational; everything else builds on it.
**Phase II — lifecycle (I.W2).** Soft-delete + grace + restore + cascade-with-grace.
**Phase III — admin idempotency (I.W3).** Toggle → setter; legacy retired.
**Phase IV — envelopes (I.W4).** problem+json + ETag + RateLimit + Idempotency-Key + conformance suite.
**Phase V — close (I.W5).** FINAL.md + cohort coord.

## §5 — Critical files and ownership

| Surface | Files | Owning wave |
|---|---|---|
| Models | `api/src/models.ts` (PALETTE_VISIBILITIES, PALETTE_TIERS, Palette.visibility, Palette.tier) | I.W1 |
| Migration | `api/src/migrations/migrate-visibility-tier.ts` (NEW; one-off; idempotent) | I.W1 |
| Smoke probe | `api/src/migrations/check.ts` (extend PALETTE_INVARIANTS with visibility + tier) | I.W1 |
| Response formatter | `api/src/format/palette.ts` (FormattedPalette + formatPalette: ADD visibility + tier) | I.W1 |
| Admin service | `api/src/services/admin/palettes.ts` (toggleFeature: dual-write status + tier) | I.W1 + I.W3 |
| Demo consumers | `demo/@/components/custom/palette-browser/{PaletteCard,PaletteCardMenu}.vue`; `demo/@/composables/auth/useAdminUsers.ts`; `demo/@/lib/palette/api/palettes.ts` | I.W1 |
| Soft-delete | `api/src/models.ts` (Palette.deletedAt); `api/src/migrations/migrate-soft-delete.ts`; `api/src/services/palette/crud.ts` + `delete.ts`; `api/src/routes/palettes.ts` (RESTORE endpoint); `api/src/cron.ts` (reaper) | I.W2 |
| Idempotent setter | `api/src/services/admin/palettes.ts` (POST /palettes/{slug}/feature body); `api/src/routes/admin.ts` | I.W3 |
| Problem+JSON | `api/src/errors/index.ts` (re-shape to RFC 7807); `api/src/middleware/error.ts` | I.W4 |
| ETag + If-Match | `api/src/middleware/etag.ts` (NEW); `api/src/routes/palettes.ts` (412 on mismatch) | I.W4 |
| RateLimit headers | `api/src/middleware/ratelimit.ts` (extend response headers) | I.W4 |
| Idempotency-Key | `api/src/middleware/idempotency.ts` (NEW); `api/src/repositories/idempotency.ts` (24h replay) | I.W4 |
| Conformance suite | `api/test/conformance/*.test.ts` (NEW; 87-cell assertions) | I.W4 |

## §6 — Hard gates (completion criterion)

- **I.W1**: GET /palettes/{slug} returns visibility + tier; migrations/check.ts probe passes (all docs have visibility + tier); admin feature toggle mutates tier; demo renders featured palette via tier read.
- **I.W2**: DELETE /palettes/{slug} returns 200 + sets deletedAt; GET soft-deleted returns 410 Gone + Retry-After; RESTORE returns 200 + clears deletedAt; cascade-delete is grace-aware.
- **I.W3**: POST /palettes/{slug}/feature `{ "featured": true }` is idempotent (re-POST = 200 no-op); audit row per op.
- **I.W4**: ETag on GETs; If-Match required on PATCH (412 on stale); RateLimit-* response headers; Idempotency-Key on POST + PUT (24h replay); problem+json on every 4xx/5xx; conformance suite green.
- **Cohort**: fourier-E.W10 T7 probe green against value.js-I.W4 endpoints; paired FINAL.md OR named-successor recorded.
- Smoke probe at startup asserts schema invariants per wave.
- `pnpm test` green; `pnpm build` clean.

**Invalid hard gates** (rejected): touching fourier source from I commits (inv-I-1); shared types package across repos (inv-16); shared HTTP client; shared codegen consumed by both repos.

## §7 — Cross-tranche debt and explicit deferrals

**Inherited from fourier-D.W5 (the 53 DEFERRED-TO-VALUE.JS cells):**
- §1 envelope: `id` field removal — defer to I.W4 SOTA cleanup (slug is the canonical identity)
- §3 visibility split — I.W1
- §4 soft-delete — I.W2
- §5 SOTA envelopes — I.W4
- §7 admin idempotency — I.W3
- §8 audit semantics — I.W3
- Misc spread across §6 + §7 + §8 — fold into the four waves

**Deferred out of I (potential successors):**
- `id` field hard-removal — staged after I.W1 + demo consumer migration verifies no consumer reads `palette.id`; either I.W4 sub-item or value.js-J.
- The Palette/colorScale domain model — held latent per value.js's inv-I-3 (no library nobody calls); fires iff a real consumer surfaces.
- Multi-replica palette-api — out-of-scope (inv-12 KISS).

## §8 — Brittleness window

I plans NO brittleness window. Each wave is reversible at its own boundary; the migrations are additive (W1) or soft-delete-shaped (W2) per data-safety discipline.

```yaml
breaking_changes_during_wave: NO
suspended_gates: none
restoration_wave: N/A — I plans no brittleness window
reason: every wave is reversible. W1 is additive (visibility + tier added;
        status retained as legacy-computed). W2 is soft-delete-shaped (no hard
        data loss within grace window). W3 is endpoint-shape (toggle → setter;
        old endpoints carry as deprecated until I.W4 close). W4 is envelope
        additive (problem+json + ETag + RateLimit-* don't break legacy clients;
        Idempotency-Key is opt-in).
```

## §9 — Cohort coordination (value.js-I + fourier-E)

The user's "fix our cross repos" directive is the cohort re-mandate. Cohort discipline:

- **value.js-I** owns: `api/src/**`, `api/test/**`, `demo/@/**`, `docs/tranches/I/**`, `api/deploy.sh` (hostname maintenance).
- **fourier-E** owns: `api/**`, `web/**`, `scripts/**`, `docs/tranches/E/**`, `infra/**`, host-side ingress coordination.
- **Shared** (the documentation seam): `docs/tranches/B/coordination/CRUD-CONTRACT.md` (the contract v2.0.0) + the `palette_slug` FK clause (`docs/tranches/D/research/README.md §R1` in fourier).
- **Cohort closure**: I and E close together (paired FINAL.md commits + cross-repo conformance probe T7 green) OR explicit named successor (e.g. I.W4 residual → value.js-J).

The cross-repo source boundary holds: value.js-I commits never touch fourier; fourier-E commits never touch `value.js/**`. The CORS env-var fix at fourier-E.W1 (host palette-api `.env`) was operator-coordinated (the host is value.js's deploy target); value.js-I.W0 mirrors that upstream via `api/.env.example` (this tranche).

End of I.md.
