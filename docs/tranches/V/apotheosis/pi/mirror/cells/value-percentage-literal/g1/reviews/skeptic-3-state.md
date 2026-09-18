# VALUE-PERCENTAGE-LITERAL G1 skeptic 3 — parser-state review

## Verdict

**ACCEPT.** I found no reproducible parser-state, transaction, suffix-boundary,
no-throw, descriptor, identity, reentrancy, or downstream-composition defect in
the exact frozen H3 candidate. This verdict is confined to the G1 H3 subject and
does not independently accept its semantic, architecture, benchmark, lineage,
or root claims.

Frozen subject SHA-256:
`580785f22eb20a9d6893ba9db16d29677b6bb2d6200c32f4f9c7b2f7d0628be9`.
Candidate SHA-256:
`1d1c37d20a9ef97f13466e96fbd65175d7c387aebd877ef400c81951fda23dc3`.
I ran no timing path and changed no candidate, evidence, authority, or production
file.

## Binding audit

Every direct subject binding reproduced from the current bytes:

| artifact | SHA-256 |
|---|---|
| `ROOT-DISPOSITION.md` | `2fa3b007ba9d5ed1973324c27f4a58bb45f3d09464148c5bcb1656d6c74826fe` |
| `candidates/h3/value-unit.ts` | `1d1c37d20a9ef97f13466e96fbd65175d7c387aebd877ef400c81951fda23dc3` |
| `correctness.json` | `fb632b374fac73883c6b4084e4cd956b90fd3cb014f2857ca479f3ba7c33303e` |
| `benchmark-v4.mts` | `723c3053d1076667d2a1a817f7a9e808fd184ef591dd224efbb33559ecc3450d` |
| `benchmark-v4-manifest.json` | `52f6e74b511a020847b03c3fb9ac7ee90cf1307fd21f30d1fcddd20a0a2f43db` |
| `benchmark-v4-first-attempt.json` | `67c5d229f00a15d2fab565ad14cb436a1de648973a7acc99dcceefae556f1ae4` |
| `bbnf-uplift-receipt.json` | `aad1e2377401292b2f564dee5fd97967a8ebd08bea8004397e4f23c9cae3e857` |
| `../g0/skeptic-subject.json` | `81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0` |

The five G0 review hashes also match the subject in seat order:
`c2ae4d83147e455b27da1b6d4a07d20234c3b9826bef1b013e2d848c219b6ba6`,
`db6e4ac2d6f0ae8d157a4d1ce3bc6c71af823641cba0934bebdcf60343281cb5`,
`049f2020e9ec68210d3605087bec99896689b0bba243b7138dae38588a465c16`,
`309c40110df5e91a6e894c3f9030e1603e6dc82b004c10c0aca6a522c0691805`,
and `306f275ff117fff3f5d4b383ead7b9c4938152c9edaf4a3a0b0974c2becee7a9`.
The two terminal-failure hashes resolve to the retained G0 v2 and v3 first
attempts. The correctness record's accepted numeric owner and differential
evaluator also reproduce as
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
and `49d393cdfe4c9b3fb8ee3dce5093ee7e1921fefaf69f91ebbef9832c06cb445a`.

## Independent bounded probes

The frozen numeric differential evaluator passed 1,468 sources and 2,936
zero/nonzero-offset transactions against the accepted numeric parser. The G0
public and sealed evaluators independently passed H3's percentage parser on all
five public successes, six public failures, five holdout successes, and ten
holdout failures. The mirror's strict TypeScript check exited zero.

I additionally generated all strings through length five over
`0 1 + - . e E % x`, added targeted empty, NUL, newline, Unicode, signed-zero,
exponent, repeated-dot, and suffix cases, and called H3 at every UTF-16 entry
offset. Across 66,437 sources and 390,324 transactions, an independent
imperative numeric scanner observed 9,820 percentage successes and 380,504
transactional failures with no mismatch or throw. Each H3 numeric result also
matched the accepted numeric parser. Each H3 percentage result matched both the
scanner and `acceptedNumber.skip("%")` for status and final offset.

The combined terminal remained maximal and prefix-consuming: examples including
`1.25e+2%%`, `+.5%tail`, adjacent `1%-2%.5%`, and an astral-prefix nonzero
offset stopped exactly after `%`. Missing `%`, whitespace, comments, incomplete
exponents, repeated fractions, Unicode digits, NUL, and entry-at-EOF failed at
the entry offset. Direct H3 failure retained the exact predecessor value; parent
failure after a successful H3 leaf retained an intermediate value but restored
the parent offset, the documented parse-that failed-value seam. No check treated
failed `state.value` as authoritative.

Two 50,000-digit successes, including one at nonzero offset, completed without
throwing, stopped before their suffix, and projected to `Infinity`. A
50,000-digit suffix failure restored its nonzero entry offset. These were
bounded functional probes, not measurements.

## Identity, descriptors, reentrancy, and parents

The candidate module exposes the four intended runtime bindings
`CSS_NUMBER_SOURCE`, `consumeNumber`, `percentageLiteral`, and `projectNumber`;
both parser bindings are exact parse-that `Parser` instances. Over 4,000 calls,
`percentageLiteral` retained its object identity, ID, parser closure, context,
inner-parser reference, context-argument reference, and printed form. Parser-ID
sentinels proved the calls constructed no parser. A mapped outer parse that
re-entered the same singleton with a different source preserved both results and
offsets, and the singleton parsed normally afterward. Two successive direct
calls on one mutable state consumed adjacent percentages independently.

Every success produced a fresh ordinary extensible outer object and fresh
numeric child. Their exact own-key orders are `kind,number` and
`sign,type,value`; all properties are writable, enumerable, configurable data
properties. Signed zero is preserved with `Object.is`.

Finally, bounded `skip`, `eof`, `many`, `or`, wrapped-delimiter, and repeated
direct-call probes composed correctly. Successful parents retained H3's value;
missing delimiters and trailing content restored the parent's entry offset;
`many` consumed adjacent percentages; and fallback succeeded after H3 rollback.
These observations close the parser-state challenge for the exact H3 subject.
