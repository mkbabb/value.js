# PARSER MEGA-TRANCHE — EXACT RESUME HANDOFF

**Date:** 2026-07-29
**Status:** `PASS_1_CLOSED_M2_ACTIVE`; older token-event formation is
superseded as parser architecture
**Mode:** active tranche development; do not represent this packet as product
execution, full-CSS conformance, or W4 authorization

> **RESUME HERE — 2026-07-29 Pass 1 receipt.** Durable independent archaeology
> and Sol agglomeration are at parse-that-css-totality `273133b3d88f`.
> R/E/V/K are terminal `KILL`; S/D are inactive. Repair the incumbent
> source-direct closure runtime only. Luna M1 is committed at `059e129`; 124
> legacy tests plus its three targeted obligations pass. M2 parse-owned
> diagnostics/result and source-sound raw memo is active. The generated
> token-event tape and P5 token plane in the older Value addendum are
> superseded; preserve their CSS Syntax/WPT/recovery/span research only.

## 1. Read order

1. `PARSER-IN-FLIGHT-AUDIT-2026-07-29.md`
2. `PARSER-WAVE-ADDENDUM-2026-07-29.md`
3. this handoff
4. isolated prototype `full-syntax/README.md`
5. active SK-V26 `STATE.md` and its latest W3 acceptance receipts

The general frontend audit remains
`IN-FLIGHT-AUDIT-2026-07-29.md`. This packet supersedes only its parser ordering
and parser-specific formation detail.

## 2. Durable identities

| Surface | Identity | State |
|---|---|---|
| active parser task | `019fae36-1241-7d33-9c14-58d86be7fae3` | active; Pass 1 closed, M2 active |
| parse-that Pass 1 | `/Users/mkbabb/Programming/parse-that-css-totality` at `273133b3d88f` | R/E/V/K killed; S/D inactive; M1 `059e129`; dirty M2 in progress |
| BBNF W3 | `/Users/mkbabb/Programming/bbnf-lang-skv26`, `codex/sk-v26-bbnf` | active dirty; protected |
| parse-that ABI-3 | `/Users/mkbabb/Programming/parse-that-skv26`, `codex/sk-v26-parse-that`, `e31fbfedc24a` | current clean protected descendant; `ed1ffa24…` remains the historical ABI-3 admission |
| prototype worktree | `/Users/mkbabb/Programming/value-css-totality-audit` | clean |
| prototype branch | `codex/css-totality-prototype-20260729` | committed |
| prototype commit | `dea7a93c92823a05e2ad99f9f82b82edb8d6b822` | durable |
| audit-doc branch | `codex/parser-css-totality-audit-20260729` in value.js | exact five-file slice banked without changing the active HEAD/index |
| value.js main | `/Users/mkbabb/Programming/value.js`, `tranche-u` | active materially dirty; do not bulk-stage |

The prototype is committed in its isolated worktree. These three parser docs
remain untracked in the shared value.js checkout because the active Claude
session owns that dirty tree and changing its HEAD or real index could invalidate
live evidence hashes:

- `PARSER-IN-FLIGHT-AUDIT-2026-07-29.md`;
- `PARSER-WAVE-ADDENDUM-2026-07-29.md`;
- `PARSER-RESUME-HANDOFF-2026-07-29.md`.

They and the two general in-flight audit documents are nevertheless Git-durable
on `codex/parser-css-totality-audit-20260729`, created through an isolated
temporary index. Resolve that branch tip for the exact commit. When the active
writer settles, integrate the five-file branch slice deliberately; do not stage
the shared checkout wholesale.

## 3. Active SK-V26 cursor

At the last independent read:

- parse-that W3 ABI-3 is clean at `e31fbfedc24a`; `ed1ffa2…` is its historical admission;
- the BBNF source → plan → scalar-event vertical compiled end to end;
- the previously reported semantic contract gate was 13/17; since then the
  generated path advanced from compile failure into observable runtime
  semantics;
- the active writer is tracing one remaining runtime mismatch and a newly
  reached malformed mutation witness at their generated call sites;
- verifier self-falsification, residual `first` identities, Pratt index
  inference, resource-fault witnesses, and exact accounting/contract seams were
  repaired or narrowed during that progression, but no final acceptance receipt
  has yet superseded the 13/17 report;
- `edit.rs` had been removed;
- W3 public/hostile witnesses, consumer migration, replay/package/admission, and
  freeze remained open;
- W4 remained blocked and must stay blocked.

Do not edit the active worktree from this packet. The batch communiqué is a
next-boundary correction: finish existing W3 honestly, then canonicalize the
post-W3 parser addendum before W4.

## 4. Independent prototype

### 4.1 What exists

`docs/tranches/V/megatranche/prototypes/css-parser/full-syntax/**` contains:

- a readable TypeScript CSS Syntax Level 3 reference;
- decoded-input preprocessing with original UTF-16 source mapping;
- the normative tokenizer token set, comments side ledger, decoded escapes,
  numeric metadata, strings/URLs/bad tokens, CDO/CDC, and exact raw spans;
- component values, functions, simple blocks, generic rules, declarations,
  recovery diagnostics, bounded depth, and exact raw replay;
- normative single-component whitespace/empty/trailing behavior;
- separate single-declaration-to-EOF and declaration-list semicolon behavior;
- a machine-readable supported/opaque/out-of-scope ledger;
- five commit/blob-pinned WPT-derived projections;
- an action-free `UNCOMPILED_POST_W3_TARGET` BBNF grammar/instance sketch.

The reference was corrected after independent adjudication:

1. Unicode range is a descriptor microsyntax, not a tokenizer token. Its helper
   is isolated and never called by generic tokenization.
2. Single-component parsing now discards surrounding whitespace, reports empty
   input explicitly, and reports additional non-whitespace input.
3. Single-declaration parsing consumes through EOF; only declaration-list
   parsing treats semicolon as a separator.
4. `SUPPORTED` means focused prototype evidence, not broad WPT conformance.

### 4.2 What does not exist

- a compiled/generated BBNF/parse-that CSS Syntax parser;
- byte-stream encoding detection;
- style-block mixed declaration/nested-rule materialization;
- selector or typed property/module grammars;
- CSSOM, cascade, computed values, layout, rendering, or animation scheduling;
- broad WPT conformance;
- a production data layout;
- a full-CSS, Rust, Wasm, or SOTA result.

The target grammar is historical shape/refutation evidence only. It must not
become parser input or a generated CSS parser. Value's accepted vertical is
scannerless and source-direct through parse-that combinators.

## 5. Verification receipt

Run from the isolated prototype directory:

```text
npx tsc -p full-syntax/tsconfig.json --noEmit
  PASS

npx vitest run full-syntax/syntax.test.ts --config vitest.config.ts
  PASS — 21/21

npx tsc <strict bounded runner files>
  PASS

npm run bench
  PASS — 48 scored paired rounds per cell/leg

npx tsx bench/syntax-run.ts
  PASS — 928 raw reference samples

jq -e . <all new JSON>
  PASS

git diff --check
  PASS
```

The broad prototype commands remain honestly red on an inherited clean-checkout
defect:

```text
npm run check
  5 TS2307 errors:
  - cand-F cannot resolve @mkbabb/value.js/css
  - cand-O cannot resolve absent ignored vendor/value-js-4.0.0

npm test
  743 pass; three historical oracle suites fail on the same absent fixtures
```

No dependency/source workaround was added. The benchmark obtains the exact
published 4.0.0 tarball in OS temporary storage, verifies the pinned `css.js`
hash, and deletes it after the run.

## 6. Correctness defects to carry

These current-source probes are exact regression cases:

```text
parseCssColor("rgb()")   -> throws
parseCssColor("rgba()")  -> throws
parseCssColor("hsl()")   -> throws
parseCssColor("color()") -> throws
```

The API promises failure-explicit `ParseResult`; all four ordinary invalid
inputs must become structured failures.

```css
a { color: red; broken; background: blue }
```

Current `parseStylesheet` aborts at `broken`. CSS declaration recovery must
retain the valid neighboring declarations under the selected entry/profile.

```css
a { --x: { a: b }; color: red }
```

Current code drops the custom property and invents a nested style whose selector
is `--x:`. The syntax event layer must preserve the brace block as component
value data.

Current diagnostics have the desired public fields, but parse-that Rust supplies
only a furthest cursor. P1 must carry truthful code/span/expected/actual facts;
value.js must not synthesize fake precision.

## 7. Performance and profile adjudication

### 7.1 P4 color-only paired run

The exact raw receipt is:

`bench/receipts/p4-color-2026-07-29T15-59-30-746Z-9784ccbff196.json`

The derived simultaneous-interval decision is:

`bench/receipts/p4-color-paired-adjudication-2026-07-29.json`

| Row | Paired median ratio vs published | Simultaneous interval | Decision |
|---|---:|---:|---|
| published B/A calibration | 1.007 | 0.994–1.023 | calibrated |
| cand-O node, accepted | 1.102 | 1.090–1.116 | below 10% at lower bound |
| cand-O drop-in, accepted | 0.993 | 0.976–1.004 | no win |
| cand-F, accepted | 1.128 | 1.110–1.138 | one-family direction only |
| cand-O node, reject | 0.719 | 0.715–0.724 | ~28% regression |
| cand-O drop-in, reject | 0.721 | 0.717–0.727 | ~28% regression |
| cand-F, reject | 0.936 | 0.925–0.941 | ~6% regression |

The intervals are per-round median-ratio bootstrap intervals at 98.75%, giving
Bonferroni simultaneous 95% coverage for four comparisons per leg. The R1 throw
leg is incomparable: published code throws while candidates return rejection.

Terminal decision:

- cand-O node: REJECT for promotion;
- cand-O drop-in: REJECT;
- cand-F: REJECT for promotion;
- incumbent ordinary-invalid-input throwing: REJECT as API behavior;
- full-CSS/SOTA inference: prohibited.

The CPU profile attributes roughly 77% of all sampled ticks in the color run to
the published minified failure/exception path. That confirms why the R1 row is
large; it does not convert unequal semantics into a speed claim.

### 7.2 Reference CSS Syntax scaling

The exact raw receipt is:

`bench/receipts/css-syntax-reference-profile-2026-07-29.json`

It contains 928 raw samples across compact, trivia, escape, and recovery
families at 64 B, 1 KiB, 64 KiB, and 1 MiB. Representative medians:

| Family | 1 MiB tokenize | 1 MiB stylesheet |
|---|---:|---:|
| compact | 12.19 MiB/s | 9.34 MiB/s |
| trivia | 11.12 MiB/s | 8.46 MiB/s |
| escapes | 13.27 MiB/s | 10.09 MiB/s |
| recovery | 10.54 MiB/s | 10.36 MiB/s |

The 64 KiB rows are roughly 15–29 MiB/s while 1 MiB rows fall to roughly
8–13 MiB/s. The profile names allocation-rich component construction,
tokenizer helpers, token dispatch, preprocessing, and GC; about 15% of the
whole-process profile is checksum serialization outside the timed parser
interval.

Disposition:

- retain the oracle for differential correctness;
- reject its per-code-point/per-token/per-node object layout as implied
  production architecture;
- the generated P2 candidate must separate token/event-only work from lossless
  tree retention and record allocation/peak bytes/native symbols;
- no competitor or promotion claim is available.

## 8. Full-CSS boundary to preserve

The accepted program is:

```text
parse-that M2–M5 reusable runtime obligations
  -> Passes 2–3 and two clean adversarial audits
  -> freeze exact CSS Syntax/Webref denominator
  -> Value source-direct component values
  -> Value source-direct functions and declarations
  -> Value source-direct stylesheet and typed profiles
  -> browser/WPT/performance/consumer close
```

The old addendum is research input and requires re-authoring around this
source-direct sequence. It is not executable authority.

The active task must not squeeze P1/P2 into W3. W3 closes its existing generic
P2 event contract first. The post-W3 canonicalization decision then decides
whether these waves are a `.5` addendum or the next parser tranche. W4 cannot
run first because profiling the CSS-shaped control would optimize a denominator
that proves no CSS Syntax coverage.

## 9. Exact next actions

1. Finish current W3 repairs, public/hostile witnesses, regeneration, consumer
   migration, and admission without importing the prototype target.
2. Record W3 freeze identities and rename its CSS witness prospectively to
   “CSS-shaped nested-region control.”
3. Assign it zero CSS Syntax/full-CSS percentage.
4. Canonicalize P0–P6 under a non-conflicting tranche/addendum identity.
5. Run P0 truth/corpus seal before any post-W3 candidate or competitor timing.
6. Implement P1 source graph and diagnostic carrier with a non-CSS modular
   control.
7. Compile/refute the action-free target only in P2.
8. Expand conformance from five pinned projections to the frozen WPT-derived
   matrix; do not call 21 focused tests conformance.
9. Preserve normative, draft, opaque, context-required, and value.js extension
   denominators separately.
10. Execute W4 optimization only after the generated equivalent P2 boundary
    exists or explicitly retain W4 as the generic W3-only cut with no CSS claim.

## 10. Communiqué receipt

The complete batch was sent once at **2026-07-29 12:16:54 EDT** to active task
`019faa6d-05d6-7eb3-97c9-4fe16bb0fd1a` using GPT Sol xhigh. The prompt says to
consume it at the next safe W3 boundary, not to interrupt/widen/restart the
current repair, and requests a durable acknowledgment/terminal disposition in
SK-V26 `STATE` or its successor handoff. No piecemeal parser follow-up should be
sent unless new source/test/profile evidence changes a ruling. The communiqué is
present in the active in-progress turn; acknowledgment is pending while W3
runtime acceptance remains active.

## 11. Session-wall law

At every boundary:

```text
harvest exact files
  -> hash receipts and source identities
  -> validate schemas/tests/profiles
  -> commit the bounded slice
  -> update STATE/handoff with exact next command
```

No memory-only result, transient terminal number, uncommitted target, or
session-local agent verdict counts as banked.
