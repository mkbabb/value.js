// SERVED MODEL: claude-opus-5-5 · SS-8 Z2 — follow-up cells (ColorInput re-run, sharper picker/CSS/CSP reads).
import { launch, cell, boot, save, EVID } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (n) => want.size === 0 || want.has(n);
const browser = await launch();
const out = [];
const safe = async (fn, d = null) => { try { return await fn(); } catch (e) { return { err: String(e).slice(0, 160) }; } };

async function openInput(page) {
    const dock = page.locator(".glass-dock").first();
    const b = await dock.boundingBox();
    if (b) await page.mouse.move(b.x + 3, b.y + b.height / 2);
    const toggle = page.getByRole("button", { name: "Toggle action bar" });
    if (await toggle.count()) { await toggle.first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(900); }
    const open = page.getByRole("button", { name: "Open color input" });
    if (await open.count()) { await open.first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1200); }
    return page.locator('[aria-label="Enter a CSS color"]').first();
}
const fs = (page) => page.evaluate(() => {
    const f = document.querySelector('[aria-label="Enter a CSS color"]'); if (!f) return null;
    const c = getComputedStyle(f); const send = document.querySelector('button[aria-label="Apply color"]'); const badge = document.querySelector(".error-badge");
    const sr = send?.getBoundingClientRect(), br = badge?.getBoundingClientRect();
    let ov = null; if (sr && br) { const w = Math.max(0, Math.min(sr.right, br.right) - Math.max(sr.left, br.left)); const h = Math.max(0, Math.min(sr.bottom, br.bottom) - Math.max(sr.top, br.top)); ov = +((w * h) / (sr.width * sr.height)).toFixed(3); }
    return { focused: document.activeElement === f, text: f.innerText, border: c.borderTopColor, outline: `${c.outlineStyle} ${c.outlineWidth}`, shadow: c.boxShadow.slice(0, 60), ariaInvalid: f.getAttribute("aria-invalid"), describedby: f.getAttribute("aria-describedby"), sendType: send?.getAttribute("type"), sendLabel: send?.getAttribute("aria-label"), badge: badge?.textContent.trim() ?? null, badgeOverlapFracOfSend: ov, title: document.title };
});

try {
    for (const forced of on("ci") ? [false, true] : []) out.push(await cell(browser, forced ? "ci-forced" : "ci", forced ? { forcedColors: "active" } : {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const field = await openInput(page);
        const r = { rest: await fs(page) };
        r.crownKeyframes = await page.evaluate(() => { const n = []; for (const s of document.styleSheets) { let rs; try { rs = s.cssRules; } catch { continue; } const w = (x) => { for (const q of x) { if (q.type === 7 && /crown/i.test(q.name)) n.push(q.name); if (q.cssRules) w(q.cssRules); } }; w(rs); } return n; });
        await field.focus(); await page.waitForTimeout(500); r.focused = await fs(page);
        if (forced) return r;
        await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("oklch()"); await page.keyboard.press("Enter"); await page.waitForTimeout(2600);
        r.afterDegenerate = await fs(page);
        await page.screenshot({ path: `${EVID}/ci-after-oklch-empty-enter.png`, clip: { x: 300, y: 0, width: 840, height: 140 } });
        await field.focus(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("notacolor"); await page.keyboard.press("Enter"); await page.waitForTimeout(2600);
        r.afterWord = await fs(page);
        await page.screenshot({ path: `${EVID}/ci-after-notacolor-enter.png`, clip: { x: 300, y: 0, width: 840, height: 140 } });
        // D-5 preview latency: type, no Enter, sample title
        await field.focus(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("rgb(10 200 30)");
        const t0 = Date.now(); r.debounce = [];
        for (const t of [300, 700, 1300, 2400]) { await page.waitForTimeout(Math.max(0, t - (Date.now() - t0))); r.debounce.push({ t, title: await page.title() }); }
        // D-15: popover reachability without hover
        const pop = () => page.evaluate(() => [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].filter((e) => /Enter a color/.test(e.textContent) && e.getBoundingClientRect().width > 0).length);
        await page.mouse.move(700, 880); await page.waitForTimeout(800);
        await page.locator("body").click({ position: { x: 700, y: 880 } }).catch(() => {}); await page.waitForTimeout(500);
        r.popRest = await pop();
        await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await field.focus(); await page.waitForTimeout(1000);
        r.popOnKeyboardFocus = await pop();
        const fb = await field.boundingBox(); await page.mouse.move(fb.x + 20, fb.y + fb.height / 2); await page.waitForTimeout(1200);
        r.popOnHover = await pop();
        // L-16: echo after an invalid entry
        await field.focus(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("oklch(0.5 0.1"); await page.keyboard.press("Enter"); await page.waitForTimeout(2400);
        await page.mouse.move(700, 880); await page.waitForTimeout(600); await page.mouse.move(fb.x + 20, fb.y + fb.height / 2); await page.waitForTimeout(1300);
        r.echo = await page.evaluate(() => { const p = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((e) => /Enter a color/.test(e.textContent)); return p ? p.innerText.replace(/\s+/g, " ").slice(0, 360) : null; });
        r.titleAtEcho = await page.title();
        await page.screenshot({ path: `${EVID}/ci-echo-after-invalid.png`, clip: { x: 200, y: 0, width: 1040, height: 420 } });
        // Crown on a named colour
        await field.focus(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("rebeccapurple"); await page.keyboard.press("Enter"); await page.waitForTimeout(2200);
        r.crown = await page.evaluate(() => { const c = document.querySelector(".glass-dock svg.lucide-crown, .glass-dock svg[class*=crown]"); if (!c) return null; const s = getComputedStyle(c); return { animationName: s.animationName, running: c.getAnimations().length, transitionProperty: s.transitionProperty, tabindex: c.getAttribute("tabindex") }; });
        return r;
    }));

    if (on("picker")) out.push(await cell(browser, "picker-boot-clock", {}, async (page) => {
        // D-15/D-17: sample .pane-shell animations from first paint
        await page.addInitScript(() => {
            window.__shell = [];
            const t0 = performance.now();
            const tick = () => { const s = document.querySelector(".pane-shell"); if (s) for (const a of s.getAnimations()) { const k = a.animationName ?? a.transitionProperty ?? "anim"; if (!window.__shell.find((x) => x.k === k)) window.__shell.push({ k, dur: a.effect?.getTiming().duration, at: Math.round(performance.now() - t0) }); } if (performance.now() - t0 < 8000) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
        });
        await boot(page, "/", { settle: 3000 });
        const r = await page.evaluate(() => ({ shellAnims: window.__shell, token: getComputedStyle(document.documentElement).getPropertyValue("--overture-plate-land").trim(), live: [...document.querySelectorAll('.pane-shell [aria-live]:not([aria-live="off"]), .pane-shell [role=status]')].map((e) => ({ cls: String(e.className).slice(0, 60), text: e.textContent.trim().slice(0, 80), inReadoutArea: !!e.closest(".picker-header") })) }));
        return r;
    }));
    if (on("picker")) out.push(await cell(browser, "picker-390", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, async (page) => {
        await boot(page, "/", { settle: 4000 });
        return page.evaluate(() => {
            const cells = [...document.querySelectorAll(".pane-shell .readout .readout-cell")];
            const tops = cells.map((c) => Math.round(c.getBoundingClientRect().top));
            const ro = document.querySelector(".pane-shell .readout");
            return { tops, lines: new Set(tops).size, readoutW: ro && Math.round(ro.getBoundingClientRect().width), cellW: cells.map((c) => Math.round(c.getBoundingClientRect().width)), visible: !!ro && ro.getBoundingClientRect().height > 0 };
        });
    }));
    if (on("picker")) out.push(await cell(browser, "picker-390x480-scroll", { viewport: { width: 390, height: 480 } }, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const read = () => page.evaluate(() => { const h = document.querySelector(".pane-shell .picker-header"); const hosts = [...document.querySelectorAll(".pane-shell *")].filter((e) => e.scrollHeight - e.clientHeight > 4 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)).map((e) => ({ cls: String(e.className).slice(0, 50), over: e.scrollHeight - e.clientHeight, top: e.scrollTop })); const se = document.scrollingElement; return { h: h && +h.getBoundingClientRect().height.toFixed(2), condensed: h?.getAttribute("data-condensed"), hosts, docOver: se.scrollHeight - se.clientHeight, docTop: se.scrollTop }; });
        const before = await read();
        await page.mouse.move(195, 400);
        for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 90); await page.waitForTimeout(120); }
        await page.waitForTimeout(900);
        return { before, after: await read() };
    }));

    if (on("css")) out.push(await cell(browser, "css2", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const r = { about: [] };
        const trig = page.locator('[role="combobox"][aria-label="Select color space"]').first();
        for (const sp of ["ictcp", "jzazbz", "a98-rgb"]) {
            await trig.click(); await page.waitForTimeout(800);
            const opt = page.locator(`[role="option"][data-space="${sp}"]`).first();
            await opt.scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(300);
            await opt.click({ force: true }).catch(async () => { await opt.focus(); await page.keyboard.press("Enter"); });
            await page.waitForTimeout(1600);
            r.about.push(await page.evaluate((sp) => {
                const combos = [...document.querySelectorAll('[role="combobox"][aria-label="Select color space"]')].map((c) => c.textContent.trim());
                const h = [...document.querySelectorAll("h2")]; const guide = h.find((x) => /Detailed Guide/.test(x.textContent)); const def = h.find((x) => /Definition/.test(x.textContent));
                const body = document.body.innerText;
                return { sp, combos, definition: def?.nextElementSibling?.textContent.trim().slice(0, 90), guideNext: guide?.nextElementSibling?.textContent.trim().slice(0, 90) ?? null, cieRgb: /CIE\s*RGB|CIE 1931 RGB/i.test(body), href: location.href };
            }, sp));
        }
        // L-6/L-12: write through the SECOND (About-hosted) selector
        await page.keyboard.press("Escape");
        const second = page.locator('[role="combobox"][aria-label="Select color space"]').nth(1);
        r.secondCount = await page.locator('[role="combobox"][aria-label="Select color space"]').count();
        if (r.secondCount > 1) {
            const before = { href: await page.evaluate(() => location.href), readout: await page.evaluate(() => [...document.querySelectorAll(".pane-shell .readout .readout-fig")].map((f) => f.textContent).join(",")) };
            await second.scrollIntoViewIfNeeded().catch(() => {}); await second.click(); await page.waitForTimeout(800);
            await page.locator('[role="option"][data-space="lab"]').first().click({ force: true }).catch(() => {}); await page.waitForTimeout(1600);
            const after = await page.evaluate(() => ({ href: location.href, readout: [...document.querySelectorAll(".pane-shell .readout .readout-fig")].map((f) => f.textContent).join(","), combos: [...document.querySelectorAll('[role="combobox"][aria-label="Select color space"]')].map((c) => c.textContent.trim()), secondHost: document.querySelectorAll('[role="combobox"][aria-label="Select color space"]')[1]?.closest("[data-slot=card]")?.innerText.slice(0, 40) }));
            r.viaSecond = { before, after };
        }
        return r;
    }));

    if (on("csp")) out.push(await cell(browser, "csp-clip", { permissions: ["clipboard-read", "clipboard-write"] }, async (page) => {
        await boot(page, "/blob", { settle: 4000 });
        await page.evaluate(() => { window.__live = []; new MutationObserver((ms) => { for (const m of ms) { const el = m.target.nodeType === 1 ? m.target : m.target.parentElement; const lr = el?.closest?.('[aria-live]:not([aria-live="off"]), [role=status], [role=alert]'); if (lr) window.__live.push(lr.textContent.trim().slice(0, 80)); } }).observe(document.body, { subtree: true, childList: true, characterData: true }); });
        await page.getByRole("button", { name: /Copy JSON/ }).click(); await page.waitForTimeout(200);
        const label = await page.locator(".config-action-bar").innerText();
        const clip = await page.evaluate(() => navigator.clipboard.readText().then((t) => t.slice(0, 60)).catch((e) => "ERR " + e));
        await page.waitForTimeout(400);
        const live = await page.evaluate(() => window.__live.slice(0, 10));
        return { label, clip, live };
    }));
    if (on("csp")) out.push(await cell(browser, "csp-390-visible", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, async (page) => {
        await boot(page, "/blob", { settle: 4500 });
        return page.evaluate(() => {
            const sl = [...document.querySelectorAll(".config-console [role=slider]")];
            const vis = sl.filter((s) => { const r = s.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(s).visibility !== "hidden" && !s.closest("[inert],[hidden],[aria-hidden=true]"); });
            const inView = vis.filter((s) => { const r = s.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; });
            const pane = document.querySelector(".config-console")?.closest("[data-slot=card]")?.getBoundingClientRect();
            return { inDom: sl.length, rendered: vis.length, inViewport: inView.length, paneRect: pane && { x: Math.round(pane.x), w: Math.round(pane.width), y: Math.round(pane.y) } };
        });
    }));
    save(`run-followup-${[...want].join("+") || "all"}.json`, out);
    console.log(JSON.stringify(out, null, 1).slice(0, 14000));
} finally {
    await browser.close();
}
