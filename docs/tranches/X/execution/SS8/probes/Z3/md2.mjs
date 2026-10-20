// SS-8 · Z3 · Markdown follow-up. (1) capfix: the pi capture with the guide's
// `content-visibility:auto` rung overridden to `visible` FOR THE CAPTURE ONLY (stated): an element
// screenshot of a tall guide otherwise paints only the sections near the viewport (md.mjs cap frames
// are blank past ~1000 px in chromium and past the first child in webkit). (2) b4: the B4 dissent's
// re-trigger, a scroll-anchor + find-in-page probe over the oklch guide with the rung left AS SHIPPED.
import { cell, go, runCells, png } from "./lib.mjs";

const READY = ".about-card .markdown-wrapper h2, .about-card [data-guide-empty-state]";
const eng = process.env.Z3_ENGINE || "chromium";
const dark = process.env.Z3_SCHEME === "dark";

const cells = {
    capfix: async (b) => {
        const shots = {};
        for (const s of ["rgb", "oklch", "lch"]) {
            shots[s] = await cell(b, "capfix-" + s, { dark }, async (p) => {
                await go(p, `#/?space=${s}`, ".about-card", 300);
                await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
                await p.waitForTimeout(1500);
                await p.addStyleTag({ content: ".markdown-wrapper .markdown-body > * { content-visibility: visible !important; contain-intrinsic-size: none !important; }" });
                await p.evaluate(() => { for (let e = document.querySelector(".about-card .markdown-wrapper"); e; e = e.parentElement) { const cs = getComputedStyle(e); if (/auto|scroll|hidden/.test(cs.overflowY) || cs.maxHeight !== "none") { e.style.overflow = "visible"; e.style.maxHeight = "none"; e.style.height = "auto"; } if (e === document.body) break; } });
                await p.waitForTimeout(800);
                const el = p.locator(".about-card .markdown-wrapper").first();
                const box = await el.boundingBox();
                const name = `md-guide-${eng}-${dark ? "dark" : "light"}-${s}`;
                await el.screenshot({ path: png(name) });
                const h2 = await p.evaluate(() => { const h = document.querySelector(".about-card .markdown-wrapper h2"); return { color: getComputedStyle(h).color, h: h.getBoundingClientRect().height }; });
                return { name, box: box ? [Math.round(box.width), Math.round(box.height)] : null, h2 };
            });
        }
        return { shots };
    },
    b4: (b) => cell(b, "b4", { dark }, async (p) => {
        await go(p, "#/?space=oklch", ".about-card", 300);
        await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
        await p.waitForTimeout(1500);
        const port = ".about-card .fading-scroll";
        const info = await p.evaluate((port) => {
            const sp = document.querySelector(port);
            const kids = [...document.querySelectorAll(".about-card .markdown-wrapper .markdown-body > *")];
            return { port: !!sp, scrollH: sp?.scrollHeight, clientH: sp?.clientHeight, kids: kids.length, cv: kids[1] ? getComputedStyle(kids[1]).contentVisibility : null };
        }, port);
        // scroll-anchor: bring the 5th h2 into view; sample its offset from the port's top over time
        const anchor = await p.evaluate(async (port) => {
            const sp = document.querySelector(port);
            const hs = [...document.querySelectorAll(".about-card .markdown-wrapper h2")];
            const h = hs[Math.min(4, hs.length - 1)];
            const off = () => +(h.getBoundingClientRect().top - sp.getBoundingClientRect().top).toFixed(1);
            const sh0 = sp.scrollHeight;
            h.scrollIntoView({ block: "start" });
            const out = [{ t: 0, off: off(), st: sp.scrollTop, sh: sp.scrollHeight }];
            for (const t of [50, 200, 600, 1500]) { await new Promise((r) => setTimeout(r, t - out[out.length - 1].t)); out.push({ t, off: off(), st: sp.scrollTop, sh: sp.scrollHeight }); }
            return { text: h.textContent.trim().slice(0, 40), sh0, samples: out };
        }, port);
        // find-in-page: back to top, then search a phrase from the last paragraph of the guide
        const found = await p.evaluate(async (port) => {
            const sp = document.querySelector(port); sp.scrollTop = 0; await new Promise((r) => setTimeout(r, 400));
            const ps = [...document.querySelectorAll(".about-card .markdown-wrapper p")];
            const last = ps[ps.length - 1];
            const words = last.textContent.trim().split(/\s+/).slice(0, 4).join(" ");
            const hit = typeof window.find === "function" ? window.find(words, false, false, true) : "no window.find";
            await new Promise((r) => setTimeout(r, 400));
            const sel = getSelection();
            const r = sel && sel.rangeCount ? sel.getRangeAt(0).getBoundingClientRect() : null;
            const pr = sp.getBoundingClientRect();
            return { phrase: words, hit, selText: sel ? String(sel).slice(0, 40) : null, scrollTop: sp.scrollTop, selInPort: r ? r.top >= pr.top && r.bottom <= pr.bottom : null };
        }, port);
        return { info, anchor, found };
    }),
};

runCells("md2", cells);
