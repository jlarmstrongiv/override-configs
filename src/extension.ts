import path from "path";

export function getAndValidateExtension(filePath: string): string {
  const extension = path.extname(filePath).substring(1);
  switch (extension) {
    case "json":
    case "js":
    case "cjs":
      return extension;
    default:
      throw new Error(`[override-configs]: invalid extension: "${extension}"`);
  }
}
