# SYNTHESIS-v2 — Tranche R specification (Pass 2, complete + self-contained)

**Synthesizer**: Fable (pass-2 synthesis mandate, seed 8) · **Date**: 2026-07-02 · **Branch**: `tranche-q` @ `e80b359` (value.js 1.2.0)
**AMENDED AT PASS 3** (2026-07-02, lane L1-spec-v3): the `extractFunctions` "absent from source" side-finding is REFUTED (M1 — it is in source since 1.1.0 `23d1a91`); the pass-2 worktree staleness is recorded honestly (M2); the CONSTELLATION.md-pointer ownership is corrected to a fourier-tree write booked to FN-7 (M4); the three §C should-fixes are folded (GAP-3 specifiers, §8.6 peer-floor, residual-risk-2). Every amended claim re-verified against the live `tranche-q` @ `e80b359` tree.
**Supersedes**: `docs/tranches/R/audit/pass1/SYNTHESIS.md` in full. This document is self-contained — a reader needs no pass-1 document; where pass-1 evidence is load-bearing it is cited, not assumed.
**Inputs**: `PASS1-VERDICT.md` (§5 mustFix + §6 dissents, all discharged in §11 below) + the 8 pass-2 burn-down lane reports:

| Lane (seed) | Report path |
|---|---|
| gamut-bound (1) | `.claude/worktrees/wf_d9a4e4d9-899-1/docs/tranches/R/audit/pass2/gamut-bound.md` |
| boot-blast-radius (2) | `.claude/worktrees/wf_d9a4e4d9-899-2/docs/tranches/R/audit/pass2/boot-blast-radius.md` |
| kf1-grammar (3) | `.claude/worktrees/wf_d9a4e4d9-899-3/docs/tranches/R/audit/pass2/kf1-grammar.md` |
| overlay-amendment (4) | `docs/tranches/R/audit/pass2/overlay-amendment.md` |
| boundary-api (5) | `docs/tranches/R/audit/pass2/boundary-api.md` |
| easing-disposition (6) | `docs/tranches/R/audit/pass2/easing-disposition.md` |
| dispatch-homes (7+9) | `docs/tranches/R/audit/pass2/dispatch-homes.md` |
| w0-truth (10) | `docs/tranches/R/audit/pass2/w0-truth.md` |

> **Report-hoisting note (R.W0 item W0-14).** Three impl-lane reports live inside their isolated worktrees (read-only main-tree discipline). Worktrees are ephemeral: R.W0 must hoist `gamut-bound.md`, `boot-blast-radius.md`, `kf1-grammar.md` into `docs/tranches/R/audit/pass2/` before any worktree cleanup, and preserve the kf1-grammar worktree diff (4 files, +141/−30 — the working KF-1 fix) and the boot-blast cured config (`scratchpad/vite.config.cured.ts`) as R.W1/R.W2 implementation seeds.

---

## §0 — The verdict, and what Pass 2 changed

O/P/Q perfected the library and left everything else where N-death dropped it. The ratified N.W10–W18 demo block is three weeks dead and its central premise — *interim now, consume at the BA 4.0.0 pin* — died twice: value.js floats on `file:../glass-ui` at 4.2.0 (no pin to discharge), and the producer fixes the interims were waiting for already shipped. R's structural answer, unchanged from pass 1: **7 waves, functional-truth before design, treatments as specs, every cross-repo wait a BOOK with a named trigger, and the close wave gates on nothing outside this repo.**

Pass 2 was burn-down, not re-derivation — and the burn-down **moved four answers**:

1. **The R.W1 head is no longer an auto-ratify.** The α=1.0 gamut cure's worst-case non-light ΔL measured **0.083** (`oklch(0.30 0.40 210°)`), missing the critic's `<0.05` gate — refuting the pass-1 dissent's ≈0.03 estimate. The α-tune family still wins outright (MINDE and gamut-relative stay rejected on the extended 164-color corpus; hue held 0.000° mean AND max); the decision is now a **two-option Q7 owner call**, fully costed: α=1.0 (recommended — oracle-vivid pink, tiered bound) vs α=0.35 (gate-strict, under-cured pink). (gamut-bound §2/§7.)
2. **KF-1 is a grammar BUG + a rename, and the fix is already prototyped green** (1877/1877 vitest [stale-base count at `15b0382`/1.0.2 — the kf1-grammar worktree's base; the head-measured count is L2's M3 re-run, which the byte-identical carry (M2, §13) guarantees applies cleanly], tsc exit 0, 7 adversarial vectors). Q5 collapses to a defect fix — the "record `{type,defaultValue}` as canonical" fallback is **struck** (it would canonize a spec-violating parse). Q6 is answered: **bundle into one 2.0.0**. ~~A load-bearing side-finding: `extractFunctions` — kf's consumed symbol — exists only in the shipped dist, absent from source; a fresh build would drop it.~~ **REFUTED at pass 3 (M1):** the kf1-grammar "absent from source" finding was a **stale-worktree artifact** — that worktree sat at `15b0382` (1.0.2), *before* the walker landed. `extractFunctions` **is in source since 1.1.0** (`23d1a91`): `src/parsing/extract.ts:124` (`export const extractFunctions`), re-exported at `src/index.ts:291` + `src/subpaths/parsing.ts:47`; a fresh build **keeps** it. What survives is a trivial fresh-build `.d.ts` regression assertion, not a restore. (kf1-grammar §5–§8, its §6/§8.3 struck; CRIT-SPEC-V2 §A ≡ CRIT-kf1 D1.)
3. **The easing "13-of-24 drop" premise was factually wrong: zero names drop.** `EasingPicker`'s preset catalogue IS value.js's own `bezierPresets` (23 of the 24 gradient names, verbatim); the 24th (`smooth-step-3`) is *exactly* `cubic-bezier(⅓, 0, ⅔, 1)` — a 1-line preset row. The residual is a quantified numeric substitution (15/24 functions, analytic → canonical bezier) that an optional preset-table tightening drives sub-JND. Disposition A (author-a-curve consume), no relay ask, no interim. (easing-disposition §0–§2.)
4. **The boot cure is proven across all four vite modes and is dev-config-only** (production dist byte-identical, 71 files) — and exercising all modes **unmasked a second, independent P0**: glass-ui 4.2.0 deleted the compound `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`; `demo/@/components/ui/tabs/index.ts:1` dead-imports them, so **gh-pages and hero-lab cannot build** until the demo migrates to `SegmentedTabs`. New R.W2 item. (boot-blast-radius §2–§4.)

Two dispositions settled without changing shape: the **Q9 twin-tie homes** (fixture lands in-tree in value.js as inline `diff.test.ts` rows, read locally — zero cross-repo reads verified; contract doc stays put; the CONSTELLATION.md pointer is a fourier-tree write booked to FN-7 alongside the relocation, M4; value.js's in-tree deliverable is a contract-of-record note) and the **D8-1 cascade cure dispatch** (to the live glass-ui BG agent **now**, not at R.W7 — the R.W2 no-shim gate splits internal/external accordingly). And one R.W0 premise flipped: the `@mkbabb/keyframes.js` devDep is **NOT a phantom** — it is the demo graph's provision of glass-ui's `keyframes.js ^5.0.0` peerDependency, and keyframes is a live transitive consumer of value.js's `/math` subpath. **KEEP.** (w0-truth §a.)

---

## §1 — The N.W10–W18 challenge, wave by wave (self-contained)

Legend: **PRUNE** (landed or premise dead) · **REWRITE** (premise died; re-derived content survives) · **FOLD** (content survives, absorbed into an R wave) · **BOOK** (survives as a triggered event, not R work).

| N wave | Verdict | Disposition |
|---|---|---|
| **N.W10** functional truth (U9 reset · U11 cascade root · save-P0 · kC placebo · dual-mount blob · aurora motion U33) | **FOLD → R.W2** | The only part of the block that is *bugs*, not design; behavior outranks polish. Adds the N-era unknowns: the demo does not boot cold-cache (root: the `vite.config.ts` self-alias prefix-rewrite mangling `@mkbabb/value.js/math` — NOT a stale keyframes dist, that diagnosis was refuted), and the Tabs drift (§0.4). |
| **N.W11 / W11′ / W11.D** color-SOTA · scroll grammar · sampleColorRamp | **PRUNE (landed 0.13.0)** — except the gamut-POLICY lane, which never shipped (`gamut.ts:242` α=0.05 byte-unchanged; O.W6 scoped it out) | Policy lane **FOLD → R.W1** as the library head (U10), now a costed Q7 decision (§4 R.W1). |
| **N.W12** grand hierarchy (font root · accent axis · dark ladder · container-query layout · depth grammar · φ ramp) | **FOLD → R.W3 (superseded as prose)** | `docs/frontend-design/color-picker.md` — as amended by the pass-2 overlay packet — *is* the spec; it carries everything N.W12 asked plus design mass N never authored. The N.W12 file demotes to a residual checklist. |
| **N.W13** controls (spectrum slider · interims · dropdown · a11y) | **REWRITE → pure-consume + design (R.W3)** | The `[data-*]`-interim spine is void: every producer fix landed at glass-ui 4.0.0–4.2.0. Pure-consume proven end-to-end by prototype at 90% (zero interims; ComponentSliders lands ≤400 LoC by construction). |
| **N.W14** cards + skeletons + empty states | **FOLD → R.W4** | Producer halves landed (Skeleton `surface="glass"`, WatercolorDot ghost); residual = depth grammar, `--card-edge` hairlines, shimmer bones, empty-state CTAs. |
| **N.W15** perf (idle floor · zombie canvas · PRM · dock morph) | **REWRITE — split** | value.js halves (X6 dual-mount WebGL, mix-RAF PRM hole) → **R.W2**. Producer halves (blob single-canvas + PRM gate) → relay GAP-4 + verify at the 5.0.0 adopt event. Dock-morph gate re-anchors on the BG dock-fission surface — **BOOK**. |
| **N.W16** per-pane (picker hero · docs φ · easing motif · extract dedup · router 4→5) | **SPLIT** | Picker hero → **R.W3**. Docs φ + easing hierarchy + extract dedup (T19/T20/T21) → **R.W4**. Router 4→5 → **BOOK** on stable vue-router 5. |
| **N.W17** shell + motion (dock scale · 12→3 families · view-select moment · per-view accent) | **FOLD → R.W4** | Picker-adjacent beats live in R.W3 via the treatment; the shell-wide collapse is R.W4. |
| **N.W18** consume-at-pin (re-pin BA 4.0.0 · abrogation sweep · interim death · easing consume) | **PRUNE the frame; REWRITE the residue** | Premise dead twice (§0). `/easing` consume → **R.W4** (just work now); the interim-death sweep is empty (interims never authored); the pin question is a policy decision (§4.4) + a booked 5.0.0 adopt event. |
| **N.W8′** hygiene + master-merge + wire-deploy + doc-truth | **REWRITE → R.W0 + R.W7** | Sweep list re-derived against today's tree (w0-truth §c is the authoritative inventory). Master-merge debt is 3 commits; the tag gap is **10** published-but-untagged versions (0.11.2 → 1.0.2, all publish commits pinned). Wire-deploy → R.W7. |
| **N.W9′** v1.0.0 close | **PRUNE the version event (O.W6 shipped it); FOLD the hygiene tail** | N/FINAL.md + pin-policy record → R.W0/R.W7. The "phantom `@mkbabb/keyframes.js` devDep" premise is **REFUTED** — the devDep is KEPT (§4 R.W0, W0-8). |

---

## §2 — Design POV (the aesthetic stance and the treatments' standing)

**The register is settled and it is good: the editorial instrument.** A color-science atlas plate reissued by a magazine art department — Fraunces as the atlas voice, Fira Code as the readout, the cartoon-offset shadow as the editorial swagger, the crayon primaries kept and *proportioned*, ink + grain + a perceptually-true field. The demo's thesis — *perceptual color truth made visible* — is exactly what the library uniquely enables (it alone computes gamut boundaries cheaply per frame), so the design signature and the engine's identity are the same thing.

### 2.1 `docs/frontend-design/color-picker.md` → **ADOPT as the R.W3 spec, as amended by the pass-2 overlay packet.**
The treatment (untracked, 25 KB) is grounded, verdict-reconciled (square KEPT with perception as overlay; crayons KEPT and proportioned), and strictly richer than the N.W12/13/16 prose it folds. The pass-2 packet (`overlay-amendment.md` §5, passages P1–P10, directly mergeable) corrects its geometry against prototype evidence, register unchanged:

- The literal "sRGB boundary over the sRGB-native square" was **vacuous** (the HSV square is a bijection of the sRGB cube); the honest instrument strokes where a **wide target** exceeds sRGB by more than the engine's JND (`gamut.ts:55`) — the ΔE>JND locus, not raw membership.
- The `sRGB ⊣` snap-resist beat survives **re-specified as a threshold detent at the JND contour** with a target-named label (`p3 ⊣`): dot + model hold ~6px then release; a detent, never a wall; no contour ⇒ no detent; PRM honored on the label animation. The treatment's only tactile beat is kept, its physics corrected.
- The breathing narrative now matches measurement: **red and magenta flood** (74.7% / 82.7% of the top edge visibly clips at display-p3), yellow corner-balloons (21.9%), **blue clears the plate** (0.0% — absence is content, captioned in-instrument: `p3 Δ < JND — plate clear`).
- Render path settled by prototype: **2D canvas** (only path supporting luma-adaptive dual-ink; clip-path as no-canvas fallback; WebGL rejected). Four tokens (`--gamut-edge`/`--gamut-hatch` + `-paper` pair) in `style.css :root`; ink regime flips at luma **0.5 via the shared `spectrumDotStyle` helper** (`SpectrumCanvas.vue:231-233`) — share the function, never copy the constant.
- **The lens** (which wide target the overlay strokes): the packet's position is **display-p3 instrument default with a keyed override** (lens follows `selectedColorSpace` only when it is wide-RGB; caption always names the lens: `GAMUT LENS — DISPLAY-P3 / SRGB`). The alternative (`selectedColorSpace`-keyed only) renders nothing in the actual default state (`DEFAULT_COLOR_SPACE = "oklch"` — unbounded, outside the overlay's v1 scope) — the one unforgettable thing would be an easter egg. Tabled as **Q11**; adopting keyed-only requires overruling the packet on the record.
- Perf proven: ≈0.3 ms/frame total unthrottled, ~7× inside the <2 ms budget; zero dropped frames at 120 Hz; holds under 4× CPU throttle.

### 2.2 `docs/frontend-design/hero-lab.md` → **AMEND + ADOPT; second priority, slippable.**
Extant (32 KB, untracked), genuinely below-bar (no font `<link>` — ships Times/Courier; sRGB grey-on-grey wash on a perceptual-color library's showcase). The one real amend, binding: **the picker owns the gamut BOUNDARY; hero-lab owns the interpolation PATH** (sRGB grey-death vs the oklch arc, the flip-toggle where you watch the grey die). Complementary halves of one thesis; two pages must not both claim the perceptual-truth reveal. R.W5 carries it, explicitly slippable to S.

### 2.3 O.W7 (Parse-Lab + gamut-truth) → **FUSE, don't bolt on.**
One `gamutMapOKLab`/JND computation feeds the square overlay (output side) and the ColorInput gamut-verdict echo (parse side). The echo needs **zero new exports** — `deltaEOK`/`gamutMapOKLab`/`DELTA_E_OK_JND` are public since O.W2 (`src/subpaths/color.ts:120-134`); the drawn contour and the typed verdict can never disagree about what "visible clipping" means. Parse-Lab lands as an enrichment of `ColorInput`/`useColorParsing`; a detached teaching pane is contrivance until arbitrary-`parseCSSValue` teaching demand is demonstrated (Q10).

### 2.4 What R rejects (recorded so they stay dead)
- Re-authoring fresh design prose for surfaces the treatments cover.
- Shipping any `[data-*]` glass-ui interim (producer fixes landed; interims now = manufacturing legacy).
- The bare OKLCH-plane square replacement and the crayon-kill (reversed inside the treatments).
- A detached Parse-Lab god-pane.
- An L-asymmetric gamut α (branch in the Ottosson-canonical formula — KISS violation; gamut-bound §7).
- A glass-ui preset-seeding prop for easings (asks for what already exists — the picker's catalogue IS `bezierPresets`; easing-disposition §2.1).

---

## §3 — The Tranche R wave DAG

### R.W0 — SUBSTRATE (hygiene + truth; mechanical, one session)

The authoritative inventory is w0-truth §c; every item re-verified against the live tree 2026-07-02.

| # | Item | Disposition |
|---|---|---|
| W0-1 | `docs/frontend-design/` (untracked; color-picker.md 25 KB, hero-lab.md 32 KB) | **COMMIT both**, then **apply the overlay-amendment packet P1–P10** to color-picker.md as a second commit — the merged treatment is the R.W3 spec |
| W0-2 | `.w6a-audit{,2..5}.mjs` (5 probe scripts) | **DISCARD**; the SHIM-oracle knowledge survives in the R.W2/R.W3 gate wording, never as tracked source |
| W0-3 | `mix-1440-snapshot.md`, `shot3-dataurl.txt`, `suffuse-dataurl.txt` | **DISCARD** (findings canonized in LEDGER) |
| W0-4 | `$OUT` (66 KB botched redirect) | **DISCARD** (superseded; lives on the grand-audit branch) |
| W0-5 | `.gitignore` probe-scratch class | **MINT** (`.w6a-audit*.mjs`, `*-dataurl.txt`, `$OUT`, `mix-*-snapshot.md`); `*.png` already covers the w6 shots corpus |
| W0-6 | `CONTRIBUTING.md` / `VENDOR-POLICY.md` (**unstaged** worktree deletions — not "staged" as pass-1 wrote) | **`git rm` + COMMIT** — the 2026-06-02 proof-purge tail |
| W0-7 | `docs/precepts` submodule (` m`; 2 uncommitted edits inside) | **RESOLVE INSIDE the submodule** (commit or revert; bump gitlink if committed) |
| W0-8 | `@mkbabb/keyframes.js` devDep | **KEEP + RECORD** (refutes N.W9′ "phantom"): glass-ui peer-requires `keyframes.js ^5.0.0`; the demo consumes glass-ui `/dock`(×16)/`/motion`/`/aurora`/`/goo-blob` whose dist imports keyframes; keyframes' dist imports `@mkbabb/value.js/math` (`clamp`/`lerpArray`/`scale`). Record under the §4.4 pin policy; add the RELEASE.md `/math` load-bearing-leaf line (KF-4) |
| W0-9 | Retro-tags | **ANNOTATED tags ×10** at the exact publish commits: 0.11.2 `0cb5dd2` · 0.12.0 `3f4f0ed` · 0.13.0 `9fce504` · 0.13.1 `650a8cd` · 0.14.0 `9ae9df0` · 0.15.0 `1670c90` · 0.16.0 `0b0d9ee` · 1.0.0 `dd9beb5` · 1.0.1 `f1d9bab` · 1.0.2 `15b0382`. Gate scoped to **tags == registry for ≥ v0.6.0**; pre-modernization carve-out (11 registry versions 0.1.0–0.5.1 under the single `pre-modernization` tag) recorded |
| W0-10 | Master-merge | **MERGE `tranche-q` → master** (3 commits: `23d1a91`/`fd3c7ce`/`e80b359`); heals the skew where the already-minted v1.1.0/v1.1.1/v1.2.0 tags point at unmerged commits |
| W0-11 | P/Q/N close records | **AUTHOR** lean `P/FINAL.md`, `Q/FINAL.md`, `N/FINAL.md` (fold-forward pointer to R). The `docs/tranches/{P,Q}` dirs **do not exist** (not "empty") |
| W0-12 | Doc-truth pass | **AMEND** CLAUDE.md (Deps §: parse-that `^0.7.0` → `^0.13.0`, and record the §4.4 pin policy) + RELEASE.md `/math` line |
| W0-13 | w6 shots corpus (80 PNGs, `*.png`-gitignored) | **NO ACTION** — salvageable N-era visual baseline, already ignored |
| W0-14 | Pass-2 worktree evidence | **HOIST** the 3 worktree lane reports into `docs/tranches/R/audit/pass2/`; preserve the kf1-grammar diff + cured vite config as implementation seeds (header note above) |

**Gate (composite)**: clean `git status`; `master` carries 1.2.0; `git tag` == registry (≥ v0.6.0); P/Q/N records exist; treatments committed + amended; keyframes devDep kept + recorded; docs spot-check true; pass-2 evidence hoisted.

### R.W1 — GAMUT + PERCEPTUAL (library; the U10 head; the 2.0.0 cut)

Ordered — the sequencing is load-bearing (the α change moves the JND locus; boundary goldens must be generated after it):

1. **U10 gamut-policy (Q7 decision, then one constant).** The α-tune family won on the extended 164-color corpus: hue held 0.000° mean AND max; MINDE §13.2 rejected (34.7° max hue drift + ≈6.5× cost — survives as *test oracle* only); gamut-relative rejected (c1 const-L clip = 27% retention, worse than the 34% defect; c2 byte-identical to full-cusp, ΔL max 0.405). Two ratifiable settings (gamut-bound §7):
   - **α=1.0 (recommended)**: pink `lab(92% 88.8 20)` → `rgb(255,167,180)` (39% retention — the oracle's "land between" the pale current and the hue-broken browser); worst-case ΔL **0.050** at realistic chroma (C≤0.32), **0.083** at authored super-gamut chroma (C≥0.37 dark-L — above any real gamut's cusp); always 4.9× under full-cusp's collateral. Cost ≈1.0× (free).
   - **α=0.35 (gate-strict fallback)**: worst-case ΔL <0.05 everywhere, but pink lands 30% (`rgb(255,185,194)`) — weakly satisfying the U10 oracle.
   The exact change: `gamut.ts:242` `GAMUT_ALPHA` + the two doc strings (`gamut.ts:5-6`, `:246`). Ship the **tiered bound**, never "<0.05"; the pass-1 "natural knee" claim is refuted — it is a diminishing-returns **elbow** (light-retention climbs monotonically through α=2.0). Add: the §13.2 MINDE oracle suite vs browser refs; a far-OOG light-pink/yellow/cyan regression corpus; a mid/dark `C∈{0.37,0.40}` guard row asserting worst-case ΔL `< 0.09` (the tiered bound as a lock).
2. **KF-1 grammar fix + rename** (apply the kf1-grammar worktree diff — prototyped green, 1877/1877 *at the worktree's `15b0382`/1.0.2 base; a stale-base number pending L2's M3 head re-run*): `parseFunctionParameters` rewritten (`stylesheet.ts:637-706`) — `topLevelColonIndex` (depth-0, string-safe) splits the default; first-whitespace splits name from `<css-type>`, per CSS Functions & Mixins L1 §3.1. Mirror serializer fix (`serialize.ts:132-140`: emit `name <syntax>: <default>`). Type rename `CustomFunctionParameter.type→syntax`, `defaultValue→default` (`stylesheet.ts:44-48`). Tests rewritten off the buggy canon (the old assertions had codified the garbage as canon). **Gate vector**: `--x <length>: 0px` → `{name:"--x", syntax:"<length>", default:"0px"}`. **Carry to head (M2):** the diff applies cleanly at `e80b359` because the touched source + test files (`stylesheet.ts`, `serialize.ts`, `test/grammar-2026-atrules.test.ts`) are **byte-identical across `15b0382..e80b359`** (`git diff --stat` empty, re-verified twice this pass) — so no re-derivation is owed, only L2's mechanical re-run to restate the head-measured count.
3. **`extractFunctions` fresh-build regression guard** (M1 — demoted from the pass-2 "restore" sub-item, which was a stale-worktree artifact): the symbol kf consumes (`keyframes.js/src/animation/adapter.ts:3,293`) **is already in source since 1.1.0** (`23d1a91`) — `src/parsing/extract.ts:124`, re-exported at `src/index.ts:291` + `src/subpaths/parsing.ts:47`; a fresh build **keeps** it. Nothing to restore. All that remains is a **trivial assertion** that the walker is present in the published `.d.ts` (a cheap regression lock against future barrel drift), rideable on any R.W1 test pass.
4. **`bezierPresets` rows** (easing-disposition riders): add `"smooth-step-3": [1/3, 0, 2/3, 1]` (EXACT — maxΔ 0.0000 over 2001 samples; completes 24/24 name preservation); tighten the 15 approximated rows to the easings.net + exact-⅓-handle table (converts the R.W4 migration's worst case from 2.9× JND to sub-JND; 4 rows become exact; no in-tree consumer reads the changed rows; kf does not import `bezierPresets`). Behavior-visible on a published export → rides this major. *(Q12 — recommended RATIFY.)*
5. **Boundary API** (boundary-api packet, verbatim): new `src/units/color/boundary.ts` (~190 LoC) exporting `sampleGamutBoundary(hueDeg, target, options?)` + zero-alloc `sampleGamutBoundaryInto` + 4 types (`GamutBoundaryTarget` = the 4 wide RGB spaces incl. prophoto; `GamutBoundaryMode` = `"jnd"` (default) | `"raw"`; options `{columns?: 96, mode?}`; result `{points: Float64Array, count, oogTopFrac}`). Two `gamut.ts` companions (`srgbToOKLabInto`, `gamutMapOKLabInto` — kept out of barrels until a public consumer is named). Matrices become package-internal exports of `conversions/xyz-extended.ts` (in **no barrel** — verify `conversions/index.ts` uses named exports). Perf contract: mean 0.20–0.25 ms at 96/jnd/p3, ceiling 0.5 ms, `Into` = 0 allocations/call. Test plan per boundary-api §8 (goldens seeded from the α=0.05 F3 fractions with ±0.03 tolerance, **regenerated post-α, then locked at 1e-3**; property suite; Into-parity; edge semantics: non-finite hue → empty boundary; `count=0` ⇔ plate-clear, no NaN sentinels). Bench entry `bench/gamut-boundary.mjs`; the number goes in R/FINAL.md, no standing threshold script.
6. **OKHSL/OKHSV** (fixes the documented HSV low-chroma hue drift; reuses `gamut.ts` cusp math) · **ΔE-2000 + ΔE-ITP** (pure functions; unblocks quantize dedup) · **K-DISP** (`dispatch.ts` hue-cluster → `mix.ts` real decomp) · **`/easing` export-stability guard** (test asserting the 5 exports glass-ui's `/easing` composes: `CSSCubicBezier`, `steppedEase`, `bezierPresets`, `jumpTerms`, `parseSteps`) · `Color.try()` only if trivial, else book.
7. **Publish 2.0.0** — the major is carried by the field rename (unambiguous BC break on a published descriptor) + the gamut-policy output change + the preset-row tightening; semver honesty (the keyframes-2.2.0 lesson) says one clean major, not euphemistic minors dragging a lingering shim. Dispatch the kf re-pin letter (§9) + the glass-ui peer-floor note (`^1.1.1`→`^2.0.0`).

**Gate**: §13.2 oracle suite green vs browser refs; tiered-bound guard row green; KF-1 gate vector green; `extractFunctions` present in a **fresh-build** `.d.ts` (a trivial regression assertion — the symbol is already in source since 1.1.0, M1); boundary goldens locked post-α; full vitest green; 2.0.0 published; both dispatch letters written.

### R.W2 — FUNCTIONAL TRUTH (demo P0s; behavior before beauty)

- **Boot fix** (boot-blast-radius, proven all 4 modes): replace the object-form self-alias (`vite.config.ts:50` — a prefix rewrite that mangles `@mkbabb/value.js/math` → `dist/value.js/math`, "Not a directory") with **exports-map-driven anchored-regex alias generation** — one `^…$` entry per `package.json#exports` key, replacement read from each entry's `conditions.import`. The alias↔exports coupling is eliminated *by construction* (kills CRIT-M2); the `@…` demo aliases keep string-prefix semantics. The alias's true job (corrected premise): **override the stale registry self-install** `node_modules/@mkbabb/value.js@1.0.2` (the `package.json` self-dep materializes a real tarball dir — the "nothing to resolve to" rationale was false). Dev-config-only: production dist **byte-identical** (71 files hashed); no republish; decoupled from every publish gate. Gate instrument: **`boot-smoke` cold** (`--force` — a warm dep-optimizer cache can render a stale-but-green graph).
- **Tabs drift** (NEW P0, unmasked by the boot cure): glass-ui 4.2.0's barrel exports none of `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`; `./tabs` exports only `SegmentedTabs`. `demo/@/components/ui/tabs/index.ts:1` dead-imports the four; **10 demo files** consume the shim; gh-pages + hero-lab die at LINK phase. **Migrate the demo to glass-ui `SegmentedTabs`** (glass-ui-first-class precept; reuse the producer's component-type name); reka-ui direct is the proven fallback (the diagnostic stub built both modes fully green). Until migrated, the *deployed* demo is unbuildable against 4.2.0.
- **Abrogation-sweep named-export tripwire** (recommended, lands with the Tabs migration): extend `scripts/abrogation-sweep.mjs` half-1 to assert each named binding in `import {A, B} from "@mkbabb/glass-ui[/sub]"` exists in the resolved dist module's export set — the sweep is green today *despite* the Tabs drift (it validates specifier resolution only). `boot-smoke` cold remains the load-bearing catch-all either way.
- **Dual-pane 1440 (D8-1), gate split** (dispatch-homes B.2):
  - **INTERNAL (hard, blocks R.W2)**: the boot fix green across all four modes; the 1440 dual-pane defect **and** its cascade root confirmed by an in-tree CSSOM probe (root: glass-ui's build-emitted unlayered `@import "./components.css"` — 53 KB of bare Tailwind utilities whose `.hidden` annihilates the demo's layered `lg:flex`; every demo-side cure REFUTES, breaking Tailwind-v4 `@utility` registration).
  - **EXTERNAL (booked, does NOT block R.W2)**: the no-shim render gate — "dual-pane renders at 1440 without the w6a shim" — retires when glass-ui's `layer(components)` dist lands (the D8-1 ask was **dispatched to the live BG agent at pass-2 time**, §8.7; the fix is two emission sites in glass-ui `vite.style-assets.ts:307/:366`, zero collateral verified). Verify by re-running the 1440 probe against the rebuilt `file:../glass-ui` dist.
- **The N.W10 rows + carries**: U9 reset-broken; X6 dual-mount WebGL blob; X8 pane-router cold-hash; X9 tags-warn; **mix-RAF PRM gate** (the last live PRM hole — 5 ungated rAF in `useMixingAnimation.ts`); `watercolor-swatch` phantom → **consume the glass-ui `WatercolorDot` ghost variant or delete** (never define-in-demo); U33 aurora **motion** (derive landed; the actual complaint didn't); save-with-backend-down P0 + kC placebo; kill-list verify-then-delete (`useCardMenu`, `useCodeFormatting`, dup `usePaletteExport`); K-W3DIFF / K-PALID / K-INV5.

**Gate**: demo boots **cold-cache** clean; `npm run gh-pages` + `npm run build:hero-lab` reach `✓ built`; e2e 5-project suite green; the 1440 defect + root confirmed in-tree; zero ungated rAF; zero phantom classes. The no-shim render bar is EXTERNAL-booked (short window — BG is live and the fix is mechanical).

### R.W3 — THE INSTRUMENT (picker design keystone; Fable + frontend-design; spec = the amended `color-picker.md`)

Font/accent/layout keystone (N.W12 folded: `--font-stack-display` cure, `--accent-live`, dark ladder, de-navy borders, container-query clamp, `--card-edge`, card-lock law) → **the gamut-truth overlay signature** (2D canvas; consumes `sampleGamutBoundary` from the 2.0.0 cut — the demo owns paint, never math; 4 ink/paper tokens; luma 0.5 via the shared helper; threshold detent + `p3 ⊣` label; lens per the Q11 ratification, B-with-override recommended) → controls consume + design (spectrum-slider consume — delete the raw-reka fork at `ComponentSliders.vue:59-122` onto `variant="spectrum"`, thumb paints live color as a producer token feed; font-rung on the trigger; **U8 bounded SelectContent + specimen rows via slot + WatercolorDot**; U14 centering; U13 veil capsule; U7/U30a audacious space dropdown — net-new at `ColorSpaceSelector.vue` is only the `size="display"/"audacious"` rung (ghost variant already present at `:15`; font override `:16-17`); D8 focus-rings) → readout rhythm (tnum int/frac/unit split) → plate-land + paint-in + stagger three-beat + space-switch cross-fade (which the lens override hands a real geometry change for free).

**Gate**: `document.fonts.check` true for Fraunces; thumb paints live color under keyboard drive; `document.getAnimations()` shows the orchestrated open; ComponentSliders ≤400 LoC; focus ring paints on every keyboard control; **re-author a w6a-equivalent probe against the cured substrate** as the falsifiable before/after oracle (the discarded scratch encoded the technique; the files stay dead).

### R.W4 — SUFFUSION (cards + shell + panes)

N.W14 depth grammar + shimmer skeletons (`surface="glass"`) + empty-state CTAs; N.W17 12→3 transition families + per-view accent + view-select moment; docs φ-ladder (U4/U5); **easing hierarchy via the `/easing` consume** (easing-disposition §2.3): `GradientInterval` evolves `{easingName, easingFn}` → the picker payload `{css, fn}`; `GradientVisualizer.vue:217-219` swaps the `EasingSelector` fork (66 LoC + SVG preview, dies) for `<EasingPicker>`/`<EasingConfigurator>` seeded `:preset="linear"`; `parseGradientCSS`'s linear-reset maps to the `linear` seed unchanged; `resolveEasing` + `GRADIENT_EASING_NAMES` become deletable (grep at consume time); **steps mode allowed** (banded gradients are a design tool; pinnable via the picker's `mode` prop if taste says no — Q12). Zero names drop — 24/24 persist as presets sourced from value.js's own `bezierPresets` (§0.3); the numeric-substitution record is easing-disposition §1.4. Extract-pane dedup + population/dominance surfacing + EditDrawer (T19/T20/T21); **Parse-Lab-as-input** (the ColorInput AST + gamut-verdict echo — zero new library exports, §2.3). Book `/easing` into the GAP-3 5.0.0 subpath-rename watch.

**Gate**: transition families ≤3; both forks deleted (EasingSelector + trigger-font override); `demo/` ≤400 LoC everywhere; a11y snapshot parity.

### R.W5 — OBSERVATORY (hero-lab; Fable; spec = `hero-lab.md` amended; slippable to S)

Font-load fix first (highest leverage); grey wash → oklch mesh; PAPER graticule kept structural; crayon-datum calibration tick; the sRGB↔oklch grey-death toggle as the signature — the *interpolation-path* half, never the gamut half.

**Gate**: fonts load; page gradients interpolate in oklch; the toggle demonstrably kills the grey.

### R.W6 — TWIN-TIE (CRUD union + fourier pairing; independent of the demo lanes)

Rescoped per dispatch-homes A.3 (the "shape + byte-parity" framing is struck — byte-parity is impossible AND contract-forbidden; see §6):

> Add the **5 wire-envelope shape-fixture rows** as **inline rows in the existing `api/test/conformance/diff.test.ts` probe** (M4 — the fixture form is committed to inline rows, named explicitly; NOT a co-located JSON file; in-tree, read locally), transcribed against `J-diff-shape.md` §3/§4: `changed-scalar` · `added-before-absent` · `removed-after-absent` · `identical-empty-ops` · `reorder-degrades-to-changed`. Record the **contract-currency invariant** (any change to `atomdiff.ts`/`hash.ts`/`PaletteVersion`/URN catalog re-verifies the fourier twin + updates CONFORMANCE-MATRIX — the value.js analog of fourier `inv-32`). value.js's **in-tree contract-of-record deliverable** (M4) is a one-line note in the R docs naming `J-diff-shape.md` §3/§4 as the bilateral contract — the binding already exists in-tree at `api/test/conformance/diff.test.ts:5-6` (the probe's docstring cites `fourier-analysis/docs/tranches/J/design/J-diff-shape.md §3/§4` as its source of rules). The **CONSTELLATION.md pointer** is a **fourier-tree write** (the file exists only at `fourier-analysis/docs/constellation/CONSTELLATION.md` — value.js cannot author it unilaterally under the read-only-main-trees precept); it **books to fourier-N/FN-7 alongside the relocation** (they land where the doc lands), NOT as an R.W6 value.js deliverable. Paired-author the **fourier-N charter** (§7): FN-6 wires fourier's own reader (fourier-owned; vendored copy recommended); FN-7 books the doc-relocation co-decision **and the CONSTELLATION.md pointer**. Optional `canonical_digest` one-primitive adoption in `hash.ts` if parity holds.

**Gate (rescoped to value.js-tree state only, M4)**: value.js's `diff.test.ts` probe asserts the 5 **inline** rows green **with no sibling checkout required**; the in-tree contract-of-record note present; contract-currency invariant recorded. The CONSTELLATION.md pointer and the fourier-N charter are **fourier-tree writes booked to FN-7** — they are R.W6 *paired-authoring work* but **not** value.js-local gate conditions. **Gates on nothing outside this repo.**

### R.W7 — WIRE + CLOSE

Wire-deploy ceremony (prod serves I-era code): deploy HEAD api (X1); NCSU-alias retirement (X2 — maintainer on-host op, Q2); first CF-Pages run (X3); rollback runbook fold (X5) + X4 decision record. Dispatch the **glass-ui relay letter** (§8 — D8-1 rides as a verify-at-consume entry, having been dispatched early) + confirm the **kf/parse-that slate** (§9) dispatched at R.W1. Author R/FINAL.md; merge + tag.

**Gate**: prod serves current; relay letters dispatched; FINAL.md authored; master merged, tagged. **Gates on nothing outside this repo.**

### 3.2 DAG

```
R.W0 ──┬── R.W1 (library, 2.0.0) ───┐
       ├── R.W2 (functional) ───────┼── R.W3 (picker) ──┬── R.W4 (suffusion) ──┐
       └── R.W6 (twin-tie) ─────────┘                   └── R.W5 (hero-lab)* ──┼── R.W7 (close)
                                                         *slippable to S       ┘
```

W1/W2/W6 run parallel after W0. W3 requires W1 (the overlay consumes the published boundary API atop the settled policy) + W2 (design on a working substrate). W4/W5 parallel after W3. W7 requires W4 + W6 (+ W5 if not slipped). The one external edge — the D8-1 no-shim render bar — is a BOOK riding an already-dispatched ask, never a gate.

### 3.3 Booked cross-repo events (BOOKS, never gates)

| Book | Trigger | Action |
|---|---|---|
| **D8-1 no-shim verify** | glass-ui rebuilds dist with `layer(components)` (ask dispatched to BG at pass-2 time) | Re-run the 1440 dual-pane probe against the rebuilt `file:` dist; confirm `visibleCount 2` with no `!important`; retire the shim knowledge from the gate wording |
| **glass-ui 5.0.0 adopt event** | the BG/BH joint cut | Re-point `App.vue:115` `/goo-blob`→`/blob`; walk the by-name subpath table (GAP-3, incl. `/easing` + `/tabs`); consume `uSatColor[]` if it rode the cut (GAP-1); re-verify aurora-metal tunes; **U6: verify the dock-fission surfaces** (the born-RED dock-morph gate re-anchored here); verify producer blob PRM/single-canvas (GAP-4) |
| **parse-that `^1.0.0` re-pin** | kf S.H2 publishes the 1.0.0 cut | Re-pin, full suite re-verify (0 `*Span` consumers — API-safe). Wait, don't pre-pin |
| **vue-router 4→5** (K-W5RT) | stable vue-router 5 | Migrate then |
| **S.H3 Pratt consume-edge** | parse-that presents the sketch | Design-review the `math.ts` calc() transposition; ratify or decline |
| **CH-10 / CH-13 / R8-23 spec-gated grammar longhands** | as previously recorded | Unchanged carries |
| **fourier FN-7 doc-relocation co-decision + CONSTELLATION.md pointer** | fourier-N execution | Co-decide the contract-doc neutral home **and author the CONSTELLATION.md pointer** (both fourier-tree writes, M4); value.js's in-tree contract-of-record note holds the binding in the interim, so neither is urgent |

### 3.4 The pin policy (decide once, record forever)

**POV: keep `file:../glass-ui` (and `file:../keyframes.js`) deliberately, and RECORD it in CLAUDE.md at R.W0.** The constellation is a paired-authorship monorepo-in-spirit; a registry pin during active co-development is theater that goes stale the day it's written (as 3.13.0 and "BA 4.0.0" both proved). The discipline that actually protects value.js is the **adopt-event book** + the by-name MIGRATION tables the relay letter demands + **`boot-smoke` cold** as the catch-all for named-export drift (the Tabs class of failure). The keyframes devDep is the same policy applied to the peer-provision chain (§3 R.W0 W0-8). *(Ratify: Q4.)*

---

## §4 — The library slate (R.W1 summary + defers)

**In R** (detail in §3 R.W1): U10 policy (Q7 head) · KF-1 grammar-fix + rename · `extractFunctions` fresh-build `.d.ts` regression guard (M1 — already in source since 1.1.0, no restore) · `bezierPresets` rows (smooth-step-3 + tightened 15) · boundary API (`sampleGamutBoundary`/`Into` + companions) · OKHSL/OKHSV · ΔE-2000/ΔE-ITP · K-DISP · `/easing` export guard · (`Color.try()` if trivial).

**Deferred to S+ with recorded rationale**: R-4 raytrace N-gamut map (depends on R-1 settling policy); R-8 gamut-relative spaces (**killed as a mechanism** by pass-2 measurement — c1 is the washout, c2 collapses onto full-cusp; stays deferred with that record); R-5 HDR rec2100 (spec still Draft); R-6 Jzazbz/ICtCp spaces (after ΔE-ITP shares the math); R-7 HCT/CAM16 (heavy, no demand); R-10 `if()`/`random()` parser nodes (gate on Baseline ~late-2026). **Do-NOT** (recorded): sibling-index/count, device-cmyk, ICC profiles.

---

## §5 — The CRUD-union verdict: **LEAVE** (leave the code; keep the contract current; tighten the twin-tie)

Picked over *extract* and *converge*; not a compromise — the only correct answer:

1. **Extract is impossible and was deliberately rejected.** Cross-language (Python/FastAPI vs TS/Hono); fourier `inv-16` ("shared by contract; frameworks rejected") + `inv-26` (no codegen) codify it on both sides. A shared package for a 145-LoC pure function is contrivance for negative benefit.
2. **Converge already happened where it matters.** The union EXISTS as the shared contract corpus (CRUD-CONTRACT v2.0.0 + SCHEMA + 187-row CONFORMANCE-MATRIX + J-diff-shape); the twins are wire-identical today; zero copy-pasted code to de-duplicate.
3. **The one live risk is silent twin-drift**, and it closes for the price of the R.W6 fixture + the paired contract-currency invariants (value.js R.W6 inv ↔ fourier FN-5).

**Q9 RESOLVED** (dispatch-homes PART A, on a verified decisive fact: value.js's api conformance suite has **zero cross-repo filesystem reads** — it binds to the contract by *transcription*, citing `J-diff-shape.md` in docstrings only):

- **Fixture**: value.js **lands its rows in-tree** (`api/test/conformance/`), read locally. The proto-golden-vectors sibling-read recommendation is resolved **against** — it would introduce the first cross-repo read into api CI, the exact isolation breach that bites (CI, isolated clones). Duplication-with-invariant-guard is not drift — it is the constellation's existing, working pattern for the contract itself. fourier's reader strategy is fourier's call (FN-6; vendored copy recommended for symmetric isolation).
- **Contract doc**: stays physically at `fourier-analysis/docs/tranches/J/design/J-diff-shape.md`. **Corrected at pass 3 (M4):** the **CONSTELLATION.md pointer that elevates it as the bilateral contract-of-record is itself a fourier-tree write** (`CONSTELLATION.md` exists only at `fourier-analysis/docs/constellation/CONSTELLATION.md` — no such file in value.js; authoring it from an R lane would breach the read-only-main-trees precept), so it **books to FN-7 alongside the relocation** — the same asymmetry logic that defers the physical move defers the pointer. value.js's **own** contract-of-record deliverable is **in-tree**: a one-line R-docs note naming `J-diff-shape.md` §3/§4 as binding, backed by the existing `api/test/conformance/diff.test.ts:5-6` docstring that already cites it. Neither the pointer nor the relocation gates R.W6.
- Byte-parity across the twins is **struck permanently**: Python/JS float-repr (`1.0`↔`"1"`) + negative zero are irreducible; the set-hash constructions differ structurally (64-hex pipe-join vs 16-hex JSON-array — demonstrated to DIFFER on identical inputs); J-diff-shape §6 BINDING forbids cross-asserting outputs. The fixture asserts **shape**, each repo's `atomValues` payload asserted per-repo only.

The three named divergences (layering, txn posture, index-lead order) are legitimate per-repo design choices, not drift — do not "unify" them. What crosses the seam is knowledge: fourier adopts the `deletedAt`-leading index lesson; value.js optionally adopts `canonical_digest`.

---

## §6 — The fourier-analysis uplift plan (paired-authored into `fourier-analysis/docs/tranches/N/` at R.W6)

Fourier owns execution; its head tranche M is deploy/design-only — these are net-new N candidates:

| # | Item | Shape |
|---|---|---|
| FN-1 | Heal the create/fork non-atomic root-version window via read-time/startup recompute (KISS, no replica-set dep) — or record the accepted gap as an invariant | small |
| FN-2 | Adopt `deletedAt`-leading compound indexes for gallery cursor sorts (the value.js `db.ts:51` lesson) | small |
| FN-3 | Optional: thin `repositories/visualization.py` seam (14× direct `get_db()` in the viz router) — a boundary, not a framework | optional |
| FN-4 | Unify problem+json construction under one FastAPI exception handler | low |
| FN-5 | Extend `inv-32`'s spirit to the CRUD twins: any `atomdiff.py`/version-shape/URN change re-verifies the value.js twin + CONFORMANCE-MATRIX (pairs with value.js's R.W6 invariant) | invariant |
| FN-6 | Wire fourier's own reader for the wire-envelope shape fixture (value.js's rows are in-tree in value.js; fourier vendors its copy — recommended — or chooses otherwise; fourier-owned, guarded by FN-5) | small |
| FN-7 | Co-decide the contract-doc neutral home (relocation of `J-diff-shape.md`) **and author the CONSTELLATION.md pointer naming it the bilateral contract-of-record** (both fourier-tree writes, M4; value.js's in-tree contract-of-record note de-urgents them) | coordination |

---

## §7 — (reserved)

*(Section number kept stable for cross-references; the fourier plan is §6, the relay letter is §8.)*

## §8 — The glass-ui relay letter (routing: BG owns `src/`, BH owns the 5.0.0 reshape + ceremony)

**Item 7 (D8-1) was dispatched to the executing BG agent at pass-2 time** (dispatch-homes B.1/B.3) — early dispatch, because folding a gate-bearing dependency into the close-wave letter would have run the entire R design body atop the load-bearing w6a shim, and the `file:` pin policy makes the fix free to consume the moment BG rebuilds dist. The remaining items dispatch at R.W7 (or earlier if the 5.0.0 cut approaches). Content, in priority order:

1. **GAP-1 · `uSatColor[]` (C-1/BA-VJS-5) — HIGH, escalated.** The ONE N ask never shipped; silently slipped **three cuts** (booked "4.x" at W-GOO-REDRESS arm B; out of BB W-VIZ-SUITE; absent after BG WS5's blob rebuild — `grep uSatColor dist/` = 0). value.js's hero blob (`App.vue:115`) cannot derive satellite shades without it — the U3 residual. **Ask: ride the 5.0.0 blob rebuild as the natural rider, or re-book with an explicit named owner.** Companion: `bodyLightness`/`lightnessFloor` on `deriveBlobPalette`. *(Q8 governs the posture.)*
2. **GAP-2 · `goo-blob → blob` rename — HIGH.** Name value.js by-name in the 5.0.0 MIGRATION row (`App.vue:115` imports `/goo-blob`; confirm whether `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/`GooBlob` symbols also rename).
3. **GAP-3 · the 5.0.0 `/api` fold + subpath regen — MED.** value.js consumes **root + 15 subpaths (16 real specifiers)** — the verified enumeration (§C should-fix, re-checked against the live import sites this pass): `(root)`, `/aurora`, `/color`, `/configurator`, `/confirm-dialog`, `/controls`, `/dark`, `/dock`, `/dom`, `/forms`, `/goo-blob`, `/search`, `/styles` (`style.css:52`), `/styles.css` (`style.css:53` — **a real specifier, and it was unlisted in pass 2**; the SFC-scoped fold, needed alongside `/styles` for a faithful render), `/tabs`, `/watercolor-dot`. **Correction**: `/styles/animations` is **NOT** an import specifier — it is a **comment-only mention** at `demo/@/styles/animations.css:3` ("Shared keyframes … are provided by @mkbabb/glass-ui/styles/animations.css"); it is struck from the specifier list. The cut-notes owe a by-name renamed/moved/dropped table. **Precedent for why this matters**: the 4.x compound-`Tabs` removal shipped with no MIGRATION row and left value.js's deployed demo unbuildable (boot-blast-radius §4) — exactly the F-4 by-name discipline this ask codifies. `/easing` joins the watch (value.js consumes it from R.W4).
4. **GAP-4 · blob producer perf half — MED, verify-first.** Confirm the BG-rebuilt `useMetaballRenderer` is single-canvas + IntersectionObserver/`document.hidden`/PRM-gated (N2 A′-1/A′-2). If not, land it in BG WS5.
5. **GAP-5 · cut-ceremony carries — LOW.** F-1 dts-emitting `build:watch`; F-3 AuroraConfig slider descriptor via `/configurator`; F-4 `.retired-classes.txt`/MIGRATION by-name rename discipline (see GAP-3's precedent).
6. **Peer-floor + `/easing` contract.** value.js R.W1 cuts **2.0.0**: glass-ui's peer floor is **currently `^1.0.0`** (verified `glass-ui/package.json` peerDependencies this pass; `^1.1.1` is *planned* at the BH B2.1-swap, not yet in the manifest) and must ride to `^2.0.0` at the R.W1 cut. RECORD glass-ui's `/easing` dependency on the 5 value.js easing exports (`CSSCubicBezier`, `steppedEase`, `bezierPresets`, `jumpTerms`, `parseSteps`) — value.js guards them with a test from R.W1; glass-ui should cite them in its own contract notes. Note: `bezierPresets` gains a row (`smooth-step-3`) and 15 tightened rows at 2.0.0 — flows into `EasingPicker`'s preset menu through the externalized import with zero glass-ui work.
7. **D8-1 · `layer(components)` — VERIFY landed (dispatched early).** The producer fix: wrap **only** the `components.css` import in `layer(components)` at **both** emission sites in `vite.style-assets.ts` — `:307` (`dist/styles/index.css` monolith fold) and the `buildSubset` deferred fold at `:366` (`dist/styles/deferred.css:33`); do **NOT** layer the SFC-fold `../glass-ui.css`. Zero collateral verified (0 `@utility`, 0 real `@theme` in the layered artifact; `@property` registers globally regardless of layer); proven end-to-end by faithful vendored simulation (dual-pane `visibleCount 2` at 1440, fonts intact, zero errors). On the next `file:` dist rebuild carrying it, value.js re-runs the 1440 probe and retires the shim. If not yet landed at R.W7, carry the ask forward here.

---

## §9 — The keyframes.js / parse-that alignment slate

| # | Item | R action |
|---|---|---|
| KF-1 | `extractFunctions` param descriptor — **grammar-fix + rename** (re-specced; the pass-1 "field rename only" framing and its "record `{type,defaultValue}` canonical" fallback are both **struck**) | **R.W1, inside the 2.0.0 cut**: (A) the grammar fix — `parseFunctionParameters` whitespace-split `<css-type>` + single-top-level-colon default (`stylesheet.ts:637-706`) + mirror serializer (`serialize.ts:132-140`); (B) the rename `type→syntax`, `defaultValue→default`. Both prototyped green (kf1-grammar). Dispatch the letter: kf deletes `normalizeParam` + `NormalizedParam` + `VJS_PARAM_BUG_MAX` (every recovery arm maps to a direct field read — kf1-grammar §5's case map), simplifies `coerceArg`'s bug arm, re-pins `^2.0.0`, reads `.name`/`.syntax`/`.default` directly. The S7 lifecycle completes. |
| KF-1b | `extractFunctions` fresh-build `.d.ts` presence (M1 — the pass-2 "dist-only hazard" was a stale-worktree artifact; the symbol is in source since 1.1.0 `23d1a91` at `extract.ts:124` + barrels `index.ts:291`/`subpaths/parsing.ts:47`) | **R.W1 trivial regression assertion** (NOT blocking the KF-1 letter — the export already exists, so the kf re-pin resolves it today): assert the walker is present in the published `.d.ts` as a cheap lock against future barrel drift. |
| KF-2 | parse-that `^0.13.0` pin | Current — no action. Book the `^1.0.0` re-pin on kf S.H2's cut (§3.3). Do not pre-pin. |
| KF-3 | glass-ui `/easing` × 5 value.js exports | Export-stability guard test at R.W1; recorded as a standing contract in the relay letter (§8.6). |
| KF-4 | `/math` subpath importmap sensitivity (kf DM-13) | RELEASE.md doc line at R.W0 (W0-8/W0-12): the `/math` leaf is a load-bearing externalization target — keyframes' dist imports `clamp`/`lerpArray`/`scale` from it; it must never break; non-npm hosts must map it. The R.W2 boot cure exists precisely because this consumer is live. |
| KF-5 | parse-that S.H1 packrat-arming | No action — transparent GC win inherited at the next re-pin. |
| KF-6 | parse-that S.H3 Pratt combinator | Booked design review (§3.3); value.js's `math.ts` calc() is the ratifying consume-edge. |

---

## §10 — Zero-drop fold ledger (every item → exactly one home)

| Item(s) | Home |
|---|---|
| W0-1..W0-14 (treatments + amendment packet · scratch discard · gitignore class · CONTRIBUTING/VENDOR rm · precepts submodule · keyframes devDep **KEEP** · retro-tags ×10 · master-merge · P/Q/N records · doc-truth + pin-policy record · report hoisting) | **R.W0** |
| U10 policy (Q7) + §13.2 oracle + tiered-bound lock · KF-1 grammar-fix + rename · **extractFunctions fresh-build `.d.ts` guard** (M1 — already in source, no restore) · bezierPresets rows (smooth-step-3 + tightened 15) · **boundary API + Into companions + matrix internal exports + goldens** · OKHSL/OKHSV · ΔE-2000/ΔE-ITP · K-DISP · `/easing` guard · R8-24 `<syntax>` validator row (verified shipped in 1.2.0 — closed) · 2.0.0 publish + dispatch letters | **R.W1** |
| Boot fix (exports-map alias) · **Tabs → SegmentedTabs migration** · **abrogation-sweep named-export tripwire** · dual-pane internal confirm (external no-shim BOOKED) · U9 · U33-motion · mix-RAF PRM · watercolor-swatch consume-or-delete · X6/X8/X9 · kill-list · K-W3DIFF/K-PALID/K-INV5 · save-P0/kC rows | **R.W2** |
| U1 U2 U7 U13 U14 U15 U17 U19 U21 U23 U24 U26 U28 U29 U30a U30b U31 U32 (picker-bearing U-rows) · **U8 bounded-Select consume (named)** · ComponentSliders lift (R8-14) · O.W7 gamut-truth half · overlay signature (consumes R.W1's API) · lens ratification (Q11) | **R.W3** |
| U4 U5 U12 U16 U18 U20 U22 U25 · U27-consume via `/easing` (EasingPicker; 24/24 names; §1.4 substitution record; steps allowed per Q12) · T19/T20/T21 · O.W7 Parse-Lab half · glass-ui §5 self-owed retirements (EasingSelector fork, trigger-font override, Skeleton glass) | **R.W4** |
| hero-lab treatment (full; boundary/path assignment binding) | **R.W5** (slippable) |
| 5 shape-fixture rows inline in `diff.test.ts` · contract-currency invariant · in-tree contract-of-record note · canonical_digest option · FN-1..7 paired-authoring | **R.W6** |
| Wire-deploy (X1/X3 + X2 per Q2 + X5 fold + X4 record) · relay letter §8 (7 items) · FINAL.md · merge + tag | **R.W7** |
| **D8-1 no-shim verify** (ask already dispatched) · **U6 dock-fission verify at 5.0.0 (named)** · U3-uSatColor consume · goo-blob→blob · GAP-3 subpath table (+`/easing`, +`/tabs`) · aurora-metal verify · parse-that 1.0.0 re-pin · K-W5RT router-5 · S.H3 Pratt · CH-10 · CH-13 · R8-23 timeline longhands · FN-7 co-decision (+ CONSTELLATION.md pointer, M4) · R-4/5/6/7/8/10 library defers | **BOOKS** (§3.3 + §4) |
| R8-18 fourier conformance-matrix corrections + fourier-web pin bump | carry, fourier-owned (named in the FN charter) |
| R8-19 kf-side BOOKs (MCI-5 pad, P3-keyframe, light-dark per-target) | carry, kf-owned |
| CLOSED by O/P/Q (do NOT re-fold): setSubProperty O(N²) · color2Into egress · mixColorsInto · parseCSSSubValue · contrast-color() · VJ-Q5..Q9 | closed |
| OBSOLETE (evidence): "reach v1.0.0" event · 3.13.0/BA-4.0.0 pin targets · N.W18 abrogation sweep · "stale keyframes dist" boot diagnosis · "phantom keyframes devDep" · "13-of-24 easing drop" · shared-hash golden file · §8 record-as-canonical fallback · R-8 as a live mechanism | **pruned** |

---

## §11 — Accountability: the PASS1-VERDICT §5 backlog, discharged row by row

### P0 (verdict/gate-bearing)

| # | Fix | Status |
|---|---|---|
| 1 | KF-1 re-spec as grammar-fix + rename; strike the §8 fallback; re-frame Q5/Q6 | **DISCHARGED** — kf1-grammar prototyped the fix green (1877/1877 *stale-base at `15b0382`; head re-run = M3*; 7 vectors; serializer mirror; the old tests had codified the garbage). Q5 RESOLVED (defect fix); Q6 ANSWERED (bundle 2.0.0). Fallback struck (§9, §12). ~~Plus the load-bearing side-find: extractFunctions dist-only → KF-1b.~~ **The "extractFunctions dist-only" side-find is REFUTED (M1):** it is in source since 1.1.0 (`23d1a91`); KF-1b demotes to a trivial fresh-build `.d.ts` regression guard. |
| 2 | Bound the α=1.0 mid/dark safety claim (C→0.40 corpus; α plateau rows; pass if <0.05) | **DISCHARGED — and the measurement moved the answer**: worst-case 0.083 > 0.05, gate FAILS; knee refuted (elbow); tiered bound shipped instead; Q7 is now a two-option owner call with a gate-strict α=0.35 fallback (gamut-bound §2/§3/§7; §3 R.W1 here). |
| 3 | Verify the alias cure under all four vite modes | **DISCHARGED** — green ×4; dist byte-identical (71 files); dev-config-only stated. Plus two new finds: the stale 1.0.2 self-install premise correction and the Tabs-drift P0 → R.W2 (boot-blast-radius §2–§4). |
| 4 | Re-spec or kill snap-resist; table the default-target with F3 evidence | **DISCHARGED** — re-specced as the JND-contour threshold detent with target-named label; lens tabled as Q11 with the packet's argued position (B-with-override) + full F3 evidence (overlay-amendment §1/§2). |
| 5 | Ratify the easing model change with the precise drop (13 of 24) | **DISCHARGED — premise overturned**: 0 names drop (catalogue IS `bezierPresets`; smooth-step-3 exact); disposition A ratification packet with the per-name §1.4 substitution table + riders (easing-disposition). |

### P1 (spec-integrity)

| # | Fix | Status |
|---|---|---|
| 6 | Retro-tags 7 → 10; gate scoped ≥ v0.6.0 + carve-out | **DISCHARGED** — all 10 publish commits pinned (w0-truth §b.5; table in §3 R.W0 W0-9). |
| 7 | §9 zero-drop breach: U6 → BOOK, U8 → R.W3, named rows | **DISCHARGED** — both named in §10 (U6 = dock-fission verify at the 5.0.0 adopt event; U8 = bounded-Select consume in R.W3). |
| 8 | Correct the `dispatch.ts:371` label (hold-L/H chroma-reduce ≈ c1, NOT §13.2 MINDE) | **DISCHARGED** — gamut-bound §5, verified against the live function (`:371-444`; no `deltaEOK` in the loop; its own docstring confirms). Verdict unchanged, now correctly reasoned: unifying sRGB onto it would produce the c1 washout. |
| 9 | Demote fixture location to a Q9 tradeoff; honor the value.js-lands default; rescope R.W6 | **DISCHARGED** — Q9 RESOLVED on the verified zero-cross-repo-reads fact; R.W6 rescoped verbatim (§3 R.W6, §5; dispatch-homes A). |
| 10 | Commit F8.1 to `sampleGamutBoundary` + name the wave | **DISCHARGED** — full API packet (signature, Into, matrix visibility, perf contract, test plan); landing R.W1 with post-α golden sequencing (boundary-api; §3 R.W1.5). |
| 11 | Amend the R.W2 gate (cascade cure external); D8-1 relay + dispatch timing | **DISCHARGED** — gate split INTERNAL/EXTERNAL; dispatch decided **NOW** to the live BG agent, with the producer sites corrected (`vite.style-assets.ts:307/:366`, not `src/styles/index.css:258` — that import is build-emitted) (dispatch-homes B; §3 R.W2, §8.7). |
| 12 | Document the regex ↔ exports-map coupling or resolve through exports; state dev-config-only | **DISCHARGED — resolved through exports**: alias generation reads `package.json#exports` `conditions.import` at config-eval time; coupling eliminated by construction; dev-config-only proven by byte-parity (boot-blast-radius §5/§3). |

### P2 (precision/citation sweep — all absorbed into this doc and the lane packets)

| # | Fix | Status |
|---|---|---|
| 13 | Easing count 23 → 24 | **DISCHARGED** (easing-disposition §3.1; carried everywhere here as 24). |
| 14 | F5 luma 0.5; F8.1 cites 46/88 | **DISCHARGED** — 0.5 adopted with the instrument-coherence argument (share the function, not the constant); cites corrected (overlay-amendment §4; §2.1 here). |
| 15 | `ColorSpaceSelector.vue` cite | **DISCHARGED with a further correction**: ghost variant at `:15` (both pass-1 AND the critic had drifted); font override `:16-17`; net-new = the size rung only (easing-disposition §3.3; §3 R.W3 here). |
| 16 | `defineModel<EasingPickerValue>()` notation | **DISCHARGED** (easing-disposition §3.4). |
| 17 | Reword "latent value.js self-bug" | **DISCHARGED** — recorded as refactor-time key-order fragility (projection keys hardcoded, `hash.ts:9-15/27-30`; not runtime-reachable); folds into the R.W6 contract-currency invariant's rationale. |
| 18 | watercolor-swatch → "consume WatercolorDot ghost or delete"; P/Q "do not exist"; GAP-3 = 16 specifiers | **DISCHARGED** (§3 R.W2; §3 R.W0 W0-11 — w0-truth confirmed the dirs absent; §8.3). |
| 19 | gamut costs as ratios; cite drift (`constants.ts:431`, `gamut.ts:246`) | **DISCHARGED** — ratios throughout (α=1.0 ≈1.0×, MINDE ≈6.5×, noise floor ±0.03 self-ratio); `gamut.ts:246` confirmed (pass-1's `:247` off-by-one); `constants.ts:431` = the sector-array start (gamut-bound §4/§8). |
| 20 | proto-glassui-consume title → R.W3/W4 split; `/easing` into the GAP-3 watch | **DISCHARGED** — the W3/W4 split is explicit in §3 (site 4 consume = R.W4; presets = R.W1); `/easing` named in the GAP-3 watch (§8.3). |

### The §6 dissents, argued to conclusion

1. **golden-vectors fragility (dissent: weigh test-isolation, not dev-checkout).** Honored and vindicated: dispatch-homes verified the decisive fact — value.js's api suite has zero cross-repo reads (binds by transcription) — so the *only* isolation that matters is api CI without sibling checkouts, which the in-tree fixture preserves and the sibling-read would have broken. Resolved against the proto's recommendation on exactly the dissent's grounds.
2. **gamut-policy bounding (dissent: measure because bounded-beats-sampled, not from doubt; predicted ≈0.03).** The posture was right and the prediction was wrong: the measurement returned 0.083 (2.8× the estimate — the dissent had also compared a max against full-cusp's *mean*). "Bounded beats sampled" is vindicated precisely because the bound **moved the disposition** — from auto-ratify to an armed two-option Q7. Pass 2 records this as the model case for why unbounded safety claims never ratify.

### Pass-2 refutations (strike-list — claims that appear in NO forward document)

| Refuted claim | Was in | Killed by |
|---|---|---|
| "Worst-case α=1.0 ΔL ≈0.03; auto-ratify as-specced" | PASS1-VERDICT §6.2 | gamut-bound §2 (0.083; gate fails) |
| "α=1.0 is the natural knee/plateau" | proto-gamut-policy §3/§5a | gamut-bound §3 (monotone through α=2.0; elbow) |
| "Self-limiting on mid/**dark**" | proto-gamut-policy | gamut-bound §2.2 (exact at L=0.5 only; dark is bounded, not zeroed) |
| "No `node_modules/@mkbabb/value.js` to walk up to" | proto-boot-cascade + `vite.config.ts:42-43` comment | boot-blast-radius §1 (registry self-install @1.0.2 exists; the alias overrides it) |
| "13 of 24 easings drop; picker presets are a different, smaller set" | PASS1-VERDICT §5-P0#5 / proto-glassui-consume | easing-disposition §1 (0 names drop; catalogue IS `bezierPresets`; `back`×3 was never analytic) |
| "The D8-1 producer site is `glass-ui/src/styles/index.css:258`" | proto-boot-cascade / PASS1-VERDICT §2.6 | dispatch-homes B.0 (build-emitted by `vite.style-assets.ts:307/:366` — two sites) |
| "`@mkbabb/keyframes.js` devDep is a phantom to delete" | N.W9′ / R1-ASBUILT | w0-truth §a (glass-ui peer provision; live `/math` consumer) |
| "Retro-tag count 7" · "P/Q dirs empty" · treatment byte-sizes | pass-1 SYNTHESIS §3.1 / R1-ASBUILT | w0-truth §b.5/§b.9/§b.1 (10; absent; sizes swapped) |
| "Record `{type,defaultValue}` canonical (permanent shim)" | pass-1 SYNTHESIS §8 fallback | kf1-grammar §7 (canonizes a spec-violating parse — struck) |
| Shared-hash golden file / byte-parity precondition · stale-keyframes-dist boot diagnosis · demo-side cascade cures · WebGL overlay path · literal-sRGB contour · N.W13 interims | pass-1 (already struck at verdict) | carried struck; none re-enter |

---

## §12 — Ratification table (Q1–Q12)

Every data-armed question is now ANSWERED or reduced to a pure preference; the OPEN rows are owner-taste calls, each with a recommended default and full costing on record.

| Q | Question | Status | Resolution / recommended default |
|---|---|---|---|
| Q1 | hero-lab placement | **OPEN (preference)** | In-R as the slippable R.W5 (this spec's stance); no dependency breaks if slipped to S. |
| Q2 | Wire-deploy X2 (NCSU-alias retirement, maintainer on-host op) | **OPEN (preference)** | Record as a standing maintainer action; gate R.W7 only on X1/X3. Fire inside R.W7 if the maintainer is at the keyboard. |
| Q3 | Retro-tags | **ANSWERED** | Annotate all **10** (0.11.2→1.0.2, commits pinned — §3 R.W0 W0-9); gate = tags==registry ≥ v0.6.0; pre-modernization carve-out recorded. |
| Q4 | Pin policy | **OPEN (preference)** | Keep `file:` deps deliberately + adopt-event books + `boot-smoke` cold as the drift catch-all; record in CLAUDE.md (§3.4). The alternative (registry pin at 5.0.0) makes every glass-ui break an explicit version event at the cost of pin-theater staleness — twice disproven. |
| Q5 | Param shape | **RESOLVED** | A defect fix, not a taste question: the grammar must be fixed (the parse emits garbage on every typed param; the record-as-canonical fallback is struck). Only the field-name half was ever elective, and it folds into Q6. |
| Q6 | The 2.0.0 major | **ANSWERED** | **Bundle**: grammar fix + rename + gamut policy + preset tightening in one honest 2.0.0 at R.W1. Split (1.3.0 fix now, 2.0.0 rename later) documented as a scheduling contingency only — it forces kf to consume twice and keeps `VJS_PARAM_BUG_MAX` alive across the gap (kf1-grammar §7). |
| Q7 | U10 α setting | **OPEN (pure taste, fully costed)** | **α=1.0 recommended** (oracle-vivid pink `rgb(255,167,180)`, hue-exact, free, 4.9× under full-cusp; tiered bound: ΔL 0.050 realistic / 0.083 authored-super-gamut) vs **α=0.35 gate-strict** (ΔL <0.05 everywhere; pink 30% — under-cured). The auto-gate missed; the owner decides armed (gamut-bound §7). |
| Q8 | uSatColor escalation | **OPEN (preference)** | Hard ask — "ride 5.0.0 or name an owner" (three silent slips; §8.1). |
| Q9 | Contract-doc + fixture homes | **RESOLVED** | Fixture: value.js lands **inline in `diff.test.ts`**, read locally (zero cross-repo reads verified). Doc: stays put; value.js's in-tree deliverable is a contract-of-record note; the CONSTELLATION.md pointer + relocation are fourier-tree writes **booked to FN-7** (M4, §5). |
| Q10 | Parse-Lab | **OPEN (preference)** | Fuse into ColorInput (§2.3 stance — KISS; zero new exports needed). A dedicated pane only if arbitrary-`parseCSSValue` teaching demand is demonstrated. |
| Q11 | Overlay default lens (NEW, from the tabled default-target) | **OPEN (pure taste, argued)** | **B-with-override recommended**: default lens display-p3, captioned on the plate (`GAMUT LENS — DISPLAY-P3 / SRGB`); lens follows `selectedColorSpace` only when wide-RGB. Strict-B is the minor variant. Keyed-only (Option A) fails the treatment's own visibility premise (the shipped default space is `oklch` — the signature would never render); adopting it requires overruling the packet on the record (overlay-amendment §2). |
| Q12 | Easing riders (NEW) | **OPEN (pure taste, measured)** | R-3 tighten the 15 preset rows — **ratify** (makes the R.W4 migration sub-JND; declining leaves a recorded 2.9×-JND worst case on circ/expo); R-4 steps mode in gradient intervals — **allow** (banded gradients are a tool; pinnable via the picker's `mode` prop) (easing-disposition §4). |

---

## §13 — Pass-3 disposition

**No prototype orders are emitted.** Every load-bearing uncertainty named at pass-1 verdict is measured, prototyped, or resolved: the α bound is measured (and moved the answer to a costed choice — no further measurement changes it); the KF-1 fix is working code; the boot cure is proven across all four modes with the production dist byte-identical; the overlay geometry, budget, and render path are prototype-proven; the pure-consume thesis is proven; the fixture/doc homes are resolved on a verified decisive fact; the easing disposition is exact. The remaining open rows (Q1/Q2/Q4/Q7/Q8/Q10/Q11/Q12) are pure owner-preference choices that no prototype can decide — each carries a recommended default and its full costing above. **The specification is ratification-ready.**

**Residual risk register** (managed, not proto-worthy):
1. **Tabs migration shape** (R.W2): whether `SegmentedTabs` drop-in-covers the 10 consumers' compound-Tabs usage is unverified — but the reka-ui-direct fallback is *proven* (built both modes green), so the risk is bounded to a small API-adaptation, decided at implementation under the glass-ui-first precept.
2. **`conversions/index.ts` barrel form** (R.W1) — **ALREADY DISCHARGED (§C should-fix, verified this pass)**: `conversions/index.ts` uses **explicit named `export { … } from "./xyz-extended"`** (no `export *`), so the newly package-internal matrix exports of `xyz-extended.ts` **cannot** leak into the aggregate barrel. The pass-2 conditional risk is closed by inspection; no landing-time verification is owed (boundary-api §10.2).
3. **prophoto-rgb boundary goldens are net-new** (no prototype seed) — the property suite is the safety net (boundary-api §10.3).
4. **D8-1 landing window**: the no-shim render bar depends on BG landing a two-line mechanical fix; if the BG cut stalls past R.W3's start, the design wave proceeds on the internally-confirmed defect record with the book still open (never a gate).
5. **Q7 interacts with the boundary goldens**: whichever α ratifies, the goldens regenerate after it (sequencing locked in §3 R.W1) — an α=0.35 ratification changes the JND locus less than α=1.0 but the sequencing rule covers both.

**Process lessons (for the orchestrator + R/FINAL.md)**:
- **Cut lane worktrees from the tranche head, not an ancestor.** Recorded honestly at pass 3 (M2): the pass-2 impl worktrees split — **boot-blast (worktree-2) self-corrected to head** (`e80b359`; its §1.2 correctly names `extractFunctions` as a P/Q-era source export), but **worktrees 1 (gamut-bound) and 3 (kf1-grammar) sat at `15b0382` (1.0.2, 3 commits stale) and did NOT self-correct** (`git worktree list` verified this pass). That un-corrected staleness produced the pass's **only two integrity defects**: kf1-grammar's false "`extractFunctions` absent from source" §6 finding (its base predated the 1.1.0 landing) and this SPEC's five-section amplification of it (M1). Both carries were nonetheless sound: **the KF-1 fix carries** because its touched files are byte-identical across `15b0382..e80b359` (M2, §3 R.W1 item 2), and **gamut-bound's measurement is base-equivalent** because `gamut.ts`'s `15b0382..e80b359` delta is one appended P-era function (+61 lines, no other change) with `GAMUT_ALPHA` and the cusp core **untouched** — nothing the measurement exercises re-runs. The general rule: when parallel lanes disagree on a tree fact, the synthesizer resolves it against the **live tree** before elevating either claim — cross-lane reconciliation is a synthesis obligation, not an optimization. *(At pass-3 time worktree-3 has since been advanced to `e80b359` for L2's M3 head re-run; worktree-1 remains at `15b0382`.)*
- **Impl-lane reports written inside worktrees must be hoisted before cleanup** (R.W0 W0-14).
- Prototype lanes may legitimately re-frame their charters against binding contracts (the pass-1 golden-vectors precedent) — and pass-2's gamut-bound shows the complement: a bounding measurement may *overturn* the dissent that commissioned it, and the honest response is to revise the headline, not defend it.
