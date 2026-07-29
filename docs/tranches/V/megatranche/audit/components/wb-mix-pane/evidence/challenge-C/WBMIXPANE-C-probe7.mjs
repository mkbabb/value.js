import { chromium } from "playwright";
const seed = () => {
    const now = new Date().toISOString();
    const mk = (name, slug, css) => ({ id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now, colors: css.map((c, i) => ({ css: c, position: i })) });
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [mk("Probe A", "probe-a", ["#ff0000", "#00ff00", "#0000ff"]), mk("Probe B", "probe-b", ["#ffff00", "#00ffff", "#ff00ff"])] }));
};
const run = async (vw, vh, label) => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: vw, height: vh } });
    await page.addInitScript(seed);
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const main = page.getByRole("main");
    await main.getByRole("button", { name: "Palettes", exact: true }).click();
    await page.waitForTimeout(300);
    await main.getByRole("button", { name: /Select palette Probe A/ }).click();
    await main.getByRole("button", { name: /Select palette Probe B/ }).click();
    await page.waitForTimeout(300);
    await main.getByRole("button", { name: "Mix", exact: true }).click();
    await page.waitForTimeout(2000);
    const r = await page.evaluate(() => {
        const cards = [...document.querySelectorAll("main .pane-scroll-fade")];
        const mixCard = cards.find((c) => c.innerText.includes("Result") || c.innerText.includes("Mix"));
        const live = [...document.querySelectorAll("[aria-live]")].map((e) => ({
            tag: e.tagName, live: e.getAttribute("aria-live"),
            inMixCard: !!mixCard && mixCard.contains(e),
            cls: e.className.toString().slice(0, 50),
            text: e.innerText.replace(/\s+/g, " ").slice(0, 40),
        }));
        const plate = document.querySelector(".mix-plate");
        return {
            mixCard: mixCard ? {
                tabIndex: mixCard.tabIndex, role: mixCard.getAttribute("role"),
                clientH: mixCard.clientHeight, scrollH: mixCard.scrollHeight,
                keyboardScrollableNeeded: mixCard.scrollHeight - mixCard.clientHeight > 2,
                overflowY: getComputedStyle(mixCard).overflowY,
            } : null,
            liveRegions: live,
            plateAccessibleText: plate ? plate.innerText.replace(/\s+/g, " ") : null,
            plateAriaHiddenChildren: plate ? plate.querySelectorAll("[aria-hidden='true']").length : 0,
            canvasCount: document.querySelectorAll("main canvas").length,
        };
    });
    console.log(JSON.stringify({ label, vw, vh, ...r }, null, 1));
    await browser.close();
};
await run(1440, 1000, "desktop");
await run(390, 780, "mobile-iphone");
