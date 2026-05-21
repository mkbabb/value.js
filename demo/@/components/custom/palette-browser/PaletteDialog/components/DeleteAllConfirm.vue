<template>
    <ConfirmDialog
        v-model:open="openModel"
        title="Delete all saved palettes?"
        :description="`This will permanently delete ${count} palette${count !== 1 ? 's' : ''} from local storage. This cannot be undone.`"
        confirm-label="Delete all"
        destructive
        @confirm="$emit('confirm')"
    >
        <template #action>
            <Trash2 class="w-3.5 h-3.5" />
            Delete all
        </template>
    </ConfirmDialog>
</template>

<script setup lang="ts">
import { Trash2 } from "@lucide/vue";
import { ConfirmDialog } from "@mkbabb/glass-ui/confirm-dialog";

defineProps<{
    count: number;
}>();

defineEmits<{
    confirm: [];
}>();

const openModel = defineModel<boolean>("open", { default: false });
</script>
