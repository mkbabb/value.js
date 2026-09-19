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

## §3a The **C31 isolation controls** — the `F8-C31*` rows (appended by unit `c`, 2026-09-19)

**Added by unit `c` under the §2c serial lock**; unit `b`'s bytes above are untouched, and this
section renumbers nothing. Unit `b`'s §13 hands the `F8-C31*` namespace here and §11.2 records that it
minted none of it; the register's own `F8-FIX-*` space is disjoint, so unit `b`'s published self-counts
(all anchored `^| \*\*F8-FIX-`) and its ordering probe (scoped `F8-FIX-[A-Z][0-9][0-9]`) are unaffected
by construction — **not by this seat's care**.

**These two rows are CONTROLS, not fixtures**, and the distinction is why they sit in their own
section rather than in §2. A fixture row is *generated FROM an operation model* and asserts a wire
shape (§1.1's direction law). A control **mutates one leaf of the model and asserts which leaves
fail** — its cell shape is therefore *sole mutable target · owner result · non-owner result*, not
*source model · bounds · byte-match posture*. ▲ **The direction law is not evaded, it is inapplicable
by kind**: §1.2's falsifier voids a row *sourced* under `web/src/` or `demo/`, and neither row below
carries a source-model cell at all. The `web/src/lib/api.ts` naming in `F8-C31A` is the control's
**mutation target** — the byte it edits — which is the opposite of a source of truth.

**Full specification**: `C31-two-sided-reproduction.md` (unit `c`) — §4 (`F8-C31A`), §5 (`F8-C31B`),
§6 (the isolation predicate, stated once for both), §7 (the owner-frozen denominator).

| id | kind | sole mutable target | the mutation, addressed by STRING never by line | required OWNER result | required NON-OWNER result | owner-only bypass run | preconditions (measured) | bytes owner | gate |
|---|---|---|---|---|---|---|---|---|---|
| **F8-C31A** | control — client leaf | `client.method.visualization-update` | client source only: `PATCH` → `PUT` in `updateVisualization`'s request options. Target string at fourier `21e11b0`: `{ method: "PATCH", body: { ...patch }, headers }` — present **exactly once** (`grep -c -F` → 1, double-run), at `web/src/lib/api.ts:507`, **drifted +77 from the intake's `:430`** under one unrelated commit (`dabbb17`, X.F.W4 `.f`) | `normal.errors[]` **equals** the singleton `["client.method.visualization-update"]` — *equals*, never *contains*: C31's errors **contained** its owning leaf and still failed | `operation.method.visualization-update` **evaluates and passes**, and every other predicate equals its **unmutated baseline** value | owning leaf suppressed ⇒ `closure: true`, `errors[]` **empty**. ▲ **The run C31 failed**: *"Owner suppression retains the operation leaf"* | **P-1 ABSENT** (no `client.method.*` leaf exists in the successor model — the join sits inside the operation row, §3.3 of the C31 file) · **P-3 ABSENT** (no production validator at HEAD) · **P-5 NOT-THIS-WAVE** (the run environment is F.W9/W10's) · **P-4 MET** | **fourier API row** (construction + execution, under the owner's freeze). **F.W8 owns no product source and writes zero fourier bytes** | **G3** |
| **F8-C31B** | control — operation leaf (the mirror) | `operation.method.visualization-update` | operation source only: the update route's decorator verb. Target at `21e11b0`: `api/routers/visualizations.py:350` `@router.patch("/{slug}")` — **byte-exact at its published line**, handler `update_visualization` at `:351`; **zero commits to that file since 2026-08-01** | `normal.errors[]` **equals** the singleton `["operation.method.visualization-update"]` | `client.method.visualization-update` **evaluates and passes**, unmoved by an operation-side edit; all other predicates equal baseline | owning **operation** leaf suppressed ⇒ `closure: true`, `errors[]` **empty** | **P-2 PARTIAL** (the `method` cell is operation-derived, but the client join is stored **inside** the operation row and the separation law is unnamed in `operation-register.md`) · **P-1/P-3/P-5** as above | **fourier API row** | **G3** |

**The five verbatim constraints bind BOTH rows in the same words** — *raw receipts · the same
production validator · an owner-only bypass · all-non-owner retention · **no caller-supplied expected
code*** — discharged member by member at `C31-two-sided-reproduction.md` §4.2, and adopted, not
restated, at §5.2. ▲ The fifth is the one a register can hide: the plan declares a **target** and
carries **no expected code, no expected error string, no expected exit status**; the acceptance
predicate is **derived from the isolation law** (*the mutated leaf set equals the declared sole
mutable target's leaf, as a set*), never from a caller-supplied literal.

▲ **Why the PAIR, and not one successor control.** C31's failure was one-directional — a *client*
edit reached the operation leaf because that leaf's disposition was `CLIENT_MATCH_SOURCE_DERIVED`.
**A single control would test only the broken direction and report the seam repaired while the
derivation still stood, inverted.** The clause the pair asserts is bidirectional (`J-diff-shape-v2.md`
§B, *"operation identity independent of client identity (bidirectional)"*), so the acceptance is too.

▲ **DENOMINATOR — OWNER-FROZEN, and NOT replaced by these rows.** **30/37 terminal stands**;
**32/38 only if C31 is lawfully replaced** by the pair *constructed, run and accepted*. **0 of 2 are
constructed**; three preconditions are unmet. **No re-cut denominator on any unit's authority, and no
percentage is published** (X-9).

**Ordering** — `UTF8_BYTEWISE_CODEPOINT`: `F8-C31A` < `F8-C31B`, written in that order.
⟨cmd⟩ `grep -o '^| \*\*F8-C31[AB]' fixture-register.md | grep -o 'F8-C31[AB]' > /tmp/c31rows` ·
`LC_ALL=C sort /tmp/c31rows | diff - /tmp/c31rows` → **no output** (the rows are in bytewise order);
⟨cmd⟩ `grep -c '^| \*\*F8-C31' fixture-register.md` → **2**, double-run `2 ≡ 2`.

---

## §3b The **walk assertions** — the §R / §M / §P7 / §D rows (appended by unit `d`, 2026-09-19)

**Added by unit `d` under the §2c serial lock**; units `b`'s and `c`'s bytes above are untouched and
this section renumbers nothing. The identity space is **`F8-WALK-*`**, disjoint from `F8-FIX-*` (unit
`b`) and `F8-C31*` (unit `c`), so every published probe of both siblings is unaffected **by
construction** — and re-measured after the append anyway, at §14.3 (SELF-COUNT law: a claim of
non-interference that is not re-measured is a hope).

**These rows are ASSERTIONS, not fixtures and not controls**, and the three kinds are kept apart
because their cells are not the same shape. A **fixture** row (§2/§3) is *generated FROM an operation
model* and asserts a wire shape. A **control** row (§3a) mutates one leaf and asserts which leaves
fail. An **assertion** row *walks the live union and asserts a contract property across the round
trip* — its cells are therefore *the assertion · its source operation model · the measured witness ·
today's reading · the owner*. ▲ **The direction law (§1.1) is honoured in substance, not evaded**:
every row below names the **operation model** its assertion is written against, and client-side
coordinates appear **only** in the `measured witness` cell — as the site of the divergence being
asserted over, never as a source of truth. §1.2's falsifier is anchored on `^| **F8-FIX-` and so does
not reach these rows; the substantive rule does, and each row satisfies it.

**EXECUTED BY**: `conformance/walk/union-walk.mjs` — **AUTHORED at F.W8 unit `d`, EXECUTED at
F.W9/W10**, on F.W9's deploy spine. **No run under this wave, in any mode.** The script mutates
fourier and value.js *data* in a non-production environment (that mutation is the instrument, is
declared, and is subtracted — §3b.4); it writes **zero bytes** of either tree, in any verb, ever.
Every assertion id below is the id the script records, so the register and the run report difference
against each other rather than being read side by side.

**Anchors**: every coordinate in this section was re-resolved at **fourier `21e11b0`** (worktree 0
dirty) and value.js **`tranche-u`** on **2026-09-19** by this seat (D-19). The full drift table is
§14.1. A coordinate is an address, not an identity.

### 3b.1 §R — round-trip, persistence and cache identity (gates **G6 · G7 · G8 · G13**)

| id | spec row | the assertion the walk executes | source operation model | measured witness (2026-09-19) | today's reading | owner | gate |
|---|---|---|---|---|---|---|---|
| **F8-WALK-R01** | §R **R1** (`BC-9 / C-6 / D-20 ⊕ SS-C-2`) | a gallery replay **reproduces its own frame**: every persisted `AnimationSettings` field round-trips **in the server's declared unit**, and every client constant that disagrees is **reported, not reconciled** | `AnimationSettings` — `api/models/shared.py:65` (fps `:66` · duration `:67` · max_circles `:68` · easing `:69` · speed `:70` · active_bases `:71`) | server `30 / 30.0 s / 80` ⟂ client `60 / 5000 / 100` (`web/src/lib/defaults.ts:24-28`) ⟂ renderer `maxCircles = ref(80)` (`BasisCanvas.vue:51`) and `duration = ref(20000)` *"// ms per full cycle"* (`stores/animation.ts:77`) | ⊘ **RED at authoring**: `duration` is declared **SECONDS** server-side against **5000 ms** and **20000 ms** client-side — a **1000× fork across three declarations**, which must be reconciled **in the contract before the fixture can assert anything**. `speed` agrees **by luck** — unconstrained on both sides (`shared.py:70`, no validator) | **F.W5** (the three-way reconciliation, with units) · **fourier API row** | **G6** |
| **F8-WALK-R02** | §R **R2** (`SS-C-1`, write leg) | the update verb reaches **every atom of the version-identity set**, **or** the atom set is **re-declared** — stated either way, never left divergent. Two limbs: the unreachability must be **OBSERVABLE** (a refusal whose diagnostic **names the field**, never a silent drop), and the re-declaration must stand **in this register** | `VisualizationUpdate` — `api/models/visualization.py:198` (five fields, `extra="forbid"` `:209`) ⊕ the atom set `ATOM_KEY_ORDER` — `api/lib/crud/atomdiff.py:29` | the five patchable fields are `visibility · title · description · tags · palette_slug`; `animation_settings` is **atom 4 of 5** and is **not among them**. The client twin `VisualizationPatch` (`web/src/lib/types.ts:262-268`) is the same five | ⊘ **RED at authoring**: a preference the control claims to set is **silently non-persistent** after create. **THE RE-DECLARATION, STATED HERE SO IT IS NOT LEFT DIVERGENT**: while `VisualizationUpdate` stands at five fields, the **update-reachable** atom set is `{palette_slug}` and the **create/fork-only** atoms are `{active_bases, n_harmonics, contour_settings, animation_settings}`. Either the verb gains them or the contract says this — F.W8 says it | **F.W5** (the atom set) · **fourier API row** (the verb) | **G6** |
| **F8-WALK-R03** ⊙ | §R **R3** (`fr-BasisSelector M-9` = L-M4 / C-20) | a minted off-state `[]` is **REFUSED WITH A DIAGNOSTIC naming `active_bases`**, and the refusal **creates nothing** — never laundered, never silently substituted. The value-side mirror asserts the same cardinality law on `colors: []` | `VisualizationCreate.active_bases` — `api/models/visualization.py:186` (`Field(min_length=1, max_length=16)`) ⊕ the remix/patch arm `:280` ⊕ value.js `colorsArraySchema` — `api/src/modules/palette/schema.ts:33` | the mint still stands: `BasisSelector.vue:102` *"Go to \"off\" — allow empty selection (canvas handles it gracefully)"*; the laundering still stands at **two** store sites — `stores/workspace.ts:362-365` and `stores/gallery.ts:338-340` (`active_bases?.length ? … : ["fourier-epicycles"]`) — and the loader both **refuses to restore** an empty set (`useWorkspaceLoader.ts:72-73`, gated on `?.length`) and **force-prepends** on first data (`:150-153`) | ⊙ **RULED — and the ruled branch is the only one authored** (COHESION **§0j.D F-SS4REST R5**: *"**STOP MINTING** the off-state `[]`; the contract does not admit it (no silent rewrite)"*). The **server half** is already conformant (`min_length=1`); the **client half** — the mint and the two laundering sites — stands at HEAD and is **F.W3/W4's cure, claimed by no part of F.W8** | **owner ruled** · **F.W3/W4** (stop minting) | **G7** |
| **F8-WALK-R04** ‡ | §R **R4** (`fr-ContourSettings B-4` = C-1 ∘ C-25/R6-8, ⊕ `i-7` folds) | the derive leg asserts **`contour_hash` INSTABILITY** across an **ML-threshold change**: two derives differing **only** in `ml_threshold` (0.50 → 0.85) must return **different** hashes — *an operation's cache identity must be a superset of the request fields the operation consumes* | `ContourSettings` — `api/models/shared.py:10-20` (`ml_threshold` `:19` · `ml_detail_threshold` `:20`), consumed by `extraction_cache_key(image_sha256, settings)` — `api/services/image_storage.py:248` | the cache key is a **CLOSED literal over ten settings fields plus `_v`** (`:250-265`) — `strategy · resize · blur_sigma · n_classes · min_contour_length · min_contour_area · max_contours · smooth_contours · n_points` — **omitting both ML fields**; `api/routers/images.py:220` `find_one` → `:221-226` `return contour_response(existing)` **short-circuits BEFORE** `compute_contours` (`:230`). `auto` is the shipped default (`web/src/lib/defaults.ts:9`), so the control is live on every fresh workspace | ⊘ **RED at authoring, and the RED is the point**: today the hash is **STABLE** across the change — the user drags 0.50→0.85, waits out the debounce and receives the 0.50 contour **with no signal**. **The derive step cannot be trusted while a cache key under-determines its own operation** | **fourier API row** | **G8** |
| **F8-WALK-R05** | §R **R5** (`MISSED-E`, the EasingPicker save-race) | **the last value the client sent is the value persisted** — asserted at the verb that actually accepts the atom (create/fork, per R02), under its **own** idempotency key, because a replay of an earlier key would return the FIRST body and assert nothing about the last value | `AnimationSettings.easing` — `api/models/shared.py:69`, carried on `VisualizationCreate.animation_settings` | the write reaches persistence through a **500 ms `watchDebounced`** (`VisualizationView.vue:53-64`, writing `active_bases`/`easing`/`speed` into `store.animationSettings`) while `saveVisualization` reads `toRaw(animationSettings.value)` **synchronously** (`stores/workspace.ts:356-369`, the atom at `:368`) | ⊘ **FINDING — THE BANKED SEAM'S NAME DOES NOT EXIST AT HEAD.** The lock says *"the flush seam is the banked L-12/C-25 `setEasing` action — **do not invent a second seam**"*; ⟨cmd⟩ (base `$F`) `grep -rn "setEasing" web/src` → **no output**, double-run. The walk therefore asserts the **observable** property and **invents no seam**; the naming question is **routed, never resolved here**. ▲ **The UI-timing half is DECLARED UNASSERTABLE by this instrument, not skipped**: *"the last **user-visible** value"* is a property of the debounce window and belongs to **F.W3/W4's e2e**. Composes with **SS-C-8** (F.W4's repair seat, SS-13's ordering witness) | **F.W3/W4** (the seam) · **F.W5** (the name) | **G6** |
| **F8-WALK-R06** | §R **R6** (`M-β4` ⊕ `L·m-6 = C·D-14` ⊕ `PP-DEADSEAM = C-12`) | **THE LIVENESS PREDICATE**: the traversal **touches every envelope field** the walk observed and **reports the unconsumed set**, each member carrying a **drop-or-consume** disposition. A field with **no** disposition is **UNDECLARED**, which is a RED — *every field in the envelope has a PRODUCER and a CONSUMER, or it is dropped* | the envelopes of every leg, labelled at the call site (`visualization` · `palette` · `diff` · `versions` · `palette_versions`), against the script's `CONSUMPTION_MAP` | three fields measured **dead in one direction or both**: `EpicycleData.trace` — produced `api/services/computation.py:127`, declared `web/src/lib/types.ts:25`, ⟨cmd⟩ `grep -rn "\.trace\b" web/src` → **no readers**, yet `structuredClone`d into every IndexedDB draft (`stores/workspace.ts:109-117`) · `reconstructed_points` — `api/routers/equations.py:114`/`:128`, model `api/models/equations.py:33`, declared `web/src/lib/equation/types.ts:31`, **read by nothing** · `preview_path` — written `""` at **all three** server sites (`api/models/assets.py:85` · `api/services/image_storage.py:318` · `api/responses.py:22`), client leaf unreachable | ⊘ **RED at authoring by design (§3b.6)**: the map is **seeded, not complete** — the first run's UNDECLARED remainder **is** the work item, and each member takes a disposition **by dated addendum-beside** before this row can go GREEN. ▲ **An empty traversal is BLOCKED, never GREEN** | **F.W5** (the predicate) · **F.W8** (the measurement) · **fourier API row** (drop or consume) | **G13** |

### 3b.2 §P7 — the create leg: **idempotent-or-declared on BOTH sides**, and which half each repo holds (gate **G10**)

| id | the assertion the walk executes | source operation model | today's reading |
|---|---|---|---|
| **F8-WALK-P07-F** | two fourier creates under **ONE** `Idempotency-Key` yield **ONE** resource (same slug) | `VisualizationCreate` — `api/models/visualization.py:177`, at `POST /api/visualizations` (`@router.post("")`, `api/routers/visualizations.py:164`) | the server **HOLDS** replay: `idempotency.replay_or_record(request, _store(), f"user:{owner_slug}", _handler)` at **`:236`** (create) and **`:612`** (remix) |
| **F8-WALK-P07-V1** | a value.js **APPENDING** write **without** a key is **REFUSED `400`**, never silently executed twice | the app-global requirement table — `api/src/platform/http/idempotency.ts:90-93`, mounted `api/src/app.ts:73` | **REQUIRED** on exactly two operations: `POST /palettes/:slug/revert` and `POST /palettes/:slug/forks?` — the rule declared *"beside the store it arms, rather than mounted per-route"* |
| **F8-WALK-P07-V2** | two value.js forks under **ONE** key yield **ONE** child | `forkPaletteBody` — `api/src/modules/palette/schema.ts:59`, at `routes/forks.ts:26` | the write is **transactional** with an **in-txn source re-read** (`service/forks.ts:105-128`) **and** key-guarded |
| **F8-WALK-P07-DIV** | the two divergences are **STATED, never harmonised** | — | the remix child is born **`draft`** (`api/models/visualization.py:277`); the fork child is born **`private`** (`service/forks.ts:87`). fourier runs **no transaction by deliberate choice**; value.js's fork **is** transactional |

**Which half each repo holds — the row G10 asks for, measured at HEAD:**

| repo | idempotency | transaction | reachable from the shipped client? |
|---|---|---|---|
| **fourier** | **server-side replay, OPT-IN** — honoured on create (`:236`) and remix (`:612`), keyed `user:{owner_slug}` | **NONE**, and deliberately so (*"standalone-topology-honest"*) | ⊘ **NO.** The channel is declared (`web/src/lib/api.ts:123-124`, applied `:208-209`) and ⟨cmd⟩ `grep -rn "idempotencyKey:" web/src` → **no output**: **not one call site passes a key** — `createVisualization` (`:449-457`) among them |
| **value.js** | **REQUIRED, refused `400` without** — on the two appending verbs (revert, fork) | **YES** on the fork write, with an in-txn source re-read | yes (the demo client has sent the header on mutating requests since the K.W2 store) |

⊘ **FINDING OF THIS SEAT — the spec's G10 cell says *"Neither side holds both today"*, and at HEAD
that is TRUE OF FOURIER AND FALSE OF VALUE.JS.** value.js holds **both halves on one verb**: the fork
is transactional **and** key-required. The requirement did not exist when the spec was sealed; it
landed at value.js **`cbf178ce`** (2026-09-18) *"feat(api/write-contract): CAS + strong If-Match +
required Idempotency-Key; revert → 201 (X.A3)"* — an **X·V** act, named from the git record. **F.W8
claims no credit for it** (FR-GIG-5 mirror), re-books nothing, and records the correction **beside**
the spec's sentence rather than over it (E-3). The fourier half is unchanged and is now **sharper
than the spec's C-6/C-7 reading**: it is not only the contour write that declines the channel — **no
client call site passes a key at all**. ▲ **K12 holds**: `fr-GalleryDraftsSection B-2`'s duplicate-row
outcome closes **STATICALLY**; there is no repeat-publish loop anywhere in the script, and SS-13
spends no probe here. ▲ The `:disabled` cure is **F.W3/W4's** and F.W8 claims no part of it.

### 3b.3 §M — measurement integrity (gate **G9**, and the rows it carries for **G2 · G15**)

| id | spec row | the assertion | today's reading | gate |
|---|---|---|---|---|
| **F8-WALK-M01** | §M **M1** (`FR-GV-12` ⊕ `VV-R2-A` ⊕ `FR-GV-24` rides) | **the walk's perturbation is fully accounted**: Δ`views` observed over the leg **minus** the ledger's declared read count for that slug is **ZERO**; a remainder is **UNSUBTRACTABLE** and is published as a RED, never smoothed | the full declaration is **§3b.4**. Value-side reads are **provably non-mutating** and re-proved per run with an **empty** volatile set; the fourier read verb is **UNSAFE-DECLARED** and subtracted | **G9** |
| **F8-WALK-M01-V** | §M **M1** (value half) | `GET /palettes/:slug/versions` is **pure**: two reads, **byte-identical**, with the declared volatile set **NONE** | the only `$inc`s in the palette module are on **write** verbs — `voteCount` (`repository/palette.ts:246`/`:266`), `forkCount` (`:276`/`:286`), `versionCount` (`service/versions.ts:234`). **No read path mutates**, so the claim is provable rather than asserted | **G9** |
| **F8-WALK-M02** | §M **M2** (`FR-USB-24 ⊕ FR-USB-23`) | **auth mutations pass `retryOn429: false`** — this instrument **never** sleeps through a `429`; every wait is **surfaced** with its `Retry-After` | the product client defaults to `retryOn429 ?? true` (`web/src/lib/api.ts:232`) with `MAX_RATE_LIMIT_RETRIES = 2` (`:137`) and the retry branch at `:243` — *a horizon probe that silently retries manufactures false timings and false greens*. The walk has **no retry branch at all**. ▲ The dead session subsystem is **RULED DELETE** (§0j.D **F-SS4REST R9**): `clearSession` is defined `stores/auth.ts:112`, exported `:141` and **called from nowhere**; `logout` (`:60-70`) ends at `setSessionToken(null)` (`:70`); the `else if (sessionToken.value)` bootstrap arm (`:29`) would re-attach an anonymous identity on reload if revived — **an identity-mixing bootstrap poisons every attribution the history walk records**. The value-side mirror is **V-γ** (`service/crud.ts:92` nullable `userSlug`, gated `:136`; `service/versions.ts:201`, with `$inc versionCount` at `:234` regardless) — **VALUE-SIDE, never re-booked as a fourier defect**. ▲ Session-token-at-rest is the one place **value.js is strictly ahead** (digest as `_id` vs a plaintext UUID) — **recorded so the union does not regress it** | **G9** |
| **F8-WALK-M03** | §M **M3** (`FR-GV-9`) | a batch **Unfeature** preserves an orthogonal **SAVED** tier — *tier is a state machine, not a scalar collapse* | `api/routers/admin.py:436-440` — `update_many({slug: {$in: …}}, {"$set": {"tier": "normal"}})` **unconditionally**, against the feature arm at `:430-433`. **F.W8 owns only the assertion**; the gate is **G2** (the walk map's admin leg, unit `a`) and the **semantics** ruling is F.W5/F.W6's — one home, two citations, nothing re-booked | G2 (asserted here) |
| **F8-WALK-M04** | §M **M4** (`R3-7b`; `fr-GalleryDraftsSection F-4` ⊕ `fr-AdminFlaggedPanel FR-AFP-4`) | the authenticated leg asserts, **per operation**, the **authority class** F.W5's register declares | **CONSUMED** from `contract/operation-register.md`, never re-derived. A call whose class is undeclared is a RED **at the register**, not a silent pass in the run | G2 · **G15** |
| **F8-WALK-M05** | §M **M5** (`R3-7c ⊕ X-3`) | the **denominator of record** is **cited, never re-cut** | `45 = 30 + 13 + 1 + 1` (F.W5's register) and C31's **30/37 terminal**, **OWNER-FROZEN** under **OG-F1** — 32/38 only if lawfully replaced. ▲ **X-9 honoured by construction: no percentage is published by this unit, in this register or in the script.** ▲ Ordering is **`UTF8_BYTEWISE_CODEPOINT`**, never `localeCompare`, for every identity list and any digest | G2 · **G15** |

### 3b.4 **THE NON-PERTURBATION DECLARATION** (gate **G9**) — stated whole, with its subtraction

G9 clears when *"the walk's **reads** are provably non-mutating, **or** the perturbation is **declared
and subtracted** in the walk record; auth mutations pass `retryOn429: false` or surface the wait."*
**Both limbs are discharged here, and they are discharged differently on the two sides** — which is
itself the finding:

1. **VALUE.JS — PROVABLY NON-MUTATING, and proved per run.** No palette **read** path carries a
   mutation: the module's only `$inc`s sit on the vote, fork and version **write** verbs (measured
   above). The walk does not rest on that reading: `proveSafeRead` reads **twice** and diffs, with the
   row's volatile field set declared **by name** — and for these rows it is **empty**, which is the
   strongest form the claim has. ▲ **No blanket allowlist exists anywhere in the instrument**; a
   volatile field that is not named is a difference, and a difference is a RED.
2. **FOURIER — ONE UNSAFE READ, DECLARED AND SUBTRACTED.** `GET /api/visualizations/{slug}` is an
   unsafe read that **cannot observe its own side effect**: `find_one` (`api/routers/visualizations.py:256`)
   → `$inc {"views": 1}` with `last_accessed_at` (`:269`) → `_public_doc` serialising the **pre**-increment
   document (`:272`), and `_public_doc` itself strips only `_id`/`liked_ips` (`:80`). The same verb is
   the **ETag-capture path** (`stores/gallery.ts:255`, `:293`, `:311`; a freshly minted draft's ETag
   lives in a different store — `stores/workspace.ts:47`, written `:222`/`:371`/`:396` — so the map
   **always misses**), which is why every ETag cache-miss on publish or soft-delete **adds a phantom
   view to the row being mutated**. There is **no `viewed_ips` dedup** while `liked_ips` exists.
   **RFC 9110 §9.2.1**: a mutating GET is unsafe against any proxy or prefetch — so the walk treats an
   unaccounted delta as a defect, not as noise.
3. **THE SUBTRACTION, made falsifiable.** Every UNSAFE read declares `{target, field, delta, reason,
   rfc}` into the ledger **at the moment it happens**; the measurement leg then reads the counter and
   asserts `observed − declared === 0`. ▲ **A remainder is not absorbed**: it is published as
   `UNSUBTRACTABLE` with its figure, and the assertion is RED — because a remainder means *another*
   reader (a proxy, a prefetch, a second client) touched the row under measurement, which is exactly
   the condition that makes a horizon probe's numbers fiction.
4. **THE TWO PROBE-SUPPRESSION LOCKS, honoured rather than cited.** ▲ **FR-GV-24** — *repair tests
   must NOT assert a re-open view increment; the guard DOES work within a session, the defect is
   SCOPE*: the **only** view assertion in the instrument is the ledger equality above, and no
   assertion anywhere claims a re-open increment. ▲ **K12** — B-2's duplicate-row outcome closes
   **STATICALLY**: **SS-13 spends no probe here**, and no F.W8 gate is discharged by an SS-13 probe.
5. **THE AUTH LIMB.** The instrument's client has **no retry branch**: `retryOn429` is false **by
   construction**, a `429` is recorded with its `Retry-After` into `rateLimitWaits`, and `F8-WALK-M02`
   asserts that no wait was hidden. ▲ **Per-call abort (M-CK class)**: every request owns its own
   `AbortController` — there is no shared abort key in this instrument — and **no leg enumerates a
   chain through a list endpoint**, because the list contract returns an intersection of a filter and
   a page window and the product's `resetAndFetch`/`fetchNextPage` share **one** abort key. **Fixing
   the per-call key is the fourier API row's act, not the walk's**, and the walk neither depends on it
   nor claims it.

### 3b.5 §D — the **D2 geometry tripwire**, as a lock **on the instrument** (`F8-WALK-D02`)

**The tripwire is banked at F-W5 G16 and F.W8 does NOT re-book it** (spec §D D2). It is carried here
**only** as a binding lock on the prototype, and the instrument enforces it on itself:

- ▲ **DO-NOT-REGENERATE on `master`** — *"if any wave attempts regeneration before F.W5–W8 lands the
  pipeline, **L-B1** and **L-B2/C-2** REVIVE AT BLOCKER with the DO-NOT-REGENERATE rider as the
  tripwire."* The revival condition is **carried untouched**; nothing here demotes or discharges it.
- `assertGeometryTripwire` reads the walk's **own call log** and asserts that **no request** touched a
  generator, a tracked contour artefact or a `scripts/` path (`precompute_svg_fourier` ·
  `raw-contours.json` · `moon.json` · `/scripts/`). **A guard that reads the log cannot be satisfied
  by intention**; it is satisfied by the run or it is RED.
- The derive leg derives **only** from an **ephemeral image the runner supplies**, never from a
  tracked asset; with no image the leg is **BLOCKED**, not skipped and not re-pointed at a fixture
  asset.
- ▲ **`fr-FourierShapeExtractor C-3` — NO CLOSURE HEURISTIC**: `F8-WALK-R04-FLAG` asserts the
  closed/open flag is **CARRIED on the response**, and the instrument **infers it nowhere** (the
  44.08-closed / 44.97-open overlap is exactly why a heuristic would be a fabrication).
- The report path is refused if it resolves **inside either repository**
  (`assertReportPathOutsideRepos`), so a run of this instrument cannot write a byte of the fourier
  tree even by accident — the read-only law made mechanical.

### 3b.6 G13's liveness — why the consumption map is **seeded, not complete**

The map carries a disposition for every field this seat could **measure**: the three dead ones above
(`DROP`, each with the site that produces it and the absence that damns it) and the live ones with
their named consumer. It is **not** a complete enumeration of the wire, and it does not pretend to be
— completing it requires **running** the walk, which is **F.W9/W10's act**. So the gate's shape is
written into the instrument: the first run publishes the **UNDECLARED** remainder, each member takes a
**drop-or-consume** disposition by **dated addendum-beside** (E-3), and only then can the row go
GREEN. ▲ **Two false greens are foreclosed by construction**: an **empty** traversal returns
**BLOCKED**, never GREEN (a walk that observed nothing satisfying *"no undeclared field"* is the
exact shape this law exists to stop), and the traversal is fed **by the client on every call** rather
than by each leg remembering to hand it a body. ▲ The three ids are **deduped by mechanism with all
three preserved** — `M-β4` is *"the R6-8 seam's converse: server computes, nobody consumes"*, the
third direction of one seam.

### 3b.7 G7's ruled branch — what the fixture may **not** do

⊙ **RULED** at COHESION **§0j.D F-SS4REST R5**: **STOP MINTING**. The consequences, stated so no later
seat reads the register as neutral: **(i)** the fixture proves **that** branch and no other — F.W8 may
not author on a guessed branch and, since the ruling landed, no longer needs to; **(ii)** *admitting*
`[]` in the contract is **dead**, so no row here relaxes `min_length=1`; **(iii)** the **silent
rewrite must not survive either way** — which is why `F8-WALK-R03-LAUNDER` asserts the refusal
**creates nothing**, and why the two store substitutions and the mint are **named at their bytes**
above rather than left as prose; **(iv)** the client half is **F.W3/W4's cure** and **F.W8 claims no
credit for it** (FR-GIG-5 mirror). ▲ **The anchor divergence the spec booked is DISCHARGED here**:
§R R3 recorded *"the corpus cites `:184/:279`, a read-only seat inspection gives `:186/:280`"* as a
**re-resolve obligation after F.W0 (D-19)**, adopting neither pair. Measured at fourier `21e11b0` by
this seat, double-run: ⟨cmd⟩ `grep -n "min_length=1" api/models/visualization.py` → **`:186`** (the
create arm) and **`:280`** (the remix/patch arm). The obligation is discharged **at the bytes**, and
the spec's own cell is left unrewritten (E-3).

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

---

## §14 Unit `d` — D-19 re-resolution, the assertion roster, self-count and gate readings (appended 2026-09-19)

Appended by unit **`d`** under the §2c serial lock. **Nothing above this line was rewritten**: §3b is
an insertion before §4 and this section is an append, so units `b`'s and `c`'s bytes stand
byte-for-byte and their published self-counts are re-measured at §14.3 rather than assumed.

### 14.1 D-19 — the anchors this unit's rows rest on, re-resolved BEFORE any citation

F.W0's `SUBSTRATE-LEDGER.md` §2.1/§2.2 do not reach api/py coordinates (the record's open seat quotes
§2.1.3 row 5: *"RECORD (api/py coordinates are outside F.W0's bounds)"*), so the obligation lands
here, exactly as it landed on unit `b`. Measured at **fourier `21e11b0`** (worktree 0 dirty) and
value.js **`tranche-u`**, read-only, 2026-09-19.

| # | witness, as the spec states it | measured at this seat | state |
|---|---|---|---|
| 1 | server `AnimationSettings` `shared.py:65-71` (`30 / 30.0 s / 80`) | `api/models/shared.py:65` class · `:66` `fps: int = 30` · `:67` `duration: float = 30.0` · `:68` `max_circles: int = 80` · `:69` easing · `:70` `speed: float = 1.0` · `:71` active_bases | **HOLDS, byte-exact** |
| 2 | client `defaults.ts` (`60 / 5000 ms / 100`) — **no path in the spec** | `web/src/lib/defaults.ts:24-28` — `fps: 60` · `duration: 5000` · `max_circles: 100` · easing · `speed: 1` | **HOLDS**; the path is recorded here |
| 3 | renderer `ref(80)` (`:47`) | `web/src/components/visualization/BasisCanvas.vue:51` `const maxCircles = ref(80);` | **DRIFTED, holds** |
| 4 | `animation.ts:23` → `20000 ms` | `web/src/stores/animation.ts:77` `const duration = ref(20000); // ms per full cycle` | **DRIFTED, holds** (BC-20's subject — **not re-booked**) |
| 5 | `animation_settings` is atom 4-of-5 (`atomdiff.py:38`) | `api/lib/crud/atomdiff.py:29` `ATOM_KEY_ORDER` — `active_bases · n_harmonics · contour_settings · animation_settings · palette_slug`; the path is `api/lib/crud/`, not `api/services/` | **DRIFTED + path-qualified, holds** |
| 6 | `VisualizationUpdate` `visualization.py:198-210` | `api/models/visualization.py:198` class · five fields `:203-207` · `model_config = ConfigDict(extra="forbid")` `:209` | **HOLDS** (the span ends `:209`) |
| 7 | `VisualizationPatch` `types.ts:256-262` | `web/src/lib/types.ts:262-268` | **DRIFTED +6, holds** |
| 8 | the off-state mint, `:103-104` | `BasisSelector.vue:102` — *"Go to \"off\" — allow empty selection (canvas handles it gracefully)"* | **DRIFTED, holds** |
| 9 | `min_length=1` at `:184/:279` **or** `:186/:280` — the spec adopts **neither** (a booked re-resolve obligation) | `api/models/visualization.py:186` (create arm) · `:280` (remix/patch arm), double-run | ⌧ **OBLIGATION DISCHARGED**: `:186/:280` |
| 10 | the store substitution `workspace.ts:351-353` | `web/src/stores/workspace.ts:362-365` | **DRIFTED, holds** |
| 11 | the second substitution `gallery.ts:252` | `web/src/stores/gallery.ts:338-340` | **DRIFTED, holds** |
| 12 | the loader refuses to restore `[]` (`:53`) | `useWorkspaceLoader.ts:72-73` — the restore is gated on `as?.active_bases?.length` | **DRIFTED, holds** |
| 13 | the loader force-prepends on first data (`:109-114`) | `useWorkspaceLoader.ts:150-153` | **DRIFTED, holds** |
| 14 | `extraction_cache_key` closed literal `image_storage.py:250-266` | `api/services/image_storage.py:248` def · `:250-265` the literal (ten settings fields ⊕ `_v`, `sort_keys=True`) · `:266` the digest | **HOLDS** |
| 15 | `images.py:219-226` short-circuits **before** `compute_contours` | `:219` key · `:220` `find_one` · `:221-226` `return contour_response(existing)` · `:230` `compute_contours` | **HOLDS, byte-exact** |
| 16 | `auto` is the shipped default (`defaults.ts:4`) | `web/src/lib/defaults.ts:9` `strategy: "auto"` | **DRIFTED, holds** |
| 17 | the 500 ms writer `VisualizationView:53-64` | `VisualizationView.vue:53` `watchDebounced(` … `:64` `{ debounce: 500, deep: true }` | **HOLDS, byte-exact** |
| 18 | `saveVisualization` reads `toRaw(...)` synchronously (`workspace.ts:344-357`) | `stores/workspace.ts:356` `async function saveVisualization()` · `:368` `animation_settings: toRaw(animationSettings.value)` | **DRIFTED, holds** |
| 19 | the flush seam **is** the banked `setEasing` action (L-12/C-25) | ⟨cmd⟩ `grep -rn "setEasing" web/src` → **no output**, double-run | ⊘ **NOT HOLDING** (§3b.1 R05) |
| 20 | `EpicycleData.trace`: 3000 samples, **zero readers**, `structuredClone`d (`workspace.ts:95-104`) | produced `api/services/computation.py:127` · declared `web/src/lib/types.ts:25` · ⟨cmd⟩ `grep -rn "\.trace\b" web/src` → **no output** · cloned `stores/workspace.ts:109-117` (`epicycleData` at `:114`) | **DRIFTED, holds** |
| 21 | `reconstructed_points` (`equations.py:114`/`:128`), read by nothing | both byte-exact; model `api/models/equations.py:33`; client type `web/src/lib/equation/types.ts:31`; no reader | **HOLDS, byte-exact ×2** |
| 22 | `preview_path` written `""` at `assets.py:85`, `image_storage.py:318`, `responses.py:22` | all three byte-exact; client type `web/src/lib/types.ts:77` | **HOLDS, byte-exact ×3** |
| 23 | `find_one :256` → `$inc {views:1}` `:268-270` → `_public_doc` `:272` | `api/routers/visualizations.py:256` · `:269` `{"$inc": {"views": 1}, "$set": {"last_accessed_at": …}}` · `:272` `body = _public_doc(doc)` | **HOLDS** (the `$inc` sits at `:269`, inside the cited span) |
| 24 | no `viewed_ips` dedup while `liked_ips` exists | `liked_ips` at `visualizations.py:80`/`:318`/`:705`, `admin.py:87`/`:555`, `gallery.py:34`; `viewed_ips` → **no output** | **HOLDS** |
| 25 | the ETag map always misses (`workspace.ts:359`; `gallery.ts:167`/`:223`) | `stores/workspace.ts:47` declares `visualizationETag`, written `:222`/`:371`/`:396`; the gallery's own map at `stores/gallery.ts:78`, captured `:255`/`:293`/`:311` | **DRIFTED, holds** |
| 26 | the silent ≤60 s retry (`retryOn429 ?? true`) | `web/src/lib/api.ts:232` default true · `:137` `MAX_RATE_LIMIT_RETRIES = 2` · `:243` the retry branch · `:252` `abortableSleep` | **HOLDS** (the spec gives no line) |
| 27 | batch Unfeature `$set tier normal` (`admin.py:435-440`) | `api/routers/admin.py:436-440` `update_many(...)`, feature arm `:430-433` | **HOLDS** (span starts `:436`) |
| 28 | fourier's idempotency counter-witness (`visualizations.py:612`) | `:612` byte-exact — **and a SECOND site the spec does not name: `:236`, the CREATE route** (`@router.post("")` `:164`) | **HOLDS + one unstated site** (§3b.2) |
| 29 | value.js's transactional fork (`forks.ts:94-137`) | `api/src/modules/palette/service/forks.ts:105-128` (`withTransaction`, in-txn source re-read, `incrementForkCount` `:149`) | **DRIFTED, holds** |
| 30 | **V-γ** (`crud.ts:119`, `crud.ts:204`, `versions.ts:147`) | `service/crud.ts:92` `userSlug: string \| null` · `:136` `if (userSlug)` gate · `service/versions.ts:201` the same gate · `:234` `$inc: { versionCount: 1 }` regardless | **DRIFTED, holds in substance** |

**Nothing above is re-booked as a defect of either repo**, and **nothing drifted was written into a
banked file** (E-3): a drifted address is a re-resolve obligation, a **non-holding** witness is a
finding stated with its receipt (row 19 → §3b.1 R05), and row 9 is an obligation the spec explicitly
declined to settle and this seat discharges **at the bytes**.

### 14.2 The assertion roster — every id the script records is named in this register

⟨cmd⟩ (base `docs/tranches/X/fourier/conformance`)
`grep -oE 'register\.(assert|record|blocked)\("F8-WALK-[A-Z0-9-]+"' walk/union-walk.mjs | grep -o 'F8-WALK-[A-Z0-9-]*' | LC_ALL=C sort -u`
→ **26 ids**, ⊕ **`F8-WALK-M01-V`**, which that probe **cannot** see and which is disclosed rather
than lost: it reaches `register.assert` through `proveSafeRead`'s `assertionId` **parameter**, not as
a literal at the call. **27 recorded ids.** Two further spellings — **`F8-WALK-P07`** and
**`F8-WALK-R03`** — are **family labels in comments**, not assertions, and are named here so a later
seat does not read them as missing rows.

| id | home | why it is / is not a §3b row |
|---|---|---|
| `F8-WALK-R01` · `R02` · `R04` · `R04-FLAG` · `R05` · `R06` | §3b.1 | **ROWED** — §R's own rows, gates G6/G8/G13 |
| `F8-WALK-R03-F` · `R03-LAUNDER` · `R03-V` | §3b.1 (R03) ⊕ §3b.7 | **ROWED as one row with three limbs** — the ruled G7 branch: refusal-with-diagnostic (F), creates-nothing (LAUNDER), the value-side cardinality mirror (V) |
| `F8-WALK-P07-F` · `P07-V1` · `P07-V2` · `P07-DIV` | §3b.2 | **ROWED** — G10, both sides, plus the divergence row |
| `F8-WALK-M01` · `M01-V` · `M02` · `M03` · `M04` · `M05` | §3b.3 | **ROWED** — G9 and the rows it carries for G2/G15 |
| `F8-WALK-D02` | §3b.5 | **ROWED as a LOCK**, not a gate: the tripwire read off the walk's own call log |
| `F8-WALK-DIFF-F` · `DIFF-F404` · `DIFF-V` | the script's diff leg | **NOT a §3b row**: the diff leg's disposition is **G1's** (ruled one-sided, §0j.D F-SS4REST R1) and its fixture is **`F8-FIX-F04`** (unit `b`). The walk executes it; F.W8.d books nothing of it |
| `F8-WALK-REMIX-F` · `REMIX-V` | the script's remix leg | **NOT a §3b row**: the remix verb's walk cell is **unit `a`'s** (§P, gate G2). The assertion carries the born-`draft` ⟂ born-`private` divergence and re-books nothing |
| `F8-WALK-HIST-F` · `HIST-V` | the script's history leg | **NOT a §3b row**: the history cell is **unit `a`'s** (G2); the round-trip property it feeds is R02/R05 above |

▲ **The difference that matters is ∅**: every id the script records is named in this register, with
its home. The reverse difference is **not** ∅ and must not be — nine of the ids belong to legs whose
**gates other units own**, and rowing them here would be exactly the double-booking R-5 and the
one-home rule forbid.

### 14.3 The siblings' published probes, RE-MEASURED after this append

| sibling claim | probe, re-run at the settled bytes | reading |
|---|---|---|
| unit `b` §11.1 — fourier-direction fixture rows | `grep -c '^\| \*\*F8-FIX-F' fixture-register.md` | **9** (unchanged) |
| unit `b` §11.1 — value-direction fixture rows | `grep -c '^\| \*\*F8-FIX-V' fixture-register.md` | **8** (unchanged) |
| unit `b` §1.2 / §11.1 — the direction-law falsifier | `awk -F'\|' '/^\| \*\*F8-FIX-/ {print $5}' fixture-register.md \| grep -n 'web/src/\|demo/'` | **no output** (unchanged) |
| unit `b` §10 — bytewise ordering of the fixture rows | `grep -o '^\| \*\*F8-FIX-[A-Z][0-9][0-9]' … \| LC_ALL=C sort \| diff - …` | **no output** (unchanged) |
| unit `b` §1.3 X-3 — the K-3 set-membership claim (*"two lines, both of them this file's own law"*) | `grep -c` over that term | **2** (unchanged) — **this unit writes the term nowhere**, which is why the claim still holds |
| unit `c` §3a — the control rows | `grep -c '^\| \*\*F8-C31' fixture-register.md` | **2** (unchanged) |

▲ **Unaffected BY CONSTRUCTION, and then measured anyway.** Every sibling probe is anchored on a row
prefix (`^| **F8-FIX-`, `^| **F8-C31`) and this unit's namespace is **`F8-WALK-*`**, disjoint from
both; the insertion renumbers nothing and rewrites no byte above it. ▲ **The K-3 row is the one a
careless append could have falsified** — a single use of that term anywhere in this file would have
turned unit `b`'s *"two lines"* into three and convicted it for this seat's prose. It is used nowhere
here, and no row below cites the refuted scenario.

### 14.4 Self-count — read from the SETTLED bytes, double-run (SELF-COUNT law)

| figure | probe | reading |
|---|---|---|
| §3b.1 §R assertion rows | `grep -c '^\| \*\*F8-WALK-R0' fixture-register.md` | **6** (`R01`…`R06`) |
| §3b.2 §P7 rows | `grep -c '^\| \*\*F8-WALK-P07' fixture-register.md` | **4** |
| §3b.3 §M rows | `grep -c '^\| \*\*F8-WALK-M0' fixture-register.md` | **6** |
| ids recorded by the script | §14.2's probe ⊕ the disclosed `M01-V` | **27** ⊕ **2** comment-only family labels |
| the instrument | `wc -l walk/union-walk.mjs` | **1074 lines** |
| the instrument PARSES | `node --check walk/union-walk.mjs` | **exit 0**, run twice |
| percentages published by this unit | `grep -c '[0-9]%' fixture-register.md walk/union-walk.mjs` | **none** (X-9: one member-scope law before any percentage, and this unit publishes no ratio of coverage at all) |

▲ **`node --check` is a PARSE, not a RUN, and the distinction is the whole of the lock's meaning.** It
executes no statement, opens no socket, reads no environment and writes no byte; the walk itself was
**not run**, in any mode, under this wave. It is reported because handing F.W9/W10 a syntactically
broken instrument would be the defect this wave exists to avoid — and because a claim that a file is
runnable, made without measurement, is the class this tranche convicts.

### 14.5 Gate readings — BEFORE → AFTER, with split verdicts

| gate | BEFORE (record §B.2) | AFTER, at these bytes | verdict |
|---|---|---|---|
| **G6** round-trip replay reproduces its own frame | **RED** — no round-trip assertion exists | Three assertions authored with their dispositions: **R01** (every `AnimationSettings` field round-trips **in the server's declared unit**, with the 1000× `duration` fork named at three declarations), **R02** (the atom set's reachability, **with the re-declaration written out** rather than left divergent), **R05** (the last value sent is the value persisted, **with the UI-timing half declared unassertable by this instrument and routed**) | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: the three-way unit fork stands unreconciled and `animation_settings` is still unreachable by the update verb. GREEN owners **F.W5** (units · atom set) · **fourier API row** (the verb) · **F.W3/W4** (the seam) |
| **G7** ⊙ off-state / cardinality admission | **RED** (ruled, unproven) | The ruled branch — **STOP MINTING** (§0j.D F-SS4REST R5) — is the **only** branch authored: **R03-F** (refused with a diagnostic **naming the field**), **R03-LAUNDER** (the refusal creates nothing), **R03-V** (the value-side cardinality mirror). The mint and both laundering sites are named **at their bytes**, and the spec's booked `:184/:279` ⟂ `:186/:280` obligation is **discharged by measurement** | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: the server half is already conformant; the **client half stands at HEAD** (mint + two substitutions + the loader's two arms). GREEN owner **F.W3/W4** — and **F.W8 claims no credit for that cure** |
| **G8** cache identity ⊇ consumed request fields | **RED** — no derive-leg fixture asserts `contour_hash` instability | **R04** authored in full: two derives differing **only** in `ml_threshold`, asserting **INSTABILITY**; the closed 10-field key and the pre-`compute_contours` short-circuit measured at their bytes; **R04-FLAG** carries the closed/open flag rather than inferring it (**C-3**); the leg is **BLOCKED, not skipped**, without an ephemeral image (**D2**) | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: the hash is **stable today, and that stability is the defect**. GREEN owner **fourier API row** |
| **G9** the probe does not perturb what it measures | **RED** — no walk record ⇒ no declared-and-subtracted perturbation | **§3b.4 is the declaration, whole**: one side **provably non-mutating** (and re-proved per run with an **empty** volatile set, no blanket allowlist anywhere), one read **UNSAFE-DECLARED** with **RFC 9110 §9.2.1** cited and **subtracted**, the remainder asserted **ZERO** and an unsubtractable remainder published as a RED. Auth mutations pass **`retryOn429: false` by construction** — the instrument has no retry branch — and every 429 wait is surfaced. **FR-GV-24** and **K12** honoured: no re-open increment is asserted anywhere, and SS-13 spends no probe | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: the read verb still mutates and the ETag map still misses, so the perturbation is *subtracted*, not *absent*. GREEN owners **fourier API row** ⊕ **F.W4** |
| **G10** create leg idempotent-or-declared, both sides | **RED** — register ABSENT ⇒ neither half recorded | **§3b.2 records which half each repo holds, measured at HEAD**: fourier holds server-side replay on **two** routes (`:236` create — a site the spec does not name — and `:612` remix) that **no shipped client call site can reach**; value.js holds **both** halves on the fork verb (key **REQUIRED**, 400 without, ⊕ transactional with an in-txn re-read). Four assertions authored, including the **`400`-without-a-key** limb and the born-`draft` ⟂ born-`private` divergence **stated, never harmonised** | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: the fourier client passes a key **from nowhere**. ▲ **The spec's *"neither side holds both"* is CORRECTED for the value side by addendum-beside**, naming the X·V commit that landed it (**`cbf178ce`**) and claiming **no credit**. GREEN owners **fourier API row** (pass the key) · **value.js API row** (holds its half today) |
| **G13** liveness — every envelope field has a producer AND a consumer | **RED** — the walk does not exist ⇒ the unconsumed set is unmeasured | **R06** authored: the traversal is fed **by the client on every call**, each field takes a **drop-or-consume** disposition, an **UNDECLARED** field is a RED, and an **empty traversal is BLOCKED, never GREEN**. The three measured dead fields are seeded with their producing sites and their absent consumers | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: three fields are **proven dead** and the UNDECLARED remainder is unmeasurable until the walk runs (F.W9/W10). GREEN owners **F.W5** (the predicate) · **fourier API row** (drop or consume) |

**No gate measured GREEN before its cure. No gate is discharged by an SS-13 probe** — this unit ran
none, and spent no live probe of any kind. **Probe parsimony (§5.2): bounded `grep`/`sed`/`awk`/`git
log` reads across both trees, and two `node --check` parses of this unit's own file — zero live
probes, zero browser, zero runs of the walk, zero writes outside the two writable paths, and zero
fourier bytes in any verb.**

### 14.6 What this unit hands on

- **to unit `e`** — four items travel in the FN-6 relay letter beside unit `b`'s three: **(i)** the
  **G10 correction** (value.js holds both halves at HEAD; fourier's client passes a key from nowhere —
  the ask is the client-side key, not a server change); **(ii)** the **`setEasing` seam-name absence**
  (the banked L-12/C-25 name does not exist at HEAD — a naming question for F.W5/F.W3-W4, and the
  reason the walk invents no seam); **(iii)** the **G13 consumption map** as the artefact fourier's
  side must complete or contest, field by field; **(iv)** the **run contract** — `UNION_WALK_ENV=nonprod`,
  the two base URLs, the tokens, and an **ephemeral image**, because without one the derive leg is
  BLOCKED by the D2 tripwire rather than re-pointed at a tracked asset.
- **to F.W9/W10** — the instrument is **authored and parse-checked, never run**. Its exit code is
  non-zero on **any** RED **or** BLOCKED and there is **no flag that changes that**; its report carries
  the perturbation ledger with its subtraction, the rate-limit waits it refused to sleep through, and
  the full call log the D2 tripwire is asserted against. The first run's **UNDECLARED** envelope-field
  set is the G13 work item and takes its dispositions **by dated addendum-beside**, never by rewriting
  a row above.
- **to the census and the keystone** — the **`:186/:280`** discharge (§14.1 row 9) and the **second
  idempotency site** (`visualizations.py:236`, §14.1 row 28) are recorded readings, not re-gradings.
  **F.W8 books no canonical row.**
