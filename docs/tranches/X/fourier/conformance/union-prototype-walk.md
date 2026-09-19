SERVED MODEL: claude-opus-5[1m]

# The union prototype walk — five verbs × two object kinds

**Wave**: X.F.W8 (Track C · X·F · the CRUD union prototype, end to end) · **unit `a`** · seat
`claude-opus-5[1m]`, 2026-09-19.
**Spec**: `docs/tranches/X/fourier/waves/F-W8.md` — §1a (Goal criterion) · §1b (the TA-4 branch) ·
§3 §P rows P1–P8 · §4 gates **G1 · G2 · G16** · §5a (in-wave order) · §5c (the F.W0 / F.W1 / F.W2 /
F.W5 edge rows). Read whole at this seat.
**Authority**: `docs/tranches/X/COHESION.md` **§0j** (the owner's begin-word, 2026-09-17) and
**§0j.D** (X·F's owner docket), read to file end. The rulings this file consumes are cited by id and
**never re-opened**.
**Substrates**: value.js `tranche-u` (this repo) · fourier-analysis **`21e11b0`**, worktree **0
dirty**, **READ-ONLY IN EVERY VERB** — this wave writes zero fourier bytes.

---

## §0 What this file is, and the law it is written under

**§1a, the wave's goal criterion, quoted from the spec:** *"The wave succeeds if the five verbs of
the union can be **walked against both object kinds**, and — for every leg either side cannot answer
— the inability is **stated in the register with its reason** rather than discovered by a later
repair. The walk is a diagnostic instrument, not a repair: it repairs nothing and claims credit for
no other wave's cure."*

This file is that register's **walk half**: ten cells, one per (verb, object-kind) pair, each
carrying a bound client method + a named consumer state **or** an explicit `SERVER_ONLY`, **plus an
authority class**. The fixture rows are unit `b`'s, the C31 split unit `c`'s, the script and the
§R/§M/§D assertions unit `d`'s, the rulings + relay + closure unit `e`'s (§5a's serial order:
`a → b → c → d → e`, each committing before the next opens).

### 0.1 Locks binding this unit, each carried at its own site below

- **FR-GIG-5 mirror** — *no wave is credited with another's cure.* Two cures landed between the
  spec's seal and this seat's clock; both are named with the commit that landed them and **F.W8
  claims neither** (§5.1, §7.2).
- **K-1** — a `@router.` grep is blind to prefixed routers; the admin arm reads **13 / 44**, never
  zero. Carried live at §2.2, where this seat's own corroborating probe is the blind instrument.
- **X-9** — **one member-scope law before ANY percentage.** §2.1. **This file publishes no
  percentage at all.**
- **D9** — the ruled vocabulary: visibility `private | public` (`unlisted` **dies**), lifecycle
  `active | trashed`, moderation `clear | withdrawn`. Carried at §5.1 and §3's `remix` rows.
- **X-4** — the `/versions` rail is **CHANGED–CONTESTED**; the value-side history leg **must not
  assume its shape**. Carried in cell **H-V** and measured at §7.3.
- **D-19 / MEASURE-AT-OPEN** — every fourier anchor is re-resolved before citation. §0.2.
- **Probe parsimony (§5.2)** — bounded reads only; **no live probe, no browser, no run**. The whole
  measurement surface of this unit is **11 bounded `grep`/`sed` reads**, enumerated by their outputs
  below.
- **E-3** — dated specs, the adjudicated registry, `CENSUS-CANONICAL.md`, F.W5's three artifacts and
  `COHESION.md` are **immutable operands**; every correction here is an **addendum-beside**, never a
  patch of a banked file.
- **§1c** — this wave repairs nothing. Every divergence below is **routed to its owner**, never
  cured here, and no product byte moves in either repo.

### 0.2 D-19 — the anchor re-resolution, performed before any citation

F.W0's published tables were read first, at `fourier-analysis/docs/tranches/F/SUBSTRATE-LEDGER.md`
(**201,985 B**): **§2.1** (G-11, the corrected ANCHOR table, *"Dated 2026-09-17. Substrate: fourier
`8bc7736`"*) and **§2.2** (G-12, the corrected-DENOMINATOR table). ▲ **Neither table reaches this
unit's anchors, and the ledger says so in its own words**: §2.1.3 row 5's state cell reads
**"RECORD (api/py coordinates are outside F.W0's bounds)"**, and G-12's fifteen rows are CSS tokens,
route records, component counts and devDeps — no API route, store ref or Python handler among them.
**So the obligation does not disappear; it lands on this seat.** Every anchor below was re-resolved
at fourier `21e11b0` / value.js `tranche-u` by this seat, and **the drift is published, not
absorbed**:

| # | witness (spec anchor) | at this seat's clock | reading |
|---|---|---|---|
| 1 | remix child born `draft` — `api/models/visualization.py:277` | **`:277`**, byte-exact: `visibility: Visibility = "draft"  # a remix child is born private (§4)` | **EXACT** |
| 2 | *"NO Mongo transaction — standalone-topology-honest"* — `visualizations.py:493` | **`:493`**, byte-exact inside `remix_visualization`'s docstring | **EXACT** |
| 3 | `on_chain` is only `{head_hash} ∪ {fork_of_hash}` — `visualizations.py:827` | **`:827`** `on_chain = {head_hash} \| ({fork_of_hash} if fork_of_hash else set())` | **EXACT** |
| 4 | remix idempotency — `visualizations.py:612` | **`:612`** `return await idempotency.replay_or_record(request, _store(), f"user:{owner_slug}", _handler)` | **EXACT** |
| 5 | the `owner=="me"` branch — `visualizations.py:305-309` | **`:306-310`** (`if owner == "me":` … `?owner=me requires a session`) | **DRIFT +1; witness holds** |
| 6 | `GalleryView:396` `router.push('/w/${slug}')` | the card leg **`:395`** `@open="router.push(\`/w/${$event}\`)"`; the modal leg **`:421`**, fed by `GalleryCardModal.vue:273` `@click="emit('open-visualizer', entry.image_slug)"` | **DRIFT −1 / +25; witness holds, and the modal leg is a SECOND push site the spec's single anchor did not name** |
| 7 | `loadVisualization` `workspace.ts:197-232`, **zero call sites** | declared **`:211`**; `grep -rn loadVisualization web/src` → **4 hits, all inside `stores/workspace.ts`** (`:211` decl · `:250` the `loadSnapshot` alias · `:462`/`:463` export + comment) | **DRIFT ~+14; the data-dead reading STANDS** |
| 8 | `gallery.ts:168` bypasses the store's own `deleteVisualization` | **`:256`** `await api.deleteVisualization(slug, etag)` in `stores/gallery.ts`, beside `stores/workspace.ts:409`'s own `deleteVisualization` | **DRIFT +88; witness holds** |
| 9 | `saveVisualization` unconditional POST; `:358` written, never read as a guard | **`:356`** decl, its only guard `if (!imageSlug.value \|\| !contour.value) return null;`; `visualizationSlug.value` written **`:370`**, ETag **`:371`** | **DRIFT +12; witness holds** |
| 10 | `savedSnapshots`' ONE writer is the literal `[]` — `workspace.ts:102` | **`:116`** `savedSnapshots: [],` | **DRIFT +14; witness holds** |
| 11 | batch Unfeature `$set {"tier":"normal"}` via `update_many` — `admin.py:435-440` | **`:436-438`** `update_many(…, {"$set": {"tier": "normal", "updated_at": datetime.now(UTC)}},` | **DRIFT +1; witness holds** |
| 12 | `visibilityFilter` is a producerless store ref, three hits, zero writers | **3 hits, all `stores/gallery.ts`** — `:37` decl · `:83` read (`ownerParam`) · `:358` export. **No assignment anywhere.** | **DRIFT; witness holds EXACTLY** |
| 13 | A-3: the `PaletteVersion` shape at `model.ts:84` | value.js `api/src/modules/palette/model.ts` **`:125`** `export interface PaletteVersion {` | **DRIFT +41; file and interface right** |

▲ **Eleven of thirteen witnesses hold with a drifted address; two are byte-exact-at-address; none is
adopted from the spec unmeasured.** ⊘ **And one witness does NOT hold** — the value half of
divergence (a) — which is §5.1's subject and is stated there rather than buried in a drift table.

---

## §1 G1's branch, DECLARED ALOUD — the diff leg is one-sided

⊙ **G1 is RULED.** COHESION **§0j.D · F-SS4REST R1**, quoted: *"**RE-SCOPE value.js out of the diff
clause** (a one-sided §6 verdict, stated explicitly) — `atomdiff.ts` is wholly excised from value.js
and restoring it is value-side authoring that would couple value.js's release train to the fourier
contract (the §0i.1 logic)."*

**Therefore, and this is the declaration §1b's branch (b) requires:**

> **THE UNION'S DIFF LEG IS FOURIER-ONLY. THE UNION'S DIFF VERDICT IS A ONE-SIDED VERDICT.**
> There is no palette-side diff operation, no palette-side diff client method, and no palette-side
> diff fixture. Any statement of the union's diff behaviour is a statement about **one** object kind
> and must be read as such. Branch (a) — TA-4 restoration as a PREREQUISITE — is **DEAD**.

Every cell, row and finding below that touches the diff verb carries the mark **⊘**, and the full
form **⊘ ONE-SIDED (R1)** stands at exactly three substantive sites: **this declaration**, cell
**X-F** and cell **X-V**. Their addresses are measured and disclosed at §9, together with the
probe-line residue the self-count creates by naming its own pattern.

**The value-side ground, re-measured at this seat (A-1's three limbs):** ⟨cmd⟩
`grep -rn "atomDiff" api/src src | wc -l` → **1** — the single surviving mention is the comment at
`api/src/modules/palette/__tests__/palettes-forks.test.ts:9` recording the T.W1 excision. `atomdiff.ts`,
the `atomDiff` field on `PaletteVersion` and `api/test/conformance/diff.test.ts` are all absent:
**0 extant · 1 landed-then-excised (`7351297f` → `a8ff7792`) · 0 reciprocated.** The value-side route
table confirms it structurally — §3's ten cells name every palette route, and **no `/diff` is among
them**.

---

## §2 The denominator of record — CONSUMED, never re-derived

### 2.1 X-9's member-scope law, published BEFORE any ratio appears

> **MEMBER-SCOPE LAW (this file's, stated once and binding on every figure below).** A **member** of
> this walk's denominator is a **CELL**: an ordered pair (verb, object-kind) drawn from
> {create, derive, diff, remix, history} × {fourier-viz, palette}. There are **ten**, enumerated in
> §3, and **nothing else in this file is a member** — not an operation, not a route, not a client
> function, not a record id. A cell is **ANSWERED** when it carries a bound client method **and** a
> named consumer state; **DISPOSED** when it carries an explicit `SERVER_ONLY`, `CLIENTABLE`,
> `STRUCK` or `OUT-OF-CONTRACT (RULED)` token with its reason. Every cell below is **disposed**;
> §4 says which are **answered**.
>
> **No figure in this file is a percentage.** Every ratio that appears is cited to the holder that
> owns its denominator, in the form `n / N`, with N named. A coverage percentage over these ten
> cells is **forbidden here** and belongs to the closure run (unit `e`) under its own member scope.

### 2.2 The fourier denominator — cited to F.W5's `operation-register.md`, its holder

`docs/tranches/X/fourier/contract/operation-register.md` (**38,255 B**, F.W5's artifact, CLOSED
2026-09-17 at 22/22 GREEN) is the holder. **F.W8 consumes it and re-derives nothing of it.**

- **The triple**: **45 = 30 public-non-admin + 13 admin + 1 app + 1 gallery** (register §1.1,
  itself quoting the F-W5 spec's §2 §D1 lock). The four arms are **named**, not merely sized.
- **The split**: `CLIENTED` **36** · `CLIENTABLE` **7** (rows 7–13) · `STRUCK` **1** (row 45,
  `GET /api/gallery/cursor`) · `SERVER-ONLY` **1** (row 44, `GET /api/health`) — **36 client edges /
  9 gap operations** (register §4.1).
- **The security figure**: **OpenAPI security 0 / 45** (register §3.1) — *"all 45 operations document
  zero authority while 26 of 45 enforce some."* **F.W8 does not re-derive this figure; it consumes
  it**, and §3's authority-class column is the surface on which the walk asserts against it.
- **The authority vocabulary**: the register's closed six-token key — `ADMIN-TOKEN` ·
  `SESSION-DECLARED` · `SESSION-IN-BODY` · `OWNER-IN-BODY` · `VIEWER-SCOPED` · `ANONYMOUS`.

▲ **K-1, carried live at this seat's own instrument rather than quoted as a warning.** To corroborate
(never to substitute) that the walk's fourier verbs sit on the `visualizations` router, this seat ran
⟨cmd⟩ `grep -nE '^@router\.(get|post|patch|delete|put)\(' api/routers/visualizations.py` → **13
lines** (`:164 :244 :287 :350 :400 :430 :488 :669 :675 :686 :733 :799 :860`), which reproduces
register rows **1–13** exactly. **That instrument is the blind one K-1 names**: keyed on the bare
name `router`, it reads the admin arm as **zero** and the gallery arm as **zero**. The figures of
record are the register's — **13 / 44 admin**, never zero — and this seat's 13 is a *corroboration of
one arm's rows*, not a census and not a total. **"30" is never cited here as the whole API.**

### 2.3 The value denominator — there is none, and that is the finding

**No `operation-register.md` exists for the palette API.** F.W5's register is fourier's, by its own
§0 bases. The value-side cells below therefore carry authority classes **MEASURED AT THIS SEAT**
(read-only, value-side, not under the F.W0 lock — §0's carve-out), mapped into the register's closed
six-token vocabulary where a token fits, and **named as a vocabulary gap where none does** (§7.4).
**This file mints no value-side register**; the ask rides unit `b`'s fixture register and unit `e`'s
relay letter.

The palette route surface, enumerated once so the cells can cite it (value.js
`api/src/modules/palette/routes/`, this seat): `crud.ts` `GET /` `:37` · `GET /mine` `:47` ·
`GET /:slug` `:62` · `POST /` `:73` · `PATCH /:slug` `:106` · `DELETE /:slug` `:150` — `versions.ts`
`GET /:slug/versions` `:34` · `GET /:slug/versions/:hash` `:59` · `POST /:slug/revert` `:69` —
`forks.ts` `POST /:slug/forks` `:26` · `GET /:slug/forks` `:67` · `GET /:slug/provenance` `:95` —
`publish.ts` `POST /:slug/publish` `:54` · `POST /:slug/unpublish` `:60` — `votes.ts`
`POST /:slug/vote` `:17` — `flags.ts` `POST /:slug/flag` `:15`. ⊘ **No `/diff`. No `/remix`. No
`/restore`.** The route gap P1 states is confirmed from both ends: fourier holds `/diff` + `/restore`;
value.js holds `/revert` + `/versions/:hash` + `/vote` + `/flag`; **neither holds the other's.**

---

## §3 THE WALK — ten cells

**Reading key.** `client method` = the bound function, at its file and line, or the token that says
there is none. `consumer state` = the named reactive/store state the method's result lands in, at its
site. `authority class` = **CONSUMED** from F.W5's register (fourier rows) or **MEASURED** at this
seat (palette rows). `disposition` = the §2.1 token. Ids are record-qualified; anchors are §0.2's.

### 3.1 Object kind **fourier-viz** (fourier-analysis; READ-ONLY)

| cell | verb | operation (register row) | client method | consumer state | authority class | disposition | gate |
|---|---|---|---|---|---|---|---|
| **C-F** | **create** | `POST /api/visualizations` (row **1**) | `createVisualization` — called at `stores/workspace.ts:356` `saveVisualization` | `workspace.visualizationSlug` (`:45`, written `:370`) ⊕ `workspace.visualizationETag` (written `:371`) | `SESSION-IN-BODY` *(consumed)* | **ANSWERED** (`CLIENTED`) — but **re-entrant**: the sole guard is `if (!imageSlug \|\| !contour) return null`; the slug it writes is never read back as a guard ⇒ **N clicks ⇒ N rows** | G10 (unit `d`) |
| **D-F** | **derive** | `POST /api/contours/{contourHash}/compute/epicycles` (row **16**) | `computeEpicycles` — called at `stores/workspace.ts:303` inside `runComputeEpicycles` (`:296`) | `workspace.epicycleData` (written `:310`, `markRaw`) ⊕ the `epicycleRevision` stale-guard (`:300`, `:309`) | `ANONYMOUS` *(consumed)* | **ANSWERED** (`CLIENTED`). Sibling entry `POST /api/images/{imageSlug}/extract-contour` (row **26**, `extractContour`, `:259`) is the upstream half | G8 (unit `d`) |
| **X-F** ⊘ | **diff** | `GET /api/visualizations/{slug}/diff` (row **12**) | **NONE** — `CLIENTABLE` gap, enumerated `F8-CLIENT-03` | **NONE** | `VIEWER-SCOPED` *(consumed)* | **DISPOSED `CLIENTABLE`** — the operation exists and is unreached. ▲ **NOT a general two-point diff**: `on_chain = {head_hash} ∪ {fork_of_hash}` (`:827`), it reads the **stored** `atom_diff` and 404s any other pair. **A fixture must not assume a general diff.** ⊘ **ONE-SIDED (R1)** | **G1** · G2 |
| **R-F** | **remix** | `POST /api/visualizations/{slug}/remix` (row **7**) | **NONE** — `CLIENTABLE` gap, `F8-CLIENT-08`; ruled a **gap, not a strike**, by §0j.D **F-SS4REST R8** (REMIX + BORN-PRIVATE) | **NONE** | `SESSION-IN-BODY` *(consumed)* | **DISPOSED `CLIENTABLE`**. Idempotent by `idempotency.replay_or_record(...)` (`:612`); **non-transactional BY DECLARED CHOICE** (`:493`). Child born `draft` (`models/visualization.py:277`) | G2 · G10 |
| **H-F** | **history** | `GET /api/visualizations/{slug}/versions` (row **13**) | **NONE** — `CLIENTABLE`, **sequenced behind F.W5 §E2**, `F8-CLIENT-06` | **NONE** | `VIEWER-SCOPED` *(consumed)* | **DISPOSED `CLIENTABLE (SEQUENCED)`** — and the list is a provable **singleton**: `_write_root_version` is the only writer, every row born `parent_hash=None, depth=0` (register §4.2 row 13; **F-α**, F.W6's burn-down). Clienting it today ships a dead affordance. The verb-adjacent `POST /{slug}/restore` (row **6**, `restoreVisualization`, `CLIENTED`) is **soft-delete restore, NOT version revert** — it is not this cell's verb | G2 · G13 |

### 3.2 Object kind **palette** (value.js)

| cell | verb | operation | client method | consumer state | authority class | disposition | gate |
|---|---|---|---|---|---|---|---|
| **C-V** | **create** | `POST /palettes` (`routes/crud.ts:73`) | `createAndSavePalette` (`demo/palettes/api/palettes.ts:69`) | `usePaletteActions.ts:48` (the save action's palette state) ⊕ `useSlugMigration.ts:37` | `SESSION-IN-BODY` *(measured: `crud.ts:74-75` reads `c.var.sessionToken` in the handler body and 401s via `AuthenticationError`)* | **ANSWERED** (`CLIENTED`) | G2 · G10 |
| **D-V** | **derive** | **NO OPERATION** | **`SERVER_ONLY` — by construction, with its reason** | — | n/a | **DISPOSED `SERVER_ONLY`**: the palette's only derivation is `computeOklabColors`, executed **inside** the create and fork writes (`service/oklab.ts`; `service/forks.ts:78` `oklabColors: computeOklabColors(colors)`). There is **no derive route, no derive client method and no derive-result consumer state** — the derived value is a field of the written row, never an operation. **The palette side cannot answer a standalone derive verb, and the reason is architectural, not a gap** | G2 |
| **X-V** ⊘ | **diff** | **NONE — RULED OUT OF THE CONTRACT** | **NONE** | **NONE** | n/a | **DISPOSED `OUT-OF-CONTRACT (RULED)`** — §0j.D **F-SS4REST R1**. `atomdiff.ts` + `atomDiff` + the conformance fixture were excised at `a8ff7792`; 1 surviving mention, a comment (§1). This cell is **not** a gap to be filled: filling it is the branch the owner killed. ⊘ **ONE-SIDED (R1)** | **G1** |
| **R-V** | **remix** | `POST /palettes/:slug/forks` (`routes/forks.ts:26`) | `forkPalette` (`demo/palettes/api/versions.ts:43`) | `useVersionHistory.ts:103` (the fork action) | `SESSION-IN-BODY` *(measured: `forks.ts:28-31` reads `sessionToken` **and** `userSlug`, 401s via `AuthenticationError`)* | **DISPOSED `CLIENTED–UNREACHABLE`** ⊘ — the edge exists **and cannot reach its operation**: the client POSTs `/palettes/${slug}/fork` (**singular**, `versions.ts:48`) while the server's own source says *"The singular `POST /:slug/fork` is **GONE**"* (`routes/forks.ts:9`) and binds the plural at `:26`. **404 by construction.** See §7.2 — routed, not repaired. Transactional (`service/forks.ts:108` `withTransaction`, in-txn source re-read `:105`), **no idempotency key**. Child born **`private`** (`service/forks.ts:87`) | G2 · G10 |
| **H-V** | **history** | `GET /palettes/:slug/versions` (`routes/versions.ts:34`) ⊕ `GET /palettes/:slug/versions/:hash` (`:59`) ⊕ `POST /palettes/:slug/revert` (`:69`) | `listVersions` (`api/versions.ts:24`) ⊕ `revertPalette` (`:34`); **no by-hash client method exists** | `useVersionHistory.ts:57` (`listVersions` → the versions list + pagination) ⊕ `:90` (`revertPalette`) | list/detail `VIEWER-SCOPED` *(measured: `assertPaletteReadable(services, slug, c.var.userSlug)`, `versions.ts:50`)*; revert **`OWNER-DECLARED`** *(measured: `requireOwnership(paletteOwnerExtractor)` as route middleware, `versions.ts:71`)* — ▲ **a mechanism the register's closed six-token vocabulary has no member for** (§7.4) | **ANSWERED** (`CLIENTED`), with **two disposals inside it**: the by-hash read is `CLIENTABLE` (server-only today), and ▲ **X-4 binds — the rail CHANGED**: `PaletteVersion._id` is now the **release** hash and `payloadHash` the content hash, with `revisionNo` the total-order key (`model.ts:125-147`, X-W3 · G-7). **The walk must bind to `revisionNo`/`payloadHash` and assume nothing about hash identity** | G2 · G13 |

**Self-count of the walk, read from the settled bytes (SELF-COUNT law, double-run at §9): ten cells,
ten dispositions, zero blanks; five carry a bound client method, five do not.**

---

## §4 Per verb — WHICH SIDE CANNOT ANSWER (§1a's deliverable)

| verb | fourier-viz | palette | **the union's reading** |
|---|---|---|---|
| **create** | **ANSWERS** (`createVisualization` → `visualizationSlug`/`ETag`) | **ANSWERS** (`createAndSavePalette`) | **BOTH ANSWER.** The only union defect on this verb is a **shape** defect, not an absence: fourier's create is re-entrant and idempotency-free at the client, value.js's fork is transactional without an idempotency key, and **neither repo holds both halves** (G10, unit `d`) |
| **derive** | **ANSWERS** (`computeEpicycles` → `epicycleData`) | **CANNOT ANSWER** — no operation, no method, no state; the derivation is a write-internal field (`computeOklabColors`) | **ASYMMETRIC BY ARCHITECTURE, not by gap.** The union has a derive verb on **one** object kind. A conformance fixture pairing them would be a fabrication; the palette cell is `SERVER_ONLY` **with its reason recorded** |
| **diff** ⊘ | **SERVER ANSWERS, CLIENT CANNOT** — row 12 exists, `CLIENTABLE`, zero client function, and is **not a general diff** (`on_chain`, `:827`) | **CANNOT ANSWER, BY RULING** — §0j.D R1 re-scopes value.js out of the clause | **ONE-SIDED VERDICT (R1), SAID OUT LOUD.** The union's diff behaviour is fourier's alone, and half of fourier's own leg is unreachable from its client. **No two-sided diff statement may be published by this tranche** |
| **remix** | **SERVER ANSWERS, CLIENT CANNOT** — row 7 `CLIENTABLE` (ruled a gap by R8), idempotent, non-transactional | **CLIENT AND SERVER BOTH EXIST AND DO NOT MEET** — `forkPalette` POSTs the retired singular path (§7.2) | ⊘ **NEITHER SIDE CAN WALK REMIX END TO END TODAY.** Fourier lacks the edge; value.js has an edge bound to a dead path. This is the walk's sharpest finding and it is **routed, not repaired** |
| **history** | **SERVER ANSWERS, CLIENT CANNOT, AND THE CHAIN IS A SINGLETON** — row 13 `CLIENTABLE (SEQUENCED)`; every row born `depth=0` (F-α) | **ANSWERS** (`listVersions` + `revertPalette`), on a **CHANGED–CONTESTED** rail (X-4), with the by-hash read unclientted | **ASYMMETRIC IN BOTH DIRECTIONS.** Value.js has the verb and a moving rail; fourier has the route, no reader, and nothing to read — *"a history walk cannot enumerate a chain that is a provable singleton"* |

▲ **One further inability, load-bearing on the history leg and owned here (P6).** The walk cannot run
**as the owning actor** on the fourier side at all: `visibilityFilter` is a **producerless** store ref
(`stores/gallery.ts:37` decl · `:83` read · `:358` export — **no writer anywhere**), so
`ownerParam()` returns `undefined` unconditionally and the server's whole `owner == "me"` branch
(`visualizations.py:306-310`) is **dead from this client**. F.W3/W4 owns the control; **F.W8 owns the
enumeration dependency** and records it here.

▲ **And one the list contract imposes (P8).** The walk **cannot enumerate a chain through a list
endpoint that returns an intersection of a filter and a page window** — `entries` is featured ∩ the
loaded cursor window with no `tier` param at any layer, and `resetAndFetch()`/`fetchNextPage()` share
one abort key. The walk's enumeration therefore runs **per-slug**, never through the gallery list.
▲ **WAVE-LOCK carried (fr-GallerySearchBar C-2)**: any F.W5-W8 wiring of `basisFilter` **must** use
the banked normaliser (**fr-BasisSelector M-10**). ▲ **FR-GIG-5: the F.W1 tri-package bump does NOT
cure the pagination drain and F.W1 must not be credited for it.**

---

## §5 The two divergences — STATED, NEVER HARMONISED

### 5.1 Divergence (a) — the privacy default on the derive/remix child

**As the spec states it** (§3 P1): *"a fourier remix child is born `draft`, a value.js fork child born
`public` — opposite privacy defaults on one verb (`visualization.py:277` / `forks.ts:76`)."*

**As it measures at this seat, and the halves diverge in what happened to them:**

- **fourier — UNCHANGED, byte-exact at its anchor.** `api/models/visualization.py:277`:
  `visibility: Visibility = "draft"  # a remix child is born private (§4)`. The type is
  **`Visibility = Literal["draft", "unlisted", "public"]`** (`:34`) — **three** states.
- ⊘ **value.js — THE CITED HALF NO LONGER HOLDS.** `api/src/modules/palette/service/forks.ts:87`
  reads **`visibility: "private"`**, under an in-source minute: *"X-W3 · G-12 (class 2) — the child
  is born PRIVATE. A fork was published on creation, so forking any palette silently minted a new
  public row carrying a copy of its payload."* The cure landed at **`22d2eb65`** *"fix(api/palette-forks):
  plural route, private child, both-boundary source auth, viewer-filtered list, computed forkCount
  (X.A4)"* — **Track A's wave, X·V**. ▲ **FR-GIG-5 MIRROR: F.W8 claims NO credit for it, and names
  the wave that landed it from the git record.**

**THE DIVERGENCE IS THEREFORE RE-STATED AT ITS TRUE BYTES AND LEFT UNHARMONISED:**

> **It is no longer a divergence of privacy DEFAULT — both children are now born unpublished. It is a
> divergence of VOCABULARY and CARDINALITY.** Fourier's unpublished token is **`draft`**, inside a
> **three**-state visibility enum that still carries **`unlisted`**; value.js's is **`private`**,
> inside a **two**-state enum — `PALETTE_VISIBILITIES = ["public", "private"]` (`model.ts:33`) — where
> **ruled D9 killed `unlisted`** and a boot check *"refuses to boot against a collection that still
> carries one"* (`model.ts:28-32`). ⊘ **The union has two unpublished states with different names
> over different-sized enums, and this wave harmonises neither.** D9 is the value side's ruling and
> reaches the value side; §0j.D **R8 (REMIX + BORN-PRIVATE)** is the union's ruled target and **F.W5
> writes the clause** — F.W8 **consumes both and re-rules neither**. The register (unit `b`) must
> carry the token mapping **or** name it struck; a fixture that silently equates `draft` with
> `private` is a fixture generated from the client union, not from the operation models (**G4**).

**The `unlisted` residue is disclosed, not resolved**: the fourier unpublish verb's target is
`unlisted` (register §4.2 row 9, *"D9 DIVERGENCE, DISCLOSED NOT RESOLVED"*), and per that rooting the
reconciliation is **the value.js API row's obligation, never a silent contract overwrite and never a
fourier defect**.

### 5.2 Divergence (b) — the transaction, and the deliberateness of its absence

- **fourier runs NO transaction, BY DECLARED CHOICE.** `visualizations.py:493`, byte-exact:
  *"The remix is the ordered, idempotent, content-addressed write sequence of ``J.W1-crud-remix §11``
  (NO Mongo transaction — standalone-topology-honest)"*, and it carries idempotency instead —
  `idempotency.replay_or_record(request, _store(), f"user:{owner_slug}", _handler)` (`:612`).
- **value.js's fork IS transactional and carries no idempotency key.**
  `service/forks.ts:108` `const doc = await services.withTransaction(async (session) => {`, with the
  source **re-read inside the session before the counter bump** (`:105`'s minute, `:115`'s `session`
  hand-off, `:128` insert, `:149` `incrementForkCount(sourceSlug, session)`).

> **STATED, NOT HARMONISED: each repo holds exactly ONE half of the create/derive safety property,
> and they are DIFFERENT halves.** Fourier holds replay-safety without atomicity; value.js holds
> atomicity without replay-safety. **Neither side holds both.** Fourier's absence is *deliberate and
> declared* (a topology fact, not a defect — a standalone Mongo cannot run a transaction), so the
> union may not book it as a gap to close; value.js's absence of an idempotency key is *unstated*,
> and the register records which half each repo holds. **This wave harmonises nothing and proposes
> nothing**; G10's disposition is *idempotent-or-declared on both sides*, and the declaration is the
> acceptance, not the cure. ▲ **FR-GV-1's split law, verbatim: *"split F.W3/W4 contract + F.W5-W8
> server dedupe"* — the `:disabled` cure is F.W3/W4's and F.W8 claims no credit for it.**

---

## §6 The admin leg — M3's batch-write state-preservation assertion

**Witness (FR-GV-9 = C·M-8's second clause), re-resolved**: fourier `api/routers/admin.py:436-438` —
batch Unfeature issues `update_many(…, {"$set": {"tier": "normal", "updated_at": datetime.now(UTC)}},
…)` **unconditionally**, so **unfeaturing a SAVED-tier entry silently erases the saved tier**, while
the dialog copy is honest about the mechanism and the button label is not.

**THE ASSERTION THIS WALK CARRIES (M3's whole act; L-19 — no separate gate, because a gate here would
name no witness the walk does not already carry):**

> **A batch write preserves every state orthogonal to the one it names.** The admin leg of the walk
> asserts that a batch Unfeature over a mixed-tier selection leaves each row's **saved** tier intact:
> *tier is a state machine, not a scalar collapse.* The assertion is recorded here and rides **G2**'s
> walk record (admin leg); the **semantics ruling is F.W5/F.W6's** — one home, two citations.
> **F.W8 owns the assertion only, and books no repair.**

Composed, never re-booked: **FR-AFP-10** (tier↔flag — *"Mark acceptable (save)"* never dequeues;
`set_tier` writes `{tier, updated_at}` only and the flagged listing has no tier predicate) and
**FR-AFP-70** (`handleSetTier` hardwired to `'saved'`, no inverse — an unrecoverable one-way write).

▲ **The admin arm's authority is inside the 0/45.** Every admin row is `ADMIN-TOKEN`-enforced and
**zero** of the 45 document it (register §3/§3.1) — which is exactly why **M4's assertion is the
walk's and not the register's**: *"auth parity cannot be specified over a surface documenting none,
and it cannot be ACCEPTED without the walk — the authenticated leg asserts, per operation, the
authority class F.W5's register declares."* §3's authority-class column is that per-operation
assertion, cell by cell. **F.W8 does not re-derive the 0/45 figure; it consumes it.**

---

## §7 G16's assertion, and the findings this walk surfaced

### 7.1 G16 — the admission horizon's only UI entry

**Witness (GCM-1 ⊕ VV-R2-B), re-resolved at this seat**: the modal's only CTA emits `image_slug`
(`GalleryCardModal.vue:273`) → `GalleryView.vue:421` (and the card leg `:395`)
`router.push('/w/${slug}')` → the **caller's IndexedDB draft**, hard-reset to defaults when absent,
writing a draft row keyed on **another user's** `image_slug`; the correct loader `loadVisualization`
(`stores/workspace.ts:211`) has **zero call sites outside its own store** (4 hits, all internal);
`stores/gallery.ts:256` bypasses the store's own `deleteVisualization` (`workspace.ts:409`).
**Data-dead today.**

> **THE ASSERTION (F.W8's half of G16; F.W4 owns the wiring):** opening a **published** visualization
> through the product's real entry point loads the **SAVED ENTITY** — not a draft — with its **slug
> and strong ETag captured into `visualizationSlug`/`visualizationETag`; it writes **NO cross-owner
> draft row**; and the **create → derive leg completes through that same entry point**. ▲ **Identity
> guard: BLK-1 and SS-C-1's read leg FOLD here and are NEVER re-booked.** ▲ **P4's adoption surface
> is read as ONE gap** — *"a single wiring unit at this component, not scattered repairs"* — and
> **F.W8 owns the acceptance assertion only**, claiming none of F.W4's wiring unit (FR-GIG-5).
> Sibling of F-α (F.W6): publishing twice yields two unrelated roots.

The value-side analogue is recorded for the register, not asserted as a fourier row: value.js's
mutating palette verbs already require a **strong `If-Match`** (`routes/crud.ts` PATCH, `publish.ts`,
and `POST /:slug/revert`, which the X-W3 · G-9 minute at `versions.ts:74-80` says was *"the only one
without a precondition"* until it gained one: absent → **428**, stale → **412**).

### 7.2 ⊘ FINDING — the palette remix client is bound to a route that is GONE

⟨cmd⟩ `grep -rn '/fork' demo/palettes/api/*.ts` → `versions.ts:48`
`return request(\`/palettes/${encodeURIComponent(slug)}/fork\`, {` — **singular**.
⟨cmd⟩ `grep -rn 'slug/fork' api/src/modules/palette/routes/forks.ts` → `:26`
`forksRouter.post("/:slug/forks", …)` — **plural** — under the file's own header at `:8-9`: *"X-W3 ·
G-12: the create verb is `POST /:slug/forks` — the plural collection the sibling GET already names.
The singular `POST /:slug/fork` is GONE."* The server's own contract tests exercise the plural
(`__tests__/palette-write-contract.test.ts:396`, `palettes-forks.test.ts:92`).

**Reading, stated with its scope:** the value-side remix/derive edge is **`CLIENTED–UNREACHABLE`** —
an existing client method whose path the server retired in the same commit that cured divergence (a)
(`22d2eb65`, X.A4). **F.W8 repairs nothing** (§1c) and writes no product byte; the row is **routed**
to the **value.js API row / X·V** as the owner of both the demo client and the route cure, and unit
`b` carries it as a register row whose fixture must be generated from the **operation** (the plural
route), never from the client union — which is precisely **J2's direction law**: *"a fixture generated
from the client union will never exercise the branch, so the bug is invisible to exactly the tests
meant to catch it."* ▲ **No credit is claimed for the plural-route cure; it is X.A4's.**

### 7.3 X-4 — the value-side history rail moved, and the walk binds to the new shape

`PaletteVersion._id` is now the **release** hash (*"the identity of the EVENT"* — palette slug +
`revisionNo` + payload + parent + author), `payloadHash` is the **content** hash (*"Two releases of
the same content share this value and differ in `_id`"*), and `revisionNo` is *"the version list's
TOTAL-ORDER key (with `_id` as tiebreak)"* — `model.ts:125-147`, X-W3 · G-7 / fold S-6. Legacy rows
keep a content-hash `_id` and **are not rewritten**. **Consequence for the walk, recorded as a
binding constraint on unit `b`'s fixtures**: the history leg orders by **`revisionNo`**, identifies
content by **`payloadHash`**, and treats `_id`/`hash` as **opaque** — *the rail is CHANGED–CONTESTED
and its shape may not be assumed*. The client's `listVersions` surfaces the server's
`{hash: v._id, …}` mapping (`routes/versions.ts:52`), so **`hash` at the client is the RELEASE hash**,
not the content hash — the exact assumption a naive fixture would invert.

### 7.4 The authority vocabulary has no member for value.js's mechanism

F.W5's register declares a **closed six-token** authority vocabulary, every token a measured
**fourier** mechanism. Value.js's `POST /:slug/revert` (and `/publish`, `/unpublish`) enforce
ownership through **declared route middleware** — `requireOwnership(paletteOwnerExtractor)` — plus a
strong `If-Match` precondition. That is neither `OWNER-IN-BODY` (fourier's owner checks are all
in-body) nor `SESSION-DECLARED` (which declares a session, not an owner). **This walk records the gap
and mints nothing**: the cell **H-V** carries the measured token **`OWNER-DECLARED`** marked as
**MEASURED, NOT REGISTERED**, and the question — *does the union's authority vocabulary gain a
declared-owner member, or is the value side mapped onto the existing six?* — is handed to unit `b`'s
register and unit `e`'s relay letter. **F.W8 rules nothing F.W5's ruling block owns.**

---

## §8 Gate readings — BEFORE → AFTER, with split verdicts

**The §4 reading discipline, binding:** *"a gate closes **for F.W8** when the fixture/assertion is
**authored with its disposition**; it goes **GREEN** only when the named owner lands the change.
F.W8 never claims a GREEN it did not execute."*

| gate | BEFORE (wave record §B.2) | AFTER, at this file's bytes | verdict |
|---|---|---|---|
| **G1** ⊙ TA-4 disposition declared | **RED** — ruled at §0j.D **F-SS4REST R1**, **undeclared** in any artefact of this wave | §1 declares branch **(b)** aloud — the diff leg is fourier-only, the verdict one-sided — and **every cell that touches diff carries the mark** (cells **X-F**, **X-V**; §4's diff row). Both limbs of the gate's *clears-when* are met: F.W5's G4 ruling **landed** (F.W5 CLOSED 2026-09-17, 22/22) **and** this wave now carries the explicit re-scope | **GREEN.** Under branch (b) there is no value-side byte left to land — the disposition **is** a ruling, and it is recorded, not re-ruled |
| **G2** five-verb walk has a client edge on both sides | **RED** — `union-prototype-walk.md` ABSENT ⇒ **0 of 10 cells** carry a disposition + authority class | **10 of 10 cells** carry a disposition **and** an authority class (§3), the authority classes consumed from F.W5's register on the fourier side and measured on the value side with the vocabulary gap named (§7.4) | **CLOSED FOR F.W8 (split verdict).** **NOT product-GREEN**: on the union's verb set **the fourier side still has zero client edges on diff · remix · history**, and the palette remix edge does not reach its route. GREEN owners: **F.W1/F.W4** (clients) · **fourier API row** (strikes) · **value.js API row** (the `/fork`→`/forks` edge) |
| **G16** the admission horizon's only UI entry loads the saved entity | **RED** — no assertion exists; witness data-dead | §7.1 authors the assertion in full — saved entity, **slug + strong ETag captured**, **no cross-owner draft row**, create → derive completing through the real entry point — over a witness **re-resolved at this seat** (`:273` → `:421`/`:395`; `loadVisualization` **0 external call sites**; `gallery.ts:256` bypass) | **CLOSED FOR F.W8 (split verdict).** **NOT product-GREEN**: the entry point is still data-dead. GREEN owner: **F.W4** (wiring); F.W8 owns the assertion only |

▲ **No gate measured GREEN before its cure, and no gate is discharged by an SS-13 probe** — this unit
ran none (probe parsimony §5.2: eleven bounded reads, zero live probes, zero runs).

---

## §9 Self-count — read from the settled bytes (SELF-COUNT law, double-run)

Measured **after** this file settled, by a seat that had already written it — the figures below are
read back from the bytes, never carried forward from the draft:

```
⟨cmd⟩ grep -c '^| \*\*[CDXRH]-[FV]\*\*' union-prototype-walk.md            → 10   (run2: 10)
⟨cmd⟩ grep -c '^| \*\*create\*\*\|^| \*\*derive\*\*\|^| \*\*diff\*\* ⊘\|^| \*\*remix\*\*\|^| \*\*history\*\*' union-prototype-walk.md
                                                                          → 5    (run2: 5)
⟨cmd⟩ grep -n 'ONE-SIDED (R1)' union-prototype-walk.md | cut -d: -f1
   → 104 · 194 · 204 · 429   (this seat, 2026-09-19, double-run identical)
```

**Ten cells** (five per object kind) · **five verb rows** at §4. ⊘ **The one-sided-diff mark is
published as a SET WITH ITS ADDRESSES, never as a bare integer, because the probe creates its own
hits.** At the dated reading above, the **substantive** set is three — **`104`** §1's declaration ·
**`194`** cell **X-F** · **`204`** cell **X-V** — and **`429`** is the **probe line of this section
itself**, which mints the token in the act of counting it. Residue disclosed rather than trimmed: a
later edit that adds or drops a substantive site surfaces as **an address outside §9 that a reader
can resolve**, never as a stale integer a reader must trust. *(The draft of this section named four
substantive sites and attributed the fourth to §4's diff row, which carries the bare **⊘** and not
the full form; the draft's own `grep -c` then became a fifth hit by being written down. Both errors
were caught by running the probe against the **settled bytes** rather than against the intention —
which is the whole of WRITE-THEN-MEASURE, and why the counting probe here is a `grep -n` over
addresses rather than a `grep -c` over a figure.)* Every figure
in this file is either **cited to its holder** (the 45-triple, the 36/9 split, the 0/45 security
figure — all F.W5's register) or **read from bytes this seat measured with the command printed
beside it**. **No percentage is published.**

---

## §10 What this file hands on

- **unit `b`** (the fixture register): the ten cells are the register's **row skeleton**; each
  fixture names the **operation model** its cell cites (G4), never the client type. Four constraints
  ride: the **`draft`/`private` token mapping** must be carried or struck (§5.1); the **history leg
  binds `revisionNo`/`payloadHash`** and treats `hash` as opaque (§7.3); the **`/fork`→`/forks`**
  unreachable edge is a register row generated from the **plural** route (§7.2); and the
  **`OWNER-DECLARED` vocabulary question** is the register's to answer or strike (§7.4).
- **unit `c`** (C31): cell **X-F**'s note that `/diff` is **not a general two-point diff** bounds any
  reproduction that touches the diff leg; the denominator stays **OWNER-FROZEN at 30/37** (OG-F1).
- **unit `d`** (the walk script + §R/§M/§D): §4's two inability rows — the dead `owner=="me"` branch
  and the list-contract intersection — mean the script **enumerates per-slug, never through the
  gallery list**, and **cannot run as the owning actor** until F.W3/W4's control lands. §5.2's
  half-and-half safety property is G10's input; §6's admin assertion rides the walk record.
- **unit `e`** (rulings, relay, closure): §7.4's vocabulary question and §5.1's token mapping are
  **relay items**, not rulings of this wave; §1's declaration is the **consumed** record of
  F-SS4REST R1 and is never re-ruled.

**F.W8 books no canonical row.** Every banked identity named in this file — GCM-1 · VV-R2-B ·
FR-GV-8 ⊕ FR-GV-27 · FR-GV-9 · FR-GV-13 · FR-GFC-4 · FR-GSB-1 · fr-GalleryInfiniteGrid `C-3`/`C-4`/`D-13`
· fr-GallerySearchBar `C-2` · fr-BasisSelector `M-10` · FR-GIG-5 · FR-AFP-10 · FR-AFP-70 · FR-GV-1 ·
BLK-1 · SS-C-1 · F-α · TA-4 · R-1..R-7 · R3-7b · R3-7c ⊕ X-3 — is a **CITATION to its holder**
(`CENSUS-CANONICAL.md` §2's `F.W5-W8` ⊕ `F.W5` rosters, held at **F-W5** per R4-10), **never a
booking**. The closure difference is **unit `e`'s** and is unrun here.
