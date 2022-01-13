import path from "path";
import appRoot from "app-root-path";
import readPkgUp from "read-pkg-up";

export function getPkgType(type?: "module"): "module" | undefined {
  if (type) {
    return type;
  }

  const appDir = require?.main?.filename
    ? path.dirname(require.main.filename)
    : appRoot.toString();
  const pkg = readPkgUp.sync({ cwd: appDir });

  if (!pkg) {
    throw new Error("[override-configs]: cannot find package.json");
  }

  const pkgType = pkg.packageJson.type === "module" ? "module" : undefined;

  return pkgType;
}
