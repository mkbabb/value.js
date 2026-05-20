# A.W7 — Plan-vs-actual audit

**Lane**: W7 read-only close audit, lane 1 (plan-vs-actual).
**Run**: 2026-05-19, tranche B.W0 Lane C close ceremony.
**Method**: `waves/W0..W7.md` + `A.md §3` planned scope compared to `PROGRESS.md`
wave-log and prose; every cited commit verified with `git show --stat --oneline`;
2–3 headline claims per wave spot-checked against the working tree at HEAD
`065c6fe` (branch `tranche-b`).
**Constraint**: read-only — no mutating git, no edits outside this file.

## Per-wave table

| Wave | Planned headline (`A.md §3` / `waves/`) | Actual / commits | Verdict |
|---|---|---|---|
| W0 | Consumer un-break + repo hygiene — keyframes alias retire, mode-scoped `resolve.conditions`, Aurora boot fix, GooBlob null-guard, `gh-pages` clobber fix, `vue-tsc` install, `server.fs` font fix, precepts submodule register, branch fast-forward | `bc7ad2c` (precepts submodule + plan substrate — `.gitmodules`, `docs/precepts` at `3310a8c`), `c20f609` (boot un-break — `vite.config.ts`, `App.vue`, `useMetaballRenderer.ts`, `package.json`). `vite.config.ts` has zero `keyframes.js/dist` alias; `resolve.conditions: demoConditions` on three demo-mode return objects (`vite.config.ts:83,112,137`); `dedupe: ["vue"]` (`:36`); `gh-pages` `outDir` → `dist/gh-pages` (`:116`); `vue-tsc@^2.2.0` + `typecheck` script in `package.json:100,40`. | **PASS** |
| W1 | Card surface + real-bug sweep — `<Card variant="pane">`→`tier` (11 sites), 3 undefined classes, `ColorInput` radius | `92fe64d` (11 Card sites → `tier`, incl. `ColorPicker.vue` resting plate), `efc7d25` (3 classes + `ColorInput` radius, 20 SFCs). `grep variant="pane" demo/` → 0; `grep font-mono-code\|text-2xs\|text-pane-description demo/` → 0. | **PASS** |
| W2 | Style co-location + resilience — dock `calc()` de-tangle + z-tier, unscoped-`<style>` split, deprecated-CSS retire, 11 prior-unassigned Ab findings | `3b72007` (dock calc chain + `style.css`/`utils.css`), `f0b8c54` (6 unscoped-`<style>` split), `3a1b673` (deprecated CSS + z-tier), `6b3b64e` (ad-hoc colors/shadows/widths → tokens). Dead `@theme` tokens gone: `grep ppmycota style.css` → 0. `--dock-pos` recorded plan deviation (kept centring dependency; gate evidence overrode the soft prescription). | **PASS (re-scoped item recorded)** |
| W3 | Design tokens + hierarchy — one shadow language, semantic radii, φ type scale, admin-list restructure | `e58155f` (cartoon shadow consolidation + `.slug-pill`), `8e99a7d` (admin-list hierarchy primitive), `6cfded5` (φ scale + radii, ~48 SFCs). `style.css:47-50` overrides `--shadow-cartoon` and routes `--shadow-card` through it; `.dark` block carries the pair (`:170-171`); `.slug-pill` defined (`:241`). Documented exceptions recorded (`ColorComponentDisplay` numeric readout). | **PASS** |
| W4 | Interactive states + structure — four-state buttons, overlay convention, `Dock.vue`/`App.vue` decomposition | `c011b18` (four-state + overlay convergence, 19 SFCs), `c3df1e2` (`Dock.vue` 426→128), `3f39026` (`App.vue` decomposition). `Dock.vue` is 128 lines (target ≤~120); `App.vue` `<script>` block is 156 lines (target ≤~150); composables/components present (`useDockLayers`, `useDockAdminMode`, `DockViewSelect.vue`, `DockMainLayer.vue`, `PaneSlot.vue`, `ConfigSliderPane.vue`, `useAtmosphere`, `useDesktopPaneRouter`, `usePaletteManagerWiring`). | **PASS (line targets met within `~` tolerance)** |
| W5 | Accessibility + animation + e2e integrity | `7088da4` (a11y sweep — ARIA, landmarks, SVG-as-button, 25+ SFCs), `5247313` (animation — global reduced-motion + GooBlob tab-hidden), `36a4ad0` (W5 close — `W5-a11y.md`, `W5-animation.md`, PROGRESS). `animations.css:32` has the `prefers-reduced-motion: reduce` block. e2e Lane C superseded — 15 `e2e/*.spec.ts` + `playwright.config.ts` deliberately uncommitted (B.W3 abrogates the 16-spec suite). | **PASS (Lane C re-scoped to B.W3)** |
| W6 | Blob/aurora idiomatic abstraction (conditional) | `065c6fe` (`docs(tranche-a/w6)`: formal re-scope; `W6-deferred.md` + PROGRESS). glass-ui never shipped `positionSource` / `deriveAuroraPalette` / `BlobDot` (re-verified at glass-ui HEAD `e2e5303`). `useMetaballRenderer.ts` is 333 lines, intact; `watercolor-dot/WatercolorDot.vue` present, demo-local. Closed by re-scope per `A.md §9` / `waves/W6.md` Conditionality. | **PASS (closed by re-scope — valid close-state under invariant A5)** |
| W7 | Strengthened close — read-only close audit, Playwright re-probe, `FINAL.md` | In progress (this audit is W7 lane 1). Not yet a `PROGRESS.md` wave-log close row. | **N/A — wave in flight** |

## Commit verification

All 16 implementation/close commits cited in the `PROGRESS.md` wave log resolve
and match their stated scope:

- W0 `bc7ad2c`, `c20f609`; W1 `92fe64d`, `efc7d25`; W2 `3b72007`, `f0b8c54`,
  `3a1b673`, `6b3b64e`; W3 `e58155f`, `8e99a7d`, `6cfded5`; W4 `c011b18`,
  `c3df1e2`, `3f39026`; W5 `7088da4`, `5247313`.
- W5 close record `36a4ad0` and W6 re-scope `065c6fe` resolve; both are
  `docs(tranche-a/*)` and touch only `docs/` (audit docs + `PROGRESS.md`).
- The B.W0-task commit hashes named in the audit brief — `7088da4`, `5247313`,
  `36a4ad0`, `065c6fe` — all resolve and are consistent with the W5-closed and
  W6-re-scoped wave-log entries.

The W0–W6 commit chain is linear and contiguous on the history line
`bc7ad2c..065c6fe`, interleaved with `docs(tranche-a/wN)` close records
(`c43fc76`, `17f8355`, `3a44da3`, `204c7f8`, `191d66a`) and the tranche-B
planning commits. No reordered, dropped, or orphaned tranche-A commit found.

## Wave-log status check

Every wave-log row W0–W6 reads `closed` or `closed (re-scoped)`; W6 alone is
`closed (re-scoped)`. W7 reads `planned` — correct: W7 is the open close
ceremony, not a finished wave. **Zero W0–W6 rows read `planned`.** The §"VERIFY"
requirement ("zero `planned`") is met for the closed wave set.

## Headline-deliverable presence check

No closed wave's planned headline deliverable is silently missing:

- W0 keyframes alias retired — `grep keyframes.js/dist vite.config.ts` → 0.
- W1 Card migration complete — `grep variant="pane" demo/` → 0.
- W2 dead `@theme` tokens removed — `grep ppmycota style.css` → 0.
- W3 one cartoon shadow language present at `style.css:47-50`,`170-171`.
- W4 `Dock.vue` 128 lines, `App.vue` `<script>` 156 lines, all 9 decomposition
  modules on disk.
- W5 `animations.css:32` reduced-motion guard present.
- W6 `useMetaballRenderer.ts` (333 lines) and `WatercolorDot.vue` intact — the
  re-scope's stated inheritance, not a missing deliverable.

## Discrepancies

Two cosmetic doc-drift items; neither affects a wave verdict or a close gate.

1. **W6 prose cites a placeholder commit hash.** `PROGRESS.md` W6 disposition
   section (`PROGRESS.md:221`) reads `Commit: 2e... docs(tranche-a/w6) (see
   wave log)`. The actual W6 re-scope commit is `065c6fe`
   (`docs(tranche-a/w6): formal re-scope`). The `2e...` prefix matches no commit
   in the history; it is an un-substituted placeholder. The wave-log row itself
   (`PROGRESS.md:233`) correctly defers to "see W6 disposition commit" and the
   commit exists — only the prose placeholder is stale. Low severity:
   doc-drift, candidate for the W7 doc-drift lane.

2. **W2 wave-log cites four commits; `A.md §3` and the W2 close prose imply a
   one-commit-per-lane plan.** `waves/W2.md` "Commit plan" says "one commit per
   lane" for four lanes — the four hashes `3b72007`, `f0b8c54`, `3a1b673`,
   `6b3b64e` match exactly. The PROGRESS W2 close prose attributes the global
   stylesheet to "the orchestrator" rather than a lettered lane, but the commit
   count (4) equals the lane count (4). Not a true discrepancy — recorded only
   because the prose lane-naming and the commit scope-tags differ in wording.
   No action.

One item explicitly **not** a discrepancy: `waves/W5.md` "Verification
artefacts" names `audit/W5-e2e.md`; that file was never produced. This is
consistent and recorded — W5's e2e Lane C agent was killed mid-run ("hung on
e2e"), the lane was superseded by tranche B.W3's abrogation of the 16-spec
suite, and `PROGRESS.md:200-202` documents the disposition. The missing artefact
is the recorded consequence of a re-scoped lane, not a silent omission.

## Verdict

The W0–W6 plan-vs-actual reconciliation is **clean**. Every closed wave landed
its planned headline deliverable; every cited commit resolves and matches its
description; the wave-log status column is honest (six `closed`/`closed
(re-scoped)`, W7 correctly `planned`). The only findings are two cosmetic
doc-drift items in `PROGRESS.md` prose — the `2e...` placeholder hash being the
one worth a one-line fix. No headline deliverable is missing; no wave-log row
overstates its state.
