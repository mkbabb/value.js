<template>
    <!-- The shell never self-clamps (R.W3 Lane A / A4 — the grid owns the
         clamp via the .pane-container min() formula; the mobile slot wrapper
         owns the sub-lg width). -->
    <div class="pane-shell flex flex-col relative min-w-0 w-full mx-auto h-auto max-h-full">
        <Card tier="resting" class="relative flex flex-col rounded-card min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-x-hidden overflow-y-auto lg:overflow-visible">
            <!-- R.W3 Lane D / D2 — the dual-hero diagonal (U30b, N.W16 D1-4):
                 the blob is the MATERIAL hero, absolutely top-right on the
                 relative Card (corner-break at lg, where overflow is visible;
                 tucked inside the clipped mobile card), out of the header
                 grid entirely. The numbers are the TYPOGRAPHIC hero on the
                 reading axis below-left — never the same channel at the same
                 position. -->
            <!-- The deep negative inset is calibrated to the GooBlob canvas:
                 the visible metaball body sits inset ~25% within its square
                 canvas, so a true corner-break needs the canvas well past the
                 card edge. -->
            <HeroBlob
                v-if="blobReady"
                class="absolute z-20 top-0 right-0 lg:-top-14 lg:-right-12"
                @click="onHeroBlobClick()"
            />

            <!-- The header is a DISPLAY surface (space title + hero numbers →
                 Fraunces); horizontal padding rides `cqi` against the pane-slot
                 container, not viewport breakpoints (R.W3 Lane A / A4) — and is
                 symmetric now that the blob reservation lives on the title row
                 alone (S.W4-2 / S-19). -->
            <CardHeader class="font-display m-0 pt-3 pb-0 relative z-10 w-full px-[clamp(0.75rem,4cqi,1.5rem)] min-w-0 overflow-visible flex flex-col gap-y-1 items-start">
                <!-- Title row: the blob's static footprint RESERVATION (D1-4:
                     by construction, never a measured nudge) is scoped HERE.
                     The blob's canvas occupies the title band only (y ≈
                     −56…120 at lg; it never descends into the readout row),
                     so only the title pays for the corner-break — the hero
                     numbers below span the FULL header width and Lab inks
                     ONE line at the desktop rung (S.W4-2 / S-19;
                     design-picker P1-1). -->
                <div class="w-full min-w-0 pr-24 lg:pr-36">
                    <ColorSpaceSelector
                        :model-value="model.selectedColorSpace"
                        v-model:open="selectedColorSpaceOpen"
                        :css-color="cssColor"
                        @update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"
                    />
                </div>

                <ColorComponentDisplay
                    :color-components="colorComponents"
                    :formatted="currentColorComponentsFormatted"
                    :space="model.selectedColorSpace"
                    @update="(v, c) => updateColorComponentDebounced(v, c)"
                    @input="onComponentInput"
                />
            </CardHeader>

            <!-- The content region is the CONTROLS zone — body voice, never a
                 blanket display face (the three-voice law, R.W3 Lane A / A1;
                 the channel-rail letters opt into `font-display` themselves). -->
            <!-- R.W3 Lane E / E1 — beat three of the orchestrated open: during
                 the opening breath only, `--stagger-base` pushes the channel
                 cascade after plate-land (beat one, below) + the field's
                 paint-in (beat two, SpectrumCanvas). Space-change re-fires of
                 `.stagger-children` see the var unset → 0ms, exactly as before. -->
            <CardContent
                class="z-1 flex flex-col w-full px-[clamp(0.75rem,4cqi,1.5rem)] pt-3 pb-[clamp(1rem,3.5cqi,1.25rem)] min-w-0 lg:flex-1 lg:min-h-0"
                :style="plateOpening ? { '--stagger-base': '360ms' } : undefined"
            >
                <div class="flex flex-col gap-3">
                    <SpectrumCanvas />
                    <ComponentSliders />
                </div>
            </CardContent>
        </Card>

        <!-- T21 (R.W4 Lane E): the mounted-but-display:none EditDrawer is
             DELETED — the edit UX lives in the dock; the commit/cancel state
             machine below stays (keyboard + dock consumers). -->
        <PointerDebugOverlay />
    </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@components/ui/card";
import ColorSpaceSelector from "./display/ColorSpaceSelector.vue";
import ColorComponentDisplay from "./display/ColorComponentDisplay.vue";
import {
    computed,
    defineAsyncComponent,
    inject,
    onMounted,
    onUnmounted,
    provide,
    ref,
    shallowRef,
    watch,
} from "vue";
import { useMagicKeys } from "@vueuse/core";
import { useIdleReady } from "@mkbabb/glass-ui/dom";
import type { ColorModel, EditTarget } from ".";
import { toCSSColorString, resolveColorSpace } from ".";
import { COLOR_MODEL_KEY } from "./keys";
import type { ActionBarContext } from "./keys";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

import { usePointerDebug, POINTER_DEBUG_KEY } from "./composables/usePointerDebug";

import { copyToClipboard } from "@mkbabb/glass-ui";
import SpectrumCanvas from "./controls/SpectrumCanvas.vue";
import ComponentSliders from "./controls/ComponentSliders.vue";
import PointerDebugOverlay from "./visual/PointerDebugOverlay.vue";

const emit = defineEmits<{
    reset: [];
    "update:editTarget": [target: EditTarget | null];
}>();

// --- W3-2 (S.W3 · S-23 eager-shell deferral) ---
// HeroBlob wraps glass-ui's GooBlob — the WebGL2 metaball renderer + shaders +
// mood/pointer/satellite FSMs. That graph bundles into the demo's eager
// `index` chunk (ColorPicker is the SOLE eager importer of the goo-blob
// COMPONENT surface). Loading it async splits the whole metaball graph out of
// the cold-load JS; `useIdleReady` (the glass-ui-first `scheduleAfterFirstPaint`
// idiom, `@mkbabb/glass-ui/dom`) then mounts it behind the first post-paint
// idle tick. The blob's footprint is reserved by construction (S.W4-2), so the
// deferred mount causes no layout shift.
const HeroBlob = defineAsyncComponent(() => import("./visual/HeroBlob.vue"));
const { ready: blobReady } = useIdleReady();

// --- Color model: inject the ONE pipeline (S.W2 · W2-1 transposition) ---
// The former `defineModel` + local `useColorModel` shallowRef copy are gone.
// App owns the model and provides the merged pipeline via COLOR_MODEL_KEY; the
// picker is a pure injected consumer. `model` is the App-owned ShallowRef, so
// writes land synchronously (no prop→emit round-trip → no read-after-write
// staleness). Descendant controls inject the same key from App's provide.
const colorModel = inject(COLOR_MODEL_KEY)!;
const { model } = colorModel;

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

// --- The orchestrated open (R.W3 Lane E / E1) ---
// One breath, three beats: plate-land (560ms, the cartoon shadow casting in)
// → field paint-in (+180ms, SpectrumCanvas) → the channel stagger (+360ms
// via --stagger-base above). The flag drops after the breath so space-change
// stagger re-fires run undelayed.
const plateOpening = ref(true);

// --- Lifecycle ---

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    window.setTimeout(() => { plateOpening.value = false; }, 1200);
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

/* R.W3 Lane E / E1 — beat one: the plate placement (treatment §MOTION-1).
 * The specimen plate is PLACED — it settles in with a slight rotation and
 * the cartoon shadow CASTS IN as it lands (the editorial signature in
 * motion). Reuses --spring-snappy + --shadow-cartoon; PRM-gated whole. */
@media (prefers-reduced-motion: no-preference) {
    @keyframes plate-land {
        from {
            opacity: 0;
            transform: translateY(-12px) rotate(-0.6deg);
            box-shadow: 0 0 0 0 transparent;
        }
        to {
            opacity: 1;
            transform: none;
            box-shadow: var(--shadow-cartoon);
        }
    }
    .pane-shell > :first-child {
        animation: plate-land 560ms var(--spring-snappy) both;
    }
}
</style>
