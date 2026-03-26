/**
 * One-time migration: backfill oklabColors for all existing palettes.
 * Run with: npx tsx src/migrate-oklab.ts
 */
import "dotenv/config";
import { MongoClient } from "mongodb";

function cssToOklab(css: string): { L: number; a: number; b: number } | null {
    let r = 0, g = 0, b = 0;
    const s = css.trim().toLowerCase();
    const hexMatch = s.match(/^#([0-9a-f]{3,8})$/);
    if (hexMatch) {
        const h = hexMatch[1];
        if (h.length === 3) {
            r = parseInt(h[0] + h[0], 16) / 255;
            g = parseInt(h[1] + h[1], 16) / 255;
            b = parseInt(h[2] + h[2], 16) / 255;
        } else if (h.length >= 6) {
            r = parseInt(h.slice(0, 2), 16) / 255;
            g = parseInt(h.slice(2, 4), 16) / 255;
            b = parseInt(h.slice(4, 6), 16) / 255;
        } else {
            return null;
        }
    } else {
        const rgbMatch = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (rgbMatch) {
            r = parseInt(rgbMatch[1]) / 255;
            g = parseInt(rgbMatch[2]) / 255;
            b = parseInt(rgbMatch[3]) / 255;
        } else {
            return null;
        }
    }
    const linearize = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const lr = linearize(r), lg = linearize(g), lb = linearize(b);
    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    };
}

async function main() {
    const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/palette-db";
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();

    const palettes = await db.collection("palettes").find({
        $or: [
            { oklabColors: { $exists: false } },
            { oklabColors: { $size: 0 } },
        ],
    }).toArray();

    console.log(`Found ${palettes.length} palettes to backfill`);

    let updated = 0;
    for (const palette of palettes) {
        const oklabColors: { L: number; a: number; b: number }[] = [];
        for (const c of palette.colors ?? []) {
            const lab = cssToOklab(c.css);
            if (lab) oklabColors.push(lab);
        }

        await db.collection("palettes").updateOne(
            { _id: palette._id },
            { $set: { oklabColors } },
        );
        updated++;
    }

    console.log(`Updated ${updated} palettes with OKLab values`);
    await client.close();
}

main().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
