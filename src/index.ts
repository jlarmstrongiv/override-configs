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
  const overrideFilePathArray = ensureArray(overrideFilePaths);

  const overrideConfigs: any[] = [];
  let hasPromises = false;

  for (const overrideFilePath of overrideFilePathArray) {
    const config = normalizeConfig(loadConfig(overrideFilePath), args);
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
