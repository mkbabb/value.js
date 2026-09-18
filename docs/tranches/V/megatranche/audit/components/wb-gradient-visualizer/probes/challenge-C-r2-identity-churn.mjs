import { chromium } from "playwright";
const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("pageerror: " + String(e.message).slice(0, 160)));
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar = main.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();
const barBox = await bar.boundingBox();

// select a stop, then run a successful parse — does the selection survive?
await bar.click({ position: { x: barBox.width * 0.5, y: barBox.height / 2 } });
await page.waitForTimeout(250);
await main.locator("[data-stop-id]").nth(1).click();
await page.waitForTimeout(250);
log("A) remove-chip visible after selecting a stop:", await main.getByRole("button", { name: "Remove selected stop" }).count());

// tag the handle DOM nodes
await page.evaluate(() => { document.querySelectorAll("[data-stop-id]").forEach((e, i) => (e.__tag = "T" + i)); });
const idsBefore = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((e) => e.getAttribute("data-stop-id")));

// nudge with the keyboard (updateStop path — ids must be stable)
await main.locator("[data-stop-id]").nth(1).focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(300);
const survivedNudge = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((e) => e.__tag ?? "NEW"));
log("B) handle node identity after an arrow-key nudge:", JSON.stringify(survivedNudge));

// now a successful CSS parse (applyCSS path — ids are re-minted)
const ed = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await ed.scrollIntoViewIfNeeded();
await ed.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, red 0%, lime 50%, blue 100%)", { delay: 4 });
await page.waitForTimeout(1400);
const survivedParse = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((e) => e.__tag ?? "NEW"));
const idsAfter = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((e) => e.getAttribute("data-stop-id")));
log("C) handle node identity after ONE successful parse:", JSON.stringify(survivedParse));
log("C) stop ids before:", JSON.stringify(idsBefore));
log("C) stop ids after :", JSON.stringify(idsAfter));
log("C) remove-chip after parse (selection survived?):", await main.getByRole("button", { name: "Remove selected stop" }).count());

// D) error identification: is the verdict associated with the editor?
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, notacolor, blue)", { delay: 4 });
await page.waitForTimeout(1400);
const assoc = await page.evaluate(() => {
    const e = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
    const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
    return {
        ariaInvalid: e?.getAttribute("aria-invalid"),
        ariaDescribedby: e?.getAttribute("aria-describedby"),
        ariaErrormessage: e?.getAttribute("aria-errormessage"),
        ariaMultiline: e?.getAttribute("aria-multiline"),
        verdictId: v?.id || null,
        verdictRole: v?.getAttribute("role"),
        verdictText: v?.textContent,
    };
});
log("D) error identification:", JSON.stringify(assoc));

// E) how many stop-editor renders per debounced keystroke burst?
log("E) pageErrors:", JSON.stringify(errs));
await browser.close();
