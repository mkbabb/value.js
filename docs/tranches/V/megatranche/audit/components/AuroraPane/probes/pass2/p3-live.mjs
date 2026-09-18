// P3 — live read-only probe of AuroraPane on http://localhost:9000/#/atmosphere
// Read-only: navigates, opens a select by keyboard, reads geometry + the a11y tree.
// Run: node <this file>
import { chromium, devices } from "playwright";

const URL = "http://localhost:9000/#/atmosphere";

const geometry = () => {
    const rows = [...document.querySelectorAll(".aurora-row")].map((r) => {
        const lab = r.querySelector(".aurora-row-label");
        const trig = r.querySelector('[role="combobox"], button');
        const lb = lab.getBoundingClientRect(), tb = trig.getBoundingClientRect();
        const cs = getComputedStyle(trig);
        return {
            label: lab.textContent.trim(),
            labelW: +lb.width.toFixed(1),
            trigLeft: +tb.left.toFixed(1),
            trigW: +tb.width.toFixed(1),
            trigH: +tb.height.toFixed(1),
            cls: trig.className,
            ariaLabel: trig.getAttribute("aria-label"),
            visibleText: trig.textContent.trim(),
            fontSize: cs.fontSize,
        };
    });
    const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    return {
        rows,
        coarse: matchMedia("(pointer: coarse)").matches,
        uiScale: cssVar("--ui-scale"),
        controlFloor: cssVar("--control-floor"),
        controlHmd: cssVar("--control-h-md"),
        controlHsm: cssVar("--control-h-sm"),
        // is the enum block inside the console well?
        enumInWell: !!document.querySelector(".console-well .aurora-row"),
        wellExists: !!document.querySelector(".console-well"),
        thumbs: [...document.querySelectorAll('.config-console [role="slider"]')].map((t) => {
            const b = t.getBoundingClientRect();
            return { label: t.getAttribute("aria-label") ?? t.closest("[aria-label]")?.getAttribute("aria-label"), w: +b.width.toFixed(0), h: +b.height.toFixed(0) };
        }),
    };
};

async function run(name, ctxOpts) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const consoleErrs = [], pageErrs = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text()); });
    page.on("pageerror", (e) => pageErrs.push(String(e)));
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForSelector(".aurora-row", { timeout: 15000 });
    await page.waitForTimeout(1200);

    console.log(`\n########## ${name} ##########`);
    const g = await page.evaluate(geometry);
    console.log("A · geometry / tokens");
    console.log(`  (pointer:coarse)=${g.coarse}  --ui-scale='${g.uiScale}'  --control-floor='${g.controlFloor}'`);
    console.log(`  --control-h-md='${g.controlHmd}'  --control-h-sm='${g.controlHsm}'`);
    for (const r of g.rows) console.log(`   ${JSON.stringify(r)}`);
    const lefts = g.rows.map((r) => r.trigLeft);
    console.log(`  trigger LEFT spread = ${(Math.max(...lefts) - Math.min(...lefts)).toFixed(1)}px   heights = ${g.rows.map((r) => r.trigH).join(",")}`);
    console.log(`  enum rows inside .console-well? ${g.enumInWell}  (a .console-well exists: ${g.wellExists})`);
    console.log(`  slider thumbs (WCAG 2.5.8 wants >=24x24): ${JSON.stringify(g.thumbs)}`);

    // B · the a11y tree for the four triggers — name AND value
    console.log("B · accessibility tree (collapsed triggers)");
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Accessibility.enable");
    const { nodes } = await cdp.send("Accessibility.getFullAXTree");
    const val = (p) => (p && p.value ? p.value.value : null);
    nodes
        .filter((n) => val(n.role) === "combobox" || /Palette harmony|Zone arrangement|Painterly medium|Motion register/.test(val(n.name) ?? ""))
        .forEach((n) =>
            console.log(
                `   ${JSON.stringify({
                    role: val(n.role),
                    name: val(n.name),
                    nameFrom: (n.name?.sources ?? []).filter((s) => s.value).map((s) => s.type),
                    value: val(n.value),
                    description: val(n.description),
                    props: (n.properties ?? []).map((p) => `${p.name}=${val(p)}`),
                })}`,
            ),
        );

    // C · keyboard: focus the Harmony trigger, open with Enter, read options
    console.log("C · keyboard operability of the Harmony select");
    const trig = page.locator('[aria-label="Palette harmony"]');
    await trig.focus();
    console.log(`   focused: ${await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName)}`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    const opts = await page.evaluate(() =>
        [...document.querySelectorAll('[role="option"]')].map((o) => {
            const strip = o.querySelector(".preview-strip");
            const b = o.getBoundingClientRect();
            return {
                text: o.textContent.trim().slice(0, 30),
                ariaLabel: o.getAttribute("aria-label"),
                stops: strip?.getAttribute("data-stops") ?? null,
                stripAriaHidden: strip?.getAttribute("aria-hidden") ?? null,
                h: +b.height.toFixed(0),
                w: +b.width.toFixed(0),
            };
        }),
    );
    console.log(`   options rendered: ${opts.length}`);
    opts.forEach((o) => console.log(`     ${JSON.stringify(o)}`));
    const distinct = new Set(opts.map((o) => o.stops).filter(Boolean));
    console.log(`   distinct data-stops: ${distinct.size} of ${opts.length}`);

    // D · THE O-14 REFERENT: what the FIELD actually paints right now
    const ground = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return [0, 1, 2, 3].map((i) => cs.getPropertyValue(`--saved-bg-${i}`).trim());
    });
    console.log(`D · painted ground --saved-bg-0..3 = ${JSON.stringify(ground)}`);
    const selectedStops = opts.find((o) => /Analogous/.test(o.text))?.stops;
    console.log(`   the SELECTED (Analogous) row's strip stops = ${selectedStops}`);

    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    console.log(`E · focus after Escape: ${await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName)}`);

    console.log(`F · consoleErrors=${consoleErrs.length} pageErrors=${pageErrs.length}`);
    consoleErrs.slice(0, 3).forEach((e) => console.log(`     ${e.slice(0, 200)}`));
    pageErrs.slice(0, 3).forEach((e) => console.log(`     ${e.slice(0, 200)}`));
    await browser.close();
}

await run("DESKTOP 1440x900", { viewport: { width: 1440, height: 900 } });
await run("MOBILE iPhone 14", { ...devices["iPhone 14"] });
