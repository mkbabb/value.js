# h-wave-w0-w1 — WAVE HARDENING of T.W0 + T.W1

**Lane**: `h-wave-w0-w1` (adversarial wave-doc hardening). **Product under audit**:
`docs/tranches/T/waves/T.W0.md` + `T.W1.md` against their spec-of-record
(`audit/SYNTHESIS.md §3/§4/§5/§6/§8`), the MANDATE (§0 verbatim law), and the LIVE TREE @ HEAD
`2823b2d`. **Charge**: every gate row executable cold · every anchor live · single-writer maps
total · MOVE-MAP program vs the 4 census tables · additive-dts vs Q15 · packet-dispatch protocol
executable · dead-lane recovery-readiness.

**Method**: I re-derived every load-bearing anchor against the live tree (not the census prose),
ran the `proof:*` split arithmetic against `package.json`, enumerated the demo's actual `@src/*`
leak set against the public subpath surface, and traced each cross-ref to its backing lane.
**Verdict**: the wave scaffolding is thorough (file-bounds, commit-plan, verification-artefacts,
hand-off all present and mostly faithful), and ~15 spot-checked anchors are LIVE. But TWO
load-bearing seams are internally contradictory in a way that makes a W1-src gate non-executable
as written, and one census item fell out of the wave enumeration. Ranked most-severe first.

---

## MUSTFIX

### M1 — W1-src's primary gate cites a dist gate that W0-2 DELETES (the subpath invariant has no reclassified home)

**Severity**: MUSTFIX. **Location**: `T.W1.md:44` (W1-src gate) + `T.W1.md:197-198` (§Dependencies)
+ `T.W0.md:183-184` (hand-off) vs `T.W0.md:41,86` + `SYNTHESIS.md:270` (W0-2 retain/excise split).

**The contradiction**: W0-2 retain-reclassifies **exactly 4** gates into `test:dist` —
`css-parity`, `round-trip-idempotent`, `perf-target`, `serialize-fidelity` — and **EXCISES the
other 8**. `proof:subpath-budget` and `proof:subpath-resolve` are in the excise-8. Yet three
downstream sites assert the opposite:
- `T.W1.md:44` W1-src gate: *"`proof:subpath-budget`-class invariant green (parse-that-free
  subpaths — **the W0-2 reclassified dist gate guards it**)"*
- `T.W0.md:183-184` hand-off: *"a CI that runs `test:dist` (**the parse-that-free subpath
  invariant's new home** — W1-src's gate reads it)"*
- `T.W1.md:197-198` §Dependencies: *"Depends on: T.W0 (**the `test:dist` home for the subpath
  invariant**…)"*
- `SYNTHESIS.md:479` §5.3: *"The parse-that-free subpath invariant survives every move (**the
  reclassified dist gate guards it**)."*

**Evidence it's real, not a naming coincidence** — `scripts/proof-subpath-budget.mjs` header
(verified @HEAD): *"the crux of the subpath split. The REAL observable: importing
`@mkbabb/value.js/color` … pulls ZERO `@mkbabb/parse-that` / @keyframes-grammar modules into the
graph … BUNDLE-TRACES the `./color` entry through esbuild … asserts no `src/parsing/` module
appears."* This **IS** the parse-that-free subpath invariant. None of the retain-4 asserts this
graph property (css-parity = gradient parsing; round-trip = semantic idempotence; perf-target =
parser throughput ratio; serialize-fidelity = serialization). So W0-2 as written removes the only
script implementing the invariant W1-src's gate depends on. The legacy-sweep source (F5, lines
163-170) even flags `subpath-budget` as *"EXCISE **or fold into a standing unit test**"* — the
fold option exists, but W0-2 encoded ONLY "excise," dropping the fold.

**Failure for a cold agent**: a W1-src verifier reads its gate ("the W0-2 reclassified dist gate
guards [the subpath invariant]"), inspects the W0-2-produced `test:dist`, finds no parse-that-free
check (it was excised), and cannot certify the gate. This is precisely a papered-over seam.

**Proposed amendment**: W0-2 must retain-**reclassify** `proof:subpath-budget` (the bundle-trace)
into `test:dist` as a 5th behavioral gate (or explicitly "fold the parse-that-free bundle-trace
into `test:dist`"), and adjust the split arithmetic to retain-5 / excise-7. Alternatively (weaker),
strike the three downstream "the W0-2 reclassified dist gate guards the subpath invariant"
assertions and re-home the invariant to a named `test/*.test.ts`. Either way the W0-2 item, the
W1-src gate, and §5.3 must name the SAME home for the parse-that-free check.

---

### M2 — The Q15 / W1-src keystone undercounts the demo's leaked-symbol set (5 named, 7 actual with no public home)

**Severity**: MUSTFIX. **Location**: `T.W1.md:44` (W1-src item 1) + `SYNTHESIS.md:283,586` (Q15
default) + `T.W1.md:152-153` (gate 8).

**The premise**: W1-src item 1 = *"repoint demo off `@src/*` deep paths onto the public subpaths;
the **5 leaked conversion primitives** get citizenship (Q15)."* Q15's default (`SYNTHESIS.md:586`)
promotes exactly `linearToSrgb`, `hsl2rgb`, `oklch2xyz`/`xyz2rgb`, `hex2rgb`. The keystone's whole
value ("land it FIRST and every later move is a one-barrel edit") assumes those 5 are the ONLY
symbols without a public home.

**Evidence (live @HEAD)** — I diffed the demo's full `@src/*` imported-symbol set against the
public surface (`src/subpaths/*.ts` + `src/index.ts`). **Seven** symbols leak with NO public home:
`hex2rgb`, `hsl2rgb`, `linearToSrgb`, `oklch2xyz`, `xyz2rgb` (the 5 named) **PLUS**:
- `getColorSpaceBound` — imported from `@src/units/color/constants` at **5 sites**
  (`readoutReservation.ts:21`, `useSliderGradients.ts:6`, `view-accents.ts:59` ×4 uses); NOT in
  any subpath/index barrel.
- `oklabToLinearSRGBInto` — imported from `@src/units/color/gamut` at **2 hot-paint sites**
  (`perceivedSpacePaint.ts:24,100`, `usePerceivedRamp.ts:24,110`); the `/color` subpath exports
  `oklabToLinearSRGB` but NOT its zero-alloc `Into` twin. This is squarely Q15's own stated
  rationale (*"the gamut overlay samples per-pixel — no `color2()` detour"*) — yet it was omitted
  from the promotion list.

**Failure for a cold agent**: the keystone gate "repoint demo off `@src/*` deep paths onto public
subpaths" cannot fully land — after promoting the 5, `getColorSpaceBound` and
`oklabToLinearSRGBInto` remain deep-imported with no ratified disposition. The agent must either
(a) promote 2 un-ratified symbols (scope past Q15), (b) leave 2 deep imports (keystone incomplete
— the "one-barrel edit" promise breaks), or (c) re-derive on a hot paint path via `color2()`/inline
`COLOR_SPACE_RANGES` — the exact workaround Q15 rejected. No wave/Q row adjudicates this fork.

**Proposed amendment**: correct the census figure to **7** leaked no-home symbols (or state the
count is regenerable), and give `getColorSpaceBound` + `oklabToLinearSRGBInto` an explicit Q15
disposition — promote both (the Into-twin is the per-pixel case Q15 was written for;
`getColorSpaceBound` is a thin `COLOR_SPACE_RANGES` wrapper the readout/slider/accent paths need),
or name the sanctioned re-derivation for each. The gate-8 "additive-only" ledger already permits
the extra promotions (they are additions).

---

## SHOULDFIX

### S1 — legacy-sweep F3 (dark-mode-toggle DISSOLVE) has no explicit wave-item home

**Severity**: SHOULDFIX. **Location**: `SYNTHESIS.md:114` (LEG-1..9 bundle) vs `T.W0.md:42` (W0-3
enumeration) + `T.W1.md:42` (W1-demo cargo).

The SYNTHESIS §1.2 LEG-1..9 bundle lists nine legacy items → "W0 (+W1 moves)", **item 3 =
"dark-mode-toggle dissolve"** (legacy-sweep F3: `demo/@/components/custom/dark-mode-toggle/index.ts`
is a live 2-line re-export folder with 4 consumers; DISSOLVE + repoint). W0-3's explicit item list
names BulkActionToolbar, SortFilterMenu, savedPalettes param, type trio, PaletteDialog CC-6,
PaletteSlugBar migration, stale comments — **no dark-mode-toggle dissolve**. W1-demo names the
*distinct* `dup-useDark` fold (a different concern — the toggle folder does not define a dup
composable). Verified the folder still exists @HEAD. A cold W0-3 agent following the enumeration
drops F3.

**Proposed amendment**: add "dark-mode-toggle/ DISSOLVE (F3: repoint the 4 consumers to
`@mkbabb/glass-ui/{controls,dark}`, delete the folder)" to W0-3's item list (or explicitly to
W1-demo's DROP/dissolve beat), so every LEG-1..9 item has a named wave home.

### S2 — W1's "writer-disjoint by construction" is false for the demo tree; the keystone→W1-demo dependency is under-scoped

**Severity**: SHOULDFIX. **Location**: `T.W1.md:125-126` (disjointness claim) + `T.W1.md:85-87`
(§Lane orders seam) + the file-bounds table `T.W1.md:121,123`.

The file bounds grant BOTH lanes write access to `demo/@`: W1-demo = `demo/@/**`; W1-src =
`demo/` import specifiers (keystone hunk). The doc claims *"the three trees are writer-disjoint by
construction; the ONE seam (W1-src's demo-specifier keystone hunk) is sequenced before W1-demo's
**color-domain codemod**."* But the keystone touches ~50 demo files across gradient/, mix/,
image-palette-extractor/, generate/, color-picker/, palette-browser (`SearchFilterBar.vue`), and
`lib/view-accents.ts` (I counted **150 `@src/*` import lines** in the demo) — and W1-demo MOVES /
recurses all of those same trees per §5.1. So the keystone→W1-demo serialization is far broader
than "the color-domain codemod"; effectively every `@src`-leaking demo file is a two-writer file
under concurrent lanes. "Writer-disjoint by construction" overstates it.

**Proposed amendment**: reword the disjointness note to "the demo tree is a SHARED writer surface
between W1-src (keystone specifier edits) and W1-demo (moves); the keystone lands FIRST and
W1-demo's ENTIRE `@src`-leaking file set (gradient/mix/extractor/generate/color-picker/
palette-browser/view-accents), not just the color-domain codemod, is gated behind it," or move the
keystone specifier edits into W1-demo's writer scope (a same-lane sequenced step) so the trees stay
truly disjoint.

### S3 — The KF dispatch has no separate artefact and no keyframes HEAD-stamp step, deviating from the S-era precedent the consolidation law rests on

**Severity**: SHOULDFIX. **Location**: `T.W0.md:99-100` + `T.W0.md:85` (file bounds "+ the KF
letter") vs `letters/GLASSUI-T-ASKS.md:63-67` (§KF section) + `:111-127` (dispatch protocol).

W0-1's gate: *"the KF letter dispatched to keyframes (consolidation law), **never folded into the
glass-ui letter**"*; file-bounds lists *"`letters/GLASSUI-T-ASKS.md` (+ **the KF letter**)"* —
implying a distinct artefact. Reality: there is NO separate KF file in `letters/`; the KF ask is
**§KF, a section inside `GLASSUI-T-ASKS.md`** (the file literally titled "GLASSUI-T-ASKS", and its
own §KF header even cites the S-era `S/letters/KF-COURTESY.md` — which WAS a separate file). The
dispatch protocol's re-stamp step (`:115-118`) only stamps the glass-ui `tranche/BG` HEAD and
re-verifies the glass-ui cites; it has NO step to stamp a **keyframes.js** HEAD, though §KF says
"re-stamped at dispatch (with current line numbers)" against `managed-play.ts:48-59` in the
`keyframes.js` tree (a different repo with its own HEAD). A cold dispatcher is left guessing what
artefact goes to the keyframes inbox and against which HEAD its line-cite is re-verified.

**Proposed amendment**: either author a genuine separate `T/letters/KF-*.md` (the S precedent) so
"the KF letter" is a real file, or reword W0-1's gate + file-bounds to "the §KF section, transmitted
as a separate dispatch to the keyframes inbox" and add a keyframes-HEAD re-stamp step to the
dispatch protocol (verify `managed-play.ts:48-59` against `../keyframes.js` HEAD at dispatch).

---

## NOTE

### N1 — "t-legacy-sweep LEG-1..9" is a wrong-lane cross-ref

`T.W0.md:42` W0-3 anchor cites *"t-legacy-sweep LEG-1..9"*, but the legacy-sweep lane numbers its
findings **F1–F10**; "LEG-1..9" is the SYNTHESIS §1.2 fleet-table label (`SYNTHESIS.md:114`). A
verifier grepping `t-legacy-sweep.md` for "LEG-1" finds nothing. Amend the cite to "t-legacy-sweep
F1–F9 (via SYNTHESIS §1.2 LEG-1..9)".

### N2 — `constants.ts:340-344` anchor drops the disambiguating path

W0-3 cites bare `constants.ts:340-344` (repeated at `T.W0.md:87`). Two `src` `constants.ts` files
exist (`src/units/constants.ts` = 165 LoC; `src/units/color/constants.ts` = 500 LoC); only the
latter has line 340 (verified: the `ColorSpaceRanges`/`ColorSpaceDenormUnits`/`ColorComponent`
trio, all dead within `src/` — excision sound). Line number disambiguates, but the census
(`t-legacy-sweep F1`) uses the full path; the wave doc should too.

### N3 — W0-4's "ci.yml:362 comment" is backed by t-deferred-census, not the cited t-docs-truth

W0-4's evidence cite is *"t-docs-truth DOC-1..13"* (`T.W0.md:43`), but `t-docs-truth.md` has ZERO
`ci.yml` references; the `ci.yml:362` stale-soft-launch-comment finding lives in
`t-deferred-census.md:131 (S3)` + `:192`. The item is real and executable (line 362 is a
"continue-on-error / never blocks" comment under a step named "budget gate — HARD, W0-2b" — a stale
soft-launch comment survived the hard flip). Add the t-deferred-census S3 cite to W0-4's evidence
column.

### N4 — "224-class suite green post-excision" names the PRE-excision baseline

`T.W1.md:43,145` calls the post-TA-4 gate "the 224-class suite green" while the same line says
"diff tests deleted, fork coverage re-homed" — so the post-excision count is < 224 (224 = the
current HEAD baseline, which I verified: `npx vitest list` = exactly 224). Minor: reword to "the api
suite green post-TA-4 (224 baseline minus the deleted diff class)".

---

## Cleared checks (verified faithful — recorded so the clean bill carries evidence)

- **Anchors live @HEAD** (spot-checked ~15): `ColorInput.vue:338` (`var(--ring)` box-shadow ✓),
  `ci.yml:362` (soft-launch comment ✓), `src/units/color/constants.ts:340-344` (trio ✓, dead ✓),
  `style.css:435` (MOB-1 `@media …aspect-ratio<1.1` exception ✓), `style.css:476-484`
  (`.underline-tabs` MARKER ✓), 7 `src/subpaths/*.ts` + 8 `exports` keys (EXACT ✓), boot subsystem
  `useAtmosphereBoot/useAtmosphere/useViewAccents/view-accents` (all exist — W2's surface is
  creatable ✓), exemplars `ImageEyedropper/` + `PaletteDialog/` (✓), TA-4 targets
  `lib/crud/atomdiff.ts` + `/diff` route + `models.ts:172 atomDiff` + `computeAtomSetHash` KEEP
  (✓), api suite = **224** (✓), `easing.ts` = **643** LoC watch-anchor (✓), `mobilePaneIndex`
  MOB-2 leak (✓). Foreign-tree cites (`useAurora.ts:228/262`, `managed-play.ts:48-59`) drift is
  expected and restamp-gated per the W0-1 HEAD-stamp corollary — not a finding.
- **W0-2 proof:* arithmetic**: 12 `proof:*` scripts @HEAD; retain-4 (named) + excise-8 = 12 ✓
  (the wave doc's count is RIGHT — the legacy-sweep "13" is the stale figure, already logged by
  h-seam-fleet-resume). `globals@^17.6.0` devDep present ✓; `scripts/generate-favicon.mjs` present,
  zero consumers ✓; `CLAUDE.md:33` proof:* sentence present (Q13 makes it true) ✓. **But the split
  CONTENT is wrong — see M1.**
- **MOVE-MAP vs 4 census tables** (10-row spot-diff): src clusters `parsing/{color,timeline,
  stylesheet}` + `color/gamut/{gamut,raytrace,boundary,okhsl}` all map to live files ✓; constants
  split targets live ✓; demo `palette/` (composables/palette=13 + lib/palette=6 dissolve) ✓;
  `color/` domain + `keys.ts ~24 sites` (29 key-consumer files, in range) ✓; api `modules/` +
  `platform/` + TA-4 ✓. FAITHFUL except the F3 drop (S1) and the Q15 undercount (M2).
- **additive-only dts vs Q15**: CONSISTENT. The AMENDED-AT-PASS-2 note (`T.W1.md:44`) already
  reconciled "byte-stable" → "semver-MINOR additive"; the only surviving "byte-stable" token is
  inside that reconciliation note itself; §5.3 constants split re-exports from the SAME barrel
  names (no removal); Q15 promotions are additions the additive-only gate permits. No residual
  contradiction.
- **Packet-dispatch re-stamp protocol**: EXECUTABLE (letter §Dispatch protocol steps 1–5:
  dispatch-at-ratification, replace `<RE-STAMP AT DISPATCH>` with verified `tranche/BG` HEAD +
  re-verify P1/PKT-1/P3 cites + record `## Dispatch stamp`, dist-rebuild discipline,
  delivery≠disposition, PROGRESS.md record). Gap is only the KF half (S3).
- **Single-writer (W0)**: W0 is 1 serial agent — `ci.yml` written by both W0-2 (test:dist step)
  and W0-6 (reporter/O-25) is safe under serial execution; no intra-wave conflict.

## Recovery-readiness verdict

The wave docs give a cold agent strong scaffolding to resume a dead lane: explicit file-bounds
tables, per-item commit plans, verification-artefact lists, and hand-off blocks. The two blockers
are **M1** (a W1-src gate references a deleted gate) and **M2** (the keystone hits 2 unhomed
symbols with no ratified fork) — both would stall a cold W1-src agent at a decision the corpus
never made. Fix M1+M2 and the W0/W1 pair is cold-resumable.
