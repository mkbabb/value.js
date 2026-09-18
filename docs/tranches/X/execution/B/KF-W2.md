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
