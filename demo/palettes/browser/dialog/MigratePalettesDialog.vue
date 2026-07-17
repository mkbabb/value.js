<template>
    <Dialog v-model:open="open">
        <DialogContent class="rounded-dialog max-w-sm">
            <DialogHeader>
                <!-- T.W4-6 (T-15/F7): dialog headers are title surfaces —
                     display voice at the subheading rung, ≤500 non-bold. -->
                <DialogTitle class="font-display font-medium text-subheading">{{ title }}</DialogTitle>
                <DialogDescription class="text-small font-display">
                    {{ description }}
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-2">
                <Button
                    variant="default"
                    class="cursor-pointer font-display justify-start gap-2 rounded-full"
                    @click="onRespond('publish')"
                >
                    <Globe class="w-4 h-4 shrink-0" />
                    {{ publishLabel }}
                </Button>
                <Button
                    v-if="mode === 'switch'"
                    variant="outline"
                    class="cursor-pointer font-display justify-start gap-2 rounded-full"
                    @click="onRespond('transfer')"
                >
                    <ArrowRightLeft class="w-4 h-4 shrink-0" />
                    Transfer to new account
                </Button>
                <Button
                    variant="ghost"
                    class="cursor-pointer font-display justify-start gap-2 text-muted-foreground rounded-full"
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
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Globe, ArrowRightLeft, SkipForward } from "@lucide/vue";

export type MigrateChoice = "publish" | "transfer" | "discard";

const open = defineModel<boolean>("open", { default: false });

const { count, mode } = defineProps<{
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
    mode === "switch"
        ? "What about your palettes?"
        : "What about your palettes?",
);

const description = computed(() => {
    const n = count;
    const s = n !== 1 ? "s" : "";
    return mode === "switch"
        ? `You have ${n} local palette${s}. What would you like to do with them?`
        : `You have ${n} local palette${s}. What would you like to do before regenerating your slug?`;
});

const publishLabel = computed(() =>
    mode === "switch"
        ? "Publish, then switch"
        : "Publish, then regenerate",
);

const discardLabel = computed(() =>
    mode === "switch" ? "Just switch" : "Just regenerate",
);
</script>
