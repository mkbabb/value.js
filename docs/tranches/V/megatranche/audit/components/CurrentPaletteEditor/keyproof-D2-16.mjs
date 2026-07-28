// Replays useSwatchActions.ts:42-58 exactly.
let counter = 0;
const map = new Map();
function keysFor(list) {
  return list.map((color, i) => {
    const k = `${color}::${i}`;
    if (!map.has(k)) map.set(k, counter++);
    return map.get(k);
  });
}
function prune(list) {
  const valid = new Set(list.map((c, i) => `${c}::${i}`));
  for (const k of [...map.keys()]) if (!valid.has(k)) map.delete(k);
}
const A = ["red", "green", "blue", "gold"];
console.log("initial      ", A.join(","), "→ keys", keysFor(A));
const B = ["red", "blue", "gold"];            // remove index 1 (the only authored removal)
prune(B);
console.log("remove idx1  ", B.join(","), "→ keys", keysFor(B), "  (survivors red/blue/gold)");
const C = ["red", "blue", "gold", "red"];      // addCurrentColor reorder path
prune(C);
console.log("reorder/dup  ", C.join(","), "→ keys", keysFor(C));
