<template>
    <!-- R.W3 Lane C / C4 — the U13 veil capsule: the color-space section sits
         in a hairline veil capsule via the glass-ui veil tier (`veil-surface`
         + its own `--veil-border` knob) — no bespoke surface recipe. -->
    <div class="space-capsule veil-surface w-fit max-w-full min-w-0">
        <!-- C2 — the catalog-caption eyebrow (treatment TYPOGRAPHY-2): a Fira
             Code small-caps plate caption indexing the active space among the
             catalog, so the switch reads as a catalog entry. -->
        <span class="space-eyebrow fira-code" aria-hidden="true">
            color space — {{ pad(activeIndex + 1) }} / {{ pad(spaceEntries.length) }}
        </span>
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
            <!-- C2 — the audacious rung: the producer's font-rung prop scales
                 trigger + value off the ONE documented lever (glass-ui 4.2.0);
                 the local `text-title sm:text-display` pair is dead. The
                 fontFamily override below is OBSERVED here, retired at R.W4. -->
            <SelectTrigger
                aria-label="Select color space"
                variant="ghost"
                size="audacious"
                :style="{ color: safeAccent, fontFamily: 'var(--font-display)' }"
                class="space-trigger w-fit h-fit italic tracking-tight p-0 m-0 pb-1 select-none [&>span]:overflow-visible [&>span]:line-clamp-none [&>span]:block"
            >
                <SelectValue class="w-full" />
            </SelectTrigger>
            <!-- C3 — U8: the producer's SelectContent bounds itself on-page
                 (`--select-content-max-h` × popper available-height) and
                 scrolls within; rows are SPECIMEN entries — display-face name,
                 live per-space conversion, WatercolorDot swatch (N.W16 D1-3). -->
            <SelectContent align="start">
                <SelectGroup>
                    <SelectItem
                        v-for="([space, name], i) in spaceEntries"
                        :key="space"
                        :value="space"
                        hide-indicator
                        class="pl-3 pr-4 py-2"
                    >
                        <span class="flex items-center gap-2.5 min-w-0">
                            <WatercolorDot
                                tag="div"
                                :color="cssColor"
                                class="specimen-dot shrink-0"
                                :class="modelValue === space ? '' : 'specimen-dot-idle'"
                            />
                            <span
                                class="font-display italic text-title leading-tight truncate"
                                :class="modelValue === space ? 'font-semibold' : ''"
                            >{{ name }}</span>
                            <span class="fira-code text-mono-caption opacity-40 ml-auto pl-3">{{ pad(i + 1) }}</span>
                        </span>
                        <template #description>
                            <span class="fira-code text-mono-caption opacity-60 block truncate max-w-[16rem]">
                                {{ specimenFor(space as DisplayColorSpace) }}
                            </span>
                        </template>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
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
import { computed, inject } from "vue";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import {
    DISPLAY_COLOR_SPACE_NAMES,
    colorToHexString,
    resolveColorSpace,
} from "..";
import type { DisplayColorSpace } from "..";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "../keys";

const props = defineProps<{
    modelValue: string;
    cssColor: string;
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;
const { model } = inject(COLOR_MODEL_KEY)!;

const openModel = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const spaceEntries = Object.entries(DISPLAY_COLOR_SPACE_NAMES);

const activeIndex = computed(() =>
    Math.max(0, spaceEntries.findIndex(([space]) => space === props.modelValue)),
);

const pad = (n: number) => String(n).padStart(2, "0");

// The specimen line: the LIVE color read through each catalog space —
// computed only while the dropdown renders (SelectContent unmounts closed).
function specimenFor(space: DisplayColorSpace): string {
    try {
        if (space === "hex") return colorToHexString(model.value.color);
        const converted = colorUnit2(
            model.value.color,
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
/* The capsule owns only the veil tier's documented knobs — hairline border +
 * capsule radius — plus its own padding rhythm. Never a parallel recipe. */
.space-capsule {
    --veil-border: 1px solid var(--card-edge);
    border-radius: var(--radius-pill);
    padding: 0.5rem 1.25rem 0.375rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.space-eyebrow {
    font-variant: small-caps;
    letter-spacing: 0.08em;
    font-size: var(--type-mono-caption, 0.6875rem);
    line-height: 1.2;
    opacity: 0.55;
}

/* C5 — the accent-aware house focus register on the trigger (the ghost
 * variant strips the control chrome; the ring must stay visible). */
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
