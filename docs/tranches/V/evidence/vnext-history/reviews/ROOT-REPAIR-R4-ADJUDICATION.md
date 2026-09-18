# Root Repair R4 Adjudication

## Authenticated subject

- Frozen subject: `docs/tranches/V/vnext`
- Native corpus projection, excluding every `ROOT-REPAIR-R4-*` basename before opening: **189 files**
- Native corpus SHA-256: **`a315d91d7294a0672c5d9a5134d5f7b849efb2fc1e841bad37383db36317f645`**
- Skeptic A SHA-256: **`87549789d084a390fa3fea429767b1c4404dfa4933fc5e387ac8ec256e2e20bb`** — authenticated
- Skeptic B SHA-256: **`40c03f1ceb1802792e3e4b3e2d2ab57c1d28f0545af9757906ca4f19cc82cfdf`** — authenticated

No other R4 adjudication output was read. Inspection and probes were read-only; no repository, product, parser, Git, staging, history, or report byte was changed.

## Global verdict

**NOT CLEAN. RR-17 remains open.**

All six reported finding IDs are sustained. They reduce to three shared mechanisms:

1. The handwritten source tokenizer lacks sufficient JavaScript, TypeScript, and host-language context.
2. Immutable identity is sometimes self-derived or only partially joined instead of independently authenticated.
3. Structural and historical validation still dereference mutable current filesystem state.

| Finding | Disposition |
|---|---|
| `R4A-RR17-PROJECTION-01` | **SUSTAIN** |
| `R4A-RR17-BOUNDS-02` | **SUSTAIN** |
| `R4A-RR17-IMMUTABLE-03` | **SUSTAIN** |
| `R4B-RR17-PROJECTION-01` | **SUSTAIN** |
| `R4B-RR17-DELETION-EPOCH-02` | **SUSTAIN**, with one wording correction |
| `R4B-RR17-SOURCE-03` | **SUSTAIN** |

## Finding dispositions

### `R4A-RR17-PROJECTION-01` — SUSTAIN

`RETURN-CONTRACT.md:508-512` requires supported imports to be classified and unsupported candidates to fail closed. The implementation scans all extensions listed at `tools/resolve-consumer-universe.mjs:43-46`, but:

- `tools/resolve-consumer-universe.mjs:644-652,736-740` decides whether `/` starts a regular expression solely from the preceding token.
- `tools/resolve-consumer-universe.mjs:926-940` treats every `import(...)` token shape as dynamic.
- `tools/resolve-consumer-universe.mjs:996-997` applies the same JavaScript token projection to JSX and host-language files except stylesheets.

The exact valid-JavaScript probe

`x.return / 1; import("@mkbabb/value.js"); y / 2; // "`

was accepted by Node but `staticImportProjection` returned `[]`. Replacing `return` with an ordinary property restored the expected dynamic edge. The omitted edge therefore never reaches `scanSource` at lines 1003-1006 or the observed map at lines 1068-1091, so the completeness checks at lines 1195-1207 cannot reject its absence.

Additional probes reproduced the contextual errors:

- `type X = import("@mkbabb/value.js").Value;` in `.ts` was emitted as `dynamic`, not `type` or rejected.
- JSX text and HTML text containing `import("@mkbabb/value.js")` were emitted as dynamic imports despite being text.

The division case is a dependency false-green; the TypeScript and host-text cases independently prove wrong-kind and false-observation behavior.

**Minimal repair:** replace the tokenizer with pinned deterministic parsers for each claimed JS/JSX, TS/TSX, host-component, and CSS family. If a claimed family or candidate region cannot be parsed, reject the census.

**Required controls:**

- Positive: the exact division probe must yield one `dynamic` edge.
- Positive: a TypeScript import-type expression must yield one `type` edge.
- Non-edge: JSX/HTML text must yield no edge, while an actual parsed script-region import must be observed.
- Negative: computed, malformed, or unparsed candidates must reject.
- Negative: omitting or declaring the wrong kind for any resulting edge must make the full resolver exit nonzero.

### `R4A-RR17-BOUNDS-02` — SUSTAIN

The authority is specified as structural at `FORMATION.md:52-61` and `RETURN-CONTRACT.md:476-492`. It nevertheless performs live topology checks:

- `tools/consumer-bounds-authority.mjs:181-195` requires each search root to exist and match current `realpathSync`.
- `tools/consumer-bounds-authority.mjs:56-65,250-253` resolves current ancestors when authenticating required-path declarations.
- `tools/consumer-universe-return.mjs:377-393` invokes that authority validation before choosing live or immutable root-state handling.

Consequently, an unchanged archived receipt can fail solely because a search root disappeared or a required-path ancestor changed after capture. The appropriate live checks already exist at `tools/resolve-consumer-universe.mjs:158-213,434-441`.

**Minimal repair:** make semantic-authority validation lexical only: normalized absolute strings, exact IDs, safe relative paths, lexical containment, uniqueness, scope, exclusions, and limits. Retain physical checks only for the authority file being opened and in the live resolver.

**Required controls:**

- Positive: an immutable receipt remains valid after its captured search-root view is absent or redirected.
- Positive: the live resolver still enforces search-root, required-root, and required-subpath physical state.
- Negative: lexical escape, non-normalized path, duplicate identity, or `repository_root + relative_path` mismatch rejects structurally.
- Negative: an available live root with a missing or symlink-drifted required subpath rejects in live mode.

### `R4A-RR17-IMMUTABLE-03` — SUSTAIN

The immutable binding is copied from its source at `tools/consumer-universe-return.mjs:60-67`; lines 70-111 validate shape, not independent provenance. In immutable mode:

- Current schema, resolver, and registry hashes are compared only in the live branches at lines 368-372.
- Lines 510-512 reuse the identities claimed by the receipt.
- Lines 517-542 compare the supplied binding with an expected binding built from that same receipt.
- `tools/validate-return.mjs:943-950` supplies a binding projected directly from the candidate `consumerAnnex`.

Thus a coherent change to a claimed resolver/schema identity, receipt hash, receipt file hash, annex, and outer self-hash is compared with itself. Historical modes use the same annex-derived call; materializing only the bounds authority does not authenticate the named resolver and schemas. Current schemas are also applied unconditionally at `consumer-universe-return.mjs:341-362`, allowing later schema bytes to change archived acceptance.

The same self-derived pattern appears in deletion validation at `tools/deletion-judgment.mjs:312-320,370-378`.

**Minimal repair:** require an expected immutable binding from an independently content-addressed predecessor, pin, or certificate. Historical modes must authenticate/materialize the exact resolver, input schema, receipt schema, registry, and authority bytes named by that binding. A candidate annex may be compared with the external binding but may not create it.

**Required controls:**

- Positive: an unchanged archived receipt validates against its unchanged external binding after current tool/schema bytes advance.
- Negative: change one captured resolver or schema identity, coherently rehash the receipt, annex, and return, and require rejection against the unchanged external binding.
- Negative: substitute or corrupt one materialized historical tool/schema byte and require rejection.
- Negative: missing, annex-derived, or partial external binding must reject.

### `R4B-RR17-PROJECTION-01` — SUSTAIN

The complete immutable identity is enumerated at `tools/consumer-universe-return.mjs:30-51`. The top-level C05 annex is verified at `tools/validate-return.mjs:943-957`, and deletion `consumer_scan` is separately verified at `tools/deletion-judgment.mjs:312-337`.

Their only cross-annex join, however, is `tools/validate-return.mjs:1159-1163`, which compares only:

- `receipt_hash`
- `epoch.epoch_sha256`

A read-only algebraic probe used two otherwise identical complete bindings whose only difference was `receipt_path`. The current two-field guard evaluated true while the complete immutable projections evaluated unequal. Two byte-identical receipt files at different absolute paths therefore satisfy both local validators and the current join despite violating the promised same complete projection. An alternate authority identity with identical semantic bounds has the same defect.

**Minimal repair:** project both sides through `consumerUniverseImmutableBindingProjection` and compare the entire canonical result. Keep deletion’s phase-specific `authority` field as a separate exact check.

**Required controls:**

- Positive: byte-identical complete top-level and deletion projections pass.
- Negative: identical receipt bytes at two paths reject.
- Negative: alternate authority path or authority-file hash with identical bounds rejects.
- Negative: table-drive every immutable field so a one-sided change rejects.

### `R4B-RR17-DELETION-EPOCH-02` — SUSTAIN

`tools/validate-return.mjs:1106-1117` correctly chooses immutable consumer validation and disables resolver rerun for offline/historical modes. Deletion judgment then leaves the captured epoch:

- `tools/deletion-judgment.mjs:177-218` scans each original `canonical_realpath` using current `git ls-files -co` and current `readFileSync` bytes.
- `tools/deletion-judgment.mjs:540-574` calls `liveCasualtyHits` unconditionally, without consulting `consumerValidationMode`.
- The historical receipt’s `root.head` and `dirty_sha256` are not used to select the scanned bytes.

One detail in Skeptic B is imprecise: `tools/deletion-judgment.mjs:415-428` checks ancestry against the captured consumer `root.head`, not the checkout’s present `HEAD`. That does not cure the unconditional current-working-tree casualty scan.

**Minimal repair:** pass deletion judgment a content-addressed root-snapshot mapping. In historical mode scan materialized worktrees at each authenticated captured HEAD; if dirty or untracked state is permitted, materialize and authenticate those exact captured bytes as well. Never dereference the original mutable checkout for historical casualty results.

**Required controls:**

- Positive: capture at H, advance the live root to H+1 and add both tracked and untracked tombstone matches; historical output must remain byte-identical to H.
- Positive: live validation at H+1 must detect the new matches.
- Negative: omitted root mapping, wrong HEAD, wrong dirty digest, or changed snapshot byte must reject before scanning.
- Positive: run the post-epoch invariance case through both the shared Value and Keyframes deletion compositions.

### `R4B-RR17-SOURCE-03` — SUSTAIN

The tokenizer emits `?.` at `tools/resolve-consumer-universe.mjs:743-746`, while bare CommonJS loading is recognized only for `require` immediately followed by `(` at lines 917-924. No branch handles `require?.(`.

The exact valid probe

`require?.("@mkbabb/value.js");`

called a supplied `require` function once at runtime, while `staticImportProjection` returned `[]`. Ordinary direct `require(...)` produced one runtime edge, and `loader.require?.(...)` correctly produced none. The direct optional call is therefore silently lost rather than observed or rejected.

**Minimal repair:** recognize optional calls to bare `require` with exactly one bounded literal argument as `runtime`; reject computed or unsupported optional-call forms. Property calls remain non-edges.

**Required controls:**

- Positive: bare `require?.("@mkbabb/value.js")` yields exactly one runtime edge.
- Non-edge: `loader.require?.("@mkbabb/value.js")` yields none.
- Negative: computed or multiple optional-call arguments reject.
- Negative: omitting the observed edge or declaring it as `dynamic`/`type` makes the full resolver exit nonzero.

## Required disposition and credit

One parser repair can close both source findings; one independently rooted immutable-binding design can support the C05 equality fix; structural authority and historical casualty scanning still require separate removal of live-state dependencies.

After repair, refresh every affected identity and corpus epoch and run a wholly fresh hostile pair and adjudicator. Until that succeeds:

- Production execution remains **0/190**.
- Whole-formation clean-pass credit remains **0/2**.
- Focused R4 closure credit is **zero**.
- C05 may not advance, and neither whole-formation clean triad may begin.
