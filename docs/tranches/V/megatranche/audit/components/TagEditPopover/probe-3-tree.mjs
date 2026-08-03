// CHALLENGE-D · TagEditPopover — probe 3: walk the Vue instance tree to prove
// whether the component mounts, what `open` it sees, and whether reka's
// PopoverRoot/Presence ever renders content. READ-ONLY.
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
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text().slice(0, 240)}`));
page.on("pageerror", (e) => logs.push(`PAGEERROR: ${e}`));
await page.addInitScript(() => localStorage.setItem("palette-user-slug", "me-slug"));
await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
await page.waitForTimeout(3500);

const WALK = `(() => {
  const root = document.querySelector('#app') || document.body.firstElementChild;
  const app = root && root.__vue_app__;
  const found = [];
  const seen = new Set();
  function walk(inst, depth) {
    if (!inst || depth > 60 || seen.has(inst)) return;
    seen.add(inst);
    const name = inst.type?.name || inst.type?.__name || inst.type?.__file?.split('/').pop() || '?';
    if (/TagEditPopover|^Popover$|^PopoverRoot$|^PopoverContent$|^PopoverTrigger$|^Presence$/.test(name)) {
      found.push({
        name,
        depth,
        file: inst.type?.__file || null,
        props: (() => { try { return JSON.parse(JSON.stringify(inst.props || {})); } catch { return Object.keys(inst.props||{}); } })(),
        elType: inst.vnode?.el ? (inst.vnode.el.nodeType === 1 ? inst.vnode.el.tagName : 'nodeType:' + inst.vnode.el.nodeType) : 'null',
        subTreeType: (() => { const t = inst.subTree?.type; return typeof t === 'string' ? t : (t?.name || t?.__name || String(t).slice(0,40)); })(),
      });
    }
    const kids = [];
    if (inst.subTree) {
      const collect = (v) => {
        if (!v) return;
        if (Array.isArray(v)) return v.forEach(collect);
        if (v.component) kids.push(v.component);
        if (v.children) collect(v.children);
        if (v.suspense) { collect(v.suspense.activeBranch); }
      };
      collect(inst.subTree);
    }
    kids.forEach((k) => walk(k, depth + 1));
  }
  if (app && app._instance) walk(app._instance, 0);
  return { hasApp: !!app, found };
})()`;

const out = {};
out.beforeOpen = await page.evaluate(WALK);

const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
await menu.click();
await page.waitForTimeout(400);
await page.getByRole("menuitem", { name: /Edit Tags/i }).first().click();
await page.waitForTimeout(1200);

out.afterOpen = await page.evaluate(WALK);
out.dom = await page.evaluate(() => ({
    popper: document.querySelectorAll("[data-reka-popper-content-wrapper]").length,
    dialogs: document.querySelectorAll('[role="dialog"]').length,
    haspopupDialog: document.querySelectorAll('[aria-haspopup="dialog"]').length,
    popoverContentCls: document.querySelectorAll(".popover-content").length,
    commentsInBody: (() => {
        let n = 0;
        const it = document.createNodeIterator(document.body, NodeFilter.SHOW_COMMENT);
        while (it.nextNode()) n++;
        return n;
    })(),
}));
out.logs = logs;
fs.writeFileSync(`${OUT}probe-3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 9000));
await browser.close();
