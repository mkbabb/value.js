// SERVED MODEL: claude-opus-5-5
// X.W12U.q — is WebKit's "WebGL: context lost." the host or the product? Read-only.
//   leg A: a blank document, one WebGL2 context, read isContextLost at 0 / 2 / 6 s.
//   leg B: the app (iPhone 14 descriptor, as smoke-safari), patient budget: when do the two
//          canvases attach, which contexts are lost, what the console said, with timestamps.
// usage: node probe-webkit-gl.mjs [origin] [patienceMs]
import { webkit, devices } from "@playwright/test";
import { loadavg } from "node:os";
const origin = process.argv[2] ?? "http://localhost:9143";
const patience = Number(process.argv[3] ?? 90_000);
const browser = await webkit.launch({ headless: true });
const out = { load1Start: loadavg()[0], version: browser.version() };
{
    const page = await browser.newPage();
    out.blank = await page.evaluate(async () => {
        const c = document.createElement("canvas");
        document.body.appendChild(c);
        const events = [];
        c.addEventListener("webglcontextlost", () => events.push(`lost@${Math.round(performance.now())}`));
        const gl = c.getContext("webgl2");
        if (!gl) return { gl: null };
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        const r = [gl.isContextLost()];
        await new Promise((x) => setTimeout(x, 2000)); r.push(gl.isContextLost());
        await new Promise((x) => setTimeout(x, 4000)); r.push(gl.isContextLost());
        return { renderer, lostAt0_2_6s: r, events };
    });
    await page.close();
}
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"] });
    const page = await ctx.newPage();
    const t0 = Date.now();
    const log = [];
    page.on("console", (m) => { if (m.type() === "error" || /context/i.test(m.text())) log.push(`+${((Date.now() - t0) / 1000).toFixed(1)}s ${m.type()}: ${m.text().slice(0, 110)}`); });
    page.on("pageerror", (e) => log.push(`+${((Date.now() - t0) / 1000).toFixed(1)}s pageerror: ${String(e.message).slice(0, 110)}`));
    await page.goto(origin + "/", { timeout: patience }).catch((e) => log.push("goto: " + e.message.split("\n")[0]));
    out.gotoS = (Date.now() - t0) / 1000;
    const wait = async (id) => {
        try { await page.getByTestId(id).last().waitFor({ state: "attached", timeout: patience }); return (Date.now() - t0) / 1000; } catch { return null; }
    };
    out.blobAttachedS = await wait("goo-blob-canvas");
    out.atmosphereAttachedS = await wait("atmosphere-canvas");
    await page.waitForTimeout(3000);
    out.canvases = await page.evaluate(() => [...document.querySelectorAll("canvas")].map((c) => {
        const gl = c.getContext("webgl2");
        return { id: c.dataset.testid ?? c.className.slice(0, 30), w: c.width, h: c.height, lost: gl ? gl.isContextLost() : "no-gl2" };
    }));
    out.console = log.slice(0, 12);
    await ctx.close();
}
out.load1End = loadavg()[0];
console.log(JSON.stringify(out, null, 1));
await browser.close();
