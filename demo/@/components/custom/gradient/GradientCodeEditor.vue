<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useDark } from "@vueuse/core";
import { Button } from "@components/ui/button";
import { Copy, Check } from "lucide-vue-next";
import { copyToClipboard } from "@composables/useClipboard";
import { debounce } from "@src/utils";

import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import githubDark from "highlight.js/styles/github-dark.css?inline";
import githubLight from "highlight.js/styles/github.css?inline";

hljs.registerLanguage("css", css);

const props = defineProps<{
    modelValue: string;
    coalescedCSS: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "parse": [css: string];
}>();

const isDark = useDark();
const editorRef = ref<HTMLElement | null>(null);
const parseError = ref(false);
const copied = ref(false);
let isSettingValue = false;

let hljsStyleEl: HTMLStyleElement | null = null;

function ensureTheme() {
    if (!hljsStyleEl) {
        const existing = document.head.querySelector("#hljs-gradient-theme");
        if (existing) {
            hljsStyleEl = existing as HTMLStyleElement;
        } else {
            hljsStyleEl = document.createElement("style");
            hljsStyleEl.id = "hljs-gradient-theme";
            document.head.appendChild(hljsStyleEl);
        }
    }
    hljsStyleEl.textContent = isDark.value ? githubDark : githubLight;
}

watch(isDark, ensureTheme);

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
watch(() => props.modelValue, (newVal) => {
    if (isSettingValue) return;
    setEditorContent(newVal);
}, { flush: "post" });

onMounted(() => {
    ensureTheme();
    if (editorRef.value) {
        editorRef.value.innerHTML = highlight(props.modelValue);
    }
});

async function onCopy() {
    await copyToClipboard(props.coalescedCSS);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
}
</script>

<template>
    <div
        ref="editorRef"
        contenteditable="true"
        spellcheck="false"
        class="hljs text-mono-small leading-relaxed p-3 rounded-lg glass border-border/40 min-h-[5rem] max-h-[12rem] overflow-y-auto whitespace-pre-wrap break-all outline-none focus:ring-1 focus:ring-ring"
        :class="[parseError && 'border-destructive']"
        :style="{
            transition: `border-color var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)`,
        }"
        @input="onInput"
    />
</template>
