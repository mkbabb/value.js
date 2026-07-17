// ui/alert — re-export of the glass-ui Alert primitive.
//
// This barrel previously held a local shadcn-vue re-implementation
// (Alert/AlertTitle/AlertDescription SFCs + a local `alertVariants` cva) that
// duplicated a primitive glass-ui ships. B.W2 (A.W7 idiomatic-gestalt finding
// N1) converted it to a re-export: glass-ui is the design system, the demo
// consumes its Alert, not a hand-rolled copy. The two consumers
// (`ColorNutritionLabel.vue`, `Markdown.vue`) import from this barrel
// unchanged.
export { Alert, AlertTitle, AlertDescription } from "@mkbabb/glass-ui";
export type { AlertVariants } from "@mkbabb/glass-ui";
