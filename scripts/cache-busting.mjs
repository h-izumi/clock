// https://webhint.io/docs/user-guide/hints/hint-http-cache/
import fs from "fs";
import crypto from "crypto";

export { cacheBusting };

const cacheBusting = options => ({
  name: "cache-busting",
  setup(build) {
    build.onEnd(() => {
      let html = fs.readFileSync("index.html", "utf8");

      const regexFile = /(?<name>.+)(?<!-\w{32})\.js$/;
      fs.readdirSync("./dist").forEach(fileName => {
        const originalFilePath = `./dist/${fileName}`;
        const fileNameWithoutExt = fileName.match(regexFile)?.groups.name;
        if (fileNameWithoutExt) {
          const fileData = fs.readFileSync(originalFilePath, "utf-8");
          const fileNameWithHash = `${fileNameWithoutExt}-${md5hex(fileData)}.js`;
          fs.writeFileSync(originalFilePath, fileData.replace(fileName, fileNameWithHash));
          fs.renameSync(originalFilePath, `./dist/${fileNameWithHash}`);
          fs.renameSync(`${originalFilePath}.map`, `./dist/${fileNameWithHash}.map`);
          html = html.replace(new RegExp(`${fileNameWithoutExt}.*\.js`), fileNameWithHash);
        }
        if (fs.existsSync(originalFilePath)){
          fs.rmSync(originalFilePath);
        }
      });
      fs.writeFileSync("index.html", html);
    });
  },
});

function md5hex(str) {
  const md5 = crypto.createHash("md5");
  return md5.update(str, "binary").digest("hex");
}
