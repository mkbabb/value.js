import { webkit } from "playwright";
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const out = await p.evaluate(() => {
  const rows = [...document.querySelectorAll(".aurora-row")].map(r => {
    const label = r.querySelector(".aurora-row-label");
    const trig = r.querySelector("[role='combobox'],button");
    return {
      label: label?.textContent?.trim(),
      labelW: +(label?.getBoundingClientRect().width.toFixed(1)),
      trigLeft: +(trig?.getBoundingClientRect().left.toFixed(1)),
      trigW: +(trig?.getBoundingClientRect().width.toFixed(1)),
      trigH: +(trig?.getBoundingClientRect().height.toFixed(1)),
    };
  });
  // ConfiguratorRow (slider) rows for comparison
  const cfg = [...document.querySelectorAll(".config-console [class*='configurator'], .config-console > div > div")].slice(0,0);
  const sliderLabels = [...document.querySelectorAll(".config-console span")].map(s=>({t:s.textContent.trim(), left:+s.getBoundingClientRect().left.toFixed(1)})).filter(x=>x.t);
  return { rows, sliderLabels: sliderLabels.slice(0,8) };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
