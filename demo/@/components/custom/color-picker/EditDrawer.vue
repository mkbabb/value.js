<template>
    <Teleport to="body">
        <Transition name="edit-drawer">
            <div v-if="editTarget" class="edit-drawer p-4 flex flex-col gap-3">
                <p class="fira-code text-xs text-muted-foreground uppercase tracking-wider">Editing color</p>
                <div class="flex items-center gap-2">
                    <WatercolorDot
                        :color="editTarget.originalCss"
                        tag="div"
                        class="w-10 h-10 shrink-0 opacity-60"
                    />
                    <span class="text-muted-foreground text-xs">&rarr;</span>
                    <WatercolorDot
                        :color="cssColorOpaque"
                        tag="div"
                        class="w-10 h-10 shrink-0 ring-2 ring-primary/50"
                    />
                </div>
                <div class="flex gap-6 mt-2 justify-center w-full">
                    <TooltipProvider :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Check
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                    @click="emit('commit')"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="fira-code text-xs">Save edit</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Undo2
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                    @click="emit('cancel')"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="fira-code text-xs">Cancel</TooltipContent>
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
import type { EditTarget } from ".";
import { COLOR_MODEL_KEY } from "./keys";

const { cssColorOpaque } = inject(COLOR_MODEL_KEY)!;

defineProps<{
    editTarget: EditTarget | null;
}>();

const emit = defineEmits<{
    commit: [];
    cancel: [];
}>();
</script>
