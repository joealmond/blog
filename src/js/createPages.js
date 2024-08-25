import path from "path";
import fsp from "fs/promises";

import { getJsFiles } from "./utility.js";
import createPage from "./createPage.js";

async function createPages(config, layouts) {
  const { pagesPath, outputPath, rootPath } = config.build;
  const pagesDirectory = path.join(rootPath, pagesPath);
  const outputDirectory = path.join(rootPath, outputPath);

  try {
    const pages = getJsFiles(pagesDirectory);

    for (const filename of pages) {
      const htmlContentWithLayout = await createPage(filename, config, layouts);
      const pageName = filename.replace(".js", "");
      const outputFilePath = path.join(outputDirectory, pageName + ".html");
      await fsp.writeFile(outputFilePath, htmlContentWithLayout);
      console.log(`Copied page ${outputFilePath}`);
    }
  } catch (err) {
    console.error("Error occurred while generating HTML files:", err);
  }
}

export default createPages;
