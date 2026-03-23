<template>
    <!-- Global SVG filter for watercolor swatches -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
            <filter
                id="watercolor-filter"
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="4"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1.5"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            <!-- Hero-specific watercolor: scaled for native 115px rendering -->
            <filter
                id="watercolor-filter-hero"
                x="-12%"
                y="-12%"
                width="124%"
                height="124%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.022"
                    numOctaves="4"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="2.7"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            <!-- Gooey metaball filter — parameters scaled for 115px hero blob -->
            <filter
                id="gooey-filter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                color-interpolation-filters="sRGB"
            >
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 12 -5"
                    result="goo"
                />
                <feGaussianBlur in="goo" stdDeviation="1" result="goo-smooth" />
                <feBlend in="SourceGraphic" in2="goo-smooth" />
            </filter>
        </defs>
    </svg>

    <div class="app-layout">
        <canvas
            ref="atmosphereCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none"
        />
        <TopDock
            :css-color-opaque="cssColorOpaque"
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
            <div class="lg:hidden w-full min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch">
                <Transition name="pane-left" mode="out-in">
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
                <Transition name="pane-left" mode="out-in">
                    <KeepAlive :max="3">
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
                            :css-color-opaque="cssColorOpaque"
                        />
                        <ExtractPane
                            v-else-if="currentConfig.left === 'extract'"
                            key="extract"
                            :css-color-opaque="cssColorOpaque"
                            :color-space="model.selectedColorSpace"
                        />
                        <GeneratePane
                            v-else-if="currentConfig.left === 'generate'"
                            key="generate"
                            ref="generatePaneRef"
                            :css-color-opaque="cssColorOpaque"
                        />
                        <GradientPane
                            v-else-if="currentConfig.left === 'gradient'"
                            key="gradient"
                            ref="gradientPaneRef"
                            :css-color-opaque="cssColorOpaque"
                        />
                        <AtmospherePane
                            v-else-if="currentConfig.left === 'atmosphere'"
                            key="atmosphere"
                            :css-color-opaque="cssColorOpaque"
                        />
                        <AdminPane
                            v-else-if="currentConfig.left === 'admin-users'"
                            key="admin-users"
                            sub-view="admin-users"
                            :css-color-opaque="cssColorOpaque"
                        />
                        <AdminPane
                            v-else-if="currentConfig.left === 'admin-names'"
                            key="admin-names"
                            sub-view="admin-names"
                            :css-color-opaque="cssColorOpaque"
                        />
                    </KeepAlive>
                </Transition>
            </div>

            <!-- Desktop: right pane (lg+) — always in DOM to preserve scroll-timeline state -->
            <div
                class="pane-wrapper hidden lg:block w-full min-w-0 min-h-0 h-full transition-opacity duration-200"
                :style="currentConfig.right === null ? 'visibility:hidden;position:absolute;pointer-events:none;opacity:0' : ''"
            >
                <Transition name="pane-right" mode="out-in">
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
                            :css-color-opaque="cssColorOpaque"
                            @commit-edit="colorPickerRef?.commitEdit()"
                            @cancel-edit="colorPickerRef?.cancelEdit()"
                        />
                        <MixPane
                            v-else-if="currentConfig.right === 'mix'"
                            key="mix"
                            ref="mixPaneRef"
                            :css-color-opaque="cssColorOpaque"
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
import { computed, onMounted, provide, ref, shallowRef, useTemplateRef, watch } from "vue";

import type { ColorModel, EditTarget } from "@components/custom/color-picker";
import {
    ColorPicker,
    defaultColorModel,
    createDefaultColorModel,
    toCSSColorString,
    colorToHexString,
} from "@components/custom/color-picker";

import { TopDock } from "@components/custom/top-dock";
import { RefreshCw, Copy, Save, RotateCcw, Pipette, Blend, Paintbrush, Trash2 } from "lucide-vue-next";
import type { DockActionBar } from "@composables/useDockActionBar";
import {
    AboutPane,
    PalettesPane,
    BrowsePane,
    ExtractPane,
    AdminPane,
    AtmospherePane,
    MixPane,
    GeneratePane,
    GradientPane,
} from "@components/custom/panes";

import MigratePalettesDialog from "@components/custom/palette-browser/MigratePalettesDialog.vue";

import { useStorage } from "@vueuse/core";
import { copyToClipboard } from "@composables/useClipboard";
import { normalizeColorUnit, colorUnit2 } from "@src/units/color/normalize";
import { parseCSSColor } from "@src/parsing/color";
import { CSS_NATIVE_SPACES } from "@components/custom/color-picker";
import { useCustomColorNames } from "@composables/useCustomColorNames";
import { useColorUrl } from "@composables/useColorUrl";
import { debounce } from "@src/utils";
import { useViewManager, VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { usePaletteManager } from "@composables/usePaletteManager";
import { useAtmosphereCanvas } from "@composables/useAtmosphereCanvas";

import "@styles/utils.css";
import "@styles/style.css";

// --- Color model ---

const atmosphereCanvas = useTemplateRef<HTMLCanvasElement>("atmosphereCanvas");
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);

const colorStore = useStorage("color-picker", defaultColorModel);
const model = shallowRef<ColorModel>(defaultColorModel);
const cssColor = computed(() => toCSSColorString(model.value.color));
const cssColorOpaque = computed(() => {
    const color = model.value.color;
    if (CSS_NATIVE_SPACES.has(color.value.colorSpace)) {
        const denorm = normalizeColorUnit(color, true, false);
        const c = denorm.clone() as typeof denorm;
        c.value.alpha.value = 100;
        return c.value.toFormattedString(2);
    }
    const c = color.clone();
    c.value.alpha.value = 1;
    return toCSSColorString(c);
});

const savedColorStrings = computed(() =>
    model.value.savedColors.map((c) =>
        normalizeColorUnit(c as any, true, false).toString(),
    ),
);

const updateModel = (patch: Partial<ColorModel>) => {
    model.value = { ...model.value, ...patch };
};

const resetToDefaults = () => {
    model.value = createDefaultColorModel();
};

// --- Edit target (synced from ColorPicker, provided for palette components + TopDock) ---

const activeEditTarget = shallowRef<EditTarget | null>(null);
const onEditTargetChange = (et: EditTarget | null) => { activeEditTarget.value = et; };
provide("activeEditTarget", activeEditTarget);

// --- View manager ---

const viewManager = useViewManager();
provide(VIEW_MANAGER_KEY, viewManager);

const currentConfig = computed(() => viewManager.currentConfig.value);

// --- Generic action bar (per-view) ---

const generatePaneRef = ref<any>(null);
const gradientPaneRef = ref<any>(null);
const mixPaneRef = ref<any>(null);

const genericActionBar = computed<DockActionBar | null>(() => {
    const view = viewManager.currentView.value;

    if (view === "generate") {
        return {
            label: "Tools",
            icon: Paintbrush,
            actions: computed(() => [
                { key: "regenerate", icon: RefreshCw, title: "Regenerate", description: "New random palette with current settings.", rotateOnClick: true, handler: () => generatePaneRef.value?.regenerate?.() },
                { key: "save", icon: Save, title: "Save palette", description: "Save the generated palette.", handler: () => generatePaneRef.value?.save?.() },
                { key: "copy", icon: Copy, title: "Copy colors", description: "Copy palette colors to clipboard.", handler: () => generatePaneRef.value?.copyColors?.() },
            ]),
        };
    }

    if (view === "gradient") {
        return {
            label: "Tools",
            icon: Paintbrush,
            actions: computed(() => [
                { key: "reset", icon: RotateCcw, title: "Reset", description: "Reset gradient to defaults.", rotateOnClick: true, handler: () => gradientPaneRef.value?.reset?.() },
                { key: "copy", icon: Copy, title: "Copy CSS", description: "Copy the gradient CSS to clipboard.", handler: () => gradientPaneRef.value?.copyCSS?.() },
                { key: "seed", icon: Pipette, title: "Seed from palette", description: "Seed gradient stops from a saved palette.", handler: () => gradientPaneRef.value?.seedFromPalette?.() },
            ]),
        };
    }

    if (view === "mix") {
        return {
            label: "Tools",
            icon: Paintbrush,
            actions: computed(() => [
                { key: "clear", icon: Trash2, title: "Clear", description: "Clear all selected colors.", handler: () => mixPaneRef.value?.clearSelection?.() },
                { key: "mix", icon: Blend, title: "Mix", description: "Mix the selected colors.", handler: () => mixPaneRef.value?.startMix?.() },
                { key: "copy", icon: Copy, title: "Copy result", description: "Copy the mixed color result.", handler: () => mixPaneRef.value?.copyResult?.() },
            ]),
        };
    }

    return null;
});

// --- Mobile pane (single slot below lg) ---

const mobileComponent = computed(() => {
    const cfg = currentConfig.value;
    // If two panes, mobilePaneIndex picks which one
    if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
        // Show right pane
        if (cfg.right === "about") return AboutPane;
        if (cfg.right === "palettes") return PalettesPane;
        if (cfg.right === "mix") return MixPane;
    }
    // Show left pane
    if (cfg.left === "color-picker") return ColorPicker;
    if (cfg.left === "browse") return BrowsePane;
    if (cfg.left === "extract") return ExtractPane;
    if (cfg.left === "generate") return GeneratePane;
    if (cfg.left === "gradient") return GradientPane;
    if (cfg.left === "atmosphere") return AtmospherePane;
    if (cfg.left === "admin-users") return AdminPane;
    if (cfg.left === "admin-names") return AdminPane;
    return ColorPicker;
});

const mobileKey = computed(() => {
    const cfg = currentConfig.value;
    if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
        return cfg.right;
    }
    return cfg.left;
});

const mobileProps = computed(() => {
    const cfg = currentConfig.value;
    if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
        if (cfg.right === "about") return { modelValue: model.value, "onUpdate:modelValue": (v: ColorModel) => { model.value = v; }, cssColor: cssColor.value };
        if (cfg.right === "palettes") return { savedColorStrings: savedColorStrings.value, cssColorOpaque: cssColorOpaque.value, "onCommit-edit": () => colorPickerRef.value?.commitEdit(), "onCancel-edit": () => colorPickerRef.value?.cancelEdit() };
        if (cfg.right === "mix") return { cssColorOpaque: cssColorOpaque.value };
    }
    if (cfg.left === "color-picker") return { modelValue: model.value, "onUpdate:modelValue": (v: ColorModel) => { model.value = v; }, "onUpdate:editTarget": onEditTargetChange, onReset: resetToDefaults, ref: colorPickerRef, class: "picker-shell w-full" };
    if (cfg.left === "browse") return { cssColorOpaque: cssColorOpaque.value };
    if (cfg.left === "extract") return { cssColorOpaque: cssColorOpaque.value, colorSpace: model.value.selectedColorSpace };
    if (cfg.left === "generate") return { cssColorOpaque: cssColorOpaque.value };
    if (cfg.left === "gradient") return { cssColorOpaque: cssColorOpaque.value };
    if (cfg.left === "atmosphere") return { cssColorOpaque: cssColorOpaque.value };
    if (cfg.left === "admin-users") return { subView: "admin-users", cssColorOpaque: cssColorOpaque.value };
    if (cfg.left === "admin-names") return { subView: "admin-names", cssColorOpaque: cssColorOpaque.value };
    return {};
});

// --- Palette manager ---

const paletteManager = usePaletteManager({
    currentView: viewManager.currentView,
    savedColorStrings,
    emitApply: (colors: string[]) => {
        if (colorPickerRef.value) {
            colorPickerRef.value.onPaletteApply(colors);
        } else {
            // ColorPicker not mounted (e.g. extract view) — update model directly
            // Only set the current color; do NOT replace savedColors
            if (colors.length === 0) return;
            try {
                const parsed = normalizeColorUnit(parseCSSColor(colors[0]));
                const resolvedSpace = model.value.selectedColorSpace === "hex" ? "rgb" : model.value.selectedColorSpace;
                const color = colorUnit2(parsed, resolvedSpace, true, false, false);
                updateModel({
                    color,
                    inputColor: colors[0],
                    selectedColorSpace: model.value.selectedColorSpace,
                });
            } catch { /* ignore parse errors */ }
        }
    },
    emitAddColor: (css: string) => {
        // Add color directly to model — no need for ColorPicker to be mounted
        // Only switch view if on a view that has no palettes pane (extract already has one on the right)
        const cur = viewManager.currentView.value;
        if (cur !== "picker" && cur !== "palettes" && cur !== "extract") {
            viewManager.switchView("palettes");
        }
        try {
            const parsed = parseCSSColor(css);
            if (!parsed) return;
            const normalized = normalizeColorUnit(parsed);
            const newStr = normalizeColorUnit(normalized, true, false).value.toFormattedString(2);

            // Check for duplicate: compare formatted strings
            const savedColors = [...model.value.savedColors];
            const existingIdx = savedColors.findIndex((c: any) => {
                try {
                    return normalizeColorUnit(c, true, false).value.toFormattedString(2) === newStr;
                } catch { return false; }
            });

            if (existingIdx >= 0) {
                // Already exists — move to front if not already first
                if (existingIdx > 0) {
                    const [existing] = savedColors.splice(existingIdx, 1);
                    savedColors.unshift(existing);
                    model.value = { ...model.value, savedColors };
                }
                // If already first, do nothing
            } else {
                // New color — prepend
                savedColors.unshift(normalized);
                model.value = { ...model.value, savedColors };
            }
        } catch {
            // If we can't parse directly, fall back to ColorPicker
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
        // Stay on palettes view (picker + palettes side-by-side on desktop)
        // Only switch if we're not already on a view that has the color picker
        const cur = viewManager.currentView.value;
        if (cur !== "picker" && cur !== "palettes") {
            viewManager.switchView("palettes");
        }
        // On mobile, show the picker pane (left) so the user can edit
        viewManager.mobilePaneIndex.value = 0;
        // Wait for ColorPicker to mount if needed, then start edit
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
        const trySetCurrent = () => {
            if (colorPickerRef.value?.applyExternalColor) {
                colorPickerRef.value.applyExternalColor(css);
                return;
            }
            try {
                const parsed = normalizeColorUnit(parseCSSColor(css));
                const resolvedSpace = model.value.selectedColorSpace === "hex" ? "rgb" : model.value.selectedColorSpace;
                const color = colorUnit2(parsed, resolvedSpace, true, false, false);
                const inputColor = model.value.selectedColorSpace === "hex"
                    ? colorToHexString(color)
                    : normalizeColorUnit(color, true, false).value.toFormattedString(2);
                updateModel({
                    color,
                    inputColor,
                    selectedColorSpace: model.value.selectedColorSpace,
                });
            } catch {
                // ignore parse errors
            }
        };
        trySetCurrent();
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
        linkCopiedTimer = setTimeout(() => {
            linkCopied.value = false;
        }, 2000);
    }
};

// --- Storage sync ---

const syncColorToStorage = debounce(
    (color: any) => {
        colorStore.value.inputColor = color?.toString() ?? "";
    },
    200,
    false,
);

watch(
    () => model.value.color,
    (color) => {
        syncColorToStorage(color);
    },
);

// Persist opaque color for flash-free page load background
watch(cssColorOpaque, (c) => {
    try { localStorage.setItem("color-picker-bg", c); } catch {}
}, { immediate: true });

watch(
    () => model.value.savedColors,
    (colors) => {
        colorStore.value.savedColors = colors.map((c) =>
            normalizeColorUnit(c as any, true, false).toString(),
        );
    },
);

// Bidirectional URL ↔ model sync
useColorUrl({ model, updateModel });

const { loadFromAPI: loadCustomColorNames } = useCustomColorNames();

const atmosphereConfig = useAtmosphereCanvas(atmosphereCanvas, cssColorOpaque);
provide("atmosphereConfig", atmosphereConfig);

onMounted(() => {
    loadCustomColorNames();
});
</script>

<style scoped>
/* Smooth layout transitions for pane wrappers */
.pane-wrapper {
    transition: height var(--duration-slow) var(--ease-standard),
                margin var(--duration-slow) var(--ease-standard),
                padding var(--duration-slow) var(--ease-standard);
}

/* ── Pane slide — shared enter/leave with CSS variable direction ── */
.pane-slide-enter-active {
    transition: transform 280ms var(--ease-pane);
}
.pane-slide-leave-active {
    transition: transform var(--duration-fast) var(--ease-pane-exit);
}
.pane-slide-enter-from,
.pane-slide-leave-to {
    transform: translateX(var(--pane-slide-dir, -110%)) rotate(var(--pane-slide-rot, -2deg));
}

/* ── Legacy aliases — kept for KeepAlive cache keys ── */
.pane-left-enter-active {
    transition: transform 280ms var(--ease-pane);
}
.pane-left-leave-active {
    transition: transform var(--duration-fast) var(--ease-pane-exit);
}
.pane-left-enter-from {
    transform: translateX(-110%) rotate(-2deg);
}
.pane-left-leave-to {
    transform: translateX(-110%) rotate(-2deg);
}

.pane-right-enter-active {
    transition: transform 280ms var(--ease-pane);
}
.pane-right-leave-active {
    transition: transform var(--duration-fast) var(--ease-pane-exit);
}
.pane-right-enter-from {
    transform: translateX(110%) rotate(2deg);
}
.pane-right-leave-to {
    transform: translateX(110%) rotate(2deg);
}
</style>
