# B — Findings + audit-to-wave mapping

**Tranche letter**: B (value.js, second tranche).
**Date opened**: 2026-05-18. **Hardened**: 2026-05-19.
**Repo HEAD at open**: `191d66a` (A's W4 close docs commit).
**A status at B open**: W0–W4 closed and committed; W5 source modifications uncommitted (the "hung on e2e"); W6/W7 planned-not-run.
**Mode**: planning-only.

## §1 — Source

The verbatim user-prompt history and the precept recap are in `B-PROMPTS.md` — the single prompt ledger. The 2026-05-19 hardening directive (a re-issue of the turn-4 audit prompt, scoped to harden B itself) and the 6-lane hardening audit are recorded in `PROGRESS.md`. This file does not duplicate the prompts; it maps the audit findings to waves.

## §2 — Audit-to-wave mapping

Every finding from the six audit lanes (`research/Bα..Bζ`), the consolidated e2e assay (`research/B-e2e-investigation.md`), and the 2026-05-19 hardening audit lands in a wave. Per invariant B5, nothing is silently deferred.

| # | Finding | Source | Wave | Disposition |
|---|---|---|---|---|
| A | A.W5 uncommitted; A.W6/W7 unrun — A is open | Bα | **B.W0** | Commit W5 (a11y SFCs + animation); re-scope A.W6 per `A.md §9`; A.W7 close + A's FINAL.md. Invariant B1. |
| B | `--dock-pos` centring fold-back — the "contrived/overfit" layout surface | Bβ | **B.W1** | Proposal B: delete `--dock-pos` + `--layout-padding`, flex+fixed; token count 9→7; visual delta only at 21:9. Rendered styling preserved. |
| C | 4 W4 component over-fits + (hardening) the wider pane-surface decomposition | Bγ + hardening | **B.W2** | One transposition — `usePaneRouter` source-of-truth; merge `DockMainLayer`, inline `useDockLayers`/`useAtmosphere`, fold `useGenericActionBar`; Tier-2 candidates evaluated at wave open. |
| D | W5 a11y over-reaches — invalid `role="slider"`, ghost `role="toolbar"`, reduced-motion sledgehammer | Bδ | **B.W1** | `SpectrumCanvas`→`role="img"`; `SwatchHoverMenu` hover panel `aria-hidden`; `PaletteCardGrid` `role="list"`; overlay opacity carve-out. |
| E | `floating-panel-item` — class applied at 7 sites, zero CSS rule anywhere | Bζ | **B.W1** | Strip the class (precept §4); invariant-32 phantom-class retirement + invariant-33 pre-deletion grep. |
| F | `UnderlineTabs` shipped standalone, not a `<Tabs variant>` prop | Bζ | **B.W2** | Structural migration of `PaletteDialog`; `.underline-tabs` CSS retired. |
| G | The 16-spec Playwright suite is ≈3,510 lines of brittle nonsense | `B-e2e-investigation` | **B.W3** | Delete all 16; 3 role/label `e2e/smoke/` specs; CI smoke gate. Invariant-33 pre-deletion corpus grep. Brittleness-lane dissent overridden (recorded). |
| H | Mandate 12's AND — the value.js `src/` library was never audited | Bε | **B.W3** | Audit `src/` cohesion/coverage; disposition the 5 untracked WIP files; close the ~155-error custom typecheck cluster; verify invariant-30 publisher compliance. |
| I | hero-lab — 31 type errors, 4 unguarded RAF loops, the "design exemplar" claim | Bα, Bζ | **B.W2** | Card migration, index narrowing, `prefers-reduced-motion` guards; honour or retract the DESIGN.md claim. |
| J | Doc drift + A close-residuals — test counts, research-letter renaming, A.md §8 records, citations | Bζ | **B.W4** | Close-ceremony doc work; `CLAUDE.md` 1372→1409; `Aa..Ae` contiguous rename; A↔Q boundary logged. |
| K | glass-ui Q closed (`4b16de7`); precept submodule advanced `3310a8c`→`3c32fae` | Q-close assay 2026-05-19 | **B.W0/W1/W3/W4** | B.W0 advances value.js's precept pin; B runs under invariants 30–33; gaps re-verified (`coordination/Q.md §2a`); contested boundary MOOT. |
| L | B's own first plan carried apparatus bloat — 6 waves, 22 docs, 5 gate tiers | Hardening audit 2026-05-19 | **plan** | 6 waves → 5 (old layout wave folded into B.W1); 4 e2e docs → 1; gate tiers 5 → 3; `findings.md` pared. Applied to this substrate directly. |

## §3 — Items NOT folded into B (named destinations, not silent deferrals)

- **7 standing glass-ui gaps** (`coordination/Q.md §2a, §3`) — NOT SHIPPED at Q close; route to a glass-ui successor tranche. The demo-side marker comments stay in code with their rationale; each retires when the corresponding glass-ui ship lands.
- **~104-error shadcn-vue generated typecheck cluster** (`ui/auto-form/`, `ui/button/`, `ui/form/`, `ui/chart/`) — vendored/generated; not B-fixable without regenerating. Routed to a generator-update effort or a vendoring-policy review.
- **A↔Q contested boundary** — RESOLVED/MOOT: Q closed without writing value.js (`coordination/Q.md §4`). B.W4 records the closed-state in FINAL.md.

## §4 — User-mandate coverage (the AND status)

The user's 13 original mandates, recapped from `B-PROMPTS.md` and verified addressed:

| Mandate | A coverage | B closes |
|---|---|---|
| 1 Styling resilience | FULL | — |
| 2 Design audit | FULL | — |
| 3 Four-state buttons | FULL | — |
| 4 Modals/dropdowns/etc | PARTIAL (W5 a11y uncommitted) | B.W0, B.W1 |
| 5 Duplicated components | FULL | — |
| 6 Golden-ratio + abrogate spreadsheets | FULL | — |
| 7 Colocation + @apply | FULL | — |
| 8 Root-level restyling | PARTIAL (4 glass-ui-side root fixes pending) | coord/Q (cross-repo) |
| 9 glass-ui for ALL | PARTIAL (residuals with named destinations) | B.W0 W6 re-scope; B.W1 floating-panel-item |
| 10 Flatten complex components | FULL — and A's W4 over-fits abrogated | B.W2 consolidation |
| 11 Skip duplicates | FULL | — |
| **12 Gaps in value.js AND glass-ui** | **PARTIAL — glass-ui side done; library side not audited** | **B.W3** |
| 13 Playwright user+admin flows; blob/aurora | PARTIAL (W5 hung; W6 conditional) | B.W0 (smoke + W6 re-scope), B.W3 (e2e abrogation) |

After B closes: every mandate fully addressed or routed to a named destination. Mandates 12 and 13 — the parts the user has flagged repeatedly — are foregrounded here and owned by B.W3.
