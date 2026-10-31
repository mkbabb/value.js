// SERVED MODEL: claude-opus-5-5 — X.W11.ink (COHESION §0gw.4): the certify
// walk's cost and result, before and after the cut, on the SAME questions the
// boot writer's settle task asks (`useContrastSafeColor.ts:447-556`): per
// scheme and resting-ground lightness, the plate/muted pair, the destructive
// ink, the gold word + glyph rungs (`certifyIdentityInk`), and the live pick
// certified on the ground (`certifyAccentInk`). Every ground is distinct, so
// the certify memo never answers (a cold walk per question, as at a settle).
// argv: <out.json>. Run: npx vite-node <this file> <out.json>
import fs from "node:fs";
import {
    GRAPHICS_CONTRAST_FLOOR,
    certifyAccentInk,
    certifyIdentityInk,
    resolveMutedInk,
    resolvePlateInk,
} from "../../../../../../../../demo/color-session/ink";

const OUT = process.argv[2]!;
const GOLD = "#D4AF37";
const DESTRUCTIVE = "hsl(0 72% 50%)";
const PICKS = [
    "oklch(0.62 0.16 240)", "oklch(0.7 0.19 28)", "oklch(0.55 0.2 145)",
    "oklch(0.8 0.12 95)", "oklch(0.45 0.22 300)", "oklch(0.66 0.16 28)",
];
const outputs: string[] = [];
const time = { settle: 0, picks: 0 };
for (const dark of [false, true]) {
    for (let i = 0; i <= 900; i++) {
        const L = 0.05 + i * 0.001;
        let t = performance.now();
        const plate = resolvePlateInk(L, dark);
        const muted = resolveMutedInk(L, dark);
        const destructive = certifyAccentInk(DESTRUCTIVE, L);
        const gold = certifyIdentityInk(GOLD, L, dark);
        const glyph = gold !== plate ? gold : certifyIdentityInk(GOLD, L, dark, GRAPHICS_CONTRAST_FLOOR);
        time.settle += performance.now() - t;
        t = performance.now();
        const picks = PICKS.map((css) => certifyAccentInk(css, L));
        time.picks += performance.now() - t;
        outputs.push([dark ? "d" : "l", L.toFixed(3), plate, muted, destructive, gold, glyph, ...picks].join(" | "));
    }
}
const questions = 2 * 901;
fs.writeFileSync(OUT, JSON.stringify({
    questions,
    settleMsTotal: +time.settle.toFixed(1),
    settleMsPerGround: +(time.settle / questions).toFixed(3),
    picksMsTotal: +time.picks.toFixed(1),
    picksMsPerGround: +(time.picks / questions).toFixed(3),
    outputs,
}, null, 1));
console.log(JSON.stringify({ questions, settleMsTotal: +time.settle.toFixed(1), settleMsPerGround: +(time.settle / questions).toFixed(3), picksMsTotal: +time.picks.toFixed(1), picksMsPerGround: +(time.picks / questions).toFixed(3) }));
