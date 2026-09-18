// CHALLENGE-D probe D6 — focus-ring truth on the component's own controls.
import { webkit } from "playwright";

const ORIGIN = "http://192.168.1.166:9000";
const now = new Date().toISOString();
const P = {
    data: [{
        name: "Deep Ocean", slug: "deep-ocean", userSlug: "mbabb",
        colors: ["#12314f", "#173d5c", "#3a8296"].map((css, position) => ({ css, position })),
        createdAt: now, updatedAt: now, isLocal: false,
        visibility: "public", tier: "standard", published: true, voteCount: 3,
    }],
    nextCursor: null, hasMore: false,
};

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.route("**://localhost:3000/**", (r) => {
    const u = r.request().url();
    if (u.includes("/palettes?")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(P) });
    return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
});
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
await page.waitForTimeout(3200);
await page.evaluate(() => document.querySelector('[role="article"]').click());
await page.waitForTimeout(900);

const out = {};

out.tokens = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
        ring: cs.getPropertyValue("--ring").trim(),
        colorRing: cs.getPropertyValue("--color-ring").trim(),
        focusInner: cs.getPropertyValue("--focus-ring-inner").trim(),
        focusOuter: cs.getPropertyValue("--focus-ring-outer").trim(),
        spacing4: cs.getPropertyValue("--spacing").trim(),
    };
});

// tab to the copy-slug button and read the painted ring
out.focusRing = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label^="Copy slug"]');
    if (!b) return null;
    b.focus();
    const cs = getComputedStyle(b);
    const r = b.getBoundingClientRect();
    return {
        matchesFocusVisible: b.matches(":focus-visible"),
        boxShadow: cs.boxShadow,
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        rect: `${r.width}x${r.height}`,
        // the canonical U-F25 recipe for comparison
        canonical: "0 0 0 1px var(--focus-ring-inner), 0 0 0 3px var(--focus-ring-outer), var(--shadow-sm)",
    };
});

// real keyboard tab (focus-visible needs keyboard modality)
await page.keyboard.press("Tab");
out.kbd = [];
for (let i = 0; i < 14; i++) {
    const cur = await page.evaluate(() => {
        const a = document.activeElement;
        if (!a) return null;
        const art = a.closest('[role="article"]');
        const cs = getComputedStyle(a);
        return {
            label: a.getAttribute("aria-label") || (a.textContent || "").trim().slice(0, 22) || a.tagName,
            inCard: !!art,
            focusVisible: a.matches(":focus-visible"),
            boxShadow: cs.boxShadow.slice(0, 90),
        };
    });
    out.kbd.push(cur);
    if (cur && cur.inCard && /Copy slug/.test(cur.label)) break;
    await page.keyboard.press("Tab");
}

await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-focus-copyslug.png", clip: { x: 300, y: 350, width: 700, height: 300 } });
console.log(JSON.stringify(out, null, 2));
await browser.close();
