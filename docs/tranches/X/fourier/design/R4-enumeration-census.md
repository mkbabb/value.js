SERVED MODEL: claude-opus-5[1m]

# R-4 — THE PERSISTENCE-SURFACE ENUMERATION CENSUS

**Wave**: X.F.W7 (Track C · X·F) · **unit**: `X.F.W7.a` · **dated 2026-09-19** · spec
`docs/tranches/X/fourier/waves/F-W7.md` §9 `X.F.W7.a` · §3 item 1 · §6 gates **G-F7-2** and
**G-F7-10** · §5a N-1 / §5b N-2 · §2a row 2.

**What this file is.** The enumerated persistence surface of both trees, in four classes, replacing
R-4's six-term term-query as founding evidence (**G-F7-2**), and the measured statement of the
guardrail's bilaterality at today's bytes (**G-F7-10**).

**What this file is NOT.** It is **read-only measurement**. It authors **no design byte** — the owner
ruled **AGAINST** at COHESION §0j.D (`F-TRIE`), `design/R4-variant-storage.md` is never created, and
§2a admits this file precisely because *"it is measurement, not design"*. It **books zero** registry
rows, mints none into F.W7's empty column, sizes **no** saving, and claims credit for **no** cure it
did not author. Every consequence below that is already adjudicated is **cited by banked id** and
booked at zero.

---

## §0 — The instrument, declared before it is used

### §0.1 Toolchain pin and base map

Every ⟨cmd⟩ below executes under `bash` with **BSD `/usr/bin/grep`**, the pinned binary (F-W7 §0(A)):
no `-P`, no `\K`, no lookaround, no `.{n,m}` with m > 255. Word boundaries are written
`[[:<:]]` / `[[:>:]]`, which the pin supports and `\b` does not portably.

| base | path | access |
|---|---|---|
| `V` | `/Users/mkbabb/Programming/value.js` | read-only for product source; this file is the only byte this unit creates besides its wave-record receipt |
| `F` | `/Users/mkbabb/Programming/fourier-analysis` | **READ-ONLY, ALWAYS** — zero fourier bytes written by this wave |
| `R` | `$V/docs/tranches/V/megatranche/registry/adjudicated` | the frozen 66 `fr-*.md` (immutable, §2a) |
| `S` | `$F/docs/tranches/F` | F.W0's `SUBSTRATE-LEDGER.md` (read, never re-performed) |

**Reading rule.** Inside a markdown table cell every pipe is escaped `\|`; a reader un-escapes `\|` →
`|` before running. A pipe appears in a pattern here only as an ERE alternation or a shell pipeline.

### §0.2 D-19 — the anchor frame, quoted from F.W0 and never re-performed

§7b's **D-19** lock forbids citing any anchor as live pre-F.W0. This census quotes F.W0's published
re-grounding and performs **no re-resolution of its own**.

⟨cmd⟩ (base `$S`) `/usr/bin/grep -o 'Dated 2026-09-17. Substrate: fourier .8bc7736.; producer glass-ui read at .v8.0.0^{commit}. =' SUBSTRATE-LEDGER.md`
→ *"Dated 2026-09-17. Substrate: fourier `8bc7736`; producer glass-ui read at `v8.0.0^{commit}` ="*
— **§2.1 G-11, the corrected anchor table.**

⟨cmd⟩ (base `$S`) `/usr/bin/grep -o 'This is the ONE table; every later X·F wave \*\*quotes\*\* it and re-performs no' SUBSTRATE-LEDGER.md`
→ *"This is the ONE table; every later X·F wave **quotes** it and re-performs no"* (the sentence wraps
in the source; the next line completes it as `re-resolution of its own`).

⟨cmd⟩ (base `$S`) `/usr/bin/grep -o 'Dated 2026-09-17, substrate .8bc7736.' SUBSTRATE-LEDGER.md`
→ *"Dated 2026-09-17, substrate `8bc7736`"* — **§2.2 G-12, the corrected-denominator table**, whose
own standing instruction is ⟨cmd⟩ `/usr/bin/grep -o 'Every later X·F wave \*\*cites this table\*\* and never a' SUBSTRATE-LEDGER.md`
→ *"Every later X·F wave **cites this table** and never a"* (wraps; completes as `challenge file`).

**And the two facts that decide how this census may cite a fourier `api/` coordinate at all.**

1. **G-11 does not re-resolve the api/py coordinates — it says so itself.** ⟨cmd⟩ (base `$S`)
   `/usr/bin/grep -o 'RECORD (api/py coordinates are outside F.W0.s bounds)' SUBSTRATE-LEDGER.md` →
   *"RECORD (api/py coordinates are outside F.W0's bounds)"* — §2.1.3's row 5 state cell. Every
   fourier anchor this census needs is in `api/`, i.e. **outside** the table that re-resolved the
   frontend drift.
2. **OG-F1 made the WORKTREE the baseline, and narrowed G-11 to drift-correction.** ⟨cmd⟩ (base `$S`)
   `/usr/bin/grep -o 'Under \*\*FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE\*\*, G-11 is \*\*drift-correction only\*\*' SUBSTRATE-LEDGER.md`
   → *"Under **FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE**, G-11 is **drift-correction only**"*
   (§2.1.4).

**So the lawful frame is: measure the worktree, and prove the worktree has not moved from the substrate
G-11 is dated at.** That second half is a fact, not an argument, and it is the strongest D-19
discharge available — the anchors are simultaneously the ruled baseline **and** unmoved from F.W0's
substrate:

⟨cmd⟩ `git -C $F diff --name-only 8bc7736 HEAD -- api/ \| /usr/bin/grep -c .` → **0** (double-run:
`0` · `0`). The **entire fourier `api/` surface this census cites is byte-identical between F.W0's
published substrate `8bc7736` and today's `21e11b0d`.** Nothing was re-resolved; an identity was
measured.

⟨cmd⟩ `git -C $F status --porcelain \| /usr/bin/grep -c .` → **0** · ⟨cmd⟩
`git -C $F rev-parse --short=8 HEAD` → **`21e11b0d`** · ⟨cmd⟩ `git -C $F rev-parse --short=8 8bc7736`
→ **`8bc7736a`**.

**Value side.** ⟨cmd⟩ `git -C $V rev-parse --short=8 HEAD` → **`3a36c78a`** (branch `tranche-u`) ·
⟨cmd⟩ `git -C $V status --porcelain -- api/ src/ demo/ test/ e2e/ \| /usr/bin/grep -c .` → **0**
(double-run) — **every value-side product anchor below is a committed-HEAD anchor, not a working-tree
one.** The two dirty paths in the value repo (`docs/tranches/V/reformation/CARRY-LEDGER.md`,
`scripts/dev/dev.sh`) are a sibling seat's and the standing unowned row; neither is product source and
neither is cited here.

### §0.3 Units, declared beside every figure (G-12 §2.2.1's law)

⟨cmd⟩ (base `$S`) `/usr/bin/grep -o 'A figure without its unit is not a denominator, it is a number' SUBSTRATE-LEDGER.md`
→ *"A figure without its unit is not a denominator, it is a number"*. Three units are used below and
each appears beside its figure: **raw grep-lines** (`… \| grep -c .`), **enumerated census rows**
(rows of the §2 tables, counted from the settled bytes of this file), and **distinct string set**
(`sort -u`).

### §0.4 Registry-first, discharged before a single consequence is graded

⟨cmd⟩ (base `$S`) `/usr/bin/grep -o 'Before any seat files a finding, counts a budget or grades a severity, it sweeps the adjudicated' SUBSTRATE-LEDGER.md`
→ *"Before any seat files a finding, counts a budget or grades a severity, it sweeps the adjudicated"*
(G-12 §2.2.0; wraps, completing as `registry for the identity`).

Swept, and the sweep is why the `share-hit consequence` column below cites banked ids instead of
minting findings: ⟨cmd⟩ (base `$R`) `/usr/bin/grep -rln "content_hash" .` → `fr-AdminFlaggedPanel.md` ·
`fr-GalleryDraftsSection.md` · `fr-GalleryFeaturedCarousel.md` · `fr-GalleryInfiniteGrid.md` ·
`fr-GalleryView.md`. Every content-hash consequence this census measures on the fourier side already
has a banked home — **FR-AFP-7**, **FR-AFP-66**, **B-2**, **FR-GV-1**, **K-3 ⊕ C-2**, **B-4**,
**m-15** — and is cited, never re-booked.

---

## §1 — Method: why an enumeration and not a query

**S-8's law, from the frozen corpus at the record's own case** — ⟨cmd⟩ (base `$R`)
`/usr/bin/grep -n -F 'an absence-proof must enumerate the surface, not query one name for it' fr-AdminAuditLog.md`
→ `:126`, verbatim: **"an absence-proof must enumerate the surface, not query one name for it"**.
Co-signed at **K-13** (`fr-GalleryAdminBanner.md:90`), where *"Not in the corpus"* died against 26
occurrences in 17 files.

**The four classes, defined so the enumeration is falsifiable** (a class definition a later seat can
re-run is the difference between a census and a list):

| # | class | membership test |
|---|---|---|
| 1 | **version writers** | every site that persists a row into a version/history collection, **or** moves an entity's head pointer at one |
| 2 | **asset writers** | every site that persists **bytes** — a blob, a file, a thumbnail, a points payload — rather than a config document |
| 3 | **cache keys** | every key under which a computed or stored result is looked up **for reuse**, plus every key that gates a write on a prior result |
| 4 | **hash folds** | every function that reduces a value to a digest used as an identity, a key, or a validator |

**The enumeration primitive is the WRITE and the KEY, never the word.** Membership was established by
enumerating every persistence primitive in both trees and then reading each site — ⟨cmd⟩ (base `$V`)
`/usr/bin/grep -rnoE '\.(insertOne\|insertMany\|updateOne\|updateMany\|replaceOne\|findOneAndUpdate\|findOneAndReplace\|bulkWrite\|deleteOne\|deleteMany\|createIndex)\(' api/src --include='*.ts'`
and ⟨cmd⟩ (base `$F`)
`/usr/bin/grep -rnoE '\.(insert_one\|insert_many\|update_one\|update_many\|replace_one\|find_one_and_update\|find_one_and_replace\|bulk_write\|delete_one\|delete_many)\(' api --include='*.py'`
— plus the collection registries (`$V/api/src/platform/db/collections.ts`, `$F/api/services/database.py`)
and the index declarations, which name every key the store is asked to enforce. **No row below was
found by searching for "trie", "sharing", "radix" or any other word for the concept.**

---

## §2 — THE CENSUS

Row shape, as §9 specifies: `tree · site · keyed-on · scope · share-hit consequence`.
**V** = value.js at `3a36c78a` · **F** = fourier at `21e11b0d` (≡ F.W0's `8bc7736` over `api/`, §0.2).

### §2a — Class 1: VERSION WRITERS

| tree | site | keyed-on | scope | share-hit consequence |
|---|---|---|---|---|
| **V** | `api/src/modules/palette/service/versions.ts:50` `createVersionRecord` → `repository/paletteVersion.ts:83` `insertIfAbsent` (`:92` `insertOne`) | `_id` = `computeReleaseHash{paletteSlug, revisionNo, payloadHash, parentHash, forkedFromHash, authorSlug}` (`hash.ts:119`) | **per-palette — the slug is INSIDE the digest** | a re-entrant write of the **same release event** is a no-op; two releases of the **same payload** are **two rows**. **No cross-palette share is reachable through this key.** ⟨*The scoping is X-W3's work, not F.W7's: `hash.ts:60-63` states it in source — "before X-W3, payload identity WAS membership identity (`_id` was this hash), which made every version row a content-addressed door between palettes — the defect G-6 closes." **FR-GIG-5 / F-W5 §0b: F.W7 books ZERO of it.** It is recorded because §5c's `V-β ≡ E1` witness is measured against these bytes, not because this wave authored anything.*⟩ |
| **V** | the four call sites of `createVersionRecord`: `service/crud.ts:137` (create) · `service/crud.ts:230` (content-changing PATCH) · `service/versions.ts:202` (revert) · `service/forks.ts:136` (fork) | as above | as above | **every one persists `colors: PaletteColor[]` IN FULL** (`model.ts` `PaletteVersion.colors`). **No structural sharing parent→child at any of the four.** This is R-4's whole-snapshot duplication, measured and unchanged |
| **V** | palette HEAD pointer — `service/crud.ts:120` (create) · `service/crud.ts:217` (`$set.currentHash`) · `service/forks.ts:95` · `service/versions.ts:231` (revert) · `admin/service/import.ts:58` (writes `null`) | `Palette.currentHash` = `computeContentHash(name, colors)` (`hash.ts:70`) | per-palette **document field** | a **pointer**, not a shared row: two palettes may carry the same `currentHash` and share **no** row. The value at rest is a payload digest, and `service/versions.ts:45` records in source that it is "therefore no longer an `_id`" |
| **F** | `api/routers/visualizations.py:110` `_write_root_version` → `:146` `visualization_versions.insert_one` | `_id` = `f"{viz_slug}:{set_hash}"` (`:129`; declared at `api/models/visualization.py:235`) | **per-visualization compound** — the slug is the key's prefix | `DuplicateKeyError` → `pass` (`:147-148`): re-inserting the same *(viz, atoms)* is an idempotent no-op. **No cross-viz share is reachable.** The row stores **all five atoms in full** — `api/models/visualization.py:241-245`, ⟨cmd⟩ (base `$F`) `/usr/bin/sed -n '241,245p' api/models/visualization.py` → `active_bases` · `n_harmonics` · `contour_settings` · `animation_settings` · `palette_slug` — including the **12-field** `ContourSettings` and the **6-field** `AnimationSettings` (`api/models/shared.py:8` and `:65`, field rosters enumerated at §2e) |
| **F** | `api/scripts/migrate_visualization_forks.py:129` | same compound `_id` | same | the one-off migration writer; same key shape, no additional sharing seam |
| **F** | visualization HEAD/config document — `api/routers/visualizations.py:219` and `:587` (`visualizations.insert_one`) · `:268`, `:383`, `:657` (`update_one`) | `slug` (unique index, `api/services/database.py:97`) beside a **PLAIN** `content_hash` index (`:98`) | per-viz document | `content_hash` folds **only** `{image_slug, contour_hash, sorted(active_bases), n_harmonics}` (`api/routers/visualizations.py:83`) — **not** `contour_settings`, `animation_settings` or `palette_slug` — so two visualizations differing only in those three atoms carry the **same** `content_hash`, and the plain index admits both. The deliberate contrast is `flags`' compound `unique=True` (`database.py:140`). **Banked: `fr-GalleryDraftsSection` B-2 ⊕ `fr-GalleryView` FR-GV-1 (≡ F-W5 §2 clause E5); the collision's downstream consumers are banked at `fr-AdminFlaggedPanel` FR-AFP-7 (slug-labelled dismiss is a hash-scoped `delete_many`, `admin.py:219`) and FR-AFP-66. F.W7 cites all four and books NONE** |

### §2b — Class 2: ASSET WRITERS

| tree | site | keyed-on | scope | share-hit consequence |
|---|---|---|---|---|
| **V** | — **∅, BY ENUMERATION** (see §2b.1) | — | — | there is no asset-sharing seam on the value tree because there is no asset writer |
| **F** | `api/services/image_storage.py:86` `store_image_asset` → `:189` `images.insert_one` | `sha256` of the uploaded bytes (unique index, `api/services/database.py:50`) | **GLOBAL — unscoped by owner, session or slug** | a hit returns the **first uploader's** document (`:105`) and the second upload never gets a row of its own; the hit branch regenerates the thumbnail and `$set`s `thumbnail_uri`/`thumbnail_content_type` on the **existing** doc (`:124-127`) at the **first uploader's** slug. A content-addressed read route is published on the same key: `GET /by-hash/{sha256}` (`api/routers/images.py:117`) |
| **F** | `api/services/image_storage.py:120` — the thumbnail **file** write, `(_blob_dir() / f"{slug}.thumb").write_bytes(...)` | `image_slug` (the first uploader's) | per-slug filesystem path, **unversioned** | the serving route is `GET /{imageSlug}/thumbnail` (`api/routers/images.py:149`) under `Cache-Control: public, max-age=86400` (`:164`), so the regeneration the dedup-hit branch **deliberately performs** is invisible to a client for 24 h. **Banked: m-15 (`fr-GalleryDraftsSection.md:80`), whose wave-side duty R4-10 assigns to F-W5 at clause §C2, and which is CROSS-REFERENCED with F-4, never merged (§7b). F.W7 books none of it** |
| **F** | `api/services/image_storage.py:285` `store_contour_asset` → `:328` `contours.update_one(..., upsert=True)` | `contour_hash` = sha256 of the **ordered** `(x, y)` pair list (`:269`; unique index `database.py:59`) | **GLOBAL — unscoped by `image_slug`**, though `image_slug` is a stored field with its own index (`database.py:61`) | the write is `{"$setOnInsert": <every field but last_accessed_at>, "$set": {"last_accessed_at": now}}`: **a hit touches the timestamp and updates NOTHING else**, so `image_slug`, `source`, `image_bounds` and `extraction_cache_key` keep the **first** writer's values. The fold is order-discriminating by construction (`:269-282`), so a hash hit **is** byte-identical points. **Banked: `fr-ContourEditorCanvas` K-3 ⊕ C-2 (≡ F-W5 §2 clause E17) — the share-hit that skips work is that BLOCKER's own mechanism, and K-3's upsert arm is banked KILLED (§7b: never revived). F.W7 cites; books none** |
| **F** | `api/scripts/migrate_image_blobs.py` | one-off blob relocation | — | a migration writer; introduces no new sharing key |

#### §2b.1 — The value tree's asset class is ∅, and the ∅ is ENUMERATED, not asserted

S-8 is satisfied only by an enumeration, so the absence is published as one — three independent
enumerations of the whole surface, each of which would have had to contain an asset writer:

1. **The collection registry.** ⟨cmd⟩ (base `$V`) `/usr/bin/sed -n '27,37p' api/src/platform/db/collections.ts`
   → the typed `Collections` interface: `palettes` · `paletteVersions` · `votes` · `sessions` ·
   `proposedNames` · `tags` · `flags` · `adminAudit` · `users`. **Nine collections, every one a
   config/document collection; none holds bytes.** The module's own docstring states it is *"the
   SINGLE place where `db.collection(\"<name>\")` is allowed"*, so the registry **is** the population.
2. **The primitives.** ⟨cmd⟩ (base `$V`)
   `/usr/bin/grep -rniE "gridfs\|writeFile\|createWriteStream\|multipart\|formData\|[^a-z]blob[^a-z]\|bucket\.\|putObject\|upload" api/src --include='*.ts' \| /usr/bin/grep -v __tests__`
   → **no output, exit 1** (double-run: exit 1 · exit 1). **Not one byte-writing primitive exists in
   the value API.** ⟨*Instrument disclosure, in G-11 §2.1.3's own idiom. This seat's first pass ran the
   same probe with `s3` in the alternation and read its **four** hits as evidence; all four were the
   substring `S3` inside the prose token `CS3.2` (`platform/http/idempotency.ts:21`, `:103`, `:169`;
   `platform/http/errors/index.ts:119`) — the exact substring-artefact class §3.1 convicts, committed by
   the census's own instrument. The term is dropped and the probe above is the one published, because a
   two-character term that matches a contract row-id is noise, not a storage primitive.*⟩
3. **The routes.** ⟨cmd⟩ (base `$V`)
   `/usr/bin/grep -rhoE '\.(get\|post\|patch\|put\|delete)\("[^"]*"' api/src/modules --include='*.ts' \| /usr/bin/sed 's/.*(//' \| sort -u \| /usr/bin/grep -c .`
   → **43** (unit: distinct route-path string literals; double-run `43` · `43`). Read whole, **not one
   of the 43 accepts or returns a binary body.**

**The finding is a finding, not a gap** (the `F-MAIL-∅` idiom, KF-W1 §5 C-14): value.js persists no
assets, so three of the four classes carry its whole persistence surface. Any R-4 design premised on
an asset-sharing symmetry between the trees is premised on something that does not exist.

### §2c — Class 3: CACHE KEYS

| tree | site | keyed-on | scope | share-hit consequence |
|---|---|---|---|---|
| **V** | `api/src/platform/http/idempotency.ts:126` `scopedKey` (built at `:132`), store at `:116` | `${sessionToken\|userSlug\|"anon"}:${method}:${path}:${Idempotency-Key}`, **plus** a separately-stored `bodyHash` = sha256 of the raw request body (`:165`, field at `:105`) | per-identity **×** per-method **×** per-path **×** per-key; in-process `LRU`, 24 h TTL, cap 50 000 | HIT **and** same body-hash → the stored `{status, body, headers}` is replayed **verbatim** and the handler never runs. HIT **and different** body-hash → **409** (`:173`), never a wrong replay. **The key is not superset-closed on its own; closure is achieved by storing the body digest and turning a mismatch into a CONFLICT.** That is one of exactly two shapes available to any sharing key — widen the key, or refuse the hit — and it is the shipped counter-example to the assumption that a cache key must contain everything it depends on |
| **V** | `api/src/platform/http/rate-limit.ts:44` (`lru.setWithExpiry`, `:52`) | client IP | per-process, per-limiter, one window TTL | a share-hit **is** the intended semantic (counting); **no result is reused**, so no work is skipped |
| **V** | `api/src/modules/session/resolve.ts:30` `suspendedCache` (`:40` read, `:45` write) | `session.userSlug` | per-process, 60 s TTL | a hit skips the suspension re-read for ≤ 60 s: a **stale un-suspension** is served for that window. No content is shared between users |
| **V** | `api/src/modules/palette/etag.ts:28` `paletteETag`, `:56` `paletteETagFilter` | `currentHash ?? updatedAt.toISOString()` | per-palette | **not a reuse cache — a WRITE PREDICATE** (X-W3 · G-8). Its own limitation is disclosed in source (`:50-54`): a tag-only PATCH leaves `currentHash` unchanged, so two concurrent tag-only writes carry the same ETag and the fence admits both. Recorded here because an identity that is *also* a fence has two consumers and must be a superset of both |
| **F** | `api/services/image_storage.py:248` `extraction_cache_key(image_sha256, settings)`, consumed at `api/routers/images.py:219-220` | a **CLOSED 10-field `json.dumps` literal**: `_v` · `image_sha256` · `strategy` · `resize` · `blur_sigma` · `n_classes` · `min_contour_length` · `min_contour_area` · `max_contours` · `smooth_contours` · `n_points` | global, per (image bytes, those ten named params) | a hit returns the stored contour document and the handler **short-circuits before `compute_contours`** (`images.py:221-226`). The key **omits `ml_threshold` and `ml_detail_threshold`** — two of the twelve fields `ContourSettings` declares (§2e) and the two it is the sole producer of. **Banked: `fr-ContourSettings` B-4 (= C-1, ∘ C-25/R6-8), `fr-ContourSettings.md:43`, ≡ F-W5 §2 clause E13** — ⟨cmd⟩ (base `$R`) `/usr/bin/grep -n -F 'superset of the request fields' fr-ContourSettings.md` → `:43`, verbatim: *"an operation's cache identity must be a superset of the request fields the operation consumes"*. **F.W7 authors no cure at E13's seam and books none of it** |
| **F** | `api/services/compute_cache.py:55` `cache_key` (lookup `:66`, store `:85`) | `sha256(contour_hash ‖ "\|" ‖ json.dumps(params, sort_keys=True, separators=(",",":")) ‖ "\|" ‖ COMPUTE_VERSION)` — `COMPUTE_VERSION = "v1"` at `:47` | global; the `compute_cache` collection, 7-day TTL index (`api/services/database.py:71`) | a hit returns the cached result **dict** and the FFT / basis-projection chain is **skipped entirely**; a miss computes then stores; **fail-open** — a Mongo error on lookup or store falls through to compute. **This seam is invisible to R-4's term query at every one of its six terms** (§3), and it is not among the four counter-witnesses the founding lane evidence enumerates: the census adds it |
| **F** | `api/lib/crud/idempotency.py:42` — the unique compound index `[("key", 1), ("scope", 1)]`; `_request_hash` at `:30` | `(Idempotency-Key, scope)` where scope is user_slug / session / IP, with `request_hash = sha256(method ‖ 0x00 ‖ path ‖ 0x00 ‖ body)` compared separately | per (key, scope) | same key **and** matching hash → the stored response; differing hash → **409**. **Header ABSENT → `handler()` unconditionally** — the passthrough on which `fr-GalleryDraftsSection` B-2's duplicate-publish finding rests. Structurally the same two-part shape as the value side's, reached independently |
| **F** | `api/lib/crud/etag.py:25` `compute_etag` | `canonical_digest` over the mutable-field projection | per-document | a validator, not a reuse cache; listed because it is one of the four projections of the single digest primitive (§2d) and therefore shares that primitive's canonicalisation |

### §2d — Class 4: HASH FOLDS

| tree | site | keyed-on (the projection) | scope | share-hit consequence |
|---|---|---|---|---|
| **V** | `api/src/modules/palette/hash.ts:70` `computeContentHash` | `name` ⊕ `colors.length` ⊕ per stop `{css, name, position}`, each **domain-separated and length-framed** (`frame`, `:25`; domain `value.js/palette/payload/v1`, `:9`) | palette payload identity — `PaletteVersion.payloadHash` and `Palette.currentHash` | equal digests mean equal payloads and **nothing else**: since X-W3 this value addresses **no row** |
| **V** | `api/src/modules/palette/hash.ts:119` `computeReleaseHash` | `paletteSlug` ⊕ `revisionNo` ⊕ `payloadHash` ⊕ `parentHash` ⊕ `forkedFromHash` ⊕ `authorSlug` (domain `…/release/v1`, `:12`) | **the version row `_id`** | see §2a row 1. Two palettes can never collide here because the slug is folded in |
| **V** | `api/src/modules/palette/hash.ts:137` `computeAtomHash` | one stop's `{css, name}` — **not** its `position` (the position is the atom KEY, not its content) | per-atom | a recolor at a fixed slot changes it; a re-order does not |
| **V** | `api/src/modules/palette/hash.ts:155` `computeAtomSetHash` | the sorted `position:atomHash` list, order-independent | palette **colors-only** identity, emitted on the envelope as `atomSetHash` (`format.ts:124`) | **a dedup HINT with no consumer that shares a row.** Its former consumers — the `/diff` read and the atom-diff algebra — were excised at T.W1 (TA-4), and the source says so at `hash.ts:152-153`. **This is the nearest thing to a structural-sharing primitive either tree contains, and nothing reads it as one** |
| **V** | `api/src/platform/http/idempotency.ts:165` | sha256 of the raw request body | per stored replay entry | the conflict guard described at §2c row 1 |
| **F** | `api/lib/crud/canonical_digest.py:45` `canonical_digest` (serialisation at `:40`) | **THE ONE PRIMITIVE**, over four projections its own docstring enumerates: ETag · `content_hash` · `atom_hash` · `set_hash` | whole fourier tree | **a projection difference is the only thing distinguishing those four identities.** The module exists because three ad-hoc canonicalise-then-sha256 mechanisms had coexisted. Recorded because it makes the whole fourier question *"which keys go in"* rather than *"which algorithm"* |
| **F** | `api/routers/visualizations.py:83` `_content_hash` | `{image_slug, contour_hash, sorted(active_bases), n_harmonics}` | the viz `content_hash` field | **four fields — atom-incomplete.** See §2a row 6 |
| **F** | `api/lib/crud/atomdiff.py:102` `atom_hash` | `canonical_digest({key: value})[:16]` — 64-bit | per keyed atom | the per-atom identity the diff is computed over; the closed atom set is `ATOM_KEY_ORDER` (`:29`) |
| **F** | `api/lib/crud/atomdiff.py:112` `set_hash` | `canonical_digest(sorted(atom_hash(k, v) for all atoms))` | the atom-SET identity | two visualizations with the same five atoms produce the same `set_hash` — **but the version `_id` prefixes `viz_slug`, so equal set-hashes never share a row.** This is the compound per-entity identity shape (`{viz_slug}:{set_hash}`) that CENSUS §3 names, **already shipped on the fourier side**; the adjudicated cure for the value side's former unscoped form is E1's, and **F.W7 books zero of it** |
| **F** | `api/services/image_storage.py:269` `compute_contour_hash` | the ordered `(x, y)` pair list | global contour identity | order-discriminating by construction; the docstring supplies its own counter-example (the two diagonals sharing `sorted(xs)`/`sorted(ys)`) |
| **F** | `api/routers/images.py:110` `hashlib.sha256(content).hexdigest()` | the uploaded image bytes | global image identity | see §2b row 2 |
| **F** | `api/services/image_storage.py:248` · `api/services/compute_cache.py:55` | see §2c | — | listed there; both are sha256 folds serving as cache identities |

### §2e — The two sub-objects R-4 names as the compression target, enumerated

Named because §2a's fourier version-writer row persists both in full on every version row, and because
a later reader must be able to check the arity without re-deriving it:

**`ContourSettings` — 12 fields** (⟨cmd⟩ (base `$F`) `/usr/bin/sed -n '8,64p' api/models/shared.py \| /usr/bin/grep -oE '^[[:space:]]{4}[a-z_]+:' \| tr -d ' :'`):
`strategy` · `resize` · `blur_sigma` · `n_harmonics` · `n_points` · `n_classes` · `min_contour_length` ·
`min_contour_area` · `max_contours` · `smooth_contours` · `ml_threshold` · `ml_detail_threshold`.

**`AnimationSettings` — 6 fields** (same probe over `:65,110`): `fps` · `duration` · `max_circles` ·
`easing` · `speed` · `active_bases`.

▲ **SS-C-2 LOCK, DISCHARGED BY REFUSAL (§7b: *do not size a saving over dead fields*).** The census
states these **arities** and stops. It computes **no** saving, **no** ratio and **no** byte figure over
them, because `fr-SpeedSelect.md:45` banks atom 4 as semantically empty (`fps`/`max_circles`/`duration`
have zero cross-wire readers; `duration` is declared 4× with 3 values and a 1000× unit fork) and
**F-W5 §2 clause E10** leaves the produced-and-unconsumed disposition unstated. **A saving measured over
fields the contract may retire is unfalsifiable**, so this census measures none.

### §2f — Census arithmetic, with its unit

**Unit: enumerated census rows**, counted from the settled bytes of §2a–§2d of this file after writing
(not from the author's recollection), double-run:

| class | V | F | total |
|---|---|---|---|
| version writers (§2a) | 3 | 3 | 6 |
| asset writers (§2b) | **0 (∅, enumerated at §2b.1)** | 4 | 4 |
| cache keys (§2c) | 4 | 4 | 8 |
| hash folds (§2d) | 5 | 7 | 12 |
| **total** | **12** | **18** | **30** |

**The self-count, run over the settled bytes of this file and double-run** (base
`$V/docs/tranches/X/fourier/design`; the census's four class tables are the only tables whose rows open
with a bold tree label, so the probe's population is exactly them):

| ⟨cmd⟩ | output | reading |
|---|---|---|
| `/usr/bin/grep -cE '^\| \*\*(V\|F)\*\* \|' R4-enumeration-census.md` | **31** | the **30 site rows** ⊕ **the one ∅ row** of §2b, which is tree-labelled `V` because the absence is the value tree's |
| `/usr/bin/grep -cE '^\| \*\*V\*\* \|' R4-enumeration-census.md` | **13** | 12 value **site** rows ⊕ that ∅ row |
| `/usr/bin/grep -cE '^\| \*\*F\*\* \|' R4-enumeration-census.md` | **18** | 18 fourier site rows; no ∅ row on this tree |
| `/usr/bin/grep -cE '^\| \*\*V\*\* \| — \*\*∅' R4-enumeration-census.md` | **1** | the ∅ row itself, isolated — which is what makes `31 − 1 = 30` a subtraction and not an assertion |

▲ **The first draft of this paragraph published `29` under the claim that the ∅ row "is deliberately
not tree-labelled".** Both halves were false at the bytes — the probe returns **31**, and the ∅ row
carries `| **V** |` like every other. **Corrected from the live output before this file landed**, and
recorded rather than smoothed: a receipt that does not reproduce is fixed from the output or struck,
and there is no third disposition. The **class table above is unaffected** — its 12 / 18 / 30 were read
from the same rows and reproduce exactly under the four probes.

---

## §3 — G-F7-2: R-4's SIX-TERM GREP IS RETIRED AS FOUNDING EVIDENCE

It is retired on two independent grounds, **both re-measured today under the pin, both double-run**.
This is N-2's finding, executed rather than restated.

### §3.1 The NOISE half — re-measured, and it reproduces exactly

⟨cmd⟩ (base `$R`)
`/usr/bin/grep -rniE "trie\|prefix.?tree\|radix\|patricia\|structural.?sharing\|delta.?compress" fr-*.md \| /usr/bin/grep -c .`
→ **147** raw grep-lines over the frozen 66 (double-run: `147` · `147`).

⟨cmd⟩ (base `$R`)
`/usr/bin/grep -rniE "[[:<:]]trie[[:>:]]\|prefix.?tree\|[[:<:]]radix[[:>:]]\|patricia\|structural.?sharing\|delta.?compress" fr-*.md`
→ **exactly one line** (double-run: `1` · `1`), and it is the one the spec banks:
`fr-ContourEditorCanvas.md:56` — the **L-5** row, *"Unbounded deep-reactive undo stack over a
1024-point default … **ADJUDICATED → F.W3/W4** (cap + structural sharing candidate)"*.

**146 substring artefacts, and the census names what they are** — ⟨cmd⟩ (base `$R`)
`/usr/bin/grep -rhoiE "[a-z]*trie[a-z]*" fr-*.md \| tr 'A-Z' 'a-z' \| sort \| uniq -c \| sort -rn \| head -6`
→ `142 entries` · `18 featuredentries` · `5 nonfeaturedentries` · `5 geometries` · `2 registries` ·
`2 asymmetries` (tail: `tried`, `tocentries`, `retries`, `flaggedentries`). **The probe's dominant
signal is the English word `entries`.**

### §3.2 The BLINDNESS half — and this is the half no prior pass measured

The term query was retired as *noisy*; §5b says it is **also blind**, and blindness is the graver
defect because noise is visible and blindness is not. Measured over the surface the census enumerates:

⟨cmd⟩ (base `$V`)
`/usr/bin/grep -rniE "trie\|prefix.?tree\|radix\|patricia\|structural.?sharing\|delta.?compress" api/src src \| /usr/bin/grep -c .`
→ **25** raw grep-lines (double-run), of which ⟨cmd⟩ `… \| /usr/bin/grep -c 'Binary file'` → **0**,
and whose composition is ⟨cmd⟩
`… \| /usr/bin/grep -oiE "[a-z]*trie[a-z]*\|[a-z]*radix[a-z]*" \| tr 'A-Z' 'a-z' \| sort \| uniq -c \| sort -rn`
→ `18 entries` · `3 retries` · `2 retried` · `2 maxretries` — **the whole output, nothing elided.**
**Every one of the 25 is an artefact.**

⟨cmd⟩ (base `$F`)
`/usr/bin/grep -rniE "trie\|prefix.?tree\|radix\|patricia\|structural.?sharing\|delta.?compress" api web/src \| /usr/bin/grep -c .`
→ **181** raw grep-lines; ⟨*instrument residue, disclosed rather than absorbed, in G-11 §2.1.3's own
idiom*⟩ **20 of those 181 are `Binary file … matches` lines from `__pycache__`** (⟨cmd⟩
`… \| /usr/bin/grep -c 'Binary file'` → **20**), so the **source-line** figure is ⟨cmd⟩
`… \| /usr/bin/grep -v '__pycache__' \| /usr/bin/grep -c .` → **161** (double-run: `161` · `161`).
Composition, over the source-only set and folded to one case, ⟨cmd⟩
`… \| /usr/bin/grep -v '__pycache__' \| /usr/bin/grep -oiE "[a-z]*trie[a-z]*\|[a-z]*radix[a-z]*" \| tr 'A-Z' 'a-z' \| sort \| uniq -c \| sort -rn \| head -6`
→ `140 entries` · `12 flaggedentries` · `11 retries` · `5 featuredentries` · `2 nonfeaturedentries` ·
`1 tries` (the cut is the `head -6`, disclosed; the tail is more of the same). **Every one is an
artefact.**

**And the decisive probe:** ⟨cmd⟩
`/usr/bin/grep -rniE "[[:<:]]trie[[:>:]]\|prefix.?tree\|[[:<:]]radix[[:>:]]\|patricia\|structural.?sharing\|delta.?compress" $V/api/src $V/src $F/api $F/web/src`
→ **no output, exit 1.**

> **The six-term probe returns 25 + 161 = 186 source lines over the two product trees and ZERO true
> hits, while the census above enumerates 30 live persistence sites of which several are
> content-addressed sharing seams — one of them (`compute_cache.py`) not named in the founding lane
> evidence at all. A probe that returns 186 wrong answers and 0 right ones over the surface a wave is
> about cannot found that wave.**

### §3.3 What survives the retirement, stated precisely

R-4's **conclusion** for *version-atom sharing* **survives the enumeration and is now proven by it
rather than by a word search**: across the **6 enumerated version writers** (§2a), **zero** share
structure between a parent version and a child. Value persists `colors` in full at all four call
sites; fourier persists all five atoms in full on every version row. **Whole-snapshot duplication is
the measured shipped behaviour on both trees** — which is exactly the honest default F-W5 §2 clause
E16 carries and COHESION §0j.D ruled.

R-4's **scope** does not survive. *"Zero material on either side"* is true of version-atom sharing and
**false as a statement about the trees**: content-addressed sharing ships at **seven** enumerated
seams — fourier's `images.sha256`, `contours.contour_hash`, `extraction_cache_key`,
`compute_cache.cache_key`, `visualizations.content_hash`, `visualization_versions` compound `_id`, and
value's `palette_versions` release `_id` — and two of them have already produced adjudicated BLOCKERs
(`fr-ContourEditorCanvas` C-2 ⊕ K-3; `fr-GalleryDraftsSection` B-2 ⊕ `fr-GalleryView` FR-GV-1).
**F.W7 books none of them; it cites all of them.**

---

## §4 — G-F7-10: THE GUARDRAIL'S BILATERALITY, MEASURED AT TODAY'S BYTES

The gate asks one question: is the anti-tree KISS guardrail carried on **both** trees? **The spec's
born-RED witness for this gate no longer reproduces, and the gate is stronger for it.** Measured, never
inherited.

### §4.1 The fourier half — the guardrail stands, and it is ONE docstring in ONE tree

⟨cmd⟩ (base `$F`) `/usr/bin/sed -n '12,14p' api/lib/crud/atomdiff.py` →

> KISS guardrails (J.W1-crud-remix §0/§9): the atoms are a flat BAG (not a tree /
> Merkle / document); the diff is a whole-atom replace (the diff-viewer field-diffs
> a changed sub-object client-side, F-06); there is no three-way / DAG / merge.

⟨cmd⟩ (base `$F`) `/usr/bin/sed -n '1p' api/lib/crud/atomdiff.py` →
*"""The atom-diff PATTERN — authored once (fourier), adopted twice (value.js twin)."* ·
⟨cmd⟩ (base `$F`) `/usr/bin/sed -n '7p' api/lib/crud/atomdiff.py` →
*"(``lib/crud/atomdiff.ts``) keys over ``PaletteColor[]`` instead of the five"*.

**So the guardrail's own text names its second adopter by path.**

### §4.2 The value half — the named adopter is ABSENT, and the tree is SILENT

⟨cmd⟩ (base `$V`) `/usr/bin/find api/src src -iname '*atomdiff*'` → **no output.** *(The exit status is
0 — `find` reports success on an empty result — so the absence is the empty output, stated as such and
not as an exit code.)*

⟨cmd⟩ (base `$V`) `/usr/bin/grep -rn "atomdiff\|atomDiff" api/src src` → **exactly one line**, and it
is a record **of the excision**, not a statement of the guardrail:
`api/src/modules/palette/__tests__/palettes-forks.test.ts:9` — *"atom-diff were excised at T.W1 —
TA-4 — so the remix/atomDiff wire cases are"*.

### §4.3 The divergence from the spec's banked witness, stated as a correction

The spec banks G-F7-10's born-RED witness as
`grep -rniE "merkle\|flat bag\|not a tree" $V/api/src $V/src` → *"one hit, asserting the opposite word:
`$V/api/src/modules/palette/hash.ts:6` '(Merkle property)'"*.

**At today's bytes that probe returns nothing.** ⟨cmd⟩ (base `$V`)
`/usr/bin/grep -rniE "merkle\|flat bag\|not a tree" api/src src` → **no output, exit 1** (double-run:
exit 1 · exit 1). Widened to the whole product surface — ⟨cmd⟩
`/usr/bin/grep -rniE "merkle\|flat bag\|not a tree" api/src src demo test e2e` → **no output, exit 1.**

**Why**: `hash.ts` was rewritten at **X-W3** — ⟨cmd⟩ (base `$V`)
`git log --oneline -2 -- api/src/modules/palette/hash.ts` → `9b3e6923 fix(api/palette-versions): join
revision identity to the addressing palette…` · `919cc698 refactor(T.W1 · api): E-1 package-by-feature
transposition`. Its head is now domain-separated, length-framed hashing (`hash.ts:4-6`, quoted at §2d)
with **no Merkle claim anywhere.**

### §4.4 The gate's answer, at today's bytes

> **The bilaterality premise is FALSE — and it is false by SILENCE, not by contradiction.**
>
> `atomdiff.py:12-14` is **one docstring in one tree**. It names a value-side adopter
> (`lib/crud/atomdiff.ts`) that TA-4 excised and that no longer exists at any path. The value tree's
> former opposite-word statement (`hash.ts:6`, *"Merkle property"*) is **gone at X-W3**. **The value
> tree today carries ZERO statements on the subject — for the guardrail or against it.**

**This is a sharper premise than the spec's, not a weaker one**, and the difference matters to the
ruling the wave records: a *contradiction* between two trees is a disagreement an owner resolves by
choosing a side; a *silence* is one tree's standing decision being asked to bind a tree that has taken
no position and holds no code the decision governs. **§5a N-1's disposition is unchanged and is
re-affirmed at the new bytes: the correction narrows the premise; it does NOT void the guardrail.**
`atomdiff.py:12-14` remains **the incumbent** — banked at **F-W10 §2.3's SS-4-PREREQ row**
(*"THE GUARDRAIL IS THE INCUMBENT; an owner ruling precedes design"*), with **F-W5 §2 clause E16 ▲**
as its clause-side home, which adopted the same bilaterality correction in its own voice
(*"the guardrail is the INCUMBENT, but it is NOT carried on both sides today"*).

**Two stale consumers of the uncorrected premise remain and are neither edited nor chased here**
(§2a's Do-NOT-touch and §8's exclusion row): `F-W8.md` §5c's `F.W7` sibling row (*"carried on BOTH
sides"*) and `F-W6.md` §4's `F.W7` cross-edge row (*"quoted both trees"*). Both files are **read-only
to this wave**; the requests are declared at spec §7c and are not re-opened by this unit.

---

## §5 — LOCKS, DISCHARGED AT THE BYTES

| lock (§7b) | how this file discharges it |
|---|---|
| **D-19** — no anchor cited as live pre-F.W0 | §0.2: F.W0's `SUBSTRATE-LEDGER` §2.1/§2.2 are **quoted** by exact-string probe; the re-resolution is **never re-performed**; and the fourier `api/` surface is proven **byte-identical** between F.W0's substrate `8bc7736` and today's `21e11b0d` by ⟨cmd⟩ `git -C $F diff --name-only 8bc7736 HEAD -- api/` → empty. Value anchors are committed-HEAD anchors at `3a36c78a` over a clean product tree |
| **SS-C-2** — never size a saving over dead fields | §2e: field **arities** are published; **no saving, ratio or byte figure is computed anywhere in this file.** E10's disposition is unstated, so any sizing would be unfalsifiable |
| **FR-GIG-5 / F-W5 §0b** — no credit for an unauthored cure | X-W3's release/payload split (§2a row 1, §2d rows 1–2) and fourier's shipped compound `_id` (§2d row 9) are recorded as **measurements**, each with its author named and **booked at ZERO**. F.W7 authored none of them |
| **S-8 / K-13** — a presence claim enumerates the surface | §1's four class definitions ⊕ §2's 30 enumerated rows ⊕ §2b.1's **three independent** enumerations of the value asset ∅. No claim here rests on a term query |
| **K-3** — the upsert arm is dead; never revive it | §2b row 4 records the `$setOnInsert` upsert as the **mechanism of a banked BLOCKER**, never as a design option |
| **C-25 ≡ E13 / `fr-ContourSettings` B-4** | §2c row 5 quotes the superset law from the frozen record at the record's own case and books none of E13's cure |
| **m-15** — cross-referenced with F-4, never merged | §2b row 3 cites m-15 alone, names F-4 as a cross-reference, and merges nothing |
| **E1** — the identity is under repair; unscoped content keying is a defect generator | §2a rows 1 and 6 and §2d rows 2 and 9 measure scoping at both trees and **book zero of E1's cure** |
| **M-12** — stamp from a snapshot at the read instant | recorded as a **key-design lock** at §2c (the ETag-as-fence row and the two idempotency rows are the tree's only stamped-identity sites); no cure authored |
| **BC-20** | not re-booked; `duration`'s zero-writer fold stays banked where it is (§2e names the field and stops) |

---

## §6 — GATE READINGS

| gate | BEFORE (wave record, 2026-09-19 open) | AFTER (this file) | reading |
|---|---|---|---|
| **G-F7-2** | **RED** — ⟨cmd⟩ `ls $V/docs/tranches/X/fourier/design` → *No such file or directory*; no census artefact exists | `design/R4-enumeration-census.md` exists and enumerates **four classes on both trees** — version writers · asset writers · cache keys · hash folds — each row `tree · site · keyed-on · scope · share-hit consequence` (§2a–§2d, 30 rows). **The six-term grep is retired as founding evidence at §3, on both the noise and the blindness ground, each re-measured and double-run** | **GREEN for F.W7 — unit `a` is this gate's named owner** (spec §6: *"F.W7 itself (unit a)"*) |
| **G-F7-10** | **RED** — the corrected premise was unstated in any F.W7 byte, **and the spec's born-RED witness no longer reproduced** (wave-record MEASURE-AT-OPEN divergence 1) | §4 states the premise **at today's bytes, measured**: one docstring in one tree (`atomdiff.py:12-14`, reproduced verbatim), naming an excised adopter (`find` → empty; the one `atomdiff` hit is the TA-4 excision record), against a value tree that is now **silent** — the `Merkle property` counter-hit is gone at X-W3 `9b3e6923`, with the `git log` receipt. **False by silence, not by contradiction; the guardrail's standing is narrowed, never voided** | **GREEN for F.W7 — unit `a`'s half of the split verdict.** §4's last paragraph names the two stale sibling consumers, which are **read-only** to this wave and stay routed, never edited |

**§4's ruling question is restated against this census where the spec requires it** (§6 G-F7-2's close
cell: *"§4's question is restated against it"*). The restatement's home is `F-W7.md` §4 and its writer
is **unit `c`** under the §0j.D dispatch (unit `b` never opens); this file supplies the corrected
evidence that restatement consumes: **(i)** version-atom sharing is absent on both trees **by
enumeration**, so the ruling's premise holds where it was always true; **(ii)** *"zero material on
either side"* is false about the trees — seven content-addressed seams ship today and two have
produced adjudicated BLOCKERs; **(iii)** the guardrail is unilateral **by silence**.

---

## §7 — WHAT THIS CENSUS DOES NOT DO

- **It books nothing.** F.W7's adjudicated roster is **∅** — ⟨cmd⟩ (base `$R`)
  `/usr/bin/grep -lE '(^\|[^A-Za-z])F\.W7([^0-9A-Za-z-]\|$)' fr-*.md` → **no output** across all 66
  (double-run). *"A wave with no adjudicated rows gets no invented ones. The ∅ is a finding"*
  (KF-W1 §8, ⟨C-14⟩). **No registry row, gate or bounds item is minted here.**
- **It authors no design byte.** The owner ruled **AGAINST** (`F-TRIE`, COHESION §0j.D);
  `design/R4-variant-storage.md` is **never created**; this file is lawful under §2a row 2 only
  because it is measurement.
- **It writes no fourier byte, no product byte and no sibling-spec byte.** Every fourier and
  value-side citation above is a read.
- **It re-performs no re-resolution.** F.W0's published tables are quoted; the anchor identity is
  measured, not re-derived.
- **It sizes nothing.** See §2e.

---

*Authored by unit `X.F.W7.a`, 2026-09-19. Commit: spec §10 row 1.*
