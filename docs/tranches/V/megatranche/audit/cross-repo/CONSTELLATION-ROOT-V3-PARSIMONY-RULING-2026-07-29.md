# Constellation root v3 parsimony ruling

Date: 2026-07-29

Status: **FORMATION DESIGN RULING — NO RESEAL — ZERO EXECUTION CREDIT**

This ruling fixes the smallest admissible shape of the next root formation
authority. It does not amend the current root DAG, admit parse-that or Fourier,
start product execution, or close the constellation.

## Why v3 is required

The current root quartet remains a historical R2 boundary:

- 130 nodes;
- 177 edges;
- 29 executable mutants.

Independent hostile audits found that 137 of the 177 edges merely repeat
intra-repository topology. The JSON also carries 311 null fields, 100 empty
arrays, 100 empty evidence lists and 44 planned nodes. Mutant descriptions are
duplicated in the graph, validator and receipt. Mutable prose mirrors have
already drifted while the underlying repository receipts remain sound.

More importantly, the current validator has reproduced false greens:

1. evidence is rehashed only for satisfied nodes;
2. Keyframes' signed six-node binding is not consumed;
3. typed zero-credit validation is Value-specific;
4. fresh adjudication can replay its predecessor;
5. rejected Fourier endpoints remain on positive paths;
6. the candidate graph supplies parts of its own validation contract;
7. a mutant may pass by failing for the wrong reason;
8. `V.form.packet-candidate` cites bytes that no longer exist at its path.

The full evidence is preserved in
`CONSTELLATION-ROOT-DAG-R2-FALSE-GREEN-AUDIT-2026-07-29.md`, SHA-256
`d44c01b43b8d50ebaa42e423acd75649563c571a6568f1a5802534c8666f0442`.

## Terminal design

The v3 root authority consumes repositories; it does not reproduce them.

```text
coordination/
  ROOT.md
  FORMATION.json
  EXECUTION-CONTRACTS.json
  validate.mjs
  HISTORY.jsonl
  FINDINGS-AND-HANDOFF.md
audit/cross-repo/bindings/
  value.json
  keyframes.json
  parser.json
  fourier.json
```

The names above describe responsibilities, not permission to create parallel
copies prematurely. Promotion is one atomic replacement after every required
repository binding exists.

### FORMATION.json

It contains only:

- one externally hashed formation-admission binding per repository;
- the exact four repository-admission inputs to root Clean A;
- root Clean A;
- genuinely later root Clean B;
- one final all-evidence rehash;
- constellation formation close.

Repository pass, component, wave and execution DAGs remain authoritative only
in their owning repositories.

### EXECUTION-CONTRACTS.json

It contains only cross-repository contracts:

- parse-that candidate, Value and JSON consumption, release and rebind;
- Value CSS/path surface to Keyframes;
- immutable Value/Glass/Keyframes consumer packs;
- Fourier consumer tuple;
- conditional Atlas receipt;
- BBNF receipt after `V.L6.css-path-abi-freeze`.

No same-repository execution topology belongs here.

## KEEP

- Repository-owned full-subject `P1 → P2 → P3 → Clean A → Clean B →
  admission`.
- Exact evidence hashes, denominators, born-RED gates and ownership.
- Value formation binding
  `a27d72a4aac639995f45959aa4086b423db04c5b633b45b1eccfa3140baa44ad`.
- Keyframes formation binding
  `8c4177b29e0024616a732e33a64b74539200a181d0fdc0aad1503cc2323ff7a9`.
- Parser corrected P1 root intake
  `abc9479d7ea5fa4c76deca752428faf8b332f280e6e637de12b12b25e8e2ad6c`,
  as P1 reconciliation only.
- Fourier N-P3 record as a record input only.
- π/DELTA manifests, internal-Browser obligations and frontend-design
  acceptance contracts.
- Parse-that's every-scale and every-result-plane `>=10x` proof law.
- Root `Clean A → Clean B → rehash → formation close`.

## FOLD

- Repository pass nodes in the root graph into one signed admission binding
  per repository.
- Repeated root copies of repository wave DAGs into links to the owning wave
  specifications.
- Value CSS candidate capability nodes into one typed candidate-surface
  manifest.
- Keyframes W10 consumer craters into one typed consumer-receipt manifest
  with distinct demo, Glass, Atlas and Slides rows.
- Repeated parser status prose into one current machine ledger and one resume
  handoff.
- Repeated Fourier wave boilerplate into inherited law in `N.md`; each wave
  keeps only its unique mechanism, files, dependencies and gates.

## MOVE / SPLIT

- Split root formation authority from future execution authority.
- Move task IDs, model-seat rosters, dispatch chronology and recovery
  instructions to a non-authoritative orchestration handoff.
- Move rejected Fourier prototype chronology to Fourier's terminal ledger.
  Root consumes only the eventual accepted inventory and provenance
  adjudications through Fourier's admission binding.
- Split parser formation from the immutable-pack and consumer execution
  sequence.
- Move Fourier inventory/graph archaeology into formation; source deletion or
  transposition remains with the owning execution wave.

## PRUNE from the active closure path

Historical bytes remain available through append-only coordinates.

- `V.form.packet-candidate` and its edge.
- Prior Value Clean A/B and the first Clean-A AMEND nodes.
- Rejected and superseded Fourier prototype iteration nodes.
- Same-repository execution nodes that are not cross-repository contract
  endpoints.
- Hand-maintained root Markdown topology.
- Mutable session and peer registries as sources of authority.
- The fixed “exactly 29 mutants” gate.
- Candidate-owned validation contracts.
- Hard-coded mirrors of facts already signed by repository bindings.
- Process-only formation waves, vanity count preservation and proof apparatus
  without a live defect or acceptance consumer.

## Validator law

The v3 validator must:

1. pin its schema and contracts outside the candidate;
2. rehash every nonempty evidence reference in every state;
3. rehash every nonempty artifact or receipt evidence path/hash pair;
4. hash each repository binding once and validate its closed node projection;
5. require Boolean credit fields and exact zero execution, product, visual,
   release and constellation-close credit at repository formation admission;
6. bind every fresh adjudication to one exact predecessor candidate;
7. reject reused predecessor evidence as adjudication evidence;
8. permit positive prototype/adjudication edges only from satisfied endpoints;
9. reject positive edges from rejected or superseded evidence;
10. generate mutants from invariant families;
11. require each mutant's exact diagnostic code;
12. generate human-readable views from the machine authority rather than
    maintaining a second topology.

## Current safe boundaries

### Value

Repository formation is admitted through R2. The obsolete packet-candidate
node is terminal PRUNE. No Value execution credit follows.

### Keyframes

Repository formation is admitted through binding `8c4177b2…`. W1 and all
product, visual, package, deployment, release and W13 close credit remain
future execution.

### Parse-that

P1 reconciliation is safe. P2 remains active. P3, whole-subject proof,
Clean A/B and admission remain open. `NO RELEASE`.

### Fourier

The N-P3 record is safe as a record only. A3 and earlier inventory
adjudications are negative evidence. A4-or-later inventory adjudication and
reseal-C-or-later provenance adjudication must each be accepted by a fresh Sol
critic before they can feed Fourier P3.

## Promotion conditions

Do not create or promote the v3 quartet until all are true:

1. parse-that has an admitted formation binding;
2. Fourier has an accepted inventory Sol endpoint;
3. Fourier has an accepted provenance Sol endpoint;
4. Fourier P3 and genuinely later Clean A/B are admitted;
5. parser and Fourier bindings expose typed zero-credit;
6. Value and Keyframes bindings rehash unchanged or are explicitly
   superseded;
7. stale coordination prose is marked archaeology or regenerated;
8. the complete v3 mutant suite fails for its own reasons;
9. an independent Clean A audits the exact v3 bytes;
10. a genuinely later Clean B audits the post-A bytes.

Only then may the final all-evidence rehash feed constellation formation
close. Product execution remains a separate lifecycle.
