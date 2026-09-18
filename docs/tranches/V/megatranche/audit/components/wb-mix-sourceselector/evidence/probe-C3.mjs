// CHALLENGE-C probe C3 — seeds the LOCAL palette store (localStorage-backed,
// demo/palettes/usePaletteStore.ts:6 STORAGE_KEY="color-palettes"), then
// exercises both modes of MixSourceSelector:
//   3a  colors mode "From palettes" dropdown swatches — reachable?
//   3b  collapsible open/close animation actually resolves?
//   3c  palettes mode: nested interactive controls inside the wrapper <button>
//   3d  chip remove-button geometry, measured by injecting the component's
//       EXACT class string into the live page (shipped-CSS resolution)
//   3e  orphaned-selection: select a palette, delete it from the store
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const SEED = {
    version: 1,
    palettes: [
        { id: "p1", slug: "sunset-01", name: "Sunset", isLocal: true, colors: [
            { css: "#ff6b6b", position: 0 }, { css: "#feca57", position: 1 }, { css: "#48dbfb", position: 2 },
        ] },
        { id: "p2", slug: "forest-02", name: "Forest", isLocal: true, colors: [
            { css: "#10ac84", position: 0 }, { css: "#222f3e", position: 1 },
        ] },
        { id: "p3", slug: "berry-03", name: "Berry", isLocal: true, colors: [
            { css: "#5f27cd", position: 0 }, { css: "#ee5253", position: 1 },
        ] },
    ],
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript((seed) => {
    localStorage.setItem("color-palettes", JSON.stringify(seed));
}, SEED);
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(4000);

const out = {};

// --- 3a/3b: colors mode "From palettes" ------------------------------------
const trigger = page.getByText("From palettes");
out.fromPalettesVisible = await trigger.isVisible().catch(() => false);
if (out.fromPalettesVisible) {
    await trigger.click();
    await page.waitForTimeout(80);
    out.collapsibleAnimation = await page.evaluate(() => {
        const c = document.querySelector("[data-state][class*='animate-collapsible-down']")
            || [...document.querySelectorAll("*")].find((e) => e.className?.toString?.().includes("animate-collapsible-down"));
        if (!c) return null;
        const cs = getComputedStyle(c);
        return {
            state: c.getAttribute("data-state"),
            animationName: cs.animationName,
            animationDuration: cs.animationDuration,
            heightVarReka: cs.getPropertyValue("--reka-collapsible-content-height").trim(),
            heightVarDisclosure: cs.getPropertyValue("--disclosure-content-size").trim(),
        };
    });
    await page.waitForTimeout(500);
    out.paletteDropdownSwatches = await page.evaluate(() => {
        const dots = [...document.querySelectorAll(".watercolor-swatch")].filter((d) =>
            d.className.includes("w-8") && d.className.includes("h-8"),
        );
        return dots.slice(0, 3).map((d) => ({
            tag: d.tagName,
            ariaHidden: d.getAttribute("aria-hidden"),
            ariaLabel: d.getAttribute("aria-label"),
            title: d.getAttribute("title"),
            pointerEvents: getComputedStyle(d).pointerEvents,
        }));
    });
    // click one and see whether a chip appears
    const first = page.locator(".watercolor-swatch.w-8").first();
    if (await first.count()) {
        const b = await first.boundingBox();
        if (b) await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(300);
    }
    out.chipsAfterPaletteSwatchClick = await page.locator("[data-mix-source]").count();
}

// --- 3c: palettes mode ------------------------------------------------------
await page.getByRole("button", { name: "Palettes", exact: true }).first().click();
await page.waitForTimeout(500);
const PALSEL = "button[aria-pressed][aria-label*='alette']";
out.palettesMode = await page.evaluate((sel) => {
    const wrappers = [...document.querySelectorAll(sel)];
    return wrappers.map((w) => ({
        ariaPressed: w.getAttribute("aria-pressed"),
        ariaLabel: w.getAttribute("aria-label"),
        nestedInteractive: w.querySelectorAll("button,a[href],input,select,textarea,[tabindex]:not([tabindex='-1'])").length,
        nestedInteractiveTags: [...w.querySelectorAll("button,a[href],input,select,textarea")].map(
            (e) => e.tagName + "[" + (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20)) + "]",
        ),
        rect: (({ width, height }) => ({ w: Math.round(width), h: Math.round(height) }))(w.getBoundingClientRect()),
    }));
}, PALSEL);

// select two palettes
const cards = page.locator(PALSEL);
await cards.nth(0).click();
await page.waitForTimeout(200);
await cards.nth(1).click();
await page.waitForTimeout(200);
out.selectedCount = await page.locator(PALSEL.replace('[aria-pressed]', "[aria-pressed='true']")).count();
out.mixEnabledAfterTwoPalettes = !(await page.getByRole("button", { name: "Mix", exact: true }).isDisabled());

// --- 3e: orphan a selected palette by deleting it from the store -----------
await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("color-palettes"));
    s.palettes = s.palettes.filter((p) => p.slug !== "sunset-01");
    localStorage.setItem("color-palettes", JSON.stringify(s));
    window.dispatchEvent(new StorageEvent("storage", {
        key: "color-palettes", newValue: JSON.stringify(s), storageArea: localStorage,
    }));
});
await page.waitForTimeout(700);
out.afterDeletingASelectedPalette = {
    renderedCards: await page.locator(PALSEL).count(),
    stillSelectedVisible: await page.locator(PALSEL.replace('[aria-pressed]', "[aria-pressed='true']")).count(),
    mixStillEnabled: !(await page.getByRole("button", { name: "Mix", exact: true }).isDisabled()),
};

// --- 3d: chip remove-button geometry, exact shipped class string ------------
out.removeButtonGeometry = await page.evaluate(() => {
    const host = document.createElement("div");
    host.style.cssText = "position:fixed;top:0;left:0;width:200px;height:200px;";
    host.innerHTML = `
      <div class="group relative" style="width:44px;height:44px">
        <button id="__probe_x"
          class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-popover active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none">
          <svg class="w-2.5 h-2.5" viewBox="0 0 24 24"><path d="M18 6 6 18"/></svg>
        </button>
      </div>`;
    document.body.appendChild(host);
    const btn = host.querySelector("#__probe_x");
    const r = btn.getBoundingClientRect();
    const cs = getComputedStyle(btn);
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const res = {
        widthPx: r.width, heightPx: r.height,
        opacity: cs.opacity,
        pointerEvents: cs.pointerEvents,
        typeAttr: btn.getAttribute("type"),
        defaultTypeProperty: btn.type,
        accessibleTextContent: btn.textContent.trim(),
        ariaLabel: btn.getAttribute("aria-label"),
        title: btn.getAttribute("title"),
        hitTestableWhileInvisible: hit === btn || btn.contains(hit),
        wcag258Min: 24,
        passesWcag258: r.width >= 24 && r.height >= 24,
    };
    host.remove();
    return res;
});

await page.screenshot({ path: new URL("./probe-C3-palettes-mode.png", import.meta.url).pathname });
writeFileSync(new URL("./probe-C3.json", import.meta.url).pathname, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
