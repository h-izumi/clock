import fs from "fs";

export { copyFont };

const copyFont = options => ({
  name: "copy-font",
  setup(build) {
    build.onEnd(() => {
      fs.copyFileSync(
        "./node_modules/dseg/DSEG-LICENSE.txt",
        `./DSEG-LICENSE.txt`
      );

      const dsegPackageJson = JSON.parse(fs.readFileSync("./node_modules/dseg/package.json"));

      const cssFile = "./assets/index.css";
      const destFile = `DSEG14Classic-Italic.${dsegPackageJson.version}.woff2`;

      fs.copyFileSync(
        "./node_modules/dseg/fonts/DSEG14-Classic/DSEG14Classic-Italic.woff2",
        `./assets/${destFile}`
      );

      const cssOrigin = fs.readFileSync(cssFile, "utf8");
      fs.writeFileSync(cssFile, cssOrigin.replace(/DSEG14Classic-Italic.*\.woff2/i, destFile));
    });
  },
});
