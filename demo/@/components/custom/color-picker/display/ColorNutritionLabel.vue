<template>
    <!-- Body voice by default (three-voice law, R.W3 Lane A / A1): the atlas-plate
         DATA reads in Jakarta; only the section headings below are display rungs. -->
    <div class="w-full grid grid-cols-1 gap-4 relative">
        <!-- AB-3 (T.W8 remediation_1 · D1): the Definition chip seats on the ONE
             rung-2 well tone (`bg-well` = `--well-bg`), collapsing the `/50` `/30`
             muted-alpha sub-species onto the single well recipe. -->
        <Alert class="m-0 bg-well border-border/30 rounded-card">
            <AlertTitle>Definition</AlertTitle>
            <AlertDescription>
                {{ currentColorSpaceInfo.definition }}
            </AlertDescription>
        </Alert>

        <Separator />

        <section>
            <h2 class="font-display text-subheading mb-2">
                Basic Information
            </h2>
            <!-- S.W4-8 (design-docs-about P2-7): the former "Type:" row died —
                 it restated the Definition alert above in shorthand ("Type:
                 Cylindrical representation of OKLab" one screen under
                 "Definition: A cylindrical representation of the OKLab color
                 space"). One sentence, said once. -->
            <div class="grid grid-cols-2 gap-2 text-small">
                <div class="italic">Device Dependency:</div>
                <div>
                    {{ currentColorSpaceInfo.deviceDependency }}
                </div>
                <div class="italic">White Point:</div>
                <div>{{ currentColorSpaceInfo.whitePoint }}</div>
                <div class="italic">Gamut:</div>
                <div>{{ currentColorSpaceInfo.gamut }}</div>
                <div class="italic">Created:</div>
                <div>{{ currentColorSpaceInfo.created }}</div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="font-display text-subheading mb-2">
                Components
            </h2>
            <div class="grid grid-cols-3 gap-4 text-small">
                <div
                    v-for="([rangeKey, range], index) in Object.entries(formattedRange)"
                    :key="index"
                    class="space-y-1"
                >
                    <div
                        :style="{ color: componentInk }"
                        class="text-body"
                        data-o18="component-name"
                    >
                        {{ currentColorSpaceInfo.components[index] ?? rangeKey }}
                    </div>
                    <div>
                        {{ range.min }}
                        <span class="italic">to</span>
                        {{ range.max }}
                    </div>
                </div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="font-display text-subheading mb-2">
                Key Properties
            </h2>
            <div class="grid grid-cols-2 gap-2 text-small">
                <div class="italic">Perceptual Uniformity:</div>
                <div>
                    {{ currentColorSpaceInfo.perceptualUniformity }}
                </div>
                <div class="italic">Hue Linearity:</div>
                <div>
                    {{ currentColorSpaceInfo.hueLinearity }}
                </div>
                <div class="italic">Lightness Separation:</div>
                <div>
                    {{ currentColorSpaceInfo.lightnessSeparation }}
                </div>
            </div>
        </section>

        <Separator />

        <section class="space-y-4">
            <h2 class="font-display text-subheading">
                Conversion Graph
            </h2>
            <div class="flex flex-wrap gap-4">
                <TooltipProvider
                    v-for="(path, index) in currentColorSpaceInfo.conversions"
                    :key="index"
                    :delay-duration="100"
                >
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <!-- AB-3 (D1): the conversion-graph node seats on the
                                 well recipe; the interactive hover follows the
                                 app's established well-row idiom (bg-well →
                                 hover:bg-accent/50, per VersionHistoryDrawer),
                                 collapsing the /50 /30 /60 muted-alpha species. -->
                            <div
                                class="flex flex-wrap items-center p-3 bg-well rounded-panel hover:bg-accent/50 transition-colors cursor-pointer max-w-full"
                                @mouseenter="setHoveredPath(path as any)"
                                @mouseleave="clearHoveredPath"
                            >
                                <template
                                    v-for="(space, spaceIndex) in path"
                                    :key="spaceIndex"
                                >
                                    <!-- F-3 split: the hovered node commits to the live
                                         fill AND the fill-derived ink together — never a
                                         colored fill under the fixed foreground. -->
                                    <div
                                        :style="
                                            hoveredPath.length && hoveredPath.includes(space as string)
                                                ? { backgroundColor: nodeFill, color: nodeInk }
                                                : undefined
                                        "
                                        :class="['px-2 py-1 rounded transition-colors']"
                                        data-o18="graph-node"
                                    >
                                        {{ space }}
                                    </div>
                                    <ArrowRight
                                        v-if="spaceIndex < path.length - 1"
                                        class="mx-1"
                                    />
                                </template>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent class="contents w-64 p-2 text-small">
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="font-display text-subheading mb-2">Usage</h2>
            <div class="space-y-2 text-small">
                <div>
                    <span class="italic">Common Applications: </span>
                    <span>{{
                        currentColorSpaceInfo.applications.join(", ")
                    }}</span>
                </div>
                <div>
                    <span class="italic">Industries: </span>
                    <span>{{
                        (currentColorSpaceInfo.industries as any).join(", ")
                    }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { CSS_COLOR_KEY } from "../../../../../color-session/keys";
import { useSafeAccentFn } from "../../../../../color-session/useContrastSafeColor";
import { contrastInkFor } from "../../../../../color-session/ink";
import { PICKER_CHANNELS } from "../../../../../color-session/picker-color";
import { Separator } from "../../../ui/separator";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "../../../ui/tooltip";
import { ArrowRight } from "@lucide/vue";
import { Alert, AlertTitle, AlertDescription } from "../../../ui/alert";
import type { ColorModel } from "../../../../../color-session/color-model";
import { resolveColorSpace } from "../../../../../color-session/color-model";
import { colorSpaceInfo } from "../../../../../color-session/colorSpaceInfo";

const model = defineModel<ColorModel>({ required: true });

const cssColorOpaque = inject(CSS_COLOR_KEY)!;

// D6 (T.W3-5 / A11Y-F3): the fg/bg DOUBLE-DUTY split. The former single
// `nodeHighlightColor` served two incompatible roles with one guard call — a
// foreground-certified value reused as a BACKGROUND fill, leaving the fixed
// `--foreground` ink uncertified on top (measured 1.57:1 at the owner's own
// color, light mode). The roles split:
//
//   TEXT role — the channel-name letters sit on the About plate (the RESTING
//   rung), so their live-color ink certifies against THAT tier's composited
//   lightness, never a page-level constant.
const { safeCss } = useSafeAccentFn("resting");
const componentInk = computed(() => safeCss(cssColorOpaque.value));

//   FILL role — the hovered graph node paints the LIVE COLOR as data (C3:
//   color-data surface), and its ink derives from the FILL's own luminance —
//   the `resolveSealInk` exemplar generalized (`contrastInkFor`): a pass by
//   construction, the second, dependent guard the F-3 chain demands. On parse
//   failure the caller keeps the resting ink (empty string → inherit).
const nodeFill = cssColorOpaque;
const nodeInk = computed(() => contrastInkFor(nodeFill.value) ?? "");

const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;
});

const formattedRange = computed<Record<string, { min: string; max: string }>>(() =>
    Object.fromEntries(
        PICKER_CHANNELS[resolveColorSpace(model.value.selectedColorSpace)].map((meta) => {
            const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
            return [
                meta.key,
                {
                    min: `${meta.min * scale}${meta.unit}`,
                    max: `${meta.max * scale}${meta.unit}`,
                },
            ];
        }),
    ),
);

const hoveredPath = ref<string[]>([]);

const setHoveredPath = (path: string[]) => {
    hoveredPath.value = path;
};

const clearHoveredPath = () => {
    hoveredPath.value = [];
};

</script>
