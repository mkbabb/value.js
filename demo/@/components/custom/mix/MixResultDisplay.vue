<script setup lang="ts">
import { Copy, Check, Save, RotateCcw } from "lucide-vue-next";
import { ref, TransitionGroup } from "vue";
import { copyToClipboard } from "@composables/useClipboard";
import WatercolorDot from "@components/custom/watercolor-dot/WatercolorDot.vue";
import type { MixResult } from "@composables/useMixingState";

const props = defineProps<{
    result: MixResult;
}>();

const emit = defineEmits<{
    save: [];
    reset: [];
}>();

const copied = ref(false);

async function onCopy() {
    const text = props.result.type === "color"
        ? props.result.css ?? ""
        : props.result.colors?.map((c) => c.css).join(", ") ?? "";
    await copyToClipboard(text);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
}
</script>

<template>
    <div class="flex flex-col gap-3 p-4 rounded-xl glass-elevated">
        <span class="fraunces text-xs font-bold text-muted-foreground uppercase tracking-wide">Result</span>

        <!-- Single color result -->
        <Transition name="pop" mode="out-in">
            <template v-if="result.type === 'color' && result.css">
                <div class="flex items-center gap-3">
                    <WatercolorDot
                        :color="result.css"
                        tag="div"
                        class="w-14 h-14 shrink-0"
                        seed="mix-result"
                    />
                    <span class="fira-code text-xs text-foreground select-all break-all">
                        {{ result.css }}
                    </span>
                </div>
            </template>
        </Transition>

        <!-- Palette result -->
        <template v-if="result.type === 'palette' && result.colors">
            <TransitionGroup
                name="swatch-item"
                tag="div"
                class="flex flex-wrap gap-2"
            >
                <WatercolorDot
                    v-for="(color, i) in result.colors"
                    :key="i"
                    :color="color.css"
                    tag="div"
                    class="w-10 h-10 shrink-0"
                    :title="color.css"
                    :seed="`mix-result-${i}`"
                />
            </TransitionGroup>
            <!-- Gradient preview -->
            <div
                class="h-4 rounded-full overflow-hidden"
                :style="{
                    background: `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})`,
                }"
            />
        </template>

        <!-- Actions -->
        <div class="flex items-center gap-1">
            <button
                class="dock-icon-btn-compact"
                :title="copied ? 'Copied!' : 'Copy color'"
                @click="onCopy"
            >
                <component :is="copied ? Check : Copy" class="w-5 h-5" />
            </button>
            <button
                class="dock-icon-btn-compact"
                title="Save to palettes"
                @click="emit('save')"
            >
                <Save class="w-5 h-5" />
            </button>
            <div class="dock-separator" />
            <button
                class="dock-icon-btn-compact"
                title="Reset"
                @click="emit('reset')"
            >
                <RotateCcw class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>
