<template>
    <!-- T.W3-4 (T-23 · R2 · Q9): THE CONSTITUTIVE VEIL. The material is a
         property of the surface, not a reward for scrolling — the header
         rests SHADED at the ratified floor and the scroll earns INTENSITY,
         never existence (the S.W5-2 rider's zero-at-rest clause is
         SUPERSEDED; its FEATHER — the band-killer — survives at every
         state). The veil is the plate's own rung-1 material at a
         scroll-earned intensity (C2; the CC-3 bespoke recipe is dead), and
         the whole choreography is compositor-only (the F3 layout-animating
         fork is dead — O-11 gate 4). -->
    <div class="pane-header px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-header">
        <!-- Q5 (S.W4 W4-7): the pane title speaks the DISPLAY voice — the ONE
             site; all 9 panes inherit. The three-voice law's hierarchy fix:
             the largest text on a pane must not speak the body sans.
             T.W4-1 (D2 · Q11a): the rung moves one full golden step,
             heading → display-1 (×φ at the ≥1440 cap; phones floor-pinned =
             the deliberate no-op, t-mobile F-4.2 — About is an honest 2-line
             lock <sm). Weight rides the :root `--type-weight-display` pin
             (non-bold; the P10 booked swap) — `text-heading`'s hardcoded 700
             is retired from this surface. -->
        <h3 class="pane-header-title font-display"><slot /></h3>
        <div v-if="description" class="pane-header-desc-wrap">
            <!-- AB-2 (T.W8 remediation_1 · D6): the caption speaks the CERTIFIED
                 de-emphasis rung `--ink-muted` (the boot-stamped floor-clamped
                 plate ink, ≥4.5 on the composited resting plate) — never raw
                 `--muted-foreground`, which measured 4.29:1 on the TRUE header
                 ground (veil `::before` included). One class-list edit; all 9
                 panes inherit. The color rides the scoped rule below. -->
            <p class="pane-header-desc text-caption">{{ description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    description?: string;
}>();
</script>

<style>
/* Pane scroll host (D.W4 Lane A §4: colocated from styles/style.css).
 *
 * The `.pane-scroll-fade` host class lives on the ROOT element of each pane
 * Card (9 sibling panes: Browse/Admin/About/Palettes/Mix/Gradient/Extract/
 * Generate/ConfigSlider). Because the class is applied across siblings of
 * PaneHeader (not its descendants), the block must be UNSCOPED to reach
 * those consumers. It is colocated HERE because PaneHeader owns the only
 * consumers of `--pane-scroll` (the named scroll-timeline defined by this
 * block), so the producer + consumer live in one file.
 *
 * `contain: layout style paint` isolates the named scroll-timeline so
 * PaneHeader animations respond to THIS pane's scroll only, not
 * portal-triggered layout shifts in ancestor containers. */
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
</style>

<style scoped>
@reference "../../../styles/style.css";

/* ── THE VEIL (T.W3-4) ──────────────────────────────────────────────────
 * Constitutive: the ::before paints the header's material AT REST. Fill +
 * filter are the producer RESTING-rung tokens — the same species as the
 * rung-1 plate the header caps (C2's reconciliation; retires the bespoke
 * `--card` 60% / blur(12px) pair, the census's 7th parallel recipe, CC-3).
 * Scheme + `--glass-level` registration ride the tokens by construction.
 *
 * THE REST FLOOR — the Q9 EFFECT bracket, closed-form: rest must add
 * 27–39% card material (= [0.45, 0.65] of the retired 60%-card veil).
 * Against the resting-rung fill (α 0.65 light / 0.72 dark) the floor 0.52
 * composites 33.8% L / 37.4% D — inside the bracket, both schemes, at the
 * eye-judged center's weight (t-header-shading §3: 0.55 × 60% ≈ 33%).
 * The producer rest-floor + bottom-feather knobs are packet P3 (BOOKED
 * swap); this veil + feather are the carried interim.
 *
 * THE FEATHER stays at EVERY state — it is the band-killer (the 2026-07-05
 * ruling's structural half): the pseudo extends 14px past the header box
 * and the mask fades exactly that overhang, so the veil dissolves into the
 * plate instead of terminating at a box edge (O-11 gate 2). */
.pane-header::before {
    content: "";
    position: absolute;
    inset: 0 0 -14px 0;
    z-index: -1;
    pointer-events: none;
    background: var(--glass-bg-resting);
    -webkit-backdrop-filter: var(--glass-blur-resting);
    backdrop-filter: var(--glass-blur-resting);
    mask-image: linear-gradient(to bottom, black calc(100% - 14px), transparent);
    -webkit-mask-image: linear-gradient(
        to bottom,
        black calc(100% - 14px),
        transparent
    );
    opacity: var(--pane-veil-rest);
}

/* T.W4-1 — the pane-title rung (D2 · Q11a): heading → display-1, one full
 * golden step, on the title's OWN rule (the producer `text-heading` utility
 * hardcodes 700 — retired here; the weight rides the :root pin, the P10
 * booked swap). Leading/tracking/balance are the producer's own display-rung
 * pairing (`text-display`), carried verbatim so the landing is the exact
 * shipped rung, not a hybrid. */
.pane-header-title {
    font-size: var(--type-display-1);
    line-height: var(--type-leading-display);
    letter-spacing: var(--type-tracking-display);
    font-weight: var(--type-weight-display);
    text-wrap: balance;
}

.pane-header-desc-wrap {
    margin-top: 0.125rem;
}

/* AB-2 (D6) — the caption ink: the boot-stamped certified de-emphasis rung.
 * `--ink-muted` is the floor-clamped plate ink useAtmosphereBoot writes on
 * :root (the plate-caption / parse-echo voice, ≥4.5 on the composited resting
 * plate). Falls back to `--muted-foreground` before the boot writer runs. */
.pane-header-desc {
    color: var(--ink-muted, var(--muted-foreground));
}

.pane-header {
    /* The one tunable: the ratified rest floor (Q9 bracket [0.45, 0.65] of
     * the veil; effect bracket 27–39% added card material — see above). */
    --pane-veil-rest: 0.52;
    /* T.W4-1 — the RE-TARGETED endpoints on W3-4's PINNED compositor arm
     * (no font-size keyframe returns): rest = scale 1 at display-1, stuck =
     * heading/display-1 — the stuck title lands EXACTLY on the retired
     * heading rung. The ratio is CLOSED-FORM, not a hand constant:
     * tan(atan2(y, x)) is the CSS length-ratio identity, so the endpoint
     * law survives display-1's viewport-fluid clamp at every band — ≈0.618
     * (1/φ) at the ≥1440 cap, degenerating to exactly 1 on phones where
     * display-1 floor-pins AT heading (the shrink self-neutralizes; the
     * floor-pinned no-op needs no band arm). Guarded by the same @supports
     * SDA gate as its one consumer (atan2: Chromium 111+ ⊂ SDA engines). */
    --pane-title-shrink-ratio: calc(
        tan(atan2(var(--type-heading), var(--type-display-1)))
    );
}

/* ── THE SWELL + SHRINK (compositor-only; SDA-gated) ────────────────────
 * Every scroll-driven animation lives inside the @supports gate so the REST
 * state is engine-invariant (O-11 gate 5): non-SDA engines and the base
 * state paint the identical designed rest header; only the swell/shrink
 * degrade. A scroll SCRUB is position-mapped, not time-based motion, so it
 * needs no PRM gate (t-header-shading F5) — under PRM the rest state is
 * byte-identical by the same from-state = base-state construction.
 *
 * The F3 fork is RETIRED: the padding / font-size / grid-template-rows
 * keyframes (three layout-reflow channels scrubbed per frame) are dead. The
 * choreography is the producer scroll grammar's compositor transposition —
 * title `scale` (the title-collapse lane, transform-origin left top), desc
 * opacity+translate — until P3's ScrollCardHeader knobs land (BOOKED).
 *
 * The veil SWELL completes by 64px — decoupled from the 120px title range:
 * content reaches the title underside by ~24–48px (About/Gradient, the
 * earliest colliders), so the veil is near-full before any ink collision
 * (O-11 gate 3, the F2 double-exposure cure).
 *
 * T.W4-7 — THE RE-DERIVE AGAINST THE ×φ-TALLER BAND (T-23's geometry over
 * the settled post-W2 field; W4-1 grew the title heading→display-1): the
 * earn-range is keyed to OCCLUSION, not the shrink — occlusion onset is
 * GAP-driven (content crosses the sticky header's underside at a scroll
 * offset set by the header→content gap, which the type move left
 * unchanged), so the 0–64px veil range HOLDS over the taller band; the
 * ::before tracks the grown header box by construction (inset-derived).
 * The title-shrink range stays the producer grammar's own 0–120px (one
 * grammar — card-scroll.css's title-collapse lane; the ×φ travel rides the
 * same scrub). RE-VERIFIED at W4-7: O-11 gate 1 (rest floor inside the Q9
 * EFFECT bracket, both schemes, all panes — MATERIAL untouched, W3-4's) +
 * gate 3 (swell ≤64px, no naked window under the earliest colliders) green
 * over the settled field. */
@supports (animation-timeline: scroll()) {
    .pane-header::before {
        animation: pane-header-veil linear both;
        animation-timeline: --pane-scroll;
        animation-range: 0px 64px;
    }
    .pane-header-title {
        transform-origin: left top;
        animation: pane-title-shrink linear both;
        animation-timeline: --pane-scroll;
        animation-range: 0px 120px;
    }
    .pane-header-desc-wrap > p {
        animation: pane-desc-shrink linear both;
        animation-timeline: --pane-scroll;
        animation-range: 0px 80px;
    }
}

@keyframes pane-header-veil {
    from {
        opacity: var(--pane-veil-rest);
    }
    to {
        opacity: 1;
    }
}

@keyframes pane-title-shrink {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(var(--pane-title-shrink-ratio));
    }
}

@keyframes pane-desc-shrink {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-0.25rem);
    }
}
</style>
