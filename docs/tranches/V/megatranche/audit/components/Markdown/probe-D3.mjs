// CHALLENGE-D · viewport frames of the markdown body, scrolled into view.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });
const out = {};
process.on("exit", () => {
    try {
        writeFileSync(resolve(HERE, "probe-D3.json"), JSON.stringify(out, null, 2));
    } catch {}
});

const MAT = [
    { n: "desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 } },
    { n: "desktop-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 } },
    { n: "mobile-dark", ctx: { ...devices["iPhone 14"], colorScheme: "dark" } },
];

for (const m of MAT) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext(m.ctx);
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3500);
    if (!(await page.locator(".markdown-body").count())) {
        const b = page.getByRole("button", { name: "About" });
        if (await b.count()) {
            await b.first().click();
            await page.waitForTimeout(2000);
        }
    }
    await page.waitForSelector(".markdown-body", { timeout: 60000 });
    await page.waitForTimeout(1500);

    // scroll the About card so the first markdown h2 sits near the top
    const info = await page.evaluate(async () => {
        const sc = document.querySelector(".about-card");
        const h2 = document.querySelector(".markdown-body h2");
        if (!sc || !h2) return null;
        // force full render so intrinsic sizes settle
        for (let i = 0; i < 40; i++) {
            sc.scrollTop += sc.clientHeight * 0.8;
            await new Promise((r) => requestAnimationFrame(r));
        }
        sc.scrollTop = 0;
        await new Promise((r) => setTimeout(r, 500));
        const target =
            h2.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 24;
        sc.scrollTop = target;
        await new Promise((r) => setTimeout(r, 800));
        return { settledScrollHeight: sc.scrollHeight, scrollTop: Math.round(sc.scrollTop) };
    });
    out[m.n] = info;
    await page.screenshot({ path: resolve(OUT, `D3-${m.n}.png`) });

    // second frame: deeper — the KaTeX conversion section
    await page.evaluate(async () => {
        const sc = document.querySelector(".about-card");
        const k = document.querySelector(".markdown-body .katex-display");
        if (!sc || !k) return;
        sc.scrollTop =
            k.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 120;
        await new Promise((r) => setTimeout(r, 700));
    });
    await page.screenshot({ path: resolve(OUT, `D3-${m.n}-katex.png`) });
    await browser.close();
}
console.log(JSON.stringify(out, null, 2));
