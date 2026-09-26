<template>
    <!-- X.W12U.s2 — the palette dialogs' confirm idiom (UIA-V-331 · V-334):
         the glass surface, no class overrides on the frame or its type
         (UIA-V-333 · V-582), one dismiss grammar (a footer Cancel, Esc,
         outside; locked while the chosen action runs). Each choice says what
         it does (UIA-V-335); focus opens on Cancel, never on the choice that
         publishes (UIA-V-336); the dialog stays open, with the chosen button
         pending, until the action settles, and a failure stays in it
         (UIA-V-133). -->
    <Dialog :open="open" @update:open="(v) => !v && $emit('dismiss')">
        <DialogContent
            surface="glass"
            :dismiss="migrating ? 'locked' : 'deliberate'"
            scroll
            @open-auto-focus="onOpenFocus"
        >
            <DialogHeader>
                <!-- T.W4-6 (T-15/F7) · O-10d census: dialog titles keep the display
                     voice (the same pair FlagReportDialog wears); the rung and the
                     description's voice are glass's (UIA-V-582). -->
                <DialogTitle class="font-display font-medium">{{ title }}</DialogTitle>
                <DialogDescription>{{ description }}</DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-3" role="group" :aria-label="title">
                <div v-for="c in choices" :key="c.choice" class="flex flex-col items-start gap-1">
                    <Button
                        :emphasis="c.emphasis"
                        :loading="migrating === c.choice"
                        :disabled="migrating !== null && migrating !== c.choice"
                        :aria-describedby="`${uid}-${c.choice}`"
                        @click="$emit('respond', c.choice)"
                    >
                        <component :is="c.icon" class="w-4 h-4 shrink-0" aria-hidden="true" />
                        {{ c.label }}
                    </Button>
                    <p :id="`${uid}-${c.choice}`" class="text-caption text-muted-foreground">{{ c.line }}</p>
                </div>
            </div>

            <p v-if="error" role="alert" class="text-caption text-destructive">{{ error }}</p>

            <DialogFooter>
                <Button ref="cancelRef" emphasis="text" :disabled="migrating !== null" @click="$emit('dismiss')">
                    Cancel
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, useId, useTemplateRef, type ComponentPublicInstance } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Globe, ArrowRightLeft, SkipForward } from "@lucide/vue";

export type MigrateChoice = "publish" | "transfer" | "discard";

const { open, count, mode, target = null, migrating = null, error = null } = defineProps<{
    open: boolean;
    count: number;
    mode: "switch" | "regenerate";
    /** The slug a switch is headed for. */
    target?: string | null;
    /** The choice in flight, if any. */
    migrating?: MigrateChoice | null;
    /** The last failed attempt, kept on screen. */
    error?: string | null;
}>();

defineEmits<{
    respond: [choice: MigrateChoice];
    /** Closed without a choice (Cancel, Esc, outside). */
    dismiss: [];
}>();

const uid = useId();
const cancelRef = useTemplateRef<ComponentPublicInstance>("cancelRef");

function onOpenFocus(e: Event) {
    e.preventDefault();
    (cancelRef.value?.$el as HTMLElement | undefined)?.focus();
}

const n = computed(() => `${count} palette${count === 1 ? "" : "s"}`);

const title = computed(() =>
    mode === "switch" ? `Switch to ${target ?? "this slug"}?` : "Regenerate your slug?",
);

const description = computed(() => `You have ${n.value} saved in this browser.`);

const choices = computed(() => {
    const next = mode === "switch" ? `switch to ${target ?? "the new slug"}` : "regenerate";
    const list: {
        choice: MigrateChoice;
        label: string;
        line: string;
        icon: typeof Globe;
        emphasis: "primary" | "secondary" | "quiet";
    }[] = [
        {
            choice: "publish",
            label: mode === "switch" ? "Publish, then switch" : "Publish, then regenerate",
            line: `Publish the ${n.value} publicly under your current slug, then ${next}.`,
            icon: Globe,
            emphasis: "secondary",
        },
    ];
    if (mode === "switch") {
        list.push({
            choice: "transfer",
            label: "Transfer to new account",
            line: `Switch first, then publish the ${n.value} publicly under ${target ?? "the new slug"}.`,
            icon: ArrowRightLeft,
            emphasis: "secondary",
        });
    }
    list.push({
        choice: "discard",
        label: mode === "switch" ? "Just switch" : "Just regenerate",
        line: `The ${n.value} stay saved in this browser, unpublished.`,
        icon: SkipForward,
        emphasis: "quiet",
    });
    return list;
});
</script>
