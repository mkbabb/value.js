// CHALLENGE-D probe 2 — MiniColorPicker.vue
// Mobile reachability · stuck-drag · thumb-on-white contrast · RTL · type census.
//   node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe2.mjs
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";
const out = {};
const browser = await webkit.launch();

// ---------------------------------------------------------------- A. mobile reachability
for (const [id, ctx] of [
    ["mobile-light", { ...devices["iPhone 14"], colorScheme: "light" }],
    ["mobile-dark", { ...devices["iPhone 14"], colorScheme: "dark" }],
    ["zoom-200", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" }],
]) {
    const context = await browser.newContext(ctx);
    const page = await context.newPage();
    const rec = {};
    out[id] = rec;
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(800);

    rec.reach = await page.evaluate(() => {
        const sw = document.querySelector('button[aria-label^="Open color picker"]');
        const dlg = sw?.closest('[role="dialog"]');
        const b = sw?.getBoundingClientRect();
        const d = dlg?.getBoundingClientRect();
        // any scrollable ancestor between the swatch and the dialog root?
        let scrollers = [];
        let n = sw;
        while (n && n !== document.body) {
            const cs = getComputedStyle(n);
            if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 1)
                scrollers.push({ tag: n.tagName.toLowerCase(), cls: String(n.className).slice(0, 60), sh: n.scrollHeight, ch: n.clientHeight });
            n = n.parentElement;
        }
        return {
            viewport: { w: innerWidth, h: innerHeight },
            swatchRect: b ? { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), bottom: +b.bottom.toFixed(1) } : null,
            dialogRect: d ? { y: +d.y.toFixed(1), h: +d.height.toFixed(1), bottom: +d.bottom.toFixed(1) } : null,
            swatchBelowFoldPx: b ? +(b.bottom - innerHeight).toFixed(1) : null,
            dialogBelowFoldPx: d ? +(d.bottom - innerHeight).toFixed(1) : null,
            docScrollable: document.scrollingElement.scrollHeight > innerHeight + 1,
            scrollersBetween: scrollers,
        };
    });

    await page.screenshot({ path: resolve(SHOTS, `${id}-filters-open.png`) });

    // force the picker open programmatically to see what it WOULD render at this size
    await page.evaluate(() => document.querySelector('button[aria-label^="Open color picker"]')?.click());
    await page.waitForTimeout(700);
    rec.forced = await page.evaluate(() => {
        const c = document.querySelector(".sv-canvas");
        if (!c) return { rendered: false };
        const dlg = c.closest('[role="dialog"]');
        const d = dlg.getBoundingClientRect();
        const cs = getComputedStyle(c);
        return {
            rendered: true,
            miniRect: { x: +d.x.toFixed(1), y: +d.y.toFixed(1), w: +d.width.toFixed(1), h: +d.height.toFixed(1), bottom: +d.bottom.toFixed(1) },
            miniBelowFoldPx: +(d.bottom - innerHeight).toFixed(1),
            miniAboveFoldPx: +(0 - d.y).toFixed(1),
            touchActionCanvas: cs.touchAction,
            touchActionRail: getComputedStyle(c.nextElementSibling).touchAction,
            railH: +c.nextElementSibling.getBoundingClientRect().height.toFixed(1),
            dialogCount: document.querySelectorAll('[role="dialog"]').length,
        };
    });
    await page.screenshot({ path: resolve(SHOTS, `${id}-mini-forced.png`) });
    await context.close();
}

// ---------------------------------------------------------------- B. desktop deep census
{
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await context.newPage();
    const rec = {};
    out["desktop-deep"] = rec;
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(600);
    await page.click('button[aria-label^="Open color picker"]');
    await page.waitForTimeout(600);

    rec.type = await page.evaluate(() => {
        const dlg = document.querySelector(".sv-canvas").closest('[role="dialog"]');
        const ro = dlg.querySelector("span.fira-code");
        const btn = [...dlg.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
        const g = (el) => {
            const s = getComputedStyle(el);
            return { fontSize: s.fontSize, fontStyle: s.fontStyle, fontWeight: s.fontWeight, fontFamily: s.fontFamily.split(",")[0], lineHeight: s.lineHeight, color: s.color };
        };
        // what does the sheet say p-2.5 should be, vs what won?
        const cs = getComputedStyle(dlg);
        return {
            readout: g(ro),
            searchBtn: g(btn),
            searchBtnRole: btn.getAttribute("role"),
            searchBtnAttrs: [...btn.attributes].map((a) => `${a.name}=${a.value}`.slice(0, 60)),
            dialogClassList: [...dlg.classList],
            dialogPadding: cs.padding,
            dialogWidth: cs.width,
            spacingToken: getComputedStyle(document.documentElement).getPropertyValue("--spacing"),
        };
    });

    // ---- thumb at the exact (0,0) SV corner: white ring, white fill, white field
    const c = await page.evaluate(() => {
        const b = document.querySelector(".sv-canvas").getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height };
    });
    await page.mouse.move(c.x + 0.5, c.y + 0.5);
    await page.mouse.down();
    await page.waitForTimeout(120);
    await page.mouse.up();
    await page.waitForTimeout(300);
    rec.whiteCorner = await page.evaluate(() => {
        const canvas = document.querySelector(".sv-canvas");
        const th = canvas.firstElementChild;
        const ro = canvas.closest('[role="dialog"]').querySelector("span.fira-code");
        const cr = canvas.getBoundingClientRect(), tr = th.getBoundingClientRect();
        const ix = Math.max(0, Math.min(cr.right, tr.right) - Math.max(cr.left, tr.left));
        const iy = Math.max(0, Math.min(cr.bottom, tr.bottom) - Math.max(cr.top, tr.top));
        return {
            hex: ro.textContent.trim(),
            thumbFill: th.style.background,
            thumbBorder: getComputedStyle(th).borderColor,
            thumbLeft: th.style.left,
            thumbTop: th.style.top,
            hiddenPct: +((1 - (ix * iy) / (tr.width * tr.height)) * 100).toFixed(1),
        };
    });
    const box = await page.evaluate(() => {
        const d = document.querySelector(".sv-canvas").closest('[role="dialog"]').getBoundingClientRect();
        return { x: d.x - 8, y: d.y - 8, width: d.width + 16, height: d.height + 16 };
    });
    await page.screenshot({ path: resolve(SHOTS, "desktop-light-white-corner.png"), clip: box });

    // ---- stuck-drag: pointerdown on the SV field, then Escape (content unmounts),
    //      reopen, then MOVE with no button pressed and see whether the value changes.
    await page.mouse.move(c.x + c.w * 0.5, c.y + c.h * 0.5);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.keyboard.press("Escape");        // popover content unmounts mid-drag
    await page.waitForTimeout(400);
    await page.mouse.up();                       // released over nothing
    await page.waitForTimeout(200);
    await page.click('button[aria-label^="Open color picker"]');
    await page.waitForTimeout(600);
    const c2 = await page.evaluate(() => {
        const b = document.querySelector(".sv-canvas").getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height };
    });
    const readHex = () =>
        page.evaluate(() => document.querySelector(".sv-canvas").closest('[role="dialog"]').querySelector("span.fira-code").textContent.trim());
    const beforeHover = await readHex();
    await page.mouse.move(c2.x + c2.w * 0.1, c2.y + c2.h * 0.9); // hover only, no button
    await page.waitForTimeout(120);
    await page.mouse.move(c2.x + c2.w * 0.9, c2.y + c2.h * 0.1);
    await page.waitForTimeout(250);
    const afterHover = await readHex();
    rec.stuckDrag = { beforeHover, afterHover, mutatedByHoverAlone: beforeHover !== afterHover };

    await context.close();
}

// ---------------------------------------------------------------- C. RTL
{
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await context.newPage();
    const rec = {};
    out["rtl-desktop"] = rec;
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2000);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(400);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(600);
    await page.click('button[aria-label^="Open color picker"]');
    await page.waitForTimeout(700);
    rec.rtl = await page.evaluate(() => {
        const canvas = document.querySelector(".sv-canvas");
        if (!canvas) return { rendered: false };
        const dlg = canvas.closest('[role="dialog"]');
        const ro = dlg.querySelector("span.fira-code");
        const R = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), w: +b.width.toFixed(1) }; };
        return {
            rendered: true,
            readoutDirAttr: ro.getAttribute("dir"),
            readoutComputedDir: getComputedStyle(ro).direction,
            readoutUnicodeBidi: getComputedStyle(ro).unicodeBidi,
            readoutText: ro.textContent.trim(),
            canvasBg: getComputedStyle(canvas).backgroundImage.slice(0, 120),
            railBg: getComputedStyle(canvas.nextElementSibling).backgroundImage.slice(0, 80),
            thumbLeft: canvas.firstElementChild.style.left,
            dlg: R(dlg),
        };
    });
    const box2 = await page.evaluate(() => {
        const d = document.querySelector(".sv-canvas")?.closest('[role="dialog"]')?.getBoundingClientRect();
        return d ? { x: Math.max(0, d.x - 8), y: Math.max(0, d.y - 8), width: d.width + 16, height: d.height + 16 } : null;
    });
    if (box2) await page.screenshot({ path: resolve(SHOTS, "rtl-desktop-mini.png"), clip: box2 });
    await context.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe2.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
