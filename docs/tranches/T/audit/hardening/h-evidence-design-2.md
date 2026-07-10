# h-evidence-design-2 — EVIDENCE RE-VERIFICATION, design set 2

**Lane charge**: re-verify the most load-bearing claims of `t-aurora-boot-active`
(stasis / pointer-dead / pink-flash numbers), `t-blob-hero` (burial / orbit
measurements), `t-load-sync` (clock families), `t-outline-dropdown-clip` (ring / clip
px) — live where feasible (real-GPU where it matters; note honestly where headless can't
see). ZERO product-code / corpus edits; findings only.

**Method**:
1. **Substrate provenance pin.** value.js product code (`demo/ src/ api/`) is
   **byte-identical** `git diff cc4f4fa..HEAD` and `6a775c3..HEAD` (both lane substrates
   → HEAD `4e52a40`): every value.js citation verifies at HEAD unchanged. Producer:
   `../glass-ui` HEAD is `bdc4211c`; the lanes cite `b2015102` (== package.json 4.2.0)
   and "4.2.0/tranche-BG". `git diff b2015102..bdc4211c` is **empty** for
   `src/components/custom/aurora/` AND `src/components/custom/goo-blob/` — so every
   producer shader/atom/blob citation verifies at HEAD. (The `v4.2.0` *tag* points at an
   older commit than `b2015102`; the lanes ran against the linked working tree at
   `b2015102`, not the tag — no effect on verification.)
2. **Static + arithmetic re-verification** of every file:line citation and every derived
   number across the four lanes.
3. **Live re-verification** on the real GPU: a private vite on `:9615`
   (`VITE_API_URL=http://localhost:59999`; owner's `:9000` untouched), driven headless by
   Playwright — which on this host renders through **ANGLE Apple M5 Max Metal** (a *real*
   GPU, not SwiftShader), with `.atmosphere-canvas--arrived` at opacity 1 (the WebGL field
   ARMED). Read-only DOM/geometry probes; no storage writes.

**Verdict: a near-clean bill, evidence-backed.** Every static citation and every
arithmetic derivation across all four lanes verifies at HEAD. Three viewport-robust live
measurements reproduce **exactly** on the real GPU. Seams found: one wrong producer
function-name in the pointer-dead crux citation (SHOULDFIX), one hex-transcription typo,
one viewport-fragile absolute-px set, and the structural un-reverifiability of the WebGL
pixel-metrics (which the corpus itself already flags via LS-7).

---

## Findings

### H-EVID2-1 · SHOULDFIX · the F-10 pointer-dead crux cites a producer function that does not exist (`flowDirection` → `flowField`)

**Corpus location**: `lanes/t-aurora-boot-active.md` F-10 (≈line 178):
> "`uCursorBurst`/`uCursorVelocity` are consumed ONLY by `flowDirection()`
> (`flow.glsl.ts:82–93`) — which only stroke mediums sample".

**Evidence**: there is **no `flowDirection` in glass-ui** —
`grep -rn flowDirection src/components/custom/aurora/constants/shaders/` returns zero
hits. The function that (a) lives in `flow.glsl.ts`, (b) contains the `uCursorBurst` /
`uCursorVelocity` burst block at exactly **lines 82–93**, and (c) is "used by the stroke +
pastel/oil mediums" (its own header, `flow.glsl.ts:1-2`) is named **`flowField()`**
(`flow.glsl.ts:24`). The line range is right; the burst block is verbatim where the lane
says; the exclusivity conclusion (burst inert on `medium:"smooth"`) is **correct** —
`flowField` is only sampled by the medium branches (`aurora-mediums.wgsl.ts:187/205/…`
`flowField(p,t)`), never on the smooth base path. Only the **function name is wrong**.

**Why load-bearing**: F-10 is the sole evidentiary basis for "two of three wired pointer
axes are structurally DEAD" (T-27/W6-7). A ratifier auditing that finding greps the
producer for `flowDirection`, finds nothing, and can wrongly conclude the citation is
fabricated — the opposite of the truth (it is verifiable under the right name). The other
two axes verify: `uLightDir`→`relightImpasto` (`brush.glsl.ts:274`) whose lit terms
multiply `uImpasto` (`brush.glsl.ts:283,290` — inert at `uImpasto:0` on smooth); the live
domain-warp swirl (`aurora.frag.ts:313-329`, `uCursorStrength`).

**Proposed amendment**: in F-10 (and any §2.2 echo), `flowDirection()` → `flowField()`.

---

### H-EVID2-2 · NOTE · default-pink hex mis-transcribed `#b27290` (F-2/F-3) vs the true `#b37290` (F-6, live)

**Corpus location**: `lanes/t-aurora-boot-active.md` F-2 (line 60, "`#b27290` dull mauve
for the default") and F-3 (line 76, "default-pink `#b27290`"); F-6 (line 114) correctly
writes "`--saved-bg #b37290`".

**Evidence**: live on `:9615`, fresh context, `getComputedStyle(:root)`/`--saved-bg` =
**`#b37290`** (blue channel `0xb3`, not `0xb2`). F-6 and the running app agree; F-2/F-3
carry a one-digit `b2`→`b3` transcription error of the same default-pink material they
name across the pink-flash findings.

**Proposed amendment**: F-2 / F-3 `#b27290` → `#b37290` (align with F-6 + live truth).

---

### H-EVID2-3 · NOTE · T-28's absolute seal geometry is viewport/body-font-conditioned — did not reproduce off-substrate

**Corpus location**: `lanes/t-outline-dropdown-clip.md` §1 evidence table (`.dock-seal`
"40×40", `.dock-seal-wax` "34×34") and the derived standoff math (die-rim r ≈ 19.5px, wax
reach ≈ 21.0px sharp / ≈ 17px round → "crosses by ~+1.5px … gaps by ~−2.5px").

**Evidence**: live re-measure of the *same* collapsed-summary seal (confirmed in
`.dock-layer--summary`, the composition the lane maps to `t-2211-04`) returned
**62×62 seal / 56×56 wax** — NOT 40/34. Root cause is *not* a corpus error and *not*
producer drift (glass-ui dock is byte-identical `b2015102..HEAD`; value.js `Dock.vue`
unchanged): the MCP browser forced **innerWidth 1512 / DPR 2** (my `resize(1440,900)` was
overridden), and the demo scales **`body` font responsively to 18.8px** at that width
(document root stays 16px — verified: `--blob-fp:11rem`→176px exactly). The font-inheriting
glass-dock (`font-size:18.8px` down its whole chain) enlarges the collapsed pill, and
`.dock-seal{block-size:100%}` follows. The `−6px` chrome invariant holds at both scales
(40−6=34; 62−6=56). So the lane's 40/34 is plausibly correct **at its stated 1440×900**;
I simply could not reproduce 1440. **What survives, confirmed**: the recipe (border
`1px solid oklab(0.6156 0.2426 0.0419/0.6)` ≈ the lane's `oklab(0.62 0.24 0.04/0.6)`,
radius 9999px, padding 2px; wax seeded radius `21.65% 20.78%` for the top-left corner —
exactly the lane's first h/v values) and the **scale-invariant conclusion** (a geometric
parent circle can never trace a seeded organic silhouette at hairline standoff — it both
crosses and gaps for every seed, at any scale).

**Proposed amendment**: mark the §1 absolute px as `@1440×900, body-font-conditioned`
(they are not invariant — a ratifier re-measuring at another window width gets a
proportionally different seal), or restate the standoff as a *fraction of seal radius*
(the scale-free form the verdict actually rests on). No change to the verdict.

---

### H-EVID2-4 · NOTE · the WebGL field's quantitative metrics (F-8 stasis table, F-10 flick/sweep, F-1 pink-field) are not page-side re-verifiable even on a real GPU — they rest solely on the lane harness the standing gate does not run

**Corpus location**: `t-aurora-boot-active.md` F-8 (the mean-abs-diff/%px stasis table),
F-10 (flick "0.00% pixels", sweep 7.7-vs-4.1 / 4.08-vs-4.12), F-1 (green-seed → pink
field); cross-referenced by `t-load-sync.md` LS-1/LS-7.

**Evidence**: the host *is* a real GPU (ANGLE M5 Max Metal) and the field *did* arm
(`--arrived`, opacity 1) — so the LS-7 "headless = css-substrate placeholder" assumption
did **not** hold here (the webgl path ran). But the aurora canvas is created without a
preserved back-buffer: `drawImage`/`getImageData` readback of `.atmosphere-canvas` returns
`[0,0,0,0]` at every sample point. The lane's frame-diff metric is computed from **CDP
screencast frames** (the *composited* output), not a page-side `readPixels` — which cannot
be reproduced from inside the page. So F-8/F-10/F-1's numbers could not be independently
re-derived in this session by any page-side method. This is **not** a corpus defect — the
lane documents the harness (`boot-probe.cjs`/`active-probe.cjs`) and LS-7 already mandates
"a real-GPU headed cold-load probe with canvas-pixel assertions" precisely because the
standing S.W6/W9 gate never ran one. The note stands as: the corpus's most load-bearing
*quantified visual* promises (the T-25 pink field, the T-26 stasis, the pointer-dead
numbers) remain single-sourced to the lane's own un-re-run harness; the LS-7 acceptance
probe is the only thing that will ever second them, and it is a T deliverable, not yet
evidence. Ratification should treat these figures as author-attested, gate-pending.

---

## Positive-confirmation ledger (the clean-bill evidence)

**Every static citation verifies at HEAD** (producer aurora + goo-blob dirs diff-free
`b2015102..HEAD`; value.js code diff-free from both substrates):

- **useAurora** `:228` deep-watch (`{deep:true}`, no `immediate` → the GAP-ARM replay
  hole, F-1/LS-1) · `:262` `createAurora(canvas,getCfg())` mount snapshot (LS-1) ·
  `:81-114` `scheduleAfterFirstPaint` (LS-3). **flow burst** `flow.glsl.ts:82-93` (name
  aside, H-EVID2-1). **relight** `brush.glsl.ts:274` `normalize(uLightDir)`, gated by
  `uImpasto` (F-10). **domain-warp swirl** `aurora.frag.ts:313-329`, `uCursorStrength`
  (F-10). **VIVID_TARGET** = 0.115, **DEFAULT_VIVIDNESS** = 1.0 (F-11). **cursor default
  radius** `cursorModel.ts:68` = 0.25 (F-10).
- **Arithmetic — exact.** `COLOR_ENERGY` (atoms-fields.ts:31): breathDepth
  lerp(0.03,0.08,**0.7**)=**0.065** (F-8) ✓; saturation lerp(0.85,1.2,0.7)=**1.095**
  (F-11) ✓; at energy **0.76** → sat **1.116**, valueVariance **0.116**, breathDepth
  **0.068** (§2.2) ✓ all exact. softmaxBeta 3.0 / breathPeriod 40 (presets.ts:417/439),
  driftRadius 0.045 / nucleus radius 0.5 (atoms.ts:222/218), motion 3-value enum,
  analogous hueSpread 28 (color.ts:233) — all as cited. Demo baseline
  (`DEFAULT_AURORA_ATOMS`, keys.ts:45): colorEnergy **0.7**, zones {6, composed}, motion
  drifting, medium smooth, interactivity.light — all as F-8/F-9/F-10/F-11 assume.
  `ATMOSPHERE_POINTER_STRENGTH` 0.45 (useAtmosphere.ts:42).
- **Blob** (t-blob-hero): `@click/@mouseenter/@pointermove` at HeroBlob.vue:26-28 with
  **`@mouseleave` genuinely absent** (F-6) ✓; BLOB_IDLE_MS 2000 / SLEEPY_POSE_MS 700
  (:156-157), IDLE_SLEEP_MS 6000 (constants.ts:125); MOOD_AVA idle arousal 0.35 → curious
  0.5 (constants.ts:48-54); demo blob config bodyRadius 0.26 / orbitRadius 0.4 /
  satelliteRadius 0.09 → **orbit+sat = 0.49** (F-2/§2), (0.5−0.26)·176 = **42px**,
  0.49·176 = **86px**, canvas overscan 160% (GooBlob.vue:372); `.app-layout`
  overflow:hidden (style.css:367/374), `.pane-wrapper--left{z:1}` (:424-426),
  `--shadow-cartoon` 8px (:287).
- **Load-sync shared root cause — CONFIRMED**: App.vue **hydration-after-derivation** —
  `useColorPipeline`(:181) + `useAtmosphereBoot`(:221) construct the derivation graph
  BEFORE `useColorUrl`(:298)/`restoreFromStorage`(:299); `opaqueFrameLatest` seeded from
  the default `cssColorOpaque` (useColorPipeline.ts:304); the immediate accent watch
  (useAtmosphereBoot.ts:69-75). This structural ordering underwrites aurora-F-1-demo/F-3
  AND load-sync LS-1/LS-2 identically. Clock cites verify: blob async-chunk+useIdleReady
  (ColorPicker.vue:124-125, v-if:66-70); aurora 0.45s fade `.atmosphere-canvas`
  (App.vue:326-332); Dock `:start-collapsed="false"` (Dock.vue:131); Fraunces
  Google-Fonts `display=swap media=print` (index.html:17-22).
- **Outline** (t-outline-dropdown-clip): dock-seal recipe (Dock.vue:330-341, gold
  `--admin` 339-341), action-bar `overflow:hidden` (:311-316), 4 native `title` sites
  (:139/140/150/182), DockSeparator `v-if="hasAnyActionBar"` (:176), accentHueShift 0
  (viewSchema.ts:104), MixSourceSelector `ring-2 ring-primary/50` (:138);
  `--scale-hover-dock:1.1` (scale-paper.css:25) → the T-29 overhang is *arithmetically*
  sound: 85.9×1.1 = 94.5, 32×1.1 = 35.2, overhang (94.5−85.9)/2 = **4.3px** L/R,
  (35.2−32)/2 = **1.6px** T/B; WatercolorDot ghost-stroke (:208-213/283-289), unlayered
  box-shadow (:232), range [20,80] (:66), feDisplacementMap scale=1.3 (:189).

**Live real-GPU confirmations (viewport-robust, reproduced EXACTLY)**:

| lane · claim | corpus | live (`:9615`, M5 Max GPU) | verdict |
|---|---|---|---|
| blob bead center @ desktop | F-1 (695, 197) | anchor (607,109)+ (88,88) = **(695, 197)** | EXACT |
| blob wrapper footprint | F-1 176px (11rem) | `--blob-fp` clamp → **176px** | EXACT |
| seat law (center on radius origin) | §2 / W6-4 | anchor `right/top: -72px` (= radius-card 16 − fp/2 88) | CONFIRMED |
| action-bar clip box (rest, exact fit) | T-29 85.9×32 | **85.91×32 / 86.37×32** (content-sized) | EXACT (<0.5px) |
| default-pink ground | F-6 `#b37290` | `--saved-bg` **#b37290** | EXACT (catches F-2/F-3 typo) |
| real GPU + field armed | (LS-7 premise) | ANGLE M5 Max Metal, `--arrived` opacity 1 | webgl path ran |

---

*Artifacts (scratchpad, regenerable): vite `:9615` boot log; Playwright DOM/geometry
probe transcripts. No storage writes; owner `:9000` untouched (was not running).*
