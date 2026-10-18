// SERVED MODEL: claude-opus-5-5
// X.W10.d · G-5 companion (not the gate): does the condensed register's real
// box shrink (caption out of layout + padding/gap one φ rung down) make glass's
// hysteresis oscillate? Scrolls the admin pane host to each value near the
// condense (20) / expand (12) triggers, then samples `data-condensed` and
// `scrollTop` every 50 ms for 1.5 s and reports the number of state flips.
// One chromium headless-shell browser, one context, closed in finally.
// Usage: node g5-threshold.mjs   (dev server on :9000)
import { chromium } from "playwright";

const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const p = await ctx.newPage();
        await p.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
        await p.route("**/sessions", (rt) =>
            rt.fulfill({ status: 200, contentType: "application/json", body: rt.request().method() === "POST" ? JSON.stringify({ token: "test-session-token", userSlug: "test-user" }) : "{}" }),
        );
        await p.route("**/admin/**", (rt) => {
            const u = rt.request().url();
            if (!new URL(u).pathname.startsWith("/admin/")) return rt.continue();
            const body = u.includes("/admin/tags") ? "[]" : JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });
            return rt.fulfill({ status: 200, contentType: "application/json", body });
        });
        await p.goto("http://localhost:9000/#/admin/users", { waitUntil: "networkidle", timeout: 45000 });
        await p.waitForTimeout(1500);
        await p.evaluate(() => {
            const host = document.querySelector(".card-scroll-host.pane-scroll-fade");
            const s = document.createElement("div");
            s.style.cssText = "flex:none;height:2000px";
            host.append(s);
        });
        for (const top of [0, 14, 19, 20, 21, 25, 40, 70, 25, 13, 12, 11, 0]) {
            const r = await p.evaluate(async (t) => {
                const host = document.querySelector(".card-scroll-host.pane-scroll-fade");
                const h = host.querySelector(".pane-header");
                host.scrollTop = t;
                const states = [];
                for (let i = 0; i < 30; i++) {
                    await new Promise((res) => setTimeout(res, 50));
                    states.push(`${h.getAttribute("data-condensed")}@${Math.round(host.scrollTop)}`);
                }
                let flips = 0;
                for (let i = 1; i < states.length; i++) if (states[i].split("@")[0] !== states[i - 1].split("@")[0]) flips++;
                return { first: states[0], last: states.at(-1), flips };
            }, top);
            console.log(`set ${String(top).padStart(3)} first ${r.first} last ${r.last} flips-after-settle ${r.flips}`);
        }
    } finally {
        await ctx.close();
    }
} finally {
    await browser.close();
}
