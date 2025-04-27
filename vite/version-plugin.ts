import { Plugin } from "vite";
import fs from "fs";
import path from "path";
import semver from "semver";

export default function versionUpdatePlugin(): Plugin {
  return {
    name: "vite-plugin-version-update",
    apply: "build",
    async buildStart() {
      const packagePath = path.resolve(process.cwd(), "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

      // 更新版本号
      packageJson.version = semver.inc(packageJson.version, "patch");

      // 写回package.json
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

      console.log(`版本号已更新至: ${packageJson.version}`);
    }
  };
}
