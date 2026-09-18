// PaletteCardMenu — CHALLENGE-C pass 3, probe B
// Decides:
//  B1  is the "K-INV5 small-caps register" actually rendering small caps?
//      Measured on the REAL annotation span of a real owned-remote menu item
//      (LAN host + stubbed browse feed, the pass-2 technique), plus a synthetic
//      control pair that isolates `text-transform: uppercase` as the cause.
//  B2  duplicate accessible-name census with the menu CLOSED (the open-menu
//      aria-hidden shroud hides the other triggers from the AX tree)
//  B3  the annotation's contribution to the item's visible text and AX name
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const HOST = process.env.PROBE_HOST || "http://192.168.1.166:9000";
const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const mk = (slug, name, visibility) => ({
    name, slug, userSlug: "probeuser",
    colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    createdAt: NOW, updatedAt: NOW, visibility,
    published: visibility === "public", tier: "standard", voteCount: 0, versionCount: 3,
});
const FEED = {
    data: [mk("pub-one", "PUBLIC palette", "public"), mk("prv-one", "PRIVATE palette", "private")],
    nextCursor: null, hasMore: false,
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await ctx.addInitScript(() => {
    localStorage.setItem("palette-user-slug", "probeuser");
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
});
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
await page.route("**://api.color.babb.dev/**", async (route) => {
    const url = route.request().url();
    if (url.includes("/palettes?") || /\/palettes$/.test(url.split("?")[0])) {
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(FEED) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
});

await page.goto(`${HOST}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

// ── B2 : duplicate accessible names, menu CLOSED ─────────────────────────────
log("B2_browse_duplicateNames", await page.evaluate(() => {
    const names = {};
    for (const b of document.querySelectorAll('button, [role="button"]')) {
        const n = b.getAttribute("aria-label") || (b.textContent || "").trim().replace(/\s+/g, " ");
        if (!n) continue;
        names[n] = (names[n] || 0) + 1;
    }
    return { cards: document.querySelectorAll('[role="article"]').length,
             dupes: Object.entries(names).filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, 10) };
}));

// ── B1/B3 : the REAL annotation span ─────────────────────────────────────────
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(600);

log("B1_realAnnotation", await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('[role="menuitem"]'));
    const item = items.find((e) => /Make private|^Publish/.test((e.textContent || "").trim()));
    if (!item) return { error: "no visibility item", items: items.map((e) => (e.textContent || "").trim()) };
    const span = item.querySelector("span[style]");
    if (!span) return { error: "no annotation span", itemHTML: item.innerHTML.slice(0, 400) };
    const cs = getComputedStyle(span);
    const r = span.getBoundingClientRect();
    // decisive: clone the span, neutralise ONLY font-variant, re-measure width
    const clone = span.cloneNode(true);
    clone.style.fontVariant = "normal";
    clone.style.fontVariantCaps = "normal";
    span.parentElement.appendChild(clone);
    const rc = clone.getBoundingClientRect();
    // second clone: neutralise text-transform too, keep small-caps
    const clone2 = span.cloneNode(true);
    clone2.style.textTransform = "none";
    span.parentElement.appendChild(clone2);
    const rc2 = clone2.getBoundingClientRect();
    // third: text-transform none AND font-variant normal
    const clone3 = span.cloneNode(true);
    clone3.style.textTransform = "none";
    clone3.style.fontVariant = "normal";
    clone3.style.fontVariantCaps = "normal";
    span.parentElement.appendChild(clone3);
    const rc3 = clone3.getBoundingClientRect();
    const out = {
        itemText: (item.textContent || "").trim().replace(/\s+/g, " "),
        annotationTextContent: span.textContent,
        inlineStyle: span.getAttribute("style"),
        className: span.className,
        computed: {
            textTransform: cs.textTransform,
            fontVariant: cs.fontVariant,
            fontVariantCaps: cs.fontVariantCaps,
            fontFeatureSettings: cs.fontFeatureSettings,
            fontSize: cs.fontSize,
            letterSpacing: cs.letterSpacing,
        },
        widths: {
            asShipped_smallCapsPlusUppercase: +r.width.toFixed(3),
            smallCapsRemoved_uppercaseKept: +rc.width.toFixed(3),
            uppercaseRemoved_smallCapsKept: +rc2.width.toFixed(3),
            bothRemoved: +rc3.width.toFixed(3),
        },
    };
    clone.remove(); clone2.remove(); clone3.remove();
    out.smallCapsIsInert = out.widths.asShipped_smallCapsPlusUppercase === out.widths.smallCapsRemoved_uppercaseKept;
    out.smallCapsWouldMatterWithoutUppercase =
        out.widths.uppercaseRemoved_smallCapsKept !== out.widths.bothRemoved;
    return out;
}));

log("B3_itemsWithAnnotation", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((el) => ({
        text: (el.textContent || "").trim().replace(/\s+/g, " "),
        annotationSpans: el.querySelectorAll("span[style]").length,
        ariaLabel: el.getAttribute("aria-label"),
        ariaDisabled: el.getAttribute("aria-disabled"),
    }))));

// AX names on this menu (the annotation folds in — pass-2 C2-9 re-check)
{
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Accessibility.enable");
    const t = await cdp.send("Accessibility.getFullAXTree");
    log("B3_axMenuItems", t.nodes.filter((n) => n.role?.value === "menuitem")
        .map((n) => n.name?.value));
}
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── B1 control : synthetic pair, isolating text-transform ────────────────────
log("B1_syntheticControl", await page.evaluate(() => {
    const make = (cls, style) => {
        const el = document.createElement("span");
        el.className = cls; el.setAttribute("style", style); el.textContent = "offline";
        document.body.appendChild(el);
        const w = +el.getBoundingClientRect().width.toFixed(3);
        const cs = getComputedStyle(el);
        el.remove();
        return { cls, style, w, textTransform: cs.textTransform, fontVariantCaps: cs.fontVariantCaps };
    };
    const shipped = "ml-auto fira-code text-mono-caption opacity-55 tracking-wide";
    return {
        withUppercaseUtility: [
            make(shipped, "font-variant: small-caps"),
            make(shipped, ""),
        ],
        withoutUppercaseUtility: [
            make("ml-auto fira-code opacity-55 tracking-wide", "font-variant: small-caps"),
            make("ml-auto fira-code opacity-55 tracking-wide", ""),
        ],
    };
}));

log("errs", errs);
writeFileSync(new URL("./pcm-p3-b-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
