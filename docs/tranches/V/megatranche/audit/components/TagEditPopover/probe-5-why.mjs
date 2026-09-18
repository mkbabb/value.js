// CHALLENGE-D · TagEditPopover — probe 5: WHY does the surface self-dismiss,
// and is it ever positioned? Samples the popper wrapper transform/rect each
// frame and records reka's dismissal CustomEvents. READ-ONLY.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const BASE = `http://${process.env.LAN_IP}:9000`;
const API = "http://localhost:3000";

const TAGS = [
    { id: "t1", name: "pastel", category: "mood" },
    { id: "t2", name: "warm", category: "temperature" },
    { id: "t3", name: "muted-earthen-autumnal", category: "mood" },
    { id: "t4", name: "neon", category: "saturation" },
    { id: "t5", name: "monochrome", category: "structure" },
    { id: "t6", name: "duotone", category: "structure" },
    { id: "t7", name: "high-contrast", category: "accessibility" },
    { id: "t8", name: "brand", category: "usage" },
    { id: "t9", name: "vaporwave", category: "aesthetic" },
    { id: "t10", name: "sepia", category: "temperature" },
];
const COLORS = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"].map((c) => ({ color: c, name: null }));
const P = (i, owned) => ({
    name: `Specimen ${i}`, slug: `specimen-${i}`,
    userSlug: owned ? "me-slug" : "someone-else", colors: COLORS,
    tags: i === 1 ? ["warm"] : [],
    createdAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-02T00:00:00.000Z",
    isLocal: false, voteCount: 3, voted: false, visibility: "public",
    tier: "standard", published: true, versionCount: 1, currentHash: `hash-${i}`,
});
const PALETTES = [P(1, true), P(2, true), P(3, false)];

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.route(`${API}/**`, async (route) => {
    const u = new URL(route.request().url());
    const m = route.request().method();
    const json = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", headers: { "access-control-allow-origin": "*", "access-control-allow-credentials": "true", etag: '"srv-1"' }, body: JSON.stringify(b) });
    if (m === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "access-control-allow-credentials": "true" } });
    if (u.pathname === "/colors/tags") return json(TAGS);
    if (u.pathname === "/palettes" && m === "GET") return json({ data: PALETTES, nextCursor: null, hasMore: false });
    if (u.pathname.startsWith("/palettes/") && m === "PATCH") return json({ ...PALETTES[0], tags: JSON.parse(route.request().postData() || "{}").tags });
    return json({ data: [], hasMore: false, nextCursor: null });
});
const page = await ctx.newPage();
await page.addInitScript(() => localStorage.setItem("palette-user-slug", "me-slug"));
await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
await page.waitForTimeout(3500);

await page.evaluate(() => {
    window.__w = { samples: [], events: [] };
    for (const t of ["dismissableLayer.pointerDownOutside", "dismissableLayer.focusOutside", "focusScope.autoFocusOnMount", "focusScope.autoFocusOnUnmount"]) {
        document.addEventListener(t, (e) => {
            window.__w.events.push({ t: +performance.now().toFixed(1), type: t, target: e.target?.tagName + "." + (e.target?.className || "").toString().slice(0, 50), defaultPrevented: e.defaultPrevented });
        }, true);
    }
    let n = 0;
    (function tick() {
        const els = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")];
        const tagPanel = els.find((e) => e.querySelector(".section-label"));
        if (tagPanel) {
            const cs = getComputedStyle(tagPanel);
            const inner = tagPanel.querySelector(".popover-content") || tagPanel.firstElementChild;
            const ics = inner ? getComputedStyle(inner) : null;
            const b = (inner || tagPanel).getBoundingClientRect();
            window.__w.samples.push({
                t: +performance.now().toFixed(1),
                transform: cs.transform,
                rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
                opacity: ics?.opacity, visibility: ics?.visibility,
                innerTransform: ics?.transform,
                dataState: inner?.getAttribute("data-state"),
                text: tagPanel.innerText.replace(/\s+/g, " ").slice(0, 120),
            });
        }
        if (++n < 200) requestAnimationFrame(tick);
    })();
});

const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
await menu.click();
await page.waitForTimeout(300);
const item = page.getByRole("menuitem", { name: /Edit Tags/i }).first();
await item.click();
// race a screenshot into the visible window
const shot = page.screenshot({ path: `${OUT}why-01-during.png` });
await page.waitForTimeout(80);
await page.screenshot({ path: `${OUT}why-02-t80.png` });
await shot;
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}why-03-settled.png` });

const w = await page.evaluate(() => window.__w);
fs.writeFileSync(`${OUT}probe-5.json`, JSON.stringify(w, null, 2));
console.log(JSON.stringify({ events: w.events, sampleCount: w.samples.length, first: w.samples[0], last: w.samples.at(-1), distinctTransforms: [...new Set(w.samples.map((s) => s.transform))], distinctRects: [...new Set(w.samples.map((s) => JSON.stringify(s.rect)))].slice(0, 8), text: w.samples[0]?.text }, null, 2));
await browser.close();
