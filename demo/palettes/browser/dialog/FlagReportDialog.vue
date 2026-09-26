<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)">
        <!-- X.W12U.s2 · UIA-V-327 · V-328 · V-330: the palette dialogs' confirm
             idiom — the glass surface, one dismiss (Cancel, Esc, outside; no ✕),
             locked while the report is in flight; `scroll` caps it to the
             viewport (A2-VA-X-10: 509 px tall in a 390 px landscape). -->
        <DialogContent surface="glass" :dismiss="pending ? 'locked' : 'deliberate'" scroll>
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

                <!-- UIA-V-131: the glass Textarea, not a hand-rolled field. -->
                <Textarea
                    v-model="detail"
                    aria-label="Additional details"
                    placeholder="Additional details (optional)..."
                    :rows="3"
                    maxlength="500"
                />

                <p v-if="error" role="alert" class="text-caption text-destructive">{{ error }}</p>
            </div>

            <DialogFooter>
                <Button emphasis="text" :disabled="pending" @click="$emit('update:open', false)">
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
import { Textarea } from "@mkbabb/glass-ui/textarea";

// UIA-V-580: the dead `paletteSlug` prop is gone — the host owns the request.
const { open, paletteName, pending = false, error = null } = defineProps<{
    open: boolean;
    paletteName: string;
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
