/**
 * CHALLENGE-C live probes B–G — GradientCodeEditor.vue. READ-ONLY.
 * Each probe starts from a fresh load so a prior failure cannot contaminate.
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

const read = (page) =>
    page.evaluate(() => {
        const ed = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
        const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
        const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
        return {
            editor: ed ? ed.textContent : "(GONE)",
            destructiveBorder: ed ? ed.className.includes("border-destructive") : null,
            verdict: v ? v.textContent.trim() : null,
            railBg: bar ? getComputedStyle(bar).backgroundImage.slice(0, 60) : null,
        };
    });

// ── PROBE B · blur INSIDE the 500 ms debounce window ──
{
    console.log("\n=== PROBE B · blur inside the debounce window (WIP destruction) ===");
    const { page, main, editor, errs } = await fresh();
    console.log("  t0 (seeded):", JSON.stringify(await read(page)));
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg, notacolor, ???)", { delay: 1 });
    console.log("  typed (focused):", JSON.stringify(await read(page)));
    await page.waitForTimeout(120); // still well inside the 500 ms debounce
    await main.getByRole("heading", { name: "Gradient" }).last().click(); // BLUR
    console.log("  right after blur:", JSON.stringify(await read(page)));
    await page.waitForTimeout(1500);
    console.log("  after debounce fired:", JSON.stringify(await read(page)));
    console.log("  errors:", JSON.stringify(errs));
    await page.screenshot({ path: `${DIR}/B-blur-race.png` });
    await page.close();
}

// ── PROBE C · stale verdict after an unrelated model change ──
{
    console.log("\n=== PROBE C · stale verdict survives an unrelated model change ===");
    const { page, main, editor, errs } = await fresh();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg, notacolor, blue)", { delay: 1 });
    await page.waitForTimeout(1500);
    console.log("  after failed parse:", JSON.stringify(await read(page)));
    const slider = main.getByRole("slider", { name: "Gradient direction" }).last();
    await slider.focus();
    for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1000);
    console.log("  after moving the direction slider:", JSON.stringify(await read(page)));
    console.log("  errors:", JSON.stringify(errs));
    await page.screenshot({ path: `${DIR}/C-stale-verdict.png` });
    await page.close();
}

// ── PROBE D · Enter / newline round-trip ──
{
    console.log("\n=== PROBE D · Enter key in the contenteditable ===");
    const { page, editor, errs } = await fresh();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg,", { delay: 1 });
    await page.keyboard.press("Enter");
    await page.keyboard.type("red, blue)", { delay: 1 });
    const dom = await editor.evaluate((el) => ({
        textContent: el.textContent,
        innerText: el.innerText,
        innerHTML: el.innerHTML,
        whiteSpace: getComputedStyle(el).whiteSpace,
    }));
    console.log("  textContent (what onInput reads):", JSON.stringify(dom.textContent));
    console.log("  innerText                       :", JSON.stringify(dom.innerText));
    console.log("  innerHTML                       :", JSON.stringify(dom.innerHTML));
    console.log("  white-space                     :", dom.whiteSpace);
    await page.waitForTimeout(1500);
    console.log("  after debounce:", JSON.stringify(await read(page)));
    console.log("  errors:", JSON.stringify(errs));
    await page.close();
}

// ── PROBE E · a11y shape + live-region presence ──
{
    console.log("\n=== PROBE E · a11y ===");
    const { page, editor } = await fresh();
    console.log(
        "  editor attrs:",
        JSON.stringify(
            await editor.evaluate((el) => ({
                role: el.getAttribute("role"),
                ariaLabel: el.getAttribute("aria-label"),
                ariaMultiline: el.getAttribute("aria-multiline"),
                ariaInvalid: el.getAttribute("aria-invalid"),
                ariaDescribedby: el.getAttribute("aria-describedby"),
                ariaErrormessage: el.getAttribute("aria-errormessage"),
                tabIndex: el.tabIndex,
                box: (() => {
                    const r = el.getBoundingClientRect();
                    return `${Math.round(r.width)}x${Math.round(r.height)}`;
                })(),
            })),
        ),
    );
    console.log(
        "  verdict live region while CLEAN:",
        await page.evaluate(() =>
            document.querySelector('[data-testid="gradient-parse-verdict"]')
                ? "present"
                : "ABSENT (v-if — the live region does not exist before the message)",
        ),
    );
    // Tab out of the contenteditable?
    await editor.click();
    await page.keyboard.press("Tab");
    console.log(
        "  focus after Tab from the editor:",
        await page.evaluate(() => {
            const a = document.activeElement;
            return a ? `${a.tagName}${a.getAttribute("aria-label") ? `[${a.getAttribute("aria-label")}]` : ""}` : "(none)";
        }),
    );
    await page.close();
}

// ── PROBE F · MT-F037 readout rail vs the glass input token ──
{
    console.log("\n=== PROBE F · easing readout rail geometry (MT-F037) ===");
    const { page, main } = await fresh();
    const rail = main.locator(".readout-rail").first();
    console.log("  rail count:", await rail.count());
    if (await rail.count()) {
        console.log(
            "  " +
                JSON.stringify(
                    await rail.evaluate((el) => {
                        const cs = getComputedStyle(el);
                        const btn = el.querySelector(".rail-btn");
                        const bcs = btn ? getComputedStyle(btn) : null;
                        const br = btn?.getBoundingClientRect();
                        const root = getComputedStyle(document.documentElement);
                        const r = el.getBoundingClientRect();
                        return {
                            railRadius: cs.borderRadius,
                            railBorder: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
                            railBg: cs.backgroundColor,
                            railBox: `${Math.round(r.width)}x${Math.round(r.height)}`,
                            btnRadius: bcs?.borderRadius,
                            btnBox: br ? `${Math.round(br.width)}x${Math.round(br.height)}` : null,
                            "--radius-input": root.getPropertyValue("--radius-input").trim(),
                            "--radius": root.getPropertyValue("--radius").trim(),
                        };
                    }),
                    null,
                    1,
                ),
        );
    }
    // a real glass input for contrast
    console.log(
        "  a real page input:",
        JSON.stringify(
            await page.evaluate(() => {
                const el = document.querySelector("input");
                if (!el) return null;
                const cs = getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return {
                    radius: cs.borderRadius,
                    border: `${cs.borderTopWidth} ${cs.borderTopStyle}`,
                    box: `${Math.round(r.width)}x${Math.round(r.height)}`,
                    cls: el.className,
                };
            }),
        ),
    );
    await page.close();
}

// ── PROBE G · what the boundary actually looks like (contrast of the message) ──
{
    console.log("\n=== PROBE G · the boundary the user is left with ===");
    const { page, editor } = await fresh();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg, rgb() 0%, blue 100%)", { delay: 2 });
    await page.waitForTimeout(2000);
    console.log(
        "  " +
            JSON.stringify(
                await page.evaluate(() => {
                    const b = document.querySelector(".vj-error-boundary");
                    if (!b) return { boundary: "absent" };
                    const p = b.querySelector("p");
                    const cs = p ? getComputedStyle(p) : null;
                    const r = b.getBoundingClientRect();
                    return {
                        boundaryBox: `${Math.round(r.width)}x${Math.round(r.height)}`,
                        headingColor: cs?.color,
                        headingOpacity: cs?.opacity,
                        headingBox: p
                            ? (() => {
                                  const pr = p.getBoundingClientRect();
                                  return `${Math.round(pr.width)}x${Math.round(pr.height)} @ ${Math.round(pr.x)},${Math.round(pr.y)}`;
                              })()
                            : null,
                        parentOpacity: getComputedStyle(b.parentElement).opacity,
                        text: b.innerText.replace(/\n/g, " | "),
                        activeElement: document.activeElement?.className?.slice(0, 40),
                    };
                }),
                null,
                1,
            ),
    );
    await page.screenshot({ path: `${DIR}/G-boundary.png` });
    await page.close();
}

await browser.close();
