// PaletteCardMenu — CHALLENGE-C pass 4, probe B
// The modal-lock consequence at grid scale. Precise, fresh-box, user-shaped clicks.
//  B0  hit-test: while card0's menu is open, what is at card1's trigger centre?
//  B1  the 3-click cross-card sequence with FRESH geometry at every step
//  B2  how many clicks does it take to move the menu from card0 to card1?
//  B3  does the consumed click fall through to the card (expand toggle)?
//  B4  is the palette list still scrollable under the modal lock? (lock efficacy)
//  B5  the same sequence on a 390px touch device with real taps
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 6 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }, { css: "#3355ff", position: 2 }],
    })),
};

const STATE = () => {
    const menus = Array.from(document.querySelectorAll('[role="menu"]'));
    const trigs = Array.from(document.querySelectorAll('[aria-label="Palette menu"]'));
    const cards = Array.from(document.querySelectorAll('[role="article"]'));
    return {
        menuCount: menus.length,
        openMenuOwner: menus.map((m) => (m.firstElementChild ? m.firstElementChild.textContent.trim() : null)),
        expanded: trigs.map((t) => t.getAttribute("aria-expanded")),
        cardHeights: cards.map((c) => +c.getBoundingClientRect().height.toFixed(0)),
        bodyPE: getComputedStyle(document.body).pointerEvents,
        bodyOverflowInline: document.body.style.overflow || "",
        lastClickTarget: window.__lastClick || null,
    };
};

const INSTRUMENT = () => {
    window.__lastClick = null;
    document.addEventListener("click", (e) => {
        const t = e.target;
        const path = [];
        let n = t;
        while (n && n !== document.body && path.length < 5) {
            path.push(`${n.tagName.toLowerCase()}${n.getAttribute && n.getAttribute("aria-label") ? "[" + n.getAttribute("aria-label") + "]" : ""}${n.getAttribute && n.getAttribute("role") ? "{" + n.getAttribute("role") + "}" : ""}`);
            n = n.parentElement;
        }
        window.__lastClick = { path, defaultPrevented: e.defaultPrevented };
    }, true);
};

const browser = await chromium.launch();

// ───────────────────────── desktop arm ──────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    await page.evaluate(INSTRUMENT);

    const clickTrigger = async (i) => {
        const b = await page.locator('[aria-label="Palette menu"]').nth(i).boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
        await page.mouse.down();
        await page.mouse.up();
        await page.waitForTimeout(450);
        return { cx: +(b.x + b.width / 2).toFixed(1), cy: +(b.y + b.height / 2).toFixed(1) };
    };

    log("B_baseline", await page.evaluate(STATE));

    const p0 = await clickTrigger(0);
    log("B1_openCard0", { clickedAt: p0, ...(await page.evaluate(STATE)) });

    // B0: hit-test at card1's trigger centre while card0's menu is open
    const b1 = await page.locator('[aria-label="Palette menu"]').nth(1).boundingBox();
    log("B0_hitTestUnderLock", await page.evaluate(({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        const stack = document.elementsFromPoint(x, y).slice(0, 4).map((e) => {
            const cs = getComputedStyle(e);
            return `${e.tagName.toLowerCase()}${e.getAttribute("aria-label") ? "[" + e.getAttribute("aria-label") + "]" : ""} pe=${cs.pointerEvents}`;
        });
        const trig = document.querySelectorAll('[aria-label="Palette menu"]')[1];
        return {
            point: { x: +x.toFixed(1), y: +y.toFixed(1) },
            topMost: el ? `${el.tagName.toLowerCase()}${el.getAttribute("aria-label") ? "[" + el.getAttribute("aria-label") + "]" : ""}` : null,
            stack,
            triggerIsTopMost: el === trig,
            triggerComputedPE: getComputedStyle(trig).pointerEvents,
            bodyPE: getComputedStyle(document.body).pointerEvents,
        };
    }, { x: b1.x + b1.width / 2, y: b1.y + b1.height / 2 }));

    // B4: is the list still scrollable while the modal lock is on?
    log("B4_scrollUnderLock", await page.evaluate(() => {
        const beforeWin = window.scrollY;
        window.scrollBy(0, 300);
        const afterWin = window.scrollY;
        // find the real scroll container
        let best = null;
        for (const el of Array.from(document.querySelectorAll("div"))) {
            if (el.scrollHeight > el.clientHeight + 30 && /auto|scroll/.test(getComputedStyle(el).overflowY)) {
                if (!best || el.scrollHeight > best.scrollHeight) best = el;
            }
        }
        let inner = null;
        if (best) {
            const b = best.scrollTop;
            best.scrollTop = b + 200;
            inner = { before: b, after: best.scrollTop, moved: best.scrollTop !== b, cls: best.className.slice(0, 60) };
            best.scrollTop = b;
        }
        window.scrollTo(0, beforeWin);
        return { window: { before: beforeWin, after: afterWin, moved: afterWin !== beforeWin }, inner,
                 bodyOverflowInline: document.body.style.overflow || "", bodyPE: getComputedStyle(document.body).pointerEvents };
    }));

    // B1/B2/B3 : the cross-card sequence
    const seq = [];
    for (let k = 1; k <= 4; k++) {
        const at = await clickTrigger(1);
        seq.push({ click: k, at, ...(await page.evaluate(STATE)) });
    }
    log("B2_crossCardSequence", seq);
    log("B3_clicksToMoveMenu", (() => {
        const i = seq.findIndex((s) => s.menuCount === 1 && s.expanded[1] === "true");
        return i === -1 ? { opened: false, clicksTried: seq.length } : { opened: true, clicksNeeded: i + 2 };
    })());

    await page.screenshot({ path: new URL("./pass4-crosscard-end.png", import.meta.url).pathname });
    log("B_pageErrors_desktop", pageErrors);
    await ctx.close();
}

// ───────────────────────── mobile arm ───────────────────────────────────────
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"] });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
    await page.evaluate(INSTRUMENT);

    const tapTrigger = async (i) => {
        const loc = page.locator('[aria-label="Palette menu"]').nth(i);
        await loc.scrollIntoViewIfNeeded().catch(() => {});
        await loc.tap({ force: true });
        await page.waitForTimeout(500);
    };

    await tapTrigger(0);
    log("B5_mobile_openCard0", await page.evaluate(STATE));
    const mseq = [];
    for (let k = 1; k <= 3; k++) {
        await tapTrigger(1);
        mseq.push({ tap: k, ...(await page.evaluate(STATE)) });
    }
    log("B6_mobile_crossCardSequence", mseq);
    await page.screenshot({ path: new URL("./pass4-mobile-crosscard-end.png", import.meta.url).pathname });
    log("B_pageErrors_mobile", pageErrors);
    await ctx.close();
}

writeFileSync(new URL("./pcm-p4-b-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
