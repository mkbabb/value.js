// P8 — the POSITIVE CONTROL for P7. Harmony changes the PALETTE, which the CSS
// substrate CAN express. If the patch hash moves for Harmony but not for
// Medium/Zones/Noise/Motion, the null result in P7 is a real substrate fact.
import { chromium } from "playwright";
import { createHash } from "node:crypto";
const sha = (b) => createHash("sha256").update(b).digest("hex").slice(0, 16);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".aurora-row");
await page.waitForTimeout(2500);

async function pick(label, optionText) {
    await page.locator(`[aria-label="${label}"]`).click();
    await page.waitForTimeout(400);
    const opt = page.getByRole("option").filter({ hasText: optionText }).first();
    await opt.click();
    await page.waitForTimeout(1600);
}
const clip = { x: 30, y: 30, width: 260, height: 180 };
const snap = async () => ({
    patch: sha(await page.screenshot({ clip })),
    bg: await page.evaluate(() => [0, 1, 2, 3].map((i) => getComputedStyle(document.documentElement).getPropertyValue(`--saved-bg-${i}`).trim()).join(" ")),
    body: await page.evaluate(() => getComputedStyle(document.body).backgroundImage.slice(0, 110)),
});

await pick("Motion register", "Still");
await page.waitForTimeout(1500);
const b0 = await snap();
console.log("baseline           ", JSON.stringify(b0, null, 0));

console.log("\n--- POSITIVE CONTROL: Harmony (a PALETTE atom — the CSS placeholder renders the palette) ---");
for (const h of ["Monochrome", "Triad", "Complementary", "Analogous"]) {
    await pick("Palette harmony", h);
    const s = await snap();
    console.log(`  harmony=${h.padEnd(14)} patchMoved=${s.patch !== b0.patch}  bg=${s.bg}`);
}

console.log("\n--- NEGATIVE: the SHAPE atoms (medium / zones / noise / motion) ---");
await pick("Palette harmony", "Analogous");
const b1 = await snap();
for (const [lbl, v] of [["Painterly medium", "Watercolor"], ["Painterly medium", "Vangogh"], ["Zone arrangement", "Centred"], ["Motion register", "Drifting"]]) {
    await pick(lbl, v);
    const s = await snap();
    console.log(`  ${lbl.padEnd(17)}=${v.padEnd(12)} patchMoved=${s.patch !== b1.patch}  bg=${s.bg}`);
}
// the Noise slider (a shape atom too) — drag it to the far end
console.log("\n--- NEGATIVE: the Noise slider (a shape atom) ---");
const noise = page.getByRole("slider", { name: "Noise" });

await noise.focus(); for (let i=0;i<50;i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(1800);
const s2 = await snap();
const noiseVal = await page.evaluate(() => [...document.querySelectorAll(".configurator-row")].find((r) => /Noise/.test(r.textContent))?.textContent.trim());
console.log(`  noise row now "${noiseVal}"  patchMoved=${s2.patch !== b1.patch}`);

console.log("\n--- and the Colour Energy slider (a PALETTE atom — should move) ---");
const ce = page.getByRole("slider", { name: "Colour Energy" });

await ce.focus(); for (let i=0;i<70;i++) await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(1800);
const s3 = await snap();
const ceVal = await page.evaluate(() => [...document.querySelectorAll(".configurator-row")].find((r) => /Colour Energy/.test(r.textContent))?.textContent.trim());
console.log(`  energy row now "${ceVal}"  patchMoved=${s3.patch !== b1.patch}  bg=${s3.bg}`);
console.log(`\nbody background-image (the CSS substrate's material): ${b0.body}`);
await browser.close();
