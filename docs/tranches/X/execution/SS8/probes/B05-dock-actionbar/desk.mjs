// SERVED MODEL: claude-opus-5-5 — SS-8 B05 desktop cells (Chromium headless, one browser,
// one context per cell). Cells: desk-light, desk-dark at 1440x900, route /#/.
// Items: ABL D-1 C-3 L-4 D-13 D-14 C-10 C-15 L-1 D-8 D-2(chromium arm) ·
//        ABT D-02 D-08 D-05 C-3(boot) D-12 · ABN U-1 U-2 U-3(/#/) U-4 U-7 U-8.
import { chromium } from "playwright";
import { boot, parkOnDock, parkAway, dockState, toolsState, mainSeparators, barState, tabWalk, focusRing, samplePixels, contrast, save, EVID, r1 } from "./lib.mjs";

/** Max-contrast ink inside a rect vs a plate sample (rendered ratio, one seed). */
async function inkRatio(page, rect, platePt) {
    const shot = await page.screenshot();
    const pts = [];
    for (let x = rect.x + 1; x < rect.x + rect.w - 1; x += 1) for (let y = rect.y + 1; y < rect.y + rect.h - 1; y += 1) pts.push([x, y]);
    const px = await samplePixels(page, shot, [platePt, ...pts]);
    const plate = px[0];
    let best = { c: 1, p: null };
    for (const p of px.slice(1)) { const c = contrast(p, plate); if (c > best.c) best = { c, p }; }
    return { plate, ink: best.p, ratio: best.c };
}

async function cell(browser, scheme) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const out = { cell: `desk-${scheme}`, scheme, viewport: "1440x900", route: "/#/", trace: [] };
    try {
        const page = await ctx.newPage();
        // ── ABT C-3 stale-boot trace: per-frame slot state over the first 2.5 s, 3 boots.
        await page.addInitScript(() => {
            window.__slot = [];
            const t0 = performance.now();
            const tick = () => {
                const s = document.querySelector(".action-bar-toggle-slot");
                if (s) {
                    const r = s.getBoundingClientRect();
                    window.__slot.push({ t: Math.round(performance.now() - t0), w: +r.width.toFixed(1), o: +(+getComputedStyle(s).opacity).toFixed(3), cls: s.className.replace("action-bar-toggle-slot", "").trim() });
                }
                if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        out.boots = [];
        for (let i = 0; i < 3; i++) {
            await boot(page, "/", 2600);
            const tr = await page.evaluate(() => window.__slot);
            const final = tr.at(-1);
            const partial = tr.filter((f) => f.w > 0.5 && final && f.w < final.w - 0.5);
            const visibleWhileOpaqueLow = tr.filter((f) => f.w > 0.5 && f.o < 0.95);
            out.boots.push({ frames: tr.length, first: tr[0], final, partialWidthFrames: partial.length, partialSample: partial.slice(0, 4), lowOpacityPaintedFrames: visibleWhileOpaqueLow.length, lowOpSample: visibleWhileOpaqueLow.slice(0, 4) });
        }
        await parkOnDock(page);
        await page.waitForTimeout(400);
        out.trace.push({ step: "rest-main", dock: await dockState(page) });
        out.toolsRest = await toolsState(page);
        out.mainSeparators = await mainSeparators(page);
        const dock0 = out.trace[0].dock.rect;
        const platePt = [dock0.x + 6, dock0.y + dock0.h / 2];
        // ABT D-02/ABT-8 rendered label ratio at THIS seed.
        if (out.toolsRest.label) {
            const lb = await page.locator('[aria-label="Toggle action bar"] span').boundingBox();
            out.toolsLabelInk = await inkRatio(page, r1(lb), platePt);
        }
        // Sibling: view-select label.
        const vs = page.getByRole("combobox", { name: "Select view" });
        if (await vs.count()) out.viewSelectInk = await inkRatio(page, r1(await vs.boundingBox()), platePt);
        // ── ABT D-08/ABT-11 focus ring composite: Tab to the Tools trigger.
        const before = await page.screenshot();
        let reached = false;
        for (let i = 0; i < 30 && !reached; i++) {
            await page.keyboard.press("Tab");
            reached = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Toggle action bar");
        }
        out.toolsFocus = reached ? await focusRing(page) : { reached: false };
        if (reached) {
            await page.waitForTimeout(300);
            const after = await page.screenshot({ path: `${EVID}desk-${scheme}-tools-focus.png`, clip: { x: dock0.x - 10, y: dock0.y - 10, width: dock0.w + 20, height: dock0.h + 20 } });
            const full = await page.screenshot();
            const b = out.toolsFocus.rect;
            const ring = [];
            for (let x = b.x - 4; x <= b.r + 4; x++) for (const y of [b.y - 3, b.y - 2, b.y - 1, b.y + b.h, b.y + b.h + 1, b.y + b.h + 2]) ring.push([x, y]);
            const pa = await samplePixels(page, before, ring);
            const pb = await samplePixels(page, full, ring);
            let best = { c: 1 };
            pa.forEach((p, i) => { const c = contrast(pb[i], p); if (c > best.c) best = { c, at: ring[i], ring: pb[i], ground: p }; });
            out.toolsRingComposite = best;
            void after;
        }
        // ── Activate Tools (the layer swap): ABT D-05 jolt + pressedInAx.
        const dockBefore = (await dockState(page)).rect;
        const toolsBefore = (await toolsState(page)).btnRect;
        await page.keyboard.press("Enter");
        const jolt = [];
        for (let i = 0; i < 12; i++) { await page.waitForTimeout(50); jolt.push({ t: (i + 1) * 50, dock: (await dockState(page)).rect }); }
        await page.waitForTimeout(500);
        out.swap = {
            dockBefore, toolsBefore, joltTrace: jolt,
            dockAfter: (await dockState(page)).rect,
            toolsAfter: await toolsState(page),
            activeAfter: await page.evaluate(() => { const a = document.activeElement; return a ? { tag: a.tagName, label: a.getAttribute("aria-label"), role: a.getAttribute("role"), text: a.textContent.trim().slice(0, 30) } : null; }),
        };
        const cdp = await ctx.newCDPSession(page);
        const ax = await cdp.send("Accessibility.getFullAXTree");
        const node = ax.nodes.find((n) => n.name?.value === "Toggle action bar");
        out.swap.toolsAx = node ? { ignored: node.ignored, pressed: node.properties?.find((p) => p.name === "pressed")?.value?.value ?? null } : "absent";
        out.trace.push({ step: "bar-open", dock: await dockState(page) });
        // ── bar geometry (D-13, U-3 home, D-8, D-14 inputs)
        await parkOnDock(page);
        await page.waitForTimeout(300);
        out.bar = await barState(page);
        const fb = out.bar.row;
        await page.screenshot({ path: `${EVID}desk-${scheme}-bar.png`, clip: { x: (await dockState(page)).rect.x - 10, y: fb.y - 18, width: (await dockState(page)).rect.w + 20, height: fb.h + 36 } });
        // U-4 seat glyph ink at this seed.
        const s0 = out.bar.seats[0]?.glyph;
        if (s0) out.seatGlyphInk = await inkRatio(page, s0, platePt[0] < fb.x ? [ (await dockState(page)).rect.x + 6, fb.y + fb.h / 2 ] : platePt);
        // U-7 icon transition (served)
        out.iconTransition = out.bar.seats.map((s) => s.glyph?.transition);
        // ── D-2 Tab reachability (chromium arm): focus Back, walk 10 tabs.
        await page.getByRole("button", { name: "Back" }).focus();
        out.tabWalkFromBack = await tabWalk(page, 10);
        // ── D-14 ring vs separator: focus the input toggle by keyboard.
        const inputToggle = out.bar.ctrls.find((c) => /color input|Propose|Close/.test(c.label));
        if (inputToggle) {
            await page.getByRole("button", { name: "Back" }).focus();
            let ok = false;
            for (let i = 0; i < 12 && !ok; i++) { await page.keyboard.press("Tab"); ok = await page.evaluate((l) => document.activeElement?.getAttribute("aria-label") === l, inputToggle.label); }
            out.inputToggleFocus = ok ? await focusRing(page) : { reached: false };
            out.sepNearInput = out.bar.seps.filter((s) => Math.abs(s.x - inputToggle.x) < 30);
            if (ok) await page.screenshot({ path: `${EVID}desk-${scheme}-input-focus.png`, clip: { x: inputToggle.x - 30, y: inputToggle.y - 10, width: inputToggle.w + 60, height: inputToggle.h + 20 } });
            // ── L-4 jump: click the input toggle; its x before/after.
            await page.locator(`[aria-label="${inputToggle.label}"]`).click();
            const jt = [];
            for (let i = 0; i < 10; i++) { await page.waitForTimeout(60); const b = await page.locator('button[aria-label="Propose color name"], button[aria-label="Close input"], button[aria-label="Close propose"], button[aria-label="Open color input"]').first().boundingBox(); jt.push({ t: (i + 1) * 60, x: b && +b.x.toFixed(1) }); }
            out.inputSwapJump = { before: inputToggle.x, trace: jt, dock: (await dockState(page)).rect };
            out.trace.push({ step: "input-open", dock: await dockState(page) });
            // back to actions
            for (let i = 0; i < 3; i++) {
                const t = page.locator('button[aria-label="Propose color name"], button[aria-label="Close input"], button[aria-label="Close propose"]');
                if (!(await t.count())) break;
                await t.first().click(); await page.waitForTimeout(500);
            }
            out.trace.push({ step: "input-closed", dock: await dockState(page) });
        }
        // ── U-8 rotate: hover each seat whose icon class names a rotate; sample at 50/250 ms.
        await page.mouse.move(5, 500);
        await page.waitForTimeout(400);
        out.rotate = [];
        for (const s of (await barState(page)).seats) {
            if (!/rotate|spin/.test(s.glyph?.cls ?? "") && s.token !== "reset") continue;
            await page.mouse.move(s.btn.x + s.btn.w / 2, s.btn.y + s.btn.h / 2);
            const samp = [];
            for (const t of [50, 250, 600]) {
                await page.waitForTimeout(t - (samp.at(-1)?.t ?? 0));
                samp.push({ t, ...(await page.evaluate((tok) => { const g = document.querySelector(`[data-scene-action="${tok}"] svg`); const cs = getComputedStyle(g); return { rotate: cs.rotate, transform: cs.transform, hover: g.matches(":hover") }; }, s.token)) });
            }
            out.rotate.push({ token: s.token, cls: s.glyph.cls, samp });
            await page.mouse.move(5, 500); await page.waitForTimeout(400);
        }
        // ── C-15/U-1 hold leak · L-1 reachable trigger · C-10 face trace — four fresh-boot sequences.
        const ensureOpen = async () => {
            await parkOnDock(page);
            if (/collapsed/.test((await dockState(page)).cls)) { await page.locator(".glass-dock.collapsed").click(); await page.waitForTimeout(900); await parkOnDock(page); }
        };
        const hints = () => page.evaluate(() => [...document.querySelectorAll("p.text-subheading")].filter((p) => p.getBoundingClientRect().width > 0).map((p) => p.textContent.trim()));
        const pollIdle = async (ms) => {
            const o = []; const t0 = Date.now(); let morphFrames = [];
            while (Date.now() - t0 < ms) {
                const f = await page.evaluate(() => {
                    const d = document.querySelector(".glass-dock");
                    const row = document.querySelector('[data-testid="scene-action-row"]');
                    const nested = row?.closest(".dock-face")?.querySelector(":scope > .dock-face-content");
                    const st = nested ? getComputedStyle(nested) : null;
                    return { collapsed: d.classList.contains("collapsed"), morphing: d.hasAttribute("data-morphing"), w: +d.getBoundingClientRect().width.toFixed(1),
                        nestedStagger: nested ? nested.matches(".glass-dock[data-morphing] .dock-crossfade > .dock-face.is-active > .dock-face-content") : null,
                        nestedOpacity: st?.opacity, nestedTransform: st?.transform };
                });
                f.t = Date.now() - t0;
                if (f.morphing) morphFrames.push(f);
                if (!o.length || o.at(-1).collapsed !== f.collapsed || o.at(-1).morphing !== f.morphing) o.push(f);
                await page.waitForTimeout(40);
            }
            return { edges: o, morphFrames: morphFrames.slice(0, 8), morphFrameCount: morphFrames.length };
        };
        const seq = {};
        // S1 clean: open bar, no hover, pointer away 10 s.
        await boot(page, "/", 2600); await ensureOpen();
        await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(700);
        await parkAway(page);
        seq.S1_barOpenNoHover = await pollIdle(10000);
        out.trace.push({ step: "S1-end", dock: await dockState(page) });
        // L-1 reverse arm: expand the collapsed dock while the bar is open; poll the morph.
        if (/collapsed/.test((await dockState(page)).cls)) {
            await page.locator(".glass-dock.collapsed").click();
            seq.S1_expandMorph = await pollIdle(1200);
            seq.S1_afterExpand = await dockState(page);
        }
        // S2 leak: open bar, hover a seat until its hint opens, click it, Back, pointer away.
        await boot(page, "/", 2600); await ensureOpen();
        await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(700);
        const seat2 = (await barState(page)).seats.find((s) => s.token === "color.copy") ?? (await barState(page)).seats[0];
        await page.mouse.move(seat2.btn.x + seat2.btn.w / 2, seat2.btn.y + seat2.btn.h / 2);
        await page.waitForTimeout(900);
        const hintBefore = await hints();
        await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(600);
        const hintAfter = await hints();
        await page.getByRole("button", { name: "Back" }).click(); await page.waitForTimeout(500);
        await parkAway(page);
        seq.S2_hoverClickBack = { seat: seat2.token, hintBefore, hintAfter, ...(await pollIdle(9000)) };
        // S3 control: open bar, Back, no hover, pointer away.
        await boot(page, "/", 2600); await ensureOpen();
        await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(700);
        await page.getByRole("button", { name: "Back" }).click(); await page.waitForTimeout(500);
        await parkAway(page);
        seq.S3_control = await pollIdle(9000);
        // S4 hover-only: open bar, hover a seat (hint opens), pointer to Back, click, away.
        await boot(page, "/", 2600); await ensureOpen();
        await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(700);
        await page.mouse.move(seat2.btn.x + seat2.btn.w / 2, seat2.btn.y + seat2.btn.h / 2); await page.waitForTimeout(900);
        const hintS4 = await hints();
        await page.getByRole("button", { name: "Back" }).click(); await page.waitForTimeout(500);
        await parkAway(page);
        seq.S4_hoverBack = { hintS4, ...(await pollIdle(9000)) };
        out.holdSeq = seq;
        out.trace.push({ step: "S4-end", dock: await dockState(page) });
        // ── D-1 (AB-3) sliver: can a bar-less route still activate Tools?
        await boot(page, "/atmosphere", 2600);
        await parkOnDock(page);
        out.barless = { tools: await toolsState(page), dock: await dockState(page) };
        const clicked = await page.getByRole("button", { name: "Toggle action bar" }).click({ timeout: 1500 }).then(() => "clicked", (e) => "refused: " + String(e.message).split("\n")[0].slice(0, 120));
        await page.waitForTimeout(800);
        out.barless.clickAttempt = clicked;
        out.barless.dockAfter = await dockState(page);
        return out;
    } catch (e) {
        out.error = String(e.message).split("\n").slice(0, 3).join(" | ");
        try { const pg = ctx.pages()[0]; out.errorDock = await dockState(pg); out.errorTools = await toolsState(pg); } catch {}
        return out;
    } finally {
        await ctx.close();
    }
}

const browser = await chromium.launch();
try {
    for (const scheme of (process.env.SCHEMES ?? "light,dark").split(",")) {
        const r = await cell(browser, scheme);
        save(`desk-${scheme}.json`, r);
        console.log(`desk-${scheme} done`);
    }
} finally {
    await browser.close();
}
