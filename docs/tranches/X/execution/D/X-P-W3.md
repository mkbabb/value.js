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
