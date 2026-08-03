import { webkit } from "playwright";
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2500);
await p.click('button[aria-label="Filters"]');
await p.waitForTimeout(600);
await p.click('button[aria-label^="Open color picker"]');
await p.waitForTimeout(700);
console.log(JSON.stringify(await p.evaluate(() => {
  const ro = document.querySelector(".sv-canvas").closest('[role="dialog"]').querySelector("span.fira-code");
  const chain = [];
  let n = ro;
  while (n && n !== document.documentElement) {
    const s = getComputedStyle(n);
    chain.push({ tag: n.tagName.toLowerCase(), cls: String(n.className).slice(0,70), fontStyle: s.fontStyle, fontFamily: s.fontFamily.split(",")[0] });
    n = n.parentElement;
  }
  chain.push({ tag: "html", fontStyle: getComputedStyle(document.documentElement).fontStyle });
  // also: other mono readouts elsewhere for comparison
  return chain;
}), null, 1));
await b.close();
