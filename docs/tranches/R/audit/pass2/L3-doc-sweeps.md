# L3-doc-sweeps — Pass-3 discharge of PASS2-VERDICT §3 M5, M6, M7

**Lane:** L3-doc-sweeps · **Date:** 2026-07-02 · **Tree:** `tranche-q` @ `e80b359` (value.js 1.2.0)
**Scope:** three of the seven pass-2 mustFixes (M5, M6, M7) — all text-only, per PASS2-VERDICT §4 "no fleet needed." Writable surface: `docs/tranches/R/**` only. No source, no `color-picker.md` merge (that is an R-wave act, not this lane's).

---

## §1 — M5: `overlay-amendment.md` — sweep `color-picker.md:140`

**Target:** `docs/tranches/R/audit/pass2/overlay-amendment.md`

**Verified against the live tree before writing:**
- `docs/frontend-design/color-picker.md:140` — confirmed verbatim: `...MATHEMATICS (the sRGB gamut boundary + perceptual isostep graticule made beautifully visible)...` (`grep -n "MATHEMATICS (the sRGB gamut boundary"` → exact hit at line 140).
- `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue` — `spectrumDotStyle` computed spans **:226-243** (opens `:226`, closes `:243`; `luma` at `:231`, border flip `:232-233`) — confirms the CRIT nit's span claim.
- `color-picker.md:29` already cites `spectrumDotStyle:226-243` (correct); `color-picker.md:110` still cites `spectrumDotStyle:230-235` (stale) — confirmed by direct grep; no numeric cite found at `:151` (the CRIT's "`:110/:151`" pairing only fully resolves at `:110`).

**Edits made:**
1. Extended **P8** (renamed header `:140`/`:141`) with a new REPLACE clause for the MATHEMATICS-pillar parenthetical at `:140` → "the wide-gamut truth line — display-p3 vs sRGB, ΔE>JND — + perceptual isostep graticule made beautifully visible" (verdict's suggested wording, adopted verbatim), plus one sentence explaining why (matches the packet's own F1 vacuity argument).
2. Added the missing row to the **§7 zero-drop ledger** for `:140`, restoring the §0 "no orphaned occurrence" claim to truth.
3. **Optional nits folded in, same motion** (both non-blocking per the critic):
   - P4→P6 numbering gap: added a footnote at the P4 heading explaining P5's intentional absence (F5/F8.1 are citation-sweep beats folded into §4 prose, not standalone passages) — left un-renumbered per the critic's explicit "renumber or footnote" either/or, to avoid touching P6–P10 cross-references used throughout §5/§6/§7.
   - `spectrumDotStyle` span: added a short note after the §7 ledger recording the live-verified span (`:226-243`) and the one stale in-treatment cite (`:110` → `:230-235`), flagged for the R.W3 merge pass, not fixed here (outside this packet's F5/F8.1 charter, per the critic).
4. Added an `AMENDED-AT-PASS-3` provenance line at the top of the file.

**File:line of edits:** `overlay-amendment.md` header (provenance line), P4 heading (footnote), P8 section (`:157-169` region, new REPLACE + retitled heading), §7 ledger (new row), and a new paragraph appended after the §7 table.

---

## §2 — M6: `easing-disposition.md` — bbnf-buddy sweep + semver conditioning

**Target:** `docs/tranches/R/audit/pass2/easing-disposition.md`

**Verified against the live tree before writing (bbnf-buddy at `/Users/mkbabb/Programming/bbnf-buddy`):**
- `bbnf-buddy/src/animation/easingGroups.ts:11` — `import { bezierPresets, timingFunctionDescriptions } from "@mkbabb/value.js";` — confirmed exact.
- `bbnf-buddy/src/animation/easingGroups.ts:32` — `isBezier: name in bezierPresets,` — confirmed exact; this is the only read of `bezierPresets` in the file (the surrounding `item()` function, `:27-33`), and it is name-membership only — no control-point value is ever dereferenced.
- `bbnf-buddy/package.json:25` — `"@mkbabb/value.js": "^0.10.0"` — confirmed exact (dependencies block, alphabetical, between `csp-solver-wasm`/`glass-ui`/`keyframes.js`/`morph`/`pencil-boil` and `@vueuse/core`).
- Cross-checked `easing.ts:329-333`'s docstring (already cited by the packet) does name bbnf-buddy as an intended consumer, confirming the packet's own evidence pointed at this sweep.

**Edits made:**
1. Appended a `[pass-3]` paragraph to **§2.2** (immediately after the Rider 2 paragraph) with the full bbnf-buddy sweep: import site, name-membership-only usage, Rider 1's `isBezier` flip being the *correct* classification (not a regression), and the `^0.10.0` semver fence — concluding "benign, both riders; no relay ask."
2. Added one sentence to the **Rider 2** paragraph in §2.2 conditioning "costing no extra semver event" on the 2.0.0 branch of the still-open KF-1-rename ratification, per CRIT-easing-disposition.md gap 2: if that ratifies at 1.3.0 instead, R-3 either defers to the eventual major or is itself major-forcing.
3. Mirrored both corrections into the **§4 R-3 row** (ratification-asks table): added the conditioning parenthetical to the Ask cell and the bbnf-buddy-unaffected note to the Cost cell.
4. Added an `AMENDED-AT-PASS-3` provenance line at the top of the file.

**File:line of edits:** `easing-disposition.md` header (provenance line), §2.2 Rider 2 paragraph (conditioning sentence appended), new `[pass-3]` paragraph immediately following it, and the §4 R-3 table row.

---

## §3 — M7: `w0-truth.md` — fix the line-31 attribution

**Target:** `docs/tranches/R/audit/pass2/w0-truth.md` (the flagged sentence is at line 33 in the pre-edit numbering after the provenance-line insertion shifted content by 2 lines from the PASS2-VERDICT's "line ~31" cite — confirmed same sentence, same content, only the file's total line count moved)

**Verified against the live tree before writing:**
- `node_modules/@mkbabb/keyframes.js/dist/sequence-C_DCiOIQ.js:1` — the file's *only* line — `import { clamp as e, lerpArray as t, scale as n } from "@mkbabb/value.js/math";`. Confirmed **zero** occurrences of the bare `@mkbabb/value.js` specifier in this file (`grep -c`, python re-count both agree: bare=0, math=1).
- The bare `@mkbabb/value.js` specifier (no `/math` suffix) appears in exactly **12** other keyframes dist chunks in the live tree (one occurrence apiece): `animation-BGyzfzBq.js`, `compile-CcSUwM8R.js`, `delegation-DWwr4IXr.js`, `easing-registry-DHV2-5gA.js`, `engine-DEVgCTUy.js`, `format-C-Gi9r7L.js`, `grammar-BLucehC4.js`, `group-vJcsHKN9.js`, `morph-svg-BToeumw5.js`, `parse-flatten-ZZUSEQEL.js`, `presets-BG2Fczzq.js`, `validate-DDeGnvSt.js` — confirmed by both `grep -o` and an independent Python `re.findall` pass.
- Two installed copies exist in the current tree (excluding `.claude/worktrees/*` noise): `node_modules/@mkbabb/keyframes.js` and the nested `node_modules/@mkbabb/glass-ui/node_modules/@mkbabb/keyframes.js` — content-identical, each with the same 12-bare/1-math split.
- **Count discrepancy noted, not silently reconciled:** CRIT-w0-truth.md:34 records "across keyframes dist, grep = 48× `@mkbabb/value.js` + 1× `/math`" from its own audit-time grep. This pass's live recount finds 12 bare occurrences per installed copy (24 across the two copies present now), not 48. I did not find a third or fourth copy in the current non-worktree tree that would reconcile the difference. This is flagged in the amendment as a count drift against the critic's own figure (possibly environment/npm-install-state drift between audit passes), explicitly **not** a re-opening of the attribution fix or the conclusion — the qualitative fact the fix turns on (`sequence-C_DCiOIQ.js` carries only `/math`, the bare specifier lives elsewhere) is independently reproduced regardless of which aggregate count is used.

**Edits made:**
1. Corrected the prose sentence (previously: "imports **both** `@mkbabb/value.js` and `@mkbabb/value.js/math`") to state `sequence-C_DCiOIQ.js` imports **only** `/math`, with the corrected per-chunk enumeration and the count-discrepancy note above folded in.
2. Also corrected the ASCII import-chain diagram a few lines above (§(a) "The import chain (traced, LIVE)") which carried the same mis-attribution implicitly (both arrows drawn from `sequence-C_DCiOIQ.js`) — split it into two diagram nodes so the diagram and the prose agree.
3. Left the aggregate-only sentence in the R.W0 verify-then-disposition wording block (originally line ~49, "keyframes.js dist imports `@mkbabb/value.js/math` ... + `@mkbabb/value.js`") **untouched** — it makes no per-file claim, so CRIT-w0-truth.md's own ruling ("the aggregate parenthetical is right; the per-file attribution is not") means it needed no correction.
4. Conclusion unchanged: **KEEP** the `@mkbabb/keyframes.js` devDep.
5. Added an `AMENDED-AT-PASS-3` provenance line at the top of the file.

---

## §4 — Discipline notes

- All three edits are additive/corrective text only; no prior content was deleted except the exact stale phrases named in each mustFix.
- No file outside `docs/tranches/R/**` was written. `src/`, `demo/`, `bbnf-buddy/`, and `node_modules/*` were read-only inspected for verification.
- Every cite in this report and in the three amended packets was checked against the live tree in this session (grep + direct file reads + a Python recount for the keyframes specifier count) — none taken on the prior packets' or PASS2-VERDICT's word alone.
