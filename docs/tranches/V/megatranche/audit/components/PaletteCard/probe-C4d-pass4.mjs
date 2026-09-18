// CHALLENGE-C pass 4 — probe D. READ-ONLY. Mechanism confirmation:
//   D1  under PRM, which transition legs actually fire `transitionend`?
//   D2  the teleported `.floating-panel` geometry (independent re-measure)
//   D3  the card root's own hover diff (independent re-measure of MT-F036(b))
//   D4  the card root + `.cartoon-cast` shadow stack (MT-F036(a))
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C4d-pass4-results.json", import.meta.url).pathname;
const R = {};
const cols = (arr) => arr.map((css, position) => ({ css, position }));
const iso = (ms) => new Date(Date.now() - ms).toISOString();
const FIXTURE = {
    version: 1,
    palettes: [{
        id: "p-24", name: "Twentyfour", slug: "twentyfour",
        createdAt: iso(0), updatedAt: iso(0), isLocal: true,
        colors: cols(Array.from({ length: 12 }, (_, i) => `hsl(${i * 30} 70% 55%)`)),
    }],
};

async function seed(page) {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
}

const main = async () => {
    const browser = await chromium.launch();

    // ---- D1 · PRM transition instrumentation --------------------------------
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
        const page = await ctx.newPage();
        await seed(page);
        await page.evaluate(() => {
            window.__tev = [];
            document.addEventListener("transitionrun", (e) => window.__tev.push(["run", e.propertyName, (e.target.className ?? "").toString().slice(0, 24)]), true);
            document.addEventListener("transitionend", (e) => window.__tev.push(["end", e.propertyName, (e.target.className ?? "").toString().slice(0, 24)]), true);
            document.addEventListener("transitioncancel", (e) => window.__tev.push(["cancel", e.propertyName, (e.target.className ?? "").toString().slice(0, 24)]), true);
        });
        await page.locator('[role="article"]').first().click({ position: { x: 300, y: 60 } });
        await page.waitForTimeout(2000);
        R.D1_prm = await page.evaluate(() => {
            const card = document.querySelector('[role="article"]');
            const panel = [...card.querySelectorAll(".overflow-hidden")].find((d) => d.querySelector(".flex-wrap"));
            const cs = panel ? getComputedStyle(panel) : null;
            return {
                transitionEvents: (window.__tev ?? []).filter((e) => /height|opacity/.test(e[1])).slice(0, 12),
                allEventCount: (window.__tev ?? []).length,
                panelInline: panel?.getAttribute("style") ?? null,
                computed: cs ? {
                    transitionProperty: cs.transitionProperty,
                    transitionDuration: cs.transitionDuration,
                    animationDuration: cs.animationDuration,
                } : null,
            };
        });
        await ctx.close();
    }

    // ---- D2/D3/D4 · no-PRM measurements -------------------------------------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page);

    const snap = () => page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const cs = getComputedStyle(card);
        const cast = card.querySelector(".cartoon-cast");
        const cc = cast ? getComputedStyle(cast) : null;
        return {
            card: {
                boxShadow: cs.boxShadow, borderColor: cs.borderColor, borderWidth: cs.borderTopWidth,
                background: cs.backgroundColor, transform: cs.transform, translate: cs.translate,
                scale: cs.scale, filter: cs.filter, transitionProperty: cs.transitionProperty,
                transitionDuration: cs.transitionDuration, cursor: cs.cursor, borderRadius: cs.borderRadius,
            },
            cast: cc ? {
                display: cc.display, position: cc.position, boxShadow: cc.boxShadow,
                borderRadius: cc.borderRadius, zIndex: cc.zIndex, translate: cc.translate, scale: cc.scale,
                rect: (() => { const r = cast.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })(),
            } : null,
            vars: {
                cartoonPressT: cs.getPropertyValue("--cartoon-press-t").trim(),
                cardPressT: cs.getPropertyValue("--card-press-t").trim(),
                motionWeight: cs.getPropertyValue("--motion-weight").trim(),
            },
        };
    });

    const before = await snap();
    await page.locator('[role="article"]').first().hover({ position: { x: 300, y: 60 } });
    await page.waitForTimeout(700);
    const after = await snap();
    const diff = {};
    for (const k of Object.keys(before.card)) if (before.card[k] !== after.card[k]) diff[k] = [before.card[k], after.card[k]];
    R.D3_hoverDiff = { isHovered: await page.evaluate(() => !!document.querySelector('[role="article"]:hover')), diff, cardBefore: before.card };
    R.D4_castStack = { cast: before.cast, vars: before.vars, cardBoxShadow: before.card.boxShadow };

    // ---- D2 · the hover popover panel ---------------------------------------
    await page.locator('[role="article"]').first().click({ position: { x: 300, y: 60 } });
    await page.waitForTimeout(1500);
    const dot = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const row = [...card.querySelectorAll(".overflow-hidden")].find((d) => d.querySelector(".flex-wrap"))?.querySelector(".flex-wrap");
        const first = row?.children?.[0];
        if (!first) return null;
        const r = first.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    if (dot) { await page.mouse.move(dot.x, dot.y); await page.waitForTimeout(600); }
    R.D2_floatingPanel = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        if (!p) return { present: false };
        const cs = getComputedStyle(p);
        const r = p.getBoundingClientRect();
        const declared = [...document.styleSheets].flatMap((s) => {
            try { return [...s.cssRules].map((x) => x.selectorText ?? ""); } catch { return []; }
        }).filter((sel) => sel && sel.includes("floating-panel"));
        return {
            present: true,
            inlineStyle: p.getAttribute("style"),
            computed: { position: cs.position, top: cs.top, left: cs.left, zIndex: cs.zIndex, background: cs.backgroundColor, display: cs.display },
            rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            inViewport: r.x >= 0 && r.y >= 0 && r.x < innerWidth && r.y < innerHeight,
            declaredRules: declared.slice(0, 6),
            ariaHidden: p.getAttribute("aria-hidden"),
            buttonsInside: p.querySelectorAll("button").length,
        };
    });

    await ctx.close();
    await browser.close();
    writeFileSync(OUT, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
};

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
