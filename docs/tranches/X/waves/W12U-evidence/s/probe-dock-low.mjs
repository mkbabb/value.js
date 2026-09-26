// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · LOW-row falsifiers on the served dock (:9000, 1440x900 unless noted).
//  V-505  the colour field carries spellcheck=false, autocapitalize=off, autocorrect=off.
//  V-508  Enter commits and DROPS the pending debounced parse: type "#111111", Enter, then move
//         the colour by address (#222222) inside the 2 s window; 2.6 s later the colour is still
//         #222222 (the stale debounce used to re-apply #111111).
//  V-509  ColorInput declares/injects no dead editTarget / cssColorOpaque / canProposeName (source).
//  V-502  on a view with no action bar (/browse) the "Toggle action bar" control is inert.
//  V-488/493  admin view list: Users, Names and Tags wear three distinct glyphs, none the Shield.
// Usage: node probe-dock-low.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const out = [];
const arm = (n, ok, d) => out.push(`${ok ? "PASS" : "RED "} ${n} ${d}`);
const src = readFileSync(new URL("../../../../../../demo/shell/dock/ColorInput.vue", import.meta.url), "utf8");
const dead = (src.match(/\beditTarget\b|\bcssColorOpaque\b|\bcanProposeName\b/g) ?? []).length;
arm("V-509 no dead prop/injections in ColorInput.vue", dead === 0, `hits=${dead}`);
const b = await chromium.launch({ headless: false });
const expand = async (p) => { const c = p.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await p.waitForTimeout(1200); } };
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme, user: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1500);
    await expand(p);
    await p.getByRole("button", { name: "Toggle action bar" }).first().click();
    await p.waitForTimeout(900);
    await p.getByRole("button", { name: "Open color input" }).first().click();
    await p.waitForTimeout(800);
    const f = p.getByRole("textbox", { name: "Enter a CSS color" }).first();
    const attrs = await f.evaluate((e) => [e.getAttribute("spellcheck"), e.getAttribute("autocapitalize"), e.getAttribute("autocorrect")]);
    arm("V-505 CSS-literal field opts out of text correction", attrs.join() === "false,off,off", JSON.stringify(attrs));
    await f.click();
    await p.keyboard.press("ControlOrMeta+a");
    await p.keyboard.type("#111111");
    await p.keyboard.press("Enter");
    await p.waitForTimeout(300);
    await p.evaluate(() => { location.hash = "#/?space=hex&color=%23222222"; });
    await p.waitForTimeout(2600);
    const q = await p.evaluate(() => decodeURIComponent(location.hash));
    arm("V-508 Enter drops the pending debounced parse", /222222/.test(q), `address after 2.6 s: ${q}`);
    await ctx.close();
}
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1800);
    await expand(p);
    const r = await p.evaluate(() => [...document.querySelectorAll('button[aria-label="Toggle action bar"]')].map((e) => !!e.closest("[inert]")));
    arm("V-502 hidden Tools trigger is inert", r.length > 0 && r.every(Boolean), JSON.stringify(r));
    await ctx.close();
}
{
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, isMobile: true, hasTouch: true });
    await prepare(ctx, { theme, admin: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/admin/users", { timeout: 90000 });
    const t = p.getByRole("combobox", { name: /Select view/ }).first();
    await t.waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
    await t.click();
    await p.waitForTimeout(800);
    const g = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll("[role=option]")].map((o) => [o.innerText.trim(), [...(o.querySelector("svg.lucide")?.classList ?? [])].find((c) => c.startsWith("lucide-") && c !== "lucide-icon") ?? "?"])));
    const u = g["Users"], n = g["Names"], tg = g["Tags"];
    arm("V-488/493 distinct admin glyphs", u && n && tg && new Set([u, n, tg]).size === 3 && ![u, n, tg].some((c) => /shield/.test(c)), JSON.stringify({ u, n, tg }));
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
