import { build } from "esbuild";

const options = {
  entryPoints: ["./src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: "linked",
  outfile: "./dist/index.js",
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
