// CHALLENGE-D · PaneHeader — resolve `--pane-title-shrink-ratio` NUMERICALLY per
// engine, at the two named bands (>=1440 cap and the phone floor-pin), and drive
// the scrub to FULL progress (past the 120px title range) to read the terminal
// scale the design law claims. READ-ONLY.
import { webkit, chromium } from "playwright";

const resolveRatio = (page) =>
    page.evaluate(() => {
        // A 1000px probe: width = ratio * 1000px -> computed width reads the ratio.
        const h = document.querySelector(".pane-header");
        const probe = document.createElement("div");
        probe.style.cssText =
            "position:absolute;left:-9999px;top:0;height:1px;" +
            "width:calc(var(--pane-title-shrink-ratio) * 1000px)";
        h.appendChild(probe);
        const w = getComputedStyle(probe).width;
        // control: the same expression written literally
        const c = document.createElement("div");
        c.style.cssText =
            "position:absolute;left:-9999px;top:0;height:1px;" +
            "width:calc(tan(atan2(var(--type-heading), var(--type-display-1))) * 1000px)";
        h.appendChild(c);
        const cw = getComputedStyle(c).width;
        // control 2: the honest arithmetic the law claims (heading / display-1)
        const d = document.createElement("div");
        d.style.cssText =
            "position:absolute;left:-9999px;top:0;height:1px;" +
            "width:calc(1000px * var(--type-heading) / var(--type-display-1))";
        h.appendChild(d);
        const dw = getComputedStyle(d).width;
        const heading = parseFloat(getComputedStyle(h).getPropertyValue("--type-heading")) * 16;
        const t = document.querySelector(".pane-header-title");
        const disp1 = parseFloat(getComputedStyle(t).fontSize);
        probe.remove();
        c.remove();
        d.remove();
        return {
            ratioVar: w,
            ratioLiteral: cw,
            ratioHonestDivision: dw,
            headingPx: heading,
            display1Px: disp1,
            trueRatio: +(heading / disp1).toFixed(6),
            atan2Supported: CSS.supports("width", "calc(tan(atan2(1px, 2px)) * 10px)"),
        };
    });

for (const [engName, eng] of [
    ["webkit", webkit],
    ["chromium", chromium],
]) {
    const b = await eng.launch();
    for (const [band, vp] of [
        ["desktop-1440", { width: 1440, height: 900 }],
        ["phone-390", { width: 390, height: 844 }],
    ]) {
        const ctx = await b.newContext({ viewport: vp });
        const page = await ctx.newPage();
        await page.goto("http://localhost:9000/#/gradient", {
            waitUntil: "domcontentloaded",
            timeout: 45000,
        });
        await page.waitForTimeout(2600);
        const r = await resolveRatio(page);
        // drive the scrub to FULL progress: force the pane taller than 120px of travel
        const scrolled = await page.evaluate(() => {
            const el = document.querySelector(".pane-scroll-fade");
            const spacer = document.createElement("div");
            spacer.style.height = "1200px";
            el.appendChild(spacer);
            el.scrollTop = 400;
            return { max: el.scrollHeight - el.clientHeight, at: el.scrollTop };
        });
        await page.waitForTimeout(900);
        const terminal = await page.evaluate(() => {
            const t = document.querySelector(".pane-header-title");
            const p = document.querySelector(".pane-header-desc-wrap > p");
            const h = document.querySelector(".pane-header");
            return {
                titleTransform: getComputedStyle(t).transform,
                titleInkH: +t.getBoundingClientRect().height.toFixed(2),
                veil: getComputedStyle(h, "::before").opacity,
                descOpacity: getComputedStyle(p).opacity,
                headerH: +h.getBoundingClientRect().height.toFixed(2),
                wrapH: +document
                    .querySelector(".pane-header-desc-wrap")
                    .getBoundingClientRect()
                    .height.toFixed(2),
            };
        });
        console.log(
            `${engName} ${band}`,
            JSON.stringify({ ...r, scrolled, terminal }, null, 1),
        );
        await ctx.close();
    }
    await b.close();
}
