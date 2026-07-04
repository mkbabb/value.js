<template>
    <!-- Explicit root: the caller's class (grid/absolute placement) lands
         here, never on the renderless TooltipProvider. -->
    <div>
        <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
            <Tooltip>
                <TooltipTrigger as-child>
                    <!-- R.W3 Lane D / D2: the material hero's scale (N.W16
                         D1-4 — `w-[11rem]` at the lg corner-break; a tucked
                         w-24 puck on the clipped mobile card). Position is
                         the caller's. -->
                    <GooBlob
                        ref="gooBlobRef"
                        :color="cssColorOpaque"
                        class="w-24 lg:w-[11rem]"
                        @click="onBlobClick"
                        @mouseenter="gooBlobRef?.setMood('curious')"
                    />
                </TooltipTrigger>
                <TooltipContent class="fira-code">
                    {{ denormalizedCurrentColor.value.toFormattedString() }}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>

<script setup lang="ts">
import { inject, useTemplateRef } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
import { COLOR_MODEL_KEY } from "../keys";

// Thin consumer of glass-ui's GooBlob. The component owns its own autonomic
// mood arc (the {valence,arousal} circumplex settles back to idle/sleepy on its
// own demand-driven update loop) — HeroBlob only nudges the expressive moments
// the picker UX cares about: a hover reads as curious, a click reads as happy.
// No bespoke FSM, no idle timers, no rapid-change heuristic left behind.

const { cssColorOpaque, denormalizedCurrentColor } = inject(COLOR_MODEL_KEY)!;

const emit = defineEmits<{ click: [] }>();

const gooBlobRef = useTemplateRef<InstanceType<typeof GooBlob>>("gooBlobRef");

function onBlobClick() {
    emit("click");
    gooBlobRef.value?.setMood("happy");
    gooBlobRef.value?.nudge();
}

function nudgeSatellites() {
    gooBlobRef.value?.nudge();
}

defineExpose({ nudgeSatellites });
</script>
