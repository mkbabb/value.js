// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.g · gate **g1** — EVERY VERTICAL INTERVAL IN THE PICKER HEADLINE CARD
// RESOLVES TO A TYPE-SCALE STEP.
//
//   npx vite --port 9001 --strictPort     # Lane 2's port (W6.md §4b)
//   node docs/tranches/V/megatranche/audit/probes/x-w6/gate-card-rhythm.mjs
//
// RED at open (`W6.md:276`): *"the card's **largest single interval is empty**
// — a band ≈ the readout row's own height between header and readout; owner
// witness `OM-3-picker-row-gap.png` sha256
// `a44389c2b543434ec78cd6ff828351cb6a02d1e1b075518588564e0283736277`, owner's
// words 'the spacing here between the top row and the bottom row is too
// much'."*
//
// The mechanism the row names (`ROOT-FINDINGS.md:1403`, MT-F029): *"the gap
// must derive from the type scale's interval, **not from leftover flex/grid
// slack**."* That sentence is a TWO-PART test, and this instrument implements
// both parts rather than either one alone:
//
//   PART A · PROVENANCE. An interval is legitimate only if some box DECLARED
//            it — a gap property, a padding, a margin. Free space that a flex
//            or grid container had left over after placing its content, and
//            then distributed by `align-content` / `justify-content`, is
//            declared by nobody: it is the residue the row calls "leftover
//            flex/grid slack". RESIDUE FAILS, at any size, on either side of
//            the content, and whichever way it is anchored.
//   PART B · DERIVATION. A declared interval must additionally resolve to a
//            step of the type scale — the φ ladder (`--phi-0..4`, the register
//            `foundation.css` publishes and `AboutPane.vue` already consumes as
//            `pt-phi-3`), a named rhythm token, or a rung's own line box
//            (font-size × line-height). A bare literal that happens to look
//            right fails: `W6.md:279` — *"g1 fails on any interval with no
//            scale derivation, including one that merely looks right."*
//
// PART A is what makes the gate unsatisfiable by MOVING the band. The same
// 61px reserve has now been placed twice — below the tuple (T.W4-2) and above
// it (T.W6.5-P, `e2e/smoke/oracles/readout-seam.spec.ts`) — and measured as
// dead air both times, the second time by the owner. A gate that only asked
// "is the seam small?" would have gone green on the placement OM-3 marks. This
// one reads free space wherever it lands.
//
// SCOPE — "the Picker headline card": the picker route's own Card (the
// `.pane-shell`'s card child) and its vertical flow, walked to the depth at
// which the card's rhythm is decided (header rows, the header→content seam,
// the content column). Leaf text runs are not entered: a glyph's half-leading
// is a line box, not an interval between rows.
//
// INPUT — pinned, so the census is reproducible and is the owner's own frame:
// `#/?space=lab&color=lab(38% 32 24)`. lab is the space OM-3 was captured in
// and the one whose honest worst case is two lines, so it is the space where a
// worst-case reservation and a one-line tuple actually meet.
//
// STALE-SERVER LAW (`W6.md:148`): run against a FRESHLY started dev server.
//
// Exit 0 = every interval declared AND derived. Exit 1 = at least one is not.
import { chromium } from "playwright";

const ORIGIN = process.env.CARD_RHYTHM_ORIGIN ?? "http://localhost:9001";
const CELL = { width: 1440, height: 900 };
const ROUTE = "/#/?space=lab&color=" + encodeURIComponent("lab(38% 32 24)");
/** Sub-pixel tolerance: layout arithmetic, not a taste band. */
const EPS = 0.75;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: CELL });
await page.goto(`${ORIGIN}${ROUTE}`, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForSelector(".pane-shell .card", { timeout: 20000 });
await page.waitForTimeout(2500);

// ── THE CENSUS ─────────────────────────────────────────────────────────────
// One walk of the card's vertical flow. Every quantity below is a DOM reading;
// nothing is inferred from source. The page returns raw rows, the verdict is
// computed here, so a reader can re-derive the verdict from the printed table.
const census = await page.evaluate(() => {
    const num = (v) => Number.parseFloat(v) || 0;
    const r2 = (n) => Math.round(n * 100) / 100;
    const name = (el) => {
        const cls = (el.getAttribute("class") ?? "")
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .join(".");
        return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}`;
    };

    const card = document.querySelector(".pane-shell .card");
    const header = card.querySelector(".picker-header");

    // The scale, read from the document that renders it.
    const rootCS = getComputedStyle(document.documentElement);
    const rootFS = num(rootCS.fontSize);
    const ladder = [];
    for (let i = 0; i <= 4; i++) {
        const raw = rootCS.getPropertyValue(`--phi-${i}`).trim();
        if (!raw) continue;
        const v = raw.endsWith("rem") ? Number.parseFloat(raw) * rootFS : num(raw);
        if (v > 0) ladder.push({ kind: "phi", name: `--phi-${i}`, px: v });
    }
    const tokens = [
        {
            kind: "token",
            name: "--picker-header-rhythm",
            px: num(getComputedStyle(header).rowGap),
        },
    ].filter((t) => t.px > 0);
    const lines = [];
    for (const el of card.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        const lh = num(cs.lineHeight);
        if (lh > 0 && !lines.some((b) => Math.abs(b.px - lh) < 0.01))
            lines.push({ kind: "line", name: `1lh @ ${cs.fontSize}`, px: lh });
    }

    // In-flow children only: an absolutely positioned ornament (the bead) is
    // not a row of the stack and cannot open or close an interval in it.
    const inFlow = (el) => {
        const cs = getComputedStyle(el);
        if (
            cs.display === "none" ||
            cs.position === "absolute" ||
            cs.position === "fixed"
        )
            return false;
        const r = el.getBoundingClientRect();
        return r.height > 0 || num(cs.marginTop) !== 0 || num(cs.marginBottom) !== 0;
    };

    // The containers whose vertical flow decides the card's rhythm. Named, not
    // inferred: the card, its header, the header's two rows, the content
    // region and its column. A leaf text run is NOT entered.
    const FLOW = [
        card,
        header,
        header.querySelector(".title-row"),
        card.querySelector(".readout"),
        card.querySelector(".card-content"),
        card.querySelector(".card-content > *"),
    ].filter(Boolean);

    const rows = [];
    for (const box of FLOW) {
        const cs = getComputedStyle(box);
        const b = box.getBoundingClientRect();
        const contentTop = b.top + num(cs.borderTopWidth) + num(cs.paddingTop);
        const contentBottom =
            b.bottom - num(cs.borderBottomWidth) - num(cs.paddingBottom);
        const kids = [...box.children].filter(inFlow);
        if (!kids.length) continue;
        const rowGap = num(cs.rowGap);
        const isFlexCol =
            cs.display.includes("flex") && cs.flexDirection.startsWith("column");
        const owner = name(box);

        // Rows in visual order. A flex line's side-by-side children do not
        // stack, so they open no interval between them — only the band above
        // the highest and below the lowest is a gap in this container.
        const sorted = [...kids].sort(
            (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        );
        const first = sorted[0];
        const last = [...kids].sort(
            (a, b) =>
                a.getBoundingClientRect().bottom - b.getBoundingClientRect().bottom,
        )[kids.length - 1];
        const firstCS = getComputedStyle(first);
        const lastCS = getComputedStyle(last);

        // LEADING band — content-box top to the topmost child's border-box top.
        rows.push({
            owner,
            where: "leading",
            edge: `${owner} content-top → ${name(first)} top`,
            px: r2(first.getBoundingClientRect().top - contentTop),
            declared: r2(num(firstCS.marginTop)),
            declaredBy: num(firstCS.marginTop) ? "margin-top" : "—",
        });

        // BETWEEN bands — one per consecutive pair that actually STACKS.
        for (let i = 0; i < sorted.length - 1; i++) {
            const a = sorted[i];
            const z = sorted[i + 1];
            const aB = a.getBoundingClientRect().bottom;
            const zT = z.getBoundingClientRect().top;
            if (zT < aB - 0.01) continue; // side by side on one line
            const aCS = getComputedStyle(a);
            const zCS = getComputedStyle(z);
            const marginPart = isFlexCol
                ? num(aCS.marginBottom) + num(zCS.marginTop)
                : Math.max(num(aCS.marginBottom), num(zCS.marginTop));
            rows.push({
                owner,
                where: "between",
                edge: `${name(a)} bottom → ${name(z)} top`,
                px: r2(zT - aB),
                declared: r2(rowGap + marginPart),
                declaredBy:
                    [rowGap ? "row-gap" : "", marginPart ? "margin" : ""]
                        .filter(Boolean)
                        .join("+") || "—",
            });
        }

        // TRAILING band — the lowest child's border-box bottom to content-box bottom.
        rows.push({
            owner,
            where: "trailing",
            edge: `${name(last)} bottom → ${owner} content-bottom`,
            px: r2(contentBottom - last.getBoundingClientRect().bottom),
            declared: r2(num(lastCS.marginBottom)),
            declaredBy: num(lastCS.marginBottom) ? "margin-bottom" : "—",
        });
    }

    // ── ROW INFLATION — the anti-gaming leg ────────────────────────────
    // A band that is re-declared as padding or margin is the SAME band: the
    // owner's mark is about the band's SIZE, not its provenance. So each row
    // of the headline stack is also measured whole — its border box against
    // the extent its content actually paints. Inflation must be nothing, or a
    // step of the spacing ladder. A whole LINE BOX is not a step of the
    // spacing ladder: a line is the height of a ROW, and allocating a row's
    // height to empty space is exactly `ROOT-FINDINGS.md:1403`'s *"the card's
    // internal vertical rhythm allocates its largest single interval to
    // nothing"*. This leg is why re-anchoring the tuple, or re-declaring the
    // reserve as padding, cannot turn this gate green.
    const inflation = [];
    for (const rowEl of [
        header.querySelector(".title-row"),
        card.querySelector(".readout"),
    ]) {
        if (!rowEl) continue;
        const kids = [...rowEl.querySelectorAll("*")].filter(inFlow);
        const painted = kids.length
            ? Math.max(...kids.map((k) => k.getBoundingClientRect().bottom)) -
              Math.min(...kids.map((k) => k.getBoundingClientRect().top))
            : 0;
        const h = rowEl.getBoundingClientRect().height;
        inflation.push({
            row: name(rowEl),
            boxHeight: r2(h),
            paintedHeight: r2(painted),
            inflation: r2(h - painted),
        });
    }

    return { scale: [...ladder, ...tokens, ...lines], rows, inflation };
});
await browser.close();

// ── THE VERDICT ────────────────────────────────────────────────────────────
const fmt = (n) => n.toFixed(2).padStart(8);
const derive = (v) => {
    const cands = [];
    for (const s of census.scale) {
        if (s.kind === "phi")
            for (const m of [1, 2, 3])
                cands.push({ name: m === 1 ? s.name : `${m}×${s.name}`, px: s.px * m });
        else if (s.kind === "token") cands.push(s);
        // s.kind === "line" is printed for context and is NOT a derivation.
    }
    return cands.find((c) => Math.abs(c.px - v) <= EPS)?.name ?? null;
};

const findings = [];
const table = [];
for (const row of census.rows) {
    const residue = row.px - row.declared;
    const isResidue = residue > EPS;
    // A zero-width band is no interval at all; it neither declares nor derives.
    const derivation = row.px <= EPS ? "0" : derive(row.px);
    const verdict = isResidue
        ? `RESIDUE ${residue.toFixed(2)}px undeclared`
        : derivation
          ? `ok · ${derivation}`
          : "NO SCALE DERIVATION";
    if (isResidue || (!isResidue && !derivation))
        findings.push({ ...row, residue: Number(residue.toFixed(2)), verdict });
    table.push({ ...row, verdict });
}

const widest = census.rows.reduce((a, b) => (b.px > a.px ? b : a), census.rows[0]);
const widestVerdict = table.find(
    (r) => r.edge === widest.edge && r.px === widest.px,
).verdict;

console.log("X.W6.g · gate g1 — PICKER HEADLINE CARD, VERTICAL INTERVAL CENSUS");
console.log(`origin ${ORIGIN}  cell ${CELL.width}×${CELL.height}  route ${ROUTE}`);
console.log("");
console.log("THE SCALE (read from the rendered document):");
for (const s of census.scale)
    console.log(`  ${s.kind.padEnd(5)} ${fmt(s.px)}px  ${s.name}`);
console.log("");
console.log("INTERVALS (px measured · px declared by a gap/margin · verdict):");
for (const r of table)
    console.log(
        `  ${fmt(r.px)} ${fmt(r.declared)}  ${r.declaredBy.padEnd(14)} ${r.where.padEnd(9)} ${r.edge}\n${" ".repeat(20)}→ ${r.verdict}`,
    );
console.log("");
console.log(`LARGEST INTERVAL: ${widest.px}px — ${widest.edge}`);
console.log(`                  → ${widestVerdict}`);
console.log("");
console.log("ROW INFLATION (box height · painted height · inflation · verdict):");
for (const r of census.inflation) {
    const d = r.inflation <= EPS ? "0" : derive(r.inflation);
    const verdict = d
        ? `ok · ${d}`
        : "INFLATED BY A QUANTITY THAT IS NOT A SPACING STEP";
    if (!d)
        findings.push({
            px: r.inflation,
            edge: `${r.row} box height − painted height`,
            verdict,
        });
    console.log(
        `  ${fmt(r.boxHeight)} ${fmt(r.paintedHeight)} ${fmt(r.inflation)}  ${r.row}\n${" ".repeat(20)}→ ${verdict}`,
    );
}
console.log("");

if (findings.length === 0) {
    console.log(
        "GATE g1 — GREEN: every vertical interval is declared and resolves to a scale step.",
    );
    process.exit(0);
}
console.log(`GATE g1 — RED: ${findings.length} interval(s) fail.`);
for (const f of findings) console.log(`  · ${f.px}px  ${f.edge}\n      ${f.verdict}`);
process.exit(1);
