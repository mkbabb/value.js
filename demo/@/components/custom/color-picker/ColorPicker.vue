<template>
    <!-- The shell never self-clamps (R.W3 Lane A / A4 — the grid owns the
         clamp via the .pane-container min() formula; the mobile slot wrapper
         owns the sub-lg width). -->
    <div class="pane-shell flex flex-col relative min-w-0 w-full mx-auto h-auto max-h-full">
        <Card tier="resting" class="relative flex flex-col rounded-card min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-x-hidden overflow-y-auto lg:overflow-visible">
            <!-- U-F9 (T-61/§0.8) — the scroll-contraction sentinel: a 0-height
                 marker riding the TOP of the Card scroll container (the picker
                 Card is the mobile scroll host, overflow-y-auto). useHeaderCondense
                 observes it; crossing the threshold condenses the whole header
                 block to ONE short strip. -->
            <div ref="headerSentinel" class="header-sentinel" aria-hidden="true"></div>
            <!-- The header is a DISPLAY surface (space title + hero numbers →
                 Fraunces); horizontal padding rides `cqi` against the pane-slot
                 container, not viewport breakpoints (R.W3 Lane A / A4) — and is
                 symmetric now that the blob reservation lives on the title row
                 alone (S.W4-2 / S-19).
                 U-F9 — `picker-header` carries the ONE-LAW rhythm (Row A) + the
                 sticky whole-header contraction (Row B, T-61/§0.8, header.css);
                 `gap-y-1` retires into the `--picker-header-rhythm` token. -->
            <CardHeader
                ref="pickerHeaderEl"
                :class="[
                    'picker-header font-display m-0 pt-3 pb-0 z-10 w-full px-[clamp(0.75rem,4cqi,1.5rem)] min-w-0 overflow-visible flex flex-col items-start',
                    condensed ? 'is-condensed' : '',
                ]"
            >
                <!-- Title row = THE BEAD'S BAND (T.W4-5 · D8; t-contradictions
                     C1 order: the seat re-derives AGAINST the settled ×φ title
                     and the freed tuple). The blob's reservation is scoped
                     HERE and remains the ONE W20-locked seat formula (never a
                     measured nudge, never a hand px): padding-right and
                     min-height stay 0.76·fp while W29 changes only rendered
                     Blob paint. The routed witness must keep the READOUT
                     collision-free — the line-lock capacity keeps the full
                     header width by construction. Both bind in the scoped
                     block (.title-row). -->
                <div class="title-row w-full min-w-0">
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
                :style="plateOpening ? { '--stagger-base': '220ms' } : undefined"
            >
                <div class="flex flex-col gap-3">
                    <SpectrumCanvas />
                    <ComponentSliders />
                </div>
            </CardContent>
        </Card>

        <!-- T.W4-5 — THE SEAT (D8 · Q3 "Flush." · the T-30 centre-ward
             rider): the bead is a PAPERWEIGHT ON THE PLATE — wrapper flush
             to the card corner (--blob-seat: 0), the WHOLE composition
             seated INSIDE the card at every viewport by the containment
             identity (orbit-reach 0.49 ≤ 0.5 of the wrapper ⇒ no clip, no
             dock collision, no seam skewer, no About amputation — BY
             CONSTRUCTION; only the transparent 1.6× canvas overscan crosses
             the card edge, clipped by .app-layout). The R3 corner-break law
             (center-on-radius-origin + ≥25%-overflow arms + the <lg 8rem
             hand arm) is DEAD; ONE cqi formula sizes every band. The z law
             is the NAMED --z-ornament tier (Q3b: content-top, chrome above).
             Geometry: `.pane-shell`/`.hero-blob-anchor` below.

             T.W2-4 — THE EMERGE BEAT (B4): the blob EMERGES, never appears.
             `blobReady` stays the W3-2 IDLE deferral (work defers);
             `ornamentOpen` is the overture's B4 predicate — an early chunk
             WAITS for the beat, a late chunk emerges on resolution through
             the same pose (boot/overture.css `blob-emerge` — the sanctioned
             interim until P6 row-F lands). `@vue:mounted` stamps overture:b4. -->
        <HeroBlob
            v-if="blobReady && ornamentOpen"
            class="hero-blob-anchor"
            @vue:mounted="overture?.noteOrnamentEmerge()"
        />

        <!-- T21 (R.W4 Lane E): the mounted-but-display:none EditDrawer is
             DELETED — the edit UX lives in the dock; the commit/cancel state
             machine below stays (keyboard + dock consumers). -->
        <PointerDebugOverlay />
    </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader } from "../../ui/card";
import ColorSpaceSelector from "./display/ColorSpaceSelector.vue";
import ColorComponentDisplay from "./display/ColorComponentDisplay/ColorComponentDisplay.vue";
import {
    computed,
    defineAsyncComponent,
    inject,
    onMounted,
    onUnmounted,
    provide,
    ref,
    shallowRef,
    useTemplateRef,
    watch,
} from "vue";
import { useMagicKeys } from "@vueuse/core";
import { useIdleReady } from "@mkbabb/glass-ui/dom";
import type { ColorModel, EditTarget } from ".";
import { toCSSColorString, resolveColorSpace } from ".";
import { COLOR_MODEL_KEY } from "../../../../color-session/keys";
import type { ActionBarContext } from "../../../../color-session/keys";
import { OVERTURE_KEY } from "../../../../color-picker/composables/boot/useOverture";
import { VIEW_MANAGER_KEY } from "../../../../shell/useViewManager";
import { COLOR_TARGET_PORT_KEY } from "../../../../palettes/usePalettePorts";

import { usePointerDebug, POINTER_DEBUG_KEY } from "./composables/usePointerDebug";
import { useHeaderCondense } from "./composables/useHeaderCondense";
import "./seat.css";
import "./header.css";

import { copyToClipboard } from "@mkbabb/glass-ui";
import SpectrumCanvas from "./controls/SpectrumCanvas/SpectrumCanvas.vue";
import ComponentSliders from "./controls/ComponentSliders/ComponentSliders.vue";
import PointerDebugOverlay from "./visual/PointerDebugOverlay.vue";

const emit = defineEmits<{
    reset: [];
    "update:editTarget": [target: EditTarget | null];
}>();

// --- W3-2 (S.W3 · S-23 eager-shell deferral) ---
// HeroBlob wraps glass-ui's Blob — the WebGL2 metaball renderer + shaders +
// mood/pointer/satellite FSMs. That graph bundles into the demo's eager
// `index` chunk (ColorPicker is the SOLE eager importer of the blob
// COMPONENT surface). Loading it async splits the whole metaball graph out of
// the cold-load JS; `useIdleReady` (the glass-ui-first `scheduleAfterFirstPaint`
// idiom, `@mkbabb/glass-ui/dom`) then mounts it behind the first post-paint
// idle tick. The blob's footprint is reserved by construction (S.W4-2), so the
// deferred mount causes no layout shift.
const HeroBlob = defineAsyncComponent(() => import("./visual/HeroBlob.vue"));
const { ready: blobReady } = useIdleReady();

// T.W2-4 — the B4 consume: the overture's ornament beat (injected; a
// standalone/test mount without the App shell keeps the pre-overture
// behavior — open immediately).
const overture = inject(OVERTURE_KEY, null);
const ornamentOpen = computed(() => overture?.b4.value ?? true);

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

// U-F9 (T-61/§0.8) — the whole-header scroll contraction. The sentinel rides
// the top of the Card scroll container; `condensed` flips past the threshold
// and drives the `.is-condensed` strip state (header.css). Threshold sits below
// the 390 card overflow (~32px at the tightest witnessed phone band) so the
// contraction is reachable on the mobile scroll where the picker actually
// scrolls; the desktop picker fits (no scroll → stays expanded, correct). The
// composable reserves the condense deficit on the scroll root imperatively so
// the toggle stays stable on barely-overflowing content (no oscillation).
const headerSentinel = useTemplateRef<HTMLElement>("headerSentinel");
// glass-ui's <CardHeader> is a single-root SFC; the template ref exposes the
// component proxy, whose `$el` is the header <div> the composable measures.
const pickerHeaderRef = useTemplateRef("pickerHeaderEl");
const pickerHeaderEl = computed<HTMLElement | null>(
    () => (pickerHeaderRef.value as { $el?: HTMLElement } | null)?.$el ?? null,
);
const { condensed } = useHeaderCondense(headerSentinel, pickerHeaderEl, {
    threshold: 16,
});

const viewManager = inject(VIEW_MANAGER_KEY)!;
const paletteManager = inject(COLOR_TARGET_PORT_KEY);

const {
    updateModel,
    cssColor,
    cssColorOpaque,
    colorComponents,
    currentColorComponentsFormatted,
    formattedCurrentColor,
    canProposeName,
    savedColorStrings,
    parseColor,
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
    const parsed = parseColor(target.originalCss);
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
    copy: () => {
        updateModel({ inputColor: formattedCurrentColor.value });
        copyToClipboard(formattedCurrentColor.value);
    },
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
    parseColor,
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

// --- The orchestrated open (R.W3 Lane E / E1; retimed S.W3-5) ---
// One breath, three beats, trimmed to a ~0.85s total (was 1.1–1.2s — the S-9
// taste pass: a TOOL's fresh-mount breath, not a marketing splash): plate-land
// (440ms, the cartoon shadow casting in) → field paint-in (SpectrumCanvas) →
// the channel stagger (+220ms via --stagger-base above). The flag drops at
// 850ms — after the last channel lands (~760ms), 90ms slack — so space-change
// stagger re-fires run undelayed.
const plateOpening = ref(true);

// --- Lifecycle ---

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    window.setTimeout(() => { plateOpening.value = false; }, 850);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
</script>

<style scoped>
@reference "../../../../styles/foundation.css";

.pane-shell {
    /* W3-4 (S.W3): the `margin` layout-property transition is DELETED — margin
       morphs forced a reflow every frame of the swap. Transform only now.
       T.W5-R11 (T-14 / D7): the nudge is a SPATIAL travel — it rides
       `--transition-liquid-spatial` at the spring's OWN clock
       (`--spring-smooth-duration`), never a bezier on a generic clock; the
       producer's PRM carve re-aliases the token to `--ease-standard` under
       reduced motion. */
    transition: transform var(--spring-smooth-duration) var(--transition-liquid-spatial);
}

/* T.W4-5 — THE SEAT lives in the colocated grammar sheet (./seat.css —
 * imported in <script setup>; the W2-close overture.css precedent: every
 * seat selector is unique to THIS template, so the global rules bind
 * identically to the former scoped ones; PP-8 cap seam). */

/* T.W2 beat grammar — the B4 EMERGE POSE (`blob-emerge` on
 * `.hero-blob-anchor`, no-pop law) and the B1 plate SHADOW CAST-IN
 * (`plate-land` on `.pane-shell > :first-child`, the LCP reveal-only law)
 * live in the boot-colocated overture grammar sheet
 * (demo/color-picker/composables/boot/overture.css). Both selectors are
 * unique to THIS template, so the global rules bind identically to the
 * former scoped ones (moved at the W2-close PP-8 cap cure). */
</style>
