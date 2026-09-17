# VALUE-PERCENTAGE-LITERAL G0 — skeptic 5 gestalt review

## Verdict

**REJECT integration/selection from this frozen candidate set.** The feature
boundary itself is sound: an unbounded, prefix-consuming literal percentage
belongs in `value-unit`, directly above the already accepted `consumeNumber`
leaf, while keyframe bounds and whole-document policy belong to parents. The
subject does not, however, justify selecting any exact frozen candidate as the
shared percentage production. H is the economical graph but carries a `.ts`
specifier that is not an emitted-ESM production source; S carries the same
specifier debt and duplicates `%` dispatch; B is the only emitted-ESM-shaped
source, but it creates an avoidable sequence array and, more importantly, the
fixed `{ kind, number }` result has no spelling/raw extent. That omission makes
it insufficient as the sole reusable leaf for the current timeline vertical,
which distinguishes exponent spellings from numerically equivalent ordinary
percentages by inspecting `item.raw`.

This is not a request for another process round. One corrected candidate is
enough: H's `skip` topology with the repository's `.js` import convention and
an explicitly decided shared result contract (either preserve raw/extent here,
or bind a separately proved owner for it). Until that decision is made, keep
`featureCredit: 0` and do not claim percentage-to-keyframes/timeline
integration.

## Exact-byte closure

The required subject reproduced exactly:

`81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0`.

Every file directly bound by it also reproduced:

| bound artifact | recomputed SHA-256 |
| --- | --- |
| `BRIEF.md` | `842e0873ab5a3e9b3a5e64dbfda85db1ca860e8a60f1daec63dc2c7cbd68b193` |
| `candidate-set.json` | `a73cdcd6f8dcf4f8002b3cf0d76105d762dc0b47893453a15cc748bf0c06f6e1` |
| `evidence/correctness.json` | `bcda3c31143f0ed09d47ca8ff750af30c8b3a1fd1e69c8d109f03daf74e62579` |
| `benchmark.mts` | `701a0848ba7416a0dcc259bfd82f152be2e130f4f11c9a6fb57995e484761e81` |
| `evidence/benchmark-first-attempt.json` | `7b954f247eb7f7127b15f126c3681587c6efff925ca8cf009e7a7b449a0ddad3` |
| `evidence/benchmark-second-attempt.json` | `30ff0f2dacdc4fc617d8cebb1ad6235ef1a1dbe8a6e0588d7d8a9dd37d758808` |
| live peer `src/css/grammar.ts` | `40f8e379b8f3242b0f3c68efa7d52ebc3adf8d6dc7f8edc9231fa115e68d6b69` |
| rejected peer `grammar/value.ts` | `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f` |

The candidate set still binds H
`82d426f494fed3e14cac1ddf7c20ca787b1f731fe11c7e48d422a0a1b8c4a02a`,
B `2b3ffe8e18d32d62c25de28ad4ef2d0246c23ab81440fcc83bf3faf5c4d445c2`,
and S `0657c2bb60a9200c5ffc26aef3d7a1049219657757797901bc4b4a435f14b654`.
The accepted numeric owner reproduced as
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
Thus the rejection is against the frozen bytes, not mutation.

## Bounded untimed reproduction

No timing command or benchmark worker was run. The stored benchmark JSON was
read only. Its second attempt reports B/H `0.9403939692641025` with one-sided
upper ratio `0.9799928976652392`, but that small isolated-parser advantage
cannot prove downstream result fitness; the live/rejected comparisons also
construct materially different public results and grant no integration credit.

The apotheosis no-emit TypeScript check passed:

```text
./node_modules/.bin/tsc \
  -p docs/tranches/V/apotheosis/pi/mirror/tsconfig.apotheosis.json --noEmit
exit 0
```

The public evaluator passed H under Node 26's source-TypeScript execution. The
same bounded execution could not load B because its exact `.js` import resolves
to a nonexistent source-tree `numeric.js`. This is not presented as a semantic
failure—an emitter or a loader may resolve it—but it proves that the frozen
evidence needs its special loader/build context and is not itself a plain
source-tree integration witness. H and S have the inverse problem: their `.ts`
specifiers are accepted by the no-emit config but are not the repository's
emit-capable NodeNext convention.

## Gestalt findings

### Boundary and ownership are correct

The proposed module DAG (SHA-256
`291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f`)
assigns exact number, integer, percentage, unit, and dimension productions to
`value-unit`. The acknowledged BBNF `value-unit.bbnf` reproduced at repository
HEAD `af15f63e0d2d3d719938c13b906a50acbb92ea3b`, SHA-256
`cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b`.
It defines `percentage = number , percentageUnit`. All three candidates honor
that dependency direction and import the accepted number owner; none creates a
lexer, token stream, CST, scanner, cursor, or duplicated number regex.

The brief is also right to exclude `[0,100]` from this row. The DAG distinguishes
bare bounded keyframe percentages from mandatory unbounded named-range
percentages. Baking either policy into the literal would make reuse worse.

### The exact selection set forces debt

- **H:** best graph and result-allocation economy. `consumeNumber.skip("%")`
  retains the number without a sequencing tuple. Its exact `.ts` relative
  import is nevertheless a promotion edit in this repository's emitted-ESM
  graph.
- **B:** exact BBNF-like sequence and the only `.js` specifier. `all` allocates
  a two-element array only for the final `map` to discard `%`. Selecting it
  accepts permanent incidental allocation solely because the frozen H spelling
  is wrong. Stored timing does not turn that avoidable shape into an ownership
  virtue.
- **S:** strictly dominated. It checks the same marker in `lookAhead` and then
  consumes it again, forms a tuple, has the `.ts` specifier issue, and adds no
  semantic protection beyond ordinary transactional combinators.

### Result-shape economy blocks the claimed vertical

The fixed wrapper preserves all three fields of `consumeNumber`, which is useful
for numeric semantics, but it preserves neither raw spelling nor source extent.
That is enough for simple keyframe bounds (`number.value / 100`) and it does not
need to feed dimension—percentage and dimension are sibling parents sharing
`consumeNumber`. It is not enough to replace the percentage leaf in the current
timeline path without another recognizer or source-capture layer.

`timeline.ts` explicitly computes an `exponent` predicate from `item.raw` and
rejects exponent-spelled percentages/dimensions while accepting ordinary ones.
After this candidate maps `1e2%` and `100.0%`, both values have
`number.type === "number"` and `number.value === 100`; the distinction is lost.
A downstream consumer cannot reconstruct it from `{ kind, number }`. Duplicating
the numeric regex in timeline would violate the ownership goal, while retaining
the old token/CST path would mean this candidate did not establish the promised
direct vertical.

The subject's public/holdout evidence proves literal recognition, offsets,
rollback, and the exact isolated result. It contains no dimension sibling,
keyframe parent, named-range parent, timeline parent, serializer, or direct
module-root witness. Therefore it cannot support an integration claim merely
by extrapolating from 78 candidate transactions. The correct response is a
small candidate/result-contract correction, not more benchmark or review
machinery.

## Acceptance condition

Do not select H, B, or S unchanged for production integration. Admit one
emit-correct `skip` candidate and prove one bounded direct parent witness that
demonstrates how raw/extent-dependent consumers obtain their spelling without
duplicating numeric ownership. Reuse the existing correctness bank; do not
rerun timing or create another multi-seat round.
