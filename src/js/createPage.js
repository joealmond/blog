import path from "path";

import addLayout from "./addLayout.js";

async function createPage(filename, config, layouts) {
  const { pagesPath } = config.build;

  const pagesDirectory = path.join(import.meta.dirname, "..", "..", pagesPath);

  const filePath = path.join(pagesDirectory, filename);

  try {
    const { default: generateHTML } = await import(filePath);
    const htmlContent = await generateHTML(config);

    const htmlContentWithLayout = await addLayout(
      config,
      htmlContent,
      filename,
      layouts
    );

    console.log(`Generated page ${filename}`);
    return htmlContentWithLayout;
  } catch (err) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      err
    );
  }
}

export default createPage;
