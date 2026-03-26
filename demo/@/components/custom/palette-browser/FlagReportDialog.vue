<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Report Palette</DialogTitle>
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
                        <label :for="`reason-${r.value}`" class="text-sm">
                            {{ r.label }}
                        </label>
                    </div>
                </RadioGroup>

                <textarea
                    v-model="detail"
                    placeholder="Additional details (optional)..."
                    class="h-20 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                    maxlength="500"
                />
            </div>

            <DialogFooter>
                <Button variant="outline" @click="$emit('update:open', false)">
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    :disabled="!reason || submitting"
                    @click="onSubmit"
                >
                    <Loader2 v-if="submitting" class="mr-2 h-4 w-4 animate-spin" />
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
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Loader2 } from "lucide-vue-next";

const props = defineProps<{
    open: boolean;
    paletteName: string;
    paletteSlug: string;
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
const submitting = ref(false);

async function onSubmit() {
    if (!reason.value) return;
    submitting.value = true;
    try {
        emit("submit", reason.value, detail.value.trim() || undefined);
    } finally {
        submitting.value = false;
        reason.value = "";
        detail.value = "";
    }
}
</script>
