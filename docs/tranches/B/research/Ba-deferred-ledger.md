# Bα — Master Deferred-Item Ledger

**Lane Bα — chronically + A-deferred items.** Read-only audit, 2026-05-18.
**Repo HEAD at audit**: `191d66a` (W4 close docs commit).
**Audit method**: full sweep of `docs/tranches/A/`, `coordination/Q.md`, marker comments in `demo/`, the vue-tsc baseline, glass-ui ship state, and the uncommitted W5 working-tree state.

**Total catalogued**: 51 items.

| Status | Count |
|---|---|
| **Chronic** (predates A, unresolved) | 8 |
| **A-deferred** (A explicitly routed) | 22 |
| **A-implicit** (A added without named destination) | 14 |
| **Resolved-but-mark-remaining** | 7 |

## Most surprising findings

1. **`demo/hero-lab/components/HeroControls.vue` is the single highest-error file in the entire repo** — 23 vue-tsc errors. It is a "design exemplar" per `demo/DESIGN.md`, has 4 unguarded WebGL RAF loops with no `prefers-reduced-motion`, and never appeared in any A audit wave or research angle. A.md §5 routed all of `hero-lab/` to B without measurement.
2. **W5 is functionally complete in the working tree but officially closed nowhere.** `git status` shows 30 demo files and all 16 e2e specs modified; `audit/W5-a11y.md` and `audit/W5-animation.md` exist as untracked files; PROGRESS.md still records W5 as "planned" (no commits). The "hung on e2e" condition the user named is W5-C still mid-flight while W5 Lane A and B are done-but-uncommitted.

## Master table

| # | Item | File:line | Category | B disposition |
|---|------|-----------|----------|---------------|
| 1 | 290-error (was 246) demo typecheck backlog | `demo/@/components/ui/auto-form/` (104 generated), `demo/hero-lab/components/HeroControls.vue` (23), `useInertiaGesture.ts` (18), `useWatercolorBlob.ts` (16), + 38 more | Chronic | B.W4 |
| 2 | `src/` uncommitted WIP — 5 untracked + 3 modified files | `plugins/vite-source-export.ts`, `src/index.ts`, `src/units/normalize.ts`, `src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts` | Chronic | B.W4 |
| 3 | `hero-lab/` design audit | `demo/hero-lab/**` (6 files; 31 type errors; 4 RAF; no e2e; no a11y) | Chronic | B.W3 |
| 4 | Duplicate-Vue (resolved demo-side at W0; glass-ui's nested vue persists) | `vite.config.ts` (dedupe), `tsconfig.json` (paths) | Chronic | coord/Q (Q action) |
| 5 | AuroraPane "under rework" stub | `panes/AuroraPane.vue:7` | A-deferred | B.W0 (A.W6 fallback) |
| 6 | `useAtmosphere.ts` frozen at W0 state | `composables/useAtmosphere.ts:9` | A-deferred | B.W0 (A.W6 fallback) |
| 7 | `.underline-tabs` reka override | `styles/style.css:161-166` | A-deferred (now WIRE — glass-ui shipped `<UnderlineTabs>` as standalone) | B.W3 structural migration |
| 8 | `SelectTrigger size` `h-9` ×11 | `gradient/EasingSelector.vue:40` + 10 more | A-deferred (NOT shipped at glass-ui HEAD) | coord/Q (still pending) |
| 9 | `TooltipContent variant="mono"` ×7 | `ComponentSliders.vue:85`, `EditDrawer.vue:33` + 5 | A-deferred (NOT shipped) | coord/Q |
| 10 | `DockSelectTrigger clampLabel` | `dock/DockViewSelect.vue:41-43` | A-deferred (NOT shipped) | coord/Q |
| 11 | `Button size="icon-sm"` | `PaletteSlugBar.vue:16` + 6 | A-deferred (NOT shipped) | coord/Q |
| 12 | `floating-panel-item` glass-ui orphan class | `CurrentPaletteEditor.vue:44-50`, `PaletteCard.vue:181-190` | A-deferred — **glass-ui has no CSS rule for the class anywhere; the contract is implicit and unsatisfied** | B.W1 (wire local CSS) + coord/Q (formally file) |
| 13 | W5 a11y — 25+ SFC modifications uncommitted | `demo/**` (git status: M) | A-deferred | B.W0 (commit + close) |
| 14 | W5 animation — animations.css + GooBlob.vue + useMetaballRenderer.ts uncommitted | same files | A-deferred | B.W0 |
| 15 | W5 e2e — 16 specs modified, suite not gated green | `e2e/**` | A-deferred | B.W0 + B.W2 (smoke suite) |
| 16 | A.W6 — entire wave planned, not run | `waves/W6.md` | A-deferred | B.W0 conditional fallback |
| 17 | A.W7 — close, planned not run | `waves/W7.md` | A-deferred | B.W0 |
| 18 | `WatercolorDot` glass-ui-`BlobDot` gap, 11 consumers | demo-wide | A-deferred (NOT shipped) | coord/Q |
| 19 | `useMetaballRenderer.ts` ~200-line duplication | `goo-blob/composables/useMetaballRenderer.ts` | A-deferred (gated on glass-ui `positionSource`) | B.W0 (A.W6 fallback) |
| 20 | `ConfigSliderPane` migration to glass-ui `./configurator` (W4 already uses ConfiguratorRow per Bγ — partial) | `panes/ConfigSliderPane.vue:6-8` | A-deferred — partly done | B.W0 verify |
| 21 | Aurora picker-derived palette | `useAtmosphere.ts`, `AuroraPane.vue` | A-deferred (NOT shipped: deriveAuroraPalette) | coord/Q + B.W0 fallback |
| 22-29 | glass-ui gaps 22-29 (positionSource, deriveAuroraPalette, BlobDot, Tabs underline-as-variant, SelectTrigger size, clampLabel, mono Tooltip, icon-sm Button) | `coordination/Q.md §3` | A-deferred (all 8 NOT shipped at glass-ui `888d227`) | coord/Q kept; B does not block on them |
| 30 | `floating-panel-item` was never formally filed in `coordination/Q.md §3` | — | A-implicit | B.W7 — formally file |
| 31 | A↔Q contested boundary (Q.W1-C + Q.W2-B still in Q's plan) | `coordination/Q.md §0-1`; PROGRESS.md:208 | Chronic | coord/Q ongoing |
| 32 | `docs/precepts` advance acknowledgment | `coordination/Q.md §6` | A-deferred | B close |
| 33 | Ad-20 SelectContent widths retirement | `research/Ad:380` | A-implicit | B.W7 record in A.md §8 |
| 34 | Ae-12 Aurora cursor seam | `research/Ae:367` | A-implicit | B.W7 |
| 35 | Ab-16 PointerDebugOverlay raw colors (dev-only) | overlay file | Resolved-but-marked | B.W7 record in A.md §8 |
| 36 | Markdown.vue residual `rounded-2xl` ×2 | `Markdown.vue` | A-implicit | B.W1 |
| 37 | `usePopupMutex` demo-local fork | `dock/composables/usePopupMutex.ts` | Chronic (glass-ui retired upstream; no replacement) | B.W7 record permanence |
| 38 | `prefers-reduced-motion *,!important` sledgehammer | `animations.css:32-41` | A-deferred — works but is the "sledgehammer" Bδ flagged | B.W1 (opacity carve-out for overlay state) |
| 39 | Dual-WebGL frame-budget uncheck | `useMetaballRenderer.ts`, `useAtmosphere.ts` | A-implicit | B (post-W6 abstraction or named successor) |
| 40 | No systematic dark-scheme Playwright gate spec | wave docs | A-implicit | B.W0 (W5 close includes dark probe) |
| 41 | Research lettering incoherent (Aa,Ab,Ad,Ae,Ag — gaps Ac,Af) | `research/` | A-implicit | B.W7 |
| 42 | HARDEN-6 phantom citations | `coordination/Q.md:10`, `dispatch/AGENT.md` | A-implicit | B.W7 |
| 43 | Same as 42 (dispatch/AGENT.md cites non-existent precept STYLE.md) | | A-implicit | B.W7 |
| 44 | Close-ceremony "dual ceiling / 7-lane" presented as precept spec | `waves/W7.md:4` | A-implicit | B.W7 |
| 45 | WAVE_SPEC per-lane sub-gates missing from all 8 waves | `waves/W0..W7.md` | A-implicit | B.W7 add to B's own waves |
| 46 | `--menu-min-w` two kept-wider sites — rationale in audit doc not source | `Dock.vue` 12rem, `GenerateControls.vue` 14rem | Resolved-but-marked | B.W3 inline rationale comment |
| 47 | PaletteDialog backdrop INTENTIONAL override comment | `PaletteDialog.vue:595` | Resolved-but-marked (correctly recorded) | None — already correct |
| 48 | `--glass-opacity-subtle` dead override (resolved at W3) | (absent — verify) | Resolved | None |
| 49 | A.md §8 `Aa..Ae` shorthand omits `Ag` | `A.md:102` | A-implicit | B.W7 |
| 50 | Mandate 13 — Playwright user/admin flows full sweep | `e2e/**` | A-implicit (W5-C work uncommitted) | B.W0 close W5; B.W2 smoke suite |
| 51 | `api/` exclusion not in `findings.md §5` | `findings.md §5` | A-implicit | B.W7 |

## Per-category prose

**Chronic (8 items)** — the largest is the 290-error vue-tsc backlog. Generated shadcn-vue `auto-form` (104), `hero-lab/` (31), the `useInertiaGesture.ts` index-narrowing cluster (18), `useWatercolorBlob.ts` (16). The library `src/` is mostly clean; the demo never was typechecked before W0 added `vue-tsc`.

**A-deferred (22 items)** — the two biggest clusters are **W5 uncommitted** (items 13/14/15: every W5 lane's work sits in the working tree without a commit) and **W6 glass-ui gates** (items 5/6/18/19/21/22-29: every W6 fix is conditional on glass-ui shipping APIs that are not in Q's plan).

**A-implicit (14 items)** — A's work created or surfaced these without naming a destination. The reduced-motion sledgehammer (38) is the largest behavioural item; the rest are doc-fixes for the close.

**Resolved-but-mark-remaining (7 items)** — items A claims to have fixed where the legacy form lingers. The most important: the `--menu-min-w` "kept wider" exception sites lack inline source-code rationale (item 46); a future reader has no signal these widths are intentional.

## Closing observation

Two items materially block A's close, and B must address them first:
1. **W5 is uncommitted.** Without committing W5, A has zero finished waves past W4 and is structurally un-closeable.
2. **A.W6 is conditional on glass-ui APIs that have not shipped.** Per HARDEN-4 §3, A.W7 cannot run while W6 holds an open dependency. The fallback path (re-scope to named destination) was specced in `A.md §9` but never invoked.

Both fold into B.W0 (close-A wave).
