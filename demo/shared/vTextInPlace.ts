import type { Directive, VNode } from "vue";

/**
 * `v-text-in-place` — an element whose one child is an interpolation, updated
 * by rewriting its text node rather than replacing it (o1110 D2).
 *
 * Vue updates such an element with `el.textContent = text`, which removes the
 * text node and inserts a new one. On a readout that ticks every colour frame,
 * each insertion invalidated every `:has()` rule on the path to the root and
 * re-laid the text out from scratch: about half of a 4×-CPU spectrum drag's
 * layout. Before the patch, the hook writes the new text into the existing
 * node and tells Vue the text is already current. When the element no longer
 * holds exactly one text node (an edit in a contenteditable readout can split
 * it), the hook stands aside and Vue's replacement runs as before.
 */
export const vTextInPlace: Directive<HTMLElement> = {
    beforeUpdate(el, _binding, vnode: VNode, prev: VNode) {
        const text = vnode.children;
        if (typeof text !== "string" || text === prev.children || text === "") return;
        const node = el.firstChild;
        if (!node || node.nodeType !== Node.TEXT_NODE || node.nextSibling) return;
        (node as Text).data = text;
        prev.children = text;
    },
};
