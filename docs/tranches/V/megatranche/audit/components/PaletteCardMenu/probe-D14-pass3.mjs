// CHALLENGE-D pass 3 — probe D14
// Read the REAL accessibility tree (CDP Accessibility domain) for the open menu:
//   - the menu's own computed AX name
//   - the computed AX name of the visibility row, whose state annotation is a
//     child text node (PaletteCardMenu.vue:56-59) rather than aria-checked
// The remote+owned arm cannot be reached without a backend, so its two rows are
// injected into the live open menu byte-for-byte as the SFC writes them.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D14-pass3-results.json", import.meta.url).pathname;

const SAVED = {
    id: "pal-1", name: "Muted Terracotta and Deep Sea Foam Study", slug: "s", isLocal: true,
    tier: "featured", versionCount: 4,
    colors: [{ css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" }],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [SAVED] }));
await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
await page.waitForTimeout(3000);
await page.getByRole("button", { name: "Palette menu" }).first().click();
await page.waitForTimeout(700);

// inject the remote+owned visibility row and the versions row exactly as written
await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const proto = menu.querySelector('[role="menuitem"]');
    const mk = (label, ann) => {
        const el = proto.cloneNode(false);
        el.removeAttribute("id");
        el.className = proto.className;
        el.setAttribute("data-pcm-probe", label);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "h-4 w-4");
        el.appendChild(svg);
        el.appendChild(document.createTextNode(" " + label + " "));
        const s = document.createElement("span");
        s.className = "ml-auto fira-code text-mono-caption opacity-55 tracking-wide";
        s.style.fontVariant = "small-caps";
        s.textContent = ann;
        el.appendChild(s);
        menu.appendChild(el);
    };
    mk("Publish", "private");       // PaletteCardMenu.vue:48-60, isPublic=false
    mk("Make private", "public");   // PaletteCardMenu.vue:48-60, isPublic=true
    mk("Versions", "4");            // PaletteCardMenu.vue:93-102
});
await page.waitForTimeout(200);

const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");
const { nodes } = await cdp.send("Accessibility.getFullAXTree");

const pick = (n) => ({
    role: n.role?.value,
    name: n.name?.value,
    nameFrom: n.name?.sources?.filter((s) => s.value != null).map((s) => s.type + ":" + (s.attribute || "")).slice(0, 3),
    checked: n.properties?.find((p) => p.name === "checked")?.value?.value ?? null,
    disabled: n.properties?.find((p) => p.name === "disabled")?.value?.value ?? null,
    description: n.description?.value ?? null,
});

const menus = nodes.filter((n) => n.role?.value === "menu").map(pick);
const items = nodes.filter((n) => n.role?.value === "menuitem").map(pick);
const buttons = nodes.filter((n) => n.role?.value === "button" && /Palette menu/i.test(n.name?.value || "")).map(pick);

const R = { menus, items, buttons };
fs.writeFileSync(OUT, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
await browser.close();
