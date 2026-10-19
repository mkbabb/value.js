import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { decodePng } from "../fixtures/frame-diff";
import type { DecodedImage } from "../fixtures/frame-diff";

/**
 * X-W6 · X.W6.i — gate **i1**, **X:ATMO-1** (the re-mint of DR-01's surviving
 * claim, carry 0 — `docs/tranches/X/waves/W6-atmosphere-tombstone.md` §4):
 * "for each of N seeds, the rendered atmosphere's NAMED ATOMS move by ≥ a
 * stated ΔE2000", measured from COMMITTED FRAMES.
 *
 * The falsifier is binding (`W6.md` i1): "i1 fails if the atoms do not move,
 * AND EQUALLY IF IT CAN BE PASSED BY AN AGENT'S DESCRIPTION rather than a frame
 * diff". So this oracle renders nothing and trusts nothing it is told: it reads
 * the PNG frames under `docs/tranches/X/waves/W6-evidence/atmosphere/`, and it
 * refuses any frame `git ls-files` does not track — an uncommitted frame, like
 * a sentence, is not evidence. The frames are written by that directory's
 * `capture-atmo1.mjs` (cold loads, 1440×900 chromium, settled 3 s; the seeds
 * share L and C and walk the hue circle, so whatever the atoms do, the seed
 * did) and force-added past `.gitignore *.png` in the wave's own commit.
 *
 * THE NAMED ATOMS are the four regions of the atmosphere no pane, dock or
 * control ever covers at 1440×900 — the field itself, at its four reachable
 * compass points:
 */
const ATOMS = [
    { name: "north-west field", x: 12, y: 96, w: 150, h: 120 },
    { name: "west field", x: 12, y: 380, w: 150, h: 200 },
    { name: "east field", x: 1278, y: 380, w: 150, h: 200 },
    { name: "south-east field", x: 1278, y: 770, w: 150, h: 120 },
] as const;
/** N = 4 seeds; the stated move: ΔE2000 ≥ 10 — five times the ~2 ΔE2000 a
 *  viewer can just tell apart, so a "move" is one nobody has to squint at. */
const SEEDS = ["h030", "h120", "h210", "h300"] as const;
const MIN_MOVE = 10;

const DIR = "docs/tranches/X/waves/W6-evidence/atmosphere";

/** Mean colour of a region → CIE Lab (D65), via linear sRGB → XYZ. */
function regionLab(
    img: DecodedImage,
    r: (typeof ATOMS)[number],
): [number, number, number] {
    let R = 0;
    let G = 0;
    let B = 0;
    for (let y = r.y; y < r.y + r.h; y++) {
        for (let x = r.x; x < r.x + r.w; x++) {
            const i = (y * img.width + x) * img.channels;
            R += img.data[i]!;
            G += img.data[i + 1]!;
            B += img.data[i + 2]!;
        }
    }
    const n = r.w * r.h;
    const lin = (c: number) => {
        const v = c / n / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    const [lr, lg, lb] = [lin(R), lin(G), lin(B)];
    const X = (0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb) / 0.95047;
    const Y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb;
    const Z = (0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb) / 1.08883;
    const f = (t: number) =>
        t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t + 16) / 116;
    return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}

/** CIEDE2000 (Sharma, Wu & Dalal 2005), kL = kC = kH = 1. */
function deltaE2000(a: [number, number, number], b: [number, number, number]): number {
    const [L1, a1, b1] = a;
    const [L2, a2, b2] = b;
    const rad = Math.PI / 180;
    const C1 = Math.hypot(a1, b1);
    const C2 = Math.hypot(a2, b2);
    const Cm = (C1 + C2) / 2;
    const G = 0.5 * (1 - Math.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)));
    const a1p = (1 + G) * a1;
    const a2p = (1 + G) * a2;
    const C1p = Math.hypot(a1p, b1);
    const C2p = Math.hypot(a2p, b2);
    const hp = (x: number, y: number) =>
        x === 0 && y === 0 ? 0 : (Math.atan2(y, x) / rad + 360) % 360;
    const h1p = hp(a1p, b1);
    const h2p = hp(a2p, b2);
    const dLp = L2 - L1;
    const dCp = C2p - C1p;
    let dhp = 0;
    if (C1p * C2p !== 0) {
        dhp = h2p - h1p;
        if (dhp > 180) dhp -= 360;
        else if (dhp < -180) dhp += 360;
    }
    const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * rad) / 2);
    const Lpm = (L1 + L2) / 2;
    const Cpm = (C1p + C2p) / 2;
    let hpm = h1p + h2p;
    if (C1p * C2p !== 0) {
        if (Math.abs(h1p - h2p) <= 180) hpm = (h1p + h2p) / 2;
        else hpm = h1p + h2p < 360 ? (h1p + h2p + 360) / 2 : (h1p + h2p - 360) / 2;
    }
    const T =
        1 -
        0.17 * Math.cos((hpm - 30) * rad) +
        0.24 * Math.cos(2 * hpm * rad) +
        0.32 * Math.cos((3 * hpm + 6) * rad) -
        0.2 * Math.cos((4 * hpm - 63) * rad);
    const dTheta = 30 * Math.exp(-(((hpm - 275) / 25) ** 2));
    const Rc = 2 * Math.sqrt(Cpm ** 7 / (Cpm ** 7 + 25 ** 7));
    const Sl = 1 + (0.015 * (Lpm - 50) ** 2) / Math.sqrt(20 + (Lpm - 50) ** 2);
    const Sc = 1 + 0.045 * Cpm;
    const Sh = 1 + 0.015 * Cpm * T;
    const Rt = -Math.sin(2 * dTheta * rad) * Rc;
    return Math.sqrt(
        (dLp / Sl) ** 2 +
            (dCp / Sc) ** 2 +
            (dHp / Sh) ** 2 +
            Rt * (dCp / Sc) * (dHp / Sh),
    );
}

test("X:ATMO-1 — the named atoms move with the seed, read from committed frames", () => {
    // The implementation reads a published reference pair before it reads a
    // frame: Sharma et al.'s test data, pair 1 → 2.0425.
    expect(deltaE2000([50, 2.6772, -79.7751], [50, 0, -82.7485])).toBeCloseTo(
        2.0425,
        3,
    );

    // COMMITTED means in HEAD's tree AND byte-identical to it: a staged frame
    // or a frame edited after its commit is not the record.
    const git = (...args: string[]) =>
        execFileSync("git", args, { encoding: "utf8" }).trim();
    const committed = git("ls-tree", "-r", "--name-only", "HEAD", DIR).split("\n");
    const frame = (name: string) => {
        const rel = `${DIR}/atmo1-${name}.png`;
        expect(committed, `${rel} is not a COMMITTED frame`).toContain(rel);
        expect(git("hash-object", rel), `${rel} differs from its committed bytes`).toBe(
            git("rev-parse", `HEAD:${rel}`),
        );
        return decodePng(readFileSync(join(process.cwd(), rel)));
    };

    const ref = frame("ref");
    const labs = SEEDS.map((s) => ATOMS.map((a) => regionLab(frame(s), a)));
    const refLab = ATOMS.map((a) => regionLab(ref, a));

    SEEDS.forEach((seed, i) => {
        const next = SEEDS[(i + 1) % SEEDS.length]!;
        ATOMS.forEach((atom, k) => {
            const fromRef = deltaE2000(refLab[k]!, labs[i]![k]!);
            const toNext = deltaE2000(labs[i]![k]!, labs[(i + 1) % SEEDS.length]![k]!);
            console.log(
                `${seed} · ${atom.name}: ΔE2000 vs unseeded ${fromRef.toFixed(2)} · vs ${next} ${toNext.toFixed(2)}`,
            );
            expect
                .soft(
                    fromRef,
                    `${seed} · ${atom.name} does not move off the unseeded atmosphere`,
                )
                .toBeGreaterThanOrEqual(MIN_MOVE);
            expect
                .soft(
                    toNext,
                    `${seed} → ${next} · ${atom.name} does not move with the seed`,
                )
                .toBeGreaterThanOrEqual(MIN_MOVE);
        });
    });
});
