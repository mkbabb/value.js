import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Reproduce BOTH admin-pill markups verbatim from source and read the cascade.
const res = await page.evaluate(() => {
    const host = document.createElement("div");
    host.style.cssText = "position:absolute;left:-9999px;top:0";
    // ProfileSection.vue:96 (desktop admin pill) — verbatim
    const desktop = document.createElement("span");
    desktop.className = "slug-pill cursor-default whitespace-nowrap gold-shimmer";
    desktop.setAttribute("style", "border-color: var(--color-gold); color: var(--color-gold)");
    desktop.textContent = "admin";
    // MobileMenuDropdown.vue:67 (mobile admin pill) — verbatim
    const mobile = document.createElement("span");
    mobile.className = "slug-pill cursor-default text-muted-foreground whitespace-nowrap";
    mobile.setAttribute("style", "border-color: var(--muted-foreground); color: var(--muted-foreground)");
    mobile.textContent = "admin";
    // control: gold-shimmer with NO inline color
    const control = document.createElement("span");
    control.className = "slug-pill cursor-default whitespace-nowrap gold-shimmer";
    control.textContent = "admin";
    host.append(desktop, mobile, control);
    document.body.append(host);
    const read = (el) => {
        const cs = getComputedStyle(el);
        return {
            color: cs.color,
            backgroundClip: cs.backgroundClip || cs.webkitBackgroundClip,
            backgroundImage: cs.backgroundImage.slice(0, 60),
            animationName: cs.animationName,
            borderColor: cs.borderColor,
            borderWidth: cs.borderWidth,
        };
    };
    const out = { desktopPill: read(desktop), mobilePill: read(mobile), controlNoInline: read(control) };
    host.remove();
    return out;
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
