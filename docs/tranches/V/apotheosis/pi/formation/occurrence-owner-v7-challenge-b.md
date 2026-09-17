# V·π occurrence → operation/owner formation v7 — challenge B

Date: 2026-07-22

Verdict: **REJECT**

This was an independent review. I did not read the first V7 challenge. I did
not alter the frozen subject, schemas, shards, or generator modules. The exact
objects reviewed were:

| object | bytes | SHA-256 |
|---|---:|---|
| V7 manifest | 21,945 | `259d9fce299411222a126245ce22c627b260f4260d7009ecaf94ab9fbb7c0968` |
| V7 formation receipt | 6,864 | `5c53eb81a34c1f8d95a2aff5134403217dbf5e53bee41b7dd3b19af1556e6861` |

The bundle is byte-reproducible, canonical, schema-valid, under its memory
ceiling, and truthfully zero-credit. It nevertheless contains false
authenticated context provenance. That is a blocking denominator defect.

## Blocking defect: quote-blind tag removal corrupts frozen heading ancestry

`shared.mjs:23-24` implements `plainText()` with
`/<[^>]*>/g`. The expression stops at the first `>` even when that byte is
inside a quoted HTML attribute. `discover.mjs:41-46` uses `plainText()` to
derive every HTML heading title. Valid Bikeshed headings containing nested
definition markup such as `dfn-for="<blend-mode>"` therefore retain the tail
of the attribute as visible heading text.

This bug is present in the frozen subject, not merely in a synthetic edge
case. The authenticated source at `compositing-1/Overview.bs:1197` is:

```html
<h4 id="blendingnormal"><dfn dfn-type="value" dfn-for="<blend-mode>">normal</dfn> blend mode</h4>
```

Its visible heading title is `normal blend mode`. Frozen carrier
`occ-75539d07212a728ff81a09e5` points to `contexts.rows[2926]`, whose level-4
title is instead `">normal blend mode`. The row otherwise claims the exact
source line and section interval 1,197–1,208. Independent decoding of the
complete context/carrier relation found:

- 32 context rows with a heading title beginning `">`;
- 32 authenticated carrier rows attached to those contexts;
- 16 affected carriers in `compositing-1/Overview.bs` and 16 in
  `compositing-2/Overview.bs`;
- examples including `">multiply blend mode`, `">screen blend mode`,
  `">hue blend mode`, and `">luminosity blend mode`.

This contradicts the receipt's source-ordered heading-context claim and makes
the semantic `contexts` and `carriers` shards wrong. Regenerating those shards
with the same parser only reproduces the same error; it is not independent
evidence of correctness. RED status prevents promotion credit, but it does not
make false source provenance acceptable in a frozen denominator.

## Additional benign parser assays

I exercised the exported `discoverFixture()` entry point with new in-memory
inputs. The UTF-8/CRLF and multiline-code cases were positive: a 144-byte CRLF
fixture with a non-ASCII prefix replayed both multiline references at exact
byte intervals 46–89 and 94–111, and a multiline `<code>` opening classified
both structured links as `BIKESHED_CODE`.

Three uncovered negative cases confirm that the built-in 21-case suite is too
narrow:

1. Raw-text opacity fails for same-tag-looking text. The 19-byte fixture
   (SHA-256
   `87ddf95bafcd626937df69804f1fc20e9d7d532865dcc96ed22b5e441d394166`)
   was:

   ```html
   <xmp><<xmp>></xmp>
   ```

   Expected: zero references because `xmp` is opaque. Actual: one production
   reference, `<<xmp>>`, classified as `BIKESHED_TEXT`. At
   `discover.mjs:329-350`, the generic tag stack treats the tag-looking bytes
   inside raw text as a nested `xmp` opening and closes only that nested entry.
   This directly falsifies the receipt's general statement that `xmp` remains
   opaque.

2. Comment and highlighted-example text is inventoried as live algorithm
   markup. The fixtures `<!-- <div algorithm>Not an element.</div> -->` and
   `<pre highlight=css><div algorithm>Example only.</div></pre>` each produced
   one algorithm opening. `algorithmOpeningTuples()` at
   `discover.mjs:127-135` scans all tag-shaped text without applying comment or
   raw-block exclusions.

3. Heading discovery scans raw examples as document structure. A valid
   highlighted `<pre>` containing the two lines `Security` and `--------`,
   followed by a real algorithm, caused the algorithm context to inherit a
   false level-3 `Security` section. `parseHeadings()` at
   `discover.mjs:54-67` has no comment/raw/code exclusion model.

The first blocking defect already changes this exact bundle. These additional
assays show why a repair must use shared lexical exclusions rather than a
single witness-specific patch.

## Evidence that did pass

- All manifest-pinned predecessor/formation identities, the launcher and all
  eight executed-module identities, both schema identities, and all nine shard
  identities matched their declared byte counts and SHA-256 values.
- Both schemas compiled and the full repository `--check` replay passed. The
  replay regenerated manifest SHA-256
  `259d9fce299411222a126245ce22c627b260f4260d7009ecaf94ab9fbb7c0968`
  and rejected all 30 mutations.
- A fresh arbitrary-path generation produced a manifest and nine shards
  byte-identical to the repository bundle. Maximum RSS was 892,829,696 bytes,
  below the 943,718,400-byte ceiling. Repository-check maximum RSS was
  853,475,328 bytes.
- The manifest content digest independently recomputed to
  `125288f593c61c312efaeb732a0ea4bb7c68f5cf7974c387efb33c5f0745860d`.
  The manifest and every shard were exactly `JSON.stringify(value) + LF`,
  with no CRLF bytes.
- The authenticated source replay covered 168 exact sources totaling
  14,609,103 bytes; all 168 source files use LF and none use CRLF. The CRLF
  behavior is therefore fixture evidence rather than corpus evidence.
- The two `css-borders-4/Overview.bs` code-context witnesses replayed the
  exact 22 source bytes `{{DOMPointReadOnly/x}}` at byte offsets 58,301 and
  58,332. The six multiline bibliography and 22 multiline definition counts
  regenerated.
- `credits` remains zero for semantic, owner, operation, and compatibility;
  owner edges are empty; reviewed operation/owner counts are zero; all code
  dictionary entries remain RED; and the status remains provisional.

## Required repair and re-freeze

1. Replace regex tag removal and heading-opening/body splitting with one
   quote-aware lexical scanner (or a parser with equivalent exact-byte
   behavior). A `>` inside single- or double-quoted attributes must not end a
   tag. Recompute all heading titles, context IDs, dependent carrier context
   foreign keys, and shards.
2. Build comments, `script`, `style`, `xmp`, and explicitly highlighted raw
   examples as whole exclusion spans before scanning headings, algorithm
   openings, definitions, or references. Raw-text elements must close at the
   first applicable end tag rather than nest on tag-looking content.
3. Reject any discovered reference or opening whose interval starts in or
   overlaps an excluded span. Apply the same exclusion model to
   `parseHeadings()`, `algorithmOpeningTuples()`, `balancedTagEnd()`, and
   definition metadata.
4. Add the exact authenticated `dfn-for="<blend-mode>"` witnesses and all
   benign fixtures above to the counterfixture suite. Assert visible titles,
   absence of false references/openings/ancestry, exact UTF-8 LF/CRLF byte
   intervals, and raw-byte replay.
5. Regenerate the complete bundle, rerun schemas, independent semantic
   relations, mutations, repository check, arbitrary-output comparison, and
   memory measurement, then issue new manifest and receipt identities for two
   fresh challenges.

Until that repair and a new adjudication close, all V7 credits correctly
remain zero and this subject must not advance.
