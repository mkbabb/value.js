<template>
    <!-- Event log: pointer-events: none so the visual feed can't steal touches. -->
    <div class="debug-section debug-log-section">
        <div class="debug-section-title">
            Events ({{ events.length }})
        </div>
        <div class="debug-log">
            <div
                v-for="(evt, i) in reversedEvents"
                :key="i"
                class="debug-event"
                :class="eventClass(evt)"
            >
                <span class="debug-ts">{{ (evt.ts / 1000).toFixed(2) }}</span>
                <span class="debug-etype">{{ evt.type }}</span>
                <span class="debug-pid">p{{ evt.pointerId }}</span>
                <span v-if="evt.hasCapture" class="debug-cap">CAP</span>
                <span class="debug-tgt">{{ evt.target }}</span>
                <span v-if="evt.extra" class="debug-extra">{{ evt.extra }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PointerDebugEvent } from "../composables/usePointerDebug";

const { events } = defineProps<{
    events: readonly PointerDebugEvent[];
}>();

const reversedEvents = computed(() => [...events].reverse());

function eventClass(evt: PointerDebugEvent): string {
    if (evt.type.includes("FREEZE")) return "debug-event-freeze";
    if (evt.type.includes("cancel")) return "debug-event-cancel";
    if (evt.type.includes("FORCE")) return "debug-event-force";
    if (evt.type.includes("lost")) return "debug-event-lost";
    if (evt.type.includes("down")) return "debug-event-down";
    if (evt.type.includes("up")) return "debug-event-up";
    return "";
}
</script>

<style scoped>
.debug-section {
    padding: 4px 10px;
}

.debug-section-title {
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    font-size: 9px;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
}

/* Log area is NOT touchable — visual only, prevents overlay from stealing touches. */
.debug-log-section {
    pointer-events: none;
}

.debug-log {
    pointer-events: none;
}

.debug-event {
    display: flex;
    gap: 4px;
    padding: 1px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    flex-wrap: wrap;
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 10px;
    line-height: 1.3;
}

.debug-ts {
    color: #666;
    min-width: 40px;
}

.debug-etype {
    color: #8bc4ff;
    min-width: 60px;
    font-weight: 600;
}

.debug-pid {
    color: #b388ff;
    min-width: 24px;
}

.debug-cap {
    color: #ff4444;
    font-weight: 700;
}

.debug-tgt {
    color: #777;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
}

.debug-extra {
    color: #ffcc80;
}

.debug-event-freeze {
    background: rgba(255, 40, 40, 0.2);
}

.debug-event-cancel {
    background: rgba(255, 60, 60, 0.12);
}

.debug-event-force {
    background: rgba(255, 180, 0, 0.15);
}

.debug-event-lost {
    background: rgba(255, 150, 0, 0.1);
}

.debug-event-down {
    background: rgba(60, 180, 255, 0.08);
}

.debug-event-up {
    background: rgba(60, 255, 60, 0.08);
}
</style>
