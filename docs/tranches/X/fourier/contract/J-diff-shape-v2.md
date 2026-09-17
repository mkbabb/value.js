SERVED MODEL: claude-opus-5[1m]

# J-diff-shape-v2 — the shared-provenance API contract (the neutral document both repos co-sign)

**Supersedes**: `J-diff-shape` (v1) **BY REFERENCE ONLY.** v1 lives in the fourier tree at
`docs/tranches/J/design/J-diff-shape.md` and is **IMMUTABLE** — v2 edits not one byte of it (E-3:
addenda, not patches). Where v2 is silent, v1 governs unchanged.

**Authority**: `docs/tranches/X/fourier/waves/F-W5.md` (the wave spec) · `docs/tranches/X/COHESION.md`
§0/§1 SS-4 and **§0j.D** (the owner's rulings under the 2026-09-17 begin-word).
**Status**: **§A and §B authored** (F.W5 unit b, 2026-09-17); **§C, §D and §E authored** (F.W5 unit c,
2026-09-17); **§F, §G and §H — the value-side obligation list — authored** (F.W5 unit d, 2026-09-17).
The inline ruling block `contract/OWNER-RULINGS-F.W5.md` and the co-signature relay
`coordination/value-to-fourier-cosign-J-diff-shape-v2.md` land at unit e.
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
| §6 — the close-gate clause | **RE-AUTHORED — the re-authored §6 is quoted in full at clause `E3`** (F.W5 unit c, 2026-09-17) under owner ruling R1 (`§0j.D` F-SS4REST): value.js is re-scoped out of the diff clause, so the parity verdict is explicitly **one-sided**. v2 §A2/§A3 do not pre-empt it; the casing limb below survives either verdict and is unaffected |
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

## §C — Authority, session and transport posture (R3-7b)

**The band's subject.** §A fixed the *shape* of what crosses the wire and §B fixed *whose* identity keys
it. §C fixes **who may cross at all**, and it is the band where the contract's silence is itself the
defect: an operation that documents no authority is not thereby open — it is **undecided**, and an
undecided operation cannot be conformance-checked from either side.

**The measured ground this band stands on** — re-run at this seat, 2026-09-17, base `$F`, double-run:
⟨cmd⟩ `/usr/bin/grep -rE 'HTTPBearer|APIKeyHeader|OAuth2|SecurityScopes|security=|openapi_extra|Security\(' api/ --include='*.py' | wc -l` → **0**. **Zero security schemes across 45 operations.** The
register (`contract/operation-register.md` §3) is the surface on which that zero becomes row-by-row
checkable; §C is where the two decisions the zero forces are **made**.

### C1 — Authority class per operation

**RULE.** **Every operation in this contract carries exactly one explicit AUTHORITY CLASS, and the class
is part of the contract, not an implementation detail of the handler.** The register
(`contract/operation-register.md` §2, 45 rows) is the normative enumeration; a class token is a **named
mechanism**, never a mood. An operation whose class is unstated is **not admissible** to this contract,
and an operation whose class is `ANONYMOUS` says so deliberately and carries the reason in the clause
that owns it. **Enforcing authority and documenting authority are two obligations, and discharging the
first does not discharge the second.**

The closed class vocabulary, as the register assigns it: `ADMIN-TOKEN` · `SESSION-DECLARED` ·
`SESSION-IN-BODY` · `OWNER-IN-BODY` · `VIEWER-SCOPED` · `ANONYMOUS`. Six tokens, 45 rows,
`13 + 1 + 2 + 5 + 5 + 19 = 45`.

**WITNESS** (measured this seat, base `$F`).

- **The documentation surface is empty and the enforcement surface is not.** Zero security schemes (the
  band figure above), while **26 of the 45 rows enforce some authority**. The mechanism is enumerable
  rather than asserted: ⟨cmd⟩ `/usr/bin/grep -rn 'def admin_required\|def require_session\|def resolve_session' api/` → `api/dependencies.py:262` · `:254` · `:206`, each a plain
  `async def …(request: Request)` reader. **A plain `Request` reader emits no `security` block**, so the
  OpenAPI document reports `0/45` while the code enforces `26/45`. **Enforced-but-undocumented is the
  R3-7b contract defect in its exact shape.**
- **The dock's only API seam is an unauthenticated write with a client that always authenticates.**
  ⟨cmd⟩ `/usr/bin/sed -n '18,26p' api/routers/contours.py` → `router = APIRouter(prefix="/api/contours", tags=["contours"])` — **no `dependencies=`** — and `@router.post("")` /
  `async def save_contour(req: SaveContourRequest):` — **no `Depends`, no `Header`, no `Request`
  parameter**. The same call is the one non-idempotent-shaped write on that router, and it **declines
  the `Idempotency-Key` channel its own client core declares**: the envelope exists
  (`api/lib/crud/idempotency.py:63`) and this route does not take it.
- **The publicly-cacheable pre-publication surface.** ⟨cmd⟩
  `/usr/bin/grep -n 'Cache-Control' api/routers/images.py` → **four lines**, spelled as what they are:
  **three header sites** — `:145` (blob) · `:164` (thumbnail) · `:205` (overlay), each
  `{"Cache-Control": "public, max-age=86400"}` — ⊕ **one comment**, `:138`. Register rows 23 · 24 · 25
  are all `ANONYMOUS`, so an unauthenticated GET over a **pre-publication** asset is cached publicly for
  a day.
- **The entropy that is doing the actual access control.** ⟨cmd⟩
  `/usr/bin/grep -n 'def generate_slug' api/lib/crud/slugs.py` → `:40`, and `:42`
  `return "-".join(secrets.choice(_WORD_LISTS[k]) for k in _WORD_KEYS)` — **four `secrets.choice` draws
  over 128-word lists = 2²⁸** (F-4's arithmetic, re-derived here from the same two lines). Unguessability
  is a real property; it is **not** an authority class, and this contract does not let it stand in for
  one.

**DECISION — G8's close names two, and v2 makes them here.** The register made them *checkable*; the
contract makes them.

1. **`save_contour` (register row 14) — the write is ruled `SESSION-DECLARED`, not `ANONYMOUS`.** The
   client already authenticates on every call through this core; the server declining to read what the
   client always sends is the asymmetry, not a permission grant. The cure is the **dependency**, not a
   client change. ▲ And the over-statement is barred in the same breath, at the record's own bytes
   (⟨cmd⟩ base `$R`, `/usr/bin/grep -n -F 'not an exploit, is the defect' fr-EditorControlsDock.md` →
   `:60`): ***"The asymmetry, not an exploit, is the defect (content-addressed store honestly noted)."***
   The store is content-addressed and abort-keyed; **this is not the sibling's publish-blocker**, and the
   seam is recorded **R6-8-CLEAN as a positive**. The `Idempotency-Key` channel is taken on the same act,
   because a non-idempotent write that declines the replay envelope its own core offers is an
   undeclared retry hazard, not a design.
2. **The image GETs (rows 23 · 24 · 25) — `ANONYMOUS` is RETAINED for the blob and thumbnail of a
   PUBLISHED entity and is WITHDRAWN for the pre-publication surface.** The class is not the whole
   decision: **the cache directive is part of the authority posture**, because a 24-hour public cache on
   an unauthenticated URL converts a later visibility change into a no-op for every intermediary. The
   contract therefore binds the two together — *the visibility gate and the cache directive are decided
   in one act*, and §C2 is where that act lands for the moderation case.

**DISPOSITION.** Booked: **`R3-7b`** (the un-refuted CONTRACT DEFECT) · **`GCM-52`** (C-15) ·
**`fr-GalleryDraftsSection F-4`** (= C-C-8). **`fr-EditorControlsDock D-12 / C-4 / C-5`** rides with its
**full banked head** — the alias limbs are carried because a dropped limb is invisible to an id-keyed
difference **in both directions** — and its rider (async commit, no pending state, no double-submit
guard, a reachable silent unhandled rejection) rides the same seam. **`fr-EditorControlsDock C-6/C-7`**
is CITED for the asymmetry sentence above. Identity stays with the intake at every instantiation
(EditorControlsDock C-6, GCM-52, `FR-AFP-4`, GalleryDraftsSection F-4 all say so) — **fold by reference,
never re-book**. The acts land at the **fourier API row**; **F.W5 claims credit for none of them** (§0b).

▲ **LOCK — the register is the enumeration; the contract is the decision; neither substitutes for the
other.** A later wave may not close G8 by pointing at the register alone (the classes are a *measurement*
of today's handlers) nor by pointing at this clause alone (a decision with no row-level surface is
unfalsifiable). **G8 closes on both**, and a conformance probe reads the register row-wise against this
clause's vocabulary.

### C2 — Image remediation contract — ONE unit

**RULE.** **A moderation action that is advertised as taking content down TAKES THE CONTENT DOWN**, and
the four mechanisms that together decide whether it does are **ruled as one unit**: (i) the delete or
quarantine verb over the **asset**, not only over the entity that references it; (ii) the **blob
visibility gate**; (iii) the **janitor's recency predicate**; and (iv) **thumbnail versioning**. A
contract that rules any one of the four alone has ruled none of them, because each of the other three
independently restores the artifact.

**WITNESS** (measured this seat, base `$F`). **No action the moderation panel offers takes the reported
artifact offline**, and each limb is measured separately:

- **There is no asset-level delete.** ⟨cmd⟩
  `/usr/bin/grep -cE '^@router\.(get|post|put|patch|delete)\(' api/routers/images.py` → **7** operations;
  ⟨cmd⟩ `/usr/bin/grep -cE '^@router\.delete\(' api/routers/images.py` → **0**. The panel's *Delete* is
  a soft-delete of the **visualization** (register rows 5 · 33), not of the image.
- **The blob GET is unauthenticated and publicly cached** — §C1's `:145`/`:164`/`:205` header sites,
  register rows 23 · 24 · 25, all `ANONYMOUS`.
- **The janitor's recency predicate is bumped by the very fetches that make the content a problem.**
  ⟨cmd⟩ `/usr/bin/grep -rn 'touch_document' api/ --include='*.py'` → six sites, of which two are the
  asset read paths: `api/dependencies.py:75` `await touch_document("images", {"image_slug": image_slug})`
  and `:100` `await touch_document("contours", {"contour_hash": contour_hash})`. **Actively-fetched
  reported content is precisely what never reaps.**
- **The thumbnail URL is unversioned**, `${BASE}/api/images/${imageSlug}/thumbnail` (⟨cmd⟩
  `/usr/bin/sed -n '292,294p' web/src/lib/api.ts`), so the 24-hour public cache **negates the deliberate
  re-upload regeneration** — the one remediation path that does regenerate the artifact cannot be
  observed by any client for a day.

**DISPOSITION.** Booked: **`FR-AFP-4`** (L-1/C:D-2, the BLOCKER-weight survivor) · **`m-15`**. **`GCM-52`**
and **`fr-GalleryDraftsSection F-4`** are CITED (booked at §C1); **ImageUpload row 26's security half** is
CITED, its transport half living at §E15. ▲ **`m-15` is CROSS-REFERENCED, NOT MERGED with F-4**: **F-4
books *who can fetch*; m-15 books *what they see*.** The deployment auth-proxy question stays **UNPROVEN
→ SS-13**. Home: the **fourier API row**, as one unit.

▲ **LOCK — C's scope discipline, at the record's own bytes** (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F "C's scope discipline preserved: soft-delete does de-list from browse" fr-AdminFlaggedPanel.md` → `:47`): ***"C's scope discipline preserved: soft-delete does de-list from
browse"*** — the down-listed form is the record's, and v2 must not over-state the finding: **de-listing
from browse is real and is not take-down**. The four limbs ship together or the unit is not closed; a
repair that lands the delete verb and leaves the janitor predicate has moved the artifact from *reachable
and listed* to *reachable and unlisted*, which is the state the panel already produces.

### C3 — Session truth, the canonical admin predicate, and the dead subsystem (R9)

**RULE.** **A client's authentication predicate is a statement about the SERVER's view of the caller, not
about the presence of a string in local storage**, and **exactly one predicate is canonical** for each of
*logged in* and *is admin*. The contract states which. Two corollaries bind both ends: **(a)** a `401` is
part of the contract vocabulary and the client speaks it; **(b)** **a declared capability with zero call
sites is not a session subsystem — it is dead code, and the contract does not carry it.**

**Session form, settled** (lane-crud §R-7, adopted): **v2's session clause takes the value.js form — a
SHA-256 digest at rest**; fourier persists the raw UUIDv4 as `_id`. The digest form is the contract's.

**WITNESS** (measured this seat, base `$F`).

- **`isLoggedIn` is a presence check over restored localStorage.** ⟨cmd⟩
  `/usr/bin/sed -n '14,22p' web/src/stores/auth.ts` → `:14`
  `const userSlug = ref<string | null>(safeGetItem(localStorage, USER_SLUG_KEY));` and `:21`
  `const isLoggedIn = computed(() => !!userSlug.value);`. A >30-day identity renders **authenticated
  forever** until a mutation fails.
- **The vocabulary for that failure is not spoken.** ⟨cmd⟩
  `/usr/bin/grep -rn '401' web/src --include='*.ts' --include='*.vue' | wc -l` → **0** (double-run).
  ⊘ **Instrument disclosure**: the unscoped form `/usr/bin/grep -rn '401' web/src | wc -l` returns **7**,
  and **all seven are digit substrings inside `web/src/assets/fourier-paths/moon.json`** — a coordinate
  file. The spec's stated ZERO is true of the source tree and false of the naive probe, which is the same
  class as a `__pycache__` line inflating a source count: **the digit is wrong and the command still
  "works"**.
- **`getMe` — the one revalidation edge — has zero call sites**, register row 29, §4.3: ⟨cmd⟩
  `/usr/bin/grep -rw 'getMe' web/src --include='*.ts' --include='*.vue' | /usr/bin/grep -cv 'lib/api.ts'`
  → **0**.
- **The admin predicate is forked and the non-persisted half is the one on screen.**
  `web/src/stores/auth.ts:22` exposes `isAdminAuthenticated = computed(() => !!adminToken.value)` over a
  token **restored from localStorage** at `:16` — and the badge reads `galleryStore.adminMode` instead:
  ⟨cmd⟩ `/usr/bin/grep -rn 'adminMode' web/src | wc -l` → **30** sites over a plain ref that is never
  rehydrated. **After reload the app is admin-capable and the badge is gone.**
- **R9's ground — the anonymous-session subsystem has ZERO external call sites.** The block is
  self-labelled: ⟨cmd⟩ `/usr/bin/sed -n '100,118p' web/src/stores/auth.ts` heads
  `// ── Session (anonymous) ──────` and contains `ensureSession` (`:102`) and `clearSession` (`:112`).
  ⟨cmd⟩ (per name) `/usr/bin/grep -rw '<name>' web/src --include='*.ts' --include='*.vue' | /usr/bin/grep -cv 'stores/auth.ts'` → **`ensureSession` 0 · `clearSession` 0** (double-run).
  `logout()` (`:60`) clears `userSlug`/`userToken` and calls `setSessionToken(null)` — and **never calls
  `clearSession`**, so `sessionStorage`'s token survives a logout; the bootstrap's
  `} else if (sessionToken.value) {` arm (`:29-30`) would then re-attach an anonymous identity on reload.
  ⊘ **Instrument disclosure**: the same probe on the token itself returns **4**
  (`/usr/bin/grep -rw 'sessionToken' web/src … | grep -cv 'stores/auth.ts'`) and **all four are
  `web/src/lib/api.ts`'s own module-local `let sessionToken` (`:42` · `:45` · `:132` · `:133`)** — a
  **homonym fed by `setSessionToken()`, not a consumer of the store's ref**. The zero holds for the
  subsystem; it does not hold for a name-keyed probe, and that distinction is the whole of R9's evidence.

**DECISION — R9, ruled.** COHESION **§0j.D F-SS4REST R9**: ***DELETE*** the dead session subsystem (zero
external call sites). v2 therefore **does not carry an anonymous-session capability**. Concretely: the
store's `sessionToken` ref, `ensureSession`, `clearSession`, the `SESSION_TOKEN_KEY` constant and the
bootstrap's `else if` arm go; the **server's four `/api/sessions` operations are NOT in scope of this
deletion** (register rows 26–29 — `register`, `login`, `me`, `logout` — of which `me` is §C3's
revalidation edge and stays). **Deleting a client capability is not retiring a server operation**, and a
later wave may not read R9 as licence to do the second.

**DISPOSITION.** Booked: **`FR-USB-15`** (L-1/C-§0/C-7) · **`FR-USB-23` ⊙** (L-10 — the ruled row).
**`fr-AppHeader FR-AH-6`** (C-6) rides as a **LEG held at F-W4**; **`fr-GalleryView FR-GV-7`** (=M-9/C·M-9)
is **held at F-W3 §X.1-v5's register** (canonical `F.W3`, leg `F.W5-W8`) — **named by its holder, at both
ends**. ⊘ *The former A6↔C3 mutual citation was a closed two-clause loop resolving to nothing outside its
own file (PASS-5 P5-14); each end now names a holder.* **`fr-AdminAuditLog K-5`**'s *adminMode
non-persisted* fact **corroborates and is corroborated — it is not re-booked here.** Homes: the
**401 handling and `getMe` revalidation are authored at the STORE/API seam** (F.W4 renders whatever truth
the store then has); **the admin-auth seam owns WHICH predicate is canonical, and that is F.W5's** — this
clause.

▲ **LOCK — the defect is authored in the STORE; do not route the cure to the leaf.** One predicate, one
home. A component that reads a different admin flag from the one the store rehydrates is a **rendering**
of the fork, not the fork, and repairing it at the leaf leaves the contract exactly as ambiguous as it
was.

### C4 — Retry and limiter posture

**RULE.** **A retry the user cannot see, cancel or escape is not a retry; it is an unbounded wait
disguised as a request.** Every operation in this contract declares its retry posture, and the default is
stated rather than inherited: **authority-bearing mutations pass `retryOn429: false` or surface the
wait**, and any operation that opts into silent retry **bounds it and makes it abortable**.

**WITNESS** (measured this seat, base `$F`).

- **The default is opt-out, not opt-in.** ⟨cmd⟩ `/usr/bin/sed -n '161,163p' web/src/lib/api.ts` → `:162`
  `const retryOn429 = options?.retryOn429 ?? true;` — so **every call site that says nothing opts into
  the silent retry**, including the login path. The retry fires at `:172`
  (`if (res.status === 429 && retryOn429 && attempt < MAX_RATE_LIMIT_RETRIES)`).
- **The signal is hoisted out of the loop**, which is both the re-entrancy property and the reason the
  wait cannot self-abort: ⟨cmd⟩ `/usr/bin/sed -n '161,166p' web/src/lib/api.ts` → `:161`
  `const signal = options?.signal ?? abortable(abortKey);` sits **before** `:163` `let attempt = 0;` and
  `:164` `while (true) {`.
- A full-payload re-upload runs against the **same compute budget** as the interactive controls, so the
  two most expensive acts on the surface contend for one limiter.

**DISPOSITION.** Booked: **`FR-USB-24`** (L-11 — the auth-side arm) · **`fr-EquationPanel D-L5+C-1`** (the
abort-seam family). The two rows **share one lock and neither carries the other's sentence**:
`FR-USB-24`'s routing cell is the auth arm (*"auth mutations pass `retryOn429: false` or surface the
wait"*) and carries **no controller sentence of its own**.

▲ **ONE-CONTROLLER LOCK, at the record's own bytes** (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'the 429 retry loop cannot self-abort because the signal is hoisted outside' fr-EquationPanel.md` → `:69`): ***"the 429 retry loop cannot self-abort because the signal is hoisted
outside `while (true)` (lib/api.ts:161-164, my read) — a re-entrancy subtlety any C-1 hardening rewrite
must preserve."*** **F.W5's binding, in F.W5's own voice**: a hardening rewrite of the retry loop
**preserves the hoisted signal**. A naive request-scoped rewrite that re-derives the signal inside the
loop satisfies the visible symptom and destroys the property the seam is built on — the two-slot
hardening question is answered **in the contract**, not at the call site.

### C5 — Redaction parity

**RULE.** **A provenance breadcrumb emits, for every hop the viewer may not read, a redacted placeholder
carrying ORDINAL and NOTHING ELSE.** The redacted form is a **discriminated union member**, so the
absence is a shape the client can render rather than a field it must guess at:
`{ kind: "unavailable", ordinal }`. Redaction applies to **every** hop of a chain, never to the entry row
alone. **If the two ends do not adopt one shape, v2 states the asymmetry and its reason — silence is not
a posture.**

**WITNESS** (measured this seat).

- **value.js already collapses non-public hops to the union member.** ⟨cmd⟩ base `$V`,
  `/usr/bin/sed -n '177,181p;195,199p' api/src/modules/palette/service/forks.ts` →
  `:179` `| { kind: "unavailable"; ordinal: number };` (the declared member) and `:197`
  `chain.push({ kind: "unavailable", ordinal });` guarded by `if (!doc)`. The clause the value side
  already states: *no raw document or lineage field ever crosses the wire for a non-public hop*.
- **fourier's breadcrumb applies NO redaction.** ⟨cmd⟩ base `$F`,
  `/usr/bin/grep -rn '_readable_or_none' api/ --include='*.py' | wc -l` → **5** (double-run), all five in
  `routers/visualizations.py` — `:466` (def) · `:507` (remix) · `:744` (provenance) · `:816` (diff) ·
  `:869` (versions) — i.e. **applied to the ENTRY row only**. The ancestors are a bare `find_one`, so
  `slug`, `set_hash`, `author_slug` and `created_at` of a **private ancestor** cross the wire for every
  hop. ⊘ *Instrument note: run without `--include='*.py'` the same probe returns **6**, the extra line
  being a `Binary file …__pycache__… matches` row. Every count in this clause is source-scoped.*

**DISPOSITION.** Booked: **`F-γ` / `R-6`** (lane-crud). The act is the **fourier API row**'s: the
breadcrumb redacts to the value.js discriminated-union shape. ▲ **Sequencing, not caution**: register row
11 (`GET …/{slug}/provenance`) disposes `CLIENTABLE` **SEQUENCED BEHIND §C5** — clienting the edge before
this clause lands ships a private ancestor's slug **to a rendered surface**. The sequencing lives in the
register's basis cell and the disposition cell holds one token (register §4.2).

▲ **LOCK.** Today's witness is **a private ancestor's slug on the wire** — the same *private artifact
readable by slug* family as **GCM-52** at the image seam (§C1/§C2). The two are one mechanism at two
surfaces: **an identifier that is also a capability**. A cure at either surface that leaves the other is
not parity.

---

## §D — The denominator, disposition and coverage

*(No clause is numbered D9 — `D9` is reserved for the ruled owner decision, `docs/tranches/V/DECISIONS.md`
§2 row `D9`, which no clause may contradict.)*

### D1 — Per-operation disposition, keyed to the register

**RULE.** **Every operation in this contract carries exactly one CLIENT-EDGE DISPOSITION**, drawn from a
closed set — `CLIENTED` · `CLIENTABLE` · `STRUCK` · `SERVER-ONLY` — and **the register is where it is
written**. A gap is not an absence to be discovered later; it is a **row with a disposition, a measured
basis, one home and two citations**. Where a disposition is *sequenced* behind another clause, the
sequencing lives in the **basis**, and the disposition cell still holds exactly **one token**, so an
id-keyed or token-keyed probe reads **one answer per row**.

**WITNESS** — `contract/operation-register.md`, authored by unit a at this wave and measured at its own
clock. The figures are the register's; this clause consumes them and re-derives none:

| partition | reading | closes |
|---|---|---|
| arms | `public-non-admin` **30** · `admin` **13** · `app` **1** · `gallery` **1** | **45** |
| disposition (G9) | `CLIENTED` **36** · `CLIENTABLE` **7** · `STRUCK` **1** · `SERVER-ONLY` **1** | **45** |

**36 client edges / 9 gap operations.** **SEVEN of thirteen** `/api/visualizations` operations — `remix`,
`publish`, `unpublish`, `forks`, `provenance`, `diff`, `versions` — **have zero client function** (register
§4.1; a fourth independently agreeing count). The `publish` witness reproduces at the bytes: the client
publishes by **PATCHing `{visibility:"public"}` behind an extra GET** while the dedicated verbs ship with
no wrapper.

▲ **CENSUS CORRECTION, carried forward as a standing term of this contract (C-3): both sides were right on
different denominators — never cite "30" as the whole API again. The triple is 45 = 30 public-non-admin +
13 admin + 1 app + 1 gallery.** ▲ **COUNTING LOCK K-1 (server-side blindness): a `@router.` grep is BLIND
to prefixed routers (`@gallery_router.get("/cursor")`) — read against 13/44, never as zero.** The trap
**fired** at unit a rather than being quoted: `@router\.` over `admin.py` → **0** against
`@admin_router\.` → **13**. ▲ **SECOND BLINDNESS LOCK — F-6, the CLIENT-side axis**, quoted at the spec's
own words: ***"the template-`src`-binding operation edge is structurally invisible to a function-keyed
operation↔client model (the R5-7 dual)"***, and its consequence: ***"The register enumerates
template-bound edges explicitly or it is armed against server under-count and unarmed against client
under-count."*** The register's §5 **is** that enumeration — three operations reached only through a URL
builder (`thumbnailUrl` 3 consuming sites · `overlayUrl` 3 · `imageUrl` **0**), none traversing
`coreFetch`.

**DISPOSITION.** Booked: **`R3-7c ⊕ X-3`** · **`FR-GV-8`** (=M-6/L-12) · **`FR-GV-27`** (=L-23).
**`F-6`** (= C-C-9 = L-15, `fr-GalleryDraftsSection:49`) rides as a **LEG held at NWO→SS-3** — its own
severity stays **INFO / NO-WAVE-OWNER** (SS-3/SS-4 census methodology) and **this contract consumes it as
a register-construction constraint, booking no repair**. **`AA-31`** is CITED (booked at §B1);
**`FR-AFP-1`** is CITED **INVERTED** at §D3. Identity/provenance **DISPLAY** arms fold to banked
**`fr-GalleryCard D-7 / C·I-2`** (the full banked head), **`GCM-25`** and **`GCM-3`** — **do NOT re-book**.
`FR-GV-27`'s phantom-view cell belongs to **§E6**, not here.

▲ **LOCK — the seven unclientted operations ARE the provenance surface this contract re-authors.** That is
why every one of them disposes `CLIENTABLE` and **none** disposes `STRUCK`: a provenance verb with no
client is a **gap**, and striking it would retire the union's subject to tidy the count. Two of the seven
are sequenced (`provenance` behind §C5, `versions` behind §E2) and **sequencing is not a third
disposition**.

### D2 — The like verb ‡ — RULED: REMOVE THE AFFORDANCE

**RULE — RULED, COHESION §0j.D F-SS4REST R4: REMOVE THE AFFORDANCE.** **No dead affordance ships under an
`aria-pressed`.** A surface that reports state to assistive technology reports a state the system can
actually hold; a control whose only write path is a client-side constant does not report state, it asserts
one. The counter, its compound index, its sort key and its UI arm are **retired together**, because each
one alone is what makes the next look intentional.

**WITNESS** (measured this seat, base `$F`) — the full shape, in four measurements:

- **No like route exists anywhere.** ⟨cmd⟩ `/usr/bin/grep -rniE 'def .*like|/like' api/routers/ | wc -l`
  → **0** (double-run).
- **The server sorts by a counter nothing can increment.** ⟨cmd⟩
  `/usr/bin/sed -n '17,22p' api/lib/crud/cursors.py` → `:17`
  `SortKey = Literal["newest", "popular", "most-forked", "views", "likes"]` and the map's
  `"likes": "likes"` row; ⟨cmd⟩ `/usr/bin/grep -n 'likes' api/services/database.py` → `:111`
  `await _db.visualizations.create_index([("visibility", 1), ("likes", -1), ("_id", -1)])` — **the
  compound index ships**.
- **`liked_ips` exists only as an exclusion.** ⟨cmd⟩
  `/usr/bin/grep -rn 'liked_ips' api/ --include='*.py' | wc -l` → **7**, every one a projection
  exclusion — the dedup substrate for a verb that was never written.
- **The client hard-codes the on-state.** ⟨cmd⟩ `/usr/bin/grep -n 'const liked' web/src/stores/gallery.ts`
  → `:195` `const liked = true;` — a monotonic unguarded bump with **no un-like arm**.

**DISPOSITION.** Booked: **`FR-GFC-3`** as **ONE identity with FOUR witnesses** — `C-1` ⊕
**`fr-GalleryCard C-1-as-corrected`** ⊕ `GCM-2·C-1` ⊕ **`fr-GalleryInfiniteGrid C-3`**. The fourth is
spelled with its record because **`GIG C-3` is resolvable by a reader and not by an id-keyed
set-difference** — the exact mechanism by which a row escaped at pass 4. `fr-GalleryInfiniteGrid C-3`'s
canonical home is **`F.W5-W8`** (legs `NO-WAVE-OWNER` · `SS-3` · `SS-4`) and its banked disposition is
*FOLDS BY REFERENCE to banked FR-GFC-3 — do NOT re-book*: it is booked here **once, as the fourth
witness of the one identity**, and its own new grain — the **orphan-client class**, a published emit
contract with no reachable operation, R6-8's degenerate case — **rides its NWO leg as census methodology,
cited never booked**. The **display arm** (`aria-pressed` + the re-click guard) is **F.W3/W4's**; the
route deletion and index/sort-key retirement are the **fourier API row's**.

▲ **LOCK — the honest repair, at the record's own bytes and its own case** (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'third option ships' fr-GalleryFeaturedCarousel.md` → `:34`): ***"add the operation
or remove the affordance — the honest repair is stated in C §7.1 and adopted: no third option ships"***.
The owner has now chosen the second arm. ▲ **The store's own comment DOCUMENTS the stopgap — v2 must not
treat it as intent**: a comment explaining why a constant stands in for a verb is evidence of the gap, not
a specification of it. ▲ **Dissent preserved, not resolved**: the **C axis filed BLOCKER at two sites**
against the banked MAJOR; the filing stands in the record and is **not** reconciled by the ruling, which
decided the *disposition*, not the *grade*.

### D3 ⊙ — Moderation producer-or-retire — **THE ADMISSION GATE** — RULED: PRODUCER, AS A PORT

**RULE — RULED, COHESION §0j.D F-PRODRET (R3 ≡ D3 ≡ G11): PRODUCER.** The moderation queue **gains its
user half**, and it gains it as a **PORT of value.js's already-shipped verb** under this contract:
`POST /visualizations/{slug}/flags` on the fourier side, the mirror of value.js's `POST /:slug/flag`.
**The port is homed at F.W8** (the CRUD union prototype). **F.W5 writes this clause and nothing else about
it** — the clause is the wave's own act, the implementation is F.W8's, and neither is the other's.

**The ruling's rationale, carried with the ruling** (§0j.D): *D-15 made the value↔fourier API isomorphism
first-class; retiring the admin half would freeze the two APIs non-isomorphic where the port is the
cheapest act in the union.* **The union's cleanest one-directional donation**: value.js has the verb
fourier lacks.

**WITNESS** (measured this seat) — the queue has **NO PRODUCER**, and the absence is enumerated rather
than queried for one name (§D16's S-8 method law, applied to this clause's own proof):

- **The declared request model is referenced nowhere.** ⟨cmd⟩ base `$F`,
  `/usr/bin/grep -rn 'FlagRequest' api/ web/src --include='*.py' --include='*.ts' --include='*.vue'` →
  **exactly one hit, the definition**: `api/models/admin.py:57` `class FlagRequest(BaseModel):`.
- **Every `db.flags` write repo-wide is a fixture or a migration.** ⟨cmd⟩
  `/usr/bin/grep -rn 'flags.insert\|flags.update\|flags.replace' api/ --include='*.py' | /usr/bin/grep -v tests` → **one line**, `api/scripts/migrate_flags_field.py:104` (`update_many`). The live
  surface is **read and delete only**: `admin.py:530` (`aggregate`), `:219`/`:358`/`:469`/`:607`
  (`delete_many`).
- **No client posts a flag and no UI renders a report affordance** — the panel is admin-side only, and
  ⟨cmd⟩ `/usr/bin/wc -l web/src/components/visualization/gallery/AdminFlaggedPanel.vue` → **285** lines,
  of which production's only reachable state is *"No flagged content"*.
- **value.js HAS the verb.** ⟨cmd⟩ base `$V`,
  `/usr/bin/sed -n '1,5p' api/src/modules/palette/routes/flags.ts` → *"POST /:slug/flag — flag a palette
  for admin review."*, wired at `api/src/modules/palette/routes/index.ts:38`
  (`palettes.route("/", flagsRouter);`).

**DISPOSITION.** Booked: **`FR-AFP-1`** (L-1/C:D-1) — **the band's sole reachability gate**. This clause
**extends R3-7c INVERTED**: R3-7c's axis is *an operation with no client*; `FR-AFP-1`'s is **an admin half
with no user half**, and the gap ledger carries **both directions**. Homes: **the clause is F.W5's; the
port is F.W8's; FR-AFP grade re-derivation is F.W1's, at the populated surface.**

▲ **SEQUENCING LOCK — the producer conditional, at the record's bytes with its elision marked** (⟨cmd⟩
base `$R`, `/usr/bin/grep -n -F 'grade the populated surface' fr-AdminFlaggedPanel.md` → `:25`):
***"Ruling: severities in this roster grade the populated surface; … FR-AFP-1 is the band's sole
reachability gate, and the F.W5-W8 producer-or-retire decision must precede F.W1's sizing where grades are
load-bearing."*** (the `…` marks elision of the ruling's L-2/K10 disposition clause — elision, never
addition). **The obligation on F.W5, in F.W5's own voice**: the ruling **precedes F.W1's sizing wherever
FR-AFP grades are load-bearing**, and it does — F-PRODRET was ruled at §0j.D **before this wave opened**,
and this clause lands it. **F.W1 is unblocked on that axis at this clause's commit.**

▲ **LOCK — the port is a port.** The fourier verb is written **against this contract's shape**, not
re-invented: same identity rules (§D4), same authority class discipline (§C1), same envelope (§A2). A
producer that lands with a different flag identity re-opens §D4 at the moment it ships.

### D4 — Flag identity keys the ENTITY

**RULE.** **A moderation record keys on the ENTITY it reports, never on a content digest.** A digest is a
**substrate, never identity** — the fourier models say so in their own prose — so a flag keyed on
`content_hash` fans one report out across every entity that shares the content, and a dismissal scoped to
the digest silently clears every sibling.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '600,610p' api/routers/admin.py` →
the dismiss handler resolves the entity, then discards it: `doc = await db.visualizations.find_one({"slug": slug}, {"content_hash": 1})` followed by
`result = await db.flags.delete_many({"content_hash": doc["content_hash"]})` — **a slug-labelled action
executing a hash-scoped `delete_many`**. The uniqueness constraint confirms the fan-out is by design of
the index, not an accident: ⟨cmd⟩ `/usr/bin/grep -n 'flags.create_index' api/services/database.py` →
`:140` `[("content_hash", 1), ("reporter_slug", 1)], unique=True` — **unique per (digest, reporter)**, so
N entities sharing content produce N rows each claiming the full count. And the law it violates is in the
tree: ⟨cmd⟩ `/usr/bin/grep -rn 'never identity' api/ --include='*.py'` →
`api/models/visualization.py:113`, *"substrate, never identity (CRUD-CONTRACT §1)"*.

**DISPOSITION.** Booked: **`FR-AFP-7`** (L-3/L-4). **Contract-level**: flag identity moves to the ENTITY,
**or** dismiss scopes to slug — and the contract states which, because the two choices produce different
wire shapes. Home: the **fourier API row**; **§D3's port is written against whichever this clause
settles**, which is why §D3's lock names it.

▲ **LOCK.** The apparent count is the tell: **3 rows × "3 flags" reads as nine**. A repair that fixes the
count display and leaves the key has made an incorrect number correct and left the **destructive** arm —
the hash-scoped `delete_many` — exactly as wide as it was.

### D5 — Which identifier a human-facing surface may render

**RULE.** **A human-facing surface renders the ENTITY identifier of the thing it is about.** An asset
foreign key is not an entity name; a destructive confirmation that names an asset while deleting an
entity is **mis-stating its own subject**, and the contract forbids it.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/grep -n 'image_slug' web/src/components/visualization/gallery/AdminFlaggedPanel.vue` → the
label (`:175`), three `aria-label`s (`:202` · `:212` · `:222`) and the confirm call (`:224`
`askDelete(item.slug, item.image_slug ?? item.slug)`) **all spend `item.image_slug`** — an asset FK
**shared by every remix** — while the act deletes `item.slug`. The remix model declares no `image_slug` of
its own, so siblings are indistinguishable on the surface that asks you to destroy one of them.

**DISPOSITION.** Booked: **`FR-AFP-8`** (L-2/C:D-3). **`GCM-1`'s `/w/` shape is CITED** (booked at §E4).
v2 states **entity vs asset** for human-readable surfaces; the **one-token F.W3/W4 rider** is *pass
`item.slug` as the label*. ▲ **Dissent preserved**: the **L axis filed BLOCKER**; β's demotion to MAJOR is
**sustained under ruling 5 (K10)** — the L axis cannot carry two BLOCKERs when its first proves the second
unreachable.

▲ **LOCK.** The rider is one token wide and **it is not the clause**. Passing `item.slug` at this call
site fixes this dialog; the contract term — *human surfaces spend entity identifiers* — is what stops the
next surface re-deriving the same defect from the same available FK.

### D6 — Lifecycle truth and cascade — RULED: KEEP the hard-delete arm

**RULE — RULED, COHESION §0j.D F-SS4REST R6: KEEP the arm; the copy is made truthful about
irreversibility.** **A lifecycle verb's copy states what the verb does.** Soft delete is reversible and
says so; the grace-bypass hard delete is irreversible and says so; and **soft delete CASCADES the
moderation rows it strands**, or the contract states where they go.

**WITNESS** (measured this seat, base `$F`), four limbs:

- **The dialog asserts irrevocability over a restorable act**, while the client ships an unreachable
  restore path (`web/src/stores/gallery.ts:178` `async function restore(slug: string)`).
- **The hard arm has zero callers.** ⟨cmd⟩ `/usr/bin/sed -n '518,532p' web/src/lib/api.ts` →
  `adminDeleteVisualization(token, slug, hard = false)` building
  `` `/api/admin/visualizations/${slug}${hard ? "?hard=true" : ""}` ``; ⟨cmd⟩
  `/usr/bin/grep -rnw 'adminDeleteVisualization' web/src --include='*.ts' --include='*.vue'` → **two call
  sites**, `stores/gallery.ts:154` and `AdminFlaggedPanel.vue:92`, **both passing two arguments**. The
  purpose-built grace-bypass is **unreachable from the UI**.
- **The docstring names a cascade owner that carries no flags code.** ⟨cmd⟩
  `/usr/bin/sed -n '1,6p' api/lib/crud/softdelete.py` → *"No cascade on soft-delete (R-lifecycle-spec
  §3.2); the cron handles hard-delete cascade via ``pinned_cron.cron_prune``."* — and ⟨cmd⟩
  `/usr/bin/grep -n 'flag' api/lib/crud/pinned_cron.py` → **one line, `:1`**, and it is the word *flag*
  in the module's own summary *"``pinned: bool`` flag + bounded cron prune (CRUD-CONTRACT §8)"*, **not
  flags-collection code**. ⊘ The naive `grep -c 'flag'` returns **1** and the honest reading is **zero
  flags code**; the count and the fact disagree, which is why the line is printed rather than the digit.
- **Therefore Delete → grace strands flags forever**, and a restored row returns to the queue still
  flagged, permanently inflating the unscoped `$group`.

**DISPOSITION.** Booked: **`FR-AFP-9`** (C:D-5) with its **member-site rider `FR-GV-34`** (= MISS-LC-5)
— **one identity, two call sites, NOT re-booked** — and **`FR-AFP-66`** (β-miss-1). The acts: a
**`content_hash`-keyed cascade at grace hard-delete** ⊕ **the docstring correction** (the module docstring
is false for this band). ⊙ The **hard-arm caller decision** was the owner's and is **ruled KEEP**;
**truthful copy → F.W3/W4** (diction rides `FR-AFP-35`). Home: the **fourier API row** for the cascade and
the docstring; **F.W3/W4** for the copy.

▲ **LOCK — the copy is false in the direction that SUPPRESSES a safe action.** That asymmetry is the
reason R6 keeps the arm rather than deleting it: a warning that over-states irreversibility teaches the
operator to avoid the reversible act, so removing the *real* irreversible arm would leave the false
warning attached to the only path left. **Truthful copy is the cure; deletion would have been the
workaround.**

### D7 — Client-derivable bounds

**RULE.** **A numeric or cardinality bound is a property of the OPERATION, and the client derives it from
the operation model rather than inventing it at the leaf** (the R6-8 dual). Operation records carry field
**DOMAINS**; a control that restates a window in its own template is asserting a contract it cannot read.

**WITNESS** (measured this seat, base `$F`). The server's windows are **plural and divergent** — ⟨cmd⟩
`/usr/bin/grep -n 'n_harmonics' api/models/visualization.py api/models/equations.py` → `le=256`
(`visualization.py:76`) · `le=4096` (`:126`, `:187`, `:281`) · `le=200` (`equations.py:20`) — while the
client's numeric window is invented at the leaf and matches **none** of them. The unbounded-both-ends
cases are live in the same models: ⟨cmd⟩ `/usr/bin/grep -n 'max_length=50' api/models/admin.py` → `:42`
and `:47` (`hashes`, `slugs`) — **a server cap the client never enforces**. And the *Min Area %* control
drives a `[0,1]` fraction from a `0–20, step 0.5` axis, so every detent ≥ 1.0 demands
`area ≥ A ∧ area ≤ 0.92·A` — **empty by construction** — with the default `0.001` rendering "0.0" under a
"%" label: **a 100× unit lie in the dangerous direction**.

**DISPOSITION.** Booked: **`m-7`** (=C-6-as-rescoped) · **`FR-AUL-46`** (LC-miss-M5) · **`FR-FG-21`**
(=LC-missed-2) · **`FR-AFP-33`** (D-17/L-20/L-22); **`R-16`** (SliderControl) **FOLDS — books nothing
new**; **`fr-ContourSettings B-1 / L-B1 / C-2`** is a **LEG CITED, HELD AT F.W3** (canonical home `F.W3`,
file-criterion §5.d; legs `F.W5-W8`, `SS-13`) — **the ROW is F.W3's and only the contract obligation is
this clause's**, which is what the record's own rider says (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'the contract seam owes client-derivable bounds' fr-ContourSettings.md` → `:40`):
*"the typed range-checked descriptor table for all six fields rides an **F.W5–W8 rider** — the contract
seam owes client-derivable bounds"*. **`FR-AUL-46`'s ONE HOME IS HERE**, and this end says so: the census
of record carries it as a sole `F.W5` token, no alias, no leg — **it cannot be double-homed by
construction, and this clause is that home**; **F.W8's §3 J4 consumes the bound and does not author it**.
Anti-rename: `L-B1` here is **`fr-ContourSettings`'s**, not `fr-FourierShapeExtractor L-B1` nor
`fr-FunctionInput L-B1` — three records, one token, all three record-qualified.

▲ **K-3 KILL LOCK: `m-7`'s straddle-a-422 scenario is REFUTED FROM SOURCE** (`AnimationData` is a
server-computed embedded document; the client-reachable bound 4096 ⊇ [1,500]) — **v2 must NOT cite it**.
▲ **LOCK — the descriptor table is F.W3's and its INPUT is this contract's term.** A wave that lands the
table without the operation-side domain has hard-coded a second window one layer up. Born-RED fixture,
named at the record: drive *Min Area* to 0.5/1.0 in e2e and assert **non-422**. `FR-AFP-33`: the **server
bound is this clause's**; the **client collapse is F.W1/W3's**; and ▲ its counterweight is carried —
`if not flagged` short-circuits production's only case, so **the cost is LATENT while §D3 stands**, which
is precisely why §D3's producer ruling changes this row's weight rather than its content.

### D8 — A blanket write is not a transition

**RULE.** **A verb that claims to move an item between states performs the transition, and every verb has
its inverse.** A write that sets a field is not a transition unless the predicate that reads the field
participates; and a bulk write that unconditionally `$set`s a shared field **erases states it was never
asked about**.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '164,190p' api/routers/admin.py` →
`set_tier` writes **`{"$set": {"tier": body.tier, "updated_at": …}}`** and nothing else, then audits
`f"set_tier:{body.tier}"`. **The flagged listing has no tier predicate**, so *"Mark acceptable (save)"*
**never dequeues**. The client half is hardwired with no inverse: ⟨cmd⟩
`/usr/bin/grep -n 'handleSetTier' web/src/components/visualization/gallery/AdminFlaggedPanel.vue` →
`:116` (the handler) and `:204` (`handleSetTier(item.slug, 'saved')`) — a **repeat click is a real PUT +
audit row + success toast + full pagination reset for a no-op**. The batch arm is the destructive
converse: Batch Unfeature `$set`s `tier:"normal"` unconditionally via `update_many`, **silently erasing a
SAVED tier**.

**DISPOSITION.** Booked: **`FR-AFP-10` ⊕ `FR-AFP-70`** (C:D-4 · β-miss-7) · **`FR-GV-9`** (=C·M-8, second
clause). **ONE semantics decision covers the tier↔flag pair**; the tier verb gains its inverse; **the
false in-file comment dies with the cure**; the interim posture is **reflect-and-disable when already
saved**. ▲ **`FR-GV-9`'s first clause was KILLED at R-3/K3 — the kill is carried with the row.**
▲ **β's own KILL of its 428-escalation hypothesis (If-Match `*` accepted) is preserved — do not revive
it.** Rides banked **`FR-GFC-20`**'s stale-slug row. Home: the **fourier API row**.

▲ **LOCK.** The in-file comment claims the opposite of what the handler does. **A cure that leaves the
comment has left the defect's documentation in place**, and the next reader will re-derive the same wrong
model from it — which is the §B3 indictment (*a contract document read instead of the router*) reappearing
inside a single file.

### D10 — The list contract: filters and windows

**RULE.** **A filter that is offered is a parameter the operation accepts.** Every filter, sort and window
a surface exposes maps to a **declared operation parameter**, and a control with no parameter is not a
filter — it is a refetch. A bounded, dedicated fetch serves a bounded, dedicated section; **a section
whose contents are "whatever the infinite window happens to hold" is not a section.**

**WITNESS** (measured this seat, base `$F`). The parameter hole is **an operation-surface hole, not a
component patch**, and it is total: ⟨cmd⟩ (per file) `/usr/bin/grep -cw 'tier' <file>` →
`api/routers/visualizations.py` **0** · `api/routers/gallery.py` **0** · `api/lib/crud/cursors.py` **0**
(`web/src/lib/api.ts` carries 4, all client-side). **No `tier` param at ANY server layer**, so the
Featured strip is `featured ∩ the loaded window`, it **grows during vertical scroll**, and a featured row
outside the window renders **no Featured section at all**. The store-side filters are producerless:
⟨cmd⟩ `/usr/bin/grep -rnw 'visibilityFilter' web/src | wc -l` → **3**, all inside `stores/gallery.ts`,
**zero writers** — so `ownerParam()` returns `undefined` unconditionally and the server's whole
`owner == "me"` branch is **DEAD from this client**; ⟨cmd⟩
`/usr/bin/grep -rnw 'searchQuery\|tierFilter\|basisFilter' web/src --include='*.ts' | wc -l` → **6**, with
**zero query-builder or `.filter()` readers**, so every visitor who types and pauses tears the strip down
to refetch a provably identical page.

**DISPOSITION.** Booked: **`FR-GFC-4`** (=C-2/L-3) · **`fr-GalleryInfiniteGrid R-7`** — **BOOKED HERE by
its full (record, id) pair**, the pass-4 escape named: its substance was always in this clause (the
dead-controls arm inside `FR-GFC-1`, the param hole at `FR-GFC-4`) while **its identity was not**, and a
row whose substance lands without its id is invisible to the only difference G19 states. **`FR-GV-13`**
(=MISS-LC-2) books; **`FR-GFC-1`** (=D-1/C-3 ⊕ MISS-1(DU)) is **RIDER ONLY at F.W5** — whether
search/tier/basis become real params — while **the body cure is F.W4's** and **the D-1 skeleton cure is
KILLED (K5)**. **`fr-GalleryInfiniteGrid C-4 / D-13`** rides as a **LEG held at F-W3** (canonical `F.W3`,
file-criterion §5.e, `F.W5-W8` leg) — **cited, not booked**; **`FR-GSB-1`** rides as a **LEG held at
F-W4**. ▲ **`F.W1` must NOT be credited for the pagination-drain cure** (FR-GIG-5's bar). ▲ **Two BLOCKER
filings on `FR-GFC-1` (D and C axes) are preserved.** `FR-GV-13` is the worst sibling — the other three
filters at least have producers. Home: the **fourier API row** (a `tier` param, or a dedicated **BOUNDED**
featured fetch).

▲ **WAVE-LOCK, at the record's own bytes and its own polarity** (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'carried as a **WAVE-LOCK** on any' fr-GallerySearchBar.md` → `:24`):
***"carried as a **WAVE-LOCK** on any F.W5-W8 wiring of `basisFilter` — wire it without the banked
normaliser and the Fourier pill returns zero rows against `active_bases ∈ {fourier-epicycles,
fourier-series}`."*** The normaliser's banked id is **`fr-BasisSelector M-10`** — record-qualified, cited,
**not re-booked**. *Identity minute*: the quoted `C-2` is an **ALIAS carried beside
`fr-GallerySearchBar FR-GSB-6`** (home `F.W3`), so **the WAVE-LOCK is a quotation, never a booking**; that
record's one canonical `F.W5-W8` row is `FR-GSB-28`, booked at **§B1**. ▲ The genuinely new rider
`fr-GalleryInfiniteGrid R-7` carries — under the drain, **one tier click costs `⌈N/20⌉` round trips, not
one** — rides `FR-GFC-1`'s banked row and is **not credited to F.W5**.

### D11 — What a count counts

**RULE.** **Every count this contract transports declares two things: whether it is LIVE or
TOMBSTONE-INCLUSIVE, and whether it is PRIMARY or DERIVED.** An unqualified number on an operational
surface is not a measurement; and **a derived total silently drops whatever its fold does not enumerate**.

**WITNESS** (measured this seat, base `$F`).

- **Two uncorrected opposite biases under one unqualified label.** ⟨cmd⟩
  `/usr/bin/sed -n '144,147p' api/routers/admin.py` → the storage tile's pipeline is
  `[{"$group": {"_id": None, "total_bytes": {"$sum": "$bytes"}}}]` — **no `$match`**, so soft-deleted
  assets are counted — while `"bytes"` records the primary blob only and thumbnails are separate
  `{slug}.thumb` files **sized nowhere**. The two errors are **unbounded and non-cancelling**.
- **A derived total that vanishes its own off-enum members.** `:127`
  `total_entries = sum(tier_counts.values())` — a fold over an **in-enum** grouping, so any absent or
  off-enum `tier` silently disappears from the total (the §D12 mechanism, one layer up).
- **A janitor that manufactures the population its prune then refuses.** `:263`'s *"Live-entry count"*
  `$lookup` carries **no `deleted_at` filter** (`:280` `"entry_count": {"$size": "$_entries"}`), and
  `prune_empty_users` uses the **same** unfiltered lookup.

**DISPOSITION.** Booked: **`GAB-15`** (L·D-10) · **`GAB-16`** · **`FR-AUL-20`** (LC-miss-M2) ·
**`FR-AUL-25`** (DU-miss). **`GAB-17`** (D-M7/C-11/L·D-13) rides as a **LEG held at F-W4**. v2 states
**live/tombstoned** and **primary/derived**; the join filters `deleted_at: None` **or** tombstone-inclusive
counting is stated explicitly; the honest total is `count_documents(not_deleted_filter())` ⊕ an *other*
bucket; the prune gets a count/dry-run endpoint or a two-step confirm. ▲ **`GAB-17` is SEQUENCED**: render
`stats.normal` **only AFTER `GAB-16` lands**, or drop the field with this contract pass — **its
"verification" limb is a TAUTOLOGY until then**. ▲ **`GAB-16` REFUTES D-M7's headline rationale (R-6
ruling) — the refutation is carried with the row.** ▲ **PRUNE SEQUENCE: `FR-AUL-20` → `FR-AUL-21` →
`FR-AUL-25`; the count is meaningless until both land.** ▲ **Dissent: axes split MAJOR/MINOR/INFO on
`GAB-17`; MINOR ruled — the split is preserved.** Magnitudes → **SS-13**.

▲ **LOCK.** The prune confirmation announces an **unbounded PERMANENT deletion without a count**, although
`empty_slugs` is computed **before** the delete. **The number exists and is withheld** — which is the one
case where "add a count" is not a feature request but the removal of a defect.

### D12 — Closed domains at the boundary — RULED: STOP MINTING the off-state `[]`

**RULE — RULED, COHESION §0j.D F-SS4REST R5: STOP MINTING the off-state `[]`; the contract does not admit
it, and there is NO SILENT REWRITE.** More generally: **one closed set spans writers, model and wire.** A
domain that is closed at the boundary and open in the collection is not closed; a value a writer can mint
and a reader cannot represent is a **contract break at the moment it is written**, not at the moment it is
displayed.

**WITNESS** (measured this seat, base `$F`), three instances of one mechanism:

- **A THIRD `status` exists and renders as health.** ⟨cmd⟩
  `/usr/bin/grep -rn 'orphan-migrated' api/scripts/migrate_visualization.py` → `:393`
  `"status": "orphan-migrated",` (upserted; `:17` documents the disposal path). `AdminUserInfo.status` is
  a bare `str`, `$ifNull` passes it through, and the template branches on one value only: ⟨cmd⟩
  `/usr/bin/grep -rn "user.status === 'suspended'" web/src --include='*.vue'` → **one hit**,
  `AdminUserList.vue:375`. **An orphan-migrated user renders as a HEALTHY ACCOUNT WITH A SUSPEND
  AFFORDANCE** — on the panel whose purpose is separating real accounts from churn.
- **Two hand-maintained maps stand in for a seven-member server enum.** ⟨cmd⟩
  `/usr/bin/grep -n 'strategy' src/fourier_analysis/cli.py` → `:231`
  `choices=["auto", "threshold", "adaptive_threshold", "multi_threshold", "canny", "edge_aware", "ml"]`
  — **seven**; ⟨cmd⟩ `/usr/bin/sed -n '41,57p' web/src/components/visualization/ContourSettings.vue` →
  `strategyLabels` and `strategyDescriptions`, two `Record<string, string>`s, **six keys each**.
  **`adaptive_threshold` is real, implemented and UNREPRESENTABLE in the picker**, and once selected
  elsewhere cannot be re-selected.
- **The deliberately-minted "off" state is unrepresentable end-to-end.** ⟨cmd⟩
  `/usr/bin/grep -n 'canvas handles it gracefully' web/src/components/visualization/BasisSelector.vue` →
  `:103`, the in-file comment above the empty-selection path. **The third click is honoured on screen and
  destroyed on save with zero diagnostic.**

**DISPOSITION.** Booked: **`FR-AUL-21` ⊕ `FR-AUL-31`** · **`fr-BasisSelector M-9` ⊙** (=L-M4/C-20 — the
ruled row). **`fr-ContourSettings M-10 / L-M6 / C-19 / D-m9`** is a **LEG CITED, HELD AT F.W3** (canonical
`F.W3`, file-criterion §5.d; leg `F.W5-W8`) — **this clause cites the leg, states the closed-set contract
term in F.W5's voice, and books no row on the id**, while the shared-enum obligation it names is genuinely
this wave's. **`fr-NotationPills FR-NP-30`** is CITED (booked at §A5). **The shared-enum contract is
F.W5's; the typed vocabulary at the leaf is F.W3/W4's.** ▲ **F.W4 rider: unknown statuses render VISIBLY,
never as healthy.** ▲ *Reciprocal minute, carried at BOTH ends*: `RULINGS-2` **R2-7.1** directed F-W8's
§6a to cite `fr-ContourSettings M-10`'s F-W5 clause home as *"the E13/A5 family"*; **that candidate home
does not hold at the bytes** and **`D12` is not a rival home either** — the census homes the row at `F.W3`
with an `F.W5-W8` leg. The departure is minuted here and at `F-W8.md` §0's opening item. `fr-BasisSelector
M-10` (the `basisFilter` normaliser at §D10's WAVE-LOCK) stays a **distinct identity**.

▲ **LOCK — the ruled sentence, at the record's own bytes** (⟨cmd⟩ base `$R`,
``/usr/bin/grep -n -F 'admit `[]` in the contract, or stop minting it' fr-BasisSelector.md`` → one hit):
***"admit `[]` in the contract, or stop minting it — the silent rewrite must not survive either way."***
The owner has chosen **stop minting**. ▲ The sort set is closed on **both** ends in the same act — reka's
`AcceptableValue` widening and `sort_map.get(sort, default)` **both fall back silently**, and a closed
domain with two silent fallbacks is an open domain with better manners. Same mechanism family as
**`GAB-16`**: *closed domain at the boundary, open domain in the collection*.

### D13 — Required-vs-optional posture, stated once

**RULE.** **Every field in a response model is declared required or optional ONCE, and the declaration is
the contract.** A field the producer may omit is optional at the model, or the model is a **precondition
the data does not have to meet** — and one non-conforming document then denies the whole collection.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/grep -n 'created_at\|last_seen_at' api/models/admin.py` → `:18` `created_at: datetime` and `:19` `last_seen_at: datetime` — **both
required, no default** — consumed through a bare inclusion projection and constructed in the handler body
under a global exception handler. **ONE user document missing either field 500s the ENTIRE admin list.**
The janitor cannot clear the condition either: its reap query **SKIPS fieldless docs**, so the offending
documents never age out.

**DISPOSITION.** Booked: **`FR-AUL-14`** (C-B4, rescoped under ruling 2). The act: `$ifNull` the
projection **or** default the model fields — and the **posture is stated once**, not per field. The
client's null guard **rides `FR-AUL-17`'s `timeAgo` repair (F.W3)** and is not this clause's. **Absent
defence is proven on BOTH sides**; **production INCIDENCE is UNPROVEN — that question alone rides live →
SS-13.** Home: the **fourier API row**.

▲ **LOCK.** **v2 states the posture; the probe answers whether it is violated.** This clause does not
claim the population contains such a document — it claims that **if one exists the list is denied**, which
is a property of the model and is true today at the bytes regardless of the data.

### D14 — Adoption is measurable — the ACCEPTANCE SURFACE

**RULE.** **A contract's adoption is measured at the surface that consumes it, and this contract names
that surface.** A converged-CRUD arm that exists and is not wired is **not adoption**; and a component
that reaches around its own store to call the API raw **strands the state the store maintains for exactly
that call**.

**WITNESS** (measured this seat, base `$F`). The workspace store's converged arm is dead surface: **TEN of
24 exported members have zero consumers outside the store** — `visualizationSlug`, `visualizationETag`,
`revision`, `loadVisualization`, `loadSnapshot`, `setVisibility`, `deleteVisualization`,
`invalidateInFlightComputation`, `defaultContourSettings`, `defaultAnimationSettings`. And the bypass
reproduces at the spec's own line: ⟨cmd⟩
`/usr/bin/grep -n 'api.deleteVisualization' web/src/stores/gallery.ts` → **`:168`**
`await api.deleteVisualization(slug, etag);` — inside `softDelete`, **calling the API directly** while
`stores/workspace.ts:395` `deleteVisualization()` exists and maintains `visualizationETag` for that very
purpose (`:399`).

**DISPOSITION.** Booked: **the joint identity of `BLK-1` / `BLK-2` / `VV-R2-A` / `VV-R2-E`** — read as
**ONE gap**, which changes the cure: **a single wiring unit at this component** (route →
`loadVisualization`; publish → `setVisibility`; delete → the store action), **not scattered repairs** —
and **it does not re-book its members**. **`VV-R2-B`** (MAJOR · NEW, the FRAME row; census verified 10/10)
rides as a **LEG held at F-W4**. **F.W4 executes the wiring; F.W5 owns the CRUD-CONTRACT §1 adoption as
the union tranche's own ACCEPTANCE SURFACE.**

▲ **LOCK — this is the row that tells this contract whether it was adopted at all. NO WAVE MAY CLAIM
ADOPTION WITHOUT IT.** A co-signature, a relay letter and a green gate table are evidence that the
document exists and was received. **Adoption is a different measurement**, and it is taken here.

### D15 — Query semantics under the shipped indexes

**RULE.** **A filter's semantics are declared, and they are declared against the indexes that actually
ship.** A surface that advertises prefix or substring matching over an **exact-match indexed field** is
mis-describing its own operation; and a cure that buys the advertised semantics by discarding the index
has converted an indexed equality into a collection scan.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '628,636p' api/routers/admin.py` →
`filter_doc["action"] = action` — **a bare equality** — beside an honest
`{"$regex": re.escape(target), "$options": "i"}` on target. The advertised example matches **zero rows
forever**: writers emit `set_tier:{tier}` (`:185`), so a placeholder reading `set_tier` can never hit.
⟨cmd⟩ `/usr/bin/grep -n 'admin_audit' api/services/database.py` → **exactly two indexes**, `:145`
`[("timestamp", -1)]` and `:146` `[("action", 1), ("timestamp", -1)]`. The `target` filter therefore drives
an **unindexed** case-insensitive regex plus a second full scan via `count_documents`; and the `entries`
sort orders the pipeline ⟨cmd⟩ `/usr/bin/sed -n '284,292p' api/routers/admin.py` →
`$match → $lookup → $addFields → $sort → $skip → $limit`, so **the cross-collection join runs over the
ENTIRE matched user set** on every debounced keystroke.

**DISPOSITION.** Booked: **`AA-6`** (L-4/C·D-2) · **`AA-23`** — **its HOST ROW is booked HERE,
explicitly**, on the `45 = 30+13+1+1` join its own routing names (*"the 45/30/13 join must carry this
constraint"*); **a leg is never a new identity**, so **F.W6 keeps only the killed-cure citation, marked as
a citation**. **`AA-32`** books; **`FR-AUL-59`** (LC-miss-M9) books. The two rows that cite `AA-23` carry
**no second booking**: `AA-6`'s cure set is *bound* by it and `AA-32` cites it for the two-index fact.
▲ **The regex-action cure BOTH axes prescribed is REJECTED (`AA-23`).** Sound cures, **in this stated
ORDER only**: **(a)** honest placeholder (*"action (exact…)"*), **(b)** `$in` over a generated taxonomy
(also cures `AA-5`/`AA-24`), **(c)** anchored case-**sensitive** `^prefix`. ▲ **`AA-32` positive, binding:
`re.escape` IS applied — there is no injection and v2 must not manufacture one** (bounded by the 90-day
janitor prune). `AA-21`'s placeholder co-sign rides `AA-6`. **`FR-AUL-59`**: pipeline reorder — join
**AFTER** `$limit`, as the sibling branch already does; **it composes with §B1's abort-key fix and neither
alone closes the window**. Home: the **fourier API row**.

▲ **AA-23 CURE LOCK, at the record's own bytes** (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'indexed equality into a' fr-AdminAuditLog.md` → `:60`): *"A case-insensitive
`$regex` … cannot use that index; shipping it converts an indexed equality into a collection scan on the
one monotonically growing collection."* and, its own next sentence, *"Binds AA-6's cure set."*
**F.W5's addition, stated as F.W5's**: **the lock PRECEDES any query-semantics clause this contract
writes**, which is why the ordered cure set above is part of the rule and not advice attached to it.
▲ And the composition trap is named: composed with `AA-1`, *"no matches"* and *"unreachable"* are
**pixel-identical** — an operator cannot distinguish a correct empty result from a broken filter.

### D16 — The shared action taxonomy

**RULE.** **The action vocabulary of an audit surface is SHARED between every writer and every reader, and
it is declared in one place.** A reader that switches on prefixes of a vocabulary it does not hold is
guessing; **a second writer that bypasses the logging helper is outside the vocabulary entirely.**

**WITNESS** (measured this seat, base `$F`). The collection has a **second writer** that inserts directly:
⟨cmd⟩ `/usr/bin/grep -n 'admin_audit' api/services/janitor.py` → `:92`
`await db.admin_audit.insert_one(` — **no `log_audit` call** — emitting **nine** `janitor:*` actions:
⟨cmd⟩ `/usr/bin/grep -o 'janitor:[a-z_]*' api/services/janitor.py | sort -u` →
`janitor:cascade_delete_flags` · `janitor:cascade_delete_sessions` ·
`janitor:cascade_soft_delete_visualizations` · `janitor:delete_expired_sessions` ·
`janitor:delete_stale_users` · `janitor:hard_delete_visualizations` · `janitor:prune_audit` ·
`janitor:prune_contours` · `janitor:prune_images` — **including the audit log pruning its own history**
(`:276`). The reader is blind to the whole namespace: ⟨cmd⟩
`/usr/bin/sed -n '67,81p' web/src/components/visualization/gallery/AdminAuditLog.vue` → `actionTone`
branches on `startsWith("delete")`, `=== "prune_empty_users"`, `startsWith("set_user_status")`,
`startsWith("set_tier")`, `startsWith("dismiss")`, `startsWith("batch")`, else **sky** — so every
`janitor:*` row lands on the **benign default**, and inside the map **`batch_users:delete`, the
vocabulary's most destructive operation, falls past `startsWith("delete")` into the same violet arm as
`batch_users:unsuspend`.**

**DISPOSITION.** Booked: **`AA-5`** (L-3). **`fr-AdminAuditLog AA-24` is CITED, NOT BOOKED** — the census
routes it **`F.W4` only**, so **the contract obligation is genuinely F.W5's while the ROW is F.W4's**;
**held at F-W4 §2.A**, and this clause claims none of it. The act: **a shared ACTION TAXONOMY at the
seam** (cross-tier, F.W5's), which also cures `AA-24` and feeds `AA-6`'s `$in` (§D15 cure (b)). **Display
arm → F.W4.** Home: the **fourier API row** for the taxonomy.

▲ **LOCK — S-8 METHOD LAW, adopted as a standing bar on this contract's own proofs (kills C·S-2/K-3 via
K-6): an absence-proof must ENUMERATE the surface, not query one name for it.** `grep "log_audit("` was
**structurally blind** to the inlined second writer. **v2's absence-proofs inherit this bar** — and §D3's
producer proof above was written to it deliberately: it enumerates every `db.flags` write rather than
asking whether one route exists.

### D17 — Date serialization — the SERIALIZER ARM ONLY

**RULE.** **One concept, one serialization, across every operation of one API.** A timestamp crosses the
wire in **one** form, and that form is **ECMA-parseable**.

**WITNESS** (measured this seat, base `$F`). **ONE router serializes the same concept TWO WAYS**: ⟨cmd⟩
`/usr/bin/grep -n 'default=str' api/routers/admin.py` → `:92`
`content=json.dumps(body, default=str),` — the flagged rows' path, producing Python's **space-separated,
non-ECMA** `str(datetime)` — while the audit path returns a model: `:652`
`return AuditListResponse(items=items, total=total, page=page, pages=pages)` (declared
`api/models/admin.py:101`), i.e. **ISO with `T`**. And the defensive asymmetry compounds it: the NaN guard
sits in the consumer that receives the **conformant** payload, while the consumer of the
**non-conformant** one has none.

**DISPOSITION.** **`FR-AFP-32`** rides as a **LEG held at F-W3** (D-16/L-13/C:D-15; ⊕ the `FR-AFP-40`
fold, ⊕ `FR-AFP-69` = β-miss-5). **`fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12`** folds here —
**the FULL banked spelling**, because the record's own routing is what splits the work: *"→ F.W3;
serializer → F.W5–W8; JSC → SS-13"*. ▲ **F.W5 owns ONLY the serializer arm.** The five-copy `timeAgo`
family's shared formatter is **F.W3's and already banked as `FR-AUL-17` — do NOT re-book it here**
(GalleryCard states the fold explicitly). **F-W8's §6a names the same id as an exclusion-with-reason
pointing here.** JSC acceptance of the non-ECMA form → **SS-13**. Home: the **fourier API row** for the
serializer.

▲ **LOCK.** The two forms are produced **in one file, by one router, for one concept**. That is the
signature of a serializer decision never made rather than of two teams disagreeing — and it is why the
cure is a **posture in the contract**, not a guard in each consumer.

---

## §E — Provenance, lineage and persistence (the union's core)

**The band's subject and its standing constraint.** §E is where the two repos' models of *the same thing*
are reconciled: what a version is, what a derived entity inherits, what a counter means and what a cache
is identical over. **No clause in this band may contradict ruling D9** — `docs/tranches/V/DECISIONS.md`
§2, row `D9`, quoted once here at its own bytes (⟨cmd⟩ base `$V`,
`/usr/bin/grep -n 'D9' docs/tranches/V/DECISIONS.md` → **one hit**, `:36`): *"Palette visibility is
`private | public`; owner lifecycle is `active | trashed`; admin moderation is separately clocked
`clear | withdrawn`. The unused `unlisted` state dies. Non-owner reads require active/public/
moderation-clear and a visible immutable release."*

### E1 — Compound per-entity version identity

**RULE.** **A version identifier is scoped to the entity whose version it is.** A content digest alone is
**not** a version identity: two entities with identical content are two histories, and a global digest
key collapses them into one. The contract mandates the **compound per-entity version `_id`** — the form
fourier already ships, `f"{viz_slug}:{set_hash}"`.

**WITNESS** (measured this seat, base `$V` — value-side, and the defect is value's).

- ⟨cmd⟩ `/usr/bin/sed -n '1,12p' api/src/modules/palette/hash.ts` → `computeContentHash(name, colors)`
  canonicalizes **`{name, colors}` only** — **never `paletteSlug`**. (The docstring's own words:
  *"Identical content always produces the same hash (Merkle property)."*)
- ⟨cmd⟩ `/usr/bin/sed -n '13,16p' api/src/modules/palette/repository/paletteVersion.ts` → `:13`
  `findByHash(hash: string, session?: ClientSession)` returning `this.col.findOne({ _id: hash }, …)` —
  **no slug scope**.
- ⟨cmd⟩ `/usr/bin/sed -n '39,50p' api/src/modules/palette/repository/paletteVersion.ts` →
  `insertIfAbsent` reads `{ _id: version._id }` and `:47` `if (existing) return version._id;` — **the
  early return**, whose own test asserts *"no second write"*.

**Consequence, stated as the contract consequence it is**: two palettes with identical `(name, colors)`
share **ONE** version row, whose `paletteSlug` names only the first — **and the second's history is
EMPTY**. The idempotency the early return implements is correct *for a content-addressed store* and wrong
*for a per-entity history*; the defect is the identity, not the guard.

**DISPOSITION.** Booked: **`V-β`** (lane-crud §V-β, ⊕ §7) — **value-side**. ▲ **Execution belongs to the
value.js API row and is NEVER re-booked as a fourier defect.** Value-side rows are citable now; fourier's
own form is the reference and needs no act. **The gate's green owner names the missing artefact
explicitly: a test asserting that two same-content palettes keep separate histories — none exists today**,
and the cure is not landed until it does.

▲ **LOCK.** fourier documents a §2.3-vs-§11 tension around this same key; **v2 adopts the compound form
and does not re-open that tension** — it is a *documentation* question on a side whose identity is already
correct.

### E2 — Chain depth: deepen or retire

**RULE.** **A lineage quadruple that cannot deepen is retired, or the operation that would deepen it is
specified.** A contract does not ship `parent`/`root`/`depth` fields that one writer sets to constants —
the fields then look like a capability, sort orders are written against them, and clients render histories
that cannot exist.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/grep -rn '_write_root_version' api/ --include='*.py'` → **three hits, and they are the whole
story**: `routers/visualizations.py:110` (the definition) · `:220` (create) · `:592` (remix) — **the ONLY
writer**, hard-coding `parent_hash=None, root_hash=set_hash_value, depth=0`. Every version therefore has
`depth == 0`, and `GET /{slug}/versions` **sorts by `depth` over an always-singleton set**. All real
lineage rides **cross-viz `fork_of`**, which is a different relation entirely.

**DISPOSITION.** Booked: **`F-α`** (lane-crud §F-α ⊕ intake X-8) — **fourier-side**. v2 states
**deepen-or-retire** for the depth/parent/root quadruple and this clause is that statement. ▲ **F.W5 owns
the CLAUSE; F.W6 owns the BURN-DOWN — do NOT double-book.** `X-8` corroborates three ways (Codex controls,
census C-6, fourier's own M.W10 booking) and **adds no new work**. Register row 13
(`GET …/{slug}/versions`) disposes `CLIENTABLE` **SEQUENCED BEHIND THIS CLAUSE** — clienting a provably
singleton history today ships a **dead affordance**, the same bar §D2 applies to the like verb.

▲ **LOCK.** *Retire* and *deepen* are both admissible answers and **silence is not**. The reason this is
a clause rather than a cleanup: the fields are on the wire, so whichever way it goes is an **envelope
change** both repos must co-sign.

### E3 ⊙ — Diff-clause participation — RULED: RE-SCOPE, and v1 §6 RE-AUTHORED ONE-SIDED

**RULE — RULED, COHESION §0j.D F-SS4REST R1: RE-SCOPE value.js OUT of the diff clause.** **value.js is not
a party to the diff clause of this contract.** `atomdiff.ts` is **wholly excised** from value.js and stays
excised; restoring it would be value-side authoring that couples value.js's release train to the fourier
contract (the §0i.1 logic). The diff envelope (v1 §§3.1–3.3, restated at §F) binds **fourier alone**.

**▲ v1 §6 IS RE-AUTHORED HERE, AND THE VERDICT IS EXPLICITLY ONE-SIDED.** v1 §6's close-gate clause binds
**each repo's probe to the document** and assumes **both probes exist**. One does not. The re-authored
clause, which supersedes v1 §6 for the diff envelope and for nothing else:

> **§6 (v2).** The diff envelope's conformance is asserted by **one probe, on the fourier side**, against
> §3/§4 of v1 as restated at §F. **value.js runs no diff probe and is not measured by one**; its absence
> is **the ruled scope of this contract**, not an outstanding obligation, not a deferral and not a gap in
> the census. A conformance report for this contract is **COMPLETE** with the fourier probe alone, and a
> report that marks the value.js diff probe *missing*, *pending* or *RED* is **mis-reading the scope** —
> the correct rendering is **N/A — RE-SCOPED (F-SS4REST R1)**. The casing rule (§A2.4) is unaffected and
> **each side still runs its own casing check**, because casing binds the whole envelope surface and not
> the diff route.

**WITNESS** (measured this seat, base `$V`). ⟨cmd⟩
`/usr/bin/grep -rn 'atomdiff\|atomDiff' api/src src` → **ONE hit**, and it is a comment naming the
excision: `api/src/modules/palette/__tests__/palettes-forks.test.ts:9` — *"atom-diff were excised at
T.W1 — TA-4 — so the remix/atomDiff wire cases are…"*. ⟨cmd⟩ `/bin/ls api/src/lib` →
*No such file or directory* (double-run). **v1 §2.5 mandates the exact file and v1 §6's close-gate assumes
BOTH probes exist**, so before this ruling **a co-signature over un-runnable probes would have been
VOID**.

**The charter law this clause discharges, quoted at its own bytes once** (⟨cmd⟩ base `$V`,
`/usr/bin/grep -n -F 'is a named prerequisite or the contract is' docs/tranches/X/COHESION.md` → one hit;
the source wraps mid-sentence and the wrap is disclosed rather than re-flowed): *"**SS-4 contract
co-signature → F.W5 ∥ X·V API row**: neither side's edits gate the other's / waves; the value-side
atomdiff restoration (TA-4) is a named prerequisite or the contract is / re-scoped explicitly."* (the `/`
marks the charter's own line breaks; no word is changed). **The charter offered exactly two exits and the
owner took the second. This clause is the explicit re-scoping the charter requires**, and the SS-4
co-signature is therefore **not** blocked on a TA-4 restoration.

**DISPOSITION.** Booked: **`TA-4`** (megatranche COHESION §2 / lane-crud §7 / the SS-4 prerequisite).
Homes: **the ruling is the owner's**, **the clause is F.W5's**, and **the value.js API row owes nothing on
this axis** — which is the substantive content of the re-scope. **F.W9/W10 owns the conformance probe** and
runs it one-sided.

▲ **LOCK.** A later wave may not "restore symmetry" by reviving `atomdiff.ts`, and may not record this
contract as **partially conformant** because one side has no diff probe. **One-sided is the verdict, not a
defect in the verdict.**

### E4 — Born visibility of the derived variant ‡ + the fork/remix vocabulary — RULED: REMIX + BORN-PRIVATE

**RULE — RULED, COHESION §0j.D F-SS4REST R8: REMIX + BORN-PRIVATE.** **The derived-entity verb is
`remix`**, and **a derived entity is BORN PRIVATE**, with an **explicit publish act** as the only path to
visibility. Vocabulary is settled in the same act: **remix** (not *fork*) for the derivation verb;
**version** (not *snapshot*) for the within-entity record. **Each side's test asserts the child's
visibility on create** — the rule is not adopted until both tests exist.

**▲ D9 NON-CONTRADICTION — VERIFIED AT THE RECORD BEFORE THIS CLAUSE WAS AUTHORED**, as the ruling
requires. The check, in full, so a later reader can re-run it rather than trust it: ⟨cmd⟩ base `$V`,
`/usr/bin/grep -n 'D9' docs/tranches/V/DECISIONS.md` → **one hit, `:36`**, whose bytes are quoted at this
band's head. Three tests, all passing:

1. **Domain membership.** D9's visibility domain is **`private | public`**. R8's *born-private* names
   **`private`** — **a member**. No new state is introduced.
2. **No revival of a dead state.** D9 rules *"The unused `unlisted` state dies."* R8 names `private` and
   an explicit publish act to `public`; **`unlisted` appears nowhere in the ruling or in this clause**.
3. **No lifecycle or moderation collision.** D9 clocks lifecycle (`active | trashed`) and moderation
   (`clear | withdrawn`) **separately** from visibility. R8 speaks only to visibility-at-birth and
   touches neither clock.

**Verdict: R8 and D9 do not contradict; R8 is a narrowing INSIDE D9's domain.** ⊘ And the one live
divergence is **disclosed, not resolved here**: the value.js model still persists **three** visibility
states — ⟨cmd⟩ base `$V`, `/usr/bin/sed -n '61p' api/src/modules/palette/model.ts` →
`` /** I.W1 canonical visibility (3-state): `public`/`unlisted`/`private`. */ `` — and the server-side
unpublish target on the fourier side is `unlisted` (register row 9). **That is the D9 reconciliation the
value.js API row owes** — *never a silent contract overwrite, and never a fourier defect*.

**WITNESS** (measured this seat). **Opposite privacy defaults on the same verb, both shipping**: a fourier
remix child is born **`draft`** (fourier's own state name, MEASURE-AT-OPEN at the re-grounded substrate),
while ⟨cmd⟩ base `$V`, `/usr/bin/sed -n '72,80p' api/src/modules/palette/service/forks.ts` → `:76`
`visibility: "public",` — **hard-coded** in the fork child's document. The value side therefore publishes
a derived entity **at the moment of derivation, without an act**. Register rows 7 · 8 · 9 (`remix`,
`publish`, `unpublish`) are all `CLIENTABLE` with **zero client function** — so the ruled shape is
**unreachable as a product today on the fourier side**, which is why R8's publish act and §D1's
`CLIENTABLE` disposition are one decision seen twice.

**DISPOSITION.** Booked: **`R-5`** (lane-crud) ⊕ **`GCM-1`** ⊕ **`fr-GalleryCard D-7 / C·I-2`** (the FULL
banked head) ⊕ **`X-2`**; **`BLK-1` FOLDS** (VisualizationView). ▲ **F.W5's share of `GCM-1` is the
CONTRACT FACT — *a save that should have been a remix carries no lineage* — NOT the routing repair**,
which is F.W4's (`BLK-1` folds; **§D14 owns the joint identity**). `fork_count` unrendered is **load-bearing
for the union**: it is the counter the derivation verb maintains, composing with lane-crud **`R-1`**
(`fork_count`↔`forkCount`) and **`X-2`** (*a stored counter cannot stay truthful under viewer filtering*).
Homes: **both API rows**, ⊕ **a create-visibility test each side**.

▲ **LOCK.** **Born-private without a publish verb is not privacy — it is an unreachable entity**, and
born-public without an act is not convenience — it is publication without consent. R8 rules the pair;
neither half ships alone.

### E5 — Create idempotency and dedupe — ONE clause, TWO entry points ‡

**RULE.** **A create operation is idempotent under a caller-supplied key, and the server deduplicates on
the identity that makes two creates "the same".** The client may not be the dedupe: a disabled button is
a rendering, and a second press is a second entity.

**WITNESS** (measured this seat, base `$F`) — a composed falsehood, measured limb by limb:

- **The publish gate reads a field with one writer, and that writer is a literal.** ⟨cmd⟩
  `/usr/bin/grep -rn 'savedSnapshots' web/src --include='*.ts' --include='*.vue'` → **four hits**:
  `stores/workspace.ts:102` `savedSnapshots: [],` (**the only writer, unconditional**),
  `lib/types.ts:90` (the declaration), and the two **readers** at
  `GalleryView.vue:78-79` (`!d.savedSnapshots?.length || !d.savedSnapshots.every(…)`). The guard is
  **invariantly true** and the row never leaves the tab.
- **The idempotency envelope exists and the create route declines it.** ⟨cmd⟩
  `/usr/bin/sed -n '63,70p' api/lib/crud/idempotency.py` → the wrapper's own docstring is explicit:
  *"No header → ``handler()``."* — so a create carrying no `Idempotency-Key` executes **every time**.
- **The dedupe index that would catch it is not unique.** ⟨cmd⟩
  `/usr/bin/grep -n 'create_index' api/services/database.py` → `:98`
  `await _db.visualizations.create_index("content_hash")` — **a PLAIN index** — against the deliberate
  contrast two collections over, `:140`
  `await _db.flags.create_index([("content_hash", 1), ("reporter_slug", 1)], unique=True)`.
  **The same digest is uniqueness-bearing for flags and not for entities.**

**Consequence**: the button re-enables and **the second press mints a SECOND public visualization**; at
the dock the same shape is re-entrant on all three hops — **N clicks ⇒ N public gallery rows**.

**DISPOSITION.** **`fr-GalleryDraftsSection B-2`** rides as a **LEG held at F-W3**; **`fr-CanvasControlsDock
D-4 / L-1 / C-3`** (the full banked head) rides as a **LEG held at F-W4**; **`FR-GV-1` FOLDS at banked
severity**; **`fr-EditorControlsDock C-7`** is the rider; **intake `X-3`** is consumed. **Split adopted**:
props/reconciliation → **F.W3/W4**; **server dedupe → this contract**. ▲ **K12 PROBE-SUPPRESSION LOCK:
both axes' UNPROVEN-NEEDS-LIVE hedges are DEAD — `fr-GalleryDraftsSection B-2` closes it STATICALLY
(no-header idempotency passthrough ⊕ the plain index); SS-13 spends NO probe here.** ▲ The record's own
F.W5 share, verbatim at record case (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'two-sided delta' fr-CanvasControlsDock.md` → `:45`): *"**F.W5–W8 rider**: the
server-side `(image_slug, contour_hash)` dedupe arm rides the R6-8 seam split (C-28 fold) — the client
cure and the operation cure register a two-sided delta until that join is split."* **F.W5's own binding:
the server arm SEQUENCES AFTER the join split (§B1).** The **`C-28` fold itself is homed at §B1** — cited
here, booked there; **one home, two citations**. Riders: the success toast prints the **USER** slug
(`m-13`); **`publishedHashes` is a misnomer** — it holds freshly minted visualization slugs, which can
never equal a draft's `imageSlug` — **fix the name with the contract**.

▲ **LOCK.** Three independent mechanisms each suffice to mint the duplicate: no header, no unique index,
no truthful client gate. **A cure that lands one of the three and reports the clause closed has measured
the mechanism it chose, not the outcome.**

### E6 — Unsafe GET and counter provenance

**RULE.** **A read is safe.** A counter is incremented by an **explicit verb**, not as a side effect of
the representation request — **or** this contract states the mutating-GET policy explicitly, against
**RFC 9110 §9.2.1**, and names every operation it covers. A response that reports a counter it has just
changed **reports the wrong value by construction**.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '256,275p' api/routers/visualizations.py` — the order is the defect and it is visible in eleven lines:
`find_one` resolves `doc`; `:268-270` `await db.visualizations.update_one({"slug": slug}, {"$inc": {"views": 1}, …})`; `:272` `body = _public_doc(doc)` — **serialising the PRE-increment
document**. The operation therefore **cannot observe its own side effect**. And the same verb is the
**ETag-capture path** (register row 8's publish flow, §4.2), so **every publish silently inflates its own
view counter** and an entity is **born at `views: 1` before any third party sees it**. There is **no
`viewed_ips` dedup** while `liked_ips` exists (§D2's seven projection exclusions), and the client-side
guard is component-local and resets on mount: ⟨cmd⟩ `/usr/bin/grep -rn 'viewedHashes' web/src` → `:46`
(`const viewedHashes = ref(new Set<string>())` in `GalleryView.vue`) ⊕ `:118-119`.

**DISPOSITION.** Booked: **`FR-GV-12`** (=MISS-LC-1) ⊕ **`FR-GV-24`**; **`VV-R2-A`** rides as a **LEG held
at F-W4**. The **F.W4 arm**: publish adopts `store.setVisibility("public")` (implemented, zero callers —
§D14), dropping one round trip **and the phantom view**. Rides **§D14's joint identity**. Observable
magnitude → **SS-13**. Home: the **fourier API row** ⊕ F.W4.

▲ **FR-GV-24 REPAIR-TEST LOCK — `viewedHashes` DOES work within a session; the defect is SCOPE, not
absence — so REPAIR TESTS MUST NOT ASSERT A RE-OPEN INCREMENT.** A test that opens the same entity twice
in one session and expects `views` to rise is asserting the **opposite** of the shipped intent and will
fail on correct code. ▲ **The store's own `recordView` comment documents GET-as-increment as the
DELIBERATE mechanism, so the publish-path GET is an ACCIDENTAL self-count: v2 must not codify the
accident.** The two facts are easy to fuse and must not be: **one increment is intended, the other is
collateral.**

### E7 — PATCH atom coverage and `set_hash` recompute

**RULE.** **A partial-update model covers exactly the fields that are user-settable after create, and
every field that participates in the version identity triggers a RECOMPUTE and a version write when it
changes.** A model that omits a settable atom is **too narrow**; a model that admits an identity-bearing
atom without recomputing is **too permissive**. Both are the same defect — *the update model and the
identity set were never reconciled*.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/sed -n '198,210p' api/models/visualization.py` → `class VisualizationUpdate(BaseModel)` carries
**five fields** — `visibility`, `title`, `description`, `tags`, `palette_slug` — under
`model_config = ConfigDict(extra="forbid")`, and the client's `VisualizationPatch` is the same five. So:
**`speed` — atom 4-of-5 of the version-identity set — is settable ONLY at create/remix** (too narrow),
while **`palette_slug` (atom 5) can be `$set` with NO `set_hash` recompute and NO version write** (too
permissive), going stale against `enumerate_atoms(doc)`.

**DISPOSITION.** Booked: **`F-β`** (lane-crud) ⊕ **`SS-C-1`'s WRITE leg**. Ruled **SPLIT (R2-LC wins)**:
**`SS-C-1`'s READ leg FOLDS to `GCM-1`/§E4 — do not re-book; the WRITE leg books new.** ▲ **Dissent
preserved**: the **C axis filed BLOCKER**; demoted at component altitude (no capability loss in the
control). Home: the **fourier API row** — **atom coverage and recompute stated once**, in one act.

▲ **LOCK.** **The SAME model is both TOO NARROW and TOO PERMISSIVE**, and the two halves must land
together: widening the model without the recompute makes the staleness reachable from one more field.

### E8 — AnimationSettings — the three-way reconciliation

**RULE.** **A persisted settings object has ONE declaration of each field, ONE default and ONE unit**, and
the unit is stated in the contract. A field that no consumer reads across the wire is **not part of the
persisted contract** and is either wired or retired.

**WITNESS** (measured this seat, base `$F`). **Half the persisted contract is WRITE-ONLY and THREE-WAY
DIVERGENT INCLUDING UNITS.** The wire declares the fields — ⟨cmd⟩
`/usr/bin/grep -n 'fps\|duration\|max_circles' web/src/lib/types.ts` → `:45` `fps: number;` · `:46`
`duration: number;` · `:47` `max_circles: number;` — while the renderer and the animation store hold
**their own** constants: ⟨cmd⟩ `/usr/bin/grep -rn 'ref(20000)\|ref(80)' web/src --include='*.vue' --include='*.ts'` → `stores/animation.ts:23` `const duration = ref(20000); // ms per full cycle` and
`components/visualization/BasisCanvas.vue:47` `const maxCircles = ref(80);`. **Only easing/speed/
active_bases round-trip**, so **a gallery replay cannot reproduce its own frame**; atom 4 is semantically
empty because `fps`/`max_circles`/`duration` have **zero cross-wire readers**; and the `duration` that
`speed` divides is declared with a **1000× unit fork** (seconds server-side, milliseconds client-side).

**DISPOSITION.** Booked: **`BC-9`/`C-6`/`D-20` ⊕ `SS-C-2`** — **deduped: `SS-C-2` and `BC-9` are ONE
identity**, with `SS-C-2`'s unconstrained-`speed` cell carried. AnimationControls' LC-miss **folds**.
▲ **`duration = ref(20000)` zero-writers stays banked at `fr-BasisCanvas BC-20` — NOT re-booked**, and the
other end confirms it: **`F-W3.md` §X.1-v4's `18`-vs-`19` SLACK block** records `BC-20` as **NOT
zero-homed**, names F-W5 among its holders, and settles the id **to F.W4** on the file criterion — **this
is a citation and F.W4 books.** ▲ AnimationControls' independently re-derived *"write-only
AnimationSettings"* is **CORROBORATION, not a new booking**. Home: **the union owns the reconciliation
INCLUDING the unit fork**, with server-side units stated in the contract.

▲ **LOCK.** The unit fork is the part that cannot be repaired by "picking the server's defaults": a client
that adopts `30.0` while reading it as milliseconds has made the divergence **invisible** instead of
visible. **The unit is a contract term.**

### E9 — One shape, one name

**RULE.** **One name denotes one shape across the seam.** Two types that share a name and a field name
while disagreeing on that field's structure are **not two implementations of one contract** — they are one
contract violated twice, and no probe can catch it because both sides type-check.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/grep -n 'partial_sums' api/models/visualization.py` → `:77`
`partial_sums: dict[str, Point2D] = Field(default_factory=dict)` with `:68`'s docstring explaining the
stringified-int keys — against ⟨cmd⟩ `/usr/bin/sed -n '14,20p' web/src/lib/types.ts` → `AnimationData`'s
`partial_sums: Record<string, Record<number, { x: number[]; y: number[] }>>`. **A `Point2D` per key on one
side; a nested record of coordinate arrays on the other.** The server docstring **names `BasisCanvas.vue`**
and prescribes typed access over a shape the client cannot use; the component's own comment misdescribes
even the client type; and entity `animation_data` is **written and read by nobody**.

**DISPOSITION.** Booked: **`fr-BasisCanvas C-7`** (record-qualified — `C-7` is a declared collider, five
sites across three records). Home: the **fourier API row** — **one shape, one name**, and **the server
docstring's prescription is either honoured or retracted**. A docstring that prescribes an access pattern
against a shape that does not exist is a **specification**, and this contract does not let one stand
unretracted.

▲ **LOCK — renaming one side is not the cure, and renaming the CLIENT side is the wrong half.** The
server's shape is the one the docstring prescribes and the one the persisted document holds; the client's
is the one the renderer consumes. **Whichever shape survives, the OTHER NAME GOES** — two names for two
shapes is admissible, one name for two shapes is not, and a repair that leaves both names in place while
"documenting the difference" has written the defect down instead of removing it.

### E10 — Produced-and-unconsumed: ONE disposition

**RULE.** **This contract states ONE disposition for produced-and-unconsumed response fields** — *retire*,
*retain-with-reason*, or *make optional and opt-in* — and every such field answers to it. **Three ad-hoc
deletions are not a disposition.** This is R6-8's converse: the server computes, nobody consumes.

**WITNESS** (measured this seat, base `$F`), three fields, one class:

- **`EpicycleData.trace`** — a per-response polyline: ⟨cmd⟩ `/usr/bin/sed -n '22,27p' web/src/lib/types.ts` → `:25` `trace: { x: number[]; y: number[] };`, produced at
  `api/services/computation.py:127`. ⟨cmd⟩ `/usr/bin/grep -rn '\.trace\b\|trace:' web/src --include='*.ts' --include='*.vue'` → **one hit, the declaration itself** — **zero readers** — and it
  rides `structuredClone` into every IndexedDB draft.
- **`reconstructed_points`** — ⟨cmd⟩ `/usr/bin/grep -rnw 'reconstructed_points' web/src api/ --include='*.ts' --include='*.py'` → produced at `api/routers/equations.py:114`/`:128`, declared at
  `web/src/lib/equation/types.ts:31`, **read by NOTHING** — and sessionStorage-persisted whole.
- **`SimplifyResponse.term_count`** — produced at `api/routers/equations.py:152`/`:155`/`:162`, declared
  at `web/src/lib/equation/types.ts:45`, **zero consumers**.

**DISPOSITION.** Booked: **`M-β4`** · **`fr-EquationView L·m-6`** (=C·D-14). **`FR-EMT-20`** is CITED
(at §F1). ▲ **`FR-EMT-20`'s *"registry-swept: 0 banked hits"* cell is CORRECTED by `fr-EquationView
L·m-6` — one identity, two witnesses**, and the correction is carried with the row. **Distinct from §B4's
liveness predicate**: §B4 is *declared on both sides, implemented on neither*; **this clause is
*implemented on one side, consumed on neither*** — the two are different gaps and different cures. Home:
the **fourier API row**.

▲ **LOCK — the disposition is ONE and it is stated before any field is touched.** Three separate
deletions, each justified on its own field's merits, is how a surface loses a field some consumer did
want; and `trace`'s cost is not the wire alone — it rides `structuredClone` into **every IndexedDB
draft**, so the field is paid for on every local write as well as on every response. **Whichever
disposition the contract takes, it is taken once and every field of this class answers to it.**

### E11 — Easing domain hoisted to the operation — RESOLVER ⊕ L/M-3 MERGED, BOTH IDS PRESERVED

**RULE.** **A closed vocabulary that indexes a catalog is declared on the OPERATION as a closed literal
type**, not as a bare `str` the leaf casts. Where the corridor is a string at both seam ends and the only
validation is a cast, the first unknown value is a **template-expression throw with no error boundary**.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/sed -n '100,110p' web/src/lib/easings.ts` → `:105`
`p = generateCurveSVGPath(ANIMATION_EASINGS[name].fn);` — **the tree's ONLY unguarded catalog index**,
reached from a template expression with **zero error boundaries**, over a corridor that is a bare `str`
at both ends. ⊘ *Measured at this seat rather than inherited, because the banked cell's arithmetic
("three siblings guard") does not reproduce as spelled at this token*: ⟨cmd⟩
`/usr/bin/grep -rn 'ANIMATION_EASINGS\[' web/src --include='*.ts' --include='*.vue'` → **exactly two
sites**, `stores/animation.ts:28`
`const fn = ANIMATION_EASINGS[easing.value]?.fn ?? ((x: number) => x);` — **guarded twice over**, optional
chain **and** fallback — and `lib/easings.ts:105`, **guarded not at all**. **One of two is unguarded, and
it is the one behind a template expression**; the intent holds at the true bytes and the count does not,
so the count is printed rather than repeated. **Five unguarded hops**, the fifth being a localStorage draft spread
over defaults. The failure mode is quiet: **a radio group with zero checked members over a silently-linear
animation.**

**DISPOSITION — the merge, recorded here as the clause's own provenance (G22's second item).**
**`RESOLVER` (D-10 · L-4 · C-D-4) ⊕ `L/M-3` (EasingPicker) are ONE identity, MERGED — and BOTH IDS ARE
PRESERVED.** The registry-integrity finding is that **EasingPicker booked its easing-domain server half as
"new" when `RESOLVER` already carried the cure**; the merge is the cure and **neither id is retired**
(anti-rename: banked ids are original for life; a merge that drops a limb is invisible to an id-keyed
difference in both directions). **F.W4 owns the one `?? linear` guard-parity line; F.W5 hoists the union
to the operation record as `Literal[…]` on `AnimationSettings.easing`.** The seed/normalization half
**FOLDS to banked AnimationControls `L-11`/`M-10` — not re-booked** (`fr-AnimationControls M-10`,
record-qualified: one of the four `M-10`s this programme manages). ▲ **`L/M-3` KILLS `C/i-1`**: the field
**IS** persisted and remixed (`animation_settings` on **all four** models — ⟨cmd⟩
`/usr/bin/grep -n 'animation_settings' api/models/visualization.py` → `:129` · `:189` · `:244` · `:283`,
seat-verified) — **the kill rides with the row.**

▲ **LOCK.** The guard-parity line at F.W4 and the `Literal` at F.W5 are **not alternatives**. The guard
stops the throw; **only the closed type stops the value from being minted**, and a wave that lands the
guard and reports the clause closed has made the defect silent rather than absent.

### E12 — Debounced mirror vs synchronous save

**RULE.** **Where a debounced mirror and a synchronous save read the same state, the save FLUSHES the
mirror first.** Persistence semantics are part of this contract because the window is invisible from both
ends: the writer believes it wrote and the reader believes it read.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/grep -rn 'watchDebounced' web/src --include='*.vue' --include='*.ts'` → **eight component sites**,
including `ContourSettings.vue:140` and `EquationPanel.vue:61`. The picker's write reaches persistence
through a **500 ms `watchDebounced` with no flush-on-save**, while `saveVisualization()` reads
`toRaw(animationSettings.value)` **synchronously** — so **select-then-save inside the window persists the
PREVIOUS curve**.

**DISPOSITION.** Booked: **`MISSED-E`** (the EasingPicker save-race). The flush seam is the banked
`L-12`/`C-25` **`setEasing` action** — the cure is *an action that both writes and flushes*, not a longer
debounce. Home: **F.W3/W4** for the action; **the persistence semantics are this contract's**.

▲ **LOCK — the narrow reachability is HONESTLY STATED and the honesty CARRIES**: this particular race is
narrow, and **a debounced mirror is a contract hazard wherever a synchronous save reads the same state**.
The clause is written at the class, not at the instance, precisely because the instance is small.

### E13 — Cache identity ⊇ consumed fields ‡

**RULE — the clause, verbatim at record case, stated ONCE in this contract and inherited downstream by
this clause id** (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F "an operation's cache identity must be a superset of the request fields the operation consumes" fr-ContourSettings.md` → `:43`, double-run):

> ***an operation's cache identity must be a superset of the request fields the operation consumes***

This is **the R6-8 seam made product-visible**. Any wave transcribing this sentence takes **the record's
case**, and **no other clause, gate cell or sibling in this programme restates it** — they cite `E13`.

**WITNESS** (measured this seat, base `$F`). The key is a **closed `json.dumps` literal** and the omission
is exact: ⟨cmd⟩ `/usr/bin/sed -n '248,266p' api/services/image_storage.py` → `extraction_cache_key`
folds `_v` · `image_sha256` · `strategy` · `resize` · `blur_sigma` · `n_classes` · `min_contour_length` ·
`min_contour_area` · `max_contours` · `smooth_contours` · `n_points` — and **OMITS `ml_threshold` and
`ml_detail_threshold`**, which exist on the very settings object it is handed: ⟨cmd⟩
`/usr/bin/grep -n 'ml_threshold\|ml_detail_threshold' api/models/shared.py` → `:19` `ml_threshold: float = 0.5` · `:20` `ml_detail_threshold: float = 0.3`, consumed at `:59-60`. The ML Threshold slider is the
**sole producer** of those two fields (⟨cmd⟩
`/usr/bin/grep -n 'ml_threshold' web/src/components/visualization/ContourSettings.vue` → `:39` · `:67` ·
`:76` · `:121`), and the handler **short-circuits on the cache hit BEFORE compute**: ⟨cmd⟩
`/usr/bin/sed -n '219,221p' api/routers/images.py` → `cache_key = extraction_cache_key(asset.sha256, cs)`
then `existing = await db.contours.find_one({"extraction_cache_key": cache_key})`. **The user drags
0.50→0.85, waits out the debounce, and receives the 0.50 contour with no signal.**

**DISPOSITION.** Booked: **`fr-ContourSettings B-4`** (= C-1 ∘ C-25 / R6-8) ⊕ **`i-7`** — **`i-7` FOLDS,
it is B-4's payload and not a second row** (and `i-7` is a declared collider: `fr-ContourSettings`'s here
vs `fr-CollapsibleSection`'s NWO→SS-3). The **`m-18` limb** rides as a **LEG held at F-W3** — its invented
`ml_detail_threshold = mlThreshold * 0.6` coupling rides here as the contract fact. **F.W3/W4 owns the
regression fixture**: assert **`contour_hash` INSTABILITY across an ML-threshold change** (also the SS-13
probe). Home: the **fourier API row**.

▲ **LOCK.** The cure is the **key**, not the control. Re-enabling, re-labelling or debouncing the slider
differently leaves the operation returning a cached result for an input it never hashed — and **a cache
that is not a function of its inputs is not a cache, it is a stale read with a fast path.**

### E14 — Contour provenance — an editor-saved contour is FIRST CLASS ‡

**RULE.** **A hand-edited artifact is a first-class input to the operation that consumes it**, and an
automated pipeline **may not silently overwrite a human-authored asset**. Concretely: an editor-saved
contour carries the provenance the compute path keys on, or the compute path recognises `source="editor"`
and declines to substitute its own extraction.

**WITNESS** (measured this seat, base `$F`). **The hand-edit pipeline DESTROYS THE EDIT ON EXIT**, and the
mechanism is two lines: ⟨cmd⟩ `/usr/bin/grep -rn 'source="editor"' api/ --include='*.py'` → **one hit**,
`api/routers/contours.py:25`
`doc = await store_contour_asset(xs, ys, req.image_slug, source="editor")` — **no
`extraction_cache_key_value`**, although the parameter exists on the callee
(`api/services/image_storage.py:291`). So the saved contour is **invisible to the extraction cache**;
nothing recomputes from `store.contour`; **merely LEAVING the editor** remounts ContourSettings, whose
immediate watcher auto-runs `runCompute` → `extractContour`, and the server **cache-hits the ORIGINAL**
extraction. The second trigger is a Harmonics/Sample-Points nudge from the sibling panel doing the same
thing.

**DISPOSITION.** Booked: **`fr-ContourSettings M-13` ⊕ `fr-BasisSelector M-14`** — ▲ **NOT
`fr-CoefficientsSpectrum M-13`, which is the A5 homonym** (U-12 qualification; the two `M-13`s are
different records' rows and only the qualified form is an identity). The banked routing, at the record's
own bytes (⟨cmd⟩ base `$R`, `/usr/bin/grep -n -F 'two triggers, ONE cure' fr-ContourSettings.md` → `:70`):
*"Sibling row: fr-BasisSelector M-14 (the settings-nudge trigger) — same provenance seam, two triggers,
ONE cure."* — **the record's own words are "two triggers, ONE cure"**, and this clause is that one cure.
**F-W8 cites this clause at its §6a residue as an exclusion-with-reason and books nothing.** `M-14`'s
end-to-end arm is **UNPROVEN-NEEDS-LIVE → SS-13**; ▲ **the mechanism is SOURCE-CERTAIN** — the two lines
above are the whole proof and need no probe. Home: the **fourier API row**.

▲ **LOCK.** The user touches **no setting** and loses the work. That is why the cure is the **provenance
key**, not a confirmation dialog: there is no user act to confirm.

### E15 — ONE transport clause

**RULE.** **Every URL this application fetches goes through the client core, or the exception is STATED
in this contract with its reason.** The core is what carries the session token, the abort registry, the
429 posture (§C4), the ApiProblem decoding and the ETag round-trip; **a URL built outside it has none of
them, and the absence is invisible at the call site** because a string concatenation always type-checks.

**WITNESS** (measured this seat, base `$F`). The three URL builders are exactly that — builders, not
fetchers: ⟨cmd⟩ `/usr/bin/sed -n '288,299p' web/src/lib/api.ts` → `:288` `imageUrl` · `:292`
`thumbnailUrl` · `:296` `overlayUrl`, each returning a **template-literal string** off `BASE`
(`overlayUrl` additionally concatenating `?resize=${resize}`). `thumbnailUrl` goes **straight into
`<img src>`** — **no session token, no abort registry, no 429 retry, no ApiProblem, no ETag** — and
`overlayUrl`'s raw concat yields `/api/api/...` under the Dockerfile default while compose passes empty.
The overlay is additionally **fetched unconditionally then refused when `image_bounds` is null**, with a
second correctly-sized fetch following: **the first is waste**.

**DISPOSITION.** Booked: **`fr-BasisCanvas C-17` ⊕ `fr-BasisCanvas C-18`** (transport) · **row 26
`C:C-12`'s transport half** (ImageUpload — its **security half is §C2's**, and `C:C-12` is a declared
collider, so the record qualification is load-bearing). These are the register's **§5 template-bound
edges** (`thumbnailUrl` 3 consuming sites · `overlayUrl` 3 · `imageUrl` 0) — the F-6 blindness §D1 locks,
seen from the transport side. Home: the **fourier API row**.

▲ **LOCK — the race discipline is a recorded superlative (S-6): do NOT cure the waste by removing the
guard.** The unconditional-then-refuse sequence is wasteful **and** the guard is what keeps a null-bounds
overlay from rendering wrong. The cure is **ordering** (know the bounds before fetching), not deletion.

### E16 ⊙ — Trie disposition — RULED: NO TRIE

**RULE — RULED, COHESION §0j.D F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1): NO TRIE.** **Whole-snapshot duplication
is the recorded shipped behaviour and this contract carries it forward.** No trie, no prefix tree, no
radix or patricia structure, no structural sharing and no delta compression is introduced by this
contract. **F.W7 unit `b` never opens**, `design/R4-variant-storage.md` is never created, and **G-F7-5
closes vacuously**; F.W7 unit `a`'s census still runs.

**WITNESS** (measured this seat, both trees, **token-bounded**). ⟨cmd⟩
`/usr/bin/grep -rniwE 'trie|prefix.?tree|radix|patricia' $F/api $F/web/src $V/api/src $V/src | wc -l` →
**0** (double-run) — **zero true hits on BOTH trees**: there is no material on either side to preserve,
extend or migrate. ⊘ **Instrument disclosure, because the digit is only as good as the probe, and it
reconciles exactly.** The unbounded `-i` ERE the gate spells returns, at this seat,
⟨cmd⟩ `/usr/bin/grep -rniE 'trie|prefix.?tree|radix|patricia|structural.?sharing|delta.?compress' $F/api $F/web/src $V/api/src $V/src | wc -l` → **160** (double-run), which decomposes without remainder:
**150 source lines ⊕ 10 `Binary file …__pycache__….pyc matches` lines** (⟨cmd⟩ the same probe piped to
`/usr/bin/grep -c '^Binary file'` → **10**, and `-vc` → **150**). **The wave record's baseline figure of
150 is the source-line arm of this same reading**, taken before the `.pyc` set existed at this clock —
the two agree once the artefact is named, which is the only way a count and a figure can be said to agree.
Every one of the token occurrences is a substring artefact: ⟨cmd⟩ the same probe with `-o`, minus the
binary lines, `| sort | uniq -c` → `147 trie · 10 TRIE · 2 Trie`, **all inside `entries`, `Tries`,
`retries` and `retrieval`**. A bare-substring probe on this corpus manufactures a hundred and sixty
phantom hits for a token that occurs nowhere; the bounded form is what this clause stands on, and its
**∅ is admissible only because the same instrument returns non-∅ on tokens that are present** (§0.6's
discipline).

**The incumbent constraint, quoted at its own bytes with its wrap disclosed** (⟨cmd⟩ base `$V`,
`/usr/bin/grep -n -F 'flat BAG' docs/tranches/V/megatranche/formation/fourier/lane-crud.md` → **one hit,
`:240`, and that line ENDS mid-sentence**): `:240` *"`atomdiff.py:12-14`: "the atoms are a flat BAG (not a
tree / Merkle / document); the diff is a"* ⟶ continuing on `:241` *"whole-atom replace …; there is no
three-way / DAG / merge.""* — the break falls after *"the diff is a"*, no word is changed, and the inner
`…` is the source's own elision, carried and never widened. The guardrail is **live in the fourier tree**:
⟨cmd⟩ base `$F`, `/usr/bin/sed -n '12,14p' api/lib/crud/atomdiff.py` → *"the atoms are a flat BAG (not a
tree / Merkle / document); the diff is a whole-atom replace …; there is no three-way / DAG / merge."*

⊘ **BILATERALITY CORRECTED, and the correction NARROWS the premise without voiding the ruling.**
lane-crud's *"both sides carry"* spelling rests on a docstring citing a file value.js no longer has:
⟨cmd⟩ base `$V`, `/usr/bin/grep -rniE 'merkle|flat bag|not a tree|structural.?sharing' api/src src` →
**exactly ONE hit, and it asserts the opposite word** — `api/src/modules/palette/hash.ts:6`
*"Identical content always produces the same hash (Merkle property)."* — and ⟨cmd⟩ `/bin/ls api/src/lib` →
*No such file or directory*, the TA-4 excision §E3 rules on. **One live guardrail plus a deleted twin is
still an incumbent constraint**, and the ruling rests on the corpus fact the bounded probe measures plus
the live guardrail, not on the bilaterality claim.

**DISPOSITION.** Booked: **`R-4`** (lane-crud §R-4 ⊕ COHESION SS-4). ▲ **DISSENT RECORDED, NOT RESOLVED**:
the trie/structural-sharing requirement **collides with the standing anti-tree KISS guardrail**; the
guardrail is the **incumbent**; the dissent is banked at **`F-W10.md` §2.3, the `SS-4-PREREQ` row**, and
its bytes are quoted **ONCE** in this programme, at F-W5 §4's `F.W5 → F.W7` edge row — **this clause
quotes nothing and states the substance in its own voice**. The ruling **preceded design**, which is the
order SS-4 requires.

▲ **LOCK.** *No trie* is a **ruled disposition, not an unimplemented requirement.** A later wave may not
record this clause as deferred work, and may not introduce structural sharing as an optimisation under a
different name — **delta compression and structural sharing are named in the ruling's own probe**, and
reintroducing either re-opens G7.

### E17 — Image bounds on write ‡

**RULE.** **A write derives and persists the geometric context its own reads require**, or the contract
names the backfill path and the operation that runs it. A field that is written `None` by the only writer
and read by every consumer is **not optional — it is absent**.

**WITNESS** (measured this seat, base `$F`). The POST **never derives bounds**: `api/routers/contours.py:25` calls `store_contour_asset(xs, ys, req.image_slug, source="editor")` —
**no `image_bounds` argument** — against the signature ⟨cmd⟩
`/usr/bin/sed -n '285,292p' api/services/image_storage.py` →
`image_bounds: dict[str, Any] | None = None,`, **written verbatim**. Backfill is **GET-only**. So
`imageOverlayRect` goes null and the `<image>` `v-if` drops. ⊘ And the content-addressed store turns the
failure inside out: **a no-op save re-hits the extraction doc WITH bounds**, which means **the overlay dies
exactly when the points CHANGED** — the one case where the user has done real work. (⟨cmd⟩
`/usr/bin/grep -rn 'image_bounds' api/ --include='*.py' | wc -l` → **29** sites, i.e. the field is
pervasively *read*.)

**DISPOSITION.** Booked: **`fr-ContourEditorCanvas C-2`** — ▲ **record-qualified: NOT
`fr-GallerySearchBar C-2` (§D10's WAVE-LOCK alias) and NOT `fr-FourierShapeExtractor C-2` (§G2c)**; three
records, one token, U-12 qualification at every site. The act — **derive bounds on POST or backfill on
write** — is **ruled at the fourier API row**, and this clause states the contract term it must satisfy.

▲ **LOCK — the tree's own workaround comment sits on the LOAD path; do NOT mistake it for a cure.** A
load-side accommodation for missing bounds is what has kept the defect invisible; removing it without
deriving on write turns a silent drop into a visible one and fixes nothing.

### E18 — Attribution — the actor is a FIELD

**RULE.** **An audit row's ACTOR is a field of its own**, never a repurposed transport or privacy field;
and **attribution is required on both sides of the union or the asymmetry is stated**. A system actor is a
value of the actor field, not a sentinel smuggled through a hash column.

**WITNESS** (measured this seat).

- **The log never answers WHO.** ⟨cmd⟩ base `$F`,
  `/usr/bin/grep -n '_JANITOR_ACTOR' api/services/janitor.py` → `:56`
  `_JANITOR_ACTOR = "system:janitor"` and `:95` `"ip_hash": _JANITOR_ACTOR,` — **the actor is written
  into `ip_hash`** — and it is rendered by an unconditional truncation: ⟨cmd⟩
  `/usr/bin/grep -n 'slice(0, 10)' web/src/components/visualization/gallery/AdminAuditLog.vue` → `:146`
  `{{ entry.ip_hash.slice(0, 10) }}`, i.e. **`system:jan`** on screen. The producer's own comment
  **convicts the mechanism by its own rationale** — ⟨cmd⟩
  `/usr/bin/grep -n 'self-documenting' api/services/janitor.py` → **`:54`**, and the sentence **wraps**,
  so both lines are named rather than re-flowed: `:54` *"# loosening the admin-action contract to
  ``str | None``. It is self-documenting"* ⟶ `:55` *"# in the viewer and trivially filterable."* The
  comment block is `:50-55` and `_JANITOR_ACTOR` is the line after it.
- **The attribution asymmetry.** fourier declares ⟨cmd⟩
  `/usr/bin/grep -n 'owner_slug' api/models/visualization.py` → `:119` `owner_slug: str  # required,
  non-null (CRUD-CONTRACT §3)`, while value.js declares ⟨cmd⟩ base `$V`,
  `/usr/bin/grep -n 'userSlug: string | null' api/src/modules/palette/model.ts` → `:60`
  `userSlug: string | null;`. The value side's `if (userSlug)` guard means **an unattributable edit
  writes NO version row (V-γ)** — the history simply has a hole where the anonymous act was.

**DISPOSITION.** Booked: **lane-crud `R-7`** (record-qualified: `lane-crud §R-7`, **not** `GCM-3 R-7` at
§E6's repair-test lock, **not** `fr-GalleryInfiniteGrid R-7` booked at §D10 — **three identities, one
token**) ⊕ **`V-γ`**. **`AA-10`** (D-M2/L-13) rides as a **LEG held at F-W4**; the **display cure**
(sentinel-aware branch ⊕ legend) is F.W4's. Homes: the **actor field** is the fourier API row's; **V-γ's
hole** is the value.js API row's. **The asymmetry is stated once, here.**

▲ **LOCK.** A sentinel in `ip_hash` is *legible to the person who wrote it* and to nobody else. The cure
is the **field**; a viewer branch that special-cases the sentinel makes the display honest and leaves the
column lying.

### E19 — Vocabulary the contract inherits — the NOUN and POSITIONAL arm only

**RULE.** **One affordance, one noun, across the wire and the code.** This contract fixes the nouns it
inherits — **remix, not fork** (§E4); **version, not snapshot** — and **a retired noun does not remain on
the wire as a compatibility spelling**. A positional parameter kept only so a call site need not change is
**not an interface; it is a deferred edit**.

**WITNESS** (measured this seat, base `$F`). The retired noun survives as an alias with its own honest
comment: ⟨cmd⟩ `/usr/bin/grep -rn 'loadSnapshot\|_imageSlug' web/src --include='*.ts' --include='*.vue'` →
`stores/workspace.ts:237` `async function loadSnapshot(_imageSlug: string, vizSlug: string)` with `:448`
*"`loadSnapshot` is a compatibility alias over `loadVisualization`"*, exported at `:451`; and
`stores/gallery.ts:219` `async function publish(slug: string, _imageSlug?: string)` — **a dead positional
with exactly one caller**. Three names stand for one affordance across this cluster.

**DISPOSITION.** Booked: **`D-14` / `MIN-4` / `MIN-5` / `MIN-10` / `MIN-11`** (the VisualizationView
cluster) — ▲ **the NOUN and POSITIONAL arm is F.W5's; the REST is F.W4's.** v2 fixes the nouns it inherits
(remix vs fork; snapshot vs version — lane-crud §6), and **`loadSnapshot` is itself one of §D14's ten
zero-consumer members**, so the alias and the dead surface retire in one act.

▲ **LOCK — a compatibility alias with one caller is not compatibility.** The comment at
`workspace.ts:448` is honest about what the alias is for, and that honesty is exactly what makes it
retirable: **the call site the alias was kept for is the call site the rename would have edited.** The
dead positional `_imageSlug` goes with it — a leading underscore declares the parameter unused, which is
the compiler being told the truth about an interface the contract is still carrying.

### E20 — The exposed-ref seam — the one non-wire contract row

**RULE.** **A cross-component channel is READ-ONLY unless the contract says otherwise, and `defineExpose`
is a channel.** A `ref` handed across a component boundary is a **read-write** corridor — Vue's
`proxyRefs` set-trap makes assignment through it silent and legal — so a component that exposes mutable
state is publishing a write API whether or not it meant to. **This is the one row in this contract that is
not about the wire**, and it is here because it is the same defect class: *an interface whose mutability
is undeclared*.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/sed -n '217,227p' web/src/components/visualization/ContourEditorCanvas.vue` → the expose block
lists `getPoints,` (`:224`) and then **`points,` (`:225`) and `magnetRadius,` (`:226`)** — i.e. **the
accessor and the raw ref it accesses are exposed on ADJACENT LINES**, and `points` is the **undo ring's
subject**. ⊘ *The banked cell says `getPoints()` is exposed "two lines earlier"; at the true bytes it is
**one** line before `points` and two before `magnetRadius`. The distance is not the finding — the
**co-exposure** is — and the measured spelling is printed so the sentence survives a re-read.* The consumer takes it as a prop across a `v-if` boundary (`ContourPreview.vue:7`
`points: Point2D[] | undefined;`), and **the tree ALREADY writes through the channel one key over** —
`magnetRadius` via the computed setter (`ContourEditorCanvas.vue:38`, bound through
`EditorControlsDock.vue:31`/`:43`).

**DISPOSITION.** Booked at the record's own ADJUDICATED cell, verbatim at record case (⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'a TWO-member change' fr-ContourPreview.md` → `:46`): ***"ADJUDICATED → **F.W5**
(readonly/`getPoints` seam; a TWO-member change — `points` AND `magnetRadius`)"***. **Owned here because
the record routed it here.** ▲ **Row 11's one-character `?:` fix pairs at F.W4 "per the L-lane carry" —
F.W4 must NOT land row 11 presuming row 13's seam shape**, because the seam's shape is what this clause
decides.

▲ **LOCK.** It is a **TWO-member change**. Making `points` readonly and leaving `magnetRadius` exposed
leaves the tree's one demonstrated write path open — and that path is the proof the channel is
**exercised**, not merely exposable.

---

## §F — The equation contract and the error envelope

### §F.0 Bases, measure-at-open, and what v1 §3 hands this band

Every ⟨cmd⟩ in §F, §G and the obligation list was run **at this seat, 2026-09-17**, from the bases §0.3
assigns (`$F` = the fourier tree, **READ-ONLY, always**; `$V` = the value.js tree; `$R` =
`docs/tranches/V/megatranche/registry/adjudicated`, from the value.js repo root), each named at its
site. Engine: **`/usr/bin/grep` (BSD)** wherever the result is an engine fact. Every published figure was
**double-run against the settled bytes** (`run1 ≡ run2`) before this file was committed. **No figure in
this band is inherited**: the wave spec is the operand, the bytes are the witness, and where a spec
spelling did not reproduce the true bytes are printed and the divergence is named (§F.0's two entries
below, and §G5c's).

**v1 §3.1–§3.3, discharged here** (§0.2's cell names this band). The canonical shapes of v1 — the
`/diff` response body, the `AtomOp` structure, the from/to identifiers — are **IN FORCE, unamended**;
§F restates them in exactly two respects and adds nothing to them:

1. **The diff envelope is one-sided, by ruling.** Under §E3 (owner ruling R1, `§0j.D` F-SS4REST) value.js
   is re-scoped out of the diff clause, so v1 §3's shapes bind the **fourier** end of this contract and
   the casing rule of §A2.4 applies to them there. v1's *layer* split (§A2: envelope identical, atom
   VALUE repo-local) is the governing distinction and is untouched by this band.
2. **v1 spoke an envelope for the HAPPY path and never spoke one for the error path.** That gap is this
   band's subject at **§F5**: an API whose success shapes are pinned to the byte and whose failure shape
   is whatever the framework happens to emit has not settled its envelope — it has settled half of it.

**Two spec spellings did not reproduce as spelled; both mechanisms reproduced exactly.** The spec is
IMMUTABLE (E-3), so nothing there is edited — the corrections live here and in the execution record:

- **§F3's *"a seven-keyword denylist"*** reproduces to the digit, but not where the spec's sentence puts
  it: the denylist is in the **library**, not the API — ⟨cmd⟩ base `$F`,
  `/usr/bin/sed -n '79,82p' src/fourier_analysis/symbolic/parsing.py` → `for forbidden in ("import",
  "__", "eval", "exec", "compile", "open", "system"):` — **seven**, at `:80`, inside
  `parse_expression`, which `api/routers/equations.py:42` imports. The distinction is load-bearing: the
  only string-hardening on the free-text field lives in a package the API merely calls, so a contract
  term written against `api/` alone would not reach it.
- **§F7's *"the `latex`/`latex_sigma` arrive unconsumed"*** is true **of `ConvergencePlot`**, which is
  the clause's subject, and false of the view as a whole (`EquationView.vue:114-115` consumes both into
  `displayLatex`/`displayLatexSigma`). The clause is written against the component that renders the
  tooltip, and says so.

### F1 — Partial projection of a notation-dependent render ‡

**RULE.** **Where one response field is a projection of a request parameter, every field that parameter
governs travels on the same response, on BOTH models** — or the operation declares the un-refreshed field
**stale/unavailable** in its own contract. **A partial projection is forbidden**: two renders of one
state, of which one refreshes and the other does not, is a divergence the client cannot detect and the
user reads as a working control.

**WITNESS** (measured this seat, base `$F`).

- **The field is missing on one model of the pair.** ⟨cmd⟩
  `/usr/bin/sed -n '26,47p' api/models/equations.py` → `ComputeEquationResponse` carries **`latex`**
  (`:29`) **and `latex_sigma`** (`:30` — *"sigma-notation form with approximate c_n"*), while
  `SimplifyResponse` (`:44-47`) carries **`{latex, energy_captured, term_count}`** and **no sigma arm**;
  the client twin agrees — ⟨cmd⟩ `/usr/bin/grep -n 'SimplifyResponse' web/src/lib/equation/types.ts` →
  `:42`.
- **The server itself proves sigma is notation-dependent.** ⟨cmd⟩
  `/usr/bin/grep -n 'render_latex_sigma' api/routers/equations.py` → `:96`
  `latex_sigma = render_latex_sigma(terms, req.notation)`, dispatching on notation through
  `src/fourier_analysis/symbolic/latex_rendering.py:269` `_SIGMA = {...}`.
- **A notation flip routes ONLY to the operation that cannot refresh it.** `EquationView.vue:177-180`
  debounce-watches `[notation, budget]` into `doSimplify()` (`:177` the source, `:178` the callback),
  which writes `displayLatex` (`:138`) and
  **never `displayLatexSigma`** — whose only writers are `:39` (cache init) and `:114` (doCompute).
  `activeLatex` (`:49-51`) prefers `displayLatexSigma` whenever `eqMode === "sigma"` — **the default**,
  `:43` — **and the ref is truthy**, so a stale-but-truthy sigma wins.
- **The retry is suppressed by the same call.** `:140` `lastDisplayKey = key;` against the early return
  `:133` `if (key === lastDisplayKey) return;`.
- **The control looks alive.** `:139` `displayEnergy.value = resp.energy_captured;` — the energy badge
  moves on every flip while the equation does not.
- **It survives a reload.** `:141` `saveCachedResult(...)` into sessionStorage (⟨cmd⟩
  `/usr/bin/grep -n 'sessionStorage' web/src/components/equation/composables/useEquationCache.ts` →
  `:27` `:33` `:38` `:48`), and `:39` re-seeds `displayLatexSigma` from the cached result on the next
  mount.
- **The leaf cannot be told.** ⟨cmd⟩ `/usr/bin/sed -n '8,10p'
  web/src/components/equation/EquationResult.vue` → three lines, `const props = defineProps<{` ⟶
  `latex: string;` ⟶ `}>();` (the wrap is the source's, disclosed rather than re-flowed): **the leaf's
  entire input is one string** — no `disabled`, no `available`, no `stale` member exists to receive the
  fact.

**DISPOSITION.** Booked: **`fr-EquationView B-1`** (record-qualified; L·B-1 = C·D-05) **⊕ `FR-EMT-1`**,
rider **R1-missed-4**. The act — **`latex_sigma` joins `SimplifyResponse` on BOTH models**, a **contract
decision, not a patch**, or an explicit invalidation path — is the **fourier API row's**; this clause
states the contract term it must satisfy and **claims none of the work** (§0.4; FR-GIG-5's bar).

▲ **CURE BOUND — a COMPOSITE, quoted as two sentences at two coordinates** (R2-1-LAW.4; the two are
*not* fused under one attribution). (i) The bound, at the B-1 row's own disposition cell — ⟨cmd⟩ base
`$R`, `/usr/bin/grep -n -F 'walks into the under-determined' fr-EquationView.md` → `:47`:
***"CURE BOUND by M-CK below: the alternative cure ("route notation through doCompute") walks into the
under-determined `computeKey` and re-ships B-1 one layer down."*** (ii) The imperative, a different row
— ⟨cmd⟩ `/usr/bin/grep -n -F 'fix the key FIRST or the B-1 repair ships broken' fr-EquationView.md` →
`:71`: ***"fix the key FIRST or the B-1 repair ships broken."***

▲ **LOCK.** The operation identity is the precondition, not the field: `computeKey()`
(`EquationView.vue:82-84`) returns **four** components while the POST carries **seven**, including the
two that determine the render (`notation` `:109`, `budget` `:110`). **Adding the field while the key
still under-determines the request re-ships B-1 one layer down** — the field would refresh on a compute
the key says need not happen. Sequenced behind **§B1**'s identity clause, which owns the key.

### F2 — One shared bound constant across the seam ‡

**RULE.** **A bound that both ends enforce is ONE constant, declared once and carried across the seam.**
Where a client computes a value it will send, the client's admissible range **is** the server's, and a
range the UI offers but the model rejects is a contract defect, not a validation success. **The clamp
belongs at the value, not at the widget**: a bound enforced only in a control is absent from every path
that does not pass through it.

**WITNESS** (measured this seat, base `$F`).

- **The two ends disagree in both directions.** ⟨cmd⟩
  `/usr/bin/grep -n 'ge=2, le=50\|le=200\|:max=' api/models/equations.py web/src/components/equation/FunctionInput.vue`
  → `api/models/equations.py:23` and `:40` both `budget: int = Field(default=…, ge=2, le=50)`;
  `api/models/equations.py:20` `n_harmonics: int = Field(default=20, ge=1, le=200)`;
  `FunctionInput.vue:184` `:min="1" :max="100"` — the Harmonics control **forfeits half of the
  operation's own range**, and `:217` caps *Display terms* at `vizHarmonics`, not at `50`.
- **The client walks past `le=50` without touching a bounded control.** The rescale recurrence is
  `EquationView.vue:151-158`; simulated at this seat over the shipped defaults (`budget = 10`,
  `vizHarmonics = 20`), **double-run**: a monotone one-step up-drag yields `budget(v) = v − 10`, whose
  **first value over the ceiling is `v = 61 → budget = 51`**; a **single track-click** from defaults to
  the slider's own max yields **exactly 50**, and the drag ends at `budget = 90` — **40 above the model's
  ceiling** — with no control ever showing an out-of-range value, because `:216` displays
  `Math.min(budget, vizHarmonics)`.
- **The 422 is swallowed.** `EquationView.vue:143` `if (!isAbortError(e)) { /* silent */ }` — the only
  handler on the `doSimplify` path.
- **And it survives the session boundary.** `budget` restores from sessionStorage (`:29`
  `ref(cached?.budget ?? 10)`), so **the next session's first compute 422s before the user touches
  anything**.

**DISPOSITION.** Booked: **`fr-EquationView B-2`** ⟨**LEG — held at F-W4**⟩ **⊕ `fr-FunctionInput
L-B1/C-1`** ⟨**LEG — held at F-W4**, the `L-B1` limb⟩ **⊕ `fr-FunctionInput C-8`** — ▲ **record-qualified:
NOT `fr-FourierShapeExtractor L-B1`, which is §G1c's** (U-12; one token, two records, two waves). The
contract act — **one shared bound constant across the seam** (the R6-8-correct form) — is **F.W5's own
clause**; the two client repairs are their holders'.

▲ **LOCK — clamp at the two request sites or at the ref, NEVER at the slider** (M-BR rider): **the
restore path never passes through the control.** A widget-level clamp leaves the sessionStorage
resurrection, the programmatic rescale and the cache re-seed all unbounded.

▲ **KILL LOCK — `fr-EquationView K-13`, record-qualified** (§2's kill-register law; a bare `K-n` is not
an identity and may not be quoted as a lock). ⟨cmd⟩ base `$R`, `/usr/bin/sed -n '146p'
fr-EquationView.md` heads *"| K-13 | L·B-2's path 2 …"* and rules the ratio-1 state **unreachable from
the shipped defaults**, with the same `budget(v) = v − 10` recurrence this seat reproduced above;
`fr-FunctionInput.md:100` cites that register rather than minting a second kill. **This is NOT the
`K-13` at §F7, which is `fr-ConvergencePlot`'s.** `fr-FunctionInput C-1`'s sessionStorage-restore path is
the TRUE one, and it is the only one this clause carries.

### F3 — No unbounded field beside bounded siblings

**RULE.** **Every field of a request is bounded, or its unboundedness is a stated term of the contract.**
A collection declares `max_length`; a free-text field declares `max_length` and, where its grammar is
known, a `pattern`. **A bound that exists only as an incidental consequence of a client's arithmetic is
not a contract term** — it is a coincidence the next client will not reproduce.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '17,41p' api/models/equations.py`,
read field by field:

| field | model | bound at the model |
|---|---|---|
| `expression: str` | `ComputeEquationRequest:17` | **NONE** — no `max_length`, no `pattern` |
| `domain_start` / `domain_end` | `:18-19` | none (F4's subject) |
| `n_harmonics` · `n_eval_points` · `notation` · `budget` | `:20-23` | `ge/le` · `ge/le` · `pattern` · `ge/le` |
| `coefficients: list[FourierTermDTO]` | `SimplifyRequest:39` | **NONE** — no `max_length` |
| `budget` · `notation` | `:40-41` | `ge/le` · `pattern` |

**Six fully-bounded scalars across the two request models, and two unbounded fields sitting among
them** — and the free-text one is the harder half: `expression` flows through the library's
seven-keyword denylist (§F.0) into `parse_expr` + symbolic integration (`api/routers/equations.py:52`,
`:72`), with **no `maxlength` at its sole editor** (⟨cmd⟩
`/usr/bin/grep -c 'maxlength' web/src/components/equation/FunctionInput.vue` → **0**). The client's
`2N+1 ≤ 201` array bound is arithmetic, not a term.

**DISPOSITION.** Booked: **`fr-EquationView M-SB` ⊕ `fr-FunctionInput N-4`** (AMENDMENT RELAY); cites
**§D7** (client-derivable bounds). One `max_length` per unbounded field — the R6-8 attributability
asymmetry exactly — at the **fourier API row**.

▲ **AMENDMENT RELAY, verbatim discipline.** `fr-FunctionInput N-4` **CORRECTS** banked `fr-EquationView
M-SB`, whose own span is ⟨cmd⟩ base `$R`, `/usr/bin/grep -n -F 'the ONE unbounded field'
fr-EquationView.md` → **one hit, `:112`**: *"the ONE unbounded field"*. **There are TWO.** The relay is
recorded **at the amending record**; the banked file is never rewritten (E-3). Damage is bounded today by
the banked 30 s-semaphore / 429 row — **a bound on the blast radius is not a bound on the field**.

### F4 — A server-side domain validator

**RULE.** **Cross-field admissibility is validated at the boundary, by the model, not by the handler's
luck.** Where two fields define an interval, the contract states the relation (`start < end`) and the
model enforces it; a request that satisfies every per-field bound and no cross-field relation must be
rejected as *invalid*, never executed into a division the framework reports as a 500.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/grep -c 'model_validator\|field_validator\|@validator' api/models/equations.py
api/routers/equations.py` → **0** — no cross-field constraint exists on either file. The consequence is
arithmetic, at `api/routers/equations.py:55` `period = domain[1] - domain[0]`: `domain_start ==
domain_end` ⇒ **period 0** ⇒ the catch-all at `api/main.py:114` (§F5's subject), which the client renders
as **nothing**; and a **reversed** domain (`end < start`) passes every bound and succeeds **with a
negative period**, producing a silently wrong series rather than an error.

**DISPOSITION.** Booked: **`fr-EquationView M-DV`** (a seat-booked rider on the folded `L·M-1` / `C·C-32`).
The act — **a pydantic `model_validator` on `ComputeEquationRequest`** — is the **fourier API row's**.
▲ **The client half is banked at `CoefficientsPanel M-L1`: book only the INCREMENT here**, never the
banked half.

▲ **LOCK.** The two failures are **not** one: `start == end` is a crash the envelope hides, `end <
start` is a **success** that is wrong. A validator that only guards equality leaves the worse half
shipping.

### F5 — The error envelope is actually spoken ‡

**RULE.** **The contract's error envelope is `application/problem+json` (RFC 7807) on every non-2xx
response of every operation, including framework-raised ones** — and **a client resolves its message as
`detail ?? title ?? statusText ?? fallback`, treats a non-string `detail` as structured content rather
than discarding it, and never lets an empty string stand as a rendered message.** An envelope that only
the hand-written raises honour is not an envelope.

**WITNESS** (measured this seat, base `$F` unless stated).

- **The server speaks one shape and the framework speaks another.** ⟨cmd⟩
  `/usr/bin/grep -n 'exception_handler' api/main.py` → **exactly one**, `:114`
  `@app.exception_handler(Exception)` returning `{"detail": "Internal server error"}` at `:122` — **no
  `HTTPException` handler**, so every `raise HTTPException(...)` in the tree emits FastAPI's
  `{"detail": …}` and every 422 emits FastAPI's **ARRAY**-shaped `[{loc, msg, type}]`.
- **The client discards exactly those two shapes.** ⟨cmd⟩
  `/usr/bin/sed -n '36,46p' web/src/lib/api-problem.ts` → `:38` destructures `detail` out of the body
  and `:43` admits it **only** `typeof detail === "string"` (the array 422 becomes `undefined`), while
  `:41` falls the title back to `response.statusText`, which `:27` `super(title)` makes the thrown
  `Error`'s message.
- **Under HTTP/2 that message is the empty string, and `""` is not nullish.** `statusText` is absent on
  the h2 wire; `"" ?? x` returns `""`, which is falsy — **no toast, no banner, silence end to end**.
- **The one hand-authored 422 proves the cost.** ⟨cmd⟩ `/usr/bin/grep -n 'No contours extracted'
  api/routers/images.py` → `:247` `detail="No contours extracted — try lowering min area or changing
  strategy"` — a sentence written for a user, parked on the one field the client drops, and surfaced as
  *"Unprocessable Entity"*.
- ▲ **Narrowing adopted and binding: the middleware's rate-limit 429 IS problem+json** (`rate_limited()`,
  exercised at `api/tests/conformance/test_problem.py:53-63`). **This clause must NOT claim zero
  coverage** — it claims the **framework-raised** band, which is the uncovered one.
- **The value end carries the identical client half** (base `$V`): ⟨cmd⟩
  `/usr/bin/sed -n '37,42p' demo/platform/transport/api-problem.ts` → the same destructure, the same
  `typeof detail === "string"` narrowing and the same `response.statusText` fallback, in the
  independently-authored twin (inv-16) at `:37` · `:40` · `:42`. value.js's own API **does** emit
  problem+json (⟨cmd⟩ `/usr/bin/grep -rl 'application/problem' api/src --include='*.ts' | wc -l` →
  **3 files**), so the value client meets the fallback rarely — **the clause binds both ends anyway**,
  and the value-side act is handed on at **VO-6**, not performed here.

**DISPOSITION.** Booked: **neither witness — one server identity, two witnesses, zero double-homes.**
**`fr-EquationView C·D-02`** is an **F.W4** row and **`fr-ContourSettings M-15 / DU-missed-4 / D-m2 /
D-m3`** is a **LEG held at F.W3** (canonical home F.W3 per the file criterion, legs `F.W5-W8` and
SS-13; ruling R4-6). **F5 owns the server-side envelope clause and books neither record**: the
`HTTPException` handler is the contract act (**fourier API row**), the two records are its evidence, and
both display cures land at their holders (F.W3 / F.W4). The **transport arm** — *is the browser hop
HTTP/2?* — is **SS-13**'s probe; ▲ **the static arm needs no probe**: `"" ?? x === ""` is a language
fact, and `statusText`'s absence on h2 is a protocol fact.

▲ **LOCK.** The cure is **the handler, not the client guard**. A client that hardens its fallback chain
while the server keeps emitting `{"detail": …}` has made the silence legible in one consumer and left
the contract unspoken; every other consumer — and the independently-authored value twin — re-derives the
same bug. **Both halves land, and the server half is the one that closes the clause.**

### F6 — A response field states WHICH population it measures

**RULE.** **A quantity that can be computed over more than one population names its denominator in the
contract, beside the field.** The same name may not denote two different populations at the two ends of
one wire, and a UI may not print a value under a sentence asserting a different one.

**WITNESS** (measured this seat, base `$F`).

- **Two denominators under one number.** ⟨cmd⟩
  `/usr/bin/sed -n '56,65p' src/fourier_analysis/symbolic/simplification.py` → `simplify_series` keeps
  `truncate_by_budget(terms, budget)` (`:59`) and returns
  `energy_fraction = kept_energy / total_energy` (`:62`) — **the BUDGET-truncated fraction**, which the
  router returns as `energy_captured` (`api/routers/equations.py:91`, `:129`). The client prints it
  **directly beneath its own ≥99.99% assertion**: ⟨cmd⟩
  `/usr/bin/sed -n '201,209p' web/src/components/equation/FunctionInput.vue` → *"Sets N to the minimum
  harmonics capturing ≥99.99% of total energy ‖f‖²"* at `:202-203`, then
  `{{ (energyCaptured * 100).toFixed(1) }}% energy` at `:207`, fed from
  `EquationView.vue:206` `:energy-captured="displayEnergy"`. The assertion is about **N_eff** (whose own
  threshold is `compute_effective_n(..., threshold=0.9999)`, `simplification.py:68-71`); the number is
  about **the budget**. With the shipped defaults (`budget` 10, `effectiveN` 20–40) **the mismatch is
  the common case, not the edge**.
- **And the same name means two things across the wire.** `nHarmonics` is a **surviving-harmonic cap**
  in the client (`EquationView.vue:53-55` `Math.min(effectiveN, nHarmonics)`) and an **index bound** on
  the wire (`n_harmonics`, `ge=1, le=200`, the count of harmonics computed).

**DISPOSITION.** Booked: **`fr-FunctionInput L-M3`** ⟨**LEG — held at F-W4**⟩ **⊕ `fr-ConvergencePlot
L-m13`** — ▲ **record-qualified: NOT `fr-FourierShapeExtractor L-M3`, which is §G5c's** (U-12). **v2
states the denominator WITH the field**; the copy and the naming are **F.W4's**.

Provenance carried verbatim, at the record's own bytes and in the record's own voice — ⟨cmd⟩ base `$R`,
`/usr/bin/grep -n -F 'best library-axis find in the corpus' fr-FunctionInput.md` → `:53`:
***"The best library-axis find in the corpus (both readers concur; I concur)."***

▲ **LOCK.** Renaming the tooltip is not the cure: **the wire field is the ambiguity**. Two names on the
wire (`energy_captured_over_kept` vs `energy_captured_over_total`, or one field ⊕ an explicit
`denominator`) make every consumer's sentence checkable; a corrected sentence in one tooltip leaves the
next consumer to guess again.

### F7 — The missing original-expression field

**RULE.** **A surface that contrasts two quantities receives both of them, each in its own field.** Where
a plot exists to show that a partial sum is *not* the original function, the original travels as its own
contract field, rendered in the same language as its counterpart — **never re-used from a
budget-truncated render, and never reconstructed from a request parameter at the consumer.**

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/sed -n '260,266p' web/src/components/equation/ConvergencePlot.vue`:

```
if (h === "sum")      return renderKatexInline(`f(x) = ${props.expression ?? "\\text{sum}"}`);
if (h === "original") return renderKatexInline(`f(x) = ${props.expression ?? "f(x)"}`);
```

The two branches are **character-identical but for an unreachable fallback**: at the only call site
(`EquationView.vue:309-316` `:expression="expression"`) the prop is always a non-empty string — the input
ref defaults `"x*(pi - x)"` (`:25`) and `doCompute` returns early on blank (`:93`) — so `??` never fires
and **both curves are labelled `f(x) = <the original expression>`**. The golden partial sum therefore
**asserts the identity the plot exists to disprove**. The string is **raw SymPy source pushed through
KaTeX** (`:255-257`), while `latex` and `latex_sigma` arrive on the same response and **this component
consumes neither** (⟨cmd⟩ `/usr/bin/grep -c 'latex_sigma\|result.latex'
web/src/components/equation/ConvergencePlot.vue` → **0**; §F.0's second correction).

**DISPOSITION.** Booked: **none by this clause.** `fr-ConvergencePlot K-13` was **re-homed TERMINAL** at
the canonical's §0.5 errata **E6-3** (2026-08-29), so this clause **carries the FACT and books no
canonical F.W5 row**; `L-M7 + C-8` (ConvergencePlot) are **canonically F.W4 rows** ⟨**LEG — held at
F-W4**⟩, cited here and claimed by neither side twice. The act — **a new backend field carrying the
ORIGINAL expression as LaTeX** — is the **fourier API row's**.

▲ **THE PRESCRIBED CURE IS DEAD, AND THE KILL IS RECORD-QUALIFIED.** ⟨cmd⟩ base `$R`,
`/usr/bin/sed -n '129p' fr-ConvergencePlot.md` → *"| K-13 | C-8's cure ("route `result.latex` to the
original curve") | RATIFIED: `latex` is the budget-TRUNCATED series render (seat-read equations.py:91 +
the simplify_series docstring) … Cross-repo field required (F.W5)."* Re-verified at the bytes this seat:
`api/routers/equations.py:91` `latex, energy = simplify_series(terms, req.budget, req.notation)` and
`simplification.py:59-64` truncate before rendering. **Routing `latex` to the original curve re-commits
the exact inversion C-8 diagnoses.** The sound cure is a **NEW field** — `sp.latex(expr)` taken from the
already-parsed expression (`api/routers/equations.py:52` `expr = parse_expression(req.expression)`) and
added to `ComputeEquationResponse` — ⊕ **§C §6**'s provenance posture. ▲ **This `K-13` is
`fr-ConvergencePlot`'s, NOT the `fr-EquationView K-13` at §F2**: two records, two kills, one token.

▲ **LOCK.** The fallbacks are **unreachable**, so no fix that edits them changes anything; and the two
branches must not be "de-duplicated" — **they are meant to differ**, and their identity is the defect.

### F8 — THE SEAM CHOICE: portable LaTeX on the wire ‡ — **RULED HERE: THE WIRE FIELD**

**RULE — this clause makes the choice the forming spec is owed, and states it once.** **Every LaTeX field
on this contract carries PORTABLE LaTeX** — renderable by any conforming consumer with no `trust` flag,
no HTML-class extensions and no post-processing. **Presentation hooks travel in their own field, named
for what they are** (e.g. `latex_sigma` portable ⊕ `latex_sigma_html` decorated), and **a consumer that
copies, exports, stores or transmits LaTeX uses the portable field.** A field whose value only one
renderer, in one trust mode, can consume is not a LaTeX field; it is markup with a LaTeX-shaped name.

**WITNESS** (measured this seat, base `$F`). The app's sole copy affordance emits invalid LaTeX **in the
default mode**:

- ⟨cmd⟩ `/usr/bin/grep -n 'htmlClass' src/fourier_analysis/symbolic/latex_rendering.py` → **four
  emission sites**, `:175` `:176` (`\htmlClass{eq-coeff eq-an}{a_n}` / `{eq-bn}{b_n}`), `:216`
  (`{eq-cn}{c_n}`), `:248` (`{eq-An}{A_n}`) — and ⟨cmd⟩ `/usr/bin/grep -n '^def ' <same file>` places
  **all four inside the `*_sigma` renderers** (`render_trig_sigma:154`, `render_exponential_sigma:199`,
  `render_polar_sigma:231`), while the three expanded renderers (`:21`, `:60`, `:111`) are **clean**.
- `eqMode` defaults `"sigma"` (`EquationView.vue:43`); `activeLatex` prefers the sigma form (`:49-51`);
  `copyLatex()` copies it **raw** (⟨cmd⟩ `/usr/bin/sed -n '30,32p'
  web/src/components/equation/EquationResult.vue` → `copy(props.latex);`), and the only renderer that
  consumes it is KaTeX **with `trust: true`** (`:23`).
- **Therefore the app copies PORTABLE LaTeX in the non-default mode and UNPORTABLE LaTeX in the default
  one** — the inversion is the finding.

**DECISION AND REASONS.** The spec's routing cell offers two seams and gives the choice to the forming
spec — ⟨cmd⟩ base `$R`, `/usr/bin/grep -n -F 'the forming spec chooses the seam' fr-EquationResult.md` →
`:39`: ***"→ F.W4 (a `plainLatex()` strip beside the FR-EQR-17 singleton) or F.W5 (the hooks as a
separate wire field — filed beside R6-8; the forming spec chooses the seam)."*** **v2 chooses the WIRE
FIELD**, in F.W5's own voice, for three reasons that are facts of the measurement above:

1. **The hooks are produced in the library, not the client.** They are baked into a package the API
   merely calls, so a client-side strip leaves every *other* consumer of the same library output — the
   next client, the export path, a notebook — re-deriving the same strip. The seam where the defect is
   produced is the seam where the contract must speak.
2. **A strip is a masking fallback.** It repairs the symptom in one sink while the wire keeps carrying a
   value whose portability depends on the consumer remembering to sanitise it. **§A2's layer split
   already rules this class**: the envelope is the contract's, the rendering is the consumer's.
3. **It is the cheaper, checkable act.** The decorated string is already a *derived* form of a portable
   one (the hooks wrap `a_n`/`b_n`/`c_n`/`A_n` tokens), so the portable spelling costs one renderer
   parameter, and the split makes **FR-EQR-32's sink-class clause enforceable**: the decorated field has
   exactly one lawful sink (a trusted HTML renderer) and the portable field has all the others.

**DISPOSITION.** Booked: **`FR-EQR-4`** (reader-2 missed M-1) ⊕ **`FR-EQR-32`** (cited at §B1);
registry-swept, unbanked elsewhere. The act — **the field split on the wire, portable by default** — is
the **fourier API row's**, and it composes with §F1: when `latex_sigma` joins `SimplifyResponse`, **it
joins in the portable spelling.**

▲ **LOCK — F.W5 RECORDS NO DECLINE, so F.W4 does NOT land `plainLatex()` as the portability cure.** The
spec's alternative branch is the one that would have licensed it; it was not taken. If F.W4 wants a
defensive strip at a sink it may have one, **but it is not the cure and must not be reported as
closing FR-EQR-4** — reporting it so would be exactly the masking-fallback shape this clause rejects.
The FR-EQR-17 singleton work at F.W4 is unaffected and proceeds on its own merits.

### F9 — A parameter that does not govern

**RULE.** **Every parameter of an operation governs something observable in that operation's result, and
governs it at every layer that receives it.** A parameter carried through a signature and dropped at the
call it was carried for is **not an interface** — and a parameter that governs a result **must belong to
that result's identity** (§B1's key), or the operation can refuse to recompute a request whose answer
would differ.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩
`/usr/bin/sed -n '272,282p' src/fourier_analysis/symbolic/latex_rendering.py` → `render_latex(terms,
notation, budget=10, variable, compact)` declares `budget` at `:275` and then calls
`renderer(terms, variable, compact=compact)` at `:281` — **`budget` is never forwarded**, at the exact
line the spec names. Its sibling `render_latex_sigma` (`:285-292`) **does not take a budget at all**, so
the sigma render is not truncated even in principle, while the expanded `latex` is truncated *upstream*
by `truncate_by_budget` (`simplification.py:59`) — **one name, two governing regimes, one of them
vacuous**. And the same `budget` is **absent from the operation's identity**: `computeKey()`
(`EquationView.vue:82-84`) omits it (with `notation`), which is why §F1's flip is suppressible at all.

**DISPOSITION.** Booked: **`D-10` ⊕ `D-L12` ⊕ `C-22`** (the EquationPanel cluster). The act — **forward
it or delete it, and put it in the key** — is the **fourier API row's** for the signature and **§B1's**
for the identity.

▲ **LOCK.** This clause is the third face of one defect and must be cured with the other two: the **same
`budget`** is **unbounded at the client (§F2/§F3)**, **unforwarded at the server (here)** and **absent
from the operation's identity (§B1)**. Same family as **§G4c**'s sampling contract — *a parameter named
for a quantity it does not control*.
---

## §G — Canonical geometry: the build-time provenance contract

*The §G band governs geometry that is **built once and shipped as an artifact**, so its "wire" is the
repository: a tracked source, a runnable generator, a recorded parameterisation and a diagnosed result.
Every clause here binds the **fourier** end — value.js ships no canonical geometry and owes nothing in
this band; the silence is stated so a later reader cannot read it as an escape (the obligation list
below carries the same statement in the other direction).*

### G1c — The moon's true source ‡ — **TRIPWIRE** — **RULED HERE: RE-AUTHOR, AT F.W6, NOT BEFORE**

**RULE.** **A canonical artifact names the source it was built from, and that source is tracked, runnable
and recorded with the parameters that produced the artifact.** Where the source cannot be named, the
artifact is **RE-AUTHORED under a repaired pipeline** — never regenerated ad hoc, and never
hand-corrected in place, because an artifact edited apart from its generator **destroys the only
evidence that they ever agreed**. Until the pipeline exists, the artifact is **FROZEN with a golden-file
baseline**, which is the instrument the owner has already ruled for the frozen-asset class (`§0j.D`
G-15(c), FM-19: *frozen-forever with a golden-file diff*; this clause adopts the instrument and does not
re-open that ruling).

**WITNESS** (measured this seat, base `$F`, **double-run**; the distance figures are computed from the
tracked bytes of `web/src/assets/fourier-paths/moon.json` against `scripts/raw-contours.json`, the
generator's own declared input).

- **The shipped artifact does not come from the extraction it claims.** Nearest-point distance from each
  of the 512 shipped moon points to **any** extracted moon point: **19 of 512 = 3.71 % within 1.0 unit**,
  **p90 = 37.55**, median 2.93 — against a **1.23-unit** resample spacing of the shipped polyline
  itself. **A p90 thirty times the sampling pitch is not drift; it is a different shape.**
- **The sun is the control, and it behaves.** Same instrument, same run: **167 of 512 = 32.62 % within
  1.0 unit, p90 13.84** (its own spacing is 3.14, and its residual is dominated by the tour's gap
  traversals). **The two assets were produced by the same script; only one still matches its input.**
- **Containment, on all four sides.** Shipped moon bbox `x ∈ [30.06, 140.96]`, `y ∈ [36.55, 174.73]`;
  the **crescent-alone** bbox (the two 128-point contours) `x ∈ [28.03, 153.93]`, `y ∈ [30.00, 177.11]`
  — strictly containing, **Δ x-max 12.97 · Δ y-min 6.55**, reproducing the record's two figures at this
  seat's own clock.
- **The divergence EVENT is an asset-only commit the generator never received.** ⟨cmd⟩
  `git show --stat 9e5ba74 -- web/src/assets/fourier-paths/` → **`moon.json` 1 ±, `sun.json` 1 ±**, and
  the message body carries *"Day/night toggle: remove stars from moon SVG contour, cap sun/moon at 50
  harmonics"*. **The stars were removed from the ARTIFACT, not from the SOURCE**: the component still
  renders all six — ⟨cmd⟩ `/usr/bin/grep -n '<!--' web/src/components/morph/FourierShapeExtractor.vue`
  places *"5-point polygon stars"* at `:97` (three `<polygon>`s, `:98` `:104` `:110`) and *"Tiny dot
  stars"* at `:116` (three `<circle>`s, `:117-119`) **inside the moon `<svg>` (`:72-121`)**, and the
  generator's own input still holds them: ⟨cmd⟩ contour lengths of `raw-contours.json` `moon` →
  `[128, 128, 10, 10, 10, 16, 16, 16]` = crescent ⊕ inner stroke ⊕ **three stars ⊕ three dots**.
- **The parameterisation diverged with it.** Shipped `n_harmonics` **50**, `levels` **10 entries**
  (`[1,2,3,5,8,12,18,25,35,50]`, both assets) against the script's hard-coded `n_harmonics=100` and
  **12** levels (`scripts/precompute_svg_fourier.py:139-142`).
- **And it is the site-wide toggle that renders it.** ⟨cmd⟩
  `/usr/bin/grep -n 'fourier-paths' web/src/components/layout/DarkModeToggle.vue` → `:23-24`
  `import sunData … import moonData …`.

**DECISION (this wave's, in F.W5's own voice).** The record leaves the first branch empty at its own
bytes — ⟨cmd⟩ base `$R`, `/usr/bin/sed -n '51p' fr-FourierShapeExtractor.md`, the L-B1 routing cell:
*"What moon.json WAS generated from → SS-13/undetermined."* — and this seat's measurement closes it the
rest of the way: **no parameterisation of the present source reproduces the shipped artifact** (the
crescent-alone bbox strictly *contains* it, so no subset-of-contours choice yields it either).
**Therefore: RE-AUTHOR.** The moon is re-generated from the tracked component with the six decorations
excluded **at the source**, under the repaired generator (§G2c) and the diagnosed result type (§G5c),
**at F.W6 and not before**; the re-authored artifact lands **with its parameters recorded beside it** and
a golden-file baseline. **The interim posture is FROZEN.**

▲ **TRIPWIRE — a COMPOSITE from two rows of one record, quoted as two** (R2-1-LAW.4). (i) ⟨cmd⟩ base
`$R`, `/usr/bin/grep -n -F 'DO-NOT-REGENERATE on' fr-FourierShapeExtractor.md` → `:51`, whose L-B1
routing cell reads ***"DO-NOT-REGENERATE on `master`."*** (ii) ⟨cmd⟩
`/usr/bin/grep -n -F 'revive at BLOCKER with the DO-NOT-REGENERATE rider as the tripwire'
fr-FourierShapeExtractor.md` → `:149`, the record's own severity ruling: ***"if any wave attempts
regeneration before F.W5-W8 lands the pipeline, both rows revive at BLOCKER with the DO-NOT-REGENERATE
rider as the tripwire."*** The *"both rows"* the ruling denotes are **`fr-FourierShapeExtractor L-B1`**
and **`fr-FourierShapeExtractor L-B2/C-2`**, named here in F.W5's own voice and keeping their banked
spellings.

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-B1`** — ▲ **record-qualified: NOT
`fr-FunctionInput L-B1`, which is §F2's** (U-12; one token, two records). The eager-payload arm is banked
**`FR-AH-1` → F.W4** and is **not re-booked here**. The act — **the re-authoring, with the pipeline** —
is **F.W6's / the build lane's**, and the magnitude question *"what `moon.json` WAS generated from"*
remains **SS-13 / undetermined** and is **not** a precondition of the decision above.

▲ **LOCK — DO-NOT-REGENERATE ON `master` STANDS UNTIL F.W6 LANDS THE PIPELINE.** A regeneration attempt
before then **revives `L-B1` and `L-B2/C-2` at BLOCKER**. **Dissent preserved with its revival
condition**: reader-1 filed BLOCKER; the demotion was on latency, not on the finding.

### G2c — The seam is tracked and the generator runs

**RULE.** **A build seam is part of the repository**: the producer, its declared input and the
parameterisation that produced the shipped artifact are all tracked, and the generator **imports only
symbols that exist**. **A generated artifact whose producer is untracked is an artifact with no
provenance**, whatever a docstring claims.

**WITNESS** (measured this seat, base `$F`). The only producer of the two rendered assets is **untracked
AND broken at import AND parameter-diverged**:

- **Untracked.** ⟨cmd⟩ `/usr/bin/sed -n '52,56p' .gitignore` → `:53` `scripts/*` with negations at
  `:54-56` (`!scripts/dev.sh`, `!scripts/deploy.sh`, `!scripts/e2e.sh`); ⟨cmd⟩
  `git status --porcelain --ignored scripts/` → **three `!!` rows**, two of them this seam's —
  **`!! scripts/precompute_svg_fourier.py`** and **`!! scripts/raw-contours.json`** (the third is
  `scripts/gen_analyticity_strip.py`, a different tool, named so the return is quoted whole) — **the
  producer AND its declared input are both swallowed**, while the product they make is tracked in full:
  ⟨cmd⟩ `/bin/ls -l web/src/assets/fourier-paths/{sun,moon}.json` → **220 KB each, 440 KB together**
  (the record's *"450 KB of product"*, re-measured here). **A fresh clone holds the product and nothing
  that makes it.**
- **Broken at import.** `scripts/precompute_svg_fourier.py:39`
  `from fourier_analysis.shortest_tour import order_contours`, against ⟨cmd⟩
  `/usr/bin/grep -rc 'def order_contours' src/ api/` → **0**. **No module defines it**; the file cannot
  be run as written.
- **Parameter-diverged.** `:139-142` hard-code `n_harmonics=100` and a 12-entry `levels` list against
  the shipped **50 / 10** (§G1c).
- **Unpinned generator input, no drift detection.** ⟨cmd⟩ `/usr/bin/grep -n 'pencil-boil'
  web/package.json` → `:17` `"@mkbabb/pencil-boil": "^0.4.1"` — a **caret range**, so canonical geometry
  is a pure function of a third-party generator admitted by a *range*; ⟨cmd⟩
  `/usr/bin/grep -rln 'fourier-paths' scripts/ web/e2e` → **the two producer scripts and nothing else**
  — **no golden file, no drift check, no test reads the assets.**

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-B2 / C-2` (one identity) ⊕ `fr-FourierShapeExtractor
L-B3`** — ▲ **record-qualified: NOT `fr-ContourEditorCanvas C-2` (§E17), NOT `fr-GallerySearchBar C-2`
(§D10)**. The acts — **track the seam** (`.gitignore` negation lines), **fix the import**
(`build_contour_tour(...).path`; ⟨cmd⟩ `/usr/bin/sed -n '31,49p' src/fourier_analysis/shortest_tour.py`
→ `ContourTour` at `:31` with `path: NDArray[np.complex128]` at `:46`, `build_contour_tour` at `:49`),
**reconcile 50/10**, and **prefer the tracked in-process idiom** — are **F.W6's / the build lane's**.
**`L-B3` RIDES this cure**: its concrete `0.4.1 → 0.12.0` exposure is **CLOSED** at the record (Δ
6.10e-6), the absent drift detector survives, and **tracking `raw-contours.json` IS the golden file** —
not a separate act.

▲ **REPAIR-SHAPING CORRECTION BOUND IN (M-2), RE-MEASURED AND SHARPENED AT THIS SEAT.** The frame is
**not** *"no tracked path exists"*: ⟨cmd⟩ `git ls-files scripts/ | wc -l` → **16**, including a tracked,
working, **in-process** `scripts/precompute_nav_icons.py`, whose own header (`:12`) names its outputs as
`web/src/assets/fourier-paths/{paper,visualize,gallery,equation,morph}.json` — **5 of the 7 assets**, no
browser anywhere. ⊘ **And the sharper fact, measured here because it inverts the reassurance**: ⟨cmd⟩
run once per asset, `for n in paper visualize gallery equation morph; do /usr/bin/grep -rl
"fourier-paths/$n.json" web/src; done` → **empty for all five: those 5 have ZERO importers**,
while the two the app actually renders — `sun.json` and `moon.json` (`FourierMorphDemo.vue:95-96`,
`DarkModeToggle.vue:23-24`) — are **exactly the two produced by the untracked browser detour**. **The
proven idiom exists and produces only orphans; the rendered geometry is the part it was never pointed
at.** That strengthens the prescribed direction rather than softening it.

▲ **LOCK.** **Dissent preserved**: reader-1 filed BLOCKER on `L-B2/C-2`, demoted on M-2's repair-shrink;
**revival = the §G1c tripwire.**

### G3c — Closure is CARRIED, never inferred

**RULE.** **Whether a contour is closed is a property of the contour and travels with it** — a boolean
carried from extraction to every consumer — **and is never re-derived downstream by a heuristic.** A
point list that cannot express open-vs-closed is an under-specified type, and a sampler must not emit a
closed shape as an open one.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '10,58p' web/src/lib/svg-contours.ts`
— **every branch is endpoint-exclusive and none carries a flag**:

- the circle branch runs `for (let i = 0; i < n; i++)` over `angle = 2πi/n` (`:26-29`) — the closing
  point is never emitted;
- the geometry branch runs `t = (i / n) * totalLen` for `i < n` (`:42-46`) — `t = totalLen` is never
  sampled;
- the polygon branch emits the authored vertices only (`:30-35`) — **a closed polygon loses its whole
  authored closing edge**, and the largest instance was in no axis table at all: `sun[0]`, the 20-vertex
  ray polygon (⟨cmd⟩ contour lengths of `raw-contours.json` `sun` → `[20, 123, 128, 4, 4, 4, 16, 16]`),
  whose dropped closing flank is **44.08 units on the page's dominant silhouette** ⟨*the 44.08 and the
  per-shape percentages below are the RECORD's measurements, carried, not re-derived here; the contour
  lengths and the branch structure are this seat's*⟩;
- the return type is ⟨cmd⟩ `/usr/bin/sed -n '10,14p' web/src/lib/svg-contours.ts` →
  `[number, number][][]` — **it cannot express the distinction**;
- and the sink is closed-only: `web/src/lib/svg-fourier.ts:47-49`
  `pointsToSvgPath(points, closed: boolean = true)` with ⟨cmd⟩ `/usr/bin/grep -rn 'pointsToSvgPath('
  web/src` → **both call sites 1-arg** (`composables/useFourierMorph.ts:81`,
  `components/morph/HarmonicLevelGrid.vue:131`), so **two genuinely open strokes** (the sun's golden
  spiral and the moon's inner stroke) are rendered closed.

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-M1`** (+ the 44.08 arm) **⊕ `M-8` ⊕ `C-3`** — ▲
**record-qualified: NOT `fr-GalleryInfiniteGrid C-3` (§D2's record)**. The act — **a closure FLAG set at
extraction, plus the wrap** — is **ONE cure with `C-3`** and is **F.W6's / the build lane's**.

▲ **LOCK — v2 MUST NOT SPECIFY A HEURISTIC.** The *"unambiguous discriminator"* sub-claim is **KILLED**
at the record: the closed shape's dropped flank (44.08) and an open stroke's gap (44.97) **overlap**, so
no post-hoc rule can recover closure from the points. **The kill strengthens the type complaint**: the
flag must be **carried**, because it provably cannot be **inferred**.

### G4c — A parameter that governs

**RULE.** **A parameter named for a quantity governs that quantity in every branch that produces the
result, or the contract names the branches it does not govern and why.** Where a later stage re-samples
what an earlier parameter selected, **the pipeline's sampling contract is stated once, at the stage that
owns it.**

**WITNESS** (measured this seat, base `$F`). `samplesPerPath` (`svg-contours.ts:12`, default 128) is
honoured by **one of three branches**: the geometry branch takes it whole (`:41` `const n =
samplesPerPath;`); the circle branch **rescales it against a magic constant** (`:25`
`Math.max(16, Math.round(samplesPerPath * (r / 50)))` — the `50` is a literal, named nowhere); and the
polygon branch **ignores it entirely** (`:30-35`). The measured output of one run is the contract's own
counter-example: ⟨cmd⟩ contour lengths of `raw-contours.json` `sun` → **`[20, 123, 128, 4, 4, 4, 16,
16]`** — **a parameter named "samples per path" produced a 4-point contour**. And the polygon branch's
exact-vertex care is undone downstream: `scripts/precompute_svg_fourier.py:84`
`contour = resample_arc_length(stitched, n_samples)` with `n_samples=512` — **documented in neither
file**.

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor C-4 ⊕ C-14`** — ▲ **book them together: `C-14`
bounds `C-4`'s geometric cost.** The act — **a stated sampling contract or a uniform post-pass** — is
**F.W6's / the build lane's**. Same family as **§F9**: *a parameter named for a quantity it does not
control.*

▲ **LOCK.** The `r / 50` rescale is not a bug to be deleted — it encodes a real intent (sample density
proportional to arc length). The cure names the constant and **applies one rule to all three branches**;
raising the polygon branch to `samplesPerPath` **without** the post-pass decision merely moves the
inconsistency downstream to `resample_arc_length`.

### G5c — A DIAGNOSED result type — the precondition for any regeneration

**RULE.** **An extraction returns a DIAGNOSED result** — the contours **and** what was dropped, by which
gate, with counts — not a bare list. **A silent-drop path that defines shipped artifacts is forbidden**:
every gate that can discard geometry reports, and the caller records what it was told.

**WITNESS** (measured this seat, base `$F`). Three silent-drop gates on the path that defines canonical
geometry, in a 58-line file: `svg-contours.ts:40` `if (totalLen < 1) continue;` (sub-unit bail) · `:47-49`
`catch { continue; }` (**bare**) · `:52` `if (points.length >= 3)` (the floor: anything shorter is
dropped without a word). ⟨cmd⟩ `/usr/bin/grep -cE 'console|throw|warn' web/src/lib/svg-contours.ts` →
**0** — *zero* diagnostics of any kind. The caller records no counts and the failure exit is a bare
return: `FourierShapeExtractor.vue:166` `if (!sunSvgRef.value || !moonSvgRef.value) return;`.

**And the same repository already ships the correct shape, on the server side of the same operation**:
⟨cmd⟩ `/usr/bin/sed -n '153,172p' src/fourier_analysis/contours/extraction.py` →
`extract_contours_result(...) -> ContourExtractionResult` (with `ContourDiagnostics`: requested/selected
strategy, `contour_count`, `total_points`, retained-area fractions, `max_jump`, `notes`, `candidates`)
and, beneath it, `extract_contours(...)` returning **only** `…​.contours` for callers that want the bare
list. **The twin is not a design to be invented; it is a design to be mirrored.**

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-M3 / C-6`** — ▲ **record-qualified: NOT
`fr-FunctionInput L-M3`, which is §F6's** (U-12). The act — **a diagnosed result type mirroring the
server twin** — is **F.W6's / the build lane's**.

▲ **LOCK — THIS ROW SEQUENCES WITH THE §G1c TRIPWIRE AND IS A PRECONDITION OF ANY REGENERATION.** The
silent drops are **the mechanism that makes §G1c structurally unobservable at the human seam**: a
regeneration run today reports nothing, so a re-authored artifact would be trusted **for exactly the
reason the present one was.** **§G1c's re-authoring may not land before this row does** — and together,
**§G1c ⊕ §G5c are gate G16's close**.

### G6c — A typed, named machine handoff

**RULE.** **A machine-readable handoff is a named, exported interface**, emitted by the component that
owns the data and **independent of any presentational node**. An ambient global reached through a cast is
not an interface; a handoff conditioned on a DOM element that exists for display is not a handoff.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '176,181p'
web/src/components/morph/FourierShapeExtractor.vue` → `const el = document.getElementById("output");`
then `if (el) {` wrapping **both** writes — the text dump **and** `(window as any).__fourierShapeData =
output;` (`:180`), under the comment *"Also put it on window for Playwright to access"*. So: an untyped
ambient global (⟨cmd⟩ `/usr/bin/grep -rc 'declare global' web/src` → **0** for this seam), **hostage to a
presentational `<pre>`**, with **zero readers** — ⟨cmd⟩ `/usr/bin/grep -rlw '__fourierShapeData' web/e2e
| wc -l` → **0**, i.e. **the Playwright comment is false at HEAD** — while the same file owns the correct
idiom twice (`sunSvgRef` / `moonSvgRef`, `:147-148`).

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-M5 / C-5`** — ▲ **record-qualified: NOT
`fr-BasisCanvas C-5` (§E9/§B1's record)** — cured **with** `fr-FourierShapeExtractor C-15` (§A3). The act
— **a NAMED EXPORTED INTERFACE ⊕ ref emission** — is **F.W6's**, and is **decided WITH the pipeline
repair**, never before it.

▲ **CORPUS CORRECTION BOUND IN.** *"Just delete it"* (SE-05) is **WRONG on the tree**:
`scripts/precompute_svg_fourier.py:1-19` names this component as its **INPUT** (*"Reads multi-contour
shape data extracted by FourierShapeExtractor.vue (via Playwright)"*, `:4-5`). **The seam needs a real
harvester or a real deletion WITH the pipeline decision — not either alone**, because deleting the
handoff while the generator still names it converts a dead seam into a broken one.

### G7c — Which stage-0 survives

**RULE.** **One pipeline stage has one implementation.** Where two implementations of the same stage
exist in one repository, **the contract names which survives** and what the other is for; a second
implementation that no test exercises is a fork of the specification, not a convenience.

**WITNESS** (measured this seat, base `$F`). The browser leaf **reimplements stage 0** of the server's
contour pipeline — sampling and contour assembly in `web/src/lib/svg-contours.ts` — while the Python
package ships that stage with diagnostics (§G5c) behind a public surface of ⟨cmd⟩
`/usr/bin/grep -rhE '^def [a-z]' src/fourier_analysis --include='*.py' | wc -l` → **96 public top-level
functions** (**25** of them in `fourier_analysis/contours`). **The browser stage-0 is unit-tested
nowhere — `web/` has no unit runner at all**: ⟨cmd⟩ `/usr/bin/grep -c 'vitest' web/package.json` →
**0** (the `test:e2e` scripts at `:10-11` are Playwright, and §G6c measured what they do not read). This
is the **R6-8 echo at build time**; its runtime twin is `C-5`/BasisCanvas at §B1.

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor C-7`** — ▲ **record-qualified: NOT
`fr-BasisCanvas C-7` (§B1/§B2/§E9) and NOT `fr-ConvergencePlot C-7` (§C1)** — **five sites, one token**.
The act — **the pipeline decision names WHICH stage-0 survives** — is **F.W6's**.

▲ **C's HONESTY ADOPTED AND BINDING — v2 must NOT overstate the duplication.** The **decomposition** is
not duplicated (it runs once, in Python), and **the offline detour is ELECTIVE**: ⟨cmd⟩
`/usr/bin/grep -n 'saveContour' web/src/lib/api.ts web/src/stores/workspace.ts` → `api.ts:316`
`saveContour(...)` called from `workspace.ts:271` with plain point arrays — **contours can be ingested
through the API without the browser detour at all**. The clause's claim is the narrow, true one:
**stage 0 exists twice.**

### G8c — Extraction SCOPE — space and visibility (two clauses, one family)

**RULE.** **An extractor states the SPACE it reads in and the VISIBILITY it respects.** Geometry is
resolved through the accumulated transform of each element (**not** its local coordinates), and **only
painted geometry contributes**: definition, mask, clip-path and display-none subtrees are excluded by
construction, not by the accident of what a page happens to contain.

**WITNESS** (measured this seat, base `$F`). Both properties are absent from the same 58-line file:

- **Space-blindness.** ⟨cmd⟩ `/usr/bin/grep -cE 'getCTM|getScreenCTM|transform'
  web/src/lib/svg-contours.ts` → **0** — every branch reads **local** coordinates (`el.cx.baseVal`,
  `pl.getItem(i)`, `geom.getPointAtLength(t)`), so any ancestor `transform` is silently discarded. The
  selector is also short of the element it would most need: ⟨cmd⟩ `/usr/bin/sed -n '16p'
  web/src/lib/svg-contours.ts` → `svgEl.querySelectorAll("path, polygon, circle, ellipse, rect, line")`
  — **`polyline` is absent** (latent today; live SVGs use bare `<g>`s, whose children this selector does
  reach with their transforms dropped).
- **Visibility-blindness.** No paint filter of any kind (`display`, `visibility`, `<defs>`, `<mask>`,
  `<clipPath>` — zero occurrences, same probe). And **the hazard idiom is LIVE in-tree**: ⟨cmd⟩
  `/usr/bin/grep -n 'SvgFilters' web/src/App.vue` → `:22` `<SvgFilters />`, a **global `<defs>` surface
  mounted app-wide** (`web/src/components/decorative/SvgFilters.vue:66` `<defs>`). An extractor pointed
  at a subtree containing it would fold definition geometry into canonical output.

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-M2 · M-11`** — **two clauses, one family:
space-blindness and visibility-blindness are distinct defects with distinct cures**, and neither is a
generalisation of the other. Both acts are **F.W6's**. `L-M2`'s magnitude (how much geometry the CTM
actually moves today) → **SS-13**.

▲ **LOCK.** Adding `polyline` to the selector **without** the CTM fix widens the blind space rather than
narrowing it, and a visibility filter **without** the selector fix leaves the same hole one element over.

### G9c — The guards check the wrong predicate — twice

**RULE.** **A guard states the condition it means, including at the boundaries of its own type.** A
numeric gate is written so that a **NaN** fails it (`!(x >= k)`, never `x < k`), and a gate meant to
exclude **degenerate** geometry tests **extent**, not **cardinality**.

**WITNESS** (measured this seat, base `$F`), both in `web/src/lib/svg-contours.ts`:

- **`:40` `if (totalLen < 1) continue;` is NaN-PERMISSIVE.** `NaN < 1` is **false**, so a NaN
  `getTotalLength()` **passes the gate** and the loop at `:42-46` emits `samplesPerPath` (128)
  `[NaN, NaN]` samples, which clear the `:52` floor and serialize into the handoff as **`null` pairs**.
- **`:52` `if (points.length >= 3)` guards CARDINALITY, not EXTENT.** An `r = 0` circle takes `:25`
  `Math.max(16, Math.round(128 * 0 / 50))` = **16 coincident points**, which pass the floor and reach the
  decomposition — **the one branch with no degenerate bail**.

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor M-7 · M-9`** — ▲ **record-qualified: NOT
`fr-BasisSelector M-9` (§D12)**. The acts — **the correct guard `!(totalLen >= 1)`** and **an extent
predicate beside the cardinality one** — are **F.W6's**. **One family: the extraction guards check the
wrong predicate twice.** `M-7` registry-swept clean.

▲ **LOCK — `M-9` BOUNDS `L·S-4`'s superlative: carry the bound WITH the superlative** so v2 does not
inherit a false credit. And the two guards are **not interchangeable**: fixing the NaN comparison leaves
the zero-extent circle, and adding an extent test leaves NaN — `NaN` fails an extent test too, but only
because it fails **every** comparison, which is the coincidence this clause exists to stop relying on.

### G10c — The artifact's provenance prose is false

**RULE.** **The prose that explains a canonical artifact is part of the artifact's contract**: it states
the true generating parameters, and those parameters are **named constants**, declared once. **A
provenance note that is arithmetically false, or that cites a mechanism existing in no repository, is
worse than none** — it is the one thing a later reader will trust.

**WITNESS** (measured this seat, base `$F`). ⟨cmd⟩ `/usr/bin/sed -n '150,162p'
web/src/components/morph/FourierShapeExtractor.vue`:

- `:150` — *"// Use seed 42 for canonical shapes (first frame = seed * 100 + 42 = 42)"*. **It is wrong
  twice**: `42 · 100 + 42 = 4242`, **not 42**; and the frame-seed formula it cites exists in **neither
  repo** — the only frame API in the tree is ⟨cmd⟩ `/usr/bin/grep -n 'useLineBoil'
  web/src/components/decorative/SvgFilters.vue` → `:20-21` `useLineBoil(boilOffsets.length, 150)`, i.e.
  **(frame count, interval) — it takes no seed at all.** **The single sentence explaining why the
  canonical geometry is what it is, false in both of its claims.**
- The artifact's **only free parameters** are scattered inline beside it: `:151` `generateSunRays(42)`;
  `:154-156` `wobbleStarPolygon(…, 1)`, `(…, 2)`, `(…, 3)`; `:160-162` `wobbleDiamond(…, 10)`,
  `(…, 20)`, `(…, 30)` — **the canonical seed set (42; 1,2,3; 10,20,30), with no single knob.**

**DISPOSITION.** Booked: **`fr-FourierShapeExtractor L-m3 / C-10 ⊕ L-m5`** (both in the record's
`:81-87` band). ▲ **Deduped: the false comment and the scattered seeds are ONE cure** — **one named seed
constant, one true provenance note** — and the act is **F.W6's**, landing **with** the re-authoring
(§G1c), because the note can only be made true once the artifact's true parameters exist.

▲ **LOCK.** The provenance union's most literal row: **do not "fix the arithmetic"** by editing `4242`
into the comment. The comment describes a mechanism the tree does not have; the cure is to **state what
actually produced the artifact**, which is the fact §G1c's re-authoring establishes.

---

## §H — The value-side obligation list

**What this list is.** Every act this contract asks of **value.js**, enumerated once, each with **ONE
HOME and TWO CITATIONS**, so no act can be lost by silence and none can be double-booked. **F.W5 claims
credit for none of them** (F-W5 §0b; FR-GIG-5's standing bar): this wave authors clauses, and the acts
below are executed by their holders, in their own waves, against their own gates. **A value-side row is
never re-booked as a fourier defect, and a fourier act never appears here.**

**The home, spelled once.** *"The value.js API row"* means the X·V API row in the constellation spine —
the same holder the wave spec's §4 edge names (`F-W5.md` §4, the **`F.W5 → value.js API row`** row, whose
cell reads *"value-side obligations, never fourier defects"*). Sequencing is stated per row where it
exists; **no row below gates a fourier wave, and no fourier wave gates a row below** (§E3's ∥ posture:
neither side's edits gate the other's).

| # | act | one home | citation 1 | citation 2 |
|---|---|---|---|---|
| **VO-1** | **Compound per-entity version identity.** Version `_id` scopes the palette as well as the content: `computeContentHash(name, colors)` (`api/src/modules/palette/hash.ts:8`) keyed into `findOne({ _id: hash })` (`repository/paletteVersion.ts:14`) with the early return at `:47` means **two palettes with identical content share one version row** — and one palette's history silently becomes another's | value.js API row | **§E1** (the clause + its witness) | `F-W5.md` §4, `F.W5 → value.js API row` (*"V-β compound version `_id` + the two-histories test"*) ⊕ gate **G2** |
| **VO-2** | **The two-histories test.** A regression test that creates the same content under two palettes and asserts **two** version rows — the falsifier for VO-1, without which the cure is unobservable | value.js API row | **§E1** ▲ LOCK | `F-W5.md` §3 gate **G2** |
| **VO-3** | **Born visibility of the derived variant: BORN-PRIVATE** (owner ruling **R8**, `§0j.D` F-SS4REST). `service/forks.ts:76` hard-codes `visibility: "public",`; the derived variant is born **private** and becomes public only by the shipped explicit publish act | value.js API row | **§E4** (RULED; the D9 non-contradiction check is recorded there) | `F-W5.md` §4 edge (*"fork born-visibility (`forks.ts:76`) + create-visibility test"*) ⊕ gate **G5** |
| **VO-4** | **A create-visibility test, each side.** The clause's own falsifier: a created/derived entity's birth visibility asserted at the API boundary | value.js API row (its half; fourier owns the other) | **§E4** (*"Homes: both API rows, ⊕ a create-visibility test each side"*) | `F-W5.md` §3 gate **G5** |
| **VO-5** | **Attribution — `V-γ`'s hole.** `model.ts:60` `userSlug: string \| null` with the `if (userSlug)` guard means **an unattributable edit writes NO version row**: the history has a hole exactly where the anonymous act was. The actor is a FIELD; an absent actor is a *value* of it, not a reason to skip the row | value.js API row | **§E18** (*"V-γ's hole is the value.js API row's"*) | `F-W5.md` §4 edge (*"V-γ attribution (`userSlug` null ⇒ no version row)"*) |
| **VO-6** | **The client problem+json resolution chain, value twin.** `demo/platform/transport/api-problem.ts` resolves `title` to `response.statusText` (`:40`) and narrows a non-string `detail` to `undefined` (`:42`) — **the same two discards as the fourier twin**, in the independently-authored copy (inv-16). The act: resolve `detail ?? title ?? statusText ?? fallback`, treat a structured `detail` as content, never render an empty string. ⊘ **Seat-measured addition beyond §4's enumeration, recorded as such** (this seat, 2026-09-17), **renaming nothing and re-booking nothing**: it is the value half of a clause that binds both ends | value.js API row | **§F5** (RULE + the `$V` witness bullet) | `F-W5.md` §4, `F.W5 → value.js API row` (the edge's own scope: *"value-side obligations, never fourier defects"*) |
| **VO-7** | **D9 reconciliation, disclosed not overwritten.** value.js persists a **three**-state visibility (`public` / `unlisted` / `private`, `api/src/modules/palette/model.ts:61`) while this contract's union speaks two. The obligation is to **reconcile explicitly** — map or widen, in the open — because **the contract does not silently overwrite a shipped model**, and **no clause may contradict ruling D9** | value.js API row | **§E4** (the disclosure paragraph) ⊕ **§D17**'s D9 quotation of record | `F-W5.md` §4 edge (*"D9 reconciliation: value.js persists 3-state visibility"*) |
| **VO-8** | **G18's value-side probe** — the mechanical casing/envelope check each side runs **against this document**, never against its sibling (inv-26), in the **one-sided** form §E3 ruled | value.js API row | **§A2.4** (the casing limb) ⊕ **§E3** (the re-authored §6, verdict `N/A — RE-SCOPED`) | `F-W5.md` §4 edge (*"G18's value-side probe"*) ⊕ gate **G18** |

**VO-0 — the one obligation that is an explicit NON-obligation, stated so it cannot be re-opened.**
**TA-4 / the diff clause: value.js owes NOTHING.** Under owner ruling **R1** (`§0j.D` F-SS4REST, quoted
at **§E3**) value.js is **re-scoped out of the diff clause**; `atomdiff.ts` is wholly excised and stays
excised, **value.js runs no diff probe and is not measured by one**, and any report marking the value.js
diff probe *missing*, *pending* or *RED* is **mis-reading the scope** — the verdict spelling is
**`N/A — RE-SCOPED (F-SS4REST R1)`**. Cited at **§E3** and at `F-W5.md` §4's edge (*"TA-4 per G4's
ruling"*).

**Bands with no value-side act, stated rather than left silent.** **§F** asks value.js for exactly one
act — **VO-6** — and nothing else: the equation surface (`/api/equations/*`, its models, its renderers
and its client) exists only in the fourier tree. **§G asks value.js for nothing at all**: value.js ships
no canonical geometry, no contour extractor and no build-time geometry artifact, so every §G act homes at
F.W6 / the build lane. **These silences are measured, not assumed** — ⟨cmd⟩ base `$V`,
`/usr/bin/grep -rl 'fourier-paths\|extractContours\|SimplifyRequest' api/src src demo --include='*.ts'
--include='*.vue' | wc -l` → **0** (double-run, this seat) — and they are printed here because an
unstated silence in an obligation list is indistinguishable from a dropped row.

---

*§A–§G and the value-side obligation list are authored (F.W5 units b · c · d, 2026-09-17). The inline
ruling block `contract/OWNER-RULINGS-F.W5.md`, the co-signature relay and the E13 ledger row land at unit
e — **a contract nobody received is not co-signed** (G20). Clause ids in this file are preserved verbatim
for sibling cross-references; a sibling's mis-keyed cite is conformed **at the sibling** (R-1e). No
clause is numbered D9 — `D9` is reserved throughout for the ruled owner decision, which no clause may
contradict. Every `K-n` citation in this document carries its record: `fr-EquationView K-13` at §F2 and
`fr-ConvergencePlot K-13` at §F7 are two different records' kills, and a bare `K-n` may not be quoted as
a lock or entered into a set-difference.*
