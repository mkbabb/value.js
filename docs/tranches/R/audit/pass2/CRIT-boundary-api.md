# CRIT-boundary-api — Pass-2 critique

**Target**: `docs/tranches/R/audit/pass2/boundary-api.md` (seed 5) · **Critic date**: 2026-07-02 · branch `tranche-q` @ `e80b359`
**Ancestor**: proto-gamut-overlay (88%) + PASS1-VERDICT §5 mustFix #10 (F8.1 either/or → commit to the API).
**Verdict**: RATIFY · **Convergence 97%** · mustFix: none.

---

## 1 — Citation spot-checks (all load-bearing cites re-verified against the live tree)

Every file:line the packet leans on is **exact**:

| Claim | Cite | Live tree | Status |
|---|---|---|---|
| `GAMUT_ALPHA` constant | `gamut.ts:242` | `const GAMUT_ALPHA = 0.05;` at 242 | ✓ |
| inlined sRGB transfer (inline-to-avoid-baggage precedent) | `gamut.ts:22-46` | `srgbToLinear`/`linearToSrgb`, "inlined to avoid circular dep" at 22 | ✓ |
| `findCusp` returns fresh `{L,C}` | `gamut.ts:145-154` | `findCusp` at 145, `return { L, C }` at 153 | ✓ |
| `findGamutIntersection` takes cusp param | `gamut.ts:162-167` | signature incl. `cusp: {L;C}` at 166 | ✓ |
| `gamutMapOKLab` returns fresh tuple | `gamut.ts:251-281` | `gamutMapOKLab` at 251, `return [...]` | ✓ |
| `srgbToOKLab` returns fresh tuple | `gamut.ts:287-303` | `srgbToOKLab` at 287 | ✓ |
| `oklchToXYZTuple` out-param precedent | `gamut.ts:370` | out-param 3-tuple at 370 | ✓ |
| 6 matrix identifiers `const→export const` | `xyz-extended.ts:46/52/88/96/104/112` | RGB_XYZ:46, XYZ_RGB:52, DISPLAY_P3:88, ADOBE_RGB:96, PROPHOTO_D50:104, REC2020:112 | ✓ all exact |
| `xyz2rgbFamilyInto` family + aliasing contract | `xyz-extended.ts:241-265`, `:236-240` | `_xyzFamilyVec` scratch at 242, `xyz2rgbFamilyInto` at 251, aliasing contract comment 236-240 | ✓ |
| prophoto D50→D65 Bradford fold | `constants.ts:382` + `xyz-extended.ts:199` | `WHITE_POINT_D50_D65` at 382; `proPhoto2xyz` does `PROPHOTO_XYZ_D50_MATRIX` then `WHITE_POINT_D50_D65` at 199-201 | ✓ fold is real |
| `color2Into` idiom | `dispatch.ts:258` | `export function color2Into` at 260 | ✓ (±2) |
| scratch re-entrancy note | `dispatch.ts:231-238` | XYZ-hub scratch + single-threaded argument | ✓ |
| seed/reuse egress split | `dispatch.ts:397-410` | lazy-seed-once-then-`color2Into` block | ✓ |
| `mixColorsInto` idiom | `dispatch.ts:690` | `mixColorsInto` at 692 | ✓ (±2) |
| subpath parse-that-ZERO invariant | `subpaths/color.ts:4-7` | invariant comment present | ✓ |
| gamut exports already public | `subpaths/color.ts:120-134` | `DELTA_E_OK_JND`, `deltaEOK`, `gamutMapOKLab`, `findCusp`(:126) all exported | ✓ |
| `hsv2xyz` class-based / allocates | `cylindrical.ts:175` | `hsv2xyz(hsv: HSVColor)` → hsl2xyz at 175 | ✓ |

The prototype grounding (`.claude/worktrees/.../gamut-overlay/geometry.ts`, `scratchpad/pass1/proto-gamut-overlay.md`) still exists on disk — the F1/F2/F3/F6/F7/F8 evidence base is live and re-readable.

## 2 — mustFix discharge

**PASS1-VERDICT §5 #10** (P1, the item this lane owns): *"Commit F8.1 to `sampleGamutBoundary(hueDeg, target, {columns, mode})` in `src/units/color/` (+ zero-alloc `Into` variant) and name its landing wave."* — **FULLY DISCHARGED, not paraphrased away**:
- Commits to the API (§0 verdict "Ship the API, not the matrices") ✓
- Exact signature with `{columns, mode}` options object (§2:47-92) ✓
- Placed in `src/units/color/boundary.ts` beside `gamut.ts` (§1) ✓
- Zero-alloc `sampleGamutBoundaryInto` twin, fully specified incl. the inner-field zero-alloc plan (§2, §5) ✓
- Names landing wave **R.W1**, argued in both directions with Q6-insensitivity (§7) ✓
- Resolves the F8.1 either/or as **package-internal export** (§4) — the matrices ship visibility-to-`boundary.ts`, absent-from-barrels ✓
- Token-free (§2 Alpha bullet, §9) — the charter's binding constraint held ✓

**§5 #14** (P2, corrected cites): the packet uses `xyz-extended.ts:46` and `:88` (the corrected F8.1 cites, per §4:129 explicitly "the P2 sweep item 14's corrected cites") — discharged and cross-referenced.

**§5 #8** (P2, the `dispatch.ts:371` MINDE mislabel trap): the packet does **not** mislabel `gamutMapToRgbSpace` — it never calls it MINDE, and cites `dispatch.ts:397-410` (the egress seed/reuse, accurate) rather than mis-citing :371. Clean.

Seed-5 charter (line 4) fully covered: exact surface (§2), zero-alloc Into (§2/§5), matrix visibility (§4), perf contract (§6), test plan (§8), landing wave (§7). Six-for-six.

## 3 — Precept / staleness attack (nothing landed)

- **Legacy / workaround / contrivance**: none. The Into companions (`srgbToOKLabInto`, `gamutMapOKLabInto`) are the genuine zero-alloc requirement — proto F8.2 measured ~2.8k tuples/frame from the fresh-tuple returns at `gamut.ts:251-281/287-303` + the `findCusp` `{L,C}` alloc; a module-scoped cusp scratch is the established idiom (precedent `oklchToXYZTuple`, `xyz2rgbFamilyInto`, both verified). Not manufactured surface.
- **KISS discipline is strong and explicit**: §9 declines the innermost-point crosshair (4-line consumer-side `min(s+v)` scan, not API), declines a projection helper (F6 proved the on-square projection is always the (1,1) corner), and defers `gamutBoundaryFieldAt` until a consumer exists (§9 recorded conditional). This is the correct "one way to spell a loop" restraint.
- **Design-system bypass**: N/A — this is pure library color geometry; paint/hatch/ink/tokens are demo-owned by construction.
- **Over-scoping (the 4th target, `prophoto-rgb`)**: justified as consumer-driven (SYNTHESIS §2.1 keys the overlay to `selectedColorSpace`; ProPhoto is a selectable wide space), folds into the existing combined-matrix mechanism with the already-present Bradford adaptation (verified: `xyz-extended.ts:199-201` already runs exactly `PROPHOTO_XYZ_D50_MATRIX` → `WHITE_POINT_D50_D65`). Net-new goldens flagged honestly as risk #3, covered by the property suite. This completes the consumer set, not speculation.
- **Staleness vs glass-ui 4.2.0/BG + kf 5.1.0**: **not applicable** — the boundary API has zero producer/consumer cohort surface. The only cross-repo consumer of value.js in this tranche is kf's `/math` subpath (the boot cascade, a different lane); the color subpath has no glass-ui/kf dependency. The packet correctly carries no cohort gate.
- **Barrel-leak risk (§10 risk #2)**: I verified `conversions/index.ts` uses **named** `export { ... } from` re-exports, not `export *`. So the newly-exported matrix consts would NOT leak into the aggregate barrel — the packet's open-edge caution is honest and the answer resolves in its favor. Not a defect; correct risk surfacing.
- **Sequencing awareness (§7)**: correctly makes the boundary goldens depend on the U10 α=1.0 change landing first (α→boundary→golden→publish), treating the proto α=0.05 F3 fractions as widened-tolerance seeds, never lockable goldens. This is the right cross-lane discipline.

## 4 — Non-blocking notes (NOT mustFix)

1. **§4 "five identifiers" vs the six-row table**: the opening sentence (line 118) says "five identifiers ... `const → export const`" but the table (121-127) lists six. This is self-resolved four lines later at 129 ("Six listed; `RGB_XYZ_MATRIX` is optional — export both for symmetry or the inverse alone, implementer's call"), so the surface is not actually ambiguous to an implementer — the choice is explicitly delegated. Cosmetic phrasing only; would tighten to "up to six" but does not block.
2. Pre-existing tree wart (not this doc's): `subpaths/color.ts:4-7` still names the retired `proof:subpath-budget` gate in its invariant comment. The packet does **not** propagate this — it cites the invariant's substance, not the dead gate. Flagged only for whoever eventually sweeps that comment.

## 5 — Judgment

The gap from the 88% ancestor is **closed**. This is a complete, citation-exact, precept-clean spec packet: it commits F8.1 to the API (the mustFix), specs the full surface with correct edge/NaN/count contracts, delivers an honest end-to-end zero-alloc plan grounded in the existing Into idiom, resolves matrix visibility as package-internal, names the wave with a two-directional semver argument, and shows disciplined KISS restraint on the consumer-derivable surface. Every one of the ~18 load-bearing file:line cites I spot-checked is exact. The lone imperfection (five-vs-six phrasing) is cosmetic and self-clarified in the same section. I would co-sign ratification; the single point withheld from 100 is the cosmetic count phrasing, left as an implementer-facing tidy rather than a gate.
