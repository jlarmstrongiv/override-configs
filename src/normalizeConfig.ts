export function normalizeConfig(
  config: object | ((...args: any[]) => void),
  args: any[]
) {
  return typeof config === "function" ? config(...args) : config;
}
