// CHALLENGE-D · TagEditPopover — probe 4: frame-by-frame. Does the popover
// mount for a tick and self-dismiss? Records `props.open` on the live
// TagEditPopover instance + popover DOM presence every animation frame across
// the "Edit Tags" activation. READ-ONLY.
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

// arm the recorder
await page.evaluate(() => {
    window.__rec = { frames: [], mutations: [] };
    const obs = new MutationObserver((records) => {
        for (const r of records) {
            for (const n of r.addedNodes) {
                if (n.nodeType === 1) {
                    const el = n;
                    if (el.matches?.("[data-reka-popper-content-wrapper], .popover-content") || el.querySelector?.("[data-reka-popper-content-wrapper], .popover-content"))
                        window.__rec.mutations.push({ t: +performance.now().toFixed(1), op: "ADD", html: el.outerHTML.slice(0, 300) });
                }
            }
            for (const n of r.removedNodes) {
                if (n.nodeType === 1) {
                    const el = n;
                    if (el.matches?.("[data-reka-popper-content-wrapper], .popover-content") || el.querySelector?.("[data-reka-popper-content-wrapper], .popover-content"))
                        window.__rec.mutations.push({ t: +performance.now().toFixed(1), op: "REMOVE", html: el.outerHTML.slice(0, 300) });
                }
            }
        }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    const root = document.querySelector("#app") || document.body.firstElementChild;
    const app = root && root.__vue_app__;
    function findTagEdit() {
        const seen = new Set();
        let hit = null;
        (function walk(inst, d) {
            if (!inst || d > 60 || seen.has(inst) || hit) return;
            seen.add(inst);
            const name = inst.type?.name || inst.type?.__name || "";
            if (name === "TagEditPopover") { hit = inst; return; }
            const kids = [];
            const collect = (v) => {
                if (!v) return;
                if (Array.isArray(v)) return v.forEach(collect);
                if (v.component) kids.push(v.component);
                if (v.children) collect(v.children);
            };
            collect(inst.subTree);
            kids.forEach((k) => walk(k, d + 1));
        })(app._instance, 0);
        return hit;
    }
    let n = 0;
    (function tick() {
        const inst = findTagEdit();
        window.__rec.frames.push({
            t: +performance.now().toFixed(1),
            mounted: !!inst,
            open: inst ? inst.props.open : null,
            popovers: document.querySelectorAll(".popover-content").length,
            wrappers: document.querySelectorAll("[data-reka-popper-content-wrapper]").length,
        });
        if (++n < 150) requestAnimationFrame(tick);
    })();
});

const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
await menu.click();
await page.waitForTimeout(300);
await page.getByRole("menuitem", { name: /Edit Tags/i }).first().click();
await page.waitForTimeout(2600);

const rec = await page.evaluate(() => window.__rec);
// compress: only frames where the state changes
const compressed = [];
let prev = null;
for (const f of rec.frames) {
    const k = `${f.mounted}|${f.open}|${f.popovers}|${f.wrappers}`;
    if (k !== prev) { compressed.push(f); prev = k; }
}
const out = { transitions: compressed, mutations: rec.mutations, totalFrames: rec.frames.length };
fs.writeFileSync(`${OUT}probe-4.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
