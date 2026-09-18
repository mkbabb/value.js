/**
 * CHALLENGE-C live probe A (isolated) — MT-F001 through the gradient code
 * editor. READ-ONLY. Captures exactly what the user is left looking at.
 */
import { chromium } from "playwright";

const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/probe";
const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const consoleErrors = [];
const pageErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => pageErrors.push(`${e.name}: ${e.message}`));

await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(4000);

const main = page.getByRole("main", { name: "Color tool panes" });
const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await editor.scrollIntoViewIfNeeded();
console.log("SEED editor text:", JSON.stringify(await editor.textContent()));

async function snap(tag) {
    const s = await page.evaluate(() => {
        const ed = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
        const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
        const m = document.querySelector('main');
        const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
        return {
            editorInDom: !!ed,
            editorText: ed ? ed.textContent : null,
            editorClass: ed ? ed.className.split(" ").filter((c) => c.startsWith("border")).join(" ") : null,
            verdict: v ? v.textContent.trim() : null,
            mainTextLen: m ? m.innerText.length : -1,
            mainTextHead: m ? m.innerText.slice(0, 200).replace(/\n/g, " | ") : null,
            stopBarInDom: !!bar,
            easingHeading: [...document.querySelectorAll("h3")].some((h) => h.textContent.trim() === "Easing"),
            cssHeading: [...document.querySelectorAll("h3")].some((h) => h.textContent.trim() === "CSS"),
        };
    });
    console.log(`[${tag}]`, JSON.stringify(s, null, 1));
}

await snap("before");
consoleErrors.length = 0;
pageErrors.length = 0;

await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, oklch() 0%, blue 100%)", { delay: 3 });
console.log("typed; waiting for the 500 ms debounce…");
await page.waitForTimeout(2000);

await snap("after MT-F001 parse");
console.log("consoleErrors:", JSON.stringify(consoleErrors, null, 1));
console.log("pageErrors:", JSON.stringify(pageErrors, null, 1));
await page.screenshot({ path: `${DIR}/A-mtf001-full.png`, fullPage: false });

// Can the user recover? Type a VALID gradient afterwards.
const stillThere = await page.evaluate(
    () => !!document.querySelector('[role="textbox"][aria-label="Gradient CSS"]'),
);
if (stillThere) {
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(45deg, red, blue)", { delay: 3 });
    await page.waitForTimeout(1500);
    await snap("recovery attempt (valid CSS typed after the throw)");
} else {
    console.log("EDITOR IS GONE — no recovery possible without a reload.");
}
console.log("consoleErrors(all):", consoleErrors.length, JSON.stringify(consoleErrors.slice(0, 6), null, 1));
await browser.close();
