<template>
    <!-- R.W3 Lane D / D1 — the readout rhythm (treatment TYPOGRAPHY-1) under
         the card-lock law (demo/DESIGN.md §Type, A6/U31): the numbers are the
         picker's TYPOGRAPHIC hero on the display ramp — Fraunces with declared
         tabular figures — and a slider drag from min to max changes NO
         containing card rect: every cell reserves its worst-case `ch` width
         from the static readoutReservation table, cells are atomic (nowrap),
         and the block locks two lines of height. -->
    <CardTitle
        class="readout flex h-fit w-full m-0 p-0 gap-x-3 flex-wrap items-baseline font-display focus-visible:outline-none"
    >
        <template
            v-for="([component], ix) in colorComponents"
            :key="component"
        >
            <span
                class="readout-cell"
                :style="{ minWidth: `${readoutCh(space, component)}ch` }"
            >
                <span
                    contenteditable="true"
                    role="textbox"
                    :aria-label="`${component} component value`"
                    :class="[
                        'readout-fig',
                        formatted[component]?.monospace && 'fira-code',
                    ]"
                    @input="
                        (e) => {
                            const text = (e.target as any).innerText.trim();
                            emit('input', text, component);
                        }
                    "
                ><span class="fig-int">{{ figParts(component).int }}</span><span
                        v-if="figParts(component).frac"
                        class="fig-frac"
                    >{{ figParts(component).frac }}</span></span><span
                    v-if="formatted[component]?.unit"
                    class="fig-unit"
                >{{ formatted[component].unit }}</span><span
                    v-if="ix !== colorComponents.length - 1"
                    class="fig-comma"
                    aria-hidden="true"
                >,</span>
            </span>
        </template>
    </CardTitle>
</template>

<script setup lang="ts">
import { CardTitle } from "@components/ui/card";
import { readoutCh } from "../readoutReservation";

export interface ComponentFormat {
    value: number | string;
    unit?: string;
    monospace?: boolean;
}

const { formatted } = defineProps<{
    colorComponents: [string, any][];
    formatted: Record<string, ComponentFormat>;
    /** The active display space — keys the `ch`-reservation table. */
    space: string;
}>();

const emit = defineEmits<{
    update: [value: number, component: string];
    input: [text: string, component: string];
}>();

/**
 * The int/frac split of a component's rendering. Numbers ink a FIXED
 * 1-decimal instrument format (never a stripped `.0` — a meter holds its
 * least count), so the demoted fraction is a constant rhythm, not a
 * flicker. Strings (hex) pass through whole.
 */
function figParts(component: string): { int: string; frac: string } {
    const fmt = formatted[component];
    if (!fmt) return { int: "", frac: "" };
    if (typeof fmt.value === "string") return { int: fmt.value, frac: "" };
    const s = fmt.value.toFixed(1).replace(/^-(0\.0)$/, "$1");
    const dot = s.indexOf(".");
    return { int: s.slice(0, dot), frac: s.slice(dot) };
}
</script>

<style scoped>
/* The hero-number register: the display ramp's φ^(5/2) rung, Fraunces voice,
 * DECLARED tabular figures (Fraunces is not tabular by default — card-lock
 * law mechanism 1), and the 2-line block lock so wrap count is a constant of
 * the space, never of the value. */
.readout {
    font-size: var(--type-display-2);
    line-height: 1.12;
    font-variant-numeric: tabular-nums lining-nums;
    min-height: calc(2 * 1.12em);
    font-weight: 400;
}

/* Atomic cell: sign flips, digit swaps, and decimals re-ink the same
 * reserved box (min-width bound inline from the static table). */
.readout-cell {
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
}

.readout-fig:focus-visible {
    /* C5 — the accent-aware house focus register on the editable cells. */
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-sm, 0.25rem);
}

/* TYPOGRAPHY-1 — the instrument's typographic rhythm: integer heavy,
 * fraction light + demoted, unit as a muted small-cap index. */
.fig-int {
    font-weight: 600;
}
.fig-frac {
    font-weight: 300;
    opacity: 0.55;
}
.fig-unit {
    font-variant: small-caps;
    letter-spacing: 0.04em;
    opacity: 0.5;
    font-size: 0.55em;
    font-style: italic;
    margin-left: 0.08em;
}
.fig-comma {
    opacity: 0.4;
    font-weight: 300;
}
</style>
