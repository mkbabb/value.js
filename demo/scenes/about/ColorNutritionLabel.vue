<template>
    <!-- Body voice by default (three-voice law, R.W3 Lane A / A1): the atlas-plate
         DATA reads in Jakarta; only the section headings below are display rungs. -->
    <!-- `data-space-facts` names the space these facts BELONG to, and each value
         cell names the fact it carries (the file's existing `data-o18` hook
         idiom). X-W6.f's o21 oracle reads the rendered values through them, so
         "About states true facts" is measured against what the user sees rather
         than against the table the component was handed. -->
    <!-- X realization V-D4 (BC-CNL-9/24/8/11/25): the label is a nutrition
         label in RHYTHM, not in rules — the five Separators are gone; sections
         are spaced by `--phi-3` and a heading sits `--phi-1` above its body.
         The key/value groups are `<dl>` grids whose label column hugs the
         labels (`max-content 1fr`), so the 1800 px card no longer opens a
         ~500 px gutter between a key and its value. Values are bidi-isolated;
         icons beside text are decorative. -->
    <div class="nutrition-label w-full relative" :data-space-facts="space">
        <section>
            <h2 class="nl-head font-display text-subheading">Definition</h2>
            <p class="nl-prose text-small" data-fact="definition">
                <bdi>{{ currentColorSpaceInfo.definition }}</bdi>
            </p>
        </section>

        <section>
            <h2 class="nl-head font-display text-subheading">Basic information</h2>
            <!-- X-DS VR3-03 / VC4-04: key in the muted plate ink, value weighted,
                 both upright in the body voice. -->
            <dl class="nl-facts text-small">
                <dt class="plate-ink">Device dependency:</dt>
                <dd class="font-medium" data-fact="device-dependency">
                    <bdi>{{ currentColorSpaceInfo.deviceDependency }}</bdi>
                </dd>
                <dt class="plate-ink">White point:</dt>
                <dd class="font-medium" data-fact="white-point"><bdi>{{ currentColorSpaceInfo.whitePoint }}</bdi></dd>
                <dt class="plate-ink">Gamut:</dt>
                <dd class="font-medium" data-fact="gamut"><bdi>{{ currentColorSpaceInfo.gamut }}</bdi></dd>
                <dt class="plate-ink">Created:</dt>
                <dd class="font-medium" data-fact="created"><bdi>{{ currentColorSpaceInfo.created }}</bdi></dd>
            </dl>
        </section>

        <section>
            <h2 class="nl-head font-display text-subheading">Components</h2>
            <!-- One column per channel of THIS space (`--channel-count`), never
                 an unconditional three. -->
            <dl
                class="nl-components text-small"
                :style="{ '--channel-count': String(Object.keys(formattedRange).length) }"
            >
                <div
                    v-for="([rangeKey, range], index) in Object.entries(formattedRange)"
                    :key="index"
                    class="nl-component"
                >
                    <dt
                        :style="mounted ? { color: componentInk } : undefined"
                        data-o18="component-name"
                    >
                        <bdi>{{ currentColorSpaceInfo.components[index] ?? rangeKey }}</bdi>
                    </dt>
                    <dd class="font-medium">
                        <bdi>{{ range.min }}</bdi>
                        <span class="font-normal plate-ink"> to </span>
                        <bdi>{{ range.max }}</bdi>
                    </dd>
                </div>
            </dl>
        </section>

        <section>
            <h2 class="nl-head font-display text-subheading">Key properties</h2>
            <dl class="nl-facts text-small">
                <dt class="plate-ink">Perceptual uniformity:</dt>
                <dd class="font-medium"><bdi>{{ currentColorSpaceInfo.perceptualUniformity }}</bdi></dd>
                <dt class="plate-ink">Hue linearity:</dt>
                <dd class="font-medium"><bdi>{{ currentColorSpaceInfo.hueLinearity }}</bdi></dd>
                <dt class="plate-ink">Lightness separation:</dt>
                <dd class="font-medium"><bdi>{{ currentColorSpaceInfo.lightnessSeparation }}</bdi></dd>
            </dl>
        </section>

        <section>
            <h2 class="nl-head font-display text-subheading">Conversion graph</h2>
            <!-- X.W12.c · UIA-V-4: a path is something to READ, not a control.
                 BC-CNL-8: the hover highlight had no focus or touch twin and no
                 non-hover consumer, so it is gone with its handlers; every node
                 rests on the well in the plate's own ink. -->
            <ul class="flex flex-wrap gap-4" role="list">
                <li
                    v-for="(path, index) in currentColorSpaceInfo.conversions"
                    :key="index"
                    class="flex flex-wrap items-center p-3 bg-well rounded-panel max-w-full"
                >
                    <template v-for="(node, nodeIndex) in path" :key="nodeIndex">
                        <span class="px-2 py-1 rounded" data-o18="graph-node"><bdi>{{ node }}</bdi></span>
                        <ArrowRight
                            v-if="nodeIndex < path.length - 1"
                            class="mx-1 rtl:-scale-x-100"
                            aria-hidden="true"
                        />
                    </template>
                </li>
            </ul>
        </section>

        <section>
            <h2 class="nl-head font-display text-subheading">Usage</h2>
            <dl class="nl-facts text-small">
                <dt class="plate-ink">Common applications:</dt>
                <dd class="font-medium">
                    <ul class="nl-inline" role="list">
                        <li v-for="a in currentColorSpaceInfo.applications" :key="a"><bdi>{{ a }}</bdi></li>
                    </ul>
                </dd>
                <dt class="plate-ink">Industries:</dt>
                <dd class="font-medium">
                    <ul class="nl-inline" role="list">
                        <li v-for="i in currentColorSpaceInfo.industries" :key="i"><bdi>{{ i }}</bdi></li>
                    </ul>
                </dd>
            </dl>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import { useMounted } from "@vueuse/core";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import { useSafeAccentFn } from "../../color-session/useContrastSafeColor";
import { ArrowRight } from "@lucide/vue";
import type { DisplayColorSpace } from "../../color-session/color-model";
import { SPACE_CATALOG } from "../../color-session/space-catalog";

// BC-CNL-16: the label reads ONE fact — the space — as a prop. A two-way
// binding of the whole model fanned every colour tick out to this subtree.
const { space } = defineProps<{ space: DisplayColorSpace }>();

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
// X.W11.p4c (§0gl.12's law): the ink probes the live surface in the visitor's
// scheme, so it is written after mount; the hydrated first view reads the
// plate's certified ink, which is what the prerendered shell painted.
const mounted = useMounted();


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
const currentSpace = computed(() => SPACE_CATALOG[space]);
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


</script>

<style scoped>
/* V-D4 · BC-CNL-9: rhythm, not rules (DESIGN §3.1, the φ ladder). */
.nutrition-label {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-3);
}
.nl-head {
    margin-block-end: var(--phi-1);
    /* Size carries the heading; it is not bold (restraint, C-9). */
    font-weight: var(--type-weight-display);
}
.nl-prose {
    max-inline-size: 66ch;
}
/* BC-CNL-24: the label column hugs its labels. */
.nl-facts {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    column-gap: var(--phi-2);
    row-gap: var(--phi-0);
    margin: 0;
}
.nl-facts > dd,
.nl-components dd {
    margin: 0;
}
.nl-components {
    display: grid;
    grid-template-columns: repeat(var(--channel-count, 3), minmax(0, 1fr));
    gap: var(--phi-2);
    margin: 0;
}
/* BC-CNL-11: values are isolated runs inside the bidi algorithm. */
.nl-facts > *,
.nl-components > * {
    unicode-bidi: isolate;
}
.nl-inline {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.5ch;
    margin: 0;
    padding: 0;
    list-style: none;
}
.nl-inline > li:not(:last-child)::after {
    content: ",";
}
</style>
