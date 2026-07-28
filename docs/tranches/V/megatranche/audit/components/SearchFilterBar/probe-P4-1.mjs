// CHALLENGE-D pass 4 — probe 1: closed-state geometry + host relation.
// Read-only. Drives the LIVE dev server at :9000.
import { webkit, chromium } from "playwright";
import fs from "node:fs";

const OUT = new URL("./evidence-p4/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const BASE = "http://localhost:9000";
const results = {};

async function run(engineName, engine, opts) {
    const browser = await engine.launch();
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    const consoleErrs = [];
    page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3500);

    const closed = await page.evaluate(() => {
        const trig = document.querySelector('button[aria-label="Filters"]');
        if (!trig) return { error: "trigger not found" };
        const r = (el) => {
            const b = el.getBoundingClientRect();
            return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2) };
        };
        // walk up to find the glass-ui SearchBar pill (the bordered field)
        const chain = [];
        let el = trig;
        for (let i = 0; i < 8 && el; i++) {
            const cs = getComputedStyle(el);
            chain.push({
                i, tag: el.tagName, cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || "").toString().slice(0, 140),
                rect: r(el),
                overflow: cs.overflow, overflowX: cs.overflowX, overflowY: cs.overflowY,
                borderRadius: cs.borderRadius, bg: cs.backgroundColor,
                minH: cs.minHeight, height: cs.height,
                clipPath: cs.clipPath, maskImage: cs.maskImage,
            });
            el = el.parentElement;
        }
        const cs = getComputedStyle(trig);
        return {
            trigger: {
                rect: r(trig),
                declaredClass: trig.className,
                computed: {
                    width: cs.width, height: cs.height, minHeight: cs.minHeight, minWidth: cs.minWidth,
                    padding: cs.padding, borderRadius: cs.borderRadius,
                    backgroundColor: cs.backgroundColor, color: cs.color,
                    boxShadow: cs.boxShadow.slice(0, 200), border: cs.border,
                    fontSize: cs.fontSize, position: cs.position,
                },
                ariaLabel: trig.getAttribute("aria-label"),
                ariaExpanded: trig.getAttribute("aria-expanded"),
                ariaHasPopup: trig.getAttribute("aria-haspopup"),
                accName: trig.getAttribute("aria-label") || trig.textContent.trim(),
            },
            ancestry: chain,
            docDir: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
        };
    });

    // token resolution on the trigger's owner document
    const tokens = await page.evaluate(() => {
        const probe = document.createElement("div");
        document.body.appendChild(probe);
        const names = ["--leading-small", "--type-leading-small", "--type-small", "--font-serif",
            "--font-stack-text", "--font-display", "--font-mono", "--duration-fast",
            "--ease-standard", "--radius-md", "--accent", "--type-micro", "--type-caption",
            "--primary", "--primary-foreground", "--muted-foreground", "--border"];
        const cs = getComputedStyle(probe);
        const out = {};
        for (const n of names) out[n] = cs.getPropertyValue(n).trim();
        probe.remove();
        return out;
    });

    results[engineName] = { closed, tokens, consoleErrs };
    await page.screenshot({ path: `${OUT}p4-${engineName}-closed.png` });

    // ---- open the popover ----
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(600);

    const open = await page.evaluate(() => {
        const content = document.querySelector('[data-radix-popper-content-wrapper], [data-reka-popper-content-wrapper]')
            || document.querySelector('[role="dialog"]');
        const pane = document.querySelector('[data-state="open"][role="dialog"]') || content;
        const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2) }; };
        const root = document.querySelector('[role="dialog"][data-state="open"]') || document.querySelector('[role="dialog"]');
        if (!root) return { error: "popover content not found", html: document.body.innerHTML.length };
        const cs = getComputedStyle(root);
        const opts = [...root.querySelectorAll("label.filter-option")].map((l) => {
            const c = getComputedStyle(l);
            const b = l.getBoundingClientRect();
            return {
                text: l.textContent.trim(),
                rect: { w: +b.width.toFixed(2), h: +b.height.toFixed(2) },
                fontFamily: c.fontFamily, fontSize: c.fontSize, lineHeight: c.lineHeight,
                padding: c.padding, borderRadius: c.borderRadius, cursor: c.cursor,
                transition: c.transition.slice(0, 120),
                inlineLineHeightSpecified: l.style.lineHeight,
            };
        });
        const labels = [...root.querySelectorAll(".section-label")].map((l) => {
            const c = getComputedStyle(l);
            return { text: l.textContent.trim(), fontFamily: c.fontFamily, fontSize: c.fontSize, textTransform: c.textTransform, letterSpacing: c.letterSpacing, color: c.color, marginBottom: c.marginBottom };
        });
        const sections = [...root.querySelectorAll(".filter-section")].map((s) => {
            const c = getComputedStyle(s);
            const b = s.getBoundingClientRect();
            return { label: s.querySelector(".section-label")?.textContent.trim(), padding: c.padding, h: +b.height.toFixed(2), borderTop: c.borderTopWidth + " " + c.borderTopColor };
        });
        const divider = root.querySelector(".divide-y");
        const dividerCS = divider ? getComputedStyle(divider) : null;
        // every focusable control inside
        const focusables = [...root.querySelectorAll('button, [role="radio"], [role="checkbox"], input, a[href], [tabindex]:not([tabindex="-1"])')].map((el) => {
            const b = el.getBoundingClientRect();
            const c = getComputedStyle(el);
            return {
                tag: el.tagName, role: el.getAttribute("role"), type: el.getAttribute("type"),
                name: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 40) || "(none)",
                w: +b.width.toFixed(2), h: +b.height.toFixed(2),
                disabled: el.disabled ?? el.getAttribute("aria-disabled"),
                cursor: c.cursor,
            };
        });
        const swatch = root.querySelector('button[aria-label^="Open color picker"]');
        const input = root.querySelector('input[aria-label="Search by CSS color"]');
        const searchBtn = [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
        const rr = (el) => el ? r(el) : null;
        return {
            popover: { rect: r(root), width: cs.width, padding: cs.padding, background: cs.backgroundColor, backdropFilter: cs.backdropFilter, boxShadow: cs.boxShadow.slice(0, 160), maxHeight: cs.maxHeight, overflow: cs.overflow, zIndex: cs.zIndex, role: root.getAttribute("role"), ariaLabel: root.getAttribute("aria-label"), ariaLabelledby: root.getAttribute("aria-labelledby") },
            dividerWrapperClass: divider ? divider.className : null,
            dividerBorderColor: dividerCS ? dividerCS.borderTopColor : null,
            sections, labels, opts, focusables,
            swatch: swatch ? { rect: rr(swatch), bg: getComputedStyle(swatch).backgroundColor, cs: getComputedStyle(swatch).boxShadow.slice(0, 120), forcedColorAdjust: getComputedStyle(swatch).forcedColorAdjust, name: swatch.getAttribute("aria-label"), type: swatch.getAttribute("type") } : null,
            input: input ? { rect: rr(input), paddingRight: getComputedStyle(input).paddingRight, fontFamily: getComputedStyle(input).fontFamily, fontSize: getComputedStyle(input).fontSize, placeholder: input.placeholder, inputMode: input.getAttribute("inputmode"), autocomplete: input.getAttribute("autocomplete"), spellcheck: input.getAttribute("spellcheck"), form: !!input.closest("form") } : null,
            searchBtn: searchBtn ? { rect: rr(searchBtn), type: searchBtn.getAttribute("type"), cls: searchBtn.className.slice(0, 200), computedTransition: getComputedStyle(searchBtn).transition, computedDuration: getComputedStyle(searchBtn).transitionDuration, bg: getComputedStyle(searchBtn).backgroundColor, color: getComputedStyle(searchBtn).color, fontSize: getComputedStyle(searchBtn).fontSize } : null,
            radiogroups: [...root.querySelectorAll('[role="radiogroup"]')].map((g) => ({ ariaLabel: g.getAttribute("aria-label"), ariaLabelledby: g.getAttribute("aria-labelledby"), items: g.querySelectorAll('[role="radio"]').length })),
            tagScroller: (() => { const s = root.querySelector(".scrollbar-thin"); if (!s) return null; const c = getComputedStyle(s); const b = s.getBoundingClientRect(); return { maxHeight: c.maxHeight, h: +b.height.toFixed(2), scrollH: s.scrollHeight, overflowY: c.overflowY, tabIndex: s.tabIndex, role: s.getAttribute("role") }; })(),
            clearAllPresent: !!([...root.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all"))),
        };
    });
    results[engineName].open = open;
    await page.screenshot({ path: `${OUT}p4-${engineName}-open.png` });
    const box = await page.locator('[role="dialog"]').first().boundingBox();
    if (box) await page.screenshot({ path: `${OUT}p4-${engineName}-open-crop.png`, clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: box.width + 16, height: box.height + 16 } });

    await browser.close();
}

await run("webkit-light", webkit, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
await run("webkit-dark", webkit, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
await run("chromium-light", chromium, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });

fs.writeFileSync(`${OUT}p4-1.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2).slice(0, 200));
console.log("WROTE", `${OUT}p4-1.json`);
