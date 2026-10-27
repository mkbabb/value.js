// OD19 residue — the 390 Home→Mix hop on the real-GPU cell: per frame scrollY,
// the region roots' boxes, and layout-shift sources. Real Chrome headless on
// ANGLE-Metal (named need: the §0gp.2 GPU budget read). One browser, one
// context, closed in finally.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:8471";
const W = +(process.env.W ?? 390);
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const out = {};
try {
    const ctx = await browser.newContext({ viewport: { width: W, height: W === 390 ? 844 : 900 } });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 120000 });
        await page.getByRole("main").waitFor();
        await page.waitForTimeout(6000);
        for (const [hash, label] of [["#/gradient", "Gradient"], ["#/", "Home"], ["#/mix", "Mix"]]) {
            out[label] = await page.evaluate(async ({ hash }) => {
                const SELS = [".pane-wrapper--stage > *", ".pane-wrapper--inspector > *"];
                const shifts = [];
                const po = new PerformanceObserver((l) => { for (const e of l.getEntries()) shifts.push({ t: Math.round(e.startTime - t0), v: +e.value.toFixed(3), src: (e.sources ?? []).map((s) => { const n = s.node; return `${n?.nodeName}.${(n?.className?.baseVal ?? n?.className ?? "").toString().slice(0, 60)} ${JSON.stringify([Math.round(s.previousRect.y), Math.round(s.currentRect.y), Math.round(s.previousRect.height), Math.round(s.currentRect.height)])}`; }) }); });
                po.observe({ type: "layout-shift", buffered: false });
                const rows = [];
                const read = (t) => rows.push([Math.round(t), scrollY, document.documentElement.scrollHeight, ...SELS.flatMap((s) => [...document.querySelectorAll(s)].map((el) => { const r = el.getBoundingClientRect(); return `${el.className.toString().slice(0, 40)}|y${Math.round(r.y)}|h${Math.round(r.height)}|o${(+getComputedStyle(el).opacity).toFixed(2)}`; }))]);
                const t0 = performance.now();
                read(0);
                location.hash = hash;
                while (performance.now() - t0 < 900) { const ts = await new Promise((r) => requestAnimationFrame(r)); read(ts - t0); }
                po.disconnect();
                return { rows: rows.slice(0, 14), shifts };
            }, { hash });
            await page.waitForTimeout(1500);
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
writeFileSync(process.env.OUT ?? "/dev/stdout", JSON.stringify(out, null, 1));
