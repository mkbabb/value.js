// SERVED MODEL: claude-opus-5-5
// X.W11.tbt (COHESION §0gv.1): proves the browser lighthouserc.gpu.json launches
// lands on ANGLE Metal, not SwiftShader. Same binary (Playwright's full Chrome
// for Testing) and the same flags as the cell's collect.settings.chromeFlags.
// One browser, one context, closed in finally (machine law).
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const cfg = JSON.parse(
    readFileSync(
        new URL("../../../../../../../lighthouserc.gpu.json", import.meta.url),
    ),
);
const flags = cfg.ci.collect.settings.chromeFlags
    .split(/\s+/)
    .filter((f) => !f.startsWith("--headless"));
const browser = await chromium.launch({
    executablePath: chromium.executablePath(),
    headless: true,
    args: flags,
});
try {
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        const renderer = await page.evaluate(() => {
            const gl = document.createElement("canvas").getContext("webgl2");
            if (!gl) return null;
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext
                ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
                : gl.getParameter(gl.RENDERER);
        });
        console.log(
            JSON.stringify({
                executable: chromium.executablePath(),
                version: browser.version(),
                flags,
                renderer,
            }),
        );
    } finally {
        await context.close();
    }
} finally {
    await browser.close();
}
