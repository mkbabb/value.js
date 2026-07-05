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
                        :paused="blobPaused"
                        class="w-24 lg:w-[11rem]"
                        @click="onBlobClick"
                        @mouseenter="onBlobHover"
                        @pointermove="noteBlobActivity"
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
import { inject, onScopeDispose, ref, useTemplateRef, watch } from "vue";
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
// The ONE piece of local state is the W3-3 perf idle-gate below (NOT a mood FSM).

const { cssColorOpaque, denormalizedCurrentColor } = inject(COLOR_MODEL_KEY)!;

const emit = defineEmits<{ click: [] }>();

const gooBlobRef = useTemplateRef<InstanceType<typeof GooBlob>>("gooBlobRef");

// --- W3-3 (S.W3): blob idle-gate (the demo half) ---
// The blob's WebGL render loop costs ~7ms EVERY frame it is mounted, even fully
// idle — the picker's default-view floor sits at 54fps vs the blob-off 85fps
// (perf-transitions P0-2). We drive the renderer's EXISTING `paused` seam (the
// `v-model:paused` prop → the substrate's `manual` suspend) after N ms with no
// colour or pointer activity; the producer's own colour/paletteStops wake
// watchers repaint the parked blob on a colour change (single-frame repaint),
// and pointer activity resumes the live loop. The producer per-frame CPU
// profile is letter L5 — this is the demo half ONLY, no ../glass-ui patch.
//
// N is the idle threshold. The §6.1 idle-budget e2e spec's sampling window MUST
// exceed BLOB_IDLE_MS (webgl-goo-blob-idle.spec.ts mirrors this constant), else
// the ≤13ms idle gate would sample the still-live pre-park window and fail on
// correct true-idle behaviour.
const BLOB_IDLE_MS = 2000;
const blobPaused = ref(false);
let idleTimer: ReturnType<typeof setTimeout> | undefined;
function noteBlobActivity() {
    blobPaused.value = false; // resume the live loop under interaction
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        blobPaused.value = true; // park after N ms of true idle
    }, BLOB_IDLE_MS);
}
// A colour change is activity: a slider drag keeps the blob live; N ms after the
// last change (or pointer event) it parks. `immediate` arms the first countdown
// at mount, so an untouched picker parks on its own.
watch(cssColorOpaque, noteBlobActivity, { immediate: true });
onScopeDispose(() => clearTimeout(idleTimer));

function onBlobHover() {
    noteBlobActivity();
    gooBlobRef.value?.setMood("curious");
}

function onBlobClick() {
    noteBlobActivity();
    emit("click");
    gooBlobRef.value?.setMood("happy");
    gooBlobRef.value?.nudge();
}

function nudgeSatellites() {
    gooBlobRef.value?.nudge();
}

defineExpose({ nudgeSatellites });
</script>
