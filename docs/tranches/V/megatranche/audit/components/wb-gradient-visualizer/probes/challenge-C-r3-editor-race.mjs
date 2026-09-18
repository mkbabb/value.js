/**
 * CHALLENGE-C round 3 — the CSS editor's blur/debounce race and the
 * contenteditable newline join. Read-only against the live dev server.
 *
 *   node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/challenge-C-r3-editor-race.mjs
 */
import { chromium } from "playwright";

const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await editor.scrollIntoViewIfNeeded();

const readState = async () =>
    page.evaluate(() => {
        const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
        const v = [...document.querySelectorAll('[data-testid="gradient-parse-verdict"]')].pop();
        return {
            editorText: ed?.textContent ?? null,
            editorHasNewline: /\n/.test(ed?.textContent ?? ""),
            editorHTML: (ed?.innerHTML ?? "").slice(0, 160),
            borderDestructive: !!ed?.className.includes("border-destructive"),
            ariaInvalid: ed?.getAttribute("aria-invalid") ?? null,
            verdict: v?.textContent?.trim() ?? null,
        };
    });

log("== BASELINE ==", JSON.stringify(await readState()));

// ── P1 · blur BEFORE the 500 ms debounce fires ──────────────────────────────
// Type a rejecting string, then blur ~120 ms later (well under the debounce).
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await editor.type("linear-gradient(90deg, notacolor 0%, blue 100%)", { delay: 0 });
log("P1) right after typing:", JSON.stringify(await readState()));
await page.waitForTimeout(120);
await editor.evaluate((el) => el.blur());
log("P1) immediately after blur (debounce still pending):", JSON.stringify(await readState()));
await page.waitForTimeout(1200);
log("P1) 1.2 s later (debounce has fired):", JSON.stringify(await readState()));

// restore a clean state
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const editor2 = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await editor2.scrollIntoViewIfNeeded();

// ── P2 · a newline typed inside the CSS box ─────────────────────────────────
await editor2.click();
await page.keyboard.press("ControlOrMeta+a");
await editor2.type("linear-gradient(90deg, red", { delay: 0 });
await page.keyboard.press("Enter");
await editor2.type("0%, blue 100%)", { delay: 0 });
await page.waitForTimeout(1200);
log("P2) after Enter between `red` and `0%`:", JSON.stringify(await readState()));
log(
    "P2) what the parser was handed (textContent):",
    JSON.stringify(await page.evaluate(() => {
        const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
        return ed.textContent;
    })),
);

await browser.close();
