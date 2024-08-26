import path from "path";

import createBaseHtml from "./../createBaseHtml.js";

async function createPage(filename, config, layouts) {
  const { pagesPath, rootPath } = config.build;
  const pagesDirectory = path.join(rootPath, pagesPath);
  const filePath = path.join(pagesDirectory, filename);

  try {
    const { default: generateHTML } = await import(filePath);
    const content = await generateHTML(config);

    const baseHtml = createBaseHtml(
      config,
      content,
      filename,
      layouts
    );

    console.log(`Generated page from ${filename}`);
    return baseHtml;
  } catch (err) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      err
    );
    return null;
  }
}

export default createPage;
