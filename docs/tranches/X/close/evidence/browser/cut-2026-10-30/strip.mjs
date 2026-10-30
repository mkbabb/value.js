// SERVED MODEL: claude-opus-5-5
// X.W11.cut (COHESION §0gx.3, "identity look and motion unchanged"): the first-load motion, frame by frame, on the
// real-GPU launch at 1x. Per frame for 2.6 s: the transform and opacity of each pane's settle element, the dock, the
// canvas, and the frame `data-shell-settled` appears; plus a CDP screencast strip (no window capture). Run on the
// before-tree and the after-tree; both JSONs are read together. One browser, a new context per load, closed in finally.
// usage: node strip.mjs <origin> <loads> <out-prefix>
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const [origin, loadsArg, prefix] = process.argv.slice(2);
mkdirSync(dirname(prefix), { recursive: true });
const init = () => {
    window.__strip = [];
    const read = (el) => {
        if (!el) return null;
        const c = getComputedStyle(el);
        return `${c.transform}|${(+c.opacity).toFixed(3)}`;
    };
    const tick = () => {
        const panes = [...document.querySelectorAll(".pane-wrapper > *")].slice(0, 2);
        window.__strip.push({
            t: Math.round(performance.now()),
            panes: panes.map(read),
            dock: read(document.querySelector(".glass-dock")),
            canvas: read(document.querySelector(".atmosphere-canvas")),
            settled: document.documentElement.hasAttribute("data-shell-settled"),
            firstView: document.documentElement.dataset.firstView ?? null,
        });
        if (performance.now() < 2600) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const out = [];
try {
    for (let i = 0; i < Number(loadsArg); i++) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
        try {
            const page = await context.newPage();
            await page.addInitScript(init);
            const cdp = await context.newCDPSession(page);
            const shots = [];
            cdp.on("Page.screencastFrame", async (f) => {
                shots.push({ ts: f.metadata.timestamp, data: f.data });
                await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
            });
            if (i === 0) await cdp.send("Page.startScreencast", { format: "png", maxWidth: 640, everyNthFrame: 6 });
            await page.goto(`${origin}/#/`);
            await page.waitForTimeout(3000);
            if (i === 0) await cdp.send("Page.stopScreencast");
            out.push(await page.evaluate(() => window.__strip));
            shots.slice(0, 12).forEach((s, n) => {
                writeFileSync(`${prefix}-f${String(n).padStart(2, "0")}.png`, Buffer.from(s.data, "base64"));
            });
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(`${prefix}.json`, JSON.stringify(out));
const settledAt = (r) => r.find((f) => f.settled)?.t ?? null;
// when each pane's transform last changes: the settle's visible end
const landAt = (r, k) => { let last = null; for (let n = 1; n < r.length; n++) if ((r[n].panes[k] ?? "").split("|")[0] !== (r[n - 1].panes[k] ?? "").split("|")[0]) last = r[n].t; return last; };
const dockAt = (r) => { let last = null; for (let n = 1; n < r.length; n++) if (r[n].dock !== r[n - 1].dock) last = r[n].t; return last; };
console.log(JSON.stringify(out.map((r) => ({ frames: r.length, firstView: r.at(-1).firstView, settledAt: settledAt(r), pane0LandAt: landAt(r, 0), pane1LandAt: landAt(r, 1), dockLastChangeAt: dockAt(r) }))));
