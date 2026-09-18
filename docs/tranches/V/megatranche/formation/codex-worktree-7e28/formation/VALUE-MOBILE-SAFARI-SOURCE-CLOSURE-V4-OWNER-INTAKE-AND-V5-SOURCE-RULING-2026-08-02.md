<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V4-OWNER-INTAKE-AND-V5-SOURCE-RULING-2026-08-02.md
  original-mtime: 2026-08-02T14:01:59
  original-sha256: 26e3bbc50a14f06a2b2cfcd1e692f99efce3489ddc3ff68914ce3f44ab2e9921
  original-bytes: 10162
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value Mobile/Safari source-closure v4 owner intake and v5 source ruling — 2026-08-02

## 0. Terminal ruling

**V4 terminal:** `AMEND / SOURCE-ONLY RED`

**V5 ruling:** `FRESH NON-OVERLAPPING SOURCE-ONLY COORDINATE AUTHORIZED`

Authority remains `NONE`. This receipt grants no materialization, source
execution, Browser, Safari, Simulator, API, Docker, package, product, parser,
release, rebind, admission, or constellation credit.

The v4 source root is frozen unchanged. Same-root repair, execution, review
continuation, cleanup, replacement, or reseal is forbidden. This intake
authorizes only a separately rooted inert v5 source architecture. It does not
create that architecture or authorize a task.

## 1. Independent Pass-A authority

This owner intake consumes only `PA-VALUE-01` from the independently sealed
Constellation source-audit Pass A packet:

| Artifact | SHA-256 |
|---|---|
| `AUDIT.md` | `9f9080d49dcb538b2f356efee98049d9ecec21f3b8386473ccffc85493366fe6` |
| `FINDINGS.json` | `12be879f31136beabc9c10a94d752bd6aa3d8fb861b03d8fb26ba644b5ea9445` |
| `OWNER-ROUTING.json` | `ef1f318d9148f54902217c544369b926ee2c7a9dd4a236595e37073dddaf10fe` |
| `CHECKSUMS.sha256` | `bc8c535a028a352ede1b86709280fd743750b7bfc657855a043106b92211ae1f` |

The packet is `TERMINAL_SOURCE_PASS_A / OWNER_ROUTING_READY`, authority none,
and records zero source, product, Browser, Simulator, Safari, API, package,
release, rebind, and constellation credit. Parser development remains paused
under handoff
`ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7`.

## 2. Exact frozen v4 census

Frozen root:

`docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v4-source/`

It contains exactly two regular files, no child directories, symlinks, or
special files, and 59,132 regular-file bytes. Both files are mode `0644` with
nlink `1`.

| File | Bytes | SHA-256 |
|---|---:|---|
| `preflight-value-mobile-v4.mjs` | 49,846 | `8b345aa5cca0ca0125bebc6809515c579dc10b8d13f22be4f895c9377e3e34fa` |
| `SOURCE-READY.md` | 9,286 | `407450d70e9d7207ad3a369963bc246cd06d8127f9d52a4c8132b874a936ef99` |

The SHA-256 of the codepoint-ordered, newline-terminated census rows
`basename<TAB>bytes<TAB>mode<TAB>nlink<TAB>sha256` is:

`d2fc3856f96796b070c34350b800a0ec0bc73f2cb45954bb122ac5467d8fb0c0`

These bytes are retained only as negative source evidence.

## 3. First material falsifier

`preflight-value-mobile-v4.mjs:425-439` authenticates the outer
`SOURCE-SNAPSHOT.json` file, parses it, and then constructs the member manifest
from each parsed row's stored `sha256` and `bytes`. Downstream derivation reads
the same row's embedded `content`, but v4 never derives the member byte length
and SHA-256 from that content and never proves that the stored metadata names
the bytes being consumed.

A self-inconsistent member can therefore cross the authority boundary while
the outer snapshot pin, stored-member manifest, file count, and stored byte
sum remain internally consistent. This is
`PA-VALUE-01 / SNAPSHOT_MEMBER_BYTES_NOT_REAUTHENTICATED` and is the terminal
v4 first RED.

The frozen snapshot confirms the scope of the defect:

- 310 member rows and 2,341,009 claimed member bytes;
- 304 `utf8` rows with embedded string content;
- six `binary-hash-only` rows whose embedded content is empty;
- authenticated entry `demo/color-picker/index.html`, 13,165 bytes, SHA-256
  `c8d073bda8d6dee378c7f05e6b9365364ddf742563f0650225ad2aaaf2935a0d`.

The six hash-only rows mean the current snapshot cannot prove the complete
310-member byte domain merely by adding a text-content hash loop. A successor
must receive the actual binary bytes through the same immutable snapshot or a
separately authenticated, exactly joined binary-byte pack. An empty
`binary-hash-only` content value is not member-byte authority.

## 4. Terminal dispositions

- **KEEP** the two v4 files and the v3 snapshot as immutable negative evidence.
- **FOLD** `PA-VALUE-01` and the six hash-only member observation into v5's
  born-RED authentication boundary.
- **PRUNE** v4's source-ready status, same-root repair, and any positive
  inference from its outer snapshot pin or stored member metadata.
- **SPLIT** member-byte acquisition/authentication from all route, mount,
  state, design, and Kronecker derivation.
- **MOVE** materialization, independent reviews, Apple-platform execution, and
  every product action behind later explicit owner releases.

No v3 or v4 denominator is promoted by this ruling.

## 5. Authorized v5 source-only coordinate

The only authorized successor root is:

`docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v5-source/`

It may contain exactly two inert regular `0644`/nlink-1 files and no child
nodes:

1. `preflight-value-mobile-v5.mjs`
2. `SOURCE-READY.md`

V5 authoring is tranche-source work only. Its author may not run Node, import
or parse the source, generate a registry, read product files outside the
authenticated immutable input, or invoke Browser, Safari, Simulator, API,
Docker, package, product, parser, release, or network tooling. A first
material source-review RED freezes v5 without same-root repair.

This ruling does not dispatch or create a source writer. It only makes the
fresh coordinate lawful for a later explicitly routed authoring turn.

## 6. V5 member-byte authentication contract

V5 must place one immutable `authenticateSnapshotMembers` boundary before any
route, component, mount, state, D1/D2, equivalence, or Kronecker derivation.
That boundary must:

1. authenticate and read the outer snapshot exactly once;
2. validate a closed member-row schema and reject unknown or missing fields;
3. exact-compare the codepoint-ordered 310-path membership against a
   source-owned membership authority independent of the snapshot's own count;
4. reject missing, extra, duplicate, replaced, ambiguous, and reordered
   members before building a lookup;
5. decode every member's actual bytes from a closed `utf8 | base64` encoding,
   then recompute its byte length and SHA-256 from those decoded bytes;
6. exact-compare recomputed length and SHA-256 with the authenticated member
   declaration and derive the canonical member identity from recomputed facts;
7. carry kind, mode, nlink, path, encoding, decoded-byte length, and decoded
   byte SHA-256 into a domain-separated member identity;
8. require actual byte-bearing authority for all six binary members; an empty
   hash-only placeholder must fail before derivation;
9. recompute the member-manifest root and total byte count solely from the
   closed, byte-derived member identities;
10. authenticate `demo/color-picker/index.html` from its decoded bytes and
    exact path rather than from stored metadata alone;
11. freeze the resulting member view and expose only that view to downstream
    derivation; direct reads of raw parsed snapshot rows are forbidden; and
12. fail before any aggregate is emitted when any byte, membership, encoding,
    identity, or root proof is absent.

The minimum own-reason hostile set is: member-content mutation with unchanged
metadata; wrong stored SHA; wrong stored byte count; path replacement at
constant count; missing/extra/duplicate/reordered member; invalid UTF-8 or
base64 encoding; Unicode character-count substituted for UTF-8 byte count;
empty/malformed/swapped binary content; entry-content mismatch; recomputed
root mismatch; and a downstream raw-snapshot-row bypass.

Every control must disable or corrupt one real production-consumed leaf and
retain all nonowners. Count-only, caller-supplied truth, and generic failure
codes are insufficient.

## 7. Carried source-closure law

Except for the strengthened byte/member boundary, v5 carries the full v4 and
V.MSK1-V.MSK5 source law unchanged:

- 14 named routes plus one wildcard;
- 88 physical workflows, 33 page roles, 21 layers, and 157 semantic roles;
- 25 visual barrel declarations;
- 115 declaration, 126 static, and 11 pane-dynamic edges;
- 13 dynamic `:is` sites, two teleports, and exact VC-036/VC-049 harnesses;
- 1,272 historical instance seeds retained as born-RED pending exact
  edge-bound provenance replay;
- D1 157 and independently authored D2 157;
- 137 named state coordinates and 21,509 applicability decisions;
- exact page -> state -> execution-subject joins, edge-bound instance identity,
  parsed interactions, dynamic/portal dispositions, and no borrowed layer
  state;
- raw-first receipts, two independent hostile source readings, fresh
  adjudication, and node -> tree -> checksum-last sealing only after a
  separately authorized materialization; and
- real iOS Mobile Safari and installed desktop Safari execution remain later,
  independently authorized gates.

The prospective 1,343 execution subjects and 2,686 platform blocks remain
conditional on exact replay retaining all 1,272 instance seeds. The final
Kronecker and Apple-platform denominators remain `OPEN`.

## 8. Unchanged denominators and credit

| Boundary | Current value |
|---|---:|
| Value non-parser formation specification | 11/11 |
| workflow specification / historical exact evidence | 88/88 / 72/88 |
| D/L/C specification / historical exact evidence | 264/264 / 218/264 |
| Value parser-law chronology | 14/34, paused |
| V.MSK1-V.MSK5 accepted source closure | 0/5 |
| owner-accepted mobile source coordinates | 0 |
| real iOS Mobile Safari executions | 0 |
| installed desktop Safari executions | 0 |
| Browser/API/Docker/package/product executions | 0 |
| visual/product/release/rebind/admission/authority credit | 0 |

The Value real-Safari and final Kronecker denominators remain `OPEN`. This
ruling changes no formation percentage and grants no retrospective credit.

## 9. One-way root receiver

The only positive dependency route created here is:

`Pass-A PA-VALUE-01 -> this owner intake -> future frozen v5 source bytes -> two independent source reviews -> owner source acceptance`

Until every later stage exists and is explicitly accepted, the cross-repository
Value input slot remains null. Owner source acceptance would still authorize no
materialization or Apple execution; each requires its own later release.
