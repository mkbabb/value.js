# V·π ADDENDA-04 — fresh corrected-authority challenge B

status: `FRESH_CORRECTED_AUTHORITY_ACCEPT`

challenged sheet SHA-256:
`d17f0301d4ec19dfd6a1561cca8ba7266cf29dfe7d396d3e21d65d6aa1b13a67`

governing harden SHA-256:
`1cd096e054f8219bdb2ca83f1b76343cbe37608f37e975cf2803abd2582028b4`

model_served: inherited Codex child route; no model override was requested and
the service did not expose a more specific backend alias or effort label. This
receipt does not claim Opus.

date: 2026-07-21

## Verdict

**ACCEPT.** I challenged the unchanged `ADDENDA-04.md` bytes anew against the
corrected governing harden bytes, without credit from any previous challenge
and without consulting the independent A seat. The H-R25 erratum now makes
the authority chain internally exact: the sheet publishes the same ordered
twelve-source payload and verified `f1dac2a8…` digest, while the old
`3397ba83…` identity is retracted rather than offered as an alternate gate.

The appended harden erratum also makes the scalar-stress reproduction method
an exact D-W2-3 **implementation-receipt duty**. The sheet incorporates the
whole harden record—including D-W2-3—by precedence. Its short scalar summary
is therefore not permission to inherit the published counts from an
unspecified generator. I independently executed the exact frozen mapping and
reproduced every published count. The scalar sweep remains supporting
evidence; the content-addressed 61-source `C0…C3`/`s0…s2` bank remains R26's
normative gate.

This ACCEPT grants no semantic-code, PB, production, or W2-acceptance
authority. Root E-3 gestalt adjudication and the explicit owner decision in
§7 remain mandatory. W2 remains **REJECTED** and R19–R26 remain proposed.

## 1. Fresh authority, immutable-source, and identity challenge

The challenged files independently rehash to their declared identities:

| artifact | recomputed SHA-256 |
|---|---|
| `ADDENDA-04.md` | `d17f0301d4ec19dfd6a1561cca8ba7266cf29dfe7d396d3e21d65d6aa1b13a67` |
| `formation/w2-color-audit-harden.md` | `1cd096e054f8219bdb2ca83f1b76343cbe37608f37e975cf2803abd2582028b4` |

I independently fetched the two official CSSWG objects from immutable commit
`c7573530343759ace8e46438a1fa2c44515b5554` and recomputed their raw and Git
object identities:

| object | bytes | Git blob | SHA-256 |
|---|---:|---|---|
| `css-color-4/Overview.bs` | 430,720 | `238300b75970ab68bf6a0b9339f8e3a01c749b59` | `f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a` |
| `css-color-5/Overview.bs` | 182,733 | `26f508fc194d45cb0c228a32ba93ad118f9fc327` | `e419968b08ee2768fab0c4b667a73541e35cb8cd0b444fb2b6e2d46b1c8ddc15` |

Canonicalizing the local root manifest after removing only
`manifest_content_digest` reproduces
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.
It contains 76 unique, already path-sorted roots. The manifest remains source-
selection evidence, not a claim that PB0 occurrence closure has run.

The pinned source bytes support the sheet's semantic split: modern syntax
permits missing components and number/percentage mixing; legacy RGB requires
homogeneous channel kinds; legacy HSL requires percentage S/L and excludes
`none`; parsed RGB/alpha and the specified perceptual fields clamp at parsed-
value time; hue normalizes; `color()` coordinates remain unbounded; and
`display-p3-linear` is a real predefined space. No browser-implementation
state was substituted for the immutable grammar.

## 2. H-R25 erratum and precedence

The exact governing diagnostic payload is:

```json
["_()","-x()","--x()","foo(1 2 3)","color(not-from 1 2 3)","color(--from 1 2 3)","rgb(not-from 1 2)","rgb(from red r g b)","color(from red srgb r g b)","rgb(var(--x) 0 0)","color(srgb var(--x) 0 0)","rgb(env(--x) 0 0)"]
```

Compact `JSON.stringify` bytes independently hash to
`f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1`.
The array has twelve unique sources in direct-head-first order: four D-W2-1
head-envelope controls, three false-context token controls, two true relative-
color context rows, and three nested substitution rows.

The sheet both transposes that exact array/digest and declares the harden
H-R19–H-R26/D-W2-1–D-W2-4 record controlling on conflict. This satisfies the
erratum's allowed precedence route without changing sheet bytes. The only
remaining `3397ba83…` mention is explicitly historical and says it was
replaced; it cannot discharge a gate. R25 remains PB1-token/PB4-substitution
owned, with no raw substring guard, regex patch, or second balanced scanner
authorized in W2.

## 3. Exact D-W2-3 scalar-stress receipt duty

I independently froze and executed the corrected harden mapping:

1. unsigned state starts at `0x9e3779b9`;
2. `nextWord()` updates first with
   `(Math.imul(state,1664525)+1013904223) >>> 0`;
3. two updated words are written high-then-low into an eight-byte `DataView`,
   with omitted endian flags on both writes and the float read, hence big-
   endian;
4. exactly 3,000,000 outer iterations run; a non-finite double consumes only
   those two words, while a finite iteration consumes two more updated words;
5. finite `d` exercises `d/100` and `d*.01`; the third word forms
   `u=nextWord()/0xffffffff`; the fourth forms
   `v=(nextWord()/0xffffffff)*100`;
6. `F(x)=Number(x.toFixed(12)).toString()`,
   `H(x)=Number(F(x*100))/100`, and `G(x)=Number(F(x))*100/100`;
7. stabilization allows 20 applications and uses `Object.is`, treating
   signed zeroes as equal; and
8. an implementation receipt must record Node/V8, generator-source digest,
   command, exit status, and counts. Changed endian, consumption, engine,
   equality, or iteration rules are a new supporting run.

Independent run environment: Node `v26.0.0`, V8 `14.6.202.33-node.19`.
It reproduced exactly 1,439 skipped and 2,998,561 finite candidates:

```text
d / 100 through H: 0=1,483,070 · 1=1,515,453 · 2=38 · >2=0
d * .01 through H: 0=1,355,616 · 1=1,642,888 · 2=57 · >2=0
u in [0,1] through H: 0=22,322 · 1=2,976,239 · >1=0
v in [0,100] through G: 0=24,332 · 1=2,974,229 · >1=0
```

This reproduction does not elevate the scalar sweep into semantic authority.
It confirms that a future receipt cannot cite those counts from the sheet's
abbreviated recurrence alone: the exact incorporated D-W2-3 mapping governs.

## 4. Ordered evidence and R19–R26 semantics

Every published ordered denominator independently reproduces:

| payload | rows | unique | recomputed SHA-256 |
|---|---:|---:|---|
| R19 reject supplement | 45 | 45 | `7dd4d3d350018c5da4159cef0699493b2df4032d6654080729f98594e0f1aa26` |
| R20–R22 exact-value sources | 22 | 22 | `3b9c26919decb811f8f65a3e34d3ab79fa25f27d83cf4e9305b0c2dfd82701fd` |
| D-W2-1 + R25 diagnostics | 12 | 12 | `f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1` |
| R26 direct-space sub-bank | 24 | 24 | `2ddd02cc41f814b0874520d14f575d1895bd02f1ceb451a661b1ea0b121ec3c2` |
| R26 branch/scale supplement | 37 | 37 | `4e9708fdf70e0fb60bf064ebf645178d9424168d4730f4004d27c5a616a9c40c` |
| R26 combined universal bank | 61 | 61 | `0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d` |
| D-W2-2 hostile fixture IDs | 9 | 9 | `419b7ffb365b7cec8373ace1004a06da55c3f341a7d67abc678272af1403513d` |

The eight generated R23 compatibility sources are unique and appear in exact
mask order `100,010,001,110,101,011,111`, followed by the all-missing/alpha-
missing row. Their compact audit checksum is
`227c81c523533898683a038fd84e5fa76862c1d143f38b7648e5f4daa2dd0579`;
that checksum is corroboration, not a new normative gate. The mirror and LIVE
source named-color tables independently contain 148 equal ordered entries,
whose compact entry-array digest is
`2949c59aab6154988afb83744b954bd58146a06ada4d53831e6720ee01f64d0c`.

Row-by-row challenge:

| row | fresh finding |
|---|---|
| R19 | Exact legacy delimiter/unit-kind split is spec-correct; modern mixed channels and `none` remain legal. The 45-row bank retains pre-existing R9 rejections as widening controls. |
| R20 | Scale-then-clamp RGB/alpha is exact; `color()` coordinates remain unbounded and direct serializer validation is not widened. |
| R21 | Hue normalization and lower-only HSL saturation clamp are exact; no unauthorized upper S, lightness, or HWB clamp appears. |
| R22 | Lab/LCH and Ok lightness bounds plus lower-only polar chroma clamp are exact; missing/a/b/positive-chroma behavior remains intact. |
| R23 | D50 missingness cannot be represented losslessly by frozen `space:"xyz"`; exact Phase-A compatibility REDs and PB0→PB5 carrier ownership are honest. |
| R24 | `display-p3-linear` is spec-valid but absent from the frozen carrier; its exact RED and PB0→PB5 route are correct. |
| R25 | Corrected token-position/substitution projections and PB1→PB4 ownership are exact; no pre-PB1 scanner is authorized. |
| R26 | The complete numeric-branch bank proves bounded two-cycle stabilization, not arbitrary-float identity or a universal one-cycle claim. |

I executed the exact 61-source R26 chain through the current parser/serializer,
requiring success before every `.value` read:

```text
all intermediates successful:             61/61
first-cycle structural identity failures: 49/61
old one-cycle fixed predicate passes:      48/61
s2 === s1 and C3 deep-equals C2:           61/61
```

The direct 24-source sub-bank retains 18/24 first-identity failures and 24/24
one-cycle fixed behavior. The HSL/HWB controls carry the required second-
spelling terminal-unit change. R26 changes no formatter, precision policy,
runtime serialization path, public type, scanner, PB implementation, or
direct-input promise.

## 5. KISS, replays, owner gate, and close semantics

The prescribed implementation remains idiomatic and small: one existing head
dispatch/table, private RGB/HSL legacy leaves over `numUnit`, shared numeric
clamps, per-row idempotent transforms, one raw envelope check, one outer
serializer exception boundary, generated tests, and reused W1 wrappers. It
explicitly stops on a second scanner/tokenizer, public color-space growth,
factory changes, speculative AST hierarchy, duplicated serializer, or runtime
canonicalization.

The replay graph is complete and non-circular:

- W1 replays all accepted, rejected, transformed, and bounded-R26 W2 rows
  through scalar/value/values while retaining W1's independent authority holds;
- W4 replays the same 61 successful chains through `serializeCssValue` and
  remains close-held on independently accepted W2 and W3;
- PB1 owns decoded lexical identity and source-faithful spans;
- PB4 owns substitution/provider behavior;
- PB5 consumes accepted W2 semantics and adds lossless R23/R24 carriers only
  after PB0 and its separate owner gates; and
- W0 reopens only on shared lexeme/splitter/result/type/factory changes.

The owner request remains atomic: ratification may authorize only R19–R22 and
R26 in the W2 prototype plus the scoped existing-authority direct repairs. It
fixes R23–R25 dispositions without authorizing PB work. Even a green repair and
two fresh E-1 implementation audits can earn only
`PROVISIONAL_PHASE_A_ACCEPTED` while PB-owned REDs remain.

## 6. Mechanical baseline and preserved challenge history

The untouched prototype baseline at this challenge is GREEN:

- Vitest: 11 files, 59 passed, 4 explicitly owner-gated TODO;
- strict TypeScript: GREEN;
- declaration/source parity: 33 type + 19 runtime exports, GREEN;
- production dependency audit: zero vulnerabilities; and
- `@mkbabb/parse-that`: exact `1.0.0`.

These checks are baseline witnesses, not W2 acceptance credit.

Historical B record is preserved but earns no current credit: a prior B pass
accepted the same `d17f0301…` sheet before the governing harden file received
its final H-R25/stress-generator erratum. That prior verdict was invalidated by
the governing-byte change even though the sheet digest did not change. The
older `f629b82e…` and `790a30eb…` sheet challenges remain historical exactly as
the addendum's amendment receipts state. This document's only current verdict
is the fresh ACCEPT against harden digest `1cd096e…`.

Any later semantic, gate-byte, or governing-harden change invalidates this
verdict and requires another independent pass.
