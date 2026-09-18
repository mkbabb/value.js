// Arbiter-F deciding probe — ConfigSliderPane apotheosis.
// Repro: node arbiter-probe.mjs  (dev server on :9000, chromium via repo playwright)
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/blob");
await page.waitForSelector(".config-console .glass-slider", { timeout: 15000 });
await page.waitForTimeout(600);

const out = await page.evaluate(async () => {
    const raf = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const res = {};
    const sliders = [...document.querySelectorAll(".config-console .glass-slider")];
    res.sliderCount = sliders.length;
    const s0 = sliders[0];
    const range0 = s0.querySelector(".slider-range");
    const thumb0 = s0.querySelector(".slider-thumb");
    const cs = (el) => getComputedStyle(el);
    res.baseline = {
        variant: s0.getAttribute("data-variant"),
        rangeBg: cs(range0).backgroundColor,
        rangeBgImage: cs(range0).backgroundImage,
        rangeClasses: range0.className,
        liquidFillTint: cs(range0).getPropertyValue("--liquid-fill-tint").trim(),
        capsuleWarm: cs(range0).getPropertyValue("--glass-capsule-warm").trim(),
        thumb: { w: thumb0.getBoundingClientRect().width, h: thumb0.getBoundingClientRect().height, opacity: cs(thumb0).opacity },
    };
    // Is the .glass-liquid-fill paint rule loaded?
    let liquidRule = null;
    const walk = (rules) => {
        for (const r of rules) {
            try {
                if (r.selectorText && r.selectorText.includes(".glass-liquid-fill")) { liquidRule = r.cssText.slice(0, 220); return true; }
                if (r.cssRules && walk(r.cssRules)) return true;
            } catch { /* cross-origin */ }
        }
        return false;
    };
    for (const sh of document.styleSheets) { try { if (walk(sh.cssRules)) break; } catch {} }
    res.liquidFillRuleLoaded = liquidRule;

    // EXP-A: flip slider #2 to standard
    const s1 = sliders[1];
    const range1 = s1.querySelector(".slider-range");
    const thumb1 = s1.querySelector(".slider-thumb");
    s1.setAttribute("data-variant", "standard");
    await raf();
    res.expA_standardFlip = {
        variantAfter: s1.getAttribute("data-variant"),
        rangeBg: cs(range1).backgroundColor,
        rangeW: range1.getBoundingClientRect().width,
        thumb: { w: thumb1.getBoundingClientRect().width, opacity: cs(thumb1).opacity },
    };
    // EXP-B: feed --slider-range-bg on the flipped slider
    s1.style.setProperty("--slider-range-bg", "oklch(0.55 0.19 25)");
    await raf();
    res.expB_tokenFeed_standard = { rangeBg: cs(range1).backgroundColor, tint: cs(range1).getPropertyValue("--liquid-fill-tint").trim() };
    // EXP-B2: feed --slider-range-bg on an untouched SPECTRUM slider
    const s2 = sliders[2];
    const range2 = s2.querySelector(".slider-range");
    s2.style.setProperty("--slider-range-bg", "oklch(0.55 0.19 25)");
    await raf();
    res.expB2_tokenFeed_spectrum = { variant: s2.getAttribute("data-variant"), rangeBg: cs(range2).backgroundColor, tint: cs(range2).getPropertyValue("--liquid-fill-tint").trim() };
    // EXP-C: !important injection against a spectrum slider
    const st = document.createElement("style");
    st.textContent = ".config-console .slider-range{background: oklch(0.55 0.19 25) !important}";
    document.head.appendChild(st);
    await raf();
    const s3 = sliders[3];
    res.expC_important_spectrum = { variant: s3.getAttribute("data-variant"), rangeBg: cs(s3.querySelector(".slider-range")).backgroundColor };
    st.remove();

    // D-21: relatives
    const console_ = document.querySelector(".config-console");
    const card = console_.closest("[class*='glass-']") || console_.closest(".flex.flex-col.overflow-hidden");
    const cardEl = card;
    const outer = cardEl ? cardEl.parentElement : null;
    const d21 = { cardClasses: cardEl ? cardEl.className.slice(0, 120) : null };
    if (cardEl && outer) {
        d21.before = { card: cs(cardEl).position, outer: cs(outer).position };
        cardEl.classList.remove("relative");
        outer.classList.remove("relative");
        await raf();
        d21.afterRemoval = { card: cs(cardEl).position, outer: cs(outer).position };
        cardEl.classList.add("relative");
        outer.classList.add("relative");
    }
    res.d21 = d21;
    // Abs-positioned descendants of the pane root and who they contain to
    if (outer) {
        const abs = [...outer.querySelectorAll("*")].filter((e) => getComputedStyle(e).position === "absolute");
        res.d21.absCount = abs.length;
        res.d21.containedByOuterOrCard = abs.filter((e) => {
            let p = e.parentElement;
            while (p && getComputedStyle(p).position === "static") p = p.parentElement;
            return p === outer || p === cardEl;
        }).length;
    }

    // CSP-X1: dock census
    const docks = [...document.querySelectorAll(".glass-dock")];
    res.docks = docks.map((d) => ({ y: Math.round(d.getBoundingClientRect().y), inPane: !!d.closest(".config-action-bar") }));

    // AX quick-facts
    const thumbs = [...document.querySelectorAll(".config-console [role=slider]")];
    res.ax = {
        thumbCount: thumbs.length,
        valuetextNull: thumbs.filter((t) => t.getAttribute("aria-valuetext") === null).length,
        firstValuenow: thumbs[0] && thumbs[0].getAttribute("aria-valuenow"),
        labels: document.querySelectorAll(".config-console label").length,
        labelsWithFor: [...document.querySelectorAll(".config-console label")].filter((l) => l.htmlFor).length,
        groups: document.querySelectorAll(".config-console [role=group]").length,
        ariaDisabled: thumbs.filter((t) => t.getAttribute("aria-disabled") === "true").length,
    };
    return res;
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
