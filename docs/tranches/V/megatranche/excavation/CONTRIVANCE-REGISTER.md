# CONTRIVANCE-REGISTER — the M-14 clause 3 adjudication (final aggregated pass)

**Seat.** Fable CONTRIVANCE+CANON adjudicator, M-14 final aggregated pass. **Model observed:** `claude-fable-5`.
**Date** 2026-07-27 · **HEAD** `4f78e57b` (branch `tranche-u`; `git diff --stat c654824e..HEAD -- demo src` → empty, so every seat count taken at `c654824e`/`5c13465d` is still live).
**Charter.** SCOPE.md M-14.3: *"contrivance rooted out of BOTH the extant wave addenda AND the library gestalt in totality"* — with the composite RX-01 law governing every disposition: *presumed contrivance; survives only an explicit adversarial critique* (owner 2026-06-02 "overfit junk / NEVER re-introduce" + owner 2026-07-16T21:09 *"Not blindly abrogated--if the use case is truly worthwhile, and deemed so after our twice critique, then it's kept"*).

**Inputs, all read whole:** every C/D/E seat report under `excavation/extracts/` (shadcn-library-census · design-canon-census · glass-forward-compliance · vnext-standing · the four exhortation digs · the four truth seats), plus the two sibling apotheoses `EXHORTATION-CENSUS.md` and `TRUTH-TABLE.md`, plus `SCOPE.md`, `registry/{DISEASE-REGISTRY,ROOT-FINDINGS}.md` rows as cited.

**Ruling discipline.** RULED rows are cited, never re-argued. Every adopted seat claim in §1–§4 was either spot-verified this session (§0) or carries the seat's own command+output. Dispositions are **candidates feeding Phase F wave authoring** — terminal on the register's authority, executable only through a wave.

---

## §0 · SAGACITY LOG — the refutation battery (own probes, this session)

The mandate requires refuting seat claims by measurement before adopting them. Nineteen probes ran; three produced refutation-grade corrections, the rest confirmed. Corrections first.

### R-1 · shadcn census A-06 — the Button dead-`variant` count is 51/22, not 49; the "16-of-51-were-valid" narrowing is REFUTED

Probe (multiline-aware, tag-scoped — the census's own single-line method undercounts wrapped templates):

```
$ perl -0777 -ne 'while (/<Button\b[^>]*?>/gs) { $t=$&; $n++ if $t =~ /\bvariant=/ }
    END { print $n }'  <every demo *.vue containing "<Button">
TOTAL=51 files=22
```

That is **exactly** the AdminUsersPanel adjudication's figure (*"51 dead `variant` sites in 22 files"*, `adjudicated/AdminUsersPanel.md:63` lineage) and DEFECT-LEDGER :4940/:5210's. The bound `:variant=` sites (7 repo-wide) were receiver-checked: SwatchHoverMenu ×2 → WatercolorDot (valid), PaletteCardSkeleton ×4 → Skeleton (valid), PaletteCard :125 → ActionFeedback (app-owned) — **none on Button**. So the census's per-receiver split (49 Button) undercounts by 2, and its claim that the ledger's 51 *"conflated"* 16 valid attrs from other receivers is arithmetically impossible: Button alone accounts for all 51. **Adopted correction:** the codemod population is **51 sites / 22 files**, Button-only; WatercolorDot 8 / Badge 7 / SelectTrigger 1 are additional-and-valid, untouched.

### R-2 · design-canon census §5.4 / gate `G-PRM-NO-PREFERENCE` — "only `.stagger-children` uses the idiom" is FALSE; the true baseline is 6 blocks / 5 files

```
$ grep -rn "prefers-reduced-motion: no-preference" demo --include='*.css' --include='*.vue'
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:243
demo/shell/dock/DockStatusLamp.vue:109
demo/styles/animations.css:43
demo/color-picker/composables/boot/overture.css:117
demo/color-picker/composables/boot/overture.css:151
demo/palettes/browser/status/ApiOfflineChip.vue:81
```

Four of these wrap their **own keyframes inside** the mandated idiom (verified by read: `lamp-dot-pulse`, `offline-dot-pulse`, `field-paint-in`, plus overture's two blocks). The census's *"Only `.stagger-children` (`:43`) currently uses it"* and the gate baseline *"RED — 1 of 19 keyframe consumers"* are both wrong by ~5×. The gate stays RED on its substance — the blunt global reduce-kill at `animations.css:184-192` remains, and the majority of the 19 demo-owned keyframes sit outside `no-preference` blocks — but **Phase E must mint the gate at the corrected baseline (6/N, not 1/19)**, or its first falsification event will be its own birth number. (Also: `prefers-reduced-motion` = **15** files, not the census's 14 — the 15th is `demo/DESIGN.md` prose.)

### R-3 · shadcn census C-01 / TRUTH-TABLE HB-22 — "every dev visual capture was taken in fallback type" is OVERBROAD; the blast radius is body+mono, not display

The dead guard is real — verified verbatim at `plugins/vite-defer-glass-fonts.ts:72` (`id.includes("demo/@/styles/style.css")` against a tree where `demo/@` does not exist; marker live at `demo/styles/foundation.css:75`). But the producer corpus the transform fails to import carries exactly two families:

```
$ grep -o 'font-family:[^;]*' node_modules/@mkbabb/glass-ui/dist/styles/fonts.css | sort -u
font-family: "Fira Code"
font-family: "Plus Jakarta Sans"
```

The display voice — **Fraunces, the title/hero glyphs — is self-hosted by `demo/color-picker/index.html` itself** (`:45` woff2 preload + inline `@font-face` at `:47-48`), fully independent of the plugin. Dev therefore renders TRUE Fraunces and FALLBACK Jakarta/Fira. The defect stands (PRUNE the guard, row L-G1 below) at corrected severity: body-and-mono metric-compat fallback, display face faithful. Any wave that cites this row must not claim whole-page fallback.

### Confirmations (command receipts in the session record)

`cn(` consumers **0**; `clsx`/`tailwind-merge` live at `package.json:99/:108` · `components.json` names `demo/@/components` + `tailwind.config.ts` + `@styles/style.scss`, all three nonexistent · `demo/ui/label`+`switch` importers **0** · `src/css/index` importers = `src/subpaths/css.ts:35,:56` only · `parseCssValue` (singular) consumers outside test **0** · `dominantColor` mentions = 2 test files + the `useExtractSession.ts:10` "wrong tool" comment · `src/easing.ts` imports only `foundation/result` (both lines) · `foundation/math` importer = `subpaths/math.ts` alone · decompose family consumers in keyframes/glass/demo/e2e **0** · `colorScale|sampleToSVGPath` and `sampleColorRamp|mixColorsInto` = **0** in src+test · `slash[0]!` at `src/css/grammar.ts:181` · 7 e2e files import dead `demo/@` · `master..tranche-u` = 197 · `.vnext/` absent; vnext `proof:` sites = **81**; vnext bytes = **1,750,375** (RED by 375 against its own ≤1,750,000) · duration rungs live = exactly 5 (32/21/3/2/2 = 60 reaches) · `view-transition|startViewTransition` = **0** in demo · `elevation`/`sub-pane` = **0** in all four design docs; `transition` = 0 in three of four · the three-family law + `vj-morph` "ONE surface, NEW content" verbatim at `animations.css:70-75` · MixSourceSelector's bare `<template v-if="mode === 'colors'">` swap under a SegmentedTabs, no Transition wrapper · AdminNamesPanel `<Transition` count **0** · GooBlob refs **0**; `style.css` in demo **0** · glass six-letter sweep re-run: `inheritAttrs`/`muted`/`SliderThumb`/`ConfirmDialog`/`ButtonProps`/`track-stop`/`labelledby`/`TIGHTEN` all **0**, `rail` = 1 (O-7:172, glass's own docstring) · the full `find -iname "*valuejs*"` enumeration shows **no seventh value.js→glass letter after O-16 13:27** — seat E's letter set is complete and its debt list stands.

---

## §1 · CONTRIVANCE IN THE EXTANT WAVE ADDENDA

Dispositions: **PRUNE** (superseded/harvest-only) · **CONSOLIDATE** (content survives, home changes) · **RE-AUTHOR** (premise broken; rewrite before use). Rows adopt TRUTH-TABLE §6 verdicts where they exist, cited not re-argued; new rows are marked.

| # | Contrivance | Where it lives | Evidence | Disposition candidate |
|---|---|---|---|---|
| WA-01 | **The 193-wave vnext registry** — a wave count that restates the problem (3/199 = 2% landed vs the 38% historical base rate) | `vnext/FORMATION.md` + `waves/{P-V,K-A,G-D,M-C}.md` | vnext-standing VN-01; ROOT-FINDINGS MT-F020 sizing law; 0/193 by its own statement | **PRUNE** — harvest the 15-row ABSORB set (VN-02/04/05/09/10/14/15/16/25 et al.); the 193-wave *shape* never re-enters |
| WA-02 | **193 gate commands naming `.vnext/proof-runner.mjs`** — a runner that does not exist (verified: `ls .vnext` → No such file) | every wave row in `vnext/waves/*` (`P-V.md:51` canonical) | vnext-standing D-4/VN-20; DISEASE-REGISTRY:25 "gate without a runner" | **PRUNE** — canonical FM; no gate command survives into Phase F unless its runner exists at authoring time |
| WA-03 | **81 `proof:` sites in the vnext tool surface** (44 files, 713,988 B) standing against the owner's 2026-06-02 ruling | `vnext/tools/**` | verified 81 this session; RX-01 composite law; DR-19 books the owner ruling owed | **PRUNE by default** — any individually-worthwhile validator survives only a named twice-critique, per the owner's own 07-16 clause; blanket adoption is forbidden, blanket deletion needs no ruling |
| WA-04 | **The vnext clean-pass seal** — 2/2 CLEAN bound to an epoch hashing 17 external files owned by three other programs, one in another repo; unrecoverable by construction | `vnext/FORMATION-CLEAN-PASSES.json` | vnext-standing D-1 (counterfactual probe: restoring CARRY-LEDGER does not recover the seal) | **PRUNE the credit, KEEP the receipt** — mark historically-sealed-epoch-void; the fail-closed machinery's honesty (oversize + invalid receipts rejected) is worth keeping as evidence |
| WA-05 | **Prose-only byte budgets, one already RED** (formation 1,750,375 > 1,750,000, enforced by nothing — `grep -rl '1750000' tools/` → nothing) | `vnext/README.md:188-189` | vnext-standing D-5, re-verified this session | **PRUNE** — a budget no mechanism reads is decoration; Phase F budgets are gate-backed or absent |
| WA-06 | **The V′ reformation tail W46–W56 as bundled wave files** — fresh "BUILD W##" rows for 8 disease riders that V-PRIME L1 itself names *"the forbidden re-booking"*; bundles against the standalone-wave law | `reformation/` tail wave files; DISEASE-REGISTRY W-row shapes | TRUTH-TABLE §6 row 2; N–W seat row 101 | **RE-AUTHOR-WITH-SUPERSESSION** — explicit owner supersession ruling + per-rider tombstones citing DR chains; every re-authored wave standalone |
| WA-07 | **DISEASE-REGISTRY wave cell W.W2 (parser)** — its shape ("fix grammar.ts:181, enable no-non-null-assertion") predates the TRIFOLD parser band; the "regex ~1.8× fastest" premise is refuted by three independent measurements | `registry/DISEASE-REGISTRY.md` W.W2 cell | TRUTH-TABLE §6 row 3(a); parser-band apotheosis (winner cand-O) | **RE-AUTHOR** on the parser band's apotheosis; the 4.0.1/4.1.0 cut carries ND-02's correcting letter to fourier in the same act |
| WA-08 | **DISEASE-REGISTRY wave cell W.W4 (boot)** — load-bearing numbers (LCP 4919/5141) predate v4, glass 7, and the alias death; *"nobody has measured this product"* | same, W.W4 cell | TRUTH-TABLE §6 row 3(b); DR-06/HB-01 | **RE-AUTHOR** — a re-measure at HEAD is the wave's first act, its numbers its born-RED baseline |
| WA-09 | **W.W# rows minted for a letter whose directory is occupied** — `docs/tranches/W/` holds audit output while DISEASE-REGISTRY writes W.W0..W.W8 | `registry/DISEASE-REGISTRY.md:197`; `docs/tranches/W/` | TRUTH-TABLE S-4; vnext-standing §5.3 (the Codex W also targeted this path) | **RE-AUTHOR** after the owner's letter-collision ruling — no wave identifier is minted into an occupied namespace |
| WA-10 | **Stale-canon strings riding live addenda** — "batches of three" (superseded 07-24 by the ≤4 cap) and "twice-challenged" (superseded by thrice/tri-fold) | any addendum/wave spec citing them; dead LOOP bodies | RX-14; glass2 C-3/C-6; EXHORTATION-CENSUS themes 4/9 | **CONSOLIDATE** — one mechanical pass updates every live citation; dead LOOP bodies stay dead (NO CRONS) |
| WA-11 | **Carry-ledger consumption without a grounding probe** — seven tranches of carried asks were "partly fiction" when K.W1 finally read the peer code | any Phase F spec inheriting `CARRY-LEDGER.md` §B/§C/§D rows | TRUTH-TABLE §6 row 8; fourier seat pattern 5 | **RE-AUTHOR rider on every consuming wave** — a carry row enters only through a live-tree probe, per row |
| WA-12 | **Gate-adding waves that retire nothing** — the apparatus is the owner's primary contrivance suspect (*"spend little time on contrived gates … the majority on direct code implementation and visual verification"*) | any Phase F wave spec | kf E-25..E-30; EXHORTATION-CENSUS theme 7; the 1→227→deleted-whole keyframes arc | **Standing constraint** (not a row to close): every wave adding a gate names the gate it retires; W.W1's suite must actually RUN — the falsifier demonstration was waived twice (DR-09) |
| WA-13 | **`snapshot-vnext/` + `snapshot-vnext-2/` duplicating a now-tracked tree** (187 + 165 files, 195 diff rows vs live) with `RUN-STATE.md:100-102` still ordering re-copies | `apotheosis/RUN-STATE.md`; the two snapshot dirs | vnext-standing O-6; M-15 committed vnext whole at `5c13465d` | **PRUNE** — the snapshots' reason (isolation from a live Codex producer) died with M-15; retire the RUN-STATE instruction in the same act |
| WA-14 | **Stale workflow LAW text "vnext Codex-owned READ-ONLY"** | `workflows/{excavation,component-apotheosis,trifold-parser}.js`; `AUDIT-PLAN.md:37` | SCOPE §M-15(4) rules it conservative-not-wrong | **CONSOLIDATE at next natural prompt change** — no cache-busting edit for its own sake |
| WA-15 | **`PROPORTION-AUDIT.md` numbers as fold input** — a 3.4×-undercounted census (34→102 adaptation sites) plus the retired armor corpus | `docs/tranches/V/PROPORTION-AUDIT.md`; V′ armor spec | design-canon census §4.3; RX-11 | **PRUNE-as-input** — Phase E re-measures; the doc survives only as a historical record |
| WA-16 | **`transition-inventory.md` named as standing authority by live CSS** while 23 days stale across a whole demo restructure | `docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md`, named at `demo/styles/animations.css:63-65` | design-canon census D-12/S-13 | **PRUNE on fold** — the re-authored DESIGN.md §Motion absorbs the mapping; the CSS comment re-points |
| WA-17 | **vnext waves with zero knowledge of the live R1 crash** — a formation promising born-RED-where-live whose 45-wave V band misses `parseCssColor("oklch()")` throwing (verified live at `grammar.ts:181` this session) | `vnext/PARSER-CSS-COLOR.md` + V band | vnext-standing D-3; grep re-run with corrected `-E` alternation this session, still 0 | **PRUNE** (already inside WA-01's harvest rule) — recorded separately because it is the cleanest proof the corpus cannot see the product |

---

## §2 · CONTRIVANCE IN THE LIBRARY GESTALT

RULED rows carried from DEFECT-LEDGER are one-line cites. NEW rows carry the shadcn-census evidence plus this seat's verification where run.

### 2.1 demo/ — the consumer surface

| # | Contrivance | Where | Evidence | Disposition candidate |
|---|---|---|---|---|
| L-D1 | `demo/ui/**` — 19 dirs × 1 re-export barrel, zero SFCs, pure naming layer | `demo/ui/` | RULED 7 ways (DEFECT-LEDGER :3003 et al.); census §1.1 | **PRUNE whole** (shadcn plan §3, group 1) |
| L-D2 | `cn()` + `clsx` + `tailwind-merge` — the last executable shadcn line, zero consumers, two devDeps alive for it | `demo/shared/utils.ts:1-6`; `package.json:99,:108` | census A-08; **re-verified 0 consumers this session** | **PRUNE** (group 2) |
| L-D3 | `components.json` — shadcn-vue CLI config pointing at three dead targets; `npx shadcn-vue add` would still resolve it | repo root | census A-09; **re-verified all three targets dead this session** | **PRUNE** (group 2) |
| L-D4 | `demo/ui/label/` + `demo/ui/switch/` — zero consumers even under a keep-the-barrels counterfactual | `demo/ui/{label,switch}/` | census A-02/A-03; **re-verified 0 this session** | **PRUNE** (inside L-D1) |
| L-D5 | **51 dead `variant=` attrs on Button** (glass-7 speaks `emphasis`×`tone`×`size`; producer d.ts has no `variant`) vs 5 total uses of the real vocabulary | 22 demo files | §0 R-1 (this seat's corrected count, agreeing with AdminUsersPanel + DEFECT-LEDGER :4940) | **CONSOLIDATE** into glass-7 vocabulary (group 3); Badge/WatercolorDot/SelectTrigger/Skeleton untouched — valid producer props |
| L-D6 | 74 per-instance class overrides on producer primitives; one 6-utility pane-shell string recurs identically ×3 | `GradientPane.vue:20` = `MixPane.vue:62` = `GeneratePane.vue:31` + 71 others | census A-07 | **CONSOLIDATE**: the recurring string → a producer `Card` tier/variant ASK (rides the §4 relay amendment); genuine one-offs KEEP |
| L-D7 | 4 direct `reka-ui` type reaches (`AcceptableValue`) bypassing glass — the last structural trace of the pre-glass primitive layer | `GradientVisualizer.vue:28` · `MixConfigBar.vue:15` · `GenerateControls.vue:33` · `AuroraPane.vue:25` | census A-12 | **CONSOLIDATE-INTO-glass**: producer `./select` re-exports its own accepted value type (a §4 ask); demo never names the headless library |
| L-D8 | Inert ESLint boundary rules scoped to trees deleted at `a61094e3` | `eslint.config.js:235-238,:275-276` | RULED (:921/:13378); census A-11 | **PRUNE dead globs / RE-SCOPE** live intent to `demo/palettes/**` |
| L-G1 | **`vite-defer-glass-fonts` stale guard** — transform never fires; dev serves fallback Jakarta/Fira (display Fraunces unaffected — §0 R-3) | `plugins/vite-defer-glass-fonts.ts:72` | census C-01 + this seat's severity correction | **PRUNE the guard** — gate on `code.includes(MARKER)` alone (cannot rot). Cheap, high-value: restores true body/mono type to every dev capture |
| L-D9 | Four single-tenant `composables/` dirs (a colocation idiom applied where nothing co-locates) | `mix/composables/` · `generate/composables/` · `browser/dialog/composables/` · `SpectrumCanvas/composables/` | census C-02 | **CONSOLIDATE** into parents; KEEP `scenes/blob/`, `palettes/admin/`, `platform/storage/` (route/layer homes) |
| L-D10 | The palette-browser dead seams — a 46-line zero-importer "TOP-LEVEL SEAM" + a `status/` barrel documented-as-bypassed by its own header | `demo/palettes/browser/index.ts` · `browser/status/index.ts:3-4` | RULED :5922; census C-03/C-04 | **PRUNE both** — `CurrentPaletteEditor.vue:193`'s direct import already works |
| L-D11 | 68 zero-consumer demo exports (12 runtime) + the ~40-strong exported `*Deps`/`*Return`/`*Options` idiom — public promises no caller redeems | census C-05/C-06 enumeration | **7 of the 12 runtime rows re-verified defining-file-only this session** | **PRUNE** the 8 unruled runtime exports (respect C-11's `createApiClient` reservation — sequence after the `main.ts` cure); **CONSOLIDATE** the interface idiom by de-exporting in one mechanical pass |
| L-D12 | Two test roots split not by subject (10 of `test/`'s 21 files import `../demo/`) | `test/` + `demo/test/` | RULED :15070/:15077/:15082 | **CONSOLIDATE** — carried |
| L-D13 | `PaneSegmentedControl.vue` — a wrapper over producer `SegmentedTabs` whose "root" is itself | `demo/shell/PaneSegmentedControl.vue` | RULED (12 ledger hits); census C-09 | **CONSOLIDATE-INTO-glass** — carried |
| L-D14 | `demo/shared/utils.ts` as a two-concept grab-bag off the ratified `shared/` schema; missing `shared/content/` | `demo/shared/utils.ts`; `ARCHITECTURE.md:31-33` | census C-07; debounce rows RULED 4 ways | **CONSOLIDATE** after L-D2 — one function remains; home it where the ruled debounce rows land |

### 2.2 src/ — the published library (materially healthier; the rows are few and sharp)

| # | Contrivance | Where | Evidence | Disposition candidate |
|---|---|---|---|---|
| L-S1 | **`src/transform/decompose.ts`** — 609 lines, 6 runtime exports, 100% tested, **zero consumers** outside its own tests (keyframes' `/transform` reaches are `PathGeometry`/`getTotalLength` only) | `src/transform/decompose.ts` | census L-02; **consumer-zero re-verified this session** | **OWNER RULING owed** (M-10 forbids deferral): RETIRE-with-rationale at the 4.1.0 cut, or KEEP as a declared standalone product surface. No third option |
| L-S2 | `dominantColor()` — published, zero call sites, and its only mention in the constellation calls it *"the wrong tool"* (`useExtractSession.ts:10`) | `src/subpaths/quantize.ts` | census L-03 (which also corrected DEFECT-LEDGER :11131's mis-citation); re-verified | **PRUNE** at the 4.1.0 cut, named in the MIGRATION table (HB-06's lesson: nothing vanishes unnamed again) |
| L-S3 | `parseCssValue`/`parseCssValues` — two entry points one character apart; singular has zero consumers | `src/css/index.ts` + `src/subpaths/css.ts` | census L-04; re-verified | **CONSOLIDATE** behind the plural |
| L-S4 | Two mutually-unaware cubic-Bézier evaluators (De Casteljau family in `foundation/math.ts:86-105` vs closed-form + bisection in `easing.ts:70-127`), no test asserting agreement | both files | census L-05; **`easing.ts` imports re-verified: `foundation/result` only** | **CONSOLIDATE** to one Bézier core; the De Casteljau trio (0 consumers outside test) is the presumptive redundant half |
| L-S5 | The hand-copied 52-name double barrel — `src/css/index.ts` exists solely to be re-typed into `src/subpaths/css.ts` (its only importer, re-verified `:35,:56`) | both barrels | census L-06 | **CONSOLIDATE** to one barrel — a drift generator with no reader |
| L-S6 | `ColorFactory` dead re-export | `src/color/index.ts:7` | census L-07 | **PRUNE the line** — type stays in `model.ts` where it is used |
| L-S7 | `foundation/` misnomer — `math.ts` has ONE internal importer (`subpaths/math.ts`, re-verified) while being the constellation's 2nd-most-consumed subpath; `path.ts:523` hand-rolls its own clamp | `src/foundation/math.ts` | census L-09 | **CONSOLIDATE-lite**: re-home under a leaf-honest name at the next breaking cut; fold the inline clamp. NOT dead weight — 35 keyframes imports |
| L-S8 | `/quantize` surface wider than its one real engine | `src/subpaths/quantize.ts` | census L-08 | **KEEP, trimmed** to `quantizePixels` + `QuantizeOptions` + `QuantizedColor` (L-S2 removes the rest) |
| L-S9 | 18 zero-consumer published type exports (the 5 whose parents are also unconsumed: `Mat4`, `DecomposedMatrix3D`, `PathSample`, `QuantizeIssue`, `EasingIssue`) | `src/subpaths/*` | census L-01, with its own honest limit (types can be structurally load-bearing) | **PRUNE the 5 riding L-S1/L-S2's exits**; KEEP the rest with reason |

### 2.3 Negative rows — recorded so no Phase F wave files a false positive

- **A-10**: the shadcn-*named* tokens (`--foreground` &c.) are the PRODUCER's contract; the 3 demo re-points are deliberate accent plumbing. KEEP.
- **C-10**: `demo/scenes/about/katex/index.ts` is alive — 11 markdown consumers outside every source tree. KEEP.
- **L-10**: the bare-specifier hazard is LATENT (all 15 apparent reaches are prose; ruled at :18178). Carried.
- **L-12**: `src/value.ts` is small, not contrived — 18 external keyframes imports, 3 load-bearing consumers of `isLoopbackHost`-class utilities. KEEP.
- **C-11**: `createApiClient`/`API_CLIENT_KEY` are dead-but-RESERVED by the ruled `main.ts` cure (DEFECT-LEDGER :50). Sequence, do not prune blind.

---

## §3 · THE SHADCN-ABROGATION PLAN SKELETON (M-14.3: components AND style)

**Standing fact first** (census §1.1, re-verified): the component half is DISCHARGED — `find demo/ui -name "*.vue"` → 0; not one shadcn-vue SFC survives. What remains is a naming layer, a tooling layer, and a vocabulary residue. The cure is a codemod plus deletions with **zero runtime delta**, not a component migration. Grouping, order, and target primitive:

**Group 1 — the naming layer → the glass root barrel.**
Delete `demo/ui/` whole (19 barrels, 20 export lines). Codemod the 90 import statements in 48 files: `from "(../)+ui/<x>"` → `from "@mkbabb/glass-ui"` (17 components via the root barrel; `input` via `@mkbabb/glass-ui/forms`, its extant subpath). The `alert` barrel's 9-line survival comment is the layer's tombstone — carry its text into the wave record, then delete.
*Acceptance (born-RED today):* `test -d demo/ui` fails; `grep -rE 'from "(\.\./)+ui/'` demo → 0; vue-tsc + build green.

**Group 2 — the tooling layer → deletion.**
`rm components.json` (the formal act that makes "abrogated" true at the tooling layer); delete `cn()` from `demo/shared/utils.ts`; drop `clsx@^2.1.1` + `tailwind-merge@^3.6.0` from devDependencies. Then L-D14: `shared/utils.ts` is one `debounce` — home it per its ruled rows.
*Acceptance:* `grep -rn "clsx\|tailwind-merge\|components.json"` (excl. lockfile history) → 0.

**Group 3 — the vocabulary layer → glass-7 `emphasis`×`tone`×`size` on Button.**
Codemod the **51 sites / 22 files** (§0 R-1): shadcn `variant="ghost|outline|secondary|destructive|…"` → the producer's real axes (mapping table authored against `Button.vue.d.ts`; the 5 existing `emphasis=`/`tone=` uses are the house reference). Badge (7, `variant` valid), WatercolorDot (8, valid), SelectTrigger (1, valid), Skeleton (bound, valid) are excluded by receiver.
*Acceptance:* the multiline probe from §0 R-1 → 0 Button tags carrying `variant=`.
*Producer rider (rides §4's amendment letter, never a local shim):* U-1/U-5 — Button `inheritAttrs:false` + closed `ButtonProps` + dev-assert, so this class of silent DOM leak becomes unrepresentable. Two seats derived it independently; the demo codemod does not wait on it.

**Group 4 — the call-site style residue → producer variants where recurrence proves the need.**
The ×3-identical pane-shell utility string (L-D6) → ONE producer `Card` arm ask (rides the §4 letter). The other ~71 overrides are walked once: recurring → ask; one-off → KEEP as local truth.

**Group 5 — the structural traces → producer type/variant surface.**
reka-ui `AcceptableValue` ×4 (L-D7) → glass `./select` re-exports its accepted value type (ask). `PaneSegmentedControl` (L-D13) → the producer compact variant already ruled 12 ways. Both are relay items — see §4.

**Sequencing:** groups 1+2 are one wave (pure deletion/codemod, no producer dependency); group 3 is its sibling wave (same shape, needs the mapping table); groups 4+5 produce ASKS that ride the §4 amendment letter NOW and land as demo changes only when the producer ships — never as local patches (masking-fallback ban), never as wave gates naming a peer actor (EXHORTATION-CENSUS theme 26).

---

## §4 · GLASS-FORWARD COMPLIANCE VERDICT (M-14 clause 1)

**VERDICT: NOT MET — 11 UNRELAYED arms, adopted from seat E whole and re-verified this session** (§0: every identifying term still 0 across all six letters; the letter enumeration is complete; no seventh letter exists after O-16 13:27). The delivered surface is real — 26 arms across five packets — and the debt is concentrated in four adjudications (AdminUsersPanel, GenerateControls, GradientStopEditor, Markdown) all closed BEFORE O-16 went out (mtimes 11:38–12:18 vs 13:27), so no arm is excused as not-yet-ruled.

**The debt list, verbatim from seat E (`extracts/glass-forward-compliance.md` §2):**

- **U-1** · Button `inheritAttrs:false` + explicit prop allowlist — GLASS-OWNED rider, never sent (`AdminUsersPanel.md:63,:95,:116,:122`; `inheritAttrs` 0/6 letters)
- **U-2** · ConfirmDialog preset over the Glass 7 Dialog family — GLASS-OWNED rider, never sent (`AdminUsersPanel.md:78`; a safety row — two admin panels delete without confirmation)
- **U-3** · Button `xs` height token for the dock-adjacent admin toolbar — GLASS-OWNED rider, never sent (`AdminUsersPanel.md:87`; 22 hand-set `h-7` sites / 11 files)
- **U-4** · G-2 first-class track-stops affordance — GLASS RELAY declared, never sent (`GenerateControls.md:204,:328`)
- **U-5** · G-3 ButtonProps closed to unknown attrs + dev-assert + axis-naming reconciliation — declared, never sent (`GenerateControls.md:328-329`; the second independent derivation of U-1's class)
- **U-6** · the 6-site dead-`tag` consumer census as v8 migration input — declared, never sent (`GenerateControls.md:32,:329`)
- **U-7** · row 13 DARK-CHROMA producer dark-arm `--card` token origin — declared, never sent (`GenerateControls.md:128-129`)
- **U-8** · L-13/D-14 producer `variant="rail"` / SliderThumb slot for the multi-thumb rail species — GLASS-ROUTED, never sent (`GradientStopEditor.md:46,:61,:107,:122` — that file's ENTIRE glass-forward surface)
- **U-9** · Markdown L-8's Skeleton `var(--muted)` fill + shimmer/surface variant — relay declared twice, never sent (`Markdown.md:44,:65`)
- **U-10** · ColorPicker D-10 partial: O-16 §C-2 carried the 12×24 accusation but dropped the exonerating track-target counter-measurement (339.4×24; aria-valuenow 0.5→0.048) and PR-12's TIGHTEN grab-seat (`ColorPicker.md:151`)
- **U-11** · ConfigSliderPane B-3 partial: O-16 §C-1 carried the `valuetext` limb and dropped the ConfiguratorRow `aria-labelledby`/label-id exposure — the sixth item of that letter's own manifest (`ConfigSliderPane.md:139,:141,:52`)

**Discharge (Phase F, first outbound act):** ONE amendment letter to BJ — U-1..U-9 as new asks, U-10/U-11 as amendments to O-16 §C-2/§C-1, O-10a-style (no ask withdrawn, no packet re-sent). **Structural cure, adopted from the census's root-cause:** *no value.js gate goes RED when a relay does not leave* — so (a) an adjudication declaring a GLASS-OWNED/RELAY arm may not CLOSE until a packet file exists under the producer's inbox path containing the arm's identifying term (grep-able, L-2-conformant); (b) *relay-declared-never-sent* enters DISEASE-REGISTRY as a mechanism family (EXHORTATION-CENSUS theme 14's escalation, corroborated: the same mechanism carried A's 7 asks for 7 tranches and fourier's ADOPTION-ASKS through 4 re-triggers). Nothing in the debt blocks glass 8.0.0; everything in it rots if 8.0.0 ships first.

---

## §5 · FEED-FORWARD TO PHASE F

- §1's addenda rows are pre-conditions: WA-09 (letter collision) and WA-06 (supersession ruling) precede any wave minting; WA-01..05/13/17 are prunes executable inside the vnext fold act; WA-07/08 rewrite two registry cells before their waves author.
- §2+§3 compose into three library/demo waves (naming+tooling · vocabulary · seam-and-dead-export sweep) plus one owner-ruling docket (L-S1 decompose; the RX-01 critique for any vnext validator anyone wants to keep).
- §4 is one letter and one gate-law change, both executable before any wave.
- Dispositions tally: **PRUNE 17 · CONSOLIDATE 13 · RE-AUTHOR 5 · owner-ruling 2 · standing constraints 2 · negative/KEEP rows 5.**
- The companion deliverable `DESIGN-CANON-BRIEF.md` (this pass, same session) carries the design-canon standing and the Phase E tri-fold brief; its corrected G-PRM baseline (§0 R-2 here) binds any motion gate Phase E mints.

*Every row above carries a quote + file/line, a command + output from this session, or a named RULED cite. No memory recall is used as evidence anywhere in this document.*
