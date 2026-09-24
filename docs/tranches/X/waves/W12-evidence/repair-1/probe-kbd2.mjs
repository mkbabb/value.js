// SERVED MODEL: claude-opus-5-5
// X-W12 Repair 1 probe (read-only). BASE=http://localhost:<port> node probe-kbd2.mjs
import { chromium } from "@playwright/test";
const N = Number(process.env.N ?? 5);
const WAIT = Number(process.env.WAIT ?? 0);
const browser = await chromium.launch({ headless: process.env.HEADED !== "1", channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
let bad = 0;
for (let i = 0; i < N; i++) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
        localStorage.setItem("vueuse-color-scheme", "light");
        window.__log = [];
        window.__t0 = { v: performance.now() };
        const L = (m) => window.__log.push(`${(performance.now() - window.__t0.v).toFixed(0)} ${m}`);
        document.addEventListener("focusin", (e) => {
            const el = e.target;
            L(`focus ${el.getAttribute("role") ?? el.tagName} ${(el.getAttribute("data-space") ?? "").trim()}`);
        }, true);
        document.addEventListener("keydown", (e) => L(`key ${e.key} on ${e.target.getAttribute("role") ?? e.target.tagName} ${e.target.getAttribute("data-space") ?? ""}`), true);
        const mo = new MutationObserver(() => {
            const t = document.querySelector(".space-trigger--inline");
            if (!t) return;
            const txt = t.innerText.trim();
            if (txt !== window.__lastTxt) { window.__lastTxt = txt; L(`about label=${txt}`); }
            const lb = document.querySelector("[role=listbox]");
            const st = lb ? "open" : "closed";
            if (st !== window.__lb) { window.__lb = st; L(`listbox ${st}`); }
        });
        addEventListener("DOMContentLoaded", () => mo.observe(document.body, { subtree: true, childList: true, characterData: true }));
    });
    await page.goto((process.env.BASE ?? "http://localhost:9000") + "/#/");
    const trigger = page.locator(".space-trigger--inline").first();
    await trigger.waitFor({ state: "visible", timeout: 20000 });
    await page.waitForTimeout(WAIT);
    await trigger.scrollIntoViewIfNeeded();
    await trigger.hover();
    await page.waitForTimeout(350);
    await page.mouse.move(1, 1);
    await page.keyboard.press("Tab");
    await trigger.focus();
    await page.waitForTimeout(250);
    const before = (await trigger.innerText()).trim();
    await page.evaluate(() => window.__log.push("---- Enter"));
    await page.keyboard.press("Enter");
    await page.getByRole("listbox").waitFor({ state: "visible" });
    await page.waitForTimeout(400);
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Profiler.enable");
    await cdp.send("Profiler.setSamplingInterval", { interval: 500 });
    await cdp.send("Profiler.start");
    const tr0 = Date.now();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(200);
    await page.waitForTimeout(1500);
    const { profile } = await cdp.send("Profiler.stop");
    const dt = profile.timeDeltas ?? [];
    const self = new Map();
    (profile.samples ?? []).forEach((id, j) => self.set(id, (self.get(id) ?? 0) + (dt[j] ?? 0)));
    const by = new Map();
    for (const n of profile.nodes) {
        const cf = n.callFrame;
        if (["(idle)", "(root)"].includes(cf.functionName)) continue;
        const k = `${cf.functionName || "(anon)"}@${(cf.url.split("/").pop() ?? "").split("?")[0]}:${cf.lineNumber + 1}`;
        by.set(k, (by.get(k) ?? 0) + (self.get(n.id) ?? 0));
    }
    console.log("  HOT " + [...by.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, us]) => `${k}=${(us / 1000).toFixed(0)}ms`).join(" · "));
    await page.keyboard.press("Enter");
    await page.waitForTimeout(800);
    const after = (await trigger.innerText()).trim();
    const log = await page.evaluate(() => window.__log);
    const k = log.indexOf("---- Enter");
    if (before === after) bad++;
    console.log(`#${i} ${before} -> ${after} ${before === after ? "UNCHANGED" : "ok"}\n  ${log.slice(Math.max(0, k - 6)).join("\n  ")}`);
    await ctx.close();
}
console.log(`bad=${bad}/${N}`);
await browser.close();
