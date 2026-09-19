SERVED MODEL: claude-opus-5[1m]

# F.W7 — execution record (Track C · X·F) — trie-like variant compression: the R-4 greenfield (OWNER-GATED ⊙)

Spec: `docs/tranches/X/fourier/waves/F-W7.md` (IMMUTABLE, E-3) · order `docs/tranches/X/EXECUTION-RUNBOOK.md`
§1.3 · seat law §5 · locks §3.4 · owner rulings `docs/tranches/X/COHESION.md` §0i · §0j · §0k · §0o.
Ledger row: `docs/tranches/X/execution/LEDGER.md` Track C.

---

## Open

**Opened 2026-09-17 (sitting of record — the owner's begin-word, COHESION §0j; wall clock 2026-09-19)
by seat 0 (OPEN).** Base: value.js `tranche-u`, HEAD at open **`0779d34a`** (⟨cmd⟩ `git rev-parse
--short=8 HEAD`). `../fourier-analysis` is **READ-ONLY** for this wave — F.W7 writes **zero fourier
bytes** (spec §0, §2a); every fourier-side witness below is a read (`grep`/`sed`/`ls`/`git -C`), which
runbook §5.5 permits and D-19 MEASURE-AT-OPEN requires.

**Prior seat state (COHESION §0o, *"The runner-dead waves (F.W7 · KF.W6 · KF.W7)"*).** F.W7 died six
times at earlier open attempts; the addendum records *"Nothing was written by any of the eighteen
attempts."* **CRASH-RECOVERY sweep, this seat**: ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js
status --porcelain` → four dirty paths — `docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` · `e2e/smoke/a11y-gradient-stop-grammar.spec.ts` ·
`scripts/dev/dev.sh` — **not one of them is inside this wave's §2a writable set**; they are sibling
seats' (Tracks A/D) and the standing unowned row, and this seat touched none. ⟨cmd⟩ `git -C
../fourier-analysis status --porcelain | wc -l` → **0**. **Nothing is inherited; F.W7 opens on a clean
writable set.**

### Preconditions — verified at the bytes AND in the ledger

Spec §1 `Opens after`: **F.W0** (substrate pre-gates — hard, §6 G-F7-7) · **F.W5** (§2 clause **E16** ⊕
§3 **G7** as one identity; §2 **E1**, §2 **E3** ⊕ §3 **G4**, §2 **E10** hard) · **the owner's ruling on
G-F7-1**. Runbook §1.3's edge row restates it: *"F-W7 §State `:83` names F.W0 (hard, G-F7-7) · F.W5 §2
clauses E16 · E1 · E3⊕G4 · E10 · the owner's G-F7-1 ruling."*

| # | condition | measured (⟨cmd⟩ → output) | verdict |
|---|---|---|---|
| 1 | **F.W0** — substrate pre-gates, HARD | LEDGER Track C row: **CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))**, fourier commits `3079a92`…`87ecc85` + value `47608b5c`…; record present, ⟨cmd⟩ `ls docs/tranches/X/execution/C/F-W0.md` → present (201477 bytes) | **MET** |
| 2 | F.W0's **published re-grounding** — the two tables F.W7 quotes and never re-performs | ⟨cmd⟩ (base `../fourier-analysis/docs/tranches/F`) `grep -nE '^#{2,4} .*2\.[0-9]' SUBSTRATE-LEDGER.md` → `333:### 2.1 G-11 — THE CORRECTED ANCHOR TABLE` · `421:### 2.2 G-12 — THE CORRECTED-DENOMINATOR TABLE` — **both landed**, exactly where COHESION §0k.2 declares them | **MET** |
| 3 | the **halt condition is not in force** (G-F7-7: *"If F.W0 fails, the wave HALTS"*) | COHESION §0k.2, the F.W0 end of the edge, verbatim: *"**G-11 and G-12 both closed GREEN on 2026-09-17** (ledger §2.9), so **the halt condition is NOT in force and F.W7's substrate predecessor is satisfied.**"* | **MET — no halt** |
| 4 | **F.W5** — the clause predecessors | LEDGER Track C row: **CLOSED 2026-09-17** (CHECK 2 CONFORMANT, 22/22 gates reproduce GREEN). At the bytes, base `$V/docs/tranches/X/fourier`: ⟨cmd⟩ `grep -o 'The honest default[^*]*' waves/F-W5.md` → *"The honest default v2 MUST carry absent a ruling: no trie; whole-snapshot duplication is the recorded shipped behaviour."* (**E16**) · ⟨cmd⟩ `grep -o '\*\*G7\*\* ⊙ . trie disposition (R-4)' waves/F-W5.md` → `**G7** ⊙ | trie disposition (R-4)` · ⟨cmd⟩ `grep -o 'Distinct from B4.s liveness predicate' waves/F-W5.md` → *"Distinct from B4's liveness predicate"* (**E10**) | **MET** |
| 5 | the **`§E` clause register** exists and carries the eight ids G-F7-8 differences | ⟨cmd⟩ `grep -o '^### §E — Provenance, lineage and persistence (the union.s core)' waves/F-W5.md` → *"### §E — Provenance, lineage and persistence (the union's core)"*; the token-bounded detector ⟨cmd⟩ `grep -ohE '(^\|[^A-Za-z0-9])(E1\|E3\|E5\|E7\|E8\|E10\|E13\|E17)([^0-9A-Za-z]\|$)' waves/F-W5.md \| sed -E 's/[^A-Za-z0-9]//g' \| sort -u` → `E1 E10 E13 E17 E3 E5 E7 E8` — **all eight present**; register membership by the same detector → `E1…E20` | **MET** |
| 6 | the **F.W5 spine reciprocal** | ⟨cmd⟩ `grep -o '\*\*F.W7 CITES; F.W5 STATES.\*\*' waves/F-W5.md` → *"**F.W7 CITES; F.W5 STATES.**"* | **MET — declared both ends** |
| 7 | **the owner's ruling on G-F7-1** | **RULED** at COHESION **§0j.D**, ruling id **F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1)** — see the ruling block below | **MET** |
| 8 | *(census freeze, runbook §5.4/§5.6)* the frozen canonical is the sole census operand | ⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \| cut -c1-12` → **`f44362757458`**, double-run — character-match to the spec's §0(C) pin | **MET — frozen** |
| 9 | the frozen 66 | ⟨cmd⟩ `ls docs/tranches/V/megatranche/registry/adjudicated/fr-*.md \| wc -l` → **66**, double-run | **MET** |

### The owner-gated item — RULED at COHESION §0j.D; this seat cites and re-opens nothing

| spec item | ruling id | the ruling, as written |
|---|---|---|
| **G-F7-1 ⊙** (the trie-vs-KISS question; spec §4's inline block) | **F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1)** | *"**NO TRIE**; whole-snapshot duplication is the recorded shipped behaviour (the honest default; `atomdiff.py:12-14` is the guardrail; zero material on either tree). F.W7 unit `b` never opens, `design/R4-variant-storage.md` is never created, G-F7-5 closes vacuously; unit `a`'s census runs."* |
| **G-F7-3** (both-object-kinds provability — *"F.W5 G4 rules RESTORE, or F.W7 re-scopes to one object kind EXPLICITLY in its own text"*) | **F-SS4REST R1 (TA-4)** | *"**RE-SCOPE value.js out of the diff clause** (a one-sided §6 verdict, stated explicitly) — `atomdiff.ts` is wholly excised from value.js and restoring it is value-side authoring that would couple value.js's release train to the fourier contract."* |
| the substrate frame (G-F7-7's inherited half) | **OG-F1** | **FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE**; *"G-11 narrows to drift-correction; GAB-13 discharges to a disclosure line."* |

**The branch is therefore AGAINST, by ruling, before this wave writes a byte.** Spec §1a's XOR resolves
to leg (b): *"the owner ruled AGAINST and F.W7 lands as a **terminal kill with rationale** naming the
incumbent it deferred to."* **No design byte is authored anywhere in this wave**, `design/R4-variant-storage.md`
is **never created**, and §4's inline block is a **record of the ruling**, never a second ruling file
(P-10; spec §8's *"A second owner-rulings file"* exclusion row). The ruling is **cited by id** at
`contract/OWNER-RULINGS-F.W5.md` row **R2** — ⟨cmd⟩ (base `$V/docs/tranches/X/fourier/contract`)
`grep -n 'F-TRIE' OWNER-RULINGS-F.W5.md` → `:38`, the R2 row — and this wave **extends that file by not
one byte**.

**Consequence for the unit plan, stated here rather than decided silently.** §0j.D's words *"F.W7 unit
`b` never opens"* are **binding and are obeyed**: **unit `b` is NOT dispatched by this seat.** The
spec's §9 assigned the AGAINST-branch **terminal-kill-with-rationale in situ** to that unit, and
**G-F7-9 still owes exactly one of {full spec, terminal kill with rationale}** (COHESION §3 item 2:
*"no silent drops, no re-booking"*). That artefact is therefore landed by **unit `c`**, which §2b already
admits as an `F-W7.md` writer (*"Units **b** and **c** both write `F-W7.md`"*), as a **dated E-3
addendum-beside at the file end** quoting §0j.D — never as a rewrite of a dated spec byte, never as a
design byte, never as a second ruling file. **The ruling is not re-opened; its consequence is discharged
by the one lawful writer it leaves standing.**

### E13 Step-0 — the four-path mail sweep (runbook §5.3)

Swept read-only at this seat's own clock; classification taken from each row's **Status cell by
position** (escaped pipes restored), never from a bare `grep -i unread`; `INBOX.md` **self-excluded**
(SELF-COUNT law).

1. `docs/tranches/V/` + `docs/tranches/V/coordination/` — ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -type f -name '*.md' -newermt "2026-09-19 00:34"` → **1 member, `INBOX.md` (self)**. The five 2026-09-18 22:0x letters are **ours, outbound, and rowed**: `keyframes-inbox-…cut-notice` = **O-34** · `atlas-inbox-…export-delta-refresh` = **O-35** · `glassui-inbox-…r1-relay` = **O-36** · `fourier-inbox-…facility19-delta` = **O-37** · `parse-that-inbox-…evidence-addendum-2` = **O-38**.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest**, ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`; **9** `.md`, newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest inbound-grammar file `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21**, ours, delivered; `INBOUND-LEDGER.md` is their ledger, not a letter.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours; path UNMOVED since 2026-08-03.

⊕ **the Track-C surface** (COHESION §0k.1): `../fourier-analysis/docs/tranches/F/coordination/INBOX.md`
exists (23278 bytes, 2026-09-17) beside the three 2026-05-29 letters — **G-3 GREEN**, nothing new.

**Result — ZERO unrowed letters addressed to value.js; ZERO new `I-n`/`O-n` minted** (register tail
stays **I-35 / O-38**). **Status-cell census, double-run**: ⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk
-F'|' '/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print
c+0}'` → **0** (run 1 ≡ run 2); rows by the same pattern → **78** (the 74-row figure of the 2026-09-19
terminalization plus the four letter-suffixed rows I-21a · I-24a · … which that seat's `[IO]-[0-9]+`
pattern excludes — **two patterns, one population, no contradiction**). **No UNREAD mail in F.W7's
scope. The INBOX was not written by this seat** (§2a admits an append **iff** a relay is sent; F.W7
expects **zero**, spec §7c).

---

## Baseline — the spec's own §6 gates, run READ-ONLY at open (BEFORE state)

All eleven are declared **born-RED** by §1. Run at this seat's clock, 2026-09-19, base
`$V/docs/tranches/X/fourier` unless stated; `F=/Users/mkbabb/Programming/fourier-analysis` ·
`V=/Users/mkbabb/Programming/value.js`.

| gate | probe run (⟨cmd⟩) | output at open | BEFORE verdict |
|---|---|---|---|
| **G-F7-1** ⊙ | `sed -n '1,15p' $F/api/lib/crud/atomdiff.py` | the guardrail reproduces at lines 12–14: *"KISS guardrails (J.W1-crud-remix §0/§9): the atoms are a flat BAG (not a tree / Merkle / document); the diff is a whole-atom replace (the diff-viewer field-diffs a changed sub-object client-side, F-06); there is no three-way / DAG / merge."*; the twin citation at lines 1 and 7 reproduces (*"authored once (fourier), adopted twice (value.js twin)"* · *"``lib/crud/atomdiff.ts``"*) | **RULED (§0j.D F-TRIE) — see greenBeforeCure** |
| **G-F7-2** | `ls $V/docs/tranches/X/fourier/design` | `ls: …/design: No such file or directory`; ⟨cmd⟩ `find . -type d \| grep 'contract\|design'` → **`./contract`** only | **RED** — no census artefact exists |
| **G-F7-3** | `grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` · `ls $V/api/src/lib` | **1 comment hit** — `api/src/modules/palette/__tests__/palettes-forks.test.ts:9` *"atom-diff were excised at T.W1 — TA-4 — so the remix/atomDiff wire cases are"*; `ls: …/api/src/lib: No such file or directory` | **RED** — the re-scope is ruled (F-SS4REST R1) but unstated in F.W7's text |
| **G-F7-4** | `grep -n 'paletteSlug\|colors\|name' $V/api/src/modules/palette/hash.ts` · `grep -n 'findByHash' -A4 …/repository/paletteVersion.ts` | `:70 export function computeContentHash(name: string, colors: PaletteColor[])` — folds `{name, colors}`, `paletteSlug` appears only at `:93/:100` as the RELEASE-event membership fact; `:20 findByHash(hash…)` → `:21 return this.col.findOne({ _id: hash }…)` — no slug scope | **RED** — the identity stands under E1's repair; no key designed |
| **G-F7-5** | (base `…/registry/adjudicated`) `grep -n -F 'superset of the request fields' fr-ContourSettings.md` | `:43` — *"an operation's cache identity must be a superset of the request fields the operation consumes"*, inside the **B-4 = C-1 (∘ C-25/R6-8 fold) — BLOCKER** row | **RED by absence** — no key spec; ruled to close **VACUOUSLY** on AGAINST (REST-39) |
| **G-F7-6** | `sed -n '45p' fr-SpeedSelect.md` · `grep -o 'Distinct from B4.s liveness predicate' waves/F-W5.md` | SS-C-2 reproduces — *"Atom 4 is semantically empty: `fps`/`max_circles`/`duration` have zero cross-wire readers, and the `duration` that `speed` divides is declared 4× with 3 values and a 1000× unit fork"*; E10's separation reproduces | **RED** — no sizing exists (and none is owed on AGAINST) |
| **G-F7-7** | `git -C $F status --porcelain \| wc -l` · `git -C $F rev-parse --short=8 HEAD` · `git -C $F cat-file -t 14d83356` | **0** (was **28** at the fold) · **`21e11b0d`** (was `cd26c653`) · `fatal: Not a valid object name 14d83356` (unchanged), all double-run | **GREEN before this wave — F.W0 re-grounded; see greenBeforeCure** |
| **G-F7-8** | `ls waves/F-W7` · the token-bounded detector over `waves/F-W5.md` | `ls: waves/F-W7: No such file or directory`; detector → `E1 E10 E13 E17 E3 E5 E7 E8` (all eight live at F-W5) | **RED** — no `carry-closure.md`; the set-difference is unwritten |
| **G-F7-9** | `grep -A1 'Every census wave-sketch id' ../COHESION.md` | *"2. Every census wave-sketch id (KF.W0–W10, F.W0–W10) maps to a full spec **or** a terminal kill / with rationale — no silent drops, no re-booking."*; `CENSUS-2026-08-03.md` §4 sketch 8 exists; F.W7 today has **neither** | **RED** — the terminal kill is unwritten |
| **G-F7-10** ⟨added⟩ | `grep -rniE "merkle\|flat bag\|not a tree" $V/api/src $V/src` | **NO OUTPUT** — see the MEASURE-AT-OPEN divergence below | **RED** — the corrected premise is unstated in any F.W7 byte |
| **G-F7-11** ⟨added⟩ | `ls waves/` · the five far-end probes | far ends reproduce: F-W0 §6b → *"**F.W7** (the owner-gated trie design)"* · F-W6 §4 → *"F.W6 carries the documented default — **no trie; whole-snapshot duplication is the recorded shipped behaviour.**"* · F-W8 §5c → *"F.W8 designs no trie. If G7 **admits** it, the derive leg must exercise structural sharing; if G7 **sustains the incumbent KISS gu"* (the budget's cut, disclosed) · F-W3 §4 → *"Declared-not-carried edge: **F.W7's anti-tree KISS guardrail stays inline in F.W7.**"* · F-W5 §4 → *"**F.W7 CITES; F.W5 STATES.**"* | **RED for F.W7's own end** — §7c is declared in the spec, but the wave's close cell is unwritten; the three owed reciprocals (F.W10's edge row · SS-4 · the value.js API row) stand |

### The census ∅ posture, re-derived at open (spec §5a `F-MAIL-∅`)

⟨cmd⟩ (base `…/registry/adjudicated`) `grep -lE '(^|[^A-Za-z])F\.W7([^0-9A-Za-z-]|$)' fr-*.md` → **no
output**, double-run over **66** records. The **census of record** says so in its own words — ⟨cmd⟩
`grep -o 'The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration' conformance/CENSUS-CANONICAL.md` →
*"The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration"*; ⟨cmd⟩ `grep -o '^### F\.W7'
conformance/CENSUS-CANONICAL.md` → **no output** (an absence published as an absence). **F.W7 books
zero registry rows. The ∅ is a finding, not a gap** (COHESION §0k.2).

### MEASURE-AT-OPEN divergences (D-19) — four, banked rather than smoothed

1. **G-F7-10's born-RED witness NO LONGER REPRODUCES.** The spec banks *"one hit, asserting the opposite
   word: `$V/api/src/modules/palette/hash.ts:6` '(Merkle property)'"*. At today's bytes ⟨cmd⟩
   `grep -rniE "merkle" $V/api/src $V/src $V/demo` returns **nothing**: `hash.ts` was rewritten at
   **X-W3** (⟨cmd⟩ `git log --oneline -3 -- api/src/modules/palette/hash.ts` → `9b3e6923 fix(api/palette-versions):
   join revision identity to the addressing palette…` · `919cc698 refactor(T.W1 · api): E-1 package-by-feature
   transposition`), and its head is now domain-separated hashing with no Merkle claim. **The gate's
   substance is UNWEAKENED and in fact sharpened**: the guardrail's bilaterality premise is false at the
   value tree not by contradiction but by **silence** — the value tree now carries *zero* statements on
   the subject, and `atomdiff.py`'s named adopter (`lib/crud/atomdiff.ts`) remains excised. **Unit `a`
   states the premise in this corrected, measured form and does not re-publish the dead anchor.**
2. **Fourier's dirty set and HEAD moved** (28 → **0**; `cd26c653` → **`21e11b0d`**) — exactly what F.W0's
   re-grounding was for. **Every fourier anchor this wave cites is F.W0's published one** (SUBSTRATE-LEDGER
   §2.1/§2.2, quoted never re-performed); the pin `14d83356` is still unresolvable, unchanged.
3. **`waves/` now holds TWELVE entries, not eleven** — ⟨cmd⟩ `ls waves/` → the eleven `F-W*.md` **plus a
   `F-W6` DIRECTORY** minted by F.W6's execution. G-F7-11's receipt *"`ls waves/` → …and nothing else"*
   is therefore **stale as a receipt and unmoved as a claim** (the eleven spec files are all there).
   Unit `c` states the membership, never the count word.
4. **`contract/` EXISTS** (`J-diff-shape-v2.md` · `OWNER-RULINGS-F.W5.md` · `operation-register.md`),
   created by F.W5 per its §1a, so §2a's *"Prospective, NOT yet in tree"* row is **superseded at the
   bytes**. `design/` still does not exist. **The prospective law binds unchanged**: F.W7 cites the
   ruling file **when it exists** — it does now — and **extends it by not one byte** (P-10, §8).

---

## Unit plan

Spec §1 `Agents`: **3 serial**. **§0j.D struck unit `b`**; the wave dispatches **two units, serial**
(`a` → `c`), one writer at a time on clean `tranche-u` (§2b — *"a dirty tree at handoff halts the
wave"*). No worktree plan. No two units share a modify path.

| unit | model | spec sections executed | writable set (§2a) | gates it must turn | locks / families |
|---|---|---|---|---|---|
| **X.F.W7.a** — the enumeration census | **opus** (mechanical/challenge seat: enumeration, greps, gate runs — runbook §5.1) | §9 `X.F.W7.a` (L313–318) · §3 item 1 (L140) · §6 rows **G-F7-2** and **G-F7-10** (L238, L246) · §5b S-8/N-2 (L197–202) · §5a N-1 (L187–196) | `docs/tranches/X/fourier/design/R4-enumeration-census.md` (**create**, with `mkdir -p`) · `docs/tranches/X/execution/C/F-W7.md` (**append** its receipt) | **G-F7-2** · **G-F7-10** | §7b: **D-19** (no anchor cited as live pre-F.W0 — quote SUBSTRATE-LEDGER §2.1/§2.2, never re-resolve) · **SS-C-2** (do not size over dead fields) · **FR-GIG-5** (no credit for an unauthored cure). One commit, spec §10 row 1 |
| **X.F.W7.c** — carry closure + the terminal disposition (fresh **Fable** adjudicator) | **fable** (spec §9 names the seat: *"fresh Fable adjudicator"*) | §9 `X.F.W7.c` (L327–332) · §3 items 2/4/5/6 (L141–146) · §4 (L157–178) · §6 rows **G-F7-1 · G-F7-3 · G-F7-4 · G-F7-5 · G-F7-6 · G-F7-8 · G-F7-9 · G-F7-11** · §7c (L261–282) · §2a rows 1/4/5 (L111, L114, L115) | `docs/tranches/X/fourier/waves/F-W7/carry-closure.md` (**create**, `mkdir -p`) · `docs/tranches/X/fourier/waves/F-W7.md` (**append-only** dated E-3 addendum at the file end) · `docs/tranches/X/execution/C/F-W7.md` · `docs/tranches/V/coordination/INBOX.md` (**append-only**, iff a relay is sent — expects **zero**) | **G-F7-8** (∅ both directions) · **G-F7-11** (this end) · **G-F7-1** (AGAINST close) · **G-F7-9** (exactly one branch) · **G-F7-3** · **G-F7-4** · **G-F7-5** (vacuous) · **G-F7-6** | §7b: **K-3** (the upsert arm is dead — never revived) · **C-2** (*"MOVE A POINT FIRST"*) · **E1** · **C-25 ≡ E13 / `fr-ContourSettings B-4`** · **M-12** · **m-15** (never merged with F-4) · **BC-20** · **FR-GIG-5** · **D-19**. Two commits, spec §10 rows 2 (the ruling record + branch) and 3 (the set-difference); **never split a set-difference from its artefact** |

**Order**: group 1 = `a` alone → group 2 = `c` alone. Serial by §2b and §7a (`a` → ⊙ the ruling → …→ `c`),
each committing before the next opens. Concurrency **1** throughout, well inside the four-workflow cap.

**Unit `b` — NOT DISPATCHED.** COHESION **§0j.D F-TRIE**: *"F.W7 unit `b` never opens,
`design/R4-variant-storage.md` is never created."* Restated verbatim at **§0k.2**. The ruling is obeyed;
its AGAINST-branch residue (the terminal kill with rationale, G-F7-9) rides **unit `c`** under §2b's
`F-W7.md` writer set, as a dated addendum-beside. **No design byte is authored in this wave by any seat.**

### Briefs

- **X.F.W7.a** — Create `design/` and author `R4-enumeration-census.md`: enumerate the persistence
  surface in **four classes on both trees** (version writers · asset writers · cache keys · hash folds),
  each row `tree · site · keyed-on · scope · share-hit consequence`, read-only measurement only. Retire
  R-4's six-term grep as founding evidence (N-2: the term query is noisy **and** blind). State
  **G-F7-10's corrected bilaterality premise at today's bytes**: `atomdiff.py` lines 12–14 are one
  docstring in one tree naming an excised value-side adopter, and the value tree's former opposite-word
  hit (`hash.ts:6` *"Merkle property"*) is **gone at X-W3** — measured, with the command, never inherited.
  Quote F.W0's SUBSTRATE-LEDGER §2.1/§2.2 for every fourier anchor (D-19); re-perform no re-resolution.
  Zero fourier bytes, zero product bytes. Commit `docs(X·F.W7): the R-4 persistence-surface enumeration census`.
- **X.F.W7.c** — (i) Author `waves/F-W7/carry-closure.md`: the id set-difference against **F-W5 §2's
  `§E` clause register** in **both directions** over **E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17**, run
  with G-F7-8's **four-axis, token-bounded, delimiter-free** detector (shapes · spellings · positions ·
  register-qualification) — prove F.W7 **books zero** and **cites all**; name each id's landing clause;
  ∅ in both directions or triumvirate. (ii) Append to `F-W7.md` a **dated E-3 addendum-beside** (never a
  rewrite): the §4 ruling record as **F-TRIE (§0j.D) quoted by id**, the **terminal kill with rationale**
  naming the incumbent (`atomdiff.py:12-14`) and the cost accepted (whole-snapshot duplication stays the
  shipped behaviour; sketch-8's requirement retired), the **G-F7-3 re-scope stated explicitly** per
  F-SS4REST R1, **G-F7-5 closed VACUOUSLY** (no key spec, no consumed-field set, no superset owed —
  REST-39), and the §7c reciprocal asks re-declared (F.W10's edge row · SS-4 · the value.js API row).
  **No second ruling file; `contract/OWNER-RULINGS-F.W5.md` gains zero bytes.** Two commits, spec §10
  rows 2 and 3.

---

## Seat-0 disclosure (dated 2026-09-19, E-3 — recorded, not smoothed)

**The OPEN commit `a167f945` carries a sibling seat's LEDGER bytes, and this seat says so rather than
letting a later reader find it.** The commit was made with an exact pathspec
(`… C/F-W7.md LEDGER.md INBOX.md`), but `LEDGER.md` is **one file four tracks write**: between this
seat's read of row 69 and its `git add`, a **Track B** seat wrote the `KF.W10` row
(`IMPLEMENTED 2026-09-17` → `CLOSED 2026-09-17 (honest-RED: G-7)`) and appended its own event line in
the working tree. A pathspec cannot separate two seats' hunks **inside one file**, so both landed under
this commit's message. **Nothing was altered, lost or reverted**: the KF.W10 bytes are that seat's own,
verbatim, and are now durable. **No unstage, no reset, no stash was performed** — the standing law
forbids touching a sibling seat's paths, and a committed sibling row is strictly safer than an
unstaged one. **The finding, stated once for the programme**: the pathspec rule kills cross-*path*
contamination and is powerless against cross-*hunk* contamination in a shared ledger; the durable cure
is what the ledger law already prescribes — **minimal in-place row edits plus appends, never a
rewrite** — which is why this commit's bytes are correct on both tracks despite the mixed meaning.

---

## Unit receipts

*(each dispatched unit appends its own receipt here, line 1 of any file it creates being its
`SERVED MODEL:` declaration)*

### X.F.W7.a

**SERVED MODEL: claude-opus-5[1m]** · dated **2026-09-19** · sections executed: spec §9 `X.F.W7.a` ·
§3 item 1 · §6 rows **G-F7-2** and **G-F7-10** · §5a N-1 · §5b S-8/N-2 · §2a row 2 + the Do-NOT-touch
block · §10 commit row 1.

**CRASH-RECOVERY sweep, first act.** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status
--porcelain` → two dirty paths, `docs/tranches/V/reformation/CARRY-LEDGER.md` and
`scripts/dev/dev.sh` — **neither is inside this unit's writable set** (a sibling seat's row and the
standing unowned row); **this seat touched neither and inherited nothing**. ⟨cmd⟩ `git -C
../fourier-analysis status --porcelain | grep -c .` → **0**. **No predecessor partial work existed for
this unit; `design/` did not exist.**

**Acts, in order.**

1. **Read the spec whole** (`waves/F-W7.md`, 360 lines) and the wave record, then **D-19 first, before
   any measurement was cited**: F.W0's `SUBSTRATE-LEDGER.md` §2.1 (G-11) and §2.2 (G-12) read and
   **quoted by exact-string probe, never re-performed**. The load-bearing discharge is an identity, not
   an argument — ⟨cmd⟩ `git -C $F diff --name-only 8bc7736 HEAD -- api/ | /usr/bin/grep -c .` → **0**
   (double-run `0` · `0`): **the whole fourier `api/` surface this census cites is byte-identical
   between F.W0's published substrate `8bc7736` and today's `21e11b0d`**, over a tree with ⟨cmd⟩
   `git -C $F status --porcelain | grep -c .` → **0**. G-11 itself records that this surface is outside
   its bounds — ⟨cmd⟩ `/usr/bin/grep -o 'RECORD (api/py coordinates are outside F.W0.s bounds)'
   SUBSTRATE-LEDGER.md` → *"RECORD (api/py coordinates are outside F.W0's bounds)"* — and OG-F1 supplies
   the frame that makes the worktree citable: ⟨cmd⟩ `/usr/bin/grep -o 'Under \*\*FREEZE-WITH-ADOPTION
   AND WORKTREE-AS-BASELINE\*\*, G-11 is \*\*drift-correction only\*\*' SUBSTRATE-LEDGER.md` → that
   sentence. **No re-resolution was performed by this seat.**
2. **`mkdir -p design/`** (§2a row 2's `create` row; the directory did not exist — the wave record's
   baseline probe `ls …/design` → *No such file or directory* reproduced at open).
3. **Enumerated the persistence surface by PRIMITIVE, not by word** — every Mongo write primitive in
   both trees (⟨cmd⟩ value `grep -rnoE '\.(insertOne|…|createIndex)\(' api/src` → **104** raw
   occurrence-lines; fourier `grep -rnoE '\.(insert_one|…|delete_many)\(' api` → **145**), plus both
   collection registries and every index declaration, then **read each site**. Result: **30 enumerated
   site rows — value 12, fourier 18** — across the four classes §9 names, each row
   `tree · site · keyed-on · scope · share-hit consequence`.
4. **Authored `design/R4-enumeration-census.md`** (482 lines). §2b's value **asset class is ∅ and the ∅
   is enumerated three independent ways** (the 9-collection typed registry · a byte-primitive probe
   returning **no output, exit 1** · **43** distinct route-path literals, none binary), per S-8's
   *"an absence-proof must enumerate the surface, not query one name for it"* (`fr-AdminAuditLog.md:126`,
   `grep -n -F`, one hit) co-signed at K-13.
5. **Registry-first discharged before any consequence was graded** (G-12 §2.2.0): ⟨cmd⟩ (base
   `…/registry/adjudicated`) `grep -rln "content_hash" .` → `fr-AdminFlaggedPanel.md` ·
   `fr-GalleryDraftsSection.md` · `fr-GalleryFeaturedCarousel.md` · `fr-GalleryInfiniteGrid.md` ·
   `fr-GalleryView.md`. **Every measured share-hit consequence already has a banked home and is CITED,
   never re-booked** — K-3 ⊕ C-2 (≡ E17) · B-4 (≡ E13) · m-15 (≡ §C2) · B-2 ⊕ FR-GV-1 (≡ E5) ·
   FR-AFP-7 · FR-AFP-66. **F.W7 books ZERO.**
6. **Committed** `5ef18133`, pathspec-scoped to the one file.

**Gate readings.**

| gate | BEFORE (open) | AFTER (this unit) | evidence |
|---|---|---|---|
| **G-F7-2** | **RED** — `ls …/fourier/design` → *No such file or directory*; no census artefact | **GREEN for F.W7** (owner: unit `a` itself) | the artefact exists (⟨cmd⟩ `ls design/` → `R4-enumeration-census.md`, double-run) and enumerates **four classes on both trees** — ⟨cmd⟩ `grep -oE '^### §2[a-d] — Class [1-4]: [A-Z ]+'` → `VERSION WRITERS` · `ASSET WRITERS` · `CACHE KEYS` · `HASH FOLDS`; rows ⟨cmd⟩ `grep -cE '^\| \*\*V\*\* \|'` → **13** (12 sites ⊕ the ∅ row) and `grep -cE '^\| \*\*F\*\* \|'` → **18**. **The six-term grep is retired at §3 on BOTH grounds, each re-measured and double-run** |
| **G-F7-10** | **RED** — the corrected premise was unstated in any F.W7 byte, **and the spec's born-RED witness no longer reproduced** (open-divergence 1) | **GREEN for F.W7** (owner: unit `a`; the ⊙ ruling itself is §0j.D's and is not re-opened) | §4 states it at TODAY's bytes: the guardrail reproduces verbatim at `atomdiff.py:12-14`, its named adopter is gone (⟨cmd⟩ `find api/src src -iname '*atomdiff*'` → **no output**; the sole `atomdiff` grep hit is the TA-4 **excision record** at `palettes-forks.test.ts:9`), and the value tree is **silent** — ⟨cmd⟩ `grep -rniE "merkle\|flat bag\|not a tree" api/src src demo test e2e` → **no output, exit 1** (double-run), the `Merkle property` hit having gone at X-W3 `9b3e6923` (`git log` receipt in situ). **False by SILENCE, not contradiction** |

**N-2 re-measured, and it reproduces exactly** (all double-run, pinned BSD `grep`): the six-term probe
over the frozen 66 → **147** raw grep-lines; word-bounded (`[[:<:]]trie[[:>:]]` — `\b` is not portable
on the pin) → **1** survivor, `fr-ContourEditorCanvas.md:56` L-5, excluded-with-reason. **And the
BLINDNESS half, which no prior pass had measured**: over the two product trees the same probe returns
**25** (value) + **161** (fourier source-only; **20** of the raw 181 are `Binary file … matches` lines
from `__pycache__`, disclosed) = **186 source lines and ZERO true hits** — ⟨cmd⟩ the word-bounded probe
over `$V/api/src $V/src $F/api $F/web/src` → **no output, exit 1**. Dominant signal in every
composition: the English word `entries`.

**Findings this unit adds to the substrate (measurements, not bookings).** The enumeration surfaces a
content-addressed seam the founding lane evidence does not name — fourier's
`api/services/compute_cache.py:55`, a sha256(`contour_hash` ‖ canonical params ‖ `COMPUTE_VERSION`)
cache whose hit **skips the FFT/basis chain entirely** — making **seven** shipped content-addressed
seams across the two trees, against **zero** version writers that share structure parent→child (all 6
persist the full bag). **R-4's conclusion for version-atom sharing survives, now by enumeration; its
scope does not.**

**Locks discharged.** **D-19** — F.W0's tables quoted, the re-resolution never re-performed, the anchor
identity measured (act 1). **SS-C-2** — field arities published (`ContourSettings` 12 / `AnimationSettings`
6, each from a roster probe); **no saving, ratio or byte figure computed anywhere**, because E10's
disposition is unstated and a saving over retirable fields is unfalsifiable. **FR-GIG-5 / F-W5 §0b** —
X-W3's release/payload split and fourier's shipped compound `_id` are recorded **with their authors
named and booked at ZERO**. **S-8 / K-13** — four falsifiable class definitions ⊕ 30 enumerated rows ⊕
the triple enumeration of the value ∅.

**Two of this seat's own receipts did not reproduce and were fixed from the live output before the
file landed — disclosed, not smoothed** (the disposition rule admits no third option): **(i)** the §2f
self-count was drafted as `29` under the claim that the ∅ row carries no tree label; the probe returns
**31** and the ∅ row carries `| **V** |` like every other — corrected in situ with a four-probe table
that makes `31 − 1 = 30` a subtraction rather than an assertion. **(ii)** the §2b.1 byte-primitive
probe was first run with `s3` in its alternation and its **four** hits read as evidence; all four were
the substring `S3` inside the prose token `CS3.2` — **the census's own instrument committing the exact
substring-artefact class §3 convicts**. The term is dropped; the published probe returns **no output,
exit 1**. The §3.2 composition receipts were likewise re-cut so the published command produces the
published bytes (the case-fold `tr` restored; the fourier composition re-run source-only, `140 entries`
· `12 flaggedentries` · `11 retries` · … — the earlier `158` was a *combined-tree* figure presented as
a fourier one).

**Cadence (§10).** ⟨cmd⟩ `git diff --check` → clean, exit 0 · markdown path check over every
`docs/`/`api/`/`src/` path cited in the census → **zero unresolved** · ⟨cmd⟩ `git status --porcelain --
api/ src/ demo/ test/ e2e/ | grep -c .` → **0**, double-run: **no source byte moved**, so the
typecheck/test/lint tripwire has nothing to trip. Table integrity: all **31** tree-labelled rows carry
exactly 6 unescaped pipes (5 cells).

**E13 mail.** Re-swept at this unit's own clock: ⟨cmd⟩ `find docs/tranches/V/coordination -type f -name
'*.md' -newermt "2026-09-19 01:00"` → **1 member, `INBOX.md` (self, excluded by the SELF-COUNT law)`**;
status-cell census ⟨cmd⟩ (the seat-0 `awk` form) → **UNREAD = 0**. **No relay is owed by this unit and
none was sent; the INBOX gained zero bytes** (§2a row 5: append **iff** a relay is sent; F.W7 expects
zero, §7c).

**Commits.** `5ef18133` — `docs(X·F.W7): the R-4 persistence-surface enumeration census` (spec §10 row
1), pathspec `docs/tranches/X/fourier/design/R4-enumeration-census.md`, **one file, 482 insertions, no
sibling hunk**. ⟨cmd⟩ `git show --stat --oneline HEAD` confirms the single path.

**Residuals, carried not cured.** **(1)** The two stale consumers of the uncorrected bilaterality
premise stand untouched — `F-W8.md` §5c's `F.W7` sibling row (*"carried on BOTH sides"*) and
`F-W6.md` §4's `F.W7` cross-edge row (*"quoted both trees"*): **read-only to this wave**, declared and
requested at spec §7c, named again at census §4.4. **(2)** §4's ruling question is **restated against
this census by unit `c`**, whose §4 addendum consumes the three corrected premises the census supplies;
this unit supplies evidence and writes no `F-W7.md` byte. **(3)** The spec's own born-RED witness for
G-F7-10 (`hash.ts:6` *"Merkle property"*) is dead at the bytes; it is **recorded as a dated correction
at census §4.3, never patched into the immutable spec** (E-3).

**Escalations: none.** Zero fourier bytes, zero product bytes, zero design bytes, zero sibling-spec
bytes, zero writes outside the §2a/unit writable set.

### X.F.W7.c

**SERVED MODEL: claude-fable-5-1** (the fresh adjudicator seat spec §9 names) · dated **2026-09-19** ·
sections executed: spec §9 `X.F.W7.c` · §3 items 2/4/5/6 · §4 · §6 rows **G-F7-1 · 3 · 4 · 5 · 6 · 8 · 9 ·
11** · §7b · §7c · §2a rows 1/4/5 · §10 rows 2–3. Rulings consumed: COHESION §0j.D **F-TRIE** ⊕
**F-SS4REST R1**; §0k.2 (the F.W0 end of the edge). Every later addendum read to the file end (§0l–§0t):
none touches this unit but §0o's runner-dead note.

**CRASH-RECOVERY sweep, first act.** ⟨cmd⟩ `git status --porcelain` (value.js) → `CARRY-LEDGER.md` ·
`scripts/dev/dev.sh` — **neither in this unit's writable set**; ⟨cmd⟩ the same in `../fourier-analysis` →
empty. `waves/F-W7/` did not exist and `waves/F-W7.md` was unmodified since 2026-08-30 (⟨cmd⟩ `ls -la
waves/`). **Nothing inherited.** *(Mid-unit a sibling seat dirtied `demo/color-session/keys.ts` ·
`demo/picker/ColorPicker.vue` · `demo/shell/usePaneRouter.ts` — Track A's, untouched by this seat.)*

**Acts, in order.**

1. **Read** the spec whole (360 lines, five pages), this record, COHESION §0j → file end, the landed
   `contract/` (§E1 · §E10 · §E16 · §H VO-0/1/2, `OWNER-RULINGS-F.W5.md` rows R1/R2) and unit `a`'s census
   §3.3 / §4.4 / §5.
2. **Measured before writing.** The spec's G-F7-8 detector over `waves/F-W5.md` → `E1 E10 E13 E17 E3 E5 E7
   E8` (run 1 ≡ run 2); register heading reproduces; register membership `E1…E20`; **all eight clause
   heads reproduce INSIDE the `§E` heading range** (axis iv), each with its banked-id cell. Pins:
   `F-W5.md` `26aebcdc7bac` · canonical `f44362757458` · `F-W7.md` `b5247b852f46` (pre-addendum).
3. **Adjudicated the F.W7 side, and found what a bare token run hides.** **(a) Homonym class 1** — `E13`
   is also the owner's mail law; two sites in the spec (§2a's INBOX row, §8's INBOX exclusion) are that
   law, not the clause. **(b) Homonym class 2** — `CENSUS-CANONICAL` errata ids (`E5-14`, `E6-3`, …) match
   the spec's detector (a hyphen is a lawful right-bound), so it reports a clause `E6` this spec never
   cites. **(c) An instrument limit no pass had filed — SHARED-DELIMITER BLINDNESS**: the pattern consumes
   one bounding byte per side and `grep -o` does not overlap, so ⟨cmd⟩ `printf 'E7/E8/E10\n'` through the
   detector → `E7 E10` (**`E8` unseen**), and over `F-W7.md` the detector **misses `E20`** (sole occurrence
   *"E1…E20"*). Harmless to set-membership here (every rostered id also occurs self-delimited, both
   files); cross-checked with a tokeniser (`sed` errata-neutralise → `tr -cs` → `grep -x`), which returns
   the disposed set with `E20` recovered and the errata `E6` gone. **Recorded as a dated finding in the
   artefact (§4), routed to the next seat that re-cuts G-F7-8's operand; the dated spec byte is NOT
   patched (E-3).**
4. **Authored `waves/F-W7/carry-closure.md`** (`mkdir -p waves/F-W7/`; line 1 = SERVED MODEL). Direction 1
   (F.W7 → F.W5): ROSTER ∖ REGISTER = ∅ · ROSTER ∖ CITED = ∅ — each id with its landing clause head, its
   banked-id cell, F.W7's citing row(s), booking **0**. Direction 2 (F.W5 → F.W7): the only `§E` clause
   naming this wave is **E16** (same identity, cited) → ∅; F.W7's non-roster mentions `E16` · `E9` · `E11` ·
   `E12` · `E20` each disposed (identity · three anti-rename denials · a range endpoint) → ∅; booking census
   **B = ∅** (canonical: no `### F.W7`, *"The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration"*; the
   frozen 66: token probe → no output; `contract/`: named only inside §E16 and rulings rows R2/R-4, no
   cure assigned). Every pipe-bearing command is in a fenced block — **runnable as written, no
   table-escaped pipe in the file.**
5. **Appended `waves/F-W7.md` §13** — a dated E-3 addendum-beside at the file end: **§13.1** the §4 ruling
   record, **F-TRIE cited BY ID** and quoted whole once from COHESION §0j.D (⟨cmd⟩ `grep -A3 '^\*\*F-TRIE'`),
   no second ruling file, `OWNER-RULINGS-F.W5.md` extended by zero bytes · **§13.2** the **TERMINAL KILL
   WITH RATIONALE** — incumbent named (`atomdiff.py:12-14`, live bytes quoted; D-19 discharged by the
   anchor identity ⟨cmd⟩ `git -C $F diff --name-only 8bc7736 HEAD -- api/` → no paths, double-run), four
   grounds (each a citation), **the accepted cost stated** (whole-snapshot duplication stays shipped on
   both trees; storage linear in versions × bag; sketch-8's requirement RETIRED, re-openable only by the
   owner via G7) · **§13.3** **G-F7-3's re-scope stated explicitly** — F.W7 re-scoped to ONE object kind
   (fourier's five-atom bag); value.js OUT, verdict spelling `N/A — RE-SCOPED (F-SS4REST R1)` · **§13.4**
   **G-F7-5 closed VACUOUSLY** (REST-39) · **§13.5** the value-side limbs emitted **by citation** to the
   contract's existing rows (TA-4 → **VO-0**, a non-obligation; E1's compound `_id` → **VO-1 ⊕ VO-2**) —
   no duplicate row minted · **§13.6** the three reciprocals **re-asked** (F.W10's §4b edge row — measured
   still absent; SS-4; the value.js API row) and the two bilaterality riders kept REQUESTED · **§13.7**
   the eleven close cells under the split verdict. **ZERO design bytes.**
6. **Receipts fixed from live output before landing — disclosed** (the disposition rule admits no third
   option): (i) the artefact first said the contract names this wave *"at exactly three lines"* while
   listing four homes — the probe returns 3 (`J-diff-shape-v2.md`, all inside §E16) + 2
   (`OWNER-RULINGS-F.W5.md`, rows R2 / R-4) + 0; re-stated as classification. (ii) the contract-heading
   probe's `{0,60}` budget cut E5's heading mid-word with only E3's cut disclosed — widened to `{0,90}`,
   all eight headings printed whole but E3's (cut by the negated class, disclosed). (iii) the addendum's
   §E16 sentence was first certified by a probe narrower than its quote, across a source newline — split
   into **two spans, two commands**. (iv) a standing-of-the-ruling phrase typed from §0o rather than read
   from §0j — struck before landing, replaced by §0j's own heading under its ⟨cmd⟩. (v) direction 2's
   first probe used a literal-pipe **row anchor** — the shape-dependence axis (i) forbids; re-cut to read
   each hit line's leading token whatever its shape (same answer, `E16`).
7. **WRITE-THEN-MEASURE.** After §13 settled: `F-W7.md` → `06d89cf13e52` (double-run); ⟨cmd⟩ `git diff
   --numstat` → **233 insertions, 0 deletions** (append-only, proven); both instruments re-run over the
   settled file — detector → all eight; tokeniser → the same disposed set, **no new id introduced**; the
   addendum's own ids all citations or members of the ruling id. **Second closure pass: ∅ · ∅.**

**Commits** (spec §10 rows 2 and 3; pathspec on the commit itself; one file each; the set-difference not
split from its artefact).

- `9b79676a` — `docs(X·F.W7): the trie-vs-KISS ruling record + branch` — `waves/F-W7.md`, 233 insertions.
- `fdce6e54` — `docs(X·F.W7): carry closure — set-difference against F.W5` — `waves/F-W7/carry-closure.md`,
  250 insertions.

**Gate readings.**

| gate | BEFORE (open) | AFTER (this unit) | evidence |
|---|---|---|---|
| **G-F7-8** | **RED** — no `carry-closure.md` | **GREEN** (owner: unit `c`) | `waves/F-W7/carry-closure.md` §7: ∅ · ∅ one way, ∅ · ∅ · ∅ the other, at two closure passes; books ZERO, cites ALL EIGHT, each at a named landing clause; triumvirate trigger not met |
| **G-F7-11** | **RED for F.W7's end** | **CLOSED for F.W7** — GREEN **not claimed** (owners: F.W10 · SS-4 · the value.js API row) | §13.6: five wave-spec far ends re-probed, all reproduce; ⊕ COHESION §0k.2; three reciprocals re-asked; F-W10 §4b measured still without an `F.W7` row (⟨cmd⟩ → no output, exit 1) |
| **G-F7-1** ⊙ | RULED, unrecorded in F.W7's text | **CLOSED** (owner ruled — §0j.D F-TRIE) | §13.1 record by id + §13.2 kill; zero design bytes at any point in the wave |
| **G-F7-9** | **RED** — neither spec nor kill | **GREEN** (owner: F.W7) | exactly one branch: the kill (§13.2); ⟨cmd⟩ `ls design/` → `R4-enumeration-census.md` alone — `R4-variant-storage.md` never created |
| **G-F7-3** | **RED** — re-scope ruled but unstated in F.W7's text | **CLOSED for F.W7** (GREEN owner: owner → value.js API row; the owner's half is ruled, the row's is VO-0) | §13.3, explicit, in this wave's own text |
| **G-F7-4** | **RED** | **CLOSED for F.W7** (GREEN owner: value.js API row, VO-1 ⊕ VO-2) | no key designed; clause E1 stated at the contract (`### E1 — Compound per-entity version identity`) |
| **G-F7-5** | **RED by absence** | **CLOSED VACUOUSLY** (REST-39) | §13.4 — no key, no consumed-field set, no superset owed |
| **G-F7-6** | **RED** | **CLOSED for F.W7** (GREEN owner: F.W5 → F.W7) | no sizing computed on AGAINST; the contract states ONE disposition (probe reproduces) |

*(G-F7-2 · G-F7-10 GREEN at unit `a`; G-F7-7 GREEN before the wave — unchanged.)*

**Locks (§7b), as kept.** **K-3** — the upsert arm appears in this unit's bytes only as the statement that
it is dead; it grounds nothing · **C-2** — recipe cited by name (*"MOVE A POINT FIRST"*), not re-performed ·
**E1** — no key over an identity under repair (no key at all) · **`fr-ContourSettings B-4`** (= `C-1`, ∘
`C-25`/`R6-8`; home F-W5 §2 clause E13) — led on the banked head, the alias never promoted · **M-12** —
clause only, nothing booked · **SS-C-2** — rides inside E8; **no saving, ratio or byte figure computed** ·
**m-15** — cross-referenced with F-4, **merged nowhere** · **BC-20** — stays banked, not re-booked ·
**FR-GIG-5** — X-W3's split is a measurement with its author named, booked at ZERO · **D-19** — F.W0's
substrate quoted, its identity measured, nothing re-resolved.

**Cadence (§10).** ⟨cmd⟩ `git diff --check` on `F-W7.md` → clean, exit 0; trailing-whitespace probe on the
new artefact → no output; table integrity — every table row of both new surfaces carries its table's pipe
count (artefact: 4 / 6; addendum: 4 / 5); every `docs/…` path cited resolves. **Tripwire**: both commits
are single-path docs commits (⟨cmd⟩ `git show --stat --format= 9b79676a fdce6e54`) — this unit moved no
source byte, so typecheck/test/lint have nothing of this wave's to trip; the dirty `demo/` rows at this
clock are a sibling track's.

**The mail/inbox law.** Re-swept at this unit's clock (2026-09-19 01:41 EDT): path 1 ⟨cmd⟩ `find
docs/tranches/V -maxdepth 2 -type f -name '*.md' -newermt "2026-09-19 01:00"` → `INBOX.md` (self,
excluded) · glass `BK/` newest = `glass-outbound-2026-09-18-valuejs-o26-reply.md` (**I-35**, rowed; the
`kfw6-bh-relay` letter = **O-26**, rowed) · keyframes newest letter = the 09-17 addendum (**O-21**);
`INBOUND-LEDGER.md` is their ledger · atlas unmoved (**O-12**) · fourier `F/coordination/` unmoved since
09-17. Status-cell census ⟨cmd⟩ (seat 0's `awk` form) → **`unread=0 rows=78`**, run 1 ≡ run 2. **No relay
owed, none sent; `INBOX.md` gained zero bytes from this unit** (spec §7c / §8: F.W7 expects zero).

**Residuals, carried not cured.** **(1)** Three reciprocals owed at far ends this wave may not write:
**F.W10's §4b `F.W7` edge row** · **SS-4** · **the value.js API row** (§13.6). **(2)** The two stale
bilaterality consumers — `F-W8.md` §5c (*"carried on BOTH sides"*), `F-W6.md` §4 (*"quoted both trees"*) —
requested, read-only here. **(3)** The detector's shared-delimiter blindness — a finding against G-F7-8's
*form*, not its answer; filed in the artefact §4 for the next operand re-cut. **(4)** Three spec receipts
no longer reproduce at today's bytes and are corrected **beside**, never patched: G-F7-10's `hash.ts:6`
witness (dead at X-W3), G-F7-11's *"`ls waves/` … and nothing else"* (two execution directories now sit
there), §2a's *"Prospective, NOT yet in tree"* `contract/` row (F.W5 created it). **(5)** The LEDGER row
for F.W7 is outside this unit's writable set and is the close seat's to stamp.

**Escalations: none.** Zero fourier bytes, zero product bytes, zero design bytes, zero sibling-spec bytes,
zero `contract/` bytes, zero INBOX bytes, zero writes outside the unit's writable set.
