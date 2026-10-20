// SERVED MODEL: claude-opus-5-5 · SS-8 B24 recon: /#/mix structure (config bar, tabs, collapsible, card chain).
import { launch, open, readyMix, addCurrent, save, pal, hues } from "./lib.mjs";
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const b = await launch();
try {
    const { ctx, p, errors } = await open(b, { saved: SAVED, inst: false });
    try {
        await readyMix(p);
        await addCurrent(p, 2);
        const r = await p.evaluate(() => {
            const cls = (n) => (n.className?.baseVal ?? n.className ?? "").toString().slice(0, 140);
            const mix = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
            const chain = [];
            for (let n = mix, i = 0; n && i < 12; n = n.parentElement, i++) {
                const cs = getComputedStyle(n);
                chain.push({ tag: n.tagName, cls: cls(n), bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 80), ovy: cs.overflowY, h: n.getBoundingClientRect().height });
            }
            const q = (s) => [...document.querySelectorAll(s)].map((e) => ({ tag: e.tagName, cls: cls(e), rect: e.getBoundingClientRect().toJSON(), text: e.innerText?.slice(0, 40), attrs: [...e.attributes].map((a) => a.name).join(",") }));
            return { chain, tabs: q('[role="tab"]'), triggers: q('[role="combobox"]'), coll: q('[aria-label^="Colors of"]'), h3: q("h3"), add: q(".add-slot-ghost"), chips: q(".mix-chip"), mixBtn: { cls: cls(mix), rect: mix.getBoundingClientRect().toJSON(), disabled: mix.disabled } };
        });
        save("recon.json", { r, errors });
        console.log(JSON.stringify({ r, errors }, null, 1).slice(0, 7000));
    } finally { await ctx.close(); }
} finally { await b.close(); }
