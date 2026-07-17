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
// Both AuroraPane and BlobPane pass their full SECTIONS arrays. AuroraPane
// (rebuilt at N.W5.B) additionally drives the default slot with its enum-atom
// Select rows (harmony / arrangement / medium / motion) above the sliders.

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { Copy, RotateCcw } from "@lucide/vue";
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { ConfiguratorRow } from "@mkbabb/glass-ui/configurator";
import PaneHeader from "../shared/ui/PaneHeader.vue";
import { copyToClipboard } from "@mkbabb/glass-ui";

/** A single slider definition inside a section. `key` may be a dot-path
 *  (e.g. `geometry.bodyRadius`) addressing a nested config atom. */
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

const { config, sections, defaults, title, description } = defineProps<{
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

// Dot-path access so the same generic pane drives both a flat config and a
// nested-atom config (e.g. the blob's 8-atom `geometry.bodyRadius`). A plain
// key with no `.` reads/writes the top level exactly as before.
function readPath(obj: Record<string, unknown>, path: string): unknown {
    let cur: unknown = obj;
    for (const seg of path.split(".")) {
        if (cur == null || typeof cur !== "object") return undefined;
        cur = (cur as Record<string, unknown>)[seg];
    }
    return cur;
}

function writePath(obj: Record<string, unknown>, path: string, value: unknown) {
    const segs = path.split(".");
    let cur = obj;
    for (let i = 0; i < segs.length - 1; i++) {
        cur = cur[segs[i]!] as Record<string, unknown>;
    }
    cur[segs[segs.length - 1]!] = value;
}

/** Read a slider value by dot-path — exposed to the template. */
function read(key: string): number {
    return readPath(config, key) as number;
}

function update(key: string, value: number) {
    writePath(config, key, value);
}

function fmt(v: number): string {
    return Number.isInteger(v) ? String(v) : v.toFixed(3);
}

async function copyAsJson() {
    await copyToClipboard(JSON.stringify(config, null, 2));
}

function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
</script>

<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card
            tier="resting"
            class="w-full min-w-0 h-full relative flex flex-col overflow-hidden"
        >
            <!-- The scroll region owns the fade mask + overflow; the action bar
                 below sits OUTSIDE it (flex-none footer) so it can never occlude
                 a slider or readout (W6-6). -->
            <div class="pane-scroll-fade scrollbar-thin flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
                <PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>

                <!-- Default slot for extra controls (e.g. AuroraPane select rows) -->
                <slot />

                <!-- T.W4-4 THE POPULATION CLAUSE (M-34): the console grammar
                     extends to the app's SECOND slider population — the
                     sections seat in the SAME rung-2 well (.console-well,
                     the one-home class; P3 swap booked), live values wear
                     certified ink, rows carry the touch rung <lg. O-18's
                     config-slider rows judge this surface. -->
                <div
                    v-if="sections.length > 0"
                    class="px-4 sm:px-6 pt-2 pb-6"
                >
                    <div class="config-console console-well flex flex-col gap-5">
                    <div
                        v-for="section in sections"
                        :key="section.title"
                        class="flex flex-col gap-1.5"
                    >
                        <div class="config-section-header">
                            <span class="config-section-title">{{ section.title }}</span>
                        </div>

                        <!-- ONE label per row (ConfiguratorRow's `label`), with the
                             live readout paired to it via the row's `name` slot — the
                             glass-ui ConfiguratorRow label API (L14), no demo fork.
                             The slot carries only the Slider; the prior in-slot
                             sans+mono label pair (the doubled row) is gone (W6-6). -->
                        <ConfiguratorRow
                            v-for="def in section.defs"
                            :key="def.key"
                            :label="def.label"
                            :name="fmt(read(def.key))"
                            class="gap-1.5 py-1"
                        >
                            <Slider
                                :aria-label="def.label"
                                variant="spectrum"
                                :model-value="[read(def.key)]"
                                :min="def.min"
                                :max="def.max"
                                :step="def.step"
                                @update:model-value="(v: number[] | undefined) => v && update(def.key, v[0]!)"
                            />
                        </ConfiguratorRow>
                    </div>
                    </div>
                </div>
            </div>

            <!-- Action bar — a flex-none footer docked below the scroll region.
                 Keeps the glass-pill affordance but out of the scroll-overlap
                 path, so it no longer floats over the last rows (W6-6). Only
                 shown when there are sliders. -->
            <div v-if="sections.length > 0" class="config-action-bar">
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
@reference "../styles/foundation.css";

/* T.W4-4 (the population clause): the console well's inner rhythm + the
 * certified-ink cure for the row's live value (the producer ConfiguratorRow
 * names a muted-rung /70 post-hoc alpha — a guard-then-alpha ink over a live
 * tint; on the well it re-inks at the certified de-emphasis rung
 * `--ink-muted`, the D6 contract's stamped token) + the <lg touch rung
 * (≥44px slider rows — the producer's own --dock-touch-target). */
.config-console {
    padding: 0.75rem 0.875rem;
    /* T.W8 boot-A (defect · A-class · the named O-18 blind spot on the SECOND
     * slider population): the config sliders' spectrum TRACK computed
     * `var(--secondary)` — ~1.09:1 light / 1.26:1 dark on the well, an
     * invisible control extent (WCAG 1.4.11 wants ≥3:1), and the spectrum
     * `.slider-range` is transparent by recipe so no filled/unfilled split
     * reads either. The W6.5 GRAPHICS cure (T-44a) covered the EXTRACT tracks
     * only. Here the config population re-inks its track via the SAME cure
     * class (the eb7bb2c-era `--slider-track-bg` feed, no `ui/slider` edit):
     * the certified de-emphasis rung `--ink-muted` (the D6 contract's stamped
     * token — the exact material ExtractControls falls to when no live pick
     * threads) is ≥3:1 on the well by construction. o18-contrast-census's new
     * config GRAPHICS leg is this row's born-RED gate. */
    --slider-track-bg: var(--ink-muted, var(--muted-foreground));
}
.config-console :deep(.configurator-row .font-mono) {
    color: var(--ink-muted, var(--muted-foreground));
}

/* T.W8-WR-11 (T-59) — THE ONE RHYTHM SOURCE, offered to the config population
 * (M-34): the same container-scaled law the picker console carries, so the app
 * has ONE rhythm regime, never a per-population hand-tune. The row block-size
 * rides a clamp() of the pane container; the hard `<lg` 44px switch is retired
 * for a coarse-pointer HIT-AREA EXTENSION on the row's slider (the tap zone
 * reaches 44px without inflating the visual row). Clamp constants ride the
 * WR-11 roster bracket. */
.config-console :deep(.configurator-row) {
    min-block-size: clamp(2rem, 7cqi, 2.625rem);
}
@media (pointer: coarse) {
    .config-console :deep(.configurator-row .glass-slider) {
        position: relative;
    }
    .config-console :deep(.configurator-row .glass-slider)::before {
        content: "";
        position: absolute;
        inset-inline: 0;
        top: 50%;
        translate: 0 -50%;
        block-size: max(100%, var(--dock-touch-target, 2.75rem));
    }
}

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

.config-action-bar {
    flex: none;
    display: flex;
    justify-content: center;
    padding: 0.625rem 0.75rem;
    border-top: 1px solid color-mix(in srgb, var(--border) 35%, transparent);
}
</style>
