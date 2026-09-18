import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
// focus the empty-state zone by keyboard (Tab-walk) so :focus-visible is honest
const fv = await page.evaluate(() => {
  const z = [...document.querySelectorAll('[role="button"]')].filter((e)=>/Upload image/.test(e.getAttribute("aria-label")||""))[0];
  z.focus();
  const cs = getComputedStyle(z);
  return { focusVisible: z.matches(":focus-visible"), outline: cs.outline, boxShadow: cs.boxShadow.slice(0,90), ring: cs.getPropertyValue("--tw-ring-shadow") };
});
console.log("programmatic focus:", JSON.stringify(fv));
await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
const fv2 = await page.evaluate(() => {
  const z = [...document.querySelectorAll('[role="button"]')].filter((e)=>/Upload image/.test(e.getAttribute("aria-label")||""))[0];
  z.focus();
  const cs = getComputedStyle(z);
  return { focusVisible: z.matches(":focus-visible"), outline: cs.outline, boxShadow: cs.boxShadow.slice(0,90) };
});
console.log("after keyboard nav:", JSON.stringify(fv2));
await browser.close();
