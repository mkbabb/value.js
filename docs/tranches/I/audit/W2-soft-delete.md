# I.W2 — Soft-delete + grace + restore

**Wave**: I.W2 — `palettes.deletedAt`; soft DELETE; RESTORE endpoint; reaper cron with grace window.
**Closed**: 2026-05-28.
**Status**: GREEN.
**Authority**: `I.md §3` row W2 + CRUD-CONTRACT v2.0.0 §4.

## §1 — The soft-delete lifecycle

| State | `deletedAt` | GET /palettes/{slug} | List visibility |
|---|---|---|---|
| Live | `null` | 200 + envelope | included |
| Soft-deleted (grace window; default 30 days) | Date | **410 Gone** with `gone` code | excluded |
| Reaped (past grace) | (doc hard-deleted) | 404 NotFound | (gone) |

## §2 — Source edits

| Surface | Change |
|---|---|
| `models.ts` | Palette adds `deletedAt: Date | null` |
| `format/palette.ts` | FormattedPalette carries `deletedAt` |
| `errors/index.ts` | NEW `GoneError` class (status 410, code `gone`) |
| `services/palette/crud.ts` | `getPaletteBySlug` throws `GoneError` when `deletedAt` non-null; `deletePalette` is soft (sets `deletedAt = new Date()`; decrements parent forkCount); NEW `restorePalette` (clears `deletedAt`, re-increments parent forkCount; idempotent on live palette) |
| `services/palette/crud-list.ts` | `listPalettes` filter adds `deletedAt: null` (public listings exclude soft-deleted) |
| `services/admin/palettes.ts` | `deletePalette` (admin) converted to soft (matches user-facing semantics; uniform restore path) |
| `repositories/palette.ts` | `findByUserSlug` + `countByUserSlug` + `findForksOf` + `countForksOf` filter `deletedAt: null` by default; NEW `findPastGrace(cutoff)` for the reaper |
| `routes/palettes/crud.ts` | NEW route `POST /palettes/:slug/restore` (owner-only via `requireOwnership`) |
| `cron.ts` | Daily cleanup adds **reaper** sweep: `palettes.findPastGrace(now - PALETTE_GRACE_MS)` → transactional hard-delete cascade (palette + votes + flags) |
| `services/palette/{forks,crud}.ts` + `services/admin/import.ts` | New palette inserts set `deletedAt: null` |
| `migrations/migrate-soft-delete.ts` | NEW one-off; backfill `deletedAt: null` for pre-I.W2 docs (idempotent) |
| `migrations/check.ts` | Smoke probe invariant adds `deletedAt` (`null` or `Date`) |

## §3 — Reaper cron

Daily at 3 AM UTC (existing schedule in `index.ts`); the new reaper sweep:

```typescript
const expired = await palettes.findPastGrace(graceCutoff);
for (const palette of expired) {
    await services.withTransaction(async (session) => {
        await palettes.delete(palette.slug, session);
        await votes.deleteByPaletteSlug(palette.slug, session);
        await flags.deleteByPaletteSlug(palette.slug, session);
    });
}
```

Grace window: `PALETTE_GRACE_MS` env (default 30 × 24 × 60 × 60 × 1000 ms = 30 days). Test override available.

## §4 — Test updates

3 existing tests updated to reflect soft-delete semantics:
- `test/services/palette-crud.test.ts:124` — `deletePalette` asserts `result.deletedAt instanceof Date` and `findBySlug` returns the soft-deleted doc with `deletedAt` set.
- `test/routes/palettes-ownership.test.ts:153` — `DELETE /palettes/alpha` asserts `deletedAt` is a Date.
- `test/services/withTransaction-rollback.test.ts:53` + `test/services/withTransaction-rollback-h-w1.test.ts:237` — both rollback tests use the fork-count decrement as the throw point (admin delete has only the fork-count cascade post-I.W2); assert `deletedAt` rolled back to `null`.
- `test/services/admin-palettes.test.ts:59` — admin soft-delete asserts `deletedAt` set + votes/flags persist (cascade deferred to reaper).

## §5 — Migration evidence

**Pre-migration** (audit-time): 10 palettes, 0 with `deletedAt` field.

**Migration run on host** (inline node driver call):
```json
{ "inspected": 10, "updated": 10, "skipped": 0 }
```

**Post-migration**: all 10 palettes carry `deletedAt: null`.

## §6 — Live verification

| Probe | Result |
|---|---|
| Deploy via `api/deploy.sh` (rsync + `docker compose up -d --build`) | OK |
| Smoke probe at startup | `[migrations] schema invariants OK (10 palettes)` |
| Live `GET /palettes/neon-cyberpunk` | 200 + envelope carries `deletedAt: null` ✓ |
| Live `GET /palettes` (list) | 200 + 10 palettes (all live) |
| Smoke test in deploy.sh | `GET https://api.color.babb.dev/palettes -> 200 OK` |
| `pnpm test` | 115/115 PASS |
| `tsc --noEmit` | clean |

## §7 — Cross-repo source boundary upheld

This wave writes only `value.js/` paths (api/src/, api/test/, demo/lib/types ... actually the demo type update lives at I.W4 if it surfaces; W2 doesn't expose deletedAt in the demo yet). Zero `fourier-analysis/` paths.

## §8 — W2 close gate

W2 closes when (a) source edits + restore route + reaper authored; (b) tests pass + tsc clean; (c) migration ran on host (10/10); (d) deploy completed; (e) smoke probe GREEN; (f) live envelope carries deletedAt:null. All six met. **W2 is GREEN.** I.W3 + I.W4 (admin idempotency + SOTA envelopes) follow when fourier-E.W4 dispatches.

## §9 — Notes

- **Cascade-delete-with-grace semantics**: votes/flags persist attached to the soft-deleted palette; the reaper cascades them at hard-delete. This matches the CRUD-CONTRACT v2.0.0 §4 spec where votes/flags are non-embedded.
- **Concurrent vote during grace**: a vote on a soft-deleted palette is technically still possible at the storage layer (no foreign-key constraint). This is a corner case for I.W4 to address with explicit 410 validation in the vote/flag endpoints.
- **Restore semantics**: restoring a live palette is a no-op success (idempotent) per CRUD-CONTRACT §4.

End.
