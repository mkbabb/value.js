<template>
    <Popover :open="open" @update:open="$emit('update:open', $event)">
        <PopoverTrigger as-child>
            <slot name="trigger" />
        </PopoverTrigger>
        <PopoverContent align="start" side="top" class="w-52 p-2.5">
            <!-- SV canvas -->
            <div
                ref="canvasRef"
                class="relative w-full h-28 rounded-lg cursor-crosshair overflow-hidden border border-border"
                :style="{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))` }"
                @pointerdown="onCanvasPointer"
                @pointermove="onCanvasMove"
                @pointerup="onCanvasUp"
            >
                <!-- Thumb -->
                <div
                    class="absolute w-4 h-4 rounded-full border-2 border-white shadow-cartoon-sm pointer-events-none -translate-x-1/2 -translate-y-1/2"
                    :style="{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%`, background: currentHex }"
                />
            </div>

            <!-- Hue strip -->
            <div
                ref="hueRef"
                class="relative w-full h-3 mt-2 rounded-full cursor-pointer overflow-hidden"
                style="background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)"
                @pointerdown="onHuePointer"
                @pointermove="onHueMove"
                @pointerup="onHueUp"
            >
                <div
                    class="absolute w-3 h-3 rounded-full border-2 border-white shadow-sm pointer-events-none -translate-x-1/2"
                    :style="{ left: `${(hue / 360) * 100}%`, background: `hsl(${hue}, 100%, 50%)` }"
                />
            </div>

            <!-- Color output + search inline -->
            <div class="flex items-center gap-1.5 mt-2">
                <span
                    class="block h-6 w-6 rounded-full border-2 border-border shrink-0 shadow-cartoon-sm"
                    :style="{ backgroundColor: currentHex }"
                />
                <span class="font-mono-code text-caption flex-1 truncate text-muted-foreground">
                    {{ currentHex }}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    class="h-6 px-2 text-micro shrink-0"
                    @click="$emit('search', currentHex)"
                >
                    Search
                </Button>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";

const props = defineProps<{
    open: boolean;
    hex?: string;
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    "update:hex": [hex: string];
    search: [hex: string];
}>();

const hue = ref(210);
const sat = ref(0.6);
const val = ref(0.8);
let canvasDragging = false;
let hueDragging = false;

const canvasRef = ref<HTMLElement | null>(null);
const hueRef = ref<HTMLElement | null>(null);

const currentHex = computed(() => {
    const h = hue.value / 360;
    const s = sat.value;
    const v = val.value;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    const toHex = (c: number) => Math.round(c * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
});

watch(currentHex, (hex) => emit("update:hex", hex));

// Parse incoming hex prop
watch(() => props.hex, (hex) => {
    if (!hex || !hex.startsWith("#") || hex.length < 7) return;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    val.value = max;
    sat.value = max === 0 ? 0 : d / max;
    if (d === 0) return; // keep existing hue
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    hue.value = h * 360;
}, { immediate: true });

function onCanvasPointer(e: PointerEvent) {
    canvasDragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateCanvas(e);
}
function onCanvasMove(e: PointerEvent) { if (canvasDragging) updateCanvas(e); }
function onCanvasUp() { canvasDragging = false; }
function updateCanvas(e: PointerEvent) {
    const el = canvasRef.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    sat.value = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    val.value = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
}

function onHuePointer(e: PointerEvent) {
    hueDragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateHue(e);
}
function onHueMove(e: PointerEvent) { if (hueDragging) updateHue(e); }
function onHueUp() { hueDragging = false; }
function updateHue(e: PointerEvent) {
    const el = hueRef.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    hue.value = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360));
}
</script>
