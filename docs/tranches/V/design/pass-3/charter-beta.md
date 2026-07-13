# V · pass-3 · CHARTER β — RE-RUN THE SRC COLOR MERGE ON HEAD

**Pass 3 · CHARTER-β lane · 2026-07-13 · author: charter-β runner (opus, model declared).** RAN in an
isolated worktree (`wf_d1113dbe-da7-2`, `npm ci` fresh), reset to campaign HEAD **`07bf61d`** (tranche-u
tip at pass-3 launch — a real +2-drift-generations advance over the F3 proto's `6abef80` and the pass-2
lanes' `9423094`). Every number below carries its command; all mutation happened only in the worktree and
is **NEVER merged** — the deliverable is this evidence. Instruments live at
`scratchpad/{census,merge-codemod,carve-scc,capsule-scc,trace-color}.mjs` (evidence-only, un-committed).

Charter-β governs **2 RUN items** (AGGLOMERATION §3·Charter-β). Verdict up front: **2/2 RAN, both CLOSED
with first-hand measurement on HEAD.** The one load-bearing D3 result no pass-2 lane re-ran (spine fact 8)
is now re-run: the merge lands green on the current tree, the 15-vs-11 edge-count instability is resolved to
**zero instability under a stated deterministic method**, and merged-tree acyclicity is not inferred from
Charter B's primitive but **demonstrated on HEAD** — including a first-hand reproduction of the exact
TDZ hazard the registry cures.

---

## §0 Headline table (what RAN)

| # | Charter-β item | mode | the load-bearing measured result |
|---|---|---|---|
| 1 | RUN `git mv parsing/color → units/color/parse` on HEAD; re-measure `subpath-budget` + `/color` trace; reconcile 15-vs-11 | **RAN** | merge lands: typecheck 0 · `subpath-budget` **11/11** · `/color` trace **34 mod, 0 parsing, 0 parse-home** · deterministic edge count **13 @ HEAD** (the ±27% swing is a two-axis confound, dissolved) |
| 2 | State merged-tree acyclicity-at-HEAD honestly; re-apply the registry; measure merge+registry composed | **RAN** | merge is **cycle-neutral** (14-file barrel SCC persists, seam acyclic); merge+registry → suite **2326** · build 0 · `subpath-budget` 11/11; **registry LOAD-BEARING demonstrated** (eager+carve = 2 FAIL TDZ → lazy+carve = 0 FAIL, barrel SCC 14→5) |

---

## §1 · ITEM 1 — the merge re-run on HEAD (RAN)

### 1.1 The deterministic counting method (stated inline — the crux of the reconciliation)

critique-charter-a G4 / retro-f3 G3: the merge's headline edge count `parsing/color → units/color` swung
**15 (research) vs 11 (proto)** — a ±27% instability that made the coexistence proof rest on a disputed
number. The swing is **not measurement noise; it is two orthogonal confounds counted as one.**

> **THE DETERMINISTIC METHOD (`scratchpad/census.mjs`, applied uniformly):** an EDGE is a unique directed
> `(sourceFile → targetFile)` pair where `sourceFile` contains ≥1 `import|export … from "<spec>"` whose
> `<spec>` resolves (`.ts` / `/index.ts`) to `targetFile`. Multiple statements or multiple named specifiers
> between the same two files count as **ONE** edge (dedup by a `Set` keyed on `${src} ${dst}`). This is the
> graph-theoretic file-level edge count — the only count invariant to statement-vs-specifier granularity by
> construction. For provenance the census ALSO reports the two *unstable* counts that produced the swing:
> STATEMENTS (`from` statements crossing the boundary) and SPECIFIERS (named symbols crossing it).

**Measured (`node scratchpad/census.mjs src`), holding BOTH axes fixed — no instability survives:**

| tree | FILES (deterministic) | STATEMENTS | SPECIFIERS |
|---|---|---|---|
| `6abef80` (F3 proto era) | **11** | 13 | 51 |
| HEAD `07bf61d` | **13** | **15** | 53 |

**The 15-vs-11 swing decomposed:**
- **Axis A — counting method.** At a *single fixed tree* (HEAD): file-level = **13**, statement-level = **15**,
  specifier-level = 53. The proto's "11" is the **file-level** method; the research/retro's "15" is the
  **statement-level** method. Different instruments, both correct, incommensurable.
- **Axis B — tree drift.** `6abef80 → HEAD` added **+2 file-edges** (both `→ units/color/normalize.ts`, one
  each from `color.ts` + `relative-color.ts` — the U-era relative-color/color-parse expansion) and **+2
  statements**. The proto measured `6abef80`; research/retro measured a tranche-u tree.
- **The "15 vs 11" compared statement-level-at-HEAD (15) against file-level-at-6abef80 (11)** — different
  method AND different tree. Reproduced exactly: my file-level count at `6abef80` = **11** (= the proto's
  number, to the unit); my statement-level count at HEAD = **15** (= research/retro's number, "concentrated
  in 3 files" — `color.ts`/`color-unit.ts`/`relative-color.ts`, confirmed). Neither number was ever wrong;
  they were never the same measurement.

**Ruling (stated inline for the manifest): the deterministic edge count is the unique directed file-level
edge count = `parsing/color → units/color` = 13 at HEAD.** The coexistence proof is now load-bearing on a
stable number.

### 1.2 The move (RAN) — `git mv` + path-aware codemod (`scratchpad/merge-codemod.mjs`)

`git mv src/parsing/color src/units/color/parse`, then a path-aware codemod: every specifier is resolved
against its endpoints' FUTURE location (F3 friction #1), and a **clean-blast rule** leaves any specifier that
still resolves correctly post-move VERBATIM (so the `units/color` barrel-megacycle's bare `"."`/`".."`
specifiers are NOT spuriously re-canonicalised — the first codemod pass touched 22 files by re-writing those;
the rule cut it to the true 6).

```
merge-codemod: 6 files changed, 31 import sites rewritten
AUDIT residual dangling parsing/color specifiers (UNSAFE if >0): 0
SAFE: true
git diff --shortstat: 6 files changed, 31 insertions(+), 31 deletions(-)  (+ 4 git-mv renames)
```

The 6 content files = the **3 external src consumers** (`src/index.ts`, `src/parsing/units.ts`,
`src/subpaths/parsing.ts` — matching the proto's enumerated 3) + the **3 moved files** whose cross-boundary
imports flip intramural. Spot-check `units/color/parse/color.ts`: the former cross-boundary
`from "../../units/color"` is now `from ".."` (intramural — the 13-edge kill); the grammar-util imports
are now `from "../../../parsing/{utils,units}"` (the new `units/color → parsing` dependency).

**Typecheck (merged tree):** `npx vue-tsc -p tsconfig.lib.json --noEmit` → **exit 0**.

### 1.3 `subpath-budget` + the `/color` esbuild trace re-measured on HEAD (RAN)

```
BASELINE (un-merged HEAD):  npm run build && npm run proof:subpath-budget → 11/11 GREEN
MERGED tree:                npm run build && npm run proof:subpath-budget → 11/11 GREEN
```

**A gate-integrity finding the pass-2 citation could not surface: the gate's C1 became WEAKER post-merge.**
`proof-subpath-budget.mjs` C1 asserts the `./color` bundle graph pulls ZERO `src/parsing/` modules — but
its regex is `/src/parsing/`, and after the merge the color-parse files live at `units/color/parse/`, which
that regex no longer matches. C1 passes post-merge *partly because its predicate moved out from under it*.
The F3 proto pre-empted this by tracing BOTH homes; I reproduced that stronger property
(`scratchpad/trace-color.mjs`):

```
./color bundle graph: 34 modules
  from src/parsing/         : 0
  from units/color/parse/   : 0
PASS — ./color is grammar-free at BOTH the old and new color-parse homes
```

**34 modules, 0 grammar at either home** — matching the F3 proto's `6abef80` result (34/0/0) on the HEAD tree.
The "directory ≠ export map" coexistence holds at HEAD: the grammar is physically inside the color directory,
yet the `/color` barrel never pulls it (the barrel imports only `units/color/*` leaves, and those leaves
never import `parse/` — one-directional, confirmed by the physical census below). **Note for the wave**: if
the merge lands, C1's regex should widen to `units/color/parse/` too, else the gate silently stops guarding
the very seam the merge creates.

### 1.4 The physical census (RAN — the merge's effect, measured)

`PHYS=1 node scratchpad/census.mjs src` (counts `units/color/parse/` as its real parent `units/color`):

| edge | pre-merge | post-merge | reading |
|---|---|---|---|
| `parsing/color → units/color` | **13** | **0** | the 13 cross-DIRECTORY edges are now intra-directory ✔ |
| `units/color → parsing` | 0 | **5** | NEW: the color capsule now imports the parsing kernel (grammar utils) |

The 5 new `units/color → parsing` file-edges: `parse/color.ts → parsing/{units,utils}`,
`parse/relative-color.ts → parsing/{math,units,utils}`. This is the proto's "gains `color→parsing`=5",
re-confirmed at HEAD.

### 1.5 The TRUE blast radius — an honest correction to pass-2's "small blast" (the finding of item 1)

The F3 proto and both pass-2 lanes reported the merge as **"7 files / 3 consumers, a small blast"** — because
they measured only **typecheck-delta + `subpath-budget`**, and **never ran the full unit suite.** Running it
(`npx vitest run`) surfaced the real consumer set the src-only view hid:

```
FIRST run (src codemod only):  Test Files 16 failed | 69 passed  ·  Tests 1 failed | 1420 passed
```

- **15 test files** import `@src/parsing/color` (the barrel) directly — external consumers the src-scoped
  codemod never touched (`test/tranche-u-lib.test.ts`, `test/units/color/color-*.test.ts`, …). 16 import
  sites. In a prototype worktree they are trivially repointed (`parsing/color → units/color/parse`, 15
  files), but they are **real merge blast** the pass-2 "3 consumers" undercount omitted.
- **The `canon-sync` born-RED gate FIRES** (`test/dist/canon-sync.test.ts` G-CANON-2, U-F21/U-F69):
  "root CLAUDE.md Structure block documents paths that DO NOT exist in the tree (drift): **src/parsing/color**."
  The merge is not just a code move — it is a **doc-canon event**: the root CLAUDE.md Structure block (and,
  un-gated but real, `src/parsing/CLAUDE.md` + `src/units/color/CLAUDE.md`) must be updated in the same
  atomic cut, or the born-RED gate stays RED.

**The honest merged blast radius at HEAD = 4 renames + 6 src content + 15 test files + ≥1 canon doc (the
gated root CLAUDE.md).** After repointing the tests + relocating the CLAUDE.md Structure entry (`color/`
under `parsing/` → `parse/` under `units/color/`), the full suite is GREEN:

```
Test Files  85 passed (85)   ·   Tests  2326 passed (2326)   [merged tree, pre-registry]
```

2326 = Charter B's baseline count — **the merge is behavior-preserving** (it relocates graph nodes without
rewiring edge semantics). But the "small blast" framing is retired: the merge is a full-suite + canon-gate
event, not a 7-file move, and any wave that lands it owns the test-repoint + the CLAUDE.md canon sweep.

---

## §2 · ITEM 2 — merged-tree acyclicity-at-HEAD, honestly (RAN)

### 2.1 The merge is CYCLE-NEUTRAL — it kills coupling, not cycles (measured, not asserted)

critique-charter-b G5 / retro-f3 G6: score the merge as "kills the cross-boundary color coupling, does NOT
deliver an acyclic capsule standalone — acyclicity rides the registry," never as a raw leak-count win.
Measured three ways on HEAD:

- **Whole-src file-level SCC (Tarjan, `scratchpad/census.mjs`): a 25-file SCC `{parsing, units, units/color}`
  exists IDENTICALLY pre- and post-merge.** The 4 color-parse files were ALREADY inside the
  `units ↔ parsing ↔ units/color` megacycle before the merge (via `parsing/units.ts → parsing/color` forward
  + the `parse → parsing` grammar back-edges + the `units ↔ parsing` `layout-cache.ts` back-edge). The merge
  **relocates** those 4 nodes; it neither creates nor removes the cycle. This is a **sharper** honest reading
  than the proto's "cluster SCC 4-node → 3-node": that shrink is a *labelling artifact* (the `parsing/color`
  cluster name disappears when its files are relabeled `units/color`), not a structural improvement — at the
  file level the cycle is unchanged.

- **Capsule-internal SCC (`scratchpad/capsule-scc.mjs`, Tarjan restricted to `units/color/**`): the merged
  capsule carries a 14-file barrel megacycle** — `contrast`, `dispatch`, `mix`, `normalize`, `index`, and 9
  `conversions/*` all routed through `units/color/index.ts` — plus a 2-file `base ↔ serialize` cycle. **BOTH
  are pre-existing and have 0 `parse/` members: the merge SEAM is acyclic.** (The proto reported "17-file
  barrel SCC" at `6abef80`; at HEAD it is 14 — drift from the U-era conversions refactor. The number is
  tree-dependent; the *shape* — a barrel megacycle the merge inherits, seam-clean — is stable.)

**Verdict (item 2, honest): the merge turns 13 cross-directory color-parse→color-repr edges intramural and
gains `units/color → parsing` = 5; it does NOT deliver an acyclic capsule — it inherits the 14-file barrel
SCC and leaves the whole-src megacycle untouched. Acyclicity rides the registry.** Never a raw leak-count
win (13→0 is a *coupling* win, not a *cycle* win).

### 2.2 merge + registry — the composed state (RAN, re-applied on HEAD)

Re-applied Charter B item-4b's **order-independent registry** on the merged tree: `XYZ_FUNCTIONS` and
`XYZ_FROM_INTO` (eager `const` tables in `dispatch.ts`, confirmed live at HEAD — every read already routes
through `getXyz*Fn` getters) → **lazy memos** (`_XYZ ??= { … }`, built on first `color2()` call, post
module-eval when every conversion binding is initialised → correct under ANY module order). Measured:

```
merge + registry (lazy memo, no carve):
  typecheck (vue-tsc -p tsconfig.lib.json) → exit 0
  full suite (vitest run)                  → 85 files / 2326 tests PASS
  npm run build                            → exit 0
  proof:subpath-budget                     → 11/11 GREEN
```

The primitive composes: it is behavior-preserving, so merge+registry passes every gate the merge alone does.
But — per G5's own caution — "composes green" is not yet "delivers acyclic." That is §2.3.

### 2.3 Acyclicity RIDES the registry — demonstrated on HEAD, not inferred (RAN)

critique-charter-b G5's residual: "merged-tree acyclicity AT HEAD is unproven by the pass-2 batch; the
composed claim is an **inference from the primitive**." I closed the inference with a first-hand experiment
on the merged tree (`scratchpad/carve-scc.mjs` reproduces Charter B's barrel-SCC carve — redirect the color-
barrel imports `from "."`/`".."` → concrete `base`/`spaces`, correctly distinguishing the value-barrel `".."`
in direct children from the color-barrel `".."` in `conversions/`, the ambiguity Charter B flagged):

| state | typecheck | color2 suite | capsule barrel SCC | reading |
|---|---|---|---|---|
| merge only | 0 | 2326 ✔ | **14 files** (routes through `index.ts`) | the barrel megacycle the merge inherits |
| **eager table + carve** | **0** | **2 FAIL** | severed-but-broken | `color2 RGB→LAB` + `RGB→XYZ`: `Unknown target color space: "rgb"` — `XYZ_FUNCTIONS["rgb"]` undefined (`xyz2rgb` in TDZ at dispatch module-eval under the severed barrel). **The exact hazard, first-hand on HEAD.** |
| **lazy memo (registry) + carve** | 0 | **2326 PASS** (2 FAIL→0) | **5 files** (`index.ts` OUT) | the registry cures the TDZ; the barrel megacycle severs — `index.ts` leaves the cycle |

- The **eager+carve → 2 FAIL** reproduces Charter B's result to the symbol (`color-conversions.test.ts`,
  `color2 RGB→LAB/XYZ`, `dispatch.ts:247`) — confirming the init-order hazard the fresh critic verified "live
  on HEAD" is *actually triggered* by the carve on the merged tree, not merely present.
- The **lazy+carve → 0 FAIL** proves the registry is **load-bearing**, not decorative: it is the single edit
  that flips 2 FAIL → 0.
- The barrel SCC drops **14 → 5**: `index.ts` (the barrel) leaves the cycle. The residual 5-file SCC
  (`dispatch` ↔ `conversions/{cylindrical,direct,kelvin,xyz-extended}`) is **genuine conversion-leaf
  interdependence** (conversion functions calling each other), NOT the barrel megacycle — a smaller,
  honestly-disclosed residue that further leaf-decoupling would address (out of this charter's scope; the
  barrel cycle is the one the proto/retro named).
- Full composed severance state (`merge + carve + registry`) passes every gate: `build` exit 0 ·
  `proof:subpath-budget` **11/11** · `/color` trace **34 mod / 0 / 0**.

**This moves G5 from "inference from the primitive" to a demonstrated fact on HEAD: the merge composes with
the registry to deliver the barrel-cycle severance the color capsule needs; acyclicity rides the registry,
and the registry is the load-bearing edit (2 FAIL → 0), measured — not asserted.**

---

## §3 · Owner-fork records + clean-break

Charter-β touches **no owner-reserved fork**. The `@`-ban idiom and the api vocabulary (OF-1, OF-2) are D1/D2
surfaces this D3 lane does not touch; OF-3/OF-4/OF-5 are untouched. The merge itself is a clean-break atomic
cut (`git mv` + one-pass rewrite, no alias window, no dual path, SAFE:true) — but its **true clean-break cost
is larger than pass-2 booked**: it is atomic across `src` + `test` + the canon docs (the `canon-sync`
born-RED gate makes the CLAUDE.md sweep non-optional). **Booked, not forked** for the coupled owner event
(OF-5): the merge is a landing-wave act with a test-repoint (15 files) + a CLAUDE.md canon sweep + a
`proof-subpath-budget.mjs` C1-regex widening (to guard `units/color/parse/`), gated on the registry landing
first (or co-landing) so the barrel carve it enables does not TDZ. Nothing here merges; the campaign authors
the evidence, the owner lands it.

## §4 · Honest frictions + residual weaknesses

1. **The carve leaves a 5-file residual SCC** (conversion-leaf interdependence), so "acyclic capsule" is
   NOT fully delivered even post-carve — the barrel MEGACYCLE severs (14→5, `index.ts` out), but a smaller
   leaf-cycle persists. Scored honestly: the merge+registry delivers the *barrel-cycle* severance the
   proto/retro named, not a globally-acyclic capsule.
2. **The test-repoint + CLAUDE.md edit are prototype mutations** (evidence-only, un-merged) done solely to
   turn the full suite + `canon-sync` gate GREEN and thereby MEASURE the composed state. They are real merge
   blast, booked for the wave — not a landed change.
3. **The registry re-application on the carved tree used a scripted re-edit** of the same 4 lazy-memo sites
   Charter B authored; the primitive is Charter B's, re-run here on HEAD atop the merge — credited, not
   re-invented. My new contribution is the *composition* (merge ∘ registry ∘ carve) measured on HEAD.
4. **`smoke` was not run** (this is a D3 src lane; the demo build/smoke is D1). The library gates (typecheck,
   2326-test suite, build, `subpath-budget`, the `/color` bundle trace) carry the correctness evidence.

## §5 · Composition read

Charter-β closes the one load-bearing D3 result no pass-2 lane re-ran. The merge lands green on HEAD; the
15-vs-11 instability is dissolved to a stated deterministic count (**13 @ HEAD**, the ±27% swing a two-axis
method×tree confound); the coexistence proof is re-verified stronger-than-the-gate (`/color` grammar-free at
both homes); and merged-tree acyclicity is **demonstrated, not inferred** — the merge is cycle-neutral, the
registry is the load-bearing severance edit (2 FAIL → 0 on HEAD), and the composed `merge ∘ registry ∘ carve`
state passes the full suite + build + `subpath-budget`. The honest correction the re-run earned: the merge's
true blast radius is **4 renames + 6 src + 15 test + the canon doc gate**, not "7 files / 3 consumers" — a
full-suite + `canon-sync` event the pass-2 typecheck-only view could not see.

## §6 · Reproduce (all scripts in `scratchpad/`, isolated worktree, NOT merged)

```
# reset to HEAD, install
git reset --hard 07bf61d && npm ci

# item 1 — the deterministic edge census (HEAD vs 6abef80)
node scratchpad/census.mjs src                      # HEAD: files=13 stmts=15 specs=53
git archive 6abef80 src | tar -x -C /tmp/s && node scratchpad/census.mjs /tmp/s/src   # 6abef80: 11/13/51

# item 1 — the merge + gates
git mv src/parsing/color src/units/color/parse
node scratchpad/merge-codemod.mjs src               # 6 files / 31 sites, SAFE:true
npx vue-tsc -p tsconfig.lib.json --noEmit           # exit 0
npm run build && npm run proof:subpath-budget       # 11/11 GREEN
node scratchpad/trace-color.mjs .                   # 34 mod, 0 parsing, 0 parse-home
PHYS=1 node scratchpad/census.mjs src               # parsing/color→units/color=0, units/color→parsing=5

# item 1 — the true blast (repoint tests + CLAUDE.md canon), then full suite
#   (test codemod: parsing/color → units/color/parse across 15 test files;
#    CLAUDE.md Structure: move color/ under parsing/ → parse/ under units/color/)
npx vitest run                                      # 85 files / 2326 tests PASS

# item 2 — acyclicity + the registry-is-load-bearing demonstration
node scratchpad/capsule-scc.mjs src                 # merge only: 14-file barrel SCC, 0 parse members
#   registry lazy-memo on dispatch.ts (merge+registry): vitest 2326 · build 0 · subpath-budget 11/11
git checkout HEAD -- <13 color files> ; node scratchpad/carve-scc.mjs src   # EAGER + carve
npx vitest run test/units/color/conversions/color-conversions.test.ts       # 2 FAIL (TDZ)
#   re-apply the lazy-memo registry to carved dispatch.ts:
node scratchpad/capsule-scc.mjs src                 # 14 → 5 (index.ts out); vitest 2326 PASS
```

**Worktree HEAD `07bf61d`; referent glass-ui `5.0.0` (pinned, symlinked). No prototype merges — evidence
only. Deliverable committed: this doc, pathspec `docs/tranches/V/**`.**
