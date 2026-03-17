<template>
    <div class="grid grid-rows-[auto_auto] gap-4 relative min-w-0 content-center lg:max-h-full">
        <Card class="flex flex-col rounded-2xl min-w-0 lg:overflow-hidden lg:min-h-0">
            <CardHeader class="fraunces m-0 pb-0 relative w-full px-3 sm:px-6 min-w-0 overflow-visible">
                <div class="w-full flex justify-between">
                    <ColorSpaceSelector
                        :model-value="model.selectedColorSpace"
                        v-model:open="selectedColorSpaceOpen"
                        :css-color="cssColor"
                        @update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"
                        @update:select-ref="(el: any) => { selectedColorSpaceRef = el; }"
                    />

                    <HeroBlob ref="heroBlobRef" @click="colorInputRef?.copyAndSetInputColor()" />
                </div>

                <ColorComponentDisplay
                    :color-components="colorComponents"
                    :formatted="currentColorComponentsFormatted"
                    @update="(v, c) => updateColorComponentDebounced(v, c)"
                />
            </CardHeader>

            <CardContent class="z-1 fraunces flex flex-col w-full px-3 sm:px-6 pb-0 min-w-0 lg:flex-1 lg:min-h-0">
                <div class="flex flex-col items-center gap-4 lg:flex-1 lg:min-h-0">
                    <div class="w-full lg:flex-1 lg:min-h-0 lg:overflow-hidden">
                        <SpectrumCanvas />
                    </div>
                    <div class="w-full shrink-0">
                        <ComponentSliders />
                    </div>
                </div>

                <div class="flex justify-center items-center mt-2 pb-3 -mx-3 sm:-mx-6 px-3 sm:px-6 shrink-0">
                    <GlassDock :collapse-delay="2000">
                        <div class="flex items-center gap-2">
                            <div class="grid relative items-center flex-1 min-w-[18rem] sm:min-w-[22rem]">
                                <ActionToolbar
                                    ref="actionToolbarRef"
                                    :inert="showInput || undefined"
                                    :class="[
                                        '[grid-area:1/1] transition-[opacity,transform] duration-200 ease-out',
                                        showInput ? 'opacity-0 -translate-y-1 pointer-events-none' : 'opacity-100 translate-y-0',
                                    ]"
                                    :css-color-opaque="cssColorOpaque"
                                    :can-propose-name="canProposeName"
                                    :is-editing="isEditing"
                                    :palette-active="paletteDialogOpen || isEditing"
                                    @reset="emit('reset')"
                                    @copy="colorInputRef?.copyAndSetInputColor()"
                                    @random="setCurrentColor(generateRandomColor(model.selectedColorSpace))"
                                    @open-palette="openPaletteDialog"
                                />
                                <ColorInput
                                    :inert="!showInput || undefined"
                                    ref="colorInputRef"
                                    :edit-target="editTarget"
                                    :propose-mode="toolbarMode === 'propose'"
                                    :class="[
                                        '[grid-area:1/1] transition-[opacity,transform] duration-200 ease-out',
                                        showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none',
                                    ]"
                                />
                            </div>

                            <div class="dock-separator"></div>

                            <!-- Toggle button -->
                            <div class="flex items-center shrink-0">
                                <div class="shrink-0 h-5 w-5 relative cursor-pointer" @click="cycleToolbarMode">
                                    <Transition name="toggle-icon" mode="out-in">
                                        <component
                                            :is="currentToggleIcon"
                                            :key="toolbarMode"
                                            class="toggle-btn h-5 w-5 stroke-foreground hover:scale-125 transition-[transform] cursor-pointer absolute inset-0"
                                            :style="{ '--toggle-hover-color': cssColorOpaque }"
                                        />
                                    </Transition>
                                </div>
                            </div>
                        </div>

                        <template #collapsed>
                            <WatercolorDot
                                :color="cssColorOpaque"
                                tag="div"
                                class="w-6 h-6 shrink-0"
                            />
                            <component
                                :is="currentToggleIcon"
                                class="h-4 w-4 stroke-foreground/60"
                            />
                        </template>
                    </GlassDock>
                </div>
            </CardContent>
        </Card>

        <!-- Palette browser sheet -->
        <PaletteDialog
            ref="paletteDialogRef"
            v-model:open="paletteDialogOpen"
            :saved-color-strings="savedColorStrings"
            :css-color="cssColor"
            :css-color-opaque="cssColorOpaque"
            :editing-exit="editingExit"
            :editing-enter="editingEnter"
            @apply="onPaletteApply"
            @add-color="onPaletteAddColor"
            @start-edit="onStartEdit"
        />

        <EditDrawer
            :edit-target="editTarget"
            @commit="commitEdit"
            @cancel="cancelEdit"
        />

        <PointerDebugOverlay />
    </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@components/ui/card";
import ColorSpaceSelector from "./ColorSpaceSelector.vue";
import ColorComponentDisplay from "./ColorComponentDisplay.vue";
import {
    computed,
    onMounted,
    onUnmounted,
    provide,
    ref,
    watch,
} from "vue";
import { useMagicKeys } from "@vueuse/core";
import { PaletteDialog } from "@components/custom/palette-browser";
import { useColorModel } from "@composables/useColorModel";
import type { ColorModel, EditTarget } from ".";
import { toCSSColorString } from ".";
import { COLOR_MODEL_KEY } from "./keys";

import { usePointerDebug } from "@composables/usePointerDebug";
import { POINTER_DEBUG_KEY } from "@composables/usePointerDebug";

import { EllipsisVertical, Type, Tag } from "lucide-vue-next";
import HeroBlob from "./HeroBlob.vue";
import SpectrumCanvas from "./SpectrumCanvas.vue";
import ComponentSliders from "./ComponentSliders.vue";
import ColorInput from "./ColorInput.vue";
import ActionToolbar from "./ActionToolbar.vue";
import EditDrawer from "./EditDrawer.vue";
import GlassDock from "./GlassDock.vue";
import PointerDebugOverlay from "./PointerDebugOverlay.vue";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const model = defineModel<ColorModel>({ required: true });
const emit = defineEmits<{ reset: [] }>();

// --- Color model composable + provide ---

const colorModel = useColorModel(model);
provide(COLOR_MODEL_KEY, colorModel);

const pointerDebug = usePointerDebug();
provide(POINTER_DEBUG_KEY, pointerDebug);

const {
    updateModel,
    cssColor,
    cssColorOpaque,
    colorComponents,
    currentColorComponentsFormatted,
    canProposeName,
    savedColorStrings,
    parseAndNormalizeColor,
    setCurrentColor,
    parseAndSetColor,
    parseAndSetColorDebounced,
    generateRandomColor,
    updateToColorSpace,
    updateColorComponentDebounced,
    onPaletteAddColor,
    onPaletteApply,
} = colorModel;

// --- Sub-component refs ---

const colorInputRef = ref<InstanceType<typeof ColorInput> | null>(null);
const actionToolbarRef = ref<InstanceType<typeof ActionToolbar> | null>(null);
const toolbarMode = ref<"actions" | "input" | "propose">("actions");
const showInput = computed(() => toolbarMode.value !== "actions");

function cycleToolbarMode() {
    if (toolbarMode.value === "actions") {
        toolbarMode.value = "input";
    } else if (toolbarMode.value === "input") {
        if (canProposeName.value) {
            toolbarMode.value = "propose";
        } else {
            toolbarMode.value = "actions";
        }
    } else {
        toolbarMode.value = "actions";
    }
}

const currentToggleIcon = computed(() => {
    if (toolbarMode.value === "actions") return Type;
    if (toolbarMode.value === "input") return canProposeName.value ? Tag : EllipsisVertical;
    return EllipsisVertical;
});


// --- Color space selector ---

const selectedColorSpaceOpen = ref(false);
const selectedColorSpaceRef = ref<any>(null);

// --- Keyboard shortcuts ---

const keys = useMagicKeys();

const handleKeydown = (e: KeyboardEvent) => {
    if (isEditing.value) {
        if (e.key === "Escape") {
            e.preventDefault();
            cancelEdit();
            return;
        }
        if (e.key === "Enter" && !colorInputRef.value?.inputIsFocused) {
            e.preventDefault();
            commitEdit();
            return;
        }
    }

    if (keys.cmd?.value && keys.k?.value) {
        e.preventDefault();
        selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
    }

    if (keys.cmd?.value && keys.i?.value) {
        e.preventDefault();
        colorInputRef.value?.focus();
    }
};

// --- Palette dialog ---

const paletteDialogOpen = ref(false);
const paletteDialogRef = ref<InstanceType<typeof PaletteDialog> | null>(null);

function openPaletteDialog() {
    actionToolbarRef.value?.clearHover();
    window.setTimeout(() => { paletteDialogOpen.value = true; }, 100);
}

// --- Edit mode state machine ---

const editTarget = ref<EditTarget | null>(null);
const preEditModel = ref<ColorModel | null>(null);
const isEditing = computed(() => editTarget.value !== null);
const editingExit = ref(false);
const editingEnter = ref(false);

function onStartEdit(target: EditTarget) {
    preEditModel.value = { ...model.value };
    editingExit.value = true;
    paletteDialogOpen.value = false;
    const parsed = parseAndNormalizeColor(target.originalCss);
    setCurrentColor(parsed);
    setTimeout(() => { editTarget.value = target; }, 120);
}

function reopenDialogFromEdit() {
    editingEnter.value = true;
    window.setTimeout(() => {
        paletteDialogOpen.value = true;
    }, 100);
}

function commitEdit() {
    if (!editTarget.value || !paletteDialogRef.value) return;
    const newCss = toCSSColorString(model.value.color);
    paletteDialogRef.value.commitColorEdit(
        editTarget.value.paletteId,
        editTarget.value.colorIndex,
        newCss,
    );
    editTarget.value = null;
    preEditModel.value = null;
    reopenDialogFromEdit();
}

function cancelEdit() {
    if (preEditModel.value) {
        model.value = preEditModel.value;
    }
    editTarget.value = null;
    preEditModel.value = null;
    reopenDialogFromEdit();
}

// Reset editing animation flags after transitions complete
watch(paletteDialogOpen, (open) => {
    if (open) {
        // Dialog just opened — clear the exit flag (enter flag stays for this session)
        editingExit.value = false;
    } else {
        // Dialog just closed — clear the enter flag (exit flag stays for the close animation)
        editingEnter.value = false;
    }
});

const isTransitioning = computed(() => editingExit.value || editingEnter.value);
defineExpose({ isEditing, isTransitioning });

// --- Model watchers ---

watch(
    () => model.value.selectedColorSpace,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        updateToColorSpace(newVal);
    },
);

watch(
    () => model.value.inputColor,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        parseAndSetColor(newVal);
    },
    { immediate: true },
);

// --- Lifecycle ---

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
</script>

<style scoped>
@reference "../../../styles/style.css";

.toggle-btn:hover {
    stroke: var(--toggle-hover-color);
}

/* Toggle icon transition */
.toggle-icon-enter-active,
.toggle-icon-leave-active {
    transition: opacity 0.12s ease, transform 0.12s ease;
}
.toggle-icon-enter-from {
    opacity: 0;
    transform: scale(0.7);
}
.toggle-icon-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

</style>
