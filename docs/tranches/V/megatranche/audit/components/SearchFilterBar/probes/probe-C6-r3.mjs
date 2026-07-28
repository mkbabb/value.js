// CHALLENGE-C r3 · probe C6 — the r2 residue: style-token liveness, the p-0/w-60
// per-instance overrides, the mount-time hex autofill re-check, the swatch/search
// desync, button `type`, and the HSV<->hex writeback loop the PARENT closes.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.route("**/platform/transport/availability.ts*", async (route) => {
    const res = await route.fetch();
    const body = (await res.text()).replace(
        /function assertApiAttemptAllowed\(\)\s*\{/,
        "function assertApiAttemptAllowed() { return;",
    );
    await route.fulfill({ response: res, body, headers: { ...res.headers(), "content-type": "text/javascript" } });
});
await context.route("https://api.color.babb.dev/**", async (route) => {
    const cors = {
        "access-control-allow-origin": ORIGIN,
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "*",
        "access-control-allow-methods": "*",
        "content-type": "application/json",
    };
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
    if (route.request().url().includes("/colors/tags"))
        return route.fulfill({ status: 200, headers: cors, body: JSON.stringify(TAGS) });
    return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([]) });
});

const page = await context.newPage();
const consoleLines = [];
page.on("console", (m) => consoleLines.push(`${m.type()}: ${m.text().slice(0, 200)}`));
page.on("pageerror", (e) => consoleLines.push(`pageerror: ${String(e).slice(0, 200)}`));

const out = {};
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2200);

// ---- 0. does the `shadow-cartoon-sm` / `shadow-cartoon-md` UTILITY exist in the
// served stylesheet set? (the TOKEN exists in glass-ui; a token is not a utility)
out.utilityScan = await page.evaluate(() => {
    const want = ["shadow-cartoon-sm", "shadow-cartoon-md", "focus-ring", "text-micro", "scrollbar-thin", "duration-fast"];
    const found = Object.fromEntries(want.map((w) => [w, []]));
    for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (rs) => {
            for (const r of rs) {
                if (r.cssRules) walk(r.cssRules);
                const sel = r.selectorText;
                if (!sel) continue;
                for (const w of want) {
                    if (sel.includes(w) && found[w].length < 3) found[w].push(sel.slice(0, 120));
                }
            }
        };
        walk(rules);
    }
    // and: is the TOKEN defined on :root?
    const cs = getComputedStyle(document.documentElement);
    return {
        selectors: found,
        tokenSm: cs.getPropertyValue("--shadow-cartoon-sm").trim().slice(0, 80),
        tokenMd: cs.getPropertyValue("--shadow-cartoon-md").trim().slice(0, 80),
    };
});

// ---- 1. SearchBar host: is there a <form> ancestor above the trigger?
out.host = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label="Filters"]');
    if (!b) return { found: false };
    const chain = [];
    let n = b;
    while (n && n !== document.body) {
        chain.push(n.tagName + (n.className && typeof n.className === "string" ? "." + n.className.split(" ")[0] : ""));
        n = n.parentElement;
    }
    return {
        found: true,
        triggerType: b.getAttribute("type"),
        triggerTypeProp: b.type,
        hasFormAncestor: !!b.closest("form"),
        chain: chain.slice(0, 8),
    };
});

// ---- 2. open the popover; read the fresh state BEFORE any interaction
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

const readPanel = () =>
    page.evaluate(() => {
        const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")]
            .map((w) => w.firstElementChild)
            .filter(Boolean);
        const c = wraps[0];
        if (!c) return { open: false };
        const s = getComputedStyle(c);
        const input = c.querySelector("input");
        const swatch = c.querySelector('button[aria-label^="Open color picker"]');
        const searchBtn = [...c.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
        const ss = swatch ? getComputedStyle(swatch) : null;
        return {
            open: true,
            padding: s.padding,
            paddingInline: s.paddingInline,
            paddingBlock: s.paddingBlock,
            width: s.width,
            maxHeight: s.maxHeight,
            overflowY: s.overflowY,
            classList: c.className.slice(0, 260),
            inputValue: input ? input.value : null,
            inputPlaceholderShown: input ? input.value === "" : null,
            swatchLabel: swatch?.getAttribute("aria-label") ?? null,
            swatchBg: ss?.backgroundColor ?? null,
            swatchBoxShadow: ss?.boxShadow ?? null,
            swatchType: swatch?.getAttribute("type") ?? null,
            swatchTypeProp: swatch?.type ?? null,
            swatchRect: swatch ? (({ width, height }) => ({ width, height }))(swatch.getBoundingClientRect()) : null,
            searchBtnType: searchBtn?.getAttribute("type") ?? null,
            searchBtnTypeProp: searchBtn?.type ?? null,
            searchBtnRect: searchBtn
                ? (({ width, height }) => ({ width: +width.toFixed(1), height: +height.toFixed(1) }))(searchBtn.getBoundingClientRect())
                : null,
            searchBtnName: searchBtn?.textContent.trim() ?? null,
            badge: [...c.parentElement.ownerDocument.querySelectorAll('button[aria-label="Filters"] span')]
                .map((s2) => s2.textContent.trim())
                .join("|"),
        };
    });

out.freshOpen = await readPanel();

// hover the swatch -> does hover:shadow-cartoon-md do anything?
await page.locator('button[aria-label^="Open color picker"]').first().hover();
await page.waitForTimeout(350);
out.swatchHover = await page.evaluate(() => {
    const sw = document.querySelector('button[aria-label^="Open color picker"]');
    return { boxShadow: getComputedStyle(sw).boxShadow };
});

// ---- 3. type a VALID 6-hex that is not the picker default, search, and look at
// what the swatch (and its accessible name) claims afterwards.
const input = page.locator('input[aria-label="Search by CSS color"]').first();
await input.click();
await input.fill("#ff0000");
await page.waitForTimeout(200);
await page.locator("button", { hasText: /^Search$/ }).first().click();
await page.waitForTimeout(800);
out.afterValidHexSearch = await page.evaluate(() => {
    const c = document.querySelector("[data-reka-popper-content-wrapper]")?.firstElementChild;
    const swatch = c?.querySelector('button[aria-label^="Open color picker"]');
    const trig = document.querySelector('button[aria-label="Filters"]');
    return {
        swatchLabel: swatch?.getAttribute("aria-label"),
        swatchBg: swatch ? getComputedStyle(swatch).backgroundColor : null,
        inputValue: c?.querySelector("input")?.value,
        triggerAccessibleLabel: trig?.getAttribute("aria-label"),
        badgeText: trig?.querySelector("span")?.textContent.trim() ?? "",
        wallCount: document.querySelectorAll("[data-slot='card']").length,
    };
});

// ---- 4. the writeback loop: open the mini picker and drag into the low-chroma
// and low-value regions, sampling the thumbs.
await page.locator('button[aria-label^="Open color picker"]').first().click();
await page.waitForTimeout(700);

const svBox = await page.evaluate(() => {
    const el = document.querySelector(".sv-canvas");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
});
out.svBox = svBox;

const sample = () =>
    page.evaluate(() => {
        const sv = document.querySelector(".sv-canvas");
        const thumb = sv?.firstElementChild;
        const hueStrip = sv?.parentElement?.querySelector('div[style*="linear-gradient(to right, #f00"]');
        const hueThumb = hueStrip?.firstElementChild;
        const readout = [...(sv?.parentElement?.querySelectorAll("span") ?? [])]
            .map((s) => s.textContent.trim())
            .find((t) => /^#[0-9a-f]{6}$/i.test(t));
        const outerInput = document.querySelector('input[aria-label="Search by CSS color"]');
        return {
            thumbLeft: thumb?.style.left ?? null,
            thumbTop: thumb?.style.top ?? null,
            hueThumbLeft: hueThumb?.style.left ?? null,
            readout: readout ?? null,
            outerInput: outerInput?.value ?? null,
        };
    });

async function dragTo(fx, fy, label) {
    const x = svBox.x + svBox.w * fx;
    const y = svBox.y + svBox.h * fy;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y, { steps: 2 });
    const during = await sample();
    await page.mouse.up();
    await page.waitForTimeout(250);
    const after = await sample();
    return { label, target: { fx, fy }, during, after };
}

out.dragSamples = [];
out.dragSamples.push(await dragTo(0.9, 0.2, "high-sat/high-val (control)"));
out.dragSamples.push(await dragTo(0.02, 0.2, "near-gray high-val (hue-drift probe)"));
out.dragSamples.push(await dragTo(0.9, 0.2, "back to high-sat (did hue survive?)"));
out.dragSamples.push(await dragTo(0.6, 0.95, "dark region (quantisation probe)"));
out.dragSamples.push(await dragTo(0.6, 0.5, "return to mid"));

// ---- 5. Escape from the inner picker: which layers close?
await page.keyboard.press("Escape");
await page.waitForTimeout(500);
out.afterEscape = await page.evaluate(() => ({
    wrappers: document.querySelectorAll("[data-reka-popper-content-wrapper]").length,
    svPresent: !!document.querySelector(".sv-canvas"),
    filterPanelPresent: !!document.querySelector('input[aria-label="Search by CSS color"]'),
    activeEl: document.activeElement?.tagName + "/" + (document.activeElement?.getAttribute("aria-label") ?? ""),
}));

out.console = consoleLines.slice(-40);
writeFileSync(`${EV}/probeC6-r3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
