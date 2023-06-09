/* eslint-env node */
import { build } from "esbuild";
import babel from "esbuild-plugin-babel";
import process from "process";

const args = process.argv.slice(2);

const watch = args.some((a) => a === "--watch" || a === "-w");

build({
  entryPoints: { 
    "gb": "src/gb/main.ts",
    "gb-consult": "src/gb/combat/consult.ts",
    "gurth-burkle": "src/main.ts", 
    "consult": "src/consult.ts", 
    "recovery": "src/recovery.ts", 
    "betweenbattle": "src/betweenbattle.ts",
    "choiceadventure": "src/choiceadventure.ts",
    "sandbox": "src/sandbox.ts",
  },
  bundle: true,
  minifySyntax: true,
  platform: "node",
  target: "rhino1.7.14",
  external: ["kolmafia"],
  plugins: [babel()],
  outdir: "../../scripts/gurth_burkle",
  watch,
  loader: { ".json": "text" },
  inject: ["./kolmafia-polyfill.js"],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
