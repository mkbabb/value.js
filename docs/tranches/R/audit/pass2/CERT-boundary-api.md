# CERT-boundary-api — Pass-3 certification

**Target**: `docs/tranches/R/audit/pass2/boundary-api.md` (pass-2 score 97) · **Critic date**: 2026-07-02 · branch `tranche-q` @ `e80b359` (value.js 1.2.0)
**Pass-2 critique**: `CRIT-boundary-api.md` (RATIFY, 97%, **mustFix: none**).
**Verdict**: **CERTIFY · 100%** · mustFix: none.

---

## 1 — mustFix ledger: nothing was owed to this item

- **Pass-2 critique mustFix**: **none** (`CRIT-boundary-api.md:5`). The lone point withheld from 100 was the cosmetic "five identifiers" vs six-row-table phrasing (`CRIT-boundary-api.md:64`), which that critic explicitly ruled non-blocking and self-clarified four lines later in the source at `boundary-api.md:129`.
- **PASS2-VERDICT §3 backlog (M1–M7)**: **no row targets boundary-api**. The seven fixes target `SYNTHESIS-v2.md`, `kf1-grammar.md`, `dispatch-homes.md`, `overlay-amendment.md`, `easing-disposition.md`, and `w0-truth.md` (`PASS2-VERDICT.md:72–79`). boundary-api is named explicitly in the "Not in the backlog (empty-mustFix, co-signable as-is)" line (`PASS2-VERDICT.md:81`) and stands as PROVED item §2.1-9 (`PASS2-VERDICT.md:43`).

Consequence: there is **no amended text to inspect** for boundary-api. The three discharge lanes (L1-spec-v3, L2-kf1-reverify, L3-doc-sweeps) touched only the six backlog files; none touched boundary-api. Confirmed: `boundary-api.md:1–3` carries no `AMENDED-AT-PASS-3` provenance line, unlike every file the lanes edited. The certification therefore reduces to (b) re-verifying the load-bearing cites against the live tree and (c) confirming the six discharge edits introduced no error reaching into this item.

## 2 — Citation spot-checks (live tree, re-verified this pass — tree unchanged at `e80b359`)

| Claim (boundary-api §) | Cite | Live tree | Status |
|---|---|---|---|
| `GAMUT_ALPHA = 0.05` (α-sequencing, §7) | `gamut.ts:242` | `const GAMUT_ALPHA = 0.05;` at 242 | ✓ |
| `findCusp` returns fresh `{L,C}` (§5 alloc claim) | `gamut.ts:145–154` | `return { L: L_cusp, C: C_cusp }` at 153 | ✓ |
| `findGamutIntersection` already takes `cusp` param (§5 "no signature churn") | `gamut.ts:162–167` | signature incl. `cusp: { L: number; C: number }` | ✓ |
| `gamutMapOKLab` / `srgbToOKLab` fresh-tuple returns (§5) | `gamut.ts:251`, `:287` | both `export function … : [number,number,number]` | ✓ |
| `oklchToXYZTuple` out-param precedent (§5) | `gamut.ts:370` | `export function oklchToXYZTuple(` | ✓ |
| 6 matrix identifiers `const → export const` (§4 table) | `xyz-extended.ts:46/52/88/96/104/112` | RGB_XYZ:46, XYZ_RGB:52, DISPLAY_P3:88, ADOBE_RGB:96, PROPHOTO_D50:104, REC2020:112 — all `const …_MATRIX: Mat3` | ✓ all exact |
| `xyz2rgbFamilyInto` family + aliasing contract (§5) | `xyz-extended.ts:236–265` | `ALIASING CONTRACT` comment at 236, `_xyzFamilyVec` scratch at 242, `xyz2rgbFamilyInto` at 251 | ✓ |
| prophoto D50→D65 Bradford fold is real (§3) | `constants.ts:382` + `xyz-extended.ts:199–200` | `WHITE_POINT_D50_D65` exported at 382; `proPhoto2xyz` runs `PROPHOTO_XYZ_D50_MATRIX` (199) then `WHITE_POINT_D50_D65` (200) | ✓ fold real |
| `color2Into` idiom (§2/§5) | `dispatch.ts:258` | `export function color2Into<T, C extends ColorSpace>(` at 258 | ✓ |
| `mixColorsInto` idiom (§2) | `dispatch.ts:690` | `export function mixColorsInto(` at 690 | ✓ |
| gamut exports already public (§0/§9 "no new export") | `subpaths/color.ts:120–134` | `DELTA_E_OK_JND`, `deltaEOK`, `findCusp`, `gamutMapOKLab`, `srgbToOKLab` all in the `export { … } from "../units/color/gamut"` block | ✓ |
| barrel-leak resolved: conversions barrel is named-export, no `export *` (§4/§10 risk 2) | `conversions/index.ts` | `grep -c "export \*"` = **0** | ✓ matrices cannot leak |
| `hsv2xyz` class-based / allocates (§1 inline-scalar rationale) | `cylindrical.ts:175` | `export function hsv2xyz(hsv: HSVColor): XYZColor {` | ✓ |

Every load-bearing file:line the packet leans on is exact against the head. No cite drifted (the tree is byte-stable at `e80b359` since pass 2).

## 3 — No cross-contamination from the M1–M7 discharge

The six discharge edits are semantically disjoint from boundary-api's subject matter (gamut geometry): M1 = `extractFunctions` (parsing walker); M2/M3 = worktree staleness + KF-1 suite count; M4 = CONSTELLATION.md pointer ownership; M5 = `color-picker.md:140` overlay prose; M6 = bbnf-buddy easing sweep; M7 = keyframes `/math` devDep attribution. None touches a fact boundary-api asserts, and the packet is not referenced by any amended file in a way that could inherit a stale claim (verified: L1's §C fold independently re-affirms the same `conversions/index.ts` named-export / no-leak fact boundary-api §4 relies on — `L1-spec-v3.md:57` — so the two documents now agree in the affirmative, no contradiction introduced).

## 4 — Certification judgment

Zero mustFix rows were ever owed to this item — it entered pass 3 already empty-backlog and co-signable (`PASS2-VERDICT.md:81`), and PASS2-VERDICT §5.2/§4 confirm no critic requested new evidence against it. The re-verification this pass found **all thirteen load-bearing cites exact** and **no new defect** that would change what an implementer builds: the surface (§2), the zero-alloc `Into` plan grounded in the live `oklchToXYZTuple`/`xyz2rgbFamilyInto` idioms (§5), the package-internal matrix visibility with the verified no-leak barrel (§4), the perf contract (§6), the R.W1 landing wave with two-directional semver argument and load-bearing α→golden sequencing (§7), and the KISS-disciplined consumer re-derivation (§9) all stand unamended and correct.

The sole residual is the cosmetic "five vs six identifiers" opening phrase (`boundary-api.md:118` vs the six-row table `:121–127`), self-resolved at `:129` and ruled below-the-bar by the pass-2 critic (`CRIT-boundary-api.md:64`). Per the pass-3 certification rule, a cosmetic residual already ruled below-the-bar does not block, and no NEW named, blocking defect exists.

**Score: 100. Verdict: CERTIFY. mustFix: empty. Co-sign ratification as the R.W1 boundary-API head.**
