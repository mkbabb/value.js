<template>
    <div v-if="isLoading" class="flex items-center space-x-4 h-full">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
        </div>
    </div>

    <div v-else-if="currentDoc" ref="markdownDiv" class="markdown-wrapper fraunces">
        <component :is="markdownContent" />
    </div>

    <div class="fraunces" v-else>
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
import { convert2 } from "@src/units/utils";
import "@styles/style.scss";
import "@styles/utils.scss";
import { useDark } from "@vueuse/core";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import prettier from "prettier";
import prettierBabelPlugin from "prettier/plugins/babel";
import prettierESTreePlugin from "prettier/plugins/estree";
import prettierPostCSSPlugin from "prettier/plugins/postcss";
import prettierTypeScriptPlugin from "prettier/plugins/typescript";
import { computed, defineProps, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import { DocItem, DocModule } from ".";

// @ts-ignore
import darkTheme from "highlight.js/styles/github-dark.css?inline";
// @ts-ignore
import lightTheme from "highlight.js/styles/github.css?inline";
import katex from "katex";

// Then register the languages you need
hljs.registerLanguage("typescript", javascript);
hljs.registerLanguage("css", javascript);

const isDark = useDark({ disableTransition: false });

const { module } = defineProps<{
    module: DocModule;
}>();

const markdownDiv = ref<HTMLElement | null>(null);

const currentDoc = ref<DocModule | null>(null);

const isLoading = ref(true);

const loadDocs = async () => {
    isLoading.value = true;

    // @ts-ignore
    currentDoc.value = (await module()) as DocModule;

    isLoading.value = false;
};

const markdownContent = computed(() => {
    if (!currentDoc.value) {
        return null;
    }

    return currentDoc.value.default;
});

const formatCodeId = (id: number) => {
    return `code-${id}`;
};

const codeMap = {} as {
    [key: string]: Partial<{
        code: string;
        language: string;
        printWidth: number;
    }>;
};
let codeId = 0;

const highlightCode = () => {
    if (!markdownDiv.value) {
        return;
    }
    // search for "pre code" and "div code" elements; the code must have a class name
    // that starts with "language-"
    const selector = "pre code[class^=language-], div[class^=language-]";

    Array.from(markdownDiv.value.querySelectorAll(selector)).forEach(
        async (block: HTMLElement, ix) => {
            if (!block.getAttribute("id")) {
                if (block.tagName === "DIV") {
                    // turn the block into a code element
                    const codeBlock = document.createElement("code");
                    codeBlock.innerHTML = block.innerHTML;
                    codeBlock.className = block.className;

                    // turn the parent into a pre element
                    const preBlock = document.createElement("pre");
                    preBlock.appendChild(codeBlock);

                    block.replaceWith(preBlock);

                    block = codeBlock;
                }

                const id = formatCodeId(codeId++);
                block.setAttribute("id", id);

                const code = block.innerText.trim();
                const language = block.className.replace("language-", "").toLowerCase();

                codeMap[id] = {
                    code,
                    language,
                };
            }

            const id = block.getAttribute("id");

            const { code, language } = codeMap[id];

            // Get the width of the code block in characters
            // Prettier doesn't accept floating point numbers for printWidth
            const printWidth = Math.max(
                Math.round(convert2(block.offsetWidth, "px", "ch", block)),
                80,
            );

            // If the original code's print width is the same as the current one,
            // skip formatting
            if (codeMap[id]?.printWidth === printWidth) {
                return;
            } else {
                codeMap[id].printWidth = printWidth;
            }

            // Proceed with formatting

            // If it's already been highlighted, set the innerHTML to the original code
            if (block.getAttribute("highlighted")) {
                block.innerHTML = code;
            }

            const formattedCode = await prettier.format(code, {
                parser: language,
                plugins: [
                    // Both estree, babel, and typescript is necessary for JavaScript
                    prettierESTreePlugin,
                    prettierBabelPlugin,
                    prettierTypeScriptPlugin,
                    // CSS & SCSS support
                    prettierPostCSSPlugin,
                ],

                printWidth,
            });

            const highlighted = hljs.highlight(formattedCode, {
                language,
            });

            block.innerHTML = highlighted.value;

            block.setAttribute("highlighted", "true");
            // Add the hljs class to the parent pre element
            block.parentElement.className = `hljs ${language}`;
        },
    );
};

const renderKatex = () => {
    if (!markdownDiv.value) {
        return;
    }

    Array.from(markdownDiv.value.querySelectorAll("code")).forEach((block: HTMLElement) => {
        if (!block.className) {
            const expression = block.innerText.trim();

            const katexElement = document.createElement("div");
            katexElement.style.display = "inline-block";

            block.replaceWith(katexElement);

            katex.render(expression, katexElement, {
                throwOnError: false,
                displayMode: false,
                output: "mathml",
            });
        }
    });
};

const styleEl = ref<HTMLStyleElement | null>(null);

const changeCodeTheme = () => {
    const theme = isDark.value ? darkTheme : lightTheme;

    if (!styleEl.value) {
        styleEl.value = document.createElement("style");
        document.head.appendChild(styleEl.value);
    }

    styleEl.value.innerHTML = theme;
};

watch(isDark, changeCodeTheme);

onMounted(async () => {
    await loadDocs();

    changeCodeTheme();

    window.addEventListener("resize", highlightCode);
});

onUpdated(() => {
    highlightCode();
    renderKatex();
});

onUnmounted(() => {
    window.removeEventListener("resize", highlightCode);
});
</script>

<style lang="scss">
.markdown-body {
    @apply text-base leading-7 text-gray-700 dark:text-gray-300;
    @apply p-0 m-0;
    @apply max-w-full;
}

.markdown-wrapper > .markdown-body > {
    /* Headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        @apply sticky top-0 bg-background z-10;
        @apply font-bold text-gray-900 dark:text-gray-100 mb-4 mt-6;
        @apply first:mt-0 scroll-m-20;
    }

    h1 {
        @apply text-4xl font-extrabold;
    }

    h2 {
        @apply text-3xl font-semibold;
    }

    h3 {
        @apply text-2xl font-semibold;
    }

    h4 {
        @apply text-xl font-semibold;
    }

    h5 {
        @apply text-lg font-semibold;
    }

    h6 {
        @apply text-base font-semibold;
    }

    /* Paragraphs */
    p {
        @apply mb-4 leading-7;
    }
}

.markdown-wrapper > .markdown-body {
    /* Links */
    a {
        @apply text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200;
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
        @apply bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto;
    }

    code {
        @apply text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded;
    }

    /* Inline code */
    p > code,
    li > code {
        @apply text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5;
    }

    /* Blockquotes */
    blockquote {
        @apply border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-400;
    }

    /* Tables */
    table {
        @apply w-full border-collapse mb-4;
    }

    th,
    td {
        @apply border border-gray-300 dark:border-gray-700 px-4 py-2;
    }

    th {
        @apply bg-gray-100 dark:bg-gray-800 font-bold text-left;
    }

    /* Images */
    img {
        @apply max-w-full h-auto rounded-lg my-4 mx-auto;
    }

    /* Horizontal rule */
    hr {
        @apply my-8 border-t border-gray-300 dark:border-gray-700;
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
        @apply bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-4 rounded-r-lg;

        &.warning {
            @apply border-yellow-500 dark:border-yellow-400;
        }

        &.danger {
            @apply border-red-500 dark:border-red-400;
        }
    }

    /* Footnotes */
    .footnotes {
        @apply mt-8 pt-4 border-t border-gray-300 dark:border-gray-700;

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
        @apply sticky top-0 bg-background z-10;
        @apply p-4 mb-4;
        @apply font-bold text-gray-900 dark:text-gray-100;
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
        @apply text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200;
    }

    /* Tables of contents links */
    .toc a {
        @apply text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200;
    }
}
</style>
