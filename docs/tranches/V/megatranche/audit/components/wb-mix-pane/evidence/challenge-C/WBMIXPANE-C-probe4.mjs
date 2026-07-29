import { chromium } from "playwright";

const run = async (kase) => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const events = [];
    page.on("pageerror", (e) => events.push({ src: "pageerror", msg: e.message.split("\n")[0] }));
    page.on("console", (m) => events.push({ src: "console." + m.type(), msg: m.text().split("\n").slice(0, 2).join(" | ").slice(0, 220) }));
    await page.addInitScript((k) => {
        const now = new Date().toISOString();
        const mk = (name, slug, css) => ({
            id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now,
            colors: css.map((c, i) => ({ css: c, position: i })),
        });
        localStorage.setItem("color-palettes", JSON.stringify({
            version: 1, palettes: [mk("Probe A", "probe-a", k.a), mk("Probe B", "probe-b", k.b)],
        }));
        window.__caught = [];
        window.addEventListener("error", (e) => window.__caught.push("window.error: " + e.message));
        window.addEventListener("unhandledrejection", (e) => window.__caught.push("unhandledrejection: " + e.reason));
    }, kase);
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    // capture Vue's configured error handler
    const cfg = await page.evaluate(() => {
        const app = document.querySelector("#app")?.__vue_app__;
        return { hasApp: !!app, errorHandler: app ? String(app.config.errorHandler).slice(0, 200) : null, warnHandler: app ? String(app.config.warnHandler).slice(0, 120) : null };
    });
    const main = page.getByRole("main");
    await main.getByRole("button", { name: "Palettes", exact: true }).click();
    await page.waitForTimeout(300);
    await main.getByRole("button", { name: /Select palette Probe A/ }).click();
    await main.getByRole("button", { name: /Select palette Probe B/ }).click();
    await page.waitForTimeout(250);
    const before = await page.evaluate(() => ({
        mixDisabled: [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "Mix")?.disabled,
        sources: document.querySelectorAll("[data-mix-source]").length,
    }));
    events.length = 0;
    await main.getByRole("button", { name: "Mix", exact: true }).click();
    await page.waitForTimeout(2000);
    const after = await page.evaluate(() => {
        const plate = document.querySelector(".mix-plate");
        return {
            plateHTML: plate ? plate.outerHTML.replace(/\s+/g, " ").slice(0, 700) : null,
            stuckGhost: !!document.querySelector(".mix-plate--ghost"),
            caught: window.__caught,
            mixStillClickable: !([...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "Mix")?.disabled),
        };
    });
    // second click — does the pane dead-end?
    await main.getByRole("button", { name: "Mix", exact: true }).click().catch(() => {});
    await page.waitForTimeout(1500);
    const after2 = await page.evaluate(() => ({
        plateMounted: !!document.querySelector(".mix-plate"),
        stuckGhost: !!document.querySelector(".mix-plate--ghost"),
    }));
    console.log(JSON.stringify({ case: kase.id, cfg, before, events, after, after2 }, null, 1));
    await browser.close();
};

await run({ id: "malformed-css", a: ["#ff0000", "not-a-color", "#0000ff"], b: ["#ffff00", "#00ffff", "#ff00ff"] });
await run({ id: "empty-palette", a: [], b: ["#ffff00", "#00ffff", "#ff00ff"] });
