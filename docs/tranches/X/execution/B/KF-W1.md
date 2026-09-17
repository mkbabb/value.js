SERVED MODEL: claude-opus-5[1m]

# KF.W1 · Mail Cure — EXECUTION RECORD (Track B, X·KF)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W1.md` (IMMUTABLE, E-3).
**Authority of order**: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2 (Track B: `KF.W0 ∥ KF.W1`, both
open at the begin-word) · §3.4 (locks) · §5 (seat law). **Owner-gated items RULED** at
`COHESION.md` §0j.C (`KF-WRITE`) and §0j (the begin-word, verbatim). Nothing here re-opens a ruling.

**Status**: OPEN 2026-09-17 — baseline banked, 3 units planned.

---

## Open

**Date**: 2026-09-17. **Seat**: KF.W1 SEAT 0 (OPEN), Track B.

### Preconditions — verified AT THE BYTES and in the ledger

| # | precondition | measured at open (2026-09-17) | verdict |
|---|---|---|---|
| **OP-1** | The source bodies are still readable | ⟨cmd⟩ `ls -lT /Users/mkbabb/Programming/keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-2*.md` → `VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md` **7,064 B** (mtime **Jul 24 16:41:17 2026**) · `VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md` **15,633 B** (mtime **Jul 27 12:27:59 2026**) — byte-for-byte and mtime-for-mtime the spec's OP-1 record | **PRESENT — MET** |
| **OP-2** | The exec clone is the frontier | ⟨cmd⟩ in `keyframes-v-exec`: `git rev-parse HEAD` → `81a56990736ced5b5edde0b84c527680ac7689b1`; `git rev-parse origin/master` → the same sha; `git status --porcelain \| wc -l` → **0** | **TRUE — MET** (HEAD `81a56990` = kf `origin/master`) |
| **OP-3** | Write authority for `keyframes-v-exec` | **RULED** at `COHESION.md` **§0j.C · KF-WRITE (a)**: *"**KF.W1's delivery** (O-21 and the O-8/O-11 amendment-addendum) lands in **`keyframes-v-exec`** (HEAD `81a56990` = the frontier; the exec-clone path the spec built so the mail cure never queues behind §B-12), committed and pushed to kf `origin/master`"*, under *"the value.js orchestrator under the owner's 2026-09-17 grant"*, every kf commit carrying the session trailer | **DISCHARGED by ruling — MET** |
| **OP-4** | §B-12 reconciliation | ⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js`: `git rev-parse HEAD` → `8281638c…`; `git rev-list --left-right --count origin/master...master` → **`41  1`**; `git status --porcelain \| wc -l` → **252**. KF.W0's OP-1 seat has **not yet** performed the reset (no `kf-sacred-snapshot-2026-09-17` branch at this read) | **NOT DONE — and EXPLICITLY NOT REQUIRED** (spec §1 `Opens after`; §7 cross-edge 2; runbook §1.2 edge `KF.W0 ∥ KF.W1`). This baseline is therefore a **pre-reset** reading, stated as such |

**Ledger check**: `execution/LEDGER.md` Track B row `KF.W1` reads *"opens after: begin-word (NOT after
W0)"*. The begin-word is recorded at COHESION §0j and at the ledger event log (2026-09-17). Pre-acts
P-1 · P-2 · P-3 are **CLOSED** (`642a0098` · `fd40535c`/`0bed8379` · §0j). **No predecessor wave is
owed.** KF.W0's status is `planned` and that is lawful — it is a *sibling root*, not a predecessor.

### Mail sweep (E13 Step-0, four paths)

| path | newest | rowed? |
|---|---|---|
| `docs/tranches/V/` + `docs/tranches/V/coordination/` | `value-inbox-2026-07-20-bbnf-coordination.md` (mtime Jul 21); `INBOX.md` mtime Sep 17 12:32:39 | all letter bodies carry rows (I-6..I-16 · the seven retained `value-inbox-*`); **0 unrowed** |
| `../glass-ui/docs/tranches/BK/coordination/` — **BK confirmed the newest tranche dir** (⟨cmd⟩ `ls -d ../glass-ui/docs/tranches/*/` → the B-series ends at **BK**) | `glass-outbound-2026-08-29-valuejs-o20-ack.md` (Aug 29 16:41:56) | **I-30** ✓ ; `valuejs-outbound-2026-08-28-o20-authoring-block-batch.md` = **O-20** (ours) ✓ ; the two `ATLAS-*` files are atlas→glass, **not addressed to value.js** |
| `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-07-27-*` (Jul 27) — **ours**, = O-11 | 10 entries: 4 ours (O-2/O-4/O-8/O-11 + the 07-17 marks leg), 4 atlas/glass/speedtest→kf, `INBOUND-LEDGER.md` = kf's own. **No keyframes-authored letter addressed to value.js.** 0 unrowed |
| `../sci-report/atlas/docs/tranches/P/coordination/` | all bodies Jul 15–17 (bulk mtime Aug 3) | ours = O-3/O-5/O-9/O-12; `keyframes-outbound-*` are kf→atlas; `MAIL-REGISTER.md` is atlas's own. **0 unrowed** |

**RESULT: 0 unrowed letters addressed to value.js. No new `I-n` minted; the ledger tail remains
`I-30`.** This confirms the orchestrator's P-1 round (`642a0098`, same date) at a second seat's
independent reading. A dated sweep line is appended at `INBOX.md`'s end by unit `.c`, which is the
only unit with `INBOX.md` in its writable set (§4a single-writer law).

### MINT LAW (C-10) — the outbound id, measured at open, not inherited

⟨cmd⟩ `grep -oE '^\| O-[0-9]+' docs/tranches/V/coordination/INBOX.md | sort -t- -k2 -n | tail -1`
→ **`| O-20`** (double-run: `O-20` · `O-20`). **Therefore `max+1` = `O-21`** — the spec's commissioned
literal and the measured mint **agree at this open**; no delta addendum is owed. `O-20` is the SS-6
batched glass-BK communique at `INBOX.md:95`. Unit `.c` **re-runs this grep immediately before writing**
and, if the ledger has moved, mints the new `max+1` and records the delta as a dated addendum first.

**Orchestrator's MINT-LAW note discharged**: I-30 is **inbound** and does not move the outbound max.
Re-measured at this open over `^\| O-` only — the max is `O-20`, unmoved.

---

## Baseline — the born-RED gates, run READ-ONLY (BEFORE state)

**Substrate discipline (the spec's ANCHOR DUALITY, §5b)**: frontier legs run **in
`keyframes-v-exec` against `origin/master`** (`81a56990`, porcelain 0); historical legs run **in the
sacred checkout against the WORKTREE-STATE RECORD** ⟪HEAD `8281638c` · porcelain **252** · the
six-line import split · 2026-09-17⟫. Bare `HEAD` is never used. Every figure below is this seat's own
command output; the load-bearing counts were double-run.

| gate | expected posture | measured at open | verdict |
|---|---|---|---|
| **G-KF1-1** DELIVERY | born-RED | `ls $PROG/keyframes-v-exec/docs/tranches/V/coordination/` → **9 entries + `vnext/`**; **no addendum, no O-8, no O-11** | **RED-AS-EXPECTED** |
| **G-KF1-2** ANCHOR LIVENESS | born-RED | 3 packet anchors **ABSENT** at `origin/master`; `browser.ts` → `:162` (packet says `:165`); `package.json` → `:70` (packet says `:69`) | **RED-AS-EXPECTED** |
| **G-KF1-3** `parseStylesheet` COMPLETENESS | born-RED | grep returns **9 lines** exactly as the spec promises — 3 call sites (`compile/adapter.ts:222` · `scroll/grammar.ts:109` · `validate.ts:182`), 3 imports (`:7`/`:37`/`:47`), 3 prose (`adapter.ts:202` · `validate.ts:41` · `validate.ts:130`). O-11 §A3 names **0 of 3** | **RED-AS-EXPECTED** |
| **G-KF1-4** IMPORT CENSUS | born-RED | frontier **62** · sacred worktree **61** · disqualified `8281638c` **81** over a disjoint alphabet. Certification un-withdrawn (no addendum exists) | **RED-AS-EXPECTED** |
| **G-KF1-5** VEHICLE QUESTION | born-RED | O-8 `:101-103` still asks it verbatim; `4.0.1` sweep over the three coordination trees → **4 hits**, **ZERO under `keyframes-v-exec`**; no withdrawal anywhere | **RED-AS-EXPECTED** |
| **G-KF1-6** D-GAP-6 CONDITIONAL | born-RED | `INBOX.md` **I-10** (`:47`) carries the *"only if a future 4.1 ships it"* acceptance; `library-band.md` `:205-206` reads the permanent DECLINE. **Never joined in any letter** | **RED-AS-EXPECTED** |
| **G-KF1-7** LEDGER VERBS | born-RED | **I-26** at `:92` reads `ROWED 2026-08-03`; outbound max = **`O-20`**; **no `O-21` row** | **RED-AS-EXPECTED** |
| **G-KF1-8** SWEEP-PATH LAW | born-RED | narrowed witness → **exactly 1 hit, `:15`**, the law spanning `:15-16`, still naming `../keyframes.js/…` — the frozen tree, measured **41 behind / 252 dirty** at this open | **RED-AS-EXPECTED** |
| **G-KF1-9** OUTBOUND RETAINED | born-RED | `find . -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'` from the value.js root → **0 hits**. Retained `value-inbox-*` set = **7** files (07-19 ×1 · 07-20 ×6); 07-24 and 07-27 absent | **RED-AS-EXPECTED** |
| **G-KF1-10** MARK REQUESTED | born-RED (our half only) | `INBOUND-LEDGER.md` at `origin/master` → **9 rows** (IN-ATLAS-1..5 · IN-GLASS-1..2 · IN-VALUE-1..2); **no IN-VALUE-3/4** | **RED-AS-EXPECTED** |
| **G-KF1-11** SPEC HOME | **DECLARED-SATISFIED, not born-RED** | `ls waves/` → **eleven** specs, this one + ten siblings, all `KF-W<N>.md`; `test -e KF-W1.md` → PRESENT, `test -e W1.md` → **ABSENT** | **GREEN by declaration — recorded, never gated** |
| **G-KF1-12** SACRED CHECKOUT | **stay-GREEN INVARIANT, not born-RED** | HEAD `8281638c` · `41  1` · porcelain **252** · both packet mtimes exact (Jul 24 16:41 / Jul 27 12:27). Zero value.js writes | **GREEN — must stay GREEN** |

**TALLY AT OPEN: 10 born-RED · 10 RED-AS-EXPECTED · 0 GREEN-BEFORE-CURE · 0 DIVERGENT · 0 UNRUNNABLE
· 1 DECLARED-SATISFIED · 1 stay-GREEN INVARIANT.** This is exactly the spec's §1 tally (10 · 1 · 1).
Under R.2 a GREEN before its cure would be a finding; **there is none**. G-KF1-11 and G-KF1-12 are
**not** findings — the spec declares both non-born-RED at §1 and §6, and both measure as declared.

### Pasted outputs (the load-bearing ones)

```
# OP-1 / G-KF1-12 — the sacred checkout, read-only
$ cd /Users/mkbabb/Programming/keyframes.js && git rev-parse HEAD
  8281638c0ac4ac8c54a67a018ca5bf6a9117174f
$ git rev-list --left-right --count origin/master...master   →  41   1
$ git status --porcelain | wc -l                             →  252
$ ls -lT docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-2*.md
  7064   Jul 24 16:41:17 2026  …-2026-07-24-parser-totality-exposure.md
  15633  Jul 27 12:27:59 2026  …-2026-07-27-library-band-r1-widened-k1-k4.md

# OP-2 — the frontier of record
$ cd /Users/mkbabb/Programming/keyframes-v-exec && git rev-parse HEAD
  81a56990736ced5b5edde0b84c527680ac7689b1     ( = origin/master ; porcelain 0 )

# G-KF1-1 — the exec-visible coordination dir (9 entries + vnext/)
$ ls docs/tranches/V/coordination/
  ATLAS-INBOUND-2026-07-16-consumer-crossing-report.md
  ATLAS-INBOUND-2026-07-17-crossing-reply-ack-and-census-correction.md
  GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md
  GLASS-INBOUND-2026-07-17-install-truth-marks.md
  INBOUND-LEDGER.md
  SPEEDTEST-INBOUND-2026-07-17-install-truth-relay-ack.md
  VALUEJS-INBOUND-2026-07-17-formation-exchange-marks.md
  VALUEJS-INBOUND-2026-07-17-formation-exchange.md
  VALUEJS-INBOUND-2026-07-17-wl-verdicts.md
  vnext
  # NO addendum. NO O-8. NO O-11.

# G-KF1-2 — anchor liveness at origin/master
$ git cat-file -e origin/master:src/animation/compile/value-ast.ts            → ABSENT
$ git cat-file -e origin/master:src/animation/compile/easing/easing-registry.ts → ABSENT
$ git cat-file -e origin/master:src/animation/compile/emit/backward.ts        → ABSENT
$ git grep -n 'parseCssScalar' origin/master -- src/animation/resolve/browser.ts
  :3   import { parseCssScalar } from "@mkbabb/value.js/css";
  :162     const parsed = parseCssScalar(source);              # packet says :165
$ git grep -n '"@mkbabb/value.js"' origin/master -- package.json
  :70        "@mkbabb/value.js": "4.0.0"                       # packet says :69
$ git grep -n '"@mkbabb/glass-ui"' origin/master -- package.json
  :77        "@mkbabb/glass-ui": "7.0.0",                      # SCH-1 falsifier: F-1 FALSIFIED-AT-HEAD
$ git cat-file -e origin/master:test/internal/leaves-parity.test.ts           → PRESENT  (§5a row 14)

# G-KF1-3 — parseStylesheet, the full nine lines
$ git grep -n 'parseStylesheet' origin/master -- src
  compile/adapter.ts:7      parseStylesheet,
  compile/adapter.ts:202  * Value's `parseStylesheet` directly if it needs the full set.
  compile/adapter.ts:222      const result = parseStylesheet(source);
  scroll/grammar.ts:37      parseStylesheet,
  scroll/grammar.ts:109         ? requireParsed(parseStylesheet(input), input)
  validate.ts:41          * `@mkbabb/value.js` edges — plus Value's own `parseStylesheet`/
  validate.ts:47          import { collectKeyframes, parseStylesheet } from "@mkbabb/value.js/css";
  validate.ts:130         *   1. `parseStylesheet(css)` → the AST; `parseable` is true when Value
  validate.ts:182             const parsed = parseStylesheet(css);

# G-KF1-4 — three censuses, three named substrates
$ [keyframes-v-exec] git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' origin/master -- src | sort | uniq -c
   7 /color  29 /css  3 /easing  5 /math  2 /transform  16 /value        → 62   (double-run: 62 · 62)
$ [keyframes.js worktree] grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' -r src | sort | uniq -c
   7 /color  29 /css  3 /easing  5 /math  2 /transform  15 /value        → 61   (double-run: 61 · 61)
   # BYTE-IDENTICAL to O-11 :52's certified split, all six lines
$ [keyframes.js] git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' 8281638c -- src | sort | uniq -c
  10 (root)  9 /color  5 /easing  5 /math  24 /parsing  2 /transform  26 /units  → 81
   # DISQUALIFIED: disjoint alphabet, zero of O-11's six lines reproduce

# G-KF1-5 — the vehicle question, asked once, withdrawn nowhere
$ sed -n '101,103p' [sacred]/…VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md
  **Decision we need from you:** do you want the fix as a deliberate `4.0.1` you take on your own
  schedule, or folded into the next coherent tuple (value 4.x + keyframes 6.x + glass 7.x)? We will
  not cut a version into your dependency graph without your answer. Same question is out to glass-ui.
$ grep -rn '4\.0\.1' $PROG/{value.js,keyframes.js,keyframes-v-exec}/docs/tranches/V/coordination/
  value INBOX.md:71 (O-7 cell) · :72 (O-8 cell) · :80 (O-10a cell) · sacred …07-24…:101
  → 4 hits; ZERO under keyframes-v-exec/docs/tranches/V/coordination/
$ sed -n '186p' docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md
  | CC-084 | DR-12 · MT-F001 · MT-F015 · MT-F024 (R1) | reg,mt | `parseCssColor` throws a raw
  TypeError on every empty-body functional colour in immutable 4.0.0 … (the "no emergency 4.0.1" ruling)

# G-KF1-6 — the D-GAP-6 conditional, live in their ledger, foreclosed in ours
$ sed -n '205,206p' docs/tranches/V/megatranche/registry/adjudicated/library-band.md
  `verify-packed-surface`'s behavioural half + `strictTypes: 62` deletion. DECLINE — `sampleBezier`
  (permanently, measured zero demand); `resolveCssColor` (RD-6, with re-trigger). FENCE —
$ grep -n '^| I-10 ' docs/tranches/V/coordination/INBOX.md   → :47   (the row id is the anchor)

# G-KF1-7 — the ledger verbs
$ grep -n '^| I-26 ' docs/tranches/V/coordination/INBOX.md   → :92  "ROWED 2026-08-03" … cure described-but-unperformed
$ grep -oE '^\| O-[0-9]+' docs/tranches/V/coordination/INBOX.md | sort -t- -k2 -n | tail -1
  | O-20                                                      (double-run: O-20 · O-20)

# G-KF1-8 — the sweep-path law, unchanged
$ grep -n '^- `\.\./keyframes\.js' docs/tranches/V/coordination/INBOX.md
  15:- `../keyframes.js/docs/tranches/V/coordination/` — the keyframes exchange (their
  # exactly 1 hit; the law spans :15-16

# G-KF1-9 — value holds no copy of its own two letters
$ find . -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'   → 0 hits
$ ls docs/tranches/V/coordination/value-inbox-*.md | wc -l                          → 7

# G-KF1-10 — the kf inbound ledger
$ git show origin/master:docs/tranches/V/coordination/INBOUND-LEDGER.md | grep -oE 'IN-[A-Z]+-[0-9]+' | sort -u
  IN-ATLAS-1 IN-ATLAS-2 IN-ATLAS-3 IN-ATLAS-4 IN-ATLAS-5 IN-GLASS-1 IN-GLASS-2 IN-VALUE-1 IN-VALUE-2
  # 9 rows; no IN-VALUE-3/4
```

### §5a drift table — re-derived at this open (the executing seat inherits nothing)

All fourteen anchor rows re-measured at `origin/master 81a56990`; **every row reproduces the spec's
round-3/4 reading exactly**, so the table is confirmed, not corrected:

| row | measured 2026-09-17 |
|---|---|
| 1 | `compile/value-ast.ts` **ABSENT** → live `compile/value/compile.ts:32` = `const parsed = parseCssValues(value);` |
| 2 | `resolve/browser.ts` → **`:162`** = `const parsed = parseCssScalar(source);` |
| 3 | `compile/easing/easing-registry.ts` **ABSENT** → live `compile/easing/registry.ts:36` = `/** Stable identities let the serializer distinguish named curves from closures. */` |
| 4 | `emit/easing-serialize.ts` → **`:71`** = `const registryName = timingFunctionEntries.find(` |
| 5 | `emit/backward.ts` **ABSENT** → `emit/backward/` holds exactly `backward.ts · color.ts · index.ts · walk.ts` |
| 6–8 | path → `emit/backward/color.ts` (**385 lines**); `:171` = `const sampleRamp = (` · `:250` = `const ramp = sampleRamp(fromColor, toColor_, stopCount, space, hueOpt.hueMethod);` · `:263` = `const kfRefRamp = sampleRamp(fromColor, toColor_, 1024, space, hueOpt.hueMethod);` — **PATH drift only, ZERO line drift** |
| 9 | `package.json` → **`:70`** |
| 10 | `engine/options.ts:31` **EXACT** |
| 11 | `internal/leaves.ts:28` **EXACT** |
| 12 | `load-engine.ts:65` **EXACT** |
| 13 | `emit/css-text.ts:41` **EXACT** |
| 14 | `test/internal/leaves-parity.test.ts` **PRESENT** |

### Dated intervals, re-measured at open (C-1 ANTI-STALENESS — never inherited)

Newest keyframes-authored letter in value's tree = `keyframes-inbox-2026-07-18-*` → silence
**61 days** at 2026-09-17 (the spec's dated **41** was its 2026-08-28 reading and is not re-issued).
O-8 unanswered **55 days**; O-11 **52 days**. Unit `.b` re-runs these at authoring.

### Dated deltas against the spec's own 2026-08-28 readings (E-3: stated, never patched into the spec)

1. **`INBOX.md` grew**: **100 L / 62,178 B** at this open (the spec's §6 preamble records 97 L /
   56,702 B at `7a7dc6ef`). **No anchor moved**: the sweep-path law is still `:15-16`, I-10 still
   `:47`, I-26 still `:92`, the outbound max still `O-20` at `:95`. The row ids are the anchors and
   all four resolve.
2. **G-KF1-8's broad-form leg reads SIX, not five**: ⟨cmd⟩ `grep -c 'keyframes.js/docs/tranches'
   docs/tranches/V/coordination/INBOX.md` → **6** (the spec's round-2 dated correction measured 5,
   itself a correction of a ruling's 4). The **narrowed** form — the gate's own witness — is
   unchanged at **exactly 1 hit at `:15`**, so the gate is unaffected. Recorded as a dated reading of
   a drifting corpus, exactly as §4c's SELF-REFERENCE DISCLOSURE predicts; the **STABLE DENOMINATOR
   is unchanged at TWO** (`INBOX.md:15-16` in bounds · the memory limb out of bounds, routed OWNER).
3. **The §4c censuses are not re-issued as operative numerals** (the spec's own instruction); unit
   `.c` re-runs both at its write and books any class-H growth by the partition's own rule.

---

## Unit plan

**Agents line (BINDING, spec §1)**: *"3 Opus units, **serial** (`.a` → `.b` → `.c`). No Fable seat:
nothing here is adjudicated or designed — it is a delivery act with three re-measurements."*
Runbook §5.1 restates it: *"KF.W1 = 3 Opus serial."* **Peak concurrency 1.** No unit is Fable.

**Order (hard, spec §7)**: `.a` → `.b` → `.c`. `.a` before `.b` because the addendum is derived from
bodies whose liveness is OP-1 (C-11 SEQ-LOCK). `.b` before `.c` because **G-KF1-7 is void ahead of
G-KF1-1** — a ledger that marks CURED before delivery reproduces I-26 one layer up.

**Disjointness (spec §4a)**: `.a` writes only the two back-fill files; `.b` only the addendum + its
retained copy; `.c` only `INBOX.md`. **No shared modify path.** No parallel wave writes `INBOX.md` —
E13 mail edits are single-writer by standing law.

### Groups (ordered, ≤2 concurrent, no shared modify path)

1. `[KF.W1.a]`
2. `[KF.W1.b]`
3. `[KF.W1.c]`

### Units

| unit | model | spec sections executed | writable set | gates | locks / same-commit families |
|---|---|---|---|---|---|
| **KF.W1.a** Retention and Re-anchoring | opus | §3 items 1–2 (`:83-84`) · §4 Bounds (`:96-114`) · §4a (`:116-118`) · §4b row `.a` (`:124`) · C-5 (`:194`) · C-11 (`:200`) · §5a (`:235-252`) · §5b (`:254-284`) · G-KF1-2 (`:296-301`) · G-KF1-9 (`:341-343`) · G-KF1-12 (`:354-356`) · SACRED-CHECKOUT LAW (`:27-28`) | `docs/tranches/V/coordination/value-inbox-2026-07-24-parser-totality-exposure.md` (create) · `docs/tranches/V/coordination/value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md` (create) | G-KF1-9 · G-KF1-2 (table produced) · G-KF1-12 (stay-GREEN) | C-11 **SEQ-LOCK** (precedes `.b`) · **verbatim copies; originals NEVER corrected in place** · SACRED-CHECKOUT LAW: read/copy-out only, zero writes, zero git mutations, zero npm in `keyframes.js` · ANCHOR DUALITY (§5b) · D-19 re-resolve edict: anchors re-derived, never copied. One commit. |
| **KF.W1.b** The Addendum | opus | §3 items 3–4 (`:85-86`) · §4 Bounds · §4b row `.b` (`:125`) · C-1 (`:190`) · C-2 (`:191`) · C-3 (`:192`) · C-4 (`:193`) · C-5 · C-6 (`:195`) · C-7 (`:196`) · C-8 (`:197`) · C-12 (`:201`) · §5a · §5b + the SUBSTRATE-NAMING RULE (`:312`) · G-KF1-1 (`:292-294`) · G-KF1-2 · G-KF1-3 (`:303-305`) · G-KF1-4 (`:307-317`) · G-KF1-5 (`:319-324`) · G-KF1-6 (`:326-329`) · G-KF1-10 (`:345-347`) · §8 (`:387-404`) | `/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` (create) · `docs/tranches/V/coordination/value-inbox-2026-09-17-o8-o11-amendment-addendum.md` (create, retained copy) | G-KF1-1 · G-KF1-2 · G-KF1-3 · G-KF1-4 · G-KF1-5 · G-KF1-6 · G-KF1-10 (ask half) | **C-6 / G-KF1-4 SUBSTRATE-NAMING RULE**: the TEMPLATE is commissioned, the numerals are **re-measured at authoring** — copy neither 61 nor 62 nor 81 · **LOCK**: *"No certification cites a sha as 'the tree measured' unless the census reproduces at that sha"* · C-1 *"Amend, do not re-send"* + ANTI-STALENESS · C-3 **HARD NEGATIVE** (question never re-asked, no cut date promised) · C-7 no re-ask/re-scope/severity change/new obligation · C-8 §B-12 is **ASKED, never performed** · C-12 the mark is **NON-GATING** · §0j.C KF-WRITE: delivery lands in `keyframes-v-exec` and is committed + pushed to kf `origin/master`, session trailer on the kf commit. Two commits (one per repo) — the value-side retained copy and the kf-side delivery are one meaning across two trees. |
| **KF.W1.c** Ledger and Law | opus | §3 items 5–6 (`:87-88`) · §4 Bounds `INBOX.md` row (`:102`) · §4b row `.c` (`:126`) · §4c (`:128-180`) · C-9 (`:198`) · C-10 (`:199`) · G-KF1-7 (`:331-334`) · G-KF1-8 (`:336-339`) · §7 internal order (`:362`) | `docs/tranches/V/coordination/INBOX.md` (modify — exactly three edits + the dated Step-0 sweep line) | G-KF1-7 · G-KF1-8 | **SAME MOTION (§7)**: *"C-9 and C-10 land in the same motion — repairing the ledger without repairing the law that broke it ships the cure and keeps the cause."* **ONE commit, not split.** · **ORDERING**: valid only **after** G-KF1-1 is GREEN · **MINT LAW**: re-run `grep -oE '^\| O-[0-9]+' … \| sort -t- -k2 -n \| tail -1` immediately before writing; mint `max+1`; a spec-frozen literal is never trusted over the measured ledger; a moved ledger yields a dated delta addendum **before** executing · **C-9 SIZING LOCK (KISS, L-19)**: two lines plus one sentence of rationale — **no routing subsystem, no script, no linter, no cron** · ANTI-RENAME: I-26 keeps its id; O-8/O-11 rows keep *"SENT — no reply on record"* **plus** an `amended-by-O-21` pointer, never a rewrite. |

### Briefs

**KF.W1.a** — Re-`ls` the two sacred packet bodies FIRST (OP-1 is the wave's single largest liveness
risk). Copy them **out** read-only into `docs/tranches/V/coordination/` under the live
`value-inbox-<date>-<slug>.md` convention, **verbatim**, each prefixed by a one-line provenance header
(absolute source path · original mtime · byte count). Never correct an original in place — verbatim
retention is the evidence that I-26 happened. Then re-derive the whole §5a drift table at
`keyframes-v-exec` against **`origin/master`** (never bare `HEAD`): `git cat-file -e` plus a
line-content assertion per anchor, all fourteen rows, inheriting nothing from the spec's table. Also
re-run §5b's three censuses (worktree 61 / frontier 62 / disqualified 81) and hand `.b` the measured
tuple ⟪HEAD · porcelain · six-line split · date⟫. Zero writes and zero git mutations in
`/Users/mkbabb/Programming/keyframes.js`. One commit.

**KF.W1.b** — Author ONE amendment-addendum in keyframes' `<SENDER>-INBOUND-*` grammar, recording the
exec-clone HEAD sha **inside** the letter. First payload section = `.a`'s re-derived drift table (a).
Then (b) the three missed `parseStylesheet` sites with their LIB §7.5 failure postures —
absorb-to-diagnostics at `compile/adapter.ts:222`, `requireParsed` THROW at `scroll/grammar.ts:109`,
swallow-to-`[]` at `validate.ts:182` — re-deriving §A3's end-state count, never correcting it by
arithmetic; (c) one sentence **withdrawing** O-8's vehicle question citing CC-084, never re-asked,
no cut date; (d) one line resolving D-GAP-6 `sampleBezier` to **not adopted** with its permanence and
ground. Plus the withdrawn import-census certification written to the SUBSTRATE-NAMING RULE with
numerals filled from `.a`'s fresh measurement, the minimal `IN-VALUE-3`/`IN-VALUE-4` ask, the
owner-facing §B-12 request (asked, never performed), and the self-defect paragraph naming the
out-of-bounds memory limb as an OPEN residual routed to the OWNER. Deliver to
`keyframes-v-exec/docs/tranches/V/coordination/`, retain a copy in value's tree, commit + push the kf
side to `origin/master` per §0j.C KF-WRITE.

**KF.W1.c** — Re-run the MINT-LAW max-grep first; mint `max+1` (O-21 at this open) and record any
delta as a dated addendum before writing. Then three surgical `INBOX.md` edits **in one commit**:
(i) repair the four-path preamble's keyframes bullet at `:15-16` — name the **exec-visible** tree for
delivery, mark the sacred checkout **READ-ONLY / NEVER-DELIVER**, keep the grammar note verbatim
(two lines + one sentence of rationale, on the `7a7dc6ef` glass-limb template); (ii) move **I-26**
ROWED → **CURED** with its receipt (absolute delivered path · date · exec-clone HEAD sha), the kf-side
mark left as an OPEN sub-row; (iii) mint the outbound row **O-21** naming payload items (a)–(d), and
add an `amended-by-O-21` pointer to O-8's and O-11's rows **without rewriting their text**. Append
the dated Step-0 four-path sweep line at the file end. No tooling, no script, no cron.

---

## Unit receipts

### KF.W1.a

**Unit**: X.KF.W1.a · Retention and Re-anchoring. **Seat model**: `claude-opus-5[1m]`. **Date**:
2026-09-17. **Status**: **DONE**. **Commits**: `426761a7` (the two back-fills) · this record.
**Writable set honoured exactly**: the two `value-inbox-2026-07-{24,27}-*.md` files and nothing else.
Zero writes, zero git mutations, zero npm in `/Users/mkbabb/Programming/keyframes.js`
(SACRED-CHECKOUT LAW, spec `:27-28`). Every figure below is this seat's own command output; the
load-bearing ones are double-run and were re-read from the **settled bytes** after the commit.

#### Act 1 — OP-1 re-`ls` FIRST (the wave's largest liveness risk)

⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js`:
`ls -lT docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-2*.md`
```
7064   Jul 24 16:41:17 2026  VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md
15633  Jul 27 12:27:59 2026  VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md
```
⟨cmd⟩ `stat -f '%N %z bytes mtime=%Sm' -t '%Y-%m-%d %H:%M:%S' …` → the same two tuples.
**OP-1 MET — byte-for-byte and mtime-for-mtime the spec's `:74` record and the wave-open baseline.**
Nothing had to be reconstructed; the Triumvirate trigger (i) did **not** fire.

#### Act 2 — the verbatim copy-out (C-11 `KF-MAIL-COPY`; scope item 1, `:83`)

Mechanism: `cat <provenance-header> <original> > <target>` — a **read** of the sacred checkout and a
write only into value's tree. Each target carries a two-line prefix (line 1 the standing SERVED MODEL
receipt, line 2 the spec's **one-line provenance header**: absolute source path · original mtime ·
byte count) then one blank line, then the body **verbatim**.

| target (in `docs/tranches/V/coordination/`) | prefix B | body B | file B |
|---|---:|---:|---:|
| `value-inbox-2026-07-24-parser-totality-exposure.md` | 339 | **7,064** | **7,403** |
| `value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md` | 345 | **15,633** | **15,978** |

**VERBATIM PROOF — body-vs-original, by command, double-run and then re-run from the git object:**
```
$ tail -c 7064  <copy 07-24> | cmp - <sacred original 07-24>   → identical (run 1, run 2)
$ tail -c 15633 <copy 07-27> | cmp - <sacred original 07-27>   → identical (run 1, run 2)
$ shasum -a 256 <sacred 07-24>                 1b8581cc53af37e21e6eeafaf4b0432fc082cdd22db10bbabc5631eb6e250a23
$ tail -c 7064  <copy 07-24>  | shasum -a 256  1b8581cc53af37e21e6eeafaf4b0432fc082cdd22db10bbabc5631eb6e250a23
$ shasum -a 256 <sacred 07-27>                 5f34ab67a2764e6a3e4b94dbc7f7eae40b74bf6a767d574a850b49f9ab25bd8b
$ tail -c 15633 <copy 07-27> | shasum -a 256   5f34ab67a2764e6a3e4b94dbc7f7eae40b74bf6a767d574a850b49f9ab25bd8b
# after the commit, from the git object rather than the worktree:
$ git show HEAD:…/value-inbox-2026-07-24-… | tail -c 7064  | cmp - <sacred 07-24>  → identical
$ git show HEAD:…/value-inbox-2026-07-27-… | tail -c 15633 | cmp - <sacred 07-27>  → identical
```
**Originals NEVER corrected in place** — C-11's lock and the evidence that I-26 happened. The two
drifted anchors the packets carry (`browser.ts:165`, `package.json:69`) stand **uncorrected** in the
retained bodies; their corrections live in the drift table below, which is `.b`'s payload item (a) —
*amend, do not re-send*.

#### Act 3 — the §5a drift table, RE-DERIVED WHOLE (D-19: anchors re-resolved, never copied)

Substrate written into every command: **`keyframes-v-exec`**, ref **`origin/master`** =
`81a56990736ced5b5edde0b84c527680ac7689b1`, porcelain **0**. **Bare `HEAD` never used.** Method per
row: `git cat-file -e origin/master:<path>` (PRESENT/ABSENT) **plus** a line-content assertion
(`git show origin/master:<path> | sed -n '<n>p'`). Nothing is inherited from the spec's table or from
the wave-open baseline — both were read only *after* this derivation, to compare.

| # | packet anchor | `cat-file -e` | line-content assertion at `origin/master` |
|---|---|---|---|
| 1 | `src/animation/compile/value-ast.ts` | **ABSENT** | live `compile/value/compile.ts` PRESENT; `:32` = `        const parsed = parseCssValues(value);` |
| 2 | `resolve/browser.ts:165` | PRESENT | `:165` = `    }` (**not** the call) → `:162` = `    const parsed = parseCssScalar(source);`; import at `:3`. **DRIFT −3** |
| 3 | `compile/easing/easing-registry.ts:36` | **ABSENT** | live `compile/easing/registry.ts` PRESENT; `:36` = `/** Stable identities let the serializer distinguish named curves from closures. */` — **same docstring, same line** |
| 4 | `emit/easing-serialize.ts:70-71` | PRESENT | `:70` = `    if (easing.css !== undefined) return easing.css;`; the reverse-map spans **`:71-73`** = `const registryName = timingFunctionEntries.find(` / `([_name, func]) => func === easing.fn,` / `)?.[0];` |
| 5 | `emit/backward.ts:47` | **ABSENT** | `git ls-tree --name-only origin/master -- 'src/animation/compile/emit/backward/'` → exactly `backward.ts` · `color.ts` · `index.ts` · `walk.ts`. **PATH drift (file → dir)** |
| 6 | `emit/backward-color.ts:171` | **ABSENT** (path) | live `emit/backward/color.ts`, **385 lines**; `:171` = `const sampleRamp = (` — **EXACT** |
| 7 | `…:250` | — | `:250` = `        const ramp = sampleRamp(fromColor, toColor_, stopCount, space, hueOpt.hueMethod);` — **EXACT** |
| 8 | `…:263` | — | `:263` = `        const kfRefRamp = sampleRamp(fromColor, toColor_, 1024, space, hueOpt.hueMethod);` — **EXACT**; this is O-11 `:175`'s *"`count=1024`"* evidence tuple |
| 9 | `package.json:69` | PRESENT | `:69` = `    "dependencies": {` → `git grep -n '"@mkbabb/value.js"' origin/master -- package.json` → **`:70`** = `        "@mkbabb/value.js": "4.0.0"`. **DRIFT +1** |
| 10 | `engine/options.ts:31` | PRESENT | `:31` = `    const parsed = parseCssScalar(raw);` — **EXACT** |
| 11 | `internal/leaves.ts:28` | PRESENT | `:28` = `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math";` — **EXACT** |
| 12 | `load-engine.ts:65` | PRESENT | `:65` = `import type { Stylesheet } from "@mkbabb/value.js/css";` — **EXACT** |
| 13 | `emit/css-text.ts:41` | PRESENT | `:41` = `export const serializeCssValue = (value: CssValue): string => {` — **EXACT** |
| 14 | `test/internal/leaves-parity.test.ts` | **PRESENT** | existence-only row, as specced |

**VERDICT: 14 of 14 rows re-derived independently; every row reproduces the spec's §5a reading and the
wave-open baseline exactly. ZERO corrections owed; ZERO anchors failed to resolve to a live path**, so
the Triumvirate trigger (ii) did **not** fire. Shape of the drift, restated from the measurement:
**4 PATH-drifted (rows 1 · 3 · 5 · 6–8) · 2 LINE-drifted (row 2 `−3`, row 9 `+1`) · 8 EXACT**, and
rows 6–8 are **path drift with ZERO line drift**.

#### Act 4 — §5b, the three censuses (ANCHOR DUALITY), re-run and double-run

```
(A) SACRED CHECKOUT, UNCOMMITTED WORKTREE  [/Users/mkbabb/Programming/keyframes.js, read-only]
$ git rev-parse HEAD → 8281638c…  · git rev-list --left-right --count origin/master...master → 41  1
$ git status --porcelain | wc -l → 252   (double-run: 252 · 252)
$ grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' -r src | sort | uniq -c
   7 /color   29 /css   3 /easing   5 /math   2 /transform   15 /value      → 61   (61 · 61)
  # BYTE-IDENTICAL to O-11 :52's certified split — all six lines and the total.

(B) BARE 8281638c — DISQUALIFIED, contrast only, never "the tree measured"
$ git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' 8281638c -- src | sort | uniq -c
  10 (root)  9 /color  5 /easing  5 /math  24 /parsing  2 /transform  26 /units  → 81   (81 · 81)
  # DISJOINT ALPHABET: /css and /value absent; /parsing and /units present. ZERO of six lines reproduce.

(C) FRONTIER OF RECORD  [keyframes-v-exec @ origin/master 81a56990, porcelain 0]
$ git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' origin/master -- src | sort | uniq -c
   7 /color  29 /css  3 /easing  5 /math  2 /transform  16 /value            → 62   (62 · 62)
```
**61 / 81 / 62 confirmed at three named substrates.** Corroborating receipt, same seat, same clock —
**two independent instruments name the same substrate**: the sacred **worktree**'s
`backward-color.ts` is **385 lines** (as is the frontier's `backward/color.ts`) and `:171`/`:250`/`:263`
there read byte-identically to rows 6–8 above, while **bare `8281638c`** at those same three lines
reads docblock prose (`:171` *"The WORST midpoint ΔE this key drifts…"* · `:250` ` *` · `:263`
*"ΔE-ε — NOT a finished color-ONLY `@keyframes` block. `compileChild` threads"*). The certification's
fault is therefore **not arithmetic** — it is the un-named substrate, exactly as C-6 holds.

#### THE TUPLE HANDED TO `.b` (C-6 / G-KF1-4 SUBSTRATE-NAMING RULE — fill these, copy nothing else)

> **WORKTREE-STATE RECORD** ⟪ HEAD **`8281638c0ac4ac8c54a67a018ca5bf6a9117174f`** · porcelain
> **252** · import split **61** = `/css` **29** · `/value` **15** · `/color` **7** · `/math` **5** ·
> `/easing` **3** · `/transform` **2** · measured **2026-09-17** ⟫ — **no sha addresses this state and
> the recipient cannot re-derive it.**
> **FRONTIER** ⟪ `origin/master` = **`81a56990`**, porcelain **0** · **62** = `/css` 29 · `/value`
> **16** · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2 · measured **2026-09-17** ⟫.
> **DISQUALIFIED CONTRAST** ⟪ bare `8281638c` → **81** over a disjoint subpath alphabet ⟫ — a
> contrast reading, **never** "the tree matched".

`.b` re-runs all three commands at its own authoring clock (C-6's anti-copy lock); the tuple above is
handed over as **this seat's measurement at 2026-09-17**, not as a literal to inscribe. Note for `.b`:
the sacred worktree is **unchanged since wave-open**, so no delta addendum is owed **at this seat's
clock** — `.b` re-measures and books any movement itself.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (this seat's own re-measure) | AFTER | verdict |
|---|---|---|---|
| **G-KF1-9** OUTBOUND RETAINED | `find . -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'` from the value.js root → **0 hits**; retained `value-inbox-*` set = **7** | → **2 hits** (both under `docs/tranches/V/coordination/`, both `git ls-files`-tracked at `426761a7`); retained set = **9**; bodies verbatim by `cmp` + sha256; originals uncorrected | **RED → GREEN** |
| **G-KF1-2** ANCHOR LIVENESS (**table-produced half only**) | no re-derived table existed at this wave's seats | all **14** rows re-derived at `origin/master` with `cat-file -e` + line-content assertion, above | **table PRODUCED**; the gate's own GREEN is `.b`'s (the table must be the addendum's FIRST payload section) — **still RED at this seat, by design** |
| **G-KF1-12** SACRED CHECKOUT (stay-GREEN INVARIANT) | HEAD `8281638c` · `41  1` · porcelain **252** · mtimes Jul 24 16:41:17 / Jul 27 12:27:59 | **identical on all five** after every act; `git reflog -n 1` head unmoved (`8281638c HEAD@{0}: commit: fix(demo-shell)…`); zero writes, zero git mutations, zero npm | **GREEN → GREEN (STAYED)** |

Untouched by this unit and **unchanged**, re-read only where a command above happened to cross them:
G-KF1-1 · -3 · -4 · -5 · -6 · -7 · -8 · -10 remain **RED-AS-EXPECTED** (they are `.b`'s and `.c`'s);
**G-KF1-11** remains DECLARED-SATISFIED.

#### Locks discharged

**C-11 SEQ-LOCK** — `.a` ran first and `.b` may now open: the packet bodies are inside value's git at
`426761a7`, so the addendum's source text no longer depends on an untracked file in a frozen tree.
**C-5 / D-19** — every anchor re-resolved, none copied. **ANCHOR DUALITY (§5b)** — two substrates,
each named in its own command; bare `HEAD` never used; `8281638c` appears only as a named historical
context and as the disqualified contrast. **§4a disjointness** — this unit wrote two files, neither of
them `.b`'s or `.c`'s.

#### Residuals · escalations

- **Escalations: NONE.** Neither Triumvirate trigger (i) nor (ii) fired; (iii) is not in this unit's scope.
- **Bounds note (recorded, not a deviation)**: each back-fill carries the standing seat receipt
  `SERVED MODEL: …` as line 1 **above** the spec's one-line provenance header. Both are *prefix*
  matter; the body is byte-identical to the original by `cmp` and sha256, so §3 item 1's "verbatim"
  and the session's receipt law are both satisfied. Byte accounting is published above.
- **Dated delta against the spec's 2026-08-28 readings**: **none in this unit's surface.** All 14
  drift rows, all three censuses, both packet mtimes/bytes and the sacred worktree tuple reproduce the
  spec's figures exactly at 2026-09-17. (The spec's dated *silence* intervals are `.b`'s to re-run;
  the wave-open baseline already re-measured them at **61 / 55 / 52 days**.)
- **OPEN residual, out of bounds, routed OWNER (§4c)**: the memory limb
  `~/.claude/projects/-Users-mkbabb-Programming-value-js/memory/feedback-mail-inbox-law.md` still
  codifies the frozen keyframes sweep path. Not this unit's and not any unit's to edit unasked; `.b`
  states it in the addendum's self-defect paragraph and `.c` cannot close it from `INBOX.md` alone.
- **E13 mail**: no unread mail in this unit's scope — the wave-open Step-0 sweep returned **0 unrowed**
  letters addressed to value.js, and this unit *added* two value-authored bodies to value's own tree
  (outbound retention, not inbound), minting no `I-n`.

#### ADDENDUM-BESIDE · 2026-09-17, post-commit — §B-12 LANDED MID-UNIT AND THE SUBSTRATE MOVED

**E-3: this is an addendum beside the receipts above, not a correction of them.** Every figure in the
acts above was true at its measurement clock and is preserved unedited; what follows is what the tree
did afterwards, measured, with the consequences for `.b` named. **No act of this unit caused it.**

**What happened.** Between this unit's last sacred-checkout read (~12:55) and its record commit
(`ceb5feeb`), **KF.W0's §B-12 seat performed the reconciliation** — the act COHESION **§0j** rules
performed *snapshot-first* under the owner's 2026-09-17 grant. Attribution is by the tree's own
reflog, not by inference ⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js`: `git reflog -n 3`
```
6d280ee7 HEAD@{0}: commit: snapshot(kf): the sacred checkout's 252 tracked modifications as found
                   2026-09-17 (OWNER'S HAND record; KF.W0 §B-12)
8281638c HEAD@{1}: checkout: moving from master to kf-sacred-snapshot-2026-09-17
8281638c HEAD@{2}: commit: fix(demo-shell): provide tooltip context for the routed control group
```
Settled state, double-run ⟨cmd⟩: `git rev-parse HEAD` → **`81a56990`**, branch **`master`**;
`git rev-list --left-right --count origin/master...master` → **`0  0`**;
`git status --porcelain | wc -l` → **6** (6 · 6) — the two packet bodies plus four untracked
`src/` files (`compile/value-ast.ts` · `compile/compiled-frame.ts` · `compile/interp-slot.ts` ·
`group/composite-storage.ts`). Snapshot branch tip **`6d280ee7bec7793846b2e2e1d250e1ea0a21859a`**.
**The sacred checkout is now the settled substrate COHESION §0j.C KF-WRITE(b) describes.**

**OP-1 — the risk fired, and C-11's cure had already landed.** ⟨cmd⟩ `shasum -a 256` on both
originals **after** the reset → `1b8581cc…` / `5f34ab67…`, **unchanged**; both survive as untracked
rows 1–2 of the new porcelain-6. And the value-side copies committed at `426761a7` still verify
byte-for-byte against them ⟨cmd⟩ `git show HEAD:…value-inbox-2026-07-24-… | tail -c 7064 | cmp -
<original>` → identical; same for 07-27 at 15,633 B. **The spec called OP-1 "the wave's single largest
liveness risk" and ordered `.a` first for exactly this reason; the tree moved under this wave inside
the same hour. The ordering was not ceremony.**

**G-KF1-12 — BOTH HALVES, stated separately because they now differ.**
*(a) The value-posture half — what the gate actually guards* ⟨spec `:28`: *"the prohibition is
value's own"*; `:356`: *"every access is a read (`ls`, `git show`, copy **out**)"*⟩: **GREEN and
unmoved.** This unit performed **zero writes, zero git mutations, zero npm** in that tree; every one of
its accesses was `ls` / `stat` / `grep` / `git rev-parse` / `git status` / `git show` / `shasum` / a
copy **out**. Nothing this unit did is in that reflog.
*(b) The MEASURE-AT-OPEN quantity* (`:355` — porcelain **252**, HEAD `8281638c`): **MOVED to porcelain
6 / HEAD `81a56990`, by the authorized KF.W0 §B-12 act.** The spec anticipates precisely this at
**OP-4** — *"**Explicitly NOT required.** … **If it lands first, this wave is unaffected — it anchors on
`origin/master` either way**"* — and at §7 cross-edge 2. **The wave is unaffected on its forward axis**:
§5a's fourteen rows were re-derived at `keyframes-v-exec` @ `origin/master` `81a56990`, which is
**unmoved** (⟨cmd⟩ HEAD = origin/master = `81a56990`, porcelain **0**, re-verified after the reset).
**NOT an escalation of this unit** — no Triumvirate trigger fired, no bound was crossed, no cure became
impossible. Recorded as a **substrate event**, and the two halves are reported separately rather than
collapsed into one verdict the reading no longer supports.

**THE CONSEQUENCE `.b` MUST CONSUME — C-6 / G-KF1-4 is STRENGTHENED, and the handed tuple is now
HISTORICAL.** Re-measured after the reset, double-run:

| substrate | census | status for the withdrawal sentence |
|---|---:|---|
| the sacred **worktree as O-11 measured it** ⟪`8281638c` · porcelain 252 · `/css` 29 · `/value` 15 · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2⟫ | **61** | **NO LONGER EXISTS ON DISK.** This unit's 2026-09-17 reading is its last measurement; it is a dated historical record and **no sha addresses it** |
| snapshot commit **`6d280ee7`** (the §B-12 receipt) | **48** ⟨cmd⟩ `git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' 6d280ee7 -- src \| wc -l` → 48 (48 · 48) | **DOES NOT REPRODUCE 61** — it captures only the *tracked* half; the 13 imports in untracked `src/` files are outside it. **Under C-6's LOCK it may NOT be cited as "the tree measured"** — it is citable only as *the tracked half of that state, preserved 2026-09-17* |
| the sacred worktree **now** (post-reset) | **69** = `/css` 31 · `/value` 18 · `/color` 9 · `/math` 6 · `/easing` 3 · `/transform` 2 | = `origin/master`'s **62** plus **7** from the four untracked `src/` files. **Not O-11's tree and not the frontier** — never cite it as either |
| **frontier of record** `origin/master` **`81a56990`**, porcelain 0 | **62** | **UNMOVED.** All forward anchors and payload item (a) bind here |

**So the honest withdrawal `.b` writes is now sharper than the spec's exemplar, not weaker**: O-11's
*"matches your tree exactly"* certified a worktree state that **has since been reconciled away (§B-12,
2026-09-17)**, that **no sha addresses** — the snapshot that preserves its tracked half reads **48**, not
61 — and that **the recipient could never have re-derived even before the reset**. That is the whole
ground of the withdrawal, and it is now demonstrable rather than merely argued. **`.b` re-runs the three
commands at its own clock regardless (C-6's anti-copy lock); the tuple this unit handed over above is
re-labelled HISTORICAL and must be carried as ⟪measured by KF.W1.a, 2026-09-17, pre-§B-12⟫ or not at
all.** **C-8 is untouched**: §B-12 was *asked* of the owner and performed by the owner's delegated hand
under §0j — `.b`'s addendum still **asks and never claims to have performed** it, and may now record it
as **DONE by the owner's hand on 2026-09-17** rather than as an open request, which is the truthful
form at these bytes.

**Nothing in Acts 1–4 is retracted.** The fourteen drift rows, the 61/81/62 triple and both verbatim
proofs stand as measured; only their *substrate's tense* changed, and this addendum is where that is
said.

---

### KF.W1.b

**Unit**: X.KF.W1.b · The Addendum. **Seat model**: `claude-opus-5[1m]`. **Date**: 2026-09-17.
**Status**: **DONE**. **Commits**: `55e9bf0d` (keyframes-v-exec, pushed to kf `origin/master`) ·
`57dddee0` (value.js, the retained copy) · this record. **Writable set honoured exactly**: the
delivered addendum and its retained copy, and nothing else. **Zero writes, zero git mutations, zero
npm in `/Users/mkbabb/Programming/keyframes.js`** (SACRED-CHECKOUT LAW, spec `:27-28`) — every access
to that tree this seat made was `ls` · `git rev-parse` · `git status` · `git reflog` · `git grep` ·
`grep` · `cat`. Every figure below is this seat's own command output at its own clock; the
load-bearing ones are double-run and the published ones were re-read from the **settled bytes** after
the commits.

#### Act 1 — the substrates, re-measured at this seat's clock (C-1 ANTI-STALENESS; nothing inherited)

⟨cmd⟩ in `keyframes-v-exec`: `git rev-parse HEAD` → `81a56990736ced5b5edde0b84c527680ac7689b1`;
`git rev-parse origin/master` → **the same sha**; `git status --porcelain | wc -l` → **0**; branch
`master`. ⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js` (read-only): `git rev-parse HEAD` →
**`81a56990`** on `master`; `git rev-list --left-right --count origin/master...master` → **`0  0`**;
`git status --porcelain | wc -l` → **6**, the two packet bodies + four untracked `src/` files.
**`.a`'s ADDENDUM-BESIDE reproduces exactly at this seat's clock**: §B-12 has landed, the sacred
checkout is settled, and the 252-dirty / `8281638c` state `.a` measured in its Acts 1–4 is gone.

#### Act 2 — the §5a drift table, RE-DERIVED WHOLE a second time (D-19; `.a`'s table inherited as nothing)

Substrate written into every command: `keyframes-v-exec`, ref **`origin/master`** = `81a56990`,
porcelain 0. **Bare `HEAD` never used.** Method per row: `git cat-file -e origin/master:<path>` plus
`git show origin/master:<path> | sed -n '<n>p'`. **14 of 14 rows reproduce `.a`'s derivation and the
spec's §5a reading exactly** — 4 PATH-drifted (1 · 3 · 5 · 6–8) · 2 LINE-drifted (row 2 `−3`, row 9
`+1`) · 8 EXACT; rows 6–8 path drift with **zero** line drift (`color.ts` 385 L, `:171`/`:250`/`:263`
byte-exact). **ZERO corrections owed; ZERO anchors failed to resolve to a live path** — Triumvirate
trigger (ii) did **not** fire.

**Beyond the commissioned fourteen, and recorded as a completion of payload (a), not a re-scope**:
the **five secondary anchors** the two packets also cite were re-checked in the same motion and all
resolve — `browser.ts:3` **EXACT** · `engine/options.ts:17` **EXACT** · `compile/value-ast.ts:1`
**ABSENT**, live `compile/value/compile.ts:1` = `import { parseCssValues } from "@mkbabb/value.js/css";`
· `internal/leaves.ts:6`/`:9-12`/`:19-21` **EXACT** · `test/internal/leaves-parity.test.ts:1-7`
**EXACT**. Anchors the packets aim at **value's own tree** (`src/css/grammar.ts:181`, `src/easing.ts:168`,
`src/easing.ts:94-132`, `stylesheet.ts:86`) are declared in the letter as deliberately not re-anchored
— they are ours and not actionable from the kf side.

#### Act 3 — G-KF1-3's three sites and §A3's end-state count, RE-DERIVED (never arithmetic)

⟨cmd⟩ `git grep -n 'parseStylesheet' origin/master -- src` → **9 lines** exactly as the spec promises
(3 call sites · 3 imports · 3 prose). The three postures were read **at the bytes**, not taken from
prose: `compile/adapter.ts:222` sits inside `parseSource`, whose body is
`result.ok ? { ast, issues: [] } : { ast: [], issues: result.diagnostics }` → **absorb-to-diagnostics**;
`scroll/grammar.ts:109` passes through `requireParsed` (`:57-63`, `throw new TypeError(...)`) →
**THROW**; `validate.ts:182` sits inside `keyframesNames`'s `try { … } catch { return [] }` →
**swallow-to-`[]`**. All three agree with LIB §7.5's independent reading at
`formation/keyframes/lane-library.md:572+`.

**§A3's end state, re-derived by enumeration with its counting rule pasted at the enumeration** —
*one call-expression on §A3's own alphabet (`parseCssScalar`, `parseCssValues`) plus `parseStylesheet`
(the entry §A2 raised into the class), in `src/`, at `origin/master`, import lines and docblock prose
excluded*: ⟨cmd⟩
`git grep -nE '(parseCssScalar|parseCssValues|parseStylesheet)\(' origin/master -- src | grep -v ':[0-9]*: \*'`
→ **6** (double-run: 6 · 6) — `adapter.ts:222` · `compile/value/compile.ts:32` · `engine/options.ts:31`
· `browser.ts:162` · `scroll/grammar.ts:109` · `validate.ts:182`. **SIX, not three**, and the figure
is an enumeration's `wc`, never `3 + 3`. The letter states the alphabet the count is over and
explicitly declares it **not** a total of every value.js parse entry in the kf tree, with **no ask
riding it** — C-2's *"names only the three missed sites"* and C-7's no-re-scope lock both held.

#### Act 4 — §5b's censuses re-run at this seat's clock, and the ONE dated delta this seat found

```
(C) FRONTIER OF RECORD  [keyframes-v-exec @ origin/master 81a56990, porcelain 0]
$ git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' origin/master -- src | sort | uniq -c
   7 /color  29 /css  3 /easing  5 /math  2 /transform  16 /value        → 62   (62 · 62)

(B) BARE 8281638c — DISQUALIFIED CONTRAST, never "the tree measured"
  10 (root) 9 /color 5 /easing 5 /math 24 /parsing 2 /transform 26 /units → 81   (81 · 81)

(A) THE 61-STATE — NOT RE-RUNNABLE AT THIS CLOCK. The tree that answers this command no longer
    exists: §B-12 reconciled it. `.a`'s 2026-09-17 pre-reset reading is its LAST measurement.

(A') the sacred worktree NOW  → 69 = /css 31 · /value 18 · /color 9 · /math 6 · /easing 3 · /transform 2
(A'') snapshot 6d280ee7 (tracked half only)                                              → 48 (48 · 48)
```

**THE DATED DELTA THIS SEAT ADDS, measured before the withdrawal sentence was authored (G-KF1-4's
RED-remains clause).** `.a` recorded that the snapshot reads 48 and inferred *"the 13 imports in
untracked `src/` files are outside it"*. Measured rather than inferred, this seat: the **four**
surviving untracked `src/` files carry **7** value.js imports ⟨cmd⟩ (`value-ast.ts` 3 ·
`interp-slot.ts` 4 · `compiled-frame.ts` 0 · `composite-storage.ts` 0), so
**snapshot ∪ surviving-untracked = 55** (double-run: 55 · 55) — **not 61**. The remaining 6 were in
files the reset made *tracked* (they exist at `origin/master`), so they are no longer identifiable as
part of that state. **CONSEQUENCE, carried into the letter: the 61-state is NOT reconstructible even
with the owner's preservation snapshot in hand.** Nothing of `.a`'s is corrected — its 48, 69, 62 and
81 all reproduce here exactly; this is a figure `.a` inferred and this seat measured, recorded beside
it per E-3.

**C-6 / G-KF1-4 SUBSTRATE-NAMING RULE, discharged leg by leg** in the letter's §E: (i) the substrate
is the dated tuple ⟪HEAD `8281638c…` · porcelain **252** · **61** = `/css` 29 · `/value` 15 · `/color` 7
· `/math` 5 · `/easing` 3 · `/transform` 2 · measured 2026-07-27 by O-11, last re-measured 2026-09-17
pre-reset by `.a`⟫ — **a record, never a bare sha**; (ii) *"no sha addresses that state and you could
never have re-derived it"* is stated as the **ground** of the withdrawal, now strengthened by the
55 ≠ 61 finding; (iii) the frontier split rides beside it, named as `origin/master` `81a56990` → **62**;
(iv) bare `8281638c` → **81** over a disjoint alphabet is labelled **"a contrast reading only"** and
**"NO"** in the citability column. **Four of the five numerals are this seat's own**; the `61` alone is
a dated historical record carried **with the seat and date that took it**, because the tree that
answers its command is gone — and the letter says exactly that rather than hiding an inheritance.
**LAW-B corollary LOCK honoured**: no sha is cited as "the tree measured" anywhere — the snapshot
`6d280ee7` is explicitly refused that role (it reads 48), and so is the post-reset worktree (69).

#### Act 5 — the letter, delivered and retained (§3 items 3–4; §0j.C KF-WRITE(a))

**Delivered**: `/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`
— their `<SENDER>-INBOUND-*` grammar, **24,108 B · 309 L**, sha256
`80b7c83183909ccbca2ec43f3828d114f23ac57eb15168e2fc3667fe1b8c8a34` (read from the settled bytes).
Committed `55e9bf0d` and **pushed**: ⟨cmd⟩ `git push origin master` → `81a56990..55e9bf0d  master -> master`;
after the push `HEAD` = `origin/master` = **`55e9bf0d2391bbc6d9871bb3f0555a6225daae92`**, porcelain 0.
Session trailer on the kf commit.

**Retained**: `docs/tranches/V/coordination/value-inbox-2026-09-17-o8-o11-amendment-addendum.md`,
**24,443 B** = a 335 B one-line `RETAINED COPY` provenance header (delivered path · date · byte count ·
recipient frontier sha) + the body **verbatim**. Proof, double-run and then re-run from the git object:
`tail -c 24108 <retained> | cmp - <delivered>` → identical (run 1, run 2); `git show HEAD:<retained> |
tail -c 24108 | shasum -a 256` → `80b7c831…`, **byte-identical to the delivered letter**.

**ONE MEANING, TWO TREES, TWO COMMITS** (spec §4b row `.b`): `55e9bf0d` is the delivery, `57dddee0`
is its retention; neither is split and neither carries anything else.

**The letter's recorded substrate sha, stated precisely because it is not the commit that contains it.**
The letter records **`81a56990`** — the exec clone's HEAD at authoring and the ref every measurement in
it names. The delivery commit necessarily advanced `origin/master` to `55e9bf0d`. That commit is
**docs-only and touches no anchor**: ⟨cmd⟩ `git diff --stat 81a56990 55e9bf0d` → *1 file changed, 309
insertions*, and `git rev-parse 81a56990^{tree}:src` = `git rev-parse 55e9bf0d^{tree}:src` =
**`b7b0d950830d529cff6854e7e943c90fb1d83b93`** — **the `src/` tree object is identical**, so all 14 drift
rows, the 5 secondary anchors and the 6 call sites resolve unchanged at the new frontier. The letter
also tells its reader, in its own header, to re-run the commands if their `origin/master` has moved.

#### Act 6 — the four payload items, the ask, the request, the self-defect

| item | where | lock discharged |
|---|---|---|
| **(a)** site-drift correction table | **§A — the FIRST payload section**, as G-KF1-2 requires; 14 rows + 5 secondary anchors + the value-side-anchor declaration | C-5 · D-19: every row re-resolved at this seat, none copied |
| **(b)** the three `parseStylesheet` sites | **§B**, each with its posture read at the bytes and what a THROW does *at that site*; §A3's end state re-derived to **6** by enumeration | C-2: **only** the three; no façade design, no 13-site Tier-A inventory (KF.W2's object) |
| **(c)** the vehicle question **WITHDRAWN** | **§C**, ONE sentence, citing **CC-084** (`CARRY-CUT-LEDGER.md:186`, re-read verbatim this seat) | C-3 **HARD NEGATIVE**: `4.0.1` appears **twice** in the whole letter ⟨cmd⟩ — once inside the quoted question being withdrawn, once inside the ruling's own text. **Never re-asked, never restated as open, no cut date** (⟨cmd⟩ a date sweep over the letter returns **no** date that is not a provenance date), and the letter states in terms that kf's silence neither caused the ruling nor is read as consent |
| **(d)** D-GAP-6 `sampleBezier` → **not adopted** | **§D**, ONE line + the permanence and its ground (`library-band.md:205-206` *"DECLINE — `sampleBezier` / (permanently, measured zero demand)"*, corroborated `:173`), against their `IN-VALUE-2` conditional | C-4: asymmetry **recorded, not litigated**; terminal both sides |
| the **withdrawn certification** | **§E**, on the SUBSTRATE-NAMING RULE, six-row citability table | C-6 / G-KF1-4, above |
| the **minimal mark ask** | **§F** — `IN-VALUE-3` (O-8) / `IN-VALUE-4` (O-11), their grammar, their numbering, their call | C-12 **HARD NON-GATING**: the letter says in its own voice that nothing on our side gates on it |
| the **§B-12 request** | **§G** — asked as the owner's act, with the reflog + snapshot receipt showing it was performed 2026-09-17 under the owner's explicit grant, in the reversible snapshot-first form | C-8: **ASKED, never performed by this wave**; the letter never claims value.js took it unilaterally, and the preserved ref `6d280ee7…` is named so nothing reads as discarded |
| the **self-defect paragraph** | **§H** — the sweep-path law named the frozen tree; and the **memory limb** (`~/.claude/…/memory/feedback-mail-inbox-law.md:16`, re-measured this seat: still naming `../keyframes.js/docs/tranches/V/`) is stated as an **OPEN residual routed to the OWNER**, out of bounds for this and every wave | §4c's STABLE DENOMINATOR of **TWO** carried honestly: the in-bounds limb is `.c`'s cure, the out-of-bounds limb is disclosed rather than silently left |
| **C-7's inherited payload** | **§I** — re-anchored **by table reference only** | no re-ask, no re-scope, no severity change, no new obligation; §E2 `lerpArray` **re-delivered and explicitly not scheduled** |

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (this seat's own re-measure) | AFTER | verdict |
|---|---|---|---|
| **G-KF1-1** DELIVERY | ⟨cmd⟩ `ls $PROG/keyframes-v-exec/docs/tranches/V/coordination/` → **10 entries** (9 files + `vnext/`); no addendum, no O-8, no O-11 | **11 entries**; the addendum present, tracked, pushed; ⟨cmd⟩ `git show origin/master:<letter> \| grep -c '81a56990736c…'` → **2** — the clone HEAD sha is recorded **inside** the letter | **RED → GREEN** |
| **G-KF1-2** ANCHOR LIVENESS | 3 packet paths ABSENT at `origin/master`; `browser.ts` → `:162` (packet `:165`); `package.json` → `:70` (packet `:69`); no letter existed | **every `file:line` asserted in the letter re-verified at `origin/master`** by `cat-file -e` + line-content assertion — 14 drift rows + 5 secondary anchors + 6 call sites + `requireParsed`'s `:57-63`; the drift table is the letter's **FIRST** payload section | **RED → GREEN** |
| **G-KF1-3** `parseStylesheet` COMPLETENESS | grep → **9 lines**; O-11 §A3 names **0 of 3** call sites | all three named at re-resolved anchors with their LIB §7.5 postures (⟨cmd⟩ each site string appears **2×** in the letter — table row + prose); end-state count re-derived to **6** by enumeration | **RED → GREEN** |
| **G-KF1-4** IMPORT CENSUS | frontier **62** · **61** un-re-runnable (tree gone) · disqualified **81** · snapshot **48** · snapshot∪untracked **55** · worktree-now **69**; certification un-withdrawn | withdrawn in §E on the SUBSTRATE-NAMING RULE, all four legs; ⟨cmd⟩ *"matches your tree exactly"* appears **once**, inside the quoted sentence being withdrawn; *"off-by-one"* appears **once**, as an explicit **denial**; **no sha is cited as the tree measured** | **RED → GREEN** |
| **G-KF1-5** VEHICLE QUESTION | O-8 `:101-103` asks it; ⟨cmd⟩ `4.0.1` sweep over the three coordination trees → **5 hits** (the spec's dated 4, **plus `.a`'s retained copy at `:104`** — a dated delta of value's own tree, recorded); **ZERO under `keyframes-v-exec`**; withdrawal nowhere | ⟨cmd⟩ `grep -rniE 'withdraw' $PROG/keyframes-v-exec/docs/tranches/V/coordination/` → **6 hits in the addendum** (the 7th is `vnext/skeptic-H1-r2.md:65`, unrelated); the question is closed in §C citing CC-084, **no cut date** | **RED → GREEN** |
| **G-KF1-6** D-GAP-6 CONDITIONAL | `INBOX.md` **I-10** (`:47`) carries *"only if a future 4.1 ships it"*; `library-band.md:205-206` reads the permanent DECLINE; **never joined in any letter** | joined in §D in one line, with the permanence and its ground, against their own `IN-VALUE-2` row; asymmetry recorded, nothing re-litigated | **RED → GREEN** |
| **G-KF1-10** MARK REQUESTED (**ask half only**) | ⟨cmd⟩ `INBOUND-LEDGER.md` at `origin/master` → **9 rows**, no `IN-VALUE-3/4` | the explicit minimal ask is in §F in their grammar (⟨cmd⟩ `IN-VALUE-3` present). **Their half re-measured AFTER delivery: still 9 rows — RECORDED, NOT REPAIRED**, and declared non-gating in the letter itself | **ask half RED → GREEN**; counterparty half **NOT A GATE** (C-12) |
| **G-KF1-12** SACRED CHECKOUT (stay-GREEN, not this unit's gate) | value-posture half GREEN | **GREEN — STAYED**: zero writes, zero git mutations, zero npm in `/Users/mkbabb/Programming/keyframes.js` by this seat; its reflog head is unmoved at `HEAD@{0}: reset: moving to origin/master` (KF.W0's act, not this seat's) | **GREEN → GREEN** |

Untouched by this unit: **G-KF1-7** and **G-KF1-8** remain **RED-AS-EXPECTED** (they are `.c`'s, and
G-KF1-7 is void ahead of G-KF1-1, which is now GREEN — `.c` may open). **G-KF1-9** stands **GREEN**
from `.a` and is *extended* by this unit's retained copy. **G-KF1-11** remains DECLARED-SATISFIED.

#### Locks discharged

**C-1** *"Amend, do not re-send"* + ANTI-STALENESS — the letter amends and re-sends nothing; **every**
interval, count and anchor in it was re-measured at this seat's clock (silence **61 d**, O-8 **55 d**,
O-11 **52 d**, by `date` arithmetic against 2026-09-17, replacing the spec's dated 41/35/32).
**C-2 · C-3 · C-4 · C-5 · C-6 · C-7 · C-8 · C-12** — discharged as tabulated in Act 6.
**ANCHOR DUALITY (§5b)** — two substrates, each named in its own command; **bare `HEAD` never used**;
`8281638c` appears only as a named historical context and as the labelled disqualified contrast.
**§4a disjointness** — this unit wrote two files, neither `.a`'s nor `.c`'s; `INBOX.md` untouched.
**§0j.C KF-WRITE(a)** — delivery landed in `keyframes-v-exec`, committed **and pushed** to kf
`origin/master`, session trailer on the kf commit.

#### Residuals · escalations

- **Escalations: NONE.** No Triumvirate trigger fired: (i) OP-1's bodies were live and are now inside
  value's git at `426761a7`; (ii) **zero** anchors failed to resolve to a live path; (iii) the delivery
  succeeded on the **first** attempt (one commit, one push, no retry).
- **Bounds note (recorded, not a deviation)**: the delivered letter carries the standing seat receipt
  `SERVED MODEL: …` as line 1, above the letter's own title — the same prefix treatment `.a` applied to
  the two back-fills, and it is *prefix* matter carrying no claim about keyframes.
- **Dated delta this seat measured**: **snapshot ∪ surviving-untracked = 55, not 61** — the 61-state is
  not reconstructible even with the preservation snapshot. Recorded beside `.a`'s inferred *"13"*, not
  over it; `.a`'s own 48 / 69 / 62 / 81 all reproduce exactly here.
- **Dated delta on G-KF1-5's own witness**: the `4.0.1` three-tree sweep now returns **5**, not the
  spec's dated 4 — the fifth hit is `.a`'s retained O-8 copy at `value-inbox-2026-07-24-*.md:104`,
  i.e. **the G-KF1-9 cure entering G-KF1-5's census**, the §4c self-reference class one file over. The
  gate's load-bearing property is untouched: **ZERO hits under `keyframes-v-exec/docs/tranches/V/coordination/`
  before delivery**, and the question is asked in exactly one place and now withdrawn in one.
- **OPEN residual, out of bounds, routed OWNER (§4c)**: the memory limb
  `~/.claude/projects/-Users-mkbabb-Programming-value-js/memory/feedback-mail-inbox-law.md:16` still
  names `../keyframes.js/docs/tranches/V/` among its four landing paths (re-measured this seat). It is
  **owner configuration** — not this unit's and not any unit's to edit unasked — and it is now stated
  **in the addressee's own copy of the letter** (§H), so the disclosure cannot be lost with our tree.
  `INBOX.md` alone does not close the class.
- **Recorded, not repaired (C-12)**: keyframes' `INBOUND-LEDGER.md` still reads **9 rows** after
  delivery. Theirs to perform; non-gating by construction.
- **For `.c`**: G-KF1-1 is **GREEN**, so C-10's ORDERING lock is satisfied and the ledger edits may
  proceed. The receipt tuple for I-26's CURED row is ⟪ delivered path
  `/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`
  · date **2026-09-17** · exec-clone HEAD **at authoring `81a56990`**, **at delivery `55e9bf0d`**
  (docs-only, `src/` tree object identical) ⟫. Re-run the MINT-LAW max-grep at your own write.
- **E13 mail**: re-swept at this seat — the four paths carry **0 unrowed letters addressed to
  value.js**; the reconciled keyframes coordination dir holds **no keyframes-authored letter to
  value.js** (⟨cmd⟩ `ls` → 9 inbound + `INBOUND-LEDGER.md` + the two untracked packet bodies +
  `vnext/`). This unit minted **no `I-n`** — it sent outbound. **No unread mail in this unit's scope.**

---

### KF.W1.c

**Unit**: X.KF.W1.c · Ledger and Law. **Seat model**: `claude-opus-5[1m]`. **Date**: 2026-09-17.
**Status**: **DONE**. **Commits**: `4ffa4f59` (the three `INBOX.md` edits + the Step-0 sweep line, **ONE
commit, not split**) · this record. **Writable set honoured exactly**: `docs/tranches/V/coordination/INBOX.md`
and nothing else — ⟨cmd⟩ `git show --stat HEAD` → *1 file changed, 11 insertions(+), 4 deletions(-)*.
Zero writes anywhere in `/Users/mkbabb/Programming/keyframes.js` and `keyframes-v-exec` (both read-only
at this seat: `ls`, `git rev-parse`, `git status`, `git log`, `git show`, `grep`, `shasum`). Every figure
below is this seat's own command output; the load-bearing ones are double-run and were re-read from the
**settled bytes** — worktree and git object both — after the commit.

#### Act 0 — the ORDERING lock, verified before anything else (C-10: `.c` is void ahead of G-KF1-1)

⟨cmd⟩ in `keyframes-v-exec`: `ls docs/tranches/V/coordination/` → **11 entries** including
`VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`; `git log --oneline -1 -- <that path>` →
**`55e9bf0d`**; `git rev-parse HEAD` = `git rev-parse origin/master` = **`55e9bf0d2391bbc6d9871bb3f0555a6225daae92`**,
`git status --porcelain | wc -l` → **0**; `wc -lc <letter>` → **309 L / 24,108 B**; `shasum -a 256` →
`80b7c83183909ccbca2ec43f3828d114f23ac57eb15168e2fc3667fe1b8c8a34` — **identical to `.b`'s published sha**.
**G-KF1-1 is GREEN, re-verified independently at this seat**, so the ledger may record CURED. A ledger that
marks CURED ahead of delivery reproduces I-26 one layer up; this seat measured the delivery rather than
inheriting `.b`'s word for it.

#### Act 1 — the MINT LAW, re-run FIRST and immediately before writing (C-10)

⟨cmd⟩ `grep -oE '^\| O-[0-9]+' docs/tranches/V/coordination/INBOX.md | sort -t- -k2 -n | tail -1`
→ **`| O-20`** (**double-run: O-20 · O-20**). **Therefore `max+1` = `O-21`.** The spec's commissioned
literal and the measured mint **agree at this seat's clock**, exactly as they did at wave-open —
**no delta, so no dated delta addendum is owed before executing.** The measurement was taken from the
ledger, not from the spec; had they disagreed the measured id would have governed.

**Dated deltas against the WAVE-OPEN baseline, stated not silently applied (E-3) — none of them a MINT delta:**

1. **The ledger grew on axes the mint does not read.** `INBOX.md` measured **100 L / 62,178 B** at wave-open
   and **109 L / 70,241 B** at this seat's open ⟨cmd⟩ `wc -lc`. The growth is other tracks' seat-0 work
   appended at the tail: **`I-31` minted by X-W0's Track A seat** (the atlas Q-lane `ATLAS-TO-VALUE-2026-07-28-PASS2.md`,
   UNREAD) plus the X.P.W0 · KF.W0 · X-W0 · F.W0 Step-0 sweep lines. **The inbound tail moved `I-30` → `I-31`;
   the OUTBOUND max did not move** — the grep is scoped `^\| O-`, and `I-31` is inbound.
2. **All four anchors resolved unchanged at this seat's open** — the row ids are the anchors and every one
   held its line as well: the sweep law at **`:15-16`**, `I-10` at `:47`, **`I-26` at `:92`**, **`O-20` at `:95`**
   (and `O-8` at `:72`, `O-11` at `:75`). Nothing drifted; no INTENT-at-true-bytes relocation was needed for
   any commissioned coordinate.
3. **ONE drifted LITERAL, cured by INTENT at the true bytes and recorded here.** C-10's ANTI-RENAME lock
   commissions *"O-8/O-11's rows keep **"SENT — no reply on record"** plus an amended-by-O-21 pointer"*.
   ⟨cmd⟩ `grep -c 'no reply on record' docs/tranches/V/coordination/INBOX.md` → **0** before this write:
   **that literal string does not exist at the bytes.** The true cells read `**SENT** 2026-07-24. Decision
   asked: \`4.0.1\` vs coherent tuple` and `**SENT** 2026-07-27. Asks + declarations only; no keyframes edit
   made or implied`. The lock's **intent** — *keep the row's own text, never rewrite it, add a pointer* — was
   applied to the text that is actually there: **both cells are preserved byte-for-byte** ⟨cmd⟩ (each still
   matches its original string, verified post-commit), the `— **no reply on record.**` clause is appended as
   a statement of fact this seat re-measured (their `INBOUND-LEDGER.md` is unmoved at 9 rows), and the
   pointer follows it. **No rewrite, no re-key, no id change.**

#### Act 2 — the three surgical edits, ONE commit (`4ffa4f59`; §7 SAME MOTION, C-9 + C-10 not split)

**(i) C-9 / G-KF1-8 — the four-path preamble's keyframes bullet, on the `7a7dc6ef` glass-limb template.**
The superseded law read, whole:
```
- `../keyframes.js/docs/tranches/V/coordination/` — the keyframes exchange (their
  `<SENDER>-INBOUND-*` grammar; the tranche root is NOT a mail path)
```
It now reads, at the settled bytes ⟨cmd⟩ `sed -n '15,20p'`:
```
- `../keyframes-v-exec/docs/tranches/V/coordination/` — the keyframes exchange, THE DELIVERY PATH (their
  `<SENDER>-INBOUND-*` grammar; the tranche root is NOT a mail path)
- `../keyframes.js/docs/tranches/V/coordination/` — the SACRED checkout: **READ-ONLY / NEVER-DELIVER**
  (sweep it for inbound, never land a letter there. A letter left in a frozen checkout is not
  delivered — the path, not the content, was the defect; that pin cost O-8 and O-11 55 and 52 days
  undelivered → I-26)
```
**SIZING LOCK (C-9, KISS / L-19) discharged by construction: TWO bullet lines plus ONE sentence of
rationale**, shaped on the glass limb's own two-sentence parenthetical (rule sentence + recorded-cost
sentence) that `7a7dc6ef` established at `:12-14`. **No routing subsystem, no script, no linter, NO CRON**
— ⟨cmd⟩ `git status --porcelain` shows exactly one modified path from this seat. **The grammar note is
verbatim** ⟨cmd⟩ `grep -c '`<SENDER>-INBOUND-\*` grammar; the tranche root is NOT a mail path)'` → **1**,
and it rides the delivery path where a sender needs it. **The sacred checkout is marked, not deleted** —
per C-9's own reasoning that other senders' inbound really does land there and the sacred rule must stay
visible. **The cost figures are this seat's own** ⟨cmd⟩ `date -j -f %Y-%m-%d` arithmetic against 2026-09-17:
2026-07-24 → **55 days**, 2026-07-27 → **52 days** (2026-07-18 → 61, the silence figure, unused here).

**(ii) C-10(i) / G-KF1-7 — `I-26` ROWED → CURED, id kept, prior text kept whole.** The status cell's verb
becomes `**ROWED 2026-08-03 → CURED 2026-09-17**` and the original sentence — *"a letter that lands untracked
in a frozen checkout is NOT delivered … no kf-side wave may consume O-8/O-11 obligations until it lands"* —
**stands unedited** as the dated record it is; the receipt is **appended beside it**, never over it (E-3's
shape applied inside a live ledger row). The receipt carries the three commissioned legs — **absolute
delivered path** `/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`
· **date 2026-09-17** · **exec-clone HEAD `81a56990` at authoring and `55e9bf0d` after the docs-only delivery
commit** (both stated, because the letter records the first and the tree now carries the second; `src/` tree
object identical, so no anchor moves) — plus payload (a)–(d), the retention commits (`426761a7` · `57dddee0`)
and the bytes/sha. **The kf-side mark is left as an OPEN sub-row**, re-measured at this seat rather than
inherited ⟨cmd⟩ in `keyframes-v-exec`: `git show origin/master:docs/tranches/V/coordination/INBOUND-LEDGER.md
| grep -oE 'IN-[A-Z]+-[0-9]+' | sort -u` → **9 rows** `IN-ATLAS-1..5 · IN-GLASS-1..2 · IN-VALUE-1..2` —
**no `IN-VALUE-3`/`IN-VALUE-4`**, after delivery. **NON-GATING by construction (C-12)**; recorded, not repaired.
The out-of-bounds memory limb is carried in the same row as an **OPEN residual routed OWNER**.

**(iii) C-10(ii)+(iii) — `O-21` minted, `O-8`/`O-11` pointed at it without a rewrite.** The new row sits at
the ledger's append point (after `I-31`, which is where rows accrete in this file — `O-20` likewise sits
between `I-25` and `I-28`), five cells on the outbound header `| # | Date | To | Letter | Status |`, and names
**payload items (a)–(d) by letter and by section** — §A the drift table placed FIRST (4 path-drifted ·
2 line-drifted · 8 exact) · §B the three `parseStylesheet` sites with their postures · §C the vehicle question
withdrawn on CC-084 with no cut date · §D D-GAP-6 `sampleBezier` not adopted — together with §E (the
certification withdrawn on a worktree-state record, never a sha), §F, §G, §H and §I. `O-8` and `O-11` each
keep their status text **verbatim** and gain an `**AMENDED BY O-21**` pointer that says in its own words that
the row's text stands as written.

#### Act 3 — the dated E13 Step-0 four-path sweep, appended at the file end (§7 standing law)

Swept read-only at this seat's own clock, not inherited from wave-open. **(1)** value `V/` + `V/coordination/`
— `INBOX.md` self-excluded (SELF-COUNT law); newest non-self = `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09
and the two `value-inbox-2026-07-2{4,7}-*` back-fills@12:54, **all three ours** (`.a`/`.b`'s own retention);
`V/*.md` tops out at `DECISIONS.md`@2026-07-17. **(2)** `../glass-ui/docs/tranches/BK/coordination/` —
**BK re-confirmed newest** ⟨cmd⟩ `ls -ldt ../glass-ui/docs/tranches/*/` → BK@2026-09-17 12:49 ≻ BJ@08-03 ≻
BI@07-28; newest letter `glass-outbound-2026-08-29-valuejs-o20-ack.md` = **I-30, rowed**; BK's 09-17 writes are
`ASK.md` · `PLAN.md` · `BURNDOWN.md` · `EXECUTION-PROGRESS.md` — **not mail paths**. **(3)**
`../keyframes.js/docs/tranches/V/coordination/` — 11 entries + `vnext/`, every one ours, a third-party→kf
letter, or kf's own `INBOUND-LEDGER.md`; **no keyframes-authored letter addressed to value.js**. The uniform
`2026-09-17 12:58` mtimes there are **the §B-12 reset rewriting the working tree, not new mail** — every body's
content date is 2026-07-16/17/24/27, a reading this seat states rather than letting a mtime sweep manufacture
eleven false positives. **(4)** atlas `P/coordination/` — 28 entries, newest
`valuejs-inbound-2026-07-27-library-band-export-delta.md`@2026-08-03, **ours**, rowed. ⟨cmd⟩ delta test
`find <the four paths> -maxdepth 1 -type f -newermt '2026-09-17 00:00'` → value's own four files and the
eleven reset-touched keyframes files; **no new inbound anywhere**. **RESULT: 0 unrowed letters addressed to
value.js · 0 new `I-n` minted · `I-31` remains the inbound tail · `O-21` is the new outbound tail. No wave
closes with UNREAD mail in scope — KF.W1 does not.**

#### §4c — the two censuses re-run at this write, and the class-H growth booked by the partition's own rule

The wave-open baseline assigned this to `.c` explicitly. **Both totals are published at TWO CLOCKS, because
the first reading was invalidated by this receipt's own append — the D4-2(a) mechanism §4c names, firing
inside the very seat that books it.** ⟨cmd⟩ over `docs/ --include='*.md'`: census **(1)**
`grep -rnF 'keyframes.js/docs/tranches/V/coordination'` → **50 hits / 32 files** at the `INBOX.md` write,
**57 / 32 re-run LAST at this receipt's own settled bytes**; census **(1b)**
`grep -rnF '../keyframes.js/docs/tranches/V/'` → **38 / 19** at the write, **45 / 19 re-run last**;
census **(2)**, the subject,
`grep -n '^- \`\.\./keyframes\.js' docs/tranches/V/coordination/INBOX.md` → **exactly 1, now `:17`**,
**unmoved at both clocks — the gate's own witness is stable because it is scoped to the law, not to the corpus.**
**The entire +7 / +7 delta is THIS FILE**: ⟨cmd⟩ a `grep -cF` of each pattern over this record alone → **8**
and **10** occurrences, all of them written above by this seat. The **file** counts did not move (**32 / 19**)
— this record was already a member before the append, so nothing entered or left the partition; only its own
membership deepened. Neither raw total is operative, at either clock.
The round-4 readings were 26/18 and 15/8, round-5's 27/19 and 16/9. **Class H took its FOURTH member exactly
as its own rule predicts** — `conformance/PASS-6/KF-W1-CHECK.md:165` joined `PASS-1:125` · `PASS-4:189` ·
`PASS-5:165`. The remaining growth is the **execution-record layer** that did not exist at any repair round
(`X/EXECUTION-RUNBOOK.md`, `X/execution/{A,B,C,D}/*`, `X/union/RUNBOOK-DRAFT-{A,B}.md`,
`X/keyframes/W0/SUBSTRATE-SETTLE-2026-09-17.md`) **plus this wave's own cure artefacts** (`.a`'s two back-fills
and `.b`'s retained copy, which quote the path they were written to repair) — i.e. **every new member is a
file that WRITES ABOUT the path, and not one of them EXECUTES it.** That is the SELF-REFERENCE DISCLOSURE
firing for the third consecutive reading, and it is why the raw total is **not re-issued as an operative
numeral**.

> **THE STABLE DENOMINATOR, re-derived at this write — the only figure any act here depended on.**
> BEFORE: **TWO** executing consumers — `INBOX.md:15-16` (in bounds) and the memory limb (out of bounds).
> AFTER: **ONE**, and it is the out-of-bounds one. `INBOX.md`'s limb is **CURED** — it no longer names a
> frozen tree as a landing path; the sacred checkout survives in the law as an inbound-sweep target marked
> **READ-ONLY / NEVER-DELIVER**. ⟨cmd⟩ `grep -n '\.\./keyframes\.js/docs/tranches/V/'
> ~/.claude/projects/-Users-mkbabb-Programming-value-js/memory/feedback-mail-inbox-law.md` → **`:16`**,
> still naming `../keyframes.js/docs/tranches/V/` **and** a stale glass `BI` pin (the glass limb `7a7dc6ef`
> cured in the ledger but not in memory — the same defect, two limbs, one of them beyond every wave's bounds).
> **OPEN, routed OWNER. Repairing `INBOX.md` alone does not close the class**, and this seat states it here
> and in the addressee's own copy of the letter (§H) rather than letting the cure read as complete.

#### Gate readings — BEFORE → AFTER (this seat's own re-measure at both ends; double-run)

| gate | BEFORE (re-measured at this seat, pre-write) | AFTER (settled bytes, worktree **and** git object) | verdict |
|---|---|---|---|
| **G-KF1-7** LEDGER VERBS | ⟨cmd⟩ `grep -n '^\| I-26 '` → **`:92`**, reading `**ROWED 2026-08-03**` with the cure described-but-unperformed; ⟨cmd⟩ max-grep → **`O-20`** (double-run), **no `O-21` row**; ⟨cmd⟩ `grep -c 'no reply on record'` → **0**; `O-8`/`O-11` carry no pointer | `I-26` reads **`ROWED 2026-08-03 → CURED 2026-09-17`** with its three-leg receipt (absolute delivered path · date · exec-clone HEAD `81a56990`→`55e9bf0d`) and the kf-side mark as an **OPEN sub-row**; ⟨cmd⟩ max-grep → **`O-21`** (double-run: O-21 · O-21) at worktree **and** ⟨cmd⟩ `git show HEAD:…` → **`O-21`**; ⟨cmd⟩ `grep -c '^\| O-21 '` → **1**, naming (a)–(d); `O-8`/`O-11` original cells still match byte-for-byte (⟨cmd⟩ → 1 · 1) **and** each carries `AMENDED BY O-21` (⟨cmd⟩ → 1 · 1); `grep -c '^\| I-26 '` → **1** (id kept) | **RED → GREEN** |
| **G-KF1-8** SWEEP-PATH LAW | ⟨cmd⟩ the gate's own narrowed witness `grep -n '^- \`\.\./keyframes\.js' INBOX.md` → **exactly 1 hit, `:15`**, naming `../keyframes.js/…` as the keyframes exchange path — the tree that produced I-26 | the narrowed witness still returns **exactly 1 hit**, now **`:17`**, and it reads *"the SACRED checkout: **READ-ONLY / NEVER-DELIVER**"*; delivery is carried by a **new** bullet ⟨cmd⟩ `grep -n '^- \`\.\./keyframes-v-exec'` → **`:15`**, the exec-visible tree; the grammar note is verbatim (⟨cmd⟩ → 1); **two lines plus one sentence**; no tooling minted | **RED → GREEN** |

Untouched by this unit and **unchanged**: **G-KF1-1** · **-2** · **-3** · **-4** · **-5** · **-6** · **-9**
· **-10 (ask half)** stand **GREEN** from `.a`/`.b`; **G-KF1-10's counterparty half** is **NOT a gate** (C-12)
and measures **9 rows, unmoved** at this seat; **G-KF1-11** remains **DECLARED-SATISFIED**; **G-KF1-12**
remains **GREEN — STAYED** (⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js`: zero writes, zero git
mutations, zero npm by this seat; every access was `ls` / `git rev-parse` / `git status` / `git show` / `grep`).

**WAVE TALLY AT THIS SEAT'S CLOSE: 10 born-RED gates, 10 GREEN** (G-KF1-10 on its ask half, as specced) ·
**1 DECLARED-SATISFIED** · **1 stay-GREEN INVARIANT, STAYED**.

#### Locks discharged

**§7 SAME MOTION** — C-9 and C-10 landed in **one commit, `4ffa4f59`**, not split: the ledger and the law that
broke it are cured together, which is the whole point of the lock.
**C-10 ORDERING** — the edits were made strictly **after** G-KF1-1 was verified GREEN at this seat (Act 0).
**C-10 MINT LAW** — the max-grep was re-run **first and immediately before writing**, double-run; `max+1`
governs and the spec's literal was checked against it, never trusted over it; no delta, so no addendum owed.
**C-10 ANTI-RENAME** — `I-26` keeps its id and its prior text; `O-8`/`O-11` keep their cells verbatim and gain
pointers; the one drifted commissioned literal was applied by **intent at the true bytes** and recorded (Act 1 §3).
**C-9 SIZING LOCK (KISS, L-19)** — two lines plus one sentence; no subsystem, no script, no linter, **no cron**.
**§4a single-writer** — this unit wrote `INBOX.md` alone and nothing else wrote it; `.a`'s and `.b`'s paths
were untouched.
**E-3** — nothing dated was rewritten: the superseded law text is quoted whole above, `I-26`'s 2026-08-03
sentence stands unedited inside its own row, and every correction is stated rather than silently applied.
**WRITE-THEN-MEASURE / SELF-COUNT** — every published figure was read from the settled bytes, the
load-bearing ones twice and from the git object as well.

#### Residuals · escalations

- **Escalations: NONE.** No Triumvirate trigger is in this unit's scope and none fired: the ledger was live,
  every commissioned anchor resolved, and the single drifted literal had a lawful intent-at-the-bytes cure
  that did **not** require substituting a different act.
- **OPEN sub-row, recorded not repaired (C-12)**: keyframes' `INBOUND-LEDGER.md` at kf `origin/master` reads
  **9 rows** after delivery — no `IN-VALUE-3`/`IN-VALUE-4`. Theirs to perform; **non-gating by construction**,
  and the row says so in its own voice.
- **OPEN residual, OUT OF BOUNDS, routed OWNER**: the session-memory limb
  `~/.claude/projects/-Users-mkbabb-Programming-value-js/memory/feedback-mail-inbox-law.md:16` still codifies
  the frozen keyframes sweep path **and** a stale glass `BI` pin. It is owner configuration — not this unit's
  and not any unit's to edit unasked — so the STABLE DENOMINATOR closes at **ONE**, not zero. Until it is
  cured the next session opens with the frozen path re-injected; `INBOX.md` alone cannot close the class.
- **Dated observation, not a defect**: `INBOX.md` grew **100 L / 62,178 B → 109 L / 70,241 B** between
  wave-open and this seat (other tracks' seat-0 rows and sweep lines, incl. `I-31`), and to **116 L / 79,733 B**
  after this write. No commissioned anchor moved.
- **Dated observation on §4c**: censuses (1)/(1b) now read **50/32** and **38/19** against round-5's 27/19 and
  16/9. Class H grew by its own rule (PASS-6); the rest is the execution-record layer and this wave's own cure
  artefacts. **Not operative** — the STABLE DENOMINATOR is, and it went **TWO → ONE**.
- **E13 mail**: the four-path Step-0 sweep at this seat returned **0 unrowed letters addressed to value.js**;
  the dated sweep line is appended at `INBOX.md`'s end. **No unread mail in this unit's or this wave's scope.**
- **Note for the wave-close seat**: the repaired sweep law takes effect **at the very next wave-open,
  program-wide** (spec §7). Every track's Step-0 from here sweeps `../keyframes-v-exec/docs/tranches/V/coordination/`
  for delivery and treats `../keyframes.js/docs/tranches/V/coordination/` as inbound-only, READ-ONLY / NEVER-DELIVER.
