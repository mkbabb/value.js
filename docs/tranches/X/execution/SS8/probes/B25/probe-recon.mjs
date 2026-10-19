// SERVED MODEL: claude-opus-5-5 · B25 recon — one light cell: structure of the extract inputs at HEAD.
import { launch, open, makePng, feed, waitRail, save } from "./lib.mjs";

const b = await launch();
try {
    const { ctx, p, errors } = await open(b, { color: "oklch(0.7 0.15 40)" });
    try {
        const out = {};
        out.empty = await p.evaluate(() => {
            const z = document.querySelector('[aria-label="Upload image"]');
            const cs = getComputedStyle(z);
            return { cls: z.className, border: cs.border, rect: z.getBoundingClientRect().toJSON(), panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.getAttribute("data-pane")) };
        });
        await feed(p, await makePng(p, 1600, 1000));
        await waitRail(p);
        out.populated = await p.evaluate(() => {
            const rail = document.querySelector('[data-o18="extract-k-rail"]');
            const sl = [...document.querySelectorAll('[data-o18^="extract-k"] .glass-slider, [data-o18="extract-kc"] .glass-slider')].map((s) => ({ cls: s.className.slice(0, 120), variant: s.dataset.variant, html: s.outerHTML.slice(0, 600) }));
            return { railStyle: rail.getAttribute("style"), sliders: sl, thumbs: [...document.querySelectorAll('[role="slider"]')].map((t) => t.getAttribute("aria-label")) };
        });
        save("recon.json", { ...out, errors });
        console.log(JSON.stringify(out, null, 1).slice(0, 5000));
    } finally { await ctx.close(); }
} finally { await b.close(); }
