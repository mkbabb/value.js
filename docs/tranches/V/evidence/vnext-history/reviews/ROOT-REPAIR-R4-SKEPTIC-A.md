# Root Repair R4 Skeptic A

## Authenticated subject

The frozen native corpus authenticated as:

- files: **189**
- SHA-256: **`a315d91d7294a0672c5d9a5134d5f7b849efb2fc1e841bad37383db36317f645`**

The projection excluded every R4 peer-report basename before opening any such entry and included the corpus algorithm’s external coordination inputs. No R4 peer artifact was read or used.

`reviews/ROOT-REPAIR-IMPLEMENTATION.md:5-16,134-174` confirms that this is formation-only work. Production remains **0/190**, the whole-formation clean-pass count remains **0/2**, and P01 remains born RED.

## Global verdict

**NOT CLEAN.** RR-17/C00U remains open.

The root/edge unavailable rules and the C00U COMPLETE/BLOCKED split are substantially improved, but three independent mechanism mismatches remain:

| Mechanism-family ID | Verdict | Mismatch |
|---|---|---|
| `R4A-RR17-PROJECTION-01` | **REOPEN** | The custom source tokenizer can omit a valid literal dynamic import and can classify non-import host-language or TypeScript syntax as an import of the wrong kind. |
| `R4A-RR17-BOUNDS-02` | **REOPEN** | The authority described as structural still consults current filesystem presence and realpaths, including during immutable receipt validation. |
| `R4A-RR17-IMMUTABLE-03` | **REOPEN** | Universal offline validation derives the purportedly authenticated immutable binding from the annex under validation, allowing a receipt and binding to be coherently rebound without an independent identity source. |

A green focused selftest does not close these cross-file counterexamples.

## Finding `R4A-RR17-PROJECTION-01` — the source projection can still false-green

### Contract

`RETURN-CONTRACT.md:508-520` and `waves/M-C.md:37` require deterministic syntax-aware classification of runtime, type, dynamic, and CSS imports. Supported literal imports must be observed, while computed, ambiguous, or otherwise unsupported candidates must fail closed. `reviews/ROOT-REPAIR-IMPLEMENTATION.md:113-118` claims that correction.

### Implementation mismatch

The tokenizer decides whether `/` begins a regular expression using only the immediately preceding token. `tools/resolve-consumer-universe.mjs:644-652` treats an identifier whose value is `return`, `of`, `in`, or another listed keyword as a regular-expression prefix without considering whether that identifier is actually a property name following `.`. Lines 736-740 then consume bytes as a regular-expression token.

A benign in-memory conformance check used valid JavaScript containing:

- property access whose member name is `return`;
- a division operator;
- a literal dynamic import of `@mkbabb/value.js`;
- a second division operator;
- a trailing line comment containing a quote.

Node accepted the source as syntactically valid. The exported `staticImportProjection` returned an empty array. A conventional literal dynamic-import baseline returned the expected `dynamic` observation.

The mismatch occurs because the first division slash is treated as a regular-expression opener. The tokenizer consumes the `import` token through the slash inside the scoped package name; the remaining quote is balanced by the quote in the line comment, so projection completes without the promised fail-closed rejection.

Additional source-level mismatches confirm that this is contextual rather than an isolated delimiter case:

- `tools/resolve-consumer-universe.mjs:926-940` classifies every token sequence shaped like `import(...)` as `dynamic`, with no TypeScript type-context state. A TypeScript import-type expression in a type alias is therefore reported as a dynamic runtime edge rather than a type edge or an unsupported candidate.
- `.jsx`, `.tsx`, `.html`, `.vue`, `.svelte`, `.astro`, and `.mdx` are all scanned at `tools/resolve-consumer-universe.mjs:43-46`, but lines 996-997 distinguish only stylesheet extensions. JSX or HTML text containing import-shaped text is consequently tokenized as JavaScript rather than host-language text.
- The focused syntax matrix at `tools/selftest-consumer-universe.mjs:34-58,372-405,688-710` covers ordinary regex literals, comments, quoted/template imports, inline type specifiers, and several unsupported forms, but not division-versus-regex context, TypeScript import-type expressions, or JSX/HTML text states.

### False-green path

`scanEdges` consumes this projection at `tools/resolve-consumer-universe.mjs:1003-1055`. The omitted occurrence never reaches `observedEdgeMap` at lines 1068-1091. The declared/observed checks at lines 1195-1207 therefore cannot reject its absence. If the input omits the lost edge and has no unavailable dispositions, lines 1305-1327 emit `resolvable:true`, no blockers, and exit 0.

This is an actual dependency-green false positive, not merely rejection of unusual valid syntax.

### Superior correction

Use pinned, deterministic parsers for each claimed source family and project exact AST nodes:

- JavaScript/JSX and TypeScript/TSX module syntax;
- the explicitly supported Vue/Svelte/Astro/MDX host regions;
- CSS-family import syntax.

If the formation retains a custom implementation, it needs complete lexical states for division versus regular expressions, JSX/host text, TypeScript type contexts, templates, comments, and import attributes. Any unparsed candidate region must reject the census before `resolvable:true`; it must not disappear or be assigned a convenient edge kind.

## Finding `R4A-RR17-BOUNDS-02` — structural authority remains live-state-dependent

### Contract

`FORMATION.md:52-61` says the bounds authority authenticates declared structure, shape, and path law and does not assert current root or subpath presence. `RETURN-CONTRACT.md:476-492` repeats that separation and says immutable validation does not rerun live discovery.

### Implementation mismatch

`tools/consumer-bounds-authority.mjs:181-195` nevertheless requires every search-root path to exist as a directory and match its current `realpathSync` result.

The same authority’s `canonicalPotentialPath` helper at lines 56-65 walks current ancestors using `existsSync` and `realpathSync`. Required-path authentication invokes it at lines 250-253. Thus the result of supposedly structural authentication can change when a required subpath is created, removed, replaced by a symlink, or observed under a different current ancestor topology.

This is not confined to live receipt validation. `tools/consumer-universe-return.mjs:377-393` invokes `validateConsumerBoundsAuthority` before selecting live versus immutable root-state validation. An archived receipt therefore still depends on the current search-root and required-path filesystem topology.

Minimal counterexample: an exact archived receipt and binding are replayed after their former search-root directory is no longer mounted. The authority rejects with its “search root is unavailable” branch at `consumer-bounds-authority.mjs:188-190`, although immutable validation should authenticate the captured structure without asserting current presence.

The live resolver already has the appropriate physical checks:

- search-root existence and realpath at `tools/resolve-consumer-universe.mjs:434-441`;
- available required-subpath existence, realpath, and containment at lines 202-212;
- unavailable-root absence at lines 328-338.

### Impact

Historical and immutable consumer evidence can false-red solely because the current machine no longer resembles the captured census. Alternate pinned authority bytes do not cure this because validating those bytes still consults the live logical paths encoded inside them.

### Superior correction

Keep physical validation only for the authority file being opened. Validate semantic bounds lexically:

- absolute normalized search-root and required-root strings;
- unique canonical path declarations;
- relative-path safety;
- exact root/path IDs, scope, kinds, exclusions, and containment.

Leave all directory existence, symlink, realpath, Git-root, and subpath-presence observations to live resolver and live receipt validation. Add an immutable negative control that removes or redirects the current search-root view after capture and requires the archived binding to remain valid.

## Finding `R4A-RR17-IMMUTABLE-03` — immutable authentication is circular at the universal-return join

### Contract

`RETURN-CONTRACT.md:480-492` requires an authenticated, complete immutable projection and explicitly rejects a partial projection or legacy freshness bypass.

### Implementation mismatch

`consumerUniverseImmutableBindingProjection` at `tools/consumer-universe-return.mjs:60-67` copies fields from its supplied object. `validateConsumerUniverseImmutableBinding` at lines 70-111 validates shape and formats but has no independent identity source.

In immutable mode:

- schema, resolver, and registry hashes are compared to current bytes only in the live-only branches at `tools/consumer-universe-return.mjs:368-372`;
- lines 510-512 take those identities directly from the receipt;
- lines 517-542 construct the expected immutable binding from that same receipt and compare it with the caller’s binding.

An independently authenticated caller could make that equality useful. The universal-return caller does not provide one: `tools/validate-return.mjs:943-950` constructs the immutable binding directly from `consumerAnnex`, the object currently being validated.

A minimal coherent-rebinding counterexample changes the receipt’s claimed resolver SHA-256, recomputes its receipt hash and file hash, copies the changed identities into the annex, recomputes the outer return hash, and lets `validate-return.mjs` project a new binding from that annex. The consumer layer sees exact equality because both sides originate in the changed candidate bytes; it never authenticates bytes matching the newly claimed resolver hash.

The focused immutable controls do not cover this composition:

- `tools/selftest-consumer-universe.mjs:1087-1129` rejects a missing binding or a binding changed independently of the receipt;
- lines 1132-1195 change receipt/input data while retaining the old binding;
- no control changes receipt and annex coherently and then recreates the binding through the actual `validate-return.mjs:943-950` call path.

Immutable validation also reads and applies the current input and receipt schemas unconditionally at `tools/consumer-universe-return.mjs:341-362`, despite carrying captured schema hashes. A later schema change can therefore alter the acceptance of unchanged archived bytes without authenticating or materializing the schema named by the receipt.

### Impact

The full projection improves tamper detection only when its binding comes from a genuinely independent authenticated source. At the current universal-return join, synchronized receipt/annex identity drift can false-green the consumer-universe portion of offline validation. Plain offline validation has no materialized historical epoch, and stronger historical callers should not rely on this circular projection as their consumer receipt’s authentication.

### Superior correction

Require the immutable binding as an independently content-addressed input obtained from a validated predecessor return, pin, or historical certificate. Do not derive it from the candidate annex.

For semantic archived replay, materialize or otherwise authenticate the exact input schema, receipt schema, resolver, and wave-registry bytes named by their hashes. Add a same-layer negative control that changes one captured identity, rehashes the receipt and annex coherently, and proves rejection against the unchanged external binding.

## Checks that held locally

No additional mismatch was found in these repaired branches:

- Required roots cannot be excluded, and required paths are inherited blocked only through their owning unavailable root at `tools/resolve-consumer-universe.mjs:158-213,328-372`.
- `consumerEdgeObservationMode` correctly requires zero observations for an unavailable source, exact observations for an available source into an unavailable internal target, and rejects unrelated unavailable edges at `tools/resolve-consumer-universe.mjs:375-400`.
- Receipt authentication applies the same edge mode and retains exact observation path/content coverage at `tools/consumer-universe-return.mjs:421-484`.
- The annex schema now admits either a green C00U receipt or a nonempty blocking C00U receipt while keeping C05 green-only at `return.schema.json:1145-1173`.
- Universal return joins C00U COMPLETE/BLOCKED to resolvability, expects live resolver exit 0/2 respectively, and bijects unavailable blockers to `routed_remainder` at `tools/validate-return.mjs:892-935,959-1007`.
- C05 remains `resolvable:true` and blocker-free at `tools/validate-return.mjs:933-935`.
- Legacy `requireFresh` is absent from the exact option allowlist at `tools/consumer-universe-return.mjs:306-317`; the explicit rejection control is at `tools/selftest-consumer-universe.mjs:1098-1107`.

These local successes do not offset the three mechanism findings.

## Validation record and credit

Read-only checks performed before report authorship:

- Native corpus projection: **189 files**, SHA-256 **`a315d91d7294a0672c5d9a5134d5f7b849efb2fc1e841bad37383db36317f645`**.
- Benign Node syntax and `staticImportProjection` checks: conventional literal dynamic import detected; the division-context counterexample was syntactically valid but projected no edge.
- Canonical `selftest-consumer-universe.mjs`: exit 0 with two valid real-Git receipts, 44 resolver rejections, 11 receipt-projection rejections, two unavailable blocking receipts, 22 syntax controls, one valid return-annex control, and 11 immutable controls. Its canonical temporary fixture was tool-managed and removed.

Files inspected included `FORMATION.md`, `RETURN-CONTRACT.md`, `waves/M-C.md`, `reviews/ROOT-REPAIR-IMPLEMENTATION.md`, `reviews/ROOT-REPAIR-R3-ADJUDICATION.md`, both consumer-universe schemas, `return.schema.json`, `tools/resolve-consumer-universe.mjs`, `tools/consumer-bounds-authority.mjs`, `tools/consumer-universe-return.mjs`, `tools/validate-return.mjs`, `tools/selftest-consumer-universe.mjs`, and the canonical consumer fixture helpers.

No repository file, product checkout, parser checkout, Git state, staging area, history, or review report was modified. No product or parser workload was executed. Production credit remains **0/190**, focused R4 closure credit remains zero, and whole-formation clean credit remains **0/2**.

## Disposition

RR-17 remains open under `R4A-RR17-PROJECTION-01`, `R4A-RR17-BOUNDS-02`, and `R4A-RR17-IMMUTABLE-03`. Correct the source projection, remove live topology from structural authority, and replace annex-derived immutable self-binding with an independent authenticated binding before another focused hostile pair and adjudication.
