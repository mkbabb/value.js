import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { mirror } from "./lib.mjs";

const require = createRequire(`${mirror}/package.json`);
const ts = require("typescript");
const fail = (message) => { throw new Error(`AST_POLICY: ${message}`); };

const importsBySeat = Object.freeze({
    h: ["regex"],
    b: ["Parser", "all", "any", "regex"],
    s: ["Parser", "regex"],
    d: ["dispatch", "regex"],
});

const allowedKinds = new Set([
    ts.SyntaxKind.SourceFile, ts.SyntaxKind.EndOfFileToken,
    ts.SyntaxKind.ImportDeclaration, ts.SyntaxKind.ImportClause,
    ts.SyntaxKind.NamedImports, ts.SyntaxKind.ImportSpecifier,
    ts.SyntaxKind.StringLiteral, ts.SyntaxKind.RegularExpressionLiteral,
    ts.SyntaxKind.VariableStatement, ts.SyntaxKind.VariableDeclarationList,
    ts.SyntaxKind.VariableDeclaration, ts.SyntaxKind.ExportKeyword,
    ts.SyntaxKind.Identifier, ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.EqualsGreaterThanToken, ts.SyntaxKind.Parameter,
    ts.SyntaxKind.TypeParameter, ts.SyntaxKind.TypeReference,
    ts.SyntaxKind.StringKeyword, ts.SyntaxKind.UnionType,
    ts.SyntaxKind.UndefinedKeyword, ts.SyntaxKind.Block,
    ts.SyntaxKind.ReturnStatement, ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.ExpressionStatement, ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.NewExpression, ts.SyntaxKind.PropertyAccessExpression,
    ts.SyntaxKind.ObjectLiteralExpression, ts.SyntaxKind.PropertyAssignment,
    ts.SyntaxKind.ConditionalExpression, ts.SyntaxKind.QuestionToken,
    ts.SyntaxKind.ColonToken, ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.BarBarToken, ts.SyntaxKind.EqualsEqualsEqualsToken,
    ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.EqualsToken,
    ts.SyntaxKind.AsExpression, ts.SyntaxKind.NullKeyword,
    ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.ArrayBindingPattern,
    ts.SyntaxKind.BindingElement, ts.SyntaxKind.TemplateExpression,
    ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateSpan,
    ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail,
    ts.SyntaxKind.ParenthesizedExpression,
]);

const allowedProperties = new Set([
    "call", "freeze", "includes", "isError", "map", "opt",
    "restore", "save", "startsWith", "test", "then",
]);
const directCallees = new Set(["Number", "regex", "all", "any", "dispatch"]);
const resultKeys = new Set(["sign", "type", "value"]);
const dispatchKeys = new Set(["+-", ".", "0-9"]);
const whole = "/[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/";
const regexSets = Object.freeze({
    h: [whole],
    b: ["/[+-]/", "/[0-9]+/", "/\\.[0-9]+/", "/\\.[0-9]+/", "/[eE][+-]?[0-9]+/"],
    s: ["/[+-]/", "/[0-9]+|\\.[0-9]+/", "/\\.[0-9]+/", "/[eE][+-]?[0-9]+/"],
    d: [
        "/[0-9]+(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/",
        "/\\.[0-9]+(?:[eE][+-]?[0-9]+)?/",
        "/[+-](?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:[eE][+-]?[0-9]+)?/",
    ],
});

const unwrap = (node) => {
    while (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) node = node.expression;
    return node;
};
const identifier = (node, text) => ts.isIdentifier(node) && (text === undefined || node.text === text);
const property = (node, base, name) => ts.isPropertyAccessExpression(node) && identifier(node.expression, base) && node.name.text === name;
const propertyCall = (node, base, name, args) => ts.isCallExpression(node)
    && property(node.expression, base, name)
    && (args === undefined || node.arguments.length === args);
const directCall = (node, name) => ts.isCallExpression(node) && identifier(node.expression, name);

function declarationNames(name, output) {
    if (ts.isIdentifier(name)) output.add(name.text);
    else if (ts.isArrayBindingPattern(name)) for (const element of name.elements) {
        if (!ts.isBindingElement(element)) fail("array binding may contain only binding elements");
        declarationNames(element.name, output);
    } else fail(`unrecognized declaration name ${ts.SyntaxKind[name.kind]}`);
}

function inspectImport(sourceFile, seat) {
    const declarations = sourceFile.statements.filter(ts.isImportDeclaration);
    if (declarations.length !== 1) fail("exactly one import declaration is required");
    const declaration = declarations[0];
    if (!ts.isStringLiteral(declaration.moduleSpecifier) || declaration.moduleSpecifier.text !== "@mkbabb/parse-that/core") fail("only exact @mkbabb/parse-that/core may be imported");
    const clause = declaration.importClause;
    if (!clause || clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) fail("only a named core import is permitted");
    const names = clause.namedBindings.elements.map((element) => {
        if (element.propertyName) fail("import aliases are forbidden");
        return element.name.text;
    }).sort();
    const expected = [...importsBySeat[seat]].sort();
    if (JSON.stringify(names) !== JSON.stringify(expected)) fail(`${seat}: exact core imports must be ${expected.join(",")}`);
    return new Set(names);
}

function inspectDeclarations(sourceFile, imported) {
    const declared = new Set(imported);
    const top = new Map();
    for (const statement of sourceFile.statements) {
        if (ts.isImportDeclaration(statement)) continue;
        if (!ts.isVariableStatement(statement)) fail(`unrecognized top-level ${ts.SyntaxKind[statement.kind]}`);
        if ((statement.declarationList.flags & ts.NodeFlags.Const) === 0) fail("only const declarations are permitted");
        if (statement.declarationList.declarations.length !== 1) fail("one declaration per const statement is required");
        const declaration = statement.declarationList.declarations[0];
        if (!identifier(declaration.name) || !declaration.initializer) fail("top-level declarations require one initialized identifier");
        if (top.has(declaration.name.text)) fail(`duplicate declaration ${declaration.name.text}`);
        top.set(declaration.name.text, declaration.initializer);
        declared.add(declaration.name.text);
        const exported = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
        if (exported !== (declaration.name.text === "consumeNumber")) fail("consumeNumber must be the sole export");
    }
    if (!top.has("consumeNumber")) fail("consumeNumber export is required");
    return { declared, top };
}

function isDeclarationIdentifier(node) {
    const parent = node.parent;
    return (ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isTypeParameterDeclaration(parent) || ts.isBindingElement(parent)) && parent.name === node;
}
function isNonReferenceName(node) {
    const parent = node.parent;
    return isDeclarationIdentifier(node)
        || (ts.isPropertyAccessExpression(parent) && parent.name === node)
        || (ts.isPropertyAssignment(parent) && parent.name === node)
        || ts.isImportSpecifier(parent)
        || (ts.isImportClause(parent) && parent.name === node);
}

function inspectClosedWorld(sourceFile, declared) {
    const local = new Set(declared);
    const calls = [];
    const newExpressions = [];
    const regexCalls = [];
    const properties = [];
    const visit = (node) => {
        if (!allowedKinds.has(node.kind)) fail(`unrecognized syntax ${ts.SyntaxKind[node.kind]}`);
        if (ts.isElementAccessExpression(node)) fail("computed element access is forbidden");
        if (ts.isParameter(node)) declarationNames(node.name, local);
        if (ts.isTypeParameterDeclaration(node)) declarationNames(node.name, local);
        if (ts.isVariableDeclaration(node) && node.parent.parent.parent !== sourceFile) declarationNames(node.name, local);
        if (ts.isIdentifier(node) && !isNonReferenceName(node)) {
            const parent = node.parent;
            const isType = ts.isTypeReferenceNode(parent) && parent.typeName === node;
            if (!local.has(node.text) && !["Number", "Object"].includes(node.text) && !isType) fail(`undeclared or ambient identifier ${node.text}`);
        }
        if (ts.isPropertyAccessExpression(node)) {
            if (!allowedProperties.has(node.name.text)) fail(`unrecognized property access .${node.name.text}`);
            properties.push(node);
        }
        if (ts.isPropertyAssignment(node)) {
            const name = ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : "";
            if (!resultKeys.has(name) && !dispatchKeys.has(name)) fail(`unrecognized object property ${name || ts.SyntaxKind[node.name.kind]}`);
        }
        if (ts.isCallExpression(node)) {
            calls.push(node);
            if (ts.isIdentifier(node.expression)) {
                if (!directCallees.has(node.expression.text) && !local.has(node.expression.text)) fail(`unrecognized direct call ${node.expression.text}`);
            } else if (ts.isPropertyAccessExpression(node.expression)) {
                if (!allowedProperties.has(node.expression.name.text)) fail(`unrecognized method call .${node.expression.name.text}`);
            } else fail(`unrecognized call target ${ts.SyntaxKind[node.expression.kind]}`);
            if (directCall(node, "regex")) {
                if (node.arguments.length !== 1 || !ts.isRegularExpressionLiteral(node.arguments[0])) fail("regex() requires one static regular-expression literal");
                regexCalls.push(node);
            }
        }
        if (ts.isNewExpression(node)) newExpressions.push(node);
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    return { calls, newExpressions, regexCalls, properties };
}

function checkWrapper(sourceFile, seat, top, newExpressions) {
    const expected = seat === "b" || seat === "s" ? 1 : 0;
    if (newExpressions.length !== expected) fail(`${seat}: expected ${expected} new Parser transaction wrapper(s)`);
    if (!expected) return null;
    const expression = newExpressions[0];
    if (!identifier(expression.expression, "Parser") || expression.arguments?.length !== 1 || !ts.isArrowFunction(expression.arguments[0])) fail(`${seat}: the sole new expression must be new Parser(callback)`);
    let outerName = null; let outerArrow = null;
    for (const [name, initializer] of top) if (ts.isArrowFunction(initializer) && unwrap(initializer.body) === expression) { outerName = name; outerArrow = initializer; }
    if (!outerName || !outerArrow || outerArrow.parameters.length !== 1 || !identifier(outerArrow.parameters[0].name)) fail(`${seat}: wrapper must be the direct body of a one-argument const arrow`);
    const innerName = outerArrow.parameters[0].name.text;
    const callback = expression.arguments[0];
    if (callback.parameters.length !== 1 || !identifier(callback.parameters[0].name) || !ts.isBlock(callback.body)) fail(`${seat}: Parser callback must be one state parameter and a block`);
    const stateName = callback.parameters[0].name.text;
    const statements = callback.body.statements;
    if (statements.length !== 4) fail(`${seat}: wrapper requires exactly save, call, guarded restore, return statements`);
    const savedStatement = statements[0];
    if (!ts.isVariableStatement(savedStatement) || (savedStatement.declarationList.flags & ts.NodeFlags.Const) === 0 || savedStatement.declarationList.declarations.length !== 1) fail(`${seat}: wrapper statement 1 must be one const saved`);
    const saved = savedStatement.declarationList.declarations[0];
    if (!identifier(saved.name) || !saved.initializer || !propertyCall(saved.initializer, stateName, "save", 0)) fail(`${seat}: wrapper statement 1 must call state.save()`);
    const savedName = saved.name.text;
    const callStatement = statements[1];
    if (!ts.isExpressionStatement(callStatement) || !propertyCall(callStatement.expression, innerName, "call", 1) || !identifier(callStatement.expression.arguments[0], stateName)) fail(`${seat}: wrapper statement 2 must be inner.call(state)`);
    const branch = statements[2];
    if (!ts.isIfStatement(branch) || !property(branch.expression, stateName, "isError") || branch.elseStatement || !ts.isBlock(branch.thenStatement) || branch.thenStatement.statements.length !== 2) fail(`${seat}: wrapper statement 3 must be the exact isError restore block`);
    const restore = branch.thenStatement.statements[0];
    if (!ts.isExpressionStatement(restore) || !propertyCall(restore.expression, stateName, "restore", 1) || !identifier(restore.expression.arguments[0], savedName)) fail(`${seat}: restore must be state.restore(saved)`);
    const mark = branch.thenStatement.statements[1];
    if (!ts.isExpressionStatement(mark) || !ts.isBinaryExpression(mark.expression) || mark.expression.operatorToken.kind !== ts.SyntaxKind.EqualsToken || !property(mark.expression.left, stateName, "isError") || mark.expression.right.kind !== ts.SyntaxKind.TrueKeyword) fail(`${seat}: restored error mark must be state.isError = true`);
    const returned = statements[3];
    if (!ts.isReturnStatement(returned) || !returned.expression || !identifier(returned.expression, stateName)) fail(`${seat}: wrapper statement 4 must return state`);
    const callbackRange = [callback.pos, callback.end];
    const visit = (node) => {
        if (ts.isIdentifier(node) && (node.text === stateName || node.text === innerName || node.text === savedName)) {
            if (node.pos < callbackRange[0] || node.end > callbackRange[1]) {
                const isOuterInner = node === outerArrow.parameters[0].name;
                if (!isOuterInner) fail(`${seat}: wrapper identifiers may not escape their transaction scope`);
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    return outerName;
}

const callCount = (calls, name) => calls.filter((call) => ts.isIdentifier(call.expression) ? call.expression.text === name : ts.isPropertyAccessExpression(call.expression) && call.expression.name.text === name).length;
const sortedRegexes = (regexCalls) => regexCalls.map((call) => call.arguments[0].text).sort();
const resolveIdentifier = (node, top) => identifier(node) ? top.get(node.text) : undefined;
const mapReceiver = (node) => ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "map" ? unwrap(node.expression.expression) : null;
const parserBase = (node) => mapReceiver(unwrap(node)) ?? unwrap(node);

function checkTopology(seat, top, calls, regexCalls, wrapperName) {
    const consume = unwrap(top.get("consumeNumber"));
    const receiver = mapReceiver(consume);
    if (!receiver || consume.arguments.length !== 1) fail(`${seat}: consumeNumber must be one parser map`);
    const actualRegexes = sortedRegexes(regexCalls);
    const expectedRegexes = [...regexSets[seat]].sort();
    if (JSON.stringify(actualRegexes) !== JSON.stringify(expectedRegexes)) fail(`${seat}: static parser regex literals do not match the seat grammar`);
    const counts = Object.fromEntries(["regex", "all", "any", "dispatch", "then", "opt", "map", "skip", "next", "chain"].map((name) => [name, callCount(calls, name)]));
    if (seat === "h") {
        if (!directCall(receiver, "regex") || counts.regex !== 1 || counts.all || counts.any || counts.dispatch || counts.then || counts.opt) fail("h: consumeNumber must be exactly the whole regex followed by map");
    } else if (seat === "b") {
        if (!directCall(receiver, wrapperName) || receiver.arguments.length !== 1 || !identifier(receiver.arguments[0])) fail("b: consumeNumber must map the transaction around one factorized parser");
        const pieces = unwrap(resolveIdentifier(receiver.arguments[0], top));
        if (!pieces || !directCall(pieces, "all")) fail("b: transaction input must resolve to all(...)");
        const anyCall = pieces.arguments.find((argument) => directCall(unwrap(argument), "any"));
        if (!anyCall || !anyCall.arguments.some((argument) => {
            const resolved = resolveIdentifier(unwrap(argument), top);
            return resolved && directCall(parserBase(resolved), "all");
        })) fail("b: the factorized all/any/all dataflow is not connected to consumeNumber");
        if (counts.all !== 2 || counts.any !== 1 || counts.then || counts.dispatch || counts.opt !== 3) fail("b: exact all/all/any and three guarded opt calls required");
    } else if (seat === "s") {
        if (!directCall(receiver, wrapperName) || receiver.arguments.length !== 1) fail("s: consumeNumber must map the transaction around staged then composition");
        const stage = unwrap(resolveIdentifier(receiver.arguments[0], top) ?? receiver.arguments[0]);
        let cursor = stage; let depth = 0;
        while (ts.isCallExpression(cursor) && ts.isPropertyAccessExpression(cursor.expression) && cursor.expression.name.text === "then") { depth++; cursor = unwrap(cursor.expression.expression); }
        if (depth !== 3 || !identifier(cursor) || counts.then !== 3 || counts.all || counts.any || counts.dispatch || counts.opt !== 3) fail("s: exact three-stage then chain and three guarded opt calls required");
    } else {
        if (!directCall(receiver, "dispatch") || receiver.arguments.length !== 1 || !ts.isObjectLiteralExpression(receiver.arguments[0]) || counts.dispatch !== 1 || counts.regex !== 3 || counts.all || counts.any || counts.then || counts.opt) fail("d: consumeNumber must map one three-arm dispatch");
        const names = receiver.arguments[0].properties.map((item) => ts.isPropertyAssignment(item) && (ts.isStringLiteral(item.name) || ts.isIdentifier(item.name)) ? item.name.text : "").sort();
        if (JSON.stringify(names) !== JSON.stringify([...dispatchKeys].sort())) fail("d: dispatch keys must be +-, ., and 0-9");
        for (const item of receiver.arguments[0].properties) {
            if (!ts.isPropertyAssignment(item) || !identifier(item.initializer)) fail("d: dispatch arms must reference declared atomic parsers");
            const arm = resolveIdentifier(item.initializer, top);
            if (!arm || !directCall(unwrap(arm), "regex")) fail("d: every dispatch arm must resolve to one static regex parser");
        }
    }
    return counts;
}

export function assayCandidateAst(path, seat) {
    if (!Object.hasOwn(importsBySeat, seat)) fail(`unknown seat ${seat}`);
    const source = readFileSync(path, "utf8");
    const sourceFile = ts.createSourceFile(path, source, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
    if (sourceFile.parseDiagnostics.length) fail(`TypeScript parse diagnostics in ${basename(path)}`);
    const imported = inspectImport(sourceFile, seat);
    const { declared, top } = inspectDeclarations(sourceFile, imported);
    const evidence = inspectClosedWorld(sourceFile, declared);
    const wrapperName = checkWrapper(sourceFile, seat, top, evidence.newExpressions);
    const counts = checkTopology(seat, top, evidence.calls, evidence.regexCalls, wrapperName);
    return Object.freeze({
        policy: "TYPESCRIPT_COMPILER_API_CLOSED_AST_ALLOWLIST",
        one_source: true,
        exact_core_imports: [...imported].sort(),
        declarations: [...top.keys()],
        parser_regex_literals: sortedRegexes(evidence.regexCalls),
        actual_call_counts: counts,
        computed_element_accesses: 0,
        ambient_identifiers: 0,
        wrapper: wrapperName ?? "FORBIDDEN_AND_ABSENT",
    });
}
