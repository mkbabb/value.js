// CHALLENGE-D pass-3 · probe 1 — THE TYPE + GEOMETRY REGISTER.
// Independent of pass 1 / pass 2 harnesses. Read-only. WebKit (the shipped Safari engine).
//
// Decides:
//   R1  dead-class scan: does ANY loaded stylesheet rule match `.focus-ring` or `.scrollbar-thin`?
//   R2  the alignment ladder — section-label text x vs option marker x vs option text x
//   R3  the type register per PROPORTION-AUDIT §5.13 (family/size/transform of every text role)
//   R4  the colour row's optical baseline (swatch vs Input vs inline Search pill)
//   R5  divider census (PR-05: "every other divider/ornament is zero")
//   R6  tap-target census at 390px
//   R7  popover a11y: accessible name of the dialog, aria-expanded on the trigger
//   R8  vertical rhythm: per-section padding, the Clear-all row's deviation
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "evidence-p3");
const SHOTS = resolve(HERE, "shots-p3");
mkdirSync(OUT, { recursive: true });
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const MEASURE = () => {
    const r = (n) => (n === null || n === undefined ? null : +Number(n).toFixed(2));
    const rect = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { x: r(b.x), y: r(b.y), w: r(b.width), h: r(b.height), right: r(b.right), bottom: r(b.bottom) };
    };
    const type = (el) => {
        if (!el) return null;
        const c = getComputedStyle(el);
        return {
            family: c.fontFamily.split(",")[0].replace(/['"]/g, ""),
            size: c.fontSize,
            weight: c.fontWeight,
            transform: c.textTransform,
            tracking: c.letterSpacing,
            lineHeight: c.lineHeight,
            color: c.color,
        };
    };
    // exact ink x of the first text node of an element
    const inkX = (el) => {
        if (!el) return null;
        const tn = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
        const target = tn ?? el;
        const rg = document.createRange();
        rg.selectNodeContents(target);
        const b = rg.getBoundingClientRect();
        return b.width ? r(b.x) : null;
    };

    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const trig = document.querySelector('button[aria-label="Filters"]');

    // ---- R1 dead-class scan -------------------------------------------------
    const wanted = ["focus-ring", "scrollbar-thin", "shadow-cartoon-sm", "shadow-cartoon-md", "text-micro", "duration-fast"];
    const deadScan = Object.fromEntries(wanted.map((w) => [w, 0]));
    for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (list) => {
            for (const rule of list) {
                if (rule.cssRules) walk(rule.cssRules);
                const sel = rule.selectorText;
                if (!sel) continue;
                for (const w of wanted) if (sel.includes("." + w)) deadScan[w]++;
            }
        };
        walk(rules);
    }

    if (!dlg) return { open: false, deadScan, trigger: { rect: rect(trig), ariaExpanded: trig?.getAttribute("aria-expanded") } };

    const sections = [...dlg.querySelectorAll(".filter-section")];
    const labels = [...dlg.querySelectorAll(".section-label")];
    const options = [...dlg.querySelectorAll(".filter-option")];
    const swatch = dlg.querySelector('button[aria-label^="Open color picker"]');
    const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
    const searchBtn = input ? input.parentElement.querySelector("button") : null;
    const clearBtn = [...dlg.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all"));
    const tagScroller = dlg.querySelector(".max-h-28");

    // ---- R5 divider census --------------------------------------------------
    const dividerCarrier = dlg.querySelector(".divide-y");
    const dividers = dividerCarrier
        ? [...dividerCarrier.children].map((ch, i) => {
              const c = getComputedStyle(ch);
              return { i, borderTopWidth: c.borderTopWidth, borderTopColor: c.borderTopColor, cls: ch.className };
          })
        : [];
    const dividerCount = dividers.filter((d) => parseFloat(d.borderTopWidth) > 0).length;

    // ---- R8 vertical rhythm -------------------------------------------------
    const rhythm = [...(dividerCarrier?.children ?? [])].map((ch) => {
        const c = getComputedStyle(ch);
        return {
            cls: String(ch.className).slice(0, 40),
            padTop: c.paddingTop, padBottom: c.paddingBottom, padLeft: c.paddingLeft, padRight: c.paddingRight,
            rect: rect(ch),
        };
    });

    // ---- R6 tap targets -----------------------------------------------------
    const interactive = [...dlg.querySelectorAll('button, input, [role="radio"], [role="checkbox"], label.filter-option, a')];
    const targets = interactive.map((el) => {
        const b = el.getBoundingClientRect();
        return {
            tag: el.tagName.toLowerCase(),
            role: el.getAttribute("role"),
            name: (el.getAttribute("aria-label") || el.textContent.trim() || el.getAttribute("placeholder") || "").slice(0, 34),
            w: r(b.width), h: r(b.height),
            under44: b.width < 44 || b.height < 44,
            under24: b.width < 24 || b.height < 24,
        };
    });

    return {
        open: true,
        deadScan,
        trigger: {
            rect: rect(trig),
            ariaExpanded: trig?.getAttribute("aria-expanded"),
            ariaHaspopup: trig?.getAttribute("aria-haspopup"),
            contain: trig ? getComputedStyle(trig).contain : null,
            iconAriaHidden: trig?.querySelector("svg")?.getAttribute("aria-hidden"),
            badge: (() => {
                const s = trig?.querySelector("span");
                if (!s) return null;
                const c = getComputedStyle(s);
                return { rect: rect(s), bg: c.backgroundColor, color: c.color, type: type(s), text: s.textContent.trim() };
            })(),
        },
        dialog: {
            rect: rect(dlg),
            role: dlg.getAttribute("role"),
            ariaLabel: dlg.getAttribute("aria-label"),
            ariaLabelledby: dlg.getAttribute("aria-labelledby"),
            ariaDescribedby: dlg.getAttribute("aria-describedby"),
            headings: [...dlg.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.textContent.trim()),
            liveRegions: [...dlg.querySelectorAll("[aria-live],[role=status],[role=alert]")].length,
            padding: getComputedStyle(dlg).padding,
            width: getComputedStyle(dlg).width,
        },
        // ---- R2 alignment ladder ---------------------------------------------
        ladder: {
            dialogContentLeft: rect(dlg)?.x,
            sectionLefts: sections.map((s) => rect(s).x),
            sectionPadLeft: sections.map((s) => getComputedStyle(s).paddingLeft),
            labelInkX: labels.map((l) => ({ text: l.textContent.trim(), x: inkX(l) })),
            optionRows: options.map((o) => {
                const marker = o.querySelector('button,[role="radio"],[role="checkbox"]');
                const icon = o.querySelector("svg");
                const span = o.querySelector("span");
                return {
                    text: o.textContent.trim().slice(0, 22),
                    rowX: rect(o).x, rowW: rect(o).w, rowH: rect(o).h,
                    markerX: rect(marker)?.x, markerW: rect(marker)?.w, markerH: rect(marker)?.h,
                    iconX: rect(icon)?.x,
                    textX: inkX(span),
                };
            }),
        },
        // ---- R3 type register --------------------------------------------------
        typeRegister: {
            sectionLabel: type(labels[0]),
            optionText: type(options[0]?.querySelector("span")),
            optionRow: type(options[0]),
            input: type(input),
            searchPill: type(searchBtn),
            clearAll: type(clearBtn),
            badge: type(trig?.querySelector("span")),
        },
        // ---- R4 colour row -----------------------------------------------------
        colourRow: {
            swatch: rect(swatch),
            swatchStyle: swatch ? (({ borderWidth, borderRadius, boxShadow, transition }) => ({ borderWidth, borderRadius, boxShadow, transition }))(getComputedStyle(swatch)) : null,
            input: rect(input),
            inputPadRight: input ? getComputedStyle(input).paddingRight : null,
            inputTextOverflow: input ? getComputedStyle(input).textOverflow : null,
            inputOverflow: input ? getComputedStyle(input).overflow : null,
            inputWhiteSpace: input ? getComputedStyle(input).whiteSpace : null,
            searchPill: rect(searchBtn),
            searchPillGapToInputEdge: searchBtn && input ? r(input.getBoundingClientRect().right - searchBtn.getBoundingClientRect().right) : null,
            reservedMinusActual: searchBtn && input ? r(parseFloat(getComputedStyle(input).paddingRight) - searchBtn.getBoundingClientRect().width) : null,
            swatchCentreY: swatch ? r(swatch.getBoundingClientRect().y + swatch.getBoundingClientRect().height / 2) : null,
            inputCentreY: input ? r(input.getBoundingClientRect().y + input.getBoundingClientRect().height / 2) : null,
        },
        dividers, dividerCount, rhythm, targets,
        tags: {
            scrollerRect: rect(tagScroller),
            scrollH: tagScroller?.scrollHeight ?? null,
            clientH: tagScroller?.clientHeight ?? null,
            overflowing: tagScroller ? tagScroller.scrollHeight > tagScroller.clientHeight + 1 : null,
            count: tagScroller ? tagScroller.querySelectorAll("label").length : 0,
        },
    };
};

const results = {};
const MATRIX = [
    { name: "desktop-light", viewport: { width: 1440, height: 900 }, colorScheme: "light" },
    { name: "desktop-dark", viewport: { width: 1440, height: 900 }, colorScheme: "dark" },
    { name: "mobile-light", viewport: { width: 390, height: 664 }, colorScheme: "light", isMobile: true, hasTouch: true, deviceScaleFactor: 3 },
];

const browser = await webkit.launch();
for (const m of MATRIX) {
    const { name, ...ctxOpts } = m;
    const context = await browser.newContext(ctxOpts);
    const page = await context.newPage();
    const consoleErrs = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrs.push(msg.text().slice(0, 200)); });
    page.on("pageerror", (e) => consoleErrs.push("PAGEERROR " + String(e).slice(0, 200)));
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(700);
    results[name] = await page.evaluate(MEASURE);
    results[name].consoleErrs = consoleErrs;
    await page.screenshot({ path: resolve(SHOTS, `P3-${name}-open.png`), fullPage: false });
    await context.close();
}
await browser.close();

writeFileSync(resolve(OUT, "P3-1-register.json"), JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
