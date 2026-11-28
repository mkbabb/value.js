<template>
    <!-- c60s (FIFTY-THIRD N): "more interactive". The colour mixed toward a
         partner in this space, against the same mix in a reference space,
         drawn by value.js (`sampleColorRamp`); the code block below prints
         the same call. Kelvin has no partner to mix with: it shows its own
         curve, even in mireds, with the colour's temperature marked. -->
    <section class="space-mix" data-mix :data-mix-space="space" :aria-labelledby="headId">
        <h2 :id="headId" class="about-head font-display text-subheading" :style="inkStyle">
            {{ space === "kelvin" ? "Along the curve" : "Mixing" }}
        </h2>

        <template v-if="space === 'kelvin'">
            <figure class="mix-figure">
                <div class="mix-strip mix-strip--locus" role="img" :aria-label="locusName">
                    <span v-for="(cell, i) in locus" :key="i" class="mix-cell" :style="{ backgroundColor: cell }" />
                    <span class="locus-mark" :style="{ insetInlineStart: `${locusAt * 100}%` }" aria-hidden="true" />
                </div>
                <figcaption class="mix-ends">
                    <span>1000 K</span>
                    <span class="mix-now">{{ kelvinNow }} K</span>
                    <span>20,000 K</span>
                </figcaption>
            </figure>
        </template>

        <template v-else>
            <div class="mix-controls">
                <ToggleGroup
                    type="single"
                    size="sm"
                    aria-label="Mix toward"
                    :model-value="partner"
                    @update:model-value="pickPartner"
                >
                    <ToggleGroupItem
                        v-for="p in PARTNERS"
                        :key="p.id"
                        :value="p.id"
                        :aria-label="`Mix toward ${p.name.toLowerCase()}`"
                    >
                        <span class="mix-dot" :style="{ backgroundColor: partnerCss(p.id) }" aria-hidden="true" />
                        {{ p.name }}
                    </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup
                    v-if="polar"
                    type="single"
                    size="sm"
                    aria-label="Hue path"
                    :model-value="hue"
                    @update:model-value="pickHue"
                >
                    <ToggleGroupItem
                        v-for="m in HUE_METHODS"
                        :key="m"
                        :value="m"
                        :aria-label="`Hue path: ${m}`"
                    >
                        {{ m[0]!.toUpperCase() + m.slice(1) }}
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <figure class="mix-figure">
                <div v-for="row in rows" :key="row.id" class="mix-row" :data-mix-row="row.id">
                    <span class="mix-label">{{ row.label }}</span>
                    <div class="mix-strip" role="img" :aria-label="`Mixed in ${row.label}: ${row.cells[0]} to ${row.cells[row.cells.length - 1]}`">
                        <span v-for="(cell, i) in row.cells" :key="i" class="mix-cell" :style="{ backgroundColor: cell }" />
                    </div>
                </div>
            </figure>
        </template>
    </section>
</template>

<script setup lang="ts">
import { computed, inject, useId } from "vue";
import { useMounted } from "@vueuse/core";
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group";
import { convertColor, kelvin, toHex, type AnyColor, type HueInterpolationMethod, type SpaceId } from "@mkbabb/value.js/color";
import { SAFE_ACCENT_KEY } from "../../color-session/keys";
import { resolveColorSpace, type DisplayColorSpace } from "../../color-session/color-model";
import { spaceLabel } from "../../color-session/space-catalog";
import { mixRamp, partnerFor, POLAR, type Partner } from "./space-code";

const { space, color, label } = defineProps<{
    space: DisplayColorSpace;
    color: AnyColor;
    label: string;
}>();
const partner = defineModel<Partner["id"]>("partner", { required: true });
const hue = defineModel<HueInterpolationMethod>("hue", { required: true });

const PARTNERS: readonly { id: Partner["id"]; name: string }[] = [
    { id: "white", name: "White" },
    { id: "black", name: "Black" },
    { id: "opposite", name: "Opposite" },
    { id: "blue", name: "Blue" },
];
const HUE_METHODS: readonly HueInterpolationMethod[] = ["shorter", "longer", "increasing", "decreasing"];
const CELLS = 29;

const headId = useId();
const polar = computed(() => POLAR.has(space));

/** A single-choice group may be emptied by re-pressing the held item; only a named choice is taken. */
function pickPartner(value: unknown) {
    if (typeof value === "string" && PARTNERS.some((p) => p.id === value)) partner.value = value as Partner["id"];
}
function pickHue(value: unknown) {
    if (typeof value === "string" && (HUE_METHODS as readonly string[]).includes(value)) hue.value = value as HueInterpolationMethod;
}

const hex = (c: AnyColor) => {
    const out = toHex(c, { gamut: "clip" });
    return out.ok ? out.value : "transparent";
};
const partnerCss = (id: Partner["id"]) => `rgb(${partnerFor(id, color).bytes.join(" ")})`;

/** Mixed in this space, against a reference: sRGB, or Oklab for the sRGB spaces themselves. */
const rows = computed(() => {
    const own: SpaceId = resolveColorSpace(space);
    const reference: SpaceId = own === "rgb" ? "oklab" : "rgb";
    const p = partnerFor(partner.value, color);
    const converted = convertColor(color, own);
    if (!converted.ok) return [];
    const from = { value: converted.value as AnyColor };
    return [
        { id: "own", label, cells: mixRamp(own, from.value, p, CELLS, hue.value).map(hex) },
        { id: "reference", label: spaceLabel(reference === "rgb" ? "rgb" : "oklab").replace("RGB", "sRGB"), cells: mixRamp(reference, from.value, p, CELLS, "shorter").map(hex) },
    ];
});

// ── Kelvin: the black-body curve, even in mireds (10⁶ / T). ──
const MIRED_HOT = 1e6 / 20000;
const MIRED_COLD = 1e6 / 1000;
const locus = computed(() =>
    Array.from({ length: 48 }, (_, i) => {
        const mired = MIRED_COLD - ((MIRED_COLD - MIRED_HOT) * i) / 47;
        const made = kelvin(Math.round(1e6 / mired));
        return made.ok ? hex(made.value) : "transparent";
    }),
);
const kelvinValue = computed(() => {
    const k = color.channels[0];
    return typeof k === "number" ? k : 6500;
});
const locusAt = computed(() => {
    const mired = 1e6 / Math.min(20000, Math.max(1000, kelvinValue.value));
    return (MIRED_COLD - mired) / (MIRED_COLD - MIRED_HOT);
});
const kelvinNow = computed(() => Math.round(kelvinValue.value).toLocaleString("en-US"));
const locusName = computed(() => `The black-body curve from 1000 K to 20,000 K, marked at ${kelvinNow.value} K`);

const accent = inject(SAFE_ACCENT_KEY, null);
const mounted = useMounted();
const inkStyle = computed(() => (mounted.value && accent ? { color: accent.value } : undefined));
</script>

<style scoped>
.space-mix {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-2);
}
.about-head {
    margin: 0;
    font-weight: var(--type-weight-display);
}
.mix-controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--phi-1) var(--phi-2);
}
.mix-controls :deep([role="group"]) {
    flex-wrap: wrap;
}
.mix-dot {
    display: inline-block;
    inline-size: 0.75em;
    block-size: 0.75em;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 22%, transparent);
}
.mix-figure {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-1);
    margin: 0;
}
.mix-row {
    display: grid;
    grid-template-columns: 6.5em minmax(0, 1fr);
    align-items: center;
    column-gap: var(--phi-1);
}
.mix-label {
    font-family: var(--font-text);
    font-size: max(0.875rem, var(--type-small));
    color: var(--ink-muted, var(--muted-foreground));
}
/* The strip is the data: one cell per sample, no gaps, a rounded plate. */
.mix-strip {
    position: relative;
    display: flex;
    block-size: 2.75rem;
    border-radius: var(--radius-panel, 0.75rem);
    overflow: hidden;
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent);
}
.mix-cell {
    flex: 1 1 0;
    transition: background-color var(--duration-normal, 200ms) var(--ease-standard, ease);
}
/* Under a drag the cells follow the finger 1:1 (o1105-r2: a transition
   restarted on every colour frame restyles every cell every frame). */
:root[data-colour-live] .mix-cell {
    transition: none;
}
.mix-strip--locus {
    overflow: visible;
}
.mix-strip--locus .mix-cell:first-child {
    border-start-start-radius: inherit;
    border-end-start-radius: inherit;
}
.mix-strip--locus .mix-cell:nth-last-child(2) {
    border-start-end-radius: inherit;
    border-end-end-radius: inherit;
}
.locus-mark {
    position: absolute;
    inset-block: -0.25rem;
    inline-size: 0.375rem;
    margin-inline-start: -0.1875rem;
    border-radius: 0.25rem;
    background: var(--foreground);
    box-shadow: 0 0 0 2px var(--card, var(--background));
    transition: inset-inline-start var(--duration-normal, 200ms) var(--ease-standard, ease);
}
:root[data-colour-live] .locus-mark {
    transition: none;
}
.mix-ends {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: max(0.875rem, var(--type-small));
    font-variant-numeric: tabular-nums;
    color: var(--ink-muted, var(--muted-foreground));
}
.mix-now {
    color: var(--foreground);
}
</style>
