// SERVED MODEL: claude-opus-5-5
// KFA-18 summary over probe-easing.json: per channel, the channel easing samples at u=.1/.25/.5/.75
// and how many compiled frames still carry the store default ease-in-out.
import fs from "node:fs";
const r = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const EIO = "0.0197,0.1292,0.5,0.8708"; // cubic-bezier(.42,0,.58,1) sampled — the audit's ease-in-out signature
const out = {};
for (const [n, a] of Object.entries(r)) {
  const fr = a.frames.map((f) => String(f.tf));
  out[n] = { channel: String(a.optTF), frames: fr.length, easeInOutFrames: fr.filter((x) => x === EIO).length, distinctFrameCurves: new Set(fr).size };
}
console.log(JSON.stringify(out));
