# V·π occurrence → operation/owner formation v8 — challenge A

Date: 2026-07-22

Verdict: **REJECT**

This is an independent hostile challenge of the exact V8 formation. The
bundle is byte-authentic and reproducible, and several named V7 regressions
are mechanically repaired, but the frozen denominator is not occurrence
complete, not one-disposition-per-occurrence, and not governed by one shared
lexical model. Source-exact fenced-code false positives and an active relative
CSSWG href false exclusion are sufficient independently to reject it.

## Exact subject and review receipt

| object | bytes | SHA-256 |
|---|---:|---|
| `docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8.json` | 24,485 | `1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af` |
| `docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v8-formation-2026-07-22.md` | 9,772 | `d2cc0ff450c01898715501345f22669fac55f4b774aa1428f9e8cdb8fa86e768` |

- Seat: independent challenge A.
- Served model: Codex, GPT-5; no model override was requested or used.
- Workflow: one direct reviewer, no subagents or delegated analysis. I read the
  frozen V8 manifest, its formation receipt, schemas, ten V8 modules, ten
  shards, governing `PI.md`, `ADDENDA-07.md`, and `MODULE-DAG.md`. I did not
  read any peer challenge, peer review, or root-gestalt file. Prior-review
  filenames encountered as manifest or generator identity metadata were not
  opened.
- Oracle use: exact local shards and tools; the 168 source files fetched
  read-only from the official `w3c/csswg-drafts` repository at pinned commit
  `c7573530343759ace8e46438a1fa2c44515b5554`; and the primary Bikeshed
  documentation for Bikeshed-flavored Markdown and fenced code blocks.
- Runtime: Node `v26.0.0`, executable
  `/opt/homebrew/Cellar/node/26.0.0/bin/node`, 68,384 bytes,
  SHA-256 `08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164`.
- Close time: `2026-07-22T13:39:49Z` (`2026-07-22T09:39:49-0400`).

## Authenticated replay and positive controls

The following controls passed. They establish exact reproduction, not semantic
acceptance.

| assay | result |
|---|---|
| exact subject and receipt `shasum -a 256` / `wc -c` | PASS at the bytes and hashes above |
| launcher, nine imported modules, two schemas, ten shards | PASS, 22 authenticated objects totaling 41,393,155 bytes |
| `node --max-old-space-size=650 .../launch.mjs --fixture-only` | PASS, 29 cases; embedded suite digest `89bef854a071f9566924a9dc62da511d78c12de1e5589bf7adc3b448c668d870` |
| authenticated repository `--check` against an ephemeral reconstruction of all pinned sources and `/Users/mkbabb/Programming/keyframes-v-exec` | PASS; manifest 24,485 bytes at `1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af`; ten shards; 33/33 mutations rejected; temporary source tree removed |
| independent source and interval replay | PASS: 168 source identities, 64,530 reference UTF-8 interval/line replays, 160,605 lexical slice hashes, 16,457 carrier slice hashes, and 5,004 operation interval slice hashes |

The full `--check` reproduced the published counts exactly: 168 sources,
34,603 strings, 7,042 contexts, 16,457 carriers, 5,006 operation candidate
rows over 5,004 intervals, 311 algorithm openings, 64,530 references, and
160,605 lexical rows split 142,485 included / 18,120 reviewed-excluded.

## Blocking findings

### 1. The exact source closure emits references from fenced code

Bikeshed-flavored Markdown recognizes CommonMark fenced code blocks. Their
contents are code text, not active Bikeshed inline shorthand. V8 has no fenced
code state: `lexical.mjs:1-3,125-180` recognizes only HTML comments, fixed raw
elements, highlighted `pre`, and `code`/`samp`. A source scan found 198 fence
delimiter lines in the exact closure. The frozen `references.json` emits **16**
single-quoted JavaScript/CSS literals strictly inside matched fences as active
`BIKESHED_TEXT` references.

Concrete frozen rows include:

| reference | exact source witness | frozen disposition |
|---|---|---|
| `refv8-a1ecfa3ee06809246b1bcd97` | `scroll-animations-1/Overview.bs:932`, bytes `[33366,33373)`, raw `'block'` | INCLUDED / `ACTIVE_LEXICAL_STATE`; targets `occ-5be68170f5c60b49dc262441` and `occ-f83aa6d5e148f5951aa29867` |
| `refv8-09f7e9a7353b2a07ec9b90f6` | same source line 938, bytes `[33450,33456)`, raw `'both'` | INCLUDED as `BIKESHED_TEXT` |
| `refv8-3d4444717a467bc35ba67e4a` | `css-view-transitions-1/Overview.bs:456`, bytes `[15250,15257)`, raw `'click'` | INCLUDED as `BIKESHED_TEXT` |
| `refv8-b2354ed81fbd3ba9eca993f0` | same source line 491, bytes `[16249,16258)`, raw `'ease-in'` | INCLUDED as `BIKESHED_TEXT` |

The pinned source identities were independently authenticated:

- `scroll-animations-1/Overview.bs`: 65,357 bytes,
  `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1`.
- `css-view-transitions-1/Overview.bs`: 95,404 bytes,
  `238a506264f3f37c9657416aa8bbbd095eddc26062d8304951c70a0363c857d3`.

An independent counterfixture makes the structural consequence explicit:

````text
# Parse
```js
const axis = 'block';
[=fake concept=]
<div algorithm>False.</div>
```
<div algorithm>Real.</div>
````

`discoverFixture()` emits both `'block'` and `[=fake concept=]`, reports both
`<div algorithm>` openings, and forms an operation for the false fenced tag.
The bundled 29 cases contain HTML raw blocks but no fenced-code state case.
This is both an exact-corpus false-positive defect and a hostile structural
counterexample.

### 2. An active relative CSSWG href is reviewed-excluded

The receipt says active parsed hrefs targeting CSSWG drafts are eligible. The
exact source `css-conditional-values-1/Overview.bs` is 10,211 bytes at
`9745e12b64deb19e9f6a57786fd17d3afc6b1803658358d97510876ec68ca1a0`.
At line 227 it contains:

```html
<a href="../css-variables/#variables-in-shorthands">behavior</a>
```

The href bytes `[9132,9173)` resolve from the CSSWG draft to the CSS Variables
draft. V8 instead writes
`lexv8-bfd2506415e64e6e3a3393c0` with state `HTML_HREF`, disposition
`REVIEWED_EXCLUDED`, and reason
`REVIEWED_EXCLUDED_NON_SPECIFICATION_HREF`. `discover.mjs:431` tests only an
absolute raw prefix and never resolves the href against its source URL. This
is a source-exact active-reference false exclusion.

### 3. Thousands of href occurrences receive contradictory dispositions

Grouping lexical rows by `(source, candidate_kind, start_offset,
end_offset_exclusive)` finds **3,427** reference intervals with mixed
dispositions, represented by 6,854 rows. The global raw URL pass scans bytes
inside `ACTIVE_HTML_TAG` and excludes them as
`REVIEWED_EXCLUDED_TAG_NON_HREF_TEXT`; the later parsed-href pass includes the
same bytes as `HTML_HREF`. `discover.mjs:392-426` and `428-433` are two
candidate paths over one occurrence.

The receipt's featured CSS Color 5 witness itself demonstrates the conflict.
At `css-color-5/Overview.bs` bytes `[147967,148022)`, the same URL has:

- `lexv8-0f31d460373e0a7fcf12971a`: `ACTIVE_HTML_TAG`,
  `REVIEWED_EXCLUDED_TAG_NON_HREF_TEXT`, no candidate ID; and
- `lexv8-ce36a912845c3e1d09abc440`: `HTML_HREF`,
  `ACTIVE_HREF_SPECIFICATION_REFERENCE`, INCLUDED as
  `refv8-130e93f4e4c3275ab69111ad`.

There are 3,428 included `HTML_HREF` specification rows; all but one have this
exact conflicting duplicate. Stable IDs do not turn duplicate contradictory
classifications into a bijection. The claimed 160,605-candidate denominator is
therefore inflated and not optimal.

### 4. Opaque-state scanning can swallow a later active reference

The reference scanner searches for a closing delimiter before consulting
lexical state, then advances `cursor` to the found close. This counterfixture:

```html
<script>[=</script>
Use [=active concept=].
```

produces zero references. V8 combines the opener in `RAW_SCRIPT` with the
later active `=]`, records one excluded span over bytes `[8,42)`, and skips the
real active opener. A state-aware scanner must skip opaque content first and
must not pair delimiters across state boundaries. V8's state table exists, but
it does not govern candidate formation.

### 5. Carriers and definition ownership do not use one parsed-token model

V8 does not re-extract carriers. `discover.mjs:590` passes all 17,079 carrier
rows from the terminally rejected V1 artifact into `carrierRecords()`, which
only post-filters a carrier if one opaque range wholly contains it. It retains
16,457 V1 carriers and excludes 622: 354 raw-style, 188 raw-xmp, 69 comment,
and 11 highlighted-pre rows. A new classifier over an old closed candidate set
cannot discover an occurrence V1 never emitted. Thus no V8 shared carrier
extractor exists, and completeness is inherited rather than established.

Definition scope/type metadata also bypasses parsed attributes.
`definitionMetadata()` calls the regex helper imported from
`shared.mjs:71-75` on `token.raw` (`discover.mjs:445-470`). In this valid tag,
the parsed `dfn-for` is `right`, while unrelated quoted prose contains a
lookalike:

```html
<div data-note='dfn-for="wrong"' dfn-for="right"><dfn>term</dfn></div>
Use [=right/term=] and [=wrong/term=].
```

The V8 code joins `[=wrong/term=]` to the fixture carrier and leaves
`[=right/term=]` unresolved. Parsed `attributeToken()` would yield `right`.
This directly disproves the receipt's single parsed-attribute model.

### 6. Line-only heading ownership collapses same-line structure

HTML tag tokens retain character positions, but headings, containers,
contexts, and operation slices are reduced to physical line ordinals. For:

```html
<h2 id="one">One</h2><div algorithm>A</div><h2 id="two">Two</h2><div algorithm>B</div>
```

V8 gives heading `One` `start_line=1` and `section_end=0`, gives both algorithm
openings the same one-line operation candidate, deduplicates the two
operations, and assigns that shared candidate only to heading `Two`. Exact
source order and heading ownership are lost. A line-granular context model
cannot be the denominator for all valid parsed HTML source arrangements.

## Exact V7 regression assessment

The named V7 witnesses do pass their narrow frozen assertions:

| witness | independent shard result |
|---|---:|
| CSS Color 5 included href reference | 1, but also the conflicting exclusion described above |
| emitted escaped `[[PromiseIsHandled]]` | 0 |
| reviewed escaped-Promise exclusion | 1 |
| emitted raw JavaScript `'running'` | 0 |
| reviewed raw-`running` exclusions | 2 |
| CSS Display comment operation leaks | 0 |
| corrupt blend contexts | 0 |
| `normal blend mode` carrier witnesses | 2 |
| CSS Borders 4 processed-code positives | 2 |

These are real local repairs. They do not close the same state families: fenced
code is unmodeled, an opaque opener can consume active syntax, the highlighted
href is classified both ways, and relative CSSWG hrefs remain false-excluded.
Passing exact regression points is not lexical-state completeness.

## UTF-8 and byte mapping assessment

The byte layer itself passed hostile replay. All 168 fetched source identities
matched their pinned byte lengths, SHA-256 values, and source table entries.
Every emitted reference replayed from its UTF-8 byte interval and its line
number; all carrier, operation, and lexical slice hashes replayed. The concrete
defects above therefore are not stale files or character/byte drift. They are
semantic state, candidate-partition, and ownership defects at valid exact byte
positions.

## Three-altitude ruling

| altitude | ruling |
|---|---|
| total-tranche | **REJECT**. The required bijection from every occurrence to one row or explicit exclusion is false: active occurrences are omitted, inactive literals are emitted, and thousands of href intervals have two opposing dispositions. The denominator cannot freeze. |
| wave | **BLOCKED PRE-WAVE**. No historical or reset wave earns acceptance from this artifact, and no broad fan-out or pilot close may rely on V8. |
| feature | **BLOCKED**. No feature row, source corpus, owner assignment, operation boundary, candidate set, or prototype receives credit. The exact affected examples include CSS Variables shorthand behavior, scroll-animation axes/fill literals, view-transition JavaScript literals, definition scope, and heading/operation ownership. |

## Required repair before a new challenge

A successor must be a new frozen subject, not an in-place reinterpretation of
V8. At minimum it must:

1. classify fenced code and the applicable Bikeshed datablock/custom opaque
   states before any reference, heading, carrier, or operation scan;
2. constrain delimiter pairing to active compatible states so an opaque opener
   cannot consume a later active occurrence;
3. resolve parsed hrefs against the source draft base and emit one canonical
   candidate/disposition per href interval;
4. re-extract the full carrier universe under the current model rather than
   post-filtering rejected V1 rows;
5. consume parsed attribute tokens for definition scope/type/alternate names;
6. retain character/byte positions through heading, container, and operation
   ownership instead of collapsing same-line structure; and
7. add each counterexample above to both fixtures and mutations, then regenerate
   and independently challenge the entire source denominator.

## Zero-credit preservation and final verdict

All V8 and predecessor credit remains exactly zero: denominator, semantic,
owner, operation, compatibility, conformance, parser, feature, cost lattice,
movement, integration, and production. `owner_edges` remains empty;
`costed_owner_formation` remains false. No V7 rejection is reopened or
credited.

**Final verdict: REJECT the exact 24,485-byte V8 subject at
`1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af`.**
