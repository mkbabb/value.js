import { chromium } from "playwright";
const log = (...a) => console.log(...a);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(String(e.message).slice(0, 200)));
page.on("console", (m) => { if (m.type() === "error") errs.push("console:" + m.text().slice(0, 200)); });

await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar = main.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();
const barBox = await bar.boundingBox();

// add two middle stops
await bar.click({ position: { x: barBox.width * 0.33, y: barBox.height / 2 } });
await page.waitForTimeout(200);
await bar.click({ position: { x: barBox.width * 0.66, y: barBox.height / 2 } });
await page.waitForTimeout(300);
log("A) labels after 2 adds:", JSON.stringify(await main.locator("[data-stop-id]").evaluateAll(e => e.map(x => x.getAttribute("aria-label")))));

// ── drag handle #1 (≈33%) PAST handle #2 (≈66%) to ≈85% ──
const h1 = main.locator("[data-stop-id]").nth(1);
const b1 = await h1.boundingBox();
await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2);
await page.mouse.down();
for (let i = 1; i <= 12; i++) await page.mouse.move(barBox.x + barBox.width * (0.33 + 0.044 * i), b1.y + b1.height / 2);
await page.mouse.up();
await page.waitForTimeout(500);

log("B) labels after dragging #1 past #2:", JSON.stringify(await main.locator("[data-stop-id]").evaluateAll(e => e.map(x => x.getAttribute("aria-label")))));
log("B) handle left offsets:", JSON.stringify(await main.locator("[data-stop-id]").evaluateAll(e => e.map(x => Math.round(x.getBoundingClientRect().left)))));
const editorText = await main.getByRole("textbox", { name: "Gradient CSS" }).last().textContent();
log("B) editor simpleCSS:", JSON.stringify(editorText));

// measure ONLY the --rail-ramp custom property (not the alpha-checker layer)
const railVar = await bar.evaluate((el) => el.style.getPropertyValue("--rail-ramp"));
const pcts = [...railVar.matchAll(/([\d.]+)%/g)].map(Number);
let desc = 0, maxDrop = 0;
for (let i = 1; i < pcts.length; i++) if (pcts[i] < pcts[i - 1]) { desc++; maxDrop = Math.max(maxDrop, pcts[i - 1] - pcts[i]); }
log("B) --rail-ramp sub-stops:", pcts.length, "descending:", desc, "max backward jump:", maxDrop.toFixed(1) + "%");
log("B) errors so far:", JSON.stringify(errs));

// ── does the model round-trip through its own parser? (blur then retype nothing) ──
const ed = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await ed.scrollIntoViewIfNeeded();
await ed.click();
await page.keyboard.press("End");
await page.keyboard.type(" ", { delay: 5 });   // no semantic change
await page.waitForTimeout(1200);
const v = await main.getByTestId("gradient-parse-verdict").count();
log("C) verdict after re-submitting the app's OWN serialization:",
    v ? JSON.stringify(await main.getByTestId("gradient-parse-verdict").last().textContent()) : "none");

// ── frame cost of a drag ──
await page.evaluate(() => { window.__f = []; let last = performance.now(); const t = () => { const n = performance.now(); window.__f.push(n - last); last = n; if (window.__f.length < 400) requestAnimationFrame(t); }; requestAnimationFrame(t); });
const h0 = main.locator("[data-stop-id]").nth(0);
const b0 = await h0.boundingBox();
await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2);
await page.mouse.down();
for (let i = 0; i < 60; i++) { await page.mouse.move(barBox.x + barBox.width * (0.05 + 0.008 * i), b0.y + b0.height / 2); }
await page.mouse.up();
await page.waitForTimeout(300);
const frames = await page.evaluate(() => window.__f.filter(x => x > 0));
frames.sort((a, b) => a - b);
log("D) drag frame deltas ms — p50:", frames[Math.floor(frames.length * 0.5)]?.toFixed(1),
    "p95:", frames[Math.floor(frames.length * 0.95)]?.toFixed(1),
    "max:", frames[frames.length - 1]?.toFixed(1), "n:", frames.length);

// ── nameless buttons / sliders / copy control ──
const a11y = await page.evaluate(() => {
    const nameOf = (b) => (b.getAttribute("aria-label") || b.getAttribute("title") || b.innerText || "").trim();
    const nameless = [];
    for (const b of document.querySelectorAll("button")) {
        if (!nameOf(b)) {
            const r = b.getBoundingClientRect();
            nameless.push({ cls: String(b.className).slice(0, 90), w: Math.round(r.width), h: Math.round(r.height), inPane: !!b.closest("main") });
        }
    }
    const sliders = [...document.querySelectorAll('[role="slider"]')].map((el) => {
        const r = el.getBoundingClientRect();
        return { label: el.getAttribute("aria-label"), now: el.getAttribute("aria-valuenow"), tab: el.getAttribute("tabindex"), w: Math.round(r.width), h: Math.round(r.height) };
    });
    const copy = [...document.querySelectorAll("button")].filter(b => /Copy CSS/i.test(nameOf(b))).map(b => ({ name: nameOf(b), aria: b.getAttribute("aria-label"), title: b.getAttribute("title"), html: b.outerHTML.slice(0, 140) }));
    const tile = document.querySelector('[data-testid="gradient-render-tile"]');
    return { nameless, sliders, copy, tileRole: tile?.getAttribute("role"), tileLabel: tile?.getAttribute("aria-label") };
});
log("E) a11y:", JSON.stringify(a11y, null, 1));

// ── radial: is the Direction slider a dead control? ──
await page.evaluate(() => window.scrollTo(0, 0));
const tileBefore = await main.getByTestId("gradient-render-tile").last().evaluate(el => el.style.getPropertyValue("--tile-render"));
// switch type to radial via the Select
await main.getByRole("combobox").first().click().catch(() => {});
await page.waitForTimeout(400);
const opts = await page.getByRole("option").allTextContents().catch(() => []);
log("F) type options:", JSON.stringify(opts));
await page.getByRole("option", { name: /Radial/ }).click().catch((e) => log("F) radial click fail", e.message));
await page.waitForTimeout(500);
const tileRadial = await main.getByTestId("gradient-render-tile").last().evaluate(el => el.style.getPropertyValue("--tile-render"));
// now move the direction slider
const slider = page.locator('[role="slider"]').last();
await slider.focus().catch(() => {});
for (let i = 0; i < 30; i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(400);
const tileRadial2 = await main.getByTestId("gradient-render-tile").last().evaluate(el => el.style.getPropertyValue("--tile-render"));
const dirReadout = await main.locator("text=/^\\d+°$/").first().textContent().catch(() => null);
log("F) tile(before type switch):", tileBefore.slice(0, 45));
log("F) tile(radial, dir=90)   :", tileRadial.slice(0, 45));
log("F) tile(radial, dir+30)   :", tileRadial2.slice(0, 45));
log("F) tile changed by direction under radial?", tileRadial !== tileRadial2, "| readout:", dirReadout);

log("Z) all errors:", JSON.stringify(errs));
await browser.close();
