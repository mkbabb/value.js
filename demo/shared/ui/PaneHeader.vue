<template>
    <!-- A2-VA-L1-2 (X-W12U .k2): the header IS glass's `<CardHeader shrink>`.
         Under a scroll host above it, it condenses on glass's real-box
         discrete condense (hysteresis threshold + sufficiency gate, the
         padding flip under `[data-condensed]`, the caption hidden; the
         rungs it lands on are this file's, X.W10.d / DESIGN.md §3.2 P-2); the
         per-frame title-scale / caption scrub this file carried "until P3's
         ScrollCardHeader knobs land" is retired with them landed. The rest
         top padding rides glass's `--card-pad` (1rem, the retired `pt-4`) so
         glass's condensed flip owns the block-start padding. A SEATED header
         (no host above it) never condenses. SS8-0192: the T.W3-4 constitutive
         VEIL is deleted — PaneShell seats every header above its port (X-DS
         tail, `4fe9b05b9`), so nothing scrolls under a header and the veil
         was never generated (display:none in 48/48 census cells). -->
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
        <!-- AB-2 (T.W8 remediation_1 · D6): the caption speaks a CERTIFIED
             plate rung — never raw `--muted-foreground`. X.W11.d3b (§0gl.3,
             the referent law): certified against the darkest region under
             it, the rung is `--ink-primary`. The color rides the scoped rule
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
 * the class is applied by PaneShell, not by a descendant of PaneHeader, the
 * block must be UNSCOPED.
 *
 * `contain: layout style paint` isolates the port so its layout and paint
 * never leak into ancestor containers. The named `--pane-scroll` timeline
 * this block declared fed only the header veil, and died with it (SS8-0192). */
.pane-scroll-fade {
    contain: layout style paint;
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
</style>

<style scoped>
@reference "../../styles/foundation.css";

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


/* AB-2 (D6) — the caption ink, a boot-stamped certified plate rung.
 * X.W11.d3b (COHESION §0gl.3 · §0gk.2 referent law, B22 U-1 / B09 0259): a
 * caption is certified against the darkest backdrop region it actually sits
 * over, not the field mean. Against that region `--ink-muted` (certified on
 * the mean resting plate) fell under 4.5:1 across the panes, so the caption
 * takes ONE token step up the plate ladder to `--ink-primary`, the scheme
 * foreground useAtmosphereBoot certifies on the same plate (a token, never
 * opacity: B02 0039). Size and the caption rung carry the de-emphasis. */
.pane-header-desc {
    color: var(--ink-primary);
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
</style>
