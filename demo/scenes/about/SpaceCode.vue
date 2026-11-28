<template>
    <!-- c60s (FIFTY-THIRD N): "more actual code snippets therein". Runnable
         value.js and CSS for the colour on the page; each `// →` line is what
         the call above it returns (space-code.ts, held to its own text by
         demo/test/about/c60s-space-pages.test.ts). The blocks take the settled
         colour, as the guide does: a drag re-highlights nothing. -->
    <section class="space-code" data-code :data-code-space="space" :aria-labelledby="headId">
        <h2 :id="headId" class="about-head font-display text-subheading" :style="inkStyle">In code</h2>
        <div v-for="block in blocks" :key="block.id" class="code-block" :data-code-block="block.id">
            <p class="code-lead">{{ block.lead }}</p>
            <div class="code-well">
                <FadingScroll axis="x" class="code-port" :aria-label="block.lang === 'css' ? 'CSS' : 'value.js code'">
                    <pre class="hljs code-pre"><code v-html="highlight(block)"></code></pre>
                </FadingScroll>
                <DockControl
                    compact
                    class="code-copy"
                    :aria-label="copied === block.id && status === 'success' ? 'Copied' : block.lang === 'css' ? 'Copy the CSS' : 'Copy the code'"
                    @click="copyBlock(block)"
                >
                    <Check v-if="copied === block.id && status === 'success'" class="w-4 h-4" aria-hidden="true" />
                    <Copy v-else class="w-4 h-4" aria-hidden="true" />
                </DockControl>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, inject, ref, useId } from "vue";
import { useMounted } from "@vueuse/core";
import { Check, Copy } from "@lucide/vue";
import { DockControl } from "@mkbabb/glass-ui/dock";
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import { useClipboard } from "@mkbabb/glass-ui/dom";
import type { AnyColor, HueInterpolationMethod } from "@mkbabb/value.js/color";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import "../../styles/hljs.css";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useHeldWhileLive } from "../../color-session/useAtmosphereFrameCoalesce";
import type { DisplayColorSpace } from "../../color-session/color-model";
import { partnerFor, spaceBlocks, type Block, type Partner } from "./space-code";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);

const props = defineProps<{
    space: DisplayColorSpace;
    color: AnyColor;
    label: string;
    partner: Partner["id"];
    hue: HueInterpolationMethod;
}>();

const headId = useId();

const live = inject(COLOR_MODEL_KEY, null)?.colourLive;
const source = computed(() => props.color);
const held = live ? useHeldWhileLive(source, live) : source;

const blocks = computed(() =>
    spaceBlocks(props.space, held.value, props.label, partnerFor(props.partner, held.value), props.hue),
);

function highlight(block: Block): string {
    try {
        return hljs.highlight(block.code, { language: block.lang }).value;
    } catch {
        return block.code.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
    }
}

const { status, copy } = useClipboard({ resetMs: 1400 });
const copied = ref<Block["id"] | null>(null);
function copyBlock(block: Block) {
    copied.value = block.id;
    void copy(block.code);
}

const accent = inject(SAFE_ACCENT_KEY, null);
const mounted = useMounted();
const inkStyle = computed(() => (mounted.value && accent ? { color: accent.value } : undefined));
</script>

<style scoped>
.space-code {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-2);
}
.about-head {
    margin: 0;
    font-weight: var(--type-weight-display);
}
.code-block {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-0);
    min-inline-size: 0;
}
.code-lead {
    margin: 0;
    font-family: var(--font-text);
    font-size: max(1rem, var(--type-small));
    max-inline-size: 66ch;
}
/* The code sits on the code paper its inks are certified on (`--code-ground`,
   hljs.css), as the Gradient pane's does; the copy action takes the well's
   top inline-end corner. */
.code-well {
    position: relative;
    min-inline-size: 0;
    border-radius: var(--radius-panel, 0.75rem);
    background: var(--code-ground);
}
.code-port {
    display: block;
    border-radius: inherit;
}
.code-pre {
    margin: 0;
    padding: var(--phi-1) var(--phi-2);
    padding-inline-end: 3rem;
    background: transparent;
    font-family: var(--font-mono);
    font-size: max(0.875rem, var(--type-small));
    line-height: 1.6;
    white-space: pre;
    inline-size: max-content;
    min-inline-size: 100%;
    box-sizing: border-box;
}
.code-copy {
    position: absolute;
    inset-block-start: 0.25rem;
    inset-inline-end: 0.25rem;
}
</style>
