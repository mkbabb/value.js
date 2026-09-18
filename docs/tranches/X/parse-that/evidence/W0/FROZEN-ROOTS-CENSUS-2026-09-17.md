SERVED MODEL: claude-opus-5[1m]

# X.P.W0 — FROZEN-ROOTS CENSUS AND THE NEVER-TOUCH LAW

**Dated 2026-09-17.** Authored by **X.P.W0.b** (Opus 5 implementation seat, M-23 §2).
**Spec of record**: `docs/tranches/X/parse-that/waves/W0.md` §3.2 / §3.3 / §3.6, §4 (the
do-not-touch list), §5 `X.P.W0.b` (L221–239), §6 **G-3** (L346–380).
**Rulings consumed**: `COHESION.md` §0j (pre-acts block) · **gate 25** — *"every git identity of the
eighteen roots holds, but `git worktree list` returns 7, not 8 (the prunable `m2-baseline` registry
record is gone) — X.P.W0 G-3 states the table at today's bytes."*

**E-3 discipline.** `W0.md`'s 2026-08-03 baselines are **IMMUTABLE**. Nothing in `W0.md` is edited
by this unit. Every place where today's bytes differ from the 08-03 reading is recorded here as a
**dated addendum beside**, naming both readings and the date of each. This file is itself dated and
**append-never-rewrite** (M-22 ¶5 / F-7).

**Scope of this unit.** It enumerates and it declares. It writes **no byte** into any root it
enumerates; it reads them with `git rev-parse` and `find` and with nothing else.

---

## 1. The eighteen preserved roots, at today's bytes

The table below is `census-before.txt` **verbatim** — the literal stdout of
`sh docs/tranches/X/parse-that/evidence/W0/roots-census.sh`, captured 2026-09-17 **before unit
`.c` dispatched** (§3.6; the group-1 → group-2 edge).

```
SERVED MODEL: claude-opus-5[1m] -- authoring seat of roots-census.sh; this stream is that script's verbatim stdout
X.P.W0 FROZEN-ROOTS CENSUS -- the eighteen preserved roots of the parser lane's blast radius
INSTRUMENT: git rev-parse (--no-optional-locks) + find ONLY. No status. No gc. No prune. No write. No timestamp.
COLUMNS: ##  path  state  identity  branch  files (-type f, excluding .git and node_modules)
--
1   /Users/mkbabb/Programming/parse-that                                      PRESENT  ef10d5b         master                                        20261
2   /Users/mkbabb/Programming/parse-that-css-totality                         PRESENT  f575708         codex/css-totality-combinators-20260729         757
3   /Users/mkbabb/Programming/parse-that-css-totality-p1-e                    PRESENT  35fd252         codex/css-totality-p1-e                         277
4   /Users/mkbabb/Programming/parse-that-css-totality-p1-r                    PRESENT  4175325         codex/css-totality-p1-r                         277
5   /Users/mkbabb/Programming/parse-that-css-totality-p1-vk                   PRESENT  a0f122f         codex/css-totality-p1-vk                        277
6   /Users/mkbabb/Programming/parse-that-runtime-probes                       PRESENT  99e9862         codex/runtime-kernel-probes-20260729            337
7   /Users/mkbabb/Programming/parse-that-skv26                                PRESENT  e31fbfe         codex/sk-v26-parse-that                       51162
8   /private/tmp/parse-that-m2-baseline-20260729                              ABSENT   -               -                                                 -
9   /Users/mkbabb/.codex/worktrees/7e28/value.js                              PRESENT  e01d0065        HEAD (detached)                                3967
10  /Users/mkbabb/.codex/worktrees/9167                                       PRESENT  NOT-A-GIT-ROOT  -                                              2988
11  /Users/mkbabb/.codex/worktrees/d0be                                       PRESENT  NOT-A-GIT-ROOT  -                                              1100
12  /Users/mkbabb/Programming/value-css-totality-audit                        PRESENT  dea7a93c        codex/css-totality-prototype-20260729          3846
13  /Users/mkbabb/Programming/value-xw1-demo-boot                             PRESENT  d19da6d3        codex/xw1-demo-boot-20260729                   3979
14  /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction  PRESENT  NOT-A-GIT-ROOT  -                                                 2
15  /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12  ABSENT   -               -                                                 -
16  /Users/mkbabb/Documents/Codex/2026-07-29/parser-p4-fresh-sol-adjudication/outputs  PRESENT  NOT-A-GIT-ROOT  -                                                 8
17  /Users/mkbabb/Programming/.p-totality                                     PRESENT  NOT-A-GIT-ROOT  -                                             26056
18  /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof                      PRESENT  NOT-A-GIT-ROOT  -                                               189
--
ROOTS ENUMERATED: 18
```

⟨cmd⟩ `shasum -a 256 docs/tranches/X/parse-that/evidence/W0/census-before.txt`

```
7f0c5b13a3e80f54d290008830024cd6c0f2300ea0a5898f91c4c88b431019d7  docs/tranches/X/parse-that/evidence/W0/census-before.txt
```

⟨cmd⟩ `wc -l -c docs/tranches/X/parse-that/evidence/W0/census-before.txt`

```
      25    3242 docs/tranches/X/parse-that/evidence/W0/census-before.txt
```

**Self-count** (SELF-COUNT law, read from the settled bytes): `ROOTS ENUMERATED: 18` is emitted by
the script's own row counter, not typed by the author; the 18 data rows above are 18 by
independent count of the block, and 8 + 3 + 2 + 3 + 1 + 1 = **18** is §3.2's own arithmetic
(seven `parse-that` worktree rows + the eighth m2-baseline row · three `.codex` · two value.js
siblings · three Codex evidence paths · `.p-totality` · the parser-proof job tree).

### 1a. Composition of the eighteen (§3.2's arithmetic, row by row)

| §3.2 class | count | rows |
|---|---|---|
| the eight `parse-that` worktree rows | 8 | 1–8 |
| the three `.codex` worktrees | 3 | 9–11 |
| the two value.js sibling worktrees | 2 | 12–13 |
| the three TCC-walled Codex evidence paths | 3 | 14–16 |
| the `.p-totality` archive | 1 | 17 |
| the ephemeral parser-proof job tree | 1 | 18 |
| **total** | **18** | |

### 1b. Dated addenda beside the 2026-08-03 baseline (E-3 — never a rewrite)

`W0.md` §6 G-3's baseline block was measured **2026-08-03** and stands untouched. Today's readings,
2026-09-17, differ in exactly these particulars and in no other cell:

| row | 2026-08-03, as `W0.md` §6 records it | 2026-09-17, measured by this unit | disposition |
|---|---|---|---|
| 8 — `/private/tmp/parse-that-m2-baseline-20260729` | `de36d57 (detached)` — **PRUNABLE**: path gone, registry entry is a record | **ABSENT**, and the registry record is **gone too** (§2 below) | **ADDENDUM** — the path was already gone on 08-03; what changed is that the `prunable` worktree-registry entry no longer exists |
| 10 — `.codex/worktrees/9167/` | `(enumerate at open)` | **PRESENT · NOT-A-GIT-ROOT · 2988 files** | **DISCHARGED** — the baseline deferred this cell to wave-open; this is that enumeration |
| 11 — `.codex/worktrees/d0be/` | `(enumerate at open)` | **PRESENT · NOT-A-GIT-ROOT · 1100 files** | **DISCHARGED** — same |
| 14 — `…/2026-08-02/parser-novelty-v12-construction` | **EPERM** | **PRESENT · NOT-A-GIT-ROOT · 2 files** | **ADDENDUM** — `COHESION.md` §0j gate 24: the TCC wall is gone. The grant licenses **reading**; it licenses no write, and G-2's reverse clause holds — the 08-03 EPERM stays EPERM in the record, beside today's reading |
| 15 — `…/2026-08-02/parser-novelty-and-experiment-v12` | **EPERM** | **ABSENT**, verified by a reader with listable-parent access, **2026-09-17** | **ADDENDUM** — this is the first date on which handoff §9's *"a present v12 target"* STOP condition is **detectable at all**. It does not fire |
| 16 — `…/2026-07-29/parser-p4-fresh-sol-adjudication/outputs` | **EPERM** | **PRESENT · NOT-A-GIT-ROOT · 8 files** | **ADDENDUM** — same grant |
| 12 · 13 | no file count recorded | 3846 · 3979 | **ADDENDUM** — cells the baseline left blank, now filled |
| 1–7, 9, 17, 18 | identities and counts as recorded | **identical in every cell** | **UNCHANGED** |

`.p-totality`'s composition is unchanged to the byte ⟨cmd⟩ `ls -1A /Users/mkbabb/Programming/.p-totality`
→ `atlas`, `audit-snapshots`, `demo-audit-2026-07-17`, `evidence-archive-2026-08-03.tar.zst`,
`primary-salvage-2026-08-03.tar.zst`, `sci` — **6 entries**; ⟨cmd⟩ `stat -f '%z %N' …/evidence-archive-2026-08-03.tar.zst`
→ `323894591` bytes, exactly the baseline's figure.

Row 2's two untracked provenance files are still on disk ⟨cmd⟩ `test -e` (a plain filesystem read,
**not** `git status` — see §4):

```
PRESENT  /Users/mkbabb/Programming/parse-that-css-totality/data
PRESENT  /Users/mkbabb/Programming/parse-that-css-totality/docs/tranches/B/PARSER-RESURRECTION-HANDOFF-2026-07-31.md
```

The second is provenance finding **F-6**'s uncommitted handoff. It is evidence. It is not cleaned,
committed, moved, or renamed.

---

## 2. The shared-repository finding — stated at today's bytes

⟨cmd⟩ `git --no-optional-locks -C /Users/mkbabb/Programming/parse-that worktree list`

```
/Users/mkbabb/Programming/parse-that                     ef10d5b [master]
/Users/mkbabb/Programming/parse-that-css-totality        f575708 [codex/css-totality-combinators-20260729]
/Users/mkbabb/Programming/parse-that-css-totality-p1-e   35fd252 [codex/css-totality-p1-e]
/Users/mkbabb/Programming/parse-that-css-totality-p1-r   4175325 [codex/css-totality-p1-r]
/Users/mkbabb/Programming/parse-that-css-totality-p1-vk  a0f122f [codex/css-totality-p1-vk]
/Users/mkbabb/Programming/parse-that-runtime-probes      99e9862 [codex/runtime-kernel-probes-20260729]
/Users/mkbabb/Programming/parse-that-skv26               e31fbfe [codex/sk-v26-parse-that]
```

⟨cmd⟩ `git --no-optional-locks -C /Users/mkbabb/Programming/parse-that worktree list | wc -l` → **7**
⟨cmd⟩ `ls -1 /Users/mkbabb/Programming/parse-that/.git/worktrees | wc -l` → **6**
⟨cmd⟩ `ls -1 /Users/mkbabb/Programming/parse-that/.git/worktrees | grep -c 'm2-baseline'` → **0**

```
parse-that-css-totality
parse-that-css-totality-p1-e
parse-that-css-totality-p1-r
parse-that-css-totality-p1-vk
parse-that-runtime-probes
parse-that-skv26
```

⟨cmd⟩ `cat /Users/mkbabb/Programming/parse-that-css-totality/.git`

```
gitdir: /Users/mkbabb/Programming/parse-that/.git/worktrees/parse-that-css-totality
```

⟨cmd⟩ `cat /Users/mkbabb/Programming/parse-that-skv26/.git`

```
gitdir: /Users/mkbabb/Programming/parse-that/.git/worktrees/parse-that-skv26
```

### 2a. The reading, stated exactly

**`W0.md` §5/§6 record eight entries on 2026-08-03: seven roots plus one `prunable`. Today the
command returns SEVEN.** The seven roots are all still there; what is gone is the eighth *record* —
the `prunable` registry entry for `/private/tmp/parse-that-m2-baseline-20260729`. `.git/worktrees`
holds **six** directories, one per linked worktree, and none of them is the m2 baseline. This is
`COHESION.md` §0j gate 25's ruling: *"X.P.W0 G-3 states the table at today's bytes."* **It is a
dated addendum beside `W0.md`'s eight, never a rewrite of it (E-3).**

**What did NOT change is the load-bearing part.** Rows 1–7 are **seven roots on ONE object store**:
row 1 is the primary checkout, which owns `/Users/mkbabb/Programming/parse-that/.git/objects`, and
rows 2–7 are **six linked worktrees** whose `.git` is a *file* pointing back into that same
directory (the two `cat` receipts above are that proof, taken at opposite ends of the list). They
are not seven independent copies of anything.

**Therefore, and this is the whole reason the finding is recorded:**

1. **One `gc`, `repack`, or `prune` in any one of the seven reaches all seven.** The object store is
   shared, so garbage collection run from `parse-that-skv26` operates on the bytes that
   `parse-that-css-totality`'s pinned `f575708` tree is made of.
2. **Any branch write — create, delete, move, reset, checkout-that-moves-a-ref — is a write to all
   seven**, because `refs/` is shared just as `objects/` is.
3. **`git worktree prune` destroys records.** On 2026-08-03 it would have destroyed the m2-baseline
   registry entry, which `W0.md` §4 names as *"itself a record"*. That entry is already gone as of
   2026-09-17 — by whose hand this unit does not know and does not guess — which makes the
   prohibition **stricter, not looser**: the remaining six registry entries are now the only ones
   left to lose.
4. **The fresh root is therefore opened by `git clone --no-hardlinks`, NEVER by `git worktree
   add`.** A `worktree add` would (a) append an entry to the shared registry, (b) create a branch
   ref in the shared repository, and (c) leave the new root's objects inside the store six frozen
   worktrees depend on. All three are writes to frozen roots by a path nobody audits. This is unit
   `.c`'s mechanism and G-5's falsifier (i); it is written down here because the *reason* for the
   mechanism lives in this census, not in the clone command.

Two further receipts on the shared store, taken read-only and recorded so `.c`'s after-capture has a
same-day before to compare against:

⟨cmd⟩ `du -sh /Users/mkbabb/Programming/parse-that/.git` → ` 28M` (the 08-03 figure, unchanged)
⟨cmd⟩ `test -e /Users/mkbabb/Programming/parse-that/.git/gc.log` → `NO-GC-LOG`

---

## 3. The never-touch law

### 3a. The law, stated

> **No act of the X·P lane, in this wave or in any successor wave, writes a byte into any of the
> eighteen roots enumerated in §1.** They are **PRESERVED EVIDENCE** (SCOPE M-24 ¶4): read-only and
> hash-only. Their provenance is never renamed, never normalized, never tidied, and never
> "obviously safely" cleaned.

Specifically, and without exception:

| # | prohibited act | why it is prohibited here |
|---|---|---|
| L-1 | any write inside `/Users/mkbabb/Programming/parse-that` | it is the read-only evidence root **and** the shared repository of six frozen worktrees (§2) |
| L-2 | `git gc` · `git repack` · `git prune` in any of rows 1–7 | one shared object store; the act reaches all seven (§2a.1) |
| L-3 | `git worktree prune` | it deletes registry records, which are themselves evidence (§2a.3) |
| L-4 | any branch write — `branch`, `checkout` that moves a ref, `reset`, `push`, `fetch` that updates a ref — in rows 1–7 | `refs/` is shared (§2a.2) |
| L-5 | `git stash` · `git restore` · `git checkout --` · `git add` · `git commit` against `parse-that`'s uncommitted modifications | those modifications are evidence, not a dirty tree to be cleaned |
| L-6 | removing, regenerating, normalizing or crediting the `__pycache__/BUILD-V12.cpython-314.pyc` residue under row 14 | handoff §7 verbatim; the residue's existence is the finding |
| L-7 | running or editing `BUILD-V12.py` under row 14 | handoff §7: the builder is frozen at the pause boundary |
| L-8 | writing under `~/.codex/**` (rows 9–11) | C-02 discipline: read/hash only |
| L-9 | deleting, unpacking-in-place, or moving anything under `.p-totality` (row 17) or the parser-proof job tree (row 18) | they are the two roots most likely to be mistaken for scratch, which is exactly why they are rows |
| L-10 | treating a TCC grant as a write licence | `COHESION.md` §0j gate 24 grants **read** access to rows 14–16. Nothing more |

The two paths the lane **may** create are named in `W0.md` §4's writable table and are not roots of
this census: `/Users/mkbabb/Programming/parse-that-css-totality-p2` (unit `.c`, by clone) and files
under `docs/tranches/X/parse-that/` in this repository.

### 3b. The law, made executable

Prose cannot be run, so the law's operative form is a script (§3.6):

**`docs/tranches/X/parse-that/evidence/W0/roots-census.sh`** — it prints the eighteen roots'
identities and nothing else, writes no byte outside its own stdout, exits 0, and carries **no
timestamp** (a stamped census could never diff to empty, which would silently destroy the gate it
serves). It is invoked twice — once by this unit **before** unit `.c`'s first write, once by unit
`.d` at close — and the two captures are diffed:

```
sh docs/tranches/X/parse-that/evidence/W0/roots-census.sh > docs/tranches/X/parse-that/evidence/W0/census-before.txt   # X.P.W0.b
sh docs/tranches/X/parse-that/evidence/W0/roots-census.sh > docs/tranches/X/parse-that/evidence/W0/census-after.txt    # X.P.W0.d
diff docs/tranches/X/parse-that/evidence/W0/census-before.txt docs/tranches/X/parse-that/evidence/W0/census-after.txt  # G-3: MUST be empty
```

**Instruction to unit `.d`, load-bearing:** capture `census-after.txt` by that exact redirection,
**unedited** — do not prepend a `SERVED MODEL` line by hand and do not remove one. The script emits
its own provenance line so that the two captures stay byte-comparable; `.d`'s seat receipt belongs
in `docs/tranches/X/execution/D/X-P-W0.md`, which is not a diffed artifact.

### 3c. What the instrument sees, and what it cannot (disclosed)

The census runs `git rev-parse --short HEAD`, `git rev-parse --abbrev-ref HEAD` (both with
`--no-optional-locks`) and `find … -type f -not -path '*/.git/*' -not -path '*node_modules*'`.

**It detects**: a moved HEAD · a branch rename, creation or deletion that changes any root's current
branch · a `worktree add` that checks out a root (the root's files appear) · a root appearing or
disappearing · any working-tree file added or removed in any of the eighteen.

**It does not detect**, and this is stated rather than left to be discovered: a `gc`/`repack` inside
the shared object store changes no column here, because the file-count column excludes `.git` by
construction. **That act is caught elsewhere, by design** — G-5's check (ii), the inode intersection
over `…/.git/objects`, and check (iii), `du -sh parse-that/.git` against the **28M** recorded in §2a
— both taken at unit `.c`. The two instruments are complementary, and neither is claimed to do the
other's work.

---

## 4. Why the census does not run `git status`

`W0.md` §5 `X.P.W0.b` lists "porcelain status" among the per-root fields. **This unit deliberately
omits it, under `COHESION.md` §0j's P-2 precedent** (the pre-act census at
`docs/tranches/X/execution/gates/census-before-2026-09-17.txt` disclosed a `DIRTY` column; the
X.P.W0 wave-record census at `docs/tranches/X/execution/D/X-P-W0.md` §G-3 deliberately omitted it,
`--no-optional-locks`, *"so the measuring instrument cannot refresh a stat-cache and taint the later
diff-to-empty"*).

The reason is mechanical, not stylistic. **`git status` writes.** It refreshes the index
stat-cache and, absent `--no-optional-locks`, rewrites `.git/index`. Running it against rows 1–7
would mean the instrument that exists to prove the shared repository untouched had itself written
into that shared repository — and it would do so *between* the before- and after-captures, which is
precisely the interval G-3 measures. A census that must write to take its own reading cannot
discharge G-3.

The dirty-state facts the porcelain column would have carried are preserved without the write:
`W0.md` §4 records `parse-that`'s uncommitted modifications by name (`.cargo/config.toml`,
`README.md`, `rust/Cargo.lock`, `rust/parse_that/src/lib.rs`,
`rust/parse_that/src/parsers/scan/decode.rs`, +) and row 2's two untracked provenance files, and the
wave record's own G-5 pre-capture carries ⟨cmd⟩ `git --no-optional-locks -C …/parse-that status
--porcelain | wc -l` → **31** as a one-shot reading taken **outside** the census interval. Unit `.c`
re-takes that same reading after the clone as part of G-5's pre/post quadruple. Nothing is lost; the
write is simply moved out of the interval it would have corrupted.

---

## 5. §4 do-not-touch coverage — no omissions, no additions

The sub-gate requires that the census output *"names every path in §4's do-not-touch list with no
omissions and no additions."* Bullet by bullet:

| §4 bullet | paths it names | census rows | verdict |
|---|---|---|---|
| 1 | `/Users/mkbabb/Programming/parse-that` (and, in its prose, the `prunable` registry entry for `/private/tmp/parse-that-m2-baseline-20260729`) | **1**, **8** | covered |
| 2 | `parse-that-css-totality`, `…-p1-e`, `…-p1-r`, `…-p1-vk`, `parse-that-runtime-probes`, `parse-that-skv26` (and row 2's two untracked files, §1b) | **2, 3, 4, 5, 6, 7** | covered |
| 3 | `~/.codex/**` — the three worktrees `7e28`, `9167`, `d0be` | **9, 10, 11** | covered ⟨cmd⟩ `ls -1 /Users/mkbabb/.codex/worktrees` → `7e28` `9167` `d0be`, **exactly three** |
| 4 | `~/Documents/Codex/**` — the construction root, the v12 target, the p4 outputs | **14, 15, 16** | covered |
| 5 | `/Users/mkbabb/Programming/value-css-totality-audit`, `/Users/mkbabb/Programming/value-xw1-demo-boot` | **12, 13** | covered |
| 6 | `/Users/mkbabb/Programming/.p-totality/**` | **17** | covered |
| 7 | `src/**`, `demo/**`, `api/**`, `test/**`, `e2e/**` **in this repository**, `scripts/dev/dev.sh`, and `docs/tranches/X/waves/W*.md` | **none — and correctly none** | see below |

**Bullet 7 is not a root class.** Those are in-repository paths of `/Users/mkbabb/Programming/value.js`
itself, which is the lane's *working* checkout, not a preserved root; enumerating it as an
eighteenth-plus row would make the census claim to freeze the very tree the wave commits into. They
are bound by a different instrument, named here so the "no omissions" claim is checkable rather than
asserted: the standing invariant **gate 27 / W4 G-2** ⟨cmd⟩ `git --no-optional-locks -C
/Users/mkbabb/Programming/value.js status --porcelain -- src api demo test e2e` → **0** rows,
measured by this unit 2026-09-17, and G-7's own `-- src test e2e api package.json package-lock.json`
check. `scripts/dev/dev.sh` is unowned, dirty by standing arrangement, **never touched and never
staged** by any seat. `docs/tranches/X/waves/W*.md` are X·V's files and no X·P unit's bounds name
them.

**On "no additions":** the census has exactly the **eighteen** rows §3.2 enumerates, no more. Rows 8
and 18 are the two that §4's bullets do not name as standalone bullets — row 8 is named inside
bullet 1's prose (*"the `prunable` registry entry for `/private/tmp/parse-that-m2-baseline-20260729`
… is itself a record"*) and row 18 is named in §6 G-3's own baseline table and counted in §3.2's
`8+3+2+3+1+1`. Neither is an unauthorized addition; both are required rows. **18 required, 18
present, 0 extra.**

---

## 6. Gate reading — G-3, before-half

| | reading |
|---|---|
| **BEFORE (wave-open, `X-P-W0.md` §G-3)** | **RED-AS-EXPECTED** — *"`roots-census.sh` does not exist and 0 of 18 are enumerated in any tracked file."* |
| **AFTER (this unit)** | **GREEN, before-half** — the script exists, `sh -n` clean, exits 0, writes no byte outside stdout, two runs byte-identical (`7f0c5b13…`); 18 of 18 roots enumerated with identities in a tracked file; `census-before.txt` captured **before `.c` dispatched** |
| **still open** | G-3's **after-half** — `diff census-before.txt census-after.txt` empty — is unit `.d`'s, at close. This unit asserts nothing about it |

Sub-gate receipts, each read from the settled bytes:

```
⟨cmd⟩ sh -n docs/tranches/X/parse-that/evidence/W0/roots-census.sh            → exit 0  (SYNTAX-OK)
⟨cmd⟩ (cd <empty dir>; sh …/roots-census.sh > run1.txt 2> run1.err)           → exit 0; stderr 0 bytes; cwd gained 0 entries
⟨cmd⟩ (cd <empty dir>; sh …/roots-census.sh > run2.txt 2> run2.err)           → exit 0; stderr 0 bytes; cwd gained 0 entries
⟨cmd⟩ diff run1.txt run2.txt                                                  → (empty), exit 0
⟨cmd⟩ shasum -a 256 run1.txt run2.txt                                         → 7f0c5b13… (both, identical)
⟨cmd⟩ stat -f '%m' …/parse-that/.git/index          before the capture run    → 1784558162 (Jul 20 10:36:02 2026)
⟨cmd⟩ stat -f '%m' …/parse-that/.git/index          after  the capture run    → 1784558162 (UNCHANGED — no stat-cache write)
⟨cmd⟩ stat -f '%m' …/.git/worktrees/parse-that-skv26/index   before / after   → 1785346523 / 1785346523 (UNCHANGED)
```

The index-mtime probe is the direct evidence for §4's claim: the instrument took its reading and the
shared repository's index files did not move.

**Not asserted by this unit**: that any root will remain unchanged. That is what the after-half
*measures*; a census that promised it would be prose again.

---

## 7. Residuals recorded, not resolved

1. **Who removed the m2-baseline worktree record, and when, is unknown.** It existed on 2026-08-03
   and does not exist on 2026-09-17. No X·P seat removed it — the lane had taken no act before this
   wave. It is recorded as a fact with two dates and no attribution. Guessing would be worse than
   not knowing.
2. **`git status` is absent from the census by design** (§4). Anyone reading `W0.md` §5's field list
   and expecting a porcelain column should read §4 before filing it as an omission.
3. **A `gc` in the shared store is invisible to this instrument** (§3c) and is G-5's to catch.
