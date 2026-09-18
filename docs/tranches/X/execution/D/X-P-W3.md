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
