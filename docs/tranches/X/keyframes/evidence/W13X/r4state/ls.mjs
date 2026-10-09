// SERVED MODEL: claude-opus-5-5 — r4state helper: list labelled controls on #/spring
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(process.argv[2] + "/#/spring");
await p.waitForSelector(".spring-ball", { timeout: 60000 });
await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("button,[role=button]")].map((e) => (e.getAttribute("aria-label") ?? e.textContent.trim()).slice(0, 40)))));
await p.screenshot({ path: "frames/ls-spring.png" });
await b.close();
