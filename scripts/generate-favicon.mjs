#!/usr/bin/env node
/**
 * Generates a high-quality watercolor-blob favicon SVG.
 *
 * Uses the same seeded-PRNG approach as useWatercolorBlob.ts so the shape
 * is deterministic from the color string.  Outputs both an SVG file and
 * updates index.html to reference it.
 *
 * Usage:  node scripts/generate-favicon.mjs [css-color]
 *         Default color: lab(92% 88.8 20)   (the "lavendi" pink)
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMO_DIR = resolve(__dirname, "../demo/color-picker");

// ── Seeded PRNG (mulberry32) ──────────────────────────────────────────
function mulberry32(seed) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash >>> 0;
}

// ── Blob path generation via cubic Bézier ─────────────────────────────
function generateBlobPath(rng, cx, cy, baseRadius, variance, points = 8) {
    const angles = [];
    for (let i = 0; i < points; i++) {
        angles.push((Math.PI * 2 * i) / points);
    }

    // Random radii per control point
    const radii = angles.map(
        () => baseRadius + (rng() * 2 - 1) * variance,
    );

    // Convert to cartesian
    const pts = angles.map((a, i) => ({
        x: cx + Math.cos(a) * radii[i],
        y: cy + Math.sin(a) * radii[i],
    }));

    // Build a smooth closed path using cubic Bézier through the points
    // Catmull-Rom → cubic Bézier conversion for smooth organic curves
    const n = pts.length;
    let d = "";

    for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % n];
        const p3 = pts[(i + 2) % n];

        // Catmull-Rom tangents (tension 0 = uniform)
        const t = 0.4; // slight tightness for organic feel
        const cp1x = p1.x + (p2.x - p0.x) * t;
        const cp1y = p1.y + (p2.y - p0.y) * t;
        const cp2x = p2.x - (p3.x - p1.x) * t;
        const cp2y = p2.y - (p3.y - p1.y) * t;

        if (i === 0) {
            d += `M${p1.x.toFixed(2)},${p1.y.toFixed(2)} `;
        }
        d += `C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)} `;
    }
    d += "Z";
    return d;
}

// ── Main ──────────────────────────────────────────────────────────────
const color = process.argv[2] || "lab(92% 88.8 20)";
// For the SVG fill we need a browser-renderable color.
// lab() is supported in modern browsers but for max compat in favicons
// we use the sRGB fallback: #FFB5C8 (approximate of lab(92% 88.8 20))
const fillColor = process.argv[3] || "#FFB5C8";

const seed = hashString(color);
const rng = mulberry32(seed);

const size = 64;
const cx = size / 2;
const cy = size / 2;
const baseRadius = size * 0.38;
const variance = size * 0.08;

const mainPath = generateBlobPath(rng, cx, cy, baseRadius, variance, 10);

// Slight inner highlight blob (smaller, offset up-left, white at low opacity)
const hlPath = generateBlobPath(rng, cx - 3, cy - 4, baseRadius * 0.55, variance * 0.6, 8);

// Subtle dark edge blob for depth
const shadowPath = generateBlobPath(rng, cx + 1, cy + 2, baseRadius * 0.95, variance * 0.9, 10);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <filter id="wc" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5"/>
    </filter>
    <radialGradient id="hl" cx="38%" cy="35%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sh" cx="55%" cy="60%" r="55%">
      <stop offset="0%" stop-color="black" stop-opacity="0"/>
      <stop offset="85%" stop-color="black" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.15"/>
    </radialGradient>
  </defs>
  <g filter="url(#wc)">
    <!-- Shadow layer -->
    <path d="${shadowPath}" fill="black" opacity="0.06"/>
    <!-- Main blob -->
    <path d="${mainPath}" fill="${fillColor}"/>
    <!-- Depth gradient -->
    <path d="${mainPath}" fill="url(#sh)"/>
    <!-- Highlight -->
    <path d="${hlPath}" fill="url(#hl)"/>
  </g>
</svg>`;

const outPath = resolve(DEMO_DIR, "favicon.svg");
writeFileSync(outPath, svg, "utf-8");
console.log(`Wrote ${outPath}`);
console.log(`  Color: ${color}`);
console.log(`  Fill:  ${fillColor}`);
console.log(`  Seed:  ${seed}`);
