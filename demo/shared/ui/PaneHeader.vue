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
    <!-- A2-VA-L1-2 (X-W12U .k2): the header IS glass's `<CardHeader shrink>`.
         Under a scroll host above it, it condenses on glass's real-box
         discrete condense (hysteresis threshold + sufficiency gate, the
         padding flip under `[data-condensed]`, the caption hidden; the
         rungs it lands on are this file's, X.W10.d / DESIGN.md §3.2 P-2); the
         per-frame title-scale / caption scrub this file carried "until P3's
         ScrollCardHeader knobs land" is retired with them landed. The rest
         top padding rides glass's `--card-pad` (1rem, the retired `pt-4`) so
         glass's condensed flip owns the block-start padding. A SEATED header
         (no host above it) never condenses. The constitutive VEIL below stays
         this file's until glass absorbs it (O-74d §1, ADOPT). -->
    <CardHeader
        shrink
        class="pane-header px-4 sm:px-6 pb-(--pane-header-gap) [--card-pad:1rem] sticky top-0 z-header"
    >
        <!-- Q5 (S.W4 W4-7): the pane title speaks the DISPLAY voice — the ONE
             site; all 9 panes inherit. The three-voice law's hierarchy fix:
             the largest text on a pane must not speak the body sans.
             T.W4-1 (D2 · Q11a): the rung moves one full golden step,
             heading → display-1 (×φ at the ≥1440 cap; on phones floored one
             rung above heading, X-DS pass 9 / V9C-02, `--pane-title-size`). Weight rides the :root `--type-weight-display` pin
             (non-bold; the P10 booked swap) — `text-heading`'s hardcoded 700
             is retired from this surface. -->
        <!-- X.W5.a · gate A5's OUTLINE arm (⟨PaneHeader PH-8⟩, BD-06's carve).
             The pane title was a HARDCODED `<h3>` under a document with no
             `<h1>` at all, so every route's outline began at level 3 and
             About's own `<h2>`s sat ABOVE their container's heading. X.W5.a
             gives the route a visible `<h1>`; this seam gives the pane title a
             LEVEL, defaulting to the one that sits directly beneath it. The
             prop is the producer seam's own shape (`as`/`level`), so a nested
             pane can state its depth instead of the shell guessing. -->
        <!-- X-DS value pass 8 (V8C-01): a pane whose title says the route's
             label carries the route `<h1>` (PaneShell passes level 1 and the
             id); it keeps the A5 node's script-only focus (`tabindex="-1"`). -->
        <CardTitle
            :id="titleId"
            :as="`h${level}`"
            :tabindex="titleId !== undefined ? -1 : undefined"
            class="pane-header-title font-display"
        >
            <slot />
        </CardTitle>
        <!-- AB-2 (T.W8 remediation_1 · D6): the caption speaks the CERTIFIED
             de-emphasis rung `--ink-muted` (the boot-stamped floor-clamped
             plate ink, ≥4.5 on the composited resting plate) — never raw
             `--muted-foreground`, which measured 4.29:1 on the TRUE header
             ground (veil `::before` included). The color rides the scoped rule
             below; glass hides the caption on the condensed strip. -->
        <CardDescription v-if="description" class="pane-header-desc text-caption">{{ description }}</CardDescription>
    </CardHeader>
</template>

<script setup lang="ts">
import { CardDescription, CardHeader, CardTitle } from "@mkbabb/glass-ui/card";

const { level = 2, titleId } = defineProps<{
    description?: string;
    /** Heading level for the pane title — 2 by default: it sits one below the
     *  route `<h1>` inside `<main>`; 1 when this title IS that `<h1>`. */
    level?: 1 | 2 | 3 | 4;
    /** The route title's id, when this title is the route `<h1>`. */
    titleId?: string;
}>();
</script>

<style>
/* Pane scroll host (D.W4 Lane A §4: colocated from styles/style.css).
 *
 * The `.pane-scroll-fade` host class lives on the ONE scroll owner of every
 * pane (A2-VA-L1-1: PaneShell's FadingScroll port, the header seated above it;
 * the overlying `.card-scroll-host` branch is retired, X-DS tail). Because
 * the class is applied by PaneShell, not by a descendant of PaneHeader, the block must be UNSCOPED. It is colocated HERE because
 * PaneHeader owns the only consumer of `--pane-scroll` (the named
 * scroll-timeline defined by this block), so producer + consumer live in one
 * file.
 *
 * `contain: layout style paint` isolates the named scroll-timeline so
 * PaneHeader animations respond to THIS pane's scroll only, not
 * portal-triggered layout shifts in ancestor containers. */
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
    /* X.W10.d (CC-101): the condensing header's real box shrinks by more than
     * glass's hysteresis band (condense at 20, expand at 12). Scroll anchoring
     * answered that shrink by pulling `scrollTop` back by the same amount, under
     * the expand trigger, so the header flipped between states every frame
     * (measured: g5-threshold-*.txt). The pane's scroll position is the
     * reader's, never re-anchored by its own header. */
    overflow-anchor: none;
}

/* X-DS pass 2 (V2C-17): a pane scroll port that runs on glass's FadingScroll
 * (About, My Palettes) feathers its end edge over one line height, so the
 * fold says "more below" instead of cutting the last row mid-glyph. glass's
 * `--fade-scroll-width` (1rem) is sized for the horizontal strips; this is
 * the token's value for the vertical pane ports only, one rule, no instance. */
.pane-scroll-fade.fading-scroll--y {
    --fade-scroll-width: 1.5rem;
}

/* X-DS pass 3 (V3C-01): THE SEATED HEADER. A pane whose body scrolls on a
 * FadingScroll port (About, My Palettes, and since pass 4 the config pane)
 * seats its PaneHeader ABOVE the port, as a sibling, so nothing scrolls under
 * the title. */
/* X-DS pass 4 (V4C-05): a SEATED header paints no veil. Nothing scrolls under
 * it, so the veil had no occlusion job: at rest it laid a darker tone band under
 * the title, and its 14px feather smeared into the top of the port. The port's
 * own top feather already says "scrolled". The pass-3 `timeline-scope` that let
 * this veil swell with the port goes with it. Headers that DO overlie their
 * scrolling body keep the owner-banked rest veil (V2C-15) unchanged. */
.card:has(> .pane-header ~ .pane-scroll-fade) > .pane-header::before {
    display: none;
}
</style>

<style scoped>
@reference "../../styles/foundation.css";

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
 * ruling's structural half): the mask fades the veil over the last 14px of
 * the header box, so it dissolves into the plate instead of terminating at
 * a box edge (O-11 gate 2). X-DS pass 5 (V5C-01): the feather lives INSIDE
 * the header's own `--pane-header-gap` band (26px). It used to overhang the
 * box by 14px into the body's top padding; V4C-06 moved that padding into
 * the header, so the overhang fell on the first row (a two-tone search
 * field, a fogged drop zone). */
.pane-header::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: var(--glass-plate-resting);
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
    font-size: var(--pane-title-size);
    line-height: var(--type-leading-display);
    letter-spacing: var(--type-tracking-display);
    font-weight: var(--type-weight-display);
    text-wrap: balance;
}


/* AB-2 (D6) — the caption ink: the boot-stamped certified de-emphasis rung.
 * `--ink-muted` is the floor-clamped plate ink useAtmosphereBoot writes on
 * :root (the plate-caption / parse-echo voice, ≥4.5 on the composited resting
 * plate). Falls back to `--muted-foreground` before the boot writer runs. */
.pane-header-desc {
    color: var(--ink-muted);
}

.pane-header {
    /* X-DS pass 4 (V4C-06): THE HEADER-TO-BODY GAP, one token at the app's
     * section rhythm (the φ rung every in-pane section clears its rule by). The
     * bodies carry no top padding of their own: the per-body `pt-2`/`py-4`
     * that compensated for the old `pb-2` set the rhythm per instance, and on
     * four panes jammed the first row against the header band. */
    --pane-header-gap: var(--phi-3);
    /* X-DS pass 7 (VC7-03): THE TITLE-TO-CAPTION GAP. glass's header gap is
     * `--card-gap` = `--space-atom`, which halves to 0.25rem under 768px, so on
     * phones the caption sat 4px under a display title that wraps to two lines.
     * The pane header holds the desktop rung (0.5rem) at every width. */
    --card-gap: 0.5rem;
    /* X-DS pass 9 (V9C-02): THE PANE-TITLE RUNG — display-1, floored one
     * full rung ABOVE heading (the title rung, 2.058rem). display-1's clamp
     * floor-pins AT heading on phones (1.618rem = 25.9px), which left the pane
     * title only 1.27x the in-pane section heads (`text-subheading`, 20.35px
     * at 600) and inverted the phone hierarchy. The floor holds a full step
     * (title / subhead = 1.62 at 390); from ~860px display-1 rises past it
     * unchanged. The 400 title / 600 head pairing is kept. */
    --pane-title-size: max(var(--type-title), var(--type-display-1));
    /* The one tunable: the ratified rest floor (Q9 bracket [0.45, 0.65] of
     * the veil; effect bracket 27–39% added card material — see above). */
    --pane-veil-rest: 0.52;
    /* X.W10.d (CC-101 · OM-18): THE CONDENSED PADDING, its own token — never
     * `--card-gap`, which glass's flip borrows and which this header pins as
     * its title-to-caption gap. One φ rung below the rest `--card-pad`
     * (`--phi-2`): demo/DESIGN.md §3.2, Law P-2. */
    --pane-header-pad-condensed: var(--phi-1);
}

/* ── THE CONDENSED REGISTER (X.W10.d · CC-101 · demo/DESIGN.md §3.2 P-2) ──
 * A condensed header is condensed: each spacing channel steps one φ rung
 * down (ratio 1/φ) — the block-start padding `--phi-2` → `--phi-1`, the
 * title→content gap `--phi-3` → `--phi-2` — and the caption, having left the
 * reading, leaves the layout (glass's `visibility: hidden` keeps its box).
 * Glass still owns the state machine and the threshold; these are the rungs. */
.pane-header[data-condensed="true"] {
    --pane-header-gap: var(--phi-2);
    padding-block-start: var(--pane-header-pad-condensed);
}

.pane-header[data-condensed="true"] > .pane-header-desc {
    display: none;
}

/* ── THE CONDENSED TITLE (A2-VA-L1-2) ───────────────────────────────────
 * Glass's `<CardHeader shrink>` owns the condense: the state machine, the
 * block-start padding flip, the caption's exit and the title's glide. The
 * pane title's RUNGS stay the app's (T.W4-1 · D2): rest display-1, and on the
 * condensed strip the heading rung — the stuck title lands exactly on the
 * retired heading rung, as the retired compositor scrub's endpoint law said
 * (on phones the title rung floors at --type-title, one rung above heading,
 * since X-DS pass 9 / V9C-02, so the condense is a real step there too).
 * The per-frame title-scale / caption scrub is retired: the condense is ONE
 * discrete transition at the threshold, never a scrub. */
.pane-header[data-condensed="true"] > .pane-header-title {
    font-size: var(--type-heading);
}

/* ── THE SWELL (compositor-only; SDA-gated) ────────────────────────────
 * The veil's scroll-earned intensity lives inside the @supports gate so the
 * REST state is engine-invariant (O-11 gate 5): non-SDA engines and the base
 * state paint the identical designed rest header; only the swell degrades. A
 * scroll SCRUB of opacity is position-mapped, not time-based motion, so it
 * needs no PRM gate (t-header-shading F5).
 *
 * The veil SWELL completes by 64px — content reaches the title underside by
 * ~24–48px (About/Gradient, the earliest colliders), so the veil is near-full
 * before any ink collision (O-11 gate 3, the F2 double-exposure cure). The
 * earn-range is keyed to OCCLUSION (gap-driven), re-verified at T.W4-7 over
 * the ×φ-taller band. */
@supports (animation-timeline: scroll()) {
    .pane-header::before {
        animation: pane-header-veil linear both;
        animation-timeline: --pane-scroll;
        animation-range: 0px 64px;
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
</style>
