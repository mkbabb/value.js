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
    <!-- c60s (FIFTY-THIRD N): the label is the space's lede, its four facts
         and its channels. The "Key properties" yes/no rows, the application
         and industry lists and the "Conversion graph" are gone: the graph drew
         roads the library never takes, and the roads now come from the
         library itself, in "Step by step" below the label. -->
    <div class="nutrition-label w-full relative" :data-space-facts="space">
        <p class="nl-lede nl-read" data-fact="definition">
            <bdi>{{ currentColorSpaceInfo.definition }}</bdi>
        </p>

        <!-- X-DS VR3-03 / VC4-04: key in the muted plate ink, value weighted,
             both upright in the body voice. -->
        <dl class="nl-facts nl-read" style="--nl-key: 5.26em">
            <dt class="plate-ink">White point</dt>
            <dd class="font-medium" data-fact="white-point"><bdi>{{ currentColorSpaceInfo.whitePoint }}</bdi></dd>
            <dt class="plate-ink">Gamut</dt>
            <dd class="font-medium" data-fact="gamut"><bdi>{{ currentColorSpaceInfo.gamut }}</bdi></dd>
            <dt class="plate-ink">Created</dt>
            <dd class="font-medium" data-fact="created"><bdi>{{ currentColorSpaceInfo.created }}</bdi></dd>
            <dt class="plate-ink">In CSS</dt>
            <dd class="font-medium" data-fact="css"><bdi>{{ currentColorSpaceInfo.css }}</bdi></dd>
        </dl>

        <section>
            <h2 class="nl-head font-display text-subheading">Channels</h2>
            <!-- One column per channel of THIS space (`--channel-count`), never
                 an unconditional three. -->
            <dl
                class="nl-components nl-read"
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
    </div>
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import { useMounted } from "@vueuse/core";
import { SAFE_ACCENT_KEY } from "../../color-session/keys";
import type { DisplayColorSpace } from "../../color-session/color-model";
import { SPACE_CATALOG } from "../../color-session/space-catalog";

// BC-CNL-16: the label reads ONE fact — the space — as a prop. A two-way
// binding of the whole model fanned every colour tick out to this subtree.
const { space } = defineProps<{ space: DisplayColorSpace }>();

// D6 (T.W3-5 / A11Y-F3): the fg/bg DOUBLE-DUTY split. The former single
// `nodeHighlightColor` served two incompatible roles with one guard call — a
// foreground-certified value reused as a BACKGROUND fill, leaving the fixed
// `--foreground` ink uncertified on top (measured 1.57:1 at the owner's own
// color, light mode). The roles split:
//
//   TEXT role — the channel-name letters sit on the About plate (the RESTING
//   rung), so their live-color ink certifies against THAT tier's composited
//   lightness, never a page-level constant.
//
//   It is the app's one resting-plate accent (`--accent-live`): the same
//   question on the frame clock, asked once. Asking it again here on the
//   synchronous colour repeated the referent bisection on every colour event
//   of a drag (o1110 D2).
const componentInk = inject(SAFE_ACCENT_KEY)!;
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
            // Degrees read as degrees ("0° to 360°"), the way the guides write hue.
            const unit = meta.unit === "deg" ? "°" : meta.unit === "K" ? " K" : meta.unit;
            return [
                meta.key,
                {
                    min: `${meta.min * scale}${unit}`,
                    max: `${meta.max * scale}${unit}`,
                },
            ];
        }),
    ),
);


</script>

<style scoped>
/* The FORTY-SECOND order, A ("most apps have text that's too small"): the
 * definition and the facts are read, so they stand at least at the guide's
 * own body face (16 px; the small rung was 14 px at 390), and never below the
 * small rung where that is larger (a wide desk). */
.nl-read {
    font-family: var(--font-text);
    font-size: max(1rem, var(--type-small));
    line-height: var(--type-leading-small);
}
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
/* The lede is the page's first sentence: read at the body face, one step
 * up from the facts, in the plate's own ink. */
.nl-lede {
    max-inline-size: 66ch;
    margin: 0;
    font-size: max(1.0625rem, var(--type-body));
}
/* BC-CNL-24: the label column hugs its labels. The FORTIETH A-4: it hugs
 * them at a FIXED measure, the widest label's advance in the body face (Plus
 * Jakarta Sans, weight 400; c60s: "White point", 5.252 em, measured at
 * 1800), set on the group as `--nl-key`. Sized by its content, the column
 * widened from 156 to 177 px at 1440 when the face arrived and moved every
 * value 6 px; an em measure follows the size, not the face. */
.nl-facts {
    display: grid;
    grid-template-columns: var(--nl-key, max-content) minmax(0, 1fr);
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
</style>
