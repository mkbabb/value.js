/**
 * CHALLENGE-C live probes H–K — keyboard reach, the highlight truce's visible
 * cost, and the un-cancelled debounce across unmount. READ-ONLY.
 */
import { chromium } from "playwright";

const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/probe";
const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

async function fresh() {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push(`PAGEERROR ${e.message}`));
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.waitForTimeout(4000);
    const main = page.getByRole("main", { name: "Color tool panes" });
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await editor.scrollIntoViewIfNeeded();
    return { page, main, editor, errs };
}

// ── PROBE H · can a keyboard user REACH the editor by Tab? ──
{
    console.log("\n=== PROBE H · keyboard reach ===");
    const { page, editor } = await fresh();
    console.log(
        "  editor.tabIndex / attr:",
        JSON.stringify(
            await editor.evaluate((el) => ({
                idlTabIndex: el.tabIndex,
                attr: el.getAttribute("tabindex"),
                contentEditable: el.contentEditable,
            })),
        ),
    );
    // Focus the Copy-CSS control that precedes the editor, then Tab forward.
    const copy = page.getByTitle("Copy CSS").last();
    await copy.focus();
    const chain = [];
    for (let i = 0; i < 6; i++) {
        await page.keyboard.press("Tab");
        chain.push(
            await page.evaluate(() => {
                const a = document.activeElement;
                if (!a) return "(none)";
                return `${a.tagName}${a.getAttribute("aria-label") ? `[${a.getAttribute("aria-label")}]` : ""}`;
            }),
        );
    }
    console.log("  Tab chain from the Copy-CSS control:", JSON.stringify(chain));
    await page.close();
}

// ── PROBE I · the highlight truce's visible cost while typing ──
{
    console.log("\n=== PROBE I · syntax ink while focused vs blurred ===");
    const { page, main, editor } = await fresh();
    const inkCount = () =>
        editor.evaluate((el) => ({
            spans: el.querySelectorAll("span").length,
            html: el.innerHTML.slice(0, 90),
        }));
    console.log("  blurred/seeded:", JSON.stringify(await inkCount()));
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(45deg, red, blue)", { delay: 2 });
    console.log("  while typing   :", JSON.stringify(await inkCount()));
    await page.screenshot({ path: `${DIR}/I-typing-unhighlighted.png` });
    await page.waitForTimeout(1200);
    await main.getByRole("heading", { name: "Gradient" }).last().click();
    await page.waitForTimeout(400);
    console.log("  after blur     :", JSON.stringify(await inkCount()));
    await page.screenshot({ path: `${DIR}/I-blurred-highlighted.png` });
    await page.close();
}

// ── PROBE J · the un-cancelled debounce fires after the pane is destroyed ──
{
    console.log("\n=== PROBE J · pending parse across a view change ===");
    const { page, editor, errs } = await fresh();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg, oklch() 0%, blue 100%)", { delay: 1 });
    // Leave the view IMMEDIATELY — well inside the 500 ms debounce.
    await page.waitForTimeout(80);
    await page.evaluate(() => { window.location.hash = "#/mix"; });
    await page.waitForTimeout(2500);
    console.log(
        "  after navigating away:",
        JSON.stringify(
            await page.evaluate(() => ({
                hash: location.hash,
                boundary: !!document.querySelector(".vj-error-boundary"),
                mainTextHead: document.querySelector("main")?.innerText.slice(0, 90).replace(/\n/g, " | "),
            })),
        ),
    );
    console.log("  errors:", JSON.stringify(errs));
    await page.close();
}

// ── PROBE K · does the "Try again" recovery restore the user's gradient? ──
{
    console.log("\n=== PROBE K · recovery after the MT-F001 crash ===");
    const { page, editor } = await fresh();
    // First build something the user would care about: a 3-stop gradient.
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(33deg, red 0%, lime 40%, blue 100%)", { delay: 1 });
    await page.waitForTimeout(1200);
    console.log(
        "  built:",
        JSON.stringify(
            await page.evaluate(
                () => document.querySelectorAll('[data-testid="gradient-stop-bar"] [data-stop-id]').length,
            ),
        ),
        "stops",
    );
    // Now delete one color's args — the ordinary editing gesture.
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(33deg, rgb() 0%, lime 40%, blue 100%)", { delay: 1 });
    await page.waitForTimeout(1800);
    const crashed = await page.evaluate(() => !!document.querySelector(".vj-error-boundary"));
    console.log("  boundary shown:", crashed);
    if (crashed) {
        await page.getByRole("button", { name: /Try again/i }).click();
        await page.waitForTimeout(2500);
        console.log(
            "  after Try again:",
            JSON.stringify(
                await page.evaluate(() => {
                    const ed = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
                    return {
                        editor: ed ? ed.textContent : "(GONE)",
                        stops: document.querySelectorAll('[data-testid="gradient-stop-bar"] [data-stop-id]').length,
                    };
                }),
            ),
        );
    }
    await page.close();
}

await browser.close();
