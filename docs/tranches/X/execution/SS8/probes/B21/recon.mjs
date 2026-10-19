import { launch, cell, goGradient, openRow, openTune, save } from "./lib.mjs";
const b = await launch();
try {
  const r = await cell(b, { w: 1440, h: 900 }, async (page) => {
    await goGradient(page);
    const rows = await page.locator(".easing-panel .interval-head").count();
    await openRow(page, 0);
    await openTune(page, 0);
    await page.screenshot({ path: "../../evidence/B21-gradient-easing/recon-1440.png" });
    const dom = await page.evaluate(() => {
      const st = document.querySelector("#easing-authoring-0");
      const ctl = [...st.querySelectorAll("button,input,[role],[tabindex],select,textarea")].map(e => ({ tag: e.tagName, role: e.getAttribute("role"), name: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 40), ti: e.getAttribute("tabindex"), slot: e.getAttribute("data-slot") }));
      return { html: st.innerHTML.length, ctl, slots: [...st.querySelectorAll("[data-slot]")].map(e => e.getAttribute("data-slot")) };
    });
    return { rows, dom };
  });
  console.log(save("recon.json", r));
  console.log(JSON.stringify(r).slice(0, 4000));
} finally { await b.close(); }
