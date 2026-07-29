import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

async function trial(presetName, shot) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1, colorScheme: "light" });
    const page = await ctx.newPage();
    const msgs = [];
    page.on("console", (m) => msgs.push(m.type() + ": " + m.text().slice(0, 300)));
    page.on("pageerror", (e) => msgs.push("PAGEERROR: " + e.message + "\n" + String(e.stack || "").split("\n").slice(0, 6).join("\n")));
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.addInitScript(() => {});
    await page.evaluate(() => {
        window.__caught = [];
        const app = document.querySelector("#app")?.__vue_app__;
        if (app) {
            const prev = app.config.errorHandler;
            app.config.errorHandler = (err, inst, info) => {
                window.__caught.push(String(err && err.stack ? err.stack : err).slice(0, 800) + " || info=" + info);
                if (prev) prev(err, inst, info);
            };
        }
    });
    msgs.length = 0;
    await page.click('button[aria-label="Author a custom curve"]');
    await page.waitForTimeout(700);
    await page.click(".easing-authoring [aria-label='Easing preset']");
    await page.waitForTimeout(800);
    const box = await page.evaluate((name) => {
        const o = [...document.querySelectorAll("[role='option']")].find((x) => x.textContent.trim() === name);
        if (!o) return null;
        o.scrollIntoView({ block: "center" });
        const b = o.getBoundingClientRect();
        return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    }, presetName);
    if (!box) { console.log(presetName, "-> option not visible"); await browser.close(); return; }
    await page.mouse.click(box.x, box.y);
    await page.waitForTimeout(1500);
    const state = await page.evaluate(() => ({
        rows: document.querySelectorAll('[id^="easing-interval-"]').length,
        stage: !!document.querySelector(".easing-authoring"),
        tryAgain: !!([...document.querySelectorAll("button")].find((b) => /try again/i.test(b.textContent))),
        rowCss: (document.querySelector("#easing-interval-0 code") || {}).textContent,
        caught: window.__caught || [],
    }));
    console.log("=== preset:", presetName, JSON.stringify({ rows: state.rows, stage: state.stage, tryAgain: state.tryAgain, rowCss: state.rowCss }));
    if (state.caught.length) console.log("  CAUGHT:", state.caught.join("\n  ---\n").slice(0, 1200));
    const interesting = msgs.filter((m) => !/ResizeObserver|MISCONFIGURED/.test(m));
    if (interesting.length) console.log("  MSGS:", JSON.stringify(interesting.slice(0, 4), null, 1));
    if (shot) await page.screenshot({ path: `${OUT}/${shot}` });
    await browser.close();
}

await trial("ease-in", "EASD-preset-ease-in.png");
await trial("ease-out-back", "EASD-preset-back.png");
await trial("ease-in-back", null);
await trial("ease", null);
