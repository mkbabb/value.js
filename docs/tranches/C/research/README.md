# C — Research (joint with fourier-B)

value.js-C does **not** dispatch its own research wave. The cohort's research is *joint*, dispatched from fourier-B and scoped to cover both repos:

> `~/Programming/fourier-analysis/docs/tranches/B/research/README.md`

Three of the six joint lanes touch value.js directly:

- **R2 — value.js CRUD surface, library and api.** Maps `src/` colour/palette surface; confirms the `colorScale` + `sampleToSVGPath` gaps; reads `api/src/routes/{palettes,colors,sessions,admin}.ts`, `slugWords.ts`, `migrate-slugs.ts`, `migrate-oklab.ts`, `hash.ts`, `cron.ts`, `db.ts`, `types.ts`, `middleware.ts`. Proposes the precise `Palette` type satisfying cohort invariants 14, 15.
- **R3 — the shared optimum.** Decides whether `slugWords.ts` extracts to a cohort-wide shared location or remains duplicated. Binds value.js-C.W2.
- **R5 — migration safety.** Reads `migrate-slugs.ts` + `migrate-oklab.ts` as the @mkbabb migration idiom; recommends the shape of `migrate-palette-schema.ts` value.js-C.W2 ships, and the rollout for retiring the `formatPalette` `??` fallback per invariant 17.

The other three (R1, R4, R6) are fourier- and cohort-scoped; their outputs inform value.js-C but value.js is not the primary consumer.

## Acquisition

value.js-C.W0 pulls the six research deliverables and the joint challenge artefact in by **symbolic citation** — no copy. The artefacts live in fourier's repo and are read-only-referenced. On joint Wχ close, value.js-C authors its hardened wave specs under `waves/W*.md` directly; the research itself is not re-litigated.

## Value.js-side mini-research (conditional)

If joint Wχ surfaces a value.js-specific question Wα did not answer — for instance, whether `Palette` should compose over `LCh` or `OKLCh` colour parents — a tightly-scoped mini-research lane lands here as `mini-R{N}-*.md` *with the question, the agent prompt, and the deliverable named explicitly* (value.js-A invariant 5 / cohort invariant 7 — no implicit deferral).

If joint Wχ surfaces no such question, this directory holds only this README.
