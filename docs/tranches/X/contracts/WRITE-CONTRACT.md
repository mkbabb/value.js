SERVED MODEL: claude-opus-5[1m]

# WRITE-CONTRACT — how a palette write is fenced, preconditioned and retried

**Authored by** X-W3 unit `X.W3.3` (X.A3 · G-8 · G-9 · G-10 · G-11), 2026-09-18, at HEAD
`7bdce2b7`.
**Implementations of record:** `api/src/modules/palette/etag.ts` ·
`api/src/modules/palette/repository/palette.ts` · `api/src/modules/palette/routes/versions.ts` ·
`api/src/platform/http/idempotency.ts`.
**Conformance:** `api/src/modules/palette/__tests__/palette-write-contract.test.ts` (15 rows).

**Cite correction (fold §Gates, the *"Also touched: G-9"* block).** The record cites
`api/src/middleware/etag.ts`. That path does not exist — ⟨cmd⟩ `ls api/src/middleware` →
`No such file or directory`; ⟨cmd⟩ `find api/src -name "etag.ts"` →
**`api/src/modules/palette/etag.ts`**, the single file, cited correctly throughout this document.

---

## 1. What a write must answer

A palette write must be able to answer three questions, and before this wave it could answer
none of them:

| question | mechanism | gate |
|---|---|---|
| Did my write land on the state I read? | the ETag as a **filter clause**, `matchedCount` read | **G-8** |
| Was the caller entitled to overwrite that state? | strong `If-Match`: absent `428`, stale `412` | **G-9** |
| Is this a retry of something already done? | `Idempotency-Key`, REQUIRED where the write appends | **G-10** |

And one question the *caller* must be able to answer afterwards: **what did my write create?**
(**G-11**).

## 2. The fence (G-8)

`paletteETag(p)` (`etag.ts:28-31`) is `p.currentHash ?? p.updatedAt.toISOString()`, quoted.
`paletteETagFilter(p)` (`etag.ts:56-60`) turns that **same** read, in the same order, into a
MongoDB filter clause:

- `currentHash` present → `{ currentHash: <that hash> }`
- `currentHash` null → `{ currentHash: null, updatedAt: <that stamp> }`

`PaletteRepository.update(slug, update, session?, expect?)`
(`repository/palette.ts:137-146`, docstring `:109-136`) returns the driver's `UpdateResult` — it
no longer discards it with `.then(() => undefined)` — and, when given `expect` (the document the
caller read), merges the predicate into its filter. `assertFenceHeld(result)` (`etag.ts:72-78`) maps
`matchedCount !== 1` to **412**.

**Why a filter clause and not a repository throw.** This is the codebase's existing
compare-and-set shape: `color/repository/proposedName.ts:73-79` guards `{_id, status: from}` and
returns the outcome, leaving HTTP semantics to the layer that owns them. No repository imports
`platform/http/errors` (⟨cmd⟩ `grep -rn "errors/index.js" api/src/modules/*/repository/*.ts` →
**0 hits**), and this wave does not make the first one.

**Zero is not "nothing to do".** A fenced write that matches zero documents is either a lost
race or a vanished row. Both are `412` — the client re-reads and retries against the state that
actually won. Treating zero as success is exactly the silent overwrite this contract refuses.

### 2.1 What the fence does NOT cover (stated, not hidden)

The ETag is derived from `currentHash`, which is the hash of `name` + `colors` only. A
**tag-only** PATCH bumps `updatedAt` but leaves `currentHash` unchanged, so two concurrent
tag-only writers carry the same validator and the fence admits both. Widening this means
widening what the ETag covers — a contract change, visible to every client that caches one —
not a silent change to a filter. Recorded here so no reader assumes coverage the bytes do not
have.

### 2.2 The three product call sites are NOT yet fenced — `ESC-W3.3-CAS-CALLERS`

The predicate reaches the driver only when a caller passes `expect`. The three writes that must
pass it —

| operation | call site | today |
|---|---|---|
| PATCH | `service/crud.ts:224` | unfenced |
| revert | `service/versions.ts:215` | unfenced |
| publish / unpublish | `service/visibility.ts:174` | unfenced |

— live in three service files **outside `X.W3.3`'s writable set**. The wiring is returned as
`ESC-W3.3-CAS-CALLERS` with its exact hunks banked
(`docs/tranches/X/waves/artefacts/W3/W3-3-ESC-CAS-CALLERS.md`). Until it is ruled and landed,
**G-8's wire arm is RED**: the route-level `If-Match` pre-check stands, and the narrow TOCTOU
window it leaves (self-disclosed at `routes/crud.ts:113-123` and `service/ownership.ts:33-37`,
ledger #16) is still open. This document does not describe that window as closed.

## 3. Preconditions, per mutating operation

| operation | `If-Match` | `Idempotency-Key` | success |
|---|---|---|---|
| `POST /palettes` | — | optional (replayed) | `201` |
| `PATCH /palettes/:slug` | **required** (`428` / `412`) | optional (replayed) | `200` + `ETag` |
| `DELETE /palettes/:slug` | — | optional (replayed) | `200` |
| `POST /palettes/:slug/publish` · `/unpublish` | **required** (`428` / `412`) | optional (replayed) | `200` + `ETag` |
| `POST /palettes/:slug/revert` | **required** (`428` / `412`) | **REQUIRED** (`400`) | **`201`** + the appended revision |
| `POST /palettes/:slug/fork` (→ `/forks`, X.W3.4) | — | **REQUIRED** (`400`) | `201` |
| `PUT` / `DELETE /palettes/:slug/votes` | — | optional (replayed) | `200` |

**Why revert joined the `If-Match` set (G-9).** Revert replaces a palette's entire payload. It
was the only mutating verb on the resource with no precondition, while PATCH
(`routes/crud.ts:122`) and publish (`routes/publish.ts:39`) had required one since I.W4. The
call is identical — `assertIfMatch(ifMatch, paletteETag(current))` against the document
`requireOwnership`'s extractor already stashed on `c.var.palette`, so it costs no extra read.

**Why exactly two operations REQUIRE a key (G-10).** Opt-in replay suffices for a write that is
naturally idempotent: publish `$set`s a value, PATCH sets the fields it is handed. It does not
suffice for a write that **appends** — a retried revert releases a second revision, a retried
fork creates a second palette, and neither duplicate is something the caller can undo. The
required set is declared once, beside the store it arms
(`platform/http/idempotency.ts:91-94`, `IDEMPOTENCY_REQUIRED`, declared under `:69-90`), because
the middleware is app-global (`app.ts:73`) and runs ahead of routing; a route file can therefore
neither acquire the requirement nor lose it by accident. The regex matches fork create under
**both** spellings (`/fork` today, `/forks` after X.W3.4's G-12 rename), so the requirement
cannot fall off the route when it is renamed.

**Ordering consequence, stated.** Because that middleware runs before routing, a request to one
of those two operations with no key is refused `400` **before** authentication and ownership are
evaluated: an anonymous keyless revert reads `400`, not `401`. The refusal discloses nothing
about the resource (it is produced from the method and path alone), and the alternative —
duplicating the rule into each route after its guards — is the per-route drift this contract
exists to prevent.

## 4. The ETag, and the demo-side deviations from it

The server's ETag is defined once, at `api/src/modules/palette/etag.ts:28-31`. The demo
re-implements it, and four deviations are recorded here by name — the api half is closed by this
wave; each demo half belongs to the wave that owns the file, and none is closed by this one:

1. **Leaf-owned derivation.** `demo/palettes/api/palettes.ts:172-178` is a second, independent
   implementation of `paletteETag` (`currentHash ?? updatedAt`, quoted), and the validator is
   derived at a leaf component — `demo/palettes/browser/search/TagEditPopover.vue:74`
   `const ifMatch = source ? paletteETag(source) : undefined;` — from a row the browse list
   happens to hold, rather than from the response that produced it.
2. **The `undefined → "*"` downgrade.** That same leaf passes `undefined` when the row is not in
   hand; `demo/palettes/useTagEdit.ts:54` defaults the parameter to `"*"`; and
   `api/src/modules/palette/etag.ts:96` returns early on `"*"` (RFC 7232 match-any). The net
   effect is that an **absent** validator silently becomes *"overwrite whatever is there"*
   instead of the `428` the contract promises. The `*` arm is correct HTTP and stays; the
   defect is the client's default, and it is the client's to remove.
3. **The discarded PATCH response.** `TagEditPopover.vue:77` `await tagEdit.saveTags(...)`
   drops the returned palette, so the fresh `currentHash` / `updatedAt` — the next validator —
   is thrown away at the moment it is issued.
4. **The stale `updatedAt` re-cache.** With (3) dropped, `emit("update:tags", updated)`
   (`TagEditPopover.vue:76`) mutates the cached row's *tags* while leaving its pre-PATCH
   `currentHash`/`updatedAt` in place, so the next edit derives its validator from a row the
   server has already moved past.

**Consequence for the operations this wave hardened.** The demo's `revertPalette`
(`demo/palettes/api/versions.ts:34-38`) sends **no** `If-Match` and **no** `Idempotency-Key`,
and `forkPalette` (`:43-51`) sends **no** `Idempotency-Key`. Under §3 both now fail — `428` and
`400` respectively. `demo/palettes/api/*.ts` is in **no** X-W3 unit's writable set (the fold's
§BoundsDelta lists it under *"Not proposed, deliberately"*), so this is returned, not smuggled:
`ESC-W3.3-DEMO-WRITE-CONTRACT`, which fires `W3.md` **§3a**'s named triumvirate trigger
(*"the `Idempotency-Key` requirement (G-10) breaking an existing consumer of
`POST /:slug/fork`"*). The two-line client hunks are banked with it.

## 5. The replay store — CC-039's relaxation, as canon (D-3)

`Idempotency-Key` replay is served by the in-process `LRU` at `platform/cache/lru.ts`
(`idempotency.ts:116-119`; 50 000 entries, 24 h TTL), scoped
`${sessionToken|userSlug|"anon"}:${method}:${path}:${key}` and guarded by a sha256 of the
request body (a same-key different-body replay is `409`).

**CC-039 (DR-33) promised a durable, Mongo-backed replay store and shipped this.** The
relaxation was disclosed only in a source comment. It is written here, in canon, as **the
contract** rather than as a deferred promise:

> **The replay store is per-process.** Its 24-hour window does not survive a restart and does
> not span processes. On the single-replica deployment this API runs
> (`compose.yaml`, one api container), that is exactly equivalent to a durable store for the
> job the key does: collapsing a client's retries of one operation within one burst. It is not
> cross-restart exactly-once delivery, and nothing in this contract claims it is.

**The reopening condition is a DEPLOYMENT FACT, not a wave.** This row reopens **if and only if
a second api replica is deployed** (horizontal scale-out, a blue/green pair serving
simultaneously, or any topology where two processes answer the same route). At that moment the
store must move to shared backing — the collection already implied by CC-039's reference
implementation — because two processes would otherwise hold two disjoint replay windows and a
retry routed to the wrong one would execute twice. Until that deployment exists there is nothing
to build, nothing to schedule, and **no future wave carries this row**. It is closed by being
true, and it becomes untrue only when the deployment changes.

The same statement is carried in the source, beside the store, pointing here
(`idempotency.ts:41-46`), so neither location can drift into being the only one that knows.

## 6. What a write returns (G-11)

`POST /palettes/:slug/revert` answers **`201`** — it creates a release — and the body carries
that release beside the palette's fields:

```
{ …FormattedPalette, "revision": { "hash": <release id>, "revisionNo": n, "payloadHash": …,
                                   "name": …, "colors": […], "paletteSlug": …, … } }
```

The revision rides **beside** the palette fields rather than nesting them, so an existing
consumer reading a `FormattedPalette` keeps reading one. The envelope
(`{ hash: _id, …row, _id: undefined }`) is the one `GET /:slug/versions` and
`GET /:slug/versions/:hash` already emit, and the row is the palette's head — `listVersions`
sorts `{revisionNo: -1, _id: -1}` (X.W3.2, fold **S-6**).

**The payload clause is load-bearing.** Fold **§CrossEdges §B** binds it: X-W7's `VHD-4` cure
(*"the version mutation's one visible result IS the refreshed history"*) is specified to consume
this body. A bare `201` would close G-11 and strand that cure — so the revision is part of the
contract, not a convenience.

## 7. Residuals this contract carries (none of them silent)

| id | what is owed | whose bytes |
|---|---|---|
| `ESC-W3.3-CAS-CALLERS` | pass `expect` + `assertFenceHeld` at the three service writes (§2.2) | `service/crud.ts` · `service/versions.ts` · `service/visibility.ts` |
| `ESC-W3.3-DEMO-WRITE-CONTRACT` | send `If-Match` on revert; send `Idempotency-Key` on revert + fork (§4) | `demo/palettes/api/versions.ts` (+ the §4 deviations 1–4) |
| `ESC-W3.3-REVERT-RETURNS-RELEASE` | `revertToVersion` should RETURN the release it appended; the route reads the head instead (§6) | `service/versions.ts` |
| tag-only fence coverage (§2.1) | a decision about what the ETag covers — recorded, not scheduled | contract-level |
