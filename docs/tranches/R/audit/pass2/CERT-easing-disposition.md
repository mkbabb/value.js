# CERT-easing-disposition — Pass-3 certification

**Critic**: Fable (pass-3 certification) · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/easing-disposition.md` (pass-2: 93%, 2 mustFix)
**Trees checked live this pass**: value.js `tranche-q` @ `e80b359` (1.2.0) · glass-ui @ BG head `267b1b34` (post-4.2.0, BG executing) · keyframes.js src · bbnf-buddy main tree
**Discharge under audit**: PASS2-VERDICT §3 **M6** (the sole §3 row targeting this item) ≡ CRIT-easing-disposition.md §5 gaps 1–2, executed by lane L3-doc-sweeps (`L3-doc-sweeps.md §2`).

---

## §1 — Verdict

**CERTIFIED — 100.** Both pass-2 mustFix rows are discharged in the amended text itself (not merely claimed by the lane report); every new citation the discharge introduced verifies against the live trees; no new error was introduced. Under the certification rule (all prior mustFix discharged + no new implementer-facing defect), the score is 100. mustFix: **empty**.

Disposition unchanged and re-affirmed: **A** (author-a-curve consume) + Rider 1 required + Rider 2 recommended (now correctly conditioned) + steps-allow.

---

## §2 — mustFix discharge audit (checked in the text, not the lane report)

### M6(a) ≡ CRIT §5.1 — the bbnf-buddy consumer sweep

**DISCHARGED** — `easing-disposition.md:113` (the `[pass-3]` paragraph appended to §2.2) plus the §4 R-3 Cost-cell mirror (`:140`). Every constituent claim re-verified live this pass:

| Amended-text claim | Live check | Verdict |
|---|---|---|
| `bbnf-buddy/src/animation/easingGroups.ts:11` imports `bezierPresets` + `timingFunctionDescriptions` from `@mkbabb/value.js` | grep: exact hit at :11 | ✓ |
| The only read is name-membership: `isBezier: name in bezierPresets` (`:32`) | grep: `bezierPresets` appears in the file at :11 and :32 only; :32 is the membership test verbatim | ✓ |
| Rider 1 flips `smooth-step-3`'s `isBezier` false→true — the correct classification | Non-vacuous: bbnf-buddy lists `item("smooth-step-3")` at `easingGroups.ts:70`; and `smooth-step-3` is genuinely absent from `bezierPresets` today (its only `easing.ts` occurrences are :420 `timingFunctionDescriptions` and :493 `timingFunctions`, both outside the :334-373 table) | ✓ |
| Dep pinned registry `"@mkbabb/value.js": "^0.10.0"` (`bbnf-buddy/package.json:25`) | grep: exact hit at :25 | ✓ |
| Semver-fenced from both riders until bbnf-buddy bumps its own range | `^0.10.0` resolves `>=0.10.0 <0.11.0` (0.x caret pins minor) — no 1.x/2.x cut can reach it | ✓ |

The paragraph lands exactly where the critic asked (§2.2, after Rider 2), names the gap's provenance (`easing.ts:329-333` docstring — re-read this pass, bbnf-buddy named verbatim at :330-331), and concludes benign-both-riders / no relay ask / no consumer-side coordination — matching PASS2-VERDICT §5's own independent verification of the same facts.

### M6(b) ≡ CRIT §5.2 — the 1.3.0-branch semver conditioning

**DISCHARGED** — two sites, as M6 ordered (`§2.2/§4`):
- Rider 2 paragraph (`easing-disposition.md:111`): the "no extra semver event" claim now reads as conditioned — "**if that ratifies at 2.0.0**; if the KF-1 rename ratifies at 1.3.0 instead, Rider 2 … either defers to the eventual major or is itself major-forcing — the 'no extra semver event' claim is conditioned on the 2.0.0 branch of that still-open ratification, not settled independent of it." This is the exact one-sentence shape CRIT §5.2 specified (both branch-outcomes named).
- §4 R-3 row (`:140`): Ask cell carries the conditioning parenthetical; Cost cell carries the bbnf-buddy-unaffected note. Consistent with PASS2-VERDICT §2.3.2's ruling that the conditioning must survive even though Q6's recommended answer is bundle-at-2.0.0.

### Completeness

PASS2-VERDICT §3 contains no other row targeting easing-disposition (M1–M5, M7 target other files; §3's trailing SPEC should-fix row targets SYNTHESIS-v2). CRIT-easing-disposition §5 contained exactly the two gaps above. The amendment banner (`:3`) records the discharge accurately (lane, date, M6, gaps 1–2, disposition-unchanged).

---

## §3 — No-new-error sweep (everything the discharge touched or depends on)

- **keyframes.js grep** (re-asserted in the amended Rider 2 text): re-run this pass — `grep -rn bezierPresets keyframes.js/src` → zero hits, exit 1. ✓
- **Staleness re-check vs the moved glass-ui tree** (BG is executing; the pass-2 reads predate `267b1b34`): `PRESET_NAMES = Object.keys(bezierPresets)` still `useEasingPicker.ts:117`; `presetNames` field still `:83`; boundary law still `:1-15` with "the bezier preset catalogue is value.js `bezierPresets`" at :12; `bezierPresets` in the value.js import block at `:22`; `EasingPicker.vue:80` still `const model = defineModel<EasingPickerValue>()`; `mode` prop at :52. No drift — the packet's glass-ui anchors survive the BG head. ✓
- **Core value.js anchors**: `bezierPresets` docstring :320-333 (consumer list verbatim) + table :334-373 (closes `} as const;` at :373); `smoothStep3` :128-130 (`t*t*(3-2*t)`); `timingFunctions` bezier-bound rows :495-501 (ease×4 + back×3, `CSSCubicBezier(...bezierPresets[…])`); `GRADIENT_EASING_NAMES` re-counted = **24** (`useGradientModel.ts:57-82`); `resolveEasing` :84-88; `src/subpaths/easing.ts` exports `bezierPresets` (:22). ✓
- **Numeric/analytic content**: untouched by the discharge (no table row, bound, or identity was edited); the pass-2 critic reproduced both delta tables to the digit and verified the ⅓-handle exactness analytically — nothing to re-open.
- **Read-only discipline**: the amendment is text-only inside `docs/tranches/R/**`; `src/`, `demo/`, bbnf-buddy, glass-ui untouched (git status shows no source modifications from the lane). ✓

## §4 — Residual nits (below the certification bar; NOT mustFix)

1. `EasingPicker.vue` `mode` prop cite ":52-53" — the declaration is :52 (doc comment :50-51). Off-by-one-adjacent, non-load-bearing, pre-existing from pass 2 (the pass-2 critic passed it).
2. The new paragraph's "bumps past `^1.x`/`^2.x`" phrasing is slightly loose (means: onto a 1.x/2.x-compatible range). The semver fact it encodes is correct.
3. The previously-ruled-cosmetic residuals (`reparseOk` steps-only overstatement at §2.1.2; `EasingPicker.vue:93` near-miss) remain as the pass-2 critic left them — explicitly below the bar per that critique's §2/§4 and the certification charter.

## §5 — Score

| Dimension | Assessment |
|---|---|
| mustFix discharge | 2/2 discharged in the amended text; both verified constituent-by-constituent against live trees |
| New-claim accuracy | 5/5 new bbnf-buddy claims exact; the flip-claim's hidden premise (`smooth-step-3` listed in bbnf-buddy AND absent from `bezierPresets`) independently confirmed on both sides |
| Regression check | Zero new errors; glass-ui anchors re-verified against the post-pass-2 BG head |
| Disposition | A + R-1 + R-2(conditioned) + R-4 allow — unchanged, ratification-ready |

**Convergence: 100%. CERTIFIED — co-sign. mustFix: none.**
