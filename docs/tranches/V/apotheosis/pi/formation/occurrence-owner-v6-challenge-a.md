# V·π occurrence → operation/owner formation v6 — challenge A

Date: 2026-07-22

Disposition: **REJECT**

This was an independent, assume-faulty specification/source challenge. I did
not inspect any other V6 challenge. I modified none of the frozen subject,
schemas, tools, shards, production paths, or prohibited paths.

## Exact subject challenged

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v6.json` | 20,149 | `13c212e58c45f685e2a7cb5a1bd6a63c1f964a318a2701e2912edfdeb414564d` |
| manifest schema | 11,617 | `b3a7131d643b469bdce4b1538ae1946d5cec19b970de71a2026078c9262f53ba` |
| shard schema | 13,811 | `23eaa9f7f7895c4c7c47005e56f06300cf4097a4b3d8ccbbd61c332e15c6dc48` |
| formation receipt | 8,717 | `019d1e1c4f988ec5046700ad44cf82fd6e90df1ffc19984181fed21ddec8097f` |

The frozen hashes match the receipt. The nine-file tool ledger also
independently recomputes to
`3b7cfa42a8333aa907221a26433da68c753ed59310545d1da9d1b72cd0289f19`
when its complete `<sha256><two spaces><bytes><two spaces><path>\n` lines are
byte-sorted.

## Verdict

V6 is byte-reproducible and honestly RED, but it is not a complete or
semantically faithful occurrence/provenance denominator. It omits genuine
Bikeshed references from authenticated source, constructs false heading
contexts, and permits an authenticated owner-provenance string to disagree
with its stored source hash while the full verifier still accepts the bundle.
Those are load-bearing defects in the proposed evidence gate. Exact replay of
the same extractor cannot cure them.

## 1. Total-tranche / gestalt analysis

The tranche needs an occurrence denominator that can safely drive feature
boundaries, owner routing, and the later 3×5×3 cells. V6 cannot play that role:

- a missing reference can erase a normative dependency or owner signal;
- a false context can misclassify normative material as security/history or
  attach a carrier to the wrong section;
- an unbound string dictionary lets the durable bundle contradict its own
  owner-source hash while retaining a GREEN mechanical replay.

The result must therefore remain a rejected research artifact. It grants no
PB0 boundary, candidate, compatibility, conformance, owner, operation, or
production credit. The good sharded/replay architecture should be retained,
but reference and context discovery need another formation before the owner
lattice is derived.

## 2. Wave / frozen-subject analysis

### Mechanical facts that did pass

I reran the canonical `--check` command. It reproduced the exact 20,149-byte
manifest and all nine frozen shard hashes. I also generated to a fresh
arbitrary directory, compared the manifest and all nine shards byte for byte,
and removed the temporary directory through the system trash. The arbitrary
copy was identical.

An independent `/usr/bin/time -l` canonical check reported:

- 6.53 seconds real;
- 818,528,256 bytes maximum resident set size;
- 781,017,944 bytes peak memory footprint.

That is below the declared 943,718,400-byte hard limit. The receipt's
non-atomic two-rename and residual path-import TOCTOU descriptions are
truthful.

The fixture-only entry point reproduced 18 cases and digest
`37813e84133fe1458e3671028d9c245a590ca3630e0a0bf03bc900a1d92aea36`.
The full replay executed all 29 declared mutations and reproduced 29
rejections with digest
`afe267a585635d7b9823c372bbf5c6d6076da4bf5e9036850a4997b59bbb1265`.
Those claims are accurate but incomplete: neither suite covers the confirmed
failures below.

I also independently checked the authority boundary. All 21 code strings are
RED; all 52 compatibility rows have a null DAG family and
`RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG`; the split is 19 runtime + 33 type and 37
consumer symbols; reviewed operations, reviewed owners, owner edges, and all
credit fields remain zero. The authenticated source replay is 168 = 76 + 92
and 14,609,103 bytes.

### Why those passes do not accept V6

`verify.mjs` independently regenerates only `contexts`, `carriers`,
`operations`, `references`, and `owner_scope` (lines 8 and 73–83). Thus a
self-consistent discovery defect is regenerated as truth. The `codes` and
`strings` dictionaries are not independently regenerated at all; they receive
shape, sort, index, and selected-value checks. The confirmed provenance
mutation below exploits that gap without changing a semantic-table byte.

## 3. Feature analyses

### F1 — REJECT: `<code>` is incorrectly treated as opaque raw text

`discover.mjs:317–337` excludes the contents of every `code` and `samp`
element. That is not Bikeshed's processing behavior for autolink shorthands.
Authenticated CSS source deliberately places shorthands inside `<code>` and
Bikeshed expands them as links.

Concrete source proof:

- `css-borders-4/Overview.bs`, SHA-256
  `90b7a646ed61a1418d4428d20638fb63612fb7006ad011933bd8be81cd836643`,
  line 1522 contains four IDL shorthands inside one `<code>` expression.
- The `{{DOMPointReadOnly/x}}` occurrences at byte intervals
  `[58301,58323)` and `[58332,58354)` have zero frozen reference rows.
  The same omission occurs again at line 1607.
- The official rendered CSSWG draft expands those exact inner shorthands to
  linked `x` and `y` definitions in the "vector between two points" sentence:
  <https://drafts.csswg.org/css-borders-4/#contour-path>.

An independent conservative census considered only structured shorthand
tokens wholly contained by a same-line `<code>...</code>` element and outside
HTML comments. It found 130 candidate tokens across the pinned closure and V6
captured 0. Examples include definition links in `css-backgrounds-3`, the four
IDL links above, productions in `css-content-3`, and definition links in
`css-easing-1`. Some code examples may intentionally be literal, so 130 is an
assay population rather than automatic credit; the official rendered example
above is sufficient to prove a real omission.

Direct unit reproduction:

```text
scanBikeshedReferences("Use <code>{{DOMPointReadOnly/x}}</code>.\n")
⇒ []
```

The existing `raw-code-style-literals-excluded` fixture tests only literal
single quotes in a JavaScript-highlighted `pre`, `style`, and `xmp`. It does
not test Bikeshed-processed shorthands inside `<code>`, yet the implementation
generalizes the exclusion to that element.

### F2 — REJECT: every delimited shorthand is forbidden from spanning a line

`discover.mjs:343–347` rejects a delimited shorthand if its complete slice
contains either CR or LF. The authenticated corpus contains valid multiline
shorthands that Bikeshed renders as links.

Concrete source proof:

- `compositing-2/Overview.bs`, SHA-256
  `c01a614c0fcdd5d6f0239b6182337c6e78c101d5f9fbcedd33e1abcbdba9445e`,
  line 64 contains
  `[[css2/about#property-defs|CSS property\ndefinition conventions]]`.
- Its exact byte interval is `[3509,3573)` and its raw-slice SHA-256 is
  `e0739b24e65e4252bda5dafb91dbbdb216e37523deff74cf3839c371d0def9c4`.
  The frozen table has zero rows at byte 3509.
- The official rendered draft emits "CSS property definition conventions" as
  a link in section 2.2:
  <https://drafts.csswg.org/compositing-2/#values>.

Direct unit reproduction:

```text
scanBikeshedReferences(
  "See [[css2/about#property-defs|CSS property\ndefinition conventions]].\n"
)
⇒ []
```

The same pattern appears in current CSS Borders 4 bibliography links. This is
not a rare malformed-source edge; it is an authenticated omission created by
an explicit scanner rule.

### F3 — REJECT: owner-source provenance can be corrupted and still verify

The owner-scope shard stores each authenticated line as
`[line, string_index, sha256]`. Verification at `verify.mjs:278–281` checks the
string index and RED status but never checks that the interned string hashes to
the stored SHA-256 or equals the authenticated ADDENDA line. Because `strings`
is absent from `SEMANTIC_TABLES`, independent regeneration does not restore
that binding.

I performed this in-memory adversarial mutation without writing a subject
file:

1. Read the first owner input's string index, `33228`.
2. Change only its interned value from `color-L4 wave` to
   `color-L4 wave CORRUPTED`, preserving canonical string order.
3. Canonicalize the strings shard, rebind its manifest bytes/hash, and
   recompute the manifest content digest.
4. Call `verifyBundle` with authenticated evidence **and** the frozen execution
   attestation.

The verifier accepted. Exact mutation evidence:

| field | value |
|---|---|
| mutated strings bytes | 867,910 |
| mutated strings SHA-256 | `2fde5fa773ce7c358fcea289590dba8f63f038851391c1236672f2cdfe45b728` |
| rebound manifest content digest | `498a8f6ecb17334848814bb0514ac40d327ddba39d1afaf4fb6f4a06df87b378` |
| stored owner-line SHA-256 | `d96bc08a11f593fdfe4edcf11f6b2135b6b77df106d1470f0faa082e6a93ca46` |
| actual mutated-line SHA-256 | `7eb1af73c0dbf428ca785219831012fa6c4f3cd3086c17e2e20309e444a324a5` |
| verifier result | `accepted: true`, `execution_attestation: true` |

A second independent mutation replaced code-table entry 0 with
`RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED_CORRUPTED`, rebound
the shard and manifest, and was also accepted. That demonstrates the same
unbound-dictionary weakness for semantic status meanings. The owner-line
mutation alone is dispositive because it contradicts an explicit provenance
hash.

### F4 — REJECT: heading contexts are demonstrably false

The heading model mixes Bikeshed setext levels with literal HTML levels and
only recognizes an HTML opening heading when `>` appears on its first line.
The authenticated `css-contain-3/Overview.bs` uses an HTML `h2` for "Appendix
A. Changes" followed by a multiline-opening `h3` for the August 2022 changes.

Frozen carrier row 2177, lines 57–61, receives this context:

```text
Security Considerations  level=1  lines=37..129  marker=security
Appendix A. Changes      level=2  lines=42..129  marker=changes
```

The carrier is not inside Security Considerations, and the actual multiline
`h3` at lines 46–50 is absent. Thus the frozen context ID and carrier→context
edge are byte-stable representations of a false section ancestry. This also
shows why a regenerated context shard is not independent semantic evidence:
the same faulty heading model regenerates the same false edge.

### Other challenged surfaces

- The raw tag census does reproduce 311 algorithm-bearing openings, including
  293 literal `div` openings, and every frozen opening has at least one
  enclosing candidate. I found no independent reason to reject that narrow raw
  census.
- Dated and undated W3C TR/CSSWG URL examples, punctuation trimming, the 343
  typed CSS modifier count, the six bibliography modifiers, the inherited
  `display/grid-lanes` join, stable row IDs, exact frozen source slices, and the
  ten required RED operation joins replay as claimed. These are local passes,
  not a cure for the omitted-reference and false-context classes.
- The 18 fixtures do not include a Bikeshed-processed shorthand inside
  `<code>`, a valid multiline shorthand, mixed setext/HTML heading ancestry, or
  a dictionary-to-provenance hash mutation. The 29 mutations do not alter the
  codes/string dictionaries in a semantically meaningful but schema-valid
  way.

## Required repair before a fresh challenge

1. Replace the blanket `code`/`samp` exclusion with authenticated Bikeshed
   processing rules. Preserve negative fixtures for actual opaque examples,
   and add rendered-output witnesses for positive links inside code spans.
2. Parse valid multiline Bikeshed shorthands and add exact source fixtures for
   every wrapper, display, scope, target, modifier, and multiline form.
3. Use one consistent Bikeshed/HTML heading model, including multiline opening
   tags, and add exact ancestry fixtures for mixed heading syntaxes.
4. Independently regenerate `codes` and `strings`, or bind every referenced
   dictionary cell to authenticated source/semantic values. At minimum verify
   `sha256(UTF8(strings[input.string_index])) === input.sha256` for every owner
   input and exact equality with the authenticated source line.
5. Add the two accepted mutation shapes above to the adversarial suite and
   prove they reject.
6. Regenerate a new content-addressed subject, then obtain two fresh
   independent challenges and a root gestalt. V6 itself cannot be repaired in
   place or accepted by qualification.

## Terminal challenge disposition

**REJECT.** V6 remains RED-only and earns zero denominator, owner, operation,
compatibility, conformance, candidate, or production authority.
