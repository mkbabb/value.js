// CHALLENGE-C (2nd audit) probe C2-06 — paint the pole.
// WebKit, /#/ (About pane), scrolled 300px, at the three widths where
// probe-C2-05 measured the shipped ratio at -7.39 (1280), +10.87 (1024) and
// +13.17 (1300). Screenshots land beside this probe.
import { webkit } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:9000";
const DIR = new URL(".", import.meta.url).pathname;
const CELLS = [
    [1024, 900, "1024-plus10.87x"],
    [1280, 900, "1280-negative7.39x"],
    [1300, 900, "1300-plus13.17x"],
    [1440, 900, "1440-plus0.311x"],
];

const b = await webkit.launch();
for (const [w, h, tag] of CELLS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    p.setDefaultNavigationTimeout(180000);
    await p.goto(BASE + "/#/", { waitUntil: "domcontentloaded" });
    for (let i = 0; i < 6; i++) {
        const ok = await p
            .locator("main .pane-header")
            .first()
            .waitFor({ timeout: 30000 })
            .then(() => true)
            .catch(() => false);
        if (ok) break;
        await p.reload({ waitUntil: "domcontentloaded" });
    }
    await p.waitForTimeout(4000);
    const info = await p.evaluate(async () => {
        const host = Array.from(document.querySelectorAll(".pane-scroll-fade")).find(
            (el) => el.offsetParent !== null && el.scrollHeight - el.clientHeight > 200,
        );
        if (!host) return "no-host";
        host.scrollTop = 300;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const t = host.querySelector(".pane-header-title");
        const r = t.getBoundingClientRect();
        return {
            tf: getComputedStyle(t).transform,
            rect: {
                x: +r.x.toFixed(1),
                y: +r.y.toFixed(1),
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
                right: +r.right.toFixed(1),
                bottom: +r.bottom.toFixed(1),
            },
            viewport: { w: innerWidth, h: innerHeight },
        };
    });
    console.log(`webkit ${w}x${h}  ${JSON.stringify(info)}`);
    await p.screenshot({ path: `${DIR}shot-C2-webkit-${tag}.png` });
    await ctx.close();
}
await b.close();
