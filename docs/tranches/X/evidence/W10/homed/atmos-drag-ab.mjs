// SERVED MODEL: claude-opus-5-5
// X.W10.h · ATMOS-DRAG-COMPOSITION — the decision's A/B on the real-GPU cell.
//
// Browser channel: installed Google Chrome (`channel: "chrome"`, new headless,
// ANGLE Metal). This is the NAMED WITNESS the machine law admits full Chrome
// for: the real-GPU cell of record (COHESION §0ei, e2e/smoke/perf/real-gpu.ts),
// the cell §0fr.3 names for this row's falsifier. No window opens.
//
// Read-only: no product byte is written. Each arm is a fresh context of ONE
// browser; an arm's treatment is injected into that context's page only:
//   A  as shipped
//   B  "fewer blurred layers": the in-plate console (`.sliders-console`, the
//      only blurred layer inside a pane plate) drops its backdrop-filter
//   C  "pause the atmosphere repaint" proxy: the atmosphere canvas is hidden,
//      so the backdrop behind the glass is static during the drag
// Drags: the spectrum surface (xy) and the L slider (x), 2 s there-and-back,
// 1440x900, dark, `#/?space=lab` — the w12-drag.spec.ts protocol.
//   node atmos-drag-ab.mjs <origin> <out.json>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const origin = process.argv[2] ?? "http://localhost:9041";
const out = process.argv[3] ?? "atmos-drag-ab.json";
const ARMS = {
    A: "",
    B: ".sliders-console{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}",
    C: ".atmosphere-canvas{visibility:hidden!important}",
};
const DRAG_MS = 2000;
const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : NaN; };

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const result = { origin, arms: {} };
try {
    for (const [arm, css] of Object.entries(ARMS)) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => {
                localStorage.setItem("vueuse-color-scheme", "dark");
                window.__f = []; let last = 0;
                const tick = (t) => { if (last) window.__f.push(t - last); last = t; requestAnimationFrame(tick); };
                requestAnimationFrame(tick);
            });
            await page.goto(origin + "/#/?space=lab");
            if (css) await page.addStyleTag({ content: css });
            await page.waitForTimeout(3500);
            const renderer = await page.evaluate(() => {
                const gl = document.createElement("canvas").getContext("webgl2");
                const ext = gl?.getExtension("WEBGL_debug_renderer_info");
                return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "unknown";
            });
            const blurred = await page.evaluate(() => [...document.querySelectorAll("body *")].filter((el) => {
                const b = getComputedStyle(el).backdropFilter; return b && b !== "none" && el.getBoundingClientRect().width > 0;
            }).length);
            const rows = {};
            for (const [name, sel, axis] of [["surface", ".spectrum-picker", "xy"], ["slider L", null, "x"]]) {
                const target = sel ? page.locator(sel).first() : page.getByRole("slider", { name: "L channel" }).first();
                const b = await target.boundingBox();
                if (!b) throw new Error(`${name} not laid out`);
                const y0 = b.y + (axis === "xy" ? b.height * 0.15 : b.height / 2);
                const y1 = b.y + (axis === "xy" ? b.height * 0.85 : b.height / 2);
                const x0 = b.x + b.width * 0.08, x1 = b.x + b.width * 0.92;
                await page.mouse.move(x0, y0);
                await page.mouse.down();
                await page.evaluate(() => { window.__f = []; });
                const start = Date.now();
                while (Date.now() - start < DRAG_MS) {
                    const u = ((Date.now() - start) / DRAG_MS) * 2;
                    const k = u <= 1 ? u : 2 - u;
                    await page.mouse.move(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k);
                }
                const f = await page.evaluate(() => window.__f.slice());
                await page.mouse.up();
                rows[name] = { frames: f.length, p50: +pct(f, 0.5).toFixed(1), p95: +pct(f, 0.95).toFixed(1) };
                await page.waitForTimeout(500);
            }
            result.arms[arm] = { css, renderer, blurred, rows };
            console.log(`arm ${arm} blurred=${blurred} ` + Object.entries(rows).map(([k, v]) => `${k}: frames=${v.frames} p50=${v.p50} p95=${v.p95}`).join(" | ") + ` renderer=${String(renderer).slice(0, 60)}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(out, JSON.stringify(result, null, 2));
