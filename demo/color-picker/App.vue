<template>
    <SvgFilters />

    <div class="app-layout">
        <canvas
            ref="atmosphereCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none"
        />
        <Dock
            :link-copied="linkCopied"
            :edit-target="activeEditTarget"
            :action-bar="colorPickerRef?.actionBarContext ?? null"
            :generic-action-bar="genericActionBar"
            @share-link="shareLink"
            @commit-edit="colorPickerRef?.commitEdit(); viewManager.mobilePaneIndex.value = 1"
            @cancel-edit="colorPickerRef?.cancelEdit(); viewManager.mobilePaneIndex.value = 1"
        />

        <!-- Two-pane grid -->
        <div
            :class="[
                'pane-container',
                currentConfig.right !== null && 'pane-container--dual',
            ]"
        >
            <!-- Mobile: single pane slot (below lg) -->
            <div class="lg:hidden w-full max-w-md sm:max-w-lg mx-auto min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch">
                <Transition :name="viewManager.ready.value ? 'pane-left' : ''" mode="out-in">
                    <KeepAlive :max="5">
                        <component
                            :is="mobileComponent"
                            :key="mobileKey"
                            v-bind="mobileProps"
                        />
                    </KeepAlive>
                </Transition>
            </div>

            <!-- Desktop: left pane (lg+) -->
            <div
                :class="[
                    'pane-wrapper hidden lg:flex w-full min-w-0 min-h-0 h-full flex-col',
                    'justify-center',
                ]"
            >
                <Transition :name="viewManager.ready.value ? 'pane-left' : ''" mode="out-in">
                    <KeepAlive :max="6">
                        <ColorPicker
                            v-if="currentConfig.left === 'color-picker'"
                            key="color-picker"
                            ref="colorPickerRef"
                            class="picker-shell w-full"
                            v-model="model"
                            @reset="resetToDefaults"
                            @update:edit-target="onEditTargetChange"
                        />
                        <BrowsePane
                            v-else-if="currentConfig.left === 'browse'"
                            key="browse"
                        />
                        <ExtractPane
                            v-else-if="currentConfig.left === 'extract'"
                            key="extract"
                            :color-space="model.selectedColorSpace"
                        />
                        <GeneratePane
                            v-else-if="currentConfig.left === 'generate'"
                            key="generate"
                            ref="generatePaneRef"
                        />
                        <GradientPane
                            v-else-if="currentConfig.left === 'gradient'"
                            key="gradient"
                            ref="gradientPaneRef"
                        />
                        <AuroraPane
                            v-else-if="currentConfig.left === 'atmosphere'"
                            key="atmosphere"
                        />
                        <AdminPane
                            v-else-if="currentConfig.left.startsWith('admin-')"
                            :key="currentConfig.left"
                            :sub-view="currentConfig.left"
                        />
                    </KeepAlive>
                </Transition>
            </div>

            <!-- Desktop: right pane (lg+) — always in DOM to preserve scroll-timeline state -->
            <div
                class="pane-wrapper hidden lg:block w-full min-w-0 min-h-0 h-full transition-opacity duration-200"
                :style="currentConfig.right === null ? 'visibility:hidden;position:absolute;pointer-events:none;opacity:0' : ''"
            >
                <Transition :name="viewManager.ready.value ? 'pane-right' : ''" mode="out-in">
                    <KeepAlive :max="3">
                        <AboutPane
                            v-if="currentConfig.right === 'about'"
                            key="about"
                            v-model="model"
                            :css-color="cssColor"
                        />
                        <PalettesPane
                            v-else-if="currentConfig.right === 'palettes'"
                            key="palettes"
                            :saved-color-strings="savedColorStrings"
                            @commit-edit="colorPickerRef?.commitEdit()"
                            @cancel-edit="colorPickerRef?.cancelEdit()"
                        />
                        <MixPane
                            v-else-if="currentConfig.right === 'mix'"
                            key="mix"
                            ref="mixPaneRef"
                        />
                    </KeepAlive>
                </Transition>
            </div>
        </div>
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
import { computed, defineAsyncComponent, onMounted, provide, reactive, ref, shallowRef, useTemplateRef, watch } from "vue";

import type { ColorModel, EditTarget } from "@components/custom/color-picker";
import { ColorPicker } from "@components/custom/color-picker";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY, EDIT_TARGET_KEY } from "@components/custom/color-picker/keys";
import { useContrastSafeColor } from "@composables/color/useContrastSafeColor";

import { Dock } from "@components/custom/dock";
const AboutPane = defineAsyncComponent(() => import("@components/custom/panes/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("@components/custom/panes/PalettesPane.vue"));
const BrowsePane = defineAsyncComponent(() => import("@components/custom/panes/BrowsePane.vue"));
import MigratePalettesDialog from "@components/custom/palette-browser/MigratePalettesDialog.vue";
import SvgFilters from "@components/custom/svg-filters/SvgFilters.vue";

import { defaultColorModel } from "@components/custom/color-picker";
import { normalizeColorUnit, colorUnit2 } from "@src/units/color/normalize";
import { parseCSSColor } from "@src/parsing/color";
import { useCustomColorNames } from "@components/custom/color-picker/composables/useCustomColorNames";
import { useColorUrl } from "@components/custom/color-picker/composables/useColorUrl";

import { useViewManager, VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { useAppColorModel } from "@composables/color/useAppColorModel";
import { useGenericActionBar } from "@components/custom/dock/composables/useGenericActionBar";
import { useMobilePaneRouter, ExtractPane, GeneratePane, GradientPane, MixPane, AdminPane, AuroraPane } from "@composables/useMobilePaneRouter";
import { usePaletteManager } from "@composables/palette/usePaletteManager";
import { copyToClipboard } from "@composables/useClipboard";
import { useAurora } from "@mkbabb/glass-ui";
import type { AuroraConfig } from "@mkbabb/glass-ui";

import "@styles/utils.css";
import "@styles/style.css";

// --- Color model ---

const atmosphereCanvas = useTemplateRef<HTMLCanvasElement>("atmosphereCanvas");
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);
const model = shallowRef<ColorModel>(defaultColorModel);

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

// --- Generic action bar (per-view) ---

const generatePaneRef = ref<any>(null);
const gradientPaneRef = ref<any>(null);
const mixPaneRef = ref<any>(null);

const genericActionBar = useGenericActionBar(
    computed(() => viewManager.currentView.value),
    { generate: generatePaneRef, gradient: gradientPaneRef, mix: mixPaneRef },
);

// --- Mobile pane routing ---

const { mobileComponent, mobileKey, mobileProps } = useMobilePaneRouter(
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
);

// --- Palette manager ---

const paletteManager = usePaletteManager({
    currentView: viewManager.currentView,
    switchView: viewManager.switchView,
    savedColorStrings,
    emitApply: (colors: string[]) => {
        if (colorPickerRef.value) {
            colorPickerRef.value.onPaletteApply(colors);
        } else {
            if (colors.length === 0) return;
            applyColorString(colors[0]);
        }
    },
    emitAddColor: (css: string) => {
        const cfg = viewManager.currentConfig.value;
        if (cfg.right !== "palettes") {
            viewManager.switchView("palettes");
        }
        try {
            const parsed = parseCSSColor(css);
            if (!parsed) return;
            const normalized = normalizeColorUnit(parsed);
            const newStr = normalizeColorUnit(normalized, true, false).value.toFormattedString(2);

            const savedColors = [...model.value.savedColors];
            const existingIdx = savedColors.findIndex((c: any) => {
                try { return normalizeColorUnit(c, true, false).value.toFormattedString(2) === newStr; }
                catch { return false; }
            });

            if (existingIdx >= 0) {
                if (existingIdx > 0) {
                    const [existing] = savedColors.splice(existingIdx, 1);
                    savedColors.unshift(existing);
                    model.value = { ...model.value, savedColors };
                }
            } else {
                savedColors.unshift(normalized);
                model.value = { ...model.value, savedColors };
            }
        } catch {
            const tryAdd = () => {
                if (colorPickerRef.value) {
                    colorPickerRef.value.onPaletteAddColor(css);
                } else {
                    setTimeout(tryAdd, 50);
                }
            };
            tryAdd();
        }
    },
    emitStartEdit: (target) => {
        const cur = viewManager.currentView.value;
        if (cur !== "picker" && cur !== "palettes") {
            viewManager.switchView("palettes");
        }
        viewManager.mobilePaneIndex.value = 0;
        const tryStartEdit = () => {
            if (colorPickerRef.value) {
                colorPickerRef.value.onStartEdit(target);
            } else {
                setTimeout(tryStartEdit, 50);
            }
        };
        setTimeout(tryStartEdit, 50);
    },
    emitSetCurrentColor: (css: string) => {
        if (colorPickerRef.value?.applyExternalColor) {
            colorPickerRef.value.applyExternalColor(css);
        } else {
            applyColorString(css);
        }
    },
});

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

const auroraConfig = reactive<AuroraConfig>({
    colorMode: "derived",
    colors: [],
    surfaceMode: "color", surfaceAlpha: 0.70,
    blur: 100, speed: 0.40,
    blobCount: 10, baseRadius: 0.16, radiusVariance: 0.03,
    viewportAnchorRatio: 1.0,
    alphaLight: 0.80, alphaDark: 0.60,
    lShiftLarge: 0.15, lShiftSmall: 0.10, hueShiftLarge: 25, hueShiftSmall: 55,
    orbitAmplitude: 0.25, blendMode: "source-over",
    gradStop2: 0.30, gradStop3: 0.60, gradStop4: 1.00,
});
const { config: auroraConfigResult } = useAurora(atmosphereCanvas, auroraConfig, cssColorOpaque);
provide("auroraConfig", auroraConfigResult);

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
