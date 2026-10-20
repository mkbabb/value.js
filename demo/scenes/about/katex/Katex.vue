<template>
    <div class="inline-block" ref="katexElement"></div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, onBeforeUnmount, watch } from "vue";
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
//
// X.W11.p2 (COHESION §0ge.1(ii)) — KaTeX loads WITH ITS CONSUMER: the engine
// (vendor-katex, ~74 KB gz) and its stylesheet are imported by THIS component,
// dynamically, the first time a formula comes within a viewport of being seen.
// The About pane is a region of the home route at every width, so a static
// import put the whole engine on the boot path of `/` even where every formula
// sits below the fold (the 412 px lab cell). The stylesheet stays a script-side
// import — still unscopeable — and arrives in the same chunk load as the engine.
// The observer's one-viewport lead renders a formula before it is scrolled to.
// (The module registry memoizes the chunk: every instance shares one load.)
const loadKatex = () =>
    Promise.all([import("katex"), import("katex/dist/katex.min.css")]).then(
        ([engine]) => engine.default,
    );

const { expression, displayMode = true } = defineProps<{
    expression: string;
    displayMode?: boolean;
}>();

const katexElement = useTemplateRef<HTMLElement>("katexElement");

let visible = false;
const renderKatex = async () => {
    if (!visible) return;
    const katex = await loadKatex();
    if (katexElement.value) {
        katex.render(expression, katexElement.value, {
            displayMode,
            throwOnError: false,
            // htmlAndMathml (P2-1 / S-22): the KaTeX HTML layer renders with the
            // self-hosted KaTeX fonts (shipped via the katex.min.css import
            // above) for cross-browser typeset consistency; the MathML layer
            // remains for the accessibility tree (hidden by the same stylesheet
            // — `.katex-mathml { clip; position: absolute }`). MathML-only
            // delegated glyph metrics to each browser's math engine — WebKit's
            // MathML-Core is the least mature, an S-22 (Safari-truth) risk.
            output: "htmlAndMathml",
        });
    }
};

let observer: IntersectionObserver | null = null;
onMounted(() => {
    const el = katexElement.value;
    if (!el) return;
    observer = new IntersectionObserver(
        (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            observer?.disconnect();
            observer = null;
            visible = true;
            void renderKatex();
        },
        { rootMargin: "100% 0px" },
    );
    observer.observe(el);
});
onBeforeUnmount(() => observer?.disconnect());

watch(() => expression, renderKatex);
</script>
