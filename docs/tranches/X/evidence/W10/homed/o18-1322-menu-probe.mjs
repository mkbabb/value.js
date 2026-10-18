// SERVED MODEL: claude-opus-5-5
// X.W10.h · O18-1322 (N-3) diagnosis — which element does the census selector
// `[role="menu"] [role="menuitem"]:nth-of-type(n)` resolve to once the Profile
// menu is open, and what is that element's opacity chain? Read-only.
// One headless-shell browser, one context, both closed in finally.
//   node o18-1322-menu-probe.mjs <origin>
import { chromium } from "@playwright/test";
const origin = process.argv[2] ?? "http://localhost:9041";
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    try {
        const page = await ctx.newPage();
        // the userTest fixture's seed (e2e/smoke/fixtures/user-auth.ts): a present slug renders ProfileSection
        await page.addInitScript(() => {
            localStorage.setItem("palette-user-slug", "test-user");
            localStorage.setItem("palette-user-token", "test-user-token");
            sessionStorage.setItem("palette-session-token", "test-user-token");
        });
        await page.goto(origin + "/#/?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"));
        await page.waitForTimeout(3000);
        const pill = page.locator(".glass-dock.collapsed");
        if (await pill.count()) { await pill.click(); await page.waitForTimeout(1500); }
        await page.getByRole("button", { name: "Profile" }).click();
        await page.waitForTimeout(1500);
        const report = await page.evaluate(() => {
            const chainOpacity = (el) => { let o = 1; for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity); return +o.toFixed(3); };
            const desc = (el) => el ? `${el.tagName.toLowerCase()}[role=${el.getAttribute("role")}] "${(el.textContent ?? "").trim().slice(0, 24)}"` : null;
            const menus = [...document.querySelectorAll('[role="menu"]')].map((m) => {
                const r = m.getBoundingClientRect();
                return { menu: desc(m), rect: [r.x, r.y, r.width, r.height].map(Math.round), opacity: chainOpacity(m),
                    items: [...m.querySelectorAll('[role="menuitem"]')].map((it) => ({ item: desc(it), opacity: chainOpacity(it), siblingsTags: [...it.parentElement.children].map((c) => c.tagName.toLowerCase()).join(",") })) };
            });
            const picks = [1, 2, 3, 4, 5].map((n) => {
                const el = document.querySelector(`[role="menu"] [role="menuitem"]:nth-of-type(${n})`);
                return { n, resolves: desc(el), opacity: el ? chainOpacity(el) : null, inMenu: el ? desc(el.closest('[role="menu"]')) : null };
            });
            return { menus, picks };
        });
        console.log(JSON.stringify(report, null, 1));
    } finally { await ctx.close(); }
} finally { await browser.close(); }
