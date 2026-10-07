<script setup lang="ts">
// ConfigSliderPane — generic slider-pane component parameterised by
// { config, sections, defaults, title, description, extraControls? }.
// Merges the near-identical AuroraPane.vue and BlobPane.vue (Ae-6).
//
// HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow
// + useConfiguratorState. This component uses ConfiguratorRow for each labeled
// row so the demo composes the existing glass-ui surface rather than rebuilding
// the row primitive. The section-group wrapper and the copy/reset footer row
// remain demo-local (they are thin structural shells, not the row primitive).
//
// Both AuroraPane and BlobPane pass their full SECTIONS arrays. AuroraPane
// (rebuilt at N.W5.B) additionally drives the default slot with its enum-atom
// Select rows (harmony / arrangement / medium / motion) above the sliders.

import { Button } from "@mkbabb/glass-ui/button";
import { Card } from "@mkbabb/glass-ui/card";
import { Slider } from "@mkbabb/glass-ui/slider";
import { Check, Copy, RotateCcw } from "@lucide/vue";
import { ConfiguratorRow } from "@mkbabb/glass-ui/configurator";
import PaneHeader from "../shared/ui/PaneHeader.vue";
import { useClipboard } from "@mkbabb/glass-ui";

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

/** X.W12.u2 (UIA-V-158, the readout half): a knob reads at its own step's
 *  fixed precision — integers for integer steps (Zones), never a format that
 *  flips between "0.760" and "1" as the value crosses an integer. */
function fmt(v: number, step: number): string {
    const decimals = Number.isInteger(step) ? 0 : (String(step).split(".")[1]?.length ?? 0);
    return v.toFixed(decimals);
}

// X.W12.u2 (UIA-V-391, the copy half): the copy confirms itself on glass's
// scope-owned clipboard status — the label swaps to "Copied" for a beat.
const { status: jsonCopyStatus, copy } = useClipboard({ resetMs: 1400 });
async function copyAsJson() {
    await copy(JSON.stringify(config, null, 2));
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
                            <h3 class="config-section-title font-display text-subheading">{{ section.title }}</h3>
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
                            :name="fmt(read(def.key), def.step)"
                            class="gap-1.5 py-1"
                        >
                            <!-- X-DS pass 1 (V1-05): glass's `sm` rung — a
                                 track with no colour data is a rail, not a
                                 24px slab. V1C-06: and glass's DEFAULT range
                                 variant, not `spectrum` (the colour-track
                                 variant has no fill): the filled length IS the
                                 value, in the certified ink; the unfilled
                                 track stays glass's quiet tone. -->
                            <Slider
                                :aria-label="def.label"
                                size="sm"
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

            <!-- Action bar — a flex-none footer below the scroll region, so it
                 can never occlude a slider (W6-6). X-DS pass 1 (V1-04): two
                 plain commands seated behind the hairline, right-aligned. The
                 floating GlassDock that used to wrap them is gone — a dock is
                 floating chrome, and a pill of pills inside a card was three
                 nested capsules for two commands. Only shown with sliders. -->
            <div v-if="sections.length > 0" class="config-action-bar">
                <Button size="sm" emphasis="quiet" @click="copyAsJson">
                    <Check v-if="jsonCopyStatus === 'success'" class="w-3.5 h-3.5" />
                    <Copy v-else class="w-3.5 h-3.5" />
                    {{ jsonCopyStatus === "success" ? "Copied" : "Copy JSON" }}
                </Button>
                <Button size="sm" emphasis="quiet" @click="resetDefaults">
                    <RotateCcw class="w-3.5 h-3.5" />
                    Reset
                </Button>
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
    /* The certified graphics ink (O-18's config leg · WCAG 1.4.11): the RANGE
     * — the value's extent — wears `--ink-muted`, ≥3:1 on the well by
     * construction. X-DS pass 1 (V1C-06): it was the whole TRACK inked on the
     * spectrum variant (no fill), so three near-black bars carried the card's
     * weight and the value carried none. The unfilled track takes glass's
     * own quiet default (`--muted-medium`) through no override at all. */
    --slider-range-bg: var(--ink-muted, var(--muted-foreground));
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

/* X-DS pass 1 (V1C-04): a config section is a section in the same sense as
 * the gradient's "Stops" — it speaks the app's ONE section-head voice
 * (Fraunces, sentence case, `font-display text-subheading` on the h3), never the
 * mono uppercase tracked caps of an instrument panel (value-canon §2 Type). */
.config-section-title {
    color: var(--foreground);
}

.config-action-bar {
    flex: none;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    border-top: 1px solid color-mix(in srgb, var(--border) 35%, transparent);
}
</style>
