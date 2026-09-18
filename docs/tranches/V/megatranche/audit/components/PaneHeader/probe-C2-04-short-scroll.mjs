// CHALLENGE-C (2nd audit) probe C2-04 — THE UNRESOLVABLE POSE.
//
// The three ranges are absolute pixel constants: veil 0..64px, title 0..120px,
// desc 0..80px (PaneHeader.vue:181,187,192). Nothing anywhere checks that the
// pane HAS that much scroll travel. Where maxScroll < range, `fill: both` parks
// the element at a fractional pose FOREVER — a state that is neither the
// designed rest rung nor the designed stuck rung, and that no user input can
// resolve.
//
// Measures, per route x viewport: host scrollHeight/clientHeight/maxScroll, and
// the veil / title-scale / desc-opacity at maxScroll.
import { chromium, webkit } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:9000";
const ROUTES = ["/#/", "/#/gradient", "/#/generate", "/#/extract", "/#/mix", "/#/browse"];
const VIEWPORTS = [
    ["e2e-smoke 1280x720", { width: 1280, height: 720 }],
    ["desktop 1440x900", { width: 1440, height: 900 }],
    ["laptop 1512x982", { width: 1512, height: 982 }],
];

for (const [engName, eng] of [["chromium", chromium], ["webkit", webkit]]) {
    const b = await eng.launch();
    for (const [vpName, viewport] of VIEWPORTS) {
        const ctx = await b.newContext({ viewport });
        const p = await ctx.newPage();
        console.log(`\n########## ${engName} @ ${vpName} ##########`);
        for (const route of ROUTES) {
            await p.goto(BASE + route, { waitUntil: "load" });
            await p
                .locator("main .pane-header")
                .first()
                .waitFor({ state: "visible", timeout: 20000 })
                .catch(() => {});
            await p.waitForTimeout(2600);
            const r = await p.evaluate(async () => {
                const hosts = Array.from(
                    document.querySelectorAll(".pane-scroll-fade"),
                ).filter((el) => el.offsetParent !== null);
                const out = [];
                for (const host of hosts) {
                    const hdr = host.querySelector(".pane-header");
                    if (!hdr) continue;
                    const title = hdr.querySelector(".pane-header-title");
                    const desc = hdr.querySelector(".pane-header-desc-wrap > p");
                    const max = host.scrollHeight - host.clientHeight;
                    host.scrollTop = 0;
                    await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                    await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                    const rest = {
                        veil: getComputedStyle(hdr, "::before").opacity,
                        tf: getComputedStyle(title).transform,
                        desc: desc ? getComputedStyle(desc).opacity : null,
                    };
                    host.scrollTop = 1e7;
                    await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                    await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                    const end = {
                        at: host.scrollTop,
                        veil: getComputedStyle(hdr, "::before").opacity,
                        tf: getComputedStyle(title).transform,
                        desc: desc ? getComputedStyle(desc).opacity : null,
                    };
                    host.scrollTop = 0;
                    out.push({
                        title: (title.textContent || "").trim().slice(0, 22),
                        scrollH: host.scrollHeight,
                        clientH: host.clientHeight,
                        maxScroll: max,
                        rest,
                        end,
                    });
                }
                return out;
            });
            for (const h of r) {
                const scale = (h.end.tf.match(/matrix\(([-\d.]+)/) || [])[1];
                const flags = [];
                if (h.maxScroll > 0 && h.maxScroll < 64) flags.push("VEIL-UNREACHABLE");
                if (h.maxScroll > 0 && h.maxScroll < 120) flags.push("TITLE-UNREACHABLE");
                if (h.maxScroll > 0 && h.maxScroll < 80) flags.push("DESC-UNREACHABLE");
                console.log(
                    `  ${route.padEnd(14)} "${h.title}" maxScroll=${h.maxScroll}  END veil=${h.end.veil} scale=${scale ?? h.end.tf} descOp=${h.end.desc}  ${flags.join(",")}`,
                );
            }
        }
        await ctx.close();
    }
    await b.close();
}
