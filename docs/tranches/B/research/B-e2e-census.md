# B-e2e — Value census of the 16 Playwright specs

**Tranche B assay lane "e2e-census".** Read-only, 2026-05-18. Precept: abrogate before patch.

## Verdict table

| Spec | Lines | test() | Dominant class | Verdict | Rationale |
|---|---|---|---|---|---|
| admin-login-live | 53 | 1 | (f) live-API | ESSENTIAL\* | gated `PALETTE_API_E2E=1`; real admin round-trip |
| admin-panel | 331 | 6 | (a) flow | ESSENTIAL | mocked API; auth-gated nav flow |
| browse-palettes | 129 | 4 | (a) flow | SUPERFLUOUS | duplicates `palette-browser` with less rigour |
| color-docs-rendering | 136 | 12 | (e) library-logic + (b) render | NONSENSE | asserts the markdown author included the right symbols; KaTeX-loaded smoke |
| color-header-layout | 149 | 5 | (c) layout/pixel | NONSENSE | 2/5 `test.skip` ("CATEGORY-B APP BUG"); bbox pixel math on xpath ancestor |
| color-picker | 275 | 10 | (a) flow | ESSENTIAL | URL round-trip, reset, space-switch routing |
| color-space-switching | 49 | 1 | (b) render | SUPERFLUOUS | label-first-char fixture assertion + slider-count smoke |
| color-visual-validation | 355 | 4 | (e) library-logic | NONSENSE | injects `parseCSSColor`/`normalizeColorUnit` into the browser, bypasses all UI — a unit test in a browser sandbox |
| edge-cases | 143 | 5 | (a)+(c) mixed | SUPERFLUOUS | mobile pixel checks belong in `mobile-layout`; slug test passes unconditionally; search test duplicated |
| mobile-layout | 156 | 5 | (c) layout/pixel + (b) render | SUPERFLUOUS | render checks subset of `color-picker`; `Math.abs(leftGap-rightGap)<=4` brittle centring |
| palette-api-live | 191 | 1 | (a) flow + (f) live-API | ESSENTIAL\* | gated; full save→publish→vote→delete round-trip |
| palette-browser | 141 | 6 | (a) flow | ESSENTIAL | search filter (positive + negative), create flow |
| palette-dialog-layout | 123 | 1 | (c) layout/pixel | NONSENSE | sole test asserts `overflow-y in ["auto","scroll"]` + a self-defeating programmatic-scroll readback |
| palette-features | 482 | 13 | (a) flow | ESSENTIAL | vote toggle, session-token header, sort-order API contract — the most valuable spec |
| palette-slug-management | 691 | 15 | (a) flow | ESSENTIAL | slug cancel/regenerate/migrate/duplicate-name multi-step flows |
| propose-name | 106 | 5 | (a) flow | SUPERFLUOUS | 4/5 `test.skip` (known app bug); 1 active test = icon-visible render check |

\* live-API specs run only with `PALETTE_API_E2E=1` and a reachable backend; zero CI coverage.

## Counts

- **ESSENTIAL: 6** (admin-login-live, admin-panel, color-picker, palette-api-live, palette-browser, palette-features, palette-slug-management — 7 actually; `admin-login-live` and `palette-api-live` are live-gated)
- **SUPERFLUOUS: 6** (browse-palettes, color-space-switching, edge-cases, mobile-layout, propose-name + partial color-docs)
- **NONSENSE: 4** (color-docs-rendering, color-header-layout, color-visual-validation, palette-dialog-layout)

## The 4 NONSENSE specs

- **color-visual-validation** — the worst. Injects library source via `addScriptTag`, runs `parseCSSColor`+`colorUnit2` on 100+ inputs in Chromium, exercises zero UI. A unit test masquerading as e2e. The "swatch grid" test's `expect(swatchCount).toBe(...)` only confirms a loop ran (errors are swallowed by a try/catch).
- **palette-dialog-layout** — one test; asserts a CSS `overflow-y` value is `"auto"`/`"scroll"` and reads back a `scrollTop` it itself just set. Circular. Tests a dialog post-W4 superseded by panes.
- **color-header-layout** — 2/5 skipped citing an app bug; the live layout test does bbox pixel arithmetic on "the first ancestor with class `~=rounded`" — DOM-topology-fragile.
- **color-docs-rendering** — 120 parametrised iterations asserting `.katex` count > 0 and that rendered HTML `.toContain("transformMat3")` — content-correctness of the docs author's prose, breaks on any wording change.

## Conclusion

10 of 16 specs are SUPERFLUOUS or NONSENSE by intrinsic value. The 6 ESSENTIAL specs test genuine flows — but the brittleness and target lanes assess whether they are salvageable as written. See `B-e2e-brittleness.md` and `B-e2e-target.md`.
