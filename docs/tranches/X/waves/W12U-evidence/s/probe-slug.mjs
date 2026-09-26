// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · the slug-edit layer + identity menu falsifier on the served page (:9000),
// 390x844 touch (the dock stays expanded below 1024) plus the desktop admin twin at 1440.
//  A  V-14/15/20  unknown slug (login 404 after 1.2 s): the layer stays open and busy while
//                 pending, then says "Slug not found." (role=alert) and stays open.
//  B  V-16        a 3-word typo while signed in (admin check 403): no admin token stored, the
//                 user slug is kept, the layer says why.
//  C  V-21        admin identity (both twins) offers "Sign out of admin", and it signs out.
//  D  V-19/83     a failed Regenerate slug (POST /sessions 503) keeps the stored slug.
//  E  V-17/251    every live layer control sits inside the 390 viewport and the dock box.
// Usage: node probe-slug.mjs [light|dark]  → PASS/RED per arm; exit 1 on any RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
const arm = (n, ok, d) => out.push(`${ok ? "PASS" : "RED "} ${n} ${d}`);
async function page(opts, vp = { width: 390, height: 844 }, mobile = true) {
    const ctx = await b.newContext({ viewport: vp, colorScheme: theme, isMobile: mobile, hasTouch: mobile });
    await prepare(ctx, { theme, ...opts });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    await (mobile ? p.getByRole("button", { name: "Menu" }) : p.locator(".glass-dock")).first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1000);
    return { ctx, p };
}
const menuItem = async (p, name) => {
    await p.getByRole("button", { name: "Menu" }).first().click();
    await p.waitForTimeout(400);
    await p.getByRole("menuitem", { name }).first().click();
    await p.waitForTimeout(700);
};
const field = (p) => p.getByRole("textbox", { name: "Slug or admin token" }).first();
const alertText = (p) => p.locator("#slug-edit-error").innerText().catch(() => "");
// A
{
    const { ctx, p } = await page({});
    await ctx.route("**/sessions/login", async (r) => { await new Promise((res) => setTimeout(res, 1200)); return r.fulfill({ status: 404, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "User not found", status: 404 }) }); });
    await menuItem(p, /^Login$/);
    await field(p).fill("brave-quiet-amber-fox");
    await p.keyboard.press("Enter");
    await p.waitForTimeout(400);
    const busy = await p.locator("form[aria-busy=true]").count();
    const openPending = await field(p).isVisible().catch(() => false);
    await p.waitForTimeout(1600);
    const openAfter = await field(p).isVisible().catch(() => false);
    const msg = await alertText(p);
    arm("A V-15 pending: layer open + aria-busy", busy === 1 && openPending, `busy=${busy} open=${openPending}`);
    arm("A V-14/20 failure said, layer kept", openAfter && /Slug not found/.test(msg), `open=${openAfter} alert="${msg}"`);
    await ctx.close();
}
// B
{
    const { ctx, p } = await page({ user: true });
    await ctx.route("**/admin/tags", (r) => r.fulfill({ status: 403, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Forbidden", status: 403 }) }));
    await menuItem(p, /Switch account/);
    await field(p).fill("brave-quiet-amber");
    await p.keyboard.press("Enter");
    await p.waitForTimeout(1500);
    const ls = await p.evaluate(() => [localStorage.getItem("palette-admin-token"), localStorage.getItem("palette-user-slug")]);
    const msg = await alertText(p);
    arm("B V-16 typo is not an admin token; identity kept", ls[0] === null && ls[1] === "test-user" && msg.length > 0, `adminToken=${ls[0]} slug=${ls[1]} alert="${msg}"`);
    await ctx.close();
}
// C (mobile twin, then desktop twin)
{
    const { ctx, p } = await page({ admin: true });
    await p.getByRole("button", { name: "Menu" }).first().click();
    await p.waitForTimeout(400);
    const has = await p.getByRole("menuitem", { name: "Sign out of admin" }).count();
    if (has) { await p.getByRole("menuitem", { name: "Sign out of admin" }).first().click(); await p.waitForTimeout(500); }
    const tok = await p.evaluate(() => localStorage.getItem("palette-admin-token"));
    arm("C V-21 mobile admin exit", has === 1 && tok === null, `row=${has} tokenAfter=${tok}`);
    await ctx.close();
}
{
    const { ctx, p } = await page({ admin: true }, { width: 1440, height: 900 }, false);
    const pill = p.locator(".glass-dock.collapsed");
    if (await pill.count()) { await pill.click(); await p.waitForTimeout(1200); }
    const trig = p.locator('[data-o18="admin-trigger"]');
    const n = await trig.count();
    let row = 0, tok = "unread";
    if (n) {
        await trig.first().click(); await p.waitForTimeout(500);
        row = await p.getByRole("menuitem", { name: "Sign out of admin" }).count();
        if (row) { await p.getByRole("menuitem", { name: "Sign out of admin" }).first().click(); await p.waitForTimeout(500); }
        tok = await p.evaluate(() => localStorage.getItem("palette-admin-token"));
    }
    arm("C V-21 desktop admin exit", n === 1 && row === 1 && tok === null, `trigger=${n} row=${row} tokenAfter=${tok}`);
    await ctx.close();
}
// D
{
    const { ctx, p } = await page({ user: true });
    await ctx.route("**/sessions", (r) => r.request().method() === "POST" ? r.fulfill({ status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503 }) }) : r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await p.getByRole("button", { name: "Menu" }).first().click();
    await p.waitForTimeout(400);
    await p.getByRole("menuitem", { name: /Regenerate slug/ }).first().click();
    await p.waitForTimeout(1500);
    const slug = await p.evaluate(() => localStorage.getItem("palette-user-slug"));
    arm("D V-19/83 failed regenerate keeps the identity", slug === "test-user", `storedSlug=${slug}`);
    await ctx.close();
}
// E
{
    const { ctx, p } = await page({});
    await menuItem(p, /^Login$/);
    const r = await p.evaluate(() => {
        const dock = document.querySelector(".glass-dock")?.getBoundingClientRect();
        const ctl = [...document.querySelectorAll(".dock-band button, .dock-band input")]
            .filter((e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"))
            .map((e) => { const b = e.getBoundingClientRect(); return { n: e.getAttribute("aria-label") || e.tagName, l: Math.round(b.left), r: Math.round(b.right) }; });
        return { dock: dock && [Math.round(dock.left), Math.round(dock.right)], ctl, vw: innerWidth };
    });
    const out1 = r.ctl.filter((c) => c.r > r.vw || c.l < 0 || (r.dock && (c.r > r.dock[1] + 1 || c.l < r.dock[0] - 1)));
    arm("E V-17/251 layer fits 390 and its dock", out1.length === 0 && r.ctl.some((c) => c.n === "Cancel"), `dock=${JSON.stringify(r.dock)} outside=${JSON.stringify(out1)} ctl=${r.ctl.map((c) => `${c.n}@${c.l}-${c.r}`).join(",")}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
