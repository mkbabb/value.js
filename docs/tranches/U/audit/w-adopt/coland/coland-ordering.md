# U.W-ADOPT Lane C — THE CO-LAND ORDERING SPEC (U-F77 · U-F28 · G-ADOPT-4 arming)

*Authored by the U.W-ADOPT co-land sequencing lane (2026-07-13). This lane
**SEQUENCES** the owner-held version-cut decision against BOTH `@mkbabb/value.js
'^3.1.0'` floors and **AUTHORS** the co-land ordering; it **ARMS** the born-RED
G-ADOPT-4 (both arms). It does **NOT** take the cut — the version decision is
**OWNER-HELD** (registry §13.5). No `package.json` version edit, no publish, no
floor widen lands from this lane. The cut-execution residual books BY NAME to
U.W-CLOSE (PP-16).*

**Precedence**: owner verbatim (§13.5) → `../registry.md` → `../../waves/U.W-ADOPT.md`
→ this spec. Where this spec and the registry could diverge, the **registry wins**.

**Input sequenced**: `../../w-lib/publish-packet.md` (the LIB publish packet — LIB
LANDED the fix, LIB does NOT cut; recommends `4.0.0` MAJOR, **OWNER-DECIDES the
number, the class is forced**). The structural resolution is `../registry.md` §20
(R-4) + §22 + §25 + §28.

---

## §0 · STATE AT AUTHORING (substrate + trigger)

| Fact | Value (verified this lane) |
|---|---|
| value.js branch / npm | `tranche-u` · published **3.1.0** · `package.json` version **3.1.0** |
| **glass-ui v5 trigger** | **UNFIRED** — `git -C ../glass-ui tag --list 'v5*'` → **EMPTY** |
| glass-ui sibling HEAD | `8b0f9acc` (branch `tranche/BI`, disk labels `5.0.0`) |
| keyframes sibling HEAD | `f794def9` |
| pinned-worktree base | `2e559f7a` (holds the orchestrator's UNCOMMITTED 6-file rename PREVIEW — the sanctioned sandbox, **NOT this lane's work**) |
| packet §3 verification refs | glass-ui `c66b5354` · keyframes `f794def9` |
| LIB invariant | **LANDED** — U-F30 = composite **Locus-P** ("parser colors are physical"); `CONVENTION_INVARIANT_LANDED = true`; **zero co-migrants** (publish-packet §1 LIB-G6, §4) |
| LIB→glass-ui invariant relay | **LANDED** at `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-u-w-lib-invariant.md` (packet §3, commit `6c3e1609` local at glass-ui HEAD) |
| formation communiqué | **LANDED** at glass-ui HEAD `17e0f522` (`valuejs-inbox-2026-07-12-u-formation.md`, registry §28.3) |

**This wave FLOATS on the owner-gated cut.** The G-ADOPT-4 gates are ARMED now
(the defects are LIVE / the decision is un-taken) and flip only at the REAL cut.
**If v5 tags mid-lane: REPORT, never act** (registry §13.5 — the version decision
is owner-held; a flip over the pinned sandbox preview is E-3-forbidden).

---

## §1 · THE THREE BINDS AT THE CUT (U-F77 — the co-land ordering)

Per registry §28 / publish-packet §3, U.W-ADOPT does **not** re-enumerate a living
codebase's consumers (a moving target). It **sequences** three binds that MUST
land in ONE window when the owner takes the cut:

### Bind (a) — the version decision against BOTH `^3.1.0` floors (OWNER-HELD, §13.5)

The library-correctness cut is **semver-MAJOR** (publish-packet §2, each change
independently breaking): `parseCSSValue` now THROWS `CSSParseError` on multi-token
input · `parseCSSSubValue → parseCSSValues` (no alias) · `{from}To{to} → {from}2{to}`
conversion-export renames (no aliases) · `color-mix()`/`rgb(from …)` serialize
physical-range · `rotate(45deg)` Z-only / `sin(30deg)` unitless / gradient-stop
serialize. **Recommended `4.0.0` — OWNER-DECIDES the number; the MAJOR class is
forced.** BOTH siblings pin `^3.1.0`, so a `4.0.0` cut strands **TWO** floors (see
§2) — they co-land in ONE window; a `3.x` minor would auto-adopt both. **This lane
does not choose the number and does not widen any floor.**

### Bind (b) — glass-ui's co-migration (the U-F34 renames; U-F30 = NO source change)

- **Floor widen** (glass-ui side, owner/glass-ui-session action at the cut):
  `../glass-ui/package.json` → `peerDependencies["@mkbabb/value.js"]` +
  `devDependencies["@mkbabb/value.js"]` `^3.1.0 → ^N.0.0` (cite block+key, never a
  line integer into the moving foreign tree).
- **U-F34 source migration** — the ONLY glass-ui source change owed. Pure
  find-replace, signatures identical. **⚠ DRIFT — see §1.1: the pinned src needs
  FIVE renames, not the packet's three.**
- **U-F30 — NO glass-ui source change.** Surface 1 (`parseCSSColor → colorUnit2`)
  is a **beneficiary** (auto-adopts the physical-range fix). Surface 2 (spectrum-walk
  direct `mixColors`/`sampleColorRamp`) is **PRESERVED byte-identical** (Locus-P —
  the raw functions are unchanged; §3).
- **U-F29 — NO glass-ui action** (glass-ui imports **zero** `parseCSSValue`).

### Bind (c) — keyframes' co-migration (ONE import rename + the floor; U-F30 preserved)

- **Floor widen**: `../keyframes.js/package.json:268` →
  `dependencies["@mkbabb/value.js"]` `^3.1.0 → ^N.0.0` — the **RUNTIME dependency**
  floor (grep the `dependencies` block, NOT `devDependencies`; the STRONGER
  coupling — a MAJOR cut strands keyframes' runtime dep AND every transitive
  keyframes consumer, not merely keyframes' own build). VERIFIED `:267` opens
  `"dependencies": {`, `:268` is the `@mkbabb/value.js` pin.
- **U-F29 rename** — ONE import + one call, VERIFIED live:
  `parse-flatten.ts:2` (`import { parseCSSSubValue } from "@mkbabb/value.js/parsing"`)
  + `:119` (`const p = parseCSSSubValue(strValue, { subProperty: childKey })`) →
  `parseCSSValues` (the full-list shape is identical). (A comment at `:111` also
  names it — non-load-bearing.)
- **U-F29 — the 3 `parseCSSValue` sites need NO change beyond the pin** (all
  try/catch-guarded → the new `CSSParseError` throw degrades to a caught
  diagnostic + `DROP`/return-node): `resolve-if.ts:14`(import),`:131`(call);
  `resolve-function.ts:12`(import),`:61`+`:159`(calls). VERIFIED live.
- **U-F30 — NO keyframes source change.** Surface 4 (backward-color direct
  `sampleColorRamp`/`color2`) is **PRESERVED** (Locus-P; §3). `selector.ts`'s
  `parseCSSValueUnit` is a distinct still-exported single-token parser (U-F29-immune).
- **U-F31 rider** — `rotate(45deg)` Z-only feeds keyframes' apply/resolve path (a
  parse-output DELTA). keyframes verifies/absorbs this at its own cut; **rides
  U-F77's pin-widen**, not an owed value.js action.
- keyframes consumes **zero** renamed conversion exports (U-F34 owes it nothing).

### §1.1 · ⚠ DISPATCHER-FLAGGED DRIFT — glass-ui needs FIVE U-F34 renames, not three

The publish-packet §3 (verified against glass-ui `c66b5354`) enumerates **three**
conversion renames across 4 files. The pinned-worktree preview (base `2e559f7a`)
DIFF shows the pinned glass-ui src consumes **FIVE distinct renamed identifiers**
across 6 files (43/43 name-only, signatures identical) — VERIFIED this lane by
reading the preview diff:

| # | Old (gone at the cut) | New (`{from}2{to}`) | In packet §3? | Live-import site(s) |
|---|---|---|---|---|
| 1 | `srgbToOKLab` | `srgb2oklab` | ✅ yes | `composables/color/index.ts` · `composables/glass/ambientHueHistogram.ts` · `components/custom/aurora/composables/color.ts` |
| 2 | `rawOklchToOklab` | `rawOklch2oklab` | ✅ yes | `composables/color/useAccentTone.ts` · `composables/color/index.ts` |
| 3 | `rawOklabToOklch` | `rawOklab2oklch` | ✅ yes | `composables/glass/ambientHueHistogram.ts` · `composables/color/index.ts` |
| 4 | `oklabToLinearSRGB` | `oklab2linearSrgb` | ❌ **MISSED** | `composables/color/index.ts` (the `oklchStopToHex` / gamut-map path) |
| 5 | `oklabToRgb255` | `oklab2rgb255` | ❌ **MISSED** | `composables/color/index.ts` (`oklchStopToHex` gamma-hex) |

The 6th and 5th diff files (`procedural-color.wgsl.ts` / `procedural-color.glsl.ts`)
carry the value.js names only in **doc-comment mirrors** ("Mirrors value.js
srgb2oklab") — not live imports, but they DO drift the comment text and are part of
the preview's 6-file set. **Resolution (registry §28.2 — the STRUCTURAL fix, not a
count fix):** the count is a BUILD concern. At the REAL cut the U-F34 find-replace
covers whatever the THEN-CURRENT glass-ui src consumes (re-grep live for the old
`{from}To{to}` conversion names), and G-ADOPT-4a's build-time re-enumeration gates
it. The packet's "three" is the `c66b5354` snapshot; the pinned preview's "five" is
the `2e559f7a` truth; the real cut greps its own live ref. **FLAGGED for the real
cut — the packet §3 rename table is an undercount.**

---

## §2 · BOTH-FLOOR VERIFICATION (G-ADOPT-4b evidence)

| Consumer | Pin | Block · key (cite block, not line into a moving tree) | Coupling class |
|---|---|---|---|
| glass-ui | `^3.1.0` | `peerDependencies["@mkbabb/value.js"]` (site `:1091`) + `devDependencies["@mkbabb/value.js"]` (site `:1129`) | **PEER floor** (+ `peerDependenciesMeta` marks it optional, `:1115`) |
| keyframes | `^3.1.0` | `dependencies["@mkbabb/value.js"]` (site `:268`) | **RUNTIME dependency floor** (the STRONGER coupling) |
| value.js | — | `package.json` version **3.1.0** | the publisher |

- A `3.x` **minor** cut auto-adopts BOTH floors (`^3.1.0` admits `3.x`).
- A `4.0.0` **MAJOR** cut strands BOTH floors until BOTH siblings co-widen.
- Registry §22 [r5 CORRECTION] is honored: keyframes' is a **RUNTIME** floor
  (`dependencies`), NOT the "two PEER floors" shorthand; glass-ui's is the peer
  floor. The distinction is load-bearing for the coupling severity.

---

## §3 · THE LOCUS-P PRESERVATION FINDING (surfaces 2 + 4 — the §28 FOUR resolved)

Registry §28 (round 7) enumerates **FOUR** convention-sensitive surfaces (§25's
THREE + keyframes backward-color). The gate drives all FOUR. LIB's landed invariant
is **Locus-P** (denorm-on-output at the color-mix parser consumer + normalize-on-
construct at `resolveRelativeColor`), which leaves the raw functions
`mixColors`/`sampleColorRamp`/`color2` **UNCHANGED**. Therefore:

| # | Surface | Site (VERIFIED this lane) | Disposition under Locus-P |
|---|---|---|---|
| 1 | glass-ui `parseCSSColor` | glass-ui `composables/color/index.ts` (parse→`colorUnit2`) | **BENEFICIARY** (auto-adopts the physical-range fix; latent double-normalize cured) |
| 2 | glass-ui direct `mixColors`/`sampleColorRamp` | pinned `.../border-progress/composables/spectrum-walk.ts` — import `:22` (`{ mixColors, OKLCHColor, sampleColorRamp }`), raw `c.l`/`c.c`/`c.h*360` `:37-39`, `mixColors(…)` `:58`, `sampleColorRamp(…)` `:90` | **PRESERVED byte-identical** — reads RAW `OKLCHColor` channels; functions unchanged |
| 3 | keyframes `parseCSSValue` ×3 | `resolve-if.ts:131` · `resolve-function.ts:61,159` (try/catch-guarded) | reshaped parse output degrades to caught `CSSParseError` — NO source change owed beyond the pin |
| 4 | keyframes direct `sampleColorRamp`/`color2` | `.../compile/emit/backward-color.ts` — import `:25`, `rawOklab` `:58-73` (`color2(c,'oklab')`→`.l/.a/.b`), `sampleColorRamp` `:205`/`:221` | **PRESERVED** — would have broken SILENTLY under Locus-F (relative-ΔE proof cancels a uniform shift); Locus-P holds it |

**FINDING: surfaces 2 + 4 are PROVABLY PRESERVED, ZERO co-migrants** (LIB-G6:
`CONVENTION_INVARIANT_LANDED = true`). The §28 4-surface worry RESOLVES: neither
sibling direct-channel reader co-migrates; both are byte-identical across the cut.
The choice is LANDED and preserving; it MUST be re-confirmed at the cut via the
build-time re-enumeration (G-ADOPT-4a), but no co-migration source edit is owed for
U-F30 on any surface.

---

## §4 · G-ADOPT-4 — BORN-RED, TWO ARMS (ARM both; do NOT flip over the sandbox)

Both arms are born-RED at authoring. E-3: the gates flip only at the **REAL** cut,
never faked over the pinned sandbox preview.

### 4a — the build-time re-enumeration (registry §28.2; authored in U.W-LIB, re-run at THIS cut)

**Mechanism**: a source-tree census greps the THEN-CURRENT constellation for
raw-channel readers of the changed U-F30 functions
(`mixColors`/`sampleColorRamp`/`color2` + `parseCSSValue`/`parseCSSColor`) and gates
the chosen invariant against ALL enumerated surfaces. It lives in the U.W-LIB
vitest slate (`test/tranche-u-lib.test.ts`, the LIB-G6 census — the source-tree
raw-reader re-enumeration; NOT in `scripts/gates/proof-lib-correctness.mjs`, which
is behavioral-legs-only against the dist, per that gate's own §11 note).

- **RED evidence (today)**: the enumeration returns the FOUR surfaces (glass-ui
  spectrum-walk + parseCSSColor; keyframes backward-color + parseCSSValue×3). At the
  live cut the gate is un-re-run against the THEN-CURRENT constellation.
- **Per the packet the invariant is Locus-P (preserving)** → surfaces 2 + 4 are
  PROVABLY PRESERVED (§3) → the gate flips **GREEN** when re-run at the cut confirms
  **every enumerated surface preserved-or-co-migrated**. On the pinned-worktree
  state that condition already reads preserved (§3), but the flip is only valid
  against the REAL cut's live grep, which ALSO re-verifies the §1.1 U-F34 rename
  set is complete on the live glass-ui src.
- **Registry wins on the count**: §28 AMENDED §25's THREE to FOUR (added keyframes
  backward-color). The gate drives all FOUR; the "three" framing is pre-§28.

### 4b — BOTH `^3.1.0` floors satisfied at the version cut

**Assertion**: the owner-held version decision keeps glass-ui's `^3.1.0`
(`peerDependencies` + `devDependencies`, the peer floor) AND keyframes' `^3.1.0`
(`dependencies:268`, the runtime floor) satisfied.

- **RED evidence (today)**: the version decision is **un-taken** (§13.5,
  owner-held). Both floors read `^3.1.0`; value.js is 3.1.0.
- **Flip condition**: GREEN when the cut is taken with **both floors held** (a `3.x`
  minor auto-adopts — instant GREEN) **OR both siblings co-widened + relayed** (a
  `4.0.0` MAJOR — GREEN only once both `package.json` pins move to `^4` in the same
  window). A `4.0.0` cut is **RED** until both siblings co-widen.

**ARM both. Record RED evidence. Do NOT fake a flip over the pinned sandbox
preview.**

---

## §5 · U-F28 — kf-prm-expand-fixed-unreleased · WATCH ROW (no work, no gate)

- **Evidence** (registry §7): the one keyframes ask is FIXED at their HEAD
  (`managed-stepper.ts` PRM arm now emits) but **unreleased** (disk `5.2.0`, no tag
  past it).
- **value.js has ZERO direct keyframes imports** — a standing structural fact (the
  keyframes devDep is the demo build's provision of glass-ui's kf peerDependency,
  CLAUDE.md §Dependencies). NO work, NO born-RED gate (a standing GREEN structural
  fact).
- **Disposition**: retire the moment keyframes cuts its next tag. **Booked to
  U.W-CLOSE's book re-probe.**

---

## §6 · THE CO-LAND ORDERING (the sequence the cut executes)

```
1. value.js cuts <N>.0.0            ← OWNER-HELD (§13.5); number owner's, MAJOR class forced
   └─ (a 3.x minor auto-adopts both floors → binds (b)/(c) reduce to the U-F34/U-F29 renames only)
2. IN THE SAME WINDOW:
   ├─ glass-ui: widen peer+dev floor → ^<N>  +  apply the U-F34 renames (FIVE — §1.1, re-grep live)
   │            └─ U-F30: no source change (spectrum-walk PRESERVED); U-F29: none (zero parseCSSValue)
   └─ keyframes: widen runtime `dependencies` floor → ^<N>  +  parseCSSSubValue→parseCSSValues (parse-flatten.ts:2,119)
                └─ U-F30: no source change (backward-color PRESERVED); the 3 parseCSSValue sites guarded; U-F31 rider absorbed at kf's cut
3. glass-ui's OWN 5.0.0 tag (which U.W-ADOPT floats on) sequences INDEPENDENTLY.
   └─ NEITHER floor is stranded.
4. G-ADOPT-4a re-run against the THEN-CURRENT constellation → GREEN (all surfaces preserved-or-co-migrated + rename set complete)
   G-ADOPT-4b → GREEN (both floors held / co-widened)
```

**RELAY (E-2)**: the LIB-invariant relay is ALREADY LANDED (§0). At the cut the
co-land **ADDENDUM** extends it (the version decision + the floor-widen sequencing +
whether spectrum-walk HOLDS the convention — it does, §3). In this UNFIRED arm the
addendum is authored HERE as the ordering spec; it is written into the glass-ui BI
tree only at the real cut (foreign-tree fence — no foreign edit from this lane).

---

## §7 · BOOKS + COMPLETION (PP-16)

- **U-F77 co-land ordering** — DECIDED + authored (this doc) + G-ADOPT-4 ARMED,
  independent of the cut. **The cut-execution residual books BY NAME to U.W-CLOSE**
  (if the trigger does not fire in-window; closes `complete_with_misses`, never
  re-booked to a successor tranche).
- **U-F28 keyframes next-tag retire → U.W-CLOSE book re-probe.**
- **U-F3 (Q14/RP-2 LCP producer cut) → U.W-PERF** (already escalated/FILED per the
  recent commits — cross-reference, no work this lane).
- **The version cut → U.W-CLOSE** if trigger-gated past the window.

**Zero silent drops.** The disease-row co-land LAW is satisfied by the DECISION +
the authored ordering + the armed gates, independent of whether the owner-gated cut
fires in-window (registry §26; U.W-ADOPT §Completion criterion).
