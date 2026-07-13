<template>
    <!-- The plate caption (R.W3 Lane B / B5+B6): the instrument names its
         lens like a plate names its illuminant; the readout carries the
         breathing numbers (cusp) — or states the clear plate as a
         measurement. -->
    <figcaption class="plate-caption">
        <span>{{ lensCaption }}</span>
        <span>{{ plateReadout }}</span>
    </figcaption>
</template>

<script setup lang="ts">
defineProps<{
    lensCaption: string;
    plateReadout: string;
}>();
</script>

<style scoped>
@reference "../../../../../styles/style.css";

/* The annotation voice (Fira Code), all-small-caps — the atlas-caption
 * register shared with the space title's catalog eyebrow.
 *
 * Ink: the certified de-emphasis rung `--ink-muted` (D6, T.W3-5 —
 * h-refine-console F-10; the t-2001-51 owner-shot instance). The former
 * `--muted-foreground` measured 3.84:1 light / 3.36:1 dark on the plate it
 * actually sits on — below the 4.5:1 small-text floor. The rung is
 * floor-clamped against the LIVE resting-plate lightness by the boot writer
 * (`useAtmosphereBoot` — the same contract as `--accent-live`). */
/* U.W-PERF · U-F16 / U-F76 — THE SINGLE-LINE MOUNT RESERVATION (the CLS cure).
 * The caption is a one-line instrument register BY DESIGN: `lensCaption`
 * ("gamut lens — <lens> / srgb") + `plateReadout` ("cusp l … c …" / "… Δ < jnd
 * — plate clear") are bounded compact annotations that settle to ONE line at
 * every gated viewport (probed 360/390/412/1440: spanΣ 255px ≤ capW 300–469px).
 * The FORMER `flex-wrap: wrap` let the caption WRAP to two lines during the
 * boot transient — the self-hosted Fira Code (`--font-mono`, base64 woff2)
 * arrives AFTER first paint, so the wider generic-monospace fallback briefly
 * overflowed the one-line budget and wrapped, adding ~18px of caption height.
 * The caption sits at the BOTTOM of the vertically-centred picker plate
 * (App.vue `.pane-main`/`.pane-slot-mobile` `justify-center`), so that 18px
 * collapse re-centred the whole ~613px plate on mobile → the deterministic
 * CLS 0.215 (the `.pane-shell > :first-child` plate = the LCP element AND the
 * CLS shifting node, registry §10). LOCKING the caption to nowrap RESERVES its
 * settled single-line box from frame one — the reflow is cured at the source,
 * not papered by a min-height nudge (E-3). `overflow: hidden` + the shrinkable
 * lens span (below) keep the pre-font-load transient graceful on that one line
 * (ellipsis, never wrap); at rest both strings show in full. The SETTLED
 * geometry is UNCHANGED (it was already one line) — U-F76 reserve-only. */
.plate-caption {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: nowrap;
    overflow: hidden;
    column-gap: 1rem;
    margin-top: 0.4375rem;
    padding-inline: 0.125rem;
    font-family: var(--font-mono);
    font-size: 0.625rem;
    line-height: 1.4;
    letter-spacing: 0.09em;
    font-variant-caps: all-small-caps;
    font-feature-settings: "tnum" 1;
    color: var(--ink-muted);
    white-space: nowrap;
    user-select: none;
}

/* The lens name is the shrinkable half — it ellipsizes if the pre-font-load
 * fallback transiently overruns the one-line budget, so the caption box never
 * grows a second line; the readout (the numbers) keeps its intrinsic width. */
.plate-caption > span:first-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}
.plate-caption > span:last-child {
    flex: none;
}
</style>
