# CRIT-easing-disposition — Pass-2 critic verification

**Critic**: Fable (pass-2) · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/easing-disposition.md`
**Trees checked**: value.js `tranche-q` @ `e80b359` (1.2.0) · glass-ui @ 4.2.0 (`/Users/mkbabb/Programming/glass-ui`, `package.json` version verified) · keyframes.js 5.1.0 · bbnf-buddy (registry consumer)
**Ancestor**: proto-glassui-consume (pass-1, 90%) → PASS1-VERDICT §5 rows 5, 13, 15, 16 (+ row 20 rider) · §7 seed 6

---

## §1 — Verdict in one line

**The packet's central overturn is TRUE and verified end-to-end: 23 of 24 `GRADIENT_EASING_NAMES` are already `EasingPicker` presets because the preset catalogue IS value.js `bezierPresets`; `smooth-step-3` is exactly `cubic-bezier(⅓, 0, ⅔, 1)`; both deviation tables reproduce to the digit; all four mustFix rows are genuinely discharged, not paraphrased. Disposition A is right, the riders are right-sized, no precept is violated. Two small record-completeness gaps keep it from co-sign: an unswept consumer the packet's own quoted docstring names (bbnf-buddy — I checked it: benign), and an uncontingent "no extra semver event" claim resting on the still-open 2.0.0-vs-1.3.0 question.**

Convergence: **93%**.

---

## §2 — Citation spot-check (every load-bearing claim, against the live trees)

| Packet claim | Live-tree check | Verdict |
|---|---|---|
| `bezierPresets` = 23 rows at `src/easing.ts:334-373`; docstring `:320-333` one-source-of-truth incl. "keyframes.js, bbnf-buddy, future editors" | Read: 1+4+3×6 = 23 rows exactly at :334-373; docstring :320-333 verbatim | ✓ |
| `PRESET_NAMES = Object.keys(bezierPresets)` — glass-ui `useEasingPicker.ts:117`; `presetNames` at `:83` | Read: exact at :117, :83 | ✓ |
| Boundary law at `useEasingPicker.ts:1-15` ("the bezier preset catalogue is value.js `bezierPresets`" at :12) | Read: verbatim | ✓ |
| `GRADIENT_EASING_NAMES` = **24** names = the 23 presets + `smooth-step-3`; "no stepped" comment at `useGradientModel.ts:56` | Read `:56-82`: 24 entries, strict superset-by-one confirmed name-by-name | ✓ (mustFix #13 discharged) |
| `back`×3 never analytic; `timingFunctions` binds them `CSSCubicBezier(bezierPresets[…])` at `easing.ts:495-501`; quad/cubic/sine/circ/expo bind analytic Penner (`:102-127, 226-264`) | Read `:427-505`: back×3 + ease×4 bezier-bound at :495-501; quad/cubic (:429-445), sine/circ/expo (:465-490) bind the analytic exports; `smoothStep3` at :492-493. No analytic back exists in the file | ✓ — pass-1's "13" was doubly wrong exactly as the packet says |
| `smoothStep3(t) = t²(3−2t)` at `easing.ts:128-130` | Read: exact | ✓ |
| `smooth-step-3 ≡ cubic-bezier(⅓, 0, ⅔, 1)` EXACT | Verified analytically (independent of the script): with x-handles ⅓/⅔, x(t)=t (Bernstein telescoping); y(t)=3(1−t)t²·1+t³ = 3t²−2t³ = smoothStep3. Also y1=0,y2=⅓ gives t² and y1=⅓·2? — the four ⅓-handle EXACT rows in the tightened table (quad-in t², quad-out 2t−t², cubic-in t³, cubic-out 1−(1−t)³) all expand correctly by hand | ✓ |
| §1.4 left column (current-table deviations, worst `ease-out-circ` 0.1923) | Re-ran `scratchpad/easing-delta.mjs`: all 16 rows reproduce to 4 decimals | ✓ |
| §1.4 right column (tightened table, worst 0.0387 `in-out-circ`) + control points | Re-ran `scratchpad/easing-delta2.mjs`: all 15 rows + points match; script's analytic forms match `easing.ts:102-130, 226-264` exactly | ✓ |
| §1.5 bounds: ΔE_ok(default stops)=0.3032 → 0.058 (2.9× JND) vs 0.0117 (0.59×); `DELTA_E_OK_JND=0.02` at `gamut.ts:55` | Script output 0.3032/0.0583/0.0117; JND constant at `src/units/color/gamut.ts:55`; black→white ≈2×/≈10× arithmetic checks | ✓ |
| glass-ui `dist/easing.js:6` imports `bezierPresets` from `@mkbabb/value.js` as external; preset list computed at module init | Read dist line 6 verbatim; `R = Object.keys(O)` in the same chunk — a new row flows at consumer build time, no glass-ui republish | ✓ |
| keyframes.js does not import `bezierPresets` | Grepped `keyframes.js/src`: zero hits | ✓ |
| Serialization never carries names: `useGradientCSS.ts:28-93` stops-only + baked sub-stops `:82-89`; `parseGradientCSS` linear-reset `:206-210`; `applyCSS` `:176-186` | Read all three: exact | ✓ — the UI-session-only stakes claim holds |
| `EasingPickerValue.css` "complete re-parseable CSS literal" `:52-64`; `reparseOk` `:182-186`; `EasingPicker.vue:80` `defineModel<EasingPickerValue>()`; `mode` prop `:52-53`; `EasingConfigurator.vue:5-6` GradientPane consumer shape | All read, all exact (mustFix #16 discharged) | ✓ |
| `ColorSpaceSelector.vue`: `variant="ghost"` at **:15**, font override :16-17 — correcting BOTH pass-1 (:17) and the pass-1 critic (:18-19) | Read `display/ColorSpaceSelector.vue:14-17`: ghost at :15, `fontFamily: 'var(--font-display)'` at :16, `text-title sm:text-display` at :17 | ✓ (mustFix #15 discharged, and the packet's double-correction is right) |
| Fork inventory: `EasingSelector.vue` 66 LoC; wired at `GradientVisualizer.vue:217-219`; interval default `linear` at `useGradientModel.ts:103`; `GradientInterval` `:30-33`; default stops `:98-101` | `wc -l` = 66; read all cites: exact | ✓ |
| §2.3 sequencing carries the W3→W4 correction + the GAP-3 `/easing` subpath-watch booking | Present at §2.3 last para | ✓ (mustFix #20 rider discharged) |

**Zero citation failures.** The one line-number-adjacent nit: §1.1 says `presetNames` "consumed in `EasingPicker.vue:93`" — :93 is inside the destructure block, near enough; not load-bearing.

## §3 — mustFix discharge audit (PASS1-VERDICT §5 rows 5, 13, 15, 16)

- **Row 5** ("ratify with the precise drop: 13 of 24"): discharged **by verified overturn**, not paraphrase. The packet demonstrates the "13" premise was wrong on three independent axes (names persist as presets; back×3 was never analytic; smooth-step-3 is exactly representable) and replaces it with the stronger record the row actually wanted — a per-name mapping table with quantified deviations. This is the sanctioned failure mode PASS1-VERDICT §6 itself blessed ("prototype lanes may re-frame their charters against binding contracts"). I independently confirmed each axis (§2 above).
- **Row 13** (23→24): discharged, count re-verified.
- **Row 15** (ColorSpaceSelector cites): discharged — and the packet caught that both prior line numbers had drifted; today's tree agrees with the packet, not with either predecessor.
- **Row 16** (defineModel notation): discharged verbatim.

## §4 — Precept attack (all survived)

- **No interim / no legacy**: Option B's rejection is airtight — holding the 66-LoC fork pending a producer prop is exactly the N.W13 pattern pass 1 refuted; and the "producer prop" would duplicate a seeding channel that already exists (the catalogue IS value.js-owned). Verified the boundary law text the argument rests on.
- **No producer contrivance**: the arbitrary-`fn`-preset analysis is correct — `EasingPickerValue.css` is documented as the complete re-parseable literal (`:54`), and a transcendental has none. One overstatement: §2.1.2 says this is "enforced by the `reparseOk` round-trip proof (:182-186)" — `reparseOk` covers **steps mode only** (bezier trivially `true`, per its own doc `:95-99`). The contract claim stands on the `css` doc + readout implementation regardless; precision nit, not a defect in the argument.
- **KISS / right-sizing**: Rider 1 is one line; Rider 2 is one const table and is the load-bearing difference between "no visual regression" and "recorded 2.9×-JND regression" — in-scope for a packet whose charter is the mapping record. Steps-mode disposition costs zero producer work either way. No over-scoping found.
- **Staleness vs glass-ui 4.2.0/BG + kf 5.1.0**: all glass-ui reads are against the live 4.2.0 source + shipped dist; kf grep clean. No stale anchors.

## §5 — What keeps it from co-sign (the two gaps)

1. **Incomplete consumer sweep for the riders — bbnf-buddy, named by the very docstring the packet quotes.** §1.1 quotes `easing.ts:329-333` ("every consumer (keyframes.js, **bbnf-buddy**, future editors)"); §2.2 Rider 2 then greps keyframes.js only and asserts "in-tree consumers are …". I swept it: `bbnf-buddy/src/animation/easingGroups.ts:11` imports `bezierPresets` + `timingFunctionDescriptions`; usage is **name-membership only** (`isBezier: name in bezierPresets`, `:32`) — it never reads control-point values, so Rider 2 cannot affect it; Rider 1 flips `smooth-step-3`'s `isBezier` to `true` on upgrade, the *correct* classification; and its dep is registry `^0.10.0` (`bbnf-buddy/package.json:25`), semver-fenced from any 1.x/2.x cut. **Outcome benign — but a ratification packet whose §1.4 table is "the recorded-drop artifact" must carry the full consumer record, especially one its own quoted evidence names.** One-paragraph amendment.
2. **"Costing no extra semver event" is contingent on an open question, stated as settled.** Rider 2 "rides the same 2.0.0 cut the tranche already contemplates for the KF-1 rename" — but PASS1-VERDICT §5 row 1 / §7 seed 3 explicitly re-frame Q5/Q6 as **grammar-fix(patch-arguable) vs rename(major), tabled for the 2.0.0-vs-1.3.0 ratification**. If that ratifies at 1.3.0, Rider 2 (a behavior-visible change to published preset values) either defers or *itself forces* the major — i.e., it would cost exactly the semver event the packet says it doesn't. R-3's table row does carry the "riding the 2.0.0 cut" condition, and the decline path is stated; what's missing is the one sentence naming the 1.3.0 branch (defer R-3 to the eventual major, or accept that R-3 is itself major-forcing). One-sentence amendment.

Neither gap touches the disposition: A is correct under every branch of both.

## §6 — Score

| Dimension | Assessment |
|---|---|
| Factual accuracy | Every citation verified; both numeric tables reproduced to the digit; the exactness claims verified analytically, independent of the scripts |
| mustFix discharge | 4/4 rows genuinely discharged (row 5 by verified overturn — the strongest form) |
| Precepts | Clean: zero interims, zero producer contrivance, glass-ui-first honored, right-sized riders |
| Record completeness | Two gaps (§5): the bbnf-buddy sweep, the 2.0.0-contingency sentence — both one-line-scale, neither verdict-bearing |

**Convergence: 93%.** Amend the two §5 items and this packet is co-signable as-is; the disposition (A + Rider 1 required + Rider 2 recommended + steps-allow) should ratify unchanged.
