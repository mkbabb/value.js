/**
 * CHALLENGE-C pass-5 probe #13 — the exact aftermath of one save click on the
 * LAN origin `vite.config.ts:285 (server.host: true)` publishes.
 *
 * Same gesture as probe #11, instrumented before AND after so nothing is
 * inferred: does the pane still exist, did the current palette survive, was
 * anything stored, and what did the runtime say.
 */
import { chromium } from "playwright";

const ORIGIN = process.env.ORIGIN ?? "http://10.152.11.41:9000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();

const log = [];
page.on("pageerror", (e) => log.push(["pageerror", String(e.message).slice(0, 160)]));
page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning")
        log.push([m.type(), m.text().slice(0, 200)]);
});

await page.addInitScript(() => {
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
    localStorage.setItem(
        "color-picker",
        JSON.stringify({
            inputColor: "#3b82f6",
            savedColors: ["rgb(225, 29, 72)", "rgb(34, 197, 94)", "rgb(59, 130, 246)"],
        }),
    );
});
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(4000);

const snap = (label) =>
    page.evaluate(
        (l) => ({
            label: l,
            secure: window.isSecureContext,
            hasWell: !!document.querySelector(".dashed-well"),
            hasGrid: !!document.querySelector(".palette-card-grid"),
            currentSwatchCount: document.querySelectorAll(".swatch-row .watercolor-swatch").length,
            hasNameInput: !!document.querySelector('.dashed-well input[placeholder^="Palette "]'),
            hasSaveBtn: !!document.querySelector(
                '.dashed-well div:has(> input[placeholder^="Palette "]) > button',
            ),
            storedPalettes: (() => {
                try {
                    return JSON.parse(localStorage.getItem("color-palettes")).palettes.length;
                } catch {
                    return null;
                }
            })(),
            currentColorsInPickerStore: (() => {
                try {
                    return JSON.parse(localStorage.getItem("color-picker")).savedColors.length;
                } catch {
                    return null;
                }
            })(),
            paneText: (document.querySelector(".dashed-well")?.innerText ?? "").replace(/\n+/g, " | ").slice(0, 180),
            url: location.hash,
            appHtmlLen: (document.querySelector("#app") ?? document.body).innerHTML.length,
            bodyTextLen: document.body.innerText.length,
            bodyTail: document.body.innerText.replace(/\n+/g, " | ").slice(-260),
            panesOnScreen: [...document.querySelectorAll("[data-pane], .pane-scroll-fade")].length,
        }),
        label,
    );

console.log("BEFORE:", JSON.stringify(await snap("before"), null, 2));

await page
    .locator('.dashed-well div:has(> input[placeholder^="Palette "]) > button')
    .first()
    .click();
await page.waitForTimeout(2000);

console.log("AFTER :", JSON.stringify(await snap("after"), null, 2));
console.log("runtime log:");
for (const [k, v] of log.slice(0, 12)) console.log(`  [${k}] ${v}`);

await browser.close();
