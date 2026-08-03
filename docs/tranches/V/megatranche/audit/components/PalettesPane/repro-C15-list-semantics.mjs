/**
 * CHALLENGE-C pass-5 probe #15 — the accessibility tree PalettesPane actually
 * builds, measured with Chrome's own AX tree (CDP), not inferred from markup.
 *
 * PalettesPane.vue:75-98 puts `<PaletteCard role="article">` children
 * (PaletteCard.vue:22) inside `<PaletteCardGrid role="list">`
 * (PaletteCardGrid.vue:3). ARIA requires `list` to own `listitem` children.
 */
import { chromium } from "playwright";

const KEY = "color-palettes";
const mk = (n) => ({
    id: `id-${n}`,
    name: n,
    slug: n.toLowerCase(),
    colors: [
        { css: "#e11d48", position: 0 },
        { css: "#22c55e", position: 1 },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: true,
});
const SEED = { version: 1, palettes: [mk("Alpha"), mk("Bravo"), mk("Charlie")] };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 25000 });
await page.waitForTimeout(1500);

const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");
const { nodes } = await cdp.send("Accessibility.getFullAXTree");

const byId = new Map(nodes.map((n) => [n.nodeId, n]));
const lists = nodes.filter((n) => n.role?.value === "list" && !n.ignored);
const listReport = lists.map((l) => {
    const kids = (l.childIds ?? []).map((id) => byId.get(id)).filter(Boolean);
    return {
        name: l.name?.value ?? "",
        childRoles: kids.map((k) => k.role?.value),
        listitemChildren: kids.filter((k) => k.role?.value === "listitem").length,
        setsize: l.properties?.find((p) => p.name === "setsize")?.value?.value ?? null,
    };
});
console.log("AX lists on /#/palettes  :", JSON.stringify(listReport, null, 2));
console.log(
    "AX listitem nodes anywhere:",
    nodes.filter((n) => n.role?.value === "listitem" && !n.ignored).length,
);
console.log(
    "AX article nodes          :",
    nodes
        .filter((n) => n.role?.value === "article")
        .map((n) => ({ name: n.name?.value, ignored: n.ignored })),
);

// Structural cross-check straight off the DOM.
const dom = await page.evaluate(() => {
    const grid = document.querySelector(".palette-card-grid");
    const kids = [...grid.children].filter((c) => c.nodeType === 1);
    return {
        gridRole: grid.getAttribute("role"),
        elementChildRoles: kids.map((c) => c.getAttribute("role") ?? c.tagName),
        cardsWithListitem: kids.filter((c) => c.getAttribute("role") === "listitem").length,
        // tap targets inside the pane subtree only
        smallTargets: [...document.querySelectorAll(".palette-card-grid *")]
            .filter((e) => {
                const r = e.getBoundingClientRect();
                const interactive =
                    e.tagName === "BUTTON" ||
                    e.tagName === "A" ||
                    e.getAttribute("role") === "button" ||
                    getComputedStyle(e).cursor === "pointer";
                return interactive && r.width > 0 && (r.width < 24 || r.height < 24);
            })
            .map((e) => ({
                tag: e.tagName,
                cls: (e.className || "").toString().split(" ")[0],
                label: e.getAttribute("aria-label"),
                w: Math.round(e.getBoundingClientRect().width),
                h: Math.round(e.getBoundingClientRect().height),
            })),
        // is the expand gesture keyboard-reachable?
        cardTabIndex: [...document.querySelectorAll("[role='article']")].map((c) => c.tabIndex),
        gridFocusables: [
            ...document.querySelectorAll(
                '.palette-card-grid a[href],.palette-card-grid button,.palette-card-grid [tabindex]:not([tabindex="-1"])',
            ),
        ].map((e) => `${e.tagName}[${e.getAttribute("aria-label") ?? ""}]`),
    };
});
console.log("DOM cross-check          :", JSON.stringify(dom, null, 2));

// Is `expandedId` one app-global slot shared with the Browse pane?
const shared = await page.evaluate(async () => {
    const m = await import(
        "/@fs/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts.ts"
    );
    return {
        keys: Object.keys(m).filter((k) => k.endsWith("PORT_KEY")),
    };
});
console.log("port keys                :", JSON.stringify(shared));

await browser.close();
