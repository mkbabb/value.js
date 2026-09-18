/**
 * CHALLENGE-C pass-5 probe #11 — the END-TO-END user gesture on the LAN origin
 * `vite.config.ts:285 (server.host: true)` publishes.
 *
 * Sequence, entirely through the UI:
 *   1. click "Add current color …"  (N times)  → the current palette fills
 *   2. click the save check         → PalettesPane @saved → pm.onCurrentPaletteSaved
 *   3. observe: was a palette stored?  were the current colours kept or wiped?
 *              did the user see anything at all?
 *
 * Run against localhost (control) and the LAN IP (subject).
 */
import { chromium } from "playwright";

const LAN = process.env.LAN_ORIGIN ?? "http://10.152.11.41:9000";
const LOCAL = "http://localhost:9000";
const KEY = "color-palettes";

const browser = await chromium.launch();

async function run(origin, label) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    const pageErrors = [];
    const consoleErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e.message).slice(0, 120)));
    page.on("console", (m) => {
        if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160));
    });

    // Seed BOTH stores: an empty library, and a three-colour "current palette".
    // (The in-pane add-slot is dead — probe #12 — so the current palette is
    // seeded through `useColorPersistence`'s own store key instead.)
    await page.addInitScript((k) => {
        localStorage.setItem(k, JSON.stringify({ version: 1, palettes: [] }));
        localStorage.setItem(
            "color-picker",
            JSON.stringify({
                inputColor: "#3b82f6",
                savedColors: ["rgb(225, 29, 72)", "rgb(34, 197, 94)", "rgb(59, 130, 246)"],
            }),
        );
    }, KEY);
    await page.goto(`${origin}/#/palettes`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3500);

    const beforeSwatches = await page.locator(".swatch-row [aria-label^='Edit color']").count();
    const currentBefore = await page.evaluate(() =>
        [...document.querySelectorAll(".swatch-row [aria-label^='Edit color']")].map((b) =>
            b.getAttribute("aria-label"),
        ),
    );

    // 2. name it and save it
    const nameInput = page.locator('input[placeholder^="Palette "]').first();
    if (await nameInput.count()) {
        await nameInput.fill("Probe Set");
    }
    // The save control is the icon-only Button that sits beside the name Input,
    // inside .dashed-well (CurrentPaletteEditor.vue:134-142).
    const saveBtn = page
        .locator('.dashed-well div:has(> input[placeholder^="Palette "]) > button')
        .first();
    const saveInfo = await saveBtn.evaluate((b) => ({
        html: b.outerHTML.replace(/\s+/g, " ").slice(0, 200),
        name: b.getAttribute("aria-label") ?? b.textContent.trim() ?? null,
        box: (({ width, height }) => ({ w: Math.round(width), h: Math.round(height) }))(
            b.getBoundingClientRect(),
        ),
    }));
    console.log("save control     :", JSON.stringify(saveInfo));
    await saveBtn.click();
    await page.waitForTimeout(1500);

    // 3. measure the aftermath
    const after = await page.evaluate((k) => {
        const raw = localStorage.getItem(k);
        let stored = null;
        try {
            stored = JSON.parse(raw);
        } catch {}
        const grid = document.querySelector(".palette-card-grid");
        const bodyText = document.body.innerText;
        return {
            storedPaletteCount: stored?.palettes?.length ?? null,
            storedNames: (stored?.palettes ?? []).map((p) => p.name),
            cardsInGrid: grid ? grid.querySelectorAll("[role='article']").length : null,
            currentSwatchesLeft: document.querySelectorAll(".swatch-row [aria-label^='Edit color']").length,
            emptyPlateShown: /empty plate|No saved palettes yet/i.test(bodyText),
            anyErrorTextOnScreen:
                /error|failed|could not|couldn't|unable/i.test(bodyText) || null,
            headerBadge: (() => {
                const m = bodyText.match(/My Palettes\s*(\d+)/);
                return m ? m[1] : null;
            })(),
        };
    }, KEY);

    console.log(`\n===== ${label} =====`);
    console.log("secure context   :", await page.evaluate(() => window.isSecureContext));
    console.log("swatches before  :", beforeSwatches, JSON.stringify(currentBefore));
    console.log("after save       :", JSON.stringify(after, null, 2));
    console.log("pageErrors       :", JSON.stringify(pageErrors));
    console.log("consoleErrors    :", JSON.stringify(consoleErrors.slice(0, 4)));
    await ctx.close();
}

await run(LOCAL, `CONTROL ${LOCAL}`);
await run(LAN, `SUBJECT ${LAN}`);
await browser.close();
