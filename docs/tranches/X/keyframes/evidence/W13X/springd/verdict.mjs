// SERVED MODEL: claude-opus-5-5 — KF.W13X.springd · the committed served falsifier: per-row verdicts over a springd.mjs run.
// Usage: node verdict.mjs before-r1.json
import fs from "node:fs";
const rows = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const PHONE = new Set(["360x780", "390x844", "430x932", "844x390", "768x1024", "1024x768"]);
const out = {}; const fail = (id, why) => { (out[id] ??= []).push(why); };
const ok = (id) => { out[id] ??= []; };
for (const r of rows) {
  const tag = `${r.vp}/${r.theme}`;
  for (const st of ["visible", "dismissed"]) { const v = r[st]; if (!v || v.err) { fail("RUN", `${tag} ${st} ${v?.err ?? "missing"}`); continue; }
    // UIA-KF-037 + A2-KE-X-8: nothing overlaps, nothing clipped, the caption is reachable, the meta column <= 2 lines (every width).
    ok("UIA-KF-037"); ok("A2-KE-X-8");
    if (v.overlaps.length) (PHONE.has(r.vp) ? ["UIA-KF-037", "A2-KE-X-8"] : ["UIA-KF-037"]).forEach((id) => fail(id, `${tag} ${st} overlaps ${v.overlaps.join(",")}`));
    if (v.clipped.length) fail("UIA-KF-037", `${tag} ${st} clipped ${v.clipped.join(",")}`);
    if (v.reach && !v.reach.clears) fail("UIA-KF-037", `${tag} ${st} caption b ${v.reach.footerB} > floor ${v.reach.floor}`);
    if (v.metaLines > 2) fail("A2-KE-X-8", `${tag} ${st} meta ${v.metaLines} lines`);
    // KFA-158: the stage is never shorter than the card.
    ok("KFA-158"); if (st === "visible" && v.boxes.card && v.boxes.card.h > v.stageH + 0.5) fail("KFA-158", `${tag} card ${v.boxes.card.h} > stage ${v.stageH}`);
    // UIA-KF-208: dismissed, the stage marks the slot.
    ok("UIA-KF-208"); if (st === "dismissed" && v.slotMarks < 1) fail("UIA-KF-208", `${tag} dismissed stage has ${v.slotMarks} marks`);
    // UIA-KF-209: the demo card on the card role (16px at glass 10.1.0).
    ok("UIA-KF-209"); if (st === "visible" && v.radii.card !== "16px") fail("UIA-KF-209", `${tag} card radius ${v.radii.card}`);
    // UIA-KF-097: no transport skin on the verb, intrinsic width (< 200px), no second emitter name or disclaimer, artifact folded at rest.
    ok("UIA-KF-097"); if (st === "visible") {
      if (v.toggleSkin) fail("UIA-KF-097", `${tag} verb wears btn-playback`);
      if (v.boxes.toggle && v.boxes.toggle.w >= 200) fail("UIA-KF-097", `${tag} verb ${v.boxes.toggle.w}px wide`);
      const bad = v.metaStrings.filter((s) => s === "emitted by" || s === "response is not expressed"); if (bad.length) fail("UIA-KF-097", `${tag} meta ${bad.join("|")}`);
      if (v.boxes.artifact && v.boxes.artifact.h > 0) fail("UIA-KF-097", `${tag} artifact open at rest (${v.boxes.artifact.h}px)`); } }
  if (r.exit && r.entry) { const durS = (t) => { const m = /opacity ([\d.]+)(m?s)/.exec(t); return m ? (m[2] === "ms" ? +m[1] : +m[1] * 1000) : null; };
    const enterMs = durS(r.visible.transition); // the open rule's list = the entry
    // UIA-KF-096 + KFA-45: the entry moves across its whole duration; the exit's invisible tail is < 35% of it.
    ok("UIA-KF-096"); ok("KFA-45");
    if (r.entry.lastChange < 0.8 * enterMs) ["UIA-KF-096", "KFA-45"].forEach((id) => fail(id, `${tag} entry still after ${r.entry.lastChange}ms of ${enterMs}ms`));
    const tail = (r.exit.tDisplayNone - r.exit.tInvisible) / r.exit.tDisplayNone; if (tail >= 0.35) ["UIA-KF-096", "KFA-45"].forEach((id) => fail(id, `${tag} exit invisible tail ${(tail * 100).toFixed(0)}% (${r.exit.tInvisible}->${r.exit.tDisplayNone}ms)`));
    // KFA-215: the exit never overshoots past closed (scale below 0.9).
    ok("KFA-215"); if (r.exit.minScale < 0.8999) fail("KFA-215", `${tag} exit scale dips to ${r.exit.minScale}`); }
}
for (const [id, f] of Object.entries(out)) console.log(`${f.length ? "RED  " : "GREEN"} ${id}${f.length ? " — " + f.length + " — " + f.slice(0, 3).join(" ; ") : ""}`);
