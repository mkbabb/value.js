import { parseCssValue, coerceToSyntax } from "../../../src/css/index";
const forms = ['"a"', "'a'", "*", "[a]", "a", "foo-bar", "\\31 a", "--x", "initial", "default", "DEFAULT", "a b", "/", "+", ",", "url(a)", "-", "1a", "U+26", "\\+a", "#a", "@a", "a()", "%", "é"];
for (const f of forms) {
  const v = parseCssValue(f);
  const c = coerceToSyntax(f, "<custom-ident>");
  console.log(JSON.stringify(f), "|", JSON.stringify(v).slice(0, 160), "|", c.ok);
}
for (const f of ["red", "transparent", " a ", "/**/a", "Red"]) console.log(JSON.stringify(f), JSON.stringify(parseCssValue(f)).slice(0, 220), coerceToSyntax(f, "<custom-ident>").ok);
