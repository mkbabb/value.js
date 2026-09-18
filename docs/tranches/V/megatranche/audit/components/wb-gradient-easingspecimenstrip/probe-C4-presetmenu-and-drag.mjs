import { webkit } from "playwright";
const URL = "http://localhost:9000/#/gradient";
const out = (o) => console.log(JSON.stringify(o));
const browser = await webkit.launch();

async function fresh(disclose = true) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 120)));
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForSelector("#easing-interval-0 [data-specimen]", { timeout: 20000 });
    if (disclose) {
        await page.click("#easing-interval-0 .readout-rail .rail-btn >> nth=1");
        await page.waitForSelector("#easing-authoring-0 [aria-label='Easing preset']", { timeout: 8000 });
    }
    return { ctx, page, errors };
}
const state = (page) =>
    page.evaluate(() => {
        const row = document.querySelector("#easing-interval-0");
        return {
            alive: !!document.querySelector("#easing-interval-0 [data-specimen]"),
            readout: row?.querySelector("code")?.textContent?.trim() ?? null,
            boundary: /unexpected error/.test(document.body.innerText.toLowerCase()),
        };
    });

console.log("=== D2 · producer preset menu route (getByRole) ===");
for (const preset of ["ease-in-out-back", "ease-out-quart"]) {
    const { ctx, page, errors } = await fresh();
    await page.click("#easing-authoring-0 [aria-label='Easing preset']");
    await page.waitForTimeout(400);
    let picked = false;
    try {
        await page.getByRole("option", { name: preset, exact: true }).click({ timeout: 6000 });
        picked = true;
    } catch (e) { /* ignore */ }
    await page.waitForTimeout(800);
    const s = await state(page);
    const pressedNow = await page.evaluate(() =>
        [...document.querySelectorAll("#easing-interval-0 [data-specimen]")]
            .filter((t) => t.getAttribute("data-state") === "on")
            .map((t) => t.getAttribute("data-specimen")));
    const head = await page.evaluate(() =>
        document.querySelector('[aria-controls="easing-interval-0"]')?.textContent.replace(/\s+/g, " ").trim() ?? null);
    out({ via: "preset menu", preset, picked, ...s, pressedNow, head, errors: errors.slice(0, 2) });
    await ctx.close();
}

console.log("=== E2 · handle drag past the box, Shift steps (0.1) up to the clamp ===");
{
    const { ctx, page, errors } = await fresh();
    await page.focus("#easing-authoring-0 circle[role='slider'] >> nth=1");
    const log = [];
    for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Shift+ArrowUp");
        await page.waitForTimeout(120);
        const s = await state(page);
        log.push({ press: i + 1, readout: s.readout, alive: s.alive, boundary: s.boundary });
        if (s.boundary) break;
    }
    out({ via: "handle drag Shift+ArrowUp (+0.1 y)", log, errors: errors.slice(0, 2) });
    await ctx.close();
}

console.log("=== F · sampling resolution of the ramp seam ===");
{
    const { ctx, page } = await fresh(false);
    const n = await page.evaluate(() => {
        const el = document.querySelector('#easing-interval-0 [role="img"]');
        const bg = el ? getComputedStyle(el).backgroundImage : "";
        return { stopCount: (bg.match(/%/g) ?? []).length, head: bg.slice(0, 90) };
    });
    out(n);
    await ctx.close();
}
await browser.close();
