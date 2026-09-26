// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-12 + UIA-V-13 falsifier on the served page (:9000).
//  V-12: after a successful propose (network stubbed 201) the toolbar is back in
//        `actions` (the toggle re-offers "Open color input"), the name field does
//        not hold a colour string, and a status line says the name was proposed.
//  V-13: an invalid text keeps its "not a valid color" verdict past 2.5 s while the
//        text is unchanged; a second Enter on the same text still states it; an edit
//        withdraws it.
// Usage: node probe-color-input.mjs [light|dark]   → prints PASS/RED per arm, exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
await prepare(ctx, { theme, user: true });
let proposed = false;
await ctx.route("**/colors/propose", (r) => { proposed = true; return r.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ name: "s1 proposed", css: "#abcdef" }) }); });
const p = await ctx.newPage();
const out = [];
const arm = (name, ok, detail) => out.push(`${ok ? "PASS" : "RED "} ${name} ${detail}`);
const openInput = async () => {
    await p.getByRole("button", { name: "Toggle action bar" }).first().click();
    await p.waitForTimeout(900);
    await p.getByRole("button", { name: "Open color input" }).first().click();
    await p.waitForTimeout(700);
};
await p.goto("http://localhost:9000/?color=%23abcdef#/", { timeout: 90000 });
await p.getByRole("button", { name: "Toggle action bar" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(1200);
// --- V-13 ---
await openInput();
const field = p.getByRole("textbox", { name: "Enter a CSS color" }).first();
await field.click();
await p.keyboard.press("ControlOrMeta+a");
await p.keyboard.type("zzzz");
await p.keyboard.press("Enter");
await p.waitForTimeout(300);
const badge = () => p.locator(".error-badge").count();
const b1 = await badge();
await p.waitForTimeout(2600);
const b2 = await badge();
await p.keyboard.press("Enter");
await p.waitForTimeout(300);
const b3 = await badge();
await p.keyboard.type("x");
await p.waitForTimeout(900); // past the vj-celebrate leave
const b4 = await badge();
arm("V-13 verdict holds under unchanged invalid text", b1 === 1 && b2 === 1 && b3 === 1, `enter=${b1} +2.6s=${b2} re-enter=${b3}`);
arm("V-13 an edit withdraws the verdict", b4 === 0, `after-edit=${b4}`);
await p.keyboard.press("Escape");
// --- V-12 ---
await p.reload({ timeout: 90000 });
await p.getByRole("button", { name: "Toggle action bar" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(1200);
await openInput();
await p.getByRole("button", { name: "Propose color name" }).first().click();
await p.waitForTimeout(700);
const pf = p.getByRole("textbox", { name: "Propose a color name" }).first();
await pf.click();
await p.keyboard.type("s1 proposed");
await p.keyboard.press("Enter");
await p.waitForTimeout(2500);
const back = await p.getByRole("button", { name: "Open color input" }).first().isVisible().catch(() => false);
const status = await p.locator("[role=status]").allInnerTexts();
const named = status.some((t) => /Name proposed/.test(t));
const fieldText = await p.getByRole("textbox", { name: /color/i }).first().innerText().catch(() => "");
arm("V-12 propose reached network", proposed, `proposed=${proposed}`);
arm("V-12 toolbar returns to actions", back, `openColorInputVisible=${back}`);
arm("V-12 success announced", named, `status=${JSON.stringify(status.filter(Boolean)).slice(0, 120)}`);
arm("V-12 no colour string left in propose field", !(/^(lab|oklch|rgb|#)/.test(fieldText) && !back), `field="${fieldText.slice(0, 40)}"`);
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
