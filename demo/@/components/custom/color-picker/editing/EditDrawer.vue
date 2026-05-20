<template>
    <Teleport to="body">
        <Transition name="edit-drawer">
            <div v-if="editTarget" class="edit-drawer glass-quiet p-4 flex flex-col gap-3 items-center">
                <p class="text-mono-small text-muted-foreground uppercase tracking-wider">Editing color</p>
                <div class="flex items-center justify-center gap-2">
                    <WatercolorDot
                        :color="editTarget.originalCss"
                        tag="div"
                        class="w-14 h-14 shrink-0 opacity-60"
                    />
                    <span class="text-muted-foreground text-caption">&rarr;</span>
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
                                <!-- A.W4: wrapped in <button> for keyboard reach + focus-visible; W5-a11y: aria-label for AT -->
                                <button
                                    type="button"
                                    aria-label="Save edit"
                                    class="p-2 rounded-button bg-foreground/5 hover:bg-accent/50 hover:scale-125 active:scale-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                                    @click="emit('commit')"
                                >
                                    <Check class="h-10 w-10 stroke-foreground" aria-hidden="true" />
                                </button>
                            </TooltipTrigger>
                            <!-- A.W4: TooltipContent mono recipe — root fix pending glass-ui TooltipContent variant="mono" (coordination/Q.md §3) -->
                            <TooltipContent class="text-mono-small">Save edit</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <!-- A.W4: wrapped in <button> for keyboard reach + focus-visible; W5-a11y: aria-label for AT -->
                                <button
                                    type="button"
                                    aria-label="Cancel edit"
                                    class="p-2 rounded-button bg-foreground/5 hover:bg-accent/50 hover:scale-125 active:scale-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                                    @click="emit('cancel')"
                                >
                                    <Undo2 class="h-10 w-10 stroke-foreground" aria-hidden="true" />
                                </button>
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

<style scoped>
/* Edit drawer — peek panel that sticks out from left on desktop, bottom on mobile */
.edit-drawer {
    position: fixed;
    z-index: var(--z-dock);
    animation: edit-drawer-in var(--duration-normal) var(--ease-standard);
}
/* Edit drawer is fully handled by TopDock on mobile and not needed on desktop */
.edit-drawer {
    display: none;
}
</style>
