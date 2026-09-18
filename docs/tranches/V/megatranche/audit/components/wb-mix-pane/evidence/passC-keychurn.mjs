// Faithful transcription of MixSourceSelector.vue:79-98 swatchKeys + prune watcher.
let swatchKeyCounter = 0;
const swatchKeyMap = new Map();
const keys = (selectedColors) => selectedColors.map((sc, i) => {
    const mapKey = `${sc.css}::${i}`;
    if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
    return swatchKeyMap.get(mapKey);
});
const prune = (selectedColors) => {
    const valid = new Set(selectedColors.map((sc, i) => `${sc.css}::${i}`));
    for (const k of swatchKeyMap.keys()) if (!valid.has(k)) swatchKeyMap.delete(k);
};
let sel = [{css:"red"},{css:"blue"},{css:"lime"}];
console.log("initial      ", JSON.stringify(sel.map(s=>s.css)), "keys =", keys(sel));
// removeColor(0)  ->  useMixingState.removeColor filters index 0
sel = sel.filter((_, i) => i !== 0);
prune(sel);
console.log("after remove#0", JSON.stringify(sel.map(s=>s.css)), "keys =", keys(sel));
