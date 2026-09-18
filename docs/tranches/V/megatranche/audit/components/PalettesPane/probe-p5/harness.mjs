// CHALLENGE-D pass 5 — PalettesPane live design probe.
// Read-only against http://localhost:9000. No source edits.
import { webkit, chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = "http://localhost:9000";
const ROUTE = `${BASE}/#/palettes`;

const HUES = [20, 55, 95, 140, 190, 240, 285, 320];
const mkColors = (n, tag) =>
    Array.from({ length: n }, (_, i) => ({
        css: `oklch(0.72 0.16 ${(i * 360) / n})`,
        name: `${tag}-${i}`,
        position: i,
    }));

// 100 scalars — the PALETTE-CONTRACT §3 displayName ceiling.
const LONG_NAME =
    "Autumnal Ridgeline Chromatic Study Number Seventeen Revised Extended Edition For Print And Screen X";

function seed(n) {
    const now = new Date().toISOString();
    const p = (id, name, colors) => ({
        id,
        name,
        slug: id,
        colors,
        createdAt: now,
        updatedAt: now,
        isLocal: true,
    });
    const list = [
        p("p-max", LONG_NAME, mkColors(1, "solo")), // 100-char name, 1 color
        p("p-fifty", "Fifty", mkColors(50, "c")), // contract ceiling
        p("p-uni", "🎨 Ünïcødé — عرض الألوان ✨", mkColors(5, "u")),
        p("p-one", "One", mkColors(1, "o")),
    ];
    for (let i = 0; i < n; i++) {
        list.push(
            p(
                `p-${i}`,
                ["Sunset Ridge", "Moss & Bone", "Harbor", "Ochre Field", "Nightfall"][i % 5] +
                    " " +
                    (i + 1),
                mkColors(3 + (i % 5), `s${i}`),
            ),
        );
    }
    return { version: 1, palettes: list };
}

async function setSeed(page, store) {
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, store);
}

const px = (v) => Math.round(v * 100) / 100;

async function measure(page) {
    return await page.evaluate(() => {
        const R = {};
        const rect = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: px(r.x), y: px(r.y), w: px(r.width), h: px(r.height) };
        };
        function px(v) {
            return Math.round(v * 100) / 100;
        }
        const cs = (el, ...props) => {
            if (!el) return null;
            const c = getComputedStyle(el);
            const o = {};
            for (const p of props) o[p] = c.getPropertyValue(p);
            return o;
        };

        // --- locate the pane by its heading
        const heads = [...document.querySelectorAll("h1,h2,h3,h4")];
        const h = heads.find((e) => /My\s*Palettes/.test(e.textContent || ""));
        const pane = h ? h.closest("[class*='pane-scroll-fade']") : null;
        R.paneRect = rect(pane);
        R.paneBg = pane ? getComputedStyle(pane).backgroundColor : null;
        R.headingTag = h ? h.tagName : null;
        R.headingText = h ? h.textContent.replace(/\s+/g, " ").trim() : null;

        // --- title / badge type
        const rampSpan = pane?.querySelector(".palettes-ramp-text");
        R.title = rampSpan
            ? { ...cs(rampSpan, "font-size", "font-family", "font-weight"), rect: rect(rampSpan) }
            : null;
        const badge = pane?.querySelector('[aria-hidden="true"][class*="text-mono-small"]');
        R.badge = badge ? { text: badge.textContent.trim(), rect: rect(badge) } : null;

        // --- the CurrentPaletteEditor plate (first grid child after search)
        const plate = pane?.querySelector('[class*="border-dashed"], .current-palette, [data-slot="current-palette"]');
        R.plate = plate
            ? { rect: rect(plate), ...cs(plate, "background-color", "border-style", "border-color") }
            : null;

        // --- grid + cards
        const grid = pane?.querySelector(".palette-card-grid");
        R.grid = grid
            ? {
                  rect: rect(grid),
                  role: grid.getAttribute("role"),
                  gridTemplateColumns: getComputedStyle(grid).gridTemplateColumns,
                  minHeight: getComputedStyle(grid).minHeight,
                  childRoles: [...grid.children].map((c) => c.getAttribute("role") || c.tagName),
                  listitemCount: grid.querySelectorAll('[role="listitem"]').length,
              }
            : null;

        const cards = [...(grid?.querySelectorAll('[role="article"]') || [])];
        R.cardCount = cards.length;
        R.cards = cards.slice(0, 6).map((c) => {
            const nameEl = c.querySelector(".font-display");
            const strip = c.querySelector('[role="presentation"], [aria-hidden="true"]');
            const segs = [...c.querySelectorAll('[role="presentation"] > *')];
            return {
                label: c.getAttribute("aria-label"),
                rect: rect(c),
                name: nameEl ? nameEl.textContent.trim().slice(0, 40) : null,
                nameRect: rect(nameEl),
                nameOverflow: nameEl
                    ? { scrollW: nameEl.scrollWidth, clientW: nameEl.clientWidth, clamp: getComputedStyle(nameEl).webkitLineClamp }
                    : null,
                stripRect: rect(strip),
                segCount: segs.length,
                segWidths: segs.slice(0, 60).map((s) => px(s.getBoundingClientRect().width)),
            };
        });
        R.cardHeights = cards.map((c) => px(c.getBoundingClientRect().height));

        // --- empty-state (if present)
        const es = pane?.querySelector('[role="status"]');
        if (es) {
            const ps = [...es.querySelectorAll("p")];
            R.emptyState = {
                role: es.getAttribute("role"),
                ariaLive: es.getAttribute("aria-live"),
                lines: ps.map((p) => ({
                    text: p.textContent.trim(),
                    ...cs(p, "font-size", "font-family", "font-weight", "color"),
                })),
            };
        }

        // --- delete-all trash
        const trash = pane?.querySelector('[aria-label="Delete all saved palettes"]');
        R.trash = trash
            ? {
                  rect: rect(trash),
                  variantAttr: trash.getAttribute("variant"),
                  ...cs(trash, "background-color", "color", "cursor", "border-radius"),
              }
            : null;

        // --- search
        const search = pane?.querySelector("input");
        R.search = search
            ? {
                  rect: rect(search),
                  name:
                      search.getAttribute("aria-label") ||
                      search.getAttribute("placeholder") ||
                      null,
                  ariaLabel: search.getAttribute("aria-label"),
                  labelledby: search.getAttribute("aria-labelledby"),
              }
            : null;

        // --- scroll containers
        R.scrollers = [...(pane ? [pane] : []), ...(pane?.querySelectorAll("*") || [])]
            .filter((e) => e.scrollHeight - e.clientHeight > 2 && /auto|scroll/.test(getComputedStyle(e).overflowY))
            .slice(0, 5)
            .map((e) => ({
                cls: (e.className || "").toString().slice(0, 60),
                scrollH: e.scrollHeight,
                clientH: e.clientHeight,
            }));

        // --- focusables inside the pane, in DOM order
        const FOC =
            'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
        R.focusables = [...(pane?.querySelectorAll(FOC) || [])].map((e) => {
            const r = e.getBoundingClientRect();
            return {
                tag: e.tagName,
                name:
                    e.getAttribute("aria-label") ||
                    (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30) ||
                    e.getAttribute("placeholder") ||
                    "(unnamed)",
                w: px(r.width),
                h: px(r.height),
            };
        });

        R.docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        R.h1Count = document.querySelectorAll("h1").length;
        return R;
    });
}

async function tabWalk(page, n = 14) {
    const seq = [];
    for (let i = 0; i < n; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a || a === document.body) return { tag: "BODY" };
            const c = getComputedStyle(a);
            const r = a.getBoundingClientRect();
            return {
                tag: a.tagName,
                name:
                    a.getAttribute("aria-label") ||
                    (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 34) ||
                    a.getAttribute("placeholder") ||
                    "(unnamed)",
                outline: c.outlineWidth + " " + c.outlineStyle + " " + c.outlineColor,
                boxShadow: c.boxShadow.slice(0, 70),
                rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
                inPane: !!a.closest("[class*='pane-scroll-fade']"),
            };
        });
        seq.push(info);
    }
    return seq;
}

async function run(browserType, name) {
    const b = await browserType.launch();
    const out = {};

    // ============ 1. desktop light, populated (pathological seed) ============
    let ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
    let page = await ctx.newPage();
    await setSeed(page, seed(8));
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    out.desktopLight = await measure(page);
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-light-pathological.png`), fullPage: false });

    // --- tab walk from the top of the document
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.keyboard.press("Tab"); // enter document
    out.tabWalk = await tabWalk(page, 16);
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-light-tabwalk-end.png`) });

    // --- focus the search field and photograph the ring
    await page.evaluate(() => {
        const h = [...document.querySelectorAll("h1,h2,h3,h4")].find((e) => /My\s*Palettes/.test(e.textContent || ""));
        const pane = h?.closest("[class*='pane-scroll-fade']");
        pane?.querySelector("input")?.focus();
    });
    await page.waitForTimeout(200);
    out.searchFocusRing = await page.evaluate(() => {
        const a = document.activeElement;
        const c = getComputedStyle(a);
        const w = a.closest("[class*='search-seated']") || a.parentElement;
        return {
            input: { outline: c.outline, boxShadow: c.boxShadow.slice(0, 90) },
            wrapper: w ? { cls: (w.className || "").toString().slice(0, 70), boxShadow: getComputedStyle(w).boxShadow.slice(0, 90), outline: getComputedStyle(w).outline } : null,
        };
    });
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-light-search-focus.png`) });

    // ============ 2. delete-all dialog: focus contract ============
    out.dialog = {};
    const openTrash = async () => {
        await page.evaluate(() => {
            const h = [...document.querySelectorAll("h1,h2,h3,h4")].find((e) => /My\s*Palettes/.test(e.textContent || ""));
            const pane = h?.closest("[class*='pane-scroll-fade']");
            const t = pane?.querySelector('[aria-label="Delete all saved palettes"]');
            t?.focus();
            t?.click();
        });
        await page.waitForTimeout(600);
    };
    await openTrash();
    out.dialog.onOpen = await page.evaluate(() => {
        const a = document.activeElement;
        const d = document.querySelector('[role="dialog"],[role="alertdialog"]');
        return {
            activeTag: a?.tagName,
            activeName: (a?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40) || a?.getAttribute("aria-label"),
            dialogRole: d?.getAttribute("role") || null,
            dialogLabelledby: d?.getAttribute("aria-labelledby") || null,
            dialogDescribedby: d?.getAttribute("aria-describedby") || null,
            hasCloseButton: !!d?.querySelector('[aria-label*="lose" i]'),
            buttons: [...(d?.querySelectorAll("button") || [])].map((x) => ({
                text: x.textContent.replace(/\s+/g, " ").trim(),
                x: Math.round(x.getBoundingClientRect().x),
                w: Math.round(x.getBoundingClientRect().width),
                bg: getComputedStyle(x).backgroundColor,
            })),
            descr: d?.querySelector("p,[id*='desc']")?.textContent.replace(/\s+/g, " ").trim().slice(0, 160),
        };
    });
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-light-deleteall-dialog.png`) });

    // Escape → where does focus land?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    out.dialog.afterEscape = await page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a?.tagName, name: a?.getAttribute("aria-label") || (a?.textContent || "").trim().slice(0, 40) || "(body)" };
    });

    // Reopen and CONFIRM: the opener is v-if'd away by the mutation.
    await openTrash();
    await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"],[role="alertdialog"]');
        const b = [...(d?.querySelectorAll("button") || [])].find((x) => /delete all/i.test(x.textContent));
        b?.click();
    });
    await page.waitForTimeout(900);
    out.dialog.afterConfirm = await page.evaluate(() => {
        const a = document.activeElement;
        const h = [...document.querySelectorAll("h1,h2,h3,h4")].find((e) => /My\s*Palettes/.test(e.textContent || ""));
        const pane = h?.closest("[class*='pane-scroll-fade']");
        return {
            activeTag: a?.tagName,
            activeName: a?.getAttribute("aria-label") || (a?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40) || "(none)",
            isBody: a === document.body,
            openerStillInDom: !!pane?.querySelector('[aria-label="Delete all saved palettes"]'),
            cardsLeft: pane?.querySelectorAll('[role="article"]').length,
            liveRegions: [...(pane?.querySelectorAll('[role="status"],[role="alert"],[aria-live]') || [])].map(
                (e) => (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90),
            ),
        };
    });
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-light-after-deleteall.png`) });

    // empty library — is the search affordance still offered?
    out.emptyLibrary = await measure(page);
    await ctx.close();

    // ============ 3. desktop dark, populated — material agreement ============
    ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    page = await ctx.newPage();
    await setSeed(page, seed(8));
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    out.desktopDark = await measure(page);
    out.material = await page.evaluate(() => {
        const h = [...document.querySelectorAll("h1,h2,h3,h4")].find((e) => /My\s*Palettes/.test(e.textContent || ""));
        const pane = h?.closest("[class*='pane-scroll-fade']");
        const grab = (el) => {
            if (!el) return null;
            const c = getComputedStyle(el);
            return { bg: c.backgroundColor, border: c.borderColor, borderStyle: c.borderStyle, shadow: c.boxShadow.slice(0, 90), backdrop: c.backdropFilter };
        };
        const plate = pane?.querySelector('[class*="border-dashed"]');
        const card = pane?.querySelector('[role="article"]');
        return {
            pane: grab(pane),
            plate: grab(plate),
            card: grab(card),
            search: grab(pane?.querySelector("[class*='search-seated']")),
        };
    });
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-dark-pathological.png`) });
    await ctx.close();

    // ============ 4. mobile light, populated ============
    ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 2, isMobile: name === "webkit", hasTouch: true });
    page = await ctx.newPage();
    await setSeed(page, seed(8));
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    out.mobileLight = await measure(page);
    await page.screenshot({ path: path.join(OUT, `${name}-mobile-light-pathological.png`) });
    await ctx.close();

    // ============ 5. mobile EMPTY — the empty-state type ranking ============
    ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 2 });
    page = await ctx.newPage();
    await setSeed(page, { version: 1, palettes: [] });
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    out.mobileEmpty = await measure(page);
    await page.screenshot({ path: path.join(OUT, `${name}-mobile-light-empty.png`) });
    await ctx.close();

    // ============ 6. reduced motion, populated ============
    ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" });
    page = await ctx.newPage();
    await setSeed(page, seed(8));
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    out.reducedMotion = await page.evaluate(() => {
        const h = [...document.querySelectorAll("h1,h2,h3,h4")].find((e) => /My\s*Palettes/.test(e.textContent || ""));
        const pane = h?.closest("[class*='pane-scroll-fade']");
        const card = pane?.querySelector('[role="article"]');
        const cast = card?.querySelector(".cartoon-cast");
        const g = (e) => (e ? { transition: getComputedStyle(e).transition.slice(0, 90), animation: getComputedStyle(e).animation.slice(0, 60) } : null);
        return { card: g(card), cast: g(cast), pane: g(pane) };
    });
    await page.screenshot({ path: path.join(OUT, `${name}-desktop-reduced-motion.png`) });
    await ctx.close();

    await b.close();
    return out;
}

const which = process.argv[2] || "webkit";
const bt = which === "chromium" ? chromium : webkit;
const res = await run(bt, which);
fs.writeFileSync(path.join(OUT, `TELEMETRY-${which}.json`), JSON.stringify(res, null, 2));
console.log("done", which);
