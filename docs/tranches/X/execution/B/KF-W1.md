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
