import { tsImport } from "ts-import";
import { getAndValidateExtension } from "./extension";
import { getPkgType } from "./getPkgType";

// peerDependencies
// https://github.com/radarsu/ts-import/blob/master/src/index.ts#L177
// const compileCommand = `npx -p typescript tsc --project "${tmpTsConfigPath}"`;

export function loadConfig(
  filePath: string,
  type: "module" | undefined
): object | ((...args: any[]) => void) {
  const extension = getAndValidateExtension(filePath);
  switch (extension) {
    case "json":
      return require(filePath);
    case "js":
      return getPkgType(type) === "module"
        ? import(filePath)
        : require(filePath);
    case "cjs":
      return require(filePath);
    case "mjs":
      return import(filePath);
    case "ts":
      return tsImport.compile(filePath);
    default:
      throw new Error(`[override-configs]: invalid extension: "${extension}"`);
  }
}
