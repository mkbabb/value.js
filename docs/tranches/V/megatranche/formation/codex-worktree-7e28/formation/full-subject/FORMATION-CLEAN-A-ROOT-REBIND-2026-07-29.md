<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/FORMATION-CLEAN-A-ROOT-REBIND-2026-07-29.md
  original-mtime: 2026-07-29T20:36:58
  original-sha256: c714359be1ac31da3f138620e796c1b2267c79dd48d5f5c1d35bde2976c2a3f2
  original-bytes: 1840
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value formation replacement Clean A — root rebind receipt

Date: 2026-07-29
Mode: formation-only boundary receipt
Verdict: **REPLACEMENT CLEAN A SATISFIED; CLEAN B BLOCKED**
Execution credit: **0**

Root accepted owner intake
`56afeefd065edc26b7f4da75d7723f57a4f56faced41b95a432f80e3f8b82bc4`
and bound replacement `V.form.cleanA` to:

```text
2a3d42f98e7618aba3caffba032d18f36fe48f51b75eeaeded022e413ba5a031  CLEAN report
14bb61c318af79736b25590eee394a3cb6482097e16b23a809b0794d08d481eb  validation
13c86d9ddd9c5ad669c8ce6d50c128b3cbb6f4e4c435dcce853c94c3ab9bfccc  receipt
```

The node is satisfied only from both required inputs:

```text
V.form.P3
V.form.packet-post-CA01
```

Final P3 remains `00fd0b79…`. The post-CA01 node binds packet `359262b6…`,
surface `f9a98d7d…`, manifest `fa2c4959…`, absorption validator `838c01c1…`,
and owner absorption receipt `6521250d…`.

The first Clean A `AMEND` remains preserved separately as
`V.form.cleanA-first-amend`. It is superseded and feeds only a non-satisfying
edge into the post-CA01 absorption node. It cannot supply positive audit,
admission, rehash, or execution evidence.

The exact post-intake root tuple is:

```text
ba9603518232a5d16cf42e3e6fc53c59675bffa77a998a26390dc675e6f94ce1  graph JSON
1163797017f32a4b95480f0a1f374bb6c61206dec35347613a15edc19d3ee07c  graph Markdown
6f9358a4417032b7d34b62480400a6c46bbe48a4989d9e7e4bab1ec870636208  validator
2e535dfa03307c3163f51ef2e5f24b71a7ea58d20956a185ea378436b601bafc  validation receipt
```

Root validation is green: 130 nodes, 177 edges, M01–M21 all rejected, JSON
parse and diff-check green.

`V.form.cleanB` remains blocked. It may open only through a genuinely later
fresh audit bound to this exact post-Clean-A tuple. No product implementation,
release, or execution credit follows from Clean-A satisfaction.
