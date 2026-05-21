# F.W4 Lane 2 — Substrate-Without-Consumer

**Date**: 2026-05-21
**Branch**: tranche-f
**Audit HEAD**: cf42c6c
**Scope** (per `docs/tranches/F/waves/F.W4.md` audit-lane 2): for each artefact F introduces, verify it has a consumer + the consumer is not stale.

## Lane verdict: PASS

Every F substrate has a live, non-stale consumer (or, for the `lerpLegacy` delete, the absence-as-state invariant holds). No drift detected.

## Per-substrate verdict table

| # | Substrate | Consumer(s) | Evidence | Verdict |
|---|---|---|---|---|
| 1 | `docs/tranches/F/W8-W12-consumer-lockstep.md` | `docs/tranches/F/F.md` §0 pointer; cross-refs from `findings.md`, `dispatch/AGENT.md`, `waves/F.W0.md`, `waves/F.W4.md`, audit docs `F-AUDIT-3-w8-w12-drift.md` + `F-AUDIT-1-prompts-precepts.md` | grep finds the back-reference at F.md L12 ("Authority lives at…") + 5 in-tranche citations + 2 audit-doc cross-refs | PASS |
| 2 | Github icon migration (F.W0 Lane A) | gh-pages build (Vite + Rolldown) + 2 demo files | `npm run gh-pages` exit 0; inline `<svg viewBox="0 0 24 24" fill="currentColor"…>` present in `demo/@/components/custom/dock/menus/ProfileSection.vue:119` + `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:88` | PASS |
| 3 | Typed `Memoized<T>` (F.W1 Lane A) | `src/utils.ts` export + 7 downstream call sites | `grep 'Memoized<' src/` → 3 hits in `src/utils.ts` (L104 type decl + L111 return + L148 cast). `grep 'memoize(' src/` → 7 call sites: `units/normalize.ts:129`, `parsing/stylesheet.ts:512`, `parsing/index.ts:262,269,275`, `parsing/animation-shorthand.ts:200`, `parsing/units.ts:114`, `parsing/color.ts:597` | PASS |
| 4 | Rolldown declarative `codeSplitting` (F.W1 Lane B) | gh-pages build pipeline (named vendor chunks) | `vite.config.ts:174-184` declares `codeSplitting` with `vendor-katex` (`/node_modules[\\/]katex/`) + `vendor-highlight` (`/node_modules[\\/]highlight/`). `npm run gh-pages` emits `dist/gh-pages/assets/vendor-katex-k7BK6QKS.js` (258.87 kB) + `dist/gh-pages/assets/vendor-highlight-QRU0io6_.js` (34.24 kB) | PASS |
| 5 | Vendor sweep (F.W1 Lane C) — 22 kept / 29 deleted | 22 kept subdirs all have ≥ 1 demo consumer; 29 deleted subdirs all have ZERO references | Re-ran consumer grep (see "Vendor-sweep re-grep" below). All 22 kept ≥ 1 (min: `collapsible/label/sheet/skeleton/switch` = 1; max: `button` = 22). All 29 deleted = 0. No dangling imports. | PASS |
| 6 | keyframes.js cross-repo write (F.W2 Lane A) | keyframes.js test suite | `/Users/mkbabb/Programming/keyframes.js` HEAD `470814e` "fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order". `npm test` (vitest 4.1.7) → 218 / 218 passed across 15 files, 2.94 s. | PASS |
| 7 | `lerpLegacy` delete (F.W3 Lane A) | ZERO — absence IS the new state per F2 invariant | `grep -rn 'lerpLegacy' src/ test/ dist/` → no matches (exit 0, zero output) | PASS |
| 8 | 5 F.W3 CI hygiene gates | CI workflow YAML + 3 local-runnable gates | YAML valid (python yaml.safe_load OK, jobs: `build-and-test`, `deploy`). `proof:dts-layout` PASS (flat dist/ dts emission). `dist/value.js` = 124 936 bytes (< 148 480 budget; 16 %% headroom). `vue-tsc --noEmit` → 0 errors (strict-zero gate). CI hooks confirmed at workflow lines 42-53 (vue-tsc gate), 67 (proof:dts-layout), 70-81 (bundle-size), 100-101 (proof:resolution), 211-226 (CHANGELOG-changed gate). | PASS |

## Vendor-sweep re-grep (substrate 5 detail)

### 22 kept subdirs — consumer counts (`@components/ui/<sd>` imports across `demo/`)

| Subdir | Consumers | | Subdir | Consumers |
|---|---:|---|---|---:|
| alert | 2 | | popover | 5 |
| avatar | 2 | | radio-group | 2 |
| badge | 10 | | select | 7 |
| button | 22 | | separator | 3 |
| card | 13 | | sheet | 1 |
| checkbox | 2 | | skeleton | 1 |
| collapsible | 1 | | slider | 5 |
| dialog | 4 | | switch | 1 |
| dropdown-menu | 5 | | tabs | 8 |
| hover-card | 3 | | tooltip | 6 |
| input | 3 | | | |
| label | 1 | | | |

All 22 ≥ 1 consumer. No stale-kept subdir.

### 29 deleted subdirs — zero-reference check

`accordion`, `alert-dialog`, `aspect-ratio`, `auto-form`, `breadcrumb`, `calendar`, `carousel`, `chart`, `chart-area`, `chart-bar`, `chart-donut`, `chart-line`, `command`, `context-menu`, `drawer`, `form`, `menubar`, `navigation-menu`, `number-field`, `pagination`, `pin-input`, `progress`, `range-calendar`, `resizable`, `tags-input`, `textarea`, `toggle`, `toggle-group`, `v-calendar`

For each: `grep -rln @components/ui/<sd>` and `grep -rln @/components/ui/<sd>` across `demo/` both return 0. No dangling imports.

## Detail — substrate 8 gates

| Gate | Command | Result | Threshold |
|---|---|---|---|
| dts-layout | `npm run proof:dts-layout` | `[proof:dts-layout] PASS — flat dist/ dts emission` (exit 0) | flat layout |
| bundle-size | `npm run build && stat -f%z dist/value.js` | 124 936 bytes | ≤ 148 480 (145 KB) |
| vue-tsc | `npx vue-tsc --noEmit \| grep -c 'error TS'` | 0 | ≤ 0 |
| CHANGELOG-changed | workflow L211-226 | YAML valid | PR gate |
| proof:resolution | workflow L100-101 | YAML valid | exit 0 in CI |

## Drift

NONE.

- All 8 substrates have ≥ 1 live consumer (or the F2 absence-as-state invariant holds for substrate 7).
- No dangling imports from the F.W1 Lane C deletion.
- The keyframes.js cross-repo write is the SOLE peer-repo mutation in F's window (HEAD `470814e` is value.js-attributed; tests PASS).
- CI workflow YAML parses cleanly; all 5 F.W3 hygiene gates wired.

## Conclusion

Lane 2 PASS. Tranche F introduces no substrate-without-consumer. The 8 substrates inventoried in F.W4 §audit-lane-2 are each consumed by at least one live downstream (or, for `lerpLegacy`, the deletion is bare and the invariant holds). Safe to proceed to F.W4 close ceremony.
