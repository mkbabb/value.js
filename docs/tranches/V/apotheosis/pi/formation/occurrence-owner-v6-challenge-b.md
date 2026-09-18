# V·π occurrence → operation/owner formation v6 — independent quality challenge B

Date: 2026-07-22

Verdict: **REJECT**

Review boundary: ordinary local parser/data quality review of the exact frozen
V6 RED-only bundle. I did not read another V6 challenge, mutate a frozen input,
or touch production. Temporary replay output was written outside the repository
and removed after inspection.

## Exact subject

I independently rehashed the requested subject before reviewing it:

| object | bytes | SHA-256 |
|---|---:|---|
| manifest | 20,149 | `13c212e58c45f685e2a7cb5a1bd6a63c1f964a318a2701e2912edfdeb414564d` |
| manifest schema | 11,617 | `b3a7131d643b469bdce4b1538ae1946d5cec19b970de71a2026078c9262f53ba` |
| shard schema | 13,811 | `23eaa9f7f7895c4c7c47005e56f06300cf4097a4b3d8ccbbd61c332e15c6dc48` |
| provisional receipt | 8,717 | `019d1e1c4f988ec5046700ad44cf82fd6e90df1ffc19984181fed21ddec8097f` |

The rejection is against those exact bytes. It does not diminish the earlier
V1–V5 rejections and grants no owner, operation, conformance, compatibility,
movement, or production credit.

## 1. Total-tranche / gestalt analysis

V6 is substantially better as an integrity envelope. It reproduces exactly,
keeps all authority RED, authenticates the declared inputs, regenerates the
five semantic tables, and truthfully describes both the two-rename publication
boundary and the residual path-import TOCTOU. Those repairs are real.

It is nevertheless not yet a trustworthy occurrence denominator. The reference
scanner categorically refuses any delimited Bikeshed reference containing a CR
or LF. The pinned 168-source closure contains valid multiline references of the
very families V6 claims to inventory. I found **six valid multiline
bibliographic references** and **22 valid multiline definition references**;
none of the 28 is present in `references.json`. Thus the regenerated shard is a
faithful reproduction of an incomplete discovery algorithm, not a faithful
occurrence table.

That defect is load-bearing for the greater tranche. PB0 cannot derive complete
operation/owner waves, costs, or conformance routing from a reference graph that
silently omits real source occurrences. The correct downstream action is to
retain all V6 credit at zero, reject this freeze, repair the occurrence grammar,
and form a fresh content-addressed subject. Candidate parser work must not
inherit completeness credit from V6.

## 2. Formation/bundle analysis

### Green evidence retained

The following checks passed independently and should be retained in the next
formation:

- The repository `--check` replay completed successfully in 6.64 seconds and
  reproduced the exact manifest and nine shards.
- A fresh arbitrary-output replay likewise reproduced all ten files byte for
  byte. Its manifest hash was the frozen subject hash.
- The two measured maximum-RSS values were 818,823,168 bytes for repository
  check and 823,984,128 bytes for arbitrary-path generation, both below the
  declared 943,718,400-byte limit. The respective reported peak footprints were
  782,132,704 and 780,248,352 bytes.
- All nine shard bytes are canonical `JSON.stringify(object) + LF`; every
  manifest shard identity matched. Independently recomputing the manifest
  content digest produced
  `af26c705c0d35ef6cd8eff35bd475e70e70e7df58a0d0f0dc886898c28a92235`.
- Both exact schemas compile and the normal replay validates the bundle. The
  manifest and shard schemas are closed at their object and tuple boundaries.
- The normal evidence-backed verifier rejected two additional benign,
  cryptographically rebound in-memory mutations: (1) changing a reference's
  parsed-name string index while keeping the raw occurrence and ID unchanged,
  and (2) changing an operation interval to another valid context index. The
  failures were respectively `references independently regenerated
  authenticated semantic/provenance replay` and `operations independently
  regenerated authenticated semantic/provenance replay`.
- The advertised 29-case suite still reports 29 rejections. The stable-ID,
  source-slice, count, alias, foreign-key, compatibility, and zero-credit checks
  are mechanically active on the normal evidence-backed path.
- The bundle says `DURABLE_FSYNCED_TWO_RENAME` and `bundle_atomicity: false`;
  the implementation does perform two sibling renames with fsyncs. It also
  truthfully says `PRE_AND_POST_IMPORT_DISK_IDENTITY_WITH_RESIDUAL_PATH_IMPORT_TOCTOU`.
- Every decoded status code begins with `RED_`; reviewed operations, reviewed
  owners, owner edges, semantic credit, owner credit, operation credit, and
  compatibility credit remain zero. I found no concealed promotion.

The in-process RSS guard is sampled at verification stages rather than being a
continuous operating-system limit. That wording should remain modest, but the
independent `/usr/bin/time -l` measurements above do establish that both review
runs stayed under the numerical ceiling.

### Confirmed blocking defect: valid multiline Bikeshed references are absent

`discover.mjs` implements every bracketed shorthand through `delimited()`. That
helper returns `null` whenever the candidate contains `\r` or `\n`:

```js
const end = text.indexOf(closing, start + opening.length);
if (end < 0 || /[\r\n]/.test(text.slice(start, end + closing.length))) return null;
```

This is not merely a hostile fixture that the implementation chooses not to
support. It rejects syntax already used in the authenticated corpus.

Concrete bibliography example:

```text
compositing-2/Overview.bs:64-65
[[css2/about#property-defs|CSS property
definition conventions]]
```

The shard has ordinary references at lines 60, 66, and 67 of that source but no
row for the line-64/65 bibliography reference. A direct fixture replay returns
an empty reference array:

```js
discoverFixture(
  "Use [[css2/about#property-defs|CSS property\ndefinition conventions]].\n"
).references // []
```

The other five valid multiline bibliography occurrences are the repeated
`[[css-backgrounds-3#shadow-layers|“Layering, Layout, and\n Other Details”]]`
references in `css-borders-4/Overview.bs` at lines 2784, 2842, 2875, 2910, and
2951. None is represented.

Concrete definition example:

```text
css-easing-1/Overview.bs:359-360
[=input progress
value=]
```

It also yields no row when passed to `discoverFixture()`. An independent scan
of only the 168 authenticated source paths found 22 such multiline `[=...=]`
occurrences and zero exact raw matches in the frozen reference shard. They
include occurrences in `css-easing-1`, `css-forms-1`, `css-viewport-1`,
`mediaqueries-5`, `web-animations-1`, and `web-animations-2`.

The independent census deliberately excluded a CSS grammar construct in
`css-cascade-6` that begins with `[[` but is not a bibliography shorthand. A
repair therefore needs a real Bikeshed delimiter rule, not simply deletion of
the newline guard followed by an unqualified `indexOf("]]")`.

The existing exact counterfixtures cover single-line links and raw-context
exclusion but contain no positive multiline bibliography or definition case.
The 29 mutation cases prove that stale rows cannot replace the generator's own
output; they cannot reveal a source occurrence the generator and verifier both
fail to discover. This is the precise common-mode gap the source sampling was
intended to test.

## 3. Feature/row analysis

### References and target joins — REJECT

The 63,201-row count is internally consistent but incomplete by at least the 28
confirmed valid occurrences above. Missing references have no stable
`refv6-*` ID, no exact byte interval, no parsed target/display cells, and no
carrier-target relation. Referential correctness for rows that exist does not
repair absent rows.

The repair must:

1. recognize valid multiline Bikeshed bibliography and definition shorthands
   while retaining their exact raw byte intervals;
2. normalize semantic whitespace only in parsed target/display cells, not in
   the source-preserving raw cell;
3. continue excluding comments, tags, and raw/code/style contexts;
4. distinguish actual bibliography `[[...]]` from CSS grammar double brackets;
5. add positive multiline fixtures and full-corpus assertions for the 6 and 22
   authenticated occurrences;
6. regenerate references, strings, counts, identities, schemas/manifest, and
   mutation receipts under a new exact subject.

### Contexts, carriers, operations, owner scope, and compatibility — mechanically GREEN, no credit

I found no independent mechanical defect in the frozen context, carrier,
operation, owner-scope, or compatibility relations. Source hashes and replayed
slices match; context/carrier/operation/reference IDs and the tested foreign
keys are actively checked; required operation joins remain ten RED joins; the
52/37 compatibility surface remains explicitly DAG-unjoined. These are useful
mechanical results, not acceptance, because the formation is adjudicated as a
single denominator and its reference family is incomplete.

## Reproducible commands

Canonical check and memory measurement:

```sh
/usr/bin/time -l node \
  docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/launch.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --keyframes-root /Users/mkbabb/Programming/keyframes-v-exec \
  --output docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v6.json \
  --check
```

Minimal direct failure:

```sh
node --input-type=module <<'JS'
import { discoverFixture } from './docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/discover.mjs';
for (const text of [
  'Use [[css2/about#property-defs|CSS property\ndefinition conventions]].\n',
  'Use [=input progress\nvalue=].\n',
]) console.log(discoverFixture(text).references);
JS
```

Both arrays are empty on the exact frozen tool set.

## Final disposition

**REJECT.** Keep the V6 bundle and this review as RED evidence. Preserve its
integrity, replay, mutation, disclosure, and memory improvements, but do not
promote the occurrence denominator. Form V7 (or a later fresh subject) only
after repairing and exhaustively testing multiline Bikeshed reference
discovery; then obtain two new independent challenges and a new root gestalt.
