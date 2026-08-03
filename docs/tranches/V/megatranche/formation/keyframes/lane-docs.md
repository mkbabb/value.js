Served model id: `claude-opus-5[1m]`

# keyframes.js — TRANCHE/DOCS CENSUS (lane: formation/keyframes)

**Scope.** Static, read-only census of `/Users/mkbabb/Programming/keyframes.js` (tranche ledger,
coordination mail, precepts/CLAUDE state, release state) plus the value.js side of the
value↔keyframes obligation set. **No write, no git-mutation, no npm, no dev server, no browser
tooling touched keyframes.js or fourier-analysis.** Every claim below carries a `file:line` or a
pasted command + output. Counts are measured, never estimated.

**Date of census:** 2026-08-03.

---

## §0 — THE HEADLINE HAZARD, FIRST (read before anything else)

**There are TWO keyframes trees and value.js has been writing mail into the wrong one.**

```
$ cd /Users/mkbabb/Programming/keyframes.js && git rev-parse origin/master master
81a56990736ced5b5edde0b84c527680ac7689b1     # origin/master
8281638c0ac4ac8c54a67a018ca5bf6a9117174f     # local master
$ git rev-list --left-right --count origin/master...master
41	1
```

- `/Users/mkbabb/Programming/keyframes.js` — **the OWNER CHECKOUT. Declared SACRED** by
  keyframes' own handoff (`docs/tranches/V/EXECUTION-HANDOFF.md:13-18`: "no mutating git, no npm
  operations there, ever"). It sits **41 commits behind `origin/master`**, on a 5.3.5-era base,
  carrying an uncommitted pre-V transaction (`git status --porcelain | wc -l` → **252**) plus the
  untracked V plan folder.
- `/Users/mkbabb/Programming/keyframes-v-exec` — the execution clone, HEAD `81a56990` = `origin/master`,
  where V actually executed (`EXECUTION-HANDOFF.md:19-27`).

**Both value.js packets O-8 (2026-07-24) and O-11 (2026-07-27) were delivered into the SACRED
STALE OWNER CHECKOUT and exist nowhere else:**

```
$ comm -23 <(find docs/tranches/V -type f | grep -v design-captures | sort) \
           <(git ls-tree -r --name-only origin/master -- docs/tranches/V | grep -v design-captures | sort)
docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md
docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md
$ ls /Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/
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
```

Two consequences: (1) O-8 and O-11 are untracked files on a checkout nobody executes in — an
executing keyframes agent working from `origin/master` or the exec clone **will never see them**;
(2) the only two value packets with a `*-marks.md` counterpart on the keyframes side are the
2026-07-17 pair — **O-8 and O-11 are UNMARKED and UNANSWERED**.

**And the packets were MEASURED against that stale tree.** Proof, three independent legs:

| Leg | Owner checkout (stale) | `origin/master` (real HEAD) |
|---|---|---|
| value.js import census (O-11 §A3 claims "61 … matches your tree exactly") | `grep -rhoE 'from "@mkbabb/value\.js[^"]*"' src \| wc -l` → **61** (css 29 · **value 15** · color 7 · math 5 · easing 3 · transform 2) — an exact match to the letter | `git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' origin/master -- src \| wc -l` → **62** (css 29 · **value 16** · color 7 · math 5 · easing 3 · transform 2) |
| O-11 §A3 site `compile/value-ast.ts:71` | `sed -n '71p' src/animation/compile/value-ast.ts` → `        const parsed = parseCssValues(value);` ✓ | `git cat-file -e origin/master:src/animation/compile/value-ast.ts` → **ABSENT**; the live site is `src/animation/compile/value/compile.ts:32` |
| O-11 §C K1 anchor `compile/easing/easing-registry.ts:36` | `sed -n '36p' …/easing-registry.ts` → `/** Stable identities let the serializer distinguish named curves from closures. */` ✓ | path **ABSENT**; live file is `src/animation/compile/easing/registry.ts` (same text at `:36`) |

The **findings are real** — most anchors still resolve at HEAD (see §6) — but four cited paths were
renamed by V's W5 module carves (`eb4379ca`, `6f6adfaa`, `94f2c3c9`, `b3b362d9`) and any keyframes
executor working from HEAD will bounce off them.

---

## §1 — TRANCHE LEDGER STATE

### 1.1 Letters

22 tranche letters on disk, **A through V**, contiguous:

```
$ ls docs/tranches/
A B C D E F G H I J K L M N O P Q R S T U V
```

File counts per letter (`find <dir> -type f | wc -l`): A 15 · B 72 · C 87 · D 19 · E 84 · F 64 ·
G 56 · H 184 · I 359 · J 228 · K 218 · L 31 · M 61 · N 27 · O 25 · P 26 · Q 37 · R 44 · S 220 ·
T 194 · U 87 · V 99. **No `docs/tranches/W` exists** on disk or at `origin/master` (probe:
`git ls-tree -r --name-only origin/master -- docs/tranches/W` → empty).

### 1.2 Last close: U — CLOSED and sealed

`docs/tranches/U/FINAL-U.md` (199 lines) exists; commit `ed431ab0 docs(tranche-u): seal the
immutable release and deployment packet`. U's release act = **6.0.0**, tag `v6.0.0`.

### 1.3 Current tranche: V — EXECUTED, then FOLDED to a successor

V is **not** a formation-only artifact any more (contra the stale owner checkout, whose
`PROGRESS.md:82` still reads "EXECUTION DISPATCHED"). At `origin/master`, V executed and closed
by fold. The 41 remote-only commits, oldest→newest, include:

```
5a9183a7 feat(runtime/value4): transpose Keyframes onto structural Value 4 and cut the Glass-independent 6.0.0 producer
d60ce66d docs(V): the ratified formation corpus
617cbd9f feat(gates): proof:structure — the one standing structure gate (born RED)
051da212 merge(V·W4): proof:structure, the one standing structure gate
c3831849 merge(V·W1): rehearsal green — patch + witnesses (rehearsal half complete)
5a1eb5e6 merge(V·W10): the correction manifest, pre-rail subset
41554f10 merge(V·W5+W6): the module carves + encapsulation sweep
96bed20a feat(gates): proof:structure R6 — no-unused-exports
add20b7e feat(demo): consume Glass 7 on immutable K6 — the 65-path slice + the W1 extension (V·W2)
ebb08948 merge(V·W2): consume Glass 7 on immutable K6 — the rail lands
c2c8915f docs(V): the adoption record + FOLD-FORWARD ledger — V folds to the successor
008dc0ea docs(V·vnext): the V-next formation handoff + ingestion prompt — the thrice-hardened corpus mirrored
0dac636b docs(V·vnext): provenance HOLD — panel corpus ran Opus via config error; true-Fable r2 re-deploy in flight
197a1f49 docs(V·vnext): the r2 TRUE-FABLE corpus — refined kickoff prompt + context packets; r1 Opus corpus quarantined
81a56990 docs(V·vnext): trim tape to out-of-scope pointer per owner context ruling   ← HEAD
```

**V's 13-wave disposition** (authority: `docs/tranches/V/FOLD-FORWARD.md` §A, read at
`origin/master`):

| Wave | State at fold |
|---|---|
| W1 Render Truth | **CLOSED** (landed with W2; RED+GREEN witnesses archived) |
| W2 Glass-7 Consume | **CLOSED** (`add20b7e`/`ebb08948`; exact glass `7.0.0` devDep, registry-only lock) |
| W3 Native Close & Deploy | **PARTIAL** — full §5.11 native interaction matrix + deploy-of-record table fold |
| W4 Structure Gate & Openers | **CLOSED** (+AM-1 `drag/2d.ts`) |
| W5 Module Carves | **CLOSED** (6 modules) |
| W6 Encapsulation Sweep | **CLOSED** (R6 rule; 32 demotions + 3 dead deletes) |
| W7 Demo Grammar & Chrome | **NOT IMPLEMENTED — folds whole** |
| W8 Kind-Dirs & Channel Module | **NOT IMPLEMENTED — folds whole** |
| W9 Make-Real Quartet & Prune | **AUTHORED + STAGED** on branch `v/w9-staging`; the LANDING folds |
| W10 Doc Canon | **pre-rail subset LANDED**; DM-16/17/18 + residue fold |
| W11 Proportion & Affordance | **NOT IMPLEMENTED — folds whole** (the owner's UI-fix corpus) |
| W12 Coordination | **substantially discharged**; G-1..G-4 glass marks + terminalization fold |
| W13 Close Ceremony | **NOT EXECUTED — folds as the successor formation's OPENING ACT** |

Measured: **5 of 13 CLOSED, 2 PARTIAL, 1 STAGED, 1 substantially-discharged, 4 NOT IMPLEMENTED.**

`FOLD-FORWARD.md` §B carries **15 numbered rows** of unaudited features/exhortations/marks; §C
declares what the successor inherits GREEN at `ebb08948`: "proof:structure R1–R6, 159 modules, 0
depcruise violations … the demo SPAWNS."

**Row §B-12 is a live, unexecuted maintenance act** and it names the §0 hazard from keyframes' own
side: *"The owner-checkout reconciliation — SAFE NOW (W2 landed…). One act (`git fetch && git reset
--hard origin/master` in the owner checkout, untracked V docs unharmed), owner's hand or the
successor's opening; until then the checkout simply lags."*

### 1.4 Owner decisions of record (V)

`docs/tranches/V/OWNER-DECISIONS.md` @ `origin/master` — 5 rows: **OD-V1** ratify (IMPL
AUTHORIZED) · **OD-V2** owner-ordered TOTAL demo audit after glass perfection = the successor's
opening audit band · **OD-V3** DP2-06 transport home HELD for capture review · **OD-V4** 500
raw-line ceiling, one extraction (`EasingField.vue` out of `ChannelOptions.vue`) · **OD-V5** RG-2
at-rest reopen DEFERRED pending glass's dock mark. **OD-V3 and OD-V5 remain unruled** and are
carried in `FOLD-FORWARD.md` §B-5 ("the two held owner rulings … Never proxied").

### 1.5 The successor: a shared value↔keyframes "vnext"

`origin/master` carries `docs/tranches/V/coordination/vnext/` — **28 files** including the
owner-verbatim prompt, 5 owner addenda, 8 r2 skeptic reports (A/B/D/E/F/H1/H2/K), 2 r2 adjudication
panels, and a quarantined `r1-opus-refuted/` subtree (11 files). The two live handoff files are
`keyframes-inbox-2026-07-18-vnext-formation-handoff.md` and `…-vnext-ingestion-prompt.md` — the
**same pair value.js rowed as I-11/I-12** (`value.js/docs/tranches/V/coordination/INBOX.md:46-47`)
and committed at value.js `c654824e`. The V-next mega-tranche is therefore **jointly-sourced**, and
keyframes' V explicitly folds into it.

---

## §2 — CLAUDE.md / PRECEPTS STATE

- **`CLAUDE.md` is ABSENT at the keyframes repo root.** Probe: `ls CLAUDE.md` → `ls: CLAUDE.md: No
  such file or directory`. This is **deliberate and witnessed**: commit `f794def9 docs(U.Z2): scope
  CLAUDE absence witness to tracked product files` records it in `docs/tranches/U/FINAL-U.md`.
  Do not treat its absence as drift.
- **`docs/precepts/` is a GIT SUBMODULE, not a directory in this repo.** Probe:
  `git ls-tree origin/master docs/precepts` → `160000 commit 8ccf9f4da0198e02382e673f253fe96c2ed03034	docs/precepts`.
  It is declared **read-only** in keyframes' standing law
  (`docs/tranches/V/EXECUTION-HANDOFF.md:64`: "`docs/precepts/` read-only").
  Local checkout content: `README.md`, `audits/`, `cross-repo-dev-resolution.md`, `glossary/`,
  `infra/`, `instructions/` (incl. `instructions/STYLE.md`, `TRANCHE-AND-WAVE-SPEC.md`,
  `ORCHESTRATION.md`, `CONSUMING.md`, `LESSONS-LEARNED.md`).
- **Standing law block** (verbatim source: `EXECUTION-HANDOFF.md:57-65`): batches of 3 concurrent
  agents; models declared explicitly (Fable deepest / Opus fanout / Sonnet mechanical);
  implementation ceiling 6 agents/wave, read-only audits 7; sweeps are measurements; refutation
  amends the charter; verify never inherit; **the owner checkout is sacred**; siblings are
  read-only (bounded inbox files only); `--legacy-peer-deps` forbidden; no legacy code; prototypes
  never land.
- **Standing invariants carried into the successor charter** (`FOLD-FORWARD.md` §B-13): frozen
  `.` + `./engine` surface (44-key mirror); `TimingFunction` frozen at `constants/types.ts:45`;
  `scenes/` exemplar fence; `docs/precepts/` read-only; **exact-pin consume-edges, now bilaterally
  ratified**; no-legacy/no-masking; zero-deferral close.

---

## §3 — RELEASE STATE

### 3.1 Last published

- `package.json:3` → `"version": "6.0.0"` (identical at `origin/master` and in the owner checkout).
- Newest tag by creator date: **`v6.0.0`** (`git tag --sort=-creatordate | head -3` →
  `v6.0.0`, `v5.3.5`, `v5.3.4`).
- Published gitHead of 6.0.0 = `5a9183a7afe24702081a7b87c8adc7286ddce9a0`
  (`EXECUTION-HANDOFF.md:19-21`), which is the **oldest** of the 41 remote-only commits — i.e. all
  of V's execution sits **after** the published cut. **No version has been cut since 6.0.0.**
- `CHANGELOG.md` head at `origin/master` is `## 6.0.0` — **there is no `Unreleased` section**
  (probe: `git show origin/master:CHANGELOG.md | head -12`).
- Tarball byte authority for 6.0.0 = **184,430 B** (`FOLD-FORWARD.md` §B-11, row VM-4, flagged as a
  close-audit doc-drift check item).

### 3.2 Pins at `origin/master`

```
$ git show origin/master:package.json | grep -n '"version"\|"@mkbabb/value.js"\|"@mkbabb/glass-ui"'
3:    "version": "6.0.0",
70:        "@mkbabb/value.js": "4.0.0"      # EXACT — dependencies
77:        "@mkbabb/glass-ui": "7.0.0",     # EXACT — devDependency (demo consumer edge)
```

The exact value pin is doctrine, not accident — `docs/published-surface.md` states it as a
machine-checked contract: *"The exact `@mkbabb/value.js@4.0.0` pin … is deliberate: every
constellation consume-edge is a measured, integrity-pinned edge, not a semver range. Value patches
reach consumers through the smallest honest keyframes successor — a re-pinned, re-verified release
— never by range drift under a caret."* Bilaterally ratified: keyframes ruled it independently
(their IN-ATLAS-2 disposition, `INBOUND-LEDGER.md:27`) and value.js endorsed it twice (O-2, then
O-8 §4).

### 3.3 What the value.js 4.1 cut would contain, and what keyframes would consume

The ruling lives in value.js's mega-tranche library-band adjudication and its carry-cut ledger:

- **The ruling row**: `registry/CARRY-CUT-LEDGER.md:255` — `X-W9 | Parser and library apotheosis
  (the 4.1 cut) | CC-084, CC-085, CC-086, CC-087, CC-088, CC-089, CC-081 | … | library-only (no π);
  one dated coherent cut discharges the DR-21 class; … exact-pin consumers notified by packet (RD-11)`.
- **The contents** (`registry/adjudicated/library-band.md:198-207`, §3 "The 4.1 cut — ONE dated
  event, versioned 4.1.0"):
  - **SHIP** — SCI-1 (`sampleColorRamp` / `mixColorsInto` / `toRgba8Into`); `toHex` on `./color`;
    `easingNames()`; **memoised `easing()`** (stable references per name); the **restored analytic
    in/out arms** (RD-5); the barrel corrections (serializers, four AST types, `ColorFactory`,
    **zero bare `declare`s** — 33 today); `verify-packed-surface`'s behavioural half +
    `strictTypes: 62` deletion. Plus (per `CARRY-CUT-LEDGER.md:186`, CC-084) the **parser totality
    cure at `src/css/grammar.ts:181`**, shipped in ONE dated 4.0.1/4.1 cut, **no emergency 4.0.1 —
    ruled**.
  - **DECLINE** — `sampleBezier` (permanently, measured zero demand); `resolveCssColor` (RD-6, with
    a preserved re-trigger; `CARRY-CUT-LEDGER.md:194` CC-092 RETIRE).
  - **FENCE** — `bezierPresets`' 30-key set and the 40-name catalog.
- **The bump is ONE event.** `library-band.md` W.L6 CARRIES clause: *"BANK: the keyframes pin
  (`grep -n '"@mkbabb/value.js"' ../keyframes.js/package.json`) — any post-cut additive symbol
  landing while the pin reads an exact lower version owes a packet."* And the wave's own
  coordination gate: *"`npm ls @mkbabb/value.js` in keyframes and fourier reads 4.1.x post-window."*

**What that costs keyframes, measured in their tree at `origin/master`:**

1. **8 curves change shape at the bump** (value.js §D2 declared divergence, RD-5). `max|Δ|`
   `ease-out-circ` **1.923e-1**; then `ease-in-expo` 6.930e-2, `ease-in-circ` 4.489e-2,
   `ease-in-quad` 4.157e-2, `ease-in-cubic` 3.162e-2, `ease-out-sine` 3.082e-2, `ease-in-sine`
   3.038e-2, `ease-out-quad` 2.520e-2. This lands directly in keyframes' registry — see 3.
2. **`sampleColorRamp` becomes real**; **`deltaEOK` does NOT ship** — both are named in keyframes
   docstrings today (owner checkout `src/animation/compile/emit/backward.ts:47`, live path
   `src/animation/compile/emit/backward/backward.ts`). So the K4 provenance gate is needed **either
   way**.
3. **The fence is load-bearing at MODULE EVALUATION.** Verified at HEAD —
   `git show origin/master:src/animation/compile/easing/registry.ts`:
   ```
   30: const registryNames = [
   31:     ...Object.keys(bezierPresets),
   32:     "ease-in-bounce",
   33:     ...DIRECT_NAMES,
   34: ] as const;
   36: /** Stable identities let the serializer distinguish named curves from closures. */
   37: export const timingFunctionEntries: … = registryNames.map((name) => {
   41:     const result = easing(name);
   42:     if (!result.ok) {
   43:         throw new Error(`value.js rejected its own easing …`);
   ```
   A `bezierPresets` **removal** is a boot `throw` at `:43`; an **addition** silently widens
   keyframes' public registry. Value's D1 fence is exactly right and its RED input is named.
4. **`serializeCssValue` publishes** → keyframes' diverged fork at
   `src/animation/compile/emit/css-text.ts:41` (**verified present at HEAD**, exact line:
   `export const serializeCssValue = (value: CssValue): string => {`) retires onto it. Known
   observable divergence: input `"a : b"` → value emits `"a: b"`, keyframes' fork emits `"a : b"`.
5. **Nothing in 4.1 reaches keyframes until the pin moves.** Under the exact pin the 4.1 cut and
   the keyframes pin bump are **one event** (O-11 §E1).

---

## §4 — COORDINATION MAIL — the keyframes side

Mail path (value's own law, `INBOX.md:13-14`): `../keyframes.js/docs/tranches/V/coordination/`,
grammar `<SENDER>-INBOUND-*`; "the tranche root is NOT a mail path".

### 4.1 keyframes' `INBOUND-LEDGER.md` — 9 rows at `origin/master`

`git show origin/master:docs/tranches/V/coordination/INBOUND-LEDGER.md | grep -oE '^\| IN-[A-Z]+-[0-9]+' | sort -u`
→ `IN-ATLAS-1 · IN-ATLAS-2 · IN-ATLAS-3 · IN-ATLAS-4 · IN-ATLAS-5 · IN-GLASS-1 · IN-GLASS-2 ·
IN-VALUE-1 · IN-VALUE-2`.

Per `FOLD-FORWARD.md` §A/W12, **every one of those 9 is MARKED** ("IN-ATLAS-1..5, IN-GLASS-1..2,
IN-VALUE-1..2 incl. the WL verdicts; GCF-03 confirmed SCI-owned; **D-GAP-6 DECLINED-WITH-PATTERN —
the value boundary is CLEAR**"). The stale owner checkout's copy of this ledger has only 2 source
rows and 6 rows (`INBOUND-LEDGER.md:26-30` locally) — another stale-tree trap.

### 4.2 keyframes' inbox contents (the two trees, side by side)

| File | at `origin/master` | in owner checkout | marked? |
|---|---|---|---|
| `VALUEJS-INBOUND-2026-07-17-formation-exchange.md` (= value O-2) | ✅ | ✅ | ✅ `…-formation-exchange-marks.md` |
| `VALUEJS-INBOUND-2026-07-17-wl-verdicts.md` (= value O-4) | ✅ | ✅ | ✅ (via the same marks file / W12) |
| `VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md` (= value **O-8**) | ❌ **ABSENT** | ✅ untracked | ❌ **NO MARK** |
| `VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md` (= value **O-11**) | ❌ **ABSENT** | ✅ untracked | ❌ **NO MARK** |
| `ATLAS-INBOUND-*` ×2, `GLASS-INBOUND-*` ×2, `SPEEDTEST-INBOUND-*` ×1 | ✅ | ✅ | ✅ |

### 4.3 keyframes → value.js outbound (landed in value's tree)

`ls value.js/docs/tranches/V/coordination/` shows 5 keyframes-authored letters:
`keyframes-inbox-2026-07-17-v-formation.md`, `…-v-execution-open.md`,
`…-glass7-consumed-wl-marked.md`, `keyframes-inbox-2026-07-18-vnext-formation-handoff.md`,
`…-vnext-ingestion-prompt.md`. **No keyframes letter dated later than 2026-07-18 exists** — i.e.
**keyframes has been silent for 16 days** and has not replied to O-8 or O-11.

---

## §5 — COORDINATION MAIL — the value.js side (`docs/tranches/V/coordination/INBOX.md`)

Ledger size: **26 inbound rows** (`grep -c '^| I-'`) and **22 outbound rows** (`grep -c '^| O-'`).

Rows naming keyframes:

| Row | Date | Direction | Substance | Status in ledger |
|---|---|---|---|---|
| **I-5** | 2026-07-17 | owner relay | "keyframes is set to begin"; their IN-ATLAS-2 / IN-ATLAS-3 awaited value input | **ACTED** (O-2 sent early) |
| **I-6** | 2026-07-17 | kf→value | V-formation packet: rail alignment; exact-pin ruled DELIBERATE independently; **D-GAP-6 ship-or-decline requested**; FAM-14 negative result | **FOLDED** (WL §I) |
| **I-7** | 2026-07-17 | kf→value | execution opens (OD-V1); no action owed; consume confirmation promised at the Glass 7 tag | **FOLDED** (WL §I) |
| **I-10** | 2026-07-17 | kf→value | `keyframes-inbox-2026-07-17-glass7-consumed-wl-marked.md` — the consume confirmation ARRIVED (exact glass 7.0.0 on immutable kf 6.0.0, value 4.0.0 exact, registry-only, no force flags, demo 14/14); **D-GAP-6 DECLINE ACCEPTED — they adopt `sampleBezier` only if a future 4.1 ships it**; RF-18 census-split ENACTED (`add20b7e`) | **FOLDED** at W44 close; **both §D keyframes expectations DISCHARGED**; CARRY-LEDGER §D amended; the D-GAP-6 conditional joined the SCI-1 4.1 vehicle note |
| **I-11** | 2026-07-18 | kf→value | the refined vnext kickoff prompt (r2, true-Fable) — the value-owned V-next mega-tranche formation charter | **FOLDED 2026-07-20** |
| **I-12** | 2026-07-18 | kf→value | the vnext context packets P0–P6 (r2 union product); deep corpus stays pull-on-demand at `keyframes-v-exec/docs/tranches/V/coordination/vnext/` | **FOLDED 2026-07-20** |
| **I-24** | 2026-08-02 | self (off-ledger intake) | two of the five off-ledger files are keyframes: `KEYFRAMES-B10-STATIC-HOSTILE-OWNER-INTAKE-2026-08-02.md`, `KEYFRAMES-B18-TERMINAL-STATIC-DEPENDENCY-INTAKE-2026-08-02.md` | **RECONCILED 2026-08-03** |
| **I-25** | 2026-08-03 | Codex R4 orphans | R-3's pre-admission **route ranking puts keyframes FIRST** (then value controls → glass-blocked-on-Row-6 → fourier largest) | **ROWED + RESOLVED**; banked as per-repo sequencing input |
| **O-2** | 2026-07-17 | value→kf | formation exchange + direct answers to IN-ATLAS-2/3 | **SENT EARLY** |
| **O-4** | 2026-07-17 | value→kf | WL covenant DECIDE verdicts; §I **D-GAP-6 DECLINE**; D-GAP-1/5 closure ACKs; FAM-14; RF-18 recommendation | **SENT** |
| **O-8** | 2026-07-24 | value→kf | parser totality exposure (324 throws / 1548 calls, one root `grammar.ts:181`); §4 answers IN-ATLAS-2; **decision asked: `4.0.1` vs coherent tuple** | **SENT** — *no reply on record* |
| **O-11** | 2026-07-27 | value→kf | the M-12 library-band relay by packet (RD-11): §A widened R1 + prototype class; §B `serializeCssValue`; §C **K1–K4**; §D fence + declared analytic-arm restoration; §E 4.1 window + the `lerpArray` ask | **SENT** — *no reply on record* |

Note on the two `KEYFRAMES-B*` intakes (I-24): both are read-only intakes of an **externally
authored Codex "Keyframes Review-B" source lineage** frozen under
`~/Documents/Codex/2026-08-02/…`, and both explicitly grant **zero authority** —
`KEYFRAMES-B10-…:4-6` "Authority and cross-repository slot: none / null; Execution, Review B,
product, package, Browser, Safari, release, and credit: 0"; `KEYFRAMES-B18-…:3`
`DEPENDENCY_ONLY / TERMINAL_AMEND_SOURCE_RED / KEYFRAMES_SLOT_NULL`. **They are not keyframes
coordination mail and confer no obligation on either repo.** Sibling files in the same dir:
`KEYFRAMES-B19/B20/B21-*`, `KEYFRAMES-EIGHT-HOUR-CURRENT-SOURCE-DELTA-2026-08-03.md`,
`KEYFRAMES-V8-ROUTE-MOUNT-CURRENT-SOURCE-AUDIT-2026-08-02.md`,
`CONSTELLATION-SLOT-KEYFRAMES-DAG-V3-TERMINAL-INTEGRATION-AUDIT-2026-08-02.md`.

---

## §6 — EVERY OPEN value↔keyframes OBLIGATION, with row id

Direction key: **V→K** = value owes keyframes / keyframes owes an answer to value; **K→V** = the
reverse. "Open" = not marked terminal on the owing side as of this census.

| # | Row id(s) | Dir | Obligation | Evidence / anchor | State |
|---|---|---|---|---|---|
| 1 | **O-8 §3/§4** | K→V | **Delivery-vehicle decision**: does keyframes want the parser cure as a deliberate `4.0.1` on their own schedule, or folded into the next coherent tuple (value 4.x + kf 6.x + glass 7.x)? Value explicitly will not cut into their graph without the answer | `VALUEJS-INBOUND-2026-07-24-…:101-103` | **OPEN — unanswered 10 days.** Value has since RULED it internally: `CARRY-CUT-LEDGER.md:186` CC-084 "ships in ONE dated 4.0.1/4.1 cut … **no emergency 4.0.1 — ruled**". *The asked-for decision has been pre-empted by our own ruling; the letter must be closed honestly, not left dangling* |
| 2 | **O-11 §E2** | V→K (an ask) | **The single code ask**: add a `lerpArray` **length assertion** on the keyframes side (their FrameCompiler hot loop; mismatched lengths silently yield `[2.5, 3.5, NaN]`) | `…-2026-07-27-…:231-237` | **OPEN — unacknowledged.** The value-side cure (W.L3 `./math` failure protocol) cannot reach them until the pin moves |
| 3 | **O-11 §C K1** (`KF-EASE-REF`, gate `G-L7a`) | V→K | 21/40 easing names have unstable references; the docstring "Stable identities let the serializer distinguish named curves from closures" is load-bearing and false; 9 reference collisions mean `.find()` reverse-maps 31 refs onto 40 names | Live at HEAD: `src/animation/compile/easing/registry.ts:36` (docstring) + `src/animation/compile/emit/easing-serialize.ts:71-73` (the `.find(([_name, func]) => func === easing.fn)`) | **OPEN.** ⚠ packet cites path `compile/easing/easing-registry.ts:36` — **ABSENT at HEAD**, renamed to `compile/easing/registry.ts` |
| 4 | **O-11 §C K2** (`KF-LEAVES-TAUT`, gate `G-L7b`) | V→K | Delete the tautology spec `test/internal/leaves-parity.test.ts` (a re-export cannot drift) and fix two false docstrings in the same commit | **Verified exactly at HEAD**: `src/animation/internal/leaves.ts:28` = `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math";`; `:19` still says "match the value.js **barrel**" — and 4.0.0 publishes **no barrel** (7 subpaths, no `.`) | **OPEN.** Anchors valid |
| 5 | **O-11 §C K3** (`KF-UNUSED-BLIND`, gate `G-L7c`) | V→K | 9 `--noUnusedLocals` errors; delete 8, **DECIDE** `_boundTimeline` (wire the guard or delete field + prose together), then set `"noUnusedLocals": true` | **Verified exactly at HEAD**: `src/animation/load-engine.ts:65` = `import type { Stylesheet } from "@mkbabb/value.js/css";` (the dead `/css` type import on the light/heavy boundary) | **OPEN.** Anchors valid (the 9-error count is value-measured; not re-run here — no npm/tsc in their tree per lane law) |
| 6 | **O-11 §C K4** (`KF-PROVENANCE`, gate `G-L7d`) | V→K | One gate extracting every `@mkbabb/value.js`-attributed identifier from `src/` comments and asserting it is a real export of the subpath it is attributed to. `sampleColorRamp` becomes real at 4.1; **`deltaEOK` is NOT in the SHIP list** | Owner checkout `src/animation/compile/emit/backward.ts:47`; live path at HEAD = `src/animation/compile/emit/backward/backward.ts` | **OPEN.** ⚠ cited path **ABSENT at HEAD** (W5 carve `94f2c3c9`) |
| 7 | **O-11 §B** | V→K | Retire keyframes' diverged `serializeCssValue` fork onto value's published `./css` export at the bump; known divergence `"a : b"` → `"a: b"` vs `"a : b"` (2/3 fixtures RED) | **Verified exactly at HEAD**: `src/animation/compile/emit/css-text.ts:41` | **OPEN — gated on the 4.1 bump** |
| 8 | **O-11 §D1** | V→K (declaration) | The `bezierPresets` 30-key / 40-name **FENCE**. Nothing asked; it is a guarantee | RED input named: delete any `bezierPresets` key → keyframes boot `throw` at `registry.ts:43` | **DECLARED; standing.** Value-side gate `G-L6c` authored GREEN in W.L6 |
| 9 | **O-11 §D2** | V→K (declaration) | **8 curves change shape at their bump** (analytic in/out arms restored, RD-5), `max\|Δ\| = 0.192` on `ease-out-circ`; the `approximated: boolean` discriminant was proposed and DECLINED | `library-band.md:198-207`; drift table in `…-2026-07-27-…:196-204` | **DECLARED; no keyframes acknowledgement on record** |
| 10 | **O-11 §E1 / W.L6 BANK** | V→K (standing) | *"Any post-cut additive symbol landing while your pin reads an exact lower version owes you a packet"* + the value-side coordination gate `npm ls @mkbabb/value.js` in keyframes reads 4.1.x post-window | `library-band.md` W.L6 CARRIES/GATES | **STANDING; unfired** (no cut yet) |
| 11 | **I-10 / D-GAP-6 conditional** | K→V | keyframes ACCEPTED the `sampleBezier` DECLINE **"only if a future 4.1 ships it"** — and the 4.1 ruling **DECLINES `sampleBezier` permanently** on measured zero demand | `INBOX.md:45`; `library-band.md:205` | **CONVERGED — the conditional resolves to "not adopted".** Needs one line in the cut packet so the row dies clean rather than silently |
| 12 | **I-6 / IN-VALUE-1..2, W12** | closed | exact-pin ruling, D-GAP-1/5/6, FAM-14, RF-18 | `FOLD-FORWARD.md` §A W12: "the value boundary is CLEAR" | **TERMINAL both sides** |
| 13 | **IN-ATLAS-2** | 3-way | The exact-pin question atlas raised — answered by value twice (O-8 §4, O-9 §C) and ruled independently by keyframes | `INBOUND-LEDGER.md:27`; `…-2026-07-24-…:85-99` | **CLOSED, converged** |
| 14 | **IN-ATLAS-3 fence** | K→(atlas) | `TimingFunction`'s published home/name/signature **frozen surface**; 3 atlas chase sites named; the fence held through every V restructure | `INBOUND-LEDGER.md:28`; `FOLD-FORWARD.md` §B-6, §B-13 | **STANDING; verified held** |
| 15 | **§0 hazard (no row id yet)** | V→K | O-8 and O-11 sit **untracked in the sacred stale owner checkout**, absent from `origin/master` and from `keyframes-v-exec`, and were **measured against that stale tree** (61-vs-62 import census; 4 dead paths) | §0 above | **NEW — must be rowed.** Either re-deliver to the exec clone / open a PR-able path, or amend with HEAD-resolved anchors |
| 16 | **§B-12 (kf-side)** | K (self) | The owner-checkout reconciliation — one act, `git fetch && git reset --hard origin/master`, untracked V docs unharmed | `FOLD-FORWARD.md` §B-12 | **OPEN on their side.** *Blocked from our side by lane law and by their sacred-checkout rule — value.js must NOT perform it* |
| 17 | **O-11 §A2 undercount** | V→K | Value's own §A2 raised `parseStylesheet` to a **new crash class** (`constructor`/`__proto__` THROW) but §A3 enumerated only 3 reachable sites and **did not name keyframes' `parseStylesheet` call sites** | `git grep -n 'parseStylesheet' origin/master -- src` → `compile/adapter.ts:222`, `scroll/grammar.ts:109`, `validate.ts:182` (3 additional call sites) | **NEW — the exposure letter is INCOMPLETE.** Supplement owed at the cut |

**Site-drift correction table** (what the packets said → what HEAD says):

| Packet anchor | at `origin/master` |
|---|---|
| `src/animation/compile/value-ast.ts:71` | `src/animation/compile/value/compile.ts:32` |
| `src/animation/resolve/browser.ts:165` | `src/animation/resolve/browser.ts:162` |
| `src/animation/engine/options.ts:31` | `src/animation/engine/options.ts:31` ✅ unchanged |
| `src/animation/compile/easing/easing-registry.ts:36` | `src/animation/compile/easing/registry.ts:36` |
| `src/animation/compile/emit/easing-serialize.ts:70-71` | `…/easing-serialize.ts:71-73` |
| `src/animation/compile/emit/backward.ts:47` | `src/animation/compile/emit/backward/backward.ts` |
| `src/animation/compile/emit/backward-color.ts:171/:250/:263` | `src/animation/compile/emit/backward/color.ts` |
| `src/animation/internal/leaves.ts:28` | ✅ exact |
| `test/internal/leaves-parity.test.ts` | ✅ present |
| `src/animation/compile/emit/css-text.ts:41` | ✅ exact |
| `src/animation/load-engine.ts:65` | ✅ exact |
| `package.json:69` (`"@mkbabb/value.js": "4.0.0"`) | `package.json:70` |

---

## §7 — WHAT THIS LANE RECOMMENDS TO THE FORMATION

1. **Row the §0 mis-delivery** in `INBOX.md` as a new self-row (an E13 defect of our own making,
   symmetrical to I-24's off-ledger reconciliation). O-8/O-11 are not "SENT" in any operational
   sense — they are parked on a lagging checkout.
2. **Amend, do not re-send.** A single addendum with (a) HEAD-resolved anchors per the drift table,
   (b) the 3 missing `parseStylesheet` sites (obligation 17), (c) the closed delivery-vehicle
   question (obligation 1 — we ruled it; say so), (d) the D-GAP-6/`sampleBezier` resolution
   (obligation 11). Deliver into `keyframes-v-exec/docs/tranches/V/coordination/` **and** ask the
   owner to reconcile the sacred checkout (§B-12), which is theirs to do, not ours.
3. **Treat keyframes' V as CLOSED-BY-FOLD, not in flight.** 4 of 13 waves fold whole (W7, W8, W11,
   W13), W9 is staged on `v/w9-staging`, and OD-V3/OD-V5 are unruled owner rows. Any keyframes-side
   ask from us lands in **their successor formation**, which is the shared vnext (I-11/I-12) — i.e.
   K1–K4 have no owning wave on their side today.
4. **The 4.1 cut is the single coordination event.** Cut + keyframes repin + the 8-curve visual
   delta + `serializeCssValue` fork retirement + `sampleColorRamp` becoming real are one bump. The
   W.L6 `npm ls` gate cannot go green without keyframes acting, so the cut's completion criterion is
   **partly owned by a repo we cannot edit** (RD-11: no D-15 analogue). Size it accordingly.
5. **`CLAUDE.md` absence and `docs/precepts/` being a submodule are both deliberate** — do not book
   either as a finding against keyframes.

---

### Probe appendix (commands run, all read-only)

```
git log --oneline -30 | git branch --show-current | git status --porcelain
git rev-parse origin/master master ; git rev-list --left-right --count origin/master...master
git log --oneline origin/master ^master
git ls-tree -r --name-only origin/master -- docs/tranches/V docs/tranches/W
git ls-tree origin/master docs/precepts
git show origin/master:<path>            (FOLD-FORWARD, OWNER-DECISIONS, INBOUND-LEDGER,
                                          published-surface.md, CHANGELOG.md, package.json,
                                          leaves.ts, load-engine.ts, easing-serialize.ts,
                                          css-text.ts, compile/easing/registry.ts)
git grep -n / -h -o -E '…' origin/master -- src
git cat-file -e origin/master:<path>     (presence probes)
git tag --sort=-creatordate
find docs -type f ; comm -23/-13 on the two file lists
grep -rhoE 'from "@mkbabb/value\.js[^"]*"' src | sort | uniq -c     (owner checkout)
sed -n '<n>p' <owner-checkout path>      (drifted-anchor confirmations)
```

**ABSENT results explicitly recorded**: `docs/tranches/W` (probe: `git ls-tree -r --name-only
origin/master -- docs/tranches/W` → no output) · root `CLAUDE.md` (probe: `ls CLAUDE.md` → No such
file) · `CHANGELOG` "Unreleased" section (probe: `git show origin/master:CHANGELOG.md | head -12` →
first heading is `## 6.0.0`) · O-8/O-11 in `keyframes-v-exec` (probe: `ls
keyframes-v-exec/docs/tranches/V/coordination/` → 9 entries, neither present) · keyframes outbound
letters dated after 2026-07-18 (probe: `ls value.js/docs/tranches/V/coordination/` → newest
`keyframes-inbox-2026-07-18-*`).
