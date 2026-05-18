<script setup lang="ts">
// A.W0 — Aurora boot fix.
//
// The previous AuroraPane bound the retired `useAuroraBlobs`/`AuroraBlobsConfig`
// schema (`colorMode`, `surfaceMode`, `blobCount`, the gradient-stop fields).
// glass-ui's current `AuroraConfig` is a different 30-field shape. Rather than
// stub the dead bindings, the pane renders an honest "under rework" state for
// W0; A.W6 rebuilds the slider table against the live `AuroraConfig`
// (`warpAmount`, `softmaxBeta`, `nucleiDrift`, `breathDepth`, `saturation`, ...)
// on glass-ui's `./configurator` surface.
import { Card } from "@components/ui/card";
import PaneHeader from "./PaneHeader.vue";
</script>

<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
            <PaneHeader description="Tune the background aurora atmosphere canvas.">
                Atmosphere
            </PaneHeader>

            <div class="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
                <p class="text-sm text-muted-foreground">
                    Atmosphere controls are temporarily unavailable while the tuning
                    panel is rebuilt against the updated Aurora configuration schema.
                </p>
                <p class="text-xs text-muted-foreground/70">
                    The background atmosphere itself is live.
                </p>
            </div>
        </Card>
    </div>
</template>
