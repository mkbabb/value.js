# N — WAVES-2: the re-divined second wave block (N.W10–N.W18, then W8/W9 re-sequenced)

**Authored**: 2026-06-12, lane S1 of the second N-fleet (lanes2). **Mode**: planning-only;
dispatch gates on explicit user ratification of THIS revision.
**Supersedes**: the dead **N.W6** (PLANNED, zero impl commits, only the dock-first-paint sliver
in `199fd15` — R1 §4) and re-sequences **N.W8/N.W9** AFTER this block.
**Canon**: `audit/user-audit-2026-06-12/LEDGER.md` (U1–U33 + 6 standing directives — OUTRANKS all prior
claims) → the lanes2 corpus (R1–R4 · D1–D8 · U-* · L-* · X-*) → `N.md` → `PROGRESS.md`.
**Zero drops**: §5 is the coverage map — every LEDGER row and every open R3 fold row appears
exactly once.

**Why the re-divination**: W6's death is the proximate cause of the entire user-audit corpus
surviving a "green" tranche (R1 §4–5). The user re-audited the un-executed W6 from the live app;
W6's monolithic "suffusion" charter cannot survive — it decomposes into the per-surface waves
below, with the FUNCTIONAL defects first, the GRAND HIERARCHY as the keystone stage, and the
glass-ui-blocked halves split honestly from the unilateral work.

**Standing mandates binding every wave**: no-legacy (interim shims DIE at the consume — no
parallel forks), idiomatic gestalt (fix the root, not the symptom), KISS (no new shared/ dirs,
no wrapper contrivance), **Fable on every design/synthesis implementation lane** (orchestration
on the core model; opus/sonnet fan-out), chrome-devtools MCP + frontend-design plugin + modern-web
guidance on every visual lane, π paired before/after evidence at every design gate.

---

## §1 — The wave set

| Wave | Kind | One line | Blocked-on-BA? |
|---|---|---|---|
| **N.W10** | IMPL unilateral | Functional truth: U9 reset, U33 aurora-motion, the save data-loss P0, the kC placebo, **the CSS-cascade substrate kill (U11 root)** + single-mount | no |
| **N.W11** | IMPL unilateral (library) | U10 color-SOTA: gamut-map re-anchor + §13.2 oracle + wide-gamut egress → 0.12.x/0.13.0 | no |
| **N.W12** | IMPL unilateral (Fable) | THE GRAND HIERARCHY (D6 keystone): font root, accent axis, dark ladder, layout clamp, depth-grammar laws, ramp + φ tokens | gray-token half consumes BA free at pin |
| **N.W13** | IMPL split (Fable) | CONTROLS: sliders/dropdowns/rail/pills/clip + the a11y cluster | size-axis, Select bound/rung = BA; interims land now |
| **N.W14** | IMPL split (Fable) | CARDS: PaletteCard first-class, depth-grammar applied, skeletons glassy, empty-state CTAs | watercolor-ghost = BA; all else unilateral |
| **N.W15** | IMPL split | PERF: idle-floor, reflows, reactivity, bundles + the U6/U16 dock-morph verify harness | dock FLIP A-1, zombie-canvas, card-shrink keyframes = BA |
| **N.W16** | IMPL unilateral (Fable) | PER-PANE: picker hero, gradient+easing, mix, extract, docs + the modern-web carry | easing-configurator consume = W18 |
| **N.W17** | IMPL unilateral (Fable) | SHELL + MOTION + POPS: dock scale, 14→3 transition families, view-select moment, celebration, nomenclature | spring-clock tokens refine at pin |
| **N.W18** | IMPL cross-repo | Consume-on-their-land: the BA-cut re-pin + adopt sweep, easing-configurator consume, kf/fourier coordination | **gated on the BA cut** |
| **N.W8′** | IMPL unilateral | (re-sequenced) Hygiene + reconciliation + **the wire-deploy ceremony** + doc-truth (R4's exact lists) | no |
| **N.W9′** | DEV close | (re-sequenced) v1.0.0 + π + FINAL.md; pin discharged by W18 | pin target = the BA cut |

---

### N.W10 — Functional truth + the substrate kill (the gate-opener)

The user's functional rows + the one CSS defect that makes every desktop/design wave possible.

| Lane | Work | Anchors |
|---|---|---|
| A — U9 reset | `resetToDefaults` writes the FULL default into the persisted store (today only debounced `inputColor` syncs — the store/model desync); repaint the contenteditable unconditionally on reset; design call on the already-default no-op (U-FIXES §1: the chain is NOT dead — random-seed or confirmation pulse) | `useAppColorModel.ts:43,62-68`, `ColorInput.vue:248-250` |
| B — U33 aurora | Demo default `motion:"breathing"`→`"drifting"` (the TRUE root — `MOTION_FIELDS.breathing` zeroes all spatial drift; the software-GL-probe suspect X15 is REFUTED, U-AURORA §1); `colorEnergy 0.55→0.7`, `zones 4→5` (D5-8 / D6 §5.1); the **temporal e2e gate** (two samples 3 s apart, mean |Δ| ≥ 3/255 on ≥25% of a 16-pt grid; inverted under PRM — **thresholds are S1-authored, CALIBRATE AT IMPLEMENTATION**: U-AURORA measured only the dead baseline ±1–2/255 under `breathing`; nothing was measured under `drifting`) — the gate the W5 screenshot pass was structurally blind to. glass-ui `breathing`-register amplitude ask FILED (X-GU A-4) — consume at W18 | `demo/@/components/custom/panes/keys.ts:24-28`; glass-ui `atoms.ts:164-168` (ask) |
| C — Save P0 + kC + degraded-backend | **The save flow silently destroys data** (D7 §3.4): local-first — `createPalette` unconditional, `ensureUser()` deferred to publish; **the kC slider is a placebo** (D3 §4a): thread `chromaWeight` through `quantizeFromFile` to the worker + a divergence vitest; delete the `VITE_API_URL` hack → typed degraded-backend (K-INV5 — it currently masks the P0 and pollutes every console-clean gate with CORS noise) | `usePaletteActions.ts:59-63`, `useImageQuantize.ts:91-99`, `demo/@/lib/palette/api/client.ts:29` |
| D — The cascade kill + single-mount | glass-ui `dist/styles/components.css` ships **unlayered** `.flex/.block/.hidden` → per css-cascade-5 they beat ALL layered demo utilities → `lg:*` dead → the desktop dual-pane never renders (**U11's true root** — NOT the router, NOT `@source`; D8-1/U-DOCK §2). Demo-side one-liner NOW: `@import "@mkbabb/glass-ui/styles" layer(glass-ui)` (+ the `styles.css` twin); the producer fix (layer-or-namespace the dist + emission gate) is the FILED X-GU Register-B ask. **In the same files**: collapse the dual breakpoint mounts to a `v-if`-gated single mount (X6/L-PERF1-1/L-PERF3-1a — kills the hidden live WebGL2 context + halves the picker reactive subtree; MUST land before the desktop render becomes visible or the dual blob doubles on screen). Extend boot-smoke with a COMPUTED assert (`pane-wrapper` display ≠ none at 1440) — emission probes proved insufficient (the P9 class's second life) | `demo/@/styles/style.css:52-53`, `App.vue:34-69`, `scripts/` boot-smoke |
| E — Data hygiene | `inputColor` normalized-values-stamped-as-raw-`lab()` corruption on space-switch (L-COLOR §3.3); coerce the `availableTags` Object→Array warn (X9, `BrowsePane.vue:135`) | `useAppColorModel.ts`, `BrowsePane.vue:135` |

**Hard gate**: reset round-trips model+URL+store+input-field; save with backend down still
creates the local palette (zero data loss); kC divergence test green; BOTH `.pane-shell`s > 0×0
at 1440 on every dual route (U11 closes structurally); exactly **1** `goo-blob-canvas` in DOM at
any viewport; aurora temporal gate green; console clean (no CORS noise).

---

### N.W11 — The library color-SOTA wave (U10) → 0.12.x/0.13.0

L-COLOR's verdict: the conversion math is CSS-Color-4-exact; **the gamut-mapping POLICY is the
defect** — Ottosson adaptive-L0 α=0.05 annihilates 83% of the default pink's chroma
(0.2724→0.0464, 11.5× JND). Unilateral, analytical, clean π.

| Lane | Work | Anchors |
|---|---|---|
| A | Re-anchor the Ottosson clip toward the **cusp** for high-L colors (or a strategy enum); `findCusp` already exists; promote `GAMUT_ALPHA` to a tuned/L-adaptive value. Target: the default pink lands OKLab C ≥ ~0.12 (visibly pink), hue held exactly (the browser's +339° magenta rotation stays forbidden) | `src/units/color/gamut.ts:141,238,247,264-277` |
| B | The CSS §13.2 binary-search OKLCh map as the **test oracle** (deltaE-OK ≤ 0.02 acceptance) + a regression corpus of far-OOG light pinks/yellows/cyans | `test/` (new) |
| C | Wide-gamut egress parity: `xyz2displayP3`/`xyz2rec2020`/`xyz2adobeRgb` gain the `correctGamut` clamp `xyz2rgb` has — `colorUnit2` must never emit raw r>1 P3/rec2020 | `src/units/color/conversions/xyz-extended.ts:61-79`, `dispatch.ts:301-306` |
| D | OKLCh display-range reconcile: the default pink's normalized C = 0.545 overflows the declared `[0,0.5]` max — widen or document-and-clamp (the picker slider must not peg silently) | `src/units/color/constants.ts:72` |

**Hard gate**: swatch π before/after (the 4-way comparison of L-COLOR §2 re-rendered); oracle
suite green; egress in-gamut per space; version cut published; kf notified at the cut.

---

### N.W12 — THE GRAND HIERARCHY (the D6 keystone: U1 + U32)

The stage every per-pane lane plays on. **Sequencing spine within the wave: A (fonts) + B
(accent/dark) FIRST** — audacious type is invisible in Times; chroma is impossible while
`--primary` ≡ `--foreground`. All lanes Fable.

| Lane | Work | Anchors |
|---|---|---|
| A — The font root (U1-fonts) | Fix the `@theme inline` split-brain (the demo's `--font-display: Fraunces` never reaches the `.font-display` utility — override the `--font-stack-*` SOURCE the bridge inlines); import `@mkbabb/glass-ui/styles/fonts` (0 real Jakarta/Fira faces load today — the "brand" text is the OS font); resolve Fraunces availability (the trigger paints Times); **adjudicate the docs font-flip NOW** (strip blanket `font-display` from the markdown body — D4 WO-3 — Fraunces is reserved to display rungs; this wave's A-lane detonates the latent flip otherwise). The three-voice law: Fraunces = display only; Jakarta = body/control; Fira = annotation; italics never on control text | `demo/@/styles/style.css:52-53,64-66`, `demo/color-picker/index.html:11-18`, `Markdown.vue:10`, `ColorNutritionLabel.vue:2` |
| B — The chroma answer (U1-gray) | **Populate the accent axis**: mint `--accent-live` (the contrast-guarded live color via `safeAccentColor`) and re-point `--primary` to it (today `--primary` ≡ `--foreground` — every CTA/ring/stroke is ink, D6 root-2); `--glass-tint-source` on Z1 plates; dark ladder retune 6/12/16/20 warm + de-navy `--border` (dark `hsl(217 33% 18%)` is the lone cool hue in a 24/48-warm house — U26's literal root); mint solid muted-ink tokens + ban `/40`–`/50` alpha text (D8-6 — muting by veil IS the gray wash in miniature) | `style.css:101-122,215-225`, `src/units/color/contrast.ts` |
| C — The layout system (U32) | The clamp rewrite: `--pane-min 30rem / --pane-max 44rem / φ-stepped gap`; container `min(100vw − pad, 2·max + gap)` (≈1434 cap); `1fr 1fr` equal always; **delete the 10 self-clamps**; the aspect law (`min-width:1024px AND min-aspect-ratio:1.1` — the portrait pathology D6-03); vertical optical lift; **container queries** as the mechanism (`container-type: inline-size` on `pane-wrapper`, size by `cqi` — structurally immune to the D8-1 viewport-variant kill class); DOM order = visual order on the picker (D8-3c, same files); **re-point the W10.D boot-smoke gate** under the new clamp/container-query layout (verify, not re-land — W10.D owns the CI artifact) | `style.css:132-133,146-159,189-209`, `ColorPicker.vue:2`, 9 pane shells |
| D — The depth grammar (laws + mint) | Codify the Z0–Z4 rank table + the six laws into `demo/DESIGN.md §Depth` (one shadow voice; the cartoon budget = plates + ≤1 protagonist/pane; hover lifts never lurch; hairlines glassy via the **`--card-edge` mint** — ONE mint, owned here, consumed by W14; windows are veil; z-tiers never faked by shadows); the 9 `tier="wash"` shells → Z1 resting+cartoon; ConfigSliderPane → veil | D6 §3 sites; `style.css:222` |
| E — Ramp + rhythm tokens | `PaneHeader` `rank: hero\|companion` resolved from `VIEW_MAP` (one file lifts 14 panes); the §2 display-ramp assignments + the card-lock law (tabular-nums + ch reservation, normative) into `DESIGN.md §Type`; the **φ space ladder minted** (`--space-phi--2..3`: 6/10/16/26/42/68 — D4's design, app-wide home in `style.css @theme`; the glass-ui token ask rides W18) | `PaneHeader.vue:78-85`, `viewSchema.ts`, `style.css @theme` |

**Hard gate** (D6 §6 verbatim): per-card widths {490@1024 · 616@1280 · 695@1440 · 704@1536+} ±4;
portrait → single column; display rungs compute their resolved values AND
`document.fonts.check` proves a REAL Fraunces face; `oklch(--primary)` chroma ≥ 0.03 both
schemes; cartoon census == plates+protagonists; zero dark borders in hue 200–240; slider drag
min→max changes NO `.pane-shell` rect; boot re-verify under U1 (the N-P0-1 re-verify).

---

### N.W13 — CONTROLS (sliders · dropdowns · rail · pills · clip · a11y)

Split honestly: the primitives EXIST (U-CONTROLS: the glass-ui `Slider` spectrum variant is
built for this picker "EXACTLY"); the demo must consume them; the producer build defects are
FILED asks with interims that die at the pin. Fable design lanes.

| Lane | Work | Anchors |
|---|---|---|
| A — Sliders + rail | Migrate `ComponentSliders` raw-reka → glass-ui `<Slider variant="spectrum">` with the real `--slider-track-bg` gradient (U20b — the spectrum-glass slider half of U20; deletes the 189-LoC duplicate touch-gate stack); **the thumb carries the live color** (`thumb live-color`, the W6.C carry — D1 §5; NOT implied by the consume: the primitive's thumb is a size mechanism only, U-CONTROLS §U28); **decompose ≤400 LoC** (R4-2: 418 today — the rail lift serves U13/U14); U14 letters per-row `place-self:center` + delete the in-row range captions (the 9–12 px growing drift dies by construction); U13 the veil capsule (`veil-surface` + `radius-pill` hairline around the tablist — a re-introduction, not a restore: the remembered "ellipse" was the deleted blob orbit, U-cards §2); letters lift to `text-heading`; `ConfigSliderPane` spectrum sliders get real gradients. **U28 interim**: `[data-size]` scoped CSS (the pattern `Slider.vue:150-154` already proves) until the BA size-axis fix; tracks land 28 px lg | `ComponentSliders.vue:3-15,43-51,75-106,259-344`, `ConfigSliderPane.vue:137-139` |
| B — Dropdowns | U7 demo half: drop the bespoke `sm:text-display` trigger override (a measured cascade no-op anyway) → one `text-display-2` rung; ride the family `--dropdown-text` lever (the glass-ui font-rung PROP is the filed WO-3 ask). U8 interim: the kf consumer-cap idiom — a self-scanned `max-h-[min(24rem,60dvh)]` + `overflow-y-auto` on `SelectContent` consumers NOW (the glass-ui `@source "../components"` dist breakage is the FILED WO-1 root); U23 re-verify after the bound (the jerk is the zoom over an unbounded 745 px box, downstream of U8). U30a: the specimen-row menu (D1-3 — display-face names, live per-space conversion line, WatercolorDot swatch, glass tier; kill the group-level mono) | `ColorSpaceSelector.vue:16-37`, `DockViewSelect.vue:54` |
| C — Pills + clip | U21: delete the `pb-2` on the segmented-control wrapper (D7-9 measured: glass-ui innocent; the pill rides 4 px high). **U21 conflict recorded**: D3 §6's font-metrics diagnosis contradicts D7-9's live measurement (pill text centered 3.5/3.5) — D7's measurement governs; the X-GU **A-5 ask is verify-after-`pb-2`-deletion** (it stands as a W-TABS confirm-no-regress acceptance row only; withdraw as a defect claim if the deletion closes U21); U29: the clipped-text reveal ladder — `:title` minimum, glass tooltip at the 13 zero-affordance sites (U-CONTROLS census), 2-line budget where the grid affords | `panes/PaneSegmentedControl.vue:4`, the 13 truncate sites |
| D — The a11y cluster (same files) | **Focus rings paint nowhere** (D8-2, WCAG 2.4.7 app-wide): one `@layer base :where(:focus-visible)` accent-ring rule + sweep every `focus-visible:outline-none` suppressor; tap-target floor (D8-5: 25 of 26 picker targets sub-48; thumbs 12×24; segmented 22 tall) fused into the W12/W13 resizes; names/labels (D8-4: nameless trash/confirm/send buttons, placeholder-only inputs, "My Palettes3" concat); the gradient-stop keyboard spec (D8-3a: APG slider pattern — authored ONCE into the glass-ui slider/easing asks) | `ActionButton.vue:14`, `GradientStopEditor.vue:107-148` |

**Blocked-on-BA (interims die at W18)**: the slider size-axis real-CSS fix (X-GU A-3), the
Select bound emission + font-rung prop (A-2/WO-1/WO-3), per-density dock glyph (D5-1 → letter A′-6).
**Hard gate**: one slider codebase (raw-reka deleted); the thumb paints the live color;
letter↔track centers ±1 px; pill centered; focus ring paints on every probe; zero nameless
visible buttons; ComponentSliders ≤ 400 LoC.

---

### N.W14 — CARDS + skeletons + empty states (the depth grammar applied)

Consumes W12.D's laws + `--card-edge` mint. Fable design lanes.

| Lane | Work | Anchors |
|---|---|---|
| A — PaletteCard first-class (U24) | `material="glass"\|"cartoon"\|"flat"` + `skeleton` as a STATE (same shell, zero drift); `PaletteCardSkeleton.vue` DELETED; 7 consumers pass a material; cartoon = the ONE protagonist per pane (extract/generate result), never list rows; `v-memo` list contract lands with it (LP3-7) | `PaletteCard.vue:5-13`, 7 consumers |
| B — Depth sweep (U17/U19/U26) | `border-border` navy → `--card-edge` on content cards; cartoon off inner swatches (`GradientVisualizer.vue:122` the worst fighter); hover = grow-from-base + `translate(-2px,-2px)` (the none→10px lurch banned); the 13 raw `rounded-lg/xl/2xl` → role tokens; `--radius-input` 4-vs-8 drift decided + documented | `GradientVisualizer.vue:122`, `PaletteCard.vue:7`, `MixResultDisplay.vue:31`, `GradientCodeEditor.vue:138` |
| C — Skeletons glassy (U20a) | Re-author onto glass-ui `<Skeleton variant="shimmer">`; bones CARRY COLOR (strip segments tinted `color-mix(in oklab, cssColorOpaque 10–16%, transparent)` stepped — a skeleton in a color app promises color); browse spinner → 3 staggered skeleton cards; refine onto `surface="glass"` at the BA pin (W-SURFACE-AXIS) | `PaletteCardSkeleton.vue` (dies), `BrowsePane.vue:24-29` |
| D — Empty states → CTAs with pops | ONE grammar (D3 §7 + D7-3 merged): display-ramp headline, WatercolorDot trio tinted from the live color, a real glass-ui `<Button>` CTA (palettes "Add color" / browse "Retry"+"Publish yours" / extract "Upload"+"Camera"); mono micro demoted to subline; admin keeps `tone="quiet"`; the `DockIconButton`-as-body-button misuse retired; sticky `PaletteControlsBar` → translucent + blur (D3-9) | `PaletteCardGrid.vue:13-18`, `EmptyState.vue`, `BrowsePane.vue:32-49`, `PaletteControlsBar.vue:2` |
| E — Dashed-ghost interim (U18/U22) | Harmonize the TWO dashed idioms (the square add-slot vs the circle twin vs `.dashed-well`) onto one dashed grammar + kill the phantom `watercolor-swatch` class; the PROPER watercolor ghost (`WatercolorDot variant="ghost"` — PRNG silhouette as stroke) is the FILED X-GU C-2 ask, consumed at W18 (the interim dies there) | `MixSourceSelector.vue:148`, `CurrentPaletteEditor.vue:83`, `utils.css:56` |

**Hard gate**: π element pairs vs u12/u16/u17/u21/u23; `PaletteCardSkeleton.vue` absent from
tree; cartoon census per route within budget; zero `border-border` on content cards.

---

### N.W15 — PERF (L-PERF1–3 + the U6/U16 dock harness)

L-PERF2's proof: U6/U12/U23 are ONE root (the ~4-RAF idle floor + per-frame reflows), not three
cosmetic tweaks. The dual-mount kill landed at W10.D; this wave does the rest. `DOCK_SPRING` is
fenced — correct, do NOT retune.

| Lane | Work | Anchors |
|---|---|---|
| A — Idle floor + GL hygiene | Aurora defer-arm (decorative — arm post-first-paint) + DPR cap ask (2880×1800 backing ≈ 20 MB for a blurred wash); lazy-`import()` the `aurora`/`goo-blob` glass-ui chunks (~170 KB off first paint, LP3-8a); lucide out of the two boot-critical modules (string-keyed icons, LP1-2) | `App.vue:247-252`, `usePaneRouter.ts:32`, `viewSchema.ts:32` |
| B — Interaction reflows + fan-out | Cache the spectrum rect on `pointerdown` (the per-frame `getBoundingClientRect` after same-frame invalidation — LP2-1); coalesce the aurora-seed + blob-palette + slider-gradient sinks into ONE rAF-batched effect + kill the double `deriveAurora` (LP3-5a); memoize `computeSliderGradients` — re-stripe only the dragged channel (~⅔ of 33 conversions elided, LP3-5b) | `SpectrumCanvas.vue:109`, `App.vue:269-306`, `useSliderGradients.ts:26,45` |
| C — Reactivity + bundle hygiene | `shallowRef` the ~10 wholesale-replaced API arrays (LP3-6); entry-chunk eager-pane audit post-desktop-render (LP3-8b) | `useBrowsePalettes.ts:20` et al. |
| D — Gates + the dock harness | **Production Lighthouse trace** against `npm run gh-pages` output (the missing artifact — never mistake the 5 s dev LCP for prod); the **morph-truth e2e** (D5-5: per-rAF width ∈ span ±5%, no >40% jump, 1%-settle ≤ 450 ms — **born-RED until glass-ui A-1**, by design); perf invariants in CI: single-mount, no offscreen live GL, composited-motion CLS ≤ 0.1, no per-tick router churn | `e2e/smoke/`, CI |

**Blocked-on-BA (verify at W18; ALL filed — letter registers in parentheses)**: the
nested-DockLayerGroup FLIP `to:0px` fix (X-GU A-1 — the DETERMINISTIC U6/U16 root:
wrong-direction 55→19 px spring + 455 ms dead-hold + 1-frame snap, U-DOCK §1); the GooBlob
zombie second canvas (LP2-2 → A′-1); GooBlob visibility/PRM gate (LP3-1b → A′-2); the
`card-*-shrink` layout-animating keyframes (CLS 1.03 → composited, LP3-3a → A′-3); the
`--dock-morph-t` 10-selector calc-cascade narrowing (LP2-4/5 → A′-4); the aurora DPR cap
(LP1 → A′-5).
**Hard gate**: idle RAF loops ≤ 2 (aurora + visible blob); spectrum-drag reflow attribution
empty; prod Lighthouse recorded; the perf invariants wired; U6/U16 close ONLY at the pin verify.

---

### N.W16 — PER-PANE (D1–D4 + the dead-W6 corpus)

The W6.A standing Fable per-pane structure governs: per-pane Fable agents + 1 synthesis lane,
re-runnable; W0-style gate = boot-green console-clean on all 14 routes (now REAL post-W10.D).

| Lane | Work | Anchors |
|---|---|---|
| A — Picker (the hero pane) | D1-1 hero-number system: `text-hero` @ display-3, per-channel `AnimatedDigit` cells, the ch-reservation table from `COLOR_SPACE_RANGES`, 2-line block lock, demoted commas, em units — U31's card-lock by construction + U2's prose-flow (atomic cells, no orphaned commas) + the missing `h1` semantics (D8-7/-10); D1-4 blob absolute top-right `w-[11rem]` with negative-inset corner break + header footprint reservation (U30b — today it grid-flows top-CENTER and collides with the numbers); the U3 demo halves: seed L-floor/saturate before `deriveBlobPalette` (the pallor is the near-white SEED, not the deriver — U-BLOB disproved `chromaCeiling`), `brightnessShift` trim, the default-color reseed decision (pairs W11 — the OOG pink is pathological); D1-7 in-card φ rhythm (spectrum = the φ anchor `lg:h-[16rem]`); delete the mounted-`display:none` `EditDrawer` (T21) | `ColorComponentDisplay.vue`, `ColorPicker.vue:4,22,25-30`, `HeroBlob.vue:8`, `index.ts:36`, `App.vue:296` |
| B — Gradient + easing (U25) | WO-G1 ONE hero surface: the eased gradient WITH its piecewise curve drawn on it (stop handles ride up; interval select highlights its segment; dual-ring handles + position badge; the redundant second rectangle dies); WO-G2 φ rhythm + tinted section heads; WO-E2 the easing hierarchy INTERIM (hero curve canvas 160–280 px with grid/diagonal/axis labels, chip rail, tokenized stroke — the `hsl(248,88%,71%)` literal dies, de-italicized control register, `resolution` expose-or-delete) — restyles `EasingSelector` in place, NO parallel component; it dies at the W18 configurator consume | `GradientVisualizer.vue:118-230`, `GradientStopEditor.vue:104-149`, `EasingSelector.vue:56-64` |
| C — Mix | WO-M1 un-withhold the result (computed at t=0, gated 3.06 s behind hardcoded timers — measured): render immediately, the animation becomes celebration; **the PRM gate at the composable boundary** (T16/inv-N-9 — the ONE live un-gated RAF, shipped in 0.12.0); re-entry guard; one ~900 ms beat on the Family-B tokens; WO-M2 preview honesty (the suffuse averages sRGB means — pass the REAL result css; the perceptual-mixing library must not ship a non-perceptual preview); WO-M3 wash discipline (the header must never drown); WO-M4 CTA pop + register unification + result numerals on the display ramp; 1440-clipping re-verify post-W10.D | `useMixingState.ts:64-104`, `useMixingAnimation.ts:77-206`, `MixPane.vue:63-114`, `MixResultDisplay.vue:31-47` |
| D — Extract | D3-5 the dominant hero: max-population swatch (derive from the returned palette — NO second worker call) + oklch numerals on the display ramp + "**41%** of the image" as the audacious stat; population-proportional strip (`:weights`, floor 8%) + swatch-popover share (T19); D3-6 the dup-shell collapse: `useExtractSession()` + ONE workbench, capabilities UNIFIED (pane gains camera, dialog gains eyedropper), `ExtractPane` → ~40-LoC shell (T20) | `ExtractPane.vue:117-181`, `ImagePaletteExtractor.vue:125-232`, `PaletteColorStrip.vue:21-22` |
| E — Docs (U4/U5) | D4 WO-1 **the headline**: the entire markdown stylesheet is structurally dead (scoped selectors can never match the foreign-rendered children — every h2/p/pre computes 16px/0-margin) → delete the scoped block, author unscoped `docs-prose.css` on the glass-ui ladder + the computed-style witness in CI (the anti-P9 gate); WO-2 KaTeX `output:"html"` ×2 + display-math glass wells with the live-accent rule (kills the MathML matrix mangle + the 564-px clip); WO-5 the Definition lede (frost card, mono eyebrow, Fraunces-italic pull-quote, φ³ seam — U4's 1-px seam dies by design); WO-6 pane-h1 ramp + sticky glass tier (the bleed-through F8); WO-7 68ch element cap + tabular nutrition values; the φ ladder APPLIED (U5 — dividers breathe φ² both sides) | `Markdown.vue:10,68-316`, `Katex.vue:21`, `useMarkdownHighlighting.ts:89`, `ColorNutritionLabel.vue`, `AboutPane.vue:16-27` |
| F — Modern-web carry (the twice-deferred M.W6→N.W6.D set) | Router 4→5 + typed routes + `VIEW_MAP` single-source (K-W5RT) + the hash-write debounce + no-op `scrollBehavior` (LP3-4 — the 103 ms `computeScrollPosition` reflow class dies); `dispatch.ts` hue-cluster → `mix.ts` (K-DISP/X12); demo `Palette` id-honesty (K-PALID); the PaletteDiff view: serve `/diff` + wire the demo diff render or record cohort-only and stop persisting (K-W3DIFF — the W3.F decision falls due) | `usePaneRouter.ts`, `viewSchema.ts`, `useColorUrl.ts`, `package.json:121` |

**Hard gate**: per-pane π DELTA evidence (the W6.A structure); result-appears ≤ 150 ms (vs
3061 ms baseline); zero rAF frames under PRM on `/mix` (inv-N-9 CLOSES); markdown h2 computed ==
`--type-heading`; population visibly threaded; vue-router@5 in lockfile; suites green.

---

### N.W17 — SHELL + MOTION + POPS (D5 + D7 + the nomenclature standard)

| Lane | Work | Anchors |
|---|---|---|
| A — Dock scale (U32-dock) | `density="spacious"` (the rung sits on the shelf — consumed by nobody) + the glyph-ratio override; hit-target floor on the 22/24 px bespoke sites; the shell φ rhythm (inset 13 / clearance 34); first-paint expanded posture KEPT (recorded — no re-litigation) | `Dock.vue:93,198`, `SlugEditLayer.vue` |
| B — Motion unification (U12-motion) | **12** demo-authored `*-enter-active` families (U-DOCK §3's "14" double-counted two glass-ui-SHIPPED families — `pop`/`fade-slide`, `dist/styles/transitions.css:23,63`, already consumed at 5 demo sites with zero demo CSS) → **3 semantic families (pane / pop / fade)**: the demo AUTHORS only `pane`; `pop` + `fade`/`fade-slide` are CONSUMED from glass-ui (the names collide with the producer's shipped vocabulary — consume, never re-author) + `transitionName` TYPED at the prop boundary (the vocabulary closed by the type system, the L idiom); the clock fix (`--spring-snappy` mis-paired with `--duration-slow` — use the solved settle, then the `--spring-*-duration` tokens at the pin); retire the `grid 0fr→1fr` third substrate onto the dock morph clock; adopt `document.startViewTransition` in `PaneSlot` (PRM-gated; glass-ui's `view-transition.css` ships unconsumed — D8-9); `.pane-wrapper` layout-prop transition → transform (LP3-3c) | `App.vue:331-368,315`, `PaneSlot.vue:35`, `Dock.vue:215-227` |
| C — The view-select moment | The trigger goes display-voice (Fraunces italic, `text-title` rung in the spacious trigger — the app's TITLE deserves it); menu rows ≥ 40 px at trigger-parity-minus-one; the 8 px gray dot → the WatercolorDot active/ghost pair; per-view semantic accents; `pastel-rainbow-text` dropped from the menu row (color lives in the icon+dot system); open = origin-anchored scale on `--spring-snappy` (the canned 0.15 s keyframe dies) | `DockViewSelect.vue:52-91` |
| D — Icon energy + celebration (the Family-B first consumers) | D7-1 `accent` per view in `VIEW_MAP` (dock pill glyph, trigger glyph, PaneHeader tick — one edit lifts 14 panes); D7-2 un-mute the dropdown icon column (reduced-chroma tints, full on active/hover — the literal "like the icons" move); D7-4 ONE `CopyIconButton` primitive at all ~18 copy sites (glyph→Check tinted with the copied color, `--spring-bouncy` pop, PRM-gated; retires the two ad-hoc twins + the dead `GradientCodeEditor` orphan); D7-5 save = the staged-reveal beat (+ AnimatedDigit count tick); D7-6 publish = the one gold-shimmer beat. **BA-safe**: tokens + shipped components only — `sparkle-sweep`/`btn-audacious` die at the BA cut, never consume them | `viewSchema.ts:68-76`, `DockViewSelect.vue:78-88`, `usePaletteActions.ts:48`, D7 §3.3 census |
| E — Nomenclature + shell robustness (U12-naming) | The standing vocabulary doc (`demo/DESIGN.md §Motion + §Structure`): View/Pane/Card/Layer/Sheet table + the 4-level structural ladder (`pane-main → pane-container → pane-slot → pane-card`; one name per role — `pane-shell`/`pane-wrapper` collapse; `about-card`/`picker-shell` → `pane-card`); the direct-hash boot residual (X8 — `#/palettes` cold-mounts into the hidden slot; `usePaneRouter`/`useViewManager` slot hydration + "picker = first on home, always"); the dock inert/visibility atomic pairing assert (D8-3b) | `App.vue:25-69`, `usePaneRouter.ts`, `useViewManager.ts` |

**Hard gate**: ≤ 3 semantic transition families, of which exactly **1 demo-authored** (`pane`)
— the grep is SCOPED to demo-authored CSS (counting the producer's shipped families would
never go green) + the typed prop; dock band ≈ 64 px spacious; zero
`pastel-rainbow-text` in menus; every copy site gives feedback; the save beat lands ONLY on a
successful local save (W10.C first); direct-hash boot renders the addressed pane visibly.

---

### N.W18 — Cross-repo coordination (consume-on-their-land)

The ask-letters are ALREADY AUTHORED (uncommitted, owner-folds): glass-ui
`../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md` (X-GU-ITEMS — registers
A-1 dock FLIP · A-2 Select bound/parity/jerk · A-3 slider size-axis · A-4 aurora motion-fields ·
A-5 SegmentedTabs row · B the P9 emission class · C-1 `uSatColor[]` + `bodyLightness` ·
C-2 watercolor ghost · C-3 easing-configurator · D confirmations · E the cut · **A′ the perf
producer cluster + F the standing N.md §8 carries + the fold-by-batch deadline table — the S2
critic-fold addendum, 2026-06-12**, closing K3's coverage hole: LP2-2 zombie canvas, LP3-1b
visibility/PRM gate, LP3-3a card-shrink composited keyframes, LP2-4/5 `--dock-morph-t` cascade,
LP1 aurora DPR cap, D5-1 per-density glyph, AuroraConfig descriptor, C-DTS, the value.js
peer/devDep range, the retired-classes/MIGRATION substitution) and keyframes
`../keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md` (X-KF-ITEMS — census correction, the
12-row witness-flip slate, the does-NOT-flip ledger, the easing hand-off, VJ statuses —
verified clean at the fold, no addendum owed). **BA is GREENLIT 2026-06-12 and EXECUTING**
(Batch 0 underway) — the letter carries hard fold-by-batch deadlines, not leisure.

| Lane | Work |
|---|---|
| A — The BA-cut consume sweep | **The pin target MOVED**: BA cuts 4.0.0 and that is where the producer U-fixes land (X-GU §5.2) — `inv-N-6` amends "3.13.0" → "the BA cut" (echoed in `N.md` §3/§6/§9 at the S2 fold); the re-pin runs the FULL inv-N-10 abrogation sweep against BA's retired set (`btn-audacious`, Dialog `variant`, tabs breaks, `.scroll-fade-*`…) **against a dts-complete dist** (the dist-flap risk R1 §6; C-DTS now FILED — letter Register F). Adopt + π-verify: dark-material/no-gray tokens (U1 gray half), spring-clock `--spring-*-duration` (U6/U12/U23 producer root), dock FLIP fix (U6/U16 CLOSE — the W15.D harness flips green), Select bound+rung (U8/U7 close; the W13.B interims DIE), slider size axis (U28 close; the `[data-size]` interim dies), `uSatColor[]` satellites (U3's satellite half — the headline blob ask), watercolor ghost (U18/U22 close; the W14.E interim dies), Skeleton `surface="glass"`, menu-glass, the dark-arm atmosphere re-verify (D5-10), GooBlob visibility/PRM + zombie canvas (letter A′-1/A′-2), card-shrink composited keyframes (A′-3), the `--dock-morph-t` cascade narrowing (A′-4), the aurora DPR cap (A′-5), the per-density dock glyph (A′-6), `AuroraConfig` descriptor (Register F — BlobPane/AuroraPane refinement), **the AZ-fleet second-consumer adopts, all four enumerated**: Button `icon-sm` · Select `size` · `clampLabel` · Tooltip mono (checklist-driven — un-named adopts skip quietly at the pin) |
| B — Easing-configurator consume (U27) | The three-way boundary law holds (math = value.js · time/spring = kf · component = glass-ui); when glass-ui publishes (the C-3/H1 item — D2 §1.3 is the port spec; the kf trio is the donor, BA's `BezierEditor` folds in, U8's bound ships inside it), value.js deletes `EasingSelector.vue` and the W16.B interim, consuming `EasingConfigurator` per D2's consume spec (chip rail + one configurator per selected interval) |
| C — keyframes | 0.12.0 notify DISCHARGED; the witness flips (MCI-5 et al.) are kf's L-tranche side — no N work owed; **record for the post-N successor**: VJ.W1 scroll-timeline grammar + VJ.W2 `sampleColorRamp` (the two genuine net-new value.js grammars kf's L gates on — correctly absent from N) |
| D — fourier | Carries unchanged: conformance-matrix corrections + fourier-web `^0.11.0` bump (fourier-owned) |

**Hard gate**: the BA cut on the registry; abrogation sweep green vs a dts-complete dist; the
producer-fix verifications π'd one by one (dock morph monotone, dropdown bounded, slider 20/28 px,
satellites visibly shaded, ghost watercolor-true); zero interim shims surviving (grep the named
interims → 0).

---

### N.W8′ — Hygiene + reconciliation + the deploy ceremony (re-sequenced)

The charter W8 + everything R3 routed here. Runs after W10–W17 (master-merge needs green).

- **The wire-deploy ceremony** (the single largest un-fired closure cluster — prod still serves
  I-era code): X1 deploy HEAD api to prod (N-P0-3), X2 the NCSU-alias on-host retirement (DEC-9
  honesty), X3 the first CF-Pages wire run (CH-14a + A5), N-P0-2's wire half; X5's rollback note
  into the runbook.
- Master merge + CI green + retro-tag v0.11.2 (N-P0-5); commit the staged
  CHANGELOG/CONTRIBUTING/VENDOR-POLICY deletions; delete `$OUT` + `.gitignore` the class; sweep
  the W6-death debris (`.w6a-audit{,2..5}.mjs`, `mix-1440-snapshot.md`, `shot3-dataurl.txt`,
  `suffuse-dataurl.txt`, `impl/shots/w6a-shell-*.json`); precepts submodule.
- Kill-list: `useCardMenu`, `useCodeFormatting`, the `usePaletteExport` duplicate (NOT Katex,
  NOT ImagePaletteExtractor — V5 stands).
- **Doc-truth, the exact lists**: `RELEASE.md` rewrite per R4 §2 (RM-1..8 — the "no release
  workflow" thesis is INVERTED, `node.js.yml` gone, the `proof:*` ladder excised, changesets
  documented, the version map extended, the tarball gate added); `CLAUDE.md` per R4 §3
  (CM-1..7 — indexes 22, port 9000, typecheck split, parse-that `^0.9`, 11 `.md` docs pages, the
  new boot-smoke/abrogation-sweep/css-emission-probe scripts); `demo/CLAUDE.md` one-liner;
  `DESIGN.md` catalog refresh (X13) + the `animations.css:56`/`DESIGN.md` dead
  `useMetaballRenderer` comments (R4-3); X10 CI glass-ui FULL build confirm; X4 the
  openapi table-vs-source decision recorded.

**Hard gate**: master green; a mutation succeeds on the PRODUCTION wire and the envelope == HEAD
format (inv-N-5 completes); tags == registry; docs match tree.

### N.W9′ — v1.0.0 close + π (re-sequenced)

- A: the registry pin is **discharged by W18.A** (target = the BA cut; if the cut lags, v1.0.0
  holds — the pin is the gate, not the work; BOOK-with-trigger unchanged in kind); drop the
  phantom `@mkbabb/keyframes.js` devDep; transitive peers.
- B: the π paired before/after lane (DELTA.md per affected page; WebGL canvas rect +
  non-empty-pixel + the temporal-motion assert).
- C: re-confirm L's close on the post-N substrate; **v1.0.0** publish; `FINAL.md` (carries the
  authoritative counts).

---

## §2 — DAG

```
W10 (functional + substrate)  ──┬─→ W12 (grand hierarchy; A/B first) ──┬─→ W13 (controls)
W11 (library U10)  ∥ W10        │                                      ├─→ W14 (cards)
                                ├─→ W15 (perf; harness born-RED)       ├─→ W16 (per-pane)
                                │                                      └─→ W17 (shell+motion+pops)
W18 (consume-at-pin) ← the BA cut (the ONE cross-repo wait; asks already filed)
W8′ ← {W10..W17 green}   ·   W9′ ← {W8′, W18}
```

W10 is the critical path for everything desktop-visible (the cascade kill + single mount).
W11 is independent. W12's A/B lanes precede its own C/D/E and all of W13/W14/W16/W17 (fonts +
accent are prerequisites — D6 §0). W15 runs beside the design waves after W10. W18 may lag on
the BA cut without blocking W8′; W9′ waits for both.

---

## §3 — BOOKs · closed · refuted (carried verbatim, zero drops)

- **BOOK-with-trigger**: CH-10 kf precept-pin (maintainer signal) · CH-13 fourier quiescence
  (fourier-owned) · X5 rollback runbook (folded W8′) · X14 SwiftShader harness residual
  (renderer artifact; the playwright pin is the mitigation) · the BA-cut pin (W18/W9′).
- **CLOSED this fleet**: VJ-F1 verify (the path sampler SHIPPED — `src/transform/path.ts:478,512`;
  X-KF-ITEMS §2) · VJ-1 `cssLinearFromString` (satisfied-by-composition).
- **KILLED at the S2 fold**: the R3 §1.5 glass-ui-AZ carry "notify glass-ui (easing-stability ⇐
  `proof:motion-suite`)" (`R3-fold-ledger-v2.md:125` — the notify its own §3 then omitted; K2-D2).
  The grep-`proof:*` idiom is RETIRED constellation-wide (the standing feedback record); the
  substance is recorded here instead: **the W7.A easing additions were additive — no glass-ui
  motion-suite stability impact.** Nothing is owed the letter.
- **REFUTED**: X15 the software-GL-probe aurora suspect (U-AURORA §1 — webgl mode on real GPU,
  44 fps, advancing uTime; the root is the motion-fields table) · the LEDGER's U9
  "DOES NOT WORK" overstatement (the chain fires; the real defects are W10.A's triad) ·
  U13 as a "regression-restore" (nothing to revert — the remembered ellipse was the deleted blob
  orbit; it is a re-introduction) · `chromaCeiling` as the U3 pallor root (the seed is near-white).
- **Recorded for the post-N successor**: VJ.W1 scroll-timeline grammar · VJ.W2 `sampleColorRamp`
  (kf-L gates; correctly absent from N).

---

## §4 — Invariant deltas

- **inv-N-9** (PRM-complete): VIOLATED at HEAD (the mix-canvas RAF shipped un-gated in 0.12.0 —
  R1/R4); **closes at W16.C** (the composable-boundary gate).
- **inv-N-7** (zero phantom classes): **VIOLATED at HEAD** — the demo's bare `watercolor-swatch`
  (`MixSourceSelector.vue:148`) matches NO reachable rule: glass-ui's only definitions are
  SFC-scoped to `WatercolorDot` (`WatercolorDot.vue:140`, emitted as
  `watercolor-swatch[data-v-cb0117af]` in the dist CSS — unreachable from a bare consumer class);
  the demo defines none. One live phantom (the `stagger-children` claim in U-cards §2 is WRONG —
  `animations.css:40` defines it; W5.E minted it). **Closes at W14.E**; `PROGRESS.md`'s W5-row
  "zero phantom classes ✓" is amended stale-at-HEAD.
- **inv-N-6** (registry consumption): pin target AMENDED 3.13.0 → **the BA cut** (X-GU §5.2);
  discharged at W18.A, gated only on the cut.
- **inv-N-11 (new) — cascade-truth**: no foreign stylesheet may beat the demo's layered
  utilities; the glass-ui import rides `layer(glass-ui)` and the boot-smoke asserts COMPUTED
  desktop layout (W10.D). The emission probe alone is insufficient — proven twice.
- **inv-N-12 (new) — perf floor**: single-mount per logical pane; no offscreen live WebGL
  context; no continuously-running layout-property animation (CLS ≤ 0.1); no per-tick router
  churn (W15.D wires the asserts).

---

## §5 — The coverage map (finding → wave; EXACTLY ONCE; parentheses = the blocked half's landing site)

### The user LEDGER (U1–U33; U30 split a/b → 34 rows)

| ID | Wave | ID | Wave | ID | Wave |
|---|---|---|---|---|---|
| U1 | **W12** A/B (gray tokens consume → W18) | U13 | **W13.A** | U24 | **W14.A** |
| U2 | **W16.A** | U14 | **W13.A** | U25 | **W16.B** |
| U3 | **W16.A** demo halves (satellites `uSatColor[]` → W18.A) | U15 | **W13.A** (consumption; primitive exists) | U26 | **W14.B** (border-token root = W12.B) |
| U4 | **W16.E** | U16 | **W15** harness (producer fix verify → W18.A) | U27 | **W18.B** (interim hierarchy = W16.B) |
| U5 | **W16.E** | U17 | **W14.B** | U28 | **W13.A** interim (real fix → W18.A) |
| U6 | **W15** harness (producer fix verify → W18.A) | U18 | **W14.E** interim (ghost variant → W18.A) | U29 | **W13.C** |
| U7 | **W13.B** demo half (font-rung prop → W18.A) | U19 | **W14.B** | U30a | **W13.B** |
| U8 | **W13.B** interim cap (first-class bound → W18.A) | U20 | **W14.C** skeletons (spectrum-slider half = W13.A) | U30b | **W16.A** |
| U9 | **W10.A** | U21 | **W13.C** | U31 | **W16.A** (card-lock law codified = W12.E) |
| U10 | **W11** | U22 | **W14.E** (→ W18.A) | U32 | **W12.C** layout (dock half = W17.A; sliders = W13.A) |
| U11 | **W10.D** | U23 | **W13.B** verify (spring-clock → W18.A) | U33 | **W10.B** |
| U12 | **W17.B** motion + **W17.E** nomenclature (one row, one wave-pair) | | | | |

### The R3 fold-ledger survivors (every OPEN row)

| R3 row | Wave | R3 row | Wave |
|---|---|---|---|
| N-P0-1 re-verify | W12 gate | X4 openapi drift decision | W8′ |
| N-P0-2 wire half · N-P0-3 · N-P0-5 | W8′ | X5 rollback runbook | W8′ (BOOK) |
| CH-14a / A5 / X1 / X2 / X3 | W8′ | X6 dual-mount | W10.D |
| CH-2 (re-opened by U33) | via U33 → W10.B | X8 pane-router residual | W17.E |
| CH-1/CH-3 (re-opened by U3/U18/U22) | via those rows | X9 tags warn | W10.E |
| CH-4..8 expanded primitive asks | W18.A (filed) | X10 CI full-build | W8′ |
| CH-10 · CH-13 | BOOK (§3) | X12 / K-DISP | W16.F |
| K-DOCK (re-opened by U6/U16) | via U6/U16 → W15/W18 | X13 DESIGN.md refresh | W8′ |
| K-W3DIFF | W16.F | X14 SwiftShader | BOOK (§3) |
| K-PALID | W16.F | X15 aurora-probe suspect | REFUTED (§3) |
| K-INV5 VITE_API_URL | W10.C | kill-list (useCardMenu et al.) | W8′ |
| K-W5RT router-5 | W16.F | `$OUT` + staged deletions + w6-debris | W8′ |
| T4 (re-opened by U2/U14) | via U2/U14 | glass-ui cohort rows (uSatColor[], AuroraConfig, C-DTS, devDep, retired-classes manifest, the cut) | W18.A |
| T10/T11 (re-opened by U3) | via U3 → W16.A | AZ-fleet adopt (Button icon-sm / Select size / clampLabel / Tooltip mono) | W18.A |
| T12 (re-opened by U6/U16) | via U6/U16 | kf notify + MCI-5 flip slate | W18.C (notify DISCHARGED) |
| T16 mix-RAF PRM (inv-N-9) | W16.C | fourier matrix + web bump | W18.D |
| T19 population/dominance | W16.D | VJ-F1 verify | CLOSED (§3) |
| T20 dup-shell collapse | W16.D | W9-bound: pin + peers + phantom devDep | W18.A + W9′ |
| T21 EditDrawer delete | W16.A | | |

### Net-new lanes2-born defects (mapped for completeness)

| Finding | Wave | Finding | Wave |
|---|---|---|---|
| D7 §3.4 save data-loss P0 | W10.C | D8-2 focus rings P0 | W13.D |
| D3 §4a kC placebo | W10.C | D8-3/4/5/6/7 a11y cluster | W13.D / W12.B / W16.A·E (3b = W17.E; 3c = W12.C) |
| D8-1 unlayered-dist cascade P0 | W10.D | D8-8 container queries | W12.C |
| L-COLOR §3 secondaries (egress / oklch range / inputColor) | W11.C / W11.D / W10.E | D8-9 view transitions · D8-11 (=T16) | W17.B / W16.C |
| L-PERF1/2/3 ledgers | W10.D + W15 (asks → W18) | R4-1 (=T16) · R4-2 LoC breach · R4-3 dead comments | W16.C / W13.A / W8′ |
| RM-1..8 + CM-1..7 doc drift | W8′ | D2-S2 ghost CTA (cascade class) | W10.D (design: W16.C) |

**Attestation**: all 34 LEDGER rows, all R3 OPEN/BOOK/VERIFY/ADVISORY rows, and every
lanes2-born defect above carry exactly one primary wave. Zero silent drops.
**Re-verified at the S2 critic fold (2026-06-12)**: the K2 walk's two genuine drops (thumb
live-color → W13.A; the AZ-notify carry → KILLED, §3) are now homed; the K3 coverage hole
(~10 glass-ui-blocked rows with no filed ask) is closed by the letter's A′/F addendum —
every "Blocked-on-BA" row in W13/W14/W15/W18 now anchors on a NAMED letter register.
The attestation is literally true.

---

## §6 — End-matter: the critic fold (lane S2, 2026-06-12)

Critics K1 (adversarial anchors), K2 (coverage), K3 (cross-repo coherence) were folded in
full. The disposition ledger — every confirmed finding fixed in place, every overrule
recorded with tree evidence:

**Folded (confirmed against the tree/corpus, fixed above + in `N.md`/`PROGRESS.md`/the
glass-ui letter):**
- **K1-F1** = K2-corroborated: 12 demo-authored transition families, not 14; `pop`/`fade-slide`
  are glass-ui-shipped → W17.B re-arithmetic (author `pane` only) + the gate grep scoped to
  demo CSS. Verified: grep over `demo/**` = 12 families; `dist/styles/transitions.css` ships 8.
- **K1-F2**: inv-N-7 VIOLATED at HEAD (§4 entry added; PROGRESS W5 row amended). Verified:
  the dist emits only `watercolor-swatch[data-v-cb0117af]`. K1's counter-note also verified:
  `stagger-children` IS defined (`animations.css:40-49`).
- **K1-F3**: the U21 dual diagnosis recorded in W13.C — D7-9's live measurement governs;
  A-5 demoted to verify-after-`pb-2`.
- **K1-F4**: PROGRESS `:23/:55` "still uncut" corrected (3.13.0 IS cut; pin = the BA cut 4.0.0).
- **K1-F5**: the W10.B temporal-gate thresholds marked CALIBRATE-AT-IMPLEMENTATION (S1-authored;
  U-AURORA measured only the `breathing` dead baseline) + D5-8/D6 §5.1 cited for the companions.
- **K1-F6** = K2 §4-1: "8 directives" → 6 (LEDGER `:90-97` counted: 6 bullets).
- **K1-F7** = K2 §4-3: the §5 D8-3 cell now names 3b → W17.E and 3c → W12.C.
- **K1-F8** (partial — see overrules): `Katex.vue:20`→`:21` ✓ fixed; `keys.ts:26-28`→`:24-28`
  ✓ fixed (colorEnergy/zones at :24-25).
- **K2-D1**: thumb live-color (the W6.C carry, D1 §5) → W13.A clause + gate token. K2-D2: the
  AZ-notify carry → KILLED with rationale (§3). K2-X1: W12.C re-points (not re-lands) the W10.D
  boot-smoke gate. K2-X2/X3: U26/U31 split-parentheticals added. K2 §4-2: the U20b token now in
  W13.A. K2 §4-4: the four AZ adopts enumerated in W18.A.
- **K3-D1/D2 [the P0]**: the unfiled producer cluster (LP2-2 · LP3-1b · LP3-3a · LP2-4/5 ·
  LP1-DPR · D5-1 glyph) + the N.md §8 carries (AuroraConfig · C-DTS · devDep/peer range ·
  retired-classes manifest) are now **FILED** — Register A′ + Register F authored into the
  glass-ui letter at the S2 fold, with K3's fold-by-batch deadline table. The W18 preamble and
  W18.A row now cite the registers by id; the DAG's "asks already filed" is true again.
- **K3-D3**: BA GREENLIT-and-executing stamped into the W18 preamble + the letter.
- **K3-D4**: the letter's "`dist/components/` does not exist" corrected to the un-falsifiable
  mechanism (`.vue.d.ts`-only tree; compiled JS flat at `dist/*.js`, unscanned). Verified live:
  the directory exists, declarations only.
- **K3-D5**: inv-N-6's in-place echoes amended in `N.md` §3/§6/§9 (the schedule-row-only
  amendment was insufficient — a §6-alone reader would pin 3.13.0).
- **K3-D6.2**: the letter's dead `N.W6.C` cite re-pointed to W16.B-interim → W18.B-consume.
  K3-D6.6: the letter's "30 BA waves" → 29.

**Overruled (critic wrong; evidence):**
- **K1-F8/SpectrumCanvas**: K1 claims the `getBoundingClientRect` read sits at `:108`;
  tree truth (`sed -n '105,112p'`): `:108` is the `spectrumRef` guard, the rect read is at
  **`:109`** — WAVES-2's original anchor was correct and stands. (L-PERF2's LP2-1 row agrees: `:109`.)
- **K1-F8/style.css**: K1 claims the font tokens sit at `:63-65`; tree truth: `@theme {` opens
  at `:63`, the three `--font-*` tokens sit at **`:64-66`** — WAVES-2's anchor was correct and stands.
- **K1-F2's literal mechanism, precision-corrected (substance upheld)**: "grep = 0 definitions"
  is imprecise — glass-ui DOES define `.watercolor-swatch` (SFC-scoped,
  `WatercolorDot.vue:140-187`); the violation is that the scoped emission
  (`[data-v-cb0117af]`) is unreachable from the demo's bare class. The §4 entry carries the
  precise mechanism.

**Recorded, no doc edit owed (lane-report-internal staleness — reports are evidence, not plans):**
- X-GU.md's header "pre-greenlight, NO impl" and §5.1's "collapse to ONE publish" judgment are
  STALE/SUPERSEDED — BA is greenlit-executing, and the letter (correctly, on U-DROPDOWN's live
  root) splits A-2 (the Select bound, P0-now) from C-3 (the easing-configurator publish): a
  synthesis reader must NOT de-prioritize A-2 as "ships inside C-3." X-GU-ITEMS `:32/:46` and
  X-KF-ITEMS `:93/:126` carry the same dead-`dist/components`/`N.W6.C` cites — superseded by
  the letter's corrected text. K3-D6.3 (provenance "resolved at 3.13.0" vs `file:` — loose,
  not wrong) and K3-D6.5 (X-KF-ITEMS cite drift, cosmetic) carry no action.
