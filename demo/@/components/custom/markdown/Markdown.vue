<template>
    <div class="markdown-wrapper fraunces">
        <component :is="markdownContent" />
    </div>
</template>

<script setup lang="ts">
import { Katex } from "@components/custom/katex";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
} from "@components/ui/menubar";
import { Slider } from "@components/ui/slider";
import { List, Loader2 } from "lucide-vue-next";
import { computed, defineProps } from "vue";

// @ts-ignore
import "@styles/utils.scss";
// @ts-ignore
import "@styles/style.scss";

const defaultComponents = {
    Alert,
    AlertDescription,
    AlertTitle,
    Katex,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Button,
    List,
    Loader2,
    Slider,
    Input,
    Label,
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
};

interface Props {
    markdownModule: (components: Record<string, any>) => any;
    components?: Record<string, any>;
}

const props = defineProps<Props>();

const markdownContent = computed(() => {
    return props.markdownModule({
        ...defaultComponents,
        ...(props.components ?? {}),
    });
});
</script>

<style lang="scss">
.markdown-wrapper {
    @apply max-w-none text-base leading-7 text-gray-700 dark:text-gray-300;

    /* Headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        @apply sticky top-0 bg-background py-2 z-10;
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
        @apply text-sm font-mono bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5;
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
}
</style>
