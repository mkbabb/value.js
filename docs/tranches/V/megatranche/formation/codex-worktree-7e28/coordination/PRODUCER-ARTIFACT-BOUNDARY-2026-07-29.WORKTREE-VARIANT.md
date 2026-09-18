<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md
  original-mtime: 2026-07-29T17:34:04
  original-sha256: 91b9a0cee734e42229fe35d67f03c8c00b3a88552cac8b3b463cc38382d15c0e
  original-bytes: 3463
  ruling: ADOPT-COPY-AS-VARIANT — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes (3463) bytes of this file.

  COLLISION RULING (M-21 C-11, 2026-08-03):
  Two documents share the name docs/tranches/V/megatranche/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md
  with different bytes:
    - repo of record: 5661 bytes, sha256 1450204640b34362dca019a3e6cb6721c7f0bdf7c208aec6ce7ddb2462c9e4e9
      ("Producer artifact boundary — Glass, Value, and Keyframes": the full terminal-findings
      evidence packet — isolated watch reproduction, exact dependency census, acceptance delta);
    - 7e28 worktree: 3463 bytes, sha256 91b9a0cee734e42229fe35d67f03c8c00b3a88552cac8b3b463cc38382d15c0e
      ("Producer Artifact Boundary — Value Receiver": a Codex-authored downstream receiver digest).
  THE REPO-OF-RECORD VARIANT GOVERNS. Grounds: (1) the worktree variant's own header names the
  repo-of-record path as its "Upstream durable evidence" — by its own testimony it is derivative;
  (2) the record variant is the fuller upstream evidence packet from which the receiver digest
  condenses; (3) under M-21 §2 the Codex-authored receiver's forward bindings (the V.H1/V.G1
  wave-receiver assignments) are audit subjects, not standing authority. The worktree variant is
  preserved here under the disambiguated name PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.WORKTREE-VARIANT.md
  as a distinct derivative document, NOT as a competing version of the record file; any content in it
  that the record lacks (the V.H1/V.G1 receiver split, the Glass-8 candidate-pack admissibility
  language) binds nothing until re-ruled by a live formation.
-->
# Producer Artifact Boundary — Value Receiver

Date: 2026-07-29
Status: FORMATION AUTHORITY; no producer or product source edit
Upstream durable evidence: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md`

## Accepted facts

### Glass

At Glass coordinate `77540ffd21253f0668acdb779f6a047cce82f26d`,
an isolated first `vite build --watch` emitted:

```text
dist/glass-ui.js          present
dist/styles/index.css     present
dist/component-styles.css missing
dist/index.d.ts           missing
dist/slider.d.ts          missing
```

The watch path runs Vite without the full declaration/component-style
projection. Standalone style/font inputs are also outside a proved complete
watch lifecycle.

Value’s concrete false-green receiver is `scripts/dev/dev.sh:165-176`: it marks
the sibling ready solely when `dist/glass-ui.js` mtime advances. That signal
must be `SPLIT` into a complete immutable artifact-set receipt after the
existing Glass producer row lands. A complete receipt covers every exported
JS, declaration, CSS manifest, copied style, and font target and advances for
standalone public style/font changes. A failed/incomplete pass emits no ready
receipt.

An exact immutable Glass 8 candidate pack may support Value development if its
manifest proves the complete JS/declaration/CSS/style/font closure. Final V.G1
and Value release closure require the **published immutable Glass 8** tag,
commit, tarball SHA, complete manifest, and mutation-closure receipt. A
candidate pack, full mutable `npm run build`, `build:watch`, mutable workspace
bytes, or the JS mtime alone cannot close release consumption.

### Keyframes

The phrase “Keyframes dist trails source” is `PRUNE`. Independent source/dist
comparison found the consumer-relevant public bytes consistent with the
annotated-but-cryptographically-unsigned `v6.0.0` tag object
`26190755ce1e57c54cb14ef0a454ae02ed2b3da0`, commit
`5a9183a7afe24702081a7b87c8adc7286ddce9a0`, and current coordinate
`8281638c0ac4ac8c54a67a018ca5bf6a9117174f`. None is an exact pack receipt.
Value requires Keyframes W3’s immutable tarball SHA and tier/evaluation receipt
for its bounded consumer proof but books no producer repair.

## Dependency classification

| edge | product `src` executable imports | published non-`gh-pages` `dist` executable imports | demo/build executable imports |
|---|---:|---:|---:|
| Glass | 0 | 0 | 119 ESM declarations / 79 files + 2 CSS imports / 1 file |
| Keyframes | 0 | 0 | 0 |

A raw Glass-reference search returns 82 paths, but that denominator includes
`DESIGN.md` and comment-only `animations.css`. It is recorded as a raw-reference
count, not described as executable “use.”

Terminal package disposition:

- Glass `dependencies` → `devDependencies` because the consumer is demo/build
  only;
- Keyframes manifest and lock entries → `PRUNE`;
- packed Value tarball → proves neither producer is a runtime edge;
- no source alias, copied CSS, compatibility export, or mutable version label.

## Wave receiver

- V.H1 owns manifest/lock classification and the Value readiness-signal split.
- V.G1 owns the published immutable Glass 8 receipt, Keyframes W3 tarball SHA,
  and packed Value no-runtime-edge proof. Candidate Glass packs are
  development-only.
- Glass owns the producer lifecycle cure in its already-existing row.
- Keyframes has no producer-repair receiver from this evidence.
