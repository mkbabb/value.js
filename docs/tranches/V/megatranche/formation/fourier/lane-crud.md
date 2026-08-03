# Lane CRUD — the value↔fourier provenance-union seam census

**Served model id: `claude-opus-5[1m]`**

Census only — no contract designed, no design choices made. Every row carries file:line or a
pasted probe. READ-ONLY on `fourier-analysis`; the only write is this file.

Substrate:
- value.js `tranche-u` @ `c654824e`
- fourier-analysis @ `14d83356` (`git log --oneline -5`, read-only)

---

## §0 — The headline: the pattern was authored ONCE and now survives on ONE side

`fourier-analysis/api/lib/crud/atomdiff.py:1-2` opens:

> "The atom-diff PATTERN — authored once (fourier), adopted twice (value.js twin). … This is a
> shared-by-contract PATTERN (inv-16), NOT a shared package: the value.js twin
> (``lib/crud/atomdiff.ts``) keys over ``PaletteColor[]`` instead of the five config atoms, but the
> algorithm + the wire envelope are identical."

**The value.js twin no longer exists.** Probe:

```
$ grep -rn "atomdiff|atomDiff|AtomDiff" value.js/api/src value.js/src
api/src/modules/palette/__tests__/palettes-forks.test.ts:9: * atom-diff were excised at T.W1 — TA-4 — so the remix/atomDiff wire cases are
```

Sole surviving artifact is a compiled corpse in an untracked build dir:
`value.js/api/dist/lib/crud/atomdiff.js` (+ `.d.ts`, `.map`) — **no `api/src/lib/` directory exists**
(`ls api/src/lib` → `No such file or directory`).

The excision is recorded in-tree at three sites:
- `value.js/api/src/modules/palette/service/forks.ts:34-36` — "the J.W2 remix/atom-diff arm was excised
  at T.W1 (TA-4: the `/remix`+`/diff` write-only apparatus), so fork is now the sole caller and there
  is no `colors`-diff branch to fold."
- `value.js/api/src/modules/palette/hash.ts:41-42` — "(The `/diff` read + the atom-diff algebra that
  once also consumed it were excised at T.W1 — TA-4.)"
- `value.js/api/src/modules/palette/__tests__/palettes-forks.test.ts:9`

**Net:** the union's diff layer exists in production Python on the fourier side and is *rubble* on the
value.js side. The canonical shape doc `J-diff-shape.md` also lives only in fourier
(`fourier-analysis/docs/tranches/J/design/J-diff-shape.md`, 271 lines) — `find value.js/docs -name
'J-diff-shape.md'` returns **nothing**.

---

## §1 — What a "fourier viz object" IS (serialized shape)

Two persisted shapes, both in `fourier-analysis/api/models/visualization.py`.

### 1.1 `Visualization` — the live row (`visualization.py:109-169`), collection `visualizations`

| Field | Line | Note |
|---|---|---|
| `slug: str` | 118 | public handle; unique index (`services/database.py:97`) |
| `owner_slug: str` | 119 | required, non-null — **user provenance** |
| `visibility: "draft"\|"unlisted"\|"public"` | 120, 34 | |
| `content_hash: str` | 121 | dedup/ETag substrate, "never identity" |
| `image_slug: str` | 122 | the subject; NOT an atom |
| `contour_hash: str` | 123 | NOT an atom |
| `active_bases: list[str]` | 125 | **atom 1** |
| `n_harmonics: int` (1..4096) | 126 | **atom 2** |
| `contour_settings: ContourSettings` | 128 | **atom 3** — 12 fields, `models/shared.py:8-62` |
| `animation_settings: AnimationSettings` | 129 | **atom 4** — 6 fields, `models/shared.py:65-71` |
| `animation_data: AnimationData \| None` | 130 | precomputed partial sums; `partial_sums: dict[str, Point2D]` |
| `title` / `description` / `tags` | 132-134 | editorial; NOT atoms |
| `palette_slug: str \| None` | 135 | **atom 5 — AND the existing cross-repo link (see §5)** |
| `set_hash: str = ""` | 145 | atom-set identity = the version key at HEAD |
| `fork_of: str \| None` | 146 | single-parent cross-viz pointer |
| `fork_of_hash: str \| None` | 147 | source HEAD set_hash at remix time |
| `fork_count: int = 0` | 148 | |
| `version_count: int = 1` | 149 | |
| `views` / `likes` / `pinned` / `bytes` | 151-160 | |
| `migrated_from: MigratedFrom \| None` | 164, 87-101 | `{coll, id, was_public}` recoverable provenance marker |
| `deleted_at` | via `SoftDeleteMixin` (109) | soft delete |
| `created_at` / `updated_at` | 166-167 | tz-aware UTC |

`model_config = ConfigDict(extra="forbid")` (169) — closed shape.

Comment at `visualization.py:137-144` states the lineage outright: *"The substrate fourier INHERITS
from value.js's proven ``Palette`` shape."*

### 1.2 `VisualizationVersion` — the immutable snapshot (`visualization.py:217-258`), collection `visualization_versions`

| Field | Line |
|---|---|
| `_id: str` = `f"{viz_slug}:{set_hash}"` | 235 |
| `viz_slug` / `set_hash` / `author_slug` | 236-238 |
| the 5 atoms (`active_bases`, `n_harmonics`, `contour_settings`, `animation_settings`, `palette_slug`) | 241-245 |
| `parent_hash: str \| None` | 248 |
| `forked_from_hash: str \| None` | 249 |
| `root_hash: str` | 250 |
| `depth: int = 0` | 251 |
| **`atom_diff: list[AtomOp]`** | 254 |
| `created_at` | 256 |

Indexes: `[("viz_slug",1),("depth",1)]` and `root_hash` (`services/database.py:132-133`).

### 1.3 Wire response twins (hand-typed, `visualization.py:299-371`)

`DiffResponse{from_hash,to_hash,ops,identical}` (299-310) · `ProvenanceNode` (313-323) ·
`ForkCrumb` (326-337) · `ProvenanceResponse{chain,fork_breadcrumb}` (340-348) ·
`VersionEntry{set_hash,depth,author_slug,atom_diff,created_at}` (351-360) ·
`VersionsResponse{viz_slug,versions}` (363-371).

---

## §2 — THE SEAM TABLE

Legend: **EXISTS** = shipping code, file:line. **PARTIAL** = present but structurally limited (defect
named). **ABSENT** = probe returned nothing.

### R-1 · Base version + derived variants

| | fourier-analysis | value.js `api/src` |
|---|---|---|
| Verdict | **EXISTS** | **EXISTS** |
| Base row | `Visualization` `models/visualization.py:109-169` | `Palette` `modules/palette/model.ts:53-78` |
| Variant pointer | `fork_of` :146, `fork_of_hash` :147 | `forkOf` :74, `forkOfHash` :75 |
| Variant counter | `fork_count` :148 | `forkCount` :76 |
| HEAD identity | `set_hash` :145 (atom-set) | `currentHash` :72 (content-hash of name+colors) |
| Variant write | `POST /{slug}/remix` `routers/visualizations.py:488-612` | `POST /:slug/fork` `routes/forks.ts:19`, svc `service/forks.ts:42-140` |
| **Divergence** | remix = fork **+ a required atom change** (no-op → 422 `urn:contract:remix-noop`, `visualizations.py:536-542`) | fork = **verbatim copy**; `colors = source.colors` `forks.ts:64`; no delta required |

fourier's own comment names the asymmetry: *"the fourier tightening over value.js's verbatim-copy
fork"* (`visualizations.py:497`).

### R-2 · Git-like chains

| | fourier | value.js |
|---|---|---|
| Verdict | **PARTIAL — chain is root-only** | **EXISTS (deepens), but two structural defects** |
| Chain fields | `parent_hash`/`root_hash`/`depth` `visualization.py:248-251` | `parentHash`/`rootHash`/`depth` `model.ts:90,96,97` |
| Depth math | `_write_root_version` hard-codes `parent_hash=None, root_hash=set_hash_value, depth=0` (`visualizations.py:138-141`) | walks the parent, `rootHash = parent.rootHash ?? parentRef`, `depth = parent.depth + 1` (`service/versions.ts:46-58`) |
| Write sites | **2** — create `visualizations.py:220`, remix `:592` (both root) + 1 migration `scripts/migrate_visualization_forks.py:129` | **4** — create `service/crud.ts:119`, patch `crud.ts:205`, fork `service/forks.ts:116`, revert `service/versions.ts:148` |

**fourier defect F-α — the version chain never deepens.** Probe:
```
$ grep -rn "_write_root_version" api/
api/routers/visualizations.py:110:  (def)
api/routers/visualizations.py:220:  (create)
api/routers/visualizations.py:592:  (remix)
```
That is the *only* writer (`grep -rn "visualization_versions" api/ --include='*.py' | grep -v tests`
returns 1 insert at `:146`, 2 finds, 1 find_one, plus the migration script and 2 index calls). Every
`VisualizationVersion` in fourier has `depth == 0` and `parent_hash is None`. `GET /{slug}/versions`
(`:860-889`) sorts by `depth` over a set that is always a singleton. The within-viz "chain" is a
one-element list; all real lineage is carried cross-viz by `fork_of`.

**fourier defect F-β — PATCH mutates an atom without touching `set_hash` or the chain.**
`VisualizationUpdate` includes `palette_slug` (`visualization.py:207`), and `palette_slug` is atom 5
(`lib/crud/atomdiff.py:34`). The PATCH handler does a bare `$set`
(`visualizations.py:381-383`) with no `set_hash` recompute and no version write. Because
`_head_set_hash` returns the *stored* value when non-empty (`visualizations.py:477-480`), the viz's
advertised `set_hash` goes **stale** relative to `enumerate_atoms(doc)` after any palette rebind — and
`/diff` + `/provenance` then report that stale hash. (Adjacent: `updates = {… if v is not None}` at
`:381` means PATCH can never *clear* `palette_slug` to null.)

**value.js defect V-α — revert writes no version row but still increments the counter.**
`revertToVersion` (`service/versions.ts:121-181`) computes
`newHash = computeContentHash(version.name, version.colors)` (`:137`). The stored `version._id` was
computed by the *same* expression at creation (`:38`). So `newHash === version._id` always. It then
calls `createVersionRecord` (`:148`), whose first act is `findByHash(hash)` → found → `return hash`
**before any insert** (`:40-44`). Meanwhile the palette update runs `$inc: { versionCount: 1 }`
unconditionally (`:172`). **Net:** a revert bumps `versionCount`, records no author attribution, adds
no `depth`, and leaves `versionCount` permanently drifted from the true row count. No test asserts
otherwise — the version suite's only revert case is
`"revertToVersion throws NotFoundError on missing palette"` (`__tests__/palette-versions.test.ts:83`).

**value.js defect V-β — `PaletteVersion._id` is GLOBAL, so chains collide across palettes.**
`_id` is the content-hash of `(name, colors)` alone (`model.ts:85-86`; `hash.ts:8-17` — the canonical
JSON folds only `name` + `colors`, never `paletteSlug`). `findByHash` filters `{_id: hash}` with no
slug scope (`repository/paletteVersion.ts:13-15`), and `insertIfAbsent` returns early on a hit
(`:44-47`). Two palettes with identical `(name, colors)` therefore share one version row — whose
`paletteSlug` names only the *first* — so the second palette's `findByPaletteSlug`
(`repository/paletteVersion.ts:17-28`) returns `[]` and its history is empty.

fourier **already solved this** and documents the exact tension at `visualization.py:221-226`:
> "two *different* vizzes that share an atom-set … never collide (which a bare global
> ``_id = set_hash`` would — the §2.3-vs-§11 tension, resolved here toward the per-viz
> ``{viz_slug, depth}`` filter the read endpoints need)."

fourier's `_id` is the compound `f"{viz_slug}:{set_hash}"` (`visualization.py:235`, `:129`).

### R-3 · Diff support

| | fourier | value.js |
|---|---|---|
| Verdict | **EXISTS** | **ABSENT (excised T.W1/TA-4)** |
| Algorithm | `lib/crud/atomdiff.py:123-145` `diff_atoms()` | ABSENT — `grep -rn "atomdiff\|atomDiff" api/src src` → 1 comment hit only |
| Op type | `AtomOp{op,atom_key,before,after}` `atomdiff.py:46-61` | ABSENT |
| Op vocabulary | `"added"\|"removed"\|"changed"` `atomdiff.py:56` | ABSENT |
| Atom enumeration | `enumerate_atoms()` `atomdiff.py:76-99` | ABSENT |
| Per-atom hash | `atom_hash()` `atomdiff.py:102-109` (16-hex) | **EXISTS** `computeAtomHash` `hash.ts:26-32` (sha256) |
| Set hash | `set_hash()` `atomdiff.py:112-120` | **EXISTS** `computeAtomSetHash` `hash.ts:44-49` |
| Stored edge | `atom_diff: list[AtomOp]` `visualization.py:254` | **ABSENT** — `PaletteVersion` `model.ts:84-98` has **no** diff field |
| Wire route | `GET /{slug}/diff` `routers/visualizations.py:799-852` | **ABSENT** — no `/diff` in `routes/` (full route grep, §4) |
| Envelope | `DiffResponse{from_hash,to_hash,ops,identical}` `visualization.py:299-310` | ABSENT |
| ETag | `"<from>:<to>"` + `immutable, max-age=31536000` `visualizations.py:841-851` | n/a |

value.js retains the *hashing half* of the pattern (`computeAtomHash`, `computeAtomSetHash`) and
still emits `atomSetHash` on the wire envelope (`format.ts:45`, `:87`) — but the algebra that
consumed it is gone. `hash.ts:41-42` says so explicitly.

**Contract asymmetry already booked but unexecuted:** `J-diff-shape.md §2.3` (line 50) mandates
`fromHash`/`toHash`; §4's casing table (line 134-135) maps those to Python `from_hash`/`to_hash`.
fourier's `DiffResponse` conforms (`from_hash`/`to_hash`). §2.5 (line 75) mandates the value.js path
`lib/crud/atomdiff.ts` — which is exactly the file T.W1 excised. The doc's close-gate (§6) assumes
both probes exist; value.js's side cannot run.

Also note fourier's `/diff` is **not a general two-point diff**: `on_chain` is only
`{head_hash} ∪ {fork_of_hash}` (`visualizations.py:827`), so the endpoint answers exactly one
question — "the recorded remix delta" — and 404s any other pair (`:828-831`). It reads the *stored*
`atom_diff` (`:822-823`); it never recomputes.

### R-4 · Trie-like compression of variants

| | fourier | value.js |
|---|---|---|
| Verdict | **ABSENT** | **ABSENT** |

Probe (both trees):
```
$ grep -rni "trie|prefix.tree|radix|patricia|structural.sharing|dedup.*subtree|delta.compress" \
    fourier-analysis/api fourier-analysis/web/src value.js/api/src value.js/src
```
Zero true hits on either side. Every returned line was `Object.entries`, `_CONNECT_RETRIES`/
`maxRetries`, `total_entries`, or the prose "Tries three tiers" (`fourier/api/routers/equations.py:33`).

What exists *instead* of compression, on both sides, is **whole-snapshot duplication**: fourier's
`VisualizationVersion` stores all 5 atoms in full (`visualization.py:241-245`) — including the entire
12-field `ContourSettings` and 6-field `AnimationSettings` sub-objects — on every version row.
value.js's `PaletteVersion` stores the full `colors: PaletteColor[]` array (`model.ts:88`). Neither
shares structure between a parent and its child; a variant that changes one integer re-persists the
whole bag.

Both sides also carry an explicit KISS guardrail *against* tree structure —
`atomdiff.py:12-14`: *"the atoms are a flat BAG (not a tree / Merkle / document); the diff is a
whole-atom replace …; there is no three-way / DAG / merge."*

**This is the single requirement with no material on either side.** It is a greenfield build, and it
runs against a documented standing constraint.

### R-5 · Remixing

| | fourier | value.js |
|---|---|---|
| Verdict | **EXISTS (full)** | **PARTIAL (fork only; remix arm excised)** |
| Route | `POST /{slug}/remix` `routers/visualizations.py:488-612` | `POST /:slug/fork` `routes/forks.ts:19-52` |
| Request body | `VisualizationRemix` `visualization.py:271-291` — per-atom overrides | `{name?, slug?}` only — `service/forks.ts:19-24` |
| Override merge | source HEAD ∪ body overrides `visualizations.py:511-528` | none (verbatim copy `forks.ts:64`) |
| Tri-state field | `palette_slug` via `model_fields_set` `visualizations.py:522-528` (omit=inherit / null=clear / slug=rebind) | ABSENT |
| Delta recorded | `atom_ops = diff_atoms(...)` → stored `:535`, `:592-596` | ABSENT |
| No-op guard | 422 `urn:contract:remix-noop` `:536-542` | ABSENT (a fork is always a duplicate) |
| Child born | `visibility=body.visibility`, default `"draft"` (`visualization.py:277`) | **hard-coded `visibility: "public"`** `forks.ts:76` |
| Atomicity | **no transaction** — ordered idempotent sequence, `:492-497`, `:554-600` | **`withTransaction`** `forks.ts:94-137`, with in-txn source re-read `:99-105` |
| Idempotency | `idempotency.replay_or_record(...)` `:612` | ABSENT on fork |

Two hard divergences to note as raw material: **(a)** a fourier remix child is born `draft`, a
value.js fork child is born `public` — opposite privacy defaults on the same verb; **(b)** fourier
runs no transaction by deliberate choice ("standalone-topology-honest", `:493`) while value.js's fork
is transactional. Both are shipping.

### R-6 · Version history

| | fourier | value.js |
|---|---|---|
| Verdict | **PARTIAL (list is root-only)** | **EXISTS (list + get + revert)** |
| List | `GET /{slug}/versions` `visualizations.py:860-889` — depth-sorted, **≤50, no cursor** (F-11: string `_id` breaks ObjectId cursors, `:862-863`) | `GET /:slug/versions` `routes/versions.ts:25-41` — offset/limit paginated, limit ≤100 (`:31`), `total` returned |
| Get one | ABSENT (no by-hash route) | `GET /:slug/versions/:hash` `routes/versions.ts:43-47` |
| Revert | **ABSENT** — `grep -rni "revert" api/ --include='*.py'` → 1 hit, unrelated prose in `scripts/migrate_visualization.py:14` | `POST /:slug/revert` `routes/versions.ts:49-68` + `service/versions.ts:121-181` (owner-gated `requireOwnership`, transactional) — **but see defect V-α** |
| Provenance walk | `GET /{slug}/provenance` `:733-791` — returns **BOTH** `chain` (within-viz) and `fork_breadcrumb` (cross-viz), each ≤50, cycle-guarded, ETag'd | `GET /:slug/provenance` `routes/forks.ts:72` + `service/forks.ts:181-222` — **only** the cross-viz `forkOf` walk, ≤50, cycle-guarded |
| List forks | `GET /{slug}/forks` `:686-725` — **cursor**-paginated + `Link: rel=next` | `GET /:slug/forks` `routes/forks.ts:54` + `service/forks.ts:147-161` — **offset**-paginated |
| Ordering | `depth` ascending | `createdAt` **descending** (`repository/paletteVersion.ts:24`) |

**Privacy divergence in the provenance walk (worth flagging as material):** value.js redacts.
`ProvenanceStep` is a discriminated union (`service/forks.ts:171-179`) whose non-public hops collapse
to `{kind:"unavailable", ordinal}` carrying *only* an ordinal — "No raw document or lineage field
(userSlug, contentHash, createdAt, parent slug) ever crosses the wire for a non-public hop"
(`forks.ts:167-169`, tagged V·W45 item 4). fourier's breadcrumb applies **no such redaction**: it
walks `fork_of` with a bare `find_one` (`visualizations.py:784`) and emits `slug`, `set_hash`,
`author_slug`, `created_at` for every ancestor — including private/draft ones — because
`_readable_or_none` is applied only to the *entry* row (`:744`), never to the ancestors.

### R-7 · User provenance

| | fourier | value.js |
|---|---|---|
| Verdict | **EXISTS** | **EXISTS** |
| Row owner | `owner_slug: str` **required non-null** `visualization.py:119` | `userSlug: string \| null` — **nullable** `model.ts:60` |
| Version author | `author_slug: str` `visualization.py:238` | `authorSlug: string` `model.ts:93` |
| Attribution on write | always (`owner_slug` from session; anonymous create → 401, `visualizations.py:166-169`) | **conditional** — `if (userSlug)` guards the version write at `crud.ts:119`, `crud.ts:204`, `versions.ts:147`; an unattributable edit mutates the palette and writes **no** version row |
| User doc | `UserDocument` `models/session.py:52-63` — `_id` = user_slug, `created_at`, `last_seen_at`, `status` | `User` `modules/session/model.ts:121-127` — `_id: UserSlug` (branded), `createdAt`, `lastSeenAt`, `status` |
| Session doc | `SessionDocument` `models/session.py:42-49` — `_id` = **plaintext UUIDv4 token** (docstring :43) | `Session` `modules/session/model.ts:103-115` — `_id` = **SHA-256 digest** of the token (`hashSessionToken` :66-67, U-F38) |
| TTL | 30 days (`models/session.py:5-6`) | 30 days — `SESSION_TTL_MS` `model.ts:81`, cited as the cross-repo contract "CRUD-CONTRACT §6: `session_ttl_days = 30`" |

Session-token-at-rest is the one place value.js is strictly ahead: fourier persists the raw token as
`_id`, value.js persists only its digest.

---

## §3 — Collections inventory

| fourier (`api/services/database.py`) | value.js (`platform/db/collections.ts:27-37`) |
|---|---|
| `visualizations` (17 indexes, `:97-126`) | `palettes` |
| `visualization_versions` (2 indexes, `:132-133`) | `palette_versions` |
| `sessions`, `users`, `gallery`, `snapshots` (legacy), assets/images | `votes`, `sessions`, `proposed_names`, `tags`, `flags`, `admin_audit`, `users` |
| | **9 collections total** (`collections.ts:9-19`) |

fourier's provenance-relevant indexes (`database.py:124-126`, `:132-133`):
`fork_of` (sparse) · `[visibility, fork_count, _id]` · `[fork_of, visibility, created_at, _id]` ·
`[viz_slug, depth]` · `root_hash`.

---

## §4 — Route inventory (the API surface both sides expose)

**fourier `/api/visualizations`** — 13 routes, `api/routers/visualizations.py`
(`grep -n "^@router\."`): `POST ""` :164 · `GET /{slug}` :244 · `GET ""` :287 · `PATCH /{slug}` :350 ·
`DELETE /{slug}` :400 · `POST /{slug}/restore` :430 · **`POST /{slug}/remix` :488** ·
`POST /{slug}/publish` :669 · `POST /{slug}/unpublish` :675 · `GET /{slug}/forks` :686 ·
**`GET /{slug}/provenance` :733** · **`GET /{slug}/diff` :799** · **`GET /{slug}/versions` :860**

Other fourier routers (`api/main.py:105-111`): `images`, `contours`, `equations`, `sessions`,
`gallery` (`/api/gallery`, `routers/gallery.py:29`), `admin`.

**value.js `/palettes`** — 16 routes across 6 concern-routers (`modules/palette/routes/`,
mounted `routes/index.ts:33-38`):
`GET /` · `GET /mine` · `GET /:slug` · `POST /` · `PATCH /:slug` · `DELETE /:slug` (crud.ts:37,47,62,73,106,150) ·
`GET /:slug/versions` · `GET /:slug/versions/:hash` · **`POST /:slug/revert`** (versions.ts:25,43,49) ·
`POST /:slug/fork` · `GET /:slug/forks` · `GET /:slug/provenance` (forks.ts:19,54,72) ·
`POST /:slug/publish` · `POST /:slug/unpublish` (publish.ts:54,60) ·
`POST /:slug/vote` (votes.ts:17) · `POST /:slug/flag` (flags.ts:15)

**Route-level union gap:** fourier has `/diff` + `/restore`; value.js has `/revert` +
`/versions/:hash` + `/vote` + `/flag`. Neither has the other's.

---

## §5 — The ONE cross-repo link that already exists (and it is one-directional)

`Visualization.palette_slug: str | None` (`models/visualization.py:135`) is a **soft reference to a
value.js palette**. It is simultaneously atom 5 of the diff bag (`lib/crud/atomdiff.py:34`).

`routers/visualizations.py:530-533` states the constraint verbatim:
> "NOTE (F-02): ``palette_slug`` is a SOFT/optional reference — fourier owns no ``palettes``
> collection (palettes live in the value.js service, inv-16), so it cannot FK-validate the slug. A
> dangling palette degrades the render, not the data model; the binding is recorded verbatim."

25 references to `palette_slug` across fourier's non-test Python
(`grep -rn "palette_slug" api --include='*.py' | grep -v tests | wc -l` → `25`), plus the web types
(`web/src/lib/types.ts:229,253,261,286,361`).

**The reciprocal is ABSENT.** Probe:
```
$ grep -rni "fourier|visualization|vizSlug" value.js/api/src
platform/http/errors/index.ts:26  (prose — cites the cross-repo CRUD contract path)
platform/http/errors/index.ts:34  (prose)
modules/palette/service/visibility.ts:47  (prose — "Contrast fourier, whose flat enum…")
```
Three prose comments, zero fields, zero routes. `Palette` (`model.ts:53-78`) carries **no** viz
pointer. The union today is a one-way string with no integrity guarantee on either end.

---

## §6 — Vocabulary + enum divergences (mechanical, but they are the seam's friction)

| Concept | fourier | value.js |
|---|---|---|
| Visibility enum | `draft` \| `unlisted` \| `public` (`visualization.py:34`) | `public` \| `unlisted` \| `private` (`model.ts:19`) |
| Transition guard | forbids exactly `public→draft` (`visualization.py:42-49`) | none (`service/visibility.ts:47` notes the contrast) |
| Curation | `pinned: bool` + gallery `tier` | `tier: standard\|featured\|archived` (`model.ts:22`) |
| Casing | snake_case | camelCase — the *only* allowed envelope difference per `J-diff-shape.md §4:140` |
| Atom key type | 5 string literals (`atomdiff.py:37-39`) | stop `position: number` (`J-diff-shape.md:88,95`) |
| Version `_id` | compound `{viz_slug}:{set_hash}` | bare global content-hash |
| Soft delete | `deleted_at` via `SoftDeleteMixin` | `deletedAt: Date \| null` (`model.ts:68`), 30-day grace |
| Pagination | opaque cursors (`lib/crud/cursors.py`) + `Link` header | offset/limit + `total` (`platform/http/pagination.ts`) |
| Verb name | `remix` | `fork` |

---

## §7 — Raw-material summary

**Reusable as-is (fourier is the reference implementation):** the `AtomOp` shape and its
`added`/`removed`/`changed` vocabulary; `diff_atoms` / `atom_hash` / `set_hash`; the compound
per-entity version `_id`; the `parent_hash`/`root_hash`/`depth`/`forked_from_hash` quadruple; the
stored-`atom_diff`-on-the-edge idea; the two-walk provenance response (`chain` + `fork_breadcrumb`);
the immutable-ETag diff cache; the `J-diff-shape.md` contract doc itself (271 lines, already
repo-neutral, already binding both sides on paper).

**Reusable as-is (value.js is ahead):** revert as a verb; version-get-by-hash; the redacting
`ProvenanceStep` union; cross-collection `withTransaction` discipline; hashed-session-token-at-rest;
the branded `SessionToken`/`UserSlug` nominal types.

**Must be built from nothing:** trie-like variant compression (R-4) — zero material on either side,
and both sides carry an explicit anti-tree KISS guardrail (`atomdiff.py:12-14`).

**Must be restored before value.js can participate in a diff contract:** `lib/crud/atomdiff.ts` and
`atomDiff` on `PaletteVersion` — both excised at T.W1/TA-4.

**Defects the union will inherit if not addressed (census-observed, none newly introduced by me):**
F-α root-only chain · F-β PATCH staleness + unclearable `palette_slug` · F-γ unredacted fourier
breadcrumb · V-α revert no-op + `versionCount` drift · V-β global version `_id` collision ·
V-γ nullable `userSlug` ⇒ silently unversioned edits.
