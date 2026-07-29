import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2500);
await page.evaluate(async () => {
  const html = '<b style="color:red;font-size:32px">linear-gradient</b>(90deg, <i>red</i>, blue)';
  await navigator.clipboard.write([new ClipboardItem({
    "text/html": new Blob([html], { type: "text/html" }),
    "text/plain": new Blob(["linear-gradient(90deg, red, blue)"], { type: "text/plain" }),
  })]);
});
const editor = page.locator(EDITOR).last();
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.press("ControlOrMeta+v");
await sleep(1500);
console.log(JSON.stringify(await page.evaluate(() => {
  const el = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
  return {
    innerHTML: el?.innerHTML.slice(0, 300) ?? null,
    textContent: el?.textContent ?? null,
    foreignTags: [...(el?.querySelectorAll("b,i,u,font,[style]") ?? [])].map(n => n.tagName + (n.getAttribute("style") ? "[style]" : "")),
    verdict: document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent ?? null,
  };
}, null), null, 1));
await browser.close();
