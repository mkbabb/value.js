import { describe, expect, it } from "vitest";
import { FunctionValue, ValueArray, ValueUnit } from "../src/units";

// ---------------------------------------------------------------------------
// ValueUnit
// ---------------------------------------------------------------------------
describe("ValueUnit", () => {
    // ---- toString ----------------------------------------------------------
    describe("toString", () => {
        it("returns value + unit for standard units", () => {
            expect(new ValueUnit(10, "px").toString()).toBe("10px");
            expect(new ValueUnit(1.5, "em").toString()).toBe("1.5em");
            expect(new ValueUnit(50, "%").toString()).toBe("50%");
            expect(new ValueUnit(360, "deg").toString()).toBe("360deg");
            expect(new ValueUnit(100, "ms").toString()).toBe("100ms");
            expect(new ValueUnit(0, "rem").toString()).toBe("0rem");
        });

        it("returns just the value when unit is undefined", () => {
            expect(new ValueUnit(42).toString()).toBe("42");
        });

        it("returns just the value when unit is 'string'", () => {
            expect(new ValueUnit("hello", "string").toString()).toBe("hello");
        });

        it("wraps value in var() when unit is 'var'", () => {
            expect(new ValueUnit("--my-var", "var").toString()).toBe("var(--my-var)");
        });

        it("wraps value in calc() when unit is 'calc'", () => {
            expect(new ValueUnit("100% - 20px", "calc").toString()).toBe(
                "calc(100% - 20px)",
            );
        });

        it("delegates to value.toString() when unit is 'color'", () => {
            const fakeColor = { toString: () => "rgb(255, 0, 0)" };
            expect(new ValueUnit(fakeColor, "color").toString()).toBe("rgb(255, 0, 0)");
        });

        it("returns empty string when value is null", () => {
            expect(new ValueUnit(null, "px").toString()).toBe("");
        });

        it("returns empty string when value is undefined", () => {
            expect(new ValueUnit(undefined, "px").toString()).toBe("");
        });

        it("handles empty-string unit", () => {
            expect(new ValueUnit(1, "").toString()).toBe("1");
        });

        it("handles zero value", () => {
            expect(new ValueUnit(0, "px").toString()).toBe("0px");
        });

        it("handles negative values", () => {
            expect(new ValueUnit(-15, "px").toString()).toBe("-15px");
        });

        it("handles decimal values", () => {
            expect(new ValueUnit(0.75, "em").toString()).toBe("0.75em");
        });
    });

    // ---- clone -------------------------------------------------------------
    describe("clone", () => {
        it("creates a deep copy with identical properties", () => {
            const original = new ValueUnit(10, "px", ["length"], "width", "width");
            const cloned = original.clone();

            expect(cloned.value).toBe(10);
            expect(cloned.unit).toBe("px");
            expect(cloned.superType).toEqual(["length"]);
            expect(cloned.subProperty).toBe("width");
            expect(cloned.property).toBe("width");
        });

        it("does not share references for value objects", () => {
            const innerObj = { r: 255, g: 0, b: 0 };
            const original = new ValueUnit(innerObj, "px");
            const cloned = original.clone();

            // The clone utility copies plain objects deeply
            cloned.value.r = 0;
            expect(original.value.r).toBe(255);
        });

        it("does not share references for superType array", () => {
            const original = new ValueUnit(10, "px", ["length"]);
            const cloned = original.clone();

            cloned.superType!.push("extra");
            expect(original.superType).toEqual(["length"]);
        });

        it("produces an independent instance", () => {
            const original = new ValueUnit(100, "px");
            const cloned = original.clone();

            cloned.setValue(999);
            expect(original.value).toBe(100);
        });
    });

    // ---- coalesce ----------------------------------------------------------
    describe("coalesce", () => {
        it("fills in missing unit from the right ValueUnit (not inplace)", () => {
            const left = new ValueUnit(10);
            const right = new ValueUnit(20, "px");
            const result = left.coalesce(right);

            expect(result.unit).toBe("px");
            expect(result.value).toBe(10);
            // Original is unchanged
            expect(left.unit).toBeUndefined();
        });

        it("fills in missing superType, subProperty, and property", () => {
            const left = new ValueUnit(5, "px");
            const right = new ValueUnit(
                0,
                "em",
                ["length"],
                "translateX",
                "transform",
            );
            const result = left.coalesce(right);

            // unit already present on left, so left's "px" is kept
            expect(result.unit).toBe("px");
            expect(result.superType).toEqual(["length"]);
            expect(result.subProperty).toBe("translateX");
            expect(result.property).toBe("transform");
        });

        it("does not overwrite already-set fields", () => {
            const left = new ValueUnit(
                10,
                "rem",
                ["length"],
                "marginTop",
                "margin",
            );
            const right = new ValueUnit(
                0,
                "px",
                ["absolute-length"],
                "paddingTop",
                "padding",
            );
            const result = left.coalesce(right);

            expect(result.unit).toBe("rem");
            expect(result.superType).toEqual(["length"]);
            expect(result.subProperty).toBe("marginTop");
            expect(result.property).toBe("margin");
        });

        it("inplace mode mutates the left ValueUnit", () => {
            const left = new ValueUnit(10);
            const right = new ValueUnit(20, "px", ["length"], "top", "top");
            const result = left.coalesce(right, true);

            expect(result).toBe(left);
            expect(left.unit).toBe("px");
            expect(left.superType).toEqual(["length"]);
            expect(left.subProperty).toBe("top");
            expect(left.property).toBe("top");
        });

        it("returns this unchanged when right is null/undefined", () => {
            const left = new ValueUnit(10, "px");
            expect(left.coalesce(undefined)).toBe(left);
            expect(left.coalesce(null as any)).toBe(left);
        });

        it("skips coalesce for blacklisted unit 'string'", () => {
            const left = new ValueUnit("hello", "string");
            const right = new ValueUnit(0, "px", ["length"], "top", "top");
            const result = left.coalesce(right);

            expect(result).toBe(left);
            expect(result.unit).toBe("string");
        });

        it("skips coalesce for blacklisted unit 'var'", () => {
            const left = new ValueUnit("--x", "var");
            const right = new ValueUnit(0, "px", ["length"]);
            const result = left.coalesce(right);

            expect(result).toBe(left);
            expect(result.unit).toBe("var");
        });

        it("skips coalesce for blacklisted unit 'calc'", () => {
            const left = new ValueUnit("100% - 10px", "calc");
            const right = new ValueUnit(0, "px");
            const result = left.coalesce(right);

            expect(result).toBe(left);
            expect(result.unit).toBe("calc");
        });
    });

    // ---- toFixed -----------------------------------------------------------
    describe("toFixed", () => {
        it("formats to 2 fraction digits by default and strips trailing .0", () => {
            const v = new ValueUnit(3.0, "px");
            expect(v.toFixed()).toBe("3px");
        });

        it("preserves meaningful decimals", () => {
            const v = new ValueUnit(3.456, "px");
            expect(v.toFixed(2)).toBe("3.46px");
        });

        it("works with specified fraction digits", () => {
            const v = new ValueUnit(1.23456, "em");
            expect(v.toFixed(4)).toBe("1.2346em");
        });

        it("handles integer values", () => {
            const v = new ValueUnit(100, "px");
            expect(v.toFixed()).toBe("100px");
        });

        it("carries unit from the original via coalesce", () => {
            const v = new ValueUnit(42.999, "%");
            expect(v.toFixed(1)).toBe("43%");
        });
    });

    // ---- setValue -----------------------------------------------------------
    describe("setValue", () => {
        it("updates the value property", () => {
            const v = new ValueUnit(10, "px");
            v.setValue(20);
            expect(v.value).toBe(20);
        });

        it("can set value to a different type", () => {
            const v = new ValueUnit(10, "px");
            v.setValue("hello" as any);
            expect(v.value).toBe("hello");
        });
    });

    // ---- valueOf -----------------------------------------------------------
    describe("valueOf", () => {
        it("returns the raw value", () => {
            expect(new ValueUnit(42, "px").valueOf()).toBe(42);
            expect(new ValueUnit("test").valueOf()).toBe("test");
        });
    });

    // ---- toJSON ------------------------------------------------------------
    describe("toJSON", () => {
        it("returns the raw value (delegates to valueOf)", () => {
            expect(new ValueUnit(100, "px").toJSON()).toBe(100);
        });
    });

    // ---- setSubProperty / setProperty --------------------------------------
    describe("setSubProperty / setProperty", () => {
        it("sets the subProperty", () => {
            const v = new ValueUnit(10, "px");
            v.setSubProperty("translateX");
            expect(v.subProperty).toBe("translateX");
        });

        it("sets the property", () => {
            const v = new ValueUnit(10, "px");
            v.setProperty("transform");
            expect(v.property).toBe("transform");
        });
    });
});

// ---------------------------------------------------------------------------
// FunctionValue
// ---------------------------------------------------------------------------
describe("FunctionValue", () => {
    // ---- toString ----------------------------------------------------------
    describe("toString", () => {
        it("returns name(v1, v2, ...)", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            expect(fn.toString()).toBe("translate(10px, 20px)");
        });

        it("handles a single value", () => {
            const fn = new FunctionValue("rotate", [new ValueUnit(45, "deg")]);
            expect(fn.toString()).toBe("rotate(45deg)");
        });

        it("handles nested FunctionValues", () => {
            const inner = new FunctionValue("sin", [new ValueUnit(45, "deg")]);
            const outer = new FunctionValue("rotate", [inner]);
            expect(outer.toString()).toBe("rotate(sin(45deg))");
        });

        it("handles many values", () => {
            const fn = new FunctionValue("rgb", [
                new ValueUnit(255, ""),
                new ValueUnit(128, ""),
                new ValueUnit(0, ""),
            ]);
            expect(fn.toString()).toBe("rgb(255, 128, 0)");
        });
    });

    // ---- clone -------------------------------------------------------------
    describe("clone", () => {
        it("creates a deep copy", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            const cloned = fn.clone();

            expect(cloned.name).toBe("translate");
            expect(cloned.toString()).toBe("translate(10px, 20px)");
        });

        it("modifications to clone do not affect original", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            const cloned = fn.clone();

            cloned.setValue(99, 0);
            expect(fn.values[0].valueOf()).toBe(10);
            expect(cloned.values[0].valueOf()).toBe(99);
        });

        it("clones nested FunctionValues deeply", () => {
            const inner = new FunctionValue("sin", [new ValueUnit(45, "deg")]);
            const outer = new FunctionValue("rotate", [inner]);
            const cloned = outer.clone();

            (cloned.values[0] as FunctionValue).setValue(90, 0);
            expect((outer.values[0] as FunctionValue).values[0].valueOf()).toBe(45);
        });
    });

    // ---- setValue -----------------------------------------------------------
    describe("setValue", () => {
        it("sets all values when no index is provided", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            fn.setValue(0);
            expect(fn.values[0].valueOf()).toBe(0);
            expect(fn.values[1].valueOf()).toBe(0);
        });

        it("sets a specific value when index is provided", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            fn.setValue(99, 1);
            expect(fn.values[0].valueOf()).toBe(10);
            expect(fn.values[1].valueOf()).toBe(99);
        });
    });

    // ---- valueOf -----------------------------------------------------------
    describe("valueOf", () => {
        it("returns array of raw values", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            expect(fn.valueOf()).toEqual([10, 20]);
        });
    });

    // ---- toJSON ------------------------------------------------------------
    describe("toJSON", () => {
        it("returns an object keyed by function name", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            expect(fn.toJSON()).toEqual({ translate: [10, 20] });
        });
    });

    // ---- setSubProperty / setProperty propagation --------------------------
    describe("setSubProperty / setProperty", () => {
        it("constructor sets subProperty to name on all children", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            expect(fn.values[0].subProperty).toBe("translate");
            expect(fn.values[1].subProperty).toBe("translate");
        });

        it("setSubProperty propagates to all children", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            fn.setSubProperty("rotateX");
            expect((fn.values[0] as ValueUnit).subProperty).toBe("rotateX");
            expect((fn.values[1] as ValueUnit).subProperty).toBe("rotateX");
        });

        it("setProperty propagates to all children", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            fn.setProperty("transform");
            expect((fn.values[0] as ValueUnit).property).toBe("transform");
            expect((fn.values[1] as ValueUnit).property).toBe("transform");
        });
    });
});

// ---------------------------------------------------------------------------
// ValueArray
// ---------------------------------------------------------------------------
describe("ValueArray", () => {
    // ---- toString ----------------------------------------------------------
    describe("toString", () => {
        it("returns space-separated values", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
                new ValueUnit(30, "px"),
            );
            expect(arr.toString()).toBe("10px 20px 30px");
        });

        it("handles a single value", () => {
            const arr = new ValueArray(new ValueUnit(42, "em"));
            expect(arr.toString()).toBe("42em");
        });

        it("handles mixed value types", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new FunctionValue("rotate", [new ValueUnit(45, "deg")]),
            );
            expect(arr.toString()).toBe("10px rotate(45deg)");
        });

        it("returns empty string for empty array", () => {
            const arr = new ValueArray();
            expect(arr.toString()).toBe("");
        });
    });

    // ---- clone -------------------------------------------------------------
    describe("clone", () => {
        it("creates a deep copy", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "em"),
            );
            const cloned = arr.clone();

            expect(cloned.toString()).toBe("10px 20em");
            expect(cloned.length).toBe(2);
        });

        it("modifications to clone do not affect original", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "em"),
            );
            const cloned = arr.clone();

            cloned[0].setValue(999);
            expect(arr[0].valueOf()).toBe(10);
            expect(cloned[0].valueOf()).toBe(999);
        });

        it("clones FunctionValue elements deeply", () => {
            const fn = new FunctionValue("translate", [
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            ]);
            const arr = new ValueArray(fn);
            const cloned = arr.clone();

            (cloned[0] as FunctionValue).setValue(100, 0);
            expect((arr[0] as FunctionValue).values[0].valueOf()).toBe(10);
        });
    });

    // ---- setValue -----------------------------------------------------------
    describe("setValue", () => {
        it("sets all values when no index is provided", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            );
            arr.setValue(0);
            expect(arr[0].valueOf()).toBe(0);
            expect(arr[1].valueOf()).toBe(0);
        });

        it("sets a specific value when index is provided", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            );
            arr.setValue(99, 0);
            expect(arr[0].valueOf()).toBe(99);
            expect(arr[1].valueOf()).toBe(20);
        });
    });

    // ---- valueOf -----------------------------------------------------------
    describe("valueOf", () => {
        it("returns array of raw values", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "em"),
            );
            expect(arr.valueOf()).toEqual([10, 20]);
        });
    });

    // ---- toJSON ------------------------------------------------------------
    describe("toJSON", () => {
        it("returns array of JSON-serialized values", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "em"),
            );
            expect(arr.toJSON()).toEqual([10, 20]);
        });
    });

    // ---- setSubProperty / setProperty propagation --------------------------
    describe("setSubProperty / setProperty", () => {
        it("setSubProperty propagates to all elements", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            );
            arr.setSubProperty("marginTop");
            expect((arr[0] as ValueUnit).subProperty).toBe("marginTop");
            expect((arr[1] as ValueUnit).subProperty).toBe("marginTop");
        });

        it("setProperty propagates to all elements", () => {
            const arr = new ValueArray(
                new ValueUnit(10, "px"),
                new ValueUnit(20, "px"),
            );
            arr.setProperty("margin");
            expect((arr[0] as ValueUnit).property).toBe("margin");
            expect((arr[1] as ValueUnit).property).toBe("margin");
        });
    });

    // ---- Array behavior ----------------------------------------------------
    describe("Array behavior", () => {
        it("extends Array and supports length", () => {
            const arr = new ValueArray(
                new ValueUnit(1, "px"),
                new ValueUnit(2, "px"),
            );
            expect(arr.length).toBe(2);
            expect(arr instanceof Array).toBe(true);
        });

        it("supports push and indexing", () => {
            const arr = new ValueArray();
            arr.push(new ValueUnit(10, "px"));
            expect(arr.length).toBe(1);
            expect(arr[0].valueOf()).toBe(10);
        });
    });
});
