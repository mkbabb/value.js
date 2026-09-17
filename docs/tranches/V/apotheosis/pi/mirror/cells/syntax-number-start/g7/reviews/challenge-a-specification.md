# SYNTAX-NUMBER-START G7 challenge A — specification and gestalt

## Verdict

**ACCEPT** the exact pre-code boundary sealed by the subject manifest.

The accepted claim is deliberately narrow: CSS Syntax §4.3.10 is an independently
specified, non-consuming boolean operation, and an internal zero-width
`numberStart: Parser<boolean>` is an appropriate direct parse-that representation
of that operation. It is optimal enough to prototype as a shared `value-unit`
semantic leaf. It is not a lexer, token tape, atom, CST, scanner, or public API.
Folding it into each consuming number/dimension/percentage production would
duplicate a normative predicate, couple recognition to conversion, and erase the
stable precondition used both by consume-number and numeric dispatch. The ledger's
earlier merged number-representation formation already records precisely that
ownership error.

This ACCEPT grants no candidate correctness, idiom, scanner-safety, O(1), KISS,
architecture, or performance credit. Each of the five exact-source skeptics must
independently review every one of those axes for every H/B/S/D/R candidate. The
mechanical verifier is a necessary floor only.

## Subject and challenge receipt

- Feature: `SYNTAX-NUMBER-START`
- Generation: `7`
- Subject: `docs/tranches/V/apotheosis/pi/mirror/cells/syntax-number-start/g7/manifest.json`
- Exact bytes: `6668`
- Exact SHA-256: `0927a5e276f3d3902b6b9a0d5b353d06ffc6131d51a2f5370be03fa9da64b37c`
- Verdict date: `2026-07-22` (`America/New_York`)
- Model: `GPT-5 Codex` (the session exposes the model family, not a more specific
  deployment build identifier)
- Reasoning configuration: inherited session reasoning; the exact internal effort
  label is not exposed to this agent
- Reasoning posture: fresh independent specification/gestalt challenge, starting
  from the assumption that the boundary was wrong
- Agent workflow: no delegation or subagents; exact-byte hashing and byte counts;
  direct inspection of the G7 public precursor, receipt, contracts, harnesses,
  protocol, verifier, public G3/G4 fixtures, pinned dependency declarations/runtime,
  G6 rejection docket, and content-addressed project closure; independent arithmetic;
  pinned-authority recovery; static verifier audit; and a live exported trust-anchor
  helper assay
- Exclusions honored: no sibling challenge or root-gestalt body was opened (their
  bytes were used only for the mandated closure hash/length reproduction); no G7
  private/ciphertext locator, hidden plaintext, secret, prior hidden receipt,
  governed candidate source, candidate directory, or hidden case was sought or read
- Mutation: this review is the only file created; no parser, production, manifest,
  public fixture, receipt, protocol, verifier, or public byte was changed

## Exact identity closure

The three governing public files reproduce as follows:

| role | bytes | SHA-256 |
|---|---:|---|
| owner-sealed `manifest.json` | 6668 | `0927a5e276f3d3902b6b9a0d5b353d06ffc6131d51a2f5370be03fa9da64b37c` |
| `feature-public.json` | 15611 | `b3cf8f8f0dc4d84399dd853ca93070ac5f412ff1fa99d316f856ec82f3f90a46` |
| `holdout-receipt.json` | 11856 | `fc5fda34c0912fcbf7b1cd45797871b3734fbed6cfad5a4732adee854354682f` |

The manifest, public precursor, and holdout receipt contain the same 22 closure
rows in the same order. Every live row independently reproduced both length and
digest. Serializing the rows as `<sha256><two spaces><path><LF>` produces exactly
`2013` bytes and SHA-256
`b42ef703d423c5a469646578dcf4b83052f4121061bdf028a7129a4acb06f6a7`,
matching the receipt.

| # | governed path | bytes | SHA-256 |
|---:|---|---:|---|
| 1 | `contract.ts` | 190 | `9e8a24d12444f7631bf5fa66e1c7011a20e32f1bc0d80ac488df758b9f96db3e` |
| 2 | `harness.ts` | 188 | `c595d3ad5ddba2996bf55c7e166e5f6f08342fffa668e20687087d0f09e56932` |
| 3 | `benchmark-protocol.json` | 1054 | `b3939805eb229ce6b010386db04a833a2ed22a4ab61bcb245703a911410a6e90` |
| 4 | `promotion-protocol.json` | 7286 | `64e37760ea312f69759800abc6a9d593bcdaa583b2cbb4d7268bdc91beb9dab8` |
| 5 | `promotion-verifier.mjs` | 31585 | `7e22b43b386ff4a38d24f6f6f978a13ca0310b9ea06fac1140eb3737821badf5` |
| 6 | `../g6/contract.ts` | 175 | `e8e1f82bd0eafafc3795fa4cddbd04dd22d5653e4364b5b6e6f3468017b3d51e` |
| 7 | `../g6/harness.ts` | 187 | `8de9fbd556b3f4cc95e3d99fd32615401c4ebb7fdc26500231d1a37d2ad7cb4d` |
| 8 | `../g6/benchmark-protocol.json` | 7220 | `a3cfc5356d535c4a8a100bb7301cf58b7775479db04d5d0b69249b58bf72a4ed` |
| 9 | `../g6/feature-public.json` | 19707 | `8a5559937ce73bd0db576fb36a35427a182c0cf682cae42c50781552e6a8c667` |
| 10 | `../g6/manifest.json` | 7663 | `fc3c059accc160841c391bb20bee0364e2defb3b69a8661ae00cfc9fa0e1f064` |
| 11 | `../g6/reviews/challenge-a-specification.md` | 12889 | `89b112ab2621b4a21c281af706c826ff218875833c61430b432fa4312dbcb29c` |
| 12 | `../g6/reviews/challenge-b-architecture.md` | 8468 | `0809fb83866d14fddf22eb795a1ec136d11485d42e8a3f48116292428eb5ff2c` |
| 13 | `../g6/root-gestalt.md` | 3160 | `3866bc53927393dab1372598db5ca6510bd98c8aec7d3a11a15fcf4962ceb6da` |
| 14 | `../g6/rejection.json` | 1861 | `ce4ad499fcb180b79826036c6798528ad8490367924982c409d7f7d40d790612` |
| 15 | `../g6/typescript-package.ledger` | 12054 | `3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47` |
| 16 | `../g3/parse-that-dist.ledger` | 5586 | `998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b` |
| 17 | `../../../apotheosis/clean-base.json` | 1177 | `dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2` |
| 18 | `../../../package.json` | 755 | `b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af` |
| 19 | `../../../package-lock.json` | 69400 | `489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7` |
| 20 | `../../../../MODULE-DAG.md` | 4880 | `291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f` |
| 21 | `../../../../FEATURE-LEDGER.md` | 13998 | `16a95950a51432b31615d0c9b714b2024b811b360f4d0e7546caa1ea1ad766b3` |
| 22 | `../../../../ADDENDA-07.md` | 20954 | `78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5` |

The remaining receipt identities also agree internally: pinned authority bytes
`144427`, SHA-256
`3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`;
hidden plaintext bytes `148269`, SHA-256
`c4b818a063dbc163a693cd7abebeb2d62850b331d419d15f80c92c6a7e2aa449`;
ciphertext bytes `148301`, SHA-256
`9c5b1b2af3b95ea9eaaf27fd7bbf3efb0ed98e8f82b6a1cbdfa3abf9a3102614`;
and formation-nonce SHA-256
`4ff519daa38abbf8769cdfcd536a64d7b77a9b126ce88e7f38f6202e66f79d62`.
These are receipt reproductions, not claims that confidential bytes were read.

## Altitude 1 — is the standalone parser the right boundary?

Yes, with an important qualification: `numberStart` is a semantic predicate
parser, not a consuming numeric production.

The normative algorithm has its own input language, result (`boolean`), and
non-consumption rule. The project ledger identifies two downstream uses:
consume-number's precondition and numeric dispatch. A single internal parser
therefore removes duplication while retaining a direct grammar composition
surface. `Parser<boolean>` preserves both outcomes. A failure-only lookahead
would force callers to reconstruct `false` through parser-error control and
would make diagnostic rollback harder; a whole-number parser would conflate
§4.3.10 with §4.3.13. In parse-that, parsers are state-transforming semantic
productions as well as recognizers, and always-successful semantic leaves are a
normal compositional shape. A consumer can deliberately branch on the boolean,
while `.next(numberStart)` replaces an arbitrary predecessor without consuming.

The boundary does not materialize a lexical layer. It returns no token, span,
atom, CST, or source slice; has no public export; admits only the parse-that core;
and owns no number conversion or numeric run. `value-unit` is the correct owner
because the corrected module DAG assigns exact number, integer, percentage, unit,
and dimension productions there. This is a small operation module beneath a
production-family namespace, which ADDENDA-07 expressly allows.

This is a boundary decision, not an implementation endorsement. A candidate may
still implement the right API in a non-idiomatic, scanner-like, source-derived,
allocating, or contrived way. The five skeptics retain that decision over exact
source.

## Altitude 2 — exact specification and observable contract

The pinned W3C source is CSS Syntax Module Level 3 revision
`c7573530343759ace8e46438a1fa2c44515b5554` ([exact raw source](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-syntax-3/Overview.bs)). Recovery of the exact raw URL
reproduced both the declared `144427` bytes and declared SHA-256. Section 4.3.10
requires inspecting the current and next two code points without consuming:

1. `+` or `-`: true for second-position ASCII digit, or for `.` followed by an
   ASCII digit; false otherwise.
2. `.`: true only when the second code point is an ASCII digit.
3. ASCII digit: true.
4. Anything else, including EOF and non-ASCII numeral lookalikes: false.

Those clauses are exactly the six positive arms `digit`, `+digit`, `-digit`,
`.digit`, `+.digit`, and `-.digit`. The operation examines no fourth position
and no exponent/whole-number suffix.

Section 3.3 maps CR, FF, and CRLF to one LF, and maps NUL and surrogate code
points to U+FFFD. The G7 contract correctly separates CSS positions from source
storage: the parser receives a source-native UTF-16 offset that corresponds to a
retained preprocessed position or EOF. It must never be called at the eliminated
LF code unit inside raw CRLF.

JavaScript's UTF-16 storage does not alter the predicate. Every positive decision
character is single-code-unit ASCII. If an inspected CSS code point is astral,
unpaired-surrogate-derived, mapped control, or a non-ASCII numeral, that arm is
already false; no candidate needs to split or classify the scalar to discover a
positive case. Astral and lone-surrogate *prefixes* still matter to offsets, and
the public matrix uses their native lengths. Raw/preprocessed pairs establish
truth equivalence at corresponding retained positions; they do not pretend that
raw offsets and filtered offsets are numerically identical or implement source
mapping inside `numberStart`.

The observable parser contract is coherent and complete for this leaf:

- always succeed and never throw;
- return the identical `ParserState` object while replacing only its semantic
  predecessor value with the expected boolean;
- consume zero UTF-16 code units, so the following parser begins at the candidate
  offset and only that following parser advances;
- ignore all seven predecessor representatives, including package-default
  `undefined`, frozen array, and frozen object;
- preserve `src` own-property presence and exact value/identity;
- preserve `furthest`, `expected` own-property/reference/order/values,
  `suggestions` array and entry identities/fields, `secondarySpans` array and entry
  identities/fields, and global diagnostics mode;
- behave in both direct raw-child and ordinary parent composition lanes, with
  diagnostics enabled and disabled across all seven diagnostic profiles; and
- perform worst-case O(1) time and space over at most three positions, with no
  whole-number/exponent run, remainder capture, source materialization, loop,
  token/CST layer, or imperative cursor.

The diagnostic sandbox allowance is necessary because parse-that terminals and
lookahead can update failure bookkeeping. It remains narrow: candidate-local
snapshot/restore around direct core-combinator recognition, charged to candidate
cost, with direct/manual `state.src` classification forbidden. Public evidence
can catch state corruption and long-prefix scans, but only exact-source review can
prove that a candidate's restoration and bound are honest.

## Public fixture audit

The inherited public fixtures reproduce exactly:

| corpus | bytes | SHA-256 | cases | true | false |
|---|---:|---|---:|---:|---:|
| G3 `fixtures/cases.json` | 3893 | `14154a45452971f40d0661afdaccd63ee391cec6dec6a7d1d7f79dbaaa2b6706` | 406 | 306 | 100 |
| G4 `fixtures/endpoint-cases.json` | 3053 | `b1e52a69e275dc27722a67066b03b40163a1787fe37dc0aae1bdd6b1cb1dc187` | 23 | 12 | 11 |

The G3 count independently expands to `5×6×10 = 300` ordinary positives,
`5×18 = 90` ordinary negatives, and `8×2 = 16` mapped raw/preprocessed cases.
The three true mapped pairs contribute six true cases and the five false pairs
contribute ten false cases, hence `306/100/406`. The G4 endpoints enumerate the
twelve six-arm `0`/`9` positives and eleven EOF-short/near-miss negatives.

The three deterministic hostile cases also reproduce from their public
generators: `H-PREFIX-1M-TRUE` (`1000003` UTF-8 bytes,
`69ada027b00d4e8cd961fb18543eadff1515bfa4ba00fb98d91b0865c97d904e`),
`H-ASTRAL-PREFIX-1M-FALSE` (`2000002` UTF-8 bytes,
`bc65d746f27d6915913735ada5830ed7403c060721ece593c14da37352675ce5`),
and `H-CR-PREFIX-1M-TRUE` (`1000002` UTF-8 bytes,
`b7086a515de50ac7dc31aeff163d98d83de533a5dcb3277702196b66ac193b95`).

G4 supplies six explicit predecessors in both raw and parent lanes; G5 adds the
package-default `undefined` case in both lanes. Thus the final harness expansion
is exactly `7 predecessors × 2 lanes × 2 modes × 7 profiles = 196` observations
per case. The 406 G3, 23 G4, and 3 hostile public cases therefore represent
`432×196 = 84672` public observations before a holdout is admitted.

## Fresh holdout receipt arithmetic and disjointness

This audit used only the public receipt. No hidden-case truth was sought.

- Balance: `128 true + 128 false = 256` cases.
- Positive arms: `22 + 22 + 21 + 21 + 21 + 21 = 128`.
- Family census: `92 + 12 + 95 + 5 + 4 + 24 + 24 = 256`.
- Source-prefix census: `36 + 70 + 118 + 32 = 256`.
- Mapped-kind census: six kinds at eight cases each gives `48`; independently,
  `24 raw/preprocessed pairs × 2 = 48` retained mapped cases.
- Observation expansion: `7×2×2×7 = 196`; `256×196 = 50176` total hidden
  observations.
- The receipt declares `256` unique cases, all offsets nonzero, all six positive
  arms present, all calls at retained positions or EOF, and zero eliminated CRLF
  interior positions.
- For each explicitly defined axis (`id`, `source`, `source+offset`, and the
  five-field semantic tuple), the receipt declares zero internal duplicates and
  zero overlap with both G3 and G4. The axis definitions are sufficient to make
  the claim unambiguous, and the receipt marks it machine-proved.

Arithmetic and public metadata are independently reproducible; case-level
uniqueness, oracle agreement, and disjointness cannot be re-proved without the
confidential cases. That is not promoted here into hidden knowledge. The receipt
also states zero plaintext files ever written, zero recoverable plaintext copies,
zero candidate/holdout executions, undisclosed ciphertext/key locators, fresh
formation after precursor binding, and no G4/G5/G6 hidden receipt/path/byte reuse.
Those custodian declarations are the intended pre-execution evidence.

## Altitude 3 — G6 rejection repairs and promotion floor

I used the public G6 `rejection.json` docket and did not open either sibling
challenge body. All three confirmed blockers have direct G7 repairs.

1. **Broad, unbound project typecheck.** G7 constructs a strict compiler program
   with exactly two roots: the exact candidate and an in-memory verifier probe.
   It supplies explicit ES2022/ESNext/Bundler/no-emit/no-ambient-types options,
   accepts only the candidate, probe, ledger-bound 130-file TypeScript package,
   and ledger-bound 64-file parse-that dist, rejects every other resolved
   `SourceFile`, emits every resolved input identity, and requires zero option,
   global, syntactic, semantic, and declaration diagnostics. No workspace config,
   glob, sibling cell, or ambient `@types` can silently substitute for the target.
2. **No exact `Parser<boolean>` enforcement.** The generated probe rejects root
   and payload `any`/`unknown`, then proves bidirectional exactness both for
   `typeof numberStart` versus `Parser<boolean>` and for inferred payload versus
   `boolean`. Independent checker inspection requires exactly one direct export,
   confirms the generic root is the ledger-bound parse-that `Parser`, observes one
   type argument rendered as `boolean`, and emits the type receipt. Numeric values,
   `Parser<any>`, `Parser<unknown>`, `Parser<true>`, missing exports, and multiple
   exports reject.
3. **Running verifier not bound to the manifest.** A conformant invocation now
   supplies the externally owner-sealed manifest digest. The canonical live
   verifier resolves adjacent `manifest.json`, hashes it to that digest, requires
   exactly one own `promotion-verifier.mjs` row, reproduces its running byte count
   and hash against that row, and emits all three identities before candidate
   work. A live helper assay with the exact subject digest returned manifest
   `6668`/`0927…b37c` and verifier `31585`/`7e22…adf5`; an all-zero alternate digest
   rejected.

The manifest cannot contain its own digest, so the verifier intentionally cannot
distinguish an owner-approved digest from an arbitrary digest by self-inspection.
The external `0927…b37c` trust anchor is therefore part of the conformant command,
not optional metadata. The exact sealed subject fixes the complete manifest, so
this is a sound trust split rather than a self-hash omission.

Overlay and projection closure is also narrow: an empty active grammar census,
one canonical UTF-8 file at
`grammar/css/l4/value-unit/number-start.ts`, identical one-row overlay/projected
ledgers, canonical live roots, exact mirror package/lock identities, complete
dependency/tool ledgers, and a host-runtime receipt explicitly marked environment
rather than byte-bound identity.

The AST visitor is honestly described as a floor. It blocks obvious source
inspection, coercion, dynamic import/require, loops, non-core imports, computed
access, and malformed export surfaces, but does not claim to prove runtime
behavior, regex breadth, casts/assertions, aliases, indirection, recursion,
prototype tricks, source derivation, scanner behavior, bounded work, KISS, or
idiomatic composition. The type proof likewise proves only the exact static root,
not that its value behaves. Those gaps are expressly assigned to *all five*
exact-source skeptics; none is silently converted into mechanical credit.

## Reservation and admission

This review accepts formation only. Candidate source remains forbidden until the
second fresh exact-byte challenge and root gestalt also ACCEPT this same manifest.
After that, all five isolated authors must close source, overlay, projected,
isolated-program, and exact-type identities before the custodian may execute the
fresh holdout. Five skeptics must then review every exact candidate on every axis;
three adjudicators may nominate only already-reviewed bytes or an explicit
composition. Any new opaque implementation restarts generation.

Accordingly, the exact G7 boundary is semantically correct, modularly justified,
and optimal enough to prototype, while every candidate-specific idiom, scanner,
O(1), and performance conclusion remains open.
