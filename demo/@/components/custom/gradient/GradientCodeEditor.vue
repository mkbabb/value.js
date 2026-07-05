<script setup lang="ts">
import { ref, watch, nextTick, onMounted, useTemplateRef } from "vue";
import { Button } from "@components/ui/button";
import { Copy, Check } from "@lucide/vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { debounce } from "@src/utils";

import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);

// Token ink comes from the house hljs theme (`@styles/hljs.css` — S.W4-8:
// crayon primaries, Fira, dark via `.dark`), consumed through the `.hljs`
// class on the editor below. The former GitHub-css imports + the
// `#hljs-gradient-theme` head-injection swap (a second injection idiom and
// a second dark store) are dead — the theme is static CSS, one source.

const { modelValue, coalescedCSS } = defineProps<{
    modelValue: string;
    coalescedCSS: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "parse": [css: string];
}>();

const editorRef = useTemplateRef<HTMLElement>("editorRef");
const parseError = ref(false);
const copied = ref(false);
let isSettingValue = false;

function highlight(code: string): string {
    try {
        return hljs.highlight(code, { language: "css" }).value;
    } catch {
        return code;
    }
}

function getCaretOffset(el: HTMLElement): number {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return 0;
    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.startContainer, range.startOffset);
    return preRange.toString().length;
}

function setCaretOffset(el: HTMLElement, offset: number) {
    const sel = window.getSelection();
    if (!sel) return;

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let charCount = 0;
    let node: Text | null = null;

    while (walker.nextNode()) {
        node = walker.currentNode as Text;
        const len = node.length;
        if (charCount + len >= offset) {
            const range = document.createRange();
            range.setStart(node, offset - charCount);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }
        charCount += len;
    }
}

function setEditorContent(code: string) {
    if (!editorRef.value) return;
    isSettingValue = true;
    const offset = getCaretOffset(editorRef.value);
    editorRef.value.innerHTML = highlight(code);
    nextTick(() => {
        if (editorRef.value) setCaretOffset(editorRef.value, offset);
        isSettingValue = false;
    });
}

const debouncedParse = debounce((text: string) => {
    emit("parse", text);
}, 500, false);

function onInput() {
    if (isSettingValue) return;
    const text = editorRef.value?.textContent ?? "";
    parseError.value = false;
    debouncedParse(text);
}

// Update editor when model changes from outside
watch(() => modelValue, (newVal) => {
    if (isSettingValue) return;
    setEditorContent(newVal);
}, { flush: "post" });

onMounted(() => {
    if (editorRef.value) {
        editorRef.value.innerHTML = highlight(modelValue);
    }
});

async function onCopy() {
    await copyToClipboard(coalescedCSS);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
}
</script>

<template>
    <div
        ref="editorRef"
        contenteditable="true"
        spellcheck="false"
        class="hljs text-mono-small leading-relaxed p-3 rounded-lg glass-wash border-border/40 min-h-[5rem] max-h-[12rem] overflow-y-auto whitespace-pre-wrap break-all outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        :class="[parseError && 'border-destructive']"
        :style="{
            transition: `border-color var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)`,
        }"
        @input="onInput"
    />
</template>
