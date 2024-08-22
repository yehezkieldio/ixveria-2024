import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/**/*.ts", "!src/**/*.d.ts", "src/**/*.tsx", "!src/**/*.test.ts*"],
    clean: true,
    skipNodeModulesBundle: true,
    tsconfig: "tsconfig.json",
    noExternal: ["@ixveria/environment", "@ixveria/database"],
});
