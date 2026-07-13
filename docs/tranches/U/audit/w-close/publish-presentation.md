# U.W-CLOSE — THE PUBLISH PRESENTATION (G-CLOSE-5 — the packet PRESENTED to the owner)

*Assembled by the U.W-CLOSE annex+publish+relay lane (2026-07-13). This packet PRESENTS the landed
library-correctness reshape to the owner **WITH the fix already landed**. §13.5 FORBIDS the unilateral
cut. **CLOSE presents; the owner rules.** An un-taken cut is NOT a miss (PP-16).*

**Precedence**: owner verbatim (§13.5) → `audit/registry.md` (§13.5/§28/§28.2/§28.3) →
`DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md`. The registry WINS on divergence (notably
**§28: the FOUR consumer surfaces, NOT R6's three**).

**Sources**: `w-lib/publish-packet.md` (the full owner-presentation material) · `w-lib-close-artefacts.md
§1/§2` · `w-adopt/coland/coland-ordering.md` · `w-adopt/adopt-cut/G-ADOPT-1-arming.md` ·
`w-adopt/substrate-pin.md`.

---

## §1 · THE LANDED RESHAPE (source: `publish-packet.md §1` + `w-lib-close-artefacts.md §1`)

Every gate below is a LIVE defect in **published 3.1.0** (the RED "before"), cured to the GREEN
"after" and LANDED on `tranche-u` (LIB slate **20/20 GREEN**, full vitest **2312/2312**, `test:dist`
`proof:lib-correctness` **10/10**, typecheck 0, lint 0). LIB landed the fix; **LIB does NOT cut.**

| Gate | Family | before (RED — 3.1.0) | after (GREEN — landed) |
|---|---|---|---|
| **LIB-G1** | U-F29 | `parseCSSValue('1px solid red')` → `'1px'` (silent drop); `'translate(10px) rotate(45deg)'` drops `rotate` | throws **`CSSParseError`** on unconsumed trailing tokens (no silent drop) |
| **LIB-G2** | U-F30 mix | `color-mix(in srgb, red 30%, blue)` → `'rgb(0.30000000000000004 0 0.7)'` (near-black) | `'rgb(76.5 0 178.5)'` |
| **LIB-G3a** | U-F30 rel | `rgb(from red r g b)` → `'rgb(1 0 0)'` | `'rgb(255 0 0)'` |
| **LIB-G3b** | U-F30 calc | `rgb(from red calc(r + 10) g b)` → `'rgb(11 0 0)'` (calc on normalized `1+10`) | `'rgb(265 0 0)'` (normalize-on-construct → calc on physical `255+10`) |
| **LIB-G4** | U-F30 guard | `rgb(76.5 0 178.5)` / `rgb(255 0 0)` round-trip verbatim | **UNCHANGED** (born-GREEN guard STAYED green) |
| **LIB-G5** | U-F30 refeed | `normalizeColorUnit(color-mix(…red 30%…))` r → `0.00118` (double-normalize) | r ≈ `0.3` |
| **LIB-G6** | U-F30 census | invariant decision unproven (born-RED) | `CONVENTION_INVARIANT_LANDED = true`; **zero co-migrants** |
| **LIB-G7** | U-F31 | `rotate(45deg)` → `rotateX/Y/Z`; `scale(2)` → `scaleZ`; `translate(10px)` → Y/Z | `rotateZ(45deg)` Z-only; `scale` stays 2D; `translate` X-only |
| **LIB-G8** | U-F32 | `sin(30deg)` → `0.5deg`; `calc(sin(30deg)*100px)` → `50deg` | `0.5` unitless; `50px` |
| **LIB-G9** | U-F33 | gradient-stop → 5-token comma corruption | `'linear-gradient(90deg, rgb(255 0 0) 20%, rgb(0 0 255) 80%)'` |
| **LIB-G10** | U-F74 | `color2(P3(0,1,0),'rgb')` and `{correctGamut:false}` IDENTICAL (3rd arg ignored) | `{gamut:'raw'}` reports RAW OOB channels (`{gamut:'map'}` default unchanged) |
| **LIB-G11** | U-F35 | `recomposeMatrix2D` undefined (2D decompose dead-end) | round-trip `≈ M`; `interpolateDecomposed` accepts 2D shape |
| **LIB-G12** | U-F34 | drift exports non-empty (`srgbToOKLab`, `oklabToLinearSRGB`, `xyzToICtCp`, …) | `[]` — every conversion export is `{from}2{to}`; standing parity gate |

**The two owner-ruled AMELIORATE picks** (registry §13.5, ratified in `DECISION.md`):

- **U-F29 = loud-fail + rename**: `parseCSSValue` requires full-input consumption and throws the
  typed **`CSSParseError`** on unconsumed trailing tokens; **`parseCSSSubValue` → `parseCSSValues`**
  (E-3, **no legacy alias**). Additive: **U-F35** `recomposeMatrix2D` + 2D-aware `interpolateDecomposed`;
  **U-F74** `{gamut:'raw'}` option (default `map` preserved).
- **U-F30 = the composite Locus-P invariant** ("parser colors are physical"): color-mix
  **denorm-on-output** at the parser consumer (`parsing/color/color.ts`) + relative-color
  **normalize-on-construct** at `resolveRelativeColor` (`parsing/color/relative-color.ts`). The raw
  functions **`mixColors`/`sampleColorRamp`/`color2` are UNCHANGED** → the raw-channel convention is
  preserved (LIB-G6, `CONVENTION_INVARIANT_LANDED = true`).

Rounding out the reshape: **U-F31** `rotate(45deg)` Z-only · **U-F32** `sin(30deg)` unitless · **U-F33**
positioned gradient-stop serialize · **U-F34** `{from}2{to}` rename sweep.

---

## §2 · SEMVER CLASSIFICATION — MAJOR (class FORCED; the NUMBER is OWNER-DECIDES)

The cut is **semver-MAJOR** — the class is FORCED by the following independently-breaking changes:

| Change | Family | Why MAJOR |
|---|---|---|
| `parseCSSValue` now THROWS on multi-token input | U-F29 | a call that returned (a wrong `'1px'`) now throws — a behavior break |
| `parseCSSSubValue → parseCSSValues` (no alias) | U-F29 | a removed export — every importer breaks at the name |
| `{from}To{to} → {from}2{to}` renames (no aliases) | U-F34 | removed public-barrel exports |
| `color-mix()` / `rgb(from …)` serialize physical-range | U-F30 | the emitted string for the same input changes |
| `rotate(45deg)` Z-only · `sin(30deg)` unitless · gradient-stop serialize | U-F31/F32/F33 | parse-output / resolved-value contract changes |

**Recommended: `4.0.0`** — ***OWNER-DECIDES the number; the MAJOR class is forced.*** A single major
absorbs the whole serialization/contract class coherently (E-3: one cut, no cherry-pick); the
additive-only fixes (U-F35, U-F74) ride the same major at zero extra cost. **CLOSE does NOT cut, does
NOT choose the number.**

---

## §3 · THE BOTH-FLOOR CO-LAND (§28 — the FOUR consumer surfaces, THE REGISTRY WINS)

Two consumers pin value.js at `^3.1.0`; a `4.0.0` cut strands **both** floors, so they co-land in ONE
window. **Both floors** (source: `publish-packet.md §3` + `coland-ordering.md §1/§2`):

| Consumer | Pin | Block · key | Coupling class |
|---|---|---|---|
| **glass-ui** | `^3.1.0` | `peerDependencies["@mkbabb/value.js"]` + `devDependencies["@mkbabb/value.js"]` | **PEER floor** |
| **keyframes.js** | `^3.1.0` | `dependencies["@mkbabb/value.js"]` | **RUNTIME dependency floor** (the STRONGER coupling — strands keyframes' runtime dep AND every transitive keyframes consumer) |

### The FOUR consumer surfaces preserved-or-co-migrated (registry §28 — FOUR, NOT R6's three)

**THE REGISTRY WINS: §28 amended §25's THREE to FOUR** (added keyframes backward-color). LIB's landed
invariant is **Locus-P** (leaves the raw functions unchanged), so:

| # | Surface | Disposition under Locus-P |
|---|---|---|
| **1** | glass-ui `parseCSSColor` (→ `colorUnit2`) | **BENEFICIARY** — auto-adopts the physical-range fix; the latent mix-string double-normalize is cured. |
| **2** | glass-ui direct `mixColors`/`sampleColorRamp` [spectrum-walk] | **PRESERVED byte-identical** — reads RAW `OKLCHColor` channels; functions unchanged (Locus-P; LIB-G6 `CONVENTION_INVARIANT_LANDED = true`). |
| **3** | keyframes `parseCSSValue` ×3 (`resolve-if.ts:131` · `resolve-function.ts:61,159`) | all **try/catch-guarded** → the new `CSSParseError` throw degrades to a caught diagnostic + `DROP`/return-node → **NO source change** owed beyond the pin. |
| **4** | keyframes direct `sampleColorRamp`/`color2` [backward-color] | **PRESERVED** — would have broken **SILENTLY under Locus-F** (relative-ΔE proof cancels a uniform shift); Locus-P holds it. **The sharpest reason the invariant is at the parser, not the function.** |

**NET: ZERO co-migrants.** Neither sibling direct-channel reader co-migrates; both are byte-identical
across the cut. The §28 four-surface worry RESOLVES.

### HONEST DRIFT NOTE — the U-F34 glass-ui rename count (publish-packet §3 is an UNDERCOUNT)

The `publish-packet.md §3` U-F34 table (probed against glass-ui `c66b5354`) enumerates **THREE**
renames: `srgbToOKLab → srgb2oklab` (×3 sites), `rawOklchToOklab → rawOklch2oklab`, `rawOklabToOklch
→ rawOklab2oklch`. The ADOPT arming lane (`coland-ordering.md §1.1`) found **FIVE** at the pinned
preview `2e559f7a` — adding `oklabToLinearSRGB → oklab2linearSrgb` and `oklabToRgb255 → oklab2rgb255`
(both in `composables/color/index.ts`, the `oklchStopToHex` / gamut-map path). **The packet §3 is an
undercount; the real cut re-greps live** (registry §28.2 — a BUILD concern; G-ADOPT-4a's build-time
re-enumeration gates it against the THEN-CURRENT glass-ui src). **This packet RECORDS the drift; it
does NOT resolve it** — the real cut greps its own live ref.

### keyframes co-migration (source: `publish-packet.md §3`)

- **Floor widen**: `../keyframes.js/package.json` `dependencies["@mkbabb/value.js"]` `^3.1.0 → ^4.0.0`.
- **U-F29**: ONE import rename — `parseCSSSubValue → parseCSSValues` at `compile/parse-flatten.ts:2`
  (import) + `:119` (call). The 3 `parseCSSValue` sites are guarded → NO source change. `selector.ts`
  uses `parseCSSValueUnit` (distinct, still-exported, U-F29-immune) — untouched.
- **U-F30**: NO source change (backward-color PRESERVED). **U-F31** `rotate(45deg)` Z-only rider —
  keyframes verifies/absorbs at its own cut; rides U-F77. keyframes consumes **zero** renamed
  conversion exports.

---

## §4 · THE CO-LAND ORDERING + PIN-RETIREMENT (pointers)

- **The one-window sequence**: `w-adopt/coland/coland-ordering.md §6` — value.js cuts `<N>.0.0`
  (OWNER-HELD) → IN THE SAME WINDOW glass-ui widens peer+dev floor + applies the FIVE U-F34 renames
  (re-grep live) and keyframes widens the runtime `dependencies` floor + `parseCSSSubValue →
  parseCSSValues` → glass-ui's own 5.0.0 tag sequences INDEPENDENTLY → G-ADOPT-4a/4b flip GREEN.
  NEITHER floor is stranded.
- **The 7-pin CI retirement ordering**: `w-adopt/adopt-cut/G-ADOPT-1-arming.md §2` — retire `ref:
  tranche/BG` at all **7** sites (`ci.yml` ×6: `build-and-test`, `e2e-smoke`, `e2e-safari`,
  `e2e-slate`, `gh-pages`, `boot-smoke` + `deploy-pages.yml` ×1) → tagged `v5.0.0`; refresh the lock
  (U-F68, `~4.0.0` → 5.0.0); boot-smoke against the built 5.0.0 dist (the §3.4 named-export-drift
  catch). **G-ADOPT-1 = ARMED-RED (3 of 4 arms RED; 1(c) goo-blob→blob already GREEN at the import
  surface, `110b56f`).**

---

## §5 · THE SUBSTRATE-PIN / PREVIEW STATE (source: `w-adopt/substrate-pin.md`) — EPHEMERAL

The demo is **un-bootable at raw `tranche-u` HEAD** (the pinned glass-ui 5.0.0 dist imports value.js
under the OLD pre-rename names). The substrate is a pinned coherent producer ref:

- **Pin ref `2e559f7a`** (the most recent producer ref whose tree is coherent — post-blob-rename,
  pre-morph-churn: `.d.ts` present + CSS `@import` graph fully resolved). Both symlinks
  (`node_modules/@mkbabb/glass-ui` MAIN + `.claude/worktrees/glass-ui` LANE) → `.claude/worktrees/
  glass-ui-pinned`. **UNPIN at the v5 tag** (or a coherent HEAD dist), retargeting both symlinks back
  to `/Users/mkbabb/Programming/glass-ui`.
- **The co-land PREVIEW `296b8b2`** — **EPHEMERAL**: the FIVE renames patched **UNCOMMITTED** into the
  pinned sandbox working tree (glass-ui src, keyframes node_modules copy, value.js node_modules
  refresh). There: `npm run gh-pages` GREEN + typecheck 0 + LIB slate **20/20** + owner demo HTTP 200,
  zero old-name resolution errors. **DISCARDED at unpin** — the real migration executes at U.W-ADOPT
  from `publish-packet.md §3`, floating on the glass-ui `5.0.0` tag. **NO commit in the pinned
  worktree; NO write to the live glass-ui/keyframes checkouts.**

---

## §6 · THE DECISION LINE — OWNER-HELD (§13.5)

> **The version-cut decision is OWNER-HELD (§13.5).** LIB landed the fix (20/20 GREEN, sequenced to
> U.W-ADOPT). ADOPT sequenced the co-land (both floors, the FOUR surfaces, the FIVE-rename drift, the
> 7-pin retirement, the ephemeral preview proving it builds green). **CLOSE presents this packet with
> the fix already landed. The owner cuts.**

**CLOSE does NOT**: cut the version · choose the number · widen a floor · publish · write into the
foreign tree. The cut is the coupled owner event (ratify U + close T as ONE). **An un-taken cut is
NOT a miss (PP-16); §13.5 forbids the unilateral cut.**

---

**Precedence chain** (restated): owner verbatim (§13.5) → `audit/registry.md §13.5/§28/§28.2/§28.3` →
`DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md` → this presentation. **The registry wins on
the FOUR surfaces (not R6's three). CLOSE presents; the owner rules. Zero silent drops.**
