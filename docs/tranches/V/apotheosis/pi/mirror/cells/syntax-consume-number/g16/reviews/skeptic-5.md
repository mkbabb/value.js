# G16 hostile skeptic 5 — tranche fit and integration scope

## Verdict

**ACCEPT** the exact G16 subject for synthesis. I reproduced no blocking defect
in the candidate, its declared ownership, the correctness evidence, or the
narrow performance claim. This verdict grants no integration, complete-CSS,
barrel, or production credit.

## Exact subject

- skeptic subject:
  `e97b1786ffd5a7046d64e80fd39a3e88143e38a99626780b1b9973e187f975fc`
- H2 candidate:
  `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
- feature contract:
  `a88dc7dfb1d452d8bcf103d359cd058722db7ad93ed598622f6e1cfc8d5b3a58`
- candidate interface:
  `04b4decb604542c3416cc710aa155b826b86ca491e2ce485c546f815557f2bcf`
- G15 root disposition:
  `b7d6c09fcadab54188b6b714d903b017c86046a9c1302a661bf26bb9210ef722`
- correctness replay:
  `40e8dd24170fd4dd70f6df9692380d099d317fc220e99499cf92f9b3569ff93e`
- correctness evidence:
  `4eac6a187ef7f615152f364ff52e33ecaa2890c3595313fd6f40ae3714cd13d8`
- correctness TypeScript configuration:
  `ed9b46dd1a2b36c2e01b96ac82b3c056825d3b6cd15b6fc9ae719ba9b2d2883b`
- benchmark source:
  `bd46893f1ddfa628a258f9f0c953227b1d0513f28643a75c13977f49815a74c3`
- benchmark manifest:
  `f9ef032d101a74e4493f0e529ffe26244e35f6e9b49c18998ecb4a83438ca9a1`
- benchmark corpus:
  `084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`
- benchmark evidence schema:
  `e07b83d9f5d344cde2c62c554c4f6a92d832cab452615ba61630cd34c500e880`
- benchmark correctness evidence:
  `0196d9a361bea3bc43fa370f64c7354c739e2c99e1f3e73853d71a712794c22f`
- raw first attempt:
  `372fef4094e34b1b78d9ab8e48fcf36bcda7557f2e8ba54cac637c222de11e54`
- benchmark result:
  `738ee94837e1747dd13116b76f5f7812838a3dc3dfb75c1bec5a7a77ad456bb4`
- preflight A2:
  `88ddf86db6e36667db5785af3b7be75db82264af18cb125dcb2095a1b65ea67e`
- preflight B2:
  `58055615b7bcd7e5df110f30c5d857a4caaf3e69d86c75b7af609a0842a96e58`

All sixteen directly bound artifact hashes reproduced exactly.

## Independent reproduction

I did not inspect another G16 skeptic report and did not run timing. The frozen
correctness replay completed `PASS`: all 180 holdout cases, all public cases,
and the independent 65,024-call scanner-oracle assay passed. The scanner exists
only in the test oracle; H2 contains no scanner, cursor loop, token tape, atom,
or CST.

I parsed the frozen raw evidence without executing the benchmark. It contains
one start, one binding event, one controller environment, 30 complete child
lifecycles, 360 sample blocks, 30 replicate summaries, one inference, and one
terminal event. Recomputing from the 30 recorded process aggregates gives:

- mean log ratio, H2/deposed: `-0.07336197220979548`
- sample standard deviation: `0.027244341177386378`
- one-sided 95% upper log ratio: `-0.06491032168356216`
- geometric-mean ratio: `0.9292644012517273`
- one-sided 95% upper ratio: `0.9371515017780626`

These exactly reproduce the frozen result.

## Altitude 1 — total-tranche / gestalt

This is an appropriate first foundation leaf. CSS number consumption feeds
percentages, dimensions, math, colors, timelines, keyframes, declarations, and
many property grammars, so accepting a small correct numeric production has
high downstream reuse. The declared owner,
`grammar/css/l4/value-unit/numeric`, keeps the algorithm below the value-unit
family rather than inventing a parallel lexer or token-object architecture.

The construction is idiomatic parse-that: one static `regex` terminal and one
projection `map`, both created at module initialization. Using a regex terminal
inside a parser-combinator grammar is not the rejected regex-parser
architecture. The candidate is 17 LF lines and 560 bytes; decomposing this
regular leaf into ceremonial combinators would add surface without improving
grammar clarity.

The exact subject does not prove the complete BBNF import DAG, stylesheet
reachability, the public 52-export surface, or an integrated CSS parser. It
truthfully assigns all those categories zero credit. Synthesis and later
vertical integration must separately bind the acknowledged module DAG and
prove the value-unit-to-keyframes-to-stylesheet path; their absence is not a
defect in this deliberately singular leaf.

Proceeding is parsimonious. Reopening candidate generation would re-litigate a
small regular production whose semantics, composition, failure transaction,
object shape, and performance have already been directly exercised.

## Altitude 2 — G16 evidence wave

G16 stays within the evidence-only correction authorized by the bound G15 root
disposition: H2 is byte-identical, correctness is directly replayable, and the
new benchmark uses 30 fresh child processes as its inferential units. The raw
record has the declared 30-by-12 shape and retains every sample.

The performance statement is honestly narrow. It establishes a strict win only
over the operation-equivalent deposed consume-number leaf, on the frozen 64-row
common-domain corpus, in the pinned Apple M5 Max / Node 26 / parse-that runtime.
It explicitly does not claim full-parser throughput, production-input average,
per-case dominance, or comparability with broader LIVE/C14 doors. Those broader
peer bars remain tranche-close obligations, not reasons to reject this leaf.

The benchmark normalizes both lanes to the same mutable
`{end, leaf:{sign,type,value}}` observation. H2 creates that leaf in its parser
map; the deposed lane derives the missing sign/type fields from its consumed
span. That work is necessary to compare the same operation boundary and is
included inside both clocks.

## Altitude 3 — feature

The terminal recognizes precisely the CSS consume-a-number representation:
optional sign; integer or fractional mantissa with at least one digit; and an
optional complete exponent. Its alternation gives maximal-prefix behavior for
incomplete decimals and exponents. The projection preserves explicit sign,
distinguishes integer from number by representation, and uses JavaScript's
binary64 conversion for the numeric value.

The evidence covers nonzero UTF-16 offsets, surrogate prefixes, leading zeroes,
signed zero, incomplete exponents, repeated fractions, CSS continuations,
transactional failure, parent composition, result descriptors/mutability,
parser introspection, repeated calls, and absence of per-call parser-ID growth.
I reproduced no semantic or no-throw defect.

One integration boundary must remain explicit: this is a prefix production,
not an EOF-enforcing public scalar parser. Downstream percentage, dimension,
and declaration productions must own their continuations and completion rules.
Likewise, the implementation's `CssNumber` alias is local; G16 proves the
runtime `consumeNumber` export, not a final public named-type/barrel design.
Neither limitation contradicts the subject's zero integration credit.

## Final disposition

**ACCEPT.** Send the exact H2 hash to the three independent synthesis
adjudicators. If selected, promote the unchanged parser as the internal
value-unit numeric production, then prove its downstream composition and
public typing in the runnable vertical. Do not extrapolate this benchmark to
the full CSS parser or count this verdict as integration or production
acceptance.
