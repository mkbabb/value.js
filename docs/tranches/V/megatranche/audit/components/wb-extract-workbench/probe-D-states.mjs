// CHALLENGE-D · ExtractWorkbench — STATE COVERAGE probe.
// Drives the real route through: empty(ghost) → processing(skeleton) → extracted(card)
// and records the result-seat geometry at each step plus the intermediate frame the
// `<Transition mode="out-in">` produces. Also exercises k=1 and k=16, and the
// disabled/hover/focus registers. Read-only against the dev server.
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames-states");
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";

// A deterministic 4-color test image, built with sips from a solid then composited?
// Simpler: a raw PNG written by hand (8x8, 4 quadrants) via a data buffer.
const png = resolve(OUT, "test-quadrants.png");
execSync(
    `python3 -c "
import zlib,struct
W=H=64
px=bytearray()
for y in range(H):
    px.append(0)
    for x in range(W):
        if x<W//2 and y<H//2: c=(220,40,80)
        elif x>=W//2 and y<H//2: c=(30,120,200)
        elif x<W//2 and y>=H//2: c=(240,200,60)
        else: c=(40,160,90)
        px += bytes(c)
def chunk(t,d):
    return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
out=b'\\x89PNG\\r\\n\\x1a\\n'
out+=chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))
out+=chunk(b'IDAT',zlib.compress(bytes(px)))
out+=chunk(b'IEND',b'')
open('${png}','wb').write(out)
"`,
    { shell: "/bin/bash" },
);

const SEAT = () => {
    const q = (s) => document.querySelector(s);
    const R = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
    };
    const ghost = q("[data-slot='shadow-palette']");
    const skel = q("[data-slot='palette-card-skeleton']");
    const card = q("[data-slot='palette-card'],article,[class*='palette-card']");
    const caption = [...document.querySelectorAll("p")].find((e) => /undeveloped plate/i.test(e.textContent));
    const err = [...document.querySelectorAll("div")].find((e) =>
        /Camera access denied|failed|error/i.test(e.textContent) && e.children.length === 0);
    // the Transition seat = the last child of the controls+result column
    const col = ghost?.parentElement?.parentElement || skel?.parentElement || null;
    const pane = [...document.querySelectorAll("*")].find((e) =>
        e.className && String(e.className).includes("pane-scroll-fade"));
    return {
        present: {
            ghost: !!ghost,
            skeleton: !!skel,
            card: !!card,
            caption: !!caption,
            error: err ? err.textContent.trim().slice(0, 60) : null,
        },
        ghostRect: R(ghost),
        skelRect: R(skel),
        cardRect: R(card),
        colRect: R(col),
        paneScrollH: pane ? pane.scrollHeight : null,
        paneClientH: pane ? pane.clientHeight : null,
        docH: document.documentElement.scrollHeight,
        anims: document.getAnimations ? document.getAnimations().length : -1,
        // announce surface
        live: [...document.querySelectorAll("[role='status'],[aria-live]")].map(
            (e) => `${e.getAttribute("role") || e.getAttribute("aria-live")}:${(e.getAttribute("aria-label") || e.textContent).trim().slice(0, 40)}`,
        ),
    };
};

const browser = await webkit.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await context.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
page.on("console", (m) => m.type() === "error" && errs.push("console:" + m.text().slice(0, 160)));
await page.goto(ORIGIN + "/#/extract", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

const log = [];
const snap = async (tag) => {
    const s = await page.evaluate(SEAT);
    log.push({ tag, ...s });
    console.log(tag.padEnd(26), JSON.stringify(s.present), "ghost=", JSON.stringify(s.ghostRect),
        "skel=", JSON.stringify(s.skelRect), "card=", JSON.stringify(s.cardRect), "docH=", s.docH, "anims=", s.anims);
    await page.screenshot({ path: resolve(OUT, `${tag}.png`), fullPage: true }).catch(() => {});
    return s;
};

await snap("01-empty-k5");

// k=1 and k=16 — the ghost is k-threaded, so its height is a function of k.
const kThumb = page.locator("[aria-label='Number of colors'][role='slider'], span[aria-label='Number of colors']").last();
await kThumb.click().catch(() => {});
for (let i = 0; i < 6; i++) { await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(60); }
await page.waitForTimeout(600);
await snap("02-empty-k1");
for (let i = 0; i < 20; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(50); }
await page.waitForTimeout(700);
await snap("03-empty-k16");
for (let i = 0; i < 11; i++) { await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(50); }
await page.waitForTimeout(500);
await snap("04-empty-k5-again");

// Feed an image — capture the mid-transition frame aggressively.
const before = await page.evaluate(SEAT);
await page.setInputFiles("input[type=file]", png);
const mid = [];
for (let i = 0; i < 24; i++) {
    mid.push({ t: i * 40, ...(await page.evaluate(SEAT)) });
    await page.waitForTimeout(40);
}
await page.waitForTimeout(2500);
const after = await snap("05-extracted");
writeFileSync(resolve(HERE, "probe-D-states-mid.json"), JSON.stringify({ before, mid, after }, null, 1));
console.log("\n--- mid-transition seat trace (result column height) ---");
for (const m of mid) {
    console.log(
        String(m.t).padStart(4),
        "ghost=", m.ghostRect ? m.ghostRect.h : "-",
        "skel=", m.skelRect ? m.skelRect.h : "-",
        "card=", m.cardRect ? m.cardRect.h : "-",
        "col=", m.colRect ? m.colRect.h : "-",
        "docH=", m.docH,
    );
}

// hover + focus registers on the three icon controls
const names = ["Upload image", "Open camera", "Reset"];
const ctl = [];
for (const t of names) {
    const el = page.locator(`[title="${t}"]`).first();
    const base = await el.evaluate((e) => {
        const c = getComputedStyle(e);
        return { bg: c.backgroundColor, outline: c.outlineWidth, shadow: c.boxShadow.slice(0, 60), opacity: c.opacity, cursor: c.cursor, pe: c.pointerEvents };
    }).catch(() => null);
    await el.hover().catch(() => {});
    await page.waitForTimeout(350);
    const hov = await el.evaluate((e) => {
        const c = getComputedStyle(e);
        return { bg: c.backgroundColor, shadow: c.boxShadow.slice(0, 60) };
    }).catch(() => null);
    const foc = await el.evaluate((e) => {
        e.focus();
        const c = getComputedStyle(e);
        return { outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, shadow: c.boxShadow.slice(0, 60), matches: e.matches(":focus-visible") };
    }).catch(() => null);
    ctl.push({ title: t, base, hov, foc });
    console.log("CTL", t, JSON.stringify({ base, hov, foc }));
}
await snap("06-after-focus");
writeFileSync(resolve(HERE, "probe-D-states.json"), JSON.stringify({ log, ctl, pageErrors: errs }, null, 1));
console.log("\npageErrors:", errs);
await browser.close();
