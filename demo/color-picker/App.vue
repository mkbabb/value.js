<template>
    <SvgFilters />

    <div class="app-layout">
        <!-- W5-a11y: decorative aurora canvas — hidden from AT -->
        <canvas
            ref="atmosphereCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
        <!-- W5-a11y: nav landmark for the dock -->
        <nav aria-label="Application navigation">
            <Dock
                :link-copied="linkCopied"
                :edit-target="activeEditTarget"
                :action-bar="colorPickerRef?.actionBarContext ?? null"
                :generic-action-bar="actionBar"
                @share-link="shareLink"
                @commit-edit="colorPickerRef?.commitEdit(); viewManager.mobilePaneIndex.value = 1"
                @cancel-edit="colorPickerRef?.cancelEdit(); viewManager.mobilePaneIndex.value = 1"
            />
        </nav>

        <!-- W5-a11y: main landmark for pane content -->
        <main class="pane-main" aria-label="Color tool panes">
        <!-- Two-pane grid -->
        <div
            :class="[
                'pane-container',
                currentConfig.right !== null && 'pane-container--dual',
            ]"
        >
            <!-- Mobile: single pane slot (below lg) -->
            <div class="lg:hidden w-full max-w-md sm:max-w-lg mx-auto min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch">
                <PaneSlot
                    :component="mobile.component"
                    :component-key="mobile.key"
                    :component-props="mobile.props"
                    :transition-name="viewManager.ready.value ? 'pane-left' : ''"
                    :max="5"
                />
            </div>

            <!-- Desktop: left pane (lg+) -->
            <div class="pane-wrapper hidden lg:flex w-full min-w-0 min-h-0 h-full flex-col justify-center">
                <PaneSlot
                    :component="desktopLeft.component"
                    :component-key="desktopLeft.key"
                    :component-props="desktopLeft.props"
                    :on-mount="onDesktopLeftMount"
                    :transition-name="viewManager.ready.value ? 'pane-left' : ''"
                    :max="6"
                />
            </div>

            <!-- Desktop: right pane (lg+) — always in DOM to preserve KeepAlive scroll position -->
            <div
                class="pane-wrapper hidden lg:block w-full min-w-0 min-h-0 h-full transition-opacity duration-200"
                :class="currentConfig.right === null ? 'pane-wrapper--ghost' : ''"
            >
                <PaneSlot
                    :component="desktopRight.component"
                    :component-key="desktopRight.key"
                    :component-props="desktopRight.props"
                    :on-mount="onDesktopRightMount"
                    :transition-name="viewManager.ready.value ? 'pane-right' : ''"
                    :max="3"
                />
            </div>
        </div>
        </main>
    </div>

    <!-- Global modals -->
    <MigratePalettesDialog
        v-model:open="paletteManager.showMigrateDialog.value"
        :count="paletteManager.savedPalettes.value.length"
        :mode="paletteManager.migrateMode.value"
        @respond="paletteManager.onMigrateRespond"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, shallowRef } from "vue";

import type { ColorModel, EditTarget } from "@components/custom/color-picker";
import { ColorPicker } from "@components/custom/color-picker";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY, EDIT_TARGET_KEY } from "@components/custom/color-picker/keys";
import { useContrastSafeColor } from "@composables/color/useContrastSafeColor";

import { Dock } from "@components/custom/dock";
import MigratePalettesDialog from "@components/custom/palette-browser/MigratePalettesDialog.vue";
import SvgFilters from "@components/custom/svg-filters/SvgFilters.vue";
import PaneSlot from "@components/custom/panes/PaneSlot.vue";

import { defaultColorModel } from "@components/custom/color-picker";
import { useCustomColorNames } from "@components/custom/color-picker/composables/useCustomColorNames";
import { useColorUrl } from "@components/custom/color-picker/composables/useColorUrl";

import { useViewManager, VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { useAppColorModel } from "@composables/color/useAppColorModel";
import { usePaneRouter } from "@composables/usePaneRouter";
import { usePaletteManagerWiring } from "@composables/palette/usePaletteManagerWiring";
import { useGlobalDark } from "@components/custom/dark-mode-toggle";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { useAurora, DEFAULT_AURORA_CONFIG, type AuroraConfig } from "@mkbabb/glass-ui/aurora";

import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@components/custom/goo-blob";

import "@styles/utils.css";
import "@styles/style.css";

// --- Dark mode: initialize global dark state eagerly so the user's saved
//     preference takes effect before the Dock profile menu mounts. ---
useGlobalDark();

// --- Template refs ---
const atmosphereCanvas = ref<HTMLCanvasElement | null>(null);
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);
const model = shallowRef<ColorModel>(defaultColorModel);

// --- Color model ---
const {
    cssColor,
    cssColorOpaque,
    savedColorStrings,
    updateModel,
    resetToDefaults,
    applyColorString,
} = useAppColorModel(model);

// --- Edit target ---
const activeEditTarget = shallowRef<EditTarget | null>(null);
const onEditTargetChange = (et: EditTarget | null) => { activeEditTarget.value = et; };
provide(EDIT_TARGET_KEY, activeEditTarget);
provide(CSS_COLOR_KEY, cssColorOpaque);

const { safeAccentCss } = useContrastSafeColor(model, cssColorOpaque);
provide(SAFE_ACCENT_KEY, safeAccentCss);

// --- View manager ---
const viewManager = useViewManager();
provide(VIEW_MANAGER_KEY, viewManager);
const currentConfig = computed(() => viewManager.currentConfig.value);

// --- Pane action refs ---
// Populated by the onMount callbacks on the desktop PaneSlots; the action bar
// dispatches its per-view handlers onto them.
const generatePaneRef = ref<any>(null);
const gradientPaneRef = ref<any>(null);
const mixPaneRef = ref<any>(null);

// Ref-capture callbacks for desktop pane slots (replaces direct template refs).
// Called by PaneSlot's :on-mount prop when the inner component mounts/unmounts.
function onDesktopLeftMount(el: any) {
    const left = currentConfig.value.left;
    colorPickerRef.value = left === "color-picker" ? el : null;
    generatePaneRef.value = left === "generate" ? el : null;
    gradientPaneRef.value = left === "gradient" ? el : null;
}

function onDesktopRightMount(el: any) {
    mixPaneRef.value = currentConfig.value.right === "mix" ? el : null;
}

// --- Pane routing — one source of truth: mobile single-slot, the two desktop
//     slots, and the per-view action bar all derive from one route table. ---
const { mobile, desktopLeft, desktopRight, actionBar } = usePaneRouter(
    viewManager,
    model,
    {
        cssColor: () => cssColor.value,
        savedColorStrings: () => savedColorStrings.value,
        colorPickerRef: () => colorPickerRef.value,
        onEditTargetChange,
        resetToDefaults,
        updateModel: (v: ColorModel) => { model.value = v; },
    },
    { generate: generatePaneRef, gradient: gradientPaneRef, mix: mixPaneRef },
);

// --- Palette manager ---
const paletteManager = usePaletteManagerWiring(
    colorPickerRef,
    viewManager,
    model,
    applyColorString,
    savedColorStrings,
);

// --- Share link ---
const linkCopied = ref(false);
let linkCopiedTimer: ReturnType<typeof setTimeout> | undefined;

const shareLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
        linkCopied.value = true;
        clearTimeout(linkCopiedTimer);
        linkCopiedTimer = setTimeout(() => { linkCopied.value = false; }, 2000);
    }
};

// --- URL sync + custom color names ---
useColorUrl({ model, updateModel });
const { loadFromAPI: loadCustomColorNames } = useCustomColorNames();

// --- Aurora atmosphere ---
// W0 landed a static AuroraConfig; a glass-ui-derived picker-tracking palette
// is the conditional A.W6 work (re-scoped — docs/tranches/A/audit/W6-deferred.md).
const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG));
useAurora(atmosphereCanvas, () => auroraConfig, {
    onInitError: (err) => console.warn("[aurora] init failed:", err),
});
provide("auroraConfig", auroraConfig);

// --- Blob config ---
const blobConfig = reactive({ ...BLOB_CONFIG_DEFAULTS });
provide(BLOB_CONFIG_KEY, blobConfig);

onMounted(() => { loadCustomColorNames(); });
</script>

<style scoped>
@reference "../../demo/@/styles/style.css";

/* Smooth layout transitions for pane wrappers */
.pane-wrapper {
    transition: height var(--duration-slow) var(--ease-standard),
                margin var(--duration-slow) var(--ease-standard),
                padding var(--duration-slow) var(--ease-standard);
}

/* Ghost pane: always in DOM to preserve scroll-timeline state, but invisible
   and non-interactive. Replaces the former inline 5-property style hack. */
.pane-wrapper--ghost {
    visibility: hidden;
    position: absolute;
    pointer-events: none;
    opacity: 0;
}

/* ── Pane slide — shared enter/leave with CSS variable direction ── */
.pane-slide-enter-active {
    transition: transform var(--duration-slow) var(--spring-snappy);
}
.pane-slide-leave-active {
    transition: transform var(--duration-normal) var(--ease-out);
}
.pane-slide-enter-from,
.pane-slide-leave-to {
    transform: translateX(var(--pane-slide-dir, -110%)) rotate(var(--pane-slide-rot, -2deg));
}

/* ── Left pane transitions ── */
.pane-left-enter-active {
    transition: transform var(--duration-slow) var(--spring-snappy);
}
.pane-left-leave-active {
    transition: transform var(--duration-normal) var(--ease-out);
}
.pane-left-enter-from {
    transform: translateX(-110%) rotate(-2deg);
}
.pane-left-leave-to {
    transform: translateX(-110%) rotate(-2deg);
}

/* ── Right pane transitions ── */
.pane-right-enter-active {
    transition: transform var(--duration-slow) var(--spring-snappy);
}
.pane-right-leave-active {
    transition: transform var(--duration-normal) var(--ease-out);
}
.pane-right-enter-from {
    transform: translateX(110%) rotate(2deg);
}
.pane-right-leave-to {
    transform: translateX(110%) rotate(2deg);
}
</style>
