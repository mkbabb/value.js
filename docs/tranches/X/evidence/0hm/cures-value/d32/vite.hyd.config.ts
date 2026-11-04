import base from "/Users/mkbabb/Programming/value.js/vite.config.ts";
export default async (env: any) => {
    const c: any = await (base as any)(env);
    c.define = { ...(c.define || {}), __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true" };
    c.build.outDir = process.env.HOME + "/.dev-logs/x-0hm-cures/value/ghp/dist-after";
    c.build.minify = false;
    return c;
};
