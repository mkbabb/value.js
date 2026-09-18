SERVED MODEL: claude-opus-5[1m]

# SUBSTRATE-SETTLE-2026-09-17 — the §B-12 reconciliation record

**Wave** KF.W0 (Track B · X·KF) · **Unit** KF.W0.c · **Gates** G-0.3, G-0.4 (and the two G-0.1
clauses OP-1 routed here) · **Date** 2026-09-17 · **Substrate** `/Users/mkbabb/Programming/keyframes.js`.

**Spec** (GOVERNING, immutable per E-3): `docs/tranches/X/keyframes/waves/KF-W0.md` — §Scope 1/3/4
(`:305`, `:307`, `:308`) · §Gates G-0.1 (`:496-508`), G-0.3 (`:526-538`), G-0.4 (`:540-572`) ·
§Carry C-2 · C-4 · C-5 · C-6 · C-7 · C-15 · §LAW-A Census 1 (`:75-132`) · §L-18 rider (`:757`).
**Ruling consumed**: `docs/tranches/X/COHESION.md` §0j.C **KF-OP1** (the three-step order) and
**KF-WRITE**.

**This file is APPEND-NEVER-REWRITE** (spec §Bounds `:332`). Corrections land as dated addenda
beside, never as edits to what is already written.

---

## §0 · The coordinate, stated once and carried everywhere

Every reading in this record was taken at:

```
⟨date "+%Y-%m-%d"⟩      → 2026-09-17
⟨git rev-parse HEAD⟩    → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨git rev-parse origin/master⟩ → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨git rev-parse --abbrev-ref HEAD⟩ → master
```

**Anchors in this record name the SHA, never the ref.** The reason is measured and booked at §11.2:
the remote `refs/heads/master` has already advanced past the pin, so a later `git fetch` in this
checkout moves the _ref_ `origin/master` off `81a56990` while every anchor in this sub-tranche means
the _commit_. C-2's binding law — _"any spec consuming this registry states WHICH ref it cures
against"_ — is discharged here by stating the sha.

Every published figure below was **double-run**; both runs agreed on every count. Where the open
tree is measured, the reading is **re-derived from the snapshot commit** and the substitution is
declared at that reading, never assumed silently (§1.2).

---

## §1 · The act, and the disposition of the 1-ahead commit

### §1.1 The three steps, as ruled and in no other order (§0j.C KF-OP1)

Performed by **KF.W0.OP-1**, the owner's delegated hand, alone and first, under the 2026-09-17
begin-word's _"pull whatever items you need"_. This unit did not perform it and had no authority to:
**a wave that performs the reset itself fails G-0.1, green counts notwithstanding** ⟨lane-docs.md:380⟩.

| #   | act                                                                                           | receipt                                                                                                   |
| --- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | `git branch kf-sacred-snapshot-2026-09-17` at HEAD `8281638c`                                 | ref created; the 1-ahead commit preserved                                                                 |
| 2   | `git checkout kf-sacred-snapshot-2026-09-17 && git add -u && git commit -m "snapshot(kf): …"` | **`6d280ee7bec7793846b2e2e1d250e1ea0a21859a`** — 226 files changed, 4483 insertions(+), 6156 deletions(−) |
| 3   | `git checkout master && git fetch origin && git reset --hard origin/master`                   | HEAD is now `81a56990`                                                                                    |

Forbidden forms stayed forbidden: no partial `git checkout origin/master -- src/`, no stash, no
`master←disk`. Verified by this seat at §9.

### §1.2 The 1-ahead commit — **DISPOSITION: COMMITTED, to `6d280ee7`**

```
⟨git rev-parse kf-sacred-snapshot-2026-09-17⟩   → 6d280ee7bec7793846b2e2e1d250e1ea0a21859a
⟨git rev-parse kf-sacred-snapshot-2026-09-17^⟩  → 8281638c0ac4ac8c54a67a018ca5bf6a9117174f
⟨git merge-base --is-ancestor 8281638c kf-sacred-snapshot-2026-09-17; echo $?⟩ → 0   (ancestor)
⟨git log -1 --format='%H%n%s' kf-sacred-snapshot-2026-09-17⟩
  6d280ee7bec7793846b2e2e1d250e1ea0a21859a
  snapshot(kf): the sacred checkout's 252 tracked modifications as found 2026-09-17 (OWNER'S HAND record; KF.W0 §B-12)
```

The hybrid C-2 names — _41 behind AND 1 ahead, neither ref an ancestor of the other_ (merge-base
`a59d3a22`) — is resolved without loss: `8281638c` is now reachable as `6d280ee7`'s parent, and the
dirty tracked worktree that sat on top of it is `6d280ee7` itself. **Nothing of the 1-ahead commit
was discarded.**

```
⟨git merge-base --is-ancestor kf-sacred-snapshot-2026-09-17 origin/master; echo $?⟩ → 1   (NOT an ancestor)
```

Stated rather than glossed: the snapshot is **not** on the frontier's history and is not proposed
for it. It is an evidence ref. Its durability is a residual (§11.3).

**This makes the open tree re-derivable, which is what lets this record be written after the act.**
Both open enumerations below re-derive from `6d280ee7` and reproduce OP-1's and the fold seat's
figures exactly — the re-derivation is the check, not a convenience.

---

## §2 · The two denominators, each with its command

N-1's finding is the shape of this whole record: **the reconciliation surface has two denominators,
and they are not the same set.**

```
DENOMINATOR A — disk ↔ HEAD (the "status" surface)
⟨git status --short | wc -l⟩                        → 252     (at open)
  re-derived at the settled tree:
  ⟨git diff --name-status 8281638c kf-sacred-snapshot-2026-09-17 | wc -l⟩ → 226   tracked rows
  ⟨… | cut -f1 | sort | uniq -c⟩                     → 219 M · 7 D
  + the 26 untracked rows banked verbatim at artefacts/W0/substrate-open.txt → 226 + 26 = 252 ✔

DENOMINATOR B — disk ↔ frontier (the surface the ACT moves)
⟨git diff --name-only origin/master | wc -l⟩        → 325     (at open)
  re-derived: ⟨git diff --name-only origin/master kf-sacred-snapshot-2026-09-17 | sort -u | wc -l⟩ → 325 ✔

THE UNTRACKED SUB-SURFACE
⟨git ls-files --others --exclude-standard | wc -l⟩  → 124     (at open, OP-1's reading)
```

**Counting rule** — denominator A counts `git status --short` ROWS with untracked directories
collapsed (as git prints them); the untracked sub-surface counts FILES with those directories
expanded. The two numbers 26 and 124 describe the same untracked material at two altitudes, and
this record disposes it at the **file** altitude (§4.2), because that is where bytes live.

**`325 − 252 = 73` is STRUCK and is used nowhere in this record.** It is arithmetic over two sets
that do not nest; the spec strikes it at D-2 (repair round 4) and the L-18 rider names its use as an
obvious base for the challenging pass. The residue is **measured**, at §3.

---

## §3 · BOTH enumerations — the three `comm` probes, pasted

Re-run by this seat at the settled tree against the re-derived open sets (`status-252` = the 226
tracked paths ∪ the 26 banked untracked rows; `frontier-325` = the re-derived frontier diff):

```
$ comm -13 <status-252> <frontier-325> | wc -l   → 225   ← frontier-diff files NOT in the status set
$ comm -23 <status-252> <frontier-325> | wc -l   → 152   ← status rows NOT in the frontier diff
$ comm -12 <status-252> <frontier-325> | wc -l   → 100   ← the overlap
```

**The partition, re-summed at its own enumeration** (counting rule: one member per path; the two
untracked directory rows count as the rows git printed):

```
252 = 152 + 100    ✔      325 = 225 + 100    ✔
the two surfaces are NOT nested: 225 frontier-diff files have no status row,
and 152 status rows lie outside the frontier diff entirely.
```

Both figures reproduce OP-1's open reading and the fold seat's 2026-08-28 reading exactly. **GREEN
here requires BOTH enumerations, never one plus a difference** — a record disposing "the 252 plus 73
more" leaves **125** frontier-diff files unreconciled. Enumeration A is disposed at §4; Enumeration
B at §5; the overlap at §6. Every one of the 252 ∪ 325 = 477 distinct members resolves to a named
disposition across those three sections.

---

## §4 · ENUMERATION A — the 252 status rows, dispositioned

### §4.1 The 226 tracked rows → **COMMITTED** (receipt: `6d280ee7`)

```
⟨git diff --name-status 8281638c kf-sacred-snapshot-2026-09-17 | cut -f1 | sort | uniq -c⟩
     7 D
   219 M
```

All 226 are preserved by commit. **Disposition: COMMITTED to `6d280ee7`; re-derivable by path with
the command above.** The seven `D` rows — the deletions the disk carried — are named here because a
deletion is the row most easily lost in a count of modifications:

```
bench/group-soa-validate.mjs · demo/state/controlSurfaceDFA.ts · scripts/gates/surface/deps-current.mjs
src/animation/compile/parse-flatten.ts · src/animation/compile/plain-vars.ts
test/characterization/scene-entries.test.ts · test/compile/plain-vars.test.ts
```

Two of the 226 are the EE-02 pair and two more are `package.json` / `package-lock.json`; their
_content_ disposition is G-0.3's and G-0.2's respectively, not a mere row count. §9 carries the pair.

**Of the 226, 80 also appear in the frontier diff** (the overlap, §6) and **146 do not** (§4.3).

### §4.2 The 26 untracked rows → 124 files → **6 KEPT · 118 DISCARDED**

**This is the clause OP-1 routed here for re-cutting, and it is re-cut.** §0j.C reasoned that
because `add -u` does not stage untracked files they are _"therefore left in place by the reset"_.
Step (2) held exactly as ruled. **The inference about step (3) does not**: `git reset --hard <t>`
skips `verify_absent`, so an untracked working-tree file whose path **exists in `<t>`** is
overwritten with `<t>`'s bytes. Only untracked paths **absent** from `<t>` survive.

The per-row probe, run by this seat at the settled tree — `PRESENT at origin/master` is exactly the
predicate that decides the row:

```
⟨git ls-tree -r --name-only origin/master | sort -u⟩ vs each of the 26 rows
```

| #   | untracked row (as `git status --short` printed it)    | at `origin/master`                | files      | disposition                                   |
| --- | ----------------------------------------------------- | --------------------------------- | ---------- | --------------------------------------------- |
| 1   | `demo/utils/formatEditorCSS.ts`                       | PRESENT                           | 1          | **DISCARDED** — superseded by `origin/master` |
| 2   | `demo/utils/keyframeSelector.ts`                      | PRESENT                           | 1          | **DISCARDED**                                 |
| 3   | `docs/MIGRATION-6.0.0.md`                             | PRESENT                           | 1          | **DISCARDED**                                 |
| 4   | `docs/tranches/U/AGENTIC-HANDOFF-2026-07-16.md`       | PRESENT                           | 1          | **DISCARDED**                                 |
| 5   | `docs/tranches/V/` _(directory row)_                  | 175 files at the frontier         | 99 on disk | **97 DISCARDED · 2 KEPT** (rows 5a/5b below)  |
| 6   | `src/animation/compile/compiled-frame.ts`             | **ABSENT**                        | 1          | **KEPT**                                      |
| 7   | `src/animation/compile/emit/css-text.ts`              | PRESENT                           | 1          | **DISCARDED**                                 |
| 8   | `src/animation/compile/interp-slot.ts`                | **ABSENT**                        | 1          | **KEPT**                                      |
| 9   | `src/animation/compile/value-ast.ts`                  | **ABSENT**                        | 1          | **KEPT**                                      |
| 10  | `src/animation/engine/compiler-state.ts`              | PRESENT                           | 1          | **DISCARDED**                                 |
| 11  | `src/animation/group/composite-storage.ts`            | **ABSENT**                        | 1          | **KEPT**                                      |
| 12  | `src/animation/internal/helpers.ts`                   | PRESENT                           | 1          | **DISCARDED**                                 |
| 13  | `src/animation/resolve/browser.ts`                    | PRESENT                           | 1          | **DISCARDED**                                 |
| 14  | `test/compile/authored-values.test.ts`                | PRESENT                           | 1          | **DISCARDED**                                 |
| 15  | `test/compile/frame-compiler-value4.test.ts`          | PRESENT                           | 1          | **DISCARDED**                                 |
| 16  | `test/compile/interp-slot.test.ts`                    | PRESENT                           | 1          | **DISCARDED**                                 |
| 17  | `test/compile/selector-value4.test.ts`                | PRESENT                           | 1          | **DISCARDED**                                 |
| 18  | `test/compile/structural-emit.test.ts`                | PRESENT                           | 1          | **DISCARDED**                                 |
| 19  | `test/compile/value4-color-emit.test.ts`              | PRESENT                           | 1          | **DISCARDED**                                 |
| 20  | `test/compile/value4-easing-contract.test.ts`         | PRESENT                           | 1          | **DISCARDED**                                 |
| 21  | `test/demo/instrument/value4-editor-boundary.test.ts` | PRESENT                           | 1          | **DISCARDED**                                 |
| 22  | `test/demo/reference-data/` _(directory row)_         | 1 file (`easing-catalog.test.ts`) | 1 on disk  | **DISCARDED**                                 |
| 23  | `test/demo/scene-entries.test.ts`                     | PRESENT                           | 1          | **DISCARDED**                                 |
| 24  | `test/group/structural-composition.test.ts`           | PRESENT                           | 1          | **DISCARDED**                                 |
| 25  | `test/resolve/value4-immutable-resolve.test.ts`       | PRESENT                           | 1          | **DISCARDED**                                 |
| 26  | `test/waapi/value4-layout-eligibility.test.ts`        | PRESENT                           | 1          | **DISCARDED**                                 |

**Rows 5a / 5b — the two V survivors, named because they are cross-repo mail:**

```
5a  docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md      KEPT
5b  docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md KEPT
    ⟨both ABSENT at origin/master⟩ — value.js's OWN outbound, delivered into this tree and never
    committed here. E13 consequence: the cross-repo mail value.js delivered is UNHARMED.
```

**File-altitude arithmetic, re-summed at its enumeration** (counting rule: one member per file, the
two directory rows expanded at the open reading):

```
124 = 24 named files + 99 under docs/tranches/V/ + 1 under test/demo/reference-data/   ✔
KEPT      =  4 (rows 6, 8, 9, 11) + 2 (rows 5a, 5b)                            =   6   ✔
DISCARDED = 20 (the named PRESENT rows) + 97 (V) + 1 (reference-data)          = 118   ✔
6 + 118 = 124                                                                          ✔
⟨git ls-files --others --exclude-standard | wc -l⟩ at close → 6, and the six are exactly rows
 5a · 5b · 6 · 8 · 9 · 11 above.                                                       ✔
```

**The word is DISCARDED, not "kept (untracked)"** — that is the re-cut. The ruling anticipated the
class; the measurement says which class each row is in.

**What is unrecoverable, stated rather than minimised**: if any of the 118 held local bytes
_differing_ from `origin/master`, those bytes are gone — `add -u` never staged them (correctly, as
ruled), so no git object holds them. **The COUNT of absorbed V docs is known (99 − 2 = 97); their
MEMBERSHIP is not**: git unlinked and recreated all 175 frontier V paths, so no filesystem signal
survives to name which 97 pre-existed ⟨OP-1's `find … stat -f %SB` → 175 with birthtime 2026-09-17,
the two survivors alone keeping their July birthtimes⟩. This record therefore states the count where
it can and declines to name the members where it cannot. **The probe that would have converted this
from a finding into an owner question before the act** is booked at §11.1.

### §4.3 The 146 tracked status rows outside the frontier diff → **ALREADY AT THE FRONTIER**

```
⟨comm -23 <status-252> <frontier-325>⟩ → 152 rows, of which:
  ⟨comm -12 <the 26 untracked rows> <those 152>⟩ →   6   (rows 5, 6, 8, 9, 11, 22 — disposed at §4.2)
  ⟨comm -12 <the 226 tracked paths> <those 152>⟩ → 146
146 + 6 = 152                                                                          ✔
```

**Disposition: NO BYTE MOVED.** These 146 paths differ from HEAD `8281638c` and are **identical to
`origin/master`** — the disk had already reached the frontier's content for them. The reset was a
no-op on every one; their delta against HEAD is preserved in `6d280ee7`. This is N-2's finding
generalised from one module to 146 paths: **the sacred checkout was largely the frontier's content
carried at HEAD's layout — content-forward, path-stale** — which further weakens the axes'
"nobody noticed for three majors" causal story and strengthens C-1's FAM-01 RAIL rider.

Distribution ⟨`awk -F/ '{print $1"/"$2}' | sort | uniq -c | sort -rn`, top rows⟩: `src/animation` 41
· `demo/components` 19 · `demo/scenes` 16 · `test/compile` 8 · `test/engine` 7 · `test/group` 6 ·
`test/demo` 5 · `demo/state` 4 · `.github/workflows` 3 · `demo/utils` 3 · `test/svg` 3 ·
`test/resolve` 3 · `test/physics` 3 (+ the tail).

---

## §5 · ENUMERATION B — the 225 frontier-diff files outside the status set, dispositioned

These are the files G-0.1's falsifier names: **present in the frontier diff, absent from every
status row.** A record that stopped at §4 would leave all 225 undispositioned.

**Classification predicate, stated so it reproduces** — for each path, presence in
`git ls-tree -r --name-only origin/master` (the frontier tree) and in
`git ls-tree -r --name-only kf-sacred-snapshot-2026-09-17` (the tracked disk as found):

| class       | predicate                        | count   | what the reset did                 |
| ----------- | -------------------------------- | ------- | ---------------------------------- |
| **CREATED** | at frontier, **not** in snapshot | **196** | written into the tree by the reset |
| **UPDATED** | at both                          | **24**  | bytes replaced **disk←master**     |
| **REMOVED** | in snapshot, **not** at frontier | **5**   | unlinked by the reset              |

```
196 + 24 + 5 = 225        ← sums to its own denominator ✔
```

### §5.1 REMOVED (5) — named, because a removal is the row a count hides

```
src/animation/internal/binarySearch.ts
src/animation/internal/transport/core.ts
src/animation/presets/classic.ts
src/animation/presets/spring.ts
src/animation/presets/taxonomy.ts
```

**Disposition: DISCARDED, superseded by `origin/master`'s layout**; every one is preserved in
`6d280ee7` and re-derivable by `git show kf-sacred-snapshot-2026-09-17:<path>`.

### §5.2 UPDATED (24) — reconciled **disk←master**, in full

```
.dependency-cruiser.cjs                       src/animation/engine/css/index.ts
bench/cold-import.bench.ts                    src/animation/internal/animation-id.ts
bench/spring-tick.bench.ts                    src/animation/internal/errors.ts
demo/app/App.vue                              src/animation/internal/leaves.ts
demo/components/CopyButton.vue                src/animation/orchestration/index.ts
demo/components/instrument/keyframes/KeyframeCard.vue
demo/components/instrument/keyframes/components/KeyframeCardList.vue
docs/dogfood-inversion.md                     src/animation/orchestration/sequence/lifecycle.ts
scripts/gates/surface/published-surface.mjs   src/animation/orchestration/sequence/transport.ts
scripts/gen-agent-surface.mjs                 src/animation/orchestration/view-transition/index.ts
test/internal/binary-search.test.ts           src/animation/physics/spring/solver/sample.ts
                                              src/animation/physics/spring/solver/solver.ts
                                              src/animation/presets/index.ts
                                              src/animation/waapi/delegation.ts
                                              src/animation/waapi/index.ts
```

**Two of these are G-0.4's own oracles** — `demo/components/CopyButton.vue` (EE-01) and
`demo/components/instrument/keyframes/components/KeyframeCardList.vue` (FE-3). They carried **no
status row**, which is precisely why the oracle had to be re-run on the settled tree rather than
inferred from the status surface: the disk was byte-identical to HEAD there, and HEAD carried the
dead name. §10 reads both after the act.

### §5.3 CREATED (196) — the frontier's additions

**175** under `docs/tranches/V/` — enumerated by command rather than transcribed, which is the
lawful form for a set this size: ⟨`git ls-tree -r --name-only origin/master docs/tranches/V/`⟩ →
**175**. **97 of these 175 were physically present on disk as untracked files and were OVERWRITTEN,
not created** (§4.2); the identity of the 97 is unrecoverable and is not asserted.

**21** outside `docs/`, listed whole:

```
demo/utils/helpers.ts                         src/animation/compile/value/ast.ts
scripts/gates/structure/index.mjs             src/animation/compile/value/compile.ts
scripts/gates/surface/agent-surface.mjs       src/animation/compile/value/index.ts
scripts/release/consumer-manifest.mjs         src/animation/compile/value/sink.ts
src/animation/compile/emit/backward/index.ts  src/animation/engine/play-lifecycle/events.ts
src/animation/compile/emit/format/index.ts    src/animation/engine/play-lifecycle/frame.ts
src/animation/compile/frame/compiled-frame.ts src/animation/engine/play-lifecycle/index.ts
src/animation/compile/frame/index.ts          src/animation/engine/play-lifecycle/strategies.ts
src/animation/compile/frame/interp-slot.ts    src/animation/engine/play-lifecycle/transport.ts
src/animation/group/composite/index.ts        src/animation/group/composite/storage.ts
test/demo/reference-data/easing-catalog.test.ts
```

**Read this list beside §4.2's KEPT rows and the shape of the whole schism appears**: the four
untracked src files that survived are the **flat-layout drafts of material the frontier ships in
module dirs**. Measured, so the correspondence is a reading and not a resemblance
(⟨`wc -l`⟩ and ⟨`diff … | grep -c '^[<>]'`⟩, this seat, settled tree):

```
compile/compiled-frame.ts      32 L  vs  compile/frame/compiled-frame.ts    32 L   →   4 differing lines
compile/interp-slot.ts        350 L  vs  compile/frame/interp-slot.ts      338 L   →  24 differing lines
group/composite-storage.ts     25 L  vs  group/composite/storage.ts         25 L   →   6 differing lines
compile/value-ast.ts          400 L  vs  compile/value/ast.ts               55 L   → 355 differing lines
```

Three are near-identical drafts of a single frontier file each. **The fourth is not, and is stated
as it measures**: `value-ast.ts` (400 L) has no one counterpart — the frontier split that material
across the `compile/value/` module (`ast.ts` · `compile.ts` · `index.ts` · `sink.ts`), so the
correspondence there is to the **module**, not to `ast.ts`, and this record claims nothing finer.

All four survived only because their flat paths are absent from the frontier tree. **They are
orphans by construction — no frontier specifier can reach them** — the same hazard class N-2 names
for the `emit/backward` triad, differing only in that the reset could not remove them. Booked as a
residual at §11.4; no wave touches `src/**` here, and this record states the finding rather than
curing it.

`test/demo/reference-data/easing-catalog.test.ts` is the one absorbed file of row 22.

### §5.4 The index/disk crossing, stated because it is where a naive reading goes wrong

`git diff --name-only origin/master` walks the **index**, so an untracked-on-disk file whose path
exists at the frontier appears in enumeration B as a _deletion relative to the index_ and lands in
the CREATED class above — while on **disk** it was present and got overwritten. The two altitudes
are reconciled by one crossing:

```
absorbed, from enumeration B's CREATED class   →  97 (V) + 1 (reference-data)  =  98
absorbed, from the overlap's CREATED class     →  20 (the named untracked rows) =  20
                                                                            98 + 20 = 118   ✔
independently, from the untracked counts       → 124 (open) − 6 (close)        = 118   ✔
```

**Two entirely independent derivations of the absorption figure agree at 118.** That agreement is
the check; neither number is carried from the other.

---

## §6 · The overlap (100) — stated so the partition is a partition

Members of BOTH surfaces: a status row **and** a frontier-diff entry. Same predicate as §5:

| class                       | count  | disposition                                                                       |
| --------------------------- | ------ | --------------------------------------------------------------------------------- |
| **UPDATED** (at both refs)  | **62** | bytes replaced **disk←master**; the disk delta preserved in `6d280ee7`            |
| **CREATED** (frontier only) | **20** | the 20 untracked rows of §4.2 that exist at the frontier — **DISCARDED/absorbed** |
| **REMOVED** (snapshot only) | **18** | unlinked by the reset; preserved in `6d280ee7`                                    |

```
62 + 20 + 18 = 100        ✔     and 226 tracked rows = 80 in the overlap + 146 outside it   ✔
                                     (80 = 62 UPDATED + 18 REMOVED)                          ✔
```

The 18 REMOVED, named — **this is where the flat `emit` triad lives**:

```
src/animation/compile/easing/easing-option.ts     src/animation/engine/play-lifecycle.ts
src/animation/compile/easing/easing-registry.ts   src/animation/group/composite-state.ts
src/animation/compile/emit/backward-color.ts  ←   src/animation/group/compositor.ts
src/animation/compile/emit/backward-walk.ts   ←   src/animation/orchestration/drag/drag-2d.ts
src/animation/compile/emit/backward.ts        ←   src/animation/resolve/resolve-function.ts
src/animation/compile/emit/format-options.ts      src/animation/resolve/resolve-if.ts
src/animation/compile/emit/format.ts              src/animation/waapi/waapi-options.ts
src/animation/compile/frame-compiler.ts           test/support/mirror.test.ts
src/animation/compile/numeric-plan.ts
```

---

## §7 · The flat `emit/{backward,backward-walk,backward-color}.ts` triad — **REMOVAL STATED BY PATH**

G-0.1's GREEN requires this by path, and LAW-A Census 1 is why.

```
⟨ls src/animation/compile/emit/backward.ts⟩        → ABSENT
⟨ls src/animation/compile/emit/backward-walk.ts⟩   → ABSENT
⟨ls src/animation/compile/emit/backward-color.ts⟩  → ABSENT

⟨ls src/animation/compile/emit/⟩ →
      backward        ← a MODULE dir (backward.ts · color.ts · index.ts · walk.ts)
      format          ← a MODULE dir
      css-text.ts  densify.ts  easing-serialize.ts  entry.ts  index.ts
      refusal-probes.ts  view-transition.ts            ← the 7 flat siblings
```

**Census 1 re-run at the SETTLED WORKTREE** (2026-09-17 · HEAD `81a56990`), because a census run at
a ref would not be a statement about this tree:

```
⟨git grep -nE 'backward-(walk|color)' -- src/ demo/ test/ scripts/⟩ → 5 hits, ALL stale doc-COMMENTS:
    emit/backward/backward.ts:158 · emit/densify.ts:17 · emit/densify.ts:70 · emit/index.ts:7 · emit/index.ts:8
  → ZERO import specifiers traverse the flat spelling.               (non-import context, never counted)

⟨git grep -nF 'emit/backward' -- src/ demo/ test/ scripts/⟩ →
    backward/index.ts:2 · backward/walk.ts:2   (in-source docblocks INSIDE P, non-import context)
    test/compile/value4-color-emit.test.ts:9   ← the ONE import hit outside P

⟨git grep -nE '"\.{1,2}/backward' -- src/ demo/ test/ scripts/⟩ → 14 specifier sites:
    emit/index.ts :32 :36 :41 :42 :43 :53 :57   (the zone barrel)
    emit/view-transition.ts :46 :47 :50 :54
    emit/refusal-probes.ts :2
    backward/index.ts :23 :28                   (intra-module)
```

**CONSUMER SET reproduces exactly as the census banks it**: 3 frontier source files
(`emit/index.ts` · `emit/view-transition.ts` · `emit/refusal-probes.ts`) + 1 test
(`test/compile/value4-color-emit.test.ts:9`).

**Why only the full reset discharged this.** Because no specifier traverses `backward-walk` /
`backward-color`, a partial `git checkout origin/master -- src/` would have left those two files
with **zero importers** — dead duplicates no build error surfaces and no `tsc` run reds. **And a
sharper limb this seat measured and records** (declared as an inference about module resolution, not
as a measurement of it): the 12 non-intra-module specifiers above are written `"./backward"`, which
at the settled tree resolves to the **directory module** `emit/backward/index.ts`. A surviving flat
`emit/backward.ts` sits at the file spelling that standard file-over-directory resolution prefers,
so the orphan would not merely be dead — **it would shadow the module at every one of those sites**,
silently. That is the hazard in its strongest form, and it is discharged: the path is ABSENT.

---

## §8 · C-15 — the reconciliation **DIFFED, never assumed**

C-15's obligation is not "check the tree is clean"; it is _"a reason to diff the reconciliation
output rather than assume it"_ — the phantom attribute must not carry forward **under a different
spelling**. Measured at four coordinates, `demo/`-scoped, counting matching lines:

| coordinate                                | `position="right"` | `mode="persistent"` |
| ----------------------------------------- | ------------------ | ------------------- |
| HEAD `8281638c`                           | **1**              | 0                   |
| snapshot `6d280ee7` (= the disk as found) | 0                  | **1**               |
| `origin/master` `81a56990`                | 0                  | 0                   |
| **THE SETTLED WORKTREE**                  | **0**              | **0**               |

The hunk itself, read at three coordinates rather than inferred:

```
⟨git show 8281638c:demo/components/instrument/shell/EditorShell.vue | sed -n 16p⟩
        <HeaderRibbon ref="headerRibbonRef" position="right">
⟨git show kf-sacred-snapshot-2026-09-17:… | sed -n 16p⟩
        <HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
⟨sed -n 16p demo/components/instrument/shell/EditorShell.vue⟩            (the settled worktree)
        <HeaderRibbon placement="right">
```

**C-15 is not merely satisfied — it is sharpened, and the sharpening is booked as a dated observation
beside the banked cell (E-3; nothing at the bank is rewritten).** The spec's cell reads _"`mode="persistent"`
is a stray attr, worktree-only … But HEAD carries `position="right"` — also not a 7.0.0 prop. The
phantom-attr class exists at HEAD in a different spelling."_ Measured here, **the two spellings are
disjoint by coordinate**: `position="right"` at HEAD **only**, `mode="persistent"` on the disk
**only**. The disk had already migrated `position=`→`placement=` while acquiring a _second_ phantom;
the class survived the disk's own half-migration, which is exactly the mechanism C-15 warns a naive
reconciliation would carry forward. **Neither spelling survives the settle**, and the frontier's
`ref="headerRibbonRef"` template-ref went with them (`useTemplateRef` import dropped at `:113`).

**The reconciliation was diffed, not assumed**, and the diff is pasted:

```
⟨git diff kf-sacred-snapshot-2026-09-17 origin/master -- demo/components/instrument/shell/EditorShell.vue⟩
  -        <HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
  +        <HeaderRibbon placement="right">
  -import { ref, useTemplateRef } from "vue";
  +import { ref } from "vue";
```

The live `/header-ribbon` import stands at `:116` — which is C-3's tripwire, `.b`'s gate (G-0.5),
not this unit's, and is named here only so its survival is on the record:

```
⟨git grep -n 'HeaderRibbon' -- demo/ src/ test/ scripts/⟩
  demo/components/instrument/shell/EditorShell.vue:16   <HeaderRibbon placement="right">
  demo/components/instrument/shell/EditorShell.vue:50   </HeaderRibbon>
  demo/components/instrument/shell/EditorShell.vue:116  import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
```

One consumer, exactly as LAW-A Census 2 derives it from the import graph.

---

## §9 · G-0.3 — EE-02 css-twin NOT regressed · **VERIFIED, NEVER AUTHORED**

The two EE-02 paths are **OWNER'S-HAND** bounds rows (spec `:347`, `:348`). This unit **verifies**
them; it wrote no byte in `keyframes.js`. They were reconciled **by the reset itself**.

Artefacts: `artefacts/W0/ee02-diff-open.txt` · `artefacts/W0/ee02-diff-close.txt`.

**OPEN (RED), re-derived from the snapshot — reproduces the spec's baseline byte-for-byte:**

```
⟨git diff origin/master kf-sacred-snapshot-2026-09-17 --stat -- <the four paths>⟩
 .../channel-controls/TimingFunctionPanel.vue       |  9 +---
 .../composables/useTimingFunctionEditor.ts         | 19 ++------
 package-lock.json                                  | 50 ----------------------
 package.json                                       |  4 +-
 4 files changed, 6 insertions(+), 76 deletions(-)
```

**CLOSE (GREEN) — the empty diff for the `.ts`/`.vue` pair:**

```
⟨git diff origin/master --stat -- <TimingFunctionPanel.vue> <useTimingFunctionEditor.ts>⟩ → (empty)
⟨git diff origin/master --stat -- <the same two> package.json package-lock.json⟩          → (empty)
⟨git diff --check⟩                                                                         → (clean)
```

**Emptiness is not the gate — the DIRECTION is.** The falsifier: _"reconcile master←disk and the
diff also goes empty while the landed cure is destroyed."_ Three readings settle the direction:

1. **Content at both write sites is the frontier's.** ⟨`grep -n` at the settled tree⟩ →
   `:96-98` `setAnimationTimingFunction(timingFunction: TimingFunction, css?: string)` — the twin
   **arg**; `:128` `timingFunctionLiteralFor`; `:170`
   `setAnimationTimingFunction(timingFunction, timingFunctionLiteralFor(key))` — the twin **passed**;
   and at `TimingFunctionPanel.vue` `:144` the bezier-drag write with `:148`'s
   `const timingFunction = { fn: …, css: cubicBezierToString(...pts) }` — the twin **attached**.
   The snapshot carries the one-argument `{ fn }` form at both sites. A master←disk reconciliation
   would have left `{ fn }` standing.
2. **The frontier ref did not move**: ⟨`git rev-parse origin/master`⟩ → `81a56990` (the pin);
   ⟨`git rev-list --count origin/master..HEAD`⟩ → **0**.
3. **The disk's prior bytes live in `6d280ee7`, not upstream** — two distinct objects; the frontier
   carries no snapshot content.

**SUBJECT-IDENTITY holds at both §Bounds rows**: the stated symbols are present at the stated lines
(`:96`/`:128` decls · `:144` the write · `:148` the attachment). **C-4's direction lock HONOURED.**
Both measured consequences the disk WIP would have regressed — WAAPI uniform-timing demotion and the
export-serializer identity-miss — remain cured at the frontier.

**G-0.3: RED → GREEN.**

---

## §10 · G-0.4 — the rebase oracle, run **AFTER** the migration landed

Sequencing lock honoured (spec `:681`): _"G-0.4's oracles run after the migration lands, never
before."_ OP-1's reset landed first; this unit opened after it. Artefact:
`artefacts/W0/oracle-ee01-fe3-ee03.txt`.

**Static tier — the gate's closing condition. Coordinate pasted beside each output as the spec
requires: `2026-09-17` · HEAD `81a56990736ced5b5edde0b84c527680ac7689b1`.**

| oracle          | probe                                                                                  | output                                        | verdict   |
| --------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- | --------- |
| **EE-01** (C-5) | `sed -n '42p' demo/components/CopyButton.vue`                                          | `timingFunction: "easeInBounce",`             | **GREEN** |
| **FE-3** (C-6)  | `sed -n '11p' demo/components/instrument/keyframes/components/KeyframeCardList.vue`    | `:frame-start="startScalar(frames[i].start)"` | **GREEN** |
| **EE-03** (C-7) | `sed -n '97p' demo/components/instrument/keyframes/composables/useKeyframesParsing.ts` | `() => animation.templateFrames.length,`      | **GREEN** |

N-3's guard observed: the bare `templateFrames.length` grep is **not** the witness (it returns two
unrelated guard sites at `KeyframesEditor.vue:204` and `useKeyframeOps.ts:179`); the oracle is the
cure line at its file:line, and that is what was read.

**The two negative probes — coordinate = THE SETTLED WORKTREE, deliberately not a ref** (`2026-09-17`
· HEAD `81a56990`):

```
⟨git grep -n 'bounceInEase' -- demo/        | wc -l⟩  → 0     GREEN
⟨git grep -n '\.start\.toString()' -- demo/ | wc -l⟩  → 0     GREEN
```

Running these at `origin/master` would measure the frontier and prove nothing about the rebase —
the gate's own falsifier, in the other direction. **These two files carried no status row** (§5.2),
so the status surface alone could never have told us whether the dead name survived; only the probe
on the settled tree can, and it did.

**Runtime tier — confirmation only; NAMED, NOT RUN**, under the spec's own division (_"the gate
closes on the static tier … the runtime tier is confirmation, named by literal path"_, `:552`) and
probe parsimony. Wiring verified read-only, and it reproduces the spec's D-7 correction exactly:

```
⟨git grep -ln 'console-budget' -- scripts/observe/⟩ → live-session.mjs · live-session-mobile.mjs  (exactly two)
⟨git grep -c 'pageerror' -- scripts/observe/demo/smoke.mjs⟩ → 0     (smoke.mjs installs NO pageerror handler)
⟨ls -l⟩ live-session.mjs 94142 B · smoke.mjs 8680 B · scripts/lib/console-budget.mjs 8323 B
```

EE-03's watch-warn-count confirmation has **one** instrument, not two. That neither was executed is
declared here rather than left to inference.

**FE-3's `/\[object Object\]/` smoke assertion is not asserted here** — it is a planned born-RED
gate of keyframes.js's own tranche V (W1 · Render Truth), an outbound cross-edge; §Bounds forbids
this wave writing `test/**`, and a substrate wave that invents a test to green its own gate is the
vacuous evidence L-19 kills.

**Explicitly NOT this gate's** (spec `:571`): FE-3's PARTIAL-cure residue — the fraction-for-percent
(`"0.5"` where the commit parser demands `"50%"`), the NAMED-selector fallthrough, `selectorText`
still uncalled at both seams — is **KFED-UNIT's, after KF.W4**.

**G-0.4: RED → GREEN on all five addressable probes.**

---

## §11 · Findings and residuals

### §11.1 The absorption is IRREVERSIBLE, and the probe that would have pre-empted it

Booked at §4.2 and re-cut there from _"kept (untracked)"_ to **DISCARDED**. The probe a substrate
seat anywhere in X runs **before** a `reset --hard`, recorded so the miss is not repeated:

```
comm -12 <(git ls-files --others --exclude-standard | sort) \
         <(git ls-tree -r --name-only <target> | sort) | wc -l
```

Any nonzero reading is the set of untracked files the reset will clobber. **It is an owner question
before the act, never a finding after it.** At this act it would have read **118**.

### §11.2 The remote has advanced past the pin — **`origin/master` the REF ≠ `81a56990` the COMMIT**

Measured at this seat, double-run:

```
⟨git ls-remote origin refs/heads/master⟩ → 55e9bf0d2391bbc6d9871bb3f0555a6225daae92
⟨git rev-parse origin/master⟩            → 81a56990736ced5b5edde0b84c527680ac7689b1   (local ref, unfetched)
⟨git cat-file -t 55e9bf0d…⟩              → fatal: could not get object info           (not fetched here)
```

Resolved read-only at the exec clone `/Users/mkbabb/Programming/keyframes-v-exec`, where the object
exists — this is **KF.W1's delivery**, and it is benign:

```
⟨git log -1 --format='parent=%P' 55e9bf0d⟩ → parent=81a56990736ced5b5edde0b84c527680ac7689b1
⟨git show --name-only --format= 55e9bf0d⟩  → docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md
⟨… | grep -vc '^docs/'⟩                    → 0      (docs-only; one file, +309 lines)
```

**The pin is an ancestor of the remote tip and the advance touches zero paths in this wave's gate
surface.** No gate reading above is disturbed. **The residual is a hazard, not a defect**: a later
`git fetch` in the sacred checkout moves the _ref_ `origin/master` to `55e9bf0d`, at which point
`git diff --name-only origin/master` stops measuring the pin. This record names SHAs for that
reason, and the hazard is handed to the orchestrator and to every later X·KF wave. **No fetch was
run by this unit** — moving that ref under the anchors is not this seat's act.

### §11.3 The snapshot ref is local-only

`kf-sacred-snapshot-2026-09-17` / `6d280ee7` is not pushed and is not an ancestor of the frontier.
**Every "COMMITTED" disposition in this record cites it**, so if the ref is ever deleted or the
machine is lost, 226 tracked rows and the 23 removed files of §5.1/§6 lose their receipt. Whether it
is pushed is the orchestrator's call, not this unit's; named so its durability is never assumed.

### §11.4 Four orphaned flat-layout src drafts survive on disk

`src/animation/compile/{compiled-frame,interp-slot,value-ast}.ts` and
`src/animation/group/composite-storage.ts` (§4.2 rows 6/8/9/11) are untracked, absent from the
frontier, and are flat-spelling drafts of material the frontier ships in module dirs — three of them
near-identical to one frontier file each, `value-ast.ts` corresponding to the `compile/value/`
module as a whole (§5.3, measured). **No frontier specifier can reach them** — the exact hazard class LAW-A Census 1 names for the `emit`
triad, which the reset could not remove because the paths are absent upstream. **This record states
it; it cures nothing**: `src/**` is out of bounds for this wave, and their removal belongs to a wave
whose §Bounds carries `src/**`.

### §11.5 The 146 content-forward paths (§4.3) corroborate N-2 at scale

N-2 measured one module as _"the frontier's content at HEAD's layout"_. The same predicate holds for
**146 tracked paths** that differ from HEAD and are byte-identical to the frontier. Booked as a
dated observation beside N-2's banked note (E-3, nothing rewritten); it strengthens C-1's FAM-01
RAIL rider and further weakens the axes' "nobody noticed for three majors" causal story.

### §11.6 E13 — mail at this unit's scope

The settle changed what is _visible_ under `keyframes.js/docs/tranches/V/coordination/`; re-swept
read-only at this seat. The newest packet there dated after seat 0's sweep is
`VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` — **value.js's own outbound**, delivered by
KF.W1 (§11.2), not inbound mail. The two untracked survivors (§4.2 rows 5a/5b) are likewise
value.js's outbound and are **unharmed**. **0 UNREAD in this unit's scope.** `INBOX.md` appends
remain `.b`'s alone, once, at close (§Disjointness).

---

## §12 · Gate readings, BEFORE → AFTER

| gate                                                               | BEFORE (seat-0 baseline, 2026-09-17)                                                                                                                  | AFTER (this unit, 2026-09-17 · HEAD `81a56990`)                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **G-0.3**                                                          | **RED-AS-EXPECTED** — the four-path diff reproduces at `6 insertions(+) / 76 deletions(−)`; the disk carries `{ fn }` at both EE-02 write sites       | **GREEN** — empty diff for the `.ts`/`.vue` pair (and for all four paths); the twin present at **both** write sites (`:96-98`/`:170` and `:144`/`:148`); direction proven **disk←master** by content, by the unmoved frontier ref, and by the snapshot holding the disk's prior bytes |
| **G-0.4**                                                          | **RED-AS-EXPECTED** — all three oracles red at the audited disk, green at the frontier                                                                | **GREEN** — 3 static probes + 2 negative probes, all on the **settled worktree** with date + `git rev-parse HEAD` pasted beside each; runtime tier named, wiring verified, deliberately not run (confirmation only, per `:552`)                                                       |
| **G-0.1** _(the two clauses OP-1 routed here; the gate is OP-1's)_ | OP-1 turned every clause it owned; **this written disposition record over BOTH enumerations** and **C-15's non-carry-forward check** were outstanding | **DISCHARGED** — §3 pastes `comm -13`/`-23`/`-12` (225/152/100); §4 and §5 disposition every member of both enumerations; §7 states the flat triad's removal by path; §8 diffs C-15 rather than assuming it                                                                           |

---

## §13 · Limits of this record, declared rather than papered over

1. **The open tree is gone.** Every open reading here is re-derived from `6d280ee7` plus the 26
   untracked rows banked at `artefacts/W0/substrate-open.txt`. The re-derivation reproduces OP-1's
   and the fold seat's figures exactly (252 · 226 · 325 · 225/152/100 · the EE-02 stat), which is
   the check — but it is a re-derivation, and it is labelled as one at every use.
2. **The 97 absorbed V docs are counted, not named.** No filesystem or git signal survives to name
   them (§4.2). This record states the count and declines the membership.
3. **The module-shadowing limb at §7 is an inference about resolution order**, labelled as such; the
   _measurement_ is that the triad is absent and that zero specifiers traverse the flat spelling.
4. **Nothing here asserts closure in its own voice** over the reconciliation surface: the claim is
   that 477 distinct members (252 ∪ 325) each resolve to a named disposition across §4/§5/§6, and
   the arithmetic that supports it is re-summed **at each enumeration** with its counting rule
   beside it. A seat that doubts it re-runs the three `comm` probes at §3 and the two classification
   predicates at §5 and §6.
5. **This unit moved no byte in `keyframes.js`** — every command above is `git`/`ls`/`grep`/`sed`,
   read-only. The two EE-02 paths are the owner's hand, verified and never written.
