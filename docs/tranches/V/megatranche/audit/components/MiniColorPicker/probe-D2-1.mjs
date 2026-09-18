// CHALLENGE-D pass 2 — MiniColorPicker.vue
// Read-only. Drives the LIVE dev server at :9000 in WebKit (Safari engine).
//   node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-1.mjs
//
// Hypotheses under test (pass-2, all NEW or adversarial to pass 1):
//   H1  zero-interaction clobber: opening the mini picker and pressing its own
//       "Search" destroys a typed CSS colour with NO pointer contact on either axis.
//   H2  the dialog's accessible name mutates on every pointer sample.
//   H3  both markers are fill-invisible by construction (fill == substrate).
//   H4  internal spacing is a Tailwind literal ladder, not the producer token ladder.
//   H5  the child dialog's right edge misses the parent's by a few px (near-miss).
//   H6  the whole Find-by-Colour group stays live while the route is in hard error.
//   H7  the hue handle has no vertical centring declaration.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots-p2");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";
const out = {};

const MATRIX = [
    { id: "desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
    { id: "desktop-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
];

const browser = await webkit.launch();

async function openChain(page, { typeFirst } = {}) {
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForSelector('button[aria-label="Filters"]', { timeout: 30000 });
    await page.waitForTimeout(2200);
    for (let attempt = 0; attempt < 3; attempt++) {
        await page.click('button[aria-label="Filters"]');
        await page.waitForTimeout(700);
        if (await page.locator('button[aria-label^="Open color picker"]').count()) break;
    }
    if (typeFirst) {
        const inp = page.locator('input[aria-label="Search by CSS color"]');
        await inp.click();
        await inp.fill(typeFirst);
        await page.waitForTimeout(150);
    }
    const swatch = page.locator('button[aria-label^="Open color picker"]');
    await swatch.first().click({ force: true, timeout: 15000 });
    await page.waitForSelector(".sv-canvas", { timeout: 15000 });
    await page.waitForTimeout(500);
}

for (const m of MATRIX) {
    const context = await browser.newContext(m.ctx);
    const page = await context.newPage();
    const rec = {};
    out[m.id] = rec;

    // ---------- H1: zero-interaction clobber -------------------------------
    await openChain(page, { typeFirst: "oklch(0.72 0.31 145)" });
    rec.H1 = await page.evaluate(() => {
        const i = document.querySelector('input[aria-label="Search by CSS color"]');
        return { beforeSearchClick: i ? i.value : null };
    });
    // click the CHILD's Search (the one inside the mini dialog)
    rec.H1.childSearchClicked = await page.evaluate(() => {
        const svc = document.querySelector(".sv-canvas");
        const dlg = svc && svc.closest('[role="dialog"]');
        if (!dlg) return false;
        const btns = [...dlg.querySelectorAll("button")].filter(
            (b) => b.textContent.trim() === "Search",
        );
        if (!btns.length) return false;
        btns[0].click();
        return true;
    });
    await page.waitForTimeout(400);
    rec.H1.afterSearchClick = await page.evaluate(() => {
        const i = document.querySelector('input[aria-label="Search by CSS color"]');
        return i ? i.value : null;
    });
    rec.H1.clobberedWithZeroPointerContact =
        rec.H1.beforeSearchClick !== rec.H1.afterSearchClick;

    // ---------- reopen for the geometry / a11y / spacing census -------------
    await openChain(page);

    rec.census = await page.evaluate(() => {
        const R = (el) => {
            if (!el) return null;
            const b = el.getBoundingClientRect();
            return {
                x: +b.x.toFixed(1),
                y: +b.y.toFixed(1),
                w: +b.width.toFixed(1),
                h: +b.height.toFixed(1),
                r: +b.right.toFixed(1),
                bo: +b.bottom.toFixed(1),
            };
        };
        const sv = document.querySelector(".sv-canvas");
        const child = sv && sv.closest('[role="dialog"]');
        const dialogs = [...document.querySelectorAll('[role="dialog"]')];
        const parent = dialogs.find((d) => d !== child) || null;
        const rail = child && child.querySelectorAll(":scope > div")[1];
        const row = child && child.querySelectorAll(":scope > div")[2];
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const svCs = cs(sv),
            railCs = cs(rail),
            rowCs = cs(row),
            childCs = cs(child);
        const thumb = sv && sv.querySelector("div");
        const handle = rail && rail.querySelector("div");
        const root = getComputedStyle(document.documentElement);
        return {
            child: R(child),
            parent: R(parent),
            edgeDelta: child && parent
                ? {
                      left: +(child.getBoundingClientRect().x - parent.getBoundingClientRect().x).toFixed(1),
                      right: +(parent.getBoundingClientRect().right - child.getBoundingClientRect().right).toFixed(1),
                  }
                : null,
            childSide: child ? child.getAttribute("data-side") : null,
            childAlign: child ? child.getAttribute("data-align") : null,
            childPadding: childCs ? childCs.padding : null,
            // H4 spacing ladder
            spacing: {
                svMarginTop: svCs?.marginTop,
                railMarginTop: railCs?.marginTop,
                rowMarginTop: rowCs?.marginTop,
                rowGap: rowCs?.columnGap,
                childPaddingBlock: childCs?.paddingBlock ?? childCs?.paddingTop,
                childPaddingInline: childCs?.paddingInline ?? childCs?.paddingLeft,
            },
            tokens: {
                overlayPadInline: root.getPropertyValue("--overlay-pad-inline").trim(),
                overlayPadBlock: root.getPropertyValue("--overlay-pad-block").trim(),
                spacing: root.getPropertyValue("--spacing").trim(),
                phi3: root.getPropertyValue("--space-phi-3").trim(),
                phi4: root.getPropertyValue("--space-phi-4").trim(),
                phi5: root.getPropertyValue("--space-phi-5").trim(),
            },
            // H7 handle vertical centring
            handleBox: handle
                ? {
                      top: getComputedStyle(handle).top,
                      transform: getComputedStyle(handle).transform,
                      h: +handle.getBoundingClientRect().height.toFixed(1),
                      railH: +rail.getBoundingClientRect().height.toFixed(1),
                  }
                : null,
            thumbBox: thumb
                ? {
                      bg: getComputedStyle(thumb).backgroundColor,
                      border: getComputedStyle(thumb).borderColor,
                      w: +thumb.getBoundingClientRect().width.toFixed(1),
                  }
                : null,
            // scheme invariance
            svBackgroundImage: svCs?.backgroundImage,
            railBackgroundImage: railCs?.backgroundImage,
            // H6: is anything disabled while the route is in hard error?
            routeError: /unreachable|Failed to load/i.test(document.body.innerText),
            disabledInFindByColor: (() => {
                const inp = document.querySelector('input[aria-label="Search by CSS color"]');
                const sw = document.querySelector('button[aria-label^="Open color picker"]');
                const childBtns = child
                    ? [...child.querySelectorAll("button")].map((b) => ({
                          t: b.textContent.trim(),
                          disabled: b.disabled,
                          ariaDisabled: b.getAttribute("aria-disabled"),
                      }))
                    : [];
                return {
                    input: inp ? { disabled: inp.disabled, readOnly: inp.readOnly } : null,
                    swatch: sw ? { disabled: sw.disabled } : null,
                    childButtons: childBtns,
                };
            })(),
            // dialog semantics
            childA11y: child
                ? {
                      role: child.getAttribute("role"),
                      labelledby: child.getAttribute("aria-labelledby"),
                      describedby: child.getAttribute("aria-describedby"),
                      modal: child.getAttribute("aria-modal"),
                      focusables: [...child.querySelectorAll("a[href],button,input,select,textarea,[tabindex]")]
                          .filter((e) => !e.hasAttribute("disabled"))
                          .map((e) => ({ tag: e.tagName.toLowerCase(), name: (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 60) })),
                      colourEncodings: (() => {
                          // how many distinct visual encodings of the same colour live in one surface?
                          const n = [];
                          if (child.querySelector(".sv-canvas div")) n.push("sv-thumb-fill");
                          const spans = [...child.querySelectorAll("span")];
                          if (spans.some((s) => s.style.backgroundColor)) n.push("output-dot");
                          if (spans.some((s) => /^#[0-9a-f]{6}$/i.test(s.textContent.trim()))) n.push("hex-text");
                          const trg = document.querySelector('button[aria-label^="Open color picker"]');
                          if (trg && trg.style.backgroundColor) n.push("trigger-swatch");
                          const inp = document.querySelector('input[aria-label="Search by CSS color"]');
                          if (inp && /^#[0-9a-f]{6}$/i.test(inp.value)) n.push("sibling-input-text");
                          return n;
                      })(),
                  }
                : null,
        };
    });

    // ---------- H2: accessible name mutates during drag --------------------
    rec.H2 = await page.evaluate(async () => {
        const sv = document.querySelector(".sv-canvas");
        const child = sv && sv.closest('[role="dialog"]');
        const labelEl = child && document.getElementById(child.getAttribute("aria-labelledby") || "");
        const readName = () =>
            labelEl ? labelEl.getAttribute("aria-label") || labelEl.textContent.trim() : null;
        const names = [readName()];
        const b = sv.getBoundingClientRect();
        for (let i = 1; i <= 8; i++) {
            const x = b.left + (b.width * i) / 9;
            const y = b.top + b.height * 0.4;
            sv.dispatchEvent(
                new PointerEvent("pointerdown", { clientX: x, clientY: y, bubbles: true, pointerId: 1 }),
            );
            await new Promise((r) => setTimeout(r, 30));
            names.push(readName());
        }
        return { names, distinct: [...new Set(names)].length, samples: names.length };
    });

    // ---------- H3: marker fill vs substrate, sampled from real pixels ------
    await openChain(page);
    const svHandle = await page.$(".sv-canvas");
    const svBox = await svHandle.boundingBox();
    // drive to a mid coordinate first so the thumb is not clipped
    await page.mouse.click(svBox.x + svBox.width * 0.55, svBox.y + svBox.height * 0.45);
    await page.waitForTimeout(250);
    const dlgHandle = await page.$('.sv-canvas >> xpath=ancestor::*[@role="dialog"][1]');
    const png = await dlgHandle.screenshot();
    writeFileSync(resolve(SHOTS, `${m.id}-mini-p2.png`), png);
    const b64 = png.toString("base64");
    rec.H3 = await page.evaluate(async (dataB64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + dataB64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const dpr = window.devicePixelRatio || 1;
        const sv = document.querySelector(".sv-canvas");
        const dlg = sv.closest('[role="dialog"]');
        const dr = dlg.getBoundingClientRect();
        const px = (cssX, cssY) => {
            const d = g.getImageData(
                Math.round((cssX - dr.left) * dpr),
                Math.round((cssY - dr.top) * dpr),
                1,
                1,
            ).data;
            return [d[0], d[1], d[2]];
        };
        const lum = ([r, gg, b]) => {
            const f = (v) => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
            };
            return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
        };
        const contrast = (a, b) => {
            const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
            return +((l1 + 0.05) / (l2 + 0.05)).toFixed(3);
        };
        const thumb = sv.querySelector("div").getBoundingClientRect();
        const tcx = thumb.left + thumb.width / 2,
            tcy = thumb.top + thumb.height / 2;
        const thumbFill = px(tcx, tcy);
        const fieldNear = px(tcx + 16, tcy + 16);
        const ringTop = px(tcx, thumb.top + 1.5);

        const rail = dlg.querySelectorAll(":scope > div")[1];
        const rb = rail.getBoundingClientRect();
        const handle = rail.querySelector("div").getBoundingClientRect();
        const hcx = handle.left + handle.width / 2,
            hcy = rb.top + rb.height / 2;
        const handleFill = px(hcx, hcy);
        const railNear = px(hcx + 14, hcy);
        const ringPx = px(hcx, rb.top + 1);

        // readout contrast: darkest text pixel in the hex span vs its local background
        const span = [...dlg.querySelectorAll("span")].find((s) =>
            /^#[0-9a-f]{6}$/i.test(s.textContent.trim()),
        );
        let readout = null;
        if (span) {
            const sb = span.getBoundingClientRect();
            let darkest = [255, 255, 255],
                lightest = [0, 0, 0];
            for (let x = 0; x < sb.width; x += 1) {
                for (let y = 0; y < sb.height; y += 1) {
                    const p = px(sb.left + x, sb.top + y);
                    if (lum(p) < lum(darkest)) darkest = p;
                    if (lum(p) > lum(lightest)) lightest = p;
                }
            }
            readout = {
                colorComputed: getComputedStyle(span).color,
                fontSize: getComputedStyle(span).fontSize,
                fontStyle: getComputedStyle(span).fontStyle,
                darkestTextPx: darkest,
                lightestBgPx: lightest,
                contrast: contrast(darkest, lightest),
            };
        }
        return {
            svThumb: { thumbFill, fieldNear, contrastFillVsField: contrast(thumbFill, fieldNear), ringTop, contrastRingVsField: contrast(ringTop, fieldNear) },
            hueHandle: { handleFill, railNear, contrastFillVsRail: contrast(handleFill, railNear), ringPx, contrastRingVsRail: contrast(ringPx, railNear) },
            readout,
        };
    }, b64);

    // ---------- H3b: same two contrasts at the YELLOW end of the rail ------
    rec.H3b = await (async () => {
        const rail = await page.$('.sv-canvas >> xpath=following-sibling::div[1]');
        if (!rail) return null;
        const rb = await rail.boundingBox();
        await page.mouse.click(rb.x + rb.width * (1 / 6), rb.y + rb.height / 2); // hue ~60 (yellow)
        await page.waitForTimeout(250);
        const dh = await page.$('.sv-canvas >> xpath=ancestor::*[@role="dialog"][1]');
        const p2 = await dh.screenshot();
        writeFileSync(resolve(SHOTS, `${m.id}-mini-p2-yellow.png`), p2);
        return await page.evaluate(async (dataB64) => {
            const img = new Image();
            img.src = "data:image/png;base64," + dataB64;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.naturalWidth;
            c.height = img.naturalHeight;
            const g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            const dpr = window.devicePixelRatio || 1;
            const sv = document.querySelector(".sv-canvas");
            const dlg = sv.closest('[role="dialog"]');
            const dr = dlg.getBoundingClientRect();
            const px = (x, y) => {
                const d = g.getImageData(Math.round((x - dr.left) * dpr), Math.round((y - dr.top) * dpr), 1, 1).data;
                return [d[0], d[1], d[2]];
            };
            const lum = ([r, gg, b]) => {
                const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
                return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
            };
            const contrast = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return +((l1 + 0.05) / (l2 + 0.05)).toFixed(3); };
            const rail = dlg.querySelectorAll(":scope > div")[1];
            const rb = rail.getBoundingClientRect();
            const handle = rail.querySelector("div").getBoundingClientRect();
            const hcx = handle.left + handle.width / 2, hcy = rb.top + rb.height / 2;
            const handleFill = px(hcx, hcy), railNear = px(hcx + 14, hcy), ringPx = px(hcx, rb.top + 1.5);
            const hexSpan = [...dlg.querySelectorAll("span")].find((s) => /^#[0-9a-f]{6}$/i.test(s.textContent.trim()));
            return {
                hex: hexSpan ? hexSpan.textContent.trim() : null,
                handleFill, railNear, ringPx,
                contrastFillVsRail: contrast(handleFill, railNear),
                contrastRingVsRail: contrast(ringPx, railNear),
            };
        }, p2.toString("base64"));
    })();

    await page.screenshot({ path: resolve(SHOTS, `${m.id}-full-p2.png`) });
    await context.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe-D2-1.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
