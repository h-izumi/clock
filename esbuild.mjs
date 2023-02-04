import { build } from "esbuild";

import { sassPlugin } from "esbuild-sass-plugin";

import { copyFont } from "./scripts/copy-font.mjs";
import { cacheBusting } from "./scripts/cache-busting.mjs";

const options = {
  entryPoints: ["./src/index.js", "./src/index.scss"],
  bundle: true,
  minify: true,
  sourcemap: "linked",
  outdir: "dist",
  external: ["*.woff2"],
  plugins: [
    sassPlugin(),
    // copyFont(),
    cacheBusting(),
  ]
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});

