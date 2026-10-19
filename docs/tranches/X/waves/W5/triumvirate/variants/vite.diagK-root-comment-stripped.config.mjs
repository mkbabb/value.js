import { readFileSync } from "node:fs";
import base from "/Users/mkbabb/Programming/value.js/vite.config.ts";
const TARGET = "/Users/mkbabb/Programming/value.js/demo/shell/PaneSlot.vue";
const PICKER = "/Users/mkbabb/Programming/value.js/demo/picker/ColorPicker.vue";
const NEEDLE = '<Transition\n        :name="transitionName"';
const ROOT_COMMENT = /^<template>\n\s*<!--[\s\S]*?-->\n/;
const inject = { name: "w5t-diag-K", enforce: "pre", load(id) {
    if (id.includes("?")) return null;
    if (id === PICKER) { const c = readFileSync(id, "utf8"); if (!ROOT_COMMENT.test(c)) throw new Error("root comment needle drift"); const out = c.replace(ROOT_COMMENT, "<template>\n"); console.log("[w5t-K] stripped", c.length - out.length, "bytes of root-level comment from ColorPicker.vue"); return { code: out, map: null }; }
    if (id !== TARGET) return null;
    const code = readFileSync(id, "utf8"); if (code.split(NEEDLE).length !== 2) throw new Error("needle drift");
    return { code: code.replace(NEEDLE, '<Transition\n        mode="out-in"\n        :name="transitionName"'), map: null }; } };
export default (env) => { const c = typeof base === "function" ? base(env) : base; return { ...c, plugins: [inject, ...(c.plugins ?? [])] }; };
