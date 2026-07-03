# PASS1-VERDICT — Tranche R, Pass-1 agglomeration

**Synthesizer**: Fable (pass-1 final synthesis) · **Date**: 2026-07-02 · **Branch**: `tranche-q` @ `e80b359` (1.2.0)
**Inputs**: `SYNTHESIS.md` + 5 prototype reports (`scratchpad/pass1/proto-*.md`) + 6 critiques (`CRIT-*.md`) + independent spot-verifications (this pass re-verified the easing catalogue count at `demo/@/components/custom/gradient/composables/useGradientModel.ts:57-82` = **24** and the git-tag/registry gap = **10** untagged post-`v0.11.1` versions).

---

## §1 — Convergence scoreboard

| Item | Convergence | Standing |
|---|---|---|
| SPEC (SYNTHESIS.md) | 88% | Structurally ratifiable; 3 must-fix (1 substantive: KF-1 is a grammar BUG) |
| proto-gamut-policy | **84% ← MINIMUM (loop gate)** | Verdict (α=1.0) holds; 1 factual mislabel + 1 unbounded safety claim |
| proto-gamut-overlay | 88% | Budget + render path discharged; 1 zero-drop breach + 1 design tension unsurfaced |
| proto-boot-cascade | 88% | Both defects proven live; cure blast-radius unverified across 3 of 4 build modes |
| proto-glassui-consume | 90% | Pure-consume thesis robust; 4 precision fixes |
| proto-golden-vectors | 89% | Reframing correct; fixture-location over-decides open Q9 |
| **MEAN** | **87.8%** | |
| **MINIMUM** | **84%** | governs the loop — Pass 2 required |

No prototype's *verdict* was overturned by its critic. Every deduction is precision, bounding, or disposition work — the shape of Pass 2 is **burn-down and amendment, not re-derivation**.

---

## §2 — What Pass 1 PROVED

Each row survived independent critic re-verification against the live trees.

1. **U10 cure = `GAMUT_ALPHA 0.05 → 1.0`, one constant, unchanged algorithm** (`src/units/color/gamut.ts:242`). Hue held 0.000° across the family; pink `lab(92% 88.8 20)` lands `rgb(255,167,180)` (17%→39% chroma retention), squarely between the pale current and the hue-broken browser — the oracle's "land between" (`N.W11.md:170-174`). Zero cost (≈0.9× — marginally faster). Critic re-ran `probe.mjs`; §2/§3 tables reproduce to the digit.
2. **MINDE §13.2 unification REJECTED twice** (5.9× cost; 7.4°/3.3° hue drift — violates the mandatory hue-hold). §13.2 survives as the *test oracle* only. **Gamut-relative adds no mechanism**: c1 (const-L clip, 27% ret) is *worse than the defect*; c2 is byte-identical to full-cusp (which pays ΔL=0.133 on mid/dark, 5.5× the damage). (a) subsumes (c) — R-8 stays deferred.
3. **The gamut-overlay budget holds with ~7× headroom** (0.3 ms unthrottled total; 1.6 ms worst-case at 4× CPU throttle vs the <2 ms budget; zero dropped frames at 120 Hz with all three paths live). **Render path: 2D canvas** — only path supporting luma-adaptive dual-ink hatch; clip-path ink disappears on dark fields; WebGL requires a GLSL Ottosson port for correctness a 0.02 ms canvas makes pointless.
4. **Overlay geometry corrected twice** (verified sound by the critic): F1 — the treatment's literal "sRGB boundary over the sRGB-native square" is **vacuous** (the HSV square is a bijection of the sRGB cube; `SpectrumCanvas.vue:208-224` confirmed algebraically exact HSV); the non-vacuous instrument strokes where a **wide target** (display-p3/a98/rec2020) leaves sRGB. F2 — the honest contour is the **ΔE>JND locus** (`gamut.ts:55`), not raw membership; and it is the *same field* the §2.3 ColorInput gamut-verdict echo consumes — one computation, two consumers, vindicating the O.W7 fuse.
5. **Demo boot break: root pinned and cured.** NOT a stale keyframes dist (R7 §1 REFUTED — file present, versions matched at 5.1.0). Root = the `vite.config.ts:50` self-alias is a **prefix rewrite** that mangles the new `@mkbabb/value.js/math` subpath import into `dist/value.js/math` ("Not a directory"). Array-form regex aliases mirroring the exports map cure it — proven green under `npm run dev` (zero page errors).
6. **The 1440 dual-pane defect is LIVE and its cascade root is D8-1, mechanically pinned.** Both `.pane-wrapper`s `display:none` at 1440; the `.w6a-audit.mjs` shim is load-bearing. Root: `glass-ui/dist/styles/index.css:258` imports `components.css` (51 KB of bare Tailwind utilities) **unlayered**; unlayered beats all `@layer`'d rules, so glass-ui's `.hidden` annihilates the demo's layered `lg:flex`. **Every demo-side cure REFUTES** (full-import `layer()` and standalone `@layer` order statements both break Tailwind v4 `@utility text-mono-small` registration). The cure is a **one-line glass-ui producer fix**: `@import "./components.css" layer(components);` — proven by faithful vendored simulation (visibleCount 2, fonts true, zero errors, `scratchpad/CURED-1440.png`).
7. **The N.W13 pure-consume premise is TRUE — zero interims.** All four controls sites carry as pure consume against the shipped 4.2.0 dist: spectrum slider variant (thumb-live-color = a token feed by producer design), SelectTrigger font-rung (cures the 1.59× desync), bounded SelectContent + specimen rows via slot + WatercolorDot, `/easing` `<EasingConfigurator>`. ComponentSliders lands ≤400 LoC **by construction** (~250 of the 418-LoC breach internalized by `glass-ui/slider`). The strongest confirmation of SYNTHESIS §2.4's no-interims stance.
8. **The shared-hash golden file is impossible AND contract-forbidden**; the correct R.W6 deliverable is a **wire-envelope SHAPE fixture** (J-diff-shape §3/§4). Two serializer divergences are irreducible (Python/JS integer-float repr `1.0`→`"1.0"` vs `"1"`; negative zero), the set-hash constructions differ structurally (64-hex pipe-join vs 16-hex JSON-array — demonstrated DIFFER on identical inputs), and §6 BINDING forbids cross-asserting outputs. Bonus: `api/test/conformance/diff.test.ts` **already implements** the §6 discipline in-tree — R.W6 shrinks to "add fixture rows to the existing probe."
9. **KF-1 is a live GRAMMAR BUG, not a field rename** (the SPEC critic's substantive catch, proven against both trees): `src/parsing/stylesheet.ts:637-659` colon-splits the spec form `--x <length>: 0px` into `{name:"--x <length>", type:"0px"}`; kf's `resolve-function.ts:22-90` documents and string-surgery-recovers exactly this (`VJS_PARAM_BUG_MAX = "1.2.0"`). A rename alone cannot unblock `normalizeParam` deletion.

## §3 — What Pass 1 REFUTED

| Refuted claim | Where it lived | Killed by |
|---|---|---|
| "Stale sibling keyframes dist" boot diagnosis | R7 §1, SYNTHESIS §10 | proto-boot-cascade §1.2 |
| "Byte-identical canonical-JSON cores are the fixture precondition" | R4 §4, SYNTHESIS §10 row | proto-golden-vectors (contract §6 + Findings A/B) |
| "Gamut-relative might structurally subsume the α-tune" | SYNTHESIS §10 table | proto-gamut-policy §5c |
| The literal sRGB contour, raw-membership locus, yellow-balloon/blue-flood hues, on-plate cusp marker | `color-picker.md` :13/:126/:130 | proto-gamut-overlay F1/F2/F3/F6 |
| WebGL as the overlay render path | open question | proto-gamut-overlay F4 |
| Demo-side cascade cures (@layer wrap / order statement / source order) | task hypothesis | proto-boot-cascade §3.2 |
| "The parse is correct, only field names differ" (KF-1 as rename) | R5 §B, SYNTHESIS §3.1/§8 | CRIT-SPEC §1.1 |
| §8 KF-1 fallback ("RECORD {type,defaultValue} canonical") | SYNTHESIS §8 | struck — would canonize a spec-violating parse (NO-legacy at contract level) |
| N.W13 "interims required" premise | N.W13 | proto-glassui-consume |
| "The `dispatch.ts:371` bisection ≡ CSS §13.2 MINDE" | proto-gamut-policy §1/§5b | CRIT-gamut-policy #1 (it is hold-L/H chroma-reduce ≈ variant c1 — REJECT holds, for the c1-washout reason) |

## §4 — What Pass 1 left OPEN

1. **The α=1.0 mid/dark safety claim is sampled, not bounded** — guard band caps at C=0.32; worst-case realizable OOG chroma is C≈0.37–0.40, where the α·C anchor pull is 1.25× the sampled point. (Also: the "1.0 is the natural knee" plateau is asserted, not shown — no α∈{1.5,2.0} rows.)
2. **The boot cure's blast radius** — `resolve.alias` sits in `defaultOptions` spread into ALL FOUR modes (`vite.config.ts` production:125, hero-lab:204, gh-pages:232, dev:273); only `dev` proven. `npm run build` + `npm run gh-pages` unverified.
3. **The `sRGB ⊣` snap-resist beat** (`color-picker.md:113/:126/:141/:150`) — trigger vacuous under the wide-target reinterpretation; needs re-spec (resist at the JND contour, target-named label `p3 ⊣`) or a recorded kill.
4. **Overlay default-target** — keyed to `selectedColorSpace` (signature invisible in the default sRGB state — the "one unforgettable thing" becomes an easter egg) vs a display-p3 instrument default. F3 measurements (p3: red 74.7% / magenta 82.7% / blue 0.0%) are the evidence base.
5. **The KF-1 grammar fix itself** — diagnosed, not prototyped; the whitespace-separated `<css-type>` grammar + Q5/Q6 re-framing (grammar-fix ≈ patch-arguable; rename = the true BC break) awaits a working parse.
6. **The easing-catalogue drop** — **13 of 24** `GRADIENT_EASING_NAMES` (sine/circ/expo/back ×3 + `smooth-step-3`; count re-verified this pass) are not bezier/steps-representable; the author-a-curve model change needs an explicit zero-drop ratification (accept-and-record vs producer preset-seeding relay ask).
7. **§11-Q9 fixture + contract-doc home** — the proto's fourier-tree recommendation contradicts SYNTHESIS §5/FN-6 ("value.js LANDS the fixture") and pre-decides the open question; demoted to a tradeoff (see §6 dissent).
8. **R.W2's dual-pane gate has an EXTERNAL dependency** the synthesis booked as internal — the cascade cure is glass-ui-owned; until the producer ships `layer(components)`, R.W2 cannot honestly retire the w6a shim. Relay timing (now, to the executing BG agent, vs at R.W7) is undecided.
9. **`sampleGamutBoundary` landing** — F8.1's either/or (export matrices vs ship the API) must commit to the API and name its wave (R.W1 2.0.0 cut vs R.W3).
10. Ratification questions Q1–Q4, Q8, Q10 — untouched by pass 1 (Q7 is now data-armed: α=1.0 vs full-cusp, guard band says α=1.0; Q5/Q6 re-framed per §2.9).

---

## §5 — Consolidated mustFix backlog (deduped, prioritized)

**P0 — verdict/gate-bearing (block ratification of their lane):**

| # | Fix | Source | Owner-lane |
|---|---|---|---|
| 1 | Re-spec §3.1 R.W1 / §8 KF-1 as **grammar-fix + rename** (`stylesheet.ts:637-659` mis-split; spec vector `--x <length>: 0px`); **strike the §8 fallback**; re-frame §11-Q5/Q6 on the fix(patch)/rename(major) split | CRIT-SPEC 1.1 | SPEC-v2 + seed 3 |
| 2 | **Bound** the α=1.0 mid/dark safety claim: extend the corpus to C≈0.37–0.40 at L∈{0.30,0.35,0.50,0.65}; add α∈{1.5,2.0} plateau rows; pass if worst-case ΔL < ~0.05 | CRIT-gamut-policy 2 (+should-fix 1) | seed 1 |
| 3 | Verify the array-alias cure under `npm run build` + `npm run gh-pages` (+ hero-lab) — all four modes inherit it via the `defaultOptions` spread | CRIT-boot-cascade M1 | seed 2 |
| 4 | Re-specify or kill the `sRGB ⊣` snap-resist beat; **table the default-target question** for R.W3 ratification with F3 evidence | CRIT-gamut-overlay 1+2 | seed 4 |
| 5 | Ratify the easing model change with the precise drop: **13 of 24** named easings (incl. `smooth-step-3`) | CRIT-glassui-consume 2 (+1) | seed 6 |

**P1 — spec-integrity (must land in SPEC-v2 before tranche ratification):**

| # | Fix | Source |
|---|---|---|
| 6 | Retro-tag count **7 → 10** (add v0.13.0, v1.0.1, v1.0.2 — publish commits exist at `f1d9bab`/`15b0382`); scope the W0 gate to "tags == registry ≥ v0.6.0" with the pre-modernization carve-out (11 registry versions 0.1.0–0.5.1) recorded | CRIT-SPEC 1.2 (re-verified this pass) |
| 7 | Close the §9 zero-drop breach: **U6 → BOOK** (glass-ui 5.0.0 dock-fission verify), **U8 → R.W3** (bounded-Select consume) — named rows, not implications | CRIT-SPEC 1.3 |
| 8 | Correct proto-gamut-policy §1/§5b: `dispatch.ts:371` `gamutMapToRgbSpace` = hold-L/H chroma-reduce bisection (≈ variant c1, the washout) — NOT §13.2 MINDE (variant b). Both lose to α=1.0; the labels must be right for the implementer | CRIT-gamut-policy 1 |
| 9 | Demote the golden-vector fixture location to a **Q9 tradeoff**; honor SYNTHESIS §5/FN-6 default ("value.js lands the fixture"); rescope R.W6 to "add fixture rows to the existing `api/test/conformance/diff.test.ts` probe" | CRIT-golden-vectors 1+3 |
| 10 | Commit F8.1 to `sampleGamutBoundary(hueDeg, target, {columns, mode})` in `src/units/color/` (+ zero-alloc `Into` variant) and name its landing wave | CRIT-gamut-overlay 4 |
| 11 | Amend the R.W2 gate: the cascade cure is a glass-ui relay (external); R.W2 lands the boot fix + confirms the defect; add the D8-1 producer item to the §7 relay letter and decide dispatch timing | proto-boot-cascade §3.3 (critic-endorsed) |
| 12 | Document the boot-cure regex ↔ exports-map coupling (or resolve through package exports); state explicitly the cure is **dev-config-only** (no dist change, no republish) | CRIT-boot-cascade M2+M3 |

**P2 — precision/citation (sweep in the respective doc amendments):**

| # | Fix | Source |
|---|---|---|
| 13 | Easing catalogue count 23 → **24** (`useGradientModel.ts:57-82`, re-verified) | CRIT-glassui-consume 1 |
| 14 | F5 luma threshold: source `SpectrumCanvas.vue:230-231` uses **0.5**, sandbox used 0.45 — adopt 0.5 or justify; F8.1 line cites 44→46, 85→88 (`conversions/xyz-extended.ts`) | CRIT-gamut-overlay 3 |
| 15 | `ColorSpaceSelector.vue` cite: `:17` is `variant="ghost"` (already present — a no-op restatement); the font override is `:18-19`; net-new is only `size="display"/"audacious"` | CRIT-glassui-consume 3 |
| 16 | `v-model:EasingPickerValue` → "default `v-model`, typed `EasingPickerValue`" (`EasingPicker.vue:80` is `defineModel<EasingPickerValue>()`) | CRIT-glassui-consume 4 |
| 17 | Reword "latent value.js self-bug" → refactor-time key-order fragility (projection keys hardcoded, `hash.ts:9-15/27-30` — not runtime-reachable) | CRIT-golden-vectors 2 |
| 18 | SPEC should-fixes: watercolor-swatch disposition → "consume `WatercolorDot` ghost or delete" (never define-in-demo); P/Q dirs "do not exist" (not "empty"); GAP-3 = "root + 15 subpaths" (16 specifiers) | CRIT-SPEC §2 |
| 19 | gamut-policy minors: present cost as ratios (ns are machine-variable); cite drift (`constants.ts:431`, `gamut.ts:246`) | CRIT-gamut-policy should-fix |
| 20 | proto-glassui-consume title → "R.W3/W4 controls lane" (site 4 is R.W4 per §9); add the "/easing books into the GAP-3 5.0.0 subpath watch" line | CRIT-glassui-consume 5+6 |

---

## §6 — Overrules / recorded dissents

**No critic verdict is overruled.** All six critiques stand; their mustFixes are absorbed above. Two premises are partially dissented, recorded so Pass 2 argues them honestly:

1. **CRIT-golden-vectors' fragility premise is overstated, its conclusion still right.** The critic argues a cross-repo relative-path read "breaks the moment repos aren't checked out as siblings" — but the constellation's dev graph *already* hard-assumes sibling checkouts (`file:../glass-ui`, `file:../keyframes.js` in `package.json`), so the marginal fragility is smaller than claimed for dev. The differential that DOES bite is the **api test suite** (`api/test/` must run where fourier may not be checked out — CI, isolated clones). The demotion-to-Q9-tradeoff stands on the stronger grounds (contradicts SYNTHESIS §5/FN-6; pre-decides an open ratification question); Pass 2's Q9 packet should weigh the *test-isolation* argument, not the dev-checkout one.
2. **CRIT-gamut-policy's must-fix 2 is accepted as a bounding requirement, not as doubt about the verdict.** The self-limiting mechanism (α enters only as α·C centered at L=0.5) is confirmed by the critic itself; linear extrapolation of the anchor pull at C=0.40 is 1.25× the C=0.32 sample — worst-case ΔL plausibly ≈0.03, far under full-cusp's 0.133. Pass 2 measures it because "bounded beats sampled" for a published-output change, not because α=1.0 is in question. If the measurement lands <0.05 the R.W1 head ratifies as-specced with zero text changes beyond the corpus row.

One synthesis-level correction Pass 1 itself surfaced and this verdict adopts: **the SYNTHESIS §10 work-order for proto-golden-vectors carried R4 §4's false premise** ("cores must be byte-identical"); the prototype refuted its own charter's framing and delivered the correct deliverable anyway. That is the desired failure mode — record it as precedent that prototype lanes may re-frame their charters against binding contracts.

---

## §7 — NEXT-PASS SEEDS (Pass 2 lane charters)

1. **gamut-bound**: Extend `scratchpad/pass1/probe.mjs` with (i) a max-chroma guard band C∈{0.37,0.40} × L∈{0.30,0.35,0.50,0.65} × 12 hues and (ii) α∈{1.5,2.0} plateau rows; re-run; BOUND worst-case mid/dark ΔL at α=1.0 (ratify-if <0.05) and PROVE the α=1.0 knee. Correct the report's §1/§5b labels: `dispatch.ts:371-446` `gamutMapToRgbSpace` is a hold-L/H chroma-reduce bisection (≈ variant c1), NOT CSS §13.2 MINDE; present costs as ratios. Output: amended proto-gamut-policy v2, ratifiable as the R.W1 head.
2. **boot-blast-radius**: In the boot-cascade worktree, prove the array-form alias cure green under ALL FOUR vite modes (`npm run build`, `npm run gh-pages`, hero-lab, dev) — `resolve.alias` lives in the `defaultOptions` spread (`vite.config.ts:27→125/204/232/273`). Decide regex-vs-exports-map resolution (justify the hand-rolled regex or resolve through value.js's own exports map) and document the coupling. Record the cure as dev-config-only: no dist change, no republish, decoupled from any publish gate.
3. **kf1-grammar**: Prototype the `parseFunctionParameters` grammar fix (`src/parsing/stylesheet.ts:637-659`): whitespace-separated `<css-type>` after `<custom-property-name>`, single top-level colon → default, per CSS Functions & Mixins L1. Test vector `@function --f(--x <length>: 0px)` → `{name:"--x", syntax:"<length>", default:"0px"}`. Confirm against `keyframes.js/src/animation/resolve/resolve-function.ts:22-90` that `normalizeParam` becomes deletable. Re-frame §11-Q5/Q6: grammar fix (changes garbage output — patch-arguable) vs field rename (the true BC break) — table for the 2.0.0-vs-1.3.0 ratification.
4. **overlay-amendment**: Author the `docs/frontend-design/color-picker.md` amendment packet: (a) re-spec the snap-resist beat (:113/:126/:141/:150) as resist-at-the-JND-contour with a target-named label (`p3 ⊣`) OR record its kill; (b) table the default-target decision — `selectedColorSpace`-keyed vs display-p3 instrument default — with F3 evidence (p3: red 74.7%, magenta 82.7%, blue 0.0%); (c) rewrite the breathing narrative hues (red/magenta flood; blue vanishes — absence is content, caption it); (d) sweep F5 threshold (adopt source 0.5 or justify 0.45) + F8.1 line cites (46/88).
5. **boundary-api**: Spec `sampleGamutBoundary(hueDeg, target, {columns, mode})` + the zero-alloc `Into` variant as engine-owned surface in `src/units/color/` beside `gamut.ts`: exact signature, return shape, token-free (demo owns paint), whether `xyz-extended.ts` matrices stay module-private, and the landing wave (recommend R.W1 — it is a library API riding the 2.0.0 cut; R.W3 consumes).
6. **easing-disposition**: Ratification packet for the site-4 model change: 13 of 24 `GRADIENT_EASING_NAMES` (sine/circ/expo/back ×3 + smooth-step-3; `useGradientModel.ts:57-82`) are not bezier/steps-representable by `EasingPicker` presets. Decide: accept the author-a-curve upgrade with a recorded drop disposition, OR relay-ask a producer preset-seeding prop (external catalogue / initial `fn`). Fix the report's count (24), the ghost-variant no-op note (`ColorSpaceSelector.vue:17` vs `:18-19`), and the `defineModel<EasingPickerValue>()` notation.
7. **q9-home**: One decision packet resolving §11-Q9 for BOTH artifacts (contract doc + fixture): value.js-lands (SYNTHESIS §5/FN-6 default; existing `api/test/conformance/diff.test.ts` already owns §3/§4 assertions) vs contract-adjacent in fourier's tree vs constellation-neutral home + CONSTELLATION.md pointer. Weigh **test-suite isolation** (api CI without sibling checkouts), not dev-checkout fragility (already assumed by `file:` deps). Rescope R.W6 wording to "add fixture rows to the existing probe."
8. **spec-v2**: Mechanical SYNTHESIS-v2 amendment batch: KF-1 grammar+rename re-spec + fallback strike (seed 3's framing); retro-tags 7→10 + gate scoped ≥v0.6.0 with the pre-modernization carve-out; §9 rows U6→BOOK/U8→R.W3; watercolor-swatch → "consume WatercolorDot ghost or delete"; GAP-3 "root + 15 subpaths" (16 specifiers); P/Q dirs "do not exist"; R.W2 gate external-dependency amendment; the R7 §1 diagnosis correction recorded.
9. **cascade-relay**: Decide dispatch timing + draft the D8-1 relay item to the EXECUTING glass-ui BG/BH agent: `src/styles/index.css` → `@import "./components.css" layer(components);` (one line; zero collateral — no `@utility`/`@theme` in that file; proof: vendored simulation, visibleCount 2 at 1440). R.W2's no-shim gate depends on it — argue for early dispatch (BG is live NOW) vs the R.W7 letter, and re-scope the R.W2 gate accordingly.
10. **w0-truth**: Fold the boot-cascade caution into R.W0/R.W2 wording: the `@mkbabb/keyframes.js` devDep is a LIVE transitive consumer of value.js's `/math` subpath through the demo graph (NOT inert) — the verify-then-disposition must account for it; verify nothing else in the W0 sweep list moved (the tree is 3 weeks past R1's inventory).
