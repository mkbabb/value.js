// CHALLENGE-C (2nd audit) probe C2-05 — THE POLE.
//
// WebKit evaluates tan(atan2(<font-relative>, <font-relative>)) by feeding the
// DEGREE magnitude of the angle to tan() as RADIANS. The designed ratio sweeps
// atan2's angle from 45deg (phones, floor-pinned) to 31.7deg (>=1440 cap) as
// the viewport widens -- and 45..31.7 *radians* walks through several poles of
// tan. So the shipped `--pane-title-shrink-ratio` on WebKit is an unbounded,
// sign-changing function of viewport width, not a scale factor.
//
// Sweep the viewport width and read (a) the isolated calc value on a bare page
// and (b) the LIVE rendered title transform on http://localhost:9000/#/.
import { webkit, chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:9000";
const WIDTHS = [
    360, 390, 430, 640, 768, 900, 1024, 1100, 1180, 1200, 1240, 1280, 1300,
    1320, 1360, 1400, 1440, 1512, 1600, 1920,
];

// The two tokens, verbatim from glass-ui + demo/styles.
const HEADING = "1.618rem";
const DISPLAY1 = "clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)";

for (const [engName, eng] of [["webkit", webkit], ["chromium", chromium]]) {
    const b = await eng.launch();
    console.log(`\n########## ${engName} ##########`);
    console.log(
        "  width | display-1 px | designed h/d | SHIPPED tan(atan2()) | live title scale @ /#/",
    );
    for (const w of WIDTHS) {
        const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
        const p = await ctx.newPage();
        await p.setContent(
            `<style>:root{font-size:16px}</style><div id=t>x</div><div id=u>y</div>`,
        );
        const iso = await p.evaluate(
            ([h, d]) => {
                const t = document.getElementById("t");
                t.style.setProperty("--h", h);
                t.style.setProperty("--d", d);
                t.style.setProperty("--r", "calc(tan(atan2(var(--h), var(--d))))");
                t.style.transform = "scale(var(--r))";
                const shipped = getComputedStyle(t).transform;
                const u = document.getElementById("u");
                u.style.fontSize = d;
                const dpx = parseFloat(getComputedStyle(u).fontSize);
                u.style.fontSize = h;
                const hpx = parseFloat(getComputedStyle(u).fontSize);
                return { shipped, dpx, hpx };
            },
            [HEADING, DISPLAY1],
        );
        const shippedScale = (iso.shipped.match(/matrix\(([-\d.e]+)/) || [])[1] ?? iso.shipped;
        await ctx.close();

        // live arm
        const ctx2 = await b.newContext({ viewport: { width: w, height: 900 } });
        const p2 = await ctx2.newPage();
        let live = "n/a";
        try {
            await p2.goto(BASE + "/#/", { waitUntil: "load" });
            await p2.locator("main .pane-header").first().waitFor({ timeout: 15000 });
            await p2.waitForTimeout(2200);
            live = await p2.evaluate(async () => {
                const host = Array.from(
                    document.querySelectorAll(".pane-scroll-fade"),
                ).find(
                    (el) =>
                        el.offsetParent !== null &&
                        el.scrollHeight - el.clientHeight > 200,
                );
                if (!host) return "no-host";
                host.scrollTop = 300;
                await new Promise((r) => requestAnimationFrame(() => r(null)));
                await new Promise((r) => requestAnimationFrame(() => r(null)));
                const t = host.querySelector(".pane-header-title");
                const m = getComputedStyle(t).transform.match(/matrix\(([-\d.e]+)/);
                return m ? m[1] : getComputedStyle(t).transform;
            });
        } catch (e) {
            live = "ERR " + String(e).slice(0, 40);
        }
        await ctx2.close();

        const designed = (iso.hpx / iso.dpx).toFixed(6);
        const flag =
            Number(shippedScale) < 0
                ? "  <== NEGATIVE (mirrored)"
                : Number(shippedScale) > 1.05
                  ? "  <== ENLARGES"
                  : "";
        console.log(
            `  ${String(w).padStart(5)} | ${iso.dpx.toFixed(3).padStart(12)} | ${designed.padStart(12)} | ${String(shippedScale).padStart(20)} | ${String(live).padStart(12)}${flag}`,
        );
    }
    await b.close();
}
