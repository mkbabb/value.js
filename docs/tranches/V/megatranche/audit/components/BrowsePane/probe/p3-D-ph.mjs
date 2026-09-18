// Does the Browse placeholder fit the mobile field AFTER fonts settle? Two engines,
// real mobile descriptor (pass-2 killed this on a desktop-chrome-at-390px arm).
import { chromium, webkit, devices } from "playwright";
for (const [name, eng] of [["chromium", chromium], ["webkit", webkit]]) {
  const b = await eng.launch();
  for (const [arm, ctxo] of [["iPhone14-device", devices["iPhone 14"]], ["bare-390x844", { viewport: { width: 390, height: 844 } }]]) {
    const p = await (await b.newContext(ctxo)).newPage();
    await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle", timeout: 60000 }).catch(()=>{});
    await p.waitForTimeout(4000);
    for (const t of [0, 3000]) {
      if (t) await p.waitForTimeout(t);
      const r = await p.evaluate(async () => {
        await document.fonts.ready;
        const bar = document.querySelector(".search-seated"); if (!bar) return "ABSENT";
        const i = bar.querySelector("input"), cs = getComputedStyle(i);
        const c = document.createElement("canvas").getContext("2d");
        c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const avail = i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        return { fontsReady: document.fonts.status, font: c.font, size: cs.fontSize,
          textPx: +c.measureText(i.placeholder).width.toFixed(1), availPx: +avail.toFixed(1),
          barH: +bar.getBoundingClientRect().height.toFixed(1),
          inputW: +i.getBoundingClientRect().width.toFixed(1),
          overflowPx: +(c.measureText(i.placeholder).width - avail).toFixed(1),
          textOverflow: cs.textOverflow,
          scrollVsClient: `${i.scrollWidth}/${i.clientWidth}` };
      });
      console.log(`${name.padEnd(9)} ${arm.padEnd(16)} t+${String(t).padStart(4)}ms  ${JSON.stringify(r)}`);
    }
    await p.close();
  }
  await b.close();
}
