# D — Contract-v2 alignment, backend refactor, frontend cohesion, view-wide e2e

**Tranche letter**: D (value.js repo; third tranche).
**Successor to**: B — value.js's close-A-and-simplify tranche, CLOSED at `docs/tranches/B/FINAL.md`. The fleet is `tranche-b`'s final commit (the B.W4 close).
**glass-ui peer**: Q **closed** at `4b16de7`; post-Q glass-ui ships **contract-v2** at `ce5aad8` (v1.9.3); the shared precepts codify contract-v2 at **`68d9b20`** (per `research/Dh-contract-v2.md`).
**keyframes.js peer**: already contract-v2 compliant code-side at `0909177` — only its `docs/precepts` pin is off-target (filed `coordination/Q.md §9`).
**Mode**: planning-only at open per the D-opening directive ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-19.
**Precepts at open**: D will advance `docs/precepts` `3c32fae` → `68d9b20` at D.W0 Lane 0 (the contract-v2 codification SHA), then runs under invariants 30–33 with invariant 30 redefined-in-place per contract-v2.

## §1 — Thesis

The user's D-opening directive (verbatim in `D-PROMPTS.md §1`) names six things:

1. Contract-v2 alignment — drop `development`, ship `build:watch`, port `proof-resolution-contract.mjs`. The fleet has moved; value.js is the last off-target consumer.
2. A fastidious, surgical refactor of `api/` — 2 god modules (845 + 750 lines), no service/repository layer, 280 inline Mongo ops, silent fallbacks. Excise legacy, fail-explicit, introduce service boundaries.
3. Better encapsulation across the frontend — one demo god module (`PaletteDialog.vue`, 652/401-script), the `TabValue`/router drift, completion of the palette-manager facade pattern.
4. A localized design-idiom catalog — without breaking rendered styling. Surface ~43 arbitrary token-reaches as first-class utilities; expand `demo/DESIGN.md` into the catalog.
5. Full Playwright view + admin coverage — 3 → ~20 role/label specs; mock admin via `addInitScript`, not live-login (the W5-C hang root).
6. Aurora derive-from-color + blob extirpation — **glass-ui-blocked**, sharpened-filed in `coordination/Q.md`, routed to a value.js demo-abstraction tranche opened once glass-ui ships.

D's job is the first five — value.js-side work, no cross-repo blocking. The sixth is filed sharper with its derivation algorithm sketched (`research/Dc-aurora.md §3`) and its extirpation plan named (`research/Dd-blob.md §5`), ready for the successor tranche.

The full user-prompt and precept recap is `D-PROMPTS.md`. The 8-lane audit-to-wave mapping is `findings.md`.

## §2 — Invariants D1–D5

1. **D1 — Close B before opening new structural work.** B is closed; this invariant binds future tranches, not D itself.
2. **D2 — Abrogate before patch.** Every finding asks "can we delete?" before "can we patch?". Backend god modules split via service-extraction (deleting the inline tangle); `api/dist/` checked-in artefacts retired; pre-migration `?? null` shims excised; the `migrate-oklab.ts`/`migrate-slugs.ts` one-shots retired (their migrations are done).
3. **D3 — Fail-explicit over silent.** The D-opening directive's binding rule for the backend: silent fallbacks/fall-through must either be excised or fail explicitly. Audit names the sites (`research/Db-backend-legacy.md §2`). D.W1 lands them.
4. **D4 — Runtime evidence.** Every wave closes on a Playwright probe + `vue-tsc` + `npm test` + the smoke suite. Per B4 hardened: the probe is wave-qualified — a layout/component wave runs the full 3-viewport-light+dark, a library/audit wave runs a single 1280×800 light. After D.W5 the smoke suite is ~20 specs across `smoke`/`smoke-admin`/`smoke-mobile` projects — wave gates run the appropriate subset.
5. **D5 — Zero deferral at close.** Every research finding lands in D, retires with recorded rationale, or names a cross-repo destination. The aurora/blob value.js-side migrations are precept-§10-blocked and route to a named successor; that is a valid invariant-D5 close-state.

**Precept invariants in force.** D opens at the contract-v2 SHA `68d9b20`. Invariants 30 (redefined in-place — contract-v2), 31 (props fail-explicit), 32 (phantom-class), 33 (dead-code corpus-grep) all bind. Invariant-33 gates the backend dead-code excisions (`api/dist/`, migration scripts, unused MongoDB fields). Invariant-30 contract-v2 conformance is the D.W1 deliverable, gated by `proof-resolution-contract.mjs`.

## §3 — Wave schedule (7 waves)

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **D.W0 HEADLINE** | open | open — precept advance `3c32fae → 68d9b20`; cross-repo coord filings (aurora/blob/keyframes.js) refreshed; B-residual probe | precepts bumped + committed; `coordination/Q.md` reflects the post-Q + contract-v2 fleet state; integrity sweep clean |
| **D.W1** | W0 close | contract-v2 alignment — drop `development`, add `build:watch`, port `proof-resolution-contract.mjs` | `proof-resolution-contract.mjs` green; `package.json` carries `{types,import,default}` only; `npm run build:watch` runs; resolution still resolves dev (via `default`) |
| **D.W2** | W1 close | backend (api/) — split palettes.ts (845) + admin.ts (750); introduce service/repository layer; excise legacy; fail-explicit migration | every backend file ≤ 500 lines; service+repository layers exist; 280 inline `db.collection` calls → repository methods; the 6 silent-fallback sites (F1–F3, W2–W4) excised or made explicit; `api/dist/` retired; `migrate-*.ts` one-shots deleted; `api/CLAUDE.md` reconciled to 9 collections |
| **D.W3** | W2 close | frontend cohesion — split `PaletteDialog.vue` 652→{component dir}; complete the palette-manager facade; fix `TabValue` drift; 40-SFC reactive-props codemod | `PaletteDialog/` dir holds the split surface (≤ ~250 each); zero direct `@lib/palette/api` imports in components (facade complete); `TabValue` = render count; ≥38 SFCs use Vue 3.5 reactive-props destructure; `useTemplateRef` everywhere |
| **D.W4** | W3 close | styling — surface 43 token-reaches as Tailwind utilities; `demo/DESIGN.md` becomes the design-idiom catalog; isomorphic rendered output | catalog exists; arbitrary `[var(--…)]` reaches ≤ 5 (the truly bespoke); style.css colocation: 4 candidates moved to component-scoped; Playwright visual probe shows 0 pixel-drift on the W5 baseline (or documented-and-accepted) |
| **D.W5** | W4 close | Playwright coverage — 3 → ~20 specs; `smoke-admin` (mocked) + `smoke-mobile` projects; cross-view walk + WebGL probes | every user view + 5 admin views have a role/label spec; admin-mock via `addInitScript` localStorage seeding; `smoke-mobile` Pixel-7 single-spec; `npx playwright test --project=smoke[-admin\|-mobile]` all green; CI gates updated |
| **D.W6 HEADLINE close** | W5 close | strengthened close — `FINAL.md`, doc drift, `coordination/Q.md` final state, B-residual sweep | 7 read-only close lanes + close-honesty checklist + `FINAL.md` |

Critical path: W0 → W1 → W2 → W3 → W4 → W5 → W6, linear. W1 is foundational (contract-v2 changes consumer config — D.W2's `api/` dev server consumes the new conditions). W2 is the heaviest wave; W3/W4 are file-disjoint from W2 (backend vs frontend) and could overlap, but the linear schedule keeps gate-isolation. Within waves, disjoint lanes run in parallel — D.W2 A/B/C, D.W3 A/B/C, D.W4 A/B, D.W5 A/B/C.

## §4 — Per-wave anchors

Each wave spec under `waves/` carries per-lane sub-gates, verification artefacts, and a commit plan. The waves draw scope from the 8 research docs (`research/Da..Dh`):

- `waves/D.W0.md` — precept advance + B residuals + coord filing refresh.
- `waves/D.W1.md` — contract-v2 alignment (Dh — 5 lanes, one wave).
- `waves/D.W2.md` — backend refactor (Db — service/repo extraction, legacy excision).
- `waves/D.W3.md` — frontend cohesion (De — PaletteDialog split, facade completion, codemod).
- `waves/D.W4.md` — styling + design-idiom catalog (Df).
- `waves/D.W5.md` — Playwright coverage (Dg — view + admin specs).
- `waves/D.W6.md` — close.

## §5 — File ownership

Each wave spec's "File bounds" section is the single source of truth. `D.md` does not duplicate the cross-walk.

Out of D's bounds:
- `glass-ui/` — read-only peer; D files but does not write (`coordination/Q.md §3` keeps the aurora-derive + blob-augmentation gaps filed sharper).
- `keyframes.js/` — read-only peer; only the precept-pin convergence is filed (`§9`).
- The aurora/blob value.js-side demo migrations — precept-§10-blocked; routed to a successor tranche.
- `docs/tranches/C/` — the untracked palette-CRUD / fourier scaffold; not D's to write.

## §6 — Gate model (3 tiers — inherited from B's hardened §6)

1. **Tier 1 — invariants.** D1–D5 (§2) + precept invariants 30–33 (with 30 redefined-in-place). Design-level; checked across the tranche.
2. **Tier 2 — per-lane sub-gates.** Every wave lane carries one explicit sub-gate stated in the wave spec. A dispatched agent cites its sub-gate verbatim.
3. **Tier 3 — the wave gate.** A wave closes on the **conjunction of its sub-gates plus one Playwright probe** (wave-qualified per D4). The HEADLINE close wave (D.W6) additionally runs the precept close-honesty checklist.

No gate closes on grep or claim alone — every sub-gate names an artefact.

## §7 — Cross-tranche debt

D inherits B's open `coordination/Q.md §3` rows + adds new rows for contract-v2 + aurora-derive + blob-augmentation. Every cross-repo dependency has a fallback or named destination:

- **STANDING (glass-ui successor tranche)** — the 7 standing primitive/blob gaps + the re-filed `<Tabs variant="underline">` + `BlobDot` + `deriveAuroraPalette` + the 7 metaball additions (`research/Dd-blob.md §3`). None block D.
- **STANDING (keyframes.js)** — the precept-pin convergence to `68d9b20`. value.js cannot write; filed.
- **MOOT** — the A↔Q contested boundary (closed in B; recorded in `B/coordination/Q.md §4`).

## §8 — Finding disposition (zero deferral)

`findings.md §2` carries the full 8-lane audit-to-wave mapping. Every finding lands in a D wave, retires with rationale, or names a cross-repo destination.

## §9 — Mode

Planning-only at open. The 8-lane research wave executed (read-only); the synthesis is this substrate. The first execution session opens at D.W0.

## §10 — Authority

Plan substrate: this file + `D-PROMPTS.md` + `findings.md` + `research/Da..Dh` (eight audit lanes) + `coordination/Q.md` (cross-repo manifest) + `dispatch/AGENT.md` (D agent contract) + `waves/D.W0..D.W6.md` (seven wave specs) + `PROGRESS.md`.

Research-letter coherence: D uses the Greek-sequence convention `Dα = Da, Dβ = Db, Dγ = Dc, Dδ = Dd, Dε = De, Dζ = Df, Dη = Dg, Dθ = Dh` — Latin sequence already contiguous (no rename needed).
