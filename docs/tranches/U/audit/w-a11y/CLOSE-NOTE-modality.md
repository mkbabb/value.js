# U.W-A11Y MODALITY lane — CLOSE NOTE (U-F57 support layer + U-F58 web-modality decisions)

**Lane**: the U.W-A11Y MODALITY lane (U-F57 high-contrast/contrast-preference SUPPORT LAYER +
U-F58 untested-web-modality decisions + the single BH RELAY addendum). **Date**: 2026-07-13.
**Disposition**: `complete_with_misses` (all born-RED gates flipped RED→GREEN + π-frames + DELTAs;
one owner-attested register OA-1 flagged; two spec-vs-brief discrepancies flagged; the demo-boot
adopt-drift blocker surfaced + worked-around-for-verification + reverted).

## §Deliverable — the born-RED slate (all flipped RED→GREEN, verified live)

Served on **:8816** (`VJS_E2E_PORT=8816`, project `smoke`). Every gate is a DETERMINISTIC headless
a11y property (the U.W-A11Y thesis — no GPU confound). Each was confirmed **born-RED** by running
the spec against the pre-cure (stashed) source, then GREEN on the cure.

| Gate | Family | RED (pre-cure, measured) | GREEN (cure, measured) | π-frame |
|---|---|---|---|---|
| **BR-5** forced-colors:active | U-F57 | `.spectrum-picker` forced-color-adjust `auto`; chrome loses affordance | spectrum + `.atmosphere-canvas` forced-color-adjust **`none`** (color surfaces preserved); chrome visible+operable; focus outline **2px** | `modality-forced-colors.png` (+`-before`) |
| **BR-6** prefers-contrast:more | U-F57 | `--glass-tint-strength` **`4%`**; `--muted-foreground` unchanged | tint **`0%`** (decorative U-F12 muddiness dropped); `--muted-foreground` → elevated color-mix (text floor raised) | `modality-contrast-more.png` (+`-before`) |
| **BR-7** prefers-reduced-transparency:reduce | U-F57 | `--glass-tint-strength` **`4%`** (demo token); `--glass-level` non-zero | tint **`0%`** (demo-owned delta); `--glass-level` **`0`**; glass-resting bg translucent→**opaque**; carrier `::before` backdrop-filter **`none`** | `modality-reduced-transparency.png` (+`-before`) |
| **BR-8** slider keyboard OPERATION | U-F57 | (uncovered — no test drove value across range) | all **4** channel sliders (L/A/B/ALPHA) Home=0 → End=1 → ArrowLeft=0.999 = **MOVES** | (behavioral, no π) |
| **BR-10** dir=rtl layout integrity | U-F58 (RTL) | `<html dir>` = **`null`** (no plumbing) | `dir="ltr"` plumbing present; `dir="rtl"` → scrollWidth===clientWidth (no overflow); controls integral | `rtl-layout.png` (+`-before`) |
| **BR-11** @media print | U-F58 (print) | print dock nav display **`flex`** (chrome not hidden); body keeps gradient | nav **`none`**; body **`rgb(255,255,255)`** + image `none`; spectrum print-color-adjust **`exact`** | `print-artifact.png` (+`-before`) |

**SR landmark battery** (U-F57, coverage — not a born-RED flip): nav + main landmarks named &
visible; **5** aria-live/status/alert regions; the spectrum's `role="img"` descriptive label —
all present at HEAD (no source edit; App.vue is not this lane's file). Recorded.

**Cure surface** (this lane's files): `demo/@/styles/style.css` (the support layer + `@media print`
appended at end — this lane is the SOLE style.css writer this wave) · `demo/color-picker/index.html`
(`dir="ltr"` plumbing) · `e2e/smoke/a11y-modality-support.spec.ts` / `a11y-slider-operation.spec.ts`
/ `a11y-web-modality.spec.ts` · π-frames under `docs/tranches/U/audit/w-a11y/pi/`.

## §HONEST FINDINGS (green-over-broken avoidance)

1. **BR-7 opaque-glass is partly PRODUCER-provided.** Live testing revealed the pinned glass-ui's
   `./styles` ALREADY drives an opaque glass BG + `--glass-level:0` fallback under
   reduced-transparency (the `.glass-resting` bg went opaque even with the demo cure STASHED). So
   the opaque-glass OUTCOME is not a pure demo delta. The **clean demo-owned RED→GREEN** for
   reduced-transparency is the **decorative-tint drop** (`--glass-tint-strength 4%→0%`, a demo
   token the producer never touches) — BR-7 now asserts THAT as its born-RED, keeping the opaque
   bg + `--glass-level:0` as OUTCOME coherence checks. The demo cure reinforces the outcome for
   the demo surfaces (`.veil-surface`, the T-45 `.pane-wrapper::before` carrier) + owns the tint.
   The registry §16 "0 rules in demo/+src/" was TRUE (the demo authored nothing); the producer's
   own reduced-transparency rules were the accidental cover.

2. **The `!important` in the reduced-transparency block is a deliberate MODALITY ESCAPE** (scoped
   to `@media (prefers-reduced-transparency: reduce)` only) — it beats the producer SFC-scoped
   `.glass-resting[data-v-*]` (0,2,0) without a per-surface specificity fight, and forcibly
   reducing transparency is the whole intent. Not a fork of producer design.

## §U-F58 — the build-or-out-of-scope DECISION TABLE (transcribed; ZERO silent drops)

| Modality | Decision | Where it landed / rationale |
|---|---|---|
| **i18n / RTL** | **BUILD** (mechanical readiness) | `dir="ltr"` plumbing (index.html) + global layout RTL-integral by construction (grid/flex/shorthand); born-RED **BR-10** GREEN. Per-component physical→logical = BOOKED (`rtl-logical-property-audit.md`). NOT string extraction. |
| **print** | **BUILD** | `@media print` in style.css: chrome hidden, ink-economical white ground, swatches/labels keep faithful ink (`print-color-adjust:exact`); born-RED **BR-11** GREEN. |
| **PWA / offline** | **OUT-OF-SCOPE (recorded)** | Static demo already browser-cached; no offline DATA model (palettes API-backed). A SW/manifest is scope creep with no offline value. No successor re-opens. |
| **i18n string extraction** | **OUT-OF-SCOPE (recorded)** | Single-locale English tool; the RTL mechanical readiness is the buildable half. |
| **error-injection / thrown-error** | **a11y-half FOLD → U-F56 (AUTHED lane); gestalt-half → U.W-VISUAL census** | This lane does NOT build it — routing recorded. The error boundary's focus-management + `role="alert"`/live-region SR announcement folds into U-F56's driven-live battery; the perceptual "thrown-error micro-chrome reads coherent" is the U.W-VISUAL W8-inheritance census residue. |
| **long-session / memory** | **FOLD → U.W-PERF** | The iOS 294-frame `ValueUnit`-nesting class (MEMORY.md); the `smoke-safari` sustained-30s probe carries it. Recorded, not dropped. |

## §BH RELAY addendum (E-2) — LANDED (foreign-tree, local, NOT pushed)

Appended the **A11Y-wave ADDENDUM** to
`../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` (SUPPLEMENTS,
never supersedes), collating ALL producer asks: §A11Y-1 target-size floor (U-F27) · §A11Y-2
forced-colors/reduced-transparency + `forced-color-adjust:none` on producer color surfaces (U-F57,
the largest ask) · §A11Y-3 focus `outline` fallback (U-F25) · §A11Y-4 `aria-valuetext` prop-through
on `Slider` (U-F27) · §A11Y-5 `safeAccentAgainstSurface` availability note (U-F26, conditional) ·
§A11Y-6 U-F4 PRM dock CITED-BY-NAME (already dispatched, NOT re-booked) · §Boot-drift integration
note. Path-scoped single-file, local commit, **no force, NOT pushed** — left for their session. M1:
the value.js-side record IS the gate.

## §FLAGGED DISCREPANCIES (per the lane brief)

1. **π-frame path**: the wave-doc §π names `audit/pi/w-a11y/`; the lane brief corrects it to
   `audit/w-a11y/pi/`. Frames landed at **`docs/tranches/U/audit/w-a11y/pi/`** (the brief's path).
2. **glass-ui HEAD**: the wave-doc + relay brief cite HEAD `17e0f522`; the landed communiqué's
   own dispatch-stamp says `051e6957`; the LIVE glass-ui HEAD at this filing is **`dd9af7cf`**
   (`docs(BI · inbox): value.js U.W-VISUAL producer-material addendum`). Three SHAs; the addendum
   appended to the file regardless and flags the drift inline for their read.

## §THE BOOT-DRIFT BLOCKER (surfaced, worked-around-for-verification, disclosed) — NOT this lane's cure

The demo is **un-bootable at tranche-u HEAD** in this env: the pinned glass-ui
(`node_modules/@mkbabb/glass-ui` → `.claude/worktrees/glass-ui-pinned`, 2e559f7a) + its bundled
keyframes.js import value.js color exports under PRE-RENAME `{from}To{to}` names
(`oklabToLinearSRGB` / `oklabToRgb255` / `srgbToOKLab` / `rawOklab2oklch`-as-`rawOklabToOklch` /
`parseCSSSubValue`); value.js HEAD renamed them to `{from}2{to}` + retired `parseCSSSubValue` →
`parseCSSValues` (the **U-F34 naming drift** committed to HEAD; the **U-F68 adopt-drift**). Both
dev (`npx vite`) AND production (`npm run gh-pages`) builds crash on the missing exports.

**This is NOT this lane's cure** — it is owned by **U.W-LIB** (barrel parity / U-F22 / U-F34
naming) and **U.W-ADOPT** (the 5.0.0 re-adopt against the new value.js surface). To honor the
π/DELTA obligation (which requires a bootable app), this lane used a **faithful, delimited,
reverted-before-commit 6-alias boot shim** (`src/_a11y_boot_shim.ts` + one barrel append, mapping
the old names to the current `2`-names) → booted the demo → ran the gates live (born-RED confirmed
+ all GREEN + π-frames) → **fully reverted the shim** (`src/index.ts` diff back to only the
concurrent U.W-LIB lane's 2 insertions; shim file deleted; dist rebuilt clean). The shim is NOT in
this lane's commit. **Consequence**: the born-RED specs will run GREEN in CI **once the demo boots
again** (post U.W-ADOPT/LIB export reconciliation) — they require a bootable app exactly as the
whole smoke suite does; they are proven-correct here against the shimmed boot.

## §Owner-attested register — FLAGGED FOR THE OWNER

- **OA-1** (owner-attested): the forced-colors / prefers-contrast / reduced-transparency fallbacks
  read as COHERENT (the aesthetic of the high-contrast register), not a broken systematized mess.
  The OPERABILITY is born-RED (BR-5..BR-7, GREEN); the AESTHETIC coherence is taste. **π-frames for
  the owner's eye**: `modality-forced-colors.png` / `modality-contrast-more.png` /
  `modality-reduced-transparency.png` (+ `rtl-layout.png` / `print-artifact.png`), all with
  `-before` pairs, under `docs/tranches/U/audit/w-a11y/pi/`. Owner verdict PENDING.

## §BOOKS (rides, by name — no silent drop)

- Per-component physical→logical RTL conversions → the component-owning lanes / a future i18n wave
  (`rtl-logical-property-audit.md`).
- The producer halves (§A11Y-1..§A11Y-5) → glass-ui BH / U.W-ADOPT BI-acceptance (relayed).
- `safeAccentAgainstSurface` availability → U.W-LIB / U.W-ADOPT (if minted).
- long-session/memory → U.W-PERF; error-injection a11y-half → U-F56, gestalt-half → U.W-VISUAL.
- The demo-boot adopt-drift (U-F68/U-F34) → U.W-LIB + U.W-ADOPT (the export-surface reconciliation).
