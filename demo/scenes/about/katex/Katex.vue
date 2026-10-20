<template>
    <FadingScroll v-if="displayMode" axis="x" class="katex-row">
        <div ref="katexElement"></div>
    </FadingScroll>
    <div v-else class="inline-block" ref="katexElement"></div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, watch } from "vue";
// SS8-0267 (X-W6 R1/R10): a display formula is a scroll ROW on glass's scroll
// primitive. Wide derivations overflow the card (26 of 37 rows at 390 px, up
// to 352 px off the edge); the port feathers whichever edge holds more of the
// formula and takes keyboard focus, the shape the easing specimen strip
// rides. Inline math stays an inline box. (No template comment: one beside
// the root makes a dev-mode fragment, which drops the scope attribute.)
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import katex from "katex";
// AB-1 (T.W8 remediation_1) — the KaTeX stylesheet is a GLOBAL import, script-
// side. It was `@import "katex/dist/katex.min.css"` INSIDE a `<style scoped>`
// block, which Vite's SFC transform suffixed EVERY selector with this
// component's `[data-v-*]` scope attribute (`.katex[data-v-…]`, `.katex .mord
// [data-v-…]` …). Only this component's ROOT div carries that attr — none of
// the `.katex`/`.mord`/`.katex-mathml` elements `katex.render` injects into it
// do — so all 231 rules matched NOTHING: the HTML layer rendered in the body
// sans, the un-hidden MathML layer painted a second visible copy beside it, and
// the stretchy-brace SVG blew out to 6400px. A script-side import is
// unscopeable by construction — the exact dead-scoped-CSS class the R.W4-C1
// rider cured in Markdown.vue, here cured at the root. The self-hosted
// `KaTeX_*` @font-face rules (S.W4-6 / a409feb) ship through this same import.
import "katex/dist/katex.min.css";

const { expression, displayMode = true } = defineProps<{
    expression: string;
    displayMode?: boolean;
}>();

const katexElement = useTemplateRef<HTMLElement>("katexElement");

const renderKatex = () => {
    if (katexElement.value) {
        katex.render(expression, katexElement.value, {
            displayMode,
            throwOnError: false,
            // SS8-0272 (R5): a formula KaTeX cannot parse prints its source in
            // the error colour. KaTeX's #cc0000 read 2.35:1 light / 2.03:1 dark
            // on the tinted card; the in-pane destructive ink is certified on
            // this plate (shell.css `--destructive: var(--ink-destructive)`).
            errorColor: "var(--destructive)",
            // htmlAndMathml (P2-1 / S-22): the KaTeX HTML layer renders with the
            // self-hosted KaTeX fonts (shipped via the katex.min.css import
            // above) for cross-browser typeset consistency; the MathML layer
            // remains for the accessibility tree (hidden by the same stylesheet
            // — `.katex-mathml { clip; position: absolute }`). MathML-only
            // delegated glyph metrics to each browser's math engine — WebKit's
            // MathML-Core is the least mature, an S-22 (Safari-truth) risk.
            output: "htmlAndMathml",
        });
        // SS8-0272 (VC:83): an error is never colour-only. The failed source
        // is named for assistive tech, and the wavy underline (below) marks it
        // for sight.
        for (const error of katexElement.value.querySelectorAll(".katex-error")) {
            error.setAttribute("role", "img");
            error.setAttribute(
                "aria-label",
                `Formula could not be rendered: ${error.textContent ?? ""}`,
            );
        }
    }
};

onMounted(renderKatex);

watch(() => expression, renderKatex);
</script>

<style scoped>
/* SS8-0272: the non-colour error cue (KaTeX renders the span into this root). */
:deep(.katex-error) {
    text-decoration: underline wavy;
    text-underline-offset: 0.2em;
}
</style>
