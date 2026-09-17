# Formation-Root Focused Repair Ledger

## Boundary and verdict

This is formation tooling and tranche specification only. Production execution
remains **0/190**. The signed `ROOT-REPAIR-ADJUDICATION.md` closes RR-01 through
RR-13. RR-14 through RR-18 are now implemented below but remain open until a
fresh hostile pair and third-Sol adjudicator close them. No focused repair is
called formation closure until the later two whole-formation clean triads are
clean.

Value and Keyframes still consume published `@mkbabb/parse-that@1.0.0` only.
No private T/U source or active BBNF/CSS-W0 assay entered this epoch. P01
remains `born_red`, with zero authors and no execution credit.

## Preserved RED findings

| Finding | Pre-repair failure | Disposition |
|---|---|---|
| RA-01 | npm configuration and `script-shell` sat between the canonical gate and its proof module. | accepted |
| RA-02 | supplied JSONL content could not locally authenticate provider session existence, freshness, sibling independence, model, or effort. | accepted as an explicit external trust boundary; prose may not upgrade content attestation into provider authentication |
| RA-03 | actor/gate boundary equality and malformed required-record order were not all rejected. | accepted |
| RA-04 | callers could predecode JSON authority bytes with replacement semantics; JSON whitespace was broader than RFC JSON. | accepted |
| RB-01 | ignored call arguments and lexical source/assert/test shadows could launder a mirrored-test assertion. | accepted; all four named probes were observed RED with `assertion_count: 1` |
| RB-02 | a mixed delete/modify truth receipt could omit a modified effect while its deletion made the receipt appear joined. | accepted |

The exact hostile reports are `ROOT-REPAIR-SKEPTIC-A.md` and
`ROOT-REPAIR-SKEPTIC-B.md`; they are retained rather than rewritten as green.

## Implemented mechanisms

1. All 190 generated acceptance gates now use the exact direct argv
   `node .vnext/proof-runner.mjs test/proof/<wave>/run.mjs --manifest
   test/proof/<wave>/manifest.json`. The validator binds `node` to canonical
   `process.execPath`, verifies the committed runner hash, uses `shell:false`,
   and never consults package scripts, `.npmrc`, `node_modules/.bin`, npm, or
   `script-shell`.
2. The runner scrubs to the exact 11-key proof environment before importing the
   repository-relative entrypoint. A hostile npm configuration is present in
   the control fixture and is inert.
3. Challenge sessions require valid nondecreasing record timestamps, the exact
   required meta/user/context/final/completion line order, strict critic →
   adjudicator → gate boundaries, and byte-identical terminal reports. The
   contract states the remaining provider-authentication boundary explicitly.
4. JSON authority reads are byte-first. `json-contract.mjs` rejects malformed
   UTF-8, BOM, non-JSON whitespace, duplicate members, lone surrogates, and
   non-finite numeric results. JSONL uses the same strict parser per record.
5. Keyframes mirrored-test proof rejects lexical shadowing of imported source,
   assertion, and test bindings. Call/new values derive only through the
   callee or receiver, not an ignored argument.
6. Deletion judgment accumulates both declared effect kinds and requires exact
   equality with the truth-receipt deleted and modified unions.
7. K22T/M10T still bind the declarative target-test command and its digest, but
   execute the derived test argv directly through canonical `process.execPath`,
   the same scrubbed environment and `shell:false`. Their receipt records
   `command: "node"`; poisoned fixture `.npmrc` files prove that nested target
   execution cannot be replaced by `script-shell`.

Direct-runner adoption exposed three honest fixture defects: Value still wrote
one root `proof.mjs`, K00 wrote `proof-k00.mjs`, and K23 wrote
`proof-k23.mjs`. Each now writes its canonical `test/proof/<wave>/run.mjs`.
Value inventories those entrypoints as explicit non-library proof exclusions;
Keyframes keeps them outside its declared library/demo roots. No package-script
compatibility path remains. The K23 public-package control imports a freshly
emitted K22T receipt, so its downstream replay proves the same direct-Node
execution law rather than accepting a copied historical receipt.

P01's born-RED authority was repinned to the new P01 contract and four changed
validator files. Its current manifest hash is
`634a1d98a38ab9309ca8781d0e0d7968e0ed2f1f3fa5eee0bac40677206a27e6`;
`completion_eligible` remains false.

## RR-14 through RR-18 implementation

1. RR-14 folds each exact clean-actor launch plus zero or more owned empty
   polls into one logical command. The state machine proves same-session
   continuity, terminal `exit_code:0`, bounded time/polls/output, asynchronous
   epoch boundaries and report-after-terminal order. It also rejects reported
   wall time that exceeds the physical call/output interval. Its selftest has
   21 positives and 225 adversarial rejections.
2. RR-15 computes each canonical prompt-body digest, content-addresses the
   provider-visible task/path, records that digest in the attestation, and
   joins the opaque coordinator and child carriers byte-for-byte while naming
   plaintext decryption as a provider boundary. The pre-campaign,
   corpus-epoch-bound `CLEAN-PROVIDER-BOOTSTRAP.json` authority calibrates the
   provider envelope from an earlier child of this same root session and binds
   all six children; the final manifest can only bind that authority's path,
   file hash and self-hash, never author or recalibrate its digest matrix. The
   root is pinned by its first raw session line, active Sol-ultra turn and
   hashed evidence prefix.
3. One continuous physical-line custody automaton begins at a quiescent
   `list_agents` receipt and ends exactly at the pass-2 adjudicator hash output.
   It consumes only phase-owned absence, spawn, observation, persistence and
   immediate report-hash transactions; exact inert envelopes cannot launder
   effects. The descriptor-secured hash helper uses `O_NOFOLLOW` and inode
   continuity plus size, mode, nanosecond mtime and nanosecond ctime continuity.
   Closing validation rehashes all six child JSONLs and all six reports and
   revalidates the bootstrap authority. Six positive controls and 32
   adversarial custody rejections, plus two report-hash positives and 12
   report-hash rejections, cover interposed create/delete, same-size rewrite,
   stale or duplicate activity, malformed inert labels, missing hashes and
   physical line gaps.
4. RR-16 gives every P/V wave two distinct stages: pre-mutation formation
   critique, then the exact execution order born RED → partition → implement →
   freeze → final-state critic A and B → adjudicator → sole acceptance gate and
   downstream crater → receipt → return. The challenge consumes the frozen
   subject before the gate; neither stage substitutes for the other.
5. RR-17 makes fifteen canonical real Git roots, including the distinct
   Slides-K root, and six typed repository-subdirectory identities mandatory.
   The resolver scans executable source/manifest observations plus npm
   `package-lock.json` v2/v3 direct, installed and transitive edges, and fails
   on omission, kind forgery, absence, exclusion, alias/realpath drift, escape
   or duplication before an owner receipt. Its current selftest has 29 resolver
   rejections.
6. RR-18 makes the canonical `VNEXT-D19-D25-G05` six-row D19–D24 projection
   executable: each row has exactly one pre-implementation G05 effect or typed
   `N/A{reason,evidence}`, and D25 validates the exclusive complete ledger.
   The shared proof layer rejects 14 same-layer order/ledger forgeries while
   accepting two positive controls.

These mechanisms are formation repairs, not product implementations. Their
focused skeptic/adjudicator reports have not yet been authored, and the whole
clean-pass counter remains zero.

## Focused evidence

- Wave registry: 190 contracts, 759 edges, 149 seed requirements; current
  aggregate contract hash
  `579a8ff6eb902d6214629ce73ec69526d4811c409208b41661f906bf6f4c3af5`.
- Universal return: 12 named positives and 88 adversarial rejections, including
  direct-runner npm-configuration isolation and malformed return bytes.
- Canonical JSON/order: 74 static tools, three locale controls, five invalid
  Unicode, five invalid byte/whitespace, and two duplicate/non-finite semantic
  rejections.
- Keyframes transpose: 6 direct + 5 universal positives; 30 direct + 22
  universal rejections.
- Deletion judgment: owner/C05/C10 positives 1/1/1; three same-root receipts,
  one modified-only receipt, and 33 adversarial rejections.
- Keyframes inventory: 5 direct + 1 universal positives; 19 direct + 2
  universal rejections.
- Keyframes public package: 2 direct + 1 universal positives; 25 direct + 1
  universal rejection.
- Value current inventory: 3 positives and 16 adversarial rejections.
- Value target resolutions: 1 positive, 16 projected combinations, and 17
  adversarial rejections.
- Value public surface: 1 packed-fixture positive and 37 adversarial
  rejections.
- Consumer universe: 2 real-Git positives, 29 resolver rejections, 8 exact
  projection rejections, one blocking receipt, and one typed annex control.

The complete Value target-transpose suite, third-Sol focused adjudication and
all non-clean-pass formation validators are terminal green on one coherent
repair epoch. Both whole-formation clean triads remain required.

## Current code identities

| Authority | SHA-256 |
|---|---|
| `tools/gate-runtime.mjs` | `9639b3b53b1158d95006b98a6c6fe80cf5d66c63fb9fcc8b2a335ad7313ff520` |
| `tools/validate-return.mjs` | `8ff35ba84dc01b028ff31382af09dcaa8334aac58f24186480d701e1bb99f0fb` |
| `tools/selftest-contracts.mjs` | `6cdfb9a8b4a8f70dbf361baf8080801a28a950d901617a0170a2683a691b92f5` |
| `tools/json-contract.mjs` | `73e05a71dcd5107ae813c4dc55efbd8bf9c8e8de60bf0778643d7e8b4253b6a7` |
| `tools/keyframes-proof-contract.mjs` | `c5906590a149abd7c3794ef731b7d753c2317d097e96e1309ae9c6cbdccbf37f` |
| `tools/deletion-judgment.mjs` | `543588dcc9534e75271d9578adf6da699ef7cc0dbf51a3802a3b2f0ac652f272` |
| `tools/validate-keyframes-target-transpose.mjs` | `09ffca11d9f3bfd2b42234013b51e4a9c752efa7f4e4c37ac82973df97d6fbff` |
| `keyframes-target-transpose-validation.schema.json` | `37782ebf99626e69a0413273837f07961f9361614d347a9fb231958c33695145` |
| `tools/clean-exec-contract.mjs` | `573ac2f6f8dfe8c9f27460f052383f39d960f59336138a208c4d9c5e3ff8d756` |
| `tools/selftest-clean-exec-contract.mjs` | `8ddb250c49c6cff6ec3a78036cf2193ef84137e5abc947a0e492f1a3811dffdc` |
| `tools/clean-pass-prompts.mjs` | `41aa39c10ff50362ada8d4c5582c71192c5c885dbc42f142a639cb4076702a9e` |
| `tools/selftest-clean-pass-prompts.mjs` | `cfc74b82c559d2136079c3bc6dbf06de7182fba95b3d2ce1245840071018bef5` |
| `tools/clean-coordinator-custody.mjs` | `00f61adee3b8831fe088101f2eeb9bce2a556645ddaf54368e34d6c1aebad74f` |
| `tools/hash-clean-report.mjs` | `84b768eebba5d56276945405529e945423e29e7812db527c3cfde11c6af7dfd4` |
| `tools/selftest-clean-coordinator-custody.mjs` | `9e7bb3d26bd97782c193bc28a402771e99767f6d3662c8f69d44938acad3de5f` |
| `CLEAN-PROVIDER-BOOTSTRAP.json` | `a3e74b866279e7a9651e3bb53f4cd30aba95de841f9e2590475361b3bfd05098` |
| `tools/clean-provider-bootstrap-authority.mjs` | `0a6581fff3ca3e46ff2b8588b307418d56e0c9e49809e31310ebf936f4c57150` |
| `tools/selftest-clean-provider-bootstrap-authority.mjs` | `a02e548638f534f06d9bd7fecdeeb96503a06f2caa4475881b65862cdaf29230` |
| `tools/validate-clean-passes.mjs` | `8c71e160ba08fe7987a36e04c49609f8349017d6bd611f05cee6074ebfc118c8` |
| `tools/validate-corpus.mjs` | `696e355be32b7cfe57aaf7d43d8c639a9ce4633738ce484818d7816f253d2c8b` |
| `formation-clean-passes.schema.json` | `74d7078e22379517864eca4445e5fa9aa664063ffd2282460400187a99b8c03e` |
| `tools/formation-proof-layer.mjs` | `ef660e82dd4a0bcff943a8ed293d6b0015d7464c11fd120bb0ebbf14e74b49d2` |
| `tools/selftest-formation-proof-layer.mjs` | `2cbbc9113b14935b60d33276994f52011e955c165c33685a960a5b06326db2c4` |
| `tools/wave-contract.mjs` | `11c143fa3529afcdde3ab89f58ce151815a4b1597c40d2fe2b2677b1e1b7c763` |
| `tools/validate-formation.mjs` | `21073a51fa227a37064b29510d4255477f646e8f636d16053566cb4206b7d8fd` |
| `tools/validate-wave-contracts.mjs` | `20092c9e36545c25695fc4f93b906996cfe3bd7b1cefe41daf6de3921712ab4d` |
| `tools/resolve-consumer-universe.mjs` | `d3b101813c588340476f5d31653dec0f5f582ed1791dad97e7bad4f1888d8c51` |
| `tools/selftest-consumer-universe.mjs` | `5aa986c4fb446e5704185f1b7a83110e8f5a553779e9d67625d1e0c7b811ca08` |
| `tools/consumer-bounds-authority.mjs` | `c3e0709d2dd90ebe8ebaf14032cecf9dd85178131bd7b098925df1c3e96946d3` |
| `tools/consumer-universe-fixture.mjs` | `b68291a23c3a3dd6d9e9e113d7507e0f9fcd0edf8db8e7c510bbc8b70f192d0b` |
| `consumer-universe.schema.json` | `6ce217c2b634dd2108f53467a3eb29fef440fa9f97192aa653c41bb26fb02f42` |
| `CONSUMER-UNIVERSE-BOUNDS.json` | `aefd4ff211c644a8b96916cfb1229ccd4b535a6304497e44696948f0db246437` |
