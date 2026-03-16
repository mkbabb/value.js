<template>
    <Teleport to="body">
        <div
            v-if="debug.state.enabled"
            class="debug-overlay"
            :class="{ 'debug-collapsed': collapsed }"
        >
            <div class="debug-header" @click="collapsed = !collapsed">
                <span class="debug-title">Debug</span>
                <span v-if="debug.state.frozen" class="debug-frozen"
                    >FROZEN?</span
                >
                <span v-if="copied" class="debug-copied">copied!</span>
                <span class="debug-toggle">{{
                    collapsed ? "+" : "−"
                }}</span>
            </div>

            <template v-if="!collapsed">
                <!-- Scrollable content area -->
                <div class="debug-scroll">
                    <!-- Gauges -->
                    <div class="debug-section">
                        <div class="debug-section-title">State</div>
                        <div
                            v-for="(value, key) in debug.state.gauges"
                            :key="key"
                            class="debug-gauge"
                        >
                            <span class="debug-key">{{ key }}</span>
                            <span
                                class="debug-val"
                                :class="{
                                    'debug-val-true': value === true,
                                    'debug-val-false': value === false,
                                }"
                                >{{ formatGauge(value) }}</span
                            >
                        </div>
                    </div>

                    <!-- Event log (pointer-events: none so it can't steal touches) -->
                    <div class="debug-section debug-log-section">
                        <div class="debug-section-title">
                            Events ({{ debug.state.events.length }})
                        </div>
                        <div ref="logRef" class="debug-log">
                            <div
                                v-for="(evt, i) in reversedEvents"
                                :key="i"
                                class="debug-event"
                                :class="eventClass(evt)"
                            >
                                <span class="debug-ts">{{
                                    (evt.ts / 1000).toFixed(2)
                                }}</span>
                                <span class="debug-etype">{{ evt.type }}</span>
                                <span class="debug-pid"
                                    >p{{ evt.pointerId }}</span
                                >
                                <span v-if="evt.hasCapture" class="debug-cap"
                                    >CAP</span
                                >
                                <span class="debug-tgt">{{ evt.target }}</span>
                                <span v-if="evt.extra" class="debug-extra">{{
                                    evt.extra
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions — sticky at bottom -->
                <div class="debug-actions">
                    <button
                        class="debug-btn debug-btn-danger"
                        @click="forceReset"
                    >
                        Reset
                    </button>
                    <button class="debug-btn debug-btn-copy" @click="copyJSON">
                        Copy JSON
                    </button>
                    <button class="debug-btn" @click="debug.clearEvents()">
                        Clear
                    </button>
                </div>
            </template>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import {
    POINTER_DEBUG_KEY,
    type PointerDebugEvent,
} from "@composables/usePointerDebug";

const debug = inject(POINTER_DEBUG_KEY)!;
const collapsed = ref(true); // start collapsed so it doesn't interfere
const logRef = ref<HTMLElement>();
const copied = ref(false);

const reversedEvents = computed(() => [...debug.state.events].reverse());

function formatGauge(v: string | number | boolean): string {
    if (typeof v === "boolean") return v ? "YES" : "no";
    if (typeof v === "number") return v.toFixed(1);
    return String(v);
}

function eventClass(evt: PointerDebugEvent): string {
    if (evt.type.includes("FREEZE")) return "debug-event-freeze";
    if (evt.type.includes("cancel")) return "debug-event-cancel";
    if (evt.type.includes("FORCE")) return "debug-event-force";
    if (evt.type.includes("lost")) return "debug-event-lost";
    if (evt.type.includes("down")) return "debug-event-down";
    if (evt.type.includes("up")) return "debug-event-up";
    return "";
}

function buildExportJSON() {
    return JSON.stringify(
        {
            ts: new Date().toISOString(),
            ua: navigator.userAgent,
            screen: {
                w: screen.width,
                h: screen.height,
                dpr: devicePixelRatio,
            },
            gauges: { ...debug.state.gauges },
            frozen: debug.state.frozen,
            frozenSince: debug.state.frozenSince,
            events: debug.state.events.map((e) => ({
                t: +e.ts.toFixed(1),
                type: e.type,
                pid: e.pointerId,
                tgt: e.target,
                cap: e.hasCapture || undefined,
                extra: e.extra || undefined,
            })),
        },
        null,
        2,
    );
}

async function copyJSON() {
    const json = buildExportJSON();
    try {
        await navigator.clipboard.writeText(json);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 1500);
    } catch {
        // Fallback: create a temporary textarea
        const ta = document.createElement("textarea");
        ta.value = json;
        ta.style.cssText =
            "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 1500);
    }
}

function forceReset() {
    debug.forceReleaseAll();
    // Walk all elements that might hold capture — brute force
    // Use broad selector to catch reka-ui slider internals too
    const els = document.querySelectorAll(
        ".spectrum-picker, .slider-track, .slider-thumb, [data-reka-collection-item], [data-reka-slider-thumb]",
    );
    // Also try the spectrum and slider wrapper elements
    const wrappers = document.querySelectorAll(
        ".touch-gate-target, .spectrum-picker",
    );
    const allEls = new Set([...els, ...wrappers]);

    for (const el of allEls) {
        // iOS pointer IDs are huge (755613xxx range seen in logs).
        // Try recent pointer IDs from our event log.
        const recentPids = new Set<number>();
        for (const evt of debug.state.events) {
            if (evt.pointerId > 0) recentPids.add(evt.pointerId);
        }
        // Also try 0-10 for safety
        for (let pid = 0; pid <= 10; pid++) recentPids.add(pid);

        for (const pid of recentPids) {
            try {
                (el as HTMLElement).releasePointerCapture(pid);
            } catch {
                /* no capture held */
            }
        }
    }
    debug.setGauge("lastForceReset", performance.now());
    debug.log("FORCE_RESET_DONE", -1, null, false, `${allEls.size} els checked`);
}
</script>

<style scoped>
.debug-overlay {
    position: fixed;
    bottom: 8px;
    left: 8px;
    z-index: var(--z-debug);
    width: 280px;
    max-height: 35vh;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.92);
    color: #e0e0e0;
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 10px;
    line-height: 1.3;
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    /* Only the header and buttons receive touches */
    pointer-events: none;
}

.debug-collapsed {
    width: auto;
    max-height: none;
}

.debug-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
    user-select: none;
    pointer-events: auto;
    touch-action: manipulation;
}

.debug-title {
    font-weight: 700;
    flex: 1;
}

.debug-frozen {
    color: #ff4444;
    font-weight: 700;
    animation: blink 0.5s infinite;
}

.debug-copied {
    color: #4caf50;
    font-weight: 600;
}

@keyframes blink {
    50% {
        opacity: 0.3;
    }
}

.debug-toggle {
    font-size: 14px;
    font-weight: 700;
}

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

.debug-gauge {
    display: flex;
    justify-content: space-between;
    padding: 1px 0;
}

.debug-key {
    color: #aaa;
}

.debug-val {
    color: #fff;
    font-weight: 600;
}

.debug-val-true {
    color: #4caf50;
}

.debug-val-false {
    color: #666;
}

.debug-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    pointer-events: none;
}

.debug-actions {
    flex-shrink: 0;
    display: flex;
    gap: 4px;
    padding: 6px 10px;
    pointer-events: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.95);
}

.debug-btn {
    flex: 1;
    padding: 6px 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.08);
    color: #e0e0e0;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    touch-action: manipulation;
}

.debug-btn-danger {
    background: rgba(255, 60, 60, 0.25);
    border-color: rgba(255, 60, 60, 0.4);
    color: #ff8888;
}

.debug-btn-copy {
    background: rgba(60, 140, 255, 0.25);
    border-color: rgba(60, 140, 255, 0.4);
    color: #88bbff;
}

/* Log area is NOT touchable — visual only, prevents overlay from stealing touches */
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
