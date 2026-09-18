// CHALLENGE-C probe C4 — does an ATMOSPHERE WebGL context loss delete the
// hero blob for the session? Patch getContext before boot so we hold the
// APP's own GL context (not a fresh one), then lose it before / after the
// b2 latch. Read-only.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/";
const browser = await chromium.launch();
const out = {};

async function run(loseAtMs) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript((t) => {
        window.__ctxLog = [];
        window.__glByClass = {};
        const orig = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (kind, ...rest) {
            const g = orig.call(this, kind, ...rest);
            try {
                window.__ctxLog.push({
                    kind,
                    cls: this.className || this.getAttribute("data-testid") || "(none)",
                    t: Math.round(performance.now()),
                    ok: !!g,
                });
                if (g && /webgl/.test(String(kind))) {
                    const key = String(this.className).includes("atmosphere")
                        ? "atmosphere"
                        : this.getAttribute("data-testid") === "goo-blob-canvas"
                          ? "blob"
                          : "other";
                    if (!window.__glByClass[key]) window.__glByClass[key] = g;
                }
            } catch {}
            return g;
        };
        if (t !== null) {
            setTimeout(() => {
                const g = window.__glByClass.atmosphere;
                if (!g) { window.__loss = "NO-APP-GL-ON-ATMOSPHERE"; return; }
                const ext = g.getExtension("WEBGL_lose_context");
                if (!ext) { window.__loss = "NO-EXT"; return; }
                ext.loseContext();
                window.__loss = Math.round(performance.now());
            }, t);
        }
    }, loseAtMs);
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(15000);
    const r = await page.evaluate(() => ({
        loss: window.__loss ?? null,
        ctxLog: window.__ctxLog,
        marks: performance.getEntriesByType("mark").filter((m) => m.name.startsWith("overture:")).map((m) => `${m.name}@${Math.round(m.startTime)}`),
        blobCanvasPresent: !!document.querySelector('[data-testid="goo-blob-canvas"]'),
        canvasCount: document.querySelectorAll("canvas").length,
        atmosphereLost: (() => {
            const g = window.__glByClass.atmosphere;
            return g ? g.isContextLost() : null;
        })(),
    }));
    await ctx.close();
    return r;
}

out.control = await run(null);
out.loseAt500 = await run(500);
out.loseAt1000 = await run(1000);
out.loseAt3000_postB4 = await run(3000);

await browser.close();
console.log(JSON.stringify(out, null, 2));
