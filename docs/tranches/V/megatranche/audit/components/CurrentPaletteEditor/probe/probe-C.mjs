// CHALLENGE-C probe C — the save / duplicate-target flow + keyboard + touch.
// Read-only against the running dev server; state seeded via localStorage.
import { chromium } from "playwright";

const SEED = () => {
    localStorage.setItem(
        "color-picker",
        JSON.stringify({ inputColor: "#ff0000", savedColors: ["#ff0000", "#00ff00", "#0000ff"] }),
    );
    const now = new Date().toISOString();
    localStorage.setItem(
        "color-palettes",
        JSON.stringify({
            version: 1,
            palettes: [
                { id: "seed-dup-id", name: "Dup", slug: "dup", colors: [{ css: "#123456", position: 0 }], createdAt: now, updatedAt: now, isLocal: true },
            ],
        }),
    );
};

const out = {};
const browser = await chromium.launch();

// ───────── desktop ─────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(SEED);
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4500);

    const well = page.locator(".dashed-well").first();
    const nameInput = well.locator("input").first();

    // A. keyboard reachability inside the editor
    out.keyboard = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        const sel = "a[href],button,input,select,textarea,[tabindex]:not([tabindex='-1'])";
        return Array.from(w.querySelectorAll(sel))
            .filter((e) => !e.hasAttribute("disabled"))
            .map((e) => ({ tag: e.tagName, name: (e.getAttribute("aria-label") || e.textContent || e.getAttribute("placeholder") || "").trim().slice(0, 40) }));
    });

    // B. duplicate-target flow
    await nameInput.fill("Dup");
    await nameInput.press("Enter");
    await page.waitForTimeout(400);
    out.dupBannerText = await well.innerText();
    out.dupBannerLive = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        const banner = Array.from(w.querySelectorAll("span")).find((s) => /already exists/.test(s.textContent || ""));
        if (!banner) return { found: false };
        // walk up looking for a live region
        let n = banner, live = null;
        while (n && n !== document.body) {
            if (n.getAttribute("aria-live") || n.getAttribute("role") === "status" || n.getAttribute("role") === "alert") { live = n.outerHTML.slice(0, 80); break; }
            n = n.parentElement;
        }
        return { found: true, liveAncestor: live, focusedAfterSave: document.activeElement?.outerHTML?.slice(0, 90) };
    });
    out.storeBeforeUpdate = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => ({ id: p.id, name: p.name, colors: p.colors.map((c) => c.css) })));

    // C. STALE TARGET: change the name to something new, then press Update.
    await nameInput.fill("Brand New Name");
    await page.waitForTimeout(250);
    out.bannerStillShownAfterRename = await well.innerText();
    const updateBtn = well.getByRole("button", { name: "Update" });
    out.updateBtnVisible = await updateBtn.isVisible().catch(() => false);
    if (out.updateBtnVisible) await updateBtn.click();
    await page.waitForTimeout(700);
    out.storeAfterUpdate = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => ({ id: p.id, name: p.name, colors: p.colors.map((c) => c.css) })));
    out.editorTextAfterUpdate = await well.innerText();

    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/probe/desktop-after-update.png" });
    await ctx.close();
}

// ───────── touch / mobile (canHover === false) ─────────
{
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    await ctx.addInitScript(SEED);
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4500);
    const well = page.locator(".dashed-well").filter({ visible: true }).first();
    out.mobile = {};
    out.mobile.wellVisible = await well.isVisible().catch(() => false);
    out.mobile.text = await well.innerText().catch(() => null);
    // tap the first swatch — does the reka-ui Popover open?
    const firstSwatch = well.locator(".swatch-row > div").first();
    out.mobile.beforeTapPopovers = await page.locator("[data-reka-popper-content-wrapper], [role=dialog]").count();
    await firstSwatch.tap().catch((e) => (out.mobile.tapError = String(e).split("\n")[0]));
    await page.waitForTimeout(700);
    out.mobile.afterTapPopovers = await page.locator("[data-reka-popper-content-wrapper], [role=dialog]").count();
    out.mobile.editOverlayVisible = await page.locator(".edit-overlay").count();
    out.mobile.editOverlayComputed = await page.evaluate(() => {
        const e = document.querySelector(".edit-overlay");
        return e ? getComputedStyle(e).display : "no-node";
    });
    // is the swatch a tappable, named control?
    out.mobile.swatchDom = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        const s = w?.querySelector('[data-testid="watercolor-swatch"]');
        if (!s) return null;
        const cs = getComputedStyle(s);
        const r = s.getBoundingClientRect();
        return { tag: s.tagName, ariaHidden: s.getAttribute("aria-hidden"), pointerEvents: cs.pointerEvents, w: Math.round(r.width), h: Math.round(r.height) };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/probe/mobile-after-tap.png" });
    await ctx.close();
}

console.log(JSON.stringify(out, null, 1));
await browser.close();
