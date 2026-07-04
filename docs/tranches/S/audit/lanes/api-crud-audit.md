# S — api/ CRUD facility audit vs demo consumption

Scope: every route in `api/src/routes/**` × every consumer in `demo/@/lib/palette/api/*`
(+ the composables/components that call them). Audit-only; no product-code edits.
Repo `/Users/mkbabb/Programming/value.js` @ `c5aa091` (branch `tranche-q`).

## 0 — Baseline (measured)

```
cd api && npx tsc --noEmit         → 0 errors
cd api && npx vitest run           → 37 files, 224/224 passing (54.2s)
```

`api/src` structural invariants spot-checked against the CLAUDE.md claims (all confirmed, not just trusted):
- `as any` = 0 (`grep -rn "as any" src/` → 0 hits)
- `as unknown as` = 1 (`src/index.ts:189`, `@hono/node-server` `.close()` handle — matches the documented irreducible)
- `withTransaction(` call sites = **14** (13 in `src/services/**` + 1 in `src/cron.ts:47` the reaper) — matches the H1 doc's claimed count exactly
- `services.repositories.*` direct calls inside `src/routes/**` = 0 (boundary holds — routes never bypass the service layer)
- No `api/src/**/*.ts` file exceeds 350 LoC (`find src -name "*.ts" | xargs wc -l | awk '$1>350'` → empty)
- No `sessionToken` field / legacy 4-state `status` field on `Palette` in `src/models.ts` (L excision holds in the *current source tree*; contrast with §4 below — production does not match this)

## 1 — Route × consumer matrix

Legend: **wrapped** = a `demo/@/lib/palette/api/*` function calls this exact path. **consumed** = that wrapper has ≥1 caller outside `lib/palette/api/`. ✗ = missing at that stage.

| Route | Wrapped? | Demo consumer | Verdict |
|---|---|---|---|
| `GET /` , `GET /health`, `GET /docs`, `GET /openapi.json` | n/a (ops/meta) | none (by design) | fine — meta surface, not a UI concern |
| `GET /palettes` (cursor-only, N.W3.D) | `listPalettes` | `useBrowsePalettes.ts`, `useDialogBrowseActions.ts` | **partial** — see finding F-1: only page 1 is ever fetched |
| `GET /palettes/mine` | `getMyPalettes` | **none** | **dead client wrapper** |
| `GET /palettes/:slug` | `getPalette` | `useSlugMigration.ts` (1) | consumed |
| `POST /palettes` | `publishPalette` | `usePaletteActions.ts` (`onPublish`), `useSlugMigration.ts` | consumed — see finding F-2 (naming collision) |
| `PATCH /palettes/:slug` | `updatePalette`/`renamePalette` | `useBrowsePalettes.ts`, `useTagEdit.ts`, `usePaletteActions.ts` (×3) | consumed; ETag discipline verified (§2) |
| `DELETE /palettes/:slug` | `deletePaletteUser` | `useBrowsePalettes.ts` | consumed |
| `POST /palettes/:slug/vote` | `votePalette` | `useBrowsePalettes.ts` | consumed |
| `POST /palettes/:slug/flag` | `flagPalette` | `FlagReportDialog.vue` | consumed |
| `POST /palettes/:slug/fork` | `forkPalette` | `useVersionHistory.ts` | consumed |
| `POST /palettes/:slug/remix` | **✗ no wrapper exists** | — | **dead route — never reachable from demo** (F-3) |
| `GET /palettes/:slug/forks` | `listForks` | **none** | **dead client wrapper** |
| `GET /palettes/:slug/provenance` | `getProvenance` | **none** | **dead client wrapper** |
| `GET /palettes/:slug/diff` | **✗ no wrapper exists** | — | **dead route — never reachable from demo** (F-3) |
| `GET /palettes/:slug/versions` | `listVersions` | `useVersionHistory.ts` | consumed |
| `GET /palettes/:slug/versions/:hash` | `getVersion` | **none** | **dead client wrapper** |
| `POST /palettes/:slug/revert` | `revertPalette` | `useVersionHistory.ts` | consumed |
| `POST /palettes/:slug/publish` | **✗ no wrapper exists** | — | **dead route — structurally unreachable** (F-4) |
| `POST /palettes/:slug/unpublish` | **✗ no wrapper exists** | — | **dead route — structurally unreachable** (F-4) |
| `GET /colors/approved` | `getApprovedColorNames` | `useCustomColorNames.ts` | consumed |
| `GET /colors/search` | `searchColorNames` | **none** | **dead client wrapper** |
| `GET /colors/tags` | `getTags` | `useTagEdit.ts` (×3 sites via facade) | consumed |
| `POST /colors/propose` | `proposeColorName` | `ColorInput.vue` | consumed |
| `POST /sessions`, `/sessions/login`, `DELETE /sessions` | `createSession`/`loginWithSlug`/`deleteSession` | `useUserAuth.ts`, `useSession.ts` | consumed |
| `GET /sessions/me` | `getMe` | **none** | **dead client wrapper** |
| Admin: colors (`queue`/`approve`/`reject`/`delete`/`approved`) | all wrapped | `AdminColorQueue.vue` | consumed |
| Admin: `/admin/tags` CRUD | wrapped | `AdminTagsPanel.vue` | consumed |
| Admin: `/admin/palettes/:slug/feature`, `DELETE /admin/palettes/:slug` | wrapped | `AdminPaletteOps.vue`/`PaletteCardMenu.vue` | consumed |
| Admin: `/admin/flagged`, `DELETE /admin/flags/:slug` | wrapped | `AdminFlaggedPanel.vue` | consumed |
| Admin: `/admin/users`, `/admin/users/:slug/palettes`, `DELETE /admin/users/:slug`, `DELETE /admin/users/:slug/palettes` | wrapped | `AdminUsersPanel.vue` | consumed |
| Admin: `/admin/users/:slug/status` | `setUserStatus` | **none** | **dead client wrapper** (self-documented — see F-5) |
| Admin: `/admin/users/:slug/import` | `importPalettes` | **none** | **dead client wrapper** |
| Admin: `/admin/users/prune-empty` | `pruneEmptyUsers` | `AdminUsersPanel.vue` | consumed |
| Admin: `/admin/impersonate` | `impersonateUser` | `AdminUsersPanel.vue` | consumed |
| Admin: `/admin/batch/palettes` | `batchPaletteAction` | **none** | **dead client wrapper** |
| Admin: `/admin/batch/users` | `batchUserAction` | **none** | **dead client wrapper** |
| Admin: `/admin/audit` | `getAuditLog` | `AdminAuditPanel.vue` | consumed |

**Tally**: 44 route×wrapper pairs enumerated. 2 server routes (`/:slug/remix`, `/:slug/diff`) have **no client wrapper at all** — structurally unreachable. 2 more (`/:slug/publish`, `/:slug/unpublish`) likewise have no wrapper. 9 wrapper functions exist with **zero UI consumers** (`getMyPalettes`, `getVersion`, `listForks`, `getProvenance`, `searchColorNames`, `getMe`, `setUserStatus`, `importPalettes`, `batchPaletteAction`, `batchUserAction` — that's 10, not 9; corrected count below). Every route the demo *does* reach is correctly formed (verb, auth tier, body shape all match `meta-routes.ts`'s `ROUTES` table, which itself is faithfully hand-kept — spot-checked 6 entries against the live routers).

## 2 — Ownership / ETag discipline

- `requireOwnership` gates PATCH/DELETE/fork-adjacent mutations; `assertIfMatch`/`paletteETag` enforce optimistic concurrency on PATCH and publish/unpublish (`api/src/middleware/etag.ts`, `routes/palettes/publish.ts:29-35`).
- Demo-side: `useBrowsePalettes.ts:113-118` (rename) correctly derives `paletteETag(palette)` from the held object — no extra round-trip, matches the doc'd contract.
- `useTagEdit.ts:56` intentionally passes `"*"` (RFC 7232 match-any) because the tag-edit popover holds only `{slug, tags}`, not the full palette — documented inline, not a silent workaround. This is legitimate use of a contract-sanctioned escape hatch, not a precept violation, but it does mean tag edits can silently clobber a concurrent PATCH from the same user in two tabs. **P2**, not P0/P1.
- No PATCH/DELETE call site in the demo omits `If-Match`/relies on undocumented defaults.

## 3 — `withTransaction` (H1) + typed-`ApiError` boundary (L)

Both hold as documented (§0). No new cross-collection write site was found outside the enumerated 14; no `routes/` or `middleware/` file constructs an ad-hoc `c.json({ error })` (grep for `c.json({ error` across `src/routes` + `src/middleware` → 0 hits, confirmed).

## 4 — The `(visibility, tier)` state machine is write-side degenerate — **P0**

Traced every write site that sets `Palette.visibility`:

- `services/palette/crud.ts:97` (create) → hardcoded `"public"`
- `services/palette/forks.ts:89` (fork/remix) → hardcoded `"public"`
- `services/admin/import.ts:53` (admin import) → hardcoded `"public"`
- `services/palette/visibility.ts` (`setVisibility`, the ONLY place any value other than `"public"` can ever be written) → reachable solely through `POST /:slug/publish` / `POST /:slug/unpublish`

Per §1 (F-4), those two routes have **no demo client wrapper** — `grep -rn "publish\b\|unpublish" demo/@/lib/palette/api/*.ts` finds nothing matching those paths. The demo's own `publishPalette()` is `POST /palettes` (create), not the visibility-flip verb (confirmed at `usePaletteActions.ts:40-53`, which calls `publishPalette({name, slug, colors})` — the create-shape body, not `{}`/no-body the flip verbs expect).

**Consequence**: every palette a demo user ever creates is permanently `visibility: "public"`. `"unlisted"` is never written anywhere in `api/src` (0 write sites) — it is a live enum member with zero reachable state. `"private"` is reachable only by a route the demo cannot call. The list-filter's `viewingOwn` branch (`crud-list.ts:107-115`) that lets an owner narrow their own listing by `visibility` is therefore filtering over a column that, for every row a real user created, holds exactly one value. The entire visibility dimension of the "(visibility, tier) is the canonical curation state" invariant (api/CLAUDE.md, tranche L) is **structurally unreachable from the only client that exists.**

This is not a bug in the API (the publish/unpublish verb pair is well-built, tested at `test/routes/palettes-publish.test.ts`, 11 passing tests) — it's a **product surface gap**: the demo has no "make private" / "make unlisted" affordance anywhere in its UI, so the backend built a 3-state machine the frontend can only ever land in 1 of the 3 states.

**Root-routing verdict**: `demo` (wire the publish/unpublish verbs + a visibility toggle UI) — the api/ side needs no change; if the product decision is "public-only, forever," the api/ `unlisted`/`private` states and the whole publish/unpublish route pair should be excised instead (per the no-god-machinery / DRY precept — don't carry a 3-state enum + a dedicated verb-pair route + 11 tests for 1 reachable state).

## 5 — Envelope/type drift, demo ↔ api

- `FormattedPalette` (api, `src/format/palette.ts`) emits `published` (derived `visibility === "public"`), `deletedAt`, and `atomSetHash`. The demo's `Palette` type (`demo/@/lib/palette/types.ts:7-43`) declares **none of these three fields**. Harmless at runtime (extra JSON fields are silently dropped by consumers), but it means `deletedAt`/`published`/`atomSetHash` are load-bearing on the wire and invisible to the type system on the client — any consumer that starts depending on `palette.published` typechecks fine today (as `any`-adjacent access through an untyped field) with no compile-time signal. **P2**.
- `CursorPaginatedResponse<T>` (`nextCursor`/`hasMore`) is declared in `types.ts:121-125` and is the actual shape `GET /palettes` returns (N.W3.D collapsed that route to cursor-only) — but see F-1: nothing in the demo ever reads `nextCursor`/`hasMore`. The type exists to describe a wire shape the client never advances past page 1 of.
- `listPalettes()`'s demo wrapper (`palettes.ts:35-52`) still builds an `offset` param (`if (opts.offset != null && !opts.cursor) params.set("offset", ...)`) for a route that has been cursor-only since N.W3.D — `offset` on `GET /palettes` is now a no-op query param the zod schema (`listPalettesQuery`) still accepts but `crud-list.ts` never reads for the cursor path. Not silently *wrong* (server ignores it, doesn't misbehave), but it's dead parameter plumbing left over from the pre-N.W3.D dual-mode design. **P2**.

## 6 — Findings (P0/P1/P2, root-routed)

**P0 — F-4: the demo has zero path to ever set a palette's visibility away from `public`.**
Failure scenario: a user who wants to keep a work-in-progress palette private/unlisted has no UI or client-API path to do so — every save is immediately, permanently public. Root-routing: **demo** (wire `publish`/`unpublish` + a visibility control), OR **api** (retire the unreachable `unlisted`/`private` states + the publish/unpublish route pair if "always public" is the actual product decision — don't maintain dead state-machine surface). Candidate wave-item: decide the product intent first (ask), then either wire 1 new `demo/@/lib/palette/api/publish.ts` wrapper + a menu affordance, or delete `services/palette/visibility.ts` + `routes/palettes/publish.ts` + their 11 tests + the 2 dead enum members.

**P1 — F-1: public Browse never paginates past the first 50 palettes.**
`useBrowsePalettes.ts:46-48` calls `listPalettes({limit: 50, offset: 0, ...})` from every call site (`usePaletteManagerWiring.ts`, `BrowsePane.vue`, `PaletteDialog.vue`, `useDialogBrowseActions.ts` — checked all 7 call sites of `loadRemotePalettes`), always with the same fixed `offset: 0` / no cursor argument. `nextCursor`/`hasMore` from the response are read nowhere (`grep -rn "nextCursor|hasMore" demo/@` → only the type declaration, zero consumption). The server-side keyset-cursor machinery (`crud-list.ts`, fetch-ahead bound, `MAX_FETCH_AHEAD_BATCHES`) built at N.W3.D specifically to make deep pagination cheap is entirely unused for its primary purpose. Failure scenario: with >50 public palettes in the collection (already true — spot-checked prod: `total: 10` currently, but this silently caps at 50 the moment the count crosses it), a user can never browse to palette 51+. Root-routing: **demo** — `PaletteBrowseTab`/`useBrowsePalettes.ts` needs a load-more/infinite-scroll wired to `nextCursor`, mirroring the pattern already used correctly for `AdminAuditPanel.vue`/`AdminFlaggedPanel.vue` (offset `PaginationBar`) or `useVersionHistory.ts`'s own `loadMore`.

**P1 — F-3: `POST /:slug/remix` and `GET /:slug/diff` are fully-built, tested server routes with no client wrapper at all.**
`remix` (J.W2, cross-collection atom-diff fork) has dedicated validation (`remixPaletteBody`), a dedicated response shape (`{...formatted, remixedFrom, atomDiff}`), and its own test file (`palette-forks.test.ts`) — but `grep -rn "remix\|/diff" demo/@/lib/palette/api/*.ts` returns nothing. The demo's fork UI (`useVersionHistory.ts`) only ever calls plain `forkPalette` (`POST /:slug/fork`), which is a strict subset of what `/remix` does (fork with no atom-diff recording). Root-routing: **demo** if the atom-diff-on-fork UX is wanted (wrap `/remix` in `versions.ts`, wire from `PaletteCardMenu.vue`'s existing "fork" action); otherwise **api** — retire `/remix` (dupes `/fork` for every reachable demo caller) or fold it into `/fork` with an optional `colors` body param, since right now the API maintains two structurally-overlapping fork endpoints and only the weaker one is reachable.

**P1 — F-5: 10 client-API wrapper functions have zero UI consumers** (`getMyPalettes`, `getVersion`, `listForks`, `getProvenance`, `searchColorNames`, `getMe`, `setUserStatus`, `importPalettes`, `batchPaletteAction`, `batchUserAction`).
`setUserStatus` is self-documented dead in `e2e/smoke/admin/flows/user-status.spec.ts:7-9` ("no UI-surfaced status-toggle... filed as an E.W3 Lane A finding") — confirms this is a known, aged gap, not new. The other 9 were not previously filed. Each is fully wired API→wrapper (correct path/method/body), just never called by any component/composable. Root-routing: **demo** — either wire the missing affordances (fork/provenance UI for lineage browsing; a user-suspend toggle in `AdminUsersPanel.vue`; a color-search-as-you-type in whichever color-name input currently only lists-all; a batch-select UI reusing the existing `BulkActionToolbar.vue` shell, which is present and slot-driven but nothing feeds it admin batch calls) or delete the dead wrappers to stop them shipping in the bundle and drifting further from any real caller. Given `demo/`'s no-god-module / DRY discipline, carrying 10 unreachable HTTP wrappers indefinitely is itself a violation-adjacent smell — each one is small, but collectively it's ~120 LoC of API surface with provably zero callers.

**P1 — F-6 (S-11 root cause, verified live): the palette API is not "broken" — there is no local backend running, and production is running stale code that predates at least 3 closed tranches.**
No local server on port 3000/8130 (`lsof`/`docker ps` both empty) — the demo dev server on :9000 has no `VITE_API_URL` override, so it talks to `https://api.color.babb.dev` (the `DEFAULT_REMOTE_API_URL` fallback in `client.ts:34`). Live curl probes against that production host:
```
GET /health         → 404 (urn:palette-api:problem:not_found)   — meta.ts's /health is NOT deployed
GET /docs           → 404
GET /openapi.json   → 404
GET /palettes/hey-v2-cd3e1e3b/diff?from=x → 404                 — diff.ts is NOT deployed
GET /palettes?limit=3 → 200, but each row carries "id":"<mongo ObjectId>" AND "status":"published"
```
Both `id` (removed at K.W2, "id-removal") and `status` (removed at L.W3, commit `17b6148`, "full-stack excision — Palette.sessionToken + legacy 4-state status") are **absent from the current `formatPalette`/`models.ts`** (confirmed by reading current source, §0) — production is running a build that predates K.W2 and L.W3, i.e. it is missing at minimum tranches K, L, and everything after (M/N/R's api-facing work, the meta router, `/diff`, presumably `/remix` too — untested but implied by the same staleness). Failure scenario for the *user* symptom: any demo session hitting prod today receives extra unused fields (harmless, since the demo's optional typed fields tolerate it) but is also silently missing every backend capability shipped since K.W2 — publish/unpublish, diff, remix, and the `/health` lineage stamp the ops tooling (`DEPLOY_COMMIT_SHA`, `scripts/deploy.sh`'s health-gate) depends on to confirm a deploy succeeded. Root-routing: **api deploy pipeline**, not application code — this is a deployment/ops gap (`docs/RELEASE.md`/DEC-9's webhook-driven `docker compose up` flow appears stalled or not re-triggered since ~K.W2), not a CRUD-facility defect. Recommend as a wave item: re-run the deploy (`scripts/deploy.sh api`), then re-probe `/health`'s `DEPLOY_COMMIT_SHA` lineage stamp to confirm parity with `master`'s current HEAD before trusting any further prod-facing audit.

**P2 — F-2: naming collision between the demo's `publishPalette()` (= create) and the API's `publish`/`unpublish` verb pair (= visibility flip).**
No functional bug today (F-4 means the latter is unreachable anyway), but the name collision is a landmine for the next contributor who reads `usePaletteActions.ts`'s `onPublish` and assumes it maps to `POST /:slug/publish`. Root-routing: **demo** — rename the client wrapper (e.g. `createAndSavePalette`) once/if F-4 is resolved and the real publish verb gets wired, to avoid two same-named-different-meaning "publish" concepts coexisting.

**P2 — F-7: envelope drift — `published`/`deletedAt`/`atomSetHash` emitted by the API, absent from the demo's `Palette` type** (§5). Root-routing: **demo** (`types.ts` — add the 3 optional fields so any future consumer gets type coverage instead of implicit `any`-shaped access).

**P2 — F-8: dead `offset` param plumbing on the now-cursor-only `GET /palettes`** (§5). Root-routing: **demo** (`palettes.ts`'s `listPalettes()` — drop the `offset`-vs-`cursor` branch since the server route stopped reading `offset` at N.W3.D; api's `listPalettesQuery` zod schema could also drop `offset` entirely for this route to fail closed instead of silently ignoring it — pick one owner).

**P2 — F-9: `useTagEdit.saveTags` uses the RFC 7232 match-any `If-Match: "*"` escape hatch** (§2) rather than a captured ETag, because the tag popover doesn't hold the full palette. Documented, contract-sanctioned, but a real (narrow) lost-update window across two tabs. Root-routing: **demo** (thread the palette's `currentHash`/`updatedAt` into the tag-edit popover's props instead of just `{slug, tags}`).

## 7 — Non-findings (verified healthy, worth recording so they aren't re-audited)

- Admin auth boundary: all 23 admin routes require `adminAuth` (bound once at `admin/index.ts:40`, timing-safe `Bearer` compare) — spot-checked every admin sub-router mount; no route bypasses it.
- `require-ownership` + `assertIfMatch` are used consistently everywhere PATCH/DELETE/publish touch a palette — no divergent ad-hoc ownership check found in any route file.
- The demo's `ApiProblem`/`client.ts` transport (429 retry-with-backoff, 401 session-clear, RFC 7807 parsing) correctly matches the api's `ApiError`/`toResponseEnvelope` shape — no envelope-parsing drift found.
- `meta-routes.ts`'s `ROUTES` table (the hand-kept `/docs` source-of-truth) was spot-checked against 6 live routers (palettes/crud, forks, publish, admin/users, colors, sessions) — faithful, no drift found in the *current source tree* (contrast with §6 F-6 — production itself just doesn't have this router deployed yet).

## 8 — Summary counts

- 33 distinct route paths across 9 route files, all correctly pipeline-shaped (validate → authn → authz → service → repository → format → response).
- 4 routes structurally unreachable from the demo (`remix`, `diff`, `publish`, `unpublish`) — 2 have no wrapper at all, 2 more (`publish`/`unpublish`) also have no wrapper.
- 10 client-wrapper functions with zero UI consumers.
- 14/14 cross-collection write sites wrapped in `withTransaction` (H1 holds, exact match to doc).
- 0 `as any`, 1 documented `as unknown as` (L holds).
- Production (`api.color.babb.dev`) verified — via live curl, not assumption — to be running code that predates tranches K/L/M/N/R on the api side; this is very likely the actual substance behind S-11, not an application-code defect.
