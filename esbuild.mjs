import { build } from "esbuild";

import { copyFont } from "./scripts/copy-font.mjs";

const options = {
  entryPoints: ["./src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: "linked",
  outfile: "./dist/index.js",
  plugins: [
    copyFont(),
  ]
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});

