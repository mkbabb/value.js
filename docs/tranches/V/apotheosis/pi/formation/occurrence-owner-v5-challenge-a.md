# V·π occurrence → operation/owner formation v5 — challenge A

Date: 2026-07-22

Model receipt: `gpt-5.6-sol`, reasoning `ultra`, independent adversarial pass.

## Verdict

**REJECT.** The exact V5 subject is mechanically reproducible and truthfully
RED-only, and its current authenticated algorithm-opening census is complete.
It is not an exact occurrence/provenance denominator. The reference pass has
source-authenticated false negatives, false positives, and incorrect semantic
fields/target joins. Separately, `verifyBundle()` accepts forged context,
carrier-context, and carrier-ID provenance after all public identities and the
manifest digest are rebound. These are load-bearing failures of the object this
formation asks the owner to ratify.

The challenged subject was verified before review:

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v5.json` | 18,048 | `9f64d59ac8effffdfe476805b5d2086bba8281f55609e3f575b714f7fdf51b10` |
| manifest schema | 10,510 | `e406bf06bcb06535a1e015b209d1c9c85c14485c3dd7f88be5cbec936c1a6a8e` |
| shard schema | 13,590 | `9e688ecd62e939679898ffb2201c4fb64443d74cb7e5f212670e705c7da0a5b2` |
| formation receipt | 7,540 | `a0000722fd3b774329c13fe6fddea3268e608770360e3ba74868bbcd5371b143` |

No other V5 review was inspected. No subject, tool, schema, production path, or
input was modified.

## 1. Total-tranche / gestalt analysis

V5 is a meaningful repair over V4: it binds the rejected genealogy, preserves
zero credit, repairs the owner-line source provenance, inventories non-`div`
algorithm elements, and makes operations/references/owner rows replayable from
authenticated inputs. Those improvements do not close the denominator.

The remaining defect is architectural rather than a missing edge case. The
reference table models Bikeshed with a character delimiter scan plus a single
slash split. Bikeshed shorthand semantics are contextual: wrappers select link
families, `!!type` narrows types, bibliography modifiers alter the target, and
`dfn-for`/`data-dfn-for`/`for` can be inherited from ancestors. A denominator
that strips those distinctions cannot later derive trustworthy production or
operation owners. It would seed PB0 with both missing occurrences and invented
target relations.

This failure is amplified by the verifier boundary. Generation/check catches
stale repository bytes because it regenerates the bundle, but the exported
semantic verifier does not authenticate contexts or carrier identities and
context joins. Consequently, the receipt's broad
"cross-shard and authenticated semantic/provenance relations: PASS" claim is
too broad. A ratified denominator must make independently verified provenance
an invariant, not merely a side effect of running this exact generator.

The optimal downstream action remains **no promotion and no feature-owner
credit**. Repair the Bikeshed semantic model and the verifier closure in a new
frozen subject, then rerun two fresh challenges and root gestalt. Do not route
any parser feature or candidate from V5.

## 2. Formation / wave analysis

### 2.1 Gates that passed

The published replay command completed GREEN against the exact roots and
returned the frozen manifest hash, nine shard identities, and counts:

```text
168 sources = 76 seed + 92 complement
14,609,103 authenticated source bytes
5,153 operation candidate rows / 5,151 unique intervals / 2 alias groups
311 algorithm openings / 10 required RED joins
63,459 reference rows
14 owner-source rows
52 compatibility rows / 37 consumer symbols
20/20 declared mutations rejected
```

The manifest and all shards are canonical and byte-identical on replay. The
16-node DAG is acyclic and root-reachable. The manifest's authority is
formation-only, all semantic/owner/operation/compatibility credits are zero,
all owner edges are empty, and all 52 primary symbols remain explicitly
`RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG`. No false conformance or production claim
was found.

The 14 owner-source rows correctly replay the unique consecutive directives in
`ADDENDA-01.md` lines 25–38. For example, line 25 without its newline hashes to
`d96bc08a11f593fdfe4edcf11f6b2135b6b77df106d1470f0faa082e6a93ca46`,
exactly as stored. Calc/math is line 28, at-rule recovery line 34, unit algebra
only line 37, and substitution line 38. The rows remain RED with empty carrier
joins, as required.

### 2.2 Gate failures

The formation fails reference occurrence completeness, parsed semantic
fidelity, target fidelity, schema sufficiency, and provenance mutation
resistance. The current 11 counterfixtures and 20 mutations do not cover any
of the source-authenticated failures below.

## 3. Feature analysis — algorithm-bearing elements

### 3.1 Current source census: PASS

I independently walked all 168 authenticated sources with a quote-aware HTML
opening parser that skips comments, parses boolean/valued attributes, and
matches exact class tokens. Its `(source path, byte offset, raw opening)` set is
identical to V5's set:

```text
recorded:    311
independent: 311
missing:       0
extra:         0
```

The independent tag census is also identical: 293 `div`, nine `h3`, seven
`ol`, one `h2`, and one `dfn`. Every stored opening has at least one enclosing
candidate, and no opening is enclosed only by a candidate carrying
`RED_STRUCTURAL_BLOCK_UNCLOSED`. Thus the **current pinned source opening
census**, narrowly stated, passes.

### 3.2 Advertised form closure: FAIL

`algorithmMarker()` recognizes a valued `data-algorithm` attribute but not a
boolean one:

```text
algorithmMarker("<div data-algorithm>")         => false
algorithmMarker("<div data-algorithm=convert>") => true
algorithmMarker("<div algorithm>")              => true
algorithmMarker("<ol class=algorithm>")         => true
```

There is no boolean `data-algorithm` opening in the current 168-source snapshot,
so this does not change the 311 census. It does refute the general
"any ... `data-algorithm` attribute" extraction boundary and is a missing
counterfixture. Either support the boolean form or narrow and justify the
contract to the Bikeshed form actually permitted.

## 4. Feature analysis — Bikeshed reference occurrence and semantics

### 4.1 Valid type-modified property/descriptor links are absent: FAIL

The official Bikeshed shorthand model permits a `!!type` suffix to disambiguate
a shorthand link. The authenticated source closure contains **343**
single-quoted property/descriptor/value/etc. occurrences matching that form;
V5 emits **zero** `css_shorthand_single` rows containing `!!` because its
single-quote recognizer accepts only `[A-Za-z0-9_@()-]` and one optional scope.

Source-authenticated examples include:

```text
css-fonts-4/Overview.bs:17   'font-language-override!!property'
css-fonts-4/Overview.bs:18   'font-language-override!!descriptor'
css-fonts-4/Overview.bs:120  'font-family!!property'
css-fonts-4/Overview.bs:2728 'src!!descriptor'
```

This is not a target ambiguity; the occurrence rows do not exist. The 63,459
reference count is therefore not a complete shorthand occurrence count.

The same semantic dimension is absent from the 16-cell reference schema. V5
does inventory some double-quoted and IDL raws with modifiers, including
`''font-kerning/auto!!value''` and `{{KeyframeEffect!!interface}}`, but folds
the modifier into `name`/`canonical`. There is no `link_type` or modifier cell,
so exact target resolution by definition type is impossible.

### 4.2 Inherited definition scopes are ignored: FAIL

Official Bikeshed permits `dfn-for` on a definition container. V5's
`definitionIndex()` reads only `data-dfn-for` on the literal `<dfn>` opening;
it ignores `dfn-for`, `for`, and ancestor-provided definition scopes.

An exact local counterexample is authenticated in `css-grid-3/Overview.bs`:

```text
352: <dl dfn-for="display" dfn-type=value>
353:     <dt><dfn>grid-lanes</dfn>
...
1419: * Defined a new inner display type, ''display/grid-lanes'', ...
```

V5 has the `grid-lanes` carrier at line 353 and parses the line-1419 reference
as `scope="display", name="grid-lanes"`, yet records **zero target carriers**.
That is a definite missed local join caused by lost inherited scope, not an
external-definition policy.

### 4.3 Bibliography modifiers are folded into the spec name: FAIL

Bikeshed bibliography shorthand accepts modifiers such as `inline`, `current`,
and `snapshot`. V5 splits only display text and `#fragment`. Authenticated rows
therefore become:

```text
css-overflow-4/Overview.bs:1934
raw       = [[css-multicol-1 inline]]
name      = css-multicol-1 inline
canonical = css-multicol-1 inline

css-text-4/Overview.bs:6839
raw       = [[L2-22-080R inline|a proposal]]
name      = L2-22-080R inline
link_text = a proposal
```

The target shortnames are `css-multicol-1` and `L2-22-080R`; `inline` is a
display modifier. Folding it into `name` corrupts the occurrence's semantic
identity.

### 4.4 Lexical-context false positives: FAIL

The scanner excludes HTML opening/closing tag bytes and comments, but it does
not model raw/code/style contexts before calling every narrow single-quoted
token a CSS shorthand. Authenticated examples emitted as
`css_shorthand_single` include ordinary program/style literals:

```text
web-animations-1/Overview.bs:2347
  alert(animation.playState); // Displays 'finished'

css-highlight-api-1/Overview.bs:291 (inside an xmp/script example)
  CSS.highlights.set('bar', h);

fill-stroke-3/Overview.bs:2273 (embedded stylesheet)
  local('MathJax_AMS-Regular')

web-animations-1/Overview.bs:6108 (JavaScript keyframe example)
  { color: 'green', left: '-20px' }
```

V5 emits rows for `'finished'`, `'bar'`, `'MathJax_AMS-Regular'`, and
`'-20px'` respectively. These are source occurrences of quoted strings, not
Bikeshed property/descriptor shorthand links. A RED status does not repair an
incorrect `type_s` classification.

Conversely, blanket exclusion of every `<pre>` body would also be wrong:
production blocks intentionally contain Bikeshed grammar shorthands. The fix
must preserve Bikeshed processing context and markup-shorthand settings, not
add another global regex exclusion.

### 4.5 URL and inline-CSS semantic cells are not exact: FAIL

The URL scan consumes prose/data punctuation. Forty-four stored spec URLs end
in `.`, `;`, `,`, or `]`. Examples:

```text
css-overflow-4/Overview.bs:33
raw    = https://drafts.csswg.org/selectors-3/#subject;
anchor = subject;

css-fonts-3/Overview.html:208
raw  = https://www.w3.org/TR/.
name = .
```

The semicolon/period are not part of those targets.

V5 also treats every first slash in a CSS "maybe" shorthand as a namespace
split. At minimum the schema cannot distinguish a scoped target from inline
CSS such as `''atan(-1 / 1)''`, `''--ar: (16 / 9);''`, and `''0 / 0''`; it stores
the left expression as `scope` and the right expression as `name`. Whether a
particular unresolved maybe-link is rendered as code or linked is Bikeshed
context/type behavior that the current table does not retain. The seven
authenticated `''/''` rows become empty scope plus empty name. These rows cannot
serve as exact semantic join inputs.

## 5. Feature analysis — verifier and stable provenance

The direct verifier reassembles operations, references, and owner-scope from
authenticated evidence. It does **not** reassemble/authenticate the contexts or
carriers tables. Three in-memory mutations were independently applied to the
frozen bundle; for each, the changed shard bytes/hash/count and manifest content
digest were honestly rebound, the exact schemas/evidence/execution attestation
were supplied, and `verifyBundle()` returned successfully:

1. Context row 0's first section title changed from string `"API"` (index
   7,791) to the empty string (index 0): **ACCEPTED_BY_VERIFY_BUNDLE**.
2. Carrier row 0's `context_i` changed from 6,075 to 6,076:
   **ACCEPTED_BY_VERIFY_BUNDLE**.
3. Carrier row 0's stable ID changed from
   `occ-0003db78dea93a8750400002` to
   `occ-0003db78dea93a8750400000`:
   **ACCEPTED_BY_VERIFY_BUNDLE**.

All three preserve schema shape and counts while falsifying authenticated
semantic/provenance relations. The canonical `--check` generation path would
reject changed repository bytes by byte comparison, but that is not equivalent
to an independent verifier proving the relation. The mutation suite's 20/20
result therefore establishes only its selected cases.

Stable source rows and raw carrier slices themselves replay correctly. The
failure is that IDs, contexts, and carrier→context joins are not derived and
checked from those authenticated bytes.

## 6. Required repair before a new challenge

1. Replace the reference delimiter/first-slash heuristic with a Bikeshed-
   faithful occurrence parser over text-processing contexts. Preserve wrapper
   family, explicit/implicit `for`, `!!type`, display text, bibliography
   modifiers/status/display, fragment, and whether a CSS maybe-shorthand is an
   unresolved inline fragment.
2. Build definition targets with effective inherited definition attributes:
   `data-dfn-for`, `dfn-for`, `for`, type, alternate link texts, and ancestor
   defaults. Add the exact `display/grid-lanes` local join counterfixture.
3. Add source-authenticated fixtures for the 343 type-modified single-quoted
   occurrences, bibliography `inline`, raw JavaScript/style false positives,
   punctuation-terminated URLs, slash-bearing maybe fragments, and boolean
   `data-algorithm`.
4. Extend the reference schema so link type/modifiers and processing context
   cannot be silently folded into `name` or discarded.
5. Recompute and compare contexts and carriers inside verification, including
   stable IDs and every carrier→context relation. Add the three accepted
   mutations above to the rejection suite.
6. Retain the exact 311 current algorithm-opening census, 168-source closure,
   owner-line provenance, 52/37 RED inputs, and zero-credit authority boundary.
7. Freeze a new content-addressed subject and obtain two fresh independent
   challenges plus root gestalt. V5 cannot be patched into acceptance.

## Terminal disposition

**REJECTED at all promotion-bearing altitudes.** Narrow mechanical replay,
current algorithm-opening census, source closure, owner-line provenance, and
zero-credit honesty pass. Occurrence completeness, reference semantics, target
joins, schema sufficiency, and independently verified stable provenance fail.
No denominator, owner, operation, compatibility, conformance, candidate, or
production credit follows from this review.
