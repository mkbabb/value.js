# U.W-A11Y — THE A11Y HARDENING WAVE — CLOSE ARTEFACTS (the wave roll-up)

**Wave**: U.W-A11Y — the accessibility-hardening wave (the modalities the T campaign's owner-eye
lens never drove). **designHeavy** (E-6): every cure ran the design loop; an a11y cure strengthens
the landed doctrine, never fights it.
**Verdict**: **`complete_with_misses`** (PP-16 — gates-pass-goal-unmet: all **11 born-RED
headless-verifiable gates flipped RED→GREEN**; the 2 owner-attested register rows — OA-1 fallback
coherence + OA-2 authed gestalt — remain honestly OPEN by design; the named booked residuals
below are none of them an A11Y defect).
**Branch**: `tranche-u`. **Lane commits**: `87b4eca` (CONTROLS · U-F25/F27) · `6667eb05` (CONTRAST ·
U-F26) · `7335786` (MODALITY · U-F57/F58) · `42608eb` (AUTHED · U-F56/F58-error). **Close stamp**:
this commit.
**Spec of record**: `waves/U.W-A11Y.md` (governs) · `audit/registry.md §6/§10/§16/§19/§26` · the
four lane close-notes `audit/w-a11y/{DELTA.md, CLOSE-NOTE-contrast.md, CLOSE-NOTE-modality.md,
a11y-authed-close-note.md, rtl-logical-property-audit.md}` · π-frames under `audit/w-a11y/pi/`.
**Precedence**: the owner's verbatim (§13.5 + any live ruling) → the registry → `U.md` →
`waves/U.W-A11Y.md` → this roll-up. Downstream never overrides upstream.

**The wave's thesis, discharged**: lighthouse measured `accessibility` 1.0 (registry §19, RETIRED)
while keyboard focus painted nothing, "certified" accents breached 3:1 on the rendered tier, tap
targets sat under the referent, and a whole slate of modalities (forced-colors, prefers-contrast,
prefers-reduced-transparency, SR, real slider OPERATION, the authed+populated surface) had no
coverage at all. This wave gated the REAL a11y properties the automated audit is blind to — and,
crucially, **a11y is deterministic**: every gate is a real born-RED headless assertion (a computed
contrast ratio, a computed focus-shadow/outline, DOM target geometry, a Playwright media emulation,
a DOM attribute), NOT a U-F54 owner-attested annex. There is no SwiftShader confound — contrast does
not depend on the GPU. The owner-attested register is deliberately SMALL (only the aesthetic
coherence of the high-contrast fallback + the authed-surface gestalt).

---

## §1 · THE GATE ROW TABLE — Register 1 born-RED (11/11 flipped RED→GREEN) + Register 2 owner-attest

### Register 1 — born-RED headless-verifiable (RED against the pre-cure/stashed source; GREEN on the cure)

Every row was confirmed **born-RED** by running its spec against the pre-cure (stashed) source, then
GREEN on the cure — the U.W-A11Y honesty discipline (no pretend-headless flip, no fabricated red).

| Gate | Family | Lane | RED (pre-cure, measured) | GREEN (cure, measured) | Gate spec |
|---|---|---|---|---|---|
| **BR-1** focus ring | U-F25 | CONTROLS `87b4eca` | focused `box-shadow` = `--shadow-sm` alone (NO ring layer); `--ring` resolves empty; 4e6c178 missed the focus twin | dual-contrast ring `0 0 0 1px` dark hairline + `0 0 0 3px` light halo over `--shadow-sm` — reads over ANY stop fill, no `--accent-view` dependency; WHCM `outline` 2px `Highlight` | `o27-focus-affordance.spec.ts` (5/5) |
| **BR-2** accent contrast | U-F26 | CONTRAST `6667eb05` | `--accent-view` certified vs the PAGE AMBIENT (`derivedLightness` ≈0.76) → resolved mid-dark pink reads **1.19:1** ✗ on the real dark resting plate (the "Tools 1.89" class) | referent threaded onto the LIVE-probed surface (resting rung ≈0.42, the ramp's ground) → **4.31:1** ✓ dark; light 7.14→6.63 (no-regression); `safeAccentAgainstSurface` minted in `src/units/color/contrast.ts` (WCAG-ratio walk vs a surface COLOR) | `color-contrast.test.ts` (+4) · `view-accents.test.ts` (+3) · `o18-contrast-census.spec.ts` U-F26 leg |
| **BR-3** target size | U-F27 | CONTROLS `87b4eca` | gradient stop 20×20 on FINE pointers (coarse-gated `::before` only) → sub-24px WCAG 2.5.8 | always-on hit-inflation **24px fine** (`max(1.5rem,100%)`) / **44px coarse** (`--touch-target`); 20×20 visual dot HELD (zero reflow) | `o27-focus-affordance.spec.ts` |
| **BR-4** aria-valuetext | U-F27 | CONTROLS `87b4eca` | reka thumb emits raw 16-digit `aria-valuenow` (`0.8552000000000001`); no `aria-valuetext` | unit-aware grammar via a pure formatter — "Lightness 92.0%", "a axis 88.8", "Alpha 82.7%"; `aria-label` UNCHANGED (reactivity smoke depends on it) | `slider-announcement.test.ts` (7/7) · `o27` |
| **BR-5** forced-colors:active | U-F57 | MODALITY `7335786` | `.spectrum-picker` forced-color-adjust `auto`; 0 `forced-colors` rules in demo/+src/ → chrome loses affordance, color surfaces forced | two-tier `forced-color-adjust`: **`none`** on the color-DISPLAY surfaces (spectrum/canvases/rail/swatches — colors survive WHCM) + `auto` chrome; focus `outline` **2px** | `a11y-modality-support.spec.ts` |
| **BR-6** prefers-contrast:more | U-F57 | MODALITY `7335786` | `--glass-tint-strength` 4%; `--muted-foreground` unchanged; 0 `prefers-contrast` rules | tint **0%** (decorative U-F12 muddiness dropped); `--muted-foreground` → elevated color-mix (text floor raised); borders/hairlines up | `a11y-modality-support.spec.ts` |
| **BR-7** prefers-reduced-transparency:reduce | U-F57 | MODALITY `7335786` | `--glass-tint-strength` 4% (demo token); 0 `prefers-reduced-transparency` rules | **decorative-tint drop 4%→0% is the clean demo-owned RED→GREEN**; `--glass-level:0` + opaque bg + `backdrop-filter:none` as OUTCOME coherence checks (opaque glass is PARTLY producer-provided — honest finding §4) | `a11y-modality-support.spec.ts` |
| **BR-8** slider keyboard OPERATION | U-F57 | MODALITY `7335786` | uncovered — no test drove value across range | all **4** channel sliders (L/A/B/α) Home=0 → End=1 → ArrowLeft=0.999 = MOVES; operation intact, no relay needed | `a11y-slider-operation.spec.ts` |
| **BR-9** authed+populated battery | U-F56 | AUTHED `42608eb` | never driven live (empty-plate + unauth GETs only) | battery (accessible-name · target ≥24px · keyboard-operability, computed over the live composited surface) passes over **5 populated states**; 2 defects found→cured born-RED (admin row expander · thrown-error boundary) | `a11y-authed-{admin,user}.spec.ts` (7/7, smoke-admin) |
| **BR-10** dir=rtl integrity | U-F58 (RTL) | MODALITY `7335786` | `<html dir>` = `null` (no plumbing); physical `left/right` unaudited | `dir="ltr"` plumbing; `dir="rtl"` → `scrollWidth===clientWidth` (no overflow); global layout RTL-integral by construction (grid/flex/shorthand) | `a11y-web-modality.spec.ts` |
| **BR-11** @media print | U-F58 (print) | MODALITY `7335786` | 0 `@media print` rules; print dock nav `flex`; body keeps gradient | nav **`none`**; body **`rgb(255,255,255)`** + image `none`; swatches keep faithful ink (`print-color-adjust:exact`) — a legible palette artifact | `a11y-web-modality.spec.ts` |

**Born-RED count: 11 / 11 GREEN, zero FAIL.** BR-1..BR-9 guard a LIVE defect/gap; BR-10/BR-11 are
born-RED capability gates for the two U-F58 built modalities. Supplementary guards (green pre+post,
HARDENING witnesses not born-RED flips, recorded honest): **BR-1-WHCM** (the `outline` SURVIVES the
cure where the box-shadow ring is stripped — a regression guard) · **BR-3-coarse** (the coarse
`::before` already existed pre-cure; Pole A merely made it unconditional).

### Register 2 — owner-attested (small — only the genuinely perceptual)

| # | Gate (owner-attested) | Family | Headless leg REPORTED | The owner dependency |
|---|---|---|---|---|
| **OA-1** | the forced-colors / prefers-contrast / reduced-transparency fallbacks read as COHERENT (the aesthetic of the high-contrast register) | U-F57 | operability is born-RED (BR-5..BR-7, GREEN) | the AESTHETIC coherence of the fallback is taste. π: `modality-{forced-colors,contrast-more,reduced-transparency}.png` (+`rtl-layout.png`/`print-artifact.png`), all `-before` paired. Owner verdict PENDING. |
| **OA-2** | the authed + populated surface reads as a coherent gestalt (login/admin/populated-browse critique) | U-F56 | the a11y battery is born-RED (BR-9, GREEN) | the gestalt is owner-terminal (lesson 12). π: `authed-{login,admin,browse}-{light,dark}.png` + `error-boundary-{light,dark}.png`. Owner verdict PENDING. |

**Suites at close** (per lane returns): `npm test` **2326** pass (CONTRAST lane full run, incl. the
7 new contrast/feasibility rows + the 7-row `slider-announcement.test`) · typecheck **0** (lib +
demo) · lint **0** · `test:dist` gates GREEN (`proof:barrel-parity` + `proof:subpath-budget` 11/11 +
`proof:lib-correctness` — the `safeAccentAgainstSurface` export is CONSUMED, no orphan). Mount guards
**o10/o11/o21 16/16** — zero mount-box regression (the U-F76 handoff stays clean, see §6).

**Honest CI note** (green-over-broken avoidance): the e2e a11y specs (`o27-focus-affordance`,
`a11y-modality-support`, `a11y-slider-operation`, `a11y-web-modality`, `a11y-authed-*`) were proven
born-RED→GREEN **live** off each lane's own build (ports 8800/8808/8816/8824, never `:9000`); the
demo is un-bootable at raw `tranche-u` HEAD in this env (the U-F68/U-F34 adopt-drift — pinned
glass-ui/keyframes import pre-rename value.js `{from}To{to}` names the U.W-LIB `{from}2{to}` sweep
dropped). Each lane booted through a delimited, **reverted-before-commit** compat shim purely to run
the gate; the shim is in NO commit. **Consequence**: these specs run GREEN in CI once the demo boots
again (post U.W-ADOPT/U.W-LIB export reconciliation) exactly as the whole smoke suite does — they are
proven-correct here against the shimmed boot. Booked (§4).

---

## §2 · THE §Dispositions WALK — each family → its terminal state (zero silent drops)

Walking `waves/U.W-A11Y.md §Dispositions` row-by-row; every family reaches a named terminal state.

| Family | Wave-doc disposition | TERMINAL state (after this wave) |
|---|---|---|
| **U-F25** gradient-stop-focus-invisible | **build** (focus SYSTEM) | **CURED — BR-1 GREEN** (CONTROLS `87b4eca`). Pole A: hoisted `--shadow-sm` to the cascade, composed a robust-neutral dual-contrast ring over it, tokened it (`--focus-ring-inner/-outer`, new `focus-ring.css`), added the WHCM `outline` fallback. Removed the inline `box-shadow` + `focus-visible:ring` that clobbered each other. The twin of the 4e6c178 dead-hover miss, now cured at the class. |
| **U-F26** dark-accent-below-floor | **build** (live-surface referent unifying ramp+accent; O-14 feasibility-leg) | **CURED — BR-2 GREEN** (CONTRAST `6667eb05`). Pole A: `useViewAccents` threads `surfL` (the resting rung the ramp uses), NOT the page ambient → ramp+accent share ONE ground; dark **1.19:1→4.31:1**, certified ≡ rendered. Pole B: `safeAccentAgainstSurface` minted in `src/units/color/contrast.ts` (WCAG-ratio-vs-surface-COLOR, closing the ΔL-vs-ratio gap), CONSUMED by `resolveViewAccent` step-5, exported root + `/color` (parity GREEN). The W8 error-detail 2.72:1 residue was ALREADY LANDED (`1705345`, `--ink-muted`) — no re-guard needed. **Residual booked → U-F12** (§4). |
| **U-F27** tap-targets-aria-polish | **fold** (into the U-F25/A11Y hardening row) | **CURED — BR-3/BR-4 GREEN** (CONTROLS `87b4eca`). Pole A always-on hit-inflation (24px fine / 44px coarse, 20×20 visual dot HELD — mount-safe) + the unit-aware `aria-valuetext` announcement grammar via a pure formatter + a post-flush DOM-patch composable (glass-ui `Slider` exposes no valuetext prop → producer RELAY §5). |
| **U-F56** authenticated-populated-surface-uneyeballed | **build** (driven-live gestalt + a11y) | **CURED — BR-9 GREEN + OA-2 owner-attest OPEN** (AUTHED `42608eb`). The census pointer `static-zd3-admin` DISCHARGED. Battery passes over 5 populated states (7/7, smoke-admin fixture, NO prod target); 2 defects found→cured born-RED — the admin user-row EXPANDER (bare `<div>`→`role=button`+`tabindex`+`aria-expanded`+Enter/Space, WCAG 2.1.1) + the thrown-error boundary (§3). |
| **U-F57** a11y-modality-gaps | **build** (the high-contrast/contrast-preference SUPPORT LAYER) | **CURED — BR-5..BR-8 GREEN + OA-1 owner-attest OPEN** (MODALITY `7335786`, the SOLE `style.css` writer this wave). The designed two-tier forced-colors policy + prefers-contrast elevated-token set + reduced-transparency opaque fallback + SR landmark/live-region battery (nav+main named, 5 live regions) + slider keyboard OPERATION driven. Each a DESIGNED fallback, never a blanket override (E-3). |
| **U-F58** untested-web-modalities | **build-or-out-of-scope PER MODALITY** | **DECIDED per modality — BR-10/BR-11 GREEN** (MODALITY `7335786` + AUTHED `42608eb`). RTL + print BUILD (born-RED GREEN); PWA/offline + i18n-strings OUT-OF-SCOPE (recorded); error-injection a11y-half FOLD → U-F56 (CURED, §3); long-session/memory FOLD → U.W-PERF. Full table §3. Zero silent drops. |

**Named NOT here** (no silent drop, per the wave doc): **U-F4** (PRM dock-collapse) → U.W-ADOPT
(PRODUCER-ONLY, demo EXONERATED R-1; cited by name in the BH addendum §A11Y-6, NOT re-booked) ·
**U-F55 a11y-half** (lighthouse 1.0) → RETIRED (registry §19, not re-opened) · **U-F6/O-14
oracle-half** → U.W-ORACLE (U-F62, CLOSED) — this wave APPLIED the feasibility-leg law (BR-2), it
does not own it.

---

## §3 · THE PER-MODALITY RECORD — U-F58 build-or-out-of-scope (transcribed; ZERO silent drops)

| Modality | Decision | Where it landed / rationale |
|---|---|---|
| **i18n / RTL** | **BUILD** (mechanical readiness) | `dir="ltr"` plumbing (`index.html`) + GLOBAL layout RTL-integral by construction (grid/flex/shorthand; no global physical `left/right` to convert) — born-RED **BR-10** GREEN. Per-component physical→logical conversions **BOOKED** (`rtl-logical-property-audit.md`: 12 CSS-physical files + 13 Tailwind-utility files enumerated by name + owning lane; some — the gradient-stop L→R axis, the CSS `left/right` gradient keywords — are DIRECTIONAL-by-intent and may correctly NOT mirror). NOT string extraction. |
| **print** | **BUILD** | `@media print` in `style.css`: chrome hidden, ink-economical white ground, swatches/labels keep faithful ink (`print-color-adjust:exact`) — born-RED **BR-11** GREEN. |
| **error-injection / thrown-error** | **a11y-half BUILT (FOLD → U-F56); gestalt-half → U.W-VISUAL census** | The AUTHED lane BUILT the a11y half: an induced pane-render throw white-screened with no announced/focus-managed surface → **cured** with `ErrorBoundary.vue` (`onErrorCaptured`, `role=alert` + `aria-live=assertive` + focus moved into the boundary + a real recovery button) wrapping the App.vue pane-container. Never a silent dead plate. The error-detail CONTRAST was COORDINATED with U-F26 (not double-cured — threads the certified `--ink-muted` rung). The perceptual "micro-chrome reads coherent" gestalt = the U.W-VISUAL W8-inheritance census residue (that wave CLOSED, the residue carried in its ANNEX). Broader fault-injection resilience OUT-OF-SCOPE (recorded). |
| **PWA / offline** | **OUT-OF-SCOPE (recorded)** | Static demo already browser-cached; no offline DATA model (palettes API-backed). A SW/manifest is scope creep with no offline value. No successor re-opens. |
| **i18n string extraction** | **OUT-OF-SCOPE (recorded)** | Single-locale English tool; the RTL mechanical readiness is the buildable half. |
| **long-session / memory** | **FOLD → U.W-PERF** | The iOS 294-frame `ValueUnit`-nesting class (MEMORY.md); the `smoke-safari` sustained-30s probe carries it. Recorded, not dropped. |

---

## §4 · MISSES (PP-16 — named; none an A11Y defect)

1. **The 2 owner-attested register rows remain honestly OPEN** (OA-1 fallback coherence · OA-2 authed
   gestalt). By design this wave's owner-attested register is SMALL (a11y is deterministic — the
   operability is born-RED GREEN); only the AESTHETIC coherence of the high-contrast fallbacks and the
   authed+populated GESTALT are the owner's terminal call. π-frames captured headless (both schemes,
   `-before` paired) under `audit/w-a11y/pi/` for the owner's eye. Owner verdict PENDING (→ U.W-CLOSE).

2. **The U-F26 dock-icon residual → BOOKED to U-F12** (measured, named, not falsely gated green): the
   dock view-select icon (`color:var(--accent-view)`, a WCAG 1.4.11 graphic) reads **2.26:1** on its
   LIVE mid-tint dock chrome (`rgb(108,82,73)` tint, the U-F12 `dark-scheme-derived-tint-muddiness`).
   Feasibility analysis (measured) shows NO chromatic accent clears 3:1 while serving BOTH the mid
   dock band AND the dark resting plate with ONE token → its ROOT is U-F12 giving the dark dock a
   PROPER dark tier. Logged as a diagnostic in `o18-contrast-census`, not a hard gate. The registry's
   own U-F26↔U-F12 coupling ("the three dark-scheme reds share the derivation surface, cure
   coherently"). **U-F12 is an owner-ruling bracket (Pole A/B UN-PICKED) in the U.W-VISUAL ANNEX** →
   carries to the owner / U.W-CLOSE.

3. **The demo-boot adopt-drift blocker → BOOKED to U.W-LIB / U.W-ADOPT** (NOT an A11Y cure): the demo
   is un-bootable at raw `tranche-u` HEAD (U-F68/U-F34 — pinned glass-ui/keyframes import pre-rename
   value.js names the LIB `{from}2{to}` sweep dropped). Each lane used a reverted-before-commit compat
   shim to run its live gate; the a11y specs are proven born-RED→GREEN and will run GREEN in CI once
   the export surface reconciles (the same door U.W-VISUAL's §5.2 and U.W-ORACLE's e2e-substrate note
   name). Substrate territory, orthogonal to every A11Y cure.

4. **The BR-7 opaque-glass is PARTLY producer-provided** (honest finding, not a defect): live testing
   showed the pinned glass-ui's `./styles` already drives an opaque glass BG + `--glass-level:0` under
   reduced-transparency (the `.glass-resting` bg went opaque with the demo cure STASHED). So the clean
   demo-owned RED→GREEN for BR-7 is the **decorative-tint drop** (`--glass-tint-strength 4%→0%`, a demo
   token the producer never touches); the opaque bg + `--glass-level:0` are OUTCOME coherence checks.
   The registry §16 "0 rules in demo/+src/" was TRUE (the demo authored nothing); the producer's own
   reduced-transparency rules were the accidental cover. Recorded, not overclaimed.

5. **The producer RELAY halves ride the glass-ui cut** (§5): the demo halves of U-F25 (focus
   `outline`), U-F27 (target-size + `aria-valuetext`), U-F57 (forced-colors/reduced-transparency on
   producer primitives) land in-wave; the producer halves are ADDENDUM asks at the BH inbox, riding
   glass-ui / U.W-ADOPT BI-acceptance (NOT blocking the demo cures, which are buildable independently).

6. **The per-component RTL logical-property conversions → BOOKED** (component-owning lanes / a future
   i18n wave; `rtl-logical-property-audit.md`). BR-10's layout-integrity gate does not require them
   (the grid/flex shell mirrors correctly); the per-control offsets are the polish tier.

**No fabricated red, no pretend-headless flip.** Every born-RED gate is a real deterministic a11y
property; the U-F54 owner-attested annex does NOT apply to any Register-1 row (contrast / geometry /
attribute / media-emulation are GPU-independent).

---

## §5 · THE RELAY DECLARATION (E-2) — DISPATCHED (the A11Y-wave ADDENDUM landed at the BH inbox)

U.W-A11Y touches glass-ui producer surfaces (the shared controls the demo consumes — Slider, Button,
GlassDock, WatercolorDot, GooBlob, the veil), so per E-2 (THE RELAY EDICT) it carries a RELAY row.
**This is DISPATCHED, not not-triggered** — the MODALITY lane appended the single **A11Y-wave
ADDENDUM** to the landed communiqué `../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-
2026-07-12-u-formation.md` (SUPPLEMENTS, never supersedes), path-scoped single-file, local, **no
force, NOT pushed** — left for their session. M1: the value.js-side record IS the gate; an ack is a
bonus, never waited on. Verified present at close — six rows landed (`:191`–`:252`):

| Addendum row | Producer surface / ask | Owning family |
|---|---|---|
| **§A11Y-1** | target-size floor (`--touch-target` 44px) on the Slider thumb / Button / DockIconButton / DockSelectTrigger / DockDropdownTrigger via visual size OR always-on hit-inflation | U-F27 |
| **§A11Y-2** | forced-colors / prefers-contrast / reduced-transparency on GlassDock / Button / Select / veil + `forced-color-adjust:none` on the producer COLOR surfaces (WatercolorDot / GooBlob / spectrum) so the content survives WHCM — the largest producer ask | U-F57 |
| **§A11Y-3** | focus `outline` fallback on producer interactive primitives (box-shadow rings vanish under `forced-colors:active`) | U-F25 |
| **§A11Y-4** | `aria-valuetext` (or per-thumb `valueText(v)`) prop-through on the glass-ui `Slider` so consumers stop DOM-patching the reka thumb | U-F27 |
| **§A11Y-5** | value.js→glass-ui AVAILABILITY note (not coordination-blocking): `safeAccentAgainstSurface` now exported from `@mkbabb/value.js` + `/color` — glass-ui's own accent-on-glass certification MAY adopt it | U-F26 |
| **§A11Y-6** | the PRM dock-collapse (U-F4) — CITED BY NAME (already dispatched, communiqué §2a — NOT re-booked) | U-F4 |
| **§Boot-drift note** | the pinned-glass-ui-imports-pre-rename-value.js integration fact surfaced by this wave | U-F68/U-F34 |

**The AUTHED lane surfaced NO new producer-primitive a11y defect** in the driven authed/populated
surface beyond this already-relayed set — glass-ui tree untouched (PINNED). The CONTRAST lane's
`safeAccentAgainstSurface` availability note was folded into §A11Y-5 (that lane does not touch the
foreign tree). **SHA-drift flagged inline** (the wave-doc/relay-brief cite HEAD `17e0f522`; the
communiqué's dispatch-stamp says `051e6957`; the live glass-ui HEAD at filing was `dd9af7cf`) — the
addendum appended regardless and flags the drift for their read.

---

## §6 · HAND-FORWARD — U-F76 mount HELD → U.W-A11Y CLOSE UNBLOCKS U.W-PERF

U.W-A11Y was the **SECOND writer** on the shared picker/readout mount (U-F76: VISUAL → **A11Y** →
PERF). U-F26 (control accents) + U-F27 (control target-size) touched the SAME picker/readout plate
U.W-VISUAL reseated (WR-4 title step-down + the whole-header condense strip). This wave held the
mount box CLEAN by design:

- **U-F27 chose Pole A (always-on hit-inflation over visual-box growth)** precisely to hold the
  geometry — the 20×20 gradient-stop visual dot is UNCHANGED; the effective target grows via a
  transparent `::before`, zero reflow. **Mount guards o10/o11/o21 16/16 GREEN** (zero mount-box
  regression). Pole B (visual dot → 24×24, which would change control geometry) was NOT taken.
- **U-F26 is a color-resolution change** (referent threading + a library leaf) — no geometry touched.
- **U-F56/U-F58** cures (ErrorBoundary wrap, admin-row role, modality support layer, RTL/print) do
  not touch the mount box.

So **the settled mount box VISUAL froze is HANDED FORWARD UNCHANGED** — the final control geometry is
now clean for U.W-PERF, which reserves the box + re-measures the CLS/LCP budget over the SETTLED
geometry. **U.W-A11Y CLOSE UNBLOCKS U.W-PERF** (the last mount-box writer has gone; PERF may reserve).

- **→ U.W-PERF**: the settled picker/readout mount (WR-4 + condense strip + A11Y hit-inflation,
  visual box UNCHANGED) → CLS reservation over the frozen box; long-session/memory (U-F58 fold) rides
  the `smoke-safari` sustained-30s probe.
- **→ U.W-LIB / U.W-ADOPT**: the demo-boot adopt-drift export reconciliation (U-F68/U-F34) — the a11y
  e2e specs run GREEN in CI once it lands; the `safeAccentAgainstSurface` availability rides the
  library-cut version decision (booked); the producer RELAY halves (§5) ride BI-acceptance.
- **→ U.W-CLOSE / the owner**: OA-1 (fallback coherence) + OA-2 (authed gestalt) owner verdicts; the
  U-F26 dock-icon residual carried on the U-F12 owner-ruling bracket (Pole A/B UN-PICKED).

---

**Precedence chain** (restated): the owner's verbatim (§13.5 + any live ruling) → `audit/registry.md
§6/§10/§16/§19/§26` → `U.md` → `waves/U.W-A11Y.md` → this roll-up. Downstream never overrides
upstream. Unlike U.W-VISUAL, this wave's Register-1 gates are **machine-terminal born-RED** (a11y is
deterministic — no U-F54 annex applies); only the small owner-attested register (OA-1 fallback
coherence + OA-2 authed gestalt) awaits the owner's eye. Zero silent drops.
