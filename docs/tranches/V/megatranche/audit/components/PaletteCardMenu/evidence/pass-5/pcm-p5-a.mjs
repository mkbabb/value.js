// pass-5 probe A — "the menu's owning card is removed while its menu is open".
// Reproduction path: the PalettesPane search box narrows `pm.filteredSaved`, so
// the card that owns the OPEN menu unmounts.  <PaletteCardMenu> holds the reka
// DropdownMenu root; if it unmounts while open, who releases the modal lock?
//
// Also: 60 open/close cycles (leak), and a boundary-value palette (empty name,
// NaN/Infinity versionCount, archived tier, zero colors).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const R = {};
const log = (k, v) => { R[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

function seed(n, extra = []) {
    const palettes = [];
    for (let i = 0; i < n; i++) {
        palettes.push({
            id: `p-${i}`,
            name: `Probe Palette ${i}`,
            slug: `probe-palette-${i}`,
            isLocal: true,
            colors: [{ css: "#ff0000" }, { css: "#00ff00" }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }
    return { version: 1, palettes: [...palettes, ...extra] };
}

const lockState = () => ({
    bodyPE: document.body.style.pointerEvents || "",
    bodyPEComputed: getComputedStyle(document.body).pointerEvents,
    bodyOverflow: document.body.style.overflow || "",
    htmlOverflow: document.documentElement.style.overflow || "",
    ariaHiddenCount: document.querySelectorAll("[aria-hidden='true'][data-aria-hidden]").length,
    menus: document.querySelectorAll("[role='menu']").length,
    cards: document.querySelectorAll("[role='article']").length,
});

(async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e)));

    // ── A. owner-unmount-while-open ─────────────────────────────────────────
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, seed(8));
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector("[role='article']");
    await page.waitForTimeout(400);

    const trigs = page.getByRole("button", { name: "Palette menu" });
    log("A0_state", { triggers: await trigs.count(), ...(await page.evaluate(lockState)) });

    await trigs.nth(0).click();
    await page.waitForTimeout(350);
    const openOwner = await page.evaluate(() => {
        const m = document.querySelector("[role='menu']");
        return m ? m.textContent.slice(0, 40) : null;
    });
    log("A1_menuOpen", { openOwner, ...(await page.evaluate(lockState)) });

    // Narrow the filter so the OWNING card unmounts. The document is pointer-inert
    // under the modal lock, so drive the input through its own value setter +
    // native input event — exactly what a real keystroke would produce, minus the
    // pointer path the lock blocks.
    const filtered = await page.evaluate(() => {
        const input = [...document.querySelectorAll("input")]
            .find((i) => /search your palettes/i.test(i.placeholder || ""));
        if (!input) return { found: false };
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        setter.call(input, "Probe Palette 7");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        return { found: true, placeholder: input.placeholder };
    });
    await page.waitForTimeout(600);
    log("A2_afterOwnerUnmounted", {
        filtered,
        ...(await page.evaluate(lockState)),
        cardNames: await page.evaluate(() =>
            [...document.querySelectorAll("[role='article']")].map((a) => a.getAttribute("aria-label"))),
    });

    // Is the app still operable? Try to click the one remaining card by pointer.
    let clickErr = null;
    try {
        await page.locator("[role='article']").first().click({ timeout: 2500 });
    } catch (e) { clickErr = String(e).split("\n")[0]; }
    await page.waitForTimeout(300);
    log("A3_afterClickAttempt", {
        clickErr,
        ...(await page.evaluate(lockState)),
        expandedSwatches: await page.evaluate(() => document.querySelectorAll("[role='article'] button[title]").length),
        hitTestAtCardCentre: await page.evaluate(() => {
            const a = document.querySelector("[role='article']");
            if (!a) return null;
            const r = a.getBoundingClientRect();
            const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
            return el ? `${el.tagName}.${(el.className || "").toString().slice(0, 40)}` : null;
        }),
    });
    // Can the user type in the search box again (pointer path)?
    let searchErr = null;
    try {
        await page.locator("input[placeholder*='Search your palettes']").click({ timeout: 2500 });
    } catch (e) { searchErr = String(e).split("\n")[0]; }
    log("A4_searchBoxReachable", { searchErr, ...(await page.evaluate(lockState)) });
    await page.screenshot({ path: OUT + "pass5-owner-unmount.png" });

    // ── B. escape hatch: does anything ever release it? ──────────────────────
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    log("B1_afterEscape", await page.evaluate(lockState));
    await page.mouse.click(700, 60);
    await page.waitForTimeout(300);
    log("B2_afterOutsideClick", await page.evaluate(lockState));
    await page.evaluate(() => {
        const input = [...document.querySelectorAll("input")]
            .find((i) => /search your palettes/i.test(i.placeholder || ""));
        if (input) {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
            setter.call(input, "");
            input.dispatchEvent(new Event("input", { bubbles: true }));
        }
    });
    await page.waitForTimeout(400);
    log("B3_afterClearingFilter", await page.evaluate(lockState));
    await page.screenshot({ path: OUT + "pass5-after-escape.png" });

    log("pageErrors_phaseAB", pageErrors.slice());
    await ctx.close();

    // ── C. leak: 60 open/close cycles ───────────────────────────────────────
    const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p2 = await ctx2.newPage();
    const pe2 = [];
    p2.on("pageerror", (e) => pe2.push(String(e)));
    await p2.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), seed(8));
    await p2.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await p2.waitForSelector("[role='article']");
    await p2.waitForTimeout(400);

    const census = () => p2.evaluate(() => ({
        nodes: document.querySelectorAll("*").length,
        bodyChildren: document.body.children.length,
        reka: document.querySelectorAll("[id^='reka-']").length,
        menus: document.querySelectorAll("[role='menu']").length,
        heap: performance.memory ? performance.memory.usedJSHeapSize : null,
    }));
    const t0 = await census();
    const trig2 = p2.getByRole("button", { name: "Palette menu" }).nth(0);
    for (let i = 0; i < 60; i++) {
        await trig2.click();
        await p2.keyboard.press("Escape");
    }
    await p2.waitForTimeout(800);
    await p2.evaluate(() => { if (globalThis.gc) globalThis.gc(); });
    const t1 = await census();
    log("C1_leak60Cycles", { before: t0, after: t1, deltaNodes: t1.nodes - t0.nodes, deltaBodyChildren: t1.bodyChildren - t0.bodyChildren, deltaReka: t1.reka - t0.reka });
    log("pageErrors_phaseC", pe2.slice());
    await ctx2.close();

    // ── D. boundary-value palette ───────────────────────────────────────────
    const ctx3 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p3 = await ctx3.newPage();
    const pe3 = [];
    p3.on("pageerror", (e) => pe3.push(String(e)));
    const weird = {
        version: 1,
        palettes: [
            { id: "w-0", name: "", slug: "empty-name", isLocal: true, colors: [], versionCount: 0 / 0, tier: "archived", createdAt: "", updatedAt: "" },
            { id: "w-1", name: "Inf", slug: "inf", isLocal: true, colors: [{ css: "#000" }], versionCount: Infinity, createdAt: "", updatedAt: "" },
            { id: "w-2", name: "Neg", slug: "neg", isLocal: true, colors: [{ css: "#000" }], versionCount: -0, createdAt: "", updatedAt: "" },
            { id: "w-3", name: "Huge", slug: "huge", isLocal: true, colors: [{ css: "#000" }], versionCount: Number.MAX_SAFE_INTEGER, createdAt: "", updatedAt: "" },
        ],
    };
    await p3.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify(weird));
    await p3.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await p3.waitForTimeout(600);
    const cards = await p3.evaluate(() =>
        [...document.querySelectorAll("[role='article']")].map((a) => a.getAttribute("aria-label")));
    log("D0_cards", cards);
    const perCard = [];
    const n = await p3.getByRole("button", { name: "Palette menu" }).count();
    for (let i = 0; i < n; i++) {
        await p3.getByRole("button", { name: "Palette menu" }).nth(i).click();
        await p3.waitForTimeout(250);
        perCard.push(await p3.evaluate(() => {
            const m = document.querySelector("[role='menu']");
            if (!m) return { open: false };
            const label = m.querySelector("[data-slot='dropdown-menu-label']");
            return {
                open: true,
                labelText: JSON.stringify(label ? label.textContent : null),
                labelRect: label ? (({ width, height }) => ({ width: +width.toFixed(1), height: +height.toFixed(1) }))(label.getBoundingClientRect()) : null,
                items: [...m.querySelectorAll("[role='menuitem']")].map((x) => x.textContent.replace(/\s+/g, " ").trim()),
            };
        }));
        await p3.keyboard.press("Escape");
        await p3.waitForTimeout(150);
    }
    log("D1_boundaryMenus", perCard);
    await p3.getByRole("button", { name: "Palette menu" }).nth(0).click();
    await p3.waitForTimeout(300);
    await p3.screenshot({ path: OUT + "pass5-empty-name-menu.png" });
    log("pageErrors_phaseD", pe3.slice());
    await ctx3.close();

    await browser.close();
    writeFileSync(OUT + "pcm-p5-a-results.json", JSON.stringify(R, null, 2));
})();
