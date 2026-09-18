// CHALLENGE-D · TagEditPopover — probe 1: OPEN the popover and measure it.
// READ-ONLY. Drives the LIVE dev server over the LAN origin (defeats the
// loopback dev-misconfig latch in demo/platform/transport/availability.ts:113).
// The API is stubbed at the Playwright network layer only; no repo file changes.
import { webkit } from "playwright";
import fs from "node:fs";
import os from "node:os";

const OUT = new URL("./evidence/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const LAN = process.env.LAN_IP;
const BASE = `http://${LAN}:9000`;
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

const COLORS = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"].map((hex) => ({
    color: hex,
    name: null,
}));

function palette(i, owned) {
    return {
        name: `Specimen ${i}`,
        slug: `specimen-${i}`,
        userSlug: owned ? "me-slug" : "someone-else",
        colors: COLORS,
        tags: i === 1 ? ["warm"] : [],
        createdAt: "2026-07-01T00:00:00.000Z",
        updatedAt: "2026-07-02T00:00:00.000Z",
        isLocal: false,
        voteCount: 3,
        voted: false,
        visibility: "public",
        tier: "standard",
        published: true,
        versionCount: 1,
        currentHash: `hash-${i}`,
    };
}

const PALETTES = [palette(1, true), palette(2, true), palette(3, false)];

async function stub(ctx, { tags = TAGS } = {}) {
    await ctx.route(`${API}/**`, async (route) => {
        const url = new URL(route.request().url());
        const p = url.pathname;
        const m = route.request().method();
        const json = (body, status = 200) =>
            route.fulfill({
                status,
                contentType: "application/json",
                headers: { "access-control-allow-origin": "*", etag: '"srv-1"' },
                body: JSON.stringify(body),
            });
        if (m === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" } });
        if (p === "/colors/tags") return json(tags);
        if (p === "/palettes" && m === "GET")
            return json({ data: PALETTES, nextCursor: null, hasMore: false });
        if (p.startsWith("/palettes/") && m === "PATCH")
            return json({ ...PALETTES[0], tags: JSON.parse(route.request().postData() || "{}").tags });
        if (p === "/health" || p === "/healthz") return json({ ok: true });
        return json({ data: [], hasMore: false, nextCursor: null });
    });
}

const R = (el) => {
    const b = el.getBoundingClientRect();
    return {
        x: +b.x.toFixed(2), y: +b.y.toFixed(2),
        w: +b.width.toFixed(2), h: +b.height.toFixed(2),
        top: +b.top.toFixed(2), left: +b.left.toFixed(2),
        right: +b.right.toFixed(2), bottom: +b.bottom.toFixed(2),
    };
};

async function openPopover(page) {
    // open the card menu on the FIRST owned palette, then "Edit Tags"
    const menu = page.locator('article button[aria-haspopup="menu"], [data-slot="card"] button[aria-haspopup="menu"]').first();
    await menu.scrollIntoViewIfNeeded();
    await menu.click();
    await page.waitForTimeout(400);
    const item = page.getByText("Edit Tags", { exact: true }).first();
    await item.click();
    await page.waitForTimeout(700);
}

async function run(label, ctxOpts, extra = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext(ctxOpts);
    const consoleErrs = [];
    const pageErrs = [];
    await stub(ctx, extra);
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
    page.on("pageerror", (e) => pageErrs.push(String(e)));
    await page.addInitScript(() => {
        localStorage.setItem("palette-user-slug", "me-slug");
    });
    if (extra.dark) await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3500);

    const patchReqs = [];
    page.on("request", (r) => {
        if (r.method() === "PATCH") patchReqs.push({ url: r.url(), body: r.postData(), headers: r.headers()["if-match"] });
    });

    await page.screenshot({ path: `${OUT}${label}-00-browse.png` });
    await openPopover(page);
    await page.screenshot({ path: `${OUT}${label}-01-open.png`, fullPage: false });

    const measured = await page.evaluate((Rsrc) => {
        const R = eval(`(${Rsrc})`);
        const content = document.querySelector('[data-reka-popper-content-wrapper]')
            || document.querySelector('[role="dialog"]');
        const inner = content ? content.querySelector('div') : null;
        const out = { found: !!content };
        if (!content) return out;
        const cs = getComputedStyle(content);
        out.wrapper = {
            rect: R(content),
            transform: cs.transform,
            position: cs.position,
            zIndex: cs.zIndex,
            inlineStyle: content.getAttribute("style"),
        };
        // the popover panel itself
        const panel = content.querySelector('[data-radix-popper-content-wrapper] > *, [role="dialog"]') || content.firstElementChild;
        if (panel) {
            const pcs = getComputedStyle(panel);
            out.panel = {
                tag: panel.tagName,
                cls: (panel.className || "").toString(),
                rect: R(panel),
                bg: pcs.backgroundColor,
                backdropFilter: pcs.backdropFilter || pcs.webkitBackdropFilter,
                border: pcs.border,
                borderRadius: pcs.borderRadius,
                boxShadow: pcs.boxShadow.slice(0, 240),
                padding: pcs.padding,
                width: pcs.width,
                role: panel.getAttribute("role"),
                ariaLabel: panel.getAttribute("aria-label"),
                ariaLabelledby: panel.getAttribute("aria-labelledby"),
                ariaDescribedby: panel.getAttribute("aria-describedby"),
                ariaModal: panel.getAttribute("aria-modal"),
                dataState: panel.getAttribute("data-state"),
                dataSide: panel.getAttribute("data-side"),
                dataAlign: panel.getAttribute("data-align"),
            };
        }
        // heading + rows
        const heading = content.querySelector(".section-label");
        if (heading) {
            const hcs = getComputedStyle(heading);
            out.heading = {
                text: heading.textContent.trim(),
                tag: heading.tagName,
                rect: R(heading),
                fontFamily: hcs.fontFamily, fontSize: hcs.fontSize,
                textTransform: hcs.textTransform, letterSpacing: hcs.letterSpacing,
                color: hcs.color, marginBottom: hcs.marginBottom,
            };
        }
        const labels = [...content.querySelectorAll("label")];
        out.rowCount = labels.length;
        out.rows = labels.slice(0, 4).map((l) => {
            const lcs = getComputedStyle(l);
            const box = l.querySelector('button,[role="checkbox"],input[type=checkbox]');
            const name = l.querySelector("span.truncate");
            const cat = l.querySelector("span:last-of-type");
            const bcs = box ? getComputedStyle(box) : null;
            const ncs = name ? getComputedStyle(name) : null;
            const ccs = cat ? getComputedStyle(cat) : null;
            return {
                text: l.textContent.replace(/\s+/g, " ").trim(),
                rect: R(l),
                padding: lcs.padding, gap: lcs.gap, cursor: lcs.cursor,
                htmlFor: l.getAttribute("for"),
                box: box
                    ? {
                          tag: box.tagName, role: box.getAttribute("role"),
                          type: box.getAttribute("type"),
                          ariaChecked: box.getAttribute("aria-checked"),
                          dataState: box.getAttribute("data-state"),
                          checkedProp: box.checked,
                          rect: R(box),
                          w: bcs.width, h: bcs.height,
                          accName: box.getAttribute("aria-label") || box.getAttribute("aria-labelledby") || "",
                          id: box.id || null,
                          tabIndex: box.tabIndex,
                      }
                    : null,
                name: name ? { text: name.textContent.trim(), rect: R(name), fontFamily: ncs.fontFamily, fontSize: ncs.fontSize, color: ncs.color, overflow: ncs.textOverflow } : null,
                category: cat ? { text: cat.textContent.trim(), rect: R(cat), fontFamily: ccs.fontFamily, fontSize: ccs.fontSize, textTransform: ccs.textTransform, letterSpacing: ccs.letterSpacing, color: ccs.color } : null,
            };
        });
        const scroller = content.querySelector(".overflow-y-auto");
        if (scroller) {
            const scs = getComputedStyle(scroller);
            out.scroller = {
                rect: R(scroller),
                maxHeight: scs.maxHeight,
                scrollHeight: scroller.scrollHeight,
                clientHeight: scroller.clientHeight,
                overflows: scroller.scrollHeight > scroller.clientHeight,
                scrollbarWidth: scs.scrollbarWidth,
                maskImage: scs.maskImage || scs.webkitMaskImage,
            };
        }
        // where is the anchor?
        const trig = document.querySelector('[data-reka-popover-trigger],[aria-haspopup="dialog"]');
        out.triggerFound = !!trig;
        out.triggerRect = trig ? R(trig) : null;
        out.activeElement = {
            tag: document.activeElement?.tagName,
            cls: (document.activeElement?.className || "").toString().slice(0, 90),
            text: (document.activeElement?.textContent || "").trim().slice(0, 40),
        };
        out.viewport = { w: innerWidth, h: innerHeight, scrollY: scrollY };
        out.docDir = getComputedStyle(document.documentElement).direction;
        return out;
    }, R.toString());

    // toggle a checkbox and watch what happens
    let toggle = { attempted: false };
    try {
        const first = page.locator('[role="dialog"] label').first();
        const before = await page.evaluate(() => {
            const l = document.querySelector('[role="dialog"] label');
            const b = l && l.querySelector('button,[role="checkbox"],input');
            return { aria: b?.getAttribute("aria-checked"), state: b?.getAttribute("data-state") };
        });
        await first.click();
        await page.waitForTimeout(900);
        const after = await page.evaluate(() => {
            const l = document.querySelector('[role="dialog"] label');
            const b = l && l.querySelector('button,[role="checkbox"],input');
            return { aria: b?.getAttribute("aria-checked"), state: b?.getAttribute("data-state") };
        });
        toggle = { attempted: true, before, after, patchReqs };
        await page.screenshot({ path: `${OUT}${label}-02-after-toggle.png` });
    } catch (e) {
        toggle = { attempted: true, error: String(e) };
    }

    // escape → where does focus land?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    const afterClose = await page.evaluate(() => ({
        stillOpen: !!document.querySelector('[role="dialog"]'),
        active: {
            tag: document.activeElement?.tagName,
            cls: (document.activeElement?.className || "").toString().slice(0, 120),
            text: (document.activeElement?.textContent || "").trim().slice(0, 60),
            isBody: document.activeElement === document.body,
        },
    }));

    await browser.close();
    return { label, measured, toggle, afterClose, consoleErrs, pageErrs };
}

const out = {};
out.desktopLight = await run("desktop-light", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
out.desktopDark = await run("desktop-dark", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, { dark: true });
out.mobile = await run("mobile", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
out.emptyCatalog = await run("empty", { viewport: { width: 1440, height: 900 } }, { tags: [] });

fs.writeFileSync(`${OUT}probe-1.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 6000));
