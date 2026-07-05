import type { ShallowRef } from "vue";

/**
 * Wraps occurrences of `colorSpaceName` in `<mark>` tags inside the markdown body.
 */
function highlightColorSpaceName(
    container: HTMLElement | null,
    colorSpaceName: string | undefined,
) {
    if (!container || !colorSpaceName) return;
    const body = container.querySelector(".markdown-body");
    if (!body) return;

    /* Skip if already highlighted */
    if (body.querySelector("mark.cs-name")) return;

    const name = colorSpaceName;
    /* Build case-insensitive regex matching the full name */
    const pattern = new RegExp(
        `\\b(${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`,
        "gi",
    );

    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            /* Skip code blocks, pre, and already-marked nodes */
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (parent.closest("pre, code, mark, script, .katex"))
                return NodeFilter.FILTER_REJECT;
            /* The `g`-flagged pattern is stateful across acceptNode calls:
             * reset lastIndex on BOTH sides of the test so neither an accept
             * nor a reject leaves a stale offset that skips the next text
             * node's first match (design-docs-about.md P3). */
            pattern.lastIndex = 0;
            const matched = pattern.test(node.textContent ?? "");
            pattern.lastIndex = 0;
            return matched ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });

    const matches: Text[] = [];
    while (walker.nextNode()) matches.push(walker.currentNode as Text);

    for (const textNode of matches) {
        const text = textNode.textContent ?? "";
        pattern.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(text)) !== null) {
            if (m.index > lastIdx) {
                frag.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
            }
            const mark = document.createElement("mark");
            mark.className = "cs-name";
            mark.textContent = m[0];
            frag.appendChild(mark);
            lastIdx = pattern.lastIndex;
        }
        if (lastIdx < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIdx)));
        }
        textNode.parentNode?.replaceChild(frag, textNode);
    }
}

/**
 * Color-space-name marking for the markdown body.
 *
 * Code blocks are pre-formatted and pre-highlighted at build time by the
 * vite-source-export plugin — no runtime highlight.js core needed — and
 * their ink is the static house hljs token theme (`@styles/hljs.css`:
 * crayon primaries, Fira, dark via `.dark`). S.W4-8 killed this
 * composable's former GitHub-css head-injection swap AND its private
 * vueuse `useDark` instance with it (one of three parallel dark stores;
 * one wrong-theme first paint was observed live — design-docs-about
 * P2-2/P2-5). No dark consumer remains here: the theme is pure CSS, so
 * the ONE app dark store (glass-ui `useGlobalDark`, App.vue) is the only
 * scheme authority.
 */
export function useMarkdownHighlighting(
    markdownDiv: Readonly<ShallowRef<HTMLElement | null>>,
    colorSpaceName: () => string | undefined,
) {
    const applyHighlighting = () => {
        highlightColorSpaceName(markdownDiv.value, colorSpaceName());
    };

    return {
        applyHighlighting,
    };
}
