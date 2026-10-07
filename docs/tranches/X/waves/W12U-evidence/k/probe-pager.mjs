// SERVED MODEL: claude-opus-5-5
// X.W12U.k — A2-VA-X-12 falsifier, re-run after the cure. The .x falsifier
// (`../x/probe-admin-roster-cap.mjs`) is prior evidence and is not edited
// (E-3); this is the same reading with the base URL as an input, plus the
// act the row is about: press Next and read the second page.
// 120 rows are seeded (SEED_TOTAL) behind route stubs (`../x/seed-x.mjs`).
// GREEN iff, on /admin/users and on both /admin/names lists: a pager is
// rendered, it reads "Page 1 of 3", Next moves to "Page 2 of 3", and the rows
// on screen change.
// Usage: BASE=http://localhost:9131 node probe-pager.mjs [width] [height] [light|dark]
process.env.SEED_TOTAL = "120";
const { chromium } = await import("@playwright/test");
const { prepare } = await import("../x/seed-x.mjs");
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const BASE = process.env.BASE ?? "http://localhost:9000";
const phone = W < 900;
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, admin: true });
const p = await ctx.newPage();
const read = () => p.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const pageLine = [...main.querySelectorAll("[aria-live]")].map((e) => e.textContent.trim()).find((t) => /^Page \d+ of \d+$/.test(t)) ?? null;
    const first = (main.querySelector(".slug-pill, [data-slot='admin-list-item']") ?? main.querySelector("li, .rounded-md"))?.textContent.trim().replace(/\s+/g, " ").slice(0, 40) ?? null;
    return { pageLine, first, text: main.innerText.replace(/\s+/g, " ").slice(0, 120) };
});
const boot = async (route) => {
    await p.goto(`${BASE}/#${route}`, { waitUntil: "commit", timeout: 600000 });
    await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
};
let red = 0, n = 0;
const leg = async (label, before) => {
    // a lazy pane may miss its 20 s load bound on a loaded host: reload once
    for (let i = 0; i < 4 && !(await read()).pageLine; i++) {
        if (/could not be loaded/i.test((await read()).text)) await p.reload({ waitUntil: "commit", timeout: 600000 });
        await p.waitForTimeout(15000);
    }
    if (before) await before();
    const a = await read();
    let c = null;
    if (a.pageLine) {
        await p.getByRole("button", { name: "Next page" }).click({ timeout: 60000 });
        await p.waitForFunction((was) => [...document.querySelectorAll("main [aria-live]")].some((e) => /^Page \d+ of \d+$/.test(e.textContent.trim()) && e.textContent.trim() !== was), a.pageLine, { timeout: 60000 }).catch(() => {});
        await p.waitForTimeout(1500);
        c = await read();
    }
    const ok = a.pageLine === "Page 1 of 3" && c?.pageLine === "Page 2 of 3" && a.first !== c.first;
    n++; if (!ok) red++;
    console.log(`${W}x${H} ${theme} ${label} ${ok ? "GREEN" : "RED"} ${JSON.stringify({ before: a, after: c })}`);
};
await boot("/admin/users");
await leg("/admin/users");
await p.evaluate(() => { location.hash = "#/admin/names"; });
await p.waitForTimeout(8000);
await leg("/admin/names pending");
await leg("/admin/names approved", async () => {
    await p.getByRole("tab", { name: /approved/i }).click({ timeout: 60000 });
    await p.waitForTimeout(5000);
});
console.log(red ? `RED ${red}/${n}` : `GREEN ${n}/${n}`);
await b.close();
