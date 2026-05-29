# I.W1 — Visibility split + tier + migration

**Wave**: I.W1 — `palettes.status` (4-state) → `palettes.visibility` (3-state) + `palettes.tier` (3-state) + migration + smoke-probe extension.
**Closed**: 2026-05-28.
**Status**: GREEN.
**Authority**: `I.md §3` row W1 + CRUD-CONTRACT v2.0.0 §3.

## §1 — The (visibility, tier) state-machine

The legacy 4-state `status` enum conflated WHO-can-see with WHAT-curation-position. The I.W1 split makes them orthogonal:

- **`visibility`** (3-state): WHO can see the palette
  - `public` — anyone (default for new palettes)
  - `unlisted` — owner + anyone with the slug (browse listings exclude)
  - `private` — owner only
- **`tier`** (3-state): WHAT curation position
  - `standard` — default
  - `featured` — admin-curated showcase
  - `archived` — soft-retired (not deleted; precursor to I.W2 soft-delete)

The 9-tuple (visibility × tier) state-machine carries all 4 legacy states plus 5 new ones for I.W2/I.W4 expressiveness.

## §2 — Mapping table (legacy `status` → canonical (visibility, tier))

| Legacy `status` | `visibility` | `tier` |
|---|---|---|
| `published` | `public` | `standard` |
| `featured` | `public` | `featured` |
| `hidden` | `unlisted` | `standard` |
| `draft` | `private` | `standard` |

## §3 — Source edits

| File | Change |
|---|---|
| `api/src/models.ts` | Added `PALETTE_VISIBILITIES` + `PALETTE_TIERS` const arrays + types; added `visibility: PaletteVisibility` + `tier: PaletteTier` to Palette interface (status retained for backward-compat) |
| `api/src/format/palette.ts` | Added `visibility` + `tier` fields to FormattedPalette interface + formatter (response envelope) |
| `api/src/services/admin/palettes.ts` | `toggleFeature` now dual-writes (tier canonical + status legacy mirror) |
| `api/src/services/palette/{forks,crud}.ts` | New palette inserts set visibility=`public`, tier=`standard` |
| `api/src/services/admin/{batch,import}.ts` | Bulk feature/unfeature operations set both tier (canonical) and status (legacy mirror); imports set visibility=`public`, tier=`standard` |
| `api/src/migrations/migrate-visibility-tier.ts` | NEW one-off migration script (idempotent; status→tuple mapping per §2) |
| `api/src/migrations/check.ts` | Smoke-probe invariants extended: every palette doc must carry `visibility` ∈ `{public, unlisted, private}` + `tier` ∈ `{standard, featured, archived}` |
| `demo/@/components/.../PaletteCardMenu.vue` | Star/StarOff + Feature/Unfeature label read `(palette.tier ?? palette.status) === 'featured'` (canonical prefer; legacy fallback) |
| `demo/@/components/.../PaletteCard.vue` | Featured badge reads `(palette.tier ?? palette.status) === 'featured'` |
| `demo/@/composables/auth/useAdminUsers.ts` | `featurePalette` result destructure adds `tier` alongside `status` |
| `demo/@/lib/palette/types.ts` | Demo Palette type adds optional `visibility` + `tier` fields |
| `api/test/repositories/{palette,user}.test.ts` + `test/services/admin-tags.test.ts` | Test fixtures add visibility=`public`, tier=`standard` to preserve type-checks + smoke-probe consistency |

## §4 — Migration evidence

**Pre-migration data shape (audit-time):**
```json
{ "total": 10, "byStatus": [{"_id":"featured","count":1},{"_id":"published","count":9}], "hasVisibility": 0, "hasTier": 0 }
```

**Migration run** (via inline node script in the host's running api container; the one-off migration logic mirrors `migrations/migrate-visibility-tier.ts`):
```json
{ "inspected": 10, "updated": 10, "skipped": 0, "unmapped": [] }
```

**Post-migration data shape:**
```json
{ "total": 10, "byVisibility": [{"_id":"public","count":10}], "byTier": [{"_id":"featured","count":1},{"_id":"standard","count":9}] }
```

## §5 — Pre-D.W2-vintage seed-data backfill (operational hardening)

The smoke probe at startup surfaced **28 field violations across 10 palettes** on the I.W1 deploy: 8 pre-D.W2-vintage seed palettes (Sunset Blaze, Ocean Depths, Neon Cyberpunk, Forest Canopy, Lavender Dreams + 3 user palettes) were missing the D.W2 Lane D invariants (`tags`/`forkCount`/`currentHash`/`userSlug`/+others). These had silently slipped through because the pre-I.W1 image had been built before the strict check.ts wiring was tightened.

**Backfill** (idempotent `$ifNull` update via `docker compose run --rm api node -e ...`):
- 8 docs matched the missing-fields filter; 8 updated; 0 still missing.

**Post-backfill smoke probe**: `[migrations] schema invariants OK (10 palettes)`.

This is itself a value.js-I.W1 sub-deliverable (operational hygiene); the chronic-deferred fields are now invariant-conformant.

## §6 — Live verification

| Probe | Expected | Actual |
|---|---|---|
| `GET /palettes/neon-cyberpunk` (featured palette) | visibility=`public`, tier=`featured`, status=`featured` | **PASS** (envelope rendered with all three) |
| `GET /palettes/sunset-blaze` (standard palette) | visibility=`public`, tier=`standard`, status=`published` | **PASS** |
| Cross-repo CORS preflight (`Origin: https://fourier.babb.dev`) | `acao: https://fourier.babb.dev` | **PASS** (W1 CORS regression-free post-W2 deploy) |
| Container health | `healthy` | **PASS** (api up + smoke probe GREEN) |

## §7 — Cross-repo source boundary upheld

- value.js-I.W1 commits write ONLY to `value.js/` paths (api/src/, api/test/, demo/, docs/tranches/I/).
- Zero `fourier-analysis/` paths in this wave's git diff (verified pre-commit).
- The cross-repo coupling remains the documentation seam (CRUD-CONTRACT v2.0.0 §3 maps to this wave 1:1).

## §8 — W1 close gate

W1 closes when (a) source edits + migration script authored; (b) tests pass + tsc clean; (c) migration ran on host (10/10); (d) deploy completed; (e) smoke probe GREEN; (f) live envelope carries visibility + tier; (g) CORS regression-free. All seven conditions met. **W1 is GREEN.** I.W2 (soft-delete + grace + restore) follows.

## §9 — Carry-forwards

- The legacy `status` field is RETAINED in the document + response envelope for the I.W1 transition window. Demo consumers read `(palette.tier ?? palette.status) === 'featured'` to gracefully transition.
- The `status` field drop is scheduled at I.W4 SOTA cleanup after consumer migration verifies no `palette.status` reads remain.
- The `visibility=public` constraint is the default; I.W2 introduces `unlisted` (soft-deleted within grace window) and `private` (owner-only) per CRUD-CONTRACT v2.0.0 §4.
