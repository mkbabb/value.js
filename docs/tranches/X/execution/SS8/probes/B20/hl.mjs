// L-5 re-run (the record's own method): hljs core + css language, bundled and minified.
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);
export default hljs;
