# H.W0 HEADLINE — open + 6 audits + plan substrate + ratification ask

**Opens after**: H open (the canonical 6-agent-audit invocation).
**Agents**: 6 read-only audit agents (DONE).
**Status**: in-progress (closing on ratification ask).

## Scope

Open Tranche H. Six parallel read-only audit lanes run; the orchestrator synthesizes their findings into H's plan substrate + relays carry-forward items to the user for explicit ratification per G1.

## Audit lanes (6, DONE)

1. **H-AUDIT-1** — prompts + precepts recap. 27 cumulative prompts; 8 silent-gap candidates; ALL precepts/invariants HOLD. (`audit/H-AUDIT-1-prompts-precepts.md`)
2. **H-AUDIT-2** — deferred-items ledger. 22 H-disposition entries; 9 chronic at 6-tranche carry (the doubled-clause emphasis bucket). (`audit/H-AUDIT-2-deferred-ledger.md`)
3. **H-AUDIT-3** — state-at-H-open. 15/15 gates PASS; bench medians within noise of G close; zero drift. (`audit/H-AUDIT-3-state-at-H-open.md`)
4. **H-AUDIT-4** — cross-repo state. ZERO-mutation G→H boundary; AL opened at speedtest (planning-only); value.js confirmed sole-identified-consumer of glass-ui/MetaballCanvas. (`audit/H-AUDIT-4-cross-repo-state.md`)
5. **H-AUDIT-5** — library + demo + api architecture. 9 H-OPP candidates; substrate cleaner than at G open; `Color<T>` deeper restructure REJECTED. (`audit/H-AUDIT-5-architecture.md`)
6. **H-AUDIT-6** — api + e2e + CI hygiene. DEFECT: createPalette + patchPalette withTransaction miss; top candidates surface for H.W1-W4. (`audit/H-AUDIT-6-api-e2e-ci.md`)

## Plan substrate (DONE)

`H.md`, `H-PROMPTS.md`, `findings.md`, `coordination/Q.md`, `dispatch/AGENT.md`, `waves/H.W0..H.W5.md`, `PROGRESS.md`.

## Ratification ask (G1 binding — outstanding)

Per `H.md §7`, 5 ratification blocks (A-E):
- **Block A** — 9 chronic 6-tranche-carry items: 4-option ask (continue / re-frame / propose API shapes / selectively retire). Recommended combination per H-AUDIT-2.
- **Block B** — 6 FOLD-INTO-H items (H.W1-W3 lanes).
- **Block C** — 5 micro-polish FOLD items (H.W4 lanes).
- **Block D** — PEER-AUTHORSHIP carry-forwards under the chosen Block-A Option.
- **Block E** — release version: v0.10.0 (default) vs v1.0.0 (declare stable public API).

H.W0 closes on user ratification. H.W1+ DOES NOT DISPATCH until ratified.

## File bounds

- All `docs/tranches/H/*` artefacts (planning-only).

## Gate

H.W0 closes when:
- All 6 audit docs landed.
- Plan substrate authored (H.md + findings.md + Q.md + AGENT.md + 6 wave specs + PROGRESS.md).
- User ratification received for the 5 blocks.

## Commit plan

- `docs(tranche-h/open): open Tranche H — cascade-correctness + type-II + demo-decomp + invariant-codification-II (planning-only)`
- (subsequent) `docs(tranche-h/w0-close): user ratification received — H.W0 closed, H.W1 unblocked` — authored after the user response.

## Dependencies

- Depends on: G close (`docs/tranches/G/FINAL.md`; merge `e166d37`; tag `v0.9.0`).
- Blocks: H.W1+ (until user ratification per G1).
