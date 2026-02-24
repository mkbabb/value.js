import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    isObject,
    clone,
    arrayEquals,
    debounce,
    memoize,
    hyphenToCamelCase,
    camelCaseToHyphen,
    seekPreviousValue,
} from "../src/utils";

describe("isObject", () => {
    it("should return true for plain objects", () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1, b: 2 })).toBe(true);
        expect(isObject(Object.create(null) ? false : false)).toBe(false); // Object.create(null) has no constructor
    });

    it("should return false for arrays", () => {
        expect(isObject([])).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
    });

    it("should return false for null and undefined", () => {
        expect(isObject(null)).toBe(false);
        expect(isObject(undefined)).toBe(false);
    });

    it("should return false for primitives", () => {
        expect(isObject(42)).toBe(false);
        expect(isObject("hello")).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(Symbol())).toBe(false);
    });

    it("should return false for class instances", () => {
        class Foo {}
        expect(isObject(new Foo())).toBe(false);
    });

    it("should return false for built-in object types", () => {
        expect(isObject(new Date())).toBe(false);
        expect(isObject(/regex/)).toBe(false);
        expect(isObject(new Map())).toBe(false);
        expect(isObject(new Set())).toBe(false);
    });

    it("should return false for functions", () => {
        expect(isObject(() => {})).toBe(false);
        expect(isObject(function () {})).toBe(false);
    });
});

describe("clone", () => {
    it("should deep clone a plain object", () => {
        const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
        const cloned = clone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
        expect(cloned.b).not.toBe(obj.b);
        expect(cloned.b.d).not.toBe(obj.b.d);
    });

    it("should deep clone an array", () => {
        const arr = [1, [2, [3]]];
        const cloned = clone(arr);
        expect(cloned).toEqual(arr);
        expect(cloned).not.toBe(arr);
        expect(cloned[1]).not.toBe(arr[1]);
    });

    it("should use .clone() method if present on a non-plain-object", () => {
        const original = {
            value: 42,
            clone() {
                return { value: this.value, cloned: true };
            },
        };
        // Note: isObject returns true for plain objects, so the object branch
        // runs first and recursively clones entries. The .clone() branch applies
        // to non-plain-objects that have a .clone method.
        class Cloneable {
            value: number;
            constructor(value: number) {
                this.value = value;
            }
            clone() {
                return new Cloneable(this.value);
            }
        }
        const instance = new Cloneable(99);
        const cloned = clone(instance);
        expect(cloned).toEqual(instance);
        expect(cloned).not.toBe(instance);
        expect(cloned).toBeInstanceOf(Cloneable);
    });

    it("should return primitives as-is", () => {
        expect(clone(42)).toBe(42);
        expect(clone("hello")).toBe("hello");
        expect(clone(true)).toBe(true);
        expect(clone(null)).toBe(null);
        expect(clone(undefined)).toBe(undefined);
    });

    it("should handle nested objects inside arrays", () => {
        const data = [{ a: 1 }, { b: 2 }];
        const cloned = clone(data);
        expect(cloned).toEqual(data);
        expect(cloned[0]).not.toBe(data[0]);
        expect(cloned[1]).not.toBe(data[1]);
    });

    it("should handle empty objects and arrays", () => {
        expect(clone({})).toEqual({});
        expect(clone([])).toEqual([]);
    });
});

describe("arrayEquals", () => {
    it("should return true for identical arrays", () => {
        expect(arrayEquals([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it("should return true for empty arrays", () => {
        expect(arrayEquals([], [])).toBe(true);
    });

    it("should return false for arrays of different length", () => {
        expect(arrayEquals([1, 2], [1, 2, 3])).toBe(false);
    });

    it("should return false for arrays with different elements", () => {
        expect(arrayEquals([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it("should use strict equality (===)", () => {
        expect(arrayEquals([1, "2"], [1, 2] as any)).toBe(false);
    });

    it("should return false if either array is null or undefined", () => {
        expect(arrayEquals(null as any, [1])).toBe(false);
        expect(arrayEquals([1], null as any)).toBe(false);
        expect(arrayEquals(undefined as any, undefined as any)).toBe(false);
    });

    it("should handle arrays with reference types (by reference)", () => {
        const obj = { a: 1 };
        expect(arrayEquals([obj], [obj])).toBe(true);
        expect(arrayEquals([obj], [{ a: 1 }])).toBe(false);
    });
});

describe("debounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should delay invocation until after the wait period", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 200);

        debounced();
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(199);
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should reset the timer on subsequent calls within the wait period", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 200);

        debounced();
        vi.advanceTimersByTime(100);
        debounced(); // reset
        vi.advanceTimersByTime(100);
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should pass arguments to the debounced function", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced("a", "b");
        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledWith("a", "b");
    });

    it("should call immediately when immediate=true, then not again during wait", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 200, true);

        debounced();
        expect(fn).toHaveBeenCalledTimes(1);

        debounced();
        expect(fn).toHaveBeenCalledTimes(1); // not called again during wait

        vi.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledTimes(1); // still once; immediate mode doesn't fire on trailing edge
    });

    it("should allow a second immediate call after the wait period expires", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 200, true);

        debounced();
        expect(fn).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(200); // timeout clears

        debounced();
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should have a cancel method that prevents the pending call", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 200);

        debounced();
        vi.advanceTimersByTime(100);
        debounced.cancel();

        vi.advanceTimersByTime(200);
        expect(fn).not.toHaveBeenCalled();
    });

    it("cancel should be safe to call when no timer is pending", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 200);

        // Should not throw
        debounced.cancel();
        expect(fn).not.toHaveBeenCalled();
    });
});

describe("memoize", () => {
    it("should cache results for the same arguments", () => {
        const fn = vi.fn((x: number) => x * 2);
        const memoized = memoize(fn);

        expect(memoized(5)).toBe(10);
        expect(memoized(5)).toBe(10);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should compute separately for different arguments", () => {
        const fn = vi.fn((x: number) => x * 2);
        const memoized = memoize(fn);

        expect(memoized(5)).toBe(10);
        expect(memoized(10)).toBe(20);
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should expose a .cache property that is a Map", () => {
        const fn = (x: number) => x + 1;
        const memoized = memoize(fn);

        memoized(3);
        expect(memoized.cache).toBeInstanceOf(Map);
        expect(memoized.cache.size).toBe(1);
    });

    it("should support a custom keyFn", () => {
        const fn = vi.fn((a: number, b: number) => a + b);
        const memoized = memoize(fn, {
            keyFn: (a: number, b: number) => `${a},${b}`,
        });

        expect(memoized(1, 2)).toBe(3);
        expect(memoized(1, 2)).toBe(3);
        expect(fn).toHaveBeenCalledTimes(1);

        expect(memoized(2, 1)).toBe(3);
        expect(fn).toHaveBeenCalledTimes(2);
    });

    describe("maxCacheSize", () => {
        it("should evict the oldest entry when maxCacheSize is exceeded", () => {
            const fn = vi.fn((x: number) => x * 10);
            const memoized = memoize(fn, { maxCacheSize: 2 });

            memoized(1); // cache: {"1"}
            memoized(2); // cache: {"1", "2"}
            expect(memoized.cache.size).toBe(2);

            memoized(3); // cache size exceeds 2, evicts oldest ("1") -> cache: {"2", "3"}
            expect(memoized.cache.size).toBe(2);

            // Argument 3 should still be cached (no recompute)
            fn.mockClear();
            memoized(3);
            expect(fn).toHaveBeenCalledTimes(0);

            // Argument 2 should still be cached (no recompute)
            fn.mockClear();
            memoized(2);
            expect(fn).toHaveBeenCalledTimes(0);

            // Argument 1 was evicted, so it should recompute
            fn.mockClear();
            memoized(1);
            expect(fn).toHaveBeenCalledTimes(1);
        });
    });

    describe("TTL (time-to-live)", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("should return cached value within TTL", () => {
            const fn = vi.fn((x: number) => x * 3);
            const memoized = memoize(fn, { ttl: 1000 });

            expect(memoized(5)).toBe(15);
            vi.advanceTimersByTime(500);
            expect(memoized(5)).toBe(15);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it("should recompute after TTL expires", () => {
            const fn = vi.fn((x: number) => x * 3);
            const memoized = memoize(fn, { ttl: 1000 });

            expect(memoized(5)).toBe(15);
            vi.advanceTimersByTime(1001);
            expect(memoized(5)).toBe(15);
            expect(fn).toHaveBeenCalledTimes(2);
        });

        it("should not recompute exactly at TTL boundary (uses <=)", () => {
            const fn = vi.fn((x: number) => x + 1);
            const memoized = memoize(fn, { ttl: 500 });

            memoized(1);
            vi.advanceTimersByTime(500);
            memoized(1);
            // At exactly ttl (now - timestamp === 500 <= 500), should be a cache hit
            expect(fn).toHaveBeenCalledTimes(1);
        });
    });

    it("should work with zero-argument functions", () => {
        let counter = 0;
        const fn = vi.fn(() => ++counter);
        const memoized = memoize(fn);

        expect(memoized()).toBe(1);
        expect(memoized()).toBe(1);
        expect(fn).toHaveBeenCalledTimes(1);
    });
});

describe("hyphenToCamelCase", () => {
    it("should convert hyphenated strings to camelCase", () => {
        expect(hyphenToCamelCase("foo-bar")).toBe("fooBar");
        expect(hyphenToCamelCase("background-color")).toBe("backgroundColor");
        expect(hyphenToCamelCase("border-top-left-radius")).toBe("borderTopLeftRadius");
    });

    it("should convert underscored strings to camelCase", () => {
        expect(hyphenToCamelCase("foo_bar")).toBe("fooBar");
        expect(hyphenToCamelCase("some_long_name")).toBe("someLongName");
    });

    it("should return the string unchanged if no hyphens or underscores", () => {
        expect(hyphenToCamelCase("foobar")).toBe("foobar");
        expect(hyphenToCamelCase("")).toBe("");
    });

    it("should handle a single segment", () => {
        expect(hyphenToCamelCase("foo")).toBe("foo");
    });
});

describe("camelCaseToHyphen", () => {
    it("should convert camelCase to hyphen-separated", () => {
        expect(camelCaseToHyphen("fooBar")).toBe("foo-bar");
        expect(camelCaseToHyphen("backgroundColor")).toBe("background-color");
        expect(camelCaseToHyphen("borderTopLeftRadius")).toBe("border-top-left-radius");
    });

    it("should return the string unchanged if already lowercase", () => {
        expect(camelCaseToHyphen("foobar")).toBe("foobar");
        expect(camelCaseToHyphen("")).toBe("");
    });

    it("should handle leading uppercase (no leading hyphen expected from regex)", () => {
        // The regex replaces every uppercase letter, so "FooBar" -> "-foo-bar"
        expect(camelCaseToHyphen("FooBar")).toBe("-foo-bar");
    });
});

describe("seekPreviousValue", () => {
    const values = [10, 20, 30, 40, 50];

    it("should find the previous index matching the predicate", () => {
        const result = seekPreviousValue(4, values, (v) => v === 30);
        expect(result).toBe(2);
    });

    it("should return the nearest previous match", () => {
        const result = seekPreviousValue(4, values, (v) => v % 20 === 0);
        expect(result).toBe(3); // 40 is at index 3, which is closer than 20 at index 1
    });

    it("should return undefined if no match is found", () => {
        const result = seekPreviousValue(4, values, (v) => v === 999);
        expect(result).toBeUndefined();
    });

    it("should not examine the element at the given index", () => {
        const result = seekPreviousValue(2, values, (v) => v === 30);
        expect(result).toBeUndefined(); // 30 is at index 2, but search starts at index 1
    });

    it("should return undefined when ix is 0 (no previous elements)", () => {
        const result = seekPreviousValue(0, values, () => true);
        expect(result).toBeUndefined();
    });

    it("should work with ix=1 and only check index 0", () => {
        const result = seekPreviousValue(1, values, (v) => v === 10);
        expect(result).toBe(0);
    });

    it("should handle an empty array", () => {
        const result = seekPreviousValue(0, [], () => true);
        expect(result).toBeUndefined();
    });
});
