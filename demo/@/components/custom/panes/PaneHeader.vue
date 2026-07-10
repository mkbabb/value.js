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
             the largest text on a pane must not speak the body sans. -->
        <h3 class="pane-header-title font-display text-heading"><slot /></h3>
        <div v-if="description" class="pane-header-desc-wrap">
            <p class="text-caption text-muted-foreground">{{ description }}</p>
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

.pane-header-desc-wrap {
    margin-top: 0.125rem;
}

.pane-header {
    /* The one tunable: the ratified rest floor (Q9 bracket [0.45, 0.65] of
     * the veil; effect bracket 27–39% added card material — see above). */
    --pane-veil-rest: 0.52;
    /* W3-4 owns the COMPOSITOR CONVERSION; W4-1 re-targets the endpoints
     * (rest display-1 → stuck heading/display-1). 0.695 transposes the
     * retired font-size keyframe's own endpoints (--type-heading →
     * --type-prose) ≈ the producer's --card-title-shrink-ratio. */
    --pane-title-shrink-ratio: 0.695;
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
 * (O-11 gate 3, the F2 double-exposure cure). */
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
