// CHALLENGE-D · space-switch remount hole + scroll reset + skeleton frame.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames");
const out = {};
process.on("exit", () => {
    try {
        writeFileSync(resolve(HERE, "probe-D5.json"), JSON.stringify(out, null, 2));
    } catch {}
});

const browser = await webkit.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    deviceScaleFactor: 2,
});
const page = await ctx.newPage();
// slow every color-space doc so the transient state is observable
await page.route("**/*", async (route) => {
    if (/assets\/docs\/.*\.md/.test(route.request().url()))
        await new Promise((r) => setTimeout(r, 3000));
    return route.continue();
});
await page.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector(".markdown-body", { timeout: 60000 });
await page.waitForTimeout(2500);

// scroll the About card deep into the guide, then switch color space
out.before = await page.evaluate(async () => {
    const sc = document.querySelector(".about-card");
    sc.scrollTop = 2000;
    await new Promise((r) => setTimeout(r, 600));
    return {
        scrollTop: Math.round(sc.scrollTop),
        firstH2: document.querySelector(".markdown-body h2")?.textContent.trim(),
        bodyHeight: Math.round(document.querySelector(".markdown-body").getBoundingClientRect().height),
    };
});
await page.screenshot({ path: resolve(OUT, "D5-before-switch.png") });

// open the About header's color-space selector and pick a different space
const trigger = page.locator(".about-card [aria-haspopup], .about-card button[role=combobox], .about-card [data-slot=select-trigger]");
out.triggerCount = await trigger.count();
if (out.triggerCount) {
    await trigger.last().click();
    await page.waitForTimeout(900);
    const opt = page.locator("[role=option]").filter({ hasText: /okl/i });
    out.optionCount = await opt.count();
    if (out.optionCount) {
        await opt.first().click();
        // sample immediately — this is the transient the user actually sees
        for (const t of [120, 400, 900, 1800]) {
            await page.waitForTimeout(t === 120 ? 120 : 280);
            const s = await page.evaluate(() => {
                const sc = document.querySelector(".about-card");
                const sk = sc ? sc.querySelectorAll('[data-slot="skeleton"],[class*="skeleton" i]') : [];
                const body = document.querySelector(".markdown-body");
                return {
                    scrollTop: sc ? Math.round(sc.scrollTop) : null,
                    cardScrollHeight: sc ? sc.scrollHeight : null,
                    skeletonCount: sk.length,
                    skeletonRects: [...sk].map((x) => {
                        const r = x.getBoundingClientRect();
                        return { w: Math.round(r.width), h: Math.round(r.height) };
                    }),
                    markdownPresent: !!body,
                    bodyHeight: body ? Math.round(body.getBoundingClientRect().height) : 0,
                };
            });
            (out.samples ||= []).push({ tMark: t, ...s });
            if (t === 400) await page.screenshot({ path: resolve(OUT, "D5-during-switch.png") });
        }
    }
}
await page.waitForTimeout(4000);
out.after = await page.evaluate(() => {
    const sc = document.querySelector(".about-card");
    return {
        scrollTop: Math.round(sc.scrollTop),
        firstH2: document.querySelector(".markdown-body h2")?.textContent.trim(),
        bodyHeight: Math.round(document.querySelector(".markdown-body").getBoundingClientRect().height),
    };
});
await page.screenshot({ path: resolve(OUT, "D5-after-switch.png") });
await browser.close();
console.log(JSON.stringify(out, null, 2));
