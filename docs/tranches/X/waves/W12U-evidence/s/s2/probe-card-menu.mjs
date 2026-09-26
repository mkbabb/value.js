// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-112 · V-113 · V-288 · V-289 · V-542 falsifier (:9000). /browse logged in
// as the owner of remote-0 (versions 3, public) + the admin token: open its card menu (and,
// where Export cascades, its Export sub). GREEN iff no row wraps (every item within 1.3× the
// shortest item's height), every item icon is 16 px, no item or sub row is italic, the
// palette's name is not repeated as a menu header, the version count is a trailing shortcut,
// and at a coarse/narrow viewport Export's formats sit in the root menu (no cascade over the
// parent) with every overlay inside the viewport. Usage: node probe-card-menu.mjs <w> <h> [theme].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, admin: true, browse: "ok" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByRole("button", { name: "Palette menu" }).first().click();
await p.waitForTimeout(500);
const sub = p.getByRole("menuitem", { name: "Export" });
const cascades = await sub.count() > 0 && await sub.first().getAttribute("aria-haspopup") === "menu";
if (cascades) { await sub.first().hover(); await p.waitForTimeout(600); }
const r = await p.evaluate(() => {
    const menus = [...document.querySelectorAll("[role=menu]")].filter((m) => m.getBoundingClientRect().width > 0);
    const root = menus[0];
    const items = [...root.querySelectorAll("[role=menuitem]")];
    const hs = items.map((i) => i.getBoundingClientRect().height);
    const icons = [...root.querySelectorAll("[role=menuitem] > svg")].map((s) => Math.round(s.getBoundingClientRect().width));
    const italic = menus.flatMap((m) => [...m.querySelectorAll("[role=menuitem]")]).filter((i) => getComputedStyle(i).fontStyle === "italic").map((i) => i.textContent.trim());
    const header = [...root.querySelectorAll("[role=group] > div, [data-slot=dropdown-menu-label], [role=menu] > div")].some((l) => /Remote 0/.test(l.textContent) && !l.querySelector("[role=menuitem]"));
    const vers = items.find((i) => /Versions/.test(i.textContent));
    const shortcut = !!vers?.querySelector("[data-slot=dropdown-menu-shortcut], .dropdown-menu__shortcut, kbd, [class*=shortcut]");
    const inRoot = items.some((i) => i.textContent.trim() === "JSON");
    const boxes = menus.map((m) => { const k = m.getBoundingClientRect(); return [Math.round(k.left), Math.round(k.top), Math.round(k.right), Math.round(k.bottom)]; });
    const inside = boxes.every(([l, t, rr, bb]) => l >= 0 && t >= 0 && rr <= innerWidth && bb <= innerHeight);
    const overParent = menus.length > 1 && (() => { const a = menus[0].getBoundingClientRect(), c = menus[1].getBoundingClientRect(); return Math.min(a.right, c.right) - Math.max(a.left, c.left) > 8; })();
    return { rows: items.length, hMin: Math.round(Math.min(...hs)), hMax: Math.round(Math.max(...hs)), icons: [...new Set(icons)], italic, header, shortcut, inRoot, boxes, inside, overParent, width: Math.round(root.getBoundingClientRect().width) };
});
const coarse = phone;
const ok = r.hMax <= r.hMin * 1.3 && r.icons.every((w) => w === 16) && r.italic.length === 0 && !r.header && r.shortcut && (!coarse || (r.inRoot && !cascades)) && r.inside && (!coarse || !r.overParent);
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ cascades, ...r })}`);
await b.close();
process.exit(ok ? 0 : 1);
