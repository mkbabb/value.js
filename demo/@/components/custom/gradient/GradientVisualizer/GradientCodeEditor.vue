<script setup lang="ts">
import { ref, computed, watch, onMounted, useTemplateRef } from "vue";
import { debounce } from "@utils/utils";

import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);

// Token ink comes from the house hljs theme (`@styles/hljs.css` — S.W4-8:
// crayon primaries, Fira, dark via `.dark`), consumed through the `.hljs`
// class on the editor below. The former GitHub-css imports + the
// `#hljs-gradient-theme` head-injection swap (a second injection idiom and
// a second dark store) are dead — the theme is static CSS, one source.

const { modelValue, parseVerdict = null } = defineProps<{
    modelValue: string;
    /**
     * The one-line Fira verdict from the last `applyCSS` (W5-11 / P0-1):
     * `null` = the last parse applied; a string = the explicit rejection
     * reason. Drives the destructive border — parse failure is LOUD, and the
     * user's text is never touched while they're authoring it.
     */
    parseVerdict?: string | null;
}>();

const emit = defineEmits<{
    "parse": [css: string];
}>();

const editorRef = useTemplateRef<HTMLElement>("editorRef");
const hasError = computed(() => parseVerdict != null);

// ── The editor truce (W5-11 / P1-4) ──
// The editor NEVER rewrites the user's text while it has focus — no caret
// re-seating, no literal normalization mid-thought. Model→editor writes
// happen only while blurred (stop drags, resets, seed-from-palette), plus
// one re-sync on blur when the authored text parsed clean (the canonical
// form is the readout of record once authoring ends). A failed parse keeps
// the user's text verbatim alongside the verdict — WIP is never destroyed.
const focused = ref(false);

function highlight(code: string): string {
    try {
        return hljs.highlight(code, { language: "css" }).value;
    } catch {
        return code;
    }
}

function render(code: string) {
    if (editorRef.value) editorRef.value.innerHTML = highlight(code);
}

const debouncedParse = debounce((text: string) => {
    emit("parse", text);
}, 500);

function onInput() {
    const text = editorRef.value?.textContent ?? "";
    debouncedParse(text);
}

function onFocus() {
    focused.value = true;
}

function onBlur() {
    focused.value = false;
    // Authoring ended: if the text is in a clean (applied) state, settle the
    // editor on the canonical serialization. A rejected text stays verbatim.
    if (!hasError.value) render(modelValue);
}

// Model changes land in the editor ONLY while it is not focused.
watch(() => modelValue, (newVal) => {
    if (focused.value) return;
    render(newVal);
});

onMounted(() => render(modelValue));
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <div
            ref="editorRef"
            contenteditable="true"
            spellcheck="false"
            role="textbox"
            aria-label="Gradient CSS"
            :aria-invalid="hasError || undefined"
            class="hljs text-mono-small leading-relaxed p-3 rounded-lg glass-wash border min-h-[5rem] max-h-[12rem] overflow-y-auto whitespace-pre-wrap break-all outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            :class="[hasError ? 'border-destructive' : 'border-border/40']"
            :style="{
                transition: `border-color var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)`,
            }"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        />
        <!-- The one-line Fira verdict (W5-11): explicit destructive failure —
             never a silent partial apply, never a stolen caret. -->
        <!-- text-mono-SMALL, deliberately: the verdict quotes code literals,
             and text-mono-caption is the UPPERCASE eyebrow token (the P1-7
             label-costume trap — case-sensitive code never wears it). -->
        <p
            v-if="parseVerdict"
            data-testid="gradient-parse-verdict"
            class="fira-code text-mono-small text-destructive"
            role="status"
        >
            {{ parseVerdict }}
        </p>
    </div>
</template>
