// C-2 probe: is the per-swatch copy verb real? (role, name, focus, pointer, click)
// Read-only against the LIVE dev server.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => localStorage.removeItem("color-palettes"));
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForSelector(".glass-dock", { timeout: 30000 });
const collapsed = page.locator(".glass-dock.collapsed");
if (await collapsed.count()) { await collapsed.click(); await page.waitForTimeout(600); }
const viewSelect = page.getByRole("combobox", { name: "Select view" });
await viewSelect.click();
const option = page.getByRole("option", { name: "Generate", exact: true });
await option.waitFor({ state: "visible", timeout: 15000 });
await option.click();
await page.waitForSelector("[data-generate-plate]", { timeout: 30000 });

const dom = await page.evaluate(() => {
    const sw = document.querySelector(".generate-swatch");
    const cs = getComputedStyle(sw);
    const r = sw.getBoundingClientRect();
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return {
        tagName: sw.tagName,
        attrs: [...sw.attributes].map((a) => `${a.name}="${String(a.value).slice(0, 70)}"`),
        pointerEvents: cs.pointerEvents,
        outlineStyle: cs.outlineStyle,
        hitTestTag: hit?.tagName,
        hitTestIsSwatch: hit === sw,
        hitTestClass: (hit?.className || "").toString().slice(0, 60),
        tabIndexProp: sw.tabIndex,
        parentTag: sw.parentElement.tagName,
        parentClass: sw.parentElement.className.toString().slice(0, 60),
    };
});
console.log("=== .generate-swatch DOM ===");
console.log(JSON.stringify(dom, null, 2));

// Does the aria tree see the swatch row at all?
const snap = await page.locator("[data-generate-plate]").ariaSnapshot();
console.log("=== aria snapshot of the plate ===");
console.log(snap);

// Instrument the CLICK: does copyColor actually run? Watch the clipboard.
await page.evaluate(() => { window.__written = []; const w = navigator.clipboard.writeText.bind(navigator.clipboard);
    navigator.clipboard.writeText = (t) => { window.__written.push(t); return w(t); };
    const ta = document.execCommand?.bind(document);
    window.__exec = []; document.execCommand = (...a) => { window.__exec.push(a[0]); return ta ? ta(...a) : false; };
});
await page.locator(".generate-swatch").first().click({ force: true, timeout: 5000 }).catch((e) => console.log("CLICK ERROR:", e.message.split("\n")[0]));
await page.waitForTimeout(400);
const written = await page.evaluate(() => ({ clip: window.__written, exec: window.__exec }));
console.log("=== after clicking swatch #1 (force:true) ===");
console.log("clipboard.writeText calls:", JSON.stringify(written.clip));
console.log("execCommand calls:", JSON.stringify(written.exec));

// Control: the plate's Copy-all button (a real <button>) must write.
await page.evaluate(() => { window.__written = []; window.__exec = []; });
await page.locator("[data-generate-plate]").getByRole("button", { name: "Copy all colors" }).click();
await page.waitForTimeout(400);
const written2 = await page.evaluate(() => ({ clip: window.__written, exec: window.__exec }));
console.log("=== control: 'Copy all colors' button ===");
console.log("clipboard.writeText calls:", JSON.stringify(written2.clip).slice(0, 200));
console.log("execCommand calls:", JSON.stringify(written2.exec));

// Keyboard reach: tab from the name input.
await page.locator("[data-generate-plate] input").first().focus();
const order = [];
for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    order.push(await page.evaluate(() => {
        const a = document.activeElement;
        return `${a.tagName}|${a.getAttribute("aria-label") || (a.textContent || "").trim().slice(0, 18)}|${(a.className || "").toString().slice(0, 34)}`;
    }));
}
console.log("=== tab order from the name input ===");
console.log(order.join("\n"));
console.log("SWATCH KEYBOARD-REACHABLE:", order.some((o) => o.includes("generate-swatch")));

await browser.close();
