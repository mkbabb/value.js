<script setup lang="ts">
// AuroraPane — atmosphere tuning pane. Consumes ConfigSliderPane (Ae-6 merge).
//
// A.W0 — Aurora boot fix: the previous AuroraPane bound the retired
// `useAuroraBlobs`/`AuroraBlobsConfig` schema. glass-ui's current `AuroraConfig`
// is a different 30-field shape. Rather than stub the dead bindings, the pane
// renders an honest "under rework" state for W0; A.W6 rebuilds the slider table
// against the live `AuroraConfig` (`warpAmount`, `softmaxBeta`, `nucleiDrift`,
// `breathDepth`, `saturation`, ...) on glass-ui's `./configurator` surface.
//
// ConfigSliderPane renders empty-sections gracefully (no slider body, no dock).
import ConfigSliderPane from "./ConfigSliderPane.vue";
</script>

<template>
    <ConfigSliderPane
        :config="{}"
        :sections="[]"
        :defaults="{}"
        title="Atmosphere"
        description="Tune the background aurora atmosphere canvas."
    >
        <!-- Under-rework informational message (W0 state) -->
        <div class="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <p class="text-small text-muted-foreground">
                Atmosphere controls are temporarily unavailable while the tuning
                panel is rebuilt against the updated Aurora configuration schema.
            </p>
            <p class="text-caption text-muted-foreground/70">
                The background atmosphere itself is live.
            </p>
        </div>
    </ConfigSliderPane>
</template>
