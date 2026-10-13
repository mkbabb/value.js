// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 Repair 1 (ESC-W8lg1-1): the hex colour reading (css-color-4 §5.2). `hexColor`
// (`src/css/bbnf/color.ts`) reads the digits once as one integer; this pins it against an
// independent per-digit reference over EVERY 3- and 4-digit form and a seeded sample of the
// 6- and 8-digit forms, in both letter cases. `#rgb` = `#rrggbb`, `#rgba` = `#rrggbbaa`,
// alpha = byte / 255, an absent alpha is 1.

import { describe, expect, it } from "vitest";

import { parseCssColor } from "../../src/css/index";

const DIGITS = "0123456789abcdef";

/** The reference: each channel from its own digit pair (a short form doubles each digit). */
function reference(digits: string): readonly [number, number, number, number] {
    const short = digits.length <= 4;
    const pair = (i: number): number => {
        const text = short ? digits.charAt(i) + digits.charAt(i) : digits.slice(2 * i, 2 * i + 2);
        return DIGITS.indexOf(text.charAt(0).toLowerCase()) * 16 + DIGITS.indexOf(text.charAt(1).toLowerCase());
    };
    const hasAlpha = digits.length === 4 || digits.length === 8;
    return [pair(0), pair(1), pair(2), hasAlpha ? pair(3) / 255 : 1];
}

/** The count of forms the product reads differently from the reference (0 = the reading holds). */
function mismatches(forms: Iterable<string>): { read: number; wrong: string[] } {
    let read = 0;
    const wrong: string[] = [];
    for (const digits of forms) {
        read++;
        const parsed = parseCssColor(`#${digits}`);
        const [r, g, b, a] = reference(digits);
        const same = parsed.ok && parsed.value.space === "rgb"
            && parsed.value.channels[0] === r && parsed.value.channels[1] === g && parsed.value.channels[2] === b
            && parsed.value.alpha === a;
        if (!same && wrong.length < 5) wrong.push(digits);
    }
    return { read, wrong };
}

function* every(length: number): Generator<string> {
    const total = 16 ** length;
    for (let v = 0; v < total; v++) {
        const lower = v.toString(16).padStart(length, "0");
        yield v % 3 === 0 ? lower.toUpperCase() : lower;
    }
}

function* sampled(length: number, count: number): Generator<string> {
    let state = 0x9e3779b9 ^ length;
    const next = (): number => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return state >>> 0; };
    for (let i = 0; i < count; i++) {
        let text = "";
        for (let d = 0; d < length; d++) {
            const digit = DIGITS.charAt(next() % 16);
            text += next() % 2 === 0 ? digit.toUpperCase() : digit;
        }
        yield text;
    }
}

describe("hex colours (css-color-4 §5.2)", () => {
    it("reads every #rgb form", () => {
        expect(mismatches(every(3))).toEqual({ read: 4096, wrong: [] });
    });

    it("reads every #rgba form", () => {
        expect(mismatches(every(4))).toEqual({ read: 65536, wrong: [] });
    });

    it("reads #rrggbb forms", () => {
        expect(mismatches(sampled(6, 20000))).toEqual({ read: 20000, wrong: [] });
        expect(mismatches(["000000", "ffffff", "FFFFFF", "ff0099", "0000ff", "ff0000", "00ff00", "800000"]).wrong).toEqual([]);
    });

    it("reads #rrggbbaa forms, the high byte included", () => {
        expect(mismatches(sampled(8, 20000))).toEqual({ read: 20000, wrong: [] });
        expect(mismatches(["00000000", "ffffffff", "FFFFFFFF", "80000000", "ff000000", "7fffffff", "000000ff", "ff0099cc"]).wrong).toEqual([]);
    });

    it("reads a named colour and `transparent` through the same hex reading", () => {
        expect(parseCssColor("rebeccapurple")).toMatchObject({ ok: true, value: { space: "rgb", channels: [102, 51, 153], alpha: 1 } });
        expect(parseCssColor("transparent")).toMatchObject({ ok: true, value: { space: "rgb", channels: [0, 0, 0], alpha: 0 } });
    });

    it("refuses a digit count the grammar does not admit", () => {
        for (const digits of ["", "1", "12", "12345", "1234567", "123456789", "12g"]) {
            expect(parseCssColor(`#${digits}`).ok, digits).toBe(false);
        }
    });
});
