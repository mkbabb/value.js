SERVED MODEL: claude-opus-5[1m]

# J-diff-shape-v2 — the shared-provenance API contract (the neutral document both repos co-sign)

**Supersedes**: `J-diff-shape` (v1) **BY REFERENCE ONLY.** v1 lives in the fourier tree at
`docs/tranches/J/design/J-diff-shape.md` and is **IMMUTABLE** — v2 edits not one byte of it (E-3:
addenda, not patches). Where v2 is silent, v1 governs unchanged.

**Authority**: `docs/tranches/X/fourier/waves/F-W5.md` (the wave spec) · `docs/tranches/X/COHESION.md`
§0/§1 SS-4 and **§0j.D** (the owner's rulings under the 2026-09-17 begin-word).
**Status**: **§A and §B authored** (F.W5 unit b, 2026-09-17). §C–§E land at unit c; §F–§G and the
value-side obligation list at unit d; the inline ruling block is
`contract/OWNER-RULINGS-F.W5.md` (unit e).
**Neutrality**: this document is authored in the value.js tree because value.js is the wave's writing
repo, and it is **neutral in force**: every clause binds **both** ends or names which end it binds and
why. It is received by fourier as a letter
(`docs/tranches/X/coordination/value-to-fourier-cosign-J-diff-shape-v2.md`, unit e) — **a contract
nobody received is not co-signed** (G20).

---

## §0 — What v2 is, what it inherits, and how to read a clause

### §0.1 The scope change, stated once

v1's subject is **one envelope**: the `/diff` response body and the `AtomOp` structure, with a casing
rule and a close-gate clause binding each repo's probe to the document rather than to its sibling. That
subject is **not withdrawn** — it is the shape of v2's §F band, and v1 §§2–5 remain the canonical
settlement of the op vocabulary, the wire/stored field split, the from/to identifiers and the JSON
examples.

v2's subject is **the whole shared-provenance API surface**: 45 operations, their identity on the wire,
their envelope, their authority class, their boundary posture, their join to a client, their provenance
and their persistence. The reason for the widening is v1's own: v1 fixed one envelope so two
implementations could not drift **at that envelope**, and the registry then found the same drift class
at every other seam the two repos share. **v2 generalises v1's method — one repo-neutral shape,
each side asserting against the document and never against its sibling — to the surface v1 left
unspoken.**

### §0.2 Supersession, exactly

| v1 clause | v2 disposition |
|---|---|
| §1 — the two layers (ENVELOPE identical / atom VALUE repo-local) | **RESTATED and widened** — §A2 makes the envelope decision once for the whole surface; the layer split is v2's governing distinction, not the `/diff` route's alone |
| §1's inv boundary (inv-16 shared-by-contract, inv-26 one contract source) | **inv-16 RESTATED unchanged · inv-26 RESTATED in its first limb and AMENDED in its second, openly, under owner ruling R7 — see §A4.** No limb is silently reversed |
| §2.1–§2.5 — the five canonical decisions | **IN FORCE, unamended.** v2 adds nothing and withdraws nothing |
| §3.1–§3.3 — the canonical shapes | **IN FORCE**; §F re-states the diff envelope against them (unit d) |
| §4 — the casing rule | **RESTATED AS A MECHANICAL CHECK ON EACH SIDE — see §A2.4** (G18's casing limb). The rule's content is unchanged; what changes is that it is no longer prose a reader applies |
| §5 — the JSON examples | **IN FORCE**, as v1's bytes |
| §6 — the close-gate clause | **RE-AUTHORED at unit c** under owner ruling R1 (`§0j.D` F-SS4REST): value.js is re-scoped out of the diff clause, so the parity verdict becomes explicitly **one-sided**. v2 §A2/§A3 do not pre-empt that re-authoring; the casing limb below is stated so it survives either verdict |
| §7 — the summary | superseded in scope by this §0, unchanged in content |

### §0.3 Bases, and the measure-at-open declaration (D-19)

Every ⟨cmd⟩ in §A and §B was run **at this seat, 2026-09-17**, from the base assigned in this block.
No figure is inherited from any earlier pass.

```
F=/Users/mkbabb/Programming/fourier-analysis   # READ-ONLY, always — v2 writes zero fourier bytes
V=/Users/mkbabb/Programming/value.js
```

Commands run from `$F` or `$V` as named at their site. Engine: **`/usr/bin/grep` (BSD)** wherever the
result is an engine fact. Every published figure was **double-run against the settled bytes**
(`run1 ≡ run2`) before this file was committed.

### §0.4 How to read a clause

Each clause carries four parts and is defective without them:

- **RULE** — the normative sentence both repos co-sign. This is the contract.
- **WITNESS** — the measured fact that makes the rule necessary. *A clause that names no witness is not
  a clause* (F-W5 §0a).
- **DISPOSITION** — who owes the act, stated as **one home and two citations**. **v2 repairs nothing**
  and claims credit for nothing (F-W5 §0b; FR-GIG-5's bar).
- **LOCK** — the constraint a later wave may not quietly drop.

`‡` = BLOCKER-weight · `⊙` = OWNER-GATED (unauthorable unruled) · `▲` = a lock that binds the repair,
not the finding.

### §0.5 Three witness corrections, recorded here rather than assumed

The spec's witness prose was re-measured at the true bytes before any clause was written (METHOD:
*verify every anchor at true bytes; a drifted anchor gets INTENT at the true bytes, recorded*). Three
spellings did not reproduce **as spelled** while their **mechanism** reproduced exactly. The spec is
IMMUTABLE (E-3), so nothing there is edited; the corrections live here and in the execution record.

1. **§A4's *"no `response_model` anywhere"*** — ⟨cmd⟩ (base `$F`)
   `/usr/bin/grep -rn "response_model" api --include='*.py' | wc -l` → **8**, not zero. The intent
   holds at the true bytes and is sharper than the absolute: **`visualizations.py` declares `0` across
   its 13 operations and `admin.py` declares `1` across its 13** (the `/stats` row), and the three
   flagged models are bound to **no route at all**. The clause is written against the measured split,
   never against the absolute. Per-router reading, this seat: `admin.py` 1/13 · `contours.py` 2/4 ·
   `equations.py` 2/2 · `gallery.py` 0/1 · `images.py` 3/7 · `sessions.py` 0/4 ·
   `visualizations.py` **0/13**.
2. **§A2's *"`Link: rel=next`"*** — ⟨cmd⟩ (base `$F`)
   `/usr/bin/grep -rn "Link\|rel=" api/lib/crud/cursors.py | wc -l` → **0**. fourier's opaque cursor is
   **body-borne**, not header-borne: `api/routers/visualizations.py:328-335` emits `next_cursor` and
   `has_more` inside the response body. The divergence A2 settles (opaque cursor vs offset/limit) is
   unchanged; only the transport spelling was wrong, and a contract that mis-states where a field
   travels cannot be mechanically checked.
3. **§A1's *"pydantic extra-ignore"*** — `AuditEntry` declares **no** `model_config`: ⟨cmd⟩ (base `$F`)
   `/usr/bin/grep -rn "model_config\|ConfigDict" api/models/admin.py` → **no output**. The drop of
   `_id` is pydantic v2's **default** `extra='ignore'`, inherited rather than declared. The mechanism is
   identical; the distinction matters because **a default is invisible at the model and an explicit
   `ConfigDict` is not** — `api/models/visualization.py` declares `extra="forbid"` at seven models and
   `api/models/assets.py:58` declares `extra="ignore"` at one, so the admin band's silence is a gap in
   an otherwise-explicit house style, not the house style.

### §0.6 How a probe reads this document

v2 exists to be **read by a machine**, not only by a person — §A2.4's casing check, §A4's generator and
§B3's anti-repeat probe all assert against these bytes. Two mechanics make that possible and are stated
here so no probe has to guess:

1. **Clause ids are stable and are the addresses.** `A1`…`A6`, `B1`…`B5` (and §C onward as they land)
   are permanent. A clause is cited **by id**, never by line: this file is live and line numbers move.
   Sibling specs already cite `A3`, `B4`, `B5`, `C1`, `C2`, `C4`, `C5`, `D1`, `D7`, `E10`, `E15`,
   `E16`, `G7c`; those ids carry the same content here. Where a sibling's citation is mis-keyed it is
   conformed **at the sibling** (R-1e) — never by renaming a clause here. **No clause is numbered
   `D9`**; `D9` is reserved for the ruled owner decision, which no clause may contradict.
2. **Normative sentences are matched under whitespace normalization.** This file is hard-wrapped for
   review, so a normative sentence may span two source lines and a naive `grep -F` of it returns **0**
   — an absence indistinguishable from a real one. The instrument that reproduces, portable on the
   pinned toolchain: ⟨cmd⟩ `/usr/bin/tr '\n' ' ' < J-diff-shape-v2.md | /usr/bin/tr -s ' ' |
   /usr/bin/grep -c -F '<the sentence>'`. Every ▲ LOCK and every **RULE** sentence in this document is
   greppable that way and was verified so at authoring, double-run. **A conformance probe that reads
   this file line-wise is measuring the wrap, not the contract.**

A fourth correction is one of **location, not substance**, and is noted at its clause: §B5's `as any`
static-JSON seam is at `web/src/components/morph/FourierMorphDemo.vue:99-100`, and §A5's silent
notation fallback is at `src/fourier_analysis/symbolic/latex_rendering.py:280` — the library package,
not `api/`.

---

## §A — Wire shape and envelope

### A1 — Row identity on the wire

**RULE.** Every **list-bearing response class** in this contract carries a **stable per-row identity**
that is emitted on the wire. The identity is a field, not a position, not a render-time composite, and
not a document key the serializer silently drops. A response class that cannot name its row identity is
**not admissible** to this contract; a class that deliberately has none states that, and states why,
under the §A3 evenness posture.

**WITNESS** (measured this seat, base `$F`). The audit log is the whole mechanism in four lines:

- ⟨cmd⟩ `/usr/bin/grep -rn "class AuditEntry" api --include='*.py'` → one hit,
  `api/models/admin.py:94`. ⟨cmd⟩ `/usr/bin/sed -n '94,99p' api/models/admin.py` → the class carries
  **exactly four fields** — `timestamp: datetime` · `action: str` · `target: str` · `ip_hash: str`.
  **No identity field of any kind.**
- The document's own `_id` never reaches the client: pydantic v2's default `extra='ignore'` drops it
  (§0.5 item 3), so the identity exists in the database and is destroyed at the boundary.
- The client therefore cannot key its rows on identity, and does not: ⟨cmd⟩
  `/usr/bin/grep -n ':key' web/src/components/visualization/gallery/AdminAuditLog.vue` → `:127`,
  ``:key="`${entry.timestamp}-${i}`"`` — a **timestamp ⊕ loop-index composite**. The index limb is the
  part doing the work, and it is there **because the contract offers no identity**. Two entries written
  in the same clock tick are distinguished by their position in the array and by nothing else.

**DISPOSITION — THIS CLAUSE BOOKS NOTHING; IT CITES.** Its mechanism is carried by two registry rows
whose **one home is `F-W10.md` §2.5**, the NO-WAVE-OWNER drain: **`AA-45`** (banked
*"Latent contract gap. **NO-WAVE-OWNER** (recorded for SS-3/SS-4)."*, carrying no `F.W5` token, homed
by the census **NWO→SS-3**) and **`AA-48`** (canonical UNROUTED, *"same latent class — recorded, NOT
re-booked"*, discharging free with AA-11's F.W4 footer cure). **The standing tie-breaker**: a banked
NO-WAVE-OWNER row's one home is the drain; a v2 clause needing its mechanism **cites the drain row and
never books it** (F-W5 §2 A1, ruling R3-6.5). The `:key` deletion is **F.W4's act**; the clause is
F.W5's; neither is the other's.

▲ **LOCK.** The `:key` repair is not the cure. Replacing a positional key with a different positional
key leaves the contract exactly as identity-less as it was. **The cure is the emitted field**, and
until the field exists any client-side key is a rendering decision, correctly made, over a contract
defect it cannot fix.

### A2 — Envelope and cardinality, ruled once

**RULE.** **ONE envelope decision governs the whole surface.** Pagination shape, queue size and the
featured window are decided **jointly, once**, and every list-bearing operation in the register
(`contract/operation-register.md`) answers to that one decision. Concretely:

1. **A2.1 — the pagination form is declared per side and is mechanically checkable.** fourier's list
   surface is **opaque-cursor, body-borne**; value.js's is **offset/limit**. v2 does **not** force one
   repo onto the other's form — the atom-VALUE / ENVELOPE split of v1 §1 applies here too — but each
   side **declares** its form in the contract and the declaration is the thing a probe reads. A list
   response that ships a cursor and a `total`, or an offset and a `next_cursor`, is a contract
   violation on its own side.
2. **A2.2 — a derived field is not an envelope field.** `page`/`pages` are **derived client-side from
   offset and limit**, not transported. The round-trip is lossless today and the two sides agree, so
   this is a **redundancy, not a defect**, and v2 records it as such.
3. **A2.3 — every list-bearing operation states its cardinality, or states that it has none.** A queue
   with no size is admissible only if the contract says so in the clause; it is not admissible by
   omission.
4. **A2.4 — the casing rule is a mechanical check on each side, never prose a reader applies**
   (G18's casing limb). v1 §4 stands unamended in content: **TS lowerCamelCase ↔ Python snake_case is
   the ONLY allowed difference in the wire envelope**, multi-word logical fields case and single-word
   fields do not, and **op values are string literals that are NEVER cased**. What v2 adds is the
   enforcement form: **each side runs a check that normalizes casing and asserts its own envelope
   against §3/§4 of v1 — against the document, never against the sibling's output** (inv-26's
   discipline, v1 §6's own construction). The check is mechanical, it is named in each side's
   conformance probe, and **it does not depend on both probes existing**: where one side has no surface
   to conform, its half of the verdict is explicitly one-sided and says so. The one-sided verdict itself
   is authored at **§E3/§6** under owner ruling **R1** (`§0j.D` F-SS4REST — *RE-SCOPE value.js out of
   the diff clause*); this clause states the casing rule so that it survives that verdict either way.

**WITNESS** (measured this seat).

- **The two pagination forms, at both ends.** fourier, base `$F`: `api/routers/visualizations.py:324`
  `has_more = len(docs) > limit` (the limit+1 probe), `:328-329` `next_cursor = …
  cursors.next_cursor_from_last(docs[-1], sort_key=sort) if has_more and docs else None`, `:334-335`
  both fields in the **body**; ⟨cmd⟩ `/usr/bin/grep -rn "Link\|rel=" api/lib/crud/cursors.py | wc -l`
  → **0** (§0.5 item 2). value.js, base `$V`: `api/src/platform/http/pagination.ts:14-17` —
  `paginationQuery = z.object({ limit: …, offset: … })`, whose own docstring names it *"the
  `limit`/`offset` query pair shared by every paginated list endpoint (palette versions/forks/list AND
  admin colors/flagged/users)"*.
- **The moderation queue has no size anywhere.** `FlaggedListResponse` (`api/models/admin.py:82-86`)
  declares `total` / `page` / `pages` — and **no route binds it**: ⟨cmd⟩ (base `$F`)
  `/usr/bin/grep -c "response_model=" api/routers/admin.py` → **1**, the `/stats` row at `:110`. The
  stats model that *is* bound is `AdminStatsResponse` (`api/models/gallery.py:31-38`), **seven fields,
  none of them `flagged`** — ⟨cmd⟩ `/usr/bin/grep -rn "flagged" api/models/admin.py` → **no output**.
- **Six vanity badges over that same model.** ⟨cmd⟩ (base `$F`)
  `/usr/bin/grep -cE '^[[:space:]]+<MetricBadge$'
  web/src/components/visualization/gallery/GalleryAdminBanner.vue` → **6**, bound at
  `:45 :52 :60 :68 :75 :82` to `total_entries` · `featured` · `saved` · `total_views` · `total_likes` ·
  `formatBytes(storage_bytes)` — **six of the model's seven fields** (`normal` is unconsumed). **The one
  number a moderation banner exists to show — how many items are waiting — is not among them, because no
  model carries it.** ⊘ *The element-anchored spelling is the receipt's own correction, not decoration:
  the loose probe `grep -c "<MetricBadge"` returns **7** at these bytes, because `:96` is a CSS comment
  naming the component. A count of element instances that silently includes a comment is the
  phantom-receipt class in miniature — the digit is wrong and the command still "works".*

**DISPOSITION.** The clause's **one banked operand is `FR-AFP-18`** (the metric-badge→metric render
seat is **F.W1**'s; the envelope decision is F.W5's), and it cites **§D10** for the sizing lock.
**`AA-46` is cited as EVIDENCE with its kill noted, never as an operand**: `F-W10.md` §2.5 rules it
**KILL-WITH-RATIONALE** — *"a redundancy record; no defect, no work"* — and the banked cell reads
*"Envelope `page`/`pages` discarded and re-derived client-side (agreeing today); page↔offset round-trip
lossless. Redundancy records. **NO-WAVE-OWNER**."* A redundancy record with a lossless round-trip is not
a defect; A2.2 above is the byte-faithful reading of it. **The envelope decision loses nothing** — it
stands whole on FR-AFP-18 and §D10, and the live gap is the queue size, which no round-trip recovers.

▲ **LOCK.** The three decisions are **ONE decision**. Settling pagination and leaving the queue
unsized, or sizing the queue and leaving the featured window on a different pagination form, re-opens
the drift this clause exists to close. **G18's casing limb closes here, at A2.4, and independently of
whether the diff-clause verdict is two-sided** — that separation is deliberate, because tying a
mechanical casing check to the existence of a second surface is how a check becomes unrunnable.

### A3 — Boundary-validation **evenness**

**RULE.** Every response class this contract names has **exactly one posture at the boundary**:
**validated**, or **explicitly-not-validated-and-why**. The posture is declared per class and it is
**even** — a class does not guard two of its fields and leave two bare. **Evenness is the clause, not
paranoia.** The posture covers three surfaces, not one:

1. **HTTP responses** — the response goes through the model, **or the model is decoration**. A
   serializer that bypasses the declared model at any site voids the declaration at every site.
2. **Persisted-then-rehydrated payloads** — a payload read back from storage crosses the same boundary
   as one read off the wire. Versioned keys blunt the stale-schema limb; they do nothing for the
   backend-adds-a-tier limb, which survives whole.
3. **Build-time artifacts** — a shape consumed from a checked-in file is a boundary crossing with no
   HTTP in it, and it is covered.

**WITNESS** (measured this seat, base `$F`).

- **The measured denominator.** The **whole 45-operation client surface** lands through **ONE**
  unchecked cast: ⟨cmd⟩ `/usr/bin/grep -rn "await res.json()) as" web/src` → a single hit,
  `web/src/lib/api.ts:192` — `return { data: (await res.json()) as T, etag, response: res };`. One
  `as T`, 45 operations. This is **`FR-CP-16`'s measured surface and it is this clause's denominator**.
- **The uneven pair** that survives the server's own shape guarantee: `AA-47`'s banked cell —
  *"…what survives is the *uneven* defensiveness (timestamp and target guarded; action and ip_hash
  not)."* Drift on the admin banner degrades into **six silent em-dashes** (§A2's six badges): no
  console error, no toast, no test.
- **Zero cardinality validation at a write boundary.** ⟨cmd⟩
  `/usr/bin/sed -n '21,26p' api/routers/contours.py` → `async def save_contour(req:
  SaveContourRequest):` then `xs = req.points.get("x", [])` / `ys = req.points.get("y", [])` — the two
  arrays are pulled off a dict with `.get(…, [])` defaults and handed straight to
  `store_contour_asset(xs, ys, …)`. **Nothing asserts `len(xs) == len(ys)`, and nothing asserts either
  is non-empty.**
- **Edges that never reach the boundary code at all.** The register's §5 enumerates **three operations
  reached through a URL builder rather than a fetcher** — `thumbnailUrl` (3 consuming sites),
  `overlayUrl` (3), `imageUrl` (0). Those edges **never traverse `coreFetch`**, so they carry no abort
  key, no 429 posture, **no envelope and no validation**. A posture declared only at the fetcher is
  **not even**: it is silent on six live consuming sites.

**DISPOSITION.** Booked: **`FR-CP-16`** (=C-17/L·A-3, the denominator) · **`GAB-12`** (C-7) ·
**`GCM-10` ⊕ `GCM-55`** — the serialization-bypass family, where `json.dumps` bypasses the pydantic
model so `likes ?? 0` and a bare `{{ entry.likes }}` assert **opposite nullabilities** ·
**`FR-FG-13`** (=C-9), which keeps C's own *"today it is safe"* honesty and is therefore a
**latent-ordering** clause, not a live defect · **`C-15`** (FSE, build-time — surface 3 above) ·
**ContourPreview row 28** (D:i-3/L:L-8). **`FR-IC-6`** (→L·m-7) rides as a **LEG held at F-W4** and
contributes surface 2. **`AA-47` is cited, not booked** — no `F.W5` token at the record, census home
**NWO (packet)**, one home at `F-W10.md` §2.5 with the terminal verb *NEXT-BOUNDARY LEDGER — SS-4
contract input*; the clause keeps its **uneven-pair witness**, which is all it ever used AA-47 for.

▲ **LOCK (L-19).** **Do NOT author a per-field defensive sweep at F.W4.** The cure is **one declared
posture per response class**, checked once at the boundary. A sweep of `?? 0` and `?.` through the
components is the same defect distributed — it makes the unevenness unmeasurable instead of curing it,
and it hard-codes the current shape at every leaf that receives it.

▲ **LOCK (G22 sequencing).** The `GCM-10` cure is quoted in this contract **only after MF-9 is
resolved or STRUCK** (unit e). If MF-9 is struck, the cure is quoted without it and the strike is
recorded in the clause provenance — never quoted with a dangling companion.

### A4 — One contract source

**RULE.** There is **ONE source of the shared shapes**, and both repos' types are **derived from it**.
The rule has three limbs, and the third is an **amendment stated in the open**:

1. **inv-16 — RESTATED UNCHANGED.** The sharing is **by contract, not by package**: a per-language
   module bound to a repo-neutral document. **No shared package, no shared binary, no framework
   dependency between the repos.** v1 §1's inv boundary is this limb and v2 does not move it.
2. **inv-26 first limb — RESTATED UNCHANGED.** **One contract source.** Neither implementation is the
   reference; the document is.
3. **inv-26 second limb — AMENDED, openly, by owner ruling.** v1's spelling of inv-26 is *"one contract
   source, **hand-typed twins, no codegen**"*. **`§0j.D` F-SS4REST ruling R7 rules CODEGEN** — *"twins
   derived from one source (inv-16/inv-26 restated; structural invariants over prose)"*. v2 therefore
   **amends the hand-typed-twins limb to generated-twins**, and says so here rather than anywhere else.
   **This is an amendment, not a silent reversal** — F-W5 §2 A4's standing bar is *"v2 RESTATES or
   AMENDS, never silently reverses"*, and the amendment is licensed by the owner, dated, and cited to
   its ruling id. **inv-16 is untouched by it**: generated twins are still per-language modules derived
   from a document, not a shared package. The invariant that was carried in prose is now carried
   structurally, which is the ruling's own stated reason.

**Consequences that follow directly and are part of the rule.** The generated shape is the **only**
declaration of a shared type; a hand-maintained copy of a generated shape is a defect on sight; and
**the three dead server models encoding the retired contract are deleted, not regenerated.**

**WITNESS** (measured this seat, base `$F`).

- **The join key is emitted and dropped.** `content_hash` is the actual join key of the flagged surface
  — `api/models/admin.py:69-72` heads `FlaggedEntryInfo` with *"# The visualization's content_hash —
  the ``flags`` collection's FK key"*. Server-side it is everywhere and client-side it is nowhere:
  ⟨cmd⟩ `/usr/bin/grep -rn "content_hash" api --include='*.py' | wc -l` → **81** against ⟨cmd⟩
  `/usr/bin/grep -rn "content_hash\|contentHash" web/src | wc -l` → **2**.
- **Three dead server models encode the retired contract.** `FlagRequest` (`api/models/admin.py:57`) —
  ⟨cmd⟩ `/usr/bin/grep -rn "FlagRequest" api web/src` → **exactly one hit, the definition**:
  referenced nowhere. `FlaggedEntryInfo` (`:69`) carries a **rotted `user_slug`** field. And
  `FlaggedListResponse` (`:82-86`) declares the **offset** envelope (`total`/`page`/`pages`) the surface
  no longer speaks. **None is bound to a route.**
- **The measured `response_model` split** (§0.5 item 1): `visualizations.py` **0 of 13** ·
  `admin.py` **1 of 13**. The absolute *"nowhere"* is false; **the two arms this clause is about
  declare essentially none**, and a model that no route declares cannot be the contract's source of
  anything.
- **The structural cause.** God-module twins: ⟨cmd⟩ `/usr/bin/wc -l web/src/lib/api.ts
  web/src/lib/types.ts` → **672** and **391**. No codegen. **Three hand-maintained copies of the
  flagged shape, one already rotted.**

**DISPOSITION.** Booked: **`FR-AFP-36`** (L-16/L-21/C:D-20) · **`FR-AFP-71` ⊙** (β-miss-9) — the
module-split limb. The ⊙ owner-gated question (module split, and codegen-vs-hand-typed-twins) is
**answered for the codegen half by R7** and is recorded as answered; the module-split half stays ⊙ and
is named as such rather than assumed. Both ids of the standing law are rooted: **inv-16** at
`docs/tranches/V/megatranche/formation/fourier/lane-crud.md` §0, the headline block
(*"shared-by-contract PATTERN (inv-16), NOT a shared package"*); **inv-26** at its in-repo evidence
home, `docs/tranches/R/audit/pass1/R4-FOURIER.md` §6 evidence index — whose primary ledger is the
fourier tranche-local `docs/tranches/INVARIANTS.md` §1, **MEASURE-AT-OPEN (D-19)** and not opened by
this file.

▲ **LOCK (K9) — do NOT delete the five `?? item.slug` fallbacks.** ⟨cmd⟩ (base `$F`)
`/usr/bin/grep -rn "?? item.slug" web/src | wc -l` → **5**. They are **DEFENSIVE, not redundant**:
`api/routers/admin.py:578` emits `"image_slug": doc.get("image_slug")` **unvalidated**, so the field is
genuinely absent on some documents. That limb is **NOT PROVEN** and the fallbacks stay until the
emitter is fixed. Deleting them under a "the generated type says it is non-null" argument ships the
generated type's lie.

▲ **LOCK.** Codegen without deletion is worse than neither: if the three dead models survive the
generator, the contract acquires a machine-checked copy of a retired shape. **The generation and the
deletion are one act.**

### A5 — No untyped operations

**RULE.** **An operation's response model must be structurally typed or the leaf is unjoinable in
principle.** This sentence is the record's own, carried verbatim at record case — ⟨cmd⟩ (base
`R=docs/tranches/V/megatranche/registry/adjudicated`, from the value.js repo root)
`grep -n -F 'unjoinable in principle' fr-CoefficientsSpectrum.md` → `:65`, whose routing cell reads
*"**→ F.W5–W8** (the R6-8 companion clause: an operation's response model must be structurally typed or
the leaf is unjoinable in principle)."*

Two corollaries are part of the rule:

- **The exception set is named explicitly or it is closed.** An operation whose response is genuinely
  opaque (a passthrough blob, a vendor payload) is listed, with its reason. Silence is not an
  exception.
- **A silent fallback is a contract decision.** A dispatch that falls back to a default when it does not
  recognise a value has **decided what the contract means** for that value. State the decision or close
  the domain.

**WITNESS** (measured this seat, base `$F`).

- **The epicycle response is `dict`.** `api/models/computation.py:65` → `data: dict`. The only typed
  component model is **dead**: ⟨cmd⟩ `/usr/bin/grep -rn "EpicycleComponentDTO" api --include='*.py' |
  wc -l` → **1** — the definition at `:55` and nothing else — **and it disagrees with the wire**.
- **The client twin is hand-maintained against a Python dict literal.** `BasisComponent` is imported
  from `web/src/lib/types` and asserted onto the untyped payload at four sites in one component —
  `BasisCanvas.vue:134` `:238` `:302` `:320`, each `const components: BasisComponent[] = …` — **no
  derivable join**, while the equation route does it right in the same API.
- **The coefficient crosses the seam positionally.** A `[re, im]` pair through two independently
  written remaps: **a silent re/im swap type-checks everywhere.**
- **The `notation` enum, enumerated four times, with a silent fallback.** ⟨cmd⟩ (base `$F`)
  `/usr/bin/grep -rn "render_trig\|render_exponential\|render_polar" src --include='*.py'` →
  `src/fourier_analysis/symbolic/latex_rendering.py:268`
  `_EXPANDED = {"trig": render_trig, "exponential": render_exponential, "polar": render_polar}` and
  `:280` **`renderer = _EXPANDED.get(notation, render_trig)`** — the fallback, at the library package
  rather than `api/` (§0.5's fourth correction). The domain is declared once more at the request models
  (`api/models/equations.py:22` and `:41`, `notation: str = Field(default="trig",
  pattern=r"^(trig|exponential|polar)$")`) and again on the client. **An unrecognised notation renders
  trig and reports success.**

**DISPOSITION.** Booked: **`fr-CoefficientsSpectrum M-13`** (=C-7 — the homonym note stands: `M-13` is
`fr-CoefficientsSpectrum`'s here and `fr-ContourSettings`'s at §E14, and the qualified form is the
identity) · **`FR-EQC-8`** (=C-11) — *one adapter, both directions*; it cites M-13 as family and does
not re-book it · **`fr-NotationPills FR-NP-30`** — **the banked head is the identity**, and the
record's own `FR-NP-30b` R6-8 sub-arm rides **beside** it, never instead of it (anti-rename R-5/U-12:
a sub-arm suffix standing alone is a rename, invisible to an id-keyed difference in both directions).
The record's `-30a` census-coverage limb is **not this wave's** (routed NO-WAVE-OWNER → SS-3/SS-4) and
the **`F.W1` leg is held there**.

▲ **LOCK — this clause PRECEDES §B's enforceability.** If v2 admits untyped operations, **every join
clause in §B is unenforceable at those operations**: there is no field to join on, so there is nothing
for a mirror rule, a wrapper rule or a liveness predicate to bind. A5 is therefore load-bearing for all
of §B and is stated before it, not after.

### A6 — Credential transport, both ends

**RULE.** **ONE transport clause bounds the credential at both ends: URL in, DOM out.** A bearer
credential is **never** accepted from a URL query string, and is **never** written into a DOM attribute
that is not the request itself. Persistence is declared with an **expiry**; a credential persisted
without one is persisted forever, which is a decision and must be made as one.

**WITNESS** (measured this seat, base `$F`).

- **URL in.** `web/src/components/visualization/GalleryView.vue:84` →
  `const adminToken = route.query.admin as string | undefined;` — **the admin bearer is accepted from
  the query string**, where it lands in browser history, in the referrer, and in every log that records
  a URL.
- **DOM out, on every route.** `web/src/components/visualization/gallery/UserSlugBar.vue:87` →
  `:title="userSlug ?? ''"`, and the component is mounted in the global chrome:
  `web/src/components/layout/AppHeader.vue:7` imports it and `:140` renders `<UserSlugBar />`. The
  identity therefore sits in a `title` attribute on **every route in the application**.
- **Persisted with no expiry.** `web/src/stores/auth.ts:14-16` reads `USER_SLUG_KEY`, `USER_TOKEN_KEY`
  and `ADMIN_TOKEN_KEY` out of `localStorage` at store construction; `:38-39` and `:88` write them
  back. **No expiry field is written, and none is read.**

**DISPOSITION.** **`fr-UserSlugBar FR-USB-37` (C-i2) is CITED, NOT BOOKED** — the canonical homes it
`NO-WAVE-OWNER` / **NWO (packet)** with **no `F.W5` route at all**, and it is **disposed at F-W10's
drain** (R4-10's fabrication clause: a row the census homes in a packet may not be held here as an
operand). **`fr-GalleryView FR-GV-7` (=M-9/C·M-9) is held at F-W3 §X.1-v5's register** — canonical
F.W3 under the file criterion, leg `F.W5-W8` — and is cited, not booked. The clause stands on its
**mechanism**, which all three arms above measure directly.

▲ **LOCK.** **`FR-USB-13`'s F.W4 cure will likely rework the `title` attribute anyway — the F.W4 arm
must NOT be credited with the contract.** A render change that removes one attribute does not bound
credential transport; the clause does, and it binds the query-string arm the render never touches.

▲ **LOCK (§C3 seam).** A6 states the **transport**; the **session predicate** — which stored value is
authoritative, and what a 401 means — is **§C3's**, and §C3 names its holder rather than citing back
here. The two clauses do not cite each other: a closed two-clause loop resolves to nothing outside this
file and is unfalsifiable by an id-keyed differ (PASS-5 P5-14).

---

## §B — R6-8: operation identity independent of client identity (bidirectional)

**The band's governing law, adopted as fact.** **R6-8**: an operation's identity is a property of the
**operation**, not of the client that happens to call it. Where the two are non-isolable, every seam
built on the conflation inherits the ambiguity. §B states the relation **in both directions** — forward
(the client must not key operation-scoped machinery on client-scoped values) and mirror (the client
must not shadow an operation-scoped value with a client-scoped re-derivation). **Carry the identity
ONCE and cite the instances, or the wave re-books law as work** (M-25).

### B1 — The join relation, forward

**RULE.** Anything scoped to an **operation** is keyed by the **operation's identity** — a stable,
declared key that does not vary with the URL, the query string, the caller or the call site. This binds
three mechanisms by name:

1. **Cancellation.** An abort key identifies **which operation** is being cancelled. A key derived from
   the request URL cancels by URL; a key shared between two different operations cancels the wrong one.
2. **Cache and memo identity.** A cache key is a **superset of every input the response depends on**
   (the clause is stated in full, once, at §E13). A key computed from fewer fields than the request
   carries is a key that collides by construction.
3. **Reachability.** A parameter implemented end-to-end and reachable from no interface is **declared
   capability with no operation behind it** — §B4's subject, cited here and not re-booked.

**WITNESS** (measured this seat, base `$F`).

- **The abort key is the path.** `web/src/lib/api.ts:250` →
  `const { data } = await coreFetch<T>(path, /* abortKey */ path, {` — **the comment shows the
  parameter was considered and the wrong value chosen**. `coreFetch`'s own signature declares the key
  as a distinct argument (`:117` `abortKey: string,`) and resolves it at `:161`
  `const signal = options?.signal ?? abortable(abortKey);`. Keying it on the **full query-bearing
  path** degrades per-operation cancellation to per-URL for the **13 admin operations** that route
  through `adminFetch`.
- **Its dual, one literal wide.** `web/src/lib/api.ts:411` passes the abort key `"listVisualizations"`
  — a single literal — and **both** gallery entry points call it: `web/src/stores/gallery.ts:64`
  (`fetchNextPage`) and `:90` (`resetAndFetch`). A filter refetch therefore **cancels an in-flight
  page**, and the reset's synchronous `entries = []` **can abort its own reset**.
- **The cache key is a strict subset of the request.** `web/src/components/equation/EquationView.vue:82`
  `function computeKey(): string {`, consumed at `:94` — it returns **4 fields** while the POST carries
  **7**, including `notation` and `budget`, **both response-determining**. Two requests that differ only
  in notation share a cache entry.
- **Work re-derived on the wrong side of the seam.** The multi-basis fallback re-derives the server's
  `partial_sums` on the main thread (~160k iterations/frame) — the same value the operation already
  computed, recomputed because the client cannot name it.
- **`after`/`before`**: implemented end-to-end and **unreachable from any UI**.

**DISPOSITION.** **R6-8 is ADOPT-AS-FACT and is booked here as FOUR record-qualified canonical rows** —
`fr-AnimationControls R6-8` · `fr-CanvasControlsDock R6-8` · `fr-ConvergencePlot R6-8` (all `F.W5`) ⊕
`fr-EasingCurvePreview R6-8` (`F.W5-W8`). Booked beside them: **`FR-AUL-3`** (L-3/C-M1) ∥
**`FR-GSB-28`** — **one clause, two directions** (under-broad and over-broad; the over-broad direction
is unbanked elsewhere) · **`fr-EquationView M-CK`** · **`fr-AnimationControls C-30`** (`:123`,
fold-by-reference) · **the `fr-CanvasControlsDock C-28` fold, carried INSIDE that record's `R6-8` row**
(`:150`) · `fr-BasisCanvas C-5` · row 26 `C:C-12` (ImageUpload) · `D-L4+C-7` (ConvergenceLegend) ·
`FR-EQR-32` (C-§0.4) · `AA-31` (C·D-12) · `fr-FourierShapeExtractor C-7` (cited at §G7c).

**Every instantiating record says the identity STAYS with the intake** — `fr-AnimationControls C-30`,
`fr-CanvasControlsDock C-28`, `fr-EasingCurvePreview` RESOLVER, `fr-ContourSettings i-7`,
`fr-BasisCanvas C-5` — so they **fold by reference and are never re-booked**. C-30's join-ambiguity leg,
the record's own bytes (⟨cmd⟩ base `$R`, `grep -n -F 'display surface of the ambiguity'
fr-AnimationControls.md` → `:123`): *"Fold of intake **R6-8** (operation↔client leaves non-isolable);
this component is the display surface of the ambiguity, not the defect site."*, disposition cell
*"fold by reference — identity stays with R6-8's **F.W5–W8** carry."* **In v2's own voice, quoting
nothing**: the leg is what the contract STATES and F.W4 renders; no repair is credited to that
component.

**`C-28` is not a second row.** `fr-CanvasControlsDock` banks no `C-28` head; the token is named inside
that record's `R6-8` line (`:150` — *"**R6-8** (intake, CARRY→F.W5): C-28 folds — this dock is the UI
head of the non-isolable client↔operation seam; D-4's server-arm rider sequences after the join
split."*). It is **the body of the booking above**, and what it carries is a **sequencing constraint**:
**the server arm sequences AFTER the join split.** That constraint is §E5's operative one, cited there;
one home (B1), two citations (§E5's D-4 rider; F-W4's D-4 row).

▲ **SEQUENCING LOCK (`fr-EquationView M-CK`), verbatim** — ⟨cmd⟩ (base `$R`)
`grep -n -F 'fix the key FIRST or the B-1 repair ships broken' fr-EquationView.md` → **`:71`**:
***"fix the key FIRST or the B-1 repair ships broken."***

▲ **LOCK — the two fixes compose; neither alone closes the window.** The abort-key fix and
`FR-AUL-59`'s pipeline fix are **both** required: stable keys with the old pipeline still races, and the
pipeline fix with URL-derived keys still cancels the wrong operation. The map-growth rider stays
**INFO**.

▲ **ROUTING.** ImageUpload is the **incomplete** join — `thumbnailUrl` traverses **none** of
`coreFetch` and five `<img src>` sites are un-clienting. Its **security half routes to §C2** and its
**transport half to §E15**; §B1 books the identity and neither half.

▲ **DECLINE-OR-RECORD.** `FR-EQR-32` is the second seam instance (no SINK CLASS for string-typed
response fields) and is **enforceable only if §F8 chooses the wire field**. If F.W5 declines, **the
decline is RECORDED** — as a decline with its reason, never as silence. **`D-L4` ruled MINOR** on the
ConvergenceTimeline L·D-12 precedent and the **dissent is preserved** (§2b).

### B2 — The mirror direction ‡

**RULE — the R6-8 MIRROR RIDER.** **A client may not shadow a server field with a same-named,
different-valued re-derivation.** If a client computes a quantity the operation already returns, it
either **consumes the server's field** or **names its own differently**. The shared-provenance contract
needs the rule in **BOTH** directions, and **it must not be collapsed into the forward direction**: the
forward rule is about *keys*, this one is about *values*, and a document that states only the forward
rule leaves every same-named divergence legal.

**WITNESS** (measured this seat, base `$F`). Two contradictory `amplitude` conventions live in one view,
**exactly 2× apart, both labelled `A`**:

- The DTO ships `|c_n|`: `api/models/computation.py:59` `amplitude: float`, mirrored at
  `web/src/lib/types.ts:4` `amplitude: number;`.
- The client discards it and re-derives the trigonometric amplitude under **the same name**:
  `web/src/components/equation/lib/harmonics.ts:21-49` `groupTrigHarmonics(…)` computes
  `const a_n = crP + crN;` · `const b_n = -(ciP - ciN);` · `const amp = Math.sqrt(a_n * a_n + b_n *
  b_n);` and emits `{ k, a_n, b_n, amplitude: amp }` — i.e. **√(a²+b²) = 2|c_k|**, consumed at
  `web/src/components/equation/ConvergencePlot.vue:35`.
- The user-visible contradiction: tooltip **`A = 0.8106`** against pill **`A_1 = 0.4053`**.
  `FrequencyGraph` documents the **DTO** convention, so **2 of 3 surfaces agree and the plot disagrees
  undisclosed.**

**DISPOSITION.** Booked: **`fr-ConvergencePlot C-7`**. The F.W4 arm is **rename (`trigAmplitude`) or
consume the DTO field** — one home (F.W4), and this clause is its citation.

▲ **LOCK.** The factor of two is not the defect; **the shared name is.** A fix that corrects the value
and keeps the name leaves the next re-derivation exactly as legal as this one was.

### B3 — Wrapper types re-derived FROM the router

**RULE.** A client wrapper's declared return type is **derived from what the router actually emits** —
never authored against a contract document, a sibling wrapper, or an intention. Under **§A4's R7
codegen** this is mechanical rather than aspirational: the wrapper's type comes from the same generated
source as the router's response model, so **a declared key the router never emits cannot be written**.
Until the generator exists, the rule binds by inspection, and **every wrapper in a repaired family is
re-derived, not just the one that failed.**

**WITNESS** (measured this seat, base `$F`) — three wrappers, one family:

- **`deleteAdminUser`** declares `Promise<{ deleted: boolean; entries_deleted: number }>`
  (`web/src/lib/api.ts:594-602`) while the router returns
  `_json({"ok": True, "deleted_entries": viz_result.deleted_count})`
  (`api/routers/admin.py:370`). **Neither declared key is ever emitted.**
- **`setAdminUserStatus`** declares `Promise<{ slug: string; status: string }>`
  (`web/src/lib/api.ts:582-588`) — it **invents `slug`** and **drops `ok`**.
- **`BatchResponse.errors`** (`web/src/lib/types.ts:191-194`, `errors?: string[]`) is populated by
  **no `admin.py` branch**, so a partial batch failure reports **GREEN**; and `affected` is
  `result.modified_count` (`api/routers/admin.py:434` `:440` `:481` `:491`, returned at `:448` `:501`),
  so unsuspending 20 already-active users toasts *"Unsuspended 0 user(s)"* **as success**.

**The binding indictment**, measured at the bytes: `web/src/lib/api.ts:617-624` is a **dated
contract-repair record** for the batch family — *"A.W5.c contract-bug fix — the wrappers previously
declared a `{processed}` shape that disagreed with the backend's `{ok, affected, errors?}` … The CRUD
CONTRACT ratifies `BatchResponse` as the canonical batch return type; both wrappers now type against
it."* — and **the two singular wrappers twenty lines above (`:582`, `:594`) were left declaring shapes
the router never emits, in the same pass.**

**DISPOSITION.** Booked: **`FR-AUL-11`** (C-M2) · **`FR-AUL-12`** (C-M3) · **`FR-AUL-13`**
(C-M4/L-11/L-23; second call site `GalleryView.vue:189-191`). **One repair family** — the A.W5.c
precedent shows the form, and its own omission shows the failure mode.

▲ **FR-AUL-13, verbatim** (⟨cmd⟩ base `$R`, `grep -n -F 'either the router populates'
fr-AdminUserList.md` → `:51`) — the record's cell **closes on the table pipe and carries no terminal
period**: *"either the router populates `errors`/`matched_count` or the contract drops them; the client
compares `affected` vs `slugs.length` either way"*.

▲ **THIS CLAUSE IS v2's OWN INDICTMENT.** The same record convicts a contract *"written against a
contract document rather than the router"* (⟨cmd⟩ base `$R`, `grep -n -F 'written against a contract
document rather than the router' fr-AdminUserList.md` → `:51`) — **and v2 IS such a document.** It is
admissible only because it **ships with the F.W9/W10 conformance probe** that asserts each side against
it. **A contract document without a probe repeats the defect it convicts** (FR-AUL-13, and F-W5 §0b's
standing bar). The probe is the §4 cross-edge to F.W9/W10; **without it this clause is prose about
prose.**

### B4 — The **LIVENESS** predicate (registry-novel)

**RULE.** A capability **declared on both sides and implemented on neither** is **DEAD**, and this
contract names it rather than inheriting it. The predicate is stated positively: **a capability is LIVE
when at least one side implements it and at least one side reaches it.** Anything else is one of two
dead forms, and v2 requires the form to be named:

- **MUTUAL DEAD SEAM** — declared on both sides, implemented on neither. **Retire both declarations in
  one act**, or implement both and say which operation makes it reachable.
- **ZERO-CONSUMER LIVE CODE** — implemented on both sides and reached by nothing. **Wire it or delete
  it**; the declaration alone is a promise the surface does not keep.

This predicate is **F.W5's own coinage** — it is new to the registry (both readers' sweeps and the
seat's own over 206 records), and it wears plain text because it is a coinage and not a quotation. It
sits **BESIDE** R6-8's identity predicate, **not inside it**, and it is **separate from §E10's
produced-and-unconsumed disposition**: E10 is about a value that is produced and ignored; this is about
a capability that is declared and absent.

**WITNESS** (measured this seat, base `$F`). Both dead forms, live in one tree:

- **Mutual dead seam — `preview_path`.** Written `""` at **all three** server sites:
  `api/models/assets.py:85` `preview_path: str = ""` (the default) ·
  `api/services/image_storage.py:318` `"preview_path": ""` (the write) ·
  `api/responses.py:22` `preview_path=asset.get("preview_path", "")` (the read-back). The client leaf
  is unreachable. **Zero implementation on either side, declared on both.**
- **Zero-consumer live code — `softDelete` / `restore`.** They are the gallery store's **only**
  splice/unshift mutators and its **only** ETag/If-Match round-trip
  (`web/src/stores/gallery.ts:165`, `:178`), exported at `:286-287` — and ⟨cmd⟩
  `/usr/bin/grep -rnw "softDelete" web/src --include='*.vue' --include='*.ts' | wc -l` → **2**, and the
  two are `gallery.ts:165` (the definition) and `gallery.ts:286` (the export). **Zero callers**, and the
  count is published with its split precisely because a bare `2` would read as two call sites.
- **Three further instances, measured at unit a's seat and cited here, not booked** — three `CLIENTED`
  register rows whose client function has **zero external call sites**: `checkImageHash` (row 21) ·
  `imageUrl` (row 23) · `getMe` (row 29), ⟨cmd⟩ (per name) `/usr/bin/grep -rw '<fn>' web/src
  --include='*.ts' --include='*.vue' | /usr/bin/grep -cv 'lib/api.ts'` → **0 · 0 · 0**. The third
  reproduces the banked §C3 witness; the first two are new at that seat. **No id is minted and no
  repair is claimed** (§0b).

**DISPOSITION.** Booked: **`PP-DEADSEAM`** (C-12) · **`GM-M4`** · **`VV-R2-B`** (cited at §D14).
**`getMe`'s session limb is §C3's**, not this clause's.

▲ **CARRY THE KILL WITH THE ROW.** **`GM-M4` is the fact that KILLS `L-15`'s scenario.** Its contract
prose at `web/src/stores/gallery.ts:162-164` — *"Soft-delete the caller's own visualization, then
restore (CRUD-CONTRACT §5). Both round-trips send `If-Match: <etag>`; the ETag is captured from the
prior GET…"* — **documents a round-trip no user can trigger.** The prose dies with the disposition, and
the kill travels with the row so no later wave re-derives the scenario from the prose.

### B5 — Negative controls — **EVIDENCE, never a denominator**

**RULE.** The negative controls are recorded **in the clause justification** and are **excluded from
every defect denominator**. They establish that the join rules are not vacuous — that there exist
surfaces where the rules *cannot* be violated, and that those surfaces are structurally distinguishable
from surfaces where the rules *are* violated. **A route with no operation edge has no join to get
wrong** — that sentence is **v2's own compression of the banked negatives, quoting nothing**, and it
carries no quotation marks because it earns none (⟨cmd⟩ base `$R`,
`grep -rn -iF 'join to get wrong' fr-*.md` → **zero hits across the 66**).

**WITNESS** (measured this seat, base `$F`).

- **`/morph` reaches ZERO of the 45 operations.** The route is registered
  (`web/src/router/index.ts:29`, `VALID_TABS` includes `"/morph"`), and its components import no
  fetcher: ⟨cmd⟩ `/usr/bin/grep -n "as any\|sunData\|moonData"
  web/src/components/morph/FourierMorphDemo.vue` → `:95-96` the two static JSON imports and `:99-100`
  `const sunShape = prepareFourierShape(sunData as any);` /
  `const moonShape = prepareFourierShape(moonData as any);`. **The static-JSON seam is `as any`-cast**
  — which **voids the one interface `HLG-1` violates** — and it is at `FourierMorphDemo.vue`, not
  `MorphShapePreview.vue` (§0.5's location correction; `MorphShapePreview.vue`'s only import is a
  decorative SVG).
- **`R6-8` and `R3-7b` are structurally unreachable at MorphShapePreview** — there is no operation, so
  there is no operation identity to conflate with a client identity, and no authority class to
  document.

**DISPOSITION.** **`HLG-23` (C:C-12)** rides as a **LEG held at F-W4** — note the fused spelling
`HLG-23 (C:C-12)` is itself a declared collision and is written out in full for that reason. **C §3's
negative controls (MorphShapePreview)** are preserved verbatim so **no `F.W5-W8` row manufactures
overlap** (⟨cmd⟩ base `$R`, `grep -n -F 'no F.W5-W8 row manufactures overlap' fr-MorphShapePreview.md`
→ one hit, the record's own C §3 negative-controls cell). **`P-9` is CITED; its home is F.W4.** The
`as any` cast folds → banked **`FMD-24`** → `N-14`/`N-15`/`FR-AH-1` (**F.W4**).

▲ **LOCK — EVIDENCE, NEVER A DENOMINATOR.** These rows **must appear in the clause justification** and
**must NOT be counted in any defect denominator** (`P-9`). The zero-cells copy to F.W2's and F.W4's
denominators — **one home, two citations** — and a wave that folds a negative control into its own
denominator has manufactured the coverage it is measuring.

---

*§A and §B are complete. §C (authority, session and transport posture) · §D (the denominator,
disposition and coverage) · §E (provenance, lineage and persistence) land at F.W5 unit c; §F (the
equation contract and error envelope) · §G (canonical geometry) and the value-side obligation list at
unit d; `contract/OWNER-RULINGS-F.W5.md` and the co-signature relay at unit e. Clause ids in this file
are preserved verbatim for sibling cross-references; a sibling's mis-keyed cite is conformed **at the
sibling** (R-1e). No clause is numbered D9 — `D9` is reserved throughout for the ruled owner decision,
which no clause may contradict.*
