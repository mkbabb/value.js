import { launch, cell, goGradient, save, EDITOR } from "./lib.mjs";
const b = await launch();
const out = {};
try {
    out.recon = await cell(b, {}, async (page) => {
        await goGradient(page);
        return await page.evaluate((EDITOR) => {
            const r = (el) => { if (!el) return null; const x = el.getBoundingClientRect(); return [Math.round(x.x), Math.round(x.y), Math.round(x.width), Math.round(x.height)]; };
            const ed = document.querySelector(EDITOR);
            const cs = getComputedStyle(ed);
            let p = ed.parentElement, scrollers = [];
            while (p) { const s = getComputedStyle(p); if (/auto|scroll/.test(s.overflowY)) scrollers.push({ tag: p.tagName, cls: p.className.slice(0, 120), rect: r(p), sh: p.scrollHeight, ch: p.clientHeight }); p = p.parentElement; }
            return {
                vw: innerWidth, html: document.documentElement.outerHTML.length,
                editorText: ed.textContent, editorRect: r(ed),
                editorStyle: { bg: cs.backgroundColor, font: cs.fontSize, ff: cs.fontFamily.slice(0, 60), wb: cs.wordBreak, ow: cs.overflowWrap, ac: ed.getAttribute("autocapitalize"), autocorrect: ed.getAttribute("autocorrect"), inputmode: ed.getAttribute("inputmode"), dir: ed.getAttribute("dir") },
                spans: [...ed.querySelectorAll("span")].slice(0, 12).map((s) => [s.className, s.textContent.slice(0, 20), getComputedStyle(s).color]),
                scrollers,
                h3: [...document.querySelectorAll("h3")].map((h) => [h.textContent.trim(), r(h), getComputedStyle(h).color]),
                tile: r(document.querySelector('[data-testid="gradient-render-tile"]')),
                sliders: [...document.querySelectorAll('[role="slider"]')].map((s) => [s.getAttribute("aria-label"), s.getAttribute("aria-valuenow"), s.getAttribute("aria-valuemax"), r(s)]),
                combos: [...document.querySelectorAll('[role="combobox"]')].map((s) => [s.textContent.trim().slice(0, 30), r(s)]),
                accordion: [...document.querySelectorAll('[data-state]')].filter((e) => /interval/.test(e.className)).length,
                toggles: document.querySelectorAll('[aria-pressed]').length,
                main: [...document.querySelectorAll("main, [class*=pane-main], [class*=pane-slot], section")].slice(0, 8).map((e) => [e.tagName, String(e.className).slice(0, 80), r(e)]),
            };
        }, EDITOR);
    });
} finally { await b.close(); }
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
save("recon.json", out);
