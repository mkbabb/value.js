/**
 * T.W8 · CRITIQUE PASS 4 (palettes / browse + the palette dialog + the
 * empty/skeleton states) — the live-drive probe (O-3 class; PROBE-ONLY, no
 * writes to the app tree). Drives the LANE server :8630 (VJS_E2E_PORT) —
 * the owner's :9000 is never touched.
 *
 * Legs:
 *   1 · THE THREE WALLS × 6 cells (1440/768/390 × light/dark): My Palettes
 *       TRUE EMPTY (trio + dashes, zero fillers, T-43 ramp title) · Browse
 *       TRUE EMPTY (route-fulfilled empty commons) · Browse POPULATED
 *       (fixture wall + load-more affordance).
 *   2 · Browse DEVELOPING (delayed route — the loading species: shimmer
 *       probe on the PaletteCardSkeleton, computed animation incl. ::after)
 *       + Browse ERROR (unpinned SPA-HTML failure — the plain register,
 *       error ≠ empty, sibling-pane positive control).
 *   3 · Mix → Palettes TRUE EMPTY (t33-audit-12's host) + the Extract
 *       instrument face (the ONE legitimate ShadowPalette seat — living
 *       stagger probe).
 *   4 · T-43 THE RAMP ×2 SITES (My Palettes title + dock dropdown entry),
 *       both schemes; negative control on the Browse title.
 *   5 · THE DIALOG/DETAIL: seeded My Palettes populated wall · expanded
 *       PaletteCard detail · card menu · delete-all ConfirmDialog ·
 *       FlagReportDialog (browse wall).
 *
 * PNGs are gitignored-by-class (the standing convention); this script + the
 * log txt are the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8630";
const OUT = "docs/tranches/T/audit/pi/w8/palettes";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

const CELLS = [
    { vp: "1440", width: 1440, height: 900 },
    { vp: "768", width: 768, height: 1024 },
    { vp: "390", width: 390, height: 844 },
];
const SCHEMES = ["light", "dark"];

const REST_PALETTES = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

const NOW = "2026-07-05T00:00:00.000Z";
const WALL = Array.from({ length: 8 }, (_, i) => ({
    name: `Wall Palette ${i + 1}`,
    slug: `wall-palette-${i + 1}`,
    userSlug: "gallery",
    colors: [
        { css: "oklch(0.62 0.19 25)", position: 0 },
        { css: "oklch(0.7 0.14 85)", position: 1 },
        { css: "oklch(0.55 0.12 155)", position: 2 },
        { css: "oklch(0.52 0.16 260)", position: 3 },
        { css: "oklch(0.58 0.18 320)", position: 4 },
    ],
    createdAt: NOW,
    updatedAt: NOW,
    isLocal: false,
    voteCount: i + 3,
    visibility: "public",
    tier: "standard",
    published: true,
}));

const SEED_STORE = JSON.stringify({
    version: 1,
    palettes: [
        {
            id: "seed-1",
            name: "Harvest Table",
            slug: "harvest-table",
            colors: [
                { css: "oklch(0.62 0.19 25)", position: 0 },
                { css: "oklch(0.7 0.14 85)", position: 1 },
                { css: "oklch(0.55 0.12 155)", position: 2 },
            ],
            createdAt: NOW,
            updatedAt: NOW,
            isLocal: true,
        },
        {
            id: "seed-2",
            name: "Night Water",
            slug: "night-water",
            colors: [
                { css: "oklch(0.45 0.1 240)", position: 0 },
                { css: "oklch(0.3 0.06 260)", position: 1 },
                { css: "oklch(0.72 0.05 220)", position: 2 },
                { css: "oklch(0.85 0.03 200)", position: 3 },
            ],
            createdAt: NOW,
            updatedAt: NOW,
            isLocal: true,
        },
    ],
});

async function newCell({ width, height }, scheme, { seed = false } = {}) {
    const ctx = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: 2,
        colorScheme: scheme,
        baseURL: BASE,
    });
    if (seed) {
        await ctx.addInitScript((store) => {
            window.localStorage.setItem("color-palettes", store);
        }, SEED_STORE);
    }
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    return { ctx, page, errors };
}

async function routeEmpty(page) {
    await page.route(REST_PALETTES, (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }),
        }),
    );
}
async function routeWall(page) {
    await page.route(REST_PALETTES, (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: WALL, nextCursor: "p2", hasMore: true }),
        }),
    );
}
async function routeDelayed(page, delayMs) {
    await page.route(REST_PALETTES, async (route) => {
        await new Promise((r) => setTimeout(r, delayMs));
        return route
            .fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: WALL, nextCursor: null, hasMore: false }),
            })
            .catch(() => {});
    });
}

function pane(page, heading) {
    return page
        .getByRole("main", { name: "Color tool panes" })
        .locator('[data-slot="card"]')
        .filter({ has: page.getByRole("heading", { name: heading, exact: true }) })
        .filter({ visible: true })
        .first();
}

/** trio + dashes + fillers + eyebrow probes inside a pane scope. */
async function probeEmptyHost(scope) {
    const trio = scope.locator('[data-slot="empty-state-trio"]').filter({ visible: true });
    const trioCount = await trio.count();
    let ghosts = 0,
        strokes = 0,
        ariaHidden = null;
    if (trioCount) {
        ghosts = await trio.first().locator('[data-variant="ghost"]').count();
        strokes = await trio.first().locator(".watercolor-ghost-stroke").count();
        ariaHidden = await trio.first().getAttribute("aria-hidden");
    }
    const fillers = await scope
        .locator('[data-slot="shadow-palette"]')
        .filter({ visible: true })
        .count();
    return { trioCount, ghosts, strokes, ariaHidden, fillers };
}

/** the ramp probe: computed gradient + clip + 3 stops on a locator. */
async function probeRamp(loc) {
    return loc.evaluate((el) => {
        const cs = getComputedStyle(el);
        const root = getComputedStyle(document.documentElement);
        return {
            bgImage: cs.backgroundImage.slice(0, 120),
            clip: cs.webkitBackgroundClip || cs.backgroundClip,
            color: cs.color,
            stops: [0, 1, 2].map((i) =>
                root.getPropertyValue(`--palettes-ramp-${i}`).trim(),
            ),
        };
    });
}

/** WCAG ratio between two computed rgb() strings (alpha-blind approximation
 *  — flagged in the record; used for the eyebrow/hint quiet-rung read). */
function wcag(fg, bg) {
    const parse = (s) => {
        const m = s.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
        return m.slice(0, 3);
    };
    const lum = ([r, g, b]) => {
        const f = (c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const a = lum(parse(fg)),
        b = lum(parse(bg));
    return ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2);
}

async function settle(page, ms = 3400) {
    await page.waitForTimeout(ms);
}

/* ================= LEG 1 — the three walls × 6 cells ================= */
log("=== LEG 1 · the three walls × 6 cells ===");
for (const cell of CELLS) {
    for (const scheme of SCHEMES) {
        const tag = `${cell.vp}-${scheme}`;

        // --- My Palettes TRUE EMPTY ---
        {
            const { ctx, page, errors } = await newCell(cell, scheme);
            await routeEmpty(page);
            await page.goto("/#/palettes");
            await settle(page);
            const mp = pane(page, "My Palettes");
            const probes = await probeEmptyHost(mp);
            const eyebrow = await mp.getByText("· empty plate ·").count();
            const msg = await mp.getByText("No saved palettes yet.").count();
            const ramp = await probeRamp(mp.locator(".palettes-ramp-text").first());
            // quiet-rung ink read (eyebrow vs pane card ground)
            const inkRead = await mp
                .getByText("· empty plate ·")
                .first()
                .evaluate((el) => {
                    const fg = getComputedStyle(el).color;
                    let node = el;
                    let bg = "rgba(0, 0, 0, 0)";
                    while (node) {
                        const b = getComputedStyle(node).backgroundColor;
                        if (b && !/rgba?\(.*,\s*0\)/.test(b)) {
                            bg = b;
                            break;
                        }
                        node = node.parentElement;
                    }
                    return { fg, bg };
                });
            log(
                `[${tag}] mypalettes-empty  trio=${probes.trioCount} ghosts=${probes.ghosts} strokes=${probes.strokes} ariaHidden=${probes.ariaHidden} fillers=${probes.fillers} eyebrow=${eyebrow} msg=${msg}`,
            );
            log(
                `[${tag}]   ramp: clip=${ramp.clip} color=${ramp.color} stops=${ramp.stops.join(" | ")} bg=${ramp.bgImage}`,
            );
            log(
                `[${tag}]   eyebrow ink ${inkRead.fg} on ${inkRead.bg} → ~${wcag(inkRead.fg, inkRead.bg)}:1 (alpha-blind approx)`,
            );
            await page.screenshot({ path: `${OUT}/${tag}-mypalettes-empty.png` });
            log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
            await ctx.close();
        }

        // --- Browse TRUE EMPTY ---
        {
            const { ctx, page, errors } = await newCell(cell, scheme);
            await routeEmpty(page);
            await page.goto("/#/browse");
            await settle(page);
            const bp = pane(page, "Browse");
            const probes = await probeEmptyHost(bp);
            const eyebrow = await bp.getByText("· the commons ·").count();
            const msg = await bp.getByText("No published palettes here yet.").count();
            const alert = await bp.getByRole("alert").filter({ visible: true }).count();
            // negative control: the Browse title is INK, never rainbow
            const titleRamp = await bp
                .getByRole("heading", { name: "Browse", exact: true })
                .evaluate((el) => {
                    const cs = getComputedStyle(el);
                    return { bgImage: cs.backgroundImage, color: cs.color };
                });
            log(
                `[${tag}] browse-empty  trio=${probes.trioCount} ghosts=${probes.ghosts} strokes=${probes.strokes} fillers=${probes.fillers} eyebrow=${eyebrow} msg=${msg} alert=${alert} titleBg=${titleRamp.bgImage === "none" ? "none(ink)" : "RAMP?!"}`,
            );
            await page.screenshot({ path: `${OUT}/${tag}-browse-empty.png` });
            log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
            await ctx.close();
        }

        // --- Browse POPULATED (the wall) ---
        {
            const { ctx, page, errors } = await newCell(cell, scheme);
            await routeWall(page);
            await page.goto("/#/browse");
            await settle(page);
            const bp = pane(page, "Browse");
            const cards = await bp.getByRole("article").count();
            const fillers = await bp
                .locator('[data-slot="shadow-palette"]')
                .filter({ visible: true })
                .count();
            const skeletons = await bp
                .locator('[data-slot="palette-card-skeleton"]')
                .filter({ visible: true })
                .count();
            const more = await bp
                .getByRole("button", { name: "More from the commons" })
                .count();
            // card material read (Q4: PaletteCard = well)
            const mat = await bp
                .getByRole("article")
                .first()
                .evaluate((el) => {
                    const cs = getComputedStyle(el);
                    return {
                        bg: cs.backgroundColor,
                        border: cs.borderTopColor,
                        radius: cs.borderTopLeftRadius,
                        blur: cs.backdropFilter,
                        classes: el.className.split(" ").filter((c) =>
                            /bg-|border-|rounded|shadow/.test(c),
                        ).join(" "),
                    };
                });
            log(
                `[${tag}] browse-wall  cards=${cards} fillers=${fillers} skeletons=${skeletons} loadMore=${more}`,
            );
            log(
                `[${tag}]   card mat: bg=${mat.bg} border=${mat.border} radius=${mat.radius} blur=${mat.blur} classes=[${mat.classes}]`,
            );
            await page.screenshot({ path: `${OUT}/${tag}-browse-wall.png` });
            log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
            await ctx.close();
        }
    }
}

/* ============ LEG 2 — developing + error (1440, both schemes) ============ */
log("=== LEG 2 · developing + error ===");
for (const scheme of SCHEMES) {
    const tag = `1440-${scheme}`;
    // --- DEVELOPING (delayed route) ---
    {
        const { ctx, page, errors } = await newCell(CELLS[0], scheme);
        await routeDelayed(page, 6000);
        await page.goto("/#/browse");
        // catch the skeletons mid-fetch
        await page.waitForSelector('[data-slot="palette-card-skeleton"]', {
            timeout: 5000,
        });
        await page.waitForTimeout(900);
        const bp = pane(page, "Browse");
        const skeletons = await bp
            .locator('[data-slot="palette-card-skeleton"]')
            .filter({ visible: true });
        const n = await skeletons.count();
        const anim = await skeletons.first().evaluate((root) => {
            const seg = root.querySelector(".skeleton-seg") ?? root.querySelector('[data-slot="skeleton"]') ?? root.firstElementChild.firstElementChild;
            const cs = getComputedStyle(seg);
            const after = getComputedStyle(seg, "::after");
            return {
                el: {
                    name: cs.animationName,
                    dur: cs.animationDuration,
                    iter: cs.animationIterationCount,
                },
                after: {
                    name: after.animationName,
                    dur: after.animationDuration,
                    delay: after.animationDelay,
                    iter: after.animationIterationCount,
                },
                role: root.getAttribute("role"),
                label: root.getAttribute("aria-label"),
            };
        });
        const trioDuringLoad = await bp
            .locator('[data-slot="empty-state-trio"]')
            .filter({ visible: true })
            .count();
        log(
            `[${tag}] browse-developing  skeletons=${n} trioDuringLoad=${trioDuringLoad} role=${anim.role} label=${anim.label}`,
        );
        log(
            `[${tag}]   seg anim el={${anim.el.name} ${anim.el.dur} ×${anim.el.iter}} ::after={${anim.after.name} ${anim.after.dur} delay=${anim.after.delay} ×${anim.after.iter}}`,
        );
        await page.screenshot({ path: `${OUT}/${tag}-browse-developing.png` });
        // hand-off: settle to the wall — assert the vj-morph container swapped
        await page.waitForTimeout(6500);
        const cardsAfter = await bp.getByRole("article").count();
        log(`[${tag}]   settle → cards=${cardsAfter} (skeleton→wall hand-off)`);
        log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
        await ctx.close();
    }
    // --- ERROR (unpinned: same-origin /palettes resolves SPA HTML → failure) ---
    {
        const { ctx, page, errors } = await newCell(CELLS[0], scheme);
        await page.goto("/#/browse");
        await settle(page);
        const bp = pane(page, "Browse");
        const alert = await bp.getByRole("alert").filter({ visible: true }).count();
        const msg = await bp.getByText("The commons is unreachable.").count();
        const retry = await bp.getByRole("button", { name: "Retry" }).count();
        const probes = await probeEmptyHost(bp);
        // positive control: the sibling My Palettes keeps its true-empty trio
        const sibling = await probeEmptyHost(pane(page, "My Palettes"));
        log(
            `[${tag}] browse-error  alert=${alert} msg=${msg} retry=${retry} trio=${probes.trioCount} fillers=${probes.fillers} | sibling trio=${sibling.trioCount} strokes=${sibling.strokes}`,
        );
        await page.screenshot({ path: `${OUT}/${tag}-browse-error.png` });
        log(
            `[${tag}] console errors (error leg EXPECTS the loud fetch error): ${errors.length}`,
        );
        await ctx.close();
    }
}

/* ============ LEG 3 — Mix empty + Extract instrument face ============ */
log("=== LEG 3 · Mix + Extract ===");
for (const [cellIdx, scheme] of [[0, "light"], [0, "dark"], [2, "light"]]) {
    const cell = CELLS[cellIdx];
    const tag = `${cell.vp}-${scheme}`;
    const { ctx, page, errors } = await newCell(cell, scheme);
    await routeEmpty(page);
    await page.goto("/#/mix");
    await settle(page);
    const mix = pane(page, "Mix");
    await mix.getByRole("button", { name: "Palettes", exact: true }).click();
    await page.waitForTimeout(400);
    const probes = await probeEmptyHost(mix);
    const eyebrow = await mix.getByText("· nothing to mix ·").count();
    log(
        `[${tag}] mix-empty  trio=${probes.trioCount} ghosts=${probes.ghosts} strokes=${probes.strokes} fillers=${probes.fillers} eyebrow=${eyebrow}`,
    );
    await page.screenshot({ path: `${OUT}/${tag}-mix-empty.png` });
    log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
    await ctx.close();
}
{
    const { ctx, page, errors } = await newCell(CELLS[0], "light");
    await page.goto("/#/extract");
    await settle(page);
    const ex = pane(page, "Extract");
    const ghost = ex.locator('[data-slot="shadow-palette"]').filter({ visible: true });
    const n = await ghost.count();
    const pulse = await ghost.first().evaluate((root) => {
        const segs = Array.from(root.querySelectorAll(".shadow-seg")).map((el) => {
            const cs = getComputedStyle(el);
            return `${cs.animationName}@${cs.animationDelay}`;
        });
        const cs = getComputedStyle(root);
        return {
            segs,
            bg: cs.backgroundColor,
            border: cs.borderTopColor,
            aria: root.getAttribute("aria-hidden"),
            role: root.getAttribute("role"),
        };
    });
    log(
        `[1440-light] extract-face  ghosts=${n} aria-hidden=${pulse.aria} role=${pulse.role} bg=${pulse.bg} border=${pulse.border}`,
    );
    log(`[1440-light]   segs: ${pulse.segs.join(" · ")}`);
    await page.screenshot({ path: `${OUT}/1440-light-extract-face.png` });
    log(`[1440-light] console errors: ${errors.length}`);
    await ctx.close();
}

/* ============ LEG 4 — T-43 the ramp ×2 sites (dropdown) ============ */
log("=== LEG 4 · the ramp ×2 sites ===");
for (const scheme of SCHEMES) {
    const tag = `1440-${scheme}`;
    const { ctx, page, errors } = await newCell(CELLS[0], scheme);
    await routeEmpty(page);
    await page.goto("/#/palettes");
    await settle(page);
    // site 1: the pane title (zoom crop)
    const title = pane(page, "My Palettes").locator(".palettes-ramp-text").first();
    const titleRamp = await probeRamp(title);
    const box = await title.boundingBox();
    if (box)
        await page.screenshot({
            path: `${OUT}/${tag}-ramp-title-zoom.png`,
            clip: {
                x: Math.max(0, box.x - 24),
                y: Math.max(0, box.y - 16),
                width: box.width + 48,
                height: box.height + 32,
            },
        });
    // site 2: the dock view dropdown entry
    const collapsed = page.locator(".glass-dock.collapsed");
    if (await collapsed.count()) await collapsed.click();
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.waitForTimeout(500);
    const entry = page
        .getByRole("option", { name: /Palettes/ })
        .locator(".palettes-ramp-text")
        .first();
    const entryVisible = await entry.count();
    const entryRamp = entryVisible ? await probeRamp(entry) : null;
    // ramp-site census: exactly TWO .palettes-ramp-text in the whole DOM
    const rampSites = await page.locator(".palettes-ramp-text").count();
    log(
        `[${tag}] ramp title: clip=${titleRamp.clip} color=${titleRamp.color} stops=${titleRamp.stops.join(" | ")}`,
    );
    log(
        `[${tag}] ramp dropdown-entry present=${entryVisible} ${entryRamp ? `clip=${entryRamp.clip} stops=${entryRamp.stops.join(" | ")}` : ""}`,
    );
    log(`[${tag}] ramp-site census (DOM-wide .palettes-ramp-text): ${rampSites}`);
    await page.screenshot({ path: `${OUT}/${tag}-ramp-dropdown.png` });
    log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
    await ctx.close();
}

/* ============ LEG 5 — the dialog/detail (seeded + wall) ============ */
log("=== LEG 5 · dialog/detail ===");
for (const scheme of SCHEMES) {
    const tag = `1440-${scheme}`;
    const { ctx, page, errors } = await newCell(CELLS[0], scheme, { seed: true });
    await routeEmpty(page);
    await page.goto("/#/palettes");
    await settle(page);
    // FORENSIC (recorded, first run): with seeded palettes the header count
    // Badge joins the <h3>'s accessible name — "My Palettes2" — so the
    // o9-style `exact:true` pane idiom misses the POPULATED pane. Matched
    // here on /^My Palettes/; the name-growth fact is a filed row.
    const mp = page
        .getByRole("main", { name: "Color tool panes" })
        .locator('[data-slot="card"]')
        .filter({ has: page.getByRole("heading", { name: /^My Palettes/ }) })
        .filter({ visible: true })
        .first();
    const headingName = await page
        .getByRole("heading", { name: /^My Palettes/ })
        .first()
        .evaluate((el) => el.textContent?.trim());
    const cards = await mp.getByRole("article").count();
    const emptyGone = await mp
        .locator('[data-slot="empty-state-trio"]')
        .filter({ visible: true })
        .count();
    log(`[${tag}] mypalettes-populated  heading="${headingName}" cards=${cards} trio=${emptyGone} (trio must be 0 when populated)`);
    // card title voice probe (T-15/O-10d: display voice on the card name)
    const nameVoice = await mp
        .getByRole("article", { name: "Palette: Harvest Table" })
        .first()
        .evaluate((el) => {
            const name = Array.from(el.querySelectorAll("*")).find(
                (n) => n.textContent?.trim() === "Harvest Table" && n.children.length === 0,
            );
            if (!name) return null;
            const cs = getComputedStyle(name);
            return { family: cs.fontFamily.split(",")[0], size: cs.fontSize, weight: cs.fontWeight };
        });
    log(`[${tag}]   card name voice: ${JSON.stringify(nameVoice)}`);
    await page.screenshot({ path: `${OUT}/${tag}-mypalettes-populated.png` });

    // expanded card detail
    const card = mp.getByRole("article", { name: "Palette: Harvest Table" }).first();
    await card.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/${tag}-card-expanded.png` });

    // card menu (the detail actions popover)
    const menuBtn = card.getByRole("button", { name: "Palette menu" }).first();
    if (await menuBtn.count()) {
        await menuBtn.click();
        await page.waitForTimeout(500);
        const menu = page.getByRole("menu").filter({ visible: true });
        const items = await menu.getByRole("menuitem").allTextContents().catch(() => []);
        const mat = (await menu.count())
            ? await menu.first().evaluate((el) => {
                  const cs = getComputedStyle(el);
                  return { bg: cs.backgroundColor, blur: cs.backdropFilter, radius: cs.borderTopLeftRadius };
              })
            : null;
        log(`[${tag}] card-menu open  items=[${items.join(" · ")}] mat=${JSON.stringify(mat)}`);
        await page.screenshot({ path: `${OUT}/${tag}-card-menu.png` });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
    } else {
        log(`[${tag}]   card menu trigger NOT FOUND by role probe (recorded)`);
    }

    // delete-all ConfirmDialog
    const del = mp.getByRole("button", { name: "Delete all saved palettes" });
    if (await del.count()) {
        await del.click();
        await page.waitForTimeout(600);
        const dlg = page.getByRole("alertdialog").or(page.getByRole("dialog"));
        const dlgCount = await dlg.count();
        log(`[${tag}] delete-all dialog present=${dlgCount}`);
        await page.screenshot({ path: `${OUT}/${tag}-deleteall-dialog.png` });
        await page.keyboard.press("Escape");
    }
    log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
    await ctx.close();
}

/* ============ LEG 6 — forensics: dashes · composited eyebrow · weights ===== */
log("=== LEG 6 · forensics ===");
for (const scheme of SCHEMES) {
    const tag = `1440-${scheme}`;
    const { ctx, page, errors } = await newCell(CELLS[0], scheme);
    await routeEmpty(page);
    await page.goto("/#/palettes");
    await settle(page);
    const mp = pane(page, "My Palettes");

    // (a) THE DASH WITNESS — the producer D4 recipe: a dashed CSS border on
    // the stroke div, clipped to the seeded silhouette (NOT an SVG stroke).
    const dash = await mp
        .locator('[data-slot="empty-state-trio"]')
        .first()
        .evaluate((el) => {
            const s = el.querySelector(".watercolor-ghost-stroke");
            const cs = getComputedStyle(s);
            const root = getComputedStyle(document.documentElement);
            return {
                borderStyle: cs.borderTopStyle,
                borderWidth: cs.borderTopWidth,
                borderColor: cs.borderTopColor,
                radius: cs.borderRadius.slice(0, 60),
                filter: cs.filter === "none" ? "none" : "feDisplacement(wet)",
                accentLive: root.getPropertyValue("--accent-live").trim(),
            };
        });
    log(`[${tag}] dash witness: ${JSON.stringify(dash)}`);

    // (b) THE COMPOSITED EYEBROW GROUND — pixel-sample the rendered ground
    // beside the eyebrow text (true compositing: card α over aurora), then
    // WCAG vs the text ink. Replaces the alpha-blind leg-1 approximation.
    const eyebrowEl = mp.getByText("· empty plate ·").first();
    const eb = await eyebrowEl.boundingBox();
    const fg = await eyebrowEl.evaluate((el) => getComputedStyle(el).color);
    const clip = {
        x: Math.round(eb.x - 70),
        y: Math.round(eb.y),
        width: 56,
        height: Math.round(eb.height),
    };
    const buf = await page.screenshot({ clip });
    const ground = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        let r = 0,
            gg = 0,
            b = 0,
            n = d.length / 4;
        for (let i = 0; i < d.length; i += 4) {
            r += d[i];
            gg += d[i + 1];
            b += d[i + 2];
        }
        return `rgb(${Math.round(r / n)}, ${Math.round(gg / n)}, ${Math.round(b / n)})`;
    }, buf.toString("base64"));
    log(
        `[${tag}] eyebrow COMPOSITED: ink=${fg} ground=${ground} → ${wcag(fg, ground)}:1 (pixel-sampled)`,
    );
    // same read for the display line + hint
    for (const [label, txt] of [
        ["display-line", "No saved palettes yet."],
        ["hint", "Add colors above, then save the set."],
    ]) {
        const el = mp.getByText(txt).first();
        const fg2 = await el.evaluate((e) => getComputedStyle(e).color);
        log(`[${tag}] ${label} ink=${fg2} vs same ground → ${wcag(fg2, ground)}:1`);
    }

    // (c) the trio zoom frame (light only)
    if (scheme === "light") {
        const trio = mp.locator('[data-slot="empty-state-trio"]').first();
        const tb = await trio.boundingBox();
        if (tb)
            await page.screenshot({
                path: `${OUT}/1440-light-trio-zoom.png`,
                clip: {
                    x: Math.max(0, tb.x - 40),
                    y: Math.max(0, tb.y - 24),
                    width: tb.width + 80,
                    height: tb.height + 110,
                },
            });
    }

    // (d) the view-dropdown Palettes entry WEIGHT (owner: options never bold)
    const collapsed = page.locator(".glass-dock.collapsed");
    if (await collapsed.count()) await collapsed.click();
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.waitForTimeout(500);
    const w = await page
        .getByRole("option", { name: /Palettes/ })
        .locator(".palettes-ramp-text")
        .first()
        .evaluate((el) => getComputedStyle(el).fontWeight);
    log(`[${tag}] dropdown Palettes-entry weight: ${w}`);
    await page.keyboard.press("Escape");
    log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
    await ctx.close();
}

await browser.close();
writeFileSync(
    "docs/tranches/T/audit/pi/w8/w8-palettes-probe-log.txt",
    report.join("\n") + "\n",
);
log("DONE");
