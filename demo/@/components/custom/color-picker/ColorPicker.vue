<template>
    <div class="flex flex-col relative min-w-0 w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-auto max-h-full lg:max-h-[var(--content-max-h)] transition-[margin,transform] duration-300 ease-[var(--ease-standard)]">
        <Card class="flex flex-col rounded-2xl min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-hidden lg:overflow-visible transition-[box-shadow] duration-300 bg-card/75 backdrop-blur-sm">
            <CardHeader class="fraunces m-0 pt-3 pb-0 relative w-full px-3 sm:px-6 min-w-0 overflow-visible">
                <div class="w-full flex justify-between">
                    <ColorSpaceSelector
                        :model-value="model.selectedColorSpace"
                        v-model:open="selectedColorSpaceOpen"
                        :css-color="cssColor"
                        @update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"
                        @update:select-ref="(el: any) => { selectedColorSpaceRef = el; }"
                    />

                    <HeroBlob ref="heroBlobRef" @click="onHeroBlobClick()" />
                </div>

                <ColorComponentDisplay
                    :color-components="colorComponents"
                    :formatted="currentColorComponentsFormatted"
                    @update="(v, c) => updateColorComponentDebounced(v, c)"
                    @input="onComponentInput"
                />
            </CardHeader>

            <CardContent class="z-1 fraunces flex flex-col w-full px-3 sm:px-6 pt-3 pb-4 sm:pb-5 min-w-0 lg:flex-1 lg:min-h-0">
                <div class="flex flex-col gap-3">
                    <SpectrumCanvas />
                    <ComponentSliders />
                </div>
            </CardContent>
        </Card>

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
    inject,
    onMounted,
    onUnmounted,
    provide,
    ref,
    watch,
} from "vue";
import { useMagicKeys } from "@vueuse/core";
import { useColorModel } from "@composables/useColorModel";
import type { ColorModel, EditTarget } from ".";
import { toCSSColorString, resolveColorSpace } from ".";
import { COLOR_MODEL_KEY } from "./keys";
import type { ActionBarContext } from "./keys";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";

import { usePointerDebug } from "@composables/usePointerDebug";
import { POINTER_DEBUG_KEY } from "@composables/usePointerDebug";

import { copyToClipboard } from "@composables/useClipboard";
import HeroBlob from "./HeroBlob.vue";
import SpectrumCanvas from "./SpectrumCanvas.vue";
import ComponentSliders from "./ComponentSliders.vue";
import EditDrawer from "./EditDrawer.vue";
import PointerDebugOverlay from "./PointerDebugOverlay.vue";

const model = defineModel<ColorModel>({ required: true });
const emit = defineEmits<{
    reset: [];
    "update:editTarget": [target: EditTarget | null];
}>();

// --- Color model composable + provide ---

const colorModel = useColorModel(model);
provide(COLOR_MODEL_KEY, colorModel);

const pointerDebug = usePointerDebug();
provide(POINTER_DEBUG_KEY, pointerDebug);

const viewManager = inject(VIEW_MANAGER_KEY)!;
const paletteManager = inject(PALETTE_MANAGER_KEY);

const {
    updateModel,
    cssColor,
    cssColorOpaque,
    colorComponents,
    currentColorComponentsFormatted,
    formattedCurrentColor,
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
    applyExternalColor,
} = colorModel;

// --- HeroBlob click: copy color to clipboard ---

function onHeroBlobClick() {
    const color = formattedCurrentColor.value;
    updateModel({ inputColor: color });
    copyToClipboard(color);
}

// --- Component display input handler (general: parses text per component) ---

function onComponentInput(text: string, component: string) {
    if (component === "hex") {
        // Hex string input — parse and set color
        const hex = text.startsWith("#") ? text : `#${text}`;
        if (/^#[0-9a-fA-F]{3,8}$/.test(hex)) {
            parseAndSetColor(hex);
        }
    } else {
        // Numeric component — existing behavior
        const v = parseFloat(text);
        if (!Number.isNaN(v)) updateColorComponentDebounced(v, component);
    }
}

// --- Color space selector ---

const selectedColorSpaceOpen = ref(false);
const selectedColorSpaceRef = ref<any>(null);

// Close color space dropdown on any outside interaction
function onDocumentPointerDown(e: PointerEvent) {
    if (!selectedColorSpaceOpen.value) return;
    const selectEl = selectedColorSpaceRef.value?.$el ?? selectedColorSpaceRef.value;
    if (selectEl && !selectEl.contains(e.target as Node)) {
        selectedColorSpaceOpen.value = false;
    }
}

// --- Keyboard shortcuts ---

const keys = useMagicKeys();

const handleKeydown = (e: KeyboardEvent) => {
    if (isEditing.value) {
        if (e.key === "Escape") {
            e.preventDefault();
            cancelEdit();
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            commitEdit();
            return;
        }
    }

    if (keys.cmd?.value && keys.k?.value) {
        e.preventDefault();
        selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
    }
};

// --- Edit mode state machine ---

const editTarget = ref<EditTarget | null>(null);
const preEditModel = ref<ColorModel | null>(null);
const isEditing = computed(() => editTarget.value !== null);

// Emit edit target changes to parent
watch(editTarget, (et) => emit("update:editTarget", et));

function setEditTarget(target: EditTarget | null) {
    editTarget.value = target;
}

function onStartEdit(target: EditTarget) {
    preEditModel.value = { ...model.value };
    const parsed = parseAndNormalizeColor(target.originalCss);
    setCurrentColor(parsed, model.value.selectedColorSpace);
    setTimeout(() => setEditTarget(target), 120);
}

function commitEdit() {
    if (!editTarget.value || !paletteManager) return;
    const newCss = toCSSColorString(model.value.color);
    paletteManager.commitColorEdit(
        editTarget.value.paletteId,
        editTarget.value.colorIndex,
        newCss,
    );
    setEditTarget(null);
    preEditModel.value = null;
}

function cancelEdit() {
    if (preEditModel.value) {
        model.value = preEditModel.value;
    }
    setEditTarget(null);
    preEditModel.value = null;
}

// --- Action bar context for TopDock (exposed, not provided — TopDock is a sibling) ---

const paletteActive = computed(() => viewManager.currentView.value !== "picker" || isEditing.value);

const actionBarContext: ActionBarContext = {
    cssColorOpaque,
    formattedCurrentColor,
    isEditing,
    canProposeName,
    paletteActive,
    colorModel,
    reset: () => emit("reset"),
    copy: () => { updateModel({ inputColor: formattedCurrentColor.value }); copyToClipboard(formattedCurrentColor.value); },
    random: () => setCurrentColor(generateRandomColor(model.value.selectedColorSpace)),
};

const isTransitioning = ref(false);
defineExpose({
    isEditing,
    isTransitioning,
    editTarget,
    commitEdit,
    cancelEdit,
    onPaletteApply,
    onPaletteAddColor,
    parseAndNormalizeColor,
    setCurrentColor,
    applyExternalColor,
    onStartEdit,
    actionBarContext,
});

// --- Model watchers ---

watch(
    () => model.value.selectedColorSpace,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        updateToColorSpace(resolveColorSpace(newVal));
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
    document.addEventListener("pointerdown", onDocumentPointerDown, true);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("pointerdown", onDocumentPointerDown, true);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
</script>

<style scoped>
@reference "../../../styles/style.css";
</style>
