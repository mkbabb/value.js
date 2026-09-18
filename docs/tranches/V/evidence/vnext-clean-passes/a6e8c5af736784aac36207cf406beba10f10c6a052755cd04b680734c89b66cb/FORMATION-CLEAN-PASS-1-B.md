# Formation Clean Pass 1 — Critic B

- Epoch: `a6e8c5af736784aac36207cf406beba10f10c6a052755cd04b680734c89b66cb`
- Pass / role: `1 / critic_b`
- Task: `vnext_clean_p1_critic_b_57c1c7c6b06c92593f985dfb603fbac84d208073fddceaf2cb8264a2d53bf001`
- Prompt SHA-256: `57c1c7c6b06c92593f985dfb603fbac84d208073fddceaf2cb8264a2d53bf001`
- Requested route: Sol-ultra.
- `model_served` evidence: session route identifies `gpt-5.6-sol`, reasoning effort `ultra`.
- Corpus integrity: pre-audit and post-audit `tools/corpus-epoch.mjs` both reported 160 files and the frozen epoch.
- Git/files: no repository or sibling-repository mutation. One temporary file was created under `/tmp` and removed.

## Coverage dispositions

1. `api-closure` — **FINDING**: missing authority artifact is accepted by focused and aggregate gates.
2. `architecture-dags` — no separate surviving defect; aggregate validation reported 193 waves, 797 edges, five current graphs and exact target manifests.
3. `consumer-universe` — no separate surviving formation defect; bounds authentication passed and live resolution remains born RED at C00U/C05.
4. `deletion-truth` — no separate surviving defect after schema, return-annex, owner-precut and C05/C10 inspection.
5. `design-mobile-desktop` — no separate surviving defect; mobile/desktop evidence remains a future born-RED obligation.
6. `gate-soundness` — **FINDING**, same API-authority mechanism.
7. `parser-boundary` — no separate surviving defect; published `@mkbabb/parse-that@1.0.0` remains isolated and coordination drift is disclosed and routed to P00/P01.
8. `prompt-seed-bijection` — no surviving defect; aggregate gate reported 149/149 seed requirements and 114 union rows.
9. `quarantine-safety` — no surviving defect; the corpus walker refuses the forbidden basename before traversal and no corpus symlink exists.
10. `return-dependency-closure` — no separate surviving defect; the universal validator is honestly RED, assigned to P00 first landing, with dependent roots behind P00.
11. `state-routing` — no separate surviving defect; route/state ownership and bounded hostile decoding are explicit.
12. `wave-formation` — no separate surviving defect, but formation cannot close while the finding survives.

## Finding family

### F-B-01 — API authority-path closure is not enforced

- Mechanism: `API-TARGET-PATHS.json` declares an adjudication document as authority without binding its existence or content; the focused validator ignores that field.
- `API-TARGET-PATHS.json` contains `"adjudication":"reviews/A-ADJUDICATION.md"` inside its authority object.
- `test -e docs/tranches/V/vnext/reviews/A-ADJUDICATION.md` exited `1`: the artifact is absent.
- `node docs/tranches/V/vnext/tools/validate-api-target-paths.mjs` nevertheless exited `0`.
- `node docs/tranches/V/vnext/tools/validate-corpus.mjs` also exited `0` and reported `status:"complete"`.
- Inference: either the pointer is stale historical custody and invalid as current authority, or a required current artifact is missing. In both cases API closure is unsupported.
- Owner: **A26**, which owns API target topology and closure. The formation gate must also fail on an absent or hash-drifting authority input.
- Required disposition: remove the stale authority claim or replace it with present, content-addressed current authority, and make the validator reject missing or drifting authority inputs.
- Defect vectors: one finding family; one unsupported authority claim; no orphan demand.

## Commands executed

- Pre/post corpus epoch, aggregate corpus validator and focused API target validator.
- Read-only `rg`, `sed`, `nl`, `jq`, byte budgets, wave/deferral/authority probes, pruned repository discovery and symlink inspection.
- `test -e` for the declared adjudication artifact.
- One temporary JSON file removed after inspection.

Verdict: NOT_CLEAN
