SERVED MODEL: claude-opus-5[1m]

# X.P.W3 — Totality and Recovery to Spec — EXECUTION RECORD (Track D, X·P)

Spec: `docs/tranches/X/parse-that/waves/W3.md` (673 L, read WHOLE at this seat).
Authority of order: `../EXECUTION-RUNBOOK.md` §1.4 (Track D strictly serial) · §3.4 (locks) · §5
(seat law). Owner-gated items: `../COHESION.md` §0i · §0j (§0j.E for X·P) · §0k · §0l · §0m · §0n
— read to the file end (1,042 L; §0n.6 is the last heading).

**Clock**: 2026-09-18 00:1x–00:3x EDT. The LEDGER row is dated **2026-09-17** because that is the
sitting the begin-word opened and the date every sibling row in this tranche carries; the commit
timestamps are the living receipt for the rest (the same statement X.P.W2's close made at K.10).

---

## Open

### O.1 — E13 Step-0: the four-path mail sweep, at this seat's own clock

Swept read-only and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **status cell**,
never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**).

| # | path | measured | reading |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `docs/tranches/V/coordination/` | 10 + 16 files (dirs and `INBOX.md` excluded — SELF-COUNT law). 7 + 4 basenames appear in no INBOX row | **0 unrowed value-addressed.** Path 1's seven are our own V-tranche authorities (`ARCHITECTURE.md`, `VISUAL-CONSTITUTION.md`, …), not mail. The four `value-inbox-2026-07-20-*` are **outbound** — each opens *"FROM: the value.js union-apotheosis program"*, addressed *"→ the active V-next Codex fleet"* — letters we sent, filed in our own dir |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/` — **BK re-confirmed the newest tranche dir**. 7 files; 2 unrowed | **0 unrowed value-addressed.** The two (`ATLAS-BATCH-ROUTING.md`, `ATLAS-TO-GLASS-2026-08-03-AUDIT-BATCH.md`) are atlas→glass, not ours. The three 2026-09-17 letters are rowed **I-32 · I-33 · I-34**; `glass-outbound-2026-08-29-valuejs-o20-ack.md` is **I-30**, the standing tail |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | 12 files; 4 unrowed | **0 unrowed value-addressed.** Every `VALUEJS-INBOUND-*` is ours; `GLASS-INBOUND-*` / `ATLAS-INBOUND-*` / `SPEEDTEST-INBOUND-*` / `INBOUND-LEDGER.md` are addressed to keyframes |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | 28 files; 23 unrowed | **0 unrowed value-addressed.** All 23 are atlas-internal P-lane artefacts (challenge verdicts, stock reports, tag-day runbook) or keyframes↔atlas letters. The value-addressed atlas letters live in the **Q** lane and are already rowed (I-31 and the 08-03 rulings) |

⟨cmd⟩ status-cell extraction over every `| I-n` / `| O-n` row → **0 cells read UNREAD**.
⟨cmd⟩ `grep -c '^| I-' INBOX.md` → **36**. **Result: 0 unrowed · 0 UNREAD in X.P.W3's scope · no
new `I-n` minted at this seat; I-34 is the tail of the rowed inbound set and I-30 the standing
obligation tail.** A dated sweep line is appended at the file end.

### O.2 — Preconditions, verified at the bytes AND in the ledger

`W3.md` §2 *"Opens after"* names W0 · W1 · W2, and **§2b makes the dependency the conditions, not
the labels.** Each was re-measured here; none was inherited.

| # | precondition (`W3.md` §2b) | measured at this seat | state |
|---|---|---|---|
| **OP-1** | Owner begin-word for X·P | `COHESION.md` **§0j** (the begin-word verbatim) and **§0j.E** — *"both owner words are given, dated 2026-09-17: the begin-word … opens the X·P lane; the release word is 'You are authorized to publish, push, and pull whatever items you need'"* | **MET — GRANTED, cited by id, never inferred** |
| **OP-2** | X.P.W0 authentication PASSED; recompute every hash and census | LEDGER `X.P.W0 CLOSED 2026-09-17`. Re-derived here: builder ⟨cmd⟩ `shasum -a 256 …/parser-novelty-v12-construction/BUILD-V12.py` → `0732ebc27bc712d64d0b6ade30db13b9d8c7817524268af7d3d7474654b64ee8`, `stat` → `243827 100644 1 Aug 2 13:19:15 2026` · residue ⟨cmd⟩ `shasum -a 256 …/__pycache__/BUILD-V12.cpython-314.pyc` → `de1d62ff18da4851968136b1e3190c00f6c463b9b8a5e7b5d23103155cc00937`, `154221 100644 1 Aug 2 11:36:36 2026` · root holds **2** files · `find -newermt '2026-09-01'` → **0** · target ⟨cmd⟩ `ls -d …/parser-novelty-and-experiment-v12` → *No such file or directory* (**ABSENT**, as the pin requires) | **MET — every pinned identity string-equal to W0's table; no v12 target; no stale receipt** |
| **OP-3** | The fresh writer root exists and is the only writer; frozen roots byte-unchanged | ⟨cmd⟩ `ls -d /Users/mkbabb/Programming/parse-that-css-totality-p2` → **present**; ⟨cmd⟩ `git -C <p2> status --porcelain` → **1** line, `?? .worktrees/` — §4b's prescribed container and nothing else. Frozen root quadruple ⟨cmd⟩ `git --no-optional-locks -C …/parse-that {rev-parse HEAD; worktree list; branch -a; status --porcelain}` → HEAD `ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42` · worktrees **7** · branches **33** · porcelain **31** — **identical to X.P.W0's pinned quadruple and to X.P.W2's close reading**; the 31 lines are the pre-existing OP-6 residue, not this program's | **MET** |
| **OP-4** | X.P.W1's bijection is closed, both set-differences ∅ | X.P.W2 CHECK 1 **CK.5** reproduced it at an independent seat: *"G-2's bijection 22/22/22 with DECLARED-ABSENT 0; G-6's 52-map ∅ both ways"*. LEDGER `X.P.W1 CLOSED 2026-09-17` | **MET** (cited, epoch rule — not re-derived at this seat) |
| **OP-5** | The bench BAR | No bar is set anywhere in W0/W1/W2; `OWNER-GATED-PENDING-RATIFICATION` stands. **`COHESION.md` §0j.E OC-1 rules the disposition**: *"ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* — G-10 **reports**, never adjudicates | **MET — and no ruling is required to open. Inventing a bar is a defect** |

**Predecessor artefacts, present at the bytes** (`W3.md` §2 / §4a / §10):

| conjunct | ⟨cmd⟩ | reading |
|---|---|---|
| *"X.P.W2 holds `src/css/**` in the fresh root"* (§4a) | `ls <p2>/typescript/src` → `css parse`; `find <p2>/typescript/src/css -type f \| wc -l` | **17 files, 5,259 L** — `algebra/{grammar,ops,tables}.mjs` · `lowering-js/**` · `lowering-wasm/**` · `reify/term-alg.mjs` · `build.mjs` · `build/{ac1.js,ac1.d.ts,ac1.wasm}` · `harness-adapter.mjs`. **PRESENT** |
| *"both targets built"* / W4 §10 *"the Wasm artifact"* | `find <p2> /Users/mkbabb/Programming/value.js -name '*.wasm' -not -path '*/node_modules/*' -not -path '*/.git/*'` | `<p2>/typescript/src/css/build/ac1.wasm` present, plus the four candidate-tree copies. **The 2026-08-03 baseline's "zero project artifacts" is SUPERSEDED — the subject now exists** |
| the fresh root owns its toolchain (§0l E-1) | `cat <p2>/package.json` | `"private": true`, exact pins `tsx 4.23.13` · `typescript 5.9.3` · `vitest 3.2.7`; `<p2>/node_modules` **PRESENT** |
| ONE-root law (§4b) | `git -C <p2> worktree list` · `ls -d /Users/mkbabb/Programming/parse-that*` | 4 worktrees, **all inside** `<p2>/.worktrees/` (`ac1` `130f72d` · `ac2` `a7ac4ea` · `ac3` `f934956`); **no `<p2>-w3*` sibling exists**; ⟨cmd⟩ `git -C …/parse-that worktree list \| grep -c totality-p2` → **0** — no worktree of the read-only root |
| standing invariant gate 27 / W4 G-2 | `git --no-optional-locks status --porcelain -- src api demo test e2e \| wc -l` | **0**, double-run. `scripts/dev/dev.sh` → ` M`, **unstaged, untouched** |

**No precondition fails. The wave opens.**

### O.3 — What COHESION rules for this wave (cited by id; never presumed, never re-opened)

`W3.md` is dated 2026-08-04-era and **predates** the X.P.W2 docket. Five rulings name X.P.W3 by
name as their landing site, and two W2 residuals name *"W3's open seat"* as owner. They are **not**
in `W3.md` §5's unit list, which is why unit **`.0`** exists (the X.P.W2.0 precedent, minted at
§0l for the same reason).

| id | ruling | this wave's act |
|---|---|---|
| **§0n.3** | E-2 · E-3 · E-4 · E-5 · E-8 — *"landed by **X.P.W3's first act** as ONE dated addendum-beside to `ALGEBRA.md` (both homes, sha256-equal), never by `.i`"* | `.0`, commit 1. **E-2** cure (3): `balanced-tail` `DROP` re-kinded to `skipped`, re-measured on the promoted seed (2,035 → 0, no other product moved); fallback to (1) the seventh kind `opaque` only if an OP-13 invariant breaks; **(2) widening `π_keyword` is REFUSED**. **E-3**: `DISPATCH` joins §5.2's pass-through list; §10.3's two inert `CUT`s struck. **E-4**: the `DISPATCH` arm first (exactly 3 slice rows REJECT → ok). **E-5**: EQ-5's sixth coordinate dropped from the cross-lowering tuple, arena watermark printed as a G-8 row. **E-8**: `color-body` inlined; §8 D-3's two-`REF` count stands |
| **§0n.4** | E-6 — `harness/bench/lib/engines.mjs` may gain an `--engine=<adapter>` registration path, *"landed by **X.P.W3** under a dated E-3 addendum to W1's §Bounds, so G-7 has a subject"*; K-5 stays recorded-not-gating (OC-1) | `.0` lands the dated `W1-ADDENDA-2026-09-18.md` beside `W1.md` (never an edit of it) and the registration path; `.d` prints the table for **both lowerings** of the graduated seed, **two runs pasted** |
| **§0n.5** | E-7 / OP-7 — *"W3 builds the 52 on `<p2>/typescript/src/parse/**` — the fresh root's own library — **never on another repository's `node_modules`**"*; *"the seed's one import specifier is re-pointed by W3's first act"*; the clone point's three `src/parse/**` commits are **ADOPTED as the base**; `w2/ac3-scan-union` is *"consumed at W3's open **by measurement**"* | `.0`. **Measured here**: `<p2>/typescript/src/css/lowering-js/js-alg.mjs:25` imports `PARSE_THAT_DIST` from `harness/bench/lib/engines.mjs:43` = `…/value.js/docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that/dist` — **another repository's `node_modules`, exactly what OP-7 forbids**. `.0` re-points it to `<p2>/typescript/src/parse/**`. F-h8: `w2/ac3-scan-union` tip `f934956` carries `76033aa` (*"the byte-class scan union"*); `.0` consumes it **only** on a measurement of library `tsc` + `vitest` unchanged-or-better, else leaves it on its branch |
| **§0n.1 tail** | *"What AC-2 had that W3 keeps (carried as W3 open-seat obligations, not lost)"* — the closed-union enforcement wired so a 23rd operation halts **both** lowerings (AC-1's analog: the `buildGrammar` destructure of exactly 22, made a **wired check**); AC-2's stripped-`PATH` / scratch-`HOME` / different-node **K-9 recipe becomes W3's K-9 procedure**; `<p2>/.worktrees/ac2` at `a7ac4ea4` **stays** | the wired 22-check rides `.b` (it is a closure obligation of the same shape as G-4 and shares `.b`'s script); the K-9 procedure rides `.d`'s artifact-reproduction leg. **Measured**: `buildGrammar` at `algebra/grammar.mjs:24`, its header stating *"written against the twenty-two"* — today a **comment**, not a check. `.worktrees/ac2` present, untouched |
| **§0j.E OC-1** | *"ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* | `.d`'s G-10 prints ratios and the literal `BAR: OWNER-GATED-PENDING-RATIFICATION`; **no verdict, no bar, no reconciliation with the 07-20 "LIVE regex FASTEST ~1.8×" reading — the contradiction is a row in the table, not an erasure** |

**Carried from X.P.W2's close (`X-P-W2.md` K.8), owner column = "W3's open seat":**

| id | severity | measured at this seat | owner here |
|---|---|---|---|
| **D-c1 / D-x3** | MAJOR | ⟨cmd⟩ `grep -n 'from ' <p2>/typescript/src/css/build/ac1.d.ts:7` → `from "../../../../../../../value.js/docs/tranches/V/megatranche/prototypes/css-parser/cand-o/vendor/value-js-4.0.0/dist/subpaths/css"` — **seven levels up**. From the worktree (`<p2>/.worktrees/ac1/typescript/src/css/build/`) that lands on `/Users/mkbabb/Programming/value.js/…` and resolves; from `<p2>` proper it lands on `/Users/value.js/…` and does not. **The defect reproduces exactly as K.8 states it.** Cure = `node typescript/src/css/build.mjs` at `<p2>` — the artifact's own declared mechanism | `.0`, **one act with the §11.3 / §0n.5 re-point, not two** (K.8's own words) |
| **D-i2** | MAJOR | `<p2>/harness/w2/coverage-52-report.mjs` present; throws when a candidate is present, so G-6's survivor-verb half is unrunnable | `.0` |
| **R-i1** | INFO | ⟨cmd⟩ `grep -n jsArtifactReproduction <p2>/typescript/src/css/harness-adapter.mjs:48` → `["node experiments/w2/ac1-tagless/build.mjs"]` — carried unaltered by `.i` **on purpose** (§11.2 permitted relative-*import* adjustments only). It is now in W3's remit and still true at the candidate location | `.0` |
| **R-i2** | INFO | ESC-i2's GREEN is narrow: 1 of 403 program files under `typescript/src/css`, `allowJs` absent, sixteen `.mjs` not typechecked | `.0` records the shape; `.a`'s assignability compile is the widening |
| **R-i3 / F-h2** | INFO | `eq-six.mjs`'s verdict line reads *"2035 divergences between the two lowerings (K-1)"* while EQ-1..EQ-5 = 0; the lowerings agree, EQ-6 is COMP-1 failing identically in both | `.0` corrects the label beside, never the measurement |
| **D-i1** | MINOR | §0n.2's tail cites a **§0n.7** that does not exist (⟨cmd⟩ `grep -n '^### §0n' COHESION.md` → §0n.1 … §0n.6); the substance is §0n.5 | **orchestrator** — recorded here, not cured by this wave (E-3: a ruling's dangling cross-reference is curable only by its author) |

**Spec-vs-tree divergence, recorded at open so no unit improvises it.** `W3.md` §5 names
`src/css/{lower,diagnostics,codes}.ts`, `entry.ts`, `bounds.ts` — **`.ts`**. The graduated survivor
is **`.mjs` throughout** (17 files, zero `.ts` under `src/css`): the spec was authored 2026-08-04,
before AC-1 was selected. §4's first row admits the whole glob `<p2>/typescript/src/css/**`
create/modify, so **no bounds question arises**; each unit keeps the spec's *names* and adopts the
tree's *extension*, and states the choice in its receipt. This is a transcription reconciliation,
not a scope change.

---

## Baseline — the ten hard-gate conditions, run READ-ONLY before any cure

Every command is the spec's own, at its §6 coordinate. Nothing was cured, installed, or written in
`<p2>` by this seat. Every count double-run; both runs identical.

| gate | subject | ⟨cmd⟩ (the spec's own) | BEFORE reading | verdict |
|---|---|---|---|---|
| **G-1** UNIVERSE-52-TOTAL | all 52 exports TOTAL | `node scripts/css-universe.mjs --check --pinned-value-commit <sha>` + `npx tsc --noEmit -p test/css-totality/tsconfig.assignability.json` | `test -e <p2>/typescript/scripts/css-universe.mjs` → **ABSENT**; the universe itself re-measured below = **52**, of which **0 TOTAL** | **RED-AS-EXPECTED** |
| **G-2** R1 ANCHOR, ZERO THROWS | the unmodified probe, exit 0 | `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` | **324 throws / 1548 calls · 1 failure mode · 4 of 9 entry points RED** — pasted in full at B.1 | **RED-AS-EXPECTED, reproducing the 2026-08-03 baseline to the call** |
| **G-3** TYPED RECOVERY AT THE BOUNDARY | zero throws, zero `undefined` | the ten-head empty-body probe against the working-tree dist | **empty-body throws: 10/10**, every one `TypeError` — pasted at B.2 | **RED-AS-EXPECTED, 10/10 exactly as the spec pasted** |
| **G-4** UNION CLOSED, NO FALLBACK | both set-differences ∅ | `node scripts/css-recovery-closure.mjs --corpus … --frozen-union …` | `test -e <p2>/typescript/scripts/css-recovery-closure.mjs` → **ABSENT**; no candidate union exists to close | **RED-AS-EXPECTED** |
| **G-5** DUAL-TARGET IDENTITY | byte-identical `{ok,code,start,end,expected,actual}` | `node scripts/css-dual-target-identity.mjs --js dist/css.js --wasm dist/css.wasm --corpus …` | **MEASURE-AT-OPEN, taken**: the comparator `test -e <p2>/typescript/scripts/css-dual-target-identity.mjs` → **ABSENT**. **The subject, absent on 2026-08-03, now EXISTS** — `<p2>/typescript/src/css/build/ac1.wasm` + `lowering-js/` + `lowering-wasm/`. So the gate is RED **for want of the comparator, not for want of the artifact** | **RED — measured, not inferred; the 08-03 "zero project artifacts" reading is superseded and said so** |
| **G-6** SPEC CONFORMANCE ROWS | 11 named rows | `npx vitest run test/css-totality/spec-conformance.test.ts` | `test -e` → **ABSENT**. The inherited incumbent readings (`parser-band.md`) stand: legacy 4-arg forms REJECT; the two `hsl` spellings disagree 100×; `rgb(300 -20 3)` → `[300,−20,3]`; `rgb(1 2 3 / 1.5)` rejects; all seven unsound inputs ACCEPT | **RED-AS-EXPECTED** |
| **G-7** EQUIVALENCE FLOOR, FULL SURFACE | 0 mirror-defects over 52 | `npx vitest run test/css-equivalence/` + `node scripts/css-universe.mjs --cross-check-ledger …` | `test -d <p2>/typescript/test/css-equivalence` → **ABSENT**; `test -e docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` → **ABSENT**. The floor is inherited as a **floor**, not as a pass: GREEN at 403-string pilot scale only, **never run** against the 52 | **RED-AS-EXPECTED** |
| **G-8** LABELS, UNARMED, SILENT | `expected[0]` a named production; 0 `console.*` | `npx vitest run test/css-recovery/labels.test.ts` + `node scripts/css-recovery-closure.mjs --assert-no-console` | both **ABSENT**. O-15 PT-01's incumbent reading stands: `label` is a no-op unless armed, and arming couples an unconditional `console.error` | **RED-AS-EXPECTED** |
| **G-9** BOUNDED BY CONSTRUCTION | depth `ok:false`; `resetPackrat()` disarms | `npx vitest run test/css-recovery/boundary/{depth,latch}.test.ts` | both **ABSENT**. O-15 PT-04/PT-03 stand: deepest OK 7,761, thrown `RangeError` at 7,762; `PACKRAT_ARMED` a one-way latch (93.9 → 138.2 ns = 1.47×; `resetPackrat()` → 139.3) | **RED-AS-EXPECTED** |
| **G-10** BENCH TABLE, BAR OWNER-GATED | three legs, arm-state per row | `node scripts/css-bench-three-leg.mjs --baseline-tarball … --rounds 40 --discard 10 --denominator 1636680` | `test -e <p2>/typescript/scripts/css-bench-three-leg.mjs` → **ABSENT**; no candidate table exists | **RED-AS-EXPECTED** |

**10 of 10 RED before cure. 0 GREEN-BEFORE-CURE (R.2 finding count: zero).** One gate, **G-5**, is
the spec's declared MEASURE-AT-OPEN and its reading moved in the candidate's favour: the artifact
it had no subject for on 2026-08-03 exists today.

### B.1 — G-2's anchor probe, pasted verbatim (the probe run UNMODIFIED)

```
⟨cmd⟩ node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs
RED  parseCssColor             102/172 throw
RED  parseCssScalar            102/172 throw
RED  parseCssValue              60/172 throw
RED  parseCssValues             60/172 throw
ok   parseKeyframeSelector       0/172 throw
ok   parseStylesheet             0/172 throw
ok   parseTimingFunction         0/172 throw
ok   parseAnimationTimeline      0/172 throw
ok   parseAnimationRange         0/172 throw

TOTAL 324 throws / 1548 calls
DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')

RED — 324 totality violations. A ParseResult-returning parser must not throw.
```

Identical, call for call, to the baseline `W3.md` §6 pasted on 2026-08-03. The probe packs this
repo and installs the tarball into a `mkdtemp` dir (`execute, no write` per §4 — its only
repo-side effect is `npm`'s `prepare` rebuilding the **git-ignored** `dist/`; ⟨cmd⟩
`git check-ignore -v dist` → `.gitignore:17:dist/`, and gate 27 reads **0** after).

### B.2 — G-3's empty-body class, and the universe count

```
⟨cmd⟩ node --input-type=module -e "const m=await import('./dist/subpaths/css.js');
  for (const h of ['rgb','rgba','hsl','hsla','lab','lch','oklab','oklch','hwb','color'])
    try { m.parseCssColor(h+'()') } catch(e){ console.log('THREW', h+'()', e.constructor.name) }"
THREW rgb()   TypeError      THREW rgba()  TypeError      THREW hsl()   TypeError
THREW hsla()  TypeError      THREW lab()   TypeError      THREW lch()   TypeError
THREW oklab() TypeError      THREW oklch() TypeError      THREW hwb()   TypeError
THREW color() TypeError
empty-body throws: 10/10
```

```
⟨cmd⟩ node -e "…Object.keys(await import('./dist/subpaths/css.js')).length"      → 19
⟨cmd⟩ awk over the `export type { … } from "./types"` block of src/css/index.ts  → 33
                                                                    universe = 52
```

The 19 runtime names, read from the bytes: `coerceToSyntax` · `collectAnimationOptions` ·
`collectCustomFunctions` · `collectDeclarations` · `collectKeyframes` ·
`collectPropertyDescriptors` · `collectStyleRules` · `collectTimelineOptions` ·
`parseAnimationRange` · `parseAnimationTimeline` · `parseCssColor` · `parseCssScalar` ·
`parseCssValue` · `parseCssValues` · `parseKeyframeSelector` · `parseStylesheet` ·
`parseTimingFunction` · `serializeCssColor` · `serializeTimelineOptions`.
Assay coverage at the 07-20 census: **0 of 52 TOTAL** (runtime 0/3/16, types 0/0/33).

### B.3 — The contract addenda's subjects, measured before dispatch so `.0` cannot improvise them

| ruling | subject | ⟨cmd⟩ reading |
|---|---|---|
| §0n.3 | both `ALGEBRA.md` homes | `shasum -a 256 docs/tranches/X/parse-that/algebra/ALGEBRA.md <p2>/experiments/w2/contract/ALGEBRA.md` → **`67c8253abaecb29a0b16a862bf63ad25ff1140d91f06248c843b9c253fc537de`** for both — **string-equal today**; the addendum-beside must land in both homes and leave the equality true for its own pair |
| §0n.4 | E-6's registration surface | `grep -n 'export const PARSE_THAT_DIST' <p2>/harness/bench/lib/engines.mjs` → `:43`; no `--engine=` path exists (X.P.W2 K.7 re-measured `grep -c 'w2' bench.ts` → **0**) |
| §0n.5 | the seed's one external specifier | `<p2>/typescript/src/css/lowering-js/js-alg.mjs:25` → `import { PARSE_THAT_DIST } from "../../../../harness/bench/lib/engines.mjs"`, and `engines.mjs:43` → `${WORKSPACE}/node_modules/@mkbabb/parse-that/dist` with `WORKSPACE = /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser`. **The seed loads the combinator library out of another repository's `node_modules` — the exact thing OP-7 forbids** |
| §0n.1 | the wired 22-check | `grep -n buildGrammar <p2>/typescript/src/css/algebra/grammar.mjs` → `:5` (a comment, *"written against the twenty-two"*) and `:24` (the function). **There is no check** — a 23rd operation halts nothing today |
| K.8 F-h8 | `w2/ac3-scan-union` | `git -C <p2> rev-parse w2/ac3-scan-union` → `f93495602ee17e50b2ff97ab86bed32b28dc9966`; `76033aa feat(parse/scan): the byte-class scan union` is its parent. Unconsumed, on its branch |

---

## Unit plan

**6 units in 5 ordered groups, peak concurrency 2.** `W3.md` §2 declares **5** units in 3 phases
(3 ∥ → `.d` → `.e`). The sixth, **`.0`**, is not in §5: it is COHESION **§0n.3**'s *"X.P.W3's first
act"* plus §0n.4, §0n.5 and the two K.8 residuals whose owner column reads *"W3's open seat"* — the
same shape, and the same reason, as X.P.W2's `.0` (minted at §0l). **The dispatched roster is
therefore six, recorded here in advance so `.e`'s L-13 harvest sub-gate (*"count equal to the units
dispatched"*) has a fixed referent and cannot be argued after the fact.**

Concurrency is capped at **2** (runbook §5.1: the owner's four-workflow cap, *"intra-wave
concurrency yields first"*), so §5's three-way phase 1 becomes `.a` ∥ `.b` → `.c`. The split is
**not arbitrary**: it follows the data flow the spec's own gates declare — `.a` generates
`test/css-totality/corpus.json`, which is G-4's named operand for `.b`; `.b` defines the frozen
8-code module, which `.c`'s boundary guard must return a member of; and `.b`'s
`test/css-recovery/**` and `.c`'s `test/css-recovery/boundary/**` are a **nested glob**, which §4a
names as *"the hidden conflict the X·V W5-D1 defect taught"*. Sequencing them removes the
only path overlap in the wave.

| group | units | why this shape |
|---|---|---|
| 1 | `.0` | §0n.3: *the wave's first act*. Nothing else may commit before it; the D-c1 rebuild and the OP-7 re-point are the substrate every later gate reads |
| 2 | `.a` ∥ `.b` | §5 phase 1, the two seats with genuinely disjoint modify sets (`scripts/css-universe.mjs` + `test/css-totality/**` vs `src/css/{lower,diagnostics,codes}` + `scripts/css-recovery-closure.mjs` + `test/css-recovery/**`) |
| 3 | `.c` | §5 phase 1's third seat, run alone: it imports `.b`'s frozen-code module and its test dir is nested inside `.b`'s |
| 4 | `.d` | §5 phase 2, serial — *"needs `.a`–`.c` landed"* |
| 5 | `.e` | §5 phase 3, the fresh Fable adjudicator, after `.d` commits |

**Dispatch-time gate assignment, recorded in advance so it cannot be improvised.** `W3.md` §5
assigns sub-gates to `.a` (G-1, G-6), `.b` (G-4, G-8), `.c` (G-3, G-9), `.d` (G-7), `.e` (the close
sub-gate) — **G-2, G-5 and G-10 are named by §4 as create/execute rows but by no §5 unit.** §2c
routes G-2 to *"units `.a`/`.b`"* and G-5 to *"unit `.c`"*, but both are **whole-surface**
measurements that cannot be honestly read until all of `.a`–`.c` have landed (G-2 targets all nine
public parsers; G-5 compares both built targets over the full corpus), and G-10 is a measurement of
the integrated tree. **All three are assigned to `.d`, the only serial post-integration seat**,
with `.a`/`.b`/`.c` running them as progress probes and `.d` taking the reading of record.

| unit | model | spec sections | writable set | gates | brief |
|---|---|---|---|---|---|
| **X.P.W3.0** | opus | COHESION §0n.1 tail (L1016–1019) · §0n.3 (L1024–1031) · §0n.4 (L1032–1035) · §0n.5 (L1036–1039) · `X-P-W2.md` K.8 rows D-c1 / D-i2 / R-i1 / R-i3 / F-h8 · `W3.md` §4 (L148–183) · §4a (L184–197) · §7 (L550–559) | `docs/tranches/X/parse-that/waves/W3-ADDENDA-2026-09-18.md` (create) · `docs/tranches/X/parse-that/waves/W1-ADDENDA-2026-09-18.md` (create) · `docs/tranches/X/parse-that/algebra/ALGEBRA-ADDENDA-2026-09-18.md` (create) · `<p2>/experiments/w2/contract/ALGEBRA-ADDENDA-2026-09-18.md` (create, **sha256-equal**) · `<p2>/typescript/src/css/**` (the re-point + rebuild) · `<p2>/harness/bench/lib/engines.mjs` · `<p2>/harness/w2/coverage-52-report.mjs` | turns none of the ten; **unblocks the literal form of G-1 · G-4 · G-5 · G-7 · G-10** and G-6's survivor half | Write the dated §4 addendum-beside **FIRST** (never edit `W3.md`): it admits `<p2>/harness/bench/lib/engines.mjs` (§0n.4's own grant), `<p2>/harness/w2/coverage-52-report.mjs` (D-i2), the three addenda files and itself. Then the **ONE** dated `ALGEBRA` addendum-beside in **both homes, sha256-equal** (§0n.3): E-2 cure (3) `balanced-tail DROP → skipped`, **re-measured on the promoted seed (2,035 → 0, no other product moved)**, falling back to (1) `opaque` only on a cited OP-13 break — **(2) is REFUSED**; E-3 `DISPATCH` into §5.2's pass-through list + the two inert `CUT`s struck; E-4 `DISPATCH` arm first (exactly 3 slice rows REJECT → ok); E-5 sixth coordinate dropped, watermark a G-8 row; E-8 `color-body` inlined. Then E-6's `--engine=<adapter>` path under the dated W1 §Bounds addendum. Then **ONE act, not two** (K.8): re-point the seed's `PARSE_THAT_DIST` import to `<p2>/typescript/src/parse/**` (OP-7 — never another repo's `node_modules`) **and** run `node typescript/src/css/build.mjs` at `<p2>` proper, curing D-c1's 7-level specifier; paste the before/after of `ac1.d.ts:7`. Cure D-i2, re-point R-i1's `jsArtifactReproduction`, correct R-i3's label beside. Consume `w2/ac3-scan-union` `f934956` **only** on a measured library `tsc` + `vitest` unchanged-or-better, else leave it. Commit body states base `f5757082` and cites §0n.3/§0n.4/§0n.5 by id. |
| **X.P.W3.a** | opus | `W3.md` §5 `.a` (L237–251) · §3 items 1–3 (L92–98) · §6 G-1 (L348–370) · G-6 (L451–466) · §4/§4a/§4b (L148–226) · §11 items 2 and 4 (L644–655) | `<p2>/typescript/scripts/css-universe.mjs` · `<p2>/typescript/test/css-totality/**` · `docs/tranches/X/parse-that/evidence/W3/universe-52.json` (+ sha256 sidecar) | **G-1**, **G-6** | Emit the 52-row matrix **mechanically from `src/css/index.ts` at a pinned value.js commit** — never hand-transcribed (§11 guardrail 2: the universe cannot be quietly narrowed to what the candidate covers). 19 runtime by name **and** shape, 33 types by **bidirectional** assignability in one `tsc --noEmit -p test/css-totality/tsconfig.assignability.json`. Per row `{name, kind, arity, accept[], reject[], verdict}` on the `coverage.md` legend; **a row marked TOTAL whose assertion does not execute, or whose corpus is empty, is the dishonesty this gate exists to prevent**. Fold the corpus as a **union**: GROUND-A's 21×10 empty-arg cross-product · cand-F's 4,000-case mutation fuzz · cand-O's replayable mulberry32 30,000-input corpus · the 148 named colours · the 403-string P-1 corpus · the 172-input R1 corpus. Conflicts between the folded suites resolve to `parser-band.md`'s adjudications (hue wrap → unwrapped; juxtaposition → accept; `1e400` → `color_non_finite`) and **each becomes a `.d` divergence row, never a silent pick**. Land G-6's eleven named rows as **independent** assertions. **Three passes without a monotone rise in the TOTAL count → §3a halt: the universe is mis-specified, not under-implemented.** |
| **X.P.W3.b** | opus | `W3.md` §5 `.b` (L253–270) · §3 item 4 (L99–101) · §6 G-4 (L420–433) · G-8 (L487–502) · §11 item 3 (L650–652) · COHESION §0n.1 tail (the wired 22-check) | `<p2>/typescript/src/css/{lower,diagnostics,codes}` (the spec's names, the tree's `.mjs`) · `<p2>/typescript/scripts/css-recovery-closure.mjs` · `<p2>/typescript/test/css-recovery/**` **excluding `boundary/**`** (`.c`'s) · `docs/tranches/X/parse-that/evidence/W3/recovery-closure.json` | **G-4**, **G-8** | Emit `ParseIssue` values **only** from the frozen 8-code union (`css_syntax`, `trailing_input`, `keyframe_selector_invalid`, `color_context_required`, `syntax_descriptor_invalid`, `syntax_mismatch`, `animation_option_invalid`, `timeline_option_invalid`; `src/css/types.ts:11-19`). `css-recovery-closure.mjs` asserts over the **built graph and the executed corpus**: emitted ⊆ frozen **and** every frozen code emitted by ≥1 corpus input (both differences ∅ — the X·V 117-row idiom); **zero `default:`/`else` arms in code selection**; every `ok:false` carries a non-empty `readonly [ParseIssue, ...ParseIssue[]]`; every `[start,end)` indexes real bytes with `expected.length ≥ 1`. G-8: `expected[0]` a **named production** (`"<named-color>"`, `"<hex-color> (3, 4, 6 or 8 digits)"`) with diagnostics **never armed**, and `--assert-no-console` over the reachable module set from the public entries → **0**. **This is NOT a grep gate** — the ⊇ direction executes the corpus. Also wire §0n.1's closed-operator check so a **23rd** operation halts **both** lowerings (the `buildGrammar` destructure of exactly 22, made a check rather than a comment). **A ninth `ParseIssue` code is a frozen-contract change: §3a halt to X·V + the owner, never a local decision.** |
| **X.P.W3.c** | opus | `W3.md` §5 `.c` (L279–297) · §3 items 5–6 (L102–106) · §6 G-3 (L398–418) · G-9 (L504–518) · §2c rows (L74, L86–87) | `<p2>/typescript/src/css/entry` · `<p2>/typescript/src/css/bounds` (the two files `.b` does not open, §4a) · `<p2>/typescript/test/css-recovery/boundary/**` | **G-3**, **G-9** | Three cures, one unit because they share the entry module. **(1) The throw class**: no `throw` reachable from any public entry; cand-O's guard retained **only** as a proven non-load-bearing shield, its non-load-bearing-ness asserted by the raw-`parseState`-over-corpus test (cand-O's own instrument, which the band requires to survive); cand-F's dissent recorded, removal a live option for X.P.W4 and **not a decision here**. **(2) The JS boundary (PT-07)**: `null`, `undefined`, numbers, objects, symbols → `ok:false` with `css_syntax` and `actual: null`, **never a raw `TypeError`** — our invariant **above** parse-that, explicitly not an ask to them. **(3) Depth (PT-04) + latch (PT-03)**: the one lazy back-edge carries an explicit depth bound so exhaustion is an ordinary `ok:false` (cand-O debt 3), tested at `bound` **and** `bound + 1`; the packrat arm-state readable **and resettable** — the measured one-way latch (`:678` false, `:722` true, no assignment back) must not exist, and `resetPackrat()` must **disarm**, not merely clear the memo store. Fold the `(p * 255) / 100` exactness discipline and the non-string guard's placement **above** the grammar. **Catching the throw at the call site and re-shaping it is explicitly NOT a cure** — a masking fallback fails G-3 by inspection of the entry module; `ok:false` with an **empty** diagnostics array fails it too. |
| **X.P.W3.d** | opus | `W3.md` §5 `.d` (L299–317) · §3 items 7–10 (L107–117) · §6 G-2 (L372–396) · G-5 (L435–449) · G-7 (L468–485) · G-10 (L520–548) · §2c (L75–76, L80) · §2b OP-5 (L64) · COHESION §0j.E OC-1 · §0n.4 | `<p2>/typescript/test/css-equivalence/**` · `<p2>/typescript/scripts/css-dual-target-identity.mjs` · `<p2>/typescript/scripts/css-bench-three-leg.mjs` · `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` · `docs/tranches/X/parse-that/evidence/W3/{r1-anchor-after.txt,dual-target-identity.json,equivalence-full-surface.json,bench-three-leg.md}` | **G-2**, **G-5**, **G-7**, **G-10** | Graduate the P-1 harness from `{oklch(), cubic-bezier(), qualified stylesheets}` to **all 52 exports**. The oracle is the **vendored sha-pinned published 4.0.0 tarball**, its sha256 asserted **in-test before any comparison runs** — **never `dist/` in the working tree** (a source-resolved import cannot witness the defect). MIRROR-DEFECT keeps its P-1 definition: (A) DIVERGENT_VALUE, (B) MIS_ACCEPT, (C) FALSE_REJECT_IN_SHAPE. **Every** remaining difference is a `DIVERGENCE-LEDGER.md` row carrying input · incumbent result · candidate result · spec citation · adjudication · **the direction of behaviour change for a consumer** — an empty direction field **fails the gate**, and an **unrowed** intentional difference is treated as identical to a defect. The four preserved dissents seed the ledger; R1–R5 are held as **spec-correct regression fixtures** — the mirror preserves spec-correctness, **never bug-compatibility**. G-5: `{ok, code, start, end, expected, actual}` **byte-identical** across both targets after JSON canonicalization; **`expected` ordering counts — canonicalization sorts nothing**. G-2: re-run the anchor probe **unmodified** against the packed candidate (modifying it voids the gate; a candidate that cures `parseCssColor` alone stays RED). G-10: three legs (shared-accepted / reject / R1-class), interleaved cells, median-of-rounds, printed sink, **arm-state on every row**, budgets restated against **1,636,680 µs** — the `1,870,633 µs` denominator and its derivatives are **UNCITABLE** — and the literal `BAR: OWNER-GATED-PENDING-RATIFICATION`. **Inventing a bar is a defect** (§0j.E OC-1: recorded-not-gating); the 07-20 *"LIVE regex FASTEST ~1.8×"* contradiction is **a row in the table, not an erasure**. Print for **both lowerings** of the graduated seed, **two runs pasted** (§0n.4), and carry AC-2's K-9 recipe (stripped `PATH`, scratch `HOME`, different node) as W3's artifact-reproduction procedure. |
| **X.P.W3.e** | **fable** (fresh) | `W3.md` §5 `.e` (L319–339) · §8 (L561–582) · §9 (L584–608) · §12 (L657–669) · §4 rows (L163–172) | `docs/tranches/X/parse-that/waves/W3-CLOSE.md` · `DIVERGENCE-LEDGER.md` **§Adjudication only** · `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json` · `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` (**modify-append, by the script only**) · `docs/tranches/X/COHESION.md` (**§5 status-board line only**) | the §5.e sub-gate | **Fresh Fable adjudicator (M-23 §1), L-14-obligated to attempt REFUTATION, never to average**: a named refutation attempt, with its outcome, against (i) the closure proof — find an input reaching no declared code; (ii) at least one divergence row's **spec reading**; (iii) the claim that the retained shield is **non-load-bearing**. An author cannot adjudicate his own union, which is why this seat is fresh. Write `W3-CLOSE.md` with the ten gates' **RED-before / GREEN-after outputs pasted** — **no gate is reported green on a narrative**. Then run the lane's evidence chain: `node docs/tranches/V/megatranche/workflows/harvest-journals.mjs` **verbatim and unmodified** (exit 0), file `x-p-w3.json` with a non-empty seat list whose **count equals the units dispatched (six: `.0`, `.a`–`.e`, as recorded at this open)** — a harvest reporting fewer seats, or any seat with zero journal rows, is **RED, not a passing summary** (L-13) — and carve the `COHESION.md` §5 status-board line. **Hand-editing generated bytes stays forbidden.** X.P.W2's K.7(i) finding rides along: `W3.md` §4's *execute-no-write* row mis-describes the harvester (it writes one file per workflow and rewrites the ledger wholesale); if it fires again, record it as a dated addendum-beside, never a spec patch. |

### P.1 — Locks and same-commit families (binding; a family that splits is a defect)

- **`.0` is the wave's FIRST commit in each repo** (§0n.3: *"X.P.W3's first act"*). Two histories,
  never merged: the value.js addenda commit precedes the `<p2>` mechanism commit.
- **The `ALGEBRA` addendum's two homes must be sha256-equal** and land in the same sitting — the
  same lock `.c` carried at X.P.W2 for `ALGEBRA.md` itself (today `67c8253a…`, both homes).
- **D-c1's cure is ONE act with the OP-7 re-point**, K.8's own words: *"one act, not two"*.
- **`.b`'s frozen-code module lands before `.c` opens `entry`/`bounds`** — the group-2→3 boundary
  is that lock, and it is why the spec's three-way phase 1 is sequenced here.
- **`.a`'s adjudicated conflicts and `.d`'s divergence rows are one family**: every conflict `.a`
  resolves against `parser-band.md` **must** appear as a `.d` row. G-7 fails on an unrowed
  intentional difference exactly as it fails on a defect.
- **`.e` writes only after `.d` commits** (§4a), and holds the **sole** `modify-carve` on
  `COHESION.md` and the **sole** `DEFECT-LEDGER.md` append — both single-owner acts at close.
- **`W3.md`, `W1.md`, `W2.md`, `ALGEBRA.md`, `W2-KILL-LEDGER.md`, `registry/adjudicated/**`,
  `evidence/W0..W2/**` are IMMUTABLE** (E-3). Every correction in this wave is a dated
  addendum-beside. The two sealed author arms are not opened.

### P.2 — Standing halt conditions, quoted to every unit (§3a)

Any write outside §4's table as widened by `.0`'s dated addendum — **in particular any byte under
`/Users/mkbabb/Programming/value.js/src/**`, `/Users/mkbabb/Programming/parse-that/**`,
`~/.codex/**`, `~/Documents/Codex/**`, or any frozen root** — is a halt: *"A totality wave that
edits the incumbent to make its own differential pass has inverted the experiment."* **G-5 failing
in a direction rooted in the Wasm numeric or memory model** is an architecture question for
X.P.W1/W2, not a patch here. **G-7 going RED on a newly discovered incumbent defect (a sixth
R-class)** is a finding routed to X·V and the fleet, **not a mirror repair**. **Any third
diagnose→edit→re-measure iteration on one gate halts** — G-1 in particular: three passes without a
monotone rise in the TOTAL count means the universe is mis-specified. **Any proposal to widen the
`ParseIssue` union to a ninth code halts the wave** and goes to X·V + the owner. **Any pressure to
set the bench bar is an owner ask, never an orchestrator or seat decision** — §0j.E OC-1 already
ruled it recorded-not-gating, and *"inventing a bar is a defect."* No same-root repair, no silent
re-pin, no timeout widening, no denominator rewrite, no self-authored answer keys, no CST.
`scripts/dev/dev.sh` is never opened and never staged.

---

## Unit receipts

*(empty at open; each unit appends its own block below, dated, with its served-model line and its
commit hashes in both repos)*

---

### X.P.W3.0

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18 00:2x–01:0x EDT · the wave's **first act** in both
repos (`COHESION.md` §0n.3). Spec sections executed exactly: §0n.1 tail (L1016–1019) · §0n.3
(L1024–1031) · §0n.4 (L1032–1035) · §0n.5 (L1036–1039) · `X-P-W2.md` K.8 rows **D-c1 · D-i2 · R-i1 ·
R-i3 · F-h8** · `W3.md` §4 (L148–183) · §4a (L184–197) · §7 (L550–559). `W3.md` read WHOLE (673 L);
`COHESION.md` read to the file end (1,042 L, §0n.6 last).

**Gates turned: NONE of the ten** — this unit's own dispatch row says so, and it is true at the
bytes: no `scripts/css-universe.mjs`, `css-recovery-closure.mjs`, `css-dual-target-identity.mjs` or
`css-bench-three-leg.mjs` was authored here, and no `test/css-*/**` exists yet. What moved is the
substrate the ten stand on, and the **W2** gates that stood RED on it.

`<p2>` = `/Users/mkbabb/Programming/parse-that-css-totality-p2`. Every figure below was read from the
**settled bytes** and **double-run**; the two runs were identical in every case, and the
verification sweep at the end was run twice over all eight probes.

---

#### 0.1 — Method note, stated before the numbers

**The `.ts`/`.mjs` reconciliation** the open recorded is adopted and rowed in this unit's own §4
addendum (§A-2): §5 names `.ts`, the survivor is `.mjs` (17 files, exactly **1** `.ts` and it is the
generated `build/ac1.d.ts`), §4's first row admits the whole glob, so no bounds question arises. None
of the five names §4a assigns to `.b`/`.c` (`lower`, `diagnostics`, `codes`, `entry`, `bounds`) was
opened by this unit — the §4a shared-glob hazard does not arise.

**BEFORE readings were taken read-only, at this seat's own clock, before any edit** — not inherited
from X.P.W2's close, except where a figure is explicitly cited as dated evidence under the epoch rule
(E-4's *"exactly 3 slice rows"*, G-8's instrument band).

---

#### Act 1 — the dated §4 addendum-beside, FIRST (never an edit of `W3.md`)

`docs/tranches/X/parse-that/waves/W3-ADDENDA-2026-09-18.md` (**115 L · 11,494 B**). It admits, each
with the ruling that grants it: `<p2>/harness/bench/lib/engines.mjs` (§0n.4's own grant),
`<p2>/harness/w2/coverage-52-report.mjs` (K.8 D-i2), the three addenda files and **itself**, plus the
`<p2>` home of the contract addendum and the three standing orchestration paths (the `W2-ADDENDA`
§A-1.3 precedent, restated not re-argued). §A-1.4 shows §4a undisturbed. §A-3 states what it does not
do — including that **`<p2>/typescript/src/parse/**` is NOT admitted** (see act 7).

```
⟨cmd⟩ shasum -a 256 docs/tranches/X/parse-that/waves/W3.md
53ebaf426aa8bce07c1cf9db8d4c74ecfea6319810031bb10394194a0fbc93d0   (673 L · 51,921 B)   ← before AND after
```

#### Act 2 — the ONE dated ALGEBRA addendum-beside, both homes sha256-equal (§0n.3)

```
⟨cmd⟩ shasum -a 256 <value.js>/docs/tranches/X/parse-that/algebra/ALGEBRA-ADDENDA-2026-09-18.md \
                    <p2>/experiments/w2/contract/ALGEBRA-ADDENDA-2026-09-18.md
83ba069bc5553c56c00468a6e82a2b42c4b24af13d5375d6effd73d7d574c022      (320 L · 17,714 B)
83ba069bc5553c56c00468a6e82a2b42c4b24af13d5375d6effd73d7d574c022      (320 L · 17,714 B)
⟨cmd⟩ diff <the two>   → (empty).  BYTE-IDENTICAL, landed in the same sitting.
⟨cmd⟩ shasum -a 256 <both>/ALGEBRA.md → 67c8253abaecb29a0b16a862bf63ad25ff1140d91f06248c843b9c253fc537de ×2
                                        (901 L · 157,010 B) — UNTOUCHED, before and after (E-3)
```

**The lock the ruling names is held in both directions**: `ALGEBRA.md` is string-equal across the two
homes *and* unmoved, and the addendum's own pair is string-equal. Prettier was run over the value.js
copies (§7's cadence) and the `<p2>` home was then re-copied from the formatted bytes, so the cadence
and the lock do not fight.

**The five items, as landed** (each with its contract change and its measurement, in the addendum):

| item | disposition | seed moves? |
|---|---|---|
| **E-2** | cure **(3)** — `balanced-tail`'s `DROP` re-kinded `keyword` → `skipped`; `π_skipped`'s general form stated, not widened. **(2) widening `π_keyword` REFUSED**, as the ruling refuses it. **(1) the seventh kind `opaque` NOT taken** — this seat looked for an OP-13 break to cite and found none, so `K_C` stays **six** | **YES** (act 4) |
| **E-3** | `DISPATCH` joins §5.2's pass-through list; §10.3's **two inert `CUT`s struck** | **YES** (act 4) |
| **E-4** | the `DISPATCH` arm FIRST in §10.2 | **no** — the seed already encoded it as a *declared* deviation with the contract defect named; the addendum makes the contract agree. The *"exactly 3 slice rows REJECT → ok"* figure is `.d`/`.e`'s W2 measurement, **cited by id, not re-derived** (epoch rule) |
| **E-5** | EQ-5's sixth coordinate (arena) leaves the cross-lowering tuple; the watermark rides a **G-8 row** | **no** — AC-1's bytes already read `arena 0` in both; measured `js 0 B · wasm 304 B` on `alloc-latch`'s own row |
| **E-8** | `color-body` inlined; §8 D-3's **two-`REF`** count stands | **no** — measured `refs.targets = 2` (`balanced-tail` · `value-slice`), `refs.sites = 5`, `unresolved []`, and `REF_TARGETS` in the seed is exactly those two |

#### Act 3 — E-6's `--engine=<adapter>` under the dated W1 §Bounds addendum (§0n.4)

`docs/tranches/X/parse-that/waves/W1-ADDENDA-2026-09-18.md` (**98 L · 6,318 B**) widens `W1.md` §4
(L142) by **one row and one arm**: `<p2>/harness/bench/lib/engines.mjs`, **modify**, for the
registration path and nothing else. `W1.md` is untouched — `519df03ff21b48f3b2c4f352d6a4d8ae98c86d3dde117ba786b6c924204c6d09`
(718 L · 55,891 B) before and after.

The arm is a **chain plus one declared external cell**, never a fifth hard-coded subject: the four
named engines are unchanged, `loadEngine` still throws `unknown engine <name>`, the caller declares
the id, and the arm resolves it against the **same adapter contract every W2 probe already uses** —
so `W2.md` §3 item 7 (*"a per-candidate harness is a defect"*) is untouched and **no candidate name
appears in the file**. Id: `adapter:<path-to-harness-adapter.mjs>#<js|wasm>`, the lowering fragment
**required** (§0n.4 wants both lowerings printed; a default would print a lowering nobody declared).

```
⟨cmd⟩ node -e "…adapterEngineIds(['--rounds=40','--engine=…harness-adapter.mjs#js', '--engine=adapter:…#wasm'])"
["adapter:typescript/src/css/harness-adapter.mjs#js","adapter:typescript/src/css/harness-adapter.mjs#wasm"]
adapter:…#js    -> color,easing,sheet | lowerings.js.entry("P:color")   | pins: adapter,jsEntry,dts,wasm
   oklch(0.7 0.1 30) accept · oklch() reject · non-string reject · cubic-bezier(0,0,1,1) accept · a{color:red} accept
adapter:…#wasm  -> color,easing,sheet | lowerings.wasm.entry("P:color") | (the same five readings)
closed-chain: unknown engine nope · no-lowering: HALT … names no lowering · absent: HALT: adapter ABSENT at …
published-4.0.0 still loads: function
⟨cmd⟩ npx tsx harness/bench/bench.ts --rounds=3 --warmup=1 --no-finalize --out=<scratch>/bench-smoke.json
EXIT=0 · stderr bytes 0 · "GREEN — 8 timing cells + 1 census cell, each in its own process, each proving
PACKRAT_ARMED === false at entry and at exit, no PID repeated; three legs published separately"
⟨cmd⟩ git -C <p2> status --porcelain -- harness/   →   one line, ` M harness/bench/lib/engines.mjs`
```

**W2's G-7 was RED-structural** (*"Registering a W2 cell is a write under `harness/bench/**`, which
`W2.md` §4 makes execute-no-write and §3a makes a halt … K-5 is therefore unevaluable, which is the
direct cause of the AC-1/AC-2 tie"*). **The subject now exists.** The table itself is **`.d`'s** to
print — both lowerings, two runs pasted — and **no bar, no ratio and no budget is published here**
(§0j.E OC-1: RECORDED-NOT-GATING; *"inventing a bar is a defect"*). The smoke used the entry's own
`--out` to a scratch path, so `harness/bench/`'s three banked result files are byte-unchanged, and
`--rounds=3` is a smoke whose numbers appear nowhere as a ratio.

#### Act 4 — **ONE act, not two**: the OP-7 re-point AND D-c1's cure (K.8's own words)

**(a) OP-7 / §0n.5.** Measured before, at the bytes:

```
⟨cmd⟩ grep -n PARSE_THAT_DIST <p2>/typescript/src/css/lowering-js/*.mjs
js-alg.mjs:25  import { PARSE_THAT_DIST } from "../../../../harness/bench/lib/engines.mjs";
index.mjs:12   (the same import)
⟨cmd⟩ grep -n 'export const PARSE_THAT_DIST' <p2>/harness/bench/lib/engines.mjs
43: `${WORKSPACE}/node_modules/@mkbabb/parse-that/dist`,  WORKSPACE = …/value.js/docs/tranches/V/
    megatranche/prototypes/css-parser      ← ANOTHER REPOSITORY'S node_modules. Exactly what OP-7 forbids.
```

Re-pointed to **this root's own library**: one load, in `js-alg.mjs`, of the **relative**
`"../../parse/index.ts"`; `index.mjs` takes `Parser`/`createParserContext` **from `js-alg.mjs`**
(a second load would be a second `Parser` class and `instanceof` across the two would be false). The
specifier never leaves the tree, so the lowering is **location-independent by construction** — the
D-c1 class of defect cannot recur at this seam.

*The mechanism, and why it is the root-cause one.* The library is TypeScript source whose internal
specifiers are TS-style (`./parser.js` naming `parser.ts`). Measured: Node 26 **strips types** but
does **not** re-resolve those — `⟨cmd⟩ node -e "import('…/src/parse/index.ts')"` →
`ERR_MODULE_NOT_FOUND …/src/parse/parser.js`. `⟨cmd⟩ node --help | grep -i ts-resolve` → nothing.
The cure is the fresh root's **own pinned toolchain** (§0l E-1, `tsx@4.23.13`): `tsImport` scopes its
hooks to this import graph rather than registering a process-wide loader, and the bare `tsx/esm/api`
specifier resolves at `<p2>/node_modules`, inside the root. **No `node_modules` is patched, no
library byte is edited, no fallback is installed.** `PARSE_THAT_DIST` **stays** in `engines.mjs`: it
is the *bench's declared subject* — the latch witness O-15 PT-03's `:678`/`:722` coordinates name —
and a subject under measurement is not a substrate.

**Measured after the re-point, before anything else changed** — every W2 probe at the graduated
location, unchanged **to the digit**: `op-bijection` 22/22/22, DECLARED-ABSENT 0 · `eq-six` EQ-1..EQ-5
= 0, **EQ-6 = 2035**, 30,527 rows, labels aligned, third cell 233 (12 declared) · `r1-candidates`
0/172 × 6, boundary 7/7 · `recovery-laws` 2,951 TRY sites, R-LAW-2 **13** · `wasm-audit` GREEN ·
`depth-scan` GREEN. **The fresh root's own library source is behaviour-identical to the published
1.0.0 dist across every gate** — which is the fact that makes the re-point a substrate change and not
a semantic one.

**(b) D-c1, in the same act** — the artifact's own declared mechanism (`build.mjs:52-54`: *"a moved
tree re-runs `node build.mjs`, it does not hand-edit a path"*):

```
⟨cmd⟩ sed -n 7p <p2>/typescript/src/css/build/ac1.d.ts
BEFORE  from "../../../../../../../value.js/…/vendor/value-js-4.0.0/dist/subpaths/css"   ← seven levels
        resolve from <p2>/typescript/src/css/build            → /Users/value.js/…            MISSING
        resolve from <p2>/.worktrees/ac1/typescript/src/css/build → /Users/mkbabb/Programming/value.js/…  EXISTS
⟨cmd⟩ node typescript/src/css/build.mjs        (run at <p2> proper)
ac1.wasm 187341 bytes · 1273 functions · 55500 bytes of static data
AFTER   from "../../../../../value.js/…/vendor/value-js-4.0.0/dist/subpaths/css"          ← five levels
        ac1.wasm 049b9904… and ac1.js 5f300b7e… re-emitted BYTE-IDENTICAL — the rebuild moved the
        one specifier and nothing else.
⟨cmd⟩ node harness/w2/idiom-nocst.mjs --candidate ac1 --at typescript/src/css
BEFORE  excess-property fixture FAILS — "error TS2578: Unused '@ts-expect-error' directive" → RED, exit 1
AFTER   excess-property fixture PASSES — "V is assignable AND an excess property is rejected" → GREEN, exit 0
```

**W2's G-10 read GREEN in the worktree and RED at the root on identical bytes. It now reads GREEN at
both. D-c1 is DISCHARGED**, and D-x3's correction is honoured: D-c1 was carried as **its own row**,
cured in one act with the OP-7 re-point, exactly as K.8 words it.

#### Act 5 — the seed conformed to the addendum (E-2's re-kind · E-3's two struck `CUT`s)

**E-2**, on the promoted seed, both lowerings:

```
⟨cmd⟩ node harness/w2/eq-six.mjs --candidate ac1 --at typescript/src/css \
        --corpus experiments/w2/corpus/slice.json --fuzz-seed experiments/w2/corpus/fuzz-seed.json
BEFORE  EQ-1 0 · EQ-2 0 · EQ-3 0 · EQ-4 0 · EQ-5 0 · EQ-6 2035  (first row s0180 "var(--brand)")   RED, exit 1
AFTER   EQ-1 0 · EQ-2 0 · EQ-3 0 · EQ-4 0 · EQ-5 0 · EQ-6    0                                     GREEN, exit 0
UNMOVED rows compared 30527 · labels aligned true · third-cell differences 233 (12 carrying a declared row)
```

**2,035 → 0, and no other product moved** — the ruling's own predicate, met literally. Cause, read at
the bytes: §4.5's `π_keyword` is *"an ASCII-folded literal that is **not** a leaf of `V`"*, and
`var(--brand)`'s tail is not a literal of that class, so **COMP-1c (fidelity of kind)** failed on
every row reaching the `var` dispatch arm — §3's own *"a `ws` entry over `abc` fails here"*, one arm
over.

**A second W2 gate moved, and it is named rather than pocketed:**

```
⟨cmd⟩ node harness/w2/recovery-laws.mjs --candidate ac1 --at typescript/src/css
BEFORE  js 2951 TRY sites · R-LAW-1 0 · R-LAW-2 COMP-1 failures 13 · R-LAW-4 0/0 · R-LAW-3 silent   RED
        wasm 2951 · … · 13 · … (identical)
AFTER   js 2951 TRY sites · R-LAW-1 0 · R-LAW-2 COMP-1 failures  0 · R-LAW-4 0/0 · R-LAW-3 silent   GREEN
        wasm 2951 · … ·  0 · … (identical)
```

The TRY-site population is **identical** (2,951, both sides, both lowerings), so the 13 were **cured,
not avoided**. §0n.3 named **G-3 and G-4** as E-2's two carried REDs; **one cure discharges both**,
which is the strongest evidence available that the diagnosis named the disease.

**E-3**, measured with `.g`'s own `structuralReport` executed read-only against each lowering's
`grammar()` (`harness/totality/**` and `harness/w2/lib/**` are execute + read; not a byte written):

```
                                    cutOutsideAlt   opsOutsideContract  recoverInNonFinalAlt  unownedSpans  closureLeaks
BEFORE (candidate directory)        7  (js · wasm)  0                   0                     0             0
AFTER  (promoted seed)              0  (js · wasm)  0                   0                     0             0
```

The seven were `stylesheet`×2 · `rule`×2 · `qualified-rule`×2 · `declaration`×1 — the two struck
terms, counted once per reified site. **G-1's structural half turns GREEN at the graduated location.**
Both struck `CUT`s stood directly under a scope-opening operator (`qualified-rule`'s under
`stylesheet`'s `RECOVER`; `declaration`'s under `qualified-rule`'s `REP`), which §5.2's own last
clause makes a **walk error** — they were not merely inert, they were ill-formed as encoded.

The emitted module shrank exactly as two struck operators should make it shrink, and the build
reproduces:

```
⟨cmd⟩ node typescript/src/css/build.mjs     187341 B / 1273 functions  →  187131 B / 1266 functions
                                            static data unchanged at 55,500 B
⟨cmd⟩ (re-run, K-9's reproduction leg)      ac1.wasm 7ce0382b2271658592166e4ac2eb5df3de2ba7240b376defaa5791be89a7baa4
                                            ac1.js   5f300b7ea43e1d38fde7a91fc1a924a1b566d92382e031b9b520c8a599091c64
                                            ac1.d.ts 0eb6d69b01af9234120b42642a896dd3049b903509b1c8fe84acded59181f2e8
                                            — byte-identical on the second run
```

**Nothing else moved** across E-3: `op-bijection` 22/22/22 · `eq-six` six zeros over 30,527 rows,
third cell 233 (12) · `r1-candidates` 0/172 × 6, boundary 7/7 · `depth-scan` GREEN · `wasm-audit`
GREEN · `idiom-nocst` GREEN.

#### Act 6 — D-i2 cured, and R-i1 re-pointed

**D-i2** (MAJOR). Two bugs on one line of `harness/w2/coverage-52-report.mjs`, both read at the bytes:
`meta.artifacts.dts` is a **path string** and was handed to `classify()` as if it were the declaration
**text** (nothing ever read the file from disk), *and* the path was **pre-applied** to
`readTypeDeclarations()` here while `classify()`'s own `classifyTypes()` applies it again by contract
— the first application returned `{}` and the second called `.matchAll` on that object.

```
⟨cmd⟩ node harness/w2/coverage-52-report.mjs --candidate ac1 --at typescript/src/css
BEFORE  TypeError: text.matchAll is not a function or its return value is not iterable
          at readTypeDeclarations (harness/totality/lib/surface.mjs:202)
          at classifyTypes        (harness/totality/lib/classify.mjs:122)
          at main                 (harness/w2/coverage-52-report.mjs:92)
AFTER   exit 0 · GREEN · throws recorded by the assay 0
        52 rows · ∅ both ways · classes V:31 K:2 P:10 W:2 X:7 · map digest 334fa95778e00727b945f66bac7af5dd (UNCHANGED)
        declaration surface (read, not guessed)  …/typescript/src/css/build/ac1.d.ts — 539 B, sha256 0eb6d69b01af9234
        verbs, this run (W1's own assay, re-run)  TOTAL:1 · PARTIAL:2 · ABSENT:49
AFTER   --candidate ac1 (the candidate address, where it was latent since `.g`) → exit 0
AFTER   --candidate ac4 (ABSENT) and the bare literal command                  → exit 0, unchanged
```

The cure honours `classify()`'s own contract — **read** the declared surface, pass its **text**, apply
the extractor **exactly once** in the module that owns it — and an undeclared or absent surface is now
reported **UNREAD with the member named**, never defaulted (README §2's rule), with its provenance a
printed row. `harness/totality/**` is untouched. **G-6's survivor-verb half is runnable for the first
time**, and it reports the seed's true distance (**1 TOTAL / 2 PARTIAL / 49 ABSENT**) rather than a
stack trace. **OP-8 stands: the gate reports, it does not cure** — and this unit cured nothing of the
52.

**R-i1** (INFO). `meta.build.jsArtifactReproduction` re-pointed to the tree of record:

```
⟨cmd⟩ node harness/w2/wasm-audit.mjs --candidate ac1 --at typescript/src/css
BEFORE  declared JS-artifact reproduction  node experiments/w2/ac1-tagless/build.mjs
AFTER   declared JS-artifact reproduction  node typescript/src/css/build.mjs
BOTH    non-JS toolchain in that path (K-9)  none      → GREEN, exit 0
```

`.i` carried it unaltered **on purpose** (§11.2 permits relative-*import* adjustments only, and a
declared build command is not an import) and it was still true at the candidate directory. At W3 the
graduated tree is the tree of record, and the command that reproduces **these** bytes is the one now
declared — measured to regenerate all three artifacts and to re-run byte-identically.

#### Act 7 — F-h8, and the two label corrections

**F-h8 — `w2/ac3-scan-union` `f934956`: CRITERION MET, CONSUMPTION NOT TAKEN AT THIS SEAT.** The
decision rule is §0n.5's *"consumed at W3's open **by measurement** (library `tsc` + `vitest`
unchanged-or-better), else left on its branch"*. Both halves were measured, read-only, with **no write
anywhere** — the scan-union bytes are already checked out at `<p2>/.worktrees/ac3` (`f934956`,
§4b-lawful, inside the root), so the comparison needed no new tree:

```
                                     library tsc (-p typescript/tsconfig.json)   library vitest (--root typescript)
<p2> (HEAD, without the scan union)  343 error TS                                 4 failed | 10 passed (14 files)
                                     TS2580 109 · TS2307 84 · TS7006 47 ·         2 failed | 122 passed | 2 skipped (126)
                                     TS2339 45 · TS2584 29 · TS2304 23
<p2>/.worktrees/ac3 (with it)        343 error TS                                 4 failed | 10 passed (14 files)
                                                                                  2 failed | 122 passed | 2 skipped (126)
```

**Unchanged, exactly** — the criterion is MET. It is nonetheless **left on its branch**, for three
reasons stated so the next seat does not have to re-derive them:

1. **Bounds.** `76033aa` writes `typescript/src/parse/{core,index,scan,state}.ts` (+264 L, 4 files).
   `W3.md` §4 admits `<p2>/typescript/src/css/**`; `typescript/src/parse/**` is in **no** row of it and
   in no row of this unit's writable set, and this unit's own §4 addendum deliberately does **not**
   admit it (§A-3). §0n.5 **ADOPTS** the clone point's three `src/parse/**` commits **as the base** —
   adoption of an ancestor states where the numbers were taken, it is not a licence to write new bytes
   there. A write there is a `W3.md` §3a **File-bound expansion**, which halts rather than proceeds.
2. **A named hazard**, measured: `f934956` is the tip of the **ac3-span** branch, whose candidate is
   **KILLED (K-3)**. `⟨cmd⟩ git diff --name-status HEAD w2/ac3-scan-union` → it **deletes**
   `typescript/src/css/**` (17 files) and `experiments/w2/ac1-tagless/**` (20) and adds AC-3's tree —
   the branch predates the graduation. Any consumption is therefore a **cherry-pick of `76033aa`
   alone**, never a merge of `f934956`, and X.P.W2's K.2 already refused to make that call
   (*"Merging a killed candidate's library edits would be this close deciding what §0n.5 gave to W3"*).
3. **No consumer exists.** Nothing under `<p2>/typescript/src/css/**` imports `scan`; the algebra's
   `SCAN` is its own operator (OP-04), and `src/parse/index.ts` at HEAD exports no scan surface. The
   consumption would add 264 L of unreferenced library surface that **no W3 gate reads** — and the
   substrate this wave just re-pointed onto should not move in the same sitting it was re-pointed to.

**Returned to the orchestrator** as a residual with the measurement above, for a one-row grant (or a
declination) at the wave's close. Nothing was staged, nothing was merged, and the branch is byte-
untouched: `⟨cmd⟩ git rev-parse w2/ac3-scan-union` → `f93495602ee17e50b2ff97ab86bed32b28dc9966`.

**R-i3 / F-h2 — the label corrected BESIDE, never the measurement.** The mislabel is in
`harness/w2/eq-six.mjs`'s final `verdict(...)`: its RED branch prints `${total} divergences between
the two lowerings (K-1)` where `total` is the **sum of all six EQ counts**. When only EQ-6 is
non-zero the sentence therefore calls an **intra-lowering COMP-1 failure** a cross-lowering
divergence. *The number was right, the label was wrong* — `.g`'s, and `eq-six.mjs` is execute-only for
this unit, so it is corrected **here** and in the addendum, not in the script. It no longer fires on
this candidate (EQ-6 = 0 → the GREEN branch prints), and it stays latent for any future non-zero
reading; **owner `.g` / L-18**.

**R-i2 — the shape recorded, as the open assigned.** ESC-i2's GREEN is narrow and stays narrow at this
seat: the library project compiles **403** program files of which the graduated tree contributes
**1** (`build/ac1.d.ts`), `allowJs` is absent, and the **sixteen `.mjs`** under `typescript/src/css`
— **including the four this unit edited** — are **not typechecked by any compile that runs today**.
This unit therefore leaned on the executable gates, not on `tsc`, and says so. `.a`'s assignability
compile is the widening.

---

#### The commits (two histories, never merged; `.0` first in each repo)

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | value.js | **`641ba4db`** | the three dated addenda-beside (W3 §4 · W1 §Bounds E-6 · ALGEBRA E-2·E-3·E-4·E-5·E-8) — **the wave's first commit in this repo** |
| 2 | `<p2>` | **`8d8ebc6`** | the `<p2>` home of the contract addendum, sha256-equal — **the wave's first commit in the fresh root** |
| 3 | `<p2>` | **`1857c9b`** | **ONE act, not two** — OP-7's re-point **and** D-c1's cure |
| 4 | `<p2>` | **`4d8dae4`** | the seed conformed to the addendum — E-2's re-kind + E-3's two struck `CUT`s (one meaning; the rebuild rides it) |
| 5 | `<p2>` | **`7be817c`** | E-6 — `engines.mjs` gains `--engine=<adapter>` |
| 6 | `<p2>` | **`a35e3c5`** | D-i2 — `coverage-52-report.mjs` reads the declared surface |
| 7 | `<p2>` | **`57ddc96`** | R-i1 — the declared JS-artifact reproduction re-pointed |

Every commit carries **its own pathspec on the commit itself**; four tracks share the value.js index
and commit 1 contains **exactly three files**, all under `docs/tranches/X/parse-that/`. `git diff
--check` clean on every one. `scripts/dev/dev.sh` appears in **0** commits of this unit and was never
opened. `/Users/mkbabb/Programming/parse-that` carries **no commit from this unit**. No `git stash`,
no `reset`, no `force-push`, no `-A`, no `-u`, no `commit -a`. Neither repo was pushed by this unit.

```
⟨cmd⟩ git -C <p2> status --porcelain     →  `?? .worktrees/`  — one line, §4b's prescribed container,
                                            before and after, exactly as the open measured it
⟨cmd⟩ git -C <p2> worktree list          →  4, all inside <p2>/.worktrees/ (ac1 130f72d · ac2 a7ac4ea ·
                                            ac3 f934956) — `.worktrees/ac2` at a7ac4ea4 STAYS (§0n.1), untouched
⟨cmd⟩ ls -d /Users/mkbabb/Programming/parse-that*  →  no `<p2>-w3*` sibling exists
```

---

#### Gate readings — this unit's own dispatch row, answered

**The ten `W3.md` gates: 10 RED before, 10 RED after. This unit turned none, and claims none.** What
it did is what the row says — *unblock the literal form* of five of them and half of a sixth:

| gate | what was in the way | state after this unit |
|---|---|---|
| **G-1** | the universe manifest must be generated against a candidate that resolves at `<p2>`; the `.d.ts` did not resolve there (D-c1), so the assignability compile could not be read at the root | **unblocked** — `ac1.d.ts` resolves at `<p2>`, `idiom-nocst`'s `tsc` fixture passes there, and `coverage-52-report` now prints a **per-row verb** (`1 TOTAL / 2 PARTIAL / 49 ABSENT`) instead of throwing |
| **G-4** | the closure checker executes the corpus through the lowering; the lowering loaded its combinators from another repo's `node_modules` (OP-7) | **unblocked** — the substrate is this root's own `src/parse/**`, and the closed-union discipline's nearest W2 analogue (`R-LAW-2`) reads **0** |
| **G-5** | the comparator needs both targets loadable at `<p2>` proper | **unblocked** — both lowerings load and answer at the root; the Wasm artifact rebuilds byte-reproducibly |
| **G-6** (survivor half) | `coverage-52-report.mjs` threw whenever a candidate was present (D-i2) | **unblocked — the half is runnable** |
| **G-7** | the differential harness and its bench peer had no registrable subject (W2 G-7 RED-structural) | **unblocked** — E-6's declared external cell resolves both lowerings |
| **G-10** | no engine could be registered, so no candidate row could be timed | **unblocked** (the table stays `.d`'s; **no bar, no ratio, no verdict here**) |

**The `W2` gates this unit's acts actually moved, BEFORE → AFTER, at the settled bytes, double-run:**

| W2 gate | probe | BEFORE (this seat, read-only) | AFTER (settled bytes) |
|---|---|---|---|
| **G-1** structural half | `structuralReport` at the graduated tree | `cutOutsideAlt` **7** (js · wasm) | **0** (js · wasm) — **RED → GREEN** |
| **G-3** | `eq-six --candidate ac1 --at typescript/src/css` | EQ-6 **2035**, exit 1 | **0**, six zeros over 30,527 rows — **RED → GREEN** |
| **G-4** | `recovery-laws` | R-LAW-2 **13** both lowerings, exit 1 | **0** both lowerings — **RED → GREEN** |
| **G-6** | `coverage-52-report --candidate ac1 --at …` | **throws** (D-i2) | exit 0, verbs printed — **SPLIT → both halves runnable** |
| **G-10** (W2's) | `idiom-nocst --candidate ac1 --at …` | `TS2578`, exit 1 (D-c1) | fixture PASSES, exit 0 — **RED → GREEN** |
| **G-7** (W2's) | the bench cell | **RED-structural**: no registrable subject | **subject exists** (E-6); the table is `.d`'s |
| G-2 · G-5 · G-9 · G-11 · G-12 | `op-bijection` · `r1-candidates` · `wasm-audit` · `depth-scan` | GREEN | **GREEN, unchanged to the digit** |
| **G-8** | `alloc-latch` | RED, **instrument-owned** (F-4 · F-e8 · F-f3 · F-h3) | **still RED, still instrument-owned** — see below |

**Verification sweep at the settled bytes, run TWICE over all eight probes — 8 of 8 exit 0, both runs
identical:** `op-bijection` · `eq-six` · `recovery-laws` · `r1-candidates` · `idiom-nocst` ·
`wasm-audit` · `depth-scan` · `coverage-52-report`.

**G-8 is reported honestly and is NOT claimed.** This seat's draw: `js` reject path **7.9 B/parse**,
`wasm` **2.2 B/parse** against an exact-zero condition; warmed history drift `js` **0.745×**. X.P.W2
booked this gate's instrument four times (**F-4 · F-e8 · F-f3 · F-h3**): the reject leg tests an exact
zero with an instrument whose draw-to-draw spread on the same subject is **±10 B/parse**, and F-h3
records the envelope (0.80–1.25) as *narrower than the instrument's four-draw spread on this box*
(ac1 wasm **0.744–0.931×**). This draw sits inside both bands. **No re-run for a greener number was
taken, and none of these numbers is offered as a change.**

---

#### Findings raised by this unit (none cured here; each with an owner)

| id | severity | finding | owner |
|---|---|---|---|
| **F-0.1** | MINOR | **`op-bijection.mjs --structural` does not accept `--at`** (⟨cmd⟩ `grep -n 'flags.has("structural")' harness/w2/op-bijection.mjs` → L188 dispatches `--at` to `bijection()` only). Its literal invocation therefore walks `experiments/w2/ac1-tagless/**` — the untouched candidate directory — and still prints `cut∉alt 7 · RED` after E-3's strike, while the graduated tree reads **0**. A true reading of a tree this wave did not change, but G-1's structural half cannot be read at the tree of record by its own literal command | **`.g` / L-18** |
| **F-0.2** | INFO | After E-3's strike, `CUT` joins the structural walk's `opsUnexercised` list, because the **seven surviving `CUT`s live in `grammar().dispatchTerms`** and the walk reaches only `grammar().terms`. The blind spot is **pre-existing and already declared** by the seed's own `algebra/grammar.mjs` header and `VERDICT.md`; it is restated here so a reader does not mistake the list for a regression | `.g` / `.b` |
| **F-0.3** | INFO | **R-i2 measured, not inherited**: the library compile covers **403** program files, the graduated tree contributes **1**, `allowJs` is absent, and the **sixteen `.mjs`** under `typescript/src/css` — including this unit's four edited files — are typechecked by **no** compile that runs today | `.a` (the assignability compile is the widening) |
| **F-0.4** | INFO | **`<p2>/typescript` has no `node_modules`**, so the library's own `tsc` reads **343** `error TS` (TS2580 109 · TS2307 84 · TS7006 47 · TS2339 45 · TS2584 29 · TS2304 23) and `vitest` reads **4 failed / 10 passed** files (2 failed / 122 passed / 2 skipped), one failure being `ENOENT: ../data/json/data-l.json` — a `data/` directory this root does not carry. ESC-i2's 343 reproduces **exactly**. Both instruments are RED-PREEXISTING for reasons independent of anything this wave does, which is what makes F-h8's "unchanged-or-better" a weak signal even though it is met | orchestrator / `.a` |
| **D-i1** | MINOR | restated, **not** cured here (the open already routed it): §0n.2's tail cites a **§0n.7** that does not exist; the substance is §0n.5. E-3 — a ruling's dangling cross-reference is curable only by its author | **orchestrator** |

**Escalations: NONE.** No `W3.md` §3a trigger fired. No write was proposed or made outside the §4
table as widened by this unit's own dated addendum; no gate entered a third diagnose→edit→re-measure
iteration (every cure landed and was confirmed on its **first** re-measure); no `ParseIssue` code was
added, proposed or discussed as a ninth; no seventh complement kind was taken; no bar was set,
invented, inferred or reconciled. F-h8 is **returned as a residual with its measurement**, not
escalated — *"left on its branch"* is one of the two dispositions §0n.5 itself names.

---

#### E13 and the standing invariants, at this unit's own clock

The wave's **O.1** four-path sweep stands (0 unrowed · 0 UNREAD **in X.P.W3's scope**; I-32/I-33/I-34
carry `UNREAD 2026-09-17` status cells and were read row-by-row at the open as naming **no parse-that
byte** — *"Not X·P's"*). This unit **minted no mail**, wrote **zero** bytes in any producer tree, and
read `../glass-ui/**` not at all. `⟨cmd⟩ grep -c '^| I-' docs/tranches/V/coordination/INBOX.md` → **36**,
unchanged; `I-34` is still the tail of the rowed inbound set and `I-30` the standing obligation tail.

`⟨cmd⟩ git -C <value.js> show --stat 641ba4db` → **3 files, all `docs/tranches/X/parse-that/`**; this
unit wrote nothing under `src/**`, `api/**`, `demo/**`, `test/**`, `e2e/**`, `scripts/**` or
`package.json`, and `/Users/mkbabb/Programming/parse-that`, `~/Documents/Codex/**`, `~/.codex/**`,
`../glass-ui/**`, `../keyframes.js/**` and `../fourier-analysis/**` were **never written**. The
value.js working tree carries modified `test/*.ts` and `vitest.config.ts` from **sibling tracks** of
this sitting; none is in any commit of this unit, which is what the pathspec discipline is for.

**Format and lint cadence (§7).** This repo: Prettier over the three touched `.md` (then the `<p2>`
ALGEBRA home re-copied from the formatted bytes, so §0n.3's sha256 lock holds on the formatted pair)
+ `git diff --check` clean on every commit. The fresh root: the eight W2 probes are the executable
cadence and all eight exit 0 twice; `npx tsc --noEmit -p typescript/tsconfig.json` reads its
**RED-PREEXISTING 343** unchanged (F-0.4), and **no proof-farm script was authored for any gate**
(L-19) — every figure above is a program's own output.

---

### X.P.W3.b

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18 01:0x–01:4x EDT · group 2, run concurrently with
`.a` (disjoint modify sets), landing the frozen-code module family **before `.c` opens
`entry`/`bounds`** — the P.1 group-2 → group-3 lock, held. Spec sections executed exactly:
`W3.md` §5 `.b` (L253–270) · §3 item 4 (L99–101) · §6 **G-4** (L420–433) · §6 **G-8** (L487–502) ·
§11 item 3 (L650–652) · `COHESION.md` §0n.1 tail (the wired 22-check). `W3.md` read WHOLE (673 L);
`COHESION.md` §0j and every later §0k+ addendum read to the file end (1,042 L, §0n.6 last); this
record read whole through `.0`'s receipt before a byte was written.

`<p2>` = `/Users/mkbabb/Programming/parse-that-css-totality-p2`. Every figure below is read from the
**settled bytes** and **double-run**; the two runs were byte-identical on stdout and on the evidence
JSON. **Extension**: the spec's `.ts` names are adopted as `.mjs`, per the open's recorded
reconciliation (this record, L87–93) — `src/css/{lower,diagnostics,codes}.mjs`.

**Gates turned: G-8 GREEN · G-4 RED on two legs, both cured OUTSIDE this unit's writable set and
returned with their measurement rather than worked around.** Nothing was narrowed, skipped,
allow-listed or caught to make a leg green.

---

#### b.1 — What was in the way, measured read-only BEFORE any byte was written

| gate | ⟨cmd⟩ | BEFORE |
|---|---|---|
| **G-4** | `test -e <p2>/typescript/scripts/css-recovery-closure.mjs` | **ABSENT** (the open's baseline reproduced). No closure existed in any direction: the union was a comment in `algebra/ops.mjs`, and nothing read it |
| **G-4** ⊇ | `node -e` over the built graph | 3 of 8 codes declared anywhere in the grammar |
| **G-8** | `test -e <p2>/typescript/test/css-recovery/labels.test.ts` | **ABSENT** |
| **G-8** labels | the raw σ expectations over the corpus this unit later derived, both lowerings | **1,474 of 3,696 issues (39.9 %) carried an `expected[0]` that is NOT a named production** — 22 distinct first-expectations, **6** angle-bracketed. The unnamed ones are cand-O's own: `'{'` (1,402), `context-free color` (52), `ident`, `whitespace`, `any-but-brace-or-semi`, `'deg'`, `end of input`, … |
| **§0n.1** | `grep -n buildGrammar <p2>/typescript/src/css/algebra/grammar.mjs` | `:5` a **comment** (*"written against the twenty-two"*), `:24` the function. **There is no check** — a 23rd operation halts nothing |

#### b.2 — Act 1: the recovery algebra, closed by construction (`<p2>` `39503f8`)

`src/css/codes.mjs` (156 L) · `src/css/diagnostics.mjs` (170 L) · `src/css/lower.mjs` (181 L) —
one commit, one meaning, and the **frozen-code module `.c` imports**.

*The design decision, stated because it is the whole of the cure.* `selectCode` is a **lookup into a
frozen null-prototype table**, not a `switch` — so there is no `default:` arm to write and no
`??`/`||` to hide one — and the miss case is made **unreachable rather than unobserved** by three
construction-time proofs. The grammar map is finite and closed (OP-22), so the set of codes the
built graph can declare is fully enumerable: `assertGraphClosed` is a **proof**, not a sample. That
is what lets the parse path carry no violation arm at all, which it must not, because a throw there
would fail G-3.

```
⟨cmd⟩ node -e "…await import('./src/css/lower.mjs')…"
OPERATOR_CLOSURE  {"signature":22,"destructured":22,"extra":[],"missing":[]}
LABEL_SURFACE     {"labels":51,"identityRows":19}
FROZEN            8  css_syntax,trailing_input,keyframe_selector_invalid,color_context_required,
                     syntax_descriptor_invalid,syntax_mismatch,animation_option_invalid,timeline_option_invalid
js/wasm closure   {"declared":["color_context_required","css_syntax","trailing_input"],"siteCount":144,
                   "missing":[5 codes]}            ← IDENTICAL for both lowerings
P:color "oklch()" {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,
                   "expected":["<number>","<none-keyword> ('none')"],"actual":")"}]}
P:color null      {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,
                   "expected":["<string source>"],"actual":null}]}
```

**The §0n.1 obligation, WIRED.** The check reads what `buildGrammar` *actually destructures* — the
grammar is built once against a recording `Proxy`, the operation names it reads are collected, and
both set-differences against `OP_NAMES` must be ∅ — and it runs at **module load**. A second
direction reads the closure from the lowering's end (`registry()` must publish exactly 22). Since
every recovery entry of **both** lowerings is constructed through `lower.mjs`, a 23rd operation halts
both. It is a check, not a comment, and it **fires**: the gate's control feeds it a 23-operation
builder and it throws (`b.3`, CTRL row 1).

**The label surface** is total and injective over `L`'s 51 labels, every value a named production in
cand-F's own idiom (`cand-f/color.ts:528` `"<hex-color> (3, 4, 6 or 8 digits)"`, `:609`
`"<string source>"`), asserted at load. Injectivity is load-bearing: it is what makes promotion
lossless, so `'deg'` and `'grad'` stay distinguishable after being named `<angle-unit> ('deg')` /
`<angle-unit> ('grad')`. Order is preserved and nothing is sorted — a diagnostic's expectation order
is part of its meaning (G-5).

#### b.3 — Act 2: the closure gate and the malformed-inverse suite (`<p2>` `1cfa29b`, cured at `f666b6f`)

`scripts/css-recovery-closure.mjs` (610 L) · `test/css-recovery/{build-corpus.mjs, corpus.json,
labels.test.ts, closure.test.ts, vitest.config.ts}`. **`test/css-recovery/boundary/**` was never
opened** — the §4a nested-glob lock, held; the config's include glob will collect `.c`'s suite the
moment it lands, which is a courtesy to the lock, not a breach of it.

**The corpus is DERIVED, never hand-typed** (`experiments/w2/corpus/build-corpus.mjs`'s precedent and
its reason: a hand-edited corpus is one whose author can delete the row that reddens a gate).

```
⟨cmd⟩ node test/css-recovery/build-corpus.mjs --write   →  685 rows from 3 sources
        172  r1.json            the 172-input R1 corpus (GATE-VERDICT F-2 / O-15 PT-07)
        457  slice.json         the §10 slice corpus (X.P.W2.g), 527 read, 70 already present
         56  the authored recovery band — RECOVER · END · the context guard · constructor guards ·
             the REF back-edge · depth at the bound and one past it · degenerate heads · empty and
             whitespace-only · non-ASCII and control bytes
⟨cmd⟩ node test/css-recovery/build-corpus.mjs --check   →  GREEN, re-derives byte-identically (×2)
```

**No expected value appears in the corpus or in any file of this unit** — §3's prohibition on
self-authored answer keys. Every law the gate asserts is structural.

**THE GATE IS NOT A GREP GATE.** The ⊇ direction executes the corpus through both lowerings and
collects what they emit; the silence leg runs it with every console channel replaced by a counting
sink (R-LAW-3's own instrument, `harness/w2/recovery-laws.mjs:24`); the static legs print **every**
site they matched, with its window, so a reader can refute them at the bytes, and the line scanner is
**comment-aware** — a prose line quoting `console.error(` is not a call site, and an inspection that
cannot tell the difference fails for a reason that is not its own. **Six negative controls run
first** (W2 G-4's rule: a probe that cannot fail for its intended reason is itself a defect).

```
⟨cmd⟩ node scripts/css-recovery-closure.mjs --corpus test/css-recovery/corpus.json \
             --frozen-union c654824e:src/css/types.ts --out <evidence>          EXIT 1   (double-run identical)

corpus          typescript/test/css-recovery/corpus.json — 685 inputs, shape {rows:[{src}]}
frozen union    c654824e:src/css/types.ts
reachable set   30 modules from 2 public entries (3 authored) · bare [node:path, node:url, tsx/esm/api]
executed        4158 calls · 3710 rejections · 3744 issues, over 2 lowerings × 3 entries

CTRL  a 23rd operation halts the signature check              fires
CTRL  a missing operation halts the signature check           fires
CTRL  a ninth code halts the frozen-union authentication      fires
CTRL  a missing code halts the frozen-union authentication    fires
CTRL  an unknown label has no named production                fires
CTRL  the silence instrument sees a write                     fires

C-1   ⊆ built graph          GREEN  288 code sites · declared [color_context_required css_syntax
                                    trailing_input] · outside frozen 0 · intrinsics [css_syntax
                                    trailing_input] verified at 19 lowering sites, undeclared 0
C-2   ⊆ executed corpus      GREEN  outside frozen 0
C-3   ⊇ executed corpus      RED    frozen \ emitted = 5 [animation_option_invalid
                                    keyframe_selector_invalid syntax_descriptor_invalid
                                    syntax_mismatch timeline_option_invalid]
C-4   no fallback arm        RED    authored 0 · inherited 2 · measured DEAD: far.code === null on
                                    0 of 3710 rejections
C-5   tuple law              GREEN  ok:false with an empty tuple 0 · ok:true carrying diagnostics 0
C-6   span law               GREEN  spans outside [0,len] or with a mismatched actual 0 · empty expected 0
C-7   G-8 expected[0] named  GREEN  3744 issues · unnamed first expectations 0 · label surface 51 rows
C-8   G-8 unarmed            GREEN  isDiagnosticsEnabled() before=false after=false
C-9   G-8 silence            GREEN  executed writes 0 · authored call sites 0 · inherited 1
                                    (unguarded 0) · references 3 · strict letter: 1 call site
C-10  22-operator closure    GREEN  signature 22 · destructured 22 · both differences ∅

union authentication  c654824e:src/css/types.ts → 8 codes, both differences ∅
branch census         default: 3 (authored 0) · else 28 (authored 0)
RED — 8 of 10 legs green; negative controls all fire.
```

```
⟨cmd⟩ npx vitest run --config typescript/test/css-recovery/vitest.config.ts
Test Files  1 failed | 1 passed (2)        Tests  1 failed | 23 passed (24)        (×2, identical)
   the one failure is the ⊇ row, BORN RED with its cause in the assertion message — never test.skip
⟨cmd⟩ node scripts/css-recovery-closure.mjs --assert-no-console        GREEN, EXIT 0 (C-8 · C-9)
```

**The pinned frozen union is inert, measured**: ⟨cmd⟩ `git diff --stat c654824e HEAD -- src/css/types.ts
src/css/index.ts` → **empty**, and ⟨cmd⟩ `git status --porcelain -- src` → **0**. The pinned read and
the working-tree read are the same bytes, so the pin is a statement of provenance and not a
divergence.

#### b.4 — Gate readings, BEFORE → AFTER

| gate | leg | BEFORE | AFTER |
|---|---|---|---|
| **G-4** | ⊆ built graph | no checker; closure unproven in either direction | **288 code sites, outside frozen 0 — GREEN**, and the walk covers `terms` **and** `dispatchTerms`, so `.0`'s F-0.2 blind spot (the seven dispatch productions the harness walk cannot reach) is covered here |
| **G-4** | ⊆ executed | — | **0 of 3,744 issues outside the eight — GREEN** |
| **G-4** | ⊇ executed | — | **RED, 5 of 8 unemitted** — see b.5 E-1 |
| **G-4** | no fallback | — | **RED, 2 inherited arms** (authored **0**) — see b.5 E-2 |
| **G-4** | tuple law | — | **GREEN**, 0 empty tuples on `ok:false`, 0 diagnostics on `ok:true` |
| **G-4** | span law | — | **GREEN**, 0 spans outside `[0,len]`, and `actual` is exactly `src.slice(start,end)` (or `null`) on every issue |
| **G-8** | `expected[0]` named | **1,474 of 3,696 unnamed (39.9 %)**, 6 of 22 distinct first-expectations angle-bracketed | **0 of 3,744 unnamed — GREEN** (3,696 corpus issues + 48 boundary issues = 3,744, reconciled) |
| **G-8** | unarmed | `label` is a no-op unless armed, and arming couples an unconditional `console.error` (O-15 PT-01; here `src/parse/parser.ts:66-68`) | **GREEN** — `isDiagnosticsEnabled()` **false before and after** every run; the label surface never depended on arming, which is the cure G-8 names |
| **G-8** | silence | — | **GREEN** — 0 executed writes over 4,158 calls; 0 authored call sites; the one inherited site (`src/parse/parser.ts:67`) is **guarded by `isDiagnosticsEnabled()`**, printed with its guard |
| **§0n.1** | the 22-check | a **comment** | **GREEN and WIRED** — signature 22 · destructured 22 · ∅/∅, at load, for both lowerings; the 23rd-operation control **fires** |

**G-8 is GREEN. G-4 is RED on C-3 and C-4.** Both reds are real and both are named at their bytes.

*The one reading this seat took rather than inherited, stated so `.e` can overturn it.* G-8's command
parenthesis says *"a `console.*` call site on that set fails"*, and the reachable set contains exactly
one — `src/parse/parser.ts:67`, in the vendored library. The gate's own falsifier settles it:
*"a candidate that silences the logger by patching parse-that's dist fails the fresh-root/read-only
bounds. The cure is a label surface that never depended on arming."* A reading that reddened on that
site would make the gate unsatisfiable by its own words. The leg is therefore **zero executed writes,
zero AUTHORED call sites, and every inherited call site guarded by the arm-state this unit never
sets** — and the strict-letter count (**1**) is printed beside it on every run, unrounded.

#### b.5 — Escalations (§3a: a hard-gate failure that is not local-edit-recoverable)

**E-1 — G-4's ⊇ direction cannot close while the candidate realizes 3 of the 9 public entries.**
Measured, not inferred: the grammar names **`P:color` · `P:timing-function` · `P:stylesheet`**, and
the five unemitted codes are the diagnostic vocabulary of entries it does not carry. The gate prints
the incumbent site of each so the gap is stated with its cause and not as an absence:

```
animation_option_invalid   src/css/stylesheet.ts:397 · :405
keyframe_selector_invalid  src/css/grammar.ts:416 · :419 · :425
syntax_descriptor_invalid  src/css/stylesheet.ts:655 · src/css/syntax.ts:94
syntax_mismatch            src/css/syntax.ts:100
timeline_option_invalid    src/css/stylesheet.ts:50 · :78 · :405 · :414 · src/css/timeline.ts:32 · :45 · :50 · :69 · :73 · :83
```

Curing it is a **grammar act** in `algebra/grammar.mjs` (six more entries, in the one authored
grammar both lowerings instantiate) — a file in **no unit's writable set in this wave**: `.a` owns
the manifest and its corpora, `.b` the recovery algebra, `.c` `entry`/`bounds`, `.d` the differential.
It is also the same wall `.a`'s **G-1** must meet (`.0` measured the survivor at **1 TOTAL / 2
PARTIAL / 49 ABSENT**), so it is a wave-level row and not a `.b` residual. **Refused here, on
purpose**: a `lower.mjs` that answered the six missing entries with a stub rejection would emit all
eight codes and be a masking fallback; declaring the five out of scope would be the denominator
rewrite §3 prohibits. The denominator was left alone and the gate left RED.

**E-2 — G-4's no-fallback leg: two arms, both outside this unit's writable set, both measured dead.**

```
inherited typescript/src/css/lowering-js/index.mjs:56
    55: sg.D.push({
    56: code: sg.far.code === null ? "css_syntax" : sg.far.code,
inherited typescript/src/css/lowering-wasm/index.mjs:126
    125: b.gget(G.farcode).i32(0).x("i32.lt_s").if_(I32,
    126:     (t) => t.i32(CODES.indexOf("css_syntax")),
```

Each answers *"nothing raised"* with a code of its own — the exact shape §11 item 3's guardrail
names, because a fallback arm makes an unbound case look bound. **Both are DEAD at the bytes**:
`far.code === null` on **0 of 3,710 rejections**, both lowerings, over 685 inputs — every failure
site in the algebra raises with a code, so the arms answer a question that cannot be asked. The cure
is one line in each file; `.b`'s writable set is `src/css/{lower,diagnostics,codes}.mjs`,
`scripts/css-recovery-closure.mjs` and `test/css-recovery/**` (excluding `boundary/**`), so **a write
there is a §3a file-bound expansion, which halts rather than proceeds**. Returned for a one-row
grant. The Wasm arm is compiled INTO `ac1.wasm`, so it cannot be answered from above in any case —
`lower.mjs` refusing to consume the defaulted value would leave the arm in the built graph and change
nothing the gate reads.

**E-3 — the gate's literal vitest form collects zero files, for a configuration reason.**
`typescript/vitest.config.ts` includes `test/*.test.ts` — **one level** — and vitest positionals
FILTER the collected set rather than extend it, so `npx vitest run test/css-recovery/labels.test.ts`
(G-8's literal command) finds nothing today. The suite carries **its own project** —
`npx vitest run --config typescript/test/css-recovery/vitest.config.ts` — rather than this unit
editing a library file that belongs to no seat of this wave. **`.a`'s G-6 command
(`test/css-totality/spec-conformance.test.ts`) and `.c`'s G-9 command
(`test/css-recovery/boundary/{depth,latch}.test.ts`) meet the identical gap**, so it is one
orchestrator row and not three private workarounds.

#### b.6 — Findings (measured, not cured here)

| id | severity | finding | owner |
|---|---|---|---|
| **F-b1** | MINOR | **Two files of this unit landed BINARY** at `1cfa29b`: a raw NUL byte in a string literal made `git` and `file(1)` read `build-corpus.mjs` and `closure.test.ts` as data (`Bin 0 -> 6944 bytes` in the commit stat). Cured in the next act (`f666b6f`) by BUILDING the character — `String.fromCharCode(0)` — rather than embedding it; the corpus is unchanged (`--check` re-derives byte-identically) and the committed blobs now read `UTF-8 text`. Recorded loud because the defect survived a green test run and was caught only by reading the commit's own stat | `.b`, cured |
| **F-b2** | INFO | **The library compile does not cover this unit's bytes.** ⟨cmd⟩ `npx tsc --noEmit -p typescript/tsconfig.json` → **439** `error TS` (from `.0`'s 343; `.a`'s concurrent `test/css-totality/generated/assignability.generated.ts` contributes 56, this unit 31). **All 31 are resolution-class** — TS2584 `console` (12), TS2339 `import.meta.url` (4), TS2307 `node:*` (8), TS7016 implicit-`any` on six `.mjs` imports (7) — i.e. exactly F-0.3's *"`allowJs` absent"* and F-0.4's *"`typescript/node_modules` is empty"*, and **zero are type errors in the suites' own logic**. The suites run GREEN under the root's own vitest, which resolves at `<p2>/node_modules` | `.a` / orchestrator (the widening is `.a`'s assignability compile) |
| **F-b3** | INFO | **`eslint` is not installed in this root** (⟨cmd⟩ `ls node_modules/.bin \| grep -ci eslint` → **0**), so §7's `npx eslint .` was not run — the same posture `.0` recorded. The executable cadence stood in for it: the gate, the suite and the corpus derivation, each run twice | orchestrator |
| **F-b4** | INFO | The `ParseIssue.expected` this unit publishes are PROMOTED labels, not cand-O's raw σ labels. That is G-8's cure and debt 1's ask, and it is a **behaviour difference from the incumbent's `expected` arrays** — so it is a `DIVERGENCE-LEDGER.md` row for `.d`, with its consumer direction: *a caller reading `expected[0]` receives a named production where 4.0.0 gives a byte-class or a bare literal* | `.d` |

#### b.7 — The commits (pathspec on the commit itself; four tracks share both indices)

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | `<p2>` | **`39503f8`** | `feat(x-p-w3/recovery): closed 8-code union, no fallback arm` — `codes.mjs` · `diagnostics.mjs` · `lower.mjs` (507 L). **The frozen-code module family, landed before `.c` opens `entry`/`bounds`** |
| 2 | `<p2>` | **`1cfa29b`** | `test(x-p-w3/recovery): the closure gate and the malformed-inverse suite` — the gate, the derived corpus, the two suites, the suite's project |
| 3 | `<p2>` | **`f666b6f`** | `fix(x-p-w3/.b): the NUL corpus row is BUILT, not written` — F-b1 |
| 4 | value.js | **`3c002f1c`** | `docs(x-p-w3/.b): evidence — the recovery-closure run, both set-differences pasted` — `evidence/W3/recovery-closure.json` (541 L), **exactly one file** |

Every commit carries **its own pathspec on the commit itself**; `.a`'s concurrent
`typescript/scripts/css-universe.mjs` and `typescript/test/css-totality/` stayed **untracked and
untouched** across all three `<p2>` commits (⟨cmd⟩ `git status --porcelain` after each → `?? .worktrees/`
· `?? typescript/scripts/css-universe.mjs` · `?? typescript/test/css-totality/`). `git diff --check`
clean on every one. **No `-A`, no `-u`, no `commit -a`, no stash, no reset, no force-push, no push.**
`scripts/dev/dev.sh` appears in **0** commits of this unit and was never opened;
`/Users/mkbabb/Programming/parse-that`, `~/Documents/Codex/**`, `~/.codex/**`, `../glass-ui/**`,
`../keyframes.js/**` and `../fourier-analysis/**` were **never written**; **no byte under
`/Users/mkbabb/Programming/value.js/src/**` was touched** (⟨cmd⟩ `git status --porcelain -- src` → **0**,
before and after).

#### b.8 — E13 and the standing invariants, at this unit's own clock

The wave's **O.1** four-path sweep stands; this unit **minted no mail**, wrote **zero** bytes in any
producer tree, and read `../glass-ui/**` not at all. ⟨cmd⟩ `grep -c '^| I-' docs/tranches/V/coordination/INBOX.md`
→ **36**, unchanged; `I-34` is still the tail of the rowed inbound set and `I-30` the standing
obligation tail. **0 UNREAD in X.P.W3.b's scope.** F-b4 is routed to `.d` inside this wave, not by
mail.

**Format and lint cadence (§7).** `<p2>`: the gate, the suite and the corpus derivation are the
executable cadence and each was run **twice**, identical; `git diff --check` clean on every commit;
`tsc` recorded at F-b2; `eslint` absent, F-b3. This repo: the one file written is **script-generated
JSON** and was deliberately **not** hand-formatted. **No proof-farm script was authored for any
gate** (L-19, §7) — every figure above is a program's own output, and the gate's own controls are
part of that program. Prettier was **checked and deliberately not applied to this record**: ⟨cmd⟩
`npx prettier --check` on `git show HEAD:…/X-P-W3.md` already warns **before** this append, so
`--write` would rewrite `.0`'s receipt inside a file three seats append to concurrently. The cadence
is run over the bytes a unit authors, and this unit's only value.js byte is script-generated JSON.

---

### X.P.W3.a

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18 01:0x–01:4x EDT · phase 1, run concurrently with
`.b` on a disjoint modify set. Spec sections executed exactly: `W3.md` §5 `.a` (L237–251) · §3 items
1–3 (L92–98) · §6 **G-1** (L348–370) · §6 **G-6** (L451–466) · §4/§4a/§4b (L148–226) · §11 items 2
and 4 (L644–655). `W3.md` read WHOLE (673 L, sha256 `53ebaf42…` before and after — **UNTOUCHED**);
`COHESION.md` read to the file end (1,042 L, §0n.6 last); this record read whole through `.0`'s
receipt. Every anchor verified at true bytes before any write; **none had drifted**.

**Gates: G-1 and G-6, this unit's two. G-6 RED → GREEN. G-1 RED → RED, at a measured distance that
rose.** Both readings were taken twice at the settled bytes and were identical.

---

#### a.0 — Method note, stated before the numbers

**The oracle is the published sha-pinned 4.0.0 tarball, and no answer key is self-authored**
(`W3.md` §3 prohibitions). Every accept/reject partition below is *computed* by running
`cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js` over the corpus, not typed. A published THROW
puts its input in the **reject** set as an R1-class row, because `W3.md` §5 `.d` says the mirror
"preserves spec-correctness, never bug-compatibility". Where `parser-band.md` adjudicates against
the published reading, **the adjudication wins and the input is rowed** — never a silent pick.

**The pin is an argument, never a default.** The universe is read through
`git show <sha>:src/css/index.ts`, so a dirty working tree, a sibling track's commit, or a branch
switch cannot move it under a running gate. The pin elected is **`6aca86020b6b2605e7d0f04fccb6601746e387f7`**
— `src/css/index.ts`'s own last change (`feat(v-w43a)!: god-module seam splits css/syntax +
css/timeline`), which also carries `src/css/types.ts` unmoved since `f024d385`. Measured:
`git show 6aca8602:src/css/types.ts | shasum -a 256` → `109327ce94fdcc37…`, string-equal to the
working tree's, so the pin and today's bytes are the same contract.

**The `.ts`/`.mjs` reconciliation** the open recorded is inherited unchanged: this unit authored
`.ts` where the tree is TypeScript (`test/css-totality/*.test.ts`) and `.mjs` where the graduated
tree is (`lib/*.mjs`), and opened **none** of the five names §4a assigns to `.b`/`.c`.

---

#### Act 1 — the universe, generated from the pinned barrel (§3 item 1 · §11 guardrail 2)

`typescript/scripts/css-universe.mjs` + `typescript/test/css-totality/lib/pin.mjs`. Zero export
names appear in either file: the 52 are derived by walking `export [type] { … } from "<module>"`
blocks of the pinned barrel text, in source order, `X as Y` tolerated.

```
⟨cmd⟩ node typescript/scripts/css-universe.mjs --check --pinned-value-commit 6aca8602…
pin        6aca86020b6b2605e7d0f04fccb6601746e387f7
  index    …:src/css/index.ts — 1310 B, sha256 c09d076ed779fede
  types    …:src/css/types.ts — 5879 B, sha256 109327ce94fdcc37
  oracle   …/vendor/value-js-4.0.0/dist/subpaths/css.js  — sha256 8b5381305ea26236
  frozen   …/vendor/value-js-4.0.0/dist/subpaths/css.d.ts — sha256 c81d095213d112c6
universe   19 runtime + 33 types = 52
```

**THE SHAPE ORACLE IS PROVED, NOT ASSUMED.** The pinned `src/css/types.ts` does **not** compile
alone — it imports `../color/model`, `../foundation/result`, `../easing`, `../value` (L1–4) — so the
assignability compile's frozen side is the vendored sha-pinned 4.0.0 declaration. That substitution
is licensed by a measurement, not by convenience: one extractor (W1's own `readTypeDeclarations`,
imported and executed — `harness/totality/**` is execute-and-read) is run over **both** texts and
the two are compared by name and by member/literal set.

```
pin agreement (the frozen declaration vs the pinned src/css/types.ts, one extractor)
  type names     barrel−published ∅ · published−barrel ∅
  runtime names  barrel−published ∅ · published−barrel ∅
  member/literal disagreements 0
```

---

#### Act 2 — the corpus, folded as a UNION (§5 `.a`)

`typescript/test/css-totality/lib/corpus.mjs`. **Nothing is transcribed.** Each arm reads its own
source, and an extraction that comes back empty or off its declared count **throws** rather than
producing a quietly smaller corpus.

| arm | declared | read | source, and how it is read |
|---|---|---|---|
| `ground-a` | 210 | **210** | `cand-f/totality.test.ts:60-71` — the `heads` (21) and `fillings` (10) arrays **extracted from the fixture text**, crossed here |
| `fuzz-f` | 4,000 | **4,000** | `cand-f/totality.test.ts:206-240` — the alphabet, the six seed strings, the PRNG seed `0xbadc0de` and the case count all **extracted**; only the eight-line mutation algorithm is restated, over the fresh root's own `mulberry32` |
| `fuzz-o` | 30,000 | **30,000** | `experiments/w2/corpus/fuzz-gen.mjs` — `generateFuzzRows` **imported**, seed `0x5eedc0de`, replay checked against the banked pin |
| `named` | 148 | **148** | `fixtures/css-color-4-named-colors.json` (`count: 148`, css-color-4, fetched 2026-07-24) |
| `p1` | 403 | **403** | `harness/equivalence/corpus.json` — the P-1 pilot corpus, generated 2026-07-20 |
| `r1` | 172 | **172** | `experiments/w2/corpus/r1.json` + its **7** declared non-string boundary cases |

```
arm total 34,933 · UNION 26,604 · overlap 8,329 · declared non-string boundary 7
written to typescript/test/css-totality/corpus.json — rows sha256 559e84bfb632b140
```

**UNION MEANS SET UNION.** 8,329 inputs appear in more than one arm and are **one row carrying
several provenances**, not several rows; a corpus that double-counts its overlaps inflates every
denominator downstream. `corpus.json` is G-4's named operand (`W3.md` §6 G-4) and is written where
`.b`'s command looks for it.

**F-a.1, cured in passing.** `experiments/w2/corpus/fuzz-seed.json` banks
`rowsSha256 39f3903b…` as the replay assertion, but **no script in the tree produces it** — the
digest was un-replayable from the repository's own bytes. It was recovered by search and is now
written down at `lib/corpus.mjs`: it is sha256 over the row **sources joined by NUL**
(`rows.map(r => r.src).join("\0")`), not over any JSON form. Measured, matching:
`39f3903bbfb1f92f723113ca894e2279f71c0f3b31208c0d981b4164872d09ff`. A pin nobody can recompute is
not a pin.

---

#### Act 3 — the 33 type rows, bidirectional, in ONE compile (§3 item 3 · G-1)

`lib/assignability.mjs` generates the program, its line map, its tsconfig, and a **copy** of the
frozen declaration (copied, not referenced across seven directory levels — that is exactly the
defect `.0` had to cure at `ac1.d.ts`, K.8 D-c1; a generated file regenerated from a pinned source
is location-independent by construction).

Per frozen type `T`, two ordinary assignments and nothing cleverer:

```ts
declare const c_T: Candidate.T;   export const to_frozen_T: Frozen.T = c_T;       // candidate → frozen
declare const f_T: Frozen.T;      export const to_candidate_T: Candidate.T = f_T; // frozen → candidate
```

A **widened** candidate type fails the first; a **narrowed** one fails the second. No conditional
`extends` probe appears anywhere — a conditional reports `false` instead of failing, which is how a
name check disguises itself as a shape check.

```
⟨cmd⟩ npx tsc --noEmit -p typescript/test/css-totality/tsconfig.assignability.json
  program      typescript/test/css-totality/generated/assignability.generated.ts — sha256 8a1b8ab116224e77
  frozen copy  typescript/test/css-totality/generated/frozen-4.0.0.d.ts          — sha256 733fb88e284dfd46
  tsc exit     2 · diagnostics attributed 56 · unattributed 0
```

**56 = 28 undeclared types × 2 directions; zero diagnostics are unattributed and zero land on the
FROZEN side** — the instrument itself compiles clean, which is what makes the 28 readings
trustworthy. Two generator defects were found and cured on the first re-measure, not worked around:
`ParseResult<T>`'s instantiation argument had to be **side-aware**
(`Frozen.ParseResult<Frozen.Declaration>` against `Candidate.ParseResult<Candidate.Declaration>`;
an unqualified `Declaration` is not in scope and yielded four TS2304s), and **TS2724** — TS2694's
"did you mean …" variant — had to join the unresolved set, or `StylesheetItem` would have claimed
two executed cells it never ran.

**The 5 TOTAL type rows**: `CssColor` · `CssTimingFunction` · `Declaration` · `StyleRule` ·
`Stylesheet` — the exact five `build/ac1.d.ts` re-exports, each bidirectionally assignable.

---

#### Act 4 — the 52-row matrix, and G-1's reading

Three families, because the frozen surface has three shapes and pretending otherwise would let a
row pass on a cell that never touched it: **parser** (the nine `(source: string) => ParseResult<T>`
entries, corpus-driven) · **coercer** (`coerceToSyntax(source, syntax)`, the corpus crossed with the
**13 `<production>` literals extracted from the published module's own bytes**, never a hand-picked
list) · **structured** (the two serializers and seven collectors, whose accept inputs are the
published oracle's **own outputs** over the corpus and whose reject inputs are the 7 declared
degenerate values).

```
⟨cmd⟩ node typescript/scripts/css-universe.mjs --check --pinned-value-commit 6aca8602…   → exit 1
tally  runtime 0 TOTAL / 3 PARTIAL / 16 ABSENT · types 5 / 0 / 28 · ALL 5 of 52 TOTAL
RED — 47 of 52 rows are not TOTAL (3 PARTIAL, 44 ABSENT).
```

| row | family | accept | reject | cells run | verdict | misses |
|---|---|---|---|---|---|---|
| `parseCssColor` | parser | 6,075 | 20,529 | **26,604** | PARTIAL | 4,599 |
| `parseTimingFunction` | parser | 503 | 26,101 | **26,604** | PARTIAL | 170 |
| `parseStylesheet` | parser | 2,256 | 24,348 | **26,604** | PARTIAL | 1,965 |
| `parseCssScalar` · `parseCssValue` · `parseCssValues` · `parseKeyframeSelector` · `parseAnimationRange` · `parseAnimationTimeline` | parser | 4 – 10,619 | 15,985 – 26,600 | 0 | ABSENT | — |
| `coerceToSyntax` | coercer | 653 | 32,311 | 0 | ABSENT | — |
| the 2 serializers + 7 collectors | structured | 200 – 400 | 7 | 0 | ABSENT | — |
| the 33 types | type | 1 | 1 | 2 where resolvable | 5 TOTAL / 28 ABSENT | 56 diagnostics |

**Against the census `W3.md` §6 G-1 pastes — runtime 0 TOTAL / 3 PARTIAL / 16 ABSENT, types 0/0/33,
0 of 52 — the runtime distribution reproduces TO THE ROW and the type column moves 0 → 5.** Pass 1
therefore carries a **monotone rise (0 → 5)** and **no §3a halt condition is met**: the halt needs
*three* passes without a rise, and this is one pass with one.

**Every row carries a non-empty accept AND reject corpus, including the 44 ABSENT ones** — so the
instant a peer lands, the row is measurable without a byte of this instrument moving. A row is TOTAL
**only** when its assertion executed (`cellsRun > 0`), both corpora are non-empty, and there are
zero misses; the legend is asserted mechanically and never applied by judgement, which is G-1's own
falsifier.

**The dominant miss classes, handed to `.d` as classes rather than 6,734 rows** (the signature is
purely descriptive — miss kind × the input's leading function head; *adjudicating* these classes is
`.d`'s act, not this seat's):

```
parseCssColor        4,599   DIVERGENT_VALUE:rgb 942 · MIS_ACCEPT:rgb 805 · FALSE_REJECT:rgb 642 ·
                             DIVERGENT_VALUE:hsl 623 · DIVERGENT_VALUE:oklch 489 · FALSE_REJECT:oklch 327 ·
                             FALSE_REJECT:hsl 292 · MIS_ACCEPT:oklch 204 · MIS_ACCEPT:hsl 191 ·
                             FALSE_REJECT:lab 55 · FALSE_REJECT:color 26 · FALSE_REJECT:{hwb,lch,oklab} 1 each
parseTimingFunction    170   FALSE_REJECT:linear 95 · FALSE_REJECT:steps 46 · MIS_ACCEPT:linear 19 ·
                             FALSE_REJECT:cubic-bezier 6 · MIS_ACCEPT:cubic-bezier 4
parseStylesheet      1,965   FALSE_REJECT 1,287 · DIVERGENT_VALUE 442 · MIS_ACCEPT 236
```

**THE ONE NUMBER THAT IS ZERO, AND IT IS THE WAVE'S OWN CRITERION.** Across all 26,604 union rows ×
every resolvable export — **the candidate THREW on 0 cells.** `W3.md` §2a asks for exactly this:
"there is no CSS string — well-formed, malformed, hostile, or not a string at all — that makes the
candidate parser do anything other than return a typed result." On the surface the candidate covers,
that sentence is true at the bytes today.

---

#### Act 5 — the 16 adjudicated conflicts, rowed, and G-6

`lib/adjudications.mjs` is the **one** source of truth for G-6's named rows, the matrix's oracle
override, and `.d`'s ledger. Two groups, both out of `registry/adjudicated/parser-band.md`:
**PB-01..PB-13**, its `MEASURED — published-parser defects` table (`:85-100`, "each confirmed by
direct probe"), and **ADJ-1..ADJ-3**, the three folded-suite conflicts `W3.md` §5 `.a` names.

Every row carries the six fields `DIVERGENCE-LEDGER.md` demands; the **incumbent and candidate
halves are MEASURED**, never written from memory:

```
id     G-6  input                       incumbent                    candidate                    wants    honoured
PB-01  a    "rgba(1, 2, 3, 0.5)"        reject css_syntax            ok {rgb,[1,2,3],0.5}         accept   YES
PB-02  b    "hsla(120, 50%, 50%, 0.5)"  reject css_syntax            ok {hsl,[120,0.5,0.5],0.5}   accept   YES
PB-03  c    "hsl(120 50 50)"            ok {hsl,[120,50,50]}         ok {hsl,[120,0.5,0.5]}       accept   YES
PB-03  c    "hsl(120 50% 50%)"          ok {hsl,[120,0.5,0.5]}       ok {hsl,[120,0.5,0.5]}       accept   YES
PB-04  d    "rgb(300 -20 3)"            ok {rgb,[300,-20,3]}         ok {rgb,[255,0,3]}           accept   YES
PB-05  e    "rgb(1 2 3 / 1.5)"          reject css_syntax            ok alpha 1                   accept   YES
PB-06  f    "rgb(1,2,3,)"               ok {rgb,[1,2,3]}             reject css_syntax            reject   YES
PB-07  g    "rgb(1 2 3 / )"             ok {rgb,[1,2,3]}             reject css_syntax            reject   YES
PB-08  h    "rgb(1, 2 3)"               ok {rgb,[1,2,3]}             reject css_syntax            reject   YES
PB-09  i    "hsl(120%, 50%, 50%)"       ok hue 432                   reject css_syntax            reject   YES
PB-10  j    "lch(50% 50% 50%)"          ok {lch,[50,75,180]}         reject css_syntax            reject   YES
PB-11  k    "hwb(120, 30%, 40%)"        ok {hwb,[120,0.3,0.4]}       reject css_syntax            reject   YES
PB-12  l    "rgb(1. 2 3)"               ok {rgb,[1,2,3]}             reject css_syntax            reject   YES
PB-13  —    "currentcolor"              reject color_context_required reject color_context_required reject  YES
ADJ-1  —    "hsl(480 50% 50%)"          ok hue 480                   ok hue 480                   accept   YES
ADJ-1  —    "hsl(-120 50% 50%)"         ok hue −120                  ok hue −120                  accept   YES
ADJ-2  —    "rgb(50%20%30%)"            reject css_syntax            ok {rgb,[127.5,51,76.5]}     accept   YES
ADJ-2  —    "rgb(1.5.5 3)"              reject css_syntax            ok {rgb,[1.5,0.5,3]}         accept   YES
ADJ-2  —    "hsl(120 50%50%)"           reject css_syntax            ok {hsl,[120,0.5,0.5]}       accept   YES
ADJ-3  —    "rgb(1e400 0 0)"            reject css_syntax            ok {rgb,[255,0,0]}           accept   YES
ADJ-3  —    "lab(50 1e400 0)"           reject css_syntax            reject css_syntax            reject   YES
ADJ-3  —    "hsl(1e400 0% 50%)"         reject css_syntax            reject css_syntax            reject   YES

  16 adjudications · 22 witnessed inputs · 19 diverge from the incumbent · 0 NOT honoured
```

**NO NINTH `ParseIssue` CODE IS PROPOSED, ADDED, OR IMPLIED.** `parser-band.md` spells the third
folded conflict "`1e400` → `color_non_finite`", which is **cand-O's own diagnostic vocabulary**, not
the frozen union's: the frozen union has eight codes (`src/css/types.ts:11-19`, read mechanically by
the matrix — `frozenCodes.length` → **8**) and `color_non_finite` is not among them. Adding it would
be a `W3.md` §3a halt to X·V and the owner, "never a local decision". The adjudication is therefore
carried **at its meaning** — clamp where a clamp exists, reject the unclamped non-finite channel —
lowered onto `css_syntax`, and **the naming difference is itself an ADJ-3 ledger field**. This is
recorded loudly because it is the one place in this unit where the §3a tripwire was within reach.

**G-6, the suite:**

```
⟨cmd⟩ npx vitest run --config typescript/test/css-totality/vitest.config.ts
 ✓ test/css-totality/spec-conformance.test.ts (13 tests)
 ✓ test/css-totality/universe.test.ts        (59 tests)
 Test Files  2 passed (2) · Tests  72 passed (72)      — run TWICE, identical both runs
```

**13 = the twelve named rows, each its own `it(...)`, plus a guard that the adjudication table
carries exactly `a…l`.** The rows are not typed in the suite; they are read from the same
adjudication table the matrix uses, so a row proved green here that the matrix did not know about
would be exactly the drift the generator exists to prevent.

**59 = 7 instrument assertions + one `it` per frozen export, all 52.** Each row asserts the two
things that must hold *whatever* the coverage count is: **totality** (the candidate THREW on no cell
of that row) and **honesty** (the corpus is non-empty; TOTAL implies an executed assertion and zero
misses). G-1's pass/fail stays where `W3.md` §6 G-1 puts it — `css-universe.mjs --check` — so no
seat after `.a` inherits a red file for a condition no seat here can turn.

**`--cross-check-ledger`, the other half of the `.a`/`.d` family, is wired and RED-as-expected today**
because `.d` has not written its ledger yet; it already hands `.d` the sixteen ids by name:

```
⟨cmd⟩ node typescript/scripts/css-universe.mjs --cross-check-ledger docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md
RED — the ledger is ABSENT. 16 adjudicated conflicts were resolved by `.a` and every one of them
must be a row: W3.md §6 G-7 treats an unrowed intentional difference exactly as it treats a defect.
  UNROWED  PB-01 … PB-13 · ADJ-1 · ADJ-2 · ADJ-3
```

---

#### Gate readings, BEFORE → AFTER, at the settled bytes, double-run

| gate | BEFORE (read-only, this seat's own clock) | AFTER | verdict |
|---|---|---|---|
| **G-1** UNIVERSE-52-TOTAL | `test -e typescript/scripts/css-universe.mjs` → **ABSENT**; `test -e typescript/test/css-totality/tsconfig.assignability.json` → **ABSENT**; the 07-20 census stands at **0 of 52 TOTAL** | the command RUNS: **5 of 52 TOTAL** (runtime 0/3/16 · types 5/0/28), exit **1**, over a 26,604-row union with 26,604 cells executed on each resolvable parser row | **RED → RED, at a measured distance that ROSE by 5.** Not claimed green, not narrated green |
| **G-6** SPEC CONFORMANCE ROWS | `test -e typescript/test/css-totality/spec-conformance.test.ts` → **ABSENT**; the incumbent readings stand (legacy 4-arg forms REJECT; the two `hsl` spellings disagree 100×; `rgb(300 -20 3)` → `[300,−20,3]`; `rgb(1 2 3 / 1.5)` rejects; all seven unsound inputs ACCEPT) — **each re-measured at this seat against the pinned oracle and each reproduced** | **13 tests pass**, twice; all twelve named rows honoured, 0 unhonoured adjudications of 22 witnessed inputs | **RED → GREEN** |

**G-1 is reported honestly and is NOT claimed.** The 47 rows that are not TOTAL are 44 the candidate
has no peer for and 3 whose corpora reach grammar the candidate does not implement (`color()`,
`lab()`, `lch()`, `oklab()`, `hwb()`, `var()` in declarations, `@`-preludes in stylesheets). Closing
that distance is a write under `<p2>/typescript/src/css/**` — `.b`'s and `.c`'s glob by §4a, and in
**no** row of this seat's writable set. `W3.md` §5 assigns G-1 to `.a` as a sub-gate and assigns the
*implementation* of the 16 absent runtime exports and 28 absent type exports to **no unit at all**;
that is stated here as **F-a.6**, for the orchestrator, rather than solved by a write outside bounds.

---

#### The commits

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | `<p2>` | **`bd10e5c`** | `feat(x-p-w3/universe): generate the 52-export conformance manifest and its corpora` — 15 files, 3,325 insertions, all under `typescript/scripts/css-universe.mjs` and `typescript/test/css-totality/**` |
| 2 | value.js | **`12564399`** | `docs(x-p-w3/.a): evidence — the generated 52-row universe matrix, born-RED at 5 of 52` — **1 file**, `docs/tranches/X/parse-that/evidence/W3/universe-52.json` |

`universe-52.json` — **155,452 B**, sha256
`0005f26b10b0c9f093466c134c7fc71d472be7d8d6b0bf2809bb83386f2598de`, **byte-identical on two
consecutive generations** (the document carries no timestamp, by design).

Both commits carry **their own pathspec on the commit itself**. `git diff --check` clean on both.
`scripts/dev/dev.sh` appears in **0** commits of this unit and was never opened —
`git status --porcelain -- scripts/dev/dev.sh` reads ` M`, unstaged, before and after. Gate 27:
`git status --porcelain -- src api demo test e2e | wc -l` → **0**, double-run. No `git stash`, no
`reset`, no `--force`, no `-A`, no `-u`, no `commit -a`. `/Users/mkbabb/Programming/parse-that`,
`~/Documents/Codex/**`, `~/.codex/**`, `../glass-ui/**`, `../keyframes.js/**` and
`../fourier-analysis/**` carry **no byte** from this unit. Neither repo was pushed by this unit.

---

#### Findings raised by this unit (each with an owner)

| id | severity | finding | owner |
|---|---|---|---|
| **F-a.1** | INFO | **`experiments/w2/corpus/fuzz-seed.json`'s `rowsSha256` had no producer in the tree** — no script computes it, so the replay assertion was un-reproducible from the repository's own bytes. Recovered by search and **written down** at `lib/corpus.mjs`: sha256 over `rows.map(r => r.src).join("\0")`. Matches the banked `39f3903b…`. Cured in passing; recorded so the next seat does not re-derive it | `.g` / L-18 (the pin's author); cured here |
| **F-a.2** | MINOR | **`W3.md` §6 G-6 (L451-455) enumerates TWELVE named assertions**, not eleven — five accept-side (two legacy 4-arg forms, one bit-for-bit spelling equivalence, one channel clamp, one alpha clamp) and seven reject-side. This record's own `.a` dispatch row (L222) and this seat's brief both say *"eleven"*. The spec's bytes govern; **twelve** were landed, each independent, and the suite asserts the row set is exactly `a…l`. Corrected **beside**, never by editing `W3.md` (E-3) | **orchestrator** — a record-row correction, not a spec patch |
| **F-a.3** | MINOR | **G-6's literal command collects ZERO files.** ⟨cmd⟩ `npx vitest run test/css-totality/spec-conformance.test.ts` (from `<p2>/typescript`) → *"No test files found, exiting with code 1 · filter: test/css-totality/spec-conformance.test.ts · include: test/\*.test.ts"*. `typescript/vitest.config.ts:5` scopes `include` to ONE directory level and a Vitest CLI positional is a **filter** over the collected set, not an addition to it. Widening that glob is a write to a file in **no** row of `W3.md` §4 (§3a File-bound expansion), so the minimal lawful cure is a config inside this seat's own create row: `npx vitest run --config typescript/test/css-totality/vitest.config.ts`. It narrows nothing — the config collects every `*.test.ts` under `test/css-totality/**` | **orchestrator / `.e`** — a one-row `include` widening or a dated addendum; the gate is RUN and GREEN through the seat's own config meanwhile |
| **F-a.4** | INFO | **The generated assignability program adds 56 deliberate diagnostics to the WORKSPACE compile.** `typescript/tsconfig.json` includes `test/` wholesale, so `generated/assignability.generated.ts` — a conformance fixture that is *supposed* to be red while the candidate lacks 28 frozen types — lands in it. Measured: every one of the 56 is TS2694/TS2724 in that single generated file; **zero** errors come from this seat's three hand-written `.ts` files. The one-line cure is `"exclude": ["test/css-totality/generated/"]` in `typescript/tsconfig.json`, which is in no row of §4 and therefore not this seat's to make | **orchestrator / `.e`** |
| **F-a.5** | INFO | **§7's `npx eslint .` has no subject in the fresh root**: ⟨cmd⟩ `npx eslint typescript/test/css-totality` → *"ESLint couldn't find an eslint.config.\* file"* (ESLint 10.10.0). Pre-existing and independent of this wave. The cadence actually run here was `node --check` on all 7 `.mjs` (7/7 ok), `tsc` on the `.ts` (0 errors from hand-written files), and the suites twice | **orchestrator** |
| **F-a.6** | **MAJOR** | **`W3.md` §5 assigns G-1 to `.a` as a sub-gate but assigns the IMPLEMENTATION of the surface to no unit.** G-1 requires all 52 TOTAL; the graduated survivor ships **3** runtime exports and **5** type re-exports (`build/ac1.js`, `build/ac1.d.ts` — measured, not inferred). Closing the remaining 16 runtime and 28 type rows is a write under `<p2>/typescript/src/css/**`, which §4a gives to `.b` (`lower`/`diagnostics`/`codes`) and `.c` (`entry`/`bounds`) for *their* named cures, and to nobody for the 52. This seat did **not** write outside its bound to close it, and did not narrow the universe to what the candidate covers (§11 guardrail 2). **G-1 is a wave-level condition, not a `.a`-level one** | **orchestrator** — for the §3a Triumvirate Dispatch, or a dated addendum naming the implementing seat |
| **F-a.7** | **MAJOR** | **A sibling seat's branch switch orphaned two commits off `tranche-u`.** Reflog, read at this seat: `ec654158 HEAD@{0}: checkout: moving from x-w1-falsifier-g7 to tranche-u` · `6021105a HEAD@{1}: commit: docs(x-p-w3/.a): evidence …` · `3c002f1c HEAD@{2}: commit: docs(x-p-w3/.b): evidence — the recovery-closure run …` · `139bca9b HEAD@{3}` · `ec654158 HEAD@{4}: checkout: moving from tranche-u to x-w1-falsifier-g7`. An X·V W1.a seat checked out a scratch branch **in the shared working tree**, and this unit's and `.b`'s evidence commits landed on it. **Mine is recovered**: `git cherry-pick --no-commit 6021105a` onto `tranche-u`, re-landed as **`12564399`** with the file's sha256 identical to the first landing's; no reset, no force, no other seat's path touched. **`.b`'s `3c002f1c` is still orphaned on `x-w1-falsifier-g7` and is `.b`'s to recover, not this seat's.** Four tracks share one working tree as well as one index: a branch switch is as destructive as an unpathspec'd `git add`, and no standing law names it yet | **orchestrator** — and a standing-law row beside the pathspec rule |

**Escalations: NONE from this unit's own acts.** No `W3.md` §3a trigger fired *by anything this seat
did*: no write was proposed or made outside the §4 table as widened by `.0`'s dated addendum; no
gate entered a third diagnose→edit→re-measure iteration (both generator defects were cured and
confirmed on the **first** re-measure, and G-1 has taken exactly **one** pass, with a monotone rise);
no ninth `ParseIssue` code was added, proposed, or discussed; no bench bar was set, invented,
inferred or reconciled; no CST. **F-a.6 and F-a.7 are returned to the orchestrator as findings with
their measurements**, which is what §3a's File-bound-expansion and cross-seat clauses ask for — this
seat did not take the write that would have closed either.

---

#### E13 and the standing invariants, at this unit's own clock

The wave's **O.1** four-path sweep stands. Re-measured here: ⟨cmd⟩ `grep -c '^| I-' INBOX.md` →
**36**, unchanged; the three `UNREAD 2026-09-17` rows are **I-32 · I-33 · I-34**, each read
row-by-row and each stating in its own bytes that it is not X·P's (*"Zero parse-that bytes; not
X·P's to dispose"* · *"Not X·P's: it names no parse-that byte"* · *"Not X·P's, not a value.js act
today"*). **0 unrowed · 0 UNREAD in X.P.W3.a's scope.** This unit **minted no mail**, wrote **zero**
bytes in any producer tree, and read `../glass-ui/**` not at all.

**Format and lint cadence (§7).** Fresh root: `node --check` on all 7 authored `.mjs` → **7/7 ok**;
`npx tsc --noEmit -p typescript/tsconfig.json` attributes **0** errors to this seat's hand-written
`.ts` files and **56** to the generated fixture (F-a.4); the two suites run **twice**, 72/72 both
times; `npx eslint` has no config in this root (F-a.5). This repo: the wave is docs-only for this
seat — one generated JSON, `git diff --check` clean. **No proof-farm script was authored for any
gate** (L-19): `css-universe.mjs` executes a 26,604-row corpus and compiles a program, and its
output *is* the evidence.

---

### X.P.W3.b — ADDENDUM 2026-09-18 (same sitting), beside the receipt above, never over it

**F-b5 — a committed act of this unit landed on a sibling seat's scratch branch and had to be
re-landed. Recorded loud, because it is a cross-seat hazard of the shared worktree and not a
property of this unit's bytes.** The receipt above names **`3c002f1c`** as the evidence commit. That
commit exists, but it is **not reachable from `tranche-u`**: it landed while the X·V W1.a seat had
the scratch branch `x-w1-falsifier-g7` checked out in this same worktree. Read from the reflog, not
inferred:

```
⟨cmd⟩ git reflog
HEAD@{6}  checkout: moving from tranche-u to x-w1-falsifier-g7      ← a sibling seat's scratch branch
HEAD@{5}  commit: test(x-v/w1.a): G-7 falsifier — a deliberately broken spec, scratch branch only
HEAD@{4}  commit: docs(x-p-w3/.b): evidence — the recovery-closure run   ← THIS UNIT, on that branch
HEAD@{3}  commit: docs(x-p-w3/.a): evidence — the 52-row universe matrix ← X.P.W3.a, likewise
HEAD@{2}  checkout: moving from x-w1-falsifier-g7 to tranche-u       ← both acts left behind
⟨cmd⟩ git branch --contains 3c002f1c            →  x-w1-falsifier-g7        (NOT tranche-u)
⟨cmd⟩ git cat-file -e HEAD:…/evidence/W3/recovery-closure.json  →  fatal: does not exist in 'HEAD'
```

**The cure, taken without any of the forbidden instruments.** No `reset`, no `rebase`, no
`cherry-pick`, no `stash`, no force-push: the gate was **re-run at the settled bytes** and the file
**re-landed by its own pathspec** as **`f7954997`**. The re-landed bytes are **byte-identical to the
stranded blob** — ⟨cmd⟩ `diff <(git show 3c002f1c:…) <the fresh run>` → **empty** — which is this
gate's determinism measured a **third** time (the first two are the double-runs in b.3).

**The evidence commit of record for X.P.W3.b is therefore `f7954997`, not `3c002f1c`.** The receipt
above is left exactly as it was written (E-3: a correction is an addendum-beside, never a rewrite),
and this block is the correction.

**The same hazard took `.a`'s `6021105a`**, which `.a` re-committed as `12564399` — two of the three
commits made during that window were lost to it, so it is a **property of the window, not of either
seat**. Routed to the orchestrator as a standing operational row: **a seat that checks out a scratch
branch in the shared `value.js` worktree silently redirects every other seat's commits for the
duration**, and the four-track pathspec discipline does not defend against it (the pathspec is
correct; the *branch* is not). This unit's remaining acts were re-verified against `tranche-u` after
the re-land:

```
⟨cmd⟩ git log --oneline -3
f7954997 docs(x-p-w3/.b): evidence — RE-LANDED on tranche-u
2456033b docs(x-p-w3/.b): unit receipt — G-8 GREEN, G-4 RED on two legs …      ← ON tranche-u
12564399 docs(x-p-w3/.a): evidence — the generated 52-row universe matrix      ← .a's re-land
⟨cmd⟩ git cat-file -e HEAD:docs/tranches/X/parse-that/evidence/W3/recovery-closure.json  →  PRESENT
⟨cmd⟩ git -C <p2> log --oneline -3   →  f666b6f · 1cfa29b · 39503f8  (the fresh root was never
                                        on any branch but its own working branch; unaffected)
```

**Re-verified after every sibling landing of this sitting** (`.a`'s scripts, suites and receipt all
landed between this unit's commits): ⟨cmd⟩ the closure gate → **exit 1, 8 of 10 legs GREEN, evidence
byte-identical**; ⟨cmd⟩ `npx vitest run --config typescript/test/css-recovery/vitest.config.ts` →
**23 passed / 1 born-RED**, unchanged. Nothing `.a` landed moved a figure this unit published.

**Addendum-beside to X.P.W3.a, same sitting (2026-09-18 01:5x EDT), never a rewrite of the block
above.** The gate-27 reading pasted in *The commits* (`git status --porcelain -- src api demo test
e2e | wc -l` → **0**, double-run) was true at this unit's own clock and is **no longer true at the
file's clock**: a re-measure at the close of this receipt reads **1**, the single line
` M e2e/smoke/admin/a11y-authed-admin.spec.ts`. It is a **sibling track's** byte — the X·V W1.a seat
whose whole brief is the Playwright/e2e verification surface (`ci(x-v/w1.a)` · `test(x-v/w1.a)`, at
`ec654158`/`ca1a4459`/`49306a1d`) — and **none of this unit's three value.js commits
(`12564399` · `007d3820` · `d7eb2e33`) touches any path under `src/`, `api/`, `demo/`, `test/` or
`e2e/`**, which `git show --stat` on each confirms. Stated rather than left to be discovered: a
shared working tree makes gate 27 a *tranche-wide* reading, not a per-seat one, which is the same
lesson F-a.7 draws from the branch switch.

---

## RESUME 2026-09-18 — Track D seat 0, X.P.W3 re-opened in RESUME MODE

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18, this seat's own clock. The wave was not closed and
was not re-opened: `LEDGER.md` reads **`OPEN 2026-09-17`** for `X.P.W3` and this record exists, which
is the runner's RESUME predicate exactly. **Nothing above this line is rewritten** (E-3): the open,
the baseline and the three landed receipts stand as their authors wrote them, and this block is the
correction-and-continuation beside them. The prior seat 0 died the way `COHESION.md` §0o's erratum
describes — *"the API's rate-limit backoff outran the runner's 180 s no-progress window"* — and §0o's
own cure is what is being exercised here: *"a runner-dead wave re-opens in RESUME MODE with nothing
lost."*

### R.1 — What has LANDED, verified at the bytes in both histories (never from the record's prose)

**Eighteen commits, all reachable, none orphaned.** The `x-w1-falsifier-g7` hazard F-a.7 and F-b5
recorded is re-measured here and is **closed**: every value.js commit below reports `tranche-u` in
`git branch --contains`.

```
⟨cmd⟩ for h in …; do git branch --contains $h; done      (value.js, 8 commits)
641ba4db  tranche-u, x-w1-falsifier-g7      ← .0  the three dated addenda-beside
12564399  tranche-u                         ← .a  evidence, the 52-row universe matrix (the re-land)
007d3820  tranche-u                         ← .a  unit receipt
d7eb2e33  tranche-u                         ← .a  ledger cells
d500e1e4  tranche-u                         ← .a  addendum-beside (gate 27 re-measured)
2456033b  tranche-u                         ← .b  unit receipt
f7954997  tranche-u                         ← .b  evidence, RE-LANDED (the commit of record, not 3c002f1c)
27ed1e49  tranche-u                         ← .b  addendum-beside
⟨cmd⟩ git -C <p2> log -1 --format=%s <h>                 (<p2>, 10 commits)
8d8ebc6 · 1857c9b · 4d8dae4 · 7be817c · a35e3c5 · 57ddc96   ← .0 (six)
39503f8 · 1cfa29b · f666b6f                                  ← .b (three)
bd10e5c                                                      ← .a (one)
```

**The named artefacts, present at HEAD** — `git cat-file -e HEAD:<path>` on each, **5 of 5 PRESENT**
in value.js (`W3-ADDENDA-2026-09-18.md` · `W1-ADDENDA-2026-09-18.md` ·
`algebra/ALGEBRA-ADDENDA-2026-09-18.md` · `evidence/W3/universe-52.json` ·
`evidence/W3/recovery-closure.json`) and **6 of 6 PRESENT** in `<p2>` (`src/css/codes.mjs` ·
`diagnostics.mjs` · `lower.mjs` · `scripts/css-recovery-closure.mjs` · `scripts/css-universe.mjs` ·
`experiments/w2/contract/ALGEBRA-ADDENDA-2026-09-18.md`).

**`.0`, `.a` and `.b` are therefore DONE and are NOT re-dispatched** — the resume law's own words: a
unit whose commits exist is never re-dispatched. Their REDs are carried, not re-opened: `.a`'s **G-1
RED at 5 of 52** and `.b`'s **G-4 RED on C-3 (⊇, 5 of 8 unemitted) and C-4 (two inherited dead
fallback arms)**, each with its escalation already written above (`.b` b.5 E-1 · E-2 · E-3, `.a`
F-a.6). **No seat of this resume may turn any of them green by narrative, by denominator, or by a
write outside its own bound.**

### R.2 — What is OWED: `.c`, `.d`, `.e` — and a WIP residue found in the tree, disclosed loud

**No `.c`, `.d` or `.e` commit exists in either history**, on any branch:

```
⟨cmd⟩ git log --oneline --grep='x-p-w3'                  → 8 commits, all .0/.a/.b (above)
⟨cmd⟩ git -C <p2> branch -a                              → w2/ac1 · w2/ac2 · w2/ac3-scan-union · * w2/harness
⟨cmd⟩ git -C <p2> log --all --oneline | grep 'x-p-w3/.c' → (none)
```

**F-r.1 — MAJOR (disclosure, not an adoption).** A `.c` seat ran and died mid-flight before it
committed anything. Its bytes are in the `<p2>` working tree, **untracked**, and they carry this
wave's own `SERVED MODEL` header and `X.P.W3.c` bylines:

```
⟨cmd⟩ git -C <p2> status --porcelain
?? .worktrees/                                    ← §4b's prescribed container, as the open measured it
?? typescript/src/css/bounds.mjs                  14,300 B   Sep 18 01:59
?? typescript/src/css/entry.mjs                   13,409 B   Sep 18 02:01
?? typescript/test/css-recovery/boundary/         boundary.test.ts 11,954 B · depth.test.ts 6,913 B ·
                                                  latch.test.ts 9,159 B · no-throw.test.ts 9,648 B ·
                                                  lib/corpus.mjs                     (02:04–02:17)
```

Every one of those paths is **inside `.c`'s own writable set** (`W3.md` §5 `.c` Files; §4a's split of
`<p2>/typescript/src/css/**`), so nothing unlawful was written — the seat simply never reached its
commit. **The bytes are UNVERIFIED**: no gate reading was published for them, no receipt block was
appended here, and no `.d`/`.e` artefact exists at all. The re-dispatched `.c` **inherits them as a
draft, not as a result**: it reads them against `W3.md` §5 `.c` and §6 G-3/G-9 at the bytes, runs
both gates itself, keeps what measures true, rewrites what does not, and commits by pathspec. **A
receipt that reports a gate it did not run on the bytes it is committing is the dishonesty this
wave's own §11 guardrail 2 names.**

### R.3 — Baseline: banked at the open, NOT re-taken here

The ten hard-gate conditions were read READ-ONLY at the open and are in **§Baseline** above — **10 of
10 RED before cure, 0 GREEN-BEFORE-CURE**, with G-2 reproducing 324/1548, G-3 10/10 to the call, and
G-5's MEASURE-AT-OPEN taken. **This seat re-ran no gate** (R.2's discipline: a GREEN before its cure
is a finding, and a resume that re-baselines after three units have landed would be measuring the
cures, not the disease). The two gate readings that have moved since are the landed ones, published
in their own receipts: **G-6 RED → GREEN** (`.a`) and **G-8 RED → GREEN** (`.b`).

### R.4 — E13 Step-0, re-swept at this seat's own clock

The four paths swept read-only and compared against **every** row of `INBOX.md`; classification taken
from each row's **status cell**, never from a bare `grep -i unread`.

| path | newest by mtime | verdict |
|---|---|---|
| `docs/tranches/V/` + `V/coordination/` | `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (Sep 18 01:41) | **ours, outbound** — already rowed **O-28** |
| `../glass-ui/docs/tranches/BK/coordination/` (**BK confirmed newest**: `ls docs/tranches/` → … BI · BJ · **BK**) | `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` (Sep 18 00:31) | **ours, outbound** — already rowed **O-26** |
| `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` | ours, outbound; rowed |
| `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | rowed since 07-27 |

⟨cmd⟩ `grep -c '^| I-' docs/tranches/V/coordination/INBOX.md` → **36**, unchanged since the open.
**0 unrowed value-addressed items · 0 new `I-n` · 0 UNREAD in X.P.W3's scope.** The three rows whose
status cell still reads `UNREAD 2026-09-17` are **I-32 · I-33 · I-34**, re-read row-by-row at this
seat: their own Routing cells read *"**No X·P wave, no X·P act, opens on this row**"* (I-32),
*"Glass is **READ-ONLY always** — producer rows ride SS-6"* (I-33) and *"**Not X·P's, not a value.js
act today**"* (I-34). **This seat minted no mail and wrote zero bytes in any producer tree.**

### R.5 — The dispatch, on the record's own group table

Groups 1 and 2 are spent. **Three ordered groups remain, concurrency 1 each** — `.c` alone (it
imports `.b`'s frozen-code module and its test dir is nested inside `.b`'s), then `.d` (*"needs
`.a`–`.c` landed"*), then `.e` (the fresh Fable adjudicator, after `.d` commits).

| group | unit | model | still owed |
|---|---|---|---|
| 3 | **`.c`** | opus | G-3 · G-9; the throw class, the JS boundary (PT-07), depth (PT-04) + latch (PT-03) — over the untracked draft of F-r.1, verified not adopted |
| 4 | **`.d`** | opus | G-2 · G-5 · G-7 · G-10; the 52-export differential, `DIVERGENCE-LEDGER.md`, the three-leg bench table with **`BAR: OWNER-GATED-PENDING-RATIFICATION`** (§0j.E OC-1: *"inventing a bar is a defect"*) |
| 5 | **`.e`** | **fable** (fresh) | the §5.e sub-gate; the L-14 refutation attempts, `W3-CLOSE.md` with RED-before/GREEN-after pasted, the harvest chain, the `COHESION.md` §5 carve |

**`.e`'s L-13 referent is unchanged and is fixed here again so it cannot be argued after the fact:
the units dispatched are SIX — `.0`, `.a`, `.b`, `.c`, `.d`, `.e`** — three landed before this
resume, three after; a harvest reporting fewer seats is RED, not a passing summary. `W3.md` §5.e's
literal *"five"* is `W3.md`'s own count of §5's roster and is reconciled, not contradicted, by the
`.0` row this record has carried since the open (the X.P.W2 `.0` precedent, COHESION §0l).

**Carried into the re-dispatch, none of it re-opened and none of it curable by the seat that meets
it**: `.b` E-1 (the ⊇ direction wants six more grammar entries in `algebra/grammar.mjs`, **in no
unit's writable set**), `.b` E-2 (the two dead fallback arms in `lowering-{js,wasm}/index.mjs`,
likewise), `.b` E-3 (the literal vitest form collects zero files — **`.c`'s G-9 command meets the
identical gap**, and the lawful cure is the seat's own config inside its own `boundary/**` create
row, exactly as `.a` and `.b` took it), `.a` F-a.6 (G-1's implementation is assigned to no unit) and
F-b4 (the promoted `expected` labels are a **`.d` divergence row** with a consumer direction). Each
is an orchestrator row; **no seat of this resume grants itself a bound.**

### R.6 — F-r.2 (MINOR, disclosed): the shared ledger carried a sibling's uncommitted row byte, and this seat committed only its own hunk

`LEDGER.md` is one file that four tracks append to, so the pathspec discipline — which separates
*paths* — does not separate *hunks*. At this seat's clock the working tree carried an **uncommitted
Track-B byte**: an append of `· 917892a3 · 58059e74 · a6f474d3` to the **KF.W7** row's commit cell.
A `git add` of the file would have swept a sibling's in-flight row into this wave's commit — the
same defect class as X-W0's three contaminated commits, one level down.

**The cure, taken without any forbidden instrument** (no `stash`, no `reset`, no `checkout --`, no
`add -p`, no byte of the sibling's row altered): the working-tree file was copied aside; the file was
re-composed as `git show HEAD:…/LEDGER.md` **plus this seat's own two appended lines**; that was
staged and committed by pathspec; the copy was then restored, putting the sibling's byte back exactly
as it was found. Measured on each side:

```
⟨cmd⟩ git diff --numstat -- …/LEDGER.md   (before)  → 3  1     ← 2 mine + the sibling's 1/1 row
⟨cmd⟩ git diff --numstat -- …/LEDGER.md   (staged)  → 2  0     ← mine alone, append-only
⟨cmd⟩ git show --stat --format= HEAD                → 2 files changed, 139 insertions(+), 0 deletions(-)
⟨cmd⟩ git diff --numstat -- …/LEDGER.md   (after)   → 1  1     ← the sibling's row byte, restored intact
```

Routed to the orchestrator as a standing operational row beside F-a.7's branch-switch lesson: **on a
file four tracks share, "pathspec only" is necessary and not sufficient — a seat must also verify
that the file's working-tree diff contains nothing but its own lines before it stages.**

---

### X.P.W3.c

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18, this seat's own clock · **group 3, run ALONE**
(§4a: its test dir is nested inside `.b`'s glob — the X·V W5-D1 hazard — and it imports `.b`'s
frozen-code module, which landed first at `<p2>` `39503f8`, **verified at the bytes** before a line
was written: ⟨cmd⟩ `git -C <p2> cat-file -e 39503f8:typescript/src/css/codes.mjs` → present, and
`git -C <p2> log --oneline -1 39503f8` → *"feat(x-p-w3/recovery): closed 8-code union, no fallback
arm"*). Spec sections executed exactly: `W3.md` §5 `.c` (L279–297) · §3 items 5–6 (L102–106) · §6
**G-3** (L398–418) · §6 **G-9** (L504–518) · §2c rows (L74, L86–87) ·
`W3-ADDENDA-2026-09-18.md` §A-2 · `COHESION.md` §0j.E. `W3.md` read WHOLE (673 L); `COHESION.md`
read to the file end; this record read whole through the RESUME block before a byte was written.

**Gates turned: G-3 GREEN · G-9 GREEN on the depth leg, RED on the latch leg** — the latch's cure
is a write in a file `W3.md` §4 admits in no row, so it is **returned with its measurement**
(ESC-c1), never masked. Nothing was narrowed, skipped, allow-listed, re-shaped or re-pinned to make
a leg green.

`<p2>` = `/Users/mkbabb/Programming/parse-that-css-totality-p2`. **Extension**: the spec's `.ts`
names (`entry`, `bounds`) are adopted as `.mjs`, per `W3-ADDENDA-2026-09-18.md` §A-2 and the open's
recorded reconciliation (this record, L87–93) — §4's first row admits the whole glob, so no bounds
question arises. Every figure below is read from the **settled (committed) bytes** and **double-run**;
the two runs were identical in every case.

---

#### c.0 — The F-r.1 draft: read FIRST, verified, and only then kept

R.2 disclosed an untracked draft left by a seat that died before it committed. The resume law's own
words bind this seat: *"inherits them as a draft, not as a result … runs both gates itself, keeps
what measures true, rewrites what does not."* What that came to, measured:

| draft artefact | R.2's reading | this seat's verification | disposition |
|---|---|---|---|
| `src/css/entry.mjs` | 13,409 B | ⟨cmd⟩ `wc -lc` → **228 L · 13,409 B** — byte-count identical, and every cited coordinate re-measured true (below) | **KEPT, not one byte rewritten** |
| `src/css/bounds.mjs` | 14,300 B | ⟨cmd⟩ `wc -lc` → **265 L · 14,300 B**, same | **KEPT, not one byte rewritten** |
| `boundary/{boundary,depth,latch,no-throw}.test.ts` + `lib/corpus.mjs` | 5 files | ran; 113 of 115 green, the 2 red the latch leg | **KEPT with four corrections** (c.3) |
| a suite project | **absent** | the gate's literal form collects **0 files** (measured, c.2) | **AUTHORED** — `boundary/vitest.config.ts` |

**Every coordinate the draft cites was re-measured at this seat rather than believed.** Each one is
true:

```
⟨cmd⟩ grep -n 'let PACKRAT_ARMED\|if (!PACKRAT_ARMED)\|PACKRAT_ARMED = true' src/parse/packrat.ts
158: let PACKRAT_ARMED = false;      224: if (!PACKRAT_ARMED) return null;   ← packratEnter, the reader
273: if (!PACKRAT_ARMED) return;     297: PACKRAT_ARMED = true;              ← makeMemoized, the one-way arm
⟨cmd⟩ sed -n '700p;259p' src/css/lowering-js/js-alg.mjs
700: const label = labelIndex("nesting <= 64");
259: if (asciiFold(sg.src.slice(from, from + len)) !== folded) …      ← the non-string TypeError site
⟨cmd⟩ sed -n '93,94p;100p' src/css/algebra/grammar.mjs   → balancedTail's REF back-edge · headVar
⟨cmd⟩ grep -n 'nesting' src/css/algebra/tables.mjs       → 218
⟨cmd⟩ sed -n '7p' src/css/lowering-js/index.mjs          → "No `try/catch` exists in `ENTRY` (DM-4)…"
⟨cmd⟩ sed -n '18,23p' <value.js>/docs/…/cand-o/index.ts  → "a genuine defect in the combinator graph
                                                            … covered by an outer try/catch"
```

A fifth claim — that `PRODUCTION_LABELS` names every label the entry module hands it — was the one
this seat expected to find broken, because a shield issue built on a missing key would publish
`expected: [undefined]` and fail G-8 at the exact moment the shield fired. It is not broken:
⟨cmd⟩ `node -e "…PRODUCTION_LABELS['<color>']…"` → `"<color>"`, `"<timing-function>"`,
`"<stylesheet>"` all present (three of `.b`'s 19 identity rows). Recorded because a verification
that only confirms is a verification nobody ran.

---

#### c.1 — BEFORE, measured read-only at this seat's own clock (never inherited)

The open banked the wave's baseline; this seat re-took its own two gates' BEFORE rather than cite
them, because a cure measured against a figure nobody re-read is the shape §11 guardrail 2 names.

```
⟨cmd⟩ node --input-type=module -e "const m=await import('./dist/subpaths/css.js'); …"   (value.js 4.0.0)
THREW rgb()   TypeError   THREW rgba()  TypeError   THREW hsl()   TypeError   THREW hsla()  TypeError
THREW lab()   TypeError   THREW lch()   TypeError   THREW oklab() TypeError   THREW oklch() TypeError
THREW hwb()   TypeError   THREW color() TypeError
empty-body throws: 10/10
non-string throws: 5/5  [null · undefined · 42 · {} · Symbol] → every one a raw TypeError   (O-15 PT-07)
```

**Identical, call for call, to `W3.md` §6 G-3's 2026-08-03 paste and to the open's B.2.** G-9's
BEFORE is O-15 PT-04/PT-03, cited by id under the epoch rule and **re-derived where it is derivable
here**: the one-way latch reproduces at this root's own bytes at the four coordinates above.

---

#### c.2 — The gate-command gap, measured before it was answered (`.b` E-3, third sighting)

```
⟨cmd⟩ cd <p2>/typescript && npx vitest run test/css-recovery/boundary/depth.test.ts \
                                            test/css-recovery/boundary/latch.test.ts
No test files found, exiting with code 1
filter: test/css-recovery/boundary/depth.test.ts, test/css-recovery/boundary/latch.test.ts
include: test/*.test.ts
```

**G-9's literal form collects ZERO files, for a configuration reason and not a subject reason** —
`typescript/vitest.config.ts` includes one level and vitest positionals FILTER rather than extend.
This is `.b`'s **E-3** exactly, met a third time (`.a`'s G-6, `.b`'s G-8, now `.c`'s G-9), which is
what makes it one orchestrator row rather than three private workarounds. One datum `.b` could not
have had, added here: **from `<p2>` itself the same literal command DOES collect both files** (no
root config → vitest's default include, and the positionals match as substrings), so the gap is a
property of the *working directory*, not of the command. Both readings are published because either
alone would mislead.

The lawful cure is the seat's own create row, never a library file no unit of this wave owns:
`test/css-recovery/boundary/vitest.config.ts` (55 L). Its include glob is the **whole** boundary
tree, so a suite this seat forgot to register is collected anyway — a project cannot be a hand-picked
pair. `pool: "forks"` + `isolate: true` are declared, not incidental (c.3, correction 2).

```
⟨cmd⟩ npx vitest run --config typescript/test/css-recovery/boundary/vitest.config.ts \
         test/css-recovery/boundary/depth.test.ts test/css-recovery/boundary/latch.test.ts
Test Files  1 failed | 1 passed (2)        Tests  2 failed | 20 passed (22)      ← G-9's literal pair, collected
```

---

#### c.3 — The four corrections this seat made to the draft, each with its reason

1. **`boundary/vitest.config.ts` — AUTHORED** (c.2). The draft had none and named `.b`'s project in
   all four headers; a seat that runs its gate through another seat's file has no answer when that
   file moves. All four headers re-pointed.
2. **Every shield-ledger assertion made a DELTA.** The draft asserted `SHIELD.caught` **absolutely**
   — `toBe(0)` in `boundary.test.ts`, `toHaveLength(1)` in `no-throw.test.ts`. `SHIELD.caught` is a
   module global and `no-throw.test.ts` fires the shield once on purpose (NC-3), so those two
   assertions are **true only because vitest isolates files**, i.e. they were assertions about run
   order wearing the clothes of assertions about bytes. Both now read a baseline at their own file's
   load and assert the **movement** (`0` and `+1`), which is true with isolation and without it.
3. **`latch.test.ts` L-4's pinned line number removed.** The draft asserted the sole memoizer site
   is `["bounds.mjs:238"]`. The claim that matters is *exactly one site, and it is the declared
   instrument*; a line number reddens the leg when a comment above it grows — failing for a reason
   that is not its own, which is the exact defect `.b`'s comment-aware scanner exists to avoid. Now:
   exactly one site, matching `/^bounds\.mjs:\d+$/`, with the full list printed on failure.
4. **`no-throw.test.ts` gained T-1b — the entry module's whole `throw` census.** G-3's falsifier says
   a masking fallback *"fails the gate **by inspection of the entry module**"*; the draft inspected
   only each shipped closure's own text (T-1). T-1b enumerates **every** `throw` site in `entry.mjs`
   with an 8-line window, comment-aware, and requires each to be a **declared construction-time
   HALT** — so a `throw` added anywhere else in the module fails by name even if no current entry
   reaches it. Measured: **1 site, 1 declared, 0 undeclared** (the `makePublicSurface` HALT for a
   lowering that does not carry a published entry's production). Its own negative control feeds the
   census the identical multi-line shape with an **undeclared** message and requires it to be caught.

`src/css/entry.mjs` and `src/css/bounds.mjs` were **not rewritten** — their byte counts are
identical to R.2's reading of the draft. A seat that rewrites verified bytes to prove it was here is
adding risk, not cure.

---

#### c.4 — The three cures, as they stand at the settled bytes

**(1) The throw class.** No `throw` is reachable from any public entry, asserted from both ends
(T-1 the shipped closure's own text, T-1b the module's whole census) and measured dynamically over
the corpus. cand-O's guard is **retained only as a proven non-load-bearing shield**, and the proof
is cand-O's own instrument — the RAW path, which carries no `try`/`catch` at all (`lowering-js/
index.mjs:7`, DM-4) — run over the whole corpus union. **The dissent stands recorded and is not
resolved here**: cand-F ships without a shield, `W3.md` §5 `.c` makes that position tenable *"if
`.c` lands the depth bound"*, the bound is landed, and **removal is therefore a live option for
X.P.W4 and not a decision of this seat** — the spec's own sentence, followed literally.

**(2) The JS boundary (PT-07).** `typeof source === "string"` is the **first statement of every
public entry, above the grammar**, because the raw algebra is not total for a non-string
(`js-alg.mjs:259` reaches `sg.src.slice(…)`). Ten kinds — `null`, `undefined`, number, object,
symbol, array, boolean, `NaN`, bigint, function — against the spec's five, because the other five
are what untyped JavaScript actually smuggles in. This is our invariant **above** parse-that and
explicitly **not an ask to them** (O-15's own *"what is NOT in this letter"*).

**(3) Depth (PT-04) and the latch (PT-03).** The one lazy back-edge already carries `Θ.depthBound`
in both lowerings (X.P.W2's graduated survivor); `bounds.mjs` makes the bound a **declared value, an
assertion that the mechanism carries it, and a witness generator** — never a pinned fixture, because
a pinned string is one whose author can re-pin it when the bound moves (§3, no silent re-pin).
`assertDepthBound` halts at construction if the lowering's Θ, the raw label in `L`, or the promoted
production disagree, so the declared bound and the enforced bound cannot drift. The latch is
**readable and measured**; `resetPackrat()` does **not** disarm — ESC-c1.

Also folded, as §5 `.c` names them: the `(p * 255) / 100` exactness discipline — asserted at **load**
over all 101 integer percents against the exact rational, **and** against the folded `2.55` constant
so the discipline is non-vacuous (⟨cmd⟩ `PERCENT_EXACTNESS` → `{checked:101, disagreements:0,
foldedDiffers:47, full:255}`) — and the non-string guard's placement above the grammar.

---

#### c.5 — AFTER: the gate readings at the settled bytes, double-run

```
⟨cmd⟩ node --input-type=module -e "const S = await (await import('./src/css/entry.mjs')).loadPublicSurfaces(); …"
rgb() ok=false css_syntax    rgba() ok=false css_syntax    hsl() ok=false css_syntax
hsla() ok=false css_syntax   lab() ok=false css_syntax     lch() ok=false css_syntax
oklab() ok=false css_syntax  oklch() ok=false css_syntax   hwb() ok=false css_syntax
color() ok=false css_syntax
empty-body throws: 0/10                                        ← BEFORE 10/10
non-string throws: 0/10   distinct shapes: 1                   ← BEFORE 5/5 raw TypeError
  every kind → ok=false · css_syntax · actual=null · expected=["<string source>"]
R1, THE NAMED ENEMY:  parseCssColor("oklch()") →
  {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,
    "expected":["<number>","<none-keyword> ('none')"],"actual":")"}]}
SHIELD.caught after all of the above: 0
```

```
⟨cmd⟩ node --input-type=module -e "…witnessAtDepth / measurePackratLatch…"     (BOTH lowerings)
js   depth   64  ok=false color_context_required  "<context-free-color> (a context colour has no value …)"
js   depth   65  ok=false css_syntax              "<nesting-depth> (at most 64 levels)"
js   depth 7761  ok=false css_syntax              "<nesting-depth> (at most 64 levels)"
js   depth 7762  ok=false css_syntax              "<nesting-depth> (at most 64 levels)"
wasm depth   64 / 65 / 7761 / 7762 — the same four readings, code for code and label for label
LATCH {"readable":true,"before":false,"armed":true,"afterReset":true,"symmetric":false}
```

**Read the depth rows together.** At the bound the rejection is the *context guard's*
(`color_context_required`), not the bound's — which is what makes the next row non-vacuous: if the
bound fired one level early, row 1 would carry the depth code. One past it, the rejection is the
**declared depth production**, and `"value" in result` is **false**, which is the MIS_ACCEPT half of
G-9's falsifier (a silent truncation returning `ok:true` on a partially consumed input would redden
G-7 as well). **PT-04's 7,761/7,762 cliff is now a regression fixture rather than a limit** — both
sides of it are the same typed rejection, in both lowerings, and the js leg carries the same reading
at depth **200,000**, two orders of magnitude past it.

```
⟨cmd⟩ npx vitest run --config typescript/test/css-recovery/boundary/vitest.config.ts
Test Files  1 failed | 3 passed (4)        Tests  2 failed | 116 passed (118)      (×2, identical)
  boundary.test.ts  77 ✓   ·  no-throw.test.ts  19 ✓   ·  depth.test.ts  15 ✓
  latch.test.ts      5 ✓ / 2 ✗   ← BORN-RED, cause in the assertion message, never test.skip
⟨cmd⟩ npx vitest run --config typescript/test/css-recovery/vitest.config.ts       (`.b`'s project, unharmed)
Test Files  2 failed | 4 passed (6)        Tests  3 failed | 139 passed (142)
  = `.b`'s 23 ✓ / 1 born-RED, UNCHANGED, + this seat's 116 ✓ / 2 born-RED
```

| gate | leg | BEFORE | AFTER |
|---|---|---|---|
| **G-3** | degenerate heads | **10/10 throw**, every one `TypeError` (re-measured here) | **0/10 throw**, all ten `ok:false` + `css_syntax` — **GREEN** |
| **G-3** | non-string (PT-07) | **5/5 raw `TypeError`**; `.parse()` returns `undefined` on failure | **0/10 throw**, one shape: `css_syntax` · `actual:null` · `expected ["<string source>"]`; **0 `undefined` returns** — **GREEN** |
| **G-3** | non-empty tuple (the falsifier's own cheat) | — | asserted as a **type predicate**, not a "didn't throw" check; its negative control feeds it `{ok:false, diagnostics:[]}` and requires rejection — **GREEN** |
| **G-3** | no reachable `throw` | — | T-1 **0 throw tokens** in all 6 shipped closures (3 entries × 2 lowerings); T-1b **1 site / 1 declared / 0 undeclared** in the whole module — **GREEN** |
| **G-3** | the shield is non-load-bearing | cand-O asserts it; nobody had measured it here | T-2 **160,710 public calls, 0 throws / 0 `undefined`**; T-3 **160,710 RAW unshielded calls, 0 throws**; `SHIELD.caught` delta **0** — **GREEN, measured not asserted** |
| **G-9** | depth at bound and bound+1 | `Parser.lazy` deepest OK **7,761**, thrown **`RangeError` at 7,762** | both lowerings: **`ok:false` at 64, 65, 7,761, 7,762 and 200,000; 0 thrown errors** — **GREEN** |
| **G-9** | the bound is carried, not declared | `buildGrammar`'s twenty-two was a comment until `.b`; PT-04 had **no declared depth at all** | Θ, the raw label in `L`, and the promoted production all read **64**, asserted at construction, with a negative control that a widened Θ **HALTS** — **GREEN** |
| **G-9** | latch: readable | `PACKRAT_ARMED` observable only through `packratEnter`'s return | **readable** — `before:false → armed:true` within one process — **GREEN** |
| **G-9** | latch: `resetPackrat()` DISARMS | one-way latch; `resetPackrat()` → 139.3 ns, i.e. clears the store, does not disarm | **`afterReset:true` · `symmetric:false` — RED. ESC-c1** |

**G-3 is GREEN. G-9 is GREEN on depth and RED on the latch.**

---

#### c.6 — ESC-c1 (§3a: a hard-gate failure that is not local-edit-recoverable)

**G-9's latch leg cannot close from inside this seat's bounds, for two independent reasons, both
measured.**

*Reason 1 — the cure is out of bounds.* `resetPackrat()` returns early while the latch is set
(`src/parse/packrat.ts:273`) and nothing anywhere assigns `PACKRAT_ARMED = false`. The cure is a
write under `typescript/src/parse/**`, which `W3.md` §4 admits in **no row** (it admits
`typescript/src/css/**`) and which X.P.W3.0's dated addendum **§A-3 declines by name**: *"`<p2>/
typescript/src/parse/**` IS NOT ADMITTED BY THIS ADDENDUM … adoption of an ancestor is a statement
about where the numbers were taken, not a licence to write new bytes there."* A write there is a
**§3a File-bound expansion, which halts rather than proceeds** — the identical disposition `.b` took
for G-4's two inherited fallback arms (b.5 E-2).

*Reason 2 — the naive cure is a soundness regression, so it is not a local edit even with a grant.*
The library argues its own asymmetry, `packrat.ts:147-152`: *"a memoized parser, once built, could
be invoked at any later parse (directly, or nested inside another parser's `.map`), so from the
moment any memoizer exists the epoch machinery must run for cross-input + re-entrancy soundness
(PT-B1 / PT-Q1)."* Setting the flag false in `resetPackrat` would disarm the epoch while live
memoizers still exist — PT-Q1's own regression. **The real cure is a symmetric arm-state** (a
live-memoizer count, or a disarm lawful only when none exists), which is an architecture question
for the library — exactly the class §3a routes away from a local edit.

*What was refused, and why each refusal matters.* A `resetPackrat` re-export in `bounds.mjs` that
re-imported the module to read `false` afterwards **would have made the leg green**: `tsImport` does
not dedupe, so a fresh instance starts unarmed (⟨cmd⟩ `a === b` → `false`,
`a.resetPackrat === b.resetPackrat` → `false`, measured). It would also have been a **fake restore
of a different latch** — the masking fallback G-3 refuses by name. Likewise refused: `test.skip`, an
allowlist, a narrowed assertion, and any edit to the library. **The leg is left RED with its
measurement.**

*What IS provable here, and is proved.* The candidate never arms the latch: exactly **one**
`memoize(`/`mergeMemos(` site under `src/css` and it is this seat's declared instrument
(comment-aware scan, full list printed); `entry.mjs` names no part of the arming surface; and after
parsing through **both** lowerings the instrument's arm-state still reads **false**. A second
measurement is published rather than hidden: because `js-alg.mjs:48` loads the library with its own
`tsImport`, **the lowerings' latch is not the instrument's latch**, and the parse path's arm-state is
reachable from no module in this seat's bounds. That is part of the finding, not a way around it.

**Routed to**: the orchestrator, for a one-row grant on `typescript/src/parse/packrat.ts` **or** a
ruling that the leg is X.P.W4's — it is the same shape as `.b`'s E-1/E-2 and `.a`'s F-a.6, and this
seat grants itself nothing.

---

#### c.7 — Findings (measured, not cured here)

| id | severity | finding | owner |
|---|---|---|---|
| **F-c1** | MAJOR | **ESC-c1** above, carried as a finding too so `.e`'s refutation pass has it by id: **G-9's latch leg is RED and its cure is out of every unit's bound.** `.e`'s third L-14 obligation — *"refute the claim that the shield is non-load-bearing"* — is a different claim and is **not** answered by this row; the shield evidence is T-1/T-1b/T-2/T-3/T-4 and is designed to be refutable at the bytes | orchestrator / owner |
| **F-c2** | MINOR | **`.b`'s E-3 has now been met by all three phase-1 seats** (`.a` G-6, `.b` G-8, `.c` G-9) and the reading is **working-directory-dependent**: from `<p2>/typescript` the literal form collects **0** files; from `<p2>` it collects them. A gate whose literal command passes or fails on the cwd is a gate whose command wants one row, not three configs | orchestrator |
| **F-c3** | MINOR | **172 rows of `.a`'s generated union carry `s` as an OBJECT `{id, src}`, not a string** — the whole `r1` band (⟨cmd⟩ `…rows.filter(r => typeof r.s !== 'string').length` → **172**; row 26,432 = `{"i":26432,"s":{"id":"r1-0","src":""},…}`). Feeding one straight to the raw path throws `TypeError: sg.src.slice is not a function`, which is how this seat found it. `test/css-totality/**` is `.a`'s create row, so the rows are **unwrapped in this seat's own corpus reader**, the count is published on every read, and the defect is returned rather than cured across a bound | `.a` / `.d` |
| **F-c4** | INFO | **The library compile does not cover this seat's bytes either** (`.b`'s F-b2, same shape). ⟨cmd⟩ `npx tsc --noEmit -p typescript/tsconfig.json` → **467** `error TS` (from `.b`'s 439); **28 are this seat's and all 28 are resolution-class** — TS2307 `node:fs`/`node:path`/`node:url` (11), TS2339 `import.meta.url` (4), TS7016 implicit-`any` on six `.mjs` imports (13). **Zero are type errors in this seat's own logic.** The suites run green under the root's own vitest, which resolves at `<p2>/node_modules` | `.a` / orchestrator |
| **F-c5** | INFO | **`eslint` is not installed in this root** (⟨cmd⟩ `ls node_modules/.bin \| grep -ci eslint` → **0**), so §7's `npx eslint .` was not run — the posture `.0` and `.b` both recorded. The executable cadence stood in for it: the boundary project, `.b`'s project and every AFTER probe, each run twice | orchestrator |
| **F-c6** | INFO | **The candidate publishes three of the nine public entries and NAMES the other six** (`UNREALIZED_ENTRIES`) rather than stubbing them — a stub rejection would emit codes no grammar raises and is the masking fallback `.b` refused at b.5 E-1. It is the same wall as `.a`'s **F-a.6** and `.b`'s **E-1**, seen from the entry module: **G-2's anchor probe targets all nine and cannot be discharged by a slice**, so `.d`'s G-2 will read RED for this reason and not for a throw. Stated here so `.d` does not re-diagnose it | `.d` / orchestrator |

---

#### c.8 — The commit (one family, not split — §5 `.c`'s own reason)

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | `<p2>` | **`f14f59f`** | `fix(x-p-w3/boundary): kill the R1 throw class — non-string guard, depth bound, symmetric latch` — `src/css/{entry,bounds}.mjs` + `test/css-recovery/boundary/**`, **8 files, 1,442 insertions, 0 deletions**. The three cures are ONE commit because §5 `.c` makes them one unit: *"they share the entry module and splitting them would put two writers on one file."* |
| 2 | value.js | **(this record's append)** | `docs(x-p-w3/.c): unit receipt — G-3 GREEN, G-9 depth GREEN / latch RED (ESC-c1)` |

**The subject line is `W3.md` §9's own planned commit, kept verbatim so the commit plan is
traceable; the body states in its first paragraph that the latch leg is RED and returned as ESC-c1.**
A subject that promised what the body denies would be the dishonesty this wave names — so the body
carries the measurement, at the top, where a reader of the commit meets it first.

The commit carries **its own pathspec on the commit itself** (`typescript/src/css/entry.mjs
typescript/src/css/bounds.mjs typescript/test/css-recovery/boundary`). ⟨cmd⟩
`git -C <p2> status --porcelain` before and after → `?? .worktrees/` and nothing else — §4b's
prescribed container, never staged. `git diff --check` clean. **No `-A`, no `-u`, no `commit -a`, no
stash, no reset, no rebase, no cherry-pick, no force-push, no push.** `scripts/dev/dev.sh` appears in
**0** commits of this unit and was never opened. **Zero bytes written under**
`/Users/mkbabb/Programming/value.js/src/**` (⟨cmd⟩ `git status --porcelain -- src api demo test e2e
| wc -l` → **0**, double-run, before and after), `/Users/mkbabb/Programming/parse-that/**`,
`~/Documents/Codex/**`, `~/.codex/**`, `../glass-ui/**`, `../keyframes.js/**`,
`../fourier-analysis/**`, and **`<p2>/typescript/src/parse/**`** — the file whose one line would have
turned the latch leg green.

**Bound discipline, stated as a measurement.** This unit's whole write set is
`src/css/entry.mjs` · `src/css/bounds.mjs` · `test/css-recovery/boundary/**` in `<p2>`, and this
record + the ledger row in value.js. `.b`'s five names (`lower`, `diagnostics`, `codes`) and `.a`'s
(`scripts/css-universe.mjs`, `test/css-totality/**`) were **read and imported, never opened for
write** — ⟨cmd⟩ `git -C <p2> show --stat f14f59f` names 8 files and none is theirs.

---

#### c.9 — E13 and the standing invariants, at this unit's own clock

Four paths swept read-only, classified by each row's **status cell** and never by a bare
`grep -i unread` (X.P.W0 CHECK 1 **D-1**). ⟨cmd⟩ `grep -c '^| I-' INBOX.md` → **36**, unchanged
since the open and since the resume. The rows whose status cell still reads `UNREAD` are **O-20**
(ours, outbound), **I-30** (the standing glass obligation tail), **I-31** (atlas Q-lane, *"Do not
edit value.js from this lane"*) and **I-32 · I-33 · I-34**, whose own Routing cells read *"**No X·P
wave, no X·P act, opens on this row**"*, *"Glass is **READ-ONLY always**"* and *"**Not X·P's, not a
value.js act today**"*. Newest by mtime per path re-confirmed (BK still the newest glass tranche
dir): all four newest are **ours, outbound, already rowed**. **0 unrowed value-addressed · 0 new
`I-n` · 0 UNREAD in X.P.W3.c's scope.** This seat **minted no mail**, wrote **zero** bytes in any
producer tree, and read `../glass-ui/**` not at all.

**Format and lint cadence (§7).** `<p2>`: the boundary project, `.b`'s project and every AFTER probe
are the executable cadence and each was run **twice**, identical; `git diff --check` clean;
`npx tsc --noEmit` recorded at F-c4; `eslint` absent, F-c5. **No proof-farm script was authored for
any gate** (L-19, §7) — every figure above is a program's own output, and the suite's six negative
controls are part of that program. Prettier was **checked and deliberately not applied to this
record**: `npx prettier --check` already warns on the file **before** this append, so `--write` would
rewrite three other seats' receipts inside a file four seats append to concurrently — the cadence
runs over the bytes a unit authors, and this unit's value.js bytes are this block.

**Gate 27**: ⟨cmd⟩ `git --no-optional-locks status --porcelain -- src api demo test e2e | wc -l` →
**0**, double-run, at this seat's open and at its close. `scripts/dev/dev.sh` reads ` M`, unstaged
and untouched; `docs/tranches/V/reformation/CARRY-LEDGER.md` and the `docs/tranches/X/evidence/w1/**`
untracked files are **sibling tracks' bytes**, read and left exactly as found (the tranche-wide
reading `.b`'s addendum-beside taught).

**Addendum-beside to X.P.W3.c, same sitting, never a rewrite of the block above (E-3).** The gate-27
reading in c.9 (⟨cmd⟩ `git --no-optional-locks status --porcelain -- src api demo test e2e | wc -l`
→ **0**, double-run) was true at this seat's open **and** immediately before its two value.js
commits; re-measured once more after them it reads **2**:

```
⟨cmd⟩ git --no-optional-locks status --porcelain -- src api demo test e2e
?? e2e/smoke/a11y-control-targets.spec.ts
?? e2e/smoke/mobile/a11y-control-targets.spec.ts
```

Both are a **sibling track's** untracked bytes — the X·V W1.a seat whose whole brief is the
Playwright/e2e verification surface, the same seat `.b`'s own addendum-beside named — and **neither
of this unit's three commits touches any path under `src/`, `api/`, `demo/`, `test/` or `e2e/`**:
⟨cmd⟩ `git show --stat f14f59f` → 8 files, all under `<p2>`; `git show --stat 31f65d56` /
`8a21ea8c` → one `docs/tranches/X/execution/**` file each. The correction is recorded rather than
left to be discovered, and it restates the lesson `.b` drew: **in a working tree four tracks share,
gate 27 is a tranche-wide reading and not a per-seat one.** Both value.js commits verified on the
right branch — ⟨cmd⟩ `git branch --contains 31f65d56` / `8a21ea8c` → `* tranche-u` (the F-a.7 /
F-b5 scratch-branch hazard, re-checked and closed at this seat too).

---

### X.P.W3.d

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18, this seat's own clock · **group 4, run SERIAL**
(§5 phase 2: *"needs `.a`–`.c` landed"* — verified at the bytes before a line was written:
⟨cmd⟩ `git -C <p2> log --oneline -5` → `f14f59f` (`.c`) · `bd10e5c` (`.a`) · `f666b6f` · `1cfa29b` ·
`39503f8` (`.b`), and ⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` alone, so `.c`'s
draft residue F-r.1 disclosed is fully landed and nothing is in flight). Spec sections executed
exactly: `W3.md` §5 `.d` (L299–317) · §3 items 7–10 (L107–117) · §6 **G-2** (L372–396) · **G-5**
(L435–449) · **G-7** (L468–485) · **G-10** (L520–548) · §2c (L75–76, L80) · §2b **OP-5** (L64) ·
`COHESION.md` §0j.E **OC-1** · §0n.4 (**E-6**, both lowerings, two runs). `W3.md` read WHOLE (673 L);
`COHESION.md` read to the file end (§0o and its erratum are the last headings); this record read
whole — the open, the baseline, the unit plan, `.0`/`.a`/`.b`/`.c`'s receipts and the RESUME
block — before a byte was written.

**Gates turned: G-5 GREEN · G-10 WELL-FORMED (no verdict, by law) · G-7 RED at a measured distance ·
G-2 RED, reproduced twice, for a structural reason in the probe's own bytes.** Nothing was narrowed,
skipped, allow-listed, re-shaped, re-pinned or reconciled to move a reading. Every figure below is
read from the **settled (committed) bytes** and **double-run**; the two runs were identical in every
case, and where a file is generated the two generations were **byte-identical**.

`<p2>` = `/Users/mkbabb/Programming/parse-that-css-totality-p2`. Pin: value.js
`6aca86020b6b2605e7d0f04fccb6601746e387f7` — `.a`'s, adopted unchanged, because two seats reading two
universes would be two waves.

---

#### d.0 — Method note, stated before the numbers

**The one judgement this seat makes, declared BEFORE the run and not after it.** Two of the P-1
taxonomy's three RED classes are defined against the CSS **specification** as well as against the
incumbent — *"(B) MIS_ACCEPT — C14 accepts an input the live parser **and spec** reject"*, *"(C)
FALSE_REJECT_IN_SHAPE — C14 rejects an input **unambiguously valid** within its own declared shape"*
— and this wave ships no executable specification oracle. For the sixteen inputs `parser-band.md`
adjudicated, the adjudication **is** the spec reading and is used. For every other input the
discriminator is missing, and the missing discriminator is resolved in **one** direction:

> **Where the spec reading is missing, the cell is counted AGAINST the candidate.**

The opposite convention — reading every unadjudicated disagreement as `LIVE_STRICTER`, which the
taxonomy also licenses in principle — would drive the defect count toward zero on an argument nobody
measured, and that is precisely the move W1.md §6 G-2's falsifier names (*"widen the taxonomy … and
the count goes to zero for the wrong reason"*). Every such cell carries `specUndecided: true` so `.e`
can see exactly how much of the count rests on a reading this wave does not own, and can overturn it
with a spec citation rather than with a preference. **3,982 of the 5,890 are so flagged and printed.**

**`COVERAGE_NARROWING` is the one declared NON-defect this seat applies**, and only where the
candidate's own grammar registry — `algebra/tables.mjs`'s `R_disp`, authored at X.P.W2 and committed
before this seat opened — carries no such function head. A shape written after the measurement is a
description of the result; this one has a commit date. It is **read**, never listed:
⟨cmd⟩ → colour heads `[hsl, hsla, oklch, rgb, rgba, var]` · timing heads `[cubic-bezier, linear,
steps]`. Anything that is not a function call — a hex literal, a bare identifier, a stylesheet, the
empty string — is **inside** the shape by default, deliberately, so that declining `#ff0` could never
become a coverage fact.

**The taxonomy is imported, never restated.** `harness/equivalence/taxonomy.ts` is carried verbatim
from `apotheosis/parser-proof/equivalence.md` §1 and re-reads its authority at run time;
`runFullSurface()` asserts it **UNMOVED byte-for-byte before it classifies a single cell**
(sha256 `554c2993…`, the banked value).

**Extension.** As `.b` and `.c` recorded: the spec's `.ts` names against the tree's `.mjs`. §4's
first row admits the whole glob, so no bounds question arises.

---

#### d.1 — BEFORE, measured read-only at this seat's own clock (never inherited)

| gate | subject | BEFORE, at this seat's clock |
|---|---|---|
| **G-2** | the unmodified anchor probe | ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` → **RED, exit 1, 324 throws / 1548 calls, 1 failure mode, 4 of 9 entry points RED** — the 08-03 baseline and the open's §B.1 reading, to the call |
| **G-5** | the comparator | ⟨cmd⟩ `test -e <p2>/typescript/scripts/css-dual-target-identity.mjs` → **ABSENT**. The open's reading stands: RED *"for want of the comparator, not for want of the artifact"* |
| **G-7** | the graduated harness + the ledger | ⟨cmd⟩ `test -d <p2>/typescript/test/css-equivalence` → **ABSENT**; ⟨cmd⟩ `test -e docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` → **ABSENT**; ⟨cmd⟩ `node typescript/scripts/css-universe.mjs --cross-check-ledger …` → **RED — the ledger is ABSENT**, with all sixteen printed `UNROWED` |
| **G-10** | the bench table | ⟨cmd⟩ `test -e <p2>/typescript/scripts/css-bench-three-leg.mjs` → **ABSENT**; no candidate table exists |

**4 of 4 RED before cure. 0 GREEN-BEFORE-CURE.**

---

#### d.2 — The oracle: the vendored sha-pinned tarball did not exist, and was not invented

`W3.md` §5 `.d` names the oracle in words that admit no substitute: *"the **vendored, sha-pinned
published 4.0.0 tarball** — never `dist/` in the working tree (cand-O's dist-drift finding …)."*
**Measured at the open: no tarball existed anywhere in either tree.** ⟨cmd⟩ `find / -maxdepth 8 -name
'*parse-that*.tgz' -o -name 'value-js-4.0.0*'` returned only `cand-o/vendor/value-js-4.0.0/`, an
**unpacked directory** — a copy somebody made, which is a different thing from the bytes npm ships,
and the difference is exactly what the dist-drift finding is about.

**Recovered, not fabricated.** The published tarball is in npm's own content-addressed cache with the
**registry's** integrity beside it:

```
⟨cmd⟩ (cacache index) make-fetch-happen:request-cache:https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz
      sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==   37290 B
⟨cmd⟩ shasum -a 256 typescript/test/css-equivalence/vendor/value.js-4.0.0.tgz
      7f80658ca4e16e99ccbb41ad6c9d8c08b2e5f86a7c951d2a833c97f89fb303ae
```

Three independent handles are asserted **in-test before any comparison runs** — byte count, this
seat's sha256, and the registry's own sha512 — and `loadOracle()` hashes **before** it invokes `tar`,
so no path through the suite reaches a comparison with an unverified oracle: not by reordering tests,
not by `.only`, not by a later editor moving a block. The archive is expanded into an `mkdtemp`
directory and removed; **no byte of any repository is written by the oracle module**.

**And the two halves of this wave are proved to have measured ONE 4.0.0**, rather than assumed to:

```
⟨cmd⟩ crossCheckUnpacked()  tarball package/dist/subpaths/css.js    8b5381305ea26236…  == cand-o/vendor  AGREE
                            tarball package/dist/subpaths/css.d.ts  c81d095213d112c6…  == cand-o/vendor  AGREE
```

`.a`'s pin reads the unpacked tree as its SHAPE oracle; this seat reads the tarball as its
DIFFERENTIAL oracle; they are byte-identical. That reading is an assertion in the suite, not a note.

---

#### d.3 — G-7: the graduated differential, and the distance it measures

**The graduation actually happened.** From the pilot's `{oklch(), cubic-bezier(), qualified
stylesheets}` / 403 strings to **26,551 distinct sources × 3 realized entries × 2 lowerings**, plus
the 52-row surface census. The suite asserts `corpus.run === corpus.distinct` so a future edit cannot
quietly make it a pilot again.

```
⟨cmd⟩ node typescript/test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602
oracle     value.js-4.0.0.tgz — 37290 B · sha256 7f80658c…03ae
           cross-check vs the unpacked cand-o vendor tree: AGREE (css.js + css.d.ts byte-identical)
taxonomy   UNMOVED · sha256 554c2993cebd3ed3 · classes A DIVERGENT_VALUE / B MIS_ACCEPT / C FALSE_REJECT_IN_SHAPE
corpus     26604 rows → 26551 distinct · run 26551 · F-c3 unwrapped 172 · replay pin AGREES
universe   19 runtime + 33 types = 52

  parseCssColor         COMPARED  26551 cells × 2 lowerings · mirror-defects 4027 · lowerings AGREE
                          DIVERGENT_VALUE  1566 · MIS_ACCEPT 1200 · FALSE_REJECT_IN_SHAPE 1261
                          COVERAGE_NARROWING 2320 · FIXTURE_R1 4585 · DECLARED_DIVERGENCE 15
  parseTimingFunction   COMPARED  26551 cells × 2 lowerings · mirror-defects  170 · lowerings AGREE
                          MIS_ACCEPT 23 · FALSE_REJECT_IN_SHAPE 147
  parseStylesheet       COMPARED  26551 cells × 2 lowerings · mirror-defects 1693 · lowerings AGREE
                          DIVERGENT_VALUE 342 · MIS_ACCEPT 236 · FALSE_REJECT_IN_SHAPE 1115
  + 5 type rows COMPARED (re-exported from the pinned declaration) · 44 rows NO-PEER

rows       52 · COMPARED 8 · NO-PEER 44
ledger     29 rows — ADJUDICATED 16 · DISSENT 4 · FIXTURE 5 · LABEL 1 · NARROWING 3
           empty consumer-direction fields: 0 · GATE-VERDICT anchors present: 5/5
MIRROR-DEFECTS  5890   (of which spec-undecided 3982)

RED — the equivalence floor is NOT held at full surface.
```

**Exit 1. Double-run: the evidence JSON is byte-identical on two consecutive generations**
(sha256 `d03b458c0f095c7b201c17ded478fcfcfdf7c53b54f48668450b6c4166e41595`, both times).

**The suite, twice, identical:**

```
⟨cmd⟩ npx vitest run --config typescript/test/css-equivalence/vitest.config.ts
 Test Files  1 failed (1)      Tests  1 failed | 23 passed (24)        (×2, identical)
   × G-7 — ZERO mirror-defects across all 52 exports    ← BORN-RED, cause in the assertion message
```

**The one failing test is the gate itself and it is born-RED by design.** Its message carries the
whole reading — the per-export A/B/C breakdown, the spec-undecided count, the declared convention,
and the named wall that owns the cure. There is no `test.skip`, no narrowed corpus, no allowlist and
no re-pinned expectation anywhere in the suite; the other 23 assertions are the gate's preconditions
and every one of them is GREEN.

**The `.a`/`.d` family is CLOSED by measurement** (§P.1: *"every conflict `.a` resolves … MUST appear
as a `.d` row"*):

```
⟨cmd⟩ node typescript/scripts/css-universe.mjs --cross-check-ledger docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md
rows     16 adjudicated conflicts, 0 not carried
GREEN — every adjudicated conflict is rowed.
```

and the harness's own reading of the same family is the complement: **`ADJUDICATION_UNHONOURED` = 0**
on every row and in both lowerings, i.e. `.a`'s resolution and this seat's independent measurement of
the same twenty-two inputs agree.

##### d.3.1 — What the 5,890 actually is: a sub-census, measured, that reclassifies NOTHING

G-7's reading stands at **5,890**. This sub-census does not move it by one cell; it answers the
question `.e` and X.P.W4 will have to ask anyway — *are these 5,890 independent defects?* — with a
mechanical predicate declared before it was run:

> a `DIVERGENT_VALUE` cell is **PB-03/PB-04 CLASS GENERALIZED** iff, for **every** channel `i`,
> `candidate[i] === clamp_i(incumbent[i])` **or** `candidate[i] === clamp_i(incumbent[i] / 100)`,
> a non-numeric (`none`) channel is identical on both sides, and the alpha agrees.

The two arms are exactly the two adjudications: **PB-04** (out-of-range channels clamp) and **PB-03**
(a bare number and a percentage are the same value, so a bare number in a percentage slot is `/100`).

```
⟨cmd⟩ node (scratchpad) subcensus3.mjs
parseCssColor DIVERGENT_VALUE           1566
  PB-03/PB-04 CLASS GENERALIZED        1566  (100.00%)
  residue, neither arm                    0
```

**Every one of `parseCssColor`'s 1,566 DIVERGENT_VALUE cells is one of the two adjudicated behaviours
meeting an input no adjudication row names.** (A first pass with a strict `Object.is` alpha
comparison read 1,494 / 95.40%; the 72-cell residue was **entirely** `-0` vs `0` alpha — a signed-zero
artifact of the PREDICATE, not of either engine — and relaxing that one comparison closes it to 100%.
Both readings are recorded so the correction is visible rather than silent.) The script was run from
the scratchpad and is **not committed**: it is a reading, not a gate, and authoring a third script
under `scripts/` would be a §3a file-bound expansion.

**This is not an argument that G-7 should be green.** The adjudications were rowed per INPUT, and
`--cross-check-ledger` checks them per input; generalizing them to a class is a decision with a real
consumer direction and it belongs to `.e` and the owner, not to the seat that measured it. It is
recorded here so nobody re-derives it, and so that the 5,890 is read as *structure* rather than as
five thousand separate diagnoses.

---

#### d.4 — G-5: dual-target recovery identity — GREEN

The wave's one **MEASURE-AT-OPEN** gate. On 2026-08-03 it had no subject at all (*"zero project
artifacts"*); the open re-measured that the subject now EXISTS and recorded the gate RED *"for want
of the comparator"*. This seat wrote the comparator.

```
⟨cmd⟩ node typescript/scripts/css-dual-target-identity.mjs --js src/css/build/ac1.js \
        --wasm src/css/build/ac1.wasm --corpus test/css-totality/corpus.json
js artifact    src/css/build/ac1.js   — sha256 5f300b7ea43e1d38
wasm artifact  src/css/build/ac1.wasm — sha256 7ce0382b22716585
canonical      keys [ok, code, start, end, expected, actual] in FIXED order · NO array sorted · NO number rounded

  parseCssColor         26551 cells · six-tuple differ 0 · full-diagnostics differ 0 · value differ 0 · threw 0
  parseTimingFunction   26551 cells · six-tuple differ 0 · full-diagnostics differ 0 · value differ 0 · threw 0
  parseStylesheet       26551 cells · six-tuple differ 0 · full-diagnostics differ 0 · value differ 0 · threw 0
  boundary (7 declared non-string values × 3 entries = 21 cells) — identical across both targets: ALL

cells                       79674
six-tuple differing cells   0   (differing bytes 0)
GREEN — the two targets produce byte-identical {ok, code, start, end, expected, actual} for every corpus input.
```

**Exit 0. Double-run: the output is identical and the evidence JSON byte-identical**
(sha256 `b68bab94c01cd2eae24a3b74b0b8096a1bbd30b12d8d75e04233b26dd5686216`).

**The falsifier is the design, not a comment on it.** *"A difference in `expected` ORDERING counts,
because canonicalization sorts nothing"* — `canonical()` fixes the six-tuple's **key** order (so the
two targets cannot differ merely by property insertion order, a serialization artifact) and touches
array order not at all. The one normalization is `undefined → null`, symmetric across both targets,
so that "absent" and "present as undefined" cannot read as different bytes for the same meaning.

**Two readings are taken beyond the gate's letter, and both are named as additions rather than
folded into the verdict.** (i) The **full** diagnostics list of every rejection, not just `[0]` — a
target that agreed on the first issue and diverged at the second would be a divergence: **0**.
(ii) The **value** of every accepted parse: **0** differing cells. A gate that proved the rejections
identical while the acceptances disagreed would be true and useless.

**The §3a tripwire this gate carries did not fire.** *"G-5 failing in a direction rooted in the Wasm
numeric or memory model is an architecture question for X.P.W1/W2, not a patch here."* G-5 did not
fail; nothing was routed and nothing was patched.

---

#### d.5 — G-2: the anchor probe, unmodified, twice — RED, and RED structurally

```
⟨cmd⟩ node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs        (run 1, and again as run 2)
RED  parseCssColor   102/172 · RED parseCssScalar 102/172 · RED parseCssValue 60/172 · RED parseCssValues 60/172
ok   parseKeyframeSelector · parseStylesheet · parseTimingFunction · parseAnimationTimeline · parseAnimationRange  0/172
TOTAL 324 throws / 1548 calls · DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')
RED — 324 totality violations.                                                      exit 1
⟨cmd⟩ diff (run 1 signal lines) (run 2 signal lines)   → no output; the two runs are IDENTICAL
⟨cmd⟩ git status --porcelain -- docs/tranches/V/megatranche/audit/probes/   → empty, before and after both runs
```

**Not one byte of the probe was changed** — *"Modifying the probe voids the gate."*

**Two independent structural reasons, both measured; either alone keeps the gate RED at this wave.**

1. **The probe's subject is the INCUMBENT, which this wave writes zero bytes of.** Read at the
   probe's own bytes: `const REPO = new URL("../../../../../..", import.meta.url)` resolves to
   `/Users/mkbabb/Programming/value.js`; it then `npm pack`s **there**, installs into an `mkdtemp`
   dir, and imports `node_modules/@mkbabb/value.js/dist/subpaths/css.js`. The candidate lives in the
   fresh root and the probe cannot see it without being modified. `W3.md` §3/§4 forbid this wave from
   writing under value.js `src/**` — *"A totality wave that edits the incumbent to make its own
   differential pass has inverted the experiment"* — and §10 puts adoption at X.P.W4's seam.
2. **The candidate realizes 3 of the probe's 9 entry points.** G-2's own falsifier: *"a candidate
   that cures `parseCssColor` alone stays red — which is the point; this gate cannot be discharged by
   a slice."* `.c` stated this in advance as **F-c6** so this seat would not re-diagnose it.

**A SHADOW reading is published beside the gate and labelled NOT THE GATE.** The probe's own corpus —
the `r1` band of `.a`'s union, 172 rows, whose provenance line reads *"derived from
`audit/probes/r1-published-totality.mjs:38-43`"* — through the candidate's public surface:

```
ok  parseCssColor  0/172 · ok parseStylesheet 0/172 · ok parseTimingFunction 0/172
SKIP the six named in UNREALIZED_ENTRIES
TOTAL 0 throws / 516 calls over 3 realized entries (6 of 9 NOT REALIZED)
wasm lowering, same corpus, same three entries: 0 throws/undefined over 516 calls
```

On the corpus that produces 324 incumbent throws, the candidate throws **zero** and returns
`undefined` **zero** times, in **both** lowerings. On the six it does not publish there is nothing to
read, and that absence is the gate's distance — rowed as **CN-1**.

---

#### d.6 — G-10: the three-leg table — WELL-FORMED, and carrying no verdict at all

**The bar was not set, not inferred, not reconciled.** §0j.E OC-1 ruled the table
**RECORDED-NOT-GATING**; §6 G-10 says *"inventing a bar is a defect"* and *"this gate reports and
cannot fail on a bar"*. The generator therefore prints the literal
**`BAR: OWNER-GATED-PENDING-RATIFICATION`** and `VERDICT: none`, and its exit code reports
**well-formedness only** — G-10's own four falsifier conditions, checked by the program **on its own
output**:

| falsifier condition | how it is checked | reading |
|---|---|---|
| a ratio published outside the three legs | every table row's `leg` against the declared three | **0** |
| a budget citing the UNCITABLE denominator or its derivatives | the printed text scanned **literally** for all four numerals | **0 found** |
| a row omitting its arm-state | every row, both the short label and the full statement | **0** |
| a pass/fail verdict the owner has not ratified | `verdict: null`, and the word printed as `none` | **none asserted** |

**The denominator is a law with one value, not an option with a default**: `--denominator` anything
but `1636680` is **REFUSED** with a non-zero exit (M-22 ¶4; §3's PRUNE prohibition on denominator
rewrite).

**Two runs, both lowerings** (§0n.4), both pasted in `evidence/W3/bench-three-leg.md`, both exiting
0 on well-formedness:

```
  leg              arm                run 1 ns/op   ratio      run 2 ns/op   ratio    arm-state
  shared-accepted  published 4.0.0         2274.8       1           2264.6       1    N/A — published bundle carries no packrat [a]
  shared-accepted  candidate js            4960.1   0.459           4912.2   0.461    UNARMED — before & after [b]
  shared-accepted  candidate wasm          3071.7   0.741           3074.7   0.737    UNARMED — before & after [b]
  reject           published 4.0.0         1032.3       1           1012.4       1    N/A [a]
  reject           candidate js              3682   0.280             3620   0.280    UNARMED [b]
  reject           candidate wasm          2201.5   0.469             2150   0.471    UNARMED [b]
  R1-class         published 4.0.0        81286.9       1          78019.5       1    N/A [a]
  R1-class         candidate js            3026.5  26.859           3150.2  24.767    UNARMED [b]
  R1-class         candidate wasm          1841.5  44.142           1866.8  41.794    UNARMED [b]
```

Method, declared before the numbers: three legs partitioned by the **published** engine's own
behaviour before any timing (R1-class timed **with the caller's catch**, the only way a caller
survives it); **interleaved** — within each round every arm runs once and the arm order **rotates by
round**, so drift lands on every arm; **median** of the 30 kept rounds of 40; a **printed sink**
(580,440-class fold) so no arm's work can be eliminated as dead; cell 192 inputs; node v26.0.0,
darwin/arm64.

**The arm-state is on every row, in two forms** — the short label inside the column so it cannot be
truncated, the full statement printed beneath. `[a]` is a **measurement**, not an omission: the
published 4.0.0 bundle carries **zero** occurrences of `PACKRAT_ARMED` / `packratEnter` /
`resetPackrat` / `memoize` across its **whole** dist, so it has no arm-state to read. `[b]` carries
`.c`'s own disclosure **unaltered**: `tsImport` does not dedupe, so the instrument reads the latch in
its own library instance and the lowerings' parse path holds another — the reading is *"this process
never armed a latch"*, not *"the parse path's latch was inspected"*.

**Nothing was reconciled.** The 07-20 *"LIVE regex measured FASTEST ~1.8×"* reading is printed as row
**C-1** with all three prior readings and this table as a fourth, and ruled on by none of them. And
the inherited `parser-band.md` cross-bench numbers are printed beside this table's own, **including
where they disagree**: the R1-class baseline reproduces almost exactly (inherited 82,559 / 78,034 ns;
measured here 81,286.9 / 78,019.5 on a different machine), while the accept and reject legs do **not**
reproduce parser-band's parity reading for the cand-O drop-in — a different candidate (AC-1
TAGLESS-TWIN), machine, node and cell. **Nothing is concluded from that here**, and in particular it
is not read as a verdict on admission: §0j.E OC-1 decided admission on CORRECTNESS and this seat has
no standing to reopen it.

---

#### d.7 — The divergence ledger: 29 rows, five families, both halves measured

`docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` — **56,079 B · 631 lines · sha256
`957f54f4c994e97ce0cc525990348a074fc55be29e85b2034fd8795dae084eba`**, generated by
`test/css-equivalence/emit-divergence-ledger.mjs` and **byte-identical on two consecutive
generations**.

| § | family | rows | authority |
|---|---|---|---|
| §1 | ADJUDICATED | **16** | `parser-band.md` via `.a`'s `lib/adjudications.mjs` — **imported, not re-typed**, so the `.a`/`.d` family cannot drift apart |
| §2 | PRESERVED DISSENT | **4** | token juxtaposition · non-finite numerals · try/catch posture · bench epistemics, each anchored by text in `parser-band.md` |
| §3 | REGRESSION FIXTURE | **5** | `GATE-VERDICT.md` F-2's R1–R5; each anchor **re-read in the authority at generation** (5/5 present) |
| §4 | LABEL SURFACE | **1** | `.b`'s **F-b4**, routed to this seat inside the wave |
| §5 | DECLARED COVERAGE NARROWING | **3** | generated from the candidate's own `UNREALIZED_ENTRIES` × the pinned barrel |
| | **total** | **29** | **empty consumer-direction fields: 0** |

**The two result columns are MEASURED.** Every input is run, at generation, through the vendored
tarball and through **both** candidate lowerings; a ledger whose "incumbent" column was written from
memory would be the self-authored answer key §3 prohibits, one level up.

**Three of the five fixtures are NOT met by this wave and say so in their own rows.** R2 (ten
over-rejected qualified rules) and R4 (the selector range check) are not reached — their productions
are unrealized; R5 (comment trivia in declaration names) has **no corpus cell at all**, which is a
measurement gap and is disclosed as such rather than reported as agreement (**F-d6**). A fixture
recorded as met when it was not is the dishonesty §11 guardrail 2 names.

**NO NINTH `ParseIssue` CODE IS PROPOSED ANYWHERE IN THE FILE.** ADJ-3's `parser-band` spelling
`color_non_finite` is cand-O's vocabulary and is not one of the frozen eight; it is carried at its
**meaning** and the naming difference is ADJ-3's own field — `.a`'s disposition, adopted unchanged.

**§6 Adjudication is left deliberately EMPTY for `.e`** (§4a gives it the sole write there; §5 `.e`
gives the reason — *"an author cannot adjudicate his own union"*). Three rows are **named** in it as
the ones whose spec reading is most load-bearing and least settled, so `.e`'s L-14 refutation
obligation is not left to convenience: **S-1** (token juxtaposition — the widening the owner may
overrule), **ADJ-3 / S-2** (non-finite numerals — the GROUND-C contract question `W3.md` §10 does not
open), **PB-03** (the two `hsl` spellings — the largest value change in the file, and the row that
claims the **incumbent** is the defective reading).

---

#### d.8 — Gate readings, BEFORE → AFTER, at the settled bytes, double-run

| gate | leg | BEFORE | AFTER |
|---|---|---|---|
| **G-2** | the probe, unmodified, exit 0 | **324 throws / 1548 calls · 1 mode · 4 of 9 RED**, exit 1 | **UNCHANGED, reproduced twice, exit 1 — RED.** Two structural causes measured at the probe's own bytes (d.5); the candidate's own shadow reading over the same 172 inputs is **0 throws / 516 calls**, both lowerings |
| **G-5** | six-tuple byte identity | comparator **ABSENT** | **79,674 cells · 0 differing bytes · 0 throws — GREEN**, exit 0, double-run byte-identical |
| **G-5** | full diagnostics (beside the letter) | — | **0 differing cells — GREEN** |
| **G-5** | accepted `value` (beside the letter) | — | **0 differing cells — GREEN** |
| **G-5** | the 7 declared non-string boundary values | — | **21 of 21 identical across both targets — GREEN** |
| **G-7** | the oracle pin | no vendored tarball existed | **sha256 + bytes + registry sha512 asserted in-test before any comparison; agrees byte-for-byte with `.a`'s unpacked tree — GREEN** |
| **G-7** | the taxonomy unmoved | — | **UNMOVED, byte-for-byte, before a cell is classified — GREEN** |
| **G-7** | ledger completeness | ledger **ABSENT**, 16 `UNROWED` | **29 rows · 0 empty directions · `--cross-check-ledger` GREEN, 0 not carried** |
| **G-7** | totality of the candidate over the graduated corpus | — | **0 `CANDIDATE_THREW` · 0 `CANDIDATE_SHAPE`** over 159,306 candidate calls — GREEN |
| **G-7** | the two lowerings agree, cell for cell | — | **GREEN** on every compared row |
| **G-7** | adjudications honoured | — | **0 `ADJUDICATION_UNHONOURED`**, both lowerings — GREEN |
| **G-7** | **ZERO mirror-defects, full surface** | never run against the 52; GREEN at 403-string pilot only | **RED — 5,890** over 8 compared rows; 44 of 52 have no candidate peer. `parseCssColor` 4,027 (A 1566 / B 1200 / C 1261) · `parseTimingFunction` 170 (A 0 / B 23 / C 147) · `parseStylesheet` 1,693 (A 342 / B 236 / C 1115). **3,982 spec-undecided and counted against the candidate by the declared convention** |
| **G-10** | three legs, interleaved, median-of-rounds, printed sink | table **ABSENT** | **PRESENT, both lowerings, two runs pasted — WELL-FORMED, exit 0** |
| **G-10** | arm-state on every row | — | **9 of 9 rows, in two forms — GREEN** |
| **G-10** | budgets against 1,636,680 µs only | — | **GREEN**; the UNCITABLE denominator and its three derivatives appear **nowhere** in the document, scanned literally |
| **G-10** | `BAR: OWNER-GATED-PENDING-RATIFICATION`, no verdict | — | **printed 3× · `verdict: null` · no bar set, inferred or reconciled** |

**G-5 GREEN · G-10 WELL-FORMED (no verdict, by law) · G-7 RED · G-2 RED.**

---

#### d.9 — Escalations (§3a: a hard-gate failure that is not local-edit-recoverable)

**ESC-d1 — G-7 cannot be closed from inside any unit's bound, and the cure is a grammar act nobody
owns.** The 5,890 decompose into exactly two walls, both already standing:

* **44 of 52 exports have no candidate peer at all.** Six are the parse entries the grammar does not
  carry (`.b`'s **E-1**: the cure is six more entries in `algebra/grammar.mjs`, *"a file in no unit's
  writable set in this wave"*); ten are the collectors, the coercer and the serializers, which no
  unit was asked to author; 28 are frozen types. Rowed as **CN-1 / CN-2 / CN-3** rather than left to
  be discovered, and identical in substance to `.a`'s **F-a.6** (*"§5 assigns G-1 to `.a` but assigns
  the IMPLEMENTATION of the surface to no unit"*) and `.c`'s **F-c6**.
* **The 5,890 cells on the 3 realized entries are grammar behaviour**, and the DIVERGENT_VALUE arm is
  **100 % the two adjudicated behaviours generalized** (d.3.1). Closing it is a write under
  `<p2>/typescript/src/css/**`, which §4a gives to `.b` and `.c` for *their* named cures and to
  nobody for this.

**Refused here, on purpose, and each refusal matters.** Widening the declared shape until the
FALSE_REJECT class emptied would be the taxonomy widening W1.md §6 G-2's falsifier names. Reading
every unadjudicated disagreement as `LIVE_STRICTER` would zero class B on an argument nobody measured.
Generalizing the sixteen adjudications from inputs to classes would make ~1,566 cells vanish and is a
**decision with a consumer direction** that belongs to `.e` and the owner. Adding a stub for the six
unrealized entries would be the masking fallback `.b` and `.c` both refused. **None was taken. The
gate is left RED with its measurement.**

*Is this the §3a "newly discovered incumbent defect (a sixth R-class)" trigger?* **Measured, and the
answer is no — but the measurement is handed up rather than swallowed.** The `MIS_ACCEPT` samples are
inputs like `rgb(255 0 153 / 095)` and `rgb(255-0 153 / 0.5)`, where the incumbent rejects and the
candidate accepts; the `FALSE_REJECT_IN_SHAPE` samples are `oklch(,0% 0.15 50deg)` and
`hsl(120, 500, 50%)`, where the incumbent accepts what looks unsound. Several of those are the **same
shape** as `parser-band.md`'s already-adjudicated published-parser defects (P-037's unsound accepts;
the comma/space rewrite), i.e. **more instances of R-classes already recorded, not a sixth one**. No
new R-class is declared by this seat, and none is silently folded either: the classes and their
samples are in `equivalence-full-surface.json` for `.e` and X·V to read.

**Routed to**: the orchestrator and `.e`, as a wave-level row. This seat grants itself nothing.

**ESC-d2 — G-2 cannot move at this wave, by the probe's own construction.** The probe packs and
imports **value.js's** artifact; this wave writes zero bytes there by law, and modifying the probe
voids the gate. G-2's GREEN is therefore reachable only after adoption — **X.P.W4's seam and X·V's
bytes** — and not by any act available to X.P.W3. Stated as an escalation rather than as a finding
because it is a **gate whose close condition no unit of this wave can satisfy**, which is exactly the
shape §3a asks to be returned. `.c` predicted it as F-c6; this seat measured it at the probe's bytes
and publishes both readings (the gate's, and the candidate's shadow) in
`evidence/W3/r1-anchor-after.txt`.

---

#### d.10 — Findings (measured, not cured here)

| id | severity | finding | owner |
|---|---|---|---|
| **F-d1** | **MAJOR** | **The "vendored sha-pinned published 4.0.0 tarball" the spec names as G-7's oracle did not exist in either tree.** All that existed was `cand-o/vendor/value-js-4.0.0/`, an **unpacked** copy. The published archive was recovered from npm's content-addressed cache **with the registry's own sha512 integrity**, vendored at `test/css-equivalence/vendor/` (this unit's create row), and proved byte-identical to the unpacked tree on both `css.js` and `css.d.ts`. Recorded loud because the gap was silent: every prior seat's "sha-pinned 4.0.0" was in fact a directory nobody had hashed against the registry | `.e` / orchestrator — the recovery is landed; the **record** that it had to be recovered is the finding |
| **F-d2** | **MAJOR** | **ESC-d1 above, carried as a finding so `.e`'s refutation pass has it by id**: G-7 is RED at 5,890 and the cure is out of every unit's bound. `.e`'s second L-14 obligation — *"refute at least one divergence row's spec reading"* — is a different claim and is **not** answered by this row; §6 of the ledger names the three rows most worth refuting | orchestrator / `.e` |
| **F-d3** | **MAJOR** | **ESC-d2 above**: G-2's close condition is unsatisfiable by any act of this wave, because the probe's subject is the incumbent | orchestrator / X.P.W4 |
| **F-d4** | MINOR | **The published 4.0.0 bundle carries NO packrat machinery at all** — 0 occurrences of `PACKRAT_ARMED` / `packratEnter` / `resetPackrat` / `memoize` across its whole `dist`. O-15 PT-03's one-way latch is **parse-that's**, and value.js's shipped artifact does not contain it. This does not weaken `.c`'s ESC-c1 (the latch is real in the library the candidate builds on) but it does bound the blast radius: no consumer of published value.js 4.0.0 has ever been able to arm it | `.e` / X·V — a fact for the adoption packet |
| **F-d5** | MINOR | **The bench's accept and reject legs do not reproduce `parser-band.md`'s parity reading for the cand-O drop-in** (measured 0.46× / 0.28× js here against ×1.01–1.02 there), while the R1-class leg reproduces almost exactly. Different candidate, machine, node and cell. **Printed in the table, reconciled with nothing**; recorded because a later reader meeting only one of the two numbers would draw a conclusion neither supports | owner (OC-1) / `.e` |
| **F-d6** | MINOR | **R5's fixture has no executed cell**: the graduated corpus union carries no comment-bearing declaration row, so "comment trivia folded into declaration names" is neither met nor contradicted by this wave. Adding inputs is a write in `.a`'s create row, so the gap is **returned, not repaired**. Its ledger row says so in its own bytes | `.a` / X.P.W4 |
| **F-d7** | MINOR | **`.b`'s E-3 is now met by ALL FOUR seats** — `.a` (G-6), `.b` (G-8), `.c` (G-9) and this seat (G-7). G-7's literal `npx vitest run test/css-equivalence/` collects **zero** files from `<p2>/typescript` for the same configuration reason (`include: test/*.test.ts`, one level; a positional FILTERS the collected set). The lawful cure was taken a fourth time — a project inside this seat's own create row, collecting **every** `*.test.ts` under it, narrowing nothing. **One orchestrator row, four sightings, zero private workarounds** | orchestrator |
| **F-d8** | INFO | **F-c3 confirmed and carried**: 172 rows of `.a`'s union arrive as `{id, src}` objects. Unwrapped losslessly in this seat's own reader, the count published on every read and asserted in the suite, the defect returned rather than cured across a bound | `.a` |
| **F-d9** | INFO | **The library compile does not cover this seat's bytes either** (`.b`'s F-b2, `.c`'s F-c4, same shape). ⟨cmd⟩ `npx tsc --noEmit -p typescript/tsconfig.json` → **479** `error TS` (from `.c`'s 467); **12 are this seat's and all 12 are resolution-class** — TS2307 `node:*` (4), TS2339 `import.meta.url` (1), TS7016 implicit-`any` on `.mjs` imports (7). **Zero are type errors in this seat's own logic** — the three `TS7006` the first reading showed WERE this seat's and were annotated away before commit | `.a` / orchestrator |
| **F-d10** | INFO | **`eslint` is not installed in this root** (the posture `.0`, `.b` and `.c` all recorded), so §7's `npx eslint .` was not run. The executable cadence stood in for it | orchestrator |
| **F-d11** | INFO | **The generated ledger landed with a blank line at EOF on its first emission**, caught by `git diff --check` at commit time (`new blank line at EOF`) and cured **in the generator**, not by hand (`<p2>` `dc52ed5`). Recorded because the cadence caught a defect a green test run did not — the same lesson `.b` drew from F-b1's NUL bytes | `.d`, cured |

---

#### d.11 — The commits (pathspec on the commit itself; four tracks share both indices)

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | `<p2>` | **`d8d7169`** | `test(x-p-w3/equivalence): graduate the differential harness to the full 52-export surface` — §9's own planned subject for `.d`, kept verbatim. 11 files, 1,907 insertions, all under `typescript/test/css-equivalence/` (incl. the vendored 37,290-B tarball) |
| 2 | `<p2>` | **`2e1b006`** | `feat(x-p-w3/identity): the dual-target recovery comparator — G-5's missing subject` |
| 3 | `<p2>` | **`dde249d`** | `feat(x-p-w3/bench): the three-leg table, recorded and never gating` |
| 4 | `<p2>` | **`dc52ed5`** | `fix(x-p-w3/.d): the emitted ledger ends with one newline and no blank line before it` — F-d11 |
| 5 | value.js | **`0e9bac30`** | `docs(x-p-w3/.d): divergence ledger — 29 rows, both halves measured against the sha-pinned 4.0.0` — 1 file, 631 insertions |
| 6 | value.js | **`3a9baee4`** | `docs(x-p-w3/.d): evidence — G-2 anchor after, G-5 identity, G-7 full surface, G-10 bench` — 4 files, 12,502 insertions |
| 7 | value.js | **(this record's append)** | `docs(x-p-w3/.d): unit receipt — G-5 GREEN, G-10 well-formed, G-7 RED at 5,890, G-2 RED structurally` |

**Why four `<p2>` commits and not the one §9 names.** §9's list gives `.d` the equivalence-harness
commit and names it verbatim above; the G-5 comparator and the G-10 bench are **different meanings**
that §9's commit plan does not mention at all, so they are not part of the declared family and
splitting them splits nothing the spec declared. The precedent is the wave's own: `.0` landed six,
`.b` three, `.c` one. **One commit per meaning, and no declared family split.**

Every commit carries **its own pathspec on the commit itself**. `git diff --check` clean on all seven
(the one it caught is F-d11, cured in the generator before the commit landed). **No `-A`, no `-u`, no
`commit -a`, no stash, no reset, no rebase, no cherry-pick, no force-push, no push.**
`scripts/dev/dev.sh` appears in **0** commits of this unit and was never opened.

**Bound discipline, as a measurement.** This unit's whole write set is
`typescript/test/css-equivalence/**` · `typescript/scripts/css-dual-target-identity.mjs` ·
`typescript/scripts/css-bench-three-leg.mjs` in `<p2>`, and `DIVERGENCE-LEDGER.md` + the four
`evidence/W3/` artifacts + this record + the ledger row in value.js — **the writable set exactly, and
no path outside it**. `.a`'s, `.b`'s and `.c`'s files were **read and imported, never opened for
write**: ⟨cmd⟩ `git -C <p2> show --stat` over the four commits names 14 files and none is theirs.
**Zero bytes written under** `/Users/mkbabb/Programming/value.js/src/**` — measured not by the shared
gate-27 reading, which moved under this seat while it worked (d.12), but by this unit's own commits:
⟨cmd⟩ `git show --stat --format= 0e9bac30 3a9baee4` names **5 files, every one under
`docs/tranches/X/`** —
`/Users/mkbabb/Programming/parse-that/**`, `~/Documents/Codex/**`, `~/.codex/**`, `../glass-ui/**`,
`../keyframes.js/**`, `../fourier-analysis/**`, and **`<p2>/typescript/src/**`** — the whole candidate
source tree, which this seat read constantly and wrote not once.

**The probe, and the third script that was not written.** `audit/probes/r1-published-totality.mjs` is
`execute, no write` and was executed twice and written zero times. The sub-census of d.3.1 wanted a
program; authoring it under `scripts/` would have been a §3a file-bound expansion, so it was run
**from the scratchpad** and is deliberately **not committed** — a reading, not a gate.

---

#### d.12 — E13 and the standing invariants, at this unit's own clock

Four paths swept read-only, classification taken from each row's **status cell** and never from a
bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**).

| path | newest by mtime | verdict |
|---|---|---|
| `docs/tranches/V/` + `V/coordination/` | `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` | **ours, outbound** — rowed **O-28** |
| `../glass-ui/docs/tranches/BK/coordination/` (**BK re-confirmed newest by mtime**: ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/`) | `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` | **ours, outbound** — rowed **O-26** |
| `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` | ours, outbound; rowed |
| `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | rowed since 07-27 |

⟨cmd⟩ `grep -c '^| I-' docs/tranches/V/coordination/INBOX.md` → **36**, unchanged since the open, the
resume and `.c`. The rows whose status cell still reads `UNREAD` are **O-20** (ours, outbound),
**I-30** (the standing glass obligation tail), **I-31** (atlas Q-lane, *"Do not edit value.js from
this lane"*) and **I-32 · I-33 · I-34**, each re-read row by row at this seat and each stating in its
own Routing cell that it is not X·P's (*"No X·P wave, no X·P act, opens on this row"* · *"Glass is
READ-ONLY always"* · *"Not X·P's, not a value.js act today"*). **0 unrowed value-addressed · 0 new
`I-n` · 0 UNREAD in X.P.W3.d's scope.** This seat **minted no mail**, wrote **zero** bytes in any
producer tree, and read `../glass-ui/**` only to list one directory's mtimes.

**Format and lint cadence (§7).** `<p2>`: ⟨cmd⟩ `node --check` on all **9** authored `.mjs` → **9/9
ok**; the four gate programs and the suite are the executable cadence and each was run **twice**,
identical; `git diff --check` on every commit; `tsc` recorded at F-d9; `eslint` absent, F-d10. **No
proof-farm script was authored for any gate** (L-19, §7) — every figure above is a program's own
output, each program executes a corpus and its output *is* the evidence, and G-2 re-runs an existing
probe unmodified. Prettier was **checked and deliberately not applied to this record**: it already
warns on the file **before** this append, so `--write` would rewrite four other seats' receipts inside
a file five seats append to concurrently; the cadence runs over the bytes a unit authors, and this
unit's value.js bytes are this block, the ledger (generated) and four evidence artifacts (three
generated, one composed from two verbatim program outputs).

**Gate 27, and it MOVED under this seat while this seat wrote — reported at both readings rather than
at the convenient one.** ⟨cmd⟩ `git --no-optional-locks status --porcelain -- src api demo test e2e
| wc -l` read **2** at this seat's open and immediately before each of its two value.js commits (the
X·V W1.a seat's two untracked `e2e/smoke/a11y-control-targets.spec.ts` files, exactly as `.c`'s
addendum-beside recorded). Re-measured once more while this receipt was being written it reads
**12**, double-run:

```
⟨cmd⟩ git --no-optional-locks status --porcelain -- src api demo test e2e
 M demo/palettes/PalettesPane.vue                       M demo/palettes/browser/admin/AdminAuditPanel.vue
 M demo/palettes/browser/admin/AdminFlaggedPanel.vue    M demo/palettes/browser/admin/AdminNamesPanel.vue
 M demo/palettes/browser/admin/AdminTagsPanel.vue       M demo/palettes/browser/admin/AdminUsersPanel.vue
 M demo/palettes/browser/dialog/VersionHistoryDrawer.vue
 M demo/palettes/browser/search/SearchFilterBar.vue
 M demo/picker/controls/ComponentSliders/ConsoleRail.vue
 M demo/shell/dock/layers/SlugEditLayer.vue
?? e2e/smoke/a11y-control-targets.spec.ts               ?? e2e/smoke/mobile/a11y-control-targets.spec.ts
```

**All ten new rows are the concurrent X·V W1.a seat's** — the control-target/a11y surface whose two
untracked spec files have been in the tree since `.b`'s and `.c`'s sittings, now joined by the
`demo/**` edits that suite exists for. **Not one of them is this unit's**: this unit's whole value.js
write set is `docs/tranches/X/parse-that/**` and `docs/tranches/X/execution/**`, and ⟨cmd⟩
`git show --stat --format= 0e9bac30 3a9baee4` names 5 files, every one under `docs/tranches/X/`.
The correction is recorded rather than left to be discovered, and it is the **third** sighting of the
same lesson: **in a working tree four tracks share, gate 27 is a tranche-wide reading and not a
per-seat one** (`.b` drew it, `.c` restated it, this seat watched it move mid-sitting).

`scripts/dev/dev.sh` reads ` M`, unstaged and untouched;
`docs/tranches/V/reformation/CARRY-LEDGER.md`, `docs/tranches/X/evidence/w1/**` and
`docs/tranches/X/waves/{W1-LOG.md,evidence/}` are **sibling tracks' bytes**, read and left exactly as
found — the tranche-wide reading `.b` taught and `.c` restated. Both value.js commits verified on the
right branch: ⟨cmd⟩ `git branch --contains 0e9bac30` / `3a9baee4` → `* tranche-u` (the F-a.7 / F-b5
scratch-branch hazard, re-checked and closed at this seat too).

**Addendum-beside to X.P.W3.d, same sitting, never a rewrite of the block above (E-3).** Two things
the receipt could not carry because they did not exist when it was written, plus one re-measurement.

1. **The last two commit hashes.** d.11 rows 7 and 8 read *"(this record's append)"*; they landed as
   value.js **`5545d284`** (`docs(x-p-w3/.d): unit receipt — G-5 GREEN, G-10 well-formed, G-7 RED at
   5890, G-2 RED structurally`, 1 file, 607 insertions) and **`90ab2d1a`**
   (`docs(x-p-w3/.d): ledger — X.P.W3 commit cell + the .d reading on the wave's own row`, **1
   insertion / 1 deletion**, verified before staging per F-r.2's lesson — on a file four tracks
   share, pathspec-only is necessary and not sufficient, and the working-tree diff must contain
   nothing but this seat's own lines). This unit's value.js total is therefore **four** commits:
   `0e9bac30` · `3a9baee4` · `5545d284` · `90ab2d1a`, each verified ⟨cmd⟩ `git branch --contains` →
   `* tranche-u`.

2. **The gates re-read once more from the settled, committed bytes** — the third reading of each, all
   agreeing with the receipt:

```
⟨cmd⟩ git -C <p2> status --porcelain                                   → ?? .worktrees/   (and nothing else)
⟨cmd⟩ node typescript/scripts/css-dual-target-identity.mjs             → GREEN, exit 0   (G-5)
⟨cmd⟩ node typescript/scripts/css-universe.mjs --cross-check-ledger …  → GREEN, 16 conflicts, 0 not carried   (G-7's family leg)
```

3. **`<p2>`'s `?? .worktrees/` is §4b's prescribed container and was never staged** — it is the same
   single untracked entry `.b`, `.c` and the resume all measured, unchanged by this unit.

**Nothing above this line is edited.** The receipt stands as written; this is the correction-beside
the wave's own E-3 idiom requires.

---

## RESUME 2026-09-18 (SECOND) — Track D seat 0, X.P.W3 re-opened; ONE unit owed

**SERVED MODEL: claude-opus-5[1m]** · 2026-09-18, this seat's own clock (wall 14:20 EDT; the
sitting's date of record stays **2026-09-17**, the begin-word's). **Nothing above this line is
rewritten** (E-3): the open, the baseline, the five landed receipts and the first resume block stand
exactly as their authors wrote them. This is the second correction-and-continuation beside them,
under the same §0o clause the first one exercised — *"a runner-dead wave re-opens in RESUME MODE with
nothing lost."*

**The RESUME predicate, measured, not assumed.** ⟨cmd⟩ `sed -n '81p' …/execution/LEDGER.md` → the
`X.P.W3` row's status cell reads **`OPEN 2026-09-17`**, and `…/execution/D/X-P-W3.md` exists (2,610 L
before this block). That is the runner's resume predicate exactly: **no re-open, no re-baseline, and
no unit whose commits exist is re-dispatched.**

### R2.1 — What has LANDED since the first resume, verified at the bytes in both histories

The first resume's R.1 established `.0` · `.a` · `.b`. **`.c` and `.d` have landed since**, and are
re-verified here from the histories themselves, never from the record's prose:

```
⟨cmd⟩ git log --all --oneline --grep='x-p-w3'            (value.js)  → 13 commits
861941c2  docs(x-p-w3/.d): addendum-beside — the last two hashes, and the gates re-read …
90ab2d1a  docs(x-p-w3/.d): ledger — X.P.W3 commit cell + the .d reading on the wave's own row
5545d284  docs(x-p-w3/.d): unit receipt — G-5 GREEN, G-10 well-formed, G-7 RED at 5890, G-2 RED …
3a9baee4  docs(x-p-w3/.d): evidence — G-2 anchor after, G-5 identity, G-7 full surface, G-10 bench
0e9bac30  docs(x-p-w3/.d): divergence ledger — 29 rows, both halves measured …
41220892  docs(x-p-w3/.c): addendum-beside — the gate-27 reading re-measured after this seat's commits
8a21ea8c  docs(x-p-w3/.c): ledger — X.P.W3 commit cell + the timeline row for .c
31f65d56  docs(x-p-w3/.c): unit receipt — G-3 GREEN, G-9 depth GREEN, latch RED (ESC-c1)
  (+ the five .0/.a/.b commits R.1 already verified, + 29fcc39c the resume's F-r.2 row)
⟨cmd⟩ git -C <p2> log --oneline -6
dc52ed5 · dde249d · 2e1b006 · d8d7169   ← .d (four)
f14f59f                                 ← .c (one)
bd10e5c                                 ← .a
⟨cmd⟩ git -C <p2> status --porcelain     → ?? .worktrees/   (§4b's container; nothing else)
```

**The named artefacts, present at HEAD** — ⟨cmd⟩ `git cat-file -e HEAD:<path>` on each:

| artefact | repo | result |
|---|---|---|
| `evidence/W3/universe-52.json` · `recovery-closure.json` · `dual-target-identity.json` · `equivalence-full-surface.json` · `bench-three-leg.md` · `r1-anchor-after.txt` | value.js | **6 of 6 PRESENT** |
| `parse-that/DIVERGENCE-LEDGER.md` | value.js | **PRESENT** |
| `src/css/{entry,bounds,codes}.mjs` · `scripts/css-{universe,recovery-closure,dual-target-identity,bench-three-leg}.mjs` | `<p2>` | **7 of 7 PRESENT** |
| `test/css-equivalence/**` incl. `vendor/value.js-4.0.0.tgz` + `vendor/PIN.json` | `<p2>` | **10 files PRESENT** |

**`.0`, `.a`, `.b`, `.c` and `.d` are therefore DONE and are NOT re-dispatched.** Their carried REDs
are carried, not re-opened, and **no seat of this resume may turn any of them green** by narrative,
by denominator, or by a write outside its own bound: `.a` **G-1 RED at 5 of 52** (F-a.6 — no
implementing seat) · `.b` **G-4 RED on C-3/C-4** (E-1 · E-2) · `.c` **G-9 latch RED** (ESC-c1) ·
`.d` **G-7 RED at 5,890** (ESC-d1) and **G-2 RED structurally** (ESC-d2).

### R2.2 — What is OWED: `.e` alone — and a SECOND WIP residue in the tree, disclosed loud

**No `.e` commit exists in either history**: ⟨cmd⟩ `git log --all --oneline --grep='x-p-w3'` → 13
commits, every one `.0`/`.a`/`.b`/`.c`/`.d`/resume; ⟨cmd⟩ `git -C <p2> log --all --oneline | grep
'x-p-w3/.e'` → none.

**F-r2.1 — MAJOR (disclosure, not an adoption).** An `.e` seat ran and died mid-flight before it
committed anything, exactly as the `.c` seat did before the first resume. Its bytes are in the
value.js working tree, **uncommitted**, and they carry `.e`'s own byline and served model:

```
⟨cmd⟩ git status --porcelain  /  git diff --numstat   (value.js, this seat's clock)
 M docs/tranches/X/COHESION.md                              36  0   Sep 18 12:24  sha256 4ce343df…
 M docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md          37  0   Sep 18 12:25  sha256 0b09ecd4…
 M docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md   405  1   Sep 18 12:23
?? docs/tranches/V/megatranche/registry/harvest/x-p-w3.json          Sep 18 12:23  123,158 B  sha256 75ecdc2f…
⟨cmd⟩ python3 -c "json.load(…x-p-w3.json)"  → servedModel claude-fable-5-1 · unit X.P.W3.e ·
      dispatched ["X.P.W3.0","X.P.W3.a","X.P.W3.b","X.P.W3.c","X.P.W3.d","X.P.W3.e"] ·
      seatCount {dispatched: 6, harvestedUnitRows: 5, absent: ["X.P.W3.e"], zeroRowSeats: []} ·
      harvester sha256 77a6e04c…  ·  runs: 2 (wf_25c53370-7ee · wf_3e7ab295-b6d)
```

Every one of those four paths is **inside `.e`'s own writable set** (`W3.md` §5 `.e` Files; §4 rows
L166–169; §4a's *sole* `modify-carve` on `COHESION.md` and *sole* `DEFECT-LEDGER.md` append), so
nothing unlawful was written — the seat simply never reached its commit. **But the wave's primary
close artefact is ABSENT**:

```
⟨cmd⟩ find …/value.js …/parse-that-css-totality-p2 -name '*W3-CLOSE*'   → (no output)
⟨cmd⟩ ls …/docs/tranches/X/parse-that/waves/                            → W0-CLOSE.md · W1-CLOSE.md ·
                                                                          W2-CLOSE.md — no W3-CLOSE.md
```

— and the uncommitted `COHESION.md` block **cites it by path** (*"`parse-that/waves/W3-CLOSE.md`"*)
and the `DIVERGENCE-LEDGER.md` §6.1 block **forward-references F-e7 into it**. The draft therefore
**asserts an artefact that does not exist**, which is precisely the §11-guardrail-2 dishonesty this
wave exists to refuse, and it is why the draft is a **draft, not a result**.

**The re-dispatched `.e` inherits these bytes as a DRAFT.** It reads all four whole, judges every
hunk against `W3.md` §5 `.e` / §8 / §12 at the bytes, **re-runs the §5.e sub-gate itself**, keeps
what measures true, rewrites what does not, **writes the missing `W3-CLOSE.md`**, and names the
inherited paths in its receipt. **A receipt that reports a gate it did not run on the bytes it is
committing is the dishonesty this wave's own §11 guardrail 2 names.**

**Not `.e`'s, and never touched**: `docs/tranches/V/reformation/CARRY-LEDGER.md` (` M`, 34/0, mtime
**2026-07-22**, a standing dirty path from the V reformation), `scripts/dev/dev.sh` (unowned, NEVER
staged), and the ten `demo/**` + `e2e/**` rows of the concurrent X·V W1.a seat that `.d`'s
addendum-beside already measured. **F-r.2's lesson binds `.e` on two shared files**
(`DEFECT-LEDGER.md` and `LEDGER.md`): on a file four tracks write, *pathspec-only is necessary and
not sufficient* — the seat must verify the working-tree diff contains nothing but its own lines
before it stages.

### R2.3 — Baseline: banked at the open, NOT re-taken (R.3's discipline, second application)

The ten hard-gate conditions were read READ-ONLY at the open and are in **§Baseline** above — **10 of
10 RED before cure · 0 GREEN-BEFORE-CURE**, with G-2 reproducing 324/1548, G-3 10/10 to the call, and
G-5's MEASURE-AT-OPEN taken. **This seat re-ran no gate**: a resume that re-baselines after five
units have landed would be measuring the cures, not the disease. The readings that have moved since
the open are the landed ones, each published in its own receipt — **G-6 RED→GREEN** (`.a`) ·
**G-8 RED→GREEN** (`.b`) · **G-3 RED→GREEN, G-9 depth GREEN / latch RED** (`.c`) · **G-5 RED→GREEN,
G-10 RED→WELL-FORMED-NO-VERDICT, G-7 RED at 5,890, G-2 RED structurally** (`.d`). **`.e` re-runs all
ten at its own clock** — that is its sub-gate, not a re-baseline.

### R2.4 — E13 Step-0, re-swept at this seat's own clock

Four paths swept read-only and compared against **every** row of `INBOX.md`; classification taken
from each row's **Status cell**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**).
`INBOX.md` self-excluded (SELF-COUNT law).

| path | newest by mtime | verdict |
|---|---|---|
| `docs/tranches/V/` + `V/coordination/` | `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (Sep 18 01:41) | ours, outbound — rowed **O-28** |
| `../glass-ui/docs/tranches/BK/coordination/` (**BK confirmed newest**: ⟨cmd⟩ `ls -lat ../glass-ui/docs/tranches/` → `BK` Sep 17 20:15 · `BJ` Aug 3 · `BI` Jul 28) | **`glass-outbound-2026-09-18-valuejs-o26-reply.md` (Sep 18 12:17, 41,738 B)** | **UNROWED · INBOUND · value.js-addressed** → rowed **I-35 UNREAD** |
| `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` (Sep 17 19:08) | ours, outbound; rowed |
| `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` (Aug 3 15:01) | rowed since 07-27 |

**One new row minted: I-35.** ⟨cmd⟩ `grep -c 'glass-outbound-2026-09-18-valuejs-o26-reply' INBOX.md`
→ **0** before this seat. It is glass-ui BK's **reply to our O-26** (the KF.W6 BH relay), addressed
*"To: value.js tranche X, **Track B** (X·KF, the keyframes.js lane) — KF.W6 unit `b`"*, and its §0
carries two live consumer claims (*"your installed 7.0.0 is not the published 7.0.0"*; *"HEAD is not
9.0.0, and none of our cures is in a tarball yet"*). **It is Track B's, not X·P's**: no byte of it
touches this wave's ten gates, and this seat neither acts on it nor answers it. Rowed UNREAD, routed
to Track B, and a dated sweep line appended at `INBOX.md`'s end. **Glass is READ-ONLY always** — this
seat wrote zero bytes in any producer tree and minted no outbound mail.

⟨cmd⟩ `grep -o '^| I-[0-9a-z]*' INBOX.md | sort -u | wc -l` → **36** before (I-1..I-34 ⊕ I-21a ⊕
I-24a), **37** after. **0 other unrowed value-addressed items · 0 UNREAD in X.P.W3's scope.** The
three rows whose Status cell still reads `UNREAD 2026-09-17` are **I-32 · I-33 · I-34**, re-read
row-by-row at this seat: their Routing cells read *"No X·P wave, no X·P act, opens on this row"*
(I-32), *"Glass is **READ-ONLY always** — producer rows ride SS-6"* (I-33) and *"**Not X·P's, not a
value.js act today**"* (I-34). Unchanged, and none of them is this wave's.

### R2.5 — The dispatch: ONE group, ONE unit

Groups 1–4 are spent. **One ordered group remains, concurrency 1.**

| group | unit | model | still owed |
|---|---|---|---|
| 5 | **`.e`** | **fable** (fresh) | the §5.e sub-gate; the L-14 refutation attempts; **`W3-CLOSE.md`, which does not exist**; the harvest chain; the `COHESION.md` §5 carve — over the uncommitted draft of **F-r2.1**, verified and not adopted |

The seat stays **fresh Fable** (`W3.md` §5's own words: *"an author cannot adjudicate his own
union"*; M-23 §1). The dead predecessor authored none of the wave's mechanism either, so inheriting
its draft does not compromise freshness — **but the draft's readings are unverified until this seat
measures them**, and the seat that adopts a number it did not run has averaged, which L-14 forbids.

**`.e`'s L-13 referent is unchanged and is fixed here for the third time so it cannot be argued after
the fact: the units dispatched are SIX — `.0`, `.a`, `.b`, `.c`, `.d`, `.e`** — five landed, one
owed. `W3.md` §5.e's literal *"five"* is `W3.md`'s own count of §5's roster and is reconciled, not
contradicted, by the `.0` row this record has carried since the open (the X.P.W2 `.0` precedent,
COHESION §0l). The draft's own `seatCount` reading — **5 of 6, `.e` structurally absent from its own
harvest, RED under L-13's letter** — reproduces W0 R-3 / W1 R-3 and is the reading this seat expects
`.e` to re-measure and either confirm or refute.

**Carried into the re-dispatch, none of it re-opened and none of it curable by `.e`**: `.b` E-1 · E-2
· E-3 · `.a` F-a.6 · F-b4 · `.c` ESC-c1 · `.d` ESC-d1 · ESC-d2, and `.e`'s own draft findings F-e1..
F-e4 (each returned as a grammar or `.d`-emitter act for **X.P.W4**, never hand-added to a generated
file here). **Each is an orchestrator row; `.e` grants itself no bound.** The wave's close stamp is
**IMPLEMENTED at best** — five gates carry REDs with named owners, and **VERIFIED is X.P.W4's alone
(R-A)**.

### R2.6 — Preconditions, re-verified at this seat's clock

| condition | receipt | verdict |
|---|---|---|
| `W3.md` §2 *Opens after*: **X.P.W2** | `LEDGER.md` row 80 → **CLOSED 2026-09-17** (`complete_with_misses`, IMPLEMENTED-with-carried-REDs per §0n.2); ⟨cmd⟩ `git cat-file -e HEAD:…/waves/W2-CLOSE.md` → present | **MET** |
| both targets built (§10: *"G-5 has no subject without the Wasm one"*) | `<p2>/typescript/src/css/build/ac1.wasm` present; `.d`'s G-5 read **79,674 cells, 0 differing bytes** | **MET** |
| the begin-word (OP-1) | COHESION **§0j** — GRANTED 2026-09-17; unchanged | **MET** |
| fresh-root law (§4b): one root, no `<p2>-w3*` sibling | ⟨cmd⟩ `ls -d /Users/mkbabb/Programming/parse-that*` → 9 dirs, **no `-p2-w3*`**; `git -C <p2> status --porcelain` → `?? .worktrees/` alone | **MET** |
| frozen root byte-unchanged | ⟨cmd⟩ `git -C …/parse-that log --oneline -1` → `ef10d5b` — **identical to X.P.W0's pinned quadruple**, this program wrote nothing there | **MET** |
| `.d` committed (§4a: *"`.e` writes only after `.d` commits"*) | `<p2>` HEAD **`dc52ed5`**; value.js `861941c2` — both `git branch --contains` → `tranche-u` | **MET** |

**No precondition failed; the wave is not blocked.**

---

### X.P.W3.e

**SERVED MODEL: claude-fable-5-1** (fresh — authored none of the wave's mechanism; M-23 §1) ·
2026-09-18 **14:2x–14:5x EDT**, this seat's own clock (the sitting's date of record stays 2026-09-17)
· **group 5, run ALONE** after `.d`'s commits (§4a lock **MET**: `<p2>` `dc52ed5`, value.js `861941c2`,
both re-verified `git branch --contains` → `tranche-u`). Spec sections executed exactly: `W3.md` §5
`.e` (L319–339) · §8 (L561–582) · §9 (L584–608) · §12 (L657–669) · §4 rows (L163–172) · §4a
(L184–197) · COHESION §0j.E OC-1 · §0n.3–§0n.5 · this record's §Unit plan P.1/P.2 and §RESUME-2
R2.1–R2.6. `W3.md` read WHOLE (673 L); `COHESION.md` read to the file end (§0o and its erratum the
last headings); this record read whole before a byte was written.

**The unit's own gates, as dispatched.** §5.e close sub-gate → **GREEN** (`W3-CLOSE.md` exists, 553 L,
all ten gates' commands + exit codes + outputs pasted from this seat's own run files; **three**
named refutation attempts with outcomes; no gate green on a narrative) · **L-13 harvest → RED under
its letter** (exit 0 ×3 · `x-p-w3.json` present · 5 seats, none with zero rows · **5 of 6**, `.e`
structurally absent) · **re-reads of all ten**: done, twice each, at §1 of `W3-CLOSE.md`.

#### e.0 — CRASH-RECOVERY, first act (the standing law)

⟨cmd⟩ `git status --porcelain` in value.js and `<p2>` before any other act. Inside this unit's
writable set: ` M docs/tranches/X/COHESION.md` (+36) · ` M …/DIVERGENCE-LEDGER.md` (+37) ·
` M …/registry/DEFECT-LEDGER.md` (+405/−1) · `?? …/registry/harvest/x-p-w3.json` (123,158 B) — the
dead first `.e` seat's DRAFT (F-r2.1). `W3-CLOSE.md`: **ABSENT** (⟨cmd⟩ `find … -name '*W3-CLOSE*'` →
nothing). Outside the set and never touched: `INBOX.md`, `CARRY-LEDGER.md`, `execution/{A,C}/*.md`,
`execution/LEDGER.md`'s sibling hunks (X-W1 · F.W1 lines), ten `demo/**` + two `e2e/**` rows,
`scripts/dev/dev.sh`. `<p2>`: `?? .worktrees/` alone. **Every draft hunk was read whole and re-measured;
the draft was rewritten where measurement disagreed** — the itemized corrections are `W3-CLOSE.md` §0
(the overflowing region is the **mark journal** `MARK_CAP` 32,768, not the `C` journal; the first
throw is at **8,191** rules, not 8,192; the JS lowering does **not** die at 11/13 MB on this box — 13
MB parses at 2,963 MB RSS and **24 MB** aborts with exit 134; 143 files per harvester run, not 141;
**three** wave runs, not two). The draft's `DEFECT-LEDGER.md` bytes were **kept** because the
unmodified script, run by this seat, wrote the identical bytes (sha256 `8092610b…`) — and in run B
wrote them itself onto the repo path.

#### e.1 — The ten gates, BEFORE → AFTER, at this seat's clock (full pastes: `W3-CLOSE.md` §1.1–1.8)

BEFORE is the open's §Baseline (read-only, not re-taken — R.3/R2.3). AFTER is this seat's own run at
`<p2>` `dc52ed5`, **14:29:45–14:33 EDT, each twice**; timing-free outputs byte-identical across the two
runs; every generated JSON regenerated to the scratchpad and compared by sha256 to the committed one.

| gate | BEFORE | AFTER (this seat) | verdict |
|---|---|---|---|
| **G-1** | 0 of 52 | `--check` exit 1 · **5 of 52 TOTAL** (0/3/16 · 5/0/28) · `tsc` exit 2, 56 diagnostics (54 TS2694 + 2 TS2724) · `universe-52.json` **sha256-equal** (`0005f26b…`) | **RED** — F-a.6 |
| **G-2** | 324/1548 | probe **unmodified** (`77678a57…`): **324 / 1548 · 1 mode · 4 of 9 RED**, exit 1, ×2; `git status` on its dir empty before/after | **RED, structural** — ESC-d2 |
| **G-3** | 10/10 throw | **0/10** heads throw (both lowerings) · **72** non-string cells → 0 throws, 0 `undefined`, one shape · R1 `oklch()` typed `[6,7)` · `no-throw` 19 ✓ · `boundary` 77 ✓ · `SHIELD.caught` 0 | **GREEN on its command legs; proof leg REFUTED (e.2 R-iii) — NOT reported green** |
| **G-4** | checker absent | C-1/C-2/C-5..C-10 GREEN · **C-3 RED** (5 unemitted) · **C-4 RED** (2 inherited arms) · exit 1 · `recovery-closure.json` **sha256-equal** (`25fa6a4b…`) | **RED** — E-1 · E-2 (+ F-e10) |
| **G-5** | comparator absent | **79,674 cells · 0 differing bytes · 0 threw** · 21/21 boundary · exit 0 · `dual-target-identity.json` **sha256-equal** (`b68bab94…`) | **GREEN on its command**; intent falls beyond the corpus (ESC-e1) |
| **G-6** | suite absent | **72 / 72** (13 named + 59), ×2 | **GREEN** |
| **G-7** | harness absent | **5,890** (3,982 spec-undecided) · rows 52 / COMPARED 8 / NO-PEER 44 · suite 1 ✗ / 23 ✓ · `--cross-check-ledger` GREEN 16/0 · `equivalence-full-surface.json` **sha256-equal** (`d03b458c…`) | **RED** — ESC-d1 |
| **G-8** | suite absent | C-7 0/3,744 unnamed · C-8 false/false · C-9 0 writes · `--assert-no-console` exit 0 · `labels` 11 ✓ | **GREEN** |
| **G-9** | 7,761/7,762 cliff; one-way latch | depth **64/65/7,761/7,762 → `ok:false`** both lowerings, `depth` 15 ✓ · latch `afterReset:true, symmetric:false`, `latch` 5 ✓ / 2 ✗ | **depth GREEN · latch RED** — ESC-c1 |
| **G-10** | table absent | a **third run**, alone, 14:32:15: 9 rows · arm-state each · sink 580440 · budgets vs 1,636,680 only · `--denominator 1870633` **REFUSED exit 2** · `BAR: OWNER-GATED-PENDING-RATIFICATION` · `VERDICT: none` · exit 0 | **WELL-FORMED, NO VERDICT** |

**F-e8, found by this re-read**: `.d`'s d.3 paste carries `COVERAGE_NARROWING 2320 · FIXTURE_R1 4585 ·
DECLARED_DIVERGENCE 15` for `parseCssColor`; the settled program prints **84 · 211**, and `.d`'s own
committed evidence carries `84 · 211 · 0` (+ `AGREE 22229`, summing exactly to 26,551). The gate's
defect counts are unaffected. A record transcription defect, `.d`'s author's to correct beside.

#### e.2 — L-14: three named refutation attempts (full text and pastes: `W3-CLOSE.md` §3)

| claim | attempt (this seat's own instrument, scratchpad, read-only, ×2) | outcome |
|---|---|---|
| **(i) the union is closed** (`.b`) | two FRESH bands, seeds `0x9e3779b1` · `0x00c0ffee`, **20,000 distinct sources each** (mutation + hostile splices + random code points; 35 % non-ASCII-bearing), the eight read from value.js `6aca8602:src/css/types.ts` by `git show`, × 3 entries × 2 lowerings, public + RAW | **NOT refuted on ⊆ / tuple / span / labels / cross-target** — 240,000 calls: 0 outside the eight · 0 empty tuples · 0 raw throws · 0 `undefined` · 0 `far.code === null` · 0 target differences · `SHIELD.caught` 0. **REFUTED on the no-fallback conjunct through (iii)**: the shield's `catch → css_syntax` is an arm that answers "nothing raised" with a code of its own, reached by a valid input; C-4's `ABSENCE` regex does not see it (**F-e10**). ⊇ stays RED by `.b`'s own C-3. Acceptance rate of the bands (0.4 %) disclosed |
| **(ii) a divergence row's spec reading** (`.d`) | drafts fetched 14:34 EDT, quotations found verbatim; 25 targeted inputs through the sha-pinned oracle and both lowerings (js ≡ wasm on all) | **PB-03 UPHELD** (§7.1 *"100% or 100"*) + a **NEW unrowed divergence**: legacy `hsl(120, 50, 50)` incumbent MIS-ACCEPTS, candidate rejects per `<legacy-hsl-syntax>` (**F-e2**). **S-1/ADJ-2 REFUTED as stated**: `hsl(120deg50%50%)` and `rgb(255none none)` ACCEPTED by both lowerings where css-syntax-3 §4.3.3 makes `120deg50` / `255none` single invalid dimension-tokens (**F-e1**). **ADJ-3/S-2 half-REFUTED**: css-color-4 §4.3 normalizes an infinite `<hue>` to 0deg, css-values-4 §5 clamps an over-range angle; candidate rejects `hsl(1e400 0% 50%)` with `<finite-number>`; the row's "§10.9" is *Type Checking* and its attributed sentence does not exist (**F-e3**); the `lab(50 1e400 0)` witness is vacuous — `lab` is a coverage narrowing (**F-e9**). ADJ-1 is a shared non-normalization (**F-e4**). GROUND-C stays OWNER-OWED |
| **(iii) the shield is non-load-bearing** (`.c`) | grow a VALID stylesheet past the Wasm lowering's fixed regions (`layout.mjs`); cross `INPUT_CAP` by one code unit; both lowerings, public and RAW; bisect the threshold | **REFUTED.** `parseStylesheet` × `a{color:red}`: last OK **8,190** rules (98,280 B; 32,766 marks), first THROW **8,191** (98,292 B; **32,770 marks > `MARK_CAP` 32,768**) — RAW throws `HALT: a journal, the value stack or the arena overflowed its fixed region`; public **wasm** → `ok:false css_syntax [0,98292) ["<stylesheet>"]` **only because the shield fired** (`SHIELD.caught` +1); public **js** → `ok:true`. Same at 1,048,577 code units for all three entries (`INPUT_CAP`) and on one rule with 20,000 declarations. Six faults, all `kind: wasm`. G-3's falsifier fires by inspection of the entry module; **G-5's two targets diverge on valid input** in the §3a "Wasm memory model" direction. Beside it, **F-e6**: the JS lowering takes ~205 B of heap per input byte — 13 MB ok at 2,963 MB RSS, **24 MB → FATAL heap OOM, exit 134** (heap limit 4,192 MB) |

**Signed reading.** Closure holds where `.b` measured it and fails where the gate's own falsifier
looks; two of the three declared divergences are not yet defensible spec readings as rowed; the
shield is load-bearing on one of the two targets. **Nothing was averaged.** `<p2>` was **not written**
(⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` after every run); the cures are lowering acts
under `src/css/**` and grammar acts, none in this seat's set.

#### e.3 — The evidence chain (full: `W3-CLOSE.md` §5)

```
⟨cmd⟩ shasum -a 256 docs/tranches/V/megatranche/workflows/harvest-journals.mjs → 77a6e04c…8a28 (c0078d96, tree clean)
⟨cmd⟩ cd <mirror-A: workflows/harvest-journals.mjs SYMLINK→repo> && node docs/tranches/V/megatranche/workflows/harvest-journals.mjs
harvested 2966 agent results · 7585 defects · {"BLOCKER":914,"MAJOR":3245,"MINOR":2196,"INFO":718,…}     EXIT=0   14:36:43
      written 143 files · NEW 94 · CHANGED 2 (wf_247fe7fa-e67.json, wf_6f552e12-062.json) · UNCHANGED 47   ← K.7(i), third firing
⟨cmd⟩ cd <mirror-B: + registry/DEFECT-LEDGER.md SYMLINK→repo> && node … harvest-journals.mjs               EXIT=0   14:36:55
⟨cmd⟩ third run (mirror-A)                                                                                   EXIT=0   14:38
⟨cmd⟩ shasum over the 143 harvest files, three runs → IDENTICAL · DEFECT-LEDGER.md mirror-A == repo → 8092610b…4356
⟨cmd⟩ git diff --numstat -- registry/DEFECT-LEDGER.md → 405 1 · six hunks, all the script's · stubs 1,487 → 1,552 (+65 = every new row)
      · git diff --check → 130 trailing-whitespace flags, the script's (W1 R-5's shape; not hand-edited)
⟨cmd⟩ python3 fold-harvest.py (×2, byte-identical) → registry/harvest/x-p-w3.json 129,579 B sha256 f657d114…
      dispatched 6 · harvested 5 (.0 DONE 8 · .a PARTIAL 6 · .b PARTIAL 6 · .c PARTIAL 4 · .d PARTIAL 9) · absent [X.P.W3.e] · zeroRowSeats []
      runs embedded VERBATIM: wf_25c53370-7ee (81,320 B) · wf_3e7ab295-b6d (33,020 B) · wf_a9980aef-425 (4,191 B)
```

**5 of 6 — RED under L-13's letter (ESC-e2)**; W0 R-3 / W1 R-3 reproduced; the dead predecessor seat
left no result row and is not counted. The COHESION §5 bullet carved (one bullet, 44 lines, one hunk,
nothing else in the file touched). A note for the orchestrator: COHESION §0k.1 HG-7 says X-track run
records are harvested once at X-W11's close for the validator's corpus; this fold is X·P's L-13
evidence under `W3.md` §5.e and the seat-0 brief — compatible as read here, the orchestrator's to say
otherwise.

#### e.4 — The commits (pathspec on the commit itself; four tracks share the index)

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | value.js | **`313d5bac`** | `docs(x-p-w3): divergence ledger + closure adjudication` — `W3-CLOSE.md` (553 L, create) + `DIVERGENCE-LEDGER.md` §6.1 (+48, the §Adjudication block only; `.d`'s 631 generated lines untouched). §9's own subject, verbatim; body carries the model receipt and the refutation attempts |
| 2 | value.js | **`c2bc7f5a`** | `docs(x-p-w3/chain): harvest x-p-w3.json + DEFECT-LEDGER append + COHESION §5 carve` — three files; body pastes exit 0 and 5 of 6 |
| 3 | value.js | (this record's append) | `docs(x-p-w3/.e): unit receipt` |
| 4 | value.js | (the LEDGER row) | `docs(x-p-w3/.e): ledger` — the X.P.W3 row's commit cell + note, and one timeline line; staged as **this seat's hunks only** through a temporary index (F-r.2: on a file four tracks write, pathspec-only is necessary and not sufficient — the sibling X-W1 and F.W1 hunks in the working tree are left unstaged and uncommitted) |
| — | `<p2>` | **none** | this seat wrote zero bytes in the fresh root |

`git diff --check` clean on #1 and #3; #2 carries the script's 130 flags, recorded above. Both landed
commits verified ⟨cmd⟩ `git branch --contains` → `* tranche-u`. **No `-A`, no `-u`, no `commit -a`, no
stash, no reset, no force, no push.** `scripts/dev/dev.sh` appears in 0 commits and was never opened.

#### e.5 — Escalations returned (§3a; none is this seat's to rule)

- **ESC-e1** — the shield is **load-bearing** on the Wasm lowering and the two targets **diverge on
  valid input** beyond the corpus (e.2 iii). G-3's falsifier by inspection; G-5's §3a "memory model"
  trigger → **X.P.W1/W2 (architecture) · X.P.W4 (adoption must not rest totality on a catch) · the
  contract's owner**. Cure shape stated, not taken: a declared capacity bound answered by a typed
  rejection in **both** lowerings (the depth bound's idiom), or growing regions — a `src/css/**` write
  and a G-5 re-run.
- **ESC-e2** — L-13's letter unmet by construction (5 of 6); only a post-return re-harvest can read six.
- Carried unmoved: F-a.6 · E-1/E-2/E-3 · ESC-c1 · ESC-d1 · ESC-d2.

#### e.6 — Findings (F-e1..F-e14, each with an owner — the table is `W3-CLOSE.md` §7)

F-e1 dimension-merge MIS_ACCEPT (MAJOR, grammar/X.P.W4) · F-e2 unrowed legacy-`hsl` divergence
(MAJOR, `.d`-emitter/X.P.W4) · F-e3 ADJ-3/S-2 REJECT half not spec-backed, citation wrong (MAJOR) ·
F-e4 shared hue non-normalization (MINOR) · **F-e5 shield load-bearing (HIGH = ESC-e1)** · F-e6 JS
memory ceiling (INFO) · F-e7 regeneration drops §6.1 (MINOR) · F-e8 `.d` d.3 tallies not reproducible
(MINOR) · F-e9 vacuous `lab` witness (MINOR) · F-e10 the shield is a third, live fallback arm C-4 does
not count (MAJOR, rides E-2) · F-e11 K.7(i) third firing + 65 stubs + 130 flags (MINOR, orchestrator
addendum-beside) · F-e12 L-13 5/6 (MINOR) · F-e13 the draft's corrections (INFO) · F-e14 no
`r1-anchor-before.txt` exists; the BEFORE lives in B.1 / `W3.md` §6 (INFO).

#### e.7 — E13 and the standing invariants, at this seat's clock

Four paths swept read-only (14:39 EDT), classification from each row's **Status cell**: `V/coordination`
newest `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (ours, O-28) · `../glass-ui/docs/tranches/BK/`
(**BK newest**) newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` — rowed **I-35**, Track B's, its
Routing cell says so · keyframes `VALUEJS-INBOUND-…-o8-o11-…` ours · atlas P-lane newest 08-03, rowed.
⟨cmd⟩ `grep -o '^| I-[0-9a-z]*' INBOX.md | sort -u | wc -l` → **37**. Status cells reading UNREAD: I-30 ·
I-31 · I-32 · I-33 · I-34 · I-35, each re-read row by row, **none X·P's** (their own Routing cells:
*"No X·P wave, no X·P act"*, *"Glass is READ-ONLY always"*, *"Not X·P's"*, *"Track B"*). **0 unrowed
value-addressed · 0 new `I-n` · 0 UNREAD in X.P.W3.e's scope.** `INBOX.md` is dirty with a sibling's
hunk and is **not in this unit's writable set** — no sweep line was appended there; this paragraph is
the sweep's receipt. This seat minted no mail and wrote zero bytes in any producer tree.

**Format cadence (§7).** Prettier checked, deliberately not applied to this record (it already warns
before this append; `--write` would rewrite five other seats' receipts). `git diff --check` clean on
this seat's hand-written files. Gate 27 ⟨cmd⟩ `git status --porcelain -- src api demo test e2e | wc -l`
→ **12**, all the concurrent X·V W1.a seat's (`.d`'s addendum-beside measured the same twelve); this
unit's value.js write set is `docs/tranches/**` exactly. `/Users/mkbabb/Programming/parse-that`,
`~/Documents/Codex/**`, `~/.codex/**`, `../glass-ui/**`, `../keyframes.js/**`, `../fourier-analysis/**`
and `<p2>` carry **no byte** from this unit.

**Verbs.** IMPLEMENTED **not stamped by this seat** (gates not green; the orchestrator's §9 close
commit is the stamping act, X.P.W2's `complete_with_misses` precedent theirs to apply or refuse);
VERIFIED is X.P.W4's alone (R-A). Status returned: **PARTIAL** — the unit's own acts are complete
(close report, adjudication, chain, carve), its L-13 sub-gate reads RED by construction, and ESC-e1
is returned rather than cured.

**Addendum-beside to X.P.W3.e, same sitting (E-3; nothing above is rewritten).** e.4 row 4 said the
LEDGER hunks would be staged *"through a temporary index"*. Measured immediately before staging, the
sibling X-W1 and F.W1 hunks had already been committed by their seats (`767c62c3` 14:31 · `c9f1b1e4`
14:27), so ⟨cmd⟩ `git diff -- docs/tranches/X/execution/LEDGER.md` contained **exactly this seat's two
hunks** (the row cells at L81, the timeline line at the end) and ⟨cmd⟩ `git diff --cached --stat` → empty.
A plain pathspec commit therefore swept nothing and **no temporary index was used**: the ledger landed
as **`d166abc5`** (`1 file changed, 3 insertions(+), 1 deletion(-)`), the receipt as **`984d2c27`**.
The unit's value.js commits are four: `313d5bac` · `c2bc7f5a` · `984d2c27` · `d166abc5`, each
`git branch --contains` → `* tranche-u`. Final state at 14:5x: this unit's whole writable set clean in
`git status`; `<p2>` → `?? .worktrees/` alone; `scripts/dev/dev.sh` ` M`, unstaged, untouched.

---

## Close

**SERVED MODEL: claude-opus-5[1m]** · X.P.W3 **VERIFY-ONLY close seat** (Track D, X·P) ·
2026-09-18 **14:4x–15:1x EDT**, this seat's own clock; the sitting's date of record stays
**2026-09-17**. This seat **cured nothing**: it wrote no byte in `<p2>`, opened no unit's file, and
moved no gate. Everything below was **re-measured here** — no AFTER reading is inherited from `.e`,
from `W3-CLOSE.md`, or from any unit receipt. `W3.md` read WHOLE (673 L); this record read whole;
`W3-CLOSE.md` read; the spec's own §6 commands run verbatim.

**CRASH-RECOVERY, first act.** ⟨cmd⟩ `git status --porcelain` in both repos before any other act.
Inside this seat's writable set (`execution/D/X-P-W3.md` · `execution/LEDGER.md`) — **nothing
dirty, no predecessor residue, nothing inherited**. Outside it and never touched: ten `demo/**` +
two `e2e/**` rows (the concurrent X·V W1.a seat's), `CARRY-LEDGER.md`, the untracked Track-A/C
evidence dirs, and `scripts/dev/dev.sh` (` M`, unowned, unstaged, **never opened**). `<p2>`:
`?? .worktrees/` alone, before and after every run this seat made.

### C.1 — The ten gates, BEFORE → AFTER **at this close seat's own clock**

BEFORE is the open's §Baseline (read-only, 00:1x, not re-taken — R.3/R2.3). AFTER is **this seat's
own run** at `<p2>` `dc52ed5`, every gate run **at least twice**, every generated artefact
regenerated to the scratchpad and compared by sha256 to the committed bytes.

| gate | BEFORE (open) | AFTER (this seat, re-run, ×2+) | verdict |
|---|---|---|---|
| **G-1** UNIVERSE-52-TOTAL | generator ABSENT · **0 of 52 TOTAL** | ⟨cmd⟩ `node typescript/scripts/css-universe.mjs --check --pinned-value-commit 6aca8602…` → `tally runtime 0 TOTAL / 3 PARTIAL / 16 ABSENT · types 5 / 0 / 28 · ALL 5 of 52 TOTAL` · `tsc exit 2 · diagnostics attributed 56 · unattributed 0` · `RED — 47 of 52 rows are not TOTAL` · **EXIT=1**, the two runs **byte-identical**; `--emit` → sha256 `0005f26b10b0…98de` **== the committed `universe-52.json`** | **RED** — F-a.6 |
| **G-2** R1 ANCHOR, ZERO THROWS | **324 / 1548 · 1 mode · 4 of 9 RED** | ⟨cmd⟩ `shasum -a 256 …/probes/r1-published-totality.mjs` → `77678a574d7c…d4ec` (**unmodified**) ; ⟨cmd⟩ `node …/r1-published-totality.mjs` → `TOTAL 324 throws / 1548 calls · DISTINCT FAILURE MODES: 1 · RED`, **EXIT=1**, ×2 identical; ⟨cmd⟩ `git status --porcelain -- …/audit/probes/` → **(empty) before AND after** | **RED, structural** — ESC-d2 |
| **G-3** TYPED RECOVERY AT THE BOUNDARY | **10/10** empty-body heads throw `TypeError` | this seat's **own** probe (scratchpad, read-only, ×2): `G-3 heads js/wasm empty-body throws: 0/10 · undefined 0 · bad-shape 0 · codes [css_syntax]` · `G-3 boundary js/wasm 36 cells each · throws 0 · undefined 0 · distinct shapes 1` = `{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]}` · `G-3 R1 js/wasm parseCssColor("oklch()")` → `css_syntax [6,7) ["<number>","<none-keyword> ('none')"] actual ")"`, **identical in both** · `SHIELD.caught after G-3 legs: 0` · suites `boundary` 77 ✓ · `no-throw` 19 ✓ | **GREEN on every leg its command runs — NOT reported green.** The proof leg *"the shield is non-load-bearing"* is **REFUTED at this seat too** (C.3), and G-3's own falsifier then fires on the Wasm lowering |
| **G-4** UNION CLOSED, NO FALLBACK | checker ABSENT | ⟨cmd⟩ `node scripts/css-recovery-closure.mjs --corpus test/css-recovery/corpus.json --frozen-union c654824e:src/css/types.ts` → `corpus 685 inputs` · `executed 4158 calls · 3710 rejections · 3744 issues` · **C-1 GREEN** (288 sites, outside 0) · **C-2 GREEN** · **C-3 RED** `frozen \ emitted = 5 [animation_option_invalid keyframe_selector_invalid syntax_descriptor_invalid syntax_mismatch timeline_option_invalid]` · **C-4 RED** `authored 0 · inherited 2` · C-5…C-10 GREEN · `CTRL ×6 fires` · **EXIT=1**, ×2; `--out` sha256 `25fa6a4b0865…9240` **== committed** | **RED** — E-1 · E-2 (+ F-e10) |
| **G-5** DUAL-TARGET IDENTITY | comparator ABSENT (subject exists) | ⟨cmd⟩ `node scripts/css-dual-target-identity.mjs --js src/css/build/ac1.js --wasm src/css/build/ac1.wasm --corpus test/css-totality/corpus.json` → `cells 79674 · six-tuple differing cells 0 (differing bytes 0) · full-diagnostics differing 0 · value differing 0 · cells where a target threw 0` · `GREEN` · **EXIT=0**, ×2; `--out` sha256 `b68bab94c01c…6216` **== committed** | **GREEN on its command.** Beyond the corpus the two targets **part on VALID input** — C.3, ESC-e1 |
| **G-6** SPEC CONFORMANCE ROWS | suite ABSENT | ⟨cmd⟩ `npx vitest run --config test/css-totality/vitest.config.ts` → `spec-conformance.test.ts (13 tests)` ✓ · `universe.test.ts (59 tests)` ✓ · **`Tests 72 passed (72)`**, ×2 | **GREEN** |
| **G-7** EQUIVALENCE FLOOR, FULL SURFACE | harness + ledger ABSENT | ⟨cmd⟩ `node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…` → `oracle value.js-4.0.0.tgz — 37290 B · sha256 7f80658ca4e1…03ae` · `taxonomy UNMOVED · 554c2993cebd3ed3` · `parseCssColor 4027 · parseTimingFunction 170 · parseStylesheet 1693` · `rows 52 · COMPARED 8 · NO-PEER 44` · **`MIRROR-DEFECTS 5890 (spec-undecided 3982)`** · **EXIT=1**, ×2; suite `Tests 1 failed \| 23 passed (24)`; ⟨cmd⟩ `--cross-check-ledger …/DIVERGENCE-LEDGER.md` → `rows 16 adjudicated conflicts, 0 not carried · GREEN`, **EXIT=0**; `--out` sha256 `d03b458c0f09…1595` **== committed** | **RED at 5,890** — ESC-d1 |
| **G-8** LABELS, UNARMED, SILENT | suite ABSENT | `C-7 3744 issues · unnamed first expectations 0` · `C-8 isDiagnosticsEnabled() before=false after=false` · `C-9 executed writes 0 · authored call sites 0` · ⟨cmd⟩ `node scripts/css-recovery-closure.mjs --assert-no-console` → `GREEN — 2 of 2 legs green` **EXIT=0**, ×2 · `labels.test.ts` 11 ✓ | **GREEN** |
| **G-9** BOUNDED BY CONSTRUCTION | cliff 7,761/7,762; one-way latch | ⟨cmd⟩ `npx vitest run --config test/css-recovery/boundary/vitest.config.ts` → `Tests 2 failed \| 116 passed (118)`, ×2 identical: `depth.test.ts` **15 ✓** (both lowerings), `latch.test.ts` **5 ✓ / 2 ✗** — `expected false to be true` at `latch.test.ts:157`, `reading.symmetric` | **depth GREEN · latch RED** — ESC-c1 |
| **G-10** BENCH TABLE, BAR OWNER-GATED | table ABSENT | ⟨cmd⟩ `node scripts/css-bench-three-leg.mjs --baseline-tarball …/value.js-4.0.0.tgz --rounds 40 --discard 10 --denominator 1636680` → three legs · **9 rows, arm-state on every row** (`UNARMED — before & after`) · `sink 580440` · budgets **against 1636680 µs only** · `contradiction C-1 … NOT RECONCILED AND NOT ERASED` · `BAR: OWNER-GATED-PENDING-RATIFICATION` · `VERDICT: none` · `well-formedness OK` · **EXIT=0**, ×2; ⟨cmd⟩ `… --denominator 1870633` → `REFUSED … VOID`, **EXIT=2** | **WELL-FORMED, NO VERDICT** (§0j.E OC-1) |

**Tally at this seat's clock: 4 GREEN (G-5 · G-6 · G-8 · G-10-well-formed) · 1 GREEN-on-command
with its proof leg REFUTED (G-3) · 1 SPLIT (G-9 depth GREEN / latch RED) · 4 RED (G-1 · G-2 · G-4 ·
G-7).** This is **identical, gate for gate and figure for figure, to `.e`'s reading** — and it was
derived independently, from the spec's commands, not read off the close report. **The hard gate's
ten conditions are NOT all met.** Six of ten moved off their born-RED baselines by construction;
four did not, and two of the four (G-2, G-7) are RED for reasons no byte this wave may write can
cure.

### C.2 — §8 Verification Artefacts, run as written

| §8 artefact | present? | this seat's reading |
|---|---|---|
| `evidence/W3/universe-52.json` **+ sha256 sidecar** | file **YES** (155,452 B) · **sidecar NO** | regenerated `0005f26b10b0…98de` — **sha256-equal**. ⟨cmd⟩ `ls evidence/W3/ \| grep -i sha` → nothing. **§8 row 1 names a sidecar file and none exists** (F-z1, below) |
| `evidence/W3/r1-anchor-before.txt` | **ABSENT** | F-e14, re-confirmed here. The BEFORE lives in this record's B.1 and `W3.md` §6 — a real reading, in the wrong file |
| `evidence/W3/r1-anchor-after.txt` | YES (7,245 B) | present |
| `evidence/W3/recovery-closure.json` | YES (17,318 B) | regenerated `25fa6a4b0865…9240` — **sha256-equal** |
| `evidence/W3/dual-target-identity.json` | YES (8,059 B) | regenerated `b68bab94c01c…6216` — **sha256-equal** |
| `evidence/W3/equivalence-full-surface.json` | YES (463,739 B) | regenerated `d03b458c0f09…1595` — **sha256-equal** |
| `evidence/W3/bench-three-leg.md` | YES (16,916 B) | present; the table's form re-run above |
| `DIVERGENCE-LEDGER.md` | YES (66,080 B) | `--cross-check-ledger` **GREEN, 16 / 0 not carried** |
| `waves/W3-CLOSE.md` | YES (56,284 B) | 553 L; ten gates pasted with commands, exit codes and outputs; three named refutation attempts with outcomes |
| `registry/harvest/x-p-w3.json` | YES (129,579 B) | seat list non-empty, **5 of 6** dispatched — RED under L-13's letter (ESC-e2) |
| commit hashes, both roots | YES | C.4 |

**All four generated JSONs regenerate byte-for-byte at an independent seat, hours later, on a box
four tracks share.** That determinism is this close's strongest positive reading and it is stated
as such: the REDs above are the measurement, not the noise.

### C.3 — ESC-e1 re-measured **independently at this seat** (the wave's load-bearing finding)

`.e`'s R-iii is the one claim a close seat must not take on report, because it is the claim that
turns G-3 and G-5 from green into routed. This seat wrote its own probe and ran it:

```
⟨cmd⟩ node <scratch>/close-g3-probe.mjs        (read-only; <p2> clean before and after)
ESC-e1 stylesheet {"rules":8190,"bytes":98280,"js":"ok:true","wasm":"ok:true"}         SHIELD.caught= 0
ESC-e1 stylesheet {"rules":8191,"bytes":98292,"js":"ok:true","wasm":"ok:false css_syntax"}  SHIELD.caught= 1
```

**CONFIRMED, at the bytes, by a seat that did not author the claim.** On a **VALID** 98,292-byte
stylesheet — 8,191 repetitions of `a{color:red}` — the JS lowering answers `ok:true` and the Wasm
lowering answers `ok:false css_syntax`, **and `SHIELD.caught` steps 0 → 1 on exactly that input**,
which is the shield firing. The cap is real in the bytes: ⟨cmd⟩
`grep -rn 'MARK_CAP\|INPUT_CAP' src/css/lowering-wasm/` → `layout.mjs:41 MARK_CAP = 32768` ·
`layout.mjs:22 INPUT_CAP = 0x100000` · `index.mjs:266` throws on the input cap.

Three consequences, none of them this seat's to rule:

1. **G-3's proof leg is refuted.** The retained guard is **load-bearing** on one of the two
   targets, so the gate's own falsifier — *"a masking fallback fails the gate by inspection of the
   entry module"* — fires. G-3 is **not** reported green.
2. **G-5's intent falls beyond its corpus.** The comparator reads 0 differing bytes over 79,674
   cells and the two targets still **diverge on valid input** one step past the corpus's size band.
   `W3.md` §3a routes a G-5 divergence *"rooted in the Wasm numeric or memory model"* to X.P.W1/W2
   as an **architecture question, not a patch here** — and this seat took no patch.
3. **X.P.W4's adoption seam inherits it.** Totality that rests on a `catch` is not the totality
   §2a defines. The cure shape is stated and **not taken**: a declared capacity bound answered by a
   **typed rejection in both lowerings** (the depth bound's own idiom, `bounds.mjs`), or regions
   that grow — either is a write under `<p2>/typescript/src/css/**`, in **no unit's set at this
   close**.

### C.4 — Commit roster, verified by `git log` / `git show --stat` at this seat

**`<p2>` — 15 commits**, every path inside §4's first table row or a cited grant:

| unit | commits |
|---|---|
| `.0` | `8d8ebc6` (ALGEBRA addendum, both homes) · `1857c9b` (OP-7 re-point + D-c1, **one act**) · `4d8dae4` · `7be817c` (E-6 `engines.mjs`, §0n.4's own grant) · `a35e3c5` (D-i2 `coverage-52-report.mjs`) · `57ddc96` (R-i1) |
| `.b` | `39503f8` (`codes/diagnostics/lower.mjs`) · `1cfa29b` (closure gate + suite) · `f666b6f` |
| `.a` | `bd10e5c` (universe generator + `test/css-totality/**`) |
| `.c` | `f14f59f` (`entry.mjs` · `bounds.mjs` · `test/css-recovery/boundary/**`) |
| `.d` | `d8d7169` (equivalence + vendored tarball) · `2e1b006` (G-5 comparator) · `dde249d` (G-10) · `dc52ed5` |

**value.js — 24 commits**, every one docs-only:

| unit | commits |
|---|---|
| `.0` | `641ba4db` |
| `.a` | `6021105a` **(STRANDED — see C.5)** · `12564399` (re-land) · `007d3820` · `d7eb2e33` · `d500e1e4` |
| `.b` | `3c002f1c` **(STRANDED)** · `f7954997` (re-land) · `2456033b` · `27ed1e49` |
| resume | `29fcc39c` |
| `.c` | `31f65d56` · `8a21ea8c` · `41220892` |
| `.d` | `0e9bac30` · `3a9baee4` · `5545d284` · `90ab2d1a` · `861941c2` |
| `.e` | `313d5bac` · `c2bc7f5a` · `984d2c27` · `d166abc5` · `422537b8` |

**Bounds: 0 landed-wrong PATHS.** ⟨cmd⟩ `git show --pretty=format: --name-only` over all 39
commits: every value.js path is under `docs/tranches/X/**` or the two `docs/tranches/V/megatranche/
registry/**` rows §4 names for `.e`; every `<p2>` path is under §4's admitted globs or under a
**cited** COHESION grant (`harness/bench/lib/engines.mjs` ← §0n.4; `harness/w2/coverage-52-report.mjs`
← K.8 D-i2; the three dated addenda ← §0n.3/§0n.4/E-3). **No commit touches
`/Users/mkbabb/Programming/value.js/src/**`** (§9's own prohibition), none touches
`/Users/mkbabb/Programming/parse-that/**`, and **`scripts/dev/dev.sh` appears in 0 of the 39**.
Gate 27 at this seat reads **12** — all of them the concurrent X·V W1.a seat's `demo/**` + `e2e/**`
bytes, none this wave's, exactly as `.a`'s and `.d`'s addenda measured.

### C.5 — Landed-wrong, found and named here (branch, not path)

**Two of the wave's commits are not reachable from `tranche-u` or `master` at all.** ⟨cmd⟩
`git branch --contains`:

```
3c002f1c:   x-w1-falsifier-g7          ← .b's first evidence commit
6021105a:   x-w1-falsifier-g7          ← .a's first evidence commit
f7954997: + master* tranche-u          ← .b's re-land
12564399: + master* tranche-u          ← .a's re-land
```

A sibling track's seat had the scratch branch `x-w1-falsifier-g7` checked out in the **shared**
value.js worktree, and for that window every seat's commit went there. The four-track pathspec
discipline does not defend against it — **the pathspec was correct; the branch was not.** The cure
used no forbidden instrument (no reset, rebase, cherry-pick, stash or force-push): both files were
re-landed by their own pathspec, and this seat verified the re-landed blobs are **byte-identical**
to the stranded ones (`0005f26b…` and `25fa6a4b…`, `git show <sha>:<path> | shasum -a 256`, both
pairs equal). **Nothing was lost and nothing is wrong in the tree** — but the two commits remain on
a branch nobody will read, so they are recorded here as landed-wrong and disclosed rather than
tidied away. Already disclosed by `.b` at `27ed1e49` (F-b5) and referenced by `.a` at `d500e1e4`
(F-a.7); this close confirms it at the bytes and raises it to the wave's own record.

**The LEDGER's commit cell was incomplete** — it carried `.a`/`.c`/`.d`/`.e` and omitted `.0`,
`.b`, the resume commit and eight later hashes. Repaired by this close (C.7), in place, on this
wave's row only.

### C.6 — E13, swept a fourth time at this seat's own clock (14:55 EDT)

Four paths, read-only, classification from each row's **Status cell**, never a bare `grep -i
unread`. (1) `docs/tranches/V/` + `V/coordination/` — newest `valuejs-outbound-2026-09-18-kfw7-bh-
relay.md`, **ours** (O-28). (2) `../glass-ui/docs/tranches/` — ⟨cmd⟩ `ls -dt …/tranches/*/ | head -3`
→ `BK/ · BJ/ · BI/`, **BK re-confirmed newest**; newest file `glass-outbound-2026-09-18-valuejs-o26-
reply.md`, rowed **I-35**. (3) `../keyframes.js/docs/tranches/V/coordination/` — every
`VALUEJS-INBOUND-*` is ours. (4) `../sci-report/atlas/docs/tranches/P/coordination/` — newest
`valuejs-inbound-2026-07-27-…`, rowed.

⟨cmd⟩ `find <the four paths> -type f -newermt '2026-09-18 14:39'` → **exactly one file**, I-35's,
already rowed. ⟨cmd⟩ `grep -o '^| I-[0-9a-z]*' INBOX.md | sort -u | wc -l` → **37**. Status cells
reading **UNREAD**: I-30 · I-32 · I-33 · I-34 · I-35 — each Routing cell read here in full, and each
routes **away** from X·P in its own words: *"No X·P wave…"* (I-32), *"Not X·P's, not a value.js act
today"* (I-34), *"Glass is **READ-ONLY always** — producer rows ride SS-6, never frontend hacks"*
(I-33), *"X·KF (Track B), NOT X-W1"* (I-35), and I-30's *"no reply owed"*.

**0 unrowed value-addressed · 0 new `I-n` minted · 0 UNREAD in X.P.W3's scope. This wave does not
close with unread mail.** `INBOX.md` is outside this seat's writable set and carries a sibling's
uncommitted hunk; no sweep line was appended there — this paragraph is the sweep's receipt.

### C.7 — Residuals, each with a named owner

| id | severity | residual | owner |
|---|---|---|---|
| **ESC-e1** / F-e5 | **HIGH** | the retained shield is **load-bearing** on the Wasm lowering; the two targets diverge on valid input at 8,191 rules / 1,048,577 code units. Confirmed independently at C.3 | **X.P.W1/W2** (architecture) · **X.P.W4** (adoption must not rest totality on a catch) · the contract's owner |
| **ESC-e2** / F-e12 | MINOR | L-13 harvest reads **5 of 6** by construction — `.e` is structurally absent from its own harvest (W0 R-3 / W1 R-3, third reproduction). Only a post-return re-harvest reads six | orchestrator |
| **ESC-c1** | MAJOR | `resetPackrat()` clears the memo store and does **not** disarm; `symmetric:false`. G-9's latch leg RED | X.P.W4 / the parse-that library seam |
| **ESC-d1** | MAJOR | G-7 RED at **5,890** mirror-defects over 8 compared rows (3,982 spec-undecided) | X.P.W4 · X·V |
| **ESC-d2** | MAJOR | G-2 RED **structurally** — the probe packs the **incumbent**, of which this wave writes zero bytes by law. Its GREEN is unreachable from inside X·P | X·V (the incumbent's owner) |
| **F-a.6** | MAJOR | G-1 RED at **5 of 52** — 44 exports have no implementing seat in this wave and 3 are PARTIAL. One pass, monotone rise 0 → 5, **no §3a halt** | X.P.W4 scope |
| **E-1 / E-2** (+F-e10) | MAJOR | G-4's ⊇ direction RED (5 codes unemitted, being the vocabulary of entries the candidate does not realize) and 2 inherited fallback arms; the shield is a **third**, live arm C-4's inspection does not count | X.P.W4 |
| **F-e1 · F-e2 · F-e3** | MAJOR | dimension-merge MIS_ACCEPT; the unrowed legacy-`hsl` divergence; ADJ-3/S-2's REJECT half not spec-backed with a wrong citation | grammar / `.d`'s emitter / X.P.W4 |
| **F-e8** | MINOR | `.d`'s d.3 pastes `COVERAGE_NARROWING 2320 · FIXTURE_R1 4585 · DECLARED_DIVERGENCE 15`; the settled program and `.d`'s own committed evidence print **84 · 211 · 0**. Re-confirmed here. A record transcription defect; the gate's counts are unaffected | `.d`'s author, dated addendum-beside |
| **F-e11** / K.7(i) | MINOR | the harvester writes **143** files per run (94 NEW + 2 CHANGED) outside every W3 bound and rewrites `DEFECT-LEDGER.md` wholesale; `W3.md` §4's *"writes only the two registry rows"* is wrong. Third firing. Wants a **dated addendum-beside, never a spec patch** | orchestrator |
| **F-e14** | INFO | `evidence/W3/r1-anchor-before.txt` does not exist; §8 names it. The BEFORE reading is real and lives in B.1 / `W3.md` §6 | orchestrator, addendum-beside |
| **F-z1** *(new, this close)* | INFO | §8 row 1 names a **sha256 sidecar** for `universe-52.json`; ⟨cmd⟩ `ls evidence/W3/ \| grep -i sha` → nothing. The hash is recoverable (`0005f26b10b0…98de`, regenerated here) but no sidecar file was written | orchestrator, addendum-beside |
| **F-z2** *(new, this close)* | MINOR | two wave commits stranded on `x-w1-falsifier-g7` (C.5). Re-landed byte-identical; the **operational** row stands: a seat that checks out a scratch branch in the shared worktree silently redirects every other seat's commits | orchestrator (standing operational law) |
| **R-2** | INFO | `<p2>` **has no git remote** — ⟨cmd⟩ `git -C <p2> remote -v` → empty. The fresh root's history is local by construction; the LEDGER already carries this at the X.P.W1 row (*"in `<p2>` (no remote, R-2)"*). **The close's push instruction is therefore satisfiable in value.js only**, and this is measured, not assumed | standing |

### C.8 — Verbs: what this close stamps, and what it refuses to

`W3.md` §2's four-verb table and §12: **IMPLEMENTED** is stamped by *"gates green + bytes landed in
the fresh root"* (R-A); **VERIFIED is X.P.W4's sub-tranche release close alone — never this wave's**
(R-A, restated at §9 and §12).

| verb | value | moved here? |
|---|---|---|
| AUDITED | **YES** | no — unchanged |
| SPECIFIED | **YES — 2026-08-03** | no — unchanged |
| IMPLEMENTED | **NO** | **NOT stamped.** Four gates are RED, G-9's latch leg is RED, and G-3's proof leg is refuted with ESC-e1 open. The spec's condition is *gates green*; they are not. Stamping it would be the one dishonesty this wave's own §6 exists to prevent |
| VERIFIED | **NO** | no — **X.P.W4's alone** (R-A) |

**This wave moves no verb.** It lands its mechanism, moves six of ten gates off their born-RED
baselines by construction, and returns four REDs, one split and two escalations with their
measurements attached. The wave's status is **PARTIAL**.

**What remains, precisely**: ESC-e1's capacity bound in both lowerings (and the G-5 re-run that
follows it) · G-9's latch symmetry (ESC-c1) · G-4's ⊇ direction, which needs the six unrealized
public entries (E-1) and the inherited arms retired (E-2 + F-e10) · G-1's 44 ABSENT rows (F-a.6) ·
G-7's 5,890 (ESC-d1) · G-2, which **cannot** go green from inside X·P at all (ESC-d2) · and the
L-13 re-harvest that would read six (ESC-e2). Every one has a named owner in C.7. **Nothing is
parked; nothing is averaged; nothing is rounded up.**

---

## Check 1

**SERVED MODEL: claude-opus-5[1m]** · X.P.W3 **FRESH ADVERSARIAL CHECK (L-20, pass 1)** · Track D,
X·P · 2026-09-18, this seat's own clock; the sitting's date of record stays **2026-09-17**. This
seat is **VERIFY-ONLY**: it wrote no byte in `<p2>`, opened no unit's file, moved no gate and
changed no verdict. Every AFTER reading below was **re-derived here from `W3.md` §6's own commands**
— none is read off `W3-CLOSE.md`, off the ## Close, or off any unit receipt. `W3.md` read WHOLE
(673 L); this record read whole; `W4.md` §2 read for the successor conjuncts.

**CRASH-RECOVERY, first act.** ⟨cmd⟩ `git status --porcelain` in both repos before any other act.
Inside this seat's writable set (`execution/D/X-P-W3.md` · `execution/LEDGER.md`) — **nothing dirty,
no predecessor residue, nothing inherited**. Outside it and never opened: ten `demo/**` + two
`e2e/**` rows and `CARRY-LEDGER.md` (sibling seats'), the untracked Track-A/C evidence dirs, and
`scripts/dev/dev.sh` (` M`, unowned, unstaged, **never touched**). `<p2>`: `?? .worktrees/` alone,
**before and after every run this seat made** (re-measured at the end). `/Users/mkbabb/Programming/
parse-that` is dirty by standing arrangement and outside this seat's set entirely — not opened.

### K1.1 — Axis 1: every gate re-run at this seat's own commands. **10 of 10 reproduce.**

| gate | this seat's command | this seat's reading | == the Close's? |
|---|---|---|---|
| **G-1** | `node scripts/css-universe.mjs --check --pinned-value-commit 6aca8602` | `tally runtime 0 TOTAL / 3 PARTIAL / 16 ABSENT · types 5 / 0 / 28 · ALL 5 of 52 TOTAL` · `tsc exit 2 · diagnostics attributed 56 · unattributed 0` · `RED — 47 of 52 rows are not TOTAL` · **EXIT=1**, two runs **byte-identical** (`diff -q` empty) | **YES — RED, to the row** |
| **G-2** | `shasum -a 256` the probe, then run it unmodified | probe `77678a574d7c6b11448b19b6ab8fc0686dddf405a01cd7ea16757bc0837ad4ec` (**unmodified**); `TOTAL 324 throws / 1548 calls` · `DISTINCT FAILURE MODES: 1` · **EXIT=1**; ⟨cmd⟩ `git status --porcelain -- …/audit/probes/` **empty before AND after** | **YES — RED, to the call** |
| **G-3** | this seat's **own** probe, written fresh (scratchpad, read-only) | `empty-body heads (js+wasm, 20 cells): throws 0 · undefined 0 · bad-shape 0 · codes [css_syntax]`; boundary widened by this seat to **11** non-string values × 3 entries × 2 lowerings = **66 cells · throws 0 · undefined 0 · distinct shapes 1** (`{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]}` — incl. `new String("s")`, a boxed object the `typeof` guard must reject, which it does); R1 `parseCssColor("oklch()")` → `css_syntax [6,7) ["<number>","<none-keyword> ('none')"] actual ")"` **identical in both lowerings**; `SHIELD.caught after G-3 legs: 0` | **YES — green on command, proof leg refuted (K1.3)** |
| **G-4** | `node scripts/css-recovery-closure.mjs --corpus test/css-recovery/corpus.json --frozen-union c654824e:src/css/types.ts` | `685 inputs` · `4158 calls · 3710 rejections · 3744 issues` · C-1 GREEN (288 sites, outside 0) · C-2 GREEN · **C-3 RED** `frozen \ emitted = 5` · **C-4 RED** `authored 0 · inherited 2 · measured DEAD: far.code === null on 0 of 3710` · C-5…C-10 GREEN · `CTRL ×6 fires` · **EXIT=1** | **YES — RED** (and see K1.4 F-k1 on the operand) |
| **G-5** | `node scripts/css-dual-target-identity.mjs --js src/css/build/ac1.js --wasm src/css/build/ac1.wasm --corpus test/css-totality/corpus.json` | `cells 79674 · six-tuple differing 0 (differing bytes 0) · full-diagnostics 0 · value 0 · threw 0` · `GREEN` · **EXIT=0** | **YES — GREEN on its command** |
| **G-6** | `npx vitest run --config test/css-totality/vitest.config.ts` | `spec-conformance.test.ts (13)` ✓ · `universe.test.ts (59)` ✓ · **`Tests 72 passed (72)`** · EXIT=0 | **YES — GREEN** |
| **G-7** | `node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602` + `--cross-check-ledger` | oracle `value.js-4.0.0.tgz — 37290 B · sha256 7f80658ca4e1…03ae` · `taxonomy UNMOVED · 554c2993cebd3ed3` · `rows 52 · COMPARED 8 · NO-PEER 44` · **`MIRROR-DEFECTS 5890 (spec-undecided 3982)`** · **EXIT=1**; ledger cross-check `rows 16 adjudicated conflicts, 0 not carried · GREEN`, EXIT=0 | **YES — RED at 5,890, to the digit** |
| **G-8** | `node scripts/css-recovery-closure.mjs --assert-no-console` | `C-7 3744 issues · unnamed first expectations 0` · `C-8 isDiagnosticsEnabled() before=false after=false` · `C-9 executed writes 0 · authored call sites 0 · inherited 1 (unguarded 0) · strict letter: 1 call site` · `GREEN — 2 of 2 legs green` · **EXIT=0** | **YES — GREEN** |
| **G-9** | `npx vitest run --config test/css-recovery/boundary/vitest.config.ts` | `Tests 2 failed \| 116 passed (118)`; `depth.test.ts` **15 ✓** both lowerings; `latch.test.ts` **5 ✓ / 2 ✗** — `expected false to be true` at `latch.test.ts:157`, `reading.symmetric` | **YES — depth GREEN · latch RED** |
| **G-10** | `node scripts/css-bench-three-leg.mjs --baseline-tarball …/value.js-4.0.0.tgz --rounds 40 --discard 10 --denominator 1636680` | three legs · **9 rows, arm-state on every one** (`UNARMED — before & after`) · `sink 580440` · budgets against **1636680 µs only** · `NOT RECONCILED AND NOT ERASED` · `BAR: OWNER-GATED-PENDING-RATIFICATION` · `VERDICT: none` · `well-formedness OK` · EXIT=0; `--denominator 1870633` → **`REFUSED … VOID`, EXIT=2** | **YES — well-formed, no verdict** |

**Tally, derived independently: 4 GREEN (G-5 · G-6 · G-8 · G-10-well-formed) · 1 GREEN-on-command
with its proof leg REFUTED (G-3) · 1 SPLIT (G-9) · 4 RED (G-1 · G-2 · G-4 · G-7).** Gate for gate
and figure for figure this is the Close's reading, and the Close's reading is `.e`'s. Three
independent seats, three clocks, one set of numbers.

**Axis 9 — the published figures, at the bytes.** All four generated artefacts regenerated to this
seat's scratchpad and hashed against the committed bytes:

```
⟨cmd⟩ shasum -a 256 <regenerated> <committed>
0005f26b10b0c9f093466c134c7fc71d472be7d8d6b0bf2809bb83386f2598de   universe-52.json            EQUAL
25fa6a4b08653334ed506a0b38aa690c96fa6e92d500f08473056bd5ebfc9240   recovery-closure.json       EQUAL
b68bab94c01cd2eae24a3b74b0b8096a1bbd30b12d8d75e04233b26dd5686216   dual-target-identity.json   EQUAL
d03b458c0f095c7b201c17ded478fcfcfdf7c53b54f48668450b6c4166e41595   equivalence-full-surface.json  EQUAL
```

Four for four, at a fourth seat, on a box four tracks share. **The record's figures are the
measurement.**

### K1.2 — Axes 2 · 3 · 4 · 5 · 6 · 7: all held

- **Axis 2 (bounds).** ⟨cmd⟩ `git show --pretty=format: --name-only` over all **26** value.js
  commits (the Close's 24 + `649e66e0` + `dd0f64a6`) and all **15** `<p2>` commits. Every value.js
  path is under `docs/tranches/X/**` or the two `docs/tranches/V/megatranche/registry/**` rows §4
  names for `.e`. ⟨cmd⟩ grep of every commit's file list for `^(src/|demo/|api/|e2e/|test/|scripts/
  |package\.json)` → **nothing**. `scripts/dev/dev.sh` in **0 of 41**. In `<p2>`, three paths fall
  outside §4's table and **each carries a cited grant this seat read at the bytes**:
  `harness/bench/lib/engines.mjs` ← COHESION **§0n.4** verbatim (*"landed by **X.P.W3** under a
  dated E-3 addendum to W1's §Bounds, so G-7 has a subject"*); `harness/w2/coverage-52-report.mjs`
  ← COHESION §5's K.8 **D-i2** row; `experiments/w2/contract/ALGEBRA-ADDENDA-2026-09-18.md` ←
  COHESION **§0n.3** verbatim (*"ONE dated addendum-beside to `ALGEBRA.md` (both homes,
  sha256-equal)"*). No commit touches `value.js/src/**` (§9's own prohibition) or
  `/Users/mkbabb/Programming/parse-that/**`. **0 landed-wrong paths.**
- **Axis 3 (masking fallback).** ⟨cmd⟩ over the whole `cdf7975..dc52ed5` diff: **zero** `test.skip`
  / `it.skip` / `describe.skip` / `.only` / `xit` — the only textual hits are prose lines that
  **refuse** those idioms by name. **Zero** bytes under any `node_modules`. Ten added `catch` sites,
  each read here: eight are **instruments that record the throw as data** (`{threw:true, error,
  message}` in `css-bench-three-leg.mjs`, `css-dual-target-identity.mjs`, `oracle.mjs`,
  `matrix.mjs`; tsc's non-zero exit captured to read its diagnostics in `assignability.mjs`; four
  suite catches that push to a `failures[]` array which is then asserted `toEqual([])`) — the
  opposite of masking. **One is load-bearing: the shield at `entry.mjs`** — treated at K1.3, and the
  Close does **not** report G-3 green on it. No allowlist, no copied producer selector, no narrowed
  assertion that is not printed beside its strict letter (C-9 prints both its verdict and
  `strict letter: 1 call site(s)`, naming the site and its guard).
- **Axis 4 (families).** §9's four fresh-root commit titles land **verbatim and whole**: `bd10e5c`
  (`.a`), `39503f8` (`.b`), `f14f59f` (`.c`, all three cures in **one** commit as §5 requires),
  `d8d7169` (`.d`). §9's chain commit lands as **one** commit carrying all three of its paths
  (`c2bc7f5a`: harvest + DEFECT-LEDGER append + COHESION carve) — the family that most invites a
  split did not split. §P.1's own locks hold: `.0` is the first commit in each repo; the ALGEBRA
  addendum's two homes are sha256-equal; D-c1's cure rides the OP-7 re-point in `1857c9b` (*"one
  act, not two"*); `.b`'s frozen-code module (`39503f8`) precedes `.c`'s `entry`/`bounds`
  (`f14f59f`); `.e` writes only after `.d` commits; `.a`'s 16 adjudicated conflicts all appear as
  `.d` rows (`--cross-check-ledger` **GREEN, 0 not carried**). One commit per meaning throughout.
- **Axis 5 (E-3).** ⟨cmd⟩ `git diff --stat 641ba4db^..HEAD -- docs/tranches/V/megatranche/registry/
  adjudicated/ docs/tranches/X/parse-that/waves/W{1,2,3,4}.md docs/tranches/V/megatranche/
  conformance/ docs/tranches/V/apotheosis/ docs/tranches/V/megatranche/coordination/` → **prints
  nothing.** The dated spec, the adjudicated registry, the conformance artifacts and every sibling
  X·P spec are **byte-untouched by this wave**. Every correction rode a dated addendum-beside
  (`W3-ADDENDA-2026-09-18.md`, `W1-ADDENDA-2026-09-18.md`, `ALGEBRA-ADDENDA-2026-09-18.md`). The
  `COHESION.md` carve is **44 insertions / 0 deletions**, inside §5's dated status list. The
  `DEFECT-LEDGER.md` change is **405 / 1**, and the single deletion is the script's own summary
  tally line (7,520 → 7,585) rewritten by `harvest-journals.mjs` — a script's act, never a hand's,
  already disclosed as **F-e11**.
- **Axis 6 (E13 mail).** `INBOX.md` re-swept at this seat from the **Status cell of each row**, never
  a bare grep: 37 `I-n` rows, **5 reading UNREAD** — I-30 · I-32 · I-33 · I-34 · I-35. Each Routing
  cell read here in full, and **each routes away from X·P in its own words**: I-32 *"No X·P wave, no
  X·P act, opens on this row"* · I-33 *"Not X·P's … Glass is **READ-ONLY always**"* · I-34 *"Not
  X·P's, not a value.js act today"* · I-35 *"Nothing here is in X-W1's scope"*, routed to Track B ·
  I-30's obligations are X·F's and X-W0.j's. **0 UNREAD in X.P.W3's scope.** `INBOX.md` is outside
  this seat's writable set and carries a sibling's uncommitted hunk; no line was appended there.
- **Axis 7 (the four-verb line).** `W3.md` §2's table is byte-untouched (axis 5) and the Close moves
  **no verb**: AUDITED YES · SPECIFIED YES · **IMPLEMENTED NO** · VERIFIED NO. §2/§9/§12 stamp
  IMPLEMENTED on *"gates green + bytes landed"*; four gates are RED and one is split, so **refusing
  the stamp is the lawful act** — and VERIFIED is X.P.W4's alone (R-A), correctly untouched. The
  line moved lawfully by not moving.

### K1.3 — ESC-e1 re-measured a third time, by a seat that did not author it

This seat wrote its own probe rather than re-run `.e`'s or the Close's:

```
⟨cmd⟩ node <scratch>/check1-g3.mjs        (read-only; <p2> `?? .worktrees/` before and after)
ESC-e1 {"rules":8190,"bytes":98280,"js":"ok:true","wasm":"ok:true"}         SHIELD.caught= 0
ESC-e1 {"rules":8191,"bytes":98292,"js":"ok:true","wasm":"ok:false css_syntax"}  SHIELD.caught= 1
SHIELD faults: [{"entry":"parseStylesheet","kind":"wasm","error":"Error",
                 "message":"HALT: a journal, the value stack or the arena overflowed its fixed region"}]
```

**CONFIRMED at the bytes, third seat, third clock.** On a **VALID** 98,292-byte stylesheet the JS
lowering answers `ok:true`, the Wasm lowering answers `ok:false css_syntax`, and the answer is the
**`catch`'s**, not the grammar's — `SHIELD.caught` steps 0 → 1 on exactly that input and the fault's
own message names the fixed region. The retained shield is **load-bearing**. G-3's falsifier
(*"a masking fallback fails the gate by inspection of the entry module"*) therefore fires, and the
Close's refusal to report G-3 green is **correct, not conservative**.

Its **relief is the spec's own**, and this seat verifies the routing rather than accepting it:
`W3.md` §3a routes a G-5 divergence *"rooted in the Wasm numeric or memory model"* to **X.P.W1/W2**
as *"an architecture question … not a patch here"*. ⟨cmd⟩ `grep -rn 'MARK_CAP\|INPUT_CAP'
src/css/lowering-wasm/` → `layout.mjs:41 MARK_CAP = 32768` · `layout.mjs:22 INPUT_CAP = 0x100000` —
**fixed regions of the Wasm memory model**, the named direction exactly. The wave took **no patch**,
and the cure shape it states (a declared capacity bound answered by a typed rejection in **both**
lowerings) is a write under `<p2>/typescript/src/css/**` that sits in **no unit's set at close**.
Relieved and owner-named (ESC-e1: X.P.W1/W2 · X.P.W4 · the contract's owner).

### K1.4 — New findings from this pass (register: severity · claim · receipt · cure)

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **F-k1** | **MINOR** | **G-4's spec-literal operand was never run, and the spec's literal command CRASHES today.** `W3.md` §6 G-4 names `--corpus test/css-totality/corpus.json` (`.a`'s 26,604-row union). Every seat, and the Close, ran `--corpus test/css-recovery/corpus.json` (**685** inputs). This record asserts at L196 and L1096 that `.a`'s file **is** *"G-4's named operand"* and *"is written where `.b`'s command looks for it"* — **false at the bytes**; they are two different files and no finding id covers the mismatch | ⟨cmd⟩ `node scripts/css-recovery-closure.mjs --corpus test/css-totality/corpus.json --frozen-union c654824e:src/css/types.ts` → **EXIT=1** with an **unhandled** `TypeError: Cannot read properties of undefined (reading 'length')` at `js-alg.mjs:236`, raised through `runCorpus` at `css-recovery-closure.mjs:357` on the RAW path. Cause read at the bytes: `.a`'s rows key the source as **`s`** (`{"i":0,"s":"rgb()","bands":["ground-a"],"prods":[]}`) while `.b`'s `readCorpus` (`:283`) reads `r.src ?? r.input` — adjacent to, but not the same as, the disclosed **F-c3** (172 rows whose `s` is an object). **Verdict-neutral**: C-3's five codes are unemittable by *any* corpus while six of nine entries are unrealized, and C-4's arms are static, so G-4 is RED under either operand; `.e` independently ran a **40,000-source** two-band closure check over the public entries with 0 codes outside the frozen eight | a dated **addendum-beside** naming the operand actually used and why, plus one line in `readCorpus` accepting the `s` key (and F-c3's object rows) so the spec's literal form runs. **X.P.W4** — not a spec patch, and not this seat's byte |
| **F-k2** | INFO | **F-z1 and F-e14 confirmed standing.** ⟨cmd⟩ `ls -la evidence/W3/` → six files; **no sha256 sidecar** for `universe-52.json` and **no `r1-anchor-before.txt`**, both of which §8 names | the directory listing above; the BEFORE reading is real and lives in this record's B.1 and `W3.md` §6; the hash is recoverable and is re-derived at K1.1 | the orchestrator's dated addenda-beside, already owned at C.7 |
| **F-k3** | INFO | **The stranded pair is confirmed at this seat and nothing is lost.** `3c002f1c` and `6021105a` are reachable from `x-w1-falsifier-g7` **only** | ⟨cmd⟩ `git branch --contains` → `x-w1-falsifier-g7` for both; ⟨cmd⟩ `git show <sha>:<path> \| shasum -a 256` → the re-lands `12564399` / `f7954997` are **byte-identical** (`0005f26b…`, `25fa6a4b…`) | none needed; F-z2's operational law stands |

**Nothing else was found.** No write outside bounds, no split family, no E-3 breach, no unread mail
in scope, no fabricated figure, no gate reported green on a narrative, and no GREEN that fails to
reproduce.

### K1.5 — Axis 10: HONEST-RED ADJUDICATION, gate by gate, at the spec's bytes

**RELIEVED under the spec's own relief — the honest-RED set (4):**

| gate | the relief, cited at the spec's bytes | owner named in the residual register? |
|---|---|---|
| **G-2** (324/1,548) | **Producer-owned.** The probe *packs the incumbent* and witnesses shipped value.js bytes. `W3.md` §4 **Do NOT touch** `/Users/mkbabb/Programming/value.js/src/**`; §9 *"No commit in this wave may contain a path under `value.js/src/**`"*; §3a calls an edit to the incumbent the inversion of the experiment. A consumer-side patch would be the gate failure, not the cure. GREEN is **structurally unreachable** from inside X·P | **YES** — ESC-d2, owner **X·V** |
| **G-9 latch** (`resetPackrat()` does not disarm) | **Out of every §4 row.** The cure is a write under `<p2>/typescript/src/parse/**`, which §4 admits in **no** row (it admits `typescript/src/css/**`) and which `.0`'s dated addendum §A-3 **declines by name**; §3a makes a File-bound expansion a **halt**. Independently, the naive cure is a soundness regression the library argues at `packrat.ts:147-152` (PT-Q1), i.e. an architecture question — the class §3a routes away. The seat **refused** the green-making re-export (`tsImport` does not dedupe) as *"a fake restore of a different latch"* | **YES** — ESC-c1, owner **X.P.W4 / the parse-that library seam** |
| **G-3's proof leg / ESC-e1** (the shield is load-bearing) | **Routed by §3a**: a divergence *"rooted in the Wasm numeric or memory model"* is *"an architecture question for X.P.W1/W2, not a patch here"* — verified at K1.3 (`MARK_CAP` 32,768 · `INPUT_CAP` 0x100000, fixed regions). §5 `.c` also forecloses the alternative here: removal *"is a live option for X.P.W4, not a decision here"* | **YES** — ESC-e1 (HIGH), owners **X.P.W1/W2 · X.P.W4 · the contract's owner** |
| **G-4's no-fallback leg** (2 inherited arms) | **In no unit's set by §4a.** Both arms live in `lowering-{js,wasm}/index.mjs`, which §4a assigns to no unit (`.b` = `{lower,diagnostics,codes}`, `.c` = `entry`/`bounds`); §3a halts a File-bound expansion. Measured **DEAD** — `far.code === null` on **0 of 3,710** rejections, both lowerings. The Wasm arm is compiled **into** `ac1.wasm` and cannot be answered from above | **YES** — E-2 (+ F-e10 for the shield as a third, live arm), owner **X.P.W4** |

**UNRELIEVED — a real defect by the spec's own weight (3):**

| gate | why no relief of the three admitted kinds exists | severity |
|---|---|---|
| **G-1** — 5 of 52 TOTAL | Not producer-owned (the candidate is the subject, in a root this wave writes). **Not routed to a successor by the spec**: §3 item 2 orders *"Drive every runtime export to TOTAL"* and §2a makes it the wave's **goal criterion**; X.P.W4's §2 makes *"the 52-export universe TOTAL"* a **precondition it inherits**, not a task it is given. Not an honest-RED the spec names by id. The wave measured the true cause — **F-a.6**: §5 assigns G-1's *measurement* to `.a` and the *implementation* of the 16 absent runtime + 28 absent type rows **to no unit** — but a §5 dispatch gap is a spec defect, not a relief for the gate | **CRITICAL** |
| **G-7** — 5,890 mirror-defects | The gate's own floor is *"zero MIRROR-DEFECTs … across all 52 exports"*. §3a routes only a **newly discovered incumbent defect (a sixth R-class)** to X·V; 5,890 over 8 compared rows (3,982 spec-undecided) is not that, and 44 rows have **NO-PEER** at all — a coverage absence, not a routed finding. `--cross-check-ledger` GREEN proves the 16 adjudicated conflicts are rowed; it does not relieve the 5,890 | **HIGH** |
| **G-4's ⊇ leg** — 5 of 8 codes unemitted | Same root as G-1: the five codes are the diagnostic vocabulary of the six public entries the grammar does not realize. The cure is six more entries in `algebra/grammar.mjs`, a file §4a assigns to no unit — but §4's table **does** admit `typescript/src/css/**`, so this is a dispatch gap, not a bounds wall. §3a's halt returns it; it does not own it | **HIGH** |

**Axis 8 — the spec's own goal criterion, at the bytes: NOT MET.** §2a asks two things. (i) *"no CSS
string … makes the candidate parser do anything other than return a typed result"* — true for the
three realized entries over the corpus (0 throws, 0 `undefined`), **but** the other six public
entries are **absent from the surface** (`UNREALIZED_ENTRIES`, honestly named rather than stubbed),
and on the Wasm target a **valid** 98,292-byte stylesheet is answered by the `catch` (K1.3). (ii)
*"the 52-export contract … covered by name and shape rather than approximated"* — **5 of 52**.
The criterion is unmet at the bytes, not merely at the gates.

### K1.6 — Successor conjuncts: X.P.W4's "Opens after", measured against this wave

`W4.md` §2: *"**Opens after**: X.P.W3 IMPLEMENTED (the 52-export universe TOTAL, the R1 throw class
dead, the equivalence floor held, the divergence ledger written, the three-leg table published). The
dependency is on those artefacts, not on the label."*

| conjunct | state at this seat's clock |
|---|---|
| the 52-export universe **TOTAL** | **FALSE** — 5 of 52 (G-1) |
| the R1 throw class **dead** | **PARTIAL** — R1 itself is a typed rejection in both lowerings and the corpus is throw-free, but the Wasm answer at 8,191 valid rules is the shield's (ESC-e1) |
| the equivalence floor **held** | **FALSE** — 5,890 mirror-defects (G-7) |
| the divergence ledger **written** | **GREEN** — 66,080 B, 29 rows, `--cross-check-ledger` GREEN 16 / 0 not carried |
| the three-leg table **published** | **GREEN** — `bench-three-leg.md`, 9 rows with arm-state, `BAR: OWNER-GATED-PENDING-RATIFICATION`, well-formedness OK, the 1,870,633 denominator REFUSED |

**X.P.W4 is LAWFULLY BLOCKED — 2 of 5 conjuncts GREEN, 2 FALSE, 1 PARTIAL, and the label
(IMPLEMENTED) is unstamped.** §2b of `W4.md` checks each as an open-precondition, and `W3.md` §10
states *"X.P.W4 cannot be authored around a missing W3"*. No successor is unblocked by this wave, and
none is blocked unlawfully.

### K1.7 — Verdict

**NOT-CONFORMANT**, on axis 10 and axis 8 alone. To be exact about what that does and does not say:

**What it does not say.** It is **not** a finding against the Close, and **not** against any unit
seat. This seat re-ran all ten gates from the spec's own commands and **10 of 10 reproduce**; all
four generated artefacts regenerate **sha256-equal**; bounds are clean over 41 commits with every
out-of-§4 path carrying a grant read at the bytes; E-3 prints empty; the commit families are whole;
mail is clean; `scripts/dev/dev.sh` is in zero commits; and the one load-bearing `catch` in the tree
is the spec-permitted shield, whose permission condition the wave **itself refuted, published, and
escalated** rather than leant on. The Close reports **PARTIAL**, moves **no verb**, and names an
owner for every residual. Measured against its own record, this is one of the more honest closes in
the tranche: **nothing is parked, averaged, or rounded up**, and its own sentence — *"the hard gate's
ten conditions are NOT all met"* — is the true one.

**What it does say.** Three of the ten hard-gate conditions are RED with **no relief of the three
kinds axis 10 admits** — G-1 (CRITICAL), G-7 (HIGH), G-4's ⊇ leg (HIGH) — and §2a's goal criterion
is unmet at the bytes. The bar for CONFORMANT-HONEST-RED requires **every** remaining RED to be
relieved; three are not. Promoting this row to CLOSED would launder them, which is precisely what
axis 10 forbids. **The LEDGER status stays `PARTIAL 2026-09-17`** and this seat does not move it.

The true shape of the residue is one fact wearing three gate numbers: **the candidate realizes 3 of
the 9 public parsers, and `W3.md` §5 dispatched no seat to author the other 6.** G-1's 44 ABSENT
rows, G-4's 5 unemitted codes and G-7's 44 NO-PEER rows are that single gap, measured from three
directions. It is a **spec dispatch gap, not a seat's failure** — every seat executed its §5
assignment exactly, and each returned the wall with its measurement instead of a stub (`.b` E-1 and
`.c` F-c6 both refuse a stub rejection **by name** as a masking fallback). Closing it is an act for
the owner: either a dated addendum-beside dispatching the six entries inside X·P, or a ruling that
moves them to X.P.W4 with G-1/G-4/G-7's REDs carried forward by id. Until one of those exists, this
wave is **PARTIAL and correctly so**.

**Check 1 stamps no verb, cures no gate, and writes no byte in `<p2>`.**

---

## Repair 1

**SERVED MODEL: claude-opus-5[1m]** · X.P.W3 **REPAIR SEAT, round 1** (Track D, X·P) ·
2026-09-18, this seat's own clock; the sitting's date of record stays **2026-09-17**. Register: the
**## Check 1** section above — 1 CRITICAL (G-1), 2 HIGH (G-7 · G-4's ⊇ leg), 1 MINOR with a
one-command cure (F-k1). `W3.md` read WHOLE (673 L) and `W3-ADDENDA-2026-09-18.md` beside it;
`W4.md` §2 read; the ## Close and ## Check 1 read whole.

**CRASH-RECOVERY, first act.** ⟨cmd⟩ `git status --porcelain` in both repos before any other act.
Inside this seat's writable set — **nothing dirty, no predecessor residue, nothing inherited**.
`<p2>`: `?? .worktrees/` alone. Outside the set and never opened: ten `demo/**` + two `e2e/**` rows,
`CARRY-LEDGER.md`, `execution/C/F-W1.md` (a sibling seat's), the untracked Track-A/C evidence dirs,
and `scripts/dev/dev.sh` (` M`, unowned, unstaged, **never touched** — in 0 of this seat's commits).

**Outcome: 1 cured · 3 escalated · 1 new finding that CORRECTS the register's stated cure for two
of the three escalations.**

### R1.1 — F-k1 **CURED** at the bytes (`<p2>` `ab6d694`)

`W3.md` §6 G-4 names `--corpus test/css-totality/corpus.json` — `.a`'s 26,604-row union. Every seat
of this wave, and the Close, ran `.b`'s own 685-row `test/css-recovery/corpus.json`, and the spec's
literal command did not merely disagree, it **crashed**.

```
⟨cmd⟩ node scripts/css-recovery-closure.mjs --corpus test/css-totality/corpus.json \
        --frozen-union c654824e:src/css/types.ts                                   [BEFORE]
TypeError: Cannot read properties of undefined (reading 'length')
    at Parser.parser (…/src/css/lowering-js/js-alg.mjs:236:75)
    at runCorpus (…/scripts/css-recovery-closure.mjs:357:35)
EXIT=1, unhandled
```

**The cure is the KEY, not a guard.** `.a`'s rows key the source as **`s`**
(`{"i":0,"s":"rgb()","bands":["ground-a"],"prods":[]}`); `readCorpus` knew `src` and `input` only,
so `undefined` reached `sg.src.length` on the RAW path. `s` is now read beside `src` and `input`,
and `.a`'s 172 `r1` rows whose `s` is the `{id, src}` pair (**F-c3**) are unwrapped by **`.d`'s own
published idiom**, cited at the bytes (`test/css-equivalence/lib/corpus.mjs:52-66`) rather than
invented here: lossless, **counted and printed**, and **HALTing on a third shape**. No skipped cell,
no defaulted `""`, no `String(row)` coercion — each of the three would let the ⊇ direction report a
closure it never executed, which is the masking fallback this gate exists to forbid.

```
⟨cmd⟩ (the same command)                                                            [AFTER]
corpus   typescript/test/css-totality/corpus.json — 26604 inputs, shape {rows:[{src}]}
         · F-c3 {id,src} rows unwrapped 172
executed 159672 calls · 144640 rejections · 154328 issues, over 2 lowerings × 3 entries
C-1 GREEN (288 code sites · outside frozen 0)   C-2 GREEN
C-3 RED   frozen \ emitted = 5 [animation_option_invalid keyframe_selector_invalid
          syntax_descriptor_invalid syntax_mismatch timeline_option_invalid]
C-4 RED   authored 0 · inherited 2 · measured DEAD: far.code === null on 0 of 144640 rejections
C-5…C-10 GREEN · CTRL ×6 fires · EXIT=1        two runs byte-identical (diff -q empty)
```

**The verdict is UNMOVED and that is the point.** G-4 is RED under either operand (E-1, E-2); what
the literal operand buys is a **39× stronger** reading of C-4's own claim — the two inherited
fallback arms are measured dead over **144,640** rejections instead of 3,710 — and a gate that now
runs the command its spec prints.

**E-3 held, measured both ways.** The default-operand run is byte-unchanged and the committed
evidence still regenerates equal:

```
⟨cmd⟩ node … --corpus test/css-recovery/corpus.json … --out <scratch>/rc-default.json   (×2)
25fa6a4b08653334ed506a0b38aa690c96fa6e92d500f08473056bd5ebfc9240   <scratch>/rc-default.json
25fa6a4b08653334ed506a0b38aa690c96fa6e92d500f08473056bd5ebfc9240   evidence/W3/recovery-closure.json
      EQUAL — the Close's and Check 1's published figure survives this repair untouched
```

The literal-operand run is banked **beside** the original, never over it (E-3):
`docs/tranches/X/parse-that/evidence/W3/recovery-closure-spec-literal-operand.json`, sha256
`240473b17fff1e6f5a836a360a0a27ebfcb3b0c7781fbca00c71fbf2bee791b4`.

**Falsifier exercised, not asserted.** ⟨cmd⟩ a corpus row whose `s` is `42`:
`Error: HALT: … row 1 resolves to no string source — keys=[i, s], src/input/s=42. A row this gate
cannot read is a HALT, never a skipped cell` — the new reader **can fail for its intended reason**.
Re-runs of every gate this cure could move: **G-8** `--assert-no-console` → `GREEN — 2 of 2 legs
green`, EXIT=0; **G-1** → `ALL 5 of 52 TOTAL`, EXIT=1 (unmoved); **G-7** → `rows 52 · COMPARED 8 ·
NO-PEER 44 · MIRROR-DEFECTS 5890`, EXIT=1 (unmoved); `css-recovery` suite `139 passed | 3 failed`,
all three pre-existing and named (closure.test.ts's born-RED **E-1**; latch.test.ts ×2 **ESC-c1**).
`git diff --check` clean. The fresh root carries **no** `eslint.config.*`, so §7's `npx eslint .` is
unrunnable there — stated, not silently skipped; it is not a defect this seat may cure in bounds.

### R1.2 — **F-r1 (NEW, CRITICAL): G-1's TOTAL rule and G-6 are MUTUALLY UNSATISFIABLE**

This is the finding that changes what the owner must rule, and it was reached by trying to cure
G-1 rather than by re-reading the Check.

**The rule, at the bytes.** `test/css-totality/lib/matrix.mjs:494-495` marks a runtime row TOTAL
**iff** `result.misses.length === 0 && result.cellsRun > 0 && !corpusEmpty`, and the expectation
each cell is measured against is **the published 4.0.0 module's own answer**
(`matrix.mjs:115-138`, `partition`), with **only the 22 adjudicated LITERALS** overridden
(`index.get(row.s)` — a literal-string lookup). So `TOTAL` means *bug-compatibility with the
incumbent over 26,551 distinct sources*, less 22.

**G-6 orders the opposite, by name.** ⟨cmd⟩ read-only probe, double-run identical:

```
G-6 row d   parseCssColor("rgb(300 -20 3)") → {"space":"rgb","channels":[255,0,3],"alpha":1}
            incumbent 4.0.0                 → {"space":"rgb","channels":[300,-20,3],"alpha":1}
```

Every corpus row of that same class which is **not** one of the 22 literals is therefore a G-1
**miss** *because the candidate obeys G-6*. Attributed over all 26,551 distinct sources
(⟨cmd⟩ `node <scratch>/repair1-g1-attribution.mjs`, ×2 byte-identical):

| count | class, and the rule that REQUIRES it |
|---:|---|
| 1150 | FALSE_REJECT · **G-6 row l** — trailing-dot numeral (`rgb(1. 2 3)`) rejected |
| 1132 | VALUE · **G-6 row d** — out-of-range channel CLAMPED |
| 552 | MIS_ACCEPT · **G-6 row e** — alpha outside [0,1] CLAMPED (`rgb(1 2 3 / 1.5)`) |
| 439 | MIS_ACCEPT · **G-6 rows a/b** — legacy 4-arg `rgba()` / `hsla()` accepted |
| 419 | VALUE · **G-6 row c** — unitless `hsl` S/L read as a percentage |
| 182 | MIS_ACCEPT · **ADJ-3** — non-finite numeral |
| 42 | FALSE_REJECT · **G-6 row h** — mixed comma/space separators rejected |
| 26 | FALSE_REJECT · **G-6 row i** — percentage hue rejected |
| 20 | MIS_ACCEPT · **ADJ-2** — token juxtaposition |
| 10 | FALSE_REJECT · **G-6 rows f/g** — empty trailing argument rejected |
| **3972** | **attributed to a G-6 row or a `parser-band` adjudication the candidate MUST honour** |
| 74 | FALSE_REJECT whose head is outside `R_disp` — **COVERAGE_NARROWING**, a *declared non-defect* |
| 65 | genuinely unattributed (43 false-reject in-shape · 7 mis-accept · 15 value at `hsl` S/L magnitudes the predicate missed) |
| **4111** | parseCssColor's total G-1 misses, excluding the 22 adjudicated literals |

**3,972 + 74 = 4,046 of 4,111 — 98.4%.** The remaining **65** are the only cells where the
candidate's behaviour is unruled, and their samples are inputs on which the *incumbent* accepts
visibly malformed syntax (`rgb(/55 0 153 / 0.5)`, `hsl(120,,50%, 50%)`, `rgb(255 0 153// 0.5)`).

**What follows, and it is not what the register says.** Driving `parseCssColor` to TOTAL requires
un-clamping, un-dividing, accepting `rgb(1. 2 3)`, and rejecting the two legacy 4-arg forms — each
the exact inverse of a G-6 row this wave measures **GREEN** (`Tests 72 passed (72)`), and each the
inverse of §5 `.d`'s own law: *"the mirror preserves spec-correctness, never bug-compatibility"*.
**No byte a seat may write makes G-1 GREEN while G-6 stands.**

Therefore the Check's stated cure for the CRITICAL — *"a dated addendum-beside … dispatching a seat
for the six unrealized public entries"* — is **INSUFFICIENT, measured**. Dispatching it can move
the 16 ABSENT runtime rows to **PARTIAL** and cannot move **one** row to TOTAL: the three realized
rows are PARTIAL for a reason no new entry touches, and every new parser entry inherits the same
oracle-as-expectation rule. The register's G-7 cure — *"realize the six absent entries so the 44
NO-PEER rows gain a peer"* — is worse than insufficient: each new peer **adds** its own cells to
the differential; `parseCssColor`'s peer alone contributes 4,027 of the 5,890.

The true residue is **not** one fact wearing three gate numbers. It is **two**:

1. **A dispatch gap** (F-a.6, correctly named by `.a` and by Check 1) — 16 runtime + 28 type rows
   have no implementing seat. Curable by dispatch; moves rows ABSENT → PARTIAL.
2. **A gate contradiction** (F-r1, new) — G-1's verdict rule and G-6's conformance rows cannot both
   be satisfied. Curable **only by a ruling**: either G-1's TOTAL legend reads an adjudicated-class
   divergence as covered (a change to a gate's GREEN condition, which
   `W3-ADDENDA-2026-09-18.md` §A-3 states an addendum **may not** make), or G-1's expectation stops
   being the incumbent's answer, or G-6 yields. All three are the owner's.

### R1.3 — Escalations, each with its measured reason

| id | gate | severity | why no cure landed here | owner |
|---|---|---|---|---|
| **ESC-r1** | **G-1** — 5 of 52 TOTAL | **CRITICAL** | **F-r1**: the gate's own TOTAL rule contradicts G-6 on 3,972 measured cells. The cure is a **ruling**, not bytes — and the register's proposed dispatch, executed in full, still yields 0 TOTAL runtime rows. Inside §4's bounds and outside every seat's authority: an addendum *"adds **no unit**"* and *"widens **no gate's GREEN condition**"* (`W3-ADDENDA-2026-09-18.md` §A-3) | the owner · X.P.W4 |
| **ESC-d1** (carried) | **G-7** — 5,890 mirror-defects | **HIGH** | Same measurement, seen from the differential: `lib/differential.mjs:31` declares *"where the spec reading is missing, the cell is counted **against** the candidate"*, and 3,982 of the 5,890 carry `specUndecided: true`. Flipping that convention, or widening the literal adjudication index to class-level attribution, is **precisely** W1.md §6 G-2's named falsifier (*"widen the taxonomy … and the count goes to zero for the wrong reason"*) — a masking fallback, refused here. The 3,982 want the **GROUND-C** ruling `W3.md` §10 puts *"not opened here"*; the 1,908 DIVERGENT_VALUE cells want F-r1's ruling | the owner · X.P.W4 · X·V |
| **E-1** (carried) | **G-4's ⊇ leg** — 5 of 8 codes unemitted | **HIGH** | Re-measured at the **spec's own operand** (26,604 inputs, 154,328 issues) and **unmoved**: the five codes are the diagnostic vocabulary of six public entries the grammar does not realize, and the checker prints the incumbent emission site of each. `.b`'s and `.c`'s refusal to stub them is **correct and is not reversed here** — a stub rejection emits codes no grammar raises. The cure is authoring six parsers, which §4's glob admits and §4a assigns to **no unit**; seating myself would mint the dispatch the register says only the owner gives | the owner · X.P.W4 |

Nothing at ≥MEDIUM was cured by a workaround, and no gate was reported green on a narrative.

### R1.4 — E13, swept at this seat's clock

Four paths, read-only. ⟨cmd⟩ `find <the four paths> -type f -newermt '2026-09-18 14:55'` → **three
files, all glass's own execution records** (`BK/EXECUTION-PROGRESS.md` and two
`BK/execution/2026-09-18-o26-cure/*/RECORD.md`) — **not coordination letters, none value-addressed**.
The newest BK coordination letter is `glass-outbound-2026-09-18-valuejs-o26-reply.md`, already rowed
**I-35**. ⟨cmd⟩ `grep -c '^| I-'` → **37** rows; the five whose Status cell reads UNREAD (I-30 ·
I-32 · I-33 · I-34 · I-35) each route away from X·P in their own Routing cells, verified in full at
Check 1 §K1.2 and re-read here. **0 unrowed value-addressed · 0 UNREAD in X.P.W3's scope.**
`INBOX.md` is outside this seat's writable set and carries a sibling's uncommitted hunk; no line was
appended there — this paragraph is the sweep's receipt.

### R1.5 — Verbs and the LEDGER row

This repair **stamps no verb**. F-k1's cure moves no gate; G-1, G-4 and G-7 stay RED at exactly the
figures the Close and Check 1 published, re-derived here. Four gates RED, G-9's latch leg RED and
G-3's proof leg refuted means `W3.md` §2's *"gates green"* condition for **IMPLEMENTED** is still
unmet, and **VERIFIED is X.P.W4's alone** (R-A). **The LEDGER status stays `PARTIAL 2026-09-17`**
and this seat does not move it; the row gains this repair's commits and ESC-r1 by id.

**Repair 1 cured one defect at the bytes, refuted the register's cure for two more with a
measurement, and invented no bar, no relief and no green.**

---

## Check 2

**SERVED MODEL: claude-opus-5[1m]** · X.P.W3 **FRESH ADVERSARIAL CHECK (L-20, pass 2)** · Track D,
X·P · 2026-09-18, this seat's own clock; the sitting's date of record stays **2026-09-17**. This
seat is **VERIFY-ONLY**: it wrote no byte in `<p2>`, opened no unit's file, moved no gate and
changed no verdict. Every reading below was **re-derived here from `W3.md` §6's own commands** or
from a probe this seat wrote fresh — none is read off `W3-CLOSE.md`, off the ## Close, off ## Check 1
or off ## Repair 1. `W3.md` read WHOLE (673 L); this record read whole; `W4.md` §2 read for the
successor conjuncts; `W3-ADDENDA-2026-09-18.md` §A-1/§A-3 and `COHESION.md` §0n.2–§0n.5 + §5's carve
read at the bytes.

**CRASH-RECOVERY, first act.** ⟨cmd⟩ `git status --porcelain` in both repos before any other act.
Inside this seat's writable set (`execution/D/X-P-W3.md` · `execution/LEDGER.md`) — ⟨cmd⟩
`git --no-optional-locks status --porcelain -- docs/tranches/X/execution/D/X-P-W3.md
docs/tranches/X/execution/LEDGER.md | wc -l` → **0**: **nothing dirty, no predecessor residue,
nothing inherited**. Outside it and never opened: ten `demo/**` + two `e2e/**` rows,
`CARRY-LEDGER.md`, the untracked `docs/tranches/X/waves/evidence/` dir (Track A/C's), and
`scripts/dev/dev.sh` (` M`, unowned, unstaged, **never touched**, in 0 of this seat's commits).
`<p2>`: `?? .worktrees/` alone, **before and after every run this seat made**.
`/Users/mkbabb/Programming/parse-that` is dirty by standing arrangement and outside this seat's set
entirely — not opened, and re-measured unchanged below.

### K2.1 — Axis 1 and axis 9: ten gates re-run at a **fifth** seat. **10 of 10 reproduce.**

| gate | this seat's command | this seat's reading | == the record's? |
|---|---|---|---|
| **G-1** | `node scripts/css-universe.mjs --check --pinned-value-commit 6aca8602` | `tally runtime 0 TOTAL / 3 PARTIAL / 16 ABSENT · types 5 / 0 / 28 · ALL 5 of 52 TOTAL` · `RED — 47 of 52 rows are not TOTAL (3 PARTIAL, 44 ABSENT)` · **EXIT=1**, two runs **byte-identical** (`diff -q` empty) · `16 adjudications · 22 witnessed inputs · 19 diverge from the incumbent · 0 NOT honoured` | **YES — RED, to the row** |
| **G-2** | `shasum -a 256` the probe, then run it unmodified | probe `77678a574d7c6b11448b19b6ab8fc0686dddf405a01cd7ea16757bc0837ad4ec` (**unmodified**); `TOTAL 324 throws / 1548 calls` · `DISTINCT FAILURE MODES: 1` · **EXIT=1**; ⟨cmd⟩ `git status --porcelain -- …/audit/probes/` → **0 lines before AND after**; gate 27 **12 before, 12 after** (all the sibling X·V seat's) | **YES — RED, to the call** |
| **G-3** | this seat's **own** probe, written fresh (`<scratch>/check2-g3.mjs`, read-only) | `empty-body heads (2 lowerings × 10): throws 0 · undefined 0 · bad-shape 0 · codes [css_syntax]`; boundary widened by this seat to **20** non-string values × 3 entries × 2 lowerings = **120 cells · throws 0 · undefined 0 · bad-shape 0 · distinct shapes 1** (`{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]}` — incl. `new String("rgb(1 2 3)")`, `new Date(0)`, `/re/`, `Object.create(null)`, `new Map()`, `10n`, `Symbol("x")`, all rejected by the `typeof` guard); R1 `parseCssColor("oklch()")` → `css_syntax [6,7) ["<number>","<none-keyword> ('none')"] actual ")"` **identical in both lowerings**; `SHIELD.caught after G-3 legs: 0` | **YES — green on command, proof leg refuted (K2.2)** |
| **G-4** | `node scripts/css-recovery-closure.mjs --corpus test/css-recovery/corpus.json --frozen-union c654824e:src/css/types.ts` | `685 inputs` · `4158 calls · 3710 rejections · 3744 issues` · C-1 GREEN (288 sites, outside 0) · C-2 GREEN · **C-3 RED** `frozen \ emitted = 5` · **C-4 RED** `authored 0 · inherited 2 · measured DEAD: far.code === null on 0 of 3710` · C-5…C-10 GREEN (incl. **C-10** `signature 22 · destructured 22 · both differences ∅`) · `CTRL ×6 fires` · **EXIT=1**, two runs **byte-identical** | **YES — RED** |
| **G-4** *(Repair 1's spec-literal operand)* | `… --corpus test/css-totality/corpus.json …` | `26604 inputs · F-c3 {id,src} rows unwrapped 172` · `159672 calls · 144640 rejections · 154328 issues` · C-3 RED 5 · **C-4 RED `far.code === null` on 0 of 144640** · **EXIT=1**; `--out` sha256 `240473b17fff1e6f5a836a360a0a27ebfcb3b0c7781fbca00c71fbf2bee791b4` **== the committed `recovery-closure-spec-literal-operand.json`** | **YES — Repair 1's figures reproduce to the digit** |
| **G-5** | `node scripts/css-dual-target-identity.mjs --js src/css/build/ac1.js --wasm src/css/build/ac1.wasm --corpus test/css-totality/corpus.json` | `cells 79674 · six-tuple differing 0 (differing bytes 0) · full-diagnostics 0 · value 0 · threw 0` · per-entry `26551` each · `boundary … identical across both targets: ALL` · `GREEN` · **EXIT=0** | **YES — GREEN on its command** |
| **G-6** | `npx vitest run --config test/css-totality/vitest.config.ts` | `spec-conformance.test.ts (13)` ✓ · `universe.test.ts (59)` ✓ · **`Tests 72 passed (72)`** · EXIT=0 | **YES — GREEN** |
| **G-7** | `node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602` + `--cross-check-ledger` | `rows 52 · COMPARED 8 · NO-PEER 44` · **`MIRROR-DEFECTS 5890 (of which spec-undecided 3982)`** · **EXIT=1**; ledger cross-check `rows 16 adjudicated conflicts, 0 not carried · GREEN`, EXIT=0; suite `Tests 1 failed \| 23 passed (24)` | **YES — RED at 5,890, to the digit** |
| **G-8** | `node scripts/css-recovery-closure.mjs --assert-no-console` | `C-7 3744 issues · unnamed first expectations 0 · label surface 51 rows` · `C-8 isDiagnosticsEnabled() before=false after=false` · `C-9 executed writes 0 · authored call sites 0 · inherited 1 (unguarded 0) · strict letter: 1 call site` · `GREEN — 2 of 2 legs green` · **EXIT=0**; `labels.test.ts` **11 ✓** | **YES — GREEN** |
| **G-9** | `npx vitest run --config test/css-recovery/boundary/vitest.config.ts` | `Tests 2 failed \| 116 passed (118)`; `depth.test.ts` **15 ✓** both lowerings · `boundary.test.ts` **77 ✓** · `no-throw.test.ts` **19 ✓** · `latch.test.ts` **5 ✓ / 2 ✗** at `:147` and `:157`, the assertion's own message naming `packrat.ts:273/297` and ESC-c1 | **YES — depth GREEN · latch RED** |
| **G-10** | `node scripts/css-bench-three-leg.mjs --baseline-tarball ./test/css-equivalence/vendor/value.js-4.0.0.tgz --rounds 40 --discard 10 --denominator 1636680` | three legs · **9 rows, arm-state on every one** (`UNARMED — before & after` / `N/A — published bundle carries no packrat`) · `sink 580440` · budgets against **1636680 µs only** · `NOT RECONCILED AND NOT ERASED` · `BAR: OWNER-GATED-PENDING-RATIFICATION` · `VERDICT: none` · `well-formedness OK` · EXIT=0; `--denominator 1870633` → **`REFUSED … VOID`, EXIT=2** | **YES — well-formed, no verdict** |

**Tally, derived independently at a fifth seat: 4 GREEN (G-5 · G-6 · G-8 · G-10-well-formed) · 1
GREEN-on-command with its proof leg REFUTED (G-3) · 1 SPLIT (G-9 depth GREEN / latch RED) · 4 RED
(G-1 · G-2 · G-4 · G-7).** Gate for gate and figure for figure this is `.e`'s reading, the Close's
and Check 1's. **Four clocks, four seats, one set of numbers, and every claimed GREEN reproduces.**

**Axis 9 — the published figures, at the bytes.** All four generated artefacts regenerated to this
seat's scratchpad and hashed against the committed bytes, plus Repair 1's banked fifth:

```
⟨cmd⟩ shasum -a 256 <regenerated> <committed>
0005f26b10b0c9f093466c134c7fc71d472be7d8d6b0bf2809bb83386f2598de  universe-52.json                        EQUAL
25fa6a4b08653334ed506a0b38aa690c96fa6e92d500f08473056bd5ebfc9240  recovery-closure.json                   EQUAL
b68bab94c01cd2eae24a3b74b0b8096a1bbd30b12d8d75e04233b26dd5686216  dual-target-identity.json               EQUAL
d03b458c0f095c7b201c17ded478fcfcfdf7c53b54f48668450b6c4166e41595  equivalence-full-surface.json           EQUAL
240473b17fff1e6f5a836a360a0a27ebfcb3b0c7781fbca00c71fbf2bee791b4  recovery-closure-spec-literal-operand.json  EQUAL
```

**Five for five, at a fifth seat.** The record's figures are the measurement.

### K2.2 — ESC-e1, re-measured a **fourth** time, by a seat that did not author it

This seat wrote its own probe (`<scratch>/check2-g3.mjs`) rather than re-run any prior seat's:

```
⟨cmd⟩ node <scratch>/check2-g3.mjs        (read-only; <p2> `?? .worktrees/` before and after)
ESC-e1 {"rules":8190,"bytes":98280} {"js":"ok:true","wasm":"ok:true"}         SHIELD.caught= 0
ESC-e1 {"rules":8191,"bytes":98292} {"js":"ok:true","wasm":"ok:false css_syntax"}  SHIELD.caught= 1
```

**CONFIRMED at the bytes, fourth seat, fourth clock.** On a **VALID** 98,292-byte stylesheet — 8,191
repetitions of `a{color:red}` — the JS lowering answers `ok:true`, the Wasm lowering answers
`ok:false css_syntax`, and `SHIELD.caught` steps 0 → 1 on exactly that input: the answer is the
**`catch`'s**, not the grammar's. The retained guard is **load-bearing**, G-3's own falsifier
(*"a masking fallback fails the gate by inspection of the entry module"*) fires, and the record's
refusal to report G-3 green is **correct, not conservative**.

Its **relief is the spec's own** and this seat verified the routing rather than accepting it:
`W3.md` §3a routes a divergence *"rooted in the Wasm numeric or memory model"* to **X.P.W1/W2** as
*"an architecture question … not a patch here"*; ⟨cmd⟩ `grep -rn 'MARK_CAP\|INPUT_CAP'
src/css/lowering-wasm/` → `layout.mjs:41 MARK_CAP = 32768` · `layout.mjs:22 INPUT_CAP = 0x100000` —
**fixed regions of the Wasm memory model**, the named direction exactly. §5 `.c` forecloses the
alternative here in its own words: removal *"is a live option for X.P.W4, not a decision here"*.
The wave took **no patch**. Relieved and owner-named (ESC-e1: X.P.W1/W2 · X.P.W4 · the contract's
owner).

### K2.3 — F-r1 put to the test at this seat: **CONFIRMED, with a one-input proof**

Repair 1's new CRITICAL is the one claim this pass must not take on report, because it changes what
the owner is being asked to rule. This seat tried to **refute** it and could not.

**The rule, read at the bytes by this seat.** `test/css-totality/lib/matrix.mjs:116-138`
(`partition`) takes each cell's expectation from `call(publishedFn, row.s)` — **the published 4.0.0
module's own answer** — with only `index.get(row.s)`, a **literal-string** lookup over the 22
adjudicated inputs, overriding it; `:176-187` records a `DIVERGENT_VALUE` miss whenever the
candidate's value differs from the oracle's on a cell that is not a declared `valueDiffers` row; and
`:494-495` marks a row `TOTAL` **iff** `result.misses.length === 0 && result.cellsRun > 0 &&
!corpusEmpty`. So `TOTAL` is bug-compatibility with the incumbent over the union corpus, less 22
literals.

**The one-input proof** (⟨cmd⟩ read-only probe, double-run identical):

```
"rgb(285 0 153 / 0.5)"   in-corpus: true   adjudicated-literal: false
   incumbent: {"ok":true,"value":{"space":"rgb","channels":[285,0,153],"alpha":0.5},"diagnostics":[]}
   candidate: {"ok":true,"value":{"space":"rgb","channels":[255,0,153],"alpha":0.5},"diagnostics":[]}
```

That single cell is a `DIVERGENT_VALUE` miss **because the candidate obeys G-6 row d**
(`rgb(300 -20 3)` → `[255,0,3]`), which this same wave measures **GREEN** at `Tests 72 passed (72)`.
`parseCssColor` therefore **cannot** be TOTAL while G-6 stands. No ruling about the other 51 rows is
needed to see it; one corpus row settles it.

**The magnitude, attributed by this seat's own predicates** (⟨cmd⟩ `<scratch>/check2-attrib.mjs`,
written fresh and deliberately *cruder* than `.d`'s, so it would under-attribute rather than
over-attribute):

```
26604 corpus rows · 26551 distinct string sources · 22 adjudicated literals
FALSE_REJECT_IN_SHAPE 1345 · MIS_ACCEPT 1200 · DIVERGENT_VALUE 1566 · agree 22439
TOTAL disagreements 4111                       ← equal to Repair 1's figure, to the digit
  1150  G-6 l trailing-dot numeral        957  G-6 d out-of-range channel CLAMPED
   382  G-6 e alpha outside [0,1]         373  ADJ-3 non-finite numeral
   170  G-6 c unitless hsl S/L as %        56  G-6 h mixed separators
    26  G-6 i percentage hue                9  G-6 f/g empty trailing argument
  3123  attributed by MY crude predicates to a G-6 row / parser-band adjudication (76.0 %)
   988  left over — samples "color(display-p3 1 0.5 0)", "lab(50% -100% 150%)",
        "rgb(/55 0 153 / 0.5)", "rgb(255-0 153 / 0.5)", "rgb(255 0 153 / /.5)"
```

`.d`'s sharper predicates reach **3,972 + 74 COVERAGE_NARROWING = 4,046 of 4,111**; my crude ones
reach 3,123, and every one of my leftovers that I sampled is either a class my predicate does not
spell (the clamp discipline applied to `lab()`/`color()`) or a **declared** coverage narrowing.
**The direction is not in doubt and the total matches exactly.** F-r1 stands.

**One refinement of F-r1's stated instrument, recorded because it makes the owner ask cheaper**
(F-m2 below): the record says the contradiction is *"curable only by a ruling"*, and lists as its
second option *"G-1's expectation stops being the incumbent's answer"*. That option does not require
amending a gate. `W3.md` §5 `.a` already writes the rule — *"Conflicting expectations between the two
folded suites resolve to `parser-band.md`'s adjudications"* — and the **literal-string** form of that
resolution is `.a`'s implementation choice, not the spec's word. A class-level reading of the same
adjudications is therefore available to the owner without touching G-1 or G-6. **Measured here: it
still does not make G-1 green.** My own leftover set is non-empty under class-level attribution, and
the 16 ABSENT runtime + 28 ABSENT type rows are untouched by any reading of the adjudications. The
escalation's substance is unchanged; only its cheapest instrument is one step nearer than the record
says.

### K2.4 — Axes 2 · 3 · 4 · 5 · 6 · 7: all held

- **Axis 2 (bounds).** ⟨cmd⟩ `git show --pretty=format: --name-only` over **every** commit this repo
  carries whose subject matches `x-p-w3` (30 commits, a deliberately **wider** net than the wave's
  own roster) → **17 distinct paths**. ⟨cmd⟩ `grep -vE '^docs/tranches/X/'` over them prints exactly
  **two**: `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` and
  `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json` — the two rows §4 names for `.e`.
  ⟨cmd⟩ `grep -cE '^(src/|demo/|api/|e2e/|test/|scripts/|package\.json)'` → **0**. ⟨cmd⟩
  `grep -c 'dev\.sh'` → **0**. In `<p2>`, ⟨cmd⟩ the same over `8d8ebc6^..HEAD` (16 commits) → **54
  paths**, all under §4's admitted globs but **three**, and each of the three carries a grant this
  seat read at the bytes: `harness/bench/lib/engines.mjs` ← `COHESION.md:1078` **§0n.4** verbatim
  (*"landed by **X.P.W3** under a dated E-3 addendum to W1's §Bounds, so G-7 has a subject"*);
  `harness/w2/coverage-52-report.mjs` ← K.8 **D-i2** (`COHESION.md:186` states the defect);
  `experiments/w2/contract/ALGEBRA-ADDENDA-2026-09-18.md` ← `COHESION.md:1068` **§0n.3** verbatim
  (*"ONE dated addendum-beside to `ALGEBRA.md` (both homes, sha256-equal)"*), and the pair **is**
  sha256-equal here: ⟨cmd⟩ both homes → `83ba069bc5553c56c00468a6e82a2b42c4b24af13d5375d6effd73d7d574c022`.
  The frozen read-only root is untouched: ⟨cmd⟩ `git -C …/parse-that rev-parse HEAD` →
  `ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42` · `status --porcelain | wc -l` → **31** ·
  `worktree list | wc -l` → **7** — **identical to X.P.W0's pinned quadruple and to every reading
  since**. **0 landed-wrong paths.**
- **Axis 3 (masking fallback).** ⟨cmd⟩ over the whole `cdf7975..HEAD` `<p2>` diff: **zero** added
  `test.skip` / `it.skip` / `describe.skip` / `.only(` / `xit(` / `todo(` — the only textual hits are
  prose lines that **refuse** those idioms by name (`"never a `test.skip`, never a narrowed corpus,
  never an allowlist, never a re-pinned …"`). **Zero** bytes under any `node_modules`. Ten added
  `catch` sites, each read here: nine are **instruments that record the throw as data**
  (`css-bench-three-leg.mjs`, `css-dual-target-identity.mjs`, `oracle.mjs`, `matrix.mjs`,
  `assignability.mjs`, and four suite catches whose `failures[]` is then asserted empty) — the
  opposite of masking. **One is load-bearing: the shield at `entry.mjs`** — treated at K2.2, and no
  gate is reported green on it. **`UNREALIZED_ENTRIES` is not an allowlist**: ⟨cmd⟩
  `grep -rn UNREALIZED_ENTRIES src test scripts` → 19 sites, every one a *declaration* consumed by
  the ledger emitter and the full-surface report; the six named entries still read **ABSENT** in
  G-1 (EXIT=1) and **NO-PEER** in G-7 (EXIT=1, 5,890). Nothing is suppressed into green. The three
  suite REDs are carried as **failing assertions whose message names the escalation**
  (`closure.test.ts:96` E-1; `latch.test.ts:147`/`:157` ESC-c1) — the honest instrument, never a
  skip. Repair 1's own cure re-read at the diff (`<p2>` `ab6d694`, 47 insertions): it adds the `s`
  key beside `src`/`input` and **HALTs by name** on a third shape — *"A row this gate cannot read is
  a HALT, never a skipped cell"* — with no defaulted `""`, no `String(row)` coercion and no skipped
  cell. Idiomatic root cause, not a guard.
- **Axis 4 (families).** §9's four fresh-root commit titles land **verbatim and whole**: `bd10e5c`
  (`.a`), `39503f8` (`.b`), `f14f59f` (`.c`, all three cures in **one** commit as §5 requires),
  `d8d7169` (`.d`). §9's chain commit lands as **one** commit carrying all three of its paths
  (⟨cmd⟩ `git show --name-only c2bc7f5a` → `DEFECT-LEDGER.md` · `harvest/x-p-w3.json` ·
  `COHESION.md`) — the family that most invites a split did not split. §P.1's locks hold: `.0` first
  in each repo; the ALGEBRA addendum's two homes sha256-equal; D-c1's cure rides the OP-7 re-point
  in `1857c9b` (*"one act, not two"*); `.b`'s `39503f8` precedes `.c`'s `f14f59f`; `.e` writes only
  after `.d`. The check/repair rounds keep one meaning per commit: `00f473e7` (Check 1 = record +
  ledger) · `2b11bca1` (evidence) · `3398c28c` (record) · `9be102fa` (ledger).
- **Axis 5 (E-3).** ⟨cmd⟩ `git diff --stat 641ba4db^..HEAD -- docs/tranches/V/megatranche/registry/
  adjudicated/ docs/tranches/X/parse-that/waves/W{0,1,2,3,4}.md docs/tranches/X/parse-that/algebra/
  ALGEBRA.md docs/tranches/V/megatranche/conformance/ docs/tranches/V/apotheosis/
  docs/tranches/V/megatranche/coordination/ docs/tranches/X/parse-that/evidence/W{0,1,2}` →
  **prints nothing.** The dated spec, the adjudicated registry, the conformance artifacts, every
  sibling X·P spec and every prior wave's sealed evidence are **byte-untouched by this wave**. Every
  correction rode a dated addendum-beside.
- **Axis 6 (E13 mail).** Swept at this seat's own clock from the **Status cell of each row**, never
  a bare grep. ⟨cmd⟩ `grep -c '^| I-'` → **37**. Status cells reading **UNREAD**: **I-30 · I-32 ·
  I-33 · I-34 · I-35** — five, not six: **I-31's cell reads `FOLDED 2026-09-17 at the X-W0 close`**,
  which a bare `grep -i unread` would have mis-read (its cell quotes its own prior status), the
  X.P.W0 CHECK 1 **D-1** trap, avoided here by reading the cell. Each of the five routes **away**
  from X·P in its own Routing cell, read in full: I-30 *"No reply owed"* → X-W0.j · I-32 *"Zero
  parse-that bytes; not X·P's to dispose"* → X-W0.j / X-EXT-1..6 · I-33 *"Not X·P's … Glass is
  **READ-ONLY always**"* → the X formation mail seat · I-34 *"Not X·P's, not a value.js act today"*
  · I-35 *"Routing: X·KF (Track B), NOT X-W1"*. ⟨cmd⟩ `find <the four coordination paths> -maxdepth 1
  -type f -newermt '2026-09-18 12:00'` → **two files**: `glass-outbound-2026-09-18-valuejs-o26-reply.md`
  (already rowed **I-35**) and `INBOX.md` itself. **0 unrowed value-addressed · 0 new `I-n` minted ·
  0 UNREAD in X.P.W3's scope. This wave does not close with unread mail.** `INBOX.md` is outside this
  seat's writable set and carries a sibling's uncommitted hunk; no line was appended there — this
  paragraph is the sweep's receipt.
- **Axis 7 (the four-verb line).** `W3.md` §2's table is byte-untouched (axis 5) and the record moves
  **no verb**: AUDITED YES · SPECIFIED YES · **IMPLEMENTED NO** · VERIFIED NO. §2/§9/§12 stamp
  IMPLEMENTED on *"gates green + bytes landed"*; four gates are RED and one is split, so **refusing
  the stamp is the lawful act**, and VERIFIED is X.P.W4's alone (R-A), correctly untouched.
  `W3-CLOSE.md:539` and `COHESION.md`'s §5 carve both say so in their own words
  (*"IMPLEMENTED is NOT stamped by this seat"*). Checked against the one standing precedent that
  could have licensed otherwise: **`COHESION.md` §0n.2 rules `IMPLEMENTED-with-carried-REDs` for
  X.P.W2 and for X.P.W2 only** — there is no analogous ruling for X.P.W3, so it inherits no such
  permission. The line moved lawfully by not moving.

### K2.5 — Axis 10: HONEST-RED ADJUDICATION, gate by gate, at the spec's bytes

**RELIEVED under the spec's own relief — the honest-RED set (4), each owner-named in the record's
residual register:**

| gate | the relief, cited at the spec's bytes | owner in the register |
|---|---|---|
| **G-2** (324/1,548) | **Producer-owned.** The probe *packs the incumbent* and witnesses shipped value.js bytes (re-run here unmodified, sha `77678a57…`). `W3.md` §4 **Do NOT touch** `/Users/mkbabb/Programming/value.js/src/**`; §9 *"No commit in this wave may contain a path under `value.js/src/**`"*; §3a calls an edit to the incumbent *"the inversion of the experiment"*. A consumer-side patch would be the gate failure, not the cure. GREEN is **structurally unreachable** from inside X·P | **YES** — ESC-d2, owner **X·V** |
| **G-9 latch** (`resetPackrat()` does not disarm) | **Green only upstream, and out of every §4 row.** The cure is a write under `<p2>/typescript/src/parse/**`; §4 admits `typescript/src/css/**` and **not** that path, and `W3-ADDENDA-2026-09-18.md` §A-3 **declines it by name** at the bytes: *"`<p2>/typescript/src/parse/**` IS NOT ADMITTED BY THIS ADDENDUM … adoption of an ancestor is a statement about where the numbers were taken, not a licence to write new bytes there"*. §3a makes a File-bound expansion a **halt**. The seat **refused** the green-making re-export as *"a fake restore of a different latch"*, and the failing assertion carries the refusal in its own message | **YES** — ESC-c1, owner **X.P.W4 / the parse-that library seam** |
| **G-3's proof leg / ESC-e1** (the shield is load-bearing) | **Routed by §3a**: a divergence *"rooted in the Wasm numeric or memory model"* is *"an architecture question for X.P.W1/W2, not a patch here"* — verified at K2.2 (`MARK_CAP` 32,768 · `INPUT_CAP` 0x100000, fixed regions). §5 `.c` forecloses the alternative: removal *"is a live option for X.P.W4, not a decision here"*. No gate is reported green on it | **YES** — ESC-e1 (HIGH), owners **X.P.W1/W2 · X.P.W4 · the contract's owner** |
| **G-4's no-fallback leg** (2 inherited arms) | **In no unit's set by §4a**, both arms living in `lowering-{js,wasm}/index.mjs`, which §4a assigns to no unit (`.b` = `{lower,diagnostics,codes}`, `.c` = `entry`/`bounds`); the Wasm arm is compiled **into** `ac1.wasm` and cannot be answered from above. Measured **DEAD** at both operands: `far.code === null` on **0 of 3,710** and on **0 of 144,640** rejections | **YES** — E-2 (+ F-e10 for the shield as a third, live arm), owner **X.P.W4** |

**UNRELIEVED — a real defect by the spec's own weight (3). Unchanged from Check 1, re-derived here,
and Repair 1 moved none of them:**

| gate | why no relief of the three admitted kinds exists | severity |
|---|---|---|
| **G-1** — 5 of 52 TOTAL | Not producer-owned: the candidate is the subject, in a root this wave writes. **Not routed to a successor**: §3 item 2 orders *"Drive every runtime export to TOTAL"*, §2a makes it the wave's **goal criterion**, `W4.md` §2 makes *"the 52-export universe TOTAL"* a **precondition it inherits**, and `COHESION.md:957` routes W1's G-8 relief **to X.P.W3** with the words *"Owner: **X.P.W3** (the 52-export universe TOTAL; the R1 throw class dead)"* — the obligation terminates here. Not an honest-RED the spec names by id. §3a's *"the universe is mis-specified"* trigger requires **three** passes without a monotone rise; the wave made **one**, 0 → 5, so the trigger did not fire and routes nothing | **CRITICAL** |
| **G-7** — 5,890 mirror-defects | The gate's floor is *"zero MIRROR-DEFECTs … across all 52 exports"*. §3a routes only a **newly discovered incumbent defect (a sixth R-class)** to X·V; the record checked that trigger and it did **not** fire. 5,890 over 8 compared rows (3,982 spec-undecided) is not that, and 44 rows have **NO-PEER** — a coverage absence, not a routed finding. `--cross-check-ledger` GREEN proves the 16 adjudicated conflicts are rowed; it does not relieve the 5,890 | **HIGH** |
| **G-4's ⊇ leg** — 5 of 8 codes unemitted | Same root: the five codes are the diagnostic vocabulary of the six public entries the grammar does not realize (the checker prints the incumbent emission site of each). The cure is six more entries in `algebra/grammar.mjs` — a path §4's glob **does** admit and §4a assigns to no unit, i.e. a dispatch gap, not a bounds wall. §3a's halt *returns* it; it does not own it. Re-measured **unmoved at the spec's own operand** (26,604 inputs, 154,328 issues) | **HIGH** |

**Axis 8 — the spec's own goal criterion, at the bytes: NOT MET.** §2a asks two things. (i) *"no CSS
string … makes the candidate parser do anything other than return a typed result"* — true for the
three realized entries over the corpus (my own probe: 0 throws, 0 `undefined`, 0 bad shapes over 120
boundary cells and 20 empty-body heads), **but** six of the nine public entries are **absent from the
surface** (`UNREALIZED_ENTRIES`, honestly named rather than stubbed), and on the Wasm target a
**valid** 98,292-byte stylesheet is answered by the `catch` (K2.2). (ii) *"the 52-export contract …
covered by name and shape rather than approximated"* — **5 of 52**. The criterion is unmet at the
bytes, not merely at the gates.

### K2.6 — New findings from this pass (register: severity · claim · receipt · cure)

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **F-m1** | MINOR | **ESC-e2 re-confirmed at the harvest's own bytes and it is mitigated, not open.** The L-13 harvest reads **5 of 6** dispatched seats | ⟨cmd⟩ read of `registry/harvest/x-p-w3.json`: `dispatched` = the six `X.P.W3.{0,a,b,c,d,e}` · `seatCount` = `{dispatched: 6, harvestedUnitRows: 5, absent: ["X.P.W3.e"], zeroRowSeats: []}` · `runs` 3. **`zeroRowSeats` is empty** — no dispatched seat has zero journal rows, which is L-13's other RED condition | already owned (**ESC-e2**, orchestrator): only a post-return re-harvest reads six. **Mitigated; does not block** |
| **F-m2** | INFO | **F-r1's stated instrument is one step further away than it needs to be.** The record says the G-1/G-6 contradiction is *"curable only by a ruling"* and that widening the adjudication would be *"a change to a gate's GREEN condition"* which §A-3 forbids an addendum. But `W3.md` §5 `.a` already writes the rule — *"Conflicting expectations … resolve to `parser-band.md`'s adjudications"* — and the **literal-string** form of that resolution is `.a`'s own implementation (`matrix.mjs:121` `index.get(row.s)`), not the spec's word. A class-level reading is available to the owner without amending G-1 or G-6 | `matrix.mjs:116-138` read at the bytes; this seat's crude class attribution (K2.3) reaches 3,123 of 4,111 and `.d`'s sharper one 4,046 — **and neither reaches 4,111**. The 16 ABSENT runtime + 28 ABSENT type rows are untouched by any reading of the adjudications | the escalation's **substance is unchanged and is not softened**; a dated addendum-beside may name the cheaper instrument. Owner · **X.P.W4** |
| **F-m3** | INFO | **G-1's behavioural oracle is not sha-asserted in its own run, where G-7's is.** `pin.mjs:54-59` reads the oracle from the unpacked `cand-o/vendor/value-js-4.0.0/dist/subpaths/`; `readPin` records its sha256 but asserts it against nothing. G-7, by its own gate text, asserts the tarball's sha256 **in-test before any comparison runs** | **No drift exists today** — this seat unpacked the sha-pinned tarball (`7f80658ca4e1…03ae`) and compared: `css.js` `8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42` and `css.d.ts` `c81d095213d112c6bdbddf1ddb65da2a1286d6e2ff37f5f0ba40e78a439743d0`, **byte-identical in both locations**. The gap is the missing assertion, not a wrong oracle | a one-line sha assertion in `pin.mjs`, inside §4's glob. **X.P.W4**; not a defect of any published figure |
| **F-m4** | INFO | **The wave publishes two pinned value.js commit ids without saying they name the same contract.** G-1 runs `--pinned-value-commit 6aca8602`; G-4/G-8 run `--frozen-union c654824e:src/css/types.ts` | ⟨cmd⟩ `git diff --stat c654824e 6aca8602 -- src/css/index.ts src/css/types.ts` → **prints nothing**; ⟨cmd⟩ `shasum -a 256` at both pins → `types.ts` `109327ce…fe2` and `index.ts` `c09d076e…f0c` **equal**, and the working tree's `src/css/types.ts` is `109327ce…fe2` too, so the `--assert-no-console` leg's unpinned read is the same bytes | one sentence in a dated addendum-beside. **Orchestrator**; nothing is measured against two contracts |
| **F-m5** | INFO | **F-z1 and F-e14 still standing.** §8 names a **sha256 sidecar** for `universe-52.json` and an `r1-anchor-before.txt`; neither file exists | ⟨cmd⟩ `ls -la evidence/W3/` → **seven** files: `bench-three-leg.md` · `dual-target-identity.json` · `equivalence-full-surface.json` · `r1-anchor-after.txt` · `recovery-closure-spec-literal-operand.json` · `recovery-closure.json` · `universe-52.json`. No sidecar; no `-before`. The BEFORE reading is real and lives in this record's B.1 and `W3.md` §6; the sidecar hash is re-derived at K2.1 | the orchestrator's dated addenda-beside, already owned at C.7 |

**Nothing else was found.** No write outside bounds, no split family, no E-3 breach, no unread mail
in scope, no fabricated figure, no gate reported green on a narrative, no `test.skip`, no allowlist,
no patched `node_modules`, no silently narrowed assertion, and **no claimed GREEN that fails to
reproduce**.

### K2.7 — Successor conjuncts: X.P.W4's "Opens after", measured against this wave

`W4.md` §2, read at the bytes: *"**Opens after**: X.P.W3 IMPLEMENTED (the 52-export universe TOTAL,
the R1 throw class dead, the equivalence floor held, the divergence ledger written, the three-leg
table published). The dependency is on those artefacts, not on the label — §2b checks each."*

| conjunct | state at this seat's clock |
|---|---|
| the 52-export universe **TOTAL** | **FALSE** — 5 of 52 (G-1, EXIT=1, re-run here ×2 byte-identical) |
| the R1 throw class **dead** | **PARTIAL** — R1 itself is a typed rejection identical in both lowerings and the corpus is throw-free (0 of 120 boundary cells, 0 of 20 heads), but the Wasm answer at 8,191 **valid** rules is the shield's (ESC-e1, K2.2) |
| the equivalence floor **held** | **FALSE** — 5,890 mirror-defects (G-7, EXIT=1) |
| the divergence ledger **written** | **GREEN** — 66,080 B; `--cross-check-ledger` **GREEN, 16 rows, 0 not carried**, EXIT=0 |
| the three-leg table **published** | **GREEN** — `bench-three-leg.md`, 9 rows each with its arm-state, `BAR: OWNER-GATED-PENDING-RATIFICATION`, `VERDICT: none`, well-formedness OK, `--denominator 1870633` REFUSED at EXIT=2 |

**X.P.W4 is LAWFULLY BLOCKED — 2 of 5 conjuncts GREEN, 2 FALSE, 1 PARTIAL, and the label
(IMPLEMENTED) is unstamped.** `W3.md` §10 states *"X.P.W4 cannot be authored around a missing W3"*.
**No successor is unblocked by this wave, and none is blocked unlawfully.**

### K2.8 — Verdict

**NOT-CONFORMANT**, on axis 10 and axis 8, and on nothing else.

**What it does not say.** It is **not** a finding against the Close, against Check 1, against Repair 1
or against any unit seat. This seat re-ran all ten gates from the spec's own commands and **10 of 10
reproduce**; **every claimed GREEN reproduces**; **five** generated artefacts regenerate
**sha256-equal** at a fifth seat; bounds are clean over 30 value.js commits and 16 `<p2>` commits
with every out-of-§4 path's grant read at the bytes; the frozen read-only root's quadruple is
unmoved; E-3 prints nothing; the commit families are whole; mail is clean and the I-31 grep trap was
avoided by reading the Status cell; `scripts/dev/dev.sh` is in zero commits; the only load-bearing
`catch` in the tree is the spec-permitted shield, whose permission condition the wave **itself
refuted, published and escalated** rather than leant on; and Repair 1's cure is an idiomatic
root-cause fix that HALTs rather than skips. Measured against its own record this remains one of the
more honest closes in the tranche.

**What it does say.** Three of the ten hard-gate conditions are RED with **no relief of the three
kinds axis 10 admits** — **G-1 (CRITICAL)**, **G-7 (HIGH)**, **G-4's ⊇ leg (HIGH)** — and §2a's goal
criterion is unmet at the bytes. CONFORMANT-HONEST-RED requires **every** remaining RED to be
relieved; three are not. Promoting this row would launder them, which is exactly what axis 10
forbids. **The LEDGER status stays `PARTIAL 2026-09-17`** and this seat does not move it.

**What this pass adds to the owner's docket.** Check 1 read the residue as *one* fact wearing three
gate numbers (a §5 dispatch gap). Repair 1 measured it as **two**, and this seat **confirms the
second at the bytes with a one-input proof**: `rgb(285 0 153 / 0.5)` is in the union corpus, is not
one of the 22 adjudicated literals, and the candidate answers `[255,0,153]` **because G-6 row d
orders it** while G-1 scores it a miss for not answering the incumbent's `[285,0,153]`. **No byte a
seat may write makes G-1 green while G-6 stands.** The owner act is therefore not one ruling but two
decisions: (1) dispatch for the six unrealized entries and the 28 absent type rows — which moves rows
ABSENT → PARTIAL and, measured, **0 rows to TOTAL**; and (2) a reading of G-1's expectation oracle —
for which F-m2 names a cheaper instrument than the record does (§5 `.a`'s own *"resolve to
`parser-band.md`'s adjudications"*, read at class level rather than as 22 string literals) — which,
**also measured, still does not reach TOTAL on its own**. Both are the owner's, and neither is a
seat's byte.

**Check 2 stamps no verb, cures no gate, and writes no byte in `<p2>`.**
