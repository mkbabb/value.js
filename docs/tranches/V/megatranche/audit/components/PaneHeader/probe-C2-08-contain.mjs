// CHALLENGE-C (2nd audit) probe C2-08 — the unscoped `.pane-scroll-fade`
// containment rule (PaneHeader.vue:54-57), which a LEAF component writes onto
// NINE sibling pane roots it does not own.
//   (1) is `contain` load-bearing for the stated purpose (timeline isolation)?
//       -> control experiment: strip it at runtime, re-measure the animation.
//   (2) what does it actually do? -> position:fixed containing-block trap.
import { chromium, webkit } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:9000";

for (const [engName, eng] of [["chromium", chromium], ["webkit", webkit]]) {
    const b = await eng.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
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
    await p.waitForTimeout(3500);

    for (const mode of ["SHIPPED", "contain:none"]) {
        if (mode !== "SHIPPED") {
            await p.addStyleTag({
                content: ".pane-scroll-fade { contain: none !important; }",
            });
            await p.waitForTimeout(400);
        }
        const r = await p.evaluate(async () => {
            const host = Array.from(
                document.querySelectorAll("main .pane-scroll-fade"),
            ).find(
                (el) =>
                    el.offsetParent !== null &&
                    el.scrollHeight - el.clientHeight > 200,
            );
            const hdr = host.querySelector(".pane-header");
            const title = hdr.querySelector(".pane-header-title");
            const read = async (y) => {
                host.scrollTop = y;
                await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                return {
                    veil: getComputedStyle(hdr, "::before").opacity,
                    tf: getComputedStyle(title).transform,
                };
            };
            const rest = await read(0);
            const stuck = await read(300);
            await read(0);
            // the position:fixed containing-block trap
            const probe = document.createElement("div");
            probe.style.cssText =
                "position:fixed;top:0;left:0;width:4px;height:4px;pointer-events:none";
            host.appendChild(probe);
            const q = probe.getBoundingClientRect();
            const h = host.getBoundingClientRect();
            probe.remove();
            return {
                contain: getComputedStyle(host).contain,
                rest,
                stuck,
                fixedLandsAt: { top: +q.top.toFixed(1), left: +q.left.toFixed(1) },
                hostOriginAt: { top: +h.top.toFixed(1), left: +h.left.toFixed(1) },
                viewportOrigin: { top: 0, left: 0 },
            };
        });
        console.log(`${engName} ${mode}: ${JSON.stringify(r)}`);
    }
    await b.close();
}
