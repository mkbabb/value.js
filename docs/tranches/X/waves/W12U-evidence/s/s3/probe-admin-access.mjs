// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · UIA-V-169 falsifier (:9000). /admin/users with the server refusing the held token (401).
// GREEN iff the refused visitor is never stranded: EITHER the refusal ends the admin session and
// leaves the admin view (UIA-V-93's exit: URL off /admin, the dock out of gold admin mode), OR the
// plate offers one way forward and no dead control set stays on the card.
// Usage: node probe-admin-access.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, admin: true, refused: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/admin/users", { timeout: 90000 });
await p.waitForTimeout(3500);
const r = await p.evaluate(() => {
    const plate = document.querySelector("[data-admin-access]");
    const vis = (e) => !!e && e.getBoundingClientRect().height > 0;
    return {
        plate: plate ? plate.innerText.replace(/\s+/g, " ").trim().slice(0, 160) : null,
        plateButtons: plate ? [...plate.querySelectorAll("button")].filter(vis).map((x) => x.innerText.trim()) : [],
        search: vis(document.querySelector('input[aria-label="Search users"]')),
        prune: [...document.querySelectorAll("button")].some((x) => vis(x) && /Prune empty/.test(x.innerText)),
        refresh: [...document.querySelectorAll("button")].some((x) => vis(x) && /^Refresh$/.test(x.innerText.trim())),
        url: location.hash.split("?")[0],
        gold: !!document.querySelector(".gold-shimmer-icon"),
        token: localStorage.getItem("palette-admin-token"),
    };
});
const exited = !r.url.startsWith("#/admin") && !r.gold && r.token === null;
const plated = r.plate && r.plateButtons.length === 1 && !r.search && !r.prune && !r.refresh;
const ok = exited || plated;
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify(r)}`);
await b.close();
process.exit(ok ? 0 : 1);
