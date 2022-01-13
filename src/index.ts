import merge from "lodash.merge";
import isPromise from "is-promise";
import { ensureArray } from "./ensureArray";
import { loadConfig } from "./loadConfig";
import { normalizeConfig } from "./normalizeConfig";

interface Config {
  [key: string]: string;
}
interface Options {
  type?: "module";
  silent?: boolean;
}
/**
 *
 * @param defaultConfig - default config object values
 * @param overrideFilePaths - override files to load, lodash.merge order
 * @param options - options
 * @returns merged configs
 */
export function overrideConfigs<T extends Config = Config>(
  defaultConfig: T,
  overrideFilePaths: string | string[],
  args: any[] = [],
  options: Options = {}
): T | Promise<T> {
  const overrideFilePathArray = ensureArray(overrideFilePaths);

  const overrideConfigs: any[] = [];
  let hasPromises = false;

  for (const overrideFilePath of overrideFilePathArray) {
    const config = normalizeConfig(
      loadConfig(overrideFilePath, options.type),
      args
    );
    if (isPromise(config)) {
      hasPromises = true;
    }
    overrideConfigs.push(config);
  }

  if (hasPromises) {
    !options.silent &&
      console.log("[override-configs]: config includes a promise");
  }

  if (hasPromises) {
    return Promise.all(overrideConfigs).then((overrideConfigs) =>
      merge(defaultConfig, ...overrideConfigs)
    );
  } else {
    return merge(defaultConfig, ...overrideConfigs);
  }
}
