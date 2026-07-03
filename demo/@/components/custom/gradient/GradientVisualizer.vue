<script setup lang="ts">
import { computed, inject } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Copy } from "@lucide/vue";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import GradientStopEditor from "./GradientStopEditor.vue";
import EasingSelector from "./EasingSelector.vue";
import GradientCodeEditor from "./GradientCodeEditor.vue";
import {
    useGradientModel,
    INTERPOLATION_SPACES,
    HUE_INTERPOLATION_METHODS,
} from "./composables/useGradientModel";
import type { GradientType } from "./composables/useGradientModel";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/mix";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import type { AcceptableValue } from "reka-ui";

const pm = inject(PALETTE_MANAGER_KEY);

const {
    type,
    direction,
    stops,
    intervals,
    interpolationSpace,
    hueMethod,
    resolution,
    coalescedCSS,
    simpleCSS,
    addStop,
    removeStop,
    updateStop,
    updateInterval,
    setStopsFromColors,
    applyCSS,
} = useGradientModel();

const selectedStopId = defineModel<string | null>("selectedStopId", { default: null });

const GRADIENT_TYPES: { value: GradientType; label: string; description: string }[] = [
    { value: "linear", label: "Linear", description: "Left-to-right or angled" },
    { value: "radial", label: "Radial", description: "Center-outward circle" },
    { value: "conic", label: "Conic", description: "Angular sweep" },
];

function onAddStop(position: number) {
    addStop("oklch(0.7 0.1 180)", position);
}

function onStopPositionUpdate(id: string, position: number) {
    updateStop(id, { position });
}

function onParseCSS(css: string) {
    applyCSS(css);
}

function seedFromPalette() {
    if (!pm) return;
    const colors = pm.savedPalettes.value[0]?.colors.map((c) => c.css);
    if (colors && colors.length >= 2) {
        setStopsFromColors(colors);
    }
}

function resetGradient() {
    setStopsFromColors(["oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)"]);
    type.value = "linear";
    direction.value = 90;
    interpolationSpace.value = "oklch";
    hueMethod.value = "shorter";
    resolution.value = 32;
}

const intervalPairs = computed(() => {
    const pairs: { index: number; label: string; easingName: string }[] = [];
    for (let i = 0; i < intervals.value.length; i++) {
        const s0 = stops.value[i];
        const s1 = stops.value[i + 1];
        if (!s0 || !s1) continue;
        pairs.push({
            index: i,
            label: `${i + 1} → ${i + 2}`,
            easingName: intervals.value[i]!.easingName,
        });
    }
    return pairs;
});

const activeTypeDesc = computed(() =>
    GRADIENT_TYPES.find((t) => t.value === type.value)?.description ?? "",
);
const activeSpaceDesc = computed(() =>
    INTERPOLATION_SPACES.find((s) => s.value === interpolationSpace.value)?.description ?? "",
);
const activeHueDesc = computed(() =>
    HUE_INTERPOLATION_METHODS.find((m) => m.value === hueMethod.value)?.description ?? "",
);

async function copyCSS() {
    const { copyToClipboard } = await import("@mkbabb/glass-ui");
    await copyToClipboard(coalescedCSS.value);
}

defineExpose({ resetGradient, copyCSS, seedFromPalette });
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Hero: Gradient preview (decorative visual) + stop editor -->
        <!-- W5-a11y: preview swatch is decorative -->
        <div
            class="h-20 sm:h-24 rounded-card border border-border bg-card overflow-hidden shadow-card"
            :style="{ background: coalescedCSS }"
            aria-hidden="true"
            role="presentation"
        />

        <GradientStopEditor
            :stops="stops"
            :coalesced-c-s-s="coalescedCSS"
            v-model:selected-id="selectedStopId"
            @update:position="onStopPositionUpdate"
            @add="onAddStop"
            @remove="removeStop"
            @select="(id) => selectedStopId = id"
        />

        <!-- ── Interpolation ── -->
        <hr class="border-border" />
        <h3 class="font-display text-subheading text-muted-foreground">Interpolation</h3>

        <div class="grid grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
                <span class="section-label">Type</span>
                <span class="section-subtitle">{{ activeTypeDesc }}</span>
                <Select :model-value="type" @update:model-value="(v: AcceptableValue) => type = v as GradientType">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="t in GRADIENT_TYPES" :key="t.value" :value="t.value">
                            {{ t.label }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ t.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Space</span>
                <span class="section-subtitle">{{ activeSpaceDesc }}</span>
                <Select :model-value="interpolationSpace" @update:model-value="(v: AcceptableValue) => interpolationSpace = v as ColorSpace">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="s in INTERPOLATION_SPACES" :key="s.value" :value="s.value">
                            {{ s.label }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ s.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Hue</span>
                <span class="section-subtitle">{{ activeHueDesc }}</span>
                <Select :model-value="hueMethod" @update:model-value="(v: AcceptableValue) => hueMethod = v as HueInterpolationMethod">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="m in HUE_INTERPOLATION_METHODS" :key="m.value" :value="m.value">
                            {{ m.label }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ m.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
                <span class="section-label">Direction</span>
                <span class="text-mono-small text-muted-foreground tabular-nums">{{ direction }}&deg;</span>
            </div>
            <Slider aria-label="Gradient direction" :model-value="[direction]" :min="0" :max="360" :step="1"
                @update:model-value="(v: number[] | undefined) => { if (v?.[0] !== undefined) direction = v[0]; }" />
        </div>

        <!-- ── Easing ── -->
        <template v-if="intervalPairs.length > 0">
            <hr class="border-border" />
            <h3 class="font-display text-subheading text-muted-foreground">Easing</h3>
            <div
                v-for="pair in intervalPairs"
                :key="pair.index"
                class="flex items-center gap-2"
            >
                <span class="text-mono-small text-muted-foreground w-10 shrink-0">{{ pair.label }}</span>
                <EasingSelector
                    :model-value="pair.easingName"
                    @update:model-value="(v) => updateInterval(pair.index, v)"
                />
            </div>
        </template>

        <!-- ── CSS ── -->
        <hr class="border-border" />
        <div class="flex items-center justify-between">
            <h3 class="font-display text-subheading text-muted-foreground">CSS</h3>
            <DockIconButton compact title="Copy CSS" @click="copyCSS">
                <Copy class="w-5 h-5" />
            </DockIconButton>
        </div>
        <GradientCodeEditor
            :model-value="simpleCSS"
            :coalesced-c-s-s="coalescedCSS"
            @parse="onParseCSS"
        />
    </div>
</template>
