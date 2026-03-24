import { convert2 } from "@src/units/utils";
import hljs from "highlight.js/lib/core";
import prettier from "prettier";
import prettierBabelPlugin from "prettier/plugins/babel";
import prettierESTreePlugin from "prettier/plugins/estree";
import prettierPostCSSPlugin from "prettier/plugins/postcss";
import prettierTypeScriptPlugin from "prettier/plugins/typescript";
import { onMounted, onUnmounted } from "vue";
import type { ShallowRef } from "vue";

const PRETTIER_PLUGINS = [
    prettierESTreePlugin,
    prettierBabelPlugin,
    prettierTypeScriptPlugin,
    prettierPostCSSPlugin,
];

const CODE_SELECTOR = "pre code[class^=language-], div[class^=language-]";

interface CodeEntry {
    code: string;
    language: string;
    printWidth?: number;
}

const formatCodeId = (id: number) => `code-${id}`;

/**
 * Manages Prettier formatting and highlight.js syntax highlighting for code blocks.
 *
 * Handles:
 * - Discovering code blocks in the markdown container
 * - Formatting with Prettier (responsive to container width)
 * - Syntax highlighting with highlight.js
 * - Re-formatting on window resize
 */
export function useCodeFormatting(
    markdownDiv: Readonly<ShallowRef<HTMLElement | null>>,
) {
    const codeMap: Record<string, CodeEntry> = {};
    let codeId = 0;

    const highlightCode = () => {
        if (!markdownDiv.value) return;

        Array.from(markdownDiv.value.querySelectorAll(CODE_SELECTOR)).forEach(
            async (rawBlock: Element) => {
                let block = rawBlock as HTMLElement;

                if (!block.getAttribute("id")) {
                    if (block.tagName === "DIV") {
                        /* Turn the block into a code element inside a pre */
                        const codeBlock = document.createElement("code");
                        codeBlock.innerHTML = block.innerHTML;
                        codeBlock.className = block.className;

                        const preBlock = document.createElement("pre");
                        preBlock.appendChild(codeBlock);

                        block.replaceWith(preBlock);
                        block = codeBlock;
                    }

                    const id = formatCodeId(codeId++);
                    block.setAttribute("id", id);

                    const code = block.innerText.trim();
                    const language = block.className
                        .replace("language-", "")
                        .toLowerCase();

                    codeMap[id] = { code, language };
                }

                const id = block.getAttribute("id")!;
                const entry = codeMap[id];
                if (!entry) return;
                const { code, language } = entry;

                /* Compute print width in character units (Prettier needs an integer) */
                const printWidth = Math.max(
                    Math.round(convert2(block.offsetWidth, "px", "ch", block)),
                    80,
                );

                /* Skip if the print width hasn't changed */
                if (entry.printWidth === printWidth) return;
                entry.printWidth = printWidth;

                /* If already highlighted, reset innerHTML to the original code */
                if (block.getAttribute("highlighted")) {
                    block.innerHTML = code;
                }

                const formattedCode = await prettier.format(code, {
                    parser: language,
                    plugins: PRETTIER_PLUGINS,
                    printWidth,
                });

                const highlighted = hljs.highlight(formattedCode, { language });

                block.innerHTML = highlighted.value;
                block.setAttribute("highlighted", "true");
                block.parentElement!.className = `hljs ${language}`;
            },
        );
    };

    onMounted(() => {
        window.addEventListener("resize", highlightCode);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", highlightCode);
    });

    return { highlightCode };
}
