// C-1 reproduction: the Generate pane discards the user-typed palette name.
// Read-only probe against the LIVE dev server at http://localhost:9000.
import { chromium } from "playwright";

const NAME = "MY-CUSTOM-NAME-42";

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));

await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => localStorage.removeItem("color-palettes"));
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForSelector(".glass-dock", { timeout: 30000 });

// Open the Generate view via the dock (same path the e2e fixture uses).
await page.getByRole("button", { name: /Views|Tools/ }).first().click().catch(() => {});
await page.waitForTimeout(300);
let opened = false;
for (const nm of ["Generate"]) {
    const el = page.getByRole("menuitem", { name: nm }).or(page.getByRole("option", { name: nm })).or(page.getByRole("button", { name: nm }));
    if (await el.first().count()) { await el.first().click(); opened = true; break; }
}
if (!opened) { await page.goto("http://localhost:9000/#generate"); }
await page.waitForSelector("[data-generate-plate]", { timeout: 30000 });

const plate = page.locator("[data-generate-plate]");
const nameInput = plate.getByRole("textbox", { name: "Palette name" });
console.log("default name value:", JSON.stringify(await nameInput.inputValue()));

await nameInput.fill(NAME);
console.log("typed name value:  ", JSON.stringify(await nameInput.inputValue()));

const swatchesBefore = await plate.locator(".generate-swatch").evaluateAll((els) =>
    els.map((e) => getComputedStyle(e).backgroundColor));

await plate.getByRole("button", { name: "Save palette" }).click();
await page.waitForTimeout(600);

const stored = await page.evaluate(() => localStorage.getItem("color-palettes"));
const parsed = JSON.parse(stored ?? "null");
console.log("---- localStorage color-palettes ----");
console.log(JSON.stringify(parsed?.palettes?.map((p) => ({ name: p.name, slug: p.slug, n: p.colors?.length })), null, 2));
console.log("EXPECTED name:", NAME);
console.log("ACTUAL   name:", parsed?.palettes?.[0]?.name);
console.log("VERDICT:", parsed?.palettes?.[0]?.name === NAME ? "NAME PRESERVED" : "NAME DROPPED");
console.log("swatch count:", swatchesBefore.length);

// --- a11y probes on the same mounted pane (no extra page load) ---
const a11y = await page.evaluate(() => {
    const plate = document.querySelector("[data-generate-plate]");
    const out = { swatchFocus: null, taps: [], scroller: null };
    const sw = plate.querySelector(".generate-swatch");
    if (sw) {
        sw.focus();
        const cs = getComputedStyle(sw);
        const r = sw.getBoundingClientRect();
        out.swatchFocus = {
            tag: sw.tagName, focused: document.activeElement === sw,
            outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth,
            boxShadow: cs.boxShadow, w: Math.round(r.width), h: Math.round(r.height),
            ariaLabel: sw.getAttribute("aria-label"),
        };
    }
    for (const b of plate.querySelectorAll("button, input, [role=button]")) {
        const r = b.getBoundingClientRect();
        out.taps.push({
            name: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 28),
            w: Math.round(r.width), h: Math.round(r.height),
        });
    }
    const scroller = document.querySelector(".pane-scroll-fade");
    if (scroller) out.scroller = {
        tabindex: scroller.getAttribute("tabindex"),
        role: scroller.getAttribute("role"),
        ariaLabel: scroller.getAttribute("aria-label"),
        scrollH: scroller.scrollHeight, clientH: scroller.clientHeight,
    };
    return out;
});
console.log("---- a11y ----");
console.log(JSON.stringify(a11y, null, 2));
console.log("---- console errors ----");
console.log(consoleErrors.join("\n") || "(none)");

await browser.close();
