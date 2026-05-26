<template>
    <Teleport to="body">
        <div
            v-if="debug.state.enabled"
            class="debug-overlay"
            :class="{ 'debug-collapsed': collapsed }"
        >
            <!-- W5-a11y: debug header is a toggle control; button semantics needed -->
            <button
                type="button"
                class="debug-header"
                :aria-expanded="!collapsed"
                aria-controls="debug-body"
                @click="collapsed = !collapsed"
            >
                <span class="debug-title">Debug</span>
                <span v-if="debug.state.frozen" class="debug-frozen">FROZEN?</span>
                <span v-if="copied" class="debug-copied">copied!</span>
                <span class="debug-toggle">{{ collapsed ? "+" : "−" }}</span>
            </button>

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
                            >{{ formatGauge(value) }}</span>
                        </div>
                    </div>

                    <DebugEventLog :events="debug.state.events" />
                </div>

                <!-- Actions — sticky at bottom -->
                <div class="debug-actions">
                    <button
                        class="debug-btn debug-btn-danger"
                        @click="debug.forceReleaseAllPointers()"
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
import { ref, inject } from "vue";
import { POINTER_DEBUG_KEY } from "../composables/usePointerDebug";
import DebugEventLog from "./DebugEventLog.vue";

const debug = inject(POINTER_DEBUG_KEY)!;
const collapsed = ref(true); // start collapsed so it doesn't interfere
const copied = ref(false);

function formatGauge(v: string | number | boolean): string {
    if (typeof v === "boolean") return v ? "YES" : "no";
    if (typeof v === "number") return v.toFixed(1);
    return String(v);
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
        setTimeout(() => { copied.value = false; }, 1500);
    } catch {
        // Fallback: temporary textarea (older browsers / non-secure contexts).
        const ta = document.createElement("textarea");
        ta.value = json;
        ta.style.cssText =
            "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        copied.value = true;
        setTimeout(() => { copied.value = false; }, 1500);
    }
}
</script>

<style scoped>
.debug-overlay {
    position: fixed;
    bottom: 8px;
    left: 8px;
    z-index: var(--z-debug);
    width: 280px;
    max-height: 35dvh;
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
    50% { opacity: 0.3; }
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
    /* E.W4 Lane E: tokenize to glass-ui canon — `0.1s` = `--duration-instant`. */
    transition: filter var(--duration-instant) var(--ease-standard),
                transform var(--duration-instant) var(--ease-standard);
}
.debug-btn:hover {
    filter: brightness(1.3);
}
.debug-btn:active {
    transform: scale(0.95);
}
.debug-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 1px;
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
</style>
