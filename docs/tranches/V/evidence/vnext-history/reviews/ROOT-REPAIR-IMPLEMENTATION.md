# Formation-Root Focused Repair Ledger

## Boundary and verdict

This is formation tooling and tranche specification only. Production execution
remains **0/190**. The signed `ROOT-REPAIR-ADJUDICATION.md` historically closes
RR-01 through RR-13. R2 and R3 were both **NOT CLEAN**; the authenticated R3
critic A3, critic B and adjudication reopened RR-17. The current bytes implement
the candidate R4 correction below. R3 reproduced no additional RR-14, RR-15,
RR-16 or RR-18 defect, but none of RR-14 through RR-18 is focused-closed until
a fresh R4 hostile pair and third-Sol adjudicator close the combined subject.
The whole-formation clean-pass count remains **0/2**.

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
The R2 and R3 skeptic/adjudication reports are likewise preserved byte-for-byte.
The latest authenticated ruling is `ROOT-REPAIR-R3-ADJUDICATION.md`, whose
global verdict is **NOT CLEAN**.

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

## Candidate RR-14 through RR-18 implementation and R3 disposition

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
   Its deterministic syntax-aware projector recognizes quoted and
   zero-substitution-template dynamic imports, statement-level and pure inline
   TypeScript type imports/exports, and mixed type/value forms; unsupported,
   computed or ambiguous candidate syntax fails closed. Bounds authentication
   proves immutable shape while live receipt validation owns physical presence.
   A missing required root is typed unavailable and never excluded; an edge is
   unavailable only through an unavailable source or internal target, retaining
   exact observations for the available-source/unavailable-target case. C00U
   `COMPLETE` authenticates exit 0 and no blockers, while C00U `BLOCKED`
   authenticates exit 2 and an exact blocker/routed-remainder bijection without
   advancing C05. Immutable replay binds the complete receipt projection rather
   than bypassing freshness. The same projection now crosses deletion judgment
   and all shared Value/Keyframes public and transpose fixtures.
6. RR-18 makes the canonical `VNEXT-D19-D25-G05` six-row D19–D24 projection
   executable: each row has exactly one pre-implementation G05 effect or typed
   `N/A{reason,evidence}`, and D25 validates the exclusive complete ledger.
   The shared proof layer rejects 14 same-layer order/ledger forgeries while
   accepting two positive controls.

These mechanisms are formation repairs, not product implementations. R2 and R3
remain preserved **NOT CLEAN** evidence. The corrected subject is candidate R4
evidence only: its fresh skeptic pair and adjudicator have not yet run, the
whole-formation clean-pass count remains **0/2**, and production remains
**0/190**.

## Focused evidence

- Wave registry: 190 contracts, 759 edges, 149 seed requirements; current
  aggregate contract hash
  `f5497f80e00826cbcc1cc215f292586aa740c88e51c688a0544025671eb05346`.
- Universal return: 12 base positive domains, three structural/non-completing
  offline consumer-return positives, three live branch isolations, one schema
  control, seven consumer-return rejections and 95 total adversarial
  rejections; direct-runner npm-configuration isolation remains positive.
- Canonical JSON/order: 74 static tools, three locale controls, five invalid
  Unicode, five invalid byte/whitespace, and two duplicate/non-finite semantic
  rejections.
- Keyframes transpose: 6 direct + 5 universal positives; 30 direct + 22
  universal rejections.
- Deletion judgment: owner/C05/C10 positives 1/1/1; three same-root receipts,
  one modified-only receipt, and 36 adversarial rejections.
- Keyframes inventory: 5 direct + 1 universal positives; 19 direct + 2
  universal rejections.
- Keyframes public package: 2 direct + 1 universal positives; 25 direct + 1
  universal rejection.
- Value current inventory: 3 positives and 16 adversarial rejections.
- Value target resolutions: 1 positive, 16 projected combinations, and 17
  adversarial rejections.
- Value public surface: 1 packed-fixture positive and 37 adversarial
  rejections.
- Value target transpose: 5 positives and 32 adversarial rejections in the
  real-Git/npm full-target fixture.
- Consumer universe: 2 real-Git receipts, 44 resolver rejections, 11 exact
  receipt-projection rejections, 2 blocking unavailable receipts, 22 syntax
  controls, 1 return-annex control and 11 immutable-binding controls.

The listed Value/Keyframes shared-fixture suites and all current non-clean-pass
formation validators are terminal green on the candidate bytes. That evidence
does not supersede R3: fresh R4 focused adjudication and both whole-formation
clean triads remain required.

## Current candidate code identities

| Authority | SHA-256 |
|---|---|
| `tools/gate-runtime.mjs` | `9639b3b53b1158d95006b98a6c6fe80cf5d66c63fb9fcc8b2a335ad7313ff520` |
| `tools/validate-return.mjs` | `d0c05ec44c753eaac2b75662d78b6636cf7a5bf474206963edb9fbeda2bae386` |
| `tools/selftest-contracts.mjs` | `587a0d88cc982e5d5a16a6e8240ef49bc241617325e6c04d427dde0b07cef0f2` |
| `tools/json-contract.mjs` | `73e05a71dcd5107ae813c4dc55efbd8bf9c8e8de60bf0778643d7e8b4253b6a7` |
| `tools/keyframes-proof-contract.mjs` | `c5906590a149abd7c3794ef731b7d753c2317d097e96e1309ae9c6cbdccbf37f` |
| `tools/deletion-judgment.mjs` | `9050eba39250ce14621edae7da2f5c4586ee1a6802c38b4fffd29f17e04f8b05` |
| `deletion-judgment.schema.json` | `920bc15cdc6e4418f5a1f600f6ba46c5912448fa087bbb965a0fcbaedab52235` |
| `tools/selftest-deletion-judgment.mjs` | `b50e8a001654acf110ee7e8e9b89e7b68c26bb014c88a60132f34794caa7b5c8` |
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
| `tools/resolve-consumer-universe.mjs` | `055bffeff197d0395876c2e2772858a53cb310f02cd7270f04f7d2b68b8330fa` |
| `tools/consumer-universe-return.mjs` | `82c3fca8d4c0f7b18999433719f7a10d05a26608f79c52638cd23b646003e98e` |
| `tools/selftest-consumer-universe.mjs` | `26d803f62915a39ce9ba4df8c2af9b5884e023a890c56aef8decca77d99f0bc2` |
| `tools/consumer-bounds-authority.mjs` | `ca559151b0d71397f3bcca985e301e417d5fa07dec4815d01db89f2d1db2cae6` |
| `tools/consumer-universe-fixture.mjs` | `1f930bf8f1202bd443f2d3cc4f437b5f253ad0006a099fa96dbc5dc77fed29f0` |
| `tools/consumer-universe-return-mode-fixture.mjs` | `95c82c885d3da9bd79c837d7980dd84ea4cef95afc75ebd10287758c6bfa9465` |
| `tools/selftest-keyframes-public-package.mjs` | `41486d86bea8bff22ed1579f7bcc80043ff45265ca36bf323aae6b2104eeaa0d` |
| `tools/selftest-keyframes-target-transpose.mjs` | `aa8209551008e39cb13d842583a00afb0974fae5235e91a61fbc2813c74a5968` |
| `tools/value-target-resolution-fixture.mjs` | `252ae52a7c8e8b566eaee208deb55e2e279155018cb6571154cdcc8fdfa96802` |
| `return.schema.json` | `7bb424e7f5d45f792fe867b14c646a5c42fc50343d81d7d5c9d08d2c95a5749d` |
| `consumer-universe.schema.json` | `a6e2491b917bd307a15e0552fb22a38036030b74618b5469e738ef4da989fb41` |
| `CONSUMER-UNIVERSE-BOUNDS.json` | `b22f5c351bd1991132508f435270a327f6dc7778e2bd05640692b901c3476b5b` |
