SERVED MODEL: claude-opus-5[1m]

# fixture-register.md — the conformance fixture register, BOTH directions

**Wave**: X.F.W8 (Track C · X·F), **unit `b`**. **Spec**: `docs/tranches/X/fourier/waves/F-W8.md`
§3 §J (rows J1–J7) · §4 gates **G4 · G5 · G11 · G12** · §2a file bounds · §5b cure-integrity locks.
**Authority**: `docs/tranches/X/COHESION.md` §0j (the owner's begin-word, 2026-09-17) and §0j.D's X·F
docket. **Record**: `docs/tranches/X/execution/C/F-W8.md`.
**Writable set at this seat**: this file, and nothing else. **Zero fourier bytes** in any verb; **zero
product bytes** in either repo; `scripts/dev/dev.sh` untouched and never staged.

---

## §0 What this file is, and the law it is written under

This is **the register of conformance fixtures for the CRUD/provenance union, in both directions** —
fourier-viz objects and palette objects — where **every row names the operation model the fixture is
generated FROM**. It is a **specification artefact**, not a fixture: F.W8 owns no product source
(spec §1c, §2b), so this file states what each fixture asserts, what generates it, where its bytes
land and **who lands them**. The bytes are the two API rows' act.

**Split-verdict discipline (spec §4, binding and quoted).** *"a gate closes **for F.W8** when the
fixture/assertion is **authored with its disposition**; it goes **GREEN** only when the named owner
lands the change. F.W8 never claims a GREEN it did not execute."* Every gate reading in §12 is written
under that sentence.

**This wave books no canonical row.** `CENSUS-CANONICAL.md` §4.1 names F.W8 by **no record**; every
banked identity in this file is **CITED to its holder** (F-W5's clause set, or the canonical's §2
rosters held at F-W5), never booked here. Every short id is **record-qualified** (R-5): a bare token is
not an identity.

### 0.1 Locks binding this unit, each carried at its own site below

| lock | where it binds in this file |
|---|---|
| **THE FIXTURE-DIRECTION LAW** — every fixture generated FROM the operation model, never from the client union | §1 (stated + made checkable); the `source operation model` column of §2/§3; the falsifier at §1.2 |
| **K-3** — `fr-BasisSelector m-7`'s 422-straddle is REFUTED from source; the fixtures may not cite it | §1.3, and no bound row cites a straddle |
| **K9** — do **NOT** delete the `?? item.slug` fallbacks | §7.3 — the lock's subject is **absent at HEAD**, recorded as drift, never as a cure of this wave |
| **MF-9** resolved-or-STRUCK before `GCM-10`'s cure is quoted (F-W5 §3 gate G22) | §5.1 — **STRUCK at F.W5 unit e**; the cure is quoted **without** it |
| **`UTF8_BYTEWISE_CODEPOINT`** ordering, never `localeCompare` | §10, with its receipt |
| **`canonical_digest` SKIPPED-SANCTIONED** — a fixture re-opening it fails G14 | §3 row `F8-FIX-V03`, and the standing bar at §9 |
| **R-5 record-qualification** on every short id | throughout; the eleventh collider disclosed at §9.2 |
| **value-side fixture BYTES are out of bounds** — specify only; binding by **TRANSCRIPTION**, never cross-repo read | §3's preamble and every V-row's `bytes land` cell |
| **serial lock (§2c)** — `b` shares the `F8-CLIENT-*` / `F8-C31*` identity space with `c` and `d`; commit before `c` opens | §11.2 — this unit mints **no** `F8-CLIENT-*` and **no** `F8-C31*` id |
| **FR-GIG-5 mirror** — no wave is credited with another's cure | §7.3, §9.1 — each drift names the wave that moved it from the git record |

### 0.2 D-19 — anchor re-resolution, performed BEFORE any citation

F.W0's `SUBSTRATE-LEDGER.md` §2.1/§2.2 do not reach api/py coordinates (the record's open seat quotes
§2.1.3 row 5: *"RECORD (api/py coordinates are outside F.W0's bounds)"*), so the obligation lands here.
Every witness this file cites was re-resolved at **fourier `21e11b0`** (worktree 0 dirty) and value.js
**`tranche-u`**, 2026-09-19, read-only.

| # | witness, as the spec/contract states it | measured at this seat | state |
|---|---|---|---|
| 1 | epicycle response `data: dict` (`api/models/computation.py:65`) | `computation.py:63` `class ComputeResult` / `:65` `data: dict` | **HOLDS, byte-exact** |
| 2 | `EpicycleComponentDTO` dead, one self-hit (`computation.py:55`) | `:55` `class EpicycleComponentDTO(BaseModel):`; the name occurs **only** at its definition in `api/` | **HOLDS** |
| 3 | `tier` written by `admin.py:183/:432/:438` | all three reproduce: `:183` `{"$set": {"tier": body.tier, …}}` · `:432` `"featured"` · `:438` `"normal"` | **HOLDS, byte-exact ×3** |
| 4 | `_public_doc` passes the raw doc | `visualizations.py:78` — `{k: v for k, v in doc.items() if k not in ("_id", "liked_ips")}` | **HOLDS** (the spec gives no line; recorded here) |
| 5 | `Visualization` under `extra="forbid"`, `likes` on the model | `visualization.py:109` class · `:152` `likes: int = 0` · `:169` `model_config = ConfigDict(extra="forbid")`; `tier` occurs **nowhere** in the file | **HOLDS** |
| 6 | the store's `likes ?? 0` and the template's bare `{{ entry.likes }}` | `web/src/stores/gallery.ts:284` `(entries.value[idx].likes ?? 0) + 1` · `GalleryCard.vue:147` `{{ entry.likes }}` ⊕ a second bare site disclosed rather than trimmed, `GalleryCardModal.vue:182` | **HOLDS, +1 site** |
| 7 | the ONE unchecked cast, `api.ts:192` | `web/src/lib/api.ts:270` — `return { data: (await res.json()) as T, etag, response: res };` | **DRIFTED, holds** (the record's baseline F-3 read the same `:270`) |
| 8 | IndexedDB draft `structuredClone` (`workspace.ts:95-104`) | `stores/workspace.ts:109` `const raw: WorkspaceDraft = structuredClone({` | **DRIFTED, holds** |
| 9 | the descending-amplitude invariant, `epicycles.py:54` | `src/fourier_analysis/epicycles.py:54` — `self.components = sorted(components, key=lambda c: c.amplitude, reverse=True)`; **the file is in the library package, not `api/`** — path-qualified here | **HOLDS, byte-exact** |
| 10 | a violation surfaces as `NaN%` bar widths | `web/src/components/shared/CoefficientsSpectrum.vue:66` — `` return `${((amplitude / maxAmplitude.value) * 100).toFixed(1)}%`; `` ⊕ `:125` the inline `width:` binding | **HOLDS, sited** |
| 11 | the god-module twins, `api.ts` **672 L** / `types.ts` **391 L** (v2 §A4's dated witness) | `web/src/lib/api.ts` **749** · `web/src/lib/types.ts` **397** | **DRIFTED — the twins GREW** (§7.2) |
| 12 | three dead server models (`admin.py:57` · `:69` · `:82`) | `:57` `class FlagRequest` · `:69` `class FlaggedEntryInfo` (rotted `user_slug` at `:78`) · `:82` `class FlaggedListResponse` | **HOLDS, byte-exact ×3** |
| 13 | `?? item.slug` fallbacks, **5 sites** (v2 §A4's K9 lock) | **0 sites at HEAD** — the spelling is absent from `web/src` | ⊘ **NOT HOLDING** (§7.3) |
| 14 | value.js `POST /:slug/flag` (the donor) | `api/src/modules/palette/routes/flags.ts:15` `flagsRouter.post("/:slug/flag", …)`, mounted `routes/index.ts` `palettes.route("/", flagsRouter);`, prefixed `app.ts:77` `app.route("/palettes", palettes);` | **HOLDS** |
| 15 | `PaletteVersion` shape (A-3: `model.ts:84`) | `api/src/modules/palette/model.ts:125` `export interface PaletteVersion` | **DRIFTED** — recorded as a re-resolve obligation exactly as the record's open seat recorded it (`:125`), **not adopted into any banked file** |

**Nothing above is re-booked as a defect of either repo.** A drifted address is a re-resolve obligation
(D-19); a **non-holding** witness is a finding, stated with its receipt and routed (§7.3, §9.1).

### 0.3 Operands, separated

| operand | what it supplies here | law |
|---|---|---|
| `contract/operation-register.md` (F.W5) | the 45-row operation enumeration, the **authority class** per row, the client-edge disposition, the `45 = 30+13+1+1` triple | **CONSUMED, never re-derived** (spec §3 P5/M5; X-9 — no percentage is published in this file) |
| `contract/J-diff-shape-v2.md` (F.W5) | the clauses this register asserts against: **§A3** (boundary evenness) · **§A4** (one contract source) · **§A5** (no untyped operations) · **§B3** (wrappers from the router) · **§C1** (authority class) · **§D3** (the port) · **§D4** (flag identity) · **§D7** (client-derivable bounds) · **§D17** (the serializer arm) | F.W5 **STATES**; F.W8 **ASSERTS**. No row here re-books an F.W5 clause |
| `contract/OWNER-RULINGS-F.W5.md` (F.W5 unit e) | the **G22 minute** — `MF-9` STRUCK | consumed at §5.1, never re-litigated |
| `conformance/union-prototype-walk.md` (unit `a`) | the ten walk cells, their dispositions and authority classes; residuals **R-1 … R-5** | consumed at §9.1; this file carries or strikes each |
| the 66 adjudicated records | the EVIDENCE witnesses quoted in the spec's §J rows | frozen, immutable (E-1/E-3) |
| `conformance/CENSUS-CANONICAL.md` | the census of record | F.W8 books **no** canonical row |

---

## §1 THE FIXTURE-DIRECTION LAW (J2) — stated, and made checkable

### 1.1 The law

The spec's §J J2 act cell, verbatim — ⟨cmd⟩ (base `docs/tranches/X/fourier`)
`grep -c 'every fixture is generated FROM the operation model, never from the client union' waves/F-W8.md`
→ the clause is present and singular in the spec:

> **THE FIXTURE-DIRECTION LAW, this wave's own acceptance constraint: every fixture is generated FROM
> the operation model, never from the client union.**

Its consequence, verbatim — ⟨cmd⟩
``grep -o 'a fixture generated from the client union will never exercise the `??` branch[^"]*' waves/F-W8.md`` →

> *"a fixture generated from the client union will never exercise the `??` branch, so the relabel bug is
> invisible to exactly the tests meant to catch it."*

Generalised at the same cell: ***the operation must own its value domains, or the client's narrowing is
fiction.***

### 1.2 The law made CHECKABLE (so G4 is not prose)

Every row of §2 and §3 carries a **`source operation model`** cell naming a **file:line in a
model/schema module**. The gate's falsifier is mechanical and stated in advance:

- a row whose source resolves under **`web/src/`** (fourier client) or **`demo/`** (value client) is a
  **failure by construction** — the row is void, not corrected;
- a row with **no** source model is **not a fixture row**: it is a **STRIKE** and lives in §4 with its
  reason;
- a row whose source is a **document** (this register, v2, a spec) rather than a model is likewise a
  strike — **v2 is a contract, not a generator** (§B3's own indictment: *"a contract document without a
  probe repeats the defect it convicts"*).

⟨cmd⟩ (run at this seat, over the settled bytes of this file, §11) — **row-scoped by construction**, so
the probe cannot count itself:
`awk -F'|' '/^\| \*\*F8-FIX-/ {print $5}' fixture-register.md | grep -n 'web/src/\|demo/'` → **no
output**. ▲ **The form is deliberate.** The first draft of this probe was unanchored, and it returned a
hit — **its own text**, because the `awk` field separator split the published command at the `\|` inside
its own pattern and made the probe line a false positive. A probe that matches itself is the
self-falsifying-receipt class this tranche convicts; anchoring on the row prefix excludes the probe **by
construction**, and a violation introduced by a later seat surfaces as **a line a reader can see**,
never as a stale integer a reader must trust.

### 1.3 The exception set, named (A5's corollary: *"The exception set is named explicitly or it is closed"*)

| # | exception | reason | disposition |
|---|---|---|---|
| **X-1** | `fr-InfoCard FR-IC-6` — the client leaf invents `EquationTier` (`web/src/lib/equation/types.ts:2`, `"symbolic" \| "identified" \| "spline"`) over the operation's unconstrained `tier` | the **client** narrows a domain the operation never constrains; a client-sourced fixture would assert the narrowing and never exercise the backend-adds-a-tier limb | **The exception is the LAW's own subject, not an exemption**: the tier fixture is generated from the operation, and the client's table (`notation.ts:76` `TIER_INFO[tier as EquationTier] ?? TIER_INFO.spline`) is asserted as a **silent fallback** (A5's second corollary) — *a dispatch that falls back has decided what the contract means*. Rides `F8-FIX-F02` |
| **X-2** | the three **URL-builder** edges (`thumbnailUrl` · `overlayUrl` · `imageUrl`; register §5) | they never traverse `coreFetch`, so they carry **no envelope** — there is no wire body to generate a fixture against | **NAMED, no fixture**: the boundary posture for those edges is §A3's third surface and is asserted in the walk, not here |
| **X-3** | `fr-BasisSelector m-7`'s **422-straddle** | ▲ **K-3 KILL LOCK: REFUTED FROM SOURCE** (`AnimationData` is a server-computed embedded document; the client-reachable bound 4096 ⊇ [1,500]) | **NO ROW CITES IT.** ⟨cmd⟩ `grep -n 'straddle' fixture-register.md` → **two lines, both of them this file's own law** — §0.1's K-3 lock row and this cell — **never a bound cell**. Stated as set membership, not as a count: a later violation surfaces as a **third line a reader can see** |

**The set is closed**: three exceptions, each with its reason. Silence is not an exception.

---

## §2 The register — **fourier direction** (fixtures generated from fourier operation models)

**Where the bytes land**: the fourier tree, as the **fourier API row's** act. FN-6's reader strategy stays
**fourier-owned** — value.js neither dictates it nor reads fourier's tree (dispatch-homes A.1). This
register reaches fourier **as a letter** (unit `e`), never as a cross-repo write.
**Authority class**: **CONSUMED** from `operation-register.md` §2, never re-derived.

| id | leg | operation (register row) | **source operation model** | the fixture asserts | bounds source (J4) | byte-match posture (G5) | authority class | gate |
|---|---|---|---|---|---|---|---|---|
| **F8-FIX-F01** | create — request | `POST /api/visualizations` (row **1**) | `VisualizationCreate` — `api/models/visualization.py:177` | the closed request domain: `extra="forbid"` rejects an unknown key; `active_bases` cardinality; `n_harmonics` at both ends of its window; `visibility` defaults `"draft"`; `owner_slug` is **sourced from the session, never the body** (the model's own docstring) | **GENERATED**: `Field(min_length=1, max_length=16)` (`:185`) · `Field(ge=1, le=4096)` (`:187`) · `max_length=200/2000/10` (`:189`-`:191`) | **MATCHES** — request side crosses no serializer | `SESSION-IN-BODY` | G4 |
| **F8-FIX-F02** | derive — epicycles | `POST /api/contours/{contourHash}/compute/epicycles` (row **16**) | `ComputeEpicyclesRequest` — `api/models/computation.py:43`; response envelope `ComputeResult` — `:63` (declared at the route: `@router.post(…, response_model=ComputeResult)`) | **envelope only**: `status` default `"ok"`, `data` present. The payload's shape is **STRUCK** (§4 S-1) — `data: dict` types nothing | ⊘ **NOTHING TO GENERATE**: `n_harmonics: int = 200` / `n_points: int = 1024` carry **no `Field`, no `ge`, no `le`** (`:44`-`:45`) — the operation declares no domain, so a generated bound is unavailable and an invented one is forbidden (§D7: *the client derives it from the operation model rather than inventing it at the leaf*). **The contract owes the domain**; the row is born-RED on that limb | **MATCHES at the envelope**; unknowable at the payload | `ANONYMOUS` | G4 · **G11** |
| **F8-FIX-F03** | derive — bases | `POST /api/contours/{contourHash}/compute/bases` (row **17**) | `ComputeBasesRequest` — `api/models/computation.py:48`; `ComputeResult` — `:63` | same envelope assertion; payload **STRUCK** (§4 S-2) | ⊘ same absence: `max_degree: int = 200` · `n_points: int = 1024` · `levels: list[int] \| None` · `n_eval: int = 1000`, **no `Field`** | **MATCHES at the envelope** | `ANONYMOUS` | G4 |
| **F8-FIX-F04** ⊘ | diff — **ONE-SIDED (R1)** | `GET /api/visualizations/{slug}/diff` (row **12**) | `DiffResponse` — `api/models/visualization.py:299` | `from_hash`/`to_hash`/`ops`/`identical` under `extra="forbid"`; **`ops` always present, empty ⟺ identical** (the model's own docstring); ▲ **the negative is the point**: the operation is **not a general two-point diff** — `on_chain` is `{head_hash} ∪ {fork_of_hash}` (`visualizations.py:827`), the stored `atom_diff` is **read, never recomputed**, and any other pair **404s**. The fixture carries an on-chain pair **and** an off-chain 404 | **GENERATED** (no numeric field) | **MATCHES** — `DiffResponse` declares **no datetime**, so the §5 serializer arm does not reach it; the body is `resp.model_dump()` at `:848` | `VIEWER-SCOPED` | G4 · **G1** (one-sided, declared) |
| **F8-FIX-F05** | remix — request | `POST /api/visualizations/{slug}/remix` (row **7**) | `VisualizationRemix` — `api/models/visualization.py:271` | the **tri-state `palette_slug`**, read via `model_fields_set`, exercised in all three states (absent · `null` · value) **because the model declares the tri-state**; absent atoms inherit the source HEAD; the child is born **`draft`** (`:277`) | **GENERATED**: `Field(default=None, min_length=1, max_length=16)` (`:279`) · `Field(default=None, ge=1, le=4096)` (`:281`) | **MATCHES** (request side) | `SESSION-IN-BODY` | G4 |
| **F8-FIX-F06** | history — versions | `GET /api/visualizations/{slug}/versions` (row **13**) | `VersionsResponse` — `api/models/visualization.py:363` ⊕ `VersionEntry` — `:351` | `viz_slug` + the `depth`-ordered bounded list; every entry's `atom_diff` vocabulary. ▲ Carried, not cured: the chain is a provable **singleton** today (`_write_root_version` is the only writer; F-α is F.W6's burn-down) — **the fixture must not encode a singleton as the contract** | **GENERATED** (no numeric request field; the ≤50 bound is the handler's) | ⊘ **BYPASS-NAMED (§5.4)** — `created_at` crosses as `str(datetime)` via `json.dumps(resp.model_dump(), default=str)` (`:888`), **non-ECMA**; a fixture generated in Pydantic JSON mode mismatches on every datetime | `VIEWER-SCOPED` | G4 · G5 |
| **F8-FIX-F07** | history — provenance | `GET /api/visualizations/{slug}/provenance` (row **11**) | `ProvenanceResponse` — `api/models/visualization.py:340` ⊕ `ProvenanceNode` — `:313` ⊕ `ForkCrumb` — `:326` | the **two distinct walks** (`chain` and `fork_breadcrumb`) are both present and independently shaped. ▲ **SEQUENCED BEHIND v2 §C5**: `_readable_or_none` applies to the **entry row only** (`:744`), so a private ancestor's `slug`/`set_hash`/`author_slug`/`created_at` cross the wire today — **the fixture may not bake the un-redacted shape as conformant**; it asserts the redacted shape and is born-RED until §C5 lands | **GENERATED** | ⊘ **BYPASS-NAMED (§5.4)** — same serializer arm at `:788` | `VIEWER-SCOPED` | G4 · G5 |
| **F8-FIX-F08** | moderation — **THE PORT** | `POST /api/visualizations/{slug}/flags` — **a NEW operation; no register row exists** (it becomes row **46**) | **to be GENERATED from the contract** (v2 §D3), transcribed from the donor: `flagPaletteBody` — `api/src/modules/palette/schema.ts:70` ⊕ `Flag` — `model.ts:178`. ⊘ **NOT** the dead `FlagRequest` (`api/models/admin.py:57`) — §A4 deletes the dead models, it does not revive them | the full specification is §8: reason domain, `detail` bound, self-flag refusal, duplicate → conflict, 404 on unknown entity, **entity-keyed identity** | **GENERATED** from the donor's declared bounds (`detail` ≤ 500; `reason` a closed 4-token enum) | **MATCHES by construction** — the port is born after §A4's codegen ruling and may not be hand-typed | **`SESSION-DECLARED`** (specified; derivation at §8.3) | G4 · **G12** |
| **F8-FIX-F09** | boundary — the **error-not-NaN** fixture | `POST /api/contours/{contourHash}/compute/epicycles` (row **16**), read leg | the **typed component model that must exist** — today `EpicycleComponentDTO` (`computation.py:55`) is dead and **disagrees with the wire** | a payload violating the operation's own invariant (**descending amplitude**, `src/fourier_analysis/epicycles.py:54`) is **refused at the boundary with a typed error**; the assertion's negative is that it does **not** reach the renderer as `NaN%` (`CoefficientsSpectrum.vue:66`) | n/a (an assertion row) | n/a | `ANONYMOUS` | **G11** |

---

## §3 The register — **value direction** (fixtures generated from value.js operation models)

▲ **THE BYTES ARE OUT OF THIS WAVE'S BOUNDS.** Spec §2a: *"The value-side fixture bytes are NOT in these
bounds… F.W8 **specifies** the value-side fixture rows in `fixture-register.md`; **landing** them is the
value.js API row's act."* The live target directory is `api/test/conformance/` (present at HEAD: the
`crud` · `db-indexes` · `envelope` · `idempotency` · `sessions-colors` · `txn-right-sizing` ·
`withTransaction-rollback` suites; `diff.test.ts` is **gone**, excised with atomdiff at `a8ff7792`).
**Binding is by TRANSCRIPTION**, never cross-repo read — the api suite must run where fourier is not
checked out (inv-26's probe law; spec §D D1).
**Authority class**: **MEASURED at this seat** on the value side — the register's six-token vocabulary is
fourier-measured and has no declared-owner member (§9.1 R-3).

| id | leg | operation | **source operation model** | the fixture asserts | bounds source (J4) | byte-match posture | authority class | gate |
|---|---|---|---|---|---|---|---|---|
| **F8-FIX-V01** | create | `POST /palettes` (`api/src/modules/palette/routes/crud.ts:73`) | request `createPaletteBody` — `schema.ts:41`; response `FormattedPalette` — `format.ts:19` (emitted by `formatPalette`, `:93`) | the closed request domain (`name`/`slug`/`colors`/`tags?`), 201, and the response projection **field-for-field from `FormattedPalette`** — including `forkCount` as the **computed** count, never `rest.forkCount` (the in-source X-W3 · G-14 minute) | **GENERATED**: `paletteNameSchema` max 100 (`:25`) · `colorsArraySchema` min 1 max 50 (`:33`) · `tagsArraySchema` ≤10 × ≤30 (`:35`) | **MATCHES** — a declared response interface, one projection site | `SESSION-IN-BODY` *(measured: `crud.ts:74-75` reads `c.var.sessionToken` in the handler body and 401s via `AuthenticationError`)* | G4 |
| **F8-FIX-V02** ⊘ | derive | **NO OPERATION** | **none, and none may be invented** | ⊘ **STRUCK — no fixture.** The palette's only derivation (`computeOklabColors`) executes **inside** the create and fork writes (`service/forks.ts:78`); there is no derive route, no client method and no derive-result state. **A cross-repo derive fixture would be a fabrication**: the union has a derive verb on one object kind only. The asymmetry is **architectural, not a gap** (walk cell **D-V**, `SERVER_ONLY` with its reason) | n/a | n/a | n/a | G4 (strike) |
| **F8-FIX-V03** ⊘ | diff | **NONE — RULED OUT OF THE CONTRACT** | **none** | ⊘ **STRUCK — no fixture, and a fixture here would re-open a killed branch.** §0j.D **F-SS4REST R1**: *"**RE-SCOPE value.js out of the diff clause** (a one-sided §6 verdict, stated explicitly)"*. `lib/crud/atomdiff.ts`, `atomDiff` on `PaletteVersion` and the conformance fixture itself were excised at `a8ff7792`. ▲ **`canonical_digest` stays SKIPPED-SANCTIONED**: fourier sorts keys, value.js hand-orders literals; adoption would be a stored-hash migration, not parity — **a fixture re-opening it FAILS G14** and none is written here | n/a | n/a | n/a | **G1** · G14 (bar) |
| **F8-FIX-V04** | remix (fork) | `POST /palettes/:slug/forks` — **the PLURAL operation** (`routes/forks.ts:26`) | request `forkPaletteBody` — `schema.ts:59`; response `FormattedPalette` — `format.ts:19` | fork with no body (`Content-Length: 0`) is valid → server-generated slug + inherited name; malformed JSON → 400; the child is born **`private`** (`service/forks.ts:87`); the write is **transactional** with an in-txn source re-read and carries **no idempotency key**. ▲ **THE DIRECTION LAW IN ITS SHARPEST FORM**: the client POSTs the **retired singular** `/palettes/${slug}/fork` (`demo/palettes/api/versions.ts:48`) — **a client-sourced fixture would encode a 404 as the contract**. The fixture is generated from the plural operation; the client edge is unit `a`'s residual **R-1**, routed to the value.js API row | **GENERATED**: `paletteNameSchema` · `slugSchema` (both `.optional()`, the object `.default({})`) | **MATCHES** | `SESSION-IN-BODY` *(measured: `forks.ts:28-31` reads `sessionToken` **and** `userSlug`, 401s via `AuthenticationError`)* | G4 |
| **F8-FIX-V05** ⊘ | history — list | `GET /palettes/:slug/versions` (`routes/versions.ts:34`) | ⊘ **NO RESPONSE MODEL EXISTS** — the wire shape is built inline in the handler: `return c.json({ data: data.map((v) => ({ hash: v._id, ...v, _id: undefined })), total, limit, offset })` (`versions.ts:50-56`). The **row** model `PaletteVersion` (`model.ts:125`) is a storage interface, not the wire projection | the request side **is** generatable (`paginationQuery`, clamped `limit` 1–100 / `offset` ≥ 0 at `:40`-`:41`) and is asserted; the **response** fixture is **STRUCK** (§4 S-4) until the projection is declared. ▲ **X-4 binds**: `_id` is the **release** hash, `payloadHash` the content hash, `revisionNo` the total-order key — the fixture binds `revisionNo`/`payloadHash` and treats `hash` as **opaque** | **GENERATED** (request side) | **STRUCK** (response side) | `VIEWER-SCOPED` *(measured: `assertPaletteReadable(…)`, `versions.ts:48`)* | G4 (strike) |
| **F8-FIX-V06** | history — by hash | `GET /palettes/:slug/versions/:hash` (`routes/versions.ts:59`) | same inline projection (`:66`), same `PaletteVersion` row model | **both** parameters are read — `/palettes/A/versions/<hash-of-B>` must **not** serve B under A's address (the route's own X-W3 · G-5 minute); no client method exists for this read (`CLIENTABLE`, server-only today) | n/a | **STRUCK with V05** (same undeclared projection) | `VIEWER-SCOPED` | G4 |
| **F8-FIX-V07** | history — revert | `POST /palettes/:slug/revert` (`routes/versions.ts:69`) | `revertPaletteBody` — `schema.ts:66` | the revert body's single field (`hash`, non-empty); the precondition pair — **declared route middleware** `requireOwnership(paletteOwnerExtractor)` (`versions.ts:71`) **plus** a strong `If-Match` | **GENERATED**: `z.string().min(1)` | **MATCHES** (request side) | ⊘ **`OWNER-DECLARED` — MEASURED, NOT REGISTERED** (§9.1 R-3) | G4 |
| **F8-FIX-V08** | moderation — **THE PORT'S DONOR** | `POST /palettes/:slug/flag` (`routes/flags.ts:15`) | `flagPaletteBody` — `schema.ts:70` ⊕ `Flag` — `model.ts:178` ⊕ `FLAG_REASONS` — `model.ts:49` | 201 `{flagged:true}`; unknown palette → 404; **self-flag refused** (`service/flags.ts:34`); duplicate by the same reporter → **409** via the unique `(paletteSlug, reporterSlug)` index (`platform/db/db.ts:101-104`); `detail` stored as `null` when absent (never `undefined`) | **GENERATED**: `z.enum(FLAG_REASONS)` (4 tokens) · `z.string().max(500).optional()` | **MATCHES** | `SESSION-IN-BODY` *(measured: `flags.ts:17-18` reads `c.var.userSlug`, 401s via `AuthenticationError`; **ownership is not compared — a flag is filed by a non-owner by design**)* | G4 · **G12** |

---

## §4 J3 — structurally-untyped operations: **typed at F.W5, or NAMED AND STRUCK with the reason**

The spec's J3 act cell, verbatim — ⟨cmd⟩
``grep -o "an operation's response model must be structurally typed, or the leaf is unjoinable in principle" waves/F-W8.md`` →
***"an operation's response model must be structurally typed, or the leaf is unjoinable in principle."***
Its consequence, owned here: *"the value.js↔fourier conformance fixtures … cannot be generated for this
operation as it stands"* — so **each such operation is typed at F.W5 or NAMED AND STRUCK in the register
with its reason.** F.W5 **stated** the rule at **v2 §A5**; it did not (and could not) type the operation,
which is a product act. Every one below is therefore **STRUCK, with its reason and its owner**.

| # | operation / leaf | untyped at | the clause that states the rule | STRIKE reason | owner of the typing act |
|---|---|---|---|---|---|
| **S-1** | `POST …/compute/epicycles` — **payload** | `ComputeResult.data: dict` (`api/models/computation.py:65`) | v2 **§A5** (booked `fr-CoefficientsSpectrum M-13` = that record's own `C-7`) | there is **no field to join on**: the envelope is typed, the payload is a bare `dict`. A payload fixture would assert the shape of whatever today's dict happens to hold — **a fixture of an accident** | **fourier API row** (type the payload); F.W5 owns the clause |
| **S-2** | `POST …/compute/bases` — **payload** | same `ComputeResult` | v2 **§A5** | same, and the client twin `BasisComponent` is **hand-maintained against a Python dict literal** (asserted at four sites in one component) — a client-sourced fixture is barred by §1 | **fourier API row** |
| **S-3** | the dead component model | `EpicycleComponentDTO` (`computation.py:55`) — one self-hit in `api/`, **and it disagrees with the wire** | v2 **§A4** (dead models are **deleted, not regenerated**) ⊕ **§A5** | it cannot source a fixture: generating from a model no route emits produces a fixture of a **retired shape**. ▲ **The generation and the deletion are ONE act** (§A4's lock) | **fourier API row** |
| **S-4** | `GET /palettes/:slug/versions` (⊕ `/:hash`) — **response** | **no declared projection**: the shape is built inline at `routes/versions.ts:50-56` / `:66` | v2 **§A5** — the contract is **neutral**, so the rule binds value.js exactly as it binds fourier | ⊘ **A FINDING OF THIS SEAT, measured not inherited**: the union's untyped-operation defect exists **in both repos, on opposite verbs** — fourier's derive payload is a `dict`, value.js's history response is an inline object literal. A fixture generated from `PaletteVersion` would assert the **storage** row, not the wire (`_id` → `hash`, `_id: undefined` dropped by `JSON.stringify`) | **value.js API row** (declare the projection); F.W5's §A5 is the clause |

**The strike list is CLOSED**: four entries, each with a reason and an owner. **No untyped operation is
silently omitted, and no strike is a deferral** — each names the act that lifts it.

---

## §5 G5 — the model-vs-wire bypasses, **each NAMED with its reason**

G5's clears-when, verbatim — ⟨cmd⟩
``grep -o 'a model-generated fixture matches the wire for every field, or \*\*each bypass is named in the register with its reason\*\*' waves/F-W8.md`` →
*"a model-generated fixture matches the wire for every field, or **each bypass is named in the register
with its reason**."*

### 5.1 MF-9 first — **resolved-or-struck BEFORE `GCM-10`'s cure is quoted** (F-W5 §3 gate G22)

The spec's §5b lock and J5's blocker both require this, and it is **discharged at the keystone, not
here**. ⟨cmd⟩ `sed -n '141,146p' contract/OWNER-RULINGS-F.W5.md` →

> **RULING (adjudicator seat, F.W5 unit e, 2026-09-17): `MF-9` is STRUCK as a citation.** The strike
> is of **the cite only, never the row**: `GCM-10 · D-07/L-5/C-3` keeps its banked spelling, its cure
> (*"a `tier` field with a default on the model"*) and its family (GCM-10 ⊕ GCM-55, the serialization-
> bypass family). The registry byte is **not edited** (E-1/E-3: the record is evidence; this minute is
> the addendum beside it).

**Consequence, executed here**: `fr-GalleryCardModal GCM-10`'s cure is quoted in this register as
***"a `tier` field with a default on the model"*** — **without `MF-9`**, and with the strike recorded
beside it. ▲ *Striking a dangling cite is not disposing of the identity*: `GCM-10` is untouched, and its
canonical home is **F.W3** (the clause carries only its `F.W5-W8` leg). **This register books neither.**

### 5.2 Bypass 1 — `tier`, written by a route and forbidden by the model

| limb | measured |
|---|---|
| the model | `Visualization` (`api/models/visualization.py:109`) carries **`extra="forbid"`** (`:169`) and **no `tier` field at all** |
| the writers | `api/routers/admin.py:183` (`set_tier`) · `:432` (batch feature) · `:438` (batch unfeature) — each `{"$set": {"tier": …}}` straight to Mongo |
| the emitter | `visualizations.py:78` `_public_doc` returns the **raw document** minus `_id`/`liked_ips` — so whatever the DB holds crosses the wire, model or no model |
| **why a model-generated fixture cannot byte-match** | a fixture generated from `Visualization` **cannot contain `tier`** (the model forbids it), while the wire **does** carry it for every entry an admin has touched. The two disagree **by construction**, in the direction that makes the model a decoration |
| the cure, and whose | at the **model** — `GCM-10`'s banked cure, quoted above, *"a `tier` field with a default on the model"*; **`GCM-55` rides the same fix**. **Not** at the render guard: F.W3/W4 owns the `v-else-if`. Owner: **fourier API row** ⊕ F.W3/W4 |

### 5.3 Bypass 2 — `likes`, one of two client readings is wrong by construction

`Visualization.likes: int = 0` (`:152`) is a model **default**, not a wire guarantee: `_public_doc`
passes the stored document, so a row written before the field existed emits **no `likes` key**. The
client asserts both answers at once — `stores/gallery.ts:284` `(entries.value[idx].likes ?? 0) + 1`
(nullable) against `GalleryCard.vue:147` `{{ entry.likes }}` and `GalleryCardModal.vue:182` (non-null).
**Opposite nullabilities on one field: one of them is wrong, and the wire does not say which.** A
model-generated fixture asserts `likes: 0`; the wire may omit the key. **NAMED.** Owner: **fourier API
row** (emit the field) ⊕ F.W3/W4 (one reading).

### 5.4 Bypass 3 — **the serializer arm**, which reaches even the model-backed responses

This is the bypass that survives `response_model`. Three handlers **do** build their body from a model
and then re-serialize it by hand: `get_provenance` (`visualizations.py:788`), `get_diff` (`:848`),
`list_versions` (`:888`), each `json.dumps(resp.model_dump(), default=str)`. `default=str` renders a
`datetime` as Python's **space-separated, non-ECMA** `str(datetime)`, while a fixture generated from the
same model in Pydantic's JSON mode emits **ISO-8601 with `T`**. **Every datetime field mismatches**:
`ProvenanceNode.created_at` · `ForkCrumb.created_at` · `VersionEntry.created_at`. `DiffResponse`
declares no datetime, which is why `F8-FIX-F04` alone is posture **MATCHES**.
**NAMED**, and the clause is **v2 §D17** (*"One concept, one serialization, across every operation of one
API… and that form is **ECMA-parseable**"*). ▲ **F.W5 owns ONLY the serializer arm**; the five-copy
`timeAgo` family is F.W3's `FR-AUL-17` and is **not re-booked**. Owner: **fourier API row**.

### 5.5 Bypass 4 — the **dead-model divergence** on the flagged listing (the G12 row's live proof)

`GET /api/admin/flagged` (register row **41**) declares no `response_model`; `list_flagged`
(`api/routers/admin.py:510`) builds an inline dict per row (`:575`-`:585`) and returns it through
`_json` (`:90`). The declared models disagree with it **in two ways at once**: `FlaggedEntryInfo`
(`:69`) heads on `content_hash` and carries **`user_slug`** where the wire emits **`owner_slug`**
(`:579`), and `FlaggedListResponse` (`:82`) declares the **offset** envelope (`total`/`page`/`pages`)
while the wire emits a **cursor** envelope (`next_cursor`/`has_more`, `:587`). **A fixture generated from
the declared models would be a fixture of a shape no route emits.** **NAMED**; the cure is §A4's single
act (generate **and** delete). Owner: **fourier API row**.

**Four bypasses, four reasons, four owners. G5's alternative limb is discharged on the register side.**

---

## §6 G11 — validate-at-boundary: **the failure mode is an error, not a `NaN`**

G11's clears-when, verbatim — ⟨cmd⟩
``grep -o 'the fixture proves \*\*the failure mode is an error, not a `NaN`\*\*' waves/F-W8.md`` →
*"at minimum the epicycle payload validates at the boundary and the fixture proves **the failure mode is
an error, not a `NaN`**."*

**The row is `F8-FIX-F09`, and it is specified in full here.**

| limb | content |
|---|---|
| **the denominator** | the whole 45-operation client surface lands through **ONE** unchecked cast — `web/src/lib/api.ts:270`, `return { data: (await res.json()) as T, etag, response: res };` (re-resolved from the spec's `:192`). **0 of 45 operations validate today.** The same zero covers the rehydration path: `stores/workspace.ts:109` `structuredClone` writes the payload into the IndexedDB draft, and the draft replays through the identical non-checking |
| **the invariant under test** | *"A chain of epicycle components, ordered by descending amplitude"* — enforced **only in Python**, `src/fourier_analysis/epicycles.py:54`, `sorted(components, key=lambda c: c.amplitude, reverse=True)`; expressed **nowhere in TypeScript** |
| **the positive assertion** | a conformant payload passes the boundary and the ordering brand survives to the consumer |
| **the negative assertion (the gate's own words)** | a payload with a missing/NaN `amplitude`, or a components array out of descending order, is **refused at the boundary with a typed error**. It must **not** arrive at `CoefficientsSpectrum.vue:66` — `` `${((amplitude / maxAmplitude.value) * 100).toFixed(1)}%` `` — where the violation renders as **`NaN%`** bar widths (⊕ the inline `width:` binding at `:125`): **a silent wrong picture instead of a loud failure** |
| **what blocks it, stated not hidden** | the fixture needs a **typed component model** to generate from, and today's is dead and wire-divergent (**§4 S-1/S-3**). The row is therefore **specified and born-RED**, and it lifts the moment §A5's typing lands. **F.W8 does not author a fixture against a `dict`** |
| **clause** | v2 **§A3** — *"Every response class this contract names has **exactly one posture at the boundary**: **validated**, or **explicitly-not-validated-and-why**"*, and the posture is **even**. ▲ **§A3's L-19 LOCK carried: do NOT author a per-field defensive sweep at F.W4** — a sweep of `?? 0` and `?.` through the components is the same defect distributed |
| **folds, cited not re-booked** | `fr-FourierShapeExtractor C-15` (build-time surface — `as any` at both consumers with `resolveJsonModule` already providing the discarded type); `fr-FrequencyGraph FR-FG-13` names `fr-CoefficientsPanel FR-CP-16` as the enforcement point — **one home, two citations** |
| **owners** | **F.W4** (the client boundary + the ordering brand, reading `n_components`) · **fourier API row** (the typed model) |

---

## §7 G12 — **one generated/checked contract shape** (RULED **CODEGEN**)

G12's clears-when, verbatim — ⟨cmd⟩
`grep -o 'the register either IS the generated shape or documents why it is not' waves/F-W8.md` →
*"the owner rules codegen-vs-hand-typed-twins and **the register either IS the generated shape or
documents why it is not**."*

### 7.1 The ruling, consumed

**COHESION §0j.D `F-SS4REST` R7**: *"**CODEGEN** — twins derived from one source (inv-16/inv-26
restated; structural invariants over prose)."* v2 **§A4** lands it as an **amendment stated in the
open**: inv-26's *"hand-typed twins, no codegen"* limb is **amended to generated twins**, inv-16
(shared-by-contract, **no shared package**) untouched. **F.W8 consumes the ruling and re-rules nothing.**

### 7.2 Does this register **IS** the generated shape? — **NO, and here is why, documented**

| question | answer, at the bytes |
|---|---|
| Is there a generator in either repo? | **No.** No codegen step exists on the fourier side (v2 §A4's witness, re-measured here: the twins are still hand-maintained, and they have **grown** since that measurement — `web/src/lib/api.ts` **749** lines and `web/src/lib/types.ts` **397**, against the contract's dated **672 / 391**). The growth is **Track C's own F.W3/F.W4 work at fourier HEAD `21e11b0`**; **no credit is claimed and no defect re-booked** (FR-GIG-5 mirror) |
| Could this file be the generated artefact? | **No, and it must not pretend to be.** A register is a **document**; §B3's indictment binds it — *"a contract document without a probe repeats the defect it convicts"*. Declaring a markdown table "the generated shape" would be the same category error the ruling was written to end |
| Then what IS this register, precisely? | **The generator's INPUT enumeration.** Every row of §2 and §3 names exactly the thing a generator consumes — an operation, its source model, its declared bounds and its authority class — in **one row per operation**, with the untyped operations **struck by name** (§4) and the model-vs-wire divergences **named** (§5). A generator run against this enumeration has no undeclared input; a generator run against today's tree has **four** (§4's strikes) |
| What lifts the gate to product-GREEN? | the owner-ruled generator, landed by the **fourier API row** — **generation and deletion as ONE act** (§A4's lock: *"if the three dead models survive the generator, the contract acquires a machine-checked copy of a retired shape"*), deleting `FlagRequest` · `FlaggedEntryInfo` · `FlaggedListResponse` in the same commit |

### 7.3 ▲ **K9 — the lock's subject is ABSENT at HEAD, and that is recorded, not cured**

K9, verbatim from spec §5b: *"**K9** do not delete the `?? item.slug` fallbacks"* — and v2 §A4's witness
measured **five** sites. ⟨cmd⟩ (base `$F`) `grep -rn '?? item.slug' web/src` → **no output**: the
spelling does not occur at HEAD. Measured cause, from the git record and **not** from inference:
`git log --oneline -3 -- web/src/components/visualization/gallery/AdminFlaggedPanel.vue` → **`3c5a5b0`
*"fix(x-f-w4/.d): the moderation queue shows the image, keeps its generation, and mutates the store in
place"*** — **X.F.W4's unit `d`**, a sibling wave of this track. At HEAD the panel renders the **entity**
identifier directly (`item.slug`, e.g. `:366`, `:455`, `:467`) and guards the asset behind
`v-if="item.image_slug"` (`:354`), which is v2 §D5's rule satisfied structurally rather than by a
fallback.

**Three consequences, stated exactly:**
1. **No fixture in this register asserts the fallbacks.** They are not there to assert.
2. **The lock is NOT re-stated as live bytes.** Its protection — *do not let a generated non-null type
   delete a defence against an unvalidated emitter* — **still binds**, because the emitter is unchanged:
   `api/routers/admin.py:578` still emits `"image_slug": doc.get("image_slug")` **unvalidated**. The
   generated type must therefore model `image_slug` as **nullable**, and the `v-if` guard is the
   defence that replaced the `??`.
3. **F.W8 claims no credit** for the change and re-books nothing; the wave that moved it is named from
   the git record (FR-GIG-5 mirror).

### 7.4 The identities this gate's row cites (never books)

`fr-AdminFlaggedPanel FR-AFP-71` ⊙ (the god-module twins; the **module-split** half stays owner-gated and
is named as such) · `fr-AdminFlaggedPanel FR-AFP-36` (the three dead models) · **`fr-GalleryAdminBanner
GAB-12`** (the gallery twin, `web/src/lib/types.ts` ↔ `api/models/gallery.py`, `res.json()` unvalidated;
drift degrades into six silent em-dashes with the tier tint dropped — no console error, no toast, no
test). All three are **cited to their F.W5 clause homes** (§A4, and §A3 for the GAB-12 evenness limb).

---

## §8 **F-PRODRET** — the port row, specified with its model and its authority class

### 8.1 The ruling, and what it homes here

⟨cmd⟩ `sed -n '1084,1088p' contract/J-diff-shape-v2.md` →

> **RULE — RULED, COHESION §0j.D F-PRODRET (R3 ≡ D3 ≡ G11): PRODUCER.** The moderation queue **gains its
> user half**, and it gains it as a **PORT of value.js's already-shipped verb** under this contract:
> `POST /visualizations/{slug}/flags` on the fourier side, the mirror of value.js's `POST /:slug/flag`.
> **The port is homed at F.W8** (the CRUD union prototype). **F.W5 writes this clause and nothing else
> about it.**

F.W8 owns **no product source**, so the home is discharged **in this register**: the port is *specified*
with its operation model and its authority class, and **the bytes are the fourier API row's act**.

### 8.2 The port's operation model — **transcribed from the donor, generated at the target**

| limb | the donor (value.js, shipped) | the port (fourier, to land) |
|---|---|---|
| route | `POST /palettes/:slug/flag` — `routes/flags.ts:15` | `POST /api/visualizations/{slug}/flags` (v2 §D3's spelling) |
| request model | `flagPaletteBody` — `schema.ts:70`: `{ reason: z.enum(FLAG_REASONS), detail?: z.string().max(500) }`, `FLAG_REASONS = ["inappropriate","spam","copyright","other"]` (`model.ts:49`) | **generated** from the contract: the same closed 4-token reason domain and the same ≤500 `detail` bound. ⊘ **NOT** the dead `FlagRequest` (`api/models/admin.py:57`), which §A4 **deletes** — reviving it would make the port a machine-checked copy of a retired shape |
| stored shape | `Flag` — `model.ts:178`: `{ paletteSlug, reporterSlug, reason, detail: string \| null, createdAt }` | the same five fields, **entity-keyed** (see 8.4); `detail` **`null`**, never absent — the donor normalises `detail ?? null` (`service/flags.ts:41`) |
| refusals | 404 unknown palette · **ValidationError on self-flag** (`service/flags.ts:34`) · **ConflictError on duplicate** via the unique index, mapped from Mongo `11000` (`:45`-`:48`) | identical three, asserted by `F8-FIX-F08` |
| success | `201 { flagged: true }` | `201`, envelope per v2 §A2 |
| uniqueness | `(paletteSlug, reporterSlug)` **unique** — `platform/db/db.ts:101-104` | `(slug, reporter_slug)` unique — **the entity key, not the digest** (8.4) |
| casing | TS-camel | Python-snake — **the ONLY allowed envelope difference** (F.W5's casing rule, a mechanical check on each side) |

### 8.3 Authority class — **`SESSION-DECLARED`**, and the derivation is stated, not asserted

The donor's **measured** mechanism is *a session is required, ownership is not compared* — `flags.ts:17`
reads `c.var.userSlug` in the handler body and 401s — which maps onto the register's token
**`SESSION-IN-BODY`**. **The port specifies `SESSION-DECLARED` instead**, and the reason is the
contract's own, not this seat's taste:

- v2 **§C1**: *"Every operation in this contract carries exactly one explicit AUTHORITY CLASS, and the
  class is part of the contract, not an implementation detail of the handler"*, and its indictment:
  **"Enforced-but-undocumented is the R3-7b contract defect in its exact shape."** A **new** operation may
  not be born into the defect the contract convicts.
- `SESSION-DECLARED` is the one token in the closed six whose mechanism — `Depends(require_session)` in
  the handler **signature** — is **structurally declared** and therefore machine-visible, where an
  in-body call is not.
- Ownership must **not** be compared: a flag is filed by a non-owner by construction, and the donor
  refuses the owner's own flag explicitly. `OWNER-IN-BODY` would be wrong; `ANONYMOUS` would ship an
  unauthenticated write into a moderation queue.

▲ **The 0/45 OpenAPI-security figure is NOT discharged by this choice**, and the register does not
pretend otherwise: a plain `Request`-reader dependency emits no `security` block either. That is
R3-7b's separate obligation, **consumed as F.W5's figure and never re-derived here**.
**One token, one row, no blank** — and the class is offered to the register as its **row 46** when the
port lands.

### 8.4 ▲ Two locks the port carries, one of them **blocking on §D4**

1. **The port is a port** (§D3's lock): written against **this contract's shape** — same identity rules
   (§D4), same authority discipline (§C1), same envelope (§A2). *"A producer that lands with a different
   flag identity re-opens §D4 at the moment it ships."*
2. ⊘ **§D4 IS NOT SETTLED, AND THE PORT'S BYTES WAIT ON IT.** v2 §D4 rules that *"a moderation record
   keys on the ENTITY it reports, never on a content digest"*, and its disposition hands the choice —
   *flag identity moves to the ENTITY, **or** dismiss scopes to slug* — to the **fourier API row**.
   Fourier's incumbent index is `(content_hash, reporter_slug)` unique (`api/services/database.py:140`)
   and `dismiss_flags` executes a **hash-scoped `delete_many`** under a slug-labelled action —
   re-resolved at this seat: `admin.py:603` resolves the entity
   (`find_one({"slug": slug}, {"content_hash": 1})`) and `:607` discards it
   (`delete_many({"content_hash": doc["content_hash"]})`), so N entities sharing content clear together. **The donor is already §D4-conformant** — value.js keys on `paletteSlug` — so
   **the port donates the conformant identity**, and landing it on the incumbent digest key would
   re-open §D4 in the act of closing D3. **The register specifies the entity key and routes the index
   decision + its migration to the fourier API row.** This is a *specification* dependency, not a gate
   this wave may close.

**The union's cleanest one-directional donation** (the ruling's own rationale): value.js has the verb
fourier lacks, and after the port the two APIs are isomorphic on moderation — which is exactly what
D-15 made first-class.

---

## §9 Residuals — consumed from unit `a`, and the strikes this unit makes

### 9.1 Unit `a`'s five residuals, each carried or struck **here**

| residual (walk §Residuals) | this unit's act |
|---|---|
| **R-1** `demo/palettes/api/versions.ts:48` posts the retired **singular** `/fork` | **CARRIED as `F8-FIX-V04`**, generated from the **plural** operation exactly as the brief requires. The client edge is **routed, not repaired** — owner: **value.js API row / X·V** (the wave that landed the plural). The direction law is what makes this row correct rather than a transcription of a 404 |
| **R-2** the `draft` ⇄ `private` token mapping across two differently-sized visibility enums | ⊘ **STRUCK, with its reason.** Measured: fourier `Visibility = Literal["draft","unlisted","public"]` (`api/models/visualization.py:34`) against value.js `PALETTE_VISIBILITIES = ["public","private"]` (`model.ts:33`), where **ruled D9** killed `unlisted` and a boot check refuses a collection still carrying one — while fourier's unpublish target **is** `unlisted` (register §4.2 row 9's disclosed divergence). **No cross-repo fixture asserts a shared visibility token**: each direction's fixture is generated from its **own** operation model's own enum. A mapping fixture would harmonise at the fixture layer what the contract has not harmonised — the spec's *"STATED, never harmonised"* bar. Lifts when F.W5's **R8** clause and the value-side **D9** reconciliation land |
| **R-3** the authority vocabulary has **no declared-owner member** | **CARRIED**: `F8-FIX-V07` publishes **`OWNER-DECLARED`** marked **MEASURED, NOT REGISTERED**, and §8.3 uses only registered tokens for the port. The question — *does the union's vocabulary gain a declared-owner member, or is the value side mapped onto the existing six?* — is **F.W5's register's**, relayed by unit `e`. **F.W8 mints no token into a closed vocabulary** |
| **R-4** A-3's anchor drifted again (`PaletteVersion` at `model.ts:125`) | **CARRIED as a re-resolve obligation** at §0.2 row 15, used at `F8-FIX-V05`'s source cell, and **not adopted into any banked file** (E-3) |
| **R-5** the walk cannot run as the owning actor / cannot enumerate through the gallery list | **CARRIED, not owned here**: no row of this register depends on `owner=me` or on the gallery list; the history rows (`F8-FIX-F06` · `V05` · `V06`) are **per-slug** by construction. Owner: F.W3/W4; unit `d`'s script enumerates per-slug |

### 9.2 ⊘ An **eleventh colliding token**, found by this seat's own record-qualification sweep

R-5 (record-qualification) exists because a bare token is not an identity, and the spec's collider roster
runs to ten. **`GAB-12` is an eleventh**, and it collides across the *repo families*, which is why the
fourier-side rosters never caught it: ⟨cmd⟩ (base `$R`) `grep -rlw 'GAB-12' .` → **two records** —
`fr-GalleryAdminBanner.md:51` (*"The wire contract is hand-mirrored (types.ts:110-118 ↔
api/models/gallery.py…)"*, routed **F.W5–W8**) and `shell-dock-genericactionbar.md:27` (a **value.js**
dock record, *"the prescribed terminal seats ratify the retired native-`title` register"*, routed
**X-W10**). The spec's J7 and this register mean **`fr-GalleryAdminBanner GAB-12`** and say so at every
site (§7.4). **Disclosed, not booked**: the re-grading question, if there is one, belongs to the census.

---

## §10 Ordering — `UTF8_BYTEWISE_CODEPOINT`, never `localeCompare`

Every id in this register is ordered **bytewise** and the ordering is verifiable rather than asserted:

```
⟨cmd⟩ grep -o '^| \*\*F8-FIX-[A-Z][0-9][0-9]' fixture-register.md \
        | grep -o 'F8-FIX-[A-Z][0-9][0-9]' > /tmp/rows
⟨cmd⟩ LC_ALL=C sort /tmp/rows | diff - /tmp/rows      → (no output: the ROWS are in bytewise order)
```

▲ **The probe is scoped to the ROWS, and the scope is the honest one.** An unanchored sweep over the
whole file compares **prose order** against bytewise order and fails on a forward reference — §1.3's
exception X-1 names `F8-FIX-F02` before §2's table opens, and §3's `F8-FIX-V03` is named in §0.1's lock
table earlier still. That is a fact about how a document reads, not about how the register is ordered;
the claim is about the register, so the probe is too.

`LC_ALL=C` is the bytewise collation; **no locale-sensitive comparison is used anywhere in this file or
in any fixture it specifies**, and any digest computed over these ids uses the same ordering.

---

## §11 Self-count — read from the **settled bytes**, double-run (SELF-COUNT law)

### 11.1 The figures, each with the probe that produces it

| figure | probe | reading |
|---|---|---|
| fixture rows, fourier direction | `grep -c '^| \*\*F8-FIX-F' fixture-register.md` | **9** (`F01`…`F09`) |
| fixture rows, value direction | `grep -c '^| \*\*F8-FIX-V' fixture-register.md` | **8** (`V01`…`V08`) |
| rows carrying a **source operation model** cell | the §2/§3 tables, **column 4 as a reader counts it** — `$5` under `awk -F'\|'`, since a leading pipe makes `$1` empty | **17 of 17** — three of them name the **absence** of a model as the cell's content (`V02`, `V03`, `V05`), which is the strike form, not a blank |
| rows sourced from a **client** module | the **row-scoped** falsifier of §1.2 (anchored `^\| \*\*F8-FIX-`, so it cannot match itself) | **no output** — the direction law's falsifier, run over the settled bytes |
| STRIKES (J3, untyped operations) | §4's table | **4** (`S-1`…`S-4`), each with a reason and an owner |
| G5 bypasses NAMED | §5's subsections | **4** (`tier` · `likes` · the serializer arm · the dead-model divergence) |
| exceptions to the direction law | §1.3 | **3** (`X-1`…`X-3`), the set declared closed |

▲ **Every figure above was read from the SETTLED bytes and DOUBLE-RUN identical** (9 ≡ 9 · 8 ≡ 8 ·
no-output ≡ no-output · 4 ≡ 4 · 4 ≡ 4 · 3 ≡ 3; the row roster byte-identical across both runs).
⊘ **And the first run convicted this file twice**, which is the whole reason the law is write-**then**-
measure: the unanchored direction-law falsifier **matched its own published command** (§1.2), and the
unanchored ordering probe compared prose order against bytewise order and failed on a forward reference
(§10). Both probes were re-cut at the bytes — anchored, self-excluding — and both now reproduce. Two
further anchors were corrected the same way: the flagged listing's return (`:586` → `:587`) and the
dismiss handler's span (now `:603`/`:607`, each at its own line).

### 11.2 Identity-space hygiene (§2c serial lock)

This unit mints **no** `F8-CLIENT-*` id and **no** `F8-C31*` id: the `F8-CLIENT-01..09` enumeration is
the spec's (§M M5) and is **cited** where a row needs it; `F8-C31A`/`F8-C31B` are **unit `c`'s** to
append, and the §R/§M/§D rows are **unit `d`'s**. The register's own namespace is `F8-FIX-*`, disjoint
from both. **One writer at a time; this unit commits before `c` opens.**

---

## §12 Gate readings — BEFORE → AFTER, with split verdicts

| gate | BEFORE (record §B.2) | AFTER, at this file's bytes | verdict |
|---|---|---|---|
| **G4** every fixture generated FROM the operation model | **RED** — `fixture-register.md` ABSENT ⇒ no row names a source operation model | **17 of 17** rows carry a source cell; **0** resolve to a client module (§11.1); the direction law is stated with a mechanical falsifier (§1.2); every structurally-untyped operation is **NAMED AND STRUCK with its reason and its owner** (§4, four strikes); bounds are **generated, never invented**, and the two operations that declare **no** domain say so rather than inventing one (§2 `F02`/`F03`) | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: the gate's own precondition — F.W5's per-operation joinable/unjoinable cell — is satisfied by v2 §A5 as a **clause**, while four operations remain untyped **at the bytes**. GREEN owners: **F.W5** (typing clause, landed) · **fourier API row** (S-1/S-2/S-3) · **value.js API row** (S-4) |
| **G5** model output byte-matches the wire | **RED** — register ABSENT; no bypass named | **MF-9 discharged first** (STRUCK at F.W5 unit e; `GCM-10`'s cure quoted without it, §5.1), then **four bypasses NAMED with their reasons and owners** (§5.2–§5.5), and each §2 row carries an explicit byte-match posture | **CLOSED FOR F.W8 — split verdict** (the gate's alternative limb: *"or each bypass is named in the register with its reason"*). **NOT product-GREEN**: `tier` is still forbidden-and-written, `likes` still ambiguous, the serializer still non-ECMA, the flagged listing still model-divergent. GREEN owners: **fourier API row** ⊕ **F.W3/W4** (the guard) |
| **G11** validate-at-boundary exists somewhere on the client surface | **RED** — no fixture asserts error-not-`NaN` | `F8-FIX-F09` is specified in full (§6): positive + negative, the invariant named at its true bytes, the `NaN%` site sited, the L-19 lock carried, and **its blocker stated rather than hidden** — the fixture needs the typed model §4 S-1/S-3 strike | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: **0 of 45** operations validate at the boundary today; the single unchecked cast stands at `api.ts:270`. GREEN owners: **F.W4** ⊕ **fourier API row** |
| **G12** ⊙ one generated/checked contract shape | **RED** (ruled, unbuilt) — the register did not exist to be it | The ruling (**§0j.D F-SS4REST R7 = CODEGEN**) is consumed, and the gate's **second limb is executed**: the register **documents why it is not** the generated shape, and states precisely what it **is** — the generator's input enumeration, one row per operation, with the undeclared inputs struck by name (§7.2). The dead-model deletion is carried as **one act** with generation; **K9's lock is honoured with its subject-drift recorded** (§7.3) | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: no generator exists in either repo and the twins have **grown** since the contract measured them (749 / 397 vs 672 / 391). The ⊙ **module-split** half stays owner-gated and is named as such. GREEN owner: **fourier API row** (generate + delete in one commit) |

**No gate measured GREEN before its cure. No gate discharged by an SS-13 probe** — this unit ran none.
**Probe parsimony (§5.2): bounded `grep`/`sed`/`git log` reads only, zero live probes, zero browser,
zero runs, zero writes outside the one writable path.**

---

## §13 What this file hands on

- **to unit `c`** — the `F8-C31*` namespace is untouched and the register's `F8-FIX-*` space is disjoint;
  `F8-FIX-F04`'s **on-chain-only** constraint and its 404 negative bind any C31 fixture that touches
  `/diff`, and **G1's one-sided verdict** is already declared at both diff rows.
- **to unit `d`** — the §R/§M/§D rows append **below** §3 in the same `F8-FIX-*` space; `F8-FIX-F05`'s
  born-`draft` and `F8-FIX-V04`'s born-`private` facts are measured and must **not** be harmonised;
  `F8-FIX-F02`/`F03`'s **absent bound domains** are the J4 input for any bounds assertion; the
  serializer arm (§5.4) reaches every datetime the walk script reads.
- **to unit `e`** — three items travel in the FN-6 relay letter, and no more: **(i)** this register in
  full (the only vehicle by which fourier receives it; the reader strategy stays fourier-owned);
  **(ii)** the **authority-vocabulary question** (R-3 — a declared-owner member, or a mapping);
  **(iii)** the **§D4 index/migration dependency** that gates the port's bytes (§8.4). `canonical_digest`
  stays **SKIPPED-sanctioned** — nothing here re-opens it, which G14 requires.
- **to F.W9/W10** — every row's assertion is written to be asserted **against this document**, never
  against the sibling repo (inv-26: no cross-repo read, ever).
