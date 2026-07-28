import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);
const main = p.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const shown = await main.getByRole("textbox", { name: "Gradient CSS" }).last().textContent();
// click the pane's Copy CSS dock control
await main.getByRole("button", { name: "Copy CSS" }).last().click();
await p.waitForTimeout(600);
const clip = await p.evaluate(() => navigator.clipboard.readText());
console.log("EDITOR SHOWS  (len " + shown.length + "):", shown);
console.log("CLIPBOARD GOT (len " + clip.length + "):", clip.slice(0, 220) + (clip.length > 220 ? " …" : ""));
console.log("IDENTICAL?", shown.trim() === clip.trim());
// any visible confirmation?
const conf = await p.evaluate(() => (document.body.innerText.match(/copied/i) || [])[0] ?? null);
console.log("visible 'copied' confirmation:", conf);
await b.close();
