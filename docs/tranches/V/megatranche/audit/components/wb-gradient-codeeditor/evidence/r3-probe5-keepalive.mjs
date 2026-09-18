// CHALLENGE-C r3 — part 5: is the pane KEPT ALIVE? (decides whether the
// r2-proposed `onBeforeUnmount(cancel)` cure can ever fire) + the blast radius
// of the deferred parse across a route change.
import { webkit } from "playwright";

const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify(o));

const browser = await webkit.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));
const editorText = () => page.evaluate((s) => document.querySelector(s)?.textContent ?? null, EDITOR);

await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2200);

// ── K1 · KeepAlive proof ──
await page.locator(EDITOR).last().click();
await page.keyboard.press("Meta+a");
await page.keyboard.insertText("linear-gradient(45deg, red 0%, lime 40%, blue 100%)");
await sleep(1200);
const authored = await editorText();
await page.evaluate(() => (window.location.hash = "#/mix"));
await sleep(1500);
const goneFromDom = (await page.locator(EDITOR).count()) === 0;
await page.evaluate(() => (window.location.hash = "#/gradient"));
await sleep(1800);
const backText = await editorText();
log({
    tag: "K1-keepalive",
    authored,
    editorRemovedFromDomWhileAway: goneFromDom,
    afterReturn: backText,
    statePreserved: backText === authored,
});

// ── K2 · the deferred parse crossing a route change ──
await page.evaluate(() => (window.location.hash = "#/gradient"));
await sleep(800);
await page.locator(EDITOR).last().click();
await page.keyboard.press("Meta+a");
await page.keyboard.insertText("linear-gradient(90deg, rgb(), blue)");
// leave IMMEDIATELY — inside the 500 ms window
await page.evaluate(() => (window.location.hash = "#/mix"));
await sleep(1600);
const boundaryOnMix = (await page.locator('[role="alert"]').count())
    ? (await page.locator('[role="alert"]').first().innerText()).replace(/\n+/g, " | ")
    : null;
log({ tag: "K2-crash-on-the-pane-the-user-is-now-looking-at", hash: await page.evaluate(() => location.hash), boundaryOnMix, pageErrors: [...pageErrors] });
await page.screenshot({ path: `${DIR}/r3-K2-cross-route.png` });

// and what is left of the gradient pane when the user returns?
await page.evaluate(() => (window.location.hash = "#/gradient"));
await sleep(1600);
log({
    tag: "K3-return-to-gradient",
    editorPresent: (await page.locator(EDITOR).count()) > 0,
    editorText: await editorText(),
    boundaryStillShowing: (await page.locator('[role="alert"]').count()) > 0,
});
await page.screenshot({ path: `${DIR}/r3-K3-return.png` });

await browser.close();
