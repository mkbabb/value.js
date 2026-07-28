// PaletteCardMenu — CHALLENGE-C pass 2, probe A
// Measures: (1) card press-spring stuck state across menu open/close,
//           (2) body pointer-events under the modal menu,
//           (3) computed accessible NAMES of every menu item (CDP AX tree),
//           (4) item geometry, (5) console/page errors.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: [
        {
            id: "seedsaved1",
            name: "Probe Saved Palette",
            slug: "probe-saved",
            isLocal: true,
            createdAt: NOW,
            updatedAt: NOW,
            colors: [
                { css: "#ff0055", position: 0 },
                { css: "#00ddaa", position: 1 },
                { css: "#3355ff", position: 2 },
            ],
        },
        {
            id: "seedsaved2",
            name: "Second Probe Palette",
            slug: "probe-two",
            isLocal: true,
            createdAt: NOW,
            updatedAt: NOW,
            colors: [
                { css: "#123456", position: 0 },
                { css: "#abcdef", position: 1 },
            ],
        },
    ],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 260)); });
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 260)));

await ctx.addInitScript((seed) => {
    localStorage.setItem("color-palettes", JSON.stringify(seed));
}, SEED);
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const cardCount = await page.locator('[role="article"]').count();
log("cardCount", cardCount);
if (cardCount === 0) {
    log("FATAL", "no cards rendered; dumping body text");
    log("bodyText", (await page.locator("body").innerText()).slice(0, 800));
    await browser.close();
    writeFileSync(new URL("./pcm-p2-a-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
    process.exit(0);
}

const card = page.locator('[role="article"]').first();
const trigger = card.getByRole("button", { name: "Palette menu" });

const readCard = async () =>
    card.evaluate((el) => ({
        inlineStyle: el.getAttribute("style"),
        pressT: getComputedStyle(el).getPropertyValue("--card-press-t").trim(),
        scale: getComputedStyle(el).scale,
        bodyPE: getComputedStyle(document.body).pointerEvents,
        bodyInlinePE: document.body.style.pointerEvents,
        bodyOverflow: document.body.style.overflow,
        ariaHidden: el.closest("[aria-hidden]")?.getAttribute("aria-hidden") ?? null,
    }));

log("A0_beforeAnyInteraction", await readCard());

// --- open the menu with a real mouse press (the ordinary user path) ---
const tb = await trigger.boundingBox();
log("triggerBox", tb);
await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2);
await page.mouse.down();
await page.waitForTimeout(80);
log("A1_pointerDownOnTrigger", await readCard());
await page.mouse.up();
await page.waitForTimeout(600); // spring settle window
log("A2_afterMouseUp_menuOpen", await readCard());

const menuOpen = await page.locator('[role="menu"]').count();
log("menuRoleCount", menuOpen);

// --- CDP accessibility: computed names of every menu item ---
const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");
const ax = await cdp.send("Accessibility.getFullAXTree");
const axItems = ax.nodes
    .filter((n) => ["menuitem", "menu", "MenuItem", "Menu"].includes(n.role?.value))
    .map((n) => ({
        role: n.role?.value,
        name: n.name?.value,
        disabled: n.properties?.find((p) => p.name === "disabled")?.value?.value ?? null,
        haspopup: n.properties?.find((p) => p.name === "haspopup")?.value?.value ?? null,
        expanded: n.properties?.find((p) => p.name === "expanded")?.value?.value ?? null,
    }));
log("AX_menuItems", axItems);

// --- DOM geometry of items ---
const items = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
            text: el.textContent.replace(/\s+/g, " ").trim(),
            ariaLabel: el.getAttribute("aria-label"),
            w: +r.width.toFixed(1), h: +r.height.toFixed(1),
            ariaDisabled: el.getAttribute("aria-disabled"),
            dataDisabled: el.getAttribute("data-disabled"),
            pe: cs.pointerEvents,
            haspopup: el.getAttribute("aria-haspopup"),
        };
    }),
);
log("items", items);

// --- close via Escape, re-read the card press state ---
await page.keyboard.press("Escape");
await page.waitForTimeout(700);
log("A3_afterEscapeClose", await readCard());
log("activeElementAfterEscape", await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    label: document.activeElement?.getAttribute("aria-label"),
})));

// --- second cycle: open, then click an item (Rename), re-read ---
await trigger.click();
await page.waitForTimeout(400);
log("A4_menuOpenAgain", await readCard());
await page.getByRole("menuitem", { name: /Rename/ }).click();
await page.waitForTimeout(700);
log("A5_afterRenameItemClick", await readCard());
log("renameInputPresent", await page.locator('[role="article"] input').count());
log("activeElementAfterRename", await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    type: document.activeElement?.getAttribute("type"),
    label: document.activeElement?.getAttribute("aria-label"),
    placeholder: document.activeElement?.getAttribute("placeholder"),
})));

log("consoleErrors", consoleErrors);
log("pageErrors", pageErrors);

writeFileSync(new URL("./pcm-p2-a-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
