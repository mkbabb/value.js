// SERVED MODEL: claude-opus-5-5 — Z1 recon: dock controls, landmarks, marks at 1440 and 390.
import { chromium } from "playwright";
import { boot, runCells, r1 } from "./lib.mjs";
const read = (page) => page.evaluate(() => {
    const rr = (r) => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) });
    const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
    const d = document.querySelector(".glass-dock");
    return {
        href: location.href, title: document.title,
        bodyAttrs: [...document.body.attributes].map((a) => a.name + "=" + a.value),
        bodyKids: [...document.body.children].map((e) => e.tagName + (e.id ? "#" + e.id : "") + "." + e.className).slice(0, 10),
        marks: performance.getEntriesByType("mark").map((m) => m.name).filter((n) => n.startsWith("overture")),
        h1: [...document.querySelectorAll("h1")].map((h) => ({ t: h.textContent.trim(), cls: h.className, vis: vis(h), r: rr(h.getBoundingClientRect()) })),
        main: document.querySelectorAll("main").length,
        status: [...document.querySelectorAll('[role=status],[aria-live]')].map((e) => ({ t: e.textContent.trim().slice(0, 80), role: e.getAttribute("role"), live: e.getAttribute("aria-live"), cls: e.className.toString().slice(0, 60) })),
        dock: d ? { cls: d.className, r: rr(d.getBoundingClientRect()), attrs: [...d.attributes].map((a) => a.name).filter((n) => n.startsWith("data")),
            btns: [...d.querySelectorAll("button,[role=button],input,a,[role=combobox]")].filter(vis).map((b) => (b.getAttribute("aria-label") || b.textContent.trim().slice(0, 24)) + "|" + b.tagName + "|" + rr(b.getBoundingClientRect()).w + "x" + rr(b.getBoundingClientRect()).h) } : null,
        canvases: [...document.querySelectorAll("canvas")].map((c) => c.className.toString().slice(0, 50) + "|" + (c.dataset.testid ?? "")),
        scroll: { sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight },
        wrappers: [...document.querySelectorAll(".pane-wrapper")].map((w) => w.className + "|" + JSON.stringify(rr(w.getBoundingClientRect()))),
        grid: getComputedStyle(document.querySelector(".pane-container") ?? document.body).gridTemplateColumns,
    };
});
await runCells(chromium, {
    async desk(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try { const p = await ctx.newPage(); const o = {}; for (const r of ["/", "/generate", "/no-such"]) { await boot(p, r, 3000); o[r] = await read(p); } return o; } finally { await ctx.close(); }
    },
    async mob(browser) {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
        try { const p = await ctx.newPage(); const o = {}; for (const r of ["/", "/generate"]) { await boot(p, r, 3000); o[r] = await read(p); } return o; } finally { await ctx.close(); }
    },
}, "recon");
