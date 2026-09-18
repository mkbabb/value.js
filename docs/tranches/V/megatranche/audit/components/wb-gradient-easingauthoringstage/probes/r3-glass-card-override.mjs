import { chromium } from "@playwright/test";
const port = process.env.PORT ?? "8290";
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(`http://localhost:${port}/#/gradient`, { waitUntil: "load" });
await p.waitForTimeout(5500);
await p.locator("button[aria-label='Author a custom curve']").first().click();
await p.waitForTimeout(1000);
const r = await p.locator(".easing-authoring").first().evaluate((el) => {
  const card = el.querySelector(".glass-card");
  const cs = getComputedStyle(card);
  const before = getComputedStyle(card, "::before");
  return {
    cardBoxShadow: cs.boxShadow,
    cardBackdrop: cs.backdropFilter,
    cardBg: cs.backgroundColor,
    beforeContent: before.content,
    beforeOpacity: before.opacity,
    beforeBlend: before.mixBlendMode,
    beforeBoxShadow: before.boxShadow.slice(0, 80),
    cardFocusShadowToken: cs.getPropertyValue("--card-focus-shadow").trim().slice(0, 60),
  };
});
console.log("AT REST:", JSON.stringify(r, null, 2));
// focus a control inside the card (the sr-only hint owner is the svg; tab into it)
await p.locator(".easing-authoring svg[role='group']").first().focus().catch(()=>{});
await p.keyboard.press("Tab");
await p.waitForTimeout(400);
const r2 = await p.locator(".easing-authoring .glass-card").first().evaluate((el) => ({
  boxShadow: getComputedStyle(el).boxShadow,
  focusToken: getComputedStyle(el).getPropertyValue("--card-focus-shadow").trim().slice(0,60),
  hasFocusVisible: el.matches(":has(:focus-visible)"),
}));
console.log("AFTER TAB:", JSON.stringify(r2, null, 2));
await b.close();
