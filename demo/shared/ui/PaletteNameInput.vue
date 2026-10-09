<!-- SERVED MODEL: claude-opus-5-5 -->
<template>
    <!-- A2-VA-L1-14 — THE ONE INLINE NAME FIELD, on glass `Input`. Inline name
         editing was built three ways (this file as PaletteRenameInput, a bare
         `<input>` in the Generate plate, a bare `<input>` in the dock's slug
         layer); the palette name now has one field, in two modes:
           · `commit` — a rename: a draft of `v-model`, committed by Save /
             Enter (emits `submit` with the trimmed new name; an unchanged or
             empty draft cancels) and dropped by Cancel / Escape. Focused and
             selected on mount. (The card / inspector rename.)
           · live (default) — the field IS the name: it writes `v-model` on
             every keystroke. (The Generate plate's title.)
         The host sets the field's voice through `input-class` (the plate's
         title voice), never by re-typing the field. -->
    <form
        class="palette-name-input flex items-center gap-1.5 min-w-0"
        @submit.prevent="onSubmit"
        @click.stop
    >
        <Input
            ref="inputRef"
            v-model="value"
            type="text"
            size="sm"
            :placeholder="placeholder"
            :aria-label="label"
            :class="['flex-1 min-w-0', inputClass]"
            @keydown.escape="onEscape"
        />
        <template v-if="commit">
            <!-- X.W12U.s2 · UIA-V-99: named glass squares at the control floor. -->
            <Button type="submit" icon-only size="xs" emphasis="quiet" aria-label="Save name" class="shrink-0">
                <Check class="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
            <Button
                type="button"
                icon-only
                size="xs"
                emphasis="quiet"
                aria-label="Cancel rename"
                class="shrink-0"
                @click="onCancel"
            >
                <XIcon class="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
        </template>
    </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch, type HTMLAttributes } from "vue";
import { Check, X as XIcon } from "@lucide/vue";
import { Button } from "@mkbabb/glass-ui/button";
import { Input } from "@mkbabb/glass-ui/input";

const model = defineModel<string>({ default: "" });

const {
    commit = false,
    label = "Palette name",
    placeholder = "Palette name...",
    inputClass,
} = defineProps<{
    /** A rename (draft + Save/Cancel) rather than a live field. */
    commit?: boolean;
    /** The field's accessible name. */
    label?: string;
    placeholder?: string;
    /** The host's voice for the text (e.g. the plate title's type rung). */
    inputClass?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    submit: [newName: string];
    cancel: [];
}>();

// The rename's draft; a live field writes the model itself.
const draft = ref(model.value);
watch(model, (v) => {
    draft.value = v;
});
const value = computed<string | number>({
    get: () => (commit ? draft.value : model.value),
    set: (v) => {
        if (commit) draft.value = String(v);
        else model.value = String(v);
    },
});

const inputRef = useTemplateRef<{ $el?: HTMLInputElement }>("inputRef");

onMounted(() => {
    if (!commit) return;
    const el = inputRef.value?.$el;
    el?.focus();
    el?.select();
});

function onSubmit() {
    if (!commit) return;
    const trimmed = draft.value.trim();
    if (trimmed && trimmed !== model.value) emit("submit", trimmed);
    else onCancel();
}

// Escape belongs to the rename (it drops the draft) — a live field lets it
// travel to whatever overlay hosts it.
function onEscape(ev: KeyboardEvent) {
    if (!commit) return;
    ev.stopPropagation();
    onCancel();
}

function onCancel() {
    if (commit) {
        draft.value = model.value;
        emit("cancel");
    }
}
</script>
