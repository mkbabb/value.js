# U.W-LIB — THE PUBLISH PACKET (owner-presentation material)

*Authored by the U.W-LIB RELAY + CLOSE scribe (2026-07-13). Hands to **U.W-ADOPT (U-F77)** for the
owner-held version cut (registry §13.5). **LIB landed the fix; LIB does NOT cut.** Everything below
marked* ***OWNER-DECIDES*** *is a recommendation, not a taken action.*

**Substrate at authorship**: value.js `tranche-u` HEAD `e921994`, on npm **3.1.0**. All U.W-LIB
fixes landed (commit list §5). Gate verdict: **PASS** — LIB slate 20/20 GREEN, `test:dist`
`proof:lib-correctness` 10/10 GREEN, typecheck 0, lint 0, `src/` real `as any` = 0, `as unknown as`
= 8 (baseline, unregressed). Full gate table + π/DELTA ledger in
`docs/tranches/U/audit/w-lib-close-artefacts.md`.

---

## §1 · THE LANDED FIX — per-gate before → after (the serialized-string DELTA)

Every row is a LIVE defect in published 3.1.0 (the RED "before") cured to the GREEN "after". RED
strings from the evidence corpus (`design-memo.md` §evidence, captured live on 3.1.0); GREEN strings
are the now-passing `test/tranche-u-lib.test.ts` assertions.

| Gate | Family | before (RED — published 3.1.0) | after (GREEN — landed) |
|---|---|---|---|
| **LIB-G1** | U-F29 | `parseCSSValue('1px solid red').toString()` → `'1px'` (silent drop); `'translate(10px) rotate(45deg)'` drops `rotate` | throws **`CSSParseError`** on unconsumed trailing tokens (no silent drop) |
| **LIB-G2** | U-F30 mix | `color-mix(in srgb, red 30%, blue).toString()` → `'rgb(0.30000000000000004 0 0.7)'` (near-black) | `'rgb(76.5 0 178.5)'` |
| **LIB-G3a** | U-F30 rel | `rgb(from red r g b).toString()` → `'rgb(1 0 0)'` | `'rgb(255 0 0)'` |
| **LIB-G3b** | U-F30 calc | `rgb(from red calc(r + 10) g b).toString()` → `'rgb(11 0 0)'` (calc on normalized binding `1+10`) | `'rgb(265 0 0)'` (calc on physical binding `255+10` — normalize-on-construct) |
| **LIB-G4** | U-F30 guard | `rgb(76.5 0 178.5)` / `rgb(255 0 0)` round-trip verbatim | **UNCHANGED** (born-GREEN guard; stayed green — fix did NOT hit the shared wrapper) |
| **LIB-G5** | U-F30 refeed | `normalizeColorUnit(color-mix(…red 30%…))` r → `0.00118` (double-normalize) | r ≈ `0.3` |
| **LIB-G6** | U-F30 census | invariant decision unproven (born-RED) | census LIVE + convention-preserving; `CONVENTION_INVARIANT_LANDED = true`; **zero co-migrants** |
| **LIB-G7** | U-F31 | `rotate(45deg)` → `rotateX/Y/Z`; `scale(2)` → `scaleZ`; `translate(10px)` → Y/Z | `rotateZ(45deg)`; `scale` stays 2D; `translate` X-only |
| **LIB-G8** | U-F32 | `sin(30deg)` → `0.5deg`; `calc(sin(30deg)*100px)` → `50deg` | `0.5` unitless; `50px` |
| **LIB-G9** | U-F33 | `linear-gradient(90deg, red 20%, blue 80%)` → `'linear-gradient(90deg, rgb(255 0 0), 20%, rgb(0 0 255), 80%)'` (5-token comma corruption) | `'linear-gradient(90deg, rgb(255 0 0) 20%, rgb(0 0 255) 80%)'` |
| **LIB-G10** | U-F74 | `color2(P3(0,1,0),'rgb')` and `{correctGamut:false}` → IDENTICAL `[0, 0.875, 0.275]` (3rd arg ignored) | `color2(c,'rgb',{gamut:'raw'})` reports RAW OOB channels (`{gamut:'map'}` default unchanged) |
| **LIB-G11** | U-F35 | `typeof recomposeMatrix2D` → `'undefined'` (2D decompose dead-end) | `recomposeMatrix2D(decomposeMatrix2D(M)) ≈ M`; `interpolateDecomposed` accepts the 2D shape |
| **LIB-G12** | U-F34 | drift exports non-empty (`xyzToICtCp`, `srgbToOKLab`, `oklabToLinearSRGB`, `linearToSrgb`, …) | `[]` — every conversion export is `{from}2{to}`; standing parity gate |

**The two owner-ruled AMELIORATE picks** (registry §13.5), design-loop-chosen and ratified in
`DECISION.md`:

- **U-F30 = the composite Locus-P invariant** ("parser colors are physical"): color-mix
  **denorm-on-output** at the parser consumer (`parsing/color/color.ts`) + relative-color
  **normalize-on-construct** at `resolveRelativeColor` (`parsing/color/relative-color.ts`). The raw
  functions `mixColors`/`sampleColorRamp`/`color2` are **UNCHANGED** → the raw-channel convention is
  preserved (LIB-G6 GREEN, no sibling co-migration).
- **U-F29 = loud-fail + rename**: `parseCSSValue` requires full-input consumption and throws the
  typed **`CSSParseError`** on unconsumed trailing tokens; `parseCSSSubValue` renamed to the
  discoverable **`parseCSSValues`** (E-3, no legacy alias).

---

## §2 · SEMVER CLASSIFICATION — MAJOR (**OWNER-DECIDES the number; the class is forced**)

The cut is **semver-MAJOR**. The forcing changes (each independently breaking):

| Change | Family | Why it is MAJOR |
|---|---|---|
| `parseCSSValue` now THROWS `CSSParseError` on multi-token input | U-F29 | a call that returned (a wrong `'1px'`) now throws — a behavior break for any caller passing multi-token strings |
| `parseCSSSubValue` → `parseCSSValues` (no alias) | U-F29 | a removed export — every importer breaks at the name |
| `{from}To{to}` → `{from}2{to}` conversion-export renames (no aliases) | U-F34 | removed public-barrel exports (`srgbToOKLab`, `rawOklabToOklch`, `xyzToICtCp`, `linearToSrgb`, the transfer set, …) |
| `color-mix()` / `rgb(from …)` serialize physical-range instead of normalized | U-F30 | the emitted string for the same input changes (`'rgb(0.3 0 0.7)'` → `'rgb(76.5 0 178.5)'`) — an observable output-contract change |
| `rotate(45deg)` Z-only · `sin(30deg)` unitless · gradient-stop serialize | U-F31/F32/F33 | parse-output / resolved-value contract changes for direct consumers |

**Recommended version: `4.0.0`** — ***OWNER-DECIDES***. A single major absorbs the whole
serialization/contract class coherently (E-3: one cut, no cherry-pick). The additive-only fixes
(U-F35 `recomposeMatrix2D`, U-F74 `{gamut:'raw'}` option — default preserved) ride the same major at
zero extra cost.

---

## §3 · THE BOTH-FLOOR CO-LAND PLAN (U-F77 — the sibling migrations, enumerated)

Two consumers pin value.js at `^3.1.0`; a `4.0.0` cut strands **both** floors, so they co-land in
one window. Enumerated from `consumer-truth.md` (the four-surface probe) re-verified live 2026-07-13
against glass-ui `c66b5354` and keyframes `f794def9`.

### glass-ui (`^3.1.0` peer + dev floor → `^4.0.0`)

- **Floor widen**: `../glass-ui/package.json` — `peerDependencies["@mkbabb/value.js"]` (`:1122`),
  the peer-block `:1146`/`:1160`, `devDependencies` — all `^3.1.0` → `^4.0.0`.
- **U-F34 source migration** (the ONLY glass-ui call-site change — 3 renamed conversion imports, 4
  files, pure find-replace, signatures identical):
  | Old (gone) | New | Site(s) |
  |---|---|---|
  | `srgbToOKLab` | `srgb2oklab` | `composables/color/index.ts:27` · `composables/glass/ambientHueHistogram.ts:24` · `components/custom/aurora/composables/color.ts:23` |
  | `rawOklchToOklab` | `rawOklch2oklab` | `composables/color/useAccentTone.ts:22` |
  | `rawOklabToOklch` | `rawOklab2oklch` | `composables/glass/ambientHueHistogram.ts:24` |
- **U-F30**: NO source change. Surface 1 (`cssToOklch` → `colorUnit2`) is a **beneficiary** (latent
  mix-string double-normalize cured); Surface 2 (`spectrum-walk.ts` direct `mixColors`/`sampleColorRamp`)
  is **PRESERVED byte-identical** (Locus P; the functions are unchanged).
- **U-F29**: NO action — glass-ui imports **zero** `parseCSSValue`.
- **The relay is landed** in the active glass-ui coordination dir:
  `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-u-w-lib-invariant.md` (commit
  `6c3e1609`, local at their HEAD — `tranche/BI` has no upstream, left for their session per M1).

### keyframes.js (`^3.1.0` **runtime `dependencies`** floor → `^4.0.0`)

- **Floor widen**: `../keyframes.js/package.json:268` — `dependencies["@mkbabb/value.js"]` `^3.1.0`
  → `^4.0.0` (the STRONGER coupling — a runtime dep, not devDep).
- **U-F29 source migration**:
  - the 3 `parseCSSValue` sites (`resolve/resolve-function.ts:61,159` + `resolve/resolve-if.ts:131`)
    are all try/catch-guarded → loud-fail degrades to a caught `CSSParseError` → diagnostic +
    `DROP` / return-node. **NO source change owed** beyond the pin.
  - `parseCSSSubValue → parseCSSValues` — ONE import rename at
    `compile/parse-flatten.ts:2` (import) + `:119` (call). The full-list shape is identical.
  - `compile/selector.ts:15,170` uses `parseCSSValueUnit` (a distinct, still-exported single-token
    parser) — U-F29-immune, untouched.
- **U-F30**: NO source change — Surface 4 (`backward-color.ts` direct `sampleColorRamp`/`color2`) is
  **PRESERVED** (Locus P; would have broken SILENTLY under Locus F — the sharpest reason the
  invariant is at the parser, not the function).
- **U-F31**: the `rotate(45deg)` Z-only change feeds keyframes' apply/resolve path — a parse-output
  DELTA. keyframes verifies/absorbs this at its cut (its own channel; rides U-F77).
- keyframes consumes **zero** renamed conversion exports (U-F34 owes it nothing) — its `*To*` names
  are keyframes-local.

**Co-land ordering**: value.js `4.0.0` publishes → glass-ui + keyframes widen floors + apply the
enumerated source migrations in the same window → glass-ui's own 5.0.0 tag (which value.js
U.W-ADOPT floats on) sequences independently. Neither floor is stranded.

---

## §4 · THE RECOMMENDATION (OWNER-DECIDES)

1. **Cut value.js `4.0.0`** at U.W-ADOPT (the version number is the owner's; the MAJOR class is
   forced by §2).
2. **Co-land** the two sibling floor-widens + the enumerated source migrations (§3) in the same
   window (U-F77).
3. The relay to glass-ui is discharged (§3). keyframes is coordinated through its own dev channel +
   the pin-widen.
4. **PP-16**: LIB closing WITHOUT the owner's publish is **not a miss** — the wave closes
   build-complete with the cut sequenced to U.W-ADOPT (registry §13.5 forbids the unilateral cut).

---

## §5 · THE LANDED COMMIT LIST (value.js `tranche-u`)

| Commit | What |
|---|---|
| `3715888` | born-RED gate slate LIB-G1..G12 |
| `e1ea362` | evidence corpus + lead-synthesis DECISION (composite Locus-P + loud-fail/parseCSSValues) |
| `867e4cb` | U-F30 composite Locus-P invariant ("parser colors are physical") |
| `0c212e8` | U-F30 CSS-canonical color-mix serialization |
| `329932b` | U-F29 loud-fail `CSSParseError` + `parseCSSSubValue → parseCSSValues` rename |
| `d18dd4e` | U-F31 single-arg transforms respect axis cardinality |
| `7436bcf` | U-F32 forward trig `sin/cos/tan` resolve unitless |
| `7952a97` | U-F33 positioned gradient-stop serialization |
| `2133a7a` | U-F35 `recomposeMatrix2D` + 2D-aware `interpolateDecomposed` |
| `ed9bb5a` | U-F74 dispatch-exposed raw out-of-gamut detect path on `color2` |
| `d5efe2b` | U-F34 `{from}2{to}` naming-coherence sweep |
| `6497f74` · `cd3f743` · `168060d` | lane merges (color · parsing · transform+serialize) |
| `b5d6335` | flip the born-RED slate GREEN — LIB-G1..G12 cured |
| `e2fe65e` | `proof:lib-correctness` dist mirror (`test:dist`) |
