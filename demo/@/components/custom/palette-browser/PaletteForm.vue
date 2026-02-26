<template>
    <div class="grid gap-3">
        <!-- Color preview as dots -->
        <div v-if="colors.length > 0" class="flex items-center gap-2 flex-wrap">
            <TooltipProvider
                v-for="(color, i) in colors"
                :key="i"
                :delay-duration="100"
            >
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            class="w-7 aspect-square rounded-full hover:scale-125 transition-transform cursor-pointer shrink-0"
                            :style="{ backgroundColor: color }"
                            @click="copyColor(color)"
                        ></button>
                    </TooltipTrigger>
                    <TooltipContent class="fira-code text-xs">
                        {{ color }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <p v-else class="fira-code text-base text-muted-foreground italic">
            No saved colors to create a palette from.
        </p>

        <div>
            <div class="flex items-center gap-2">
                <Input
                    v-model="name"
                    placeholder="Palette name..."
                    class="fira-code text-base h-10 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                    @keydown.enter="onSave"
                />
                <TooltipProvider :delay-duration="200">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button
                                variant="outline"
                                size="sm"
                                class="fira-code text-base h-10 cursor-pointer border-gray-700/30"
                                :disabled="!canSave"
                                @click="onSave"
                            >
                                Save
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Save palette locally</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider :delay-duration="200">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button
                                size="sm"
                                class="fira-code text-base h-10 cursor-pointer"
                                :disabled="!canSave || publishing"
                                @click="onPublish"
                            >
                                <Globe v-if="!publishing" class="w-3.5 h-3.5 mr-1" />
                                <Loader2 v-else class="w-3.5 h-3.5 mr-1 animate-spin" />
                                Publish
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Save &amp; publish publicly</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div class="h-5 mt-0.5 overflow-hidden">
                <Transition name="slug-reveal">
                    <span v-if="name" class="text-xs text-muted-foreground fira-code italic px-1 block">
                        {{ slugPreview }}
                    </span>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Globe, Loader2 } from "lucide-vue-next";
import { slugify } from "@lib/palette/utils";
import { toast } from "vue-sonner";

const props = defineProps<{
    colors: string[];
    cssColor?: string;
}>();

const emit = defineEmits<{
    save: [name: string];
    publish: [name: string];
}>();

const name = ref("");
const publishing = ref(false);

const slugPreview = computed(() => (name.value ? slugify(name.value) : ""));

const canSave = computed(() => name.value.trim().length > 0 && props.colors.length > 0);

function copyColor(css: string) {
    navigator.clipboard.writeText(css).then(
        () => toast.success(`Copied ${css}`),
        () => toast.error("Failed to copy"),
    );
}

function onSave() {
    if (!canSave.value) return;
    emit("save", name.value.trim());
    name.value = "";
}

async function onPublish() {
    if (!canSave.value) return;
    publishing.value = true;
    emit("publish", name.value.trim());
    setTimeout(() => {
        publishing.value = false;
        name.value = "";
    }, 1000);
}
</script>
