// CHALLENGE-D · ExtractWorkbench — keyboard-focus reachability/visibility + the
// out-in transition seat trace with a STABLE column selector and a large image
// (so `isProcessing` is observable). WebKit AND Chromium: macOS WebKit ships Full
// Keyboard Access OFF, so a WebKit-only focus verdict is untrustworthy (MT-F022 #3).
import { webkit, chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames-focus");
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";
const big = resolve(OUT, "big.png");
execSync(
    `python3 -c "
import zlib,struct,math
W=H=900
px=bytearray()
for y in range(H):
    px.append(0)
    for x in range(W):
        px += bytes(((x*7+y*3)%256,(x*3+y*11)%256,(x*13+y*5)%256))
def chunk(t,d):
    return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
out=b'\\x89PNG\\r\\n\\x1a\\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(bytes(px),1))+chunk(b'IEND',b'')
open('${big}','wb').write(out)
"`,
    { shell: "/bin/bash" },
);

const FOCUS = () => {
    const ae = document.activeElement;
    if (!ae || ae === document.body) return { el: null };
    const c = getComputedStyle(ae);
    const b = ae.getBoundingClientRect();
    const path = [];
    for (let e = ae; e && e !== document.body; e = e.parentElement)
        path.unshift(e.tagName.toLowerCase() + (e.className ? "." + String(e.className).split(/\s+/)[0] : ""));
    const ringPainted =
        (c.outlineStyle !== "none" && parseFloat(c.outlineWidth) > 0) ||
        (c.boxShadow !== "none" && !/^(oklab\(0 0 0 \/ 0\)|rgba\(0, 0, 0, 0\))/.test(c.boxShadow));
    return {
        el: `${ae.tagName.toLowerCase()}[${(ae.getAttribute("aria-label") || ae.getAttribute("title") || ae.textContent || "").trim().slice(0, 30)}]`,
        path: path.slice(-3).join(">"),
        rect: { w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
        outline: `${c.outlineStyle}/${c.outlineWidth}/${c.outlineColor}`,
        boxShadow: c.boxShadow.slice(0, 90),
        focusVisible: ae.matches(":focus-visible"),
        ringPainted,
        inExtract: !!ae.closest(".pane-scroll-fade"),
    };
};

const SEAT = () => {
    const R = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { y: +b.y.toFixed(1), h: +b.height.toFixed(1) };
    };
    const ctl = document.querySelector("[data-o18='extract-k-rail']");
    // stable: the result column = the flex-col that CONTAINS the controls row
    const col = ctl ? ctl.closest(".flex.flex-col.gap-3") : null;
    const outer = col ? col.parentElement : null;
    const pane = document.querySelector(".pane-scroll-fade");
    return {
        ghost: R(document.querySelector("[data-slot='shadow-palette']")),
        skel: R(document.querySelector("[data-slot='palette-card-skeleton']")),
        card: R(document.querySelector("[data-slot='palette-card']")),
        outerH: outer ? +outer.getBoundingClientRect().height.toFixed(1) : null,
        paneScrollH: pane ? pane.scrollHeight : null,
        capt: !!document.evaluate("//p[contains(., 'undeveloped plate')]", document, null, 9, null).singleNodeValue,
    };
};

const rows = { engines: {} };
for (const [name, engine] of [["webkit", webkit], ["chromium", chromium]]) {
    const browser = await engine.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await context.newPage();
    await page.goto(ORIGIN + "/#/extract", { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500);

    // ---- keyboard traversal ----
    const tabs = [];
    for (let i = 0; i < 26; i++) {
        await page.keyboard.press("Tab");
        await page.waitForTimeout(110);
        const f = await page.evaluate(FOCUS);
        tabs.push({ i, ...f });
        if (f.inExtract)
            console.log(
                `${name} tab#${String(i).padStart(2)} ${String(f.el).padEnd(40)} ring=${f.ringPainted} fv=${f.focusVisible} outline=${f.outline} rect=${f.rect.w}x${f.rect.h}`,
            );
    }
    await page.screenshot({ path: resolve(OUT, `${name}-focus-last.png`), fullPage: true });

    // ---- transition seat trace with a big image ----
    const trace = [];
    await page.setInputFiles("input[type=file]", big);
    for (let i = 0; i < 60; i++) {
        trace.push({ t: i * 35, ...(await page.evaluate(SEAT)) });
        await page.waitForTimeout(35);
    }
    await page.waitForTimeout(3000);
    trace.push({ t: "settled", ...(await page.evaluate(SEAT)) });
    await page.screenshot({ path: resolve(OUT, `${name}-extracted.png`), fullPage: true });

    console.log(`\n--- ${name} seat trace ---`);
    let prev = null;
    for (const t of trace) {
        const occupant = t.ghost ? `ghost h=${t.ghost.h}` : t.skel ? `SKEL h=${t.skel.h}` : t.card ? `card h=${t.card.h}` : "EMPTY";
        const line = `${String(t.t).padStart(8)}  ${occupant.padEnd(16)} outerH=${t.outerH}  paneScrollH=${t.paneScrollH} capt=${t.capt}`;
        if (line.slice(10) !== prev) console.log(line);
        prev = line.slice(10);
    }
    rows.engines[name] = { tabs, trace };
    await browser.close();
}
writeFileSync(resolve(HERE, "probe-D-focus-transition.json"), JSON.stringify(rows, null, 1));
console.log("\nwrote probe-D-focus-transition.json");
