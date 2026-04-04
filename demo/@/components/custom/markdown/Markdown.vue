<template>
    <div v-if="isLoading" class="flex items-center space-x-4 h-full">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
        </div>
    </div>

    <div v-else-if="currentDoc" ref="markdownDiv" class="markdown-wrapper font-display" :style="mdColorVars">
        <component :is="markdownContent" />
    </div>

    <div class="font-display" v-else>
        <Alert>
            <AlertTitle class="text-4xl">Oh snap...</AlertTitle>
            <AlertDescription>
                We couldn't find the documentation for the selected color space.
            </AlertDescription>
        </Alert>
    </div>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Skeleton } from "@components/ui/skeleton";
import "@styles/style.css";
import "@styles/utils.css";
import { computed, onMounted, onUpdated, ref, useTemplateRef } from "vue";
import type { DocModule } from ".";
import { useMarkdownColors } from "./composables/useMarkdownColors";
import { useMarkdownHighlighting } from "./composables/useMarkdownHighlighting";

const { module, cssColor, colorSpaceName } = defineProps<{
    module: DocModule;
    cssColor?: string;
    colorSpaceName?: string;
}>();

const markdownDiv = useTemplateRef<HTMLElement>("markdownDiv");

const { mdColorVars } = useMarkdownColors(() => cssColor);
const { applyHighlighting } = useMarkdownHighlighting(markdownDiv, () => colorSpaceName);

const currentDoc = ref<Awaited<ReturnType<DocModule>> | null>(null);
const isLoading = ref(true);

const loadDocs = async () => {
    isLoading.value = true;
    currentDoc.value = await module();
    isLoading.value = false;
};

const markdownContent = computed(() => {
    if (!currentDoc.value) return null;
    return currentDoc.value.default;
});

onMounted(async () => {
    await loadDocs();
});

onUpdated(() => {
    applyHighlighting();
});
</script>

<style>
@reference "../../../styles/style.css";

.markdown-body {
    @apply text-base leading-7;
    @apply p-0 m-0;
    @apply max-w-full;

    /* Skip layout/paint for off-screen sections (KaTeX formulas, code blocks) */
    > *:not(:first-child) {
        content-visibility: auto;
        contain-intrinsic-size: auto 200px;
    }
}

.markdown-wrapper > .markdown-body {
    /* Direct child headings */
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
        @apply font-bold pb-1 pt-4;
        @apply first:pt-0 scroll-m-20;
        transition: color var(--duration-slow) var(--ease-standard);
    }

    /* Consecutive headings — collapse the top padding of the second one */
    > h1 + h2, > h1 + h3, > h1 + h4, > h1 + h5, > h1 + h6,
    > h2 + h3, > h2 + h4, > h2 + h5, > h2 + h6,
    > h3 + h4, > h3 + h5, > h3 + h6,
    > h4 + h5, > h4 + h6,
    > h5 + h6 {
        @apply pt-1;
    }

    > h1 {
        @apply text-4xl font-extrabold;
    }

    > h2 {
        @apply text-3xl font-semibold;
        color: var(--md-color-h2);
    }

    > h3 {
        @apply text-2xl font-semibold;
        color: var(--md-color-h3);
    }

    > h4 {
        @apply text-xl font-semibold;
        color: var(--md-color-h3);
    }

    > h5 {
        @apply text-lg font-semibold;
    }

    > h6 {
        @apply text-base font-semibold;
    }

    /* Color space name highlights */
    mark.cs-name {
        background: transparent;
        color: var(--md-color-accent);
        font-weight: 600;
    }

    /* Direct child paragraphs */
    > p {
        @apply mb-4 leading-7;
    }
}

.markdown-wrapper > .markdown-body {
    /* Links */
    a {
        @apply text-primary hover:underline transition-colors duration-[var(--duration-fast)];
    }

    /* Lists */
    ul,
    ol {
        @apply mb-4 pl-8;
    }

    ul {
        @apply list-disc;
    }

    ol {
        @apply list-decimal;
    }

    li {
        @apply mb-2;

        > ul,
        > ol {
            @apply mt-2 mb-0;
        }
    }

    /* Code blocks */
    pre {
        @apply bg-muted rounded-2xl p-4 mb-4 overflow-x-auto;
    }

    code {
        @apply text-xs font-mono bg-muted rounded;
    }

    /* Inline code */
    p > code,
    li > code {
        @apply text-primary bg-muted rounded px-1 py-0.5;
    }

    /* Blockquotes */
    blockquote {
        @apply border-l-4 border-border pl-4 italic my-4 text-muted-foreground;
    }

    /* Tables */
    table {
        @apply w-full border-collapse mb-4;
    }

    th,
    td {
        @apply border border-border px-4 py-2;
    }

    th {
        @apply bg-muted font-bold text-left;
    }

    /* Images */
    img {
        @apply max-w-full h-auto rounded-2xl my-4 mx-auto;
    }

    /* Inline math — add breathing room between formulas and surrounding text */
    p div.inline-block:has(> .katex),
    li div.inline-block:has(> .katex) {
        @apply mx-1;
    }

    /* KaTeX display math blocks — rendered by <Katex> Vue component */
    > div.inline-block:has(> .katex) {
        display: block;
        @apply py-2 pl-6 my-1 overflow-x-auto;
    }

    /* Horizontal rule */
    hr {
        @apply my-4 border-t;
        border-color: var(--md-color-h2, var(--border));
        opacity: 0.3;
    }

    /* Definition lists */
    dl {
        @apply mb-4;
    }

    dt {
        @apply font-bold mb-1;
    }

    dd {
        @apply pl-4 mb-4;
    }

    /* Task lists */
    ul.contains-task-list {
        @apply list-none pl-0;

        li.task-list-item {
            @apply flex items-center;

            input[type="checkbox"] {
                @apply mr-2;
            }
        }
    }

    /* Callouts or admonitions */
    .callout {
        @apply bg-muted border-l-4 border-primary p-4 mb-4 rounded-r-2xl;

        &.warning {
            @apply border-yellow-500 dark:border-yellow-400;
        }

        &.danger {
            @apply border-red-500 dark:border-red-400;
        }
    }

    /* Footnotes */
    .footnotes {
        @apply mt-8 pt-4 border-t border-border;

        ol {
            @apply text-sm;
        }
    }

    /* Footnote links */
    .footnote-ref {
        @apply text-xs;
    }

    /* Footnote definitions */
    .footnote-item {
        @apply text-sm;
    }

    /* Tables of contents */
    .toc {
        @apply sticky top-0 bg-background z-[var(--z-popover)];
        @apply p-4 mb-4;
        @apply font-bold text-foreground;
        @apply first:mt-0 scroll-m-20;
    }

    .toc ul {
        @apply list-none pl-0;
    }

    .toc li {
        @apply mb-2;

        > ul {
            @apply mt-2 mb-0;
        }
    }

    .toc a {
        @apply text-primary hover:underline transition-colors duration-[var(--duration-fast)];
    }
}
</style>
