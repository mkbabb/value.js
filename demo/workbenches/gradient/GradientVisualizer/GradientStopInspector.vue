<script setup lang="ts">
/**
 * GradientStopInspector — the selected stop's inspector (A2-VA-L1-11: split out
 * of the 1099-line GradientStopEditor, which carried the rail AND this row).
 *
 * The inspector is the ONE removal control and the numeric position entry
 * (X-W6 · X.W6.b — b3/b4). It renders what the rail's selection and removal
 * owner hand it (GradientStopRail's scoped slot — GradientVisualizer composes
 * the two) and asks; it owns no selection and no removal rule of its own.
 * It sits inside the rail's seat, so it reads the seat's geometry tokens
 * (`--rail-gutter`, `--rail-hit`).
 */
import { X } from "@lucide/vue";
import { NumberField, NumberFieldInput } from "@mkbabb/glass-ui/number-field";
import { Button } from "@mkbabb/glass-ui/button";
import type { GradientStop } from "../model/types";

const { stop, index, count, refusal, notice } = defineProps<{
    /** The selected stop, or null when nothing is selected. */
    stop: GradientStop | null;
    /** Its ordinal (0-based) on the rail. */
    index: number;
    /** How many stops the rail holds. */
    count: number;
    /** Why removal is refused right now, or null when it is legal. */
    refusal: string | null;
    /** The seat's polite channel: a refusal or a completed removal. */
    notice: string;
}>();

const emit = defineEmits<{
    /** A committed position entry (0–100), already parsed and clamped. */
    position: [value: number | null | undefined];
    remove: [];
}>();

/** One decimal place: the precision the field shows and commits. */
function round1(position: number): number {
    return Math.round(position * 10) / 10;
}
</script>

<template>
    <!-- X.W12U.h · A2-VA-L3-7: with no selection the inspector is its hint
         line alone. With a stop selected, Position and Remove share one row
         (the floor still reads as a refused Remove with its reason — b4). -->
    <div
        class="stop-inspector flex flex-wrap items-center gap-x-3 gap-y-1"
        data-testid="gradient-stop-inspector"
    >
        <p v-if="!stop" class="text-caption plate-ink min-w-0">
            Select a stop on the rail to set its position or remove it.
        </p>
        <template v-else>
            <p class="text-caption plate-ink min-w-0">
                Stop {{ index + 1 }} of {{ count }}
            </p>

            <div class="flex items-center gap-x-3">
                <label class="stop-inspector-field flex items-center gap-1.5 text-caption">
                    <span class="plate-ink">Position</span>
                    <NumberField
                        class="stop-position-field"
                        :model-value="round1(stop.position)"
                        :min="0"
                        :max="100"
                        :step="0.1"
                        :format-options="{ maximumFractionDigits: 1 }"
                        @update:model-value="(v) => emit('position', v)"
                    >
                        <NumberFieldInput
                            data-testid="gradient-stop-position"
                            inputmode="decimal"
                            aria-label="Selected stop position, percent"
                        />
                    </NumberField>
                    <span class="plate-ink" aria-hidden="true">%</span>
                </label>

                <!-- X-DS pass 1 (V1-16): glass's quiet Button, so the row speaks one
                     control shape beside the NumberField. -->
                <Button
                    emphasis="quiet"
                    size="xs"
                    aria-label="Remove selected stop"
                    class="stop-inspector-remove"
                    :disabled="refusal !== null"
                    :aria-describedby="refusal ? 'gradient-stop-removal-reason' : undefined"
                    @click="emit('remove')"
                >
                    <X class="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Remove</span>
                </Button>
            </div>

            <!-- The floor's REASON is rendered, not implied: it is the control's
                 own description, so it is read with the control rather than
                 discovered by its absence. -->
            <p
                v-if="refusal"
                id="gradient-stop-removal-reason"
                class="text-caption plate-ink basis-full"
            >
                {{ refusal }}
            </p>
        </template>

        <!-- One polite channel for what a keyboard trigger would otherwise
             do in silence (a refused Delete, a completed removal). -->
        <p class="sr-only" role="status">{{ notice }}</p>
    </div>
</template>

<style scoped>
/* ── The inspector (X.W6.b — b3 / b4) ─────────────────────────────────────────
   In normal flow, on the seat's own rhythm: it collides with nothing, so it
   needs no exile band and no collision reservation. */
.stop-inspector {
    padding-top: var(--rail-gutter);
}
/* X.W12.u2 (UIA-V-45): glass's NumberField owns the field's plate, padding,
   radius and focus ring; the seat only sizes its CONTENT box for "100.0" in the
   input's own tabular numerals (content-box, so glass's padding sits outside). */
.stop-position-field :deep(input) {
    box-sizing: content-box;
    inline-size: 5ch;
    font-variant-numeric: tabular-nums;
    text-align: end;
}
/* The plate, radius, disabled register and focus ring are glass Button's own
   (X-DS pass 1 · V1-16). The seat keeps only the target floor and the
   destructive hover INK. The floor, said out loud: the control STAYS and reads
   as refused, with its reason beside it (b4 — never absence). */
.stop-inspector-remove {
    min-block-size: var(--rail-hit);
}
.stop-inspector-remove:hover:not(:disabled) {
    color: var(--destructive);
}
</style>
