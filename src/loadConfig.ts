import { getAndValidateExtension } from "./extension";

// peerDependencies
// https://github.com/radarsu/ts-import/blob/master/src/index.ts#L177
// const compileCommand = `npx -p typescript tsc --project "${tmpTsConfigPath}"`;

export function loadConfig(
  filePath: string
): object | ((...args: any[]) => void) {
  const extension = getAndValidateExtension(filePath);
  switch (extension) {
    case "json":
    case "js":
    case "cjs":
      try {
        return require(filePath);
      } catch (error) {
        return {};
      }
    default:
      throw new Error(`[override-configs]: invalid extension: "${extension}"`);
  }
}
