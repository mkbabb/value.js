// SERVED MODEL: claude-opus-5-5 · SS-8 B23 R-7 (wb-mix-animationcanvas): does `[data-mix-target]`
// survive a WatercolorDot render? Renders the component from a given glass-ui dist through
// vue/server-renderer with the attributes MixResultDisplay historically handed it.
// usage: node r7-ssr-dot.mjs <abs path to dist/watercolor-dot.js> [label]
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
const [file, label = file] = process.argv.slice(2);
const mod = await import(file);
const Dot = mod.WatercolorDot ?? mod.default ?? Object.values(mod).find((v) => v && (v.setup || v.render));
const cells = {
    ghostDiv: { color: "oklch(0.7 0.15 30)", variant: "ghost", seed: "mix-result", "data-mix-target": "", class: "w-10 h-10" },
    ghostButton: { color: "oklch(0.7 0.15 30)", variant: "ghost", seed: "mix-result", tag: "button", "data-mix-target": "", "aria-label": "probe", class: "w-10 h-10" },
};
const out = { label, exportKeys: Object.keys(mod), inheritAttrs: Dot?.inheritAttrs ?? "(default true)" };
for (const [k, props] of Object.entries(cells)) {
    const html = await renderToString(createSSRApp({ render: () => h(Dot, props) }));
    out[k] = { hasDataMixTarget: /data-mix-target/.test(html), rootTag: html.match(/^<!?\[?-*>?<?(\w+)/)?.[1] ?? html.slice(0, 20), head: html.slice(0, 260) };
}
console.log(JSON.stringify(out, null, 1));
