// CHALLENGE-C pass-3 probe 4 — disabled affordance of the Reset DockControl,
// and a clipped screenshot of the DEVELOPED rail for the record.
import { webkit } from "playwright";
const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));
const DIR = "docs/tranches/V/megatranche/audit/components/wb-extract-controls/evidence/pass-3";

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 3 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3000);

const btnStyle = () => page.evaluate(() => {
    const g = (t) => [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === t);
    const m = (el) => { const cs = getComputedStyle(el); const svg = el.querySelector("svg"); const scs = svg && getComputedStyle(svg); return {
        disabled: el.disabled, ariaDisabled: el.getAttribute("aria-disabled"),
        opacity: cs.opacity, color: cs.color, filter: cs.filter, cursor: cs.cursor,
        svgStroke: scs?.stroke, svgOpacity: scs?.opacity,
        rect: (r=>({w:+r.width.toFixed(1),h:+r.height.toFixed(1)}))(el.getBoundingClientRect()),
    }; };
    return { upload: m(g("Upload image")), camera: m(g("Open camera")), reset: m(g("Reset")) };
});
out("DockControl style — pre-image (Reset SHOULD read disabled)", await btnStyle());

// develop the plate
await page.evaluate(async () => {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const x = c.getContext("2d");
    ["rgb(220,40,40)", "rgb(40,190,60)", "rgb(40,70,210)", "rgb(186,178,168)"]
        .forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * 16, 64, 16); });
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    const dt = new DataTransfer();
    dt.items.add(new File([blob], "bands.png", { type: "image/png" }));
    const input = document.querySelector('input[type="file"]');
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
});
await page.waitForTimeout(3500);
out("DockControl style — developed (Reset now enabled)", await btnStyle());

const box = await page.locator('[data-o18="extract-k-rail"]').boundingBox();
await page.screenshot({ path: `${DIR}/xc3-rail-developed.png`, clip: { x: box.x - 4, y: box.y - 6, width: box.width + 8, height: box.height + 12 } });
const row = await page.locator('[data-o18="extract-kc"]').boundingBox();
await page.screenshot({ path: `${DIR}/xc3-controls-row.png`, clip: { x: row.x - 180, y: row.y - 8, width: row.width + 360, height: row.height + 16 } });
console.log("\nclips written");
await b.close();
