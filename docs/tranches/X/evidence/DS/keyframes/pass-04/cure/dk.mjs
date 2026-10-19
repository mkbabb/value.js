import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(6000);
console.log(await p.evaluate(() => [...document.querySelectorAll("*")].filter(e => getComputedStyle(e).viewTransitionName !== "none").map(e => {
  const kids = [e, ...e.querySelectorAll("*")].filter(k => getComputedStyle(k).backdropFilter !== "none").map(k => (k === e ? "SELF " : "") + k.className.toString().slice(0, 50));
  return getComputedStyle(e).viewTransitionName + " :: " + e.className.toString().slice(0, 40) + " => " + JSON.stringify(kids);
}).join("\n")));
await b.close();
