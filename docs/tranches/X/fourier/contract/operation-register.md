SERVED MODEL: claude-opus-5[1m]

# operation-register.md — the 45-operation register

**Wave**: X.F.W5 unit **a** (Track C · X·F) · spec `docs/tranches/X/fourier/waves/F-W5.md` §1a `:64`, §1c
`:89` · record `docs/tranches/X/execution/C/F-W5.md` · rulings `docs/tranches/X/COHESION.md` §0j.D.
**Authored 2026-09-17** under the owner's begin-word.

**What this file is.** The greppable substrate for **G8** (an authority class on every row, R3-7b) and
**G9** (a client-edge disposition on every row, R3-7c), and the FILE whose existence is **G21**. Without
it G8/G9/G19 are prose — that is G21's whole subject, and it is why this artefact is *load-bearing for
gates*, not scope creep (§1a reconciliation note).

**What this file is NOT.** It **books nothing and rules nothing.** F.W5 does not repair (§0b); every act
named below is handed on with **one home and two citations**, and the clause that consumes a disposition
is unit **c**'s (§D1 keys to this register). Where a ruling already exists it is **quoted from COHESION
§0j.D and cited**, never re-derived. Where no ruling exists the cell states the **measured** basis and
stops.

---

## §0 Bases, and the measure-at-open declaration (D-19)

Every ⟨cmd⟩ in this file runs from **one** base, named at its site:

```
F='/Users/mkbabb/Programming/fourier-analysis'   # READ-ONLY, always (spec §1b)
V='/Users/mkbabb/Programming/value.js'
```

Bare `api/…` and `web/…` spellings below are read **under `$F`**, from `$F` as the working directory.
`$F` is **READ-ONLY**: every command in this file is a `grep`/`sed`/`ls`/`awk` read. F.W5 writes **zero
fourier bytes**.

▲ **EVERY FOURIER FIGURE IN THIS FILE IS MEASURED AT THIS SEAT'S OWN CLOCK (D-19), NEVER INHERITED.** The
`45 = 30 + 13 + 1 + 1` triple, the `36`/`9` split and the `7-of-13` figure are banked in the spec at §2 §D1
and at §3 G9; they are **re-measured here** and they reproduce. A figure that reproduces is still a
measurement, not a quotation — the distinction is the whole of D-19.

▲ **Every count below is double-run** (WRITE-THEN-MEASURE). Where a count is an **engine** fact the engine
is named: `/usr/bin/grep` (BSD) throughout, never the interactive `grep` (which on this host is a shell
function routing to `ugrep` — the §2 detector block's own hazard).

⊘ **THREE INSTRUMENT DEFECTS WERE FOUND IN THIS FILE'S OWN FIRST DRAFT AND ARE DISCLOSED, NOT QUIETLY
FIXED** — each was caught by re-running a receipt against the settled bytes before commit, which is the
only thing WRITE-THEN-MEASURE is for:

1. **`grep -r` over `api/` counts `__pycache__`.** The un-scoped ⟨cmd⟩ `/usr/bin/grep -rn
   '_readable_or_none' api/ | wc -l` returns **6** and `_write_root_version` returns **4** — one more each
   than the spec's banked **5** and **3** — because `grep -r` emits a `Binary file
   api/routers/__pycache__/visualizations.cpython-314.pyc matches` line for an untracked build artefact.
   **Every such probe here carries `--include='*.py'`**, and both then reproduce the banked figures exactly
   (5 · 3, double-run). A `.pyc` inflating a source count by one is the phantom-receipt class in
   miniature: the digit is wrong and the command still "works".
2. **An export grep is not an edge count.** `api.ts` exports **39** functions, five of which bear no
   operation (§4.1 enumerates them). The 36 is self-counted from this register's own rows.
3. **A docstring quotation must be quoted at its line.** The sunset clause at row 45 wraps across two
   source lines; the re-flowed rendering failed a `grep -F` of itself and was replaced by the single line
   that carries it (§4.2, row 45).

**No figure published below is one that failed to reproduce.**

---

## §1 The counting lock K-1, and the triple

### 1.1 The triple, at the spec's own words

Spec §2 §D1's lock, quoted: ***"CENSUS CORRECTION FORCED (C-3): both sides were right on different
denominators — never cite "30" as the whole API again. The triple is 45 = 30 public-non-admin + 13 admin +
1 app + 1 gallery."*** ⟨cmd⟩ `/usr/bin/grep -c -F 'The triple is 45 = 30 public-non-admin + 13 admin + 1
app + 1 gallery' "$V"/docs/tranches/X/fourier/waves/F-W5.md` → **1** (this seat, 2026-09-17, double-run).

**The four arms are therefore NAMED, not merely sized** — which is what makes the decomposition
falsifiable:

| arm | size | what it is | measured |
|---|---|---|---|
| **public-non-admin** | **30** | every route under `visualizations` · `contours` · `equations` · `images` · `sessions` — the five routers that bind the bare name `router` | ⟨cmd⟩ `/usr/bin/grep -rE '^@router\.(get\|post\|put\|patch\|delete)\(' api/routers/ \| wc -l` → **30** |
| **admin** | **13** | every route on `admin_router` (`prefix="/api/admin"`) | ⟨cmd⟩ `/usr/bin/grep -cE '^@admin_router\.' api/routers/admin.py` → **13** |
| **app** | **1** | the one route bound on the FastAPI app itself, outside `api/routers/` | ⟨cmd⟩ `/usr/bin/grep -cE '^@app\.(get\|post)\(' api/main.py` → **1** |
| **gallery** | **1** | the one route on `gallery_router` (`prefix="/api/gallery"`) | ⟨cmd⟩ `/usr/bin/grep -cE '^@gallery_router\.' api/routers/gallery.py` → **1** |

`30 + 13 + 1 + 1 = 45`, and the independent total closes: ⟨cmd⟩
`/usr/bin/grep -rE '^@[a-z_]*router\.(get|post|put|patch|delete)\(' api/routers/ | wc -l` → **44**, plus
the one `@app` route → **45**. Both runs identical (`run1` ≡ `run2`, §6).

### 1.2 K-1, reproduced as a live trap rather than quoted as a warning

Spec §2 §D1's second lock, quoted: ***"COUNTING LOCK K-1 (server-side blindness): a `@router.` grep is
BLIND to prefixed routers (`@gallery_router.get("/cursor")`) — read against 13/44, never as zero."***

**The trap fires at this seat, and this is its receipt.** The naive instrument is the bare-name probe:

- ⟨cmd⟩ `/usr/bin/grep -rE '^@router\.(get|post|put|patch|delete)\(' api/routers/ | wc -l` → **30**
- ⟨cmd⟩ `/usr/bin/grep -cE '^@router\.' api/routers/admin.py` → **0** ← **the zero K-1 forbids**
- ⟨cmd⟩ `/usr/bin/grep -cE '^@router\.' api/routers/gallery.py` → **0** ← the same blindness, one row wide
- ⟨cmd⟩ `/usr/bin/grep -cE '^@admin_router\.' api/routers/admin.py` → **13** ← **read against 13/44**

So a `@router.`-keyed census reads the admin arm as **zero of 44** where the truth is **13 of 44**, and
the gallery arm as zero where the truth is one. The lock is honoured in the only way a lock of this shape
can be: **the register is keyed on `@[a-z_]*router\.` ⊕ `@app\.`, not on `@router\.`**, and the naive
probe's `30` appears in this file **only** as the public-non-admin arm — never as a total. ▲ **"30" is
never cited here as the whole API** (C-3).

### 1.3 The `13` collision, disclosed rather than relied upon

⊘ **The token `13` is ambiguous in the triple, and a seat that does not say so is trusting a coincidence.**
Two arms of this API have thirteen operations: **admin** (13) and **visualizations** (13). `45 = 30 + 13 +
1 + 1` therefore has a *second* arithmetically valid partition — {admin ⊕ contours ⊕ equations ⊕ images ⊕
sessions} = 30, {visualizations} = 13, gallery = 1, app = 1 — which sums identically and would put a
**different** thirteen rows in the second arm.

**It is not the spec's.** §D1 spells the first arm ***"30 public-non-admin"***, and the admin arm ***"13
admin"***; the public-non-admin 30 *contains* visualizations' 13 and *excludes* admin's. The partition
used here is §D1's, at §D1's words. The collision is recorded because an id-keyed or size-keyed check that
matched on `13` alone would read the wrong arm as agreeing — the K-1 class of failure one level up, and
exactly the hazard the spec's own collider roster exists to name. **No count in this file is verified by
its size alone**; every arm is verified by its named instrument in §1.1.

### 1.4 Triumvirate status

The register agrees with the `45 / 30 / 13` triple at the **first** reading, on all four arms, on both
runs. **Zero disagreements. The third-iteration halt (§1c) is not approached.**

---

## §2 The register — 45 rows, one per operation

**Key — authority class (R3-7b → G8), a closed six-token vocabulary, each token a measured mechanism:**

| token | mechanism, as measured |
|---|---|
| `ADMIN-TOKEN` | `dependencies=[Depends(admin_required)]` declared **at the decorator** |
| `SESSION-DECLARED` | `Depends(require_session)` declared **in the handler signature** |
| `SESSION-IN-BODY` | no declared dependency; the body calls `resolve_session` and 401s via `errors.owner_required` — **a session is required, ownership is not compared** |
| `OWNER-IN-BODY` | no declared dependency; the body calls `resolve_session` **and** compares `doc["owner_slug"]`, 403ing via `errors.not_owner` |
| `VIEWER-SCOPED` | `resolve_session` is called to compute a **viewer** for visibility gating; **no session is required and no 401 is possible** |
| `ANONYMOUS` | **no authority mechanism of any kind** in the decorator, the signature or the body |

**Key — client-edge disposition (R3-7c → G9), the three-token gap vocabulary G9's cell names, plus the
non-gap token:**

| token | meaning |
|---|---|
| `CLIENTED` | a client function exists for this operation (**not** a claim that it is reached — see §4.3) |
| `CLIENTABLE` | **gap**; the operation wants a client edge. Home named in §4.2 |
| `STRUCK` | **gap**; the operation is dispositioned out of the contract. Home named in §4.2 |
| `SERVER-ONLY` | **gap**; deliberately no client edge, and the deliberateness is stated |

**`†`** = the client function is a **URL builder**, not a fetcher — a **template-bound** edge, structurally
invisible to a function-keyed model unless enumerated; see **§5** (F-6, the client-side blindness lock).
**`‡`** = the client function has **zero call sites outside `web/src/lib/api.ts`** (a B4 LIVENESS
candidate, disclosed at §4.3 — **cited, not booked**).

### 2.1 Rows 1–30 · arm `public-non-admin`

| # | arm | method | path | handler (`api/routers/…`) | authority class | client function | disposition |
|---|---|---|---|---|---|---|---|
| 1 | public-non-admin | POST | `/api/visualizations` | `visualizations.py` `create_visualization` | `SESSION-IN-BODY` | `createVisualization` | `CLIENTED` |
| 2 | public-non-admin | GET | `/api/visualizations/{slug}` | `visualizations.py` `get_visualization` | `VIEWER-SCOPED` | `getVisualization` | `CLIENTED` |
| 3 | public-non-admin | GET | `/api/visualizations` | `visualizations.py` `list_visualizations` | `VIEWER-SCOPED` | `listVisualizations` | `CLIENTED` |
| 4 | public-non-admin | PATCH | `/api/visualizations/{slug}` | `visualizations.py` `update_visualization` | `OWNER-IN-BODY` | `updateVisualization` | `CLIENTED` |
| 5 | public-non-admin | DELETE | `/api/visualizations/{slug}` | `visualizations.py` `delete_visualization` | `OWNER-IN-BODY` | `deleteVisualization` | `CLIENTED` |
| 6 | public-non-admin | POST | `/api/visualizations/{slug}/restore` | `visualizations.py` `restore_visualization` | `OWNER-IN-BODY` | `restoreVisualization` | `CLIENTED` |
| 7 | public-non-admin | POST | `/api/visualizations/{slug}/remix` | `visualizations.py` `remix_visualization` | `SESSION-IN-BODY` | — | `CLIENTABLE` |
| 8 | public-non-admin | POST | `/api/visualizations/{slug}/publish` | `visualizations.py` `publish_visualization` → `_visibility_verb` | `OWNER-IN-BODY` | — | `CLIENTABLE` |
| 9 | public-non-admin | POST | `/api/visualizations/{slug}/unpublish` | `visualizations.py` `unpublish_visualization` → `_visibility_verb` | `OWNER-IN-BODY` | — | `CLIENTABLE` |
| 10 | public-non-admin | GET | `/api/visualizations/{slug}/forks` | `visualizations.py` `list_forks` | `ANONYMOUS` | — | `CLIENTABLE` |
| 11 | public-non-admin | GET | `/api/visualizations/{slug}/provenance` | `visualizations.py` `get_provenance` | `VIEWER-SCOPED` | — | `CLIENTABLE` |
| 12 | public-non-admin | GET | `/api/visualizations/{slug}/diff` | `visualizations.py` `get_diff` | `VIEWER-SCOPED` | — | `CLIENTABLE` |
| 13 | public-non-admin | GET | `/api/visualizations/{slug}/versions` | `visualizations.py` `list_versions` | `VIEWER-SCOPED` | — | `CLIENTABLE` |
| 14 | public-non-admin | POST | `/api/contours` | `contours.py` `save_contour` | `ANONYMOUS` | `saveContour` | `CLIENTED` |
| 15 | public-non-admin | GET | `/api/contours/{contourHash}` | `contours.py` `get_contour_endpoint` | `ANONYMOUS` | `getContour` | `CLIENTED` |
| 16 | public-non-admin | POST | `/api/contours/{contourHash}/compute/epicycles` | `contours.py` `compute_epicycles` | `ANONYMOUS` | `computeEpicycles` | `CLIENTED` |
| 17 | public-non-admin | POST | `/api/contours/{contourHash}/compute/bases` | `contours.py` `compute_bases` | `ANONYMOUS` | `computeBases` | `CLIENTED` |
| 18 | public-non-admin | POST | `/api/equations/compute` | `equations.py` `compute_equation` | `ANONYMOUS` | `computeEquation` | `CLIENTED` |
| 19 | public-non-admin | POST | `/api/equations/simplify` | `equations.py` `simplify_coefficients` | `ANONYMOUS` | `simplifyCoefficients` | `CLIENTED` |
| 20 | public-non-admin | POST | `/api/images` | `images.py` `upload_image` | `ANONYMOUS` | `uploadImage` | `CLIENTED` |
| 21 | public-non-admin | GET | `/api/images/by-hash/{sha256}` | `images.py` `get_image_by_hash` | `ANONYMOUS` | `checkImageHash` ‡ | `CLIENTED` |
| 22 | public-non-admin | GET | `/api/images/{imageSlug}` | `images.py` `get_image_metadata` | `ANONYMOUS` | `getImageMeta` | `CLIENTED` |
| 23 | public-non-admin | GET | `/api/images/{imageSlug}/blob` | `images.py` `get_image_blob` | `ANONYMOUS` | `imageUrl` † ‡ | `CLIENTED` |
| 24 | public-non-admin | GET | `/api/images/{imageSlug}/thumbnail` | `images.py` `get_image_thumbnail` | `ANONYMOUS` | `thumbnailUrl` † | `CLIENTED` |
| 25 | public-non-admin | GET | `/api/images/{imageSlug}/overlay` | `images.py` `get_image_overlay` | `ANONYMOUS` | `overlayUrl` † | `CLIENTED` |
| 26 | public-non-admin | POST | `/api/images/{imageSlug}/extract-contour` | `images.py` `extract_contour` | `ANONYMOUS` | `extractContour` | `CLIENTED` |
| 27 | public-non-admin | POST | `/api/sessions` | `sessions.py` `register` | `ANONYMOUS` | `createSession` | `CLIENTED` |
| 28 | public-non-admin | POST | `/api/sessions/login` | `sessions.py` `login` | `ANONYMOUS` | `loginWithSlug` | `CLIENTED` |
| 29 | public-non-admin | GET | `/api/sessions/me` | `sessions.py` `me` | `SESSION-DECLARED` | `getMe` ‡ | `CLIENTED` |
| 30 | public-non-admin | DELETE | `/api/sessions` | `sessions.py` `logout` | `ANONYMOUS` | `deleteSession` | `CLIENTED` |

**Row 30 authority note (measured, not ruled).** `logout` is classed `ANONYMOUS` because it declares and
enforces nothing: ⟨cmd⟩ `/usr/bin/sed -n '92,99p' api/routers/sessions.py` → the body reads
`token = request.headers.get("X-Session-Token")` and, if present, `await db.sessions.delete_one({"_id":
token})`. The token is consumed **by value as a key**, never validated, and the handler returns
`{"ok": True}` on the empty-token path too. This is a **contract fact about `/api/sessions`**, recorded
here for unit c's §C3 (session truth) and §C1 (authority class per operation). **The register rules
nothing about it.**

### 2.2 Rows 31–43 · arm `admin`

Every row: `prefix="/api/admin"` on `admin_router`, `dependencies=[Depends(admin_required)]` declared at
the decorator, and a client function on `adminFetch`. ⟨cmd⟩
`/usr/bin/grep -cE '^@admin_router\.' api/routers/admin.py` → **13**; ⟨cmd⟩
`/usr/bin/grep -c 'Depends(admin_required)' api/routers/admin.py` → **14** = the 13 decorators ⊕ one
docstring mention at `:23` (disclosed so the figure is read as what it is, not as a fourteenth route).

| # | arm | method | path | handler (`api/routers/admin.py`) | authority class | client function | disposition |
|---|---|---|---|---|---|---|---|
| 31 | admin | GET | `/api/admin/verify` | `admin_verify` | `ADMIN-TOKEN` | `verifyAdmin` | `CLIENTED` |
| 32 | admin | GET | `/api/admin/stats` | `admin_stats` | `ADMIN-TOKEN` | `getAdminStats` | `CLIENTED` |
| 33 | admin | PUT | `/api/admin/visualizations/{slug}/tier` | `set_tier` | `ADMIN-TOKEN` | `setVisualizationTier` | `CLIENTED` |
| 34 | admin | DELETE | `/api/admin/visualizations/{slug}` | `delete_visualization` | `ADMIN-TOKEN` | `adminDeleteVisualization` | `CLIENTED` |
| 35 | admin | GET | `/api/admin/users` | `list_users` | `ADMIN-TOKEN` | `listAdminUsers` | `CLIENTED` |
| 36 | admin | POST | `/api/admin/users/{slug}/status` | `set_user_status` | `ADMIN-TOKEN` | `setAdminUserStatus` | `CLIENTED` |
| 37 | admin | DELETE | `/api/admin/users/{slug}` | `delete_user` | `ADMIN-TOKEN` | `deleteAdminUser` | `CLIENTED` |
| 38 | admin | POST | `/api/admin/users/prune-empty` | `prune_empty_users` | `ADMIN-TOKEN` | `pruneEmptyUsers` | `CLIENTED` |
| 39 | admin | POST | `/api/admin/visualizations/batch` | `batch_visualizations` | `ADMIN-TOKEN` | `batchGallery` | `CLIENTED` |
| 40 | admin | POST | `/api/admin/users/batch` | `batch_users` | `ADMIN-TOKEN` | `batchUsers` | `CLIENTED` |
| 41 | admin | GET | `/api/admin/flagged` | `list_flagged` | `ADMIN-TOKEN` | `listFlaggedVisualizations` | `CLIENTED` |
| 42 | admin | DELETE | `/api/admin/visualizations/{slug}/flags` | `dismiss_flags` | `ADMIN-TOKEN` | `dismissVisualizationFlags` | `CLIENTED` |
| 43 | admin | GET | `/api/admin/audit` | `list_audit` | `ADMIN-TOKEN` | `listAuditLog` | `CLIENTED` |

▲ **The producer gap is a PROPERTY OF THIS ARM, and the register states it without booking it.** Rows 41
and 42 are the *entire* live surface of the `flags` collection; there is **no producer operation** in this
register — no row anywhere in the 45 writes a flag. That absence is **D3 / G11, THE ADMISSION GATE**,
**ruled PRODUCER-as-port at COHESION §0j.D F-PRODRET** (a port of value.js's shipped `POST /:slug/flag`,
homed at **F.W8**, with **F.W5 writing the clause** — unit **c**'s act, not this file's). The register's
only contribution is the enumeration that makes the absence checkable: **41 and 42 exist; their producer
does not.**

### 2.3 Row 44 · arm `app`

| # | arm | method | path | handler | authority class | client function | disposition |
|---|---|---|---|---|---|---|---|
| 44 | app | GET | `/api/health` | `api/main.py` `health` | `ANONYMOUS` | — | `SERVER-ONLY` |

### 2.4 Row 45 · arm `gallery`

| # | arm | method | path | handler | authority class | client function | disposition |
|---|---|---|---|---|---|---|---|
| 45 | gallery | GET | `/api/gallery/cursor` | `api/routers/gallery.py` `list_public_gallery` | `ANONYMOUS` | — | `STRUCK` |

---

## §3 G8 — the authority-class tally (R3-7b)

**Every one of the 45 rows carries an authority class.** ⟨cmd⟩ self-count at §6.

| authority class | rows | which |
|---|---|---|
| `ADMIN-TOKEN` | **13** | 31–43 (the whole admin arm) |
| `SESSION-DECLARED` | **1** | 29 (`GET /api/sessions/me`) |
| `SESSION-IN-BODY` | **2** | 1 (create), 7 (remix) |
| `OWNER-IN-BODY` | **5** | 4 (patch), 5 (delete), 6 (restore), 8 (publish), 9 (unpublish) |
| `VIEWER-SCOPED` | **5** | 2, 3, 11, 12, 13 |
| `ANONYMOUS` | **19** | 10, 14–28, 30, 44, 45 |
| **total** | **45** | |

`13 + 1 + 2 + 5 + 5 + 19 = 45`.

### 3.1 The gate's own witness, reproduced: OpenAPI security **0 / 45**

G8's born-RED witness is *"OpenAPI security **0/45**"*. It reproduces at this seat, and the **mechanism**
is now enumerable rather than asserted: ⟨cmd⟩
`/usr/bin/grep -rE 'HTTPBearer|APIKeyHeader|OAuth2|SecurityScopes|security=|openapi_extra|Security\(' api/ --include='*.py' | wc -l`
→ **0** (double-run). Neither authority mechanism in this register is a FastAPI *security scheme*: ⟨cmd⟩
`/usr/bin/grep -rn 'def admin_required\|def require_session\|def resolve_session' api/` →
`api/dependencies.py:262` · `:254` · `:206`, all plain `async def …(request: Request)` readers. A plain
`Request` reader emits **no `security` block**, so **all 45 operations document zero authority** while
**26 of 45 enforce some**. ▲ **That gap — enforced-but-undocumented — is the R3-7b contract defect in its
exact shape**, and this table is the surface on which a conformance probe can now check it row by row.

### 3.2 The two authority decisions G8's close names

G8's F.W5 close is *"**EVERY row of `operation-register.md` carries an authority class**; the
`save_contour` and image-GET decisions are made"*. The register's half — the classes — is landed above.
The **decisions** are §C1's, unit **c**'s. What the register hands unit c is the measured ground:

- **`save_contour`** = row **14**, `ANONYMOUS` — ⟨cmd⟩ `/usr/bin/sed -n '21,22p' api/routers/contours.py` →
  `@router.post("")` / `async def save_contour(req: SaveContourRequest):` — **no `Depends`, no `Header`, no
  `Request` parameter**, and `router = APIRouter(prefix="/api/contours", tags=["contours"])` at `:18`
  declares **no `dependencies=`**. It is an **unauthenticated write** (spec §C1's *"unauthenticated write
  with a client that always authenticates"*).
- **the image GETs** = rows **23 · 24 · 25**, all `ANONYMOUS`, and all three reached **only** through a
  URL builder (§5). Row 23 additionally has **zero consumers** (§4.3). ⟨cmd⟩
  `/usr/bin/grep -n 'Cache-Control' api/routers/images.py` → **4 lines**, spelled as what they are: **three
  header sites** — `:145` (blob) · `:164` (thumbnail) · `:205` (overlay), each `{"Cache-Control": "public,
  max-age=86400"}` — ⊕ **one comment**, `:138`. All three of the register's image GETs are therefore
  `ANONYMOUS` *and* publicly cacheable for a day, which is the §C2 posture in its exact shape.

**The register makes neither decision.** It makes both *checkable*.

---

## §4 G9 — the client-edge disposition (R3-7c ⊕ X-3)

### 4.1 The 36 / 9 split, measured at open

**Every one of the 45 rows carries a disposition.** The split, measured at this seat:

| disposition | rows | |
|---|---|---|
| `CLIENTED` | **36** | the operations for which a client function exists |
| `CLIENTABLE` | **7** | 7, 8, 9, 10, 11, 12, 13 |
| `STRUCK` | **1** | 45 |
| `SERVER-ONLY` | **1** | 44 |
| **total** | **45** | **36 client edges / 9 gap operations** |

The 36 are **one-to-one with 36 exported client functions**, so the figure is checkable from the client
side as well as the server side. ⊘ **The naive client-side instrument OVER-counts, and the correction is
published rather than the convenient figure**: ⟨cmd⟩
`/usr/bin/grep -cE '^export (async )?function ' web/src/lib/api.ts` → **39**, not 34 — because **five of
the thirty-nine bear no operation**, and they are enumerated rather than subtracted in silence:
`setSessionToken` `:44` · `abortInflight` `:61` · `isAbortError` `:69` · `apiFetch` `:215` (the transport
core itself) · `computeSha256` `:260` (a local digest, no request). `39 − 5 = 34` operation-bearing
functions, ⊕ ⟨cmd⟩ `/usr/bin/grep -cE '^export (async )?function ' web/src/lib/equation/api.ts` → **2**
(`computeEquation` · `simplifyCoefficients`) = **36** (double-run). Each of the 36 is named in §2's
`client function` column and **no function appears twice**; the authoritative count of the 36 is §6's
self-count over this file's own rows, not the export grep, precisely because the export grep counts
transport helpers as though they were edges.

**SEVEN of thirteen `/api/visualizations` operations have zero client function** — rows **7–13**: `remix`,
`publish`, `unpublish`, `forks`, `provenance`, `diff`, `versions`. ⟨cmd⟩
`/usr/bin/grep -rniE '/api/visualizations/\$\{[a-z]+\}/(remix|publish|unpublish|forks|provenance|diff|versions)' web/src | wc -l`
→ **0** (double-run). Thirteen minus six clientted (rows 1–6) = **seven**. The spec's
*"three independent counts agree"* is now a fourth agreeing count, taken independently at this clock.

▲ **The seven unclientted operations ARE the provenance surface v2 re-authors** (§D1). That is why every
one of them disposes `CLIENTABLE` and none disposes `STRUCK`.

### 4.2 The nine gap dispositions, each with its basis and its ONE home

| # | operation | disposition | basis (measured ⊕ ruled) | home (one) | citations (two) |
|---|---|---|---|---|---|
| 7 | `POST …/{slug}/remix` | `CLIENTABLE` | **RULED**: COHESION §0j.D **F-SS4REST R8 — REMIX + BORN-PRIVATE**. A ruled verb with no client edge is a client gap, not a strike. Measured: the handler is `SESSION-IN-BODY` and fully implemented (`_readable_or_none` → atom enumeration → child insert) | **F.W1/F.W4** (the client) | spec §3 G9 green-owner cell · §2 §E4 (E4 = R8) |
| 8 | `POST …/{slug}/publish` | `CLIENTABLE` | **RULED**: R8's *"explicit publish act"* — born-private is unreachable as a product without it. Measured, and the spec's §D1 witness reproduces: the client publishes by **PATCHing `{visibility:"public"}` behind an extra GET** — ⟨cmd⟩ `/usr/bin/sed -n '219,231p' web/src/stores/gallery.ts` → `publish()` = `getVisualization` (for the ETag) then `updateVisualization(slug, { visibility: "public" }, etag)` — **while the dedicated verb ships with no wrapper** | **F.W1/F.W4** | §2 §D1 witness · §0j.D F-SS4REST R8 |
| 9 | `POST …/{slug}/unpublish` | `CLIENTABLE` | Same family as 8; the verb is implemented and unwrapped. ⊘ **D9 DIVERGENCE, DISCLOSED NOT RESOLVED**: the server's unpublish target is **`unlisted`** — ⟨cmd⟩ `/usr/bin/grep -n 'target = "unlisted"' api/routers/visualizations.py` → `647:        target = "unlisted" if current == "public" else current` — while **ruling D9** (`docs/tranches/V/DECISIONS.md` §2 row `D9`, rooted at spec §2) rules *"The unused `unlisted` state dies."* Per that rooting the reconciliation is **the value.js API row's obligation**, *"never a silent contract overwrite, and never a fourier defect"*. The register records the divergence and rules nothing | **F.W1/F.W4** (the edge) · the **value.js API row** (the D9 reconciliation) | spec §2 D9 rooting · §0j.D F-SS4REST R8 |
| 10 | `GET …/{slug}/forks` | `CLIENTABLE` | **Measured**: the write side ships and the read side has no reader. `fork_count` is bumped by remix; ⟨cmd⟩ `/usr/bin/grep -n 'SortKey' api/lib/crud/cursors.py` → `:17` `SortKey = Literal["newest","popular","most-forked","views","likes"]` — **`most-forked` is a live sort key**, so the counter is *sorted on* while the children list it counts has **zero client function**. `ANONYMOUS`, cursor-paginated, fully implemented | **F.W1/F.W4** | spec §2 §D1 (*"the most-forked write-side consumer"*) · §3 G9 |
| 11 | `GET …/{slug}/provenance` | `CLIENTABLE` — **SEQUENCED BEHIND §C5** | **Measured**: `VIEWER-SCOPED`, implemented, zero client function. ▲ The sequencing is not caution, it is **G6's witness**: ⟨cmd⟩ `/usr/bin/grep -rn '_readable_or_none' api/ --include='*.py' \| wc -l` → **5** (`visualizations.py:466` def · `:507` remix · `:744` provenance · `:816` diff · `:869` versions), all on the ENTRY row — the breadcrumb applies **no redaction**, so a bare `find_one` emits a **private ancestor's** `slug`/`set_hash`/`author_slug`/`created_at`. Clienting this edge before §C5's redaction clause lands would ship that leak to a rendered surface | **F.W1/F.W4** (the edge) · **§C5** (the redaction clause, unit c) | spec §2 §C5 · §3 G6 |
| 12 | `GET …/{slug}/diff` | `CLIENTABLE` | **Measured**: the recorded atom-diff is **write-only today**. ⟨cmd⟩ `/usr/bin/sed -n '820,823p' api/routers/visualizations.py` → `recorded_ops = [AtomOp(**op) for op in (head_version or {}).get("atom_diff", [])]` — `/diff` is the **only reader** of the `atom_diff` that `remix` writes, and it has zero client function. ⊘ **Scope note**: COHESION §0j.D **F-SS4REST R1** re-scopes **value.js** out of the diff clause (`atomdiff.ts` stays wholly excised); it says nothing about fourier's own `/diff`, and this row must not be read as reviving it. The §6 verdict is **one-sided** — unit c's §E3 | **F.W1/F.W4** | §0j.D F-SS4REST R1 · spec §2 §E3 / §3 G4 ⊕ G18 |
| 13 | `GET …/{slug}/versions` | `CLIENTABLE` — **SEQUENCED BEHIND §E2** | **Measured**: `VIEWER-SCOPED`, implemented, zero client function — and the list it returns is an **always-singleton**: ⟨cmd⟩ `/usr/bin/grep -rn '_write_root_version' api/ --include='*.py' \| wc -l` → **3** (`routers/visualizations.py:110` def · `:220` create · `:592` remix — the ONLY writer), every row born `parent_hash=None, depth=0`. Clienting a provably-singleton history today would ship a **dead affordance** — the same bar §D2/R4 applies to the like verb. §E2's **deepen-or-retire** decides what the chain is; **F.W6 owns the burn-down** (X-8) | **F.W1/F.W4** (the edge) · **§E2** (the clause, unit c) · **F.W6** (the burn-down) | spec §3 G3 · §2 §E2 |
| 45 | `GET /api/gallery/cursor` | `STRUCK` | **Measured, from the route's own docstring — its stated reason to exist has expired.** The sunset clause is **one wrapped line of the module docstring**, so it is quoted at the ONE line that carries it rather than as a re-flowed span (a quotation that cannot survive a `grep -F` of itself is not carrying its source): ⟨cmd⟩ `/usr/bin/grep -n -F 'stable frontend-facing path while the consumer migration (B.W4) re-points the' api/routers/gallery.py` → **`:8`**, whose bytes read *"stable frontend-facing path while the consumer migration (B.W4) re-points the"* and whose next line completes it, *"web client onto ``/api/visualizations``."* ⊘ The re-flowed form this cell first carried (*"…kept as the stable frontend-facing path while…"*) returned **0** under `grep -c -F` — corrected before this file was committed. The migration has happened: ⟨cmd⟩ `/usr/bin/grep -rn '/api/gallery' web/src \| wc -l` → **0** (double-run), and row 3 (`GET /api/visualizations`) is the live public list the client uses. An alias with zero consumers and a satisfied sunset condition is **struck**, not clientable | the **fourier API row** (G9's green-owner cell names the strikes' owner) | §3 G9 green-owner · spec §2 §D2 (`gallery.py:3`'s carve-out assertion) |
| 44 | `GET /api/health` | `SERVER-ONLY` | **Measured**: ⟨cmd⟩ `/usr/bin/sed -n '125,128p' api/main.py` → `@app.get("/api/health")` / `async def health(): return {"status": "ok"}` — a liveness probe with no authority, no parameters and no payload. ⟨cmd⟩ `/usr/bin/grep -rn '/api/health\|healthz' web/src \| wc -l` → **0**. Its consumer is the deployment, not the SPA; **the absence of a client edge is the design**, and stating so is what `SERVER-ONLY` is for | the **fourier API row** (no act owed) | §3 G9 disposition vocabulary |

▲ **Nine gap operations, nine dispositions, zero blanks.** No row carries two dispositions; where a
disposition is *sequenced*, the sequencing lives in the basis cell and the disposition cell holds exactly
one token — so an id-keyed or token-keyed check reads one answer per row.

### 4.3 ‡ — three `CLIENTED` rows whose client function has ZERO consumers (cited, NOT booked)

`CLIENTED` asserts that a client function **exists**, never that anything calls it. Three rows separate:

| # | operation | client function | external call sites | |
|---|---|---|---|---|
| 21 | `GET /api/images/by-hash/{sha256}` | `checkImageHash` | **0** | measured this seat |
| 23 | `GET /api/images/{imageSlug}/blob` | `imageUrl` | **0** | measured this seat |
| 29 | `GET /api/sessions/me` | `getMe` | **0** | reproduces the spec's §C3 banked witness (*"`getMe` has zero call sites"*) |

⟨cmd⟩ (per name) `/usr/bin/grep -rw '<fn>' web/src --include='*.ts' --include='*.vue' | /usr/bin/grep -cv 'lib/api.ts'` → **0 · 0 · 0** (double-run).

▲ **This is §B4's LIVENESS class — declared on both sides, reached from neither — and it is CITED, NOT
BOOKED.** §B4's **one home** is the v2 clause unit **b** writes; §C3 holds `getMe`'s session limb. Rows 21
and 23 are offered to §B4 as **two further instances measured at this seat**, carrying no id and claiming
no repair. **F.W5 claims credit for none of them** (§0b, FR-GIG-5's bar).

### 4.4 F-6's INVERTED lock — why `CLIENTED` is not a claim about reach

Spec §2 §D1's second blindness lock, quoted: ***"the template-`src`-binding operation edge is structurally
invisible to a function-keyed operation↔client model (the R5-7 dual)"*** — and its consequence for this
file, in the spec's own words: ***"The register enumerates template-bound edges explicitly or it is armed
against server under-count and unarmed against client under-count."*** §5 is that enumeration. F-6's own
severity stays **INFO / NO-WAVE-OWNER**; this register consumes it as a **construction constraint** and
**books no repair**.

---

## §5 The template-bound edges, enumerated explicitly (F-6 — the client under-count arm)

The register is **function-keyed**: one row per operation, an edge recognised by a client function. Three
of the 36 `CLIENTED` rows are reached through a client function that is **not a fetcher** — it returns a
URL string that lands in an `src`. Those edges never traverse `coreFetch`, so they carry **no abort key,
no 429 posture, no envelope, no validation** — and a `coreFetch`-keyed census would miss them entirely.
**They are enumerated here so the register is armed at both ends.**

| row | operation | builder (`web/src/lib/api.ts`) | consuming sites, measured this seat |
|---|---|---|---|
| 24 | `GET /api/images/{imageSlug}/thumbnail` | `thumbnailUrl` `:293` | **3** — `gallery/GalleryCard.vue:100` `:src` · `gallery/GalleryDraftsSection.vue:77` `:src` · `ImageUpload.vue:65` `:src` |
| 25 | `GET /api/images/{imageSlug}/overlay` | `overlayUrl` `:297` | **3** — `gallery/GalleryCardModal.vue:79` `:src` · `composables/useImageOverlay.ts:69` `img.src = …` · `ContourEditorCanvas.vue:95` (computed → template `src`) |
| 23 | `GET /api/images/{imageSlug}/blob` | `imageUrl` `:289` | **0** — the builder exists and **nothing calls it** (§4.3 ‡) |

**Six consuming sites across two operations; a third operation's builder is unconsumed.** ⟨cmd⟩
`/usr/bin/grep -rn 'thumbnailUrl\|imageUrl(\|overlayUrl' web/src --include='*.ts' --include='*.vue'` →
**15 lines** = 3 definitions ⊕ 6 imports ⊕ 6 consuming sites (double-run).

⊘ **Two further `:src` bindings exist in `web/src` and are NOT operation edges** — ⟨cmd⟩
`/usr/bin/grep -rnE ':src="' web/src --include='*.vue' | wc -l` → **6**, of which
`paper/PaperArticleWindow.vue:97` (a bundled figure `.png`) and `layout/AppHeader.vue:79` (a bundled
avatar `.png`) resolve to **static assets, not to the API**. They are named here because a
`:src`-counting probe returns 6 and only 4 of those 6 are API edges: **the instrument over-counts in the
direction F-6 warns about under-counting**, and a receipt that printed 6 without the split would be
manufacturing two phantom edges. The two non-API bindings enter no count in this file.

---

## §6 Self-count — read from the settled bytes (SELF-COUNT law, double-run)

Run from `$V` after this file settled; `$V` as declared at §0.

| what | ⟨cmd⟩ | run 1 | run 2 |
|---|---|---|---|
| register rows | `/usr/bin/grep -cE '^\| [0-9]+ \| (public-non-admin\|admin\|app\|gallery) \|' docs/tranches/X/fourier/contract/operation-register.md` | **45** | **45** |
| arm `public-non-admin` | `… \| /usr/bin/grep -c '\| public-non-admin \|'` | **30** | **30** |
| arm `admin` | `… \| /usr/bin/grep -c '\| admin \|'` | **13** | **13** |
| arm `app` | `… \| /usr/bin/grep -c '\| app \|'` | **1** | **1** |
| arm `gallery` | `… \| /usr/bin/grep -c '\| gallery \|'` | **1** | **1** |
| `CLIENTED` rows | `… \| /usr/bin/grep -cw 'CLIENTED'` | **36** | **36** |
| `CLIENTABLE` rows | `… \| /usr/bin/grep -cw 'CLIENTABLE'` | **7** | **7** |
| `STRUCK` rows | `… \| /usr/bin/grep -cw 'STRUCK'` | **1** | **1** |
| `SERVER-ONLY` rows | `… \| /usr/bin/grep -cw 'SERVER-ONLY'` | **1** | **1** |
| `ADMIN-TOKEN` rows | `… \| /usr/bin/grep -cw 'ADMIN-TOKEN'` | **13** | **13** |
| `SESSION-DECLARED` rows | `… \| /usr/bin/grep -cw 'SESSION-DECLARED'` | **1** | **1** |
| `SESSION-IN-BODY` rows | `… \| /usr/bin/grep -cw 'SESSION-IN-BODY'` | **2** | **2** |
| `OWNER-IN-BODY` rows | `… \| /usr/bin/grep -cw 'OWNER-IN-BODY'` | **5** | **5** |
| `VIEWER-SCOPED` rows | `… \| /usr/bin/grep -cw 'VIEWER-SCOPED'` | **5** | **5** |
| `ANONYMOUS` rows | `… \| /usr/bin/grep -cw 'ANONYMOUS'` | **19** | **19** |

where `…` is the row filter
`/usr/bin/grep -E '^\| [0-9]+ \| (public-non-admin|admin|app|gallery) \|' <this file>` — **the same 45
lines every count in this table runs over**, so no two rows of the table can be reading different
populations.

`30 + 13 + 1 + 1 = 45` (arms) · `13 + 1 + 2 + 5 + 5 + 19 = 45` (**G8**, authority classes) ·
`36 + 7 + 1 + 1 = 45` (**G9**, dispositions). **Three partitions of the same 45, all closing at 45, none
derived from another.** The exact readings, and the one-line predicate that
re-derives them, are banked in this wave's execution record at
`docs/tranches/X/execution/C/F-W5.md` § *Unit receipts* → **### a**.

---

## §7 What the register hands on

- **To unit b (§A/§B)**: §4.3's three zero-consumer rows for **§B4's LIVENESS predicate** (cited, not
  booked) · §5's template-bound edges for **§A3's evenness** posture, which must cover the edges that
  never reach `coreFetch` at all.
- **To unit c (§C/§D/§E)**: §3's class table as **§C1**'s per-operation authority operand (G8) and §4's
  disposition table as **§D1**'s per-operation disposition operand (G9) — *"keyed to the register"*, which
  this file is now the referent of · §3.2's `save_contour` and image-GET ground · §2.2's producer absence
  for **§D3** (ruled F-PRODRET) · row 9's D9 divergence for the value.js API row.
- **To unit e (§G19)**: a file, not prose. Every id this register touches is **cited to its holder**; the
  register **books none of them**, mints no id, and enters no roster at either end of the set-difference.

**One home, two citations, everywhere. F.W5 claims credit for nothing here** (§0b).
