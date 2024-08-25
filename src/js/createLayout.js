import path from "path";

async function createLayout(filename, config) {
  const { layoutsPath, rootPath } = config.build;
  const layoutsDirectory = path.join(rootPath, layoutsPath);
  const filePath = path.join(layoutsDirectory, filename);

  try {
    const { default: generateHTML } = await import(filePath);
    const htmlContent = await generateHTML(config);
    console.log(`Generated layout from ${filename}`);
    return htmlContent;
  } catch (err) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      err
    );
    return "";
  }
}

export default createLayout;
