// PaletteCardMenu — CHALLENGE-C pass 4, probe A (desktop, cross-card menu contract)
// Decides:
//  A0  where does the menu content actually live in the DOM (portal target)?
//  A1  open card0's menu, then CLICK card1's trigger — how many menus? which?
//  A2  ... does a SECOND click on card1's trigger then open it?
//  A3  the controlled-open event trace: what updateOpen values does the parent
//      receive during that interaction (dispatch order)?
//  A4  does the dismiss-click also fire card1's card-level @click (expand)?
//  A5  body/html lock state at each step
//  A6  keyboard: Tab while the menu is open — where does focus go?
//  A7  long-name truncation: does DropdownMenuLabel carry a title/aria?
//  A8  double-click on a trigger — end state
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const LONG = "Extremely Long Palette Name That Should Certainly Overflow The One Hundred And Eighty Pixel Clamp";
const SEED = {
    version: 1,
    palettes: Array.from({ length: 6 }, (_, i) => ({
        id: `seed${i}`, name: i === 5 ? LONG : `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const snap = async (tag) => await page.evaluate((t) => {
    const menus = Array.from(document.querySelectorAll('[role="menu"]'));
    const trigs = Array.from(document.querySelectorAll('[aria-label="Palette menu"]'));
    return {
        tag: t,
        menuCount: menus.length,
        menuIds: menus.map((m) => m.id),
        menuLabels: menus.map((m) => {
            // the DropdownMenuLabel is the first non-separator child
            const lab = m.querySelector("div");
            return lab ? lab.textContent.trim().slice(0, 40) : null;
        }),
        triggerExpanded: trigs.map((t2) => t2.getAttribute("aria-expanded")),
        bodyPointerEvents: document.body.style.pointerEvents || "",
        bodyOverflow: document.body.style.overflow || "",
        htmlOverflow: document.documentElement.style.overflow || "",
        activeElement: (() => {
            const a = document.activeElement;
            if (!a) return null;
            return `${a.tagName}${a.getAttribute("role") ? ":" + a.getAttribute("role") : ""}:${(a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 30)}`;
        })(),
        expandedCards: document.querySelectorAll('[role="article"] [class*="swatch"]').length,
    };
}, tag);

// ── A0 : portal target ────────────────────────────────────────────────────────
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(450);
log("A0_portal", await page.evaluate(() => {
    const m = document.querySelector('[role="menu"]');
    if (!m) return null;
    const chain = [];
    let n = m;
    while (n && n !== document.documentElement) {
        chain.push(`${n.tagName.toLowerCase()}${n.id ? "#" + n.id : ""}${n.className && typeof n.className === "string" ? "." + n.className.trim().split(/\s+/).slice(0, 2).join(".") : ""}`);
        n = n.parentElement;
    }
    return { chain, insideArticle: !!m.closest('[role="article"]') };
}));
log("A1_afterOpenCard0", await snap("afterOpenCard0"));

// ── A1 : click card1's trigger while card0's menu is open ────────────────────
// instrument: record every click that reaches the document while we do it
await page.evaluate(() => {
    window.__evTrace = [];
    const rec = (phase) => (e) => {
        const t = e.target;
        window.__evTrace.push({
            phase, type: e.type,
            target: `${t.tagName}${t.getAttribute && t.getAttribute("aria-label") ? "[" + t.getAttribute("aria-label") + "]" : ""}`,
            defaultPrevented: e.defaultPrevented,
        });
    };
    for (const t of ["pointerdown", "mousedown", "click", "focusin"]) {
        document.addEventListener(t, rec("capture"), true);
    }
});

const trig1 = page.locator('[aria-label="Palette menu"]').nth(1);
const box1 = await trig1.boundingBox();
await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height / 2);
await page.waitForTimeout(500);
log("A2_afterClickCard1Trigger_1st", await snap("afterClickCard1Trigger_1st"));
log("A3_eventTrace_1st", await page.evaluate(() => window.__evTrace.slice(0, 24)));

// ── A2 : does a second click open it? ────────────────────────────────────────
await page.evaluate(() => { window.__evTrace = []; });
await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height / 2);
await page.waitForTimeout(500);
log("A4_afterClickCard1Trigger_2nd", await snap("afterClickCard1Trigger_2nd"));
log("A5_eventTrace_2nd", await page.evaluate(() => window.__evTrace.slice(0, 24)));

// third click for good measure
await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height / 2);
await page.waitForTimeout(400);
log("A6_afterClickCard1Trigger_3rd", await snap("afterClickCard1Trigger_3rd"));

// ── reset: escape out ────────────────────────────────────────────────────────
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
log("A7_afterEscape", await snap("afterEscape"));

// ── A8 : from a CLEAN state, click card2's trigger once. control. ────────────
const trig2 = page.locator('[aria-label="Palette menu"]').nth(2);
await trig2.click();
await page.waitForTimeout(450);
log("A8_CONTROL_cleanOpenCard2", await snap("CONTROL_cleanOpenCard2"));
await page.keyboard.press("Escape");
await page.waitForTimeout(350);

// ── A9 : Tab while a menu is open ────────────────────────────────────────────
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(400);
const tabWalk = [];
for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(160);
    tabWalk.push(await page.evaluate(() => {
        const a = document.activeElement;
        const inMenu = !!(a && a.closest && a.closest('[role="menu"]'));
        return {
            el: a ? `${a.tagName}${a.getAttribute("role") ? ":" + a.getAttribute("role") : ""}` : null,
            text: a ? (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 28) : null,
            inMenu,
            menus: document.querySelectorAll('[role="menu"]').length,
        };
    }));
}
log("A9_tabWalkWithMenuOpen", tabWalk);
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── A10 : long-name label truncation ─────────────────────────────────────────
const trigLast = page.locator('[aria-label="Palette menu"]').nth(5);
await trigLast.click();
await page.waitForTimeout(450);
log("A10_longNameLabel", await page.evaluate(() => {
    const m = document.querySelector('[role="menu"]');
    if (!m) return null;
    const lab = m.firstElementChild;
    if (!lab) return null;
    const cs = getComputedStyle(lab);
    const r = lab.getBoundingClientRect();
    const mr = m.getBoundingClientRect();
    return {
        tag: lab.tagName, role: lab.getAttribute("role"),
        className: lab.className,
        title: lab.getAttribute("title"),
        ariaLabel: lab.getAttribute("aria-label"),
        text: lab.textContent.trim(),
        textLen: lab.textContent.trim().length,
        clientWidth: lab.clientWidth, scrollWidth: lab.scrollWidth,
        clipped: lab.scrollWidth > lab.clientWidth + 0.5,
        maxWidth: cs.maxWidth, overflow: cs.overflow, textOverflow: cs.textOverflow,
        labRect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
        menuRect: { w: +mr.width.toFixed(1), h: +mr.height.toFixed(1), x: +mr.x.toFixed(1) },
        visibleChars: (() => {
            // binary-search the longest prefix that fits
            const probe = document.createElement("span");
            probe.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font};letter-spacing:${cs.letterSpacing}`;
            document.body.appendChild(probe);
            const full = lab.textContent.trim();
            let lo = 0, hi = full.length;
            while (lo < hi) {
                const mid = Math.ceil((lo + hi) / 2);
                probe.textContent = full.slice(0, mid);
                if (probe.getBoundingClientRect().width <= lab.clientWidth) lo = mid; else hi = mid - 1;
            }
            const out = full.slice(0, lo);
            probe.remove();
            return out;
        })(),
    };
}));
await page.screenshot({ path: new URL("./pass4-longname-label.png", import.meta.url).pathname });
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── A11 : double-click the trigger (fast) ────────────────────────────────────
const t0 = page.locator('[aria-label="Palette menu"]').first();
const b0 = await t0.boundingBox();
await page.mouse.click(b0.x + b0.width / 2, b0.y + b0.height / 2, { clickCount: 2, delay: 40 });
await page.waitForTimeout(600);
log("A11_afterDoubleClick", await snap("afterDoubleClick"));

log("pageErrors", pageErrors);
writeFileSync(new URL("./pcm-p4-a-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
