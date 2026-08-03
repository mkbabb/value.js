// CHALLENGE-D · TagEditPopover — probe 6: full design measurement inside the
// surface's real (off-screen) lifetime, plus a SYNTHETIC re-seat used ONLY to
// produce a human-viewable frame. Two instrumentations are applied in-page and
// are declared in the report:
//   (A) preventDefault() on reka's `dismissableLayer.focusOutside` so the
//       surface survives past its measured 363 ms natural life;
//   (B) the popper wrapper's inline `transform` is overwritten so the panel is
//       inside the viewport for the screenshot.
// Neither changes any repo file. All BLOCKER numbers come from probe 4/5, which
// applied NO instrumentation.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const BASE = `http://${process.env.LAN_IP}:9000`;
const API = "http://localhost:3000";

const TAGS_FULL = [
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

function mkStub(tags, delayTags = 0) {
    return async (route) => {
        const u = new URL(route.request().url());
        const m = route.request().method();
        const json = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", headers: { "access-control-allow-origin": "*", "access-control-allow-credentials": "true", etag: '"srv-1"' }, body: JSON.stringify(b) });
        if (m === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "access-control-allow-credentials": "true" } });
        if (u.pathname === "/colors/tags") {
            if (delayTags) await new Promise((r) => setTimeout(r, delayTags));
            return json(tags);
        }
        if (u.pathname === "/palettes" && m === "GET") return json({ data: PALETTES, nextCursor: null, hasMore: false });
        if (u.pathname.startsWith("/palettes/") && m === "PATCH") return json({ ...PALETTES[0], tags: JSON.parse(route.request().postData() || "{}").tags });
        return json({ data: [], hasMore: false, nextCursor: null });
    };
}

const ARM = () => {
    // (A) keep the surface alive past its natural 363 ms
    document.addEventListener("dismissableLayer.focusOutside", (e) => e.preventDefault(), true);
    document.addEventListener("dismissableLayer.pointerDownOutside", (e) => e.preventDefault(), true);
    // (B) re-seat it for the camera, and mark that we did
    window.__reseated = false;
    const obs = new MutationObserver(() => {
        for (const w of document.querySelectorAll("[data-reka-popper-content-wrapper]")) {
            if (w.querySelector(".section-label") && w.style.transform.includes("-200%")) {
                w.style.transform = "translate(420px, 180px)";
                window.__reseated = true;
            }
        }
    });
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
};

const MEASURE = () => {
    const wrap = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => e.querySelector(".section-label") || e.querySelector("p,div"));
    if (!wrap) return { found: false };
    const panel = wrap.querySelector(".popover-content") || wrap.firstElementChild;
    const rect = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const pcs = getComputedStyle(panel);
    const out = {
        found: true,
        reseated: window.__reseated,
        wrapperTransform: getComputedStyle(wrap).transform,
        panel: {
            rect: rect(panel), cls: panel.className,
            role: panel.getAttribute("role"), ariaLabel: panel.getAttribute("aria-label"),
            ariaLabelledby: panel.getAttribute("aria-labelledby"),
            ariaDescribedby: panel.getAttribute("aria-describedby"),
            dataState: panel.getAttribute("data-state"),
            dataSurface: panel.getAttribute("data-surface"),
            bg: pcs.backgroundColor, backdrop: pcs.backdropFilter || pcs.webkitBackdropFilter,
            padding: pcs.padding, width: pcs.width, borderRadius: pcs.borderRadius,
            boxShadow: pcs.boxShadow.slice(0, 200),
            animation: pcs.animation, transition: pcs.transition.slice(0, 200),
        },
    };
    const heading = panel.querySelector(".section-label");
    if (heading) {
        const h = getComputedStyle(heading);
        out.heading = {
            tag: heading.tagName, text: heading.textContent.trim(), rect: rect(heading),
            fontFamily: h.fontFamily.split(",")[0], fontSize: h.fontSize, letterSpacing: h.letterSpacing,
            textTransform: h.textTransform, color: h.color, marginBottom: h.marginBottom,
        };
    }
    const empty = panel.querySelector(".italic");
    if (empty) out.empty = { text: empty.textContent.trim(), rect: rect(empty), fontSize: getComputedStyle(empty).fontSize, color: getComputedStyle(empty).color, fontStyle: getComputedStyle(empty).fontStyle };
    const spinner = panel.querySelector(".animate-spin");
    if (spinner) out.spinner = { rect: rect(spinner), animation: getComputedStyle(spinner).animation, cls: spinner.getAttribute("class") };

    const rows = [...panel.querySelectorAll("label")];
    out.rowCount = rows.length;
    out.rows = rows.map((l) => {
        const box = l.querySelector('[role="checkbox"], button, input');
        const spans = [...l.querySelectorAll("span")];
        const nameEl = l.querySelector("span.truncate");
        const catEl = spans[spans.length - 1];
        const g = (el) => (el ? getComputedStyle(el) : null);
        const lc = getComputedStyle(l);
        const bc = g(box), nc = g(nameEl), cc = g(catEl);
        return {
            rect: rect(l), padding: lc.padding, gap: lc.gap, minHeight: lc.minHeight,
            cursor: lc.cursor, transition: lc.transition.slice(0, 120),
            checkbox: box ? {
                tag: box.tagName, role: box.getAttribute("role"), type: box.getAttribute("type"),
                ariaChecked: box.getAttribute("aria-checked"), dataState: box.getAttribute("data-state"),
                disabled: box.disabled ?? null,
                rect: rect(box), w: bc.width, h: bc.height,
                accessibleName: box.getAttribute("aria-label") || box.getAttribute("aria-labelledby") || (box.id ? "id:" + box.id : "(none)"),
                id: box.id || null, tabIndex: box.tabIndex,
            } : null,
            name: nameEl ? { text: nameEl.textContent.trim(), rect: rect(nameEl), fontSize: nc.fontSize, fontFamily: nc.fontFamily.split(",")[0], color: nc.color, overflow: nc.overflow, textOverflow: nc.textOverflow, minWidth: nc.minWidth, flex: nc.flex } : null,
            category: catEl && catEl !== nameEl ? { text: catEl.textContent.trim(), rect: rect(catEl), fontSize: cc.fontSize, fontFamily: cc.fontFamily.split(",")[0], textTransform: cc.textTransform, letterSpacing: cc.letterSpacing, color: cc.color } : null,
        };
    });
    const sc = panel.querySelector(".overflow-y-auto");
    if (sc) {
        const s = getComputedStyle(sc);
        out.scroller = { rect: rect(sc), maxHeight: s.maxHeight, scrollHeight: sc.scrollHeight, clientHeight: sc.clientHeight, overflowing: sc.scrollHeight > sc.clientHeight, hiddenRows: Math.max(0, Math.round((sc.scrollHeight - sc.clientHeight) / (out.rows[0]?.rect.h || 1))), maskImage: s.maskImage || s.webkitMaskImage, scrollbarWidth: s.scrollbarWidth, gap: s.gap };
    }
    out.labelFor = rows.map((l) => l.getAttribute("for"));
    out.groupSemantics = { fieldset: panel.querySelectorAll("fieldset").length, legend: panel.querySelectorAll("legend").length, headings: panel.querySelectorAll("h1,h2,h3,h4,h5,h6").length, roleGroup: panel.querySelectorAll('[role="group"]').length };
    out.focusVisibleRule = (() => {
        // is there any :focus-within / focus-visible styling on the row?
        const cls = rows[0]?.getAttribute("class") || "";
        return { rowClass: cls, hasHover: /hover:/.test(cls), hasFocusWithin: /focus-within:/.test(cls), hasFocusVisible: /focus-visible:/.test(cls) };
    })();
    return out;
};

async function session(label, { tags = TAGS_FULL, dark = false, viewport = { width: 1440, height: 900 }, dsf = 2, media = {}, delayTags = 0, screenshot = true, rtl = false, zoom = 1 } = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf, ...(rtl ? { locale: "ar-EG" } : {}) });
    await ctx.route(`${API}/**`, mkStub(tags, delayTags));
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem("palette-user-slug", "me-slug"));
    if (dark) await page.emulateMedia({ colorScheme: "dark", ...media });
    else if (Object.keys(media).length) await page.emulateMedia(media);
    if (rtl) await page.addInitScript(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    if (zoom !== 1) await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, zoom);
    await page.evaluate(ARM);
    const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
    await menu.click();
    await page.waitForTimeout(300);
    await page.getByRole("menuitem", { name: /Edit Tags/i }).first().click();
    await page.waitForTimeout(delayTags ? 60 : 900);
    const m = await page.evaluate(MEASURE);
    if (screenshot) await page.screenshot({ path: `${OUT}m-${label}.png` });
    // toggle attempt: does the glass-ui Checkbox honour :checked / @update:checked?
    let toggle = null;
    if (!delayTags && tags.length) {
        const patches = [];
        page.on("request", (r) => { if (r.method() === "PATCH") patches.push({ url: r.url(), body: r.postData(), ifMatch: r.headers()["if-match"] }); });
        const before = await page.evaluate(() => {
            const l = [...document.querySelectorAll("[data-reka-popper-content-wrapper] label")][1];
            const b = l?.querySelector('[role="checkbox"],button,input');
            return { row: l?.innerText.replace(/\s+/g, " ").trim(), aria: b?.getAttribute("aria-checked"), state: b?.getAttribute("data-state") };
        });
        await page.evaluate(() => {
            const l = [...document.querySelectorAll("[data-reka-popper-content-wrapper] label")][1];
            const b = l?.querySelector('[role="checkbox"],button,input');
            b?.click();
        });
        await page.waitForTimeout(900);
        const after = await page.evaluate(() => {
            const l = [...document.querySelectorAll("[data-reka-popper-content-wrapper] label")][1];
            const b = l?.querySelector('[role="checkbox"],button,input');
            return { aria: b?.getAttribute("aria-checked"), state: b?.getAttribute("data-state") };
        });
        toggle = { before, after, patches };
        if (screenshot) await page.screenshot({ path: `${OUT}m-${label}-after-toggle.png` });
    }
    await browser.close();
    return { label, m, toggle };
}

const out = {};
const safe = async (k, ...args) => {
    try { out[k] = await session(...args); }
    catch (e) { out[k] = { label: args[0], error: String(e).slice(0, 300) }; }
};
await safe("desktopLight", "desktop-light");
await safe("desktopDark", "desktop-dark", { dark: true });
await safe("mobile", "mobile", { viewport: { width: 390, height: 844 }, dsf: 3 });
await safe("emptyCatalog", "empty", { tags: [] });
await safe("loading", "loading", { delayTags: 4000 });
await safe("reducedMotion", "reduced-motion", { media: { reducedMotion: "reduce" } });
await safe("forcedColors", "forced-colors", { media: { forcedColors: "active" } });
await safe("zoom200", "zoom-200", { viewport: { width: 720, height: 450 } });
await safe("rtl", "rtl", { rtl: true });

fs.writeFileSync(`${OUT}probe-6.json`, JSON.stringify(out, null, 2));
console.log("wrote probe-6.json");
console.log(JSON.stringify({
    rows: out.desktopLight.m.rows?.map((r) => ({ name: r.name?.text, nameW: r.name?.rect.w, cat: r.category?.text, catW: r.category?.rect.w, cbW: r.checkbox?.rect.w, cbH: r.checkbox?.rect.h, aria: r.checkbox?.ariaChecked, rowH: r.rect.h, accName: r.checkbox?.accessibleName })),
    scroller: out.desktopLight.m.scroller,
    heading: out.desktopLight.m.heading,
    panel: out.desktopLight.m.panel,
    toggle: out.desktopLight.toggle,
    groups: out.desktopLight.m.groupSemantics,
    focus: out.desktopLight.m.focusVisibleRule,
    labelFor: out.desktopLight.m.labelFor,
}, null, 2));
