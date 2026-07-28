// CHALLENGE-L pass 5 — L5-1 user-visible consequence of the shared `searchQuery`
// ref: typing into BrowsePane's "Search the commons..." field mutates
// PalettesPane's "Search your palettes..." field on the same screen.
//
// Run:  node probe-shared-search.mjs        (dev server must be on :9000)
import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

const placeholders = await p.$$eval("input", (els) => els.map((e) => e.placeholder));
console.log("INPUT PLACEHOLDERS:", JSON.stringify(placeholders));

const commons = p.locator('input[placeholder="Search the commons..."]');
const mine = p.locator('input[placeholder="Search your palettes..."]');
console.log("commons count:", await commons.count(), "mine count:", await mine.count());

if ((await commons.count()) && (await mine.count())) {
    console.log("BEFORE  commons.value=", JSON.stringify(await commons.inputValue()),
                " mine.value=", JSON.stringify(await mine.inputValue()));
    await commons.fill("zzq-probe");
    await p.waitForTimeout(600);
    console.log("AFTER typing 'zzq-probe' into COMMONS field:");
    console.log("  commons.value=", JSON.stringify(await commons.inputValue()));
    console.log("  mine.value   =", JSON.stringify(await mine.inputValue()));
    console.log("  SHARED-REF DEFECT:", (await mine.inputValue()) === "zzq-probe");
    await p.screenshot({ path: "L5-shared-searchquery.png", fullPage: false });
}
await b.close();
