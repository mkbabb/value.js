// Arbiter-F probe 2 — settle-time correction for the paint-reachability ruling.
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/blob");
await page.waitForSelector(".config-console .glass-slider", { timeout: 15000 });
await page.waitForTimeout(800);
const out = await page.evaluate(async () => {
    const settle = (ms) => new Promise((r) => setTimeout(r, ms));
    const cs = (el) => getComputedStyle(el);
    const res = {};
    const sliders = [...document.querySelectorAll(".config-console .glass-slider")];
    // EXP-A': bare standard flip, settled 700ms
    const s1 = sliders[1];
    const range1 = s1.querySelector(".slider-range");
    const thumb1 = s1.querySelector(".slider-thumb");
    s1.setAttribute("data-variant", "standard");
    await settle(700);
    res.standardFlip_settled = {
        variant: s1.getAttribute("data-variant"),
        rangeBg: cs(range1).backgroundColor,
        rangeBox: { w: Math.round(range1.getBoundingClientRect().width), h: Math.round(range1.getBoundingClientRect().height) },
        thumb: { w: thumb1.getBoundingClientRect().width, opacity: cs(thumb1).opacity },
        trackBg: cs(s1.querySelector(".slider-track")).backgroundColor,
    };
    // EXP-B': token feed on the standard slider, settled
    s1.style.setProperty("--slider-range-bg", "oklch(0.55 0.19 25)");
    await settle(700);
    res.tokenFeed_standard_settled = { rangeBg: cs(range1).backgroundColor };
    // EXP-C': !important on spectrum, settled
    const st = document.createElement("style");
    st.textContent = ".config-console .slider-range{background: oklch(0.55 0.19 25) !important}";
    document.head.appendChild(st);
    await settle(700);
    const s3 = sliders[3];
    res.important_spectrum_settled = { rangeBg: cs(s3.querySelector(".slider-range")).backgroundColor };
    st.remove();
    // liquid-fill strength var anywhere on the chain?
    res.fillStrength = cs(range1).getPropertyValue("--liquid-fill-strength").trim() || "(unset → 88%)";
    return res;
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
