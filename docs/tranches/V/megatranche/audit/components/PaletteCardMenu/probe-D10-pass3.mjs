// CHALLENGE-D pass 3 — probe D10
// Territory pass 1 and pass 2 did not measure:
//   A. modal side effects of opening a per-card menu (scroll lock, page shift, aria-hidden)
//   B. the canon 320 px arm (VISUAL-CONSTITUTION §3.2 / §4 name it; no pass measured it)
//   C. the open menu's accessible name — identical across every card in the field
//   D. accessible names of the annotated rows (state smuggled into the action name)
// Read-only against the live dev server. Writes only JSON/PNG under this folder.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ROUTE = "http://localhost:9000/#/palettes";
const OUT = new URL(".", import.meta.url).pathname;

const SEED = {
    version: 1,
    palettes: [
        {
            id: "p-1",
            slug: "muted-terracotta-aaaaaaa",
            name: "Muted Terracotta and Deep Sea Foam Study",
            isLocal: true,
            tier: "featured",
            versionCount: 4,
            colors: [
                { css: "#c1654f" }, { css: "#e0a17f" }, { css: "#7fb0a3" },
                { css: "#3d5c55" }, { css: "#f2e8dc" },
            ],
        },
        {
            id: "p-2",
            slug: "temp-bbbbbbb",
            name: "Temp",
            isLocal: true,
            versionCount: 1,
            colors: [{ css: "#334455" }, { css: "#aabbcc" }],
        },
        {
            id: "p-3",
            slug: "third-ccccccc",
            name: "Third Palette",
            isLocal: true,
            versionCount: 1,
            colors: [{ css: "#884422" }, { css: "#ddeeff" }],
        },
    ],
};

const results = {};

async function boot(ctx, viewport) {
    const page = await ctx.newPage();
    await page.setViewportSize(viewport);
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, SEED);
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    return page;
}

async function openFirstMenu(page, n = 0) {
    const triggers = page.locator('button[aria-label="Palette menu"]');
    await triggers.nth(n).click();
    await page.waitForTimeout(500);
}

const browser = await chromium.launch();

// ─────────────────────────────────────────────────────────────────────────────
// ARM A — modal side effects at desktop 1440
// ─────────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await boot(ctx, { width: 1440, height: 1000 });

    const snapshot = () =>
        page.evaluate(() => {
            const b = document.body;
            const cs = getComputedStyle(b);
            const ref = document.querySelector("h1") || document.querySelector("header") || b.firstElementChild;
            const refRect = ref ? ref.getBoundingClientRect() : null;
            const cards = [...document.querySelectorAll('[role="article"]')].map((c) => {
                const r = c.getBoundingClientRect();
                return { label: c.getAttribute("aria-label"), x: +r.x.toFixed(1), w: +r.width.toFixed(1) };
            });
            // reka marks non-portal siblings hidden while a modal layer is open
            const hidden = [...document.querySelectorAll("[aria-hidden]")]
                .filter((e) => e.getAttribute("aria-hidden") === "true" && e.parentElement === document.body)
                .map((e) => ({ tag: e.tagName, id: e.id, cls: (e.className || "").toString().slice(0, 40) }));
            return {
                bodyOverflow: cs.overflow,
                bodyPaddingRight: cs.paddingRight,
                bodyPointerEvents: cs.pointerEvents,
                bodyDataScrollLocked: b.getAttribute("data-scroll-locked"),
                htmlScrollBehavior: getComputedStyle(document.documentElement).overflow,
                innerWidth: window.innerWidth,
                clientWidth: document.documentElement.clientWidth,
                scrollY: window.scrollY,
                scrollHeight: document.documentElement.scrollHeight,
                refX: refRect ? +refRect.x.toFixed(2) : null,
                refW: refRect ? +refRect.width.toFixed(2) : null,
                refTag: ref ? ref.tagName : null,
                cards,
                bodyChildrenHiddenTrue: hidden,
            };
        });

    const before = await snapshot();
    await openFirstMenu(page, 0);
    const after = await snapshot();

    // can the user scroll the list while a card menu is open?
    const scrollTest = await page.evaluate(async () => {
        const y0 = window.scrollY;
        window.scrollBy(0, 300);
        await new Promise((r) => setTimeout(r, 200));
        const y1 = window.scrollY;
        return { y0, y1, moved: y1 - y0 };
    });

    // C — the open menu's own accessible name
    const menuName = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        if (!menu) return null;
        const lb = menu.getAttribute("aria-labelledby");
        const labelEl = lb ? document.getElementById(lb) : null;
        return {
            role: menu.getAttribute("role"),
            ariaLabel: menu.getAttribute("aria-label"),
            ariaLabelledby: lb,
            labelledbyResolvesTo: labelEl
                ? { tag: labelEl.tagName, text: (labelEl.textContent || "").trim(), ariaLabel: labelEl.getAttribute("aria-label") }
                : null,
            // is the DropdownMenuLabel (the palette name) referenced by anything?
            paletteNameLabelReferenced: (() => {
                const lbl = menu.querySelector(".dropdown-menu__label, [class*='label']");
                if (!lbl) return null;
                const id = lbl.id;
                return { id: id || null, text: (lbl.textContent || "").trim().slice(0, 50), referencedBy: id ? document.querySelectorAll(`[aria-labelledby~="${id}"]`).length : 0 };
            })(),
        };
    });

    // is the owning card still in the a11y tree while its menu is open?
    const owningCard = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('[role="article"]')];
        return cards.map((c) => ({
            label: c.getAttribute("aria-label"),
            ariaHiddenSelf: c.getAttribute("aria-hidden"),
            ariaHiddenAncestor: (() => {
                let n = c.parentElement;
                while (n && n !== document.body) {
                    if (n.getAttribute("aria-hidden") === "true") return { tag: n.tagName, cls: (n.className || "").toString().slice(0, 40) };
                    n = n.parentElement;
                }
                if (document.body.getAttribute("aria-hidden") === "true") return { tag: "BODY" };
                return null;
            })(),
            inertAncestor: (() => {
                let n = c;
                while (n && n !== document.documentElement) {
                    if (n.hasAttribute && n.hasAttribute("inert")) return n.tagName;
                    n = n.parentElement;
                }
                return null;
            })(),
        }));
    });

    // D — accessible names of the rows, with annotations folded in
    const rowNames = await page.evaluate(() => {
        return [...document.querySelectorAll('[role="menuitem"]')].map((i) => ({
            textContent: (i.textContent || "").replace(/\s+/g, " ").trim(),
            ariaLabel: i.getAttribute("aria-label"),
            ariaDescribedby: i.getAttribute("aria-describedby"),
            ariaChecked: i.getAttribute("aria-checked"),
            role: i.getAttribute("role"),
            dataDisabled: i.getAttribute("data-disabled"),
        }));
    });

    // the same trigger name on every card
    const triggerNames = await page.evaluate(() =>
        [...document.querySelectorAll('button[aria-label="Palette menu"]')].map((b) => ({
            ariaLabel: b.getAttribute("aria-label"),
            id: b.id || null,
        })));

    results.modal = { before, after, scrollTest, menuName, owningCard, rowNames, triggerNames };
    await page.screenshot({ path: OUT + "evidence/pass3-desktop-modal.png" });
    await ctx.close();
}

// ─────────────────────────────────────────────────────────────────────────────
// ARM B — the canon 320 px arm
// ─────────────────────────────────────────────────────────────────────────────
for (const [name, vp] of [["320", { width: 320, height: 844 }], ["390", { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
    const page = await boot(ctx, vp);

    const row = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        if (!card) return null;
        const nameSpan = [...card.querySelectorAll("span")].find((s) => s.getAttribute("title"));
        const metaRow = nameSpan ? nameSpan.closest("div.flex.items-center") : null;
        const rowEl = metaRow ? metaRow.parentElement : null;
        const r = (e) => { const b = e.getBoundingClientRect(); return { x: +b.x.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
        const trig = card.querySelector('button[aria-label="Palette menu"]');
        return {
            cardRect: r(card),
            rowRect: rowEl ? r(rowEl) : null,
            name: nameSpan ? { ...r(nameSpan), scrollW: nameSpan.scrollWidth, text: nameSpan.textContent.trim(), title: nameSpan.getAttribute("title") } : null,
            trigger: trig ? r(trig) : null,
            rowChildren: rowEl ? [...rowEl.querySelectorAll(":scope > div > *, :scope > div")].map((c) => ({ tag: c.tagName, w: +c.getBoundingClientRect().width.toFixed(1), text: (c.textContent || "").trim().slice(0, 32) })) : null,
        };
    });

    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForTimeout(500);

    const menu = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        if (!m) return null;
        const b = m.getBoundingClientRect();
        const cs = getComputedStyle(m);
        return {
            rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
            shareOfViewportWidth: +((b.width / window.innerWidth) * 100).toFixed(1),
            overflowsRight: +(b.right - window.innerWidth).toFixed(1),
            overflowsBottom: +(b.bottom - window.innerHeight).toFixed(1),
            maxHeight: cs.maxHeight,
            scrollH: m.scrollHeight,
            clientH: m.clientHeight,
            scrolls: m.scrollHeight > m.clientHeight + 1,
            docScrollW: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
            items: [...m.querySelectorAll('[role="menuitem"]')].map((i) => {
                const ir = i.getBoundingClientRect();
                return { t: (i.textContent || "").replace(/\s+/g, " ").trim().slice(0, 28), w: +ir.width.toFixed(1), h: +ir.height.toFixed(1), truncated: i.scrollWidth > i.clientWidth + 1 };
            }),
        };
    });

    // keyboard-open the submenu (touch cannot — pass 1 D-3)
    await page.keyboard.press("ArrowDown");
    for (let i = 0; i < 8; i++) {
        const onExport = await page.evaluate(() => (document.activeElement?.textContent || "").trim().startsWith("Export"));
        if (onExport) break;
        await page.keyboard.press("ArrowDown");
    }
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(450);

    const sub = await page.evaluate(() => {
        const menus = [...document.querySelectorAll('[role="menu"]')];
        if (menus.length < 2) return { panels: menus.length };
        const rects = menus.map((m) => { const b = m.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), right: +b.right.toFixed(1) }; });
        const [a, c] = rects;
        const ox = Math.max(0, Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x));
        const oy = Math.max(0, Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y));
        return { panels: menus.length, rects, overlapArea: +(ox * oy).toFixed(0), parentArea: +(a.w * a.h).toFixed(0), overlapPctOfParent: +((ox * oy) / (a.w * a.h) * 100).toFixed(1), innerWidth: window.innerWidth };
    });

    await page.screenshot({ path: OUT + `evidence/pass3-${name}-submenu.png` });
    results[`vp${name}`] = { row, menu, sub };
    await ctx.close();
}

await browser.close();
writeFileSync(OUT + "probe-D10-pass3-results.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
