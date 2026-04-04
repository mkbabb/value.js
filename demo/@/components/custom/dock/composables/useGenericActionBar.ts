import { computed, type Ref, type ComputedRef } from "vue";
import { RefreshCw, Copy, Save, RotateCcw, Pipette, Blend, Paintbrush, Trash2 } from "lucide-vue-next";
import type { DockActionBar } from "@components/custom/dock/composables/useDockActionBar";

export function useGenericActionBar(
    currentView: ComputedRef<string>,
    paneRefs: {
        generate: Ref<any>;
        gradient: Ref<any>;
        mix: Ref<any>;
    },
): ComputedRef<DockActionBar | null> {
    return computed<DockActionBar | null>(() => {
        const view = currentView.value;

        if (view === "generate") {
            return {
                label: "Tools",
                icon: Paintbrush,
                actions: computed(() => [
                    { key: "regenerate", icon: RefreshCw, title: "Regenerate", description: "New random palette with current settings.", rotateOnClick: true, handler: () => paneRefs.generate.value?.regenerate?.() },
                    { key: "save", icon: Save, title: "Save palette", description: "Save the generated palette.", handler: () => paneRefs.generate.value?.save?.() },
                    { key: "copy", icon: Copy, title: "Copy colors", description: "Copy palette colors to clipboard.", handler: () => paneRefs.generate.value?.copyColors?.() },
                ]),
            };
        }

        if (view === "gradient") {
            return {
                label: "Tools",
                icon: Paintbrush,
                actions: computed(() => [
                    { key: "reset", icon: RotateCcw, title: "Reset", description: "Reset gradient to defaults.", rotateOnClick: true, handler: () => paneRefs.gradient.value?.reset?.() },
                    { key: "copy", icon: Copy, title: "Copy CSS", description: "Copy the gradient CSS to clipboard.", handler: () => paneRefs.gradient.value?.copyCSS?.() },
                    { key: "seed", icon: Pipette, title: "Seed from palette", description: "Seed gradient stops from a saved palette.", handler: () => paneRefs.gradient.value?.seedFromPalette?.() },
                ]),
            };
        }

        if (view === "mix") {
            return {
                label: "Tools",
                icon: Paintbrush,
                actions: computed(() => [
                    { key: "clear", icon: Trash2, title: "Clear", description: "Clear all selected colors.", handler: () => paneRefs.mix.value?.clearSelection?.() },
                    { key: "mix", icon: Blend, title: "Mix", description: "Mix the selected colors.", handler: () => paneRefs.mix.value?.startMix?.() },
                    { key: "copy", icon: Copy, title: "Copy result", description: "Copy the mixed color result.", handler: () => paneRefs.mix.value?.copyResult?.() },
                ]),
            };
        }

        return null;
    });
}
