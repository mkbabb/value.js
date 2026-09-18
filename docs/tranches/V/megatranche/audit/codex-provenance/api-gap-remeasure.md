# M2 re-measurement — the nine API policy classes against `api/src` at HEAD

**Auditor:** Claude (Opus 5), provenance-ledger row 11 (**VERIFY-THEN-ADOPT**), commissioned under M-21.
**Subject:** the one Codex RED matrix that measures real product — API policy **0/9**.
**HEAD:** `0b4566db5a108a3576cf9aaacb3f3f56395b8d22` (branch `tranche-u`).
**Posture:** read-only. One file written (this one). No source edit, no git mutation, no `~/.codex` mutation.
**Live probe:** local API at `127.0.0.1:3000` answered `GET /`, `/health` (`mongo: ok`), `/openapi.json`
(44 mounted path rows, generated from the live route registry per V·W45 item 6). Read-only GETs only.
The local Mongo is empty (`GET /palettes` → `{"data":[],…}`), so no cross-object runtime probe was
possible without writes; every verdict below rests on source bytes.

---

## 0. Provenance of the denominator — where "nine" actually comes from

`red-matrices.md §11.3` spot-checks **five** claims. The full nine are enumerated once, in a Codex
formation doc, and they are **operation classes**, not defect classes:

| Cited by | Path | Content |
|---|---|---|
| the nine, enumerated | `~/.codex/worktrees/7e28/value.js/…/formation/NON-PARSER-LIBRARY-API-DAG-CLOSURE-2026-07-30.md:139-151` | §5.1 "Nine policy operation classes" — a 9-row table |
| the policy matrix | `…/formation/API-POLICY-V-API-01-2026-07-29.md:55-124` | route-policy table + §4 "current defects and terminal dispositions" |
| the defect prose | `docs/tranches/V/megatranche/coordination/VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:143-164` | the "API closure" bullets (6 defects + 1 meta) — **in-repo** |
| the `0/9` fraction | `…/formation/VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md:32,50` | `NP08` / "API policy classes 9/9 specified" |

**The target is genuinely owner-rooted, and I verified the root in-repo:**

- `docs/tranches/V/DECISIONS.md:36` — **D9** verbatim: *"Palette visibility is `private | public`; owner
  lifecycle is `active | trashed`; admin moderation is separately clocked `clear | withdrawn`. The unused
  `unlisted` state dies. Non-owner reads require active/public/moderation-clear and a visible immutable
  release."*
- `docs/tranches/V/vnext/api-contract.source.json` — 177,551 bytes, on disk, **88 `service: "value"` HTTP
  operations**. I parsed it: it contains `POST /api/palettes/{slug}/forks` (`value.fork.create`,
  `idempotencyKey: "required-process-local"`, success **201**), `GET …/revisions`,
  `GET …/revisions/{revisionNo}`, `GET …/revisions/{from}/diff/{to}`,
  `POST …/revisions/{revisionNo}/revert` (`etag: "required-strong-if-match"`,
  `idempotencyKey: "required-process-local"`, success **201**), and `GET …/provenance`
  (`authority: "policy-read"`). **The target routes are not a Codex invention — they are in the repo.**

The one target element I could **not** root in owner authority is the *eighth library offering* `./path`
(see X-5). Everything else traces to D9–D13 or to the vnext contract.

---

## 0.1 Verdict table

| # | Class | Codex claim | Verdict at HEAD | Wave-ready? |
|---|---|---|---|---|
| 1 | detail `GET /palettes/{slug}` | existence/deletion only; no viewer or visibility | **VERIFIED-GAP** (worse than claimed — a live disclosure defect) | **YES — P0** |
| 2 | fork create | singular `/fork`; public child; existence-only source auth | **VERIFIED-GAP** | **YES** |
| 3 | fork list | filters `deletedAt` only | **VERIFIED-GAP** | **YES — P0** |
| 4 | provenance | ungated; hop leakage | **CHANGED** — redaction half CLOSED (V·W45 item 4); authorize-target-first still open | partial |
| 5 | revision list | ungated | **VERIFIED-GAP** (but palette-scoped — the "global" half does not apply) | YES |
| 6 | revision detail | `/versions/:hash` ignores the route slug; global hash read | **VERIFIED-GAP** (cross-object read) + **CONTESTED** on the rename | YES (semantics), NO (rename) |
| 7 | revision diff | absent | **VERIFIED-GAP by absence** | YES |
| 8 | revision revert | body-hash, `200`, no revision-number/CAS/idempotency | **VERIFIED-GAP** — and it admits a **cross-object content transplant** the intake did not name | **YES — P0** |
| 9 | Admin policy | route-local repository access; no audited branch | **CHANGED** — actor identity + audit landed (U-F40); explicit policy branch still absent | partial |
| X-1 | `computeContentHash` ≠ `payloadHash` | omits semantic fields + domain/length framing | **VERIFIED-GAP** | YES |
| X-2 | stored `forkCount` as public authority | cannot stay truthful under viewer filtering | **VERIFIED-GAP** | YES |
| X-3 | PATCH TOCTOU / no CAS | acknowledges the window instead of fencing it | **VERIFIED-GAP** | YES |
| X-4 | `/versions` rail is `PRUNE` | current APIs use `/versions` | **CHANGED — CONTESTED**; owner ruling D55 says KEEP | **NO — needs a ruling** |
| X-5 | 7-not-8 exports | the eighth offering `./path` is absent | **CHANGED** — count literally true; the 8-target is unsourced and **contradicts D3** | **NO — needs a ruling** |
| X-6 | `unlisted` dies (D9) | (not in the nine; D9's own text) | **VERIFIED-GAP** | YES |

**Score at HEAD: 9 VERIFIED-GAP · 4 CHANGED · 0 CLOSED.** Every one of the five §11.3 citations replays
byte-exact at HEAD (`forks.ts:19`, `service/forks.ts:76,84`, `hash.ts:8-17`, `collections.ts:42`,
`format.ts:38,74`, `package.json` exports = 7). The Codex measurement was honest. Its *disposition* on
two rows (X-4, X-5) has since been overtaken by owner rulings it could not have known about.

---

## 1. Class 1 — detail · `GET /api/palettes/{slug}`

**Claim.** Target: resolve slug → immutable `paletteId`; centralized object policy; hidden target `404`;
owner-visible trashed lifecycle `410` only *after* authorization. Current: `getPaletteBySlug(slug)` is
existence/deletion only, with no viewer and no visibility.

**Current bytes.** `api/src/modules/palette/service/crud.ts:44-69`:

```ts
export async function getPaletteBySlug(services, slug, currentUserSlug): Promise<FormattedPalette> {
    const doc = await services.repositories.palettes.findBySlug(slug);
    if (!doc) throw new NotFoundError("Palette not found");
    if (doc.deletedAt !== null && doc.deletedAt !== undefined) throw new GoneError(…);
    …
    return result;              // ← no `visibility` predicate anywhere on this path
}
```

`currentUserSlug` is consumed **only** to set `result.voted` (`:60-64`). The route
(`api/src/modules/palette/routes/crud.ts:62-70`) adds a strong ETag and nothing else. `isActivePublic`
exists at `service/visibility.ts:31-38` but has exactly one caller — the provenance walk
(`service/forks.ts:201`).

**Verdict: VERIFIED-GAP — and materially worse than the claim.** The list surface *is* visibility-filtered
(`service/crud-list.ts:107-116` forces `visibility: "public"` for anyone not querying their own
`userSlug`), so `private` palettes are correctly absent from browse — but **any anonymous caller holding
the slug reads a `private` palette in full**, including `userSlug`, `currentHash`, and every color. The
`410` for a trashed palette is likewise emitted *before* any ownership check, so it is a live
existence oracle for a non-owner. This is the API-side twin of the unenforced `meta.admin` route guard
(`red-matrices.md §11.2` finding 2) and belongs in the same P0 group.

**X-wave cure (one line):** introduce one `assertReadable(doc, viewer)` policy predicate in
`service/visibility.ts`, call it in `getPaletteBySlug` before formatting, and make the `410` arm
owner-only (non-owner trashed → `404`).

---

## 2. Class 2 — fork create · target `POST /api/palettes/{slug}/forks`

**Claim.** (a) route is singular `/fork`; (b) creates a **public** child; (c) stores/increments
`forkCount`; (d) target requires authenticated caller, a **private** child, transaction-time source
**reauthorization**, and a required process-local `Idempotency-Key`, returning 201.

**Current bytes.**

| Sub-claim | Byte | Reading |
|---|---|---|
| singular route | `api/src/modules/palette/routes/forks.ts:19` `forksRouter.post("/:slug/fork", …)` | **true**; live `/openapi.json` confirms `POST /palettes/{slug}/fork` and **no** `POST …/forks` |
| public child | `api/src/modules/palette/service/forks.ts:76` `visibility: "public",` | **true** |
| stored fork-count | `service/forks.ts:84` `forkCount: 0,` and `:129` `await …palettes.incrementForkCount(sourceSlug, session);` | **true** |
| 201 | `routes/forks.ts:51` `return c.json(formatPalette(palette), 201);` | already correct |
| auth | `routes/forks.ts:21-25` throws `AuthenticationError` when session/userSlug absent | already correct |
| in-txn recheck | `service/forks.ts:99-105` re-reads `findBySlug(sourceSlug, session)` and 404s if gone | **existence only** — no visibility, no moderation, no ownership |
| idempotency | `api/src/platform/http/idempotency.ts:92-99` — header absent ⇒ `await next()` unconditionally | **opt-in**, never required |

**Verdict: VERIFIED-GAP** on every limb. The pre-flight source read (`service/forks.ts:50-51`) is
existence-only too, so **a private palette can be forked by any authenticated stranger who knows the
slug** — and the fork is born `public`, publishing the private source's colors under a new slug. That
consequence is not stated in the intake; it follows directly from class 1 + class 2 composing.

**X-wave cure:** rename to `POST /:slug/forks`, call the class-1 `assertReadable` at both the pre-flight
and in-transaction source reads, set the child `visibility: "private"`, and gate the route on a required
`Idempotency-Key`.

---

## 3. Class 3 — fork list · `GET /api/palettes/{slug}/forks`

**Claim.** Target: source policy, then **every child independently filtered**; no stored public
`forkCount` authority. Current: `listForks` filters `deletedAt` only.

**Current bytes.** `api/src/modules/palette/service/forks.ts:147-161` calls straight through to
`api/src/modules/palette/repository/palette.ts:69-83`:

```ts
findForksOf(slug, skip, limit) {
    return this.col.find({ forkOf: slug, deletedAt: null })…   // :71 — no visibility, no viewer
}
countForksOf(slug, session?) {
    return this.col.countDocuments({ forkOf: slug, deletedAt: null }, …)   // :79-82
}
```

The route (`routes/forks.ts:54-70`) applies no policy and formats every row with the full
`formatPalette` envelope.

**Verdict: VERIFIED-GAP.** `GET /palettes/{slug}/forks` is a general **private-palette enumeration
oracle**: every private child of any public palette is returned in full to an anonymous caller. Combined
with class 2 (forks are born public) the blast radius today is small; the moment class 2 is cured to
private children, this becomes the leak. Both must land in the same wave.

**X-wave cure:** filter the fetched page through the class-1 `assertReadable` per child and derive
`total` from the filtered join, not `countForksOf`.

---

## 4. Class 4 — provenance · `GET /api/palettes/{slug}/provenance`

**Claim.** Target: authorize the target **first**, then redact each unavailable hop without hiding a
still-readable child.

**Current bytes.** `api/src/modules/palette/service/forks.ts:171-222`. The redaction half is
**implemented**, and well:

```ts
export type ProvenanceStep =
    | { kind: "palette"; ordinal: number; slug: string; name: string; isFork: boolean }
    | { kind: "unavailable"; ordinal: number };          // :171-179
…
if (isActivePublic(doc)) { chain.push({ kind: "palette", … }) }   // :201-208
else { chain.push({ kind: "unavailable", ordinal }); }            // :209-215
```

A non-public hop emits **only its ordinal** — no slug, no `userSlug`, no hash, no `createdAt`. The walk
continues upward past a hidden hop (`:217-218`), so a readable ancestor above a hidden one still
appears. A purged ancestor (`:195-199`) is indistinguishable from a hidden one. There is no existence
oracle: an unknown slug yields the same `[{kind:"unavailable",ordinal:0}]` as a private one.

**Verdict: CHANGED.** The hop-redaction limb — the part the intake actually complained about — was
**cured at V·W45 item 4** and post-dates the Codex reading. Two limbs remain open:
(i) the **target is never authorized first**, so the endpoint is callable on any slug; (ii) there is no
owner arm — an owner walking their own private lineage sees `unavailable` for their own palettes.

**X-wave cure:** call the class-1 `assertReadable(target, viewer)` before the walk, and pass `viewer`
into the per-hop predicate so an owner's own hops resolve.

---

## 5. Class 5 — revision list · target `GET /api/palettes/{slug}/revisions`

**Claim.** Target: object policy **plus per-release authorization for every item**. Current: ungated.

**Current bytes.** `api/src/modules/palette/routes/versions.ts:25-41` → `service/versions.ts:86-97` →
`repository/paletteVersion.ts:17-32`:

```ts
findByPaletteSlug(paletteSlug, skip, limit) { return this.col.find({ paletteSlug })… }   // :22-27
```

No authentication, no ownership, no visibility, no per-item check. The route emits every version's full
`{name, colors, authorSlug, parentHash, forkedFromHash, rootHash, depth}`.

**Verdict: VERIFIED-GAP** on the policy limb. One correction to the intake's framing: the *list* is
correctly **palette-scoped** (`{ paletteSlug }`) — the "global hash lookup" complaint applies to classes
6 and 8, not here. So the defect is purely "ungated", not "global". Today this means the **entire edit
history of a private palette (every intermediate color set + author slug) is readable anonymously.**

**X-wave cure:** gate the route on the class-1 target predicate and add a per-item release check before
formatting.

---

## 6. Class 6 — revision detail · target `GET …/revisions/{revisionNo}`

**Claim.** Target: `(paletteId, revisionNo)` local membership + per-release policy. Current: `/versions`
route identity, `GET /:slug/versions/:hash` **ignores the route slug**, and a global
`getVersionByHash` service export exists.

**Current bytes.** `api/src/modules/palette/routes/versions.ts:43-47`:

```ts
versionsRouter.get("/:slug/versions/:hash", async (c) => {
    const hash = c.req.param("hash");                       // :44 — `slug` is read nowhere
    const version = await getVersionByHash(c.var.services, hash);   // :45
    return c.json({ hash: version._id, ...version, _id: undefined });
});
```

`service/versions.ts:99-106` is the global export the target forbids
(*"no service exports a global `getVersionByHash`/`getRevisionByHash`"*), and it resolves through
`repository/paletteVersion.ts:13-15` `findOne({ _id: hash })` — a pure global content-hash lookup.
Membership identity **is** payload identity: `model.ts:85-86` `/** _id is the content-hash. */`.
`grep -rn "revisions" api/src` returns **zero** non-test hits.

**Verdict: VERIFIED-GAP on the semantics — CONTESTED on the rename.**
- *Semantics:* `GET /palettes/A/versions/<hash-belonging-to-palette-B>` returns palette B's full content
  under palette A's URL. Confirmed by reading, not run (empty local DB). Real cross-object read.
- *Rename:* the `/versions` → `/revisions/{revisionNo}` route-identity change is contested — see X-4.

**X-wave cure:** scope the read to `(paletteSlug, hash)` at the repository and delete the global
`getVersionByHash` export; the numeric-revision rename rides a separate owner ruling.

---

## 7. Class 7 — revision diff · target `GET …/revisions/{from}/diff/{to}`

**Claim.** Target: both local memberships and both release policies authorized; 200.

**Current bytes.** **The route does not exist.** `routes/index.ts:13-19` enumerates the mounted
sub-routers (`crud`, `versions`, `forks`, `publish`, `votes`, `flags`) and no diff path appears in any
of them. The live `/openapi.json` has no `diff` row. `service/forks.ts:34-36` records why:

> *"the J.W2 remix/atom-diff arm was excised at T.W1 (TA-4: the `/remix`+`/diff` write-only apparatus)"*

The primitives survive: `hash.ts:26-32` `computeAtomHash`, `hash.ts:44-49` `computeAtomSetHash`
(exposed on every envelope as `atomSetHash`, `format.ts:87`).

**Verdict: VERIFIED-GAP by absence.** Honest gap; the target names an operation the product deliberately
retired. The wave should confirm the *demand* before rebuilding — T.W1 excised `/diff` precisely because
it was write-only apparatus with no consumer.

**X-wave cure:** either add `GET /:slug/versions/:from/diff/:to` over the surviving atom-hash primitives
with both memberships policy-checked, or record a decision that the diff class is retired.

---

## 8. Class 8 — revision revert · target `POST …/revisions/{revisionNo}/revert`

**Claim.** Current revert is body-hash based, returns `200`, and lacks the target revision-number, CAS,
and idempotency contract.

**Current bytes.**

| Requirement | Byte | State |
|---|---|---|
| route identity | `routes/versions.ts:49-52` `versionsRouter.post("/:slug/revert", requireOwnership(paletteOwnerExtractor), …)` | `/revert`, not `/revisions/{n}/revert` |
| addressing | `routes/versions.ts:63` `hash: parsed.data.hash` (body) | body-hash, not numeric revision |
| status | `routes/versions.ts:66` `return c.json(formatPalette(palette));` | **200**, target is **201** |
| ownership | `require-ownership.ts:29-42` — 401 / 404 / 403 | **satisfied** |
| strong `If-Match` | no `assertIfMatch` call on this route (`etag.ts:37-51` is called only from `routes/crud.ts:122` and `routes/publish.ts:39`) | **absent** — no 428, no 412 |
| `Idempotency-Key` | `platform/http/idempotency.ts:92-99` opt-in | **not required** |
| CAS `matchedCount === 1` | `grep -rn matchedCount api/src` → **one hit, in `color/repository/proposedName.ts:79`**; `repository/palette.ts:107-115` `update()` discards the result | **absent everywhere in the palette domain** |
| local membership | `service/versions.ts:131-135` — `findBySlug(slug)` then `findByHash(hash)`, **unjoined** | **absent** |

**Verdict: VERIFIED-GAP on all seven limbs — plus one defect the intake did not name.** Because
`service/versions.ts:134` resolves `hash` globally with no `paletteSlug` join, **an owner of palette A can
revert A to a version belonging to palette B**, transplanting B's name and colors into A
(`:162-175` `$set: { name: version.name, colors: version.colors, … }`). `requireOwnership` gates the
*target* palette only; the *source* revision is unowned. This is a cross-object content transplant
reachable by any authenticated user who knows any content hash — and content hashes are handed out
freely by class 5 (`versions.ts:36` returns `hash: v._id` for every row) and class 1 (`currentHash` on
every detail envelope). **This is the sharpest single finding in the re-measurement.**

**X-wave cure:** join the revision read to the addressed palette (`{ _id: hash, paletteSlug: slug }` →
404 otherwise), require strong `If-Match` + `Idempotency-Key`, and return 201 with the appended revision.

---

## 9. Class 9 — Admin policy · explicit operation-specific admin routes

**Claim.** Target: an audited policy branch; never ownership impersonation, never repository bypass.
Current (`API-POLICY §4`): *"route-local Admin repository access — bypasses object/release policy."*

**Current bytes.** Three things have landed since the target was authored:

1. `api/src/modules/admin/auth.ts:37-57` — one `adminAuth` middleware, `timingSafeEqual` bearer compare,
   503 / 401 / 403, mounted once on the admin sub-app.
2. `auth.ts:35` `export const ADMIN_ACTOR_SLUG = "system:admin";` set on `c.var.adminActor` (`:55`) — the
   U-F40 resolvable actor identity, so a bearer-only op no longer audits as `undefined`.
3. Every admin mutation emits a typed audit row: `admin/service/palettes.ts:48-51`, `:79`.

Routes themselves are thin and do **not** touch repositories: `admin/routes/palettes.ts:18-41` calls only
`setFeatured` / `deletePalette` from `admin/service/palettes.ts`. The **services** reach the repository
directly (`admin/service/palettes.ts:34-35`, `:59,64`), composing no palette-domain policy predicate.

**Verdict: CHANGED.** The *route-local repository access* the target names is **CLOSED** — routes call
services. The *explicit audited policy branch* is **half-closed**: audit + actor identity exist; an
operation-specific authorization branch does not, and the admin service still bypasses the (nonexistent)
palette policy kernel. Note also `/openapi.json` shows the live admin surface is **17 operations**, none
of which appear in `vnext/api-contract.source.json` (its 88 value ops carry no `admin` path) — so the
admin class has **no operation-level target**, only the API-POLICY prose. That is a formation gap, not a
source gap.

**X-wave cure:** thread the class-1 policy predicate through the admin services as an explicit
`ADMIN-POLICY` branch, and author the missing admin operation rows in the vnext contract.

---

## 10. Cross-cutting claims named in the intake

### X-1 — `computeContentHash` is not the target `payloadHash` · **VERIFIED-GAP**

`api/src/modules/palette/hash.ts:8-17` at HEAD:

```ts
export function computeContentHash(name: string, colors: PaletteColor[]): string {
    const canonical = JSON.stringify({
        name: name.trim().toLowerCase(),
        colors: colors.map((c) => ({ css: c.css.trim().toLowerCase(),
                                     position: Math.round(c.position * 1e6) / 1e6 })),
    });
    return createHash("sha256").update(canonical).digest("hex");
}
```

Target (`NON-PARSER-LIBRARY-API-DAG-CLOSURE-2026-07-30.md:180-190`):
`SHA-256( ASCII("value.js/palette-revision-payload/v1") || 0x00 || uint64be(len) || bytes )`.

Current omits: the domain-separation prefix, the `0x00` separator, the `uint64be` length frame, and
`PaletteColor.name` (the per-atom label — folded into `computeAtomHash` at `:26-32` but **not** into
`computeContentHash`, so two palettes differing only in color labels collide). It also lowercases `name`,
which is a semantic-identity choice, not a canonicalization. And because this same hash is the
`palette_versions._id` (`service/versions.ts:61`), payload identity **is** membership identity —
`API-POLICY §6` explicitly separates them.

**Cure:** add the domain/length framing + `name`, and split `payloadHash` (bytes) from `releaseHash`
(event: paletteId + revisionNo + parent + author + policy facts).

### X-2 — stored `forkCount` as public authority · **VERIFIED-GAP**

Stored: `model.ts:76`. Written: `service/forks.ts:84` (`0` on the child), `:129` (`$inc` on the parent),
`service/crud.ts:261-266` (decrement on soft-delete). Exposed: `format.ts:38,74`. Sortable:
`service/crud-list.ts:80` `most-forked`. The decrement is floor-gated
(`repository/palette.ts:184-192` `{ slug, forkCount: { $gt: 0 } }`), and `setForkCount`
(`repository/palette.ts:212-224`) exists precisely because a delete→restore round-trip inflated the
counter — the drift the target predicts is already documented in-source at `:204-211`.

**Cure:** compute `forkCount` as an indexed join over viewer-filtered children at format time; keep the
stored field only as a sort key with an explicit "approximate" contract.

### X-3 — PATCH TOCTOU / no CAS · **VERIFIED-GAP**

`routes/crud.ts:113-123` is an explicit self-disclosure:

> *"`patchPalette` performs no in-txn ETag re-validation, so a concurrent write between this read and the
> service write is not fenced — an accepted narrow TOCTOU window (ledger #16)."*

Repeated at `service/ownership.ts:33-37`. The write (`repository/palette.ts:107-115`) is
`updateOne({ slug }, update)` with the result discarded — the predicate never carries the ETag and
`matchedCount` is never asserted anywhere in the palette domain. `routes/publish.ts:28-40` carries the
identical window. The `If-Match` machinery itself is correct where used (`etag.ts:37-51`: 428 absent,
412 mismatch, `*` honored).

**Cure:** carry `currentHash`/`updatedAt` into the `updateOne` filter and assert `matchedCount === 1`,
mapping 0 to 412.

### X-4 — the `/versions` rail · **CHANGED — CONTESTED, needs an owner ruling**

The Codex target rules `/versions`, hash-keyed detail, and the `200` revert arm **terminal PRUNE**
(`NON-PARSER-LIBRARY-API-DAG-CLOSURE:161-163`). Two **in-repo, later, owner-side** authorities disagree:

- `docs/tranches/V/PALETTE-CONTRACT.md:71-72` lists
  `GET /palettes/:slug/versions` · `GET /palettes/:slug/versions/:hash` and
  `POST /palettes/:slug/revert` as *"immutable-release history (the right-sized release concept — RF-24
  item 1)"* — i.e. as the **target**, not the legacy.
- `docs/tranches/V/DECISIONS.md:83` — **D55(i)**, W45 close: *"`versions`/`versions/:hash`/`revert`
  KEPT as the right-sized immutable-release surface — PALETTE-CONTRACT §1 … outrank the Work-prose
  'retire' line; only the drifted `/restore` died."*

Meanwhile `vnext/api-contract.source.json` (also in-repo, also cited by D-authority) specifies
`/revisions/{revisionNo}`. **Two in-repo targets disagree on route identity.** The *semantic* defects
(cross-object read, cross-object revert, no CAS, no numeric addressing) are real under either target and
are wave-ready today; the *rename* is not.

**Cure:** an owner ruling reconciling `PALETTE-CONTRACT.md:71-72` (+D55) with
`vnext/api-contract.source.json`; until then, fix semantics under the current paths.

### X-5 — 7-not-8 library exports · **CHANGED — the count is true, the target is not owner-rooted**

`package.json` `exports` at HEAD is exactly `./color ./value ./css ./easing ./math ./transform
./quantize` — **7**, with no `.` root key and no `main`/`module`/`types`. `src/transform/path.ts` exists.
So the intake's measurement (`…AUDIT-2026-08-02.md:125-134`) is literally correct.

But the **8-offering denominator has no owner root.** `docs/tranches/V/DECISIONS.md:32` — **D3**:

> *"The broad `@mkbabb/value.js` root export is removed. Sole entries are `/color`, `/value`, `/css`,
> `/easing`, `/math`, `/transform`, `/quantize`."*

`grep` of `DECISIONS.md` finds no `./path` offering anywhere. D3 enumerates **seven and calls them
sole**. The current export map is therefore **exactly D3-conformant**; the `0/8` framing measures against
a target Codex introduced. This row does not belong in an API-policy matrix at all — it is library
packaging, not palette policy.

**Cure:** none as a gap. If `./path` is genuinely wanted, it needs a new decision amending D3 — file it
as a proposal, not a RED cell.

### X-6 — `unlisted` still alive · **VERIFIED-GAP** (D9's own text; not one of the nine)

`api/src/modules/palette/model.ts:19`
`export const PALETTE_VISIBILITIES = ["public", "unlisted", "private"] as const;` — the three-state enum
survives, documented as canonical at `:61` and `format.ts:27`, with live branches at
`platform/migrations/check.ts:58` and prose at `service/visibility.ts:7,29`, `service/forks.ts:165,210`.
D9 (`DECISIONS.md:36`) rules *"The unused `unlisted` state dies."*

**Cure:** narrow the enum to `["public","private"]`, add the separate `moderation: clear | withdrawn`
clock D9 requires, and migrate any at-rest `unlisted` rows to `private`.

---

## 11. What changed between the Codex reading and HEAD

Two rows moved, both **toward** the target and both **before** the Codex reading — Codex simply did not
credit them:

1. **Provenance hop redaction** (class 4) landed at **V·W45 item 4** (`service/forks.ts:163-179,209-215`).
   The `ProvenanceStep` union is a correct implementation of the target's redaction invariant.
2. **Admin actor identity + audit** (class 9) landed at **U-F40** (`admin/auth.ts:35,53-55`;
   `admin/service/palettes.ts:48-51,79`), and admin routes no longer reach repositories directly.

Nothing regressed. No `api/src` byte changed as a result of any Codex RED matrix — consistent with
`red-matrices.md §12.2` ("zero product deltas").

---

## 12. Wave readiness

**Ready now, no ruling needed (8 rows).** Classes 1, 2, 3, 5, 6 (semantics), 7, 8, 9 (policy branch);
plus X-1, X-2, X-3, X-6. These have an owner-rooted target (D9 / D11 / D13 / the vnext contract) and a
measured current-byte gap.

**Blocked on an owner ruling (2 rows).**
- **X-4** — route identity `/versions` vs `/revisions/{revisionNo}`: `PALETTE-CONTRACT.md:71-72` + D55
  vs `vnext/api-contract.source.json`. Two in-repo targets, direct conflict.
- **X-5** — the eighth offering `./path`: contradicts D3. Not an API gap; re-file or drop.

**Suggested wave ordering** (each row's cure names the prior row's artifact, so the order is forced):

| Wave | Content | Why here |
|---|---|---|
| **X.A1 — policy kernel** | one `assertReadable(doc, viewer)` in `service/visibility.ts`; wire into classes 1, 4, 5; owner-only `410` | every other cure calls this predicate |
| **X.A2 — membership join** | scope revision reads + revert to `(paletteSlug, hash)`; delete the global `getVersionByHash`; split `payloadHash` from `releaseHash` (X-1) | closes the two cross-object transplants (6, 8) |
| **X.A3 — write contract** | strong `If-Match` + required `Idempotency-Key` + `matchedCount === 1` on revert / PATCH / publish (X-3); revert → 201 | needs A2's membership key in the filter |
| **X.A4 — fork closure** | `/forks` rename, private child, both-boundary source auth, viewer-filtered fork list, computed `forkCount` (X-2) | classes 2 + 3 must land together or the private-child fix opens the class-3 leak |
| **X.A5 — enum + diff** | `unlisted` death + moderation clock (X-6); the diff class (7) or a decision retiring it | independent; safe to trail |

**Two P0s for the same wave as the frontend `meta.admin` guard finding:** class 1 (anonymous private-
palette read) and class 8 (cross-object content transplant). Class 3 is P0 the moment class 2 is cured.

---

*Row 11 complete. One file written. No source edit, no git mutation, no `~/.codex` or `~/Documents/Codex`
mutation. Live API touched with read-only GETs (`/`, `/health`, `/openapi.json`, `/palettes?limit=3`) only.*

---

## ADJUDICATION ADDENDUM (session root, M-22 delegated judgment, 2026-08-03)

The two blocked-on-a-ruling rows are RULED:

- **X-4 — `/versions` vs `/revisions/{revisionNo}`: `/versions` STANDS.** `PALETTE-CONTRACT.md:71-72`
  and D55 are ruled, owner-era authorities; `vnext/api-contract.source.json` is FROZEN-AS-INHERITED
  under M-15 (absorbed item-by-item by ruling, never by drift) and its rename is hereby NOT
  absorbed — RETIRED with rationale: the rename buys no capability, no consumer requests it, and
  the no-legacy law forbids the alias/dual-path a migration would smuggle. The class-6 rename
  contest resolves the same way.
- **X-5 — the `0/8` export denominator: DROPPED.** The current export map is exactly D3-conformant
  (`DECISIONS.md:32`: seven subpaths, sole); the eighth was Codex-introduced and is not API
  policy. The row retires; no D3 amendment is warranted.

Standing consequence: the 12 wave-ready rows + the X.A1..X.A5 cure ordering (policy kernel →
membership join → write contract → fork closure → enum+diff) enter `registry/CARRY-CUT-LEDGER.md`
at its next promotion pass; classes 1 and 8 are P0 and ride with the frontend `meta.admin` guard
finding in the same X-wave.
