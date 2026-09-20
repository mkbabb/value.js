SERVED MODEL: claude-opus-5[1m]

# X.P.W4.g — F-ab1: THE FIVE-NAME LITERAL DIES, MEASURED BEFORE AND AFTER (2026-09-19)

COHESION **§0ab** bullet 1: *"`.g` also cures **F-ab1**: the five-name literal at
`run-full-surface.mjs:60` dies — the candidate's re-export set is measured from `entry.mjs`'s
exports."* Landed at `<p2>` **`ba4d148`**, one file, `typescript/test/css-equivalence/run-full-surface.mjs`.

## The defect, stated at the bytes it lived at

⟨cmd⟩ `sed -n '61p' typescript/test/css-equivalence/run-full-surface.mjs` (BEFORE) →

```
    const candidateTypeNames = ["CssColor", "CssTimingFunction", "Stylesheet", "StyleRule", "Declaration"];
```

Five names, typed. `lib/ledger.mjs:242` `narrowingRows()` derives the `CN-3`-shaped NARROWING row by
**subtracting this list from the frozen type universe** — so the list is a denominator, not a label.
X.P.W4.`e` byte-copied the pinned 4.0.0 declaration into the package and made `ac1.d.ts` re-export
**all thirty-three** frozen types; the literal did not move. From that commit forward a measurement
program published a narrowing the producer had already closed, and `.f` had to retire `CN-3` in
`DIVERGENCE-LEDGER.md` §10 **by hand** because this line lied. A number a build can change must be
read off the build.

## The measured anchor, recorded rather than smoothed

§0ab names `entry.mjs`. At the true bytes ⟨cmd⟩ `grep -n 'export type' src/css/entry.mjs` → **no
match**: `entry.mjs` is the candidate's RUNTIME entry and a `.mjs` module holds no type export. The
type re-export set the addendum means is the one the package's own built entry ships beside that
runtime surface — `src/css/build/ac1.d.ts`'s single clause, emitted by `src/css/build.mjs:153`:

```
export type { CssColor, CssTimingFunction, Stylesheet, StyleRule, Declaration, CssColorSpace, … } from "./value-css-4.0.0.js";
```

That file is what a consumer of the candidate's `/css` subpath actually resolves. **The INTENT —
measure, never type — is served at the true bytes; the name in the addendum is not.** Recorded here
under the method's drifted-anchor clause, beside and dated; the addendum is not edited (E-3).

## The cure

`measureCandidateTypeNames()` reads `ac1.d.ts`, matches the one `export type { … } from "…"` clause,
and returns its names. **Absent or shapeless, it THROWS** — a measurement that silently falls back
to a guess is the defect the literal already was. The report gains
`candidateTypeReExports { source, measured, names }` and the printed reading gains a `re-exports`
line, so the denominator's provenance is legible from the artefact without opening the program.

## BEFORE → AFTER, double-run

⟨cmd⟩ `node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602 --limit 5` — a BOUNDED smoke run (this is not G-7, which is `.f2`'s to re-run at full corpus); both runs byte-identical, ⟨cmd⟩ `diff -q` silent, exit 0 each.

| reading | BEFORE (the literal) | AFTER (measured) |
|---|---|---|
| type re-export set | **5** names, typed | **33** names, read off `src/css/build/ac1.d.ts` |
| `rows` | 52 · COMPARED 24 · **NO-PEER 28** | 52 · **COMPARED 52 · NO-PEER 0** |
| `CN-3`'s derived subject list | **28** types "the candidate does not declare" | **0** |
| NARROWING ledger ROWS | 3 | 3 — *unchanged, and stated so* |
| mirror-defects (at limit 5) | 0 | **0** — the cure moves the DENOMINATOR, not a verdict |

The AFTER reading, pasted:

```
universe   19 runtime + 33 types = 52
re-exports 33 frozen types, MEASURED from src/css/build/ac1.d.ts
rows       52 · COMPARED 52 · NO-PEER 0
ledger     38 rows — ADJUDICATED 16 · DISSENT 4 · FIXTURE 5 · LABEL 1 · NARROWING 3 · CAPACITY 9
MIRROR-DEFECTS  0   (of which spec-undecided 0)
GREEN — zero mirror-defects across the full surface, and every declared difference is rowed.
```

**The BEFORE column is MEASURED, not inferred** — the pre-cure bytes were restored from `<p2>` `HEAD~1` into the same path, run at the same pin and limit, and the path was returned to `HEAD` immediately (⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` only, the pre-existing sibling row). Its reading, pasted:

```
universe   19 runtime + 33 types = 52
rows       52 · COMPARED 24 · NO-PEER 28
ledger     38 rows — ADJUDICATED 16 · DISSENT 4 · FIXTURE 5 · LABEL 1 · NARROWING 3 · CAPACITY 9
```

A first draft of the table above published *NARROWING 4 → 3*. That figure was **typed, not read** — the WRITE-THEN-MEASURE law's own failure mode, caught by running the BEFORE bytes. The row COUNT is **3 in both** states; what the cure moves is `CN-3`'s **derived subject list**, 28 → 0, measured directly ⟨cmd⟩ `narrowingRows({… realizedTypes: <5> vs <33>})` → `CN-1:0 CN-2:19 CN-3:28` and `CN-1:0 CN-2:19 CN-3:0`. The correction is recorded rather than quietly overwritten, because a number nobody re-read is exactly what F-ab1 is about.

## The second limb of F-ab1 — ESCALATED, not improvised

§0ab's F-ab1 sentence has a second limb: *"the emitter's carry gains `§10` so a regeneration never drops the retirements."* **Measured**: the carry is not in `run-full-surface.mjs`. It is at ⟨cmd⟩ `grep -n 'carryPath' <p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs` → **169**, inside a block bounded at `"\n### §6."` and the next level-2 heading (`:171–175`) — `§6` and nothing else. `§10`, which `.f` wrote by hand, would be dropped by a regeneration exactly as `.e`'s `§6` block once was (F-e7).

`emit-divergence-ledger.mjs` is **NOT in this unit's writable set** — the set names one `<p2>` path, `test/css-equivalence/run-full-surface.mjs`. A write there would be a File-Bounds breach, and the standing law is explicit that a write outside the set is an ESCALATION and not a judgement call. **ESC-W4g-1 is returned unlanded**, with the cure fully specified so the granting seat spends no measurement on it:

> In `emit-divergence-ledger.mjs`, the single carried block becomes a carried LIST. Read the canonical ledger once; for each of `"\n### §6."` and `"\n## §10"`, slice from the marker to the next level-2 heading (`§10` being last, its slice is the tail) and emit each carried block under its own preamble, in document order. The idempotence check that caught the 47→286→525 growth is the acceptance test: two consecutive emissions must be byte-identical, and `§10`'s retirement rows must survive both.

**Consequence, stated so it is not mistaken for a gate failure**: no regeneration is ordered, the ledger stands (E-3), and **G-1 reads GREEN over the ledger's committed bytes with `§10` present**. ESC-W4g-1 is a DURABILITY defect against a future regeneration, not a live RED.
