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
                <ChevronDown
                    class="debug-toggle"
                    :class="{ 'debug-toggle-open': !collapsed }"
                    aria-hidden="true"
                />
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
                            >{{ formatGauge(key, value) }}</span>
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
import { ChevronDown } from "@lucide/vue";
import { POINTER_DEBUG_KEY, TIMESTAMP_GAUGES } from "../composables/usePointerDebug";
import DebugEventLog from "./DebugEventLog.vue";

const debug = inject(POINTER_DEBUG_KEY)!;
const collapsed = ref(true); // start collapsed so it doesn't interfere
const copied = ref(false);

/** Format by gauge kind (UIA-V-671): a stamp reads as its age, an integer
 *  count reads without a decimal, a measure keeps one. */
function formatGauge(key: string, v: string | number | boolean): string {
    if (typeof v === "boolean") return v ? "YES" : "no";
    if (typeof v === "number") {
        if (TIMESTAMP_GAUGES.has(key)) {
            return `${((performance.now() - v) / 1000).toFixed(1)}s ago`;
        }
        return Number.isInteger(v) ? String(v) : v.toFixed(1);
    }
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
    /* UIA-V-54: `--z-debug` is shipped by neither glass nor the demo, so the
     * declaration resolved to `auto` and the picker card painted over the
     * overlay. `--z-max` (9999) is the top rung glass ships, above
     * `--z-toggle` 999 and every teleported glass overlay (UIA-V-676); the
     * missing `--z-debug` rung is glass's (O-59, UIA-V-457). */
    z-index: var(--z-max);
    width: 280px;
    max-height: 35dvh;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.92);
    color: #e0e0e0;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.3;
    /* UIA-V-460: the panel role token (was the raw --radius-xl scale step). */
    border-radius: var(--radius-panel);
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
    /* reset the UA button box so the header reads as the panel's own row */
    width: 100%;
    border: 0;
    color: inherit;
    font: inherit;
    text-align: start;
}

/* UIA-V-673: the disclosure shows keyboard focus on glass's ring token. */
.debug-header:focus-visible {
    outline: none;
    box-shadow: inset var(--focus-ring-shadow);
}

.debug-title {
    font-weight: 700;
    flex: 1;
    text-align: start;
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
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    transition: transform var(--duration-fast) var(--ease-standard);
}

.debug-toggle-open {
    transform: rotate(180deg);
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
    gap: 8px;
    padding: 1px 0;
}

.debug-key {
    color: #aaa;
    flex-shrink: 0;
}

/* UIA-V-671: a long value truncates beside its key, never wraps into it. */
.debug-val {
    color: #fff;
    font-weight: 600;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: end;
}

.debug-val-true {
    color: #4caf50;
}

.debug-val-false {
    color: #666;
}

/* UIA-V-458: the gauges + log region scrolls. It takes its own wheel and
 * vertical pan (contained, so the page under it never scrolls), and passes
 * no taps: it holds no control. */
.debug-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    pointer-events: auto;
    touch-action: pan-y;
    overscroll-behavior: contain;
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
    /* UIA-V-460: a touch-sized control on the control radius (this is the
     * iOS pointer-debugging tool; 27px at 10px type was under target). */
    min-height: 36px;
    padding: 6px 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-button);
    background: rgba(255, 255, 255, 0.08);
    color: #e0e0e0;
    font-size: 11px;
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
