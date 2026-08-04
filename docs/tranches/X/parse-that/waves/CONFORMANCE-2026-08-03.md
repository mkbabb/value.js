# X·P wave conformance — L-20 adjudication ledger

Each pass appends; no pass rewrites a prior one. The subjects are the five canonical wave files
(`W0.md` · `W1.md` · `W2.md` · `W3.md` · `W4.md`); the two author arms (`W2-fable-author.md`,
`W2-opus-author.md`) are sealed dated evidence, read for the agglomeration audit and never
adjudicated as waves.

---

# FIRST PASS — 2026-08-04

`claude-fable-5` — fresh conformance adjudicator (L-20), first pass, declared and served Fable.

**Inputs read whole**: `docs/precepts/instructions/tranche/WAVE_SPEC.md` · `docs/tranches/X/COHESION.md`
· all seven files under `docs/tranches/X/parse-that/waves/` (five canonical + the two sealed arms) ·
the X·V loop's ruling record (`docs/tranches/X/CONFORMANCE-2026-08-03.md`) for R-A / R-B / R-E as
ratified there and adopted by these files. All verification read-only; docs-only write (this file).
Note: the prompt's `docs/tranches/X/WAVE_SPEC.md` path does not exist; the binding spec is
`docs/precepts/instructions/tranche/WAVE_SPEC.md`, which every wave file itself cites — read whole.

**Verdict roster**: **1 CONFORMANT** (W2) · **4 DEFECTIVE** (W0, W1, W3, W4) · **10 numbered
defects**, each minor-to-moderate with an exact fix. No wave is missing a WAVE_SPEC section, no
born-RED baseline is invented, no bench bar is set anywhere, the fresh root was never created, and
no file is transcription-only. **NOT tranche-ready** (COHESION §3.5: the sub-tranche stamps
SPECIFIED only at a clean declared-Fable final pass).

## (a) Mechanical receipts (re-derived this pass, read-only)

- Fresh root: `ls -d /Users/mkbabb/Programming/parse-that-css-totality-p2` → *No such file or
  directory*, 2026-08-04 — **the never-created-today invariant holds** across all five authorings
  and both arms.
- Pause handoff: `shasum -a 256` → `ced23440…f20f7` — **MATCH** against the identity every file pins.
- The 52: the §3e derivation re-run → `total 52 types 33 runtime 19`; W1 G-1's grep pair re-run →
  `51` + `:45 export { coerceToSyntax }`. Both exact.
- Probes present and executable-in-place: `r1-published-totality.mjs` (3,476 B) ·
  `parsethat-surface-gaps.mjs` (4,116 B) · `harvest-journals.mjs` (5,445 B) ·
  `scripts/ci/verify-packed-surface.mjs` (5,234 B). `cand-o/` and `cand-f/` trees present.
- W1 OP-2 liveness: `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/` **still readable**
  today (bench/, equivalence/, gate-recovered.mjs, …) — the rescue remains possible and remains urgent.
- Cited HEADs all real: `2636c238` (W0/W1 baselines), `c654824e` (W3/W4), `03e4bfef` (W2
  agglomeration; the wall-boundary bank commit).
- Substrate claims: `git -C parse-that worktree list` → **8 entries** (7 roots + 1 prunable) exactly
  as W0 G-3 states; `git grep -c wasm32 HEAD -- rust/parse_that/` → exit 1 (zero committed);
  working-tree `wasm32` files → **3** — W2 OP-6 re-verified.
- Cross-edge floors: fourier `package.json` ×2 → 0 `parse-that` hits (W4 G-7 floor GREEN);
  `grep -c 'X·P\|X.P.W\|RC-P' INBOX.md` → **0** (W4 G-8 born-RED holds); keyframes pin
  `"@mkbabb/value.js": "4.0.0"` at `package.json:69` (W4 G-8 baseline exact).
- Reciprocal quotes: `X/waves/W9.md:296` carries *"adopt a parser; it records why value.js ships
  none of parse-that today"* and G31's falsifier *"or adopt a parser inside this wave"* verbatim
  (`:373`) — W3 §10 / W4 OP-4/G-9 quote them exactly. `W11.md:94` carries the
  `verify-packed-surface.mjs` execute-no-write row W4 mirrors.
- `COHESION.md:18` still holds the X·P row (W0 §4a / W1 §4a cites hold); **`COHESION.md:45` does
  not** — the X·P release-condition bullet now lives at `:66-68` (see W0-D2/W1-D2).

## (b) Per-wave verdicts

### W0 — Pause-State Verification and the Fresh Root · **DEFECTS (3)**

All WAVE_SPEC sections present; status `planned`; the three-state MATCH/MISMATCH/EPERM discipline
(G-2: "EPERM is not absence") is the strongest single idea in the lane; the shared-repository
finding (eight worktrees, one object store) converts the never-touch law from prose to mechanism;
the `--no-hardlinks` + detached-checkout rationale is load-bearing and correct; the agglomeration
law is satisfied (handoff §3/§7/§8/§9 + M-22 + PLAW-BIND folded; the census, the clone-vs-worktree
derivation, and the executable re-census are novel).

1. **W0-D1 — §3.2's enumeration sums to 17 against a gate that demands eighteen.** "the eight
   `parse-that` worktrees, the three `.codex` worktrees, the two value.js sibling worktrees, the
   **two** TCC-walled Codex evidence roots, the `.p-totality` archive, and the ephemeral
   parser-proof job tree" = 8+3+2+2+1+1 = **17**; G-3's census table holds **18** rows because
   `~/Documents/Codex` contributes **three** EPERM paths (2026-08-02 ×2 + 2026-07-29 ×1), which
   G-2 itself calls "the three `~/Documents/Codex` rows." **Fix**: §3.2 "two TCC-walled Codex
   evidence roots" → "three TCC-walled Codex evidence paths" (8+3+2+3+1+1 = 18).
2. **W0-D2 — G-8's GREEN condition pins the reciprocal edge at `COHESION.md:45`, and the line has
   moved.** COHESION is a declared live document; the X·P bullet now sits at `:66-68` (`:45` is
   the SS-13 row). The pin recurs at `:444`, `:450`, and commit-plan `:496`. A gate whose GREEN
   condition cites a rotting coordinate will be "discharged" against the wrong bytes. **Fix**:
   replace the three line-pins with a section anchor — "COHESION.md §2, the X·P
   release-condition bullet" — and let the quoted sentence (already pasted in G-8) be the
   identity. (Same edit in W1, see W1-D2. The `:18` pins may stand: §0's table head is stable and
   the row content is quoted beside the pin.)
3. **W0-D3 — §10's "those are later X·P waves" is a dangling pointer.** The Not-opened-here list
   (bijection · S01 split · closed unions · three fresh static reviews · Sol→Luna→fresh-Sol→owner,
   handoff §8 steps 3–8) promises later waves. Against the landed corpus: the bijection is
   discharged at **W2 G-2**, the closed unions at **W3 G-4**, the separate owner release at
   **W4 OP-1** — but the S01 split, the three static reviews, and the Sol-sequence are owned by
   **no wave**, and the lane as specified ends at W4. They are v12-revival-contingent (NC-0's
   pre-kill says reviving the generator "requires resume-protocol steps 3–7 plus a separate owner
   release"), but no file records that terminal disposition — the same shape as the X·V repin-census
   orphan. **Fix**: one mapping sentence in W0 §10 (or a row in W4's close spec): steps 3/5/8 →
   their discharging gates; steps 4/6/7 → DORMANT-UNLESS-NC-0-REVIVED, an explicit disposition
   rather than an implied schedule.

### W1 — Harness, Corpus, and the Honest Bench · **DEFECTS (2)**

The preservation-first ordering (G-3, phase 1, parallel) is exactly right for the lane's largest
liveness risk (re-verified live today); the two-plane bar ledger with the F-1-reproducing
consistency checks is the tranche's best arithmetic honesty (all six figures re-derived this pass:
163,668 / 545,560 / 818,340; −148,215 / 233,677 / 506,457; 1.906×; 25.0% / 18.8% — every one
exact); the latch-drift note (55.6 vs 93.9 ns → ratios not nanoseconds) turns a discrepancy into a
method. 9×172 = 1,548 cross-foots with the R1 probe. Agglomeration law satisfied.

1. **W1-D1 — R-E descriptive invocation: four gates run wave-authored instruments with no literal
   entry command.** G-1 ("the gate compares the derived count to the manifest's"), G-2 ("re-running
   the ported oracle"), G-4 and G-5 (the bench harness's entry/exit assertions) name no command,
   only the instrument's description; the bounds globs (`harness/{totality,equivalence,bench}/**`)
   satisfy R-E's table half, but the sharpened rule — gates state commands with literal paths;
   descriptive invocation is a defect — is the half that caught X·V's W8 G-7 and W6 c3, and it
   fails here the same way. W2 already binds W1's bench entry by name (`npx tsx
   harness/bench/bench.ts`, "argv per W1's landed `harness/README.md`"), so the cross-file
   coordinate exists and W1 does not state it. **Fix**: name the entries in the four gate cells and
   in §5.a/.b/.d Files — G-1 `node harness/totality/derive.mjs --check`, G-2 `npx tsx
   harness/equivalence/harness.ts`, G-4/G-5 `npx tsx harness/bench/bench.ts` (the name W2 already
   depends on).
2. **W1-D2 — the `COHESION.md:45-47` line-pin (§10, `:583`) has rotted** — same class and same fix
   as W0-D2: cite §2's X·P bullet by anchor, not by line.

### W2 — The Dual-Target Algebra (canonical agglomeration) · **CONFORMANT**

The strongest file in the lane, and the agglomeration record is accurate against the sealed arms —
every kill claim spot-verified: the Fable arm does self-author the harness and does carry
"`CARGO_TARGET_DIR` N/A" and does omit the band seed; the Opus arm does carry the self
modify-carve row (`W2-opus-author.md:468`) and the ten fresh oracle probes and the re-derived
arithmetic table; the six equality products are indeed identical across the blind arms (banked as
blind convergence, correctly). The sibling-reciprocity find (W3 §4a / W4 §10 expecting a
`typescript/src/css/**` inheritance neither arm produced → the graduation unit `.i` + G-12) is
exactly the class of miss L-20 exists to force, found at agglomeration instead. R-E is exemplary:
all ten `harness/w2/*.mjs` instruments rowed with their invoking gates named, every §6 command a
literal path, W1's instruments consumed execute-only with the entry cited. OP-6/OP-7 (uncommitted
Wasm substrate; the +117-commit clone point with three unadjudicated runtime commits) re-verified
this pass. The bar is owner-gated at every site; the one numeric screen (AC-3's 20%) is explicitly
scoped as an admission threshold, not a bar. Born-RED ×12 with the root-absence ground re-verified
at agglomeration and again by this pass.

*Observations, no fix required*: (i) §4b's worktree table names `ac1/ac2/ac3` homes while Stage-0
may admit AC-4 — the `ac4-siblings` bounds row plus §9's "branches … `w2/ac4` as admitted" and the
W2-CLOSE assignment record cover the variation; the worktree label would merely be stale cosmetically.
(ii) §10's alias table quoting W3's `src/css/**` shorthand is the right cure for a sibling file it
could not edit.

### W3 — Totality and Recovery to Spec · **DEFECTS (2)**

Ten gates, literal commands throughout, the closed-union discipline transposed from predicates to
diagnostic codes (G-4's ⊇ direction — dead contract code as defect — is a genuinely sharp reading),
G-5's MEASURE-AT-OPEN argued rather than asserted (zero project `.wasm` artifacts, measured), G-6
folding the band's born-REDs as named per-row assertions, and the `.b`/`.c` file split declared at
authoring precisely because `src/css/**` is a shared glob. Stale sibling labels in §2/§2b are
pre-disarmed by W3's own conditions-not-labels clause and bound by W2 §10's alias table (R-B
applied; observation only).

1. **W3-D1 — §4b opens three sibling roots beside the fresh root, against the lane's ratified
   reading of the fresh-root law.** `parse-that-css-totality-p2-w3a/-w3b/-w3c` are worktrees of the
   fresh root placed **beside** it in `~/Programming`; canonical W2 §4b states the law it folded as
   binding: *"worktrees **inside** the fresh root, never beside it (ONE named root, no siblings
   ever created)"* — and W0's census/never-touch architecture nowhere contemplates three new
   `parse-that-*` directories appearing beside the frozen roots mid-lane (a later auditor's grep
   for unlawful roots cannot distinguish them by name). The two waves currently state contradictory
   worktree law; the graph cannot hold both. **Fix**: relocate to `<p2>/.worktrees/w3a|w3b|w3c`
   (W2's idiom), `CARGO_TARGET_DIR=<p2>/target/w3{a,b,c}` — one table edit; every other clause
   survives unchanged.
2. **W3-D2 — the lane law W2's agglomeration named is absent here: no L-13 harvest, no COHESION
   carve.** W0/W1/W2 each row `registry/harvest/x-p-w<n>.json` (create), `DEFECT-LEDGER.md`
   (modify-append by script), `harvest-journals.mjs` (execute, no write), and a `COHESION.md`
   status carve; W2 §1 records that omitting exactly these was a **kill** against the Fable arm
   ("both are lane law in the canonical W0/W1"). W3 has none of the four. **Fix**: add the four
   bounds rows (`x-p-w3.json` create · `DEFECT-LEDGER.md` modify-append · `harvest-journals.mjs`
   execute-no-write · `COHESION.md` modify-carve §5 line only), owned by `.e` at close, with the
   harvest-seat-count condition on `.e`'s sub-gate as in W1.e.

### W4 — The PLAW-BIND Integration and the Release Condition · **DEFECTS (3)**

RC-P is the lane's crown: six conjuncts, six commands, a disjunction exactly where an unruled bar
must neither veto nor invent (conjunct 5), evaluated against a registry coordinate with a version
variable rather than a literal — and every conjunct honestly FALSE at authoring with the
measurements pasted (all six re-verified reproducible this pass where reachable). G-6's
reciprocity-by-grep over files this wave is forbidden to write is the both-ends law done properly;
G-9's three-disposition adoption-gap structure carries a real structural conflict (X-W9 §5.g/G31,
quotes verified verbatim) to the owner without usurping it. R-A is ratified here for the whole
sub-tranche, correctly mirroring X-W11.

1. **W4-D1 — G-10's open-state command is false as written, and §4's carve row misdescribes two of
   its four targets.** `grep -c 'VERIFIED | \*\*NO\*\*' …/W[0-4].md` (i) prints one count **per
   file** (five `path:count` lines), never the claimed "**5** at open", and (ii) matches only
   W2/W3/W4 — W0 and W1 carry the verb **line** form (`IMPLEMENTED ✗ · VERIFIED ✗`), not a
   four-verb table, so the true counts are `0,0,1,1,1`. Consequently §4's modify-carve row ("the
   four-verb **table's** VERIFIED row" in all four siblings) has no carve target in W0/W1, and
   G-10's close condition "the four verbs remain in **separate fields**" cannot be met against
   their single-line form. **Fix (one normalization + one command)**: convert W0 §2 and W1 §2 to
   the four-verb table (content-preserving; also what the R-A stamp act needs to be a row edit),
   and make the count a sum — `cat docs/tranches/X/parse-that/waves/W[0-4].md | grep -c 'VERIFIED
   | \*\*NO\*\*'` → 5 at open, 0 at close.
2. **W4-D2 — the release packet is unrowed and its delivery act has no lawful write path.** §3.8,
   §5.d and G-8 order the packet "sent to keyframes.js" and G-8's falsifier demands the row "name
   the delivery path" — while §3's prohibitions ("a letter is not a commit in someone else's
   tree") and §4's Do-NOT-touch (`keyframes.js/**`) forbid this wave every write that "send" could
   mean, and **no §4 row creates the packet file itself** anywhere. This is the X·V W11-D1 shape:
   a gate's cure arm exceeding the wave's own bounds if exercised. **Fix**: add a create row for
   the packet (e.g. `docs/tranches/X/parse-that/RELEASE-PACKET.md`, version-variable like RC-P);
   the INBOX sent-row names that in-repo path as the delivery point; and state in G-8/§5.d that
   cross-repo placement rides the root session's batched communique (COHESION §1 SS-6/E13) — the
   wave hands the letter to the courier, it does not enter the neighbor's house.
3. **W4-D3 — the L-13 harvest lane-law is absent** — no `x-p-w4.json` create, no
   `harvest-journals.mjs` execute row, no `DEFECT-LEDGER.md` append. Same class and same fix as
   W3-D2, owned by `.d` at close (the COHESION carve W4 already has).

## (c) Rulings — application audit

**R-A (stamping site).** CLEAN in design: `Status: planned` 5/5; **exactly one** VERIFIED-stamp
site exists (W4 G-10 / §2's "stamped here, and only here"); W0/W1/W2/W3 each close to IMPLEMENTED
with the R-A parenthetical; W4 advances all five rows in one act; ACCEPTED kept post-quartet in
every §12. The sole mechanical flaw in the stamp machinery is W4-D1 (the grep and the carve
target), booked above.

**R-B (alias law).** APPLIED. W3 and W4 each state their spelling alias once (`P.W3`/`P.W4` as
search aliases, never renames); W2 §10 carries the full alias **table** binding every stale
sibling label (W3's "W1 = algebra / W2 = realization" vocabulary, the `src/css/**` shorthand, W4's
"the Wasm artifact") to the condition and the discharging gate — the dependency-on-conditions
discipline W3 pre-declared from its end. No second unit was minted anywhere; no sibling file was
re-glyphed.

**R-E (bounds idiom + the descriptive-invocation hunt).** Every gate's probe text in all five
files was walked. Gate-invoked scripts carry bounds rows **5/5 files** (W0: `roots-census.sh` +
`harvest-journals.mjs`; W1: both probes + the harness globs; W2: all ten `harness/w2/*.mjs` each
tagged with its invoking gate + W1's instruments execute-only + the r1 probe; W3: four
`scripts/css-*.mjs` creates + the r1 probe execute row; W4: three fresh-root scripts + the checker
+ both value-side probes execute-only). Literal command paths hold in **W0, W2, W3, W4 — every
command cell**. The sole descriptive-invocation survivor is **W1 G-1/G-2/G-4/G-5** (W1-D1) — the
exact W8-G-7/W6-c3 blind spot: no path written, so path-keyed extraction passes while the rule
fails.

## (d) The checked laws, cross-file

- **Born-RED honesty**: 8+10+12+10+10 = 50 gates; 46 born-RED with pasted read-only baselines and
  dated HEADs, 2 MEASURE-AT-OPEN with the literal command and the *reason* measurement is
  impossible early (W1 G-8 HEAD-sensitivity; W3 G-5 no-Wasm-subject — the zero-artifact `find`
  pasted), 1 recorded-denial RED (W0 G-2, the lane's best epistemic move), 1 INHERITED-GREEN FLOOR
  correctly not counted RED (W4 G-7, loss-only). Spot re-measures this pass reproduced every
  reachable baseline. **The bar is owner-gated at every occurrence** (W1 G-7 · W2 G-7/OP-4 ·
  W3 G-10/OP-5 · W4 RC-P-5/OP-3, the disjunction); no PASS/FAIL is printed or printable anywhere;
  no wave invents a bar — several make inventing one a named defect of themselves.
- **Fresh-root invariant**: never created; asserted ABSENT with a pasted probe in all five files
  and both arms; re-verified ABSENT by this pass, 2026-08-04.
- **Ordering + cross-sub-tranche edges**: the W0→W1→W2→W3→W4 chain is reciprocal at every link
  (Opens-after/Depends ↔ Blocks, verified pairwise). KF.W3 is gate-keyed on RC-P and declared from
  both ends (W4 §6a quoting COHESION §2 verbatim; COHESION §2 stating it from the spine); the
  forbidden `parse-that→fourier` edge is declared in all five files and measured at zero (G-7
  floor, re-verified); the X·V edge is reciprocal by verbatim quote (W9:296/:373 ↔ W3 §10 /
  W4 G-9). Two intra-lane contradictions found: the worktree-siting law (W3-D1) and the two
  rotted line-pins (W0-D2/W1-D2).
- **Agglomeration law (M-25 ¶2)**: 5/5 files fold the hitherto corpus in a dedicated §2c table
  *and* carry substantial novel mechanism (W0's census law; W1's two-plane ledger; W2's candidate
  field + graduation; W3's code-union transposition; W4's RC-P). No transcription-only file. The
  W2 agglomeration record's kills/folds were audited against the sealed arms and are accurate.

**Superlatives, for the record (L-18 runs both ways)**: W0 G-2's EPERM-is-not-absence; W1's
F-1-reproducing consistency checks (a restatement that verifies itself); W2's kill-ledger-as-
deliverable with the author's prior recorded to be scored; W3 G-4's dead-contract-code-is-a-defect
⊇ direction; W4's RC-P conjunct-5 disjunction — the first bar-shaped clause in this program that
can neither veto nor invent.

## (e) Roster and readiness

| wave | verdict | defects |
|---|---|---|
| W0 | DEFECTIVE | 3 (count 17≠18 · rotted line-pin · dangling later-waves pointer) |
| W1 | DEFECTIVE | 2 (R-E descriptive invocation ×4 gates · rotted line-pin) |
| W2 | **CONFORMANT** | 0 |
| W3 | DEFECTIVE | 2 (sibling worktrees beside the fresh root · harvest/COHESION lane-law absent) |
| W4 | DEFECTIVE | 3 (G-10 stamp-count false · release packet unrowed/undeliverable · harvest lane-law absent) |

**NOT tranche-ready.** Every defect is a single-to-few-edit repair inside its own file (W4-D1
touches W0/W1 §2 as a format normalization). Remaining to the X·P SPECIFIED stamp: repair the ten;
a second L-20 pass over the repaired bytes; iterate to a clean declared-Fable final pass
(COHESION §3.5); then the root session carves COHESION §0/§1 SS-5 to SPECIFIED. The owner's
begin-word remains the standing execution gate throughout and is not a conformance item.

*First pass complete 2026-08-04 · 5 canonical files + 2 sealed arms read whole · 1 CONFORMANT ·
4 DEFECTIVE · 10 numbered defects, each with an exact fix · all verification read-only; the fresh
root not created; no non-docs byte touched.*

---

## SECOND PASS — post-repair re-adjudication, 2026-08-04

`claude-fable-5` — fresh conformance adjudicator (L-20), second pass, declared and served Fable.

**Inputs read whole**: the FIRST PASS above (dated evidence, unrewritten) · all seven files under
`docs/tranches/X/parse-that/waves/` at their **post-repair bytes** — W0/W1/W3/W4 as working-tree
modifications, W2 canonical tracked-clean (untouched since agglomeration, exactly as a CONFORMANT
verdict predicts), both author arms tracked-clean at their committed seal (mtimes 2026-08-03,
pre-pass-1; the agglomeration record's kill claims spot-re-verified against them this pass: the
Opus arm's self modify-carve at its `:468` bounds row, the Fable arm's `CARGO_TARGET_DIR N/A`
at `:316`, its zero AC-4/band-seed mentions, its `.g` harness self-authorship at `:96`). All
verification read-only; this append is the pass's only write.

**Verdict roster**: **4 CONFORMANT** (W0 · W1 · W2 · W3) · **1 DEFECTIVE** (W4, 2 defects: one
pass-1 miss surfaced by the fresh one-root re-check, one residual of W4-D1's deferred half).
**9 of 10 pass-1 defects FIXED ON THE MERITS; 1 PARTIAL.** No repair was cosmetic-only; no repair
regressed a sibling. **NOT tranche-ready** (COHESION §3.5: SPECIFIED stamps only at a clean
declared-Fable final pass).

### (a) Mechanical receipts (re-derived fresh this pass, read-only)

- Fresh root: `ls -d /Users/mkbabb/Programming/parse-that-css-totality-p2` → *No such file or
  directory*, 2026-08-04 — never created, across authoring, pass 1, and the repairs.
- Pause handoff: `shasum -a 256` → `ced23440…f20f7` — **MATCH**.
- The 52: `grep -cE '^    [A-Za-z]+,$' src/css/index.ts` → **51**; `:45 export { coerceToSyntax }` —
  51+1=52, exact.
- Substrate: `parse-that` worktree list → **8 entries**; `git grep -c wasm32 HEAD --
  rust/parse_that/` → exit 1 (zero committed); working-tree `wasm32` files → **3** — OP-6/OP-7 hold.
- COHESION anchors, live bytes: the X·P release-condition bullet at `:66-68` — **both of W0 G-8's
  fragment greps return rows** (`:66` "X·P release condition → KF.W3"; `:68` "parse-that→fourier is
  FORBIDDEN"); W1 §10's verbatim quote matches those bytes; `:18` still the X·P reservation row
  (the two surviving `:18` pins verified live); the **SS-6 row** W4's packet machinery quotes
  verified at `:38` ("ONE batched BJ letter at the next boundary · root-authored (Fable); E13").
- Line-pin hunt over all five waves: zero rotted pins remain — the only `:45` occurrence is
  *inside* W0 G-8's falsifier as the named negative example, which is the cure teaching, not a
  citation.
- Cross-edges: `W9.md:296` and G31's falsifier `:373` verbatim-match W3 §10 / W4 G-9's quotes;
  fourier `package.json` ×2 → **0** `parse-that` hits (G-7 floor GREEN); INBOX
  `grep -c 'X·P\|X.P.W\|RC-P'` → **0** (G-8/RC-P-6 born-RED holds); keyframes pin
  `"@mkbabb/value.js": "4.0.0"` at `package.json:69`.
- W1 OP-2 liveness: `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/` **still readable**
  2026-08-04 — the rescue remains possible and remains urgent.
- All four probes present and byte-stable (`r1-published-totality.mjs` 3,476 B ·
  `parsethat-surface-gaps.mjs` 4,116 B · `harvest-journals.mjs` 5,445 B ·
  `verify-packed-surface.mjs` 5,234 B). Bar-ledger arithmetic re-footed: all six figures and both
  consistency percentages (25.0% / 18.8%; 1.906×) exact.

### (b) Repair audit — the ten, on the merits

| # | pass-1 defect | verdict | evidence at the post-repair bytes |
|---|---|---|---|
| W0-D1 | §3.2 summed 17 vs a gate demanding 18 | **FIXED** | §3.2 now "the three TCC-walled Codex evidence paths (8+3+2+3+1+1 = **18**, the count G-3's census table holds)"; the census table re-counted this pass: 18 rows exactly |
| W0-D2 | G-8 pinned the reciprocal edge at rotted `COHESION.md:45` | **FIXED** | G-8 re-grounded on section anchor + two literal fragment greps (both return rows today, `:66`/`:68`); §5.d and the §9 commit body carry the anchor-never-line law; the falsifier now states *why* a line pin cannot express the failure — better than the ordered fix |
| W0-D3 | §10's "later X·P waves" dangling pointer | **FIXED** | §10 now a **total disposition table** over handoff §8 steps 3–8: step 3 → W2 G-2, step 5 → W3 G-4, step 8's release limb → W4 OP-1 (owner-gated), steps 4/6/7 + the sequence limb → **DORMANT-UNLESS-NC-0-REVIVED**, argued as a *terminal disposition, not a schedule*, with NC-0's revival preconditions cited; §11.1 rewired to point at the table |
| W1-D1 | R-E descriptive invocation ×4 gates | **FIXED** | G-1 `node harness/totality/derive.mjs --check`, G-2 `npx tsx harness/equivalence/harness.ts`, G-4/G-5 `npx tsx harness/bench/bench.ts` — literal in the gate cells, in §4's bounds rows, and in §5's Files; the W2 cross-file coordinate now stated at both ends; G-5 additionally routes its stderr capture **inside** the bounded tree (`harness/bench/bench.stderr` under the `harness/bench/**` create row) — a repair that anticipated the bounds question nobody had asked yet |
| W1-D2 | rotted `COHESION.md:45-47` pin in §10 | **FIXED** | §10 cites §2's X·P bullet by anchor with the sentence quoted verbatim; quote byte-checked against live COHESION this pass |
| — | W2 (CONFORMANT, no defects) | **STANDS** | bytes tracked-clean, unchanged since agglomeration; the §4b `ac1/ac2/ac3` label observation remains observation-only |
| W3-D1 | three sibling roots beside the fresh root | **FIXED** | §4b relocated to `<p2>/.worktrees/w3a\|w3b\|w3c`, `CARGO_TARGET_DIR=<p2>/target/w3{a,b,c}`; W2 §4b's ONE-root law quoted verbatim and adopted; the census-grep rationale added ("indistinguishable by name from an unlawful root"); the orchestrator now records the no-sibling state before dispatch |
| W3-D2 | L-13 harvest + COHESION carve absent | **FIXED** | all four lane-law rows landed (`x-p-w3.json` create · `DEFECT-LEDGER.md` modify-append by script · `harvest-journals.mjs` execute-no-write with the literal command · `COHESION.md` modify-carve §5 line only), owned by `.e` at close with the seat-count-equals-five sub-gate; §4a, §8, and §9 wired |
| W4-D1 | G-10's count false; carve row had no target in W0/W1 | **PARTIAL** | the command half is FIXED — `cat …W[0-4].md \| grep -c` with the load-bearing `cat` explained and the misreading named. The normalization half was **not performed**: W0 §2 and W1 §2 remain in the one-line verb form at these bytes (diffed against the index: unchanged), and W4 instead added OP-6 deferring the conversion to "the X·P round-2 L-20 repair" — the round that has now run without doing it. See defect W4-D5 below |
| W4-D2 | release packet unrowed, no lawful write path | **FIXED** | `RELEASE-PACKET.md` has a §4 create row (owned by `.d`), §3.8 orders it, G-8 is rewritten to the in-repo-path-is-the-delivery-point + SS-6-batched-courier shape ("the wave hands the letter to the courier; it never enters the neighbour's house"), RC-P conjunct 6 names both the path and the batch, and the SS-6 row quoted is live at COHESION `:38` |
| W4-D3 | L-13 harvest lane-law absent | **FIXED** | `x-p-w4.json` create + harvester execute-no-write (literal command) + `DEFECT-LEDGER.md` modify-append rows landed, owned by `.d` at close, seat-count-equals-four sub-gate; §3.10 names the W2 kill precedent by citation — the lane law now states its own provenance |

### (c) Defects — second pass (both in W4; exact fixes)

1. **W4-D4 — §4b opens a sibling worktree beside the fresh root, against the same ratified
   ONE-root law that killed W3-D1.** `X.P.W4.b`'s home is
   `/Users/mkbabb/Programming/parse-that-css-totality-p2-w4b` — a worktree of the fresh root placed
   **beside** it in `~/Programming`. Canonical W2 §4b: *"worktrees **inside** the fresh root,
   never beside it (ONE named root, no siblings ever created)"* — and the repaired W3 §4b now
   states the reason in full: a `parse-that-*` sibling is indistinguishable by name from an
   unlawful root in W0's census grep. W4 is the one wave still on the wrong side of the law the
   lane just ratified twice. Pre-existing at the pass-1 bytes (diffed against the index — not a
   repair regression); a pass-1 **miss**, booked now without apology. **Fix**: one table edit —
   `<p2>/.worktrees/w4b`, `CARGO_TARGET_DIR=<p2>/target/w4b` — plus the header sentence
   ("Phase 1's two seats run in sibling worktrees" → one seat, one worktree, inside the root).
2. **W4-D5 — the W4-D1 normalization was deferred to a repair round that has already run, and is
   now owned by no one.** OP-6 honestly measures the true state (per-file VERIFIED counts
   `0,0,1,1,1`, sum 3) and correctly halts `.d` against a sibling with no carve target — the
   armor is right. But §4's carve row asserts "All four carry that table", **false at these
   bytes**; G-10's baseline narrates the table as "landed in all five files", which it is not; and
   the conversion is assigned to "the X·P round-2 L-20 repair, owed to W0's and W1's own seats" —
   a dangling owner, the exact shape W0-D3 was booked for (a promise no wave owns). The repair
   session edited both W0 and W1 for their own defects and skipped the two-block conversion pass 1
   ordered in the same breath. **Fix**: perform it — convert W0 §2's and W1 §2's verb lines to the
   four-verb table, content-preserving (each file's evidence strings carried into the table's
   evidence column, as W2/W3 model); OP-6's check then reads `1` five times, G-10's open sum reads
   **5**, and §4's carve row becomes true. No W4 edit required beyond, optionally, retiring the
   "round-2" tense.

### (d) The corpus checks, re-run fresh

- **R-E + the descriptive-invocation hunt**: every gate's probe text in all five files walked
  again. Literal command paths now hold in **every command cell of every file** — the four W1
  survivors are cured, and no new descriptive invocation appeared anywhere. Every gate-invoked
  script carries its bounds row (W0 ×2 · W1's three entries + two probes + harvester · W2's ten
  `harness/w2/*.mjs` + execute-only rows · W3's four `scripts/css-*.mjs` + probe + harvester ·
  W4's checker + three fresh-root scripts + both value-side probes + harvester). Gates with no
  command cell (W0 G-2's permission assertion; W3 G-3's inline `node -e` probe) state their
  evidence inline and invoke no unnamed instrument.
- **Ordering + cycles**: W0→W1→W2→W3→W4 linear, reciprocal at every link (Opens-after/Depends ↔
  Blocks re-verified pairwise); no cycle. Cross-sub-tranche: KF.W3 keyed on RC-P and declared from
  both ends (W4 §6a ↔ COHESION §2, verbatim at the live bytes); PLAW-BIND stated in all five files
  with the forbidden edge measured at zero from both fourier manifests; the X·V edge reciprocal by
  verbatim quote (W9 `:296`/`:373`). The two pass-1 contradictions (worktree law, line pins) are
  cured; the surviving intra-lane contradiction is W4-D4 — the same law, the last holdout.
- **ONE-root law across W0/W3**: consistent — W0 §4b (no worktree at all, with the load-bearing
  reason), W3 §4b (inside, verbatim adoption). W4 §4b is the breach (W4-D4).
- **Four-verb discipline (R-A)**: exactly one VERIFIED-stamp site (W4 G-10/§2, "stamped here, and
  only here"); no sibling close stamps it; ACCEPTED stays post-quartet in every §12; the verbs are
  nowhere conflated — W0/W1's one-line form keeps them distinct, it merely is not the table the
  stamp machinery needs (W4-D5).
- **No invented bench bar**: Plane B `OWNER-GATED-PENDING-RATIFICATION` at every occurrence
  (W1 G-7/§5.e · W2 G-7/OP-4 · W3 G-10/OP-5 · W4 RC-P-5's disjunction); AC-3's 20% screen still
  correctly scoped as an admission threshold; no PASS/FAIL printed or printable anywhere; the
  repairs introduced no bar-shaped clause.
- **Agglomeration law (M-25 ¶2)**: 5/5 files still fold the hitherto corpus in §2c *and* carry
  novel mechanism; the repairs **added** substance (W0's disposition table, W3's siting rationale,
  W4's packet-courier machinery) and removed no fold. No transcription-only file.

**Superlatives, for the record (L-18 runs both ways)**: W0 §10's **DORMANT-UNLESS-NC-0-REVIVED**
— the dangling-pointer cure done right, a named terminal state instead of a promised wave; W1
G-5's stderr capture routed into its own bounds row before any auditor asked; W3 §4b's
census-grep rationale, which upgrades the ONE-root law from rule to argument; W4 G-10's
load-bearing `cat` with the misreading it prevents named in the gate text; and OP-6's
halt-not-reflow discipline — the right instinct (never reflow a sibling's prose from another
wave) even where its discharge is the pass's one residual.

### (e) Roster and readiness

| wave | verdict | defects |
|---|---|---|
| W0 | **CONFORMANT** | 0 (D1/D2/D3 all fixed on the merits) |
| W1 | **CONFORMANT** | 0 (D1/D2 fixed on the merits) |
| W2 | **CONFORMANT** | 0 (bytes unchanged, tracked-clean) |
| W3 | **CONFORMANT** | 0 (D1/D2 fixed on the merits) |
| W4 | DEFECTIVE | 2 (W4-D4 sibling worktree beside the fresh root · W4-D5 the deferred W0/W1 §2 normalization, unowned) |

**NOT tranche-ready — X·P is NOT yet SPECIFIED.** Both remaining defects are small and exactly
specified: one worktree-table edit in W4 §4b; one content-preserving two-block conversion in
W0 §2 and W1 §2 (which simultaneously truthifies W4 §4, OP-6, and G-10's open sum). Remaining to
the stamp: repair the two; a third L-20 pass over the repaired bytes; a clean declared-Fable final
pass (COHESION §3.5); then the root session carves COHESION §0/§1 SS-5 to SPECIFIED. Status
fields stay `planned` throughout; **execution awaits the owner's begin-word**, which is a standing
gate and not a conformance item.

*Second pass complete 2026-08-04 · 5 canonical files + 2 sealed arms read at post-repair bytes ·
9 of 10 repairs FIXED on the merits, 1 PARTIAL · 2 defects booked (1 pass-1 miss, 1 repair
residual), each with an exact fix · all verification read-only; the fresh root not created; the
sealed arms untouched; this append the only write.*
