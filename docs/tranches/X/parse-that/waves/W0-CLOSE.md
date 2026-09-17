SERVED MODEL: claude-opus-5[1m]

# X.P.W0 — CLOSE REPORT

**Wave**: X.P.W0 — Pause-State Verification and the Fresh Root (Track D · X·P).
**Spec of record**: `docs/tranches/X/parse-that/waves/W0.md` (602 lines, read whole by this seat;
**not edited** — E-3).
**Execution record**: `docs/tranches/X/execution/D/X-P-W0.md`.
**Close seat**: Opus 5 (`claude-opus-5[1m]`), 2026-09-17, `cwd = /Users/mkbabb/Programming/value.js`,
darwin arm64, node v26.0.0. **VERIFY-ONLY — this seat cured nothing.**
**Authority for the close stamp**: `W0.md` §9 commit 5 and §2's four-verb table — _"landing the eight
gates green + the close report stamps this, at this wave's own close"_.

Every reading below was taken **by this seat, at close**, against the spec's own GREEN definitions.
Nothing is inherited from a unit receipt without re-measurement; where a unit's figure and this
seat's disagree, both are printed and the divergence is named.

---

## 1. Verdict

**IMPLEMENTED 2026-09-17. Eight of eight gates GREEN, re-run and re-measured at close.**

| verb        | value                              | evidence                                                                                                           |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| AUDITED     | **YES** (unchanged)                | the pause handoff + the megatranche provenance audit                                                               |
| SPECIFIED   | **YES — 2026-08-04** (unchanged)   | three-pass L-20 loop, fable-stamped                                                                                |
| IMPLEMENTED | **YES — 2026-09-17, stamped here** | §2's gate table; five commits in §3                                                                                |
| VERIFIED    | **NO**                             | **X.P.W4's to stamp at the X·P sub-tranche release close (R-A) — never this wave's.** This report does not move it |

`W0.md` §2's four-verb table is **not edited**: it is a dated spec and E-3 makes it immutable. This
report is the dated stamp beside it, as §9's fifth commit designs.

---

## 2. The eight gates — RED before, GREEN after, re-measured at close

Baselines are `W0.md` §6's, measured 2026-08-03 at value.js HEAD `2636c238`, and the wave-open
re-dating in `X-P-W0.md` §Baseline, measured 2026-09-17. **8 of 8 RED before cure · 0
GREEN-BEFORE-CURE · 0 UNRUNNABLE** (READINESS R.2 finding count for this wave: **zero**).

| gate                                               | BEFORE                                                                                                      | AFTER (close-seat re-measurement)                                                                                                                          | turned by                              |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **G-1** handoff identities re-derived              | **RED** — no disposition in any tracked file; the four digests the lane held were the _authoring_ session's | **GREEN** — 7 named · 7 disposed · **6 MATCH · 1 EXPLAINED · 0 MISMATCH · 0 EPERM**                                                                        | `.a`                                   |
| **G-2** EPERM is not absence                       | **RED — of a changed kind**: the TCC wall was gone at open and no lane artifact recorded it                 | **GREEN** — target disposed **ABSENT by enumeration of a listable parent**, every absence sentence date- and access-qualified                              | `.a`                                   |
| **G-3** eighteen roots byte-unchanged              | **RED** — `roots-census.sh` absent; 0 of 18 in any tracked file                                             | **GREEN whole** — 18 enumerated with identities; `diff census-before census-after` **empty**, and a **third close-seat capture** is byte-identical to both | `.b` (before-half) · `.d` (after-half) |
| **G-4** p2 absent, then opened at the ruled commit | **RED — and the RED is the point**: `test -e` → `ABSENT`                                                    | **GREEN** — HEAD **string-equal** to the full 40-hex; porcelain 0; `--abbrev-ref` = `HEAD`; `remote -v` 0 lines                                            | `.c`                                   |
| **G-5** object-store isolation                     | **RED, vacuously** — no subject                                                                             | **GREEN, all three** — quadruple unchanged; inode intersection **∅**; `28M → 28M`, objects `4239 → 4239`                                                   | `.c`                                   |
| **G-6** evidence chain live                        | **RED** — 0 `x-p-*` files; `EVIDENCE-CHAIN.md` absent                                                       | **GREEN** — harvester exit 0 (re-run by this seat); `x-p-w0.json` filed, `resultCount: 4`, non-empty                                                       | `.d`                                   |
| **G-7** pause law unbroken                         | **RED** — no per-row check in any tracked file                                                              | **GREEN** — 7 prohibitions, **7 rows, 7 PASS, 0 blanket claims**, rows 1/2/5 marked as the formerly-EPERM rows                                             | `.d` (collated)                        |
| **G-8** PLAW-BIND from both ends                   | **RED** — 1 of 2 ends declared                                                                              | **GREEN — 2 of 2** — chain verbatim in `EVIDENCE-CHAIN.md` §5; `COHESION.md` §2 cited by **anchor + quoted sentence**, never by line                       | `.d`                                   |

### G-1 — HANDOFF IDENTITIES RE-DERIVED

⟨cmd⟩ `shasum -a 256 <the four paths>` — close seat, 2026-09-17:

```
ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7  docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767  /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md
0002ed933f7628797792c28258c37b150b2eb10a767eb5113db20225757d0f50  docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
```

Every one equals `W0.md` §6 G-1's 08-03 baseline **to the character**. The 685-byte header, re-proved
here and not quoted from `.a`:

```
⟨cmd⟩ tail -c 30242 <ADOPT-COPY> | shasum -a 256
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  -
⟨cmd⟩ wc -c <the four>  →  10205 · 30242 · 7558 · 30927     (30927 − 30242 = 685)
```

Builder and residue, re-hashed at close (formerly EPERM; readable under the dated grant):

```
⟨cmd⟩ shasum -a 256 …/parser-novelty-v12-construction/BUILD-V12.py
0732ebc27bc712d64d0b6ade30db13b9d8c7817524268af7d3d7474654b64ee8
⟨cmd⟩ shasum -a 256 …/__pycache__/BUILD-V12.cpython-314.pyc
de1d62ff18da4851968136b1e3190c00f6c463b9b8a5e7b5d23103155cc00937
⟨cmd⟩ stat -f '%z %p %l %N'  →  243827 100644 1 …  ·  154221 100644 1 …
⟨cmd⟩ find <construction root> -type f | wc -l  →  2     (builder + residue only)
```

Both equal the handoff §3.2 assertions on digest, size, mode and nlink. The ledger's own
seven-row self-count, read back from the **settled** bytes by this seat:

```
⟨cmd⟩ sed -n '76,85p' <ledger> | grep -c '^| [1-7] '   →  7
disposition cells:  1 MATCH · 2 MATCH · 3 MATCH · 4 EXPLAINED · 5 MATCH · 6 MATCH · 7 MATCH
⟨cmd⟩ shasum -a 256 <ledger> → b7aa83e9fc6817082edfd03292ee4cc04e837b167edc6bca324064925ba17535
⟨cmd⟩ wc -c / wc -l <ledger> → 36269 / 504   (double-run identical)
⟨cmd⟩ git diff HEAD --stat -- <ledger> | wc -l → 0   (committed blob == settled bytes)
```

**Rows named 7 = rows disposed 7. MISMATCH 0 ⇒ no handoff §9 STOP, no `W0.md` §3a dispatch.**

**Per-row EPERM disclosure (stated as such, per §8).** Rows 5, 6 and 7 read **EPERM on 2026-08-03**
and read **MATCH / ABSENT on 2026-09-17**. The 08-03 cells of `W0.md` §6 G-1 **stay EPERM** — this
report cites the ledger's dated §6 addendum rather than re-stating them, exactly as `.a`'s residual 3
asked. The grant is a property of _this reader on this date_, not of the tree.

### G-2 — EPERM IS NOT ABSENCE

Absence disposed by **enumeration**, never by a failed `ls` — re-run at close:

```
⟨cmd⟩ ls -1 /Users/mkbabb/Documents/Codex/2026-08-02/ | wc -l                      → 133  (run 1)
⟨cmd⟩ ls -1 /Users/mkbabb/Documents/Codex/2026-08-02/ | wc -l                      → 133  (run 2)
⟨cmd⟩ ls -1 … | grep -c '^parser-novelty-and-experiment-v12$'                      →   0
⟨cmd⟩ ls -1 … | grep -c '^parser-novelty-and-experiment-v[0-9]*$'                  →  11  (v1..v11 present)
⟨cmd⟩ test -e …/parser-novelty-and-experiment-v12 && echo PRESENT || echo ABSENT   → ABSENT
⟨cmd⟩ ls -d …/2026-07-29/parser-p4-fresh-sol-adjudication/outputs                  → (lists)
```

**Disposition: ABSENT as measured 2026-09-17 by a reader with listable, readable parent access.**

_Falsifier audit, performed on the settled bytes by this seat_ — `W0.md` §6 G-2: _"any sentence in
the wave's artifacts of the form 'the v12 target is absent' that is not immediately qualified by the
measurement date and the reader's access state fails the gate"_:

```
⟨cmd⟩ grep -c -i 'absen' <PAUSE-AUTHENTICATION-2026-09-17.md>   →  21
⟨cmd⟩ git show HEAD:<same> | grep -c -i 'absen'                 →  21   (settled == committed)
```

All 21 read and classified by this seat: each is **qualified inline**, or a **quotation** of the
handoff/gate, or a **literal command output**, or a **meta-claim about qualification**. **Zero bare
absence assertions. The falsifier does not fire.** — _See residual R-1: the unit receipt published
this count as 19._

### G-3 — EIGHTEEN ROOTS, BYTE-UNCHANGED

```
⟨cmd⟩ sh -n docs/tranches/X/parse-that/evidence/W0/roots-census.sh   → exit 0 (SYNTAX-OK)
⟨cmd⟩ diff …/census-before.txt …/census-after.txt  → (empty) exit 0   (run 1)
⟨cmd⟩ diff …/census-before.txt …/census-after.txt  → (empty) exit 0   (run 2)
⟨cmd⟩ shasum -a 256 …/census-before.txt  → 7f0c5b13a3e80f54d290008830024cd6c0f2300ea0a5898f91c4c88b431019d7
⟨cmd⟩ shasum -a 256 …/census-after.txt   → 7f0c5b13a3e80f54d290008830024cd6c0f2300ea0a5898f91c4c88b431019d7
```

**A THIRD capture, taken by this seat at close** — the reading that makes the invariance a property
of the roots rather than of when `.b` and `.d` happened to look:

```
⟨cmd⟩ sh …/roots-census.sh > <scratch>/census-close.txt   → exit 0, stderr 0 bytes
⟨cmd⟩ shasum -a 256 <scratch>/census-close.txt → 7f0c5b13a3e80f54d290008830024cd6c0f2300ea0a5898f91c4c88b431019d7
⟨cmd⟩ diff …/census-before.txt <scratch>/census-close.txt → (empty)   CLOSE-CAPTURE-IDENTICAL
⟨cmd⟩ grep -c 'ROOTS ENUMERATED: 18' <scratch>/census-close.txt → 1
```

**Three captures, one digest, across the whole wave including `.c`'s clone.** The output names every
path in `W0.md` §4's do-not-touch list — the shared repository, its six frozen worktrees, the three
`~/.codex` worktrees, the three `~/Documents/Codex` paths, the two value.js siblings, `.p-totality`
and the ephemeral job tree — **0 omissions, 0 additions**, `8+3+2+3+1+1 = 18`.

Dated addenda beside `W0.md`'s 08-03 baseline (E-3, never a rewrite), all re-confirmed at close:
`git --no-optional-locks -C …/parse-that worktree list` returns **7, not 8** — the `prunable` record
for `/private/tmp/parse-that-m2-baseline-20260729` is gone (ruled at `COHESION.md` §0j gate 25);
`ls -1 .git/worktrees | wc -l` → **6**. **The load-bearing consequence is unchanged**: six frozen
worktrees share **one** object store, so one `gc` reaches all of them — which is why the opening was
a clone.

### G-4 — P2 OPENED AT THE RULED COMMIT

Re-run in full by this seat:

```
⟨cmd⟩ git -C <p2> rev-parse HEAD           → f5757082ca160dd5f25fcf437e692c9df8f7e78d
⟨cmd⟩ [ "$H" = f5757082ca160dd5f25fcf437e692c9df8f7e78d ] && echo HEAD-EQ-RULED-COMMIT
                                            → HEAD-EQ-RULED-COMMIT        (full 40-hex equality)
⟨cmd⟩ git -C <p2> status --porcelain | wc -l      → 0
⟨cmd⟩ git -C <p2> rev-parse --abbrev-ref HEAD     → HEAD                  (detached)
⟨cmd⟩ git -C <p2> remote -v | wc -l               → 0
⟨cmd⟩ git -C <p2> for-each-ref refs/heads refs/remotes | wc -l  → 0
⟨cmd⟩ git -C <p2> cat-file -t HEAD                → commit
⟨cmd⟩ git -C <p2> rev-parse 'HEAD^{tree}'         → 3809a1ed635575b281641c826d9831b609a8b8ef
⟨cmd⟩ find <p2> -type f -not -path '*/.git/*' | wc -l   → 691
⟨cmd⟩ git -C <p2> log -1 --format='%H | %ad | %s'
f5757082ca160dd5f25fcf437e692c9df8f7e78d | Sun Aug 2 06:49:24 2026 -0400 | docs(parser-audit): bank N2 v10 two-review terminal intake and novelty boundary
⟨cmd⟩ test -d <p2>/.git                           → DIRECTORY             (an independent repository)
```

Date and subject equal the provenance `W0.md` §6 G-4 recorded on 2026-08-03, re-derived **in the
clone**. Neither falsifier can fire: no branch ref survives to be a moving tip, and the clone is
complete (valid HEAD commit, resolvable tree, clean porcelain, 691-file checkout).

### G-5 — OBJECT-STORE ISOLATION

**(i) The source quadruple.** `.c` captured it before the clone (`04f2c538…c324`, twice). This seat
captured it **again at close**, after every unit had run:

```
⟨cmd⟩ { worktree list ; rev-parse HEAD ; branch -a ; status --porcelain }   (all --no-optional-locks)
      components: worktree 7 · HEAD ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42 · branch -a 33 · status 31
⟨cmd⟩ diff <.c's source-quad-before.txt> <close capture>
1d0 < == worktree list ==   9d7 < == rev-parse HEAD ==   11d8 < == branch -a ==   45d41 < == status --porcelain ==
```

The **only** difference is `.c`'s four section-label lines; every substantive line is identical.
**7 / ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42 / 33 / 31 — unchanged from before the clone to now.**

**(ii) The inode intersection**, re-run at close:

```
⟨cmd⟩ find <each>/.git/objects -type f -exec stat -f '%i' {} + | sort -u
      source 4239 unique inodes · p2 4239 unique inodes
⟨cmd⟩ comm -12 inodes-source inodes-p2 | wc -l   →   0
⟨cmd⟩ comm -12 inodes-source inodes-p2 | wc -c   →   0
⟨cmd⟩ find <each>/.git/objects -type f -links +1 | wc -l   →  0  and  0
```

**(iii) The source untouched**, four independent readings at close:

```
⟨cmd⟩ du -sh …/parse-that/.git                       →  28M          (the census figure)
⟨cmd⟩ test -e …/parse-that/.git/gc.log               →  NO-GC-LOG
⟨cmd⟩ find …/parse-that/.git/objects -type f | wc -l →  4239
⟨cmd⟩ ls -1 …/parse-that/.git/worktrees | wc -l      →  6
⟨cmd⟩ git -C …/parse-that worktree list | grep -c 'totality-p2'  →  0   (p2 absent from the registry)
```

Both of G-5's falsifiers are answered: a `git worktree add` would have added a registry entry and a
branch ref (it did not — `0` and `6`), and a default hardlinking clone would show a non-empty inode
intersection (it does not — `0`).

### G-6 — EVIDENCE CHAIN LIVE

```
⟨cmd⟩ node docs/tranches/V/megatranche/workflows/harvest-journals.mjs   → EXIT=0
      (run by this seat with its process cwd in the scratchpad, the script UNMODIFIED and
       CLAUDE_SESSION_DIR unset, so the real session root is read and no byte lands outside bounds)
⟨cmd⟩ git status --porcelain -- docs/tranches/V/megatranche/registry | wc -l  → 0   (sandbox run wrote nothing here)
⟨cmd⟩ ls docs/tranches/V/megatranche/registry/harvest/ | grep '^x-p-'   → x-p-w0.json
⟨cmd⟩ wc -c / wc -l …/x-p-w0.json  →  30067 / 190
⟨cmd⟩ shasum -a 256 …/x-p-w0.json  →  cccd07a2eced029ce89df55798df5c2435ad727068c2aa857eb98c88f06dabe0
⟨cmd⟩ node -e '…' → runId wf_c431fb2c-82d · resultCount 4 · seats aa1463c0583fa72bc a0db657d46d167768
                    aa528852d0211f3f9 ac399c0f9a5e60338
⟨cmd⟩ test -f docs/tranches/X/parse-that/EVIDENCE-CHAIN.md → CHAIN-PRESENT (21964 B · 317 L)
```

**The gate's GREEN condition, conjunct by conjunct**: harvester exits 0 ✓ · `x-p-w0.json` exists ✓ ·
seat list non-empty ✓ · _"count equals the units dispatched"_ — **4 units dispatched (`.a` `.b` `.c`
`.d`), resultCount 4** ✓. The falsifier's intended failure — the rate-wall false negative — **does
not obtain**: killed **0**, `NO_JURY` **0**, zero-row harvests **0**, every one of the four rows
contentful.

**Stated plainly rather than left to the count.** The four harvested seats are `open` · `.a` · `.b` ·
`.c`. `.d` — the harvesting seat — is **not** among them, because a seat cannot harvest a result it
has not yet written. Measured by this seat from the journal:

```
⟨cmd⟩ ls <session>/subagents/workflows/wf_c431fb2c-82d/*.meta.json | wc -l  →  6
      descriptions: X.P.W0:open · X.P.W0.a · X.P.W0.b · X.P.W0.c · X.P.W0.d · X.P.W0:close
      every one  model: opus      (M-23 seat law, all six)
⟨cmd⟩ journal.jsonl → 12 rows · {"launched":1,"started":6,"result":5}
⟨cmd⟩ a fresh harvest of the same journal, run at close → wf_c431fb2c-82d.json resultCount 5,
      seats aa1463c0 a0db657d aa528852 ac399c0f ae2cbfaa   (the full roster, .d included)
```

So the roster gap is **real, structural, and closable by one command**. This seat did **not** close
it: `registry/harvest/x-p-w0.json` is unit `.d`'s path in §4a, and a close seat rewriting it would be
a write outside its own bounds. Filed as **R-3** with a named owner. The gate is **GREEN on its
stated GREEN condition**; the `units`(4)-vs-`seats`(5) ambiguity inside the gate's own text is filed
as **R-4** for the L-18 quartets.

### G-7 — PAUSE LAW UNBROKEN (seven rows, re-measured at close)

| #   | handoff §7 prohibition                                                                                              | this seat's own check, 2026-09-17                                                                                                                                                                                                                       | reading                                                                                                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `BUILD-V12.py` not run                                                                                              | `shasum` → `0732ebc2…64ee8` · `stat -f '%z %p %l %i %Sm'` → `243827 100644 1 241579269 Aug 2 13:19:15 2026` · `find <root> -type f -newermt '2026-09-01' \| wc -l` → **0**                                                                              | **PASS** — digest, size, mode, nlink, **inode** and mtime all unmoved. _Formerly EPERM; directly checked under the dated `~/Documents/Codex` grant_                                            |
| 2   | no v12 target materialized                                                                                          | `ls -1 …/2026-08-02/ \| wc -l` → **133** (×2) · `grep -c '^parser-novelty-and-experiment-v12$'` → **0** · `test -e` → **ABSENT**                                                                                                                        | **PASS** — by enumeration of a listable parent. _Formerly EPERM._ First date handoff §9's _"a present v12 target"_ is detectable **at all** — **it does not fire**                             |
| 3   | no generated parser/auditor source imported or executed                                                             | `git -C <p2> status --porcelain \| wc -l` → **0** · `test -e <p2>/node_modules` → **NO-NODE_MODULES** · `find <p2> -maxdepth 2 \( -name target -o -name __pycache__ \) \| wc -l` → **0** · `find <p2> -type f -not -path '*/.git/*' \| wc -l` → **691** | **PASS** — the fresh root is cloned and nothing else: no install, no build, no run                                                                                                             |
| 4   | no mutation of `parse-that`, Value parser/CSS source, package state, tests, benchmarks, caches, release coordinates | `git status --porcelain -- src test e2e api package.json package-lock.json \| wc -l` → **0** · `-- src api demo test e2e` → **0** · **G-3** census diff empty (three captures, one digest) · **G-5** quadruple unchanged, objects `4239 → 4239`         | **PASS**, by three independent instruments                                                                                                                                                     |
| 5   | the `__pycache__` residue NOT cleaned                                                                               | `shasum` → `de1d62ff…c00937` · `stat` → `154221 100644 1`, mtime `Aug 2 11:36:36 2026` · `find <root> -type f \| wc -l` → **2**                                                                                                                         | **PASS** — present, byte-identical, mtime unmoved: never removed, regenerated, normalized, or credited. _Formerly EPERM_                                                                       |
| 6   | no N4 / parser-law P01 / CSS DREI-v12 / performance-family dispatch                                                 | `ls …/wf_c431fb2c-82d/*.meta.json \| wc -l` → **6** — `open` · `.a` · `.b` · `.c` · `.d` · `close`, every one `model: opus`                                                                                                                             | **PASS** — four units, the open seat and this close seat; **none is a family**, and no second workflow was launched for this lane. _Dated addendum: `.d` read 5; the sixth is this close seat_ |
| 7   | no parser evidence bound into non-parser cross-repository input slots                                               | **G-8** below + `grep -rn 'parse-that' docs/tranches/X/{fourier,keyframes}/waves/ \| wc -l` → **47**, all classified by `.d`                                                                                                                            | **PASS** — forbidden-non-edge declarations, bounds exclusions, and the lawful `RC-P` gate-key / packed-release route. **Zero direct consumptions**                                             |

**Seven named · seven disposed · seven PASS · zero blanket claims.** Rows 1, 2 and 5 were
EPERM-bounded at authoring and are marked as such, each carrying the date and access state of its
reading — so a later seat under a revoked grant records **EPERM beside**, never inheriting today's
PASS. This is the gate's own falsifier honoured, not paraphrased.

### G-8 — PLAW-BIND DECLARED FROM BOTH ENDS

The two literal fragment greps, run at close against the working tree **and** against `HEAD`'s blob:

```
⟨cmd⟩ grep -n 'X·P release condition → KF.W3' docs/tranches/X/COHESION.md
66:- **X·P release condition → KF.W3** (parser consumption): gate-keyed, never scheduled; routing is
⟨cmd⟩ grep -n 'parse-that→fourier is FORBIDDEN' docs/tranches/X/COHESION.md
68:  parse-that→fourier is FORBIDDEN** (standing routing law).
⟨cmd⟩ git show HEAD:docs/tranches/X/COHESION.md | grep -c '<each fragment>'   →  1  and  1
```

Each returns **≥ 1** row; the second falsifier (_either fragment grep returning zero_) does not fire.
**The `:66` / `:68` coordinates are today's measurement, never the citation** — `COHESION.md` is a
declared live document and a line pin rots by design.

This lane's own end:

```
⟨cmd⟩ head -1 docs/tranches/X/parse-that/EVIDENCE-CHAIN.md  → SERVED MODEL: claude-opus-5[1m]
⟨cmd⟩ grep -c 'Fourier F.W0 atomic tuple' <chain>            → 1   (the handoff §2 chain, verbatim)
⟨cmd⟩ grep -n 'forbidden' <chain> → §5 "Direct `parse-that -> Fourier` credit is forbidden."
                                    §6 the COHESION §2 quotation, by anchor + sentence
⟨cmd⟩ grep -c 'COHESION.md:[0-9]' <chain>                    → 0   (no line coordinate used as a citation)
```

**2 of 2 ends declared.** The V·L5 rename (CC-011 / C-13 RETIRE, rewritten at X-W0.i) is **flagged**
in the chain, not silently adopted in either spelling.

---

## 3. Commit roster

Five commits, `W0.md` §9's plan verbatim, all on `tranche-u`, all pathspec-staged, all carrying the
`Claude-Session` trailer:

| §    | commit        | subject                                                                                                     | files                                                                                        | seat  |
| ---- | ------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----- |
| §9 ① | `80d96f18`    | `docs(x-p-w0/auth): re-derive the pause handoff's identities — seven rows, three dispositions`              | 1 (+504)                                                                                     | `.a`  |
| §9 ② | `b69611a8`    | `docs(x-p-w0/census): the eighteen preserved roots, the shared-repository finding, and the never-touch law` | 3 (+522)                                                                                     | `.b`  |
| §9 ③ | `8a83c8bb`    | `chore(x-p-w0/root): open parse-that-css-totality-p2 at f5757082 by no-hardlink clone`                      | **0 — empty diff by design**; the act is outside this repo and the body carries the receipts | `.c`  |
| §9 ④ | `6da438f6`    | `docs(x-p-w0/chain): evidence chain, harvest, and PLAW-BIND declared from this end`                         | 1 (+45)                                                                                      | `.d`  |
| §9 ⑤ | _this report_ | `docs(x-p-w0): close report + evidence`                                                                     | W0-CLOSE.md + the record's §Close + LEDGER                                                   | close |

Record-append commits (the wave record, not §9 artifacts): `607efb0e` (`.a`), `fa9597cd` (`.b`'s
absorption note), `c0d70599` (`.c`), `9dfcacca` (`.d`).

**Writable-set conformance, verified commit by commit** (`git show --name-only`). Every path any unit
committed is in `W0.md` §4's table:

```
docs/tranches/X/parse-that/evidence/W0/PAUSE-AUTHENTICATION-2026-09-17.md   (.a)
docs/tranches/X/parse-that/evidence/W0/FROZEN-ROOTS-CENSUS-2026-09-17.md    (.b)
docs/tranches/X/parse-that/evidence/W0/roots-census.sh                      (.b)
docs/tranches/X/parse-that/evidence/W0/census-before.txt                    (.b)
/Users/mkbabb/Programming/parse-that-css-totality-p2/**                     (.c, outside this repo)
docs/tranches/X/parse-that/EVIDENCE-CHAIN.md                                (.d)
docs/tranches/V/megatranche/registry/harvest/x-p-w0.json                    (.d)
docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md                       (.d, by script)
docs/tranches/X/parse-that/evidence/W0/census-after.txt                     (.d)
docs/tranches/X/COHESION.md                                                 (.d, modify-carve, 2 loci)
```

**Zero bytes outside the writable set, in any unit.** The `COHESION.md` carve is exactly the two loci
§4 allows — `git show 9c72f097 -- docs/tranches/X/COHESION.md` → **8 insertions, 1 deletion**: the §0
X·P status row (one line replaced) and one §5 status-board bullet; ⟨cmd⟩ `sed -n '64,70p'` shows §2's
X·P bullet **byte-untouched**.

### Landed wrong — recorded, never rewritten

Three of the five §9 commits were taken under live concurrency on one shared index, and **two units'
staged bytes were absorbed by a concurrent seat's bare `git commit`** before their own commit ran:

| what landed wrong                                        | where it actually landed                          | verified intact                                                                                                             |
| -------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `.b`'s record receipts block (`X-P-W0.md` +203)          | `a10e33ad` — a Track B **LEDGER** commit          | `git show HEAD:…/X-P-W0.md \| grep -c '^### X.P.W0.b$'` → **1**; `git diff HEAD --stat` → **0**                             |
| four of `.d`'s five writable paths + `EVIDENCE-CHAIN.md` | `9c72f097` — a Track A **X-W0.e receipts** commit | `git diff HEAD --stat -- <all five>` → **0**; both G-8 fragment greps against `HEAD`'s `COHESION.md` blob → **1** and **1** |

**Nothing is lost and nothing diverges** — the bytes are correct, committed, and byte-equal to the
settled files; only the commit each rode in is wrong. **No history was rewritten to correct it**
(`git show --stat` on every commit above was taken from the live history). Both facts were recorded
by the units themselves and by the absorbing Track A seat (`7f7455bd`) at the time.

**The law this sharpens, for every later wave of this program** — the units found it at three
independent sites and the cure is now proven at two:

1. _"Pathspec commits only"_ binds the **commit** verb, not only the `add` verb: `git commit --only
-- <path>` builds the commit from `HEAD` plus the named path and leaves the rest of the shared
   index untouched. `.c` and `.d` used it and each took exactly its own paths.
2. `--only` protects the **committing** seat, not the **staged** file. Anything sitting in the shared
   index is absorbable by any concurrent bare commit. **Stage as late as possible and commit in the
   same breath**: every measurement before the `add`, nothing between `add` and `commit`.

---

## 4. Verification artefacts (§8), each present and measured

| §8 artefact                      | path                                                                                                                           | settled bytes, double-run                                                                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| seven-row identity ledger        | `evidence/W0/PAUSE-AUTHENTICATION-2026-09-17.md`                                                                               | 36,269 B · 504 L · `b7aa83e9…17535`                                                                                                                                                       |
| eighteen roots + never-touch law | `evidence/W0/FROZEN-ROOTS-CENSUS-2026-09-17.md`                                                                                | 25,088 B · `5821b5e1…2794`                                                                                                                                                                |
| the executable re-census         | `evidence/W0/roots-census.sh`                                                                                                  | 6,575 B · `56e3d6c4…83fd` · `sh -n` exit 0                                                                                                                                                |
| census before                    | `evidence/W0/census-before.txt`                                                                                                | 3,242 B · `7f0c5b13…19d7`                                                                                                                                                                 |
| census after                     | `evidence/W0/census-after.txt`                                                                                                 | 3,242 B · `7f0c5b13…19d7`                                                                                                                                                                 |
| **the diff, pasted**             | —                                                                                                                              | `diff census-before census-after` → **(empty), exit 0**, twice; plus a third close-seat capture at the same digest                                                                        |
| clone receipts                   | §2 G-4 / G-5 above                                                                                                             | HEAD · porcelain · abbrev-ref · `remote -v`; the pre/post quadruple; the inode intersection; `du -sh` before and after                                                                    |
| evidence chain + harvest         | `EVIDENCE-CHAIN.md` (21,964 B · 317 L · `34dd436c…43c4`) · `registry/harvest/x-p-w0.json` (30,067 B · 190 L · `cccd07a2…abe0`) | both present                                                                                                                                                                              |
| **this close report**            | `waves/W0-CLOSE.md`                                                                                                            | created here                                                                                                                                                                              |
| commit hashes + model receipts   | §3 above                                                                                                                       | five §9 commits; **line 1 of all seven created artefacts reads `SERVED MODEL: claude-opus-5[1m]`** (the `.sh` in its own comment syntax; the two `.txt` captures emit it from the script) |

**Format cadence (§7).** `git diff --check` **clean** on all four hand-authored paths and on the
working tree (`git diff --check | wc -l` → **0**). `roots-census.sh` passes `sh -n` and was run
twice — its second run _is_ its test, and this seat ran a third. No `npm run lint` / `typecheck` /
`test`: the wave touches zero TypeScript and zero product source, and a green test run over untouched
code is exactly the vacuous evidence **L-19** forbids. **Gate 27 / W4 G-2** at close ⟨cmd⟩
`git status --porcelain -- src api demo test e2e` → **0**.

---

## 5. E13 — the four-path mail sweep, at close

Swept read-only by this seat at its own clock (2026-09-17 13:40), newest item per path:

| #   | path                                                | newest                                                                                                                                                    | disposition             |
| --- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1   | `docs/tranches/V/` + `V/coordination/`              | `INBOX.md` @ 13:20 (**self-excluded**, SELF-COUNT law) → `value-inbox-2026-09-17-o8-o11-amendment-addendum.md` @ 13:09, **ours** (the O-21 retained copy) | nothing inbound unrowed |
| 2   | `../glass-ui/docs/tranches/BK/coordination/`        | `glass-outbound-2026-08-29-valuejs-o20-ack.md` @ Aug 29 16:41                                                                                             | **I-30, rowed**         |
| 3   | `../keyframes.js/docs/tranches/V/coordination/`     | nothing newer than the 13:20 sweep                                                                                                                        | rowed                   |
| 4   | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` @ Aug 3 15:01, **ours**                                                                         | rowed                   |

**Delta test** ⟨cmd⟩ `find <the four paths + ../keyframes-v-exec/…/coordination> -maxdepth 1 -type f
-newermt '2026-09-17 …'` → **value's own four files only** (this ledger and three retained outbound
copies of ours); paths 2, 3, 4 and the exec-visible delivery path return **nothing**.

**0 unrowed letters · 0 new `I-n` minted · I-31 the inbound tail · O-21 the outbound tail · 0 UNREAD
in X.P.W0's scope.** ⟨cmd⟩ `grep -n -i 'unread' INBOX.md` → 11 rows, **all** of them the ledger's own
law text or a prior sweep record; **no row's status cell reads UNREAD**. **This wave does not close
with unread mail.**

---

## 6. Residuals, each with a named owner

Nothing below is cured here — this is the close seat and it cures nothing.

| id       | residual                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | owner                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **R-1**  | **A published self-count is wrong in the unit receipt, not in the artefact.** `.a`'s receipt and the wave record state _"`grep -n -i 'absen' <ledger>` → 19 rows"_; the settled bytes give **21** (`grep -c` → 21, and `git show HEAD:<ledger> \| grep -c` → 21, so the file did not change after the count). The **substance holds** — this seat read all 21 and every one is qualified, a quotation, a literal output, or a meta-claim — so G-2 is GREEN on the merits. But SELF-COUNT law is that a published count is read from the settled bytes, and this one was not. Corrected here as a **dated addendum beside**; `.a`'s receipt is not rewritten                                                                                                                                                                                                                                                                                                                                                         | **X.P.W1 seat 0** — carry the corrected figure; do not re-derive from the receipt                               |
| **R-2**  | **G-4 conjunct 4 is unreachable by §5's two literal commands.** `git clone` creates `origin` by construction — with a **push** URL into the shared repository of six frozen worktrees — plus `refs/heads/master` tracking it. `.c` reached §5's own stated end state (_"no remote is added … no branch is created"_, _"creates no branch ref in the clone that invites a push"_) with `git remote remove origin` + `git branch -D master`, both writing only inside `<p2>/.git`. **Ruled here: CORRECT, and the divergence is the spec's, not the seat's** — the mechanism and the gate do not meet, and the gate states the intended end state while the mechanism under-specifies it. **Cost, stated**: p2's 24 non-packet branch tips are no longer _reachable_ (objects all present, 4239, nothing pruned; every tip survives in the preserved source). The alternative — a live push URL into the frozen roots' shared repository, inside the "provably fresh" root — is worse by the wave's own §2a criterion | **L-18 quartets** to re-rule; **X.P.W1** to author §5's third command as a dated addendum-beside if they concur |
| **R-3**  | **`x-p-w0.json` carries 4 seats, not 5.** The roster is `open` · `.a` · `.b` · `.c`; `.d` is absent because it _was_ the harvesting seat. Measured closable at close: a fresh harvest of the same journal **today** yields `resultCount: 5` with `.d` included. Not taken here — the path is `.d`'s in §4a and a close seat rewriting it would breach its own bounds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | a seat whose §File Bounds include `registry/harvest/**` — **X.P.W1**, one command                               |
| **R-4**  | **G-6's own text is ambiguous**: the GREEN condition says _"count equals the **units** dispatched"_ (4) and the falsifier says _"fewer **seats** than were dispatched"_ (5, counting the open seat). This report rules **GREEN on the GREEN condition** and records the ambiguity rather than picking the flattering reading                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **L-18 quartets**; the wave that amends X·P gate text                                                           |
| **R-5**  | **MAJOR — the harvester drops the conformance schema.** `harvest-journals.mjs`'s row template assumes the _challenger_ schema and silently drops every row written in the _conformance_ schema (`severity`/`claim`/`receipt`): **1,473 of `DEFECT-LEDGER.md`'s 7,506 rows are empty stubs**. Read the headline as **7,506 = 6,033 with content + 1,473 stubs** until cured. Falsifier after a cure: `grep -c '^\*\*Defect\.\*\* $'` must go **1473 → 0** with the headline unchanged. Not cured here — §4 gives this wave _execute, no write to itself_ over the script, and hand-editing the generated ledger would diverge the bytes from their generator and be re-introduced by the next harvest (a masking fix by definition)                                                                                                                                                                                                                                                                                  | the wave that owns `docs/tranches/V/megatranche/workflows/**`                                                   |
| **R-6**  | **`git diff --check` is RED on `DEFECT-LEDGER.md` alone** — 2,946 machine-emitted trailing-whitespace rows, the symptom of R-5. **CLEAN on all four hand-authored paths and on the working tree.** _Ruled here_: a machine-generated artefact is **not** in §7's `--check` denominator — §7 binds _"Prettier over the touched `.md` files"_ and `git diff --check` as an **authoring** cadence, and hand-correcting a generator's output is a masking fix                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ruled; no owner needed                                                                                          |
| **R-7**  | **Prettier is not applied repo-wide and cannot be applied here.** ⟨cmd⟩ `npx prettier --check 'docs/tranches/X/**/*.md'` → **255 files fail**, including the immutable spec `W0.md` and the wave record. `.a` applied it to its own artefact (§7's cadence target); `.b` and `.d` declined on the shared record because HEAD's version is already non-Prettier-formatted and a `--write` would reformat the orchestrator's bytes wholesale and collide with a concurrent seat's append. _Ruled here_: **§7's cadence is met where a hand can meet it** — `git diff --check` clean on every hand-authored path — and a repo-wide reformat is a separate, owner-scale act                                                                                                                                                                                                                                                                                                                                             | the wave that owns the repo-wide format decision                                                                |
| **R-8**  | **79 completed workflow runs still have no per-run JSON in `registry/harvest/`.** A repository-root harvest would create them — and **81 paths outside every X.P.W0 unit's writable set**, which is why `.d` measured the surface and bounded the process `cwd` instead. Their defect rows **are** in `DEFECT-LEDGER.md`, so nothing is lost in substance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | a seat whose bounds include `registry/harvest/**`                                                               |
| **R-9**  | **The harvester's `NAMES` map has no X·P entry**, so every future X·P wave must copy its run file to the lane's stable name by hand                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | the wave that owns the script                                                                                   |
| **R-10** | **The grant is dated, not durable.** G-1 rows 5–7 and G-7 rows 1/2/5 are PASS **only** for a reader holding the 2026-09-17 `~/Documents/Codex` access. Under a revoked grant a later seat records **EPERM beside**, and may not carry today's reading forward                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | every later X·P seat                                                                                            |
| **R-11** | **Five handoff-named digests have no subject** — §3.2's dry-audit generated identities (contract, Markdown, matrix, predecessor registry, generated source). Deliberately not rows of the seven-row table: they describe a packet never materialized, so MATCH/MISMATCH/EPERM would each be a conflation. Corroborated at the bytes — the construction root holds exactly **2** files. Their revival is `W0.md` §10's **DORMANT-UNLESS-NC-0-REVIVED** set, owner-release-gated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | disclosed; owner-release-gated                                                                                  |
| **R-12** | **`W0.md` §6 G-1's 08-03 table diverges from the measured state on rows 5–7** (EPERM there, MATCH/ABSENT here). E-3 working as designed. **This report cites the ledger's dated §6 addendum rather than re-stating G-1's 08-03 cells** — `.a`'s residual 3, discharged                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | discharged here                                                                                                 |
| **R-13** | **The fresh root is pinned but not frozen.** Nothing enforces that a later wave stays at `f5757082` — no ref, no hook, no lock; the detached HEAD is a convention. X.P.W1's port lands _in_ this root and will move its tree by design. The guarantee W0 establishes is about the **source**, not about p2's future                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **X.P.W1** — do not over-read G-4 as a standing invariant                                                       |
| **R-14** | **`du -sh` is a coarse instrument for G-5 (iii)** — 1 MB resolution, so a sub-megabyte write into the source would read 28M either side. It is the gate's named instrument and is reported as such; the **fine** evidence beside it carries the claim: objects file count `4239 → 4239` (exact), the seven index mtimes unmoved to the second, and the quadruple digest                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | later seats: prefer the three fine readings                                                                     |
| **R-15** | **The clone was not `fsck`'d** — a deliberate omission, not an oversight: neither G-4 nor G-5 asks for it, and §5 forbids executing anything in the fresh root beyond the opening. Completeness evidence is HEAD's object type, tree id, clean porcelain and the 691-file checkout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | recorded                                                                                                        |
| **R-16** | **Who removed the m2-baseline worktree record, and when, is unknown.** Present 2026-08-03, absent 2026-09-17; no X·P seat removed it — the lane had taken no act before this wave. Recorded with two dates and **no attribution**. The prohibition on `worktree prune` is now **stricter**: six registry records are all that remain to lose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | recorded; no attribution invented                                                                               |
| **R-17** | **The commit-absorption class** (§3 "Landed wrong"). Bytes correct, commits wrong, at three sites. The sharpened law is written in §3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | every seat of every concurrent track                                                                            |

---

## 7. Escalations

**One, and it is the push instruction.**

**E-1 — `git push origin HEAD` from `/Users/mkbabb/Programming/parse-that` is REFUSED as
spec-forbidden.** The close seat's act list names it; the governing spec forbids it twice, in terms
that leave no room:

- `W0.md` §4, do-not-touch, first bullet: _"`/Users/mkbabb/Programming/parse-that` — the read-only
  evidence root, **and the shared repository of six frozen worktrees** … **Do NOT touch, under any
  circumstance, at any point in this wave**."_
- `W0.md` §5 `X.P.W0.c`: _"**No remote is added, no push is ever run**, no branch is created."_
- `W0.md` §3a: _"any write inside `/Users/mkbabb/Programming/parse-that` … **invalidates the wave
  outright**."_

Measured, so the refusal is not a guess:

```
⟨cmd⟩ git -C …/parse-that remote -v      → origin  https://github.com/mkbabb/parse-that.git (fetch/push)
⟨cmd⟩ git --no-optional-locks -C …/parse-that rev-parse HEAD                     → ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42
⟨cmd⟩ git --no-optional-locks -C …/parse-that rev-parse refs/remotes/origin/master → ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42
⟨cmd⟩ git --no-optional-locks -C …/parse-that rev-list --count origin/master..HEAD →  0
```

**There is nothing to push.** X.P.W0 wrote **zero bytes** in `parse-that` by design — its act was a
`--no-hardlinks` clone into `parse-that-css-totality-p2`, and `.c` removed that clone's `origin`
precisely so **no push path exists anywhere in this lane**. A push would be a network act
originating from the one root the whole wave exists to prove untouched, and it would write
remote-tracking state into the `.git` that G-5 (iii) certifies bit-identical.

**Disposition: NOT PERFORMED, returned to the orchestrator.** The lawful half of the act — the
value.js push — **was** performed. If the owner wants parse-that's `master` published, that is a
separate owner act outside every X·P wave's bounds, and it must not ride a wave whose close report
asserts the root is untouched.

**Nothing else escalates.** Zero writes outside any unit's writable set · zero `gc` / `repack` /
`prune` / `worktree prune` / `stash` / `reset --hard` / force-push anywhere · zero §9 STOP conditions
fired (all five evaluated row by row by `.a`, **0 of 5**) · `W0.md` §3a evaluated at every seat and
**not triggered** · clone-failure counter **0** · zero third diagnose→act→re-measure iterations ·
`../glass-ui` untouched · `~/.codex/**` and `~/Documents/Codex/**` read/hash only (C-02: the builder
hashed and `stat`ed, never opened for edit or run; the residue hashed, never cleaned) ·
`scripts/dev/dev.sh` never touched and never staged.

---

## 8. What this wave did **not** do, stated so no reader over-reads the close

It repaired **nothing** in the v1–v11 novelty design and imported none of its source. It ran no
builder, materialized no v12 target, cleaned no residue, installed and executed nothing in the fresh
root, published no package surface, and asked nothing of any producer. Handoff §8 steps 3–8 keep the
dispositions `W0.md` §10 gives them — step 3 at **X.P.W2 G-2**, step 5 at **X.P.W3 G-4**, step 8's
release limb **OWNER-GATED at X.P.W4 OP-1** (a second dated owner word, distinct from the X·P
begin-word, which **no wave seat may grant**), and steps 4, 6, 7 and 8's sequence limb
**DORMANT-UNLESS-NC-0-REVIVED**. **W0 did not revive `BUILD-V12.py`'s design; it established the
ground on which a successor design may be built.**

**L-18 rider.** Landing eight gates green makes this wave **IMPLEMENTED, not ACCEPTED.** Acceptance
needs two challenging gestalt passes, each a quartet of Opus 5 skeptics across the three altitudes,
then a fresh Fable apotheosis. The bases `W0.md` §12 names all have purchase and all were tested here
and found not to obtain — quoted digests instead of computed ones (**every digest in §2 was computed
by this seat**), an EPERM rendered as ABSENCE (**21 of 21 absence sentences qualified**), a clone that
mutated the shared repository under a too-coarse before/after (**the quadruple, the inode
intersection, the object count and the seven index mtimes all agree**), a census without identities
(**18 rows carry them**), and a harvest with fewer seats than were dispatched (**the one real
instance of this is R-3, disclosed and measured closable, not hidden**).

---

## 9. Dated addendum — 2026-09-17, at the close seat's last measurement

**Appended after §§1–8 were committed at `51699f0c`; nothing above is rewritten (E-3).**

**The lane authority's bytes moved inside the close window, by another track's in-flight hand.**
A final porcelain sweep, taken after the close commits and the push, found
`docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` **modified and
uncommitted** in the shared working tree:

```
⟨cmd⟩ shasum -a 256 <handoff>            → 10a12719772f2aa954469450b2c3f1ab468519949fe4f5c8dcbfecabb83e7171   (working tree, now)
⟨cmd⟩ wc -c <handoff>                     → 11163                                                              (was 10205)
⟨cmd⟩ git show HEAD:<handoff> | shasum -a 256 → ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7
⟨cmd⟩ git status --porcelain -- <handoff> →  M   (uncommitted; last commit touching it is 338c513b)
⟨cmd⟩ git diff --stat -- <handoff>        → 1 file changed, 14 insertions(+), 2 deletions(-)
```

**What it is**: the **X-W0.i / CC-011 / C-13 carve** — the routing law's third node rewritten from
`V.L1 / V.L5` to `V·L1..V·L4 → X-W9 → X-W11`, with a dated carve paragraph naming the tombstone
`docs/tranches/X/W0/ROUTING-LAW-V-L5.md` (⟨cmd⟩ `test -f` → **TOMBSTONE-ABSENT**; the seat is
mid-flight). **It is a lawful act of Track A, not of this wave**: no X.P.W0 seat touched this file,
and it is uncommitted, so no X.P.W0 commit carries it.

**What it does and does not do to this wave's gates.**

- **G-1 stays GREEN, and its row-1 coordinate is durable.** `ced23440…f20f7` is the digest of the
  **committed blob at the close commit `61217711`** — a coordinate any later reader can re-derive
  with `git show <commit>:<path> | shasum -a 256`, not a working-tree reading that a concurrent seat
  can move. The gate asks for _"a disposition this session computed"_; this session computed it,
  twice, against the 08-03 baseline, and it matched to the character.
- **Handoff §9 STOP does not fire.** _"Missing bytes"_ — none; _"a stale owner receipt"_ — the
  governing word is dated 2026-09-17. This is a **dated additive carve by the wave that owns the
  routing-law rewrite**, not a silent mutation of a pause coordinate: §3.1/§3.2/§3.3 are untouched by
  the diff, which lands entirely in §2's chain block and a new dated paragraph beside it.
- **G-8 stays GREEN as specified**, and this is the case `W0.md` §6 G-8 wrote in advance: _"`V·L5`
  is CC-011/C-13's RETIRE row … X-W0.i rewrites the routing law … This lane therefore states the
  chain **and** flags that its own downstream node is mid-rename; it does not silently adopt either
  spelling."_ `EVIDENCE-CHAIN.md` §5 quotes the chain **verbatim as the spec specifies it** and §7
  carries the standing flag with its rule 1 (_"Until X-W0.i lands the rewrite, the third node is
  cited as …"_). **The spec's own instrument absorbed this event by design.**

**The trigger has fired.** `.d`'s residual 6 and `EVIDENCE-CHAIN.md` §7 both say that when X-W0.i
lands the replacement cut, §7 is amended by a **dated addendum beside** and the verbatim handoff
quotation in §5 is **never rewritten**. That condition is now **in flight** rather than hypothetical.

**R-18 (new, dated 2026-09-17)** — \*owner: **X.P.W1 seat 0\***. At X.P.W1's open, re-measure the
handoff: if the carve has committed, amend `EVIDENCE-CHAIN.md` §7 by a dated addendum beside, leave
§5's verbatim quotation untouched, and record **both** the pre-carve digest `ced23440…f20f7` (at
`61217711`) and the post-carve digest as dated coordinates. **Do not** re-run G-1 against the new
bytes and call the difference a MISMATCH — it is an authored amendment by a named wave, not a moved
receipt, and treating it as the latter would fire a §9 STOP over a lawful act.

**Not absorbed, verified.** Two foreign paths sat in the shared index while this seat committed — a
Track A `docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md` (staged `A`) and this handoff (`M`). Neither
entered either close commit: ⟨cmd⟩ `git show --name-only` → `51699f0c` = `X-P-W0.md` +
`W0-CLOSE.md`; `61217711` = `LEDGER.md`. **The §3 law held at a fourth site.**

**Everything re-verified after the push**, so this addendum rests on post-push readings:
`parse-that/.git` **28M** · `NO-GC-LOG` · objects **4239** · HEAD `ef10d5b7…` · `worktree list`
**7**; a **fourth** census capture at `7f0c5b13…19d7`, still diff-empty; `git status --porcelain --
src api demo test e2e` → **0**; `scripts/dev/dev.sh` ` M` and **unstaged** throughout.
