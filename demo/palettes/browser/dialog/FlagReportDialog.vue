<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <!-- T.W4-6 (T-15/F7): the producer DialogTitle default is the
                     body-voice `text-subheading` — the demo's dialog headers
                     join the display voice (≤500 non-bold). Producer-root
                     candidate recorded with the W4-6 sweep (packet class). -->
                <DialogTitle class="font-display font-medium">Report Palette</DialogTitle>
                <DialogDescription>
                    Why are you reporting "{{ paletteName }}"?
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-3 py-2">
                <RadioGroup v-model="reason" class="flex flex-col gap-2">
                    <div
                        v-for="r in reasons"
                        :key="r.value"
                        class="flex items-center gap-2"
                    >
                        <RadioGroupItem :value="r.value" :id="`reason-${r.value}`" />
                        <label :for="`reason-${r.value}`" class="text-small">
                            {{ r.label }}
                        </label>
                    </div>
                </RadioGroup>

                <textarea
                    v-model="detail"
                    placeholder="Additional details (optional)..."
                    class="h-20 rounded-input border border-input bg-background px-3 py-2 text-small resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    maxlength="500"
                />

                <p v-if="error" role="alert" class="text-caption text-destructive">{{ error }}</p>
            </div>

            <DialogFooter>
                <Button emphasis="text" @click="$emit('update:open', false)">
                    Cancel
                </Button>
                <Button
                    :disabled="!reason"
                    :loading="pending"
                    @click="onSubmit"
                >
                    Report
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

const { open, paletteName, paletteSlug, pending = false, error = null } = defineProps<{
    open: boolean;
    paletteName: string;
    paletteSlug: string;
    /** X.W12.u1 (UIA-V-39): the host owns the request, so it owns the pending state. */
    pending?: boolean;
    /** The last failed report's message, shown beside the kept form. */
    error?: string | null;
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    submit: [reason: string, detail: string | undefined];
}>();

const reasons = [
    { value: "inappropriate", label: "Inappropriate content" },
    { value: "spam", label: "Spam" },
    { value: "copyright", label: "Copyright violation" },
    { value: "other", label: "Other" },
];

const reason = ref("");
const detail = ref("");
// The form lives as long as the dialog: the host unmounts it on close, so a
// failed report keeps what was typed and a fresh open starts empty.
function onSubmit() {
    if (!reason.value || pending) return;
    emit("submit", reason.value, detail.value.trim() || undefined);
}
</script>
