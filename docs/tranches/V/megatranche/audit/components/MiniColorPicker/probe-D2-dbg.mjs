import { webkit } from "playwright";
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2200);
const dump = async (tag) =>
    console.log(
        tag,
        JSON.stringify(
            await p.evaluate(() => ({
                dialogs: document.querySelectorAll('[role="dialog"]').length,
                swatch: document.querySelectorAll('button[aria-label^="Open color picker"]').length,
                input: document.querySelectorAll('input[aria-label="Search by CSS color"]').length,
                sv: document.querySelectorAll(".sv-canvas").length,
            })),
        ),
    );
await dump("A after load");
await p.click('button[aria-label="Filters"]');
await p.waitForTimeout(700);
await dump("B after filters");
const inp = p.locator('input[aria-label="Search by CSS color"]');
await inp.click();
await p.waitForTimeout(200);
await dump("C after input click");
await inp.fill("oklch(0.72 0.31 145)");
await p.waitForTimeout(300);
await dump("D after fill");
await b.close();
