import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const trig = await p.evaluate(() => {
  const el = document.querySelector('button[aria-label="Filters"]');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    outer: el.outerHTML.slice(0, 400),
    attrs: [...el.attributes].map(a => `${a.name}="${a.value}"`),
    rect: { w: Math.round(r.width), h: Math.round(r.height) },
    cls: el.className,
  };
});
console.log("TRIGGER:", JSON.stringify(trig, null, 1));
await p.click('button[aria-label="Filters"]').catch(e => console.log("click err", e.message));
await p.waitForTimeout(900);
const pop = await p.evaluate(() => {
  const c = document.querySelector('[data-slot="popover-content"], [role="dialog"][data-state="open"], [data-radix-popper-content-wrapper]');
  const root = c || document.body;
  const btns = [...root.querySelectorAll("button")].map(b => ({
    txt: (b.textContent||"").trim().slice(0,24),
    variant: b.getAttribute("variant"),
    emphasis: b.getAttribute("data-emphasis"),
    cls: (b.className||"").slice(0,90),
  }));
  const input = root.querySelector('input[type="text"], input[data-slot="input"]');
  return {
    found: !!c,
    buttons: btns,
    input: input ? { al: input.getAttribute("aria-label"), cls: input.className, ph: input.placeholder } : null,
    sections: [...root.querySelectorAll(".section-label")].map(e=>e.textContent.trim()),
    checkboxes: [...root.querySelectorAll('[data-slot="checkbox"], button[role="checkbox"]')].map(e => ({state: e.getAttribute("data-state"), checkedAttr: e.getAttribute("checked"), aria: e.getAttribute("aria-checked")})),
  };
});
console.log("POPOVER:", JSON.stringify(pop, null, 1));
await b.close();
