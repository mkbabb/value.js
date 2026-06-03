# Visual-evidence DELTA — value.js picker (2026-06-02, K mid-tranche current-state capture)

The K.W1 before/after visual-evidence protocol (`../../design/K.W1-visual-evidence-protocol.md`) applied to the live local dev stack (`scripts/dev.sh up` → `:9000`) vs the last blob-era baseline.

**Captures**
- baseline (D.W6, 2026-05-20): `../../../D/audit/D.W6-visual-runtime/picker.png`
- current (2026-06-02, local dev): `picker-current-2026-06-02.png` (this dir)

**DELTA — the regression the user flagged is CONFIRMED (multi-part):**

1. **Blob over-large + mis-positioned.** `HeroBlob` (`demo/@/components/custom/color-picker/ColorPicker.vue:22`, grid `col-start-2 col-span-2 row-span-2 justify-self-end`) renders as a large coral blob overlapping the card-header region — vs a small, contained blob in the D.W6 baseline. → routes to **K.W3** (goo-blob lift + `BlobConfig` sizing/position; `design/K.W1-primitive-lift.md`).
2. **Picker card chrome absent.** The current capture shows the picker content floating WITHOUT its glass-ui rounded-card surface/border (present in baseline). Consistent with the glass-ui `dist/`-coupling degradation the K.W0 audit found (glass styling not fully applying in the local build). → routes to **K.W2** (substrate restoration + acyclic topology) + the glass-ui-first consummation.
3. **Spectrum shrunken** vs baseline — same card-chrome/layout degradation class.

**Verdict.** The protocol works: one before/after capture surfaced a real, layered regression. The blob mis-position (the user's standing concern, raised across tranches) is REAL and bound to **K.W3**; the card-chrome loss is bound to **K.W2**. The full affected-page re-baseline (picker · browse · extract · palettes · admin-users) is BOOKED for the **K.W6 ι-sweep**.

**Caveat.** This current capture is at the Playwright default viewport; the K.W6 close-baseline must recapture at the baseline's exact viewport for a pixel-honest DELTA. There are also two Apr-4 root captures (`color-picker-initial.png` / `color-picker-fixed.png`) from a prior blob-fix attempt — fold them into the baseline set at the K.W6 archival sweep (archive, do not delete).
