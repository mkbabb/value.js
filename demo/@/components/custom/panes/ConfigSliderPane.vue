<script setup lang="ts">
// ConfigSliderPane — generic slider-pane component parameterised by
// { config, sections, defaults, title, description, extraControls? }.
// Merges the near-identical AuroraPane.vue and BlobPane.vue (Ae-6).
//
// HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow
// + useConfiguratorState. This component uses ConfiguratorRow for each labeled
// row so the demo composes the existing glass-ui surface rather than rebuilding
// the row primitive. The section-group wrapper and the floating copy/reset dock
// remain demo-local (they are thin structural shells, not the row primitive).
//
// AuroraPane is a W0 "under rework" stub — it delegates directly to this
// component with empty sections, keeping its informational message.
// BlobPane continues to pass its full SECTIONS array.

import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Slider } from "@components/ui/slider";
import { Copy, RotateCcw } from "lucide-vue-next";
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { ConfiguratorRow } from "@mkbabb/glass-ui/configurator";
import PaneHeader from "./PaneHeader.vue";
import { copyToClipboard } from "@mkbabb/glass-ui";

/** A single slider definition inside a section. */
export interface SliderDef {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
}

/** A named group of sliders. */
export interface SliderSection {
    title: string;
    defs: SliderDef[];
}

const props = defineProps<{
    /** The reactive config object (provided via inject in the consuming pane). */
    config: Record<string, unknown>;
    /** Slider sections to render. Pass empty array to show empty state. */
    sections: SliderSection[];
    /** Default values used by resetDefaults. */
    defaults: Record<string, unknown>;
    /** Pane title shown in PaneHeader. */
    title: string;
    /** Pane description shown in PaneHeader. */
    description?: string;
}>();

function update(key: string, value: number) {
    props.config[key] = value;
}

function fmt(v: number): string {
    return Number.isInteger(v) ? String(v) : v.toFixed(3);
}

async function copyAsJson() {
    const snapshot: Record<string, unknown> = {};
    for (const k of Object.keys(props.defaults)) {
        snapshot[k] = props.config[k];
    }
    await copyToClipboard(JSON.stringify(snapshot, null, 2));
}

function resetDefaults() {
    Object.assign(props.config, props.defaults);
}
</script>

<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card
            tier="wash"
            :shadow="false"
            :grain="false"
            class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative"
        >
            <PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>

            <!-- Default slot for extra controls (e.g. AuroraPane select rows) -->
            <slot />

            <div
                v-if="sections.length > 0"
                class="flex flex-col gap-5 px-4 sm:px-6 pt-2 pb-20"
            >
                <div
                    v-for="section in sections"
                    :key="section.title"
                    class="flex flex-col gap-2.5"
                >
                    <div class="config-section-header">
                        <span class="config-section-title">{{ section.title }}</span>
                    </div>

                    <ConfiguratorRow
                        v-for="def in section.defs"
                        :key="def.key"
                        :label="def.label"
                        class="gap-0.5 py-0"
                    >
                        <template #default>
                            <div class="w-full flex flex-col gap-0.5">
                                <div class="flex items-center justify-between">
                                    <span class="section-label normal-case tracking-normal">{{ def.label }}</span>
                                    <span class="section-label normal-case tracking-normal tabular-nums">
                                        {{ fmt(config[def.key] as number) }}
                                    </span>
                                </div>
                                <Slider
                                    :aria-label="def.label"
                                    variant="spectrum"
                                    :model-value="[config[def.key] as number]"
                                    :min="def.min"
                                    :max="def.max"
                                    :step="def.step"
                                    @update:model-value="(v: number[] | undefined) => v && update(def.key, v[0]!)"
                                />
                            </div>
                        </template>
                    </ConfiguratorRow>
                </div>
            </div>

            <!-- Floating glass dock at bottom — only shown when there are sliders -->
            <div v-if="sections.length > 0" class="config-dock-anchor">
                <GlassDock :always-expanded="true" :fit-content="true">
                    <Button variant="ghost" size="sm" @click="copyAsJson">
                        <Copy class="w-3.5 h-3.5" />
                        Copy JSON
                    </Button>
                    <Button variant="ghost" size="sm" @click="resetDefaults">
                        <RotateCcw class="w-3.5 h-3.5" />
                        Reset
                    </Button>
                </GlassDock>
            </div>
        </Card>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

.config-section-header {
    border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
    padding-bottom: 0.375rem;
}

.config-section-title {
    font-family: var(--font-mono);
    font-size: var(--type-small);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
    color: var(--muted-foreground);
}

.config-dock-anchor {
    position: sticky;
    bottom: 0.75rem;
    display: flex;
    justify-content: center;
    z-index: var(--z-content);
    pointer-events: none;
}

.config-dock-anchor > * {
    pointer-events: auto;
}
</style>
