/**
 * T.W8 · CRITIQUE PASS 9 (dock + nav + menus) — the live-drive probe (O-3
 * class; PROBE-ONLY, no writes to the app tree). Drives the LANE server
 * :8680 (VJS_E2E_PORT; PERF_PORT 8681 reserved unused) — the owner's :9000
 * is never touched. Headed real-GPU Chromium, dpr 2.
 *
 * Legs:
 *   1 · THE 6-CELL DOCK-AT-REST MATRIX (1440/768/390 × light/dark): band
 *       frames + the Tools trigger box-model census (T-36 re-judge) + the
 *       settle-stamp clip state (T-29 re-judge).
 *   2 · THE VIEW DROPDOWN MENU VOICE (T-10/T-43/Q5 + T-40 constraint):
 *       option census — computed weight, ramp membership (ONLY Palettes),
 *       icon+ink voice; 1440 both schemes + 390 no-clip.
 *   3 · TOOLS HOVER/ACTIVE (T-29/T-36): hover capsule + shadow WHOLE at
 *       settled rest; active layer swap; band-height across states (T-57).
 *   4 · THE COLLAPSED SEAL (T-37): auto-collapse; wax-vs-field pixel-sampled
 *       figure/ground (OKLab ΔL + WCAG) over the SELF-DERIVED field, both
 *       schemes; O-15a border-style re-read.
 *   5 · T-52 INLINE-EDGE CLIP FORENSIC (§0.7 owner-ordered routing
 *       question): the Gradient trigger at rest — clipping-ancestor walk +
 *       ring-extent vs clip-box arithmetic + dpr2 zoom crops.
 *   6 · T-17 PREVIEW CHIPS (generate preset/harmony menus): PreviewStrip
 *       presence, proportion (φ² plate), stops census; + the letterforms
 *       dropdown (T-40 weight pin + T-10 negative control: NOT rainbow).
 *   7 · T-20 TABS PILLING (PaneSegmentedControl @390): trigger fill vs
 *       track, inter-trigger gap, indicator≡active-box delta (the P4
 *       producer packet's live re-measure).
 *   8 · PROFILE + MOBILE MENUS: Login/@mbabb menus @1440, ⋮ menu @390 —
 *       chrome register + ink reads.
 *   9 · T-57 EXPANSION REFLOW (§0.7): scene top Y across collapsed ↔
 *       expanded ↔ action-bar states — does expansion shift the UI down?
 *
 * PNGs are gitignored-by-class (the standing convention); this script + the
 * log txt are the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8680";
const OUT = "docs/tranches/T/audit/pi/w8/dock";
mkdirSync(OUT, { recursive: true });

const OWNER_COLOR = "lab(38%25 32 24)"; // the owner reference (O-18 literal), URL-encoded %
const HOME = (extra = "") => `${BASE}/#/?space=lab&color=${OWNER_COLOR}${extra}`;

const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => { console.log(s); report.push(s); };

const CELLS = [
    { vp: "1440", width: 1440, height: 900 },
    { vp: "768", width: 768, height: 1024 },
    { vp: "390", width: 390, height: 844 },
];
const SCHEMES = ["light", "dark"];

// ── color math (Node-side): sRGB8 → WCAG relative luminance + OKLab L ──
const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const wcag = (a, b) => { const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const oklabL = ([r, g, b]) => {
    const [lr, lg, lb] = [lin(r), lin(g), lin(b)];
    const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
    return 0.2104542553 * Math.cbrt(l) + 0.793617785 * Math.cbrt(m) - 0.0040720468 * Math.cbrt(s);
};

// screenshot-clip → in-page canvas decode → pixel rows (the composited
// truth, not the alpha-blind computed read)
async function samplePixels(page, clip, points) {
    const buf = await page.screenshot({ clip });
    const b64 = buf.toString("base64");
    return await page.evaluate(
        async ({ b64, points }) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.naturalWidth; c.height = img.naturalHeight;
            const ctx = c.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            const scale = img.naturalWidth / (points.w ?? 1);
            return points.pts.map(([x, y]) => {
                const d = ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data;
                return [d[0], d[1], d[2]];
            });
        },
        { b64, points },
    );
}

const consoleErrors = [];
async function newPage(ctx, tag) {
    const page = await ctx.newPage();
    page.on("console", (m) => {
        if (m.type() === "error") consoleErrors.push(`[${tag}] ${m.text().slice(0, 200)}`);
    });
    page.on("pageerror", (e) => consoleErrors.push(`[${tag}] PAGEERROR ${String(e).slice(0, 200)}`));
    return page;
}

async function settle(page, ms = 2400) {
    await page.waitForSelector(".dock-band", { timeout: 15000 });
    await page.waitForTimeout(ms); // the overture settles ≤1.7s (Q2 bracket)
}

const box = (l) => l.boundingBox();
const css = (loc, props) =>
    loc.evaluate((el, props) => {
        const s = getComputedStyle(el);
        return Object.fromEntries(props.map((p) => [p, s.getPropertyValue(p)]));
    }, props);

for (const scheme of SCHEMES) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: scheme,
    });

    // ── Leg 1 + 3 + 9 · 1440 cell: rest frame, Tools census, hover, layers, reflow ──
    {
        const tag = `1440-${scheme}`;
        const page = await newPage(ctx, tag);
        await page.goto(HOME());
        await settle(page);
        await page.screenshot({ path: `${OUT}/${tag}-dock-rest.png` });

        const band = page.locator(".dock-band");
        const bandBox = await box(band);
        const sceneTop0 = (await box(page.locator(".pane-container")))?.y;

        // Tools trigger box-model (T-36)
        const tools = page.locator('[aria-label="Toggle action bar"]');
        const toolsVisible = await tools.isVisible().catch(() => false);
        log(`\n[${tag}] band=${JSON.stringify(bandBox)} sceneTop=${sceneTop0} toolsVisible=${toolsVisible}`);
        if (toolsVisible) {
            const tb = await box(tools);
            const tc = await css(tools, ["padding", "margin", "gap", "border-radius", "height"]);
            const inner = page.locator(".action-bar-toggle-inner");
            const ic = await css(inner, ["overflow"]);
            const slotCls = await page.locator(".action-bar-toggle-slot").getAttribute("class");
            log(`[${tag}] T-36 tools box=${Math.round(tb.width)}x${Math.round(tb.height)} padding=${tc.padding} margin=${tc.margin} gap=${tc.gap} radius=${tc["border-radius"]}`);
            log(`[${tag}] T-29 inner overflow(rest)=${ic.overflow} slotClass="${slotCls}"`);

            // hover — capsule + shadow whole (frame is the eye evidence)
            await tools.hover();
            await page.waitForTimeout(450);
            const tb2 = await box(tools);
            const crop = { x: Math.max(0, tb2.x - 40), y: Math.max(0, tb2.y - 40), width: tb2.width + 80, height: tb2.height + 80 };
            await page.screenshot({ path: `${OUT}/${tag}-tools-hover-zoom.png`, clip: crop });
            const shadow = await css(tools, ["box-shadow", "transform"]);
            log(`[${tag}] T-29 tools hover shadow=${shadow["box-shadow"].slice(0, 90)} transform=${shadow.transform}`);

            // active layer swap (T-57 interaction: band height + scene top)
            await tools.click();
            await page.waitForTimeout(650);
            const bandBar = await box(band);
            const sceneTopBar = (await box(page.locator(".pane-container")))?.y;
            await page.screenshot({ path: `${OUT}/${tag}-actionbar-layer.png` });
            log(`[${tag}] T-57 action-bar layer: band h ${Math.round(bandBox.height)}→${Math.round(bandBar.height)} · sceneTop ${sceneTop0}→${sceneTopBar}`);
            await page.locator('[aria-label="Back"]').click();
            await page.waitForTimeout(500);
        }

        // ── Leg 4 · the collapsed seal (T-37) — park mouse, wait out collapse-delay 5000 ──
        await page.mouse.move(720, 880);
        await page.waitForTimeout(7000);
        const seal = page.locator(".dock-seal");
        const sealVisible = await seal.isVisible().catch(() => false);
        log(`[${tag}] seal visible after idle=${sealVisible}`);
        if (sealVisible) {
            const sb = await box(seal);
            const sealCss = await css(seal, ["border-style", "border-width"]);
            const bandCollapsed = await box(band);
            const sceneTopCollapsed = (await box(page.locator(".pane-container")))?.y;
            log(`[${tag}] O-15a seal border-style=${sealCss["border-style"]} width=${sealCss["border-width"]}`);
            log(`[${tag}] T-57 collapsed: band h=${Math.round(bandCollapsed.height)} sceneTop=${sceneTopCollapsed} (rest was ${sceneTop0})`);
            // figure/ground: wax center-ring samples vs field ring samples
            const cx = sb.x + sb.width / 2, cy = sb.y + sb.height / 2, r = sb.width / 2;
            const clip = { x: cx - r * 3, y: Math.max(0, cy - r * 2.2), width: r * 6, height: r * 4.4 };
            const P = { w: clip.width, pts: [] };
            // wax at 0.55r–0.8r radius, 8 spokes (avoid the 55% inked glyph)
            for (let i = 0; i < 8; i++) {
                const a = (i / 8) * 2 * Math.PI;
                P.pts.push([cx - clip.x + Math.cos(a) * r * 0.72, cy - clip.y + Math.sin(a) * r * 0.72]);
            }
            // field at 1.8r, 8 spokes
            for (let i = 0; i < 8; i++) {
                const a = (i / 8) * 2 * Math.PI;
                P.pts.push([cx - clip.x + Math.cos(a) * r * 1.8, cy - clip.y + Math.sin(a) * r * 1.8]);
            }
            const px = await samplePixels(page, clip, P);
            const wax = px.slice(0, 8), field = px.slice(8);
            const mean = (arr) => arr.reduce((s, p) => s.map((v, i) => v + p[i] / arr.length), [0, 0, 0]).map(Math.round);
            const mw = mean(wax), mf = mean(field);
            log(`[${tag}] T-37 wax mean rgb(${mw}) L=${oklabL(mw).toFixed(3)} · field mean rgb(${mf}) L=${oklabL(mf).toFixed(3)} · ΔL=${Math.abs(oklabL(mw) - oklabL(mf)).toFixed(3)} · WCAG=${wcag(mw, mf).toFixed(2)}:1`);
            await page.screenshot({ path: `${OUT}/${tag}-seal-zoom.png`, clip });
            await page.screenshot({ path: `${OUT}/${tag}-dock-collapsed.png` });

            // re-expand (T-57 core measure: does expansion shift the scene?)
            await page.mouse.move(cx, cy);
            await page.waitForTimeout(900);
            const bandExp = await box(band);
            const sceneTopExp = (await box(page.locator(".pane-container")))?.y;
            log(`[${tag}] T-57 re-expanded: band h=${Math.round(bandExp.height)} sceneTop=${sceneTopExp} · Δscene(collapsed→expanded)=${(sceneTopExp - sceneTopCollapsed).toFixed(1)}px`);
        }
        await page.close();
    }

    // ── Leg 2 · the view dropdown (T-10/T-43/T-40) @1440 ──
    {
        const tag = `1440-${scheme}`;
        const page = await newPage(ctx, `${tag}-menu`);
        await page.goto(HOME());
        await settle(page);
        await page.locator('[aria-label="Select view"]').click();
        await page.waitForTimeout(600);
        const opts = page.locator('[role="option"]');
        const n = await opts.count();
        log(`\n[${tag}] view menu: ${n} options`);
        for (let i = 0; i < n; i++) {
            const o = opts.nth(i);
            const text = (await o.innerText()).trim().replace(/\n/g, " ");
            const probe = await o.evaluate((el) => {
                const label = el.querySelector("span span:last-child") ?? el;
                const s = getComputedStyle(label);
                return {
                    weight: s.fontWeight,
                    bgImage: s.backgroundImage === "none" ? "none" : "RAMP",
                    clip: s.webkitBackgroundClip || s.backgroundClip,
                    color: s.color,
                    family: s.fontFamily.split(",")[0],
                    hasIcon: !!el.querySelector("svg"),
                };
            });
            log(`[${tag}]   opt "${text}" weight=${probe.weight} bg=${probe.bgImage} clip=${probe.clip} ink=${probe.color} font=${probe.family} icon=${probe.hasIcon}`);
        }
        const menuBox = await box(page.locator('[role="listbox"]').first());
        const clip = menuBox ? { x: Math.max(0, menuBox.x - 24), y: Math.max(0, menuBox.y - 60), width: menuBox.width + 48, height: Math.min(900 - Math.max(0, menuBox.y - 60), menuBox.height + 84) } : undefined;
        await page.screenshot({ path: `${OUT}/${tag}-view-menu.png`, ...(clip ? { clip } : {}) });
        await page.close();
    }

    // ── Leg 5 · T-52 the Gradient trigger inline-edge clip forensic @1440 ──
    {
        const tag = `1440-${scheme}`;
        const page = await newPage(ctx, `${tag}-t52`);
        await page.goto(`${BASE}/#/gradient?space=lab&color=${OWNER_COLOR}`);
        await settle(page);
        const trig = page.locator('[aria-label="Select view"]');
        const tb = await box(trig);
        const forensic = await trig.evaluate((el) => {
            const out = { ancestors: [], ring: null };
            const s = getComputedStyle(el);
            out.ring = {
                boxShadow: s.boxShadow.slice(0, 160),
                outline: `${s.outlineStyle} ${s.outlineWidth}`,
                border: `${s.borderStyle} ${s.borderWidth}`,
                dockRing: s.getPropertyValue("--dock-ring"),
                rect: el.getBoundingClientRect().toJSON(),
            };
            let a = el.parentElement;
            while (a && a !== document.body) {
                const cs = getComputedStyle(a);
                if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible" || cs.clipPath !== "none" || cs.maskImage !== "none" || cs.contain.includes("paint")) {
                    out.ancestors.push({
                        tag: a.tagName,
                        cls: (a.className?.baseVal ?? a.className ?? "").toString().slice(0, 90),
                        overflow: `${cs.overflowX}/${cs.overflowY}`,
                        clipPath: cs.clipPath === "none" ? undefined : cs.clipPath.slice(0, 60),
                        mask: cs.maskImage === "none" ? undefined : "mask",
                        contain: cs.contain || undefined,
                        rect: a.getBoundingClientRect().toJSON(),
                        radius: cs.borderRadius,
                    });
                }
                a = a.parentElement;
            }
            return out;
        });
        log(`\n[${tag}] T-52 gradient-trigger ring: shadow=${forensic.ring.boxShadow}`);
        log(`[${tag}] T-52 trigger rect x=[${forensic.ring.rect.left.toFixed(1)}, ${forensic.ring.rect.right.toFixed(1)}]`);
        for (const anc of forensic.ancestors)
            log(`[${tag}] T-52 clipping ancestor <${anc.tag} ${anc.cls}> overflow=${anc.overflow} clip=${anc.clipPath ?? "-"} mask=${anc.mask ?? "-"} contain=${anc.contain ?? "-"} x=[${anc.rect.left.toFixed(1)}, ${anc.rect.right.toFixed(1)}] r=${anc.radius}`);
        if (tb) {
            const crop = { x: Math.max(0, tb.x - 30), y: Math.max(0, tb.y - 30), width: tb.width + 60, height: tb.height + 60 };
            await page.screenshot({ path: `${OUT}/${tag}-t52-gradient-trigger-zoom.png`, clip: crop });
        }
        await page.close();
    }

    // ── Leg 6 · T-17 chips (generate menus) + letterforms dropdown ──
    {
        const tag = `1440-${scheme}`;
        const page = await newPage(ctx, `${tag}-chips`);
        await page.goto(`${BASE}/#/generate?space=lab&color=${OWNER_COLOR}`);
        await settle(page);
        for (const [sel, name] of [
            ['[aria-label="Generation preset"]', "preset"],
            ['[aria-label="Color harmony"]', "harmony"],
        ]) {
            const trig = page.locator(sel);
            if (!(await trig.isVisible().catch(() => false))) { log(`[${tag}] T-17 ${name} trigger NOT visible`); continue; }
            await trig.click();
            await page.waitForTimeout(600);
            const chips = page.locator('[role="option"] .preview-strip');
            const rows = await page.locator('[role="option"]').count();
            const nChips = await chips.count();
            let chipInfo = "";
            if (nChips) {
                chipInfo = await chips.first().evaluate((el) => {
                    const r = el.getBoundingClientRect();
                    const s = getComputedStyle(el);
                    return `${r.width.toFixed(1)}x${r.height.toFixed(1)}px radius=${s.borderRadius} segs=${el.children.length} stops="${(el.dataset.stops ?? "").slice(0, 60)}…"`;
                });
            }
            log(`[${tag}] T-17 ${name} menu: rows=${rows} chips=${nChips} first: ${chipInfo}`);
            const mb = await box(page.locator('[role="listbox"]').first());
            if (mb) await page.screenshot({ path: `${OUT}/${tag}-${name}-menu.png`, clip: { x: Math.max(0, mb.x - 16), y: Math.max(0, mb.y - 16), width: mb.width + 32, height: mb.height + 32 } });
            await page.keyboard.press("Escape");
            await page.waitForTimeout(300);
        }
        // the letterforms dropdown (T-40 pin + T-10 negative control)
        await page.goto(HOME());
        await settle(page);
        const spaceTrig = page.locator(".space-trigger").first();
        if (await spaceTrig.isVisible().catch(() => false)) {
            await spaceTrig.click();
            await page.waitForTimeout(600);
            const names = page.locator('[role="option"] .specimen-name');
            const nn = await names.count();
            const weights = new Set();
            let ramps = 0;
            for (let i = 0; i < nn; i++) {
                const p = await names.nth(i).evaluate((el) => {
                    const s = getComputedStyle(el);
                    return { w: s.fontWeight, bg: s.backgroundImage !== "none" };
                });
                weights.add(p.w);
                if (p.bg) ramps++;
            }
            log(`[${tag}] T-40 letterforms menu: ${nn} options weights={${[...weights]}} rampCount=${ramps} (T-10 negative control)`);
            const mb = await box(page.locator('[role="listbox"]').first());
            if (mb) await page.screenshot({ path: `${OUT}/${tag}-letterforms-menu.png`, clip: { x: Math.max(0, mb.x - 16), y: Math.max(0, mb.y - 16), width: mb.width + 32, height: Math.min(mb.height + 32, 860) } });
            await page.keyboard.press("Escape");
        } else log(`[${tag}] letterforms trigger NOT visible`);
        await page.close();
    }

    // ── Leg 8 · profile menus @1440 ──
    {
        const tag = `1440-${scheme}`;
        const page = await newPage(ctx, `${tag}-profile`);
        await page.goto(HOME());
        await settle(page);
        // Login (profile) menu — trigger text or aria; probe by role=button in ProfileSection
        const login = page.getByRole("button", { name: /log ?in|profile|account/i }).first();
        if (await login.isVisible().catch(() => false)) {
            await login.click();
            await page.waitForTimeout(550);
            await page.screenshot({ path: `${OUT}/${tag}-profile-menu.png` });
            const menu = page.locator('[role="menu"], [data-reka-popper-content-wrapper]').last();
            if (await menu.isVisible().catch(() => false)) {
                const inks = await menu.evaluate((el) => {
                    const s = getComputedStyle(el);
                    return { bf: s.backdropFilter, bg: s.backgroundColor, radius: s.borderRadius };
                });
                log(`\n[${tag}] profile menu material: ${JSON.stringify(inks)}`);
            }
            await page.keyboard.press("Escape");
        } else log(`\n[${tag}] login trigger not found by role`);
        await page.close();
    }

    // ── Leg 1/2/7 · 768 + 390 cells ──
    for (const cell of CELLS.slice(1)) {
        const tag = `${cell.vp}-${scheme}`;
        const page = await newPage(ctx, tag);
        await page.setViewportSize({ width: cell.width, height: cell.height });
        await page.goto(HOME());
        await settle(page);
        await page.screenshot({ path: `${OUT}/${tag}-dock-rest.png` });
        const band = await box(page.locator(".dock-band"));
        log(`\n[${tag}] band=${band ? `${Math.round(band.width)}x${Math.round(band.height)} @y${Math.round(band.y)}` : "MISSING"}`);

        // view menu at this cell (no-clip rule)
        await page.locator('[aria-label="Select view"]').click();
        await page.waitForTimeout(600);
        const list = page.locator('[role="listbox"]').first();
        if (await list.isVisible().catch(() => false)) {
            const lb = await box(list);
            const clipped = lb.x < 0 || lb.y < 0 || lb.x + lb.width > cell.width || lb.y + lb.height > cell.height;
            log(`[${tag}] view menu box=${Math.round(lb.width)}x${Math.round(lb.height)} @(${Math.round(lb.x)},${Math.round(lb.y)}) viewport-clipped=${clipped}`);
            await page.screenshot({ path: `${OUT}/${tag}-view-menu.png` });
        }
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);

        // T-20 tabs (the mobile pane toggle) — probe where visible
        const tabs = page.locator(".pane-segmented-control");
        if (await tabs.isVisible().catch(() => false)) {
            const geo = await tabs.evaluate((el) => {
                const track = el.querySelector('[role="tablist"]') ?? el.firstElementChild;
                const btns = [...el.querySelectorAll('[role="tab"], button')];
                const ind = el.querySelector('[data-indicator], .segmented-indicator, [class*="indicator"]');
                const r = (x) => { const b = x.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
                const ts = getComputedStyle(track);
                return {
                    track: r(track), trackPad: ts.padding, trackGap: ts.gap, trackRadius: ts.borderRadius,
                    btns: btns.map((b) => ({ ...r(b), active: b.getAttribute("aria-selected") ?? b.dataset.state, radius: getComputedStyle(b).borderRadius })),
                    indicator: ind ? { ...r(ind), radius: getComputedStyle(ind).borderRadius } : null,
                };
            });
            log(`[${tag}] T-20 tabs: track=${JSON.stringify(geo.track)} pad=${geo.trackPad} gap=${geo.trackGap} r=${geo.trackRadius}`);
            geo.btns.forEach((b, i) => log(`[${tag}] T-20   btn${i} ${JSON.stringify(b)}`));
            if (geo.indicator) {
                log(`[${tag}] T-20   indicator ${JSON.stringify(geo.indicator)}`);
                const act = geo.btns.find((b) => b.active === "true" || b.active === "active");
                if (act) {
                    const d = { dx: (geo.indicator.x - act.x).toFixed(1), dy: (geo.indicator.y - act.y).toFixed(1), dw: (geo.indicator.w - act.w).toFixed(1), dh: (geo.indicator.h - act.h).toFixed(1) };
                    log(`[${tag}] T-20   indicator−active deltas ${JSON.stringify(d)} (O-8 ε ≤ 0.5px/edge)`);
                }
            }
            const tb2 = await box(tabs);
            await page.screenshot({ path: `${OUT}/${tag}-tabs-zoom.png`, clip: { x: Math.max(0, tb2.x - 12), y: Math.max(0, tb2.y - 12), width: tb2.width + 24, height: tb2.height + 24 } });
        } else log(`[${tag}] T-20 tabs not visible at this cell`);

        // 390: the ⋮ mobile menu
        if (cell.vp === "390") {
            const dots = page.getByRole("button", { name: /more|menu|options/i }).first();
            if (await dots.isVisible().catch(() => false)) {
                await dots.click();
                await page.waitForTimeout(550);
                await page.screenshot({ path: `${OUT}/${tag}-mobile-menu.png` });
                await page.keyboard.press("Escape");
            } else log(`[${tag}] mobile ⋮ menu trigger not found by role`);
        }
        await page.close();
    }

    await ctx.close();
}

log(`\n=== CONSOLE ERRORS (${consoleErrors.length}) ===`);
consoleErrors.forEach((e) => log(e));

writeFileSync(`${OUT}/w8-dock-probe-log.txt`, report.join("\n") + "\n");
await browser.close();
console.log("DONE");
