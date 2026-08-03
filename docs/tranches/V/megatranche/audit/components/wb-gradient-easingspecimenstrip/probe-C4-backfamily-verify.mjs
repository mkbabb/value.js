import { webkit } from "playwright";

const URL = "http://localhost:9000/#/gradient";
const out = (o) => console.log(JSON.stringify(o));

async function freshPage(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 160)));
    page.on("console", (m) => {
        if (m.type() === "error") errors.push("console:" + m.text().slice(0, 160));
    });
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForSelector("#easing-interval-0 [data-specimen]", { timeout: 20000 });
    return { ctx, page, errors };
}

const browser = await webkit.launch();

// ─────────────────────────────────────────────────────────────────────────────
console.log("=== A · back-family press, one clean context each (HEAD d19da6d3) ===");
for (const id of ["ease-out-circ", "ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-out-expo"]) {
    const { ctx, page, errors } = await freshPage(browser);
    let clicked = false;
    try {
        await page.click(`#easing-interval-0 [data-specimen="${id}"]`, { timeout: 4000 });
        clicked = true;
    } catch { /* click failed */ }
    await page.waitForTimeout(600);
    const state = await page.evaluate(() => {
        const row = document.querySelector("#easing-interval-0");
        const head = document.querySelector('[aria-controls="easing-interval-0"]');
        const bodyText = document.body.innerText.toLowerCase();
        return {
            stripAlive: !!document.querySelector("#easing-interval-0 [data-specimen]"),
            pressed: [...(row?.querySelectorAll("[data-specimen]") ?? [])]
                .filter((t) => t.getAttribute("data-state") === "on")
                .map((t) => t.getAttribute("data-specimen")),
            readout: row?.querySelector("code")?.textContent?.trim() ?? null,
            headName: head?.textContent?.replace(/\s+/g, " ").trim() ?? null,
            boundary: /unexpected error|something went wrong/.test(bodyText)
                ? bodyText.match(/[^.]*unexpected error[^.]*\./)?.[0]?.trim() ?? "boundary text"
                : null,
        };
    });
    out({ id, clicked, ...state, errors: errors.filter((e) => !/MISCONFIGURED|VITE_API_URL/.test(e)).slice(0, 2) });
    await ctx.close();
}

// ─────────────────────────────────────────────────────────────────────────────
console.log("=== B · standing structural claims re-measured ===");
{
    const { ctx, page } = await freshPage(browser);
    const m = await page.evaluate(() => {
        const strip = document.querySelector(".specimen-strip");
        const tile = document.querySelector('[data-specimen="linear"]');
        const unlit = document.querySelector('[data-specimen="ease"]');
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const sc = cs(strip), tc = cs(tile), uc = cs(unlit);
        let stripRules = 0, chipRules = 0;
        for (const s of document.styleSheets) {
            let rules; try { rules = s.cssRules; } catch { continue; }
            for (const r of rules ?? []) {
                const t = r.cssText ?? "";
                if (t.includes(".specimen-strip")) stripRules++;
                if (t.includes(".glass-chip")) chipRules++;
            }
        }
        return {
            stripPort: { radius: sc.borderRadius, overflowX: sc.overflowX, scrollW: strip.scrollWidth, clientW: strip.clientWidth, box: [Math.round(strip.getBoundingClientRect().width), Math.round(strip.getBoundingClientRect().height)] },
            specimenStripRuleCount: stripRules,
            glassChipRuleCount: chipRules,
            litTile: { radius: tc.borderRadius, boxShadow: tc.boxShadow, border: tc.borderWidth, bg: tc.backgroundColor, backdrop: tc.backdropFilter },
            unlitTile: { radius: uc.borderRadius, boxShadow: uc.boxShadow, border: uc.borderWidth, bg: uc.backgroundColor, backdrop: uc.backdropFilter },
            svgRoleImgCount: document.querySelectorAll("#easing-interval-0 svg[role='img']").length,
            svgRoles: [...document.querySelectorAll("#easing-interval-0 svg")].map((s) => s.getAttribute("role")),
            tiles: document.querySelectorAll("[data-specimen]").length,
            pageElements: document.querySelectorAll("*").length,
            stripElements: document.querySelectorAll(".specimen-strip *").length,
            fadingScrollAttrs: [...document.querySelector(".fading-scroll").attributes].map((a) => `${a.name}=${a.value}`.slice(0, 40)),
            fsTabindex: document.querySelector(".fading-scroll").getAttribute("tabindex"),
            fsRole: document.querySelector(".fading-scroll").getAttribute("role"),
        };
    });
    out(m);

    // C-17 hover on the pressed tile
    const hoverProbe = async () => page.evaluate(() => {
        const t = document.querySelector('[data-specimen="linear"]');
        return {
            state: t.getAttribute("data-state"),
            labelColor: getComputedStyle(t.querySelector(".tile-label")).color,
            stroke: getComputedStyle(t.querySelector(".tile-glyph path")).stroke,
        };
    });
    console.log("=== C · hover on the PRESSED tile ===");
    out({ phase: "no hover", ...(await hoverProbe()) });
    await page.hover('[data-specimen="linear"]');
    await page.waitForTimeout(250);
    out({ phase: "HOVERED", ...(await hoverProbe()) });
    await page.mouse.move(5, 5);
    await page.waitForTimeout(250);
    out({ phase: "unhovered", ...(await hoverProbe()) });
    await ctx.close();
}

await browser.close();
