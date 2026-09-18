# V·π Phase-B Gate-1 root-seed research

2026-07-21 · formation artifact only · **not PB0 implementation** · **not
parser code** · status: **PROPOSED / NOT RATIFIED**

## 0. Amended result

Audit B correctly found that the first exact 21-root seed was mechanically
authentic but semantically selection-biased: forward dependencies from
Syntax/Values and family roots cannot discover independent modules that
*consume* those foundations. Root adjudication chose the wider honest scope.

The amended seed is the canonical union of the independently parsed four-band
membership of pinned CSS Snapshot 2026, the 21 owner-requested/later/
experimental family roots, and the snapshot source itself as scope evidence.

| fact | old | amended |
|---|---:|---:|
| roots | 21 | **76** |
| canonical digest | `16c5fc8c57d5f092096a8060024e3884b9474aa941aef8389ac3e0d94b7026ce` | `cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c` |
| pinned root bytes | 2,346,941 | **9,008,216** |
| snapshot stability members | 0 | **64** |
| explicit owner roots | 21 | **21** |
| snapshot/owner overlap | 10 | **10 de-duplicated** |
| additive owner extensions | 11 | **11** |

- repository: `https://github.com/w3c/csswg-drafts.git`
- commit: `c7573530343759ace8e46438a1fa2c44515b5554`
- tree: `75bf19c016ed98126381508073de6893c9f756f5`
- parent: `df2c8d991cdad3582adb549bae076d7a05104ced`

This is root selection only. Seventy-six roots are not an operation denominator,
and snapshot membership is not semantic implementation credit.

## 1. Official commit and snapshot identity

BBNF epoch-5 selection and labels remained adversarial leads only. The exact
commit was fetched from the official remote, re-hashed as a Git commit object,
and its parsed tree header was bound to every path/blob lookup.

```sh
seed_tmp_dir=$(mktemp -d /tmp/value-pi-l4-seed.XXXXXX)
git init --bare "$seed_tmp_dir/csswg.git"
git -C "$seed_tmp_dir/csswg.git" remote add origin https://github.com/w3c/csswg-drafts.git
git -C "$seed_tmp_dir/csswg.git" fetch --depth=1 origin c7573530343759ace8e46438a1fa2c44515b5554
git -C "$seed_tmp_dir/csswg.git" cat-file -t c7573530343759ace8e46438a1fa2c44515b5554
git -C "$seed_tmp_dir/csswg.git" cat-file commit c7573530343759ace8e46438a1fa2c44515b5554 \
  | git hash-object -t commit --stdin
git -C "$seed_tmp_dir/csswg.git" cat-file commit c7573530343759ace8e46438a1fa2c44515b5554 \
  | sed -n '1,3p'
git -C "$seed_tmp_dir/csswg.git" rev-parse 'c7573530343759ace8e46438a1fa2c44515b5554^{tree}'
git -C "$seed_tmp_dir/csswg.git" fsck --strict --no-dangling c7573530343759ace8e46438a1fa2c44515b5554
```

| snapshot source | blob | SHA-256 | bytes |
|---|---|---|---:|
| `css-2026/Overview.bs` | `23b25266cd0d19e10f9a1907b741fb9d8c5955a8` | `2d2a7c2704a29e90f06b769f9f514ed03a50318743e97e9e5359879a7793d6f8` | 52105 |

The pinned source says it collects the specifications forming CSS as of 2026,
classifies modules by specification stability rather than browser adoption,
and states that **there is no monolithic CSS Level 4**. The tranche shorthand
therefore means this pinned stability set plus separately marked owner
extensions, not an invented global CSS level.

## 2. Snapshot-membership algorithm

```text
resolver:      value-pi-csswg-root-seed-resolver/2.0.0
query version: snapshot-2026-stability-union-owner-roots/2
parser:        css-2026-membership-parser/1.0.0
```

The independently implemented parser:

1. slices the pinned snapshot at the exact four band markers in the manifest;
2. takes the first membership `<dl>` in each slice;
3. splits top-level `<dt>` entries and inspects only headers before `<dd>`;
4. collects only `https://www.w3.org/TR/<slug>/` header links;
5. normalizes exactly five frozen aliases;
6. resolves within the same tree as `Overview.bs`, then
   `Overview.src.html`, then `Overview.html`;
7. unions the 21 owner roots and snapshot source; then de-duplicates and sorts
   exact paths as unsigned UTF-8 bytes.

| snapshot slug | CSSWG directory |
|---|---|
| `CSS2` | `css2` |
| `css-style-attr` | `css-style-attr-1` |
| `css3-mediaqueries` | `mediaqueries-3` |
| `css-namespaces` | `css-namespaces-3` |
| `css-font-loading` | `css-font-loading-3` |

| stability band | disposition | exact members |
|---|---|---:|
| `official_definition` | INCLUDED_EXACTLY | 24 |
| `reliable_candidate_recommendation` | INCLUDED_EXACTLY | 8 |
| `fairly_stable_limited_implementation` | INCLUDED_EXACTLY | 10 |
| `rough_interoperability` | INCLUDED_EXACTLY | 22 |
| **union** | all four bands | **64** |

All exact paths are frozen in `stability_band_ledger[].exact_paths`.
The live CSS Current Work catalog is excluded as mutable. The snapshot’s
safe-to-release pre-CR section names individual features, not whole-module
stability members; exact references remain PB0 closure inputs. Eleven owner
roots outside the bands stay marked as later/experimental extensions.

Snapshot/source metadata is line-bounded. Each header key consumes only its
own physical line; a blank `Level:` value becomes the explicit string sentinel
`"none"` and cannot consume the following `Status:`, `Work Status:`, or other
key. The pinned CSS2 source exercises this rule: its `Level:` line is blank,
so `root-css2.module_level` is `"none"`, while its independently parsed status
remains `ED`. This sentinel rule was added after the first v2 challenge found
the former cross-line value `"Status: ED"`; the artifact was re-digested and
both packet challenges reset.

Seventy-two roots use Bikeshed source. The four immutable exceptions are:

| path | source form | SHA-256 | bytes | blob |
|---|---|---|---:|---|
| `css-fonts-3/Overview.html` | `html_only_in_verified_tree` | `b4f219d0592dd1b1a5973c15184206824cd357e6cc83ec79bbe46b8202d8fe9f` | 240516 | `bb3d4b3686953dafbebf7e6f0be39b77251b2f07` |
| `css-style-attr-1/Overview.src.html` | `legacy_source_html` | `5c1aef3d0f0d8cb8afbceda4d31c058eca3c91d2ff27825db394e2b6b17a9071` | 11054 | `204df005f918776e62816ee21d0dfb5ca1166622` |
| `mediaqueries-3/Overview.html` | `html_only_in_verified_tree` | `b9f7857aabd29de6de7420d20abe05c2e50a7e6806b621d2d54dbf0ea6873c54` | 61382 | `ad9c46c63dc6b57e08f2cff965a5950f575a5b99` |
| `selectors-3/Overview.src.html` | `legacy_source_html` | `5bca207b0f526c33dfcf8e6d37159199320e72436584f046b28acb98a918f539` | 107712 | `c7faf470edb1b8dcfb8294159133c093cd703bdf` |

PB0 must review carrier authority for the two HTML-only rows; their immutable
membership does not make generated rendering a general source rule.

## 3. Reverse-consumer and current-at-rule audit

Literal marker counts below are audit signals only, never carrier or denominator
counts.

| representative | band/disposition | root? | `propdef` | SHA-256 | bytes |
|---|---|---:|---:|---|---:|
| `css-grid-2/Overview.bs` | `reliable_candidate_recommendation` | yes | 10 | `32eff3d4208e584dc2ebb1ce01e5b7ff23e92f7531c4cb989e8f7339127ed5e3` | 240947 |
| `css-flexbox-1/Overview.bs` | `official_definition` | yes | 13 | `9045cf12ebac5c027cadaacab8b4e90fcc66657520eeaab140d50e51bd300ffa` | 302576 |
| `css-text-4/Overview.bs` | `EXCLUDED_AS_WHOLE_MODULE_ROOT_FEATURE_CARRIER_DEFERRED_TO_PB0_CLOSURE` | no | 33 | `bf7fd748f1e304e0fb93bb4166837824649f1e5e659e135e0765e9607d765eac` | 505763 |
| `css-box-4/Overview.bs` | `EXCLUDED_NOT_SNAPSHOT_MEMBER_OR_OWNER_EXTENSION` | no | 5 | `417e6eff31419711d1e29ea485f65011064fa950ac3f3dac92be8645be882fe0` | 26251 |
| `css-logical-1/Overview.bs` | `rough_interoperability` | yes | 22 | `9b4a85569bcacff752f797fb6214a9eb04fca7173b93a160bcf8a47e39ed2b41` | 39421 |

`css-grid-2`, `css-flexbox-1`, and `css-logical-1` now enter
through reliable, official, and rough-interoperability membership respectively.
`css-text-4` is absent from all four membership lists; snapshot line
960 names only `hyphenate-character` as a safe-release feature, so
that exact carrier may enter PB0 closure without promoting the whole module.
`css-box-4` has no membership entry, safe-release reference, or owner route.

| at-rule module | band/disposition | root? | literal `@` | SHA-256 | bytes |
|---|---|---:|---:|---|---:|
| `css-fonts-3/Overview.html` | `official_definition` | yes | 85 | `b4f219d0592dd1b1a5973c15184206824cd357e6cc83ec79bbe46b8202d8fe9f` | 240516 |
| `css-counter-styles-3/Overview.bs` | `official_definition` | yes | 203 | `296e168274385902eb77f23604c8a095ad9415e78fb089c6d1fde2891fd4c4ba` | 141901 |
| `css-namespaces-3/Overview.bs` | `official_definition` | yes | 25 | `c6db689f29d34569a8b5f2268e786be7d737708d3d734690617ac111e9fe4087` | 13208 |
| `css-conditional-3/Overview.bs` | `official_definition` | yes | 77 | `771816b6b976296126988d33f399d45379cc4ca67eb5f8d3e8e1486ddc318365` | 57123 |
| `css-page-3/Overview.bs` | `EXCLUDED_NOT_SNAPSHOT_MEMBER_BASELINE_PAGE_REMAINS_IN_CSS2` | no | 258 | `92bff1b9d38c2f929ec88f50666d447ed7c23909c93ec45c306090b826295256` | 97791 |

Fonts 3, Counter Styles 3, Namespaces 3, and Conditional 3 are immutable
roots. Page 3 is explicitly outside the snapshot/owner union, while official
CSS2 retains baseline `@page`; later Page 3 scope needs a normative
closure edge or E-3 change.

## 4. Git/HTTPS byte and manifest validation

Every root records repository, commit, exact path/module/level, source form,
blob, raw SHA-256, byte count, scope role, family routes, maturity, rationale,
and status. All 76 pinned HTTPS responses matched the corresponding Git bytes.

The successful validation used eight parallel row checks; this serial form is
the exact per-row operation:

```sh
manifest_file=docs/tranches/V/apotheosis/pi/formation/l4-root-seed-manifest.json
csswg_git=/tmp/value-pi-l4-seed.QFQHPB/csswg.git
verified_commit=c7573530343759ace8e46438a1fa2c44515b5554
node -e 'const m=require("./"+process.argv[1]); for(const r of m.roots)
  console.log([r.exact_path,r.sha256_raw_source,r.raw_source_bytes,r.git_blob_oid_sha1].join(" "))' "$manifest_file" \
| while read -r spec_file expected_digest expected_bytes expected_blob; do
    raw_url="https://raw.githubusercontent.com/w3c/csswg-drafts/$verified_commit/$spec_file"
    raw_digest=$(curl --proto "=https" --tlsv1.2 -fsSL "$raw_url" | shasum -a 256 | cut -d " " -f 1)
    raw_bytes=$(curl --proto "=https" --tlsv1.2 -fsSL "$raw_url" | wc -c | tr -d " ")
    git_digest=$(git -C "$csswg_git" show "$verified_commit:$spec_file" | shasum -a 256 | cut -d " " -f 1)
    git_bytes=$(git -C "$csswg_git" cat-file -s "$verified_commit:$spec_file")
    git_blob=$(git -C "$csswg_git" rev-parse "$verified_commit:$spec_file")
    test "$raw_digest" = "$expected_digest"
    test "$git_digest" = "$expected_digest"
    test "$raw_bytes" = "$expected_bytes"
    test "$git_bytes" = "$expected_bytes"
    test "$git_blob" = "$expected_blob"
  done
```

```text
ALL_ROOT_BYTES_OK roots=76
MANIFEST_OK digest=cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c roots=76 bytes=9008216
```

No BBNF selection, semantic label, WPT route, candidate, generated product,
or workspace byte was imported.

## 5. Candid spring RED

The wider scope does not change the spring finding. No `spring(` carrier
exists in any `*.bs` object at the verified commit:

```sh
git -C /tmp/value-pi-l4-seed.QFQHPB/csswg.git \
  grep -n -i 'spring(' c7573530343759ace8e46438a1fa2c44515b5554 -- '*.bs'
```

`css-easing-2/Overview.bs` remains an owner extension root with
`VERIFIED_OWNER_EXTENSION_ROOT_WITH_UNRESOLVED_OWNER_FEATURE`. PB0
must keep spring RED pending exact official historical/external evidence, a
truthful preserve/delegate/refuse ruling, or E-3 correction.

## 6. What this proves—and PB0 still owes

This amendment proves the official commit/tree, deterministic 64-member
snapshot parse, 21-root owner union, 76 exact source objects, reverse-consumer
coverage, explicit exclusions, family/scope ledgers, and canonical digest.

PB0 must still follow all normative grammar dependencies to a fixed point;
freeze every object; resolve HTML/source authority; extract operation-atomic
carriers; prove the occurrence bijection; review maturity and terminal
dispositions; bind fixtures, expected results, diagnostics, serialization and
oracle rails; freeze surface/types/limits/browser pins/exchange/cost; and pass
one structural plus two semantic audits. A source hash is not an AST and 76
roots are not denominator completion.

## 7. Canonical digest reproduction

The digest excludes only `manifest_content_digest`; object keys are
recursively sorted, arrays preserve declared order, and compact UTF-8 JSON is
hashed with SHA-256.

```sh
node - <<'NODE'
const fs=require('fs'),crypto=require('crypto');
const f='docs/tranches/V/apotheosis/pi/formation/l4-root-seed-manifest.json';
const m=JSON.parse(fs.readFileSync(f,'utf8'));
const c=v=>Array.isArray(v)?v.map(c):v&&typeof v==='object'
 ? Object.fromEntries(Object.keys(v).sort().map(k=>[k,c(v[k])])):v;
const p={...m};delete p.manifest_content_digest;
const d=crypto.createHash('sha256').update(Buffer.from(JSON.stringify(c(p)),'utf8')).digest('hex');
if(d!==m.manifest_content_digest)throw new Error('digest mismatch');
console.log(d);
NODE
```

Expected: `cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.

The artifact is ready for fresh seed/addendum challenges and root gestalt.
It does not ratify Gate 1, authorize PB0, or alter BBNF coordination.
