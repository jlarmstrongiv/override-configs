export function ensureArray<T>(parameter?: T | T[]): T[] {
  if (parameter) {
    if (Array.isArray(parameter)) {
      return parameter;
    } else {
      return [parameter];
    }
  } else {
    return [];
  }
}
