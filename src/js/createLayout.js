import path from "path";

async function createLayout(filename, config) {
  const { layoutsPath } = config.build;

  const layoutsDirectory = path.join(import.meta.dirname, "..", "..", layoutsPath);

  const filePath = path.join(layoutsDirectory, filename);

  try {
    const { default: generateHTML } = await import(filePath);
    const htmlContent = await generateHTML(config);
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
