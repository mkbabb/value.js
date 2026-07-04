<template>
    <!-- The shell never self-clamps (R.W3 Lane A / A4 — the grid owns the
         clamp via the .pane-container min() formula; the mobile slot wrapper
         owns the sub-lg width). -->
    <div class="pane-shell flex flex-col relative min-w-0 w-full mx-auto h-auto max-h-full">
        <Card tier="resting" class="flex flex-col rounded-card min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-x-hidden overflow-y-auto lg:overflow-visible">
            <!-- The header is a DISPLAY surface (space title + hero numbers →
                 Fraunces); horizontal padding rides `cqi` against the pane-slot
                 container, not viewport breakpoints (R.W3 Lane A / A4). -->
            <CardHeader class="font-display m-0 pt-3 pb-0 relative z-10 w-full px-[clamp(0.75rem,4cqi,1.5rem)] min-w-0 overflow-visible grid grid-cols-3 grid-rows-[auto_auto] gap-x-3 items-start">
                <ColorSpaceSelector
                    class="col-start-1 row-start-1"
                    :model-value="model.selectedColorSpace"
                    v-model:open="selectedColorSpaceOpen"
                    :css-color="cssColor"
                    @update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"
                />

                <ColorComponentDisplay
                    class="col-start-1 row-start-2"
                    :color-components="colorComponents"
                    :formatted="currentColorComponentsFormatted"
                    @update="(v, c) => updateColorComponentDebounced(v, c)"
                    @input="onComponentInput"
                />

                <HeroBlob ref="heroBlobRef" class="col-start-2 col-span-2 row-span-2 justify-self-end" @click="onHeroBlobClick()" />
            </CardHeader>

            <!-- The content region is the CONTROLS zone — body voice, never a
                 blanket display face (the three-voice law, R.W3 Lane A / A1;
                 the channel-rail letters opt into `font-display` themselves). -->
            <CardContent class="z-1 flex flex-col w-full px-[clamp(0.75rem,4cqi,1.5rem)] pt-3 pb-[clamp(1rem,3.5cqi,1.25rem)] min-w-0 lg:flex-1 lg:min-h-0">
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
import ColorSpaceSelector from "./display/ColorSpaceSelector.vue";
import ColorComponentDisplay from "./display/ColorComponentDisplay.vue";
import {
    computed,
    inject,
    onMounted,
    onUnmounted,
    provide,
    ref,
    shallowRef,
    watch,
} from "vue";
import { useMagicKeys } from "@vueuse/core";
import { useColorModel } from "./composables/useColorModel";
import type { ColorModel, EditTarget } from ".";
import { toCSSColorString, resolveColorSpace } from ".";
import { COLOR_MODEL_KEY } from "./keys";
import type { ActionBarContext } from "./keys";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

import { usePointerDebug, POINTER_DEBUG_KEY } from "./composables/usePointerDebug";

import { copyToClipboard } from "@mkbabb/glass-ui";
import HeroBlob from "./visual/HeroBlob.vue";
import SpectrumCanvas from "./controls/SpectrumCanvas.vue";
import ComponentSliders from "./controls/ComponentSliders.vue";
import EditDrawer from "./editing/EditDrawer.vue";
import PointerDebugOverlay from "./visual/PointerDebugOverlay.vue";

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

// Outside-dismiss is handled natively by reka-ui's Select (a proper popover);
// no custom document listener — one against the trigger element would treat the
// portaled SelectContent as "outside" and close the dropdown on pointerdown
// before an option can be selected (the dead-control root).
const selectedColorSpaceOpen = ref(false);

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
const preEditModel = shallowRef<ColorModel | null>(null);
const isEditing = computed(() => editTarget.value !== null);

// Emit edit target changes to parent
watch(editTarget, (et) => emit("update:editTarget", et));

function setEditTarget(target: EditTarget | null) {
    editTarget.value = target;
}

function onStartEdit(target: EditTarget) {
    // Snapshot: updateModel() replaces model.value wholesale, so holding
    // the reference is a valid pre-edit snapshot (no in-place mutation).
    preEditModel.value = model.value;
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
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
</script>

<style scoped>
@reference "../../../styles/style.css";

.pane-shell {
    transition:
        margin var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--ease-standard);
}
</style>
