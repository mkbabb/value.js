# H.W1 Lane A.2 — D4-D10 `withTransaction` extension

**Status**: LANDED (in-wave extension of Lane A.1).
**Authored**: 2026-05-26.
**HEAD at landing**: `tranche-h` @ `a12a71d` + Lane A.1 working-tree + Lane A.2 working-tree.
**Sibling docs**:
- `docs/tranches/H/audit/api-withTransaction-coverage.md` — the standing H1 reference, updated by this lane to reflect the 16 WRAPPED rows in §2.
- `docs/tranches/H/audit/H.W1-lane-a-createPalette-patchPalette-withTransaction.md` — the Lane A.1 landing doc (createPalette + patchPalette).
- `docs/tranches/H/audit/H.W1-lane-c-coverage-audit-list.md` — the Lane C audit that surfaced D4-D10.
- `docs/tranches/G/audit/G.W3-lane-e-withTransaction-expansion.md` — the previous expansion (3 → 7 wrapped sites; the canonical signature-convention reference).

---

## §1 — Mission + orchestrator adjudication

Lane A.1 wrapped `createPalette` + `patchPalette` (the H-AUDIT-6 finding). Lane C's standing-reference audit (`api-withTransaction-coverage.md`) surfaced **7 additional cross-collection write sites** (D4-D10) in the SAME defect class — sites that mutate ≥ 2 collections without `services.withTransaction` and so leak orphan rows on partial failure.

**Orchestrator adjudication**: option **α** (H1 maximalist closure). The H.md §2 H1 invariant text reads "every cross-collection write site in `api/` uses `services.withTransaction(async (session) => { ... })`" — the maximalist reading is the H1 invariant verbatim, and Lane A.1's H-AUDIT-6-scoped wrap is a strict subset. Option β (defer D4-D10) would require a per-site exception list inside H1 — a contortion the F1 "no deferrals" doctrine forbids. Option γ (partial wrap) is the same contortion at lower amplitude.

Lane A.2 wraps all 7 D-sites in-wave + author 7 dedicated rollback tests + extends the standing-reference audit-list to reflect the closure.

---

## §2 — Per-site wrap details

Every site wraps in `services.withTransaction(async (session) => { ... })` with `session` threaded through every internal repository call. Audit-log emissions (`emitAuditEvent`) stay OUTSIDE the txn closure per the D2 "befitting-graceful" carve-out (`api/src/events/auditLog.ts:1-13`) — the canonical shape established at `services/palette/crud.ts:209` (G.W3 Lane E). The post-txn audit emission cannot roll back the real action; an audit-infrastructure hiccup is `console.error`'d rather than surfaced.

| # | File:line of `services.withTransaction(` call | Function | Collections wrapped | Audit-emission position |
|---|---|---|---|---|
| D4 | `api/src/services/session/auth.ts:74` | `registerSession` | `users.insert` + `sessions.insert` | (no audit emit — register is non-admin) |
| D5 | `api/src/services/session/auth.ts:132` | `loginSession` | `sessions.insert` + `users.touchLastSeen` | (no audit emit — login is non-admin) |
| D6 | `api/src/services/admin/palettes.ts:49` | `deletePalette` (admin variant) | `palettes.delete` + `votes.deleteByPaletteSlug` + `flags.deleteByPaletteSlug` | post-txn (D2 carve-out) |
| D7 | `api/src/services/admin/users.ts:122` | `setUserStatus` | `users.setStatus` + `sessions.deleteByUserSlug` (suspend branch only — wrap is unconditional for call-site uniformity, mirroring the cheap single-statement txn shape from `patchPalette`) | post-txn (D2 carve-out) |
| D8 | `api/src/services/admin/users.ts:207` | `deleteUserPalettes` | `palettes.findByUserSlug` (read inside txn for snapshot consistency) + `votes.deleteByPaletteSlugs` + `flags.deleteByPaletteSlugs` + `palettes.deleteManyByUserSlug` | post-txn (D2 carve-out) |
| D9 | `api/src/services/admin/users.ts:241` | `pruneEmptyUsers` | `sessions.deleteByUserSlugs` + `users.deleteMany` | post-txn (D2 carve-out). `findEmptyUserSlugs` (aggregation) runs BEFORE the txn — the early-return path on 0 slugs avoids opening an empty session. |
| D10 | `api/src/services/admin/tags.ts:78` | `deleteTag` | `tags.deleteByName` + `palettes.pullTagFromAll` | post-txn (D2 carve-out) |

**Session threading verification**: every repository call inside each wrapped block passes `session` as its final argument. Verified by Read of each modified function — the only deviation from the standard `session` parameter name is `loginSession`, which uses `txnSession` to avoid shadowing the local `session: Session` document variable. No call inside any wrapped block calls a repository method without forwarding the txn handle.

**Compile + test verification**: `npx tsc --noEmit` exits 0; `npx vitest run` exits 0 with 115 tests passing (108 baseline post-Lane-A.1 + 7 new D-site rollback tests).

---

## §3 — Repository signature extensions

7 repository methods reached from the newly-wrapped blocks did NOT previously accept `session?: ClientSession`. Each was extended mechanically per the G.W3 Lane E convention (last positional arg, passed as `session ? { session } : undefined` to the underlying Mongo driver call).

| File | Method | Pre-A.2 signature | Post-A.2 signature |
|---|---|---|---|
| `api/src/repositories/user.ts:18` | `insert` | `(user: User): Promise<void>` | `(user: User, session?: ClientSession): Promise<void>` |
| `api/src/repositories/user.ts:22` | `setStatus` | `(slug: string, status: UserStatus): Promise<void>` | `(slug: string, status: UserStatus, session?: ClientSession): Promise<void>` |
| `api/src/repositories/user.ts:46` | `touchLastSeen` | `(slug: string, when: Date): Promise<void>` | `(slug: string, when: Date, session?: ClientSession): Promise<void>` |
| `api/src/repositories/user.ts:62` | `deleteMany` | `(slugs: string[]): Promise<number>` | `(slugs: string[], session?: ClientSession): Promise<number>` |
| `api/src/repositories/session.ts:31` | `insert` | `(session: Session): Promise<void>` | `(session: Session, clientSession?: ClientSession): Promise<void>` |
| `api/src/repositories/tag.ts:28` | `deleteByName` | `(name: string): Promise<number>` | `(name: string, session?: ClientSession): Promise<number>` |
| `api/src/repositories/palette.ts:184` | `pullTagFromAll` | `(tag: string): Promise<number>` | `(tag: string, session?: ClientSession): Promise<number>` |

**Naming deviation**: `SessionRepository.insert` uses the parameter name `clientSession` (not `session`) for the optional Mongo `ClientSession`. This is the ONLY repository method where the canonical `session?` name would shadow an existing required parameter (`session: Session`, the session document being inserted). The deviation is local to the method signature — call-sites pass the txn handle positionally, and the underlying `insertOne` call destructures it as `{ session: clientSession }`.

**Existing session-aware methods reached from the new wraps** (no signature change needed; the extension was the wrap, not the method):
- `palettes.delete` (G.W3 Lane E)
- `palettes.findByUserSlug` (E.W2 Lane B)
- `palettes.deleteManyByUserSlug` (E.W2 Lane B)
- `votes.deleteByPaletteSlug` (E.W2 Lane B)
- `votes.deleteByPaletteSlugs` (G.W3 Lane E)
- `flags.deleteByPaletteSlug` (E.W2 Lane B)
- `flags.deleteByPaletteSlugs` (G.W3 Lane E)
- `sessions.deleteByUserSlug` (E.W2 Lane B)
- `sessions.deleteByUserSlugs` (G.W3 Lane E)

---

## §4 — The 7 new rollback tests

`api/test/services/withTransaction-rollback-h-w1.test.ts` was extended with one new test per D-site. Each test:
1. Seeds whatever prerequisite state the function reads (existing user, palette, tag, etc.).
2. Stubs a LATER repository write inside the wrapped block to throw — chosen so the stubbed call runs AFTER an earlier collection write has already executed inside the open transaction.
3. Invokes the service function; asserts the call rejects with the induced error.
4. Restores the stub; reads back through the real repositories to verify NONE of the earlier writes persisted.

All 7 run against `MongoMemoryReplSet` (`test/setup.ts`) so the transaction boundary is REAL (not stubbed).

| D# | Test name | What rolls back | Stubbed throw |
|---|---|---|---|
| D4 | `D4 registerSession rolls back user.insert when sessions.insert throws` | the `users.insert` that ran first | `sessions.insert` |
| D5 | `D5 loginSession rolls back sessions.insert when users.touchLastSeen throws` | the `sessions.insert` that ran first; the seeded user's `lastSeenAt` is unchanged | `users.touchLastSeen` |
| D6 | `D6 admin deletePalette rolls back palette + votes when flags.deleteByPaletteSlug throws` | the `palettes.delete` + `votes.deleteByPaletteSlug` that ran first | `flags.deleteByPaletteSlug` |
| D7 | `D7 setUserStatus(suspended) rolls back user status when sessions.deleteByUserSlug throws` | the `users.setStatus` that ran first | `sessions.deleteByUserSlug` |
| D8 | `D8 deleteUserPalettes rolls back vote + flag cascade when palettes.deleteManyByUserSlug throws` | the `votes.deleteByPaletteSlugs` + `flags.deleteByPaletteSlugs` that ran first | `palettes.deleteManyByUserSlug` |
| D9 | `D9 pruneEmptyUsers rolls back sessions.deleteByUserSlugs when users.deleteMany throws` | the `sessions.deleteByUserSlugs` that ran first | `users.deleteMany` |
| D10 | `D10 deleteTag rolls back tags.deleteByName when palettes.pullTagFromAll throws` | the `tags.deleteByName` that ran first | `palettes.pullTagFromAll` |

**Vitest output** (verbose, scoped to the D-site test file):
```
✓ D4 registerSession rolls back user.insert when sessions.insert throws 30ms
✓ D5 loginSession rolls back sessions.insert when users.touchLastSeen throws 250ms
✓ D6 admin deletePalette rolls back palette + votes when flags.deleteByPaletteSlug throws 65ms
✓ D7 setUserStatus(suspended) rolls back user status when sessions.deleteByUserSlug throws 32ms
✓ D8 deleteUserPalettes rolls back vote + flag cascade when palettes.deleteManyByUserSlug throws 34ms
✓ D9 pruneEmptyUsers rolls back sessions.deleteByUserSlugs when users.deleteMany throws 22ms
✓ D10 deleteTag rolls back tags.deleteByName when palettes.pullTagFromAll throws 40ms
```

D5's 250ms duration is the `LOGIN_CONSTANT_DELAY_MS` (`auth.ts:38`) constant-time padding — not a test slowness signal; it's the production code path running through its anti-timing-attack delay.

---

## §5 — Sub-gate evidence

Per the H.W1 Lane A.2 mission spec:

1. **`cd api && npx vitest run` — exits 0; test count = 115** (was 108 post-Lane-A.1 + 7 new Lane A.2 tests). ✓
2. **`cd api && npx tsc --noEmit` — exits 0.** ✓
3. **Every new rollback test verified GREEN** by name in the vitest summary (see §4 listing). ✓
4. **`grep -rn 'services.withTransaction' api/src/services/ | wc -l` returns 16** (was 9 post-Lane-A.1, +7 from Lane A.2). ✓
5. **Audit-list updated**: `api-withTransaction-coverage.md` §1.4 (16-row authoritative grep), §2 (16 WRAPPED rows), §3.2 (D4-D10 removed; only D3 remains), §6.2 (option-α adjudication recorded), §6.3 (H1 fully-closed status). ✓
6. **H.W1-lane-a2 doc authored**: this file. ✓

---

## §6 — Judgment calls + non-shortcuts

- **D7 `setUserStatus` wrap is unconditional** even though only the `status === "suspended"` branch is cross-collection. Wrapping conditionally would split the function shape (`if (status === "suspended") services.withTransaction(...) else users.setStatus(...)`) — uglier than the cheap single-statement transaction the `unsuspend` branch becomes when wrapped uniformly. The canonical precedent is `patchPalette` (Lane A.1) which also wraps a path that is single-collection when `!contentChanged`. KISS + call-site uniformity.

- **D5 `loginSession` uses `txnSession` rather than `session`** as the closure parameter name. The function already has a local `session: Session` (the session document being inserted). Renaming the local would touch more of the function; renaming the closure parameter is local to the wrap. The G.W3 Lane E convention is "the closure parameter is named `session`" but the convention is descriptive, not load-bearing — call-sites pass the txn handle positionally, and the only Read-time confusion would be `session.insert(session, txnSession)` which is the production shape regardless.

- **D8 `deleteUserPalettes` reads `palettes.findByUserSlug` INSIDE the wrapped block** (rather than outside, as the pre-wrap code did). The read is now session-aware via the extended signature, giving the txn a consistent snapshot of which palette slugs to cascade through votes/flags. Reading outside the txn would expose a race where a new palette landed between the read + the cascading delete — the H1 invariant's correctness story prefers the in-txn read for snapshot consistency.

- **D9 `pruneEmptyUsers` keeps the `findEmptyUserSlugs` aggregation OUTSIDE the wrapped block**. The aggregation is a read-only `$lookup` against `palettes` that crosses 2 collections at READ time; opening a txn around it would buy nothing (no writes are at risk) and would extend the txn lifetime over a potentially expensive aggregation. The early-return path on 0 slugs also avoids opening an empty session — a small efficiency that's harder to express if the read is wrapped.

- **No D-site was reclassified as not-actually-cross-collection on re-read.** Lane C's heuristic was accurate; every D-site wraps ≥ 2 distinct repository write surfaces (modulo the D2 audit-log carve-out which is post-txn for every admin variant).

---

## §7 — H1 post-Lane-A.2 closure status

The H1 invariant text reads (from `docs/tranches/H/H.md §2`):
> Every cross-collection write site in `api/` uses `services.withTransaction(async (session) => { ... })` and threads `session` through every repository call inside the block.

**Post-Lane-A.2 HEAD state**:
- 16 cross-collection write sites in `api/src/services/**/*.ts` (§2 of the standing reference).
- All 16 wrap in `services.withTransaction(async (session) => { ... })`.
- All 16 thread `session` through every repository call inside the block (verified by Read).
- 3 remaining DEFERRED entries (D1 = batch-delete per-row loop, D2 = audit-log carve-out, D3 = impersonate with sole D2-class secondary) carry rationale-DEFENDED in-code comments OR are funneled through the D2 carve-out.

**The H1 invariant is FULLY CLOSED for the maximalist reading.** The standing reference `api-withTransaction-coverage.md` § 5.2 reviewer's checklist is the runtime-enforceable shape of the invariant in code-review — any new cross-collection write site MUST land in §2 with a wrap, in §3 with a defended carve-out, or in §4 with a single-collection classification.
