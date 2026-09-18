// CHALLENGE-D pass 5 — probe D20
// Territory passes 1–4 did not measure:
//   A. ZOOM as a VERTICAL problem. The canon names "actual 400% browser-zoom" as a
//      mandatory observation arm SIX times (VISUAL-CONSTITUTION 62/64/78, PROPORTION-AUDIT
//      16/17/45/47). Pass 1 ran 720x500 and reported `overflowsViewport:false`; pass 3 ran
//      320x844 (a TALL frame). Nobody has ever put this menu in a frame whose HEIGHT is
//      the zoomed height. 400% of 1440x900 => 360x225 CSS px.
//   B. TEXT-ONLY resize (WCAG 1.4.4 / 1.4.12) — root font-size 200%. Distinct from page
//      zoom: px-pinned values do NOT scale, rem-pinned ones do. `w-48` is rem; the header's
//      `max-w-[180px]` is px.
//   C. WCAG 1.4.12 text-spacing override.
//   D. the submenu diagonal traverse (the "safe triangle" problem) — measured, not reasoned.
//   E. the activation-model mismatch inside one instrument: trigger=click, subtrigger=hover.
// Read-only against the live dev server. Writes only JSON/PNG under this folder.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const ROUTE = `${ORIGIN}/#/palettes`;
const OUT = new URL(".", import.meta.url).pathname;
mkdirSync(`${OUT}evidence`, { recursive: true });

const mk = (i, name, n = 5) => ({
    id: `p-${i}`,
    slug: `pal-${i}-aaaaaaa`,
    name,
    isLocal: true,
    versionCount: 1,
    colors: Array.from({ length: n }, (_, k) => ({ css: `hsl(${(i * 47 + k * 31) % 360} 60% 55%)` })),
});

const SEED = {
    version: 1,
    palettes: [
        mk(1, "Muted Terracotta and Deep Sea Foam Study"),
        mk(2, "Second Palette"),
        mk(3, "Third Palette"),
        mk(4, "Fourth Palette"),
        mk(5, "Fifth Palette"),
        mk(6, "Sixth Palette"),
    ],
};

const results = {};

async function boot(ctx) {
    const page = await ctx.newPage();
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, SEED);
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2600);
    return page;
}

// Panel anatomy: rect, the reka available-height custom property, the scroll state,
// and per-row visibility measured against the panel's own scroll viewport.
const panelAnatomy = (page) =>
    page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        if (!menu) return null;
        const cs = getComputedStyle(menu);
        const mr = menu.getBoundingClientRect();
        const rows = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => {
            const r = el.getBoundingClientRect();
            return {
                text: el.textContent.trim().replace(/\s+/g, " "),
                y: +r.y.toFixed(1),
                bottom: +r.bottom.toFixed(1),
                h: +r.height.toFixed(1),
                // is the row inside the panel's visible scroll viewport?
                insidePanel: r.y >= mr.y - 0.5 && r.bottom <= mr.bottom + 0.5,
                // is the row inside the actual viewport?
                insideViewport: r.y >= 0 && r.bottom <= innerHeight,
            };
        });
        const label = menu.querySelector('[data-slot="dropdown-menu-label"], .dropdown-menu-label') ||
            menu.querySelector("div");
        const lr = label ? label.getBoundingClientRect() : null;
        return {
            viewport: { w: innerWidth, h: innerHeight, dpr: devicePixelRatio },
            rect: { x: +mr.x.toFixed(1), y: +mr.y.toFixed(1), w: +mr.width.toFixed(1), h: +mr.height.toFixed(1) },
            side: menu.getAttribute("data-side"),
            align: menu.getAttribute("data-align"),
            css: {
                maxHeight: cs.maxHeight,
                overflowY: cs.overflowY,
                width: cs.width,
                fontSize: cs.fontSize,
            },
            availableHeightVar: cs.getPropertyValue("--reka-dropdown-menu-content-available-height").trim(),
            scroll: {
                scrollHeight: menu.scrollHeight,
                clientHeight: menu.clientHeight,
                scrollable: menu.scrollHeight > menu.clientHeight + 1,
                hiddenPx: Math.max(0, menu.scrollHeight - menu.clientHeight),
            },
            fitsInViewport: mr.y >= 0 && mr.bottom <= innerHeight,
            overflowTopPx: +Math.max(0, -mr.y).toFixed(1),
            overflowBottomPx: +Math.max(0, mr.bottom - innerHeight).toFixed(1),
            header: lr
                ? {
                      text: label.textContent.trim(),
                      w: +lr.width.toFixed(1),
                      maxWidth: getComputedStyle(label).maxWidth,
                      scrollWidth: label.scrollWidth,
                      clientWidth: label.clientWidth,
                      clippedPx: Math.max(0, label.scrollWidth - label.clientWidth),
                      fontSize: getComputedStyle(label).fontSize,
                  }
                : null,
            rows,
            rowsVisible: rows.filter((r) => r.insidePanel).length,
            rowsTotal: rows.length,
        };
    });

const browser = await chromium.launch();

// ───────────────────────────────────────────────────────────────────────────
// ARM A — the canon's zoom ladder, measured in the ZOOM-CORRECT FRAME.
// Mechanism: the repo's own harness convention (docs/.../visual/states.mjs:21) —
// CSS viewport = physical / zoom, DPR = zoom. 1440x900 physical is the canon's
// desktop reference.
// ───────────────────────────────────────────────────────────────────────────
results.A_zoomLadder = {};
for (const [label, vp, dsf] of [
    ["100%", { width: 1440, height: 900 }, 1],
    ["200%", { width: 720, height: 450 }, 2],
    ["400%", { width: 360, height: 225 }, 4],
]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dsf });
    const page = await boot(ctx);
    const trig = page.locator('button[aria-label="Palette menu"]').first();
    const n = await trig.count();
    let anatomy = null,
        trigBox = null,
        sub = null;
    if (n) {
        await trig.scrollIntoViewIfNeeded().catch(() => {});
        trigBox = await trig.boundingBox();
        await trig.click({ force: true });
        await page.waitForTimeout(600);
        anatomy = await panelAnatomy(page);

        // can the user reach the Export submenu at this zoom?
        const st = page.locator('[role="menuitem"]', { hasText: "Export" }).first();
        if (await st.count()) {
            await st.hover({ force: true }).catch(() => {});
            await page.waitForTimeout(500);
            sub = await page.evaluate(() => {
                const menus = [...document.querySelectorAll('[role="menu"]')];
                if (menus.length < 2) return { open: false, count: menus.length };
                const p = menus[0].getBoundingClientRect();
                const c = menus[1].getBoundingClientRect();
                const ox = Math.max(0, Math.min(p.right, c.right) - Math.max(p.left, c.left));
                const oy = Math.max(0, Math.min(p.bottom, c.bottom) - Math.max(p.top, c.top));
                return {
                    open: true,
                    parent: { x: +p.x.toFixed(1), right: +p.right.toFixed(1), w: +p.width.toFixed(1) },
                    child: { x: +c.x.toFixed(1), right: +c.right.toFixed(1), w: +c.width.toFixed(1),
                             y: +c.y.toFixed(1), bottom: +c.bottom.toFixed(1), h: +c.height.toFixed(1) },
                    overlapPx: +ox.toFixed(1),
                    overlapPctOfParent: +((ox * oy) / (p.width * p.height) * 100).toFixed(1),
                    childFitsViewport: c.x >= 0 && c.right <= innerWidth && c.y >= 0 && c.bottom <= innerHeight,
                    childOverflowRight: +Math.max(0, c.right - innerWidth).toFixed(1),
                    childOverflowBottom: +Math.max(0, c.bottom - innerHeight).toFixed(1),
                };
            });
        }
        await page
            .screenshot({ path: `${OUT}evidence/pass5-zoom-${label.replace("%", "")}.png` })
            .catch(() => {});
    }
    results.A_zoomLadder[label] = { viewport: vp, dsf, triggers: n, trigger: trigBox, anatomy, submenu: sub };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM B — TEXT-ONLY resize (WCAG 1.4.4). Root font-size 16px -> 32px.
// Page zoom scales px and rem alike; text resize scales ONLY rem/em.
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await boot(ctx);

    async function measure(tag) {
        const trig = page.locator('button[aria-label="Palette menu"]').first();
        await trig.click({ force: true });
        await page.waitForTimeout(550);
        const a = await panelAnatomy(page);
        const extra = await page.evaluate(() => {
            const menu = document.querySelector('[role="menu"]');
            const root = getComputedStyle(document.documentElement).fontSize;
            const icon = menu.querySelector("svg");
            const ir = icon ? icon.getBoundingClientRect() : null;
            const items = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => {
                const cs = getComputedStyle(el);
                return {
                    text: el.textContent.trim().replace(/\s+/g, " "),
                    fontSize: cs.fontSize,
                    h: +el.getBoundingClientRect().height.toFixed(1),
                    scrollW: el.scrollWidth,
                    clientW: el.clientWidth,
                    overflowsX: el.scrollWidth > el.clientWidth + 1,
                };
            });
            // the header label element: find the truncate class explicitly
            const hdr = [...menu.children].find((el) => el.className.toString().includes("truncate"));
            const hr = hdr ? hdr.getBoundingClientRect() : null;
            const hcs = hdr ? getComputedStyle(hdr) : null;
            return {
                rootFontSize: root,
                iconPx: ir ? { w: +ir.width.toFixed(1), h: +ir.height.toFixed(1) } : null,
                items,
                headerLabel: hdr
                    ? {
                          text: hdr.textContent.trim(),
                          maxWidthComputed: hcs.maxWidth,
                          fontSize: hcs.fontSize,
                          renderedW: +hr.width.toFixed(1),
                          scrollW: hdr.scrollWidth,
                          clientW: hdr.clientWidth,
                          clippedPx: Math.max(0, hdr.scrollWidth - hdr.clientWidth),
                      }
                    : null,
            };
        });
        await page.screenshot({ path: `${OUT}evidence/pass5-textresize-${tag}.png` }).catch(() => {});
        await page.keyboard.press("Escape");
        await page.waitForTimeout(350);
        return { anatomy: a, extra };
    }

    const base = await measure("100");
    await page.evaluate(() => {
        document.documentElement.style.fontSize = "32px";
    });
    await page.waitForTimeout(400);
    const big = await measure("200");

    const panelW = (m) => m.anatomy?.rect?.w ?? null;
    const hdrMax = (m) => m.extra?.headerLabel?.maxWidthComputed ?? null;
    results.B_textOnlyResize = {
        base,
        big,
        divergence: {
            panelWidth: { at100: panelW(base), at200: panelW(big) },
            headerMaxWidth: { at100: hdrMax(base), at200: hdrMax(big) },
            deadSpaceRightOfHeaderAt200:
                panelW(big) != null && big.extra?.headerLabel
                    ? +(panelW(big) - big.extra.headerLabel.renderedW).toFixed(1)
                    : null,
            headerShareOfPanel: {
                at100:
                    panelW(base) && base.extra?.headerLabel
                        ? +((base.extra.headerLabel.renderedW / panelW(base)) * 100).toFixed(1)
                        : null,
                at200:
                    panelW(big) && big.extra?.headerLabel
                        ? +((big.extra.headerLabel.renderedW / panelW(big)) * 100).toFixed(1)
                        : null,
            },
        },
    };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM C — WCAG 1.4.12 text spacing override, applied verbatim from the
// success-criterion text (line-height 1.5, letter-spacing .12em,
// word-spacing .16em).
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await boot(ctx);
    await page.addStyleTag({
        content: `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }`,
    });
    await page.waitForTimeout(300);
    const trig = page.locator('button[aria-label="Palette menu"]').first();
    await trig.click({ force: true });
    await page.waitForTimeout(550);
    const a = await panelAnatomy(page);
    const clipped = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        const rows = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => ({
            text: el.textContent.trim().replace(/\s+/g, " "),
            scrollW: el.scrollWidth,
            clientW: el.clientWidth,
            overflowsX: el.scrollWidth > el.clientWidth + 1,
            h: +el.getBoundingClientRect().height.toFixed(1),
        }));
        // the submenu's longest label is the stress case
        return rows;
    });
    // open the submenu under the same override
    const st = page.locator('[role="menuitem"]', { hasText: "Export" }).first();
    await st.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(500);
    const subClip = await page.evaluate(() => {
        const menus = [...document.querySelectorAll('[role="menu"]')];
        if (menus.length < 2) return null;
        const sub = menus[1];
        return {
            w: +sub.getBoundingClientRect().width.toFixed(1),
            rows: [...sub.querySelectorAll('[role="menuitem"]')].map((el) => ({
                text: el.textContent.trim(),
                scrollW: el.scrollWidth,
                clientW: el.clientWidth,
                overflowsX: el.scrollWidth > el.clientWidth + 1,
                h: +el.getBoundingClientRect().height.toFixed(1),
                lines: +(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)).toFixed(2),
            })),
        };
    });
    await page.screenshot({ path: `${OUT}evidence/pass5-textspacing.png` }).catch(() => {});
    results.C_textSpacing = { anatomy: a, rows: clipped, submenu: subClip };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM D — the submenu DIAGONAL TRAVERSE. Open Export by hover, then walk the
// pointer along the straight line from the sub-trigger to the submenu's last
// row and sample whether the submenu survived the trip.
// ARM E — the activation-model mismatch: does the ROOT trigger open on hover?
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await boot(ctx);

    // E — root trigger on hover alone
    const trig = page.locator('button[aria-label="Palette menu"]').first();
    const tb = await trig.boundingBox();
    await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2);
    await page.waitForTimeout(900);
    const openedByHover = await page.locator('[role="menu"]').count();
    await trig.click({ force: true });
    await page.waitForTimeout(550);
    const openedByClick = await page.locator('[role="menu"]').count();

    // D — sub-trigger on hover alone, then the diagonal
    const st = page.locator('[role="menuitem"]', { hasText: "Export" }).first();
    const sb = await st.boundingBox();
    await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2);
    await page.waitForTimeout(700);
    const subOpenedByHover = await page.locator('[role="menu"]').count() > 1;

    let path = [];
    if (subOpenedByHover) {
        const target = await page.evaluate(() => {
            const menus = [...document.querySelectorAll('[role="menu"]')];
            const sub = menus[1];
            const rows = [...sub.querySelectorAll('[role="menuitem"]')];
            const last = rows[rows.length - 1].getBoundingClientRect();
            return { x: last.x + last.width / 2, y: last.y + last.height / 2, label: rows[rows.length - 1].textContent.trim() };
        });
        const from = { x: sb.x + sb.width / 2, y: sb.y + sb.height / 2 };
        const STEPS = 14;
        for (let i = 1; i <= STEPS; i++) {
            const t = i / STEPS;
            const x = from.x + (target.x - from.x) * t;
            const y = from.y + (target.y - from.y) * t;
            await page.mouse.move(x, y);
            await page.waitForTimeout(45);
            const state = await page.evaluate(() => {
                const menus = [...document.querySelectorAll('[role="menu"]')];
                return { menus: menus.length };
            });
            path.push({ step: i, x: +x.toFixed(1), y: +y.toFixed(1), submenuPresent: state.menus > 1 });
        }
        const arrived = await page.evaluate(() => document.querySelectorAll('[role="menu"]').length > 1);
        results.D_diagonalTraverse = {
            from,
            target,
            steps: path,
            closedEnRoute: path.some((p) => !p.submenuPresent),
            firstCloseAtStep: path.find((p) => !p.submenuPresent)?.step ?? null,
            survivedToTarget: arrived,
        };
    } else {
        results.D_diagonalTraverse = { subOpenedByHover, note: "sub did not open on hover" };
    }

    results.E_activationModel = {
        rootOpensOnHoverAlone: openedByHover > 0,
        rootOpensOnClick: openedByClick > 0,
        subOpensOnHoverAlone: subOpenedByHover,
        mismatch: openedByHover === 0 && subOpenedByHover,
    };
    await page.screenshot({ path: `${OUT}evidence/pass5-diagonal.png` }).catch(() => {});
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}probe-D20-pass5-results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
