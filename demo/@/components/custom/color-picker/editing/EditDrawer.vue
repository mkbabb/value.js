<template>
    <Teleport to="body">
        <Transition name="edit-drawer">
            <div v-if="editTarget" class="edit-drawer p-4 flex flex-col gap-3 items-center">
                <p class="text-mono-small text-muted-foreground uppercase tracking-wider">Editing color</p>
                <div class="flex items-center justify-center gap-2">
                    <WatercolorDot
                        :color="editTarget.originalCss"
                        tag="div"
                        class="w-14 h-14 shrink-0 opacity-60"
                    />
                    <span class="text-muted-foreground text-xs">&rarr;</span>
                    <WatercolorDot
                        :color="cssColorOpaque"
                        tag="div"
                        class="w-14 h-14 shrink-0 ring-2 ring-primary/50"
                    />
                </div>
                <div class="flex gap-6 mt-2 justify-center w-full">
                    <TooltipProvider :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Check
                                    class="h-14 aspect-square stroke-foreground hover:scale-125 active:scale-90 transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none rounded-sm"
                                    @click="emit('commit')"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="text-mono-small">Save edit</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Undo2
                                    class="h-14 aspect-square stroke-foreground hover:scale-125 active:scale-90 transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none rounded-sm"
                                    @click="emit('cancel')"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="text-mono-small">Cancel</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { inject } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Check, Undo2 } from "lucide-vue-next";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import type { EditTarget } from "..";
import { COLOR_MODEL_KEY } from "../keys";

const { cssColorOpaque } = inject(COLOR_MODEL_KEY)!;

defineProps<{
    editTarget: EditTarget | null;
}>();

const emit = defineEmits<{
    commit: [];
    cancel: [];
}>();
</script>

<style>
/* Edit drawer — peek panel that sticks out from left on desktop, bottom on mobile */
.edit-drawer {
    position: fixed;
    z-index: var(--z-dock);
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid hsl(var(--border));
    box-shadow: 4px 0 24px -4px hsl(var(--foreground) / 0.15);
    animation: edit-drawer-in var(--duration-normal) var(--ease-standard);
}
/* Edit drawer is fully handled by TopDock on mobile and not needed on desktop */
.edit-drawer {
    display: none;
}
/* Edit drawer enter/leave transition */
.edit-drawer-enter-active,
.edit-drawer-leave-active {
    transition: opacity var(--duration-normal) var(--ease-standard),
                transform var(--duration-normal) var(--ease-standard);
}
@media (min-width: 640px) {
    .edit-drawer-enter-from,
    .edit-drawer-leave-to {
        opacity: 0;
        transform: translateX(-100%) translateY(-50%);
    }
}
@media (max-width: 639px) {
    .edit-drawer-enter-from,
    .edit-drawer-leave-to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.85);
    }
}
</style>
