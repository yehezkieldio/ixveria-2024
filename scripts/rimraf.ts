import { $ } from "bun";

const path = process.argv[2] || process.cwd();
await $`rm -rf ${path}/dist`.quiet();
