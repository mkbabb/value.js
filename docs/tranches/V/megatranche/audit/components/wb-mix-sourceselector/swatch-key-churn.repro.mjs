// Verbatim transcription of MixSourceSelector.vue:79-98 (swatchKeys + prune watch).
let swatchKeyCounter = 0;
const swatchKeyMap = new Map();
const swatchKeys = (selectedColors) =>
    selectedColors.map((sc, i) => {
        const mapKey = `${sc.css}::${i}`;
        if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
        return swatchKeyMap.get(mapKey);
    });
const prune = (selectedColors) => {           // the watch body (flush 'pre' -> runs BEFORE render)
    const valid = new Set(selectedColors.map((sc, i) => `${sc.css}::${i}`));
    for (const k of swatchKeyMap.keys()) if (!valid.has(k)) swatchKeyMap.delete(k);
};
const C = (css) => ({ css, source: "picker" });

let sel = [C("red"), C("green"), C("blue")];
console.log("render 1  [red,green,blue]      keys =", swatchKeys(sel));
sel = sel.filter((_, i) => i !== 0);          // useMixingState.removeColor(0)
prune(sel);
console.log("render 2  [green,blue]          keys =", swatchKeys(sel), "  <- green/blue DID NOT CHANGE");
sel = [...sel, C("gold")];                    // addColor
prune(sel);
console.log("render 3  [green,blue,gold]     keys =", swatchKeys(sel));
sel = sel.filter((_, i) => i !== 1);          // removeColor(1) -> drop blue
prune(sel);
console.log("render 4  [green,gold]          keys =", swatchKeys(sel), "  <- green STILL unchanged");
console.log("counter   =", swatchKeyCounter, " (index-only keying would have used 0..2 forever)");
