// CHALLENGE-C (2nd audit) probe C2-01 — is the @supports condition the RIGHT
// feature test for what PaneHeader.vue:177 actually uses?
//
// PaneHeader gates on   @supports (animation-timeline: scroll())      [ANONYMOUS timeline]
// PaneHeader then uses  scroll-timeline: --pane-scroll block          [NAMED timeline]
//                       animation-timeline: --pane-scroll
// Those are two different features in the CSS scroll-driven-animations spec.
import { webkit, chromium, firefox } from "playwright";

const TESTS = [
    ["animation-timeline", "scroll()"], // the gate PaneHeader writes
    ["animation-timeline", "--pane-scroll"], // what PaneHeader actually needs
    ["scroll-timeline", "--pane-scroll block"], // the producer of the name
    ["scroll-timeline-name", "--pane-scroll"],
    ["timeline-scope", "--pane-scroll"], // the property :50-53 claims contain does
    ["animation-range", "0px 64px"],
];

for (const [name, eng] of [
    ["webkit", webkit],
    ["chromium", chromium],
    ["firefox", firefox],
]) {
    const b = await eng.launch();
    const p = await b.newPage();
    const out = await p.evaluate(
        (tests) => tests.map(([k, v]) => [`${k}: ${v}`, CSS.supports(k, v)]),
        TESTS,
    );
    console.log(`\n===== ${name} =====`);
    for (const [k, v] of out) console.log(`  ${String(k).padEnd(40)} ${v}`);

    // Does a NAMED timeline actually scrub in this engine?
    await p.setContent(`<style>
      .host { height:100px; overflow-y:auto; scroll-timeline: --t block; }
      .spacer { height:1000px; }
      .hdr { position:sticky; top:0; }
      @supports (animation-timeline: scroll()) {
        .hdr { animation: k linear both; animation-timeline: --t; animation-range: 0px 100px; }
      }
      @keyframes k { from { opacity: 1 } to { opacity: 0 } }
    </style>
    <div class="host" id="h"><div class="hdr" id="d">T</div><div class="spacer"></div></div>`);
    const scrub = await p.evaluate(async () => {
        const h = document.getElementById("h");
        const d = document.getElementById("d");
        const rest = getComputedStyle(d).opacity;
        h.scrollTop = 100;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        return { rest, stuck: getComputedStyle(d).opacity };
    });
    console.log(
        `  gate passes? ${out[0][1]}   named-timeline actually scrubs? rest=${scrub.rest} stuck=${scrub.stuck}`,
    );
    await b.close();
}
