// CHALLENGE-C pass 4 — probe E: the audit-coverage gap. Enumerate nameless
// buttons + sub-24px tap targets on /#/palettes in BOTH the cold-boot state the
// visual matrix captures and the populated state it never captures.
// Read-only. Run: node docs/.../probe/probe-P4-e.mjs
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const probe = () =>
    ((d) => d)(
        // eslint-disable-next-line
        undefined,
    );

const scan = () => {
    const vis = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    const path = (el) => {
        const parts = [];
        let n = el;
        for (let i = 0; n && i < 4; i++, n = n.parentElement) {
            parts.unshift(
                n.tagName.toLowerCase() +
                    (typeof n.className === "string" && n.className
                        ? "." + n.className.split(/\s+/).slice(0, 2).join(".")
                        : ""),
            );
        }
        return parts.join(" > ");
    };
    const buttons = [...document.querySelectorAll('button,[role="button"]')].filter(vis);
    return {
        buttonsVisible: buttons.length,
        nameless: buttons
            .filter(
                (b) =>
                    !(
                        b.getAttribute("aria-label") ||
                        b.getAttribute("aria-labelledby") ||
                        b.textContent.trim()
                    ),
            )
            .map((b) => ({ path: path(b), w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height) })),
        smallInEditor: [...document.querySelectorAll(".dashed-well button, .dashed-well input, .dashed-well [role='button']")]
            .filter(vis)
            .map((e) => {
                const r = e.getBoundingClientRect();
                return {
                    tag: e.tagName.toLowerCase(),
                    label: e.getAttribute("aria-label") ?? e.textContent.trim() ?? "",
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                    under24: r.width < 24 || r.height < 24,
                };
            }),
        wellText: document.querySelector(".dashed-well")?.innerText.replace(/\n+/g, " | ") ?? null,
    };
};

const browser = await chromium.launch();
const out = {};

// --- cold boot: exactly what the visual matrix captures ---
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    out.coldBoot = await page.evaluate(scan);
    await ctx.close();
}

// --- populated: the state the matrix never reaches ---
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => {
        localStorage.setItem(
            "color-picker",
            JSON.stringify({
                inputColor: "rgb(255 0 0)",
                savedColors: ["rgb(255 0 0)", "rgb(0 255 0)", "rgb(0 0 255)"],
            }),
        );
    });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    out.populated = await page.evaluate(scan);
    await page.screenshot({ path: new URL("./p4-populated-editor.png", import.meta.url).pathname });
    await ctx.close();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
