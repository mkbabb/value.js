<template>
    <div class="grid grid-rows-[1fr_auto] gap-4 relative min-w-0">
        <Card class="grid items-between rounded-md min-w-0">
            <CardHeader class="fraunces m-0 pb-0 relative w-full px-3 sm:px-6 min-w-0 overflow-visible">
                <div class="w-full flex justify-between">
                    <Select
                        :ref="(el) => { selectedColorSpaceRef = el; }"
                        v-model:open="selectedColorSpaceOpenModel"
                        :model-value="model.selectedColorSpace"
                        @update:model-value="
                            (colorSpace: any) => {
                                updateModel({ selectedColorSpace: colorSpace });
                                selectedColorSpaceOpenModel = false;
                            }
                        "
                    >
                        <SelectTrigger
                            :style="{
                                color: cssColor,
                            }"
                            class="w-fit h-fit font-bold italic text-2xl p-0 m-0 border-none self-end focus:outline-none focus:ring-0 focus:ring-transparent bg-transparent select-none"
                        >
                            <SelectValue class="w-full" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup class="fira-code">
                                <SelectItem
                                    class="text-lg"
                                    v-for="space in Object.keys(COLOR_SPACE_RANGES)"
                                    :value="space"
                                    >{{ COLOR_SPACE_NAMES[space] }}</SelectItem
                                >
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <HeroBlob ref="heroBlobRef" @click="colorInputRef?.copyAndSetInputColor()" />
                </div>

                <CardTitle
                    class="flex h-fit text-4xl w-full m-0 p-0 focus-visible:outline-none gap-x-2 flex-wrap"
                >
                    <template
                        v-for="([component, value], ix) in colorComponents"
                        :key="component"
                    >
                        <div>
                            <span
                                contenteditable="true"
                                class="font-semibold focus-visible:outline-none"
                                @input="
                                    (e) => {
                                        const v = parseFloat((e.target as any).innerText);
                                        if (!Number.isNaN(v)) updateColorComponentDebounced(v, component);
                                    }
                                "
                                >{{
                                    currentColorComponentsFormatted[component].value
                                        .toFixed(1)
                                        .replace(/\.0$/, "")
                                        .replace(/^-0$/, "0")
                                }}
                            </span>
                            <span
                                v-if="
                                    currentColorComponentsFormatted[component].unit !==
                                    ''
                                "
                                class="font-normal italic text-lg"
                            >
                                {{
                                    currentColorComponentsFormatted[component].unit
                                }}</span
                            ><span class="inline font-normal">{{
                                ix !== colorComponents.length - 1
                                    ? ","
                                    : ""
                            }}</span>
                        </div>
                    </template>
                </CardTitle>
            </CardHeader>

            <CardContent class="z-1 fraunces grid grid-cols-1 gap-4 w-full m-auto px-3 sm:px-6 pb-4 min-w-0">
                <SpectrumCanvas />
                <ComponentSliders />

                <ColorInput ref="colorInputRef" :edit-target="editTarget" />

                <ActionToolbar
                    :css-color-opaque="cssColorOpaque"
                    :can-propose-name="canProposeName"
                    :is-editing="isEditing"
                    :palette-active="paletteDialogOpen || isEditing"
                    :propose-form-open="colorInputRef?.showProposeForm ?? false"
                    @reset="emit('reset')"
                    @copy="colorInputRef?.copyAndSetInputColor()"
                    @random="setCurrentColor(generateRandomColor(model.selectedColorSpace))"
                    @open-palette="openPaletteDialog"
                    @toggle-propose="colorInputRef && (colorInputRef.showProposeForm = !colorInputRef.showProposeForm)"
                />
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
    </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import {
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
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

import HeroBlob from "./HeroBlob.vue";
import SpectrumCanvas from "./SpectrumCanvas.vue";
import ComponentSliders from "./ComponentSliders.vue";
import ColorInput from "./ColorInput.vue";
import ActionToolbar from "./ActionToolbar.vue";
import EditDrawer from "./EditDrawer.vue";

const model = defineModel<ColorModel>({ required: true });
const emit = defineEmits<{ reset: [] }>();

// --- Color model composable + provide ---

const colorModel = useColorModel(model);
provide(COLOR_MODEL_KEY, colorModel);

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

// --- Color space selector ---

const selectedColorSpaceOpen = ref(false);
const selectedColorSpaceOpenModel = computed({
    get: () => selectedColorSpaceOpen.value,
    set: (val: boolean) => { selectedColorSpaceOpen.value = val; },
});
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
