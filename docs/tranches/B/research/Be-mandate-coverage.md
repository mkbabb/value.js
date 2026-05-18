# Bε — Mandate + precept coverage

**Lane Bε.** Read-only, 2026-05-18. Coverage of the 13 original mandates + mid-session amendments + precepts + invariants.

## §1 — Coverage table

| # | Mandate | A waves | Verdict | B disposition |
|---|---|---|---|---|
| 1 | Styling resilience (4 categories) | W2 (Ab-1..19) | **FULLY ADDRESSED** | None |
| 2 | Design audit (tokens, @apply, typography, radii, shadows) | W3 (Ag-1..13) + W1-B | **FULLY ADDRESSED** | None |
| 3 | Four-state buttons | W4-states-A/B (Ad-1..20 + HARDEN-4 §2 additions) | **FULLY ADDRESSED** | None |
| 4 | Modals/dropdowns/popups/hover-cards | W4 overlay convergence + W3 hierarchy + W5-A focus mgmt | **PARTIALLY ADDRESSED** | B.W0 close W5 (a11y for focus mgmt is uncommitted) |
| 5 | Duplicated components | W3 Lane C + W4 PaneSegmentedControl dedup | **FULLY ADDRESSED** | None |
| 6 | Golden-ratio hierarchies + abrogate spreadsheets | W3-B (φ scale) + W3-D (AdminListItem restructure) | **FULLY ADDRESSED** | None |
| 7 | Colocation + @apply | W2-B (unscoped split) + W3-C (.slug-pill) | **FULLY ADDRESSED** | None |
| 8 | Root-level component restyling | A4 invariant throughout; W1, W4 | **PARTIALLY** — 4 glass-ui-side root fixes filed but not shipped | coord/Q ongoing; B.W4 retires markers when shipped |
| 9 | glass-ui for ALL styling | W0-W4 broad adoption | **PARTIALLY** — 6 residuals each named-destined | B.W0 (verify W6 fallback); B.W1 (floating-panel-item) |
| 10 | Flatten complex components | W4 decomposition | **FULLY ADDRESSED**, but Bγ found over-fits | B.W3 consolidate (DockMainLayer merge, useDockLayers inline, dual-router merge) |
| 11 | Skip duplicates / no generic advice | HARDEN-1/3/4 dedup | **FULLY ADDRESSED** | None |
| 12 | Gaps in value.js AND glass-ui | glass-ui filed in coord/Q; **value.js src/ never audited** | **PARTIALLY** — the "AND" is broken | **B.W4 — value.js library gap audit + WIP disposition** |
| 13 | Playwright user+admin flows; idiomatic blob/aurora | W5 (uncommitted); W6 (planned-conditional) | **PARTIALLY** — W5 hung; W6 blocked | B.W0 close W5; B.W0 W6 conditional re-scope |

## §2 — Mid-session amendments

### "Panels broken, dock broken"
W0 (Aurora boot crash); W4 (Dock decomposition); `useGlobalDark()` cold-load fix. Verified by Playwright. **FULLY ADDRESSED.**

### "Architectural transpositions — elegance, simplicity, performance"
W0 deleted alias; W4 transposed Dock 426→128; PaneSlot collapsed ~95 lines of v-if; ConfigSliderPane merged two near-identical panes. **SUBSTANTIALLY HONORED**, with two open Bγ/Bβ questions (dual router; dock-pos centring complexity).

### "NO legacy code"
W0–W3 deleted dead aliases, dead tokens, dead classes. Three residuals (AuroraPane stub, `.underline-tabs` override, `floating-panel-item` class) each have named destinations — satisfies precept §7 (no silent deferrals). **SUBSTANTIALLY ADDRESSED.**

## §3 — Precept coverage

| Precept | A status |
|---|---|
| 1. KISS/DRY | Honored |
| 2. No quick fixes | Honored |
| 3. Architectural transposition wins | Honored, with Bγ open question |
| 4. Abrogate before patch | Honored — dead tokens/aliases/classes deleted |
| 5. **One path** | **PARTIALLY VIOLATED** — dual `useMobilePaneRouter` / `useDesktopPaneRouter` |
| 6. No legacy code | Substantially honored (3 named residuals) |
| 7. No silent deferrals | Honored |
| 8. Substrate with consumer | Honored |
| 9. **No overfitting** | **PARTIALLY VIOLATED** — Bγ found 4 over-fits (DockMainLayer, useDockLayers, useAtmosphere, dual router) |
| 10. Wire before retire | Honored |
| 11. Every wave is named | Honored |
| 12. Evidence beats claims | Honored — W2 dock-pos deviation rests on runtime measurement |
| 13. Indefatigability (orchestrator) | Honored, except W5 hung on e2e |
| 14. Voice and style | Honored |
| 15. Fail-explicit on library violations | Honored |

## §4 — Invariants A1–A5

| Invariant | Status |
|---|---|
| A1 — glass-ui-first | Substantially honored (6 named residuals) |
| A2 — Consumer-resolution integrity | **Fully honored** |
| A3 — Runtime-evidence gate | Honored W0–W4. **NOT yet honored W5** (uncommitted, no probe artefact). |
| A4 — Root-level restyle | Honored where glass-ui shipped; 4 glass-ui-side fixes pending |
| A5 — Zero deferral at close | **Not yet assessable** — A is not closed |

## §5 — Particular attention

### Mandate 12 — "AND" broken
A scoped `src/` out as "no audit mandate" (findings.md §5, A.md §5). Valid for a regression-focused tranche. But Mandate 12 says **value.js AND glass-ui**. The library was never audited for cohesion/coverage gaps. The uncommitted `src/` WIP (5 new files re-exported from `src/index.ts`) is library-public-API debt with no tranche home. **B.W4 owns this.**

### Mandate 13 — Playwright + blob/aurora
- User flow: W5 e2e changes on-disk, uncommitted, not green-verified.
- Admin flow: `admin-panel.spec.ts` modified, not committed, not green.
- Mobile flow: `mobile-layout.spec.ts` modified, not committed.
- Blob/aurora: W6 conditional on glass-ui (8 unshipped gaps).

**The single largest open gate.** B.W0 closes W5; B.W2 stands up smoke suite; B.W0 conditional re-scopes W6.

### "Architectural transpositions"
W2 dock-pos deviation: defensible runtime-evidence-based. The dual-router (Bγ) and `useDockLayers` over-fit (Bγ) are the items the user's "contrived/overfit/over-engineered" charge most cleanly fits. B.W3 consolidates them.

## §6 — B scope additions

1. **B.W0 — close A** (W5 commit + close; W6 conditional re-scope or execution; W7 close ceremony + FINAL.md).
2. **B.W4 — value.js library gap audit + WIP disposition + typecheck debt.**
3. **B.W3 dual-router merge** (Bγ).
4. **B.W2 dock-pos simplification** (Bβ).
5. **B.W1 W5 a11y corrections** (SpectrumCanvas, SwatchHoverMenu).
6. **B.W2 e2e strategy shift** (smoke suite + nightly full).

## §7 — Summary

| Category | Count |
|---|---|
| Fully addressed | 8 mandates |
| Partially addressed | 5 mandates |
| Un-addressed | 0 |
| Precepts violated (partially) | 2 (one-path, no-overfitting) |
| Invariants outstanding | A3 + A5 (depend on W5..W7 closing) |

The mandate coverage is high. The two precept violations and the open invariants all flow through "close A first" (B.W0) and "consolidate W4's over-fits" (B.W3).
