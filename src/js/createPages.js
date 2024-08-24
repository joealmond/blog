import path from "path";

import { getJsFiles } from "./utility.js";
import createPage from "./createPage.js";

async function createPages(config) {
  const { pagesPath } = config.build;
  const pagesDirectory = path.join(import.meta.dirname, "..", "..", pagesPath);
  try {
    const pages = getJsFiles(pagesDirectory);

    for (const filename of pages) {
      await createPage(filename, config);
    }
  } catch (err) {
    console.error("Error occurred while generating HTML files:", err);
  }
}

export default createPages;
