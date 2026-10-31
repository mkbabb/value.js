// SERVED MODEL: claude-opus-5-5
// X.W11.lhb (COHESION §0gy.6): one bounded read of the WebGL renderer on the GPU lhci cell's own binary and flags
// (lighthouserc.gpu.json collect.chromePath + chromeFlags, new headless as LHCI launches it), so "ANGLE Metal" is a
// measurement, not an inference from the flag. Playwright's launch gives a fresh temporary profile, never the owner's.
// One browser, one context, closed in finally. usage (repo root): node <this file>
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const cfg = JSON.parse(readFileSync("lighthouserc.gpu.json", "utf8")).ci.collect;
const browser = await chromium.launch({
    executablePath: cfg.chromePath,
    headless: true,
    args: cfg.settings.chromeFlags.split(" "),
});
try {
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        await page.setContent("<canvas></canvas>");
        const renderer = await page.evaluate(() => {
            const gl = document.querySelector("canvas").getContext("webgl2");
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER);
        });
        console.log(
            JSON.stringify({
                binary: cfg.chromePath,
                version: browser.version(),
                flags: cfg.settings.chromeFlags,
                renderer,
            }),
        );
    } finally {
        await context.close();
    }
} finally {
    await browser.close();
}
