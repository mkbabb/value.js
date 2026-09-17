# V·π occurrence → operation/owner formation v7 — challenge A

Date: 2026-07-22

Disposition: **REJECT**

This was an independent, assume-faulty source/denominator challenge of the
exact V7 subject. I did not read or communicate with Challenge B. I modified
none of the frozen manifest, schemas, shards, generators, formation inputs,
tests, parser sources, production paths, or coordination ledgers. This receipt
is the only file written.

## Exact challenged subject

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v7.json` | 21,945 | `259d9fce299411222a126245ce22c627b260f4260d7009ecaf94ab9fbb7c0968` |
| manifest schema | 12,150 | `5d6f288f56298b4ac0f12b2519eb32bfecf441da324d727b66b80ba743bbe656` |
| shard schema | 13,812 | `ae81a70365782c101b5cca2e41e7546b15c42d716f858c52063441dd19c11b20` |
| formation receipt | 6,864 | `5c53eb81a34c1f8d95a2aff5134403217dbf5e53bee41b7dd3b19af1556e6861` |

The subject and receipt identities match their frozen declarations. The
manifest content digest is
`125288f593c61c312efaeb732a0ea4bb7c68f5cf7974c387efb33c5f0745860d`,
and the executed-module-set digest is
`c554e2ad089435c3131e55b2ba228289da69f963a918d7a3197352431da9a13e`.

## Verdict

V7 repairs the specifically adjudicated V6 multiline, `code`/`samp`, mixed
heading, owner-line, and semantic-dictionary witnesses, and its exact replay
and zero-credit boundary are sound. It is nevertheless not a faithful source
reference or operation-occurrence denominator. I confirmed three independent
load-bearing defect classes in the authenticated 168-source corpus:

1. explicit specification links in HTML `href` attributes are categorically
   excluded from reference discovery, including a normative `must` dependency;
2. escaped shorthand and literals in class-highlighted raw examples are
   emitted as live references; and
3. HTML comments are parsed as live headings, carriers, and operation
   intervals, with false comment-derived ancestry and no comment disposition.

Exact regeneration faithfully regenerates these mistakes. The resulting
63,373-row reference census and 5,151-row operation-candidate census cannot
advance the operation-atomic denominator or its reference fixed point. V7
must remain a rejected RED research artifact with zero denominator, semantic,
operation, owner, compatibility, conformance, parser, cost, movement, or
production credit.

## 1. Total-tranche / gestalt analysis

The tranche requires a source-occurrence relation in which every real
dependency is discoverable, every lexically suppressed token is distinguishable
from a live reference, and section ancestry is derived only from active source
structure. V7 fails all three invariants:

- an omitted `href` can hide the governing external or in-closure operation;
- an escaped token or JavaScript string can fabricate a reference target and
  later owner signal; and
- a commented-out section can fabricate carriers and operation boundaries as
  if it were normative source.

RED statuses do not cure missing rows or encode why a false row is not an
occurrence. The manifest has no exclusion ledger for these lexical states and
no bijection from all source reference candidates to included or reviewed-
excluded dispositions. Therefore neither owner selection nor fixed-point
termination is falsifiable from this object.

The authority wording itself does not overclaim. `formation_only=true`,
`may_promote=false`, all credit fields are zero, all 21 semantic code strings
are `RED_` values, all 52 compatibility rows have null DAG families, and there
are zero reviewed operations, reviewed owners, or owner edges. That honesty
limits the blast radius; it does not make the census acceptable.

## 2. Wave / frozen-subject analysis

### Mechanical replay and retained narrow passes

The canonical authenticated `--check` replay reproduced the exact manifest
and all nine shard hashes. My independent run reported 7.81 seconds real,
888,946,688 bytes maximum RSS, and 851,686,336 bytes peak footprint, below the
943,718,400-byte limit. The fixture-only entry point reproduced 21 cases and
internal digest
`faebcb4a9c68ee83f98c4ab4f43af9d1e08ac23aeddc759cb036cb3125494aa8`.
The full run reproduced 30/30 declared mutation rejections and digest
`4609374d9fcccec0e4357469d7dbdf27b7ce0a8d9dc53e79fa1e245a918a85b4`.

The following narrow joins also passed independent decoding:

- 168 sources = 76 seed + 92 complement and 14,609,103 authenticated bytes;
- 19 runtime + 33 type = 52 exact primary exports;
- 37 exact primary consumer symbols, all still DAG-unjoined;
- 14 owner-scope rows, with zero discovery-carrier links and zero reviewed
  normalizations;
- zero owner-line text/hash mismatches against authenticated `ADDENDA-01.md`;
  and
- exact retention of terminal V6 rejection
  `ed35d1fc0ef93fd4e4e2bf82103aacb2ce8ac38878846763f7f55fc39d82ecf0`.

I added an in-memory compatibility mutation outside the shipped suite: primary
export row 0's source line was changed from 37 to 38, the compatibility shard
and manifest were canonically rebound, and the content digest was recomputed.
`verifyBundle` rejected it with `primary export evidence 0`. Thus the narrow
52/37 identity/evidence join is mechanically meaningful, but it grants no
compatibility or feature credit.

### Novel fixture docket

These direct imports of the frozen `discover.mjs` were not added to the shipped
suite and wrote no files:

| case | input/result | disposition |
|---|---|---|
| escaped bibliography | `Use \[[PromiseIsHandled]] and [[CSS-SYNTAX-3]].` emitted both bracket pairs as `bibliographic` | false live reference |
| explicit specification link | `<a href="https://drafts.csswg.org/css-values-4/#combine-integers">rounded</a>` emitted `[]` | false exclusion |
| class-highlighted raw code | authenticated `pre.example.lang-javascript` strings are emitted as `css_shorthand_single` | false live reference |
| comment/raw heading | an ATX `# Security Considerations` inside `pre.lang-css` became the sole ancestor of a later algorithm | false ancestry |
| unclosed raw elements | shorthand-looking strings after unclosed `script`/`style` openings were emitted as live references | lexical-state failure |

The last fixture is a hostile recovery case rather than an authenticated-corpus
claim. The first four reproduce the same scanner architecture as the exact
corpus blockers below.

## 3. Feature analyses

### F1 — REJECT: explicit specification links are absent from the reference table

`discover.mjs:329-354` classifies every HTML opening tag as an excluded
interval. Reference discovery then scans only tag-external text and recognizes
bare CSSWG/W3C URLs; it never extracts `a[href]`. A conservative census of
absolute `drafts.csswg.org` and `www.w3.org/TR` URLs inside authenticated
`<a href>` openings found 3,482 occurrences across 155 sources. Exactly zero
has a reference row at its URL byte interval.

That population contains history and informative links, so the count itself
is an assay rather than automatic normative credit. One exact witness is
dispositive:

- authenticated `css-color-5/Overview.bs`, 182,733 bytes, SHA-256
  `e419968b08ee2768fab0c4b667a73541e35cb8cd0b444fb2b6e2d46b1c8ddc15`;
- line 3815 says `Values must be` followed by an `href` to
  `https://drafts.csswg.org/css-values-4/#combine-integers` and then
  `rounded towards +∞`;
- the URL begins at byte 147,967; and
- the frozen reference shard has no row at that interval or source line.

This is a real normative dependency from a serialization rule to the rounding
operation. Its omission disproves reference completeness and fixed-point
readiness even if every current row remains RED.

**Required repair:** tokenize active HTML openings, emit exact-byte `href`
reference occurrences with link target, anchor, source context, and unresolved
normativity, and give every tag-resident candidate an included or explicit
reviewed-exclusion disposition. Add the CSS Color 5 witness and a full
authenticated `href` census to replay and mutation coverage.

### F2 — REJECT: escape and raw-example semantics are not modeled

The scanner does not test whether a shorthand opener is escaped. I found 96
frozen references whose opening byte is immediately preceded by `\` across
seven authenticated sources: 95 are labeled `bibliographic` and one is a
single-quoted CSS shorthand. These are not bibliography occurrences; they
include ECMAScript internal-slot notation deliberately escaped from Bikeshed
shorthand processing.

Exact witness:

- authenticated `web-animations-1/Overview.bs`, 283,862 bytes, SHA-256
  `4dbbf8caec4e2ebce609a753158e2f9cfc1d4c631090e3724b0796a201372f98`;
- line 2017 contains `\[[PromiseIsHandled]]`;
- V7 emits `refv7-4556fad275d39ad1aba5b00d` at `[79687,79707)` as a
  `bibliographic` reference in `BIKESHED_TEXT`.

Class-based raw examples are also missed. `referenceIntervals()` recognizes
only a `pre` element's `highlight=` attribute when deciding opacity; it does
not recognize Bikeshed's `lang-css`, `lang-html`, `lang-javascript`, or IDL
classes. An exact interval census found 51 frozen references in such raw
blocks across 16 sources. The clearest witness is authenticated
`css-animations-2/Overview.bs`, SHA-256
`061d6a60297c7d4b811f599b79902ee4ce0ec41daed4657dbbd4391aec826ca4`:
lines 1030–1035 are `pre.example.lang-javascript`, yet JavaScript string
`'running'` is emitted twice as CSS shorthand rows
`refv7-14233143ff419d99763eeda2` and
`refv7-f0529a10db73f50e2db8173c`.

The claimed zero `excluded_raw_literal_leaks` is not a general invariant.
`tables.mjs:230-245` checks only four hard-coded `(source_path, raw)` keys, so
all 51 different leaks survive with a reported zero.

**Required repair:** use one Bikeshed-aware lexical-state pass for escapes,
comments, `script`/`style`/`xmp`, explicitly highlighted `pre` variants, and
processed `code`/`samp`. Bind the reported exclusion count to the complete
classified candidate population rather than four selected strings. Add exact
negative fixtures for escaped internal slots and class-highlighted JavaScript
and CSS literals while retaining the genuine CSS Borders 4 positive code-link
witnesses.

### F3 — REJECT: comments become live heading ancestry and operation rows

`parseHeadings()`, `parseContainers()`, `algorithmOpeningTuples()`, and the
definition-list operation scan do not share the comment exclusion used by the
reference scanner. HTML headings and definitions inside `<!-- ... -->` are
therefore interpreted as active source structure.

An exact source-interval census found 99 retained carrier rows and 14 unique
operation intervals wholly inside authenticated HTML comments. The operation
rows have only the generic unreviewed-operation/completeness flags; there is no
comment status in the 21-code vocabulary.

Concrete witness:

- authenticated `css-display-3/Overview.bs`, 115,372 bytes, SHA-256
  `883aa6a221a91e5ee34cab17d8df974891a08921a410901e9328e6ff982671a5`;
- one comment opens at line 1241 and closes at line 1310;
- its commented `<h2 id="box-suppress">` is emitted as a live level-2
  `HTML_HEADING` covering lines 1243–1323; and
- commented `dt`/`dd` bodies become operation intervals
  `opv7i-2b5fa72c661994ee146e4dc3`,
  `opv7i-1486364ec2a25f3d0b334d5d`, and
  `opv7i-bced2fca496d0d5e35390855`.

The false heading also becomes the context ancestor of those intervals and
four retained carriers. The parser's successful CSS Containment mixed-heading
witness therefore proves only one path; it does not establish source-ordered
heading semantics in the presence of comments or raw blocks.

**Required repair:** drive headings, containers, carriers, algorithms,
definition-list boundaries, and references from a single source-ordered
lexical model. Commented markup must not become live structure. Preserve it as
an exact reviewed-exclusion candidate if the denominator requires proof of
terminal exclusion. Add the CSS Display 3 comment interval as an authenticated
negative witness and require zero live heading/carrier/operation rows wholly
inside comment intervals.

### F4 — PASS NARROWLY: V6 provenance, dictionaries, owner lines, and 52/37 identity

The terminal V6 rejection chain is pinned and authenticated. Unlike V6,
`codes` and `strings` are in the independent semantic regeneration set; all
code cells reproduce the exact closed RED vocabulary. Every owner input's
interned text equals the authenticated ADDENDA source line, and every stored
hash equals SHA-256 of that exact UTF-8 text. The LF/CRLF multiline reference
witnesses, two CSS Borders 4 code-link witnesses, and the challenged CSS
Containment mixed-heading witness reproduce as claimed.

The 168/52/37 byte and identity joins likewise pass. However, every one of the
14 owner-scope rows has an empty discovery-carrier list, reviewed normalization
is null, all compatibility DAG families are null, and owner edges remain zero.
This is correctly described as scope input and compatibility obligation, not
owner selection. It contributes no owner, compatibility, feature, or cost
credit.

### F5 — REJECT: no denominator or fixed-point advancement

The accepted 168-source closure remains a useful authenticated input, and the
V1 carrier identities remain a reusable rejected discovery assay. V7 adds
reproducible RED tables and fixes several V6 witnesses. It does not create a
reference fixed point or an operation-atomic denominator because real
references are absent, false references are present, inactive commented text
is treated as live structure, and no inclusion/exclusion bijection proves
termination.

After repairing F1–F3, a fresh subject must rederive every affected reference,
context, carrier, operation, string, count, shard identity, and manifest
digest. It must then receive two fresh independent challenges and root gestalt.
No feature, conformance, compatibility, parser, owner-graph, cost-lattice,
movement, or production authority follows from this V7 subject.

## Challenge receipt

| field | value |
|---|---|
| method | independent frozen-byte replay, shard decoding, exact source-byte census, novel fixtures, and canonically rebound in-memory mutation |
| verdict | `REJECT` |
| confirmed blockers | omitted `href` specification references; escaped/raw-example false references; live comment-derived headings/carriers/operations |
| candidate/parser mutation | none |
| generator/schema/manifest mutation | none |
| active grammar TypeScript sources | zero |
| feature/conformance/production credit | zero |
