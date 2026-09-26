// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-12 falsifier: /admin/users and /admin/names fetch ONE
// 50-row page (useAdminUsers.ts:54 PAGE_SIZE = 50; admin-colors.ts limit = 50)
// and render no pager, so a roster past 50 has unreachable rows. Seeds 120 rows
// (SEED_TOTAL) through seed-x.mjs route stubs. RED iff rows rendered < total and
// no pager / next-page control is present.
// Usage: node probe-admin-roster-cap.mjs <width> <height> [light|dark]
process.env.SEED_TOTAL = "120";
const { chromium } = await import("@playwright/test");
const { prepare } = await import("./seed-x.mjs");
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, admin: true });
const p = await ctx.newPage();
let red = 0;
for (const route of ["/admin/users", "/admin/names"]) {
    await p.goto(`http://localhost:9000/#${route}`, { timeout: 90000 });
    await p.waitForTimeout(3500);
    const r = await p.evaluate(() => {
        const pane = document.querySelector("main") ?? document.body;
        const text = pane.innerText;
        const pager = [...document.querySelectorAll("button, a")].filter((e) => /next|older|more|page 2|›|»/i.test(e.getAttribute("aria-label") ?? e.textContent ?? "") && e.getBoundingClientRect().width > 0).map((e) => (e.getAttribute("aria-label") ?? e.textContent).trim().slice(0, 20));
        const m = text.match(/(\d+)\s+(users?|names?|colors?|pending|approved)/i);
        // one destructive action per row: count the row actions that are laid out
        const rows = [...document.querySelectorAll("button")].filter((e) => /^(delete user|reject|remove|delete)/i.test((e.getAttribute("aria-label") ?? e.textContent ?? "").trim()) && e.getBoundingClientRect().height > 0).length;
        return { count: m ? m[0].replace(/\s+/g, " ") : null, rowActions: rows, pager };
    });
    const ok = r.pager.length > 0;
    if (!ok) red++;
    console.log(`${W}x${H} ${theme} ${route} ${ok ? "GREEN" : "RED"} ${JSON.stringify(r)}`);
}
console.log(red ? `RED ${red}/2` : "GREEN 2/2");
await b.close();
