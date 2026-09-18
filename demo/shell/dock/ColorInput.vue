<template>
    <div class="grid grid-cols-1 gap-y-2 p-0 m-0">
        <Popover
            trigger="hover"
            :close-delay="0"
            :open-delay="300"
            class="pointer-events-auto w-full"
        >
            <PopoverTrigger as-child>
                <div class="relative w-full flex items-center cursor-default">
                    <span
                        ref="inputColorRef"
                        contenteditable
                        role="textbox"
                        :aria-label="proposeMode ? 'Propose a color name' : 'Enter a CSS color'"
                        class="color-input w-full block border overflow-hidden items-center bg-background rounded-input px-3 py-2 focus-visible:outline-none fira-code text-ellipsis whitespace-nowrap text-center"
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
                                    class="absolute right-2 top-1/2 -translate-y-1/2 w-[0.75em] h-[0.75em] text-gold opacity-75 hover:opacity-100 hover:scale-110 transition-[opacity,transform] cursor-help"
                                    :stroke-width="1.75"
                                    style="
                                        animation: crown-appear var(--duration-panel) var(--ease-decelerate) forwards;
                                    "
                                />
                            </TooltipTrigger>
                            <TooltipContent class="text-mono-small max-w-tooltip">
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

                    <!-- Inline send button — T.W5-R5: the spatial hover/press
                         legs come from the producer `btn-interactive` atom
                         (scale @ --spring-smooth-duration on
                         --transition-liquid-spatial, house press/hover
                         magnitudes + focus register); .send-btn keeps only
                         seat geometry (see the scoped block). -->
                    <button
                        v-if="proposeMode"
                        class="send-btn btn-interactive"
                        :disabled="!proposedName.trim() || proposing"
                        @click="submitProposedName"
                    >
                        <Loader2 v-if="proposing" class="w-3.5 h-3.5 animate-spin" />
                        <ArrowRight v-else class="w-4 h-4" :style="{ stroke: safeAccent }" />
                    </button>
                    <button
                        v-else
                        class="send-btn btn-interactive"
                        @click="onSubmitColor"
                    >
                        <ArrowRight class="w-4 h-4" :style="{ stroke: safeAccent }" />
                    </button>

                    <!-- Parse error popover — celebration family (a one-shot
                         feedback beat; geometry vars live on .error-badge). -->
                    <Transition name="vj-celebrate">
                        <span v-if="parseError && !proposeMode" class="error-badge"
                            >not a valid color</span
                        >
                    </Transition>
                </div>
            </PopoverTrigger>

            <PopoverContent v-if="!proposeMode" class="pointer-events-auto font-display w-full">
                <!-- T.W4-6 (T-15/F7): popover title → display voice, ≤500
                     non-bold (the `font-bold` 700 dies with the sweep). -->
                <p class="font-display font-medium text-subheading">Enter a color</p>
                <p>
                    <span class="italic">Any</span> valid CSS color string is accepted.
                </p>
                <Separator class="my-2" />

                <div class="fira-code w-full flex justify-center">
                    {{ serializePickerColor(currentPhysicalColor) }}
                </div>

                <!-- E4 (Q10): the Parse-Lab echo (AST + gamut verdict). -->
                <Separator class="my-2" />
                <ParseEchoReadout />
            </PopoverContent>
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, useTemplateRef, watch } from "vue";
import { writeClipboard } from "@mkbabb/glass-ui";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../ui/tooltip";
import { Separator } from "../../ui/separator";
import { Crown, ArrowRight, Loader2 } from "@lucide/vue";
import ParseEchoReadout from "./ParseEchoReadout.vue";
import { proposeColorName } from "../../color-session/color-names";
import { useSession } from "../../platform/auth/useSession";
import type { EditTarget } from "../../color-session/color-model";
import { serializePickerColor } from "../../color-session/picker-color";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";

const { proposeMode } = defineProps<{
    editTarget: EditTarget | null;
    proposeMode?: boolean;
}>();

const {
    currentPhysicalColor,
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
} = inject(COLOR_MODEL_KEY)!;

const safeAccent = inject(SAFE_ACCENT_KEY)!;

const inputColorRef = useTemplateRef<HTMLElement>("inputColorRef");
const inputIsFocused = ref(false);

const inputStyle = computed(() => {
    if (!proposeMode && parseError.value) return { borderColor: "var(--destructive)" };
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
    // U9: repaint the canonical current colour on blur so uncommitted/invalid
    // typed text never lingers. A dock-triggered reset blurs the field first, so
    // this is the path that makes the contenteditable repaint unconditionally to
    // the (reset) model value — the `formattedCurrentColor` watch skips repaint
    // while focused, leaving stale text without this snap-back.
    if (!proposeMode && inputColorRef.value) {
        inputColorRef.value.innerText = formattedCurrentColor.value;
    }
};
const onInputInput = (e: Event) => {
    const text = (e.target as HTMLElement).innerText;
    if (proposeMode) {
        proposedName.value = text;
    } else {
        parseAndSetColorDebounced(text);
    }
};
const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (proposeMode) {
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
    const color = formattedCurrentColor.value;
    updateModel({ inputColor: color });
    void writeClipboard(color);
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
        const cssStr = serializePickerColor(currentPhysicalColor.value);
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

watch(() => proposeMode, (propose) => {
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
    if (!proposeMode && !inputIsFocused.value && inputColorRef.value) {
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
@reference "../../styles/foundation.css";

.color-input {
    border-color: var(--input);
    transition:
        border-color var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
    --input-action-width: 2.5rem;
    mask-image: linear-gradient(to right, black calc(100% - var(--input-action-width)), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black calc(100% - var(--input-action-width)), transparent 100%);
}
.color-input:focus {
    mask-image: none;
    -webkit-mask-image: none;
}

.color-input-error {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--destructive) 25%, transparent);
}

.color-input-mode-flash {
    animation: input-mode-flash var(--duration-slow) var(--ease-decelerate);
}

@keyframes input-mode-flash {
    0% { transform: scaleX(0.97); opacity: 0.6; }
    100% { transform: scaleX(1); opacity: 1; }
}

.color-input:empty[data-placeholder]::before {
    content: attr(data-placeholder);
    color: var(--muted-foreground);
    pointer-events: none;
}

/* T.W5-R5 (T-14 / D7): the bespoke transform-on-bezier hover/press recipe
 * (scale 1.1/0.95 composed into `transform` @ --duration-fast --ease-standard
 * — the F3 spatial-on-bezier stray) is RETIRED onto the producer
 * `btn-interactive` atom (template class): the scale longhand rides
 * --transition-liquid-spatial @ --spring-smooth-duration, press/hover
 * magnitudes + focus ring + disabled opacity are the house registers. This
 * block keeps ONLY the seat geometry — the static translateY(-50%) transform
 * composes cleanly under the atom's `scale` longhand. */
.send-btn {
    position: absolute;
    right: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.25rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
}
.send-btn:disabled {
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
    background: var(--destructive);
    color: var(--destructive-foreground);
    white-space: nowrap;
    pointer-events: none;
    font-family: var(--font-sans);
    /* vj-celebrate geometry: the badge rests at translateY(-50%), so the
       from-state matches it (pure pop, no positional jump). */
    --vj-celebrate-y: -50%;
    --vj-celebrate-scale: 0.85;
}

/* Crown indicator animation */
@keyframes crown-appear {
    0%   { opacity: 0; color: var(--color-gold-light); transform: scale(0) rotate(-15deg); }
    40%  { opacity: 1; color: var(--color-gold); transform: scale(1.4) rotate(5deg);
           filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-gold) 70%, transparent)); }
    70%  { color: var(--color-gold); transform: scale(0.95) rotate(-2deg);
           filter: drop-shadow(0 0 3px color-mix(in srgb, var(--color-gold) 40%, transparent)); }
    100% { color: var(--color-gold); transform: scale(1) rotate(0deg); filter: none; }
}
</style>
