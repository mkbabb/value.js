# U.W-VISUAL · wave-open census — LANE B (DOCK / NAV surface)

**Filed**: 2026-07-13 · Fable + frontend-design · re-judges T.W8-terminal owner-uncertified
still-reds against the LIVE served build.
**Served tree**: `tranche-t` @ `e97a9d1` (T-close ceremony; master-merged `6e14e90`) — the
cures the T→U merge carried are IN the served bundle (`git diff 5e4f1f6..HEAD` shows
`palettes-ramp.ts`, `useViewAccents.ts`, `useAtmosphere.ts` +73, `style.css` +74,
`ProfileSection.vue`, `ActionBarToggle.vue`/`Dock.vue`).
**Serve**: built gh-pages bundle on **PORT 8592** (`e2e/smoke/perf/serve-built.mjs`); the
owner's :9000 untouched; sibling repos read-only.
**Method (O-3 probe class)**: headless Chromium (swiftshader GL), 1440×900, dpr2, both
`colorScheme` schemes, `vueuse-color-scheme` forced. Deterministic seed
`oklch(0.55 0.15 30)` via `#/?space=oklch&color=…` (chromatic brick — accent non-neutral +
collision-class for the seam). Instruments + frames under `pi/` (this dir).

## §0 BUILD-UNBLOCK NOTE (ADOPT context — NOT a Lane B verdict)

The served bundle would not build against the pinned **sibling glass-ui 5.0.0** as checked
out (currently mid-flight on a `BI` dev branch `da051943`): the T.W8-terminal demo imports
un-adopted producer names — `@mkbabb/glass-ui/goo-blob` (renamed → `./blob`, `GooBlob`→`Blob`)
and `useLayerTransition` from `/dock` (removed → internalised as `dockCrossfadeContext`). A
**concurrent census scaffold** (shared, UNCOMMITTED — `demo/shims/glass-ui-goo-blob.ts` +
a `vite.config.ts` alias + an inert `ActionBarLayer.vue` sub-layer stub) unblocks the render;
it re-labels the producer rename ONLY and touches no dock/nav layout or CSS. **This is the
U.W-ADOPT gate surfacing, orthogonal to every Lane B row.** Recorded so the ADOPT lane owns it.

## §1 VERDICT SUMMARY

| Row | Verdict | One-line |
|---|---|---|
| **u-f11** collapsed-dock swatch seam (T-37) | **ANNEX-OWNER-ATTEST** | seam cure LANDED (`DERIVE_SEAM_FLOOR=0.06`, GPU-independent ΔL floor ≈ 3× JND); headless composite corroborates dE2000 8–13 ≫ 2.3 both schemes — but the atmosphere FIELD is WebGL-composited, so the "reads as a deliberate seam" gestalt is the owner's (U-F54) |
| **u-f13-demo** dock-edge-clip (T-36 · demo box-model half) | **CENSUS-GREEN** | Tools true-button safe-inset `margin-inline: 4px` landed both schemes; the button sits INTERIOR (flanked), its focus-ring envelope within the active dock-layer content box, renders whole/unclipped |
| **u-f13-band** dock-expand scene reflow (T-57/WR-9) | **CENSUS-GREEN** | band block-size 72px INVARIANT + scene-top 103px INVARIANT across collapse↔expand↔re-expand, BOTH schemes; the T-57 +3.0px reflow is cured |
| **u-f13-menuink** Login/Tools Q10 accent (P9-R4) | **CENSUS-GREEN** (computed-only) | both triggers paint the accent on the LIVE ink channel (text/icon `color`), C=0.15 light / 0.0804 dark ≥ perceptible floor, opacity 1 — the cascade-dead `border-primary/30`→width:0 defect is re-homed onto a channel that paints |

Console: ZERO dock/nav errors; the only console error is the by-design `dev MISCONFIGURED`
(no `VITE_API_URL` on loopback — the palette API CORS-die state, not a dock defect).

---

## §2 [u-f11] COLLAPSED-DOCK-SWATCH-SEAM — ANNEX-OWNER-ATTEST

**Gate BR-6**: swatch↔adjacent-ground ΔE ≥ JND ~2.3 **+** owner-attested "reads as a
deliberate derive-seam" gestalt.

**Mechanism (code-confirmed LANDED — contrary to the task's "no cure" expectation; the merge
carried it)**: `demo/color-picker/composables/boot/useAtmosphere.ts:53-110` — `DERIVE_SEAM_FLOOR
= 0.06` + `guaranteeSeamOffset()` shifts the whole DERIVED atmosphere palette uniformly so
`|field-mean-L − wax-L| ≥ 0.06` OKLab (≈ 3× the ~0.02 OKLab JND) whenever they would collide;
pure JS on the derive tokens BEFORE GPU upload → the standoff is **GPU-independent and provable
at any seed, including the owner's brick collision reference** (the ΔL .004 T.W8 face). Material
lightness offset, NEVER a ring/rim (Q12/O-15a stand). Seal DOM: `Dock.vue:259-272`
`.dock-seal-wax` (WatercolorDot on `cssColorOpaque`) + `.dock-seal-ink` view glyph.

**Composite corroboration (headless swiftshader — reported, not the verdict)**:

| leg | light | dark |
|---|---|---|
| wax OKLCh (screenshot px) | L 0.509 C 0.125 h 30 | (brighter wax) |
| field/ring OKLCh | L 0.599 C 0.112 h 17 | — |
| ΔL_oklab wax↔field(ring) | **0.090** (> 0.06 floor) | — |
| **dE2000 wax vs ring-ground** | **8.19** | **13.03** |
| **dE2000 wax vs corner-field** | **9.37** | **7.21** |

All composite dE ≫ JND 2.3; π-frames `pi/lane-b-{light,dark}-seal.png` show the wax circle
standing off the derived field (light: deeper terracotta on lighter pink; dark: bright wax on
darker field) with the white glyph carrying the read.

**Why ANNEX (U-F54)**: the atmosphere field is a **WebGL canvas** (`useAtmosphere(atmosphereCanvas)`;
`gl.readPixels` returned cleared-buffer, canvas 300×150 ×3). The T.W8 pass judged this exact
seal on a REAL compositor for that reason; two headless false-reds are on record. The measurable
legs (mechanism ΔL≥0.06 guarantee + composite dE 8–13) all point GREEN; the final perceptual
gestalt over the GPU-composited field is flagged **OWNER-ATTEST** honestly.

**DELTA**: RED (T.W8) wax↔field ΔL .004–.023 → the derive path now GUARANTEES ΔL ≥ 0.06
(mechanism) with composite dE2000 8–13 ≫ JND 2.3 (both schemes).

---

## §3 [u-f13-demo] DOCK-EDGE-CLIP — Tools box-model half — CENSUS-GREEN

**Gate BR-8**: Tools true-button focus-ring box within the dock-layer content box + safe-inset
— ring arc UNCLIPPED @ flush edge, BOTH edges. (The producer clip/fade/mask honesty half is
**T-52 PRODUCER-GATED → U.W-ADOPT**, NOT this row.)

**Demo box-model (LANDED, both schemes)**: `ActionBarToggle.vue:154-158`
`.dock-tools-btn { --dock-compact-control-padding: 0.5rem 0.75rem; margin-inline: 0.25rem;
gap: 0.5em }`. Computed `margin-inline: 4px/4px` both schemes. The T-29 settle-stamp releases
`overflow: visible` on the inner box at rest (hover/focus register renders whole).

| measure | light | dark |
|---|---|---|
| Tools `margin-inline` (computed) | 4px / 4px | 4px / 4px |
| Tools rect (l–r, w) | 824.6–921.8, 97.1 | 633.3–737.8, 104.5 |
| controls RIGHT of Tools | Login@947, @mbabb@1044 | Login@765, @mbabb@869 |
| controls LEFT of Tools | Home/Picker/About (ViewSelect)@803 | …@610 |
| ring envelope (2px+8px≈10px) vs active layer | 814.6–931.8 in 503–937* | 623.3–747.8 in 503.3–936.7 |

The Tools true-button is **INTERIOR** (flanked by DockViewSelect left + ProfileSection
Login/@mbabb right) — never the flush edge control — so its focus-ring envelope sits within the
active dock-layer content box. π-frames `pi/lane-b-{light,dark}-tools-focus.png` show the button
rendering WHOLE (paintbrush + "Tools" + arrow), interior, unclipped.

*Honest caveats (producer/ADOPT surface, NOT this row's verdict)*: (a) the producer focus RING
computes transparent box-shadow on keyboard focus in this served (drifted glass-ui) build — no
ring paints to clip; whether glass-ui paints a keyboard-focus ring is the ADOPT-gated producer
affordance. (b) The `.dock-layer--full` clip box read light/dark-inconsistently (a 37.8px
narrow-layer artifact in light vs the 433px full layer in dark) — a `closest()`/mid-morph
measurement artifact, not asserted as a defect; the screenshots confirm Tools renders whole.

**DELTA**: edge-item ring-arc shaved px → 0 (Tools is interior + carries the 4px safe-inset
box-model; ring envelope within the content box, both edges).

---

## §4 [u-f13-band] DOCK-EXPAND-SCENE-REFLOW — CENSUS-GREEN

**Gate BR-10**: dock in-flow band computed block-size INVARIANT across collapse↔expand AND
scene-top shift == 0px.

**Cure (LANDED)**: `style.css:403-419,513-519` — `.dock-band { min-height:
var(--dock-band-min-h) }` where `--dock-band-min-h = calc(var(--size-icon-btn) + 2rem)` =
40px + 32px = **72px ≥ the 71.4px expanded pill**. The floor now covers the TALLEST (expanded)
state so the shorter collapsed seal centres in the reserved box (T-31 band law extended to the
collapse↔expand axis; zero z-arms, no margin patch).

**Live drive** (dock collapse timer armed via hover→leave, `collapse-delay: 5000ms`;
`.dock-seal-wax` present confirms collapsed):

| state | band block-size | `.pane-container` top |
|---|---|---|
| expanded (light) | 72.00 | 103.0 |
| collapsed (light) | 72.00 | 103.0 |
| re-expanded (light) | 72.00 | 103.0 |
| expanded (dark) | 72.00 | 103.0 |
| collapsed (dark) | 72.00 | 103.0 |
| re-expanded (dark) | 72.00 | 103.0 |

**scene-top shift across the morph = 0.00px · band block-size Δ = 0.00px** (both schemes).

**DELTA**: scene-top shift RED +3.0px → **GREEN 0px**; band floor RED (< expanded pill, 65→71.4)
→ **GREEN reserved 72px ≥ expanded 71.4px**. The T-57 reflow is cured.

---

## §5 [u-f13-menuink] LOGIN/TOOLS Q10 ACCENT — CENSUS-GREEN (COMPUTED-PREDICATE ONLY)

**Gate BR-14** (getComputedStyle, GPU-independent, NO eye arm): the accent-carrying channel has
computed width/opacity > 0 AND the accent resolves NON-neutral (chroma ≥ perceptible floor)
when the accent token is set; NEVER `border-primary/30`→border-width:0→neutral stone pill.

**Cure (LANDED)**: `ProfileSection.vue:116` Login `:style="{ color: triggerInk, borderColor:
triggerInk }"` with `triggerInk = chromeSafeCss(cssColorOpaque)` — the accent re-homed off the
dead `border-primary/30` (the outline variant paints border via inset shadows → `border-width:0`)
onto the **text/icon `color` channel the variant actually paints**. Tools: `ActionBarToggle.vue:95-96`
icon + label `:style="{ color: accent }"`, `accent = genericBar?.accentColor ?? safeAccent`.

**THE COMPUTED PREDICATE TABLE** (the verdict — no eye claim):

| trigger | scheme | accent channel | computed color | chroma C | opacity | border-width | non-neutral (C ≥ ~0.02)? |
|---|---|---|---|---|---|---|---|
| **Login** | light | text/icon `color` | `oklch(0.4158 0.15 30)` | **0.150** | 1 | 0px | **YES** ✓ |
| **Login** | dark | text/icon `color` | `oklch(0.8528 0.0804 30)` | **0.0804** | 1 | 0px | **YES** ✓ |
| **Tools** | light | label+icon `color` | `oklch(0.4158 0.15 30)` | **0.150** | 1 | 0px | **YES** ✓ |
| **Tools** | dark | label+icon `color` | `oklch(0.8528 0.0804 30)` | **0.0804** | 1 | 0px | **YES** ✓ |

The accent-carrying channel is now the INK (opacity 1, paints) — the old cascade-dead reliance
on `border-width:0` is retired (border still computes 0px, but the accent no longer rides it).
Both Login AND Tools resolve a clearly-chromatic accent (C 0.08–0.15 ≫ the ~0.02 neutral floor,
hue 30 = the live seed) in BOTH schemes. π-frames `pi/lane-b-{light,dark}-tools-focus.png`
corroborate the painted accent ink (red / pink-red) — but the numbers above ARE the verdict.

**DELTA**: computed accent-channel width/opacity RED 0 (border-width:0) → GREEN opacity 1 on the
ink channel; accent chroma RED ≈ 0 (neutral stone) → GREEN 0.08–0.15 ≥ perceptible floor.

## §6 Loop / routing

- Zero rows contradict a §12 ruling or a §4 retirement; nothing routes OWNER except the u-f11
  gestalt (owner-attest by the gate's own wording + U-F54).
- u-f11 mechanism, u-f13-demo box-model, u-f13-band floor, u-f13-menuink ink-rehome — all four
  cures LANDED in the T-close merge and re-judge GREEN/ANNEX here; no re-cure owed.
- ADOPT context surfaced (§0): the glass-ui goo-blob→blob + `useLayerTransition` un-adopted
  renames — hand to U.W-ADOPT; the T-52 producer clip/fade/mask half rides it too.
- Frames: `pi/lane-b-{light,dark}-{seal,tools-focus}.png`; instruments
  `pi/lane-b-probe.mjs` (all-rows), `pi/lane-b-probe2.mjs` (menuink+demo oklch-aware),
  `pi/lane-b-demo3.mjs` (interior/clip re-measure).
