<template>
    <Dialog v-model:open="open">
        <DialogContent
            class="migrate-dialog bg-card border-border rounded-lg sm:rounded-lg max-w-sm p-0 gap-0 [&>button:last-child]:hidden"
        >
            <div class="p-5 pb-0 pr-10 relative">
                <button
                    class="absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary cursor-pointer"
                    @click="open = false"
                >
                    <XIcon class="w-4 h-4" />
                </button>
                <h2 class="fraunces text-lg font-bold">
                    {{ title }}
                </h2>
                <p class="fraunces text-sm text-muted-foreground mt-1">
                    {{ description }}
                </p>
            </div>
            <div class="flex flex-col gap-2 p-5">
                <Button
                    variant="default"
                    class="cursor-pointer fraunces justify-start gap-2"
                    @click="onRespond('publish')"
                >
                    <Globe class="w-4 h-4 shrink-0" />
                    {{ publishLabel }}
                </Button>
                <Button
                    v-if="mode === 'switch'"
                    variant="outline"
                    class="cursor-pointer fraunces justify-start gap-2"
                    @click="onRespond('transfer')"
                >
                    <ArrowRightLeft class="w-4 h-4 shrink-0" />
                    Transfer to new account
                </Button>
                <Button
                    variant="ghost"
                    class="cursor-pointer fraunces justify-start gap-2 text-muted-foreground"
                    @click="onRespond('discard')"
                >
                    <SkipForward class="w-4 h-4 shrink-0" />
                    {{ discardLabel }}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
    Dialog,
    DialogContent,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Globe, ArrowRightLeft, SkipForward, X as XIcon } from "lucide-vue-next";

export type MigrateChoice = "publish" | "transfer" | "discard";

const open = defineModel<boolean>("open", { default: false });

const props = defineProps<{
    count: number;
    mode: "switch" | "regenerate";
}>();

const emit = defineEmits<{
    respond: [choice: MigrateChoice];
}>();

function onRespond(choice: MigrateChoice) {
    open.value = false;
    emit("respond", choice);
}

const title = computed(() =>
    props.mode === "switch"
        ? "What about your palettes?"
        : "What about your palettes?",
);

const description = computed(() => {
    const n = props.count;
    const s = n !== 1 ? "s" : "";
    return props.mode === "switch"
        ? `You have ${n} local palette${s}. What would you like to do with them?`
        : `You have ${n} local palette${s}. What would you like to do before regenerating your slug?`;
});

const publishLabel = computed(() =>
    props.mode === "switch"
        ? "Publish, then switch"
        : "Publish, then regenerate",
);

const discardLabel = computed(() =>
    props.mode === "switch" ? "Just switch" : "Just regenerate",
);
</script>
