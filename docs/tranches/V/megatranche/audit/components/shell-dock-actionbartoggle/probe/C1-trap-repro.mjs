// probe3 — CLEAN AT-path trap reproduction on a no-action-bar route
import { chromium, webkit } from "playwright";
const eng = process.argv[2] === "webkit" ? webkit : chromium;
const name = process.argv[2] === "webkit" ? "webkit" : "chromium";
const L = (k, v) => console.log("### [" + name + "] " + k + "\n" + JSON.stringify(v, null, 1));

const b = await eng.launch({
    args: name === "chromium" ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : [],
});
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/browse", { waitUntil: "load" });
await page.waitForSelector(".glass-dock", { timeout: 20000 });
await page.waitForTimeout(4000);
const c = page.locator(".glass-dock.collapsed");
if (await c.count()) {
    await c.click();
    await page.waitForTimeout(800);
}

const state = () =>
    page.evaluate(() => {
        const d = document.querySelector(".glass-dock");
        const r = d.getBoundingClientRect();
        return {
            faces: [...document.querySelectorAll(".dock-face")].map(
                (e) => e.className + (e.hasAttribute("inert") ? " [inert]" : ""),
            ),
            anyActiveFace: !!document.querySelector(".dock-face.is-active"),
            dock: { w: Math.round(r.width), h: Math.round(r.height) },
            combobox: !!document.querySelector('[role="combobox"]'),
            reachableButtons: [...document.querySelectorAll(".glass-dock button")].filter(
                (e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"),
            ).length,
            activeEl: document.activeElement?.tagName + "." + (document.activeElement?.className || ""),
        };
    });

L("S0_before", await state());
await page.screenshot({ path: `trap3-${name}-before.png`, clip: { x: 400, y: 0, width: 700, height: 90 } });

// The AT activation path: focus the (tabindex=-1, AX-exposed) button, press Enter.
const focused = await page.evaluate(() => {
    const el = document.querySelector(".dock-tools-btn");
    el.focus();
    return document.activeElement === el;
});
L("S1_focused_hidden_tools", { focused });
await page.keyboard.press("Enter");
await page.waitForTimeout(1500);
L("S2_after_enter", await state());
await page.screenshot({ path: `trap3-${name}-after.png`, clip: { x: 400, y: 0, width: 700, height: 90 } });

// recovery attempts a real user would try
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
await page.mouse.click(720, 40);
await page.waitForTimeout(400);
await page.mouse.move(720, 400);
await page.waitForTimeout(1500);
for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
await page.waitForTimeout(400);
L("S3_after_recovery_attempts", await state());
await page.screenshot({ path: `trap3-${name}-recovery.png`, clip: { x: 400, y: 0, width: 700, height: 90 } });

await b.close();
