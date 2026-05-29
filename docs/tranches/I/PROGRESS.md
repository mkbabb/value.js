# I — progress log

Updated at every wave boundary. Reconciled against reality at I.W5 close.

## Goal of this log

Record what *actually happened* at each wave of value.js-I — the cohort peer to fourier-E — so the close ceremony can reconcile claim against artefact without archaeology.

## Completion criterion

Every wave's row carries (a) a status word from the canonical set, (b) a close timestamp once it closes, and (c) a notes cell naming the binding deliverable. At I.W5 close every row reconciles against `FINAL.md`'s gate table. The cohort peer fourier-E closes together or names a successor.

## Status board

| Wave | Status | Closed at | Notes |
|---|---|---|---|
| I.W0 — *Open + baseline + cohort handshake* | **GREEN** | 2026-05-28 | I tranche opened; baseline captured (10 palettes; 9 published / 1 featured; clean slate for visibility/tier); deploy.sh + smoke-probe + .env.example unbreakage (legacy hostname + URL refs retired). Close record at `audit/W0-open.md` |
| I.W1 — *Visibility split + tier + migration* | **GREEN** | 2026-05-28 | one-off migration ran on host (10/10 updated); models.ts adds PaletteVisibility + PaletteTier; format/palette.ts carries visibility + tier in response; admin toggleFeature dual-writes; 4 server-side write sites updated (forks/crud/batch/import); 4 demo consumers read tier; smoke probe extended; **operational hardening surfaced 8 pre-D.W2-vintage seed palettes** missing chronic-deferred fields (tags/forkCount/currentHash/userSlug/etc.) — backfilled to invariant-conformant; 115/115 tests pass; tsc clean; live verification GREEN on featured + standard palettes + CORS regression-free. Close record at `audit/W1-visibility-split.md` |
| I.W2 — *Soft-delete + grace + restore* | **GREEN** | 2026-05-28 | palettes.deletedAt + GoneError (410); soft DELETE; restore endpoint; reaper cron with PALETTE_GRACE_MS (30d default); listings filter deletedAt:null; admin delete converted to soft; backfill migration ran 10/10 on host; deploy GREEN; smoke probe GREEN; live envelope carries deletedAt:null; 115/115 tests pass; tsc clean. Close record at `audit/W2-soft-delete.md` |
| I.W3 — *Admin idempotency* | **GREEN** | 2026-05-28 | `setFeatured(c, slug, featured)` replaces `toggleFeature`; `POST /admin/palettes/:slug/feature` body `{featured: boolean}`; idempotent (skip-if-unchanged); audit row per op. Close record at `audit/W3-W4-sota-envelopes.md` |
| I.W4 — *SOTA envelopes + conformance suite* | **GREEN-partial** | 2026-05-28 | problem+json (RFC 7807) with `application/problem+json` content-type + URN type scheme; ETag + If-Match (412/428); RateLimit-* response headers (success + denial); 119/119 tests pass. **DEFERRED** (folded to fourier-E.W10 δ): Idempotency-Key middleware + per-repo conformance suite. Close record at `audit/W3-W4-sota-envelopes.md` |
| I.W5 — *Close + cohort coordination* | **GREEN** | 2026-05-28 | FINAL.md authored at `FINAL.md`; **Scenario A paired close** with fourier-E.W12 ceremony; T7 12/12 PASS verifies cross-repo conformance at protocol layer; 5 named-residuals booked for I-tail or value.js-J |

## Log

### 2026-05-28 — I opened (cohort peer to fourier-E)

**WHY.** Fourier-D closed CLEAN 2026-05-28; the 6-lane E-development audit recorded the 53 DEFERRED-TO-VALUE.JS conformance cells as binding for the value.js side. The user's 2026-05-28 directive ("fix our cross repos. Refine, test, CRUD, our two palette apis and fourier viz apis. Including ALL consumers.") is the value.js-I re-mandate the D close held conditional.

**BASELINE.**
- value.js HEAD: `f895048` (post-H v0.10.0 release-readiness; +1 ahead of origin).
- Production data on host (via `docker compose exec api node ...` driver call):
  - Total palettes: 10
  - By status: 9 `published`, 1 `featured`
  - `visibility` field present: 0 (clean slate)
  - `tier` field present: 0 (clean slate)
- No `hidden` or `draft` palettes — simplifies the I.W1 mapping (only published + featured to handle).

**COHORT SEAM ESTABLISHED.**
- fourier-E.W1 landed T4 (host palette-api `.env` ALLOWED_ORIGINS adds `https://fourier.babb.dev`); live cross-repo CORS preflight verified 200 + ACAO echo (fourier-E commit `d245bfd`).
- The cross-repo `palette_slug` FK is now binding from both sides at the browser layer.
- value.js-I.W0 mirrors the CORS shape in `api/.env.example` (the source-tracked spec); upstream-commit-of-host-edit.

**Next**: I.W0 closes when (a) tranche docs landed; (b) deploy.sh hostname unbreakage applied; (c) `.env.example` documents multi-origin shape. Then I.W1 visibility split.

### 2026-05-28 — I.W0 + I.W1 GREEN (cohort peer to fourier-E.W2)

**WHAT.** Same-day execution of I.W0 (open) + I.W1 (visibility split). The cohort handshake with fourier-E completed via the W1 CORS path:
- fourier-E.W1 landed T4 host palette-api `.env` ALLOWED_ORIGINS adds `https://fourier.babb.dev` (host-side edit; LIVE).
- value.js-I.W0 mirrors the multi-origin shape in `api/.env.example` (source-tracked spec).
- value.js-I.W1 lands the visibility/tier split (canonical (visibility, tier) state-machine; legacy status retained for backward-compat).

**I.W1 evidence.**
- Pre-migration: 10 palettes (9 published, 1 featured; 0 visibility / 0 tier).
- Migration ran on host: 10/10 updated; 0 unmapped.
- Post-migration: byVisibility: 10 public; byTier: 9 standard + 1 featured.
- Deploy via `api/deploy.sh` (rsync + docker compose up -d --build); smoke probe extended (visibility + tier required); 8 pre-D.W2-vintage seed palettes had missing chronic-deferred fields (tags/forkCount/currentHash/userSlug) — backfilled in-place via `docker compose run --rm api node -e "..."` ad-hoc command (operational hardening sub-deliverable).
- Live verification: GET /palettes/neon-cyberpunk → visibility=public, tier=featured, status=featured; GET /palettes/sunset-blaze → visibility=public, tier=standard, status=published.
- Cross-repo CORS regression-free post-deploy.
- tsc --noEmit: 0 errors. `pnpm test`: 115/115 PASS.

**Cross-repo source boundary upheld** (inv-I-1): zero `fourier-analysis/` paths in I.W0/I.W1 git diff.

**Next**: I.W2 (soft-delete + grace + restore) when E.W3 dispatches. Cohort peer continues.
