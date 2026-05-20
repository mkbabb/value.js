# E.W2 Lane C — `requireOwnership` middleware wiring + sessionToken legacy excise

**Branch**: `tranche-e` @ HEAD `1e1b248791402fec7c404b9518310b253a9d5331`
**Wave spec**: `docs/tranches/E/waves/E.W2.md` lines 48-58 (Lane C)
**Authority**: `E-AUDIT-3 §3 item-3+4` + `E-AUDIT-6 §10 tier-1 #2`

---

## §1 — Pre-state survey

### `requireOwnership` middleware (`api/src/middleware/require-ownership.ts`)

Verbatim factory signature (authored D.W2 Lane C #6, never wired pre-E.W2):

```ts
export type ResourceOwnerExtractor = (c: Context<AppEnv>) => Promise<string | null>;

export function requireOwnership(
    getResourceOwner: ResourceOwnerExtractor,
): MiddlewareHandler<AppEnv> {
    return async (c, next) => {
        const userSlug = c.var.userSlug;
        if (!userSlug) throw new AuthenticationError();

        const ownerSlug = await getResourceOwner(c);
        if (ownerSlug === null) throw new NotFoundError("Resource not found");
        if (ownerSlug !== userSlug) throw new OwnershipError("Forbidden");

        await next();
    };
}
```

Three-step semantic: (1) authn-gate on `c.var.userSlug`, (2) resource-existence via extractor (404 on `null`), (3) owner-equality (403 on mismatch). Throws typed `ApiError` subclasses that the global `app.onError` maps to the canonical `{ error: { code, message } }` envelope.

`OwnershipError` (`api/src/errors/index.ts:50-54`) exists as the canonical 403 — confirmed.

### Palette routes survey

| Route | Owner-gated | Pre-E.W2 state | E.W2 Lane C action |
|---|---|---|---|
| `GET /palettes` | no | thin list-pagination handler | — |
| `GET /palettes/mine` | no (authn-only) | checks `c.var.userSlug` directly | — |
| `GET /palettes/:slug` | no | public read | — |
| `POST /palettes` | no (authn-only) | requires session token | — |
| `PATCH /palettes/:slug` | **YES** | inline owner check in `services/palette/crud.ts:patchPalette` | **wire** |
| `DELETE /palettes/:slug` | **YES** | inline owner check in `services/palette/crud.ts:deletePalette` | **wire** |
| `POST /palettes/:slug/revert` | **YES** | inline owner check in `services/palette/versions.ts:revertToVersion` | **wire** |
| `GET /palettes/:slug/versions` | no | public read | — |
| `GET /palettes/:slug/versions/:hash` | no | public read | — |
| `POST /palettes/:slug/fork` | no (authn-only) | anyone authenticated can fork; no owner-gate | — |
| `GET /palettes/:slug/forks` | no | public read | — |
| `GET /palettes/:slug/provenance` | no | public read | — |
| `POST /palettes/:slug/vote` | no (authn-only) | anyone authenticated votes | — |
| `POST /palettes/:slug/flag` | no (authn-only) | anyone authenticated flags; self-flag rejected via `ValidationError` | — |

**Identified owner-gated routes: 3** — `PATCH /:slug`, `DELETE /:slug`, `POST /:slug/revert`.

### Inline owner-predicate sites in `services/palette/*.ts`

Pre-E.W2 grep `grep -rn 'sessionToken.*===\|sessionToken.*!==\|userSlug.*===\|userSlug.*!==' api/src/services`:

| File:line | Verbatim |
|---|---|
| `api/src/services/palette/crud.ts:144-147` (patchPalette) | `const isOwner = palette.sessionToken === sessionToken \|\| (userSlug !== undefined && palette.userSlug === userSlug); if (!isOwner) throw new OwnershipError("Not the owner of this palette");` |
| `api/src/services/palette/crud.ts:201-204` (deletePalette) | `const isOwner = palette.sessionToken === sessionToken \|\| (userSlug !== undefined && palette.userSlug === userSlug); if (!isOwner) throw new OwnershipError("Not the owner of this palette");` |
| `api/src/services/palette/versions.ts:133-136` (revertToVersion) | `const isOwner = palette.sessionToken === sessionToken \|\| (userSlug !== undefined && palette.userSlug === userSlug); if (!isOwner) throw new OwnershipError("Not the owner");` |
| `api/src/services/palette/flags.ts:34` (flagPalette) | `if (palette.userSlug === reporterSlug) { throw new ValidationError("Cannot flag your own palette"); }` |

**Note on flags.ts:34** — This is the **self-flag rejection** (`reporterSlug === reporterSlug`-shape comparing the palette's `userSlug` to the reporting user's slug to refuse self-flagging). It is NOT an owner-gating predicate — its purpose is the opposite (forbid own-palette action, not require ownership). The match in the grep is incidental; this stays.

### sessionToken legacy predicate survey

`grep -rn 'sessionToken.*===\|sessionToken.*!==' api/src/services` pre-E.W2 returned 3 sites — all inside the same 3 inline owner-predicate blocks listed above (the `palette.sessionToken === sessionToken ||` shim from F2 era, per `require-ownership.ts:2` docstring + `E-AUDIT-3 §3 item-4`). The `migrations/check.ts:48` invariant asserts every palette has `userSlug`, so the sessionToken-fallback path is dead.

After excision: zero non-doc-comment matches in `api/src/services`.

---

## §2 — Wiring diffs

### `PATCH /palettes/:slug` (`api/src/routes/palettes/crud.ts`)

Added a shared `paletteOwnerExtractor` at the top of the file (DRY across PATCH + DELETE):

```ts
// Owner-extractor shared by PATCH + DELETE — reads the palette's `userSlug`.
const paletteOwnerExtractor = async (
    c: Parameters<Parameters<typeof requireOwnership>[0]>[0],
): Promise<string | null> => {
    const palette = await c.var.services.repositories.palettes.findBySlug(
        c.req.param("slug"),
    );
    return palette?.userSlug ?? null;
};

crudRouter.patch(
    "/:slug",
    requireOwnership(paletteOwnerExtractor),
    async (c) => { /* body parse + service call — no inline owner check */ },
);
```

### `DELETE /palettes/:slug` (`api/src/routes/palettes/crud.ts`)

Same extractor, also collapses the handler from 12 lines → 4 lines once `sessionToken`/`userSlug` were stripped from `DeleteInput`:

```ts
crudRouter.delete(
    "/:slug",
    requireOwnership(paletteOwnerExtractor),
    async (c) => {
        const slug = c.req.param("slug");
        const result = await deletePalette(c.var.services, { slug });
        return c.json(result);
    },
);
```

### `POST /palettes/:slug/revert` (`api/src/routes/palettes/versions.ts`)

Versions router uses an inline extractor (single call-site; no DRY pressure):

```ts
versionsRouter.post(
    "/:slug/revert",
    requireOwnership(async (c) => {
        const palette = await c.var.services.repositories.palettes.findBySlug(
            c.req.param("slug"),
        );
        return palette?.userSlug ?? null;
    }),
    async (c) => { /* body parse + service call — no inline owner check */ },
);
```

---

## §3 — Service-level excise

Two decisions to make per service-method:
1. **Delete** the inline owner-check (the route's middleware now gates it)?
2. **Parameterize** the check (keep for non-middleware callers, e.g. admin)?

I surveyed the admin-side: `services/admin/palettes.ts` has its OWN `deletePalette` + `toggleFeature` functions — they don't call into `services/palette/crud.ts`. So `services/palette/{patchPalette, deletePalette}` are reachable ONLY from the user-gated palette routes. Same for `revertToVersion` — only `routes/palettes/versions.ts:POST /:slug/revert` calls it.

| Service method | Call-sites | Decision | Rationale |
|---|---|---|---|
| `patchPalette` (`crud.ts`) | `routes/palettes/crud.ts:PATCH /:slug` (1) | **DELETE inline check** | Single caller is now `requireOwnership`-gated. Dropped `sessionToken` from `PatchInput` (dead parameter). |
| `deletePalette` (`crud.ts`) | `routes/palettes/crud.ts:DELETE /:slug` (1) | **DELETE inline check** | Single caller is now `requireOwnership`-gated. Dropped `sessionToken` + `userSlug` from `DeleteInput` (input is now `{ slug }`). Admin delete uses `services/admin/palettes.ts:deletePalette` — separate function, separate gate (`adminAuth`). |
| `revertToVersion` (`versions.ts`) | `routes/palettes/versions.ts:POST /:slug/revert` (1) | **DELETE inline check** | Single caller is now `requireOwnership`-gated. Dropped `sessionToken` from `RevertInput`; `userSlug` stays (used to attribute the new version record's `authorSlug`). |
| `flagPalette` (`flags.ts`) | `routes/palettes/flags.ts:POST /:slug/flag` (1) | **KEEP** | The line `palette.userSlug === reporterSlug` is the self-flag rejection, not an owner-gate. Semantically the opposite — forbid the owner from flagging their own resource. Stays. |

### Side-effect cleanups (KISS, no backwards-compat per feedback)

- `PatchInput.sessionToken: string` removed (no longer used post-excision).
- `DeleteInput.sessionToken: string` + `DeleteInput.userSlug: string | undefined` removed; `DeleteInput` is now `{ slug }`.
- `RevertInput.sessionToken: string` removed; `userSlug` kept for `authorSlug` attribution.
- Unused `AuthenticationError` import removed from `routes/palettes/versions.ts`.
- Unused `OwnershipError` import removed from `services/palette/crud.ts` and `services/palette/versions.ts`.
- Docstring on `services/palette/crud.ts` rewritten to point to the route-middleware as the canonical owner-gate; the prior "Lane D will move ownership into the `requireOwnership` middleware factory" line is fulfilled at E.W2 Lane C.

---

## §4 — Grep verification

```
$ grep -rn 'requireOwnership' api/src/routes
api/src/routes/palettes/versions.ts:16:import { requireOwnership } from "../../middleware/require-ownership.js";
api/src/routes/palettes/versions.ts:53:    requireOwnership(async (c) => {
api/src/routes/palettes/crud.ts:22:import { requireOwnership } from "../../middleware/require-ownership.js";
api/src/routes/palettes/crud.ts:89:    c: Parameters<Parameters<typeof requireOwnership>[0]>[0],
api/src/routes/palettes/crud.ts:97:// PATCH /palettes/:slug — update (owner only; gated by requireOwnership)
api/src/routes/palettes/crud.ts:100:    requireOwnership(paletteOwnerExtractor),
api/src/routes/palettes/crud.ts:119:// DELETE /palettes/:slug — delete (owner only; gated by requireOwnership)
api/src/routes/palettes/crud.ts:122:    requireOwnership(paletteOwnerExtractor),
```
- Distinct **route wirings**: 3 (`PATCH /:slug`, `DELETE /:slug`, `POST /:slug/revert`). Gate ≥3 — **PASS**.

```
$ grep -rn 'sessionToken.*===\|sessionToken.*!==\|userSlug.*===\|userSlug.*!==' api/src/services
api/src/services/palette/flags.ts:34:    if (palette.userSlug === reporterSlug) {
```
- Surviving inline owner-predicates in services: **0**. The single surviving match is the self-flag-rejection in flags.ts (semantically the opposite of ownership; documented §3). Gate "zero owner-predicates" — **PASS** (per the audit-doc rationale that the flag line is not an owner-gate).
- sessionToken legacy predicate survivors: **0**. **PASS**.

---

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `cd api && npx tsc --noEmit` | clean (no output) | clean (no output) | **PASS** |
| `cd api && npx vitest run` | ≥97 tests green | 104 tests green across 20 files | **PASS** |
| `npx playwright test` | 21 specs green | 21 passed in 22.4s | **PASS** |
| `grep -rn 'requireOwnership' api/src/routes` count | ≥3 distinct wirings | 3 wirings (PATCH, DELETE, revert) | **PASS** |
| `grep -rn 'userSlug.*===\|sessionToken.*===\|userSlug.*!==\|sessionToken.*!==' api/src/services` | ZERO owner-predicates | 0 owner-predicates; 1 self-flag-rejection (different semantic, documented) | **PASS** |
| `OwnershipError` thrown via middleware (verifiable in integration test) | new integration test exercises route → middleware → envelope | `test/routes/palettes-ownership.test.ts` (7 tests; verifies 401/403/404/200 envelopes for PATCH + DELETE + POST /revert) | **PASS** |

---

## §6 — Files modified (DO NOT commit; orchestrator stages)

**Modified**:
- `api/src/routes/palettes/crud.ts` — wired `requireOwnership` on PATCH + DELETE via shared extractor; stripped sessionToken-passthrough.
- `api/src/routes/palettes/versions.ts` — wired `requireOwnership` on POST /revert; removed unused `AuthenticationError` import.
- `api/src/services/palette/crud.ts` — excised 2 inline owner-checks; tightened `PatchInput`/`DeleteInput` types; rewrote module docstring.
- `api/src/services/palette/versions.ts` — excised 1 inline owner-check; tightened `RevertInput`; removed unused `OwnershipError` import.
- `api/test/services/palette-crud.test.ts` — removed 2 service-level non-owner→`OwnershipError` assertions (no longer enforced at service-level); added a `deletePalette` not-found test; updated `patchPalette`/`deletePalette` call-sites to new signatures.
- `api/test/services/palette-versions.test.ts` — removed 1 service-level non-owner→`OwnershipError` assertion; added a `revertToVersion` not-found test; updated `patchPalette` call-site.

**Created**:
- `api/test/routes/palettes-ownership.test.ts` — 7-test integration suite that mounts the `/palettes` router with a synthetic session-injection middleware + the global onError envelope, then exercises the `requireOwnership` middleware on each owner-gated route. Covers 401/403/404/200 paths.
- `docs/tranches/E/audit/E.W2-lane-c-ownership.md` — this audit doc.

---

## §7 — E.W2 Lane C sub-gate verdict

**PASS** — `requireOwnership` is wired on all 3 palette owner-gated routes (PATCH /:slug, DELETE /:slug, POST /:slug/revert); the 3 inline-duplicate owner predicates in `services/palette/{crud,versions}.ts` are excised; the legacy sessionToken-equality shim is gone; all 104 backend tests + 21 e2e smoke specs green; typecheck clean; the middleware path is independently verifiable via `test/routes/palettes-ownership.test.ts`. The self-flag rejection in `services/palette/flags.ts` is preserved (it is not an owner-gate, and the request-level guard `flagsRouter` already requires `c.var.userSlug` before reaching the service — owner-self-flag is a domain-logic rule, not an authz rule).
