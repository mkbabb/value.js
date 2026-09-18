import { chromium, devices } from "playwright";

const BASE = "http://localhost:9000";
const SEED = {
    inputColor: "oklch(72% 0.19 25deg)",
    savedColors: ["oklch(72% 0.19 25deg)", "oklch(50% 0.1 200deg)", "oklch(90% 0.05 100deg)"],
};

const openPalettes = async (page) => {
    await page.goto(BASE + "/");
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.getByRole("option", { name: "Palettes", exact: true }).click();
    await page.waitForSelector(".dashed-well .swatch-row .watercolor-swatch");
};

const run = async () => {
    const browser = await chromium.launch();
    const out = {};

    // ============ A. desktop: key churn + duplicate banner ============
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        await ctx.addInitScript((seed) => {
            localStorage.setItem("color-picker", JSON.stringify(seed));
            localStorage.setItem("color-palettes", JSON.stringify({
                version: 1,
                palettes: [{
                    id: "pre-existing-id", name: "Dup Test", slug: "dup-test",
                    colors: [{ css: "#111111", position: 0 }],
                    createdAt: "2020-01-01T00:00:00.000Z", updatedAt: "2020-01-01T00:00:00.000Z",
                    isLocal: true,
                }],
            }));
        }, SEED);
        const page = await ctx.newPage();
        await openPalettes(page);

        // --- TransitionGroup key stability: tag the DOM nodes, remove index 0, see who survived
        await page.evaluate(() => {
            const wraps = [...document.querySelectorAll(".dashed-well .swatch-row > div")];
            wraps.forEach((w, i) => { w.__auditTag = "wrap" + i; });
        });
        const before = await page.evaluate(() =>
            [...document.querySelectorAll(".dashed-well .swatch-row > div")].map((w) => ({
                tag: w.__auditTag,
                color: w.querySelector(".watercolor-swatch")?.style.getPropertyValue("--watercolor-color"),
            })));

        const firstWrap = page.locator(".dashed-well .swatch-row > div").first();
        await firstWrap.hover();
        await page.waitForTimeout(250);
        await page.locator(".floating-panel button[aria-label^='Remove color']").click();
        await page.waitForTimeout(600);

        const after = await page.evaluate(() =>
            [...document.querySelectorAll(".dashed-well .swatch-row > div")].map((w) => ({
                tag: w.__auditTag ?? "<NEW NODE>",
                color: w.querySelector(".watercolor-swatch")?.style.getPropertyValue("--watercolor-color"),
            })));
        out.keyChurn = { before, after };

        // --- aria-hidden-focus violation count (whole page + editor)
        out.ariaHiddenFocusables = await page.evaluate(() => {
            const hidden = [...document.querySelectorAll('[aria-hidden="true"]')];
            let n = 0; const samples = [];
            for (const h of hidden) {
                const f = [...h.querySelectorAll("a[href],button,input,select,textarea,[tabindex]")]
                    .filter((e) => e.tabIndex >= 0);
                n += f.length;
                for (const e of f) if (samples.length < 6) samples.push((e.getAttribute("aria-label") || e.tagName));
            }
            return { count: n, samples };
        });

        // --- duplicate banner
        const input = page.locator(".dashed-well input");
        await input.fill("Dup Test");
        await input.press("Enter");
        await page.waitForTimeout(300);
        out.duplicate = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            return {
                wellText: w.innerText.replace(/\n/g, " | "),
                liveRegions: [...w.querySelectorAll("[aria-live],[role=status],[role=alert]")].length,
                activeElement: document.activeElement.tagName + ":" + (document.activeElement.getAttribute("aria-label") || document.activeElement.placeholder || ""),
                storedCount: (JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes || []).length,
            };
        });

        // --- STALE TARGET: change the name, then press Update
        await input.fill("A Completely Different Name");
        await page.waitForTimeout(150);
        out.bannerStillShown = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            return w.innerText.includes("already exists");
        });
        await page.getByRole("button", { name: "Update", exact: true }).click();
        await page.waitForTimeout(300);
        out.afterUpdate = await page.evaluate(() =>
            (JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes || [])
                .map((p) => ({ id: p.id, name: p.name, colors: p.colors.map((c) => c.css) })));

        await ctx.close();
    }

    // ============ B. touch device: is the swatch menu reachable at all? ============
    {
        const ctx = await browser.newContext({ ...devices["iPhone 14"] });
        await ctx.addInitScript((seed) => {
            localStorage.setItem("color-picker", JSON.stringify(seed));
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
        }, SEED);
        const page = await ctx.newPage();
        await openPalettes(page);
        out.touch = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            const row = w.querySelector(".swatch-row");
            const dots = [...row.querySelectorAll(".watercolor-swatch")];
            const d0 = dots[0];
            const r = d0.getBoundingClientRect();
            const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return {
                dotCount: dots.length,
                popoverTriggers: row.querySelectorAll("[data-reka-popover-trigger],[aria-haspopup]").length,
                hitTagAtSwatchCentre: hit ? hit.tagName + "." + String(hit.className).slice(0, 40) : null,
                hitIsTheDot: hit === d0,
                focusables: [...w.querySelectorAll("*")].filter((e) => e.tabIndex >= 0 && (e.offsetWidth || e.offsetHeight))
                    .map((e) => e.tagName + ":" + (e.getAttribute("aria-label") || e.placeholder || (e.innerText || "").trim() || "<NO NAME>")),
            };
        });
        // try a real tap on the first swatch
        try {
            await page.locator(".dashed-well .swatch-row .watercolor-swatch").first().tap({ timeout: 2500 });
            await page.waitForTimeout(400);
            out.touchTap = await page.evaluate(() => ({
                popoverOpen: !!document.querySelector("[data-reka-popper-content-wrapper], .floating-panel"),
            }));
        } catch (e) {
            out.touchTap = "TAP FAILED: " + String(e.message).split("\n").slice(0, 3).join(" ~ ");
        }
        await ctx.close();
    }

    // ============ C. lg breakpoint: is the edit overlay reachable below 1024px? ============
    out.editOverlayCSS = "hidden lg:flex — see source line 58";

    console.log(JSON.stringify(out, null, 2));
    await browser.close();
};

run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
