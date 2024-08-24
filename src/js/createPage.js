import path from "path";
import fsp from "fs/promises";

import addLayout from "./addLayout.js";

async function createPage(filename, config) {
  const { postsPath, outputPath, pagesPath } = config.build;

  const pagesDirectory = path.join(import.meta.dirname, "..", "..", pagesPath);
  const outputDirectory = path.join(
    import.meta.dirname,
    "..",
    "..",
    outputPath
  );

  const filePath = path.join(pagesDirectory, filename);
  const pageName = filename.replace(".js", "");

  try {
    const { default: generateHTML } = await import(filePath);
    const htmlContent = await generateHTML(config);

    const htmlContentWithLayout = await addLayout(config, htmlContent, filename);
    const outputFilePath = path.join(
      outputDirectory,
      pageName + ".html"
    );
    await fsp.writeFile(outputFilePath, htmlContentWithLayout);
    console.log(`Generated ${outputFilePath}`);
  } catch (err) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      err
    );
  }
}

export default createPage;
