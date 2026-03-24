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
import { Copy } from "lucide-vue-next";
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
import type { HueInterpolationMethod } from "@src/units/color/utils";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

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
    const { copyToClipboard } = await import("@composables/useClipboard");
    await copyToClipboard(coalescedCSS.value);
}

defineExpose({ resetGradient, copyCSS, seedFromPalette });
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Hero: Gradient preview + stop editor -->
        <div
            class="h-20 sm:h-24 rounded-2xl border border-border bg-card overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            :style="{ background: coalescedCSS }"
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
        <h3 class="fraunces text-lg text-muted-foreground">Interpolation</h3>

        <div class="grid grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
                <span class="section-label">Type</span>
                <span class="section-subtitle">{{ activeTypeDesc }}</span>
                <Select :model-value="type" @update:model-value="(v: string) => type = v as GradientType">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="t in GRADIENT_TYPES" :key="t.value" :value="t.value">
                            {{ t.label }}
                            <template #description>
                                <span class="text-[10px] text-muted-foreground/60">{{ t.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Space</span>
                <span class="section-subtitle">{{ activeSpaceDesc }}</span>
                <Select :model-value="interpolationSpace" @update:model-value="(v: string) => interpolationSpace = v as ColorSpace">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="s in INTERPOLATION_SPACES" :key="s.value" :value="s.value">
                            {{ s.label }}
                            <template #description>
                                <span class="text-[10px] text-muted-foreground/60">{{ s.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Hue</span>
                <span class="section-subtitle">{{ activeHueDesc }}</span>
                <Select :model-value="hueMethod" @update:model-value="(v: string) => hueMethod = v as HueInterpolationMethod">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="m in HUE_INTERPOLATION_METHODS" :key="m.value" :value="m.value">
                            {{ m.label }}
                            <template #description>
                                <span class="text-[10px] text-muted-foreground/60">{{ m.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
                <span class="section-label">Direction</span>
                <span class="fira-code text-xs text-muted-foreground tabular-nums">{{ direction }}&deg;</span>
            </div>
            <Slider :model-value="[direction]" :min="0" :max="360" :step="1"
                @update:model-value="(v: number[]) => direction = v[0]!" />
        </div>

        <!-- ── Easing ── -->
        <template v-if="intervalPairs.length > 0">
            <hr class="border-border" />
            <h3 class="fraunces text-lg text-muted-foreground">Easing</h3>
            <div
                v-for="pair in intervalPairs"
                :key="pair.index"
                class="flex items-center gap-2"
            >
                <span class="fira-code text-xs text-muted-foreground/60 w-10 shrink-0">{{ pair.label }}</span>
                <EasingSelector
                    :model-value="pair.easingName"
                    @update:model-value="(v) => updateInterval(pair.index, v)"
                />
            </div>
        </template>

        <!-- ── CSS ── -->
        <hr class="border-border" />
        <div class="flex items-center justify-between">
            <h3 class="fraunces text-lg text-muted-foreground">CSS</h3>
            <button class="dock-icon-btn-compact" title="Copy CSS" @click="copyCSS">
                <Copy class="w-5 h-5" />
            </button>
        </div>
        <GradientCodeEditor
            :model-value="simpleCSS"
            :coalesced-c-s-s="coalescedCSS"
            @parse="onParseCSS"
        />
    </div>
</template>
