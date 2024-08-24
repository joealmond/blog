import path from "path";
import { getJsFiles } from "./utility.js";
import createLayout from "./createLayout.js";

async function createLayouts(config) {
  const layouts = [];
  const { layoutsPath } = config.build;
  const layoutsDirectory = path.join(import.meta.dirname, "..", "..", layoutsPath);
  try {
    const layoutFiles = getJsFiles(layoutsDirectory);

    const layoutPromises = layoutFiles.map(async (filename) => {
      const layout = await createLayout(filename, config);
      const obj = { filename, layout };
      layouts.push(obj);
    });

    await Promise.all(layoutPromises);
  } catch (err) {
    console.error("Error occurred while reading files.", err);
  }
  return layouts;
}

export default createLayouts;