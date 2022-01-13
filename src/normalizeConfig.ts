export function normalizeConfig(config: any, args: any[]) {
  return config === "function" ? config(...args) : config;
}
