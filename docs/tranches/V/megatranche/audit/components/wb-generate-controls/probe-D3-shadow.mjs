import { webkit } from "playwright";
const b = await webkit.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2})).newPage();
await p.goto("http://localhost:9000/#/generate",{waitUntil:"networkidle"});
await p.waitForSelector("[data-generate-plate]",{timeout:20000});
await p.waitForTimeout(1200);
const out = await p.evaluate(() => {
  const plate = document.querySelector("[data-generate-plate]");
  const chain = [];
  let e = plate;
  while (e && e !== document.body) {
    const cs = getComputedStyle(e);
    if (cs.boxShadow && cs.boxShadow !== "none") {
      chain.push({ tag: e.tagName, cls: (typeof e.className === "string" ? e.className : "").slice(0, 70), shadow: cs.boxShadow.slice(0, 130), radius: cs.borderRadius });
    }
    e = e.parentElement;
  }
  const strip = plate.firstElementChild;
  return { shadowChain: chain, plateRadius: getComputedStyle(plate).borderRadius, stripRadius: getComputedStyle(strip).borderRadius, stripW: +strip.getBoundingClientRect().width.toFixed(1), plateW: +plate.getBoundingClientRect().width.toFixed(1), plateOverflow: getComputedStyle(plate).overflow };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
