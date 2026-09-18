# thrice-PE-api — SKEPTIC 1 (assume the program is WRONG)

Target: `armB/program-PE-api.md` (11 waves, 8 OD rows). Method: every load-bearing claim
re-probed on tree this session (value.js `tranche-u@db77dbd8`, fourier-analysis live tree,
demo working tree). Verdict up front: **the program is evidence-hollow at four of its eight
OD rows, its census is provably incomplete at the route level while claiming "zero silent
drops", two of its flagship gates are unimplementable or self-graded, and its decomposition
is process-heavy against C21.** The skeleton (restore the rail, fix the oklab boundary,
close fourier's gaps, displace tests) survives; the adjudication layer and half the docket
do not. Counter-program in §6.

---

## §1 — REFUTED OR UNGROUNDED EVIDENCE CLAIMS

### A1. OD-api-4 ("anon palettes are a live product affordance") — REFUTED ON TREE
The program recommends RATIFY DIVERGENCE because "value's anon palette save is a live
product affordance." **Uncited, and false for every shipped call path.** Both demo paths
that hit `POST /palettes` establish a session first:
- `demo/palettes/usePaletteActions.ts:41-43` — `onPublish` runs `ensureUser()` +
  `session.ensureSession()` before `createAndSavePalette`, and RETURNS on failure
  ("Failed to create session").
- `demo/palettes/useSlugMigration.ts` `publishAllLocal` — `await session.ensureSession()`
  before the create loop.
- `demo/platform/auth/useUserAuth.ts:96-102` auto-registers when no slug exists.
Local-first saves never touch the backend (the save-P0 comment in `usePaletteActions.ts`).
So `userSlug: null` (`routes/crud.ts:85`) is server-side permissiveness exercised by NO
shipped client. **Worse: the program silently reverses its own truth-sweep** — sweep
synthesis 4 recommends "align anon-ownership policy (recommend fourier's non-null owner)";
the program flips to RATIFY with zero acknowledgment of the flip and zero new evidence.
The evidence supports the sweep, not the program. The row must either flip to CONVERGE
(non-null owner) or go to the owner with BOTH readings and this census on the sheet.

### A2. F-11c (idempotency → Mongo TTL) — OVERTURNS A SANCTIONED DECIDED RECORD, UNCITED
`api/src/platform/http/idempotency.ts` header, on tree today: the LRU store is "the
sanctioned single-replica KISS relaxation — **D2 §3 P2** — and the body-hash conflict
response is now contract-faithful regardless of backing," with an explicit rationale
(bounded store, no write per mutation, per-process like rate-limit and the suspended-user
cache, job = collapse client retries, not cross-restart exactly-once). The program calls
this a defect ("the in-process store forgets replays across restart/multi-instance") and
converges it in a wave **without an OD row and without citing the record it overturns** —
while granting OD rows to lesser divergences (ETag basis, OD-api-8). The "multi-instance"
premise assumes a deployment shape the record explicitly says does not exist
(single-replica). Under the program's own inherited discipline (record-state trichotomy,
cite-to-overturn, chronics-decided/no-re-booking), this is a re-litigation smuggled in as
implementation. It must be an OD row with D2 §3 P2 on the sheet — the owner may well still
choose Mongo TTL, but not silently.

### A3. OD-api-6 ("silent cursor restart = masked fallback") — MISLABELS A DOCUMENTED SEMANTIC
`api/src/modules/palette/service/crud-list.ts:53-55`, on tree: "Befitting graceful per D3:
a malformed/stale cursor is treated as 'start from beginning' — **the documented pagination
semantic, not a silent data-loss. (D.W2 Lane D rationale.)**" The program brands this a
"masked fallback (the §7 edict class)" without citing the D3/D.W2 record it condemns.
Converge-to-400 may still be the right verdict (fourier's `cursors.py:65` is the stricter
contract), but the OD row as written presents one side's behavior as a defect and the
other's as truth. Same disease as A2: **everywhere fourier differs from value, the program
assumes fourier is right — even where value's side carries a named decided record.** The
docket needs both records cited, or the adjudication is theater.

### A4. F-04 framing + gate — HALF-RIGHT DEFECT, IMPOSSIBLE-AS-WRITTEN GATE
The rejection of hsl/oklch/named at the boundary is not itself "the live product defect" —
it is the **deliberate D-HARDEN-3 §3 W4 fail-explicit cure** (oklab.ts header: the previous
behavior silently dropped unrecognised formats, leaving at-rest data inconsistent). The
defect-family member is the INLINE DUPLICATE IMPL (the header itself orders: "replaced
wholesale with a `parseCSSColor → convert(oklab)` pipeline" once the api consumes the
library). Direction right, framing wrong — and the framing matters because the acceptance
gate inherits it. Second: the "round-trip equivalence test vs the old impl … (no drift on
the previously-accepted domain)" is numerically naive — two independent sRGB→OKLab
pipelines (inline `linearize` + matrices vs the library's) will differ in low-order bits;
exact equality fails, and an unstated tolerance makes the gate whatever the implementer
wants. The gate must state a tolerance derived from the consumer (the color-distance search
radius semantics), or it is vacuous.

---

## §2 — CENSUS INCOMPLETENESS (the "zero silent drops" claim fails at the route level)

The program's §5 declares "zero silent drops in this program," but its row universe is the
sweep's §3.4 — which is hand-enumerated and provably incomplete. Probed this session:

### B1. The restore-verb divergence — DROPPED ENTIRELY
fourier ships `POST /{slug}/restore` (soft-delete undo within grace,
`routers/visualizations.py:430-457`). value **deliberately retired** its restore route —
`api/src/modules/palette/routes/crud.ts:160-165`: "NOTE (V·W45 item 1): the legacy
`POST /:slug/restore` soft-delete-undo route is RETIRED … the honest release surface is
the immutable versions/revert rail … resolves to a typed 404." A first-order same-facility
divergence (soft-delete recovery) with an **intact deliberate record on value's side** —
exactly the CONVERGE-or-RATIFY + record-state material the program claims to exhaust —
absent from sweep §3.4, absent from all 8 OD rows, absent from every wave. C7 demands the
soft-delete/history facility "proven and completely addressed"; this program cannot even
see the divergence.

### B2. revert + versions/:hash — value-HAS, fourier-LACKS, unrowed
value: `POST /:slug/revert` + `GET /:slug/versions/:hash` (`routes/versions.ts`). fourier's
router has `GET /{slug}/versions` only — no revert, no get-version-by-hash (route table
probed; `visualizations.py:860` is the only versions route). The sweep's §3.4B
(value-has-fourier-lacks) lists votes/flags/oklab-search/tier/hashed-tokens and misses the
**history verbs themselves** — in a program whose charter facility list starts with
"history." Whether the verdict is port-to-fourier or ratify-domain-divergence, it is a
mandatory row.

### B3. Consequence: F-05's gate closes green over an incomplete universe
F-05's acceptance gate is "every §3.4C divergence row has a verdict." With B1/B2 outside
§3.4, the gate is **census-closure-by-assertion** — the exact class the canon kills by
enumeration (the RG-2 lesson). Nothing in the program re-derives the divergence table from
the trees; it inherits the sweep and audits nothing. (Minor same-class residue: fourier's
`GET /api/gallery/cursor` public read-alias is also unrowed.)

---

## §3 — GATE ATTACKS (unimplementable, hostage, or self-graded)

### C1. F-08e "openapi route-census diff vs prior tag" — NO BASELINE EXISTS
Probed: `git tag` carries library tags only (v1.1.0…v4.0.0); the api has **no tags of its
own**; `openapi.json` is **generated from the live mounted registry at runtime** and is not
a committed artifact (`git ls-files | grep openapi` → `modules/meta/openapi.ts`, the
generator, only). "Diff vs prior tag" therefore requires booting the prior tag's service to
regenerate its spec — not a one-line gate, and against a LIBRARY tag boundary that has
nothing to do with api releases (api is at 2.0.0 while the repo tags say 4.0.0). As written
the gate can never run; as approximated it never fires. Replace with a **committed
route-census baseline file** diffed in CI (red on undeclared removal, updated only alongside
a tombstone row) — same law, implementable in both repos.

### C2. F-01's gate is hostage to another wave
F-01's census gate "cannot close green until OD-api-2 lands a verdict and its wave
discharges or tombstones the row." A wave whose acceptance gate is structurally un-closable
by its own work is mis-specified — it either sits RED for the program's whole life
(partial-counted-as-done risk at close) or quietly gets re-scoped. The census-complete gate
belongs at program close; F-01's own gate should be "every route/facility has a row and a
status," which its own work CAN close.

### C3. F-05's gates cannot fail
"Every row has a verdict — no row left 'noted'" and "two consecutive clean thrice passes"
are self-graded process assertions. No mechanical RED state exists. Combined with §2 (the
row universe is incomplete), F-05 is a wave that cannot fail examining a list that was
never audited.

### C4. F-07's mirror-sync invariant is unenforced — the drift it exists to kill
"Both suites consume the same vector file hashes" — checked by WHAT? Any actual
hash-equality check across the two repos IS the cross-repo step the wave forswears; without
it, the mirrored fixture files drift silently, which is precisely the doc-anchored-parity
failure mode (sweep §3.5) the wave claims to fix. Net effect: a new abstraction layer
(vector corpus + per-repo consumer shims) that reproduces the current guarantee level.
Both repos already own real conformance batteries (fourier: 9 test_ files; value: 5
conformance suites + `_parity.ts`). Landing the converged rows as ordinary tests IN each
battery gives the same witness with zero new apparatus — C21 by the letter.

### C5. Thin waves. F-02 is a tombstone plus one lint rule (its gate honestly labeled
born-GREEN); F-10 is two spec paragraphs plus an expected-green test plus a banked
facility. Neither carries a wave's weight; both exist to make the wave count look like a
program.

---

## §4 — PROCESS, KISS, ALTITUDE

### D1. Six of eleven waves are documents
01 (spec), 02 (ratification+wire), 05 (adjudication), 07 (vectors), 09c (layout thrice),
10 (spec, mostly banked). Real code lands in 03, 04, 06, 08, 11. C21 is explicit: "little
time on contrived gates or process; the majority on direct code implementation." The spec
work is mandated (C7) — but it is ONE document family (facility spec + contract v3 + share
section) split across three waves and two homes for no stated reason.

### D2. F-09c convenes a 3-seat Fable thrice loop to ratify its own going-in recommendation
("KEEP FastAPI-idiomatic horizontal layout"). C17: Fable cost is outrageous, every seat
file-scoped and tight. A thrice loop over a foregone conclusion is the most expensive
possible way to write one contract paragraph. Thrice belongs where the artifact is
genuinely contested (the divergence verdicts), once, over the whole contract document.

### D3. Contrived dependency chain delays the free wins
08 (test displacement — pure mechanical, zero risk, land-today) waits on 02, which waits on
OD-api-1 + 01. The stated coupling ("boundary rule shares the check home") is a file-layout
convenience, not a real dependency. Mechanical hygiene has no business queueing behind an
owner ratification.

### D4. F-03's resurrection recipe is unpinned
"git history pre-T.W1 (the J.W2 tree)" — the canon's own recipes are pinned
(`164343c1^:…`). Probed: the excision commit is **`a8ff7792`** ("refactor(T.W1 · api ·
TA-4): excise the write-only atom-diff apparatus", 2026-07-10); the recipe is
`git show a8ff7792^:api/src/lib/crud/atomdiff.ts` (+ routes/service/model). §7 law 2/3
discipline; the program hands execution a scavenger hunt.

### D5. F-03's DELTA obligation is mis-scoped as conditional
"IF remix is surfaced in the browse/palette-card UI" — fork IS surfaced today:
`demo/palettes/useVersionHistory.ts:103` calls `forkPalette` from the version-history flow.
Retiring the fork verb FORCES a UI migration; the DELTA pair is mandatory, and the demo
migration is real in-wave UI scope, not a rider.

### D6. Fourier implementation ownership is asserted, not granted
The landing map waves off P4.5 with "fourier waves are in-tranche per C8." C8 puts
fourier IN SCOPE of the mega-tranche; it does not say this program's agents edit the
fourier tree directly. The canon's only articulated cross-repo mechanism is
direct-edits-require-owner-grant / spec-dispatch (P4.5). Whether F-06/F-09 are executed
in-tranche or dispatched as specs into fourier's coordination docs is an open protocol
question the program decided for itself, silently. One docket line fixes it.

---

## §5 — WHAT SURVIVES
The truth-sweep is largely excellent and the program's skeleton is right: TA-4 restoration
(fourier route/envelope/atomdiff evidence all confirmed on tree), the fourier gap trio
(plaintext `uuid4` token `_id` confirmed at `routers/sessions.py`; likes/views fields with
no write route confirmed; flag URNs unmounted), oklab-on-the-library (the file orders its
own replacement), 28 colocated test files confirmed, `_parity` genuinely unwired (api
scripts: dev/build/start/test only), OD-api-1 STAY reasoning sound, OD-api-8 ETag
ratification defensible. The disease is in the adjudication layer: incomplete census
universe, fourier-is-right bias over value's decided records, and process-shaped padding.

---

## §6 — COUNTER-PROGRAM (8 waves, title + intent grain)

**S-01 | both | THE MACHINE CENSUS.** Generate both route tables from the live registries
(value `openapi.json` generator; fourier FastAPI route introspection), machine-diff into
THE divergence/gap table — every asymmetry enumerated (incl. restore/revert/versions:hash/
gallery), each row pre-classified EXISTS / GAP / DIVERGENT / RECORDED-DECISION with the
on-tree record quoted (D2 §3 P2, D3 Lane D, V·W45 item 1, D-HARDEN-3, TA-4). Gate: the
table is generated + record-annotated, closed by enumeration not assertion. (Opus; the row
universe for everything downstream.)

**S-02 | both | THE CONTRACT DOCUMENT (one home).** Facility spec + CRUD-CONTRACT v3
divergence verdicts + share-URL backend section + layout vocabulary note — ONE document
family, thrice-looped ONCE whole (the only Fable-heavy seat). Every S-01 row gets a
verdict; every verdict overturning an on-tree record cites it by name. OD docket ships from
here (amended: OD-4 flipped-or-contested per A1; OD-6 with both records per A3; NEW
OD-idempotency carrying D2 §3 P2; NEW OD-restore-verb carrying V·W45; NEW
OD-history-verbs (revert/versions:hash); NEW OD-fourier-execution-mode per D6).

**S-03 | both | MECHANICAL HYGIENE, DAY ONE (no dependencies).** value: displace the 28
colocated test files into an isomorphic `api/test/` tree + isomorphism check; wire
`_parity` as a CI step; commit the route-census baseline file + CI diff (the implementable
§7-law-1 analog, both repos). fourier: dissolve `slugs.py` shim, unify the two test homes.
All born-RED where the defect is live, all landable before any OD ratifies.

**S-04 | value | R-REMIX RESTORATION.** Pinned recipe (`a8ff7792^`), fourier-referenced
envelope/no-op semantics, fork→remix convergence WITH the version-history UI migration
in-scope and a mandatory DELTA pair, by-name fork tombstone caught by the S-03 baseline
gate. (Born-RED ×3 as the program had it — that part was right.)

**S-05 | value | OKLAB ON THE LIBRARY.** Replace the inline pipeline wholesale (the file's
own order), acceptance-domain decision as a contract row in S-02, equivalence gate with a
STATED tolerance derived from the color-search radius semantics.

**S-06 | fourier | THE GAP TRIO.** like/vote write route, user-facing flag route,
session-token hashing at rest — executed in-tranche or dispatched as specs per the
OD-fourier-execution-mode verdict; patterned on the value twins; born-RED ×3.

**S-07 | value | CONVERGENCE LANDINGS (only what the docket actually converges).** Cursor
behavior, visibility transition guard, restore-verb outcome, idempotency backing IF the
owner overturns D2 §3 P2 — each landing citing the superseded record; demo client updated
for any wire-visible change.

**S-08 | both | WITNESS CLOSE.** Converged rows land as ordinary tests in each repo's OWN
existing conformance battery (no vector corpus, no shims); program zero-drop check runs
against the GENERATED S-01 table. Close gate: every S-01 row terminated as
implemented / ratified / owner-decided / tombstoned.

Net: −3 waves, −2 spec homes, −2 thrice loops, +4 docket rows the program could not see,
every overturned record cited by name, and every gate either machine-checkable or deleted.

— Skeptic 1, thrice-PE-api, 2026-07-19.
