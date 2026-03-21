<template>
    <div class="flex flex-col relative min-w-0 w-full max-w-lg lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-auto lg:h-full max-h-full lg:max-h-[var(--content-shell-h)]">
        <Card class="flex flex-col rounded-2xl min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-hidden bg-card/75 backdrop-blur-sm">
            <CardHeader class="fraunces m-0 pt-3 pb-0 relative w-full px-3 sm:px-6 min-w-0">
                <h2 class="text-lg font-semibold">Atmosphere</h2>
                <p class="fira-code text-xs text-muted-foreground">Background canvas tuning.</p>
            </CardHeader>

            <CardContent class="flex flex-col w-full px-3 sm:px-6 pt-2 pb-0 min-w-0 lg:flex-1 lg:min-h-0 overflow-y-auto">
                <template v-for="(section, si) in sections" :key="section.title">
                    <Separator v-if="si > 0" class="my-1" />
                    <div class="flex flex-col gap-1.5 py-2">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="fraunces text-sm font-semibold text-foreground">{{ section.title }}</h3>
                                <p class="fira-code text-[10px] text-muted-foreground leading-tight">{{ section.desc }}</p>
                            </div>
                            <button
                                class="p-1 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-accent transition-colors"
                                title="Reset section"
                                @click="resetSection(section.params)"
                            >
                                <RotateCcw class="w-3 h-3" />
                            </button>
                        </div>
                        <div v-for="p in section.params" :key="p.key" class="flex flex-col gap-0.5">
                            <div class="flex justify-between items-baseline">
                                <div class="flex items-baseline gap-1.5">
                                    <span class="fira-code text-xs text-foreground/80">{{ p.label }}</span>
                                    <span class="fira-code text-[10px] text-muted-foreground/50 hidden sm:inline">&mdash; {{ p.desc }}</span>
                                </div>
                                <span class="fira-code text-xs tabular-nums text-foreground/60">{{ fmt(p) }}</span>
                            </div>
                            <input
                                type="range"
                                :min="p.min"
                                :max="p.max"
                                :step="p.step"
                                :value="(cfg as any)[p.key]"
                                class="w-full h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
                                @input="set(p.key, $event)"
                            />
                        </div>
                    </div>
                </template>
            </CardContent>

            <!-- Fixed footer -->
            <div class="flex justify-center gap-2 px-3 sm:px-6 py-3 border-t border-border/50">
                <Button
                    variant="outline"
                    size="sm"
                    class="rounded-full fira-code text-xs gap-1.5 cursor-pointer"
                    @click="resetAll"
                >
                    <RotateCcw class="w-3 h-3" />
                    Reset all
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    class="rounded-full fira-code text-xs gap-1.5 cursor-pointer"
                    :class="copyState === 'ok' ? 'border-green-500/50 text-green-600 dark:text-green-400' : copyState === 'err' ? 'border-destructive/50 text-destructive' : ''"
                    @click="copyJson"
                >
                    <Check v-if="copyState === 'ok'" class="w-3 h-3" />
                    <XIcon v-else-if="copyState === 'err'" class="w-3 h-3" />
                    <Copy v-else class="w-3 h-3" />
                    {{ copyState === 'ok' ? 'Copied' : copyState === 'err' ? 'Failed' : 'Copy JSON' }}
                </Button>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Button } from "@components/ui/button";
import { RotateCcw, Copy, Check, X as XIcon } from "lucide-vue-next";
import {
    DEFAULT_ATMOSPHERE_CONFIG,
    type AtmosphereConfig,
} from "@composables/useAtmosphereCanvas";

defineProps<{ cssColorOpaque: string }>();

const cfg = inject<AtmosphereConfig>("atmosphereConfig")!;
const copyState = ref<"idle" | "ok" | "err">("idle");

// ── Param schema ──

interface P {
    key: keyof AtmosphereConfig;
    label: string;
    desc: string;
    min: number;
    max: number;
    step: number;
}

interface Section {
    title: string;
    desc: string;
    params: P[];
}

const sections: Section[] = [
    {
        title: "Surface",
        desc: "The base layer beneath the blobs.",
        params: [
            { key: "bgAlpha", label: "Opacity", desc: "How opaque the base fill is", min: 0, max: 1, step: 0.05 },
            { key: "blur", label: "Blur", desc: "Gaussian blur on every blob", min: 0, max: 100, step: 1 },
            { key: "speed", label: "Speed", desc: "Animation tempo multiplier", min: 0, max: 2, step: 0.05 },
        ],
    },
    {
        title: "Geometry",
        desc: "Size, count, and orbit paths.",
        params: [
            { key: "blobCount", label: "Count", desc: "Total number of blobs", min: 1, max: 20, step: 1 },
            { key: "blobBaseRadius", label: "Base radius", desc: "Starting size as % of viewport", min: 0.02, max: 0.5, step: 0.01 },
            { key: "blobRadiusStep", label: "Radius step", desc: "Each subsequent blob grows by", min: 0, max: 0.1, step: 0.005 },
            { key: "smallRadiusScale", label: "Small scale", desc: "Size ratio for the small blobs", min: 0.1, max: 1, step: 0.05 },
            { key: "orbitX", label: "Orbit X", desc: "Horizontal drift amplitude", min: 0, max: 0.5, step: 0.01 },
            { key: "orbitY", label: "Orbit Y", desc: "Vertical drift amplitude", min: 0, max: 0.5, step: 0.01 },
        ],
    },
    {
        title: "Color",
        desc: "OKLCH lightness and hue offsets.",
        params: [
            { key: "peakAlphaLarge", label: "Alpha (large)", desc: "Opacity at blob center", min: 0, max: 1, step: 0.05 },
            { key: "peakAlphaSmall", label: "Alpha (small)", desc: "Opacity of smaller blobs", min: 0, max: 1, step: 0.05 },
            { key: "lShiftLarge", label: "L shift (large)", desc: "Lightness variation for big blobs", min: 0, max: 0.5, step: 0.01 },
            { key: "lShiftSmall", label: "L shift (small)", desc: "Lightness variation for small", min: 0, max: 0.5, step: 0.01 },
            { key: "hueShiftLarge", label: "Hue (large)", desc: "Degrees of hue rotation", min: 0, max: 180, step: 1 },
            { key: "hueShiftSmall", label: "Hue (small)", desc: "More rotation for small blobs", min: 0, max: 180, step: 1 },
        ],
    },
    {
        title: "Falloff",
        desc: "Radial gradient shape per blob.",
        params: [
            { key: "gradStop2", label: "Mid", desc: "Where gradient hits 60% fade", min: 0.05, max: 0.8, step: 0.01 },
            { key: "gradStop3", label: "Fade", desc: "Where gradient hits 20% fade", min: 0.1, max: 0.95, step: 0.01 },
            { key: "gradStop4", label: "End", desc: "Radius at full transparency", min: 0.2, max: 1, step: 0.01 },
        ],
    },
];

const allParams = sections.flatMap((s) => s.params);

// ── Helpers ──

function fmt(p: P): string {
    const v = (cfg as any)[p.key] as number;
    return p.step >= 1 ? String(v) : v.toFixed(2);
}

function set(key: keyof AtmosphereConfig, e: Event) {
    (cfg as any)[key] = parseFloat((e.target as HTMLInputElement).value);
}

function resetSection(params: P[]) {
    for (const p of params) {
        (cfg as any)[p.key] = DEFAULT_ATMOSPHERE_CONFIG[p.key];
    }
}

function resetAll() {
    Object.assign(cfg, DEFAULT_ATMOSPHERE_CONFIG);
}

async function copyJson() {
    try {
        const snapshot: Record<string, number> = {};
        for (const p of allParams) snapshot[p.key] = (cfg as any)[p.key];
        const text = JSON.stringify(snapshot, null, 2);
        // Fallback for non-secure contexts (localhost over HTTP)
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;left:-9999px";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        copyState.value = "ok";
    } catch {
        copyState.value = "err";
    }
    setTimeout(() => { copyState.value = "idle"; }, 2000);
}
</script>

<style scoped>
@reference "../../../styles/style.css";
</style>
