// CHALLENGE-D pass 4 — probe 4: focus law, escape restoration, the `searching`
// state's paint window, and a pixel measurement of the popover's translucency.
import { webkit, chromium } from "playwright";
import fs from "node:fs";
const OUT = new URL("./evidence-p4/", import.meta.url).pathname;
const BASE = "http://192.168.1.166:9000";
const TAGS = ["pastel", "neon", "earth", "monochrome", "retro", "vaporwave", "muted", "high-contrast", "duotone", "sunset", "forest", "oceanic"].map((n, i) => ({ name: n, count: 30 - i }));
const R = {};
async function stub(page) {
    await page.route(/^https?:\/\/api\.color\.babb\.dev/, async (route) => {
        const u = route.request().url();
        const j = (b) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(b) });
        if (u.includes("/colors/tags")) return j(TAGS);
        if (u.includes("/sessions/me")) return route.fulfill({ status: 401, contentType: "application/json", body: "{}" });
        if (u.includes("/palettes")) return j({ palettes: [], hasMore: false });
        return j({});
    });
}

for (const [ename, engine] of [["webkit", webkit], ["chromium", chromium]]) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage(); await stub(page);
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    const E = {};

    // ── 1. Escape restores focus to opener? (measured immediately after open)
    await page.focus('button[aria-label="Filters"]');
    await page.keyboard.press("Enter");
    await page.waitForTimeout(700);
    E.focusOnOpen = await page.evaluate(() => { const a = document.activeElement; return { tag: a.tagName, role: a.getAttribute("role"), name: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 30) || "(none)", inPopover: !!a.closest('[role="dialog"]') }; });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    E.focusAfterEscape = await page.evaluate(() => { const a = document.activeElement; return { tag: a.tagName, name: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 30) || "(none)", isTrigger: a.getAttribute("aria-label") === "Filters" }; });
    E.popoverClosedAfterEscape = await page.evaluate(() => !document.querySelector('[role="dialog"][data-state="open"]'));

    // ── 2. Tab traversal, fully enumerated with outerHTML
    await page.focus('button[aria-label="Filters"]');
    await page.keyboard.press("Enter");
    await page.waitForTimeout(700);
    const seq = [];
    for (let i = 0; i < 22; i++) {
        seq.push(await page.evaluate(() => {
            const a = document.activeElement;
            if (!a) return null;
            const c = getComputedStyle(a);
            const b = a.getBoundingClientRect();
            return {
                tag: a.tagName, role: a.getAttribute("role"),
                name: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 26) || "(none)",
                inPopover: !!a.closest('[role="dialog"]'),
                outlineStyle: c.outlineStyle, outlineWidth: c.outlineWidth, outlineColor: c.outlineColor, outlineOffset: c.outlineOffset,
                boxShadow: c.boxShadow.slice(0, 70),
                hasVisibleFocusIndicator: (c.outlineStyle !== "none" && parseFloat(c.outlineWidth) > 0) || (c.boxShadow !== "none"),
                w: +b.width.toFixed(1), h: +b.height.toFixed(1),
                popoverStillOpen: !!document.querySelector('[role="dialog"]'),
            };
        }));
        await page.keyboard.press("Tab");
        await page.waitForTimeout(110);
    }
    E.tabSequence = seq;
    E.tabLeftPopoverAtIndex = seq.findIndex((s) => s && !s.inPopover);
    E.popoverStillOpenAfterEscapingTab = seq[seq.length - 1]?.popoverStillOpen;

    // ── 3. focus ring on a radio, screenshotted
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700);
    await page.evaluate(() => { const r = document.querySelectorAll('[role="radio"]')[1]; r && r.focus(); });
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300);
    E.radioFocusStyle = await page.evaluate(() => {
        const a = document.activeElement; const c = getComputedStyle(a);
        return { tag: a.tagName, role: a.getAttribute("role"), outline: `${c.outlineWidth} ${c.outlineStyle} ${c.outlineColor}`, boxShadow: c.boxShadow.slice(0, 120), matchesFocusVisible: a.matches(":focus-visible") };
    });
    const dlg = await page.locator('[role="dialog"]').first().boundingBox();
    if (dlg) await page.screenshot({ path: `${OUT}p4-${ename}-radio-focus.png`, clip: { x: dlg.x - 8, y: dlg.y - 8, width: dlg.width + 16, height: Math.min(360, 1400 - dlg.y) } });

    // ── 4. does `searching` ever paint? MutationObserver over the Search button subtree
    E.searchingPaint = await page.evaluate(async () => {
        const root = document.querySelector('[role="dialog"]');
        const btn = [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
        if (!btn) return { error: "no search button" };
        const frames = [];
        let stop = false;
        const tick = () => { if (stop) return; frames.push({ t: performance.now(), html: btn.innerHTML.slice(0, 60), disabled: btn.disabled }); requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        const mut = [];
        const mo = new MutationObserver((rec) => rec.forEach((r) => mut.push({ type: r.type, t: performance.now(), html: btn.innerHTML.slice(0, 60) })));
        mo.observe(btn, { childList: true, subtree: true, attributes: true });
        btn.click();
        await new Promise((r) => setTimeout(r, 700));
        stop = true; mo.disconnect();
        return {
            spinnerEverPresent: frames.some((f) => f.html.includes("svg")) || mut.some((m) => m.html.includes("svg")),
            disabledEverTrue: frames.some((f) => f.disabled),
            frameCount: frames.length,
            mutationCount: mut.length,
            mutations: mut.slice(0, 8),
            finalHTML: btn.innerHTML.slice(0, 60),
        };
    });
    await browser.close();
    R[ename] = E;
}

fs.writeFileSync(`${OUT}p4-4.json`, JSON.stringify(R, null, 2));
console.log("WROTE p4-4.json");
