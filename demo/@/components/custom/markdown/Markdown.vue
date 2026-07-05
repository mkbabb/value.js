<template>
    <!-- R.W4 Lane A / A2 (U20): glass shimmer bones, not opaque pulse blocks. -->
    <div v-if="isLoading" class="flex items-center space-x-4 h-full">
        <Skeleton surface="glass" variant="shimmer" class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
            <Skeleton surface="glass" variant="shimmer" class="h-4 w-full" />
            <Skeleton surface="glass" variant="shimmer" class="h-4 w-full" />
        </div>
    </div>

    <!-- The docs BODY reads in the body voice (three-voice law, R.W3 Lane A /
         A1 — the former blanket `font-display` would flip whole documents to
         Fraunces once the font root resolves a real face; headings opt into
         the display voice in the scoped styles below). -->
    <div v-else-if="currentDoc" ref="markdownDiv" class="markdown-wrapper" :style="mdColorVars">
        <component :is="markdownContent" />
    </div>

    <div v-else>
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

<style scoped>
@reference "../../../styles/style.css";

/* ─────────────────────────────────────────────────────────────────────────
 * R.W4 Lane C / C1 (U4 · U5) — the φ ladder + the dead-reach cure.
 *
 * TWO things happened here. (1) THE CURE: the typography rules below were
 * silently DEAD for every element inside the compiled .md component — a
 * scoped selector suffixes its LAST compound with this component's
 * data-v attribute, and the md component's inner h2/p/ul elements never
 * carry it (only its ROOT .markdown-body div does, as a child-component
 * root). Every content rule now routes through `:deep()` — a legitimate
 * reach into CONTENT we compile ourselves, not a shadcn internal
 * (DESIGN.md §Idioms NOT used prohibits the latter). (2) THE LADDER:
 * sectional rhythm comes from one golden-ratio spacing ladder — margins,
 * divider padding, indents all read φ rungs, never ad-hoc steps. The
 * `--phi-*` rungs themselves live in `style.css :root` (S.W4-8 promotion —
 * they were private to this wrapper while AboutPane re-hardcoded the same
 * values as arbitrary literals; one ladder, both consumers now).
 * ───────────────────────────────────────────────────────────────────── */
.markdown-body {
    @apply text-base leading-7;
    @apply p-0 m-0;
    @apply max-w-full;
}

.markdown-wrapper :deep(.markdown-body) {
    /* Skip layout/paint for off-screen sections (KaTeX formulas, code blocks) */
    > *:not(:first-child) {
        content-visibility: auto;
        contain-intrinsic-size: auto 200px;
    }

    /* Direct child headings — display rungs, Fraunces (three-voice law).
     * The φ rhythm: a heading binds TIGHTER to the content it introduces
     * (small margin-below) than to the section it closes (large margin-
     * above) — the U4 definition↔content gap, cured structurally. */
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
        @apply font-display font-bold scroll-m-20;
        margin-top: var(--phi-4);
        margin-bottom: var(--phi-2);
        font-optical-sizing: auto;
        transition: color var(--duration-slow) var(--ease-standard);
    }
    > h1:first-child,
    > h2:first-child,
    > h3:first-child,
    > h4:first-child,
    > h5:first-child,
    > h6:first-child {
        margin-top: 0;
    }

    > h3,
    > h4 {
        margin-top: var(--phi-3);
        margin-bottom: var(--phi-1);
    }

    > h5,
    > h6 {
        margin-top: var(--phi-2);
        margin-bottom: var(--phi-0);
    }

    /* Consecutive headings — collapse the second one's section-gap. */
    > h1 + h2, > h1 + h3, > h1 + h4, > h1 + h5, > h1 + h6,
    > h2 + h3, > h2 + h4, > h2 + h5, > h2 + h6,
    > h3 + h4, > h3 + h5, > h3 + h6,
    > h4 + h5, > h4 + h6,
    > h5 + h6 {
        margin-top: var(--phi-1);
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
        @apply leading-7;
        margin-bottom: var(--phi-2);
    }
}

.markdown-wrapper :deep(.markdown-body) {
    /* Links */
    a {
        @apply text-primary hover:underline transition-colors duration-fast;
    }

    /* Lists — the φ indent + the list↔content rhythm (U5). */
    ul,
    ol {
        margin-bottom: var(--phi-2);
        padding-left: var(--phi-4);
    }

    ul {
        @apply list-disc;
    }

    ol {
        @apply list-decimal;
    }

    li {
        margin-bottom: var(--phi-0);

        > ul,
        > ol {
            margin-top: var(--phi-0);
            margin-bottom: 0;
        }
    }

    /* Code blocks */
    /* rounded-2xl: documented exception (content element, not a surface) — W3-conventions */
    pre {
        @apply bg-muted rounded-2xl overflow-x-auto;
        padding: var(--phi-2);
        margin-bottom: var(--phi-3);
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
        @apply border-l-4 border-border italic text-muted-foreground;
        padding-left: var(--phi-3);
        margin-block: var(--phi-3);
    }

    /* Tables */
    table {
        @apply w-full border-collapse;
        margin-bottom: var(--phi-3);
    }

    th,
    td {
        @apply border border-border;
        padding: var(--phi-1) var(--phi-2);
    }

    th {
        @apply bg-muted font-bold text-left;
    }

    /* Images */
    /* rounded-2xl: documented exception (content element, not a surface) — W3-conventions */
    img {
        @apply max-w-full h-auto rounded-2xl mx-auto;
        margin-block: var(--phi-3);
    }

    /* Inline math — add breathing room between formulas and surrounding text */
    p div.inline-block:has(> .katex),
    li div.inline-block:has(> .katex) {
        @apply mx-1;
    }

    /* KaTeX display math blocks — rendered by <Katex> Vue component */
    > div.inline-block:has(> .katex) {
        display: block;
        @apply overflow-x-auto;
        padding: var(--phi-1) 0 var(--phi-1) var(--phi-3);
        margin-block: var(--phi-1);
    }

    /* Horizontal rule — the section divider carries even φ air (U5). */
    hr {
        @apply border-t;
        margin-block: var(--phi-4);
        border-color: var(--md-color-h2, var(--border));
        opacity: 0.3;
    }

    /* Definition lists — the definition binds to its content (U4). */
    dl {
        margin-bottom: var(--phi-3);
    }

    dt {
        @apply font-bold;
        margin-bottom: var(--phi-0);
    }

    dd {
        padding-left: var(--phi-3);
        margin-bottom: var(--phi-2);
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
        @apply bg-muted border-l-4 border-primary rounded-r-2xl;
        padding: var(--phi-2);
        margin-bottom: var(--phi-3);

        &.warning {
            @apply border-yellow-500 dark:border-yellow-400;
        }

        &.danger {
            @apply border-red-500 dark:border-red-400;
        }
    }

    /* Footnotes */
    .footnotes {
        @apply border-t border-border;
        margin-top: var(--phi-4);
        padding-top: var(--phi-3);

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
        @apply sticky top-0 bg-background z-popover;
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
        @apply text-primary hover:underline transition-colors duration-fast;
    }
}
</style>
