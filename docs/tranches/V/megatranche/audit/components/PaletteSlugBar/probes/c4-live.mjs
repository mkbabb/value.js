import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2500);

const out = await p.evaluate(() => {
    const probe = (cls, prop) => {
        const el = document.createElement("div");
        el.className = cls;
        el.textContent = "x";
        document.body.appendChild(el);
        const v = getComputedStyle(el).getPropertyValue(prop);
        el.remove();
        return v;
    };
    // vj-morph leave duration
    const t = document.createElement("div");
    t.className = "vj-morph-leave-active";
    document.body.appendChild(t);
    const cs = getComputedStyle(t);
    const morph = {
        transitionDuration: cs.transitionDuration,
        transitionProperty: cs.transitionProperty,
    };
    t.remove();

    // the shipped slug-edit surface in the live dock
    const slugInputs = [...document.querySelectorAll("input")].map((i) => ({
        type: i.type,
        placeholder: i.placeholder,
        name: i.getAttribute("name"),
        autocomplete: i.getAttribute("autocomplete"),
        autocapitalize: i.getAttribute("autocapitalize"),
        spellcheck: i.getAttribute("spellcheck"),
        ariaLabel: i.getAttribute("aria-label"),
        w: Math.round(i.getBoundingClientRect().width),
        h: Math.round(i.getBoundingClientRect().height),
    }));

    // does PaletteSlugBar exist anywhere in the live tree?
    const slugBarMarkers = {
        signInWithSlug: !!document.querySelector('[aria-label="Sign in with slug"]'),
        cancelSlugEdit: !!document.querySelector('[aria-label="Cancel slug edit"]'),
        accountMenu: !!document.querySelector('[aria-label="Account menu"]'),
        switchToSlug: !!document.querySelector('[aria-label="Switch to slug"]'),
        pills: document.querySelectorAll(".slug-pill").length,
    };

    return {
        classes: {
            "z-popover z-index": probe("z-popover", "z-index"),
            "duration-fast transition-duration": probe("duration-fast", "transition-duration"),
            "transition-colors duration-fast": probe("transition-colors duration-fast", "transition-duration"),
            "text-mono-small font-size": probe("text-mono-small", "font-size"),
            "text-mono-small font-family": probe("text-mono-small", "font-family").slice(0, 40),
            "text-small font-size": probe("text-small", "font-size"),
            "text-caption font-size": probe("text-caption", "font-size"),
            "font-display font-family": probe("font-display", "font-family").slice(0, 40),
            "slug-pill border-radius": probe("slug-pill", "border-radius"),
            "min-h-9 min-height": probe("min-h-9", "min-height"),
            "-bottom-4 bottom": probe("absolute -bottom-4", "bottom"),
            "baseline z-index": probe("", "z-index"),
            "baseline font-size": probe("", "font-size"),
            "baseline transition-duration": probe("", "transition-duration"),
        },
        tokens: {
            "--duration-fast": getComputedStyle(document.documentElement).getPropertyValue("--duration-fast"),
            "--z-popover": getComputedStyle(document.documentElement).getPropertyValue("--z-popover"),
        },
        morph,
        slugInputs,
        slugBarMarkers,
    };
});
console.log(JSON.stringify(out, null, 2));
await b.close();
