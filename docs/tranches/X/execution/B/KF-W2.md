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

---

### `KF.W2.b` — the façade · the Tier-A repoint · the entry-point contract

**SERVED MODEL: claude-opus-5[1m]** · phase 2, ∥ `.c` · **status PARTIAL (honest)** — every act inside
the unit's writable set landed and three of its four gates turn; **G-W2-2 is HONEST-RED on exactly one
module**, `src/animation/engine/css/metadata.ts`, which is **not in §Bounds' Owned files** and is
**returned as the ESCALATION the wave record armed at open**, never widened into by this seat.

**Sections read at the bytes before writing** (D-19 · METHOD): §Carry F1 (473–508) · F4 (578–585) ·
F5 (586–595) · §Gates G-W2-2 (655–693) · G-W2-2b (694–704) · G-W2-6 (736–768) · G-W2-8 (774–781) ·
§Sequencing (782–800), plus §Bounds LAW-A censuses A-1/A-5 and the §Bounds Owned-files table.
COHESION §0j (whole) and every later addendum to the file end were read for the rulings this unit
consumes (**§0j.C KF-WRITE / KF-OP1**, **§0m.0/§0m.1/§0m.2**).

#### Substrate, and the fact that it MOVED under this seat

The wave record's ref is `7d958f21`. **Four sibling commits landed on the shared `master` during this
unit's sitting** — `f0f86ed8` · `e9b64342` · `24bbeda2` · `2e0d91ae` (KF.W5 `.c`) and `f7cbc41c`
(KF.W2 `.c`) — so every measurement below was taken at the **true bytes at the moment it was taken**,
and the ref is named beside each. Nothing is inherited from the baseline table.

```
⟨git rev-parse HEAD (at unit open)⟩  → 2549c1332e60eeb64730c8dba1ddb36033ac8d7e
⟨git rev-parse HEAD (at unit close)⟩ → 36b4615a7cf5e76cd8b5f9d5fc4732b894c701c8
⟨git merge-base --is-ancestor 7d958f21 HEAD⟩ → YES (the ref of record is an ancestor throughout)
```

#### Anchors re-resolved at the true bytes (D-19), before any byte was written

| spec anchor | at `7d958f21` | note |
|---|---|---|
| A5 `easing/registry.ts:131` `parseTimingFunction` | **`:166`** | drifted 35 L (the brief's figure, reproduced); symbol + module unchanged. Now `:165` after this unit's own edit |
| copy 2 `emit/css-text.ts:58` `serializeSelector`, consumer `:75` | **`:59`**, consumer **`:76`** | the brief's figure, reproduced. Consumer now `:82` — **moved by THIS unit's own six-line docblock**, recorded rather than left for `.d` to rediscover |
| `emit/format/options.ts:104` · `selector.ts:24` · `value/compile.ts:32` · `engine/options.ts:31` · `resolve/browser.ts:162` · `scroll/grammar.ts:77/:85/:109/:111/:112` · `validate.ts:182/:186` · `adapter.ts:205/:222/:241/:341/:374/:377` · `metadata.ts:42/:102` | **exact** | all 21 parse-surface call sites resolved at the ref of record by this seat |

**The façade's absence proved by `git ls-tree`, never by `cat-file -e`** (the wave record's instrument
note, reproduced on this seat):

```
$ git ls-tree --name-only 7d958f21 src/animation/compile/
  adapter.ts  easing  emit  frame  index.ts  selector.ts  value        ← NO parse-facade.ts
$ git cat-file -e 7d958f21:src/animation/compile/parse-facade.ts
  fatal: path '…/parse-facade.ts' exists on disk, but not in '7d958f21'
```

#### THE TWO STANDING RIDERS, STATED BEFORE THE CURES THEY CONDITION (not after)

**KF-AV-28 (§Carry F5) — L-6/C-4's discharge status, read BEFORE the emit-half cure was spent.**

```
⟨awk -F'|' '/^\| KF\.W7/ {print $4}' docs/tranches/X/execution/LEDGER.md⟩ → " planned "
```

**KF.W7 has not sat; no S-9 verdict exists for the timeline cluster; L-6/C-4 is therefore NOT
DISCHARGED and the delegation-target obligation is LIVE.** The emit half was spent on that reading.
Recorded exactly, because the rider's whole content is that a seat states this *before* spending, and
a SWAP verdict arriving later would moot the obligation without invalidating the cure — the spec's own
words: *"the emit half of the façade is built either way."*

**OP-6 / G-W2-8 — the order, MEASURED and STATED, not assumed.**

```
⟨awk -F'|' '/^\| KF\.W8/ {print $4}' docs/tranches/X/execution/LEDGER.md⟩ → " planned "
```

**At this clock KF.W8 has NOT preceded.** RULINGS **R-16** declares *KF.W8 PRECEDES*; the execution
ledger measures the opposite. Under the gate's own wording the count arm's arming condition
(*"arms if-and-only-if W8 has not preceded"*) is therefore **MET** — and the **3 → 1 publication ACT
is still KF.W8's row 10 / G3, and performing it here is out of bounds.** This unit consequently turns
**the façade-side contract clause only** and leaves the count RED and HOMED, which is the one
disposition consistent with both the ruling and the measurement. The divergence is a finding for the
wave's close seat, not a licence.

#### Acts, in order

**A-0 · E13 unit-level mail sweep** (four paths ⊕ the atlas **Q** lane, read-only, this seat's clock;
`INBOX.md` self-excluded under SELF-COUNT and **not touched** — it is outside this unit's writable set):

```
$ ls -t docs/tranches/V/coordination/ | head -3
    INBOX.md (self-excluded) · value-inbox-2026-09-17-o8-o11-amendment-addendum.md (OURS, outbound)
$ ls -t ../glass-ui/docs/tranches/BK/coordination/ | head -3
    glass-outbound-2026-09-17-{constellation-o20-relay, bbnf-lang-9.0.0-addendum, valuejs-o20-disposition}.md
    = I-33 · I-34 · I-32, all rowed, all routed to X-W0.j / the X mail seat
$ ls -t ../keyframes.js/docs/tranches/V/coordination/ | head -3   → vnext/ · VALUEJS-INBOUND-* (letters WE sent)
$ ls -t ../sci-report/atlas/docs/tranches/P/coordination/ | head -3 → unchanged since 2026-08-03, pre-rowed
```

**0 unrowed · 0 new `I-n` minted · no status cell flipped.** The three live `UNREAD` marks are
glass-producer rows routed away from Track B; **none is mail addressed to KF.W2's scope**, so E13's
close condition is not armed at this unit.

**A-1 · `src/animation/compile/parse-facade.ts` CREATED, and the Tier-A seam collapsed to it.**
208 lines. It re-publishes **value.js's own** grammar entries and collectors at one path — the import
statement is a real `import { … } from "@mkbabb/value.js/css"` followed by `export { … }`, **not an
`export … from` re-export**, because G-W2-2's command (ii) matches `import` and a bare re-export would
have made the façade invisible to the very gate it exists to turn. It mints no grammar.

It publishes **four named postures**, so that *no call site writes `result.ok`* — the seam's
"exactly one declared thing that happens when a CSS string is bad":

| posture | the tree shape it collapses | consumers after this act |
|---|---|---|
| `requireParsed` THROW | `selector.ts:23-35` (`AnimationOptionError`/`EMPTY_PARSE`) · `value/compile.ts:33-38` · `scroll/grammar.ts:57-63` · `easing/registry` · `emit/format/options` · `resolve/browser` | 6 modules |
| `absorbParsed` ABSORB | `adapter.ts:219-226` `parseSource` → empty AST + surfaced `ParseIssue[]` | `adapter.ts` |
| `swallowParsed` SWALLOW | `validate.ts:180-192` `keyframesNames` `try{}catch{return []}` | `validate.ts` |
| `orFallback` FALLBACK | `engine/options.ts:31`'s refusal→`undefined` (a refusal decision, with the throw NOT caught — the two are different postures, not one with an option) | `engine/options.ts` |

Two **byte-identical** private `ParseIssue` renderers — `selector.ts`'s `issueText` and `adapter.ts`'s
`parserMessage` — collapse into `formatParseIssue`. The **type surface is deliberately NOT collapsed**
(`import type` is erased; collapsing it is the different, unmandated act §Gates names).
**SWALLOW's `read` runs inside the posture on purpose**: `validate.ts` guarded parse *and* collect
together, and narrowing that guard here would be a behaviour change dressed as hygiene.

**A-2 · The entry-point contract PUBLISHED with its conformance test — ONE commit, the declared
family.** `test/compile/valuejs-contract.test.ts`, **16 tests, 6 clauses**:

- **clause 0** — the façade **re-publishes, it does not re-implement**: all **14** parse-surface
  entries asserted `facade[name] === valueCss[name]` **by identity**. This is the executable falsifier
  for *"it mints no grammar"* — a wrapped entry breaks it.
- **clause 1** — which grammar belongs at the keyframe-selector seam, with `parseCssScalar`'s
  admission of `500%`/`-20%` pinned as the counterexample **and** the registry's precision correction
  pinned with it (`parseCssScalar("from"|"to")` → `ok:true`, so *"rejects from/to"* is a FIELD
  behaviour, never an entry behaviour).
- **clause 2 — THE FROZEN PARSE BOUNDARY**: `Object.isFrozen(<façade result>) === true` **mirroring
  `test/resolve/value4-immutable-resolve.test.ts:43`**, over envelope *and* payload, for the selector
  and the stylesheet entries; **plus a write asserted to `throw TypeError`** — the clause's whole
  point is that a consumer write is loud, not a no-op.
- **clause 3 — the payload shape (`KF-KC-1`)**: `String(<parsed selector>)` === `"[object Object]"`.
  *The freeze is why a write is loud; the shape is why the same object renders as `[object Object]`
  when nobody writes to it at all* — a contract stating one and not the other publishes half a clause.
- **clause 4** — the four postures, each pinned.
- **clause 5 — the emit mirror**: `parseDeclarationBlock` / `serializeDeclarationBlock` round-trip,
  and a malformed body **REFUSES** (`css_syntax`, measured — see below) instead of silently dropping
  what a hand-rolled scanner missed.

**A-3 · The declaration pair — F4's "BOTH halves", built from the tree's existing authorities.**
Parse half = value.js's own grammar (`parseStylesheet` → `collectStyleRules` → `collectDeclarations`),
with the bare body lifted under a universal style rule — **the same wrap idiom `resolveKeyframes`
already applies to a bare keyframe stop-list** (`@keyframes anonymous { … }`), so no grammar is
minted. Emit half = `emit/css-text.ts`'s **single** declaration emitter, exported rather than copied
(*a serializer with two implementations is the Tier-D defect this seam exists to stop*).
The pair returns value.js's `ParseResult` **unchanged**, so the CALLER declares its posture — a
whole-replacement consumer that silently drops what its scanner missed is the defect the pair exists
to retire, and a posture chosen inside it would re-inflict it.

Measured before the assertions were written (WRITE-THEN-MEASURE), run in an isolated clone:

```
"opacity 0.5"        → REFUSE css_syntax
"opacity: ;"         → REFUSE css_syntax
"--x: 10px;\nbogus"  → REFUSE css_syntax      ← refuses even when the FIRST declaration is well-formed
""                   → ok, size 0              ← empty is not malformed
roundtrip("--offset: 10px;\nopacity: 0.5;") → "--offset: 10px;\nopacity: 0.5;"
```

**A-4 · A census consequence caught and corrected in the same sitting.** Publishing the contract
against the façade removed this file's **direct** `@mkbabb/value.js/css` edge, dropping LAW-A census
**A-5**'s frozen test-arm population from **10 → 9** — a number the wave declared *censused and
frozen*, moved by an act of this wave. Cured at the root, not by re-declaring the number: the file now
holds **both** edges, and the direct one **earns its place** as clause 0's subject. Measured after:
`git grep -l 'from "@mkbabb/value.js/css"' -- test/ | wc -l` → **10**.

#### Gate readings — BEFORE → AFTER, each double-run with identical output

| gate | BEFORE (at the ref of record) | AFTER (at `36b4615a`) | verdict at this unit |
|---|---|---|---|
| **G-W2-2** | command (ii) → **25 runtime specifiers over 13 modules**, of which **10 are the parse surface**; **21** parse-surface call sites; `git ls-tree … compile/` → **no `parse-facade.ts`** | command (ii) → **20 runtime specifiers over 5 modules**: **`parse-facade.ts` × 15** (the whole grammar/collector surface, at ONE path) · **`engine/css/metadata.ts` × 2** (`collectStyleRules`, `collectTimelineOptions`) · `emit/css-text.ts` + `frame/interp-slot.ts` × 1 each (`serializeCssColor`, the emit half, **out of denominator by the gate's own words**) · `resolve/function.ts` × 1 (`coerceToSyntax`, the stray — `.c`'s delete-or-declare). **Parse-surface paths: 10 → 2. Call sites routed: 19 of 21.** | **HONEST-RED ON EXACTLY ONE MODULE.** The assertion (*"exactly one path"*) is unreachable while `engine/css/metadata.ts` keeps its edge, **and that module is not in §Bounds** — see the escalation. **NOT claimed green.** |
| **G-W2-2b** (MONITOR) | 7 files · **6** demo runtime modules · **8** runtime specifiers | **7 · 6 · 8**, module-for-module identical | **TRUE — the monitor holds.** This unit opened **no** demo call site. **Paired clause satisfied**: neither clause was re-scoped to `src/` — this seat measured `src/` **and** `demo/` **and** `test/` (**10**) **and** `scripts/` (**0**), all four quadrants of the same graph |
| **G-W2-6** | the contract does not exist (**0-of-1**); `KeyframesEditor.vue:123`/`:186` `parseCssScalar`; the freeze invariant **23 lines over 5 `src/` modules**, pinned at `:43`/`:67`/`:84` | the contract EXISTS and is executable: **16 tests / 6 clauses**, `Object.isFrozen(<façade result>) === true` at the selector and stylesheet entries, the write asserted to throw, the payload shape pinned. Freeze invariant re-measured: `interp-slot 1 · browser 4 · conditional 9 · core 6 · function 3` = **23 LINES**, pin still **`:43`/`:67`/`:84`** | **CONTRACT CLAUSE GREEN.** The call-site limb (*"`parseCssScalar` appears at zero selector seams"*) is **KFED-UNIT's** — measured unchanged at `KeyframesEditor.vue:123`/`:186`, and **this wave does not open the call site** (the gate's own restriction) |
| **G-W2-8** | 3 copies, 0 exported | copies unchanged and **re-verified at HEAD**: copy 1 `emit/format/format.ts:20` (module-private) · copy 2 `emit/css-text.ts:59` (private, sole consumer `:82`) · copy 3 `demo/utils/keyframeSelector.ts:7`; `emit/index.ts` still exports **no** keyframe-selector serializer. **The emit mirror EXISTS and the façade is its single `src/` caller**: `serializeTimelineOptions` is imported at `parse-facade.ts` only, and `serializeDeclaration` has exactly one consumer outside its own module — the façade | **FAÇADE-SIDE CONTRACT CLAUSE GREEN · COUNT ARM RED AND HOMED.** The order is measured above (KF.W8 = `planned`, has NOT preceded); the **3 → 1 act is KF.W8's row 10 / G3** and is not performed here |

#### Regression measurement — the delta is ZERO, measured against an isolated clone

The shared checkout carried two sibling seats' in-flight bytes throughout, so *"the suite is green"*
read there would be a claim about their work as much as this unit's. Every figure below was taken in a
**clean clone at the exact commit**, `node_modules` symlinked, nothing else present:

| measurement | at `49cd647b^` (before this unit) | at `36b4615a` (this unit's tip) |
|---|---|---|
| `vitest run --project library` | **1167 passed · 0 failed** · 3 expected fail · 14 skipped | **1203 passed · 0 failed** · 3 expected fail · 14 skipped (double-run identical) |
| `check:lib` (`tsc -p tsconfig.lib.json`) | **3** (pre-existing, none in this unit's files) | **3** — identical |
| `tsc -p tsconfig.test.json` | **24** (pre-existing) | **24** — identical; **0** in `valuejs-contract.test.ts` |
| `depcruise src demo` | **4 violations** / 434–435 modules | **4 violations** / 435 modules (+1 module, +4 edges, **0 new violations**) |
| `proof:structure` | R4×2 · R6×1 (`group.ts`, `engine/animation.ts`, `waapi/delegation.ts`) | R4×3 · R6×1 — **the third is `ingest/cssom.ts` (530 L), `.c`'s commit `f7cbc41c`**; the R6 is KF.W5 `.c`'s. **Zero violations attributable to this unit**; `parse-facade.ts` is 208 L and clean on R1–R6 |

#### ESCALATION (returned, not widened)

**`src/animation/engine/css/metadata.ts` carries the last 2 runtime collector specifiers on
G-W2-2's own parse surface and is NOT in §Bounds' Owned-files table.**

```
$ git grep -n 'from "@mkbabb/value.js/css"' HEAD -- src/animation/engine/css/metadata.ts   → :30
    collectStyleRules      call :42
    collectTimelineOptions call :102
```

G-W2-2's assertion cannot be reached while that edge stands. The wave record armed this at open as an
**ESCALATION TRIGGER, not a licence** (*"unit `.b` stops and returns it rather than widening its own
bounds"*), and that is exactly what this seat did: **no write outside the writable set, the gate
recorded honest-RED on that one module with the §Bounds cell named.** The cure is one import-line
repoint of two symbols plus their two call sites — it is bounded and mechanical; what it needs is a
dated §Bounds addendum-beside naming the path, not a seat's own widening.

#### Residuals

- **R-1 · `frame/compiler.ts` NOT carved, deliberately.** §Bounds gives it `modify-carve` and §Carry F1
  calls `:146` *"the façade's first natural consumer"*. Measured: `:146` calls **kf's OWN**
  `parseKeyframeSelector` from `../selector` — a symbol G-W2-2 excludes **by construction**, and
  `selector.ts` now routes through the façade, so the site already reaches value.js's grammar through
  exactly one seam. Repointing it would rename a call, not cure one. Recorded rather than performed.
- **R-2 · `emit/index.ts` untouched** although it is in the writable set: its export list is
  **MISS-β2's publication decision surface and the ACT is KF.W8's** (§Bounds). Note for `.d`/W8: KF.W5
  `.c`'s commit `2e0d91ae` published `cssIdent` / `reverseCSSTime` / `serializeTimingFunction` through
  that file during this sitting — **no keyframe-selector serializer was published**, so MISS-β2's 3 → 1
  is untouched and W8's denominator is unmoved.
- **R-3 · `engine/css/animation.ts` needed no repoint** and is left byte-clean: its
  `@mkbabb/value.js/css` specifier is **inline-`type` only** (no runtime edge), and `:176`
  `resolveKeyframes` is **kf's own** adapter symbol — the census correction §Carry F1 makes, confirmed
  at the bytes by this seat.
- **R-4 · The seam moved a sibling's coordinate.** This unit's six-line docblock in `emit/css-text.ts`
  pushed `serializeSelector`'s sole consumer `:76 → :82`. Named here so KF.W8 re-resolves rather than
  inherits — the §Bounds table's line numbers were never load-bearing, and this is why.
- **R-5 · `check:lib` 3 / `tsc -p tsconfig.test.json` 24 / `depcruise` 4 / `proof:structure` R4×3+R6×1
  are ALL pre-existing or siblings'**, measured both sides. This unit adds none and cures none — none
  of the owning files is in its writable set.

#### Commits

| hash | contents |
|---|---|
| **`49cd647b`** | `compile/parse-facade.ts` (create) **+** the nine in-bounds Tier-A repoints (`adapter` · `easing/registry` · `emit/format/options` · `selector` · `value/compile` · `engine/options` · `resolve/browser` · `scroll/grammar` · `validate`) — **the declared family: a façade with zero callers is not a seam**, so it is born with all nine. 10 files |
| **`46f0b77b`** | `test/compile/valuejs-contract.test.ts` **+** `compile/parse-facade.ts` (the declaration pair) **+** `emit/css-text.ts` (the single declaration emitter exported) — **the entry-point contract + its conformance test, ONE commit, not split**. 3 files |
| **`36b4615a`** | `test/compile/valuejs-contract.test.ts` — clause 0 (the façade↔package identity) and the restoration of census A-5's frozen test arm to **10**. 1 file |
| *(this section)* | `docs/tranches/X/execution/B/KF-W2.md` — the unit receipt, pathspec, one file |

**Hygiene**: all three commits verified by `git show --name-only` to contain **exactly** their declared
paths — **0 sibling files swept in** across four concurrent seats on one index. `scripts/dev/dev.sh`
appears in **0 of 3**. **No push** — a wave's close pushes its own `origin HEAD`, and that is `.d`'s act.

---

### `KF.W2.c` — Tier-C extirpation · the cssom injection cure

**SERVED MODEL: claude-opus-5[1m]** · phase 2, ∥ `.b` · **status DONE** — both gates this unit turns
are **GREEN at its own clock**, the six Tier-C members are all dispositioned, the three
delete-or-declare tails are DECLARED at their sites, and **one bounds gap is RETURNED, not widened**.

**Sections read at the bytes before writing** (D-19 · METHOD): §Carry **F2** (509–521) · §Bounds LAW-A
censuses **A-2**/**A-3** (132–233, with A-4/A-5 read for the tails) · §Gates **G-W2-3** (705–711) ·
**G-W2-4** (712–716) · §Sequencing hard orders **3–4** + the Tier-C and cssom commit families
(782–800), plus §Bounds' Owned-files table (97–128) and §Gates **G-W2-2** (655–693) — the last so this
unit could prove it does not red `.b`'s gate. COHESION **§0j** (whole) and every later addendum to the
file end were read; §0j.C **KF-WRITE** is this seat's write authority. This record's Open, Baseline,
Unit plan and `.a`'s receipt were read whole before the first byte.

#### Substrate

⟨`git rev-parse HEAD`⟩ at open → `2549c133` (the record's ref `7d958f21` plus KF.W5.c's landings; every
anchor below was **re-resolved at the true bytes**, not inherited). **Hard order 2 satisfied at open**:
`.a`'s `da0fbc22` + `500c13fd` precede every cure commit here. **Hard order 3 satisfied**: `.b`'s
façade landed at **`49cd647b`** (`git log --oneline -- src/animation/compile/parse-facade.ts`) **before
this unit's first Tier-C commit** `0cfd3b5f`; the cssom cure (`f7cbc41c`) is neither a Tier-A repoint
nor a Tier-C deletion and is not bound by that order. **Hard order 4 honoured**: `emit/format/format.ts`
is written by `.c` only — ⟨`git log --oneline --name-only -- src/animation/compile/emit/format/format.ts`⟩
shows no `w2.b` commit on that path.

**Anchor re-resolution at the true bytes (D-19)** — all six spec anchors hold EXACTLY, and the drift
table's `view-transition.ts:146` reading is reproduced:

```
$ <the six, read verbatim at 2549c133>
  presets/catalog.ts:15-16      const bare = … /^\s*@keyframes\s+[^\s{]+\s*\{([\s\S]*)\}\s*$/.exec(css)?.[1] ?? css
  emit/view-transition.ts:136   const CQ_UNIT_RE = /\b-?\d*\.?\d+cq(w|h|i|b|min|max)\b/i;     (consumers :202, :207)
  emit/view-transition.ts:146   for (const m of body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)) {  ← the serialize→regex-reparse
  engine/composition.ts:175     const nums = raw.match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi);
  emit/format/format.ts:136/137/146   signature SURVIVES · `let s = keyframe` span head · `return s;` span tail
  svg/draw-svg.ts:89            if (!/^\s*\d*\.?\d+\s*%\s*$/.test(v)) {
  emit/format/format.ts:341     the candidate 7th (de-paren), present
$ git show 2549c133:src/animation/ingest/cssom.ts | awk 'NR>=214 && NR<=216'
  214|        const nameRe = new RegExp(
  215|            `\\banimation(?:-name)?\\s*:[^;}]*\\b${name}\\b`,
  216|        );
$ git show 2549c133:src/animation/ingest/cssom.ts | wc -l   → 466
```

#### Acts, in order

**C-0 · E13 unit-level mail sweep** (four paths ⊕ the atlas **Q** lane, read-only, at this seat's own
clock; classification from each row's status cell). Newest-by-mtime in each path is unchanged from
`.a`'s A-0 sweep at this sitting: `INBOX.md` self-excluded (SELF-COUNT); glass `BK/coordination/`
newest three = **I-32 · I-33 · I-34**, all rowed; kf `V/coordination/` = `VALUEJS-*` letters WE sent;
atlas unchanged since 2026-08-03. **0 unrowed · 0 new `I-n` minted · `INBOX.md` NOT touched** (outside
this unit's writable set). None is mail addressed to KF.W2's scope; no status cell flipped.

**C-1 · The cssom identifier injection, CURED AT THE ROOT — `f7cbc41c`, the declared commit family, NOT
SPLIT** (cure + fixture + the `:28-33` comment, exactly two files).

The defect, measured before the cure rather than quoted: the linkage built
`new RegExp(\`\\banimation(?:-name)?\\s*:[^;}]*\\b${name}\\b\`)` from the `@keyframes` rule's own
identifier. Both failure limbs were **executed**, not inferred:

```
$ <jsdom CSSOM probe, 7 escaped names installed as real <style> sheets>
  every one returns rule.name RAW (escapes included) and the interpolated pattern
  MIS-MATCHES its own sibling rule — 7 of 7 `re.test(styleRule.cssText)` → false
  e.g. `@keyframes pu\+lse` → /\banimation(?:-name)?\s*:[^;}]*\bpu\+lse\b/ looks for `pu+lse`
$ <browser reading, rule.name UNESCAPED, via the module's documented DOM-free injection seam>
  `pu(lse` → THROW SyntaxError: Invalid regular expression: … Unmatched ')'  ← out of walkSheet,
  ABOVE reconstructFromRule's per-rule try/catch and outside the per-sheet one (which wraps only
  the `sheet.cssRules` read) — an uncaught throw out of `resolveLiveKeyframes` itself
```

The cure removes the construction rather than escaping its input: `declaredAnimationNames` reads the
identifiers the CSSOM has **already parsed** out of each style rule's declaration block
(`animation-name` ∪ the `animation` shorthand — both, because jsdom's CSSOM expands no shorthand and a
browser serializes the name into the shorthand) and the linkage is **string EQUALITY** over its tokens.
A false positive dies with the hazard: `\b` treated the `-` in `my-pulse` as a boundary, so a rule
naming a different animation answered to `pulse`; equality does not.

The `:28-33` **VJ-9 tripwire comment is corrected IN PLACE in the same commit** (§Carry F2's declared
rule). What it asserted was an invariant over the PARSE, read as one over the WALK — and the
construction above was a walk-level uncaught-throw path owing nothing to value.js. It now names that,
points at the fixture, and keeps the VJ-9 widening clause.

**C-2 · The Tier-C six, each with its replacement in the same commit.** Every member was **re-censused
by A-2's command shape at open before it was touched**, and the census changed one disposition:

| # | member | census at open | act |
|---|---|---|---|
| 1 | `catalog.ts:15-16` `bare` | module-private, **0 barrels** — but the invariant it enforces carries a **TEST PIN**: `test/presets/spring-presets.test.ts` asserts every `PRESET_SPECS.css` does not match `/@keyframes\s/` | **RE-CUT** (A-2's rule: a member returning a test pin is re-cut, not deleted) — `55347314` |
| 2 | `view-transition.ts:146` `declaredDecls` | 1 consumer, module-private | **DELETED** — replaced by the structural projection, `0cfd3b5f` |
| 3 | `view-transition.ts:136` `CQ_UNIT_RE` | **A-3 reproduced exactly**: declaration + `:202` + `:207`, 0 barrels, 0 test pins | **DELETED WHOLE** — `0cfd3b5f` |
| 4 | `composition.ts:175` | `captureUnderlyingBase` — 1 internal call site, 1 test pin (`c6-correctness.test.ts`), 0 barrels | **DELETED** — replaced by the façade, `a461c78c` |
| 5 | `format.ts:137-146` | **A-2 reproduced exactly**: 4 barrels incl. `public.ts:170`, the lazy engine surface, `KeyframeCardList.vue:60` | **BODY RE-IMPLEMENTED**, symbol/signature/brace stand — `0cfd3b5f` |
| 6 | `draw-svg.ts:89` | `asFraction` module-private; `fromDrawSVG`'s pins are on the numeric arm | **DELETED** — replaced by the façade, `0ecaadb3` |

Each cure was **measured before it landed**, and three of them are behaviour statements this seat owes:

```
$ <member 1: bare() over all 38 preset strings, old regex vs new positional cut>
  38 preset strings + 9 adversarial shapes (no wrapper · no name · leading/trailing ws ·
  text after the close · empty · two blocks · a lone @keyframes) → 43 cases, 0 diffs
  and: the strip is LIVE on 4 of 38 (warpLeft, warpRight, jumpUp, jumpDown), a no-op on 34
  and: all 34 classic-data strings reconstruct IDENTICALLY (stops · parsed vars ·
       @property registry · diagnostics) whether `fromString` is handed the stripped or
       the authored text — the parser needs NONE of it (its own contract says so)
$ <member 5: formatCSSKeyframeString, old body vs new positional trim, 13 inputs>
  13 cases, 0 diffs — card shapes and the degenerate ones (no brace, empty, trailing text,
  an inner `{` inside a url())
$ <member 6: asFraction, old pattern vs parseCssScalar, 14 shapes>
  identical on "50%" " 50% " ".5%" "50.5%" "500%" "50" "50px" "abc" "" "%"
  DELTA, and it is the grammar correcting the hand-written token: "50 %" was ACCEPTED by the
  regex and is not a percentage token (now refused); "+5%" and "1e2%" were REFUSED and are
  (now accepted). The non-negative check is kept EXPLICITLY — `-5%` is well-formed CSS and is
  not a draw position, so that is this function's domain, not the grammar's
```

**Precision on G-W2-3's second clause, stated rather than glossed.** The assertion reads *"each
deletion lands in the same commit as the façade call that replaces it"*. Per member: **4** and **6**
land a real façade call (`parseCssValues`+`swallowParsed`, `parseCssScalar`) in the same commit;
**2** and **3** land a STRUCTURAL replacement in the same commit — and that is the stronger cure, not a
weaker one, because the emitter was re-parsing a string **it had just written from an AST it still
held**: the right answer there is to stop parsing, not to parse correctly. **1** and **5** are the
A-2 re-cut class, where the replacement is the parse that was already there (`fromString` at
`catalog.ts:316`) or a presentation trim that must stay value.js-free (the demo's own comment declares
`formatCSSKeyframeString` *"a value.js-free pure-string trim"*, at a call site this wave does not own).
**The falsifier holds in every case: no deletion landed without its replacement in the same commit.**

**C-3 · `proof:structure` R4, reddened by C-1 and cured at the root — `02a87f7a`.** The cure took
`cssom.ts` from **466** to **530** raw lines and broke the repo's 500-line ceiling, whose allowlist is
EMPTY by policy. **No allowlist entry was added** (that is the masking this wave forbids). What shrank
is the cure's PROSE: the VJ-9 paragraph is corrected in place instead of carrying an appended
correction beside it, the helper's docblock states the defect/cure/retired-false-positive and stops,
and the forensic account lives where it is executable — the fixture. ⟨`wc -l` → **500**⟩ ·
⟨`npm run proof:structure`⟩ → **PASS clean across R1–R6**.

**C-4 · The three delete-or-declare tails, DECLARED at their sites — `5083c3f8`.** Declared in the
code, not only here, so the choice is inherited rather than re-litigated:

- **`format.ts:341`, the candidate 7th.** MEASURED: instrumented over **both** vitest projects it fires
  **ZERO** times — no live path produces the `({` / `})` artifact it erases. That is absence of
  coverage, **not** proof of death, and the file's own rule is that only genuinely dead surface is
  excised; the artifact's only possible producer is the value serializer this block composes, which is
  the **Tier-D collapse subject owned by KF.W8 (MISS-β2)**. Deleted there with the producer census.
- **`resolve/conditional.ts:102`** — whitespace COLLAPSING for a text comparison; the Tier-C class's
  neighbour, never a member. The act that retires it (compare the two values PARSED, not serialized)
  changes what `style(--prop: value)` answers for every input value.js refuses. Not on this mandate.
- **`resolve/conditional.ts` `legacyClauses` (`:27`/`:52`)** — no regex and no hand-written grammar; it
  splits the legacy `if(cond: v; cond: v)` form **structurally over parsed items**. Deleting it is a
  FEATURE removal.
- **`resolve/function.ts` `coerceToSyntax`** — A-4's net-new stray, one live call site, neither grammar
  entry nor collector nor serializer, so outside G-W2-2's denominator and deliberately **not** routed
  through the façade (the façade publishes the parse surface; mirroring every value.js export through
  it would make it a package mirror). A delete removes the `@function` parameter-syntax coercion
  feature **and** falsifies the two test comments A-4 names — *"a delete leaves them false"*. Declared,
  so they stay true.

#### Gate readings — BEFORE → AFTER, each double-run

| gate | BEFORE (at the pre-cure bytes) | AFTER (post-commit, double-run identical) | verdict |
|---|---|---|---|
| **G-W2-3** | **6 of 6** regex bodies present. Witness re-run as a COMMENT-STRIPPED scan (a prose mention of a dead pattern is not a survivor) over the five files at `7d958f21` → **6 SURVIVES lines**, one per member | the same scan at HEAD → **0 SURVIVES lines**, run twice identical. The only textual hits left are PROSE: `CQ_UNIT_RE` named once in a docblock that says it was replaced, and the old catalog pattern quoted once as the thing that died | **GREEN.** 0 of 6 regex bodies survive in CODE; each deletion landed with its replacement in the same commit; `formatCSSKeyframeString` keeps its export, signature, brace, four barrels, engine-surface declaration and demo consumer |
| **G-W2-4** | `new RegExp(` in `cssom.ts` CODE (comments stripped) → **1**; `test/ingest/keyframes-name-escapes.test.ts` against the un-cured file → **13 failed \| 4 passed (17)** | → **0**, twice; the fixture → **17 passed (17)**, twice | **GREEN on both clauses this seat owns** — zero constructed-`RegExp` identifier interpolation remains, and the linkage links. **One arm is RED-BY-PRODUCER and is stated at the gate, not hidden** — see the residual below |
| *(not this unit's, measured so it is not disturbed)* | value.js/css runtime specifier lines in this unit's 8 files at `7d958f21` → **2** (`format.ts:2` type-only `KeyframeSelector`; `function.ts` the declared stray) | → **2**, the same two | **G-W2-2 UNMOVED by `.c`.** Zero `@mkbabb/value.js/css` edges added or removed; the two new grammar consumers (`composition.ts:26`, `draw-svg.ts:48`) import **`../compile/parse-facade`** |
| *(tree health)* | — | `npm run check:lib` → **3 errors, all pre-existing** (`group/composite/compositor.ts:79` · `group/waapi.ts:9` · `physics/smooth.ts:194`, last touched at `c821ddd0`, none in this unit's files) · `npm run proof:structure` → **PASS** · full `library` project → **1211 passed \| 3 expected fail \| 14 skipped (1228)**, run twice identical | **no regression introduced** |

#### Residuals and escalations

- **ESCALATION (returned, not widened) · the `emit/format/index.ts` barrel.** The emit-side cure
  publishes two new symbols from `emit/format/format.ts` (`declaredDeclarationsFor`,
  `DeclaredDeclaration`) and `view-transition.ts` consumes them. That barrel is in **NEITHER this
  unit's writable set NOR the spec's §Bounds Owned-files table** (rows 97–128; only `emit/index.ts`
  appears, and it is `modify-carve`, **ACT is KF.W8's**), so the two symbols are imported **from the
  file** (`./format/format`) and the barrel is left untouched. Consequence, named rather than left to
  be found: `emit/format/index.ts`'s docblock sentence *"This PURE barrel is the module's single
  cross-boundary surface … the sibling `../view-transition` emitter … reach the surface here"* is now
  imprecise for those two symbols. **The owed act is one export line plus that sentence.** It is
  recorded at the import site in `view-transition.ts` as well, so it cannot be lost.
- **RESIDUAL, RED-BY-PRODUCER · value.js 4.0.0 refuses a CSS escape — and any non-ASCII identifier —
  in the DECLARATION-VALUE position.** Measured at the installed pin (OP-5 forbids a repin), executed
  twice: `parseCssValues("pu\\+lse")` → `ok:false [css_syntax] expected ["scalar"]`;
  `parseCssValues("puélse")` → the same; while the `@keyframes` **name** position accepts both
  (`parseStylesheet("@keyframes pu\\+lse { … }")` → `ok:true`). The kf-side injection is cured and the
  linkage now finds the sibling, but the linked text is then refused by the grammar, so an
  escaped-name animation surfaces a citable `PARSE_ERROR` naming the identifier instead of riding its
  options — **the module's own VJ-9 tripwire biting, not a kf defect**. Clause (c) of the fixture pins
  that state DELIBERATELY: when value.js accepts escaped idents the assertion goes RED, which is the
  signal to re-cut the row rather than rediscover the fact. **Routed to X·V / the value.js parser
  layer; it is the same R1/VJ-9 class `.a`'s ingress census books.**
- **RESIDUAL · cross-engine identifier spelling is NOT normalized, on purpose.** A browser's
  `CSSKeyframesRule.name` is UNESCAPED while a declaration value serializes ESCAPED, so the two sides
  of the equality can disagree in a browser for an escaped name. **This is not a regression** — the
  old pattern failed there too (and could throw). The only correct normalization is a spec-faithful
  CSS ident unescaper, which is grammar work belonging with value.js, never hand-rolled in an ingest
  module. Recorded, not smuggled.
- **BEHAVIOUR CORRECTIONS CARRIED, all three measured and none of them silent**: (i) the linkage no
  longer matches a foreign rule by substring (`animation: my-pulse` ≠ `@keyframes pulse`); (ii)
  `asFraction` now agrees with CSS on `"50 %"`, `"+5%"` and `"1e2%"`; (iii) `declaredDecls` hands
  `topLevelProp` the key as the emitter holds it — `[\w-]+` could never carry a `.`, so that function's
  dotted-key split was unreachable through the regex path. No test in the tree asserted any of the
  three old behaviours.
- **SPLIT DECLARED (a miss, recorded loud).** `a461c78c` changed `captureUnderlyingBase` and left
  `composition.ts`'s module docblock — *"Value4 is reached through the structural slots compiled by the
  frame pipeline"* — standing beside it: true before that commit, incomplete after it. Under this
  wave's own commit-family rule the correction was owed IN that commit. It landed at **`6e371fd4`**
  instead, as a separate commit rather than an amend, because four seats share this index and
  rewriting a landed commit is the more dangerous act. The miss is the finding.
- **NOT PERFORMED, and why**: no push (a wave's close pushes its own `origin HEAD` — `.d`'s act); no
  `INBOX.md` edit; no LEDGER edit (this unit owns no row cell); `scripts/dev/dev.sh` untouched.
  Prettier state of the seven `src/` files is **unchanged** — six were already non-conforming at
  `7d958f21` and remain so, `catalog.ts` was clean and stays clean; no whole-file reformat was done,
  because unmandated churn across four concurrent seats is how an index gets contaminated.

#### Commits

| hash | contents |
|---|---|
| **`f7cbc41c`** | `ingest/cssom.ts` **+** `test/ingest/keyframes-name-escapes.test.ts` — **the declared commit family, NOT split**: the cure, its fixture, and the `:28-33` VJ-9 comment correction |
| **`0cfd3b5f`** | `emit/format/format.ts` **+** `emit/view-transition.ts` — Tier-C members **2 · 3 · 5** on one declared-stop projection (two of them the same file; git stages files whole) |
| **`55347314`** | `presets/catalog.ts` — Tier-C member **1**, RE-CUT on the test pin the re-census found |
| **`02a87f7a`** | `ingest/cssom.ts` — the R4 line-ceiling cure (prose, never the cure) |
| **`a461c78c`** | `engine/composition.ts` — Tier-C member **4**, through the façade |
| **`0ecaadb3`** | `svg/draw-svg.ts` — Tier-C member **6**, through the façade; its BOUNDARY clause corrected in the same commit |
| **`6e371fd4`** | `engine/composition.ts` — the docblock correction `a461c78c` owed (declared split) |
| **`5083c3f8`** | `emit/format/format.ts` · `resolve/conditional.ts` · `resolve/function.ts` — the three delete-or-declare tails DECLARED at their sites |
| *(this section)* | `docs/tranches/X/execution/B/KF-W2.md` — the unit receipt, pathspec, one file |

**Hygiene**: every commit above carries its own pathspec **on the commit itself** and was verified by
`git show --stat` to contain **exactly** its declared paths — **0 sibling files swept in** across four
concurrent seats on one index, with `.b`'s staged rows sitting in that index throughout.
`scripts/dev/dev.sh` appears in **0 of 8**. No `git add -A`/`-u`, no `commit -a`, no reset, no stash,
no amend, no force. Transient probe files this seat used for measurement (`test/probe6`, `probe11`,
`probe12`, repo-root `.probe*.mjs`) were deleted at the end of each measurement and appear in **0
commits**; ⟨`ls`⟩ → none survives. ⟨`git status --porcelain`⟩ does carry one untracked
`test/engine/zz-probe.test.ts` — **a sibling seat's, not this one's, and NOT touched**.

---

### `KF.W2.d` — the round-trip net · the malformed fuzz corpus · close

**SERVED MODEL: claude-opus-5[1m]** · phase 3, serial · **status DONE** — both gates this unit turns
are **GREEN at its own clock, double-run**, the manifest's mode column is provably untouched, and the
wave's nine clauses are re-run below at this seat's own commands. Nothing is inherited from the
baseline table or from a sibling's receipt.

**Sections read at the bytes before writing** (D-19 · METHOD): §Gates **G-W2-7** (769–773) ·
**G-W2-5** (717–735, the third clause whole, its second member **Z3 / KF-KC-17** and the **K-11**
refuting datum) · §Goal criterion (46–51) · §Sequencing (782–853, whole, including the commit-family
line, the packet homing and every cross-edge). The wave record's Open, Baseline, Unit plan and all
three prior unit receipts were read whole first. `COHESION.md` §0j (whole) **and every later addendum
to the file end** (§0k ×2 · §0l · §0m.0/§0m.1/§0m.2) were read for the rulings this unit consumes —
§0j.C **KF-WRITE** is this seat's write authority and its push instruction.

#### Substrate

⟨`git rev-parse HEAD`⟩ at unit open → **`5083c3f8`** (`.c`'s last commit); at close → **`e325018f`**
(KF.W5 `.e` landed on the shared `master` during this sitting). ⟨`git merge-base --is-ancestor
7d958f21 HEAD`⟩ → **YES** throughout. Every figure below was taken at the true bytes at the moment it
was taken, and no anchor is inherited.

**Hard order 2 satisfied**: `.a`'s `da0fbc22` + `500c13fd` precede every cure commit. **Hard order 3
satisfied**: `.b`'s façade `49cd647b` precedes both of this unit's commits. **Hard order 6 (NO REPIN)**:
⟨`node -e "…@mkbabb/value.js/package.json').version"`⟩ → **`4.0.0`**, the installed pin, unmoved.

#### THE TWO STANDING OBLIGATIONS, DISCHARGED BEFORE THE ACTS THEY CONDITION

**(1) KF-AV-28 / §Carry F5 — L-6/C-4's discharge status, read BEFORE the conditional emit-half clause
was spent.** G-W2-7's second clause is conditional: the façade publishes both halves L-6/C-4
hand-rolled *"unless KF.W7's S-9 verdict for the timeline cluster is SWAP"*.

```
⟨awk -F'|' '/^\| KF\.W7 /{print $4}' docs/tranches/X/execution/LEDGER.md⟩ → " planned "
```

**KF.W7 has not sat; no S-9 verdict exists for the timeline cluster; L-6/C-4 is NOT DISCHARGED and the
delegation-target obligation is LIVE at this seat's clock**, exactly as `.b` read it before spending
the emit half at `46f0b77b`. **This unit VERIFIES the target exists rather than re-authoring it** —
⟨`grep -n 'export function parseDeclarationBlock\|export function serializeDeclarationBlock'
src/animation/compile/parse-facade.ts`⟩ → **`:181`, `:202`** — and the G-W2-7 arm landed below
**consumes both halves** on all fourteen fixtures, which is what makes the clause executable rather
than asserted. A SWAP verdict arriving later moots the obligation without invalidating the cure; the
round-trip clause is unconditional and stands either way.

**(2) The §F-2 addendum — VERIFIED, never re-written (the commit-family lock: it is `.a`'s, landed
with the ingress census in ONE commit `500c13fd`).**

```
$ ls docs/tranches/V/apotheosis/parser-proof/ | grep -i addendum
    GATE-VERDICT-F2-ADDENDUM-2026-09-17.md
$ sed -n '42p' docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md
    swap is the cure; no known consumer feeds the crash shape (kf's 37 seams
$ sed -n '3p' docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT-F2-ADDENDUM-2026-09-17.md
    # ADDENDUM BESIDE `GATE-VERDICT.md` §F-2 — 2026-09-17
```

**The pinned authority's `:42` is byte-unchanged and the correction lives BESIDE it** — the epoch rule
and E-3 honoured, and this seat wrote no byte of either file.

#### Acts, in order

**D-0 · E13 unit-level mail sweep** (the four paths ⊕ the atlas **Q** lane, read-only, at this seat's
own clock; classification taken from each row's **status cell**, never a bare `grep -i unread`;
`INBOX.md` self-excluded under SELF-COUNT and **NOT touched** — it is outside this unit's writable set):

```
$ ls -t docs/tranches/V/coordination/ | head -4
    INBOX.md (self-excluded) · value-inbox-2026-09-17-o8-o11-amendment-addendum.md (OURS, outbound)
    · value-inbox-2026-07-27-… · value-inbox-2026-07-24-…   (both rowed)
$ ls -dt ../glass-ui/docs/tranches/*/ | head -3      → BK/ BJ/ BI/        (BK still the newest)
$ ls -t ../glass-ui/docs/tranches/BK/coordination/ | head -4
    …-2026-09-17-{constellation-o20-relay, bbnf-lang-9.0.0-addendum, valuejs-o20-disposition}.md
    = I-33 · I-34 · I-32 · …-2026-08-29-valuejs-o20-ack.md = I-30   — all four rowed
$ ls -t ../keyframes.js/docs/tranches/V/coordination/ | head -4   → vnext/ · VALUEJS-INBOUND-* (letters WE sent)
$ ls -t ../sci-report/atlas/docs/tranches/P/coordination/ | head -3 → unchanged since 2026-08-03, pre-rowed
$ grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md   → 0
```

**0 unrowed · 0 new `I-n` minted · ZERO `UNREAD` status cells in the ledger · `INBOX.md` NOT touched.**
I-32/I-33 were read and consumed at F.W1 unit `b` (INBOX `:167`) and I-34 is addressed to bbnf-lang;
**E13's close condition — *no wave closes with UNREAD mail in scope* — is MET at this wave's close, by
measurement rather than by routing.**

**D-1 · G-W2-7 — the round-trip net reaches the FAÇADE. Commit `0b747396`, one file.**

The corpus was driven through the ENGINE alone (`fromString` → `CSSKeyframesToString`), which reaches
value.js's grammar only transitively: **nothing in the net NAMED the Tier-A seam**, so a seam that
re-grew a second grammar would not have been seen there. A third suite drives the **same fourteen
fixtures** through `compile/parse-facade.ts`, built on **the in-tree oracle precedent the spec names**
— `scroll/grammar.ts:143` `roundTripScrollCSS`, `serialize(parse(s)) ≡ s` — generalised from the
scroll grammar to the whole keyframe corpus. Two legs per row, both dispatched on the manifest's own
`roundtrip` column:

- **(a) REPLAY-EQUALITY AT THE SEAM** — each stop's declarations through the façade's declaration pair
  (`parseDeclarationBlock` / `serializeDeclarationBlock`), with the `verbatim` authored tokens asserted
  present in the façade's own emission.
- **(b) THE ROUND TRIP READ BACK THROUGH THE SEAM** — fixture → façade → engine serialize → façade,
  every animated value compared **stop for stop**, each stop keyed by the values the grammar already
  parsed. **No selector text is emitted anywhere in the arm**: that serializer is MISS-β2's publication
  decision and belongs to KF.W8, and a fourth copy of it in a test is the corruption set this wave
  exists to stop.

The seam arm also asserts what the engine arm structurally cannot: **one** `@keyframes` block comes
back, the **stop count** is the manifest's, the **animated key set** is the manifest's, and a fixture
declaring a per-keyframe `animation-timing-function` has it **LIFTED TYPED** onto `rule.timingFunction`
— a regression leaving it as raw declaration text passes the key-set check and fails that one.

**THE EPSILON ROW IS NOT WIDENED, AND THE MODE COLUMN IS PROVABLY UNTOUCHED.**

```
$ git log --oneline 7d958f21..HEAD -- test/fixtures/keyframes/    → (no output)   ← 0 commits
$ git diff --stat 7d958f21 HEAD -- test/fixtures/keyframes/       → (no output)   ← 0 bytes
$ git ls-tree --name-only HEAD test/fixtures/keyframes/ | grep -c '\.css$'  → 14
```

The mode column was **read and never edited by any seat of this wave**; the chromatic row keeps the
engine arm's own **1e-9** tolerance. **Measured beside the landing and recorded rather than spent**: at
the DECLARATION seam that row is in fact **byte-same**, so the declared value.js oklab handoff is
confined to the interpolated MIDPOINT and does not touch the declaration replay. The row keeps its
declared mode regardless — tightening it on this seat's authority would be the same act as widening it,
performed in the flattering direction.

**Falsifiability MEASURED, not asserted** (the gate's own falsifier is *"a serializer that drops a
channel"*): with a one-line simulated channel drop applied to the replayed side only,

```
$ npx vitest run --project library test/compile/roundtrip-fidelity.test.ts   → 14 failed | 43 passed (57)
$ <reverted>                                                                  → 57 passed (57), twice
```

**14 of 14 rows RED — the epsilon row included, on its number count.** 29 tests → **57**.

**D-2 · G-W2-5 clause 3 — the fuzz corpus reaches the MALFORMED class. Commit `6941e833`, one file.**

The harness's own docblock line, re-read verbatim at the current bytes before a byte was written:

```
$ sed -n '8p' test/compile/grammar-fuzz.test.ts
 * random VALID @keyframes fragments from MODEL grammars (not raw-string fuzz),
```

That is why it could never have caught either banked class: **a model grammar emits no call with an
empty argument list, and no character its own alphabet lacks.** Both classes land, because the spec's
own words are that either alone leaves the class *"half-covered by construction"*:

**(i) MALFORMED SYNTAX — the empty-argument colour form (R1)**, modelled over five functions × two
colour properties, each paired with the WELL-FORMED control of the **same** function. Measured against
the installed 4.0.0 before the assertions were written, all five:

```
$ <five empty-argument forms through kf's own fromString>
  oklch() · rgb() · hsl() · lab() · color()   → THROW TypeError   (5 of 5)
$ <the same five through the façade's SWALLOW posture>
  swallowParsed(() => parseStylesheet(css), …, "fallback")  → "fallback"   (5 of 5)
$ <the well-formed control of each, through the structural round trip>
  oklch(0.6 0.1 200) · rgb(10, 20, 30) · hsl(200 50% 50%) · lab(50% 20 -30)
  · color(display-p3 1 0 0)             → ok, byte-stable   (5 of 5)
```

Three arms ride those three readings: the **throw** arm is a DECLARED tripwire at the pinned 4.0.0 —
when KF.W3's repin to `RC-P(V)` turns it into an `ok:false` the arm reds, **which is the repin's
headline rather than a footnote nobody noticed** (the §Sequencing cross-edge's own instruction); the
**SWALLOW** arm is the kf-side invariant that holds in EITHER direction across the repin, and it makes
the façade's own claim executable (**ABSORB is unreachable on this class** — it absorbs refusals and
this throws); the **control** arm proves the refusal tracks the ARGUMENT LIST and never the function
name.

**(ii) CHARACTER-CLASS INPUT DELIVERED OFF THE MODEL CHANNEL — Z3 / `KF-KC-17`'s 4×NBSP.** The payload
is injected **INTO** the model's output at three sites (`indent` — the literal `range.insertNode` case
— `post-colon`, and `both`), because the generator cannot reach the class by construction: that is the
whole content of *"off the model channel"*.

**THE ARM ASSERTS THE PARSE SUCCEEDS AND THE MODEL IS WHAT DIVERGED.** value.js's `/\s/` **matches**
U+00A0 — banked as **`K-11`** ⟨kf-KeyframesAddDialog `:107`⟩ with a do-not-re-derive lock, **CITED in
the docblock and never re-probed by this seat**. Measured over 120 model-generated declarations at
both injection sites before the arm was written: **runs=120, bad=0** — every input parses, every
serialized model carries **ZERO** U+00A0, every round trip is byte-stable. So the defect is the
**BYPASSED MODEL CHANNEL** — the DOM holds characters the model never recorded, and the two disagree
until the next remount — not *"a character the parser cannot swallow"*. The component cure stays
CARD-UNIT's; this is the census's executable half.

**Falsifiability MEASURED**: inverting the three load-bearing assertions (the throw, the SWALLOW
containment, the model's zero-NBSP) → **3 of 3 RED**; reverted → **9 passed (9)**, twice. 5 tests → **9**.

**D-3 · A pre-existing serializer duplicate, measured in an ISOLATED CLONE at the ref of record rather
than attributed to this wave.** The façade read of the engine's emission showed the three easing
fixtures carrying `animation-timing-function` **twice** per stop (the declaration `parsedVars` retains,
plus the lifted `templateFrame.timingFunction` re-emitted). Rather than assume its provenance, a clean
clone was taken at the wave's own ref:

```
$ git clone --no-hardlinks … && git checkout 7d958f21
$ <CSSKeyframesToString over the three easing fixtures>
  per-kf-easing.css: atfCount=2   steps-easing.css: atfCount=2   linear-easing.css: atfCount=2
```

**PRE-EXISTING, byte-identical at HEAD; this wave introduced nothing.** It is idempotent on re-parse
(a duplicate declaration is last-wins with the same value), which is why the corpus passes today and
passed at `7d958f21`. Recorded as a residual with its owner named, **not cured**: `emit/format/format.ts`
is `.c`'s file under hard order 4 and the emit surface is MISS-β2's, and the G-W2-7 arm is therefore
built on the **animated** property set with the easing channel asserted as a **typed lift** — which is
the stronger check, not an evasion of the duplicate.

#### Gate readings — BEFORE → AFTER, each double-run with identical output

| gate | BEFORE (at `7d958f21`, the baseline table's reading, re-derived by this seat where a control was possible) | AFTER (at `e325018f`, this seat's own commands) | verdict at this unit |
|---|---|---|---|
| **G-W2-7** | 14 `.css` + `manifest.json`; **no fixture exercises a façade** — the suite named the engine and never the seam; 29 tests | the same **14 `.css` + `manifest.json`, 0 commits and 0 bytes of diff since the ref**; a third suite drives all 14 **through `parse-facade.ts`** at the manifest's declared mode, two legs each; **57 tests**, double-run identical. Simulated channel drop → **14 of 14 RED**; reverted → 57 of 57 | **GREEN.** All 14 fixtures pass through the façade at the mode they pass today; the epsilon row is neither widened nor tightened; the mode column is untouched and the conditional emit-half clause is discharged on a LIVE (not-discharged) L-6/C-4 reading, stated before it was spent |
| **G-W2-5, clause 3** | `grammar-fuzz.test.ts:8` docblock verbatim — *"random VALID @keyframes fragments from MODEL grammars (not raw-string fuzz)"*; **0 malformed inputs**, 5 tests | the docblock line **byte-unchanged** and now cited as the reason the extension exists; **both** classes generated — malformed SYNTAX (5 forms × 2 properties, 3 arms) **and** the off-model character class (3 injection sites); **9 tests**, double-run identical. Inverted assertions → **3 of 3 RED** | **GREEN.** The malformed corpus covers SYNTAX and CHARACTER-CLASS; the character arm asserts the parse SUCCEEDS and the MODEL diverged, on K-11's cited (never re-derived) datum |

#### Residuals

- **R-1 · The duplicate `animation-timing-function` emission is PRE-EXISTING and UNCURED** (D-3). Owner:
  `emit/format/format.ts` (`.c`'s file, hard order 4) and the emit surface MISS-β2 (**KF.W8**). Harmless
  today (idempotent on re-parse); recorded so it is not rediscovered as this wave's.
- **R-2 · `test/fixtures/keyframes/` was in this unit's writable set and NOTHING was written there.**
  Adding a fixture would have required a manifest row and therefore a mode-column edit, which the
  wave's own lock forbids the implementing seat; the malformed corpus is generated, not filed. The
  writable path is declared used-and-unwritten rather than left ambiguous.
- **R-3 · The `test/` LAW-A census (A-5) is UNMOVED at 10.** ⟨`git grep -l 'from "@mkbabb/value.js/css"'
  HEAD -- test/ \| wc -l`⟩ → **10**. Both of this unit's files import the **façade**, never the package:
  a test that reached the package directly to test the façade would have moved a frozen number for
  nothing, which is the defect `.b` cured at `36b4615a` and this seat did not re-open.
- **R-4 · No LEDGER cell of another wave was touched**; only KF.W2's own row and one appended event line.
- **NOT PERFORMED, and why**: no `INBOX.md` edit (outside the writable set, and 0 unrowed); no spec byte
  (E-3 — the spec, the registries, the §F-2 addendum and every prior receipt are immutable to this seat);
  no `scripts/dev/dev.sh`; no amend, no stash, no reset, no force.

#### Commits

| hash | contents |
|---|---|
| **`0b747396`** | `test/compile/roundtrip-fidelity.test.ts` — the façade arm over all 14 fixtures (G-W2-7). 1 file |
| **`6941e833`** | `test/compile/grammar-fuzz.test.ts` — the malformed corpus, both classes (G-W2-5 clause 3). 1 file |
| *(this section + the close)* | `docs/tranches/X/execution/B/KF-W2.md`, `docs/tranches/X/execution/LEDGER.md` — pathspec, per meaning |

**Hygiene**: both commits carry their own pathspec **on the commit itself** and were verified by
`git show --stat` to contain **exactly one declared file each** — **0 sibling files swept in** across
four concurrent seats on one index. `scripts/dev/dev.sh` appears in **0 of 2**. No `git add -A`/`-u`,
no `commit -a`, no reset, no stash, no amend, no force. The measurement instruments were kept **inside
this unit's own writable file** and reverted from a saved copy at each step, so **no transient probe
file was ever created in the shared tree** ⟨`git status --porcelain`⟩ → the two untracked KF.W1 mail
packets only, exactly as at wave open.

---

## Close — the nine clauses re-run at the close seat's own clock (`.d`, 2026-09-17)

**Every command below was run by this seat, twice, with identical output. Nothing is inherited from
the baseline table, from a unit receipt, or from the spec's prose.** Substrate: keyframes.js
`e325018f` (HEAD ≡ `origin/master` after this wave's push; `7d958f21`, the wave's declared ref, an
ancestor), value.js at the current tree bytes, `@mkbabb/value.js` **4.0.0** installed — **NO REPIN**
(OP-5), so every reading describes the measured artifact the spec names.

| # | clause | baseline at `7d958f21` | AT THIS SEAT'S CLOCK | verdict |
|---|---|---|---|---|
| 1 | **G-W2-1** posture registry | `ls …/keyframes/registries/` → **No such file or directory**; 0-of-N enumerated | `ls` → `INGRESS-CENSUS.md POSTURES.md`; §1 floor rows → **20**; corpus ⟨`ls …/registry/adjudicated/kf-*.md \| wc -l`⟩ → **58**; **site limb**: ⟨`git grep -nE '\.ok\b' HEAD -- src/ \| grep -v parse-facade`⟩ → **(no output)** — **ZERO parse-failure branches anywhere in `src/` outside the façade** | **GREEN** (enumeration + site) |
| 2 | **G-W2-2** Tier-A single entry | 25 runtime specifiers over 13 modules, **10** of them the parse surface; 21 call sites; no `parse-facade.ts` | **20 runtime specifiers over 5 modules** — `parse-facade.ts` ×15 · **`engine/css/metadata.ts` ×2** · `emit/css-text.ts` ×1 + `frame/interp-slot.ts` ×1 (the emit half, out of denominator by the gate's own words) · `resolve/function.ts` ×1 (the declared stray). **Parse-surface paths 10 → 2** | **HONEST-RED on exactly one module** — `engine/css/metadata.ts` is **not in §Bounds' Owned files**; the ESCALATION `.b` returned stands, un-widened |
| 3 | **G-W2-2b** (MONITOR) | 7 files · 6 runtime modules · 8 runtime specifiers under `demo/` | **7 · 6 · 8**, module-for-module identical; `test/` **10** (census A-5 unmoved), `scripts/` **0** | **TRUE — the monitor holds.** This wave opened no demo call site |
| 4 | **G-W2-3** Tier-C deletion | comment-stripped scan over the five files at `7d958f21` → **6 SURVIVES of 6** (re-derived by this seat in an isolated clone, not inherited) | the same scan at HEAD → **0 SURVIVES of 6**, twice | **GREEN**, with a real before/after control |
| 5 | **G-W2-4** cssom injection cure | `new RegExp(` in `cssom.ts` CODE (comments stripped) → **1** (re-derived at `7d958f21`) | → **0**, twice; `test/ingest/keyframes-name-escapes.test.ts` → **17 passed (17)** | **GREEN** on both clauses the wave owns; `.c`'s RED-BY-PRODUCER residual (value.js 4.0.0 refuses an escaped ident in the declaration-VALUE position) stands **routed to X·V**, pinned by the fixture's clause (c) |
| 6 | **G-W2-5** R1 census + §F-2 + the malformed corpus | `GATE-VERDICT.md:42` returns the phrase; **no addendum file**; fuzz docblock generates VALID fragments only | `:42` **byte-unchanged** (E-3); `GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` present BESIDE it; `INGRESS-CENSUS.md` published; the fuzz corpus reaches **both** malformed classes, **9 passed (9)** twice, inverted assertions **3 of 3 RED** | **GREEN** — clauses 1–2 (`.a`), clause 3 (`.d`) |
| 7 | **G-W2-6** entry-point contract | the contract does not exist (**0-of-1**) | `test/compile/valuejs-contract.test.ts` **16 tests / 6 clauses** green; freeze invariant re-measured ⟨`git grep -c 'isFrozen\|Object.freeze' HEAD -- src/`⟩ → `interp-slot 1 · browser 4 · conditional 9 · core 6 · function 3` = **23 LINES over 5 modules**; the pin still **`:43` `:67` `:84`** (three assertions) | **CONTRACT CLAUSE GREEN.** The call-site limb is **KFED-UNIT's** by the gate's own restriction — this wave opens no call site |
| 8 | **G-W2-7** round-trip net | 14 `.css` + `manifest.json`; no fixture exercises a façade; 29 tests | all **14** through the façade at the manifest's declared mode; **57 passed (57)** twice; fixtures dir **0 commits / 0 bytes** changed since the ref; simulated channel drop → **14 of 14 RED** | **GREEN** |
| 9 | **G-W2-8** serializer publication | 3 copies, 0 exported | copies re-verified at HEAD: `emit/format/format.ts:20` (private) · `emit/css-text.ts:59` (private) · `demo/utils/keyframeSelector.ts:7` (exported); ⟨`grep -cE 'selectorText\|serializeSelector' src/animation/compile/emit/index.ts`⟩ → **0**. Order re-measured: ⟨`awk … LEDGER`⟩ **KF.W8 = `planned`** — it has **NOT** preceded | **FAÇADE-SIDE CONTRACT CLAUSE GREEN · COUNT ARM RED AND HOMED** at `KF-W8 §Rows · MISS-β2 (unit d · G3)`, which is where the spec itself homes it |

**READ PLAINLY: 7 of the 8 gates GREEN · 1 HONEST-RED on one out-of-bounds module · the declared
MONITOR TRUE · 0 undeclared GREEN and 0 gate claimed on another seat's measurement.**

### Tree health at the close (double-run, whole project)

```
$ npx vitest run --project library    → 1256 passed | 3 expected fail | 14 skipped (1273)   [twice, identical]
$ npx tsc --noEmit -p tsconfig.lib.json → 3 errors: group/composite/compositor.ts:79 ·
                                          group/waapi.ts:9 · physics/smooth.ts:194   — ALL pre-existing
$ npx tsc --noEmit -p tsconfig.test.json → 24 errors — the pre-existing count; **0 in either `.d` file**
$ npm run proof:structure              → PASS: scope=src clean (0 violations across R1–R6)
$ npx depcruise --config … src demo    → 4 violations / 435 modules — identical to `.b`'s reading; 0 new
```

**The suite grew 1211 → 1256 across `.c`'s close and this unit's two landings (+45: 28 façade rows,
4 malformed arms and the siblings' own); zero regressions, zero skips added, zero `.skip`, zero
allowlist entry, zero `try/catch` around a defect.**

### The push (COHESION §0j.C **KF-WRITE**: *"every wave pushing `origin HEAD` at close"*)

```
$ git fetch origin && git log --oneline origin/master..HEAD | wc -l   → 35
$ git push origin HEAD                                                 → 7d958f21..e325018f  HEAD -> master
$ git rev-parse HEAD origin/master   → e325018f… / e325018f…   (identical)
$ <merge-base --is-ancestor, each of this wave's 13 kf commits vs origin/master>  → 13 of 13 ON origin/master
```

**All thirteen of this wave's keyframes.js commits are published.** The push necessarily carried **22
sibling commits** already resident on the shared `master` (KF.W5's band and the KF.W4 repair) — a
branch cannot be pushed in parts, and the ruling's instruction is `origin HEAD`. **This seat authored
none of those 22 and claims none of them**; they are named here so the range is not read as this
wave's. The wave's own two `.d` commits are `0b747396` and `6941e833`.

### The wave's goal criterion, measured against its own words

*"exactly one module in `src/animation/**` that speaks to value.js's grammar"* — **two paths carry a
runtime grammar/collector edge**: `parse-facade.ts` (15 specifiers, the whole surface) and
`engine/css/metadata.ts` (2 collectors), the second **outside §Bounds** and returned as an escalation
rather than written into. *"exactly one declared thing that happens when a CSS string is bad"* —
**MET**: four named postures, **zero** `result.ok` branches anywhere in `src/` outside the façade,
and a registry of **20** enumerated over **58** records. *"one published answer to which grammar
belongs at this seam"* — **MET**: the contract exists, is executable at 16 tests, and now has a
round-trip net and a malformed corpus behind it. *"A wave that adds a wrapper and leaves the twenty-one
call sites and the nineteen enumerated postures standing has failed this goal"* — **19 of 21 call
sites routed; 20 postures enumerated; the 2 that stand are one module the spec's own §Bounds omits.**

### The ONE thing the next seat must not re-discover

**`src/animation/engine/css/metadata.ts` needs a dated §Bounds addendum-beside naming the path** (E-3;
never a seat's own widening). The cure is one import-line repoint of two collector symbols plus their
two call sites — bounded, mechanical, and the last thing between G-W2-2 and green. Everything else in
this wave is landed, measured and pushed.

---

## Close — THE CLOSE SEAT's independent verification (VERIFY-ONLY, 2026-09-17)

**SERVED MODEL: claude-opus-5[1m]** · **VERIFY-ONLY: this seat cured nothing and wrote no product
byte.** It re-ran every gate at its own clock, twice, from the settled bytes — **nothing below is
inherited from the baseline table, from a unit receipt, or from `.d`'s close.** Where a figure agrees
with a prior seat's, it agrees because it was re-measured, not because it was copied. `.d`'s close
above is a prior seat's receipt and is **immutable to this seat (E-3)**; this section stands **beside**
it and, where the two differ, says so by name.

Substrate: keyframes.js **`e325018fb257540d6103950c3ab3c6195f51c5e2`** ≡ `origin/master`
⟨`git rev-parse HEAD origin/master`⟩, the wave's ref `7d958f21` an ancestor
⟨`git merge-base --is-ancestor 7d958f21 HEAD` → YES⟩, `git rev-list --count origin/master..HEAD` → **0**;
kf worktree carries the two untracked KF.W1 mail packets and **nothing else**. value.js at
`8b7259f9`. `@mkbabb/value.js` **4.0.0** installed ⟨`node -e "…/package.json').version"`⟩ — **NO REPIN**
(OP-5 holds at the close seat's clock).

### ACT 1 — every commit exists, and every commit touched ONLY its unit's writable set

⟨`git show --name-only` on each of the 19 commits⟩. **Fifteen product/registry commits + four record
commits; 0 sibling files swept in; `scripts/dev/dev.sh` appears in 0 of 19.**

| unit | commits | files touched | inside the unit's declared writable set? |
|---|---|---|---|
| `.a` | `da0fbc22` · `500c13fd` · `4c567acd` | `registries/POSTURES.md` · (`registries/INGRESS-CENSUS.md` + `parser-proof/GATE-VERDICT-F2-ADDENDUM-2026-09-17.md`, **2 files in ONE commit**) · the record | **YES, 3 of 3.** The declared commit family is **UNSPLIT** — verified by `--name-only`, exactly two files in `500c13fd` |
| `.b` | `49cd647b` · `46f0b77b` · `36b4615a` · `b01b7472` | 10 files (`parse-facade.ts` + the nine repoints) · 3 files (contract + façade + `emit/css-text.ts`) · 1 file · the record | **YES, 4 of 4.** Façade + its first repoints = ONE commit (hard order 3 · the declared family); contract + conformance test = ONE commit |
| `.c` | `f7cbc41c` · `0cfd3b5f` · `55347314` · `02a87f7a` · `a461c78c` · `0ecaadb3` · `6e371fd4` · `5083c3f8` · `3f21085a` | each 1–3 files, all in `.c`'s set | **YES, 9 of 9.** `emit/format/format.ts` carries **no `.b` commit** ⟨`git log --name-only -- …format.ts`⟩ — hard order 4 held |
| `.d` | `0b747396` · `6941e833` · `8b7259f9` | 1 file · 1 file · (record + LEDGER) | **YES, 3 of 3** |

**Bounds verdict: ZERO writes outside a declared writable set, across four seats on one shared index.**
`emit/format/index.ts`, `emit/index.ts`, `frame/compiler.ts`, `engine/css/animation.ts` and
`engine/css/metadata.ts` are each **untouched** — the four declared-and-unwritten paths and the one
escalation, exactly as the receipts state.

### ACT 2 — the nine clauses, re-run BY THIS SEAT, each double-run with identical output

| # | gate | BEFORE (re-derived at `7d958f21` by THIS seat where a control exists) | AT THIS SEAT'S CLOCK (`e325018f`) | verdict |
|---|---|---|---|---|
| 1 | **G-W2-1** | `ls …/keyframes/registries/` → **No such file or directory** (the dir is born in `da0fbc22`) | `ls` → `INGRESS-CENSUS.md POSTURES.md`. **Enumeration**, by the registry's own self-count commands re-run here twice: floor ⟨`awk '/^## §2/{exit} /^\| \*\*[0-9]+\*\*/{n++}'`⟩ → **20**; positive rows ⟨same, §2..§3⟩ → **6**, outside the count; basis rows → **58**, distinct records → **58**; corpus ⟨`ls …/registry/adjudicated/kf-*.md \| wc -l`⟩ → **58** — **basis ≡ corpus, so the "basis smaller than the corpus" falsifier does not arm**. **Site limb**: ⟨`git grep -nE '\.ok\b' HEAD -- src/ \| grep -v parse-facade`⟩ → **0**, twice; and the one non-façade runtime importer's three `try/catch` lines ⟨`metadata.ts:157-159`⟩ were **read**: they guard `CSS.registerProperty`, **not a parse failure** | **GREEN** (enumeration + site), with the drift below recorded |
| 2 | **G-W2-2** | 25 runtime specifiers / 13 modules / 10 parse-surface paths (spec's stated reading) | command (ii) re-run whole, twice: **20 runtime specifiers over 5 modules** — `parse-facade.ts` **×15** · **`engine/css/metadata.ts` ×2** · `emit/css-text.ts` ×1 · `frame/interp-slot.ts` ×1 (the emit half, out of denominator by the gate's own words) · `resolve/function.ts` ×1 (the declared stray). **Parse-surface paths 10 → 2** | **HONEST-RED on exactly one module**, re-confirmed at the bytes. `engine/css/metadata.ts` is **not in §Bounds' Owned files**; the escalation stands **returned and un-widened** |
| 3 | **G-W2-2b** (MONITOR) | 7 files / 6 modules / 8 runtime specifiers | **7 · 6 · 8**, module-for-module identical, twice; `test/` **10**, `scripts/` **0** — **all four quadrants measured, neither clause re-scoped to `src/`** | **TRUE — the monitor holds** |
| 4 | **G-W2-3** | comment-stripped scan re-derived by THIS seat at `7d958f21`: `catalog.ts:16` ✓ · `view-transition:146` `matchAll` ✓ · `CQ_UNIT_RE:136` ✓ · `composition:175` ✓ · `format.ts` `let s = keyframe` ✓ · `draw-svg:89` ✓ → **6 SURVIVES of 6** | the same scan at HEAD → **0 of 6**, twice. The only textual hits left are prose. **Second clause verified per member** ⟨`git show <h> \| grep '^+'`⟩: `55347314` lands the positional cut · `0cfd3b5f` lands `declaredDeclarationsFor` + the positional trim · `a461c78c` lands `parseCssValues`+`swallowParsed` · `0ecaadb3` lands `parseCssScalar` — **no deletion landed without its replacement in the same commit** | **GREEN**, on a control this seat derived itself |
| 5 | **G-W2-4** | `new RegExp(` in `cssom.ts` CODE (comment lines dropped) at `7d958f21` → **1** | → **0**, twice; `test/ingest/keyframes-name-escapes.test.ts` → **17 passed (17)** | **GREEN** |
| 6 | **G-W2-5** | `GATE-VERDICT.md:42` returns the phrase; `ls parser-proof/ \| grep -i addendum` → (no output); fuzz docblock `:8` generates VALID fragments only | `:42` **byte-identical** — and the authority's last commit is ⟨`git log -1 -- GATE-VERDICT.md`⟩ **`befbc05a`, an X-W0 commit, NOT this wave's**: the epoch rule held by provenance, not only by inspection. `GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` present **BESIDE** it (145 L, `SERVED MODEL` line 1). `INGRESS-CENSUS.md` published: boundary set **32 negative cells over 32 distinct records** (12+11+9), demo census **frozen** at §4. Clause 3: `grammar-fuzz.test.ts` **9 passed (9)** twice, docblock `:8` **unchanged** and now cited, both classes present ⟨7 empty-argument colour hits · 14 NBSP hits⟩ | **GREEN** (clauses 1–2 `.a` · clause 3 `.d`) |
| 7 | **G-W2-6** | the contract does not exist (**0-of-1**) | `test/compile/valuejs-contract.test.ts` → **16 passed (16)**, twice; clauses **0–5 read at the bytes by this seat**: clause 0 asserts façade↔package **identity**, clause 2 asserts `Object.isFrozen` on envelope **and** payload **and** `toThrow(TypeError)` on a consumer write — **each narrowing `if (resolved.ok)` is preceded by `expect(resolved.ok).toBe(true)`, so no freeze assertion can pass vacuously** (checked, because a conditional assertion is how this clause could have shipped hollow); clause 3 pins `String(payload) === "[object Object]"`. Freeze invariant ⟨`git grep -c 'isFrozen\|Object.freeze' HEAD -- src/`⟩ → **23 LINES** over 5 modules; pins ⟨`Object.isFrozen` in `value4-immutable-resolve.test.ts`⟩ → **3** | **CONTRACT CLAUSE GREEN.** The call-site limb is KFED-UNIT's by the gate's own restriction; this wave opened no call site (G-W2-2b's demo census is unmoved, which is the same fact measured from the other side) |
| 8 | **G-W2-7** | 14 `.css` + `manifest.json`; no fixture exercises a façade | **14 `.css` + `manifest.json`**; ⟨`git diff --stat 7d958f21 HEAD -- test/fixtures/keyframes/`⟩ → **empty — 0 bytes**, so the mode column is **provably unedited by any seat of this wave**; `roundtrip-fidelity.test.ts` → **57 passed (57)**, twice, and the suite names `parse-facade` ⟨2 hits⟩ and is manifest-driven | **GREEN.** *The falsifier (simulated channel drop → 14 of 14 RED) is `.d`'s measurement and was **NOT** re-derived here: re-running it requires writing into `.d`'s file, which is outside a VERIFY-ONLY seat's writable set. Stated rather than silently inherited.* |
| 9 | **G-W2-8** | 3 copies, 0 exported | copies re-read at HEAD: `emit/format/format.ts:20` (private) · `emit/css-text.ts:59` (private) · `demo/utils/keyframeSelector.ts:7` (exported); ⟨`grep -cE 'selectorText\|serializeSelector' src/animation/compile/emit/index.ts`⟩ → **0**. Order re-measured ⟨`awk -F'\|' '/^\| KF\.W8 /' LEDGER.md`⟩ → **`planned`** — KF.W8 has **NOT** preceded | **FAÇADE-SIDE CONTRACT GREEN · COUNT ARM RED AND HOMED** at `KF-W8 §Rows · MISS-β2 (unit d · G3)` |

**READ PLAINLY, at this seat's own commands: 7 of 8 gates GREEN · 1 HONEST-RED on one out-of-bounds
module · the declared MONITOR TRUE · 0 undeclared GREEN · 0 gate claimed on another seat's measurement.**

### ACT 3 — the verification artefacts, run as written

The spec declares no `§Verification Artefacts` heading; its verification artefacts are **the gate
witness commands** (ACT 2, each re-executed above) **and the tree's own gates**. Run whole, double-run:

```
$ npx vitest run --project library     → 112 passed | 5 skipped (117) files
                                         1256 passed | 3 expected fail | 14 skipped (1273)   [twice, identical]
$ npx vitest run --project library <the wave's four files>
                                       → 4 files, 99 passed (99)   [twice]   = 17 + 16 + 57 + 9
$ npx tsc --noEmit -p tsconfig.lib.json  → 3 errors — compositor.ts:79 · waapi.ts:9 · smooth.ts:194
                                           ALL pre-existing; none of the three files appears in any of the 19 commits
$ npx tsc --noEmit -p tsconfig.test.json → 24 errors (pre-existing); 0 in ANY of the wave's four test files
$ npm run proof:structure                → PASS: scope=src clean (0 violations across R1–R6)
$ npx depcruise --config .dependency-cruiser.cjs src demo
                                         → 4 violations / 435 modules, 1557 dependencies — all four are demo/ no-cycle rows
```

**No-masking audit, run because the standing law names each of these a HIGH defect:**

```
$ grep -nE '\.(skip|only|todo)\(|xit\(|xdescribe\(' <the wave's four test files> | wc -l   → 0
$ git diff --stat 7d958f21 HEAD -- scripts/gates/                                          → (empty) — 0 allowlist entries
$ for h in <the ten src-touching commits>; do git show $h -- 'src/*' | grep '^+' | grep -cE 'catch *[({]'; done
                                                                                           → 1 across ten commits
```

**The one added `catch` was read, not counted**: it is the façade's **SWALLOW** posture
(`parse-facade.ts:139`), and `git show 7d958f21:src/animation/validate.ts` shows the identical
`try { … } catch { return []; }` already in the tree at `keyframesNames` — the posture G-W2-1's own
witness list names as library posture #3. **It is a declared posture being collapsed, not a try/catch
placed around a defect.** Its only other consumer is `composition.ts:202`, the Tier-C member-4
replacement.

### ACT 4 — E13, swept again at this seat's clock

Four paths + the atlas **Q** lane, read-only; classification taken from each row's **status cell**,
never a bare `grep -i unread` (the X.P.W0 D-1 instrument failure):

```
$ ls -t docs/tranches/V/coordination/ | head -4        → INBOX.md (self-excluded, SELF-COUNT)
                                                         value-inbox-2026-09-17-… (OURS, outbound) · the two rowed 07-2x
$ ls -dt ../glass-ui/docs/tranches/*/ | head -3        → BK/ BJ/ BI/         (BK still newest)
$ ls -t ../glass-ui/docs/tranches/BK/coordination/     → the three 2026-09-17 @17:43 = I-33 · I-34 · I-32, all rowed
$ ls -t ../keyframes.js/docs/tranches/V/coordination/  → VALUEJS-INBOUND-* — letters WE sent
$ ls -t ../sci-report/atlas/docs/tranches/P/coordination/ → unchanged since 2026-08-03 15:01, pre-rowed
$ awk -F'|' '/^\|/{for(i=2;i<=NF;i++){gsub(/^ +| +$/,"",$i); if($i ~ /^\*{0,2}UNREAD\*{0,2}$/) print NR}}' INBOX.md
                                                       → (no output) — ZERO rows whose STATUS CELL is UNREAD
```

The bare string `UNREAD` appears on **32** lines of `INBOX.md` and **not one of them is a status
cell** — which is exactly why the column scan above is the instrument and the bare count is not.
**0 unrowed · 0 new `I-n` · `INBOX.md` NOT touched by this seat.** I-32 · I-33 · I-34 carry Routing
cells naming **X-W0.j / the X formation mail seat** — glass-producer rows, routed away from Track B.
**E13's close condition is MET.**

### ACT 5 — the push, verified rather than repeated

```
$ git -C ../keyframes.js fetch origin && git rev-parse HEAD origin/master
    e325018fb257540d6103950c3ab3c6195f51c5e2 / e325018fb257540d6103950c3ab3c6195f51c5e2
$ git rev-list --count origin/master..HEAD                                    → 0
$ <merge-base --is-ancestor, each of the 13 kf commits vs origin/master>      → 13 of 13 ON origin/master
```

`.d` performed the kf push at its close and **this seat re-verified it rather than pushing again**.
The value.js side is pushed by this seat with this section (ACT 7 of the close roster).

### THE GATE TABLE, BEFORE → AFTER (the wave's own arc, stated once)

| gate | at wave-open `7d958f21` | at the close seat's clock `e325018f` |
|---|---|---|
| G-W2-1 | RED — no registry; 0-of-N enumerated | **GREEN** — 20 floor rows / 6 positive / 58-of-58 basis; 0 out-of-façade `.ok` |
| G-W2-2 | RED — 25 specifiers / 13 modules / 10 parse-surface paths | **HONEST-RED** — 20 / 5 / **2**; the last edge on an out-of-§Bounds module |
| G-W2-2b | MONITOR TRUE (declared, not born-RED) | **TRUE** — 7 · 6 · 8, unmoved |
| G-W2-3 | RED — 6 of 6 regex bodies | **GREEN** — 0 of 6, each replacement in the deletion's own commit |
| G-W2-4 | RED — 1 constructed `RegExp` on the author's identifier | **GREEN** — 0, fixture 17/17 |
| G-W2-5 | RED — §F-2 uncorrected; no malformed corpus | **GREEN** — addendum BESIDE (`:42` byte-identical), census published, corpus 9/9 |
| G-W2-6 | RED — contract 0-of-1 | **GREEN (contract clause)** — 16 tests / 6 clauses, freeze + shape + postures |
| G-W2-7 | RED — no fixture reaches a façade | **GREEN** — 14/14 through the façade, 57/57, manifest 0 bytes changed |
| G-W2-8 | RED — 3 copies, 0 exported | **GREEN (façade-side) · count arm RED-and-HOMED** at KF.W8 |

### COMMIT ROSTER (19, each pathspec-exact)

**keyframes.js (13, all on `origin/master`)**: `49cd647b` · `46f0b77b` · `36b4615a` (`.b`) ·
`f7cbc41c` · `0cfd3b5f` · `55347314` · `02a87f7a` · `a461c78c` · `0ecaadb3` · `6e371fd4` ·
`5083c3f8` (`.c`) · `0b747396` · `6941e833` (`.d`).
**value.js (6)**: `da0fbc22` · `500c13fd` (`.a`'s registries + the §F-2 addendum) · `4c567acd` ·
`b01b7472` · `3f21085a` · `8b7259f9` (the four unit receipts + `.d`'s close + the LEDGER row), **plus
this close-seat section's own commit**.

### THE FOUR-VERB LINE — moved exactly as the spec's own table says it moves, and no further

The spec's verb table reads **IMPLEMENTED | NO | *"gates green + bytes landed at the named execution
site stamps this"*** and **VERIFIED | NO | *"stamped only at X·KF's close; no wave stamps VERIFIED at
its own close."***

**VERIFIED is NOT stamped here** — this wave's own seat may not stamp it, and this close seat does not.

**IMPLEMENTED is stamped PARTIALLY, and this seat corrects `.d`'s cell to say so.** `.d` wrote the
LEDGER status as `IMPLEMENTED 2026-09-17 (honest-RED: G-W2-2 on ONE out-of-bounds module)` — the
disclosure is exact and honest, and the **verb** is one step ahead of the evidence the spec conditions
it on: **the table's own condition is *gates green*, and one gate is RED.** The wave's Goal criterion
is measurable in the same direction: *"exactly one module in `src/animation/**` that speaks to
value.js's grammar"* — **two paths carry a runtime grammar/collector edge.** So the cell is corrected
to **`PARTIAL`**, with what remains named in the cell itself, and with the two limbs dependents
actually wait on stated so no consumer reads `PARTIAL` as *nothing usable*: **the posture registry
KF.W7 may not decide ahead of is PUBLISHED, and the façade KF.W3's repin lands in is BUILT.** This is a
verb correction at the ledger cell, **not** a re-litigation of `.d`'s measurements — every one of which
this seat reproduced.

### RESIDUALS, each with a named owner

1. **G-W2-2's last edge — `src/animation/engine/css/metadata.ts`** (2 collector specifiers, calls `:42`
   and `:102`). **Owner: the X·KF formation** — a dated **§Bounds addendum-beside** naming the path
   (E-3, never a seat's own widening), then one import repoint of two symbols plus their two call
   sites. **This is the last thing between G-W2-2 and green**, and it is the one residual that moves
   the wave's verb.
2. **The floor-integer drift inside the spec: G-W2-1's assertion line, its second footnote and its
   carriage sentence read `19 / five` (round-5 text) while §Carry F3's tail reads `20` and its positive
   block carries `six`** ⟨verified at the spec bytes by this seat: F3 row 20 = `KF-KE-58 · C-m7`, *"19 →
   20 at repair round 6, PASS-6 D-4 · escape E3"*; the sixth positive bullet = kf-KeyframesEditor
   ruling 9 `:153`, *"added at repair round 6, PASS-6 D-3 · escape E2"*⟩. `.a` published **20 / 6** and
   that is the correct disposition — *the register is the gate*, and a registry publishing 19 while F3
   enumerates 20 would red G-W2-1 by its own falsifier (*"the gate reds on an unenumerated posture"*).
   **Owner: the next KF-W2 repair round / check**, to reconcile in the gate's own voice. **No spec byte
   was edited by any seat of this wave.**
3. **G-W2-8's 3 → 1 publication act.** **Owner: KF.W8 (`§Rows · MISS-β2`, unit d / G3)**; measured
   `planned` at this clock, so the act has not preceded and was not performed here.
4. **value.js 4.0.0 refuses a CSS escape — and any non-ASCII identifier — in the DECLARATION-VALUE
   position** while accepting both in the `@keyframes` NAME position (`.c`'s measured residual, pinned
   by the fixture's clause (c) so it reds when the producer changes). **Owner: X·V / the value.js
   parser layer** — the same R1/VJ-9 class the ingress census books.
5. **The duplicate per-stop `animation-timing-function` emission** — measured PRE-EXISTING in an
   isolated clone at `7d958f21`, idempotent on re-parse. **Owner: `emit/format/format.ts` / MISS-β2
   (KF.W8)**; not this wave's and not cured here.
6. **`emit/format/index.ts` does not export `declaredDeclarationsFor` / `DeclaredDeclaration`**, so its
   *"single cross-boundary surface"* docblock sentence is imprecise for two symbols. The barrel is in
   **neither** `.c`'s writable set **nor** §Bounds' Owned files, so `.c` imported from the file and
   returned the gap. **Owner: KF.W8 / a §Bounds addendum** — the owed act is one export line plus that
   sentence.
7. **NEW, measured by this seat and recorded so it is not rediscovered as a silent change.**
   `engine/composition.ts`'s Tier-C member-4 cure also changed a cache edge: the old body returned
   early on `nums == null` **without** writing `poseCache`, and the new body reaches
   `poseCache?.set(prop, base.slice())` on the no-numbers path too. **Measured benign**: the sole
   caller already memoizes per key (`runtime.compositionBase`, `composition.ts:122-131`), the pose
   cache's stated purpose is a **pre-write snapshot** (a later re-read would read the engine's own
   writes), and `test/engine/c6-correctness.test.ts` pins the pose behaviour and passes. Recorded as a
   behaviour nuance with **no owner and no cure owed**, not as a defect.
8. **The falsifier re-derivations** (`.d`'s simulated channel drop → 14 of 14 RED; `.d`'s inverted fuzz
   assertions → 3 of 3 RED; `.c`'s old-vs-new probe batteries) **were NOT re-run by this seat**:
   each requires writing into another unit's file, which is outside a VERIFY-ONLY seat's writable set.
   They are named as **their own seats' measurements**, not adopted as this seat's.

### ESCALATIONS (returned, un-widened, still open)

- **ESC-KFW2-1 · `src/animation/engine/css/metadata.ts` is outside §Bounds** and carries the last two
  runtime collector specifiers on G-W2-2's own parse surface. Armed by the wave record at OPEN as an
  escalation trigger, returned by `.b`, **not widened by any seat**, and re-measured RED by this seat.
  **The owed act is a dated §Bounds addendum-beside naming the path** — an authoring act, not a seat's.
- **ESC-KFW2-2 · the `emit/format/index.ts` barrel** (residual 6) — the same shape, one level smaller.

### LANDED-WRONG (found by this seat; recorded, NOT fixed here — a close seat cures nothing)

1. **`.d` stamped the LEDGER verb `IMPLEMENTED` while one gate stands RED.** The spec's verb table
   conditions IMPLEMENTED on *"gates green + bytes landed"*. **Corrected at the cell to `PARTIAL` by
   this seat** (above), with the remainder and the two usable products named. The disclosure `.d`
   wrote was already exact; only the verb was ahead of it.
2. **`.c`'s declared family split, confirmed.** `a461c78c` changed `captureUnderlyingBase` and left
   `composition.ts`'s module docblock — *"Value4 is reached through the structural slots compiled by
   the frame pipeline"* — standing beside it; the correction landed separately at `6e371fd4`. Under
   this wave's **own** declared commit-family rule (§Carry F2: *a comment stating an invariant about a
   mechanism this wave changes is corrected in the cure commit*) it was owed **in** `a461c78c`. `.c`
   declared the miss itself and stated its ground (four seats share the index; amending a landed commit
   is the more dangerous act). **The finding stands as the finding; the ground for not amending is
   sound and this seat does not re-open it.**
3. **Nothing else.** No write outside any unit's declared writable set; no `git add -A`/`-u`; no
   `commit -a`; no amend, reset, stash or force anywhere; `scripts/dev/dev.sh` in **0 of 19** commits;
   no `.skip`, no allowlist entry, no `try/catch` around a defect, no local `node_modules` patch, no
   copied producer selector.

**CLOSE-SEAT VERDICT: PARTIAL.** Everything the wave's §Bounds permits is landed, measured, pushed and
independently re-measured here. What remains is **one bounded act the spec's own §Bounds does not
authorize any seat of this wave to perform.**

---

## Check 1 — FRESH ADVERSARIAL CHECK (L-20, pass 1, VERIFY-ONLY)

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-17 · **this seat authored none of the wave's bytes, cured
nothing, and wrote no product byte.** Every reading below was taken at the settled bytes by this seat's
own commands and **double-run with identical output**; nothing is inherited from the Baseline table,
from a unit receipt, from `.d`'s close or from the close seat's verification. Where a figure agrees with
a prior seat's it agrees because it was re-measured.

Substrate: keyframes.js **`e325018fb257540d6103950c3ab3c6195f51c5e2`** ≡ `origin/master`
⟨`git rev-parse HEAD origin/master`⟩, the wave's ref `7d958f21` an ancestor ⟨`merge-base --is-ancestor`
→ YES⟩, kf worktree carrying the two untracked KF.W1 mail packets and nothing else. value.js at
`15d38ef7`. `@mkbabb/value.js` **4.0.0** installed — **NO REPIN** (OP-5 holds).

### VERDICT: **NOT-CONFORMANT** — 1 HIGH · 3 MINOR · 2 INFO. **8 of the 9 clauses reproduce exactly. ONE claimed GREEN does not.**

---

### DEFECT REGISTER

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** | **G-W2-1's SITE LIMB is claimed GREEN on an INERT instrument, and the limb is RED at the bytes — by the gate's own falsifier, on a site THIS WAVE created.** `.d`'s close (clause 1) and the close seat's ACT 2 (row 1) both read the limb with ⟨`git grep -nE '\.ok\b' HEAD -- src/ \| grep -v parse-facade`⟩ → *"(no output) — **ZERO parse-failure branches anywhere in `src/` outside the façade**"*, and both double-ran it. **POSIX ERE defines no `\b`, so git grep's `-E` engine matches nothing** — the command returns 0 for every possible tree. **This is the exact fault the spec convicts at G-W2-2 fault 1** ⟨`KF-W2.md:666`: *"**Inert.** POSIX ERE defines no `\b`; git grep's `-E` engine matched nothing. **A gate asserting 21 sites was witnessed by a command naming none, at the ref the spec pins** — the exact failure this wave's own doctrine (a phantom coordinate convicts) exists to catch."*⟩ — reproduced inside the gate built to catch it, and double-running an inert command reproduces only its inertness. | Control, run twice, identical: ⟨`git grep -cE '\.ok\b' HEAD -- src/`⟩ → **0 hits, whole tree** · ⟨`git grep -cE '\.ok' HEAD -- src/` (same pattern, `\b` removed)⟩ → **14** · ⟨`git grep -nP '\.ok\b' HEAD -- src/ \| grep -v parse-facade`⟩ → **14**. Of the 14, thirteen are **out of the limb's subject and all PRE-EXISTING** — `easing/registry.ts:59/:119/:124/:129/:134` are `@mkbabb/value.js/**easing**` construction Results, `emit/backward/color.ts:83/:129/:185` + `emit/entry.ts:126` are `/**color**` conversion Results, `emit/css-text.ts:55` + `frame/interp-slot.ts:266/:326` are the **emit half** (`serializeCssColor`, out of denominator by G-W2-2's own words), `resolve/function.ts:35` is the **declared stray** `coerceToSyntax` (`.c`'s C-4). **The fourteenth is the defect**: ⟨`git grep -nP '\.ok\b' HEAD -- src/animation/svg/draw-svg.ts`⟩ → **`:109  percent.ok && percent.value.kind === "scalar"`** — a branch on a **`/css` GRAMMAR entry's parse Result** (`parseCssScalar`, `draw-svg.ts:48`), handled **inline, outside the façade**, and **INTRODUCED BY THIS WAVE** at `.c`'s `0ecaadb3`: ⟨`git grep -cP '\.ok\b' 7d958f21 -- src/animation/svg/draw-svg.ts`⟩ → **no hits at the ref**. The out-of-façade population moved **22 → 14** across the wave ⟨`-P`, both sides⟩, and the **one `+` line the wave added outside `parse-facade.ts`** is that branch ⟨`git diff 7d958f21 HEAD -- 'src/*' \| grep '^+' \| grep -P '\.ok\b'` → 8 lines, 7 inside `parse-facade.ts`, 1 at draw-svg⟩. **The gate's own falsifier is armed by its own words**: *"add a handler outside the façade and the site check reds"* ⟨`KF-W2.md:653`⟩. **The wave's own product contradicts the contract it published**: `parse-facade.ts`'s docblock reads *"A call site declares WHICH posture it takes; **no site writes `result.ok`**"* and *"the façade owns the branch. **A call site never writes `result.ok`**"*, and the sibling Tier-C cure in the **same unit** (`engine/composition.ts:202`, `a461c78c`) routes through **`swallowParsed`** correctly. **UNRELIEVED**: no producer owns it, no later wave is routed it, no honest-RED id names it — and **the cure is IN BOUNDS**: `src/animation/svg/draw-svg.ts` is §Bounds Owned-files row 120 (`modify`) **and** inside `.c`'s own declared writable set. | Route `draw-svg.ts:109`'s read through the posture the façade already publishes — `swallowParsed(() => parseCssScalar(v.trim()), (value) => …fraction-or-undefined…, undefined)` — so the domain check (`unit === "%"`, `value >= 0`) stays this function's and the **branch on `ok` stays the façade's**. One site, in-bounds, no new symbol. **Then re-run the limb with `-P` (or `grep -rn`), never `-E` with `\b`**, and record the instrument correction beside the gate. |
| **D-2** | **MINOR** | **The E13 close claim *"ZERO `UNREAD` status cells"* is FALSE at the bytes, measured by a second blind instrument — and it contradicts this record's own Open section.** `.d`'s **D-0** published ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → **0** and concluded *"**E13's close condition … is MET at this wave's close, by measurement rather than by routing**"*; the close seat's **ACT 4** published a column scan → *(no output)* plus *"The bare string `UNREAD` appears on **32** lines of `INBOX.md` and **not one of them is a status cell**"*. **Three of them are status cells.** The Open section of this very record states the truth — *"The three live `UNREAD` marks (**I-32 · I-33 · I-34**) …"* — so the close contradicts the wave's own open. | ⟨`awk -F'\|' '/^\|/{for(i=2;i<=NF;i++){gsub(/^ +\| +$/,"",$i); if($i ~ /^\*{0,2}UNREAD\*{0,2}$/) print NR}}' INBOX.md`⟩ → **(no output)**, reproduced — **because the regex is an EXACT match and every row in this file writes its status cell as `**UNREAD <date>** — <note>`.** Read directly: `INBOX.md:105` col 6 = **`**UNREAD 2026-09-17** — rowed at X.P.W2's E13 Step-0…`** (I-32) · `:106` col 6 = **`**UNREAD 2026-09-17** — rowed here for the same reason as I-32…`** (I-33) · `:107` col 6 = **`**UNREAD 2026-09-17** — rowed for traceability…`** (I-34). **`grep -c UNREAD` → 32**, of which **3 ARE status cells.** | **The E13 OUTCOME stands, on the lawful ground the wave already holds**: all three Routing cells name **X-W0.j / the X formation mail seat** (`:105` col 7 · `:106` col 7 · `:107` col 7) — glass-producer rows, READ-ONLY always, routed away from Track B — so none is *mail addressed to KF.W2's scope* and E13's close condition is met **by routing**, exactly as the Open section and `.a`/`.b`/`.c` each state. **What must be retracted is the word *measurement***: the column scan is as blind to a dated status cell as the bare `grep -i unread` X.P.W0 D-1 convicted. Correct instrument: match the cell's **prefix** (`$i ~ /^\*{0,2}UNREAD/`), not its whole text. |
| **D-3** | **MINOR** | **`.b`'s G-W2-8 AFTER-cell publishes a false receipt**: *"the emit mirror EXISTS and the façade is its single `src/` caller: **`serializeTimingFunction` is imported at `parse-facade.ts` only**"*. It is not imported there at all. | ⟨`grep -c serializeTimingFunction src/animation/compile/parse-facade.ts`⟩ → **0**. Its actual `src/` importers at HEAD ⟨`git grep -n serializeTimingFunction HEAD -- src/`⟩: `adapter.ts:28` · `emit/index.ts:57` (KF.W5 `.c`'s `2e0d91ae`) · `engine/css/metadata.ts:34` · `load-engine.ts:63` · `public.ts:168`. **The close seat did not re-derive this sentence** — its ACT 2 row 9 re-measured only the three copies and `emit/index.ts`'s export count. | **The gate's façade-side clause still holds, on the right symbol**: ⟨`git grep -n 'serializeDeclaration\b' HEAD -- src/`⟩ → 4 hits inside `emit/css-text.ts` + **`parse-facade.ts:66` (import) / `:206` (call)** — **exactly one consumer outside its own module, the façade.** Strike the `serializeTimingFunction` sentence; the clause needs only `serializeDeclaration`, which reproduces. |
| **D-4** | **MINOR-with-mitigation** *(does not block)* | **A declared commit family SPLIT, self-disclosed by `.c`.** `a461c78c` changed `captureUnderlyingBase` and left `composition.ts`'s module docblock — *"Value4 is reached through the structural slots compiled by the frame pipeline"* — standing beside a mechanism it had just changed; §Sequencing's families line binds the correction **into** that commit (§Carry F2: *"a comment stating an invariant about a mechanism this wave changes is corrected or made executable in the cure commit"*). | ⟨`git show a461c78c -- …/composition.ts`⟩ adds the façade import + `numericLeaves` and does **not** touch the module docblock; ⟨`git show 6e371fd4`⟩ is that one-sentence correction, **1 file, 5 insertions**. | **Already cured in-wave**, one commit later, both pushed; `.c` declared the miss loud with its ground (four seats on one index; amending a landed commit is the more dangerous act). **This seat does not re-open the ground.** Recorded so the family rule is not read as unbroken. |
| **D-5** | **INFO** | `.c`'s **C-3** publishes ⟨`wc -l`⟩ → **500** for `src/animation/ingest/cssom.ts` after the R4 ceiling cure. | ⟨`wc -l src/animation/ingest/cssom.ts`⟩ → **499**, and ⟨`git show 02a87f7a:…/cssom.ts \| wc -l`⟩ → **499** — the figure was never 500 at the settled bytes. | Non-load-bearing: the R4 ceiling is 500 and `npm run proof:structure` → **PASS: scope=src clean (0 violations across R1–R6)** at this seat's own run. Correct the integer at a dated addendum-beside; no act is owed. |
| **D-6** | **INFO** | **The spec's own floor integer is internally inconsistent — `.a`'s R-1, confirmed at the spec bytes by this seat.** G-W2-1's assertion line, its second footnote and the §Goal-criterion sentence read **19 / five**; §Carry **F3** reads **20** (row 20 = `KF-KE-58 · C-m7`, *"19 → 20 at repair round 6, PASS-6 D-4 · escape E3"*) with **six** positive bullets. | ⟨`grep -n KF-KE-58 KF-W2.md`⟩ → `:562` (row 20) and `:564` (*"The registry's floor is therefore 20"*); `:649` reads *"a **FLOOR of 19** today"*; `:48` reads *"the **nineteen enumerated postures**"*. `POSTURES.md` publishes **20** ⟨`awk '/^## §2/{exit} /^\| \*\*[0-9]+\*\*/{n++}'` → 20⟩ over **58** ⟨`ls …/adjudicated/kf-*.md \| wc -l` → 58⟩. | **`.a`'s disposition is CORRECT and this seat affirms it**: the register is the gate, the latest repair round governs within it, and a registry publishing 19 while F3 enumerates 20 would red G-W2-1 by its own falsifier (*"the gate reds on an unenumerated posture"*). **No spec byte was edited by any seat** (E-3 verified below). Owner: the next KF-W2 repair round / check, to reconcile in the gate's own voice. |

---

### THE HONEST-RED SET — each gate's relief cited at the spec bytes

| gate | relief, by the spec's own words | owner named in this record? |
|---|---|---|
| **G-W2-2** (Tier-A single entry) | **§Bounds' Owned-files table (`KF-W2.md:101–130`) has NO row for `src/animation/engine/css/metadata.ts`** — the only module still carrying a runtime parse-surface edge — **while G-W2-2's own witness enumerates it** (`:484`, `:667`, `:686`: *"`engine/css/metadata` ×2"*). A write there is outside every unit's writable set and is an **ESCALATION** under the standing law and runbook §5.7, **not a licence**. The wave record **armed it at OPEN** (§"A bounds gap, recorded at open rather than discovered at the cure"), `.b` **returned it un-widened**, and no seat wrote the path ⟨`git log --oneline 7d958f21..HEAD -- src/animation/engine/css/metadata.ts` → 0 commits⟩. **The gate is unreachable by any lawful act of this wave.** | **YES** — ESC-KFW2-1, owner *the X·KF formation*: a dated **§Bounds addendum-beside** naming the path, then one import repoint of 2 collectors + their 2 call sites (`:42`, `:102`). |
| **G-W2-8** (count arm, 3 → 1) | **Routed to a successor by the spec itself.** `:777`: *"**The count is not abandoned — it is HOMED**: `KF-W8`'s MISS-β2 row (unit d / G3) is the publication act and the place the 3 → 1 is measured, and this gate cites that home rather than asserting the number."* §Bounds row 122 marks `emit/index.ts` `modify-carve` — ***"ACT is KF.W8's"***. Order re-measured by this seat ⟨`grep -n 'KF\.W8' LEDGER.md` → `:52  planned`⟩ — W8 has **NOT** preceded, so the arming condition is met and the arm is RED; **performing the act here is out of bounds.** | **YES** — `KF-W8 §Rows · MISS-β2 (unit d · G3)`; ledger row `KF.W8 … planned`. |
| *(not a RED)* **G-W2-6 call-site limb** | The gate restricts it by its own words (`:738`): *"**CONTRACT ONLY at this wave**: the call-site edit is KFED-UNIT's … **This wave does not open the call site.**"* | KFED-UNIT (NO-WAVE-OWNER, SS-1/SS-2). |
| **G-W2-1 site limb** | **NO RELIEF.** Not producer-owned; routed to no successor; named by no honest-RED id; and **the cure site is inside §Bounds AND inside `.c`'s own writable set.** → **D-1, and it is why this check returns NOT-CONFORMANT rather than CONFORMANT-HONEST-RED.** | — |

---

### THE NINE CLAUSES, RE-RUN AT THIS SEAT'S OWN COMMANDS (each double-run, identical)

| # | clause | this seat's reading at `e325018f` | vs the close | verdict |
|---|---|---|---|---|
| 1 | **G-W2-1** | ⟨`ls …/registries/`⟩ → `INGRESS-CENSUS.md POSTURES.md`; floor ⟨`awk '/^## §2/{exit} /^\| \*\*[0-9]+\*\*/{n++}'`⟩ → **20**; corpus ⟨`ls …/adjudicated/kf-*.md \| wc -l`⟩ → **58**. **Site limb with a WORKING instrument** ⟨`git grep -nP '\.ok\b' HEAD -- src/ \| grep -v parse-facade`⟩ → **14**, of which **`draw-svg.ts:109` is a `/css` parse Result branched outside the façade and created by this wave** | close claims **GREEN (enumeration + site)** | **ENUMERATION GREEN · SITE LIMB RED — the one claimed GREEN that does not reproduce (D-1)** |
| 2 | **G-W2-2** | command (ii) re-run whole: **20 runtime specifiers over 5 modules** — `parse-facade.ts` ×15 · `engine/css/metadata.ts` ×2 · `emit/css-text.ts` ×1 · `frame/interp-slot.ts` ×1 · `resolve/function.ts` ×1. **Parse-surface paths 10 → 2** | identical | **HONEST-RED, reproduces** (relief above) |
| 3 | **G-W2-2b** (MONITOR) | ⟨`git grep -l … -- demo/ \| wc -l`⟩ → **7 files**; per-file runtime read → **8 specifiers over 6 modules**, module-for-module identical; `test/` → **10**; `scripts/` → **0** | identical | **TRUE — the monitor holds** |
| 4 | **G-W2-3** | comment-stripped scan over the six members at HEAD → **0 SURVIVES of 6**; the only textual hits are prose (`catalog.ts:23` quotes the dead pattern, `view-transition.ts:174` names `CQ_UNIT_RE` as replaced). Second clause spot-verified per member ⟨`git show <h>`⟩ | identical | **GREEN, reproduces** |
| 5 | **G-W2-4** | ⟨`grep -n 'new RegExp(' src/animation/ingest/cssom.ts`⟩ (comments stripped) → **0**; `test/ingest/keyframes-name-escapes.test.ts` → **17 passed (17)** | identical | **GREEN, reproduces** |
| 6 | **G-W2-5** | ⟨`sed -n 42p GATE-VERDICT.md`⟩ → the phrase, **byte-unchanged**; ⟨`git log -1 -- GATE-VERDICT.md`⟩ → **`befbc05a`**, an X-W0 commit, **not this wave's**; `GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` present BESIDE (line 1 = `SERVED MODEL`); `INGRESS-CENSUS.md` published; `grammar-fuzz.test.ts` → **9 passed (9)**, docblock `:8` byte-unchanged, **both classes present** ⟨7 empty-argument colour hits · 9 NBSP/U+00A0 hits⟩ | identical | **GREEN, reproduces** |
| 7 | **G-W2-6** | `test/compile/valuejs-contract.test.ts` → **16 passed (16)**; freeze invariant ⟨`git grep -c 'isFrozen\|Object.freeze' HEAD -- src/`⟩ → `interp-slot 1 · browser 4 · conditional 9 · core 6 · function 3` = **23 LINES over 5 modules**; pins ⟨`grep -c Object.isFrozen value4-immutable-resolve.test.ts`⟩ → **3**. **Checked because it is how this clause could have shipped hollow**: the four pre-wave `it()` blocks all SURVIVE — assertions absorbed into clause 1, `expect(` **8 → 44**, **0 deleted assertions** | identical | **CONTRACT CLAUSE GREEN, reproduces** |
| 8 | **G-W2-7** | ⟨`git diff --stat 7d958f21 HEAD -- test/fixtures/keyframes/`⟩ → **empty, 0 bytes — the mode column is provably unedited by any seat**; ⟨`ls-tree … \| grep -c '\.css$'`⟩ → **14**; `roundtrip-fidelity.test.ts` → **57 passed (57)**, and it names `parse-facade` ⟨2 hits⟩. *The simulated channel drop is `.d`'s measurement and was NOT re-derived here — it requires writing into `.d`'s file. Stated, not inherited.* | identical | **GREEN, reproduces** |
| 9 | **G-W2-8** | three copies re-read: `emit/format/format.ts:20` (private) · `emit/css-text.ts:59` (private) · `demo/utils/keyframeSelector.ts:7` (exported); ⟨`grep -cE 'selectorText\|serializeSelector' emit/index.ts`⟩ → **0**; order ⟨LEDGER `KF.W8` → `planned`⟩. Façade-side clause holds on **`serializeDeclaration`** (one consumer outside its module = the façade); the receipt's `serializeTimingFunction` sentence is false (**D-3**) | close claims the same verdict | **FAÇADE-SIDE GREEN · COUNT ARM RED-and-HOMED, reproduces** |

**READ PLAINLY: 8 of the 9 clauses reproduce at this seat's own commands. ONE — G-W2-1's site limb — was measured GREEN by an instrument that cannot return a hit, and is RED at the bytes on a site this wave itself wrote.**

### BOUNDS · MASKING · FAMILIES · E-3 — each re-derived here

```
$ git show --stat <each of the 13 kf + 6 value.js commits>
    → every commit contains EXACTLY its declared paths; 0 sibling files swept in across four
      concurrent seats on one index; `scripts/dev/dev.sh` in 0 of 19
$ git log --oneline 7d958f21..HEAD -- src/animation/engine/css/metadata.ts   → 0 commits (escalation un-widened)
$ grep -nE '\.(skip|only|todo)\(|xit\(|xdescribe\(' <the wave's 4 test files> | wc -l   → 0
$ git diff --stat 7d958f21 HEAD -- scripts/gates/                                       → (empty) — 0 allowlist entries
$ <added `catch` across the ten src-touching commits>  → 1, at `parse-facade.ts` SWALLOW —
      and `git show 7d958f21:src/animation/validate.ts` carries the IDENTICAL
      `try { … } catch { return []; }` at `keyframesNames`: a declared posture COLLAPSED, never
      a try/catch placed around a defect
$ <node_modules patched? copied producer selector? force/reset/stash/amend?>  → none, in any commit
$ git diff --stat f536b907..HEAD -- docs/tranches/X/keyframes/waves/ \
      docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/keyframes/conformance/ \
      docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md      → (empty) — E-3 HELD, byte-exact
$ npx vitest run --project library   → 1256 passed | 3 expected fail | 14 skipped (1273)   [twice]
$ npx vitest run --project library <the wave's 4 files>  → 99 passed (99) = 17 + 16 + 57 + 9   [twice]
$ npx tsc --noEmit -p tsconfig.lib.json  → 3 (compositor.ts:79 · waapi.ts:9 · smooth.ts:194 —
      ALL TS6133 unused-declaration, and ⟨git log 7d958f21..HEAD -- <those three>⟩ → 0 commits: pre-existing)
$ npx tsc --noEmit -p tsconfig.test.json → 24 pre-existing; 0 in ANY of the wave's four test files
$ npm run proof:structure                → PASS: scope=src clean (0 violations across R1–R6)
$ npx depcruise --config … src demo      → 4 violations / 435 modules / 1557 dependencies
$ git -C ../keyframes.js rev-parse HEAD origin/master → e325018f… / e325018f…  (pushed, 0 ahead)
```

**Commit families**: `.a`'s census + §F-2 addendum = ONE commit (`500c13fd`, exactly 2 files) ✓ · `.b`'s
façade + its nine Tier-A repoints = ONE commit (`49cd647b`, 10 files) ✓ · `.b`'s contract + its
conformance test = ONE commit (`46f0b77b`, 3 files) ✓ · `.c`'s cssom cure + fixture + the `:28-33`
VJ-9 comment correction = ONE commit (`f7cbc41c`, 2 files, the comment correction verified inside the
diff) ✓ · each Tier-C deletion with its replacement in the same commit ✓. **One split: D-4.**

**Successor conjuncts, verified against this wave** ⟨`LEDGER.md` Track-B rows⟩:
**KF.W7** (`opens after KF.W2 — posture registry`) — its conjunct is **GREEN**: `POSTURES.md` is
published, single-sourced, 20 over 58-of-58, and §Sequencing hard order 2 (*"KF.W7 may not decide a
failure posture before KF.W2 publishes the registry"*) is discharged. **KF.W7 is NOT blocked by this
wave.** **KF.W8** (`W0·W4·W5 (+W6 SCOPED)`) names no KF.W2 conjunct — unblocked from this end, and it
carries G-W2-8's homed 3 → 1. **KF.W10** (`W0·W1·W9 + W2·W4·W5·W6·W7·W8·W9 **IMPLEMENTED**`) is
**LAWFULLY BLOCKED**: KF.W2's verb is `PARTIAL`, not IMPLEMENTED — and D-1 confirms the verb correction
was right for a second reason the close seat did not have. **KF.W3** is `GATE-KEYED` on `RC-P(V)`,
untouched (OP-5 held: `4.0.0` installed, no repin).

**The four-verb line, checked**: the spec is byte-untouched (E-3 above), so **no verb in its own table
moved** — correct, since VERIFIED is *"stamped only at X·KF's close"* and IMPLEMENTED is conditioned on
*"gates green"*. The close seat's correction of the LEDGER cell `IMPLEMENTED → PARTIAL` is **affirmed
and independently re-grounded**: with D-1, **two** gates stand RED, not one.

**Goal criterion, at the bytes**: *"exactly one module in `src/animation/**` that speaks to value.js's
grammar"* — **NOT MET** (2 paths; the second is §Bounds-omitted, relieved). *"exactly one declared thing
that happens when a CSS string is bad"* — **NOT MET as published**: four named postures exist and 19 of
21 sites route to them, but `draw-svg.ts:109` declares its own (D-1). *"one published answer to which
grammar belongs at this seam"* — **MET** (contract, 16 tests, executable). *"A wave that adds a wrapper
and leaves the twenty-one call sites and the … enumerated postures standing has failed this goal"* —
**not that failure**: 19 of 21 routed, 20 postures enumerated, 6 Tier-C regexes dead, the injection cured.

### WHAT THIS CHECK ASKS FOR

**One in-bounds cure (D-1) and three receipt corrections (D-2 · D-3 · D-5), then a re-check.** The
wave's substance is very largely landed and it survives an adversarial re-measurement on eight of nine
clauses; what it does not survive is a gate verdict taken with a command that cannot fail. **The wave
does NOT close at this check.**

**CHECK-1 VERDICT: NOT-CONFORMANT** — 1 HIGH (G-W2-1 site limb RED, in-bounds cure) · 3 MINOR
(E13 instrument · a false `serializeTimingFunction` receipt · the declared family split, mitigated) ·
2 INFO. **Honest-RED set, each relieved and owner-named: G-W2-2 · G-W2-8's count arm.**

---

## Repair 1 — CHECK 1's register, cured (repair round 1, 2026-09-17, THE REPAIR SEAT)

**SERVED MODEL: claude-opus-5[1m]** · **This seat cured; it did not re-judge.** Every reading below was
taken at the settled bytes by this seat's own commands and **double-run with identical output**.
Nothing is inherited from Check 1, from `.d`'s close or from the close seat: where a figure agrees
with a prior seat's it agrees because it was **re-measured**. **No prior seat's bytes were edited** —
E-3 holds and every correction below is a **dated correction-beside**, written here rather than into
the sentence it corrects.

**Substrate at this round's OPEN**: keyframes.js **`e325018fb257540d6103950c3ab3c6195f51c5e2`** ≡
`origin/master` — Check 1's substrate, unmoved — value.js `ec96a825`, `@mkbabb/value.js` **4.0.0**
installed (**NO REPIN**; OP-5 holds). **Substrate at this round's CLOSE**: keyframes.js
**`ae83da0764a77ebe176d6314b179cfa5b3dd287b`** ≡ `origin/master`, **pushed** under COHESION §0j.C
**KF-WRITE** ⟨`git push origin HEAD` → `e325018f..ae83da07`⟩ ⟨`git rev-parse HEAD origin/master` →
identical shas⟩ ⟨`git rev-list --count origin/master..HEAD` → **0**⟩. kf worktree carries the two
untracked KF.W1 mail packets and nothing else ⟨`git status --porcelain` → 2 `??` lines, 0 `M`⟩.

### DISPOSITION OF CHECK 1's REGISTER

| # | severity | disposition at this round |
|---|---|---|
| **D-1** | **HIGH** | **CURED AT THE SITE** — one product commit, `ae83da07`, in bounds. The site limb now reads **0** at `src/animation/svg/draw-svg.ts` under three independent instruments. |
| **D-2** | MINOR | **CURED as a correction-beside** — the word *measurement* is retracted; the E13 OUTCOME stands **by routing**, and the corrected instrument is published and double-run below. |
| **D-3** | MINOR | **CURED as a correction-beside** — the `serializeTimingFunction` sentence is struck; G-W2-8's façade-side clause is re-grounded on `serializeDeclaration`, re-measured here. |
| **D-4** | MINOR-with-mitigation | **NOT RE-OPENED.** Already cured in-wave at `6e371fd4`, both commits pushed; Check 1 recorded it so the family rule is not read as unbroken, and that record stands. |
| **D-5** | INFO | **CURED as a correction-beside** — the integer is **499**, not 500; no act was owed and none was taken beyond the correction. |
| **D-6** | INFO | **UNCHANGED, still owner-named.** The spec's 19-vs-20 floor inconsistency is a **spec** byte and the spec is E-3-frozen; Check 1's own §WHAT THIS CHECK ASKS FOR does not ask for it. **0 spec bytes moved this round** ⟨`git diff --stat f536b907..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/keyframes/conformance/ docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md` → **(empty)**⟩. Owner remains the next KF-W2 repair round / check, to reconcile **in the gate's own voice** by a dated addendum-beside. |

---

### D-1 (HIGH) — the G-W2-1 SITE LIMB: defect → cure → commit → gate re-reading

**THE DEFECT, RE-MEASURED BEFORE ANY CURE BYTE** (at `e325018f`, this seat's own commands, twice):

```
$ git grep -cE '\.ok\b' HEAD -- src/ | wc -l          → 0    ← THE CONVICTED INSTRUMENT: it returns
                                                               zero for EVERY possible tree, so the
                                                               GREEN it published was inertness
$ git grep -nP '\.ok\b' HEAD -- src/ | grep -v parse-facade | wc -l   → 14
$ git grep -nP '\.ok\b' HEAD -- src/animation/svg/draw-svg.ts
    → :109    percent.ok && percent.value.kind === "scalar"
$ git grep -cP '\.ok\b' 7d958f21 -- src/animation/svg/draw-svg.ts     → (no hits; exit 1)
```

**The fourteenth was this wave's own.** Thirteen are out of the limb's subject and pre-existing —
`easing/registry.ts` ×5 (value.js `/easing` construction Results) · `emit/backward/color.ts` ×3 +
`emit/entry.ts` ×1 (`/color` conversion Results) · `emit/css-text.ts:55` + `frame/interp-slot.ts` ×2
(the **emit half**, out of denominator by G-W2-2's own words) · `resolve/function.ts:35` (the
**declared stray** `coerceToSyntax`, `.c`'s C-4). The fourteenth, `draw-svg.ts:109`, was a branch on a
**`/css` grammar entry's parse Result** handled inline **outside the façade**, written by this wave at
`.c`'s `0ecaadb3` — and it contradicted the contract the wave itself published in the same unit
(`parse-facade.ts`: *"A call site declares WHICH posture it takes; no site writes `result.ok`"*), while
the sibling Tier-C cure at `engine/composition.ts:202` (`a461c78c`) routed through `swallowParsed`
correctly.

**THE CURE — the branch is given back to the façade, the domain test kept at the site.** The read now
runs inside **`swallowParsed`**, the declared SWALLOW posture, exactly as Check 1 prescribes and
exactly as the sibling cure takes it:

```ts
const fraction = swallowParsed(
    () => parseCssScalar(v.trim()),
    ({ payload }): number | undefined =>
        payload.type === "number" && payload.unit === "%" && payload.value >= 0
            ? payload.value / 100
            : undefined,
    undefined,
);
if (fraction === undefined) { throw new Error(`fromDrawSVG(): invalid draw position …`); }
return fraction;
```

Three things about this cure, each stated so a later seat does not have to re-derive it:

1. **The domain test stays at the site, because it is the site's.** `unit === "%"` and non-negativity
   are `fromDrawSVG`'s domain, not CSS's — `-5%` parses fine and is not a draw position. **Only the
   branch on `ok` moved.** No new symbol was minted; `swallowParsed` is the façade's own export.
2. **The `kind === "scalar"` limb is gone because the TYPE already says it** ⟨`grep -n
   'parseCssScalar' node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` → `:225  export declare
   function parseCssScalar(source: string): ParseResult<CssScalar>`, and `CssScalar` is
   `Readonly<{ kind: "scalar"; payload: … }>`⟩. The deleted limb was a tautology, not a guard.
3. **This is NOT a masking fallback, and the difference is measured, not asserted.** The posture's
   `undefined` is converted into the function's **own thrown domain error on the very next line** —
   nothing is swallowed to a caller. What changes is which error a caller sees on the **R1
   empty-argument class**, the one `parse-facade.ts`'s docblock names. A transcription of the two
   shapes over the **real** `parseCssScalar` at the installed 4.0.0 (labelled as a transcription: it
   runs the grammar, not the tree's bytes):

   ```
   shape           "50%" " 50% " ".5%" "50.5%" "500%" "+5%" "1e2%" "50" "50px" "abc" "" "%" "-5%"  |  "calc()"   "oklch()"
   BEFORE          0.5   0.5     0.005 0.505   5      0.05  1      DOMAIN-ERROR × 6                 |  RAW TypeError ×2
   AFTER           0.5   0.5     0.005 0.505   5      0.05  1      DOMAIN-ERROR × 6                 |  DOMAIN-ERROR ×2
                   └──────────────── 13 of 15 shapes IDENTICAL ────────────────┘                    └── 2 DIFFER ──┘
   ```
   ⟨`parseCssScalar("calc()")` and `parseCssScalar("oklch()")` **THROW a `TypeError`** at 4.0.0 —
   verified directly⟩. Before the cure that raw `TypeError` escaped `fromDrawSVG`; after it, the
   caller gets `fromDrawSVG(): invalid draw position "calc()" — pass a percent string …`. **An error
   is still thrown on every bad input; the surface got narrower and the message got true.**

**THE COMMIT** — pathspec-exact, one file, one meaning:

```
$ git show --stat ae83da07
    fix(kf/w2.repair1): the last parse-failure branch outside the façade is routed
    through the posture that owns it (G-W2-1 site limb, CHECK 1 D-1)
    src/animation/svg/draw-svg.ts | 34 +++++++++++++++-------------   1 file changed, 21 ins, 13 del
```
**Bounds**: `src/animation/svg/draw-svg.ts` is §Bounds Owned-files `modify` **and** inside `.c`'s own
declared writable set — the cure needed no widening and took none. `scripts/dev/dev.sh` untouched, in
this commit and in every commit of this wave.

**THE GATE RE-READING — the limb, under THREE instruments, at `ae83da07`, each double-run:**

| instrument | at `e325018f` | at `ae83da07` | draw-svg's share |
|---|---|---|---|
| `git grep -nP '\.ok\b' HEAD -- src/ \| grep -v parse-facade \| wc -l` | **14** | **13** | 1 → **0** |
| `grep -rnE '\.ok[^a-zA-Z0-9_]' src --include='*.ts' \| grep -v parse-facade \| wc -l` (no `\b` at all) | 14 | **13** | 1 → **0** |
| `git grep -nP '\.ok\b' HEAD -- src/animation/svg/draw-svg.ts` | `:109` | **(no hits, exit 1)** | — |
| *(the convicted instrument, kept as a CONTROL and never as a reading)* `git grep -cE '\.ok\b' HEAD -- src/ \| wc -l` | 0 | 0 | inert at both refs |

The surviving **13** are, file by file ⟨third instrument, `sed 's/:.*//' \| sort \| uniq -c`⟩:
`easing/registry.ts` **5** · `emit/backward/color.ts` **3** · `emit/css-text.ts` **1** ·
`emit/entry.ts` **1** · `frame/interp-slot.ts` **2** · `resolve/function.ts` **1** — **the same
thirteen Check 1 enumerated as out-of-subject and pre-existing, and not one of them a Tier-A parse
site.** **G-W2-1's SITE LIMB IS GREEN**, and it is green under an instrument that can fail.

**THE INSTRUMENT CORRECTION, RECORDED BESIDE THE GATE** (Check 1's own ask): **`git grep -E` with
`\b` is banned at this gate.** POSIX ERE defines no `\b`; the `-E` engine matches nothing and the
command returns 0 for every tree. The limb's readings of record are **`git grep -P`** and the
`\b`-free `grep -rnE '\.ok[^a-zA-Z0-9_]'` control, and a reading is published only when **both**
agree. This is the same fault the spec convicts at G-W2-2 fault 1 (`KF-W2.md:666`) — it reappeared
inside the gate written to catch it, and the cure is structural: **the instrument carries no `\b`, so
there is nothing left to be inert about.**

---

### D-2 (MINOR) — E13: the OUTCOME stands, the word *measurement* is RETRACTED

**RETRACTED**: `.d`'s D-0 sentence *"E13's close condition … is MET at this wave's close, **by
measurement** rather than by routing"*, and the close seat's ACT 4 sentence *"The bare string `UNREAD`
appears on 32 lines of `INBOX.md` and **not one of them is a status cell**"*. **Three of them are
status cells.** Both instruments were blind in the same way: `grep -cE '\| *UNREAD *\|'` and an
`awk` column scan anchored on `$i ~ /^\*{0,2}UNREAD\*{0,2}$/` are **exact** matches, while every row
in this file writes its status cell as `**UNREAD <date>** — <note>`.

**THE CORRECTED INSTRUMENT — match the cell's PREFIX, not its whole text** (double-run, identical):

```
$ awk -F'|' '/^\|/{for(i=2;i<=NF;i++){gsub(/^ +| +$/,"",$i); if($i ~ /^\*{0,2}UNREAD/) print NR" col"i}}' \
      docs/tranches/V/coordination/INBOX.md
  → 105 col6
    106 col6
    107 col6          [run twice, identical]
$ grep -c UNREAD docs/tranches/V/coordination/INBOX.md   → 33 at this seat's clock (32 at Check 1's;
    INBOX.md is dirty in the worktree and edited concurrently by a sibling track — the drift is in the
    prose lines, the three STATUS CELLS are the same three)
```

**THE OUTCOME IS UNMOVED, AND ITS GROUND IS ROUTING** — read at the cells themselves, this round:
`:105` col 7 → *"the **X formation mail seat / X-W0.j** … **No X·P wave, no X·P act, opens on this
row**"* · `:106` col 7 → *"the X formation mail seat … Glass is **READ-ONLY always**"* · `:107` col 7 →
*"**X-W0.j / X-EXT-1**, beside I-32. **Not X·P's, not a value.js act today**"*. I-32 · I-33 · I-34 are
**glass-producer rows routed to the X formation mail seat**, not mail addressed to KF.W2's scope, and
glass is READ-ONLY always. **E13's close condition — *no wave closes with UNREAD mail addressed to its
scope* — is MET BY ROUTING**, exactly as this record's Open section and `.a`/`.b`/`.c` each state, and
**not** by a count of zero.

**THE FOUR-PATH SWEEP, RE-RUN AT THIS SEAT'S CLOCK** (runbook §5.3; a repair round is a wave act):
`docs/tranches/V/` + `…/coordination/` · `../glass-ui/docs/tranches/BK/coordination/` ·
`../keyframes-v-exec/docs/tranches/V/coordination/` · `../keyframes.js/docs/tranches/V/coordination/`
(READ-ONLY / NEVER-DELIVER) · `../sci-report/atlas/docs/tranches/P/coordination/` → the three
2026-09-17 glass letters are the ones already rowed I-32/I-33/I-34; the one 09-17 value.js delivery is
rowed and `SENT`; **0 unrowed, 0 UNREAD addressed to X·KF**. `INBOX.md` was **not written by this
seat** — it is another track's dirty file and the three routed rows need no mark from Track B.

---

### D-3 (MINOR) — G-W2-8's façade-side receipt, re-grounded on the symbol that is actually there

**STRUCK**: `.b`'s G-W2-8 AFTER-cell sentence *"`serializeTimingFunction` is imported at
`parse-facade.ts` only"*. It is imported there **not at all** ⟨`grep -c serializeTimingFunction
src/animation/compile/parse-facade.ts` → **0**⟩.

**THE CLAUSE STANDS ON `serializeDeclaration`, re-measured at `ae83da07`** ⟨`git grep -n
'serializeDeclaration\b' -- src/`⟩ → 4 hits inside `emit/css-text.ts` (`:72` definition, `:83`/`:100`/
`:106` own calls) + **`parse-facade.ts:66` (import) and `:206` (call)** — **exactly one consumer
outside its own module, and that consumer is the façade.** The declaration seam's emit half has one
publisher and one external consumer; that is what the gate asserts and that is what reproduces.

---

### D-5 (INFO) — the integer

**CORRECTED**: `.c`'s C-3 published `wc -l` → **500** for `src/animation/ingest/cssom.ts`. The file is
**499** ⟨`wc -l src/animation/ingest/cssom.ts` → **499**⟩ and was 499 at the cure commit too. The R4
ceiling is 500, so the gate's verdict is unchanged and **no act was owed**: `npm run proof:structure`
→ **PASS: scope=src clean (0 violations across R1–R6)** at this seat's own run.

---

### THE GATE TABLE — CHECK 1 → REPAIR 1 (only what a cure could move; everything else re-run to prove it did NOT move)

| gate | at Check 1 (`e325018f`) | at Repair 1 (`ae83da07`) | moved by |
|---|---|---|---|
| **G-W2-1** | ENUMERATION GREEN · **SITE LIMB RED** (14 out-of-façade, 1 of them a Tier-A site this wave wrote) | **GREEN — both limbs.** Enumeration: **20** postures over **58** records ⟨re-run twice⟩. Site limb: **13**, all pre-existing, **0** at draw-svg, under three instruments | `ae83da07` |
| **G-W2-2** | HONEST-RED — 20 runtime specifiers over 5 modules; parse-surface paths **2** | **HONEST-RED, byte-identical**: `parse-facade.ts` ×15 · `engine/css/metadata.ts` ×2 · `emit/css-text.ts` ×1 · `frame/interp-slot.ts` ×1 · `resolve/function.ts` ×1 = **20 over 5** ⟨command (ii) re-run whole over the working tree⟩ | **nothing — the cure adds NO value.js edge**: `draw-svg.ts` imports `../compile/parse-facade`, never `@mkbabb/value.js/css` |
| **G-W2-2b** (MONITOR) | TRUE | TRUE — untouched (this round opens no demo byte) | — |
| **G-W2-3** | GREEN, 0-of-6 survives | **GREEN** — and re-checked **at the cured file**: the dead percentage-token regex has no survivor in `draw-svg.ts` on a comment-stripped scan ⟨exit 1⟩ | — |
| **G-W2-4** · **G-W2-5** · **G-W2-6** · **G-W2-7** | GREEN | **GREEN** — the wave's four test files re-run twice: **99 passed (99)** = 17 + 16 + 57 + 9 | — |
| **G-W2-8** | façade-side GREEN · count arm RED-and-HOMED | **unchanged** — façade-side re-grounded on `serializeDeclaration` (D-3); the count arm stays **HOMED** at `KF-W8 §Rows · MISS-β2 (unit d · G3)`, KF.W8 still `planned` | — |

**READ PLAINLY: the wave now stands at 7 of 8 gates GREEN · 1 HONEST-RED (G-W2-2) · the MONITOR TRUE ·
0 undeclared GREEN — and the one GREEN that Check 1 refused is GREEN on an instrument that can fail.**

### TREE HEALTH AT THIS ROUND'S CLOSE (double-run, whole project)

```
$ npx vitest run --project library        → 1256 passed | 3 expected fail | 14 skipped (1273)   [twice]
$ npx vitest run --project library <the wave's 4 files>   → 99 passed (99)                      [twice]
$ npx vitest run --project library test/svg/draw-svg.test.ts  → 13 passed (13)  ← the cured file's own suite
$ npx tsc --noEmit -p tsconfig.lib.json   → 3  (compositor.ts:79 · waapi.ts:9 · smooth.ts:194 —
                                              all TS6133, all pre-existing, 0 in draw-svg.ts)
$ npm run proof:structure                 → PASS: scope=src clean (0 violations across R1–R6)
$ npx depcruise --config .dependency-cruiser.cjs src demo → 4 violations / 435 modules / 1557 deps
                                              — IDENTICAL to Check 1: the cure adds no edge
$ npx prettier --check src/animation/svg/draw-svg.ts → the ONLY delta is the pre-existing
   `export class DrawSVG<V extends Vars = Vars>` wrap, present at HEAD before this round; the cured
   block is prettier-conformant as written
```

### WHAT DOES **NOT** MOVE AT THIS ROUND, AND WHY

- **The LEDGER verb stays `PARTIAL`.** The spec conditions IMPLEMENTED on *"gates green + bytes
  landed"*, and **G-W2-2 is still RED** — its last parse-surface edge sits on
  `src/animation/engine/css/metadata.ts`, which §Bounds' Owned-files table does not carry. The close
  seat's correction was right for two reasons; this round retires **one** of them. **One ground
  remains, so the verb does not move.** ⟨`git log --oneline 7d958f21..HEAD -- src/animation/engine/css/metadata.ts`
  → **0 commits** — the escalation is still un-widened, by this seat as by every seat before it.⟩
- **ESC-KFW2-1 stays open and un-widened**, owner the X·KF formation: a dated **§Bounds
  addendum-beside** naming `engine/css/metadata.ts`, then one import repoint of 2 collectors + their
  2 call sites. **No seat of this wave may lawfully perform it**, and this seat did not.
- **G-W2-8's count arm stays HOMED** at KF.W8 (`planned`); performing the 3 → 1 here is out of bounds.
- **The spec is byte-frozen** (E-3, verified above) — D-6's 19-vs-20 reconciliation is owed **in the
  gate's own voice** by a later round, as a dated addendum-beside, and is not smuggled in here.

### THE ONE THING THE NEXT SEAT MUST NOT RE-DISCOVER

**A gate reading taken with `git grep -E '…\b…'` is not a reading — it is the number 0 wearing a
verdict.** This wave has now produced that fault **twice**: once in G-W2-2's original witness (caught
by the spec's own repair round 2) and once in G-W2-1's site limb (caught by Check 1, cured here). The
limb's instrument of record is `git grep -P`, corroborated by a `\b`-free `grep -rnE` control, and
**a limb is published only when both agree**. The general form is the wave's own doctrine: **an
assertion witnessed by a command that cannot fail is not witnessed.**

**REPAIR-1 VERDICT: the register is discharged — 1 HIGH cured at the site, 3 corrections-beside
recorded, 1 already-cured item not re-opened, 1 INFO left with its named owner. The wave's REDs are
now exactly the two that are relieved and owner-named (G-W2-2 · G-W2-8's count arm), and both are
out of every seat's bounds. The verb stays `PARTIAL`; the wave awaits Check 2.**

---

## Check 2 — FRESH ADVERSARIAL CHECK (L-20, pass 2, VERIFY-ONLY)

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-17 · **this seat authored none of the wave's bytes, none
of the four unit receipts, neither close section, CHECK 1 or REPAIR 1; it cured nothing and wrote no
product byte.** Every reading below was taken at the settled bytes by this seat's own commands and
**double-run with identical output**. Where a figure agrees with a prior seat's it agrees because it
was re-measured, never because it was copied.

Substrate: keyframes.js **`ae83da0764a77ebe176d6314b179cfa5b3dd287b`** ≡ `origin/master`
⟨`git rev-parse HEAD origin/master` → identical; `git rev-list --count origin/master..HEAD` → **0**⟩,
the wave's ref `7d958f21` an ancestor ⟨`git merge-base --is-ancestor 7d958f21 HEAD` → YES⟩, kf worktree
carrying the two untracked KF.W1 mail packets and **nothing else** ⟨`git status --porcelain` → 2 `??`,
0 `M`⟩. value.js at `4ed1462c`. `@mkbabb/value.js` **4.0.0** installed — **NO REPIN** (OP-5 holds).

### VERDICT: **CONFORMANT-HONEST-RED** — 0 BLOCKER/CRITICAL/HIGH · 2 MINOR · 1 INFO. **All nine clause verdicts reproduce at this seat's own commands.**

---

### THE NINE CLAUSES, RE-RUN AT THIS SEAT'S OWN COMMANDS (each double-run, identical)

| # | clause | this seat's reading at `ae83da07` | verdict |
|---|---|---|---|
| 1 | **G-W2-1** | **Enumeration**: ⟨`ls …/keyframes/registries/`⟩ → `INGRESS-CENSUS.md POSTURES.md`; floor ⟨`awk '/^## §2/{exit} /^\| \*\*[0-9]+\*\*/{n++}' POSTURES.md`⟩ → **20**; corpus ⟨`ls …/registry/adjudicated/kf-*.md \| wc -l`⟩ → **58** — basis ≡ corpus, the "basis smaller than the corpus" falsifier does not arm. **Site limb, under TWO instruments that CAN fail** ⟨`git grep -nP '\.ok\b' HEAD -- src/ \| grep -v parse-facade \| wc -l`⟩ → **13** and ⟨`grep -rnE '\.ok[^a-zA-Z0-9_]' src --include='*.ts' \| grep -v parse-facade \| wc -l`⟩ → **13**, both twice; ⟨`git grep -nP '\.ok\b' HEAD -- src/animation/svg/draw-svg.ts`⟩ → **no hits, exit 1**. **The thirteen were resolved to their own import specifiers by this seat, not taken on the repair's word** ⟨per-file `perl -0777` whole-import-block read⟩: `easing/registry.ts` ×5 = `@mkbabb/value.js/**easing**` · `emit/backward/color.ts` ×3 + `emit/entry.ts` ×1 = `/**color**` · `emit/css-text.ts:55` + `frame/interp-slot.ts` ×2 = the **emit half** (`serializeCssColor`, out of denominator by G-W2-2's own words) · `resolve/function.ts:35` = the **declared stray** `coerceToSyntax`. **Not one is a `/css` grammar-entry Result.** | **GREEN — both limbs, reproduced** |
| 2 | **G-W2-2** | command (ii) re-run whole, twice: **20 runtime specifiers over 5 modules** — `parse-facade.ts` **×15** · **`engine/css/metadata.ts` ×2** · `emit/css-text.ts` ×1 · `frame/interp-slot.ts` ×1 · `resolve/function.ts` ×1. Baseline re-derived **by this seat at `7d958f21`** ⟨same command⟩ → **25**. **Parse-surface paths 10 → 2** | **HONEST-RED, reproduces** (relief below) |
| 3 | **G-W2-2b** (MONITOR) | ⟨`git grep -l … -- demo/ \| wc -l`⟩ → **7 files**; per-file runtime read → **8 specifiers over 6 modules**; `test/` → **10**; `scripts/` → **0**. **And the wave's non-authorship of the demo delta is measured, not asserted**: ⟨`git log --oneline 7d958f21..HEAD -- demo/`⟩ names **five commits, all `kf/w5.a`** — zero KF.W2 commits touch `demo/` | **TRUE — the monitor holds** |
| 4 | **G-W2-3** | comment-stripped scan over the six members at HEAD → **0 SURVIVES of 6**, twice. **The control was re-derived by this seat at `7d958f21`, so the scan is not inert**: `catalog.ts` **1** · `CQ_UNIT_RE` **1** · `composition.ts` **1** · `format.ts` `let s = keyframe` **1** · `view-transition.ts` `matchAll` **1** · `draw-svg.ts` percentage token **1** = **6 of 6 before**. Second clause spot-verified per member ⟨`git show <h>`⟩: `55347314` lands the position-named strip **with** its measurement and the A-2 test-pin ground; `0cfd3b5f` lands `declaredDeclarationsFor`; `a461c78c` lands `parseCssValues`+`swallowParsed`; `0ecaadb3` lands `parseCssScalar` | **GREEN, reproduces** |
| 5 | **G-W2-4** | ⟨comment-stripped `new RegExp(` in `cssom.ts`⟩ → **0**, twice; `test/ingest/keyframes-name-escapes.test.ts` → **17 passed (17)**; the VJ-9 `:28-33` comment correction verified **inside** `f7cbc41c`'s own diff ⟨`git show f7cbc41c -- …/cssom.ts`⟩ | **GREEN, reproduces** |
| 6 | **G-W2-5** | ⟨`sed -n 42p GATE-VERDICT.md`⟩ → the phrase, **byte-unchanged**; ⟨`git log -1 -- GATE-VERDICT.md`⟩ → **`befbc05a`**, an X-W0 commit, **not this wave's** (E-3 by provenance, not only by inspection); `GATE-VERDICT-F2-ADDENDUM-2026-09-17.md` present **BESIDE** it, **145 L**, line 1 = `SERVED MODEL`; `INGRESS-CENSUS.md` self-count re-run by this seat → §2.a **8**, §5 boundary **32**, demo arm **7 · 6 · 8**; `grammar-fuzz.test.ts` → **9 passed (9)**, docblock `:8` byte-unchanged, both malformed classes present | **GREEN, reproduces** |
| 7 | **G-W2-6** | `test/compile/valuejs-contract.test.ts` → **16 passed (16)**, twice; **6 clauses** ⟨`describe(` count⟩. **Re-checked at the bytes because this is how the clause could have shipped hollow**: every narrowing `if (…​.ok)` is preceded by a hard `expect(…​.ok).toBe(true\|false)` — **no freeze, shape or refusal assertion can pass vacuously**. **And the "0 deleted assertions" claim was re-derived rather than inherited**: ⟨`git diff 7d958f21 HEAD -- <the file> \| grep '^-' \| grep -c 'expect('`⟩ → **2**, and both were **read** — they are the `rejects empty and whitespace-only selectors` block MOVED under the new clause-1 `describe`, present verbatim at `:107-117`. `expect(` **8 → 44**, `it(` **4 → 16**; nothing narrowed, nothing dropped. Freeze invariant ⟨`git grep -c 'isFrozen\|Object.freeze' HEAD -- src/`⟩ → **23 LINES** over 5 modules; pins → **3** | **CONTRACT CLAUSE GREEN, reproduces** |
| 8 | **G-W2-7** | ⟨`git diff --stat 7d958f21 HEAD -- test/fixtures/keyframes/`⟩ → **empty, 0 bytes** — the manifest's mode column is **provably unedited by any seat of this wave**; ⟨`git ls-tree … \| grep -c '\.css$'`⟩ → **14**; `roundtrip-fidelity.test.ts` → **57 passed (57)**, twice, and it names `parse-facade` ⟨2 hits⟩. *The simulated channel drop is `.d`'s measurement; re-running it needs a write into `.d`'s file and a VERIFY-ONLY seat has no such bounds. Stated, not inherited.* | **GREEN, reproduces** |
| 9 | **G-W2-8** | three copies re-read at HEAD: `emit/format/format.ts:20` (private) · `emit/css-text.ts:59` (private) · `demo/utils/keyframeSelector.ts:7` (exported); ⟨`grep -cE 'selectorText\|serializeSelector' emit/index.ts`⟩ → **0**. Façade-side clause re-grounded and re-measured: ⟨`git grep -n 'serializeDeclaration\b' HEAD -- src/`⟩ → 4 hits inside `emit/css-text.ts` + `parse-facade.ts:66` (import) / `:206` (call) — **exactly one consumer outside its own module, and it is the façade**. Order ⟨LEDGER `KF.W8`⟩ → **`planned`** | **FAÇADE-SIDE GREEN · COUNT ARM RED-and-HOMED, reproduces** |

**READ PLAINLY: 9 of 9 clause verdicts reproduce at this seat's own commands. CHECK 1's one HIGH is
CURED at the bytes and the cure was re-measured here, not accepted.**

### THE CURE ITSELF, AUDITED RATHER THAN ACCEPTED (Repair 1's `ae83da07`)

The standing law names a try/catch around a defect a **HIGH**, and `swallowParsed` contains one — so the
cure was read, not counted. ⟨`git show ae83da07`⟩ is **1 file, 21 ins / 13 del**, and **it is a posture
collapse, not a mask**, on four measured grounds: (i) `swallowParsed` is the façade's **declared SWALLOW
posture** (`parse-facade.ts:133-144`), published in `POSTURES.md` and pinned executably at contract
clause 4, and its `try { … } catch { return fallback }` is byte-for-byte the shape **already standing in
the tree at the ref** ⟨`git show 7d958f21:src/animation/validate.ts`, `keyframesNames`⟩ — a posture the
wave collapsed, never one it invented; (ii) **nothing is swallowed to a caller** — the posture's
`undefined` is converted into `fromDrawSVG`'s own thrown domain error on the very next line, so every
bad input still throws; (iii) the **domain test stayed at the site** (`unit === "%"`, non-negative),
which is `fromDrawSVG`'s and not CSS's, and only the branch on `ok` moved; (iv) the only other
`swallowParsed` consumers are `validate.ts:185` (the pre-existing posture) and `composition.ts:202`
(the sibling Tier-C cure), so no new swallowing surface was opened ⟨`git grep -n swallowParsed -- src/`
→ 3 call sites, all named⟩. `test/svg/draw-svg.test.ts` → **13 passed (13)**.

### BOUNDS · MASKING · FAMILIES · E-3 · MAIL — each re-derived at this seat

```
$ git show --name-only <each of the 14 kf + 11 value.js commits>
    → every commit contains EXACTLY its declared paths; the kf set is a SUBSET of §Bounds'
      Owned files, row for row; 0 sibling files swept in across four concurrent seats on
      one index; `scripts/dev/dev.sh` in 0 of 25
$ git log --oneline 7d958f21..HEAD -- src/animation/engine/css/metadata.ts   → 0 commits (un-widened)
$ git log --oneline 7d958f21..HEAD -- demo/                                  → 5 commits, ALL `kf/w5.a`
$ grep -nE '\.(skip|only|todo)\(|xit\(|xdescribe\(' <the wave's 5 test files> | wc -l   → 0
$ git diff --stat 7d958f21 HEAD -- scripts/                       → (empty) — 0 allowlist entries
$ <node_modules patched? copied producer selector? force/reset/stash/amend?>  → none, in any commit
$ <added `catch` across every src-touching commit of the wave>    → 1, the façade SWALLOW, audited above
$ git diff --stat 087599fb^..HEAD -- docs/tranches/X/keyframes/waves/ \
      docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/keyframes/conformance/ \
      docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md     → (empty) — E-3 HELD from the
      wave's OWN OPENING COMMIT's parent, byte-exact, across close · CHECK 1 · REPAIR 1
$ npx vitest run --project library   → 112 passed | 5 skipped (117) files
                                       1256 passed | 3 expected fail | 14 skipped (1273)   [twice]
$ npx vitest run --project library <the wave's 5 files>  → 112 passed (112) = 17+16+57+9+13  [twice]
$ npx tsc --noEmit -p tsconfig.lib.json   → 3 (compositor.ts:79 · waapi.ts:9 · smooth.ts:194, all
                                              TS6133, all pre-existing — 0 of the three files is in
                                              any of the wave's commits)
$ npx tsc --noEmit -p tsconfig.test.json  → 24 (pre-existing); 0 in ANY of the wave's test files
$ npm run proof:structure                 → PASS: scope=src clean (0 violations across R1–R6)
$ npx depcruise --config .dependency-cruiser.cjs src demo → 4 violations / 435 modules / 1557 deps
$ wc -l src/animation/ingest/cssom.ts     → 499 (D-5's corrected integer, re-measured)
```

**Commit families**: `.a`'s ingress census + §F-2 addendum = ONE commit (`500c13fd`, exactly 2 files) ✓ ·
`.b`'s façade + its nine Tier-A repoints = ONE commit (`49cd647b`, 10 files) ✓ · `.b`'s contract + its
conformance test = ONE commit (`46f0b77b`, 3 files) ✓ · `.c`'s cssom cure + fixture + the `:28-33` VJ-9
comment correction = ONE commit (`f7cbc41c`, 2 files, the comment correction verified **inside** the
diff) ✓ · each Tier-C deletion with its replacement in the same commit ✓ · hard order 4 (`format.ts` is
`.c`'s only) ✓ ⟨`git log --name-only -- …/format/format.ts` → `0cfd3b5f` · `5083c3f8`, both `.c`⟩.
**One split, already on the record: D-4**, cured one commit later at `6e371fd4`; this seat does not
re-open the ground `.c` stated for not amending a landed commit on a four-seat index.

**E13 (runbook §5.3), swept at this seat's own clock, four paths + the atlas Q lane, read-only**:
⟨`ls -t docs/tranches/V/coordination/`⟩ newest = `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`,
**rowed** (`O-21`, `INBOX.md:104`) · ⟨`ls -dt ../glass-ui/docs/tranches/*/`⟩ → `BK/` newest, its three
2026-09-17 letters all rowed I-32 · I-33 · I-34 · kf and kf-v-exec coordination hold only letters WE
sent · atlas unchanged since 2026-08-03. **The status-cell scan, with the PREFIX instrument REPAIR 1
installed** ⟨`awk -F'|' … $i ~ /^\*{0,2}UNREAD/`⟩ → **`105 col6` · `106 col6` · `107 col6`**, twice —
**three UNREAD status cells, and this seat reproduces them rather than a zero.** Each row's **Routing**
cell was read whole at this seat: `:105` → *"the **X formation mail seat / X-W0.j** … **No X·P wave, no
X·P act, opens on this row**"* · `:106` → *"the X formation mail seat … Glass is **READ-ONLY always**"* ·
`:107` → *"**X-W0.j / X-EXT-1**, beside I-32"*. **All three are glass-producer rows routed away from
Track B; none is mail addressed to KF.W2's scope; `INBOX.md` was not written by this seat.** **E13's
close condition is MET BY ROUTING** — the same ground KF.W4, KF.W5 and KF.W9 closed on at this clock.

### THE HONEST-RED SET — each gate's relief re-cited at the SPEC's own bytes

| gate | relief, established at the spec bytes by this seat | owner named in this record? |
|---|---|---|
| **G-W2-2** (Tier-A single entry) | **§Bounds' Owned-files table has NO row for `src/animation/engine/css/metadata.ts`** — re-enumerated here from the table itself ⟨30 rows extracted; `engine/css/animation.ts` is present, `engine/css/metadata.ts` is **absent**⟩ — **while G-W2-2's own witness enumerates that module on the parse surface** ⟨`KF-W2.md:484`, `:667`, `:686`: *"`engine/css/metadata` ×2"*⟩. The edge is **pre-existing, not created here** ⟨the module's `@mkbabb/value.js/css` runtime import reads identically at `7d958f21`⟩, and **no lawful in-bounds act can move it**: the import line and both call sites (`:42`, `:102`) live in that file. A write there is an **ESCALATION** under the standing law — *"stop and return it"* — not a licence. The record armed it **at OPEN**, `.b` **returned it un-widened**, and **0 commits touch the path** across close, CHECK 1 and REPAIR 1. **The gate is unreachable by any lawful act of this wave.** | **YES** — ESC-KFW2-1, owner *the X·KF formation*: a dated **§Bounds addendum-beside** naming the path, then one import repoint of 2 collectors + their 2 call sites. |
| **G-W2-8** (count arm, 3 → 1) | **Routed to a successor by the spec itself** ⟨`KF-W2.md:777`: *"**The count is not abandoned — it is HOMED**: `KF-W8`'s MISS-β2 row (unit d / G3) is the publication act and the place the 3 → 1 is measured"*⟩; §Bounds row 122 marks `emit/index.ts` `modify-carve` — ***"ACT is KF.W8's"***. Order re-measured here ⟨LEDGER Track-B row⟩ → **`planned`**: W8 has **NOT** preceded, so the arming condition is met, the arm is RED, and **performing the act here is out of bounds.** | **YES** — `KF-W8 §Rows · MISS-β2 (unit d · G3)`; ledger row `KF.W8 … planned`. |
| *(not a RED)* **G-W2-6 call-site limb** · **G-W2-2b** | Restricted by the gates' own words — *"**CONTRACT ONLY at this wave** … **This wave does not open the call site.**"*; the monitor asserts enumeration and non-growth, never a cure. Both hold at the bytes. | KFED-UNIT (NO-WAVE-OWNER, SS-1/SS-2) · the named per-module owners at G-W2-2b. |

**No unrelieved RED survives.** CHECK 1's fourth row — G-W2-1's site limb, the one RED with **no**
relief — is **GREEN at this seat's own instruments**, which is why this check closes where CHECK 1
refused to.

### DEFECT REGISTER

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **MINOR** | **CHECK 1's D-3 quoted a symbol the record does not contain, and REPAIR 1 struck a sentence that was never written — a misquote inside a quotation marked verbatim, in the one register whose whole subject is receipts that do not reproduce.** CHECK 1 published *"`.b`'s G-W2-8 AFTER-cell publishes a false receipt: … **`serializeTimingFunction` is imported at `parse-facade.ts` only**"*; REPAIR 1's D-3 then wrote **STRUCK** against that string. **`.b` never wrote it.** | ⟨`grep -n serializeTimingFunction docs/…/B/KF-W2.md`⟩ → `:642` (a KF.W5 note), `:1490`, `:1588`, `:1616`, `:1772-1773` — **every hit is CHECK 1's or REPAIR 1's own prose; not one is in a unit receipt.** The sentence `.b` actually wrote, re-read at its own commit ⟨`git log -p -S serializeTimelineOptions -- <the record>` → `b01b7472`⟩, names **`serializeTimelineOptions`**. That symbol's value.js import **does** live at `parse-facade.ts` alone ⟨cmd (ii): `parse-facade.ts` ×15 is the only `/css` runtime path besides `metadata.ts`/emit-half/stray⟩; `scroll/grammar.ts:46` imports it **from the façade** and calls it at `:144`, so the receipt's *"single `src/` caller"* half is loose **for that symbol** while true for the emit mirror it is about. | **Correction-beside, recorded here and nowhere else** (E-3: no prior seat's bytes are edited). The struck string is retired as a **phantom quotation**; `.b`'s real sentence is re-read above and is **not** the false receipt CHECK 1 convicted. **The gate verdict does not move in either direction**: G-W2-8's façade-side clause stands on **`serializeDeclaration`**, re-measured at this seat — 4 hits in `emit/css-text.ts` + `parse-facade.ts:66`/`:206`, exactly one consumer outside its own module. **The general lesson is the wave's own**: a quotation is a measurement, and a check that mis-transcribes the symbol it convicts has published a reading its own command cannot return. |
| **D-2** | **MINOR-with-mitigation** *(does not block)* | **The declared commit-family split at `a461c78c` / `6e371fd4` is real and stands on the record** (CHECK 1's D-4). §Carry F2 binds the docblock correction **into** the cure commit; it landed one commit later. | ⟨`git show a461c78c -- …/composition.ts`⟩ adds the façade import + `numericLeaves` and does not touch the module docblock; ⟨`git show 6e371fd4`⟩ is that one-sentence correction, 1 file. | **Already cured in-wave**, both commits pushed, self-disclosed by `.c` with its ground (four seats on one index; amending a landed commit is the more dangerous act). **Not re-opened**; recorded so the family rule is never read as unbroken. |
| **D-3** | **INFO** | **The spec's own floor integer is still internally inconsistent** — G-W2-1's assertion line, its second footnote and the §Goal-criterion sentence read **19 / five**; §Carry **F3** reads **20** with **six** positive bullets. | ⟨`KF-W2.md:649`⟩ *"a **FLOOR of 19** today"* · ⟨`:48`⟩ *"the **nineteen enumerated postures**"* · ⟨`:562`/`:564`⟩ row 20 = `KF-KE-58 · C-m7`, *"The registry's floor is therefore 20"*. `POSTURES.md` publishes **20** over **58**, re-measured here. | **`.a`'s disposition is CORRECT and this seat affirms it a second time**: the register is the gate, the latest repair round governs within it, and a registry publishing 19 while F3 enumerates 20 would red G-W2-1 by its own falsifier. **0 spec bytes moved by any seat of this wave** (E-3 verified above). **Owner unchanged: the next KF-W2 repair round / check**, to reconcile in the gate's own voice by a dated addendum-beside. |

### THE FOUR-VERB LINE, AND WHY THE STATUS MOVES WHILE THE VERB DOES NOT

The spec is **byte-untouched** (E-3 above), so **no verb in its own table moved** — correct: VERIFIED is
*"stamped only at X·KF's close"*, and IMPLEMENTED is conditioned on *"gates green"* while **G-W2-2
stands RED**. The close seat's correction of the LEDGER cell `IMPLEMENTED → PARTIAL` is **affirmed a
second time and independently re-grounded** here; REPAIR 1 retired one of its two grounds (the site
limb) and the other — metadata.ts — is measured RED again at this seat.

**What moves is the LEDGER's state-machine STATUS, not the verb.** The ledger's own vocabulary makes
`CLOSED` the state *"verify-only close + fresh check CONFORMANT"*, and that condition is now met: a
verify-only close was performed, CHECK 1's register was discharged, and this fresh adversarial pass
returns **CONFORMANT-HONEST-RED** with every remaining RED relieved and owner-named. The row therefore
reads **CLOSED 2026-09-17 (honest-RED: G-W2-2 · G-W2-8's count arm)** with the four-verb line **still
PARTIAL** — the same shape KF.W9 already carries in this ledger. **Nothing about ESC-KFW2-1 is
discharged by closing**: it is an authoring act the X·KF formation owes, and it survives this close.

### SUCCESSOR CONJUNCTS, VERIFIED AGAINST THIS WAVE ⟨LEDGER Track-B rows, read at this seat⟩

- **KF.W7** (`opens after KF.W2 — posture registry`) — its conjunct is **GREEN**: `POSTURES.md` is
  published, single-sourced, **20 floor rows over a 58-of-58 basis**, and §Sequencing hard order 2
  (*"KF.W7 may not decide a failure posture before KF.W2 publishes the registry"*) is discharged.
  **KF.W7 is NOT blocked by this wave.**
- **KF.W8** (`W0·W4·W5 (+W6 SCOPED for G7)`) — **names no KF.W2 conjunct**; unblocked from this end, and
  it carries G-W2-8's homed 3 → 1. Its own W6 conjunct is `planned` — not this wave's to move.
- **KF.W10** (`W0·W1·W9 + W2·W4·W5·W6·W7·W8·W9 **IMPLEMENTED**`) — **LAWFULLY BLOCKED** from this end:
  KF.W2's verb is **PARTIAL**, not IMPLEMENTED, and closing the row does not stamp the verb.
- **KF.W3** — `GATE-KEYED` on `RC-P(V)`, untouched. **OP-5 held**: `4.0.0` installed, no repin, at every
  seat of this wave and at this one.

### THE GOAL CRITERION, MEASURED AT THE BYTES BY THIS SEAT

*"exactly one module in `src/animation/**` that speaks to value.js's grammar"* — **2 paths**, the second
(`engine/css/metadata.ts`) **omitted by the spec's own §Bounds** and relieved above. *"exactly one
declared thing that happens when a CSS string is bad"* — **MET at these bytes**: four declared postures,
**zero** `/css` parse-Result branches anywhere in `src/` outside the façade under two instruments that
can fail, and a registry of **20** over **58**. *"one published answer to which grammar belongs at this
seam"* — **MET**: the contract exists, is executable at **16 tests / 6 clauses**, and no assertion in it
can pass vacuously. *"A wave that adds a wrapper and leaves the twenty-one call sites and the … postures
standing has failed this goal"* — **not that failure**: 19 of 21 sites routed, 20 postures enumerated,
6 Tier-C regex bodies dead, the identifier injection cured, and the two sites that stand are the single
module the spec forgot to bound.

**CHECK-2 VERDICT: CONFORMANT-HONEST-RED** — 0 BLOCKER/CRITICAL/HIGH · 2 MINOR · 1 INFO · **9 of 9
clause verdicts reproduce**. **Honest-RED set, each relieved at the spec's bytes and owner-named:
G-W2-2 (ESC-KFW2-1, owner the X·KF formation) · G-W2-8's count arm (owner KF.W8 `§Rows · MISS-β2`,
unit d / G3).** **The wave CLOSES; the verb stays PARTIAL; ESC-KFW2-1 stays open.**
