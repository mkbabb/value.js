// CHALLENGE-D · TagEditPopover — probe 2: does the popover render AT ALL?
// READ-ONLY. LAN origin defeats the loopback misconfig latch; API stubbed at
// the Playwright network layer.
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
const COLORS = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"].map((c) => ({
    color: c, name: null, hex: c, css: c,
}));
const P = (i, owned) => ({
    name: `Specimen ${i}`, slug: `specimen-${i}`,
    userSlug: owned ? "me-slug" : "someone-else",
    colors: COLORS, tags: i === 1 ? ["warm"] : [],
    createdAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-02T00:00:00.000Z",
    isLocal: false, voteCount: 3, voted: false,
    visibility: "public", tier: "standard", published: true,
    versionCount: 1, currentHash: `hash-${i}`,
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
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text().slice(0, 300)}`));
page.on("pageerror", (e) => logs.push(`PAGEERROR: ${e}`));
const netTags = [];
page.on("request", (r) => { if (r.url().includes("/colors/tags")) netTags.push(r.url()); });
await page.addInitScript(() => localStorage.setItem("palette-user-slug", "me-slug"));
await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
await page.waitForTimeout(3500);

const out = {};
const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
await menu.click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}dbg-01-menu.png` });
out.menuItems = await page.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"]')].map((e) => e.textContent.replace(/\s+/g, " ").trim())
);

const item = page.getByRole("menuitem", { name: /Edit Tags/i }).first();
out.editTagsCount = await item.count();
await item.click();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}dbg-02-after-edittags.png` });

out.tagsRequests = netTags;
out.dom = await page.evaluate(() => {
    const q = (s) => document.querySelectorAll(s).length;
    const sec = [...document.querySelectorAll(".section-label")].map((e) => e.textContent.trim());
    return {
        popperWrappers: q("[data-reka-popper-content-wrapper]"),
        radixWrappers: q("[data-radix-popper-content-wrapper]"),
        dialogs: q('[role="dialog"]'),
        popoverContent: q('[data-slot="popover-content"]'),
        anyPopover: q('[class*="popover"]'),
        sectionLabels: sec,
        checkboxes: q('[role="checkbox"]'),
        labels: q("label"),
        bodyChildren: [...document.body.children].map((e) => `${e.tagName}.${(e.className || "").toString().slice(0, 60)}`),
        teleports: q("body > div:not([id])"),
        textHasTags: document.body.innerText.includes("Tags"),
        innerTextTail: document.body.innerText.slice(-400),
    };
});
out.logs = logs;
fs.writeFileSync(`${OUT}probe-2.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
