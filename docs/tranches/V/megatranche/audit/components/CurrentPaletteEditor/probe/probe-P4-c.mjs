// CHALLENGE-C pass 4 — probe C: same as B but seeds localStorage via
// addInitScript so the persisted palette actually restores on cold boot.
// Read-only. Run: node docs/.../probe/probe-P4-c.mjs
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
    localStorage.setItem(
        "color-picker",
        JSON.stringify({
            inputColor: "rgb(255 0 0)",
            savedColors: ["rgb(255 0 0)", "rgb(0 255 0)", "rgb(0 0 255)", "rgb(255 255 0)"],
        }),
    );
});
const page = await ctx.newPage();
await page.goto(ORIGIN + "/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

const out = {};

out.instances = await page.evaluate(() => ({
    addSlots: document.querySelectorAll(".add-slot-ghost").length,
    dashedWells: document.querySelectorAll(".dashed-well").length,
    watercolorSwatchesTotal: document.querySelectorAll(".watercolor-swatch").length,
    feTurbulenceTotal: document.querySelectorAll("feTurbulence").length,
    wellText: document.querySelector(".dashed-well")?.innerText.replace(/\n+/g, " | ") ?? null,
}));

out.swatches = await page.evaluate(() => {
    const row = document.querySelector(".swatch-row");
    if (!row) return { found: false };
    const dots = [...row.querySelectorAll(".watercolor-swatch")];
    return {
        found: true,
        count: dots.length,
        detail: dots.map((d) => {
            const cs = getComputedStyle(d);
            return {
                tag: d.tagName,
                variant: d.getAttribute("data-variant"),
                ariaHidden: d.getAttribute("aria-hidden"),
                ariaLabel: d.getAttribute("aria-label"),
                tabIndex: d.tabIndex,
                pointerEvents: cs.pointerEvents,
                bg: cs.backgroundColor,
                radius: cs.borderRadius.slice(0, 34),
                turbSeed: d.querySelector("feTurbulence")?.getAttribute("seed") ?? null,
            };
        }),
    };
});

out.silhouette = await page.evaluate(() => {
    const ghost = document.querySelector(".add-slot-ghost");
    const row = document.querySelector(".swatch-row");
    const solid = row?.querySelector('.watercolor-swatch[data-variant="solid"]');
    const rad = (el) => (el ? getComputedStyle(el).borderRadius : null);
    return {
        liveColorVar: ghost ? getComputedStyle(ghost).getPropertyValue("--watercolor-color").trim() : null,
        firstSwatchColorVar: solid ? getComputedStyle(solid).getPropertyValue("--watercolor-color").trim() : null,
        ghostRadius: rad(ghost),
        firstSwatchRadius: rad(solid),
        sameColour: ghost && solid
            ? getComputedStyle(ghost).getPropertyValue("--watercolor-color").trim() ===
              getComputedStyle(solid).getPropertyValue("--watercolor-color").trim()
            : null,
        identicalSilhouette: rad(ghost) === rad(solid),
        ghostTurbSeed: ghost?.querySelector("feTurbulence")?.getAttribute("seed") ?? null,
        swatchTurbSeed: solid?.querySelector("feTurbulence")?.getAttribute("seed") ?? null,
    };
});

out.keyboard = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    return [...well.querySelectorAll("a[href],button,input,select,textarea,[tabindex]")]
        .filter((e) => e.tabIndex >= 0 && !e.hasAttribute("disabled"))
        .map((e) => {
            const r = e.getBoundingClientRect();
            return {
                tag: e.tagName,
                ariaLabel: e.getAttribute("aria-label"),
                title: e.getAttribute("title"),
                text: e.textContent.trim().slice(0, 24),
                placeholder: e.getAttribute("placeholder"),
                w: Math.round(r.width),
                h: Math.round(r.height),
            };
        });
});

console.log("---- pre-latch ----");
console.log(JSON.stringify(out, null, 2));

// duplicate-name latch: seed a saved palette, then reproduce the stale latch.
out.dupLatch = await (async () => {
  try {
    await page.evaluate(() => {
        localStorage.setItem(
            "color-palettes",
            JSON.stringify({
                version: 1,
                palettes: [
                    { id: "seed-id", name: "Dup", colors: [{ css: "#123456", position: 0, name: "keep-me", weight: 0.9 }], createdAt: Date.now(), updatedAt: Date.now() },
                ],
            }),
        );
    });
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(4000);
    const input = page.locator(".dashed-well input").first();
    if ((await input.count()) === 0)
        return {
            skipped: "no name input",
            wellHtml: await page.evaluate(
                () => document.querySelector(".dashed-well")?.outerHTML.slice(0, 1200) ?? null,
            ),
        };
    await input.fill("Dup");
    await input.press("Enter");
    await page.waitForTimeout(400);
    const banner1 = await page.locator(".dashed-well").innerText();
    const before = await page.evaluate(() => localStorage.getItem("color-palettes"));
    await input.fill("A Totally Different Name");
    await page.waitForTimeout(300);
    const banner2 = await page.locator(".dashed-well").innerText();
    const updateBtn = page.getByRole("button", { name: "Update" }).first();
    const updateVisible = await updateBtn.isVisible().catch(() => false);
    let after = null;
    if (updateVisible) {
        await updateBtn.click();
        await page.waitForTimeout(500);
        after = await page.evaluate(() => localStorage.getItem("color-palettes"));
    }
    return {
        bannerAfterEnter: banner1.replace(/\n+/g, " | "),
        storeBefore: before,
        bannerAfterRename: banner2.replace(/\n+/g, " | "),
        updateStillOffered: updateVisible,
        storeAfterUpdate: after,
        wellAfter: (await page.locator(".dashed-well").innerText()).replace(/\n+/g, " | "),
    };
  } catch (e) {
    return { error: String(e).slice(0, 300) };
  }
})();

console.log("---- latch ----");
console.log(JSON.stringify(out.dupLatch, null, 2));
await browser.close();
