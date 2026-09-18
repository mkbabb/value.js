SERVED MODEL: claude-opus-5[1m]

# X.KF.W5.b — Arm A · THE CENSUS — receipt sheet

**Unit**: `X.KF.W5.b` (Arm A, `.b`) · **wave** KF.W5 · **track** B (X·KF).
**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W5.md` (530 L, IMMUTABLE under E-3).
Sections executed: §0 R-2 (`:37-53`) · §Bounds LAW A (`:81-191`) · §Carry Arm A (`:321-332`) ·
§Gates **G-BASIS · G-ID · G-TAX · G-SCOPE** (`:416-419`) · §Sequencing **RD-1..RD-4** (`:454-459`).
**Gates turned here**: G-BASIS · G-ID · G-TAX (**relay leg only**) · G-SCOPE.
**Bounds**: value.js docs only — this sheet and `docs/tranches/X/execution/B/KF-W5.md`.
**Zero code paths, either repo.** No `registry/adjudicated/` byte written (G-TAX performs no registry
edit). glass-ui read only, never written.

Every figure below is read from the settled bytes and **double-run**; both runs agree, and the
double-run block is §7.

---

## §0 · Substrate of record, and one measured divergence stated up front

### 0.1 keyframes.js

⟨`git -C ../keyframes.js rev-parse origin/master`⟩ → **`7d958f212fd519142ee9ed5e298d5afe456a7967`**
⟨`git -C ../keyframes.js rev-parse HEAD`⟩ → `8bc8375397773789632333d29b453aff0067f356` — `master`,
**6 commits ahead of `origin/master`**, all of them unit `.a`'s S-0 front-load (`a9fe060f` …
`8bc83753`), none of them under `src/`.
⟨`git -C ../keyframes.js status --porcelain`⟩ → **2 rows, both untracked**, the §0m.0 survivors.

**B0 is measured at `7d958f21`** — the wave record's declared basis — and **not** at HEAD, because
B0's subject is `src/**` and `.a` wrote no `src/` byte. Stated so the choice is a decision, not an
accident: ⟨`git ls-tree -r HEAD --name-only -- src | grep -c '\.ts$'`⟩ would return the same 153.

### 0.2 The spec's own bytes, against the conformance seal — a divergence, explained, not smoothed

⟨`shasum -a 256 waves/KF-W5.md`⟩ → **`216a9102eb6723a3cdbf91a4a9a288542236ade289a0e98a51f6cf090f90f045`**
⟨`grep -n 'waves/KF-W5.md' conformance/PASS-8/CHECK.md`⟩ → `:22` **`153eb2068035e838cd2f38f15a64d1b923cfe4b200a0c6099d6ec333b4f0e0a2`**

**The live file is NOT the pass-8 sealed file.** Cause measured, not guessed:

⟨`git log --oneline -5 -- docs/tranches/X/keyframes/waves/KF-W5.md`⟩ → head `ba6dcdb3`
*"docs(X·union): repair r1 banked + UNION-CLEAN …"*, which is **after** `3c4807d0`
*"docs(X·KF): CONFORMANT — pass 8 …"*.
⟨`git show 3c4807d0:…/KF-W5.md | shasum -a 256`⟩ → **`153eb206…`** — the pass-8 hash, exactly.
⟨`git diff --stat 3c4807d0 ba6dcdb3 -- …/KF-W5.md`⟩ → **1 file changed, 2 insertions(+), 2 deletions(-)**.
⟨`git diff -U0 3c4807d0 ba6dcdb3 -- …/KF-W5.md | grep -E '^@@'`⟩ → **`@@ -353 +353 @@`** and
**`@@ -445 +445 @@`** — two lines, **changed in place, no line-number shift**.
⟨`git diff --stat ba6dcdb3 HEAD -- …/KF-W5.md`⟩ → **empty** (unmoved since).

Those two lines are the **X-union `S-5` cure**, the dated addendum-beside `4.0.0 → V at RC-P(V)`
(2026-08-30), at §Carry `B-16` and at the §Sequencing KF.W2/KF.W3 bullet — the pair the wave record's
precondition row already verified PRESENT at both sites. **Lawful under E-3** (a dated addendum, not a
patch), and it post-dates the 2026-08-29 seal by one day.

**Consequence for this unit, measured rather than assumed — every figure I publish is invariant
across the seal→live delta:**

| figure | at the sealed bytes `3c4807d0` | at the live bytes |
|---|---|---|
| G-ID probe hits | ⟨`git show 3c4807d0:… \| grep -cE 'KF-ES-[0-9]+\|(^\|[^-])\bL-2\b'`⟩ → **22** | **22** |
| §Carry data rows | ⟨`… \| awk 'NR>=309 && NR<=379 && /^\| \*\*/' \| wc -l`⟩ → **46** | **46** |

Neither changed line (`:353`, `:445`) is a G-ID hit line, and `:353` is a §Carry row modified in
place, so the row count cannot move. **The seal is the right substrate to cite and the live bytes are
the right substrate to measure; here they agree on everything this unit touches.**

---

## §1 · G-BASIS — one counting basis, every rival derived or struck

### 1.1 B0, declared with its probe and its ref

> **B0 = `git ls-tree -r 7d958f21 --name-only -- src | grep -c '\.ts$'` → 153.**

⟨run 1⟩ → **153** · ⟨run 2⟩ → **153**.
⟨`git ls-tree -r 7d958f21 --name-only -- src | grep -c '\.d\.ts$'`⟩ → **0** — `.d.ts` is measured and
excluded **as a cause, not as an assumption**: there are none.
Tracked files only; no untracked, no `dist/`, no `node_modules`, no build output.

**B0 is unmoved by KF.W4's fourteen commits**: ⟨`git ls-tree -r 81a56990 --name-only -- src | grep -c
'\.ts$'`⟩ → **153**, identical at the spec's authoring ref. The basis the spec declared is the basis
that is live.

### 1.2 The five rivals — each derived or struck, each with its own probe

| figure | disposition | the probe that produced it, run this seat |
|---|---|---|
| **80** | **STRUCK — and now STRUCK-TERMINAL, by ruling** | See §1.3. Its counting rule is stated nowhere and the one recovery path §0 R-2 allowed is closed by COHESION §0j.C |
| **139** | **DERIVED — B0's own probe at the disqualified ref** | ⟨`git ls-tree -r 8281638c --name-only -- src \| grep -c '\.ts$'`⟩ → **139**, exact. Not a rival basis; a **dated reading of the same basis**, 41 commits stale |
| **145** | **DERIVED — and now EXTINCT at the bytes** | The lane's probe was `find src -type f -name '*.ts' \| wc -l`, a **worktree** walk against `git`'s **index**. Run today: ⟨`find src -type f -name '*.ts' \| wc -l`⟩ → **153** and ⟨`git status --porcelain -- src`⟩ → **0 rows**. The delta that produced 145 (`139 − 2 deleted + 8 untracked`) **was the uncommitted WIP, and §B-12 settled it** — `find` and `ls-tree` now return the same number, which is the reconciliation completing rather than being argued |
| **153** | **CONFIRMED AND ADOPTED AS B0** | §1.1. Corroborated independently by the binding census: ⟨`grep -n 'KF.W5' formation/keyframes/CENSUS-2026-08-03.md`⟩ → `:194` *"**KF.W5 · D/L/C Tri-Fold Library Audit** — per-component D/L/C over the **14 zones / 153+**"* — 14 zones and 153, both reproduced at §1.4 from the tree |
| **"159 modules"** | **DERIVED — the last rival closes, and its ATTRIBUTION is struck** | §1.3 |

### 1.3 The fifth rival, closed by reading the script — and the attribution it carried is FALSE

§0 R-2 owed this figure *"to a script, not to an argument"*: read `proof:structure`'s own definition
out of `scripts/gates/structure/index.mjs` and state it. Done, at the bytes.

**(a) What the script actually defines.** ⟨`git show 7d958f21:scripts/gates/structure/index.mjs | sed
-n '64,150p'`⟩ — the scope object, verbatim at `:70-78`:

```
const SCOPES = {
    src: {
        roots: ["src"],
        fileExtensions: [".ts"],
        lineCeiling: 500,
```

and the file filter at `:139-143`: `.filter((n) => extensions.includes(extname(n)) && !n.endsWith(".d.ts"))`.
**That is B0's predicate, character for character** — roots `src`, extension `.ts`, `.d.ts` excluded.

**(b) The script emits NO module count.** ⟨`git show 7d958f21:scripts/gates/structure/index.mjs |
grep -nE 'console\.|modules|count'`⟩ resolves to a reporter (`:598-622`) that prints a header and
either `PASS: scope=src clean (0 violations across R1–R6)` or a finding list with per-rule tallies.
Run live: ⟨`npm run proof:structure`⟩ → `proof:structure — scope=src` /
`proof:structure — PASS: scope=src clean (0 violations across R1–R6)` (**both runs**). **There is no
"159" in it, and there is no module tally in it at all.** Its unit is a *directory* (an earned module
dir with its barrel), and its output is *violations*, never a census.

**(c) So whose figure is 159?** depcruise's own cruise line:
⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ →
`✔ no dependency violations found (**159 modules, 687 dependencies cruised**)` (both runs).

**(d) And it derives from B0 exactly.** ⟨`npx depcruise … src --output-type json`⟩, partitioned:

```
total modules: 159
under src/:    153     ← SET-EQUAL to B0 (comm -23 / comm -13 both empty; 0 .d.ts, 0 non-.ts)
NOT under src/:  6     ← @mkbabb/value.js/{color,css,easing,math,transform,value}
```

> **159 = B0 (153) + the 6 external `@mkbabb/value.js/*` subpath modules depcruise counts as graph
> nodes because it resolves the library's own dependency edges.** Set equality against
> `git ls-tree` verified in both runs, not just cardinality: **in-depcruise-not-git = ∅**,
> **in-git-not-depcruise = ∅**.

**(e) The finding.** `FOLD-FORWARD §C` attributes *"159 modules"* to `proof:structure`. **That
attribution is FALSE at the bytes**: `proof:structure` emits no count, and the figure belongs to
`depcruise`. The rival was never a rival basis — it is B0 **plus six nodes that are not modules of
this library at all** — and the reason it read as a disagreement for three rounds is that it was
credited to the one instrument that could not have produced it. Recorded as a dated addendum-beside
(E-3); no authority is patched.

**The five-rival reconciliation is therefore CLOSED: one basis (B0 = 153), two dated readings of it
(139, 145), one derivation with a struck attribution (159 = 153 + 6), and one strike (80).**

### 1.3.1 Why 80 is STRUCK-TERMINAL rather than merely unreconciled

§0 R-2 left one door open: *"Recoverable only if B18's rule is found in its own text, in which case it
is re-derived as a filtered subset of B0 (exports, not modules)."* **That door is closed by ruling.**
COHESION **§0j.C KF-OGKF1**: *"the Codex 'Keyframes v8' B-lineage is **STALE-BY-SUBSTRATE and does not
continue** … **the five conditional TCC re-reads never open**."* Re-opening `B18:78` to read its
counting rule is exactly one of those re-reads. **This seat opened no Codex root.**

And the strike now carries a measurement beside it, so it is not a bare refusal. Reconstructing the
most generous reading of *"public library surfaces"* — published export **names**, the "filtered
subset of B0" R-2 names — over the three published entries at `7d958f21`:

| entry | named exports | wildcard |
|---|--:|---|
| `src/animation/index.ts` | 141 | 0 |
| `src/animation/public.ts` | 79 | `export * from "./engine"` · `export * as presets from "./presets"` |
| `src/animation/load-engine.ts` | 3 | 0 |
| **union, distinct** | **178** (+ `presets`, the namespace export the named-export rule misses) = **179** | + the `./engine` wildcard's whole surface |

Counting rule stated at the enumeration: a **named export** is a binding introduced by
`export {…}` / `export type {…}` (aliases counted at the alias) or by `export const|let|var|function|class|interface|type|enum X`;
`export *` is an **edge**, not a name, and is listed rather than counted; `export * as ns` contributes
the single name `ns`. **179 ≠ 80 and no filtered subset of B0 lands on 80 under this reading** —
2.2× over, with a wildcard still unexpanded. The intake's verdict stands, re-derived:
`lane-keyframes-b10-b21.md` X-4 — *"No basis reconciles to 80; Codex never states the counting rule"*
— **UNPROVEN**, and now terminal.

### 1.4 The zone census, re-derived at open (not inherited from `lane-library.md` §3)

⟨`git ls-tree -r 7d958f21 --name-only -- src | grep '\.ts$' | awk -F/ '{if ($1=="src" && $2=="animation") {if (NF==3) z="(root)"; else z=$3} c[z]++} END {for (k in c) printf "%3d  %s\n", c[k], k}' | sort -rn`⟩

**14 zones, summing to 153** — the census's *"14 zones / 153+"*, reproduced from the tree.

| zone | B0 modules | `lane-library.md` §6 (at `8281638c`, dirty) | delta | cause |
|---|--:|--:|--:|---|
| compile | 29 | 23 | **+6** | the `emit/backward` · `emit/format` · `compile/frame` carves |
| physics | 22 | 22 | 0 | — |
| orchestration | 20 | 20 | 0 | — |
| engine | 17 | 13 | **+4** | the `play-lifecycle` carve `53b907c5` (×5, net of the god module) |
| group | 15 | 14 | **+1** | — |
| internal | 9 | 9 | 0 | — |
| resolve | 8 | 8 | 0 | — |
| scroll | 7 | 7 | 0 | — |
| waapi | 6 | 6 | 0 | — |
| svg | 6 | 6 | 0 | — |
| (root) | 5 | 5 | 0 | — |
| presets | 3 | 6 | **−3** | the shim delete `7e9ddf49` |
| ingest | 3 | 3 | 0 | — |
| constants | 3 | 3 | 0 | — |
| **total** | **153** | **145** | **+8** | `+6 +4 +1 −3 = +8`, printed, not asserted |

**The lane's 145 is fully explained zone by zone**, which is a stronger reconciliation than the
arithmetic one at §1.2: the two figures differ by four named commits and nothing else.

### 1.5 The D/L/C matrix — axes declared, denominated in B0, in the B10-21 owned/total shape

**The axes** (§Carry Arm A declares them; restated here at the scoring site):
**D** = the module's *design* — API shape, defaults, what it refuses.
**L** = its *library-contract truth* — docblocks, types, published surface.
**C** = its *code* — structure, coupling, zone hygiene.

**The coverage metric, and its counting rule stated AT the enumeration.** B10-21's shape is
`owned + unowned = total`. **OWNED here = a B0 module named by at least one KF.W5 disposition that
opens or reads it by path** — the §Bounds access-column rows (`modify` · `modify-carve` · `read`) ∪
the arm-D rename subjects ∪ the god-module roster taken disposition-first ∪ the presets regression
floor ∪ `ingest/cssom.ts`. Created `test/**` specs are **not B0 modules** and are excluded from the
ratio by construction. Every one of the 53 owned paths was existence-checked at B0:
⟨`git cat-file -e 7d958f21:<path>`⟩ → **53 OK / 0 MISS**, and ⟨`comm -23 owned b0`⟩ → **∅**.

> **53 owned + 100 unowned = 153.** ⟨**Non-conflation lock, live**: B18's `leafParity` asserts
> `39 owned + 114 unowned = 153` **LEAVES**. The denominators coincide; the subjects do not. Mine is
> a **module** count over B0, B18's is a **leaf** count over a harness. The agreement is arithmetic
> noise and **must never be cited as corroboration** — the lock matters more now that the two
> numerals finally agree, not less.⟩

**The matrix.** `g` = god modules (≥437 L) · `s` = parent-token stutters · `a` = LIGHT allowlist
entries · `reach` = modules reachable in the import graph from the three published entries.

| zone | owned/total (B0) | **D** — behaviour gates landing here | **L** — reach · named contract-truth defects | **C** — `g` · `s` · `a` |
|---|---|---|---|---|
| **compile** | 7/29 · 24.1% | 2 — G-CSSIDENT · G-OPTSET | 29/29 · **1**: `cssIdent` reaches no published entry (3 entries × 0 hits) | 2 · 3 · 0 |
| **physics** | 9/22 · 40.9% | 1 — G-RAF | 22/22 · 0 | 1 · 1 · **13** |
| **orchestration** | 7/20 · 35.0% | 4 — G-ROLE · G-REFUSE · G-REVERT · G-STAGGER-DOC | **19/20** · **3**: the `applyA11y` docblock · the ResizeObserver *"keep the last good map"* comment · the `stagger.ts:15-22` example against `AnimationGroupInput` | 1 · 4 · **10** |
| **engine** | 9/17 · 52.9% | 5 — G-PRM-FLIP · G-DELAY · G-FROMSTRING · G-OPTSET · G-RENDERER | 17/17 · **1**: `strategies.ts:66-75`'s live-WAAPI-PRM assertion, false at the bytes | 1 · 0 · 0 |
| **group** | 5/15 · 33.3% | 1 — G-STAGGER-DOC leg 2 | 15/15 · 0 | 1 · 1 · 0 |
| **internal** | 1/9 · 11.1% | 1 — G-PRM-FLIP (`reduced-motion.ts`) | 9/9 · 0 | 0 · 0 · 0 |
| **resolve** | 1/8 · 12.5% | 0 | 8/8 · 0 | 0 · 1 · 0 |
| **scroll** | 0/7 · 0.0% | 0 | 7/7 · 0 | 0 · 0 · 0 |
| **waapi** | 3/6 · 50.0% | 1 — G-PRM-FLIP (`delegation.ts`, the negative witness) | 6/6 · 0 | 0 · 0 · 0 |
| **svg** | 2/6 · 33.3% | 0 | 6/6 · 0 | 0 · 2 · 0 |
| **(root)** | 4/5 · 80.0% | 1 — G-CSSIDENT (the publication surface) | 5/5 · **1**: the publication decision itself — the surface promises three library names it does not reach | 0 · 0 · 1 |
| **presets** | 3/3 · 100.0% | 0 | 3/3 · 0 — docblock **CURED-AT-FRONTIER `7e9ddf49`**, carried as G-SHIM's floor | 1 · 0 · 0 |
| **ingest** | 1/3 · 33.3% | 0 — KF.W2's boundary, declared not taken | 3/3 · 0 | 1 · 0 · 0 |
| **constants** | 1/3 · 33.3% | 0 (a typed-contract carve, `:182` only, inside the option-setter family) | 3/3 · 0 | 0 · 0 · 0 |
| **TOTAL** | **53/153 · 34.6%** | **11 distinct gates · 16 incidences** | **151/153** · **6** | **8 · 12 · 24** |

**THE TOTAL ROW'S TWO COUNTING RULES, STATED so the column does not have to be re-derived (R5-11).**
The **D** column counts **gate×zone incidences** and sums to **16**; the total states **11**, the
number of **distinct** behaviour gates, because five gates land in two or three zones each
(G-STAGGER-DOC ×2 · G-PRM-FLIP ×3 · G-CSSIDENT ×2 · G-OPTSET ×2 = 16 − 11 = 5 extra incidences).
The **L** defect column sums to **6** exactly (compile 1 · orchestration 3 · engine 1 · (root) 1).
The **C** triples sum to **8 · 12 · 24** exactly. **G-XSS, G-BASIS, G-ID, G-TAX, G-SCOPE, G-DEPCRUISE,
G-RING, G-SHIM and G-STRUCT are NOT in the D column** — the first is demo-side (outside B0), the next
four are docs-side, and the last four are arm D's cross-zone structural gates, scored in **C** rather
than **D**. 11 + 1 + 4 + 4 = **20**, the wave's whole gate roster, partitioned without remainder.

**Every denominator above carries its probe** (G-BASIS's own law, applied to this wave's own matrix):

- **`g` = 8**, ⟨`for f in $(git ls-tree -r 7d958f21 --name-only -- src | grep '\.ts$'); do n=$(git show 7d958f21:$f | wc -l); [ "$n" -ge 437 ] && echo "$n $f"; done`⟩ → `spring/progress.ts` 484 · `engine/animation.ts` 478 · `drag/draggable.ts` 470 · `ingest/cssom.ts` 466 · `compile/frame/compiler.ts` 461 · `compile/emit/entry.ts` 459 · `presets/classic-data.ts` 458 · `group/group.ts` 437. **No new entrant** at the new ref.
- **`s` = 12**, by the §Carry D-6 predicate — **see the FINDING at §1.6, the predicate as worded reads 10.**
- **`a` = 24**, ⟨`git show 7d958f21:.dependency-cruiser.cjs | sed -n '62,88p'`⟩ → 24 entries; existence assertion ⟨`git cat-file -e 7d958f21:src/animation/<entry>.ts` ×24⟩ → **24 OK / 0 DEAD**, confirming the record's FINDING 1 (D-1 CURED-AT-FRONTIER `fb509edd`; the live half is the assertion, which is `.e`'s to install).
- **`reach` = 151/153**, a transitive closure over the depcruise graph from `index.ts` ∪ `public.ts` ∪ `load-engine.ts`. The **two unreachable modules are `orchestration/index.ts` and `physics/index.ts`** — two zone barrels the root re-exports bypass by reaching their members directly.

> **THE L-AXIS'S OWN WARNING, stated because the matrix would otherwise flatter the contract.**
> `reach` is a **module-graph** metric and it reads **98.7% GREEN**. The library's actual contract
> defect is **symbol-level**: `cssIdent` is declared in `compile/emit/backward/walk.ts`, a module that
> is 100% reachable, and is re-exported twice (`backward/index.ts:29` → `emit/index.ts:53`) — and
> ⟨`git grep -c 'cssIdent' 7d958f21 -- src/animation/index.ts src/animation/public.ts src/animation/load-engine.ts`⟩
> → **0 / 0 / 0**. A module-reach metric scores that zone perfect. **That is the G-L7d class one level
> up — a census that measures the wrong unit is a green gate measuring nothing** — and it is recorded
> here so no later seat cites 151/153 as evidence that the published surface is honest. **The L axis
> is scored at the SYMBOL, and G-CSSIDENT is its instrument.**

**What the matrix says, in one line each.** **Engine** is the wave's densest surface (5 of 11
behaviour gates, 52.9% owned) and carries the one *false* docblock. **Orchestration** is the widest
(4 gates, 4 of the 12 stutters, 3 of the 6 contract-truth defects) and is the only zone whose barrel
is unreachable from a published entry. **Compile** is the deepest unowned surface (24.1%) while
holding the publication BLOCKER. **Scroll is 0/7 — the one zone this wave does not touch at all**,
recorded as a fact, not as a gap: no registry row routes there.

### 1.6 FINDING — the D-6 stutter predicate, **as worded**, returns 10, not 12

§Carry D-6 words the predicate *"a basename token equal to its parent directory token"* and enumerates
**12**. Taken literally over hyphen-delimited tokens:

⟨`git ls-tree -r 7d958f21 --name-only -- src | grep '\.ts$' | awk -F/ '{f=$NF; sub(/\.ts$/,"",f); p=$(NF-1); n=split(f,T,"-"); for(i=1;i<=n;i++) if (T[i]==p) {print $0; break}}' | wc -l`⟩ → **10**.

The two it drops are **`orchestration/split-text/split-text.ts`** and
**`orchestration/view-transition/view-transition.ts`** — precisely because their *parent dir* is
itself hyphenated (`split-text`, `view-transition`), so no single hyphen-token of the basename equals
it. The predicate needs its **eponymous whole-name arm** as well:

⟨`… awk -F/ '{f=$NF; sub(/\.ts$/,"",f); p=$(NF-1); if (f==p) {print; next} n=split(f,T,"-"); for(i=1;i<=n;i++) if (T[i]==p) {print; break}}' | sort`⟩ → **12**, both runs, and the set is
**identical to D-6's enumeration**, member for member.

**Disposition: the SET is right and the WORDING is under-specified.** Recorded as a dated
addendum-beside (E-3 — the spec is not patched), and **routed to `.e`**, which executes the rename
programme against this predicate under S-7 and would, on a literal reading, drop the two subjects the
spec's own S-7 singles out as most hazardous (`split-text.ts` is *"last of all"*). The correct
predicate, stated once so `.e` need not re-derive it: **basename == parent, OR some hyphen-token of
basename == parent.**

---

## §2 · G-ID — every carried id, record-qualified

### 2.1 The gate's own probe, run

⟨`grep -cE 'KF-ES-[0-9]+|(^|[^-])\bL-2\b' KF-W5.md`⟩ → **22** (run 1) · **22** (run 2) — the record's
banked open-time figure, reproduced.
⟨same, `-n`⟩ → lines **3 · 30 · 32 · 260 · 276 · 297 · 328 · 329 · 330 · 358 · 365 · 374 · 386 · 412 ·
417 · 442 · 456 · 458 · 469 · 478 · 481 · 484**.

**COUNTING RULE, STATED AT THE ENUMERATION (R5-11).** `grep -c` counts **LINES**. The same file
carries **58 OCCURRENCES** — ⟨`grep -oE 'KF-ES-[0-9]+' KF-W5.md | sort | uniq -c`⟩ → `KF-ES-1` ×4 ·
`KF-ES-8` ×7 · `KF-ES-20` ×11 · `KF-ES-34` ×4 · `KF-ES-36` ×4 · `KF-ES-43` ×4 = **34**, plus
⟨`grep -oE '(^|[^-])\bL-2\b' KF-W5.md | wc -l`⟩ → **24**. **34 + 24 = 58 occurrences on 22 lines.**
The gate's *probe* is stated at the line; its *pass condition* (*"Fails on any bare `KF-ES-n` or bare
`L-2`"*) is stated at the occurrence. **The two units disagree, and this unit reports BOTH**, because
choosing one silently is how this class has survived three passes.

### 2.2 The two declared exception cells, verified at their sites

| # | exception, as the gate declares it | line | verdict |
|---|---|--:|---|
| **E1** | *"this gate's own command/witness cells"* | **417** | the §Gates **G-ID** row — command cell `grep -nE 'KF-ES-[0-9]+\|(^\|[^-])\bL-2\b'`, witness cell quoting the colliding range `KF-ES-1..KF-ES-34`. **In-exception** |
| **E2** | *"RD-1's statement of the collision"* | **456** | §Sequencing **RD-1 · ID COLLISION**, quoting `KF-ES-1..KF-ES-34`, `KF-ES-8`, `KF-ES-20`, `L-2`. **In-exception** |

### 2.3 The audit, at the LINE unit (the gate's own probe unit)

Twenty lines audited beside the two exception cells. **Every one carries, in its own text, a record
naming for every distinct id it mentions:**

| line | ids | qualification at the line |
|--:|---|---|
| 3 | `L-2` | *"the depcruise pair **lane-library `L-1`/`L-2`**"* |
| 30 | `L-2` | *"**kf-SquareScene** L-2"* |
| 32 · 276 · 297 · 328 · 442 | `KF-ES-20` | *"**kf-EasingSidebar** KF-ES-20"* at each |
| 260 | `L-2` | *"**lane-library** L-2's whole subject"* |
| 329 | `KF-ES-20` ×2 | *"**kf-EasingSidebar** KF-ES-20 … collides with **kf-EasingScene's** KF-ES-20"* — both sides named |
| 330 | `KF-ES-1` `KF-ES-34` `KF-ES-8` `KF-ES-20` `L-2` ×2 | the Arm A G-ID **witness cell**: the colliding range plus per-id `(Sidebar)`/`(Scene)` attributions, plus `lane-library.md §3.5` / `kf-SquareScene` |
| 358 | `KF-ES-36` | *"**kf-EasingScene** KF-ES-36"* |
| 365 | `L-2` | *"C-1 · **kf-SquareScene** L-2"* |
| 374 | `L-2` ×2 | *"D-2 · **lane-library** `L-2` ⟨… — NOT **kf-SquareScene's** `L-2`⟩"* |
| 386 | `L-2` ×5, `KF-ES-43` | *"**lane-library** `L-2`"* and *"`KF-ES-43` → **kf-EasingScene**"* present on the line — **but see §2.4** |
| 412 | `L-2` ×3 | *"⟨**lane-library's** `L-2`, not **kf-SquareScene's**⟩"* — **but see §2.4** |
| 458 | `KF-ES-8` ×2 | *"**kf-EasingSidebar** KF-ES-8"* ×2 |
| 469 | `KF-ES-36` | *"**kf-EasingScene** KF-ES-36"* |
| 478 | `KF-ES-43` ×2 | *"**kf-EasingScene** KF-ES-43"* + ⟨record-qualified this round⟩ |
| 481 | `KF-ES-8` | *"banked **kf-EasingSidebar** KF-ES-8"* |
| 484 | `KF-ES-36` | *"⟨**kf-EasingScene** — NOT **kf-EasingSidebar's** namespace; G-ID⟩"* |

> **LINE-UNIT VERDICT: 22 / 22 qualified. G-ID GREEN at the unit its own probe counts.**

### 2.4 The audit, at the OCCURRENCE unit — and two residues the line unit cannot see

Mechanical probe, stated so it re-runs: an occurrence is **QUALIFIED-AT-SITE** iff one of
`lane-library` · `kf-SquareScene` · `kf-EasingSidebar` · `kf-EasingScene` appears within **±80
characters on the same line**; occurrences inside E1/E2 are in-exception.

⟨run⟩ → **58 occurrences · 51 qualified-at-site-or-in-exception · 7 residue.** Residue adjudicated by
hand, one line each:

| # | line | text at the site | verdict |
|---|--:|---|---|
| 1 | 330 | ``KF-ES-8` = the uppercased mono sentence **(Sidebar)** vs pause-on-scrub freezes the ball **(Scene)**` | **QUALIFIED** — short-form attribution. The probe's token set is under-specified, not the site |
| 2 | 330 | ``KF-ES-20` = the dead `.labeled-field-label` census role **(Sidebar)** vs the four-not-five dead-export fold **(Scene)**` | **QUALIFIED** — same |
| 3 | 330 | *"falsified twice — at pass 2 (eight bare ids) and again at pass 3 (**one residual bare `L-2`** …)"* | **MENTION-OF-THE-DEFECT** — a repair note naming the class it cured |
| 4 | **386** | *"(G-SHIM ← `7e9ddf49`; G-DEPCRUISE's **L-2** leg ← the honest comment; …)"* | **BARE AT SITE** |
| 5 | 386 | *"this paragraph's *"G-DEPCRUISE's **L-2** leg ← the honest comment"* …"* | **MENTION** (quoting the defect) |
| 6 | 386 | *"… was the one surviving **bare `L-2`** in the file …"* | **MENTION** |
| 7 | **412** | *"— discharged this round for L-1 (still RED) and for **L-2** (cured, `81a56990`)"* | **BARE AT SITE** |

### 2.5 FINDING — the round-3 cure was written BESIDE the defect, not AT it, and the line-unit probe has hidden that for three passes

Residue 4 is the sharp one. The `⟨ID QUALIFIED, repair round 3 (check D-8)⟩` note **on that same
line 386** says, in terms: *"this paragraph's 'G-DEPCRUISE's **L-2** leg ← the honest comment' was the
one surviving **bare `L-2`** in the file … **it is now lane-library `L-2`**."*

**At the bytes it is not.** ⟨`python3` scan of line 386's `L-2` occurrences, printed at §2.4⟩ shows
occurrence 1 still reading `G-DEPCRUISE's L-2 leg ← the honest comment` — unqualified. The round-3
repair **added the qualification in a note beside the sentence instead of qualifying the sentence**,
and because the note sits on the **same grep line**, `grep -cE` has read that line as carrying its
record ever since. Residue 7 is the same shape in miniature: G-DEPCRUISE's falsifier cell qualifies
`L-2` in its first clause and drops the qualification three clauses later, on one line.

**This is the fourth generation of the class the gate's own cell narrates** — *"Third generation of the
same class, third generation of a perfect cure of the enumerated set and no closure of the class"* —
and its mechanism is now named: **the gate's probe and the gate's pass condition are stated at
different units**, so a cure that satisfies the line satisfies the probe while leaving the occurrence
bare.

**Disposition — no spec byte is written here.** The spec is IMMUTABLE under E-3 and outside this
unit's writable set. Recorded as a **dated addendum-beside** and **routed to KF.W10** as a
doc-authority addendum, which is the destination §0 R-1.4's own ruling names (*"KF.W6 for
prose-with-code, **KF.W10** taking any doc-authority addenda"*). The cure is two words at two sites,
and the **durable** cure is one sentence in the gate's cell: *state the probe at the occurrence*
(`grep -oE … | …`) so the two units cannot diverge again.

### 2.6 FINDING — a THIRD exception class exists de facto and is undeclared

Residues 3, 5 and 6 are **mentions of the defect** — a repair note or a gate cell quoting the bare
token in order to say it was bare. The gate's own declared rationale already blesses this shape
(*"a gate must be able to NAME the pattern it forbids, and a registry-defect report must be able to
quote the colliding range"*), but the **exception set is drawn at two cells** (E1, E2) and these three
sit outside both — at line 330's *"lands as"* column and inside the §Gates BORN-STATE AUDIT paragraph.

**Verdict: QUALIFIED-BY-MENTION**, booked as a named class rather than waived in silence. The honest
cure is to **declare the third exception cell** (*a dated repair note quoting the defect it cured*),
not to widen the gate's blessing informally. Also routed to KF.W10 with §2.5.

### 2.7 G-ID verdict

> **GREEN at the LINE unit (22/22) — the unit the gate's own probe counts.**
> **RED by exactly TWO at the OCCURRENCE unit** (line 386 occ-1 · line 412 occ-3), with **three
> further occurrences qualified-by-mention under an undeclared exception class.**
> Both readings published; neither buried. **No id is ambiguous in substance anywhere in the file** —
> every `KF-ES-n` resolves to a record and both `L-2` senses are distinguished at every site that
> carries an assertion. The residue is a **citation-form** defect, not a routing defect, and no row,
> id, severity or destination moves because of it.

### 2.8 RD-1, re-verified from this end

⟨`grep -c 'KF-ES-' registry/adjudicated/kf-EasingSidebar.md`⟩ and the sibling both mint the
`KF-ES-1..KF-ES-34` namespace independently; `KF-ES-8` and `KF-ES-20` resolve to different defects in
each, and `L-2` denotes both `lane-library.md` §3.5's no-cycle baseline and kf-SquareScene's
engine-seam BLOCKER — **both live in this wave** (D-2 and C-1 respectively, at `:374` and `:365`).
**RD-1 stands as written; this seat adds nothing to it and subtracts nothing from it.** Relayed to
SS-1/SS-2 with RD-2 at §3.

---

## §3 · G-TAX — the RD-2 relay row (**the relay leg is this wave's WHOLE act at this end**)

**G-TAX PERFORMS NO REGISTRY EDIT.** All 58 `registry/adjudicated/kf-*.md` are read-only witnesses on
this wave's own §Bounds list; ⟨`ls registry/adjudicated/kf-*.md | wc -l`⟩ → **58**, and **zero were
written by this unit**.

### 3.1 The born state, re-measured

⟨`grep -rn 'KF.W5-PARTIALS' docs/tranches/V/megatranche/registry/adjudicated/`⟩ → **3 lines, both runs**:

| record | line | what the line does |
|---|--:|---|
| `kf-AnimationControlsGroup.md` | **:17** | *"Wave targets are named from the census lane taxonomy (`lane-frontend.md` §10): … **KF.W5-PARTIALS (S-5/6/7)** …"* — **the mint** |
| `kf-DemoGlobalChrome.md` | **:17** | *"… (`lane-frontend.md` §10, **as fixed in the kf-AnimationControlsGroup record**) …"* — inherits the mint |
| `kf-ControlsPaneWrapper.md` | **:6** | *"… as instantiated by the parent record (`lane-frontend.md` §10) …"* — inherits the mint |

⟨`grep -c 'SUPERSEDED\|superseded' <each>`⟩ → **0 · 1 · 0**. The single hit is
`kf-DemoGlobalChrome.md:154`, whose subject is *"THE BYTE-OFFSET WITNESS IS SUPERSEDED — this record
cites `dist/gh-pages/assets/index-CL_QYCiO.css` by name, and that coordinate is dead"* — **a different
subject entirely**, read at the bytes, not inferred from the grep.
**Row hits: 0** — the three hits are all header prose; no table row anywhere in the 58 routes to the
older name. **Benign today, a live mis-routing hazard, RED.** Reproduces the record's baseline exactly.

### 3.2 THE RELAY ROW — RD-2, addressed to SS-1/SS-2

> **RD-2 · TAXONOMY COLLISION.** Three adjudicated records define the wave name **`KF.W5-PARTIALS
> (S-5/6/7)`** from the **SUPERSEDED** authority **`formation/keyframes/lane-frontend.md` §10**:
> **`kf-AnimationControlsGroup.md:17`** (the mint) · **`kf-DemoGlobalChrome.md:17`** ·
> **`kf-ControlsPaneWrapper.md:6`**. The rest of the corpus routes to **`KF.W5 · D/L/C Tri-Fold
> Library Audit`** from the **BINDING** authority **`formation/keyframes/CENSUS-2026-08-03.md`
> §(a):177-206**.
>
> **The requested act**: a dated **E-3 addendum under each record's original id**, annotating the
> header **SUPERSEDED** and naming the binding taxonomy. **An addendum, never an edit; never authored
> from this wave.**

**The mechanism, stated by measurement rather than asserted — this is what the relay adds.**

⟨`grep -n '^## 10' lane-frontend.md`⟩ → **`:610 ## 10. Recommended wave order`**. Its item **5**
reads, verbatim: *"**S-6, S-7, S-5** — low-risk partials (skeleton plate, button shell, typewriter),
each independently landable."*

⟨`grep -n 'KF.W5' CENSUS-2026-08-03.md`⟩ → **`:194 6. **KF.W5 · D/L/C Tri-Fold Library Audit** —
per-component D/L/C over the 14 zones / 153+ …"*.

> **The superseded authority indexes waves by POSITION in a *recommended order*; the binding census
> names waves by SUBJECT.** Position 5 of a recommendation became "KF.W5", and its cargo — the three
> low-risk partials — became "KF.W5-PARTIALS". Under the census, position 5's partials are **KF.W6's**
> and "KF.W5" means the **D/L/C Tri-Fold Library Audit**. The collision is not a typo; it is two
> naming schemes over one token, and the older one calls itself *Recommended* in its own heading.

**Independently reciprocated from the other end**, re-read at the bytes this seat:
⟨`sed -n '9,13p' carry/KF-W6-CARRY.md`⟩ → `:9` *"The `lane-frontend.md §10` seven-wave sketch … is
**SUPERSEDED** by `CENSUS-2026-08-03 §(a)`"* and `:13` *"**KF.W5-PARTIALS ⇒ THIS WAVE** (S-5 / S-6 /
S-7, each re-homed by its bank)."* **S-5/S-6/S-7 are KF.W6's and never were this wave's.**

**Third-party corroboration, from a seat that inherited nothing from this wave**:
⟨`grep -n 'lane-frontend' conformance/PASS-8/CHECK.md`⟩ → `:65` — the whole-corpus pass-8 census
re-homes five bare-token candidates (`L-17` · `N-1` · `N-3` · `SUP-4` · `L-8`) as *"bare-token
candidates from records using the **superseded `lane-frontend.md §10` seven-wave numbering**"*, by the
same binding read at `KF-W6-CARRY.md:9`. **The mis-routing class is live beyond these three records**,
which is the reason the relay is worth its own row.

### 3.3 G-TAX verdict

> **Relay leg: GREEN.** The row is present, names all three records with their line coordinates,
> names the superseded authority and the binding one, and states the mechanism with its probes.
> **Annotation leg: RED and unobservable, by design** — the annotations are the SS-1/SS-2 authoring
> block's act and land as dated E-3 addenda under original ids. This unit wrote **no**
> `registry/adjudicated/` byte, which is the gate's own falsifier honoured rather than narrowly
> avoided.

---

## §4 · G-SCOPE — enumerate, then compare

### 4.1 The enumeration, arm by arm, each sub-range measured independently

⟨`awk 'NR>=309 && NR<=379 && /^\| \*\*/' KF-W5.md | wc -l`⟩ → **46** (both runs).

| arm | line range | rows | spec's claim |
|---|---|--:|--:|
| Arm 0 · THE FRONT-LOAD | 309–320 | **7** | 7 |
| Arm A · THE CENSUS | 321–333 | **8** | 8 |
| Arm B · LIBRARY RULINGS AND CURES | 334–360 | **22** | 22 |
| Arm C · THE ENGINE SEAM | 361–368 | **3** | 3 |
| Arm D · STRUCTURE | 369–379 | **6** | 6 |
| **§Carry total** | | **46** | 46 |

**Counting rule at the enumeration**: a §Carry data row is a line beginning `| **` inside the arm's own
range; the header and separator rows do not match. Each arm was counted over its own range, so the
sum is five independent measurements, not one measurement partitioned after the fact.

**§Excluded.** ⟨`awk 'NR>=463 && NR<=530 && /^[0-9]+\. \*\*/' KF-W5.md`⟩ → **6 numbered items**;
⟨`awk 'NR>=463 && NR<=530 && /^   - \*\*/' KF-W5.md | wc -l`⟩ → **7 sub-bullets**, all under item 1
(the demo prose sweep): `KF-SS-6` · `KF-SS-31` · `KF-SS-38` · `KF-SS-4` · `KF-ET-33` · `KF-ET-35` ·
`KF-ES-36`. **7 (item 1) + 5 (items 2–6) = 12 re-homes**, each with a named destination —
**KF.W6 ×11 · KF.W7 ×1** (item 5, KAD-13, whole).

> **46 + 12 = 58 dispositions.** Enumerated, with probes, at both the live bytes and the pass-8
> sealed bytes (§0.2). Nothing asserted.

### 4.2 The comparison against the freshest census — the act the spec reserves to `.b`

**Freshest whole-corpus census**: `conformance/PASS-8/CHECK.md` + `VERDICT.md` (2026-08-29) —
**CONFORMANT**, *"Census **CLEAN — 0 escapes**"* over **2,633 rows · 58/58 records parsed · 20
residuals adjudicated**; 733 routed rows corpus-wide. `PASS-7/SEAL.md` is the hash authority it clears
against. **No PASS-9 exists** (⟨`ls -d conformance/PASS-*/`⟩ → PASS-1…PASS-8), so the citation needs no
re-pointing at this seat.

**Freshest KF.W5-specific census**: `conformance/PASS-6/KF-W5-CHECK.md` (2026-08-29) —
**routedTotal 43 · bookedCount 43 · escapedCount 0**, Axis 1 CLEAN.

**Re-verified from the bytes at this seat, inheriting neither figure.** The 43 routed ids were lifted
from PASS-6 §1.2's by-record table and each was counted in the spec:
⟨`for id in …; do grep -o -- "$id" KF-W5.md | wc -l; done`⟩ →

```
KF-AT-8 6 · KF-AT-9 3 · KF-AT-12 7 · KF-AT-23 2 · KF-SKEL-9 4 · KF-SKEL-16 6 · KF-SKEL-20 2
KF-CB-30 2 · KF-CB-35 2 · KF-CB-36 1 · KF-ES-36 4 · KF-ES-20 11 · KF-ET-1 3 · KF-ET-27 6
KF-ET-32 6 · KF-ET-33 3 · KF-ET-35 5 · KF-EST-5 4 · KF-EST-17 2 · P-8 9 · KF-KC-27 1
KAD-1 36 · KAD-2 4 · KAD-3 9 · KAD-5 3 · KAD-13 4 · KAD-14 16 · KAD-17 5 · KF-KE-10 5
N-8 3 · C-8 21 · SPF-20 5 · KF-SS-4 4 · KF-SS-6 4 · KF-SS-31 11 · KF-SS-38 3
KF-TFP-21 4 · KF-TFP-27 4 · KF-TD-1 2 · KF-TD-5 1 · KF-TD-8 1 · S★-2 1
```

**Every one returns ≥ 1. Zero escaped.** PASS-6's Axis-1 finding reproduces at an independent seat.

**One counting rule the comparison forced, stated because it is RD-1's own point one level up**: the
loop above has **42 rows, not 43**. The routed ids are **record-qualified** — kf-KeyframesStringControls
mints `C-8` and kf-TimelineHoverPreview mints `C-8`, two routed ids sharing one token (the second
folds ≡ `KF-SKEL-16`). So **43 routed ids = 42 distinct id TOKENS**. A byte-level booking check can
only ever measure tokens; the 43 lives at the record. **That gap is exactly RD-1's defect class, and
it is now measured rather than described.**

### 4.3 G-SCOPE verdict

> **GREEN on the arithmetic and GREEN on the act.** 46 + 12 = 58, enumerated with probes and
> reproducing at the sealed bytes; compared against the freshest census (PASS-8 whole-corpus, 0
> escapes) and against the freshest wave census (PASS-6, 43/43/0), the latter re-derived at this seat
> from the spec's own bytes. **No silent drop** — the gate's named defect class — and no row appears
> in neither table. The comparison is published, not asserted; if a PASS-9 supersedes, the citation
> re-points and this reading becomes dated history.

---

## §5 · The two census-truth arms, SCORED (findings only — the bytes are KF.W6's)

§0 R-1.3 carries these as **arm A inputs**: the *findings* score in the tri-fold's census, the
demo-side *bytes* ride KF.W6's sweep, declared per row. **One motion, two rows** — both are demo
authorities naming a class or a file that does not exist.

### 5.1 KF-ET-27 ⟨kf-EasingTarget, MINOR⟩ — CONFIRMED at the frontier, both limbs

**Limb 1 — `BALL_SIZE` encoded three times across two languages.**
⟨`git grep -n 'BALL_SIZE\|ball-size' 7d958f21 -- demo src`⟩:

| site | encoding |
|---|---|
| `demo/scenes/easing/EasingTarget.css:163` | `--ball-size: 14px;` — **CSS** |
| `demo/scenes/easing/EasingTarget.vue:235` | `const BALL_SIZE = 14;` — **TypeScript** |
| `demo/scenes/easing/EasingTarget.vue:257` | `const maxX = railWidth.value - BALL_SIZE;` — the rail computed for 14 |
| `demo/styles/design-idioms.css:180-182` | `width/height/margin-top: var(--ball-size, **36px**)` — the **shared fallback**, a third encoding of the same geometry at a different value |

**Limb 2 — the FALSE CONTRACT, and it names this exact file.** `design-idioms.css:162-163` reads
*"--ball-size … **is the seam EasingTarget reads via getComputedStyle**"*.
⟨`git grep -c 'getComputedStyle' 7d958f21 -- demo/scenes/easing/`⟩ → **no output: 0 hits**.
The nine live `getComputedStyle` sites in the demo are in `instrument/timeline/utils/snapshotCapture.ts`
(×3), `scenes/amiga/utils.ts`, `scenes/spring/SpringHeatmap.vue` (×2), `scenes/square/useSquareDemo.ts`,
`scenes/square/useSquareTumble.ts` — **none under `scenes/easing/`**.

> **SCORE — the D/L/C reading.** **L = FALSE**: an idiom sheet asserts a seam, by name, against a
> component that never opens it; the assertion is the contract and it is untrue. **D = SPLIT**: one
> geometry, three declarations, two languages, and a **shared fallback (36px) 2.6× the rail's own
> value (14)** — any consumer that inherits the default renders against a rail computed for a
> different ball. **C = benign**: no coupling defect, no cycle; the cost is the duplication itself.
> **The census-truth verdict: the sheet is an authority that documents a seam it does not have.**
> **Byte cure: NO-WAVE-OWNER for the 14px homing, and the sheet correction RIDES KF.W6's sweep** —
> declared here, never re-booked. **No byte written by this unit.**

### 5.2 kf-EasingSidebar `KF-ES-20` ⟨MINOR; G-ID-qualified at every citation⟩ — CONFIRMED, and it is the G-L7d class

**The census role.** ⟨`git show 7d958f21:demo/styles/font-roles.json | sed -n '38,48p'`⟩ →

```json
{ "role": "control-label",
  "selector": ".labeled-field-label",
  "expect": { "voice": "body", "weight": 500 },
  "note": "… the glass-ui labeled-field display bind is re-voiced in @layer demo-typography" }
```

**The demo override that depends on it.** ⟨`git show 7d958f21:demo/styles/style.css | sed -n
'272,284p'`⟩ → *"/* **glass-ui binds `.labeled-field-label`** to font-family:var(--font-display) at the
body rung … */"* followed by `.labeled-field-label { font-family: var(--font-text); font-weight: 500; }`.

**The producer, read-only, at the installed version.**
⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → **7.0.0**.
⟨`grep -rl 'labeled-field-label' node_modules/@mkbabb/glass-ui/dist/ | wc -l`⟩ → **0**.
⟨`grep -rl 'glass-label' node_modules/@mkbabb/glass-ui/dist/`⟩ → **2** —
`dist/label-DJA3eNLS.js` · `dist/glass-ui.css`.

> **SCORE.** **L = FALSE, twice over**: the JSON role's `note` and the CSS comment both assert a
> glass-ui bind on `.labeled-field-label`, and the installed producer emits that class in **zero**
> files. **D = VACUOUS**: the `control-label` role matches **zero elements**, so the font census
> passes it unconditionally — *"a font census that matches zero elements is a green gate measuring
> nothing"*, the **G-L7d class**, and it is the same failure mode this unit found one level up at the
> L axis (§1.5's reach-vs-symbol warning). **C = dead**: the `@layer demo-typography` override is
> unreachable CSS. **The cure is at the CENSUS, not at the component** — the component *"merely
> instantiates it"* — a one-line role re-point `.labeled-field-label` → `.glass-label`, **riding
> KF.W6's demo sweep**, declared here so the identity is never re-booked.
> **SS-6 posture honoured**: this is a **demo-side census defect naming a producer class**, not a
> producer defect; nothing here becomes a demo-side hack and **not one glass-ui byte was written or
> proposed**. glass-ui was read only, at `node_modules/`, never modified.

### 5.3 The two rows, one motion

Both are **authorities that name something the tree does not contain** — a seam (`getComputedStyle`
in `scenes/easing/`) and a class (`.labeled-field-label` in glass 7.0.0 dist). That is the census-truth
arm's whole subject, and it is why they score together. **Both findings are scored here; both byte
cures are KF.W6's, declared with their destination.**

---

## §6 · Residuals, relays and addenda-beside

1. **`.e` consumes §1.6** — the D-6 stutter predicate needs its eponymous whole-name arm or the rename
   programme drops `split-text/split-text.ts` and `view-transition/view-transition.ts`, the two S-7
   singles out as most hazardous. The **SET (12) is unchanged**; only the wording is under-specified.
2. **KF.W10 receives §2.5 and §2.6** — two G-ID citation-form residues (line 386 occ-1, line 412 occ-3)
   and one undeclared exception class (mention-of-the-defect), as doc-authority addenda under §0 R-1.4's
   own ruling. **No spec byte written here** (E-3).
3. **SS-1/SS-2 receive RD-1 (§2.8) and RD-2 (§3.2)** — the id collision and the taxonomy collision, the
   latter now carrying its measured mechanism (position-indexed recommendation vs subject-named census)
   and third-party corroboration from PASS-8:65. **No registry byte written** (G-TAX's falsifier).
4. **`FOLD-FORWARD §C`'s attribution of "159 modules" to `proof:structure` is FALSE** (§1.3(e)) —
   recorded as a dated addendum-beside; the figure is depcruise's and derives from B0 as 153 + 6.
5. **The pass-8 seal and the live spec differ by exactly the two X-union S-5 lines** (§0.2), and every
   figure this unit publishes is invariant across that delta, measured at both.
6. **E13** — the wave record's open-time four-path sweep stands. This unit minted no mail, consumed no
   routed letter, and leaves **0 UNREAD in its scope**.
7. **No escalation.** Every anchor resolved at the true bytes and every specified act was reachable as
   specified.

---

## §7 · Double-run block (WRITE-THEN-MEASURE)

Every published count was re-run a second time at this seat; both runs agree:

**B0** 153 / 153 · **`.d.ts`** 0 / 0 · **139 at `8281638c`** 139 / 139 · **`find src` today** 153 / 153 ·
**`git status -- src`** 0 rows / 0 rows · **depcruise** `✔ 0 violations, 159 modules, 687 deps` /
same · **depcruise src-partition** 153 in-src + 6 external / same, **set-equality against `git ls-tree`
verified in both** · **`proof:structure`** `PASS: scope=src clean (0 violations across R1–R6)` / same ·
**zones** 14 / 14 · **owned** 53 / 53 · **god modules** 8 / 8 · **stutters (corrected predicate)**
12 / 12 · **stutters (as-worded predicate)** 10 / 10 · **LIGHT allowlist** 24 entries, 24 OK, 0 DEAD /
same · **published named exports** 141 / 79 / 3 → union 178 (+1 namespace) / same · **G-ID lines**
22 / 22 · **G-ID occurrences** 58 (34 + 24) / 58 · **G-ID residue** 7 / 7 · **G-TAX** 3 headers ·
0 annotations · 0 row hits / same · **§Carry rows** 46 (7·8·22·3·6) / 46 · **§Excluded** 6 items ·
7 sub-bullets · 12 re-homes / same · **43 routed ids** 42 tokens, all ≥ 1, 0 escaped / same ·
**registry records** 58 / 58 · **glass-ui installed** 7.0.0, `labeled-field-label` 0 files,
`glass-label` 2 files / same.
