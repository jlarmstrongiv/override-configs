import { getAndValidateExtension } from "./extension";

// peerDependencies
// https://github.com/radarsu/ts-import/blob/master/src/index.ts#L177
// const compileCommand = `npx -p typescript tsc --project "${tmpTsConfigPath}"`;

export function loadConfig(
  filePath: string,
  silent: boolean
): object | ((...args: any[]) => void) {
  const extension = getAndValidateExtension(filePath);
  switch (extension) {
    case "json":
    case "js":
    case "cjs":
      try {
        return require(filePath);
      } catch (error) {
        !silent &&
          console.log(
            `[override-configs]: config file not found: "${filePath}"`
          );
        return {};
      }
    default:
      throw new Error(`[override-configs]: invalid extension: "${extension}"`);
  }
}
