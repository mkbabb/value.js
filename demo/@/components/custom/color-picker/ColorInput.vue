<template>
    <div class="grid grid-cols-1 gap-y-2 p-0 m-0 relative">
        <HoverCard
            :close-delay="0"
            :open-delay="700"
            class="pointer-events-auto w-full"
        >
            <HoverCardTrigger class="w-full block">
                <div class="relative w-full flex items-center">
                    <span
                        ref="inputColorRef"
                        contenteditable
                        role="textbox"
                        :aria-label="proposeMode ? 'Propose a color name' : 'Enter a CSS color'"
                        class="color-input w-full block border overflow-hidden items-center bg-background rounded-sm px-3 py-2 focus-visible:outline-none fira-code text-ellipsis whitespace-nowrap text-center"
                        :class="{
                            'pr-9': true,
                            'color-input-error': parseError && !proposeMode,
                            'color-input-mode-flash': modeTransition,
                        }"
                        :style="inputStyle"
                        @keydown="onInputKeydown"
                        @input="onInputInput"
                        @focus="onInputFocus"
                        @blur="onInputBlur"
                    ></span>

                    <!-- Crown indicator for approved custom color names -->
                    <TooltipProvider v-if="currentColorMeta && !proposeMode" :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Crown
                                    :key="crownKey"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 w-[0.75em] h-[0.75em] text-[#daa520] opacity-75 hover:opacity-100 hover:scale-110 transition-[opacity,transform] cursor-help"
                                    :stroke-width="1.75"
                                    style="
                                        animation: crown-appear 0.6s ease-out forwards;
                                    "
                                />
                            </TooltipTrigger>
                            <TooltipContent class="fira-code text-xs max-w-[200px]">
                                <div class="grid gap-1">
                                    <span class="font-bold">{{
                                        currentColorMeta.name
                                    }}</span>
                                    <span
                                        v-if="currentColorMeta.contributor"
                                        class="text-muted-foreground"
                                    >
                                        by {{ currentColorMeta.contributor }}
                                    </span>
                                    <span class="text-muted-foreground">
                                        {{ currentColorMeta.css }}
                                    </span>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <!-- Inline send button -->
                    <button
                        v-if="proposeMode"
                        class="send-btn"
                        :disabled="!proposedName.trim() || proposing"
                        @click="submitProposedName"
                    >
                        <Loader2 v-if="proposing" class="w-3.5 h-3.5 animate-spin" />
                        <ArrowRight v-else class="w-4 h-4" :style="{ stroke: cssColorOpaque }" />
                    </button>
                    <button
                        v-else
                        class="send-btn"
                        @click="onSubmitColor"
                    >
                        <ArrowRight class="w-4 h-4" :style="{ stroke: cssColorOpaque }" />
                    </button>

                    <!-- Parse error popover -->
                    <Transition name="error-pop">
                        <span v-if="parseError && !proposeMode" class="error-badge"
                            >not a valid color</span
                        >
                    </Transition>
                </div>
            </HoverCardTrigger>

            <HoverCardContent v-if="!proposeMode" class="z-[var(--z-modal)] pointer-events-auto fraunces w-full">
                <p class="font-bold text-lg">Enter a color</p>
                <p>
                    <span class="italic">Any</span> valid CSS color string is accepted.
                </p>
                <Separator class="my-2" />

                <div class="fira-code w-full flex justify-center">
                    {{ denormalizedCurrentColor.value.toFormattedString() }}
                </div>
            </HoverCardContent>
        </HoverCard>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, useTemplateRef, watch } from "vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Separator } from "@components/ui/separator";
import { Crown, ArrowRight, Loader2 } from "lucide-vue-next";
import { proposeColorName } from "@lib/palette/api";
import { useSession } from "@composables/useSession";
import type { EditTarget } from ".";
import { COLOR_MODEL_KEY } from "./keys";

const props = defineProps<{
    editTarget: EditTarget | null;
    proposeMode?: boolean;
}>();

const {
    denormalizedCurrentColor,
    cssColor,
    cssColorOpaque,
    formattedCurrentColor,
    currentColorMeta,
    crownKey,
    canProposeName,
    parseAndSetColor,
    parseAndSetColorDebounced,
    parseError,
    updateModel,
    copyToClipboard,
    DIGITS,
} = inject(COLOR_MODEL_KEY)!;

const inputColorRef = useTemplateRef<HTMLElement>("inputColorRef");
const inputIsFocused = ref(false);

const inputStyle = computed(() => {
    if (!props.proposeMode && parseError.value) return { borderColor: "hsl(var(--destructive))" };
    if (inputIsFocused.value) return { borderColor: cssColor.value };
    return undefined;
});

const selectAll = () => {
    const target = inputColorRef.value;
    if (!target) return;
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    if (selection?.toString() === target.innerText) return;
    selection?.removeAllRanges();
    selection?.addRange(range);
};

const onInputFocus = () => {
    inputIsFocused.value = true;
    selectAll();
};
const onInputBlur = () => {
    inputIsFocused.value = false;
};
const onInputInput = (e: Event) => {
    const text = (e.target as HTMLElement).innerText;
    if (props.proposeMode) {
        proposedName.value = text;
    } else {
        parseAndSetColorDebounced(text);
    }
};
const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (props.proposeMode) {
            submitProposedName();
        } else {
            parseAndSetColor((e.target as HTMLElement).innerText);
        }
    }
};

const onSubmitColor = () => {
    if (inputColorRef.value) {
        parseAndSetColor(inputColorRef.value.innerText);
    }
};

const copyAndSetInputColor = () => {
    const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
    updateModel({ inputColor: color });
    copyToClipboard(color);
};

// Propose name state
const proposedName = ref("");
const proposing = ref(false);
const session = useSession();

async function submitProposedName() {
    if (!proposedName.value.trim() || proposing.value) return;
    proposing.value = true;
    try {
        await session.ensureSession();
        const cssStr = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
        await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
        proposedName.value = "";
        // Signal parent to exit propose mode
        if (inputColorRef.value) {
            inputColorRef.value.innerText = formattedCurrentColor.value;
        }
    } catch (e: any) {
        console.warn("[ColorInput] Failed to propose name:", e?.message);
    } finally {
        proposing.value = false;
    }
}

// Switch content when entering/exiting propose mode
const modeTransition = ref(false);

watch(() => props.proposeMode, (propose) => {
    if (!inputColorRef.value) return;
    // Flash animation
    modeTransition.value = true;
    setTimeout(() => { modeTransition.value = false; }, 300);

    if (propose) {
        proposedName.value = "";
        inputColorRef.value.innerText = "";
        inputColorRef.value.setAttribute("data-placeholder", "propose a name...");
        requestAnimationFrame(() => inputColorRef.value?.focus());
    } else {
        inputColorRef.value.removeAttribute("data-placeholder");
        inputColorRef.value.innerText = formattedCurrentColor.value;
    }
});

// Sync displayed text when not focused (only in color mode)
watch(formattedCurrentColor, (text) => {
    if (!props.proposeMode && !inputIsFocused.value && inputColorRef.value) {
        inputColorRef.value.innerText = text;
    }
});

onMounted(() => {
    if (inputColorRef.value) {
        inputColorRef.value.innerText = formattedCurrentColor.value;
    }
});

defineExpose({
    focus: () => inputColorRef.value?.focus(),
    inputIsFocused,
    copyAndSetInputColor,
    onSubmitColor,
    submitProposedName,
});
</script>

<style scoped>
@reference "../../../styles/style.css";

.color-input {
    border-color: hsl(var(--input));
    transition:
        border-color var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
    mask-image: linear-gradient(to right, black calc(100% - 2.5rem), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black calc(100% - 2.5rem), transparent 100%);
}
.color-input:focus {
    mask-image: none;
    -webkit-mask-image: none;
}

.color-input-error {
    box-shadow: 0 0 0 2px hsl(var(--destructive) / 0.25);
}

.color-input-mode-flash {
    animation: input-mode-flash 0.3s ease-out;
}

@keyframes input-mode-flash {
    0% { transform: scaleX(0.97); opacity: 0.6; }
    100% { transform: scaleX(1); opacity: 1; }
}

.color-input:empty[data-placeholder]::before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    pointer-events: none;
}

.send-btn {
    position: absolute;
    right: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.25rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease;
}
.send-btn:hover {
    transform: translateY(-50%) scale(1.1);
}
.send-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.error-badge {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    @apply text-xs;
    line-height: 1;
    padding: 0.2rem 0.4rem;
    border-radius: var(--radius-sm);
    background: hsl(var(--destructive));
    color: hsl(var(--destructive-foreground));
    white-space: nowrap;
    pointer-events: none;
    font-family: var(--font-sans);
}

.error-pop-enter-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}
.error-pop-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}
.error-pop-enter-from {
    opacity: 0;
    transform: translateY(-50%) scale(0.85);
}
.error-pop-leave-to {
    opacity: 0;
    transform: translateY(-50%) scale(0.85);
}

/* Crown indicator animation */
@keyframes crown-appear {
    0%   { opacity: 0; color: var(--color-gold-light); transform: scale(0) rotate(-15deg); }
    40%  { opacity: 1; color: var(--color-gold); transform: scale(1.4) rotate(5deg);
           filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.7)); }
    70%  { color: var(--color-gold); transform: scale(0.95) rotate(-2deg);
           filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.4)); }
    100% { color: var(--color-gold); transform: scale(1) rotate(0deg); filter: none; }
}
</style>
