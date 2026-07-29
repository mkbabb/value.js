// CHALLENGE-D run-4 · probe 1 — does the identity pill WRAP?
//
// `.slug-pill` (demo/styles/foundation.css:585) omits `white-space`. Three of the
// four consumers hand-patch `whitespace-nowrap` per instance; PaletteSlugBar.vue
// (:48, :65) does not. A user slug is `adj-verb-color-animal` — four hyphenated
// segments, i.e. three soft-wrap opportunities. Measure the rendered line-box
// count of the pill inside the LIVE `My Palettes` pane at the PROPORTION-AUDIT §2
// viewport arms (1440 / 390 / 320), with and without the patch.
//
// Read-only: the injected node lives inside a single evaluate and is removed
// before it returns. No app state is written.
import { webkit } from "playwright";

// The exact word lists from api/src/modules/session/slugWords.ts.
const ADJ_MAX = "iridescent";           // 10
const VERB_MAX = "threading";           // 9
const COLOR_MAX = "champagne";          // 9
const ANIMAL_MAX = "jellyfish";         // 9
const LONG = `${ADJ_MAX}-${VERB_MAX}-${COLOR_MAX}-${ANIMAL_MAX}`;   // 40 chars
const MEDIAN = "silent-drifting-cerulean-pelican";                   // 32 chars
const SHORT = "raw-biting-jet-ox";                                   // 17 chars

const BAR_HTML = (slug, nowrap) => `
<div data-psb-probe class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
  <div class="flex items-center gap-1.5">
    <span class="slug-pill cursor-help${nowrap ? " whitespace-nowrap" : ""}"
          data-psb-pill style="color: var(--primary); border-color: var(--primary);">${slug}</span>
    <button data-psb-dots class="p-1 rounded-sm" aria-label="Account menu">
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" width="14" height="14"></svg>
    </button>
  </div>
</div>`;

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const rows = [];
for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(500);
    for (const [label, slug] of [["long-40ch", LONG], ["median-32ch", MEDIAN], ["short-17ch", SHORT]]) {
        for (const nowrap of [false, true]) {
            const r = await page.evaluate(
                ({ html, width }) => {
                    // Host = the live "My Palettes" pane content box, i.e. exactly the
                    // container the bar was authored to sit in (PalettesPane PaneHeader).
                    const heads = [...document.querySelectorAll("h1,h2,h3")];
                    const h = heads.find((e) => /my palettes/i.test(e.textContent || ""));
                    const host = h?.parentElement ?? document.querySelector("main") ?? document.body;
                    const holder = document.createElement("div");
                    holder.innerHTML = html;
                    const bar = holder.firstElementChild;
                    host.insertBefore(bar, host.firstChild);
                    const pill = bar.querySelector("[data-psb-pill]");
                    const cs = getComputedStyle(pill);
                    const range = document.createRange();
                    range.selectNodeContents(pill);
                    const lineBoxes = range.getClientRects().length;
                    const pr = pill.getBoundingClientRect();
                    const hr = host.getBoundingClientRect();
                    const out = {
                        whiteSpace: cs.whiteSpace,
                        fontFamily: cs.fontFamily.split(",")[0],
                        fontSize: cs.fontSize,
                        borderWidth: cs.borderTopWidth,
                        lineBoxes,
                        pillW: +pr.width.toFixed(2),
                        pillH: +pr.height.toFixed(2),
                        hostW: +hr.width.toFixed(2),
                        overflowPx: +(pr.right - hr.right).toFixed(2),
                        viewportOverflowPx: +(pr.right - width).toFixed(2),
                    };
                    bar.remove();
                    return out;
                },
                { html: BAR_HTML(slug, nowrap), width },
            );
            rows.push({ width, label, nowrap, ...r });
        }
    }
}

console.log("slug corpus: adj-verb-color-animal (api/src/modules/session/slugWords.ts:99-104)");
console.log(`  longest possible = ${LONG} (${LONG.length} chars)`);
console.log(`  median-ish       = ${MEDIAN} (${MEDIAN.length} chars)`);
console.log(`  shortest-ish     = ${SHORT} (${SHORT.length} chars)\n`);
console.log(
    ["vw", "slug", "nowrap", "white-space", "lineBoxes", "pillW", "pillH", "hostW", "overflowPx"]
        .map((s) => s.padEnd(12))
        .join(""),
);
for (const r of rows) {
    console.log(
        [
            r.width,
            r.label,
            r.nowrap ? "PATCHED" : "as-authored",
            r.whiteSpace,
            r.lineBoxes,
            r.pillW,
            r.pillH,
            r.hostW,
            r.overflowPx,
        ]
            .map((s) => String(s).padEnd(12))
            .join(""),
    );
}
console.log(`\nfont: ${rows[0].fontFamily} ${rows[0].fontSize}, border ${rows[0].borderWidth}`);
await browser.close();
