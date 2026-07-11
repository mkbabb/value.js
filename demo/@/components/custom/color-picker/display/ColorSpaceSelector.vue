<template>
    <!-- S.W4 W4-1 (S-1 + S-14) — TITLE-AS-COMPONENT: the veil capsule, the
         catalog eyebrow, and the per-row index are EXCISED. The space name is
         the plate TITLE — a bare ghost trigger sitting directly on the field
         like every other piece of plate typography. The Select root is
         renderless; the title IS this component's first painted node. -->
    <Select
        v-model:open="openModel"
        :model-value="modelValue"
        @update:model-value="
            (colorSpace: any) => {
                emit('update:modelValue', colorSpace);
                openModel = false;
            }
        "
    >
        <!-- The trigger OWNS its face — ALL FOUR AXES (T.W4-1 · O-10a; the
             S-21 law extended to weight): `font-display italic` + the scoped
             font-size/font-weight below live on the trigger's own class list,
             host-independent by construction. WEIGHT rides the :root
             `--type-weight-display` pin (the About-700 inheritance bug —
             t-title-typography F2 — is dead: weight no longer inherits from
             any host heading). SIZE is the ONE sanctioned host prop (F3):
             the picker plate keeps the explicit display-3 rung (Q11a — two
             token steps, ×φ, above the retired audacious/display-1 basis;
             the producer trigger ladder tops out at display-1, so the rung
             lands as the exact shipped token in the scoped block — the P10
             size-station consume is the BOOKED swap); the About host passes
             `inline` and the trigger inks `1em`, riding its sentence (and
             its compositor shrink) by construction. The ink ladder rides
             `--space-title-ink` so the scoped block owns rest/hover/open as
             ONE grammar in both hosts. The caret is the ONLY rest
             affordance — producer-owned glyph; size + nudge are em-relative
             so the affordance holds its optical ratio at every rung (a
             fixed-px caret/underline reads hairline at the ×φ landing). -->
        <!-- Open-state caret (seed rider 1, DISCHARGED-BY-PRODUCER): glass-ui's
             SelectTrigger chevron now keys off the TRIGGER's data-state
             (`in-data-[state=open]:rotate-180`, SelectTrigger.vue — the L18
             letter item, shipped at tranche/BG) on the spring + punch clock.
             The rotation is producer-owned; the demo carries NO consumer
             rotation utility — re-adding one would shadow the shipped fix. -->
        <SelectTrigger
            aria-label="Select color space"
            variant="ghost"
            size="audacious"
            :style="{ '--space-title-ink': safeAccent }"
            :class="[
                'space-trigger inline-flex w-fit h-fit align-baseline font-display italic tracking-tight select-none [&>span]:overflow-visible [&>span]:line-clamp-none [&>span]:block [&_svg]:translate-y-[0.06em]',
                inline ? 'space-trigger--inline' : '',
            ]"
        >
            <SelectValue class="w-full" />
        </SelectTrigger>
        <!-- The specimen catalog stays — all glass belongs to the dropdown,
             never the title (W4-1 open-state law). Rows are SPECIMEN entries:
             display-face name, WatercolorDot swatch, live per-space
             conversion (identical in both hosts — see the injection note). -->
        <SelectContent align="start">
            <SelectGroup>
                <SelectItem
                    v-for="[space, name] in spaceEntries"
                    :key="space"
                    :value="space"
                    hide-indicator
                    class="pl-3 pr-4 py-2"
                >
                    <!-- Default slot = SelectItemText: the display-face
                         name ONLY (reka's SelectValue clones this node
                         into the trigger — the swatch/conversion must
                         stay in the #description row). -->
                    <span
                        class="font-display italic text-title leading-tight"
                        :class="modelValue === space ? 'font-semibold' : ''"
                    >{{ name }}</span>
                    <template #description>
                        <span class="flex items-center gap-2 min-w-0 max-w-[16rem]">
                            <WatercolorDot
                                tag="div"
                                :color="cssColor"
                                class="specimen-dot shrink-0"
                                :class="modelValue === space ? '' : 'specimen-dot-idle'"
                            />
                            <span
                                v-if="colorModel"
                                class="fira-code text-mono-caption lowercase opacity-60 truncate"
                            >
                                {{ specimenFor(space as DisplayColorSpace) }}
                            </span>
                        </span>
                    </template>
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { inject } from "vue";
import { colorUnit2, normalizeColorUnit } from "@mkbabb/value.js/color";
import {
    DISPLAY_COLOR_SPACE_NAMES,
    colorToHexString,
    resolveColorSpace,
} from "..";
import type { DisplayColorSpace } from "..";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "@composables/color/keys";

const { modelValue, cssColor, inline = false } = defineProps<{
    modelValue: string;
    cssColor: string;
    /** The ONE sanctioned host axis (T.W4-1 · S-21 restated): `inline` hosts
     *  (the About sentence) ink `1em` and ride the sentence's rung + shrink;
     *  the default is the picker plate's explicit display-3 rung (Q11a). */
    inline?: boolean;
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;

// The color-model injection (the S-1 parity half): since S.W2's transposition
// App provides the ONE pipeline app-wide (COLOR_MODEL_KEY, App.vue), so BOTH
// hosts — the picker and About — resolve the same instance ambiently and the
// specimen rows carry the live per-space conversion identically. The default
// stays null-tolerant: a future host outside any provider renders the catalog
// without the conversion line rather than crashing.
const colorModel = inject(COLOR_MODEL_KEY, null);

const openModel = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const spaceEntries = Object.entries(DISPLAY_COLOR_SPACE_NAMES);

// The specimen line: the LIVE color read through each catalog space —
// computed only while the dropdown renders (SelectContent unmounts closed).
function specimenFor(space: DisplayColorSpace): string {
    if (!colorModel) return "";
    try {
        if (space === "hex") return colorToHexString(colorModel.model.value.color);
        const converted = colorUnit2(
            colorModel.model.value.color,
            resolveColorSpace(space),
            true,
            false,
            false,
        );
        return normalizeColorUnit(converted, true, false).value.toFormattedString(2);
    } catch {
        return "—";
    }
}
</script>

<style scoped>
/* W4-1 — the full affordance grammar, bound.
 *
 * REST: the title ink sits just shy of full strength (86% alpha of the
 * safeAccent) so hover has somewhere to deepen TO; the caret is the only
 * affordance — no background, border, radius, padding rhythm, or shadow.
 *
 * HOVER (hover-capable pointers only): the editorial link grammar — the ink
 * deepens to full strength and a 1px underline in the same ink enters at 3px
 * offset, AS INK (text-decoration-color fade), never as surface. The
 * letterforms never move; the decoration box is present from rest
 * (transparent), so zero layout shift. A hover that paints a background/veil
 * is a named regression of W4-1 itself.
 *
 * OPEN: the title HOLDS the hover ink (data-state="open"); the caret's 180°
 * rotation is producer-owned (glass-ui SelectTrigger chevron — spring clock,
 * PRM re-aliased). All glass belongs to the SelectContent.
 *
 * Reduced motion: the global PRM guard (animations.css) neutralises these
 * transition durations; states still land instantly as ink.
 */
.space-trigger {
    color: color-mix(in srgb, var(--space-title-ink) 86%, transparent);
    transition: color var(--duration-fast) var(--ease-standard);
    /* T.W4-1 — the ×φ landing (Q11a: the glass-ui ladder is the sizing
     * AUTHORITY; two token steps = one full golden rung). The producer
     * trigger's size grammar tops out at audacious→display-1, so the plate
     * rung lands HERE as the exact shipped token — never a minted value —
     * on the trigger's own class list (unlayered scoped beats the layered
     * `text-dropdown` utility the producer size rung feeds). BOOKED SWAP:
     * retires onto the P10 SelectTrigger size station the day it ships. */
    font-size: var(--type-display-3);
    /* The non-bold edict, host-independent BY CONSTRUCTION (the F2 kill:
     * About's h3 700 can no longer reach the trigger through inheritance).
     * Rides the :root pin — the P10 weight-tokenization booked swap. */
    font-weight: var(--type-weight-display);
    /* Em-relative caret gutter (was gap-2 = 0.19em at the display-1 basis —
     * the same optical ratio carried up the rung). */
    gap: 0.19em;
    /* The excision, enforced (seed rider 2): the producer's control padding
     * (`px-3 py-2`) must NOT survive — the title sits flush with the plate's
     * typography grid. This SCOPED block outranks the utility list (unlayered
     * beats @layer utilities); glass-ui's slim `cn` does not resolve a p-0
     * against the producer's px-3. The bottom is descender room for the
     * italic face, not a padding rhythm — em-relative so it scales with the
     * rung (0.095em ≈ the 0.25rem it carried at the display-1 basis). */
    padding: 0 0 0.095em;
    margin: 0;
}

/* The inline host (About): the trigger rides its SENTENCE — size 1em means
 * the member inherits the h3's rung AND its compositor shrink with zero
 * per-host keyframe wiring (t-title-typography F3's desync cure). */
.space-trigger--inline {
    font-size: 1em;
}

/* Em-relative caret (T.W4-1): the producer chevron ships h-4/w-4 fixed px —
 * at the ×φ title that reads as a shrunken foreign glyph. 0.382em (φ⁻²) is
 * today's exact optical ratio (1rem at the 41.89px display-1 cap), carried
 * as a ratio so both hosts and every band keep the same caret weight. */
.space-trigger :deep(svg) {
    width: 0.382em;
    height: 0.382em;
}

/* text-decoration does not propagate into flex items — the underline lives
 * on the cloned SelectValue label span itself. Thickness/offset are
 * EM-RELATIVE (T.W4-1): the 1px/3px pair read hairline at the ×φ landing —
 * 0.024em/0.072em are the same pair expressed as the display-1-basis ratio,
 * so the editorial link grammar holds its weight at every rung. */
.space-trigger > :deep(span) {
    text-decoration-line: underline;
    text-decoration-thickness: 0.024em;
    text-underline-offset: 0.072em;
    text-decoration-color: transparent;
    transition: text-decoration-color var(--duration-fast) var(--ease-standard);
}

@media (hover: hover) {
    .space-trigger:hover {
        color: var(--space-title-ink);
    }
    .space-trigger:hover > :deep(span) {
        text-decoration-color: currentColor;
    }
}

.space-trigger[data-state="open"] {
    color: var(--space-title-ink);
}
.space-trigger[data-state="open"] > :deep(span) {
    text-decoration-color: currentColor;
}

/* C5 — the accent-aware house focus register on the trigger (the ghost
 * variant strips the control chrome; the ring must stay visible) — UNCHANGED
 * per W4-1: ring, never pill. */
.space-trigger:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-md);
}

.specimen-dot {
    width: 0.875rem;
    height: 0.875rem;
    display: inline-block;
}
.specimen-dot-idle {
    opacity: 0.35;
}
</style>
