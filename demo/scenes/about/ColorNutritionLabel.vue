<template>
    <!-- Body voice by default (three-voice law, R.W3 Lane A / A1): the atlas-plate
         DATA reads in Jakarta; only the section headings below are display rungs. -->
    <!-- `data-space-facts` names the space these facts BELONG to, and each value
         cell names the fact it carries (the file's existing `data-o18` hook
         idiom). X-W6.f's o21 oracle reads the rendered values through them, so
         "About states true facts" is measured against what the user sees rather
         than against the table the component was handed. -->
    <div
        class="w-full grid grid-cols-1 gap-4 relative"
        :data-space-facts="model.selectedColorSpace"
    >
        <!-- AB-3 (T.W8 remediation_1 · D1): the Definition chip seats on the ONE
             rung-2 well tone (`bg-well` = `--well-bg`), collapsing the `/50` `/30`
             muted-alpha sub-species onto the single well recipe. -->
        <Alert class="m-0 bg-well border-border/30 rounded-card">
            <AlertTitle>Definition</AlertTitle>
            <AlertDescription data-fact="definition">
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
                <div data-fact="device-dependency">
                    {{ currentColorSpaceInfo.deviceDependency }}
                </div>
                <div class="italic">White Point:</div>
                <div data-fact="white-point">{{ currentColorSpaceInfo.whitePoint }}</div>
                <div class="italic">Gamut:</div>
                <div data-fact="gamut">{{ currentColorSpaceInfo.gamut }}</div>
                <div class="italic">Created:</div>
                <div data-fact="created">{{ currentColorSpaceInfo.created }}</div>
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
                <!-- X.W12.c · UIA-V-4 — the chip is a path to READ, not a control.
                     Each chip sat in its own TooltipProvider/Tooltip whose
                     content was an empty `contents` box: hovering opened a
                     1×1 px role=tooltip that said nothing, and the chip wore
                     `cursor-pointer` with no action behind it. The empty
                     tooltip layer and the pointer cursor are gone; the hover
                     highlight (the chip's one real behaviour) stays. -->
                <!-- AB-3 (D1): the conversion-graph node seats on the
                     well recipe; the interactive hover follows the
                     app's established well-row idiom (bg-well →
                     hover:bg-accent/50, per VersionHistoryDrawer),
                     collapsing the /50 /30 /60 muted-alpha species. -->
                <div
                    v-for="(path, index) in currentColorSpaceInfo.conversions"
                    :key="index"
                    class="flex flex-wrap items-center p-3 bg-well rounded-panel hover:bg-accent/50 transition-colors max-w-full"
                    @mouseenter="hoveredPathIndex = index"
                    @mouseleave="hoveredPathIndex = null"
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
                                hoveredPathIndex === index
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
                    <span>{{ currentColorSpaceInfo.industries.join(", ") }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import { useSafeAccentFn } from "../../color-session/useContrastSafeColor";
import { contrastInkFor } from "../../color-session/ink";
import { Separator } from "../../ui/separator";
import { ArrowRight } from "@lucide/vue";
import { Alert, AlertTitle, AlertDescription } from "../../ui/alert";
import type { ColorModel } from "../../color-session/color-model";
import { SPACE_CATALOG } from "../../color-session/space-catalog";

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

/**
 * X-W6.f · X:CSS-1 (f2/f3) — THE MASKING FALLBACK IS GONE, AND UNSPELLABLE.
 *
 * This read used to resolve the display space down to its underlying space,
 * probe a PARTIAL facts table with an `in` guard, and fall back to the RGB row
 * when the probe missed. Five of the eighteen offered spaces missed, so
 * selecting "Display P3" rendered CIE RGB's card — "Created: 1931", components
 * Red/Green/Blue — under the Display P3 title. The product stated false colour
 * science on a first-class route, and the `in` guard is what made it look
 * deliberate.
 *
 * The catalog is TOTAL over `DisplayColorSpace`, so the lookup cannot miss:
 * there is nothing left for a fallback to catch. Note it reads the DISPLAY
 * space, not the resolved one — Hex has its own authored facts and no longer
 * borrows RGB's.
 */
const currentSpace = computed(() => SPACE_CATALOG[model.value.selectedColorSpace]);
const currentColorSpaceInfo = computed(() => currentSpace.value.info);

const formattedRange = computed<Record<string, { min: string; max: string }>>(() =>
    Object.fromEntries(
        currentSpace.value.channels.map((meta) => {
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

// X.W12.c · UIA-V-206 — the hover names ONE path. It used to hold the hovered
// path's node NAMES, and every chip lit each node whose name was in that list,
// so hovering `lab → xyz` also lit `xyz` in every other path. The index of the
// hovered chip lights that chip's nodes and no other.
const hoveredPathIndex = ref<number | null>(null);

</script>
