// CHALLENGE-C pass 4 — probe D: stale duplicate-latch reproduction + per-colour
// metadata destruction, measured as a localStorage diff. Browser storage only.
// Run: node docs/.../probe/probe-P4-d.mjs
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const ISO = new Date(1750000000000).toISOString();
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(
    ([iso]) => {
        localStorage.setItem(
            "color-picker",
            JSON.stringify({
                inputColor: "rgb(255 0 0)",
                savedColors: ["rgb(255 0 0)", "rgb(0 255 0)", "rgb(0 0 255)"],
            }),
        );
        localStorage.setItem(
            "color-palettes",
            JSON.stringify({
                version: 1,
                palettes: [
                    {
                        id: "seed-id",
                        name: "Dup",
                        slug: "dup",
                        isLocal: true,
                        colors: [
                            { css: "#123456", position: 0, name: "Deep Teal", weight: 0.72 },
                            { css: "#abcdef", position: 1, name: "Pale Sky", weight: 0.28 },
                        ],
                        createdAt: iso,
                        updatedAt: iso,
                    },
                ],
            }),
        );
    },
    [ISO],
);
const page = await ctx.newPage();
await page.goto(ORIGIN + "/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);

const out = {};
const type = async (value) =>
    page.evaluate((v) => {
        const el = document.querySelector('.dashed-well input[placeholder^="Palette"]');
        if (!el) return false;
        const setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
        ).set;
        setter.call(el, v);
        el.dispatchEvent(new Event("input", { bubbles: true }));
        return true;
    }, value);
const pressEnter = () =>
    page.evaluate(() => {
        const el = document.querySelector('.dashed-well input[placeholder^="Palette"]');
        el?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }),
        );
    });
const wellText = async () =>
    (await page.locator(".dashed-well").first().innerText()).replace(/\n+/g, " | ");
const store = async () =>
    JSON.parse(await page.evaluate(() => localStorage.getItem("color-palettes")));

out.placeholder = await page.evaluate(
    () => document.querySelector('.dashed-well input')?.placeholder ?? null,
);
out.wellText0 = await wellText();

out.typed = await type("Dup");
await pressEnter();
await page.waitForTimeout(600);
out.afterEnter = await wellText();
out.storeBefore = await store();

// --- the latch: rename to a name that collides with NOTHING ---
await type("A Totally Different Name");
await page.waitForTimeout(500);
out.afterRename = await wellText();
out.inputValueNow = await page.evaluate(
    () => document.querySelector('.dashed-well input')?.value ?? null,
);
out.updateStillOffered = await page
    .getByRole("button", { name: "Update" })
    .first()
    .isVisible()
    .catch(() => false);

// --- live-region check on the refusal banner (before we dismiss it) ---
out.liveRegion = await page.evaluate(() => {
    const banner = [...document.querySelectorAll(".dashed-well span")].find((s) =>
        s.textContent.includes("already exists"),
    );
    if (!banner) return { bannerFound: false };
    let n = banner,
        live = null;
    while (n && n !== document.body) {
        const r = n.getAttribute?.("role");
        if (n.getAttribute?.("aria-live") || r === "status" || r === "alert") {
            live = n.tagName + "[" + (n.getAttribute("aria-live") ?? r) + "]";
            break;
        }
        n = n.parentElement;
    }
    return { bannerFound: true, liveAncestor: live, focused: document.activeElement?.tagName };
});

if (out.updateStillOffered) {
    await page.getByRole("button", { name: "Update" }).first().click();
    await page.waitForTimeout(800);
    out.storeAfter = await store();
    out.wellAfter = await wellText();
}

await page.screenshot({ path: new URL("./p4-latch.png", import.meta.url).pathname });
console.log(JSON.stringify(out, null, 2));
await browser.close();
