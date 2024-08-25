import path from "path";
import { getJsFiles } from "./utility.js";
import createLayout from "./createLayout.js";

async function createLayouts(config) {
  const layouts = [];
  const { layoutsPath, rootPath } = config.build;
  const layoutsDirectory = path.join(rootPath, layoutsPath);

  try {
    const layoutFiles = getJsFiles(layoutsDirectory);
    const layoutPromises = layoutFiles.map(async (filename) => {
      const layout = await createLayout(filename, config);
      const obj = { filename, layout };
      layouts.push(obj);
    });

    await Promise.all(layoutPromises);
    console.log("Layouts created");
  } catch (err) {
    console.error("Error occurred while reading files.", err);
  }
  return layouts;
}

export default createLayouts;
