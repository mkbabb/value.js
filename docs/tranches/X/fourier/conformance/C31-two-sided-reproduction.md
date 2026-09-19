SERVED MODEL: claude-opus-5[1m]

# C31-two-sided-reproduction.md — the R6-8 seam: reproduction ATTEMPTED, then the F8-C31A / F8-C31B split

**Wave**: X.F.W8, unit **`c`** (Track C · X·F). **Spec**: `docs/tranches/X/fourier/waves/F-W8.md`
— §3 **§J row J1** (*the seam itself — the wave's reason to exist*) · §4 gate **G3** ⊙ · §5b · §5c's
**F.W9/W10** edge row. **Record**: `docs/tranches/X/execution/C/F-W8.md`.
**Gate turned here**: **G3** — *two-sided C31 reproduced, then isolated*.
**Date of measurement**: **2026-09-19**, at this seat's own clock, against fourier **`21e11b0`**
(worktree **0** dirty, double-run `0 ≡ 0`) and value.js branch `tranche-u`.

---

## §0 What this file is, and the law it is written under

This file discharges **one** sentence of the spec: *"**REPRODUCE, then SPLIT.**"* It is a
**document**, not a test suite: F.W8 owns no product source in either repo (§1c, §2b), so what lands
here is the reproduction's **receipt** and the two successor controls' **specification**, each
falsifiable, each with a named owner for its bytes.

**Two verbs, never conflated** (the spec's own ordering): **reproduction is the DIAGNOSTIC; isolation
is the ACCEPTANCE.** §1–§2 are the diagnostic. §4–§6 are the acceptance. §3 is the mechanism that
joins them, and it is where this seat's own finding lives.

### 0.1 Locks binding this unit, each carried at its own site below

| lock | where it binds, in this file |
|---|---|
| **OG-F1** (COHESION §0j.D) — **FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE** | §2.5 (the measurement enters by **adoption**, never by re-derivation) · §7 (the denominator is **not** re-cut here) |
| the **verbatim constraint set** — *raw receipts · the same production validator · an owner-only bypass · all-non-owner retention · no caller-supplied expected code* | §4.2 and §5.2, discharged member by member, per control |
| **denominator OWNER-FROZEN** — 30/37 terminal; **32/38 only if lawfully replaced** | §7, and **no percentage is published anywhere in this file** (X-9) |
| **fourier is READ-ONLY, ALWAYS** — zero bytes, no output file, no scratch, no run that writes | §2.3 — this is not a side condition here, it is **half the reason the reproduction cannot run** |
| **FR-GIG-5 mirror** — no wave is credited with another's cure | §1.2 — the one commit that moved the anchor is named from the git record and **nothing of it is claimed** |
| **§2c serial lock** — `b`/`c`/`d` share the `F8-CLIENT-*` / `F8-C31*` identity space | §9 — this unit mints **exactly two** ids, both `F8-C31*`, and commits before `d` opens |
| **R-5 record-qualification** — a bare short id is not an identity | every short id below is written with its record |
| **D-19 MEASURE-AT-OPEN** — re-resolve every fourier anchor before citing it | §1.1, performed **first**, before a word of §2 was written |
| **E-3** — dated specs, the adjudicated registry and prior evidence are IMMUTABLE | §1.3 — the open seat's finding **F-1** is corrected by an **addendum-beside**, never by a rewrite |

### 0.2 Operands, separated — and the separation is load-bearing here

| operand | what it is | how it may be used |
|---|---|---|
| **EVIDENCE (frozen)** | the adjudicated lane row `docs/tranches/V/megatranche/audit/codex-provenance/intakes/lane-fourier-r3-r6.md` row **R6-8** (line-citable: the frozen corpus carve-out, §0 addressing law item 2) ⊕ the AUXILIARY delta `FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md` §5 | **quoted**, never re-derived. The C31 receipt enters this file **only** as an adopted quotation with its ⟨cmd⟩ |
| **THE CONTRACT (consumed)** | F.W5's `contract/J-diff-shape-v2.md` §B and `contract/operation-register.md` §2 | **read-only**. F.W8 consumes; editing either would re-rule what F.W5 ruled (§2b) |
| **THE LIVE TREE (measured)** | `/Users/mkbabb/Programming/fourier-analysis` at `21e11b0` | **read-only measurement carve-out** (§0): `grep`/`sed`/`git log` only, dated and attributed. **Zero bytes written, in any verb** |

**QUOTE-BY-COMMAND.** Every cross-file quotation below is the pasted output of a command run **by
this seat, this sitting**, with the command stated beside it as a **⟨cmd⟩** note. Bases are declared
in-block beside their first use (R4-2.3):

```
F='/Users/mkbabb/Programming/fourier-analysis'          # READ-ONLY, always
V='/Users/mkbabb/Programming/value.js'
```

---

## §1 The seam, measured at this seat's own clock FIRST (D-19)

The spec's J1 and G3 cells both rest on three anchors. **Not one of them was taken on trust.**

### 1.1 The three anchors, re-resolved at the live tree

| # | anchor, as the spec and the intake state it | measured at `21e11b0` | verdict |
|---|---|---|---|
| **A-c1** | the client leaf — `web/src/lib/api.ts:420` `export async function updateVisualization(` | ⟨cmd⟩ (base `$F`) `grep -n 'export async function updateVisualization' web/src/lib/api.ts` → **`497:export async function updateVisualization(`** (double-run, `497 ≡ 497`) | **DRIFTED +77.** The *declaration* is unchanged; its address is not |
| **A-c2** | C31's mutation `before` string — `{ method: "PATCH", body: { ...patch }, headers }`, at `:430` | ⟨cmd⟩ `grep -n -F '{ method: "PATCH", body: { ...patch }, headers }' web/src/lib/api.ts` → **`507:        { method: "PATCH", body: { ...patch }, headers },`**; ⟨cmd⟩ `grep -c -F …` → **1**, double-run `1 ≡ 1` | **DRIFTED +77, BYTE-IDENTICAL.** The exact string C31 replaces is still present, exactly once |
| **A-o1** | the operation leaf — `api/routers/visualizations.py:350` `@router.patch("/{slug}")` | ⟨cmd⟩ `sed -n '350p' api/routers/visualizations.py` → **`@router.patch("/{slug}")`** (double-run identical); `:351` → `async def update_visualization(slug: str, body: VisualizationUpdate, request: Request) -> Response:` | **HOLDS BYTE-EXACT, at its published line** |

### 1.2 The drift has exactly ONE cause, named from the git record — and it is a DRIFT, not a CURE

⟨cmd⟩ (base `$F`) `git log --format='%h %ad %s' --date=short --since=2026-08-01 -- web/src/lib/api.ts`
→ **one commit**:

```
dabbb17 2026-09-18 fix(x-f-w4/.f): SP-12 ⊕ EV-L·M-4 ⊕ IU-25 — one answer to a missing admin token,
                   a backoff an abort can reach, and three client verbs nobody called
```

⟨cmd⟩ `git show --stat dabbb17 -- web/src/lib/api.ts | tail -2` → `web/src/lib/api.ts | 155 +++---`,
**116 insertions, 39 deletions**. ⟨cmd⟩ `git show dabbb17^:web/src/lib/api.ts | grep -n 'export async function updateVisualization'`
→ **`420:`**; ⟨cmd⟩ `git show dabbb17^:web/src/lib/api.ts | grep -n -F '{ method: "PATCH", body: { ...patch }, headers }'`
→ **`430:`**.

**The arithmetic closes exactly, and that is the whole proof**: `116 − 39 = 77`; `420 + 77 = 497`;
`430 + 77 = 507`. **One commit accounts for the entire displacement of both client anchors**, and it
accounts for it as *insertions above them* — **X.F.W4 unit `f`**, whose subject is an admin token, an
abortable backoff, and three unclientted verbs. It did not touch `updateVisualization`'s method, its
body, or its shape.

The operation side did not move at all: ⟨cmd⟩
`git log --format='%h %ad %s' --date=short --since=2026-08-01 -- api/routers/visualizations.py` →
**no output**. The file has taken **zero commits** since the intake verified `:350` live, which is
why `:350` still resolves byte-exact two months later.

▲ **FR-GIG-5 mirror, discharged at the only place it could bite.** The wave that moved the anchor is
**X.F.W4 `.f`** (`dabbb17`), named from the git record rather than inferred. **F.W8 claims no credit
for it** — and there is nothing here to claim, because it landed no cure to C31: it inserted lines
above the target and left the target's bytes alone.

### 1.3 ⊘ FINDING **C-1** — the open seat's reading is CORRECTED at the bytes (addendum-beside, E-3)

The wave record's baseline finding **F-1** (`docs/tranches/X/execution/C/F-W8.md`, §B.4) reads
*"G3's client leaf reads **CURED** at HEAD — the gate is still RED, the *witness* is not"*, and
concludes *"**The two-sided REJECT may not reproduce at this HEAD.**"*

**The conclusion is right, the word is wrong, and the difference matters.** Measured at §1.1:

- **nothing is cured.** The client function's body still carries `{ method: "PATCH", … }`
  **byte-identical** to C31's mutation `before` string, exactly once; the operation still declares
  `@router.patch("/{slug}")`. The witness is **DRIFTED**, not cured.
- **the match at HEAD is the control's PRECONDITION, not its cure.** C31 does not *observe* a
  mismatch — it **introduces** one, by replacing `PATCH` with `PUT` on the client side. A client and
  an operation that agree on the method at HEAD is exactly the baseline the control requires in order
  to mutate. Reading the agreement as the defect's disappearance inverts the instrument.

The open seat's own instruction — *"This is unit `c`'s subject, measured at unit `c`'s own clock"* —
is what produced this correction, and its caution (*never a gate quietly declared GREEN*) is
**sustained in full** by §2.4 below. **The reading is dated and preserved; only its word is
corrected**, beside it, never over it (E-3). The reason the two-sided REJECT does not reproduce is
**not** in the product at all — it is §2.

---

## §2 The reproduction ATTEMPT, and its honest result

### 2.1 What "reproduce C31" requires — the instrument, enumerated in five members

C31 is not an assertion about source text; it is a **run of a control against a derived registry by a
validator**. Reproducing it requires all five of:

| # | member | identity, from the frozen evidence |
|---|---|---|
| **M1** | the control **plan** | sha256 `d1ca81a595fc5cbc94061afd196a2854b84b80d073ecd2a95e52d490246c21cf` |
| **M2** | the **raw** run capture | sha256 `24bc5d7550253263572acc55aa50b02a29717f7eb0bdcbb92d6ed508f6f49ae5` |
| **M3** | the **receipt** | sha256 `cc5bdadffa0c35f3ab7780eeb0ddbcb2f6b4e848cffa311c1fe20658e6742d9f` |
| **M4** | the **derived registry** carrying `operation:PATCH:/api/visualizations/{slug}` with `"clients": ["client:updateVisualization"]` and `"clientDisposition": "CLIENT_MATCH_SOURCE_DERIVED"` | the propagation mechanism itself — without it there are no two leaves to fail |
| **M5** | the **production validator** that emits `{"code":…,"errors":[…],"controlId":…,"verdict":…}` and exits **43** | the verdict-bearing instrument |

M1–M3 are the SHAs the lane reproduced exactly at row **R6-7** (⟨cmd⟩ base `$V`,
`sed -n '135,150p' docs/tranches/V/megatranche/audit/codex-provenance/intakes/lane-fourier-r3-r6.md`,
this seat, 2026-09-19): *"All three SHAs reproduced exactly"*.

### 2.2 The attempt — each member searched for at the live tree, with its receipt

All probes base `$F`, run at this seat, **each double-run**:

```
⟨cmd⟩ grep -rn "CLIENT_MATCH_SOURCE_DERIVED" --exclude-dir=node_modules --exclude-dir=.venv . | wc -l
  run1: 0      run2: 0          ⟶ M4 ABSENT
⟨cmd⟩ grep -rn "control\.wrong-reason"        --exclude-dir=node_modules --exclude-dir=.venv . | wc -l
  run1: 0      run2: 0          ⟶ M5's verdict vocabulary ABSENT
⟨cmd⟩ grep -rn "R4\.C31"                      --exclude-dir=node_modules --exclude-dir=.venv . | wc -l
  run1: 0      run2: 0          ⟶ M1/M2/M3 ABSENT
⟨cmd⟩ find . -path ./node_modules -prune -o -type d -name "*control*" -print
  ./docs/audits/runs/2026-06-04-control-pane-hierarchy      (a UI audit — not a control harness)
  (the two remaining hits are vendor: sympy's physics/control and a glass-ui dist styles dir)
```

**The nearest in-tree candidates for M5 were examined rather than assumed**, and neither is it:

- ⟨cmd⟩ `sed -n '1,20p' scripts/conformance-probe.sh` → *"E.W10 δ T7 — Cross-repo CRUD-CONTRACT
  v2.0.0 conformance probe"*, which probes **deployed endpoints** (`https://api.fourier.babb.dev`,
  `https://api.color.babb.dev`). It is a **runtime network probe**: no client↔operation leaf model,
  no `control.*` code, no control id. It is also a live probe, which §5.2's parsimony and this
  wave's read-only law both forbid this seat from running.
- ⊘ **And the five source-level "conformance skeleton" scripts are all vacuous.** ⟨cmd⟩
  `cd scripts/conformance && for f in *.sh; do printf '%s %s\n' "$f" "$(grep -c '^exit 0$' "$f")"; done`
  → **5 files, each with a bare `exit 0`** (double-run identical): `grep-no-check-then-insert.sh` ·
  `grep-no-hash-in-url.sh` · `grep-no-internal-id-in-url.sh` · `grep-no-shared-framework.sh` ·
  `grep-no-unbounded-nin.sh`. Their own comment says so — ⟨cmd⟩ `cat scripts/conformance/grep-no-hash-in-url.sh`
  → *"Conformance skeleton — C1.1 … Exit 0 iff zero matches … **Placeholder until W3.**"* followed by
  `exit 0` **unconditionally**. ▲ **Named, not cured, and not re-booked**: this is a fourier-tree fact
  recorded because §4.2/§5.2 must say what *"the same production validator"* refers to, and the
  honest answer is that the only source-level validators in tree are five unconditional greens.

The frozen evidence says the same from its own end — ⟨cmd⟩ (base `$V`, same `sed` as above), row
**R6-9**: *"`ls controls/` stops at `R4.C31`; root `ls` → no `CONTROL-RESULTS*`, no source-plan
publication, no `REPORT.md`, no `checksums.sha256`, no hostile artifacts. Exact."* — and row
**R6-2**: *"Identities and mtime ordering unverifiable (serialization unpublished; **access
withdrawn**)."*

### 2.3 The LAW arm — even with the instrument in hand, this wave may not run it

C31's mutation, quoted from the frozen lane row R6-8 (same ⟨cmd⟩):

> `{"kind":"replace","target":"web/src/lib/api.ts","before":"{ method: \"PATCH\", body: { ...patch }, headers }","after":"{ method: \"PUT\", … }"}`

Its `target` is a **fourier byte**. Spec §2b: *"`/Users/mkbabb/Programming/fourier-analysis/**` —
whole tree, read-only law"*; §5c: *"**READ-ONLY, ALWAYS** — Zero fourier bytes"*; this unit's own
lock: *no output file, no scratch, no run that writes a byte*. **A replace-in-file control is a write
by definition**, so the reproduction is barred by law independently of the instrument's absence.

The authorizing document agrees from its own side — ⟨cmd⟩ (base `$V`)
`sed -n '80,98p' docs/tranches/V/megatranche/coordination/FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md`
→ *"**This delta authorizes neither construction nor execution.**"*

### 2.4 ⊘ **NON-REPRODUCTION — stated as a finding, never as a silent GREEN**

| question | answer, with its ground |
|---|---|
| Did the two-sided REJECT reproduce at this seat? | **NO.** |
| Because the defect is cured? | **NO — and this is the load-bearing negative.** §1.1: both leaves stand, the mutation's `before` string is present byte-identical, the operation decorator is unchanged. §1.2: the only commit that touched either file inserted lines above the target. **Nothing cured it.** |
| Because the instrument is gone? | **YES, in four members of five.** §2.2: M1, M2, M3, M4 and M5's vocabulary each return **no output** at the live tree, double-run; access to the 484-file frozen packet was withdrawn (R6-2); R6 declared `NO_SUCCESSOR` (R6-1). |
| Because the law forbids the run? | **YES, independently.** §2.3: the control's sole act is a write to a fourier byte. |
| So what is G3's reproduction limb? | **RED, and RED for a stated reason.** A diagnostic that cannot be run is not a diagnostic that passed. **F.W8 claims no GREEN it did not execute** (§4's split-verdict discipline). |

▲ **The distinction between the two "NO"s is the entire value of this section.** Had the witness read
*cured*, the correct act would have been to strike C31 and re-cut the denominator. It does not; the
seam stands; the **instrument** died. Striking a live defect because its dead instrument no longer
fires would be the masking-fallback class this tranche convicts — and it is exactly what §1.3's
correction prevents.

### 2.5 The measurement therefore enters by **ADOPTION** — OG-F1, and the adopted receipt printed raw

COHESION §0j.D, ⟨cmd⟩ (base `$V`) `sed -n '956,959p' docs/tranches/X/COHESION.md`, verbatim:

> **OG-F1** — **FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE** (the lane's own evidence; measurements
> live-reproduced; R6 `NO_SUCCESSOR`).

The authority/measurement separation it rests on, ⟨cmd⟩
`sed -n '310,318p' docs/tranches/V/megatranche/formation/fourier/CENSUS-2026-08-03.md`, verbatim:

> **Zero UNVERIFIED credit** — every Codex verdict enters the formation through per-claim
> adjudication (M-21); the adjudicated rows are in the master ledger
> (`audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`).

and, four lines on: *"'Zero credit' conflated *authority* with *measurement*. The authority is dead
… The measurements are live, reproducible, and were re-reproduced against the live tree."*

**THE ADOPTED RECEIPT — the raw decoded stdout, quoted at its adjudicated home** (⟨cmd⟩ base `$V`,
`sed -n '135,150p' …/intakes/lane-fourier-r3-r6.md`, row **R6-8**, disposition **ADOPT-AS-FACT**):

```json
{"code":"control.wrong-reason","errors":["client.method.visualization-update","operation.method.visualization-update"],"controlId":"R4.C31","verdict":"REJECT"}
```

exit **43**; `closure: false`; the owning leaf `client.method.visualization-update`; and the
intake's own sentence, verbatim from the same row: *"The normal run exits 43 and changes both
`client.method.visualization-update` and `operation.method.visualization-update`. **Owner suppression
retains the operation leaf, so owning-leaf isolation and nonowner retention fail.**"*

▲ **What adoption does and does not buy.** It banks the **diagnostic** — the two-sided failure is a
fact of record, adjudicated row by row, and G3's first limb is *satisfied as evidence*. It buys
**nothing** toward acceptance: an adopted receipt is not an isolation, and this file does not treat
it as one. **The acceptance is §4–§6, and it is unbuilt** (0 of 2 controls exist).

---

## §3 The mechanism, and where the split must bite in the SUCCESSOR model

### 3.1 The root cause, quoted from the frozen row (same ⟨cmd⟩ as §2.5)

> **Root cause (established here, not in the intake):** … a **client-side** edit. But the *operation*
> leaf embeds a back-reference: `operation:PATCH:/api/visualizations/{slug}` carries
> `"clients": ["client:updateVisualization"]` and `"clientDisposition": "CLIENT_MATCH_SOURCE_DERIVED"`.
> Flipping the client verb breaks the client↔operation match, so the operation leaf mutates too.
> **The two leaves are structurally non-isolable by construction.**

**A leaf whose VALUE is derived from the other side's source is not a leaf; it is a shadow of one.**
That, and not the method literal, is what F8-C31A/B must be built against.

### 3.2 The contract's own binding, consumed (F.W5 STATES; F.W8 ASSERTS)

⟨cmd⟩ (base `$V/docs/tranches/X/fourier/contract`) `grep -n '^## §B' J-diff-shape-v2.md` →
**`465:## §B — R6-8: operation identity independent of client identity (bidirectional)`**, whose
first sub-clause is ⟨cmd⟩ `grep -n '^### B1' J-diff-shape-v2.md` →
**`474:### B1 — The join relation, forward`**.

And the contract's operative sequencing sentence, ⟨cmd⟩ `sed -n '1779,1782p' J-diff-shape-v2.md`,
verbatim (v2 quoting `fr-CanvasControlsDock`'s own `:45`, then binding in its own voice):

> *"**F.W5–W8 rider**: the server-side `(image_slug, contour_hash)` dedupe arm rides the R6-8 seam
> split (C-28 fold) — **the client cure and the operation cure register a two-sided delta until that
> join is split.**"* **F.W5's own binding: the server arm SEQUENCES AFTER the join split (§B1).**

The census stated the consequence for **this wave** in advance — ⟨cmd⟩
`sed -n '370,375p' docs/tranches/V/megatranche/formation/fourier/CENSUS-2026-08-03.md`, verbatim:

> **F.W5** (ADMISSION KEYSTONE) gains two contract constraints (security-description coverage over
> the full 45; **operation↔client separation**) that the co-signed contract must satisfy **or the
> F.W8 conformance fixtures will reproduce Codex's exact two-sided C31 failure.**

### 3.3 ⊘ FINDING **C-2** — the join is SPLIT IN THE CLAUSE and UNSPLIT IN THE REGISTER'S SHAPE

The register is the artifact every fixture and every control is keyed to. Measured at this seat,
⟨cmd⟩ (base `$V/docs/tranches/X/fourier/contract`) `sed -n '156,161p' operation-register.md` → §2.1's
header and **row 4**, verbatim:

```
| # | arm | method | path | handler (`api/routers/…`) | authority class | client function | disposition |
| 4 | public-non-admin | PATCH | `/api/visualizations/{slug}` | `visualizations.py` `update_visualization` | `OWNER-IN-BODY` | `updateVisualization` | `CLIENTED` |
```

⟨cmd⟩ `grep -n "R6-8\|separate relation\|back-reference" operation-register.md` → **no output**
(double-run). The register **carries the client identity as a column inside the operation's own row**
and **never names the law that governs that column**.

**The propagation analysis, cell by cell — because the finding must be exact, not rhetorical:**

| row-4 cell | derived from | would a C31-style client `PATCH`→`PUT` flip change it? |
|---|---|---|
| `method` = `PATCH` | the **operation** source (`@router.patch("/{slug}")`) | **No** |
| `client function` = `updateVisualization` | the **client** source (the function's name) | **No** — the name is untouched by a method flip |
| `disposition` = `CLIENTED` | the **client** source (§2's key: *"a client function exists for this operation"*) | **No** — existence is untouched |

▲ **So the successor register is NOT C31's defect re-instantiated — it carries the opposite failure,
and the opposite failure is just as fatal to the acceptance.** C31 could not isolate because the
`client.method.*` leaf **propagated into** the operation leaf. The register cannot isolate because
the `client.method.*` leaf **does not exist**: no cell anywhere in the register is keyed on the
client's method literal, so there is nothing for F8-C31A to mutate and nothing for the validator to
fail on. **Isolation is unrunnable for want of a leaf, not for want of separation.**

▲ **And the shape is still the shape v2 forbids.** A `client function` column inside the operation
row **is** the client↔operation join stored inside the operation relation — R6-8's exact subject
(*"the client↔operation join belongs in a separate relation, not inside the operation record"*).
Today it propagates nothing because its predicate is *existence*, not *method-match*; the moment the
join's predicate is sharpened to what F8-C31A/B need, the column becomes source-derived in the
C31 sense and **re-manufactures the two-sided failure inside the successor** — which is precisely
what the census warned would happen.

**DISPOSITION — routed, never repaired here.** F.W8 books no canonical row, re-rules nothing F.W5
ruled, and writes no byte of `operation-register.md` (§2b: F.W5's artifacts are read-only operands).
The finding travels as residual **R-c2** (§9) to unit `e`'s FN-6 relay letter, with the owner named:
**F.W5's register** (the join relation) ⊕ the **fourier API row** (the leaf model's bytes). It is
carried into §4.3/§5.3 as a **declared precondition**, so neither control is specified as though the
leaf already existed.

---

## §4 **F8-C31A** — the client-method control

### 4.1 The control, specified

| field | specification |
|---|---|
| **id** | `F8-C31A` |
| **sole mutable target** | `client.method.visualization-update` — **one leaf, one mutation, nothing else in the run is altered** |
| **the mutation** | at the client source only: replace the method literal in `updateVisualization`'s request options, `PATCH` → `PUT`. At `21e11b0` the exact, unique target string is `{ method: "PATCH", body: { ...patch }, headers }` (§1.1 A-c2, `grep -c -F` → 1). ▲ The control addresses it **by string, never by line** — `:420` drifted to `:507` under one unrelated commit (§1.2), and a line-addressed control is a control that silently mutates the wrong bytes |
| **required OWNER result** | **exactly its client-method leaf fails**: the normal run's `errors[]` is the **singleton** `["client.method.visualization-update"]`, `verdict: REJECT`, and the owning leaf named by the receipt is that same leaf |
| **required NON-OWNER result** | **the operation-method leaf and all other predicates RETAIN** — `operation.method.visualization-update` evaluates and **passes**, and no other predicate in the registry changes value between the unmutated baseline and the mutated run |
| **owner-only bypass run** | the same mutation applied, with **exactly the owning leaf suppressed** ⇒ `closure: true`, `errors[]` **empty**. ▲ **This is the run C31 failed**: *"Owner suppression retains the operation leaf"* — a bypass that leaves a residual leaf proves the suppression was not of the owner but of one symptom of a shared cause |
| **gate** | **G3** (this file) |
| **bytes owner** | **fourier API row** — construction and execution are its act, under the owner's freeze. **F.W8 owns no product source** (§1c) and writes zero fourier bytes (§2b/§5c) |

### 4.2 The five verbatim constraints, discharged one by one

The constraint sentence, quoted at its home — ⟨cmd⟩ (base `$V`)
`sed -n '86,92p' docs/tranches/V/megatranche/coordination/FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md`:

> *"Both must use raw receipts, the same production validator, an owner-only bypass, all-non-owner
> retention, and no caller-supplied expected code."*

| # | constraint | how `F8-C31A` discharges it |
|---|---|---|
| **1** | **raw receipts** | three content-addressed artefacts per run — **plan**, **raw** capture, **receipt** — the R6 triplet shape, preserved deliberately (M1/M2/M3, §2.1). The **decoded stdout is banked verbatim**, not summarised: a receipt that has been prose-rendered is not a raw receipt, and §2.5's adopted JSON is the form of record |
| **2** | **the same production validator** | the run uses the validator the product uses — **one instrument for the control and for production**, never a control-only checker. ⊘ **Stated honestly and not assumed: no such validator exists at HEAD** (§2.2 — five bare-`exit 0` skeletons and a live network probe). Naming the validator is a **precondition** (§4.3 P-3), owned by the fourier API row, not a step this control may presume |
| **3** | **an owner-only bypass** | the bypass suppresses **exactly** `client.method.visualization-update` and nothing adjacent to it. Acceptance is on the bypass run's **closure**, not on its verdict string |
| **4** | **all-non-owner retention** | every non-owner predicate is evaluated in **both** runs and compared against the **unmutated baseline**, value by value. Retention is a *measured equality*, not the absence of a complaint: a predicate that stops being evaluated has not retained, it has vanished |
| **5** | **no caller-supplied expected code** | the plan declares a **target** (`client.method.visualization-update`) and **no expected code, no expected error string, no expected exit status**. The validator emits its own code; the receipt records what was emitted. ▲ **The acceptance predicate is derived from the isolation law, not supplied**: *the mutated leaf set equals the declared sole mutable target's leaf, as a set* — a comparison over leaf **identities**, never over a caller-provided literal like `control.wrong-reason` or `43` |

### 4.3 Preconditions — each falsifiable, each with an owner, none assumed

| id | precondition | status at `21e11b0` | owner |
|---|---|---|---|
| **P-1** | the `client.method.visualization-update` leaf **exists** in the model, derived **solely** from the client source | ⊘ **ABSENT** — §3.3: no register cell is keyed on the client's method literal | **F.W5's register** (the leaf + the separate join relation) |
| **P-2** | the `operation.method.visualization-update` leaf exists, derived **solely** from the operation source, with **no client back-reference in its derivation** | **PARTIAL** — the register's `method` cell is operation-derived (§3.3), but the join sits inside the operation row, so the separation is unstated | **F.W5's register** |
| **P-3** | a **production validator** exists that evaluates leaves and emits a verdict with an `errors[]` leaf list | ⊘ **ABSENT** (§2.2) | **fourier API row** |
| **P-4** | the mutation target string is present exactly once in the client source | **MET** — `grep -c -F` → 1, double-run (§1.1 A-c2) | — |
| **P-5** | the run is executed in an environment where writing fourier bytes is lawful | ⊘ **NOT this wave** — F.W9's deploy spine, never F.W8 (§5c) | **F.W9/W10** |

**Three of five preconditions are unmet, and the control is specified anyway — deliberately.** A
control whose preconditions are named and measured is a control someone can build; a control that
assumes them is the *"contract document without a probe"* that `fr-AdminUserList FR-AUL-13`'s lesson
convicts, carried as this wave's own bar at §5c.

### 4.4 The receipt shape the control must emit — and what may NOT be inside it

```
plan     : { controlId, target: "client.method.visualization-update", mutation: {kind, target, before, after} }
           ▲ no expectedCode, no expectedErrors, no expectedExit  (constraint 5)
raw      : the validator's unmodified stdout/stderr + exit status, byte-for-byte
receipt  : { controlId, runs: { baseline, normal, bypass }, errors[], owningLeaf, closure, verdict }
           ▲ errors[] is the validator's, transcribed; the acceptance COMPARES it, never supplies it
```

**Acceptance for `F8-C31A`** = `normal.errors[] == {client.method.visualization-update}` **as a set**
∧ `bypass.closure == true` ∧ `bypass.errors[] == ∅` ∧ every non-owner predicate equal to baseline.

---

## §5 **F8-C31B** — the operation-method control (the mirror)

### 5.1 The control, specified

| field | specification |
|---|---|
| **id** | `F8-C31B` |
| **sole mutable target** | `operation.method.visualization-update` |
| **the mutation** | at the operation source only: the decorator's method verb on the update route. At `21e11b0` the target stands at `api/routers/visualizations.py:350` `@router.patch("/{slug}")`, **byte-exact at its published line** (§1.1 A-o1), with the handler `update_visualization` at `:351`. Addressed by string, for the same reason as `F8-C31A` |
| **required OWNER result** | **exactly its operation-method leaf fails**: `errors[]` is the singleton `["operation.method.visualization-update"]` |
| **required NON-OWNER result** | **the client-method leaf and all other predicates RETAIN** — `client.method.visualization-update` evaluates and passes, unmoved by an operation-side edit |
| **owner-only bypass run** | the owning **operation** leaf suppressed ⇒ `closure: true`, `errors[]` empty |
| **gate** | **G3** |
| **bytes owner** | **fourier API row** |

### 5.2 The five verbatim constraints — discharged identically, with the mirror's one asymmetry

Constraints **1–5** bind `F8-C31B` in the same words and the same forms as §4.2; they are not
restated, they are **the same constraint set** (one home, two citations). **The mirror's single
asymmetry, stated rather than smoothed:**

⊘ **`F8-C31B` is the control that would have PASSED under the R6 registry, and that is exactly why
the pair is required.** C31's failure was one-directional: a **client** edit reached the operation
leaf because the operation leaf's disposition was `CLIENT_MATCH_SOURCE_DERIVED`. Nothing symmetric
existed — no client leaf was derived from the operation's source. **A single successor control would
therefore test only the broken direction and report the seam repaired while the derivation still
stood.** The pair is a **bidirectional** acceptance because the clause it asserts is bidirectional
(v2 §B, *"operation identity independent of client identity (**bidirectional**)"*, §3.2): A proves
the client cannot reach the operation; **B proves the operation has not been "fixed" by making the
client derive from it instead** — the same conflation, inverted, which a one-sided control cannot
see.

### 5.3 Preconditions

**P-1 … P-5 of §4.3 bind unchanged**, with **P-2** promoted to the owner position and **P-1** to the
non-owner position. The honest reading is the same: **P-1, P-3 and P-5 are unmet at `21e11b0`**, and
**P-2 is partial** — the join relation is the missing structure for both controls, which is why
finding **C-2** is a precondition of the pair and not a footnote to it.

---

## §6 The isolation predicate, stated ONCE for both and made checkable

Two predicates, and both must hold for **each** control:

1. **OWNING-LEAF ISOLATION.** `normal.errors[]`, as a **set of leaf identities**, equals the
   singleton containing the control's declared **sole mutable target**. Not "contains". Not
   "includes". **Equals** — C31's `errors[]` contained its owning leaf and still failed, because it
   contained a second one.
2. **ALL-NON-OWNER RETENTION.** For every predicate `p` in the registry other than the owning leaf,
   `value(p, mutated) == value(p, baseline)`, measured **by comparison against the unmutated
   baseline run**, not by the absence of a complaint in the mutated one.

**And the bypass run is the third reading that makes the first two falsifiable**: suppress exactly
the owner and the run must **close**. A residual leaf under owner suppression is the signature of a
shared derivation — it is the precise shape C31 exhibited, and it is the one outcome the pair must be
able to detect rather than absorb.

▲ **Acceptance is the pair, never a member.** `F8-C31A` alone proves one direction; the clause is
bidirectional; **a half-run pair is not a lawful replacement of C31** (§7).

---

## §7 The denominator — OWNER-FROZEN, and NOT re-cut here

The denominator of record, quoted at its home — ⟨cmd⟩ (base `$V`)
`sed -n '128,132p' docs/tranches/V/megatranche/coordination/FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md`:

> | Fourier controls | 30/37 | **32/38 if C31 is lawfully replaced by C31A/C31B; later denominator
> must be owner-frozen** | 0 |

| question | this file's answer |
|---|---|
| What is the denominator of record? | **30/37, terminal RED at C31.** Unchanged by this file. |
| Is it replaced here? | **NO.** Replacement requires the pair to be **lawfully replaced** — constructed, run, and accepted under §6. **0 of 2 controls exist**; three preconditions are unmet (§4.3). |
| Does this file publish 32/38? | **NO.** It is recorded as the **conditional** the owner froze, in the owner's own words, and as nothing else. |
| Does this file publish any percentage? | **NO** — X-9 binds: one member-scope law before any percentage, and no such law is published. **No percentage appears anywhere in this file.** |
| Who may re-cut it? | **The owner, under OG-F1.** *"No re-cut denominator on any unit's own authority"* — this unit asserts none. |

---

## §8 Gate reading — **G3**, BEFORE → AFTER, with its split verdict

| limb | BEFORE (record §B.2) | AFTER, at this file's bytes | verdict |
|---|---|---|---|
| **(i) reproduces exactly** | **RED** — `C31-two-sided-reproduction.md` ABSENT | **The attempt is made and its result is published with receipts**: the seam's three anchors re-resolved at this seat's clock (§1.1); the drift traced to **one** commit with the arithmetic closing exactly (§1.2); the instrument searched for member by member and **four of five absent, double-run** (§2.2); the run barred by the read-only law independently (§2.3); and the honest **NON-REPRODUCTION** stated as a finding with the reason distinguished from *cure* (§2.4). The measurement enters by **ADOPTION** under OG-F1 with the **raw decoded receipt printed verbatim** (§2.5) | **RED — HONEST-RED, reason published.** The diagnostic did not run and is **not** declared passed. Adoption banks the evidence; it does not discharge the limb. **No GREEN is claimed.** |
| **(ii) `F8-C31A`/`F8-C31B` isolate each leaf under the stated constraints** | **RED** — **0 of 2 controls exist** | Both controls **fully specified**: sole mutable target · owner result · non-owner result · owner-only bypass run · the five verbatim constraints discharged **member by member, per control** · the receipt shape with the *no-expected-code* exclusion written into it · five preconditions **measured**, three unmet, each with an owner · the isolation predicate stated once and made checkable (§6) · the pair's bidirectionality argued from the clause rather than assumed (§5.2) | **CLOSED FOR F.W8 — split verdict.** **NOT product-GREEN**: still **0 of 2 controls constructed**; P-1/P-3/P-5 unmet; construction and execution are the **fourier API row**'s act under the owner's freeze, and the run environment is **F.W9/W10**'s |
| **(iii) the denominator** ⊙ | **RED** (owner-gated) | **30/37 stands, unmoved.** The 32/38 conditional is recorded in the owner's own words; **no re-cut, no percentage, no claim on this unit's authority** (§7) | **OWNER-FROZEN — consumed, not turned.** |

**Overall: G3 — CLOSED FOR F.W8 on the split verdict, RED at the product.** GREEN owners: **fourier
API row** (the leaf model, the validator, the controls' bytes) · **F.W5's register** (the join
relation, P-1/P-2) · **F.W9/W10** (the run environment) · **owner** (the denominator).

**No gate measured GREEN before its cure. No gate discharged by an SS-13 probe** — this unit ran
none. **Probe parsimony (§5.2): bounded `grep`/`sed`/`git log`/`git show` reads only; zero live
probes, zero browser, zero runs, zero writes outside the two paths in this unit's writable set, and
zero fourier bytes in any verb.**

---

## §9 Residuals — routed, never repaired here

- **R-c1** — ⊘ **the successor model has no `client.method.*` leaf** (§3.3, P-1). Until F.W5's
  register carries the client↔operation join **as a separate relation** with method-bearing leaves on
  both sides, **neither control can be built**. **Owner: F.W5's register** ⊕ **fourier API row**.
  Travels in unit `e`'s FN-6 letter.
- **R-c2** — ⊘ **the join is stored inside the operation row** (`client function` + `CLIENTED` in
  §2.1 row 4), and `operation-register.md` names neither `R6-8` nor the separation law (`grep` → no
  output). Harmless today because no cell is keyed on the client's method literal; **C31-shaped the
  moment the predicate is sharpened**. **Owner: F.W5's register.** Disclosed, not re-graded —
  F.W8 books no canonical row and re-rules nothing F.W5 ruled.
- **R-c3** — ⊘ **no production validator exists at HEAD**, and the five in-tree source-level
  conformance scripts are **bare `exit 0`** (§2.2, double-run). **Owner: fourier API row.** Named as
  a fourier-tree fact for constraint 2; **not re-booked as a defect of any record**.
- **R-c4** — the **run environment** for both controls is **F.W9/W10**'s deploy spine, never this
  wave's (§5c). A control that writes a fourier byte may not be executed by F.W8 in any verb.
- **R-c5** — the open seat's **F-1** wording is corrected by addendum-beside (§1.3). The reading is
  preserved and dated; **no banked file is rewritten** (E-3).

---

## §10 Self-count — read from the SETTLED bytes, double-run (SELF-COUNT law)

Every probe below is **row-anchored at line start**, so none of them can match its own published
text — the self-falsifying-receipt class this tranche convicts, excluded by construction rather than
by care.

| figure | probe (base: this directory) | reading |
|---|---|---|
| controls specified in this file | `grep -c '^| \*\*id\*\* | .F8-C31' C31-two-sided-reproduction.md` | **2** — `:337` `F8-C31A` · `:398` `F8-C31B` |
| verbatim constraints discharged **per control** | `grep -c '^| \*\*[1-5]\*\* | \*\*' C31-two-sided-reproduction.md` (§4.2's numbered rows; §5.2 adopts the same set, it does not restate it) | **5** |
| preconditions measured | `grep -c '^| \*\*P-[1-5]\*\* |' C31-two-sided-reproduction.md` | **5** — **3 unmet** (P-1 · P-3 · P-5), **1 partial** (P-2), **1 met** (P-4) |
| findings of this seat's own | §1.3 `C-1` · §3.3 `C-2` | **2** |
| residuals routed | `grep -c '^- \*\*R-c[0-9]\*\*' C31-two-sided-reproduction.md` | **5** |
| **percentages published** | X-9's bar, stated as **set membership**, never as a count of itself | ⊘ **NONE.** ▲ **And the first form of this cell was FALSE, which is why write-then-measure is the law and not the manner.** It claimed *"the only `%`-adjacent figures are `30/37` and `32/38`"*; ⟨cmd⟩ `grep -n '%' C31-two-sided-reproduction.md` returns **more lines than that** — the `%` characters in this file are **`git log --format` and `printf` specifiers inside ⟨cmd⟩ pastes** (`%h %ad %s`, `%s %s`), disclosed here rather than trimmed. **No percentage figure is published anywhere**, and `30/37` / `32/38` are ratios quoted exactly as the owner froze them |
| fourier bytes written | the read-only law | **0**, in every verb |

**Ordering** — `UTF8_BYTEWISE_CODEPOINT`, never `localeCompare`: `F8-C31A` < `F8-C31B` bytewise, and
the two rows are written in that order in this file and in `fixture-register.md` §3a.

▲ **Double-run**: every reading above was taken twice over the settled bytes and reproduced
identically, as did each of the tree measurements it rests on (§1.1's three anchors; §2.2's four
absence probes; §2.2's five-script stub count; §3.3's register `grep`).

---

## §11 What this file hands on

- **to unit `d`** — the walk script must **never** carry C31's mutation shape: a replace-in-file
  control writes a fourier byte, and `union-walk.mjs` mutates fourier **data** only, in F.W9's
  environment, declared and subtracted (G9). The `F8-C31*` namespace is closed at two ids.
- **to unit `e`** — **three** items travel in the FN-6 relay letter from this unit and no more:
  **(i)** **R-c1/R-c2**, the join relation the successor model owes before either control can be
  built — addressed to **F.W5's register** and the **fourier API row**; **(ii)** **R-c3**, the
  absent production validator and the five vacuous conformance stubs; **(iii)** the **denominator
  statement** exactly as §7 puts it — 30/37 stands, 32/38 is the owner's conditional, and **no
  replacement has been performed**.
- **to F.W9/W10** — the pair is **authored here and RUN there**, the same division the spec's
  `F.W9/W10` edge row declares for the fixtures and the walk script: *"F.W8 LANDS the fixtures and
  the walk script; F.W9/W10 RUN the close-gate as evidence"*. Each side's probe asserts **against
  this document**, never against the sibling repo (inv-26: no cross-repo read, ever).
- **to the owner** — G3's limb (iii) is untouched by design. **30/37 is the denominator of record**;
  a lawful replacement requires the pair **constructed, run and accepted under §6**, and this file
  performs none of those three.
