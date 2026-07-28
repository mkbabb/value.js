// CHALLENGE-C probe C5 — does the W3-3 idle park survive a POINTER wake?
// HeroBlob binds `:paused="blobPaused"` one-way (HeroBlob.vue:17), and the
// producer edge-triggers on the prop (`R(() => t.paused, e => e?P.pause():
// P.resume())`, blob.js) while ALSO waking itself on pointer activity
// (`R(() => v.active.value, e => e && P.wake())`). So once blobPaused is
// already `true`, a pointer wake resumes the engine with NO prop edge left
// to re-park it. Count real GL draw calls to decide. Read-only.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/";
const BLOB_IDLE_MS = 2000, SLEEPY_POSE_MS = 3300, PARK_SETTLE_MS = BLOB_IDLE_MS + SLEEPY_POSE_MS + 800;
const SAMPLE_MS = 2500;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(() => {
    window.__draws = 0;
    const patch = (proto) => {
        if (!proto) return;
        for (const m of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
            const o = proto[m];
            if (!o) continue;
            proto[m] = function (...a) { window.__draws++; return o.apply(this, a); };
        }
    };
    patch(window.WebGL2RenderingContext && WebGL2RenderingContext.prototype);
    patch(window.WebGLRenderingContext && WebGLRenderingContext.prototype);
});
await page.goto(URL, { waitUntil: "load" });

const sample = async (label) => {
    const a = await page.evaluate(() => window.__draws);
    await page.waitForTimeout(SAMPLE_MS);
    const b = await page.evaluate(() => window.__draws);
    return { label, draws: b - a, perSec: +((b - a) / (SAMPLE_MS / 1000)).toFixed(1) };
};

const out = { blobIdleMs: BLOB_IDLE_MS, sleepyPoseMs: SLEEPY_POSE_MS, parkSettleMs: PARK_SETTLE_MS, sampleMs: SAMPLE_MS, steps: [] };

// wait for the blob to exist
await page.waitForSelector('[data-testid="goo-blob-canvas"]', { timeout: 20000 });
out.steps.push(await sample("1 · live, just after mount"));

// true idle past the full park latency
await page.waitForTimeout(PARK_SETTLE_MS);
out.steps.push(await sample("2 · after the full park latency (expect ~0 — the W3-3 gate)"));

// a pointer wake: hover the bead, then move the pointer far away
const box = await page.locator('[data-testid="goo-blob-canvas"]').boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
await page.waitForTimeout(300);
await page.mouse.move(5, 5, { steps: 8 });
out.steps.push(await sample("3 · immediately after a hover wake"));

// then a SECOND full park latency with zero further input
await page.waitForTimeout(PARK_SETTLE_MS);
out.steps.push(await sample("4 · a second full park latency after the hover (expect ~0 if the gate re-parks)"));
await page.waitForTimeout(PARK_SETTLE_MS);
out.steps.push(await sample("5 · a THIRD park latency (total idle after hover ≈ 16s)"));

out.paused = await page.evaluate(() => {
    const el = document.querySelector(".goo-blob-wrapper");
    const inst = el && el.__vueParentComponent;
    return inst ? { pausedProp: inst.props.paused } : null;
});

await browser.close();
console.log(JSON.stringify(out, null, 2));
