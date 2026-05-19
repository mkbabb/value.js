# B — Close A, simplify, complete the AND

**Tranche letter**: B (value.js repo; second tranche).
**Successor to**: A (value.js HEAD `191d66a` at B open; A.W0–W4 closed; A.W5 uncommitted; A.W6/W7 planned-not-run).
**glass-ui peer tranche**: Q — **CLOSED** at HEAD `4b16de7` (v1.9.2). Re-verified 2026-05-19; see `coordination/Q.md §2a`.
**Mode**: planning-only ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-18. **Hardened**: 2026-05-19 (six waves → five; see `PROGRESS.md` hardening round).
**Precepts pinned**: `docs/precepts` at `3310a8c` (inherited from A.W0). glass-ui Q.W6 advanced the shared submodule to `3c32fae` (invariants 30–33 + π-lane re-activation); **B.W0 advances value.js's pin to `3c32fae`** — see `coordination/Q.md §6`.

## §1 — Thesis

The user named the diagnosis: "the dock sizing, layout, seem contrived, overfit, over-engineered" — and "this seems hung on e2e." The audit confirmed it and a hardening pass confirmed B's own first plan carried some of the same bloat. B's job is narrow:

1. **Close A honestly** (B.W0) — commit the uncommitted W5; execute or re-scope A.W6 per `A.md §9`; run A.W7's close ceremony with `FINAL.md`.
2. **Correct W5 + simplify layout** (B.W1) — fix the W5 a11y over-reaches; strip the phantom `floating-panel-item`; delete the `--dock-pos` centring fold-back (Bβ Proposal B, rendered styling preserved).
3. **Consolidate the component surface** (B.W2) — one architectural transposition: a single `usePaneRouter` source-of-truth that lets the dual router, the passthrough `DockMainLayer`, and the wrapper composables collapse; hero-lab pass; UnderlineTabs migration.
4. **Complete Mandate 12's AND + abrogate the e2e suite** (B.W3) — audit the value.js `src/` library (scoped out of A); disposition the WIP; close the typecheck cluster; delete the 16-spec Playwright suite for a 3-spec smoke suite.
5. **Strengthened close** (B.W4) — `FINAL.md`, doc drift, coordination updates, A close-residuals.

The full user-prompt and precept recap is `B-PROMPTS.md`. The audit-to-wave mapping is `findings.md`.

## §2 — Invariants B1–B5

1. **B1 — Close A before opening new structural work.** B.W1–B.W4 do not run while A.W5/W6/W7 are open. B.W0 closes A honestly first.
2. **B2 — Abrogate before patch.** Every B finding asks "can we delete?" before "can we patch?". Deleting `--dock-pos`, deleting the dual router, deleting the 16 e2e specs all embody this.
3. **B3 — One path.** Reject parallel codepaths for one logical concern. The dual pane router is the canonical violation; `usePaneRouter.ts` is the resolution.
4. **B4 — Runtime evidence.** Every demo-touching wave closes on a Playwright probe plus `vue-tsc` + `npm test` + the smoke suite. The probe is **wave-qualified** (hardening 2026-05-19): a layout/component/theme-touching wave runs the full probe (≥3 viewports × light+dark, 0 console errors, 0 non-2xx); a library-only or audit-only wave runs a single 1280×800 light probe. Wave gates never depend on the abrogated 16-spec suite.
5. **B5 — Zero deferral at close.** Every research finding lands in B, retires with recorded rationale, or names a cross-repo destination in `coordination/Q.md`. B closes with `FINAL.md` and zero open ledger items.

**Precept invariants in force (30–33).** After B.W0 advances the `docs/precepts` pin to `3c32fae`, B operates under invariants 30–33. **Invariant 33** (dead-code corpus-grep) gates B.W3's 16-spec e2e abrogation and B.W1's `floating-panel-item` strip; **invariant 32** (phantom-class) gates the strip; **invariant 30** (cross-repo dev-resolution) is checked in B.W3's library audit; **invariant 31** (props fail-explicit) is verified at the B.W0/B.W1 probes — B consumes glass-ui's now-fail-explicit `<Card>`.

## §3 — Wave schedule (5 waves)

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **B.W0 HEADLINE** | open | Close A — precept advance, commit W5, execute/re-scope W6, A.W7 close + A's FINAL.md | A.W5 committed; A.W6 closed (executed or re-scoped per A.md §9); A's FINAL.md cites every wave's commits; A's wave-log shows zero "planned" |
| **B.W1** | W0 close | W5 a11y corrections + reduced-motion + floating-panel-item strip + layout simplification (Bβ Proposal B) | 4 sub-gates A–D + the layout probe (§6) |
| **B.W2** | W1 close | Component consolidation — usePaneRouter transposition + hero-lab + UnderlineTabs migration | 3 sub-gates A–C + the component probe (§6) |
| **B.W3** | W2 close | value.js library gap audit + WIP disposition + typecheck cluster + e2e abrogation | 4 sub-gates A–D + the gate matrix (§6) |
| **B.W4 HEADLINE close** | W3 close | Strengthened close — FINAL.md, doc drift, Q.md update, A close-residuals | 7 read-only close lanes + close-honesty checklist + FINAL.md (§6) |

Critical path: W0 → W1 → W2 → W3 → W4, linear. The inter-wave dependencies are mostly architectural precautions (a stable token shape before component work; a stable component tree before the library audit); no cross-repo gate sits on the critical path. Within waves, disjoint lanes run in parallel — B.W1 A/B/C/D, B.W2 B/C after A, B.W3 C/D alongside A/B.

## §4 — Per-wave anchors

Each wave has a spec under `waves/`. Each carries per-lane sub-gates, a verification-artefact set, and a commit plan. The waves draw scope from the research docs (`research/Ba..Bz`, `research/B-e2e-investigation.md`) and the 2026-05-19 hardening audit:

- `waves/B.W0.md` — A-close mechanics + the precept submodule advance.
- `waves/B.W1.md` — W5 corrections + `floating-panel-item` + layout transposition.
- `waves/B.W2.md` — the pane-surface consolidation + hero-lab + UnderlineTabs.
- `waves/B.W3.md` — library audit + WIP + typecheck + e2e smoke.
- `waves/B.W4.md` — strengthened close.

## §5 — File ownership

Each wave spec's "File bounds" section is the single source of truth for which files that wave writes. `B.md` does not duplicate the cross-walk — see the wave specs.

Out of B's bounds:
- The ~104-error shadcn-vue `auto-form`/`ui/button`/`ui/chart` generated typecheck cluster — vendored/generated; routed to a future generator-update effort. Recorded in B.W3's audit.
- glass-ui-side variant/primitive ships. The 7 standing `coordination/Q.md §3` gaps remain a glass-ui successor tranche's to ship; B reads, files, and consumes only.
- `api/` (the Hono + MongoDB backend) — explicitly out of scope.

## §6 — Gate model (3 tiers)

The hardening audit collapsed B's gate apparatus from five tiers to three — per-wave "hard gate" lists that merely restated sub-gates are removed.

1. **Tier 1 — invariants.** Tranche invariants B1–B5 (§2) and precept invariants 30–33. Design-level; checked across the tranche, not per-wave.
2. **Tier 2 — per-lane sub-gates.** Every wave lane carries one explicit sub-gate stated in the wave spec. A dispatched agent cites its sub-gate verbatim. The sub-gate is the concrete, artefact-backed close criterion for that lane.
3. **Tier 3 — the wave gate.** A wave closes on the **conjunction of its sub-gates plus one Playwright probe** (wave-qualified per B4). No wave re-enumerates a separate hard-gate list; the sub-gates plus the probe *are* the gate. The HEADLINE close wave (B.W4) additionally runs the precept close-honesty checklist.

No gate closes on grep or claim alone — every sub-gate names an artefact (a deletion proof, a build/test count, a Playwright capture, an audit doc).

## §7 — Cross-tranche debt

B inherits A's open `coordination/Q.md §3` rows. The audit (Bζ §2) verified each against glass-ui HEAD `888d227`; a 3-lane re-assay re-verified each against glass-ui's **closed** state `4b16de7` (`coordination/Q.md §2a`):

- **STAND — NOT SHIPPED at Q close (7 gaps)**: `positionSource` hook + pointer + per-blob opacity + perturbation; `deriveAuroraPalette`; `BlobDot`; `SelectTrigger size`; `clampLabel`; `TooltipContent variant="mono"`; `Button size="icon-sm"`. Every marker stays; B does not retire; they route to a glass-ui successor tranche.
- **SHIPPED (1)**: `Card` props fail-explicit — Q.W2 `cab7258`; A.W1 already consumed it. Q.W3 added a `surface` prop — value.js's demo uses neither demoted component, no breakage.
- **PARTIAL — unchanged (1)**: `Tabs underline` — glass-ui shipped `<UnderlineTabs>` standalone; B.W2 migrates `PaletteDialog`.
- **NOT SHIPPED (1)**: `floating-panel-item` — never a glass-ui rule; B.W1 strips it locally as an invariant-32 phantom-class retirement.

B does not block on glass-ui. Coordination updates land in B.W4.

## §8 — Finding disposition (zero deferral)

Every audit finding from `research/Bα..Bζ`, `research/B-e2e-investigation.md`, and the 2026-05-19 hardening audit lands in a B wave, retires with recorded rationale, or has a named cross-repo destination. The deferred-item ledger is `research/Ba-deferred-ledger.md`; per-finding wave assignment is `findings.md §2` and the wave specs.

## §9 — Mode

Planning-only. No implementation in this session per the user's directive. The wave specs are complete enough that B's first execution session opens at B.W0 with no further planning.

## §10 — Authority

Plan substrate: this file + `B-PROMPTS.md` (user-prompt + precept recap) + `findings.md` (audit-to-wave mapping) + `research/Ba..Bz` (six audit lanes) + `research/B-e2e-investigation.md` (the consolidated e2e assay) + `coordination/Q.md` (the A↔Q manifest) + `dispatch/AGENT.md` (B agent contract) + `waves/B.W0..B.W4.md` (five wave specs) + `PROGRESS.md`.

Research-letter coherence: B uses the Greek-sequence convention (`Bα = Ba`, `Bβ = Bb`, `Bγ = Bg`, `Bδ = Bd`, `Bε = Be`, `Bζ = Bz`). A's incoherent `Aa, Ab, Ad, Ae, Ag` is fixed in B.W4 doc work.
