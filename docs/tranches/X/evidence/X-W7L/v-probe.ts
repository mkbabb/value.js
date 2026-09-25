// SERVED MODEL: claude-opus-5-5 — X.W7L.v instrument
// X.W7L.v — bounded headed real-GPU re-read, on served :9000 at glass 10.1.0, of every glass-owned
// value.js row and every AUDIT-2-value row with a glass half (§5.2 parsimony: one session per run).
// Reuses the X-W7R.v probe (cartoon cascade, dock plate, blob idle, dock morph) and adds the rows
// X-W7R did not read. Usage: node v-probe.ts <origin> <outJson>
import { chromium, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { decodePng, meanAbsDiff } from "../../../../../e2e/smoke/fixtures/frame-diff.ts";

const [origin = "http://localhost:9000", out = "v-probe.json"] = process.argv.slice(2);
const res: Record<string, any> = { origin, at: new Date().toISOString() };
const browser = await chromium.launch({ channel: "chromium", headless: false });
const errors: string[] = [];
const settle = (p: Page, ms: number) => p.waitForTimeout(ms);

async function boot(p: Page, path = "/") {
    p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
    await p.goto(origin + path);
    await p.locator("main").first().waitFor({ state: "visible", timeout: 30000 });
}

// Walk every stylesheet (incl. @import / @layer / @media) and count rules whose text matches.
const cascadeCount = (p: Page, needles: string[]) =>
    p.evaluate((needles) => {
        const hits: Record<string, number> = Object.fromEntries(needles.map((n) => [n, 0]));
        const walk = (rules: CSSRuleList) => {
            for (const r of Array.from(rules)) {
                const t = (r as CSSStyleRule).selectorText ?? "";
                const txt = r.cssText;
                for (const n of needles) if ((n.startsWith(".") ? t : txt).includes(n) && !(r as CSSGroupingRule).cssRules?.length) hits[n]++;
                const inner = (r as CSSGroupingRule).cssRules;
                if (inner) walk(inner);
                const imp = (r as CSSImportRule).styleSheet;
                if (imp) try { walk(imp.cssRules); } catch {}
            }
        };
        for (const s of Array.from(document.styleSheets)) try { walk(s.cssRules); } catch {}
        return hits;
    }, needles);

const box = (p: Page, sel: string) =>
    p.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    }, sel);

// ── A. desktop 1440×900 light (the X-W7R.v reads, plus O-63, O-66, O-65, O-80, O-67, L3-3) ──
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await boot(page);
    const blob = page.locator('[data-testid="goo-blob-canvas"]').last();
    await blob.waitFor({ state: "attached", timeout: 20000 });
    await settle(page, 8000); // emerge + park settle
    res.renderer = await page.evaluate(() => {
        const gl = document.createElement("canvas").getContext("webgl2");
        const ext = gl?.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl!.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "n/a";
    });
    res.glassVersionServed = await page.evaluate(() => document.documentElement.outerHTML.match(/glass-ui[@/](\d+\.\d+\.\d+)/)?.[1] ?? null);
    // O-57 R-2
    res.cartoon = await cascadeCount(page, [".cartoon-cast", ".cartoon-surface"]);
    // L2-12 (glass half): any env(safe-area-inset-*) in the served cascade
    res.safeAreaRules = await cascadeCount(page, ["safe-area-inset"]);
    res.safeAreaSources = await page.evaluate(() => {
        const out: string[] = [];
        const walk = (rules: CSSRuleList, href: string) => { for (const r of Array.from(rules)) { const inner = (r as CSSGroupingRule).cssRules; if (inner?.length) walk(inner, href); else if (r.cssText.includes("safe-area-inset")) out.push(href.split("/").slice(-3).join("/").slice(0, 90) + " :: " + ((r as CSSStyleRule).selectorText ?? r.cssText).slice(0, 80)); } };
        for (const s of Array.from(document.styleSheets)) try { walk(s.cssRules, s.href ?? (s.ownerNode as HTMLElement)?.getAttribute?.("data-vite-dev-id") ?? "inline"); } catch {}
        return out;
    });
    // O-62 GLASS-VEIL-GREY
    const plate = () => page.evaluate(() => {
        const el = document.querySelector(".dock-plate");
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { bg: cs.backgroundColor, backdrop: cs.backdropFilter };
    });
    res.dockPlateLight = await plate();
    // O-56 G-3 blob idle
    await page.mouse.move(5, 895);
    const shots = [] as ReturnType<typeof decodePng>[];
    for (let i = 0; i < 4; i++) { shots.push(decodePng(await blob.screenshot())); await settle(page, 1000); }
    res.blobIdleDiffs = shots.slice(1).map((s, i) => +meanAbsDiff(shots[i], s).toFixed(3));
    // O-63 DOCK-TRIGGER-CLIP: the dock row's clip and the room a hovered/focused trigger has inside it.
    { const d0 = (await box(page, ".glass-dock"))!; await page.mouse.move(d0.x + d0.w / 2, d0.y + d0.h / 2); await settle(page, 900); }
    // the first hit-testable dock trigger, preferring the owner frame's Home
    const pick = await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll(".glass-dock a, .glass-dock button")) as HTMLElement[];
        const live = all.filter((e) => { const r = e.getBoundingClientRect(); if (r.width < 4) return false; const h = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return !!h && e.contains(h); });
        const t = live.find((e) => /home/i.test(e.getAttribute("aria-label") ?? e.textContent ?? "")) ?? live[0];
        t?.setAttribute("data-w7lv", "t");
        return t ? (t.getAttribute("aria-label") ?? t.textContent?.trim().slice(0, 20)) : null;
    });
    await page.locator('[data-w7lv="t"]').hover();
    await settle(page, 400);
    res.o63 = await page.evaluate(() => {
        const t = document.querySelector('[data-w7lv="t"]') as HTMLElement;
        let row: HTMLElement | null = t.parentElement;
        while (row && !/(auto|hidden|clip|scroll)/.test(getComputedStyle(row).overflowX + getComputedStyle(row).overflowY)) row = row.parentElement;
        const tr = t.getBoundingClientRect();
        const rr = row?.getBoundingClientRect();
        const cs = getComputedStyle(t);
        const rs = row ? getComputedStyle(row) : null;
        return {
            trigger: { label: t.getAttribute("aria-label") ?? t.textContent?.trim().slice(0, 20), h: tr.height, top: tr.top, bottom: tr.bottom, boxShadow: cs.boxShadow, outline: `${cs.outlineWidth} ${cs.outlineOffset}` },
            clipRow: row ? { cls: row.className.toString().slice(0, 60), overflow: `${rs!.overflowX} ${rs!.overflowY}`, padBlock: `${rs!.paddingTop} ${rs!.paddingBottom}`, top: rr!.top, bottom: rr!.bottom } : null,
            roomAbove: rr ? +(tr.top - rr.top).toFixed(2) : null,
            roomBelow: rr ? +(rr.bottom - tr.bottom).toFixed(2) : null,
        };
    });
    const db = (await box(page, ".glass-dock"))!;
    await page.screenshot({ path: out.replace(/\.json$/, "-o63-hover.png"), clip: { x: Math.max(0, db.x - 12), y: Math.max(0, db.y - 12), width: Math.min(1440, db.w + 24), height: db.h + 24 } });
    await page.locator('[data-w7lv="t"]').click();
    await settle(page, 500);
    res.o63.selectOpenRoom = await page.evaluate(() => { const t = document.querySelector('[data-w7lv="t"]')!.getBoundingClientRect(); return { top: t.top, bottom: t.bottom, state: document.querySelector('[data-w7lv="t"]')!.getAttribute("data-state") ?? document.querySelector('[data-w7lv="t"]')!.getAttribute("aria-expanded") }; });
    await page.screenshot({ path: out.replace(/\.json$/, "-o63-select.png"), clip: { x: Math.max(0, db.x - 12), y: Math.max(0, db.y - 12), width: Math.min(1440, db.w + 24), height: db.h + 24 } });
    await page.keyboard.press("Escape");
    await settle(page, 400);
    res.o63.focusRing = await page.evaluate(() => {
        const a = document.activeElement as HTMLElement;
        const cs = getComputedStyle(a);
        return { tag: a.tagName, label: a.getAttribute("aria-label"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineOffset}`, boxShadow: cs.boxShadow.slice(0, 120) };
    });
    // DOCK-MORPH-ROOT (O-56 G-1): the small↔large morph, sampled every rAF for 1.5 s.
    async function sample(act: () => Promise<unknown>) {
        await page.evaluate(() => {
            const w = window as any; w.__s = []; const t0 = performance.now();
            const d = document.querySelector(".glass-dock") as HTMLElement;
            const tick = () => {
                const r = d.getBoundingClientRect();
                let blur = 0, scaled = 0;
                for (const el of Array.from(d.querySelectorAll("*")) as HTMLElement[]) {
                    const cs = getComputedStyle(el);
                    if (/blur\((?!0)/.test(cs.filter)) blur++;
                    if (cs.transform !== "none" && el.textContent?.trim()) {
                        const m = new DOMMatrix(cs.transform); if (Math.abs(m.a - 1) > 0.005 || Math.abs(m.d - 1) > 0.005) scaled++;
                    }
                }
                w.__s.push({ t: +(performance.now() - t0).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), blur, scaled });
                if (performance.now() - t0 < (w.__win ?? 1500)) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        await act();
        await settle(page, 1700);
        const s = (await page.evaluate(() => (window as any).__s)) as { t: number; w: number; h: number; blur: number; scaled: number }[];
        const last = s[s.length - 1];
        let k = s.length - 1;
        while (k > 0 && s[k - 1].w === last.w && s[k - 1].h === last.h) k--;
        return {
            frames: s.length, start: s[0], end: last, settleMs: s[k].t,
            distinctWidths: new Set(s.map((f) => f.w)).size, widthSeq: s.map((f) => f.w).filter((w, i, a) => i === 0 || w !== a[i - 1]),
            framesBlur: s.filter((f) => f.blur > 0).length, framesScaledText: s.filter((f) => f.scaled > 0).length,
        };
    }
    const tog = async () => { const d = (await box(page, ".glass-dock"))!; await page.mouse.move(d.x + d.w / 2, d.y + d.h / 2); await togClick(); };
    const togClick = () => page.evaluate(() => { const b = Array.from(document.querySelectorAll('.glass-dock button[aria-label="Toggle action bar"]')) as HTMLElement[]; const v = b.find((e) => e.getBoundingClientRect().width > 0) ?? b[0]; if (!v) return "none"; v.click(); return b.length; }).then((n) => { (res.dockToggleSeen ??= []).push(n); });
    // the collapse morph itself (focus left on the collapsed seat after Escape → the dock idles shut)
    await page.evaluate(() => ((window as any).__win = 6500));
    res.dockCollapseMorph = await sample(async () => { await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur()); await page.mouse.move(720, 880); await settle(page, 4200); });
    await page.evaluate(() => ((window as any).__win = 1500));
    { const d1 = (await box(page, ".glass-dock"))!; await page.mouse.move(d1.x + d1.w / 2, d1.y + d1.h / 2); await settle(page, 1200); }
    const m1 = await sample(tog); const m2 = await sample(tog); const m3 = await sample(tog);
    res.dockMorph = { first: m1, second: m2, third: m3 };
    // O-66 GLASS-SELECT-GREY: the colour-space Select's trigger and its checked / highlighted option.
    const trig = page.locator('[aria-label="Select color space"]').first();
    res.o66 = { trigger: await trig.evaluate((el) => { const cs = getComputedStyle(el); return { bg: cs.backgroundColor, backdrop: cs.backdropFilter }; }).catch(() => null) };
    await trig.click().catch(() => {});
    await settle(page, 600);
    res.o66.options = await page.evaluate(() => {
        const read = (el: Element | null) => el ? { text: el.textContent?.trim().slice(0, 16), bg: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color } : null;
        const opts = Array.from(document.querySelectorAll('[role="option"]'));
        return { count: opts.length, checked: read(document.querySelector('[role="option"][data-state="checked"]')), highlighted: read(document.querySelector('[role="option"][data-highlighted]')), content: read(document.querySelector('[role="listbox"]')) };
    });
    await page.screenshot({ path: out.replace(/\.json$/, "-o66-select.png") });
    await page.keyboard.press("Escape");
    await settle(page, 400);
    // O-80 DOCK-OVERFLOW-LAYOUT: a 2 s spectrum drag; frame intervals + LoAF forced-layout by script source.
    const spec = (await box(page, ".spectrum-picker"))!;
    await page.evaluate(() => {
        const w = window as any; w.__f = []; w.__loaf = []; w.__run = true;
        let last = performance.now();
        const tick = (t: number) => { w.__f.push(t - last); last = t; if (w.__run) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        try {
            new PerformanceObserver((l) => { for (const e of l.getEntries() as any[]) w.__loaf.push({ d: e.duration, scripts: (e.scripts ?? []).map((s: any) => ({ src: String(s.sourceURL).split("/").slice(-2).join("/").slice(0, 80), fn: s.sourceFunctionName, layout: s.forcedStyleAndLayoutDuration, d: s.duration })) }); }).observe({ type: "long-animation-frame" });
        } catch { w.__loaf = null; }
    });
    await page.mouse.move(spec.x + 10, spec.y + spec.h / 2);
    await page.mouse.down();
    for (let i = 0; i < 120; i++) {
        const u = i / 119;
        await page.mouse.move(spec.x + 10 + u * (spec.w - 20), spec.y + spec.h * (0.25 + 0.5 * Math.abs(Math.sin(u * 6))));
    }
    await page.mouse.up();
    res.o80 = await page.evaluate(() => {
        const w = window as any; w.__run = false;
        const f = (w.__f as number[]).slice(2).sort((a, b) => a - b);
        const q = (p: number) => +f[Math.min(f.length - 1, Math.floor(p * f.length))].toFixed(1);
        const bySrc: Record<string, { layout: number; d: number; n: number }> = {};
        for (const e of (w.__loaf ?? [])) for (const s of e.scripts) { const k = s.src + "#" + s.fn; bySrc[k] ??= { layout: 0, d: 0, n: 0 }; bySrc[k].layout += s.layout; bySrc[k].d += s.d; bySrc[k].n++; }
        const top = Object.entries(bySrc).sort((a, b) => b[1].layout - a[1].layout).slice(0, 6).map(([k, v]) => ({ k, layout: +v.layout.toFixed(1), d: +v.d.toFixed(1), n: v.n }));
        const glassLayout = Object.entries(bySrc).filter(([k]) => /glass-ui|dock/i.test(k)).reduce((a, [, v]) => a + v.layout, 0);
        return { frames: f.length, p50: q(0.5), p95: q(0.95), max: q(0.999), loafCount: w.__loaf?.length ?? null, topForcedLayout: top, glassDockForcedLayoutMs: +glassLayout.toFixed(1) };
    });
    // O-65 DOCK-COLLAPSED-FORM: let the dock idle shut; does the plate wrap every visible seat?
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.mouse.move(720, 880);
    await settle(page, 7000);
    res.o65 = await page.evaluate(() => {
        const dock = document.querySelector(".glass-dock") as HTMLElement;
        const plate = (dock.querySelector(".dock-plate") ?? dock) as HTMLElement;
        const pr = plate.getBoundingClientRect();
        const out: string[] = [];
        let seen = 0;
        for (const el of Array.from(dock.querySelectorAll("button, a, [role='progressbar'], .dock-seat, svg")) as HTMLElement[]) {
            const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
            if (r.width < 1 || r.height < 1 || cs.visibility === "hidden" || +cs.opacity < 0.05) continue;
            seen++;
            if (r.left < pr.left - 1 || r.right > pr.right + 1 || r.top < pr.top - 1 || r.bottom > pr.bottom + 1) out.push((el.getAttribute("aria-label") ?? el.tagName) + ` ${r.left.toFixed(0)}..${r.right.toFixed(0)}`);
        }
        return { expandedAttr: dock.getAttribute("data-expanded") ?? dock.getAttribute("data-state") ?? dock.className.toString().match(/collapsed|expanded/g)?.join(","), plate: { l: +pr.left.toFixed(1), r: +pr.right.toFixed(1), w: +pr.width.toFixed(1), h: +pr.height.toFixed(1) }, visibleSeats: seen, outsidePlate: out };
    });
    const db2 = (await box(page, ".glass-dock"))!;
    await page.screenshot({ path: out.replace(/\.json$/, "-o65-collapsed.png"), clip: { x: Math.max(0, db2.x - 16), y: Math.max(0, db2.y - 16), width: Math.min(1440, db2.w + 32), height: db2.h + 32 } });
    // O-67 SIDE-DOCK-EDGE: side/vertical docks on value.js
    res.o67 = await page.evaluate(() => ({ docks: document.querySelectorAll(".glass-dock").length, vertical: document.querySelectorAll('.glass-dock[data-orientation="vertical"], .glass-dock--vertical, [aria-orientation="vertical"].glass-dock').length }));
    // dark: the plate again
    await page.emulateMedia({ colorScheme: "dark" });
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await settle(page, 800);
    res.dockPlateDark = await plate();
    await ctx.close();
}

// Coarse-pointer phone contexts (Chromium reports pointer: coarse under hasTouch+isMobile).
const phone = (w: number, h: number) => browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light", hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const hit = (p: Page, sel: string) =>
    p.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const a = getComputedStyle(el, "::after");
        const slop = a.content !== "none" && a.position === "absolute" ? { w: a.width, h: a.height, inset: a.inset } : null;
        return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), font: getComputedStyle(el).fontSize, slop };
    }, sel);

// ── B. 390×844 coarse (L2-6 dock hit areas · L2-9 control floor · L3-6 control text · L3-1 headline ladder) ──
{
    const ctx = await phone(390, 844);
    const page = await ctx.newPage();
    await boot(page);
    await settle(page, 5000);
    res.coarse390 = {
        pointerCoarse: await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
        controlFloor: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--control-floor").trim()),
        controlText: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--control-text").trim()),
        selectView: await hit(page, '.glass-dock [aria-label="Select view"]'),
        toggleActionBar: await hit(page, '.glass-dock [aria-label="Toggle action bar"]'),
        menu: await hit(page, '.glass-dock [aria-label="Menu"]'),
        spaceTitle: await hit(page, '[aria-label="Select color space"]'),
    };
    await page.goto(origin + "/#/mix"); await settle(page, 3000);
    res.coarse390.mixSegment = await page.evaluate(() => {
        const t = Array.from(document.querySelectorAll('main [role="tab"], main [role="radio"], main button')).find((e) => /^\s*colors\s*$/i.test(e.textContent ?? "")) as HTMLElement | undefined;
        if (!t) return null; const r = t.getBoundingClientRect(); return { text: t.textContent?.trim(), h: +r.height.toFixed(1), font: getComputedStyle(t).fontSize };
    });
    await page.goto(origin + "/#/generate"); await settle(page, 3000);
    res.coarse390.generateName = await page.evaluate(() => {
        const t = document.querySelector('input[placeholder*="ame" i], input[aria-label*="name" i]') as HTMLElement | null;
        if (!t) return null; const r = t.getBoundingClientRect(); return { h: +r.height.toFixed(1), font: getComputedStyle(t).fontSize };
    });
    await page.goto(origin + "/#/nope/xyz"); await settle(page, 3000);
    res.coarse390.headlineLadder = await page.evaluate(() => {
        const read = (el: Element | null) => el ? { text: el.textContent?.trim().slice(0, 30), size: getComputedStyle(el).fontSize, weight: getComputedStyle(el).fontWeight } : null;
        const hs = Array.from(document.querySelectorAll("main h1, main h2, main h3, main [class*='title'], main [class*='empty'] p")).filter((e) => (e as HTMLElement).offsetParent);
        return { rows: hs.slice(0, 5).map(read), display1: getComputedStyle(document.documentElement).getPropertyValue("--type-display-1").trim(), heading: getComputedStyle(document.documentElement).getPropertyValue("--type-heading").trim() };
    });
    await ctx.close();
}

// ── C. 844×390 landscape coarse (L2-1 Filters popover · L2-3 dock overlay ceiling) ──
{
    const ctx = await phone(844, 390);
    const page = await ctx.newPage();
    await boot(page, "/#/browse");
    await settle(page, 5000);
    const overlay = async (label: string) => {
        const t = page.locator(`[aria-label="${label}"]`).first();
        if (!(await t.count())) return { trigger: label, missing: true };
        await t.click().catch(() => {});
        await settle(page, 700);
        const r = await page.evaluate(() => {
            const el = (document.querySelector('[role="listbox"]') ?? document.querySelector('[role="menu"]') ?? document.querySelector('[role="dialog"]')) as HTMLElement | null;
            if (!el) return null;
            const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
            return { role: el.getAttribute("role"), y: +b.y.toFixed(1), h: +b.height.toFixed(1), bottomGap: +(innerHeight - b.bottom).toFixed(1), maxH: cs.maxHeight, clientH: el.clientHeight, scrollH: el.scrollHeight, overflowY: cs.overflowY };
        });
        await page.keyboard.press("Escape"); await settle(page, 400);
        return { trigger: label, ...r };
    };
    res.land844 = {
        overlayMaxBlock: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--overlay-max-block").trim()),
        filters: await overlay("Filters"),
        menu: await overlay("Menu"),
        viewSelect: await overlay("Select view"),
    };
    await page.goto(origin + "/?w7lv=1"); await page.locator("main").first().waitFor({ state: "visible", timeout: 30000 }); await settle(page, 5000);
    res.land844.spaceSelect = await overlay("Select color space");
    await ctx.close();
}

// ── D. 360×780 coarse (L2-7 the action-bar T toggle vs the dock's right edge) ──
{
    const ctx = await phone(360, 780);
    const page = await ctx.newPage();
    await boot(page);
    await settle(page, 5000);
    const read = () => page.evaluate(() => {
        const d = document.querySelector(".glass-dock") as HTMLElement; const dr = d.getBoundingClientRect();
        const t = d.querySelector('[aria-label="Open color input"]') as HTMLElement | null;
        const tr = t?.getBoundingClientRect();
        let layer = t?.parentElement ?? null;
        while (layer && layer !== d && !/(auto|scroll|hidden)/.test(getComputedStyle(layer).overflowX)) layer = layer.parentElement;
        return { dock: { l: +dr.left.toFixed(1), r: +dr.right.toFixed(1) }, toggle: tr ? { l: +tr.left.toFixed(1), r: +tr.right.toFixed(1) } : null, clippedPx: tr ? +Math.max(0, tr.right - dr.right).toFixed(1) : null, layer: layer && layer !== d ? { overflowX: getComputedStyle(layer).overflowX, scrollW: layer.scrollWidth, clientW: layer.clientWidth } : null };
    });
    let r = await read();
    if (!r.toggle) { await page.locator('.glass-dock [aria-label="Toggle action bar"]').first().click().catch(() => {}); await settle(page, 900); r = await read(); }
    res.phone360 = r;
    await page.screenshot({ path: out.replace(/\.json$/, "-l2-7-360.png"), clip: await page.evaluate(() => { const b = document.querySelector(".glass-dock")!.getBoundingClientRect(); return { x: 0, y: Math.max(0, b.y - 12), width: 360, height: b.height + 24 }; }) });
    await ctx.close();
}

// ── E. 1440×900 light (L3-3 ConfiguratorRow inline layout on /atmosphere · L1-2 the condense rules served) ──
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await boot(page, "/#/atmosphere");
    await settle(page, 5000);
    res.l33 = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll(".configurator-row, [class*='configurator-row']")).filter((e) => (e as HTMLElement).offsetParent) as HTMLElement[];
        const one = rows.find((r) => r.querySelector('[role="slider"]'));
        if (!one) return { rows: rows.length, sample: null };
        const lab = one.querySelector("label, .configurator-row__label, [class*='label']") as HTMLElement | null;
        const ctl = one.querySelector('[role="slider"]') as HTMLElement;
        const lr = lab?.getBoundingClientRect(); const cr = ctl.getBoundingClientRect(); const rr = one.getBoundingClientRect();
        return { rows: rows.length, sample: { rowW: +rr.width.toFixed(1), rowH: +rr.height.toFixed(1), labelTop: lr ? +lr.top.toFixed(1) : null, labelBottom: lr ? +lr.bottom.toFixed(1) : null, controlTop: +cr.top.toFixed(1), sameLine: lr ? cr.top < lr.bottom : null } };
    });
    res.condenseRules = await cascadeCount(page, ["data-condensed"]);
    await ctx.close();
}

res.pageErrors = errors;
writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res).slice(0, 4000));
await browser.close();
