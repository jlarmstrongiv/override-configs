import path from "path";
import { overrideConfigs } from ".";

const overrideFilePaths = ["json", "js", "cjs"].map((extension) => {
  return path.join(__dirname, "..", "spec", `demo.config.${extension}`);
});

test("loads configs without error", async () => {
  // TODO: compiler issue https://github.com/developit/microbundle/issues?q=dynamic+import
  // https://www.voidcanvas.com/import-vs-require/
  // “Currently when you use import in your code, your transpilers transpile it back to require, the commonJS moduling system. So for the time being both are same.”
  const config = await overrideConfigs<{ configType: string }>(
    { configType: "default" },
    overrideFilePaths
  );

  expect(config.configType).toBeTruthy();
});
