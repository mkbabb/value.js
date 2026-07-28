// CHALLENGE-C probe C2 — is the mix "add color" affordance reachable AT ALL?
// Clicks the add-slot ghost by real mouse, by forced click, and by direct
// dispatch; counts chips after each. Then reports the Mix button's disabled
// state (canMix needs >= 2 colors).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(4000);

const out = {};
const ghost = page.locator(".add-slot-ghost");
out.ghostCount = await ghost.count();

const box = await ghost.boundingBox();
out.ghostBox = box;

out.ghostAttrs = await ghost.evaluate((el) => ({
    tagName: el.tagName,
    ariaHidden: el.getAttribute("aria-hidden"),
    ariaLabel: el.getAttribute("aria-label"),
    title: el.getAttribute("title"),
    disabled: el.getAttribute("disabled"),
    tabIndex: el.tabIndex,
    computedPointerEvents: getComputedStyle(el).pointerEvents,
    childElementCount: el.childElementCount,
    childTags: [...el.children].map((c) => c.tagName + "." + c.getAttribute("class")),
    hasPlusIcon: !!el.querySelector("svg.lucide-plus, svg[class*='w-5']"),
    innerText: el.innerText,
}));

// 1) real mouse click at the ghost's centre
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(300);
out.chipsAfterRealClick = await page.locator("[data-mix-source]").count();
out.elementFromPointAtGhostCentre = await page.evaluate(([x, y]) => {
    const el = document.elementFromPoint(x, y);
    return el ? el.tagName + " ." + (el.getAttribute("class") || "").slice(0, 40) : null;
}, [box.x + box.width / 2, box.y + box.height / 2]);

// 2) forced DOM click (bypasses pointer-events)
await ghost.evaluate((el) => el.click());
await page.waitForTimeout(300);
out.chipsAfterForcedDomClick = await page.locator("[data-mix-source]").count();

// 3) keyboard reachability — tab through and see if the ghost ever gets focus
await page.evaluate(() => document.body.focus());
let reached = false;
for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const isGhost = await page.evaluate(() =>
        document.activeElement?.classList.contains("add-slot-ghost") ?? false,
    );
    if (isGhost) { reached = true; break; }
}
out.ghostKeyboardReachableWithin80Tabs = reached;

// 4) Mix button state
const mixBtn = page.getByRole("button", { name: "Mix", exact: true });
out.mixButton = {
    count: await mixBtn.count(),
    disabled: await mixBtn.first().isDisabled().catch(() => null),
};

// 5) accessible-name audit of everything MixSourceSelector renders
out.sourceSelectorAxNames = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    return {
        wellHTML: well.outerHTML.replace(/\s+/g, " ").slice(0, 1200),
        interactiveDescendants: [...well.querySelectorAll("button,a,[tabindex],[role=button]")].length,
    };
});

writeFileSync(new URL("./probe-C2.json", import.meta.url).pathname, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
