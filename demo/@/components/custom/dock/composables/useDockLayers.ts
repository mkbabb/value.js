// useDockLayers — owns activeLayer and the layer-dispatch watch.
// Receives mobileEditActive, slugEditMode, and actionBarLayerActive as reactive
// refs/computeds (gate (c): never unwrapped values) so the immediate:true watch
// fires against live reactive sources regardless of call order.
import { ref, watch } from "vue";
import type { Ref, ComputedRef } from "vue";

export interface UseDockLayersReturn {
    activeLayer: Ref<string>;
}

export interface UseDockLayersOptions {
    mobileEditActive: ComputedRef<boolean> | Ref<boolean>;
    slugEditMode: Ref<boolean>;
    actionBarLayerActive: Ref<boolean>;
}

export function useDockLayers(options: UseDockLayersOptions): UseDockLayersReturn {
    const { mobileEditActive, slugEditMode, actionBarLayerActive } = options;

    const activeLayer = ref<string>("main");

    // Gate (c): all three deps arrive as reactive refs/computeds — the immediate
    // run reads their live .value, not a stale snapshot captured at call time.
    watch(
        [mobileEditActive, slugEditMode, actionBarLayerActive],
        () => {
            if (mobileEditActive.value) activeLayer.value = "mobile-edit";
            else if (slugEditMode.value) activeLayer.value = "slug-edit";
            else if (actionBarLayerActive.value) activeLayer.value = "action-bar";
            else activeLayer.value = "main";
        },
        { immediate: true },
    );

    return { activeLayer };
}
