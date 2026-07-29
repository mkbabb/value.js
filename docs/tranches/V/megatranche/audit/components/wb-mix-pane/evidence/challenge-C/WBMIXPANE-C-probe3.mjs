import { chromium } from "playwright";

const CASES = [
    { id: "malformed-css", a: ["#ff0000", "not-a-color", "#0000ff"], b: ["#ffff00", "#00ffff", "#ff00ff"] },
    { id: "empty-palette", a: [], b: ["#ffff00", "#00ffff", "#ff00ff"] },
    { id: "css-var", a: ["var(--primary)", "#00ff00"], b: ["#ffff00", "#00ffff"] },
    { id: "relative-color", a: ["rgb(from red r g b)", "#00ff00"], b: ["#ffff00", "#00ffff"] },
    { id: "oklch-empty-args", a: ["oklch()", "#00ff00"], b: ["#ffff00", "#00ffff"] },
    { id: "well-formed-control", a: ["#ff0000", "#00ff00"], b: ["#ffff00", "#00ffff"] },
];

const run = async (kase) => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message.split("\n")[0]));
    page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text().split("\n")[0].slice(0, 160)); });
    await page.addInitScript((k) => {
        const now = new Date().toISOString();
        const mk = (name, slug, css) => ({
            id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now,
            colors: css.map((c, i) => ({ css: c, position: i })),
        });
        localStorage.setItem("color-palettes", JSON.stringify({
            version: 1,
            palettes: [mk("Probe A", "probe-a", k.a), mk("Probe B", "probe-b", k.b)],
        }));
    }, kase);
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const main = page.getByRole("main");
    let phase = "setup";
    try {
        await main.getByRole("button", { name: "Palettes", exact: true }).click();
        await page.waitForTimeout(300);
        await main.getByRole("button", { name: /Select palette Probe A/ }).click();
        await main.getByRole("button", { name: /Select palette Probe B/ }).click();
        await page.waitForTimeout(250);
        phase = "click-mix";
        await main.getByRole("button", { name: "Mix", exact: true }).click();
        await page.waitForTimeout(2000);
    } catch (e) {
        errors.push("DRIVE-FAIL(" + phase + "): " + String(e).split("\n")[0].slice(0, 140));
    }
    const state = await page.evaluate(() => {
        const plate = document.querySelector(".mix-plate");
        const strip = document.querySelector('.mix-plate [role="presentation"]');
        return {
            plateMounted: !!plate,
            stuckGhost: !!document.querySelector(".mix-plate--ghost"),
            plateText: plate ? plate.innerText.replace(/\s+/g, " ").slice(0, 60) : null,
            gradientStyle: strip ? strip.getAttribute("style") : null,
            resetButtonReachable: !!document.querySelector('.mix-plate [title="Reset"]'),
        };
    });
    console.log(JSON.stringify({ case: kase.id, state, errors }, null, 1));
    await browser.close();
};

for (const k of CASES) await run(k);
