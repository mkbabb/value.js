SERVED MODEL: claude-opus-5[1m]

# X.P.W0.a — PAUSE AUTHENTICATION LEDGER, 2026-09-17

**Unit**: X.P.W0.a (Track D · X·P) · **Spec of record**: `docs/tranches/X/parse-that/waves/W0.md`
§5 `X.P.W0.a` (L203–219), §6 G-1 (L300–329), §6 G-2 (L331–344), §3.1, §2c rows 1–2, §3a.
**Lane authority**: `docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md`
(the "handoff" throughout) — §3.1, §3.2, §3.3, §7, §8 step 1, §9.
**Wave record**: `docs/tranches/X/execution/D/X-P-W0.md`.

**What this file is.** The wave's own re-derivation of every identity the handoff asserts, computed
by this seat, this session, from disk. Handoff §9 binds it: _"treat task IDs as chronology and disk
bytes as evidence. Recompute every hash and census before acting."_ Resume-protocol §8 step 1 binds
it too: _"authenticate this handoff, the current builder, the preserved residue, and target absence
before any write."_ This unit is that step-1 authentication, and it runs **before** the lane's FIRST
WRITE (unit `.c`).

**What this file is not.** It is not a quotation of the handoff's digests. Every digest in the
**measured** column below was produced by a command run by this seat on 2026-09-17, and that command
and its literal output are pasted beside the row. Digests appearing in the **asserted** column are
the _claim under test_, cited to their source document and section — they are never presented as a
measurement, and no row in this ledger carries a measured digest this unit did not itself compute.

**Form (M-22 ¶5 / F-7).** A **new dated file**, append-never-rewrite. No existing `.sha256` packet
was opened for edit; no `.sha256` under `docs/tranches/**` was modified by this unit (verified in §8).
Provenance finding F-7 — _a receipt that changes is not a receipt_ — is why this ledger is a fresh
dated artifact and not an amendment of an older seal, including the seals known to be broken.

**E-3.** `W0.md`'s 2026-08-03 baselines are IMMUTABLE and were **not edited by this unit**. Where
today's bytes differ from the 08-03 record — they do, in exactly one respect: access state — the
difference lands here as a **dated addendum beside**, in §6, never as a rewrite of an 08-03 line.

---

## 1. Measurement environment

⟨cmd⟩ `date '+%Y-%m-%d %H:%M:%S %Z'` · `uname -sm` · `node --version` · `git rev-parse --short HEAD`
· `shasum --version` · `id -un`

```
2026-09-17 12:56:54 EDT
Darwin arm64
v26.0.0
426761a7
6.04
mkbabb
```

`cwd = /Users/mkbabb/Programming/value.js` for every repository-relative path below; absolute paths
are given absolutely. `426761a7` is value.js `tranche-u` at the moment of measurement; sibling seats
of this wave commit concurrently, so the HEAD is recorded as the measurement's timestamp, not as a
claim that the tree stood still.

Access state of this reader, stated because G-2 makes it load-bearing: `~/.codex/**` readable;
`~/Documents/Codex/**` **readable and listable on 2026-09-17** (the 2026-08-03 TCC wall is gone —
§6). Every path named below was **read and hashed only**. Nothing was opened for edit, nothing was
executed, nothing was created, nothing was removed.

---

## 2. The seven rows — one disposition each

**Three dispositions, never conflated** (§5 `X.P.W0.a`, §6 G-1):

- **MATCH** — this seat computed the identity and it equals the one the handoff asserts.
- **MISMATCH** — this seat computed the identity and it differs. Fires handoff §9 STOP ⇒ `W0.md`
  §3a triumvirate + owner return. **Never a local repair.**
- **EPERM** — the path is unreachable to this reader; the identity is **unknown**, and the row says
  so. EPERM is a complete result (`W0.md` §2 COMPLETABLE), never a synonym for absence (§6 G-2).

A fourth label, **EXPLAINED**, is carried by exactly one row — the in-repo `ADOPT-COPY` — because
that row's identity is _asserted by no handoff row_: it is a derived artifact whose divergence the
spec requires be explained structurally (§5 `X.P.W0.a`). It is disposed by proof in §4, and it is
tallied separately from the three so nothing is conflated.

| #   | handoff row                                           | source                                  | asserted identity (claim under test)             | measured by this seat, 2026-09-17                                              | disposition        |
| --- | ----------------------------------------------------- | --------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------ |
| 1   | the handoff itself (lane authority)                   | self / `W0.md` §6 G-1                   | `ced23440…f20f7`                                 | `ced23440…f20f7`, 10,205 B                                                     | **MATCH**          |
| 2   | Value parser-law matrix                               | handoff §3.1                            | `244c448a…504a7`, 30,242 B                       | `244c448a…504a7`, 30,242 B                                                     | **MATCH**          |
| 3   | Value CSS DREI-v11 owner intake                       | handoff §3.3                            | `aa891714…92767`                                 | `aa891714…92767`, 7,558 B                                                      | **MATCH**          |
| 4   | in-repo `ADOPT-COPY` of row 2                         | M-21 C-11 ADOPT-COPY ruling, 2026-08-03 | — (derived artifact; no handoff row asserts it)  | `0002ed93…7d0f50`, 30,927 B; `tail -c 30242` ⇒ `244c448a…504a7`                | **EXPLAINED** (§4) |
| 5   | `BUILD-V12.py` (the builder)                          | handoff §3.2                            | `0732ebc2…64ee8`; 243,827 B; mode 0644; nlink 1  | `0732ebc2…64ee8`; 243,827 B; mode 100644; nlink 1                              | **MATCH**          |
| 6   | `__pycache__/BUILD-V12.cpython-314.pyc` (the residue) | handoff §3.2                            | `de1d62ff…c00937`; 154,221 B; mode 0644; nlink 1 | `de1d62ff…c00937`; 154,221 B; mode 100644; nlink 1                             | **MATCH**          |
| 7   | v12 target `…/parser-novelty-and-experiment-v12`      | handoff §3.2                            | **ABSENT at pause (2026-08-02)**                 | **ABSENT as measured 2026-09-17 by a reader with listable-parent access** (§5) | **MATCH**          |

**Tally: 7 rows named · 7 rows disposed · 6 MATCH · 1 EXPLAINED · 0 MISMATCH · 0 EPERM.**
The count of rows disposed equals the count of rows named. **Zero §9 STOP conditions fired** (§7).

Rows 5, 6 and 7 were **EPERM on 2026-08-03**. They are MATCH today because the reader's access
changed, not because the 08-03 reading was wrong; §6 states that distinction in both directions, as
G-2 requires.

---

## 3. Per-row receipts — command and literal output

### 3.1 Rows 1–4 — the four document identities

⟨cmd⟩ `shasum -a 256 docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md`

```
ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7  docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767  /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md
0002ed933f7628797792c28258c37b150b2eb10a767eb5113db20225757d0f50  docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
```

⟨cmd⟩ `wc -c <the same four paths>`

```
   10205 docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
   30242 /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
    7558 /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md
   30927 docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
   78932 total
```

Row 2's asserted size — handoff §3.1 records the matrix at 30,242 B via the ADOPT-COPY header's
`original-bytes` (§4) — is met exactly. Rows 1 and 3 carry no asserted size in the handoff; their
measured sizes are recorded for the next reader, flagged as _new_ facts rather than confirmations.

### 3.2 Rows 5–6 — the builder and the preserved residue

The construction root is `/Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction`
(handoff §3.2). **It was read and hashed only.** The builder was never opened for edit and never
run; the residue was never removed, regenerated, normalized, or credited (handoff §3.2 + §7,
verbatim). Its full contents, enumerated read-only:

⟨cmd⟩ `ls -1a /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction`

```
.
..
BUILD-V12.py
__pycache__
```

⟨cmd⟩ `find …/parser-novelty-v12-construction -type f` (root elided to `…`)

```
…/BUILD-V12.py
…/__pycache__/BUILD-V12.cpython-314.pyc
```

⟨cmd⟩ `find …/parser-novelty-v12-construction -type f | wc -l`

```
       2
```

⟨cmd⟩ `shasum -a 256 …/BUILD-V12.py …/__pycache__/BUILD-V12.cpython-314.pyc`

```
0732ebc27bc712d64d0b6ade30db13b9d8c7817524268af7d3d7474654b64ee8  /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction/BUILD-V12.py
de1d62ff18da4851968136b1e3190c00f6c463b9b8a5e7b5d23103155cc00937  /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction/__pycache__/BUILD-V12.cpython-314.pyc
```

⟨cmd⟩ `stat -f '%z %p %l %N' …/BUILD-V12.py …/__pycache__/BUILD-V12.cpython-314.pyc`

```
243827 100644 1 /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction/BUILD-V12.py
154221 100644 1 /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction/__pycache__/BUILD-V12.cpython-314.pyc
```

The handoff's _"243,827 bytes; mode 0644; nlink 1"_ and _"154,221 bytes; mode 0644; nlink 1"_ are
met on all three fields each. `stat`'s `%p` prints the full mode word `100644` — file type `100000`
(regular) plus permission bits `0644`; the handoff's `0644` is the permission half, and the two
agree. Recorded rather than silently normalized, so the next reader is not left to wonder whether a
`100644`/`0644` difference was a real one.

**Handoff §9's two STOP triggers on these rows — "a changed builder, a changed residue" — do not
fire.** Both are byte-identical to the pause boundary, 46 days on.

### 3.3 Row 7 — the intended target

See §5. The disposition rests on an enumeration of the readable parent, not on a failed `ls`.

---

## 4. Row 4 — the `ADOPT-COPY` divergence, explained structurally

The in-repo copy at
`docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md`
hashes `0002ed93…7d0f50` against the original's `244c448a…504a7`. `W0.md` §5 requires this be
_"verified with `tail -c 30242 … | shasum -a 256`, not with prose"_. It is:

⟨cmd⟩ `tail -c 30242 docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md | shasum -a 256`

```
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  -
```

The last 30,242 bytes of the copy **are** the original, bit for bit. The prefix is therefore
30,927 − 30,242 bytes:

⟨cmd⟩ `expr 30927 - 30242`

```
685
```

⟨cmd⟩ `head -c 685 <the copy> | wc -c`

```
     685
```

⟨cmd⟩ `head -c 685 <the copy>` — the literal prefix, an HTML comment that closes on byte 685:

```
<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
  original-mtime: 2026-07-30T20:12:10
  original-sha256: 244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7
  original-bytes: 30242
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
```

**The divergence is total and accounted for**: 685 B of prepended provenance comment + 30,242 B of
byte-exact original = 30,927 B measured. The header's self-description (`original-sha256`,
`original-bytes`) is **not** evidence in this ledger — it is a claim by the copy about itself; the
evidence is the `tail -c` digest above, which was computed from the copy's own bytes and equals the
original's independently measured digest in §3.1. Both halves come from commands run this session.

Note for the record, not a defect: this row is the only place in G-1 where the ADOPT-COPY header's
`original-bytes: 30242` and the `tail -c 30242` argument coincide. They are not the same fact — the
first is the copy's assertion, the second is the offset this seat chose in order to test it. Had the
assertion been false, the `tail` digest would have differed and the row would read MISMATCH.

---

## 5. Row 7 and G-2 — the v12 target, and why absence is a measurement here

**G-2's falsifier governs every sentence below** (`W0.md` §6 G-2): _"any sentence in the wave's
artifacts of the form 'the v12 target is absent' that is not immediately qualified by the
measurement date and the reader's access state fails the gate."_ Each assertion of absence in this
file therefore carries its date and its access state inline, without exception.

⟨cmd⟩ `ls -ld /Users/mkbabb/Documents/Codex/2026-08-02/`

```
drwxr-xr-x  136 mkbabb  staff  4352 Aug 26 11:18 /Users/mkbabb/Documents/Codex/2026-08-02/
```

⟨cmd⟩ `ls -1 /Users/mkbabb/Documents/Codex/2026-08-02/ | wc -l` — run twice:

```
     133
     133
```

⟨cmd⟩ `ls -1 /Users/mkbabb/Documents/Codex/2026-08-02/ | grep 'parser-novelty'`

```
parser-novelty-and-experiment-v1
parser-novelty-and-experiment-v10
parser-novelty-and-experiment-v11
parser-novelty-and-experiment-v2
parser-novelty-and-experiment-v3
parser-novelty-and-experiment-v4
parser-novelty-and-experiment-v5
parser-novelty-and-experiment-v6
parser-novelty-and-experiment-v7
parser-novelty-and-experiment-v8
parser-novelty-and-experiment-v9
parser-novelty-n2a-ietm-f0
parser-novelty-n2b-ietm-f0
parser-novelty-n2c-ietm-f0-source
parser-novelty-n2d-ietm-f0-source
parser-novelty-v10-construction
parser-novelty-v10-terminal-static-ruling
parser-novelty-v11-construction
parser-novelty-v11-terminal-static-ruling
parser-novelty-v12-construction
parser-novelty-v3-collision-ruling
parser-novelty-v4-terminal-static-ruling
parser-novelty-v5-construction
parser-novelty-v5-terminal-static-ruling
parser-novelty-v6-construction
parser-novelty-v6-terminal-static-ruling
parser-novelty-v7-construction
parser-novelty-v7-terminal-static-ruling
parser-novelty-v8-construction
parser-novelty-v8-terminal-static-ruling
parser-novelty-v9-construction
parser-novelty-v9-terminal-static-ruling
```

⟨cmd⟩ `ls -1 /Users/mkbabb/Documents/Codex/2026-08-02/ | grep -c '^parser-novelty-and-experiment-v12$'`

```
0
```

⟨cmd⟩ `ls -d /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12`

```
ls: /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12: No such file or directory
```

⟨cmd⟩ `test -e /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12 && echo PRESENT || echo ABSENT`

```
ABSENT
```

**Disposition.** The v12 target is **ABSENT as measured on 2026-09-17 by a reader with listable,
readable access to its parent directory** — and the assertion rests on the _enumeration_, not on the
`test -e`. The parent lists 133 entries; eleven sibling `parser-novelty-and-experiment-v{1..11}`
directories are present by name; `parser-novelty-and-experiment-v12` occurs zero times in that
listing. An `ls` that fails because a name is not in a directory the reader can enumerate is a
different fact from an `ls` that fails because the reader cannot look — and the whole content of
G-2 is that distinction. Today this lane is on the first side of it.

**Corroboration, same date, same access state**: the construction root holds exactly two files
(§3.2) — the builder and the residue, no generated packet — which is what the handoff §3.2 predicts
of an absent target: _"The absent target means no generated packet, parser run, experiment, review,
or acceptance exists."_

**What changed, and what did not.** The 2026-08-03 authoring session recorded this row **EPERM** —
it could not look. This session can, and looks, and finds nothing. **The gate did not change; the
access state did.** G-2's reverse clause binds equally and is honoured in §6: today's grant does not
retroactively convert the 08-03 EPERM into a verification, and the 08-03 rows stay EPERM in the
record.

**Handoff §9's STOP trigger "a present v12 target" — does it fire?** No. It is the first time in
this lane that the trigger is _detectable at all_; on 2026-08-03 the lane could not have detected
it. As measured on 2026-09-17 by a reader with listable-parent access, the target is absent, and the
trigger does not fire. That negative is now a measurement rather than an inference — which is the
single substantive thing this unit adds to the 08-03 record.

---

## 6. Dated addendum beside the 08-03 record (E-3 — no 08-03 line rewritten)

`W0.md` §6 G-1 rows 5–7 read **EPERM**, and `W0.md` §6 G-2's RED baseline reads
`ls /Users/mkbabb/Documents/Codex/` → `Operation not permitted`. **Those lines are immutable and
were not edited.** This section stands beside them.

| row                                     | 2026-08-03 (immutable, `W0.md` §6) | 2026-09-17 (this ledger)                                                  | the difference is       |
| --------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- | ----------------------- |
| `BUILD-V12.py`                          | **EPERM** — unreadable             | **MATCH** — `0732ebc2…64ee8`, 243,827 B, mode 0644, nlink 1               | access state, not bytes |
| `__pycache__/BUILD-V12.cpython-314.pyc` | **EPERM** — unreadable             | **MATCH** — `de1d62ff…c00937`, 154,221 B, mode 0644, nlink 1              | access state, not bytes |
| v12 target                              | **EPERM — not ABSENT**             | **ABSENT as measured 2026-09-17 by a reader with listable-parent access** | access state, not bytes |

**The 08-03 EPERM rows remain correct as of their date and stand as history.** A reader who could
not look, and who wrote down that they could not look instead of guessing, produced a true record;
this ledger does not overturn it and does not credit it with a verification it never claimed. That
is G-2's reverse clause — _"the grant does not retroactively make today's EPERM a verification"_ —
applied in the direction it is least often applied: forward in time, protecting the earlier record
from being retro-fitted by the later one.

Ruling consumed: `COHESION.md` §0j (pre-acts block), gate 24 — _"the `~/Documents/Codex` TCC wall is
GONE (PRESENT/readable 2026-09-17; OP-2 GRANTED), so X.P.W0 G-2 records the three-state as PRESENT
with date and the v12 target VERIFIED ABSENT, builder + residue MATCH."_ This ledger discharges that
ruling at the bytes rather than by citation: every one of the three rows above carries a command of
this seat's own beside it. Its absence limb is discharged **only** in the qualified form the table
above and §5 carry — **ABSENT as measured 2026-09-17 by a reader with listable-parent access** — and
in no shorter form, because G-2's falsifier fires on the shorter one.

**Standing caution for every later X·P seat.** The grant is a property of _this reader on this
date_, not of the filesystem. A seat that re-reads these paths under a revoked grant must record
EPERM again, beside this section, and must not carry today's MATCH forward as though it were a
durable fact of the tree. Three of handoff §7's seven prohibitions were EPERM-bounded at authoring
(`W0.md` §6 G-7); they are directly checkable today, and that checkability is dated too.

---

## 7. Handoff §9 STOP conditions — evaluated, row by row

Handoff §9: _"Missing bytes, a present v12 target, a changed builder, a changed residue, or a stale
owner receipt means STOP and request a new ruling."_ Five conditions; each gets a verdict, not a
blanket clearance:

| #   | §9 condition              | verdict           | evidence in this file                                                                                                                                                                                                                  |
| --- | ------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **missing bytes**         | **DOES NOT FIRE** | all six hashable identities read and hashed; §3.1, §3.2                                                                                                                                                                                |
| 2   | **a present v12 target**  | **DOES NOT FIRE** | §5 — absent, by enumeration of a listable parent, 2026-09-17                                                                                                                                                                           |
| 3   | **a changed builder**     | **DOES NOT FIRE** | §3.2 — `0732ebc2…64ee8`, 243,827 B, mode 0644, nlink 1: three-for-three                                                                                                                                                                |
| 4   | **a changed residue**     | **DOES NOT FIRE** | §3.2 — `de1d62ff…c00937`, 154,221 B, mode 0644, nlink 1: three-for-three                                                                                                                                                               |
| 5   | **a stale owner receipt** | **DOES NOT FIRE** | the governing owner word is dated **2026-09-17** (`COHESION.md` §0j, the begin-word quoted verbatim) — the same day as this measurement; the handoff's own §1 ruling is superseded by it for the purpose of opening, and not otherwise |

**Zero of five fire. `W0.md` §3a is therefore NOT triggered by this unit**, and no triumvirate
dispatch is requested on its account. §3a's other three triggers are outside this unit's scope (a
write outside §4's table; the clone failing twice; a third diagnose→act→re-measure iteration) —
this unit performed one measurement pass, wrote one file inside its bounds, and iterated on no gate.

Had any row read MISMATCH, this file would carry the row and stop there: §3a makes it _"an owner
return, not an orchestrator retry"_, and the triumvirate _"does not re-hash and hope."_ No such row
exists.

---

## 8. Pause-law observance by this unit (handoff §7)

Handoff §7 closes: _"Read-only hashing, census, archaeology, and handoff verification remain
lawful."_ This unit is exactly that and nothing more. Per prohibition:

| handoff §7 prohibition                                                                                                        | this unit                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| do not run `BUILD-V12.py`                                                                                                     | **not run.** Hashed with `shasum`, `stat`ed, listed. Never invoked, never opened for edit                                                                                                            |
| do not materialize the absent v12 target                                                                                      | **not materialized.** §5's commands are `ls`, `grep`, `test -e` — all read-only; the name is **ABSENT as measured 2026-09-17 by a reader with listable-parent access**, after this unit as before it |
| do not import or execute generated parser/auditor source                                                                      | **none imported, none executed.** This unit read no parser source at all                                                                                                                             |
| do not mutate `parse-that`, Value parser/CSS product source, package state, tests, benchmarks, caches, or release coordinates | **none touched.** ⟨cmd⟩ `git status --porcelain -- src api demo test e2e                                                                                                                             | wc -l`→`0`(gate 27 / W4 G-2 standing invariant, measured at this unit's commit).`/Users/mkbabb/Programming/parse-that` was not read, written, or invoked by this unit |
| do not clean the preserved `__pycache__` residue                                                                              | **not cleaned, not regenerated, not normalized, not credited.** It is hashed in §3.2 and named as preserved evidence                                                                                 |
| do not dispatch N4, parser-law P01, CSS DREI-v12, or a performance family                                                     | **none dispatched.** This unit is one seat writing one ledger                                                                                                                                        |
| do not bind parser evidence into non-parser cross-repository input slots                                                      | **none bound.** Nothing here leaves `docs/tranches/X/parse-that/evidence/W0/`                                                                                                                        |

**Append-never-rewrite, verified rather than asserted** ⟨cmd⟩
`find docs/tranches -name '*.sha256' -newermt '2026-09-17'`

```
(no output)
```

Zero `.sha256` packets under `docs/tranches/**` carry a modification time on or after 2026-09-17.
No existing seal was edited by this unit — including the two known-broken seals that F-7 records
(the 07-31 resurrection at 5/6 OK and the eight-hour at 20/24 OK), which stay marked
SUPERSEDED-BY-GIT and **unrepaired**, exactly as `W0.md` §11.3 requires.

---

## 9. Disclosure — five digests the handoff names that have no subject to hash

Handoff §3.2 additionally tabulates _"the last zero-write owner dry audit"_'s generated identities:
contract `993a0583…`, Markdown `cfc30570…`, matrix `f8cccb6d…`, predecessor registry `cc893112…`,
generated source `26757d48…`, source size 1,965,705 B, and the counts 14 / 399 / 167 and
522 / 160 / 137, writes 0.

**These are deliberately NOT rows of §2's table, and the row count stays seven.** They are not
identities of artifacts on disk: they are observations the owner's dry audit reported _about a
packet that was never materialized_. The handoff says so in the same breath — _"These are dry
source-construction observations only. The absent target means no generated packet, parser run,
experiment, review, or acceptance exists."_ There is nothing to hash, so there is no measurement to
make, and inventing a disposition for them would be precisely the conflation G-1 and G-2 forbid:
neither MATCH (nothing was computed), nor MISMATCH (nothing disagreed), nor EPERM (the reader's
access is not what stops them — §5 shows the reader can look, and the subject is simply not there).

They are recorded here so that a later reader who counts digests in handoff §3.2 and finds eleven
rather than six does not conclude this ledger overlooked five. **It did not; they have no subject,
and that is their disposition.** Corroborated at the bytes: the construction root holds two files
(§3.2), neither of them a generated packet, as measured 2026-09-17 by a reader with read access to
it. Reviving the program that would give them a subject is `W0.md` §10's
**DORMANT-UNLESS-NC-0-REVIVED** set and requires a separate owner release no wave seat may grant.

---

## 10. Gate readings

| gate    | BEFORE (wave-open, `X-P-W0.md` baseline)                                                                                                                                                                                          | AFTER (this unit) | reading                                                                                                                                                                                                                                                                                          |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **G-1** | **RED** — _"the wave's own dated ledger carries all seven with its own outputs pasted"_: `evidence/W0/PAUSE-AUTHENTICATION-*.md` did not exist; the four digests known to the lane were the _authoring_ session's, not the wave's | **GREEN**         | 7 rows named, 7 disposed, each with the literal command and literal output of this session pasted beside it; 6 MATCH · 1 EXPLAINED (proved by `tail -c 30242`, not by prose) · 0 MISMATCH · 0 EPERM; **zero rows carry a digest this unit did not itself compute**                               |
| **G-2** | **RED — of a changed kind**: the TCC wall was gone at wave-open and **no lane artifact recorded it**; the three-state was undocumented in this lane's tree                                                                        | **GREEN**         | §5 disposes the target by enumeration of a listable parent, never by a failed `ls`; every absence sentence in this file carries its date **and** the reader's access state; §6 keeps the 08-03 EPERM rows standing beside as dated history, so the grant is not read backwards as a verification |

G-1's falsifier — _"change one byte of the parser-law matrix in the 7e28 worktree and the gate must
go red and halt to the owner"_ — is live against this ledger: rows 2 and 4 are pinned to digests
computed here, and a future byte change breaks both the `shasum` of §3.1 and the `tail -c` of §4.
G-2's falsifier is live too: any later artifact of this lane asserting bare absence, unqualified by
date and access state, fails the gate against this file's §5 and §6.

_Consumer named (L-19)_: the next parser writer — unit `.c` of this wave, which performs the lane's
FIRST WRITE only after resume-protocol §8 step 1 is discharged, and this file is that discharge.

---

## 11. Self-count (content facts, stable under later measurement)

| quantity                                                  | value     | how counted                                                                               |
| --------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| handoff-named rows in G-1's table                         | **7**     | `W0.md` §6 G-1, rows enumerated                                                           |
| rows disposed here                                        | **7**     | §2's table                                                                                |
| MATCH                                                     | **6**     | §2                                                                                        |
| EXPLAINED                                                 | **1**     | §2 row 4, proved in §4                                                                    |
| MISMATCH                                                  | **0**     | §2 — none; §3a not triggered                                                              |
| EPERM                                                     | **0**     | §2 — three rows were EPERM on 08-03 and stand so in §6                                    |
| §9 STOP conditions evaluated / fired                      | **5 / 0** | §7                                                                                        |
| handoff §7 prohibitions addressed per row                 | **7 / 7** | §8                                                                                        |
| distinct digests computed by this seat this session       | **6**     | §3.1 (4) + §3.2 (2); the §4 `tail -c` digest re-derives row 2's, and is not counted twice |
| digests quoted rather than computed, in a measured column | **0**     | by construction; the _asserted_ column is labelled as the claim under test                |
| existing `.sha256` packets edited                         | **0**     | §8, `find … -newermt` returns no rows                                                     |
| files written by this unit                                | **1**     | this file; the unit's whole writable set                                                  |

Every digest and every count above was double-run; the second run of the six digests and of the
133-entry listing agreed with the first, cell for cell.

---

## 12. What this unit did not do

It did not open the fresh root (`.c`'s act), did not census the eighteen roots (`.b`'s), did not run
the harvest (`.d`'s), did not read parser source for meaning, did not run a builder, did not
materialize a target, did not clean a residue, did not touch `/Users/mkbabb/Programming/parse-that`,
did not edit `W0.md`, did not edit any `.sha256`, and did not write one byte outside
`docs/tranches/X/parse-that/evidence/W0/PAUSE-AUTHENTICATION-2026-09-17.md`.

**Resume-protocol §8 step 1 — _"authenticate this handoff, the current builder, the preserved
residue, and target absence before any write"_ — is DISCHARGED**, on all four limbs, as measured
2026-09-17 by a reader with read access to `~/.codex/**` and listable, readable access to
`~/Documents/Codex/**`. The lane's FIRST WRITE may proceed on this authentication and on no other.
