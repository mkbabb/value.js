import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const events = [];
page.on("pageerror", (e) => events.push("pageerror: " + e.message.split("\n")[0]));
page.on("console", (m) => events.push(m.type() + ": " + m.text().split("\n")[0].slice(0, 200)));
await page.addInitScript(() => {
    const now = new Date().toISOString();
    const mk = (name, slug, css) => ({ id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now, colors: css.map((c, i) => ({ css: c, position: i })) });
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [mk("Probe A", "probe-a", ["#ff0000", "not-a-color", "#0000ff"]), mk("Probe B", "probe-b", ["#ffff00", "#00ffff", "#ff00ff"])] }));
});
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
const main = page.getByRole("main");
await main.getByRole("button", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(300);
await main.getByRole("button", { name: /Select palette Probe A/ }).click();
await main.getByRole("button", { name: /Select palette Probe B/ }).click();
await page.waitForTimeout(250);
events.length = 0;
await main.getByRole("button", { name: "Mix", exact: true }).click();
await page.waitForTimeout(1800);
const after = await page.evaluate(() => ({
    bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 500),
    boundaryVisible: !!document.querySelector('[role="alert"]'),
    boundaryText: document.querySelector('[role="alert"]')?.innerText?.replace(/\s+/g, " ").slice(0, 200) ?? null,
    mainHTMLlen: document.querySelector("main")?.innerHTML.length,
}));
console.log(JSON.stringify({ events, after }, null, 1));
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBMIXPANE-C-badcolor.png" });
await browser.close();
