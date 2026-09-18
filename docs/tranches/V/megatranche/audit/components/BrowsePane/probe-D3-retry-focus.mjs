// CHALLENGE-D · PASS 2 · probe D3 — verify/kill the pass-1 BLOCKER + focus.
//   N · the Retry path: does one click permanently blank the pane body?
//       (pass-1 D-01 claimed it does. Two engines, clean page, 6 s tail.)
//   O · the focus indicator on the wall's vote chip (Tab-focused screenshot)
//   P · WebKit's Tab walk over the populated wall (MT-F022 two-engine law)
// Run: node docs/…/BrowsePane/probe-D3-retry-focus.mjs chromium|webkit
import { chromium, webkit } from "@playwright/test";

const ENGINE = process.argv[2] ?? "chromium";
const LAUNCH = ENGINE === "webkit" ? webkit : chromium;
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane/evidence";
const LOOPBACK = "http://localhost:9000";
const LAN = "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const mk = (n) => ({
    name: `Wall Palette ${n}`, slug: `wall-palette-${n}`, userSlug: "gallery",
    colors: [{ css: "#1a1512", position: 0 }, { css: "#2f2a24", position: 1 }, { css: "#e11d48", position: 2 }, { css: "#2563eb", position: 3 }],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }], createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z", isLocal: false, voteCount: n,
    visibility: "public", tier: n === 1 ? "featured" : "standard", published: true, tags: ["warm"],
});
const PAGE1 = Array.from({ length: 10 }, (_, i) => mk(i + 1));

const out = {};
const browser = await LAUNCH.launch(
    ENGINE === "chromium"
        ? { channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }
        : {},
);

// ─────────────────────────────────────────────────── N · the Retry blank test
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${LOOPBACK}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    out["retry-before"] = await page.evaluate(() => {
        const b = document.querySelector(".grid.gap-3.pb-3");
        return { children: b ? b.children.length : -1, h: b ? +b.getBoundingClientRect().height.toFixed(1) : -1, text: b?.innerText.replace(/\s+/g, " ").slice(0, 70) };
    });
    out["retry-samples"] = await page.evaluate(async () => {
        const b = document.querySelector(".grid.gap-3.pb-3");
        const s = [];
        const t0 = performance.now();
        [...document.querySelectorAll("main button")].find((x) => x.textContent.trim() === "Retry")?.click();
        return await new Promise((res) => {
            const id = setInterval(() => {
                const bb = document.querySelector(".grid.gap-3.pb-3");
                s.push({
                    t: Math.round(performance.now() - t0),
                    n: bb ? bb.children.length : -1,
                    h: bb ? +bb.getBoundingClientRect().height.toFixed(1) : -1,
                    txt: (bb?.innerText ?? "").replace(/\s+/g, " ").slice(0, 46),
                });
                if (performance.now() - t0 > 6000) { clearInterval(id); res(s); }
            }, 60);
        });
    });
    out["retry-after6s"] = await page.evaluate(() => {
        const b = document.querySelector(".grid.gap-3.pb-3");
        return { children: b ? b.children.length : -1, h: b ? +b.getBoundingClientRect().height.toFixed(1) : -1, paneText: document.querySelector("main")?.innerText.replace(/\s+/g, " ").slice(0, 140) };
    });
    await page.screenshot({ path: `${D}/D3-${ENGINE}-after-retry.png` });
    await ctx.close();
}

// ───────────────────────────────────── O + P · focus + WebKit keyboard truth
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await ctx.route(`${API}/**`, (r) => {
        const u = new URL(r.request().url());
        const json = (b) => r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body: JSON.stringify(b) });
        if (r.request().method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
        if (u.pathname.endsWith("/palettes")) return json({ data: PAGE1, nextCursor: "c2", hasMore: true });
        if (u.pathname.includes("/tags")) return json([{ name: "warm", count: 3 }]);
        return json({});
    });
    const page = await ctx.newPage();
    await page.goto(`${LAN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(4000);

    const walk = [];
    for (let i = 0; i < 22; i++) {
        await page.keyboard.press("Tab");
        walk.push(await page.evaluate(() => {
            const a = document.activeElement;
            if (!a || a === document.body) return { tag: "BODY" };
            const cs = getComputedStyle(a);
            return {
                tag: a.tagName, role: a.getAttribute("role"),
                name: (a.getAttribute("aria-label") ?? a.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 28),
                inCard: !!a.closest("[role='article']"),
                isCardRoot: a.getAttribute("role") === "article",
                outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
                shadow: cs.boxShadow.slice(0, 70),
            };
        }));
    }
    out[`tabwalk-${ENGINE}`] = walk;
    out[`cardRootFocusable-${ENGINE}`] = await page.evaluate(() => {
        const c = document.querySelector("[role='article']");
        c.focus();
        return { becameActive: document.activeElement === c, hasTabindexAttr: c.hasAttribute("tabindex") };
    });

    // screenshot the first card with its vote chip Tab-focused
    await page.evaluate(() => document.querySelector("main input")?.focus());
    await page.keyboard.press("Tab"); // filters
    await page.keyboard.press("Tab"); // vote chip of card 1
    const focusInfo = await page.evaluate(() => {
        const a = document.activeElement;
        const c = a.closest("[role='article']");
        return { name: a.getAttribute("aria-label"), rect: c ? (({ x, y, width, height }) => ({ x, y, width, height }))(c.getBoundingClientRect()) : null };
    });
    out["focused-chip"] = focusInfo;
    if (focusInfo.rect)
        await page.screenshot({ path: `${D}/D3-${ENGINE}-vote-chip-focused.png`, clip: { x: focusInfo.rect.x - 8, y: focusInfo.rect.y - 8, width: focusInfo.rect.width + 16, height: focusInfo.rect.height + 16 } });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 1));
