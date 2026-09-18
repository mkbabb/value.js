import { webkit } from "playwright";
const b = await webkit.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const root = p.locator('[data-o18="extract-k-rail"]').locator("xpath=ancestor::div[contains(@class,'flex-col')][1]");
console.log("=== ARIA SNAPSHOT of ExtractControls ===");
console.log(await root.ariaSnapshot());
await b.close();
