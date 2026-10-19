SERVED MODEL: claude-opus-5-5
# X.W7R.m smoke classification (2026-09-23) — isolated trees (git archive HEAD 56394291; iso = HEAD + the migration patch at 10.0.1; base = HEAD at 7.0.0), --workers=1

## iso full run: 281 tests → 71 failed · 2 skipped · 1 did not run · 207 passed (43.8m; load 59.50→21.73)
## the 71 re-run at base 7.0.0 (--last-failed): 45 failed · 26 passed (15.0m; load 17.39→25.10) = PRE-EXISTING at HEAD:
- [smoke-admin] › e2e/smoke/admin/a11y-authed-admin.spec.ts:34:5 › battery: Flagged populated admin passes accessible-name + target-size
- [smoke-admin] › e2e/smoke/admin/a11y-authed-admin.spec.ts:34:5 › battery: Names populated admin passes accessible-name + target-size
- [smoke-admin] › e2e/smoke/admin/a11y-authed-admin.spec.ts:34:5 › battery: Users populated admin passes accessible-name + target-size
- [smoke-admin] › e2e/smoke/admin/flows/color-reject.spec.ts:9:1 › admin reject color name POSTs /admin/colors/<id>/reject
- [smoke-admin] › e2e/smoke/admin/flows/tag-delete.spec.ts:9:1 › admin tag delete DELETEs /admin/tags/<name>
- [smoke] › e2e/smoke/a11y-gradient-stop-grammar.spec.ts:374:1 › C3 · the full keyboard grammar moves the stop — every key measured at style.left
- [smoke] › e2e/smoke/a11y-select-title.spec.ts:304:1 › B1 · composed trigger title — the combobox name derives from a rendered title inside the field composition
- [smoke] › e2e/smoke/a11y-select-title.spec.ts:393:1 › B2 · trigger height rides the size axis — and lifts with the coarse rung
- [smoke] › e2e/smoke/flows/color-propose.spec.ts:128:1 › a successful propose returns the toolbar to its actions state
- [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
- [smoke] › e2e/smoke/oracles/o10-type-locks.spec.ts:145:5 › O-10a — the mobile matrix (390) › phones: pane title floor-pins AT heading (deliberate no-op); About = honest 2-line lock
- [smoke] › e2e/smoke/oracles/o10d-display-voice-census.spec.ts:217:1 › O-10d census — user-data names (browse wall): display voice, ≤500, non-italic; line-clamp under the serif
- [smoke] › e2e/smoke/oracles/o10d-display-voice-census.spec.ts:264:1 › O-10d census — the 390 phone band: the card name clamps to TWO lines under the serif
- [smoke] › e2e/smoke/oracles/o11-header-gates.spec.ts:122:1 › O-11 gate 3 — the swell completes ≤64px; no naked window under the earliest colliders
- [smoke] › e2e/smoke/oracles/o11-header-gates.spec.ts:160:1 › O-11 gate 4 — compositor-only: pane-* keyframes carry ONLY transform/opacity; the CDP layout track is FLAT under a live scrub
- [smoke] › e2e/smoke/oracles/o12-blob-seat.spec.ts:134:1 › O-12 · 3 — hover-mood frame-diff floor: the parked bead visibly answers a hover within 400ms
- [smoke] › e2e/smoke/oracles/o14-preview-truth.spec.ts:373:5 › O-14 · the T-17 chip referent (mix Space/Hue ramps) › every open-menu chip's painted gradient carries exactly its stamped stops
- [smoke] › e2e/smoke/oracles/o14-preview-truth.spec.ts:440:5 › O-14 · the T-17 chip referent (mix Space/Hue ramps) › the chip feasibility leg: every preview chip is perceptible against the menu surface — never the near-black / near-transparent clamp a byte-honest sampler would still serialize
- [smoke] › e2e/smoke/oracles/o15-dock-register.spec.ts:125:5 › O-15b · the Tools clip release + register pass (W6-8) › T-36 (§0.6): the Tools trigger wears the true-button box-model
- [smoke] › e2e/smoke/oracles/o15-dock-register.spec.ts:50:5 › O-15a · the seal abrogation (negative watch) › the register-law sibling stays dispositioned — no geometric ring on mix dots
- [smoke] › e2e/smoke/oracles/o17-easing-composition.spec.ts:118:5 › O-17 zero letterbox across curve regimes — 390
- [smoke] › e2e/smoke/oracles/o17-easing-composition.spec.ts:118:5 › O-17 zero letterbox across curve regimes — desktop
- [smoke] › e2e/smoke/oracles/o17-easing-composition.spec.ts:144:1 › O-17 composition: stamps, dot rest, one-literal, mint law
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:1282:9 › O-18 census · R27 blind rows (light) › the admin pill — the ONE ink that bypasses certification (A-1)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:1307:9 › O-18 census · R27 blind rows (dark) › the profile menu ROW LABELS — the unguarded population, over live content (N-3)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:1307:9 › O-18 census · R27 blind rows (light) › the profile menu ROW LABELS — the unguarded population, over live content (N-3)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:637:9 › O-18 census (light) › menus — the slug pill + Profile trigger wear certified floating-rung ink (A11Y-F2)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:712:9 › O-18 census (dark) › graph nodes — the F-3 fill/ink chain (hover commits fill + derived ink together)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:712:9 › O-18 census (light) › graph nodes — the F-3 fill/ink chain (hover commits fill + derived ink together)
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts:71:9 › netting luma delta ≥45/255 — 390, dark
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts:71:9 › netting luma delta ≥45/255 — desktop, dark
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts:71:9 › netting luma delta ≥59/255 — 390, light
- [smoke] › e2e/smoke/oracles/o19-netting-luma.spec.ts:71:9 › netting luma delta ≥59/255 — desktop, light
- [smoke] › e2e/smoke/oracles/o20-generate-plate.spec.ts:60:5 › O-20 · the Generate verb joins the plate chrome › T-17 seed-exact strips: a preset row's stamped stops ≡ the palette selecting it yields
- [smoke] › e2e/smoke/oracles/o22-status-lamp.spec.ts:80:5 › O-22 · the dock status lamp (W6-6 / T-9) › transport failure → the unavailable variant, first-paint band chrome
- [smoke] › e2e/smoke/oracles/o25-atmosphere-response.spec.ts:124:1 › X:ATMO-1 — the named atoms move with the seed, read from committed frames
- [smoke] › e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts:52:1 › O-26 aurora perceptibility — the field migrates unmistakably over 10s
- [smoke] › e2e/smoke/oracles/o27-focus-affordance.spec.ts:103:1 › BR-3 · fine pointer: effective target ≥ 24px, the 20px visual dot HELD
- [smoke] › e2e/smoke/oracles/o27-focus-affordance.spec.ts:321:1 › BR-1 forced-colors · EVERY operable control class paints an outline, not only the rail handle
- [smoke] › e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts:114:1 › the first painted atmosphere is the seeded pick's, on a cold load
- [smoke] › e2e/smoke/scene-action-contract.spec.ts:172:9 › D4 · an unregistered target is a TYPED, SURFACED state — never silence › Generate: every action is named, modelled 'unavailable', and inoperable
- [smoke] › e2e/smoke/scene-action-contract.spec.ts:172:9 › D4 · an unregistered target is a TYPED, SURFACED state — never silence › Gradient: every action is named, modelled 'unavailable', and inoperable
- [smoke] › e2e/smoke/scene-action-contract.spec.ts:172:9 › D4 · an unregistered target is a TYPED, SURFACED state — never silence › Mix: every action is named, modelled 'unavailable', and inoperable
- [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
- [smoke] › e2e/smoke/walk.spec.ts:17:1 › walk all user views sequentially with zero console errors

## repin regressions after the in-seat cures (dock collapse, panel spring, B3 path, grain/readout): re-run of the 17 → 15 failed · 5 passed (4.1m; load 20.73→16.87):
- [smoke-mobile] › e2e/smoke/mobile/blob-presence-mobile.spec.ts:56:1 › hero blob FULL PRESENCE at 390: formula-sized, contained in the card, idle-parked (Q7 + the seat law)
- [smoke-reactivity] › e2e/smoke/reactivity-instant.spec.ts:42:1 › spectrum-drag → component-readout wall-clock ≤ 50ms median across 5 paths
- [smoke] › e2e/smoke/oracles/o15-dock-register.spec.ts:87:5 › O-15b · the Tools clip release + register pass (W6-8) › settled rest releases the clip — the hover capsule + shadow render whole
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:766:9 › O-18 census (dark) › markdown About body — prose + code ink on the rung-1 plate (h-gaps G-2)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:766:9 › O-18 census (light) › markdown About body — prose + code ink on the rung-1 plate (h-gaps G-2)
- [smoke] › e2e/smoke/oracles/o18-contrast-census.spec.ts:992:9 › O-18 W6.5 legs (light) › the IDENTITY leg — the certified accent SPEAKS the pick: hue held, C ≥ 0.35× (T-35)
- [smoke] › e2e/smoke/oracles/o7-card-census.spec.ts:190:5 › O-7 census — every pane a rung-1 PLATE, every named fixture on its rung (dark)
- [smoke] › e2e/smoke/oracles/o7-card-census.spec.ts:190:5 › O-7 census — every pane a rung-1 PLATE, every named fixture on its rung (light)
- [smoke] › e2e/smoke/oracles/o7-card-census.spec.ts:434:1 › O-7 · t-mobile F-8 — the 390 frame: membership holds at the phone band (captures attached)
- [smoke] › e2e/smoke/oracles/readout-seam.spec.ts:150:5 › T-33b — the reserved-line band is designed air, never a dead band › rgb @ its one-line lock: reserved ≡ painted — the anchor mints no air
- [smoke] › e2e/smoke/oracles/readout-seam.spec.ts:86:5 › T-33b — the reserved-line band is designed air, never a dead band › lab @ one-line tuple: the numbers sit flush at the box bottom; the air rides above
- [smoke] › e2e/smoke/oracles/w7-inspector-rows.spec.ts:86:5 › G13 · the six inspector rows — a failure is rendered where the act was taken › tag — a refused tag save is said on the inspector
- [smoke] › e2e/smoke/url-color-precedence.spec.ts:61:1 › URL hash color WINS over populated localStorage (readout + trigger + accent agree)
- [smoke] › e2e/smoke/views/gradient.spec.ts:612:1 › gradient selector aurora ──────────────────
- [smoke] › e2e/smoke/webgl-blob-idle.spec.ts:150:5 › hero blob carries current chroma — oklch(0.55 0.37 328)
