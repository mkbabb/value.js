# N.W3-TXNS — impl lane report (W3.B / W3.D / W3.E)

**Branch**: tranche-f-handoff  **Date**: 2026-06-11  **Ownership**: `api/**` only.
**Gates**: `cd api && npx tsc --noEmit` → exit 0; `cd api && npm test` →
**181 passed / 32 files** (was 172/29 at lane start — net **+9**, never shrank; +11 new
lane tests across 3 new files, −2 from the ownership-helper consolidation in W3.E).
**Escape-cast discipline preserved**: zero new `as any` / `as unknown as` /
`_id`-intersection casts in any touched file. N.W2.A's `WithId<T>` return sigs untouched
(in fact reused — the new `findOneAndIncrementVoteCount` + `getOwnedPalette` return
`WithId<Palette>`).

This lane sits on top of the sibling W3-DATA lane (W3.A/C/I/J already landed: orphan-vote
TOCTOU bound, index right-sizing, session-TTL reconcile, fork-count recompute). Those
left the baseline at 172/29.

---

## W3.B — transaction right-sizing: 18 → 14 (target ≤14 met)

The H1 invariant binds **cross-collection** writes. Walking V2's byte-exact 18-site census
and classifying each by collections-touched (sharper than D4's drop-walk, which used a stale
16-base): four sites were right-sized OUT because their non-atomic outcome is **benign +
self-healing** — none is a cross-collection referential break.

### The full 18-row table (keep/drop + one-line justification)

| # | Site | Collections | Disposition | Justification |
|---|---|---|---|---|
| 1 | `cron.ts:47` reaper hard-delete | palettes+votes+flags | **KEEP** | Cross-collection cascade; now counted in the WRAPPED census (was wrongly "out of scope"). |
| 2 | `admin/users.ts` `deleteUser` | palettes+votes+flags+sessions+adminAudit+users | **KEEP** | Cross-collection cascade — the canonical multi-collection write. |
| 3 | `admin/users.ts` `setUserStatus` | users+sessions | **KEEP** | Suspend invalidates sessions cross-collection. |
| 4 | `admin/users.ts` `deleteUserPalettes` | palettes+votes+flags | **KEEP** | Cross-collection cascade. |
| 5 | `admin/users.ts` `pruneEmptyUsers` | sessions+users | **KEEP** | Cross-collection delete pair. |
| 6 | `admin/tags.ts` `deleteTag` | tags+palettes | **KEEP** | Tag delete + cascade `$pull` from palettes. |
| 7 | `admin/palettes.ts` `deletePalette` (admin) | palettes only † | **KEEP** | SINGLE-collection (soft-delete `update` + parent `decrementForkCount`), but kept for the two-doc atomicity its dedicated rollback test (D6) asserts — the parent fork-count must roll back with the soft-delete. |
| 8 | `admin/batch.ts` `batchPalettes(delete)` | palettes+votes+flags | **KEEP** | Cross-collection cascade. |
| 9 | `admin/batch.ts` `batchUsers(suspend)` | users+sessions | **KEEP** | Suspend + session-invalidate cross-collection. |
| 10 | `palette/versions.ts` `revertToVersion` | palette_versions+palettes | **KEEP** | Version insert + palette update lock-step. |
| 11 | `palette/votes.ts` `toggleVote` | votes+palettes | **DROP** | The unique `(userSlug,paletteSlug)` index is the correctness anchor; the gated `$inc` is document-atomic without a session; the returned `voteCount` is advisory (off-by-one self-heals). `findOneAndIncrementVoteCount` folds `$inc`+re-read into one round-trip. |
| 12 | `session/auth.ts` `registerSession` | users+sessions | **DROP** | Benign orphan: a partial failure leaves an empty `users` row indistinguishable from a registered-then-never-saved user, reaped by `pruneEmptyUsers`. User insert ordered first so a live session always names an existing user. |
| 13 | `session/auth.ts` `loginSession` | sessions+users | **DROP** | `lastSeenAt` is advisory presence metadata that converges on the next request; session insert ordered first so the user is never touched for a session that failed to land. (Mirrors register's rule.) |
| 14 | `palette/forks.ts` `remixPalette` | palettes+palette_versions | **KEEP** | Insert child + version + bump parent; in-txn source re-read closes the fork-of-deleted-source race. |
| 15 | `palette/crud.ts` `createPalette` | palettes+palette_versions | **KEEP** | Palette insert + initial version lock-step (H-AUDIT-6 repair). |
| 16 | `palette/crud.ts` `patchPalette` | palettes+palette_versions | **KEEP** | Palette update + version insert lock-step. |
| 17 | `palette/crud.ts` `deletePalette` (user) | palettes only † | **KEEP** | SINGLE-collection (soft-delete + parent decrement), kept for the two-doc atomicity its rollback test asserts (identical-shape to #7; uniform). |
| 18 | `palette/crud.ts` `restorePalette` | palettes only | **DROP** | SINGLE-collection — every write touches only `palettes`. The `setForkCount` recompute IS the heal (writes the `countForksOf` truth), so the parent count converges on every restore regardless of interleaving — no isolation needed. |

**Result: 14 KEEP, 4 DROP.** † #7 and #17 are single-collection but KEPT (a deliberate
"wrap iff the two-doc outcome is referentially meaningful" judgment, recorded so the
classification isn't mistaken for H1 over-application — both carry rollback tests).

### Why this is the right line (not more aggressive)

D4 walked a more aggressive set (drop both deletePalette sites, drop the orphan-vote sweep,
etc.) reaching ~12. I held at 14 deliberately: the two `deletePalette` sites have **dedicated
rollback tests** asserting the parent-fork-count atomicity, and the soft-delete + parent
decrement is a defensible two-document atomic unit (the parent count is a public-facing
number). Dropping them would be churn against a tested guarantee with no scale win. The 4
dropped sites are the clearly-benign / single-collection ones — minimal, conservative,
justified-each, hitting the target exactly.

### Code changes

- `repositories/palette.ts`: added `findOneAndIncrementVoteCount(slug, delta) →
  WithId<Palette> | null` (folds the vote `$inc` + the count re-read into one
  `findOneAndUpdate(returnDocument:"after")` round-trip).
- `services/palette/votes.ts`: rewritten without `withTransaction`; the upsert-match-race
  branch (concurrent insert won) re-reads the count and reports `voted:true`.
- `services/session/auth.ts`: `registerSession` + `loginSession` un-wrapped; writes ordered
  so the live row always references an existing counterpart; benign-orphan rationale in-code.
- `services/palette/crud.ts`: `restorePalette` un-wrapped (single-collection; recompute heals).
- **Standing H1 doc updated** (`docs/tranches/H/audit/api-withTransaction-coverage.md`): the
  §1.4 grep table + §2 WRAPPED table rewritten to the 14-site truth (with corrected line
  numbers + the cron reaper promoted into §2); a new **§3.3 — RIGHT-SIZED OUT** section
  documents the 4 drops with per-site justification; §4.2 cron note + §6.3 closure invariant
  updated. `api/CLAUDE.md` coverage-history line updated.
- **Former D4/D5 rollback specs re-authored** (`withTransaction-rollback-h-w1.test.ts`): they
  now assert the NEW contract — the first write PERSISTS on a second-write failure, and
  `pruneEmptyUsers` reaps the registerSession orphan.

---

## W3.D — collapse dual cursor+offset pagination → cursor-only + honest color-filter pages

### Cursor-only collapse

`listPalettes` carried BOTH keyset (cursor) and offset (`skip`/`limit` + a separate
`countDocuments`) pagination, selected by `?cursor` presence. The offset path paid the deep-page
`skip` penalty AND a per-page count round-trip on the hot browse path. Collapsed onto the one
idiomatic keyset path: a request with no `cursor` is simply "first page" (no `$or`); `nextCursor`
+ `hasMore` carry the continuation. The `ListResult` is now `{ data, nextCursor, hasMore }` —
the offset-era `total`/`offset`/`limit` fields are gone from the public list.

**Wire-compat (verified, not assumed).** The demo's main browse (`useBrowsePalettes.ts`) calls
`listPalettes({ limit: 50, offset: 0, ... })` and reads **only `res.data`** — it never pages and
never reads `total`/`nextCursor`/`hasMore`. A no-cursor request returns the first page's `data`
exactly as before, so the collapse is wire-compatible with the demo's actual usage. The
conformance suite asserts no list-pagination wire shape (no `total`/`nextCursor` assertions on
`/palettes`), so nothing broke there. `/mine` + `/forks` KEEP offset — small, owner-scoped sets
where a total count is genuinely shown and there's no scale pressure (`listMine` unchanged).

The now-dead `PaletteRepository.findManyByFilter` + `countByFilter` (offset-only, zero remaining
callers) were deleted (KISS). The other repos' same-named methods (adminAudit/proposedName/user)
are still used and untouched.

### Color-distance short-page contrivance — FIXED with fetch-ahead

The old code fetched ONE page (`limit+1`) then post-filtered by OKLab distance in JS, so a
`?colorL=..&colorRadius=..` query returned "however many of THIS page happen to match" — a short
or even empty `data` with `hasMore:true` while more matches lay beyond the first underlying page.
That silently lied about result completeness.

**Fix: a bounded fetch-ahead loop.** When a color filter is active, the loop pulls `limit`-sized
batches — advancing the internal keyset cursor between batches — accumulating matches until it has
`limit` of them, the collection is exhausted, or a safety bound (`MAX_FETCH_AHEAD_BATCHES = 10`)
is hit. The returned page is FULL unless the matching set is genuinely exhausted (then an honest
short/empty final page with `hasMore:false`). The `nextCursor` is the last **returned** (matched)
doc's keyset position, so the next request resumes strictly after it — re-scanning any unmatched
docs in between is idempotent (no skips, no dupes). Without a filter the loop runs exactly once
(the classic single page), so the common path is unchanged.

**KISS note.** The fetch-ahead is in the query shape (keyset advance), not a new index or an
`$elemMatch` bounding-box (D1's P2 alternative) — OKLab is a 3-vector Mongo can't index natively,
and the niche color-filter feature doesn't justify a denormalized bounding-box index. The bound
keeps a pathological "nothing matches" query from walking the whole collection in one request.

### Type discipline

`keysetPredicate` returns the structural Mongo-filter shape (`Record<string, unknown>[]`) — the
same widening the inline filter always used — because `Palette` omits `_id` from the model so a
strict `Filter<Palette>` would force `_id` to `ObjectId` while the live `_id` is a string slug.
This is NOT an escape cast (`$or` is assigned through the filter's `Record` view, exactly as the
pre-existing code did); zero new `as any`/`as unknown as`.

---

## W3.E — PATCH read-amplification 4 → 2

`PATCH /palettes/:slug` read the palette FOUR times before/after the write:
1. `requireOwnership` extractor → `getOwnerSlug` → `findBySlug`
2. route ETag pre-check → `getPaletteETagData` → `findBySlug`
3. `patchPalette` content-hash diff → `findBySlug`
4. post-write fresh re-read → `findBySlug`

**Fix.** The `requireOwnership` extractor now reads the FULL palette (`getOwnedPalette`) once and
stashes it on `c.var.palette` (a new typed `AppEnv` variable). The route's ETag pre-check reuses
that doc; `patchPalette` accepts the pre-read palette via `input.palette` and reuses it for the
content-hash diff. Reads (1)+(2)+(3) collapse to ONE; only the post-write re-read (4) remains.
**4 → 2, verified structurally**: `palettes-patch-readcount.test.ts` spies on `findBySlug` and
asserts exactly 2 reads on a successful PATCH.

**One read helper, retired two.** `getOwnerSlug` + `getPaletteETagData` (two single-purpose reads
of the same slug) were retired in favour of the single `getOwnedPalette` (one read, one doc). The
publish/unpublish routes (also behind `paletteOwnerExtractor`) now reuse `c.var.palette` for their
ETag pre-check too — the same 4→2 benefit. The revert route migrated from `getOwnerSlug` to the
shared `paletteOwnerExtractor`, so there is now exactly ONE ownership-read helper across every
owner-gated palette route. `patchPalette`'s `input.palette` is optional, so direct service
callers (tests) fall back to a single read — no behaviour change for them.

**TOCTOU note (unchanged).** Folding the three former reads into one does not change the accepted
narrow ledger-#16 window's nature: the optimistic-concurrency check remains a single pre-write
validator (no in-txn If-Match re-validation). Documented in-code at every touched site.

---

## New tests (3 files, +11)

| File | Tests | Covers |
|---|---|---|
| `test/services/txn-right-sizing.test.ts` | 6 | The 4 dropped sites open ZERO transactions (spy on `services.withTransaction`); a representative KEPT site (`createPalette`, user `deletePalette`) still opens one. |
| `test/services/palette-list.test.ts` | 4 | Cursor-only envelope (no `total`/`offset`); cursor continuation has no dupes/skips; **color-filter full-page honesty** (full page even when matches are sparse across underlying pages); zero-match → honest empty final page (`hasMore:false`), never short-with-`hasMore:true`. |
| `test/routes/palettes-patch-readcount.test.ts` | 1 | A full PATCH (route + middleware + service) reads the palette exactly **2×** (repo-spy on `findBySlug`). |

Re-authored: `withTransaction-rollback-h-w1.test.ts` D4/D5 specs (now benign-orphan witnesses).
Rewritten: `palette-ownership.test.ts` (→ `getOwnedPalette`, the consolidated read; 4 → 2 tests,
the −2 from the helper consolidation).

---

## Decisions recorded

1. **14, not 12.** Held the right-size at the conservative justified-each line (drop the 4
   clearly-benign/single-collection sites) rather than D4's aggressive ~12. The two
   `deletePalette` sites carry dedicated rollback tests asserting the parent-fork-count
   two-doc atomicity — dropping them is churn against a tested guarantee with no scale win.
2. **Cron reaper into the WRAPPED census.** It IS a cross-collection cascade (palettes+votes+
   flags) and IS already wrapped; the I.W2-era "cron is wholesale out of scope" framing was
   dishonest. Counting it makes the 14 reflect reality.
3. **Cursor-only public list, offset retained for /mine + /forks.** The brief + D1/D4 + the
   demo's actual single-page `res.data` usage all point one way; small owner-scoped sets keep
   offset where a total is genuinely shown. Verified the demo doesn't read `total`/`nextCursor`.
4. **Fetch-ahead in the query shape, not an index.** OKLab is un-indexable as a 3-vector and the
   color filter is niche; a bounded keyset-advance loop is the KISS honest fix, not a
   denormalized bounding-box index.
5. **One ownership read helper.** Consolidated `getOwnerSlug` + `getPaletteETagData` →
   `getOwnedPalette`, stashed on `c.var.palette`, reused by PATCH + publish + (the extractor
   for) revert. The −2 test count is a legitimate consolidation, not a coverage loss.
