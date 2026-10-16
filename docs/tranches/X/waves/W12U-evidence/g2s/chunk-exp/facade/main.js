import { pc } from "../lib/facade.js"; console.log(pc("red")); document.onclick = () => import("./lazy.js").then((m) => m.run());
