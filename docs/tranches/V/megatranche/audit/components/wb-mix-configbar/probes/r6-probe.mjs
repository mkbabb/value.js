// CHALLENGE-D round 6 probe — MixConfigBar.vue
// Read-only. Drives http://localhost:9000/#/mix in chromium + webkit.
import { chromium, webkit } from "playwright";

const ORIGIN = "http://localhost:9000/#/mix";

const MEASURE = () => {
    const px = (v) => Math.round(v * 100) / 100;
    const out = {};
    const btns = [...document.querySelectorAll("button")];
    const verb = btns.find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
    const bar = verb ? verb.parentElement : null;
    const labels = [...document.querySelectorAll("label.section-label")];
    const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((b) =>
        b.closest("main"),
    );
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const r = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { x: px(b.x), y: px(b.y), w: px(b.width), h: px(b.height), right: px(b.right), bottom: px(b.bottom) };
    };

    out.viewport = { w: innerWidth, h: innerHeight };
    out.docScrollW = document.documentElement.scrollWidth;

    const main = document.querySelector("main");
    out.main = r(main);

    // pane wrappers
    out.panes = [...document.querySelectorAll('[class*="pane-wrapper"]')].map((p) => ({
        cls: p.className,
        rect: r(p),
        childTransform: p.firstElementChild ? cs(p.firstElementChild).transform : null,
        childCls: p.firstElementChild ? p.firstElementChild.className : null,
    }));

    out.verb = verb
        ? {
              cls: verb.className,
              rect: r(verb),
              disabled: verb.disabled,
              bg: cs(verb).backgroundColor,
              bgImage: cs(verb).backgroundImage.slice(0, 60),
              radius: cs(verb).borderRadius,
              borderW: cs(verb).borderWidth,
              borderC: cs(verb).borderColor,
              shadow: cs(verb).boxShadow.slice(0, 80),
              opacity: cs(verb).opacity,
              color: cs(verb).color,
              font: cs(verb).fontFamily.split(",")[0] + " " + cs(verb).fontSize + "/" + cs(verb).fontWeight,
              transition: cs(verb).transitionDuration + " | " + cs(verb).transitionProperty,
              backdrop: cs(verb).backdropFilter,
          }
        : null;

    out.bar = bar ? { cls: bar.className, rect: r(bar), gap: cs(bar).rowGap } : null;

    out.triggers = trig.map((t) => ({
        aria: t.getAttribute("aria-label"),
        rect: r(t),
        bg: cs(t).backgroundColor,
        radius: cs(t).borderRadius,
        borderW: cs(t).borderWidth,
        borderC: cs(t).borderColor,
        shadow: cs(t).boxShadow.slice(0, 80),
        padInline: cs(t).paddingLeft + "/" + cs(t).paddingRight,
        h: cs(t).height,
        valueSpanRect: t.querySelector("span") ? r(t.querySelector("span")) : null,
        valueSpanText: t.querySelector("span") ? t.querySelector("span").textContent.trim() : null,
        font: cs(t).fontFamily.split(",")[0] + " " + cs(t).fontSize,
        color: cs(t).color,
        transition: cs(t).transitionDuration,
    }));

    out.labels = labels.map((l) => ({
        text: l.textContent.trim(),
        rect: r(l),
        color: cs(l).color,
        font: cs(l).fontFamily.split(",")[0] + " " + cs(l).fontSize + "/" + cs(l).fontWeight,
        tracking: cs(l).letterSpacing,
        transform: cs(l).textTransform,
    }));

    // sibling regions inside the pane column (source selector / config bar / result)
    const col = bar ? bar.parentElement : null;
    out.column = col
        ? {
              cls: col.className,
              rect: r(col),
              gap: cs(col).rowGap,
              children: [...col.children].map((c) => ({
                  tag: c.tagName,
                  cls: (c.className || "").toString().slice(0, 70),
                  rect: r(c),
              })),
          }
        : null;

    // the Card housing
    const card = col ? col.closest('[class*="glass-"], [data-tier], .card') : null;
    out.card = card ? { cls: (card.className || "").toString().slice(0, 120), rect: r(card) } : null;

    // root tokens that matter
    const rs = getComputedStyle(document.documentElement);
    out.tokens = {
        uiScale: rs.getPropertyValue("--ui-scale").trim(),
        glassLevel: rs.getPropertyValue("--glass-level").trim(),
        tint: rs.getPropertyValue("--glass-tint-strength").trim(),
        mutedFg: rs.getPropertyValue("--muted-foreground").trim(),
        opacityDisabled: rs.getPropertyValue("--opacity-disabled").trim(),
        surfaceReducedOpaque: rs.getPropertyValue("--surface-reduced-opaque").trim(),
    };
    return out;
};

async function run(name, browserType, opts = {}) {
    const browser = await browserType.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const page = await ctx.newPage();
    const res = { engine: name };

    await page.goto(ORIGIN, { waitUntil: "load" });
    await page.waitForTimeout(1200);

    // P1 — pane transform settle trace
    const trace = [];
    for (const t of [0, 400, 900, 2000, 4000]) {
        if (t) await page.waitForTimeout(t === 0 ? 0 : 400 + (t > 900 ? t / 4 : 0));
        trace.push(
            await page.evaluate(() => {
                const p = [...document.querySelectorAll('[class*="pane-wrapper"]')].map((w) => ({
                    cls: w.className.split(" ").filter((c) => c.startsWith("pane-wrapper")).join(" "),
                    t: w.firstElementChild ? getComputedStyle(w.firstElementChild).transform : null,
                    childCls: w.firstElementChild ? w.firstElementChild.className.slice(0, 60) : null,
                }));
                return { ms: Math.round(performance.now()), panes: p };
            }),
        );
    }
    res.paneTrace = trace;

    await page.waitForTimeout(1500);
    res.base = await page.evaluate(MEASURE);

    // P7 — --ui-scale response
    res.uiScale = await page.evaluate(() => {
        const btns = [...document.querySelectorAll("button")];
        const verb = btns.find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
        const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((b) => b.closest("main"));
        const bar = verb.parentElement;
        const grid = bar.firstElementChild;
        const snap = () => ({
            verbH: verb.getBoundingClientRect().height,
            trigH: trig[0].getBoundingClientRect().height,
            trigPadL: getComputedStyle(trig[0]).paddingLeft,
            trigFont: getComputedStyle(trig[0]).fontSize,
            gridGap: getComputedStyle(grid).columnGap,
            barGap: getComputedStyle(bar).rowGap,
            labelFont: getComputedStyle(document.querySelector("label.section-label")).fontSize,
            cardPadL: getComputedStyle(bar.parentElement).paddingLeft,
        });
        const before = snap();
        document.documentElement.style.setProperty("--ui-scale", "1.5");
        const after = snap();
        document.documentElement.style.removeProperty("--ui-scale");
        return { before, after };
    });

    // P5 — genuine prefers-contrast: more
    await page.emulateMedia({ contrast: "more" });
    await page.waitForTimeout(300);
    res.contrastMore = await page.evaluate(() => {
        const rs = getComputedStyle(document.documentElement);
        const btns = [...document.querySelectorAll("button")];
        const verb = btns.find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
        const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((b) => b.closest("main"))[0];
        const lab = document.querySelector("label.section-label");
        return {
            matches: matchMedia("(prefers-contrast: more)").matches,
            mutedFg: rs.getPropertyValue("--muted-foreground").trim(),
            glassLevel: rs.getPropertyValue("--glass-level").trim(),
            labelColor: getComputedStyle(lab).color,
            verbBorderW: getComputedStyle(verb).borderWidth,
            verbColor: getComputedStyle(verb).color,
            verbBg: getComputedStyle(verb).backgroundColor,
            verbOpacity: getComputedStyle(verb).opacity,
            trigBorderW: getComputedStyle(trig).borderWidth,
            trigBg: getComputedStyle(trig).backgroundColor,
        };
    });
    await page.emulateMedia({ contrast: "no-preference" });

    // P3 — genuine prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(200);
    res.reducedMotion = await page.evaluate(() => {
        const btns = [...document.querySelectorAll("button")];
        const verb = btns.find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
        const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((b) => b.closest("main"))[0];
        return {
            matches: matchMedia("(prefers-reduced-motion: reduce)").matches,
            verbTransitionDur: getComputedStyle(verb).transitionDuration,
            verbAnimName: getComputedStyle(verb).animationName,
            trigTransitionDur: getComputedStyle(trig).transitionDuration,
        };
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });

    // P4 — genuine forced-colors
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(300);
    res.forcedColors = await page.evaluate(() => {
        const btns = [...document.querySelectorAll("button")];
        const verb = btns.find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
        const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((b) => b.closest("main"))[0];
        const lab = document.querySelector("label.section-label");
        const g = (el) => {
            const c = getComputedStyle(el);
            return {
                color: c.color,
                bg: c.backgroundColor,
                borderW: c.borderWidth,
                borderC: c.borderColor,
                opacity: c.opacity,
                fca: c.forcedColorAdjust,
                bgImage: c.backgroundImage.slice(0, 40),
            };
        };
        return {
            matches: matchMedia("(forced-colors: active)").matches,
            verb: g(verb),
            trigger: g(trig),
            label: g(lab),
        };
    });
    await page.emulateMedia({ forcedColors: "none" });

    // P6 — genuine prefers-reduced-transparency (chromium CDP only)
    if (name === "chromium") {
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Emulation.setEmulatedMedia", {
            features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
        });
        await page.waitForTimeout(300);
        res.reducedTransparency = await page.evaluate(() => {
            const btns = [...document.querySelectorAll("button")];
            const verb = btns.find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
            const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((b) => b.closest("main"))[0];
            const rs = getComputedStyle(document.documentElement);
            return {
                matches: matchMedia("(prefers-reduced-transparency: reduce)").matches,
                glassLevel: rs.getPropertyValue("--glass-level").trim(),
                surfaceReducedOpaque: rs.getPropertyValue("--surface-reduced-opaque").trim(),
                verbBg: getComputedStyle(verb).backgroundColor,
                verbBackdrop: getComputedStyle(verb).backdropFilter,
                verbOpacity: getComputedStyle(verb).opacity,
                verbHasGlassWash: verb.classList.contains("glass-wash"),
                trigBg: getComputedStyle(trig).backgroundColor,
                trigBackdrop: getComputedStyle(trig).backdropFilter,
            };
        });
        await cdp.send("Emulation.setEmulatedMedia", { features: [] });
    }

    // P9 — palettes mode: does the third field appear, and what moves
    res.modeToggle = await page.evaluate(async () => {
        const btns = [...document.querySelectorAll("button")];
        const verb = () => [...document.querySelectorAll("button")].find((b) => (b.textContent || "").trim() === "Mix" && b.closest("main"));
        const pal = btns.find((b) => (b.textContent || "").trim() === "Palettes");
        const before = { verbTop: verb().getBoundingClientRect().top, fields: document.querySelectorAll('button[role="combobox"]').length };
        if (!pal) return { note: "no Palettes control found", before };
        pal.click();
        await new Promise((r) => setTimeout(r, 500));
        const v = verb();
        const after = {
            verbTop: v ? v.getBoundingClientRect().top : null,
            fields: document.querySelectorAll('button[role="combobox"]').length,
            verbDisabled: v ? v.disabled : null,
            third: [...document.querySelectorAll('button[role="combobox"]')].map((t) => ({
                aria: t.getAttribute("aria-label"),
                w: Math.round(t.getBoundingClientRect().width),
            })),
        };
        return { before, after, delta: after.verbTop - before.verbTop };
    });

    await browser.close();
    return res;
}

const results = [];
results.push(await run("chromium", chromium));
results.push(await run("webkit", webkit));
console.log(JSON.stringify(results, null, 1));
