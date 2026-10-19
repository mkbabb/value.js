SERVED MODEL: claude-opus-5-5
# X.W7L.m L6 — smoke --workers=1 at glass 10.1.0, each failure classified with its cause (2026-09-25)

## Runs
- **10.1.0 (product tree, HEAD 7df90b1a; f873929a landed mid-run, docs-only):** `VJS_E2E_PORT=5371 npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile --project=smoke-reactivity --workers=1 --reporter=line` → **79 failed · 2 skipped · 1 did not run · 226 passed** of 308 (45.5 min; load 56→31).
- **7.0.0 base (the pre-migration tree `c8a4959d^`, `git archive` into scratch, `npm ci` → glass 7.0.0, `npm run build`):** the same 79 via `--last-failed` (the 10.1.0 run's `.last-run.json`), port 5373 → **45 failed · 34 passed** (18.0 min; load 46).
- So **45 are PRE-EXISTING** (they fail on 7.0.0 too; not the repin's) and **34 are REPIN REGRESSIONS** (they pass on 7.0.0, fail on 10.1.0).

## The 34 repin regressions, by cause
| class | n | cause (measured) | tests | routed to |
|---|---|---|---|---|
| C-INK | 15 | The certified-ink instrument throws `Ink certification failed: contrast_unreachable` on glass 10's veil (ESC-W7Rm-1). Server log: `certify (demo/color-session/ink.ts:66)` ← `certifyAccentInk (ink.ts:106)` ← `useContrastSafeColor.ts:253`. 0 occurrences in the 7.0.0 run. Scenes show "This scene could not be loaded" (Atmosphere, Extract), or the app boot dies on a URL colour. Where it does not throw, the ink misses: code ink 4.49 < 4.5, accent C 0.0093 vs pick 0.106. | crash-battery R18 ×2 · o18 W4 ConfigSliderPane rows ×2 · o18 config-track ×2 · o18 W6.5 GRAPHICS ×2 · o18 markdown About ×2 · o18 W6.5 IDENTITY · url-color-precedence · readout-seam T-33b · webgl-blob chroma · reactivity-instant | **X.W7L.i** (its step 1 reproduction; the spec's own cure) |
| C-TRIGGER-PAINT | 8 | The colour-space SelectTrigger at rest computes `backdrop-filter: blur(14px) saturate(1.5)`, where X.W12.t expects `none`. The paint-free arm (`variant="ghost"`) was retired at 8.0.0 and 10.1.0 has no paint-free successor. | w12-text-trigger ×8 (1440/390 × light/dark × picker/about) | **X.W7L.v** → X-W12U (glass row) |
| C-CARD-STAMP | 3 | glass 8.0.0 retired `Surface`'s `data-tier` stamp (10.1.0 expresses the tier as the class `glass-<tier>`, `dist/_shared/surface/resolve`) and removed `grain` library-wide (MIGRATION.md:1437; a card that wants grain now arms `paper-grain-overlay`). o7 reads `el.dataset.tier` / `el.dataset.grain` and gets `(none)`. On the product side, all 17 demo `<Card>` sites lost the grain that 7.0.0 applied by default. | o7 census light · dark · 390 | **X-W12U** (design register: does each plate arm `paper-grain-overlay`?; then the oracle re-aims onto the class) |
| C-DOCK-IDLE | 3 | glass 9.0.0 dropped `collapseDelay` (MIGRATION.md:498: "every dock idles for one window, 3600 ms"). The demo's 5000 ms is gone. These specs reach `combobox "Select view"` after the dock has idled shut (snapshot: `button "Expand dock"`), and they do not call `expandDock`. | BR-10 dir=rtl · o14 ramp feasibility light · dark | **X-W12U** (e2e: the real-user `expandDock` step) |
| C-DOCK-PAINT | 2 | Dock control paint at 10.1.0: the settled Tools rest shadow computes `none`, and the focus-visible frame does not read as keyboard focus. | o15 settled-rest clip · w12-dock DOCK-TRIGGER-CLIP | **X.W7L.v** (DOCK rows) |
| C-DIALOG | 2 | Inside the glass 10 `DialogContent`, the tag checkbox click does not become actionable within 30 s, and the "Unpublish failed" status never renders. | w7-inspector-rows tag · publish/unpublish | **X-W12U** |
| C-LETTER | 1 | The oracle expects the dated ask letter to name the installed glass version (`@mkbabb/glass-ui` **10.1.0**). The letter is dated 2026-09-22 and names 7.0.0. It is E-3 immutable, so it gets a dated addendum-beside rather than an edit. | views/gradient aurora | **X.W7L.v** |

Total 15+8+3+3+2+2+1 = 34.

## The 45 pre-existing (fail on 7.0.0 as on 10.1.0)
These are not the repin's. They are the standing honest-RED set carried from X-W7R (`m-smoke-classification.md` there: 38 of these 45 are in its 45-list) plus 7 specs added since.
- [smoke-admin] › e2e/smoke/admin/a11y-authed-admin.spec.ts › battery: Flagged populated admin passes accessible-name + target-size
- [smoke-admin] › e2e/smoke/admin/a11y-authed-admin.spec.ts › battery: Names populated admin passes accessible-name + target-size
- [smoke-admin] › e2e/smoke/admin/a11y-authed-admin.spec.ts › battery: Users populated admin passes accessible-name + target-size
- [smoke-admin] › e2e/smoke/admin/flows/color-reject.spec.ts › admin reject color name POSTs /admin/colors/<id>/reject
- [smoke-admin] › e2e/smoke/admin/flows/tag-delete.spec.ts › admin tag delete DELETEs /admin/tags/<name>
- [smoke-mobile] › e2e/smoke/mobile/blob-presence-mobile.spec.ts › hero blob FULL PRESENCE at 390: formula-sized, contained in the card, idle-parked (Q7 + the seat law)
- [smoke] › e2e/smoke/a11y-gradient-stop-grammar.spec.ts › C3 · the full keyboard grammar moves the stop — every key measured at style.left
- [smoke] › e2e/smoke/a11y-select-title.spec.ts › B1 · composed trigger title — the combobox name derives from a rendered title inside the field composition
- [smoke] › e2e/smoke/a11y-select-title.spec.ts › B2 · trigger height rides the size axis — and lifts with the coarse rung
- [smoke] › e2e/smoke/flows/color-propose.spec.ts › a successful propose returns the toolbar to its actions state
- [smoke] › e2e/smoke/oracles/o10-type-locks.spec.ts › O-10a — the mobile matrix (390) › phones: pane title floor-pins AT heading (deliberate no-op); About = honest 2-line lock
- [smoke] › e2e/smoke/oracles/o10d-display-voice-census.spec.ts › O-10d census — the 390 phone band: the card name clamps to TWO lines under the serif
- [smoke] › e2e/smoke/oracles/o10d-display-voice-census.spec.ts › O-10d census — user-data names (browse wall): display voice, ≤500, non-italic; line-clamp under the serif
- [smoke] › e2e/smoke/oracles/o11-header-gates.spec.ts › O-11 gate 3 — the swell completes ≤64px; no naked window under the earliest colliders
- [smoke] › e2e/smoke/oracles/o12-blob-seat.spec.ts › O-12 · 3 — hover-mood frame-diff floor: the parked bead visibly answers a hover within 400ms
- [smoke] › e2e/smoke/oracles/o15-dock-register.spec.ts › O-15b · the Tools clip release + register pass (W6-8) › T-36 (§0.6): the Tools trigger wears the true-button box-model
- [smoke] › e2e/smoke/oracles/o17-easing-composition.spec.ts › O-17 composition: stamps, dot rest, one-literal, mint law
- [smoke] › e2e/smoke/oracles/o17-easing-composition.spec.ts › O-17 zero letterbox across curve regimes — 390
- [smoke] › e2e/smoke/oracles/o17-easing-composition.spec.ts › O-17 zero letterbox across curve regimes — desktop
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census (dark) › graph nodes — the F-3 fill/ink chain (hover commits fill + derived ink together)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census (light) › graph nodes — the F-3 fill/ink chain (hover commits fill + derived ink together)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census (light) › menus — the slug pill + Profile trigger wear certified floating-rung ink (A11Y-F2)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census · R27 blind rows (dark) › the admin pill — the ONE ink that bypasses certification (A-1)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census · R27 blind rows (dark) › the profile menu ROW LABELS — the unguarded population, over live content (N-3)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census · R27 blind rows (light) › the admin pill — the ONE ink that bypasses certification (A-1)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts › O-18 census · R27 blind rows (light) › the profile menu ROW LABELS — the unguarded population, over live content (N-3)
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts › netting luma delta ≥45/255 — 390, dark
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts › netting luma delta ≥45/255 — desktop, dark
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts › netting luma delta ≥59/255 — 390, light
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts › netting luma delta ≥59/255 — desktop, light
- [smoke] › e2e/smoke/oracles/o20-generate-plate.spec.ts › O-20 · the Generate verb joins the plate chrome › T-17 seed-exact strips: a preset row's stamped stops ≡ the palette selecting it yields
- [smoke] › e2e/smoke/oracles/o22-status-lamp.spec.ts › O-22 · the dock status lamp (W6-6 / T-9) › transport failure → the unavailable variant, first-paint band chrome
- [smoke] › e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts › out-of-gamut rows are marked, and no printed coordinate was projected
- [smoke] › e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts › O-26 aurora perceptibility — the field migrates unmistakably over 10s
- [smoke] › e2e/smoke/oracles/o27-focus-affordance.spec.ts › BR-1 forced-colors · EVERY operable control class paints an outline, not only the rail handle
- [smoke] › e2e/smoke/oracles/o27-focus-affordance.spec.ts › BR-3 · fine pointer: effective target ≥ 24px, the 20px visual dot HELD
- [smoke] › e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts › the first painted atmosphere is the seeded pick's, on a cold load
- [smoke] › e2e/smoke/oracles/o29-scene-contracts.spec.ts › gradient scene — the Gradient stage owns its authoring stage, its selected-stop inspector and its stable actions
- [smoke] › e2e/smoke/oracles/o9-shadow-palette.spec.ts › O-9 · Extract — the instrument face: live-k ghost that re-segments without growing, LIVING pulse, PRM-static
- [smoke] › e2e/smoke/scene-action-contract.spec.ts › D4 · an unregistered target is a TYPED, SURFACED state — never silence › Generate: every action is named, modelled 'unavailable', and inoperable
- [smoke] › e2e/smoke/scene-action-contract.spec.ts › D4 · an unregistered target is a TYPED, SURFACED state — never silence › Gradient: every action is named, modelled 'unavailable', and inoperable
- [smoke] › e2e/smoke/scene-action-contract.spec.ts › D4 · an unregistered target is a TYPED, SURFACED state — never silence › Mix: every action is named, modelled 'unavailable', and inoperable
- [smoke] › e2e/smoke/w12-drag.spec.ts › w12-drag — 2 s drag on the surface and each slider holds frame budget
- [smoke] › e2e/smoke/walk.spec.ts › walk all user views sequentially with zero console errors
- [smoke] › e2e/smoke/webgl-blob-idle.spec.ts › hero blob parks its WebGL loop after N ms idle (0 un-gated idle rAF)
