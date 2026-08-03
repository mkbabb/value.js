// CHALLENGE-C r2 — element-clipped witnesses: idle / rejected / crashed.
// Run: node .../evidence/r2-shots.mjs
import { webkit } from "playwright";

const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });

async function boot() {
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2000);
}
const clip = async (name, sel) => {
    const box = await page.locator(sel).first().boundingBox();
    if (!box) return console.log(`no box for ${name}`);
    await page.screenshot({
        path: `${DIR}/${name}.png`,
        clip: {
            x: Math.max(0, box.x - 14),
            y: Math.max(0, box.y - 14),
            width: box.width + 28,
            height: box.height + 60,
        },
    });
    console.log(`${name}: ${Math.round(box.width)}×${Math.round(box.height)}`);
};

await boot();
await page.locator(EDITOR).first().scrollIntoViewIfNeeded();
await clip("r2-shot-A-idle", EDITOR);

await page.locator(EDITOR).first().click();
await page.keyboard.press("Meta+a");
await page.keyboard.type("linear-gradient(90deg, red, notacolor)", { delay: 3 });
await sleep(900);
await clip("r2-shot-B-rejected", EDITOR);

await page.keyboard.press("Meta+a");
await page.keyboard.type("linear-gradient(90deg, oklch(), blue)", { delay: 3 });
await sleep(1600);
await clip("r2-shot-C-crashed", ".vj-error-boundary");

await browser.close();
