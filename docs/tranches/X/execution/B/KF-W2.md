SERVED MODEL: claude-opus-5[1m]

# KF.W2 — Parse Façade · EXECUTION RECORD (Track B, tranche X)

Spec of record: `docs/tranches/X/keyframes/waves/KF-W2.md` (IMMUTABLE, E-3).
Order of record: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2 (Track B) · §3.4 (locks) · §5 (seat law).
Rulings of record: `docs/tranches/X/COHESION.md` §0j.C (**KF-WRITE**, **KF-OP1/§B-12**), §0m.1/§0m.2.
Every count below was read from the settled bytes and **double-run**; every quotation is by command.

---

## Open

**Date**: 2026-09-17. **Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`.

### Ref of record (§Sequencing hard order 1 — "the wave's opening commit STATES its ref")

⟨`cd ../keyframes.js && git rev-parse HEAD` → `7d958f212fd519142ee9ed5e298d5afe456a7967`⟩
⟨`git rev-parse origin/master` → `7d958f212fd519142ee9ed5e298d5afe456a7967`⟩ — HEAD **≡** `origin/master`.
⟨`git merge-base --is-ancestor 81a56990736ced5b5edde0b84c527680ac7689b1 HEAD` → **YES**⟩ — the spec's
`origin/master 81a56990` **"or later"** clause is satisfied; the local `8281638c` the spec disqualifies
no longer exists as HEAD (KF.W0 §B-12 performed the reset; COHESION §0j.C **KF-OP1**).
⟨`git rev-parse --abbrev-ref HEAD` → `master`⟩ · ⟨`git status --porcelain`⟩ → 2 untracked rows only
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…`, `…-2026-07-27-…` — KF.W1's delivered mail,
the two §0m.0 survivors); **zero tracked modifications**. The substrate is clean for a cure wave.

**THE REF THIS WAVE'S OPENING COMMIT STATES: `7d958f212fd519142ee9ed5e298d5afe456a7967`.**

### Preconditions, verified at the bytes AND in the ledger

| # | precondition | verdict | receipt |
|---|---|---|---|
| L-1 | **KF.W0 CLOSED** (ledger "opens after" cell) | **MET** | `execution/LEDGER.md` Track-B row: `KF.W0 … **CLOSED 2026-09-17**` with 21 commits + close `3a7efda5` · `a8abec97` |
| L-2 | **KF.W0 §B-12 substrate settle performed** (OP-2) | **MET** | HEAD ≡ origin/master ≡ `7d958f21`, `81a56990` an ancestor; the hybrid tree is gone |
| L-3 | **OP-1 write authority NAMED** (the spec's own UNRESOLVED row) | **RULED — COHESION §0j.C `KF-WRITE`** | *"after §B-12, the sacred checkout on `master` (= `origin/master`) is the execution substrate for KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 · W10, every wave pushing `origin HEAD` at close … Under whose hand: the value.js orchestrator under the owner's 2026-09-17 grant"* |
| L-4 | **OP-4 — KF.W4's vue-tsc gate** (binds the DEMO-side arms only) | **MET for this wave's arms** | KF.W4 row = `CLOSED 2026-09-17 (honest-RED …)`; the G-KFW4-1 **act** landed at kf `7d958f21` (*"check types (SFC + tests + structure)"* on the gates job). Every `src/` arm here is covered by `check:lib` and proceeds independently (spec OP-4); **this wave opens NO demo call site** |
| L-5 | **OP-5 — no repin; measured against installed 4.0.0** | **MET** | ⟨`node -e "…@mkbabb/value.js/package.json').version"` → **`4.0.0`**⟩. `RC-P(V)` is KF.W3's predicate; this wave names it and never a literal |
| L-6 | **OP-6 — KF.W8 ordering for the serializer publication** | **MEASURED, and it is a finding for `.b`** | ledger `KF.W8 … planned`. RULINGS **R-16** declares *KF.W8 PRECEDES*; **at this clock W8 has NOT preceded**, so G-W2-8's count arm meets its own arming condition. The **act** stays W8's (§Sequencing cross-edge). See `.b`'s brief |
| L-7 | **OP-3 — R1 entry-point reconciliation** | **DISCHARGED AT AUTHORING** by the fold seat (spec OP-3); re-verified here only as *the pin still reads 4.0.0* | ibid. L-5 |

**No precondition fails. The wave opens.**

### E13 Step-0 — the four-path mail sweep (runbook §5.3)

Swept read-only at this seat's own clock, each newest-by-mtime named, and compared against **every row**
of `docs/tranches/V/coordination/INBOX.md` (167 lines; classification taken from each row's own cell,
never from a bare `grep -i unread` — X.P.W0 CHECK 1 **D-1**).

1. `docs/tranches/V/` + `docs/tranches/V/coordination/` — `INBOX.md`@2026-09-17 19:49 **self-excluded**
   (SELF-COUNT law); next newest `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 — **ours,
   outbound**, rowed at I-26's cure. **0 unrowed.**
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK confirmed the newest tranche dir**
   ⟨`ls -dt glass-ui/docs/tranches/*/ | head -3` → `BK/ BJ/ BI/`⟩. Newest three @2026-09-17 17:43:
   `…-constellation-o20-relay.md` = **I-33** · `…-bbnf-lang-9.0.0-addendum.md` = **I-34** ·
   `…-valuejs-o20-disposition.md` = **I-32**; `…-2026-08-29-valuejs-o20-ack.md` = **I-30**. **0 unrowed.**
3. `../keyframes.js/docs/tranches/V/coordination/` — newest @2026-09-17 19:08,
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` and the 07-17 batch: **all `VALUEJS-*` =
   letters WE sent**, none addressed to value.js. `vnext/` newest = skeptic rounds, not mail. **0 unrowed.**
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest @2026-08-03 15:01, all pre-rowed; the
   bounded **Q**-lane extension carries the only two value-addressed atlas letters,
   `ATLAS-TO-VALUE-2026-07-28-PASS2.md` = **I-31** and `…-2026-08-03-RULINGS.md` = **I-27**. **0 unrowed.**

**RESULT: 0 unrowed · 0 new `I-n` minted · INBOX.md not touched by this act.** The three live `UNREAD`
marks (**I-32 · I-33 · I-34**) are routed by their own Routing cells to **X-W0.j / the X formation mail
seat** — glass-producer rows, **READ-ONLY always**, rowed and routed away from Track B. **They are not
mail addressed to KF.W2's scope**, so E13's *"no wave closes with UNREAD mail in scope"* is not armed
here; no status cell is flipped by this seat (the durable mark is Track A/D's, exactly as the F.W1,
F.W5 and X-W2 seats each declined to flip it).

---

## Baseline — the born-RED gates, run READ-ONLY at `7d958f21` before any cure byte

Every command below was run twice with identical output. Nine clauses: **eight born-RED gates + one
declared MONITOR** (§Gates head, repair round 4 · KF-W2-CHECK D-14/D-15).

| gate | spec's stated born-RED reading | measured at `7d958f21` | verdict |
|---|---|---|---|
| **G-W2-1** | registry does not exist; floor **19** postures over the **58**-record corpus | `docs/tranches/X/keyframes/registries/` → **No such file or directory**; `ls …/registry/adjudicated/kf-*.md \| wc -l` → **58** | **RED-AS-EXPECTED** (0-of-19 enumerated) |
| **G-W2-2** | 21 parse-surface call sites over **10** parse-surface modules; **13** runtime importers / **25** runtime specifiers | command (ii) → **25 runtime specifiers over 13 modules**, of which **10** are the parse surface (adapter · easing/registry · emit/format/options · selector · value/compile · engine/css/metadata · engine/options · resolve/browser · scroll/grammar · validate), **2** emit-half (emit/css-text · frame/interp-slot), **1** stray (resolve/function `coerceToSyntax`). `git ls-tree … src/animation/compile/` → **no `parse-facade.ts`** | **RED-AS-EXPECTED** |
| **G-W2-2b** (MONITOR) | demo arm **TRUE at substrate**: 7 files / 6 runtime modules / 8 runtime specifiers | **7 files · 6 modules · 8 runtime specifiers**, module-for-module identical to §Carry F1 | **GREEN-BEFORE-CURE, DECLARED** — see §greenBeforeCure below |
| **G-W2-3** | all six Tier-C regexes present | **all six read verbatim** (below) | **RED-AS-EXPECTED** |
| **G-W2-4** | the unescaped identifier interpolation ships | `cssom.ts:214-216` verbatim; `:28-33` VJ-9 comment verbatim; file **466 L** | **RED-AS-EXPECTED** |
| **G-W2-5** | §F-2 reads *"no known consumer feeds the crash shape"*; no malformed fuzz class | `GATE-VERDICT.md:42` returns the phrase; **no `*ADDENDUM*` file** beside it; `grammar-fuzz.test.ts:8` docblock verbatim *"random VALID @keyframes fragments from MODEL grammars (not raw-string fuzz)"* | **RED-AS-EXPECTED** |
| **G-W2-6** | contract does not exist (0-of-1); two grammars in one component | `KeyframesEditor.vue:123` import / `:186` call `parseCssScalar`; `keyframeSelector.ts:14-15` `requireKeyframeSelector` → `parseKeyframeSelector`; freeze invariant **23 lines over 5 `src/` modules**, pinned at `value4-immutable-resolve.test.ts:43,:67,:84` (**three** assertions) | **RED-AS-EXPECTED** |
| **G-W2-7** | 14 `.css` + `manifest.json`; no fixture exercises a façade | **14 `.css` + `manifest.json`**, the named roster exact | **RED-AS-EXPECTED** |
| **G-W2-8** | 3 copies, 0 exported | copy 1 `format/format.ts:20` (consumers `:132/:201/:280/:313`) · copy 2 `emit/css-text.ts:59` (consumer `:76`) · copy 3 `demo/utils/keyframeSelector.ts:7`; `emit/index.ts` export list holds **`formatCSSKeyframeString` only**, no selector serializer | **RED-AS-EXPECTED** |

**8 born-RED reproduce RED · 1 declared MONITOR reproduces TRUE · 0 undeclared GREEN.**

### Pasted outputs (LAW D: transcribed, never summarised)

```
$ git rev-parse HEAD                                  → 7d958f212fd519142ee9ed5e298d5afe456a7967
$ git rev-parse origin/master                         → 7d958f212fd519142ee9ed5e298d5afe456a7967
$ git merge-base --is-ancestor 81a56990… HEAD          → YES
$ node -e "…@mkbabb/value.js/package.json').version"   → 4.0.0
```

```
$ git grep -n 'from "@mkbabb/value.js/css"' 7d958f21 -- src/ | wc -l   → 28 specifier lines
$ git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- src/ | wc -l   → 26 files
$ <G-W2-2 command (ii), per-file whole-import-block runtime read>      → 25 runtime specifiers over 13 modules
    adapter · easing/registry · emit/css-text · emit/format/options · frame/interp-slot · selector
    · value/compile · engine/css/metadata · engine/options · resolve/browser · resolve/function
    · scroll/grammar · validate
$ git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- demo/ | wc -l  → 7 files
$ <same per-file read over demo/>                                      → 8 runtime specifiers over 6 modules
    KeyframesEditor.vue · keyframes/utils/parseAnimationCSS.ts · scenes/square/useSquareDemo.ts
    · scenes/square/useSquareTumble.ts · utils/keyframeSelector.ts · utils/reference-data/animationDescriptions.ts
$ git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- test/ | wc -l  → 10 files   (censused-and-frozen, A-5)
$ git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- scripts/ | wc -l → 0
```

```
$ git ls-tree --name-only 7d958f21 src/animation/compile/
    adapter.ts · easing · emit · frame · index.ts · selector.ts · value        ← NO parse-facade.ts
```
⟨**Instrument note, and it is the §Bounds opening sentence reproducing on this seat**: `git cat-file -e
"<ref>:src/animation/compile/parse-facade.ts"` returned **exit 0** for a path that does not exist in
that tree. The absence proof of record for this wave is therefore **`git ls-tree`**, never `cat-file
-e` — *"a unit dispatched on the stale paths writes nothing and reports success."*⟩

```
$ <Tier-C six, read verbatim at 7d958f21>
  presets/catalog.ts:16          /^\s*@keyframes\s+[^\s{]+\s*\{([\s\S]*)\}\s*$/.exec(css)?.[1] ?? css;
  emit/view-transition.ts:136    const CQ_UNIT_RE = /\b-?\d*\.?\d+cq(w|h|i|b|min|max)\b/i;
  emit/view-transition.ts:146    for (const m of body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)) {   ← the serialize→regex-reparse
  engine/composition.ts:175      const nums = raw.match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi);
  emit/format/format.ts:136      export function formatCSSKeyframeString(keyframe: string) {   ← SURVIVES
  emit/format/format.ts:137      let s = keyframe                                              ← span head
  emit/format/format.ts:146      return s;                                                     ← span tail
  svg/draw-svg.ts:89             if (!/^\s*\d*\.?\d+\s*%\s*$/.test(v)) {
  emit/format/format.ts:341      return `${keyframes.replace(/\(\s*\{/g, "{").replace(/\}\s*\)/g, "}")}\n`;  ← candidate 7th
```

```
$ git show 7d958f21:src/animation/ingest/cssom.ts | awk 'NR>=214 && NR<=216'
  214|        const nameRe = new RegExp(
  215|            `\\banimation(?:-name)?\\s*:[^;}]*\\b${name}\\b`,
  216|        );
$ git show 7d958f21:src/animation/ingest/cssom.ts | wc -l   → 466
```

```
$ grep -n "no known consumer feeds the crash shape" docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md
  42:swap is the cure; no known consumer feeds the crash shape (kf's 37 seams
$ ls docs/tranches/V/apotheosis/parser-proof/ | grep -i addendum   → (no output)
```

```
$ git grep -c 'isFrozen\|Object.freeze' 7d958f21 -- src/
  interp-slot.ts:1 · browser.ts:4 · conditional.ts:9 · core.ts:6 · function.ts:3   → 23 LINES
$ git grep -n 'Object.isFrozen' 7d958f21 -- test/resolve/value4-immutable-resolve.test.ts
  :43 · :67 · :84   → THREE assertions
$ git ls-tree --name-only 7d958f21 test/fixtures/keyframes/ | grep -c '\.css$'   → 14  (+ manifest.json)
$ git ls-tree --name-only 7d958f21 test/ingest/    → adopt-compiled.test.ts · ingest.test.ts · platform-adopt.test.ts
```

### Anchor drift `81a56990` → `7d958f21` (D-19: re-resolve before any cure; recorded, not inherited)

The spec's anchors were resolved at `81a56990`. KF.W0/KF.W1/KF.W4 have written since. Measured drift:

| spec anchor | at `7d958f21` | note |
|---|---|---|
| specifier lines / files under `src/` = **29 / 27** | **28 / 26** | the one dropped file is **`src/animation/load-engine.ts`** ⟨`comm` against the two `-l` listings⟩ — a KF.W4-era edit; **no runtime parse-surface edge lost**: (ii) still returns **25 / 13**, unchanged |
| A5 `easing/registry.ts:131` `parseTimingFunction` | **`:166`** | drifted 35 lines; symbol and module unchanged |
| copy 2 `emit/css-text.ts:58` `serializeSelector`, consumer `:75` | **`:59`**, consumer **`:76`** | 1-line drift |
| `emit/view-transition.ts:146` | **`:146`** (the `matchAll` regex), `declaredDecls` decl at **`:139`** | the *regex* line is exact; the spec's prose named the function's site |
| every other §Bounds anchor named in this baseline | **exact** | `cssom:214-216` · `catalog:16` · `composition:175` · `format:136/137/146/341` · `draw-svg:89` · `options:104` · `selector:24` · `compile:32` · `engine/options:31` · `browser:162` · `grammar:77/85/109/111` · `validate:182/186` · `adapter:205/222/241/341/377` · `metadata:42` |

**Rule for every unit: re-resolve your own anchors at `7d958f21` before writing, and record any further
drift beside the act. The §Bounds table's line numbers are not load-bearing; the symbol, the module and
the §Bounds row are.**

### A bounds gap, recorded at open rather than discovered at the cure (ESCALATION TRIGGER, not a licence)

`src/animation/engine/css/metadata.ts` carries **2 runtime collector specifiers** and sits inside
G-W2-2's own enumerated **10 parse-surface modules** (`:42` `collectStyleRules`, `:102`
`collectTimelineOptions`) — **and it is NOT in §Bounds' Owned-files table.** G-W2-2's assertion
(*"exactly one module in `src/animation/**` imports value.js's grammar entries or collectors at
runtime"*) cannot be reached while that module keeps its edge. **A write there is outside §Bounds and is
an ESCALATION** (runbook §5.7): unit `.b` **stops and returns it** rather than widening its own bounds,
and records the gate as honest-RED on that one module with the §Bounds cell named. No seat adds the
path to its own writable set.

---

## Unit plan

**Shape (spec §Execution shape, verbatim)**: *"4 Opus seats, 3 phases — phase 1: 1 serial (`.a` …);
phase 2: 2 parallel, file-disjoint (`.b` … `.c` …); phase 3: 1 serial (`.d` …). Peak concurrency 2 —
inside the owner's four-workflow cap."* All four seats are **Opus** (the spec names no Fable,
adjudicator or design-author seat).

**Groups (ordered; ≤2 concurrent; no two concurrent units share a modify path)**
1. `KF.W2.a`
2. `KF.W2.b` ∥ `KF.W2.c`
3. `KF.W2.d`

**Disjointness receipt**: `.b`'s writable set ∩ `.c`'s writable set = ∅. `emit/format/format.ts` is
written by **`.c` only** (hard order 4); `emit/format/options.ts` (a different file) is `.b`'s;
`emit/css-text.ts` + `emit/index.ts` are `.b`'s (façade-side contract only — the publication ACT is
KF.W8's); `resolve/function.ts` and `resolve/conditional.ts` (the delete-or-declare tails) ride `.c`
with the Tier-C roster.

### `KF.W2.a` — census · reconciliation · both registries (phase 1, serial, Opus)

- **Sections**: §Carry F0 (census/reconciliation/boundary set, 329–472) · §Carry F3 (the posture
  registry, 522–577) · §Carry F6 (the base 28, 596–642) · §Gates G-W2-1 (647–654) · §Gates G-W2-5
  (717–735) · §Sequencing hard order 2 + the commit-family line (782–800).
- **Writable**: `docs/tranches/X/keyframes/registries/POSTURES.md` (create) ·
  `docs/tranches/X/keyframes/registries/INGRESS-CENSUS.md` (create) ·
  `docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` (create) ·
  `docs/tranches/X/execution/B/KF-W2.md` (its receipt only).
- **Gates**: G-W2-1 · G-W2-5 (clauses 1–2; clause 3, the fuzz corpus, is `.d`'s) · G-W2-2b (re-measure
  and FREEZE the demo census inside INGRESS-CENSUS.md).
- **Locks**: registries land **BEFORE any cure commit** (hard order 2) — `.b`/`.c` do not start until
  `.a`'s commits exist. Commit family, must not split: **the ingress census + the §F-2 addendum = ONE
  commit** (§Sequencing). The addendum is an **E-3 addendum-beside**, never a rewrite of the pinned
  `GATE-VERDICT.md` (epoch rule). ⟨**Tension recorded at open**: the §Execution-shape line lists the
  §F-2 addendum at `.d`; the §Sequencing **commit-family lock** binds it to the census, which is `.a`'s.
  The family lock governs; `.a` writes both in one commit and `.d` verifies rather than re-writes.⟩

### `KF.W2.b` — the façade · Tier-A repoint · the entry-point contract (phase 2, ∥ `.c`, Opus)

- **Sections**: §Carry F1 (473–508) · §Carry F4 (578–585) · §Carry F5 (586–595) · §Gates G-W2-2
  (655–693) · G-W2-2b (694–704) · G-W2-6 (736–768) · G-W2-8 (774–781) · §Sequencing hard orders 3, 5, 6
  + the façade/contract commit families.
- **Writable** (all under `/Users/mkbabb/Programming/keyframes.js/`):
  `src/animation/compile/parse-facade.ts` (create) · `compile/adapter.ts` · `compile/value/compile.ts` ·
  `compile/selector.ts` · `compile/easing/registry.ts` · `compile/emit/format/options.ts` ·
  `compile/frame/compiler.ts` · `engine/options.ts` · `engine/css/animation.ts` · `resolve/browser.ts` ·
  `scroll/grammar.ts` · `validate.ts` · `compile/emit/css-text.ts` · `compile/emit/index.ts` ·
  `test/compile/valuejs-contract.test.ts`; plus this record's receipt section.
- **Gates**: G-W2-2 · G-W2-6 · G-W2-8 (façade-side contract clause) · G-W2-2b (paired clause: no
  `src/`-only re-scoping).
- **Locks**: **the façade + its first Tier-A repoint = ONE commit** (*"a façade with zero callers is
  not a seam"*); **the entry-point contract + its conformance test = ONE commit**; the façade **exists
  before any Tier-A repoint and before any Tier-C deletion** (hard order 3 — `.c` may not delete ahead
  of it); **NO REPIN** (OP-5 — green against installed **4.0.0**); **KF-AV-28 standing rider** — state
  L-6/C-4's discharge status **before** spending the emit-half cure; **G-W2-8's count arm**: ledger says
  `KF.W8 planned`, so W8 has **not** preceded — **STATE the measured order and leave 3→1 to W8's row 10
  / G3**; performing W8's publication act here is out of bounds.

### `KF.W2.c` — Tier-C extirpation · the cssom injection cure (phase 2, ∥ `.b`, Opus)

- **Sections**: §Carry F2 (509–521) · §Bounds LAW-A census **A-2**/**A-3** (132–233) · §Gates G-W2-3
  (705–711) · G-W2-4 (712–716) · §Sequencing hard orders 3, 4 + the Tier-C / cssom commit families.
- **Writable** (all under `/Users/mkbabb/Programming/keyframes.js/`): `src/animation/presets/catalog.ts` ·
  `src/animation/compile/emit/view-transition.ts` · `src/animation/engine/composition.ts` ·
  `src/animation/compile/emit/format/format.ts` · `src/animation/svg/draw-svg.ts` ·
  `src/animation/ingest/cssom.ts` · `src/animation/resolve/conditional.ts` ·
  `src/animation/resolve/function.ts` · `test/ingest/<one new fixture test>` (create); plus this
  record's receipt section.
- **Gates**: G-W2-3 · G-W2-4.
- **Locks**: **each Tier-C deletion lands in the SAME commit as the façade call that replaces it**
  (a deletion without its replacement is a regression — G-W2-3's falsifier); **the cssom cure + its
  fixture + the `:28-33` comment correction = ONE commit** (the wave's declared commit-family rule,
  §Carry F2); `emit/format/format.ts` is written by `.c` **only**; `formatCSSKeyframeString` is
  **RE-IMPLEMENT-THE-BODY**, never delete-the-symbol (LAW-A census A-2: four barrels incl.
  `public.ts:170`, the lazy engine surface, and a live demo consumer) — the span is `:137`–`:146` named
  **by content** (`let s = keyframe` → `return s;`), with `:136` and `:147` surviving.

### `KF.W2.d` — the round-trip net · the malformed fuzz corpus · close (phase 3, serial, Opus)

- **Sections**: §Gates G-W2-7 (769–773) · G-W2-5 third clause + its second member **Z3 / KF-KC-17** and
  the **K-11** refuting datum (717–735) · §Goal criterion (46–51) · §Sequencing (782–853).
- **Writable** (all under `/Users/mkbabb/Programming/keyframes.js/`):
  `test/compile/roundtrip-fidelity.test.ts` · `test/compile/grammar-fuzz.test.ts` ·
  `test/fixtures/keyframes/` ; plus `docs/tranches/X/execution/B/KF-W2.md` (the close record) and
  `docs/tranches/X/execution/LEDGER.md` (its own row cells + one event line).
- **Gates**: G-W2-7 · G-W2-5 clause 3 · the close re-run of all nine clauses at its own clock.
- **Locks**: the manifest's **mode column is fixed at wave-open and may not be edited by the
  implementing seat**; **widening the epsilon row to make a fixture pass is the convicted failure mode**
  (S.W3's re-baseline); the malformed corpus must cover **malformed SYNTAX** (`oklch()` class) **and
  CHARACTER-CLASS input delivered off the model channel** (KF-KC-17's 4×NBSP), and the character arm
  **asserts the parse SUCCEEDS and the MODEL is what diverged** — value.js's `/\s/` **matches** U+00A0
  (K-11's banked, re-verified datum; **do-not-re-derive lock — no seat re-runs the `/\s/` probe**).

---

## Unit receipts

*(empty at open; each unit appends its own section here — SERVED MODEL line, acts in order, the gate
readings at its own clock double-run, and its commit hashes)*

### `KF.W2.a` — census · reconciliation · both registries

**SERVED MODEL: claude-opus-5[1m]** · phase 1, serial · **status PARTIAL (honest)** — every act the
unit owns landed; the two gates it turns have arms owned by `.b` and `.d` that remain RED and are
**not** claimed here.

**Sections read at the bytes before writing** (D-19 · METHOD): §Carry F0 (329–472) · F3 (522–577) ·
F6 (596–642) · §Gates G-W2-1 (647–654) · G-W2-2b (694–704) · G-W2-5 (717–735) · §Sequencing
(782–800). The spec is 1,006 lines / 353.6 KB and **exceeds the whole-file read cap** — read in
slices; recorded so the next seat does not rediscover it.

#### Acts, in order

**A-0 · E13 unit-level mail sweep** (the four paths ⊕ the atlas **Q**-lane, read-only, at this seat's
own clock; classification from each row's **status cell**, never a bare `grep -i unread`):

```
$ ls -t docs/tranches/V/coordination/ | head -3        → INBOX.md (self-excluded, SELF-COUNT)
                                                         value-inbox-2026-09-17-o8-o11-amendment-addendum.md  (ours, outbound)
$ ls -t ../glass-ui/docs/tranches/BK/coordination/ | head -3
      → glass-outbound-2026-09-17-{constellation-o20-relay, bbnf-lang-9.0.0-addendum, valuejs-o20-disposition}.md
        = I-33 · I-34 · I-32, all rowed
$ ls -t ../keyframes.js/docs/tranches/V/coordination/ | head -3 → vnext/ · VALUEJS-INBOUND-* (letters WE sent)
$ ls -t ../sci-report/atlas/docs/tranches/P/coordination/ | head -3 → unchanged since 2026-08-03, all pre-rowed
```

**0 unrowed · 0 new `I-n` minted · `INBOX.md` NOT touched by this act** (it is outside this unit's
writable set). The live marks **I-32 / I-33** were READ AND CONSUMED at F.W1 unit `b` (INBOX row
`:167`); **I-34** is addressed to bbnf-lang. **None is mail addressed to KF.W2's scope**, so E13's
*"no wave closes with UNREAD mail in scope"* is not armed at this unit, and no status cell is flipped
by this seat.

**A-1 · The basis, measured before any write** (G-W2-1's falsifier is a directory listing):

```
$ ls docs/tranches/V/megatranche/registry/adjudicated/kf-*.md | wc -l    → 58
```

Every one of the 58 was then **READ CELL BY CELL** — roster bullets, ruled-disagreement rows,
killed-claims rows, superlatives and routing summaries extracted mechanically
(`grep -n '^- \*\*\|^| \*\*'` per record, **all 58 yielding**) and read; any cell touching the
register's subject vocabulary printed **in full**, every other cell read at its **claim head**.
**A cell was excluded only after its CLAIM was read.** Coverage proven by set-difference, not asserted:

```
$ <batch separators> | sort  vs  ls …/adjudicated/ | xargs -n1 basename | sort   → diff empty ("IDENTICAL"), 58
```

**A-2 · `POSTURES.md` published** — floor **20**, six positive reference rows outside the count,
posture 1's unreachable-on-R1 footnote carried, per-record cell-by-cell basis table over **58 of 58**,
the eight hardest non-carries named with their read grounds, carriage per LAW B with **no completeness
claim in this file's voice**. Commit **`da0fbc22`** (pathspec, one file).

**A-3 · `INGRESS-CENSUS.md` + `GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` published in ONE commit** —
the wave's declared commit family, **not split**. Commit **`500c13fd`**, exactly two files
(`git show --stat` → 145 + 375 insertions).

The entry-point matrix was **RE-EXECUTED by this seat**, not quoted, against
`node_modules/@mkbabb/value.js/dist/subpaths/{css,easing}.js` (`version` → **4.0.0**), **run twice,
`diff` empty**. It reproduces F0's matrix cell for cell, and adds the readings this unit owns:

```
"oklch()"|"rgb()"|"hsl()"|"lab()"|"color()"   parseCssColor / parseCssValues / parseCssScalar → THROW TypeError
                                              parseTimingFunction → ok:false[css_syntax]
                                              parseKeyframeSelector → ok:false[keyframe_selector_invalid]
parseStylesheet("@keyframes a{from{color:oklch()}}")                → THROW TypeError   ← posture 1 unreachable
parseStylesheet(42)      → {"ok":true,"value":[],"diagnostics":[]}
parseCssScalar("500m")   → {"ok":true,…{"type":"number","value":500,"unit":"m"}}        ← Z7 confirmed
parseKeyframeSelector("from") → {"ok":true,"value":{"kind":"percent","value":0}}
parseTimingFunction("step-start"|"step-end") → ok:true {"kind":"steps","count":1,"position":"jump-start"|"jump-end"}
easing("step-start"|"step-end"|"steps"|"cubic-bezier") → ok:false {"code":"easing_name_unknown"}   ← Z5 confirmed
easing("bounceInEase") → ok:false easing_name_unknown ; easing("easeInBounce") → ok:true           ← KF-CB-1/EE-01
steppedEase(1,"jump-none") → ok:false {"code":"step_count_invalid"}                                ← row 17's ruled datum
```

**A-4 · The §F-2 witness re-walked byte-exact at `7d958f21`** (`git show <ref>:<path>`, read-only, in
the sibling tree): `KeyframeTimeline.vue` `:239-244` emitter · `:251-261` hand-rolled scanner (no
grammar, no validation) · `:263` `kf.vars = newVars` · `:264` **un-awaited** `rebuild()`;
`useTimelineBuild.ts` `:34` `async` · `:40` `try` · `:47-50` `catch → console.error + animation.value
= null`. **All five links exact.**

#### Gate readings — BEFORE → AFTER, each double-run

| gate | BEFORE (at `7d958f21`, pre-write) | AFTER (post-commit, double-run identical) | verdict at this unit |
|---|---|---|---|
| **G-W2-1** | `ls …/keyframes/registries/` → **No such file or directory**; **0-of-19 enumerated**; 21 out-of-façade parse-surface call sites | `ls …/registries/` → `INGRESS-CENSUS.md POSTURES.md`; floor rows → **20**; basis rows → **58**; corpus → **58**; `git ls-tree 7d958f21 src/animation/compile/ \| grep -c parse-facade` → **0** | **ENUMERATION ARM GREEN · SITE ARM RED** — the registry exists, is single-sourced, spans `src/` **and** `demo/`, and enumerates **20 over 58-of-58 read cell by cell**. The assertion's third limb (*"zero Tier-A sites handle a parse failure outside the façade"*) is **`.b`'s**: no `parse-facade.ts` exists yet. **The gate is NOT claimed green by this unit.** |
| **G-W2-5** | `grep -n "no known consumer feeds the crash shape" GATE-VERDICT.md` → `42:…`; `ls parser-proof/ \| grep -i addendum` → **(no output)**; fuzz docblock → *"random VALID @keyframes fragments from MODEL grammars (not raw-string fuzz)"* | `:42` **unchanged** (E-3 — the authority is not rewritten); `ls parser-proof/ \| grep -i addendum` → **`GATE-VERDICT-F2-ADDENDUM-2026-09-17.md`**; fuzz docblock **unchanged** | **CLAUSES 1–2 GREEN · CLAUSE 3 RED** — the census names, per ingress, the exact entry and the **executed** outcome over both organs; the boundary set is enumerated over the whole 58 (**32 banked negative cells over 32 distinct records**); §F-2 is corrected **by addendum, beside**. The **malformed-fuzz-corpus** clause is **`.d`'s** and is untouched. |
| **G-W2-2b** (MONITOR) | 7 files · 6 runtime modules · 8 runtime specifiers, module-for-module identical to §Carry F1 | **7 · 6 · 8**, re-measured at `7d958f21` and **FROZEN** module-for-module at `INGRESS-CENSUS.md` §4 | **TRUE AND FROZEN.** Falsifier armed: a ninth runtime specifier or a seventh runtime module under `demo/` while the wave is open |

#### Anchor drift measured and recorded (D-19 — `81a56990` → `7d958f21`)

| spec anchor | at the ref of record | note |
|---|---|---|
| `demo/scenes/square/useSquareDemo.ts` call `:82` | **`:107`** | drifted 25 lines; import `:4` exact; symbol/module unchanged |
| `demo/utils/reference-data/animationDescriptions.ts` import `:128` | **`:113`** | drifted 15 lines upward; call `:76` exact |
| `kf-KeyframesStringControls` **C-2** ⟨`:63`⟩ (F3 row 10's anchor) | row head at **`:62`**; the quoted evidence sentence is at **`:63`** | the spec's anchor points at the evidence line inside the cell; recorded, not moved (anti-rename) |
| the other six demo-arm anchors · all 20 floor anchors · all 6 positive anchors | **exact** | each resolved by command at the corpus/tree bytes |

#### Residuals and escalations

- **ESCALATIONS: none.** No write outside the unit's §File-Bounds writable set; four files touched,
  all four declared. `scripts/dev/dev.sh` untouched.
- **R-1 · A real spec drift, resolved at the true bytes and recorded rather than patched (E-3).** The
  unit brief and **G-W2-1**'s assertion line, its second footnote and its carriage sentence all read
  **19 / five** — **round-5 text**. §Carry **F3**'s tail reads **20** (*"19 → 20 at repair round 6,
  PASS-6 D-4 · escape E3 — `KF-KE-58` booked as row 20"*) and its positive block carries **six**
  bullets (the sixth *"added at repair round 6, PASS-6 D-3 · escape E2"*). **The register is the gate**
  and the latest repair round governs within it, so **20 / 6** is published; a registry publishing 19
  while F3 enumerates 20 would red **G-W2-1** by construction (*"the gate reds on an unenumerated
  posture"*). The round-4 failure the file convicted itself of over KAD-10 — *the row was added and
  the sentence it falsifies was not re-read* — reproduced once more at the gate line. **No spec byte
  edited.** For the next repair round or check to reconcile in the gate's own voice.
- **R-2 · `KF-HA-13`'s register home** (F0 vs F3). Its shape is floor row 17's — a producer bridge
  converting a spec-correct value.js Result into a throw, unguarded at the consumer. It is enumerated
  by banked id at F0 as **Y3**, deliberately, and three passes let that stand, **so it is not an
  escape**; recorded as a register-SHAPE question with its ground, not minted as a row.
- **R-3 · Subject-width.** `KF-SST-12` (kf's own `entry.ts` refusal taxonomy discarded) and
  `KF-TFP-24`'s vendor-invariant arm enter the floor **only** if a later ruling widens the register's
  subject from *value.js Result* to *any parse-or-compile Result at a value.js-bearing consumer*.
  **This seat did not widen the subject.**
- **R-4 · The `useTimelineBuild.ts:40-50` double reading.** kf-TimelineTrack `SUP-3` calls that
  wrapper **containment** (F0 negative, F6 #10); kf-KeyframeTimeline `C-7` calls the same bytes **the
  file's only silent failure** (floor row 8). Both are true and are booked **once each, by subject**
  — topology vs handling. Recorded so no later seat reads the pair as a contradiction and re-books
  either.
- **`KF-TFP-24` measured, not assumed**: `cubicBezierEasing` is **kf's own demo helper**
  (`demo/utils/reference-data/timingCurveUtils.ts:25`, imported at `TimingFunctionPanel.vue:55`), not
  a value.js entry — which is why its unguarded bare `Error` is not a floor row.

#### Commits

| hash | contents |
|---|---|
| **`da0fbc22`** | `docs/tranches/X/keyframes/registries/POSTURES.md` |
| **`500c13fd`** | `docs/tranches/X/keyframes/registries/INGRESS-CENSUS.md` **+** `docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` — **the declared commit family, not split** |
| *(this section)* | `docs/tranches/X/execution/B/KF-W2.md` — the unit receipt, pathspec, one file |

**Hard order 2 is satisfied**: both registries are committed **before any cure commit**; `.b` and `.c`
may start.
