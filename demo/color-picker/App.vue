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
            <filter
                id="gooey-filter"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
                color-interpolation-filters="sRGB"
            >
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 18 -7"
                    result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>

    <div
        class="grid overflow-x-hidden w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden items-center justify-items-stretch m-0 p-0 relative"
    >
        <canvas
            ref="atmosphereCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none"
        />
        <!-- TopDock -->
        <TopDock
            :css-color-opaque="cssColorOpaque"
            :link-copied="linkCopied"
            :edit-target="activeEditTarget"
            @share-link="shareLink"
            @commit-edit="colorPickerRef?.commitEdit(); viewManager.mobilePaneIndex.value = 1"
            @cancel-edit="colorPickerRef?.cancelEdit(); viewManager.mobilePaneIndex.value = 1"
        />

        <!-- Two-pane grid -->
        <div
            :class="[
                'grid grid-rows-[1fr] gap-6 relative max-w-screen-lg w-full mx-auto px-4 lg:px-2 h-[min(var(--content-h),var(--content-max-h))]',
                currentConfig.right !== null ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-1',
            ]"
        >
            <!-- Mobile: single pane slot (below lg) -->
            <div class="lg:hidden w-full min-w-0 min-h-0 h-full flex flex-col justify-center">
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
                    'justify-start',
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

            <!-- Desktop: right pane (lg+) -->
            <div
                v-if="currentConfig.right !== null"
                class="pane-wrapper hidden lg:block w-full min-w-0 min-h-0 h-full"
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
} from "@components/custom/color-picker";

import { TopDock } from "@components/custom/top-dock";
import {
    AboutPane,
    PalettesPane,
    BrowsePane,
    ExtractPane,
    AdminPane,

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

// --- Mobile pane (single slot below lg) ---

const mobileComponent = computed(() => {
    const cfg = currentConfig.value;
    // If two panes, mobilePaneIndex picks which one
    if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
        // Show right pane
        if (cfg.right === "about") return AboutPane;
        if (cfg.right === "palettes") return PalettesPane;
    }
    // Show left pane
    if (cfg.left === "color-picker") return ColorPicker;
    if (cfg.left === "browse") return BrowsePane;
    if (cfg.left === "extract") return ExtractPane;
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
    }
    if (cfg.left === "color-picker") return { modelValue: model.value, "onUpdate:modelValue": (v: ColorModel) => { model.value = v; }, "onUpdate:editTarget": onEditTargetChange, onReset: resetToDefaults, ref: colorPickerRef, class: "picker-shell w-full" };
    if (cfg.left === "browse") return { cssColorOpaque: cssColorOpaque.value };
    if (cfg.left === "extract") return { cssColorOpaque: cssColorOpaque.value, colorSpace: model.value.selectedColorSpace };
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

useAtmosphereCanvas(atmosphereCanvas, cssColorOpaque);

onMounted(() => {
    loadCustomColorNames();
});
</script>

<style scoped>
/* Smooth layout transitions for pane wrappers */
.pane-wrapper {
    transition: height 0.3s var(--ease-standard),
                margin 0.3s var(--ease-standard),
                padding 0.3s var(--ease-standard);
}

/* ── Left pane: slides off left, enters from left ── */
.pane-left-enter-active {
    transition: transform 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}
.pane-left-leave-active {
    transition: transform 0.15s cubic-bezier(0.5, 0, 1, 0.5);
}
.pane-left-enter-from {
    transform: translateX(-110%) rotate(-2deg);
}
.pane-left-leave-to {
    transform: translateX(-110%) rotate(-2deg);
}

/* ── Right pane: slides off right, enters from right ── */
.pane-right-enter-active {
    transition: transform 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}
.pane-right-leave-active {
    transition: transform 0.15s cubic-bezier(0.5, 0, 1, 0.5);
}
.pane-right-enter-from {
    transform: translateX(110%) rotate(2deg);
}
.pane-right-leave-to {
    transform: translateX(110%) rotate(2deg);
}
</style>
