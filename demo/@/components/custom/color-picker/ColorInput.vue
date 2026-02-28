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
                        class="w-full block border overflow-hidden items-center border-input bg-background rounded-sm px-3 py-2 focus-visible:outline-none fira-code text-ellipsis whitespace-nowrap text-center transition-colors"
                        :class="{ 'pr-8': currentColorMeta }"
                        :style="inputIsFocused ? { borderColor: cssColor } : undefined"
                        @keydown="onInputKeydown"
                        @input="onInputInput"
                        @focus="onInputFocus"
                        @blur="onInputBlur"
                    ></span>

                    <!-- Crown indicator for approved custom color names -->
                    <TooltipProvider v-if="currentColorMeta" :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Crown
                                    :key="crownKey"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 w-[0.75em] h-[0.75em] text-[#daa520] opacity-75 hover:opacity-100 hover:scale-110 transition-[opacity,transform] cursor-help"
                                    :stroke-width="1.75"
                                    style="animation: crown-appear 0.6s ease-out forwards"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="fira-code text-xs max-w-[200px]">
                                <div class="grid gap-1">
                                    <span class="font-bold">{{ currentColorMeta.name }}</span>
                                    <span v-if="currentColorMeta.contributor" class="text-muted-foreground">
                                        by {{ currentColorMeta.contributor }}
                                    </span>
                                    <span class="text-muted-foreground">
                                        {{ currentColorMeta.css }}
                                    </span>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </HoverCardTrigger>

            <HoverCardContent
                class="z-[100] pointer-events-auto fraunces w-full"
            >
                <p class="font-bold text-lg">Enter a color</p>
                <p>
                    <span class="italic">Any</span> valid CSS color string
                    is accepted.
                </p>
                <Separator class="my-2" />

                <div class="fira-code w-full flex justify-center">
                    {{ denormalizedCurrentColor.value.toFormattedString() }}
                </div>
            </HoverCardContent>
        </HoverCard>

        <!-- Propose Name inline form -->
        <Transition name="slug-reveal" @after-enter="scrollProposeFormIntoView">
            <div v-if="!editTarget && canProposeName && showProposeForm" ref="proposeFormRef">
                <div class="relative">
                    <Input
                        v-model="proposedName"
                        placeholder="Propose a name..."
                        class="fira-code text-sm h-8 pr-8"
                        @keydown.enter="submitProposedName"
                    />
                    <button
                        class="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                        :disabled="!proposedName.trim() || proposing"
                        @click="submitProposedName"
                    >
                        <Loader2 v-if="proposing" class="w-3.5 h-3.5 animate-spin" />
                        <Sparkles v-else class="w-3.5 h-3.5" :style="{ stroke: cssColorOpaque }" />
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, useTemplateRef, watch } from "vue";
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
import Separator from "@components/ui/separator/Separator.vue";
import { Input } from "@components/ui/input";
import { Crown, Sparkles, Loader2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { proposeColorName } from "@lib/palette/api";
import type { EditTarget } from ".";
import { COLOR_MODEL_KEY } from "./keys";

const props = defineProps<{
    editTarget: EditTarget | null;
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
    updateModel,
    copyToClipboard,
    DIGITS,
} = inject(COLOR_MODEL_KEY)!;

const inputColorRef = useTemplateRef<HTMLElement>("inputColorRef");
const inputIsFocused = ref(false);

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

const onInputFocus = () => { inputIsFocused.value = true; selectAll(); };
const onInputBlur = () => { inputIsFocused.value = false; };
const onInputInput = (e: Event) => {
    parseAndSetColorDebounced((e.target as HTMLElement).innerText);
};
const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        parseAndSetColor((e.target as HTMLElement).innerText);
    }
};

const copyAndSetInputColor = () => {
    const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
    updateModel({ inputColor: color });
    copyToClipboard(color);
};

// Propose name state
const showProposeForm = ref(false);
const proposedName = ref("");
const proposing = ref(false);
const proposeFormRef = ref<HTMLElement | null>(null);

function scrollProposeFormIntoView() {
    const el = proposeFormRef.value;
    if (!el) return;

    let scrollable: HTMLElement | null = el.parentElement;
    while (scrollable) {
        const { overflowY } = getComputedStyle(scrollable);
        if (overflowY === "auto" || overflowY === "scroll") {
            const elRect = el.getBoundingClientRect();
            const containerRect = scrollable.getBoundingClientRect();
            const offset = elRect.bottom - containerRect.bottom;
            if (offset > 0) {
                scrollable.scrollBy({ top: offset + 16, behavior: "smooth" });
            }
            return;
        }
        scrollable = scrollable.parentElement;
    }
    el.scrollIntoView({ behavior: "smooth", block: "end" });
}

async function submitProposedName() {
    if (!proposedName.value.trim() || proposing.value) return;
    proposing.value = true;
    try {
        const cssStr = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
        await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
        toast.success(`Proposed "${proposedName.value}" for review`);
        proposedName.value = "";
        showProposeForm.value = false;
    } catch (e: any) {
        toast.error(e?.message ?? "Failed to propose name");
    } finally {
        proposing.value = false;
    }
}

// Sync displayed text when not focused
watch(formattedCurrentColor, (text) => {
    if (!inputIsFocused.value && inputColorRef.value) {
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
    showProposeForm,
});
</script>
