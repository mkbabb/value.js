SERVED MODEL: claude-opus-5[1m]

# G-KFW4-11 — the equality oracle, CORRECTED at execution · dated addendum-beside

**Date**: 2026-09-17 · **Seat**: X.KF.W4 unit `.b` · **Instrument**: E-3 addendum-beside.
**The spec's bytes are NOT edited by this seat.** `docs/tranches/X/keyframes/waves/KF-W4.md` is
dated, adjudicated and IMMUTABLE; every correction below is recorded here, beside it, with the
failing reading and the true reading both printed (LAW D / R5-11: a figure that does not reproduce
is superseded AT the enumeration, with the discarded reading named).

**Substrate**: `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
⟨`git rev-parse --short=8 origin/master`⟩ → `55e9bf0d` (COHESION §0j.C KF-WRITE (b)); the wave's
`.a` commit `5388907b` is the parent of this unit's work. Every command below was executed at this
seat and double-run.

---

## 1. THREE corrections to part (2)'s LHS pipeline — the spelled command yields the EMPTY set

The spec's command column spells the oracle's left-hand side:

```
jq -r '.modules[] | select(.source | startswith("demo/")) | .dependencies[] |
       select(.module | startswith("src/")) | "\(.source):\(.module)"' \
  evidence/KF-W4/depcruise-inventory.json | sort > actual-specifiers.txt
```

Executed verbatim against the real report it yields **0 lines** against a 7-line RHS — the gate would
red for the wrong reason, and would red identically whether or not depcruise reached `demo/`. Three
independent defects, each measured:

| # | defect | reading as spelled | true reading |
|---|---|---|---|
| **C-1** | the KEY. `.module` holds the specifier **as written**; a deep import is written `@src/animation/…`, never `src/…` | `select(.module \| startswith("src/"))` → **0 pairs** | `select(.module \| startswith("@src/"))` → **7 pairs**. (`.resolved \| startswith("src/")` → **84**, the *barrel* hops `@mkbabb/keyframes.js` → `src/animation/index.ts` — not deep imports, not this gate's subject.) This is the wave record's **F-2**, confirmed |
| **C-2** | the SOURCE binding — **found at this seat, NOT in F-2**. After `.dependencies[]` the jq context IS the dependency object, which carries `module` / `resolved` / `dependencyTypes` and **no `source` key**, so `"\(.source)…"` interpolates the string `null` | `null @src/animation/compile/emit/css-text` ×3 … — 7 lines, **every path `null`** | bind the module first: `.modules[] \| select(.source \| startswith("demo/")) \| . as $m \| $m.dependencies[] \| select(.module \| startswith("@src/")) \| "\($m.source) \(.module)"` |
| **C-3** | the SEPARATOR. The frozen RHS's own derivation (`sed -E 's\|^([^:]+):[0-9]+:.*"(@src/[^"]+)".*\|\1 \2\|'`) emits `path SPACE specifier`; the LHS spells `"\(.source):\(.module)"`, a COLON | `path:@src/…` — never equal to the RHS even when both sides are otherwise right | `"\($m.source) \(.module)"`, one space, matching the pinned list byte-for-byte |

**F-2's own reading is corrected here, not inherited.** The wave record's F-2 table states that
`.module` starting `"@src/"` with key `"\(.source) \(.module)"` yields *"exactly the pinned seven, in
the frozen RHS's own key form — reproduced byte-identical to the `git grep` derivation"*. Re-run at
this seat, that exact pipeline yields **7 lines whose path column is `null`** — the COUNT was right
and the CONTENT was not, because C-2 was never measured. Recorded as a dated correction to a baseline
FINDING, never an edit to it: F-2 remains true in its conclusion (the `@src/` key is the cure) and
incomplete in its evidence.

**The corrected pipeline, executed:**

```
⟨jq -r '.modules[] | select(.source | startswith("demo/")) | . as $m | $m.dependencies[] |
        select(.module | startswith("@src/")) | "\($m.source) \(.module)"' \
   depcruise-inventory.json | sort > actual-specifiers.txt⟩
→ 7 lines · 6 distinct files (⟨cut -d' ' -f1 … | sort -u | wc -l⟩ → 6)

⟨diff actual-specifiers.txt evidence/KF-W4/pinned-seven.txt⟩ → exit 0
```

**The gate's substance is untouched**: set equality against the frozen seven, `sort` never `sort -u`
(multiset — a second import of the same specifier in the same file is an ADDITION and reds), the line
coordinate deliberately outside the key, failing on an addition **and** on a silent removal,
satisfiable by DETECTION alone with no cure of a KF.W8 site and no allowlist.

---

## 2. A FOURTH correction — part (1)'s REACH premise is false at the bytes

The spec's reach arm states: *"a config still scoped to `src/` reports **zero** demo modules, and an
empty reported set is a RED by part (2)"* — the mechanism PASS-6 D-1 installed so that blindness
fails the gate instead of passing it.

**Measured, BEFORE any byte of `.dependency-cruiser.cjs` was written** (the config still carrying its
three `^src/`-scoped rules):

```
⟨npx depcruise --config .dependency-cruiser.cjs src demo --output-type json⟩
→ 439 modules · 230 demo modules · 157 src modules · 0 violations
```

**230, not zero.** What a dependency-cruiser run *reports* is fixed by the CLI's own argument list,
not by the `forbidden` rules' `from` scope: the rules decide what VIOLATES, the arguments decide what
is CRUISED. So the round-6 mechanism does not bite as described — a config whose rules never mention
`demo/` still reports 230 demo modules, and the LHS is non-empty either way.

**What actually protects the gate, stated so the next seat does not re-derive it**: the oracle is a
`diff` against a list frozen BEFORE the first cure, so a run that loses the demo arm (wrong arguments,
a `doNotFollow` widened over `demo/`, an `includeOnly` added) produces an LHS of 0 lines against a
7-line RHS and **reds**. Blindness fails through the RHS's fixity, not through the rules' scope. The
`--output-type json` reach arm's own exit code is, as the gate says in its own voice, **expressly not
this gate's oracle** (measured: `depcruise … --output-type json` exits **0** even holding 4 error
violations; the `err` reporter exits **4**).

**The §Bounds verb "extend past `src/`" was executed anyway, on the rules**, because it is a §Bounds
row's literal instruction and because the extension is a true invariant: rule 1 (`no-cycle`) now reads
`from: { path: "^(?:src|demo)/" }`. Its first run found **four genuine runtime cycles** (§4 below).
Rules 2 and 3 are `internal/`-leaf and LIGHT-barrel rules by construction and have no demo image.

---

## 3. `pinned-seven.txt` — the curated header block, and why it is HERE and not in that file

`pinned-seven.txt` is the right-hand side of a `diff` whose **exit 0 IS the gate**. A header block
inside it — or a `SERVED MODEL:` receipt line at its top — makes the spec's own literal command
`diff actual-specifiers.txt evidence/KF-W4/pinned-seven.txt` unsatisfiable **by construction**, at
every future run, for every seat. The two instructions cannot both be honoured in one file:

- §Gates G-KFW4-11: *"`diff actual-specifiers.txt evidence/KF-W4/pinned-seven.txt` — **exit 0 is the
  gate, and nothing else is**"*, the RHS being *"one `(path, specifier)` pair per line, `sort`ed,
  multiset"*;
- the round-6 artefact-identity clause + the wave record's F-4: the hash, the five dead LIGHT entries
  with their live twins, and the config's literal path *"move to a separate `pinned-seven.txt` header
  block"*.

**Disposition, declared rather than silently chosen**: `pinned-seven.txt` holds the **seven pairs and
nothing else**, so the gate's command runs byte-for-byte as the spec spells it; the curated block is
written HERE, dated, beside it. The standing receipt law (*line 1 of any file you create =
`SERVED MODEL:`*) is **suspended for that one file only**, for the same reason and with the same
declaration — a machine oracle cannot carry prose. Every other artefact this seat wrote carries its
receipt line. ONE PATH, ONE WRITER, ONE CONTENT is preserved: `pinned-seven.txt` has exactly one
writer (this seat's pipeline, never hand-typed) and exactly one content.

### The curated block

- **`pinned-seven.txt`** — sha256 `9733d2e6d520e329f1c51a713a416e18184fb0d48ba35dc760d78457f7e5d328`
  · 7 lines · 6 distinct files · frozen **before** the first cure, from the pre-cure raw report
  (sha256 `2d87a882842fbc2d7ab1fd944423462c71fd1e4cf1a04351f3455418eb485e75`).
- **`depcruise-inventory.json`** — depcruise's **RAW** output and nothing else (round-6 identity) ·
  sha256 `fd4d4da35f82bba14db5b9124927e1546f95f66b8d2dd664ad997b69fd81b521` · the post-cure reach-arm
  run · 439 modules · 230 demo · 157 src.
- **The config's LITERAL path** (R-8.4, no placeholder anywhere): `.dependency-cruiser.cjs`, at the
  keyframes.js repo root. It carries that literal path at the frontier; no correction was needed.
- **The FIVE dead LIGHT-allowlist entries, with their live twins** — each existence-checked per entry
  ⟨`git cat-file -e origin/master:src/animation/<entry>.ts`⟩, **5 DEAD / 19 LIVE of 24**, the spec's
  round-4 figure **5** (not the bank's 4) reproducing exactly:

  | dead entry | live twin |
  |---|---|
  | `physics/spring/duration` | `physics/spring/solver/duration` |
  | `physics/spring/reseat` | `physics/spring/solver/reseat` |
  | `physics/spring/linear-stops` | `physics/spring/css/linear-stops` |
  | `physics/spring/timing-function` | `physics/spring/css/timing-function` |
  | `orchestration/drag/drag-2d` | `orchestration/drag/2d` |

  After the repoint, every entry resolves: ⟨per-entry `fs.existsSync('src/animation/<entry>.ts')`⟩ →
  **24 entries · 0 dead · 24 live**. Why it is load-bearing and not clerical: `LIGHT_FROM` is rule 3's
  ENTIRE `from` set, so each dead entry was a LIGHT module the boundary rule **silently did not
  cover** — a green run over a subject set five short, which is the by-construction pass
  G-KFW4-9 rule (e) convicts.

---

## 4. What the extended rule found — four REAL runtime cycles, routed not smoothed

⟨`npx depcruise --config .dependency-cruiser.cjs src demo`⟩ → **4 dependency violations (4 errors)**,
one ring, one directory:

```
demo/scenes/cube/orbital-drag/index.ts → OrbitalDrag.vue → index.ts
… + the same ring closed through composables/useOrbitalPointer.ts
… + … composables/useOrbitalPinch.ts
… + … composables/useOrbitalInertia.ts
```

**Verified REAL, not a parse artefact**: `index.ts:3` is `export { default as OrbitalDrag } from
"./OrbitalDrag.vue";` — a **value** re-export — and `OrbitalDrag.vue:18` imports **values** back from
the barrel (`import { axes, defaultTransformBounds, defaultTransformState, defaultVelocityState } from
".";`). A barrel↔component runtime ring with a genuine module-init hazard, invisible to every
instrument in the tree until this run. `:16`/`:17` are `import type` and are correctly exempt.

**ONE defect, ONE cure shape** (not a wall): the four rows are one ring; breaking the
`OrbitalDrag.vue → "."` value edge — the component reading the shared constants from their own module
rather than from the barrel that re-exports it — closes all four.

**Routing**: `demo/scenes/cube/orbital-drag/**` is in **no** unit's writable set in KF.W4. Routed to
the wave / the triumvirate with the src-only baseline re-verified beside it:
⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ no dependency violations found (164
modules, 705 dependencies cruised)**, exit 0 — SCH-7's no-cycle baseline holds, and the four findings
are demo-side and new-to-sight, never a regression of the library graph.

---

## 5. Gate reading

| arm | oracle | BEFORE | AFTER |
|---|---|---|---|
| part (1) REACH | the run reaches `demo/` | 230 demo modules (already reached by argument; the config's rules did not) | **230 demo modules · the config's rule 1 now names `demo/` · the 24-entry LIGHT allowlist resolves 24/24** |
| part (2) ORACLE | `diff actual-specifiers.txt pinned-seven.txt` exit 0 | **unsatisfiable as spelled** (LHS = 0 lines, or 7 `null` paths) | ⟨`diff`⟩ → **exit 0** (double-run) |
| **G-KFW4-11** | part (2) and nothing else | RED | **GREEN** |
