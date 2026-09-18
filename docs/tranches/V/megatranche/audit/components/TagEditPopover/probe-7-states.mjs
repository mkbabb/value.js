// CHALLENGE-D · TagEditPopover — probe 7: accessible names, contrast, RTL,
// loading, keyboard focus, overflow clipping, padding arithmetic.
// Same two declared in-page instrumentations as probe 6 (dismiss-suppress +
// synthetic re-seat). READ-ONLY on the repo.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
const BASE = `http://${process.env.LAN_IP}:9000`;
const API = "http://localhost:3000";

const TAGS = [
    { id: "t1", name: "pastel", category: "mood" },
    { id: "t2", name: "warm", category: "temperature" },
    { id: "t3", name: "muted-earthen-autumnal", category: "mood" },
    { id: "t4", name: "neon", category: "saturation" },
    { id: "t5", name: "monochrome", category: "structure" },
    { id: "t6", name: "duotone", category: "structure" },
    { id: "t7", name: "high-contrast", category: "accessibility" },
    { id: "t8", name: "brand", category: "usage" },
    { id: "t9", name: "vaporwave", category: "aesthetic" },
    { id: "t10", name: "sepia", category: "temperature" },
];
const COLORS = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"].map((c) => ({ color: c, name: null }));
const P = (i, owned) => ({
    name: `Specimen ${i}`, slug: `specimen-${i}`,
    userSlug: owned ? "me-slug" : "someone-else", colors: COLORS,
    tags: i === 1 ? ["warm"] : [],
    createdAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-02T00:00:00.000Z",
    isLocal: false, voteCount: 3, voted: false, visibility: "public",
    tier: "standard", published: true, versionCount: 1, currentHash: `hash-${i}`,
});
const PALETTES = [P(1, true), P(2, true), P(3, false)];

const ARM = () => {
    document.addEventListener("dismissableLayer.focusOutside", (e) => e.preventDefault(), true);
    document.addEventListener("dismissableLayer.pointerDownOutside", (e) => e.preventDefault(), true);
    const obs = new MutationObserver(() => {
        for (const w of document.querySelectorAll("[data-reka-popper-content-wrapper]")) {
            if (w.querySelector(".section-label") && w.style.transform.includes("-200%"))
                w.style.transform = "translate(420px, 180px)";
        }
    });
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
};

// WCAG relative luminance / contrast from rendered pixels
const CONTRAST = `(() => {
  const srgb = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  window.__cr = (a, b) => { const l1 = L(a), l2 = L(b); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return +((hi + 0.05) / (lo + 0.05)).toFixed(2); };
  window.__parse = (s) => { const m = s.match(/-?[\\d.]+/g).map(Number); return [m[0], m[1], m[2]]; };
})()`;

async function go(label, { dark = false, rtl = false, delayTags = 0, viewport = { width: 1440, height: 900 } } = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    await ctx.route(`${API}/**`, async (route) => {
        const u = new URL(route.request().url());
        const m = route.request().method();
        const json = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", headers: { "access-control-allow-origin": "*", "access-control-allow-credentials": "true", etag: '"srv-1"' }, body: JSON.stringify(b) });
        if (m === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "access-control-allow-credentials": "true" } });
        if (u.pathname === "/colors/tags") { if (delayTags) await new Promise((r) => setTimeout(r, delayTags)); return json(TAGS); }
        if (u.pathname === "/palettes" && m === "GET") return json({ data: PALETTES, nextCursor: null, hasMore: false });
        if (u.pathname.startsWith("/palettes/") && m === "PATCH") return json({ ...PALETTES[0] });
        return json({ data: [], hasMore: false, nextCursor: null });
    });
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem("palette-user-slug", "me-slug"));
    if (rtl) await page.addInitScript(() => {
        document.addEventListener("DOMContentLoaded", () => { document.documentElement.setAttribute("dir", "rtl"); });
        new MutationObserver(() => { if (document.documentElement.getAttribute("dir") !== "rtl") document.documentElement.setAttribute("dir", "rtl"); }).observe(document.documentElement, { attributes: true });
    });
    if (dark) await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.evaluate(ARM);
    await page.evaluate(CONTRAST);
    const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
    await menu.click();
    await page.waitForTimeout(300);
    await page.getByRole("menuitem", { name: /Edit Tags/i }).first().click();
    await page.waitForTimeout(delayTags ? 250 : 900);
    return { browser, page, ctx };
}

const out = {};

// ---- A. accessible names + roles via the real AX tree
{
    const { browser, page } = await go("ax");
    out.ariaSnapshot = await page.locator('[role="dialog"]').first().ariaSnapshot();
    out.checkboxAccNames = await page.evaluate(() => {
        const panel = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => e.querySelector(".section-label")).querySelector(".popover-content");
        return [...panel.querySelectorAll('[role="checkbox"]')].map((b) => ({
            ariaLabel: b.getAttribute("aria-label"),
            ariaLabelledby: b.getAttribute("aria-labelledby"),
            id: b.id || null,
            wrappedByLabel: !!b.closest("label"),
            labelHasFor: b.closest("label")?.getAttribute("for") ?? null,
            innerText: b.textContent.trim(),
            ariaChecked: b.getAttribute("aria-checked"),
        }));
    });
    out.roleCheckboxCount = await page.getByRole("checkbox").count();
    out.namedCheckboxProbe = await Promise.all(
        ["pastel", "warm", "neon", "high-contrast"].map(async (n) => ({ name: n, count: await page.getByRole("checkbox", { name: n }).count() }))
    );
    await browser.close();
}

// ---- B. contrast + padding arithmetic + overflow clipping (light)
{
    const { browser, page } = await go("light");
    out.light = await page.evaluate(() => {
        const wrap = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => e.querySelector(".section-label"));
        const panel = wrap.querySelector(".popover-content");
        const inner = panel.firstElementChild;
        const heading = panel.querySelector(".section-label");
        const rows = [...panel.querySelectorAll("label")];
        const px = (s) => parseFloat(s);
        const pcs = getComputedStyle(panel), ics = getComputedStyle(inner);
        // composite the translucent panel over its backdrop by sampling? use the
        // opaque-ish approximation: report the declared alpha explicitly.
        const bg = pcs.backgroundColor;
        const cr = (fg) => window.__cr(window.__parse(fg), window.__parse(getComputedStyle(document.body).backgroundColor));
        const longest = rows.map((l, i) => {
            const cat = [...l.querySelectorAll("span")].at(-1);
            const nm = l.querySelector("span.truncate");
            const cb = l.querySelector('[role="checkbox"]');
            const lr = l.getBoundingClientRect(), cr2 = cat.getBoundingClientRect();
            return { i, name: nm.textContent.trim(), nameW: +nm.getBoundingClientRect().width.toFixed(1), cat: cat.textContent.trim(), catW: +cr2.width.toFixed(1), catRight: +cr2.right.toFixed(1), rowRight: +lr.right.toFixed(1), overflowsRow: cr2.right > lr.right - px(getComputedStyle(l).paddingRight) + 0.5, cbW: +cb.getBoundingClientRect().width.toFixed(1) };
        });
        return {
            panelPadding: pcs.padding, panelWidth: pcs.width,
            innerPadding: ics.padding, innerWidth: getComputedStyle(inner).width,
            panelClassList: panel.className,
            p0Applied: panel.className.includes("p-0"),
            effectiveInlinePadEachSide: px(pcs.paddingLeft) + px(ics.paddingLeft),
            contentColumnWidth: +panel.querySelector(".overflow-y-auto").getBoundingClientRect().width.toFixed(1),
            headingColor: getComputedStyle(heading).color,
            headingFont: getComputedStyle(heading).fontFamily.split(",")[0],
            headingSize: getComputedStyle(heading).fontSize,
            headingTransform: getComputedStyle(heading).textTransform,
            headingTracking: getComputedStyle(heading).letterSpacing,
            catColor: getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).color,
            catFont: getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).fontFamily.split(",")[0],
            catSize: getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).fontSize,
            catTransform: getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).textTransform,
            catTracking: getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).letterSpacing,
            headingEqualsCategoryRegister:
                getComputedStyle(heading).fontFamily === getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).fontFamily &&
                getComputedStyle(heading).fontSize === getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).fontSize &&
                getComputedStyle(heading).textTransform === getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).textTransform &&
                getComputedStyle(heading).letterSpacing === getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).letterSpacing,
            headingColorEqualsCategoryColor: getComputedStyle(heading).color === getComputedStyle([...rows[0].querySelectorAll("span")].at(-1)).color,
            panelBg: bg,
            rows: longest,
            zeroNameRows: longest.filter((r) => r.nameW === 0).length,
            ellipsisOnlyRows: longest.filter((r) => r.nameW > 0 && r.nameW <= 10).length,
            catOverflowRows: longest.filter((r) => r.overflowsRow).length,
        };
    });
    // keyboard: tab into the panel, is there a visible row/focus register?
    out.keyboard = await page.evaluate(() => {
        const panel = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => e.querySelector(".section-label")).querySelector(".popover-content");
        const cb = panel.querySelector('[role="checkbox"]');
        cb.focus();
        const row = cb.closest("label");
        const rcs = getComputedStyle(row), ccs = getComputedStyle(cb);
        return {
            focusedTag: document.activeElement.tagName,
            focusedRole: document.activeElement.getAttribute("role"),
            rowBackground: rcs.backgroundColor,
            rowOutline: rcs.outline, rowBoxShadow: rcs.boxShadow.slice(0, 120),
            checkboxOutline: ccs.outline, checkboxBoxShadow: ccs.boxShadow.slice(0, 160),
            rowHasFocusStyle: rcs.outline !== "rgb(0, 0, 0) none 0px" || rcs.boxShadow !== "none",
        };
    });
    await page.screenshot({ path: `${OUT}s-keyboard-focus.png` });
    await browser.close();
}

// ---- C. loading state
{
    const { browser, page } = await go("loading", { delayTags: 5000 });
    out.loading = await page.evaluate(() => {
        const wrap = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => e.querySelector(".section-label"));
        if (!wrap) return { found: false, wrappers: document.querySelectorAll("[data-reka-popper-content-wrapper]").length };
        const panel = wrap.querySelector(".popover-content");
        const sp = panel.querySelector(".animate-spin");
        return {
            found: true, panelH: +panel.getBoundingClientRect().height.toFixed(1),
            text: panel.innerText.replace(/\s+/g, " ").trim(),
            spinner: sp ? { cls: sp.getAttribute("class"), animation: getComputedStyle(sp).animation, w: getComputedStyle(sp).width, h: getComputedStyle(sp).height, color: getComputedStyle(sp).color, ariaHidden: sp.getAttribute("aria-hidden"), role: sp.getAttribute("role") } : null,
            liveRegions: panel.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
            ariaBusy: panel.getAttribute("aria-busy"),
        };
    });
    await page.screenshot({ path: `${OUT}s-loading.png` });
    await browser.close();
}

// ---- D. reduced motion vs the spinner
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
    const page = await ctx.newPage();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(2000);
    out.reducedMotionSpin = await page.evaluate(() => {
        const d = document.createElement("div");
        d.className = "animate-spin";
        document.body.appendChild(d);
        const cs = getComputedStyle(d);
        const r = { animation: cs.animation, animationName: cs.animationName, animationDuration: cs.animationDuration, animationIterationCount: cs.animationIterationCount, matchesReduce: matchMedia("(prefers-reduced-motion: reduce)").matches };
        d.remove();
        return r;
    });
    await browser.close();
}

// ---- E. RTL
{
    const { browser, page } = await go("rtl", { rtl: true });
    out.rtl = await page.evaluate(() => {
        const wrap = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => e.querySelector(".section-label"));
        const panel = wrap.querySelector(".popover-content");
        const row = panel.querySelector("label");
        const nm = row.querySelector("span.truncate"), cat = [...row.querySelectorAll("span")].at(-1);
        const cb = row.querySelector('[role="checkbox"]');
        const cs = getComputedStyle(cat);
        return {
            docDir: document.documentElement.getAttribute("dir"),
            computedDir: getComputedStyle(document.documentElement).direction,
            panelDir: getComputedStyle(panel).direction,
            catMarginLeft: cs.marginLeft, catMarginRight: cs.marginRight,
            order: [cb, nm, cat].map((e) => +e.getBoundingClientRect().x.toFixed(1)),
            headingTextAlign: getComputedStyle(panel.querySelector(".section-label")).textAlign,
        };
    });
    await page.screenshot({ path: `${OUT}s-rtl.png` });
    await browser.close();
}

fs.writeFileSync(`${OUT}probe-7.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 9000));
