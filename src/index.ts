import merge from "lodash.merge";
import isPromise from "is-promise";
import { ensureArray } from "./ensureArray";
import { loadConfig } from "./loadConfig";
import { normalizeConfig } from "./normalizeConfig";

interface Config {
  [key: string]: any;
}
export interface OverrideConfigsOptions {
  silent?: boolean;
}

export function overrideConfigs<T extends Config = Config>(
  defaultConfig: T,
  overrideFilePaths: string | string[],
  args: any[] = [],
  options: OverrideConfigsOptions = {}
): T | Promise<T> {
  // default options
  // Node14 support https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment
  options.silent = options.silent || false;

  const overrideFilePathArray = ensureArray(overrideFilePaths);

  const overrideConfigs: any[] = [];
  let hasPromises = false;

  for (const overrideFilePath of overrideFilePathArray) {
    const config = normalizeConfig(
      loadConfig(overrideFilePath, options.silent),
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

export default overrideConfigs;
