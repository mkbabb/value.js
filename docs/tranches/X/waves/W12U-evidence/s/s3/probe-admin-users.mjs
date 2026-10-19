// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · /admin/users falsifier (:9000), one arm per row:
//   628  a network-dead roster read: the plate's detail never says "working locally" (the roster has no local mode)
//   622  confirms name the object as the list shows it and quantify it: the bulk delete says how many palettes,
//        the palette delete says its display name (not its slug), no "and all associated data"; Prune wears Eraser
//   629  READING (HELD → A2-VA-L1-6 .k): a destructive confirm's Cancel ink chroma
//   413  the slug's kept tail is its last hyphen segment, never a mid-word fragment
//   625  one gap rung between the toolbar and the list (the empty live region takes no gap)
// Usage: node probe-admin-users.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = [];
const open = async (extra) => {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, admin: true });
    if (extra) await extra(ctx);
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/admin/users", { timeout: 90000 });
    await p.waitForTimeout(3000);
    return [ctx, p];
};
const dialogText = (p) => p.evaluate(() => { const d = document.querySelector('[role="dialog"]'); return d ? d.innerText.replace(/\s+/g, " ").trim() : null; });
const closeDialog = async (p) => { await p.getByRole("button", { name: "Cancel" }).click(); await p.waitForTimeout(500); };
{ // 628
    const [ctx, p] = await open((c) => c.route(/\/admin\/users/, (r) => r.request().resourceType() === "fetch" ? r.abort("internetdisconnected") : r.continue()));
    const t = await p.evaluate(() => { const e = document.querySelector('[role="alert"]'); return e ? e.innerText.replace(/\s+/g, " ").trim() : null; });
    out.push(`${t && !/working locally/i.test(t) ? "PASS" : "RED "} 628 ${JSON.stringify(t)}`);
    await ctx.close();
}
{ // 413: slugs whose 6-char tail falls mid-word (the row's own examples)
    const SLUGS = ["eager-mapping-ember-sparrow", "verdant-tidal-moss-owl", "user-1-fox", "plainslug"];
    const [ctx, p] = await open((c) => c.route(/\/admin\/users\?/, (r) => r.fulfill({ status: 200, contentType: "application/json",
        body: JSON.stringify({ data: SLUGS.map((slug) => ({ slug, createdAt: "2026-07-05T00:00:00.000Z", lastSeenAt: "2026-07-05T00:00:00.000Z", status: "active", paletteCount: 1 })), total: SLUGS.length, limit: 50, offset: 0 }) })));
    const r = await p.evaluate(() => [...document.querySelectorAll(".slug-pill[title]")].map((e) => ({ slug: e.title, tail: e.lastElementChild?.textContent ?? "" })));
    const bad = r.filter(({ slug, tail }) => tail !== "" && !(tail.startsWith("-") && slug.endsWith(tail)));
    out.push(`${r.length === SLUGS.length && bad.length === 0 ? "PASS" : "RED "} 413 ${JSON.stringify(r.map((x) => x.tail))}`);
    await ctx.close();
}
{
    const [ctx, p] = await open();
    // 625 at rest
    const r = await p.evaluate(() => {
        const pills = [...document.querySelectorAll(".slug-pill[title]")].map((e) => ({ slug: e.title, tail: e.lastElementChild?.textContent ?? "" }));
        const bad = pills.filter(({ slug, tail }) => tail !== "" && !(tail.startsWith("-") && slug.endsWith(tail)));
        const bar = [...document.querySelectorAll("button")].find((x) => /Prune empty/.test(x.innerText))?.closest("div.flex");
        const next = bar && [...bar.parentElement.children].slice([...bar.parentElement.children].indexOf(bar) + 1).find((e) => e.getBoundingClientRect().height > 0);
        return { pills: pills.length, bad: bad.slice(0, 3), gap: bar && next ? Math.round(next.getBoundingClientRect().top - bar.getBoundingClientRect().bottom) : null };
    });
    out.push(`${r.gap !== null && r.gap <= 13 ? "PASS" : "RED "} 625 gap=${r.gap}`);
    // 622 bulk + 629
    await p.getByRole("button", { name: "Delete all palettes of user-1-fox", exact: true }).click();
    await p.waitForTimeout(700);
    const bulk = await dialogText(p);
    const ink = await p.evaluate(() => getComputedStyle([...document.querySelectorAll('[role="dialog"] button')].find((x) => x.innerText.trim() === "Cancel")).color);
    // chroma of the Cancel ink: oklch C directly; an rgb ink by channel spread (0..255 → 0..~0.3)
    const n = ink.match(/[\d.]+/g).map(Number);
    const chroma = /^oklch/.test(ink) ? n[1] : /^(ok)?lab/.test(ink) ? Math.hypot(n[1], n[2]) / (/^oklab/.test(ink) ? 1 : 300) : (Math.max(n[0], n[1], n[2]) - Math.min(n[0], n[1], n[2])) / 850;
    out.push(`${bulk && /\b1 palette\b/.test(bulk) && !/associated data/.test(bulk) ? "PASS" : "RED "} 622-bulk ${JSON.stringify(bulk)}`);
    // 629 is a READING, not a gate of this probe: the Cancel ink is glass's `text` emphasis in the
    // six-copy confirm recipe, cured once with A2-VA-L1-6 (.k) — reported HELD while it stays accent.
    out.push(`${chroma < 0.04 ? "PASS" : "HELD"} 629 cancel=${JSON.stringify(ink)} chroma=${chroma.toFixed(3)} (→ A2-VA-L1-6 .k)`);
    await closeDialog(p);
    // 622 prune icon
    await p.getByRole("button", { name: /Prune empty/ }).click();
    await p.waitForTimeout(700);
    const eraser = await p.evaluate(() => [...document.querySelectorAll('[role="dialog"] button')].find((x) => /Prune/.test(x.innerText))?.querySelector("svg")?.getAttribute("class") ?? "");
    out.push(`${/eraser/.test(eraser) ? "PASS" : "RED "} 622-prune ${JSON.stringify(eraser)}`);
    await closeDialog(p);
    // 622 palette delete names the palette
    await p.locator('[role="button"][aria-expanded]').filter({ hasText: "user-1-fox" }).first().click({ position: { x: 12, y: 12 } });
    await p.waitForTimeout(1200);
    await p.getByRole("button", { name: "Delete palette User One", exact: true }).click();
    await p.waitForTimeout(700);
    const one = await dialogText(p);
    out.push(`${one && /User One/.test(one) && !/\bu-1\b/.test(one) && !/associated data/.test(one) ? "PASS" : "RED "} 622-palette ${JSON.stringify(one)}`);
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
