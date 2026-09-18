import { webkit } from "playwright";

const MEASURE = () => {
    const out = {};
    const q = (s) => document.querySelector(s);
    const qa = (s) => [...document.querySelectorAll(s)];
    const r = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
    };

    const rail = q('[data-o18="extract-k-rail"]');
    const kcWrap = q('[data-o18="extract-kc"]');
    if (!rail) return { error: "no rail", bodyLen: document.body.innerText.length };

    out.kRail = r(rail);
    const rcs = getComputedStyle(rail);
    out.kRailStyle = {
        backgroundColor: rcs.backgroundColor,
        backgroundImage: rcs.backgroundImage.slice(0, 240),
        boxShadow: rcs.boxShadow,
        borderRadius: rcs.borderRadius,
    };

    const kRow = rail.parentElement;
    const kLabel = kRow.parentElement.querySelector("label");
    const kThumb = kRow.querySelector('[role="slider"]');
    out.kLabel = kLabel && {
        rect: r(kLabel), text: kLabel.textContent.trim(),
        cs: (() => { const c = getComputedStyle(kLabel); return { fontSize: c.fontSize, fontFamily: c.fontFamily.split(",")[0], fontWeight: c.fontWeight, color: c.color, textAlign: c.textAlign, width: c.width }; })(),
        scrollW: kLabel.scrollWidth, clientW: kLabel.clientWidth,
    };
    out.kThumb = kThumb && {
        rect: r(kThumb), tag: kThumb.tagName, ariaLabel: kThumb.getAttribute("aria-label"),
        valuenow: kThumb.getAttribute("aria-valuenow"), valuetext: kThumb.getAttribute("aria-valuetext"),
        valuemin: kThumb.getAttribute("aria-valuemin"), valuemax: kThumb.getAttribute("aria-valuemax"),
        cs: (() => { const c = getComputedStyle(kThumb); return { bg: c.backgroundColor, borderColor: c.borderTopColor, bw: c.borderTopWidth, w: c.width, h: c.height, touchAction: c.touchAction }; })(),
    };
    out.kSliderRoot = (() => {
        const el = kRow.querySelector('[data-orientation]');
        return el && { rect: r(el), cls: el.className.toString().slice(0, 200), tag: el.tagName };
    })();
    out.kDescendants = [...kRow.querySelectorAll("*")].slice(0, 14).map((e) => ({
        tag: e.tagName, cls: e.className.toString().slice(0, 90), rect: r(e),
        bg: getComputedStyle(e).backgroundColor, bgi: getComputedStyle(e).backgroundImage.slice(0, 60),
    }));

    if (kcWrap) {
        const lbl = kcWrap.querySelector("label");
        const spans = [...kcWrap.children].filter((c) => c.tagName === "SPAN");
        const val = spans[spans.length - 1];
        const th = kcWrap.querySelector('[role="slider"]');
        out.kc = {
            wrap: r(kcWrap),
            label: lbl && { rect: r(lbl), text: lbl.textContent.trim(), title: lbl.getAttribute("title"), cs: (() => { const c = getComputedStyle(lbl); return { fontSize: c.fontSize, fontFamily: c.fontFamily.split(",")[0], fontWeight: c.fontWeight, color: c.color }; })() },
            value: val && { rect: r(val), text: val.textContent.trim(), scrollW: val.scrollWidth, clientW: val.clientWidth, cs: (() => { const c = getComputedStyle(val); return { fontSize: c.fontSize, fontFamily: c.fontFamily.split(",")[0], width: c.width, overflow: c.overflow, flexShrink: c.flexShrink }; })() },
            thumb: th && { rect: r(th), valuetext: th.getAttribute("aria-valuetext"), label: th.getAttribute("aria-label"), valuenow: th.getAttribute("aria-valuenow") },
            descendants: [...kcWrap.querySelectorAll("*")].slice(0, 12).map((e) => ({ tag: e.tagName, cls: e.className.toString().slice(0, 80), rect: r(e), bg: getComputedStyle(e).backgroundColor, bgi: getComputedStyle(e).backgroundImage.slice(0, 50) })),
        };
    }

    const controlsRow = kcWrap && kcWrap.parentElement;
    if (controlsRow) {
        out.controlsRow = { rect: r(controlsRow), n: controlsRow.children.length };
        out.rowChildren = [...controlsRow.children].map((c) => ({
            tag: c.tagName, cls: c.className.toString().slice(0, 90), rect: r(c),
            bg: getComputedStyle(c).backgroundColor,
            bt: getComputedStyle(c).borderTopWidth, bl: getComputedStyle(c).borderLeftWidth,
            head: c.outerHTML.slice(0, 120),
        }));
        out.rowButtons = [...controlsRow.querySelectorAll("button")].map((b) => ({
            rect: r(b), title: b.getAttribute("title"), ariaLabel: b.getAttribute("aria-label"),
            text: b.textContent.trim(), disabled: b.disabled, ariaDisabled: b.getAttribute("aria-disabled"),
            opacity: getComputedStyle(b).opacity, pe: getComputedStyle(b).pointerEvents,
            head: b.outerHTML.slice(0, 190),
        }));
    }

    out.namelessButtons = qa("button").filter((b) => {
        const t = (b.textContent || "").trim();
        return !t && !b.getAttribute("aria-label") && !b.getAttribute("aria-labelledby");
    }).map((b) => ({ title: b.getAttribute("title"), rect: r(b), head: b.outerHTML.slice(0, 120) }));

    // dropzone (the declared protagonist) for area comparison
    const dz = q('[class*="border-dashed"]') || q("input[type=file]")?.closest("div");
    out.dropzone = dz && { rect: r(dz), cls: dz.className.toString().slice(0, 120) };

    out.docWidth = document.documentElement.clientWidth;
    out.scrollW = document.documentElement.scrollWidth;
    out.dark = document.documentElement.classList.contains("dark");
    out.inkMuted = getComputedStyle(document.documentElement).getPropertyValue("--ink-muted");
    return out;
};

const run = async (label, width, height, dark) => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: dark ? "dark" : "light", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(4000);
    const res = await page.evaluate(MEASURE);
    console.log("##### " + label + " #####");
    console.log(JSON.stringify(res, null, 1));
    await browser.close();
};

await run("desktop-light-1440", 1440, 900, false);
await run("desktop-dark-1440", 1440, 900, true);
await run("mobile-light-390", 390, 844, false);
await run("narrow-light-320", 320, 800, false);
