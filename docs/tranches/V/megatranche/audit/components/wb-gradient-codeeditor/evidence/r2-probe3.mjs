// CHALLENGE-C r2 — probe 3: the one-gesture crash from the app's OWN default
// text, with UNFILTERED console capture (does the e2e console gate see it?),
// plus the verdict element's a11y wiring.
// Run: node .../evidence/r2-probe3.mjs [webkit|chromium]
import { webkit, chromium } from "playwright";

const ENGINE = process.argv[2] ?? "webkit";
const launcher = ENGINE === "chromium" ? chromium : webkit;
const MOD = ENGINE === "webkit" ? "Meta" : "Control";
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const VERDICT = '[data-testid="gradient-parse-verdict"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify({ engine: ENGINE, ...o }));

const browser = await launcher.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const allConsole = [];
const pageErrors = [];
page.on("console", (m) => allConsole.push(`${m.type()}: ${m.text().slice(0, 120)}`));
page.on("pageerror", (e) => pageErrors.push(`${e.name}: ${e.message.split("\n")[0]}`));

async function boot() {
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2000);
    allConsole.length = 0;
    pageErrors.length = 0;
}

// ── P · thirteen Backspaces on the DEFAULT text ──
await boot();
const before = await page.locator(EDITOR).first().innerText();
// Click exactly at the right edge of the "145" token of the FIRST oklch — a
// real mouse click at a real caret position (no synthetic selection).
const target = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const span = [...el.querySelectorAll("span")].find((s) => s.textContent === "145");
    const r = span.getBoundingClientRect();
    return { x: r.right, y: r.top + r.height / 2, token: span.textContent };
}, EDITOR);
await page.mouse.click(target.x, target.y);
for (let i = 0; i < 13; i++) await page.keyboard.press("Backspace"); // "0.75 0.15 145"
const afterKeys = (await page.locator(EDITOR).count())
    ? await page.locator(EDITOR).first().innerText()
    : null;
await sleep(1600); // let the 500 ms debounce fire
const dead = (await page.locator(EDITOR).count()) === 0;
log({
    tag: "P-thirteen-backspaces-from-default",
    clickedToken: target.token,
    before: before.slice(0, 90),
    textAtRest: afterKeys?.slice(0, 90) ?? null,
    editorGone: dead,
    paneNow: (await page.locator("body").innerText()).slice(0, 220).replace(/\n+/g, " | "),
    consoleErrorsUnfiltered: allConsole.filter((l) => l.startsWith("error")),
    consoleAll: allConsole.slice(0, 6),
    pageErrors,
});
await page.screenshot({ path: `${DIR}/r2-P-thirteen-backspaces.png` });

// ── Q · verdict element wiring (a11y association) ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(90deg, red, notacolor)", { delay: 3 });
await sleep(900);
log({
    tag: "Q-verdict-wiring",
    ...(await page.evaluate(([es, vs]) => {
        const e = document.querySelector(es);
        const v = document.querySelector(vs);
        return {
            verdictAttrs: Object.fromEntries([...v.attributes].map((a) => [a.name, a.value.slice(0, 60)])),
            verdictHasId: v.hasAttribute("id"),
            editorDescribedby: e.getAttribute("aria-describedby"),
            editorErrormessage: e.getAttribute("aria-errormessage"),
            editorAriaInvalid: e.getAttribute("aria-invalid"),
            verdictFontSize: getComputedStyle(v).fontSize,
            verdictColor: getComputedStyle(v).color,
        };
    }, [EDITOR, VERDICT])),
});

await browser.close();
