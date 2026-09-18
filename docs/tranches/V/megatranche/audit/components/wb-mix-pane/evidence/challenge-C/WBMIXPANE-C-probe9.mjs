import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => {
    const now = new Date().toISOString();
    const mk = (name, slug, css) => ({ id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now, colors: css.map((c, i) => ({ css: c, position: i })) });
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [mk("Probe A", "probe-a", ["#ff0000", "#00ff00", "#0000ff"])] }));
});
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

// colors mode is the default. Open the "From palettes" collapsible.
const before = await page.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
await page.getByText("From palettes").click();
await page.waitForTimeout(500);
const swatches = await page.evaluate(() => {
    const cc = document.querySelector('[data-state="open"]') || document.querySelector("main");
    const dots = [...cc.querySelectorAll(".watercolor-swatch")];
    return dots.slice(0, 8).map((d) => ({
        tag: d.tagName, ariaHidden: d.getAttribute("aria-hidden"),
        ariaLabel: d.getAttribute("aria-label"), title: d.getAttribute("title"),
        pe: getComputedStyle(d).pointerEvents,
        w: Math.round(d.getBoundingClientRect().width),
    }));
});
// try to click one of the palette swatches by geometry (force past pointer-events:none)
const clicked = await page.evaluate(() => {
    const dots = [...document.querySelectorAll(".watercolor-swatch")].filter((d) => d.getBoundingClientRect().width > 20 && d.getBoundingClientRect().width < 40);
    if (!dots.length) return "no candidate";
    dots[dots.length - 1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return "dispatched on " + dots.length + " candidates; used last";
});
await page.waitForTimeout(600);
const after = await page.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
const mixDisabled = await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "Mix")?.disabled);
console.log(JSON.stringify({ before, swatches, clicked, after, mixDisabled }, null, 1));
await browser.close();
