// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-47 falsifier (:9000, 1440x900 headed, real GPU). On /blob, drive the
// Blob pane's "Body Radius" slider to its minimum and then to its maximum (keyboard Home/End)
// and count the hero blob's painted pixels (element screenshot, pixels whose colour departs
// from the frame's corner by > 40 in any channel). GREEN iff max-coverage / min-coverage ≥ 1.5.
// Usage: node probe-blob-geometry.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
await prepare(ctx, { theme });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/blob", { timeout: 90000 });
const slider = p.getByRole("slider", { name: /Body Radius/ }).first();
await slider.waitFor({ timeout: 60000 });
await p.waitForTimeout(2500);
const hero = p.locator("canvas").filter({ hasNot: p.locator("xx") });
const target = p.locator(".goo-blob-wrapper, [class*=hero-blob]").first();
const coverage = async () => {
    const buf = await target.screenshot();
    return p.evaluate(async (b64) => {
        const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const [r0, g0, b0] = [d[0], d[1], d[2]]; let n = 0;
        for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) > 40 || Math.abs(d[i + 1] - g0) > 40 || Math.abs(d[i + 2] - b0) > 40) n++;
        return { n, w: c.width, h: c.height };
    }, buf.toString("base64"));
};
await slider.focus();
await p.keyboard.press("Home");
await p.waitForTimeout(1500);
const lo = await coverage();
const vLo = await slider.getAttribute("aria-valuenow");
await p.keyboard.press("End");
await p.waitForTimeout(1500);
const hi = await coverage();
const vHi = await slider.getAttribute("aria-valuenow");
const ratio = hi.n / Math.max(lo.n, 1);
const ok = ratio >= 1.5;
console.log(`[${theme}]\n${ok ? "PASS" : "RED "} V-47 Body Radius drives the hero: min=${lo.n}px max=${hi.n}px ratio=${ratio.toFixed(2)} frame=${lo.w}x${lo.h} slider ${vLo}→${vHi}`);
await b.close();
process.exit(ok ? 0 : 1);
