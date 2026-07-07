# T — SYNTHESIS: the converged specification

**Tranche**: T (the owner-mandate design tranche: material + type + boot + colocation + packets)
**Status**: DEVELOPMENT ARTIFACT — this document is the governing spec of the T corpus, authored
at the Fable/frontend-design bar from the 36-lane audit fleet. It STOPS at the owner ratification
gate (mandate E-6); the wave plan in §3 executes only post-ratification.
**Substrate**: `tranche-t` @ `b7526e5` = master `cc4f4fa` (tag `tranche-s-close`); source tree
byte-identical across `cc4f4fa`/`5bb2d59`/HEAD (docs-only delta, re-verified by t-plan-audit-1/2,
t-deferred-census). Producer read-only: `../glass-ui` @ `19ddbd71` (`tranche/BG`, labelled 4.2.0;
consumed dist is a gitignored local build ~1 day stale — G-CUR-1); `../keyframes.js` @ `5addc4a`.
**Precedence**: `MANDATE-2026-07-06.md §0` + addenda §0.1–§0.4 are VERBATIM LAW and win over every
lane and over this synthesis. The S SYNTHESIS is the structural precedent; the precept slate is
`t-precepts-recap.md §A–§E` (PP-1..PP-16 · PR-1..PR-8), lifted into the T charter verbatim.
**Evidence base**: `audit/lanes/*.md` (36 lanes, each cited by name below) · `S/FINAL.md §5/§7` ·
the owner shots at `audit/owner-screenshots/` (shot↔finding map re-derived — §1.0).
**Pass-2**: amended per the 3-critic review 2026-07-07 — both mustFix folds + 11 shouldFix folds,
marked AMENDED-AT-PASS-2 where substantive; dispositions that changed nothing are in §9.

**One-line thesis** (t-plan-audit-2 §7, verified across the fleet): *S built to a moving target and
certified taste by proxy; T re-aims at the owner's target, retires the old specs by name, replaces
taste-by-proxy with taste-by-ratification, mints the population/real-path oracles S lacked, and
executes the colocation grand edict as the structural spine.* The 24+5 owner findings are not fresh
defects — they are the long-deferred design body (N's U1–U33 lineage, t-prompts-recap F6) finally
getting its execution tranche, plus a Class-B set of owner reversals of gate-green S work that must
be encoded as SPEC RETIREMENTS, never re-litigated as bugs.

---

## §1 THE RECONCILED FINDING→ITEM MAP

### §1.0 The shot-map corrections (binding; the mandate's map was best-effort)

Three lanes independently re-derived and CONVERGED (t-plan-audit-2 §3.1, t-misc-elements §0,
t-title-typography §0, t-blob-hero §0): a contiguous **+1 mislabel** across `t-2002-09` →
`t-2004-32`. The corrected map of record: `t-2002-09` = **T-7 readout** (dominant) + a T-6 netting
sliver · `t-2002-52` = **T-8 blob** (burial at the About host) + T-2 bold title + T-3 transparency
· `t-2004-10` = **T-9 banner** · `t-2004-32` = **T-10 nav legend** · `t-2004-55` re-anchors (T-11).
Also: `t-2000-41` = the **T-5 sliders surface** (range captions); `t-2001-51` = the spectrum plate
caption (T-4's twin fault-class); `t-2000-27` = the picker's own gamut-lens caption strip, not the
About card (t-card-material T-CM-7). Every anchor below uses the corrected map.

### §1.1 The owner-overrule reconciliations (the spec-retirement ledger — E-3 binds; from t-contradictions §1/§2)

Every row is a ratified S spec/ruling/π-certification the owner reversed. Each is RETIRED BY NAME
here so no future audit "restores" it. Class labels per plan-audit-2 §0 (A defect-in-green-gate ·
B owner overrule · C recorded miss · D scope gap).

| # | Finding vs landed spec | Precise class | What RETIRES | What SURVIVES (E-3 must not over-delete) |
|---|---|---|---|---|
| R1 | **T-10 vs W7-4** color-wheel-legend menu (`DockViewSelect.vue:41-45`, `33ba703`) | OVERRULE, **PARTIAL** | `entryAccent` per-row hue + `resolveViewAccentTokens`/`PRIMARY_VIEW_SHIFTS`/`PRIMARY_VIEW_IDS` (sole consumer dies) + the dot column | `resolveViewAccent` (current view), `resolveSealInk`, `--accent-view` trigger/ring/`--primary`, the `@property` sweep, the WCAG math |
| R2 | **T-23 vs the W5-2 rider** zero-at-rest veil (`PaneHeader.vue:76`; `w5a-after/DELTA.md:25`) | RECALIBRATION of an over-rotated cure (NOT a flip-flop — t-header-shading §1) | the `opacity:0`-at-rest clause; "material earns existence by scroll" | the FEATHER (the band-killer), the scroll modulation. DELTA.md:25 + the S.W5 rider row get supersession annotations (record repair) |
| R3 | **T-8 vs W6-4** corner-break/overflow law (`ColorPicker.vue:344-375`, `d843ae7`) | OVERRULE **+A** (the burial W6-4 claimed to kill persisted at the About host — shot t-2002-52) | center-on-radius-origin + ≥25%-overflow-per-broken-edge + the <lg 8rem hand arm | Q7 full presence · slot-owned anchor/footprint token · the reservation mechanism (re-derived) |
| R4 | **T-2/T-7 vs W4-1/W4-2** (`ColorSpaceSelector.vue:35` `size="audacious"`; `ColorComponentDisplay.vue:12` full-span) | T-2 RECALIBRATION **+ a latent BUG** (About host inherits weight **700** — S-21 broken on the weight axis, t-title-typography F2); T-7 OVERRULE | the audacious-rung size BASIS; the full-span + per-cell `ch` reservation; the W4-2 gate text "Lab inks ONE line at 1440" | the four-state ink grammar, the card-lock GOAL (re-earned at tuple/line level), the specimen catalog rows |
| R5 | **T-6 vs W5-8** "subtle" webbing register (`style.css:254-261`, `gamut-ink.ts:29-36`) | RECALIBRATION (intensity only — the cleanest of the set) | the 9%/12% intensity values | the ONE-home facility, the DPR raster, the token architecture (the ruling-6 cures stack, unopposed) |
| R6 | **T-26 vs rulings 3+6** (analogous/0.7, `panes/keys.ts:46-47`, `fe30d68`) | THIRD calibration — the bracket CLOSES: (analogous±28°, 0.7) too muted ← target → (triad, 0.82) too strong | both point values as targets | the derive mechanism. **The bracket becomes the producer sizing spec** (packet P1). **BLOCKED-FOR-HONEST-JUDGMENT on the GAP-ARM demo-half cure** (C4) |
| R7 | **T-13/T-19 vs S.W5-6 F1/F2/F3 + Q6** (kills `e43601c`+`a34d20f`; the `specimen` register shipped ZERO consumers) | OVERRULE-on-material, UPHOLD-on-semantics (unlisted by mandate §3) | the material amputation; Q6's true-empty-ONLY scope for palette-shaped surfaces | "never announce work that isn't happening" (F-5 aria split); error ≠ empty; the loading-lie cure — re-cut on the MOTION axis (§2.7) |
| R8 | **T-3/T-11/T-18/T-24 vs W5-2/S-20** `bg-card/75` as "the one card species" | OVERRULE of a DEFINITION (unlisted) | the S-20 species definition | the one-species GOAL — re-grounded at the picker's `resting`+cartoon rung (§2.1) |
| R9 | **T-28 vs W7-1's π-certified "INTENTIONAL" rim** (`Dock.vue:330-338`, `96a12ed`) | OVERRULE of a taste certification + A (rim on the WRONG element — geometric parent circle vs seeded organic wax, crosses +1.5px / gaps −2.5px by construction) | the `.dock-seal` die-rim + gold border override; the "hairline as continuity carrier" clause | the wax + inked-glyph identity; W7-1's continuity re-carried by the GLYPH; the `--dock-ring` on the geometric expanded trigger |
| R10 | **T-9 vs W0-1 seed-rider-1** (DevMisconfigBanner, `App.vue:115`) | OVERRULE of PRESENTATION only | the banner FORM (fixed red bar, z-9999, dock-overlapping) | the ENTIRE W0-1 contract: transport latch, synchronous `DevMisconfigError`, loud `console.error`, misconfigured ≠ unavailable, REJECTED-localhost-CORS |
| R11 | **T-1 vs GAP-ARM + W6-1** | **NOT an overrule** — FOLD-FORWARD (C, producer replay) + NEW BUG (A, demo hydration order, un-recorded by S) + SCOPE-WHOLE (D, boot quality). Mis-filing it as taste would bury a live prod defect | — | W6-1's entrance clause, RESTATED over the terminal state (material-invariance of the load, LS-8) |

**Class census** (plan-audit-2 §8.6): B/overrule = T-2, T-6, T-7, T-8(seam), T-10/17, T-23, T-26 +
seams in T-13/T-28 · A/green-gate-defect = T-3/11/18/24, T-5(contrast), T-12, T-13/19(dead code),
T-14, T-15, T-16, T-21, T-28(geometry), T-29 + F12's demo half · C/recorded = T-20, the producer
halves of T-8/T-26, GAP-* · D/scope-whole = T-4, T-22, T-27-quality. The A-set indicts the S
**verification method** (named-site-not-population; proxy predicates) → §6 exists to fix it; the
B-set indicts nothing — it is taste evolution, encoded above.

### §1.2 The finding→wave-item map (T-1..T-29 + the load-bearing fleet finds)

Wave IDs per §3. Gate shapes reference §6 oracle numbers [O-n].

| T-# | Finding (one line) | Owner | Wave item | Load-bearing anchors | Evidence lanes | Gate shape |
|---|---|---|---|---|---|---|
| T-1 | Cold-load arrival out of sync; field arrives as the WRONG material | joint | **W2-1/W2-2** (demo) + packet P1 (producer) | `App.vue:181/221/298-299` (derive-before-hydrate); glass-ui `useAurora.ts:228/262` (arm gap); `ColorPicker.vue:379-399` | t-load-sync LS-1..LS-8, t-aurora-boot F-1/F-3/F-5, plan-audit-2 F12 | O-1 color-truth + O-2 real-hydration + O-3 headed GPU probe + O-4 order-invariance (PP-9 binds) |
| T-2 | Titles → ×φ (two token steps), non-bold | demo (+P10 joint) | **W4-1** | `ColorSpaceSelector.vue:35,37` (no weight utility → About inherits 700); `PaneHeader.vue:12,122-129` | t-title-typography F1-F3/F8, t-mobile F-4 | O-10a host-independence census; height gate vs `--content-max-h` @900px; mobile matrix (About = honest 2-line <sm) |
| T-3 | About card too transparent — "more cartoon, like the picker" | demo (+P3) | **W3-1** | `AboutPane.vue:3` `tier="wash"` (α .356/.430, blur 1px) vs `ColorPicker.vue:6` `resting` | t-card-material T-CM-1, t-card-color-census A2 | O-7 card-material census, both schemes, 390-band frame |
| T-4 | Bottom text area made DYNAMIC → the channel strip (name·signal·meter) | demo | **W4-3** | `ComponentSliders.vue:49-51` static ranges; `:88-94` hover-jailed live value | t-misc-elements F1, plan-audit-2 F5 | live-meter presence assert + O-18 contrast rung |
| T-5 | Sliders: certified contrast + vertical dock-ring + console sub-card | joint (S-3 packet P5 + demo now) | **W4-4** (ink+console+glyphs now; ring interim → producer consume at W7) | `ComponentSliders.vue:171-182,337,343-350`; `useContrastSafeColor.ts:17-18` (the false referent); measured 1.01:1 dark | t-sliders-hierarchy F-1..F-6, t-a11y-contrast F-1, t-mobile F-5 | O-18 population contrast census; touch rung ≥44px at <lg; ONE active indicator |
| T-6 | Gamut netting more visible | demo | **W6-1** | `style.css:254-261` (9%→22% fg / 12%→28% bg / edge 45%/65% / 1.25px); `gamut-ink.ts:29-36` lockstep | t-gradient-surfaces §1 | O-19 luma-delta floor (≥59/255 L, ≥45/255 D); re-judged on the post-W3 plate (R5 note) + at 390 plates |
| T-7 | Readout ×φ, contiguous tuple | demo | **W4-2** | `ColorComponentDisplay.vue:12,21`; `readoutReservation.ts:55-89` (20ch → 12.36ch at ×φ); tnum is a NO-OP on Google-served Fraunces (F5) | t-title-typography F4-F6, t-mobile F-4 | O-10b per-space line-count locks (all 17+hex) + O-10c tnum digit-advance; reservation re-scope is a PRECONDITION at 390 |
| T-8 | Blob: THE SEAT (into card, down+left, higher-z, no clip, all sizes) + hover/satellite work | joint | **W4-5** (seat/z/beats demo) + **W2-4** (emerge beat) + packet P6 (engine) | `ColorPicker.vue:344-375` (dies); `HeroBlob.vue:26-28` (no `@mouseleave`), `:156-171` (wall-clock park); orbit-reach 0.49 ≤ 0.5 containment identity | t-blob-hero §2/§3/§4, t-mobile F-3, perf PI-3/PI-4 | O-12 seat identity + occlusion + hover-delta + hover frame budget; mobile gate RE-DERIVED from the seat formula (PI-4 hard prerequisite) |
| T-9 | Banner REMOVED + the backend question answered | demo (banner) · maintainer (X1) · api (hygiene) | **W6-6** (lamp re-home) + W9 residual (X1) + **W1-api** (TA-4) | `DevMisconfigBanner.vue` + `App.vue:115`; `ApiOfflineChip.vue:57-79`; prod I-era ×7 markers, `publish`/`unpublish` 404 LIVE | t-misc-elements F3, t-api-state TA-1..TA-7, plan-audit-1 F2/F6 | O-22 lamp oracle; O-25 prod-lineage assert; W0-1 contract byte-preserved |
| T-10 | ONLY Palettes rainbow; menu goes ink | demo | **W6-4** | `DockViewSelect.vue:41-45,103-114`; survives/dies per R1 | t-nav-dropdowns F1-F4 | O-13 view-accents oracle SLIMS in the same commit (AT-RISK row); Palettes form = **Q5** |
| T-11 | Another card too glassy (My Palettes) | demo | **W3-1** | shot t-2004-55; pane wash + `.input-bar` floating slabs | t-card-material §1, census F1 | O-7 |
| T-12 | Search styled inconsistently — dock furniture on a paper pane | joint | **W3-3** (demo seat) + packet P3 (seated rung) | `.input-bar` floating-bound (`components.css:205-228`); 24rem cap (78px short at 1440 AND 768); baked `--font-mono` | t-search-tabs §1-3, census CC-5, t-mobile F-7 | O-7 rung row; voice = content-class law |
| T-13 | Shadow palette missing + surface too transparent | demo | **W3-2** (ShadowPalette) + W3-1 (material) | kills `e43601c`+`a34d20f`; `specimen` register zero consumers (`PaletteCardSkeleton.vue:79-107`); `ExtractWorkbench.vue:88-93` | t-shadow-palette §1-§3 | O-9 all-cases oracle (ghost present, `aria-hidden`, caption for AT) |
| T-14 | ALL card transitions onto liquid-glass curves | joint | **W5-1..3** (demo) + packet P2 (PKT-1 P0 clobber) | dist `components.css` `:root` 150ms clobber (37 files/~46 sites dead); `PaletteCard.vue:19` shadow-only hover; zero `.cartoon-surface` in DOM; `animations.css:104-166` max-height legs | t-transitions-liquid F1-F7 + §2 retune table, perf PI-5 | O-16 computed-cascade census (R1 row EXPECTED-RED until PKT-1); R6/R7 GATED on PKT-3 (never retimed on layout props) |
| T-15 | Wrong font = PaletteCard title (body sans 600) | demo | **W4-6** | `PaletteCard.vue:49` `text-subheading` → Jakarta 600 20.352px; every sibling title = Fraunces | t-title-typography F7 | O-10d display-voice family census (population, not the one card) |
| T-16 | Strange corner element = the orphaned Regenerate verb | demo | **W6-5** (REDESIGN, never excise) | `GenerateControls.vue:106-123` (verb OUTSIDE the plate F8 specified) | t-misc-elements F2, plan-audit-2 F21 | O-20 plate-containment assert |
| T-17 | Dropdowns with color previews, deftly, in proportion | demo | **W6-4** | `GENERATION_PRESETS`/`HARMONY_DEFS` prose-only rows; the description-lane grammar (`ColorSpaceSelector.vue:54-57` precedent) | t-nav-dropdowns §2 F5-F8, t-mobile F-9 | O-14 preview byte-identity vs `generatePalette`/`mixColors`; phone no-clip trigger rule |
| T-18 | Card backgrounds inconsistent — 5 weights in one card | joint | **W3-1** | mix-dark stack 0.43<0.58<0.75<0.88<1.0; `PerceivedSpacePlate.vue:157` nested full plate | t-card-material T-CM-2/RC-2, census §1 | O-7 |
| T-19 | Shadow palette IN ALL CASES | demo | **W3-2** | `PaletteCardGrid.vue:15-21` (4 hosts) + `MixSourceSelector.vue:216-225` | t-shadow-palette F-4 | O-9 per host |
| T-20 | Tabs proper pilling — producer double-trim | **producer** | packet **P4**; W7 re-judge | `segmented-tabs.css:181-184,192-193,221-228` (anchor arm re-adds `--bouncy-track-trim`; pill 24.2 in 39; both trim rungs at mobile) | t-search-tabs §4-5, t-mobile F-6 | O-8 indicator ≡ active-button box (both rungs × orientations × schemes × engines), post-adopt |
| T-21 | Gradient bugged plate + bar too short | demo + src | **W6-2** | single-hue slice vs hue-varying trajectory (`PLATE_C_MAX 0.4` vs cusp 0.145 @H205); rail paints the RENDER string (`GradientVisualizer.vue:158`); border-tile bleed; rung row 12.6%/7.4% short | t-gradient-surfaces §2-6 | O-21 silhouette/rung extents; the hue-swept boundary sampler is a src item (W1-src) |
| T-22 | Easing area still a mess | joint | **W6-3** (demo composition) + packet P7 (EasingPicker v2) | 132px canvas in 288px chrome; `btn-pill`×`glass-btn` blob (dist `easing.js:424`); two cartoon rungs in a Z2 row; dot parks at cx=1; regex-driven autoplay (`GradientEasingEditor.vue:82-101`) | t-easing-pane 1-10, census CC-4 | O-17 composition oracle (aspect≈1, ≤1 stamp, dot rest, one-literal law) |
| T-23 | Header shaded AT REST | demo (+P3 knobs) | **W3-4** geometry-re-derived at **W4-7** | `PaneHeader.vue:65-89`; rest floor ∈ [0.45,0.65] of the veil (eye-judged bracket); swell completes ≤64px; the F3 layout-animation fork retires onto the producer scroll grammar | t-header-shading F1-F6 §3/§4, census CC-3/G1 | O-11 gates 1-6 (rest floor, no band, no double-exposure, compositor-only, engine/PRM coherence, one grammar) |
| T-24 | THE NEUTRALS AUDIT | demo (+P3 floor) | **W3-1** + the C3 LAW | 9 alphas over one aurora = a hue ladder (α spread IS hue spread over chroma); the law: **color appears only as color DATA; chrome/material/type are neutral** + exception ledger (ramps, dots, strips, netting, field, blob, Palettes-rainbow, admin-gold) | t-card-material §2/§3, t-contradictions C3, census §4 | O-7 rung-membership census (population), mobile frame |
| T-25 | Aurora on load + whilst active under the bar | joint | **W2** (all items) + packet P1 | breath ±3.25% sub-perceptual; neutral seeds = stills (diff 1.17-1.78/255); pointer axes 2-of-3 structurally DEAD on smooth (`flow.glsl.ts:82-93`, `brush.glsl.ts:274`); marigold-for-gray (`vividness` floors) | t-aurora-boot F-7..F-11 | O-3 + O-5 pacing + the perceptibility gates (§2.3) |
| T-26 | The variance bracket closes — design INSIDE | joint | **W2-5** (demo knobs) + packet P1/A2 (atoms sized BY the bracket) | target: hueSpread 24°+40°·(1−C/0.3) clamp[24,64] · energy 0.76 · counterpoint stop anchor+165° @0.6×C · softmaxBeta 4 · breathPeriod 26s (**Q2**) | t-aurora-boot F-8/F-9 §2.2, t-contradictions C4 | O-6 bracket resolver test; SEQUENCED after W2-1 (C4) |
| T-27 | Loading too gray / slow / jittery | joint | **W2-1..3** + P1 | gray = dark-slab ground (L≈0.35→0.6 leap) + sRGB mud crossfade + GAP-ARM material mismatch; jitter = paint holes 44→315ms then pile-up; F-3's LATENT pink flash unmasks if jank is fixed without writer-order | t-aurora-boot F-2..F-5, t-load-sync | O-1/O-4/O-5; `@property --saved-bg <color>` OKLab ground transition; palette-ease (producer knob) |
| T-28 | Current-color outline: too fine or ABROGATE | demo (+P5 register law) | **W6-7** — **ABROGATE at the seal** (default, Q12) | `Dock.vue:330-341` dies; continuity re-carried by the glyph; the `ring-2 ring-primary/50` cascade-dead sibling (`MixSourceSelector.vue:138`) verified in-wave | t-outline-dropdown-clip §1 | O-15a negative watch (border-style none); register law: rings on WatercolorDots ride the dot's own silhouette or do not exist |
| T-29 | Pseudo-dropdown clipped = the dock Tools toggle (DEMO, not a portal) | demo | **W6-8** | `.action-bar-toggle-inner { overflow:hidden }` unconditional (`Dock.vue:311-316`); native `title` tooltip ×4; separator pop | t-outline-dropdown-clip §2 | O-15b settle-stamped clip release + whole-shadow assert |

**Load-bearing fleet finds beyond T-#** (all folded; anchors in their lanes):

| ID | Finding | Wave | Gate |
|---|---|---|---|
| MOB-1 (P0) | 1024-portrait witness split: second pane UNREACHABLE, dock seal-only (`Dock.vue:213` `lg:hidden` vs the aspect-law composable) → ONE stamped `data-layout` witness | **W1-demo** | both panes reachable at 1024×1366; the style.css:435 exception rule DIES |
| MOB-2 (P1) | `mobilePaneIndex` leaks across hash-nav (`useViewManager.ts:64-71`) → route-derived pane choice | **W1-demo** | deep-link/back-forward land on the schema default |
| CC-1 | bare `.glass-wash` paints ZERO fill both schemes (registered-@property-in-color-mix Chromium collapse; producer's own material.css names the hazard) | packet **P8** + W3 consume note | post-fix: the two sites (`GradientStopEditor.vue:171`, `GradientCodeEditor.vue:93`) paint their rung |
| A11Y-F1 | the contrast guard's referent is FALSE everywhere (`BG_LIGHTNESS 0.15/0.97` vs composited 0.376–0.936) → the ink-on-tier contract | **W3-5** | O-18 population census |
| A11Y-F2/F3/F4 | unguarded menu ink (`ProfileSection.vue:50,60`, `MobileMenuDropdown.vue:43`, ≤1.28:1); fg-guard reused as bg fill (`ColorNutritionLabel.vue:110-113`); guard-then-alpha erosion (readout fracs, ParseEcho) | **W3-5** | same census |
| LEG-1..9 | proof:* carry (S1) · orphan components · dark-mode-toggle dissolve · savedPalettes param · type trio · `globals` devDep · PaletteDialog orphan (CC-6) · PaletteSlugBar TODO-met migration · stale comments | **W0** (+W1 moves) | grep-zero + suites green |
| PI-1..6 | the perf riders: cost ledger; LCP reveal-only law; hover budget; mobile-gate re-derivation + timing fixture; T-14 two-tranche split; coloc bundle-diff | attached to their waves | §6.3 |
| DOC-1..13 | doc-truth: src Structure undercount (~30 files, whole `subpaths/` missing) · DESIGN.md 44/30 vs shipped 32/25rem · 5→6 e2e ×2 · missing catalog entries (`--alpha-checker`, `@lib/gamut-ink`) · `transform/path.ts` undocumented · CLAUDE.md rewrites gated on E-1 | **W0** (pre-E-1-safe set) + **W9** (post-restructure rewrites) | doc-vs-tree spot re-verify at close |

---

## §2 THE DESIGN DOCTRINE (the unifying gestalt moves; each with evidence + what it retires)

**D1 · THE FOUR-RUNG MATERIAL LADDER** — *glass earns its blur by floating over live content; a
surface that sits IN a plate is a tone of the plate, not a second pane of glass.*
Rungs: **1 PLATE** (the picker's exact register: `tier="resting"` + cartoon stamp + grain — all 9
pane cards join) · **2 WELL** (opaque tone-step of the plate, NO backdrop-blur — the markdown
`bg-muted` pattern generalized; producer rung P3) · **3 CHROME** (true floating glass, as shipped)
· **4 STAGE** (named near-black pair `--stage`/`--on-stage-chrome`). Evidence: t-card-material
§1-§3 (9 alphas over one aurora = a hue ladder; the physics: α spread IS hue spread); the
mechanical census (t-card-color-census) stamps every site to a rung (§4 there is the deployment
table of record, with CC-2's mint-count correction). RETIRES: S-20 `bg-card/75` as species; the 6
parallel well mints; raw `bg-black`/`bg-white`; the 7th bespoke header recipe (CC-3). Corollary
(T-24): with rungs 1-2 in place every in-view surface ≥ ~0.7 effective alpha of ONE neutral family
— the hue fork dies by construction. The **C3 LAW** rides this: color = data only; the complete
sanctioned-exception ledger is §1.2 T-24's row. Mobile frame: every rung judged at 390 over the
aurora's brightest band (t-mobile F-8 — the stricter reading sets the floor).

**D2 · THE ×φ TYPE RECALIBRATION** — "1.5× on our golden scale" = **one full golden rung = two
token steps** (×1.618, an OWNER-WORD RE-CUT of the literal 1.5 — ratified via Q11, never assumed
[AMENDED-AT-PASS-2]) (|ln1.5−lnφ| < |ln1.5−ln√φ|; t-title-typography §1 — every landing is an exact
shipped token, no new values): picker title display-1→display-3 (41.89→67.78px @1440) · pane title
heading→display-1 (25.89→41.89, phones floor-pinned = deliberate no-op) · readout
display-2→display-4-class rung (33.77→54.64 @32rem). Weight 400 carried ON the trigger's own class
list (kills the About-700 inheritance bug). The readout becomes a CONTIGUOUS TUPLE: intrinsic
cells, tuple-level anti-reflow re-earned by (i) REAL tabular figures — **self-host Fraunces with a
verified `tnum`** (the Google-served face silently lacks it; the declared `tabular-nums` is a
no-op — F5) and (ii) per-space LOCKED line counts (F6's table; per-space integer least-counts are
REQUIRED at the phone band, t-mobile F-4). PaletteCard + every title surface joins the display
voice (population sweep, non-italic for user-data names). RETIRES: R4's set + the "ride the
producer control rung" premise (P10 asks the token station so the demo never shadows font-size).

**D3 · THE ONE BOOT OVERTURE** — *hydrate → derive → commit; order by gating, not by timing; work
defers, appearance composes; one material from t0.* The five laws + beat sheet of t-load-sync §3
are adopted verbatim (B0 ground · B1 plates, ONE plate-land family incl. the dock arriving AS the
pill · B2 field derive-in 0.9s decelerate over its OWN gradient ground · B3 instrument · B4 blob
goo-EMERGES). The color half (t-aurora-boot §2.1): the persisted ground becomes the derived-palette
GRADIENT (not the deepest stop — kills the dark-slab + luminance leap); hydration-first kills the
GAP-ARM demo half AND the latent pink flash (F-3); like-with-like crossfade cannot desaturate
(F-4); `@property --saved-bg <color>` gives discrete picks a 200ms OKLab ground transition; fonts
are struck from the timeline (self-hosted, preloaded — LS-6). The **LCP reveal-only law** (PI-2):
the beat that owns the LCP element paints its DOM unconditionally at B0 and treats its beat as a
post-paint overlay — never a mount gate. RETIRES: the five-clock smear, the About pop, the dock
mount-morph, the Google-Fonts network actor, the seeded-session gate as evidence.

**D4 · THE LIVING FIELD INSIDE THE BRACKET** — the T-26 target (Q2 default, t-aurora-boot §2.2):
chroma-adaptive wide-analogous fan + ONE counterpoint stop + energy 0.76 + structure (softmaxBeta
4) + tempo (breath 26s, drift ×1.6) + `vividness = smoothstep(0.02, 0.10, seedC)` (gray picks keep
a sage whisper, never marigold) + dark `lBand` via the L2 atom. Perceptibility gates: 2s
glance-pair sub-JND; 10s window shows unmistakable migration (≥4/255 mid-C); 60s never repeats.
The drag path is byte-identical (the app's best living moment). Pointer work is SEQUENCED after
the producer honesty fix (two of three axes are dead shader paths on smooth — F-10). The bracket
is the SIZING SPEC handed to the producer atoms (P1).

**D5 · THE PLATE + CONSOLE GESTALT (sliders)** — the picker's content region resolves into the
**specimen plate** (spectrum + caption) and the **console** (letter-rail + sliders): a rung-2 WELL
sub-card (C5 settles it — opaque tone-step, no blur; NOT "quiet glass"; an OWNER-WORD RE-CUT of
"a little glass card" — surfaced for ratification via Q4, never settled silently
[AMENDED-AT-PASS-2]), the letter column a
vertical micro-dock ring in `--accent-view` (seal-rim recipe turned portrait; producer letter-rail
primitive = P5, demo interim sanctioned), letters speak INK (the channel-color conceit retires —
degenerate by construction), the WatercolorDot ring stays the ONE live-color voice, `L a b α`
glyphs kill the A-collision, the channel strip gives every row its live meter (T-4). Bounding the
ground is what makes the ink computable — one gestalt, not three patches (t-sliders F-4).

**D6 · THE INK-ON-TIER CERTIFIED-CONTRAST CONTRACT** — *the referent is a property of the surface
the text sits on, never a global constant.* Retire `BG_LIGHTNESS_DARK/LIGHT`; thread the
atmosphere's live derived-lightness (page ambient) and each tier's known composited lightness
(named surfaces) into the ONE guard family (`safeAccentColor`/`wcagContrastRatio` — the library
already takes `bgL`; every consumer feeds it a lie today). De-emphasis becomes a floor-clamped
rung of certified ink, never post-hoc opacity (the guard-then-alpha class dies). The in-repo
exemplar is `resolveSealInk`/`--seal-ink`, generalized. Producer stake: tiers publish effective
lightness (P3/P5 contract row). Evidence: t-a11y-contrast F-1..F-4 (measured ≤1.28:1 unguarded
menus; guarded-but-under-corrected 1.44:1). RETIRES: the two constants, per-site guards, opacity
de-emphasis.

**D7 · THE LIQUID-EASING FAMILY, STRUCTURAL** — the two-channel law (spatial = spring at ITS OWN
clock; effects = bezier) becomes inherited, not per-site: cards adopt the producer cartoon
register (`<Card surface="cartoon">`/atoms), interactive scales ride `--transition-liquid-spatial`,
the pane swap moves to `--spring-snappy` @ its own clock with the exit strictly shorter, collapse
legs re-cut compositor-only (GATED on PKT-3 — never retimed on layout properties, PI-5), skeleton→
content settles through `vj-morph`. The P0 is producer-root: the dist theme emission clobbers
every consumer's `@theme` motion alias (PKT-1) — NO demo cascade arms-race. The KEEP set (F6) is
canon: do not re-litigate. RETIRES: the dead W3-5 alias premise, spring-on-generic-clock,
`max-height` morphs (upon PKT-3), the 150ms generic-web register.

**D8 · THE SEAT (blob placement law v3)** — a PAPERWEIGHT ON THE PLATE: wrapper flush to the plate
corner (`--blob-seat`, default 0), ONE `cqi` footprint formula at every viewport (the 8rem hand arm
and the corner-break law die), containment identity (orbit-reach 0.49 ≤ 0.5 ⇒ no clip/no dock
collision/no seam skewer BY CONSTRUCTION, all three mobile bands collapse to one composition —
t-mobile F-3), `--z-ornament` = top of the CONTENT stack (chrome stays above; the two readings of
"all" never conflict in paint), depth via contact shadow + sheen (genesis open-Q9 now WANTED), the
ink law = |ΔL(bead, plate)| floor, closed-form (inside the 12ms drag headroom — PI-3). The
hover/morph score is the 7-beat table (t-blob-hero §3), demo beats now, engine floors via P6.

**D9 · THE SHADOW-PALETTE STATE GRAMMAR** — *wherever absent content is a palette, the empty state
displays the ghost of the artifact at the artifact's own scale, in ALL cases; the text plate
captions, never substitutes.* Four species on the MOTION axis: true-empty = STILL dashed ghost
(`specimen` ink, finally consumed) · known-imminent = shadow breath · network = developing shimmer
· error = plain register (untouched). Semantics split: ghost `aria-hidden`, caption carries AT —
the S loading-lie cure survives the material's return. One `ShadowPalette` species, colocated with
the card family; the dashed edge lifts dot→card scale.

**D10 · COLOCATION IS THE DIRECTORY LAW** (E-1) — §5. The keystone insight (t-coloc-src §0/§2):
the library's public contract is a NAME SET (8 exports keys), not a file tree — and the demo must
**dogfood the published surface** (23 deep `@src/` specifiers incl. 5 un-exported conversion
primitives pierce the barrier today). The backend transposes to modules/ + platform/ (move-only;
the L boundary laws survive verbatim). The demo tree goes recursive per the two in-repo exemplars
(`ImageEyedropper/`, `PaletteDialog/`); the module tier re-homes BY DOMAIN (the reactive-vs-pure
split dissolves); the App shell gets a home (the boot chain becomes legible as `app/composables/
boot/` — the exact subsystem W2 edits).

---

## §3 THE WAVE PLAN

**The DAG**: W0 → W1 → { W2 · W3 } → W4 → { W5 · W6 } → W7(trigger-gated, floats) → W8 → W9.
W2 and W3 are parallelizable (disjoint surfaces: boot chain vs materials); W4 REQUIRES W3 (the
console/ink/seat composite against the settled ladder) and consumes W2's settled boot (T-23's veil
is judged over the true field). W5/W6 parallelize (motion tokens vs feature surfaces; single-writer
map below). W7 fires at the BG/BH 5.0.0 cut whenever the trigger lands (PP-5: books never gates —
its non-firing inside T's window is not a miss). W8 runs only after every design wave closes. E-6
process binds every wave: Fable + frontend-design for all design lanes; opus/sonnet fanout; batches
of three; lane worktrees cut from the tranche head; PP-8 repo-wide sweep (caps recomputed post-move
· legacy grep · as-any ledger regenerated) in EVERY wave gate; per-wave Lighthouse delta recorded
(PI-1 discipline); the §6.2 CSS-byte tripwire REDS W3/W4/W5 at >120 KiB gz.

### THE COLOCATION SEQUENCING DECISION (Q1 — default: RESTRUCTURE FIRST, as W1, before every design wave)

**Rationale**: (a) the design waves author substantial NEW code (SpectrumCanvas/ and
ComponentSliders/ folders, ShadowPalette, the chip module, the boot re-order) — E-1 demands it be
BORN colocated; authoring into the old shape then moving is guaranteed double-churn on new code;
(b) the restructure is mechanical and hard-gated (suites green · O-23 bundle-diff ±2% · PP-8 caps
sweep) and depends on NO producer window; (c) landing it last would move every design wave's
freshly-landed files a second time. **Costs + mitigations**: every lane's `file:line` anchors go
stale → W1 emits a committed **MOVE-MAP** (old path → new path, one table) and each design wave
re-derives its anchors at wave-open (PP-11 already requires live-tree re-verification); the CL-lane
ordering note ("boot files must not move under the load-animation lanes' feet") is satisfied by
strict wave ordering — W1 CLOSES before W2 opens; nothing moves concurrently. The alternative
(restructure last) is preserved as Q1's live alternative.

### Per-wave specification

**T.W0 — SUBSTRATE · ORACLE FLOOR · PACKET DISPATCH** (the first act)
Goal: true the ground T stands on; dispatch the producer letters while the W-1/W-2 freeze windows
are OPEN; mint the oracles the design waves gate on. Completion: packets dispatched + acked-or-
recorded; oracle floor green-or-born-red-by-design; legacy grep zero on the named set; doc-truth
pre-E-1 set landed.
| Item | Content | Gate |
|---|---|---|
| W0-1 | **Dispatch the E-2 packet series** (§4) at ratification: GLASSUI-T-ASKS (P1–P10) + the KF letter (PRM-expand re-cite w/ current line numbers) — HEAD-restamped at dispatch (S-letter §16); the W-1/W-2 payload (P9) named FIRST | dispatch record + producer-inbox cite |
| W0-2 | **Finish the proof:* retirement** (LEG-1/F5 split verdict): retain-reclassify 4 behavioral gates (`css-parity`, `round-trip-idempotent`, `perf-target`, `serialize-fidelity`) into a CI-wired `test:dist`; EXCISE the other 8 + `generate-favicon.mjs` (verify-dead) + `globals` devDep; CLAUDE.md sentence made true by construction (**Q13**) | grep `proof:` = the 4 reclassified only; CI runs test:dist |
| W0-3 | Legacy excisions: BulkActionToolbar + SortFilterMenu (+doc rows), savedPalettes param, `constants.ts:340-344` type trio, PaletteDialog orphan confirm+excise (CC-6), PaletteSlugBar iconOnly migration, stale comments | grep-zero; suites green |
| W0-4 | Doc-truth (pre-E-1-safe): 5→6 e2e ×2 · ci.yml:362 comment · DESIGN.md 32/25rem + `--alpha-checker` + `@lib/gamut-ink` entries · `transform/CLAUDE.md` path.ts + LoC strip · `units/color` space table +ICtCp/Jzazbz · `subpaths/CLAUDE.md` authored (the frozen-entry law) · docs-truth F5 (AMENDED-AT-PASS-2: color-theory/gamut-mapping now live under `docs/colors/` + app.md/quantization.md exist; `assets/docs` = **11** pages incl. kelvin.md, not 10) | doc-vs-tree spot check |
| W0-5 | **Oracle mints** (the boot set MUST precede W2 — plan-audit-1 F3/F4): O-1 color-truth · O-2 real-hydration · O-3 headed-GPU probe annex · O-4 order-invariance · O-5 pacing variance · O-16 computed-cascade · O-7 card-census scaffold | each born-RED against today's tree where the defect is live (honest reds recorded) |
| W0-6 | CI hygiene: smoke-safari wedge diagnosis (`--reporter=line`, keep the 12-min bound) · O-25 prod-lineage assert · `--ring` fallback-first pre-migration (`ColorInput.vue:338` → `var(--focus-ring-color, var(--ring))`) | CI captured |

**T.W1 — THE COLOCATION GRAND RESTRUCTURE** (three single-writer lanes, disjoint trees; §5 is the spec)
Goal: the E-1 end-state landed whole; the cohesion cargo rides. Completion: MOVE-MAP committed;
suites green; O-23 bundle-diff flat ±2%; PP-8 caps recomputed; zero re-export shims at old paths.
| Lane | Content | Gate |
|---|---|---|
| W1-demo | §5.1: Beat-A leaf moves + twin unifications → palette-browser decomposition behind hardened barrels → color-domain unification (keys ~24 sites, atomic codemod, LAST) → app-shell home (`app/composables/boot/`) → per-feature recursion. **Cohesion cargo**: dup-`useDark` fold onto `useGlobalDark`; PI-DRIFT-1 + the 10-site `out-in` audit (+ the pi-w5b hard-fail rider); **MOB-1 stamped witness** (`data-layout`, the style.css:435 exception dies); **MOB-2 route-derived pane index** | suites + e2e green; O-23; witness gate (both panes reachable at 1024×1366) |
| W1-api | §5.2: modules/+platform transposition (move-only; L laws verbatim per t-coloc-backend §3); **TA-4 excision inside the move** (routes `/remix`+`/diff` + `computePaletteDiff` + `remixPaletteBody` + meta rows + fork↔remix fold + `PaletteVersion.atomDiff` + `lib/crud/atomdiff.ts`; KEEP `computeAtomSetHash`); models.ts carve; scripts/ regroup (deploy/dev/ci/gates) | api 224-class suite green post-excision (diff tests deleted, fork coverage re-homed); tsc 0; **Q8/Q17** |
| W1-src | §5.3: (1) the **demo-dogfood keystone** — repoint demo off `@src/*` deep paths onto the public subpaths; the 5 leaked conversion primitives get citizenship (**Q15**); (2) test/ mirror; (3) `parsing/{color,timeline,stylesheet}/` + `color/gamut/` + constants split (name-preserving at every barrel — §0 semver-free); (4) the hue-swept boundary sampler (T-21's src half, beside `sampleOKLChSliceBoundary`, with Into twin); (5) the **Normalized/Display brand decision (L1)** — S's "W2-3" book renamed, T's W2-3 is the OVERTURE (boolean-literal-param + conditional-return-type across ~58 callsites), sequenced last | `proof:subpath-budget`-class invariant green (parse-that-free subpaths); dts surface **additive-only**: no removal/rename of any existing exported symbol (the §5.3 FORBIDS ledger); Q15 promotions are expected semver-MINOR additions [AMENDED-AT-PASS-2 — "byte-stable" contradicted Q15's own default]; vitest green |

**T.W2 — THE BOOT OVERTURE + THE LIVING FIELD** (T-1 · T-25 · T-26 · T-27 demo halves; GAP-ARM-hedged)
Goal: the load is ONE choreography and the field lives inside the bracket. The producer replay
(P1) is a packet — the demo half alone cures the visible pink (t-aurora-boot F-1) so this wave is
NOT blocked; the adopt re-verifies. Single-writer: `app/composables/boot/*` + `App.vue` +
`index.html`.
| Item | Content | Gate |
|---|---|---|
| W2-1 | **Hydration-before-derivation as ordering LAW** (the boot-region transposition; kills F-1-demo + F-3's latent flash) | O-2 real-hydration + O-1 color-truth green |
| W2-2 | The gradient ground (persist `paletteToCssGradient`, scheme-guarded; first-visit = build-time default-derived constant, dark-honest) + `@property --saved-bg` 200ms OKLab transition + the 0.9s derive-in | O-1; no >x luma leap; F-6 dark first-run honest |
| W2-3 | THE OVERTURE beat sheet (B0–B4; `--overture-*` tokens at the shell; dock arrives AS the pill; pane-slot `appear` grammar; fonts self-hosted + preloaded, struck from the timeline) + the **LCP reveal-only law** (PI-2: identify the LCP element first; bind it B0-unconditional) | O-4 order-invariance under 6× throttle; O-24 LCP identity; PP-9 integrated-surface cite |
| W2-4 | The blob EMERGE beat (demo trigger at B4; engine pose rides P6 — until then the reveal uses the FSM's existing `emerging` state) | no-pop assert |
| W2-5 | **T-26 in-bracket calibration** (Q2 values; demo knobs: energy 0.76, base-override softmaxBeta 4 / breathPeriod 26 / vividness=f(seedC)) — SEQUENCED after W2-1 (C4); pointer retune DEFERRED until P1's honesty fix lands (F-10) | O-6 bracket test + the perceptibility gates; owner eye-judge frames archived |

**T.W3 — THE MATERIAL LADDER · NEUTRALS · INK** (T-3/11/13/18/19/24 + T-12 + T-23 + A11Y)
Goal: ONE material system + ONE ink contract, population-gated. Single-writer: the tier tokens +
`PaneHeader.vue`.
| Item | Content | Gate |
|---|---|---|
| W3-1 | Rung-1 adoption (9 pane cards → resting+stamp+grain); rung-2 WELL consolidation (the 6 mints die; interim demo `--well-bg` if P3 unlanded, swap booked); rung-4 STAGE tokens; the C3 law + exception ledger encoded in DESIGN.md | **O-7 census oracle green** (rung membership, both schemes, all panes + fixtures) + t-mobile F-8 390-frame |
| W3-2 | `ShadowPalette` species (D9) at the three host classes (Extract live-k ghost · Mix ×2 · PaletteCardGrid ×4) | O-9 all-cases |
| W3-3 | Search seat: the register law (fields on paper wear paper) — interim demo seat if P3's rung unlanded (booked swap); voice = content-class (mono opt-in only) | O-7 row; judged beside dashed-well + card in-frame |
| W3-4 | **Header material at rest** (R2): constitutive veil AT the ladder (rest = quiet-derived fill in the [0.45, 0.65] eye bracket; stuck = floating+tint rung-climb — **Q9**); swell completes ≤64px; the F3 fork RETIRES onto the producer scroll grammar (compositor-only) with the demo feather carried until P3's knobs land; F6 grammar law (no in-card sticky above `--z-header`) | **O-11 gates 1-6** |
| W3-5 | **The ink-on-tier contract** (D6): constants retired; atmosphere-lightness + tier-lightness threaded; the unguarded sites routed (A11Y-F2); the fg/bg double-duty split (F3); de-emphasis rungs (F4) | **O-18 population contrast census** both schemes at the owner's reference color |

**T.W4 — THE PICKER RECOMPOSITION** (the C1 knot — ONE wave, single-writer, forced order; t-contradictions C1)
Goal: the header + console + seat re-authored as one composition. Order: (1) W4-1 titles ×φ →
(2) W4-2 readout tuple (reservation re-scope FIRST at the phone band — t-mobile F-4.4) → (3) W4-5
SEAT (reservation re-derives; T-7's freed band is the seat's) → (4) W4-4 console + W4-7 veil
re-derive against the settled band. Files: `ColorPicker.vue` · `ColorComponentDisplay/` ·
`ComponentSliders/` · `readoutReservation.ts` · `PaneHeader.vue` (geometry only) · `HeroBlob/`.
| Item | Content | Gate |
|---|---|---|
| W4-1 | Titles ×φ non-bold (D2); About inline member inherits `1em`; shrink keyframes re-lock display-1→heading; em-relative caret/underline | O-10a; height gate @900px (`--content-max-h`); mobile matrix |
| W4-2 | The contiguous tuple + tnum self-host + per-space locks (levers 1+2, lever 3 for lab-class — **Q11**); the W4-2 gate text re-authored ("every space inks its own locked line count") | O-10b + O-10c |
| W4-3 | The channel strip (T-4): name·signal·meter; live meter from `COLOR_MODEL_KEY` (zero new state); static ranges retire to their two owners; hover tooltip dies | meter-presence + O-18 rung |
| W4-4 | The console (D5): rung-2 well sub-card + ink letters + `L a b α` + dock-trigger state ladder + the interim seal-recipe ring (producer swap booked, P5) + WatercolorDot active seat + touch rung (≥44px hits <lg; tooltip re-seat) | O-18; ONE active indicator; a11y roving-tabindex verbatim |
| W4-5 | THE SEAT (D8): flush anchor + one cqi formula + `--z-ornament` + contact-shadow depth + closed-form ink floor + the leave-bind/park/tooltip beats (park stays wall-clock until P6's `settled` seam; booked) | **O-12 set** (seat identity · occlusion · hover budget · mobile gate RE-DERIVED from the formula · timing fixture centralized) — PI-4's same-commit law |
| W4-6 | Display-voice population sweep (T-15): PaletteCard + sibling `text-subheading`-as-title sites; rename-input/line-clamp re-verified under the serif | O-10d family census |
| W4-7 | Veil earn-range + shrink re-derived from the taller band (keyed to OCCLUSION, not the shrink); the T-23 rest-floor bracket RE-JUDGED over the settled post-W2 field (W3-4 calibrated parallel to the boot fix — AMENDED-AT-PASS-2) | O-11 gates 1+3 re-run |

**T.W5 — MOTION LIQUID** (T-14; perf-split per PI-5)
Goal: the two-channel law structural. Tranche A = retune rows R1–R5/R9–R11 + the card cartoon
adoption + skeleton→content settle; Tranche B = R6/R7 compositor collapses, EXPLICITLY GATED on
PKT-3 (left untouched, never retimed, until it lands). R1 (the bare-utility default) goes live the
day PKT-1 lands — the O-16 row for it stays EXPECTED-RED with the packet cite until then.
Gate: O-16 census (owned rows green; R1 row honest); view-switch ≤100ms budget re-run; the KEEP set
(F6) untouched.

**T.W6 — SURFACES & SHELL** (parallel lanes; single-writer map, total over all 8 items
[AMENDED-AT-PASS-2 — W6-1 was unassigned]: **gradient tree** = W6-1 + W6-2 (the netting's re-judge
surface IS the W3 gradient plate; `style.css` regions disjoint — netting @254-261 vs the surviving
accent @223-224, t-nav-dropdowns:123) · **easing editor** = W6-3 · **dock+nav** = W6-4/W6-6/W6-7/
W6-8 · **generate** = W6-5)
| Item | Content | Gate |
|---|---|---|
| W6-1 | Netting recalibration (T-6): the R5 band (22%/28%/45%/65%/1.25px), CSS tile + `WEBBING` in lockstep; re-judged on the W3 plate + 390 | O-19 |
| W6-2 | The gradient instrument (T-21): hue-swept envelope plate (three truth regimes, cusp-adaptive axis, condition-label reservation) consuming W1-src's sampler; the rail re-authored (normalized projection + owned paint stack + ruler grammar/terminal caps; the render tile joins the Type/Direction controls) | O-21; §6.1 spec extended |
| W6-3 | Easing composition demo half (T-22): specimen-bench anatomy (closed rows = dots+glyph+name; one-literal law; per-row `--motion-accent` = the interval's own ink; wells seated flat); the regex-drive deleted the day P7's declarative door lands (booked) | O-17 |
| W6-4 | Nav voice (T-10, R1 retirement + orphaned-machinery excise + **O-13 slims same-commit**) + preview chips (T-17: STRIP/RAMP module, description-lane, restraint table, phone no-clip re-flow) — Palettes form = **Q5** | O-13 slim + O-14 |
| W6-5 | The Generate verb joins the plate chrome (T-16); seed = bench-note; orphan row dies | O-20 |
| W6-6 | T-9 re-home: banner dies; dock status lamp (first-paint, dev-gated) + per-surface designed states + console untouched; the W0-1 contract byte-preserved | O-22 |
| W6-7 | T-28 ABROGATE at the seal (+ the cascade-dead `ring-primary/50` verify; register law encoded) | O-15a |
| W6-8 | T-29 settle-stamped clip release + register pass (native-`title` retirement ×4; separator folds into the slot's arrival) | O-15b |

**T.W7 — THE ADOPT EVENT** (= S.W8 handed intact; trigger-gated on the BG/BH joint 5.0.0 cut; PP-5)
Runs `waves/S.W8.md`'s MIGRATION walk at the cut against a REBUILT dist + stamped HEAD (G-CUR-1
discipline). Payload: `^4→^5` bump · L17 GooBlob→`Blob` rename consume · L20 `/blob/config` →
HeroBlob eager-config/lazy-engine split → **RP-2 re-measure** (the ≤280 gate re-judged; L20+GAP-L5
must land TOGETHER or the re-baseline carries a third tranche) · CI un-pin from `tranche/BG` ·
`--ring` roster verify (pre-migrated at W0-6, so a no-op) · every GAP re-verify (ARM/L2/L5,
PRM-expand via kf) · the producer-gated design halves land: park-from-`settled`, satellite
emergence + HERO preset (the ≥96px bead gate), tabs re-judge (O-8 goes live), seated-rung +
letter-rail + header-knob consumes (the booked interim swaps fire), EasingPicker v2 consume,
alpha-checker + `.underline-tabs` MARKER retire-checks (legacy-sweep F7/F6). Gate: the verify-at-cut ledger (§4) walked
row-by-row; suites + O-slate green.

**T.W8 — E-7 THE HARDENING/CRITIQUE WAVE** (§0.2; depth = **Q6**)
Per-surface Fable+frontend-design critique passes (batches of three) as a **coherence PRE-FILTER
only** — the terminal taste authority is OWNER RATIFICATION (plan-audit-2 F18; the S
taste-by-proxy disease must not recur). Each pass: drive the owner-visible surface (real GPU where
it matters), judge against §2's doctrine + the owner's verbatim lines, file remediation rows;
remediation lanes land them; then ONE tranche-level taste certification package for the owner
(annotated frames per surface, both schemes, 3 viewports + the boot screencast) — the owner's
verdict is the gate. Every taste axis is presented as a BRACKET with both poles named
(t-prompts-recap F2's law), never a point value. The full oracle slate + budgets + a fresh
Lighthouse delta run in the same wave.

**T.W9 — CLOSE** — the S close machinery inherited unchanged (F19): zero-drop ledger walk · every
book re-probed live · repo-wide sweeps · budgets re-measured · doc rewrites now unblocked
(demo/CLAUDE.md + api/CLAUDE.md full rewrites at the pattern level — DOC F6/F7, the api rewrite
reconciling TA-6's 26-vs-27 index count; root src Structure collapses to module-boundary contracts) · maintainer residuals X1/X2 restated verbatim with firing
ops · spec-status recheck (CH/R8/R rows) · the naming law (PP-16): gates-pass-goal-unmet closes
`complete_with_misses`.

---

## §4 THE PRODUCER REQUEST-PACKET SERIES (E-2; consolidated; DISPATCHED at W0-1)

Timing windows (t-glassui-forward §1; WS12 has NOT landed — W-1/W-2 are OPEN but LAST):
**W-1** = WS12 export-regen freeze (subpath/export SET) · **W-2** = B4e MIGRATION freeze
(rename/token-retire rows) · **W-3** = F-family behavior (visible live via the file:-pin; land
early) · **W-4** = the joint 5.0.0 tag (the verify-at-cut walk = T.W7). Disposition classes per
t-request-packets §0: NEW / RE-ASK-by-name (the W-DESHADCN fold did NOT deliver — delivery ≠
disposition) / VERIFY-AT-CUT.

| # | Packet | Class · Window | Contents (evidence in t-request-packets §1 + the named lanes) |
|---|---|---|---|
| **P1** | **AURORA BOOT + FIELD QUALITY** (the highest-leverage, worst-covered cluster — the A-addendum was never dispositioned) | NEW · W-3, LAND EARLY | GAP-ARM arm-replay (`useAurora.ts:228/262` — one honest `inst.update(getCfg())` after `arm()`; user-visible on prod) · the L2/A3 variance-atoms DOOR (`hueSpread` chroma-adaptive, cross-stop chroma variance, `lightnessScheme`/`lBand`, counterpoint option) **SIZED BY THE T-26 BRACKET** · pointer-door HONESTY on smooth fields (light = cursor-local luminance lean; burst reaches the domain-warp path; or medium-gated atom types — F-10's dead axes) · MOTION tempo scalar (drift+breath co-varying) · palette-ease (eased seed-replacement walk) · vividness/quietness atom (bless the achromatic ride-down) |
| **P2** | **MOTION** | NEW (B1-B3) + RE-ASK (B4=L9) · W-3 | **PKT-1 [P0]** the dist `components.css` `:root` re-declares `--default-transition-duration:150ms` inside `layer(components)`, clobbering every consumer `@theme` alias — alias the emission onto the house tokens at the root · PKT-2 the spring clock hole (press 0.16s ↔ snappy 0.4s; a ~0.3s-settle preset or bless snappy) · PKT-3 a compositor collapse/expand recipe · PKT-4=L9 skeleton shimmer seams (still unread) |
| **P3** | **THE GLASS LADDER** (one packet, several rungs) | NEW · W-3 (W-2 if any token renames) | the recessed **WELL** rung (`--glass-bg-well` + `.glass-well`; 6 hand-mints prove demand) · the `.input-bar`/**seated** field-chrome rung + cap seam + `--input-bar-font` seam (ASK-B/C/D) · P-3 chroma-guard note (tier alphas over full-chroma grounds) · A1/A2 F2.R1 **paint-close** (the field-floor dark arm + the muted-ink alpha rung floor — source-landed, dual-engine PENDING) · the scroll-header **rest-floor + bottom-feather knobs** (card-scroll lane 4 rests at 0 with no mask — t-header F4 rows 1-3) · tiers PUBLISH effective lightness (the ink-on-tier contract's producer stake) |
| **P4** | **TABS PILLING** (T-20) | NEW · W-3 | the anchor-arm block insets drop the double-counted `--bouncy-track-trim` addend (bare `anchor()`, both orientations/breakpoints/trim rungs); acceptance: indicator ≡ active-button box at every breakpoint × orientation × scheme × engine (incl. the JS fallback) — mobile numbers supplied (t-mobile F-6) |
| **P5** | **LETTER-RAIL + RING CONTRACT** (S-3 upgraded to MANDATED by T-5) | NEW · W-3 | the vertical rail primitive (stadium hairline, slot-per-item, dock-trigger state ladder, an ACTIVE SEAT that yields to consumer indicator content — the exact seam SegmentedTabs lacked, cite `38d83e4`; admin/gold variant; PRM-clean; a TOUCH-size rung) · the ONE ring contract (seal rim + `--dock-ring` L13 + letter-rail) · the WatercolorDot **solid-ring register** (the ghost-stroke mechanism at solid weight, `--watercolor-ring-*`, never hairline ≤48px — T-28's register law) |
| **P6** | **BLOB L5 ADDENDUM** (append to F9.R1 — NOT a re-ask of the shade work) | NEW-append + VERIFY · W-3 (HERO preset = W-1) | rows A–E: hero-scale mood-legibility floor · curvature-bounded pseudopod · `settled` seam + park-only-from-settled · mood-gated satellite emergence · the containment update to the genesis contract (+ contact-shadow register now WANTED) · the single-WebGL2 collapse (drain `metaball.wgsl`) · the exported **HERO preset** (W-1!) |
| **P7** | **THE COMPONENT BATCH, RE-ASKED BY NAME** (fold-claimed to W-DESHADCN, verified absent) | RE-ASK · W-3 | L6 slider tokens (+`--slider-track-checker`) · **L8 clampLabel — 5th booking, ESCALATE** · L11 dropdown-menu glass tokens · L16 backdrop-prefix policy · L10 verify · L7 **EasingPicker v2** carried + net-new: container-query stage law (square-fit canvas), internal material tokens/`chrome` prop, `preset?` payload field, declarative `autoplay`/`playing` door, curve-glyph preset menu, travel-dot rest + PRM at source · L13 dock residuals · L14 ConfiguratorRow · the Select **description-lane survival contract** (T-17 rides it) · the base-Tabs **`underline` variant** (legacy-sweep F6, AMENDED-AT-PASS-2: the `.underline-tabs` MARKER `style.css:476-484` STAYS until this ships or PaletteDialog migrates `<Tabs>`→`<SegmentedTabs>`; retire-check at W7 beside F7) |
| **P8** | **BUILD/DIST** | NEW · W-3 | A6 the minifier drops unprefixed `backdrop-filter:none` (the demo MARKER retires the day it's fixed) · **CC-1** the registered-@property-inside-`color-mix()` collapse on bare `.glass-wash` (the producer's own material.css names the hazard; fix at the compositing path) · the dist-rebuild discipline note (G-CUR-1) |
| **P9** | **THE 5.0.0-CUT PAYLOAD** | VERIFY/NEW · **W-1/W-2 — in the letter FIRST** | J1 Blob rename in the export-regen input (verify) · **J2 L20 `/blob/config`** (the RP-2 anchor — must be named before B2.1-swap freezes) · J3 `/styles/fonts` MIGRATION row verify (+ its twin: the `/easing` 17th-subpath GAP-3 verify-watch, deferred-census A10 — AMENDED-AT-PASS-2) · J4 the `--ring` B7 roster add (value.js is an UN-ROSTERED consumer; the demo pre-migrates fallback-first at W0-6) |
| **P10** | **TYPE STATIONS** | NEW · W-3 (W-2 if token) | the SelectTrigger size ladder +1 station (or token-indirect `--select-trigger-font-size`) · display/heading **weight tokenization** (`--type-weight-display/-heading` — the demo pins 400 at `:root`, the same shape as `--font-stack-display`) — verify-first against BG/BH before authoring (the rung may exist) |
| **KF** | keyframes letter | RE-CITE | PRM-expand: `managed-play.ts:48-59` PRM arm never emits `_onFrame` — re-verified UNCHANGED 2026-07-07 (t-a11y §6); the one-line cure |

**The demo-only register** (primitives EXIST — cite, never re-ask): T-14 liquid tokens ship ·
T-28's ghost-stroke mechanism ships · T-17 = Select composition · T-23's `veil-surface` register
ships (the knobs, not the register, are P3) · T-20's `layout:"full"` is orthogonal to the D1
defect (the packet stands) · T-29 is DEMO-owned (Dock.vue; NOT a portal ask). **Verify-at-cut
ledger** (recorded, not re-booked): L1 · L3 · L18 · F9.R1/R8 · L19-base · W-AUR-IMAGE-SOURCE ·
A4-consumed. **Consolidation law** (E-3): the letters read as this handful of gestalt packets,
never 30 line items; PRM-expand routes to keyframes, never the glass-ui letter.

---

## §5 THE COLOCATION PROGRAM (E-1; the unified target)

### §5.1 demo (t-coloc-components + t-coloc-composables-lib, reconciled)

Target shape (the two censuses' tables compose; the exemplars are `ImageEyedropper/` and
`PaletteDialog/` — generalize them):

```
demo/@/
  app/                      # the shell gets a home (or demo/color-picker/composables/)
    App.vue · composables/{useDevicePixelSnap, usePaletteManagerWiring, boot/}
    # boot/ = useAtmosphereBoot + useAtmosphere + useViewAccents + view-accents (CL-5 — the W2 subject, legible)
  palette/                  # ONE domain (dissolves composables/palette + lib/palette)
    model/ · api/ (the CL-6 exemplar, kept) · export/ (twin unified) · composables/ (facade + 10 encapsulated)
  color/                    # ONE domain: model/{color-utils,color-space-meta} · paint/gamut-ink ·
                            # composables/{useColorPipeline(+persistence folded), useContrastSafeColor,
                            #   the LIFTED picker helpers (useColorParsing/NameResolution/SliderGradients/
                            #   color-name cluster/useColorUrl), keys.ts (F3, ~24 sites), aurora-atoms.ts (F6)}
  view/ · auth/ · common/   # viewSchema+managers · 4 auth + useSafeStorage · cn()/useFilteredList
  components/custom/
    color-picker/           # ColorPicker.vue + controls/SpectrumCanvas/ [folder: 4 composables +
                            #   gamutOverlayPaint + captions] + controls/ComponentSliders/ [touch gates]
                            #   + controls/spectrumLuma.ts (2-sibling KEEP) + display/ColorComponentDisplay/
                            #   [readoutReservation] + feature composables/ (usePointerDebug…) + visual/
    palette-browser/        # card/ (PaletteCard/ folder + grid/skeleton/strip, barrel-exported) ·
                            #   admin/ (+its 4 composables LIFT-DOWN) · search/ · dialog/ (PaletteDialog/ kept) ·
                            #   slug/ (+useSlugMigration) · status/ (chip + the lamp)
    gradient/ (Visualizer/ children + PerceivedSpacePlate/paint) · mix/ (MixAnimationCanvas/ cluster) ·
    image-palette-extractor/ (+useInertiaGesture nested; +quantize-worker) · generate/ (+prng) ·
    dock/ · markdown/ · katex/ · panes/ (keys LIFTED out)
  styles/                   # UNCHANGED — already disciplined (D.W4 ran this)
```

**Migration order** (churn-minimizing, W1-demo): DROP/dissolve → contained features
(gradient/mix/extractor, 0–2 external edges) → palette-browser behind HARDENED BARRELS (the 9
external deep edges insulated FIRST) → the color-domain atomic codemod LAST (keys ~24 sites).
**Import-blast mitigations**: barrels are **named re-exports only, never `export *`** (PI-6 — SFC
scoped `<style>` is a side-effecting import tree-shaking cannot remove; CSS headroom is 33.5 KiB,
JS already 68 over); domain-qualified filenames over colliding `keys.ts`/`constants.ts` basenames;
the committed MOVE-MAP; O-23 bundle-diff ±2% per named chunk. `EmptyState` + the picker action
controls = glass-ui-first CANDIDATES flagged to the packet lane (Q16), not resolved here.

### §5.2 api (t-coloc-backend)

`modules/{palette,color,session,admin,meta}` over `platform/{db,http(+errors),cache,text,migrations}`
+ `main.ts`/`app.ts` carved from `index.ts`. MOVE + REGROUP, never a rewrite: the L boundary laws
hold verbatim (typed ApiError; routes→services; repositories-via-the-DI-seam — admin reaches other
domains ONLY through `Services.repositories`, F3); `models.ts` carves per-domain with the brands in
`session/` (`import type` keeps the graph acyclic); domain-private satellites re-home
(format/audit/atomdiff†/etag/require-ownership/admin-auth/resolve-session/hash/slugWords);
† atomdiff dies in TA-4 first. Tests colocate as `modules/<domain>/__tests__/` with a NAMED
`test/conformance/` exception (Q17). `scripts/` regroups deploy/dev/ci/gates. `e2e/` is the good
exemplar — complete the top-level grouping only.

### §5.3 src (t-coloc-src) — the FORBIDS ledger binds

The 3.x public surface is the NAME SET: the 8 `exports` keys + the symbol sets of `src/index.ts`
and the 7 `src/subpaths/*.ts` barrels. **FORBIDDEN**: renaming/removing any exported symbol;
renaming `src/subpaths/` or its filenames or `src/index.ts` (build-frozen chunk names). **FREE**
(name-preserving at the barrels): `parsing/{color,timeline,stylesheet}/` clusters ·
`color/gamut/{gamut,raytrace,boundary,okhsl}` · the `constants.ts` split (ranges stay; adaptation
matrices → `conversions/`; `GAMUT_SECTOR_COEFFICIENTS` → `gamut/` — re-exported from the SAME
barrel names). **Do NOT over-restructure**: `difference`/`contrast`/`colorFilter`/`mix`/`dispatch`/
`matrix` stay flat (distinct concerns — churn-for-churn forbidden); `easing.ts` @643 is watch-only.
The KEYSTONE is §2's demo-dogfood: land it first and every later move is a one-barrel edit. The
parse-that-free subpath invariant survives every move (the reclassified dist gate guards it).

### §5.4 Totality (E-1 "ALL file directories" — AMENDED-AT-PASS-2)

The edict is provably total; every top-level tree is dispositioned: `demo/` §5.1 · `api/` +
`scripts/` §5.2 · `src/` + the `test/` mirror §5.3 · `e2e/` top-level grouping only (already the
good exemplar) · `demo/@/styles/` EXEMPT (D.W4-disciplined) · `demo/@/components/ui/` EXEMPT
(vendored shadcn, the standing law) · `assets/docs/` EXEMPT-with-reason (11 flat leaf reference
pages already colocated with their assets; a restructure is churn-for-churn) · `docs/` is
documents, not code — governed by the doc-truth program (W0-4 + W9 rewrites), not the colocation
law.

---

## §6 ORACLES + BUDGETS

### §6.1 The new oracle slate (each names the axis it must NOT proxy away — the two S failure shapes were named-site-not-population and proxy-predicates; every mint below is one of those two repairs)

| O-# | Oracle | Shape (precedent) | Wave |
|---|---|---|---|
| O-1 | **Color-truth boot**: settle-stamped `readPixels` after an rAF fence at a known post-hydration frame; sampled center pixel ∈ the DERIVED seed's hue family (ΔE tolerance) — replaces the draw-call-count proxy | webgl-appearance, repaired | W0→W2 |
| O-2 | **Real-hydration cold-load**: drives the natural `restoreFromStorage`/`useColorUrl` path, NOT an `addInitScript`-seeded session | atmosphere-cold-load, repaired | W0→W2 |
| O-3 | **Headed real-GPU cold-load probe** (LS-7): returning-user precondition, post-arm canvas-pixel asserts, BOTH schemes; screencast-judged order | gate annex | W0; re-run W2/W7/W8 |
| O-4 | **Order-invariance**: beat marks hold order under 6× CPU throttle | CDP timeline | W2 |
| O-5 | **Pacing variance** (software-invariant): inter-frame-delta variance / dropped-frame ratio — the renderer-independent "jitter" red line F4 lacked | smoke-perf sibling | W0→W2 |
| O-6 | **Bracket resolver test** (T-26): atom resolution lands inside the bracket envelope — pure function | view-accents shape | W2 |
| O-7 | **Card-material census**: every pane + named fixture resolves to its ONE rung (membership, not fixed alpha), both schemes — the T-24 gate W5-2 never had | census loop | W3 |
| O-8 | **Tabs geometry congruence**: indicator ≡ active-button box (ε px), breakpoints × orientations × schemes × engines, both trim rungs | boundingBox | W7 (post-P4) |
| O-9 | **Shadow-palette all-cases**: zero-result ⇒ ghost present + `aria-hidden` + caption — "never a bare text plate" | browse-loading sibling | W3 |
| O-10 | **Type locks**: (a) host-independence — the trigger's computed family/style/size/WEIGHT identical across hosts (host-divergence itself is the red condition); (b) per-space line-count census (17+hex @32rem + 390); (c) tnum equal digit-advance on the shipped face (the self-host regression class); (d) display-voice family census over every title surface | resolver + rendered-advance | W4 |
| O-11 | **Header gates 1-6** (t-header-shading §4 verbatim: rest floor · no band · no double-exposure · compositor-only [CDP layout track flat] · engine/PRM coherence · one grammar) | e2e | W3/W4 |
| O-12 | **Blob set**: seat containment identity (orbit-reach ≤ 0.5 + `--blob-seat` resolve) · occlusion (`elementFromPoint` never dock) · hover-mood frame-diff floor · hover-active frame budget (NEW state, ungated today) · mobile width bound COMPUTED from the seat formula · ONE timing fixture for the three duplicating specs | promoted probes | W4 |
| O-13 | **view-accents SLIMS same-commit as T-10** (the census's one AT-RISK row — else it certifies dead code or breaks on a deleted export) | edit-in-lockstep | W6 |
| O-14 | **Preview byte-identity**: chip stops ≡ the library function's live output (the truth law — a lying preview is worse than none) | round-trip generalized | W6 |
| O-15 | (a) seal-rim NEGATIVE watch (border-style none — resurrection guard); (b) Tools settle-release assert + whole-shadow | e2e | W6 |
| O-16 | **Computed-cascade census**: interactive surfaces' computed transition duration/curve ≡ house tokens — the ONLY oracle class that catches a dist clobber (token-level checks stay green through it) | CSSOM walk promoted | W0→W5 |
| O-17 | **Easing composition**: canvas aspect ≈ 1 across container widths · ≤1 cartoon stamp in-row · dot rest (never a doubled endpoint) · one-literal law | live component | W6 |
| O-18 | **Contrast population census**: 1×1-canvas resolver over the ACTUAL consumer selectors against their REAL parent grounds (slug pills, readout fracs, graph nodes, channel letters, captions), both schemes, at the owner's reference color — the guard-leaf unit tests share the stale referent and cannot see this by construction | accent-contrast-guard generalized | W3 |
| O-19 | Netting luma-delta floor (light ≥59/255, dark ≥45/255 post-recal) — drift-back protection | computed + canvas | W6 |
| O-20 | Regenerate-inside-plate containment (the cheapest oracle in the census) | locator | W6 |
| O-21 | Gradient rail silhouette extents (ramp ≡ border-box, no terminal bleed) + rung-row grammar | pixel probe | W6 |
| O-22 | Misconfig lamp: correct variant per precondition, first-paint, dev-gated | addInitScript | W6 |
| O-23 | **Colocation bundle-diff**: gzip per named chunk flat ±2% across the codemod | build diff | W1 |
| O-24 | **LCP identity + reveal-only law check** (PerformanceObserver on the built bundle, both schemes) BEFORE any beat lands | perf probe | W2 |
| O-25 | **Prod-lineage assert**: CI/boot probe vs expected build lineage — the next stale-prod window is caught by an oracle, not an owner eyeball | CI | W0 |

### §6.2 Budgets carried (S FINAL §6.2 + the Lighthouse record)

JS eager **347.9 KiB gz** vs ≤280 — **RP-2 re-baseline stands**; cleared only at W7 (L20 + GAP-L5
together) · CSS ≤120 (86.5, headroom 33.5) with a **per-wave TRIPWIRE** (AMENDED-AT-PASS-2 — PI-1/PI-6 proved the delta ledger advisory-only): W3/W4/W5, the ladder/type/motion spenders, each re-measure CSS gz at their wave gate and RED the wave at >120; the one MET budget stays met by control, not intent, while the JS overage stays owner-adjudicated (Q14) ·
frame budgets (drag ≤20 · view ≤100 · idle ≤13 · 0 long tasks; drag headroom 12ms bounds the W4
ink-law solve) · the 390 blob perf gate (Q7) HARD · **Lighthouse run of record `28836873580`: LCP
5563ms (~2.2× over) · TBT 5618ms (~19× over) — HONESTLY RED, no gate weakened**; disposition =
Q14: budgets stay red + the **per-wave delta ledger** (PI-1: every richness wave re-runs LHCI and
records the delta, up or down) until the owner adjudicates budget/preset pairing at W8/W9.
Suites at synthesis: vitest 2158/68 green; playwright 38/39 + 1 known contention-class flake
(gradient drag — re-judged when W6-2's geometry lands); api 224/37 + tsc 0.

---

## §7 THE DEFERRED FOLD TABLE (E-4; every S book + census row → its T home; from t-deferred-census, re-verified)

| Item (CHRONIC ≥2 tranches flagged) | Owner | T home | Disposition |
|---|---|---|---|
| glass-ui 5.0.0 adopt event (**CHRONIC** ~10 tranches) | producer | **W7** | = S.W8 intact; trigger-gated (PP-5) |
| CI un-pin from tranche/BG (**CHRONIC**) · L17 rename (**CHRONIC**) | producer/repo | W7 | at the cut |
| GAP-ARM (prod-visible) | **joint** | P1 + **W2-1** (demo half) + W7 re-verify | BOTH halves fold; the demo half is NOT producer-gated |
| GAP-L2 variance atoms | producer | P1 (sized by the T-26 bracket) + W7 | the bracket is the spec |
| GAP-L5 blob halves (**CHRONIC** K→N→M→S→T) | joint | P6 + W4-5/W2-4 demo + W7 | rows A-E appended |
| PRM-expand (keyframes) | producer | KF letter + W7 re-verify | re-confirmed live 2026-07-07 |
| L20 `/blob/config` + **RP-2** | producer+demo | P9 + W7 | land TOGETHER or the re-baseline carries a 3rd tranche |
| GLASSUI-S-ASKS L2..L16 open set | producer | P1/P3/P7 (re-asked BY NAME — the W-DESHADCN fold delivered none) + W7 walk | L8 = 5th booking, escalated |
| S-3 letter-rail (FIRED) | joint | **P5** (upgraded to MANDATED by T-5) + W4-4 interim | do not wait on the book |
| X1 prod api deploy (**CHRONIC**, 2nd carry) — the backend half of T-9; publish/unpublish 404-broken for real users | **maintainer** | W9 residual + O-25 | firing op restated verbatim; never a silent 3rd re-book |
| X2 NCSU alias (**CHRONIC**, the OLDEST owner order) | maintainer | W9 residual | on-VPN op |
| the Normalized/Display brand (**L1**; S's "W2-3" book, renamed — T's W2-3 is the OVERTURE) | src | **W1-src** (last item) | the decision-doc redesign, ~58 callsites |
| `Color.try()` (**CHRONIC**) | src | park; re-justify only if a parsing wave opens | 12 try-wraps ≠ the bar |
| S.H3 Pratt (**CHRONIC**) | src/parse-that | KEEP-DORMANT (re-justified — folding it would be contrivance) | fires if parse-that presents |
| dup-useDark · PI-DRIFT-1 (+10 `out-in` sites, pi-w5b hard-fail rider) | demo | **W1-demo cargo** | |
| `/remix`+`/diff` api-hygiene — DEEPER than recorded: the stored `atomDiff` is WRITE-ONLY to the schema | api | **W1-api** (TA-4, inside the module move) | Q8 |
| `usePaletteStore` migration | demo | DORMANT (version still 1) | fires on first bump |
| `proof:*` carry (**CHRONIC** — the off-ledger headline; the doc-claimed retirement that never completed) | repo | **W0-2** | Q13 split |
| doc-truth set (5→6 · ci.yml comment · DESIGN.md numbers/facilities · src Structure) | docs | W0-4 + W9 rewrites | E-1 orphans demo/api CLAUDE.md as DOCUMENTS — full rewrites post-restructure, not diffs |
| oracle-floor blindness (F3/F4) | demo | **W0-5** | MUST precede W2 and E-7 |
| FN-7 · kf resolveEasing · CH-10/CH-13/R8-23/R-5/R-10 (**CHRONIC** spec/cross-repo) | cross-repo | W9 KEEP-BOOKED + spec-status recheck | no fired-but-unnoticed trigger (re-verified) |
| Discharged-in-S set (srgb decode, ICtCp/Jzazbz, raytrace, vue-router 5, parse-that re-pin, K-INV5, [2.0.0] entry) | — | NOT re-folded | recorded for zero-drop |

---

## §8 THE RATIFICATION TABLE (every OPEN decision; DEFAULT = this synthesis's recommendation)

| Q | Question | DEFAULT (why) | Live alternatives |
|---|---|---|---|
| **Q1** | Colocation sequencing: restructure before or after the design waves? | **BEFORE (W1)** — new design code is born colocated; the restructure is mechanical + hard-gated; MOVE-MAP + wave-open re-anchoring absorb the stale-cite cost (§3) | (a) AFTER the design waves (anchors stay live; new code moves twice); (b) interleaved per-surface (maximum churn — rejected) |
| **Q2** | The T-26 in-bracket landing point | the §2.3/t-aurora spec: chroma-adaptive hueSpread [24°,64°] · energy **0.76** · ONE counterpoint stop (+165°, 0.6×C) · softmaxBeta 4 · breath 26s — a full composition inside the bracket, judged by eye across green/warm/neutral seeds AFTER W2-1 | energy-only step (0.74–0.78, no counterpoint — safer, may under-deliver "noticeable"); wider fan only; defer the counterpoint to a second calibration |
| **Q3** | The blob seat: flush or corner-kiss? | **flush** (`--blob-seat: 0`) — containment identity holds by construction; the knob stays for the in-wave taste pass | small negative seat (a trace of corner break) — re-admits partial overflow; must re-prove no-clip at 390 |
| **Q4** | Material-ladder rung assignments needing taste sign-off | the t-card-material §3 + census §4 table; specifically: gradient perceived-space plate DROPS to well (the nested double-stamp dies) · eyedropper overlay stays chrome · PaletteCard = well · the sliders console = rung-2 WELL (an owner-word re-cut — the owner said "a little glass card"; D1 cuts a card-in-a-plate as a tone, not a second glass — AMENDED-AT-PASS-2) | keep the perceived-space plate at full cartoon (2 protagonists per pane — against the shadow budget); PaletteCard at a mid-rung; the owner-literal quiet-GLASS console card (re-admits glass-in-plate) |
| **Q5** | The Palettes rainbow form (T-10) | **data-strip chip** — a 5-segment miniature palette (the user's current palette when present, else the derived guarded fan): color-as-DATA, unifies T-10 with T-17 under the C3 law. An owner-word re-cut of "rainbow": the ratification package LEADS with the owner-verbatim letterform reading, chip second as the recommendation (AMENDED-AT-PASS-2) | letterform-ramp (`background-clip:text` — the owner-verbatim memory; re-opens the letterforms-speak-ink law for ONE named row; encode as a sanctioned exception if picked) |
| **Q6** | E-7 depth | ONE late wave (W8): per-surface critique passes (batches of 3) → remediation lanes → ONE owner certification package; owner = terminal authority, brackets not points | two-stage (a mid-tranche checkpoint after W4 + the close pass) — catches drift earlier, costs a wave |
| **Q7** | Packet-dispatch timing | **at ratification (W0-1), immediately** — WS12/B4e are OPEN but are the LAST window; the W-3 behavior packets unblock T's own waves via the file:-pin; P9 named first | hold until the BG frontier quiets (risks missing W-1/W-2 = a post-5.0.0 second break event, forbidden by the one-migration edict) |
| **Q8** | The api-hygiene excision depth | **full TA-4**: routes + services + validation + meta rows + the fork↔remix fold + drop `PaletteVersion.atomDiff` + `lib/crud/atomdiff.ts` (KEEP `computeAtomSetHash`); inside W1-api | routes-only (leaves the write-only column — the exact E-3 violation TA-4 proved reaches the schema) |
| **Q9** | Header material authority (C2) | **the ladder** — rest = quiet-derived fill inside the eye bracket [0.45, 0.65 of the veil], stuck = floating+tint rung-climb; feather at every state; expressed AS ladder rungs, not an off-ladder alpha fade | the independent `veil-surface` alpha-fade (re-mints the off-ladder-material class T-CM-4 indicts) |
| **Q10** | Does Tools/Login live-accent CHROME fall under "the rest white/black"? | **NO** — the owner's line is menu-scoped; chrome keeps the live accent (W7-4's surviving voice map); ruled here rather than silently widened | extend the ink law to chrome (kills the dock's one chromatic naming point — the white/black menu's counterweight) |
| **Q11** | Readout line-lock levers (T-7 at ×φ) | levers **1+2** (per-space integer least-counts + the fit clamp), lever **3** for lab-class (honest 2-line locks; ictcp/jzazbz 2-line at <sm); lever 1 is REQUIRED at 390. The ×φ reading itself (two token steps = ×1.618, the D2 owner-word re-cut of the literal 1.5) rides this row — ratifying Q11 ratifies ×φ (AMENDED-AT-PASS-2) | hold lab at 1-decimal one-line via fit-down ~×1.08 (rejects the owner's size intent); blanket 2-line everywhere; the literal ×1.5 (one step √φ≈1.27 under-delivers; a true 1.5 mints a non-token size off the golden scale the owner invoked) |
| **Q12** | T-28: abrogate vs fitted ring | **ABROGATE at the seal** — wax + glyph already carry identity; a third concentric boundary at 40px is over-drawing, and the geometric one can never fit; the producer solid-ring register (P5) becomes the standing law for any future ring | consume the fitted producer ring on the wax (once P5 ships) — a ring, correctly seated |
| **Q13** | The proof:* split | legacy-sweep F5: retain-reclassify 4 dist-behavioral gates into CI-wired `test:dist`; excise 8 + the favicon script; CLAUDE.md names which batch retired | excise all 12 (simplest; loses real dist-level round-trip/perf coverage vitest doesn't reach) |
| **Q14** | The Lighthouse LCP/TBT record disposition | keep the budgets RED + the per-wave delta ledger; adjudicate budget/preset pairing WITH the owner at W8/W9 (lab-mobile field thresholds on a KaTeX+WebGL SPA may be mis-paired — but TBT 19× is also a real payload finding RP-2/L20 partially answers) | re-baseline now (premature — no delta history yet); desktop preset now (loses the mobile signal) |
| **Q15** | The 5 leaked conversion primitives' citizenship (src §2) | **promote** the genuinely-useful leaves (`linearToSrgb`, `hsl2rgb`, `oklch2xyz`/`xyz2rgb`, `hex2rgb`) into the `/color` subpath + index with a MIGRATION note — they are real API the demo proved demand for | keep internal; the demo re-derives via `color2()` (slower on hot paint paths — the gamut overlay samples per-pixel) |
| **Q16** | `EmptyState` + picker action controls: glass-ui primitives? | flag both in the packet letter as CANDIDATES (producer's call); until answered, `EmptyState` lifts to a shared demo atom, the action controls stay picker exports consumed via the hardened barrel | force the producer ask now (pre-empts the producer's own ≥2-consumer bar) |
| **Q17** | Backend naming + test policy | `modules/` + `platform/`; colocated `__tests__/` per module + a NAMED `test/conformance/` exception (contract suites) | `features/`+`core/`; full colocation including conformance |

---

## §9 DISSENTS (pass-2 critique dispositions — nothing silent)

- Fidelity's Q10 row ("keep the Tools/Login chrome carve-out an explicit ratified decision"): NO
  CHANGE — Q10 already IS the explicit ratification row, ruled-not-silent by construction;
  re-encoding it would duplicate the table.

Every other pass-2 mustFix/shouldFix was folded (the AMENDED-AT-PASS-2 markers above). No question
opened or closed: the two owner-word re-cuts route through EXISTING rows (T-5 console → Q4; T-2 ×φ
→ Q11) — the slate stays at Q1–Q17.

---

*Provenance: every claim above cites its authoring lane; the lanes carry the `file:line` evidence
and the live-probe records. Where two lanes conflicted, t-contradictions §4's reconciliation
ledger governs (C1→W4's single-writer knot · C2→Q9 · C3→the T-24 law + ledger · C4→W2's internal
order · C5→the console is a WELL · C6→one curve family). The mandate §0 + addenda remain the
ceiling over all of it.*
