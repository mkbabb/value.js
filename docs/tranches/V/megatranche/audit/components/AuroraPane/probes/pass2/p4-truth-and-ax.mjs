// P4 — (i) the O-14 truth law measured LIVE against the painted ground, at a seed
//          chosen by P2 to make the seam guard fire;
//      (ii) the collapsed-trigger accessibility tree, via CDP queryAXTree on the
//          real backend nodes (page.accessibility is gone in this playwright).
import { chromium } from "playwright";
import { oklchStopToHex } from "@mkbabb/glass-ui/color";

const parse = (s) => {
    const m = /oklch\(([\d.eE+-]+) ([\d.eE+-]+) ([\d.eE+-]+)\)/.exec(s.trim());
    return m ? { L: +m[1], C: +m[2], h: +m[3] } : null;
};

async function probe(seedCss, tag) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const url = `http://localhost:9000/#/atmosphere?space=oklch&color=${encodeURIComponent(seedCss)}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector(".aurora-row", { timeout: 15000 });
    await page.waitForTimeout(1500);

    console.log(`\n===== ${tag}  seed=${seedCss} =====`);
    await page.locator('[aria-label="Palette harmony"]').click();
    await page.waitForTimeout(500);
    const data = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        const opt = [...document.querySelectorAll('[role="option"]')].find((o) => /^Analogous/.test(o.textContent.trim()));
        return {
            ground: [0, 1, 2, 3].map((i) => cs.getPropertyValue(`--saved-bg-${i}`).trim()),
            stops: opt?.querySelector(".preview-strip")?.getAttribute("data-stops") ?? null,
            selected: opt?.getAttribute("aria-selected") ?? opt?.getAttribute("data-state"),
            liveSeed: document.querySelector('[data-testid="color-hex"]')?.textContent ?? null,
        };
    });
    const stripHex = (data.stops ?? "").split("|").map(parse).filter(Boolean).map(oklchStopToHex);
    const toRgb = (h) => { const x = h.replace("#", ""); return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16)); };
    const groundRgb = data.ground.map((g) => (g.startsWith("#") ? toRgb(g) : g.match(/\d+/g)?.map(Number)));
    console.log(`  STRIP  (Analogous row, selected=${data.selected})`);
    console.log(`    oklch : ${data.stops}`);
    console.log(`    rgb   : ${JSON.stringify(stripHex.map(toRgb))}`);
    console.log(`  GROUND (--saved-bg-0..3, the painted field material)`);
    console.log(`    css   : ${JSON.stringify(data.ground)}`);
    console.log(`    rgb   : ${JSON.stringify(groundRgb)}`);
    const same = JSON.stringify(stripHex.map(toRgb)) === JSON.stringify(groundRgb);
    console.log(`  IDENTICAL? ${same}${same ? "" : "   <-- THE STRIP DISAGREES WITH THE FIELD"}`);
    if (!same) {
        const d = stripHex.map(toRgb).map((s, i) => s.map((v, j) => v - (groundRgb[i]?.[j] ?? 0)));
        console.log(`  per-channel delta strip-ground: ${JSON.stringify(d)}`);
    }

    // (ii) AX tree for the four triggers
    console.log("  --- accessibility tree, the four collapsed triggers ---");
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("Accessibility.enable");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const { root } = await cdp.send("DOM.getDocument", { depth: -1, pierce: true });
    for (const lbl of ["Palette harmony", "Zone arrangement", "Painterly medium", "Motion register"]) {
        const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: `[aria-label="${lbl}"]` });
        if (!nodeId) { console.log(`    ${lbl}: NOT FOUND`); continue; }
        const { nodes } = await cdp.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false });
        const n = nodes[0];
        const v = (p) => (p && p.value ? p.value.value : null);
        console.log(
            `    ${JSON.stringify({
                visibleValue: await page.locator(`[aria-label="${lbl}"]`).innerText(),
                axRole: v(n.role),
                axName: v(n.name),
                nameFrom: (n.name?.sources ?? []).filter((s) => s.value && !s.superseded).map((s) => s.type),
                axValue: v(n.value),
                axDescription: v(n.description),
                props: (n.properties ?? []).map((p) => `${p.name}=${v(p)}`).join(","),
            })}`,
        );
    }
    await browser.close();
}

// P2 says the guard fires (and diverges) for a mid seed; and does NOT for some others.
await probe("oklch(0.5 0.16 10)", "GUARD-FIRING SEED");
await probe("oklch(0.62 0.27 9.8)", "APP DEFAULT-ish SEED");
