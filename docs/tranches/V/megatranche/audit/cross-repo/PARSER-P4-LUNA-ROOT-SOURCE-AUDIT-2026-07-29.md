# Parser P4 Luna root source audit

Date: 2026-07-29  
Phase: megatranche development / external research evidence  
Terminal disposition: **AMEND — JSON-ONLY MECHANISM EVIDENCE; CSS MECHANISM CREDIT PRUNED**  
Admission, execution, product, release, and API credit: **zero**

## Authority

The sealed Luna packet is:

`/Users/mkbabb/Documents/Codex/2026-07-29/parser-p4-luna-prototypes/outputs`

Root independently verified all 28 entries in `checksums.sha256` from the
packet's parent directory. Principal identities are:

| Artifact | SHA-256 |
|---|---|
| `README.md` | `b16fea662f13c8d399872007617e36ee6a3b52cdef0fe61e95a5ab2e8b0a18a0` |
| `VERDICT.md` | `b94d4940ab7ba69dd58c17bb69d82e7c869e93a71a971d4ce1b9aaa3e7f7eb44` |
| `FULL-CSS-DENOMINATOR.json` | `d4f254b71461593ea4a15aceef161807eb6bf70c307cb23d54d3679a99e3a6fe` |
| `checksums.sha256` | `17cf671e88bd6406609881b99991eb6c5eb679fccfe5c6d9402875a6ef0e90d9` |
| `lib/runtime.mjs` | `6ac01347…` |
| `lib/css.mjs` | `c072294a…` |
| `lib/json.mjs` | `71cb74d2…` |
| `runner.mjs` | `1f7929d2…` |

The exact full hashes for the last four files remain sealed by
`checksums.sha256`; their prefixes above match the parser owner's independent
source audit.

The packet is immutable evidence. This audit narrows its claims; it does not
rewrite or repair it.

## Result

The packet contains 864 timing rows:

| Product | Family | Rows | Ratio range | Rows below `1x` | Rows at least `10x` |
|---|---|---:|---:|---:|---:|
| JSON | fused | 144 | `0.5016–0.8852x` | 144 | 0 |
| JSON | region | 144 | `0.2614–0.7718x` | 144 | 0 |
| JSON | capture | 144 | `0.4892–0.9710x` | 144 | 0 |
| CSS | fused label | 144 | `0.8393–1.2065x` | 65 | 0 |
| CSS | region label | 144 | `0.8539–1.1939x` | 77 | 0 |
| CSS | capture label | 144 | `0.8213–1.1841x` | 80 | 0 |

Only the 432 JSON rows exercise the three candidate mechanisms. Every one is
slower than the accepted-M2 control. The 432 CSS rows exercise the same
handwritten parser body on both sides and therefore carry no mechanism,
second-consumer, full-CSS, or performance credit.

## Source proof: the CSS lanes do not exercise F1, F2, or F3

### F1 fused terminal/action

`lib/css.mjs:25-28` caches only `R.literal(text)` without an action. The fused
literal branch in `lib/runtime.mjs:137-145` requires
`family === "fused" && action`. The fused regex branch at
`lib/runtime.mjs:168-170` also requires an action.

Neither branch is reachable from the CSS grammar. The `fused` CSS rows do not
measure terminal/action fusion.

### F2 monomorphic region/builder

The region implementation exists only inside `seq`, `many`, and `sepBy` at
`lib/runtime.mjs:218-290`. `lib/css.mjs` calls none of those combinators.
CSS arrays and nodes are built directly by handwritten loops and ordinary
JavaScript arrays in `readComponent`, `readComponents`, `readDeclarations`,
`readAtRule`, and `readRules`.

The `region` CSS rows do not measure region construction. The JSON region
implementation also creates dynamic arrays/`Region` instances and therefore
does not establish the advertised fixed-shape monomorphic boundary.

### F3 capture-index/source-slice

The candidate seam is `captureRegex` at `lib/runtime.mjs:187-203`.
`lib/css.mjs` never calls it. Its identifiers, numbers, strings, URLs, blocks,
and source slices are read by handwritten functions over the source string.

The `capture` CSS rows do not measure capture-index semantic fusion.

### Same body on both CSS sides

`lib/css.mjs:301-307` wraps the complete handwritten recursive-descent
stylesheet reader once in `new R.Parser`. `runner.mjs:178-183` constructs
`makeCss("control", ...)` and `makeCss(family, ...)`, but the family-specific
mechanisms above are unreachable. Both timed sides execute the same parser
body apart from incidental wrapper/runtime noise.

The CSS ratios are parity/noise, not a two-consumer experiment. The CSS CPU
profile is consequently a same-code profile and cannot localize candidate
mechanism cost.

## Dispatch breach: Luna did not implement the Sol candidates

The Sol packet's `LUNA-DISPATCH.md:7-29,55-72` requires four isolated
prototype packets:

1. P4-A RSR;
2. P4-B CISF;
3. P4-C CTPT;
4. P4-A+C composition;

and a live-dispatch JSON grammar authored from the same generic primitives.

The Luna packet implements none of those four packets:

- `lib/runtime.mjs:4,137,168,219,249-290` switches among the unrelated F1
  fused-action, F2 region-array, and F3 capture families inside one runtime;
- there is no RSR signed-step return, numeric/reference slab, authored output
  slot ABI, accepted-root reachability walk, or single finalizer;
- there is no CTPT compact numeric provenance trail or independent CTPT
  packet;
- there is no RSR+CTPT composition packet;
- `lib/json.mjs:36-51` constructs an ordered-choice candidate rather than the
  requested live-dispatch JSON product.

P4 therefore contains a sealed Sol design and a different failed Luna
experiment. It is not a completed Sol-to-Luna implementation pass.
RSR/CISF/CTPT remain unimplemented design candidates; F1/F2/F3 are separate
terminal negative families.

## Matrix and equality limitations

The following claims are also narrowed:

1. Each configuration has one worker process, not seven independent
   replicates.
2. `runner.mjs:174,191-198` fixes either AB or BA order for all eleven batches
   in a worker; it does not alternate order within that worker.
3. `runner.mjs:209-212` passes a seed, but the measured parser path never uses
   it to vary fixtures, order, or sampling.
4. The 186-row verification bank is exactly 93 complete-state equalities and
   126 value plus 126 immutable-result equalities. It is RED.
5. The state view omits the complete fault/depth/limit surface.
6. The immutable envelope is a narrower `{ok,value,span,diagnostics}` shape,
   not the complete frozen consumer result law.
7. The JSON candidate omits an exact EOF boundary and uses a generic ordered
   choice that changes the success frontier (`-1` control versus `0`
   candidate on reproduced valid rows). Invalid/failure equality remains RED.
8. The cold-first bank imports the accepted M2 module before timing and is not
   a qualifying construction-plus-first-parse plane.
9. No raw row reaches `10x`; exact bootstrap is correctly withheld.
10. Scales 1,439 and 1,653 and the full Webref/WPT denominator remain
    unmeasured.

## Genealogy correction

The Sol architecture packet remains design-only:

- RSR's run record, scalar status, append-only region lengths, rollback mark,
  and deferred finalizer are not yet proven distinct from the killed
  region/event/staged families.
- CISF is not yet proven distinct from the killed capture-index/source-slice,
  source-leaf, callback, and native-sticky families.
- CTPT restates substantial portions of S7's run-owned diagnostic builder and
  length rollback plus the earlier flat journal/event family.
- Luna's proposed P5-SRA arena with commit/discard journals risks being RSR or
  F2 under a new name.

A fresh Sol adjudicator must prove a new cost-removal boundary rather than a
new storage encoding or vocabulary.

## Terminal dispositions

| Item | Disposition |
|---|---|
| Sealed Luna packet and raw JSON rows | **KEEP** as immutable negative evidence |
| F1/F2/F3 JSON timings | **FOLD** into the P4 genealogy as terminal negative rows |
| F1/F2/F3 CSS timing claims | **PRUNE** from mechanism and second-consumer credit |
| Handwritten CSS reader | **KEEP** only as a shaped fixture/oracle prototype; **PRUNE** as full-CSS or combinator evidence |
| CSS parity ratios and CSS CPU profile | **MOVE** to same-body harness-noise evidence |
| Equality mismatches and incomplete planes | **KEEP RED**; no normalization or waiver |
| RSR, CISF, CTPT, and P5-SRA | **SPLIT** into exact genealogy rows; RSR/CISF/CTPT are explicitly **UNIMPLEMENTED**; advance none before fresh Sol |
| Full 1,653-row CSS and 53/51 Keyframes contract | **KEEP RED** |

## Required next boundary

Fresh Sol task `019fb14d-1636-7d23-9044-105739d91144` must:

1. reproduce this source audit;
2. correct the P4 evidence ledger to JSON-only candidate timings;
3. reject CSS parity rows as two-consumer evidence;
4. record that the Luna packet did not implement the Sol dispatch;
5. prove or disprove the novelty of RSR, CISF, CTPT, and P5-SRA against every
   killed family;
6. choose exactly one genuinely distinct P5 research family;
7. bind a fatal preflight against the live `jsonParser` and an actual
   Value-owned source-direct CSS combinator vertical;
8. preserve the scannerless, ownership, equal-product, full-denominator, and
   every-plane exact-bootstrap `>=10x` laws.

No owner prototype, product edit, Value migration, clean audit, candidate
pack, release, rebind, ABI freeze, or BBNF handoff may start from the P4 Luna
packet.
