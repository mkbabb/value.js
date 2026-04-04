<template>
    <Dialog v-model:open="open">
        <DialogContent class="rounded-[var(--radius-dialog)] max-w-sm">
            <DialogHeader>
                <DialogTitle class="text-subheading">{{ title }}</DialogTitle>
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
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Globe, ArrowRightLeft, SkipForward } from "lucide-vue-next";

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
