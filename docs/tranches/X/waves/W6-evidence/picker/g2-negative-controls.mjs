// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W6.g · gate **g2** — THE NEGATIVE CONTROLS.
 *
 *   npx vite --port 9001 --strictPort
 *   node docs/tranches/X/waves/W6-evidence/picker/g2-negative-controls.mjs
 *
 * g2 measures GREEN at these bytes: the OM-9 misalignment does not reproduce
 * (X.W5.b/c's block law and region grid landed between the owner's capture and
 * this seat). A gate that is green the first time it is run has to prove it can
 * go red, or it is a green nobody can read — `W6.md`'s L-18 target 1.
 *
 * Two controls, both applying the exact defect shape `W6.md:279` names:
 *
 *   C1 · A PER-PANE NUDGE ON ABOUT. The companion is pushed off the track
 *        start. The Picker↔About legs must go RED.
 *   C2 · A PER-PANE NUDGE ON THE PICKER — the shortcut the falsifier is
 *        written against. It would make About "line up" while dragging the
 *        Mix control out of line, so the About leg must PASS and the OM-10
 *        CONTROL leg must go RED. A gate that asserted About alone would
 *        publish C2 as a cure.
 *
 * The comparisons below are the spec's own, re-implemented here against an
 * injected defect; the shipped gate is
 * `e2e/smoke/views/companion-pane-track-start.spec.ts`.
 */
import { chromium } from "playwright";

const ORIGIN = process.env.CARD_RHYTHM_ORIGIN ?? "http://localhost:9001";
const CELL = { width: 1280, height: 720 };
const EPS = 1;

const read = async (page, label) => {
    for (let i = 0; i < 40; i++) {
        const now = await page.evaluate((name) => {
            const el = document.querySelector(`[role="region"][aria-label="${name}"]`);
            if (!el) return null;
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            const pane = el.firstElementChild;
            return {
                trackStart:
                    r.top +
                    Number.parseFloat(cs.borderTopWidth) +
                    Number.parseFloat(cs.paddingTop),
                paneTop: pane.getBoundingClientRect().top,
                moving: pane.getAnimations().some((a) => a.playState === "running"),
            };
        }, label);
        if (now && !now.moving) return now;
        await page.waitForTimeout(250);
    }
    throw new Error(`${label} never settled`);
};

const leg = (name, a, b) => {
    const d = Math.abs(a - b);
    const verdict = d <= EPS ? "PASS" : "FAIL";
    console.log(
        `    ${verdict}  ${name}: |${a.toFixed(2)} − ${b.toFixed(2)}| = ${d.toFixed(2)}px`,
    );
    return verdict === "FAIL";
};

const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

let controlsThatFailed = 0;

// ── C1 · a per-pane nudge on ABOUT ─────────────────────────────────────────
{
    const page = await browser.newPage({ viewport: CELL });
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "networkidle", timeout: 45000 });
    await page.addStyleTag({
        content: `[role="region"][aria-label="About"] > * { margin-top: 16px }`,
    });
    const picker = await read(page, "Picker");
    const about = await read(page, "About");
    console.log("C1 · per-pane nudge on About (margin-top: 16px) — must go RED");
    let red = false;
    red = leg("About sits ON its track start", about.paneTop, about.trackStart) || red;
    red = leg("Picker↔About top edges", picker.paneTop, about.paneTop) || red;
    console.log(
        `    → ${red ? "RED (the gate catches it)" : "GREEN — THE GATE IS BLIND"}`,
    );
    if (red) controlsThatFailed++;
    await page.close();
}

// ── C2 · a per-pane nudge on the PICKER — the falsifier's own shape ────────
{
    console.log("");
    console.log(
        "C2 · per-pane nudge on the Picker — About must PASS, the Mix CONTROL must go RED",
    );
    const nudge = `[role="region"][aria-label="Picker"] > * { margin-top: 16px }`;

    const p1 = await browser.newPage({ viewport: CELL });
    await p1.goto(`${ORIGIN}/#/`, { waitUntil: "networkidle", timeout: 45000 });
    await p1.addStyleTag({ content: nudge });
    const pickerOnAbout = await read(p1, "Picker");
    const about = await read(p1, "About");
    // The nudge moves the Picker DOWN onto a misaligned About; in a tree where
    // OM-9 reproduced, this is the edit that "fixes" the About leg.
    const aboutLeg = leg(
        "Picker↔About top edges (the leg a nudge buys)",
        pickerOnAbout.paneTop,
        about.paneTop,
    );
    await p1.close();

    const p2 = await browser.newPage({ viewport: CELL });
    await p2.goto(`${ORIGIN}/#/mix`, { waitUntil: "networkidle", timeout: 45000 });
    await p2.addStyleTag({ content: nudge });
    const pickerOnMix = await read(p2, "Picker");
    const mix = await read(p2, "Mix");
    const controlLeg = leg(
        "CONTROL (OM-10) Picker↔Mix top edges",
        pickerOnMix.paneTop,
        mix.paneTop,
    );
    const trackLeg = leg(
        "CONTROL Picker sits ON its track start",
        pickerOnMix.paneTop,
        pickerOnMix.trackStart,
    );
    await p2.close();

    const red = controlLeg || trackLeg;
    console.log(
        `    → the About leg ${aboutLeg ? "FAILED" : "PASSED"}; the control legs ${red ? "went RED (the gate catches the nudge)" : "STAYED GREEN — THE GATE IS BLIND"}`,
    );
    if (red) controlsThatFailed++;
}

await browser.close();
console.log("");
console.log(`NEGATIVE CONTROLS: ${controlsThatFailed} of 2 went RED as required.`);
process.exit(controlsThatFailed === 2 ? 0 : 1);
