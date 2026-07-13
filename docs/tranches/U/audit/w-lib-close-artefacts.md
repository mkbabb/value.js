# U.W-LIB — CLOSE ARTEFACTS

*The gate row table, the π/DELTA ledger, and the BOOKS disposition for THE LIBRARY-CORRECTNESS WAVE.
Authored by the RELAY + CLOSE scribe, 2026-07-13. Substrate: value.js `tranche-u` HEAD `e921994`
(on npm 3.1.0 — the version cut is owner-held, `publish-packet.md` handed to U.W-ADOPT).*

## Verdict: **COMPLETE** (gates-pass, goal-met)

Every LIVE library-correctness defect the audit confirmed in published 3.1.0 is reproduced by a
born-RED gate that FLIPPED green when the E-3-class cure landed. The two owner-ruled AMELIORATE
defects (U-F29, U-F30) were design-loop-shaped and ratified (`DECISION.md`). The build-complete cut
is sequenced to U.W-ADOPT (PP-16: LIB lands the fix, the owner cuts the version).

**Gate battery (certified live at close):**

| Battery | Result |
|---|---|
| `test/tranche-u-lib.test.ts` (LIB slate) | **20/20 GREEN** |
| full `npx vitest run` (84 files) | **2312/2312 GREEN** — zero regression from the U-F34 rename / U-F30·F33 serialize sweep |
| `npm run test:dist` (`proof:lib-correctness` + the retained behavioral slate) | **GREEN** — `proof:lib-correctness` 10/10 clauses; barrel-parity, pack-manifest, css-parity, round-trip-idempotent, serialize-fidelity, subpath-budget all GREEN |
| `npm run typecheck` (vue-tsc lib + demo) | **exit 0** |
| `npm run lint` (eslint `--max-warnings=0`) | **exit 0** |
| `src/` real `as any` | **0** (the one `grep` hit is inside a comment at `parsing/index.ts:567`) |
| `src/` `as unknown as` | **8** (tranche-S baseline, unregressed) |

---

## §1 · GATE ROW TABLE (verbatim, per `U.W-LIB.md §Hard gate`)

| Gate | Family | Kind | born-RED assertion (the cured-frame contract) | Verdict |
|---|---|---|---|---|
| **LIB-G1** | U-F29 | born-RED (3 legs) | `parseCSSValue('1px solid red' / '0 0 4px red' / 'translate(10px) rotate(45deg)')` does NOT silently truncate — throws OR retains all tokens | **GREEN** (loud-fail `CSSParseError`) |
| **LIB-G2** | U-F30 | born-RED | `color-mix(in srgb, red 30%, blue).toString() === 'rgb(76.5 0 178.5)'` | **GREEN** |
| **LIB-G3a** | U-F30 | born-RED (cure-agnostic) | `rgb(from red r g b).toString() === 'rgb(255 0 0)'` | **GREEN** |
| **LIB-G3b** | U-F30 | born-RED (cure-conditional — the BR-7 discriminator) | `rgb(from red calc(r + 10) g b).toString() === 'rgb(265 0 0)'` — reachable ONLY under normalize-on-construct | **GREEN** (normalize-on-construct chosen for the relative-color locus → calc on physical binding `255+10`; the relative-color co-migration is NOT booked) |
| **LIB-G4** | U-F30 | **born-GREEN GUARD** | `rgb(76.5 0 178.5)` / `rgb(255 0 0)` round-trip verbatim — the R-2 double-denorm tripwire | **GREEN — STAYED GREEN** (fix did NOT touch the shared wrapper) |
| **LIB-G5** | U-F30 | born-RED | `normalizeColorUnit(color-mix(…red 30%…))` → r ≈ 0.3, NOT 0.00118 (the glass-ui `colorUnit2` refeed) | **GREEN** |
| **LIB-G6** | U-F30 / §28 | born-RED (build-time census) | the chosen invariant preserves the raw-channel convention for every reader the live grep discovers | **GREEN** — `CONVENTION_INVARIANT_LANDED = true`; census LIVE (self + glass-ui spectrum-walk + keyframes backward-color); composite Locus-P preserves the convention → **zero co-migrants** |
| **LIB-G7** | U-F31 | born-RED (3 legs) | `rotate(45deg)` is Z-only (not X/Y/Z); `scale(2)` stays 2D; `translate(10px)` does not push onto Y/Z | **GREEN** |
| **LIB-G8** | U-F32 | born-RED (2 legs) | `sin(30deg)` is unitless `0.5`; `calc(sin(30deg)*100px)` → `50px` | **GREEN** |
| **LIB-G9** | U-F33 | born-RED | `linear-gradient(90deg, red 20%, blue 80%)` round-trips to valid space-joined CSS | **GREEN** |
| **LIB-G10** | U-F74 | born-RED | a wide-gamut color → sRGB via `color2(c,'rgb',{gamut:'raw'})` reports RAW OOB channels | **GREEN** (options-bag, default `map` unchanged) |
| **LIB-G11** | U-F35 | born-RED (2 legs) | `recomposeMatrix2D(decomposeMatrix2D(M)) ≈ M`; `interpolateDecomposed` accepts the 2D shape | **GREEN** |
| **LIB-G12** | U-F34 | convention-check (`it.fails`→`it`) | every conversion export uses `{from}2{to}` — the `{from}To{to}` drift set is empty | **GREEN** (drift `[]`; the `xyzToICtCp` scalar-helper collision disambiguated → `rawXyz2ictcp`/`rawIctcp2xyz`, distinct from the dispatch `xyz2ictcp`) |

**12 gates, 20 test legs. All GREEN.** The one born-GREEN guard (LIB-G4) held; the one
cure-conditional discriminator (LIB-G3b) resolved to GREEN because normalize-on-construct was chosen
for the relative-color locus (no co-migration booked there either).

---

## §2 · π / DELTA LEDGER (the honest non-visual form — serialized string / resolved value)

U.W-LIB minted **ZERO** visual claims (no rendered surface, no GPU frame, no owner-eye still). The
π/DELTA obligation is discharged as the serialized-string / resolved-value transition, captured
RED-then-GREEN. RED frames from `design-memo.md §evidence` (live on 3.1.0); GREEN frames from the
now-passing slate. The DELTA column records the consumer blast-radius measurement.

| Claim | "before" frame (RED, 3.1.0) | "after" frame (GREEN, landed) | DELTA (consumer blast-radius) |
|---|---|---|---|
| U-F29 truncation | `parseCSSValue('1px solid red')` → `'1px'` (silent partial) | throws `CSSParseError` on unconsumed input | keyframes 3-call-site DELTA: all try/catch-guarded → caught → diagnostic + `DROP`/return-node; no crash, no source change (pin-widen only). `parseCSSSubValue → parseCSSValues` = 1 import rename at `parse-flatten.ts:2,119`. |
| U-F30 mix | `'rgb(0.30000000000000004 0 0.7)'` (near-black) | `'rgb(76.5 0 178.5)'` | string DELTA + glass-ui `colorUnit2` refeed DELTA (`0.3 → 0.00118` cured to `0.3`) + spectrum-walk raw-channel DELTA = **0** (preserved; `mixColors` unchanged) |
| U-F30 relative (a) | `'rgb(1 0 0)'` | `'rgb(255 0 0)'` | string DELTA; relative-color path is parse-private (no raw reader) |
| U-F30 relative (b, calc) | `'rgb(11 0 0)'` (calc on normalized binding `1+10`) | `'rgb(265 0 0)'` (calc on physical binding `255+10`) | the calc-convention DELTA — resolved to physical via normalize-on-construct; cure-conditional leg GREEN, no co-migration booked |
| U-F31 | `rotate(45deg)` → `rotateX/Y/Z` (3-axis fan-out) | `rotateZ(45deg)` (Z-only) | parse-output DELTA + keyframes apply/resolve blast-radius (verifies at its cut; rides U-F77) |
| U-F32 | `sin(30deg)` → `0.5deg` | `0.5` unitless (`calc(sin(30deg)*100px)` → `50px`) | resolved-unit DELTA, confined to `evaluateMathFunction` |
| U-F33 | `'linear-gradient(90deg, rgb(255 0 0), 20%, rgb(0 0 255), 80%)'` (5-token corruption) | `'linear-gradient(90deg, rgb(255 0 0) 20%, rgb(0 0 255) 80%)'` | serialize DELTA; demo unaffected (separate strict `gradientParse`) |
| U-F74 | `color2(P3(0,1,0),'rgb')` and `{correctGamut:false}` IDENTICAL `[0, 0.875, 0.275]` | `{gamut:'raw'}` reports raw OOB channels | detect-path DELTA (OOB now observable); `{gamut:'map'}` default unchanged |
| U-F34 | drift exports (`xyzToICtCp`, `srgbToOKLab`, `oklabToLinearSRGB`, `linearToSrgb`, …) | `{from}2{to}` uniformly; drift `[]` | export-rename DELTA: glass-ui migrates 3 imports (`srgbToOKLab`/`rawOklchToOklab`/`rawOklabToOklch`) at 4 files; keyframes 0 |
| U-F35 | `recomposeMatrix2D` undefined (2D decompose dead-end) | round-trip `≈ M`; 2D interpolate | additive-only; no consumer DELTA |

Every born-RED gate IS its own before/after capture — the RED assertion is the "before", the flip is
the "after".

---

## §3 · BOOKS — discharged / standing

| BOOK | Home | State |
|---|---|---|
| The PUBLISH / version-cut decision (U-F77) | **U.W-ADOPT** | **STANDING** — `publish-packet.md` authored + handed: MAJOR class forced, `4.0.0` recommended (OWNER-DECIDES), both-floor co-land plan enumerated. PP-16: not a miss. |
| spectrum-walk (glass-ui) + backward-color (keyframes) convention CO-MIGRATION | U.W-ADOPT + BH relay | **DISCHARGED — verdict NONE.** LIB-G6 GREEN: the composite Locus-P invariant preserves the raw `mixColors`/`sampleColorRamp`/`color2` channel convention → NO sibling co-migration (the §28.1 preferred outcome). The BH relay addendum records the verdict. |
| keyframes `^3.1.0` pin-widen + the 3 `parseCSSValue` sites' handling | **U.W-ADOPT** (U-F77) + keyframes' dev channel | **STANDING** — enumerated in `publish-packet.md §3`: runtime-`dependencies` floor `^3.1.0 → ^4.0.0` + 1 import rename (`parse-flatten.ts`); the 3 guarded sites degrade with no source change. |
| U-F34 conversion-rename migrations for glass-ui | **U.W-ADOPT** (U-F77) + BH relay | **STANDING** (named + relayed) — 3 renamed exports (`srgbToOKLab → srgb2oklab`, `rawOklchToOklab → rawOklch2oklab`, `rawOklabToOklch → rawOklab2oklch`) across 4 glass-ui files; find-replace at the cut. Enumerated in `publish-packet.md §3` + the BH addendum §B2. |
| The `sampleColorRamp` convention link to the Q5-ramp reasoning | **U.W-VISUAL** (U-F6 ramp-half) | **STANDING** (recorded) — LIB does NOT own the ramp cure; it records that `sampleColorRamp`'s raw-channel convention (LIB-G6) is the shared surface, and the U-F30 invariant leaves it unchanged (so the ramp resolver sees no channel shift). |
| The O-14 feasibility-leg oracle law (U-F62 split) | **U.W-ORACLE** | **HOMED — addressed elsewhere.** Not this wave; U.W-ORACLE landed `G-ORACLE-2` (feasibility-leg law, commit `15e306e`). Recorded so the split-home is named. |
| The born-RED author's DEFERRED `test:dist` mirror | this wave | **DISCHARGED** — `proof:lib-correctness` authored (commit `e2fe65e`), 10/10 GREEN in `test:dist`. |

---

## §4 · RELAY discharge (E-2)

The BH/BI relay addendum landed in the ACTIVE glass-ui coordination dir (branch `tranche/BI`):
`../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-u-w-lib-invariant.md` —
path-scoped single-file commit `6c3e1609` at their HEAD (`c66b5354`). **LOCAL, not pushed**:
`tranche/BI` has no upstream configured (per the foreign-tree fence + no-force rule, the record is
the gate; an ack is a bonus). Their live-dev tree (293 dirty files) was untouched. The addendum
records: (a) the composite Locus-P invariant + the no-co-migration verdict (spectrum-walk +
backward-color PRESERVED, LIB-G6 GREEN); (b) the U-F29 loud-fail `CSSParseError` + `parseCSSValues`
shape; (c) the U-F34 rename migrations glass-ui owes; (d) the MAJOR semver + owner-held cut.

## §5 · Artefacts

- `docs/tranches/U/audit/w-lib/DECISION.md` — the ratified lead synthesis (BINDING)
- `docs/tranches/U/audit/w-lib/design-memo.md` — the invariant/shape picks + evidence corpus
- `docs/tranches/U/audit/w-lib/consumer-truth.md` — the four-surface probe
- `docs/tranches/U/audit/w-lib/publish-packet.md` — the owner-presentation material (→ U.W-ADOPT)
- `test/tranche-u-lib.test.ts` — the LIB-G1..G12 slate (flipped GREEN, commit `b5d6335`)
- `scripts/gates/proof-lib-correctness.mjs` — the `test:dist` dist mirror (commit `e2fe65e`)
- glass-ui `.../BI/coordination/valuejs-inbox-2026-07-13-u-w-lib-invariant.md` — the BH relay (`6c3e1609`, local)
